// function Ccount(scrpp) {
//     return scrpp.ranges.reduce((count, [from,to]) => {
//         return count + (to - from)
//     }, 0)
// }

// console.log(Ccount(SCRIPTS[0]));
// console.log(SCRIPTS[0].ranges.reduce((count, [from,to]) => {return count + (to - from)},0));

function dominantWritingDirection(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
    return  script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    let highest = scripts.reduce((n, {count}) => n > count ? n : count, 0);
    let behold = scripts.filter(({count}) => count == highest);
    return behold.map(s => s.name);
}

console.log(dominantWritingDirection("jerтявالْأَبْجَدِيَّة الْعَرَبِيَّة‎"));

/* Yes I did it, took me almost an entire day to figure this out. I know, my bad. Programming can make you feel dumb 
and smart at the same time */