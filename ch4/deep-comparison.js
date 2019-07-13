function deepEqual(first, second) {
  if (first === second) {
    return true;
  }
  else if ((typeof first && typeof second) == "object") {
    if ((Object.keys(first).length == Object.keys(second).length) == true) {
      for (prop of Object.keys(first)) {
        if (!deepEqual(first[prop], second[prop])) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

//Tests
let object1 = { name: "chizo", age: 20 };
let object2 = { name: "victor", age: 18 };
let object3 = object1;
let object4 = { name: "chizo", age: 20 };

deepEqual("name", "name");//should return true
deepEqual("name", "Name");//should return false
deepEqual(object1, object2) //should return false
deepEqual(object1, object3)//should return true
deepEqual(object1, object4);//should return true

