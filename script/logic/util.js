/*
 * Contains utility functions used in functional design.
 */

var chainFunctions = function(functions, arg) {
	var result = functions.reduce((mem, f) => f(mem), arg);
	return result;
}

var createChain = function(arr) {
	return function(arg) {
		return chainFunctions(arr, arg);
	}
}

//identity function, id(x) = x
var id = x => x;
