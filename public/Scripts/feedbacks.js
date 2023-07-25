(function () {
  document.addEventListener('DOMContentLoaded', () => {
    listenToSubmit();
    displayFeedbacks();
  });
})();

function listenToSubmit() {
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedbackName = document.getElementById('feedback-name').value.trim();
    const feedbackContent = document
      .getElementById('feedback-content')
      .value.trim();

    if (feedbackName === '') {
      alert('Имя пробел не может быть, возвращайтесь только после МФЦ!');
      return;
    }

    if (!feedbackName.match(/^[a-zA-Zа-яА-Я\s]*$/)) {
      alert(
        'Проверьте своё имя, обратитесь в паспортный стол, пускаем только с буквами',
      );
      return;
    }

    if (!feedbackContent.match(/^[a-zA-Zа-яА-Я0-9\s!,?\.]*$/)) {
      alert('Разрешены только буквы и цифры!');
      return;
    }

    const str = feedbackName + feedbackContent;
    let hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = hash + chr * i;
      hash = hash % 12345678;
    }
    if (localStorage.getItem(`${hash}`)) {
      alert(
        'Такой отзыв уже был добавлен, проверьте себя, вдруг вы бот ну или просто мискликнули',
      );
      return;
    }

    const newObject = {
      'feedback-name': feedbackName,
      'feedback-content': feedbackContent,
      'date-time': new Date().getTime(),
    };
    localStorage.setItem(hash.toString(), JSON.stringify(newObject));
    addToPage(newObject);
  });
}

function compareNumeric(a, b) {
  return a['date-time'] - b['date-time'];
}

function displayFeedbacks() {
  const keys = Object.keys(localStorage);
  let i = keys.length;
  let arr = [];
  while (i--) {
    arr.push(JSON.parse(localStorage.getItem(keys[keys.length - i - 1])));
  }
  arr.sort(compareNumeric);
  i = keys.length;
  while (i--) {
    addToPage(arr[keys.length - i - 1]);
  }
}

function addToPage(newObject) {
  let tbody = document.querySelector('.feedback');
  let template = document.querySelector('#template-feedback');
  let clone = template.content.cloneNode(true);
  let td = clone.querySelectorAll('td');
  td[0].textContent = newObject['feedback-name'];
  td[1].textContent = newObject['feedback-content'];
  tbody.appendChild(clone);
}
