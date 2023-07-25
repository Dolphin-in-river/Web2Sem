function openForm() {
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('mainContent').setAttribute('class', 'blur');
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('mainContent').setAttribute('class', 'un-blur');
}
