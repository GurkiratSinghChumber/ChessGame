let index = 0;
function moveLoger(from, to, pieceName) {
  index++;
  let data = document.querySelector(".data");
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  data.appendChild(row);
  for (let i = 0; i < 3; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    if (i == 0) {
      cell.innerHTML = pieceName;
    } else if (i == 1) {
      cell.innerHTML = from;
    } else {
      cell.innerHTML = to;
    }

    row.appendChild(cell);
  }
}

export { moveLoger };
