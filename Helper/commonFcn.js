//import statements
import { findDiagonalPieces } from "../Events/global.js";
import { globalState, keySquareMapper } from "../index.js";

//checking if the oponents piece is in way
function checkPieceOfOpponent(id, color) {
  let alpha = id[0].charCodeAt(0);
  let num = Number(id[1]);

  if (
    alpha >= "a".charCodeAt(0) &&
    alpha <= "h".charCodeAt(0) &&
    num >= 1 &&
    num <= 8
  ) {
    let element = keySquareMapper[id];
    if (element.piece && element.piece.color != color) {
      return true;
    }
  }
  return false;
}

//getting king move ids
function giveKingMoves(id) {
  let returnArray = [];

  giveQueenMovements(id).forEach((line) => {
    if (line.length >= 1) {
      returnArray.push([line[0]]);
    }
  });
  return returnArray;
}

//getting diagonal moves
function getBottomIdLeft(id) {
  let bottomLeftArray = [];
  while (id[0] != "a" && Number(id[1]) < 8) {
    let num = Number(id[1]) + 1;
    id = `${String.fromCharCode(id[0].charCodeAt(0) - 1)}${num}`;
    bottomLeftArray.push(id);
  }
  return bottomLeftArray;
}
function getBottomIdRight(id) {
  let bottomRightArray = [];
  while (id[0] != "h" && Number(id[1]) < 8) {
    let num = Number(id[1]) + 1;
    id = `${String.fromCharCode(id[0].charCodeAt(0) + 1)}${num}`;
    bottomRightArray.push(id);
  }
  return bottomRightArray;
}
function getTopIdLeft(id) {
  let topLeftArray = [];
  while (id[0] != "a" && Number(id[1]) > 1) {
    let num = Number(id[1]) - 1;
    id = `${String.fromCharCode(id[0].charCodeAt(0) - 1)}${num}`;
    topLeftArray.push(id);
  }
  return topLeftArray;
}
function getTopIdRight(id) {
  let topRightArray = [];
  while (id[0] != "h" && Number(id[1]) > 1) {
    let num = Number(id[1]) - 1;
    id = `${String.fromCharCode(id[0].charCodeAt(0) + 1)}${num}`;
    topRightArray.push(id);
  }
  return topRightArray;
}

function giveDiagonalHighlightIds(id) {
  let topLeftArray = getTopIdLeft(id);
  let topRightArray = getTopIdRight(id);
  let bottomLeftArray = getBottomIdLeft(id);
  let bottomRightArray = getBottomIdRight(id);

  return [topLeftArray, topRightArray, bottomLeftArray, bottomRightArray];
}

// getting move ids for rook
function getTop(id) {
  let topArray = [];
  while (id[1] > 1) {
    let num = Number(id[1]) - 1;
    id = id[0] + num;
    topArray.push(id);
  }
  return topArray;
}
function getBottom(id) {
  let bottomArray = [];
  while (id[1] < 8) {
    let num = Number(id[1]) + 1;
    id = id[0] + num;
    bottomArray.push(id);
  }
  return bottomArray;
}
function getLeft(id) {
  let leftArray = [];
  while (id[0].charCodeAt(0) > 97) {
    let alpha = String.fromCharCode(id[0].charCodeAt(0) - 1);
    id = alpha + id[1];
    leftArray.push(id);
  }
  return leftArray;
}
function getRight(id) {
  let rightArray = [];
  while (id[0].charCodeAt(0) < 104) {
    let alpha = String.fromCharCode(id[0].charCodeAt(0) + 1);
    id = alpha + id[1];
    rightArray.push(id);
  }
  return rightArray;
}

function giveXyHighlightIds(id) {
  let top = getTop(id);
  let bottom = getBottom(id);
  let right = getRight(id);
  let left = getLeft(id);

  return [top, bottom, right, left];
}

//getting move ids for knight
function topFirst(id) {
  let idNum = Number(id[1]) + 1;
  let idAlpha = id[0].charCodeAt(0);

  let alpha1 = String.fromCharCode(idAlpha - 2);
  let alpha2 = String.fromCharCode(idAlpha + 2);

  return [alpha1 + idNum, alpha2 + idNum];
}
function topSecond(id) {
  let idNum = Number(id[1]) + 2;
  let idAlpha = id[0].charCodeAt(0);

  let alpha1 = String.fromCharCode(idAlpha - 1);
  let alpha2 = String.fromCharCode(idAlpha + 1);

  return [alpha1 + idNum, alpha2 + idNum];
}
function bottomFirst(id) {
  let idNum = Number(id[1]) - 1;
  let idAlpha = id[0].charCodeAt(0);

  let alpha1 = String.fromCharCode(idAlpha - 2);
  let alpha2 = String.fromCharCode(idAlpha + 2);

  return [alpha1 + idNum, alpha2 + idNum];
}
function bottomSecond(id) {
  let idNum = Number(id[1]) - 2;
  let idAlpha = id[0].charCodeAt(0);

  let alpha1 = String.fromCharCode(idAlpha - 1);
  let alpha2 = String.fromCharCode(idAlpha + 1);

  return [alpha1 + idNum, alpha2 + idNum];
}

function validateId(id) {
  let idNum = Number(id.slice(1));
  let idAlpha = id[0].charCodeAt(0);

  return idNum >= 1 && idNum <= 8 && idAlpha >= 97 && idAlpha <= 104;
}

function giveKnightMoves(id) {
  const moveArray = [];

  const moveFunctions = [topFirst, topSecond, bottomFirst, bottomSecond];

  moveFunctions.forEach((moveFunction) => {
    moveFunction(id).forEach((cId) => {
      if (validateId(cId)) {
        moveArray.push(cId);
      }
    });
  });

  return moveArray;
}

//getting Queen movement ids
function giveQueenMovements(id) {
  let top = getTop(id);
  let bottom = getBottom(id);
  let right = getRight(id);
  let left = getLeft(id);
  let topLeftArray = getTopIdLeft(id);
  let topRightArray = getTopIdRight(id);
  let bottomLeftArray = getBottomIdLeft(id);
  let bottomRightArray = getBottomIdRight(id);

  return [
    top,
    bottom,
    right,
    left,
    topLeftArray,
    topRightArray,
    bottomLeftArray,
    bottomRightArray,
  ];
}

//getting capture ids of each piece to check if the king is checked
function giveQueenCaptureIds(square, piece) {
  let queenMovementsId = giveQueenMovements(square.id);
  console.log(queenMovementsId);

  let captureIds = [];
  queenMovementsId.forEach((line) => {
    for (let squareId of line) {
      let square = keySquareMapper[squareId];
      if (square.piece != null) {
        if (checkPieceOfOpponent(square.id, piece.color)) {
          captureIds.push(square.id);
        }
        break;
      }
    }
  });

  return captureIds;
}

function giveBishopCaptureIds(square, piece) {
  let diagonalHighlightId = giveDiagonalHighlightIds(square.id);
  let captureIds = [];

  diagonalHighlightId.forEach((diagonal) => {
    for (let squareId of diagonal) {
      let square = keySquareMapper[squareId];
      if (square.piece != null) {
        if (checkPieceOfOpponent(square.id, piece.color)) {
          captureIds.push(square.id);
        }
        break;
      }
    }
  });

  return captureIds;
}

function giveRookCaptureIds(square, piece) {
  let captureIds = [];
  let xyHighlightIds = giveXyHighlightIds(square.id);

  xyHighlightIds.forEach((line) => {
    for (let squareId of line) {
      let square = keySquareMapper[squareId];
      if (square.piece != null) {
        if (checkPieceOfOpponent(square.id, piece.color)) {
          captureIds.push(square.id);
        }
        break;
      }
    }
  });
  return captureIds;
}

function giveKnightCaptureIds(square, piece) {
  let knightMoveId = giveKnightMoves(square.id);

  let captureIds = [];

  knightMoveId.forEach((squareId) => {
    let square = keySquareMapper[squareId];
    if (square.piece != null) {
      if (checkPieceOfOpponent(square.id, piece.color)) {
        captureIds.push(squareId);
      }
    }
  });

  return captureIds;
}

function giveKingCaptureIds(square, piece) {
  let kingMoves = giveKingMoves(square.id);

  let captureIds = [];

  kingMoves.forEach((id) => {
    let square = keySquareMapper[id];
    if (square.piece != null) {
      if (checkPieceOfOpponent(square.id, piece.color)) {
        captureIds.push(square.id);
      }
    }
  });

  return captureIds;
}

function givePawnCaptureIds(square, piece) {
  let captureIds = findDiagonalPieces(piece);

  return captureIds;
}

// checking if the king is checked
function checkForKingCheck(color) {
  let captureIdsArray = [];
  const flatData = globalState.flat();

  const pieceTypeToFunction = {
    pawn: givePawnCaptureIds,
    bishop: giveBishopCaptureIds,
    rook: giveRookCaptureIds,
    queen: giveQueenCaptureIds,
    knight: giveKnightCaptureIds,
    king: giveKingCaptureIds,
  };

  flatData.forEach((square) => {
    if (square.piece != null) {
      if (square.piece.color != color) {
        let findFunction =
          pieceTypeToFunction[square.piece.pieceType.toLowerCase()];
        let captureIds = findFunction(square, square.piece);
        for (const captureId of captureIds) {
          let captureSquare = keySquareMapper[captureId];
          console.log(captureSquare);
          if (
            captureSquare.piece.pieceType == "King" &&
            captureSquare.piece.color == color
          ) {
            captureIdsArray.push({ square, captureId });
          }
        }
      }
    }
  });

  return captureIdsArray;
}

//determining the winner
function checkForWinner() {
  let flatData = globalState.flat();

  let pieceArray = flatData.filter((square) => square.piece != null);

  let kingPlaces = pieceArray.filter(
    (square) => square.piece.pieceType === "King"
  );
  if (kingPlaces.length === 1) {
    return kingPlaces[0].piece.color;
  }

  return null;
}

export {
  checkForKingCheck,
  checkForWinner,
  checkPieceOfOpponent,
  giveDiagonalHighlightIds,
  giveKingMoves,
  giveKnightMoves,
  giveQueenMovements,
  giveXyHighlightIds,
};
