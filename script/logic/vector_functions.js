/*
 * Contains functions related to basic vector algebra.
 */
const createVector = (x, y) => ({
    'x': x, 
    'y': y
})

const addVectors = (v1, v2) => ({
    'x': v1.x + v2.x,
    'y': v1.y + v2.y
})

const subtractVectors = (v1, v2) => {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return createVector(dx, dy);
}

const vectorLength = v => {
    const x2 = Math.pow(v.x, 2);
    const y2 = Math.pow(v.y, 2);
    const length = Math.pow(x2 + y2, 0.5);
    return length;
}

const getVectorDistance = (v1, v2) => vectorLength(subtractVectors(v1, v2))

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
