function flatten(obj) {
  return obj.reduce((a, b) => {
    return a.concat(b);
  });
}