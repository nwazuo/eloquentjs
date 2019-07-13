let theString = "Lorem Ipsum";

function reverseString(ourString) {
  let rString = "";
  for (let i = ourString.length - 1; i >= 0; i--) {
    rString += ourString[i];
  }
  return rString;
}

let newString = reverseString(theString);


console.log(newString);