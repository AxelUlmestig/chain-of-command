/*
 * Contains functions related to creating and manipulating spaces.
 * The sides of the rectangular spaces are aligned with the coordinate
 * axis in order to save me a lot of cumbersome mathematics.
 *
 * Has dependencies to the following files/functions:
 *  
 *  script/logic/vector_functions.js
 *      createVector(x, y)
 *      inRectangle(v1, v2, v3)
 *      getVectorDistance(v1, v2)
 *
 *  script/logic/bot_functions.js
 *      initiateBot(positionVector[, direction])
 *      
 */

const createRectangleBoundary = (v1, v2) => bot =>
    inRectangle(bot.position, v1, v2);

const createCircleBoundary = (center, radius) => bot => {
    const pos = bot.position;
    const distance = getVectorDistance(pos, center);
    return distance <= radius
}

const createSpace = (startPosition, contains) => ({
    'start_position': startPosition,
    'contains': contains
})

const createCircularSpace = (xStart, yStart, xCenter, yCenter, radius) => {
    const startPosition = createVector(xStart, yStart);
    const circleCenter = createVector(xCenter, yCenter);
    const inBoundary = createCircleBoundary(circleCenter, radius);
    return createSpace(startPosition, inBoundary);
}

const createRectangularSpace = (xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2) => {
    const startPosition = createVector(xStart, yStart);
    const corner1 = createVector(xCorner1, yCorner1);
    const corner2 = createVector(xCorner2, yCorner2);
    const inBoundary = createRectangleBoundary(corner1, corner2);
    return createSpace(startPosition, inBoundary);
}

const initiateBotInSpace = (space) => {
    const startPosition = space.start_position;
    const bot = initiateBot(startPosition);
    return bot;
}
