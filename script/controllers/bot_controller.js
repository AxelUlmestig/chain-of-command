/*
 * Handles the IO of the bot from the web interface.
 *
 * Has dependencies to the following files/functions:
 *
 * 	script/controllers/initiate_app.js
 * 		app
 *
 *	script/logic/bot_functions.js
 *		showBot(bot)
 *
 *	script/logic/space_functions.js
 *		initiateBotInSpace(space)
 *
 *	script/logic/interpreter.js
 *		compileCommands(commandString, language, inBounds)
 *
 */

app.controller('bot_controller', function($scope, state) {
	$scope.state = state;
	$scope.showBot = showBot;

	/*
	 * Keeps track if both state.language and state.space are defined.
	 * When they are, it initiates a bot and adds it to state.bot
	 */
	$scope.$watch(function(){
		return $scope.state.language && $scope.state.space;
	}, function(newValue, oldValue) {
		if(newValue === oldValue) { //to prevent it from firing on startup
			return;
		}
		if(!$scope.state.bot) {
			var space = $scope.state.space;
			var bot = initiateBotInSpace(space);
			$scope.state.bot = bot;
		}
	}, true);

	$scope.sendCommand = function(commandString) {
		var space = $scope.state.space;
		var lang = $scope.state.language;
		var command = compileCommands(commandString, lang, space.contains);

		var bot = $scope.state.bot;
		command(bot)
		.then(function(movedBot){
			$scope.state.bot = movedBot;
			$scope.$apply();
		});
	}

	$scope.resetBot = function() {
		var space = $scope.state.space;
		$scope.state.bot = initiateBotInSpace(space);
	}
})
