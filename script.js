const boardSize = 10; // Tamanho do tabuleiro
const numShips = 5; // Número de navios
let playerScore = 0; // Pontuação do jogador
let machineScore = 0; // Pontuação da máquina
let gameStarted = false; // Flag para verificar se o jogo começou
let difficulty = 'easy'; // Nível de dificuldade
let playerBoard = []; // Tabuleiro do jogador
let machineBoard = []; // Tabuleiro da máquina

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('board-container');
  const easyBtn = document.getElementById('easy-btn');
  const hardBtn = document.getElementById('hard-btn');
  const startBtn = document.getElementById('start-btn');
  const scoreContainer = document.getElementById('score-container');
  const playerScoreElement = document.getElementById('player-score');
  const machineScoreElement = document.getElementById('machine-score');

  // Botão de dificuldade fácil
  easyBtn.addEventListener('click', () => {
    difficulty = 'easy';
    alert('Nível fácil selecionado.');
  });

  // Botão de dificuldade difícil
  hardBtn.addEventListener('click', () => {
    difficulty = 'hard';
    alert('Nível difícil selecionado.');
  });

  // Botão de iniciar/reiniciar o jogo
  startBtn.addEventListener('click', startGame);

  // Função para iniciar o jogo
  function startGame() {
    gameStarted = true;
    playerScore = 0;
    machineScore = 0;
    playerScoreElement.textContent = playerScore;
    machineScoreElement.textContent = machineScore;
    scoreContainer.classList.remove('hidden');
    boardContainer.innerHTML = '';
    playerBoard = createBoard();
    machineBoard = createBoard();
    placeShips(playerBoard);
    placeShips(machineBoard);
    renderBoard();
  }

  // Criação do tabuleiro
  function createBoard() {
    return Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  }

  // Posicionamento aleatório dos navios
  function placeShips(board) {
    for (let i = 0; i < numShips; i++) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (!board[row][col]) {
          board[row][col] = 'ship';
          placed = true;
        }
      }
    }
  }

  // Renderização do tabuleiro
  function renderBoard() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.row = i;
        tile.dataset.col = j;
        tile.addEventListener('click', onTileClick);
        boardContainer.appendChild(tile);
      }
    }
  }

  // Função chamada ao clicar em um tile
  function onTileClick(event) {
    if (!gameStarted) return;

    const tile = event.target;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);

    if (tile.style.backgroundImage) return; // Evita clicar no mesmo tile

    // Verifica se o jogador acertou um navio
    if (machineBoard[row][col] === 'ship') {
      tile.style.backgroundImage = "url('img/hit.png')";
      playerScore++;
    } else {
      tile.style.backgroundImage = "url('img/miss.png')";
    }

    playerScoreElement.textContent = playerScore;

    // Se todos os navios forem afundados, finaliza o jogo
    if (playerScore + machineScore >= numShips) {
      endGame();
    } else {
      machinePlay();
    }
  }

  // Turno da máquina
  function machinePlay() {
    let row, col, tile;
    do {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
      tile = boardContainer.children[row * boardSize + col];
    } while (tile.style.backgroundImage); // Evita clicar no mesmo tile

    // Verifica se a máquina acertou um navio
    if (playerBoard[row][col] === 'ship') {
      tile.style.backgroundImage = "url('img/hit.png')";
      machineScore++;
    } else {
      tile.style.backgroundImage = "url('img/miss.png')";
    }
    machineScoreElement.textContent = machineScore;

    // Se todos os navios forem afundados, finaliza o jogo
    if (playerScore + machineScore >= numShips) {
      endGame();
    }
  }

  // Finaliza o jogo e exibe o vencedor
  function endGame() {
    gameStarted = false;
    const message = playerScore > machineScore ? 'Jogador venceu!' : 'Máquina venceu!';
    alert(`${message} Pontuação: Jogador ${playerScore}, Máquina ${machineScore}`);
  }
});
  