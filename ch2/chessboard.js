let result = "";
let size = 8;
for (let i = 0; i < size; i++) {
  let inter = "";
  for (let j = 0; j < size; j++) {
    inter += (i + j) % 2 == 0 ? " " : "#";
  }
  result += inter + "\n";
}
console.log(result);