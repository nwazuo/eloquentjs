function arrayToList(array) {
    usableArray = array.reverse();
    let list = null;
    for(let element of usableArray) {
        list = {value: element, rest: list}
    }
    return list;
}
function nth(number, list) {
    if (number == 0) {
        return list.value;
    }
    if (list == null) {
        return "not found!";
    }
    list = list.rest;
    return nth(number - 1, list);
}

let array = [1,2,3,4,5];
let list = arrayToList(array);

console.log(nth(3, list));
console.log(list);