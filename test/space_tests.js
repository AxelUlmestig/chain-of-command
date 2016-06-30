var expect = require('chai').expect;

describe('space functions', function(){
	it('initiateBotInSpace', function(){
		var xStart = 5;
		var yStart = 5;

		var xCorner1 = 0;
		var yCorner1 = 0;

		var xCorner2 = 10;
		var yCorner2 = 10;

		var space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
		var bot = initiateBotInSpace(space);
		var expectedPosition = createVector(xStart, yStart);
		expect(bot.position).to.deep.equal(expectedPosition);
	});

	it('createRectangularSpace', function(done){
		var xCorner1 = 0;
		var yCorner1 = 4;

		var xCorner2 = 10;
		var yCorner2 = 7;

		var xStart = 5;
		var yStart = 5;

		var space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
		var bot = initiateBotInSpace(space);
		var lang = LANGUAGES.EN;

		var commandString = 'ffllff'; //forward, forward, left, left, forward, forward
		var command = compileCommands(commandString, lang, space.contains);
		command(bot)
		.then(function(movedBot){
			/*
			 * expected path:
			 * 	forward, north: 		(5, 5, N) -> (5, 4, N)
			 * 	forward, north (hit wall): 	(5, 4, N) -> (5, 4, N)
			 * 	left:				(5, 4, N) -> (5, 4, W)
			 * 	left:				(5, 4, W) -> (5, 4, S)
			 * 	forward, south:			(5, 4, S) -> (5, 5, S)
			 * 	forward, south: 		(5, 5, S) -> (5, 6, S)
			 */	
			var expectedPosition = createVector(5, 6);
			expect(movedBot.position).to.deep.equal(expectedPosition);
			done();
		})
		.catch(done);
	});

	it('createCircularSpace', function(done){
		var xSpaceCenter = 0;
		var ySpaceCenter = 5;
		var radius = 3;

		var xStart = 1;
		var yStart = 4;

		var space = createCircularSpace(xStart, yStart, xSpaceCenter, ySpaceCenter, radius);
		var bot = initiateBotInSpace(space);
		var lang = LANGUAGES.EN;

		var commandString = 'rrflfff'; //right, right, forward, left, forward, forward, forward
		var command = compileCommands(commandString, lang, space.contains);
		command(bot)
		.then(function(movedBot){
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
			var expectedPosition = createVector(3, 5);
			expect(movedBot.position).to.deep.equal(expectedPosition);
			done();
		})
		.catch(done);
	});
});
