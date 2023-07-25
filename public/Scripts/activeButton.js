(function () {
  function pageIsActive() {
    let itemHtml = document.location.pathname.split('/').pop();
    document.getElementById(itemHtml).style.textDecoration = 'underline';
  }
  document.addEventListener('DOMContentLoaded', pageIsActive);
})();
