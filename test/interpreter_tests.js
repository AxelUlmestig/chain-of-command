var expect = require('chai').expect;

describe('interpreter', () => {
	describe('getFunction', () => {
		it('english f', () => {
			var bot = initiateBot(createVector(0, 0));
			var letter = 'f';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			var newBot = f(bot)
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('english F', () => {
			var bot = initiateBot(createVector(0, 0));
			var letter = 'F';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			var newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('swedish f', () => {
			var bot = initiateBot(createVector(0, 0));
			var letter = 'f';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			var newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, 0)); //expect no movement, it should stay at the origin
		});

		it('swedish g', () => {
			var bot = initiateBot(createVector(0, 0));
			var letter = 'g';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			var newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('swedish h', () => {
			var bot = initiateBot(createVector(0, 0));
			var letter = 'h';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			var newBot = f(bot);
			expect(newBot.direction).to.equal(DIRECTIONS.EAST); 
		});
	});

	describe('constrainCommand', () => {
		it('moveBot constrained', () => {
			var bot = initiateBot(createVector(0, 0));
			var command = moveBot;
			var inConstraints = bot => bot.position.y > -1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			var newBot = constrainedCommand(bot);
			expect(newBot.position).to.deep.equal(createVector(0, 0));
		});

		it('moveBot unconstrained', () => {
			var bot = initiateBot(createVector(0, 0));
			var command = moveBot;
			var inConstraints = bot => bot.position.x < 1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			var newBot = constrainedCommand(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1));
		});
	});

	describe('compileCommands', () => {
		it('unbound, english', () => {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			var movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(2, -1));
		});

		it('bound, english', () => {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => bot.position.x < 2;
			var executeCommands = compileCommands(commandString, lang, inBound);
			var movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(1, -1));
		});

		it('unbound, swedish', () => {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'GFhGg'; //forward, (english forward), right, forward, forward
			var lang = LANGUAGES.SE;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			var movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(2, -1));
		});

		it('empty command', () => {
			var bot = initiateBot(createVector(0, 0));
			var commandString = '';
			var lang = LANGUAGES.SE;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			var movedBot = executeCommands(bot)
			expect(movedBot.position).to.deep.equal(createVector(0, 0));
		})
	});
})
