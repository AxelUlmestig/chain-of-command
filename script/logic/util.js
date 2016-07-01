/*
 * Contains utility functions used in functional design.
 */

var chainFunctions = function(functions, arg) {
	if(functions.length) {
		var f = functions.pop();
		return f(chainFunctions(functions, arg));
	} else {
		return arg;
	}
}

var createChain = function(arr) {
	return function(arg) {
		return chainFunctions(arr, arg);
	}
}

//identity function, id(x) = x
var id = x => x;
