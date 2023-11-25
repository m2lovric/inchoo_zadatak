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
    <article class="flex items-center justify-between max-sm:flex-col">
      <div class="flex justify-between items-center flex-1 mr-20">
        <img src="${item.img}.webp" class=" w-64 h-auto max-sm:mr-10"/>
        <h1 class="font-bebas-neue text-xl">${item.name}</h1>
      </div>
      <div class="flex flex-1 justify-between items-center max-sm:w-full max-sm:justify-evenly max-sm:mb-10">
        <input type="number"  value=${item.quantity} id=${
      item.id
    } class="w-12 h-12 ml-[18%] pl-4 border-2 text-center border-black max-sm:ml-0 "/>
        <p class="font-titillium-web font-bold w-1/6 mr-[5%] max-sm:mr-0 ">${USDollar.format(
          item.price
        )}</p>
        <button class=" w-1/12"><img src="delete.svg" alt="delete"/></button>
      </div>
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
