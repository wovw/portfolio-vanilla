// DOM elements
const menuBtns = document.querySelectorAll("div.dropdown-content > button");
const landingPage = document.getElementById("landing");
const resumePage = document.getElementById("resume-page");
const servicePage = document.getElementById("service-page");
const pages = document.querySelectorAll("div.page");
const toggleBtn = document.getElementById("toggler--slider");
const loaderWrapper = document.getElementsByClassName("load-wrapper");

// initialize
const btnMap = {
    about: landingPage,
    resume: resumePage,
    service: servicePage,
};
let currentPage = landingPage;

// functions
function flipClasses(element) {
    element.classList.add("static");

    let prevSiblings = [];
    let prevSibling = element.previousElementSibling;
    while (prevSibling) {
        prevSiblings.push(prevSibling);
        prevSibling = prevSibling.previousElementSibling;
    }
    prevSiblings.forEach((element) => element.classList.add("flipped"));

    let nextSiblings = [];
    let nextSibling = element.nextElementSibling;
    while (nextSibling) {
        nextSiblings.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }
    nextSiblings.forEach((element) => element.classList.add("to-flip"));
}

function flipToPage(event) {
    let pageCard = btnMap[event.target.className];
    if (currentPage === pageCard) return;

    pages.forEach((page) => {
        page.classList.remove("static");
        page.classList.remove("to-flip");
        page.classList.remove("flipped");
    });
    flipClasses(pageCard);
    currentPage = pageCard;
}

function loadPage() {
    loaderWrapper[0].style.transition = "all 0.5s";
    loaderWrapper[0].style.opacity = 0;
    loaderWrapper[0].style.visibility = "hidden";
    document.body.classList.remove("preload");
}

// event listeners
menuBtns.forEach((button) => {
    button.addEventListener("click", flipToPage);
});

toggleBtn.addEventListener("click", () => {
    console.log("clicked");
});

window.addEventListener("load", loadPage);
