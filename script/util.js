var createChain = function(arr) {
	return function(arg) {
		return new Promise(function(resolve, reject){
			resolve(arg);
		});
	}
}
