const DEBUGGING = true;

// URL parser
function parseURLParams(url) {
	let queryStart = url.indexOf("?") + 1;
	let queryEnd   = url.indexOf("#") + 1 || url.length + 1;
	let query      = url.slice(queryStart, queryEnd - 1);
	let pairs      = query.replace(/\+/g, " ").split("&");
	let parms      = {}, i, n, v, nv;

	if (query === url || query === "") return;

	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=", 2);
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);

		if (!parms.hasOwnProperty(n)) parms[n] = [];
		parms[n].push(nv.length === 2 ? v : null);
	}
	return parms;
}

// Selectors
function $(selector, context) {
	return (context || document).querySelectorAll(selector);
}

function $1(selector, context) {
	return (context || document).querySelector(selector);
}

// Begin processing
document.addEventListener('DOMContentLoaded', exec);

// Honestly for now this is just testing and working, making sure I can do things.
function exec() {
	let urlString = window.location.href;
	let hiddenText = $1('p#dispText.hidden');
	let parameters = parseURLParams(urlString);
	hiddenText.setAttribute('class', '');
	addToCookie(parameters["toDisp"]);
	hiddenText.innerHTML = parseCookie().replace(/</gi, "&#60;").replace(/{cleanyeen}/gi, "<br>");
	let debugButton = $1('button');
	if (DEBUGGING) {
		debugButton.setAttribute('class', '');
	}
}

// Add the cookie to kep a running chat log
// I enjoy my puns, so it is an "additive" :3
function addToCookie(additive) {
	let chatLog = accessCookie("log");
	chatLog = chatLog + "{cleanyeen}" + additive + "{cleanyeen}" + respond(additive);
	createCookie("log", chatLog);
}

/*---Cookie Helpers---*/
// Helper to create a cookie, in case it's needed later.
function createCookie(cookieName, cookieValue) {
	document.cookie = cookieName + "=" + cookieValue + "; path=/";
}

// Helper to retrieve a value for a cookie
function accessCookie(cookieName) {
	let name = cookieName + '=';
	let allCookies = document.cookie.split(';');
	for (let i = 0; i < allCookies.length; i++) {
		let temp = allCookies[i].trim();
		if (temp.indexOf(name) === 0) return temp.substring(name.length);
	}
	return "";
}
/*---End of Helpers---*/

// Parse the cookie and return it
function parseCookie() {
	let cookie = accessCookie("log");
	// Return the log cookie!
	return cookie;
}

// Cookie reset function to clear chat log
function resetCookies() {
	createCookie("log", ""); // I knew this would be helpful again!
	console.log("Cookies reset.");
}

// Respond to a chat message
function respond(msg) {
	// Points to response.js
	return response(msg);
}