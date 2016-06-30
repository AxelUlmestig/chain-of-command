var expect = require('chai').expect;

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
