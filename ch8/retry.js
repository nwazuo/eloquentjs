function wrapPrimitiveMultiply(first, second) {
    try {
        for (; ;) {
            let result = primitiveMultiply(first, second);
            console.log("Your result it" + result);
            break;
        }
    } catch (e) {
        if (e instanceof MultiplicationUnitFailure) {
            console.log("An error occured, try again");
        }
    }
}

/*  
- within the text, find the words 'add', 'substract', 'divide' and 'multiply'
- create a map that associates the words with their respective arithmetic operations
- match two digits within the string and apply the operation on them in the order they appear 
*/

function mapOperation(word, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    let obj = { "add": num1 + num2, "subtract": num1 - num2, "divide": num1 / num2, "multiply": num1 * num2 };
    return obj[word];
}

function wordArithmetic(string) {
    let match = /(add|subtract|divide|multiply)\D+(\d)\D+(\d)/
    let [_, operation, first, second] = match.exec(string);
    return mapOperation(operation, first, second);
}

//Yo

//freecodecamp challenge code snippets
function telephoneCheck(str) {
    let areaCode = /(-?\d)?\b/y.exec(str);
    console.log(areaCode);
    if (areaCode != null) {
        if (areaCode[1] != 1) return false;
    }
    return true;
}