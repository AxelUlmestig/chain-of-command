var fs = require('fs');
var vm = require('vm');
var files = ['script/logic/vector_functions.js', 'script/logic/bot_functions.js', 'script/logic/util.js', 'script/logic/interpreter.js', 'script/logic/space_functions.js'];

var loadFiles = files => {
	files.map(path => {
		var code = fs.readFileSync(path);
		vm.runInThisContext(code);
	});
}

loadFiles(files);
console.log('test setup finished');
