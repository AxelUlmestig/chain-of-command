/*
 * Handles the creation and manipulation of spaces from user.
 *
 * Has dependencies to the following files/functions:
 *
 *  script/logic/space_functions.js
 *      createCircularSpace(xStart, yStart, xCenter, yCenter, radius)
 *      createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2)
 *
 */

app.controller('space_controller', ($scope, state) => {
    $scope.shapes = ['Rectangle', 'Circle'];

    $scope.circle = {
        'start': {},
        'center': {}
    }

    $scope.rectangle = {
        'start': {},
        'corner1': {},
        'corner2': {}
    }

    $scope.submitCircle = circ => {
        const xStart = circ.start.x;
        const yStart = circ.start.y;

        const xSpaceCenter = circ.center.x;
        const ySpaceCenter = circ.center.y;

        const radius = circ.radius;

        state.space = createCircularSpace(xStart, yStart, xSpaceCenter, ySpaceCenter, radius);
    }

    $scope.submitRectangle = rect => {
        const xStart = rect.start.x;
        const yStart = rect.start.y;

        const xCorner1 = rect.corner1.x;
        const yCorner1 = rect.corner1.y;

        const xCorner2 = rect.corner2.x;
        const yCorner2 = rect.corner2.y;

        state.space = createRectangularSpace(xStart, yStart, xCorner1, yCorner1, xCorner2, yCorner2);
    }


})
