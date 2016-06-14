app.controller('space_controller', function($scope, state) {
	var xStart = 5;
	var yStart = 5;

	var xCorner1 = 0;
	var yCorner1 = 0;

	var xCorner2 = 10;
	var yCorner2 = 10;

	state.space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
})
