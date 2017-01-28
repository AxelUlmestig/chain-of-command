var expect = require('chai').expect;

describe('bot functions', () => {
	describe('init', () => {
		it('position', () => {
			var x = -3;
			var y = 2;
			var position = createVector(x, y);
			var bot = initiateBot(position);
			expect(bot.position.x).to.equal(x);
			expect(bot.position.y).to.equal(y);
		});

		it('position', () => {
			var x = -3;
			var y = 2;
			var position = createVector(x, y);
			var bot = initiateBot(position);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});
	});

	describe('movement', () =>  {
		it('turn left', () => {
			var bot = initiateBot(createVector(0, 0));
			var bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.WEST.name);
		});

		it('turn right', () => {
			var bot = initiateBot(createVector(0, 0));
			var bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.EAST.name);
		});

		it('turn right x4', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});


		it('turn left x4', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});

		it('move forward, north', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, -1));
		});

		it('move forward, east', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(1, 0));
		});


		it('move forward, south', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, 1));
		});

		it('move forward, west', () => {
			var bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(-1, 0));
		});

		it('getNewDirection', () =>  {
			var bot = initiateBot(createVector(0, 0));
			var newDir = getNewDirection(bot, -1);
			expect(newDir.name).to.equal(DIRECTIONS.WEST.name);
		});

	});

	describe('show bot', () => {
		it('(0, 0, N)', () => {
			var bot = initiateBot(createVector(0, 0));
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(0, 0, N)');
		});

		it('(7, 1, N)', () => {
			var bot = initiateBot(createVector(7, 1));
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(7, 1, N)');
		});

		it('(3, 4, E)', () => {
			var bot = initiateBot(createVector(3, 4));
			bot = turnBotRight(bot);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(3, 4, E)');
		});

		it('(-2, 5, S)', () => {
			var bot = initiateBot(createVector(-2, 5));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			var printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(-2, 5, S)');
		});

		it('(0, 3, W)', () =>  {
			var bot = initiateBot(createVector(0, 3));
			var turnedBot = turnBotLeft(bot);
			var printedBot = showBot(turnedBot);
			expect(printedBot).to.deep.equal('(0, 3, W)');
		});
	});
});
