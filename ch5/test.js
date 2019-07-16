function doLoop(n, action, param) {
  for (let i = 0; i < n; i++) {
    action(param);
  }
}