const SHOPPING_CART_KEY = 'shoppingCart';

let ProductsDict = {};

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

function getProductsInCart() {
  let items = localStorage.getItem(SHOPPING_CART_KEY);
  if (items == null) {
    items = [];
  } else {
    items = JSON.parse(items);
  }
  return items;
}

function SetItemList(items) {
  ClearItemList();
  items.forEach((item) => {
    AddItemToList(item);
  });
}

function SetTotalPrice(totalPrice) {
  let priceElement = document.getElementById('total-price');
  priceElement.innerHTML = `${totalPrice} руб.`;
}

function UpdateTotalPrice(items) {
  const totalPrice = getTotalPrice(items);
  SetTotalPrice(totalPrice);
}

function changeAmount(productId, delta) {
  let items = getProductsInCart();
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.productId == productId) {
      item.productAmount += delta;
      if (item.productAmount < 0) {
        item.productAmount = 0;
      }
      break;
    }
  }

  items = items.filter((item) => item.productAmount > 0);
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(items));
  SetItemList(items);
  UpdateTotalPrice(items);
}

function GetProductForFront(id, linkToPhoto, name, price, amount) {
  const html = `
    <div class="shopping-cart__product product">
        <div class="product__inner">
            <span class="shopping-cart__product-info"> 
                <img src=${linkToPhoto}>
                <div class="shopping-cart__product-name">${name}</div>
                <div class="shopping-cart__product-price">${price} руб.</div>
                <div class="shopping-cart__product-amount">${amount} шт.</div>
            </span>
            <span class="shopping-cart__product-buttons">
                <button class="make-order button l-nav-bar-button l-hiding-things" type="button">-</button>
                <button class="make-order button l-nav-bar-button l-hiding-things" type="button">+</button>
            </span>
        </div>
    </div>`;
  let node = new DOMParser().parseFromString(html, 'text/html').body
    .firstElementChild;
  let buttons = node.lastElementChild.lastElementChild.children;
  console.log(buttons);
  let decreaseButton = buttons[0];
  let increaseButton = buttons[1];
  decreaseButton.onclick = () => {
    changeAmount(id, -1);
  };
  increaseButton.onclick = () => {
    changeAmount(id, +1);
  };
  return node;
}

function ClearItemList() {
  let shoppingCart = document.getElementById('shopping-cart-list');
  shoppingCart.innerHTML = '';
}

function AddItemToList(item) {
  console.log('Adding item ' + item.productId);
  let shoppingCart = document.getElementById('shopping-cart-list');
  const id = item.productId;
  const productName = ProductsDict[id].name;
  const productPrice = ProductsDict[id].price;
  const linkToPhoto = ProductsDict[id].linkToPhoto;
  const productAmount = item.productAmount;
  const node = GetProductForFront(
    id,
    linkToPhoto,
    productName,
    productPrice,
    productAmount,
  );
  shoppingCart.appendChild(node);
}

function getTotalPrice(items) {
  let total = 0;
  items.forEach((item) => {
    total += ProductsDict[item.productId].price * item.productAmount;
  });
  return total;
}

async function MakeOrder() {
  const items = getProductsInCart();
  if (items.length === 0) {
    alert('Please add something to the cart before making an order!');
    return;
  }
  const address = document.getElementById('address1').value.trim();
  console.log(address);
  if (address === '') {
    alert('Fill registration fields');
    return;
  }
  let data = {
    totalPrice: getTotalPrice(items),
    products: items,
    address: address,
  };

  let path = 'profiles/order';
  let response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.log(response);
        const resp = await response.json();
        console.log(resp);
        alert(response.statusText);
        throw Error(resp);
      }
    })
    .then((data) => {
      alert('Order was successfully created!');
      ClearItemList();
      SetTotalPrice('0');
      ProductsDict = {};
      localStorage.setItem(SHOPPING_CART_KEY, '[]');
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

async function Main() {
  await getAllProductsFromDB();
  const items = getProductsInCart();
  SetItemList(items);
  UpdateTotalPrice(items);
}

window.addEventListener('DOMContentLoaded', () => Main());