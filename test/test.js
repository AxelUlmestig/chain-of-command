var expect = require('chai').expect;

var fs = require('fs');
var vm = require('vm');
var files = ['script/vector_functions.js', 'script/bot_functions.js'];

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

	describe('inSpace', function() {
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
			expect(inSpace(v1, v2, v3)).to.be.ok;
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
			expect(inSpace(v1, v2, v3)).to.not.be.ok;
		});
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
			expect(bot.direction.name).to.equal(directions.NORTH.name);
		});
	});
});
