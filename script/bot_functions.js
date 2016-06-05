directions = {
	'NORTH': {
		'name': 'N',
		'value': createVector(0, 1),
		'turn_right': 'EAST',
		'turn_left': 'WEST'
	},
	'EAST': {
		'name': 'E',
		'value': createVector(1, 0),
		'turn_right': 'SOUTH',
		'turn_left': 'NORTH'
	},
	'SOUTH': {
		'name': 'S',
		'value': createVector(0, -1),
		'turn_right': 'WEST',
		'turn_left': 'EAST'
	},
	'WEST': {
		'name': 'W',
		'value': createVector(-1, 0),
		'turn_right': 'NORTH',
		'turn_left': 'SOUTH'
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
		resolve(bot);
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
