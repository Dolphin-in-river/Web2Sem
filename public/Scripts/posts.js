function getRandomInt() {
    return Math.ceil(Math.random() * 10);
}
const preloading = document.getElementById('preloading');

document.addEventListener('DOMContentLoaded', async () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${getRandomInt()}`)
        .then(response => {
            if (response.status >= 200 && response.status <= 226) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(posts => {
            preloading.remove()
            let cardList = document.getElementById("posts");
            cardList.innerHTML = `<div class="card-list" id="card-list"></div>`;
            let newPosts = document.getElementById("card-list");
            posts.forEach(post => {
                newPosts.innerHTML += `
                    <div class="post-common">
                        <div class="post-title">${post.title}</div>
                        <div class="post-body">${post.body}</div>
                    </div>`;
            })
        })
        .catch((error) => {
            preloading.remove()
            let newPosts = document.getElementById("posts");
            newPosts.innerHTML = `<div><p class="error-text">⚠ Что-то пошло не так</p></div>`
        });
});