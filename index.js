const menuBtns = document.querySelectorAll("div.dropdown-content > button");
const landingPage = document.getElementById("landing");
const resumePage = document.getElementById("resume-page");
const qualsPage = document.getElementById("quals-page");
const servicePage = document.getElementById("service-page");
const pages = document.querySelectorAll("div.page");

const btnMap = {
    about: landingPage,
    resume: resumePage,
    quals: qualsPage,
    service: servicePage,
};
let currentPage = landingPage;

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

menuBtns.forEach((button) => {
    button.addEventListener("click", flipToPage);
});
