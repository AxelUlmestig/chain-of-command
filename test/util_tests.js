var expect = require('chai').expect;

describe('util', function(){
	it('chain functions', function(){
		var add1 = x => x + 1;
		
		var mul2 = x => 2 * x;
		
		var functions = [add1, mul2];
		var chain = chainFunctions(functions);
		//chain(0) = mul2(add1(0)) = 2 * (0 + 1) = 2
		var output = chain(0);
		expect(output).to.equal(2);
	});

	it('id', function() {
		var x = 3;
		var y = id(x);
		expect(y).to.equal(x);
	});
});
