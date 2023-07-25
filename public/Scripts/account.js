async function GetOrders(customerId) {
  return fetch(`/api/orders/all-for-customer?customer-id=${customerId}`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function ShowOrders(orders) {
  console.log(orders);
}

async function Main() {
  const customerId = await supertokensSession.getUserId();
  console.log(customerId);
  const orders = await GetOrders(customerId);
  ShowOrders(orders);
}

window.addEventListener('DOMContentLoaded', () => Main());
console.log('123');
