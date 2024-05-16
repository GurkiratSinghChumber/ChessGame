//for each square
function Square(color, id, piece) {
  return {
    color,
    id,
    piece,
  };
}

function squareCol(rowId) {
  const squareRow = [];
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

  alphabet.forEach((letter, index) => {
    let id = letter + rowId;
    if ((rowId + index) % 2 == 0) {
      squareRow.push(Square("black", id, null));
    } else {
      squareRow.push(Square("white", id, null));
    }
  });

  return squareRow;
}

function initGame() {
  const board = [];
  for (let i = 1; i <= 8; i++) {
    board.push(squareCol(i));
  }
  return board;
}

export { initGame };
