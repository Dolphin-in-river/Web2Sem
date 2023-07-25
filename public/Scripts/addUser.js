(function () {
  document.addEventListener('DOMContentLoaded', () => {
    changeUser();
  });
})();

async function onLogin() {
  let login = document.getElementById('login').value.trim();
  let password = document.getElementById('password').value.trim();
  // let userData = JSON.stringify({
  //   email: login,
  //   password: password,
  // });
  let userData = JSON.stringify({
    formFields: [
      { id: 'email', value: login },
      { id: 'password', value: password },
    ],
  });
  if (login === null || login === '') {
    alert('email не должен быть пустым!');
    return;
  }
  if (password === null || password === '') {
    alert('password не должен быть пустым!');
    return;
  }
  fetch('api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: userData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data['status'] === 'OK') {
        localStorage.setItem('User', JSON.stringify(data));
        changeUser();
      } else {
        alert('Ошибка: ' + JSON.stringify(data));
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

async function register() {
  const surname = document.getElementById('surname1').value.trim();
  const name = document.getElementById('name1').value.trim();
  const patronymic = document.getElementById('patronymic1').value.trim();
  const phone = document.getElementById('phone1').value.trim();
  const email = document.getElementById('email1').value.trim();
  const password = document.getElementById('password1').value.trim();

  if (name === '' || surname === '') {
    alert('Имя пробел не может быть, возвращайтесь только после МФЦ!');
    return;
  }

  if (
    !name.match(/^[a-zA-Zа-яА-Я\s]*$/) ||
    !surname.match(/^[a-zA-Zа-яА-Я\s]*$/) ||
    !patronymic.match(/^[a-zA-Zа-яА-Я\s]*$/)
  ) {
    alert(
      'Проверьте своё имя, обратитесь в паспортный стол, пускаем только с буквами',
    );
    return;
  }

  if (email === null || email === '') {
    alert('email не должен быть пустым!');
    return;
  }
  if (password === null || password === '') {
    alert('password не должен быть пустым!');
    return;
  }

  if (!phone.match(/^[0-9\+]*$/)) {
    alert('Разрешены только цифры!');
    return;
  }

  let userData = JSON.stringify({
    formFields: [
      { id: 'name', value: name },
      { id: 'surname', value: surname },
      { id: 'patronymic', value: patronymic },
      { id: 'phone', value: phone },
      { id: 'email', value: email },
      { id: 'password', value: password },
    ],
  });

  fetch('api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: userData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        if (data['status'] === 'OK') {
          localStorage.setItem('User', JSON.stringify(data));
          changeUser();
        } else {
          alert('Ошибка: ' + JSON.stringify(data));
        }
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

function clear() {
  localStorage.clear();
  changeUser();
}

function exit() {
  clear();
}

function myDelete() {
  let existedUserdata = JSON.parse(localStorage.getItem('User'));
  const email = existedUserdata['user'].email;
  let path = 'profiles/' + email;
  let response = fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response) {
    clear();
  } else {
    alert('Не удалось удалить пользователя');
  }
}

function changeUser() {
  let existedUserdata = JSON.parse(localStorage.getItem('User'));
  let elementById = document.getElementById('reg');
  // let button1 = document.getElementById('not-see-button1');
  let button2 = document.getElementById('not-see-button2');
  let buttonRegister = document.getElementById('registration');
  let buttonLogin = document.getElementById('login-button');
  let orderList = document.getElementById('list-of-orders');
  if (existedUserdata === null) {
    elementById.innerText = 'Гость';
    // button1.style.display = 'none';
    button2.style.display = 'none';
    buttonRegister.style.display = 'block';
    buttonLogin.style.display = 'block';
    orderList.style.display = 'none';
  } else {
    elementById.innerText = existedUserdata['user'].email;
    // button1.style.display = 'block';
    button2.style.display = 'block';
    buttonRegister.style.display = 'none';
    buttonLogin.style.display = 'none';
    orderList.style.display = 'block';
  }
  console.log(elementById.innerHTML);
}
