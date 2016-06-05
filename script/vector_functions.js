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

//checks if v1 is in the rectangle created between v2 and v3
var inSpace = function(v1, v2, v3) {
	var inX = v1.x <= Math.max(v2.x, v3.x) && v1.x >= Math.min(v2.x, v3.x);
	var inY = v1.y <= Math.max(v2.y, v3.y) && v1.y >= Math.min(v2.y, v3.y);
	return inX && inY;
}
