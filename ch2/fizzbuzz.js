for(let i = 1; i <= 100; i++) {
    let printed = '';
    if(i % 3 == 0) {printed += 'fizz'}
    if(i % 5 == 0) {printed += 'buzz'}
    if(printed == '') {printed = i}
console.log(printed);    
}