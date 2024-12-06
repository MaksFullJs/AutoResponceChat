function getRandomQuote() {
    const quotes = [
        "Dream big.",
        "Stay positive.",
        "Work hard.",
        "Keep going.",
        "Be fearless.",
        "Stay humble.",
        "Enjoy life.",
        "Believe in yourself.",
        "Do your best.",
        "Never give up.",
        "Stay strong.",
        "Take the risk.",
        "Embrace change.",
        "Create your future.",
        "Chase your dreams.",
        "Be kind.",
        "Focus on the good.",
        "Keep learning.",
        "You are enough.",
        "Choose happiness.",
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

module.exports = {getRandomQuote};