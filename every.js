let testArray = [1,2,3,4,5,6,7];

function every(array, fx) {
    for(let element of array) {
        if(!fx(element)) {
            return false
        }
    }
    return true;
}

function every2(array, fx) {
    if(array.some(i => !fx(i))) {
        return false;
    } 
    return true;
}
console.log(every2(testArray, i => i == 8))