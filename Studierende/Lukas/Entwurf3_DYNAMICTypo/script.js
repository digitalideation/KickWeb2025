const showWarningInChromiumWithNoSupport = () => {
  if (!navigator.userAgentData || !navigator.userAgentData.brands) return;

  const chromium = navigator.userAgentData.brands.filter(
    (b) => b.brand == "Chromium"
  );
  if (!chromium) return;

  if (chromium[0].version >= 107) return;
  document.querySelector(".warning").style.display = "block";
};

showWarningInChromiumWithNoSupport();

function adjustTextSize() {
  const cells = document.querySelectorAll(".grid > .cell");

  cells.forEach((cell) => {
    const span = cell.querySelector("span");
    if (!span) return; // Skip empty cells

    // Reset transformations before measurement
    span.style.transform = "none";
    span.style.fontSize = "100px"; // Set base font size for measurement
    span.style.whiteSpace = "nowrap"; // Prevent line breaks

    // Get cell & text sizes
    const cellWidth = cell.offsetWidth;
    const cellHeight = cell.offsetHeight;
    const textWidth = span.offsetWidth;
    const textHeight = span.offsetHeight;

    // Check if it's a rotated element
    const isRotated = span.classList.contains("rotated-text");
    const isRotated2 = span.classList.contains("rotated-text2");

    // Calculate scale factors
    let scaleX, scaleY;

    if (isRotated || isRotated2) {
      // For rotated text, swap width and height for scaling
      scaleX = cellHeight / textWidth; // Scale based on the cell height for rotated text
      scaleY = cellWidth / textHeight; // Scale based on the cell width for rotated text

      // Apply rotation FIRST, then scaling for rotated elements
      if (isRotated) {
        span.style.transform = `rotate(-90deg) scale(${scaleX}, ${scaleY})`;
      } else if (isRotated2) {
        span.style.transform = `rotate(90deg) scale(${scaleX}, ${scaleY})`;
      }
    } else {
      // For non-rotated text, scale based on the cell size (same as for rotated text)
      scaleX = cellWidth / textWidth; // Scale based on the cell width
      scaleY = cellHeight / textHeight; // Scale based on the cell height

      // Apply scaling for non-rotated text (no aspect ratio maintenance here)
      span.style.transform = `scale(${scaleX}, ${scaleY})`;
    }
  });
}

// Run function on load & resize
window.addEventListener("resize", adjustTextSize);
window.addEventListener("load", adjustTextSize);

// Trigger the text resizing in parallel with the animation at a fixed interval
function startTextSizeAdjustment() {
  // Adjust the text size at intervals while the animation is running
  setInterval(adjustTextSize, 50); // Adjust every 50ms, change if needed for smoother effect
}

startTextSizeAdjustment(); // Start the interval
