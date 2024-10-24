const emojis = ["😍", "😎", "😝", "😂", "😡", "🥶", "😭", "🤩"];
let cards = [...emojis, ...emojis];
let selectedCards = [];
let matchedCards = [];
let attempts = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    const board = document.getElementById('board');
    board.innerHTML = '';

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.innerHTML = '';

        card.addEventListener('click', () => selectCard(card, emoji));
        board.appendChild(card);
    });
    matchedCards = [];
    selectedCards = [];
    attempts = 0;
    document.getElementById('result').textContent = `Attempts: ${attempts}`;
}

let isProcessing = false; // Prevents clicking while checking for a match

function selectCard(card, emoji) {
    if (isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return; // Ignore if already flipped or if two cards are being checked
    }

    card.innerHTML = emoji;
    card.classList.add('flipped');
    selectedCards.push({ card, emoji });

    if (selectedCards.length === 2) {
        isProcessing = true; // Block other clicks while processing
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [first, second] = selectedCards;

    if (first.emoji === second.emoji) {
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        matchedCards.push(first, second);
    } else {
        first.card.innerHTML = '';
        second.card.innerHTML = '';
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
    }

    selectedCards = [];
    attempts++;
    isProcessing = false; // Allow clicks again
    document.getElementById('result').textContent = `Attempts: ${attempts}`;

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert(`You won in ${attempts} attempts!`), 500);
    }
}

// Add event listener for reset button
document.getElementById('reset-button').addEventListener('click', createBoard);

// Initialize the game
createBoard();
