//black pieces
function blackPawn(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/pawn.png",
    color: "black",
    pieceName: "BLACK_PAWN",
    pieceType: "Pawn",
  };
}

function blackRook(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/rook.png",
    color: "black",
    pieceName: "BLACK_ROOK",
    pieceType: "Rook",
  };
}

function blackKnight(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/knight.png",
    color: "black",
    pieceName: "BLACK_KNIGHT",
    pieceType: "Knight",
  };
}

function blackBishop(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/bishop.png",
    color: "black",
    pieceName: "BLACK_BISHOP",
    pieceType: "Bishop",
  };
}

function blackKing(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/king.png",
    color: "black",
    pieceName: "BLACK_KING",
    pieceType: "King",
  };
}

function blackQueen(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/Black/queen.png",
    color: "black",
    pieceName: "BLACK_QUEEN",
    pieceType: "Queen",
  };
}

//white pieces

function whitePawn(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/pawn.png",
    color: "white",
    pieceName: "WHITE_PAWN",
    pieceType: "Pawn",
  };
}

function whiteRook(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/rook.png",
    color: "white",
    pieceName: "WHITE_ROOK",
    pieceType: "Rook",
  };
}

function whiteKnight(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/knight.png",
    color: "white",
    pieceName: "WHITE_KNIGHT",
    pieceType: "Knight",
  };
}

function whiteBishop(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/bishop.png",
    color: "white",
    pieceName: "WHITE_BISHOP",
    pieceType: "Bishop",
  };
}

function whiteKing(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/king.png",
    color: "white",
    pieceName: "WHITE_KING",
    pieceType: "King",
  };
}
function whiteQueen(currentPosition) {
  return {
    currentPosition,
    img: "Asset/Images/White/queen.png",
    color: "white",
    pieceName: "WHITE_QUEEN",
    pieceType: "Queen",
  };
}
export {
  blackBishop,
  blackKing,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKing,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
};
