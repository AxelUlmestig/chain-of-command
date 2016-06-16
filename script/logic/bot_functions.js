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

var initiateBot = function(x, y) {
	return {
		'position': createVector(x, y),
		'direction': DIRECTIONS.NORTH
	}
}

var moveBot = function(bot) {
	return new Promise(function(resolve, reject){
		var dir = bot.direction;
		var pos = addVectors(bot.position, dir.value);
		resolve({
			'position': pos,
			'direction': dir
		});
	});
}

var turnBotRight = function(bot) {
	return new Promise(function(resolve, reject){
		var newDir = getNewDirection(bot, 1);
		resolve({
			'position': bot.position,
			'direction': newDir
		});
	});
}

var turnBotLeft = function(bot) {
	return new Promise(function(resolve, reject){
		var newDir = getNewDirection(bot, -1);
		resolve({
			'position': bot.position,
			'direction': newDir
		});
	});
}

var getNewDirection = function(bot, turnValue) {
	var dirList = Object.keys(DIRECTIONS);
	var dirListLen = dirList.length
	var curDirIndex = dirList.indexOf(bot.direction.name);
	var newDirIndex = (curDirIndex + turnValue + dirListLen) % dirListLen; //adding dirListLen because JS modulus operation can't handle negative values
	var newDirName = dirList[newDirIndex];
	var newDir = DIRECTIONS[newDirName];
	return newDir;
}

var showBot = function(bot) {
	try {
		var x = bot.position.x;
		var y = bot.position.y;
		var direction = bot.direction.name.substring(0, 1);
		return '(' + x + ', ' + y + ', ' + direction + ')';
	} catch(err) {
		return '()';
	}
}
