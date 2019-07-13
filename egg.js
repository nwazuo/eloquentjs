function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: "value", value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: "value", value: match[0] };
  } else if (match = /^[^\s(),#]+/.exec(program)) {
    expr = { type: "word", name: match[0] }
  } else {
    throw new SyntaxError("Unexpected syntax :" + program);
  }

  return parseApply(expr, program.slice(match[0].length));//take out the parsed portion
}

//lets see if this function would be hoisted to the top since it is called before its declared. Yesy it was!
function skipSpace(string) {//trim white space
  let first = string.search(/\S/);
  if (first == -1) return "";
  string = string.slice(first);
  //comments support
  if (string[0] == "#") {
    let comment = /#.+\n/.exec(string)[0].length;
    return string.slice(comment);
  }
  return string;
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return { expr: expr, rest: program }
  }

  //if the expression is an application(has parenthesis after it), parse the arguments
  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };
  while (program[0] != ")") {//push argument expressions to the argument property of the application object
    let args = parseExpression(program);
    expr.args.push(args.expr);
    program = skipSpace(args.rest);
    if (program[0] == ",") {//multiple arguments seperated by a comma
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')' ");
    }
  }
  return parseApply(expr, program.slice(1));//skip closing bracket and recurse
}

function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after rest");
  }
  return expr;
}

//evaluator 

let specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`
        Undefined binding: ${expr.name}
      `);
    }
  } else if (expr.type == "apply") {
    let { operator, args } = expr;
    if (operator.type == "word" && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function");
      }
    }
  }
}

//special froms mainly including basic programming constructs like if and while

//if
specialForms.if = (args, scope) => {
  if (args.length != 3) { throw new SyntaxError("if expects 3 arguments") }
  else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
}

//while 
specialForms.while = (args, scope) => {
  if (args.length != 2) { throw new SyntaxError("while expects 2 arguments") }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  //since undefined doest exit in egg 
  //we return false for lack of a meaningful result
  return false;
}

//do
specialForms.do = (args, scope) => {
  let value = false;
  for (arg of args) {
    value = evaluate(arg, scope);
    //for debugging purposes console.log(value);
  }
  return value;
}

//defining a variable
specialForms.define = (args, scope) => {
  if (args.length != 2 && args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
}

//global scope object 
let topScope = Object.create(null);

topScope.false = false;
topScope.true = true;

//basic arithmetic and comparison operators
for (let op of ["+", "-", "*", "/", ">", "<", "=="]) {
  topScope[op] = Function("a, b", `return Number(a) ${op} Number(b);`);
}

//for outputting values
topScope.print = value => {
  console.log(value);
  return value;
}

//run the code in a fresh scope
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

//for defining functions 
specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Function needs a body");
  }

  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function () {
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of argumemts");
    }

    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }

    return evaluate(body, localScope);
  }
}

//Arrays 
topScope.array = (...values) => {
  return values;
}

//length of array 
topScope.length = array => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Argument is not an array");
  }
  return array.length;
}

//fetch element n from array
topScope.element = (array, n) => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Argument is not an array");
  }

  return array[Number(n)];
}