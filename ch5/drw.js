function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function dominantWritingDir(text) {
  let chars = [];
  for (let char of text) {
    chars.push(char.codePointAt(0));
  }

  let writingDirs = countBy(chars.filter(s => characterScript(s) !== null), (char) => {
    return characterScript(char).direction;
  });

  let drw = writingDirs.sort((a, b) => {
    return a.count < b.count ? 1 : -1;
  });

  return drw[0].name;
}