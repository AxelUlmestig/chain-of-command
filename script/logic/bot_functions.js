/*
 * Contains functions related to creating and initating bots. It also defines
 * the cardinal directions that the bot uses to navigate. 
 *
 * Has dependencies to the following files/functions:
 *
 *  script/logic/vector_functions.js
 *      createVector(x, y)
 *      addVectors(v1, v2)
 *      cloneVector(v)
 *
 */

const DIRECTIONS = {
    'NORTH': {
        'name': 'NORTH',
        'value': createVector(0, -1)
    },
    'EAST': {
        'name': 'EAST',
        'value': createVector(1, 0)
    },
    'SOUTH': {
        'name': 'SOUTH',
        'value': createVector(0, 1)
    },
    'WEST': {
        'name': 'WEST',
        'value': createVector(-1, 0)
    }
}

const initiateBot = (vector, direction) => ({
    'position': cloneVector(vector),
    'direction': direction || DIRECTIONS.NORTH
})

const moveBot = bot => {
    const dir = bot.direction;
    const pos = addVectors(bot.position, dir.value);
    const newBot = initiateBot(pos, dir);
    return newBot;
}

const turnBotRight = bot => {
    const newDir = getNewDirection(bot, 1);
    const newBot = initiateBot(bot.position, newDir);
    return newBot;
}

const turnBotLeft = bot => {
    const newDir = getNewDirection(bot, -1);
    const newBot = initiateBot(bot.position, newDir);
    return newBot;
}

/*
 * Gets a new direction as a function of the current direction that the bot has and the 'value'
 * of the turn. Positive values means a clockwise turn, and negative values means a counter
 * clockwise turn. Bigger values gives a strong turn.
 *
 * This function is dependent on the order in which the directions are added to the 
 * DIRECTIONS object.
 */
const getNewDirection = (bot, turnValue) => {
    const dirList = Object.keys(DIRECTIONS);
    const dirListLen = dirList.length
    const curDirIndex = dirList.indexOf(bot.direction.name);
    const newDirIndex = (curDirIndex + turnValue + dirListLen) % dirListLen; //adding dirListLen because JS modulus operation can't handle negative values
    const newDirName = dirList[newDirIndex];
    const newDir = DIRECTIONS[newDirName];
    return newDir;
}

const showBot = bot => {
    try {
        const x = bot.position.x;
        const y = bot.position.y;
        const direction = bot.direction.name.substring(0, 1);
        return '(' + x + ', ' + y + ', ' + direction + ')';
    } catch(err) {
        return '()';
    }
}
