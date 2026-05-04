const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍'];
const cards = [...cardSymbols, ...cardSymbols];

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

  return card;
}

function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';

  cards.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });
}

renderBoard();
