const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍'];
let cards = [...cardSymbols, ...cardSymbols];

let flippedCards = [];
let lockBoard = false;
let moves = 0;
let timer = 0;
let timerInterval = null;

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = timer;
  }, 1000);
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back">${symbol}</div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lockBoard) return;
  if (flippedCards.includes(card)) return;

  startTimer();

  card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    moves++;
    document.getElementById('moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const matched = card1.dataset.symbol === card2.dataset.symbol;

  if (matched) {
    resetFlipped();
  } else {
    setTimeout(() => {
      card1.querySelector('.card-inner').style.transform = '';
      card2.querySelector('.card-inner').style.transform = '';
      resetFlipped();
    }, 1000);
  }
}

function resetFlipped() {
  flippedCards = [];
  lockBoard = false;
}

function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';

  shuffleCards();

  cards.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });
}

renderBoard();
