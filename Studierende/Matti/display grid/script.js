const boxes = document.querySelectorAll(".box");
const container = document.querySelector(".container");

boxes.forEach(box => {
    box.addEventListener("mouseenter", () => {
        let totalSize = 0;
        
        // Berechne die Gesamtgröße aller Boxen ohne die Gehoverte
        boxes.forEach(b => {
            if (b !== box) totalSize += parseFloat(b.dataset.size);
        });

        // Setze die neue Größe der Boxen
        boxes.forEach(b => {
            if (b === box) {
                b.style.flexGrow = "4"; // Vergrößern
            } else {
                let shrinkFactor = parseFloat(b.dataset.size) / totalSize;
                b.style.flexGrow = (1.5 * shrinkFactor).toFixed(2); // Dynamisch verkleinern
            }
        });
    });

    box.addEventListener("mouseleave", () => {
        // Setze alle Boxen auf ihre ursprüngliche Größe zurück
        boxes.forEach(b => {
            b.style.flexGrow = b.dataset.size;
        });
    });
});