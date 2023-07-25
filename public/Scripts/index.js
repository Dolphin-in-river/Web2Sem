const ProductsDict = {};

const SHOPPING_CART_KEY = 'shoppingCart';

function AddTypeProduct(id) {
  let shoppingCart = localStorage.getItem(SHOPPING_CART_KEY);
  if (shoppingCart == null) {
    shoppingCart = [];
  } else {
    shoppingCart = JSON.parse(shoppingCart);
  }
  id = Number(id);
  let found = false;
  for (let i = 0; i < shoppingCart.length; i++) {
    let item = shoppingCart[i];
    if (item.productId === id) {
      found = true;
      break;
    }
  }
  console.log(typeof shoppingCart);
  if (!found) {
    shoppingCart.push({ productId: id, productAmount: 1 });
  }
  console.log(shoppingCart);
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(shoppingCart));
}

async function getAllProductsFromDB() {
  return fetch('products')
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      data.forEach((product) => {
        ProductsDict[product.id] = product;
      });
      console.log(ProductsDict);
    })
    .catch((error) => {
      console.log(error);
    });
}

function SetItemList() {
  // ClearItemList();
  for (const key in ProductsDict) {
    AddItemToList(key);
  }
}

function GetProductForFront(id, linkToPhoto, name, price) {
  const alt_1 = 'product product-' + id;
  const alt_2 = 'Product';
  const alt_3 = 'addToCart' + id;

  const html = `
    <div class=${alt_1} id=${id}>
          <div class="bg">
            <img src=${linkToPhoto} alt=${alt_2}>
          </div>
          <h2 class="product__name">${name}</h2>
          <h3 class="product__price">${price} руб/кг</h3>
          <button id="${alt_3}" class="button l-nav-bar-button nav-bar-button-theme l-hiding-things" type="button">
            Добавить в корзину
          </button>
    </div>`;
  return new DOMParser().parseFromString(html, 'text/html').body
    .firstElementChild;
}

function AddItemToList(key) {
  const item = ProductsDict[key];
  console.log('Adding item ' + key);
  const shoppingCart = document.getElementById('product-list');
  const id = key;
  const productName = item.name;
  const productPrice = item.price;
  const linkToPhoto = item.linkToPhoto;
  const node = GetProductForFront(id, linkToPhoto, productName, productPrice);
  shoppingCart.appendChild(node);
}
function extracted(button) {
  if (
    button.style.backgroundColor !== 'red' &&
    button.style.backgroundColor !== 'pink'
  ) {
    button.style.backgroundColor = 'red';
    button.textContent = 'Продукт уже в корзине';
    button.addEventListener('mouseover', function () {
      button.style.backgroundColor = 'pink';
    });
    button.addEventListener('mouseout', function () {
      button.style.backgroundColor = 'red';
    });
  } else {
    button.style.backgroundColor = '#8adc1c';
    button.textContent = 'Добавить в корзину';
    button.addEventListener('mouseover', function () {
      button.style.backgroundColor = '#a0d75d';
    });
    button.addEventListener('mouseout', function () {
      button.style.backgroundColor = '#8adc1c';
    });
  }
}

async function Main() {
  await getAllProductsFromDB();
  SetItemList();
  const productList = Array.from(
    document.getElementById('product-list').children,
  );
  productList.forEach((product) => {
    let button = product.querySelector('.button');
    button.onclick = () =>
      AddTypeProduct(product.id, button.style.backgroundColor);
  });

  const button1 = document.getElementById('addToCart1');
  const button2 = document.getElementById('addToCart2');
  const button3 = document.getElementById('addToCart3');
  const button4 = document.getElementById('addToCart4');
  const button5 = document.getElementById('addToCart5');
  const button6 = document.getElementById('addToCart6');

  button1.addEventListener('click', function () {
    extracted(button1);
  });

  button2.addEventListener('click', function () {
    extracted(button2);
  });

  button3.addEventListener('click', function () {
    extracted(button3);
  });

  button4.addEventListener('click', function () {
    extracted(button4);
  });
  button5.addEventListener('click', function () {
    extracted(button5);
  });

  button6.addEventListener('click', function () {
    extracted(button6);
  });
}

window.addEventListener('DOMContentLoaded', () => Main());
