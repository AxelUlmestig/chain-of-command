var expect = require('chai').expect;

describe('bot functions', function(){
	describe('init', function(){
		it('position', function(){
			var x = -3;
			var y = 2;
			var position = createVector(x, y);
			var bot = initiateBot(position);
			expect(bot.position.x).to.equal(x);
			expect(bot.position.y).to.equal(y);
		});

		it('position', function(){
			var x = -3;
			var y = 2;
			var position = createVector(x, y);
			var bot = initiateBot(position);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});
	});

	describe('movement', function() {
		it('turn left', function(done){
			var bot = initiateBot(createVector(0, 0));
			turnBotLeft(bot)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.WEST.name);
				done();
			})
			.catch(done);
		});

		it('turn right', function(done){
			var bot = initiateBot(createVector(0, 0));
			turnBotRight(bot)
			.then(function(bot) {
				expect(bot.direction.name).to.equal(DIRECTIONS.EAST.name);
				done();
			})
			.catch(done);
		});

		it('turn right x4', function(done){
			var bot = initiateBot(createVector(0, 0));
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
			var bot = initiateBot(createVector(0, 0));
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
			var bot = initiateBot(createVector(0, 0));
			moveBot(bot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(0, -1));
				done();
			})
			.catch(done);
		});

		it('move forward, east', function(done){
			var bot = initiateBot(createVector(0, 0));
			turnBotRight(bot)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(1, 0));
				done();
			})
			.catch(done);
		});


		it('move forward, south', function(done){
			var bot = initiateBot(createVector(0, 0));
			turnBotRight(bot)
			.then(turnBotRight)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(0, 1));
				done();
			})
			.catch(done);
		});

		it('move forward, west', function(done){
			var bot = initiateBot(createVector(0, 0));
			turnBotLeft(bot)
			.then(moveBot)
			.then(function(bot) {
				expect(bot.position).to.deep.equal(createVector(-1, 0));
				done();
			})
			.catch(done);
		});

		it('getNewDirection', function() {
			var bot = initiateBot(createVector(0, 0));
			var newDir = getNewDirection(bot, -1);
			expect(newDir.name).to.equal(DIRECTIONS.WEST.name);
		});

	});

	describe('show bot', function(){
		it('(0, 0, N)', function(){
			var bot = initiateBot(createVector(0, 0));
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(0, 0, N)');
		});

		it('(7, 1, N)', function(){
			var bot = initiateBot(createVector(7, 1));
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(7, 1, N)');
		});

		it('(3, 4, E)', function(done){
			var bot = initiateBot(createVector(3, 4));
			turnBotRight(bot)
			.then(function(turnedBot){
				var printedBot = showBot(turnedBot);
				expect(printedBot).to.deep.equal('(3, 4, E)');
				done();
			})
			.catch(done);
		});

		it('(-2, 5, S)', function(done){
			var bot = initiateBot(createVector(-2, 5));
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
			var bot = initiateBot(createVector(0, 3));
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
