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
		it('turn left', function(){
			var bot = initiateBot(createVector(0, 0));
			var bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.WEST.name);
		});

		it('turn right', function(){
			var bot = initiateBot(createVector(0, 0));
			var bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.EAST.name);
		});

		it('turn right x4', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});


		it('turn left x4', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});

		it('move forward, north', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, -1));
		});

		it('move forward, east', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(1, 0));
		});


		it('move forward, south', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, 1));
		});

		it('move forward, west', function(){
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(-1, 0));
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

		it('(3, 4, E)', function(){
			var bot = initiateBot(createVector(3, 4));
			bot = turnBotRight(bot);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(3, 4, E)');
		});

		it('(-2, 5, S)', function(){
			var bot = initiateBot(createVector(-2, 5));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(-2, 5, S)');
		});

		it('(0, 3, W)', function() {
			var bot = initiateBot(createVector(0, 3));
			var turnedBot = turnBotLeft(bot);
			var printedBot = showBot(turnedBot);
			expect(printedBot).to.deep.equal('(0, 3, W)');
		});
	});
});
