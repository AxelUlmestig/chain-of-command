const expect = require('chai').expect;

describe('vector functions', () => {
	it('add', () => {
		const x1 = -3;
		const y1 = 3;
		const x2 = 2;
		const y2 = 2;
		const v1 = createVector(x1, y1);
		const v2 = createVector(x2, y2);
		const sum = addVectors(v1, v2);
		expect(sum.x).to.equal(x1 + x2);
		expect(sum.y).to.equal(y1 + y2);
	});

	describe('inRectangle', () => {
		it('true', () => {
			const x1 = 60;
			const y1 = 175;
			const x2 = 50;
			const y2 = 150;
			const x3 = 100;
			const y3 = 200;
			const v1 = createVector(x1, y1);
			const v2 = createVector(x2, y2);
			const v3 = createVector(x3, y3);
			expect(inRectangle(v1, v2, v3)).to.be.ok;
		});

		it('false', () => {
			const x1 = 35;
			const y1 = 175;
			const x2 = 50;
			const y2 = 150;
			const x3 = 100;
			const y3 = 200;
			const v1 = createVector(x1, y1);
			const v2 = createVector(x2, y2);
			const v3 = createVector(x3, y3);
			expect(inRectangle(v1, v2, v3)).to.not.be.ok;
		});
	});

	it('distance', () => {
		const v1 = createVector(0, 0);
		const v2 = createVector(3, 4);
		const dist = getVectorDistance(v1, v2);
		expect(dist).to.equal(5);
	});
});
