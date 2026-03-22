const link = document.getElementById('effectLink');
const overlay = document.getElementById('overlay');

link.addEventListener('click', (e) => {
    // Add a class to the overlay to change its background color
    overlay.classList.add('white-overlay');

    // Prevent the default behavior of the link while the overlay animation is ongoing
    e.preventDefault();

    // After the animation (1 second), navigate to the link's URL
    setTimeout(() => {
        window.location.href = link.href="../Navigators/Navigators.html";
    }, 1000); // 1 second delay for the animation, adjust as needed
});
