const slides = document.querySelectorAll(".slider img");
let slideIndex = 0;
let intervalId: number | null = null;

// initialize Slider();
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(): void {
    if (slides.length > 0) {
        slides[slideIndex]!.classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 8000);
    }
}

function showSlide(index: number): void {

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex]!.classList.add("displaySlide");
}

function prevSlide(): void {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(): void {
    slideIndex++;
    showSlide(slideIndex);
}