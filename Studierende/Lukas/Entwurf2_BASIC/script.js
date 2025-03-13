document.addEventListener("DOMContentLoaded", updateGrid);
window.addEventListener("resize", updateGrid);

function updateGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = ""; // Clear existing grid cells

  let columns, rows;

  if (window.innerWidth <= 768) {
    columns = 13;
    rows = 8;
  } else if (window.innerWidth <= 1200) {
    columns = 18;
    rows = 12;
  } else {
    columns = 20;
    rows = 15;
  }

  const totalCells = columns * rows;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.style.gridColumn = (i % columns) + 1;
    cell.style.gridRow = Math.floor(i / columns) + 1;
    grid.appendChild(cell);
  }
}
