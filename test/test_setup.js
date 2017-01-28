const fs = require('fs');
const vm = require('vm');
const files = ['script/logic/vector_functions.js', 'script/logic/bot_functions.js', 'script/logic/util.js', 'script/logic/interpreter.js', 'script/logic/space_functions.js'];

const loadFiles = files => {
	files.map(path => {
		const code = fs.readFileSync(path);
		vm.runInThisContext(code);
	});
}

loadFiles(files);
console.log('test setup finished');
