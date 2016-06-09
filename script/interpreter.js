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
	var commandArray = commandString.split('');
	var commands = commandArray.map(letter => getFunction(language, letter));
	return function(x) {
		return new Promise(function(resolve, reject) {
			resolve(x);
		});
	};
}

//converts a command letter to a function, returns id function from util if no match is found
var getFunction = function(language, letter) {
	var lowerCaseLetter = letter.toLowerCase();
	var f = language.functions_map[lowerCaseLetter];
	if(!f) {
		f = id; //id function from script/util.js
	}
	return f;
}

/*
A decorator which executes a command and then checks if InBounds is true. 
If the result is not inBounds then it will return the original function input.
*/
var constrainCommand = function(withinConstraints, command) {
	return function(x) {
		return new Promise(function(resolve, reject){
			command(x)
			.then(function(y){
				if(withinConstraints(y)) {
					resolve(y);
				} else {
					resolve(x);
				}
			});
		})
	}
}
