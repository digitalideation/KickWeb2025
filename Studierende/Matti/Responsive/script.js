document.addEventListener("DOMContentLoaded", function () {
    const hoverImage = document.getElementById("hover-image");

    const images = [
        "images/BIG.jpg",
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
            const randomImage = images[Math.floor(Math.random() * images.length)];
            hoverImage.src = randomImage;
            hoverImage.style.display = "block";
        });

        container.addEventListener("mousemove", (e) => {
            const screenWidth = window.innerWidth;
            const offsetX = e.pageX < screenWidth / 2 ? 10 : -250; // Wenn links, Bild rechts; wenn rechts, Bild links
            hoverImage.style.left = `${e.pageX + offsetX}px`;
            hoverImage.style.top = `${e.pageY + 10}px`;
        });

        container.addEventListener("mouseleave", () => {
            hoverImage.style.display = "none";
        });
    });
});

