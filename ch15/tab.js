// function asTabs(node) {
//   let tabs = Array.from(node.children);
//   tabs.forEach(element => {
//     if (tabs[0] == element) {
//       element.style.display = '';
//     } else {
//       element.style.display = 'none';
//     }
//   })

//   tabs.forEach(element => {
//     let btnText = element.dataset.tabname;
//     let btn = document.createElement('button');
//     btn.textContent = btnText;
//     node.prepend(btn);
//     btn.addEventListener('click', () => {
//       tabs.forEach(tab => {
//         if (tab != element) {
//           tab.style.display = "none";
//         }
//       })
//       btn.style.background = '';
//       element.style.display = '';
//       if (btn.textContent = btnText) {
//         btn.style.background = '#ff6600';
//       }
//     });
//   });
// }

function asTabs(node) {
  //make buttons
  let tabs = Array.from(node.children);
  let buttons = []
  tabs.forEach(tab => {
    let button = document.createElement('button');
    button.textContent = tab.dataset.tabname;
    buttons.push(button);
  })

  for (let i = buttons.length - 1; i >= 0; i--) {
    node.prepend(buttons[i]);
  }

  //hide all except the first element
  tabs.forEach(tab => {
    tab.classList.add('hide');
  })
  tabs[0].classList.remove('hide');
  buttons[0].classList.add('selected');

  //click event for buttons
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      let clicked = e.target;
      //hide others and show clicked
      tabs.forEach(tab => {
        if (tab.dataset.tabname == clicked.textContent) {
          tab.classList.remove('hide');
        } else {
          tab.classList.add('hide');
        }
      })

      //highlight selected tab button
      buttons.forEach(button => {
        if (button == clicked) {
          button.classList.add('selected');
        } else {
          button.classList.remove('selected');
        }
      })
    })
  })



}