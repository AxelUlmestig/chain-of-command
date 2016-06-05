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
	return false;
}
