var expect = require('chai').expect;

var fs = require('fs');
var vm = require('vm');
var files = ['script/logic/vector_functions.js', 'script/logic/bot_functions.js', 'script/logic/util.js', 'script/logic/interpreter.js', 'script/logic/space_functions.js'];

var loadFiles = function(files) {
	files.map(path => {
		var code = fs.readFileSync(path);
		vm.runInThisContext(code);
	});
}

loadFiles(files);

describe('vector functions', function(){
	it('add', function(){
		var x1 = -3;
		var y1 = 3;
		var x2 = 2;
		var y2 = 2;
		var v1 = createVector(x1, y1);
		var v2 = createVector(x2, y2);
		var sum = addVectors(v1, v2);
		expect(sum.x).to.equal(x1 + x2);
		expect(sum.y).to.equal(y1 + y2);
	});

	describe('inRectangle', function() {
		it('true', function() {
			var x1 = 60;
			var y1 = 175;
			var x2 = 50;
			var y2 = 150;
			var x3 = 100;
			var y3 = 200;
			var v1 = createVector(x1, y1);
			var v2 = createVector(x2, y2);
			var v3 = createVector(x3, y3);
			expect(inRectangle(v1, v2, v3)).to.be.ok;
		});

		it('false', function() {
			var x1 = 35;
			var y1 = 175;
			var x2 = 50;
			var y2 = 150;
			var x3 = 100;
			var y3 = 200;
			var v1 = createVector(x1, y1);
			var v2 = createVector(x2, y2);
			var v3 = createVector(x3, y3);
			expect(inRectangle(v1, v2, v3)).to.not.be.ok;
		});
	});

	it('distance', function() {
		var v1 = createVector(0, 0);
		var v2 = createVector(3, 4);
		var dist = getVectorDistance(v1, v2);
		expect(dist).to.equal(5);
	});
});

describe('bot functions', function(){
	describe('init', function(){
		it('position', function(){
			var x = -3;
			var y = 2;
			var bot = initiateBot(x, y);
			expect(bot.position.x).to.equal(x);
			expect(bot.position.y).to.equal(y);
		});

		it('position', function(){
			var x = -3;
			var y = 2;
			var bot = initiateBot(x, y);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});
	});

	describe('movement', function() {
		it('turn left', function(done){
			var bot = initiateBot(0, 0);
			turnBotLeft(bot)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.WEST.name);
				done();
			})
			.catch(done);
		});

		it('turn right', function(done){
			var bot = initiateBot(0, 0);
			turnBotRight(bot)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.EAST.name);
				done();
			})
			.catch(done);
		});

		it('turn right x4', function(done){
			var bot = initiateBot(0, 0);
			turnBotRight(bot)
			.then(turnBotRight)
			.then(turnBotRight)
			.then(turnBotRight)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
				done();
			})
			.catch(done);
		});


		it('turn left x4', function(done){
			var bot = initiateBot(0, 0);
			turnBotLeft(bot)
			.then(turnBotLeft)
			.then(turnBotLeft)
			.then(turnBotLeft)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
				done();
			})
			.catch(done);
		});

		it('move forward, north', function(done){
			var bot = initiateBot(0, 0);
			moveBot(bot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(0, 1));
				done();
			})
			.catch(done);
		});

		it('move forward, east', function(done){
			var bot = initiateBot(0, 0);
			turnBotRight(bot)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(1, 0));
				done();
			})
			.catch(done);
		});


		it('move forward, south', function(done){
			var bot = initiateBot(0, 0);
			turnBotRight(bot)
			.then(turnBotRight)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(0, -1));
				done();
			})
			.catch(done);
		});

		it('move forward, west', function(done){
			var bot = initiateBot(0, 0);
			turnBotLeft(bot)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(-1, 0));
				done();
			})
			.catch(done);
		});

		it('getNewDirection', function() {
			var bot = initiateBot(0, 0);
			var newDir = getNewDirection(bot, -1);
			expect(newDir.name).to.equal(DIRECTIONS.WEST.name);
		});

	});

	describe('show bot', function(){
		it('(0, 0, N)', function(){
			var bot = initiateBot(0, 0);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(0, 0, N)');
		});

		it('(7, 1, N)', function(){
			var bot = initiateBot(7, 1);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(7, 1, N)');
		});

		it('(3, 4, E)', function(done){
			var bot = initiateBot(3, 4);
			turnBotRight(bot)
			.then(function(turnedBot){
				var printedBot = showBot(turnedBot);
				expect(printedBot).to.deep.equal('(3, 4, E)');
				done();
			})
			.catch(done);
		});

		it('(-2, 5, S)', function(done){
			var bot = initiateBot(-2, 5);
			turnBotRight(bot)
			.then(turnBotRight)
			.then(function(turnedBot){
				var printedBot = showBot(turnedBot);
				expect(printedBot).to.deep.equal('(-2, 5, S)');
				done();
			})
			.catch(done);
		});

		it('(0, 3, W)', function(done) {
			var bot = initiateBot(0, 3);
			turnBotLeft(bot)
			.then(function(turnedBot){
				var printedBot = showBot(turnedBot);
				expect(printedBot).to.deep.equal('(0, 3, W)');
				done();
			})
			.catch(done);
		});
	});
});

describe('interpreter', function() {
	describe('getFunction', function() {
		it('english f', function(done){
			var bot = initiateBot(0, 0);
			var letter = 'f';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 1)); //expect one step north from (0, 0) -> (0, 1)
				done();
			})
			.catch(done);
		});

		it('english F', function(done){
			var bot = initiateBot(0, 0);
			var letter = 'F';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 1)); //expect one step north from (0, 0) -> (0, 1)
				done();
			})
			.catch(done);
		});

		it('swedish f', function(done){
			var bot = initiateBot(0, 0);
			var letter = 'f';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 0)); //expect no movement, it should stay at the origin
				done();
			})
			.catch(done);
		});

		it('swedish g', function(done){
			var bot = initiateBot(0, 0);
			var letter = 'g';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 1)); //expect one step north from (0, 0) -> (0, 1)
				done();
			})
			.catch(done);
		});

		it('swedish h', function(done){
			var bot = initiateBot(0, 0);
			var letter = 'h';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.direction).to.equal(DIRECTIONS.EAST); 
				done();
			})
			.catch(done);
		});
	});

	describe('constrainCommand', function() {
		it('moveBot constrained', function(done){
			var bot = initiateBot(0, 0);
			var command = moveBot;
			var inConstraints = bot => bot.position.y < 1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			constrainedCommand(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 0));
				done();
			})
			.catch(done);
		});

		it('moveBot unconstrained', function(done){
			var bot = initiateBot(0, 0);
			var command = moveBot;
			var inConstraints = bot => bot.position.x < 1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			constrainedCommand(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 1));
				done();
			})
			.catch(done);
		});
	});

	describe('compileCommands', function() {
		it('unbound, english', function(done) {
			var bot = initiateBot(0, 0);
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(2, 1));
				done();
			})
			.catch(done);
		});

		it('bound, english', function(done) {
			var bot = initiateBot(0, 0);
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => bot.position.x < 2;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(1, 1));
				done();
			})
			.catch(done);
		});

		it('unbound, swedish', function(done) {
			var bot = initiateBot(0, 0);
			var commandString = 'GFhGg'; //forward, (english forward), right, forward, forward
			var lang = LANGUAGES.SE;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(2, 1));
				done();
			})
			.catch(done);
		});

		it('empty command', function(done) {
			var bot = initiateBot(0, 0);
			var commandString = '';
			var lang = LANGUAGES.SE;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(0, 0));
				done();
			})
			.catch(done);
		})
	});
})

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
		var yCorner1 = 3;

		var xCorner2 = 10;
		var yCorner2 = 6;

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
			 * 	forward, north: 		(5, 5, N) -> (5, 6, N)
			 * 	forward, north (hit wall): 	(5, 6, N) -> (5, 6, N)
			 * 	left:				(5, 6, N) -> (5, 6, W)
			 * 	left:				(5, 6, W) -> (5, 6, S)
			 * 	forward, south:			(5, 6, S) -> (5, 5, S)
			 * 	forward, south: 		(5, 5, S) -> (5, 4, S)
			 */	
			var expectedPosition = createVector(5, 4);
			expect(movedBot.position).to.deep.equal(expectedPosition);
			done();
		})
		.catch(done);
	});

	it('createCircularSpace', function(done){
		var xSpaceCenter = 0;
		var ySpaceCenter = 3;
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
			 * 	forward, south: 		(1, 4, S) -> (1, 3, S)
			 * 	left:				(1, 3, S) -> (1, 3, E)
			 * 	forward, east: 			(1, 3, E) -> (2, 3, E)
			 * 	forward, east: 			(2, 3, E) -> (3, 3, E)
			 * 	forward, east (hit wall): 	(3, 3, E) -> (3, 3, E)
			 */	
			var expectedPosition = createVector(3, 3);
			expect(movedBot.position).to.deep.equal(expectedPosition);
			done();
		})
		.catch(done);
	});
});

describe('util', function(){
	it('chain functions', function(done){
		var add1 = function(x) {
			return new Promise(function(resolve, reject) {
				resolve(x + 1);
			});
		}
		
		var mul2 = function(x) {
			return new Promise(function(resolve, reject) {
				resolve(x * 2);
			})
		}
		
		var functions = [add1, mul2];
		var chain = createChain(functions);
		//chain(0) = mul2(add1(0)) = 2 * (0 + 1) = 2
		chain(0).then(function(output){
			expect(output).to.equal(2);
			done();
		})
		.catch(done);
	});

	it('id', function(done) {
		var x = 3;
		id(x)
		.then(function(y) {
			expect(y).to.equal(x);
			done();
		})
		.catch(done);
	});
});
