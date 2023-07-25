// const SHOPPING_CART_KEY = 'shoppingCart';
//
// function AddTypeProduct(id, color) {
//   let shoppingCart = localStorage.getItem(SHOPPING_CART_KEY);
//   if (shoppingCart == null) {
//     shoppingCart = [];
//   } else {
//     shoppingCart = JSON.parse(shoppingCart);
//   }
//   id = Number(id);
//   let found = false;
//   for (let i = 0; i < shoppingCart.length; i++) {
//     let item = shoppingCart[i];
//     if (item.productId === id) {
//       found = true;
//       break;
//     }
//   }
//   console.log(typeof shoppingCart);
//   if (!found) {
//     shoppingCart.push({ productId: id, productAmount: 1 });
//   }
//   console.log(shoppingCart);
//   localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(shoppingCart));
// }
//
// window.addEventListener('DOMContentLoaded', () => {
//   const productList = Array.from(
//     document.getElementById('product-list').children,
//   );
//   productList.forEach((product) => {
//     let button = product.querySelector('.button');
//     button.onclick = () =>
//       AddTypeProduct(product.id, button.style.backgroundColor);
//   });
// });
