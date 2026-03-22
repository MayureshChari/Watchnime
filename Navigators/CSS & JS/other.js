const chatbots = {
    chatbot1: {
        responses: ["Hi, I am Roanoa Zoro", "I am here to navigate you to the Anime world.", "Are you coming with me or not?", "Click again to confirm", ""],
        responseIndex: -1,
        confirmationMessage: "Zoro want to take you to the world of Anime",
        redirectUrl: "../Navigators/Navigator/Zoro/Zoro.html",
    },
    chatbot2: {
        responses: ["Hi, I am Naruto Uzumaki Dattebayo", "I am here to navigate you to the Anime world.", "Why you asked cause You and I are same?", "Click again to confirm", ""],
        responseIndex: -1,
        confirmationMessage: "Naruto want to take you to the world of Anime",
        redirectUrl: "../Navigators/Navigator/Naruto/Naruto.html",
    },
    chatbot3: {
        responses: ["Message 1 from Chatbot 3.", "Message 2 from Chatbot 3."],
        responseIndex: -1,
        confirmationMessage: "Do you want to go to Movies.html?",
        redirectUrl: "Movies.html",
    },
    chatbot4: {
        responses: ["Message 1 from Chatbot 4.", "Message 2 from Chatbot 4."],
        responseIndex: -1,
        confirmationMessage: "Do you want to go to Games.html?",
        redirectUrl: "Games.html",
    },
    chatbot5: {
        responses: ["Message 1 from Chatbot 5.", "Message 2 from Chatbot 5."],
        responseIndex: -1,
        confirmationMessage: "Do you want to go to Games.html?",
        redirectUrl: "Games.html",
    },
};

function sendMessage(chatbotId) {
    const chatDiv = document.getElementById(`chat-output${chatbotId.charAt(chatbotId.length - 1)}`);
    const bot = chatbots[chatbotId];

    // Increment responseIndex for the next response
    bot.responseIndex = (bot.responseIndex + 1) % bot.responses.length;

    // Get the next predefined response
    const botResponse = bot.responses[bot.responseIndex];

    // Display bot message in chat one character at a time
    displayResponseOneCharacterAtATime(chatDiv, botResponse);

    // Check if all responses are displayed
    if (bot.responseIndex === bot.responses.length - 1) {
        // Display a confirmation dialog specific to each chatbot
        const userConfirmed = window.confirm(bot.confirmationMessage);
        if (userConfirmed) {
            // Redirect to the URL specific to each chatbot
            window.location.href = bot.redirectUrl;
        }
    }
}

function displayResponseOneCharacterAtATime(element, response) {
    const delay = 50;
    let index = 0;

    function appendText() {
        if (index < response.length) {
            element.innerHTML += response.charAt(index);
            index++;
            setTimeout(appendText, delay);
        } else {
            // Add a delay to remove the message after 2 seconds
            setTimeout(() => {
                element.innerHTML = '';
            }, 1000);
        }
    }

    appendText();
}
