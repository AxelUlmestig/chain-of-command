/*
 * Contains utility functions used in functional design.
 */

//chain functions, [f1, f2, f3] -> f(x) = f3(f2(f1(x)))
const chainFunctions = functions => arg => functions.reduce((mem, f) => f(mem), arg)

//identity function, id(x) = x
const id = x => x;
