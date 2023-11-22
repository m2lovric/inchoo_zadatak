const items = [
  {
    id: 'first',
    img: 'GZ9260_1',
    name: 'ULTRABOOST LIGHT',
    quantity: 1,
    price: 200,
  },
  { id: 'second', img: 'HQ6351_1', name: 'NMD_R1', quantity: 1, price: 150 },
];

function startPage() {
  localStorage.setItem('state', JSON.stringify(items));
  allItems();
  totalAmount();
}

startPage();

function allItems() {
  const cart = document.querySelector('#cart');
  return items.map((item) => {
    const section = document.createElement('section');
    section.innerHTML = `
    <article class="flex items-center justify-between">
      <img src="./public/${item.img}.webp" class=" w-64 h-auto justify-start"/>
      <h1 class="justify-start">${item.name}</h1>
      <input type="number"  value=${item.quantity} id=${item.id} class="justify-end"/>
      <p class="justify-end">${item.price}$</p>
      <button class="justify-end"><img src="delete.svg" alt="delete"/></button>
    </article>
    `;
    cart.appendChild(section);
  });
}

function totalAmount() {
  let total = 0;
  const state = JSON.parse(localStorage.getItem('state'));
  state.map((item) => {
    total += item.quantity * item.price;
  });
  document.querySelector('#total').innerHTML = `${total}`;
  document.querySelector('#subtotal').innerHTML = `${total}`;
  console.log(total);
}

function changeState(e) {
  const state = JSON.parse(localStorage.getItem('state'));
  const targetObj = state.find((el) => el.id == e.target.id);
  if (targetObj) {
    targetObj.quantity = parseInt(e.target.value);
  }
  localStorage.setItem('state', JSON.stringify(state));
  totalAmount();
}

document.getElementById('first').addEventListener('change', (e) => {
  changeState(e);
});

document.getElementById('second').addEventListener('change', (e) => {
  changeState(e);
});

document.getElementById('toggle').addEventListener('click', (e) => {
  const content = document.getElementById('content');
  if (content.classList.contains('hidden')) {
    content.classList.add('active');
    content.classList.remove('hidden');
  } else {
    content.classList.add('hidden');
    content.classList.remove('active');
  }
});
