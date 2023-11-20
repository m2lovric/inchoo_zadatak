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
}

startPage();

function allItems() {
  const cart = document.querySelector('#cart');
  return items.map((item) => {
    const section = document.createElement('section');
    section.innerHTML = `
    <article class="flex justify-between items-center w-1/2">
      <img src="./public/${item.img}.webp" class=" w-64 h-auto"/>
      <h1>${item.name}</h1>
      <input type="number"  value=${item.quantity} id="${item.id}"/>
      <p>${item.price}$</p>
      <button class="border-solid border-gray-900 border rounded-sm px-2">remove</button>
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

  console.log(total);
}

function changeState(e) {
  const state = JSON.parse(localStorage.getItem('state'));
  const targetObj = state.find((el) => el.id == e.target.id);
  if (targetObj) {
    targetObj.quantity = parseInt(e.target.value);
  }
  localStorage.setItem('state', JSON.stringify(state));
}

document.getElementById('first').addEventListener('change', (e) => {
  changeState(e);
});

document.getElementById('second').addEventListener('change', (e) => {
  changeState(e);
});

document.getElementById('btn').addEventListener('click', () => {
  totalAmount();
});
