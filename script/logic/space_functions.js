/*
 * Contains functions related to creating and manipulating spaces.
 * The sides of the rectangular spaces are aligned with the coordinate
 * axis in order to save me a lot of cumbersome mathematics.
 *
 * Has dependencies to the following files/functions:
 * 	
 * 	script/logic/vector_functions.js
 * 		createVector(x, y)
 * 		inRectangle(v1, v2, v3)
 * 		getVectorDistance(v1, v2)
 *
 * 	script/logic/bot_functions.js
 *		initiateBot(positionVector[, direction])
 * 		
 */

var createRectangleBoundary = (v1, v2) => bot =>
    inRectangle(bot.position, v1, v2);

var createCircleBoundary = (center, radius) => bot => {
	var pos = bot.position;
	var distance = getVectorDistance(pos, center);
	return distance <= radius
}

var createSpace = (startPosition, contains) => ({
	'start_position': startPosition,
	'contains': contains
})

var createCircularSpace = (xStart, yStart, xCenter, yCenter, radius) => {
	var startPosition = createVector(xStart, yStart);
	var circleCenter = createVector(xCenter, yCenter);
	var inBoundary = createCircleBoundary(circleCenter, radius);
	return createSpace(startPosition, inBoundary);
}

var createRectangularSpace = (xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2) => {
	var startPosition = createVector(xStart, yStart);
	var corner1 = createVector(xCorner1, yCorner1);
	var corner2 = createVector(xCorner2, yCorner2);
	var inBoundary = createRectangleBoundary(corner1, corner2);
	return createSpace(startPosition, inBoundary);
}

var initiateBotInSpace = (space) => {
	var startPosition = space.start_position;
	var bot = initiateBot(startPosition);
	return bot;
}
