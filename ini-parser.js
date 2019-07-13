function parseINI(string) {
  //Start with an object to hold the top-level feilds
  let result = {};
  let section = result;

  //split file line by line and parse as such
  string.split(/\r?\n/).forEach(line => {
    let match;

    //matching for settings and their values and assigning appropriately
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {//matching for new section
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {//anything else is not valid
      throw new Error("Line '" + line + "' is not valid");
    }
  });
  return result;
}

console.log(parseINI(`
name=chizo
[address]
city=hacourt`));