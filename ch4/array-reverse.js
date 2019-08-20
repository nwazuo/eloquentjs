function reverseArray(array) {
  let result = [];
  for (element of array) {
    result.unshift(element);
  }
  return result;
}

function reverseArrayInPlace(array) {
  let divider = Math.floor(array.length / 2);
  let lastIndex = array.length - 1;
  for (let i = 0; i < divider; i++) {
    let leftIndex = array[i];
    let rightIndex = array[lastIndex - i];
    console.log(leftIndex, rightIndex);
    array[i] = rightIndex;
    array[lastIndex - i] = leftIndex;
  }
}
