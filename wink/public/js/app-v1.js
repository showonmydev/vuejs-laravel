webpackJsonp([2],{

/***/ "./resources/assets/js/v1/Chart.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.5.0
 *
 * Copyright 2017 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
(function (f) {
	if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
		module.exports = f();
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		var g;if (typeof window !== "undefined") {
			g = window;
		} else if (typeof global !== "undefined") {
			g = global;
		} else if (typeof self !== "undefined") {
			g = self;
		} else {
			g = this;
		}g.Chart = f();
	}
})(function () {
	var define, module, exports;return function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
				}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
					var n = t[o][1][e];return s(n ? n : e);
				}, l, l.exports, e, t, n, r);
			}return n[o].exports;
		}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
			s(r[o]);
		}return s;
	}({ 1: [function (require, module, exports) {}, {}], 2: [function (require, module, exports) {
			/* MIT license */
			var colorNames = require(6);

			module.exports = {
				getRgba: getRgba,
				getHsla: getHsla,
				getRgb: getRgb,
				getHsl: getHsl,
				getHwb: getHwb,
				getAlpha: getAlpha,

				hexString: hexString,
				rgbString: rgbString,
				rgbaString: rgbaString,
				percentString: percentString,
				percentaString: percentaString,
				hslString: hslString,
				hslaString: hslaString,
				hwbString: hwbString,
				keyword: keyword
			};

			function getRgba(string) {
				if (!string) {
					return;
				}
				var abbr = /^#([a-fA-F0-9]{3})$/,
				    hex = /^#([a-fA-F0-9]{6})$/,
				    rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
				    per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
				    keyword = /(\w+)/;

				var rgb = [0, 0, 0],
				    a = 1,
				    match = string.match(abbr);
				if (match) {
					match = match[1];
					for (var i = 0; i < rgb.length; i++) {
						rgb[i] = parseInt(match[i] + match[i], 16);
					}
				} else if (match = string.match(hex)) {
					match = match[1];
					for (var i = 0; i < rgb.length; i++) {
						rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
					}
				} else if (match = string.match(rgba)) {
					for (var i = 0; i < rgb.length; i++) {
						rgb[i] = parseInt(match[i + 1]);
					}
					a = parseFloat(match[4]);
				} else if (match = string.match(per)) {
					for (var i = 0; i < rgb.length; i++) {
						rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
					}
					a = parseFloat(match[4]);
				} else if (match = string.match(keyword)) {
					if (match[1] == "transparent") {
						return [0, 0, 0, 0];
					}
					rgb = colorNames[match[1]];
					if (!rgb) {
						return;
					}
				}

				for (var i = 0; i < rgb.length; i++) {
					rgb[i] = scale(rgb[i], 0, 255);
				}
				if (!a && a != 0) {
					a = 1;
				} else {
					a = scale(a, 0, 1);
				}
				rgb[3] = a;
				return rgb;
			}

			function getHsla(string) {
				if (!string) {
					return;
				}
				var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
				var match = string.match(hsl);
				if (match) {
					var alpha = parseFloat(match[4]);
					var h = scale(parseInt(match[1]), 0, 360),
					    s = scale(parseFloat(match[2]), 0, 100),
					    l = scale(parseFloat(match[3]), 0, 100),
					    a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
					return [h, s, l, a];
				}
			}

			function getHwb(string) {
				if (!string) {
					return;
				}
				var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
				var match = string.match(hwb);
				if (match) {
					var alpha = parseFloat(match[4]);
					var h = scale(parseInt(match[1]), 0, 360),
					    w = scale(parseFloat(match[2]), 0, 100),
					    b = scale(parseFloat(match[3]), 0, 100),
					    a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
					return [h, w, b, a];
				}
			}

			function getRgb(string) {
				var rgba = getRgba(string);
				return rgba && rgba.slice(0, 3);
			}

			function getHsl(string) {
				var hsla = getHsla(string);
				return hsla && hsla.slice(0, 3);
			}

			function getAlpha(string) {
				var vals = getRgba(string);
				if (vals) {
					return vals[3];
				} else if (vals = getHsla(string)) {
					return vals[3];
				} else if (vals = getHwb(string)) {
					return vals[3];
				}
			}

			// generators
			function hexString(rgb) {
				return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
			}

			function rgbString(rgba, alpha) {
				if (alpha < 1 || rgba[3] && rgba[3] < 1) {
					return rgbaString(rgba, alpha);
				}
				return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
			}

			function rgbaString(rgba, alpha) {
				if (alpha === undefined) {
					alpha = rgba[3] !== undefined ? rgba[3] : 1;
				}
				return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
			}

			function percentString(rgba, alpha) {
				if (alpha < 1 || rgba[3] && rgba[3] < 1) {
					return percentaString(rgba, alpha);
				}
				var r = Math.round(rgba[0] / 255 * 100),
				    g = Math.round(rgba[1] / 255 * 100),
				    b = Math.round(rgba[2] / 255 * 100);

				return "rgb(" + r + "%, " + g + "%, " + b + "%)";
			}

			function percentaString(rgba, alpha) {
				var r = Math.round(rgba[0] / 255 * 100),
				    g = Math.round(rgba[1] / 255 * 100),
				    b = Math.round(rgba[2] / 255 * 100);
				return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
			}

			function hslString(hsla, alpha) {
				if (alpha < 1 || hsla[3] && hsla[3] < 1) {
					return hslaString(hsla, alpha);
				}
				return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
			}

			function hslaString(hsla, alpha) {
				if (alpha === undefined) {
					alpha = hsla[3] !== undefined ? hsla[3] : 1;
				}
				return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
			}

			// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
			// (hwb have alpha optional & 1 is default value)
			function hwbString(hwb, alpha) {
				if (alpha === undefined) {
					alpha = hwb[3] !== undefined ? hwb[3] : 1;
				}
				return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
			}

			function keyword(rgb) {
				return reverseNames[rgb.slice(0, 3)];
			}

			// helpers
			function scale(num, min, max) {
				return Math.min(Math.max(min, num), max);
			}

			function hexDouble(num) {
				var str = num.toString(16).toUpperCase();
				return str.length < 2 ? "0" + str : str;
			}

			//create a list of reverse color names
			var reverseNames = {};
			for (var name in colorNames) {
				reverseNames[colorNames[name]] = name;
			}
		}, { "6": 6 }], 3: [function (require, module, exports) {
			/* MIT license */
			var convert = require(5);
			var string = require(2);

			var Color = function Color(obj) {
				if (obj instanceof Color) {
					return obj;
				}
				if (!(this instanceof Color)) {
					return new Color(obj);
				}

				this.values = {
					rgb: [0, 0, 0],
					hsl: [0, 0, 0],
					hsv: [0, 0, 0],
					hwb: [0, 0, 0],
					cmyk: [0, 0, 0, 0],
					alpha: 1
				};

				// parse Color() argument
				var vals;
				if (typeof obj === 'string') {
					vals = string.getRgba(obj);
					if (vals) {
						this.setValues('rgb', vals);
					} else if (vals = string.getHsla(obj)) {
						this.setValues('hsl', vals);
					} else if (vals = string.getHwb(obj)) {
						this.setValues('hwb', vals);
					} else {
						throw new Error('Unable to parse color from string "' + obj + '"');
					}
				} else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object') {
					vals = obj;
					if (vals.r !== undefined || vals.red !== undefined) {
						this.setValues('rgb', vals);
					} else if (vals.l !== undefined || vals.lightness !== undefined) {
						this.setValues('hsl', vals);
					} else if (vals.v !== undefined || vals.value !== undefined) {
						this.setValues('hsv', vals);
					} else if (vals.w !== undefined || vals.whiteness !== undefined) {
						this.setValues('hwb', vals);
					} else if (vals.c !== undefined || vals.cyan !== undefined) {
						this.setValues('cmyk', vals);
					} else {
						throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
					}
				}
			};

			Color.prototype = {
				rgb: function rgb() {
					return this.setSpace('rgb', arguments);
				},
				hsl: function hsl() {
					return this.setSpace('hsl', arguments);
				},
				hsv: function hsv() {
					return this.setSpace('hsv', arguments);
				},
				hwb: function hwb() {
					return this.setSpace('hwb', arguments);
				},
				cmyk: function cmyk() {
					return this.setSpace('cmyk', arguments);
				},

				rgbArray: function rgbArray() {
					return this.values.rgb;
				},
				hslArray: function hslArray() {
					return this.values.hsl;
				},
				hsvArray: function hsvArray() {
					return this.values.hsv;
				},
				hwbArray: function hwbArray() {
					var values = this.values;
					if (values.alpha !== 1) {
						return values.hwb.concat([values.alpha]);
					}
					return values.hwb;
				},
				cmykArray: function cmykArray() {
					return this.values.cmyk;
				},
				rgbaArray: function rgbaArray() {
					var values = this.values;
					return values.rgb.concat([values.alpha]);
				},
				hslaArray: function hslaArray() {
					var values = this.values;
					return values.hsl.concat([values.alpha]);
				},
				alpha: function alpha(val) {
					if (val === undefined) {
						return this.values.alpha;
					}
					this.setValues('alpha', val);
					return this;
				},

				red: function red(val) {
					return this.setChannel('rgb', 0, val);
				},
				green: function green(val) {
					return this.setChannel('rgb', 1, val);
				},
				blue: function blue(val) {
					return this.setChannel('rgb', 2, val);
				},
				hue: function hue(val) {
					if (val) {
						val %= 360;
						val = val < 0 ? 360 + val : val;
					}
					return this.setChannel('hsl', 0, val);
				},
				saturation: function saturation(val) {
					return this.setChannel('hsl', 1, val);
				},
				lightness: function lightness(val) {
					return this.setChannel('hsl', 2, val);
				},
				saturationv: function saturationv(val) {
					return this.setChannel('hsv', 1, val);
				},
				whiteness: function whiteness(val) {
					return this.setChannel('hwb', 1, val);
				},
				blackness: function blackness(val) {
					return this.setChannel('hwb', 2, val);
				},
				value: function value(val) {
					return this.setChannel('hsv', 2, val);
				},
				cyan: function cyan(val) {
					return this.setChannel('cmyk', 0, val);
				},
				magenta: function magenta(val) {
					return this.setChannel('cmyk', 1, val);
				},
				yellow: function yellow(val) {
					return this.setChannel('cmyk', 2, val);
				},
				black: function black(val) {
					return this.setChannel('cmyk', 3, val);
				},

				hexString: function hexString() {
					return string.hexString(this.values.rgb);
				},
				rgbString: function rgbString() {
					return string.rgbString(this.values.rgb, this.values.alpha);
				},
				rgbaString: function rgbaString() {
					return string.rgbaString(this.values.rgb, this.values.alpha);
				},
				percentString: function percentString() {
					return string.percentString(this.values.rgb, this.values.alpha);
				},
				hslString: function hslString() {
					return string.hslString(this.values.hsl, this.values.alpha);
				},
				hslaString: function hslaString() {
					return string.hslaString(this.values.hsl, this.values.alpha);
				},
				hwbString: function hwbString() {
					return string.hwbString(this.values.hwb, this.values.alpha);
				},
				keyword: function keyword() {
					return string.keyword(this.values.rgb, this.values.alpha);
				},

				rgbNumber: function rgbNumber() {
					var rgb = this.values.rgb;
					return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
				},

				luminosity: function luminosity() {
					// http://www.w3.org/TR/WCAG20/#relativeluminancedef
					var rgb = this.values.rgb;
					var lum = [];
					for (var i = 0; i < rgb.length; i++) {
						var chan = rgb[i] / 255;
						lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
					}
					return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
				},

				contrast: function contrast(color2) {
					// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
					var lum1 = this.luminosity();
					var lum2 = color2.luminosity();
					if (lum1 > lum2) {
						return (lum1 + 0.05) / (lum2 + 0.05);
					}
					return (lum2 + 0.05) / (lum1 + 0.05);
				},

				level: function level(color2) {
					var contrastRatio = this.contrast(color2);
					if (contrastRatio >= 7.1) {
						return 'AAA';
					}

					return contrastRatio >= 4.5 ? 'AA' : '';
				},

				dark: function dark() {
					// YIQ equation from http://24ways.org/2010/calculating-color-contrast
					var rgb = this.values.rgb;
					var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
					return yiq < 128;
				},

				light: function light() {
					return !this.dark();
				},

				negate: function negate() {
					var rgb = [];
					for (var i = 0; i < 3; i++) {
						rgb[i] = 255 - this.values.rgb[i];
					}
					this.setValues('rgb', rgb);
					return this;
				},

				lighten: function lighten(ratio) {
					var hsl = this.values.hsl;
					hsl[2] += hsl[2] * ratio;
					this.setValues('hsl', hsl);
					return this;
				},

				darken: function darken(ratio) {
					var hsl = this.values.hsl;
					hsl[2] -= hsl[2] * ratio;
					this.setValues('hsl', hsl);
					return this;
				},

				saturate: function saturate(ratio) {
					var hsl = this.values.hsl;
					hsl[1] += hsl[1] * ratio;
					this.setValues('hsl', hsl);
					return this;
				},

				desaturate: function desaturate(ratio) {
					var hsl = this.values.hsl;
					hsl[1] -= hsl[1] * ratio;
					this.setValues('hsl', hsl);
					return this;
				},

				whiten: function whiten(ratio) {
					var hwb = this.values.hwb;
					hwb[1] += hwb[1] * ratio;
					this.setValues('hwb', hwb);
					return this;
				},

				blacken: function blacken(ratio) {
					var hwb = this.values.hwb;
					hwb[2] += hwb[2] * ratio;
					this.setValues('hwb', hwb);
					return this;
				},

				greyscale: function greyscale() {
					var rgb = this.values.rgb;
					// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
					var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
					this.setValues('rgb', [val, val, val]);
					return this;
				},

				clearer: function clearer(ratio) {
					var alpha = this.values.alpha;
					this.setValues('alpha', alpha - alpha * ratio);
					return this;
				},

				opaquer: function opaquer(ratio) {
					var alpha = this.values.alpha;
					this.setValues('alpha', alpha + alpha * ratio);
					return this;
				},

				rotate: function rotate(degrees) {
					var hsl = this.values.hsl;
					var hue = (hsl[0] + degrees) % 360;
					hsl[0] = hue < 0 ? 360 + hue : hue;
					this.setValues('hsl', hsl);
					return this;
				},

				/**
     * Ported from sass implementation in C
     * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
     */
				mix: function mix(mixinColor, weight) {
					var color1 = this;
					var color2 = mixinColor;
					var p = weight === undefined ? 0.5 : weight;

					var w = 2 * p - 1;
					var a = color1.alpha() - color2.alpha();

					var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
					var w2 = 1 - w1;

					return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
				},

				toJSON: function toJSON() {
					return this.rgb();
				},

				clone: function clone() {
					// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
					// making the final build way to big to embed in Chart.js. So let's do it manually,
					// assuming that values to clone are 1 dimension arrays containing only numbers,
					// except 'alpha' which is a number.
					var result = new Color();
					var source = this.values;
					var target = result.values;
					var value, type;

					for (var prop in source) {
						if (source.hasOwnProperty(prop)) {
							value = source[prop];
							type = {}.toString.call(value);
							if (type === '[object Array]') {
								target[prop] = value.slice(0);
							} else if (type === '[object Number]') {
								target[prop] = value;
							} else {
								console.error('unexpected color value:', value);
							}
						}
					}

					return result;
				}
			};

			Color.prototype.spaces = {
				rgb: ['red', 'green', 'blue'],
				hsl: ['hue', 'saturation', 'lightness'],
				hsv: ['hue', 'saturation', 'value'],
				hwb: ['hue', 'whiteness', 'blackness'],
				cmyk: ['cyan', 'magenta', 'yellow', 'black']
			};

			Color.prototype.maxes = {
				rgb: [255, 255, 255],
				hsl: [360, 100, 100],
				hsv: [360, 100, 100],
				hwb: [360, 100, 100],
				cmyk: [100, 100, 100, 100]
			};

			Color.prototype.getValues = function (space) {
				var values = this.values;
				var vals = {};

				for (var i = 0; i < space.length; i++) {
					vals[space.charAt(i)] = values[space][i];
				}

				if (values.alpha !== 1) {
					vals.a = values.alpha;
				}

				// {r: 255, g: 255, b: 255, a: 0.4}
				return vals;
			};

			Color.prototype.setValues = function (space, vals) {
				var values = this.values;
				var spaces = this.spaces;
				var maxes = this.maxes;
				var alpha = 1;
				var i;

				if (space === 'alpha') {
					alpha = vals;
				} else if (vals.length) {
					// [10, 10, 10]
					values[space] = vals.slice(0, space.length);
					alpha = vals[space.length];
				} else if (vals[space.charAt(0)] !== undefined) {
					// {r: 10, g: 10, b: 10}
					for (i = 0; i < space.length; i++) {
						values[space][i] = vals[space.charAt(i)];
					}

					alpha = vals.a;
				} else if (vals[spaces[space][0]] !== undefined) {
					// {red: 10, green: 10, blue: 10}
					var chans = spaces[space];

					for (i = 0; i < space.length; i++) {
						values[space][i] = vals[chans[i]];
					}

					alpha = vals.alpha;
				}

				values.alpha = Math.max(0, Math.min(1, alpha === undefined ? values.alpha : alpha));

				if (space === 'alpha') {
					return false;
				}

				var capped;

				// cap values of the space prior converting all values
				for (i = 0; i < space.length; i++) {
					capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
					values[space][i] = Math.round(capped);
				}

				// convert to all the other color spaces
				for (var sname in spaces) {
					if (sname !== space) {
						values[sname] = convert[space][sname](values[space]);
					}
				}

				return true;
			};

			Color.prototype.setSpace = function (space, args) {
				var vals = args[0];

				if (vals === undefined) {
					// color.rgb()
					return this.getValues(space);
				}

				// color.rgb(10, 10, 10)
				if (typeof vals === 'number') {
					vals = Array.prototype.slice.call(args);
				}

				this.setValues(space, vals);
				return this;
			};

			Color.prototype.setChannel = function (space, index, val) {
				var svalues = this.values[space];
				if (val === undefined) {
					// color.red()
					return svalues[index];
				} else if (val === svalues[index]) {
					// color.red(color.red())
					return this;
				}

				// color.red(100)
				svalues[index] = val;
				this.setValues(space, svalues);

				return this;
			};

			if (typeof window !== 'undefined') {
				window.Color = Color;
			}

			module.exports = Color;
		}, { "2": 2, "5": 5 }], 4: [function (require, module, exports) {
			/* MIT license */

			module.exports = {
				rgb2hsl: rgb2hsl,
				rgb2hsv: rgb2hsv,
				rgb2hwb: rgb2hwb,
				rgb2cmyk: rgb2cmyk,
				rgb2keyword: rgb2keyword,
				rgb2xyz: rgb2xyz,
				rgb2lab: rgb2lab,
				rgb2lch: rgb2lch,

				hsl2rgb: hsl2rgb,
				hsl2hsv: hsl2hsv,
				hsl2hwb: hsl2hwb,
				hsl2cmyk: hsl2cmyk,
				hsl2keyword: hsl2keyword,

				hsv2rgb: hsv2rgb,
				hsv2hsl: hsv2hsl,
				hsv2hwb: hsv2hwb,
				hsv2cmyk: hsv2cmyk,
				hsv2keyword: hsv2keyword,

				hwb2rgb: hwb2rgb,
				hwb2hsl: hwb2hsl,
				hwb2hsv: hwb2hsv,
				hwb2cmyk: hwb2cmyk,
				hwb2keyword: hwb2keyword,

				cmyk2rgb: cmyk2rgb,
				cmyk2hsl: cmyk2hsl,
				cmyk2hsv: cmyk2hsv,
				cmyk2hwb: cmyk2hwb,
				cmyk2keyword: cmyk2keyword,

				keyword2rgb: keyword2rgb,
				keyword2hsl: keyword2hsl,
				keyword2hsv: keyword2hsv,
				keyword2hwb: keyword2hwb,
				keyword2cmyk: keyword2cmyk,
				keyword2lab: keyword2lab,
				keyword2xyz: keyword2xyz,

				xyz2rgb: xyz2rgb,
				xyz2lab: xyz2lab,
				xyz2lch: xyz2lch,

				lab2xyz: lab2xyz,
				lab2rgb: lab2rgb,
				lab2lch: lab2lch,

				lch2lab: lch2lab,
				lch2xyz: lch2xyz,
				lch2rgb: lch2rgb
			};

			function rgb2hsl(rgb) {
				var r = rgb[0] / 255,
				    g = rgb[1] / 255,
				    b = rgb[2] / 255,
				    min = Math.min(r, g, b),
				    max = Math.max(r, g, b),
				    delta = max - min,
				    h,
				    s,
				    l;

				if (max == min) h = 0;else if (r == max) h = (g - b) / delta;else if (g == max) h = 2 + (b - r) / delta;else if (b == max) h = 4 + (r - g) / delta;

				h = Math.min(h * 60, 360);

				if (h < 0) h += 360;

				l = (min + max) / 2;

				if (max == min) s = 0;else if (l <= 0.5) s = delta / (max + min);else s = delta / (2 - max - min);

				return [h, s * 100, l * 100];
			}

			function rgb2hsv(rgb) {
				var r = rgb[0],
				    g = rgb[1],
				    b = rgb[2],
				    min = Math.min(r, g, b),
				    max = Math.max(r, g, b),
				    delta = max - min,
				    h,
				    s,
				    v;

				if (max == 0) s = 0;else s = delta / max * 1000 / 10;

				if (max == min) h = 0;else if (r == max) h = (g - b) / delta;else if (g == max) h = 2 + (b - r) / delta;else if (b == max) h = 4 + (r - g) / delta;

				h = Math.min(h * 60, 360);

				if (h < 0) h += 360;

				v = max / 255 * 1000 / 10;

				return [h, s, v];
			}

			function rgb2hwb(rgb) {
				var r = rgb[0],
				    g = rgb[1],
				    b = rgb[2],
				    h = rgb2hsl(rgb)[0],
				    w = 1 / 255 * Math.min(r, Math.min(g, b)),
				    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

				return [h, w * 100, b * 100];
			}

			function rgb2cmyk(rgb) {
				var r = rgb[0] / 255,
				    g = rgb[1] / 255,
				    b = rgb[2] / 255,
				    c,
				    m,
				    y,
				    k;

				k = Math.min(1 - r, 1 - g, 1 - b);
				c = (1 - r - k) / (1 - k) || 0;
				m = (1 - g - k) / (1 - k) || 0;
				y = (1 - b - k) / (1 - k) || 0;
				return [c * 100, m * 100, y * 100, k * 100];
			}

			function rgb2keyword(rgb) {
				return reverseKeywords[JSON.stringify(rgb)];
			}

			function rgb2xyz(rgb) {
				var r = rgb[0] / 255,
				    g = rgb[1] / 255,
				    b = rgb[2] / 255;

				// assume sRGB
				r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
				g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
				b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

				var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
				var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
				var z = r * 0.0193 + g * 0.1192 + b * 0.9505;

				return [x * 100, y * 100, z * 100];
			}

			function rgb2lab(rgb) {
				var xyz = rgb2xyz(rgb),
				    x = xyz[0],
				    y = xyz[1],
				    z = xyz[2],
				    l,
				    a,
				    b;

				x /= 95.047;
				y /= 100;
				z /= 108.883;

				x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
				y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
				z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

				l = 116 * y - 16;
				a = 500 * (x - y);
				b = 200 * (y - z);

				return [l, a, b];
			}

			function rgb2lch(args) {
				return lab2lch(rgb2lab(args));
			}

			function hsl2rgb(hsl) {
				var h = hsl[0] / 360,
				    s = hsl[1] / 100,
				    l = hsl[2] / 100,
				    t1,
				    t2,
				    t3,
				    rgb,
				    val;

				if (s == 0) {
					val = l * 255;
					return [val, val, val];
				}

				if (l < 0.5) t2 = l * (1 + s);else t2 = l + s - l * s;
				t1 = 2 * l - t2;

				rgb = [0, 0, 0];
				for (var i = 0; i < 3; i++) {
					t3 = h + 1 / 3 * -(i - 1);
					t3 < 0 && t3++;
					t3 > 1 && t3--;

					if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;else if (2 * t3 < 1) val = t2;else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;else val = t1;

					rgb[i] = val * 255;
				}

				return rgb;
			}

			function hsl2hsv(hsl) {
				var h = hsl[0],
				    s = hsl[1] / 100,
				    l = hsl[2] / 100,
				    sv,
				    v;

				if (l === 0) {
					// no need to do calc on black
					// also avoids divide by 0 error
					return [0, 0, 0];
				}

				l *= 2;
				s *= l <= 1 ? l : 2 - l;
				v = (l + s) / 2;
				sv = 2 * s / (l + s);
				return [h, sv * 100, v * 100];
			}

			function hsl2hwb(args) {
				return rgb2hwb(hsl2rgb(args));
			}

			function hsl2cmyk(args) {
				return rgb2cmyk(hsl2rgb(args));
			}

			function hsl2keyword(args) {
				return rgb2keyword(hsl2rgb(args));
			}

			function hsv2rgb(hsv) {
				var h = hsv[0] / 60,
				    s = hsv[1] / 100,
				    v = hsv[2] / 100,
				    hi = Math.floor(h) % 6;

				var f = h - Math.floor(h),
				    p = 255 * v * (1 - s),
				    q = 255 * v * (1 - s * f),
				    t = 255 * v * (1 - s * (1 - f)),
				    v = 255 * v;

				switch (hi) {
					case 0:
						return [v, t, p];
					case 1:
						return [q, v, p];
					case 2:
						return [p, v, t];
					case 3:
						return [p, q, v];
					case 4:
						return [t, p, v];
					case 5:
						return [v, p, q];
				}
			}

			function hsv2hsl(hsv) {
				var h = hsv[0],
				    s = hsv[1] / 100,
				    v = hsv[2] / 100,
				    sl,
				    l;

				l = (2 - s) * v;
				sl = s * v;
				sl /= l <= 1 ? l : 2 - l;
				sl = sl || 0;
				l /= 2;
				return [h, sl * 100, l * 100];
			}

			function hsv2hwb(args) {
				return rgb2hwb(hsv2rgb(args));
			}

			function hsv2cmyk(args) {
				return rgb2cmyk(hsv2rgb(args));
			}

			function hsv2keyword(args) {
				return rgb2keyword(hsv2rgb(args));
			}

			// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
			function hwb2rgb(hwb) {
				var h = hwb[0] / 360,
				    wh = hwb[1] / 100,
				    bl = hwb[2] / 100,
				    ratio = wh + bl,
				    i,
				    v,
				    f,
				    n;

				// wh + bl cant be > 1
				if (ratio > 1) {
					wh /= ratio;
					bl /= ratio;
				}

				i = Math.floor(6 * h);
				v = 1 - bl;
				f = 6 * h - i;
				if ((i & 0x01) != 0) {
					f = 1 - f;
				}
				n = wh + f * (v - wh); // linear interpolation

				switch (i) {
					default:
					case 6:
					case 0:
						r = v;g = n;b = wh;break;
					case 1:
						r = n;g = v;b = wh;break;
					case 2:
						r = wh;g = v;b = n;break;
					case 3:
						r = wh;g = n;b = v;break;
					case 4:
						r = n;g = wh;b = v;break;
					case 5:
						r = v;g = wh;b = n;break;
				}

				return [r * 255, g * 255, b * 255];
			}

			function hwb2hsl(args) {
				return rgb2hsl(hwb2rgb(args));
			}

			function hwb2hsv(args) {
				return rgb2hsv(hwb2rgb(args));
			}

			function hwb2cmyk(args) {
				return rgb2cmyk(hwb2rgb(args));
			}

			function hwb2keyword(args) {
				return rgb2keyword(hwb2rgb(args));
			}

			function cmyk2rgb(cmyk) {
				var c = cmyk[0] / 100,
				    m = cmyk[1] / 100,
				    y = cmyk[2] / 100,
				    k = cmyk[3] / 100,
				    r,
				    g,
				    b;

				r = 1 - Math.min(1, c * (1 - k) + k);
				g = 1 - Math.min(1, m * (1 - k) + k);
				b = 1 - Math.min(1, y * (1 - k) + k);
				return [r * 255, g * 255, b * 255];
			}

			function cmyk2hsl(args) {
				return rgb2hsl(cmyk2rgb(args));
			}

			function cmyk2hsv(args) {
				return rgb2hsv(cmyk2rgb(args));
			}

			function cmyk2hwb(args) {
				return rgb2hwb(cmyk2rgb(args));
			}

			function cmyk2keyword(args) {
				return rgb2keyword(cmyk2rgb(args));
			}

			function xyz2rgb(xyz) {
				var x = xyz[0] / 100,
				    y = xyz[1] / 100,
				    z = xyz[2] / 100,
				    r,
				    g,
				    b;

				r = x * 3.2406 + y * -1.5372 + z * -0.4986;
				g = x * -0.9689 + y * 1.8758 + z * 0.0415;
				b = x * 0.0557 + y * -0.2040 + z * 1.0570;

				// assume sRGB
				r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r = r * 12.92;

				g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g = g * 12.92;

				b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b = b * 12.92;

				r = Math.min(Math.max(0, r), 1);
				g = Math.min(Math.max(0, g), 1);
				b = Math.min(Math.max(0, b), 1);

				return [r * 255, g * 255, b * 255];
			}

			function xyz2lab(xyz) {
				var x = xyz[0],
				    y = xyz[1],
				    z = xyz[2],
				    l,
				    a,
				    b;

				x /= 95.047;
				y /= 100;
				z /= 108.883;

				x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
				y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
				z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

				l = 116 * y - 16;
				a = 500 * (x - y);
				b = 200 * (y - z);

				return [l, a, b];
			}

			function xyz2lch(args) {
				return lab2lch(xyz2lab(args));
			}

			function lab2xyz(lab) {
				var l = lab[0],
				    a = lab[1],
				    b = lab[2],
				    x,
				    y,
				    z,
				    y2;

				if (l <= 8) {
					y = l * 100 / 903.3;
					y2 = 7.787 * (y / 100) + 16 / 116;
				} else {
					y = 100 * Math.pow((l + 16) / 116, 3);
					y2 = Math.pow(y / 100, 1 / 3);
				}

				x = x / 95.047 <= 0.008856 ? x = 95.047 * (a / 500 + y2 - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + y2, 3);

				z = z / 108.883 <= 0.008859 ? z = 108.883 * (y2 - b / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(y2 - b / 200, 3);

				return [x, y, z];
			}

			function lab2lch(lab) {
				var l = lab[0],
				    a = lab[1],
				    b = lab[2],
				    hr,
				    h,
				    c;

				hr = Math.atan2(b, a);
				h = hr * 360 / 2 / Math.PI;
				if (h < 0) {
					h += 360;
				}
				c = Math.sqrt(a * a + b * b);
				return [l, c, h];
			}

			function lab2rgb(args) {
				return xyz2rgb(lab2xyz(args));
			}

			function lch2lab(lch) {
				var l = lch[0],
				    c = lch[1],
				    h = lch[2],
				    a,
				    b,
				    hr;

				hr = h / 360 * 2 * Math.PI;
				a = c * Math.cos(hr);
				b = c * Math.sin(hr);
				return [l, a, b];
			}

			function lch2xyz(args) {
				return lab2xyz(lch2lab(args));
			}

			function lch2rgb(args) {
				return lab2rgb(lch2lab(args));
			}

			function keyword2rgb(keyword) {
				return cssKeywords[keyword];
			}

			function keyword2hsl(args) {
				return rgb2hsl(keyword2rgb(args));
			}

			function keyword2hsv(args) {
				return rgb2hsv(keyword2rgb(args));
			}

			function keyword2hwb(args) {
				return rgb2hwb(keyword2rgb(args));
			}

			function keyword2cmyk(args) {
				return rgb2cmyk(keyword2rgb(args));
			}

			function keyword2lab(args) {
				return rgb2lab(keyword2rgb(args));
			}

			function keyword2xyz(args) {
				return rgb2xyz(keyword2rgb(args));
			}

			var cssKeywords = {
				aliceblue: [240, 248, 255],
				antiquewhite: [250, 235, 215],
				aqua: [0, 255, 255],
				aquamarine: [127, 255, 212],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				bisque: [255, 228, 196],
				black: [0, 0, 0],
				blanchedalmond: [255, 235, 205],
				blue: [0, 0, 255],
				blueviolet: [138, 43, 226],
				brown: [165, 42, 42],
				burlywood: [222, 184, 135],
				cadetblue: [95, 158, 160],
				chartreuse: [127, 255, 0],
				chocolate: [210, 105, 30],
				coral: [255, 127, 80],
				cornflowerblue: [100, 149, 237],
				cornsilk: [255, 248, 220],
				crimson: [220, 20, 60],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgoldenrod: [184, 134, 11],
				darkgray: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkgrey: [169, 169, 169],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkseagreen: [143, 188, 143],
				darkslateblue: [72, 61, 139],
				darkslategray: [47, 79, 79],
				darkslategrey: [47, 79, 79],
				darkturquoise: [0, 206, 209],
				darkviolet: [148, 0, 211],
				deeppink: [255, 20, 147],
				deepskyblue: [0, 191, 255],
				dimgray: [105, 105, 105],
				dimgrey: [105, 105, 105],
				dodgerblue: [30, 144, 255],
				firebrick: [178, 34, 34],
				floralwhite: [255, 250, 240],
				forestgreen: [34, 139, 34],
				fuchsia: [255, 0, 255],
				gainsboro: [220, 220, 220],
				ghostwhite: [248, 248, 255],
				gold: [255, 215, 0],
				goldenrod: [218, 165, 32],
				gray: [128, 128, 128],
				green: [0, 128, 0],
				greenyellow: [173, 255, 47],
				grey: [128, 128, 128],
				honeydew: [240, 255, 240],
				hotpink: [255, 105, 180],
				indianred: [205, 92, 92],
				indigo: [75, 0, 130],
				ivory: [255, 255, 240],
				khaki: [240, 230, 140],
				lavender: [230, 230, 250],
				lavenderblush: [255, 240, 245],
				lawngreen: [124, 252, 0],
				lemonchiffon: [255, 250, 205],
				lightblue: [173, 216, 230],
				lightcoral: [240, 128, 128],
				lightcyan: [224, 255, 255],
				lightgoldenrodyellow: [250, 250, 210],
				lightgray: [211, 211, 211],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightsalmon: [255, 160, 122],
				lightseagreen: [32, 178, 170],
				lightskyblue: [135, 206, 250],
				lightslategray: [119, 136, 153],
				lightslategrey: [119, 136, 153],
				lightsteelblue: [176, 196, 222],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				limegreen: [50, 205, 50],
				linen: [250, 240, 230],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				mediumaquamarine: [102, 205, 170],
				mediumblue: [0, 0, 205],
				mediumorchid: [186, 85, 211],
				mediumpurple: [147, 112, 219],
				mediumseagreen: [60, 179, 113],
				mediumslateblue: [123, 104, 238],
				mediumspringgreen: [0, 250, 154],
				mediumturquoise: [72, 209, 204],
				mediumvioletred: [199, 21, 133],
				midnightblue: [25, 25, 112],
				mintcream: [245, 255, 250],
				mistyrose: [255, 228, 225],
				moccasin: [255, 228, 181],
				navajowhite: [255, 222, 173],
				navy: [0, 0, 128],
				oldlace: [253, 245, 230],
				olive: [128, 128, 0],
				olivedrab: [107, 142, 35],
				orange: [255, 165, 0],
				orangered: [255, 69, 0],
				orchid: [218, 112, 214],
				palegoldenrod: [238, 232, 170],
				palegreen: [152, 251, 152],
				paleturquoise: [175, 238, 238],
				palevioletred: [219, 112, 147],
				papayawhip: [255, 239, 213],
				peachpuff: [255, 218, 185],
				peru: [205, 133, 63],
				pink: [255, 192, 203],
				plum: [221, 160, 221],
				powderblue: [176, 224, 230],
				purple: [128, 0, 128],
				rebeccapurple: [102, 51, 153],
				red: [255, 0, 0],
				rosybrown: [188, 143, 143],
				royalblue: [65, 105, 225],
				saddlebrown: [139, 69, 19],
				salmon: [250, 128, 114],
				sandybrown: [244, 164, 96],
				seagreen: [46, 139, 87],
				seashell: [255, 245, 238],
				sienna: [160, 82, 45],
				silver: [192, 192, 192],
				skyblue: [135, 206, 235],
				slateblue: [106, 90, 205],
				slategray: [112, 128, 144],
				slategrey: [112, 128, 144],
				snow: [255, 250, 250],
				springgreen: [0, 255, 127],
				steelblue: [70, 130, 180],
				tan: [210, 180, 140],
				teal: [0, 128, 128],
				thistle: [216, 191, 216],
				tomato: [255, 99, 71],
				turquoise: [64, 224, 208],
				violet: [238, 130, 238],
				wheat: [245, 222, 179],
				white: [255, 255, 255],
				whitesmoke: [245, 245, 245],
				yellow: [255, 255, 0],
				yellowgreen: [154, 205, 50]
			};

			var reverseKeywords = {};
			for (var key in cssKeywords) {
				reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
			}
		}, {}], 5: [function (require, module, exports) {
			var conversions = require(4);

			var convert = function convert() {
				return new Converter();
			};

			for (var func in conversions) {
				// export Raw versions
				convert[func + "Raw"] = function (func) {
					// accept array or plain args
					return function (arg) {
						if (typeof arg == "number") arg = Array.prototype.slice.call(arguments);
						return conversions[func](arg);
					};
				}(func);

				var pair = /(\w+)2(\w+)/.exec(func),
				    from = pair[1],
				    to = pair[2];

				// export rgb2hsl and ["rgb"]["hsl"]
				convert[from] = convert[from] || {};

				convert[from][to] = convert[func] = function (func) {
					return function (arg) {
						if (typeof arg == "number") arg = Array.prototype.slice.call(arguments);

						var val = conversions[func](arg);
						if (typeof val == "string" || val === undefined) return val; // keyword

						for (var i = 0; i < val.length; i++) {
							val[i] = Math.round(val[i]);
						}return val;
					};
				}(func);
			}

			/* Converter does lazy conversion and caching */
			var Converter = function Converter() {
				this.convs = {};
			};

			/* Either get the values for a space or
     set the values for a space, depending on args */
			Converter.prototype.routeSpace = function (space, args) {
				var values = args[0];
				if (values === undefined) {
					// color.rgb()
					return this.getValues(space);
				}
				// color.rgb(10, 10, 10)
				if (typeof values == "number") {
					values = Array.prototype.slice.call(args);
				}

				return this.setValues(space, values);
			};

			/* Set the values for a space, invalidating cache */
			Converter.prototype.setValues = function (space, values) {
				this.space = space;
				this.convs = {};
				this.convs[space] = values;
				return this;
			};

			/* Get the values for a space. If there's already
     a conversion for the space, fetch it, otherwise
     compute it */
			Converter.prototype.getValues = function (space) {
				var vals = this.convs[space];
				if (!vals) {
					var fspace = this.space,
					    from = this.convs[fspace];
					vals = convert[fspace][space](from);

					this.convs[space] = vals;
				}
				return vals;
			};

			["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (space) {
				Converter.prototype[space] = function (vals) {
					return this.routeSpace(space, arguments);
				};
			});

			module.exports = convert;
		}, { "4": 4 }], 6: [function (require, module, exports) {
			module.exports = {
				"aliceblue": [240, 248, 255],
				"antiquewhite": [250, 235, 215],
				"aqua": [0, 255, 255],
				"aquamarine": [127, 255, 212],
				"azure": [240, 255, 255],
				"beige": [245, 245, 220],
				"bisque": [255, 228, 196],
				"black": [0, 0, 0],
				"blanchedalmond": [255, 235, 205],
				"blue": [0, 0, 255],
				"blueviolet": [138, 43, 226],
				"brown": [165, 42, 42],
				"burlywood": [222, 184, 135],
				"cadetblue": [95, 158, 160],
				"chartreuse": [127, 255, 0],
				"chocolate": [210, 105, 30],
				"coral": [255, 127, 80],
				"cornflowerblue": [100, 149, 237],
				"cornsilk": [255, 248, 220],
				"crimson": [220, 20, 60],
				"cyan": [0, 255, 255],
				"darkblue": [0, 0, 139],
				"darkcyan": [0, 139, 139],
				"darkgoldenrod": [184, 134, 11],
				"darkgray": [169, 169, 169],
				"darkgreen": [0, 100, 0],
				"darkgrey": [169, 169, 169],
				"darkkhaki": [189, 183, 107],
				"darkmagenta": [139, 0, 139],
				"darkolivegreen": [85, 107, 47],
				"darkorange": [255, 140, 0],
				"darkorchid": [153, 50, 204],
				"darkred": [139, 0, 0],
				"darksalmon": [233, 150, 122],
				"darkseagreen": [143, 188, 143],
				"darkslateblue": [72, 61, 139],
				"darkslategray": [47, 79, 79],
				"darkslategrey": [47, 79, 79],
				"darkturquoise": [0, 206, 209],
				"darkviolet": [148, 0, 211],
				"deeppink": [255, 20, 147],
				"deepskyblue": [0, 191, 255],
				"dimgray": [105, 105, 105],
				"dimgrey": [105, 105, 105],
				"dodgerblue": [30, 144, 255],
				"firebrick": [178, 34, 34],
				"floralwhite": [255, 250, 240],
				"forestgreen": [34, 139, 34],
				"fuchsia": [255, 0, 255],
				"gainsboro": [220, 220, 220],
				"ghostwhite": [248, 248, 255],
				"gold": [255, 215, 0],
				"goldenrod": [218, 165, 32],
				"gray": [128, 128, 128],
				"green": [0, 128, 0],
				"greenyellow": [173, 255, 47],
				"grey": [128, 128, 128],
				"honeydew": [240, 255, 240],
				"hotpink": [255, 105, 180],
				"indianred": [205, 92, 92],
				"indigo": [75, 0, 130],
				"ivory": [255, 255, 240],
				"khaki": [240, 230, 140],
				"lavender": [230, 230, 250],
				"lavenderblush": [255, 240, 245],
				"lawngreen": [124, 252, 0],
				"lemonchiffon": [255, 250, 205],
				"lightblue": [173, 216, 230],
				"lightcoral": [240, 128, 128],
				"lightcyan": [224, 255, 255],
				"lightgoldenrodyellow": [250, 250, 210],
				"lightgray": [211, 211, 211],
				"lightgreen": [144, 238, 144],
				"lightgrey": [211, 211, 211],
				"lightpink": [255, 182, 193],
				"lightsalmon": [255, 160, 122],
				"lightseagreen": [32, 178, 170],
				"lightskyblue": [135, 206, 250],
				"lightslategray": [119, 136, 153],
				"lightslategrey": [119, 136, 153],
				"lightsteelblue": [176, 196, 222],
				"lightyellow": [255, 255, 224],
				"lime": [0, 255, 0],
				"limegreen": [50, 205, 50],
				"linen": [250, 240, 230],
				"magenta": [255, 0, 255],
				"maroon": [128, 0, 0],
				"mediumaquamarine": [102, 205, 170],
				"mediumblue": [0, 0, 205],
				"mediumorchid": [186, 85, 211],
				"mediumpurple": [147, 112, 219],
				"mediumseagreen": [60, 179, 113],
				"mediumslateblue": [123, 104, 238],
				"mediumspringgreen": [0, 250, 154],
				"mediumturquoise": [72, 209, 204],
				"mediumvioletred": [199, 21, 133],
				"midnightblue": [25, 25, 112],
				"mintcream": [245, 255, 250],
				"mistyrose": [255, 228, 225],
				"moccasin": [255, 228, 181],
				"navajowhite": [255, 222, 173],
				"navy": [0, 0, 128],
				"oldlace": [253, 245, 230],
				"olive": [128, 128, 0],
				"olivedrab": [107, 142, 35],
				"orange": [255, 165, 0],
				"orangered": [255, 69, 0],
				"orchid": [218, 112, 214],
				"palegoldenrod": [238, 232, 170],
				"palegreen": [152, 251, 152],
				"paleturquoise": [175, 238, 238],
				"palevioletred": [219, 112, 147],
				"papayawhip": [255, 239, 213],
				"peachpuff": [255, 218, 185],
				"peru": [205, 133, 63],
				"pink": [255, 192, 203],
				"plum": [221, 160, 221],
				"powderblue": [176, 224, 230],
				"purple": [128, 0, 128],
				"rebeccapurple": [102, 51, 153],
				"red": [255, 0, 0],
				"rosybrown": [188, 143, 143],
				"royalblue": [65, 105, 225],
				"saddlebrown": [139, 69, 19],
				"salmon": [250, 128, 114],
				"sandybrown": [244, 164, 96],
				"seagreen": [46, 139, 87],
				"seashell": [255, 245, 238],
				"sienna": [160, 82, 45],
				"silver": [192, 192, 192],
				"skyblue": [135, 206, 235],
				"slateblue": [106, 90, 205],
				"slategray": [112, 128, 144],
				"slategrey": [112, 128, 144],
				"snow": [255, 250, 250],
				"springgreen": [0, 255, 127],
				"steelblue": [70, 130, 180],
				"tan": [210, 180, 140],
				"teal": [0, 128, 128],
				"thistle": [216, 191, 216],
				"tomato": [255, 99, 71],
				"turquoise": [64, 224, 208],
				"violet": [238, 130, 238],
				"wheat": [245, 222, 179],
				"white": [255, 255, 255],
				"whitesmoke": [245, 245, 245],
				"yellow": [255, 255, 0],
				"yellowgreen": [154, 205, 50]
			};
		}, {}], 7: [function (require, module, exports) {
			/**
    * @namespace Chart
    */
			var Chart = require(28)();

			require(26)(Chart);
			require(42)(Chart);
			require(22)(Chart);
			require(31)(Chart);
			require(25)(Chart);
			require(21)(Chart);
			require(23)(Chart);
			require(24)(Chart);
			require(29)(Chart);
			require(33)(Chart);
			require(34)(Chart);
			require(32)(Chart);
			require(35)(Chart);
			require(30)(Chart);
			require(27)(Chart);
			require(36)(Chart);

			require(37)(Chart);
			require(38)(Chart);
			require(39)(Chart);
			require(40)(Chart);

			require(45)(Chart);
			require(43)(Chart);
			require(44)(Chart);
			require(46)(Chart);
			require(47)(Chart);
			require(48)(Chart);

			// Controllers must be loaded after elements
			// See Chart.core.datasetController.dataElementType
			require(15)(Chart);
			require(16)(Chart);
			require(17)(Chart);
			require(18)(Chart);
			require(19)(Chart);
			require(20)(Chart);

			require(8)(Chart);
			require(9)(Chart);
			require(10)(Chart);
			require(11)(Chart);
			require(12)(Chart);
			require(13)(Chart);
			require(14)(Chart);

			window.Chart = module.exports = Chart;
		}, { "10": 10, "11": 11, "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "17": 17, "18": 18, "19": 19, "20": 20, "21": 21, "22": 22, "23": 23, "24": 24, "25": 25, "26": 26, "27": 27, "28": 28, "29": 29, "30": 30, "31": 31, "32": 32, "33": 33, "34": 34, "35": 35, "36": 36, "37": 37, "38": 38, "39": 39, "40": 40, "42": 42, "43": 43, "44": 44, "45": 45, "46": 46, "47": 47, "48": 48, "8": 8, "9": 9 }], 8: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.Bar = function (context, config) {
					config.type = 'bar';

					return new Chart(context, config);
				};
			};
		}, {}], 9: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.Bubble = function (context, config) {
					config.type = 'bubble';
					return new Chart(context, config);
				};
			};
		}, {}], 10: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.Doughnut = function (context, config) {
					config.type = 'doughnut';

					return new Chart(context, config);
				};
			};
		}, {}], 11: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.Line = function (context, config) {
					config.type = 'line';

					return new Chart(context, config);
				};
			};
		}, {}], 12: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.PolarArea = function (context, config) {
					config.type = 'polarArea';

					return new Chart(context, config);
				};
			};
		}, {}], 13: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				Chart.Radar = function (context, config) {
					config.type = 'radar';

					return new Chart(context, config);
				};
			};
		}, {}], 14: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var defaultConfig = {
					hover: {
						mode: 'single'
					},

					scales: {
						xAxes: [{
							type: 'linear', // scatter should not use a category axis
							position: 'bottom',
							id: 'x-axis-1' // need an ID so datasets can reference the scale
						}],
						yAxes: [{
							type: 'linear',
							position: 'left',
							id: 'y-axis-1'
						}]
					},

					tooltips: {
						callbacks: {
							title: function title() {
								// Title doesn't make sense for scatter since we format the data as a point
								return '';
							},
							label: function label(tooltipItem) {
								return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
							}
						}
					}
				};

				// Register the default config for this type
				Chart.defaults.scatter = defaultConfig;

				// Scatter charts use line controllers
				Chart.controllers.scatter = Chart.controllers.line;

				Chart.Scatter = function (context, config) {
					config.type = 'scatter';
					return new Chart(context, config);
				};
			};
		}, {}], 15: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.bar = {
					hover: {
						mode: 'label'
					},

					scales: {
						xAxes: [{
							type: 'category',

							// Specific to Bar Controller
							categoryPercentage: 0.8,
							barPercentage: 0.9,

							// grid line settings
							gridLines: {
								offsetGridLines: true
							}
						}],
						yAxes: [{
							type: 'linear'
						}]
					}
				};

				Chart.controllers.bar = Chart.DatasetController.extend({

					dataElementType: Chart.elements.Rectangle,

					initialize: function initialize(chart, datasetIndex) {
						Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);

						var me = this;
						var meta = me.getMeta();
						var dataset = me.getDataset();

						meta.stack = dataset.stack;
						// Use this to indicate that this is a bar dataset.
						meta.bar = true;
					},

					// Correctly calculate the bar width accounting for stacks and the fact that not all bars are visible
					getStackCount: function getStackCount() {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);

						var stacks = [];
						helpers.each(me.chart.data.datasets, function (dataset, datasetIndex) {
							var dsMeta = me.chart.getDatasetMeta(datasetIndex);
							if (dsMeta.bar && me.chart.isDatasetVisible(datasetIndex) && (yScale.options.stacked === false || yScale.options.stacked === true && stacks.indexOf(dsMeta.stack) === -1 || yScale.options.stacked === undefined && (dsMeta.stack === undefined || stacks.indexOf(dsMeta.stack) === -1))) {
								stacks.push(dsMeta.stack);
							}
						}, me);

						return stacks.length;
					},

					update: function update(reset) {
						var me = this;
						helpers.each(me.getMeta().data, function (rectangle, index) {
							me.updateElement(rectangle, index, reset);
						}, me);
					},

					updateElement: function updateElement(rectangle, index, reset) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var yScale = me.getScaleForId(meta.yAxisID);
						var scaleBase = yScale.getBasePixel();
						var rectangleElementOptions = me.chart.options.elements.rectangle;
						var custom = rectangle.custom || {};
						var dataset = me.getDataset();

						rectangle._xScale = xScale;
						rectangle._yScale = yScale;
						rectangle._datasetIndex = me.index;
						rectangle._index = index;

						var ruler = me.getRuler(index); // The index argument for compatible
						rectangle._model = {
							x: me.calculateBarX(index, me.index, ruler),
							y: reset ? scaleBase : me.calculateBarY(index, me.index),

							// Tooltip
							label: me.chart.data.labels[index],
							datasetLabel: dataset.label,

							// Appearance
							horizontal: false,
							base: reset ? scaleBase : me.calculateBarBase(me.index, index),
							width: me.calculateBarWidth(ruler),
							backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
							borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
							borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
							borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
						};

						rectangle.pivot();
					},

					calculateBarBase: function calculateBarBase(datasetIndex, index) {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						var base = yScale.getBaseValue();
						var original = base;

						if (yScale.options.stacked === true || yScale.options.stacked === undefined && meta.stack !== undefined) {
							var chart = me.chart;
							var datasets = chart.data.datasets;
							var value = Number(datasets[datasetIndex].data[index]);

							for (var i = 0; i < datasetIndex; i++) {
								var currentDs = datasets[i];
								var currentDsMeta = chart.getDatasetMeta(i);
								if (currentDsMeta.bar && currentDsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i) && meta.stack === currentDsMeta.stack) {
									var currentVal = Number(currentDs.data[index]);
									base += value < 0 ? Math.min(currentVal, original) : Math.max(currentVal, original);
								}
							}

							return yScale.getPixelForValue(base);
						}

						return yScale.getBasePixel();
					},

					getRuler: function getRuler() {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var stackCount = me.getStackCount();

						var tickWidth = xScale.width / xScale.ticks.length;
						var categoryWidth = tickWidth * xScale.options.categoryPercentage;
						var categorySpacing = (tickWidth - tickWidth * xScale.options.categoryPercentage) / 2;
						var fullBarWidth = categoryWidth / stackCount;

						var barWidth = fullBarWidth * xScale.options.barPercentage;
						var barSpacing = fullBarWidth - fullBarWidth * xScale.options.barPercentage;

						return {
							stackCount: stackCount,
							tickWidth: tickWidth,
							categoryWidth: categoryWidth,
							categorySpacing: categorySpacing,
							fullBarWidth: fullBarWidth,
							barWidth: barWidth,
							barSpacing: barSpacing
						};
					},

					calculateBarWidth: function calculateBarWidth(ruler) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						if (xScale.options.barThickness) {
							return xScale.options.barThickness;
						}
						return ruler.barWidth;
					},

					// Get stack index from the given dataset index accounting for stacks and the fact that not all bars are visible
					getStackIndex: function getStackIndex(datasetIndex) {
						var me = this;
						var meta = me.chart.getDatasetMeta(datasetIndex);
						var yScale = me.getScaleForId(meta.yAxisID);
						var dsMeta, j;
						var stacks = [meta.stack];

						for (j = 0; j < datasetIndex; ++j) {
							dsMeta = this.chart.getDatasetMeta(j);
							if (dsMeta.bar && this.chart.isDatasetVisible(j) && (yScale.options.stacked === false || yScale.options.stacked === true && stacks.indexOf(dsMeta.stack) === -1 || yScale.options.stacked === undefined && (dsMeta.stack === undefined || stacks.indexOf(dsMeta.stack) === -1))) {
								stacks.push(dsMeta.stack);
							}
						}

						return stacks.length - 1;
					},

					calculateBarX: function calculateBarX(index, datasetIndex, ruler) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var stackIndex = me.getStackIndex(datasetIndex);
						var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
						leftTick -= me.chart.isCombo ? ruler.tickWidth / 2 : 0;

						return leftTick + ruler.barWidth / 2 + ruler.categorySpacing + ruler.barWidth * stackIndex + ruler.barSpacing / 2 + ruler.barSpacing * stackIndex;
					},

					calculateBarY: function calculateBarY(index, datasetIndex) {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						var value = Number(me.getDataset().data[index]);

						if (yScale.options.stacked || yScale.options.stacked === undefined && meta.stack !== undefined) {
							var base = yScale.getBaseValue();
							var sumPos = base,
							    sumNeg = base;

							for (var i = 0; i < datasetIndex; i++) {
								var ds = me.chart.data.datasets[i];
								var dsMeta = me.chart.getDatasetMeta(i);
								if (dsMeta.bar && dsMeta.yAxisID === yScale.id && me.chart.isDatasetVisible(i) && meta.stack === dsMeta.stack) {
									var stackedVal = Number(ds.data[index]);
									if (stackedVal < 0) {
										sumNeg += stackedVal || 0;
									} else {
										sumPos += stackedVal || 0;
									}
								}
							}

							if (value < 0) {
								return yScale.getPixelForValue(sumNeg + value);
							}
							return yScale.getPixelForValue(sumPos + value);
						}

						return yScale.getPixelForValue(value);
					},

					draw: function draw(ease) {
						var me = this;
						var easingDecimal = ease || 1;
						var metaData = me.getMeta().data;
						var dataset = me.getDataset();
						var i, len;

						Chart.canvasHelpers.clipArea(me.chart.chart.ctx, me.chart.chartArea);
						for (i = 0, len = metaData.length; i < len; ++i) {
							var d = dataset.data[i];
							if (d !== null && d !== undefined && !isNaN(d)) {
								metaData[i].transition(easingDecimal).draw();
							}
						}
						Chart.canvasHelpers.unclipArea(me.chart.chart.ctx);
					},

					setHoverStyle: function setHoverStyle(rectangle) {
						var dataset = this.chart.data.datasets[rectangle._datasetIndex];
						var index = rectangle._index;

						var custom = rectangle.custom || {};
						var model = rectangle._model;
						model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
						model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
						model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
					},

					removeHoverStyle: function removeHoverStyle(rectangle) {
						var dataset = this.chart.data.datasets[rectangle._datasetIndex];
						var index = rectangle._index;
						var custom = rectangle.custom || {};
						var model = rectangle._model;
						var rectangleElementOptions = this.chart.options.elements.rectangle;

						model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
						model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
						model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
					}

				});

				// including horizontalBar in the bar file, instead of a file of its own
				// it extends bar (like pie extends doughnut)
				Chart.defaults.horizontalBar = {
					hover: {
						mode: 'label'
					},

					scales: {
						xAxes: [{
							type: 'linear',
							position: 'bottom'
						}],
						yAxes: [{
							position: 'left',
							type: 'category',

							// Specific to Horizontal Bar Controller
							categoryPercentage: 0.8,
							barPercentage: 0.9,

							// grid line settings
							gridLines: {
								offsetGridLines: true
							}
						}]
					},
					elements: {
						rectangle: {
							borderSkipped: 'left'
						}
					},
					tooltips: {
						callbacks: {
							title: function title(tooltipItems, data) {
								// Pick first xLabel for now
								var title = '';

								if (tooltipItems.length > 0) {
									if (tooltipItems[0].yLabel) {
										title = tooltipItems[0].yLabel;
									} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
										title = data.labels[tooltipItems[0].index];
									}
								}

								return title;
							},
							label: function label(tooltipItem, data) {
								var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
								return datasetLabel + ': ' + tooltipItem.xLabel;
							}
						}
					}
				};

				Chart.controllers.horizontalBar = Chart.controllers.bar.extend({

					// Correctly calculate the bar width accounting for stacks and the fact that not all bars are visible
					getStackCount: function getStackCount() {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);

						var stacks = [];
						helpers.each(me.chart.data.datasets, function (dataset, datasetIndex) {
							var dsMeta = me.chart.getDatasetMeta(datasetIndex);
							if (dsMeta.bar && me.chart.isDatasetVisible(datasetIndex) && (xScale.options.stacked === false || xScale.options.stacked === true && stacks.indexOf(dsMeta.stack) === -1 || xScale.options.stacked === undefined && (dsMeta.stack === undefined || stacks.indexOf(dsMeta.stack) === -1))) {
								stacks.push(dsMeta.stack);
							}
						}, me);

						return stacks.length;
					},

					updateElement: function updateElement(rectangle, index, reset) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var yScale = me.getScaleForId(meta.yAxisID);
						var scaleBase = xScale.getBasePixel();
						var custom = rectangle.custom || {};
						var dataset = me.getDataset();
						var rectangleElementOptions = me.chart.options.elements.rectangle;

						rectangle._xScale = xScale;
						rectangle._yScale = yScale;
						rectangle._datasetIndex = me.index;
						rectangle._index = index;

						var ruler = me.getRuler(index); // The index argument for compatible
						rectangle._model = {
							x: reset ? scaleBase : me.calculateBarX(index, me.index),
							y: me.calculateBarY(index, me.index, ruler),

							// Tooltip
							label: me.chart.data.labels[index],
							datasetLabel: dataset.label,

							// Appearance
							horizontal: true,
							base: reset ? scaleBase : me.calculateBarBase(me.index, index),
							height: me.calculateBarHeight(ruler),
							backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
							borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
							borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
							borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
						};

						rectangle.pivot();
					},

					calculateBarBase: function calculateBarBase(datasetIndex, index) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var base = xScale.getBaseValue();
						var originalBase = base;

						if (xScale.options.stacked || xScale.options.stacked === undefined && meta.stack !== undefined) {
							var chart = me.chart;
							var datasets = chart.data.datasets;
							var value = Number(datasets[datasetIndex].data[index]);

							for (var i = 0; i < datasetIndex; i++) {
								var currentDs = datasets[i];
								var currentDsMeta = chart.getDatasetMeta(i);
								if (currentDsMeta.bar && currentDsMeta.xAxisID === xScale.id && chart.isDatasetVisible(i) && meta.stack === currentDsMeta.stack) {
									var currentVal = Number(currentDs.data[index]);
									base += value < 0 ? Math.min(currentVal, originalBase) : Math.max(currentVal, originalBase);
								}
							}

							return xScale.getPixelForValue(base);
						}

						return xScale.getBasePixel();
					},

					getRuler: function getRuler() {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						var stackCount = me.getStackCount();

						var tickHeight = yScale.height / yScale.ticks.length;
						var categoryHeight = tickHeight * yScale.options.categoryPercentage;
						var categorySpacing = (tickHeight - tickHeight * yScale.options.categoryPercentage) / 2;
						var fullBarHeight = categoryHeight / stackCount;

						var barHeight = fullBarHeight * yScale.options.barPercentage;
						var barSpacing = fullBarHeight - fullBarHeight * yScale.options.barPercentage;

						return {
							stackCount: stackCount,
							tickHeight: tickHeight,
							categoryHeight: categoryHeight,
							categorySpacing: categorySpacing,
							fullBarHeight: fullBarHeight,
							barHeight: barHeight,
							barSpacing: barSpacing
						};
					},

					calculateBarHeight: function calculateBarHeight(ruler) {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						if (yScale.options.barThickness) {
							return yScale.options.barThickness;
						}
						return ruler.barHeight;
					},

					// Get stack index from the given dataset index accounting for stacks and the fact that not all bars are visible
					getStackIndex: function getStackIndex(datasetIndex) {
						var me = this;
						var meta = me.chart.getDatasetMeta(datasetIndex);
						var xScale = me.getScaleForId(meta.xAxisID);
						var dsMeta, j;
						var stacks = [meta.stack];

						for (j = 0; j < datasetIndex; ++j) {
							dsMeta = this.chart.getDatasetMeta(j);
							if (dsMeta.bar && this.chart.isDatasetVisible(j) && (xScale.options.stacked === false || xScale.options.stacked === true && stacks.indexOf(dsMeta.stack) === -1 || xScale.options.stacked === undefined && (dsMeta.stack === undefined || stacks.indexOf(dsMeta.stack) === -1))) {
								stacks.push(dsMeta.stack);
							}
						}

						return stacks.length - 1;
					},

					calculateBarX: function calculateBarX(index, datasetIndex) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var value = Number(me.getDataset().data[index]);

						if (xScale.options.stacked || xScale.options.stacked === undefined && meta.stack !== undefined) {
							var base = xScale.getBaseValue();
							var sumPos = base,
							    sumNeg = base;

							for (var i = 0; i < datasetIndex; i++) {
								var ds = me.chart.data.datasets[i];
								var dsMeta = me.chart.getDatasetMeta(i);
								if (dsMeta.bar && dsMeta.xAxisID === xScale.id && me.chart.isDatasetVisible(i) && meta.stack === dsMeta.stack) {
									var stackedVal = Number(ds.data[index]);
									if (stackedVal < 0) {
										sumNeg += stackedVal || 0;
									} else {
										sumPos += stackedVal || 0;
									}
								}
							}

							if (value < 0) {
								return xScale.getPixelForValue(sumNeg + value);
							}
							return xScale.getPixelForValue(sumPos + value);
						}

						return xScale.getPixelForValue(value);
					},

					calculateBarY: function calculateBarY(index, datasetIndex, ruler) {
						var me = this;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						var stackIndex = me.getStackIndex(datasetIndex);
						var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
						topTick -= me.chart.isCombo ? ruler.tickHeight / 2 : 0;

						return topTick + ruler.barHeight / 2 + ruler.categorySpacing + ruler.barHeight * stackIndex + ruler.barSpacing / 2 + ruler.barSpacing * stackIndex;
					}
				});
			};
		}, {}], 16: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.bubble = {
					hover: {
						mode: 'single'
					},

					scales: {
						xAxes: [{
							type: 'linear', // bubble should probably use a linear scale by default
							position: 'bottom',
							id: 'x-axis-0' // need an ID so datasets can reference the scale
						}],
						yAxes: [{
							type: 'linear',
							position: 'left',
							id: 'y-axis-0'
						}]
					},

					tooltips: {
						callbacks: {
							title: function title() {
								// Title doesn't make sense for scatter since we format the data as a point
								return '';
							},
							label: function label(tooltipItem, data) {
								var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
								var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
								return datasetLabel + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ', ' + dataPoint.r + ')';
							}
						}
					}
				};

				Chart.controllers.bubble = Chart.DatasetController.extend({

					dataElementType: Chart.elements.Point,

					update: function update(reset) {
						var me = this;
						var meta = me.getMeta();
						var points = meta.data;

						// Update Points
						helpers.each(points, function (point, index) {
							me.updateElement(point, index, reset);
						});
					},

					updateElement: function updateElement(point, index, reset) {
						var me = this;
						var meta = me.getMeta();
						var xScale = me.getScaleForId(meta.xAxisID);
						var yScale = me.getScaleForId(meta.yAxisID);

						var custom = point.custom || {};
						var dataset = me.getDataset();
						var data = dataset.data[index];
						var pointElementOptions = me.chart.options.elements.point;
						var dsIndex = me.index;

						helpers.extend(point, {
							// Utility
							_xScale: xScale,
							_yScale: yScale,
							_datasetIndex: dsIndex,
							_index: index,

							// Desired view properties
							_model: {
								x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue((typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
								y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
								// Appearance
								radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),

								// Tooltip
								hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
							}
						});

						// Trick to reset the styles of the point
						Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);

						var model = point._model;
						model.skip = custom.skip ? custom.skip : isNaN(model.x) || isNaN(model.y);

						point.pivot();
					},

					getRadius: function getRadius(value) {
						return value.r || this.chart.options.elements.point.radius;
					},

					setHoverStyle: function setHoverStyle(point) {
						var me = this;
						Chart.DatasetController.prototype.setHoverStyle.call(me, point);

						// Radius
						var dataset = me.chart.data.datasets[point._datasetIndex];
						var index = point._index;
						var custom = point.custom || {};
						var model = point._model;
						model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius) + me.getRadius(dataset.data[index]);
					},

					removeHoverStyle: function removeHoverStyle(point) {
						var me = this;
						Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);

						var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
						var custom = point.custom || {};
						var model = point._model;

						model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
					}
				});
			};
		}, {}], 17: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers,
				    defaults = Chart.defaults;

				defaults.doughnut = {
					animation: {
						// Boolean - Whether we animate the rotation of the Doughnut
						animateRotate: true,
						// Boolean - Whether we animate scaling the Doughnut from the centre
						animateScale: false
					},
					aspectRatio: 1,
					hover: {
						mode: 'single'
					},
					legendCallback: function legendCallback(chart) {
						var text = [];
						text.push('<ul class="' + chart.id + '-legend">');

						var data = chart.data;
						var datasets = data.datasets;
						var labels = data.labels;

						if (datasets.length) {
							for (var i = 0; i < datasets[0].data.length; ++i) {
								text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
								if (labels[i]) {
									text.push(labels[i]);
								}
								text.push('</li>');
							}
						}

						text.push('</ul>');
						return text.join('');
					},
					legend: {
						labels: {
							generateLabels: function generateLabels(chart) {
								var data = chart.data;
								if (data.labels.length && data.datasets.length) {
									return data.labels.map(function (label, i) {
										var meta = chart.getDatasetMeta(0);
										var ds = data.datasets[0];
										var arc = meta.data[i];
										var custom = arc && arc.custom || {};
										var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
										var arcOpts = chart.options.elements.arc;
										var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
										var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
										var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

										return {
											text: label,
											fillStyle: fill,
											strokeStyle: stroke,
											lineWidth: bw,
											hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

											// Extra data used for toggling the correct item
											index: i
										};
									});
								}
								return [];
							}
						},

						onClick: function onClick(e, legendItem) {
							var index = legendItem.index;
							var chart = this.chart;
							var i, ilen, meta;

							for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
								meta = chart.getDatasetMeta(i);
								// toggle visibility of index if exists
								if (meta.data[index]) {
									meta.data[index].hidden = !meta.data[index].hidden;
								}
							}

							chart.update();
						}
					},

					// The percentage of the chart that we cut out of the middle.
					cutoutPercentage: 50,

					// The rotation of the chart, where the first data arc begins.
					rotation: Math.PI * -0.5,

					// The total circumference of the chart.
					circumference: Math.PI * 2.0,

					// Need to override these to give a nice default
					tooltips: {
						callbacks: {
							title: function title() {
								return '';
							},
							label: function label(tooltipItem, data) {
								var dataLabel = data.labels[tooltipItem.index];
								var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

								if (helpers.isArray(dataLabel)) {
									// show value on first line of multiline label
									// need to clone because we are changing the value
									dataLabel = dataLabel.slice();
									dataLabel[0] += value;
								} else {
									dataLabel += value;
								}

								return dataLabel;
							}
						}
					}
				};

				defaults.pie = helpers.clone(defaults.doughnut);
				helpers.extend(defaults.pie, {
					cutoutPercentage: 0
				});

				Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({

					dataElementType: Chart.elements.Arc,

					linkScales: helpers.noop,

					// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
					getRingIndex: function getRingIndex(datasetIndex) {
						var ringIndex = 0;

						for (var j = 0; j < datasetIndex; ++j) {
							if (this.chart.isDatasetVisible(j)) {
								++ringIndex;
							}
						}

						return ringIndex;
					},

					update: function update(reset) {
						var me = this;
						var chart = me.chart,
						    chartArea = chart.chartArea,
						    opts = chart.options,
						    arcOpts = opts.elements.arc,
						    availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
						    availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
						    minSize = Math.min(availableWidth, availableHeight),
						    offset = {
							x: 0,
							y: 0
						},
						    meta = me.getMeta(),
						    cutoutPercentage = opts.cutoutPercentage,
						    circumference = opts.circumference;

						// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
						if (circumference < Math.PI * 2.0) {
							var startAngle = opts.rotation % (Math.PI * 2.0);
							startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
							var endAngle = startAngle + circumference;
							var start = { x: Math.cos(startAngle), y: Math.sin(startAngle) };
							var end = { x: Math.cos(endAngle), y: Math.sin(endAngle) };
							var contains0 = startAngle <= 0 && 0 <= endAngle || startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle;
							var contains90 = startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle || startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle;
							var contains180 = startAngle <= -Math.PI && -Math.PI <= endAngle || startAngle <= Math.PI && Math.PI <= endAngle;
							var contains270 = startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle || startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle;
							var cutout = cutoutPercentage / 100.0;
							var min = { x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout)) };
							var max = { x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout)) };
							var size = { width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5 };
							minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
							offset = { x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5 };
						}

						chart.borderWidth = me.getMaxBorderWidth(meta.data);
						chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
						chart.innerRadius = Math.max(cutoutPercentage ? chart.outerRadius / 100 * cutoutPercentage : 0, 0);
						chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
						chart.offsetX = offset.x * chart.outerRadius;
						chart.offsetY = offset.y * chart.outerRadius;

						meta.total = me.calculateTotal();

						me.outerRadius = chart.outerRadius - chart.radiusLength * me.getRingIndex(me.index);
						me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);

						helpers.each(meta.data, function (arc, index) {
							me.updateElement(arc, index, reset);
						});
					},

					updateElement: function updateElement(arc, index, reset) {
						var me = this;
						var chart = me.chart,
						    chartArea = chart.chartArea,
						    opts = chart.options,
						    animationOpts = opts.animation,
						    centerX = (chartArea.left + chartArea.right) / 2,
						    centerY = (chartArea.top + chartArea.bottom) / 2,
						    startAngle = opts.rotation,
						    // non reset case handled later
						endAngle = opts.rotation,
						    // non reset case handled later
						dataset = me.getDataset(),
						    circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
						    innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius,
						    outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius,
						    valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

						helpers.extend(arc, {
							// Utility
							_datasetIndex: me.index,
							_index: index,

							// Desired view properties
							_model: {
								x: centerX + chart.offsetX,
								y: centerY + chart.offsetY,
								startAngle: startAngle,
								endAngle: endAngle,
								circumference: circumference,
								outerRadius: outerRadius,
								innerRadius: innerRadius,
								label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
							}
						});

						var model = arc._model;
						// Resets the visual styles
						this.removeHoverStyle(arc);

						// Set correct angles if not resetting
						if (!reset || !animationOpts.animateRotate) {
							if (index === 0) {
								model.startAngle = opts.rotation;
							} else {
								model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
							}

							model.endAngle = model.startAngle + model.circumference;
						}

						arc.pivot();
					},

					removeHoverStyle: function removeHoverStyle(arc) {
						Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
					},

					calculateTotal: function calculateTotal() {
						var dataset = this.getDataset();
						var meta = this.getMeta();
						var total = 0;
						var value;

						helpers.each(meta.data, function (element, index) {
							value = dataset.data[index];
							if (!isNaN(value) && !element.hidden) {
								total += Math.abs(value);
							}
						});

						/* if (total === 0) {
      	total = NaN;
      }*/

						return total;
					},

					calculateCircumference: function calculateCircumference(value) {
						var total = this.getMeta().total;
						if (total > 0 && !isNaN(value)) {
							return Math.PI * 2.0 * (value / total);
						}
						return 0;
					},

					// gets the max border or hover width to properly scale pie charts
					getMaxBorderWidth: function getMaxBorderWidth(elements) {
						var max = 0,
						    index = this.index,
						    length = elements.length,
						    borderWidth,
						    hoverWidth;

						for (var i = 0; i < length; i++) {
							borderWidth = elements[i]._model ? elements[i]._model.borderWidth : 0;
							hoverWidth = elements[i]._chart ? elements[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;

							max = borderWidth > max ? borderWidth : max;
							max = hoverWidth > max ? hoverWidth : max;
						}
						return max;
					}
				});
			};
		}, {}], 18: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.line = {
					showLines: true,
					spanGaps: false,

					hover: {
						mode: 'label'
					},

					scales: {
						xAxes: [{
							type: 'category',
							id: 'x-axis-0'
						}],
						yAxes: [{
							type: 'linear',
							id: 'y-axis-0'
						}]
					}
				};

				function lineEnabled(dataset, options) {
					return helpers.getValueOrDefault(dataset.showLine, options.showLines);
				}

				Chart.controllers.line = Chart.DatasetController.extend({

					datasetElementType: Chart.elements.Line,

					dataElementType: Chart.elements.Point,

					update: function update(reset) {
						var me = this;
						var meta = me.getMeta();
						var line = meta.dataset;
						var points = meta.data || [];
						var options = me.chart.options;
						var lineElementOptions = options.elements.line;
						var scale = me.getScaleForId(meta.yAxisID);
						var i, ilen, custom;
						var dataset = me.getDataset();
						var showLine = lineEnabled(dataset, options);

						// Update Line
						if (showLine) {
							custom = line.custom || {};

							// Compatibility: If the properties are defined with only the old name, use those values
							if (dataset.tension !== undefined && dataset.lineTension === undefined) {
								dataset.lineTension = dataset.tension;
							}

							// Utility
							line._scale = scale;
							line._datasetIndex = me.index;
							// Data
							line._children = points;
							// Model
							line._model = {
								// Appearance
								// The default behavior of lines is to break at null values, according
								// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
								// This option gives lines the ability to span gaps
								spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
								tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
								backgroundColor: custom.backgroundColor ? custom.backgroundColor : dataset.backgroundColor || lineElementOptions.backgroundColor,
								borderWidth: custom.borderWidth ? custom.borderWidth : dataset.borderWidth || lineElementOptions.borderWidth,
								borderColor: custom.borderColor ? custom.borderColor : dataset.borderColor || lineElementOptions.borderColor,
								borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : dataset.borderCapStyle || lineElementOptions.borderCapStyle,
								borderDash: custom.borderDash ? custom.borderDash : dataset.borderDash || lineElementOptions.borderDash,
								borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : dataset.borderDashOffset || lineElementOptions.borderDashOffset,
								borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : dataset.borderJoinStyle || lineElementOptions.borderJoinStyle,
								fill: custom.fill ? custom.fill : dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill,
								steppedLine: custom.steppedLine ? custom.steppedLine : helpers.getValueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
								cubicInterpolationMode: custom.cubicInterpolationMode ? custom.cubicInterpolationMode : helpers.getValueOrDefault(dataset.cubicInterpolationMode, lineElementOptions.cubicInterpolationMode),
								// Scale
								scaleTop: scale.top,
								scaleBottom: scale.bottom,
								scaleZero: scale.getBasePixel()
							};

							line.pivot();
						}

						// Update Points
						for (i = 0, ilen = points.length; i < ilen; ++i) {
							me.updateElement(points[i], i, reset);
						}

						if (showLine && line._model.tension !== 0) {
							me.updateBezierControlPoints();
						}

						// Now pivot the point for animation
						for (i = 0, ilen = points.length; i < ilen; ++i) {
							points[i].pivot();
						}
					},

					getPointBackgroundColor: function getPointBackgroundColor(point, index) {
						var backgroundColor = this.chart.options.elements.point.backgroundColor;
						var dataset = this.getDataset();
						var custom = point.custom || {};

						if (custom.backgroundColor) {
							backgroundColor = custom.backgroundColor;
						} else if (dataset.pointBackgroundColor) {
							backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
						} else if (dataset.backgroundColor) {
							backgroundColor = dataset.backgroundColor;
						}

						return backgroundColor;
					},

					getPointBorderColor: function getPointBorderColor(point, index) {
						var borderColor = this.chart.options.elements.point.borderColor;
						var dataset = this.getDataset();
						var custom = point.custom || {};

						if (custom.borderColor) {
							borderColor = custom.borderColor;
						} else if (dataset.pointBorderColor) {
							borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
						} else if (dataset.borderColor) {
							borderColor = dataset.borderColor;
						}

						return borderColor;
					},

					getPointBorderWidth: function getPointBorderWidth(point, index) {
						var borderWidth = this.chart.options.elements.point.borderWidth;
						var dataset = this.getDataset();
						var custom = point.custom || {};

						if (!isNaN(custom.borderWidth)) {
							borderWidth = custom.borderWidth;
						} else if (!isNaN(dataset.pointBorderWidth)) {
							borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
						} else if (!isNaN(dataset.borderWidth)) {
							borderWidth = dataset.borderWidth;
						}

						return borderWidth;
					},

					updateElement: function updateElement(point, index, reset) {
						var me = this;
						var meta = me.getMeta();
						var custom = point.custom || {};
						var dataset = me.getDataset();
						var datasetIndex = me.index;
						var value = dataset.data[index];
						var yScale = me.getScaleForId(meta.yAxisID);
						var xScale = me.getScaleForId(meta.xAxisID);
						var pointOptions = me.chart.options.elements.point;
						var x, y;
						var labels = me.chart.data.labels || [];
						var includeOffset = labels.length === 1 || dataset.data.length === 1 || me.chart.isCombo;

						// Compatibility: If the properties are defined with only the old name, use those values
						if (dataset.radius !== undefined && dataset.pointRadius === undefined) {
							dataset.pointRadius = dataset.radius;
						}
						if (dataset.hitRadius !== undefined && dataset.pointHitRadius === undefined) {
							dataset.pointHitRadius = dataset.hitRadius;
						}

						x = xScale.getPixelForValue((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value : NaN, index, datasetIndex, includeOffset);
						y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);

						// Utility
						point._xScale = xScale;
						point._yScale = yScale;
						point._datasetIndex = datasetIndex;
						point._index = index;

						// Desired view properties
						point._model = {
							x: x,
							y: y,
							skip: custom.skip || isNaN(x) || isNaN(y),
							// Appearance
							radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
							pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
							backgroundColor: me.getPointBackgroundColor(point, index),
							borderColor: me.getPointBorderColor(point, index),
							borderWidth: me.getPointBorderWidth(point, index),
							tension: meta.dataset._model ? meta.dataset._model.tension : 0,
							steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
							// Tooltip
							hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
						};
					},

					calculatePointY: function calculatePointY(value, index, datasetIndex) {
						var me = this;
						var chart = me.chart;
						var meta = me.getMeta();
						var yScale = me.getScaleForId(meta.yAxisID);
						var sumPos = 0;
						var sumNeg = 0;
						var i, ds, dsMeta;

						if (yScale.options.stacked) {
							for (i = 0; i < datasetIndex; i++) {
								ds = chart.data.datasets[i];
								dsMeta = chart.getDatasetMeta(i);
								if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
									var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
									if (stackedRightValue < 0) {
										sumNeg += stackedRightValue || 0;
									} else {
										sumPos += stackedRightValue || 0;
									}
								}
							}

							var rightValue = Number(yScale.getRightValue(value));
							if (rightValue < 0) {
								return yScale.getPixelForValue(sumNeg + rightValue);
							}
							return yScale.getPixelForValue(sumPos + rightValue);
						}

						return yScale.getPixelForValue(value);
					},

					updateBezierControlPoints: function updateBezierControlPoints() {
						var me = this;
						var meta = me.getMeta();
						var area = me.chart.chartArea;
						var points = meta.data || [];
						var i, ilen, point, model, controlPoints;

						// Only consider points that are drawn in case the spanGaps option is used
						if (meta.dataset._model.spanGaps) {
							points = points.filter(function (pt) {
								return !pt._model.skip;
							});
						}

						function capControlPoint(pt, min, max) {
							return Math.max(Math.min(pt, max), min);
						}

						if (meta.dataset._model.cubicInterpolationMode === 'monotone') {
							helpers.splineCurveMonotone(points);
						} else {
							for (i = 0, ilen = points.length; i < ilen; ++i) {
								point = points[i];
								model = point._model;
								controlPoints = helpers.splineCurve(helpers.previousItem(points, i)._model, model, helpers.nextItem(points, i)._model, meta.dataset._model.tension);
								model.controlPointPreviousX = controlPoints.previous.x;
								model.controlPointPreviousY = controlPoints.previous.y;
								model.controlPointNextX = controlPoints.next.x;
								model.controlPointNextY = controlPoints.next.y;
							}
						}

						if (me.chart.options.elements.line.capBezierPoints) {
							for (i = 0, ilen = points.length; i < ilen; ++i) {
								model = points[i]._model;
								model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
								model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
								model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
								model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
							}
						}
					},

					draw: function draw(ease) {
						var me = this;
						var meta = me.getMeta();
						var points = meta.data || [];
						var easingDecimal = ease || 1;
						var i, ilen;

						// Transition Point Locations
						for (i = 0, ilen = points.length; i < ilen; ++i) {
							points[i].transition(easingDecimal);
						}

						Chart.canvasHelpers.clipArea(me.chart.chart.ctx, me.chart.chartArea);
						// Transition and Draw the line
						if (lineEnabled(me.getDataset(), me.chart.options)) {
							meta.dataset.transition(easingDecimal).draw();
						}
						Chart.canvasHelpers.unclipArea(me.chart.chart.ctx);

						// Draw the points
						for (i = 0, ilen = points.length; i < ilen; ++i) {
							points[i].draw(me.chart.chartArea);
						}
					},

					setHoverStyle: function setHoverStyle(point) {
						// Point
						var dataset = this.chart.data.datasets[point._datasetIndex];
						var index = point._index;
						var custom = point.custom || {};
						var model = point._model;

						model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
						model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
						model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
						model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
					},

					removeHoverStyle: function removeHoverStyle(point) {
						var me = this;
						var dataset = me.chart.data.datasets[point._datasetIndex];
						var index = point._index;
						var custom = point.custom || {};
						var model = point._model;

						// Compatibility: If the properties are defined with only the old name, use those values
						if (dataset.radius !== undefined && dataset.pointRadius === undefined) {
							dataset.pointRadius = dataset.radius;
						}

						model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
						model.backgroundColor = me.getPointBackgroundColor(point, index);
						model.borderColor = me.getPointBorderColor(point, index);
						model.borderWidth = me.getPointBorderWidth(point, index);
					}
				});
			};
		}, {}], 19: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.polarArea = {

					scale: {
						type: 'radialLinear',
						lineArc: true, // so that lines are circular
						ticks: {
							beginAtZero: true
						}
					},

					// Boolean - Whether to animate the rotation of the chart
					animation: {
						animateRotate: true,
						animateScale: true
					},

					startAngle: -0.5 * Math.PI,
					aspectRatio: 1,
					legendCallback: function legendCallback(chart) {
						var text = [];
						text.push('<ul class="' + chart.id + '-legend">');

						var data = chart.data;
						var datasets = data.datasets;
						var labels = data.labels;

						if (datasets.length) {
							for (var i = 0; i < datasets[0].data.length; ++i) {
								text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
								if (labels[i]) {
									text.push(labels[i]);
								}
								text.push('</li>');
							}
						}

						text.push('</ul>');
						return text.join('');
					},
					legend: {
						labels: {
							generateLabels: function generateLabels(chart) {
								var data = chart.data;
								if (data.labels.length && data.datasets.length) {
									return data.labels.map(function (label, i) {
										var meta = chart.getDatasetMeta(0);
										var ds = data.datasets[0];
										var arc = meta.data[i];
										var custom = arc.custom || {};
										var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
										var arcOpts = chart.options.elements.arc;
										var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
										var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
										var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

										return {
											text: label,
											fillStyle: fill,
											strokeStyle: stroke,
											lineWidth: bw,
											hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

											// Extra data used for toggling the correct item
											index: i
										};
									});
								}
								return [];
							}
						},

						onClick: function onClick(e, legendItem) {
							var index = legendItem.index;
							var chart = this.chart;
							var i, ilen, meta;

							for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
								meta = chart.getDatasetMeta(i);
								meta.data[index].hidden = !meta.data[index].hidden;
							}

							chart.update();
						}
					},

					// Need to override these to give a nice default
					tooltips: {
						callbacks: {
							title: function title() {
								return '';
							},
							label: function label(tooltipItem, data) {
								return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
							}
						}
					}
				};

				Chart.controllers.polarArea = Chart.DatasetController.extend({

					dataElementType: Chart.elements.Arc,

					linkScales: helpers.noop,

					update: function update(reset) {
						var me = this;
						var chart = me.chart;
						var chartArea = chart.chartArea;
						var meta = me.getMeta();
						var opts = chart.options;
						var arcOpts = opts.elements.arc;
						var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
						chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
						chart.innerRadius = Math.max(opts.cutoutPercentage ? chart.outerRadius / 100 * opts.cutoutPercentage : 1, 0);
						chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

						me.outerRadius = chart.outerRadius - chart.radiusLength * me.index;
						me.innerRadius = me.outerRadius - chart.radiusLength;

						meta.count = me.countVisibleElements();

						helpers.each(meta.data, function (arc, index) {
							me.updateElement(arc, index, reset);
						});
					},

					updateElement: function updateElement(arc, index, reset) {
						var me = this;
						var chart = me.chart;
						var dataset = me.getDataset();
						var opts = chart.options;
						var animationOpts = opts.animation;
						var scale = chart.scale;
						var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
						var labels = chart.data.labels;

						var circumference = me.calculateCircumference(dataset.data[index]);
						var centerX = scale.xCenter;
						var centerY = scale.yCenter;

						// If there is NaN data before us, we need to calculate the starting angle correctly.
						// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
						var visibleCount = 0;
						var meta = me.getMeta();
						for (var i = 0; i < index; ++i) {
							if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
								++visibleCount;
							}
						}

						// var negHalfPI = -0.5 * Math.PI;
						var datasetStartAngle = opts.startAngle;
						var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
						var startAngle = datasetStartAngle + circumference * visibleCount;
						var endAngle = startAngle + (arc.hidden ? 0 : circumference);

						var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);

						helpers.extend(arc, {
							// Utility
							_datasetIndex: me.index,
							_index: index,
							_scale: scale,

							// Desired view properties
							_model: {
								x: centerX,
								y: centerY,
								innerRadius: 0,
								outerRadius: reset ? resetRadius : distance,
								startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
								endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
								label: getValueAtIndexOrDefault(labels, index, labels[index])
							}
						});

						// Apply border and fill style
						me.removeHoverStyle(arc);

						arc.pivot();
					},

					removeHoverStyle: function removeHoverStyle(arc) {
						Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
					},

					countVisibleElements: function countVisibleElements() {
						var dataset = this.getDataset();
						var meta = this.getMeta();
						var count = 0;

						helpers.each(meta.data, function (element, index) {
							if (!isNaN(dataset.data[index]) && !element.hidden) {
								count++;
							}
						});

						return count;
					},

					calculateCircumference: function calculateCircumference(value) {
						var count = this.getMeta().count;
						if (count > 0 && !isNaN(value)) {
							return 2 * Math.PI / count;
						}
						return 0;
					}
				});
			};
		}, {}], 20: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.radar = {
					aspectRatio: 1,
					scale: {
						type: 'radialLinear'
					},
					elements: {
						line: {
							tension: 0 // no bezier in radar
						}
					}
				};

				Chart.controllers.radar = Chart.DatasetController.extend({

					datasetElementType: Chart.elements.Line,

					dataElementType: Chart.elements.Point,

					linkScales: helpers.noop,

					update: function update(reset) {
						var me = this;
						var meta = me.getMeta();
						var line = meta.dataset;
						var points = meta.data;
						var custom = line.custom || {};
						var dataset = me.getDataset();
						var lineElementOptions = me.chart.options.elements.line;
						var scale = me.chart.scale;

						// Compatibility: If the properties are defined with only the old name, use those values
						if (dataset.tension !== undefined && dataset.lineTension === undefined) {
							dataset.lineTension = dataset.tension;
						}

						helpers.extend(meta.dataset, {
							// Utility
							_datasetIndex: me.index,
							// Data
							_children: points,
							_loop: true,
							// Model
							_model: {
								// Appearance
								tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
								backgroundColor: custom.backgroundColor ? custom.backgroundColor : dataset.backgroundColor || lineElementOptions.backgroundColor,
								borderWidth: custom.borderWidth ? custom.borderWidth : dataset.borderWidth || lineElementOptions.borderWidth,
								borderColor: custom.borderColor ? custom.borderColor : dataset.borderColor || lineElementOptions.borderColor,
								fill: custom.fill ? custom.fill : dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill,
								borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : dataset.borderCapStyle || lineElementOptions.borderCapStyle,
								borderDash: custom.borderDash ? custom.borderDash : dataset.borderDash || lineElementOptions.borderDash,
								borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : dataset.borderDashOffset || lineElementOptions.borderDashOffset,
								borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : dataset.borderJoinStyle || lineElementOptions.borderJoinStyle,

								// Scale
								scaleTop: scale.top,
								scaleBottom: scale.bottom,
								scaleZero: scale.getBasePosition()
							}
						});

						meta.dataset.pivot();

						// Update Points
						helpers.each(points, function (point, index) {
							me.updateElement(point, index, reset);
						}, me);

						// Update bezier control points
						me.updateBezierControlPoints();
					},
					updateElement: function updateElement(point, index, reset) {
						var me = this;
						var custom = point.custom || {};
						var dataset = me.getDataset();
						var scale = me.chart.scale;
						var pointElementOptions = me.chart.options.elements.point;
						var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);

						helpers.extend(point, {
							// Utility
							_datasetIndex: me.index,
							_index: index,
							_scale: scale,

							// Desired view properties
							_model: {
								x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
								y: reset ? scale.yCenter : pointPosition.y,

								// Appearance
								tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, me.chart.options.elements.line.tension),
								radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
								backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
								borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
								borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
								pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),

								// Tooltip
								hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
							}
						});

						point._model.skip = custom.skip ? custom.skip : isNaN(point._model.x) || isNaN(point._model.y);
					},
					updateBezierControlPoints: function updateBezierControlPoints() {
						var chartArea = this.chart.chartArea;
						var meta = this.getMeta();

						helpers.each(meta.data, function (point, index) {
							var model = point._model;
							var controlPoints = helpers.splineCurve(helpers.previousItem(meta.data, index, true)._model, model, helpers.nextItem(meta.data, index, true)._model, model.tension);

							// Prevent the bezier going outside of the bounds of the graph
							model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
							model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);

							model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
							model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);

							// Now pivot the point for animation
							point.pivot();
						});
					},

					draw: function draw(ease) {
						var meta = this.getMeta();
						var easingDecimal = ease || 1;

						// Transition Point Locations
						helpers.each(meta.data, function (point) {
							point.transition(easingDecimal);
						});

						// Transition and Draw the line
						meta.dataset.transition(easingDecimal).draw();

						// Draw the points
						helpers.each(meta.data, function (point) {
							point.draw();
						});
					},

					setHoverStyle: function setHoverStyle(point) {
						// Point
						var dataset = this.chart.data.datasets[point._datasetIndex];
						var custom = point.custom || {};
						var index = point._index;
						var model = point._model;

						model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
						model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
						model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
						model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
					},

					removeHoverStyle: function removeHoverStyle(point) {
						var dataset = this.chart.data.datasets[point._datasetIndex];
						var custom = point.custom || {};
						var index = point._index;
						var model = point._model;
						var pointElementOptions = this.chart.options.elements.point;

						model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
						model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
						model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
						model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
					}
				});
			};
		}, {}], 21: [function (require, module, exports) {
			/* global window: false */
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.global.animation = {
					duration: 1000,
					easing: 'easeOutQuart',
					onProgress: helpers.noop,
					onComplete: helpers.noop
				};

				Chart.Animation = Chart.Element.extend({
					currentStep: null, // the current animation step
					numSteps: 60, // default number of steps
					easing: '', // the easing to use for this animation
					render: null, // render function used by the animation service

					onAnimationProgress: null, // user specified callback to fire on each step of the animation
					onAnimationComplete: null // user specified callback to fire when the animation finishes
				});

				Chart.animationService = {
					frameDuration: 17,
					animations: [],
					dropFrames: 0,
					request: null,

					/**
      * @function Chart.animationService.addAnimation
      * @param chartInstance {ChartController} the chart to animate
      * @param animationObject {IAnimation} the animation that we will animate
      * @param duration {Number} length of animation in ms
      * @param lazy {Boolean} if true, the chart is not marked as animating to enable more responsive interactions
      */
					addAnimation: function addAnimation(chartInstance, animationObject, duration, lazy) {
						var me = this;

						if (!lazy) {
							chartInstance.animating = true;
						}

						for (var index = 0; index < me.animations.length; ++index) {
							if (me.animations[index].chartInstance === chartInstance) {
								// replacing an in progress animation
								me.animations[index].animationObject = animationObject;
								return;
							}
						}

						me.animations.push({
							chartInstance: chartInstance,
							animationObject: animationObject
						});

						// If there are no animations queued, manually kickstart a digest, for lack of a better word
						if (me.animations.length === 1) {
							me.requestAnimationFrame();
						}
					},
					// Cancel the animation for a given chart instance
					cancelAnimation: function cancelAnimation(chartInstance) {
						var index = helpers.findIndex(this.animations, function (animationWrapper) {
							return animationWrapper.chartInstance === chartInstance;
						});

						if (index !== -1) {
							this.animations.splice(index, 1);
							chartInstance.animating = false;
						}
					},
					requestAnimationFrame: function requestAnimationFrame() {
						var me = this;
						if (me.request === null) {
							// Skip animation frame requests until the active one is executed.
							// This can happen when processing mouse events, e.g. 'mousemove'
							// and 'mouseout' events will trigger multiple renders.
							me.request = helpers.requestAnimFrame.call(window, function () {
								me.request = null;
								me.startDigest();
							});
						}
					},
					startDigest: function startDigest() {
						var me = this;

						var startTime = Date.now();
						var framesToDrop = 0;

						if (me.dropFrames > 1) {
							framesToDrop = Math.floor(me.dropFrames);
							me.dropFrames = me.dropFrames % 1;
						}

						var i = 0;
						while (i < me.animations.length) {
							if (me.animations[i].animationObject.currentStep === null) {
								me.animations[i].animationObject.currentStep = 0;
							}

							me.animations[i].animationObject.currentStep += 1 + framesToDrop;

							if (me.animations[i].animationObject.currentStep > me.animations[i].animationObject.numSteps) {
								me.animations[i].animationObject.currentStep = me.animations[i].animationObject.numSteps;
							}

							me.animations[i].animationObject.render(me.animations[i].chartInstance, me.animations[i].animationObject);
							if (me.animations[i].animationObject.onAnimationProgress && me.animations[i].animationObject.onAnimationProgress.call) {
								me.animations[i].animationObject.onAnimationProgress.call(me.animations[i].chartInstance, me.animations[i]);
							}

							if (me.animations[i].animationObject.currentStep === me.animations[i].animationObject.numSteps) {
								if (me.animations[i].animationObject.onAnimationComplete && me.animations[i].animationObject.onAnimationComplete.call) {
									me.animations[i].animationObject.onAnimationComplete.call(me.animations[i].chartInstance, me.animations[i]);
								}

								// executed the last frame. Remove the animation.
								me.animations[i].chartInstance.animating = false;

								me.animations.splice(i, 1);
							} else {
								++i;
							}
						}

						var endTime = Date.now();
						var dropFrames = (endTime - startTime) / me.frameDuration;

						me.dropFrames += dropFrames;

						// Do we have more stuff to animate?
						if (me.animations.length > 0) {
							me.requestAnimationFrame();
						}
					}
				};
			};
		}, {}], 22: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {
				// Global Chart canvas helpers object for drawing items to canvas
				var helpers = Chart.canvasHelpers = {};

				helpers.drawPoint = function (ctx, pointStyle, radius, x, y) {
					var type, edgeLength, xOffset, yOffset, height, size;

					if ((typeof pointStyle === "undefined" ? "undefined" : _typeof(pointStyle)) === 'object') {
						type = pointStyle.toString();
						if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
							ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
							return;
						}
					}

					if (isNaN(radius) || radius <= 0) {
						return;
					}

					switch (pointStyle) {
						// Default includes circle
						default:
							ctx.beginPath();
							ctx.arc(x, y, radius, 0, Math.PI * 2);
							ctx.closePath();
							ctx.fill();
							break;
						case 'triangle':
							ctx.beginPath();
							edgeLength = 3 * radius / Math.sqrt(3);
							height = edgeLength * Math.sqrt(3) / 2;
							ctx.moveTo(x - edgeLength / 2, y + height / 3);
							ctx.lineTo(x + edgeLength / 2, y + height / 3);
							ctx.lineTo(x, y - 2 * height / 3);
							ctx.closePath();
							ctx.fill();
							break;
						case 'rect':
							size = 1 / Math.SQRT2 * radius;
							ctx.beginPath();
							ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
							ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
							break;
						case 'rectRounded':
							var offset = radius / Math.SQRT2;
							var leftX = x - offset;
							var topY = y - offset;
							var sideSize = Math.SQRT2 * radius;
							Chart.helpers.drawRoundedRectangle(ctx, leftX, topY, sideSize, sideSize, radius / 2);
							ctx.fill();
							break;
						case 'rectRot':
							size = 1 / Math.SQRT2 * radius;
							ctx.beginPath();
							ctx.moveTo(x - size, y);
							ctx.lineTo(x, y + size);
							ctx.lineTo(x + size, y);
							ctx.lineTo(x, y - size);
							ctx.closePath();
							ctx.fill();
							break;
						case 'cross':
							ctx.beginPath();
							ctx.moveTo(x, y + radius);
							ctx.lineTo(x, y - radius);
							ctx.moveTo(x - radius, y);
							ctx.lineTo(x + radius, y);
							ctx.closePath();
							break;
						case 'crossRot':
							ctx.beginPath();
							xOffset = Math.cos(Math.PI / 4) * radius;
							yOffset = Math.sin(Math.PI / 4) * radius;
							ctx.moveTo(x - xOffset, y - yOffset);
							ctx.lineTo(x + xOffset, y + yOffset);
							ctx.moveTo(x - xOffset, y + yOffset);
							ctx.lineTo(x + xOffset, y - yOffset);
							ctx.closePath();
							break;
						case 'star':
							ctx.beginPath();
							ctx.moveTo(x, y + radius);
							ctx.lineTo(x, y - radius);
							ctx.moveTo(x - radius, y);
							ctx.lineTo(x + radius, y);
							xOffset = Math.cos(Math.PI / 4) * radius;
							yOffset = Math.sin(Math.PI / 4) * radius;
							ctx.moveTo(x - xOffset, y - yOffset);
							ctx.lineTo(x + xOffset, y + yOffset);
							ctx.moveTo(x - xOffset, y + yOffset);
							ctx.lineTo(x + xOffset, y - yOffset);
							ctx.closePath();
							break;
						case 'line':
							ctx.beginPath();
							ctx.moveTo(x - radius, y);
							ctx.lineTo(x + radius, y);
							ctx.closePath();
							break;
						case 'dash':
							ctx.beginPath();
							ctx.moveTo(x, y);
							ctx.lineTo(x + radius, y);
							ctx.closePath();
							break;
					}

					ctx.stroke();
				};

				helpers.clipArea = function (ctx, clipArea) {
					ctx.save();
					ctx.beginPath();
					ctx.rect(clipArea.left, clipArea.top, clipArea.right - clipArea.left, clipArea.bottom - clipArea.top);
					ctx.clip();
				};

				helpers.unclipArea = function (ctx) {
					ctx.restore();
				};
			};
		}, {}], 23: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				var plugins = Chart.plugins;
				var platform = Chart.platform;

				// Create a dictionary of chart types, to allow for extension of existing types
				Chart.types = {};

				// Store a reference to each instance - allowing us to globally resize chart instances on window resize.
				// Destroy method on the chart will remove the instance of the chart from this reference.
				Chart.instances = {};

				// Controllers available for dataset visualization eg. bar, line, slice, etc.
				Chart.controllers = {};

				/**
     * Initializes the given config with global and chart default values.
     */
				function initConfig(config) {
					config = config || {};

					// Do NOT use configMerge() for the data object because this method merges arrays
					// and so would change references to labels and datasets, preventing data updates.
					var data = config.data = config.data || {};
					data.datasets = data.datasets || [];
					data.labels = data.labels || [];

					config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[config.type], config.options || {});

					return config;
				}

				/**
     * Updates the config of the chart
     * @param chart {Chart.Controller} chart to update the options for
     */
				function updateConfig(chart) {
					var newOptions = chart.options;

					// Update Scale(s) with options
					if (newOptions.scale) {
						chart.scale.options = newOptions.scale;
					} else if (newOptions.scales) {
						newOptions.scales.xAxes.concat(newOptions.scales.yAxes).forEach(function (scaleOptions) {
							chart.scales[scaleOptions.id].options = scaleOptions;
						});
					}

					// Tooltip
					chart.tooltip._options = newOptions.tooltips;
				}

				/**
     * @class Chart.Controller
     * The main controller of a chart.
     */
				Chart.Controller = function (item, config, instance) {
					var me = this;

					config = initConfig(config);

					var context = platform.acquireContext(item, config);
					var canvas = context && context.canvas;
					var height = canvas && canvas.height;
					var width = canvas && canvas.width;

					instance.ctx = context;
					instance.canvas = canvas;
					instance.config = config;
					instance.width = width;
					instance.height = height;
					instance.aspectRatio = height ? width / height : null;

					me.id = helpers.uid();
					me.chart = instance;
					me.config = config;
					me.options = config.options;
					me._bufferedRender = false;

					// Add the chart instance to the global namespace
					Chart.instances[me.id] = me;

					Object.defineProperty(me, 'data', {
						get: function get() {
							return me.config.data;
						}
					});

					if (!context || !canvas) {
						// The given item is not a compatible context2d element, let's return before finalizing
						// the chart initialization but after setting basic chart / controller properties that
						// can help to figure out that the chart is not valid (e.g chart.canvas !== null);
						// https://github.com/chartjs/Chart.js/issues/2807
						console.error("Failed to create chart: can't acquire context from the given item");
						return me;
					}

					me.initialize();
					me.update();

					return me;
				};

				helpers.extend(Chart.Controller.prototype, /** @lends Chart.Controller.prototype */{
					initialize: function initialize() {
						var me = this;

						// Before init plugin notification
						plugins.notify(me, 'beforeInit');

						helpers.retinaScale(me.chart);

						me.bindEvents();

						if (me.options.responsive) {
							// Initial resize before chart draws (must be silent to preserve initial animations).
							me.resize(true);
						}

						// Make sure scales have IDs and are built before we build any controllers.
						me.ensureScalesHaveIDs();
						me.buildScales();
						me.initToolTip();

						// After init plugin notification
						plugins.notify(me, 'afterInit');

						return me;
					},

					clear: function clear() {
						helpers.clear(this.chart);
						return this;
					},

					stop: function stop() {
						// Stops any current animation loop occurring
						Chart.animationService.cancelAnimation(this);
						return this;
					},

					resize: function resize(silent) {
						var me = this;
						var chart = me.chart;
						var options = me.options;
						var canvas = chart.canvas;
						var aspectRatio = options.maintainAspectRatio && chart.aspectRatio || null;

						// the canvas render width and height will be casted to integers so make sure that
						// the canvas display style uses the same integer values to avoid blurring effect.
						var newWidth = Math.floor(helpers.getMaximumWidth(canvas));
						var newHeight = Math.floor(aspectRatio ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas));

						if (chart.width === newWidth && chart.height === newHeight) {
							return;
						}

						canvas.width = chart.width = newWidth;
						canvas.height = chart.height = newHeight;
						canvas.style.width = newWidth + 'px';
						canvas.style.height = newHeight + 'px';

						helpers.retinaScale(chart);

						if (!silent) {
							// Notify any plugins about the resize
							var newSize = { width: newWidth, height: newHeight };
							plugins.notify(me, 'resize', [newSize]);

							// Notify of resize
							if (me.options.onResize) {
								me.options.onResize(me, newSize);
							}

							me.stop();
							me.update(me.options.responsiveAnimationDuration);
						}
					},

					ensureScalesHaveIDs: function ensureScalesHaveIDs() {
						var options = this.options;
						var scalesOptions = options.scales || {};
						var scaleOptions = options.scale;

						helpers.each(scalesOptions.xAxes, function (xAxisOptions, index) {
							xAxisOptions.id = xAxisOptions.id || 'x-axis-' + index;
						});

						helpers.each(scalesOptions.yAxes, function (yAxisOptions, index) {
							yAxisOptions.id = yAxisOptions.id || 'y-axis-' + index;
						});

						if (scaleOptions) {
							scaleOptions.id = scaleOptions.id || 'scale';
						}
					},

					/**
      * Builds a map of scale ID to scale object for future lookup.
      */
					buildScales: function buildScales() {
						var me = this;
						var options = me.options;
						var scales = me.scales = {};
						var items = [];

						if (options.scales) {
							items = items.concat((options.scales.xAxes || []).map(function (xAxisOptions) {
								return { options: xAxisOptions, dtype: 'category' };
							}), (options.scales.yAxes || []).map(function (yAxisOptions) {
								return { options: yAxisOptions, dtype: 'linear' };
							}));
						}

						if (options.scale) {
							items.push({ options: options.scale, dtype: 'radialLinear', isDefault: true });
						}

						helpers.each(items, function (item) {
							var scaleOptions = item.options;
							var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
							var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
							if (!scaleClass) {
								return;
							}

							var scale = new scaleClass({
								id: scaleOptions.id,
								options: scaleOptions,
								ctx: me.chart.ctx,
								chart: me
							});

							scales[scale.id] = scale;

							// TODO(SB): I think we should be able to remove this custom case (options.scale)
							// and consider it as a regular scale part of the "scales"" map only! This would
							// make the logic easier and remove some useless? custom code.
							if (item.isDefault) {
								me.scale = scale;
							}
						});

						Chart.scaleService.addScalesToLayout(this);
					},

					buildOrUpdateControllers: function buildOrUpdateControllers() {
						var me = this;
						var types = [];
						var newControllers = [];

						helpers.each(me.data.datasets, function (dataset, datasetIndex) {
							var meta = me.getDatasetMeta(datasetIndex);
							if (!meta.type) {
								meta.type = dataset.type || me.config.type;
							}

							types.push(meta.type);

							if (meta.controller) {
								meta.controller.updateIndex(datasetIndex);
							} else {
								meta.controller = new Chart.controllers[meta.type](me, datasetIndex);
								newControllers.push(meta.controller);
							}
						}, me);

						if (types.length > 1) {
							for (var i = 1; i < types.length; i++) {
								if (types[i] !== types[i - 1]) {
									me.isCombo = true;
									break;
								}
							}
						}

						return newControllers;
					},

					/**
      * Reset the elements of all datasets
      * @private
      */
					resetElements: function resetElements() {
						var me = this;
						helpers.each(me.data.datasets, function (dataset, datasetIndex) {
							me.getDatasetMeta(datasetIndex).controller.reset();
						}, me);
					},

					/**
     * Resets the chart back to it's state before the initial animation
     */
					reset: function reset() {
						this.resetElements();
						this.tooltip.initialize();
					},

					update: function update(animationDuration, lazy) {
						var me = this;

						updateConfig(me);

						if (plugins.notify(me, 'beforeUpdate') === false) {
							return;
						}

						// In case the entire data object changed
						me.tooltip._data = me.data;

						// Make sure dataset controllers are updated and new controllers are reset
						var newControllers = me.buildOrUpdateControllers();

						// Make sure all dataset controllers have correct meta data counts
						helpers.each(me.data.datasets, function (dataset, datasetIndex) {
							me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
						}, me);

						me.updateLayout();

						// Can only reset the new controllers after the scales have been updated
						helpers.each(newControllers, function (controller) {
							controller.reset();
						});

						me.updateDatasets();

						// Do this before render so that any plugins that need final scale updates can use it
						plugins.notify(me, 'afterUpdate');

						if (me._bufferedRender) {
							me._bufferedRequest = {
								lazy: lazy,
								duration: animationDuration
							};
						} else {
							me.render(animationDuration, lazy);
						}
					},

					/**
      * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
      * hook, in which case, plugins will not be called on `afterLayout`.
      * @private
      */
					updateLayout: function updateLayout() {
						var me = this;

						if (plugins.notify(me, 'beforeLayout') === false) {
							return;
						}

						Chart.layoutService.update(this, this.chart.width, this.chart.height);

						/**
       * Provided for backward compatibility, use `afterLayout` instead.
       * @method IPlugin#afterScaleUpdate
       * @deprecated since version 2.5.0
       * @todo remove at version 3
       */
						plugins.notify(me, 'afterScaleUpdate');
						plugins.notify(me, 'afterLayout');
					},

					/**
      * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
      * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
      * @private
      */
					updateDatasets: function updateDatasets() {
						var me = this;

						if (plugins.notify(me, 'beforeDatasetsUpdate') === false) {
							return;
						}

						for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
							me.getDatasetMeta(i).controller.update();
						}

						plugins.notify(me, 'afterDatasetsUpdate');
					},

					render: function render(duration, lazy) {
						var me = this;

						if (plugins.notify(me, 'beforeRender') === false) {
							return;
						}

						var animationOptions = me.options.animation;
						var onComplete = function onComplete() {
							plugins.notify(me, 'afterRender');
							var callback = animationOptions && animationOptions.onComplete;
							if (callback && callback.call) {
								callback.call(me);
							}
						};

						if (animationOptions && (typeof duration !== 'undefined' && duration !== 0 || typeof duration === 'undefined' && animationOptions.duration !== 0)) {
							var animation = new Chart.Animation();
							animation.numSteps = (duration || animationOptions.duration) / 16.66; // 60 fps
							animation.easing = animationOptions.easing;

							// render function
							animation.render = function (chartInstance, animationObject) {
								var easingFunction = helpers.easingEffects[animationObject.easing];
								var stepDecimal = animationObject.currentStep / animationObject.numSteps;
								var easeDecimal = easingFunction(stepDecimal);

								chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
							};

							// user events
							animation.onAnimationProgress = animationOptions.onProgress;
							animation.onAnimationComplete = onComplete;

							Chart.animationService.addAnimation(me, animation, duration, lazy);
						} else {
							me.draw();
							onComplete();
						}

						return me;
					},

					draw: function draw(easingValue) {
						var me = this;

						me.clear();

						if (easingValue === undefined || easingValue === null) {
							easingValue = 1;
						}

						if (plugins.notify(me, 'beforeDraw', [easingValue]) === false) {
							return;
						}

						// Draw all the scales
						helpers.each(me.boxes, function (box) {
							box.draw(me.chartArea);
						}, me);

						if (me.scale) {
							me.scale.draw();
						}

						me.drawDatasets(easingValue);

						// Finally draw the tooltip
						me.tooltip.transition(easingValue).draw();

						plugins.notify(me, 'afterDraw', [easingValue]);
					},

					/**
      * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
      * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
      * @private
      */
					drawDatasets: function drawDatasets(easingValue) {
						var me = this;

						if (plugins.notify(me, 'beforeDatasetsDraw', [easingValue]) === false) {
							return;
						}

						// Draw each dataset via its respective controller (reversed to support proper line stacking)
						helpers.each(me.data.datasets, function (dataset, datasetIndex) {
							if (me.isDatasetVisible(datasetIndex)) {
								me.getDatasetMeta(datasetIndex).controller.draw(easingValue);
							}
						}, me, true);

						plugins.notify(me, 'afterDatasetsDraw', [easingValue]);
					},

					// Get the single element that was clicked on
					// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
					getElementAtEvent: function getElementAtEvent(e) {
						return Chart.Interaction.modes.single(this, e);
					},

					getElementsAtEvent: function getElementsAtEvent(e) {
						return Chart.Interaction.modes.label(this, e, { intersect: true });
					},

					getElementsAtXAxis: function getElementsAtXAxis(e) {
						return Chart.Interaction.modes['x-axis'](this, e, { intersect: true });
					},

					getElementsAtEventForMode: function getElementsAtEventForMode(e, mode, options) {
						var method = Chart.Interaction.modes[mode];
						if (typeof method === 'function') {
							return method(this, e, options);
						}

						return [];
					},

					getDatasetAtEvent: function getDatasetAtEvent(e) {
						return Chart.Interaction.modes.dataset(this, e, { intersect: true });
					},

					getDatasetMeta: function getDatasetMeta(datasetIndex) {
						var me = this;
						var dataset = me.data.datasets[datasetIndex];
						if (!dataset._meta) {
							dataset._meta = {};
						}

						var meta = dataset._meta[me.id];
						if (!meta) {
							meta = dataset._meta[me.id] = {
								type: null,
								data: [],
								dataset: null,
								controller: null,
								hidden: null, // See isDatasetVisible() comment
								xAxisID: null,
								yAxisID: null
							};
						}

						return meta;
					},

					getVisibleDatasetCount: function getVisibleDatasetCount() {
						var count = 0;
						for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
							if (this.isDatasetVisible(i)) {
								count++;
							}
						}
						return count;
					},

					isDatasetVisible: function isDatasetVisible(datasetIndex) {
						var meta = this.getDatasetMeta(datasetIndex);

						// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
						// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
						return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
					},

					generateLegend: function generateLegend() {
						return this.options.legendCallback(this);
					},

					destroy: function destroy() {
						var me = this;
						var canvas = me.chart.canvas;
						var meta, i, ilen;

						me.stop();

						// dataset controllers need to cleanup associated data
						for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
							meta = me.getDatasetMeta(i);
							if (meta.controller) {
								meta.controller.destroy();
								meta.controller = null;
							}
						}

						if (canvas) {
							me.unbindEvents();
							helpers.clear(me.chart);
							platform.releaseContext(me.chart.ctx);
							me.chart.canvas = null;
							me.chart.ctx = null;
						}

						plugins.notify(me, 'destroy');

						delete Chart.instances[me.id];
					},

					toBase64Image: function toBase64Image() {
						return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
					},

					initToolTip: function initToolTip() {
						var me = this;
						me.tooltip = new Chart.Tooltip({
							_chart: me.chart,
							_chartInstance: me,
							_data: me.data,
							_options: me.options.tooltips
						}, me);
						me.tooltip.initialize();
					},

					/**
      * @private
      */
					bindEvents: function bindEvents() {
						var me = this;
						var listeners = me._listeners = {};
						var listener = function listener() {
							me.eventHandler.apply(me, arguments);
						};

						helpers.each(me.options.events, function (type) {
							platform.addEventListener(me, type, listener);
							listeners[type] = listener;
						});

						// Responsiveness is currently based on the use of an iframe, however this method causes
						// performance issues and could be troublesome when used with ad blockers. So make sure
						// that the user is still able to create a chart without iframe when responsive is false.
						// See https://github.com/chartjs/Chart.js/issues/2210
						if (me.options.responsive) {
							listener = function listener() {
								me.resize();
							};

							platform.addEventListener(me, 'resize', listener);
							listeners.resize = listener;
						}
					},

					/**
      * @private
      */
					unbindEvents: function unbindEvents() {
						var me = this;
						var listeners = me._listeners;
						if (!listeners) {
							return;
						}

						delete me._listeners;
						helpers.each(listeners, function (listener, type) {
							platform.removeEventListener(me, type, listener);
						});
					},

					updateHoverStyle: function updateHoverStyle(elements, mode, enabled) {
						var method = enabled ? 'setHoverStyle' : 'removeHoverStyle';
						var element, i, ilen;

						for (i = 0, ilen = elements.length; i < ilen; ++i) {
							element = elements[i];
							if (element) {
								this.getDatasetMeta(element._datasetIndex).controller[method](element);
							}
						}
					},

					/**
      * @private
      */
					eventHandler: function eventHandler(e) {
						var me = this;
						var tooltip = me.tooltip;

						if (plugins.notify(me, 'beforeEvent', [e]) === false) {
							return;
						}

						// Buffer any update calls so that renders do not occur
						me._bufferedRender = true;
						me._bufferedRequest = null;

						var changed = me.handleEvent(e);
						changed |= tooltip && tooltip.handleEvent(e);

						plugins.notify(me, 'afterEvent', [e]);

						var bufferedRequest = me._bufferedRequest;
						if (bufferedRequest) {
							// If we have an update that was triggered, we need to do a normal render
							me.render(bufferedRequest.duration, bufferedRequest.lazy);
						} else if (changed && !me.animating) {
							// If entering, leaving, or changing elements, animate the change via pivot
							me.stop();

							// We only need to render at this point. Updating will cause scales to be
							// recomputed generating flicker & using more memory than necessary.
							me.render(me.options.hover.animationDuration, true);
						}

						me._bufferedRender = false;
						me._bufferedRequest = null;

						return me;
					},

					/**
      * Handle an event
      * @private
      * @param {IEvent} event the event to handle
      * @return {Boolean} true if the chart needs to re-render
      */
					handleEvent: function handleEvent(e) {
						var me = this;
						var options = me.options || {};
						var hoverOptions = options.hover;
						var changed = false;

						me.lastActive = me.lastActive || [];

						// Find Active Elements for hover and tooltips
						if (e.type === 'mouseout') {
							me.active = [];
						} else {
							me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
						}

						// On Hover hook
						if (hoverOptions.onHover) {
							// Need to call with native event here to not break backwards compatibility
							hoverOptions.onHover.call(me, e.native, me.active);
						}

						if (e.type === 'mouseup' || e.type === 'click') {
							if (options.onClick) {
								// Use e.native here for backwards compatibility
								options.onClick.call(me, e.native, me.active);
							}
						}

						// Remove styling for last active (even if it may still be active)
						if (me.lastActive.length) {
							me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
						}

						// Built in hover styling
						if (me.active.length && hoverOptions.mode) {
							me.updateHoverStyle(me.active, hoverOptions.mode, true);
						}

						changed = !helpers.arrayEquals(me.active, me.lastActive);

						// Remember Last Actives
						me.lastActive = me.active;

						return changed;
					}
				});
			};
		}, {}], 24: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];

				/**
     * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
     * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
     * called on the 'onData*' callbacks (e.g. onDataPush, etc.) with same arguments.
     */
				function listenArrayEvents(array, listener) {
					if (array._chartjs) {
						array._chartjs.listeners.push(listener);
						return;
					}

					Object.defineProperty(array, '_chartjs', {
						configurable: true,
						enumerable: false,
						value: {
							listeners: [listener]
						}
					});

					arrayEvents.forEach(function (key) {
						var method = 'onData' + key.charAt(0).toUpperCase() + key.slice(1);
						var base = array[key];

						Object.defineProperty(array, key, {
							configurable: true,
							enumerable: false,
							value: function value() {
								var args = Array.prototype.slice.call(arguments);
								var res = base.apply(this, args);

								helpers.each(array._chartjs.listeners, function (object) {
									if (typeof object[method] === 'function') {
										object[method].apply(object, args);
									}
								});

								return res;
							}
						});
					});
				}

				/**
     * Removes the given array event listener and cleanup extra attached properties (such as
     * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
     */
				function unlistenArrayEvents(array, listener) {
					var stub = array._chartjs;
					if (!stub) {
						return;
					}

					var listeners = stub.listeners;
					var index = listeners.indexOf(listener);
					if (index !== -1) {
						listeners.splice(index, 1);
					}

					if (listeners.length > 0) {
						return;
					}

					arrayEvents.forEach(function (key) {
						delete array[key];
					});

					delete array._chartjs;
				}

				// Base class for all dataset controllers (line, bar, etc)
				Chart.DatasetController = function (chart, datasetIndex) {
					this.initialize(chart, datasetIndex);
				};

				helpers.extend(Chart.DatasetController.prototype, {

					/**
      * Element type used to generate a meta dataset (e.g. Chart.element.Line).
      * @type {Chart.core.element}
      */
					datasetElementType: null,

					/**
      * Element type used to generate a meta data (e.g. Chart.element.Point).
      * @type {Chart.core.element}
      */
					dataElementType: null,

					initialize: function initialize(chart, datasetIndex) {
						var me = this;
						me.chart = chart;
						me.index = datasetIndex;
						me.linkScales();
						me.addElements();
					},

					updateIndex: function updateIndex(datasetIndex) {
						this.index = datasetIndex;
					},

					linkScales: function linkScales() {
						var me = this;
						var meta = me.getMeta();
						var dataset = me.getDataset();

						if (meta.xAxisID === null) {
							meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
						}
						if (meta.yAxisID === null) {
							meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
						}
					},

					getDataset: function getDataset() {
						return this.chart.data.datasets[this.index];
					},

					getMeta: function getMeta() {
						return this.chart.getDatasetMeta(this.index);
					},

					getScaleForId: function getScaleForId(scaleID) {
						return this.chart.scales[scaleID];
					},

					reset: function reset() {
						this.update(true);
					},

					/**
      * @private
      */
					destroy: function destroy() {
						if (this._data) {
							unlistenArrayEvents(this._data, this);
						}
					},

					createMetaDataset: function createMetaDataset() {
						var me = this;
						var type = me.datasetElementType;
						return type && new type({
							_chart: me.chart.chart,
							_datasetIndex: me.index
						});
					},

					createMetaData: function createMetaData(index) {
						var me = this;
						var type = me.dataElementType;
						return type && new type({
							_chart: me.chart.chart,
							_datasetIndex: me.index,
							_index: index
						});
					},

					addElements: function addElements() {
						var me = this;
						var meta = me.getMeta();
						var data = me.getDataset().data || [];
						var metaData = meta.data;
						var i, ilen;

						for (i = 0, ilen = data.length; i < ilen; ++i) {
							metaData[i] = metaData[i] || me.createMetaData(i);
						}

						meta.dataset = meta.dataset || me.createMetaDataset();
					},

					addElementAndReset: function addElementAndReset(index) {
						var element = this.createMetaData(index);
						this.getMeta().data.splice(index, 0, element);
						this.updateElement(element, index, true);
					},

					buildOrUpdateElements: function buildOrUpdateElements() {
						var me = this;
						var dataset = me.getDataset();
						var data = dataset.data || (dataset.data = []);

						// In order to correctly handle data addition/deletion animation (an thus simulate
						// real-time charts), we need to monitor these data modifications and synchronize
						// the internal meta data accordingly.
						if (me._data !== data) {
							if (me._data) {
								// This case happens when the user replaced the data array instance.
								unlistenArrayEvents(me._data, me);
							}

							listenArrayEvents(data, me);
							me._data = data;
						}

						// Re-sync meta data in case the user replaced the data array or if we missed
						// any updates and so make sure that we handle number of datapoints changing.
						me.resyncElements();
					},

					update: helpers.noop,

					draw: function draw(ease) {
						var easingDecimal = ease || 1;
						var i, len;
						var metaData = this.getMeta().data;
						for (i = 0, len = metaData.length; i < len; ++i) {
							metaData[i].transition(easingDecimal).draw();
						}
					},

					removeHoverStyle: function removeHoverStyle(element, elementOpts) {
						var dataset = this.chart.data.datasets[element._datasetIndex],
						    index = element._index,
						    custom = element.custom || {},
						    valueOrDefault = helpers.getValueAtIndexOrDefault,
						    model = element._model;

						model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
						model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
						model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
					},

					setHoverStyle: function setHoverStyle(element) {
						var dataset = this.chart.data.datasets[element._datasetIndex],
						    index = element._index,
						    custom = element.custom || {},
						    valueOrDefault = helpers.getValueAtIndexOrDefault,
						    getHoverColor = helpers.getHoverColor,
						    model = element._model;

						model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
						model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
						model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
					},

					/**
      * @private
      */
					resyncElements: function resyncElements() {
						var me = this;
						var meta = me.getMeta();
						var data = me.getDataset().data;
						var numMeta = meta.data.length;
						var numData = data.length;

						if (numData < numMeta) {
							meta.data.splice(numData, numMeta - numData);
						} else if (numData > numMeta) {
							me.insertElements(numMeta, numData - numMeta);
						}
					},

					/**
      * @private
      */
					insertElements: function insertElements(start, count) {
						for (var i = 0; i < count; ++i) {
							this.addElementAndReset(start + i);
						}
					},

					/**
      * @private
      */
					onDataPush: function onDataPush() {
						this.insertElements(this.getDataset().data.length - 1, arguments.length);
					},

					/**
      * @private
      */
					onDataPop: function onDataPop() {
						this.getMeta().data.pop();
					},

					/**
      * @private
      */
					onDataShift: function onDataShift() {
						this.getMeta().data.shift();
					},

					/**
      * @private
      */
					onDataSplice: function onDataSplice(start, count) {
						this.getMeta().data.splice(start, count);
						this.insertElements(start, arguments.length - 2);
					},

					/**
      * @private
      */
					onDataUnshift: function onDataUnshift() {
						this.insertElements(0, arguments.length);
					}
				});

				Chart.DatasetController.extend = helpers.inherits;
			};
		}, {}], 25: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.elements = {};

				Chart.Element = function (configuration) {
					helpers.extend(this, configuration);
					this.initialize.apply(this, arguments);
				};

				helpers.extend(Chart.Element.prototype, {

					initialize: function initialize() {
						this.hidden = false;
					},

					pivot: function pivot() {
						var me = this;
						if (!me._view) {
							me._view = helpers.clone(me._model);
						}
						me._start = helpers.clone(me._view);
						return me;
					},

					transition: function transition(ease) {
						var me = this;

						if (!me._view) {
							me._view = helpers.clone(me._model);
						}

						// No animation -> No Transition
						if (ease === 1) {
							me._view = me._model;
							me._start = null;
							return me;
						}

						if (!me._start) {
							me.pivot();
						}

						helpers.each(me._model, function (value, key) {

							if (key[0] === '_') {
								// Only non-underscored properties
								// Init if doesn't exist
							} else if (!me._view.hasOwnProperty(key)) {
								if (typeof value === 'number' && !isNaN(me._view[key])) {
									me._view[key] = value * ease;
								} else {
									me._view[key] = value;
								}
								// No unnecessary computations
							} else if (value === me._view[key]) {
								// It's the same! Woohoo!
								// Color transitions if possible
							} else if (typeof value === 'string') {
								try {
									var color = helpers.color(me._model[key]).mix(helpers.color(me._start[key]), ease);
									me._view[key] = color.rgbString();
								} catch (err) {
									me._view[key] = value;
								}
								// Number transitions
							} else if (typeof value === 'number') {
								var startVal = me._start[key] !== undefined && isNaN(me._start[key]) === false ? me._start[key] : 0;
								me._view[key] = (me._model[key] - startVal) * ease + startVal;
								// Everything else
							} else {
								me._view[key] = value;
							}
						}, me);

						return me;
					},

					tooltipPosition: function tooltipPosition() {
						return {
							x: this._model.x,
							y: this._model.y
						};
					},

					hasValue: function hasValue() {
						return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
					}
				});

				Chart.Element.extend = helpers.inherits;
			};
		}, {}], 26: [function (require, module, exports) {
			/* global window: false */
			/* global document: false */
			'use strict';

			var color = require(3);

			module.exports = function (Chart) {
				// Global Chart helpers object for utility methods and classes
				var helpers = Chart.helpers = {};

				// -- Basic js utility methods
				helpers.each = function (loopable, callback, self, reverse) {
					// Check to see if null or undefined firstly.
					var i, len;
					if (helpers.isArray(loopable)) {
						len = loopable.length;
						if (reverse) {
							for (i = len - 1; i >= 0; i--) {
								callback.call(self, loopable[i], i);
							}
						} else {
							for (i = 0; i < len; i++) {
								callback.call(self, loopable[i], i);
							}
						}
					} else if ((typeof loopable === "undefined" ? "undefined" : _typeof(loopable)) === 'object') {
						var keys = Object.keys(loopable);
						len = keys.length;
						for (i = 0; i < len; i++) {
							callback.call(self, loopable[keys[i]], keys[i]);
						}
					}
				};
				helpers.clone = function (obj) {
					var objClone = {};
					helpers.each(obj, function (value, key) {
						if (helpers.isArray(value)) {
							objClone[key] = value.slice(0);
						} else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && value !== null) {
							objClone[key] = helpers.clone(value);
						} else {
							objClone[key] = value;
						}
					});
					return objClone;
				};
				helpers.extend = function (base) {
					var setFn = function setFn(value, key) {
						base[key] = value;
					};
					for (var i = 1, ilen = arguments.length; i < ilen; i++) {
						helpers.each(arguments[i], setFn);
					}
					return base;
				};
				// Need a special merge function to chart configs since they are now grouped
				helpers.configMerge = function (_base) {
					var base = helpers.clone(_base);
					helpers.each(Array.prototype.slice.call(arguments, 1), function (extension) {
						helpers.each(extension, function (value, key) {
							var baseHasProperty = base.hasOwnProperty(key);
							var baseVal = baseHasProperty ? base[key] : {};

							if (key === 'scales') {
								// Scale config merging is complex. Add our own function here for that
								base[key] = helpers.scaleMerge(baseVal, value);
							} else if (key === 'scale') {
								// Used in polar area & radar charts since there is only one scale
								base[key] = helpers.configMerge(baseVal, Chart.scaleService.getScaleDefaults(value.type), value);
							} else if (baseHasProperty && (typeof baseVal === "undefined" ? "undefined" : _typeof(baseVal)) === 'object' && !helpers.isArray(baseVal) && baseVal !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && !helpers.isArray(value)) {
								// If we are overwriting an object with an object, do a merge of the properties.
								base[key] = helpers.configMerge(baseVal, value);
							} else {
								// can just overwrite the value in this case
								base[key] = value;
							}
						});
					});

					return base;
				};
				helpers.scaleMerge = function (_base, extension) {
					var base = helpers.clone(_base);

					helpers.each(extension, function (value, key) {
						if (key === 'xAxes' || key === 'yAxes') {
							// These properties are arrays of items
							if (base.hasOwnProperty(key)) {
								helpers.each(value, function (valueObj, index) {
									var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
									var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
									if (index >= base[key].length || !base[key][index].type) {
										base[key].push(helpers.configMerge(axisDefaults, valueObj));
									} else if (valueObj.type && valueObj.type !== base[key][index].type) {
										// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
										base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
									} else {
										// Type is the same
										base[key][index] = helpers.configMerge(base[key][index], valueObj);
									}
								});
							} else {
								base[key] = [];
								helpers.each(value, function (valueObj) {
									var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
									base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
								});
							}
						} else if (base.hasOwnProperty(key) && _typeof(base[key]) === 'object' && base[key] !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
							// If we are overwriting an object with an object, do a merge of the properties.
							base[key] = helpers.configMerge(base[key], value);
						} else {
							// can just overwrite the value in this case
							base[key] = value;
						}
					});

					return base;
				};
				helpers.getValueAtIndexOrDefault = function (value, index, defaultValue) {
					if (value === undefined || value === null) {
						return defaultValue;
					}

					if (helpers.isArray(value)) {
						return index < value.length ? value[index] : defaultValue;
					}

					return value;
				};
				helpers.getValueOrDefault = function (value, defaultValue) {
					return value === undefined ? defaultValue : value;
				};
				helpers.indexOf = Array.prototype.indexOf ? function (array, item) {
					return array.indexOf(item);
				} : function (array, item) {
					for (var i = 0, ilen = array.length; i < ilen; ++i) {
						if (array[i] === item) {
							return i;
						}
					}
					return -1;
				};
				helpers.where = function (collection, filterCallback) {
					if (helpers.isArray(collection) && Array.prototype.filter) {
						return collection.filter(filterCallback);
					}
					var filtered = [];

					helpers.each(collection, function (item) {
						if (filterCallback(item)) {
							filtered.push(item);
						}
					});

					return filtered;
				};
				helpers.findIndex = Array.prototype.findIndex ? function (array, callback, scope) {
					return array.findIndex(callback, scope);
				} : function (array, callback, scope) {
					scope = scope === undefined ? array : scope;
					for (var i = 0, ilen = array.length; i < ilen; ++i) {
						if (callback.call(scope, array[i], i, array)) {
							return i;
						}
					}
					return -1;
				};
				helpers.findNextWhere = function (arrayToSearch, filterCallback, startIndex) {
					// Default to start of the array
					if (startIndex === undefined || startIndex === null) {
						startIndex = -1;
					}
					for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
						var currentItem = arrayToSearch[i];
						if (filterCallback(currentItem)) {
							return currentItem;
						}
					}
				};
				helpers.findPreviousWhere = function (arrayToSearch, filterCallback, startIndex) {
					// Default to end of the array
					if (startIndex === undefined || startIndex === null) {
						startIndex = arrayToSearch.length;
					}
					for (var i = startIndex - 1; i >= 0; i--) {
						var currentItem = arrayToSearch[i];
						if (filterCallback(currentItem)) {
							return currentItem;
						}
					}
				};
				helpers.inherits = function (extensions) {
					// Basic javascript inheritance based on the model created in Backbone.js
					var me = this;
					var ChartElement = extensions && extensions.hasOwnProperty('constructor') ? extensions.constructor : function () {
						return me.apply(this, arguments);
					};

					var Surrogate = function Surrogate() {
						this.constructor = ChartElement;
					};
					Surrogate.prototype = me.prototype;
					ChartElement.prototype = new Surrogate();

					ChartElement.extend = helpers.inherits;

					if (extensions) {
						helpers.extend(ChartElement.prototype, extensions);
					}

					ChartElement.__super__ = me.prototype;

					return ChartElement;
				};
				helpers.noop = function () {};
				helpers.uid = function () {
					var id = 0;
					return function () {
						return id++;
					};
				}();
				// -- Math methods
				helpers.isNumber = function (n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				};
				helpers.almostEquals = function (x, y, epsilon) {
					return Math.abs(x - y) < epsilon;
				};
				helpers.almostWhole = function (x, epsilon) {
					var rounded = Math.round(x);
					return rounded - epsilon < x && rounded + epsilon > x;
				};
				helpers.max = function (array) {
					return array.reduce(function (max, value) {
						if (!isNaN(value)) {
							return Math.max(max, value);
						}
						return max;
					}, Number.NEGATIVE_INFINITY);
				};
				helpers.min = function (array) {
					return array.reduce(function (min, value) {
						if (!isNaN(value)) {
							return Math.min(min, value);
						}
						return min;
					}, Number.POSITIVE_INFINITY);
				};
				helpers.sign = Math.sign ? function (x) {
					return Math.sign(x);
				} : function (x) {
					x = +x; // convert to a number
					if (x === 0 || isNaN(x)) {
						return x;
					}
					return x > 0 ? 1 : -1;
				};
				helpers.log10 = Math.log10 ? function (x) {
					return Math.log10(x);
				} : function (x) {
					return Math.log(x) / Math.LN10;
				};
				helpers.toRadians = function (degrees) {
					return degrees * (Math.PI / 180);
				};
				helpers.toDegrees = function (radians) {
					return radians * (180 / Math.PI);
				};
				// Gets the angle from vertical upright to the point about a centre.
				helpers.getAngleFromPoint = function (centrePoint, anglePoint) {
					var distanceFromXCenter = anglePoint.x - centrePoint.x,
					    distanceFromYCenter = anglePoint.y - centrePoint.y,
					    radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

					var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

					if (angle < -0.5 * Math.PI) {
						angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
					}

					return {
						angle: angle,
						distance: radialDistanceFromCenter
					};
				};
				helpers.distanceBetweenPoints = function (pt1, pt2) {
					return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
				};
				helpers.aliasPixel = function (pixelWidth) {
					return pixelWidth % 2 === 0 ? 0 : 0.5;
				};
				helpers.splineCurve = function (firstPoint, middlePoint, afterPoint, t) {
					// Props to Rob Spencer at scaled innovation for his post on splining between points
					// http://scaledinnovation.com/analytics/splines/aboutSplines.html

					// This function must also respect "skipped" points

					var previous = firstPoint.skip ? middlePoint : firstPoint,
					    current = middlePoint,
					    next = afterPoint.skip ? middlePoint : afterPoint;

					var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
					var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

					var s01 = d01 / (d01 + d12);
					var s12 = d12 / (d01 + d12);

					// If all points are the same, s01 & s02 will be inf
					s01 = isNaN(s01) ? 0 : s01;
					s12 = isNaN(s12) ? 0 : s12;

					var fa = t * s01; // scaling factor for triangle Ta
					var fb = t * s12;

					return {
						previous: {
							x: current.x - fa * (next.x - previous.x),
							y: current.y - fa * (next.y - previous.y)
						},
						next: {
							x: current.x + fb * (next.x - previous.x),
							y: current.y + fb * (next.y - previous.y)
						}
					};
				};
				helpers.EPSILON = Number.EPSILON || 1e-14;
				helpers.splineCurveMonotone = function (points) {
					// This function calculates Bézier control points in a similar way than |splineCurve|,
					// but preserves monotonicity of the provided data and ensures no local extremums are added
					// between the dataset discrete points due to the interpolation.
					// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

					var pointsWithTangents = (points || []).map(function (point) {
						return {
							model: point._model,
							deltaK: 0,
							mK: 0
						};
					});

					// Calculate slopes (deltaK) and initialize tangents (mK)
					var pointsLen = pointsWithTangents.length;
					var i, pointBefore, pointCurrent, pointAfter;
					for (i = 0; i < pointsLen; ++i) {
						pointCurrent = pointsWithTangents[i];
						if (pointCurrent.model.skip) {
							continue;
						}

						pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
						pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
						if (pointAfter && !pointAfter.model.skip) {
							var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x;

							// In the case of two points that appear at the same x pixel, slopeDeltaX is 0
							pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
						}

						if (!pointBefore || pointBefore.model.skip) {
							pointCurrent.mK = pointCurrent.deltaK;
						} else if (!pointAfter || pointAfter.model.skip) {
							pointCurrent.mK = pointBefore.deltaK;
						} else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
							pointCurrent.mK = 0;
						} else {
							pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
						}
					}

					// Adjust tangents to ensure monotonic properties
					var alphaK, betaK, tauK, squaredMagnitude;
					for (i = 0; i < pointsLen - 1; ++i) {
						pointCurrent = pointsWithTangents[i];
						pointAfter = pointsWithTangents[i + 1];
						if (pointCurrent.model.skip || pointAfter.model.skip) {
							continue;
						}

						if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
							pointCurrent.mK = pointAfter.mK = 0;
							continue;
						}

						alphaK = pointCurrent.mK / pointCurrent.deltaK;
						betaK = pointAfter.mK / pointCurrent.deltaK;
						squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
						if (squaredMagnitude <= 9) {
							continue;
						}

						tauK = 3 / Math.sqrt(squaredMagnitude);
						pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
						pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
					}

					// Compute control points
					var deltaX;
					for (i = 0; i < pointsLen; ++i) {
						pointCurrent = pointsWithTangents[i];
						if (pointCurrent.model.skip) {
							continue;
						}

						pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
						pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
						if (pointBefore && !pointBefore.model.skip) {
							deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
							pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
							pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
						}
						if (pointAfter && !pointAfter.model.skip) {
							deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
							pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
							pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
						}
					}
				};
				helpers.nextItem = function (collection, index, loop) {
					if (loop) {
						return index >= collection.length - 1 ? collection[0] : collection[index + 1];
					}
					return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
				};
				helpers.previousItem = function (collection, index, loop) {
					if (loop) {
						return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
					}
					return index <= 0 ? collection[0] : collection[index - 1];
				};
				// Implementation of the nice number algorithm used in determining where axis labels will go
				helpers.niceNum = function (range, round) {
					var exponent = Math.floor(helpers.log10(range));
					var fraction = range / Math.pow(10, exponent);
					var niceFraction;

					if (round) {
						if (fraction < 1.5) {
							niceFraction = 1;
						} else if (fraction < 3) {
							niceFraction = 2;
						} else if (fraction < 7) {
							niceFraction = 5;
						} else {
							niceFraction = 10;
						}
					} else if (fraction <= 1.0) {
						niceFraction = 1;
					} else if (fraction <= 2) {
						niceFraction = 2;
					} else if (fraction <= 5) {
						niceFraction = 5;
					} else {
						niceFraction = 10;
					}

					return niceFraction * Math.pow(10, exponent);
				};
				// Easing functions adapted from Robert Penner's easing equations
				// http://www.robertpenner.com/easing/
				var easingEffects = helpers.easingEffects = {
					linear: function linear(t) {
						return t;
					},
					easeInQuad: function easeInQuad(t) {
						return t * t;
					},
					easeOutQuad: function easeOutQuad(t) {
						return -1 * t * (t - 2);
					},
					easeInOutQuad: function easeInOutQuad(t) {
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * t * t;
						}
						return -1 / 2 * (--t * (t - 2) - 1);
					},
					easeInCubic: function easeInCubic(t) {
						return t * t * t;
					},
					easeOutCubic: function easeOutCubic(t) {
						return 1 * ((t = t / 1 - 1) * t * t + 1);
					},
					easeInOutCubic: function easeInOutCubic(t) {
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * t * t * t;
						}
						return 1 / 2 * ((t -= 2) * t * t + 2);
					},
					easeInQuart: function easeInQuart(t) {
						return t * t * t * t;
					},
					easeOutQuart: function easeOutQuart(t) {
						return -1 * ((t = t / 1 - 1) * t * t * t - 1);
					},
					easeInOutQuart: function easeInOutQuart(t) {
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * t * t * t * t;
						}
						return -1 / 2 * ((t -= 2) * t * t * t - 2);
					},
					easeInQuint: function easeInQuint(t) {
						return 1 * (t /= 1) * t * t * t * t;
					},
					easeOutQuint: function easeOutQuint(t) {
						return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
					},
					easeInOutQuint: function easeInOutQuint(t) {
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * t * t * t * t * t;
						}
						return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
					},
					easeInSine: function easeInSine(t) {
						return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
					},
					easeOutSine: function easeOutSine(t) {
						return 1 * Math.sin(t / 1 * (Math.PI / 2));
					},
					easeInOutSine: function easeInOutSine(t) {
						return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
					},
					easeInExpo: function easeInExpo(t) {
						return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
					},
					easeOutExpo: function easeOutExpo(t) {
						return t === 1 ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
					},
					easeInOutExpo: function easeInOutExpo(t) {
						if (t === 0) {
							return 0;
						}
						if (t === 1) {
							return 1;
						}
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * Math.pow(2, 10 * (t - 1));
						}
						return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
					},
					easeInCirc: function easeInCirc(t) {
						if (t >= 1) {
							return t;
						}
						return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
					},
					easeOutCirc: function easeOutCirc(t) {
						return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
					},
					easeInOutCirc: function easeInOutCirc(t) {
						if ((t /= 1 / 2) < 1) {
							return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
						}
						return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
					},
					easeInElastic: function easeInElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}
						if ((t /= 1) === 1) {
							return 1;
						}
						if (!p) {
							p = 1 * 0.3;
						}
						if (a < Math.abs(1)) {
							a = 1;
							s = p / 4;
						} else {
							s = p / (2 * Math.PI) * Math.asin(1 / a);
						}
						return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
					},
					easeOutElastic: function easeOutElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}
						if ((t /= 1) === 1) {
							return 1;
						}
						if (!p) {
							p = 1 * 0.3;
						}
						if (a < Math.abs(1)) {
							a = 1;
							s = p / 4;
						} else {
							s = p / (2 * Math.PI) * Math.asin(1 / a);
						}
						return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
					},
					easeInOutElastic: function easeInOutElastic(t) {
						var s = 1.70158;
						var p = 0;
						var a = 1;
						if (t === 0) {
							return 0;
						}
						if ((t /= 1 / 2) === 2) {
							return 1;
						}
						if (!p) {
							p = 1 * (0.3 * 1.5);
						}
						if (a < Math.abs(1)) {
							a = 1;
							s = p / 4;
						} else {
							s = p / (2 * Math.PI) * Math.asin(1 / a);
						}
						if (t < 1) {
							return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
						}
						return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
					},
					easeInBack: function easeInBack(t) {
						var s = 1.70158;
						return 1 * (t /= 1) * t * ((s + 1) * t - s);
					},
					easeOutBack: function easeOutBack(t) {
						var s = 1.70158;
						return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
					},
					easeInOutBack: function easeInOutBack(t) {
						var s = 1.70158;
						if ((t /= 1 / 2) < 1) {
							return 1 / 2 * (t * t * (((s *= 1.525) + 1) * t - s));
						}
						return 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
					},
					easeInBounce: function easeInBounce(t) {
						return 1 - easingEffects.easeOutBounce(1 - t);
					},
					easeOutBounce: function easeOutBounce(t) {
						if ((t /= 1) < 1 / 2.75) {
							return 1 * (7.5625 * t * t);
						} else if (t < 2 / 2.75) {
							return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
						} else if (t < 2.5 / 2.75) {
							return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
						}
						return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
					},
					easeInOutBounce: function easeInOutBounce(t) {
						if (t < 1 / 2) {
							return easingEffects.easeInBounce(t * 2) * 0.5;
						}
						return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
					}
				};
				// Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
				helpers.requestAnimFrame = function () {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
						return window.setTimeout(callback, 1000 / 60);
					};
				}();
				// -- DOM methods
				helpers.getRelativePosition = function (evt, chart) {
					var mouseX, mouseY;
					var e = evt.originalEvent || evt,
					    canvas = evt.currentTarget || evt.srcElement,
					    boundingRect = canvas.getBoundingClientRect();

					var touches = e.touches;
					if (touches && touches.length > 0) {
						mouseX = touches[0].clientX;
						mouseY = touches[0].clientY;
					} else {
						mouseX = e.clientX;
						mouseY = e.clientY;
					}

					// Scale mouse coordinates into canvas coordinates
					// by following the pattern laid out by 'jerryj' in the comments of
					// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
					var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
					var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
					var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
					var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
					var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
					var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

					// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
					// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
					mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvas.width / chart.currentDevicePixelRatio);
					mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvas.height / chart.currentDevicePixelRatio);

					return {
						x: mouseX,
						y: mouseY
					};
				};
				helpers.addEvent = function (node, eventType, method) {
					if (node.addEventListener) {
						node.addEventListener(eventType, method);
					} else if (node.attachEvent) {
						node.attachEvent('on' + eventType, method);
					} else {
						node['on' + eventType] = method;
					}
				};
				helpers.removeEvent = function (node, eventType, handler) {
					if (node.removeEventListener) {
						node.removeEventListener(eventType, handler, false);
					} else if (node.detachEvent) {
						node.detachEvent('on' + eventType, handler);
					} else {
						node['on' + eventType] = helpers.noop;
					}
				};

				// Private helper function to convert max-width/max-height values that may be percentages into a number
				function parseMaxStyle(styleValue, node, parentProperty) {
					var valueInPixels;
					if (typeof styleValue === 'string') {
						valueInPixels = parseInt(styleValue, 10);

						if (styleValue.indexOf('%') !== -1) {
							// percentage * size in dimension
							valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
						}
					} else {
						valueInPixels = styleValue;
					}

					return valueInPixels;
				}

				/**
     * Returns if the given value contains an effective constraint.
     * @private
     */
				function isConstrainedValue(value) {
					return value !== undefined && value !== null && value !== 'none';
				}

				// Private helper to get a constraint dimension
				// @param domNode : the node to check the constraint on
				// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
				// @param percentageProperty : property of parent to use when calculating width as a percentage
				// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
				function getConstraintDimension(domNode, maxStyle, percentageProperty) {
					var view = document.defaultView;
					var parentNode = domNode.parentNode;
					var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
					var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
					var hasCNode = isConstrainedValue(constrainedNode);
					var hasCContainer = isConstrainedValue(constrainedContainer);
					var infinity = Number.POSITIVE_INFINITY;

					if (hasCNode || hasCContainer) {
						return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
					}

					return 'none';
				}
				// returns Number or undefined if no constraint
				helpers.getConstraintWidth = function (domNode) {
					return getConstraintDimension(domNode, 'max-width', 'clientWidth');
				};
				// returns Number or undefined if no constraint
				helpers.getConstraintHeight = function (domNode) {
					return getConstraintDimension(domNode, 'max-height', 'clientHeight');
				};
				helpers.getMaximumWidth = function (domNode) {
					var container = domNode.parentNode;
					var paddingLeft = parseInt(helpers.getStyle(container, 'padding-left'), 10);
					var paddingRight = parseInt(helpers.getStyle(container, 'padding-right'), 10);
					var w = container.clientWidth - paddingLeft - paddingRight;
					var cw = helpers.getConstraintWidth(domNode);
					return isNaN(cw) ? w : Math.min(w, cw);
				};
				helpers.getMaximumHeight = function (domNode) {
					var container = domNode.parentNode;
					var paddingTop = parseInt(helpers.getStyle(container, 'padding-top'), 10);
					var paddingBottom = parseInt(helpers.getStyle(container, 'padding-bottom'), 10);
					var h = container.clientHeight - paddingTop - paddingBottom;
					var ch = helpers.getConstraintHeight(domNode);
					return isNaN(ch) ? h : Math.min(h, ch);
				};
				helpers.getStyle = function (el, property) {
					return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
				};
				helpers.retinaScale = function (chart) {
					var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;
					if (pixelRatio === 1) {
						return;
					}

					var canvas = chart.canvas;
					var height = chart.height;
					var width = chart.width;

					canvas.height = height * pixelRatio;
					canvas.width = width * pixelRatio;
					chart.ctx.scale(pixelRatio, pixelRatio);

					// If no style has been set on the canvas, the render size is used as display size,
					// making the chart visually bigger, so let's enforce it to the "correct" values.
					// See https://github.com/chartjs/Chart.js/issues/3575
					canvas.style.height = height + 'px';
					canvas.style.width = width + 'px';
				};
				// -- Canvas methods
				helpers.clear = function (chart) {
					chart.ctx.clearRect(0, 0, chart.width, chart.height);
				};
				helpers.fontString = function (pixelSize, fontStyle, fontFamily) {
					return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
				};
				helpers.longestText = function (ctx, font, arrayOfThings, cache) {
					cache = cache || {};
					var data = cache.data = cache.data || {};
					var gc = cache.garbageCollect = cache.garbageCollect || [];

					if (cache.font !== font) {
						data = cache.data = {};
						gc = cache.garbageCollect = [];
						cache.font = font;
					}

					ctx.font = font;
					var longest = 0;
					helpers.each(arrayOfThings, function (thing) {
						// Undefined strings and arrays should not be measured
						if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
							longest = helpers.measureText(ctx, data, gc, longest, thing);
						} else if (helpers.isArray(thing)) {
							// if it is an array lets measure each element
							// to do maybe simplify this function a bit so we can do this more recursively?
							helpers.each(thing, function (nestedThing) {
								// Undefined strings and arrays should not be measured
								if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
									longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
								}
							});
						}
					});

					var gcLen = gc.length / 2;
					if (gcLen > arrayOfThings.length) {
						for (var i = 0; i < gcLen; i++) {
							delete data[gc[i]];
						}
						gc.splice(0, gcLen);
					}
					return longest;
				};
				helpers.measureText = function (ctx, data, gc, longest, string) {
					var textWidth = data[string];
					if (!textWidth) {
						textWidth = data[string] = ctx.measureText(string).width;
						gc.push(string);
					}
					if (textWidth > longest) {
						longest = textWidth;
					}
					return longest;
				};
				helpers.numberOfLabelLines = function (arrayOfThings) {
					var numberOfLines = 1;
					helpers.each(arrayOfThings, function (thing) {
						if (helpers.isArray(thing)) {
							if (thing.length > numberOfLines) {
								numberOfLines = thing.length;
							}
						}
					});
					return numberOfLines;
				};
				helpers.drawRoundedRectangle = function (ctx, x, y, width, height, radius) {
					ctx.beginPath();
					ctx.moveTo(x + radius, y);
					ctx.lineTo(x + width - radius, y);
					ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
					ctx.lineTo(x + width, y + height - radius);
					ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
					ctx.lineTo(x + radius, y + height);
					ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
					ctx.lineTo(x, y + radius);
					ctx.quadraticCurveTo(x, y, x + radius, y);
					ctx.closePath();
				};
				helpers.color = function (c) {
					if (!color) {
						console.error('Color.js not found!');
						return c;
					}

					/* global CanvasGradient */
					if (c instanceof CanvasGradient) {
						return color(Chart.defaults.global.defaultColor);
					}

					return color(c);
				};
				helpers.isArray = Array.isArray ? function (obj) {
					return Array.isArray(obj);
				} : function (obj) {
					return Object.prototype.toString.call(obj) === '[object Array]';
				};
				// ! @see http://stackoverflow.com/a/14853974
				helpers.arrayEquals = function (a0, a1) {
					var i, ilen, v0, v1;

					if (!a0 || !a1 || a0.length !== a1.length) {
						return false;
					}

					for (i = 0, ilen = a0.length; i < ilen; ++i) {
						v0 = a0[i];
						v1 = a1[i];

						if (v0 instanceof Array && v1 instanceof Array) {
							if (!helpers.arrayEquals(v0, v1)) {
								return false;
							}
						} else if (v0 !== v1) {
							// NOTE: two different object instances will never be equal: {x:20} != {x:20}
							return false;
						}
					}

					return true;
				};
				helpers.callCallback = function (fn, args, _tArg) {
					if (fn && typeof fn.call === 'function') {
						fn.apply(_tArg, args);
					}
				};
				helpers.getHoverColor = function (colorValue) {
					/* global CanvasPattern */
					return colorValue instanceof CanvasPattern ? colorValue : helpers.color(colorValue).saturate(0.5).darken(0.1).rgbString();
				};
			};
		}, { "3": 3 }], 27: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {
				var helpers = Chart.helpers;

				/**
     * Helper function to get relative position for an event
     * @param {Event|IEvent} event - The event to get the position for
     * @param {Chart} chart - The chart
     * @returns {Point} the event position
     */
				function getRelativePosition(e, chart) {
					if (e.native) {
						return {
							x: e.x,
							y: e.y
						};
					}

					return helpers.getRelativePosition(e, chart);
				}

				/**
     * Helper function to traverse all of the visible elements in the chart
     * @param chart {chart} the chart
     * @param handler {Function} the callback to execute for each visible item
     */
				function parseVisibleItems(chart, handler) {
					var datasets = chart.data.datasets;
					var meta, i, j, ilen, jlen;

					for (i = 0, ilen = datasets.length; i < ilen; ++i) {
						if (!chart.isDatasetVisible(i)) {
							continue;
						}

						meta = chart.getDatasetMeta(i);
						for (j = 0, jlen = meta.data.length; j < jlen; ++j) {
							var element = meta.data[j];
							if (!element._view.skip) {
								handler(element);
							}
						}
					}
				}

				/**
     * Helper function to get the items that intersect the event position
     * @param items {ChartElement[]} elements to filter
     * @param position {Point} the point to be nearest to
     * @return {ChartElement[]} the nearest items
     */
				function getIntersectItems(chart, position) {
					var elements = [];

					parseVisibleItems(chart, function (element) {
						if (element.inRange(position.x, position.y)) {
							elements.push(element);
						}
					});

					return elements;
				}

				/**
     * Helper function to get the items nearest to the event position considering all visible items in teh chart
     * @param chart {Chart} the chart to look at elements from
     * @param position {Point} the point to be nearest to
     * @param intersect {Boolean} if true, only consider items that intersect the position
     * @param distanceMetric {Function} Optional function to provide the distance between
     * @return {ChartElement[]} the nearest items
     */
				function getNearestItems(chart, position, intersect, distanceMetric) {
					var minDistance = Number.POSITIVE_INFINITY;
					var nearestItems = [];

					if (!distanceMetric) {
						distanceMetric = helpers.distanceBetweenPoints;
					}

					parseVisibleItems(chart, function (element) {
						if (intersect && !element.inRange(position.x, position.y)) {
							return;
						}

						var center = element.getCenterPoint();
						var distance = distanceMetric(position, center);

						if (distance < minDistance) {
							nearestItems = [element];
							minDistance = distance;
						} else if (distance === minDistance) {
							// Can have multiple items at the same distance in which case we sort by size
							nearestItems.push(element);
						}
					});

					return nearestItems;
				}

				function indexMode(chart, e, options) {
					var position = getRelativePosition(e, chart.chart);
					var distanceMetric = function distanceMetric(pt1, pt2) {
						return Math.abs(pt1.x - pt2.x);
					};
					var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
					var elements = [];

					if (!items.length) {
						return [];
					}

					chart.data.datasets.forEach(function (dataset, datasetIndex) {
						if (chart.isDatasetVisible(datasetIndex)) {
							var meta = chart.getDatasetMeta(datasetIndex),
							    element = meta.data[items[0]._index];

							// don't count items that are skipped (null data)
							if (element && !element._view.skip) {
								elements.push(element);
							}
						}
					});

					return elements;
				}

				/**
     * @interface IInteractionOptions
     */
				/**
     * If true, only consider items that intersect the point
     * @name IInterfaceOptions#boolean
     * @type Boolean
     */

				/**
     * Contains interaction related functions
     * @namespace Chart.Interaction
     */
				Chart.Interaction = {
					// Helper function for different modes
					modes: {
						single: function single(chart, e) {
							var position = getRelativePosition(e, chart.chart);
							var elements = [];

							parseVisibleItems(chart, function (element) {
								if (element.inRange(position.x, position.y)) {
									elements.push(element);
									return elements;
								}
							});

							return elements.slice(0, 1);
						},

						/**
       * @function Chart.Interaction.modes.label
       * @deprecated since version 2.4.0
       */
						label: indexMode,

						/**
       * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
       * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
       * @function Chart.Interaction.modes.index
       * @since v2.4.0
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @param options {IInteractionOptions} options to use during interaction
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						index: indexMode,

						/**
       * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
       * If the options.intersect is false, we find the nearest item and return the items in that dataset
       * @function Chart.Interaction.modes.dataset
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @param options {IInteractionOptions} options to use during interaction
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						dataset: function dataset(chart, e, options) {
							var position = getRelativePosition(e, chart.chart);
							var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false);

							if (items.length > 0) {
								items = chart.getDatasetMeta(items[0]._datasetIndex).data;
							}

							return items;
						},

						/**
       * @function Chart.Interaction.modes.x-axis
       * @deprecated since version 2.4.0. Use index mode and intersect == true
       */
						'x-axis': function xAxis(chart, e) {
							return indexMode(chart, e, true);
						},

						/**
       * Point mode returns all elements that hit test based on the event position
       * of the event
       * @function Chart.Interaction.modes.intersect
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						point: function point(chart, e) {
							var position = getRelativePosition(e, chart.chart);
							return getIntersectItems(chart, position);
						},

						/**
       * nearest mode returns the element closest to the point
       * @function Chart.Interaction.modes.intersect
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @param options {IInteractionOptions} options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						nearest: function nearest(chart, e, options) {
							var position = getRelativePosition(e, chart.chart);
							var nearestItems = getNearestItems(chart, position, options.intersect);

							// We have multiple items at the same distance from the event. Now sort by smallest
							if (nearestItems.length > 1) {
								nearestItems.sort(function (a, b) {
									var sizeA = a.getArea();
									var sizeB = b.getArea();
									var ret = sizeA - sizeB;

									if (ret === 0) {
										// if equal sort by dataset index
										ret = a._datasetIndex - b._datasetIndex;
									}

									return ret;
								});
							}

							// Return only 1 item
							return nearestItems.slice(0, 1);
						},

						/**
       * x mode returns the elements that hit-test at the current x coordinate
       * @function Chart.Interaction.modes.x
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @param options {IInteractionOptions} options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						x: function x(chart, e, options) {
							var position = getRelativePosition(e, chart.chart);
							var items = [];
							var intersectsItem = false;

							parseVisibleItems(chart, function (element) {
								if (element.inXRange(position.x)) {
									items.push(element);
								}

								if (element.inRange(position.x, position.y)) {
									intersectsItem = true;
								}
							});

							// If we want to trigger on an intersect and we don't have any items
							// that intersect the position, return nothing
							if (options.intersect && !intersectsItem) {
								items = [];
							}
							return items;
						},

						/**
       * y mode returns the elements that hit-test at the current y coordinate
       * @function Chart.Interaction.modes.y
       * @param chart {chart} the chart we are returning items from
       * @param e {Event} the event we are find things at
       * @param options {IInteractionOptions} options to use
       * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
       */
						y: function y(chart, e, options) {
							var position = getRelativePosition(e, chart.chart);
							var items = [];
							var intersectsItem = false;

							parseVisibleItems(chart, function (element) {
								if (element.inYRange(position.y)) {
									items.push(element);
								}

								if (element.inRange(position.x, position.y)) {
									intersectsItem = true;
								}
							});

							// If we want to trigger on an intersect and we don't have any items
							// that intersect the position, return nothing
							if (options.intersect && !intersectsItem) {
								items = [];
							}
							return items;
						}
					}
				};
			};
		}, {}], 28: [function (require, module, exports) {
			'use strict';

			module.exports = function () {

				// Occupy the global variable of Chart, and create a simple base class
				var Chart = function Chart(item, config) {
					this.controller = new Chart.Controller(item, config, this);
					return this.controller;
				};

				// Globally expose the defaults to allow for user updating/changing
				Chart.defaults = {
					global: {
						responsive: true,
						responsiveAnimationDuration: 0,
						maintainAspectRatio: true,
						events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
						hover: {
							onHover: null,
							mode: 'nearest',
							intersect: true,
							animationDuration: 400
						},
						onClick: null,
						defaultColor: 'rgba(0,0,0,0.1)',
						defaultFontColor: '#666',
						defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						defaultFontSize: 12,
						defaultFontStyle: 'normal',
						showLines: true,

						// Element defaults defined in element extensions
						elements: {},

						// Legend callback string
						legendCallback: function legendCallback(chart) {
							var text = [];
							text.push('<ul class="' + chart.id + '-legend">');
							for (var i = 0; i < chart.data.datasets.length; i++) {
								text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
								if (chart.data.datasets[i].label) {
									text.push(chart.data.datasets[i].label);
								}
								text.push('</li>');
							}
							text.push('</ul>');

							return text.join('');
						}
					}
				};

				Chart.Chart = Chart;

				return Chart;
			};
		}, {}], 29: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				// The layout service is very self explanatory.  It's responsible for the layout within a chart.
				// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
				// It is this service's responsibility of carrying out that layout.
				Chart.layoutService = {
					defaults: {},

					// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
					addBox: function addBox(chartInstance, box) {
						if (!chartInstance.boxes) {
							chartInstance.boxes = [];
						}
						chartInstance.boxes.push(box);
					},

					removeBox: function removeBox(chartInstance, box) {
						if (!chartInstance.boxes) {
							return;
						}
						chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
					},

					// The most important function
					update: function update(chartInstance, width, height) {

						if (!chartInstance) {
							return;
						}

						var layoutOptions = chartInstance.options.layout;
						var padding = layoutOptions ? layoutOptions.padding : null;

						var leftPadding = 0;
						var rightPadding = 0;
						var topPadding = 0;
						var bottomPadding = 0;

						if (!isNaN(padding)) {
							// options.layout.padding is a number. assign to all
							leftPadding = padding;
							rightPadding = padding;
							topPadding = padding;
							bottomPadding = padding;
						} else {
							leftPadding = padding.left || 0;
							rightPadding = padding.right || 0;
							topPadding = padding.top || 0;
							bottomPadding = padding.bottom || 0;
						}

						var leftBoxes = helpers.where(chartInstance.boxes, function (box) {
							return box.options.position === 'left';
						});
						var rightBoxes = helpers.where(chartInstance.boxes, function (box) {
							return box.options.position === 'right';
						});
						var topBoxes = helpers.where(chartInstance.boxes, function (box) {
							return box.options.position === 'top';
						});
						var bottomBoxes = helpers.where(chartInstance.boxes, function (box) {
							return box.options.position === 'bottom';
						});

						// Boxes that overlay the chartarea such as the radialLinear scale
						var chartAreaBoxes = helpers.where(chartInstance.boxes, function (box) {
							return box.options.position === 'chartArea';
						});

						// Ensure that full width boxes are at the very top / bottom
						topBoxes.sort(function (a, b) {
							return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
						});
						bottomBoxes.sort(function (a, b) {
							return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
						});

						// Essentially we now have any number of boxes on each of the 4 sides.
						// Our canvas looks like the following.
						// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
						// B1 is the bottom axis
						// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
						// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
						// an error will be thrown.
						//
						// |----------------------------------------------------|
						// |                  T1 (Full Width)                   |
						// |----------------------------------------------------|
						// |    |    |                 T2                  |    |
						// |    |----|-------------------------------------|----|
						// |    |    | C1 |                           | C2 |    |
						// |    |    |----|                           |----|    |
						// |    |    |                                     |    |
						// | L1 | L2 |           ChartArea (C0)            | R1 |
						// |    |    |                                     |    |
						// |    |    |----|                           |----|    |
						// |    |    | C3 |                           | C4 |    |
						// |    |----|-------------------------------------|----|
						// |    |    |                 B1                  |    |
						// |----------------------------------------------------|
						// |                  B2 (Full Width)                   |
						// |----------------------------------------------------|
						//
						// What we do to find the best sizing, we do the following
						// 1. Determine the minimum size of the chart area.
						// 2. Split the remaining width equally between each vertical axis
						// 3. Split the remaining height equally between each horizontal axis
						// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
						// 5. Adjust the sizes of each axis based on it's minimum reported size.
						// 6. Refit each axis
						// 7. Position each axis in the final location
						// 8. Tell the chart the final location of the chart area
						// 9. Tell any axes that overlay the chart area the positions of the chart area

						// Step 1
						var chartWidth = width - leftPadding - rightPadding;
						var chartHeight = height - topPadding - bottomPadding;
						var chartAreaWidth = chartWidth / 2; // min 50%
						var chartAreaHeight = chartHeight / 2; // min 50%

						// Step 2
						var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);

						// Step 3
						var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);

						// Step 4
						var maxChartAreaWidth = chartWidth;
						var maxChartAreaHeight = chartHeight;
						var minBoxSizes = [];

						function getMinimumBoxSize(box) {
							var minSize;
							var isHorizontal = box.isHorizontal();

							if (isHorizontal) {
								minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
								maxChartAreaHeight -= minSize.height;
							} else {
								minSize = box.update(verticalBoxWidth, chartAreaHeight);
								maxChartAreaWidth -= minSize.width;
							}

							minBoxSizes.push({
								horizontal: isHorizontal,
								minSize: minSize,
								box: box
							});
						}

						helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);

						// If a horizontal box has padding, we move the left boxes over to avoid ugly charts (see issue #2478)
						var maxHorizontalLeftPadding = 0;
						var maxHorizontalRightPadding = 0;
						var maxVerticalTopPadding = 0;
						var maxVerticalBottomPadding = 0;

						helpers.each(topBoxes.concat(bottomBoxes), function (horizontalBox) {
							if (horizontalBox.getPadding) {
								var boxPadding = horizontalBox.getPadding();
								maxHorizontalLeftPadding = Math.max(maxHorizontalLeftPadding, boxPadding.left);
								maxHorizontalRightPadding = Math.max(maxHorizontalRightPadding, boxPadding.right);
							}
						});

						helpers.each(leftBoxes.concat(rightBoxes), function (verticalBox) {
							if (verticalBox.getPadding) {
								var boxPadding = verticalBox.getPadding();
								maxVerticalTopPadding = Math.max(maxVerticalTopPadding, boxPadding.top);
								maxVerticalBottomPadding = Math.max(maxVerticalBottomPadding, boxPadding.bottom);
							}
						});

						// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
						// be if the axes are drawn at their minimum sizes.
						// Steps 5 & 6
						var totalLeftBoxesWidth = leftPadding;
						var totalRightBoxesWidth = rightPadding;
						var totalTopBoxesHeight = topPadding;
						var totalBottomBoxesHeight = bottomPadding;

						// Function to fit a box
						function fitBox(box) {
							var minBoxSize = helpers.findNextWhere(minBoxSizes, function (minBox) {
								return minBox.box === box;
							});

							if (minBoxSize) {
								if (box.isHorizontal()) {
									var scaleMargin = {
										left: Math.max(totalLeftBoxesWidth, maxHorizontalLeftPadding),
										right: Math.max(totalRightBoxesWidth, maxHorizontalRightPadding),
										top: 0,
										bottom: 0
									};

									// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
									// on the margin. Sometimes they need to increase in size slightly
									box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
								} else {
									box.update(minBoxSize.minSize.width, maxChartAreaHeight);
								}
							}
						}

						// Update, and calculate the left and right margins for the horizontal boxes
						helpers.each(leftBoxes.concat(rightBoxes), fitBox);

						helpers.each(leftBoxes, function (box) {
							totalLeftBoxesWidth += box.width;
						});

						helpers.each(rightBoxes, function (box) {
							totalRightBoxesWidth += box.width;
						});

						// Set the Left and Right margins for the horizontal boxes
						helpers.each(topBoxes.concat(bottomBoxes), fitBox);

						// Figure out how much margin is on the top and bottom of the vertical boxes
						helpers.each(topBoxes, function (box) {
							totalTopBoxesHeight += box.height;
						});

						helpers.each(bottomBoxes, function (box) {
							totalBottomBoxesHeight += box.height;
						});

						function finalFitVerticalBox(box) {
							var minBoxSize = helpers.findNextWhere(minBoxSizes, function (minSize) {
								return minSize.box === box;
							});

							var scaleMargin = {
								left: 0,
								right: 0,
								top: totalTopBoxesHeight,
								bottom: totalBottomBoxesHeight
							};

							if (minBoxSize) {
								box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
							}
						}

						// Let the left layout know the final margin
						helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);

						// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
						totalLeftBoxesWidth = leftPadding;
						totalRightBoxesWidth = rightPadding;
						totalTopBoxesHeight = topPadding;
						totalBottomBoxesHeight = bottomPadding;

						helpers.each(leftBoxes, function (box) {
							totalLeftBoxesWidth += box.width;
						});

						helpers.each(rightBoxes, function (box) {
							totalRightBoxesWidth += box.width;
						});

						helpers.each(topBoxes, function (box) {
							totalTopBoxesHeight += box.height;
						});
						helpers.each(bottomBoxes, function (box) {
							totalBottomBoxesHeight += box.height;
						});

						// We may be adding some padding to account for rotated x axis labels
						var leftPaddingAddition = Math.max(maxHorizontalLeftPadding - totalLeftBoxesWidth, 0);
						totalLeftBoxesWidth += leftPaddingAddition;
						totalRightBoxesWidth += Math.max(maxHorizontalRightPadding - totalRightBoxesWidth, 0);

						var topPaddingAddition = Math.max(maxVerticalTopPadding - totalTopBoxesHeight, 0);
						totalTopBoxesHeight += topPaddingAddition;
						totalBottomBoxesHeight += Math.max(maxVerticalBottomPadding - totalBottomBoxesHeight, 0);

						// Figure out if our chart area changed. This would occur if the dataset layout label rotation
						// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
						// without calling `fit` again
						var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
						var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;

						if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
							helpers.each(leftBoxes, function (box) {
								box.height = newMaxChartAreaHeight;
							});

							helpers.each(rightBoxes, function (box) {
								box.height = newMaxChartAreaHeight;
							});

							helpers.each(topBoxes, function (box) {
								if (!box.options.fullWidth) {
									box.width = newMaxChartAreaWidth;
								}
							});

							helpers.each(bottomBoxes, function (box) {
								if (!box.options.fullWidth) {
									box.width = newMaxChartAreaWidth;
								}
							});

							maxChartAreaHeight = newMaxChartAreaHeight;
							maxChartAreaWidth = newMaxChartAreaWidth;
						}

						// Step 7 - Position the boxes
						var left = leftPadding + leftPaddingAddition;
						var top = topPadding + topPaddingAddition;

						function placeBox(box) {
							if (box.isHorizontal()) {
								box.left = box.options.fullWidth ? leftPadding : totalLeftBoxesWidth;
								box.right = box.options.fullWidth ? width - rightPadding : totalLeftBoxesWidth + maxChartAreaWidth;
								box.top = top;
								box.bottom = top + box.height;

								// Move to next point
								top = box.bottom;
							} else {

								box.left = left;
								box.right = left + box.width;
								box.top = totalTopBoxesHeight;
								box.bottom = totalTopBoxesHeight + maxChartAreaHeight;

								// Move to next point
								left = box.right;
							}
						}

						helpers.each(leftBoxes.concat(topBoxes), placeBox);

						// Account for chart width and height
						left += maxChartAreaWidth;
						top += maxChartAreaHeight;

						helpers.each(rightBoxes, placeBox);
						helpers.each(bottomBoxes, placeBox);

						// Step 8
						chartInstance.chartArea = {
							left: totalLeftBoxesWidth,
							top: totalTopBoxesHeight,
							right: totalLeftBoxesWidth + maxChartAreaWidth,
							bottom: totalTopBoxesHeight + maxChartAreaHeight
						};

						// Step 9
						helpers.each(chartAreaBoxes, function (box) {
							box.left = chartInstance.chartArea.left;
							box.top = chartInstance.chartArea.top;
							box.right = chartInstance.chartArea.right;
							box.bottom = chartInstance.chartArea.bottom;

							box.update(maxChartAreaWidth, maxChartAreaHeight);
						});
					}
				};
			};
		}, {}], 30: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				var noop = helpers.noop;

				Chart.defaults.global.legend = {

					display: true,
					position: 'top',
					fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
					reverse: false,

					// a callback that will handle
					onClick: function onClick(e, legendItem) {
						var index = legendItem.datasetIndex;
						var ci = this.chart;
						var meta = ci.getDatasetMeta(index);

						// See controller.isDatasetVisible comment
						meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

						// We hid a dataset ... rerender the chart
						ci.update();
					},

					onHover: null,

					labels: {
						boxWidth: 40,
						padding: 10,
						// Generates labels shown in the legend
						// Valid properties to return:
						// text : text to display
						// fillStyle : fill of coloured box
						// strokeStyle: stroke of coloured box
						// hidden : if this legend item refers to a hidden item
						// lineCap : cap style for line
						// lineDash
						// lineDashOffset :
						// lineJoin :
						// lineWidth :
						generateLabels: function generateLabels(chart) {
							var data = chart.data;
							return helpers.isArray(data.datasets) ? data.datasets.map(function (dataset, i) {
								return {
									text: dataset.label,
									fillStyle: !helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0],
									hidden: !chart.isDatasetVisible(i),
									lineCap: dataset.borderCapStyle,
									lineDash: dataset.borderDash,
									lineDashOffset: dataset.borderDashOffset,
									lineJoin: dataset.borderJoinStyle,
									lineWidth: dataset.borderWidth,
									strokeStyle: dataset.borderColor,
									pointStyle: dataset.pointStyle,

									// Below is extra data used for toggling the datasets
									datasetIndex: i
								};
							}, this) : [];
						}
					}
				};

				/**
     * Helper function to get the box width based on the usePointStyle option
     * @param labelopts {Object} the label options on the legend
     * @param fontSize {Number} the label font size
     * @return {Number} width of the color box area
     */
				function getBoxWidth(labelOpts, fontSize) {
					return labelOpts.usePointStyle ? fontSize * Math.SQRT2 : labelOpts.boxWidth;
				}

				Chart.Legend = Chart.Element.extend({

					initialize: function initialize(config) {
						helpers.extend(this, config);

						// Contains hit boxes for each dataset (in dataset order)
						this.legendHitBoxes = [];

						// Are we in doughnut mode which has a different data type
						this.doughnutMode = false;
					},

					// These methods are ordered by lifecycle. Utilities then follow.
					// Any function defined here is inherited by all legend types.
					// Any function can be extended by the legend type

					beforeUpdate: noop,
					update: function update(maxWidth, maxHeight, margins) {
						var me = this;

						// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
						me.beforeUpdate();

						// Absorb the master measurements
						me.maxWidth = maxWidth;
						me.maxHeight = maxHeight;
						me.margins = margins;

						// Dimensions
						me.beforeSetDimensions();
						me.setDimensions();
						me.afterSetDimensions();
						// Labels
						me.beforeBuildLabels();
						me.buildLabels();
						me.afterBuildLabels();

						// Fit
						me.beforeFit();
						me.fit();
						me.afterFit();
						//
						me.afterUpdate();

						return me.minSize;
					},
					afterUpdate: noop,

					//

					beforeSetDimensions: noop,
					setDimensions: function setDimensions() {
						var me = this;
						// Set the unconstrained dimension before label rotation
						if (me.isHorizontal()) {
							// Reset position before calculating rotation
							me.width = me.maxWidth;
							me.left = 0;
							me.right = me.width;
						} else {
							me.height = me.maxHeight;

							// Reset position before calculating rotation
							me.top = 0;
							me.bottom = me.height;
						}

						// Reset padding
						me.paddingLeft = 0;
						me.paddingTop = 0;
						me.paddingRight = 0;
						me.paddingBottom = 0;

						// Reset minSize
						me.minSize = {
							width: 0,
							height: 0
						};
					},
					afterSetDimensions: noop,

					//

					beforeBuildLabels: noop,
					buildLabels: function buildLabels() {
						var me = this;
						var labelOpts = me.options.labels;
						var legendItems = labelOpts.generateLabels.call(me, me.chart);

						if (labelOpts.filter) {
							legendItems = legendItems.filter(function (item) {
								return labelOpts.filter(item, me.chart.data);
							});
						}

						if (me.options.reverse) {
							legendItems.reverse();
						}

						me.legendItems = legendItems;
					},
					afterBuildLabels: noop,

					//

					beforeFit: noop,
					fit: function fit() {
						var me = this;
						var opts = me.options;
						var labelOpts = opts.labels;
						var display = opts.display;

						var ctx = me.ctx;

						var globalDefault = Chart.defaults.global,
						    itemOrDefault = helpers.getValueOrDefault,
						    fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
						    fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
						    fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
						    labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

						// Reset hit boxes
						var hitboxes = me.legendHitBoxes = [];

						var minSize = me.minSize;
						var isHorizontal = me.isHorizontal();

						if (isHorizontal) {
							minSize.width = me.maxWidth; // fill all the width
							minSize.height = display ? 10 : 0;
						} else {
							minSize.width = display ? 10 : 0;
							minSize.height = me.maxHeight; // fill all the height
						}

						// Increase sizes here
						if (display) {
							ctx.font = labelFont;

							if (isHorizontal) {
								// Labels

								// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
								var lineWidths = me.lineWidths = [0];
								var totalHeight = me.legendItems.length ? fontSize + labelOpts.padding : 0;

								ctx.textAlign = 'left';
								ctx.textBaseline = 'top';

								helpers.each(me.legendItems, function (legendItem, i) {
									var boxWidth = getBoxWidth(labelOpts, fontSize);
									var width = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;

									if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
										totalHeight += fontSize + labelOpts.padding;
										lineWidths[lineWidths.length] = me.left;
									}

									// Store the hitbox width and height here. Final position will be updated in `draw`
									hitboxes[i] = {
										left: 0,
										top: 0,
										width: width,
										height: fontSize
									};

									lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
								});

								minSize.height += totalHeight;
							} else {
								var vPadding = labelOpts.padding;
								var columnWidths = me.columnWidths = [];
								var totalWidth = labelOpts.padding;
								var currentColWidth = 0;
								var currentColHeight = 0;
								var itemHeight = fontSize + vPadding;

								helpers.each(me.legendItems, function (legendItem, i) {
									var boxWidth = getBoxWidth(labelOpts, fontSize);
									var itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;

									// If too tall, go to new column
									if (currentColHeight + itemHeight > minSize.height) {
										totalWidth += currentColWidth + labelOpts.padding;
										columnWidths.push(currentColWidth); // previous column width

										currentColWidth = 0;
										currentColHeight = 0;
									}

									// Get max width
									currentColWidth = Math.max(currentColWidth, itemWidth);
									currentColHeight += itemHeight;

									// Store the hitbox width and height here. Final position will be updated in `draw`
									hitboxes[i] = {
										left: 0,
										top: 0,
										width: itemWidth,
										height: fontSize
									};
								});

								totalWidth += currentColWidth;
								columnWidths.push(currentColWidth);
								minSize.width += totalWidth;
							}
						}

						me.width = minSize.width;
						me.height = minSize.height;
					},
					afterFit: noop,

					// Shared Methods
					isHorizontal: function isHorizontal() {
						return this.options.position === 'top' || this.options.position === 'bottom';
					},

					// Actually draw the legend on the canvas
					draw: function draw() {
						var me = this;
						var opts = me.options;
						var labelOpts = opts.labels;
						var globalDefault = Chart.defaults.global,
						    lineDefault = globalDefault.elements.line,
						    legendWidth = me.width,
						    lineWidths = me.lineWidths;

						if (opts.display) {
							var ctx = me.ctx,
							    cursor,
							    itemOrDefault = helpers.getValueOrDefault,
							    fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
							    fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
							    fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
							    fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
							    labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

							// Canvas setup
							ctx.textAlign = 'left';
							ctx.textBaseline = 'top';
							ctx.lineWidth = 0.5;
							ctx.strokeStyle = fontColor; // for strikethrough effect
							ctx.fillStyle = fontColor; // render in correct colour
							ctx.font = labelFont;

							var boxWidth = getBoxWidth(labelOpts, fontSize),
							    hitboxes = me.legendHitBoxes;

							// current position
							var drawLegendBox = function drawLegendBox(x, y, legendItem) {
								if (isNaN(boxWidth) || boxWidth <= 0) {
									return;
								}

								// Set the ctx for the box
								ctx.save();

								ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
								ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
								ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
								ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
								ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
								ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
								var isLineWidthZero = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth) === 0;

								if (ctx.setLineDash) {
									// IE 9 and 10 do not support line dash
									ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
								}

								if (opts.labels && opts.labels.usePointStyle) {
									// Recalculate x and y for drawPoint() because its expecting
									// x and y to be center of figure (instead of top left)
									var radius = fontSize * Math.SQRT2 / 2;
									var offSet = radius / Math.SQRT2;
									var centerX = x + offSet;
									var centerY = y + offSet;

									// Draw pointStyle as legend symbol
									Chart.canvasHelpers.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
								} else {
									// Draw box as legend symbol
									if (!isLineWidthZero) {
										ctx.strokeRect(x, y, boxWidth, fontSize);
									}
									ctx.fillRect(x, y, boxWidth, fontSize);
								}

								ctx.restore();
							};
							var fillText = function fillText(x, y, legendItem, textWidth) {
								ctx.fillText(legendItem.text, boxWidth + fontSize / 2 + x, y);

								if (legendItem.hidden) {
									// Strikethrough the text if hidden
									ctx.beginPath();
									ctx.lineWidth = 2;
									ctx.moveTo(boxWidth + fontSize / 2 + x, y + fontSize / 2);
									ctx.lineTo(boxWidth + fontSize / 2 + x + textWidth, y + fontSize / 2);
									ctx.stroke();
								}
							};

							// Horizontal
							var isHorizontal = me.isHorizontal();
							if (isHorizontal) {
								cursor = {
									x: me.left + (legendWidth - lineWidths[0]) / 2,
									y: me.top + labelOpts.padding,
									line: 0
								};
							} else {
								cursor = {
									x: me.left + labelOpts.padding,
									y: me.top + labelOpts.padding,
									line: 0
								};
							}

							var itemHeight = fontSize + labelOpts.padding;
							helpers.each(me.legendItems, function (legendItem, i) {
								var textWidth = ctx.measureText(legendItem.text).width,
								    width = boxWidth + fontSize / 2 + textWidth,
								    x = cursor.x,
								    y = cursor.y;

								if (isHorizontal) {
									if (x + width >= legendWidth) {
										y = cursor.y += itemHeight;
										cursor.line++;
										x = cursor.x = me.left + (legendWidth - lineWidths[cursor.line]) / 2;
									}
								} else if (y + itemHeight > me.bottom) {
									x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
									y = cursor.y = me.top + labelOpts.padding;
									cursor.line++;
								}

								drawLegendBox(x, y, legendItem);

								hitboxes[i].left = x;
								hitboxes[i].top = y;

								// Fill the actual label
								fillText(x, y, legendItem, textWidth);

								if (isHorizontal) {
									cursor.x += width + labelOpts.padding;
								} else {
									cursor.y += itemHeight;
								}
							});
						}
					},

					/**
      * Handle an event
      * @private
      * @param {IEvent} event - The event to handle
      * @return {Boolean} true if a change occured
      */
					handleEvent: function handleEvent(e) {
						var me = this;
						var opts = me.options;
						var type = e.type === 'mouseup' ? 'click' : e.type;
						var changed = false;

						if (type === 'mousemove') {
							if (!opts.onHover) {
								return;
							}
						} else if (type === 'click') {
							if (!opts.onClick) {
								return;
							}
						} else {
							return;
						}

						// Chart event already has relative position in it
						var x = e.x,
						    y = e.y;

						if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
							// See if we are touching one of the dataset boxes
							var lh = me.legendHitBoxes;
							for (var i = 0; i < lh.length; ++i) {
								var hitBox = lh[i];

								if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
									// Touching an element
									if (type === 'click') {
										// use e.native for backwards compatibility
										opts.onClick.call(me, e.native, me.legendItems[i]);
										changed = true;
										break;
									} else if (type === 'mousemove') {
										// use e.native for backwards compatibility
										opts.onHover.call(me, e.native, me.legendItems[i]);
										changed = true;
										break;
									}
								}
							}
						}

						return changed;
					}
				});

				function createNewLegendAndAttach(chartInstance, legendOpts) {
					var legend = new Chart.Legend({
						ctx: chartInstance.chart.ctx,
						options: legendOpts,
						chart: chartInstance
					});
					chartInstance.legend = legend;
					Chart.layoutService.addBox(chartInstance, legend);
				}

				// Register the legend plugin
				Chart.plugins.register({
					beforeInit: function beforeInit(chartInstance) {
						var legendOpts = chartInstance.options.legend;

						if (legendOpts) {
							createNewLegendAndAttach(chartInstance, legendOpts);
						}
					},
					beforeUpdate: function beforeUpdate(chartInstance) {
						var legendOpts = chartInstance.options.legend;

						if (legendOpts) {
							legendOpts = helpers.configMerge(Chart.defaults.global.legend, legendOpts);

							if (chartInstance.legend) {
								chartInstance.legend.options = legendOpts;
							} else {
								createNewLegendAndAttach(chartInstance, legendOpts);
							}
						} else {
							Chart.layoutService.removeBox(chartInstance, chartInstance.legend);
							delete chartInstance.legend;
						}
					},
					afterEvent: function afterEvent(chartInstance, e) {
						var legend = chartInstance.legend;
						if (legend) {
							legend.handleEvent(e);
						}
					}
				});
			};
		}, {}], 31: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.global.plugins = {};

				/**
     * The plugin service singleton
     * @namespace Chart.plugins
     * @since 2.1.0
     */
				Chart.plugins = {
					/**
      * Globally registered plugins.
      * @private
      */
					_plugins: [],

					/**
      * This identifier is used to invalidate the descriptors cache attached to each chart
      * when a global plugin is registered or unregistered. In this case, the cache ID is
      * incremented and descriptors are regenerated during following API calls.
      * @private
      */
					_cacheId: 0,

					/**
      * Registers the given plugin(s) if not already registered.
      * @param {Array|Object} plugins plugin instance(s).
      */
					register: function register(plugins) {
						var p = this._plugins;
						[].concat(plugins).forEach(function (plugin) {
							if (p.indexOf(plugin) === -1) {
								p.push(plugin);
							}
						});

						this._cacheId++;
					},

					/**
      * Unregisters the given plugin(s) only if registered.
      * @param {Array|Object} plugins plugin instance(s).
      */
					unregister: function unregister(plugins) {
						var p = this._plugins;
						[].concat(plugins).forEach(function (plugin) {
							var idx = p.indexOf(plugin);
							if (idx !== -1) {
								p.splice(idx, 1);
							}
						});

						this._cacheId++;
					},

					/**
      * Remove all registered plugins.
      * @since 2.1.5
      */
					clear: function clear() {
						this._plugins = [];
						this._cacheId++;
					},

					/**
      * Returns the number of registered plugins?
      * @returns {Number}
      * @since 2.1.5
      */
					count: function count() {
						return this._plugins.length;
					},

					/**
      * Returns all registered plugin instances.
      * @returns {Array} array of plugin objects.
      * @since 2.1.5
      */
					getAll: function getAll() {
						return this._plugins;
					},

					/**
      * Calls enabled plugins for `chart` on the specified hook and with the given args.
      * This method immediately returns as soon as a plugin explicitly returns false. The
      * returned value can be used, for instance, to interrupt the current action.
      * @param {Object} chart - The chart instance for which plugins should be called.
      * @param {String} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
      * @param {Array} [args] - Extra arguments to apply to the hook call.
      * @returns {Boolean} false if any of the plugins return false, else returns true.
      */
					notify: function notify(chart, hook, args) {
						var descriptors = this.descriptors(chart);
						var ilen = descriptors.length;
						var i, descriptor, plugin, params, method;

						for (i = 0; i < ilen; ++i) {
							descriptor = descriptors[i];
							plugin = descriptor.plugin;
							method = plugin[hook];
							if (typeof method === 'function') {
								params = [chart].concat(args || []);
								params.push(descriptor.options);
								if (method.apply(plugin, params) === false) {
									return false;
								}
							}
						}

						return true;
					},

					/**
      * Returns descriptors of enabled plugins for the given chart.
      * @returns {Array} [{ plugin, options }]
      * @private
      */
					descriptors: function descriptors(chart) {
						var cache = chart._plugins || (chart._plugins = {});
						if (cache.id === this._cacheId) {
							return cache.descriptors;
						}

						var plugins = [];
						var descriptors = [];
						var config = chart && chart.config || {};
						var defaults = Chart.defaults.global.plugins;
						var options = config.options && config.options.plugins || {};

						this._plugins.concat(config.plugins || []).forEach(function (plugin) {
							var idx = plugins.indexOf(plugin);
							if (idx !== -1) {
								return;
							}

							var id = plugin.id;
							var opts = options[id];
							if (opts === false) {
								return;
							}

							if (opts === true) {
								opts = helpers.clone(defaults[id]);
							}

							plugins.push(plugin);
							descriptors.push({
								plugin: plugin,
								options: opts || {}
							});
						});

						cache.descriptors = descriptors;
						cache.id = this._cacheId;
						return descriptors;
					}
				};

				/**
     * Plugin extension hooks.
     * @interface IPlugin
     * @since 2.1.0
     */
				/**
     * @method IPlugin#beforeInit
     * @desc Called before initializing `chart`.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#afterInit
     * @desc Called after `chart` has been initialized and before the first update.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeUpdate
     * @desc Called before updating `chart`. If any plugin returns `false`, the update
     * is cancelled (and thus subsequent render(s)) until another `update` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} `false` to cancel the chart update.
     */
				/**
     * @method IPlugin#afterUpdate
     * @desc Called after `chart` has been updated and before rendering. Note that this
     * hook will not be called if the chart update has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeDatasetsUpdate
    	 * @desc Called before updating the `chart` datasets. If any plugin returns `false`,
     * the datasets update is cancelled until another `update` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} false to cancel the datasets update.
     * @since version 2.1.5
     */
				/**
     * @method IPlugin#afterDatasetsUpdate
     * @desc Called after the `chart` datasets have been updated. Note that this hook
     * will not be called if the datasets update has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     * @since version 2.1.5
     */
				/**
     * @method IPlugin#beforeLayout
     * @desc Called before laying out `chart`. If any plugin returns `false`,
     * the layout update is cancelled until another `update` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} `false` to cancel the chart layout.
     */
				/**
     * @method IPlugin#afterLayout
     * @desc Called after the `chart` has been layed out. Note that this hook will not
     * be called if the layout update has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeRender
     * @desc Called before rendering `chart`. If any plugin returns `false`,
     * the rendering is cancelled until another `render` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} `false` to cancel the chart rendering.
     */
				/**
     * @method IPlugin#afterRender
     * @desc Called after the `chart` has been fully rendered (and animation completed). Note
     * that this hook will not be called if the rendering has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeDraw
     * @desc Called before drawing `chart` at every animation frame specified by the given
     * easing value. If any plugin returns `false`, the frame drawing is cancelled until
     * another `render` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} `false` to cancel the chart drawing.
     */
				/**
     * @method IPlugin#afterDraw
     * @desc Called after the `chart` has been drawn for the specific easing value. Note
     * that this hook will not be called if the drawing has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeDatasetsDraw
    	 * @desc Called before drawing the `chart` datasets. If any plugin returns `false`,
     * the datasets drawing is cancelled until another `render` is triggered.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
     * @param {Object} options - The plugin options.
     * @returns {Boolean} `false` to cancel the chart datasets drawing.
     */
				/**
     * @method IPlugin#afterDatasetsDraw
     * @desc Called after the `chart` datasets have been drawn. Note that this hook
     * will not be called if the datasets drawing has been previously cancelled.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Number} easingValue - The current animation value, between 0.0 and 1.0.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#beforeEvent
    	 * @desc Called before processing the specified `event`. If any plugin returns `false`,
     * the event will be discarded.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {IEvent} event - The event object.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#afterEvent
     * @desc Called after the `event` has been consumed. Note that this hook
     * will not be called if the `event` has been previously discarded.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {IEvent} event - The event object.
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#resize
     * @desc Called after the chart as been resized.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Number} size - The new canvas display size (eq. canvas.style width & height).
     * @param {Object} options - The plugin options.
     */
				/**
     * @method IPlugin#destroy
     * @desc Called after the chart as been destroyed.
     * @param {Chart.Controller} chart - The chart instance.
     * @param {Object} options - The plugin options.
     */

				/**
     * Provided for backward compatibility, use Chart.plugins instead
     * @namespace Chart.pluginService
     * @deprecated since version 2.1.5
     * @todo remove at version 3
     * @private
     */
				Chart.pluginService = Chart.plugins;

				/**
     * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
     * effect, instead simply create/register plugins via plain JavaScript objects.
     * @interface Chart.PluginBase
     * @deprecated since version 2.5.0
     * @todo remove at version 3
     * @private
     */
				Chart.PluginBase = helpers.inherits({});
			};
		}, {}], 32: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.scale = {
					display: true,
					position: 'left',

					// grid line settings
					gridLines: {
						display: true,
						color: 'rgba(0, 0, 0, 0.1)',
						lineWidth: 1,
						drawBorder: true,
						drawOnChartArea: true,
						drawTicks: true,
						tickMarkLength: 10,
						zeroLineWidth: 1,
						zeroLineColor: 'rgba(0,0,0,0.25)',
						offsetGridLines: false,
						borderDash: [],
						borderDashOffset: 0.0
					},

					// scale label
					scaleLabel: {
						// actual label
						labelString: '',

						// display property
						display: false
					},

					// label settings
					ticks: {
						beginAtZero: false,
						minRotation: 0,
						maxRotation: 50,
						mirror: false,
						padding: 0,
						reverse: false,
						display: true,
						autoSkip: true,
						autoSkipPadding: 0,
						labelOffset: 0,
						// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
						callback: Chart.Ticks.formatters.values
					}
				};

				function computeTextSize(context, tick, font) {
					return helpers.isArray(tick) ? helpers.longestText(context, font, tick) : context.measureText(tick).width;
				}

				function parseFontOptions(options) {
					var getValueOrDefault = helpers.getValueOrDefault;
					var globalDefaults = Chart.defaults.global;
					var size = getValueOrDefault(options.fontSize, globalDefaults.defaultFontSize);
					var style = getValueOrDefault(options.fontStyle, globalDefaults.defaultFontStyle);
					var family = getValueOrDefault(options.fontFamily, globalDefaults.defaultFontFamily);

					return {
						size: size,
						style: style,
						family: family,
						font: helpers.fontString(size, style, family)
					};
				}

				Chart.Scale = Chart.Element.extend({
					/**
      * Get the padding needed for the scale
      * @method getPadding
      * @private
      * @returns {Padding} the necessary padding
      */
					getPadding: function getPadding() {
						var me = this;
						return {
							left: me.paddingLeft || 0,
							top: me.paddingTop || 0,
							right: me.paddingRight || 0,
							bottom: me.paddingBottom || 0
						};
					},

					// These methods are ordered by lifecyle. Utilities then follow.
					// Any function defined here is inherited by all scale types.
					// Any function can be extended by the scale type

					beforeUpdate: function beforeUpdate() {
						helpers.callCallback(this.options.beforeUpdate, [this]);
					},
					update: function update(maxWidth, maxHeight, margins) {
						var me = this;

						// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
						me.beforeUpdate();

						// Absorb the master measurements
						me.maxWidth = maxWidth;
						me.maxHeight = maxHeight;
						me.margins = helpers.extend({
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						}, margins);
						me.longestTextCache = me.longestTextCache || {};

						// Dimensions
						me.beforeSetDimensions();
						me.setDimensions();
						me.afterSetDimensions();

						// Data min/max
						me.beforeDataLimits();
						me.determineDataLimits();
						me.afterDataLimits();

						// Ticks
						me.beforeBuildTicks();
						me.buildTicks();
						me.afterBuildTicks();

						me.beforeTickToLabelConversion();
						me.convertTicksToLabels();
						me.afterTickToLabelConversion();

						// Tick Rotation
						me.beforeCalculateTickRotation();
						me.calculateTickRotation();
						me.afterCalculateTickRotation();
						// Fit
						me.beforeFit();
						me.fit();
						me.afterFit();
						//
						me.afterUpdate();

						return me.minSize;
					},
					afterUpdate: function afterUpdate() {
						helpers.callCallback(this.options.afterUpdate, [this]);
					},

					//

					beforeSetDimensions: function beforeSetDimensions() {
						helpers.callCallback(this.options.beforeSetDimensions, [this]);
					},
					setDimensions: function setDimensions() {
						var me = this;
						// Set the unconstrained dimension before label rotation
						if (me.isHorizontal()) {
							// Reset position before calculating rotation
							me.width = me.maxWidth;
							me.left = 0;
							me.right = me.width;
						} else {
							me.height = me.maxHeight;

							// Reset position before calculating rotation
							me.top = 0;
							me.bottom = me.height;
						}

						// Reset padding
						me.paddingLeft = 0;
						me.paddingTop = 0;
						me.paddingRight = 0;
						me.paddingBottom = 0;
					},
					afterSetDimensions: function afterSetDimensions() {
						helpers.callCallback(this.options.afterSetDimensions, [this]);
					},

					// Data limits
					beforeDataLimits: function beforeDataLimits() {
						helpers.callCallback(this.options.beforeDataLimits, [this]);
					},
					determineDataLimits: helpers.noop,
					afterDataLimits: function afterDataLimits() {
						helpers.callCallback(this.options.afterDataLimits, [this]);
					},

					//
					beforeBuildTicks: function beforeBuildTicks() {
						helpers.callCallback(this.options.beforeBuildTicks, [this]);
					},
					buildTicks: helpers.noop,
					afterBuildTicks: function afterBuildTicks() {
						helpers.callCallback(this.options.afterBuildTicks, [this]);
					},

					beforeTickToLabelConversion: function beforeTickToLabelConversion() {
						helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
					},
					convertTicksToLabels: function convertTicksToLabels() {
						var me = this;
						// Convert ticks to strings
						var tickOpts = me.options.ticks;
						me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback);
					},
					afterTickToLabelConversion: function afterTickToLabelConversion() {
						helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
					},

					//

					beforeCalculateTickRotation: function beforeCalculateTickRotation() {
						helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
					},
					calculateTickRotation: function calculateTickRotation() {
						var me = this;
						var context = me.ctx;
						var tickOpts = me.options.ticks;

						// Get the width of each grid by calculating the difference
						// between x offsets between 0 and 1.
						var tickFont = parseFontOptions(tickOpts);
						context.font = tickFont.font;

						var labelRotation = tickOpts.minRotation || 0;

						if (me.options.display && me.isHorizontal()) {
							var originalLabelWidth = helpers.longestText(context, tickFont.font, me.ticks, me.longestTextCache);
							var labelWidth = originalLabelWidth;
							var cosRotation;
							var sinRotation;

							// Allow 3 pixels x2 padding either side for label readability
							var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;

							// Max label rotation can be set or default to 90 - also act as a loop counter
							while (labelWidth > tickWidth && labelRotation < tickOpts.maxRotation) {
								var angleRadians = helpers.toRadians(labelRotation);
								cosRotation = Math.cos(angleRadians);
								sinRotation = Math.sin(angleRadians);

								if (sinRotation * originalLabelWidth > me.maxHeight) {
									// go back one step
									labelRotation--;
									break;
								}

								labelRotation++;
								labelWidth = cosRotation * originalLabelWidth;
							}
						}

						me.labelRotation = labelRotation;
					},
					afterCalculateTickRotation: function afterCalculateTickRotation() {
						helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
					},

					//

					beforeFit: function beforeFit() {
						helpers.callCallback(this.options.beforeFit, [this]);
					},
					fit: function fit() {
						var me = this;
						// Reset
						var minSize = me.minSize = {
							width: 0,
							height: 0
						};

						var opts = me.options;
						var tickOpts = opts.ticks;
						var scaleLabelOpts = opts.scaleLabel;
						var gridLineOpts = opts.gridLines;
						var display = opts.display;
						var isHorizontal = me.isHorizontal();

						var tickFont = parseFontOptions(tickOpts);
						var scaleLabelFontSize = parseFontOptions(scaleLabelOpts).size * 1.5;
						var tickMarkLength = opts.gridLines.tickMarkLength;

						// Width
						if (isHorizontal) {
							// subtract the margins to line up with the chartArea if we are a full width scale
							minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
						} else {
							minSize.width = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
						}

						// height
						if (isHorizontal) {
							minSize.height = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
						} else {
							minSize.height = me.maxHeight; // fill all the height
						}

						// Are we showing a title for the scale?
						if (scaleLabelOpts.display && display) {
							if (isHorizontal) {
								minSize.height += scaleLabelFontSize;
							} else {
								minSize.width += scaleLabelFontSize;
							}
						}

						// Don't bother fitting the ticks if we are not showing them
						if (tickOpts.display && display) {
							var largestTextWidth = helpers.longestText(me.ctx, tickFont.font, me.ticks, me.longestTextCache);
							var tallestLabelHeightInLines = helpers.numberOfLabelLines(me.ticks);
							var lineSpace = tickFont.size * 0.5;

							if (isHorizontal) {
								// A horizontal axis is more constrained by the height.
								me.longestLabelWidth = largestTextWidth;

								var angleRadians = helpers.toRadians(me.labelRotation);
								var cosRotation = Math.cos(angleRadians);
								var sinRotation = Math.sin(angleRadians);

								// TODO - improve this calculation
								var labelHeight = sinRotation * largestTextWidth + tickFont.size * tallestLabelHeightInLines + lineSpace * tallestLabelHeightInLines;

								minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight);
								me.ctx.font = tickFont.font;

								var firstTick = me.ticks[0];
								var firstLabelWidth = computeTextSize(me.ctx, firstTick, tickFont.font);

								var lastTick = me.ticks[me.ticks.length - 1];
								var lastLabelWidth = computeTextSize(me.ctx, lastTick, tickFont.font);

								// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
								// by the font height
								if (me.labelRotation !== 0) {
									me.paddingLeft = opts.position === 'bottom' ? cosRotation * firstLabelWidth + 3 : cosRotation * lineSpace + 3; // add 3 px to move away from canvas edges
									me.paddingRight = opts.position === 'bottom' ? cosRotation * lineSpace + 3 : cosRotation * lastLabelWidth + 3;
								} else {
									me.paddingLeft = firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
									me.paddingRight = lastLabelWidth / 2 + 3;
								}
							} else {
								// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
								// Account for padding

								if (tickOpts.mirror) {
									largestTextWidth = 0;
								} else {
									largestTextWidth += me.options.ticks.padding;
								}
								minSize.width += largestTextWidth;
								me.paddingTop = tickFont.size / 2;
								me.paddingBottom = tickFont.size / 2;
							}
						}

						me.handleMargins();

						me.width = minSize.width;
						me.height = minSize.height;
					},

					/**
      * Handle margins and padding interactions
      * @private
      */
					handleMargins: function handleMargins() {
						var me = this;
						if (me.margins) {
							me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
							me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
							me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
							me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
						}
					},

					afterFit: function afterFit() {
						helpers.callCallback(this.options.afterFit, [this]);
					},

					// Shared Methods
					isHorizontal: function isHorizontal() {
						return this.options.position === 'top' || this.options.position === 'bottom';
					},
					isFullWidth: function isFullWidth() {
						return this.options.fullWidth;
					},

					// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
					getRightValue: function getRightValue(rawValue) {
						// Null and undefined values first
						if (rawValue === null || typeof rawValue === 'undefined') {
							return NaN;
						}
						// isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values
						if (typeof rawValue === 'number' && !isFinite(rawValue)) {
							return NaN;
						}
						// If it is in fact an object, dive in one more level
						if ((typeof rawValue === "undefined" ? "undefined" : _typeof(rawValue)) === 'object') {
							if (rawValue instanceof Date || rawValue.isValid) {
								return rawValue;
							}
							return this.getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
						}

						// Value is good, return it
						return rawValue;
					},

					// Used to get the value to display in the tooltip for the data at the given index
					// function getLabelForIndex(index, datasetIndex)
					getLabelForIndex: helpers.noop,

					// Used to get data value locations.  Value can either be an index or a numerical value
					getPixelForValue: helpers.noop,

					// Used to get the data value from a given pixel. This is the inverse of getPixelForValue
					getValueForPixel: helpers.noop,

					// Used for tick location, should
					getPixelForTick: function getPixelForTick(index, includeOffset) {
						var me = this;
						if (me.isHorizontal()) {
							var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
							var tickWidth = innerWidth / Math.max(me.ticks.length - (me.options.gridLines.offsetGridLines ? 0 : 1), 1);
							var pixel = tickWidth * index + me.paddingLeft;

							if (includeOffset) {
								pixel += tickWidth / 2;
							}

							var finalVal = me.left + Math.round(pixel);
							finalVal += me.isFullWidth() ? me.margins.left : 0;
							return finalVal;
						}
						var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
						return me.top + index * (innerHeight / (me.ticks.length - 1));
					},

					// Utility for getting the pixel location of a percentage of scale
					getPixelForDecimal: function getPixelForDecimal(decimal /* , includeOffset*/) {
						var me = this;
						if (me.isHorizontal()) {
							var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
							var valueOffset = innerWidth * decimal + me.paddingLeft;

							var finalVal = me.left + Math.round(valueOffset);
							finalVal += me.isFullWidth() ? me.margins.left : 0;
							return finalVal;
						}
						return me.top + decimal * me.height;
					},

					getBasePixel: function getBasePixel() {
						return this.getPixelForValue(this.getBaseValue());
					},

					getBaseValue: function getBaseValue() {
						var me = this;
						var min = me.min;
						var max = me.max;

						return me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
					},

					// Actually draw the scale on the canvas
					// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
					draw: function draw(chartArea) {
						var me = this;
						var options = me.options;
						if (!options.display) {
							return;
						}

						var context = me.ctx;
						var globalDefaults = Chart.defaults.global;
						var optionTicks = options.ticks;
						var gridLines = options.gridLines;
						var scaleLabel = options.scaleLabel;

						var isRotated = me.labelRotation !== 0;
						var skipRatio;
						var useAutoskipper = optionTicks.autoSkip;
						var isHorizontal = me.isHorizontal();

						// figure out the maximum number of gridlines to show
						var maxTicks;
						if (optionTicks.maxTicksLimit) {
							maxTicks = optionTicks.maxTicksLimit;
						}

						var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
						var tickFont = parseFontOptions(optionTicks);

						var tl = gridLines.drawTicks ? gridLines.tickMarkLength : 0;
						var borderDash = helpers.getValueOrDefault(gridLines.borderDash, globalDefaults.borderDash);
						var borderDashOffset = helpers.getValueOrDefault(gridLines.borderDashOffset, globalDefaults.borderDashOffset);

						var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
						var scaleLabelFont = parseFontOptions(scaleLabel);

						var labelRotationRadians = helpers.toRadians(me.labelRotation);
						var cosRotation = Math.cos(labelRotationRadians);
						var longestRotatedLabel = me.longestLabelWidth * cosRotation;

						// Make sure we draw text in the correct color and font
						context.fillStyle = tickFontColor;

						var itemsToDraw = [];

						if (isHorizontal) {
							skipRatio = false;

							// Only calculate the skip ratio with the half width of longestRotateLabel if we got an actual rotation
							// See #2584
							if (isRotated) {
								longestRotatedLabel /= 2;
							}

							if ((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length > me.width - (me.paddingLeft + me.paddingRight)) {
								skipRatio = 1 + Math.floor((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length / (me.width - (me.paddingLeft + me.paddingRight)));
							}

							// if they defined a max number of optionTicks,
							// increase skipRatio until that number is met
							if (maxTicks && me.ticks.length > maxTicks) {
								while (!skipRatio || me.ticks.length / (skipRatio || 1) > maxTicks) {
									if (!skipRatio) {
										skipRatio = 1;
									}
									skipRatio += 1;
								}
							}

							if (!useAutoskipper) {
								skipRatio = false;
							}
						}

						var xTickStart = options.position === 'right' ? me.left : me.right - tl;
						var xTickEnd = options.position === 'right' ? me.left + tl : me.right;
						var yTickStart = options.position === 'bottom' ? me.top : me.bottom - tl;
						var yTickEnd = options.position === 'bottom' ? me.top + tl : me.bottom;

						helpers.each(me.ticks, function (label, index) {
							// If the callback returned a null or undefined value, do not draw this line
							if (label === undefined || label === null) {
								return;
							}

							var isLastTick = me.ticks.length === index + 1;

							// Since we always show the last tick,we need may need to hide the last shown one before
							var shouldSkip = skipRatio > 1 && index % skipRatio > 0 || index % skipRatio === 0 && index + skipRatio >= me.ticks.length;
							if (shouldSkip && !isLastTick || label === undefined || label === null) {
								return;
							}

							var lineWidth, lineColor;
							if (index === (typeof me.zeroLineIndex !== 'undefined' ? me.zeroLineIndex : 0)) {
								// Draw the first index specially
								lineWidth = gridLines.zeroLineWidth;
								lineColor = gridLines.zeroLineColor;
							} else {
								lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, index);
								lineColor = helpers.getValueAtIndexOrDefault(gridLines.color, index);
							}

							// Common properties
							var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
							var textAlign = 'middle';
							var textBaseline = 'middle';

							if (isHorizontal) {

								if (options.position === 'bottom') {
									// bottom
									textBaseline = !isRotated ? 'top' : 'middle';
									textAlign = !isRotated ? 'center' : 'right';
									labelY = me.top + tl;
								} else {
									// top
									textBaseline = !isRotated ? 'bottom' : 'middle';
									textAlign = !isRotated ? 'center' : 'left';
									labelY = me.bottom - tl;
								}

								var xLineValue = me.getPixelForTick(index) + helpers.aliasPixel(lineWidth); // xvalues for grid lines
								labelX = me.getPixelForTick(index, gridLines.offsetGridLines) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)

								tx1 = tx2 = x1 = x2 = xLineValue;
								ty1 = yTickStart;
								ty2 = yTickEnd;
								y1 = chartArea.top;
								y2 = chartArea.bottom;
							} else {
								var isLeft = options.position === 'left';
								var tickPadding = optionTicks.padding;
								var labelXOffset;

								if (optionTicks.mirror) {
									textAlign = isLeft ? 'left' : 'right';
									labelXOffset = tickPadding;
								} else {
									textAlign = isLeft ? 'right' : 'left';
									labelXOffset = tl + tickPadding;
								}

								labelX = isLeft ? me.right - labelXOffset : me.left + labelXOffset;

								var yLineValue = me.getPixelForTick(index); // xvalues for grid lines
								yLineValue += helpers.aliasPixel(lineWidth);
								labelY = me.getPixelForTick(index, gridLines.offsetGridLines);

								tx1 = xTickStart;
								tx2 = xTickEnd;
								x1 = chartArea.left;
								x2 = chartArea.right;
								ty1 = ty2 = y1 = y2 = yLineValue;
							}

							itemsToDraw.push({
								tx1: tx1,
								ty1: ty1,
								tx2: tx2,
								ty2: ty2,
								x1: x1,
								y1: y1,
								x2: x2,
								y2: y2,
								labelX: labelX,
								labelY: labelY,
								glWidth: lineWidth,
								glColor: lineColor,
								glBorderDash: borderDash,
								glBorderDashOffset: borderDashOffset,
								rotation: -1 * labelRotationRadians,
								label: label,
								textBaseline: textBaseline,
								textAlign: textAlign
							});
						});

						// Draw all of the tick labels, tick marks, and grid lines at the correct places
						helpers.each(itemsToDraw, function (itemToDraw) {
							if (gridLines.display) {
								context.save();
								context.lineWidth = itemToDraw.glWidth;
								context.strokeStyle = itemToDraw.glColor;
								if (context.setLineDash) {
									context.setLineDash(itemToDraw.glBorderDash);
									context.lineDashOffset = itemToDraw.glBorderDashOffset;
								}

								context.beginPath();

								if (gridLines.drawTicks) {
									context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
									context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
								}

								if (gridLines.drawOnChartArea) {
									context.moveTo(itemToDraw.x1, itemToDraw.y1);
									context.lineTo(itemToDraw.x2, itemToDraw.y2);
								}

								context.stroke();
								context.restore();
							}

							if (optionTicks.display) {
								context.save();
								context.translate(itemToDraw.labelX, itemToDraw.labelY);
								context.rotate(itemToDraw.rotation);
								context.font = tickFont.font;
								context.textBaseline = itemToDraw.textBaseline;
								context.textAlign = itemToDraw.textAlign;

								var label = itemToDraw.label;
								if (helpers.isArray(label)) {
									for (var i = 0, y = 0; i < label.length; ++i) {
										// We just make sure the multiline element is a string here..
										context.fillText('' + label[i], 0, y);
										// apply same lineSpacing as calculated @ L#320
										y += tickFont.size * 1.5;
									}
								} else {
									context.fillText(label, 0, 0);
								}
								context.restore();
							}
						});

						if (scaleLabel.display) {
							// Draw the scale label
							var scaleLabelX;
							var scaleLabelY;
							var rotation = 0;

							if (isHorizontal) {
								scaleLabelX = me.left + (me.right - me.left) / 2; // midpoint of the width
								scaleLabelY = options.position === 'bottom' ? me.bottom - scaleLabelFont.size / 2 : me.top + scaleLabelFont.size / 2;
							} else {
								var isLeft = options.position === 'left';
								scaleLabelX = isLeft ? me.left + scaleLabelFont.size / 2 : me.right - scaleLabelFont.size / 2;
								scaleLabelY = me.top + (me.bottom - me.top) / 2;
								rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
							}

							context.save();
							context.translate(scaleLabelX, scaleLabelY);
							context.rotate(rotation);
							context.textAlign = 'center';
							context.textBaseline = 'middle';
							context.fillStyle = scaleLabelFontColor; // render in correct colour
							context.font = scaleLabelFont.font;
							context.fillText(scaleLabel.labelString, 0, 0);
							context.restore();
						}

						if (gridLines.drawBorder) {
							// Draw the line at the edge of the axis
							context.lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, 0);
							context.strokeStyle = helpers.getValueAtIndexOrDefault(gridLines.color, 0);
							var x1 = me.left,
							    x2 = me.right,
							    y1 = me.top,
							    y2 = me.bottom;

							var aliasPixel = helpers.aliasPixel(context.lineWidth);
							if (isHorizontal) {
								y1 = y2 = options.position === 'top' ? me.bottom : me.top;
								y1 += aliasPixel;
								y2 += aliasPixel;
							} else {
								x1 = x2 = options.position === 'left' ? me.right : me.left;
								x1 += aliasPixel;
								x2 += aliasPixel;
							}

							context.beginPath();
							context.moveTo(x1, y1);
							context.lineTo(x2, y2);
							context.stroke();
						}
					}
				});
			};
		}, {}], 33: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.scaleService = {
					// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
					// use the new chart options to grab the correct scale
					constructors: {},
					// Use a registration function so that we can move to an ES6 map when we no longer need to support
					// old browsers

					// Scale config defaults
					defaults: {},
					registerScaleType: function registerScaleType(type, scaleConstructor, defaults) {
						this.constructors[type] = scaleConstructor;
						this.defaults[type] = helpers.clone(defaults);
					},
					getScaleConstructor: function getScaleConstructor(type) {
						return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
					},
					getScaleDefaults: function getScaleDefaults(type) {
						// Return the scale defaults merged with the global settings so that we always use the latest ones
						return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
					},
					updateScaleDefaults: function updateScaleDefaults(type, additions) {
						var defaults = this.defaults;
						if (defaults.hasOwnProperty(type)) {
							defaults[type] = helpers.extend(defaults[type], additions);
						}
					},
					addScalesToLayout: function addScalesToLayout(chartInstance) {
						// Adds each scale to the chart.boxes array to be sized accordingly
						helpers.each(chartInstance.scales, function (scale) {
							Chart.layoutService.addBox(chartInstance, scale);
						});
					}
				};
			};
		}, {}], 34: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				/**
     * Namespace to hold static tick generation functions
     * @namespace Chart.Ticks
     */
				Chart.Ticks = {
					/**
      * Namespace to hold generators for different types of ticks
      * @namespace Chart.Ticks.generators
      */
					generators: {
						/**
       * Interface for the options provided to the numeric tick generator
       * @interface INumericTickGenerationOptions
       */
						/**
       * The maximum number of ticks to display
       * @name INumericTickGenerationOptions#maxTicks
       * @type Number
       */
						/**
       * The distance between each tick.
       * @name INumericTickGenerationOptions#stepSize
       * @type Number
       * @optional
       */
						/**
       * Forced minimum for the ticks. If not specified, the minimum of the data range is used to calculate the tick minimum
       * @name INumericTickGenerationOptions#min
       * @type Number
       * @optional
       */
						/**
       * The maximum value of the ticks. If not specified, the maximum of the data range is used to calculate the tick maximum
       * @name INumericTickGenerationOptions#max
       * @type Number
       * @optional
       */

						/**
       * Generate a set of linear ticks
       * @method Chart.Ticks.generators.linear
       * @param generationOptions {INumericTickGenerationOptions} the options used to generate the ticks
       * @param dataRange {IRange} the range of the data
       * @returns {Array<Number>} array of tick values
       */
						linear: function linear(generationOptions, dataRange) {
							var ticks = [];
							// To get a "nice" value for the tick spacing, we will use the appropriately named
							// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
							// for details.

							var spacing;
							if (generationOptions.stepSize && generationOptions.stepSize > 0) {
								spacing = generationOptions.stepSize;
							} else {
								var niceRange = helpers.niceNum(dataRange.max - dataRange.min, false);
								spacing = helpers.niceNum(niceRange / (generationOptions.maxTicks - 1), true);
							}
							var niceMin = Math.floor(dataRange.min / spacing) * spacing;
							var niceMax = Math.ceil(dataRange.max / spacing) * spacing;

							// If min, max and stepSize is set and they make an evenly spaced scale use it.
							if (generationOptions.min && generationOptions.max && generationOptions.stepSize) {
								// If very close to our whole number, use it.
								if (helpers.almostWhole((generationOptions.max - generationOptions.min) / generationOptions.stepSize, spacing / 1000)) {
									niceMin = generationOptions.min;
									niceMax = generationOptions.max;
								}
							}

							var numSpaces = (niceMax - niceMin) / spacing;
							// If very close to our rounded value, use it.
							if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
								numSpaces = Math.round(numSpaces);
							} else {
								numSpaces = Math.ceil(numSpaces);
							}

							// Put the values into the ticks array
							ticks.push(generationOptions.min !== undefined ? generationOptions.min : niceMin);
							for (var j = 1; j < numSpaces; ++j) {
								ticks.push(niceMin + j * spacing);
							}
							ticks.push(generationOptions.max !== undefined ? generationOptions.max : niceMax);

							return ticks;
						},

						/**
       * Generate a set of logarithmic ticks
       * @method Chart.Ticks.generators.logarithmic
       * @param generationOptions {INumericTickGenerationOptions} the options used to generate the ticks
       * @param dataRange {IRange} the range of the data
       * @returns {Array<Number>} array of tick values
       */
						logarithmic: function logarithmic(generationOptions, dataRange) {
							var ticks = [];
							var getValueOrDefault = helpers.getValueOrDefault;

							// Figure out what the max number of ticks we can support it is based on the size of
							// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
							// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
							// the graph
							var tickVal = getValueOrDefault(generationOptions.min, Math.pow(10, Math.floor(helpers.log10(dataRange.min))));

							var endExp = Math.floor(helpers.log10(dataRange.max));
							var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
							var exp;
							var significand;

							if (tickVal === 0) {
								exp = Math.floor(helpers.log10(dataRange.minNotZero));
								significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));

								ticks.push(tickVal);
								tickVal = significand * Math.pow(10, exp);
							} else {
								exp = Math.floor(helpers.log10(tickVal));
								significand = Math.floor(tickVal / Math.pow(10, exp));
							}

							do {
								ticks.push(tickVal);

								++significand;
								if (significand === 10) {
									significand = 1;
									++exp;
								}

								tickVal = significand * Math.pow(10, exp);
							} while (exp < endExp || exp === endExp && significand < endSignificand);

							var lastTick = getValueOrDefault(generationOptions.max, tickVal);
							ticks.push(lastTick);

							return ticks;
						}
					},

					/**
      * Namespace to hold formatters for different types of ticks
      * @namespace Chart.Ticks.formatters
      */
					formatters: {
						/**
       * Formatter for value labels
       * @method Chart.Ticks.formatters.values
       * @param value the value to display
       * @return {String|Array} the label to display
       */
						values: function values(value) {
							return helpers.isArray(value) ? value : '' + value;
						},

						/**
       * Formatter for linear numeric ticks
       * @method Chart.Ticks.formatters.linear
       * @param tickValue {Number} the value to be formatted
       * @param index {Number} the position of the tickValue parameter in the ticks array
       * @param ticks {Array<Number>} the list of ticks being converted
       * @return {String} string representation of the tickValue parameter
       */
						linear: function linear(tickValue, index, ticks) {
							// If we have lots of ticks, don't use the ones
							var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

							// If we have a number like 2.5 as the delta, figure out how many decimal places we need
							if (Math.abs(delta) > 1) {
								if (tickValue !== Math.floor(tickValue)) {
									// not an integer
									delta = tickValue - Math.floor(tickValue);
								}
							}

							var logDelta = helpers.log10(Math.abs(delta));
							var tickString = '';

							if (tickValue !== 0) {
								var numDecimal = -1 * Math.floor(logDelta);
								numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
								tickString = tickValue.toFixed(numDecimal);
							} else {
								tickString = '0'; // never show decimal places for 0
							}

							return tickString;
						},

						logarithmic: function logarithmic(tickValue, index, ticks) {
							var remain = tickValue / Math.pow(10, Math.floor(helpers.log10(tickValue)));

							if (tickValue === 0) {
								return '0';
							} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === ticks.length - 1) {
								return tickValue.toExponential();
							}
							return '';
						}
					}
				};
			};
		}, {}], 35: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				Chart.defaults.global.title = {
					display: false,
					position: 'top',
					fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)

					fontStyle: 'bold',
					padding: 10,

					// actual title
					text: ''
				};

				var noop = helpers.noop;
				Chart.Title = Chart.Element.extend({

					initialize: function initialize(config) {
						var me = this;
						helpers.extend(me, config);

						// Contains hit boxes for each dataset (in dataset order)
						me.legendHitBoxes = [];
					},

					// These methods are ordered by lifecycle. Utilities then follow.

					beforeUpdate: noop,
					update: function update(maxWidth, maxHeight, margins) {
						var me = this;

						// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
						me.beforeUpdate();

						// Absorb the master measurements
						me.maxWidth = maxWidth;
						me.maxHeight = maxHeight;
						me.margins = margins;

						// Dimensions
						me.beforeSetDimensions();
						me.setDimensions();
						me.afterSetDimensions();
						// Labels
						me.beforeBuildLabels();
						me.buildLabels();
						me.afterBuildLabels();

						// Fit
						me.beforeFit();
						me.fit();
						me.afterFit();
						//
						me.afterUpdate();

						return me.minSize;
					},
					afterUpdate: noop,

					//

					beforeSetDimensions: noop,
					setDimensions: function setDimensions() {
						var me = this;
						// Set the unconstrained dimension before label rotation
						if (me.isHorizontal()) {
							// Reset position before calculating rotation
							me.width = me.maxWidth;
							me.left = 0;
							me.right = me.width;
						} else {
							me.height = me.maxHeight;

							// Reset position before calculating rotation
							me.top = 0;
							me.bottom = me.height;
						}

						// Reset padding
						me.paddingLeft = 0;
						me.paddingTop = 0;
						me.paddingRight = 0;
						me.paddingBottom = 0;

						// Reset minSize
						me.minSize = {
							width: 0,
							height: 0
						};
					},
					afterSetDimensions: noop,

					//

					beforeBuildLabels: noop,
					buildLabels: noop,
					afterBuildLabels: noop,

					//

					beforeFit: noop,
					fit: function fit() {
						var me = this,
						    valueOrDefault = helpers.getValueOrDefault,
						    opts = me.options,
						    globalDefaults = Chart.defaults.global,
						    display = opts.display,
						    fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
						    minSize = me.minSize;

						if (me.isHorizontal()) {
							minSize.width = me.maxWidth; // fill all the width
							minSize.height = display ? fontSize + opts.padding * 2 : 0;
						} else {
							minSize.width = display ? fontSize + opts.padding * 2 : 0;
							minSize.height = me.maxHeight; // fill all the height
						}

						me.width = minSize.width;
						me.height = minSize.height;
					},
					afterFit: noop,

					// Shared Methods
					isHorizontal: function isHorizontal() {
						var pos = this.options.position;
						return pos === 'top' || pos === 'bottom';
					},

					// Actually draw the title block on the canvas
					draw: function draw() {
						var me = this,
						    ctx = me.ctx,
						    valueOrDefault = helpers.getValueOrDefault,
						    opts = me.options,
						    globalDefaults = Chart.defaults.global;

						if (opts.display) {
							var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
							    fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
							    fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
							    titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
							    rotation = 0,
							    titleX,
							    titleY,
							    top = me.top,
							    left = me.left,
							    bottom = me.bottom,
							    right = me.right,
							    maxWidth;

							ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
							ctx.font = titleFont;

							// Horizontal
							if (me.isHorizontal()) {
								titleX = left + (right - left) / 2; // midpoint of the width
								titleY = top + (bottom - top) / 2; // midpoint of the height
								maxWidth = right - left;
							} else {
								titleX = opts.position === 'left' ? left + fontSize / 2 : right - fontSize / 2;
								titleY = top + (bottom - top) / 2;
								maxWidth = bottom - top;
								rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
							}

							ctx.save();
							ctx.translate(titleX, titleY);
							ctx.rotate(rotation);
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.fillText(opts.text, 0, 0, maxWidth);
							ctx.restore();
						}
					}
				});

				function createNewTitleBlockAndAttach(chartInstance, titleOpts) {
					var title = new Chart.Title({
						ctx: chartInstance.chart.ctx,
						options: titleOpts,
						chart: chartInstance
					});
					chartInstance.titleBlock = title;
					Chart.layoutService.addBox(chartInstance, title);
				}

				// Register the title plugin
				Chart.plugins.register({
					beforeInit: function beforeInit(chartInstance) {
						var titleOpts = chartInstance.options.title;

						if (titleOpts) {
							createNewTitleBlockAndAttach(chartInstance, titleOpts);
						}
					},
					beforeUpdate: function beforeUpdate(chartInstance) {
						var titleOpts = chartInstance.options.title;

						if (titleOpts) {
							titleOpts = helpers.configMerge(Chart.defaults.global.title, titleOpts);

							if (chartInstance.titleBlock) {
								chartInstance.titleBlock.options = titleOpts;
							} else {
								createNewTitleBlockAndAttach(chartInstance, titleOpts);
							}
						} else {
							Chart.layoutService.removeBox(chartInstance, chartInstance.titleBlock);
							delete chartInstance.titleBlock;
						}
					}
				});
			};
		}, {}], 36: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				/**
    	 * Helper method to merge the opacity into a color
    	 */
				function mergeOpacity(colorString, opacity) {
					var color = helpers.color(colorString);
					return color.alpha(opacity * color.alpha()).rgbaString();
				}

				Chart.defaults.global.tooltips = {
					enabled: true,
					custom: null,
					mode: 'nearest',
					position: 'average',
					intersect: true,
					backgroundColor: 'rgba(0,0,0,0.8)',
					titleFontStyle: 'bold',
					titleSpacing: 2,
					titleMarginBottom: 6,
					titleFontColor: '#fff',
					titleAlign: 'left',
					bodySpacing: 2,
					bodyFontColor: '#fff',
					bodyAlign: 'left',
					footerFontStyle: 'bold',
					footerSpacing: 2,
					footerMarginTop: 6,
					footerFontColor: '#fff',
					footerAlign: 'left',
					yPadding: 6,
					xPadding: 6,
					caretSize: 5,
					cornerRadius: 6,
					multiKeyBackground: '#fff',
					displayColors: true,
					callbacks: {
						// Args are: (tooltipItems, data)
						beforeTitle: helpers.noop,
						title: function title(tooltipItems, data) {
							// Pick first xLabel for now
							var title = '';
							var labels = data.labels;
							var labelCount = labels ? labels.length : 0;

							if (tooltipItems.length > 0) {
								var item = tooltipItems[0];

								if (item.xLabel) {
									title = item.xLabel;
								} else if (labelCount > 0 && item.index < labelCount) {
									title = labels[item.index];
								}
							}

							return title;
						},
						afterTitle: helpers.noop,

						// Args are: (tooltipItems, data)
						beforeBody: helpers.noop,

						// Args are: (tooltipItem, data)
						beforeLabel: helpers.noop,
						label: function label(tooltipItem, data) {
							var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
							return datasetLabel + ': ' + tooltipItem.yLabel;
						},
						labelColor: function labelColor(tooltipItem, chartInstance) {
							var meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex);
							var activeElement = meta.data[tooltipItem.index];
							var view = activeElement._view;
							return {
								borderColor: view.borderColor,
								backgroundColor: view.backgroundColor
							};
						},
						afterLabel: helpers.noop,

						// Args are: (tooltipItems, data)
						afterBody: helpers.noop,

						// Args are: (tooltipItems, data)
						beforeFooter: helpers.noop,
						footer: helpers.noop,
						afterFooter: helpers.noop
					}
				};

				// Helper to push or concat based on if the 2nd parameter is an array or not
				function pushOrConcat(base, toPush) {
					if (toPush) {
						if (helpers.isArray(toPush)) {
							// base = base.concat(toPush);
							Array.prototype.push.apply(base, toPush);
						} else {
							base.push(toPush);
						}
					}

					return base;
				}

				// Private helper to create a tooltip item model
				// @param element : the chart element (point, arc, bar) to create the tooltip item for
				// @return : new tooltip item
				function createTooltipItem(element) {
					var xScale = element._xScale;
					var yScale = element._yScale || element._scale; // handle radar || polarArea charts
					var index = element._index,
					    datasetIndex = element._datasetIndex;

					return {
						xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
						yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
						index: index,
						datasetIndex: datasetIndex,
						x: element._model.x,
						y: element._model.y
					};
				}

				/**
     * Helper to get the reset model for the tooltip
     * @param tooltipOpts {Object} the tooltip options
     */
				function getBaseModel(tooltipOpts) {
					var globalDefaults = Chart.defaults.global;
					var getValueOrDefault = helpers.getValueOrDefault;

					return {
						// Positioning
						xPadding: tooltipOpts.xPadding,
						yPadding: tooltipOpts.yPadding,
						xAlign: tooltipOpts.xAlign,
						yAlign: tooltipOpts.yAlign,

						// Body
						bodyFontColor: tooltipOpts.bodyFontColor,
						_bodyFontFamily: getValueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
						_bodyFontStyle: getValueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
						_bodyAlign: tooltipOpts.bodyAlign,
						bodyFontSize: getValueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
						bodySpacing: tooltipOpts.bodySpacing,

						// Title
						titleFontColor: tooltipOpts.titleFontColor,
						_titleFontFamily: getValueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
						_titleFontStyle: getValueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
						titleFontSize: getValueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
						_titleAlign: tooltipOpts.titleAlign,
						titleSpacing: tooltipOpts.titleSpacing,
						titleMarginBottom: tooltipOpts.titleMarginBottom,

						// Footer
						footerFontColor: tooltipOpts.footerFontColor,
						_footerFontFamily: getValueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
						_footerFontStyle: getValueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
						footerFontSize: getValueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
						_footerAlign: tooltipOpts.footerAlign,
						footerSpacing: tooltipOpts.footerSpacing,
						footerMarginTop: tooltipOpts.footerMarginTop,

						// Appearance
						caretSize: tooltipOpts.caretSize,
						cornerRadius: tooltipOpts.cornerRadius,
						backgroundColor: tooltipOpts.backgroundColor,
						opacity: 0,
						legendColorBackground: tooltipOpts.multiKeyBackground,
						displayColors: tooltipOpts.displayColors
					};
				}

				/**
     * Get the size of the tooltip
     */
				function getTooltipSize(tooltip, model) {
					var ctx = tooltip._chart.ctx;

					var height = model.yPadding * 2; // Tooltip Padding
					var width = 0;

					// Count of all lines in the body
					var body = model.body;
					var combinedBodyLength = body.reduce(function (count, bodyItem) {
						return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
					}, 0);
					combinedBodyLength += model.beforeBody.length + model.afterBody.length;

					var titleLineCount = model.title.length;
					var footerLineCount = model.footer.length;
					var titleFontSize = model.titleFontSize,
					    bodyFontSize = model.bodyFontSize,
					    footerFontSize = model.footerFontSize;

					height += titleLineCount * titleFontSize; // Title Lines
					height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0; // Title Line Spacing
					height += titleLineCount ? model.titleMarginBottom : 0; // Title's bottom Margin
					height += combinedBodyLength * bodyFontSize; // Body Lines
					height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0; // Body Line Spacing
					height += footerLineCount ? model.footerMarginTop : 0; // Footer Margin
					height += footerLineCount * footerFontSize; // Footer Lines
					height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0; // Footer Line Spacing

					// Title width
					var widthPadding = 0;
					var maxLineWidth = function maxLineWidth(line) {
						width = Math.max(width, ctx.measureText(line).width + widthPadding);
					};

					ctx.font = helpers.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
					helpers.each(model.title, maxLineWidth);

					// Body width
					ctx.font = helpers.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
					helpers.each(model.beforeBody.concat(model.afterBody), maxLineWidth);

					// Body lines may include some extra width due to the color box
					widthPadding = model.displayColors ? bodyFontSize + 2 : 0;
					helpers.each(body, function (bodyItem) {
						helpers.each(bodyItem.before, maxLineWidth);
						helpers.each(bodyItem.lines, maxLineWidth);
						helpers.each(bodyItem.after, maxLineWidth);
					});

					// Reset back to 0
					widthPadding = 0;

					// Footer width
					ctx.font = helpers.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
					helpers.each(model.footer, maxLineWidth);

					// Add padding
					width += 2 * model.xPadding;

					return {
						width: width,
						height: height
					};
				}

				/**
     * Helper to get the alignment of a tooltip given the size
     */
				function determineAlignment(tooltip, size) {
					var model = tooltip._model;
					var chart = tooltip._chart;
					var chartArea = tooltip._chartInstance.chartArea;
					var xAlign = 'center';
					var yAlign = 'center';

					if (model.y < size.height) {
						yAlign = 'top';
					} else if (model.y > chart.height - size.height) {
						yAlign = 'bottom';
					}

					var lf, rf; // functions to determine left, right alignment
					var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
					var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
					var midX = (chartArea.left + chartArea.right) / 2;
					var midY = (chartArea.top + chartArea.bottom) / 2;

					if (yAlign === 'center') {
						lf = function lf(x) {
							return x <= midX;
						};
						rf = function rf(x) {
							return x > midX;
						};
					} else {
						lf = function lf(x) {
							return x <= size.width / 2;
						};
						rf = function rf(x) {
							return x >= chart.width - size.width / 2;
						};
					}

					olf = function olf(x) {
						return x + size.width > chart.width;
					};
					orf = function orf(x) {
						return x - size.width < 0;
					};
					yf = function yf(y) {
						return y <= midY ? 'top' : 'bottom';
					};

					if (lf(model.x)) {
						xAlign = 'left';

						// Is tooltip too wide and goes over the right side of the chart.?
						if (olf(model.x)) {
							xAlign = 'center';
							yAlign = yf(model.y);
						}
					} else if (rf(model.x)) {
						xAlign = 'right';

						// Is tooltip too wide and goes outside left edge of canvas?
						if (orf(model.x)) {
							xAlign = 'center';
							yAlign = yf(model.y);
						}
					}

					var opts = tooltip._options;
					return {
						xAlign: opts.xAlign ? opts.xAlign : xAlign,
						yAlign: opts.yAlign ? opts.yAlign : yAlign
					};
				}

				/**
     * @Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
     */
				function getBackgroundPoint(vm, size, alignment) {
					// Background Position
					var x = vm.x;
					var y = vm.y;

					var caretSize = vm.caretSize,
					    caretPadding = vm.caretPadding,
					    cornerRadius = vm.cornerRadius,
					    xAlign = alignment.xAlign,
					    yAlign = alignment.yAlign,
					    paddingAndSize = caretSize + caretPadding,
					    radiusAndPadding = cornerRadius + caretPadding;

					if (xAlign === 'right') {
						x -= size.width;
					} else if (xAlign === 'center') {
						x -= size.width / 2;
					}

					if (yAlign === 'top') {
						y += paddingAndSize;
					} else if (yAlign === 'bottom') {
						y -= size.height + paddingAndSize;
					} else {
						y -= size.height / 2;
					}

					if (yAlign === 'center') {
						if (xAlign === 'left') {
							x += paddingAndSize;
						} else if (xAlign === 'right') {
							x -= paddingAndSize;
						}
					} else if (xAlign === 'left') {
						x -= radiusAndPadding;
					} else if (xAlign === 'right') {
						x += radiusAndPadding;
					}

					return {
						x: x,
						y: y
					};
				}

				Chart.Tooltip = Chart.Element.extend({
					initialize: function initialize() {
						this._model = getBaseModel(this._options);
					},

					// Get the title
					// Args are: (tooltipItem, data)
					getTitle: function getTitle() {
						var me = this;
						var opts = me._options;
						var callbacks = opts.callbacks;

						var beforeTitle = callbacks.beforeTitle.apply(me, arguments),
						    title = callbacks.title.apply(me, arguments),
						    afterTitle = callbacks.afterTitle.apply(me, arguments);

						var lines = [];
						lines = pushOrConcat(lines, beforeTitle);
						lines = pushOrConcat(lines, title);
						lines = pushOrConcat(lines, afterTitle);

						return lines;
					},

					// Args are: (tooltipItem, data)
					getBeforeBody: function getBeforeBody() {
						var lines = this._options.callbacks.beforeBody.apply(this, arguments);
						return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
					},

					// Args are: (tooltipItem, data)
					getBody: function getBody(tooltipItems, data) {
						var me = this;
						var callbacks = me._options.callbacks;
						var bodyItems = [];

						helpers.each(tooltipItems, function (tooltipItem) {
							var bodyItem = {
								before: [],
								lines: [],
								after: []
							};
							pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
							pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
							pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));

							bodyItems.push(bodyItem);
						});

						return bodyItems;
					},

					// Args are: (tooltipItem, data)
					getAfterBody: function getAfterBody() {
						var lines = this._options.callbacks.afterBody.apply(this, arguments);
						return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
					},

					// Get the footer and beforeFooter and afterFooter lines
					// Args are: (tooltipItem, data)
					getFooter: function getFooter() {
						var me = this;
						var callbacks = me._options.callbacks;

						var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
						var footer = callbacks.footer.apply(me, arguments);
						var afterFooter = callbacks.afterFooter.apply(me, arguments);

						var lines = [];
						lines = pushOrConcat(lines, beforeFooter);
						lines = pushOrConcat(lines, footer);
						lines = pushOrConcat(lines, afterFooter);

						return lines;
					},

					update: function update(changed) {
						var me = this;
						var opts = me._options;

						// Need to regenerate the model because its faster than using extend and it is necessary due to the optimization in Chart.Element.transition
						// that does _view = _model if ease === 1. This causes the 2nd tooltip update to set properties in both the view and model at the same time
						// which breaks any animations.
						var existingModel = me._model;
						var model = me._model = getBaseModel(opts);
						var active = me._active;

						var data = me._data;
						var chartInstance = me._chartInstance;

						// In the case where active.length === 0 we need to keep these at existing values for good animations
						var alignment = {
							xAlign: existingModel.xAlign,
							yAlign: existingModel.yAlign
						};
						var backgroundPoint = {
							x: existingModel.x,
							y: existingModel.y
						};
						var tooltipSize = {
							width: existingModel.width,
							height: existingModel.height
						};
						var tooltipPosition = {
							x: existingModel.caretX,
							y: existingModel.caretY
						};

						var i, len;

						if (active.length) {
							model.opacity = 1;

							var labelColors = [];
							tooltipPosition = Chart.Tooltip.positioners[opts.position](active, me._eventPosition);

							var tooltipItems = [];
							for (i = 0, len = active.length; i < len; ++i) {
								tooltipItems.push(createTooltipItem(active[i]));
							}

							// If the user provided a filter function, use it to modify the tooltip items
							if (opts.filter) {
								tooltipItems = tooltipItems.filter(function (a) {
									return opts.filter(a, data);
								});
							}

							// If the user provided a sorting function, use it to modify the tooltip items
							if (opts.itemSort) {
								tooltipItems = tooltipItems.sort(function (a, b) {
									return opts.itemSort(a, b, data);
								});
							}

							// Determine colors for boxes
							helpers.each(tooltipItems, function (tooltipItem) {
								labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, chartInstance));
							});

							// Build the Text Lines
							model.title = me.getTitle(tooltipItems, data);
							model.beforeBody = me.getBeforeBody(tooltipItems, data);
							model.body = me.getBody(tooltipItems, data);
							model.afterBody = me.getAfterBody(tooltipItems, data);
							model.footer = me.getFooter(tooltipItems, data);

							// Initial positioning and colors
							model.x = Math.round(tooltipPosition.x);
							model.y = Math.round(tooltipPosition.y);
							model.caretPadding = helpers.getValueOrDefault(tooltipPosition.padding, 2);
							model.labelColors = labelColors;

							// data points
							model.dataPoints = tooltipItems;

							// We need to determine alignment of the tooltip
							tooltipSize = getTooltipSize(this, model);
							alignment = determineAlignment(this, tooltipSize);
							// Final Size and Position
							backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment);
						} else {
							model.opacity = 0;
						}

						model.xAlign = alignment.xAlign;
						model.yAlign = alignment.yAlign;
						model.x = backgroundPoint.x;
						model.y = backgroundPoint.y;
						model.width = tooltipSize.width;
						model.height = tooltipSize.height;

						// Point where the caret on the tooltip points to
						model.caretX = tooltipPosition.x;
						model.caretY = tooltipPosition.y;

						me._model = model;

						if (changed && opts.custom) {
							opts.custom.call(me, model);
						}

						return me;
					},
					drawCaret: function drawCaret(tooltipPoint, size, opacity) {
						var vm = this._view;
						var ctx = this._chart.ctx;
						var x1, x2, x3;
						var y1, y2, y3;
						var caretSize = vm.caretSize;
						var cornerRadius = vm.cornerRadius;
						var xAlign = vm.xAlign,
						    yAlign = vm.yAlign;
						var ptX = tooltipPoint.x,
						    ptY = tooltipPoint.y;
						var width = size.width,
						    height = size.height;

						if (yAlign === 'center') {
							// Left or right side
							if (xAlign === 'left') {
								x1 = ptX;
								x2 = x1 - caretSize;
								x3 = x1;
							} else {
								x1 = ptX + width;
								x2 = x1 + caretSize;
								x3 = x1;
							}

							y2 = ptY + height / 2;
							y1 = y2 - caretSize;
							y3 = y2 + caretSize;
						} else {
							if (xAlign === 'left') {
								x1 = ptX + cornerRadius;
								x2 = x1 + caretSize;
								x3 = x2 + caretSize;
							} else if (xAlign === 'right') {
								x1 = ptX + width - cornerRadius;
								x2 = x1 - caretSize;
								x3 = x2 - caretSize;
							} else {
								x2 = ptX + width / 2;
								x1 = x2 - caretSize;
								x3 = x2 + caretSize;
							}

							if (yAlign === 'top') {
								y1 = ptY;
								y2 = y1 - caretSize;
								y3 = y1;
							} else {
								y1 = ptY + height;
								y2 = y1 + caretSize;
								y3 = y1;
							}
						}

						ctx.fillStyle = mergeOpacity(vm.backgroundColor, opacity);
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.lineTo(x3, y3);
						ctx.closePath();
						ctx.fill();
					},
					drawTitle: function drawTitle(pt, vm, ctx, opacity) {
						var title = vm.title;

						if (title.length) {
							ctx.textAlign = vm._titleAlign;
							ctx.textBaseline = 'top';

							var titleFontSize = vm.titleFontSize,
							    titleSpacing = vm.titleSpacing;

							ctx.fillStyle = mergeOpacity(vm.titleFontColor, opacity);
							ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

							var i, len;
							for (i = 0, len = title.length; i < len; ++i) {
								ctx.fillText(title[i], pt.x, pt.y);
								pt.y += titleFontSize + titleSpacing; // Line Height and spacing

								if (i + 1 === title.length) {
									pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
								}
							}
						}
					},
					drawBody: function drawBody(pt, vm, ctx, opacity) {
						var bodyFontSize = vm.bodyFontSize;
						var bodySpacing = vm.bodySpacing;
						var body = vm.body;

						ctx.textAlign = vm._bodyAlign;
						ctx.textBaseline = 'top';

						var textColor = mergeOpacity(vm.bodyFontColor, opacity);
						ctx.fillStyle = textColor;
						ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

						// Before Body
						var xLinePadding = 0;
						var fillLineOfText = function fillLineOfText(line) {
							ctx.fillText(line, pt.x + xLinePadding, pt.y);
							pt.y += bodyFontSize + bodySpacing;
						};

						// Before body lines
						helpers.each(vm.beforeBody, fillLineOfText);

						var drawColorBoxes = vm.displayColors;
						xLinePadding = drawColorBoxes ? bodyFontSize + 2 : 0;

						// Draw body lines now
						helpers.each(body, function (bodyItem, i) {
							helpers.each(bodyItem.before, fillLineOfText);

							helpers.each(bodyItem.lines, function (line) {
								// Draw Legend-like boxes if needed
								if (drawColorBoxes) {
									// Fill a white rect so that colours merge nicely if the opacity is < 1
									ctx.fillStyle = mergeOpacity(vm.legendColorBackground, opacity);
									ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

									// Border
									ctx.strokeStyle = mergeOpacity(vm.labelColors[i].borderColor, opacity);
									ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

									// Inner square
									ctx.fillStyle = mergeOpacity(vm.labelColors[i].backgroundColor, opacity);
									ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);

									ctx.fillStyle = textColor;
								}

								fillLineOfText(line);
							});

							helpers.each(bodyItem.after, fillLineOfText);
						});

						// Reset back to 0 for after body
						xLinePadding = 0;

						// After body lines
						helpers.each(vm.afterBody, fillLineOfText);
						pt.y -= bodySpacing; // Remove last body spacing
					},
					drawFooter: function drawFooter(pt, vm, ctx, opacity) {
						var footer = vm.footer;

						if (footer.length) {
							pt.y += vm.footerMarginTop;

							ctx.textAlign = vm._footerAlign;
							ctx.textBaseline = 'top';

							ctx.fillStyle = mergeOpacity(vm.footerFontColor, opacity);
							ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

							helpers.each(footer, function (line) {
								ctx.fillText(line, pt.x, pt.y);
								pt.y += vm.footerFontSize + vm.footerSpacing;
							});
						}
					},
					drawBackground: function drawBackground(pt, vm, ctx, tooltipSize, opacity) {
						ctx.fillStyle = mergeOpacity(vm.backgroundColor, opacity);
						helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
						ctx.fill();
					},
					draw: function draw() {
						var ctx = this._chart.ctx;
						var vm = this._view;

						if (vm.opacity === 0) {
							return;
						}

						var tooltipSize = {
							width: vm.width,
							height: vm.height
						};
						var pt = {
							x: vm.x,
							y: vm.y
						};

						// IE11/Edge does not like very small opacities, so snap to 0
						var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

						if (this._options.enabled) {
							// Draw Background
							this.drawBackground(pt, vm, ctx, tooltipSize, opacity);

							// Draw Caret
							this.drawCaret(pt, tooltipSize, opacity);

							// Draw Title, Body, and Footer
							pt.x += vm.xPadding;
							pt.y += vm.yPadding;

							// Titles
							this.drawTitle(pt, vm, ctx, opacity);

							// Body
							this.drawBody(pt, vm, ctx, opacity);

							// Footer
							this.drawFooter(pt, vm, ctx, opacity);
						}
					},

					/**
      * Handle an event
      * @private
      * @param {IEvent} event - The event to handle
      * @returns {Boolean} true if the tooltip changed
      */
					handleEvent: function handleEvent(e) {
						var me = this;
						var options = me._options;
						var changed = false;

						me._lastActive = me._lastActive || [];

						// Find Active Elements for tooltips
						if (e.type === 'mouseout') {
							me._active = [];
						} else {
							me._active = me._chartInstance.getElementsAtEventForMode(e, options.mode, options);
						}

						// Remember Last Actives
						changed = !helpers.arrayEquals(me._active, me._lastActive);
						me._lastActive = me._active;

						if (options.enabled || options.custom) {
							me._eventPosition = {
								x: e.x,
								y: e.y
							};

							var model = me._model;
							me.update(true);
							me.pivot();

							// See if our tooltip position changed
							changed |= model.x !== me._model.x || model.y !== me._model.y;
						}

						return changed;
					}
				});

				/**
     * @namespace Chart.Tooltip.positioners
     */
				Chart.Tooltip.positioners = {
					/**
      * Average mode places the tooltip at the average position of the elements shown
      * @function Chart.Tooltip.positioners.average
      * @param elements {ChartElement[]} the elements being displayed in the tooltip
      * @returns {Point} tooltip position
      */
					average: function average(elements) {
						if (!elements.length) {
							return false;
						}

						var i, len;
						var x = 0;
						var y = 0;
						var count = 0;

						for (i = 0, len = elements.length; i < len; ++i) {
							var el = elements[i];
							if (el && el.hasValue()) {
								var pos = el.tooltipPosition();
								x += pos.x;
								y += pos.y;
								++count;
							}
						}

						return {
							x: Math.round(x / count),
							y: Math.round(y / count)
						};
					},

					/**
      * Gets the tooltip position nearest of the item nearest to the event position
      * @function Chart.Tooltip.positioners.nearest
      * @param elements {Chart.Element[]} the tooltip elements
      * @param eventPosition {Point} the position of the event in canvas coordinates
      * @returns {Point} the tooltip position
      */
					nearest: function nearest(elements, eventPosition) {
						var x = eventPosition.x;
						var y = eventPosition.y;

						var nearestElement;
						var minDistance = Number.POSITIVE_INFINITY;
						var i, len;
						for (i = 0, len = elements.length; i < len; ++i) {
							var el = elements[i];
							if (el && el.hasValue()) {
								var center = el.getCenterPoint();
								var d = helpers.distanceBetweenPoints(eventPosition, center);

								if (d < minDistance) {
									minDistance = d;
									nearestElement = el;
								}
							}
						}

						if (nearestElement) {
							var tp = nearestElement.tooltipPosition();
							x = tp.x;
							y = tp.y;
						}

						return {
							x: x,
							y: y
						};
					}
				};
			};
		}, {}], 37: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers,
				    globalOpts = Chart.defaults.global;

				globalOpts.elements.arc = {
					backgroundColor: globalOpts.defaultColor,
					borderColor: '#fff',
					borderWidth: 2
				};

				Chart.elements.Arc = Chart.Element.extend({
					inLabelRange: function inLabelRange(mouseX) {
						var vm = this._view;

						if (vm) {
							return Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2);
						}
						return false;
					},
					inRange: function inRange(chartX, chartY) {
						var vm = this._view;

						if (vm) {
							var pointRelativePosition = helpers.getAngleFromPoint(vm, {
								x: chartX,
								y: chartY
							}),
							    angle = pointRelativePosition.angle,
							    distance = pointRelativePosition.distance;

							// Sanitise angle range
							var startAngle = vm.startAngle;
							var endAngle = vm.endAngle;
							while (endAngle < startAngle) {
								endAngle += 2.0 * Math.PI;
							}
							while (angle > endAngle) {
								angle -= 2.0 * Math.PI;
							}
							while (angle < startAngle) {
								angle += 2.0 * Math.PI;
							}

							// Check if within the range of the open/close angle
							var betweenAngles = angle >= startAngle && angle <= endAngle,
							    withinRadius = distance >= vm.innerRadius && distance <= vm.outerRadius;

							return betweenAngles && withinRadius;
						}
						return false;
					},
					getCenterPoint: function getCenterPoint() {
						var vm = this._view;
						var halfAngle = (vm.startAngle + vm.endAngle) / 2;
						var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
						return {
							x: vm.x + Math.cos(halfAngle) * halfRadius,
							y: vm.y + Math.sin(halfAngle) * halfRadius
						};
					},
					getArea: function getArea() {
						var vm = this._view;
						return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
					},
					tooltipPosition: function tooltipPosition() {
						var vm = this._view;

						var centreAngle = vm.startAngle + (vm.endAngle - vm.startAngle) / 2,
						    rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
						return {
							x: vm.x + Math.cos(centreAngle) * rangeFromCentre,
							y: vm.y + Math.sin(centreAngle) * rangeFromCentre
						};
					},
					draw: function draw() {

						var ctx = this._chart.ctx,
						    vm = this._view,
						    sA = vm.startAngle,
						    eA = vm.endAngle;

						ctx.beginPath();

						ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
						ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

						ctx.closePath();
						ctx.strokeStyle = vm.borderColor;
						ctx.lineWidth = vm.borderWidth;

						ctx.fillStyle = vm.backgroundColor;

						ctx.fill();
						ctx.lineJoin = 'bevel';

						if (vm.borderWidth) {
							ctx.stroke();
						}
					}
				});
			};
		}, {}], 38: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				var globalDefaults = Chart.defaults.global;

				Chart.defaults.global.elements.line = {
					tension: 0.4,
					backgroundColor: globalDefaults.defaultColor,
					borderWidth: 3,
					borderColor: globalDefaults.defaultColor,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					capBezierPoints: true,
					fill: true // do we fill in the area between the line and its base axis
				};

				Chart.elements.Line = Chart.Element.extend({
					draw: function draw() {
						var me = this;
						var vm = me._view;
						var spanGaps = vm.spanGaps;
						var fillPoint = vm.scaleZero;
						var loop = me._loop;

						// Handle different fill modes for cartesian lines
						if (!loop) {
							if (vm.fill === 'top') {
								fillPoint = vm.scaleTop;
							} else if (vm.fill === 'bottom') {
								fillPoint = vm.scaleBottom;
							}
						}

						var ctx = me._chart.ctx;
						ctx.save();

						// Helper function to draw a line to a point
						function lineToPoint(previousPoint, point) {
							var pointVM = point._view;
							if (point._view.steppedLine === true) {
								ctx.lineTo(pointVM.x, previousPoint._view.y);
								ctx.lineTo(pointVM.x, pointVM.y);
							} else if (point._view.tension === 0) {
								ctx.lineTo(pointVM.x, pointVM.y);
							} else {
								ctx.bezierCurveTo(previousPoint._view.controlPointNextX, previousPoint._view.controlPointNextY, pointVM.controlPointPreviousX, pointVM.controlPointPreviousY, pointVM.x, pointVM.y);
							}
						}

						var points = me._children.slice(); // clone array
						var lastDrawnIndex = -1;

						// If we are looping, adding the first point again
						if (loop && points.length) {
							points.push(points[0]);
						}

						var index, current, previous, currentVM;

						// Fill Line
						if (points.length && vm.fill) {
							ctx.beginPath();

							for (index = 0; index < points.length; ++index) {
								current = points[index];
								previous = helpers.previousItem(points, index);
								currentVM = current._view;

								// First point moves to it's starting position no matter what
								if (index === 0) {
									if (loop) {
										ctx.moveTo(fillPoint.x, fillPoint.y);
									} else {
										ctx.moveTo(currentVM.x, fillPoint);
									}

									if (!currentVM.skip) {
										lastDrawnIndex = index;
										ctx.lineTo(currentVM.x, currentVM.y);
									}
								} else {
									previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

									if (currentVM.skip) {
										// Only do this if this is the first point that is skipped
										if (!spanGaps && lastDrawnIndex === index - 1) {
											if (loop) {
												ctx.lineTo(fillPoint.x, fillPoint.y);
											} else {
												ctx.lineTo(previous._view.x, fillPoint);
											}
										}
									} else {
										if (lastDrawnIndex !== index - 1) {
											// There was a gap and this is the first point after the gap. If we've never drawn a point, this is a special case.
											// If the first data point is NaN, then there is no real gap to skip
											if (spanGaps && lastDrawnIndex !== -1) {
												// We are spanning the gap, so simple draw a line to this point
												lineToPoint(previous, current);
											} else if (loop) {
												ctx.lineTo(currentVM.x, currentVM.y);
											} else {
												ctx.lineTo(currentVM.x, fillPoint);
												ctx.lineTo(currentVM.x, currentVM.y);
											}
										} else {
											// Line to next point
											lineToPoint(previous, current);
										}
										lastDrawnIndex = index;
									}
								}
							}

							if (!loop && lastDrawnIndex !== -1) {
								ctx.lineTo(points[lastDrawnIndex]._view.x, fillPoint);
							}

							ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
							ctx.closePath();
							ctx.fill();
						}

						// Stroke Line Options
						var globalOptionLineElements = globalDefaults.elements.line;
						ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

						// IE 9 and 10 do not support line dash
						if (ctx.setLineDash) {
							ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
						}

						ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
						ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
						ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
						ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

						// Stroke Line
						ctx.beginPath();
						lastDrawnIndex = -1;

						for (index = 0; index < points.length; ++index) {
							current = points[index];
							previous = helpers.previousItem(points, index);
							currentVM = current._view;

							// First point moves to it's starting position no matter what
							if (index === 0) {
								if (!currentVM.skip) {
									ctx.moveTo(currentVM.x, currentVM.y);
									lastDrawnIndex = index;
								}
							} else {
								previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

								if (!currentVM.skip) {
									if (lastDrawnIndex !== index - 1 && !spanGaps || lastDrawnIndex === -1) {
										// There was a gap and this is the first point after the gap
										ctx.moveTo(currentVM.x, currentVM.y);
									} else {
										// Line to next point
										lineToPoint(previous, current);
									}
									lastDrawnIndex = index;
								}
							}
						}

						ctx.stroke();
						ctx.restore();
					}
				});
			};
		}, {}], 39: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers,
				    globalOpts = Chart.defaults.global,
				    defaultColor = globalOpts.defaultColor;

				globalOpts.elements.point = {
					radius: 3,
					pointStyle: 'circle',
					backgroundColor: defaultColor,
					borderWidth: 1,
					borderColor: defaultColor,
					// Hover
					hitRadius: 1,
					hoverRadius: 4,
					hoverBorderWidth: 1
				};

				function xRange(mouseX) {
					var vm = this._view;
					return vm ? Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2) : false;
				}

				function yRange(mouseY) {
					var vm = this._view;
					return vm ? Math.pow(mouseY - vm.y, 2) < Math.pow(vm.radius + vm.hitRadius, 2) : false;
				}

				Chart.elements.Point = Chart.Element.extend({
					inRange: function inRange(mouseX, mouseY) {
						var vm = this._view;
						return vm ? Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2) < Math.pow(vm.hitRadius + vm.radius, 2) : false;
					},

					inLabelRange: xRange,
					inXRange: xRange,
					inYRange: yRange,

					getCenterPoint: function getCenterPoint() {
						var vm = this._view;
						return {
							x: vm.x,
							y: vm.y
						};
					},
					getArea: function getArea() {
						return Math.PI * Math.pow(this._view.radius, 2);
					},
					tooltipPosition: function tooltipPosition() {
						var vm = this._view;
						return {
							x: vm.x,
							y: vm.y,
							padding: vm.radius + vm.borderWidth
						};
					},
					draw: function draw(chartArea) {
						var vm = this._view;
						var model = this._model;
						var ctx = this._chart.ctx;
						var pointStyle = vm.pointStyle;
						var radius = vm.radius;
						var x = vm.x;
						var y = vm.y;
						var color = Chart.helpers.color;
						var errMargin = 1.01; // 1.01 is margin for Accumulated error. (Especially Edge, IE.)
						var ratio = 0;

						if (vm.skip) {
							return;
						}

						ctx.strokeStyle = vm.borderColor || defaultColor;
						ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
						ctx.fillStyle = vm.backgroundColor || defaultColor;

						// Cliping for Points.
						// going out from inner charArea?
						if (chartArea !== undefined && (model.x < chartArea.left || chartArea.right * errMargin < model.x || model.y < chartArea.top || chartArea.bottom * errMargin < model.y)) {
							// Point fade out
							if (model.x < chartArea.left) {
								ratio = (x - model.x) / (chartArea.left - model.x);
							} else if (chartArea.right * errMargin < model.x) {
								ratio = (model.x - x) / (model.x - chartArea.right);
							} else if (model.y < chartArea.top) {
								ratio = (y - model.y) / (chartArea.top - model.y);
							} else if (chartArea.bottom * errMargin < model.y) {
								ratio = (model.y - y) / (model.y - chartArea.bottom);
							}
							ratio = Math.round(ratio * 100) / 100;
							ctx.strokeStyle = color(ctx.strokeStyle).alpha(ratio).rgbString();
							ctx.fillStyle = color(ctx.fillStyle).alpha(ratio).rgbString();
						}

						Chart.canvasHelpers.drawPoint(ctx, pointStyle, radius, x, y);
					}
				});
			};
		}, {}], 40: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var globalOpts = Chart.defaults.global;

				globalOpts.elements.rectangle = {
					backgroundColor: globalOpts.defaultColor,
					borderWidth: 0,
					borderColor: globalOpts.defaultColor,
					borderSkipped: 'bottom'
				};

				function isVertical(bar) {
					return bar._view.width !== undefined;
				}

				/**
     * Helper function to get the bounds of the bar regardless of the orientation
     * @private
     * @param bar {Chart.Element.Rectangle} the bar
     * @return {Bounds} bounds of the bar
     */
				function getBarBounds(bar) {
					var vm = bar._view;
					var x1, x2, y1, y2;

					if (isVertical(bar)) {
						// vertical
						var halfWidth = vm.width / 2;
						x1 = vm.x - halfWidth;
						x2 = vm.x + halfWidth;
						y1 = Math.min(vm.y, vm.base);
						y2 = Math.max(vm.y, vm.base);
					} else {
						// horizontal bar
						var halfHeight = vm.height / 2;
						x1 = Math.min(vm.x, vm.base);
						x2 = Math.max(vm.x, vm.base);
						y1 = vm.y - halfHeight;
						y2 = vm.y + halfHeight;
					}

					return {
						left: x1,
						top: y1,
						right: x2,
						bottom: y2
					};
				}

				Chart.elements.Rectangle = Chart.Element.extend({
					draw: function draw() {
						var ctx = this._chart.ctx;
						var vm = this._view;
						var left, right, top, bottom, signX, signY, borderSkipped;
						var borderWidth = vm.borderWidth;

						if (!vm.horizontal) {
							// bar
							left = vm.x - vm.width / 2;
							right = vm.x + vm.width / 2;
							top = vm.y;
							bottom = vm.base;
							signX = 1;
							signY = bottom > top ? 1 : -1;
							borderSkipped = vm.borderSkipped || 'bottom';
						} else {
							// horizontal bar
							left = vm.base;
							right = vm.x;
							top = vm.y - vm.height / 2;
							bottom = vm.y + vm.height / 2;
							signX = right > left ? 1 : -1;
							signY = 1;
							borderSkipped = vm.borderSkipped || 'left';
						}

						// Canvas doesn't allow us to stroke inside the width so we can
						// adjust the sizes to fit if we're setting a stroke on the line
						if (borderWidth) {
							// borderWidth shold be less than bar width and bar height.
							var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
							borderWidth = borderWidth > barSize ? barSize : borderWidth;
							var halfStroke = borderWidth / 2;
							// Adjust borderWidth when bar top position is near vm.base(zero).
							var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
							var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
							var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
							var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
							// not become a vertical line?
							if (borderLeft !== borderRight) {
								top = borderTop;
								bottom = borderBottom;
							}
							// not become a horizontal line?
							if (borderTop !== borderBottom) {
								left = borderLeft;
								right = borderRight;
							}
						}

						ctx.beginPath();
						ctx.fillStyle = vm.backgroundColor;
						ctx.strokeStyle = vm.borderColor;
						ctx.lineWidth = borderWidth;

						// Corner points, from bottom-left to bottom-right clockwise
						// | 1 2 |
						// | 0 3 |
						var corners = [[left, bottom], [left, top], [right, top], [right, bottom]];

						// Find first (starting) corner with fallback to 'bottom'
						var borders = ['bottom', 'left', 'top', 'right'];
						var startCorner = borders.indexOf(borderSkipped, 0);
						if (startCorner === -1) {
							startCorner = 0;
						}

						function cornerAt(index) {
							return corners[(startCorner + index) % 4];
						}

						// Draw rectangle from 'startCorner'
						var corner = cornerAt(0);
						ctx.moveTo(corner[0], corner[1]);

						for (var i = 1; i < 4; i++) {
							corner = cornerAt(i);
							ctx.lineTo(corner[0], corner[1]);
						}

						ctx.fill();
						if (borderWidth) {
							ctx.stroke();
						}
					},
					height: function height() {
						var vm = this._view;
						return vm.base - vm.y;
					},
					inRange: function inRange(mouseX, mouseY) {
						var inRange = false;

						if (this._view) {
							var bounds = getBarBounds(this);
							inRange = mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
						}

						return inRange;
					},
					inLabelRange: function inLabelRange(mouseX, mouseY) {
						var me = this;
						if (!me._view) {
							return false;
						}

						var inRange = false;
						var bounds = getBarBounds(me);

						if (isVertical(me)) {
							inRange = mouseX >= bounds.left && mouseX <= bounds.right;
						} else {
							inRange = mouseY >= bounds.top && mouseY <= bounds.bottom;
						}

						return inRange;
					},
					inXRange: function inXRange(mouseX) {
						var bounds = getBarBounds(this);
						return mouseX >= bounds.left && mouseX <= bounds.right;
					},
					inYRange: function inYRange(mouseY) {
						var bounds = getBarBounds(this);
						return mouseY >= bounds.top && mouseY <= bounds.bottom;
					},
					getCenterPoint: function getCenterPoint() {
						var vm = this._view;
						var x, y;
						if (isVertical(this)) {
							x = vm.x;
							y = (vm.y + vm.base) / 2;
						} else {
							x = (vm.x + vm.base) / 2;
							y = vm.y;
						}

						return { x: x, y: y };
					},
					getArea: function getArea() {
						var vm = this._view;
						return vm.width * Math.abs(vm.y - vm.base);
					},
					tooltipPosition: function tooltipPosition() {
						var vm = this._view;
						return {
							x: vm.x,
							y: vm.y
						};
					}
				});
			};
		}, {}], 41: [function (require, module, exports) {
			'use strict';

			// Chart.Platform implementation for targeting a web browser

			module.exports = function (Chart) {
				var helpers = Chart.helpers;

				// DOM event types -> Chart.js event types.
				// Note: only events with different types are mapped.
				// https://developer.mozilla.org/en-US/docs/Web/Events
				var eventTypeMap = {
					// Touch events
					touchstart: 'mousedown',
					touchmove: 'mousemove',
					touchend: 'mouseup',

					// Pointer events
					pointerenter: 'mouseenter',
					pointerdown: 'mousedown',
					pointermove: 'mousemove',
					pointerup: 'mouseup',
					pointerleave: 'mouseout',
					pointerout: 'mouseout'
				};

				/**
     * The "used" size is the final value of a dimension property after all calculations have
     * been performed. This method uses the computed style of `element` but returns undefined
     * if the computed style is not expressed in pixels. That can happen in some cases where
     * `element` has a size relative to its parent and this last one is not yet displayed,
     * for example because of `display: none` on a parent node.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
     * @returns {Number} Size in pixels or undefined if unknown.
     */
				function readUsedSize(element, property) {
					var value = helpers.getStyle(element, property);
					var matches = value && value.match(/(\d+)px/);
					return matches ? Number(matches[1]) : undefined;
				}

				/**
     * Initializes the canvas style and render size without modifying the canvas display size,
     * since responsiveness is handled by the controller.resize() method. The config is used
     * to determine the aspect ratio to apply in case no explicit height has been specified.
     */
				function initCanvas(canvas, config) {
					var style = canvas.style;

					// NOTE(SB) canvas.getAttribute('width') !== canvas.width: in the first case it
					// returns null or '' if no explicit value has been set to the canvas attribute.
					var renderHeight = canvas.getAttribute('height');
					var renderWidth = canvas.getAttribute('width');

					// Chart.js modifies some canvas values that we want to restore on destroy
					canvas._chartjs = {
						initial: {
							height: renderHeight,
							width: renderWidth,
							style: {
								display: style.display,
								height: style.height,
								width: style.width
							}
						}
					};

					// Force canvas to display as block to avoid extra space caused by inline
					// elements, which would interfere with the responsive resize process.
					// https://github.com/chartjs/Chart.js/issues/2538
					style.display = style.display || 'block';

					if (renderWidth === null || renderWidth === '') {
						var displayWidth = readUsedSize(canvas, 'width');
						if (displayWidth !== undefined) {
							canvas.width = displayWidth;
						}
					}

					if (renderHeight === null || renderHeight === '') {
						if (canvas.style.height === '') {
							// If no explicit render height and style height, let's apply the aspect ratio,
							// which one can be specified by the user but also by charts as default option
							// (i.e. options.aspectRatio). If not specified, use canvas aspect ratio of 2.
							canvas.height = canvas.width / (config.options.aspectRatio || 2);
						} else {
							var displayHeight = readUsedSize(canvas, 'height');
							if (displayWidth !== undefined) {
								canvas.height = displayHeight;
							}
						}
					}

					return canvas;
				}

				function createEvent(type, chart, x, y, native) {
					return {
						type: type,
						chart: chart,
						native: native || null,
						x: x !== undefined ? x : null,
						y: y !== undefined ? y : null
					};
				}

				function fromNativeEvent(event, chart) {
					var type = eventTypeMap[event.type] || event.type;
					var pos = helpers.getRelativePosition(event, chart);
					return createEvent(type, chart, pos.x, pos.y, event);
				}

				function createResizer(handler) {
					var iframe = document.createElement('iframe');
					iframe.className = 'chartjs-hidden-iframe';
					iframe.style.cssText = 'display:block;' + 'overflow:hidden;' + 'border:0;' + 'margin:0;' + 'top:0;' + 'left:0;' + 'bottom:0;' + 'right:0;' + 'height:100%;' + 'width:100%;' + 'position:absolute;' + 'pointer-events:none;' + 'z-index:-1;';

					// Prevent the iframe to gain focus on tab.
					// https://github.com/chartjs/Chart.js/issues/3090
					iframe.tabIndex = -1;

					// If the iframe is re-attached to the DOM, the resize listener is removed because the
					// content is reloaded, so make sure to install the handler after the iframe is loaded.
					// https://github.com/chartjs/Chart.js/issues/3521
					helpers.addEvent(iframe, 'load', function () {
						helpers.addEvent(iframe.contentWindow || iframe, 'resize', handler);

						// The iframe size might have changed while loading, which can also
						// happen if the size has been changed while detached from the DOM.
						handler();
					});

					return iframe;
				}

				function addResizeListener(node, listener, chart) {
					var stub = node._chartjs = {
						ticking: false
					};

					// Throttle the callback notification until the next animation frame.
					var notify = function notify() {
						if (!stub.ticking) {
							stub.ticking = true;
							helpers.requestAnimFrame.call(window, function () {
								if (stub.resizer) {
									stub.ticking = false;
									return listener(createEvent('resize', chart));
								}
							});
						}
					};

					// Let's keep track of this added iframe and thus avoid DOM query when removing it.
					stub.resizer = createResizer(notify);

					node.insertBefore(stub.resizer, node.firstChild);
				}

				function removeResizeListener(node) {
					if (!node || !node._chartjs) {
						return;
					}

					var resizer = node._chartjs.resizer;
					if (resizer) {
						resizer.parentNode.removeChild(resizer);
						node._chartjs.resizer = null;
					}

					delete node._chartjs;
				}

				return {
					acquireContext: function acquireContext(item, config) {
						if (typeof item === 'string') {
							item = document.getElementById(item);
						} else if (item.length) {
							// Support for array based queries (such as jQuery)
							item = item[0];
						}

						if (item && item.canvas) {
							// Support for any object associated to a canvas (including a context2d)
							item = item.canvas;
						}

						if (item instanceof HTMLCanvasElement) {
							// To prevent canvas fingerprinting, some add-ons undefine the getContext
							// method, for example: https://github.com/kkapsner/CanvasBlocker
							// https://github.com/chartjs/Chart.js/issues/2807
							var context = item.getContext && item.getContext('2d');
							if (context instanceof CanvasRenderingContext2D) {
								initCanvas(item, config);
								return context;
							}
						}

						return null;
					},

					releaseContext: function releaseContext(context) {
						var canvas = context.canvas;
						if (!canvas._chartjs) {
							return;
						}

						var initial = canvas._chartjs.initial;
						['height', 'width'].forEach(function (prop) {
							var value = initial[prop];
							if (value === undefined || value === null) {
								canvas.removeAttribute(prop);
							} else {
								canvas.setAttribute(prop, value);
							}
						});

						helpers.each(initial.style || {}, function (value, key) {
							canvas.style[key] = value;
						});

						// The canvas render size might have been changed (and thus the state stack discarded),
						// we can't use save() and restore() to restore the initial state. So make sure that at
						// least the canvas context is reset to the default state by setting the canvas width.
						// https://www.w3.org/TR/2011/WD-html5-20110525/the-canvas-element.html
						canvas.width = canvas.width;

						delete canvas._chartjs;
					},

					addEventListener: function addEventListener(chart, type, listener) {
						var canvas = chart.chart.canvas;
						if (type === 'resize') {
							// Note: the resize event is not supported on all browsers.
							addResizeListener(canvas.parentNode, listener, chart.chart);
							return;
						}

						var stub = listener._chartjs || (listener._chartjs = {});
						var proxies = stub.proxies || (stub.proxies = {});
						var proxy = proxies[chart.id + '_' + type] = function (event) {
							listener(fromNativeEvent(event, chart.chart));
						};

						helpers.addEvent(canvas, type, proxy);
					},

					removeEventListener: function removeEventListener(chart, type, listener) {
						var canvas = chart.chart.canvas;
						if (type === 'resize') {
							// Note: the resize event is not supported on all browsers.
							removeResizeListener(canvas.parentNode, listener);
							return;
						}

						var stub = listener._chartjs || {};
						var proxies = stub.proxies || {};
						var proxy = proxies[chart.id + '_' + type];
						if (!proxy) {
							return;
						}

						helpers.removeEvent(canvas, type, proxy);
					}
				};
			};
		}, {}], 42: [function (require, module, exports) {
			'use strict';

			// By default, select the browser (DOM) platform.
			// @TODO Make possible to select another platform at build time.

			var implementation = require(41);

			module.exports = function (Chart) {
				/**
     * @namespace Chart.platform
     * @see https://chartjs.gitbooks.io/proposals/content/Platform.html
     * @since 2.4.0
     */
				Chart.platform = {
					/**
      * Called at chart construction time, returns a context2d instance implementing
      * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
      * @param {*} item - The native item from which to acquire context (platform specific)
      * @param {Object} options - The chart options
      * @returns {CanvasRenderingContext2D} context2d instance
      */
					acquireContext: function acquireContext() {},

					/**
      * Called at chart destruction time, releases any resources associated to the context
      * previously returned by the acquireContext() method.
      * @param {CanvasRenderingContext2D} context - The context2d instance
      * @returns {Boolean} true if the method succeeded, else false
      */
					releaseContext: function releaseContext() {},

					/**
      * Registers the specified listener on the given chart.
      * @param {Chart} chart - Chart from which to listen for event
      * @param {String} type - The ({@link IEvent}) type to listen for
      * @param {Function} listener - Receives a notification (an object that implements
      * the {@link IEvent} interface) when an event of the specified type occurs.
      */
					addEventListener: function addEventListener() {},

					/**
      * Removes the specified listener previously registered with addEventListener.
      * @param {Chart} chart -Chart from which to remove the listener
      * @param {String} type - The ({@link IEvent}) type to remove
      * @param {Function} listener - The listener function to remove from the event target.
      */
					removeEventListener: function removeEventListener() {}
				};

				/**
     * @interface IPlatform
     * Allows abstracting platform dependencies away from the chart
     * @borrows Chart.platform.acquireContext as acquireContext
     * @borrows Chart.platform.releaseContext as releaseContext
     * @borrows Chart.platform.addEventListener as addEventListener
     * @borrows Chart.platform.removeEventListener as removeEventListener
     */

				/**
     * @interface IEvent
     * @prop {String} type - The event type name, possible values are:
     * 'contextmenu', 'mouseenter', 'mousedown', 'mousemove', 'mouseup', 'mouseout',
     * 'click', 'dblclick', 'keydown', 'keypress', 'keyup' and 'resize'
     * @prop {*} native - The original native event (null for emulated events, e.g. 'resize')
     * @prop {Number} x - The mouse x position, relative to the canvas (null for incompatible events)
     * @prop {Number} y - The mouse y position, relative to the canvas (null for incompatible events)
     */

				Chart.helpers.extend(Chart.platform, implementation(Chart));
			};
		}, { "41": 41 }], 43: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				// Default config for a category scale
				var defaultConfig = {
					position: 'bottom'
				};

				var DatasetScale = Chart.Scale.extend({
					/**
     * Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use those
     * else fall back to data.labels
     * @private
     */
					getLabels: function getLabels() {
						var data = this.chart.data;
						return (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
					},
					// Implement this so that
					determineDataLimits: function determineDataLimits() {
						var me = this;
						var labels = me.getLabels();
						me.minIndex = 0;
						me.maxIndex = labels.length - 1;
						var findIndex;

						if (me.options.ticks.min !== undefined) {
							// user specified min value
							findIndex = helpers.indexOf(labels, me.options.ticks.min);
							me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
						}

						if (me.options.ticks.max !== undefined) {
							// user specified max value
							findIndex = helpers.indexOf(labels, me.options.ticks.max);
							me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
						}

						me.min = labels[me.minIndex];
						me.max = labels[me.maxIndex];
					},

					buildTicks: function buildTicks() {
						var me = this;
						var labels = me.getLabels();
						// If we are viewing some subset of labels, slice the original array
						me.ticks = me.minIndex === 0 && me.maxIndex === labels.length - 1 ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
					},

					getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
						var me = this;
						var data = me.chart.data;
						var isHorizontal = me.isHorizontal();

						if (data.yLabels && !isHorizontal) {
							return me.getRightValue(data.datasets[datasetIndex].data[index]);
						}
						return me.ticks[index - me.minIndex];
					},

					// Used to get data value locations.  Value can either be an index or a numerical value
					getPixelForValue: function getPixelForValue(value, index, datasetIndex, includeOffset) {
						var me = this;
						// 1 is added because we need the length but we have the indexes
						var offsetAmt = Math.max(me.maxIndex + 1 - me.minIndex - (me.options.gridLines.offsetGridLines ? 0 : 1), 1);

						if (value !== undefined && isNaN(index)) {
							var labels = me.getLabels();
							var idx = labels.indexOf(value);
							index = idx !== -1 ? idx : index;
						}

						if (me.isHorizontal()) {
							var valueWidth = me.width / offsetAmt;
							var widthOffset = valueWidth * (index - me.minIndex);

							if (me.options.gridLines.offsetGridLines && includeOffset || me.maxIndex === me.minIndex && includeOffset) {
								widthOffset += valueWidth / 2;
							}

							return me.left + Math.round(widthOffset);
						}
						var valueHeight = me.height / offsetAmt;
						var heightOffset = valueHeight * (index - me.minIndex);

						if (me.options.gridLines.offsetGridLines && includeOffset) {
							heightOffset += valueHeight / 2;
						}

						return me.top + Math.round(heightOffset);
					},
					getPixelForTick: function getPixelForTick(index, includeOffset) {
						return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
					},
					getValueForPixel: function getValueForPixel(pixel) {
						var me = this;
						var value;
						var offsetAmt = Math.max(me.ticks.length - (me.options.gridLines.offsetGridLines ? 0 : 1), 1);
						var horz = me.isHorizontal();
						var valueDimension = (horz ? me.width : me.height) / offsetAmt;

						pixel -= horz ? me.left : me.top;

						if (me.options.gridLines.offsetGridLines) {
							pixel -= valueDimension / 2;
						}

						if (pixel <= 0) {
							value = 0;
						} else {
							value = Math.round(pixel / valueDimension);
						}

						return value;
					},
					getBasePixel: function getBasePixel() {
						return this.bottom;
					}
				});

				Chart.scaleService.registerScaleType('category', DatasetScale, defaultConfig);
			};
		}, {}], 44: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				var defaultConfig = {
					position: 'left',
					ticks: {
						callback: Chart.Ticks.formatters.linear
					}
				};

				var LinearScale = Chart.LinearScaleBase.extend({
					determineDataLimits: function determineDataLimits() {
						var me = this;
						var opts = me.options;
						var chart = me.chart;
						var data = chart.data;
						var datasets = data.datasets;
						var isHorizontal = me.isHorizontal();

						function IDMatches(meta) {
							return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
						}

						// First Calculate the range
						me.min = null;
						me.max = null;

						var hasStacks = opts.stacked;
						if (hasStacks === undefined) {
							helpers.each(datasets, function (dataset, datasetIndex) {
								if (hasStacks) {
									return;
								}

								var meta = chart.getDatasetMeta(datasetIndex);
								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) && meta.stack !== undefined) {
									hasStacks = true;
								}
							});
						}

						if (opts.stacked || hasStacks) {
							var valuesPerStack = {};

							helpers.each(datasets, function (dataset, datasetIndex) {
								var meta = chart.getDatasetMeta(datasetIndex);
								var key = [meta.type,
								// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
								opts.stacked === undefined && meta.stack === undefined ? datasetIndex : '', meta.stack].join('.');

								if (valuesPerStack[key] === undefined) {
									valuesPerStack[key] = {
										positiveValues: [],
										negativeValues: []
									};
								}

								// Store these per type
								var positiveValues = valuesPerStack[key].positiveValues;
								var negativeValues = valuesPerStack[key].negativeValues;

								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
									helpers.each(dataset.data, function (rawValue, index) {
										var value = +me.getRightValue(rawValue);
										if (isNaN(value) || meta.data[index].hidden) {
											return;
										}

										positiveValues[index] = positiveValues[index] || 0;
										negativeValues[index] = negativeValues[index] || 0;

										if (opts.relativePoints) {
											positiveValues[index] = 100;
										} else if (value < 0) {
											negativeValues[index] += value;
										} else {
											positiveValues[index] += value;
										}
									});
								}
							});

							helpers.each(valuesPerStack, function (valuesForType) {
								var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
								var minVal = helpers.min(values);
								var maxVal = helpers.max(values);
								me.min = me.min === null ? minVal : Math.min(me.min, minVal);
								me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
							});
						} else {
							helpers.each(datasets, function (dataset, datasetIndex) {
								var meta = chart.getDatasetMeta(datasetIndex);
								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
									helpers.each(dataset.data, function (rawValue, index) {
										var value = +me.getRightValue(rawValue);
										if (isNaN(value) || meta.data[index].hidden) {
											return;
										}

										if (me.min === null) {
											me.min = value;
										} else if (value < me.min) {
											me.min = value;
										}

										if (me.max === null) {
											me.max = value;
										} else if (value > me.max) {
											me.max = value;
										}
									});
								}
							});
						}

						// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
						this.handleTickRangeOptions();
					},
					getTickLimit: function getTickLimit() {
						var maxTicks;
						var me = this;
						var tickOpts = me.options.ticks;

						if (me.isHorizontal()) {
							maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
						} else {
							// The factor of 2 used to scale the font size has been experimentally determined.
							var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
							maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
						}

						return maxTicks;
					},
					// Called after the ticks are built. We need
					handleDirectionalChanges: function handleDirectionalChanges() {
						if (!this.isHorizontal()) {
							// We are in a vertical orientation. The top value is the highest. So reverse the array
							this.ticks.reverse();
						}
					},
					getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
						return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
					},
					// Utils
					getPixelForValue: function getPixelForValue(value) {
						// This must be called after fit has been run so that
						// this.left, this.top, this.right, and this.bottom have been defined
						var me = this;
						var start = me.start;

						var rightValue = +me.getRightValue(value);
						var pixel;
						var range = me.end - start;

						if (me.isHorizontal()) {
							pixel = me.left + me.width / range * (rightValue - start);
							return Math.round(pixel);
						}

						pixel = me.bottom - me.height / range * (rightValue - start);
						return Math.round(pixel);
					},
					getValueForPixel: function getValueForPixel(pixel) {
						var me = this;
						var isHorizontal = me.isHorizontal();
						var innerDimension = isHorizontal ? me.width : me.height;
						var offset = (isHorizontal ? pixel - me.left : me.bottom - pixel) / innerDimension;
						return me.start + (me.end - me.start) * offset;
					},
					getPixelForTick: function getPixelForTick(index) {
						return this.getPixelForValue(this.ticksAsNumbers[index]);
					}
				});
				Chart.scaleService.registerScaleType('linear', LinearScale, defaultConfig);
			};
		}, {}], 45: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers,
				    noop = helpers.noop;

				Chart.LinearScaleBase = Chart.Scale.extend({
					handleTickRangeOptions: function handleTickRangeOptions() {
						var me = this;
						var opts = me.options;
						var tickOpts = opts.ticks;

						// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
						// do nothing since that would make the chart weird. If the user really wants a weird chart
						// axis, they can manually override it
						if (tickOpts.beginAtZero) {
							var minSign = helpers.sign(me.min);
							var maxSign = helpers.sign(me.max);

							if (minSign < 0 && maxSign < 0) {
								// move the top up to 0
								me.max = 0;
							} else if (minSign > 0 && maxSign > 0) {
								// move the bottom down to 0
								me.min = 0;
							}
						}

						if (tickOpts.min !== undefined) {
							me.min = tickOpts.min;
						} else if (tickOpts.suggestedMin !== undefined) {
							me.min = Math.min(me.min, tickOpts.suggestedMin);
						}

						if (tickOpts.max !== undefined) {
							me.max = tickOpts.max;
						} else if (tickOpts.suggestedMax !== undefined) {
							me.max = Math.max(me.max, tickOpts.suggestedMax);
						}

						if (me.min === me.max) {
							me.max++;

							if (!tickOpts.beginAtZero) {
								me.min--;
							}
						}
					},
					getTickLimit: noop,
					handleDirectionalChanges: noop,

					buildTicks: function buildTicks() {
						var me = this;
						var opts = me.options;
						var tickOpts = opts.ticks;

						// Figure out what the max number of ticks we can support it is based on the size of
						// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
						// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
						// the graph. Make sure we always have at least 2 ticks
						var maxTicks = me.getTickLimit();
						maxTicks = Math.max(2, maxTicks);

						var numericGeneratorOptions = {
							maxTicks: maxTicks,
							min: tickOpts.min,
							max: tickOpts.max,
							stepSize: helpers.getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
						};
						var ticks = me.ticks = Chart.Ticks.generators.linear(numericGeneratorOptions, me);

						me.handleDirectionalChanges();

						// At this point, we need to update our max and min given the tick values since we have expanded the
						// range of the scale
						me.max = helpers.max(ticks);
						me.min = helpers.min(ticks);

						if (tickOpts.reverse) {
							ticks.reverse();

							me.start = me.max;
							me.end = me.min;
						} else {
							me.start = me.min;
							me.end = me.max;
						}
					},
					convertTicksToLabels: function convertTicksToLabels() {
						var me = this;
						me.ticksAsNumbers = me.ticks.slice();
						me.zeroLineIndex = me.ticks.indexOf(0);

						Chart.Scale.prototype.convertTicksToLabels.call(me);
					}
				});
			};
		}, {}], 46: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;

				var defaultConfig = {
					position: 'left',

					// label settings
					ticks: {
						callback: Chart.Ticks.formatters.logarithmic
					}
				};

				var LogarithmicScale = Chart.Scale.extend({
					determineDataLimits: function determineDataLimits() {
						var me = this;
						var opts = me.options;
						var tickOpts = opts.ticks;
						var chart = me.chart;
						var data = chart.data;
						var datasets = data.datasets;
						var getValueOrDefault = helpers.getValueOrDefault;
						var isHorizontal = me.isHorizontal();
						function IDMatches(meta) {
							return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
						}

						// Calculate Range
						me.min = null;
						me.max = null;
						me.minNotZero = null;

						var hasStacks = opts.stacked;
						if (hasStacks === undefined) {
							helpers.each(datasets, function (dataset, datasetIndex) {
								if (hasStacks) {
									return;
								}

								var meta = chart.getDatasetMeta(datasetIndex);
								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) && meta.stack !== undefined) {
									hasStacks = true;
								}
							});
						}

						if (opts.stacked || hasStacks) {
							var valuesPerStack = {};

							helpers.each(datasets, function (dataset, datasetIndex) {
								var meta = chart.getDatasetMeta(datasetIndex);
								var key = [meta.type,
								// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
								opts.stacked === undefined && meta.stack === undefined ? datasetIndex : '', meta.stack].join('.');

								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
									if (valuesPerStack[key] === undefined) {
										valuesPerStack[key] = [];
									}

									helpers.each(dataset.data, function (rawValue, index) {
										var values = valuesPerStack[key];
										var value = +me.getRightValue(rawValue);
										if (isNaN(value) || meta.data[index].hidden) {
											return;
										}

										values[index] = values[index] || 0;

										if (opts.relativePoints) {
											values[index] = 100;
										} else {
											// Don't need to split positive and negative since the log scale can't handle a 0 crossing
											values[index] += value;
										}
									});
								}
							});

							helpers.each(valuesPerStack, function (valuesForType) {
								var minVal = helpers.min(valuesForType);
								var maxVal = helpers.max(valuesForType);
								me.min = me.min === null ? minVal : Math.min(me.min, minVal);
								me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
							});
						} else {
							helpers.each(datasets, function (dataset, datasetIndex) {
								var meta = chart.getDatasetMeta(datasetIndex);
								if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
									helpers.each(dataset.data, function (rawValue, index) {
										var value = +me.getRightValue(rawValue);
										if (isNaN(value) || meta.data[index].hidden) {
											return;
										}

										if (me.min === null) {
											me.min = value;
										} else if (value < me.min) {
											me.min = value;
										}

										if (me.max === null) {
											me.max = value;
										} else if (value > me.max) {
											me.max = value;
										}

										if (value !== 0 && (me.minNotZero === null || value < me.minNotZero)) {
											me.minNotZero = value;
										}
									});
								}
							});
						}

						me.min = getValueOrDefault(tickOpts.min, me.min);
						me.max = getValueOrDefault(tickOpts.max, me.max);

						if (me.min === me.max) {
							if (me.min !== 0 && me.min !== null) {
								me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
								me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
							} else {
								me.min = 1;
								me.max = 10;
							}
						}
					},
					buildTicks: function buildTicks() {
						var me = this;
						var opts = me.options;
						var tickOpts = opts.ticks;

						var generationOptions = {
							min: tickOpts.min,
							max: tickOpts.max
						};
						var ticks = me.ticks = Chart.Ticks.generators.logarithmic(generationOptions, me);

						if (!me.isHorizontal()) {
							// We are in a vertical orientation. The top value is the highest. So reverse the array
							ticks.reverse();
						}

						// At this point, we need to update our max and min given the tick values since we have expanded the
						// range of the scale
						me.max = helpers.max(ticks);
						me.min = helpers.min(ticks);

						if (tickOpts.reverse) {
							ticks.reverse();

							me.start = me.max;
							me.end = me.min;
						} else {
							me.start = me.min;
							me.end = me.max;
						}
					},
					convertTicksToLabels: function convertTicksToLabels() {
						this.tickValues = this.ticks.slice();

						Chart.Scale.prototype.convertTicksToLabels.call(this);
					},
					// Get the correct tooltip label
					getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
						return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
					},
					getPixelForTick: function getPixelForTick(index) {
						return this.getPixelForValue(this.tickValues[index]);
					},
					getPixelForValue: function getPixelForValue(value) {
						var me = this;
						var innerDimension;
						var pixel;

						var start = me.start;
						var newVal = +me.getRightValue(value);
						var range;
						var opts = me.options;
						var tickOpts = opts.ticks;

						if (me.isHorizontal()) {
							range = helpers.log10(me.end) - helpers.log10(start); // todo: if start === 0
							if (newVal === 0) {
								pixel = me.left;
							} else {
								innerDimension = me.width;
								pixel = me.left + innerDimension / range * (helpers.log10(newVal) - helpers.log10(start));
							}
						} else {
							// Bottom - top since pixels increase downward on a screen
							innerDimension = me.height;
							if (start === 0 && !tickOpts.reverse) {
								range = helpers.log10(me.end) - helpers.log10(me.minNotZero);
								if (newVal === start) {
									pixel = me.bottom;
								} else if (newVal === me.minNotZero) {
									pixel = me.bottom - innerDimension * 0.02;
								} else {
									pixel = me.bottom - innerDimension * 0.02 - innerDimension * 0.98 / range * (helpers.log10(newVal) - helpers.log10(me.minNotZero));
								}
							} else if (me.end === 0 && tickOpts.reverse) {
								range = helpers.log10(me.start) - helpers.log10(me.minNotZero);
								if (newVal === me.end) {
									pixel = me.top;
								} else if (newVal === me.minNotZero) {
									pixel = me.top + innerDimension * 0.02;
								} else {
									pixel = me.top + innerDimension * 0.02 + innerDimension * 0.98 / range * (helpers.log10(newVal) - helpers.log10(me.minNotZero));
								}
							} else {
								range = helpers.log10(me.end) - helpers.log10(start);
								innerDimension = me.height;
								pixel = me.bottom - innerDimension / range * (helpers.log10(newVal) - helpers.log10(start));
							}
						}
						return pixel;
					},
					getValueForPixel: function getValueForPixel(pixel) {
						var me = this;
						var range = helpers.log10(me.end) - helpers.log10(me.start);
						var value, innerDimension;

						if (me.isHorizontal()) {
							innerDimension = me.width;
							value = me.start * Math.pow(10, (pixel - me.left) * range / innerDimension);
						} else {
							// todo: if start === 0
							innerDimension = me.height;
							value = Math.pow(10, (me.bottom - pixel) * range / innerDimension) / me.start;
						}
						return value;
					}
				});
				Chart.scaleService.registerScaleType('logarithmic', LogarithmicScale, defaultConfig);
			};
		}, {}], 47: [function (require, module, exports) {
			'use strict';

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				var globalDefaults = Chart.defaults.global;

				var defaultConfig = {
					display: true,

					// Boolean - Whether to animate scaling the chart from the centre
					animate: true,
					lineArc: false,
					position: 'chartArea',

					angleLines: {
						display: true,
						color: 'rgba(0, 0, 0, 0.1)',
						lineWidth: 1
					},

					// label settings
					ticks: {
						// Boolean - Show a backdrop to the scale label
						showLabelBackdrop: true,

						// String - The colour of the label backdrop
						backdropColor: 'rgba(255,255,255,0.75)',

						// Number - The backdrop padding above & below the label in pixels
						backdropPaddingY: 2,

						// Number - The backdrop padding to the side of the label in pixels
						backdropPaddingX: 2,

						callback: Chart.Ticks.formatters.linear
					},

					pointLabels: {
						// Number - Point label font size in pixels
						fontSize: 10,

						// Function - Used to convert point labels
						callback: function callback(label) {
							return label;
						}
					}
				};

				function getValueCount(scale) {
					return !scale.options.lineArc ? scale.chart.data.labels.length : 0;
				}

				function getPointLabelFontOptions(scale) {
					var pointLabelOptions = scale.options.pointLabels;
					var fontSize = helpers.getValueOrDefault(pointLabelOptions.fontSize, globalDefaults.defaultFontSize);
					var fontStyle = helpers.getValueOrDefault(pointLabelOptions.fontStyle, globalDefaults.defaultFontStyle);
					var fontFamily = helpers.getValueOrDefault(pointLabelOptions.fontFamily, globalDefaults.defaultFontFamily);
					var font = helpers.fontString(fontSize, fontStyle, fontFamily);

					return {
						size: fontSize,
						style: fontStyle,
						family: fontFamily,
						font: font
					};
				}

				function measureLabelSize(ctx, fontSize, label) {
					if (helpers.isArray(label)) {
						return {
							w: helpers.longestText(ctx, ctx.font, label),
							h: label.length * fontSize + (label.length - 1) * 1.5 * fontSize
						};
					}

					return {
						w: ctx.measureText(label).width,
						h: fontSize
					};
				}

				function determineLimits(angle, pos, size, min, max) {
					if (angle === min || angle === max) {
						return {
							start: pos - size / 2,
							end: pos + size / 2
						};
					} else if (angle < min || angle > max) {
						return {
							start: pos - size - 5,
							end: pos
						};
					}

					return {
						start: pos,
						end: pos + size + 5
					};
				}

				/**
     * Helper function to fit a radial linear scale with point labels
     */
				function fitWithPointLabels(scale) {
					/*
      * Right, this is really confusing and there is a lot of maths going on here
      * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
      *
      * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
      *
      * Solution:
      *
      * We assume the radius of the polygon is half the size of the canvas at first
      * at each index we check if the text overlaps.
      *
      * Where it does, we store that angle and that index.
      *
      * After finding the largest index and angle we calculate how much we need to remove
      * from the shape radius to move the point inwards by that x.
      *
      * We average the left and right distances to get the maximum shape radius that can fit in the box
      * along with labels.
      *
      * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
      * on each side, removing that from the size, halving it and adding the left x protrusion width.
      *
      * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
      * and position it in the most space efficient manner
      *
      * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
      */

					var plFont = getPointLabelFontOptions(scale);

					// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
					// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
					var largestPossibleRadius = Math.min(scale.height / 2, scale.width / 2);
					var furthestLimits = {
						l: scale.width,
						r: 0,
						t: scale.height,
						b: 0
					};
					var furthestAngles = {};
					var i;
					var textSize;
					var pointPosition;

					scale.ctx.font = plFont.font;
					scale._pointLabelSizes = [];

					var valueCount = getValueCount(scale);
					for (i = 0; i < valueCount; i++) {
						pointPosition = scale.getPointPosition(i, largestPossibleRadius);
						textSize = measureLabelSize(scale.ctx, plFont.size, scale.pointLabels[i] || '');
						scale._pointLabelSizes[i] = textSize;

						// Add quarter circle to make degree 0 mean top of circle
						var angleRadians = scale.getIndexAngle(i);
						var angle = helpers.toDegrees(angleRadians) % 360;
						var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
						var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);

						if (hLimits.start < furthestLimits.l) {
							furthestLimits.l = hLimits.start;
							furthestAngles.l = angleRadians;
						}

						if (hLimits.end > furthestLimits.r) {
							furthestLimits.r = hLimits.end;
							furthestAngles.r = angleRadians;
						}

						if (vLimits.start < furthestLimits.t) {
							furthestLimits.t = vLimits.start;
							furthestAngles.t = angleRadians;
						}

						if (vLimits.end > furthestLimits.b) {
							furthestLimits.b = vLimits.end;
							furthestAngles.b = angleRadians;
						}
					}

					scale.setReductions(largestPossibleRadius, furthestLimits, furthestAngles);
				}

				/**
     * Helper function to fit a radial linear scale with no point labels
     */
				function _fit(scale) {
					var largestPossibleRadius = Math.min(scale.height / 2, scale.width / 2);
					scale.drawingArea = Math.round(largestPossibleRadius);
					scale.setCenterPoint(0, 0, 0, 0);
				}

				function getTextAlignForAngle(angle) {
					if (angle === 0 || angle === 180) {
						return 'center';
					} else if (angle < 180) {
						return 'left';
					}

					return 'right';
				}

				function fillText(ctx, text, position, fontSize) {
					if (helpers.isArray(text)) {
						var y = position.y;
						var spacing = 1.5 * fontSize;

						for (var i = 0; i < text.length; ++i) {
							ctx.fillText(text[i], position.x, y);
							y += spacing;
						}
					} else {
						ctx.fillText(text, position.x, position.y);
					}
				}

				function adjustPointPositionForLabelHeight(angle, textSize, position) {
					if (angle === 90 || angle === 270) {
						position.y -= textSize.h / 2;
					} else if (angle > 270 || angle < 90) {
						position.y -= textSize.h;
					}
				}

				function drawPointLabels(scale) {
					var ctx = scale.ctx;
					var getValueOrDefault = helpers.getValueOrDefault;
					var opts = scale.options;
					var angleLineOpts = opts.angleLines;
					var pointLabelOpts = opts.pointLabels;

					ctx.lineWidth = angleLineOpts.lineWidth;
					ctx.strokeStyle = angleLineOpts.color;

					var outerDistance = scale.getDistanceFromCenterForValue(opts.reverse ? scale.min : scale.max);

					// Point Label Font
					var plFont = getPointLabelFontOptions(scale);

					ctx.textBaseline = 'top';

					for (var i = getValueCount(scale) - 1; i >= 0; i--) {
						if (angleLineOpts.display) {
							var outerPosition = scale.getPointPosition(i, outerDistance);
							ctx.beginPath();
							ctx.moveTo(scale.xCenter, scale.yCenter);
							ctx.lineTo(outerPosition.x, outerPosition.y);
							ctx.stroke();
							ctx.closePath();
						}
						// Extra 3px out for some label spacing
						var pointLabelPosition = scale.getPointPosition(i, outerDistance + 5);

						// Keep this in loop since we may support array properties here
						var pointLabelFontColor = getValueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
						ctx.font = plFont.font;
						ctx.fillStyle = pointLabelFontColor;

						var angleRadians = scale.getIndexAngle(i);
						var angle = helpers.toDegrees(angleRadians);
						ctx.textAlign = getTextAlignForAngle(angle);
						adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition);
						fillText(ctx, scale.pointLabels[i] || '', pointLabelPosition, plFont.size);
					}
				}

				function drawRadiusLine(scale, gridLineOpts, radius, index) {
					var ctx = scale.ctx;
					ctx.strokeStyle = helpers.getValueAtIndexOrDefault(gridLineOpts.color, index - 1);
					ctx.lineWidth = helpers.getValueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);

					if (scale.options.lineArc) {
						// Draw circular arcs between the points
						ctx.beginPath();
						ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
						ctx.closePath();
						ctx.stroke();
					} else {
						// Draw straight lines connecting each index
						var valueCount = getValueCount(scale);

						if (valueCount === 0) {
							return;
						}

						ctx.beginPath();
						var pointPosition = scale.getPointPosition(0, radius);
						ctx.moveTo(pointPosition.x, pointPosition.y);

						for (var i = 1; i < valueCount; i++) {
							pointPosition = scale.getPointPosition(i, radius);
							ctx.lineTo(pointPosition.x, pointPosition.y);
						}

						ctx.closePath();
						ctx.stroke();
					}
				}

				function numberOrZero(param) {
					return helpers.isNumber(param) ? param : 0;
				}

				var LinearRadialScale = Chart.LinearScaleBase.extend({
					setDimensions: function setDimensions() {
						var me = this;
						var opts = me.options;
						var tickOpts = opts.ticks;
						// Set the unconstrained dimension before label rotation
						me.width = me.maxWidth;
						me.height = me.maxHeight;
						me.xCenter = Math.round(me.width / 2);
						me.yCenter = Math.round(me.height / 2);

						var minSize = helpers.min([me.height, me.width]);
						var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
						me.drawingArea = opts.display ? minSize / 2 - (tickFontSize / 2 + tickOpts.backdropPaddingY) : minSize / 2;
					},
					determineDataLimits: function determineDataLimits() {
						var me = this;
						var chart = me.chart;
						var min = Number.POSITIVE_INFINITY;
						var max = Number.NEGATIVE_INFINITY;

						helpers.each(chart.data.datasets, function (dataset, datasetIndex) {
							if (chart.isDatasetVisible(datasetIndex)) {
								var meta = chart.getDatasetMeta(datasetIndex);

								helpers.each(dataset.data, function (rawValue, index) {
									var value = +me.getRightValue(rawValue);
									if (isNaN(value) || meta.data[index].hidden) {
										return;
									}

									min = Math.min(value, min);
									max = Math.max(value, max);
								});
							}
						});

						me.min = min === Number.POSITIVE_INFINITY ? 0 : min;
						me.max = max === Number.NEGATIVE_INFINITY ? 0 : max;

						// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
						me.handleTickRangeOptions();
					},
					getTickLimit: function getTickLimit() {
						var tickOpts = this.options.ticks;
						var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
						return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
					},
					convertTicksToLabels: function convertTicksToLabels() {
						var me = this;
						Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);

						// Point labels
						me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
					},
					getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
						return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
					},
					fit: function fit() {
						if (this.options.lineArc) {
							_fit(this);
						} else {
							fitWithPointLabels(this);
						}
					},
					/**
      * Set radius reductions and determine new radius and center point
      * @private
      */
					setReductions: function setReductions(largestPossibleRadius, furthestLimits, furthestAngles) {
						var me = this;
						var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
						var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
						var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
						var radiusReductionBottom = -Math.max(furthestLimits.b - me.height, 0) / Math.cos(furthestAngles.b);

						radiusReductionLeft = numberOrZero(radiusReductionLeft);
						radiusReductionRight = numberOrZero(radiusReductionRight);
						radiusReductionTop = numberOrZero(radiusReductionTop);
						radiusReductionBottom = numberOrZero(radiusReductionBottom);

						me.drawingArea = Math.min(Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2), Math.round(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
						me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
					},
					setCenterPoint: function setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
						var me = this;
						var maxRight = me.width - rightMovement - me.drawingArea,
						    maxLeft = leftMovement + me.drawingArea,
						    maxTop = topMovement + me.drawingArea,
						    maxBottom = me.height - bottomMovement - me.drawingArea;

						me.xCenter = Math.round((maxLeft + maxRight) / 2 + me.left);
						me.yCenter = Math.round((maxTop + maxBottom) / 2 + me.top);
					},

					getIndexAngle: function getIndexAngle(index) {
						var angleMultiplier = Math.PI * 2 / getValueCount(this);
						var startAngle = this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0;

						var startAngleRadians = startAngle * Math.PI * 2 / 360;

						// Start from the top instead of right, so remove a quarter of the circle
						return index * angleMultiplier + startAngleRadians;
					},
					getDistanceFromCenterForValue: function getDistanceFromCenterForValue(value) {
						var me = this;

						if (value === null) {
							return 0; // null always in center
						}

						// Take into account half font size + the yPadding of the top value
						var scalingFactor = me.drawingArea / (me.max - me.min);
						if (me.options.reverse) {
							return (me.max - value) * scalingFactor;
						}
						return (value - me.min) * scalingFactor;
					},
					getPointPosition: function getPointPosition(index, distanceFromCenter) {
						var me = this;
						var thisAngle = me.getIndexAngle(index) - Math.PI / 2;
						return {
							x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
							y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
						};
					},
					getPointPositionForValue: function getPointPositionForValue(index, value) {
						return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
					},

					getBasePosition: function getBasePosition() {
						var me = this;
						var min = me.min;
						var max = me.max;

						return me.getPointPositionForValue(0, me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0);
					},

					draw: function draw() {
						var me = this;
						var opts = me.options;
						var gridLineOpts = opts.gridLines;
						var tickOpts = opts.ticks;
						var getValueOrDefault = helpers.getValueOrDefault;

						if (opts.display) {
							var ctx = me.ctx;

							// Tick Font
							var tickFontSize = getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
							var tickFontStyle = getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
							var tickFontFamily = getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
							var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);

							helpers.each(me.ticks, function (label, index) {
								// Don't draw a centre value (if it is minimum)
								if (index > 0 || opts.reverse) {
									var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
									var yHeight = me.yCenter - yCenterOffset;

									// Draw circular lines around the scale
									if (gridLineOpts.display && index !== 0) {
										drawRadiusLine(me, gridLineOpts, yCenterOffset, index);
									}

									if (tickOpts.display) {
										var tickFontColor = getValueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
										ctx.font = tickLabelFont;

										if (tickOpts.showLabelBackdrop) {
											var labelWidth = ctx.measureText(label).width;
											ctx.fillStyle = tickOpts.backdropColor;
											ctx.fillRect(me.xCenter - labelWidth / 2 - tickOpts.backdropPaddingX, yHeight - tickFontSize / 2 - tickOpts.backdropPaddingY, labelWidth + tickOpts.backdropPaddingX * 2, tickFontSize + tickOpts.backdropPaddingY * 2);
										}

										ctx.textAlign = 'center';
										ctx.textBaseline = 'middle';
										ctx.fillStyle = tickFontColor;
										ctx.fillText(label, me.xCenter, yHeight);
									}
								}
							});

							if (!opts.lineArc) {
								drawPointLabels(me);
							}
						}
					}
				});
				Chart.scaleService.registerScaleType('radialLinear', LinearRadialScale, defaultConfig);
			};
		}, {}], 48: [function (require, module, exports) {
			/* global window: false */
			'use strict';

			var moment = require(1);
			moment = typeof moment === 'function' ? moment : window.moment;

			module.exports = function (Chart) {

				var helpers = Chart.helpers;
				var time = {
					units: [{
						name: 'millisecond',
						steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
					}, {
						name: 'second',
						steps: [1, 2, 5, 10, 30]
					}, {
						name: 'minute',
						steps: [1, 2, 5, 10, 30]
					}, {
						name: 'hour',
						steps: [1, 2, 3, 6, 12]
					}, {
						name: 'day',
						steps: [1, 2, 5]
					}, {
						name: 'week',
						maxStep: 4
					}, {
						name: 'month',
						maxStep: 3
					}, {
						name: 'quarter',
						maxStep: 4
					}, {
						name: 'year',
						maxStep: false
					}]
				};

				var defaultConfig = {
					position: 'bottom',

					time: {
						parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
						format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
						unit: false, // false == automatic or override with week, month, year, etc.
						round: false, // none, or override with week, month, year, etc.
						displayFormat: false, // DEPRECATED
						isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
						minUnit: 'millisecond',

						// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
						displayFormats: {
							millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
							second: 'h:mm:ss a', // 11:20:01 AM
							minute: 'h:mm:ss a', // 11:20:01 AM
							hour: 'MMM D, hA', // Sept 4, 5PM
							day: 'll', // Sep 4 2015
							week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
							month: 'MMM YYYY', // Sept 2015
							quarter: '[Q]Q - YYYY', // Q3
							year: 'YYYY' // 2015
						}
					},
					ticks: {
						autoSkip: false
					}
				};

				var TimeScale = Chart.Scale.extend({
					initialize: function initialize() {
						if (!moment) {
							throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
						}

						Chart.Scale.prototype.initialize.call(this);
					},
					getLabelMoment: function getLabelMoment(datasetIndex, index) {
						if (datasetIndex === null || index === null) {
							return null;
						}

						if (typeof this.labelMoments[datasetIndex] !== 'undefined') {
							return this.labelMoments[datasetIndex][index];
						}

						return null;
					},
					getLabelDiff: function getLabelDiff(datasetIndex, index) {
						var me = this;
						if (datasetIndex === null || index === null) {
							return null;
						}

						if (me.labelDiffs === undefined) {
							me.buildLabelDiffs();
						}

						if (typeof me.labelDiffs[datasetIndex] !== 'undefined') {
							return me.labelDiffs[datasetIndex][index];
						}

						return null;
					},
					getMomentStartOf: function getMomentStartOf(tick) {
						var me = this;
						if (me.options.time.unit === 'week' && me.options.time.isoWeekday !== false) {
							return tick.clone().startOf('isoWeek').isoWeekday(me.options.time.isoWeekday);
						}
						return tick.clone().startOf(me.tickUnit);
					},
					determineDataLimits: function determineDataLimits() {
						var me = this;
						me.labelMoments = [];

						// Only parse these once. If the dataset does not have data as x,y pairs, we will use
						// these
						var scaleLabelMoments = [];
						if (me.chart.data.labels && me.chart.data.labels.length > 0) {
							helpers.each(me.chart.data.labels, function (label) {
								var labelMoment = me.parseTime(label);

								if (labelMoment.isValid()) {
									if (me.options.time.round) {
										labelMoment.startOf(me.options.time.round);
									}
									scaleLabelMoments.push(labelMoment);
								}
							}, me);

							me.firstTick = moment.min.call(me, scaleLabelMoments);
							me.lastTick = moment.max.call(me, scaleLabelMoments);
						} else {
							me.firstTick = null;
							me.lastTick = null;
						}

						helpers.each(me.chart.data.datasets, function (dataset, datasetIndex) {
							var momentsForDataset = [];
							var datasetVisible = me.chart.isDatasetVisible(datasetIndex);

							if (_typeof(dataset.data[0]) === 'object' && dataset.data[0] !== null) {
								helpers.each(dataset.data, function (value) {
									var labelMoment = me.parseTime(me.getRightValue(value));

									if (labelMoment.isValid()) {
										if (me.options.time.round) {
											labelMoment.startOf(me.options.time.round);
										}
										momentsForDataset.push(labelMoment);

										if (datasetVisible) {
											// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
											me.firstTick = me.firstTick !== null ? moment.min(me.firstTick, labelMoment) : labelMoment;
											me.lastTick = me.lastTick !== null ? moment.max(me.lastTick, labelMoment) : labelMoment;
										}
									}
								}, me);
							} else {
								// We have no labels. Use the ones from the scale
								momentsForDataset = scaleLabelMoments;
							}

							me.labelMoments.push(momentsForDataset);
						}, me);

						// Set these after we've done all the data
						if (me.options.time.min) {
							me.firstTick = me.parseTime(me.options.time.min);
						}

						if (me.options.time.max) {
							me.lastTick = me.parseTime(me.options.time.max);
						}

						// We will modify these, so clone for later
						me.firstTick = (me.firstTick || moment()).clone();
						me.lastTick = (me.lastTick || moment()).clone();
					},
					buildLabelDiffs: function buildLabelDiffs() {
						var me = this;
						me.labelDiffs = [];
						var scaleLabelDiffs = [];
						// Parse common labels once
						if (me.chart.data.labels && me.chart.data.labels.length > 0) {
							helpers.each(me.chart.data.labels, function (label) {
								var labelMoment = me.parseTime(label);

								if (labelMoment.isValid()) {
									if (me.options.time.round) {
										labelMoment.startOf(me.options.time.round);
									}
									scaleLabelDiffs.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
								}
							}, me);
						}

						helpers.each(me.chart.data.datasets, function (dataset) {
							var diffsForDataset = [];

							if (_typeof(dataset.data[0]) === 'object' && dataset.data[0] !== null) {
								helpers.each(dataset.data, function (value) {
									var labelMoment = me.parseTime(me.getRightValue(value));

									if (labelMoment.isValid()) {
										if (me.options.time.round) {
											labelMoment.startOf(me.options.time.round);
										}
										diffsForDataset.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
									}
								}, me);
							} else {
								// We have no labels. Use common ones
								diffsForDataset = scaleLabelDiffs;
							}

							me.labelDiffs.push(diffsForDataset);
						}, me);
					},
					buildTicks: function buildTicks() {
						var me = this;

						me.ctx.save();
						var tickFontSize = helpers.getValueOrDefault(me.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
						var tickFontStyle = helpers.getValueOrDefault(me.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
						var tickFontFamily = helpers.getValueOrDefault(me.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
						var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
						me.ctx.font = tickLabelFont;

						me.ticks = [];
						me.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
						me.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)

						// Set unit override if applicable
						if (me.options.time.unit) {
							me.tickUnit = me.options.time.unit || 'day';
							me.displayFormat = me.options.time.displayFormats[me.tickUnit];
							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
							me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, 1);
						} else {
							// Determine the smallest needed unit of the time
							var innerWidth = me.isHorizontal() ? me.width : me.height;

							// Crude approximation of what the label length might be
							var tempFirstLabel = me.tickFormatFunction(me.firstTick, 0, []);
							var tickLabelWidth = me.ctx.measureText(tempFirstLabel).width;
							var cosRotation = Math.cos(helpers.toRadians(me.options.ticks.maxRotation));
							var sinRotation = Math.sin(helpers.toRadians(me.options.ticks.maxRotation));
							tickLabelWidth = tickLabelWidth * cosRotation + tickFontSize * sinRotation;
							var labelCapacity = innerWidth / tickLabelWidth;

							// Start as small as possible
							me.tickUnit = me.options.time.minUnit;
							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
							me.displayFormat = me.options.time.displayFormats[me.tickUnit];

							var unitDefinitionIndex = 0;
							var unitDefinition = time.units[unitDefinitionIndex];

							// While we aren't ideal and we don't have units left
							while (unitDefinitionIndex < time.units.length) {
								// Can we scale this unit. If `false` we can scale infinitely
								me.unitScale = 1;

								if (helpers.isArray(unitDefinition.steps) && Math.ceil(me.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
									// Use one of the predefined steps
									for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
										if (unitDefinition.steps[idx] >= Math.ceil(me.scaleSizeInUnits / labelCapacity)) {
											me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, unitDefinition.steps[idx]);
											break;
										}
									}

									break;
								} else if (unitDefinition.maxStep === false || Math.ceil(me.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep) {
									// We have a max step. Scale this unit
									me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, Math.ceil(me.scaleSizeInUnits / labelCapacity));
									break;
								} else {
									// Move to the next unit up
									++unitDefinitionIndex;
									unitDefinition = time.units[unitDefinitionIndex];

									me.tickUnit = unitDefinition.name;
									var leadingUnitBuffer = me.firstTick.diff(me.getMomentStartOf(me.firstTick), me.tickUnit, true);
									var trailingUnitBuffer = me.getMomentStartOf(me.lastTick.clone().add(1, me.tickUnit)).diff(me.lastTick, me.tickUnit, true);
									me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
									me.displayFormat = me.options.time.displayFormats[unitDefinition.name];
								}
							}
						}

						var roundedStart;

						// Only round the first tick if we have no hard minimum
						if (!me.options.time.min) {
							me.firstTick = me.getMomentStartOf(me.firstTick);
							roundedStart = me.firstTick;
						} else {
							roundedStart = me.getMomentStartOf(me.firstTick);
						}

						// Only round the last tick if we have no hard maximum
						if (!me.options.time.max) {
							var roundedEnd = me.getMomentStartOf(me.lastTick);
							var delta = roundedEnd.diff(me.lastTick, me.tickUnit, true);
							if (delta < 0) {
								// Do not use end of because we need me to be in the next time unit
								me.lastTick = me.getMomentStartOf(me.lastTick.add(1, me.tickUnit));
							} else if (delta >= 0) {
								me.lastTick = roundedEnd;
							}

							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
						}

						// Tick displayFormat override
						if (me.options.time.displayFormat) {
							me.displayFormat = me.options.time.displayFormat;
						}

						// first tick. will have been rounded correctly if options.time.min is not specified
						me.ticks.push(me.firstTick.clone());

						// For every unit in between the first and last moment, create a moment and add it to the ticks tick
						for (var i = me.unitScale; i <= me.scaleSizeInUnits; i += me.unitScale) {
							var newTick = roundedStart.clone().add(i, me.tickUnit);

							// Are we greater than the max time
							if (me.options.time.max && newTick.diff(me.lastTick, me.tickUnit, true) >= 0) {
								break;
							}

							me.ticks.push(newTick);
						}

						// Always show the right tick
						var diff = me.ticks[me.ticks.length - 1].diff(me.lastTick, me.tickUnit);
						if (diff !== 0 || me.scaleSizeInUnits === 0) {
							// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
							// but the last tick was not rounded.
							if (me.options.time.max) {
								me.ticks.push(me.lastTick.clone());
								me.scaleSizeInUnits = me.lastTick.diff(me.ticks[0], me.tickUnit, true);
							} else {
								me.ticks.push(me.lastTick.clone());
								me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
							}
						}

						me.ctx.restore();

						// Invalidate label diffs cache
						me.labelDiffs = undefined;
					},
					// Get tooltip label
					getLabelForIndex: function getLabelForIndex(index, datasetIndex) {
						var me = this;
						var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';
						var value = me.chart.data.datasets[datasetIndex].data[index];

						if (value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
							label = me.getRightValue(value);
						}

						// Format nicely
						if (me.options.time.tooltipFormat) {
							label = me.parseTime(label).format(me.options.time.tooltipFormat);
						}

						return label;
					},
					// Function to format an individual tick mark
					tickFormatFunction: function tickFormatFunction(tick, index, ticks) {
						var formattedTick = tick.format(this.displayFormat);
						var tickOpts = this.options.ticks;
						var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);

						if (callback) {
							return callback(formattedTick, index, ticks);
						}
						return formattedTick;
					},
					convertTicksToLabels: function convertTicksToLabels() {
						var me = this;
						me.tickMoments = me.ticks;
						me.ticks = me.ticks.map(me.tickFormatFunction, me);
					},
					getPixelForValue: function getPixelForValue(value, index, datasetIndex) {
						var me = this;
						var offset = null;
						if (index !== undefined && datasetIndex !== undefined) {
							offset = me.getLabelDiff(datasetIndex, index);
						}

						if (offset === null) {
							if (!value || !value.isValid) {
								// not already a moment object
								value = me.parseTime(me.getRightValue(value));
							}
							if (value && value.isValid && value.isValid()) {
								offset = value.diff(me.firstTick, me.tickUnit, true);
							}
						}

						if (offset !== null) {
							var decimal = offset !== 0 ? offset / me.scaleSizeInUnits : offset;

							if (me.isHorizontal()) {
								var valueOffset = me.width * decimal;
								return me.left + Math.round(valueOffset);
							}

							var heightOffset = me.height * decimal;
							return me.top + Math.round(heightOffset);
						}
					},
					getPixelForTick: function getPixelForTick(index) {
						return this.getPixelForValue(this.tickMoments[index], null, null);
					},
					getValueForPixel: function getValueForPixel(pixel) {
						var me = this;
						var innerDimension = me.isHorizontal() ? me.width : me.height;
						var offset = (pixel - (me.isHorizontal() ? me.left : me.top)) / innerDimension;
						offset *= me.scaleSizeInUnits;
						return me.firstTick.clone().add(moment.duration(offset, me.tickUnit).asSeconds(), 'seconds');
					},
					parseTime: function parseTime(label) {
						var me = this;
						if (typeof me.options.time.parser === 'string') {
							return moment(label, me.options.time.parser);
						}
						if (typeof me.options.time.parser === 'function') {
							return me.options.time.parser(label);
						}
						// Date objects
						if (typeof label.getMonth === 'function' || typeof label === 'number') {
							return moment(label);
						}
						// Moment support
						if (label.isValid && label.isValid()) {
							return label;
						}
						// Custom parsing (return an instance of moment)
						if (typeof me.options.time.format !== 'string' && me.options.time.format.call) {
							console.warn('options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale');
							return me.options.time.format(label);
						}
						// Moment format parsing
						return moment(label, me.options.time.format);
					}
				});
				Chart.scaleService.registerScaleType('time', TimeScale, defaultConfig);
			};
		}, { "1": 1 }] }, {}, [7])(7);
});

/***/ }),

/***/ "./resources/assets/js/v1/app.js":
/***/ (function(module, exports) {

/**
 * Created by phil on 15/03/13.
 */
var AppSettings = {
    DEBUGMODE: true //change to turn on/off console.log statements
};
var Debug = {
    log: function log(string, variable) {
        if (AppSettings.DEBUGMODE) {
            try {
                console.log(string, variable);
            } catch (e) {}
        }
    },
    warn: function warn(string, variable) {
        if (AppSettings.DEBUGMODE) {
            try {
                console.warn(string, variable);
            } catch (e) {}
        }
    }
};

console.log('working');

var Header = {
    init: function init() {
        Header.tabs();
    },
    tabs: function tabs() {
        $(".header__tabs a").on('click', function (event) {
            event.preventDefault(); // Stop native action
            $this = $(this);
            $tab = $this.data('tab');
            $('.header__tab a').removeClass('active'); // remove class from any current active
            $this.addClass('active'); // add class to new current
            $('.tab-pane').hide(); // hide the current content
            $('#' + $tab).fadeIn(500).addClass('active'); // show the new content
        });
    }
};

var Campaign = {

    init: function init() {
        Campaign.watchForType();
        Campaign.addOptions();
        Campaign.addOption();
        Campaign.updateOption();
    },
    processInputs: function processInputs($inputs) {
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
            if (this.name === 'checkbox') {
                values[this.name] = $(this).is(':checked') ? true : false;
            }
        });
        return values;
    },
    watchForType: function watchForType() {
        // When someone changes the question type select
        $('.question-add select').on("change", function (e) {
            // If the value is Dropdown

            $('.show-alert__text, .show-alert__select, .show-alert__input').show();
            $('.show-alert__text-notavailable').hide();
            $('#collapseOptions').collapse('hide');
            $("[class*='show-alert__type-']").hide();

            if (this.value == 1) {
                $('.show-alert__type-text').show();
            } else if (this.value == 2) {
                $('#collapseOptions').collapse('show');
                $('.show-alert__type-dropdown').show();
            } else if (this.value == 6 || this.value == 9 || this.value == 10) {
                $('.show-alert__text, .show-alert__select, .show-alert__input').hide();
                $('.show-alert__text-notavailable').show();
            } else if (this.value == 7) {
                $('.show-alert__type-boolean').show();
            } else if (this.value == 8) {
                $('.show-alert__type-rating').show();
            }
        });
        $('.question-edit select').on("change", function (e) {
            var index = $(this).parents('.question-edit').data('index');
            Debug.log(index);
            // If the value is Dropdown
            if (this.value == 2) {
                $('#collapseOptions' + index).collapse('show');
            } else {
                $('#collapseOptions' + index).collapse('hide');
            }
        });
    },
    addOptions: function addOptions() {
        var max_fields = 20; //maximum input boxes allowed
        var wrapper = $(".option_input_fields_wrap"); //Fields wrapper
        var add_button = $(".add_field_button"); //Add button ID
        var x = 1;

        $(add_button).click(function (e) {
            //on add input button click
            e.preventDefault();

            $thisQuestionOptions = $(this).parents('.collapseOptions');
            x = $thisQuestionOptions.find('input[type=text]').length; //initlal text box count
            var inputValue = $(this).parents('.option_input_fields_wrap').find('input').last().val();
            if (x < max_fields && inputValue != "") {
                //max input box allowed
                var newID = $thisQuestionOptions.attr('id') + 'option' + x;
                $thisQuestionOptions.find(".add_field_button").before('<div id="' + newID + '" data-index="' + x + '"><input type="text" name="option[]" placeholder="Type your option and press enter"/><span class="remove_field ion-ios-trash-outline"></span></div>'); //add input box
                $('#' + newID + ' input[type=text]').focus();
                var $optionValues = $(this).parent().find('input');
                var optionValue = $optionValues.eq(x - 1).val();
                $thisQuestionOptions.parent().find('.show-alert__select-reference').append($('<option></option>').val(optionValue).html(optionValue));
                x++; //text box increment
            }
        });

        $(wrapper).on("click", ".remove_field", function (e) {
            //user click on remove text
            e.preventDefault();
            var $this = $(this);
            var $parent = $this.parent();
            $thisQuestionOptions = $this.parents('.collapseOptions');
            $options = $thisQuestionOptions.parent().find('.show-alert__select-reference option');
            console.log($options.lenght);
            $options.length ? $options[$parent.data('index') + 1].remove() : null;
            $parent.remove();
        });
    },
    addQuestion: function addQuestion() {
        // On #questionForm submit send the response to the server. 
        // On return add the line view
        // $( ".questionForm" ).submit(function( event ) {
        //     event.preventDefault();

        //     Debug.log("questionForm Submit");

        //     $form = $(this);
        //     var $inputs = $('.questionForm :input');

        //     Debug.log($inputs);

        //     var values = Campaign.processInputs($inputs);

        //     Debug.log(values);

        //     var optionsArray = [];
        //     $('.option_input_fields_wrap input[type="text"]').each(function(i){
        //         if(this.value !== ""){
        //             optionsArray.push(this.value);
        //         }
        //     });

        //     if(optionsArray.length > 0){
        //         values.optionsArray = optionsArray;
        //     }

        //     var required = (values.required === "on") ? "Yes" : "No";

        //     $.ajax({
        //         type: "POST",
        //         url: "/"+$form.attr('action'),
        //         data: values
        //     }).done(function(data) {
        //         $("#questionForm").trigger('reset');
        //         $('#collapseOptions').collapse('hide');
        //         location.reload();
        //     });
        // });
    },
    updateQuestion: function updateQuestion() {
        // On #questionUpdateForm submit send the details to the server for updating
        $(".questionUpdateForm").submit(function (event) {
            event.preventDefault();

            $form = $(this);

            Debug.log($form.data('index'));

            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);
            var optionsArray = [];
            $('.questionUpdateForm[data-index=' + $form.data('index') + '] .option_input_fields_wrap input[type="text"]').each(function (i) {
                if (this.value !== "") {
                    Debug.log(this.value);
                    optionsArray.push(this.value);
                }
            });

            if (optionsArray.length > 0) {
                values.optionsArray = optionsArray;
            }

            $.ajax({
                type: "POST",
                url: "/" + $form.attr('action'),
                data: values
            }).done(function () {
                location.reload();
            });
        });
    },
    addOption: function addOption() {
        // On #questionForm submit send the response to the server. 
        // On return add the line view
        $(".optionForm").submit(function (event) {
            event.preventDefault();

            Debug.log('option form');

            $form = $(this);
            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);

            Debug.log(values);

            $.ajax({
                type: "POST",
                url: "/" + $form.attr('action'),
                data: values
            }).done(function () {
                $form.trigger('reset');
                $("#" + $form.parent().attr('id')).collapse('hide');
            });
        });
    },
    updateOption: function updateOption() {
        // On #questionUpdateForm submit send the details to the server for updating
        $(".optionUpdateForm").submit(function (event) {
            event.preventDefault();

            $form = $(this);
            var $inputs = $form.find(':input');
            var values = Campaign.processInputs($inputs);

            $.ajax({
                type: "POST",
                url: "/" + $form.attr('action'),
                data: values
            }).done(function () {
                $("#" + $form.parent().attr('id')).collapse('hide');
            });
        });
    }
};

var Dashboard = {

    init: function init() {
        $('[data-toggle="popover"]').popover({ html: true });
        //Dashboard.tableSort();
    },
    tableSort: function tableSort() {
        var options = {
            valueNames: ['name', 'brand', 'activity']
        };

        new List('dashboard-all', options);
        new List('dashboard-draft', options);
        new List('dashboard-active', options);
        new List('dashboard-complete', options);
    }
};

var LaunchButton = {

    // Set value of hidden field launch_campaign = 'true'

    init: function init() {

        $(document).on("click", '.campaign--launch', function (e) {

            Debug.log("launch");

            var launch_campaign = $('input[name="launch_campaign"]').val();

            if (launch_campaign == 'false') {
                e.preventDefault();
                $('input[name="launch_campaign"]').val('true');
                setTimeout(function () {
                    $(".campaign__form").submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--schedule', function (e) {

            Debug.log("schedule");

            var schedule_campaign = $('input[name="schedule_campaign"]').val();

            if (schedule_campaign == 'false') {
                e.preventDefault();
                $('input[name="schedule_campaign"]').val('true');
                setTimeout(function () {
                    $(".campaign__form").submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--save', function (e) {

            Debug.log("save");

            var launch_campaign = $('input[name="launch_campaign"]').val();

            if (launch_campaign == 'true') {
                e.preventDefault();
                $('input[name="launch_campaign"]').val('false');
                setTimeout(function () {
                    $(".campaign__form").submit();
                }, 200);
            }
        });

        $(document).on("click", '.campaign--update', function (e) {

            Debug.log("update");

            var update_campaign = $('input[name="update_campaign"]').val();

            if (update_campaign == 'false') {
                e.preventDefault();
                $('input[name="update_campaign"]').val('true');
                setTimeout(function () {
                    $(".campaign__form").submit();
                }, 200);
            }
        });
    }

};

var Reports = {

    init: function init() {
        // Chart Global Settings
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.2)";
        Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>";
        Chart.defaults.global.tooltipXOffset = 50;

        Reports.prepCharts();
        Reports.dataWidth();
        Reports.activeTab();
    },
    prepCharts: function prepCharts() {
        $(".report-mini__chart").each(function () {
            $this = $(this);
            $this.data('type') === 'pie' ? Reports.pieChart($this) : false;
            $this.data('type') === 'bar' ? Reports.barChart($this) : false;
        });
    },
    barChart: function barChart() {
        var ctx = $this.get(0).getContext("2d");
        var data = $this.data('data');
        var colours = $this.data('colors').split(',');
        var labels_array = [];
        var data_array = [];
        var i = 0;
        $.each(data, function (key, value) {
            labels_array.push(key);
            data_array.push(value);
            i++;
        });
        var data = {
            labels: labels_array,
            datasets: [{
                fillColor: colours[0],
                strokeColor: colours[1],
                highlightFill: colours[2],
                highlightStroke: colours[3],
                data: data_array
            }]
        };
        var thisChart = new Chart(ctx).Bar(data);
    },
    pieChart: function pieChart($this) {
        var ctx = $this.get(0).getContext("2d");
        var data = $this.data('data');
        var colours = $this.data('colors').split(',');
        var data_array = [];
        var i = 0;
        $.each(data, function (key, value) {
            data_array.push({
                color: colours[i],
                value: value,
                label: key
            });
            i++;
        });
        var thisChart = new Chart(ctx).Pie(data_array);
        $this.parent().next().html(thisChart.generateLegend());
    },
    dataWidth: function dataWidth() {
        var number = $('.report-data__header > .report-data__cell').length;
        $('.report-data__header, .report-data__body').css({
            width: number * 200 + "px"
        });
    },
    activeTab: function activeTab() {
        if (window.location.hash) {
            $('.header__tabs a[href="#' + window.location.hash.substring(1) + '"]').tab('show');
        }
    }

};

var Main = {
    run: function run() {
        Debug.log('App is running');
        Header.init();
        Campaign.init();
        Dashboard.init();
        LaunchButton.init();
        Reports.init();
    }
};

// This function kicks off the application
$(document).ready(Main.run);

/***/ }),

/***/ "./resources/assets/js/v1/bootstrap.js":
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });
    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();

    if (!$.support.transition) return;

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';
  var Alert = function Alert(el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.VERSION = '3.3.7';

  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector);

    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.closest('.alert');
    }

    $parent.trigger(e = $.Event('close.bs.alert'));

    if (e.isDefaultPrevented()) return;

    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove();
    }

    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };

  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');

      if (!data) $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.alert;

  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;

  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };

  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function Button(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.VERSION = '3.3.7';

  Button.DEFAULTS = {
    loadingText: 'loading...'
  };

  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();

    state += 'Text';

    if (data.resetText == null) $el.data('resetText', $el[val]());

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d).prop(d, true);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d).prop(d, false);
      }
    }, this), 0);
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find('input');
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false;
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');
      } else if ($input.prop('type') == 'checkbox') {
        if ($input.prop('checked') !== this.$element.hasClass('active')) changed = false;
        this.$element.toggleClass('active');
      }
      $input.prop('checked', this.$element.hasClass('active'));
      if (changed) $input.trigger('change');
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
      this.$element.toggleClass('active');
    }
  };

  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.button', data = new Button(this, options));

      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });
  }

  var old = $.fn.button;

  $.fn.button = Plugin;
  $.fn.button.Constructor = Button;

  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };

  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target).closest('.btn');
    Plugin.call($btn, 'toggle');
    if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
      // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
      e.preventDefault();
      // The target component still receive the focus
      if ($btn.is('input,button')) $btn.trigger('focus');else $btn.find('input:visible,button:visible').first().trigger('focus');
    }
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.7';

  Carousel.TRANSITION_DURATION = 600;

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();break;
      case 39:
        this.next();break;
      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;

    if ($next.hasClass('active')) return this.sliding = false;

    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;

      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;

  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;

    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function Collapse(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) this.toggle();
  };

  Collapse.VERSION = '3.3.7';

  Collapse.TRANSITION_DURATION = 350;

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return;

    var activesData;
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return;
    }

    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null);
    }

    var dimension = this.dimension();

    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);

    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);

    this.transitioning = 1;

    var complete = function complete() {
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    var scrollSize = $.camelCase(['scroll', dimension].join('-'));

    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;

    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var dimension = this.dimension();

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);

    this.$trigger.addClass('collapsed').attr('aria-expanded', false);

    this.transitioning = 1;

    var complete = function complete() {
      this.transitioning = 0;
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');

    $element.attr('aria-expanded', isOpen);
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(target);
  }

  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.collapse;

  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse;

  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };

  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);

    if (!$this.attr('data-target')) e.preventDefault();

    var $target = getTargetFromTrigger($this);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $this.data();

    Plugin.call($target, option);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.7';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) return;

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.trigger('focus').attr('aria-expanded', 'true');

      $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);

    if (!$items.length) return;

    var index = $items.index(e.target);

    if (e.which == 38 && index > 0) index--; // up
    if (e.which == 40 && index < $items.length - 1) index++; // down
    if (!~index) index = 0;

    $items.eq(index).trigger('focus');
  };

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');

      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;

  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;

  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };

  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.7';

  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');

    this.escape();
    this.resize();

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);

      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');

      that.enforceFocus();

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();

    e = $.Event('hide.bs.modal');

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();
    this.resize();

    $(document).off('focusin.bs.modal');

    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

    this.$dialog.off('mousedown.dismiss.bs.modal');

    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');

      if (!callback) return;

      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;

  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

    if ($this.is('a')) e.preventDefault();

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;

    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.7';

  Tooltip.TRANSITION_DURATION = 150;

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = { click: false, hover: false, focus: false };

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });

    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);

    self.hoverState = 'in';

    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }

    return false;
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
    }

    if (self.isInStateTrue()) return;

    clearTimeout(self.timeout);

    self.hoverState = 'out';

    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;

      var $tip = this.tip();

      var tipId = this.getUID(this.type);

      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);

      if (this.options.animation) $tip.addClass('fade');

      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.bs.' + this.type);

      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;

        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;

        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;

    offset.top += marginTop;
    offset.left += marginLeft;

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);

    $tip.addClass('in');

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

    if (delta.left) offset.left += delta.left;else offset.top += delta.top;

    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();
      if (that.$element) {
        // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      }
      callback && callback();
    }

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

    this.hoverState = null;

    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;

    var el = $element[0];
    var isBody = el.tagName == 'BODY';

    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement;
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset = isBody ? { top: 0, left: 0 } : isSvg ? null : $element.offset();
    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 };
    if (!this.$viewport) return delta;

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;

    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));
    return prefix;
  };

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
      }
    }
    return this.$tip;
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);else self.leave(self);
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;

  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;

  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function Popover(element, options) {
    this.init('popover', element, options);
  };

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

  Popover.VERSION = '3.3.7';

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });

  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;

    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  };

  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.popover', data = new Popover(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.popover;

  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;

  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.7';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = 'offset';
    var offsetBase = 0;

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);

      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.3.7';

  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;

    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });

    $previous.trigger(hideEvent);
    $this.trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

    var $target = $(selector);

    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

    $active.removeClass('in');
  };

  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');

      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;

  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };

  // TAB DATA-API
  // ============

  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);

    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.VERSION = '3.3.7';

  Affix.RESET = 'affix affix-top affix-bottom';

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;

    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';

    return false;
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return;

    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max($(document).height(), $(document.body).height());

    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) != 'object') offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '');

      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e = $.Event(affixType + '.bs.affix');

      this.$element.trigger(e);

      if (e.isDefaultPrevented()) return;

      this.affixed = affix;
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  };

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.affix;

  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix;

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };

  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();

      data.offset = data.offset || {};

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;

      Plugin.call($spy, data);
    });
  });
}(jQuery);

/***/ }),

/***/ "./resources/assets/js/v1/jquery-sortable.min.js":
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ===================================================
 *  jquery-sortable.js v0.9.13
 *  http://johnny.github.com/jquery-sortable/
 * ===================================================
 *  Copyright (c) 2012 Jonas von Andrian
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *  * The name of the author may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ========================================================== */

!function ($, window, pluginName, undefined) {
  var containerDefaults = {
    // If true, items can be dragged from this container
    drag: true,
    // If true, items can be droped onto this container
    drop: true,
    // Exclude items from being draggable, if the
    // selector matches the item
    exclude: "",
    // If true, search for nested containers within an item.If you nest containers,
    // either the original selector with which you call the plugin must only match the top containers,
    // or you need to specify a group (see the bootstrap nav example)
    nested: true,
    // If true, the items are assumed to be arranged vertically
    vertical: true
  },
      // end container defaults
  groupDefaults = {
    // This is executed after the placeholder has been moved.
    // $closestItemOrContainer contains the closest item, the placeholder
    // has been put at or the closest empty Container, the placeholder has
    // been appended to.
    afterMove: function afterMove($placeholder, container, $closestItemOrContainer) {},
    // The exact css path between the container and its items, e.g. "> tbody"
    containerPath: "",
    // The css selector of the containers
    containerSelector: "ol, ul",
    // Distance the mouse has to travel to start dragging
    distance: 0,
    // Time in milliseconds after mousedown until dragging should start.
    // This option can be used to prevent unwanted drags when clicking on an element.
    delay: 0,
    // The css selector of the drag handle
    handle: "",
    // The exact css path between the item and its subcontainers.
    // It should only match the immediate items of a container.
    // No item of a subcontainer should be matched. E.g. for ol>div>li the itemPath is "> div"
    itemPath: "",
    // The css selector of the items
    itemSelector: "li",
    // The class given to "body" while an item is being dragged
    bodyClass: "dragging",
    // The class giving to an item while being dragged
    draggedClass: "dragged",
    // Check if the dragged item may be inside the container.
    // Use with care, since the search for a valid container entails a depth first search
    // and may be quite expensive.
    isValidTarget: function isValidTarget($item, container) {
      return true;
    },
    // Executed before onDrop if placeholder is detached.
    // This happens if pullPlaceholder is set to false and the drop occurs outside a container.
    onCancel: function onCancel($item, container, _super, event) {},
    // Executed at the beginning of a mouse move event.
    // The Placeholder has not been moved yet.
    onDrag: function onDrag($item, position, _super, event) {
      $item.css(position);
    },
    // Called after the drag has been started,
    // that is the mouse button is being held down and
    // the mouse is moving.
    // The container is the closest initialized container.
    // Therefore it might not be the container, that actually contains the item.
    onDragStart: function onDragStart($item, container, _super, event) {
      $item.css({
        height: $item.outerHeight(),
        width: $item.outerWidth()
      });
      $item.addClass(container.group.options.draggedClass);
      $("body").addClass(container.group.options.bodyClass);
    },
    // Called when the mouse button is being released
    onDrop: function onDrop($item, container, _super, event) {
      $item.removeClass(container.group.options.draggedClass).removeAttr("style");
      $("body").removeClass(container.group.options.bodyClass);
    },
    // Called on mousedown. If falsy value is returned, the dragging will not start.
    // Ignore if element clicked is input, select or textarea
    onMousedown: function onMousedown($item, _super, event) {
      if (!event.target.nodeName.match(/^(input|select|textarea)$/i)) {
        event.preventDefault();
        return true;
      }
    },
    // The class of the placeholder (must match placeholder option markup)
    placeholderClass: "placeholder",
    // Template for the placeholder. Can be any valid jQuery input
    // e.g. a string, a DOM element.
    // The placeholder must have the class "placeholder"
    placeholder: '<li class="placeholder"></li>',
    // If true, the position of the placeholder is calculated on every mousemove.
    // If false, it is only calculated when the mouse is above a container.
    pullPlaceholder: true,
    // Specifies serialization of the container group.
    // The pair $parent/$children is either container/items or item/subcontainers.
    serialize: function serialize($parent, $children, parentIsContainer) {
      var result = $.extend({}, $parent.data());

      if (parentIsContainer) return [$children];else if ($children[0]) {
        result.children = $children;
      }

      delete result.subContainers;
      delete result.sortable;

      return result;
    },
    // Set tolerance while dragging. Positive values decrease sensitivity,
    // negative values increase it.
    tolerance: 0
  },
      // end group defaults
  containerGroups = {},
      groupCounter = 0,
      emptyBox = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
      eventNames = {
    start: "touchstart.sortable mousedown.sortable",
    drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
    drag: "touchmove.sortable mousemove.sortable",
    scroll: "scroll.sortable"
  },
      subContainerKey = "subContainers";

  /*
   * a is Array [left, right, top, bottom]
   * b is array [left, top]
   */
  function d(a, b) {
    var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
        y = Math.max(0, a[2] - b[1], b[1] - a[3]);
    return x + y;
  }

  function setDimensions(array, dimensions, tolerance, useOffset) {
    var i = array.length,
        offsetMethod = useOffset ? "offset" : "position";
    tolerance = tolerance || 0;

    while (i--) {
      var el = array[i].el ? array[i].el : $(array[i]),

      // use fitting method
      pos = el[offsetMethod]();
      pos.left += parseInt(el.css('margin-left'), 10);
      pos.top += parseInt(el.css('margin-top'), 10);
      dimensions[i] = [pos.left - tolerance, pos.left + el.outerWidth() + tolerance, pos.top - tolerance, pos.top + el.outerHeight() + tolerance];
    }
  }

  function getRelativePosition(pointer, element) {
    var offset = element.offset();
    return {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    };
  }

  function sortByDistanceDesc(dimensions, pointer, lastPointer) {
    pointer = [pointer.left, pointer.top];
    lastPointer = lastPointer && [lastPointer.left, lastPointer.top];

    var dim,
        i = dimensions.length,
        distances = [];

    while (i--) {
      dim = dimensions[i];
      distances[i] = [i, d(dim, pointer), lastPointer && d(dim, lastPointer)];
    }
    distances = distances.sort(function (a, b) {
      return b[1] - a[1] || b[2] - a[2] || b[0] - a[0];
    });

    // last entry is the closest
    return distances;
  }

  function ContainerGroup(options) {
    this.options = $.extend({}, groupDefaults, options);
    this.containers = [];

    if (!this.options.rootGroup) {
      this.scrollProxy = $.proxy(this.scroll, this);
      this.dragProxy = $.proxy(this.drag, this);
      this.dropProxy = $.proxy(this.drop, this);
      this.placeholder = $(this.options.placeholder);

      if (!options.isValidTarget) this.options.isValidTarget = undefined;
    }
  }

  ContainerGroup.get = function (options) {
    if (!containerGroups[options.group]) {
      if (options.group === undefined) options.group = groupCounter++;

      containerGroups[options.group] = new ContainerGroup(options);
    }

    return containerGroups[options.group];
  };

  ContainerGroup.prototype = {
    dragInit: function dragInit(e, itemContainer) {
      this.$document = $(itemContainer.el[0].ownerDocument);

      // get item to drag
      var closestItem = $(e.target).closest(this.options.itemSelector);
      // using the length of this item, prevents the plugin from being started if there is no handle being clicked on.
      // this may also be helpful in instantiating multidrag.
      if (closestItem.length) {
        this.item = closestItem;
        this.itemContainer = itemContainer;
        if (this.item.is(this.options.exclude) || !this.options.onMousedown(this.item, groupDefaults.onMousedown, e)) {
          return;
        }
        this.setPointer(e);
        this.toggleListeners('on');
        this.setupDelayTimer();
        this.dragInitDone = true;
      }
    },
    drag: function drag(e) {
      if (!this.dragging) {
        if (!this.distanceMet(e) || !this.delayMet) return;

        this.options.onDragStart(this.item, this.itemContainer, groupDefaults.onDragStart, e);
        this.item.before(this.placeholder);
        this.dragging = true;
      }

      this.setPointer(e);
      // place item under the cursor
      this.options.onDrag(this.item, getRelativePosition(this.pointer, this.item.offsetParent()), groupDefaults.onDrag, e);

      var p = this.getPointer(e),
          box = this.sameResultBox,
          t = this.options.tolerance;

      if (!box || box.top - t > p.top || box.bottom + t < p.top || box.left - t > p.left || box.right + t < p.left) if (!this.searchValidTarget()) {
        this.placeholder.detach();
        this.lastAppendedItem = undefined;
      }
    },
    drop: function drop(e) {
      this.toggleListeners('off');

      this.dragInitDone = false;

      if (this.dragging) {
        // processing Drop, check if placeholder is detached
        if (this.placeholder.closest("html")[0]) {
          this.placeholder.before(this.item).detach();
        } else {
          this.options.onCancel(this.item, this.itemContainer, groupDefaults.onCancel, e);
        }
        this.options.onDrop(this.item, this.getContainer(this.item), groupDefaults.onDrop, e);

        // cleanup
        this.clearDimensions();
        this.clearOffsetParent();
        this.lastAppendedItem = this.sameResultBox = undefined;
        this.dragging = false;
      }
    },
    searchValidTarget: function searchValidTarget(pointer, lastPointer) {
      if (!pointer) {
        pointer = this.relativePointer || this.pointer;
        lastPointer = this.lastRelativePointer || this.lastPointer;
      }

      var distances = sortByDistanceDesc(this.getContainerDimensions(), pointer, lastPointer),
          i = distances.length;

      while (i--) {
        var index = distances[i][0],
            distance = distances[i][1];

        if (!distance || this.options.pullPlaceholder) {
          var container = this.containers[index];
          if (!container.disabled) {
            if (!this.$getOffsetParent()) {
              var offsetParent = container.getItemOffsetParent();
              pointer = getRelativePosition(pointer, offsetParent);
              lastPointer = getRelativePosition(lastPointer, offsetParent);
            }
            if (container.searchValidTarget(pointer, lastPointer)) return true;
          }
        }
      }
      if (this.sameResultBox) this.sameResultBox = undefined;
    },
    movePlaceholder: function movePlaceholder(container, item, method, sameResultBox) {
      var lastAppendedItem = this.lastAppendedItem;
      if (!sameResultBox && lastAppendedItem && lastAppendedItem[0] === item[0]) return;

      item[method](this.placeholder);
      this.lastAppendedItem = item;
      this.sameResultBox = sameResultBox;
      this.options.afterMove(this.placeholder, container, item);
    },
    getContainerDimensions: function getContainerDimensions() {
      if (!this.containerDimensions) setDimensions(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent());
      return this.containerDimensions;
    },
    getContainer: function getContainer(element) {
      return element.closest(this.options.containerSelector).data(pluginName);
    },
    $getOffsetParent: function $getOffsetParent() {
      if (this.offsetParent === undefined) {
        var i = this.containers.length - 1,
            offsetParent = this.containers[i].getItemOffsetParent();

        if (!this.options.rootGroup) {
          while (i--) {
            if (offsetParent[0] != this.containers[i].getItemOffsetParent()[0]) {
              // If every container has the same offset parent,
              // use position() which is relative to this parent,
              // otherwise use offset()
              // compare #setDimensions
              offsetParent = false;
              break;
            }
          }
        }

        this.offsetParent = offsetParent;
      }
      return this.offsetParent;
    },
    setPointer: function setPointer(e) {
      var pointer = this.getPointer(e);

      if (this.$getOffsetParent()) {
        var relativePointer = getRelativePosition(pointer, this.$getOffsetParent());
        this.lastRelativePointer = this.relativePointer;
        this.relativePointer = relativePointer;
      }

      this.lastPointer = this.pointer;
      this.pointer = pointer;
    },
    distanceMet: function distanceMet(e) {
      var currentPointer = this.getPointer(e);
      return Math.max(Math.abs(this.pointer.left - currentPointer.left), Math.abs(this.pointer.top - currentPointer.top)) >= this.options.distance;
    },
    getPointer: function getPointer(e) {
      var o = e.originalEvent || e.originalEvent.touches && e.originalEvent.touches[0];
      return {
        left: e.pageX || o.pageX,
        top: e.pageY || o.pageY
      };
    },
    setupDelayTimer: function setupDelayTimer() {
      var that = this;
      this.delayMet = !this.options.delay;

      // init delay timer if needed
      if (!this.delayMet) {
        clearTimeout(this._mouseDelayTimer);
        this._mouseDelayTimer = setTimeout(function () {
          that.delayMet = true;
        }, this.options.delay);
      }
    },
    scroll: function scroll(e) {
      this.clearDimensions();
      this.clearOffsetParent(); // TODO is this needed?
    },
    toggleListeners: function toggleListeners(method) {
      var that = this,
          events = ['drag', 'drop', 'scroll'];

      $.each(events, function (i, event) {
        that.$document[method](eventNames[event], that[event + 'Proxy']);
      });
    },
    clearOffsetParent: function clearOffsetParent() {
      this.offsetParent = undefined;
    },
    // Recursively clear container and item dimensions
    clearDimensions: function clearDimensions() {
      this.traverse(function (object) {
        object._clearDimensions();
      });
    },
    traverse: function traverse(callback) {
      callback(this);
      var i = this.containers.length;
      while (i--) {
        this.containers[i].traverse(callback);
      }
    },
    _clearDimensions: function _clearDimensions() {
      this.containerDimensions = undefined;
    },
    _destroy: function _destroy() {
      containerGroups[this.options.group] = undefined;
    }
  };

  function Container(element, options) {
    this.el = element;
    this.options = $.extend({}, containerDefaults, options);

    this.group = ContainerGroup.get(this.options);
    this.rootGroup = this.options.rootGroup || this.group;
    this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector;

    var itemPath = this.rootGroup.options.itemPath;
    this.target = itemPath ? this.el.find(itemPath) : this.el;

    this.target.on(eventNames.start, this.handle, $.proxy(this.dragInit, this));

    if (this.options.drop) this.group.containers.push(this);
  }

  Container.prototype = {
    dragInit: function dragInit(e) {
      var rootGroup = this.rootGroup;

      if (!this.disabled && !rootGroup.dragInitDone && this.options.drag && this.isValidDrag(e)) {
        rootGroup.dragInit(e, this);
      }
    },
    isValidDrag: function isValidDrag(e) {
      return e.which == 1 || e.type == "touchstart" && e.originalEvent.touches.length == 1;
    },
    searchValidTarget: function searchValidTarget(pointer, lastPointer) {
      var distances = sortByDistanceDesc(this.getItemDimensions(), pointer, lastPointer),
          i = distances.length,
          rootGroup = this.rootGroup,
          validTarget = !rootGroup.options.isValidTarget || rootGroup.options.isValidTarget(rootGroup.item, this);

      if (!i && validTarget) {
        rootGroup.movePlaceholder(this, this.target, "append");
        return true;
      } else while (i--) {
        var index = distances[i][0],
            distance = distances[i][1];
        if (!distance && this.hasChildGroup(index)) {
          var found = this.getContainerGroup(index).searchValidTarget(pointer, lastPointer);
          if (found) return true;
        } else if (validTarget) {
          this.movePlaceholder(index, pointer);
          return true;
        }
      }
    },
    movePlaceholder: function movePlaceholder(index, pointer) {
      var item = $(this.items[index]),
          dim = this.itemDimensions[index],
          method = "after",
          width = item.outerWidth(),
          height = item.outerHeight(),
          offset = item.offset(),
          sameResultBox = {
        left: offset.left,
        right: offset.left + width,
        top: offset.top,
        bottom: offset.top + height
      };
      if (this.options.vertical) {
        var yCenter = (dim[2] + dim[3]) / 2,
            inUpperHalf = pointer.top <= yCenter;
        if (inUpperHalf) {
          method = "before";
          sameResultBox.bottom -= height / 2;
        } else sameResultBox.top += height / 2;
      } else {
        var xCenter = (dim[0] + dim[1]) / 2,
            inLeftHalf = pointer.left <= xCenter;
        if (inLeftHalf) {
          method = "before";
          sameResultBox.right -= width / 2;
        } else sameResultBox.left += width / 2;
      }
      if (this.hasChildGroup(index)) sameResultBox = emptyBox;
      this.rootGroup.movePlaceholder(this, item, method, sameResultBox);
    },
    getItemDimensions: function getItemDimensions() {
      if (!this.itemDimensions) {
        this.items = this.$getChildren(this.el, "item").filter(":not(." + this.group.options.placeholderClass + ", ." + this.group.options.draggedClass + ")").get();
        setDimensions(this.items, this.itemDimensions = [], this.options.tolerance);
      }
      return this.itemDimensions;
    },
    getItemOffsetParent: function getItemOffsetParent() {
      var offsetParent,
          el = this.el;
      // Since el might be empty we have to check el itself and
      // can not do something like el.children().first().offsetParent()
      if (el.css("position") === "relative" || el.css("position") === "absolute" || el.css("position") === "fixed") offsetParent = el;else offsetParent = el.offsetParent();
      return offsetParent;
    },
    hasChildGroup: function hasChildGroup(index) {
      return this.options.nested && this.getContainerGroup(index);
    },
    getContainerGroup: function getContainerGroup(index) {
      var childGroup = $.data(this.items[index], subContainerKey);
      if (childGroup === undefined) {
        var childContainers = this.$getChildren(this.items[index], "container");
        childGroup = false;

        if (childContainers[0]) {
          var options = $.extend({}, this.options, {
            rootGroup: this.rootGroup,
            group: groupCounter++
          });
          childGroup = childContainers[pluginName](options).data(pluginName).group;
        }
        $.data(this.items[index], subContainerKey, childGroup);
      }
      return childGroup;
    },
    $getChildren: function $getChildren(parent, type) {
      var options = this.rootGroup.options,
          path = options[type + "Path"],
          selector = options[type + "Selector"];

      parent = $(parent);
      if (path) parent = parent.find(path);

      return parent.children(selector);
    },
    _serialize: function _serialize(parent, isContainer) {
      var that = this,
          childType = isContainer ? "item" : "container",
          children = this.$getChildren(parent, childType).not(this.options.exclude).map(function () {
        return that._serialize($(this), !isContainer);
      }).get();

      return this.rootGroup.options.serialize(parent, children, isContainer);
    },
    traverse: function traverse(callback) {
      $.each(this.items || [], function (item) {
        var group = $.data(this, subContainerKey);
        if (group) group.traverse(callback);
      });

      callback(this);
    },
    _clearDimensions: function _clearDimensions() {
      this.itemDimensions = undefined;
    },
    _destroy: function _destroy() {
      var that = this;

      this.target.off(eventNames.start, this.handle);
      this.el.removeData(pluginName);

      if (this.options.drop) this.group.containers = $.grep(this.group.containers, function (val) {
        return val != that;
      });

      $.each(this.items || [], function () {
        $.removeData(this, subContainerKey);
      });
    }
  };

  var API = {
    enable: function enable() {
      this.traverse(function (object) {
        object.disabled = false;
      });
    },
    disable: function disable() {
      this.traverse(function (object) {
        object.disabled = true;
      });
    },
    serialize: function serialize() {
      return this._serialize(this.el, true);
    },
    refresh: function refresh() {
      this.traverse(function (object) {
        object._clearDimensions();
      });
    },
    destroy: function destroy() {
      this.traverse(function (object) {
        object._destroy();
      });
    }
  };

  $.extend(Container.prototype, API);

  /**
   * jQuery API
   *
   * Parameters are
   *   either options on init
   *   or a method name followed by arguments to pass to the method
   */
  $.fn[pluginName] = function (methodOrOptions) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.map(function () {
      var $t = $(this),
          object = $t.data(pluginName);

      if (object && API[methodOrOptions]) return API[methodOrOptions].apply(object, args) || this;else if (!object && (methodOrOptions === undefined || (typeof methodOrOptions === "undefined" ? "undefined" : _typeof(methodOrOptions)) === "object")) $t.data(pluginName, new Container($t, methodOrOptions));

      return this;
    });
  };
}(jQuery, window, 'sortable');

/***/ }),

/***/ "./resources/assets/js/v1/jquery.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


	var version = "3.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function fcssescape(ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = _locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(">tbody", elem)[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with computed style
		var valueIsBorderBox,
		    styles = getStyles(elem),
		    val = curCSS(elem, name, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (val === "auto") {
			val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var doc,
			    docElem,
			    rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (jQuery.isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return jQuery;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./resources/assets/js/v1/jquery.matchHeight.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function (factory) {
    // eslint-disable-line no-extra-semi
    'use strict';

    if (true) {
        // AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function _parse(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function _rows(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function () {
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function _parseOptions(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function (options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function (key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = '0.7.2';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function (elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function () {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function () {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function (key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function () {
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function () {
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, targetHeight - verticalPadding + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop(scrollTop / htmlHeight * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function () {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function () {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function () {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function _update(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function () {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function (throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function () {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function (event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function (event) {
        matchHeight._update(true, event);
    });
});

/***/ }),

/***/ "./resources/assets/js/v1/lightbox.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
!function (a, b) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery);
}(this, function (a) {
  function b(b) {
    this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b);
  }return b.defaults = { albumLabel: "Image %1 of %2", alwaysShowNavOnTouchDevices: !1, fadeDuration: 600, fitImagesInViewport: !0, imageFadeDuration: 600, positionFromTop: 50, resizeDuration: 700, showImageNumberLabel: !0, wrapAround: !1, disableScrolling: !1, sanitizeTitle: !1 }, b.prototype.option = function (b) {
    a.extend(this.options, b);
  }, b.prototype.imageCountLabel = function (a, b) {
    return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b);
  }, b.prototype.init = function () {
    var b = this;a(document).ready(function () {
      b.enable(), b.build();
    });
  }, b.prototype.enable = function () {
    var b = this;a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function (c) {
      return b.start(a(c.currentTarget)), !1;
    });
  }, b.prototype.build = function () {
    var b = this;a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = { top: parseInt(this.$container.css("padding-top"), 10), right: parseInt(this.$container.css("padding-right"), 10), bottom: parseInt(this.$container.css("padding-bottom"), 10), left: parseInt(this.$container.css("padding-left"), 10) }, this.imageBorderWidth = { top: parseInt(this.$image.css("border-top-width"), 10), right: parseInt(this.$image.css("border-right-width"), 10), bottom: parseInt(this.$image.css("border-bottom-width"), 10), left: parseInt(this.$image.css("border-left-width"), 10) }, this.$overlay.hide().on("click", function () {
      return b.end(), !1;
    }), this.$lightbox.hide().on("click", function (c) {
      return "lightbox" === a(c.target).attr("id") && b.end(), !1;
    }), this.$outerContainer.on("click", function (c) {
      return "lightbox" === a(c.target).attr("id") && b.end(), !1;
    }), this.$lightbox.find(".lb-prev").on("click", function () {
      return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1;
    }), this.$lightbox.find(".lb-next").on("click", function () {
      return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1;
    }), this.$nav.on("mousedown", function (a) {
      3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function () {
        setTimeout(function () {
          this.$nav.css("pointer-events", "auto");
        }.bind(b), 0);
      }));
    }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function () {
      return b.end(), !1;
    });
  }, b.prototype.start = function (b) {
    function c(a) {
      d.album.push({ link: a.attr("href"), title: a.attr("data-title") || a.attr("title") });
    }var d = this,
        e = a(window);e.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({ visibility: "hidden" }), this.sizeOverlay(), this.album = [];var f,
        g = 0,
        h = b.attr("data-lightbox");if (h) {
      f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]');for (var i = 0; i < f.length; i = ++i) {
        c(a(f[i])), f[i] === b[0] && (g = i);
      }
    } else if ("lightbox" === b.attr("rel")) c(b);else {
      f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');for (var j = 0; j < f.length; j = ++j) {
        c(a(f[j])), f[j] === b[0] && (g = j);
      }
    }var k = e.scrollTop() + this.options.positionFromTop,
        l = e.scrollLeft();this.$lightbox.css({ top: k + "px", left: l + "px" }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g);
  }, b.prototype.changeImage = function (b) {
    var c = this;this.disableKeyboardNav();var d = this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");var e = new Image();e.onload = function () {
      var f, g, h, i, j, k, l;d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, i = k - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - 120, c.options.maxWidth && c.options.maxWidth < j && (j = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (i = c.options.maxHeight), (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height());
    }, e.src = this.album[b].link, this.currentImageIndex = b;
  }, b.prototype.sizeOverlay = function () {
    this.$overlay.width(a(document).width()).height(a(document).height());
  }, b.prototype.sizeContainer = function (a, b) {
    function c() {
      d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.showImage();
    }var d = this,
        e = this.$outerContainer.outerWidth(),
        f = this.$outerContainer.outerHeight(),
        g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
        h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;e !== g || f !== h ? this.$outerContainer.animate({ width: g, height: h }, this.options.resizeDuration, "swing", function () {
      c();
    }) : c();
  }, b.prototype.showImage = function () {
    this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav();
  }, b.prototype.updateNav = function () {
    var a = !1;try {
      document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1;
    } catch (b) {}this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))));
  }, b.prototype.updateDetails = function () {
    var b = this;if ("undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
      var c = this.$lightbox.find(".lb-caption");this.options.sanitizeTitle ? c.text(this.album[this.currentImageIndex].title) : c.html(this.album[this.currentImageIndex].title), c.fadeIn("fast").find("a").on("click", function (b) {
        void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href");
      });
    }if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var d = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);this.$lightbox.find(".lb-number").text(d).fadeIn("fast");
    } else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function () {
      return b.sizeOverlay();
    });
  }, b.prototype.preloadNeighboringImages = function () {
    if (this.album.length > this.currentImageIndex + 1) {
      var a = new Image();a.src = this.album[this.currentImageIndex + 1].link;
    }if (this.currentImageIndex > 0) {
      var b = new Image();b.src = this.album[this.currentImageIndex - 1].link;
    }
  }, b.prototype.enableKeyboardNav = function () {
    a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this));
  }, b.prototype.disableKeyboardNav = function () {
    a(document).off(".keyboard");
  }, b.prototype.keyboardAction = function (a) {
    var b = 27,
        c = 37,
        d = 39,
        e = a.keyCode,
        f = String.fromCharCode(e).toLowerCase();e === b || f.match(/x|o|c/) ? this.end() : "p" === f || e === c ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === f || e === d) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0));
  }, b.prototype.end = function () {
    this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({ visibility: "visible" }), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling");
  }, new b();
});
//# sourceMappingURL=lightbox.min.map

/***/ }),

/***/ "./resources/assets/js/v1/list.js":
/***/ (function(module, exports) {

/*! List.js v1.5.0 (http://listjs.com) by Jonny Strömberg (http://javve.com) */
var List =
/******/function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};

  /******/ // The require function
  /******/function __webpack_require__(moduleId) {

    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId])
      /******/return installedModules[moduleId].exports;

    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };

    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    /******/ // Flag the module as loaded
    /******/module.l = true;

    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }

  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;

  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;

  /******/ // identity function for calling harmony imports with the correct context
  /******/__webpack_require__.i = function (value) {
    return value;
  };

  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };

  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };

  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";

  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 11);
  /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  /**
   * Module dependencies.
   */

  var index = __webpack_require__(4);

  /**
   * Whitespace regexp.
   */

  var re = /\s+/;

  /**
   * toString reference.
   */

  var toString = Object.prototype.toString;

  /**
   * Wrap `el` in a `ClassList`.
   *
   * @param {Element} el
   * @return {ClassList}
   * @api public
   */

  module.exports = function (el) {
    return new ClassList(el);
  };

  /**
   * Initialize a new ClassList for `el`.
   *
   * @param {Element} el
   * @api private
   */

  function ClassList(el) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }
    this.el = el;
    this.list = el.classList;
  }

  /**
   * Add class `name` if not already present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.add = function (name) {
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    }

    // fallback
    var arr = this.array();
    var i = index(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  };

  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.remove = function (name) {
    // classList
    if (this.list) {
      this.list.remove(name);
      return this;
    }

    // fallback
    var arr = this.array();
    var i = index(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  };

  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.toggle = function (name, force) {
    // classList
    if (this.list) {
      if ("undefined" !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    // fallback
    if ("undefined" !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  };

  /**
   * Return an array of classes.
   *
   * @return {Array}
   * @api public
   */

  ClassList.prototype.array = function () {
    var className = this.el.getAttribute('class') || '';
    var str = className.replace(/^\s+|\s+$/g, '');
    var arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  };

  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */

  ClassList.prototype.has = ClassList.prototype.contains = function (name) {
    return this.list ? this.list.contains(name) : !!~index(this.array(), name);
  };

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
      unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
      prefix = bind !== 'addEventListener' ? 'on' : '',
      toArray = __webpack_require__(5);

  /**
   * Bind `el` event `type` to `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */

  exports.bind = function (el, type, fn, capture) {
    el = toArray(el);
    for (var i = 0; i < el.length; i++) {
      el[i][bind](prefix + type, fn, capture || false);
    }
  };

  /**
   * Unbind `el` event `type`'s callback `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */

  exports.unbind = function (el, type, fn, capture) {
    el = toArray(el);
    for (var i = 0; i < el.length; i++) {
      el[i][unbind](prefix + type, fn, capture || false);
    }
  };

  /***/
},
/* 2 */
/***/function (module, exports) {

  module.exports = function (list) {
    return function (initValues, element, notCreate) {
      var item = this;

      this._values = {};

      this.found = false; // Show if list.searched == true and this.found == true
      this.filtered = false; // Show if list.filtered == true and this.filtered == true

      var init = function init(initValues, element, notCreate) {
        if (element === undefined) {
          if (notCreate) {
            item.values(initValues, notCreate);
          } else {
            item.values(initValues);
          }
        } else {
          item.elm = element;
          var values = list.templater.get(item, initValues);
          item.values(values);
        }
      };

      this.values = function (newValues, notCreate) {
        if (newValues !== undefined) {
          for (var name in newValues) {
            item._values[name] = newValues[name];
          }
          if (notCreate !== true) {
            list.templater.set(item, item.values());
          }
        } else {
          return item._values;
        }
      };

      this.show = function () {
        list.templater.show(item);
      };

      this.hide = function () {
        list.templater.hide(item);
      };

      this.matching = function () {
        return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
      };

      this.visible = function () {
        return item.elm && item.elm.parentNode == list.list ? true : false;
      };

      init(initValues, element, notCreate);
    };
  };

  /***/
},
/* 3 */
/***/function (module, exports) {

  /**
   * A cross-browser implementation of getElementsByClass.
   * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
   *
   * Find all elements with class `className` inside `container`.
   * Use `single = true` to increase performance in older browsers
   * when only one element is needed.
   *
   * @param {String} className
   * @param {Element} container
   * @param {Boolean} single
   * @api public
   */

  var getElementsByClassName = function getElementsByClassName(container, className, single) {
    if (single) {
      return container.getElementsByClassName(className)[0];
    } else {
      return container.getElementsByClassName(className);
    }
  };

  var querySelector = function querySelector(container, className, single) {
    className = '.' + className;
    if (single) {
      return container.querySelector(className);
    } else {
      return container.querySelectorAll(className);
    }
  };

  var polyfill = function polyfill(container, className, single) {
    var classElements = [],
        tag = '*';

    var els = container.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0, j = 0; i < elsLen; i++) {
      if (pattern.test(els[i].className)) {
        if (single) {
          return els[i];
        } else {
          classElements[j] = els[i];
          j++;
        }
      }
    }
    return classElements;
  };

  module.exports = function () {
    return function (container, className, single, options) {
      options = options || {};
      if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
        return getElementsByClassName(container, className, single);
      } else if (options.test && options.querySelector || !options.test && document.querySelector) {
        return querySelector(container, className, single);
      } else {
        return polyfill(container, className, single);
      }
    };
  }();

  /***/
},
/* 4 */
/***/function (module, exports) {

  var indexOf = [].indexOf;

  module.exports = function (arr, obj) {
    if (indexOf) return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };

  /***/
},
/* 5 */
/***/function (module, exports) {

  /**
   * Source: https://github.com/timoxley/to-array
   *
   * Convert an array-like object into an `Array`.
   * If `collection` is already an `Array`, then will return a clone of `collection`.
   *
   * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
   * @return {Array} Naive conversion of `collection` to a new `Array`.
   * @api public
   */

  module.exports = function toArray(collection) {
    if (typeof collection === 'undefined') return [];
    if (collection === null) return [null];
    if (collection === window) return [window];
    if (typeof collection === 'string') return [collection];
    if (isArray(collection)) return collection;
    if (typeof collection.length != 'number') return [collection];
    if (typeof collection === 'function' && collection instanceof Function) return [collection];

    var arr = [];
    for (var i = 0; i < collection.length; i++) {
      if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
        arr.push(collection[i]);
      }
    }
    if (!arr.length) return [];
    return arr;
  };

  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }

  /***/
},
/* 6 */
/***/function (module, exports) {

  module.exports = function (s) {
    s = s === undefined ? "" : s;
    s = s === null ? "" : s;
    s = s.toString();
    return s;
  };

  /***/
},
/* 7 */
/***/function (module, exports) {

  /*
   * Source: https://github.com/segmentio/extend
   */

  module.exports = function extend(object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1);

    // For each extender, copy their properties on our object.
    for (var i = 0, source; source = args[i]; i++) {
      if (!source) continue;
      for (var property in source) {
        object[property] = source[property];
      }
    }

    return object;
  };

  /***/
},
/* 8 */
/***/function (module, exports) {

  module.exports = function (list) {
    var addAsync = function addAsync(values, callback, items) {
      var valuesToAdd = values.splice(0, 50);
      items = items || [];
      items = items.concat(list.add(valuesToAdd));
      if (values.length > 0) {
        setTimeout(function () {
          addAsync(values, callback, items);
        }, 1);
      } else {
        list.update();
        callback(items);
      }
    };
    return addAsync;
  };

  /***/
},
/* 9 */
/***/function (module, exports) {

  module.exports = function (list) {

    // Add handlers
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];

    return function (filterFunction) {
      list.trigger('filterStart');
      list.i = 1; // Reset paging
      list.reset.filter();
      if (filterFunction === undefined) {
        list.filtered = false;
      } else {
        list.filtered = true;
        var is = list.items;
        for (var i = 0, il = is.length; i < il; i++) {
          var item = is[i];
          if (filterFunction(item)) {
            item.filtered = true;
          } else {
            item.filtered = false;
          }
        }
      }
      list.update();
      list.trigger('filterComplete');
      return list.visibleItems;
    };
  };

  /***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

  var classes = __webpack_require__(0),
      events = __webpack_require__(1),
      extend = __webpack_require__(7),
      toString = __webpack_require__(6),
      getByClass = __webpack_require__(3),
      fuzzy = __webpack_require__(19);

  module.exports = function (list, options) {
    options = options || {};

    options = extend({
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true,
      searchClass: 'fuzzy-search'
    }, options);

    var fuzzySearch = {
      search: function search(searchString, columns) {
        // Substract arguments from the searchString or put searchString as only argument
        var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

        for (var k = 0, kl = list.items.length; k < kl; k++) {
          fuzzySearch.item(list.items[k], columns, searchArguments);
        }
      },
      item: function item(_item, columns, searchArguments) {
        var found = true;
        for (var i = 0; i < searchArguments.length; i++) {
          var foundArgument = false;
          for (var j = 0, jl = columns.length; j < jl; j++) {
            if (fuzzySearch.values(_item.values(), columns[j], searchArguments[i])) {
              foundArgument = true;
            }
          }
          if (!foundArgument) {
            found = false;
          }
        }
        _item.found = found;
      },
      values: function values(_values, value, searchArgument) {
        if (_values.hasOwnProperty(value)) {
          var text = toString(_values[value]).toLowerCase();

          if (fuzzy(text, searchArgument, options)) {
            return true;
          }
        }
        return false;
      }
    };

    events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', function (e) {
      var target = e.target || e.srcElement; // IE have srcElement
      list.search(target.value, fuzzySearch.search);
    });

    return function (str, columns) {
      list.search(str, columns, fuzzySearch.search);
    };
  };

  /***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

  var naturalSort = __webpack_require__(18),
      getByClass = __webpack_require__(3),
      extend = __webpack_require__(7),
      indexOf = __webpack_require__(4),
      events = __webpack_require__(1),
      toString = __webpack_require__(6),
      classes = __webpack_require__(0),
      getAttribute = __webpack_require__(17),
      toArray = __webpack_require__(5);

  module.exports = function (id, options, values) {

    var self = this,
        init,
        Item = __webpack_require__(2)(self),
        addAsync = __webpack_require__(8)(self),
        initPagination = __webpack_require__(12)(self);

    init = {
      start: function start() {
        self.listClass = "list";
        self.searchClass = "search";
        self.sortClass = "sort";
        self.page = 10000;
        self.i = 1;
        self.items = [];
        self.visibleItems = [];
        self.matchingItems = [];
        self.searched = false;
        self.filtered = false;
        self.searchColumns = undefined;
        self.handlers = { 'updated': [] };
        self.valueNames = [];
        self.utils = {
          getByClass: getByClass,
          extend: extend,
          indexOf: indexOf,
          events: events,
          toString: toString,
          naturalSort: naturalSort,
          classes: classes,
          getAttribute: getAttribute,
          toArray: toArray
        };

        self.utils.extend(self, options);

        self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;
        if (!self.listContainer) {
          return;
        }
        self.list = getByClass(self.listContainer, self.listClass, true);

        self.parse = __webpack_require__(13)(self);
        self.templater = __webpack_require__(16)(self);
        self.search = __webpack_require__(14)(self);
        self.filter = __webpack_require__(9)(self);
        self.sort = __webpack_require__(15)(self);
        self.fuzzySearch = __webpack_require__(10)(self, options.fuzzySearch);

        this.handlers();
        this.items();
        this.pagination();

        self.update();
      },
      handlers: function handlers() {
        for (var handler in self.handlers) {
          if (self[handler]) {
            self.on(handler, self[handler]);
          }
        }
      },
      items: function items() {
        self.parse(self.list);
        if (values !== undefined) {
          self.add(values);
        }
      },
      pagination: function pagination() {
        if (options.pagination !== undefined) {
          if (options.pagination === true) {
            options.pagination = [{}];
          }
          if (options.pagination[0] === undefined) {
            options.pagination = [options.pagination];
          }
          for (var i = 0, il = options.pagination.length; i < il; i++) {
            initPagination(options.pagination[i]);
          }
        }
      }
    };

    /*
    * Re-parse the List, use if html have changed
    */
    this.reIndex = function () {
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.parse(self.list);
    };

    this.toJSON = function () {
      var json = [];
      for (var i = 0, il = self.items.length; i < il; i++) {
        json.push(self.items[i].values());
      }
      return json;
    };

    /*
    * Add object to list
    */
    this.add = function (values, callback) {
      if (values.length === 0) {
        return;
      }
      if (callback) {
        addAsync(values, callback);
        return;
      }
      var added = [],
          notCreate = false;
      if (values[0] === undefined) {
        values = [values];
      }
      for (var i = 0, il = values.length; i < il; i++) {
        var item = null;
        notCreate = self.items.length > self.page ? true : false;
        item = new Item(values[i], undefined, notCreate);
        self.items.push(item);
        added.push(item);
      }
      self.update();
      return added;
    };

    this.show = function (i, page) {
      this.i = i;
      this.page = page;
      self.update();
      return self;
    };

    /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
    this.remove = function (valueName, value, options) {
      var found = 0;
      for (var i = 0, il = self.items.length; i < il; i++) {
        if (self.items[i].values()[valueName] == value) {
          self.templater.remove(self.items[i], options);
          self.items.splice(i, 1);
          il--;
          i--;
          found++;
        }
      }
      self.update();
      return found;
    };

    /* Gets the objects in the list which
    * property "valueName" === value
    */
    this.get = function (valueName, value) {
      var matchedItems = [];
      for (var i = 0, il = self.items.length; i < il; i++) {
        var item = self.items[i];
        if (item.values()[valueName] == value) {
          matchedItems.push(item);
        }
      }
      return matchedItems;
    };

    /*
    * Get size of the list
    */
    this.size = function () {
      return self.items.length;
    };

    /*
    * Removes all items from the list
    */
    this.clear = function () {
      self.templater.clear();
      self.items = [];
      return self;
    };

    this.on = function (event, callback) {
      self.handlers[event].push(callback);
      return self;
    };

    this.off = function (event, callback) {
      var e = self.handlers[event];
      var index = indexOf(e, callback);
      if (index > -1) {
        e.splice(index, 1);
      }
      return self;
    };

    this.trigger = function (event) {
      var i = self.handlers[event].length;
      while (i--) {
        self.handlers[event][i](self);
      }
      return self;
    };

    this.reset = {
      filter: function filter() {
        var is = self.items,
            il = is.length;
        while (il--) {
          is[il].filtered = false;
        }
        return self;
      },
      search: function search() {
        var is = self.items,
            il = is.length;
        while (il--) {
          is[il].found = false;
        }
        return self;
      }
    };

    this.update = function () {
      var is = self.items,
          il = is.length;

      self.visibleItems = [];
      self.matchingItems = [];
      self.templater.clear();
      for (var i = 0; i < il; i++) {
        if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
          is[i].show();
          self.visibleItems.push(is[i]);
          self.matchingItems.push(is[i]);
        } else if (is[i].matching()) {
          self.matchingItems.push(is[i]);
          is[i].hide();
        } else {
          is[i].hide();
        }
      }
      self.trigger('updated');
      return self;
    };

    init.start();
  };

  /***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

  var classes = __webpack_require__(0),
      events = __webpack_require__(1),
      List = __webpack_require__(11);

  module.exports = function (list) {

    var refresh = function refresh(pagingList, options) {
      var item,
          l = list.matchingItems.length,
          index = list.i,
          page = list.page,
          pages = Math.ceil(l / page),
          currentPage = Math.ceil(index / page),
          innerWindow = options.innerWindow || 2,
          left = options.left || options.outerWindow || 0,
          right = options.right || options.outerWindow || 0;

      right = pages - right;

      pagingList.clear();
      for (var i = 1; i <= pages; i++) {
        var className = currentPage === i ? "active" : "";

        //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

        if (is.number(i, left, right, currentPage, innerWindow)) {
          item = pagingList.add({
            page: i,
            dotted: false
          })[0];
          if (className) {
            classes(item.elm).add(className);
          }
          addEvent(item.elm, i, page);
        } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
          item = pagingList.add({
            page: "...",
            dotted: true
          })[0];
          classes(item.elm).add("disabled");
        }
      }
    };

    var is = {
      number: function number(i, left, right, currentPage, innerWindow) {
        return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
      },
      left: function left(i, _left) {
        return i <= _left;
      },
      right: function right(i, _right) {
        return i > _right;
      },
      innerWindow: function innerWindow(i, currentPage, _innerWindow) {
        return i >= currentPage - _innerWindow && i <= currentPage + _innerWindow;
      },
      dotted: function dotted(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
      },
      dottedLeft: function dottedLeft(pagingList, i, left, right, currentPage, innerWindow) {
        return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      },
      dottedRight: function dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        if (pagingList.items[currentPageItem - 1].values().dotted) {
          return false;
        } else {
          return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
        }
      }
    };

    var addEvent = function addEvent(elm, i, page) {
      events.bind(elm, 'click', function () {
        list.show((i - 1) * page + 1, page);
      });
    };

    return function (options) {
      var pagingList = new List(list.listContainer.id, {
        listClass: options.paginationClass || 'pagination',
        item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
        valueNames: ['page', 'dotted'],
        searchClass: 'pagination-search-that-is-not-supposed-to-exist',
        sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
      });

      list.on('updated', function () {
        refresh(pagingList, options);
      });
      refresh(pagingList, options);
    };
  };

  /***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

  module.exports = function (list) {

    var Item = __webpack_require__(2)(list);

    var getChildren = function getChildren(parent) {
      var nodes = parent.childNodes,
          items = [];
      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          items.push(nodes[i]);
        }
      }
      return items;
    };

    var parse = function parse(itemElements, valueNames) {
      for (var i = 0, il = itemElements.length; i < il; i++) {
        list.items.push(new Item(valueNames, itemElements[i]));
      }
    };
    var parseAsync = function parseAsync(itemElements, valueNames) {
      var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?
      parse(itemsToIndex, valueNames);
      if (itemElements.length > 0) {
        setTimeout(function () {
          parseAsync(itemElements, valueNames);
        }, 1);
      } else {
        list.update();
        list.trigger('parseComplete');
      }
    };

    list.handlers.parseComplete = list.handlers.parseComplete || [];

    return function () {
      var itemsToIndex = getChildren(list.list),
          valueNames = list.valueNames;

      if (list.indexAsync) {
        parseAsync(itemsToIndex, valueNames);
      } else {
        parse(itemsToIndex, valueNames);
      }
    };
  };

  /***/
},
/* 14 */
/***/function (module, exports) {

  module.exports = function (_list) {
    var item, text, columns, searchString, customSearch;

    var prepare = {
      resetList: function resetList() {
        _list.i = 1;
        _list.templater.clear();
        customSearch = undefined;
      },
      setOptions: function setOptions(args) {
        if (args.length == 2 && args[1] instanceof Array) {
          columns = args[1];
        } else if (args.length == 2 && typeof args[1] == "function") {
          columns = undefined;
          customSearch = args[1];
        } else if (args.length == 3) {
          columns = args[1];
          customSearch = args[2];
        } else {
          columns = undefined;
        }
      },
      setColumns: function setColumns() {
        if (_list.items.length === 0) return;
        if (columns === undefined) {
          columns = _list.searchColumns === undefined ? prepare.toArray(_list.items[0].values()) : _list.searchColumns;
        }
      },
      setSearchString: function setSearchString(s) {
        s = _list.utils.toString(s).toLowerCase();
        s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters
        searchString = s;
      },
      toArray: function toArray(values) {
        var tmpColumn = [];
        for (var name in values) {
          tmpColumn.push(name);
        }
        return tmpColumn;
      }
    };
    var search = {
      list: function list() {
        for (var k = 0, kl = _list.items.length; k < kl; k++) {
          search.item(_list.items[k]);
        }
      },
      item: function item(_item2) {
        _item2.found = false;
        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (search.values(_item2.values(), columns[j])) {
            _item2.found = true;
            return;
          }
        }
      },
      values: function values(_values2, column) {
        if (_values2.hasOwnProperty(column)) {
          text = _list.utils.toString(_values2[column]).toLowerCase();
          if (searchString !== "" && text.search(searchString) > -1) {
            return true;
          }
        }
        return false;
      },
      reset: function reset() {
        _list.reset.search();
        _list.searched = false;
      }
    };

    var searchMethod = function searchMethod(str) {
      _list.trigger('searchStart');

      prepare.resetList();
      prepare.setSearchString(str);
      prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction
      prepare.setColumns();

      if (searchString === "") {
        search.reset();
      } else {
        _list.searched = true;
        if (customSearch) {
          customSearch(searchString, columns);
        } else {
          search.list();
        }
      }

      _list.update();
      _list.trigger('searchComplete');
      return _list.visibleItems;
    };

    _list.handlers.searchStart = _list.handlers.searchStart || [];
    _list.handlers.searchComplete = _list.handlers.searchComplete || [];

    _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'keyup', function (e) {
      var target = e.target || e.srcElement,
          // IE have srcElement
      alreadyCleared = target.value === "" && !_list.searched;
      if (!alreadyCleared) {
        // If oninput already have resetted the list, do nothing
        searchMethod(target.value);
      }
    });

    // Used to detect click on HTML5 clear button
    _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
      var target = e.target || e.srcElement;
      if (target.value === "") {
        searchMethod('');
      }
    });

    return searchMethod;
  };

  /***/
},
/* 15 */
/***/function (module, exports) {

  module.exports = function (list) {

    var buttons = {
      els: undefined,
      clear: function clear() {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          list.utils.classes(buttons.els[i]).remove('asc');
          list.utils.classes(buttons.els[i]).remove('desc');
        }
      },
      getOrder: function getOrder(btn) {
        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');
        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          return predefinedOrder;
        } else if (list.utils.classes(btn).has('desc')) {
          return "asc";
        } else if (list.utils.classes(btn).has('asc')) {
          return "desc";
        } else {
          return "asc";
        }
      },
      getInSensitive: function getInSensitive(btn, options) {
        var insensitive = list.utils.getAttribute(btn, 'data-insensitive');
        if (insensitive === "false") {
          options.insensitive = false;
        } else {
          options.insensitive = true;
        }
      },
      setOrder: function setOrder(options) {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          var btn = buttons.els[i];
          if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
            continue;
          }
          var predefinedOrder = list.utils.getAttribute(btn, 'data-order');
          if (predefinedOrder == "asc" || predefinedOrder == "desc") {
            if (predefinedOrder == options.order) {
              list.utils.classes(btn).add(options.order);
            }
          } else {
            list.utils.classes(btn).add(options.order);
          }
        }
      }
    };

    var sort = function sort() {
      list.trigger('sortStart');
      var options = {};

      var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

      if (target) {
        options.valueName = list.utils.getAttribute(target, 'data-sort');
        buttons.getInSensitive(target, options);
        options.order = buttons.getOrder(target);
      } else {
        options = arguments[1] || options;
        options.valueName = arguments[0];
        options.order = options.order || "asc";
        options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
      }

      buttons.clear();
      buttons.setOrder(options);

      // caseInsensitive
      // alphabet
      var customSortFunction = options.sortFunction || list.sortFunction || null,
          multi = options.order === 'desc' ? -1 : 1,
          sortFunction;

      if (customSortFunction) {
        sortFunction = function sortFunction(itemA, itemB) {
          return customSortFunction(itemA, itemB, options) * multi;
        };
      } else {
        sortFunction = function sortFunction(itemA, itemB) {
          var sort = list.utils.naturalSort;
          sort.alphabet = list.alphabet || options.alphabet || undefined;
          if (!sort.alphabet && options.insensitive) {
            sort = list.utils.naturalSort.caseInsensitive;
          }
          return sort(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
        };
      }

      list.items.sort(sortFunction);
      list.update();
      list.trigger('sortComplete');
    };

    // Add handlers
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];

    buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
    list.utils.events.bind(buttons.els, 'click', sort);
    list.on('searchStart', buttons.clear);
    list.on('filterStart', buttons.clear);

    return sort;
  };

  /***/
},
/* 16 */
/***/function (module, exports) {

  var Templater = function Templater(list) {
    var itemSource,
        templater = this;

    var init = function init() {
      itemSource = templater.getItemSource(list.item);
      if (itemSource) {
        itemSource = templater.clearSourceItem(itemSource, list.valueNames);
      }
    };

    this.clearSourceItem = function (el, valueNames) {
      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm;
        if (valueNames[i].data) {
          for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
            el.setAttribute('data-' + valueNames[i].data[j], '');
          }
        } else if (valueNames[i].attr && valueNames[i].name) {
          elm = list.utils.getByClass(el, valueNames[i].name, true);
          if (elm) {
            elm.setAttribute(valueNames[i].attr, "");
          }
        } else {
          elm = list.utils.getByClass(el, valueNames[i], true);
          if (elm) {
            elm.innerHTML = "";
          }
        }
        elm = undefined;
      }
      return el;
    };

    this.getItemSource = function (item) {
      if (item === undefined) {
        var nodes = list.list.childNodes,
            items = [];

        for (var i = 0, il = nodes.length; i < il; i++) {
          // Only textnodes have a data attribute
          if (nodes[i].data === undefined) {
            return nodes[i].cloneNode(true);
          }
        }
      } else if (/<tr[\s>]/g.exec(item)) {
        var tbody = document.createElement('tbody');
        tbody.innerHTML = item;
        return tbody.firstChild;
      } else if (item.indexOf("<") !== -1) {
        var div = document.createElement('div');
        div.innerHTML = item;
        return div.firstChild;
      } else {
        var source = document.getElementById(list.item);
        if (source) {
          return source;
        }
      }
      return undefined;
    };

    this.get = function (item, valueNames) {
      templater.create(item);
      var values = {};
      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm;
        if (valueNames[i].data) {
          for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
            values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueNames[i].data[j]);
          }
        } else if (valueNames[i].attr && valueNames[i].name) {
          elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
          values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
        } else {
          elm = list.utils.getByClass(item.elm, valueNames[i], true);
          values[valueNames[i]] = elm ? elm.innerHTML : "";
        }
        elm = undefined;
      }
      return values;
    };

    this.set = function (item, values) {
      var getValueName = function getValueName(name) {
        for (var i = 0, il = list.valueNames.length; i < il; i++) {
          if (list.valueNames[i].data) {
            var data = list.valueNames[i].data;
            for (var j = 0, jl = data.length; j < jl; j++) {
              if (data[j] === name) {
                return { data: name };
              }
            }
          } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
            return list.valueNames[i];
          } else if (list.valueNames[i] === name) {
            return name;
          }
        }
      };
      var setValue = function setValue(name, value) {
        var elm;
        var valueName = getValueName(name);
        if (!valueName) return;
        if (valueName.data) {
          item.elm.setAttribute('data-' + valueName.data, value);
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(item.elm, valueName.name, true);
          if (elm) {
            elm.setAttribute(valueName.attr, value);
          }
        } else {
          elm = list.utils.getByClass(item.elm, valueName, true);
          if (elm) {
            elm.innerHTML = value;
          }
        }
        elm = undefined;
      };
      if (!templater.create(item)) {
        for (var v in values) {
          if (values.hasOwnProperty(v)) {
            setValue(v, values[v]);
          }
        }
      }
    };

    this.create = function (item) {
      if (item.elm !== undefined) {
        return false;
      }
      if (itemSource === undefined) {
        throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
      }
      /* If item source does not exists, use the first item in list as
      source for new items */
      var newItem = itemSource.cloneNode(true);
      newItem.removeAttribute('id');
      item.elm = newItem;
      templater.set(item, item.values());
      return true;
    };
    this.remove = function (item) {
      if (item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };
    this.show = function (item) {
      templater.create(item);
      list.list.appendChild(item.elm);
    };
    this.hide = function (item) {
      if (item.elm !== undefined && item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };
    this.clear = function () {
      /* .innerHTML = ''; fucks up IE */
      if (list.list.hasChildNodes()) {
        while (list.list.childNodes.length >= 1) {
          list.list.removeChild(list.list.firstChild);
        }
      }
    };

    init();
  };

  module.exports = function (list) {
    return new Templater(list);
  };

  /***/
},
/* 17 */
/***/function (module, exports) {

  /**
   * A cross-browser implementation of getAttribute.
   * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
   *
   * Return the value for `attr` at `element`.
   *
   * @param {Element} el
   * @param {String} attr
   * @api public
   */

  module.exports = function (el, attr) {
    var result = el.getAttribute && el.getAttribute(attr) || null;
    if (!result) {
      var attrs = el.attributes;
      var length = attrs.length;
      for (var i = 0; i < length; i++) {
        if (attr[i] !== undefined) {
          if (attr[i].nodeName === attr) {
            result = attr[i].nodeValue;
          }
        }
      }
    }
    return result;
  };

  /***/
},
/* 18 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var alphabet;
  var alphabetIndexMap;
  var alphabetIndexMapLength = 0;

  function isNumberCode(code) {
    return code >= 48 && code <= 57;
  }

  function naturalCompare(a, b) {
    var lengthA = (a += '').length;
    var lengthB = (b += '').length;
    var aIndex = 0;
    var bIndex = 0;

    while (aIndex < lengthA && bIndex < lengthB) {
      var charCodeA = a.charCodeAt(aIndex);
      var charCodeB = b.charCodeAt(bIndex);

      if (isNumberCode(charCodeA)) {
        if (!isNumberCode(charCodeB)) {
          return charCodeA - charCodeB;
        }

        var numStartA = aIndex;
        var numStartB = bIndex;

        while (charCodeA === 48 && ++numStartA < lengthA) {
          charCodeA = a.charCodeAt(numStartA);
        }
        while (charCodeB === 48 && ++numStartB < lengthB) {
          charCodeB = b.charCodeAt(numStartB);
        }

        var numEndA = numStartA;
        var numEndB = numStartB;

        while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
          ++numEndA;
        }
        while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
          ++numEndB;
        }

        var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length
        if (difference) {
          return difference;
        }

        while (numStartA < numEndA) {
          difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
          if (difference) {
            return difference;
          }
        }

        aIndex = numEndA;
        bIndex = numEndB;
        continue;
      }

      if (charCodeA !== charCodeB) {
        if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
          return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
        }

        return charCodeA - charCodeB;
      }

      ++aIndex;
      ++bIndex;
    }

    return lengthA - lengthB;
  }

  naturalCompare.caseInsensitive = naturalCompare.i = function (a, b) {
    return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
  };

  Object.defineProperties(naturalCompare, {
    alphabet: {
      get: function get() {
        return alphabet;
      },
      set: function set(value) {
        alphabet = value;
        alphabetIndexMap = [];
        var i = 0;
        if (alphabet) {
          for (; i < alphabet.length; i++) {
            alphabetIndexMap[alphabet.charCodeAt(i)] = i;
          }
        }
        alphabetIndexMapLength = alphabetIndexMap.length;
        for (i = 0; i < alphabetIndexMapLength; i++) {
          if (alphabetIndexMap[i] === undefined) {
            alphabetIndexMap[i] = -1;
          }
        }
      }
    }
  });

  module.exports = naturalCompare;

  /***/
},
/* 19 */
/***/function (module, exports) {

  module.exports = function (text, pattern, options) {
    // Aproximately where in the text is the pattern expected to be found?
    var Match_Location = options.location || 0;

    //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    var Match_Distance = options.distance || 100;

    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.
    var Match_Threshold = options.threshold || 0.4;

    if (pattern === text) return true; // Exact match
    if (pattern.length > 32) return false; // This algorithm cannot be used

    // Set starting location at beginning text and initialise the alphabet.
    var loc = Match_Location,
        s = function () {
      var q = {},
          i;

      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] = 0;
      }

      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }

      return q;
    }();

    // Compute and return the score for a match with e errors and x location.
    // Accesses loc and pattern through being a closure.

    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length,
          proximity = Math.abs(loc - x);

      if (!Match_Distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy;
      }
      return accuracy + proximity / Match_Distance;
    }

    var score_threshold = Match_Threshold,
        // Highest score beyond which we give up.
    best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      // What about in the other direction? (speedup)
      best_loc = text.lastIndexOf(pattern, loc + pattern.length);

      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    }

    // Initialise the bit arrays.
    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;

    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;
    for (var d = 0; d < pattern.length; d++) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from 'loc' we can stray at this
      // error level.
      bin_min = 0;
      bin_mid = bin_max;
      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }
        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      }
      // Use the result from this iteration as the maximum for the next.
      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;
      for (var j = finish; j >= start; j--) {
        // The alphabet (s) is a sparse hash, so the following line generates
        // warnings.
        var charMatch = s[text.charAt(j - 1)];
        if (d === 0) {
          // First pass: exact match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          // Subsequent passes: fuzzy match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }
        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1);
          // This match will almost certainly be better than any existing match.
          // But check anyway.
          if (score <= score_threshold) {
            // Told you so.
            score_threshold = score;
            best_loc = j - 1;
            if (best_loc > loc) {
              // When passing loc, don't exceed our current distance from loc.
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              // Already passed loc, downhill from here on in.
              break;
            }
          }
        }
      }
      // No hope for a (better) match at greater error levels.
      if (match_bitapScore_(d + 1, loc) > score_threshold) {
        break;
      }
      last_rd = rd;
    }

    return best_loc < 0 ? false : true;
  };

  /***/
}]
/******/);

/***/ }),

/***/ "./resources/assets/js/v1/notify.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Notify.js - http://notifyjs.com/ Copyright (c) 2015 MIT */
(function (factory) {
    // UMD start
    // https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($) {
    //IE8 indexOf polyfill
    var indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    };

    var pluginName = "notify";
    var pluginClassName = pluginName + "js";
    var blankFieldName = pluginName + "!blank";

    var positions = {
        t: "top",
        m: "middle",
        b: "bottom",
        l: "left",
        c: "center",
        r: "right"
    };
    var hAligns = ["l", "c", "r"];
    var vAligns = ["t", "m", "b"];
    var mainPositions = ["t", "b", "l", "r"];
    var opposites = {
        t: "b",
        m: null,
        b: "t",
        l: "r",
        c: null,
        r: "l"
    };

    var parsePosition = function parsePosition(str) {
        var pos;
        pos = [];
        $.each(str.split(/\W+/), function (i, word) {
            var w;
            w = word.toLowerCase().charAt(0);
            if (positions[w]) {
                return pos.push(w);
            }
        });
        return pos;
    };

    var styles = {};

    var coreStyle = {
        name: "core",
        html: "<div class=\"" + pluginClassName + "-wrapper\">\n    <div class=\"" + pluginClassName + "-arrow\"></div>\n   <div class=\"" + pluginClassName + "-container\"></div>\n</div>",
        css: "." + pluginClassName + "-corner {\n   position: fixed;\n  margin: 5px;\n  z-index: 1050;\n}\n\n." + pluginClassName + "-corner ." + pluginClassName + "-wrapper,\n." + pluginClassName + "-corner ." + pluginClassName + "-container {\n  position: relative;\n   display: block;\n   height: inherit;\n  width: inherit;\n   margin: 3px;\n}\n\n." + pluginClassName + "-wrapper {\n z-index: 1;\n   position: absolute;\n   display: inline-block;\n    height: 0;\n    width: 0;\n}\n\n." + pluginClassName + "-container {\n  display: none;\n    z-index: 1;\n   position: absolute;\n}\n\n." + pluginClassName + "-hidable {\n  cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n    position: relative;\n}\n\n." + pluginClassName + "-arrow {\n    position: absolute;\n   z-index: 2;\n   width: 0;\n height: 0;\n}"
    };

    var stylePrefixes = {
        "border-radius": ["-webkit-", "-moz-"]
    };

    var getStyle = function getStyle(name) {
        return styles[name];
    };

    var addStyle = function addStyle(name, def) {
        if (!name) {
            throw "Missing Style name";
        }
        if (!def) {
            throw "Missing Style definition";
        }
        if (!def.html) {
            throw "Missing Style HTML";
        }
        //remove existing style
        var existing = styles[name];
        if (existing && existing.cssElem) {
            if (window.console) {
                console.warn(pluginName + ": overwriting style '" + name + "'");
            }
            styles[name].cssElem.remove();
        }
        def.name = name;
        styles[name] = def;
        var cssText = "";
        if (def.classes) {
            $.each(def.classes, function (className, props) {
                cssText += "." + pluginClassName + "-" + def.name + "-" + className + " {\n";
                $.each(props, function (name, val) {
                    if (stylePrefixes[name]) {
                        $.each(stylePrefixes[name], function (i, prefix) {
                            return cssText += " " + prefix + name + ": " + val + ";\n";
                        });
                    }
                    return cssText += " " + name + ": " + val + ";\n";
                });
                return cssText += "}\n";
            });
        }
        if (def.css) {
            cssText += "/* styles for " + def.name + " */\n" + def.css;
        }
        if (cssText) {
            def.cssElem = insertCSS(cssText);
            def.cssElem.attr("id", "notify-" + def.name);
        }
        var fields = {};
        var elem = $(def.html);
        findFields("html", elem, fields);
        findFields("text", elem, fields);
        def.fields = fields;
    };

    var insertCSS = function insertCSS(cssText) {
        var e, elem, error;
        elem = createElem("style");
        elem.attr("type", 'text/css');
        $("head").append(elem);
        try {
            elem.html(cssText);
        } catch (_) {
            elem[0].styleSheet.cssText = cssText;
        }
        return elem;
    };

    var findFields = function findFields(type, elem, fields) {
        var attr;
        if (type !== "html") {
            type = "text";
        }
        attr = "data-notify-" + type;
        return find(elem, "[" + attr + "]").each(function () {
            var name;
            name = $(this).attr(attr);
            if (!name) {
                name = blankFieldName;
            }
            fields[name] = type;
        });
    };

    var find = function find(elem, selector) {
        if (elem.is(selector)) {
            return elem;
        } else {
            return elem.find(selector);
        }
    };

    var pluginOptions = {
        clickToHide: true,
        autoHide: true,
        autoHideDelay: 5000,
        arrowShow: true,
        arrowSize: 5,
        breakNewLines: true,
        elementPosition: "bottom",
        globalPosition: "top right",
        style: "bootstrap",
        className: "error",
        showAnimation: "slideDown",
        showDuration: 400,
        hideAnimation: "slideUp",
        hideDuration: 200,
        gap: 5
    };

    var inherit = function inherit(a, b) {
        var F;
        F = function F() {};
        F.prototype = a;
        return $.extend(true, new F(), b);
    };

    var defaults = function defaults(opts) {
        return $.extend(pluginOptions, opts);
    };

    var createElem = function createElem(tag) {
        return $("<" + tag + "></" + tag + ">");
    };

    var globalAnchors = {};

    var getAnchorElement = function getAnchorElement(element) {
        var radios;
        if (element.is('[type=radio]')) {
            radios = element.parents('form:first').find('[type=radio]').filter(function (i, e) {
                return $(e).attr("name") === element.attr("name");
            });
            element = radios.first();
        }
        return element;
    };

    var incr = function incr(obj, pos, val) {
        var opp, temp;
        if (typeof val === "string") {
            val = parseInt(val, 10);
        } else if (typeof val !== "number") {
            return;
        }
        if (isNaN(val)) {
            return;
        }
        opp = positions[opposites[pos.charAt(0)]];
        temp = pos;
        if (obj[opp] !== undefined) {
            pos = positions[opp.charAt(0)];
            val = -val;
        }
        if (obj[pos] === undefined) {
            obj[pos] = val;
        } else {
            obj[pos] += val;
        }
        return null;
    };

    var realign = function realign(alignment, inner, outer) {
        if (alignment === "l" || alignment === "t") {
            return 0;
        } else if (alignment === "c" || alignment === "m") {
            return outer / 2 - inner / 2;
        } else if (alignment === "r" || alignment === "b") {
            return outer - inner;
        }
        throw "Invalid alignment";
    };

    var encode = function encode(text) {
        encode.e = encode.e || createElem("div");
        return encode.e.text(text).html();
    };

    function Notification(elem, data, options) {
        if (typeof options === "string") {
            options = {
                className: options
            };
        }
        this.options = inherit(pluginOptions, $.isPlainObject(options) ? options : {});
        this.loadHTML();
        this.wrapper = $(coreStyle.html);
        if (this.options.clickToHide) {
            this.wrapper.addClass(pluginClassName + "-hidable");
        }
        this.wrapper.data(pluginClassName, this);
        this.arrow = this.wrapper.find("." + pluginClassName + "-arrow");
        this.container = this.wrapper.find("." + pluginClassName + "-container");
        this.container.append(this.userContainer);
        if (elem && elem.length) {
            this.elementType = elem.attr("type");
            this.originalElement = elem;
            this.elem = getAnchorElement(elem);
            this.elem.data(pluginClassName, this);
            this.elem.before(this.wrapper);
        }
        this.container.hide();
        this.run(data);
    }

    Notification.prototype.loadHTML = function () {
        var style;
        style = this.getStyle();
        this.userContainer = $(style.html);
        this.userFields = style.fields;
    };

    Notification.prototype.show = function (show, userCallback) {
        var args, callback, elems, fn, hidden;
        callback = function (_this) {
            return function () {
                if (!show && !_this.elem) {
                    _this.destroy();
                }
                if (userCallback) {
                    return userCallback();
                }
            };
        }(this);
        hidden = this.container.parent().parents(':hidden').length > 0;
        elems = this.container.add(this.arrow);
        args = [];
        if (hidden && show) {
            fn = "show";
        } else if (hidden && !show) {
            fn = "hide";
        } else if (!hidden && show) {
            fn = this.options.showAnimation;
            args.push(this.options.showDuration);
        } else if (!hidden && !show) {
            fn = this.options.hideAnimation;
            args.push(this.options.hideDuration);
        } else {
            return callback();
        }
        args.push(callback);
        return elems[fn].apply(elems, args);
    };

    Notification.prototype.setGlobalPosition = function () {
        var p = this.getPosition();
        var pMain = p[0];
        var pAlign = p[1];
        var main = positions[pMain];
        var align = positions[pAlign];
        var key = pMain + "|" + pAlign;
        var anchor = globalAnchors[key];
        if (!anchor) {
            anchor = globalAnchors[key] = createElem("div");
            var css = {};
            css[main] = 0;
            if (align === "middle") {
                css.top = '45%';
            } else if (align === "center") {
                css.left = '45%';
            } else {
                css[align] = 0;
            }
            anchor.css(css).addClass(pluginClassName + "-corner");
            $("body").append(anchor);
        }
        return anchor.prepend(this.wrapper);
    };

    Notification.prototype.setElementPosition = function () {
        var arrowColor, arrowCss, arrowSize, color, contH, contW, css, elemH, elemIH, elemIW, elemPos, elemW, gap, j, k, len, len1, mainFull, margin, opp, oppFull, pAlign, pArrow, pMain, pos, posFull, position, ref, wrapPos;
        position = this.getPosition();
        pMain = position[0];
        pAlign = position[1];
        pArrow = position[2];
        elemPos = this.elem.position();
        elemH = this.elem.outerHeight();
        elemW = this.elem.outerWidth();
        elemIH = this.elem.innerHeight();
        elemIW = this.elem.innerWidth();
        wrapPos = this.wrapper.position();
        contH = this.container.height();
        contW = this.container.width();
        mainFull = positions[pMain];
        opp = opposites[pMain];
        oppFull = positions[opp];
        css = {};
        css[oppFull] = pMain === "b" ? elemH : pMain === "r" ? elemW : 0;
        incr(css, "top", elemPos.top - wrapPos.top);
        incr(css, "left", elemPos.left - wrapPos.left);
        ref = ["top", "left"];
        for (j = 0, len = ref.length; j < len; j++) {
            pos = ref[j];
            margin = parseInt(this.elem.css("margin-" + pos), 10);
            if (margin) {
                incr(css, pos, margin);
            }
        }
        gap = Math.max(0, this.options.gap - (this.options.arrowShow ? arrowSize : 0));
        incr(css, oppFull, gap);
        if (!this.options.arrowShow) {
            this.arrow.hide();
        } else {
            arrowSize = this.options.arrowSize;
            arrowCss = $.extend({}, css);
            arrowColor = this.userContainer.css("border-color") || this.userContainer.css("border-top-color") || this.userContainer.css("background-color") || "white";
            for (k = 0, len1 = mainPositions.length; k < len1; k++) {
                pos = mainPositions[k];
                posFull = positions[pos];
                if (pos === opp) {
                    continue;
                }
                color = posFull === mainFull ? arrowColor : "transparent";
                arrowCss["border-" + posFull] = arrowSize + "px solid " + color;
            }
            incr(css, positions[opp], arrowSize);
            if (indexOf.call(mainPositions, pAlign) >= 0) {
                incr(arrowCss, positions[pAlign], arrowSize * 2);
            }
        }
        if (indexOf.call(vAligns, pMain) >= 0) {
            incr(css, "left", realign(pAlign, contW, elemW));
            if (arrowCss) {
                incr(arrowCss, "left", realign(pAlign, arrowSize, elemIW));
            }
        } else if (indexOf.call(hAligns, pMain) >= 0) {
            incr(css, "top", realign(pAlign, contH, elemH));
            if (arrowCss) {
                incr(arrowCss, "top", realign(pAlign, arrowSize, elemIH));
            }
        }
        if (this.container.is(":visible")) {
            css.display = "block";
        }
        this.container.removeAttr("style").css(css);
        if (arrowCss) {
            return this.arrow.removeAttr("style").css(arrowCss);
        }
    };

    Notification.prototype.getPosition = function () {
        var pos, ref, ref1, ref2, ref3, ref4, ref5, text;
        text = this.options.position || (this.elem ? this.options.elementPosition : this.options.globalPosition);
        pos = parsePosition(text);
        if (pos.length === 0) {
            pos[0] = "b";
        }
        if (ref = pos[0], indexOf.call(mainPositions, ref) < 0) {
            throw "Must be one of [" + mainPositions + "]";
        }
        if (pos.length === 1 || (ref1 = pos[0], indexOf.call(vAligns, ref1) >= 0) && (ref2 = pos[1], indexOf.call(hAligns, ref2) < 0) || (ref3 = pos[0], indexOf.call(hAligns, ref3) >= 0) && (ref4 = pos[1], indexOf.call(vAligns, ref4) < 0)) {
            pos[1] = (ref5 = pos[0], indexOf.call(hAligns, ref5) >= 0) ? "m" : "l";
        }
        if (pos.length === 2) {
            pos[2] = pos[1];
        }
        return pos;
    };

    Notification.prototype.getStyle = function (name) {
        var style;
        if (!name) {
            name = this.options.style;
        }
        if (!name) {
            name = "default";
        }
        style = styles[name];
        if (!style) {
            throw "Missing style: " + name;
        }
        return style;
    };

    Notification.prototype.updateClasses = function () {
        var classes, style;
        classes = ["base"];
        if ($.isArray(this.options.className)) {
            classes = classes.concat(this.options.className);
        } else if (this.options.className) {
            classes.push(this.options.className);
        }
        style = this.getStyle();
        classes = $.map(classes, function (n) {
            return pluginClassName + "-" + style.name + "-" + n;
        }).join(" ");
        return this.userContainer.attr("class", classes);
    };

    Notification.prototype.run = function (data, options) {
        var d, datas, name, type, value;
        if ($.isPlainObject(options)) {
            $.extend(this.options, options);
        } else if ($.type(options) === "string") {
            this.options.className = options;
        }
        if (this.container && !data) {
            this.show(false);
            return;
        } else if (!this.container && !data) {
            return;
        }
        datas = {};
        if ($.isPlainObject(data)) {
            datas = data;
        } else {
            datas[blankFieldName] = data;
        }
        for (name in datas) {
            d = datas[name];
            type = this.userFields[name];
            if (!type) {
                continue;
            }
            if (type === "text") {
                d = encode(d);
                if (this.options.breakNewLines) {
                    d = d.replace(/\n/g, '<br/>');
                }
            }
            value = name === blankFieldName ? '' : '=' + name;
            find(this.userContainer, "[data-notify-" + type + value + "]").html(d);
        }
        this.updateClasses();
        if (this.elem) {
            this.setElementPosition();
        } else {
            this.setGlobalPosition();
        }
        this.show(true);
        if (this.options.autoHide) {
            clearTimeout(this.autohideTimer);
            this.autohideTimer = setTimeout(this.show.bind(this, false), this.options.autoHideDelay);
        }
    };

    Notification.prototype.destroy = function () {
        this.wrapper.data(pluginClassName, null);
        this.wrapper.remove();
    };

    $[pluginName] = function (elem, data, options) {
        if (elem && elem.nodeName || elem.jquery) {
            $(elem)[pluginName](data, options);
        } else {
            options = data;
            data = elem;
            new Notification(null, data, options);
        }
        return elem;
    };

    $.fn[pluginName] = function (data, options) {
        $(this).each(function () {
            var prev = getAnchorElement($(this)).data(pluginClassName);
            if (prev) {
                prev.destroy();
            }
            var curr = new Notification($(this), data, options);
        });
        return this;
    };

    $.extend($[pluginName], {
        defaults: defaults,
        addStyle: addStyle,
        pluginOptions: pluginOptions,
        getStyle: getStyle,
        insertCSS: insertCSS
    });

    //always include the default bootstrap style
    addStyle("bootstrap", {
        html: "<div>\n<span data-notify-text></span>\n</div>",
        classes: {
            base: {
                "font-weight": "bold",
                "padding": "8px 15px 8px 14px",
                "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
                "background-color": "#fcf8e3",
                "border": "1px solid #fbeed5",
                "border-radius": "4px",
                "white-space": "nowrap",
                "padding-left": "25px",
                "background-repeat": "no-repeat",
                "background-position": "3px 7px"
            },
            error: {
                "color": "#B94A48",
                "background-color": "#F2DEDE",
                "border-color": "#EED3D7",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"
            },
            success: {
                "color": "#468847",
                "background-color": "#DFF0D8",
                "border-color": "#D6E9C6",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"
            },
            info: {
                "color": "#3A87AD",
                "background-color": "#D9EDF7",
                "border-color": "#BCE8F1",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"
            },
            warn: {
                "color": "#C09853",
                "background-color": "#FCF8E3",
                "border-color": "#FBEED5",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"
            }
        }
    });

    $(function () {
        insertCSS(coreStyle.css).attr("id", "core-notify");
        $(document).on("click", "." + pluginClassName + "-hidable", function (e) {
            $(this).trigger("notify-hide");
        });
        $(document).on("notify-hide", "." + pluginClassName + "-wrapper", function (e) {
            var elem = $(this).data(pluginClassName);
            if (elem) {
                elem.show(false);
            }
        });
    });
});

$.notify.addStyle("metro", {
    html: "<div>\n<span data-notify-text></span>\n</div>"
});

$.notify.defaults({
    position: "top center",
    style: 'metro',
    autoHide: true
});

/***/ }),

/***/ "./resources/assets/js/v1/select2.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (a) {
  var b = function () {
    if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;var b;return function () {
      if (!b || !b.requirejs) {
        b ? c = b : b = {};var a, c, d;!function (b) {
          function e(a, b) {
            return u.call(a, b);
          }function f(a, b) {
            var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n = b && b.split("/"),
                o = s.map,
                p = o && o["*"] || {};if (a && "." === a.charAt(0)) if (b) {
              for (a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.slice(0, n.length - 1).concat(a), k = 0; k < a.length; k += 1) {
                if (m = a[k], "." === m) a.splice(k, 1), k -= 1;else if (".." === m) {
                  if (1 === k && (".." === a[2] || ".." === a[0])) break;k > 0 && (a.splice(k - 1, 2), k -= 2);
                }
              }a = a.join("/");
            } else 0 === a.indexOf("./") && (a = a.substring(2));if ((n || p) && o) {
              for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                if (d = c.slice(0, k).join("/"), n) for (l = n.length; l > 0; l -= 1) {
                  if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
                    f = e, h = k;break;
                  }
                }if (f) break;!i && p && p[d] && (i = p[d], j = k);
              }!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"));
            }return a;
          }function g(a, c) {
            return function () {
              var d = v.call(arguments, 0);return "string" != typeof d[0] && 1 === d.length && d.push(null), _n.apply(b, d.concat([a, c]));
            };
          }function h(a) {
            return function (b) {
              return f(b, a);
            };
          }function i(a) {
            return function (b) {
              q[a] = b;
            };
          }function j(a) {
            if (e(r, a)) {
              var c = r[a];delete r[a], t[a] = !0, m.apply(b, c);
            }if (!e(q, a) && !e(t, a)) throw new Error("No " + a);return q[a];
          }function k(a) {
            var b,
                c = a ? a.indexOf("!") : -1;return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a];
          }function l(a) {
            return function () {
              return s && s.config && s.config[a] || {};
            };
          }var m,
              _n,
              o,
              p,
              q = {},
              r = {},
              s = {},
              t = {},
              u = Object.prototype.hasOwnProperty,
              v = [].slice,
              w = /\.js$/;o = function o(a, b) {
            var c,
                d = k(a),
                e = d[0];return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), { f: e ? e + "!" + a : a, n: a, pr: e, p: c };
          }, p = { require: function require(a) {
              return g(a);
            }, exports: function exports(a) {
              var b = q[a];return "undefined" != typeof b ? b : q[a] = {};
            }, module: function module(a) {
              return { id: a, uri: "", exports: q[a], config: l(a) };
            } }, m = function m(a, c, d, f) {
            var h,
                k,
                l,
                m,
                n,
                s,
                u = [],
                v = typeof d === "undefined" ? "undefined" : _typeof(d);if (f = f || a, "undefined" === v || "function" === v) {
              for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1) {
                if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(a);else if ("exports" === k) u[n] = p.exports(a), s = !0;else if ("module" === k) h = u[n] = p.module(a);else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);else {
                  if (!m.p) throw new Error(a + " missing " + k);m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k];
                }
              }l = d ? d.apply(q[a], u) : void 0, a && (h && h.exports !== b && h.exports !== q[a] ? q[a] = h.exports : l === b && s || (q[a] = l));
            } else a && (q[a] = d);
          }, a = c = _n = function n(a, c, d, e, f) {
            if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f);if (!a.splice) {
              if (s = a, s.deps && _n(s.deps, s.callback), !c) return;c.splice ? (a = c, c = d, d = null) : a = b;
            }return c = c || function () {}, "function" == typeof d && (d = e, e = f), e ? m(b, a, c, d) : setTimeout(function () {
              m(b, a, c, d);
            }, 4), _n;
          }, _n.config = function (a) {
            return _n(a);
          }, a._defined = q, d = function d(a, b, c) {
            if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c]);
          }, d.amd = { jQuery: !0 };
        }(), b.requirejs = a, b.require = c, b.define = d;
      }
    }(), b.define("almond", function () {}), b.define("jquery", [], function () {
      var b = a || $;return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b;
    }), b.define("select2/utils", ["jquery"], function (a) {
      function b(a) {
        var b = a.prototype,
            c = [];for (var d in b) {
          var e = b[d];"function" == typeof e && "constructor" !== d && c.push(d);
        }return c;
      }var c = {};c.Extend = function (a, b) {
        function c() {
          this.constructor = a;
        }var d = {}.hasOwnProperty;for (var e in b) {
          d.call(b, e) && (a[e] = b[e]);
        }return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
      }, c.Decorate = function (a, c) {
        function d() {
          var b = Array.prototype.unshift,
              d = c.prototype.constructor.length,
              e = a.prototype.constructor;d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments);
        }function e() {
          this.constructor = d;
        }var f = b(c),
            g = b(a);c.displayName = a.displayName, d.prototype = new e();for (var h = 0; h < g.length; h++) {
          var i = g[h];d.prototype[i] = a.prototype[i];
        }for (var j = function j(a) {
          var b = function b() {};(a in d.prototype) && (b = d.prototype[a]);var e = c.prototype[a];return function () {
            var a = Array.prototype.unshift;return a.call(arguments, b), e.apply(this, arguments);
          };
        }, k = 0; k < f.length; k++) {
          var l = f[k];d.prototype[l] = j(l);
        }return d;
      };var d = function d() {
        this.listeners = {};
      };return d.prototype.on = function (a, b) {
        this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b];
      }, d.prototype.trigger = function (a) {
        var b = Array.prototype.slice,
            c = b.call(arguments, 1);this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
      }, d.prototype.invoke = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
          a[c].apply(this, b);
        }
      }, c.Observable = d, c.generateChars = function (a) {
        for (var b = "", c = 0; a > c; c++) {
          var d = Math.floor(36 * Math.random());b += d.toString(36);
        }return b;
      }, c.bind = function (a, b) {
        return function () {
          a.apply(b, arguments);
        };
      }, c._convertData = function (a) {
        for (var b in a) {
          var c = b.split("-"),
              d = a;if (1 !== c.length) {
            for (var e = 0; e < c.length; e++) {
              var f = c[e];f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f];
            }delete a[b];
          }
        }return a;
      }, c.hasScroll = function (b, c) {
        var d = a(c),
            e = c.style.overflowX,
            f = c.style.overflowY;return e !== f || "hidden" !== f && "visible" !== f ? "scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth : !1;
      }, c.escapeMarkup = function (a) {
        var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) {
          return b[a];
        });
      }, c.appendMany = function (b, c) {
        if ("1.7" === a.fn.jquery.substr(0, 3)) {
          var d = a();a.map(c, function (a) {
            d = d.add(a);
          }), c = d;
        }b.append(c);
      }, c;
    }), b.define("select2/results", ["jquery", "./utils"], function (a, b) {
      function c(a, b, d) {
        this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this);
      }return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b;
      }, c.prototype.clear = function () {
        this.$results.empty();
      }, c.prototype.displayMessage = function (b) {
        var c = this.options.get("escapeMarkup");this.clear(), this.hideLoading();var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
            e = this.options.get("translations").get(b.message);d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d);
      }, c.prototype.hideMessages = function () {
        this.$results.find(".select2-results__message").remove();
      }, c.prototype.append = function (a) {
        this.hideLoading();var b = [];if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }));a.results = this.sort(a.results);for (var c = 0; c < a.results.length; c++) {
          var d = a.results[c],
              e = this.option(d);b.push(e);
        }this.$results.append(b);
      }, c.prototype.position = function (a, b) {
        var c = b.find(".select2-results");c.append(a);
      }, c.prototype.sort = function (a) {
        var b = this.options.get("sorter");return b(a);
      }, c.prototype.highlightFirstItem = function () {
        var a = this.$results.find(".select2-results__option[aria-selected]"),
            b = a.filter("[aria-selected=true]");b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible();
      }, c.prototype.setClasses = function () {
        var b = this;this.data.current(function (c) {
          var d = a.map(c, function (a) {
            return a.id.toString();
          }),
              e = b.$results.find(".select2-results__option[aria-selected]");e.each(function () {
            var b = a(this),
                c = a.data(this, "data"),
                e = "" + c.id;null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false");
          });
        });
      }, c.prototype.showLoading = function (a) {
        this.hideLoading();var b = this.options.get("translations").get("searching"),
            c = { disabled: !0, loading: !0, text: b(a) },
            d = this.option(c);d.className += " loading-results", this.$results.prepend(d);
      }, c.prototype.hideLoading = function () {
        this.$results.find(".loading-results").remove();
      }, c.prototype.option = function (b) {
        var c = document.createElement("li");c.className = "select2-results__option";var d = { role: "treeitem", "aria-selected": "false" };b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]);for (var e in d) {
          var f = d[e];c.setAttribute(e, f);
        }if (b.children) {
          var g = a(c),
              h = document.createElement("strong");h.className = "select2-results__group";a(h);this.template(b, h);for (var i = [], j = 0; j < b.children.length; j++) {
            var k = b.children[j],
                l = this.option(k);i.push(l);
          }var m = a("<ul></ul>", { "class": "select2-results__options select2-results__options--nested" });m.append(i), g.append(h), g.append(m);
        } else this.template(b, c);return a.data(c, "data", b), c;
      }, c.prototype.bind = function (b, c) {
        var d = this,
            e = b.id + "-results";this.$results.attr("id", e), b.on("results:all", function (a) {
          d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem());
        }), b.on("results:append", function (a) {
          d.append(a.data), b.isOpen() && d.setClasses();
        }), b.on("query", function (a) {
          d.hideMessages(), d.showLoading(a);
        }), b.on("select", function () {
          b.isOpen() && (d.setClasses(), d.highlightFirstItem());
        }), b.on("unselect", function () {
          b.isOpen() && (d.setClasses(), d.highlightFirstItem());
        }), b.on("open", function () {
          d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible();
        }), b.on("close", function () {
          d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant");
        }), b.on("results:toggle", function () {
          var a = d.getHighlightedResults();0 !== a.length && a.trigger("mouseup");
        }), b.on("results:select", function () {
          var a = d.getHighlightedResults();if (0 !== a.length) {
            var b = a.data("data");"true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b });
          }
        }), b.on("results:previous", function () {
          var a = d.getHighlightedResults(),
              b = d.$results.find("[aria-selected]"),
              c = b.index(a);if (0 !== c) {
            var e = c - 1;0 === a.length && (e = 0);var f = b.eq(e);f.trigger("mouseenter");var g = d.$results.offset().top,
                h = f.offset().top,
                i = d.$results.scrollTop() + (h - g);0 === e ? d.$results.scrollTop(0) : 0 > h - g && d.$results.scrollTop(i);
          }
        }), b.on("results:next", function () {
          var a = d.getHighlightedResults(),
              b = d.$results.find("[aria-selected]"),
              c = b.index(a),
              e = c + 1;if (!(e >= b.length)) {
            var f = b.eq(e);f.trigger("mouseenter");var g = d.$results.offset().top + d.$results.outerHeight(!1),
                h = f.offset().top + f.outerHeight(!1),
                i = d.$results.scrollTop() + h - g;0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i);
          }
        }), b.on("results:focus", function (a) {
          a.element.addClass("select2-results__option--highlighted");
        }), b.on("results:message", function (a) {
          d.displayMessage(a);
        }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) {
          var b = d.$results.scrollTop(),
              c = d.$results.get(0).scrollHeight - b + a.deltaY,
              e = a.deltaY > 0 && b - a.deltaY <= 0,
              f = a.deltaY < 0 && c <= d.$results.height();e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation());
        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) {
          var c = a(this),
              e = c.data("data");return "true" === c.attr("aria-selected") ? void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {})) : void d.trigger("select", { originalEvent: b, data: e });
        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) {
          var c = a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) });
        });
      }, c.prototype.getHighlightedResults = function () {
        var a = this.$results.find(".select2-results__option--highlighted");return a;
      }, c.prototype.destroy = function () {
        this.$results.remove();
      }, c.prototype.ensureHighlightVisible = function () {
        var a = this.getHighlightedResults();if (0 !== a.length) {
          var b = this.$results.find("[aria-selected]"),
              c = b.index(a),
              d = this.$results.offset().top,
              e = a.offset().top,
              f = this.$results.scrollTop() + (e - d),
              g = e - d;f -= 2 * a.outerHeight(!1), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f);
        }
      }, c.prototype.template = function (b, c) {
        var d = this.options.get("templateResult"),
            e = this.options.get("escapeMarkup"),
            f = d(b, c);null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f);
      }, c;
    }), b.define("select2/keys", [], function () {
      var a = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };return a;
    }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }return b.Extend(d, b.Observable), d.prototype.render = function () {
        var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b;
      }, d.prototype.bind = function (a, b) {
        var d = this,
            e = (a.id + "-container", a.id + "-results");this.container = a, this.$selection.on("focus", function (a) {
          d.trigger("focus", a);
        }), this.$selection.on("blur", function (a) {
          d._handleBlur(a);
        }), this.$selection.on("keydown", function (a) {
          d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
        }), a.on("results:focus", function (a) {
          d.$selection.attr("aria-activedescendant", a.data._resultId);
        }), a.on("selection:update", function (a) {
          d.update(a.data);
        }), a.on("open", function () {
          d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a);
        }), a.on("close", function () {
          d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a);
        }), a.on("enable", function () {
          d.$selection.attr("tabindex", d._tabindex);
        }), a.on("disable", function () {
          d.$selection.attr("tabindex", "-1");
        });
      }, d.prototype._handleBlur = function (b) {
        var c = this;window.setTimeout(function () {
          document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b);
        }, 1);
      }, d.prototype._attachCloseHandler = function (b) {
        a(document.body).on("mousedown.select2." + b.id, function (b) {
          var c = a(b.target),
              d = c.closest(".select2"),
              e = a(".select2.select2-container--open");e.each(function () {
            var b = a(this);if (this != d[0]) {
              var c = b.data("element");c.select2("close");
            }
          });
        });
      }, d.prototype._detachCloseHandler = function (b) {
        a(document.body).off("mousedown.select2." + b.id);
      }, d.prototype.position = function (a, b) {
        var c = b.find(".selection");c.append(a);
      }, d.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      }, d.prototype.update = function (a) {
        throw new Error("The `update` method must be defined in child classes.");
      }, d;
    }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) {
      function e() {
        e.__super__.constructor.apply(this, arguments);
      }return c.Extend(e, b), e.prototype.render = function () {
        var a = e.__super__.render.call(this);return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
      }, e.prototype.bind = function (a, b) {
        var c = this;e.__super__.bind.apply(this, arguments);var d = a.id + "-container";this.$selection.find(".select2-selection__rendered").attr("id", d), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function (a) {
          1 === a.which && c.trigger("toggle", { originalEvent: a });
        }), this.$selection.on("focus", function (a) {}), this.$selection.on("blur", function (a) {}), a.on("focus", function (b) {
          a.isOpen() || c.$selection.focus();
        }), a.on("selection:update", function (a) {
          c.update(a.data);
        });
      }, e.prototype.clear = function () {
        this.$selection.find(".select2-selection__rendered").empty();
      }, e.prototype.display = function (a, b) {
        var c = this.options.get("templateSelection"),
            d = this.options.get("escapeMarkup");return d(c(a, b));
      }, e.prototype.selectionContainer = function () {
        return a("<span></span>");
      }, e.prototype.update = function (a) {
        if (0 === a.length) return void this.clear();var b = a[0],
            c = this.$selection.find(".select2-selection__rendered"),
            d = this.display(b, c);c.empty().append(d), c.prop("title", b.title || b.text);
      }, e;
    }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
      function d(a, b) {
        d.__super__.constructor.apply(this, arguments);
      }return c.Extend(d, b), d.prototype.render = function () {
        var a = d.__super__.render.call(this);return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
      }, d.prototype.bind = function (b, c) {
        var e = this;d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) {
          e.trigger("toggle", { originalEvent: a });
        }), this.$selection.on("click", ".select2-selection__choice__remove", function (b) {
          if (!e.options.get("disabled")) {
            var c = a(this),
                d = c.parent(),
                f = d.data("data");e.trigger("unselect", { originalEvent: b, data: f });
          }
        });
      }, d.prototype.clear = function () {
        this.$selection.find(".select2-selection__rendered").empty();
      }, d.prototype.display = function (a, b) {
        var c = this.options.get("templateSelection"),
            d = this.options.get("escapeMarkup");return d(c(a, b));
      }, d.prototype.selectionContainer = function () {
        var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b;
      }, d.prototype.update = function (a) {
        if (this.clear(), 0 !== a.length) {
          for (var b = [], d = 0; d < a.length; d++) {
            var e = a[d],
                f = this.selectionContainer(),
                g = this.display(e, f);f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f);
          }var h = this.$selection.find(".select2-selection__rendered");c.appendMany(h, b);
        }
      }, d;
    }), b.define("select2/selection/placeholder", ["../utils"], function (a) {
      function b(a, b, c) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c);
      }return b.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = { id: "", text: b }), b;
      }, b.prototype.createPlaceholder = function (a, b) {
        var c = this.selectionContainer();return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
      }, b.prototype.update = function (a, b) {
        var c = 1 == b.length && b[0].id != this.placeholder.id,
            d = b.length > 1;if (d || c) return a.call(this, b);this.clear();var e = this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e);
      }, b;
    }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) {
      function c() {}return c.prototype.bind = function (a, b, c) {
        var d = this;a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
          d._handleClear(a);
        }), b.on("keypress", function (a) {
          d._handleKeyboardClear(a, b);
        });
      }, c.prototype._handleClear = function (a, b) {
        if (!this.options.get("disabled")) {
          var c = this.$selection.find(".select2-selection__clear");if (0 !== c.length) {
            b.stopPropagation();for (var d = c.data("data"), e = 0; e < d.length; e++) {
              var f = { data: d[e] };if (this.trigger("unselect", f), f.prevented) return;
            }this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
          }
        }
      }, c.prototype._handleKeyboardClear = function (a, c, d) {
        d.isOpen() || (c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c);
      }, c.prototype.update = function (b, c) {
        if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) {
          var d = a('<span class="select2-selection__clear">&times;</span>');d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d);
        }
      }, c;
    }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b, c) {
        a.call(this, b, c);
      }return d.prototype.render = function (b) {
        var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer = c, this.$search = c.find("input");var d = b.call(this);return this._transferTabIndex(), d;
      }, d.prototype.bind = function (a, b, d) {
        var e = this;a.call(this, b, d), b.on("open", function () {
          e.$search.trigger("focus");
        }), b.on("close", function () {
          e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus");
        }), b.on("enable", function () {
          e.$search.prop("disabled", !1), e._transferTabIndex();
        }), b.on("disable", function () {
          e.$search.prop("disabled", !0);
        }), b.on("focus", function (a) {
          e.$search.trigger("focus");
        }), b.on("results:focus", function (a) {
          e.$search.attr("aria-activedescendant", a.id);
        }), this.$selection.on("focusin", ".select2-search--inline", function (a) {
          e.trigger("focus", a);
        }), this.$selection.on("focusout", ".select2-search--inline", function (a) {
          e._handleBlur(a);
        }), this.$selection.on("keydown", ".select2-search--inline", function (a) {
          a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();var b = a.which;if (b === c.BACKSPACE && "" === e.$search.val()) {
            var d = e.$searchContainer.prev(".select2-selection__choice");if (d.length > 0) {
              var f = d.data("data");e.searchRemoveChoice(f), a.preventDefault();
            }
          }
        });var f = document.documentMode,
            g = f && 11 >= f;this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) {
          return g ? void e.$selection.off("input.search input.searchcheck") : void e.$selection.off("keyup.search");
        }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) {
          if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck");var b = a.which;b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && e.handleSearch(a);
        });
      }, d.prototype._transferTabIndex = function (a) {
        this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
      }, d.prototype.createPlaceholder = function (a, b) {
        this.$search.attr("placeholder", b.text);
      }, d.prototype.update = function (a, b) {
        var c = this.$search[0] == document.activeElement;this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus();
      }, d.prototype.handleSearch = function () {
        if (this.resizeSearch(), !this._keyUpPrevented) {
          var a = this.$search.val();this.trigger("query", { term: a });
        }this._keyUpPrevented = !1;
      }, d.prototype.searchRemoveChoice = function (a, b) {
        this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch();
      }, d.prototype.resizeSearch = function () {
        this.$search.css("width", "25px");var a = "";if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();else {
          var b = this.$search.val().length + 1;a = .75 * b + "em";
        }this.$search.css("width", a);
      }, d;
    }), b.define("select2/selection/eventRelay", ["jquery"], function (a) {
      function b() {}return b.prototype.bind = function (b, c, d) {
        var e = this,
            f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
            g = ["opening", "closing", "selecting", "unselecting"];b.call(this, c, d), c.on("*", function (b, c) {
          if (-1 !== a.inArray(b, f)) {
            c = c || {};var d = a.Event("select2:" + b, { params: c });e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
          }
        });
      }, b;
    }), b.define("select2/translation", ["jquery", "require"], function (a, b) {
      function c(a) {
        this.dict = a || {};
      }return c.prototype.all = function () {
        return this.dict;
      }, c.prototype.get = function (a) {
        return this.dict[a];
      }, c.prototype.extend = function (b) {
        this.dict = a.extend({}, b.all(), this.dict);
      }, c._cache = {}, c.loadPath = function (a) {
        if (!(a in c._cache)) {
          var d = b(a);c._cache[a] = d;
        }return new c(c._cache[a]);
      }, c;
    }), b.define("select2/diacritics", [], function () {
      var a = { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" };return a;
    }), b.define("select2/data/base", ["../utils"], function (a) {
      function b(a, c) {
        b.__super__.constructor.call(this);
      }return a.Extend(b, a.Observable), b.prototype.current = function (a) {
        throw new Error("The `current` method must be defined in child classes.");
      }, b.prototype.query = function (a, b) {
        throw new Error("The `query` method must be defined in child classes.");
      }, b.prototype.bind = function (a, b) {}, b.prototype.destroy = function () {}, b.prototype.generateResultId = function (b, c) {
        var d = b.id + "-result-";return d += a.generateChars(4), d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4);
      }, b;
    }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }return b.Extend(d, a), d.prototype.current = function (a) {
        var b = [],
            d = this;this.$element.find(":selected").each(function () {
          var a = c(this),
              e = d.item(a);b.push(e);
        }), a(b);
      }, d.prototype.select = function (a) {
        var b = this;if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
        if (this.$element.prop("multiple")) this.current(function (d) {
          var e = [];a = [a], a.push.apply(a, d);for (var f = 0; f < a.length; f++) {
            var g = a[f].id;-1 === c.inArray(g, e) && e.push(g);
          }b.$element.val(e), b.$element.trigger("change");
        });else {
          var d = a.id;this.$element.val(d), this.$element.trigger("change");
        }
      }, d.prototype.unselect = function (a) {
        var b = this;if (this.$element.prop("multiple")) return a.selected = !1, c(a.element).is("option") ? (a.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (d) {
          for (var e = [], f = 0; f < d.length; f++) {
            var g = d[f].id;g !== a.id && -1 === c.inArray(g, e) && e.push(g);
          }b.$element.val(e), b.$element.trigger("change");
        });
      }, d.prototype.bind = function (a, b) {
        var c = this;this.container = a, a.on("select", function (a) {
          c.select(a.data);
        }), a.on("unselect", function (a) {
          c.unselect(a.data);
        });
      }, d.prototype.destroy = function () {
        this.$element.find("*").each(function () {
          c.removeData(this, "data");
        });
      }, d.prototype.query = function (a, b) {
        var d = [],
            e = this,
            f = this.$element.children();f.each(function () {
          var b = c(this);if (b.is("option") || b.is("optgroup")) {
            var f = e.item(b),
                g = e.matches(a, f);null !== g && d.push(g);
          }
        }), b({ results: d });
      }, d.prototype.addOptions = function (a) {
        b.appendMany(this.$element, a);
      }, d.prototype.option = function (a) {
        var b;a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title);var d = c(b),
            e = this._normalizeItem(a);return e.element = b, c.data(b, "data", e), d;
      }, d.prototype.item = function (a) {
        var b = {};if (b = c.data(a[0], "data"), null != b) return b;if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") };else if (a.is("optgroup")) {
          b = { text: a.prop("label"), children: [], title: a.prop("title") };for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
            var g = c(d[f]),
                h = this.item(g);e.push(h);
          }b.children = e;
        }return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b;
      }, d.prototype._normalizeItem = function (a) {
        c.isPlainObject(a) || (a = { id: a, text: a }), a = c.extend({}, { text: "" }, a);var b = { selected: !1, disabled: !1 };return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a);
      }, d.prototype.matches = function (a, b) {
        var c = this.options.get("matcher");return c(a, b);
      }, d;
    }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        var c = b.get("data") || [];d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
      }return b.Extend(d, a), d.prototype.select = function (a) {
        var b = this.$element.find("option").filter(function (b, c) {
          return c.value == a.id.toString();
        });0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a);
      }, d.prototype.convertToOptions = function (a) {
        function d(a) {
          return function () {
            return c(this).val() == a.id;
          };
        }for (var e = this, f = this.$element.find("option"), g = f.map(function () {
          return e.item(c(this)).id;
        }).get(), h = [], i = 0; i < a.length; i++) {
          var j = this._normalizeItem(a[i]);if (c.inArray(j.id, g) >= 0) {
            var k = f.filter(d(j)),
                l = this.item(k),
                m = c.extend(!0, {}, j, l),
                n = this.option(m);k.replaceWith(n);
          } else {
            var o = this.option(j);if (j.children) {
              var p = this.convertToOptions(j.children);b.appendMany(o, p);
            }h.push(o);
          }
        }return h;
      }, d;
    }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b);
      }return b.Extend(d, a), d.prototype._applyDefaults = function (a) {
        var b = { data: function data(a) {
            return c.extend({}, a, { q: a.term });
          }, transport: function transport(a, b, d) {
            var e = c.ajax(a);return e.then(b), e.fail(d), e;
          } };return c.extend({}, b, a, !0);
      }, d.prototype.processResults = function (a) {
        return a;
      }, d.prototype.query = function (a, b) {
        function d() {
          var d = f.transport(f, function (d) {
            var f = e.processResults(d, a);e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f);
          }, function () {
            d.status && "0" === d.status || e.trigger("results:message", { message: "errorLoading" });
          });e._request = d;
        }var e = this;null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);var f = c.extend({ type: "GET" }, this.ajaxOptions);"function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d();
      }, d;
    }), b.define("select2/data/tags", ["jquery"], function (a) {
      function b(b, c, d) {
        var e = d.get("tags"),
            f = d.get("createTag");void 0 !== f && (this.createTag = f);var g = d.get("insertTag");if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)) for (var h = 0; h < e.length; h++) {
          var i = e[h],
              j = this._normalizeItem(i),
              k = this.option(j);this.$element.append(k);
        }
      }return b.prototype.query = function (a, b, c) {
        function d(a, f) {
          for (var g = a.results, h = 0; h < g.length; h++) {
            var i = g[h],
                j = null != i.children && !d({ results: i.children }, !0),
                k = i.text === b.term;if (k || j) return f ? !1 : (a.data = g, void c(a));
          }if (f) return !0;var l = e.createTag(b);if (null != l) {
            var m = e.option(l);m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l);
          }a.results = g, c(a);
        }var e = this;return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d);
      }, b.prototype.createTag = function (b, c) {
        var d = a.trim(c.term);return "" === d ? null : { id: d, text: d };
      }, b.prototype.insertTag = function (a, b, c) {
        b.unshift(c);
      }, b.prototype._removeOldTags = function (b) {
        var c = (this._lastTag, this.$element.find("option[data-select2-tag]"));c.each(function () {
          this.selected || a(this).remove();
        });
      }, b;
    }), b.define("select2/data/tokenizer", ["jquery"], function (a) {
      function b(a, b, c) {
        var d = c.get("tokenizer");void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
      }return b.prototype.bind = function (a, b, c) {
        a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field");
      }, b.prototype.query = function (b, c, d) {
        function e(b) {
          var c = g._normalizeItem(b),
              d = g.$element.find("option").filter(function () {
            return a(this).val() === c.id;
          });if (!d.length) {
            var e = g.option(c);e.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([e]);
          }f(c);
        }function f(a) {
          g.trigger("select", { data: a });
        }var g = this;c.term = c.term || "";var h = this.tokenizer(c, this.options, e);h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d);
      }, b.prototype.tokenizer = function (b, c, d, e) {
        for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) {
          return { id: a.term, text: a.term };
        }; h < g.length;) {
          var j = g[h];if (-1 !== a.inArray(j, f)) {
            var k = g.substr(0, h),
                l = a.extend({}, c, { term: k }),
                m = i(l);null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++;
          } else h++;
        }return { term: g };
      }, b;
    }), b.define("select2/data/minimumInputLength", [], function () {
      function a(a, b, c) {
        this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c);
      }return a.prototype.query = function (a, b, c) {
        return b.term = b.term || "", b.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } }) : void a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumInputLength", [], function () {
      function a(a, b, c) {
        this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c);
      }return a.prototype.query = function (a, b, c) {
        return b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } }) : void a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumSelectionLength", [], function () {
      function a(a, b, c) {
        this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c);
      }return a.prototype.query = function (a, b, c) {
        var d = this;this.current(function (e) {
          var f = null != e ? e.length : 0;return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } }) : void a.call(d, b, c);
        });
      }, a;
    }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
      function c(a, b) {
        this.$element = a, this.options = b, c.__super__.constructor.call(this);
      }return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b;
      }, c.prototype.bind = function () {}, c.prototype.position = function (a, b) {}, c.prototype.destroy = function () {
        this.$dropdown.remove();
      }, c;
    }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) {
      function c() {}return c.prototype.render = function (b) {
        var c = b.call(this),
            d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c;
      }, c.prototype.bind = function (b, c, d) {
        var e = this;b.call(this, c, d), this.$search.on("keydown", function (a) {
          e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
        }), this.$search.on("input", function (b) {
          a(this).off("keyup");
        }), this.$search.on("keyup input", function (a) {
          e.handleSearch(a);
        }), c.on("open", function () {
          e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () {
            e.$search.focus();
          }, 0);
        }), c.on("close", function () {
          e.$search.attr("tabindex", -1), e.$search.val("");
        }), c.on("focus", function () {
          c.isOpen() && e.$search.focus();
        }), c.on("results:all", function (a) {
          if (null == a.query.term || "" === a.query.term) {
            var b = e.showSearch(a);b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
          }
        });
      }, c.prototype.handleSearch = function (a) {
        if (!this._keyUpPrevented) {
          var b = this.$search.val();this.trigger("query", { term: b });
        }this._keyUpPrevented = !1;
      }, c.prototype.showSearch = function (a, b) {
        return !0;
      }, c;
    }), b.define("select2/dropdown/hidePlaceholder", [], function () {
      function a(a, b, c, d) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d);
      }return a.prototype.append = function (a, b) {
        b.results = this.removePlaceholder(b.results), a.call(this, b);
      }, a.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = { id: "", text: b }), b;
      }, a.prototype.removePlaceholder = function (a, b) {
        for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
          var e = b[d];this.placeholder.id === e.id && c.splice(d, 1);
        }return c;
      }, a;
    }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
      function b(a, b, c, d) {
        this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1;
      }return b.prototype.append = function (a, b) {
        this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
      }, b.prototype.bind = function (b, c, d) {
        var e = this;b.call(this, c, d), c.on("query", function (a) {
          e.lastParams = a, e.loading = !0;
        }), c.on("query:append", function (a) {
          e.lastParams = a, e.loading = !0;
        }), this.$results.on("scroll", function () {
          var b = a.contains(document.documentElement, e.$loadingMore[0]);if (!e.loading && b) {
            var c = e.$results.offset().top + e.$results.outerHeight(!1),
                d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1);c + 50 >= d && e.loadMore();
          }
        });
      }, b.prototype.loadMore = function () {
        this.loading = !0;var b = a.extend({}, { page: 1 }, this.lastParams);b.page++, this.trigger("query:append", b);
      }, b.prototype.showLoadingMore = function (a, b) {
        return b.pagination && b.pagination.more;
      }, b.prototype.createLoadingMore = function () {
        var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
            c = this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)), b;
      }, b;
    }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
      function c(b, c, d) {
        this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d);
      }return c.prototype.bind = function (a, b, c) {
        var d = this,
            e = !1;a.call(this, b, c), b.on("open", function () {
          d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () {
            d._positionDropdown(), d._resizeDropdown();
          }), b.on("results:append", function () {
            d._positionDropdown(), d._resizeDropdown();
          }));
        }), b.on("close", function () {
          d._hideDropdown(), d._detachPositioningHandler(b);
        }), this.$dropdownContainer.on("mousedown", function (a) {
          a.stopPropagation();
        });
      }, c.prototype.destroy = function (a) {
        a.call(this), this.$dropdownContainer.remove();
      }, c.prototype.position = function (a, b, c) {
        b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), this.$container = c;
      }, c.prototype.render = function (b) {
        var c = a("<span></span>"),
            d = b.call(this);return c.append(d), this.$dropdownContainer = c, c;
      }, c.prototype._hideDropdown = function (a) {
        this.$dropdownContainer.detach();
      }, c.prototype._attachPositioningHandler = function (c, d) {
        var e = this,
            f = "scroll.select2." + d.id,
            g = "resize.select2." + d.id,
            h = "orientationchange.select2." + d.id,
            i = this.$container.parents().filter(b.hasScroll);i.each(function () {
          a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() });
        }), i.on(f, function (b) {
          var c = a(this).data("select2-scroll-position");a(this).scrollTop(c.y);
        }), a(window).on(f + " " + g + " " + h, function (a) {
          e._positionDropdown(), e._resizeDropdown();
        });
      }, c.prototype._detachPositioningHandler = function (c, d) {
        var e = "scroll.select2." + d.id,
            f = "resize.select2." + d.id,
            g = "orientationchange.select2." + d.id,
            h = this.$container.parents().filter(b.hasScroll);h.off(e), a(window).off(e + " " + f + " " + g);
      }, c.prototype._positionDropdown = function () {
        var b = a(window),
            c = this.$dropdown.hasClass("select2-dropdown--above"),
            d = this.$dropdown.hasClass("select2-dropdown--below"),
            e = null,
            f = this.$container.offset();f.bottom = f.top + this.$container.outerHeight(!1);var g = { height: this.$container.outerHeight(!1) };g.top = f.top, g.bottom = f.top + g.height;var h = { height: this.$dropdown.outerHeight(!1) },
            i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() },
            j = i.top < f.top - h.height,
            k = i.bottom > f.bottom + h.height,
            l = { left: f.left, top: g.bottom },
            m = this.$dropdownParent;"static" === m.css("position") && (m = m.offsetParent());var n = m.offset();l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l);
      }, c.prototype._resizeDropdown = function () {
        var a = { width: this.$container.outerWidth(!1) + "px" };this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a);
      }, c.prototype._showDropdown = function (a) {
        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
      }, c;
    }), b.define("select2/dropdown/minimumResultsForSearch", [], function () {
      function a(b) {
        for (var c = 0, d = 0; d < b.length; d++) {
          var e = b[d];e.children ? c += a(e.children) : c++;
        }return c;
      }function b(a, b, c, d) {
        this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
      }return b.prototype.showSearch = function (b, c) {
        return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c);
      }, b;
    }), b.define("select2/dropdown/selectOnClose", [], function () {
      function a() {}return a.prototype.bind = function (a, b, c) {
        var d = this;a.call(this, b, c), b.on("close", function (a) {
          d._handleSelectOnClose(a);
        });
      }, a.prototype._handleSelectOnClose = function (a, b) {
        if (b && null != b.originalSelect2Event) {
          var c = b.originalSelect2Event;if ("select" === c._type || "unselect" === c._type) return;
        }var d = this.getHighlightedResults();if (!(d.length < 1)) {
          var e = d.data("data");null != e.element && e.element.selected || null == e.element && e.selected || this.trigger("select", { data: e });
        }
      }, a;
    }), b.define("select2/dropdown/closeOnSelect", [], function () {
      function a() {}return a.prototype.bind = function (a, b, c) {
        var d = this;a.call(this, b, c), b.on("select", function (a) {
          d._selectTriggered(a);
        }), b.on("unselect", function (a) {
          d._selectTriggered(a);
        });
      }, a.prototype._selectTriggered = function (a, b) {
        var c = b.originalEvent;c && c.ctrlKey || this.trigger("close", { originalEvent: c, originalSelect2Event: b });
      }, a;
    }), b.define("select2/i18n/en", [], function () {
      return { errorLoading: function errorLoading() {
          return "The results could not be loaded.";
        }, inputTooLong: function inputTooLong(a) {
          var b = a.input.length - a.maximum,
              c = "Please delete " + b + " character";return 1 != b && (c += "s"), c;
        }, inputTooShort: function inputTooShort(a) {
          var b = a.minimum - a.input.length,
              c = "Please enter " + b + " or more characters";return c;
        }, loadingMore: function loadingMore() {
          return "Loading more results…";
        }, maximumSelected: function maximumSelected(a) {
          var b = "You can only select " + a.maximum + " item";return 1 != a.maximum && (b += "s"), b;
        }, noResults: function noResults() {
          return "No results found";
        }, searching: function searching() {
          return "Searching…";
        } };
    }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
      function D() {
        this.reset();
      }D.prototype.apply = function (l) {
        if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) {
          if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
            var C = b(l.amdBase + "compat/query");l.dataAdapter = j.Decorate(l.dataAdapter, C);
          }if (null != l.initSelection) {
            var D = b(l.amdBase + "compat/initSelection");l.dataAdapter = j.Decorate(l.dataAdapter, D);
          }
        }if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
          if (l.multiple) l.dropdownAdapter = u;else {
            var E = j.Decorate(u, v);l.dropdownAdapter = E;
          }if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
            var F = b(l.amdBase + "compat/dropdownCss");l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
          }l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
        }if (null == l.selectionAdapter) {
          if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
            var G = b(l.amdBase + "compat/containerCss");l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
          }l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
        }if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) {
          var H = l.language.split("-"),
              I = H[0];l.language = [l.language, I];
        } else l.language = [l.language];if (a.isArray(l.language)) {
          var J = new k();l.language.push("en");for (var K = l.language, L = 0; L < K.length; L++) {
            var M = K[L],
                N = {};try {
              N = k.loadPath(M);
            } catch (O) {
              try {
                M = this.defaults.amdLanguageBase + M, N = k.loadPath(M);
              } catch (P) {
                l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');continue;
              }
            }J.extend(N);
          }l.translations = J;
        } else {
          var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
              R = new k(l.language);R.extend(Q), l.translations = R;
        }return l;
      }, D.prototype.reset = function () {
        function b(a) {
          function b(a) {
            return l[a] || a;
          }return a.replace(/[^\u0000-\u007E]/g, b);
        }function c(d, e) {
          if ("" === a.trim(d.term)) return e;if (e.children && e.children.length > 0) {
            for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
              var h = e.children[g],
                  i = c(d, h);null == i && f.children.splice(g, 1);
            }return f.children.length > 0 ? f : c(d, f);
          }var j = b(e.text).toUpperCase(),
              k = b(d.term).toUpperCase();return j.indexOf(k) > -1 ? e : null;
        }this.defaults = { amdBase: "./", amdLanguageBase: "./i18n/", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: j.escapeMarkup, language: C, matcher: c, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, sorter: function sorter(a) {
            return a;
          }, templateResult: function templateResult(a) {
            return a.text;
          }, templateSelection: function templateSelection(a) {
            return a.text;
          }, theme: "default", width: "resolve" };
      }, D.prototype.set = function (b, c) {
        var d = a.camelCase(b),
            e = {};e[d] = c;var f = j._convertData(e);a.extend(this.defaults, f);
      };var E = new D();return E;
    }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
      function e(b, e) {
        if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
          var f = a(this.get("amdBase") + "compat/inputData");this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
        }
      }return e.prototype.fromElement = function (a) {
        var c = ["select2"];null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl")));var e = {};e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();var f = b.extend(!0, {}, e);f = d._convertData(f);for (var g in f) {
          b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);
        }return this;
      }, e.prototype.get = function (a) {
        return this.options[a];
      }, e.prototype.set = function (a, b) {
        this.options[a] = b;
      }, e;
    }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
      var e = function e(a, c) {
        null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this);var d = a.attr("tabindex") || 0;a.data("old-tabindex", d), a.attr("tabindex", "-1");var f = this.options.get("dataAdapter");this.dataAdapter = new f(a, this.options);var g = this.render();this._placeContainer(g);var h = this.options.get("selectionAdapter");this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g);var i = this.options.get("dropdownAdapter");this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g);var j = this.options.get("resultsAdapter");this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);var k = this;this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) {
          k.trigger("selection:update", { data: a });
        }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this);
      };return c.Extend(e, c.Observable), e.prototype._generateId = function (a) {
        var b = "";return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b;
      }, e.prototype._placeContainer = function (a) {
        a.insertAfter(this.$element);var b = this._resolveWidth(this.$element, this.options.get("width"));null != b && a.css("width", b);
      }, e.prototype._resolveWidth = function (a, b) {
        var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if ("resolve" == b) {
          var d = this._resolveWidth(a, "style");return null != d ? d : this._resolveWidth(a, "element");
        }if ("element" == b) {
          var e = a.outerWidth(!1);return 0 >= e ? "auto" : e + "px";
        }if ("style" == b) {
          var f = a.attr("style");if ("string" != typeof f) return null;for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) {
            var j = g[h].replace(/\s/g, ""),
                k = j.match(c);if (null !== k && k.length >= 1) return k[1];
          }return null;
        }return b;
      }, e.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
      }, e.prototype._registerDomEvents = function () {
        var b = this;this.$element.on("change.select2", function () {
          b.dataAdapter.current(function (a) {
            b.trigger("selection:update", { data: a });
          });
        }), this.$element.on("focus.select2", function (a) {
          b.trigger("focus", a);
        }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;null != d ? (this._observer = new d(function (c) {
          a.each(c, b._syncA), a.each(c, b._syncS);
        }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1));
      }, e.prototype._registerDataEvents = function () {
        var a = this;this.dataAdapter.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerSelectionEvents = function () {
        var b = this,
            c = ["toggle", "focus"];this.selection.on("toggle", function () {
          b.toggleDropdown();
        }), this.selection.on("focus", function (a) {
          b.focus(a);
        }), this.selection.on("*", function (d, e) {
          -1 === a.inArray(d, c) && b.trigger(d, e);
        });
      }, e.prototype._registerDropdownEvents = function () {
        var a = this;this.dropdown.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerResultsEvents = function () {
        var a = this;this.results.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerEvents = function () {
        var a = this;this.on("open", function () {
          a.$container.addClass("select2-container--open");
        }), this.on("close", function () {
          a.$container.removeClass("select2-container--open");
        }), this.on("enable", function () {
          a.$container.removeClass("select2-container--disabled");
        }), this.on("disable", function () {
          a.$container.addClass("select2-container--disabled");
        }), this.on("blur", function () {
          a.$container.removeClass("select2-container--focus");
        }), this.on("query", function (b) {
          a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function (c) {
            a.trigger("results:all", { data: c, query: b });
          });
        }), this.on("query:append", function (b) {
          this.dataAdapter.query(b, function (c) {
            a.trigger("results:append", { data: c, query: b });
          });
        }), this.on("keypress", function (b) {
          var c = b.which;a.isOpen() ? c === d.ESC || c === d.TAB || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : c === d.ENTER ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault());
        });
      }, e.prototype._syncAttributes = function () {
        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
      }, e.prototype._syncSubtree = function (a, b) {
        var c = !1,
            d = this;if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
          if (b) {
            if (b.addedNodes && b.addedNodes.length > 0) for (var e = 0; e < b.addedNodes.length; e++) {
              var f = b.addedNodes[e];f.selected && (c = !0);
            } else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
          } else c = !0;c && this.dataAdapter.current(function (a) {
            d.trigger("selection:update", { data: a });
          });
        }
      }, e.prototype.trigger = function (a, b) {
        var c = e.__super__.trigger,
            d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };if (void 0 === b && (b = {}), a in d) {
          var f = d[a],
              g = { prevented: !1, name: a, args: b };if (c.call(this, f, g), g.prevented) return void (b.prevented = !0);
        }c.call(this, a, b);
      }, e.prototype.toggleDropdown = function () {
        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
      }, e.prototype.open = function () {
        this.isOpen() || this.trigger("query", {});
      }, e.prototype.close = function () {
        this.isOpen() && this.trigger("close", {});
      }, e.prototype.isOpen = function () {
        return this.$container.hasClass("select2-container--open");
      }, e.prototype.hasFocus = function () {
        return this.$container.hasClass("select2-container--focus");
      }, e.prototype.focus = function (a) {
        this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
      }, e.prototype.enable = function (a) {
        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == a || 0 === a.length) && (a = [!0]);var b = !a[0];this.$element.prop("disabled", b);
      }, e.prototype.data = function () {
        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a = [];return this.dataAdapter.current(function (b) {
          a = b;
        }), a;
      }, e.prototype.val = function (b) {
        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();var c = b[0];a.isArray(c) && (c = a.map(c, function (a) {
          return a.toString();
        })), this.$element.val(c).trigger("change");
      }, e.prototype.destroy = function () {
        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
      }, e.prototype.render = function () {
        var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b;
      }, e;
    }), b.define("jquery-mousewheel", ["jquery"], function (a) {
      return a;
    }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) {
      if (null == a.fn.select2) {
        var e = ["open", "close", "destroy"];a.fn.select2 = function (b) {
          if (b = b || {}, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) return this.each(function () {
            var d = a.extend(!0, {}, b);new c(a(this), d);
          }), this;if ("string" == typeof b) {
            var d,
                f = Array.prototype.slice.call(arguments, 1);return this.each(function () {
              var c = a(this).data("select2");null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = c[b].apply(c, f);
            }), a.inArray(b, e) > -1 ? this : d;
          }throw new Error("Invalid arguments for Select2: " + b);
        };
      }return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
    }), { define: b.define, require: b.require };
  }(),
      c = b.require("jquery.select2");return a.fn.select2.amd = b, c;
});

/***/ }),

/***/ "./resources/assets/js/v1/sweetalert.min.js":
/***/ (function(module, exports, __webpack_require__) {

var require;var require;var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t, n) {
  "use strict";
  !function o(e, t, n) {
    function a(s, l) {
      if (!t[s]) {
        if (!e[s]) {
          var i = "function" == typeof require && require;if (!l && i) return require(s, !0);if (r) return r(s, !0);var u = new Error("Cannot find module '" + s + "'");throw u.code = "MODULE_NOT_FOUND", u;
        }var c = t[s] = { exports: {} };e[s][0].call(c.exports, function (t) {
          var n = e[s][1][t];return a(n ? n : t);
        }, c, c.exports, o, e, t, n);
      }return t[s].exports;
    }for (var r = "function" == typeof require && require, s = 0; s < n.length; s++) {
      a(n[s]);
    }return a;
  }({ 1: [function (o, a, r) {
      var s = function s(e) {
        return e && e.__esModule ? e : { "default": e };
      };Object.defineProperty(r, "__esModule", { value: !0 });var l,
          i,
          u,
          _c,
          d = o("./modules/handle-dom"),
          f = o("./modules/utils"),
          p = o("./modules/handle-swal-dom"),
          m = o("./modules/handle-click"),
          v = o("./modules/handle-key"),
          y = s(v),
          h = o("./modules/default-params"),
          b = s(h),
          g = o("./modules/set-params"),
          w = s(g);r["default"] = u = _c = function c() {
        function o(e) {
          var t = a;return t[e] === n ? b["default"][e] : t[e];
        }var a = arguments[0];if (d.addClass(t.body, "stop-scrolling"), p.resetInput(), a === n) return f.logStr("SweetAlert expects at least 1 attribute!"), !1;var r = f.extend({}, b["default"]);switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
            r.title = a, r.text = arguments[1] || "", r.type = arguments[2] || "";break;case "object":
            if (a.title === n) return f.logStr('Missing "title" argument!'), !1;r.title = a.title;for (var s in b["default"]) {
              r[s] = o(s);
            }r.confirmButtonText = r.showCancelButton ? "Confirm" : b["default"].confirmButtonText, r.confirmButtonText = o("confirmButtonText"), r.doneFunction = arguments[1] || null;break;default:
            return f.logStr('Unexpected type of argument! Expected "string" or "object", got ' + (typeof a === "undefined" ? "undefined" : _typeof(a))), !1;}w["default"](r), p.fixVerticalPosition(), p.openModal(arguments[1]);for (var u = p.getModal(), v = u.querySelectorAll("button"), h = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"], g = function g(e) {
          return m.handleButton(e, r, u);
        }, C = 0; C < v.length; C++) {
          for (var S = 0; S < h.length; S++) {
            var x = h[S];v[C][x] = g;
          }
        }p.getOverlay().onclick = g, l = e.onkeydown;var k = function k(e) {
          return y["default"](e, r, u);
        };e.onkeydown = k, e.onfocus = function () {
          setTimeout(function () {
            i !== n && (i.focus(), i = n);
          }, 0);
        }, _c.enableButtons();
      }, u.setDefaults = _c.setDefaults = function (e) {
        if (!e) throw new Error("userParams is required");if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw new Error("userParams has to be a object");f.extend(b["default"], e);
      }, u.close = _c.close = function () {
        var o = p.getModal();d.fadeOut(p.getOverlay(), 5), d.fadeOut(o, 5), d.removeClass(o, "showSweetAlert"), d.addClass(o, "hideSweetAlert"), d.removeClass(o, "visible");var a = o.querySelector(".sa-icon.sa-success");d.removeClass(a, "animate"), d.removeClass(a.querySelector(".sa-tip"), "animateSuccessTip"), d.removeClass(a.querySelector(".sa-long"), "animateSuccessLong");var r = o.querySelector(".sa-icon.sa-error");d.removeClass(r, "animateErrorIcon"), d.removeClass(r.querySelector(".sa-x-mark"), "animateXMark");var s = o.querySelector(".sa-icon.sa-warning");return d.removeClass(s, "pulseWarning"), d.removeClass(s.querySelector(".sa-body"), "pulseWarningIns"), d.removeClass(s.querySelector(".sa-dot"), "pulseWarningIns"), setTimeout(function () {
          var e = o.getAttribute("data-custom-class");d.removeClass(o, e);
        }, 300), d.removeClass(t.body, "stop-scrolling"), e.onkeydown = l, e.previousActiveElement && e.previousActiveElement.focus(), i = n, clearTimeout(o.timeout), !0;
      }, u.showInputError = _c.showInputError = function (e) {
        var t = p.getModal(),
            n = t.querySelector(".sa-input-error");d.addClass(n, "show");var o = t.querySelector(".sa-error-container");d.addClass(o, "show"), o.querySelector("p").innerHTML = e, setTimeout(function () {
          u.enableButtons();
        }, 1), t.querySelector("input").focus();
      }, u.resetInputError = _c.resetInputError = function (e) {
        if (e && 13 === e.keyCode) return !1;var t = p.getModal(),
            n = t.querySelector(".sa-input-error");d.removeClass(n, "show");var o = t.querySelector(".sa-error-container");d.removeClass(o, "show");
      }, u.disableButtons = _c.disableButtons = function () {
        var e = p.getModal(),
            t = e.querySelector("button.confirm"),
            n = e.querySelector("button.cancel");t.disabled = !0, n.disabled = !0;
      }, u.enableButtons = _c.enableButtons = function () {
        var e = p.getModal(),
            t = e.querySelector("button.confirm"),
            n = e.querySelector("button.cancel");t.disabled = !1, n.disabled = !1;
      }, "undefined" != typeof e ? e.sweetAlert = e.swal = u : f.logStr("SweetAlert is a frontend module!"), a.exports = r["default"];
    }, { "./modules/default-params": 2, "./modules/handle-click": 3, "./modules/handle-dom": 4, "./modules/handle-key": 5, "./modules/handle-swal-dom": 6, "./modules/set-params": 8, "./modules/utils": 9 }], 2: [function (e, t, n) {
      Object.defineProperty(n, "__esModule", { value: !0 });var o = { title: "", text: "", type: null, allowOutsideClick: !1, showConfirmButton: !0, showCancelButton: !1, closeOnConfirm: !0, closeOnCancel: !0, confirmButtonText: "OK", confirmButtonColor: "#8CD4F5", cancelButtonText: "Cancel", imageUrl: null, imageSize: null, timer: null, customClass: "", html: !1, animation: !0, allowEscapeKey: !0, inputType: "text", inputPlaceholder: "", inputValue: "", showLoaderOnConfirm: !1 };n["default"] = o, t.exports = n["default"];
    }, {}], 3: [function (t, n, o) {
      Object.defineProperty(o, "__esModule", { value: !0 });var a = t("./utils"),
          r = (t("./handle-swal-dom"), t("./handle-dom")),
          s = function s(t, n, o) {
        function s(e) {
          m && n.confirmButtonColor && (p.style.backgroundColor = e);
        }var u,
            c,
            d,
            f = t || e.event,
            p = f.target || f.srcElement,
            m = -1 !== p.className.indexOf("confirm"),
            v = -1 !== p.className.indexOf("sweet-overlay"),
            y = r.hasClass(o, "visible"),
            h = n.doneFunction && "true" === o.getAttribute("data-has-done-function");switch (m && n.confirmButtonColor && (u = n.confirmButtonColor, c = a.colorLuminance(u, -.04), d = a.colorLuminance(u, -.14)), f.type) {case "mouseover":
            s(c);break;case "mouseout":
            s(u);break;case "mousedown":
            s(d);break;case "mouseup":
            s(c);break;case "focus":
            var b = o.querySelector("button.confirm"),
                g = o.querySelector("button.cancel");m ? g.style.boxShadow = "none" : b.style.boxShadow = "none";break;case "click":
            var w = o === p,
                C = r.isDescendant(o, p);if (!w && !C && y && !n.allowOutsideClick) break;m && h && y ? l(o, n) : h && y || v ? i(o, n) : r.isDescendant(o, p) && "BUTTON" === p.tagName && sweetAlert.close();}
      },
          l = function l(e, t) {
        var n = !0;r.hasClass(e, "show-input") && (n = e.querySelector("input").value, n || (n = "")), t.doneFunction(n), t.closeOnConfirm && sweetAlert.close(), t.showLoaderOnConfirm && sweetAlert.disableButtons();
      },
          i = function i(e, t) {
        var n = String(t.doneFunction).replace(/\s/g, ""),
            o = "function(" === n.substring(0, 9) && ")" !== n.substring(9, 10);o && t.doneFunction(!1), t.closeOnCancel && sweetAlert.close();
      };o["default"] = { handleButton: s, handleConfirm: l, handleCancel: i }, n.exports = o["default"];
    }, { "./handle-dom": 4, "./handle-swal-dom": 6, "./utils": 9 }], 4: [function (n, o, a) {
      Object.defineProperty(a, "__esModule", { value: !0 });var r = function r(e, t) {
        return new RegExp(" " + t + " ").test(" " + e.className + " ");
      },
          s = function s(e, t) {
        r(e, t) || (e.className += " " + t);
      },
          l = function l(e, t) {
        var n = " " + e.className.replace(/[\t\r\n]/g, " ") + " ";if (r(e, t)) {
          for (; n.indexOf(" " + t + " ") >= 0;) {
            n = n.replace(" " + t + " ", " ");
          }e.className = n.replace(/^\s+|\s+$/g, "");
        }
      },
          i = function i(e) {
        var n = t.createElement("div");return n.appendChild(t.createTextNode(e)), n.innerHTML;
      },
          u = function u(e) {
        e.style.opacity = "", e.style.display = "block";
      },
          c = function c(e) {
        if (e && !e.length) return u(e);for (var t = 0; t < e.length; ++t) {
          u(e[t]);
        }
      },
          d = function d(e) {
        e.style.opacity = "", e.style.display = "none";
      },
          f = function f(e) {
        if (e && !e.length) return d(e);for (var t = 0; t < e.length; ++t) {
          d(e[t]);
        }
      },
          p = function p(e, t) {
        for (var n = t.parentNode; null !== n;) {
          if (n === e) return !0;n = n.parentNode;
        }return !1;
      },
          m = function m(e) {
        e.style.left = "-9999px", e.style.display = "block";var t,
            n = e.clientHeight;return t = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(e).getPropertyValue("padding-top"), 10) : parseInt(e.currentStyle.padding), e.style.left = "", e.style.display = "none", "-" + parseInt((n + t) / 2) + "px";
      },
          v = function v(e, t) {
        if (+e.style.opacity < 1) {
          t = t || 16, e.style.opacity = 0, e.style.display = "block";var n = +new Date(),
              o = function (e) {
            function t() {
              return e.apply(this, arguments);
            }return t.toString = function () {
              return e.toString();
            }, t;
          }(function () {
            e.style.opacity = +e.style.opacity + (new Date() - n) / 100, n = +new Date(), +e.style.opacity < 1 && setTimeout(o, t);
          });o();
        }e.style.display = "block";
      },
          y = function y(e, t) {
        t = t || 16, e.style.opacity = 1;var n = +new Date(),
            o = function (e) {
          function t() {
            return e.apply(this, arguments);
          }return t.toString = function () {
            return e.toString();
          }, t;
        }(function () {
          e.style.opacity = +e.style.opacity - (new Date() - n) / 100, n = +new Date(), +e.style.opacity > 0 ? setTimeout(o, t) : e.style.display = "none";
        });o();
      },
          h = function h(n) {
        if ("function" == typeof MouseEvent) {
          var o = new MouseEvent("click", { view: e, bubbles: !1, cancelable: !0 });n.dispatchEvent(o);
        } else if (t.createEvent) {
          var a = t.createEvent("MouseEvents");a.initEvent("click", !1, !1), n.dispatchEvent(a);
        } else t.createEventObject ? n.fireEvent("onclick") : "function" == typeof n.onclick && n.onclick();
      },
          b = function b(t) {
        "function" == typeof t.stopPropagation ? (t.stopPropagation(), t.preventDefault()) : e.event && e.event.hasOwnProperty("cancelBubble") && (e.event.cancelBubble = !0);
      };a.hasClass = r, a.addClass = s, a.removeClass = l, a.escapeHtml = i, a._show = u, a.show = c, a._hide = d, a.hide = f, a.isDescendant = p, a.getTopMargin = m, a.fadeIn = v, a.fadeOut = y, a.fireClick = h, a.stopEventPropagation = b;
    }, {}], 5: [function (t, o, a) {
      Object.defineProperty(a, "__esModule", { value: !0 });var r = t("./handle-dom"),
          s = t("./handle-swal-dom"),
          l = function l(t, o, a) {
        var l = t || e.event,
            i = l.keyCode || l.which,
            u = a.querySelector("button.confirm"),
            c = a.querySelector("button.cancel"),
            d = a.querySelectorAll("button[tabindex]");if (-1 !== [9, 13, 32, 27].indexOf(i)) {
          for (var f = l.target || l.srcElement, p = -1, m = 0; m < d.length; m++) {
            if (f === d[m]) {
              p = m;break;
            }
          }9 === i ? (f = -1 === p ? u : p === d.length - 1 ? d[0] : d[p + 1], r.stopEventPropagation(l), f.focus(), o.confirmButtonColor && s.setFocusStyle(f, o.confirmButtonColor)) : 13 === i ? ("INPUT" === f.tagName && (f = u, u.focus()), f = -1 === p ? u : n) : 27 === i && o.allowEscapeKey === !0 ? (f = c, r.fireClick(f, l)) : f = n;
        }
      };a["default"] = l, o.exports = a["default"];
    }, { "./handle-dom": 4, "./handle-swal-dom": 6 }], 6: [function (n, o, a) {
      var r = function r(e) {
        return e && e.__esModule ? e : { "default": e };
      };Object.defineProperty(a, "__esModule", { value: !0 });var s = n("./utils"),
          l = n("./handle-dom"),
          i = n("./default-params"),
          u = r(i),
          c = n("./injected-html"),
          d = r(c),
          f = ".sweet-alert",
          p = ".sweet-overlay",
          m = function m() {
        var e = t.createElement("div");for (e.innerHTML = d["default"]; e.firstChild;) {
          t.body.appendChild(e.firstChild);
        }
      },
          v = function (e) {
        function t() {
          return e.apply(this, arguments);
        }return t.toString = function () {
          return e.toString();
        }, t;
      }(function () {
        var e = t.querySelector(f);return e || (m(), e = v()), e;
      }),
          y = function y() {
        var e = v();return e ? e.querySelector("input") : void 0;
      },
          h = function h() {
        return t.querySelector(p);
      },
          b = function b(e, t) {
        var n = s.hexToRgb(t);e.style.boxShadow = "0 0 2px rgba(" + n + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)";
      },
          g = function g(n) {
        var o = v();l.fadeIn(h(), 10), l.show(o), l.addClass(o, "showSweetAlert"), l.removeClass(o, "hideSweetAlert"), e.previousActiveElement = t.activeElement;var a = o.querySelector("button.confirm");a.focus(), setTimeout(function () {
          l.addClass(o, "visible");
        }, 500);var r = o.getAttribute("data-timer");if ("null" !== r && "" !== r) {
          var s = n;o.timeout = setTimeout(function () {
            var e = (s || null) && "true" === o.getAttribute("data-has-done-function");e ? s(null) : sweetAlert.close();
          }, r);
        }
      },
          w = function w() {
        var e = v(),
            t = y();l.removeClass(e, "show-input"), t.value = u["default"].inputValue, t.setAttribute("type", u["default"].inputType), t.setAttribute("placeholder", u["default"].inputPlaceholder), C();
      },
          C = function C(e) {
        if (e && 13 === e.keyCode) return !1;var t = v(),
            n = t.querySelector(".sa-input-error");l.removeClass(n, "show");var o = t.querySelector(".sa-error-container");l.removeClass(o, "show");
      },
          S = function S() {
        var e = v();e.style.marginTop = l.getTopMargin(v());
      };a.sweetAlertInitialize = m, a.getModal = v, a.getOverlay = h, a.getInput = y, a.setFocusStyle = b, a.openModal = g, a.resetInput = w, a.resetInputError = C, a.fixVerticalPosition = S;
    }, { "./default-params": 2, "./handle-dom": 4, "./injected-html": 7, "./utils": 9 }], 7: [function (e, t, n) {
      Object.defineProperty(n, "__esModule", { value: !0 });var o = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"] = o, t.exports = n["default"];
    }, {}], 8: [function (e, t, o) {
      Object.defineProperty(o, "__esModule", { value: !0 });var a = e("./utils"),
          r = e("./handle-swal-dom"),
          s = e("./handle-dom"),
          l = ["error", "warning", "info", "success", "input", "prompt"],
          i = function i(e) {
        var t = r.getModal(),
            o = t.querySelector("h2"),
            i = t.querySelector("p"),
            u = t.querySelector("button.cancel"),
            c = t.querySelector("button.confirm");if (o.innerHTML = e.html ? e.title : s.escapeHtml(e.title).split("\n").join("<br>"), i.innerHTML = e.html ? e.text : s.escapeHtml(e.text || "").split("\n").join("<br>"), e.text && s.show(i), e.customClass) s.addClass(t, e.customClass), t.setAttribute("data-custom-class", e.customClass);else {
          var d = t.getAttribute("data-custom-class");s.removeClass(t, d), t.setAttribute("data-custom-class", "");
        }if (s.hide(t.querySelectorAll(".sa-icon")), e.type && !a.isIE8()) {
          var f = function () {
            for (var o = !1, a = 0; a < l.length; a++) {
              if (e.type === l[a]) {
                o = !0;break;
              }
            }if (!o) return logStr("Unknown alert type: " + e.type), { v: !1 };var i = ["success", "error", "warning", "info"],
                u = n;-1 !== i.indexOf(e.type) && (u = t.querySelector(".sa-icon.sa-" + e.type), s.show(u));var c = r.getInput();switch (e.type) {case "success":
                s.addClass(u, "animate"), s.addClass(u.querySelector(".sa-tip"), "animateSuccessTip"), s.addClass(u.querySelector(".sa-long"), "animateSuccessLong");break;case "error":
                s.addClass(u, "animateErrorIcon"), s.addClass(u.querySelector(".sa-x-mark"), "animateXMark");break;case "warning":
                s.addClass(u, "pulseWarning"), s.addClass(u.querySelector(".sa-body"), "pulseWarningIns"), s.addClass(u.querySelector(".sa-dot"), "pulseWarningIns");break;case "input":case "prompt":
                c.setAttribute("type", e.inputType), c.value = e.inputValue, c.setAttribute("placeholder", e.inputPlaceholder), s.addClass(t, "show-input"), setTimeout(function () {
                  c.focus(), c.addEventListener("keyup", swal.resetInputError);
                }, 400);}
          }();if ("object" == (typeof f === "undefined" ? "undefined" : _typeof(f))) return f.v;
        }if (e.imageUrl) {
          var p = t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage = "url(" + e.imageUrl + ")", s.show(p);var m = 80,
              v = 80;if (e.imageSize) {
            var y = e.imageSize.toString().split("x"),
                h = y[0],
                b = y[1];h && b ? (m = h, v = b) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + e.imageSize);
          }p.setAttribute("style", p.getAttribute("style") + "width:" + m + "px; height:" + v + "px");
        }t.setAttribute("data-has-cancel-button", e.showCancelButton), e.showCancelButton ? u.style.display = "inline-block" : s.hide(u), t.setAttribute("data-has-confirm-button", e.showConfirmButton), e.showConfirmButton ? c.style.display = "inline-block" : s.hide(c), e.cancelButtonText && (u.innerHTML = s.escapeHtml(e.cancelButtonText)), e.confirmButtonText && (c.innerHTML = s.escapeHtml(e.confirmButtonText)), e.confirmButtonColor && (c.style.backgroundColor = e.confirmButtonColor, c.style.borderLeftColor = e.confirmLoadingButtonColor, c.style.borderRightColor = e.confirmLoadingButtonColor, r.setFocusStyle(c, e.confirmButtonColor)), t.setAttribute("data-allow-outside-click", e.allowOutsideClick);var g = e.doneFunction ? !0 : !1;t.setAttribute("data-has-done-function", g), e.animation ? "string" == typeof e.animation ? t.setAttribute("data-animation", e.animation) : t.setAttribute("data-animation", "pop") : t.setAttribute("data-animation", "none"), t.setAttribute("data-timer", e.timer);
      };o["default"] = i, t.exports = o["default"];
    }, { "./handle-dom": 4, "./handle-swal-dom": 6, "./utils": 9 }], 9: [function (t, n, o) {
      Object.defineProperty(o, "__esModule", { value: !0 });var a = function a(e, t) {
        for (var n in t) {
          t.hasOwnProperty(n) && (e[n] = t[n]);
        }return e;
      },
          r = function r(e) {
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t ? parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) : null;
      },
          s = function s() {
        return e.attachEvent && !e.addEventListener;
      },
          l = function l(t) {
        e.console && e.console.log("SweetAlert: " + t);
      },
          i = function i(e, t) {
        e = String(e).replace(/[^0-9a-f]/gi, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;var n,
            o,
            a = "#";for (o = 0; 3 > o; o++) {
          n = parseInt(e.substr(2 * o, 2), 16), n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16), a += ("00" + n).substr(n.length);
        }return a;
      };o.extend = a, o.hexToRgb = r, o.isIE8 = s, o.logStr = l, o.colorLuminance = i;
    }, {}] }, {}, [1]),  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return sweetAlert;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports && (module.exports = sweetAlert);
}(window, document);

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/v2/app-v2.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/v1/jquery.js");
__webpack_require__("./resources/assets/js/v1/bootstrap.js");
__webpack_require__("./resources/assets/js/v1/list.js");
__webpack_require__("./resources/assets/js/v1/jquery-sortable.min.js");
__webpack_require__("./resources/assets/js/v1/select2.min.js");
__webpack_require__("./resources/assets/js/v1/sweetalert.min.js");
__webpack_require__("./resources/assets/js/v1/notify.js");
__webpack_require__("./resources/assets/js/v1/Chart.js");
__webpack_require__("./resources/assets/js/v1/lightbox.min.js");
__webpack_require__("./resources/assets/js/v1/jquery.matchHeight.js");
__webpack_require__("./resources/assets/js/v1/app.js");
__webpack_require__("./resources/assets/sass/app.scss");
module.exports = __webpack_require__("./resources/assets/sass/v2/app-v2.scss");


/***/ })

},[0]);