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
let menuBtnsList = Array.prototype.slice.call(menuBtns); // live
const btnToPageMap = {
    about: landingPage,
    resume: resumePage,
    quals: qualsPage,
    service: servicePage,
};
const pageToBtnMap = {
    landing: "about",
    "resume-page": "resume",
    "quals-page": "quals",
    "service-page": "service",
};
let currentPage = landingPage;
let isLayout1 = true;

// functions
function flipClasses(element) {
    element.classList.add("static");
    element.style.setProperty("z-index", "1");

    let prevSiblings = [];
    let prevSibling = element.previousElementSibling;
    while (prevSibling) {
        prevSiblings.push(prevSibling);
        prevSibling = prevSibling.previousElementSibling;
    }
    prevSiblings.forEach((element) => {
        element.classList.add("flipped");
        element.style.setProperty("z-index", "0");
    });

    let nextSiblings = [];
    let nextSibling = element.nextElementSibling;
    while (nextSibling) {
        nextSiblings.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }
    nextSiblings.forEach((element) => {
        element.classList.add("to-flip");
        element.style.setProperty("z-index", "0");
    });
}

function flipToPage(className) {
    let pageCard = btnToPageMap[className];

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
    let newRotationString = window
        .getComputedStyle(page)
        .getPropertyValue("rotate");
    let newRotation = parseInt(
        newRotationString.substring(2, newRotationString.length - 3)
    );

    page.style.setProperty("z-index", "1");
    layoutBody.style.setProperty("rotate", `y ${0 - newRotation}deg`);
}

function rotateToPage(className) {
    let pageCard = btnToPageMap[className];

    pages.forEach((page) => {
        page.style.setProperty("z-index", "0");
        page.style.setProperty("z-index", "0");
        page.style.setProperty("z-index", "0");
    });
    rotateClasses(pageCard);
    currentPage = pageCard;

    scrollObserver();
}

function useFunction(event) {
    isLayout1
        ? flipToPage(event.target.className)
        : rotateToPage(event.target.className);
}

function loadLayout1() {
    isLayout1 = true;
    rotateToPage("about");
    titles = [];
    observer.disconnect();

    body.classList.remove("layout2-body");
    body.classList.add("layout-body");
    layoutBody.classList.remove("layout2");
    layoutBody.classList.add("layout");
    localStorage.setItem("layout", "1");
}

function loadLayout2() {
    isLayout1 = false;
    flipToPage("about");

    body.classList.remove("layout-body");
    body.classList.add("layout2-body");
    layoutBody.classList.remove("layout");
    layoutBody.classList.add("layout2");
    localStorage.setItem("layout", "2");

    scrollObserver();
}

// event listeners
menuBtns.forEach((button) => {
    button.addEventListener("click", useFunction);
});

toggleBtnsList.forEach((button) => {
    button.addEventListener("click", () => {
        let oldPage = currentPage;

        body.classList.add("preload");
        loaderWrapper.style.visibility = "visible";
        loaderWrapper.style.opacity = 1;

        setTimeout(() => {
            if (isLayout1) {
                loadLayout2();
            } else loadLayout1();
        }, 500);
        setTimeout(() => {
            rotateToPage(pageToBtnMap[oldPage.id]);
            flipToPage(pageToBtnMap[oldPage.id]);
        }, 1050);
        setTimeout(() => {
            loadSite();
        }, 1500);
    });
});

window.addEventListener("load", () => {
    let layoutStyle = localStorage.getItem("layout");

    if (layoutStyle && layoutStyle === "2") {
        loadLayout2();
    }

    setTimeout(() => {
        loadSite();
    }, 500);
});

// intersection observer
let translate = 0;
let titles = [];
let options = {
    root: landingPage.querySelectorAll(".layout2 .content"),
    rootMargin: "-35px 0px 0px 0px",
    threshold: 1,
};
let observer = new IntersectionObserver(() => {}, {});

function scrollSelector() {
    let rootMarginY = -35;
    let scrollParagraph = currentPage.querySelector(".layout2 .text");
    titles = currentPage.querySelectorAll(".layout2 .title");

    switch (currentPage) {
        case landingPage:
            rootMarginY = -200;
            scrollParagraph = currentPage.querySelector(".layout2 .text");
            translate = -65;
            break;
        case resumePage:
            rootMarginY = -110;
            scrollParagraph = currentPage.querySelector(".layout2 .text > p");
            translate = -90;
            break;
        case qualsPage:
            rootMarginY = -240;
            scrollParagraph = currentPage.querySelector(".layout2 .text");
            translate = -90;
            break;
        case servicePage:
            rootMarginY = -155;
            scrollParagraph = currentPage.querySelector(".layout2 .text > p");
            translate = -130;
            break;
    }

    return { rootMarginY, scrollParagraph };
}

function slideTitles(entries, observer) {
    entries.forEach((entry) => {
        console.log(entry);
        titles.forEach((title) => {
            if (!entry.isIntersecting) {
                title.style.setProperty("translate", `${translate}px 0 0`);
                if (titles.length > 1)
                    titles[1].style.setProperty("top", "20px");
            } else {
                title.style.setProperty("translate", "0 0 0");
                if (titles.length > 1)
                    titles[1].style.setProperty("top", "0px");
            }
        });
    });
}

function scrollObserver() {
    observer.disconnect();
    let { rootMarginY, scrollParagraph } = scrollSelector();
    observer = new IntersectionObserver(slideTitles, {
        root: currentPage.querySelector(".layout2 .content"),
        rootMargin: `${rootMarginY}px 0px 0px 0px`,
        threshhold: 1,
    });

    observer.observe(scrollParagraph);
}
