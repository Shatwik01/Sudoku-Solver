const arr = [[], [], [], [], [], [], [], [], []];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

let board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = '';
    }
  }
}

const easy = document.getElementById('easy');
const Medium = document.getElementById('Medium');
const Hard = document.getElementById('Hard');
const SolvePuzzle = document.getElementById('SolvePuzzle');

easy.onclick = function () {
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    const response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.board;
    FillBoard(board);
  };
  xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy');
  xhrRequest.send();
};
Medium.onclick = function () {
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    const response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.board;
    FillBoard(board);
  };
  xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=medium');
  xhrRequest.send();
};
Hard.onclick = function () {
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    const response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.board;
    FillBoard(board);
  };
  xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=hard');
  xhrRequest.send();
};

SolvePuzzle.onclick = () => {
  SudokuSolver(board, 0, 0, 9);
};

function isValid(board, i, j, num, n) {
  for (let x = 0; x < n; x++) {
    if (board[i][x] == num || board[x][j] == num) {
      return false;
    }
  }
  const root = Math.sqrt(n);
  const fi = i - i % root;
  const fj = j - j % root;

  for (let x = fi; x < fi + root; x++) {
    for (let y = fj; y < fj + root; y++) {
      if (board[x][y] == num) {
        return false;
      }
    }
  }
  return true;
}

function SudokuSolver(board, i, j, n) {
  // base case
  if (i == n) {
    // print(board, n);
    FillBoard(board);
    return true;
  }
  // when not in the board
  if (j == n) {
    return SudokuSolver(board, i + 1, 0, n);
  }

  // when already filled
  if (board[i][j] != 0) {
    return SudokuSolver(board, i, j + 1, n);
  }

  // filling cell with nums
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, i, j, num, n)) {
      board[i][j] = num;
      const subset = SudokuSolver(board, i, j + 1, n);
      if (subset) {
        return true;
      }
      board[i][j] = 0;
    }
  }
  return false;
}
