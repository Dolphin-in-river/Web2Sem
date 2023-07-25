const Orders = {};

let flag = false;
async function getAllOrdersFromDB() {
  let existedUserdata = JSON.parse(localStorage.getItem('User'));
  if (existedUserdata === null) {
    return;
  }
  flag = true;
  const email = existedUserdata['user'].email;
  const path = 'profiles/' + email + '/all-orders';
  return fetch(path)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      data.forEach((product) => {
        Orders[product.id] = product;
      });
      console.log(Orders);
    })
    .catch((error) => {
      console.log(error);
    });
}

function SetItemList() {
  for (const key in Orders) {
    AddItemToList(key);
  }
}

function GetProductForFront(id, customerId, totalPrice, dateTime, orderStatus) {
  const alt_1 = 'product product-' + id;

  const html = `
    <div class="section">
      <div class="section__title">Заказы</div>
    </div>
    <div class=${alt_1} id=${id}>
          <h2 class="product__name">Заказ с id №${id}</h2>
          <h3 class="product__name">${dateTime}</h3>
          <h3 class="product__price">Сумма заказа ${totalPrice} руб</h3>
          <h3 class="product__price">Статус заказа ${orderStatus}</h3>
    </div>`;
  const node = new DOMParser().parseFromString(html, 'text/html').body
    .firstElementChild;
  return node;
}

function AddItemToList(key) {
  const item = Orders[key];
  console.log('Adding item ' + key);
  const shoppingCart = document.getElementById('order-list');
  const id = key;
  const customerId = item.customerId;
  const totalPrice = item.totalPrice;
  const dateTime = item.dateTime;
  const orderStatus = item.orderStatus;
  const node = GetProductForFront(
    id,
    customerId,
    totalPrice,
    dateTime,
    orderStatus,
  );
  shoppingCart.appendChild(node);
}

async function Main() {
  await getAllOrdersFromDB();
  // SetItemList();
  if (flag === false) {
    return;
  }
  console.log(Orders);
  let table = document.querySelector('#table');
  let pagination = document.querySelector('#pagination');

  let notesOnPage = 3;
  let countOfItems = Math.ceil(Object.keys(Orders).length / notesOnPage);

  let showPage = (function () {
    let active;

    return function (item) {
      if (active) {
        active.classList.remove('active');
      }
      active = item;

      item.classList.add('active');

      let pageNum = +item.innerHTML;

      let start = (pageNum - 1) * notesOnPage;
      let end = start + notesOnPage;

      let notes = Object.values(Orders).slice(start, end);

      table.innerHTML = '';
      for (let note of notes) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        createCell(note.id, tr);
        createCell(note.totalPrice, tr);
        createCell(note.dateTime, tr);
        createCell(note.orderStatus, tr);
      }
    };
  })();

  let items = [];
  for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
  }

  showPage(items[0]);

  for (let item of items) {
    item.addEventListener('click', function () {
      showPage(this);
    });
  }
}

function createCell(text, tr) {
  let td = document.createElement('td');
  td.innerHTML = text;
  tr.appendChild(td);
}

window.addEventListener('DOMContentLoaded', () => Main());
