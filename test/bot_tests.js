const expect = require('chai').expect;

describe('bot functions', () => {
	describe('init', () => {
		it('position', () => {
			const x = -3;
			const y = 2;
			const position = createVector(x, y);
			const bot = initiateBot(position);
			expect(bot.position.x).to.equal(x);
			expect(bot.position.y).to.equal(y);
		});

		it('position', () => {
			const x = -3;
			const y = 2;
			const position = createVector(x, y);
			const bot = initiateBot(position);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});
	});

	describe('movement', () =>  {
		it('turn left', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.WEST.name);
		});

		it('turn right', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.EAST.name);
		});

		it('turn right x4', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});


		it('turn left x4', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			bot = turnBotLeft(bot);
			expect(bot.direction.name).to.equal(DIRECTIONS.NORTH.name);
		});

		it('move forward, north', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, -1));
		});

		it('move forward, east', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(1, 0));
		});


		it('move forward, south', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(0, 1));
		});

		it('move forward, west', () => {
			let bot = initiateBot(createVector(0, 0));
			bot = turnBotLeft(bot);
			bot = moveBot(bot);
			expect(bot.position).to.deep.equal(createVector(-1, 0));
		});

		it('getNewDirection', () =>  {
			const bot = initiateBot(createVector(0, 0));
			const newDir = getNewDirection(bot, -1);
			expect(newDir.name).to.equal(DIRECTIONS.WEST.name);
		});

	});

	describe('show bot', () => {
		it('(0, 0, N)', () => {
			const bot = initiateBot(createVector(0, 0));
			const printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(0, 0, N)');
		});

		it('(7, 1, N)', () => {
			const bot = initiateBot(createVector(7, 1));
			const printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(7, 1, N)');
		});

		it('(3, 4, E)', () => {
			let bot = initiateBot(createVector(3, 4));
			bot = turnBotRight(bot);
			const printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(3, 4, E)');
		});

		it('(-2, 5, S)', () => {
			let bot = initiateBot(createVector(-2, 5));
			bot = turnBotRight(bot);
			bot = turnBotRight(bot);
			const printedBot = showBot(bot);
			expect(printedBot).to.deep.equal('(-2, 5, S)');
		});

		it('(0, 3, W)', () =>  {
			const bot = initiateBot(createVector(0, 3));
			const turnedBot = turnBotLeft(bot);
			const printedBot = showBot(turnedBot);
			expect(printedBot).to.deep.equal('(0, 3, W)');
		});
	});
});
