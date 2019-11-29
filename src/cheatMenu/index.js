export default function cheatMenu() {
  let cheatNode = createNode();
  createMenu('dungeon');
};

function createNode() {
  let cheatNode = document.createElement("div");
  cheatNode.classList.add('cheat-menu')
  cheatNode.innerHTML = "<h1 class='cheat-menu__h1'>Админ панель</h1><div class='cheat-menu__wrapper'><div>";

  document.body.appendChild(cheatNode);
  return cheatNode;
}

function createMenu(menuName) {
  if (menuName === 'dungeon') {
    let menuDiv = document.createElement('div');
    let h2 = document.createElement('div');
    h2.innerText = 'Dungeon Menu';
    menuDiv.appendChild(h2);

    const buttons = ['start', 'pause', 'reset'];
    buttons.forEach((buttonName) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <button type="button" class="btn btn-dark">${buttonName}</button>
      `;
      div.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(buttonName);
      })
      menuDiv.appendChild(div);
    })

    document.querySelector('.cheat-menu__wrapper').innerHTML = '';
    document.querySelector('.cheat-menu__wrapper').appendChild(menuDiv);
  }
}
