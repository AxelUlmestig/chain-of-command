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
	 * Keeps track of state.space and resets the bot if state.space 
	 * is updated and both state.space and state.language are defined.
	 *
	 * $watchGroup is used because $watch doesn't seem to trigger when
	 * a value is updated in the space but not the shape.
	 */
	$scope.$watchGroup(['state.space'], function(newValue, oldValue) {
		if($scope.state.language && $scope.state.space) {
			$scope.resetBot();
		}
	}, true);

	/*
	 * Initiates a bot if the space and language are ready but there is 
	 * no bot.
	 */
	$scope.$watchGroup(['state.language'], function(newValue, oldValue) {
		if($scope.state.language && $scope.state.space && !$scope.state.bot) {
			$scope.resetBot();
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
