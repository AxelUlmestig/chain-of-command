var chainFunctions = function(functions, arg) {
	if(functions.length) {
		var f = functions.pop();
		return chainFunctions(functions, arg).then(f);
	} else {
		return new Promise(function(resolve, reject) {
			resolve(arg)
		});
	}
}

var createChain = function(arr) {
	return function(arg) {
		return chainFunctions(arr, arg);
	}
}

//identity function, id(x) = x
var id = function(x) {
	return new Promise(function(resolve, reject) {
		resolve(x);
	});
}
