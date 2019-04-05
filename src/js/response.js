// JS
// 05/04/2019
// Response generator
// We will implement machine learning much, much later.
// For now, we're making a simple chat bot send/recieve.

const rResp = ["Oh?",
			   "That sounds odd.",
			   "Subscribe to PewDiePie! I'm doing my part!",
			   "Hahaha!",
			   "OwO"];

function response(uInput) {
	// Trim the response before processing
	uInput = uInput.trim();

	// Clean up the response of HTML, so we don't accidentally allow injection.
	uInput = uInput.replace(/</gi, "\<");

	// Process the user input now.
	// Give a cheeky response for HTML embedders >:C
	if (uInput.indexOf('<') >= 0 && uInput.indexOf('>') >= 0) {
		return "Please don't attempt to embed HTML in any way, shape, or form. You might break the simulation!";
	}
	// Here's where ML is activated. Code afterwards will be commented when ML is on. For now, this code remains unwritten.
	// ML not active, if this point is reached!
	if (checkStr(uInput, "no")) {
		return "Why not?";
	}
	else if (checkStr(uInput, "pet") || checkStr(uInput, "pets")) {
		return "I'd like to hear more about your pets, please.";
	}
	else {
		return respondRandom();
	}
}

// String checker
function checkStr(uInput, validator) {
	// Set up RegEx
	validator = " " + validator + " ";
	let rx = new RegExp(validator, "g");

	// Use RegEx to search the uInput
	return (uInput.search(rx) > 0);
}

// Random responses, here we come!
function respondRandom() {
	// Chooses random response from the rResp array
	return rRand[Math.floor(Math.random() * rRand.length)];
}