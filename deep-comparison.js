let object1 = {boys: 1, girls: 3, men: 4, women: 4};
let object2 = {boys: 1, girls: 3, men: 4, women: 4};

function deepEqual(value1, value2) {
    let value1props = Object.keys(value1);
    let value2props = Object.keys(value2);
    if(!((typeof value1 === "object") && (typeof value2 === "object"))) {
        return value1 == value2;        

    } else {
         if(!(value1props.length == value2props.length)) {
        console.log("object lengths are not equal");
        return false;
        }   
        let numEqualElements = 0;
        for(i = 0; i < value1props.length; i++) {
            if(value1props[i] == value2props[i]) {
                numEqualElements++;
            } else{
                console.log("Properties do not bear the same name");
            }
        }
        if(numEqualElements == value1props.length) {
            let numEqualProperties = 0;
            for(i = 0; i < value1props.length; i++) {
                if(value1[value1props[i]] === value2[value2props[i]]) {
                    numEqualProperties++;
                }
            }
            if(numEqualProperties == value1props.length) {
                return true;
            }  else {
                console.log("Individual Properties do not share the same value")
            }
        }
    }
    return false;
}
console.log(deepEqual(object1, object2));

let array1 = [1,2,3,4];
let array2 = [1,2,3,4];

function arrayDeepComparison(array1, array2) {
    let checker = []
    for(i = 0; i < array1.length; i++) {
        if(array1[i] == array2[i]) {
            checker.push(true);
        }  else {
            checker.push(false);
        }
    }
    console.log(checker);
    if (checker.indexOf(false) == -1) {
        console.log("They are equal");
    } else {
        console.log("They are not equal");
    }
}

// arrayDeepComparison(array1, array2);
// console.log(Object.keys(object1));
// console.log(object1 === object2);
