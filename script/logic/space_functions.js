/*
 * The edges of the rectangle are assumed to be aligned with the 
 * coordinate system
 */
var createRectangleBoundary = function(v1, v2) {
	return function(bot) {
		var pos = bot.position;
		return inRectangle(pos, v1, v2); //inRectangle defined in script/vector_functions.js
	}
}

var createCircleBoundary = function(center, radius) {
	return function(bot) {
		var pos = bot.position;
		var distance = getVectorDistance(pos, center); //getVectorDistance defined in script/vector_functions.js
		return distance <= radius
	}
}

var createSpace = function(startPosition, contains) {
	return {
		'start_position': startPosition,
		'contains': contains
	}
}

var createCircularSpace = function(xStart, yStart, xCenter, yCenter, radius) {
	var startPosition = createVector(xStart, yStart);
	var circleCenter = createVector(xCenter, yCenter);
	var inBoundary = createCircleBoundary(circleCenter, radius);
	return createSpace(startPosition, inBoundary);
}

var createRectangularSpace = function(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2) {
	var startPosition = createVector(xStart, yStart);
	var corner1 = createVector(xCorner1, yCorner1);
	var corner2 = createVector(xCorner2, yCorner2);
	var inBoundary = createRectangleBoundary(corner1, corner2);
	return createSpace(startPosition, inBoundary);
}

var initiateBotInSpace = function(space) {
	var startPosition = space.start_position;
	var bot = initiateBot(startPosition.x, startPosition.y); //initiateBot defined in script/bot_functions.js
	return bot;
}
