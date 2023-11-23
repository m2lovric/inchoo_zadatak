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

const shipping = { croatia: 0, uk: 10 };

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
      <img src="./public/${item.img}.webp" class=" w-64 h-auto flex-1"/>
      <h1 class="flex-1 font-bebas-neue text-xl">${item.name}</h1>
      <input type="number"  value=${item.quantity} id=${
      item.id
    } class="w-12 h-12 pl-4 border-2 text-center border-black"/>
      <p class="font-titillium-web font-bold w-1/6 ml-12">${USDollar.format(
        item.price
      )}</p>
      <button class="ml-auto justify-self-end w-1/12"><img src="delete.svg" alt="delete"/></button>
    </article>
    `;
    cart.appendChild(section);
  });
}

function totalAmount() {
  let total = 0;
  const state = JSON.parse(localStorage.getItem('state'));
  const country = document.querySelector('#countries').value;
  state.map((item) => {
    total += item.quantity * item.price;
  });
  document.querySelector('#total').innerHTML = `${USDollar.format(
    total + shipping[country]
  )}`;
  document.querySelector('#subtotal').innerHTML = `${USDollar.format(total)}`;
  document.querySelector('#shipping').innerHTML = `${USDollar.format(
    shipping[country]
  )}`;
  console.log(total);
}

document.querySelector('#countries').addEventListener('change', () => {
  totalAmount();
});

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

const collapsible = document.querySelector('#collapsible');
const toggle = document.getElementById('toggle');
toggle.innerHTML = `<img src="plus.svg" alt="plus">`;

toggle.addEventListener('click', (e) => {
  const content = document.getElementById('content');
  if (content.classList.contains('hidden')) {
    toggle.innerHTML = `<img src="cancel.svg" alt="cancel">`;
    content.classList.add('active');
    collapsible.classList.add('text-green-700');
    collapsible.classList.remove('text-black');
    content.classList.remove('hidden');
  } else {
    toggle.innerHTML = `<img src="plus.svg" alt="plus">`;
    content.classList.add('hidden');
    content.classList.remove('active');
    collapsible.classList.add('text-black');
    collapsible.classList.remove('text-green-700');
  }
});
