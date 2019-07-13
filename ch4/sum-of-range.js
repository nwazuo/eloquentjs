function sum(values) {
  let result = 0;
  for (value of values) {
    result += Number(value);
  }
  return result;
}

function range(start, end, step = 1) {
  start = Number(start);
  end = Number(end);
  step = Number(step);

  let result = [];
  if (step > 0) {
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(i);
    }
  }
  return result;
}

//test code
console.log(sum(range(1, 10, 1)));