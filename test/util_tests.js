const expect = require('chai').expect;

describe('util', () => {
    it('chain functions', () => {
        const add1 = x => x + 1;
        
        const mul2 = x => 2 * x;
        
        const functions = [add1, mul2];
        const chain = chainFunctions(functions);
        //chain(0) = mul2(add1(0)) = 2 * (0 + 1) = 2
        const output = chain(0);
        expect(output).to.equal(2);
    });

    it('id', () => {
        const x = 3;
        const y = id(x);
        expect(y).to.equal(x);
    });
});
