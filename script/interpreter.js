const LANGUAGES = {
	'EN': {
		'name': 'EN',
		'functions_map': {
			'f': moveBot,
			'r': turnBotRight,
			'l': turnBotLeft
		}
	},
	'SE': {
		'name': 'SE',
		'functions_map': {
			'g': moveBot,
			'h': turnBotRight,
			'v': turnBotLeft
		}
	}
}

var compileCommands = function(commandString, language, inBounds) {
	return function(x) {
		return new Promise(function(resolve, reject) {
			resolve(x);
		});
	};
}

//converts a command letter to a function, returns id function from util if no match is found
var getFunction = function(language, letter) {
	return id;
}
