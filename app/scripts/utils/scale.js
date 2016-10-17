/**
 * Returns a scaling function to interpolate values within the supplied domain
 * and range. Can optionally clamp input values to prevent return values
 * outside range.
 *
 * @param  {Number[]} domain
 * @param  {Number[]} range
 * @param  {Boolean} [applyClamp]
 * @return {Function}
 * @example
 *
 * var myScale = scale([0, 100], [0, 10]);
 *
 * myScale(50); // returns 5
 * myScale(150); // returns 15
 *
 * var clampScale = scale([0, 100], [0, 10]);
 *
 * clampScale(50); // returns 5
 * clampScale(150); // returns 10
 */
function scale (domain, range, applyClamp) {
  var a = domain[0];
  var b = domain[1] - a;

  var clamp = applyClamp ? function (num, min, max) {
    if (min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    if (num <= min) return min;
    if (num >= max) return max;

    return num;
  } : function (num) { return num; };

  var interpolator = function (t) {
    return range[0] * (1 - t) + range[1] * t;
  };

  return function scale (n) {
    return interpolator((clamp(n, domain[0], domain[1]) - a) / b);
  };
}

export default scale;
