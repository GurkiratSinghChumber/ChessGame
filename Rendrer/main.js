import * as pieces from "../Data/pieces.js";
import { checkForKingCheck } from "../Helper/commonFcn.js";
import { globalState } from "../index.js";

const ROOT_DIV = document.getElementById("root");

// function Global state renderer  (This function is useful for rendering peices from global state data)

function pieceRender(data) {
  data.forEach((element) => {
    element.forEach((square) => {
      if (square.piece != null) {
        let image = document.createElement("img");
        image.src = square.piece.img;
        document.getElementById(square.id).appendChild(image);
      }
    });
  });
}

// only when game starts
function initGameRendrer(data) {
  data.forEach((element) => {
    let rowEl = document.createElement("div");
    rowEl.setAttribute("class", "squareRow");
    ROOT_DIV.appendChild(rowEl);

    element.forEach((square) => {
      let squareDiv = document.createElement("div");

      rowEl.appendChild(squareDiv);
      squareDiv.setAttribute("class", square.color + " square");
      squareDiv.setAttribute("id", square.id);

      const lableId = square.id;
      if (lableId[1] == 8) {
        let squareP = document.createElement("p");
        squareP.innerHTML = lableId[0];
        squareP.setAttribute("class", "squarePchar squareP");
        squareDiv.appendChild(squareP);
      }
      if (lableId[0] == "a") {
        let squareP = document.createElement("p");
        squareP.innerHTML = lableId[1];
        squareP.setAttribute("class", "squarePnum squareP");
        squareDiv.appendChild(squareP);
      }

      if (square.id[1] == 7) {
        //render blcak pieces
        square.piece = pieces.blackPawn(square.id);
      }

      if (square.id[1] == 8 && (square.id[0] == "a" || square.id[0] == "h")) {
        square.piece = pieces.blackRook(square.id);
      }

      if (square.id[1] == 8 && (square.id[0] == "b" || square.id[0] == "g")) {
        square.piece = pieces.blackKnight(square.id);
      }
      if (square.id[1] == 8 && (square.id[0] == "c" || square.id[0] == "f")) {
        square.piece = pieces.blackBishop(square.id);
      }
      if (square.id[1] == 8 && square.id[0] == "e") {
        square.piece = pieces.blackQueen(square.id);
      }
      if (square.id[1] == 8 && square.id[0] == "d") {
        square.piece = pieces.blackKing(square.id);
      }

      //render white pieces
      if (square.id[1] == 2) {
        square.piece = pieces.whitePawn(square.id);
      }

      if (square.id[1] == 1 && (square.id[0] == "a" || square.id[0] == "h")) {
        square.piece = pieces.whiteRook(square.id);
      }

      if (square.id[1] == 1 && (square.id[0] == "b" || square.id[0] == "g")) {
        square.piece = pieces.whiteKnight(square.id);
      }
      if (square.id[1] == 1 && (square.id[0] == "c" || square.id[0] == "f")) {
        square.piece = pieces.whiteBishop(square.id);
      }
      if (square.id[1] == 1 && square.id[0] == "d") {
        square.piece = pieces.whiteQueen(square.id);
      }
      if (square.id[1] == 1 && square.id[0] == "e") {
        square.piece = pieces.whiteKing(square.id);
      }
    });
  });

  pieceRender(data);
}

//selected
let pieceArray = [];

//self highlight
function selfHighlight(piece) {
  pieceArray.push(piece);
  let currentSquare = document.getElementById(piece.currentPosition);
  let prevSquare = document.querySelector(".selected");
  if (prevSquare) {
    prevSquare.classList.remove("selected");
  }
  currentSquare.classList.add("selected");
}

// render highlight
function renderHighlight(squareId) {
  const highlightSpan = document.createElement("span");
  highlightSpan.classList.add("circle");
  let square = document.getElementById(squareId);
  console.log(square);
  square.appendChild(highlightSpan);
}

const clearSelfHighlight = () => {
  pieceArray.pop();
  let prevSquare = document.querySelector(".selected");
  if (prevSquare) {
    prevSquare.classList.remove("selected");
  }
};

//clear all highlights
function clearHighlightState() {
  const highlightedSquareIds = [];

  globalState.forEach((row) => {
    row.forEach((square) => {
      if (square.highlight == true) {
        highlightedSquareIds.push(square.id);
        square.highlight = false;
      }
    });
  });
  highlightedSquareIds.forEach((id) => {
    let toRemove = document.getElementById(id).querySelector(".circle");
    if (toRemove) {
      toRemove.remove();
    }
  });
}

//highlighting capture ids
function highlightCapture(ids) {
  ids.forEach((id) => {
    document.getElementById(id).classList.add("red");
  });
}

//clearing highlight from the capture ids
function clearCaptureHighlight() {
  document.querySelectorAll(".red").forEach((elem) => {
    elem.classList.remove("red");
  });
}

//function for clearing all highlights
function clearAllHighlight() {
  clearCaptureHighlight();
  clearHighlightState();
  clearSelfHighlight();
}

//marking the checked king
function kingCheckRender(colorTurn) {
  let captureIds = checkForKingCheck(colorTurn);
  let checked = document.querySelector(".checkedKing");
  if (checked) {
    checked.classList.remove("checkedKing");
  }
  if (captureIds.length > 0) {
    let checkedKingId = captureIds[0].captureId;
    if (checkedKingId) {
      let checked = document.getElementById(checkedKingId);
      checked.classList.add("checkedKing");
      alert("Save Your King");
    }
  }
}
export {
  clearAllHighlight,
  clearCaptureHighlight,
  clearHighlightState,
  clearSelfHighlight,
  highlightCapture,
  initGameRendrer,
  kingCheckRender,
  pieceArray,
  renderHighlight,
  selfHighlight,
};
