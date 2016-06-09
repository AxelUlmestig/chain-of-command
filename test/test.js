var expect = require('chai').expect;

var fs = require('fs');
var vm = require('vm');
var files = ['script/vector_functions.js', 'script/bot_functions.js', 'script/util.js', 'script/interpreter.js'];

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
			var inBound = bot => bot.x < 2;
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
	});
})

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
