const expect = require('chai').expect;

describe('interpreter', () => {
	describe('getFunction', () => {
		it('english f', () => {
			const bot = initiateBot(createVector(0, 0));
			const letter = 'f';
			const lang = LANGUAGES.EN
			const f = getFunction(lang, letter);
			const newBot = f(bot)
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('english F', () => {
			const bot = initiateBot(createVector(0, 0));
			const letter = 'F';
			const lang = LANGUAGES.EN
			const f = getFunction(lang, letter);
			const newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('swedish f', () => {
			const bot = initiateBot(createVector(0, 0));
			const letter = 'f';
			const lang = LANGUAGES.SE
			const f = getFunction(lang, letter);
			const newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, 0)); //expect no movement, it should stay at the origin
		});

		it('swedish g', () => {
			const bot = initiateBot(createVector(0, 0));
			const letter = 'g';
			const lang = LANGUAGES.SE
			const f = getFunction(lang, letter);
			const newBot = f(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
		});

		it('swedish h', () => {
			const bot = initiateBot(createVector(0, 0));
			const letter = 'h';
			const lang = LANGUAGES.SE
			const f = getFunction(lang, letter);
			const newBot = f(bot);
			expect(newBot.direction).to.equal(DIRECTIONS.EAST); 
		});
	});

	describe('constrainCommand', () => {
		it('moveBot constrained', () => {
			const bot = initiateBot(createVector(0, 0));
			const command = moveBot;
			const inConstraints = bot => bot.position.y > -1;
			const constrainedCommand = constrainCommand(inConstraints, command);
			const newBot = constrainedCommand(bot);
			expect(newBot.position).to.deep.equal(createVector(0, 0));
		});

		it('moveBot unconstrained', () => {
			const bot = initiateBot(createVector(0, 0));
			const command = moveBot;
			const inConstraints = bot => bot.position.x < 1;
			const constrainedCommand = constrainCommand(inConstraints, command);
			const newBot = constrainedCommand(bot);
			expect(newBot.position).to.deep.equal(createVector(0, -1));
		});
	});

	describe('compileCommands', () => {
		it('unbound, english', () => {
			const bot = initiateBot(createVector(0, 0));
			const commandString = 'FQrFf'; //forward, ?, right, forward, forward
			const lang = LANGUAGES.EN;
			const inBound = bot => true;
			const executeCommands = compileCommands(commandString, lang, inBound);
			const movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(2, -1));
		});

		it('bound, english', () => {
			const bot = initiateBot(createVector(0, 0));
			const commandString = 'FQrFf'; //forward, ?, right, forward, forward
			const lang = LANGUAGES.EN;
			const inBound = bot => bot.position.x < 2;
			const executeCommands = compileCommands(commandString, lang, inBound);
			const movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(1, -1));
		});

		it('unbound, swedish', () => {
			const bot = initiateBot(createVector(0, 0));
			const commandString = 'GFhGg'; //forward, (english forward), right, forward, forward
			const lang = LANGUAGES.SE;
			const inBound = bot => true;
			const executeCommands = compileCommands(commandString, lang, inBound);
			const movedBot = executeCommands(bot);
			expect(movedBot.position).to.deep.equal(createVector(2, -1));
		});

		it('empty command', () => {
			const bot = initiateBot(createVector(0, 0));
			const commandString = '';
			const lang = LANGUAGES.SE;
			const inBound = bot => true;
			const executeCommands = compileCommands(commandString, lang, inBound);
			const movedBot = executeCommands(bot)
			expect(movedBot.position).to.deep.equal(createVector(0, 0));
		})
	});
})
