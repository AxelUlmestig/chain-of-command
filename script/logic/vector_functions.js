/*
 * Contains functions related to basic vector algebra.
 */
var createVector = function(x, y) {
	return {
		'x': x, 
		'y': y
	};
};

var addVectors = function(v1, v2) {
	return {
		'x': v1.x + v2.x,
		'y': v1.y + v2.y
	}
}

var getVectorDistance = function(v1, v2) {
	var dx = v1.x - v2.x;
	var dy = v1.y - v2.y;
	var dx2 = Math.pow(dx, 2);
	var dy2 = Math.pow(dy, 2);
	var distance = Math.pow(dx2 + dy2, 0.5);
	return distance;
}

//checks if v1 is in the rectangle created between v2 and v3
var inRectangle = function(v1, v2, v3) {
	var inX = v1.x <= Math.max(v2.x, v3.x) && v1.x >= Math.min(v2.x, v3.x);
	var inY = v1.y <= Math.max(v2.y, v3.y) && v1.y >= Math.min(v2.y, v3.y);
	return inX && inY;
}
