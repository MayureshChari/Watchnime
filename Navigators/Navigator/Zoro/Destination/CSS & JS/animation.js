document.addEventListener("DOMContentLoaded", function() {
    var sprite = document.getElementById("sprite");
    var textBox = document.getElementById("textBox");
    var textContent = "Now i'll navigate you through the road use arrow keys to respond 'Now do it!!'"; // Sample text
    var index = 0;

    // Show sprite
    setTimeout(function() {
      sprite.style.opacity = "1";
      sprite.style.transform = "translate(0, 0)";
    }, 500);

    // Show text box after sprite appears
    setTimeout(function() {
      textBox.style.opacity = "1";
      typeText();
    }, 1500);

    // Hide text box after all text is typed
    setTimeout(function() {
      textBox.style.opacity = "0";
    }, textContent.length * 100 + 1500);

    // Hide sprite and text box after a certain amount of time
    setTimeout(function() {
      sprite.style.opacity = "0";
      sprite.style.transform = "translate(100%, 0)";
    }, textContent.length * 100 + 1500); // Adjust timing as needed

    // Function to simulate typing effect
    function typeText() {
      if (index < textContent.length) {
        textBox.textContent += textContent.charAt(index);
        index++;
        setTimeout(typeText, 100); // Adjust typing speed
      }
    }
  });