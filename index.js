const menuBtns = document.querySelectorAll("div.dropdown-content > button");
const landingPage = document.getElementById("landing");
const resumePage = document.getElementById("resume-page");
const qualsPage = document.getElementById("quals-page");
const servicePage = document.getElementById("service-page");
const pages = document.querySelectorAll("div.page");

const btnMap = {
    about: "landing",
    resume: "resume-page",
    quals: "quals-page",
    service: "service-page",
};
let currentPage = "landing";

function flipClasses(element) {
    element.classList.add("static");

    let prevSiblings = [];
    let prevSibling = element.previousElementSibling;
    while (prevSibling) {
        prevSiblings.push(prevSibling);
        prevSibling = prevSibling.previousElementSibling;
    }
    prevSiblings.forEach(element => element.classList.add("flipped"));

    let nextSiblings = [];
    let nextSibling = element.nextElementSibling;
    while (nextSibling) {
        nextSiblings.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }
    nextSiblings.forEach(element => element.classList.add("to-flip"));
}

function flipToPage(event) {
    let pageName = btnMap[event.target.className];
    if (currentPage === pageName) return;

    pages.forEach((page) => {
        page.classList.remove("static");
        page.classList.remove("to-flip");
        page.classList.remove("flipped");
    });

    switch (pageName) {
        case "landing":
            flipClasses(landingPage);
            console.log(pageName);
            break;
        case "resume-page":
            flipClasses(resumePage);
            console.log(pageName);
            break;
        case "quals-page":
            flipClasses(qualsPage);
            console.log(pageName);
            break;
        case "service-page":
            flipClasses(servicePage);
            console.log(pageName);
            break;
    }

    currentPage = pageName;
}

menuBtns.forEach((button) => {
    button.addEventListener("click", flipToPage);
});
