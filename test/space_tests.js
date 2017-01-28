const expect = require('chai').expect;

describe('space functions', () => {
	it('initiateBotInSpace', () => {
		const xStart = 5;
		const yStart = 5;

		const xCorner1 = 0;
		const yCorner1 = 0;

		const xCorner2 = 10;
		const yCorner2 = 10;

		const space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
		const bot = initiateBotInSpace(space);
		const expectedPosition = createVector(xStart, yStart);
		expect(bot.position).to.deep.equal(expectedPosition);
	});

	it('createRectangularSpace', () => {
		/*
		 * expected path:
		 * 	forward, north: 		(5, 5, N) -> (5, 4, N)
		 * 	forward, north (hit wall): 	(5, 4, N) -> (5, 4, N)
		 * 	left:				(5, 4, N) -> (5, 4, W)
		 * 	left:				(5, 4, W) -> (5, 4, S)
		 * 	forward, south:			(5, 4, S) -> (5, 5, S)
		 * 	forward, south: 		(5, 5, S) -> (5, 6, S)
		 */	
		const xCorner1 = 0;
		const yCorner1 = 4;

		const xCorner2 = 10;
		const yCorner2 = 7;

		const xStart = 5;
		const yStart = 5;

		const space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
		const bot = initiateBotInSpace(space);
		const lang = LANGUAGES.EN;

		const commandString = 'ffllff'; //forward, forward, left, left, forward, forward
		const command = compileCommands(commandString, lang, space.contains);
		const movedBot = command(bot);

		const expectedPosition = createVector(5, 6);
		expect(movedBot.position).to.deep.equal(expectedPosition);
	});

	it('createCircularSpace', () => {
		/*
		 * expected path:
		 * 	right: 				(1, 4, N) -> (1, 4, E)
		 * 	right: 				(1, 4, E) -> (1, 4, S)
		 * 	forward, south: 		(1, 4, S) -> (1, 5, S)
		 * 	left:				(1, 5, S) -> (1, 5, E)
		 * 	forward, east: 			(1, 5, E) -> (2, 5, E)
		 * 	forward, east: 			(2, 5, E) -> (3, 5, E)
		 * 	forward, east (hit wall): 	(3, 5, E) -> (3, 5, E)
		 */	
		const xSpaceCenter = 0;
		const ySpaceCenter = 5;
		const radius = 3;

		const xStart = 1;
		const yStart = 4;

		const space = createCircularSpace(xStart, yStart, xSpaceCenter, ySpaceCenter, radius);
		const bot = initiateBotInSpace(space);
		const lang = LANGUAGES.EN;

		const commandString = 'rrflfff'; //right, right, forward, left, forward, forward, forward
		const command = compileCommands(commandString, lang, space.contains);
		const movedBot = command(bot);

		const expectedPosition = createVector(3, 5);
		expect(movedBot.position).to.deep.equal(expectedPosition);
	});
});
