const prompt = require('readline-sync');

class TicTacToe {
  constructor() {
    this.board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
    this.turn = 'X';
    this.moves = 0;
  }

  printBoard() {
    for (const row of this.board) {
      console.log(`${row[0]} | ${row[1]} | ${row[2]}`);
      console.log('----------');
    }
  }
  chooseSpot() {
    const num = prompt.question(`${this.turn} choose a spot\n`);
    // Input validation
    if (!Number.isInteger(Number(num))) {
      console.log('That is not a number. Choose a number');
      this.chooseSpot();
      return;
    }
    if (Number(num) > 8 || Number(num) < 0) {
      console.log('Choose a number in the range specified');
      this.chooseSpot();
      return;
    }
    console.log(num);
    this.board[Math.floor(Number(num) / 3)][Number(num) % 3] = this.turn;
    this.moves += 1;
  }
  switchTurn() {
    return this.turn === 'X' ? this.turn = 'O' : this.turn = 'X';
  }


  // Check for winner
  checkWinner() {
    return this.checkRows() || this.checkCols() || this.checkDiag();
  }
  compareThree(first, sec, third) {
    return first === sec && sec === third;
  }
  checkRows() {
    for (const row of this.board) {
      if (this.compareThree(row[0], row[1], row[2])) return true;
    }
    return false;
  }
  checkCols() {
    for (let i = 0; i < 3; i += 1) {
      if (this.compareThree(this.board[0][i], this.board[1][i],
          this.board[2][i])) return true;
    }
    return false;
  }
  checkDiag() {
    if (this.compareThree(this.board[0][0], this.board[1][1], this.board[2][2])) return true;
    if (this.compareThree(this.board[2][0], this.board[1][1], this.board[0][2])) return true;
    return false
  }
  checkTie() {
    return this.moves === 9;
  }



  play() {
    this.chooseSpot();
    this.printBoard();
    // check winner or tie
    if (this.checkWinner()) {
      console.log(`${this.turn} wins!`);
      return;
    }
    if (this.checkTie()) {
      console.log("It's a tie!");
      return;
    }
    this.switchTurn();
    this.play();
  }
}

const game= new TicTacToe();

game.printBoard();
game.play();
