const box = {
  locked: true,
  unlock() { this.locked = false },
  lock() { this.locked = true },
  _content: ["1", "3", "password"],
  get content() {
    if (this.locked) throw new Error("Box is locked");
    return this._content;
  }
}

function withBoxUnlocked(action) {
  if (box.locked == true) {
    box.unlock();
  }
  try {
    action();
  } catch (error) {
    console.log("something went wrong " + error);
  }
  finally {
    box.lock();
  }
}
 