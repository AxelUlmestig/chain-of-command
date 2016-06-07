directions = {
	'NORTH': {
		'name': 'NORTH',
		'value': createVector(0, 1)
	},
	'EAST': {
		'name': 'EAST',
		'value': createVector(1, 0)
	},
	'SOUTH': {
		'name': 'SOUTH',
		'value': createVector(0, -1)
	},
	'WEST': {
		'name': 'WEST',
		'value': createVector(-1, 0)
	}
}

var initiateBot = function(x, y) {
	return {
		'position': createVector(x, y),
		'direction': directions.NORTH
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
		resolve(bot);
	});
}

var turnBotLeft = function(bot) {
	return new Promise(function(resolve, reject){
		resolve(bot);
	});
}

var getNewDirection = function(bot, turnValue) {
	return bot.direction;
}
