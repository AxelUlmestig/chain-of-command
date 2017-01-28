/*
 * Contains functions related to compiling a command string to a function which 
 * can manipulate a bot. It also defines the languages that are available.
 *
 * Has dependencies to the following files/functions:
 *
 * 	script/logic/bot_functions.js
 * 		moveBot(bot)
 * 		turnBotRight(bot)
 * 		turnBotLeft(bot)
 *
 * 	script/logic/util.js
 * 		chainFunctions(functions)
 * 		id(x)
 *
 */

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

var compileCommands = (commandString, language, inBounds) => {
	var commandArray = commandString.split('');
	var commands = commandArray.map(character => getFunction(language, character));
	var constrainedCommands = commands.map(command => constrainCommand(inBounds, command));
	var commandChain = chainFunctions(constrainedCommands);
	return commandChain
}

//converts a command character to a function, returns id function from util if no match is found
var getFunction = (language, character) => {
	var lowerCaseLetter = character.toLowerCase();
	var f = language.functions_map[lowerCaseLetter];
	return f || id;
}

/*
 * A decorator that executes a command and then checks if withinConstraints is true. 
 * If the result is not within the constraints then it will return the original function input.
 */
var constrainCommand = (withinConstraints, command) => x => {
	var y = command(x);
	if(withinConstraints(y)) return y;
	return x;
}
