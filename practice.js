// class Matrix {
//     constructor(width, height, element = (x,y) => undefined) {
//         this.width = width;
//         this.height = height;
//         this.content = [];

//         for(let y = 0; y < height; y++) {
//             for(let x = 0; x < height; x++) {
//                 this.content[y * width + x] = element(x,y);
//             }
//         }
//     }

//     get(x,y) {
//         return this.content[y * this.width + x];
//     }
//     set(x, y, value) {
//         this.content[y * this.width + x] = value;
//     }
// }

// let vals = new Matrix(3, 2, (x,y) => `${x} ${y}`);
// console.log(vals);

// class Ruler {
//     constructor(cm) {
//         this.cm = cm;
//     }
//     get mm() {
//         return `${this.cm * 10}mm`;
//     }
//     get metre() {
//         return `${this.cm / 100}m`;
//     }
//     set mm(value) {
//         this.cm = value / 10;
//     }
//     set metre(value) {
//         this.cm = value * 100;
//     }
// }

// let ourLength = new Ruler(32);

// console.log(ourLength.mm);

// function foo() {
//     console.log(this.bat)
// }

// var bat = "global";

// foo();

// function multiple3and5(value) {
//     let hold = [];
//     for(let i = value; i > 0; i--) {
//         if(((i%3 == 0) || (i%5 == 0)) && (i !== value)) {
//             hold.push(i);
//         }
//     }
//     return hold.reduce((a,b) => a + b);
// }

// console.log(multiple3and5(1000));
// let harray = [1,100,50,-51,1,1];

// for(let he = 0; he < harray.length; he++) {
//     let front = 0;
//     let back = 0;
//     // let accu = 0;
//     for(let i = he + 1; i < harray.length; i++) {
//         front += harray[i]; 
//     }
//     for(let i = he - 1; i >= 0; i--) {
//         back += harray[i];
//     }
//     if(front - back == 0) {
//         console.log(`index ${he} is our guy`);
//     }
//     console.log(front, back);
// 
// function promptDirection(question) {
//   let result = prompt(question);
//   if (result.toLowerCase() == "left") return "L";
//   if (result.toLowerCase() == "right") return "R";
//   throw new Error("Invalid direction: " + result);
// }

// function look() {
//   if (promptDirection("Which Way?") == "L") {
//     return "a house";
//   }
//   else { return "two angry bears"; }
// }

// try {
//   console.log("You see", look());
// } catch (error) {
//   console.log("something went wrong: " + error);
// }
// function getDate(string) {
//   let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
//   console.log(month, day, year);
//   return new Date(year, month - 1, day);
// }

// console.log(getDate("04-12-1999"));

let stock = "1 jean, 2 shirts, 100 socks";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

class Play {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  shout() {
    console.log(`I am playing the game of ${name}`);
  }
}