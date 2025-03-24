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
  const isMobile = window.innerWidth <= 600; // Detect iPhone screen

  cells.forEach((cell) => {
    const span = cell.querySelector("span");
    if (!span) return; // Skip empty cells

    // Reset transformations before measurement
    span.style.transform = "none";
    span.style.fontSize = "100px"; // Base font size
    span.style.whiteSpace = "nowrap"; // Prevent line breaks

    // Get cell & text sizes
    const cellWidth = cell.offsetWidth;
    const cellHeight = cell.offsetHeight;
    const textWidth = span.offsetWidth;
    const textHeight = span.offsetHeight;

    // Check if it's a rotated element
    const isRotated = span.classList.contains("rotated-text");
    const isRotated2 = span.classList.contains("rotated-text2");

    let scaleX = cellWidth / textWidth;
    let scaleY = cellHeight / textHeight;

    if (isMobile) {
      // On iPhone screens:
      if (isRotated || isRotated2) {
        // Previously rotated text should now be upright
        span.style.transform = `scale(${scaleX}, ${scaleY})`;
      } else {
        // Normal text should now be rotated -90 degrees
        span.style.transform = `rotate(-90deg) scale(${
          cellHeight / textWidth
        }, ${cellWidth / textHeight})`;
      }
    } else {
      // On larger screens:
      if (isRotated) {
        span.style.transform = `rotate(-90deg) scale(${
          cellHeight / textWidth
        }, ${cellWidth / textHeight})`;
      } else if (isRotated2) {
        span.style.transform = `rotate(90deg) scale(${
          cellHeight / textWidth
        }, ${cellWidth / textHeight})`;
      } else {
        span.style.transform = `scale(${scaleX}, ${scaleY})`;
      }
    }
  });
}

// Call the function on page load and resize
window.addEventListener("load", adjustTextSize);
window.addEventListener("resize", adjustTextSize);

// Trigger the text resizing in parallel with the animation at a fixed interval
function startTextSizeAdjustment() {
  // Adjust the text size at intervals while the animation is running
  setInterval(adjustTextSize, 50); // Adjust every 50ms, change if needed for smoother effect
}

startTextSizeAdjustment(); // Start the interval

document.querySelectorAll(".grid > .cell").forEach((cell) => {
  const originalText = cell.innerHTML.trim(); // Store original content
  const hasText = originalText !== ""; // Check if the cell originally had text
  const textSpan = cell.querySelector("span"); // Select the span inside the cell

  // Function to force reflow and trigger animation
  function forceReflowAndFlip() {
    void cell.offsetWidth; // Force reflow
    cell.style.transition = "transform 0.6s, background-color 0.6s";
  }

  // Detect if the device is an iPhone-sized screen
  function isIphoneScreen() {
    return window.innerWidth <= 600; // Adjust based on actual iPhone breakpoints
  }

  cell.addEventListener("click", () => {
    const colors = ["red", "black", "yellow", "blue", "white"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (hasText) {
      if (cell.classList.contains("flipped")) {
        // Reset flip state
        cell.style.backgroundColor = "white";
        cell.style.color = "black";
        cell.innerHTML = originalText;
        cell.classList.remove("flipped");
        cell.classList.remove("flipped-x");
        cell.style.transform = "rotateY(0deg) rotateX(0deg)";

        forceReflowAndFlip();
      } else {
        // Flip logic for text cells
        cell.style.backgroundColor = randomColor;
        cell.style.color = "transparent";
        cell.innerHTML = "";

        if (isIphoneScreen()) {
          // **iPhone Logic**: Invert the flipping behavior
          if (
            textSpan.classList.contains("rotated-text") ||
            textSpan.classList.contains("rotated-text2")
          ) {
            cell.style.transform = "rotateX(180deg)"; // Apply X-axis flip
          } else {
            cell.style.transform = "rotateY(180deg)"; // Apply Y-axis flip
          }
        } else {
          // **Desktop Logic**: Keep normal behavior
          if (
            !textSpan.classList.contains("rotated-text") &&
            !textSpan.classList.contains("rotated-text2")
          ) {
            cell.style.transform = "rotateX(180deg)"; // Apply X-axis flip
          } else {
            cell.style.transform = "rotateY(180deg)"; // Apply Y-axis flip
          }
        }

        cell.classList.add("flipped");
        forceReflowAndFlip();
      }
    } else {
      // Flip behavior for empty cells (same for all screen sizes)
      if (cell.classList.contains("flipped")) {
        cell.style.backgroundColor = randomColor;
        cell.style.transform = "rotateY(0deg)";
        cell.classList.remove("flipped");
        cell.classList.remove("flipped-x");

        forceReflowAndFlip();
      } else {
        cell.style.backgroundColor = randomColor;
        cell.style.transform = "rotateY(180deg)";
        cell.classList.add("flipped");

        forceReflowAndFlip();
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("intro-screen").style.display = "none";
  }, 3000); // 3s timeout before hiding intro screen
});
