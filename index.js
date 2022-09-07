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
const layoutBodyElms = layoutBody.getElementsByTagName("*"); // nodelist

// initialize
let layoutBodyElmsList = Array.prototype.slice.call(layoutBodyElms); // array, live
let toggleBtnsList = Array.prototype.slice.call(toggleBtns); // array, live
const btnMap = {
    about: landingPage,
    resume: resumePage,
    service: servicePage,
    quals: qualsPage,
};
let currentPage = landingPage;
let isLayout1 = true;

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

function loadSite() {
    loaderWrapper.style.transition = "all 0.5s";
    loaderWrapper.style.opacity = 0;
    loaderWrapper.style.visibility = "hidden";
    body.classList.remove("preload");
}

function loadLayout1() {
    isLayout1 = true;

    // remove layout2 styling
    body.classList.remove("layout2");
    layoutBody.classList.remove("layout2-wrapper");

    // add layout1 styling
    body.classList.add("layout1");
    layoutBody.classList.add("layout1-wrapper");
    layoutBodyElmsList.map((element) => {
        element.classList.remove("layout2");
        return element;
    });
}

function loadLayout2() {
    isLayout1 = false;

    // remove layout1 styling
    body.classList.remove("layout1");
    layoutBody.classList.remove("layout1-wrapper");

    // add layout2 styling
    body.classList.add("layout2-body");
    layoutBody.classList.add("layout2-wrapper");
    layoutBodyElmsList.map((element) => {
        element.classList.add("layout2");
        return element;
    });
}

// event listeners
menuBtns.forEach((button) => {
    button.addEventListener("click", flipToPage);
});

toggleBtnsList.forEach((button) => {
    button.addEventListener("click", () => {
        body.classList.add("preload");
        loaderWrapper.style.visibility = "visible";
        loaderWrapper.style.opacity = 1;
        setTimeout(() => {
            if (isLayout1) loadLayout2();
            else loadLayout1();
            loadSite();
        }, 1000);
    });
});

window.addEventListener("load", loadSite);
