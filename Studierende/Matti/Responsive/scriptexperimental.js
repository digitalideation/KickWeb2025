document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "images/ChaseStatus.jpg",
        "images/Crush.jpg",
        "images/daft punk.jpg",
        "images/Gesagt Getan.jpg",
        "images/Gorillaz.jpg",
        "images/KIOX.jpg",
        "images/Kitschkrieg.jpg",
        "images/kiz.jpg",
        "images/kleine Feuer.jpg",
        "images/Kraftklub.jpg",
        "images/nand.jpg",
        "images/Nothing Great About Britain.jpg",
        "images/OFF SEASON.jpg",
        "images/pasha.jpg",
        "images/Platinum.jpg",
        "images/send them to coventry.jpg",
        "images/Trettmann.jpg"
    ];

    document.querySelectorAll(".box").forEach(container => {
        container.addEventListener("mouseenter", () => {
            createTrailImage(container);
        });

        container.addEventListener("mousemove", (e) => {
            createTrailImage(e);
        });

        container.addEventListener("mouseleave", () => {
            clearTrail();
        });
    });

    function createTrailImage(event) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const img = document.createElement("img");
        img.src = randomImage;
        img.classList.add("trail-image");

        document.body.appendChild(img);

        const screenWidth = window.innerWidth;
        const offsetX = event.pageX < screenWidth / 2 ? 10 : -160;

        img.style.left = `${event.pageX + offsetX}px`;
        img.style.top = `${event.pageY + 10}px`;

        setTimeout(() => {
            img.style.opacity = "0"; // Langsam ausblenden
            setTimeout(() => img.remove(), 1000); // Nach 500ms entfernen
        }, 100);
    }

    function clearTrail() {
        document.querySelectorAll(".trail-image").forEach(img => img.remove());
    }
});
