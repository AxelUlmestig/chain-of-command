var expect = require('chai').expect;

describe('interpreter', function() {
	describe('getFunction', function() {
		it('english f', function(done){
			var bot = initiateBot(createVector(0, 0));
			var letter = 'f';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
				done();
			})
			.catch(done);
		});

		it('english F', function(done){
			var bot = initiateBot(createVector(0, 0));
			var letter = 'F';
			var lang = LANGUAGES.EN
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
				done();
			})
			.catch(done);
		});

		it('swedish f', function(done){
			var bot = initiateBot(createVector(0, 0));
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
			var bot = initiateBot(createVector(0, 0));
			var letter = 'g';
			var lang = LANGUAGES.SE
			var f = getFunction(lang, letter);
			f(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, -1)); //expect one step north from (0, 0) -> (0, -1)
				done();
			})
			.catch(done);
		});

		it('swedish h', function(done){
			var bot = initiateBot(createVector(0, 0));
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
			var bot = initiateBot(createVector(0, 0));
			var command = moveBot;
			var inConstraints = bot => bot.position.y > -1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			constrainedCommand(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, 0));
				done();
			})
			.catch(done);
		});

		it('moveBot unconstrained', function(done){
			var bot = initiateBot(createVector(0, 0));
			var command = moveBot;
			var inConstraints = bot => bot.position.x < 1;
			var constrainedCommand = constrainCommand(inConstraints, command);
			constrainedCommand(bot)
			.then(function(newBot){
				expect(newBot.position).to.deep.equal(createVector(0, -1));
				done();
			})
			.catch(done);
		});
	});

	describe('compileCommands', function() {
		it('unbound, english', function(done) {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(2, -1));
				done();
			})
			.catch(done);
		});

		it('bound, english', function(done) {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'FQrFf'; //forward, ?, right, forward, forward
			var lang = LANGUAGES.EN;
			var inBound = bot => bot.position.x < 2;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(1, -1));
				done();
			})
			.catch(done);
		});

		it('unbound, swedish', function(done) {
			var bot = initiateBot(createVector(0, 0));
			var commandString = 'GFhGg'; //forward, (english forward), right, forward, forward
			var lang = LANGUAGES.SE;
			var inBound = bot => true;
			var executeCommands = compileCommands(commandString, lang, inBound);
			executeCommands(bot)
			.then(function(movedBot){
				expect(movedBot.position).to.deep.equal(createVector(2, -1));
				done();
			})
			.catch(done);
		});

		it('empty command', function(done) {
			var bot = initiateBot(createVector(0, 0));
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
