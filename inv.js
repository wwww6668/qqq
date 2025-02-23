document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    gsap.fromTo(
        ".content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5 }
    );

    // Schedule Animation
    gsap.utils.toArray(".event").forEach((event) => {
        const direction = event.dataset.direction === "left" ? -100 : 100;

        gsap.fromTo(
            event,
            { opacity: 0, x: direction },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: event,
                    start: "top 80%",
                },
            }
        );
    });

    // Countdown Timer
    const countdownDate = new Date("2025-04-26T15:00:00").getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            return;
        }

        document.getElementById("days").textContent = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );
        document.getElementById("hours").textContent = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        document.getElementById("minutes").textContent = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        document.getElementById("seconds").textContent = Math.floor(
            (distance % (1000 * 60)) / 1000
        );
    }, 1000);

    // Background Music
    const music = document.getElementById("background-music");
    const musicButton = document.querySelector(".music-button");
    musicButton.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            musicButton.textContent = "🔊";
        } else {
            music.pause();
            musicButton.textContent = "🎵";
        }
    });
});
// Welcome Section Animation
gsap.fromTo(
    ".welcome-content",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".welcome",
            start: "top 80%",
        },
    }
);
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("guest-name").value.trim();
        const guests = document.getElementById("guest-count").value.trim();
        const attending = document.querySelector('input[name="attendance"]:checked')?.value;

        if (name === "" || guests === "" || !attending) {
            alert("Барлық өрістерді толтырыңыз.");
            return;
        }

        // Отправляем данные на сервер
        fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, guests, attending }),
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Қате:", error));
    });
});
document.getElementById("rsvp-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("guest-name").value;
    const guestCount = document.getElementById("guest-count").value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    const response = await fetch("http://localhost:3000/rsvp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, guestCount, attendance })
    });

    const data = await response.json();
    alert(data.message);
});
