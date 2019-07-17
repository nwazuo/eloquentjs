class Group {
  constructor() {
    this.content = [];
  }
  add(element) {
    if (this.content.indexOf(element) == -1) {
      this.content.push(element);
    } else {
      console.log('Element already exists in group');
    }
  }
  delete(element) {
    if (this.content.indexOf(element) !== -1) {
      let index = this.content.indexOf(element);
      this.content = this.content.slice(0, index).concat(this.content.slice(index + 1));
    }
  }
  has(element) {
    if (this.content.indexOf(element) > -1) {
      return true;
    } else {
      return false;
    }
  }

  static from(iterable) {
    if (Object.getPrototypeOf(iterable)[Symbol.iterator]) {
      let result = new Group();
      for (let iterate of iterable) {
        result.add(iterate);
      }
      return result;
    } else {
      return console.log("object not iterable");
    }
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }
  next() {
    if (index == (this.group.content.length - 1)) {
      return { done: true };
    }
    let value = {
      index: this.index,
      value: this.group.content[index]
    }
    this.index++;
    return { value, done: false };
  }
}