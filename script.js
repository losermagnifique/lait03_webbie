//portfolio_script

// Tabs Navigation
async function loadPage(page) {

    const content = document.getElementById("content");

    // Fade out
    content.classList.add("fade-out");

    // Wait for fade-out animation
    setTimeout(async () => {

        const response = await fetch(`${page}.html`);
        const html = await response.text();

        content.innerHTML = html;

        // Fade back in
        content.classList.remove("fade-out");

    }, 300);
}

function navigate(event, page) {
    event.preventDefault();

    loadPage(page);

    history.pushState({}, "", `?page=${page}`);

    const menu = document.querySelector(".menu");
    const button = document.querySelector(".collapse");

    if (menu) menu.classList.remove("open");
    if (button) button.classList.remove("active");
}


window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const page = params.get("page") || "home";

    loadPage(page);
});
            

//Collapsible Menu

var coll = document.getElementsByClassName("collapse");
var i;

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var content = document.querySelector(".menu");
    content.classList.toggle("open");
  });
}

// Slideshows

// Opening Modal
function openModal(id, group, startIndex) {
    const modal = document.getElementById(id);

    activeModal = modal;
    activeGroup = group;

    slideIndexes[group] = startIndex;

    modal.style.display = "flex";

    requestAnimationFrame(() => {
        modal.classList.add("show");
    });

    renderSlides(group);
}

// Closing Modal
function closeModal(modal) {
    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

const slideIndexes = {};

// Slides
function renderSlides(group) {
    const slides = document.getElementsByClassName(group);

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[slideIndexes[group] - 1].classList.add("active");
}

// Navigation
function plusSlides(group, n) {
    const slides = document.getElementsByClassName(group);

    slideIndexes[group] += n;

    if (slideIndexes[group] > slides.length) slideIndexes[group] = 1;
    if (slideIndexes[group] < 1) slideIndexes[group] = slides.length;

    renderSlides(group);
}

// Keyboard navigation
let activeModal = null;
let activeGroup = null;

window.addEventListener("keydown", function (e) {
    if (!activeModal) return;

    if (e.key === "ArrowRight") {
        plusSlides(activeGroup, 1);
    }

    if (e.key === "ArrowLeft") {
        plusSlides(activeGroup, -1);
    }

    if (e.key === "Escape") {
        closeModal(activeModal);
        activeModal = null;
        activeGroup = null;
    }
});

//Swipe navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {

    if (!e.target.closest(".modal-content")) return;

    touchStartX = e.touches[0].clientX;

});

document.addEventListener("touchend", (e) => {

    if (!e.target.closest(".modal-content")) return;

    touchEndX = e.changedTouches[0].clientX;

    handleSwipe();

});

function handleSwipe() {
    const threshold = 50;

    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) < threshold) return;

    if (diff < 0) {
        // Swipe left → next
        plusSlides(activeGroup, 1);
    } else {
        // Swipe right → previous
        plusSlides(activeGroup, -1);
    }
}

//Media Access Restriction
document.addEventListener("contextmenu", function (event) {
  if (event.target.closest("img, video")) {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", function (event) {
  if (event.target.closest("img, video")) {
    event.preventDefault();
  }
});