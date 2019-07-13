let balloon = document.querySelector('p');

document.addEventListener('keydown', control);

function control(e) {
  let size = Number(balloon.style.fontSize.slice(-0, -2));
  if (e.key == "ArrowUp") {
    size = size + (10 / 100 * size);
    balloon.style.fontSize = size + "px";
    if (size >= 300) {
      balloon.textContent = "💥";
      balloon.style.fontSize = "280px";
      document.removeEventListener('keydown', control);
    }
  } else if (e.key == "ArrowDown") {
    size = size - (10 / 100 * size);
    balloon.style.fontSize = size + "px";
  }
}