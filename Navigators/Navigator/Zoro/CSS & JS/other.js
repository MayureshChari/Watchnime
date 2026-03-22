const chatOutput = document.querySelector('.chat-message');
const initialMessage = "I know we are getting late but can you choose  between Anime series and Anime movies";
displayResponseOneCharacterAtATime(chatOutput, initialMessage);

function displayResponseOneCharacterAtATime(element, response) {
    const delay = 50;
    let index = 0;

    function appendText() {
        if (index < response.length) {
            element.innerHTML += response.charAt(index);
            index++;
            setTimeout(appendText, delay);
        } else {
            // Show the first set of options after the initial message
            document.getElementById('options').style.display = 'block';
        }
    }

    appendText();
}

function chooseOption(option) {
    const confirmMessage = "Confirm please";
    chatOutput.innerHTML = confirmMessage;
    document.getElementById('options').style.display = 'none';

    if (option === 'Anime Series') {
        document.getElementById('separateOptions').style.display = 'block';
    } else if (option === 'Anime Movies') {
        window.location.href = 'Destination/Final/Anime Movies/Lost.html'; // Redirect to the Movies page
        chatOutput.innerHTML = "Let's go!";
    }
}

function chooseOptionTwo(option) {
    const confirmMessage = "Confirm please";
    chatOutput.innerHTML = confirmMessage;
    document.getElementById('separateOptions').style.display = 'none';

    if (option === 'Watched') {
        window.location.href = 'Destination/Final/Anime series/Watched/Lost.html'; 
        chatOutput.innerHTML = "Let's go!";
    } else if (option === 'Watching') {
        window.location.href = 'Destination/Final/Anime series/Watching/Lost.html'; // Redirect to the Watching page
        chatOutput.innerHTML = "Let's go!";
    }
}