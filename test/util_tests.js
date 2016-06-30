var expect = require('chai').expect;

describe('util', function(){
	it('chain functions', function(done){
		var add1 = function(x) {
			return new Promise(function(resolve, reject) {
				resolve(x + 1);
			});
		}
		
		var mul2 = function(x) {
			return new Promise(function(resolve, reject) {
				resolve(x * 2);
			})
		}
		
		var functions = [add1, mul2];
		var chain = createChain(functions);
		//chain(0) = mul2(add1(0)) = 2 * (0 + 1) = 2
		chain(0).then(function(output){
			expect(output).to.equal(2);
			done();
		})
		.catch(done);
	});

	it('id', function(done) {
		var x = 3;
		id(x)
		.then(function(y) {
			expect(y).to.equal(x);
			done();
		})
		.catch(done);
	});
});
