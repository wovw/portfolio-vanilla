// DOM elements
const menuBtns = document.querySelectorAll("div.dropdown-content > button");
const landingPage = document.getElementById("landing");
const resumePage = document.getElementById("resume-page");
const servicePage = document.getElementById("service-page");
const qualsPage = document.getElementById("quals-page");
const pages = document.querySelectorAll("div.page");
const toggleBtns = document.getElementsByClassName("toggler--slider"); //nodelist
const loaderWrapper = document.querySelector("div.load-wrapper");
const layoutBody = document.getElementById("layer2");
const body = document.body;
const cssStyleLink = document.getElementById("page_style");

// initialize
let toggleBtnsList = Array.prototype.slice.call(toggleBtns); // array, live
const btnMap = {
    about: landingPage,
    resume: resumePage,
    service: servicePage,
    quals: qualsPage,
};
let currentPage = landingPage;
let isLayout1 = true;
let currentRotation = 0;

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

function flipToPage(className) {
    let pageCard = btnMap[className];
    if (currentPage === pageCard) return;

    pages.forEach((page) => {
        page.classList.remove("static");
        page.classList.remove("to-flip");
        page.classList.remove("flipped");
    });
    flipClasses(pageCard);
    currentPage = pageCard;
}

function loadSite() {
    loaderWrapper.style.transition = "all 0.5s";
    loaderWrapper.style.opacity = 0;
    loaderWrapper.style.visibility = "hidden";
    body.classList.remove("preload");
}

function rotateClasses(page) {
    let newRotationString = window.getComputedStyle(page).rotate;
    let newRotation = parseInt(
        newRotationString.substring(2, newRotationString.length - 3)
    );

    layoutBody.style.rotate = `y ${0 - newRotation}deg`;
    currentRotation = newRotation;
}

function rotateToPage(className) {
    let pageCard = btnMap[className];
    if (currentPage === pageCard) return;
    rotateClasses(pageCard);
    currentPage = pageCard;
}

function useFunction(event) {
    isLayout1
        ? flipToPage(event.target.className)
        : rotateToPage(event.target.className);
}

function loadLayout1() {
    isLayout1 = true;
    currentRotation = 0;
    rotateToPage("about");

    body.classList.add("layout-body");
    body.classList.remove("layout2-body");
    layoutBody.classList.remove("layout2");
    layoutBody.classList.add("layout");

    // cssStyleLink.href = "style.css";
}

function loadLayout2() {
    isLayout1 = false;
    currentRotation = 0;
    flipToPage("about");

    body.classList.remove("layout-body");
    body.classList.add("layout2-body");
    layoutBody.classList.remove("layout");
    layoutBody.classList.add("layout2");

    // cssStyleLink.href = "style2.css";
}

// event listeners
menuBtns.forEach((button) => {
    button.addEventListener("click", useFunction);
});

toggleBtnsList.forEach((button) => {
    button.addEventListener("click", () => {
        body.classList.add("preload");
        loaderWrapper.style.visibility = "visible";
        loaderWrapper.style.opacity = 1;
        setTimeout(() => {
            isLayout1 ? loadLayout2() : loadLayout1();
            setTimeout(() => {
                loadSite();
            }, 750);
        }, 500);
    });
});

window.addEventListener("load", loadSite);
