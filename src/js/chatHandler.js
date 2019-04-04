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
	hiddenText.innerHTML = parameters['toDisp'];
}