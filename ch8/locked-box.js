function withBoxUnlocked(run) {
  try {
    let lockstatus = box.locked;
    if (lockstatus) { box.unlock() }
    run();
  } catch (e) {
    console.log("Something went wrong: " + error);
  }
  finally {
    if (!lockstatus) {
      box.lock();
    }
  }
  return;
} 