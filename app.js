(function () {
    "use strict";

    const carousel = document.getElementById("photo-carousel");
    const hint = document.getElementById("carousel-hint");
    const yearEl = document.getElementById("year");

    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    if (carousel) {
        carousel.addEventListener("click", function () {
            const paused = carousel.classList.toggle("paused");
            if (hint) {
                hint.textContent = paused
                    ? "Paused · Click to resume"
                    : "Photos scroll slowly · Click to pause";
            }
        });

        carousel.addEventListener("keydown", function (event) {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                carousel.click();
            }
        });

        carousel.setAttribute("tabindex", "0");
        carousel.setAttribute("role", "button");
    }

    document.querySelectorAll(".icon-img").forEach(function (img) {
        function updateIconState() {
            const slot = img.closest(".icon-slot");
            if (!slot) return;
            if (img.complete && img.naturalWidth > 0) {
                slot.classList.add("icon-loaded");
            } else {
                slot.classList.remove("icon-loaded");
            }
        }

        img.addEventListener("load", updateIconState);
        img.addEventListener("error", function () {
            const slot = img.closest(".icon-slot");
            if (slot) {
                slot.classList.remove("icon-loaded");
                img.style.display = "none";
            }
        });

        updateIconState();
    });
})();
