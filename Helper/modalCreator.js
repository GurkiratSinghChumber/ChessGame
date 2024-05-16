import {
  blackBishop,
  blackKnight,
  blackQueen,
  blackRook,
  whiteBishop,
  whiteKnight,
  whiteQueen,
  whiteRook,
} from "../Data/pieces.js";

class ModalCreator {
  constructor(body) {
    if (!body) {
      throw new Error("Please pass the body");
    }
    this.open = false;
    this.body = body;
  }

  show() {
    this.open = true;
    const root = document.getElementById("root");
    root.appendChild(this.body);
  }
  hide() {
    this.open = false;
    const root = document.getElementById("root");
    root.removeChild(this.body);
  }
}

function pawnPromotion(color, callBack, id) {
  const rook = document.createElement("img");
  rook.src = `../Asset/Images/${color}/rook.png`;
  rook.onclick = () => {
    if (color == "White") {
      callBack(whiteRook(id), id);
    } else {
      callBack(blackRook(id), id);
    }

    modal.hide();
  };

  const bishop = document.createElement("img");
  bishop.src = `../Asset/Images/${color}/bishop.png`;
  bishop.onclick = () => {
    if (color == "White") {
      callBack(whiteBishop(id), id);
    } else {
      callBack(blackBishop(id), id);
    }
    modal.hide();
  };

  const queen = document.createElement("img");
  queen.src = `../Asset/Images/${color}/queen.png`;
  queen.onclick = () => {
    if (color == "White") {
      callBack(whiteQueen(id), id);
    } else {
      callBack(blackQueen(id), id);
    }
    modal.hide();
  };

  const knight = document.createElement("img");
  knight.src = `../Asset/Images/${color}/knight.png`;
  knight.onclick = () => {
    if (color == "White") {
      callBack(whiteKnight(id), id);
    } else {
      callBack(blackKnight(id), id);
    }
    modal.hide();
  };

  const imageContainer = document.createElement("div");
  imageContainer.appendChild(rook);
  imageContainer.appendChild(bishop);
  imageContainer.appendChild(queen);
  imageContainer.appendChild(knight);

  const msg = document.createElement("p");
  msg.textContent = "Your pawn has been promoted";

  const finalContainer = document.createElement("div");
  finalContainer.setAttribute("class", "modal");
  finalContainer.appendChild(msg);
  finalContainer.appendChild(imageContainer);

  const modal = new ModalCreator(finalContainer);

  modal.show();
}

const imgContainer = document.querySelector(".modal div");

if (imgContainer) {
  imgContainer.addEventListener("click", handleClick);
}

export default pawnPromotion;
