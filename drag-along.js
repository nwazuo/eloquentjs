let elements = document.querySelectorAll('.trail');

let it;
elements.forEach(element => element.addEventListener('mousedown', e => {
  element.style.border = '2px solid #ff6600';
  it = e.target;
  window.addEventListener('mousemove', moveObject);
})
)

function moveObject(e) {
  if (e.buttons == 0) {
    window.removeEventListener('mousemove', moveObject);
    it.style.border = '';
  } else {
    it.style.left = e.pageX + "px";
    it.style.top = e.pageY + "px";
    console.log(e.pageX, e.pageY);
  }
}