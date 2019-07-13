class Group {
    constructor(member) {
        this.member = [];
    }
    members() {
        return this.member;
    }
    add(...item) {
        for(let one of item) {
            if(this.member.indexOf(one) == -1) {
                this.member.push(one);
            }
        }
    }
    delete(...item) {
        for(let one of item) {
            if(this.member.indexOf(one) !== -1) {
                this.member = this.member.filter(n => n !== one);
            }
        }
    }
    has(item) {
        if(this.member.indexOf(item) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    static from(iterableObject) {
        if(Object.getPrototypeOf(iterableObject)[Symbol.iterator]) {
            let fromGroup = new Group();
            for(let item of iterableObject) {
                fromGroup.add(item);
            }
            return fromGroup;
        }
        else {
            return "Object not iterable";
        }
    }
    [Symbol.iterator]() {
        return new GroupIterator(this);
    } 
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.index = 0;
    }
    next() {
        if(this.index == this.group.member.length - 1) return {done: true};

        let value = {
            value: this.group.member[this.index]
        }
        this.index++;

        return {value, done: false};
    }
}

let value = new Group();
let value2 = value.add("hello","hi","his","hers","hers");
let value3 = value.delete("hello", "hi");
console.log(value);
console.log(value.has("his"));
// console.log(value.from("bjhljjk"));
let nokia = Group.from([1,2,3,4,5,6]);
console.log(nokia);

for(let element of nokia) {
    console.log(element);
}

/* Yes, I did it. Never thought I'll'd pull of the group iterator in one try. Lol, I never even thought I could pull
 it off */