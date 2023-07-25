const swiper = new Swiper('.swiper', {
    //  use-case: Отображаем пользователю карусель с картинками, которая автоматически пролистывается

    // Autoplay Parameters:
    // Delay between transitions (in ms).
    // Set to false and autoplay will not be disabled after user interactions (swipes), it will be restarted every time after interaction
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },

    // pagination:
    // Object with pagination parameters or boolean true to enable with default settings.
    // el: String with CSS selector or HTML element of the container with pagination
    // clickable: If true then clicking on pagination button will cause transition to appropriate slide
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Transition effect. Can be 'slide', 'fade', 'cube', 'coverflow', 'flip' or 'creative'
    effect: "flip",
});