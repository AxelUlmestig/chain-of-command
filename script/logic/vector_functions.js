/*
 * Contains functions related to basic vector algebra.
 */
const createVector = (x, y) => {
	return {
		'x': x, 
		'y': y
	};
};

const addVectors = (v1, v2) => {
	return {
		'x': v1.x + v2.x,
		'y': v1.y + v2.y
	}
}

const getVectorDistance = (v1, v2) => {
	const dx = v1.x - v2.x;
	const dy = v1.y - v2.y;
	const dx2 = Math.pow(dx, 2);
	const dy2 = Math.pow(dy, 2);
	const distance = Math.pow(dx2 + dy2, 0.5);
	return distance;
}

//checks if v1 is in the rectangle created between v2 and v3
const inRectangle = (v1, v2, v3) => {
	const inX = v1.x <= Math.max(v2.x, v3.x) && v1.x >= Math.min(v2.x, v3.x);
	const inY = v1.y <= Math.max(v2.y, v3.y) && v1.y >= Math.min(v2.y, v3.y);
	return inX && inY;
}

const cloneVector = v => ({
	'x': v.x,
	'y': v.y
})
