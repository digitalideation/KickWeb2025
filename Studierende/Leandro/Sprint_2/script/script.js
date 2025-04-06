document.addEventListener("DOMContentLoaded", () => {
    let zRotation = -20;
    let yRotation = 30;
    let xRotation = 20;

    const room = document.getElementById("room");
    const scene = document.querySelector(".scene");

    const overlay = document.querySelector(".overlay");
    const topOverSection = document.querySelector(".section.top-over");

    const canvas = document.getElementById("canvas-1");
    const ctx = canvas.getContext("2d");

    let targetXRotation = xRotation;
    let targetYRotation = yRotation;
    let targetZRotation = zRotation;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawTopLine();
    }

    function drawTopLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = canvas.width * 0.002;
        ctx.strokeStyle = "black";
        

        const line1Start = { x: canvas.width * 0.39, y: canvas.height * 0.0036 };
        const line1End = { x: canvas.width * 0.39, y: canvas.height * 0.0363 };

        const line2Start = { x: canvas.width * 0.39, y: canvas.height * 0.067 };
        const line2End = { x: canvas.width * 0.39, y: canvas.height * 0.175 };

        const line1Length = line1End.y - line1Start.y;
        const line2Length = line2End.y - line2Start.y;

        const speed = 0.1;
        const duration1 = line1Length / speed;
        const duration2 = (line2Length / speed) * 0.8;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animateLine(start, end, elapsed, duration, easingFunction) {
            let progress = Math.min(elapsed / duration, 1);
            progress = easingFunction(progress);
            return start + (end - start) * progress;
        }

        let startTime;

        function drawFrame(time) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //static lines
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.735, canvas.height * 0.45);
            ctx.lineTo(canvas.width * 0.735, canvas.height * 0.478);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.735, canvas.height * 0.54);
            ctx.lineTo(canvas.width * 0.735, canvas.height * 0.63);
            ctx.stroke();



            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.39, canvas.height * 0.885);
            ctx.lineTo(canvas.width * 0.39, canvas.height * 1);
            ctx.stroke();

            //animated lines
            let line1CurrentY = animateLine(line1Start.y, line1End.y, elapsed, duration1, easeOutCubic);
            ctx.beginPath();
            ctx.moveTo(line1Start.x, line1Start.y);
            ctx.lineTo(line1Start.x, line1CurrentY);
            ctx.stroke();

            let offset = duration1 * 0.2;
            if (elapsed >= offset) {
                let elapsed2 = elapsed - offset;
                let line2CurrentY = animateLine(line2Start.y, line2End.y, elapsed2, duration2, easeInOutQuad);

                ctx.beginPath();
                ctx.moveTo(line2Start.x, line2Start.y);

                for (let i = 0; i <= 1; i += 0.02) {
                    let yPos = line2Start.y + i * (line2CurrentY - line2Start.y);
                    ctx.lineTo(line2Start.x, yPos);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }

            if (elapsed < duration1 + duration2) {
                requestAnimationFrame(drawFrame);
            }
        }

        requestAnimationFrame(drawFrame);
    }

    overlay.addEventListener("scroll", () => {
        let scrollY = overlay.scrollTop;
        let maxScroll = overlay.scrollHeight - overlay.clientHeight;
        let scrollPercent = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        
        if (scrollPercent <= 0.3) {
            scene.style.opacity = scrollPercent / 0.3;
        } else if (scrollPercent > 0.3 && scrollPercent <= 0.4) {
            scene.style.opacity = 1;
        } else if (scrollPercent > 0.4 && scrollPercent <= 0.5) {
            scene.style.opacity = 1 - (scrollPercent - 0.4) / 0.1;
        } else if (scrollPercent > 0.5 && scrollPercent <= 0.6) {
            scene.style.opacity = 0;
        } else if (scrollPercent > 0.6 && scrollPercent <= 0.65) {
            scene.style.opacity = (scrollPercent - 0.6) / 0.05;
        } else if (scrollPercent > 0.65 && scrollPercent <= 0.85) {
            scene.style.opacity = 1;
        } else if (scrollPercent > 0.85 && scrollPercent <= 0.9) {
            scene.style.opacity = 1 - (scrollPercent - 0.85) / 0.05;
        } else {
            scene.style.opacity = 0;
        }



            console.log(scrollPercent)
        let topOpacity = Math.max(1 - scrollPercent * 100, 0);
        topOverSection.style.background = `rgba(227, 227, 227, ${topOpacity})`;

        targetYRotation = 30 + scrollY * 0.1;
        targetZRotation = -20 + scrollY * 0.05;
        targetXRotation = 20 + scrollY * 0.001;
    });

    const smoothRotate = () => {
        xRotation += (targetXRotation - xRotation) * 0.1;
        yRotation += (targetYRotation - yRotation) * 0.1;
        zRotation += (targetZRotation - zRotation) * 0.1;

        room.style.transform = `rotateX(${xRotation}deg) rotateZ(${zRotation}deg) rotateY(${yRotation}deg)`;

        requestAnimationFrame(smoothRotate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    smoothRotate();
});

