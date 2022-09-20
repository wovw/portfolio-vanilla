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
	observer.disconnect();

	body.classList.remove("layout2-body");
	body.classList.add("layout-body");
	layoutBody.classList.remove("layout2");
	layoutBody.classList.add("layout");
	localStorage.setItem("layout", "1");

	slideTitlesForOne();
	removeInputBarText();
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
	addInputBarText();
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
			isLayout1
				? flipToPage(pageToBtnMap[oldPage.id])
				: rotateToPage(pageToBtnMap[oldPage.id]);
		}, 1050);
		setTimeout(() => {
			loadSite();
		}, 1500);
	});
});

// read from localStorage
window.addEventListener("load", () => {
	let layoutStyle = localStorage.getItem("layout");

	if (layoutStyle && layoutStyle === "2") {
		loadLayout2();
	}

	setTimeout(() => {
		loadSite();
	}, 500);
});

// intersection observer for scroll animation
let translate = 0;
let titles = [];
let options = {
	root: landingPage.querySelectorAll(".layout2 .content"),
	rootMargin: "-35px 0px 0px 0px",
	threshold: 1,
};
let observer = new IntersectionObserver(() => {}, {});

function scrollSelector() {
	let rootMarginY = 0;
	let scrollParagraph = currentPage.querySelector(".layout2 .text");
	titles = currentPage.querySelectorAll(".layout2 .title");

	switch (currentPage) {
		case landingPage:
			rootMarginY = -200;
			scrollParagraph = currentPage.querySelector(".layout2 .text");
			translate = -80;
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
			rootMarginY = -240;
			scrollParagraph = currentPage.querySelector(".layout2 .text > p");
			translate = -130;
			break;
	}

	return { rootMarginY, scrollParagraph };
}

function slideTitles(entries) {
	entries.forEach((entry) => {
		titles.forEach((title) => {
			if (!entry.isIntersecting) {
				title.style.setProperty("translate", `${translate}px 0 0`);
				if (titles.length > 1)
					titles[1].style.setProperty("top", "25px");
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

/**
 * Slide back titles for first layout page
 */
function slideTitlesForOne() {
	titles = document.querySelectorAll(".layout .title");
	titles.forEach((title) => {
		title.style.setProperty("translate", `0 0 0`);
		if (titles.length > 1) titles[1].style.setProperty("top", "0");
	});
}

// contact form
removeInputBarText();
function removeInputBarText() {
	let inputBars = document.querySelectorAll(".input-bar");
	inputBars.forEach((inputBar) => {
		inputBar.textContent = "";
	});
}

function addInputBarText() {
	let inputBars = document.querySelectorAll(".input-bar");
	inputBars[0].textContent = "Name";
	inputBars[1].textContent = "Email";
	inputBars[2].textContent = "Subject";
	inputBars[3].textContent = "Message";
}

const form = document.getElementById("contact");
const name = document.getElementsByName("name")[0];
const email = document.getElementsByName("email")[0];
const subject = document.getElementsByName("_subject")[0];
const message = document.getElementsByName("message")[0];

form.addEventListener("submit", (e) => {
	if (!checkInputs()) e.preventDefault();
});

const emailExp = /^.{1,}@.{1,}\..{1,}$/;
const isEmail = (email) => emailExp.test(email);

function checkInputs() {
	const emailVal = email.value.trim();
	const messageVal = message.value.trim();
	let isAccepted = true;

	document.documentElement.style.setProperty("--border-bottom-color", "red");
	if (emailVal === "") {
		email.classList.add("required");
		isAccepted = false;
	} else if (!isEmail(emailVal)) {
		email.classList.add("required");
		isAccepted = false;
	}

	if (messageVal === "") {
		message.classList.add("required");
		isAccepted = false;
	}

	setTimeout(() => {
		email.classList.remove("required");
		message.classList.remove("required");
		setTimeout(() => {
			document.documentElement.style.setProperty(
				"--border-bottom-color",
				"#4adf86"
			);
		}, 301);
	}, 1100);

	return isAccepted;
}
