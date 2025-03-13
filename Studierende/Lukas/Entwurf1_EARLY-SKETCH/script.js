/* script.js */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const columns = 40; // Adjust grid resolution
  const rows = 26; // Adjust grid resolution
  const totalCells = columns * rows;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${3024 / columns}px`;
    cell.style.height = `${1964 / rows}px`;
    grid.appendChild(cell);
  }
});
