let arrayOfArrays = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];

function flatten(array) {
    let item = array;
    let flat = item.reduce((a,b) => a.concat(b)) 
    return flat;
}

console.log(flatten(arrayOfArrays));