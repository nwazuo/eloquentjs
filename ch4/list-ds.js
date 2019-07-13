function arrayToList(elements) {
  let output;
  for (let i = elements.length - 1; i >= 0; i--) {
    let rest = output;
    output = {
      value: elements[i],
      rest: rest
    }
  }
  return output;
}

function listToArray(list) {
  let current = list;
  let result = [];
  while (current != undefined) {
    result.push(current.value);
    current = current.rest;
  }
  return result;
}

function prepend(element, list) {
  let result = {
    value: element,
    rest: list
  }
  return result;
}

function nth(list, index) {
  if (index < 0) {
    return undefined;
  }
  if (index == 0) {
    return list.value;
  }
  return nth(list.rest, index - 1);
}