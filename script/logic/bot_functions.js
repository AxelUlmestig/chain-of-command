/*
 * Contains functions related to creating and initating bots. It also defines
 * the cardinal directions that the bot uses to navigate. 
 *
 * Has dependencies to the following files/functions:
 *
 * 	script/logic/vector_functions.js
 * 		createVector(x, y)
 * 		addVectors(v1, v2)
 * 		cloneVector(v)
 *
 */

const DIRECTIONS = {
	'NORTH': {
		'name': 'NORTH',
		'value': createVector(0, -1)
	},
	'EAST': {
		'name': 'EAST',
		'value': createVector(1, 0)
	},
	'SOUTH': {
		'name': 'SOUTH',
		'value': createVector(0, 1)
	},
	'WEST': {
		'name': 'WEST',
		'value': createVector(-1, 0)
	}
}

var initiateBot = (vector, direction) => {
	return {
		'position': cloneVector(vector),
		'direction': direction || DIRECTIONS.NORTH
	}
}

var moveBot = bot => {
	var dir = bot.direction;
	var pos = addVectors(bot.position, dir.value);
	var newBot = initiateBot(pos, dir);
	return newBot;
}

var turnBotRight = bot => {
	var newDir = getNewDirection(bot, 1);
	var newBot = initiateBot(bot.position, newDir);
	return newBot;
}

var turnBotLeft = bot => {
	var newDir = getNewDirection(bot, -1);
	var newBot = initiateBot(bot.position, newDir);
	return newBot;
}

/*
 * Gets a new direction as a function of the current direction that the bot has and the 'value'
 * of the turn. Positive values means a clockwise turn, and negative values means a counter
 * clockwise turn. Bigger values gives a strong turn.
 *
 * This function is dependent on the order in which the directions are added to the 
 * DIRECTIONS object.
 */
var getNewDirection = (bot, turnValue) => {
	var dirList = Object.keys(DIRECTIONS);
	var dirListLen = dirList.length
	var curDirIndex = dirList.indexOf(bot.direction.name);
	var newDirIndex = (curDirIndex + turnValue + dirListLen) % dirListLen; //adding dirListLen because JS modulus operation can't handle negative values
	var newDirName = dirList[newDirIndex];
	var newDir = DIRECTIONS[newDirName];
	return newDir;
}

var showBot = bot => {
	try {
		var x = bot.position.x;
		var y = bot.position.y;
		var direction = bot.direction.name.substring(0, 1);
		return '(' + x + ', ' + y + ', ' + direction + ')';
	} catch(err) {
		return '()';
	}
}
