// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({82:[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
},{}],79:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ('production' !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],81:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if ('production' !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],80:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],19:[function(require,module,exports) {
/** @license React v16.4.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
var k = require("object-assign"),
    n = require("fbjs/lib/invariant"),
    p = require("fbjs/lib/emptyObject"),
    q = require("fbjs/lib/emptyFunction"),
    r = "function" === typeof Symbol && Symbol.for,
    t = r ? Symbol.for("react.element") : 60103,
    u = r ? Symbol.for("react.portal") : 60106,
    v = r ? Symbol.for("react.fragment") : 60107,
    w = r ? Symbol.for("react.strict_mode") : 60108,
    x = r ? Symbol.for("react.profiler") : 60114,
    y = r ? Symbol.for("react.provider") : 60109,
    z = r ? Symbol.for("react.context") : 60110,
    A = r ? Symbol.for("react.async_mode") : 60111,
    B = r ? Symbol.for("react.forward_ref") : 60112;r && Symbol.for("react.timeout");var C = "function" === typeof Symbol && Symbol.iterator;function D(a) {
  for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) e += "&args[]=" + encodeURIComponent(arguments[c + 1]);n(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
}
var E = { isMounted: function () {
    return !1;
  }, enqueueForceUpdate: function () {}, enqueueReplaceState: function () {}, enqueueSetState: function () {} };function F(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}F.prototype.isReactComponent = {};F.prototype.setState = function (a, b) {
  "object" !== typeof a && "function" !== typeof a && null != a ? D("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};function G() {}
G.prototype = F.prototype;function H(a, b, e) {
  this.props = a;this.context = b;this.refs = p;this.updater = e || E;
}var I = H.prototype = new G();I.constructor = H;k(I, F.prototype);I.isPureReactComponent = !0;var J = { current: null },
    K = Object.prototype.hasOwnProperty,
    L = { key: !0, ref: !0, __self: !0, __source: !0 };
function M(a, b, e) {
  var c = void 0,
      d = {},
      g = null,
      h = null;if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = b[c]);var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) l[m] = arguments[m + 2];d.children = l;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);return { $$typeof: t, type: a, key: g, ref: h, props: d, _owner: J.current };
}
function N(a) {
  return "object" === typeof a && null !== a && a.$$typeof === t;
}function escape(a) {
  var b = { "=": "=0", ":": "=2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var O = /\/+/g,
    P = [];function Q(a, b, e, c) {
  if (P.length) {
    var d = P.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function R(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > P.length && P.push(a);
}
function S(a, b, e, c) {
  var d = typeof a;if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case t:case u:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + T(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    d = a[h];var f = b + T(d, h);g += S(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) d = d.value, f = b + T(d, h++), g += S(d, f, e, c);else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function T(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function U(a, b) {
  a.func.call(a.context, b, a.count++);
}
function V(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? W(a, c, e, q.thatReturnsArgument) : null != a && (N(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + e, a = { $$typeof: t, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function W(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(O, "$&/") + "/");b = Q(b, g, c, d);null == a || S(a, "", V, b);R(b);
}
var X = { Children: { map: function (a, b, e) {
      if (null == a) return a;var c = [];W(a, c, null, b, e);return c;
    }, forEach: function (a, b, e) {
      if (null == a) return a;b = Q(null, null, b, e);null == a || S(a, "", U, b);R(b);
    }, count: function (a) {
      return null == a ? 0 : S(a, "", q.thatReturnsNull, null);
    }, toArray: function (a) {
      var b = [];W(a, b, null, q.thatReturnsArgument);return b;
    }, only: function (a) {
      N(a) ? void 0 : D("143");return a;
    } }, createRef: function () {
    return { current: null };
  }, Component: F, PureComponent: H, createContext: function (a, b) {
    void 0 === b && (b = null);a = { $$typeof: z,
      _calculateChangedBits: b, _defaultValue: a, _currentValue: a, _currentValue2: a, _changedBits: 0, _changedBits2: 0, Provider: null, Consumer: null };a.Provider = { $$typeof: y, _context: a };return a.Consumer = a;
  }, forwardRef: function (a) {
    return { $$typeof: B, render: a };
  }, Fragment: v, StrictMode: w, unstable_AsyncMode: A, unstable_Profiler: x, createElement: M, cloneElement: function (a, b, e) {
    null === a || void 0 === a ? D("267", a) : void 0;var c = void 0,
        d = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);void 0 !== b.key && (g = "" + b.key);var l = void 0;a.type && a.type.defaultProps && (l = a.type.defaultProps);for (c in b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
    }c = arguments.length - 2;if (1 === c) d.children = e;else if (1 < c) {
      l = Array(c);for (var m = 0; m < c; m++) l[m] = arguments[m + 2];d.children = l;
    }return { $$typeof: t, type: a.type, key: g, ref: h, props: d, _owner: f };
  }, createFactory: function (a) {
    var b = M.bind(null, a);b.type = a;return b;
  }, isValidElement: N, version: "16.4.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: J,
    assign: k } },
    Y = { default: X },
    Z = Y && X || Y;module.exports = Z.default ? Z.default : Z;
},{"object-assign":82,"fbjs/lib/invariant":79,"fbjs/lib/emptyObject":81,"fbjs/lib/emptyFunction":80}],8:[function(require,module,exports) {
'use strict';

if ('production' === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.production.min.js":19}],83:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],84:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;
},{}],85:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],210:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],136:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = require('./isNode');

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;
},{"./isNode":210}],86:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = require('./isTextNode');

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;
},{"./isTextNode":136}],18:[function(require,module,exports) {
/** @license React v16.4.0
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';var aa=require("fbjs/lib/invariant"),ca=require("react"),m=require("fbjs/lib/ExecutionEnvironment"),p=require("object-assign"),v=require("fbjs/lib/emptyFunction"),da=require("fbjs/lib/getActiveElement"),ea=require("fbjs/lib/shallowEqual"),fa=require("fbjs/lib/containsNode"),ha=require("fbjs/lib/emptyObject");
function A(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}ca?void 0:A("227");
function ia(a,b,c,d,e,f,g,h,k){this._hasCaughtError=!1;this._caughtError=null;var n=Array.prototype.slice.call(arguments,3);try{b.apply(c,n)}catch(r){this._caughtError=r,this._hasCaughtError=!0}}
var B={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){ia.apply(B,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){B.invokeGuardedCallback.apply(this,arguments);if(B.hasCaughtError()){var n=B.clearCaughtError();B._hasRethrowError||(B._hasRethrowError=!0,B._rethrowError=n)}},rethrowCaughtError:function(){return ka.apply(B,arguments)},hasCaughtError:function(){return B._hasCaughtError},clearCaughtError:function(){if(B._hasCaughtError){var a=
B._caughtError;B._caughtError=null;B._hasCaughtError=!1;return a}A("198")}};function ka(){if(B._hasRethrowError){var a=B._rethrowError;B._rethrowError=null;B._hasRethrowError=!1;throw a;}}var la=null,ma={};
function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:A("96",a);if(!oa[c]){b.extractEvents?void 0:A("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?A("99",h):void 0;pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&qa(k[e],g,h);e=!0}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:A("98",d,a)}}}}
function qa(a,b,c){ra[a]?A("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies}var oa=[],pa={},ra={},sa={};function ta(a){la?A("101"):void 0;la=Array.prototype.slice.call(a);na()}function ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]?A("102",c):void 0,ma[c]=d,b=!0)}b&&na()}
var va={plugins:oa,eventNameDispatchConfigs:pa,registrationNameModules:ra,registrationNameDependencies:sa,possibleRegistrationNames:null,injectEventPluginOrder:ta,injectEventPluginsByName:ua},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);B.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function Aa(a,b){null==b?A("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ca=null;
function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}var Ga={injectEventPluginOrder:ta,injectEventPluginsByName:ua};
function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?A("231",b,typeof c):void 0;
return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?A("95"):void 0,B.rethrowCaughtError())}function Ja(a,b,c,d){for(var e=null,f=0;f<oa.length;f++){var g=oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=Aa(e,g))}Ia(e,!1)}var Ka={injection:Ga,getListener:Ha,runEventsInBatch:Ia,runExtractedEventsInBatch:Ja},La=Math.random().toString(36).slice(2),C="__reactInternalInstance$"+La,Ma="__reactEventHandlers$"+La;
function Na(a){if(a[C])return a[C];for(;!a[C];)if(a.parentNode)a=a.parentNode;else return null;a=a[C];return 5===a.tag||6===a.tag?a:null}function Oa(a){if(5===a.tag||6===a.tag)return a.stateNode;A("33")}function Pa(a){return a[Ma]||null}var Qa={precacheFiberNode:function(a,b){b[C]=a},getClosestInstanceFromNode:Na,getInstanceFromNode:function(a){a=a[C];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Oa,getFiberCurrentPropsFromNode:Pa,updateFiberProps:function(a,b){a[Ma]=b}};
function F(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ra(a,b,c){for(var d=[];a;)d.push(a),a=F(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a)}function Ta(a){a&&a.dispatchConfig.phasedRegistrationNames&&Ra(a._targetInst,Sa,a)}
function Ua(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?F(b):null;Ra(b,Sa,a)}}function Va(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a))}function Xa(a){a&&a.dispatchConfig.registrationName&&Va(a._targetInst,null,a)}function Ya(a){Ba(a,Ta)}
function Za(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=F(h))g++;h=0;for(var k=f;k;k=F(k))h++;for(;0<g-h;)e=F(e),g--;for(;0<h-g;)f=F(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=F(e);f=F(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=F(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=F(d)}for(d=0;d<e.length;d++)Va(e[d],"bubbled",a);for(a=c.length;0<a--;)Va(c[a],"captured",b)}
var $a={accumulateTwoPhaseDispatches:Ya,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ba(a,Ua)},accumulateEnterLeaveDispatches:Za,accumulateDirectDispatches:function(a){Ba(a,Xa)}};function ab(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var bb={animationend:ab("Animation","AnimationEnd"),animationiteration:ab("Animation","AnimationIteration"),animationstart:ab("Animation","AnimationStart"),transitionend:ab("Transition","TransitionEnd")},cb={},db={};m.canUseDOM&&(db=document.createElement("div").style,"AnimationEvent"in window||(delete bb.animationend.animation,delete bb.animationiteration.animation,delete bb.animationstart.animation),"TransitionEvent"in window||delete bb.transitionend.transition);
function eb(a){if(cb[a])return cb[a];if(!bb[a])return a;var b=bb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in db)return cb[a]=b[c];return a}var fb=eb("animationend"),gb=eb("animationiteration"),hb=eb("animationstart"),ib=eb("transitionend"),jb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kb=null;
function lb(){!kb&&m.canUseDOM&&(kb="textContent"in document.documentElement?"textContent":"innerText");return kb}var G={_root:null,_startText:null,_fallbackText:null};function mb(){if(G._fallbackText)return G._fallbackText;var a,b=G._startText,c=b.length,d,e=nb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);G._fallbackText=e.slice(a,1<d?1-d:void 0);return G._fallbackText}function nb(){return"value"in G._root?G._root.value:G._root[lb()]}
var ob="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),pb={type:null,target:null,currentTarget:v.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function H(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?v.thatReturnsTrue:v.thatReturnsFalse;this.isPropagationStopped=v.thatReturnsFalse;return this}
p(H.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=v.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v.thatReturnsTrue)},persist:function(){this.isPersistent=v.thatReturnsTrue},isPersistent:v.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<ob.length;a++)this[ob[a]]=null}});H.Interface=pb;H.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;p(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=p({},d.Interface,a);c.extend=d.extend;qb(c);return c};qb(H);
function rb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function sb(a){a instanceof this?void 0:A("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function qb(a){a.eventPool=[];a.getPooled=rb;a.release=sb}var tb=H.extend({data:null}),ub=H.extend({data:null}),vb=[9,13,27,32],wb=m.canUseDOM&&"CompositionEvent"in window,xb=null;m.canUseDOM&&"documentMode"in document&&(xb=document.documentMode);
var yb=m.canUseDOM&&"TextEvent"in window&&!xb,zb=m.canUseDOM&&(!wb||xb&&8<xb&&11>=xb),Ab=String.fromCharCode(32),Bb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Cb=!1;
function Db(a,b){switch(a){case "keyup":return-1!==vb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Eb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Fb=!1;function Gb(a,b){switch(a){case "compositionend":return Eb(b);case "keypress":if(32!==b.which)return null;Cb=!0;return Ab;case "textInput":return a=b.data,a===Ab&&Cb?null:a;default:return null}}
function Hb(a,b){if(Fb)return"compositionend"===a||!wb&&Db(a,b)?(a=mb(),G._root=null,G._startText=null,G._fallbackText=null,Fb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return zb?null:b.data;default:return null}}
var Ib={eventTypes:Bb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(wb)b:{switch(a){case "compositionstart":e=Bb.compositionStart;break b;case "compositionend":e=Bb.compositionEnd;break b;case "compositionupdate":e=Bb.compositionUpdate;break b}e=void 0}else Fb?Db(a,c)&&(e=Bb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Bb.compositionStart);e?(zb&&(Fb||e!==Bb.compositionStart?e===Bb.compositionEnd&&Fb&&(f=mb()):(G._root=d,G._startText=nb(),Fb=!0)),e=tb.getPooled(e,b,c,d),f?e.data=
f:(f=Eb(c),null!==f&&(e.data=f)),Ya(e),f=e):f=null;(a=yb?Gb(a,c):Hb(a,c))?(b=ub.getPooled(Bb.beforeInput,b,c,d),b.data=a,Ya(b)):b=null;return null===f?b:null===b?f:[f,b]}},Jb=null,Kb={injectFiberControlledHostComponent:function(a){Jb=a}},Lb=null,Mb=null;function Nb(a){if(a=xa(a)){Jb&&"function"===typeof Jb.restoreControlledState?void 0:A("194");var b=wa(a.stateNode);Jb.restoreControlledState(a.stateNode,a.type,b)}}function Ob(a){Lb?Mb?Mb.push(a):Mb=[a]:Lb=a}
function Pb(){return null!==Lb||null!==Mb}function Qb(){if(Lb){var a=Lb,b=Mb;Mb=Lb=null;Nb(a);if(b)for(a=0;a<b.length;a++)Nb(b[a])}}var Rb={injection:Kb,enqueueStateRestore:Ob,needsStateRestore:Pb,restoreStateIfNeeded:Qb};function Sb(a,b){return a(b)}function Tb(a,b,c){return a(b,c)}function Ub(){}var Vb=!1;function Wb(a,b){if(Vb)return a(b);Vb=!0;try{return Sb(a,b)}finally{Vb=!1,Pb()&&(Ub(),Qb())}}
var Xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Xb[a.type]:"textarea"===b?!0:!1}function Zb(a){a=a.target||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
function $b(a,b){if(!m.canUseDOM||b&&!("addEventListener"in document))return!1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function ac(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function bc(a){var b=ac(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function cc(a){a._valueTracker||(a._valueTracker=bc(a))}function dc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ac(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var ec=ca.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,I="function"===typeof Symbol&&Symbol.for,fc=I?Symbol.for("react.element"):60103,gc=I?Symbol.for("react.portal"):60106,hc=I?Symbol.for("react.fragment"):60107,ic=I?Symbol.for("react.strict_mode"):60108,jc=I?Symbol.for("react.profiler"):60114,mc=I?Symbol.for("react.provider"):60109,nc=I?Symbol.for("react.context"):60110,oc=I?Symbol.for("react.async_mode"):60111,pc=I?Symbol.for("react.forward_ref"):60112,qc=I?Symbol.for("react.timeout"):
60113,rc="function"===typeof Symbol&&Symbol.iterator;function sc(a){if(null===a||"undefined"===typeof a)return null;a=rc&&a[rc]||a["@@iterator"];return"function"===typeof a?a:null}
function tc(a){var b=a.type;if("function"===typeof b)return b.displayName||b.name;if("string"===typeof b)return b;switch(b){case oc:return"AsyncMode";case nc:return"Context.Consumer";case hc:return"ReactFragment";case gc:return"ReactPortal";case jc:return"Profiler("+a.pendingProps.id+")";case mc:return"Context.Provider";case ic:return"StrictMode";case qc:return"Timeout"}if("object"===typeof b&&null!==b)switch(b.$$typeof){case pc:return a=b.render.displayName||b.render.name||"",""!==a?"ForwardRef("+
a+")":"ForwardRef"}return null}function vc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=tc(a);var f=null;c&&(f=tc(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e=""}b+=e;a=a.return}while(a);return b}
var wc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xc={},yc={};function zc(a){if(yc.hasOwnProperty(a))return!0;if(xc.hasOwnProperty(a))return!1;if(wc.test(a))return yc[a]=!0;xc[a]=!0;return!1}
function Ac(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function Bc(a,b,c,d){if(null===b||"undefined"===typeof b||Ac(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}
function J(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var K={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){K[a]=new J(a,0,!1,a,null)});
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];K[b]=new J(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){K[a]=new J(a,2,!1,a.toLowerCase(),null)});["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){K[a]=new J(a,2,!1,a,null)});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){K[a]=new J(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){K[a]=new J(a,3,!0,a.toLowerCase(),null)});["capture","download"].forEach(function(a){K[a]=new J(a,4,!1,a.toLowerCase(),null)});
["cols","rows","size","span"].forEach(function(a){K[a]=new J(a,6,!1,a.toLowerCase(),null)});["rowSpan","start"].forEach(function(a){K[a]=new J(a,5,!1,a.toLowerCase(),null)});var Cc=/[\-:]([a-z])/g;function Dc(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Cc,
Dc);K[b]=new J(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Cc,Dc);K[b]=new J(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Cc,Dc);K[b]=new J(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});K.tabIndex=new J("tabIndex",1,!1,"tabindex",null);
function Ec(a,b,c,d){var e=K.hasOwnProperty(b)?K[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Bc(b,c,e,d)&&(c=null),d||null===e?zc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Fc(a,b){var c=b.checked;return p({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Gc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Hc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Ic(a,b){b=b.checked;null!=b&&Ec(a,"checked",b,!1)}
function Jc(a,b){Ic(a,b);var c=Hc(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?Kc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Kc(a,b.type,Hc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Lc(a,b){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue"))""===a.value&&(a.value=""+a._wrapperState.initialValue),a.defaultValue=""+a._wrapperState.initialValue;b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)}function Kc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}
function Hc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}var Mc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Nc(a,b,c){a=H.getPooled(Mc.change,a,b,c);a.type="change";Ob(c);Ya(a);return a}var Oc=null,Pc=null;function Qc(a){Ia(a,!1)}function Rc(a){var b=Oa(a);if(dc(b))return a}
function Sc(a,b){if("change"===a)return b}var Tc=!1;m.canUseDOM&&(Tc=$b("input")&&(!document.documentMode||9<document.documentMode));function Uc(){Oc&&(Oc.detachEvent("onpropertychange",Vc),Pc=Oc=null)}function Vc(a){"value"===a.propertyName&&Rc(Pc)&&(a=Nc(Pc,a,Zb(a)),Wb(Qc,a))}function Wc(a,b,c){"focus"===a?(Uc(),Oc=b,Pc=c,Oc.attachEvent("onpropertychange",Vc)):"blur"===a&&Uc()}function Xc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Rc(Pc)}
function Yc(a,b){if("click"===a)return Rc(b)}function Zc(a,b){if("input"===a||"change"===a)return Rc(b)}
var $c={eventTypes:Mc,_isInputEventSupported:Tc,extractEvents:function(a,b,c,d){var e=b?Oa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Sc:Yb(e)?Tc?f=Zc:(f=Xc,g=Wc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Yc);if(f&&(f=f(a,b)))return Nc(f,c,d);g&&g(a,e,b);"blur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&Kc(e,"number",e.value)}},ad=H.extend({view:null,
detail:null}),bd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=bd[a])?!!b[a]:!1}function dd(){return cd}
var ed=ad.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:dd,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),fd=ed.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),gd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},
mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},hd={eventTypes:gd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||
e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,n=void 0;if("mouseout"===a||"mouseover"===a)g=ed,h=gd.mouseLeave,k=gd.mouseEnter,n="mouse";else if("pointerout"===a||"pointerover"===a)g=fd,h=gd.pointerLeave,k=gd.pointerEnter,n="pointer";a=null==f?e:Oa(f);e=null==b?e:Oa(b);h=g.getPooled(h,f,c,d);h.type=n+"leave";h.target=a;h.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=n+"enter";c.target=e;c.relatedTarget=a;Za(h,
c,f,b);return[h,c]}};function id(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function jd(a){2!==id(a)?A("188"):void 0}
function kd(a){var b=a.alternate;if(!b)return b=id(a),3===b?A("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return jd(e),a;if(g===d)return jd(e),b;g=g.sibling}A("188")}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:A("189")}}c.alternate!==d?A("190"):void 0}3!==c.tag?A("188"):void 0;return c.stateNode.current===c?a:b}function ld(a){a=kd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function md(a){a=kd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}var nd=H.extend({animationName:null,elapsedTime:null,pseudoElement:null}),od=H.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),pd=ad.extend({relatedTarget:null});
function qd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var rd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},td=ad.extend({key:function(a){if(a.key){var b=rd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=qd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?sd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:dd,charCode:function(a){return"keypress"===
a.type?qd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?qd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),ud=ed.extend({dataTransfer:null}),vd=ad.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:dd}),wd=H.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),xd=ed.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),yd=[["abort","abort"],[fb,"animationEnd"],[gb,"animationIteration"],[hb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ib,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],zd={},Ad={};function Bd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};zd[a]=b;Ad[c]=b}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],
["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Bd(a,!0)});yd.forEach(function(a){Bd(a,!1)});
var Cd={eventTypes:zd,isInteractiveTopLevelEventType:function(a){a=Ad[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Ad[a];if(!e)return null;switch(a){case "keypress":if(0===qd(c))return null;case "keydown":case "keyup":a=td;break;case "blur":case "focus":a=pd;break;case "click":if(2===c.button)return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=ed;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
ud;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=vd;break;case fb:case gb:case hb:a=nd;break;case ib:a=wd;break;case "scroll":a=ad;break;case "wheel":a=xd;break;case "copy":case "cut":case "paste":a=od;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=fd;break;default:a=H}b=a.getPooled(e,b,c,d);Ya(b);return b}},Dd=Cd.isInteractiveTopLevelEventType,
Ed=[];function Fd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c.return;)c=c.return;c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Na(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Ja(a.topLevelType,b,a.nativeEvent,Zb(a.nativeEvent))}var Gd=!0;function Id(a){Gd=!!a}function L(a,b){if(!b)return null;var c=(Dd(a)?Jd:Kd).bind(null,a);b.addEventListener(a,c,!1)}
function Ld(a,b){if(!b)return null;var c=(Dd(a)?Jd:Kd).bind(null,a);b.addEventListener(a,c,!0)}function Jd(a,b){Tb(Kd,a,b)}function Kd(a,b){if(Gd){var c=Zb(b);c=Na(c);null===c||"number"!==typeof c.tag||2===id(c)||(c=null);if(Ed.length){var d=Ed.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Wb(Fd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Ed.length&&Ed.push(a)}}}
var Md={get _enabled(){return Gd},setEnabled:Id,isEnabled:function(){return Gd},trapBubbledEvent:L,trapCapturedEvent:Ld,dispatchEvent:Kd},Nd={},Od=0,Pd="_reactListenersID"+(""+Math.random()).slice(2);function Qd(a){Object.prototype.hasOwnProperty.call(a,Pd)||(a[Pd]=Od++,Nd[a[Pd]]={});return Nd[a[Pd]]}function Rd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Sd(a,b){var c=Rd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Rd(c)}}function Td(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)}
var Ud=m.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Vd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Wd=null,Xd=null,Yd=null,Zd=!1;
function $d(a,b){if(Zd||null==Wd||Wd!==da())return null;var c=Wd;"selectionStart"in c&&Td(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Yd&&ea(Yd,c)?null:(Yd=c,a=H.getPooled(Vd.select,Xd,a,b),a.type="select",a.target=Wd,Ya(a),a)}
var ae={eventTypes:Vd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Qd(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Oa(b):window;switch(a){case "focus":if(Yb(e)||"true"===e.contentEditable)Wd=e,Xd=b,Yd=null;break;case "blur":Yd=Xd=Wd=null;break;case "mousedown":Zd=!0;break;case "contextmenu":case "mouseup":return Zd=!1,$d(c,d);case "selectionchange":if(Ud)break;
case "keydown":case "keyup":return $d(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa.getFiberCurrentPropsFromNode;xa=Qa.getInstanceFromNode;ya=Qa.getNodeFromInstance;Ga.injectEventPluginsByName({SimpleEventPlugin:Cd,EnterLeaveEventPlugin:hd,ChangeEventPlugin:$c,SelectEventPlugin:ae,BeforeInputEventPlugin:Ib});var be=void 0;
be="object"===typeof performance&&"function"===typeof performance.now?function(){return performance.now()}:function(){return Date.now()};var ce=void 0,de=void 0;
if(m.canUseDOM){var ee=[],fe=0,ge={},he=-1,ie=!1,je=!1,ke=0,le=33,me=33,ne={didTimeout:!1,timeRemaining:function(){var a=ke-be();return 0<a?a:0}},oe=function(a,b){if(ge[b])try{a(ne)}finally{delete ge[b]}},pe="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===pe&&(ie=!1,0!==ee.length)){if(0!==ee.length&&(a=be(),!(-1===he||he>a))){he=-1;ne.didTimeout=!0;for(var b=0,c=ee.length;b<c;b++){var d=ee[b],e=d.timeoutTime;-1!==
e&&e<=a?oe(d.scheduledCallback,d.callbackId):-1!==e&&(-1===he||e<he)&&(he=e)}}for(a=be();0<ke-a&&0<ee.length;)a=ee.shift(),ne.didTimeout=!1,oe(a.scheduledCallback,a.callbackId),a=be();0<ee.length&&!je&&(je=!0,requestAnimationFrame(qe))}},!1);var qe=function(a){je=!1;var b=a-ke+me;b<me&&le<me?(8>b&&(b=8),me=b<le?le:b):le=b;ke=a+me;ie||(ie=!0,window.postMessage(pe,"*"))};ce=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=be()+b.timeout);if(-1===he||-1!==c&&c<he)he=c;fe++;b=fe;ee.push({scheduledCallback:a,
callbackId:b,timeoutTime:c});ge[b]=!0;je||(je=!0,requestAnimationFrame(qe));return b};de=function(a){delete ge[a]}}else{var re=0,se={};ce=function(a){var b=re++,c=setTimeout(function(){a({timeRemaining:function(){return Infinity},didTimeout:!1})});se[b]=c;return b};de=function(a){var b=se[a];delete se[a];clearTimeout(b)}}function te(a){var b="";ca.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}
function ue(a,b){a=p({children:void 0},b);if(b=te(b.children))a.children=b;return a}function ve(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function we(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function xe(a,b){null!=b.dangerouslySetInnerHTML?A("91"):void 0;return p({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ye(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?A("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:A("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function ze(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Ae(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Be={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Ce(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function De(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Ce(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Ee=void 0,Fe=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Be.svg||"innerHTML"in a)a.innerHTML=b;else{Ee=Ee||document.createElement("div");Ee.innerHTML="<svg>"+b+"</svg>";for(b=Ee.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Ge(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var He={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ie=["Webkit","ms","Moz","O"];Object.keys(He).forEach(function(a){Ie.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);He[b]=He[a]})});
function Je(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||He.hasOwnProperty(e)&&He[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Ke=p({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Le(a,b,c){b&&(Ke[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?A("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?A("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:A("61")),null!=b.style&&"object"!==typeof b.style?A("62",c()):void 0)}
function Me(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var Ne=v.thatReturns("");
function Oe(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Qd(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Ld("scroll",a);break;case "focus":case "blur":Ld("focus",a);Ld("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":$b(e,!0)&&Ld(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===jb.indexOf(e)&&L(e,a)}c[e]=!0}}}
function Pe(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Be.html&&(d=Ce(a));d===Be.html?"script"===a?(a=c.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function Qe(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function Re(a,b,c,d){var e=Me(b,c);switch(b){case "iframe":case "object":L("load",a);var f=c;break;case "video":case "audio":for(f=0;f<jb.length;f++)L(jb[f],a);f=c;break;case "source":L("error",a);f=c;break;case "img":case "image":case "link":L("error",a);L("load",a);f=c;break;case "form":L("reset",a);L("submit",a);f=c;break;case "details":L("toggle",a);f=c;break;case "input":Gc(a,c);f=Fc(a,c);L("invalid",a);Oe(d,"onChange");break;case "option":f=ue(a,c);break;case "select":we(a,c);f=p({},c,{value:void 0});
L("invalid",a);Oe(d,"onChange");break;case "textarea":ye(a,c);f=xe(a,c);L("invalid",a);Oe(d,"onChange");break;default:f=c}Le(b,f,Ne);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Je(a,k,Ne):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Fe(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&Ge(a,k):"number"===typeof k&&Ge(a,""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ra.hasOwnProperty(h)?null!=k&&Oe(d,
h):null!=k&&Ec(a,h,k,e))}switch(b){case "input":cc(a);Lc(a,c);break;case "textarea":cc(a);Ae(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?ve(a,!!c.multiple,b,!1):null!=c.defaultValue&&ve(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=v)}}
function Se(a,b,c,d,e){var f=null;switch(b){case "input":c=Fc(a,c);d=Fc(a,d);f=[];break;case "option":c=ue(a,c);d=ue(a,d);f=[];break;case "select":c=p({},c,{value:void 0});d=p({},d,{value:void 0});f=[];break;case "textarea":c=xe(a,c);d=xe(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=v)}Le(b,d,Ne);b=a=void 0;var g=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var h=c[a];for(b in h)h.hasOwnProperty(b)&&(g||
(g={}),g[b]="")}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ra.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];h=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==h&&(null!=k||null!=h))if("style"===a)if(h){for(b in h)!h.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(g||(g={}),g[b]="");for(b in k)k.hasOwnProperty(b)&&h[b]!==k[b]&&(g||(g={}),g[b]=k[b])}else g||(f||(f=[]),f.push(a,g)),
g=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(a,""+k)):"children"===a?h===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ra.hasOwnProperty(a)?(null!=k&&Oe(e,a),f||h===k||(f=[])):(f=f||[]).push(a,k))}g&&(f=f||[]).push("style",g);return f}
function Te(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Ic(a,e);Me(c,d);d=Me(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Je(a,h,Ne):"dangerouslySetInnerHTML"===g?Fe(a,h):"children"===g?Ge(a,h):Ec(a,g,h,d)}switch(c){case "input":Jc(a,e);break;case "textarea":ze(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ve(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
ve(a,!!e.multiple,e.defaultValue,!0):ve(a,!!e.multiple,e.multiple?[]:"",!1))}}
function Ue(a,b,c,d,e){switch(b){case "iframe":case "object":L("load",a);break;case "video":case "audio":for(d=0;d<jb.length;d++)L(jb[d],a);break;case "source":L("error",a);break;case "img":case "image":case "link":L("error",a);L("load",a);break;case "form":L("reset",a);L("submit",a);break;case "details":L("toggle",a);break;case "input":Gc(a,c);L("invalid",a);Oe(e,"onChange");break;case "select":we(a,c);L("invalid",a);Oe(e,"onChange");break;case "textarea":ye(a,c),L("invalid",a),Oe(e,"onChange")}Le(b,
c,Ne);d=null;for(var f in c)if(c.hasOwnProperty(f)){var g=c[f];"children"===f?"string"===typeof g?a.textContent!==g&&(d=["children",g]):"number"===typeof g&&a.textContent!==""+g&&(d=["children",""+g]):ra.hasOwnProperty(f)&&null!=g&&Oe(e,f)}switch(b){case "input":cc(a);Lc(a,c);break;case "textarea":cc(a);Ae(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=v)}return d}function Ve(a,b){return a.nodeValue!==b}
var We={createElement:Pe,createTextNode:Qe,setInitialProperties:Re,diffProperties:Se,updateProperties:Te,diffHydratedProperties:Ue,diffHydratedText:Ve,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Jc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;
c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Pa(d);e?void 0:A("90");dc(d);Jc(d,e)}}}break;case "textarea":ze(a,c);break;case "select":b=c.value,null!=b&&ve(a,!!c.multiple,b,!1)}}},Xe=null,Ye=null;function Ze(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function $e(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html}var af=be,bf=ce,cf=de;function df(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function ef(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}new Set;var ff=[],gf=-1;function hf(a){return{current:a}}
function M(a){0>gf||(a.current=ff[gf],ff[gf]=null,gf--)}function N(a,b){gf++;ff[gf]=a.current;a.current=b}var jf=hf(ha),O=hf(!1),kf=ha;function lf(a){return mf(a)?kf:jf.current}
function nf(a,b){var c=a.type.contextTypes;if(!c)return ha;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function mf(a){return 2===a.tag&&null!=a.type.childContextTypes}function of(a){mf(a)&&(M(O,a),M(jf,a))}function pf(a){M(O,a);M(jf,a)}
function qf(a,b,c){jf.current!==ha?A("168"):void 0;N(jf,b,a);N(O,c,a)}function rf(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:A("108",tc(a)||"Unknown",e);return p({},b,c)}function sf(a){if(!mf(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ha;kf=jf.current;N(jf,b,a);N(O,O.current,a);return!0}
function tf(a,b){var c=a.stateNode;c?void 0:A("169");if(b){var d=rf(a,kf);c.__reactInternalMemoizedMergedChildContext=d;M(O,a);M(jf,a);N(jf,d,a)}else M(O,a);N(O,b,a)}
function uf(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function vf(a,b,c){var d=a.alternate;null===d?(d=new uf(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function wf(a,b,c){var d=a.type,e=a.key;a=a.props;if("function"===typeof d)var f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case hc:return xf(a.children,b,c,e);case oc:f=11;b|=3;break;case ic:f=11;b|=2;break;case jc:return d=new uf(15,a,e,b|4),d.type=jc,d.expirationTime=c,d;case qc:f=16;b|=2;break;default:a:{switch("object"===typeof d&&null!==d?d.$$typeof:null){case mc:f=13;break a;case nc:f=12;break a;case pc:f=14;break a;default:A("130",null==d?
d:typeof d,"")}f=void 0}}b=new uf(f,a,e,b);b.type=d;b.expirationTime=c;return b}function xf(a,b,c,d){a=new uf(10,a,d,b);a.expirationTime=c;return a}function yf(a,b,c){a=new uf(6,a,null,b);a.expirationTime=c;return a}function zf(a,b,c){b=new uf(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function Af(a,b,c){b=new uf(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a}var Bf=null,Cf=null;function Df(a){return function(b){try{return a(b)}catch(c){}}}
function Ef(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Bf=Df(function(a){return b.onCommitFiberRoot(c,a)});Cf=Df(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function Ff(a){"function"===typeof Bf&&Bf(a)}function Gf(a){"function"===typeof Cf&&Cf(a)}var Hf=!1;
function If(a){return{expirationTime:0,baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Jf(a){return{expirationTime:a.expirationTime,baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Kf(a){return{expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Lf(a,b,c){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c}
function Mf(a,b,c){var d=a.alternate;if(null===d){var e=a.updateQueue;var f=null;null===e&&(e=a.updateQueue=If(a.memoizedState))}else e=a.updateQueue,f=d.updateQueue,null===e?null===f?(e=a.updateQueue=If(a.memoizedState),f=d.updateQueue=If(d.memoizedState)):e=a.updateQueue=Jf(f):null===f&&(f=d.updateQueue=Jf(e));null===f||e===f?Lf(e,b,c):null===e.lastUpdate||null===f.lastUpdate?(Lf(e,b,c),Lf(f,b,c)):(Lf(e,b,c),f.lastUpdate=b)}
function Nf(a,b,c){var d=a.updateQueue;d=null===d?a.updateQueue=If(a.memoizedState):Of(a,d);null===d.lastCapturedUpdate?d.firstCapturedUpdate=d.lastCapturedUpdate=b:(d.lastCapturedUpdate.next=b,d.lastCapturedUpdate=b);if(0===d.expirationTime||d.expirationTime>c)d.expirationTime=c}function Of(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Jf(b));return b}
function Pf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return p({},d,e);case 2:Hf=!0}return d}
function Qf(a,b,c,d,e){Hf=!1;if(!(0===b.expirationTime||b.expirationTime>e)){b=Of(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,n=f;null!==k;){var r=k.expirationTime;if(r>e){if(null===g&&(g=k,f=n),0===h||h>r)h=r}else n=Pf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next}r=null;for(k=b.firstCapturedUpdate;null!==k;){var w=k.expirationTime;if(w>e){if(null===r&&(r=k,null===
g&&(f=n)),0===h||h>w)h=w}else n=Pf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next}null===g&&(b.lastUpdate=null);null===r?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===r&&(f=n);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=r;b.expirationTime=h;a.memoizedState=n}}
function Rf(a,b){"function"!==typeof a?A("191",a):void 0;a.call(b)}
function Sf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);a=b.firstEffect;for(b.firstEffect=b.lastEffect=null;null!==a;){var d=a.callback;null!==d&&(a.callback=null,Rf(d,c));a=a.nextEffect}a=b.firstCapturedEffect;for(b.firstCapturedEffect=b.lastCapturedEffect=null;null!==a;)b=a.callback,null!==b&&(a.callback=null,Rf(b,c)),a=a.nextEffect}
function Tf(a,b){return{value:a,source:b,stack:vc(b)}}var Uf=hf(null),Vf=hf(null),Wf=hf(0);function Xf(a){var b=a.type._context;N(Wf,b._changedBits,a);N(Vf,b._currentValue,a);N(Uf,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode}function Yf(a){var b=Wf.current,c=Vf.current;M(Uf,a);M(Vf,a);M(Wf,a);a=a.type._context;a._currentValue=c;a._changedBits=b}var Zf={},$f=hf(Zf),ag=hf(Zf),bg=hf(Zf);function cg(a){a===Zf?A("174"):void 0;return a}
function dg(a,b){N(bg,b,a);N(ag,a,a);N($f,Zf,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:De(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=De(b,c)}M($f,a);N($f,b,a)}function eg(a){M($f,a);M(ag,a);M(bg,a)}function fg(a){ag.current===a&&(M($f,a),M(ag,a))}function hg(a,b,c){var d=a.memoizedState;b=b(c,d);d=null===b||void 0===b?d:p({},d,b);a.memoizedState=d;a=a.updateQueue;null!==a&&0===a.expirationTime&&(a.baseState=d)}
var lg={isMounted:function(a){return(a=a._reactInternalFiber)?2===id(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=ig();d=jg(d,a);var e=Kf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Mf(a,e,d);kg(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=ig();d=jg(d,a);var e=Kf(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Mf(a,e,d);kg(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=ig();c=jg(c,a);var d=Kf(c);d.tag=2;void 0!==
b&&null!==b&&(d.callback=b);Mf(a,d,c);kg(a,c)}};function mg(a,b,c,d,e,f){var g=a.stateNode;a=a.type;return"function"===typeof g.shouldComponentUpdate?g.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!ea(b,c)||!ea(d,e):!0}
function ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&lg.enqueueReplaceState(b,b.state,null)}
function og(a,b){var c=a.type,d=a.stateNode,e=a.pendingProps,f=lf(a);d.props=e;d.state=a.memoizedState;d.refs=ha;d.context=nf(a,f);f=a.updateQueue;null!==f&&(Qf(a,f,e,d,b),d.state=a.memoizedState);f=a.type.getDerivedStateFromProps;"function"===typeof f&&(hg(a,f,e),d.state=a.memoizedState);"function"===typeof c.getDerivedStateFromProps||"function"===typeof d.getSnapshotBeforeUpdate||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||(c=d.state,"function"===typeof d.componentWillMount&&
d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount(),c!==d.state&&lg.enqueueReplaceState(d,d.state,null),f=a.updateQueue,null!==f&&(Qf(a,f,e,d,b),d.state=a.memoizedState));"function"===typeof d.componentDidMount&&(a.effectTag|=4)}var pg=Array.isArray;
function qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?A("110"):void 0,d=c.stateNode);d?void 0:A("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===ha?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?A("148"):void 0;c._owner?void 0:A("254",a)}return a}
function rg(a,b){"textarea"!==a.type&&A("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=vf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=yf(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=qg(a,b,c),d.return=a,d;d=wf(c,a.mode,d);d.ref=qg(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
zf(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function r(a,b,c,d,f){if(null===b||10!==b.tag)return b=xf(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function w(a,b,c){if("string"===typeof b||"number"===typeof b)return b=yf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case fc:return c=wf(b,a.mode,c),c.ref=qg(a,null,b),c.return=a,c;case gc:return b=zf(b,a.mode,c),b.return=a,b}if(pg(b)||sc(b))return b=xf(b,a.mode,c,null),b.return=
a,b;rg(a,b)}return null}function P(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case fc:return c.key===e?c.type===hc?r(a,b,c.props.children,d,e):k(a,b,c,d):null;case gc:return c.key===e?n(a,b,c,d):null}if(pg(c)||sc(c))return null!==e?null:r(a,b,c,d,null);rg(a,c)}return null}function kc(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);
if("object"===typeof d&&null!==d){switch(d.$$typeof){case fc:return a=a.get(null===d.key?c:d.key)||null,d.type===hc?r(b,a,d.props.children,e,d.key):k(b,a,d,e);case gc:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e)}if(pg(d)||sc(d))return a=a.get(c)||null,r(b,a,d,e,null);rg(b,d)}return null}function Hd(e,g,h,k){for(var u=null,x=null,t=g,q=g=0,n=null;null!==t&&q<h.length;q++){t.index>q?(n=t,t=null):n=t.sibling;var l=P(e,t,h[q],k);if(null===l){null===t&&(t=n);break}a&&t&&null===l.alternate&&b(e,
t);g=f(l,g,q);null===x?u=l:x.sibling=l;x=l;t=n}if(q===h.length)return c(e,t),u;if(null===t){for(;q<h.length;q++)if(t=w(e,h[q],k))g=f(t,g,q),null===x?u=t:x.sibling=t,x=t;return u}for(t=d(e,t);q<h.length;q++)if(n=kc(t,e,q,h[q],k))a&&null!==n.alternate&&t.delete(null===n.key?q:n.key),g=f(n,g,q),null===x?u=n:x.sibling=n,x=n;a&&t.forEach(function(a){return b(e,a)});return u}function E(e,g,h,k){var t=sc(h);"function"!==typeof t?A("150"):void 0;h=t.call(h);null==h?A("151"):void 0;for(var u=t=null,n=g,x=
g=0,y=null,l=h.next();null!==n&&!l.done;x++,l=h.next()){n.index>x?(y=n,n=null):y=n.sibling;var r=P(e,n,l.value,k);if(null===r){n||(n=y);break}a&&n&&null===r.alternate&&b(e,n);g=f(r,g,x);null===u?t=r:u.sibling=r;u=r;n=y}if(l.done)return c(e,n),t;if(null===n){for(;!l.done;x++,l=h.next())l=w(e,l.value,k),null!==l&&(g=f(l,g,x),null===u?t=l:u.sibling=l,u=l);return t}for(n=d(e,n);!l.done;x++,l=h.next())l=kc(n,e,x,l.value,k),null!==l&&(a&&null!==l.alternate&&n.delete(null===l.key?x:l.key),g=f(l,g,x),null===
u?t=l:u.sibling=l,u=l);a&&n.forEach(function(a){return b(e,a)});return t}return function(a,d,f,h){"object"===typeof f&&null!==f&&f.type===hc&&null===f.key&&(f=f.props.children);var k="object"===typeof f&&null!==f;if(k)switch(f.$$typeof){case fc:a:{var n=f.key;for(k=d;null!==k;){if(k.key===n)if(10===k.tag?f.type===hc:k.type===f.type){c(a,k.sibling);d=e(k,f.type===hc?f.props.children:f.props,h);d.ref=qg(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=k.sibling}f.type===hc?(d=xf(f.props.children,
a.mode,h,f.key),d.return=a,a=d):(h=wf(f,a.mode,h),h.ref=qg(a,d,f),h.return=a,a=h)}return g(a);case gc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=zf(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=
a,a=d):(c(a,d),d=yf(f,a.mode,h),d.return=a,a=d),g(a);if(pg(f))return Hd(a,d,f,h);if(sc(f))return E(a,d,f,h);k&&rg(a,f);if("undefined"===typeof f)switch(a.tag){case 2:case 1:h=a.type,A("152",h.displayName||h.name||"Component")}return c(a,d)}}var tg=sg(!0),ug=sg(!1),vg=null,wg=null,xg=!1;function yg(a,b){var c=new uf(5,null,null,0);c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function zg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return!1}}function Ag(a){if(xg){var b=wg;if(b){var c=b;if(!zg(a,b)){b=df(c);if(!b||!zg(a,b)){a.effectTag|=2;xg=!1;vg=a;return}yg(vg,c)}vg=a;wg=ef(b)}else a.effectTag|=2,xg=!1,vg=a}}
function Bg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;vg=a}function Cg(a){if(a!==vg)return!1;if(!xg)return Bg(a),xg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!$e(b,a.memoizedProps))for(b=wg;b;)yg(a,b),b=df(b);Bg(a);wg=vg?df(a.stateNode):null;return!0}function Dg(){wg=vg=null;xg=!1}function Q(a,b,c){Eg(a,b,c,b.expirationTime)}function Eg(a,b,c,d){b.child=null===a?ug(b,null,c,d):tg(b,a.child,c,d)}
function Fg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function Gg(a,b,c,d,e){Fg(a,b);var f=0!==(b.effectTag&64);if(!c&&!f)return d&&tf(b,!1),R(a,b);c=b.stateNode;ec.current=b;var g=f?null:c.render();b.effectTag|=1;f&&(Eg(a,b,null,e),b.child=null);Eg(a,b,g,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&tf(b,!0);return b.child}
function Hg(a){var b=a.stateNode;b.pendingContext?qf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&qf(a,b.context,!1);dg(a,b.containerInfo)}
function Ig(a,b,c,d){var e=a.child;null!==e&&(e.return=a);for(;null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var g=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==g&&(0===g.expirationTime||g.expirationTime>d)&&(g.expirationTime=d);else if(null!==g&&(0===g.expirationTime||g.expirationTime>d))g.expirationTime=d;else break;f=f.return}f=null}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=
e.child}if(null!==f)f.return=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){e.return=f.return;f=e;break}f=f.return}e=f}}
function Jg(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps,g=!0;if(O.current)g=!1;else if(f===e)return b.stateNode=0,Xf(b),R(a,b);var h=e.value;b.memoizedProps=e;if(null===f)h=1073741823;else if(f.value===e.value){if(f.children===e.children&&g)return b.stateNode=0,Xf(b),R(a,b);h=0}else{var k=f.value;if(k===h&&(0!==k||1/k===1/h)||k!==k&&h!==h){if(f.children===e.children&&g)return b.stateNode=0,Xf(b),R(a,b);h=0}else if(h="function"===typeof d._calculateChangedBits?d._calculateChangedBits(k,
h):1073741823,h|=0,0===h){if(f.children===e.children&&g)return b.stateNode=0,Xf(b),R(a,b)}else Ig(b,d,h,c)}b.stateNode=h;Xf(b);Q(a,b,e.children);return b.child}function R(a,b){null!==a&&b.child!==a.child?A("153"):void 0;if(null!==b.child){a=b.child;var c=vf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=vf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}
function Kg(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:Hg(b);break;case 2:sf(b);break;case 4:dg(b,b.stateNode.containerInfo);break;case 13:Xf(b)}return null}switch(b.tag){case 0:null!==a?A("155"):void 0;var d=b.type,e=b.pendingProps,f=lf(b);f=nf(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,f=f.getDerivedStateFromProps,"function"===
typeof f&&hg(b,f,e),e=sf(b),d.updater=lg,b.stateNode=d,d._reactInternalFiber=b,og(b,c),a=Gg(a,b,!0,e,c)):(b.tag=1,Q(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,O.current||b.memoizedProps!==c?(d=lf(b),d=nf(b,d),e=e(c,d),b.effectTag|=1,Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 2:e=sf(b);if(null===a)if(null===b.stateNode){var g=b.pendingProps,h=b.type;d=lf(b);var k=2===b.tag&&null!=b.type.contextTypes;f=k?nf(b,d):ha;g=new h(g,f);b.memoizedState=null!==
g.state&&void 0!==g.state?g.state:null;g.updater=lg;b.stateNode=g;g._reactInternalFiber=b;k&&(k=b.stateNode,k.__reactInternalMemoizedUnmaskedChildContext=d,k.__reactInternalMemoizedMaskedChildContext=f);og(b,c);d=!0}else{h=b.type;d=b.stateNode;k=b.memoizedProps;f=b.pendingProps;d.props=k;var n=d.context;g=lf(b);g=nf(b,g);var r=h.getDerivedStateFromProps;(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(k!==f||n!==g)&&ng(b,d,f,g);Hf=!1;var w=b.memoizedState;n=d.state=w;var P=b.updateQueue;null!==P&&(Qf(b,P,f,d,c),n=b.memoizedState);k!==f||w!==n||O.current||Hf?("function"===typeof r&&(hg(b,r,f),n=b.memoizedState),(k=Hf||mg(b,k,f,w,n,g))?(h||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||("function"===typeof d.componentWillMount&&d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount()),"function"===typeof d.componentDidMount&&
(b.effectTag|=4)):("function"===typeof d.componentDidMount&&(b.effectTag|=4),b.memoizedProps=f,b.memoizedState=n),d.props=f,d.state=n,d.context=g,d=k):("function"===typeof d.componentDidMount&&(b.effectTag|=4),d=!1)}else h=b.type,d=b.stateNode,f=b.memoizedProps,k=b.pendingProps,d.props=f,n=d.context,g=lf(b),g=nf(b,g),r=h.getDerivedStateFromProps,(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(f!==k||n!==g)&&ng(b,d,k,g),Hf=!1,n=b.memoizedState,w=d.state=n,P=b.updateQueue,null!==P&&(Qf(b,P,k,d,c),w=b.memoizedState),f!==k||n!==w||O.current||Hf?("function"===typeof r&&(hg(b,r,k),w=b.memoizedState),(r=Hf||mg(b,f,k,n,w,g))?(h||"function"!==typeof d.UNSAFE_componentWillUpdate&&"function"!==typeof d.componentWillUpdate||("function"===typeof d.componentWillUpdate&&d.componentWillUpdate(k,w,g),"function"===typeof d.UNSAFE_componentWillUpdate&&d.UNSAFE_componentWillUpdate(k,w,g)),"function"===typeof d.componentDidUpdate&&
(b.effectTag|=4),"function"===typeof d.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),b.memoizedProps=k,b.memoizedState=w),d.props=k,d.state=w,d.context=g,d=r):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||
f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),d=!1);return Gg(a,b,d,e,c);case 3:Hg(b);e=b.updateQueue;if(null!==e)if(d=b.memoizedState,d=null!==d?d.element:null,Qf(b,e,b.pendingProps,null,c),e=b.memoizedState.element,e===d)Dg(),a=R(a,b);else{d=b.stateNode;if(d=(null===a||null===a.child)&&d.hydrate)wg=ef(b.stateNode.containerInfo),vg=b,d=xg=!0;d?(b.effectTag|=2,b.child=ug(b,null,e,c)):(Dg(),Q(a,b,e));a=b.child}else Dg(),a=R(a,b);return a;case 5:a:{cg(bg.current);e=cg($f.current);d=De(e,
b.type);e!==d&&(N(ag,b,b),N($f,d,b));null===a&&Ag(b);e=b.type;k=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!O.current&&k===d){if(k=b.mode&1&&!!d.hidden)b.expirationTime=1073741823;if(!k||1073741823!==c){a=R(a,b);break a}}k=d.children;$e(e,d)?k=null:f&&$e(e,f)&&(b.effectTag|=16);Fg(a,b);1073741823!==c&&b.mode&1&&d.hidden?(b.expirationTime=1073741823,b.memoizedProps=d,a=null):(Q(a,b,k),b.memoizedProps=d,a=b.child)}return a;case 6:return null===a&&Ag(b),b.memoizedProps=b.pendingProps,
null;case 16:return null;case 4:return dg(b,b.stateNode.containerInfo),e=b.pendingProps,O.current||b.memoizedProps!==e?(null===a?b.child=tg(b,null,e,c):Q(a,b,e),b.memoizedProps=e,a=b.child):a=R(a,b),a;case 14:return e=b.type.render,c=b.pendingProps,d=b.ref,O.current||b.memoizedProps!==c||d!==(null!==a?a.ref:null)?(e=e(c,d),Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 10:return c=b.pendingProps,O.current||b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 11:return c=
b.pendingProps.children,O.current||null!==c&&b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 15:return c=b.pendingProps,b.memoizedProps===c?a=R(a,b):(Q(a,b,c.children),b.memoizedProps=c,a=b.child),a;case 13:return Jg(a,b,c);case 12:a:if(d=b.type,f=b.pendingProps,k=b.memoizedProps,e=d._currentValue,g=d._changedBits,O.current||0!==g||k!==f){b.memoizedProps=f;h=f.unstable_observedBits;if(void 0===h||null===h)h=1073741823;b.stateNode=h;if(0!==(g&h))Ig(b,d,g,c);else if(k===f){a=
R(a,b);break a}c=f.children;c=c(e);b.effectTag|=1;Q(a,b,c);a=b.child}else a=R(a,b);return a;default:A("156")}}function Lg(a){a.effectTag|=4}var Pg=void 0,Qg=void 0,Rg=void 0;Pg=function(){};Qg=function(a,b,c){(b.updateQueue=c)&&Lg(b)};Rg=function(a,b,c,d){c!==d&&Lg(b)};
function Sg(a,b){var c=b.pendingProps;switch(b.tag){case 1:return null;case 2:return of(b),null;case 3:eg(b);pf(b);var d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Cg(b),b.effectTag&=-3;Pg(b);return null;case 5:fg(b);d=cg(bg.current);var e=b.type;if(null!==a&&null!=b.stateNode){var f=a.memoizedProps,g=b.stateNode,h=cg($f.current);g=Se(g,e,f,c,d);Qg(a,b,g,e,f,c,d,h);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!c)return null===b.stateNode?
A("166"):void 0,null;a=cg($f.current);if(Cg(b))c=b.stateNode,e=b.type,f=b.memoizedProps,c[C]=b,c[Ma]=f,d=Ue(c,e,f,a,d),b.updateQueue=d,null!==d&&Lg(b);else{a=Pe(e,c,d,a);a[C]=b;a[Ma]=c;a:for(f=b.child;null!==f;){if(5===f.tag||6===f.tag)a.appendChild(f.stateNode);else if(4!==f.tag&&null!==f.child){f.child.return=f;f=f.child;continue}if(f===b)break;for(;null===f.sibling;){if(null===f.return||f.return===b)break a;f=f.return}f.sibling.return=f.return;f=f.sibling}Re(a,e,c,d);Ze(e,c)&&Lg(b);b.stateNode=
a}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)Rg(a,b,a.memoizedProps,c);else{if("string"!==typeof c)return null===b.stateNode?A("166"):void 0,null;d=cg(bg.current);cg($f.current);Cg(b)?(d=b.stateNode,c=b.memoizedProps,d[C]=b,Ve(d,c)&&Lg(b)):(d=Qe(c,d),d[C]=b,b.stateNode=d)}return null;case 14:return null;case 16:return null;case 10:return null;case 11:return null;case 15:return null;case 4:return eg(b),Pg(b),null;case 13:return Yf(b),null;case 12:return null;case 0:A("167");
default:A("156")}}function Tg(a,b){var c=b.source;null===b.stack&&null!==c&&vc(c);null!==c&&tc(c);b=b.value;null!==a&&2===a.tag&&tc(a);try{b&&b.suppressReactErrorLogging||console.error(b)}catch(d){d&&d.suppressReactErrorLogging||console.error(d)}}function Ug(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Vg(a,c)}else b.current=null}
function Wg(a){"function"===typeof Gf&&Gf(a);switch(a.tag){case 2:Ug(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Vg(a,c)}break;case 5:Ug(a);break;case 4:Xg(a)}}function Yg(a){return 5===a.tag||3===a.tag||4===a.tag}
function Zg(a){a:{for(var b=a.return;null!==b;){if(Yg(b)){var c=b;break a}b=b.return}A("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:A("161")}c.effectTag&16&&(Ge(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Yg(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h)}else b.insertBefore(e.stateNode,c);else d?(f=b,g=e.stateNode,8===f.nodeType?f.parentNode.insertBefore(g,f):f.appendChild(g)):b.appendChild(e.stateNode);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===
e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function Xg(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?A("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return}c=!0}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if(Wg(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return}g.sibling.return=g.return;g=g.sibling}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode)}else if(4===b.tag?d=b.stateNode.containerInfo:Wg(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1)}b.sibling.return=b.return;b=b.sibling}}
function $g(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&(c[Ma]=d,Te(c,f,e,a,d))}break;case 6:null===b.stateNode?A("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 15:break;case 16:break;default:A("163")}}function ah(a,b,c){c=Kf(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){bh(d);Tg(a,b)};return c}
function ch(a,b,c){c=Kf(c);c.tag=3;var d=a.stateNode;null!==d&&"function"===typeof d.componentDidCatch&&(c.callback=function(){null===dh?dh=new Set([this]):dh.add(this);var c=b.value,d=b.stack;Tg(a,b);this.componentDidCatch(c,{componentStack:null!==d?d:""})});return c}
function eh(a,b,c,d,e,f){c.effectTag|=512;c.firstEffect=c.lastEffect=null;d=Tf(d,c);a=b;do{switch(a.tag){case 3:a.effectTag|=1024;d=ah(a,d,f);Nf(a,d,f);return;case 2:if(b=d,c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&(null===dh||!dh.has(c))){a.effectTag|=1024;d=ch(a,b,f);Nf(a,d,f);return}}a=a.return}while(null!==a)}
function fh(a){switch(a.tag){case 2:of(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return eg(a),pf(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return fg(a),null;case 16:return b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 4:return eg(a),null;case 13:return Yf(a),null;default:return null}}var gh=af(),hh=2,ih=gh,jh=0,kh=0,lh=!1,S=null,mh=null,T=0,nh=-1,oh=!1,U=null,ph=!1,qh=!1,dh=null;
function rh(){if(null!==S)for(var a=S.return;null!==a;){var b=a;switch(b.tag){case 2:of(b);break;case 3:eg(b);pf(b);break;case 5:fg(b);break;case 4:eg(b);break;case 13:Yf(b)}a=a.return}mh=null;T=0;nh=-1;oh=!1;S=null;qh=!1}
function sh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){b=Sg(b,a,T);var e=a;if(1073741823===T||1073741823!==e.expirationTime){var f=0;switch(e.tag){case 3:case 2:var g=e.updateQueue;null!==g&&(f=g.expirationTime)}for(g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&
(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{qh=!0;break}}else{a=fh(a,oh,T);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}
function th(a){var b=Kg(a.alternate,a,T);null===b&&(b=sh(a));ec.current=null;return b}
function uh(a,b,c){lh?A("243"):void 0;lh=!0;if(b!==T||a!==mh||null===S)rh(),mh=a,T=b,nh=-1,S=vf(mh.current,null,T),a.pendingCommitExpirationTime=0;var d=!1;oh=!c||T<=hh;do{try{if(c)for(;null!==S&&!vh();)S=th(S);else for(;null!==S;)S=th(S)}catch(f){if(null===S)d=!0,bh(f);else{null===S?A("271"):void 0;c=S;var e=c.return;if(null===e){d=!0;bh(f);break}eh(a,e,c,f,oh,T,ih);S=sh(c)}}break}while(1);lh=!1;if(d)return null;if(null===S){if(qh)return a.pendingCommitExpirationTime=b,a.current.alternate;oh?A("262"):
void 0;0<=nh&&setTimeout(function(){var b=a.current.expirationTime;0!==b&&(0===a.remainingExpirationTime||a.remainingExpirationTime<b)&&wh(a,b)},nh);xh(a.current.expirationTime)}return null}
function Vg(a,b){var c;a:{lh&&!ph?A("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 2:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromCatch||"function"===typeof d.componentDidCatch&&(null===dh||!dh.has(d))){a=Tf(b,a);a=ch(c,a,1);Mf(c,a,1);kg(c,1);c=void 0;break a}break;case 3:a=Tf(b,a);a=ah(c,a,1);Mf(c,a,1);kg(c,1);c=void 0;break a}c=c.return}3===a.tag&&(c=Tf(b,a),c=ah(a,c,1),Mf(a,c,1),kg(a,1));c=void 0}return c}
function yh(){var a=2+25*(((ig()-2+500)/25|0)+1);a<=jh&&(a=jh+1);return jh=a}function jg(a,b){a=0!==kh?kh:lh?ph?1:T:b.mode&1?zh?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1):1;zh&&(0===Ah||a>Ah)&&(Ah=a);return a}
function kg(a,b){for(;null!==a;){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a.return)if(3===a.tag){var c=a.stateNode;!lh&&0!==T&&b<T&&rh();var d=c.current.expirationTime;lh&&!ph&&mh===c||wh(c,d);Bh>Ch&&A("185")}else break;a=a.return}}function ig(){ih=af()-gh;return hh=(ih/10|0)+2}
function Dh(a){var b=kh;kh=2+25*(((ig()-2+500)/25|0)+1);try{return a()}finally{kh=b}}function Eh(a,b,c,d,e){var f=kh;kh=1;try{return a(b,c,d,e)}finally{kh=f}}var Fh=null,V=null,Gh=0,Hh=-1,W=!1,X=null,Y=0,Ah=0,Ih=!1,Jh=!1,Kh=null,Lh=null,Z=!1,Mh=!1,zh=!1,Nh=null,Ch=1E3,Bh=0,Oh=1;function Ph(a){if(0!==Gh){if(a>Gh)return;cf(Hh)}var b=af()-gh;Gh=a;Hh=bf(Qh,{timeout:10*(a-2)-b})}
function wh(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===V?(Fh=V=a,a.nextScheduledRoot=a):(V=V.nextScheduledRoot=a,V.nextScheduledRoot=Fh);else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b}W||(Z?Mh&&(X=a,Y=1,Rh(a,1,!1)):1===b?Sh():Ph(b))}
function Th(){var a=0,b=null;if(null!==V)for(var c=V,d=Fh;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===V?A("244"):void 0;if(d===d.nextScheduledRoot){Fh=V=d.nextScheduledRoot=null;break}else if(d===Fh)Fh=e=d.nextScheduledRoot,V.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V){V=c;V.nextScheduledRoot=Fh;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===V)break;
c=d;d=d.nextScheduledRoot}}c=X;null!==c&&c===b&&1===a?Bh++:Bh=0;X=b;Y=a}function Qh(a){Uh(0,!0,a)}function Sh(){Uh(1,!1,null)}function Uh(a,b,c){Lh=c;Th();if(b)for(;null!==X&&0!==Y&&(0===a||a>=Y)&&(!Ih||ig()>=Y);)ig(),Rh(X,Y,!Ih),Th();else for(;null!==X&&0!==Y&&(0===a||a>=Y);)Rh(X,Y,!1),Th();null!==Lh&&(Gh=0,Hh=-1);0!==Y&&Ph(Y);Lh=null;Ih=!1;Vh()}function Wh(a,b){W?A("253"):void 0;X=a;Y=b;Rh(a,b,!1);Sh();Vh()}
function Vh(){Bh=0;if(null!==Nh){var a=Nh;Nh=null;for(var b=0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(d){Jh||(Jh=!0,Kh=d)}}}if(Jh)throw a=Kh,Kh=null,Jh=!1,a;}function Rh(a,b,c){W?A("245"):void 0;W=!0;c?(c=a.finishedWork,null!==c?Xh(a,c,b):(a.finishedWork=null,c=uh(a,b,!0),null!==c&&(vh()?a.finishedWork=c:Xh(a,c,b)))):(c=a.finishedWork,null!==c?Xh(a,c,b):(a.finishedWork=null,c=uh(a,b,!1),null!==c&&Xh(a,c,b)));W=!1}
function Xh(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Nh?Nh=[d]:Nh.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=0;return}a.finishedWork=null;ph=lh=!0;c=b.stateNode;c.current===b?A("177"):void 0;d=c.pendingCommitExpirationTime;0===d?A("261"):void 0;c.pendingCommitExpirationTime=0;ig();ec.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var e=b.firstEffect}else e=b;else e=b.firstEffect;Xe=Gd;var f=da();if(Td(f)){if("selectionStart"in
f)var g={start:f.selectionStart,end:f.selectionEnd};else a:{var h=window.getSelection&&window.getSelection();if(h&&0!==h.rangeCount){g=h.anchorNode;var k=h.anchorOffset,n=h.focusNode;h=h.focusOffset;try{g.nodeType,n.nodeType}catch(Wa){g=null;break a}var r=0,w=-1,P=-1,kc=0,Hd=0,E=f,t=null;b:for(;;){for(var x;;){E!==g||0!==k&&3!==E.nodeType||(w=r+k);E!==n||0!==h&&3!==E.nodeType||(P=r+h);3===E.nodeType&&(r+=E.nodeValue.length);if(null===(x=E.firstChild))break;t=E;E=x}for(;;){if(E===f)break b;t===g&&
++kc===k&&(w=r);t===n&&++Hd===h&&(P=r);if(null!==(x=E.nextSibling))break;E=t;t=E.parentNode}E=x}g=-1===w||-1===P?null:{start:w,end:P}}else g=null}g=g||{start:0,end:0}}else g=null;Ye={focusedElem:f,selectionRange:g};Id(!1);for(U=e;null!==U;){f=!1;g=void 0;try{for(;null!==U;){if(U.effectTag&256){var u=U.alternate;k=U;switch(k.tag){case 2:if(k.effectTag&256&&null!==u){var y=u.memoizedProps,D=u.memoizedState,ja=k.stateNode;ja.props=k.memoizedProps;ja.state=k.memoizedState;var hi=ja.getSnapshotBeforeUpdate(y,
D);ja.__reactInternalSnapshotBeforeUpdate=hi}break;case 3:case 5:case 6:case 4:break;default:A("163")}}U=U.nextEffect}}catch(Wa){f=!0,g=Wa}f&&(null===U?A("178"):void 0,Vg(U,g),null!==U&&(U=U.nextEffect))}for(U=e;null!==U;){u=!1;y=void 0;try{for(;null!==U;){var q=U.effectTag;q&16&&Ge(U.stateNode,"");if(q&128){var z=U.alternate;if(null!==z){var l=z.ref;null!==l&&("function"===typeof l?l(null):l.current=null)}}switch(q&14){case 2:Zg(U);U.effectTag&=-3;break;case 6:Zg(U);U.effectTag&=-3;$g(U.alternate,
U);break;case 4:$g(U.alternate,U);break;case 8:D=U,Xg(D),D.return=null,D.child=null,D.alternate&&(D.alternate.child=null,D.alternate.return=null)}U=U.nextEffect}}catch(Wa){u=!0,y=Wa}u&&(null===U?A("178"):void 0,Vg(U,y),null!==U&&(U=U.nextEffect))}l=Ye;z=da();q=l.focusedElem;u=l.selectionRange;if(z!==q&&fa(document.documentElement,q)){Td(q)&&(z=u.start,l=u.end,void 0===l&&(l=z),"selectionStart"in q?(q.selectionStart=z,q.selectionEnd=Math.min(l,q.value.length)):window.getSelection&&(z=window.getSelection(),
y=q[lb()].length,l=Math.min(u.start,y),u=void 0===u.end?l:Math.min(u.end,y),!z.extend&&l>u&&(y=u,u=l,l=y),y=Sd(q,l),D=Sd(q,u),y&&D&&(1!==z.rangeCount||z.anchorNode!==y.node||z.anchorOffset!==y.offset||z.focusNode!==D.node||z.focusOffset!==D.offset)&&(ja=document.createRange(),ja.setStart(y.node,y.offset),z.removeAllRanges(),l>u?(z.addRange(ja),z.extend(D.node,D.offset)):(ja.setEnd(D.node,D.offset),z.addRange(ja)))));z=[];for(l=q;l=l.parentNode;)1===l.nodeType&&z.push({element:l,left:l.scrollLeft,
top:l.scrollTop});q.focus();for(q=0;q<z.length;q++)l=z[q],l.element.scrollLeft=l.left,l.element.scrollTop=l.top}Ye=null;Id(Xe);Xe=null;c.current=b;for(U=e;null!==U;){e=!1;q=void 0;try{for(z=d;null!==U;){var gg=U.effectTag;if(gg&36){var lc=U.alternate;l=U;u=z;switch(l.tag){case 2:var ba=l.stateNode;if(l.effectTag&4)if(null===lc)ba.props=l.memoizedProps,ba.state=l.memoizedState,ba.componentDidMount();else{var ri=lc.memoizedProps,si=lc.memoizedState;ba.props=l.memoizedProps;ba.state=l.memoizedState;
ba.componentDidUpdate(ri,si,ba.__reactInternalSnapshotBeforeUpdate)}var Mg=l.updateQueue;null!==Mg&&(ba.props=l.memoizedProps,ba.state=l.memoizedState,Sf(l,Mg,ba,u));break;case 3:var Ng=l.updateQueue;if(null!==Ng){y=null;if(null!==l.child)switch(l.child.tag){case 5:y=l.child.stateNode;break;case 2:y=l.child.stateNode}Sf(l,Ng,y,u)}break;case 5:var ti=l.stateNode;null===lc&&l.effectTag&4&&Ze(l.type,l.memoizedProps)&&ti.focus();break;case 6:break;case 4:break;case 15:break;case 16:break;default:A("163")}}if(gg&
128){l=void 0;var uc=U.ref;if(null!==uc){var Og=U.stateNode;switch(U.tag){case 5:l=Og;break;default:l=Og}"function"===typeof uc?uc(l):uc.current=l}}var ui=U.nextEffect;U.nextEffect=null;U=ui}}catch(Wa){e=!0,q=Wa}e&&(null===U?A("178"):void 0,Vg(U,q),null!==U&&(U=U.nextEffect))}lh=ph=!1;"function"===typeof Ff&&Ff(b.stateNode);b=c.current.expirationTime;0===b&&(dh=null);a.remainingExpirationTime=b}function vh(){return null===Lh||Lh.timeRemaining()>Oh?!1:Ih=!0}
function bh(a){null===X?A("246"):void 0;X.remainingExpirationTime=0;Jh||(Jh=!0,Kh=a)}function xh(a){null===X?A("246"):void 0;X.remainingExpirationTime=a}function Yh(a,b){var c=Z;Z=!0;try{return a(b)}finally{(Z=c)||W||Sh()}}function Zh(a,b){if(Z&&!Mh){Mh=!0;try{return a(b)}finally{Mh=!1}}return a(b)}function $h(a,b){W?A("187"):void 0;var c=Z;Z=!0;try{return Eh(a,b)}finally{Z=c,Sh()}}function ai(a){var b=Z;Z=!0;try{Eh(a)}finally{(Z=b)||W||Uh(1,!1,null)}}
function bi(a,b,c,d,e){var f=b.current;if(c){c=c._reactInternalFiber;var g;b:{2===id(c)&&2===c.tag?void 0:A("170");for(g=c;3!==g.tag;){if(mf(g)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}(g=g.return)?void 0:A("171")}g=g.stateNode.context}c=mf(c)?rf(c,g):g}else c=ha;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Kf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);Mf(f,e,d);kg(f,d);return d}
function ci(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?A("188"):A("268",Object.keys(a)));a=ld(b);return null===a?null:a.stateNode}function di(a,b,c,d){var e=b.current,f=ig();e=jg(f,e);return bi(a,b,c,e,d)}function ei(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}
function fi(a){var b=a.findFiberByHostInstance;return Ef(p({},a,{findHostInstanceByFiber:function(a){a=ld(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}
var gi={updateContainerAtExpirationTime:bi,createContainer:function(a,b,c){return Af(a,b,c)},updateContainer:di,flushRoot:Wh,requestWork:wh,computeUniqueAsyncExpiration:yh,batchedUpdates:Yh,unbatchedUpdates:Zh,deferredUpdates:Dh,syncUpdates:Eh,interactiveUpdates:function(a,b,c){if(zh)return a(b,c);Z||W||0===Ah||(Uh(Ah,!1,null),Ah=0);var d=zh,e=Z;Z=zh=!0;try{return a(b,c)}finally{zh=d,(Z=e)||W||Sh()}},flushInteractiveUpdates:function(){W||0===Ah||(Uh(Ah,!1,null),Ah=0)},flushControlled:ai,flushSync:$h,
getPublicRootInstance:ei,findHostInstance:ci,findHostInstanceWithNoPortals:function(a){a=md(a);return null===a?null:a.stateNode},injectIntoDevTools:fi};function ii(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:gc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}Kb.injectFiberControlledHostComponent(We);
function ji(a){this._expirationTime=yh();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}ji.prototype.render=function(a){this._defer?void 0:A("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new ki;bi(a,b,null,c,d._onCommit);return d};ji.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
ji.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:A("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?A("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;Wh(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};ji.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function ki(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}ki.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
ki.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?A("191",c):void 0;c()}}};function li(a,b,c){this._internalRoot=Af(a,b,c)}li.prototype.render=function(a,b){var c=this._internalRoot,d=new ki;b=void 0===b?null:b;null!==b&&d.then(b);di(a,c,null,d._onCommit);return d};
li.prototype.unmount=function(a){var b=this._internalRoot,c=new ki;a=void 0===a?null:a;null!==a&&c.then(a);di(null,b,null,c._onCommit);return c};li.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new ki;c=void 0===c?null:c;null!==c&&e.then(c);di(b,d,a,e._onCommit);return e};
li.prototype.createBatch=function(){var a=new ji(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function mi(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Sb=gi.batchedUpdates;Tb=gi.interactiveUpdates;Ub=gi.flushInteractiveUpdates;
function ni(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new li(a,!1,b)}
function oi(a,b,c,d,e){mi(c)?void 0:A("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=ei(f._internalRoot);g.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=ni(c,d);if("function"===typeof e){var h=e;e=function(){var a=ei(f._internalRoot);h.call(a)}}Zh(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return ei(f._internalRoot)}
function pi(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;mi(b)?void 0:A("200");return ii(a,b,null,c)}
var qi={createPortal:pi,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:ci(a)},hydrate:function(a,b,c){return oi(null,a,b,!0,c)},render:function(a,b,c){return oi(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?A("38"):void 0;return oi(a,b,c,!1,d)},unmountComponentAtNode:function(a){mi(a)?void 0:A("40");return a._reactRootContainer?(Zh(function(){oi(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return pi.apply(void 0,
arguments)},unstable_batchedUpdates:Yh,unstable_deferredUpdates:Dh,flushSync:$h,unstable_flushControlled:ai,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ka,EventPluginRegistry:va,EventPropagators:$a,ReactControlledComponent:Rb,ReactDOMComponentTree:Qa,ReactDOMEventListener:Md},unstable_createRoot:function(a,b){return new li(a,!0,null!=b&&!0===b.hydrate)}};fi({findFiberByHostInstance:Na,bundleType:0,version:"16.4.0",rendererPackageName:"react-dom"});
var vi={default:qi},wi=vi&&qi||vi;module.exports=wi.default?wi.default:wi;

},{"fbjs/lib/invariant":79,"react":8,"fbjs/lib/ExecutionEnvironment":83,"object-assign":82,"fbjs/lib/emptyFunction":80,"fbjs/lib/getActiveElement":84,"fbjs/lib/shallowEqual":85,"fbjs/lib/containsNode":86,"fbjs/lib/emptyObject":81}],7:[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ('production' !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ('production' === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.production.min.js":18}],132:[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Immutable = factory();
})(this, function () {
  'use strict';
  var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
    return isIterable(value) ? value : Seq(value);
  }

  createClass(KeyedIterable, Iterable);
  function KeyedIterable(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }

  createClass(IndexedIterable, Iterable);
  function IndexedIterable(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }

  createClass(SetIterable, Iterable);
  function SetIterable(value) {
    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
  }

  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;

  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

  function Iterator(next) {
    this.next = next;
  }

  Iterator.prototype.toString = function () {
    return '[Iterator]';
  };

  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };

  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value: value, done: false
    };
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
  function Seq(value) {
    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
  }

  Seq.of = function () /*...values*/{
    return Seq(arguments);
  };

  Seq.prototype.toSeq = function () {
    return this;
  };

  Seq.prototype.toString = function () {
    return this.__toString('Seq {', '}');
  };

  Seq.prototype.cacheResult = function () {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };

  // abstract __iterateUncached(fn, reverse)

  Seq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, true);
  };

  // abstract __iteratorUncached(type, reverse)

  Seq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, true);
  };

  createClass(KeyedSeq, Seq);
  function KeyedSeq(value) {
    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
  }

  KeyedSeq.prototype.toKeyedSeq = function () {
    return this;
  };

  createClass(IndexedSeq, Seq);
  function IndexedSeq(value) {
    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
  }

  IndexedSeq.of = function () /*...values*/{
    return IndexedSeq(arguments);
  };

  IndexedSeq.prototype.toIndexedSeq = function () {
    return this;
  };

  IndexedSeq.prototype.toString = function () {
    return this.__toString('Seq [', ']');
  };

  IndexedSeq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, false);
  };

  IndexedSeq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, false);
  };

  createClass(SetSeq, Seq);
  function SetSeq(value) {
    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
  }

  SetSeq.of = function () /*...values*/{
    return SetSeq(arguments);
  };

  SetSeq.prototype.toSetSeq = function () {
    return this;
  };

  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;

  createClass(ArraySeq, IndexedSeq);
  function ArraySeq(array) {
    this._array = array;
    this.size = array.length;
  }

  ArraySeq.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };

  ArraySeq.prototype.__iterate = function (fn, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ArraySeq.prototype.__iterator = function (type, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    var ii = 0;
    return new Iterator(function () {
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
    });
  };

  createClass(ObjectSeq, KeyedSeq);
  function ObjectSeq(object) {
    var keys = Object.keys(object);
    this._object = object;
    this._keys = keys;
    this.size = keys.length;
  }

  ObjectSeq.prototype.get = function (key, notSetValue) {
    if (notSetValue !== undefined && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };

  ObjectSeq.prototype.has = function (key) {
    return this._object.hasOwnProperty(key);
  };

  ObjectSeq.prototype.__iterate = function (fn, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      var key = keys[reverse ? maxIndex - ii : ii];
      if (fn(object[key], key, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ObjectSeq.prototype.__iterator = function (type, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    var ii = 0;
    return new Iterator(function () {
      var key = keys[reverse ? maxIndex - ii : ii];
      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
    });
  };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(IterableSeq, IndexedSeq);
  function IterableSeq(iterable) {
    this._iterable = iterable;
    this.size = iterable.length || iterable.size;
  }

  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };

  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };

  createClass(IteratorSeq, IndexedSeq);
  function IteratorSeq(iterator) {
    this._iterator = iterator;
    this._iteratorCache = [];
  }

  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    while (iterations < cache.length) {
      if (fn(cache[iterations], iterations++, this) === false) {
        return iterations;
      }
    }
    var step;
    while (!(step = iterator.next()).done) {
      var val = step.value;
      cache[iterations] = val;
      if (fn(val, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };

  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    return new Iterator(function () {
      if (iterations >= cache.length) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        cache[iterations] = step.value;
      }
      return iteratorValue(type, iterations, cache[iterations++]);
    });
  };

  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : typeof value === 'object' ? new ObjectSeq(value) : undefined;
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values: ' + value);
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) || typeof value === 'object' && new ObjectSeq(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function () {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function (v, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function (v, k) {
      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

  function Repeat(value, times) {
    if (!(this instanceof Repeat)) {
      return new Repeat(value, times);
    }
    this._value = value;
    this.size = times === undefined ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }

  Repeat.prototype.toString = function () {
    if (this.size === 0) {
      return 'Repeat []';
    }
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  };

  Repeat.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };

  Repeat.prototype.includes = function (searchValue) {
    return is(this._value, searchValue);
  };

  Repeat.prototype.slice = function (begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
  };

  Repeat.prototype.reverse = function () {
    return this;
  };

  Repeat.prototype.indexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };

  Repeat.prototype.lastIndexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };

  Repeat.prototype.__iterate = function (fn, reverse) {
    for (var ii = 0; ii < this.size; ii++) {
      if (fn(this._value, ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  Repeat.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    var ii = 0;
    return new Iterator(function () {
      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
    });
  };

  Repeat.prototype.equals = function (other) {
    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
  };

  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      return new Range(start, end, step);
    }
    invariant(step !== 0, 'Cannot step a Range by 0');
    start = start || 0;
    if (end === undefined) {
      end = Infinity;
    }
    step = step === undefined ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }

  Range.prototype.toString = function () {
    if (this.size === 0) {
      return 'Range []';
    }
    return 'Range [ ' + this._start + '...' + this._end + (this._step > 1 ? ' by ' + this._step : '') + ' ]';
  };

  Range.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };

  Range.prototype.includes = function (searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };

  Range.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range(0, 0);
    }
    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
  };

  Range.prototype.indexOf = function (searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };

  Range.prototype.lastIndexOf = function (searchValue) {
    return this.indexOf(searchValue);
  };

  Range.prototype.__iterate = function (fn, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(value, ii, this) === false) {
        return ii + 1;
      }
      value += reverse ? -step : step;
    }
    return ii;
  };

  Range.prototype.__iterator = function (type, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    var ii = 0;
    return new Iterator(function () {
      var v = value;
      value += reverse ? -step : step;
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
    });
  };

  Range.prototype.equals = function (other) {
    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };

  var EMPTY_RANGE;

  createClass(Collection, Iterable);
  function Collection() {
    throw TypeError('Abstract');
  }

  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
    a = a | 0; // int
    b = b | 0; // int
    var c = a & 0xffff;
    var d = b & 0xffff;
    // Shift by 0 fixes the sign on the high part.
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
  };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function () {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = function () {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }();

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          // Element
          return node.uniqueID;
        case 9:
          // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
  }

  createClass(Map, KeyedCollection);

  // @pragma Construction

  function Map(value) {
    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  Map.prototype.toString = function () {
    return this.__toString('Map {', '}');
  };

  // @pragma Access

  Map.prototype.get = function (k, notSetValue) {
    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
  };

  // @pragma Modification

  Map.prototype.set = function (k, v) {
    return updateMap(this, k, v);
  };

  Map.prototype.setIn = function (keyPath, v) {
    return this.updateIn(keyPath, NOT_SET, function () {
      return v;
    });
  };

  Map.prototype.remove = function (k) {
    return updateMap(this, k, NOT_SET);
  };

  Map.prototype.deleteIn = function (keyPath) {
    return this.updateIn(keyPath, function () {
      return NOT_SET;
    });
  };

  Map.prototype.update = function (k, notSetValue, updater) {
    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
  };

  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = undefined;
    }
    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
    return updatedValue === NOT_SET ? undefined : updatedValue;
  };

  Map.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };

  // @pragma Composition

  Map.prototype.merge = function () /*...iters*/{
    return mergeIntoMapWith(this, undefined, arguments);
  };

  Map.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, merger, iters);
  };

  Map.prototype.mergeIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoMapWith(this, deepMerger, arguments);
  };

  Map.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
  };

  Map.prototype.mergeDeepIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.sort = function (comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator));
  };

  Map.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator, mapper));
  };

  // @pragma Mutability

  Map.prototype.withMutations = function (fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  };

  Map.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  };

  Map.prototype.asImmutable = function () {
    return this.__ensureOwner();
  };

  Map.prototype.wasAltered = function () {
    return this.__altered;
  };

  Map.prototype.__iterator = function (type, reverse) {
    return new MapIterator(this, type, reverse);
  };

  Map.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    this._root && this._root.iterate(function (entry) {
      iterations++;
      return fn(entry[1], entry[0], this$0);
    }, reverse);
    return iterations;
  };

  Map.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };

  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;

  // #pragma Trie Nodes


  function ArrayMapNode(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  }

  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && entries.length === 1) {
      return; // undefined
    }

    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new ArrayMapNode(ownerID, newEntries);
  };

  function BitmapIndexedNode(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  }

  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
  };

  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;

    if (!exists && value === NOT_SET) {
      return this;
    }

    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : undefined;
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

    if (newNode === node) {
      return this;
    }

    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }

    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }

    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }

    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };

  function HashArrayMapNode(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  }

  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };

  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];

    if (removed && !node) {
      return this;
    }

    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }

    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }

    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };

  function HashCollisionNode(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  }

  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }

    var removed = value === NOT_SET;

    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };

  function ValueNode(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  }

  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };

  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }

    SetRef(didAlter);

    if (removed) {
      SetRef(didChangeSize);
      return; // undefined
    }

    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }

    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };

  // #pragma Iterators

  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

  function MapIterator(map, type, reverse) {
    this._type = type;
    this._reverse = reverse;
    this._stack = map._root && mapIteratorFrame(map._root);
  }

  MapIterator.prototype.next = function () {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };

  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function (existing, value, key) {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function (collection) {
      var mergeIntoMap = merger ? function (value, key) {
        collection.update(key, NOT_SET, function (existing) {
          return existing === NOT_SET ? value : merger(existing, value, key);
        });
      } : function (value, key) {
        collection.set(key, value);
      };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - (x >> 1 & 0x55555555);
    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
    x = x + (x >> 4) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

  // @pragma Construction

  function List(value) {
    var empty = emptyList();
    if (value === null || value === undefined) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedIterable(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function (list) {
      list.setSize(size);
      iter.forEach(function (v, i) {
        return list.set(i, v);
      });
    });
  }

  List.of = function () /*...values*/{
    return this(arguments);
  };

  List.prototype.toString = function () {
    return this.__toString('List [', ']');
  };

  // @pragma Access

  List.prototype.get = function (index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };

  // @pragma Modification

  List.prototype.set = function (index, value) {
    return updateList(this, index, value);
  };

  List.prototype.remove = function (index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };

  List.prototype.insert = function (index, value) {
    return this.splice(index, 0, value);
  };

  List.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };

  List.prototype.push = function () /*...values*/{
    var values = arguments;
    var oldSize = this.size;
    return this.withMutations(function (list) {
      setListBounds(list, 0, oldSize + values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(oldSize + ii, values[ii]);
      }
    });
  };

  List.prototype.pop = function () {
    return setListBounds(this, 0, -1);
  };

  List.prototype.unshift = function () /*...values*/{
    var values = arguments;
    return this.withMutations(function (list) {
      setListBounds(list, -values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(ii, values[ii]);
      }
    });
  };

  List.prototype.shift = function () {
    return setListBounds(this, 1);
  };

  // @pragma Composition

  List.prototype.merge = function () /*...iters*/{
    return mergeIntoListWith(this, undefined, arguments);
  };

  List.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, merger, iters);
  };

  List.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoListWith(this, deepMerger, arguments);
  };

  List.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, deepMergerWith(merger), iters);
  };

  List.prototype.setSize = function (size) {
    return setListBounds(this, 0, size);
  };

  // @pragma Iteration

  List.prototype.slice = function (begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };

  List.prototype.__iterator = function (type, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    return new Iterator(function () {
      var value = values();
      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
    });
  };

  List.prototype.__iterate = function (fn, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    var value;
    while ((value = values()) !== DONE) {
      if (fn(value, index++, this) === false) {
        break;
      }
    }
    return index;
  };

  List.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };

  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;

  function VNode(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  }

  // TODO: seems like these methods are very similar

  VNode.prototype.removeBefore = function (ownerID, level, index) {
    if (index === level ? 1 << level : 0 || this.array.length === 0) {
      return this;
    }
    var originIndex = index >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = undefined;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };

  VNode.prototype.removeAfter = function (ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }

    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }

    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };

  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function (list) {
        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = index >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

      // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }

  createClass(OrderedMap, Map);

  // @pragma Construction

  function OrderedMap(value) {
    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  OrderedMap.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedMap.prototype.toString = function () {
    return this.__toString('OrderedMap {', '}');
  };

  // @pragma Access

  OrderedMap.prototype.get = function (k, notSetValue) {
    var index = this._map.get(k);
    return index !== undefined ? this._list.get(index)[1] : notSetValue;
  };

  // @pragma Modification

  OrderedMap.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      return this;
    }
    return emptyOrderedMap();
  };

  OrderedMap.prototype.set = function (k, v) {
    return updateOrderedMap(this, k, v);
  };

  OrderedMap.prototype.remove = function (k) {
    return updateOrderedMap(this, k, NOT_SET);
  };

  OrderedMap.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  };

  OrderedMap.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._list.__iterate(function (entry) {
      return entry && fn(entry[1], entry[0], this$0);
    }, reverse);
  };

  OrderedMap.prototype.__iterator = function (type, reverse) {
    return this._list.fromEntrySeq().__iterator(type, reverse);
  };

  OrderedMap.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };

  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function (entry, idx) {
          return entry !== undefined && i !== idx;
        });
        newMap = newList.toKeyedSeq().map(function (entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
  function ToKeyedSequence(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }

  ToKeyedSequence.prototype.get = function (key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };

  ToKeyedSequence.prototype.has = function (key) {
    return this._iter.has(key);
  };

  ToKeyedSequence.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  };

  ToKeyedSequence.prototype.reverse = function () {
    var this$0 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function () {
        return this$0._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };

  ToKeyedSequence.prototype.map = function (mapper, context) {
    var this$0 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function () {
        return this$0._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };

  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var ii;
    return this._iter.__iterate(this._useKeys ? function (v, k) {
      return fn(v, k, this$0);
    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
      return fn(v, reverse ? --ii : ii++, this$0);
    }), reverse);
  };

  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
    if (this._useKeys) {
      return this._iter.__iterator(type, reverse);
    }
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var ii = reverse ? resolveSize(this) : 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
    });
  };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(ToIndexedSequence, IndexedSeq);
  function ToIndexedSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToIndexedSequence.prototype.includes = function (value) {
    return this._iter.includes(value);
  };

  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    return this._iter.__iterate(function (v) {
      return fn(v, iterations++, this$0);
    }, reverse);
  };

  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
    });
  };

  createClass(ToSetSequence, SetSeq);
  function ToSetSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToSetSequence.prototype.has = function (key) {
    return this._iter.includes(key);
  };

  ToSetSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (v) {
      return fn(v, v, this$0);
    }, reverse);
  };

  ToSetSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };

  createClass(FromEntriesSequence, KeyedSeq);
  function FromEntriesSequence(entries) {
    this._iter = entries;
    this.size = entries.size;
  }

  FromEntriesSequence.prototype.entrySeq = function () {
    return this._iter.toSeq();
  };

  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (entry) {
      // Check if entry exists first so array access doesn't throw for holes
      // in the parent iteration.
      if (entry) {
        validateEntry(entry);
        var indexedIterable = isIterable(entry);
        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
      }
    }, reverse);
  };

  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
        }
      }
    });
  };

  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function () {
      return iterable;
    };
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function () {
        return iterable.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function (key) {
      return iterable.includes(key);
    };
    flipSequence.includes = function (key) {
      return iterable.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(k, v, this$0) !== false;
      }, reverse);
    };
    flipSequence.__iteratorUncached = function (type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
    };
    return flipSequence;
  }

  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function (key) {
      return iterable.has(key);
    };
    mappedSequence.get = function (key, notSetValue) {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
      }, reverse);
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
      });
    };
    return mappedSequence;
  }

  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function () {
      return iterable;
    };
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function () {
          return iterable.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function (key, notSetValue) {
      return iterable.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function (key) {
      return iterable.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function (value) {
      return iterable.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(v, k, this$0);
      }, !reverse);
    };
    reversedSequence.__iterator = function (type, reverse) {
      return iterable.__iterator(type, !reverse);
    };
    return reversedSequence;
  }

  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function (key) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function (key, notSetValue) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }

  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
        return a + 1;
      });
    });
    return groups.asImmutable();
  }

  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), function (a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      });
    });
    var coerce = iterableClass(iterable);
    return groups.map(function (arr) {
      return reify(iterable, coerce(arr));
    });
  }

  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function (type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function () {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }

  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
      });
      return iterations;
    };
    takeSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function () {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }

  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function () {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }

  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function (v) {
      if (!isIterable(v)) {
        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function (v) {
      return v.size !== 0;
    });

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function (sum, seq) {
      if (sum !== undefined) {
        var size = seq.size;
        if (size !== undefined) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }

  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function (fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        var this$0 = this;
        iter.__iterate(function (v, k) {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function () {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }

  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(function (v, k) {
      return coerce(mapper.call(context, v, k, iterable));
    }).flatten(true);
  }

  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
    interposedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
      }, reverse);
      return iterations;
    };
    interposedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function () {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }

  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(function (v, k) {
      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
    }).toArray();
    entries.sort(function (a, b) {
      return comparator(a[3], b[3]) || a[2] - b[2];
    }).forEach(isKeyedIterable ? function (v, i) {
      entries[i].length = 2;
    } : function (v, i) {
      entries[i] = v[1];
    });
    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
  }

  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq().map(function (v, k) {
        return [v, mapper(v, k, iterable)];
      }).reduce(function (a, b) {
        return maxCompare(comparator, a[1], b[1]) ? b : a;
      });
      return entry && entry[0];
    } else {
      return iterable.reduce(function (a, b) {
        return maxCompare(comparator, a, b) ? b : a;
      });
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
  }

  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function (i) {
      return i.size;
    }).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function (fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function (type, reverse) {
      var iterators = iters.map(function (i) {
        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
      });
      var iterations = 0;
      var isDone = false;
      return new Iterator(function () {
        var steps;
        if (!isDone) {
          steps = iterators.map(function (i) {
            return i.next();
          });
          isDone = steps.some(function (s) {
            return s.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
          return s.value;
        })));
      });
    };
    return zipSequence;
  }

  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

  function Record(defaultValues, name) {
    var hasInitialized;

    var RecordType = function Record(values) {
      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        setProps(RecordTypePrototype, keys);
        RecordTypePrototype.size = keys.length;
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
      }
      this._map = Map(values);
    };

    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;

    return RecordType;
  }

  Record.prototype.toString = function () {
    return this.__toString(recordName(this) + ' {', '}');
  };

  // @pragma Access

  Record.prototype.has = function (k) {
    return this._defaultValues.hasOwnProperty(k);
  };

  Record.prototype.get = function (k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var defaultVal = this._defaultValues[k];
    return this._map ? this._map.get(k, defaultVal) : defaultVal;
  };

  // @pragma Modification

  Record.prototype.clear = function () {
    if (this.__ownerID) {
      this._map && this._map.clear();
      return this;
    }
    var RecordType = this.constructor;
    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
  };

  Record.prototype.set = function (k, v) {
    if (!this.has(k)) {
      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
    }
    var newMap = this._map && this._map.set(k, v);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.remove = function (k) {
    if (!this.has(k)) {
      return this;
    }
    var newMap = this._map && this._map.remove(k);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Record.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterator(type, reverse);
  };

  Record.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterate(fn, reverse);
  };

  Record.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map && this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return makeRecord(this, newMap, ownerID);
  };

  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;

  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function () {
        return this.get(name);
      },
      set: function (value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

  // @pragma Construction

  function Set(value) {
    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  Set.of = function () /*...values*/{
    return this(arguments);
  };

  Set.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  Set.prototype.toString = function () {
    return this.__toString('Set {', '}');
  };

  // @pragma Access

  Set.prototype.has = function (value) {
    return this._map.has(value);
  };

  // @pragma Modification

  Set.prototype.add = function (value) {
    return updateSet(this, this._map.set(value, true));
  };

  Set.prototype.remove = function (value) {
    return updateSet(this, this._map.remove(value));
  };

  Set.prototype.clear = function () {
    return updateSet(this, this._map.clear());
  };

  // @pragma Composition

  Set.prototype.union = function () {
    var iters = SLICE$0.call(arguments, 0);
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function (set) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetIterable(iters[ii]).forEach(function (value) {
          return set.add(value);
        });
      }
    });
  };

  Set.prototype.intersect = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (!iters.every(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.subtract = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (iters.some(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.merge = function () {
    return this.union.apply(this, arguments);
  };

  Set.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return this.union.apply(this, iters);
  };

  Set.prototype.sort = function (comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator));
  };

  Set.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator, mapper));
  };

  Set.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Set.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._map.__iterate(function (_, k) {
      return fn(k, k, this$0);
    }, reverse);
  };

  Set.prototype.__iterator = function (type, reverse) {
    return this._map.map(function (_, k) {
      return k;
    }).__iterator(type, reverse);
  };

  Set.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };

  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

  // @pragma Construction

  function OrderedSet(value) {
    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  OrderedSet.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedSet.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  OrderedSet.prototype.toString = function () {
    return this.__toString('OrderedSet {', '}');
  };

  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

  // @pragma Construction

  function Stack(value) {
    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
  }

  Stack.of = function () /*...values*/{
    return this(arguments);
  };

  Stack.prototype.toString = function () {
    return this.__toString('Stack [', ']');
  };

  // @pragma Access

  Stack.prototype.get = function (index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };

  Stack.prototype.peek = function () {
    return this._head && this._head.value;
  };

  // @pragma Modification

  Stack.prototype.push = function () /*...values*/{
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pushAll = function (iter) {
    iter = IndexedIterable(iter);
    if (iter.size === 0) {
      return this;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.reverse().forEach(function (value) {
      newSize++;
      head = {
        value: value,
        next: head
      };
    });
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pop = function () {
    return this.slice(1);
  };

  Stack.prototype.unshift = function () /*...values*/{
    return this.push.apply(this, arguments);
  };

  Stack.prototype.unshiftAll = function (iter) {
    return this.pushAll(iter);
  };

  Stack.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  };

  Stack.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = undefined;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };

  Stack.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      // super.slice(begin, end);
      return IndexedCollection.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  // @pragma Mutability

  Stack.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };

  // @pragma Iteration

  Stack.prototype.__iterate = function (fn, reverse) {
    if (reverse) {
      return this.reverse().__iterate(fn);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };

  Stack.prototype.__iterator = function (type, reverse) {
    if (reverse) {
      return this.reverse().__iterator(type);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function () {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };

  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;

  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function (key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function () {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function (v, i) {
        array[i] = v;
      });
      return array;
    },

    toIndexedSeq: function () {
      return new ToIndexedSequence(this);
    },

    toJS: function () {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJS === 'function' ? value.toJS() : value;
      }).__toJS();
    },

    toJSON: function () {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
      }).__toJS();
    },

    toKeyedSeq: function () {
      return new ToKeyedSequence(this, true);
    },

    toMap: function () {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function () {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function (v, k) {
        object[k] = v;
      });
      return object;
    },

    toOrderedMap: function () {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function () {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function () {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function () {
      return new ToSetSequence(this);
    },

    toSeq: function () {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },

    toStack: function () {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function () {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },

    // ### Common JavaScript methods and properties

    toString: function () {
      return '[Iterable]';
    },

    __toString: function (head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function () {
      var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function (searchValue) {
      return this.some(function (value) {
        return is(value, searchValue);
      });
    },

    entries: function () {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function (predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function (v, k, c) {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function (predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function (predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    findEntry: function (predicate, context) {
      var found;
      this.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findLastEntry: function (predicate, context) {
      return this.toSeq().reverse().findEntry(predicate, context);
    },

    forEach: function (sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function (separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function (v) {
        isFirst ? isFirst = false : joined += separator;
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function () {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function (mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function (reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function (v, k, c) {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function (reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function () {
      return reify(this, reverseFactory(this, true));
    },

    slice: function (begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function (predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function (comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function () {
      return this.__iterator(ITERATE_VALUES);
    },

    // ### More sequential methods

    butLast: function () {
      return this.slice(0, -1);
    },

    isEmpty: function () {
      return this.size !== undefined ? this.size === 0 : !this.some(function () {
        return true;
      });
    },

    count: function (predicate, context) {
      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
    },

    countBy: function (grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function (other) {
      return deepEqual(this, other);
    },

    entrySeq: function () {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function () {
        return iterable.toSeq();
      };
      return entriesSequence;
    },

    filterNot: function (predicate, context) {
      return this.filter(not(predicate), context);
    },

    findLast: function (predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    first: function () {
      return this.find(returnTrue);
    },

    flatMap: function (mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function (depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function () {
      return new FromEntriesSequence(this);
    },

    get: function (searchKey, notSetValue) {
      return this.find(function (_, key) {
        return is(key, searchKey);
      }, undefined, notSetValue);
    },

    getIn: function (searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function (grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function (searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function (searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function (iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function (value) {
        return iter.includes(value);
      });
    },

    isSuperset: function (iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keySeq: function () {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function () {
      return this.toSeq().reverse().first();
    },

    max: function (comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function (mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function (comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function (mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function () {
      return this.slice(1);
    },

    skip: function (amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function (amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function (predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function (predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function (mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function (amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function (amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function (predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function (predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function () {
      return this.toIndexedSeq();
    },

    // ### Hashable Object

    hashCode: function () {
      return this.__hash || (this.__hash = hashIterable(this));
    }

    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect = IterablePrototype.toSource = function () {
    return this.toString();
  };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  // Temporary warning about using length
  (function () {
    try {
      Object.defineProperty(IterablePrototype, 'length', {
        get: function () {
          if (!Iterable.noLengthWarning) {
            var stack;
            try {
              throw new Error();
            } catch (error) {
              stack = error.stack;
            }
            if (stack.indexOf('_wrapObject') === -1) {
              console && console.warn && console.warn('iterable.length has been deprecated, ' + 'use iterable.size or iterable.count(). ' + 'This warning will become a silent error in a future version. ' + stack);
              return this.size;
            }
          }
        }
      });
    } catch (e) {}
  })();

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function () {
      return reify(this, flipFactory(this));
    },

    findKey: function (predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLastKey: function (predicate, context) {
      return this.toSeq().reverse().findKey(predicate, context);
    },

    keyOf: function (searchValue) {
      return this.findKey(function (value) {
        return is(value, searchValue);
      });
    },

    lastKeyOf: function (searchValue) {
      return this.findLastKey(function (value) {
        return is(value, searchValue);
      });
    },

    mapEntries: function (mapper, context) {
      var this$0 = this;
      var iterations = 0;
      return reify(this, this.toSeq().map(function (v, k) {
        return mapper.call(context, [k, v], iterations++, this$0);
      }).fromEntrySeq());
    },

    mapKeys: function (mapper, context) {
      var this$0 = this;
      return reify(this, this.toSeq().flip().map(function (k, v) {
        return mapper.call(context, k, v, this$0);
      }).flip());
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function (v, k) {
    return JSON.stringify(k) + ': ' + quoteString(v);
  };

  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function () {
      return new ToKeyedSequence(this, false);
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function (predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function (predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function (searchValue) {
      var key = this.toKeyedSeq().keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function (searchValue) {
      var key = this.toKeyedSeq().reverse().keyOf(searchValue);
      return key === undefined ? -1 : key;

      // var index =
      // return this.toSeq().reverse().indexOf(searchValue);
    },

    reverse: function () {
      return reify(this, reverseFactory(this, false));
    },

    slice: function (begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function (index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
    },

    // ### More collection methods

    findLastIndex: function (predicate, context) {
      var key = this.toKeyedSeq().findLastKey(predicate, context);
      return key === undefined ? -1 : key;
    },

    first: function () {
      return this.get(0);
    },

    flatten: function (depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function (index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
        return key === index;
      }, undefined, notSetValue);
    },

    has: function (index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
    },

    interpose: function (separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function () /*...iterables*/{
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    last: function () {
      return this.get(-1);
    },

    skipWhile: function (predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function () /*, ...iterables */{
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function (zipper /*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function (value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function (value) {
      return this.has(value);
    },

    // ### More sequential methods

    keySeq: function () {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;

  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);

  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }

  function neg(predicate) {
    return function () {
      return -predicate.apply(this, arguments);
    };
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : value;
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function (v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function (v) {
      h = 31 * h + hash(v) | 0;
    } : function (v) {
      h = h + hash(v) | 0;
    });
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;
});
},{}],25:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BlockMapBuilder
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');

var OrderedMap = Immutable.OrderedMap;


var BlockMapBuilder = {
  createFromArray: function createFromArray(blocks) {
    return OrderedMap(blocks.map(function (block) {
      return [block.getKey(), block];
    }));
  }
};

module.exports = BlockMapBuilder;
},{"immutable":132}],26:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CharacterMetadata
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Map = _require.Map,
    OrderedSet = _require.OrderedSet,
    Record = _require.Record;

// Immutable.map is typed such that the value for every key in the map
// must be the same type


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  style: EMPTY_SET,
  entity: null
};

var CharacterMetadataRecord = Record(defaultRecord);

var CharacterMetadata = function (_CharacterMetadataRec) {
  _inherits(CharacterMetadata, _CharacterMetadataRec);

  function CharacterMetadata() {
    _classCallCheck(this, CharacterMetadata);

    return _possibleConstructorReturn(this, _CharacterMetadataRec.apply(this, arguments));
  }

  CharacterMetadata.prototype.getStyle = function getStyle() {
    return this.get('style');
  };

  CharacterMetadata.prototype.getEntity = function getEntity() {
    return this.get('entity');
  };

  CharacterMetadata.prototype.hasStyle = function hasStyle(style) {
    return this.getStyle().includes(style);
  };

  CharacterMetadata.applyStyle = function applyStyle(record, style) {
    var withStyle = record.set('style', record.getStyle().add(style));
    return CharacterMetadata.create(withStyle);
  };

  CharacterMetadata.removeStyle = function removeStyle(record, style) {
    var withoutStyle = record.set('style', record.getStyle().remove(style));
    return CharacterMetadata.create(withoutStyle);
  };

  CharacterMetadata.applyEntity = function applyEntity(record, entityKey) {
    var withEntity = record.getEntity() === entityKey ? record : record.set('entity', entityKey);
    return CharacterMetadata.create(withEntity);
  };

  /**
   * Use this function instead of the `CharacterMetadata` constructor.
   * Since most content generally uses only a very small number of
   * style/entity permutations, we can reuse these objects as often as
   * possible.
   */


  CharacterMetadata.create = function create(config) {
    if (!config) {
      return EMPTY;
    }

    var defaultConfig = {
      style: EMPTY_SET,
      entity: null
    };

    // Fill in unspecified properties, if necessary.
    var configMap = Map(defaultConfig).merge(config);

    var existing = pool.get(configMap);
    if (existing) {
      return existing;
    }

    var newCharacter = new CharacterMetadata(configMap);
    pool = pool.set(configMap, newCharacter);
    return newCharacter;
  };

  return CharacterMetadata;
}(CharacterMetadataRecord);

var EMPTY = new CharacterMetadata();
var pool = Map([[Map(defaultRecord), EMPTY]]);

CharacterMetadata.EMPTY = EMPTY;

module.exports = CharacterMetadata;
},{"immutable":132}],90:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findRangesImmutable
 * @format
 * 
 */

'use strict';

/**
 * Search through an array to find contiguous stretches of elements that
 * match a specified filter function.
 *
 * When ranges are found, execute a specified `found` function to supply
 * the values to the caller.
 */
function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
  if (!haystack.size) {
    return;
  }

  var cursor = 0;

  haystack.reduce(function (value, nextValue, nextIndex) {
    if (!areEqualFn(value, nextValue)) {
      if (filterFn(value)) {
        foundFn(cursor, nextIndex);
      }
      cursor = nextIndex;
    }
    return nextValue;
  });

  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
}

module.exports = findRangesImmutable;
},{}],28:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentBlock
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CharacterMetadata = require('./CharacterMetadata');
var Immutable = require('immutable');

var findRangesImmutable = require('./findRangesImmutable');

var List = Immutable.List,
    Map = Immutable.Map,
    OrderedSet = Immutable.OrderedSet,
    Record = Immutable.Record,
    Repeat = Immutable.Repeat;


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  key: '',
  type: 'unstyled',
  text: '',
  characterList: List(),
  depth: 0,
  data: Map()
};

var ContentBlockRecord = Record(defaultRecord);

var decorateCharacterList = function decorateCharacterList(config) {
  if (!config) {
    return config;
  }

  var characterList = config.characterList,
      text = config.text;


  if (text && !characterList) {
    config.characterList = List(Repeat(CharacterMetadata.EMPTY, text.length));
  }

  return config;
};

var ContentBlock = function (_ContentBlockRecord) {
  _inherits(ContentBlock, _ContentBlockRecord);

  function ContentBlock(config) {
    _classCallCheck(this, ContentBlock);

    return _possibleConstructorReturn(this, _ContentBlockRecord.call(this, decorateCharacterList(config)));
  }

  ContentBlock.prototype.getKey = function getKey() {
    return this.get('key');
  };

  ContentBlock.prototype.getType = function getType() {
    return this.get('type');
  };

  ContentBlock.prototype.getText = function getText() {
    return this.get('text');
  };

  ContentBlock.prototype.getCharacterList = function getCharacterList() {
    return this.get('characterList');
  };

  ContentBlock.prototype.getLength = function getLength() {
    return this.getText().length;
  };

  ContentBlock.prototype.getDepth = function getDepth() {
    return this.get('depth');
  };

  ContentBlock.prototype.getData = function getData() {
    return this.get('data');
  };

  ContentBlock.prototype.getInlineStyleAt = function getInlineStyleAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getStyle() : EMPTY_SET;
  };

  ContentBlock.prototype.getEntityAt = function getEntityAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getEntity() : null;
  };

  /**
   * Execute a callback for every contiguous range of styles within the block.
   */


  ContentBlock.prototype.findStyleRanges = function findStyleRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
  };

  /**
   * Execute a callback for every contiguous range of entities within the block.
   */


  ContentBlock.prototype.findEntityRanges = function findEntityRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
  };

  return ContentBlock;
}(ContentBlockRecord);

function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
}

function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
}

module.exports = ContentBlock;
},{"./CharacterMetadata":26,"immutable":132,"./findRangesImmutable":90}],87:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentBlockNode
 * @format
 * 
 *
 * This file is a fork of ContentBlock adding support for nesting references by
 * providing links to children, parent, prevSibling, and nextSibling.
 *
 * This is unstable and not part of the public API and should not be used by
 * production systems. This file may be update/removed without notice.
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CharacterMetadata = require('./CharacterMetadata');
var Immutable = require('immutable');

var findRangesImmutable = require('./findRangesImmutable');

var List = Immutable.List,
    Map = Immutable.Map,
    OrderedSet = Immutable.OrderedSet,
    Record = Immutable.Record,
    Repeat = Immutable.Repeat;


var EMPTY_SET = OrderedSet();

var defaultRecord = {
  parent: null,
  characterList: List(),
  data: Map(),
  depth: 0,
  key: '',
  text: '',
  type: 'unstyled',
  children: List(),
  prevSibling: null,
  nextSibling: null
};

var haveEqualStyle = function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
};

var haveEqualEntity = function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
};

var decorateCharacterList = function decorateCharacterList(config) {
  if (!config) {
    return config;
  }

  var characterList = config.characterList,
      text = config.text;


  if (text && !characterList) {
    config.characterList = List(Repeat(CharacterMetadata.EMPTY, text.length));
  }

  return config;
};

var ContentBlockNode = function (_Record) {
  _inherits(ContentBlockNode, _Record);

  function ContentBlockNode() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRecord;

    _classCallCheck(this, ContentBlockNode);

    return _possibleConstructorReturn(this, _Record.call(this, decorateCharacterList(props)));
  }

  ContentBlockNode.prototype.getKey = function getKey() {
    return this.get('key');
  };

  ContentBlockNode.prototype.getType = function getType() {
    return this.get('type');
  };

  ContentBlockNode.prototype.getText = function getText() {
    return this.get('text');
  };

  ContentBlockNode.prototype.getCharacterList = function getCharacterList() {
    return this.get('characterList');
  };

  ContentBlockNode.prototype.getLength = function getLength() {
    return this.getText().length;
  };

  ContentBlockNode.prototype.getDepth = function getDepth() {
    return this.get('depth');
  };

  ContentBlockNode.prototype.getData = function getData() {
    return this.get('data');
  };

  ContentBlockNode.prototype.getInlineStyleAt = function getInlineStyleAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getStyle() : EMPTY_SET;
  };

  ContentBlockNode.prototype.getEntityAt = function getEntityAt(offset) {
    var character = this.getCharacterList().get(offset);
    return character ? character.getEntity() : null;
  };

  ContentBlockNode.prototype.getChildKeys = function getChildKeys() {
    return this.get('children');
  };

  ContentBlockNode.prototype.getParentKey = function getParentKey() {
    return this.get('parent');
  };

  ContentBlockNode.prototype.getPrevSiblingKey = function getPrevSiblingKey() {
    return this.get('prevSibling');
  };

  ContentBlockNode.prototype.getNextSiblingKey = function getNextSiblingKey() {
    return this.get('nextSibling');
  };

  ContentBlockNode.prototype.findStyleRanges = function findStyleRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
  };

  ContentBlockNode.prototype.findEntityRanges = function findEntityRanges(filterFn, callback) {
    findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
  };

  return ContentBlockNode;
}(Record(defaultRecord));

module.exports = ContentBlockNode;
},{"./CharacterMetadata":26,"immutable":132,"./findRangesImmutable":90}],138:[function(require,module,exports) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftFeatureFlags-core
 * @format
 * 
 */

'use strict';

var DraftFeatureFlags = {
  draft_killswitch_allow_nontextnodes: false,
  draft_segmented_entities_behavior: false,
  draft_handlebeforeinput_composed_text: false,
  draft_tree_data_support: false
};

module.exports = DraftFeatureFlags;
},{}],88:[function(require,module,exports) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftFeatureFlags
 * @format
 * 
 */

'use strict';

var DraftFeatureFlags = require('./DraftFeatureFlags-core');

module.exports = DraftFeatureFlags;
},{"./DraftFeatureFlags-core":138}],92:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentStateInlineStyle
 * @format
 * 
 */

'use strict';

var CharacterMetadata = require('./CharacterMetadata');

var _require = require('immutable'),
    Map = _require.Map;

var ContentStateInlineStyle = {
  add: function add(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, true);
  },

  remove: function remove(contentState, selectionState, inlineStyle) {
    return modifyInlineStyle(contentState, selectionState, inlineStyle, false);
  }
};

function modifyInlineStyle(contentState, selectionState, inlineStyle, addOrRemove) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart;
    var sliceEnd;

    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    var chars = block.getCharacterList();
    var current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      chars = chars.set(sliceStart, addOrRemove ? CharacterMetadata.applyStyle(current, inlineStyle) : CharacterMetadata.removeStyle(current, inlineStyle));
      sliceStart++;
    }

    return block.set('characterList', chars);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = ContentStateInlineStyle;
},{"./CharacterMetadata":26,"immutable":132}],139:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule applyEntityToContentBlock
 * @format
 * 
 */

'use strict';

var CharacterMetadata = require('./CharacterMetadata');

function applyEntityToContentBlock(contentBlock, start, end, entityKey) {
  var characterList = contentBlock.getCharacterList();
  while (start < end) {
    characterList = characterList.set(start, CharacterMetadata.applyEntity(characterList.get(start), entityKey));
    start++;
  }
  return contentBlock.set('characterList', characterList);
}

module.exports = applyEntityToContentBlock;
},{"./CharacterMetadata":26}],93:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule applyEntityToContentState
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');

var applyEntityToContentBlock = require('./applyEntityToContentBlock');

function applyEntityToContentState(contentState, selectionState, entityKey) {
  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var newBlocks = blockMap.skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).toOrderedMap().merge(Immutable.OrderedMap([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
    var sliceStart = blockKey === startKey ? startOffset : 0;
    var sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    return applyEntityToContentBlock(block, sliceStart, sliceEnd, entityKey);
  });

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = applyEntityToContentState;
},{"immutable":132,"./applyEntityToContentBlock":139}],140:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntitySegments
 * @format
 * 
 */

'use strict';

/**
 * Identify the range to delete from a segmented entity.
 *
 * Rules:
 *
 *  Example: 'John F. Kennedy'
 *
 *   - Deletion from within any non-whitespace (i.e. ['John', 'F.', 'Kennedy'])
 *     will return the range of that text.
 *
 *       'John F. Kennedy' -> 'John F.'
 *                  ^
 *
 *   - Forward deletion of whitespace will remove the following section:
 *
 *       'John F. Kennedy' -> 'John Kennedy'
 *            ^
 *
 *   - Backward deletion of whitespace will remove the previous section:
 *
 *       'John F. Kennedy' -> 'F. Kennedy'
 *            ^
 */
var DraftEntitySegments = {
  getRemovalRange: function getRemovalRange(selectionStart, selectionEnd, text, entityStart, direction) {
    var segments = text.split(' ');
    segments = segments.map(function ( /*string*/segment, /*number*/ii) {
      if (direction === 'forward') {
        if (ii > 0) {
          return ' ' + segment;
        }
      } else if (ii < segments.length - 1) {
        return segment + ' ';
      }
      return segment;
    });

    var segmentStart = entityStart;
    var segmentEnd;
    var segment;
    var removalStart = null;
    var removalEnd = null;

    for (var jj = 0; jj < segments.length; jj++) {
      segment = segments[jj];
      segmentEnd = segmentStart + segment.length;

      // Our selection overlaps this segment.
      if (selectionStart < segmentEnd && segmentStart < selectionEnd) {
        if (removalStart !== null) {
          removalEnd = segmentEnd;
        } else {
          removalStart = segmentStart;
          removalEnd = segmentEnd;
        }
      } else if (removalStart !== null) {
        break;
      }

      segmentStart = segmentEnd;
    }

    var entityEnd = entityStart + text.length;
    var atStart = removalStart === entityStart;
    var atEnd = removalEnd === entityEnd;

    if (!atStart && atEnd || atStart && !atEnd) {
      if (direction === 'forward') {
        if (removalEnd !== entityEnd) {
          removalEnd++;
        }
      } else if (removalStart !== entityStart) {
        removalStart--;
      }
    }

    return {
      start: removalStart,
      end: removalEnd
    };
  }
};

module.exports = DraftEntitySegments;
},{}],141:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangesForDraftEntity
 * @format
 * 
 */

'use strict';

var invariant = require('fbjs/lib/invariant');

/**
 * Obtain the start and end positions of the range that has the
 * specified entity applied to it.
 *
 * Entity keys are applied only to contiguous stretches of text, so this
 * method searches for the first instance of the entity key and returns
 * the subsequent range.
 */
function getRangesForDraftEntity(block, key) {
  var ranges = [];
  block.findEntityRanges(function (c) {
    return c.getEntity() === key;
  }, function (start, end) {
    ranges.push({ start: start, end: end });
  });

  !!!ranges.length ? 'production' !== 'production' ? invariant(false, 'Entity key not found in this range.') : invariant(false) : void 0;

  return ranges;
}

module.exports = getRangesForDraftEntity;
},{"fbjs/lib/invariant":79}],94:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getCharacterRemovalRange
 * @format
 * 
 */

'use strict';

var DraftEntitySegments = require('./DraftEntitySegments');

var getRangesForDraftEntity = require('./getRangesForDraftEntity');
var invariant = require('fbjs/lib/invariant');

/**
 * Given a SelectionState and a removal direction, determine the entire range
 * that should be removed from a ContentState. This is based on any entities
 * within the target, with their `mutability` values taken into account.
 *
 * For instance, if we are attempting to remove part of an "immutable" entity
 * range, the entire entity must be removed. The returned `SelectionState`
 * will be adjusted accordingly.
 */
function getCharacterRemovalRange(entityMap, startBlock, endBlock, selectionState, direction) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var startEntityKey = startBlock.getEntityAt(start);
  var endEntityKey = endBlock.getEntityAt(end - 1);
  if (!startEntityKey && !endEntityKey) {
    return selectionState;
  }
  var newSelectionState = selectionState;
  if (startEntityKey && startEntityKey === endEntityKey) {
    newSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, true, true);
  } else if (startEntityKey && endEntityKey) {
    var startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    var endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      anchorOffset: startSelectionState.getAnchorOffset(),
      focusOffset: endSelectionState.getFocusOffset(),
      isBackward: false
    });
  } else if (startEntityKey) {
    var _startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
    newSelectionState = newSelectionState.merge({
      anchorOffset: _startSelectionState.getStartOffset(),
      isBackward: false
    });
  } else if (endEntityKey) {
    var _endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
    newSelectionState = newSelectionState.merge({
      focusOffset: _endSelectionState.getEndOffset(),
      isBackward: false
    });
  }
  return newSelectionState;
}

function getEntityRemovalRange(entityMap, block, selectionState, direction, entityKey, isEntireSelectionWithinEntity, isEntityAtStart) {
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var entity = entityMap.__get(entityKey);
  var mutability = entity.getMutability();
  var sideToConsider = isEntityAtStart ? start : end;

  // `MUTABLE` entities can just have the specified range of text removed
  // directly. No adjustments are needed.
  if (mutability === 'MUTABLE') {
    return selectionState;
  }

  // Find the entity range that overlaps with our removal range.
  var entityRanges = getRangesForDraftEntity(block, entityKey).filter(function (range) {
    return sideToConsider <= range.end && sideToConsider >= range.start;
  });

  !(entityRanges.length == 1) ? 'production' !== 'production' ? invariant(false, 'There should only be one entity range within this removal range.') : invariant(false) : void 0;

  var entityRange = entityRanges[0];

  // For `IMMUTABLE` entity types, we will remove the entire entity range.
  if (mutability === 'IMMUTABLE') {
    return selectionState.merge({
      anchorOffset: entityRange.start,
      focusOffset: entityRange.end,
      isBackward: false
    });
  }

  // For `SEGMENTED` entity types, determine the appropriate segment to
  // remove.
  if (!isEntireSelectionWithinEntity) {
    if (isEntityAtStart) {
      end = entityRange.end;
    } else {
      start = entityRange.start;
    }
  }

  var removalRange = DraftEntitySegments.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);

  return selectionState.merge({
    anchorOffset: removalRange.start,
    focusOffset: removalRange.end,
    isBackward: false
  });
}

module.exports = getCharacterRemovalRange;
},{"./DraftEntitySegments":140,"./getRangesForDraftEntity":141,"fbjs/lib/invariant":79}],44:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule generateRandomKey
 * @format
 * 
 */

'use strict';

var seenKeys = {};
var MULTIPLIER = Math.pow(2, 24);

function generateRandomKey() {
  var key = void 0;
  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  seenKeys[key] = true;
  return key;
}

module.exports = generateRandomKey;
},{}],142:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule randomizeBlockMapKeys
 * @format
 * 
 */

'use strict';

var ContentBlockNode = require('./ContentBlockNode');
var Immutable = require('immutable');

var generateRandomKey = require('./generateRandomKey');

var OrderedMap = Immutable.OrderedMap;


var randomizeContentBlockNodeKeys = function randomizeContentBlockNodeKeys(blockMap) {
  var newKeysRef = {};

  // we keep track of root blocks in order to update subsequent sibling links
  var lastRootBlock = void 0;

  return OrderedMap(blockMap.withMutations(function (blockMapState) {
    blockMapState.forEach(function (block, index) {
      var oldKey = block.getKey();
      var nextKey = block.getNextSiblingKey();
      var prevKey = block.getPrevSiblingKey();
      var childrenKeys = block.getChildKeys();
      var parentKey = block.getParentKey();

      // new key that we will use to build linking
      var key = generateRandomKey();

      // we will add it here to re-use it later
      newKeysRef[oldKey] = key;

      if (nextKey) {
        var nextBlock = blockMapState.get(nextKey);
        if (nextBlock) {
          blockMapState.setIn([nextKey, 'prevSibling'], key);
        } else {
          // this can happen when generating random keys for fragments
          blockMapState.setIn([oldKey, 'nextSibling'], null);
        }
      }

      if (prevKey) {
        var prevBlock = blockMapState.get(prevKey);
        if (prevBlock) {
          blockMapState.setIn([prevKey, 'nextSibling'], key);
        } else {
          // this can happen when generating random keys for fragments
          blockMapState.setIn([oldKey, 'prevSibling'], null);
        }
      }

      if (parentKey && blockMapState.get(parentKey)) {
        var parentBlock = blockMapState.get(parentKey);
        var parentChildrenList = parentBlock.getChildKeys();
        blockMapState.setIn([parentKey, 'children'], parentChildrenList.set(parentChildrenList.indexOf(block.getKey()), key));
      } else {
        // blocks will then be treated as root block nodes
        blockMapState.setIn([oldKey, 'parent'], null);

        if (lastRootBlock) {
          blockMapState.setIn([lastRootBlock.getKey(), 'nextSibling'], key);
          blockMapState.setIn([oldKey, 'prevSibling'], newKeysRef[lastRootBlock.getKey()]);
        }

        lastRootBlock = blockMapState.get(oldKey);
      }

      childrenKeys.forEach(function (childKey) {
        var childBlock = blockMapState.get(childKey);
        if (childBlock) {
          blockMapState.setIn([childKey, 'parent'], key);
        } else {
          blockMapState.setIn([oldKey, 'children'], block.getChildKeys().filter(function (child) {
            return child !== childKey;
          }));
        }
      });
    });
  }).toArray().map(function (block) {
    return [newKeysRef[block.getKey()], block.set('key', newKeysRef[block.getKey()])];
  }));
};

var randomizeContentBlockKeys = function randomizeContentBlockKeys(blockMap) {
  return OrderedMap(blockMap.toArray().map(function (block) {
    var key = generateRandomKey();
    return [key, block.set('key', key)];
  }));
};

var randomizeBlockMapKeys = function randomizeBlockMapKeys(blockMap) {
  var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode;

  if (!isTreeBasedBlockMap) {
    return randomizeContentBlockKeys(blockMap);
  }

  return randomizeContentBlockNodeKeys(blockMap);
};

module.exports = randomizeBlockMapKeys;
},{"./ContentBlockNode":87,"immutable":132,"./generateRandomKey":44}],99:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeEntitiesAtEdges
 * @format
 * 
 */

'use strict';

var CharacterMetadata = require('./CharacterMetadata');

var findRangesImmutable = require('./findRangesImmutable');
var invariant = require('fbjs/lib/invariant');

function removeEntitiesAtEdges(contentState, selectionState) {
  var blockMap = contentState.getBlockMap();
  var entityMap = contentState.getEntityMap();

  var updatedBlocks = {};

  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var startBlock = blockMap.get(startKey);
  var updatedStart = removeForBlock(entityMap, startBlock, startOffset);

  if (updatedStart !== startBlock) {
    updatedBlocks[startKey] = updatedStart;
  }

  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();
  var endBlock = blockMap.get(endKey);
  if (startKey === endKey) {
    endBlock = updatedStart;
  }

  var updatedEnd = removeForBlock(entityMap, endBlock, endOffset);

  if (updatedEnd !== endBlock) {
    updatedBlocks[endKey] = updatedEnd;
  }

  if (!Object.keys(updatedBlocks).length) {
    return contentState.set('selectionAfter', selectionState);
  }

  return contentState.merge({
    blockMap: blockMap.merge(updatedBlocks),
    selectionAfter: selectionState
  });
}

function getRemovalRange(characters, key, offset) {
  var removalRange;
  findRangesImmutable(characters, function (a, b) {
    return a.getEntity() === b.getEntity();
  }, function (element) {
    return element.getEntity() === key;
  }, function (start, end) {
    if (start <= offset && end >= offset) {
      removalRange = { start: start, end: end };
    }
  });
  !(typeof removalRange === 'object') ? 'production' !== 'production' ? invariant(false, 'Removal range must exist within character list.') : invariant(false) : void 0;
  return removalRange;
}

function removeForBlock(entityMap, block, offset) {
  var chars = block.getCharacterList();
  var charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
  var charAfter = offset < chars.count() ? chars.get(offset) : undefined;
  var entityBeforeCursor = charBefore ? charBefore.getEntity() : undefined;
  var entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

  if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
    var entity = entityMap.__get(entityAfterCursor);
    if (entity.getMutability() !== 'MUTABLE') {
      var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset),
          start = _getRemovalRange.start,
          end = _getRemovalRange.end;

      var current;
      while (start < end) {
        current = chars.get(start);
        chars = chars.set(start, CharacterMetadata.applyEntity(current, null));
        start++;
      }
      return block.set('characterList', chars);
    }
  }

  return block;
}

module.exports = removeEntitiesAtEdges;
},{"./CharacterMetadata":26,"./findRangesImmutable":90,"fbjs/lib/invariant":79}],95:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getContentStateFragment
 * @format
 * 
 */

'use strict';

var randomizeBlockMapKeys = require('./randomizeBlockMapKeys');
var removeEntitiesAtEdges = require('./removeEntitiesAtEdges');

var getContentStateFragment = function getContentStateFragment(contentState, selectionState) {
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  // Edge entities should be stripped to ensure that we don't preserve
  // invalid partial entities when the fragment is reused. We do, however,
  // preserve entities that are entirely within the selection range.
  var contentWithoutEdgeEntities = removeEntitiesAtEdges(contentState, selectionState);

  var blockMap = contentWithoutEdgeEntities.getBlockMap();
  var blockKeys = blockMap.keySeq();
  var startIndex = blockKeys.indexOf(startKey);
  var endIndex = blockKeys.indexOf(endKey) + 1;

  return randomizeBlockMapKeys(blockMap.slice(startIndex, endIndex).map(function (block, blockKey) {
    var text = block.getText();
    var chars = block.getCharacterList();

    if (startKey === endKey) {
      return block.merge({
        text: text.slice(startOffset, endOffset),
        characterList: chars.slice(startOffset, endOffset)
      });
    }

    if (blockKey === startKey) {
      return block.merge({
        text: text.slice(startOffset),
        characterList: chars.slice(startOffset)
      });
    }

    if (blockKey === endKey) {
      return block.merge({
        text: text.slice(0, endOffset),
        characterList: chars.slice(0, endOffset)
      });
    }

    return block;
  }));
};

module.exports = getContentStateFragment;
},{"./randomizeBlockMapKeys":142,"./removeEntitiesAtEdges":99}],143:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertIntoList
 * @format
 * 
 */

'use strict';

/**
 * Maintain persistence for target list when appending and prepending.
 */
function insertIntoList(targetList, toInsert, offset) {
  if (offset === targetList.count()) {
    toInsert.forEach(function (c) {
      targetList = targetList.push(c);
    });
  } else if (offset === 0) {
    toInsert.reverse().forEach(function (c) {
      targetList = targetList.unshift(c);
    });
  } else {
    var head = targetList.slice(0, offset);
    var tail = targetList.slice(offset);
    targetList = head.concat(toInsert, tail).toList();
  }
  return targetList;
}

module.exports = insertIntoList;
},{}],96:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertFragmentIntoContentState
 * @format
 * 
 */

'use strict';

var BlockMapBuilder = require('./BlockMapBuilder');
var ContentBlockNode = require('./ContentBlockNode');
var Immutable = require('immutable');

var insertIntoList = require('./insertIntoList');
var invariant = require('fbjs/lib/invariant');
var randomizeBlockMapKeys = require('./randomizeBlockMapKeys');

var List = Immutable.List;

var updateExistingBlock = function updateExistingBlock(contentState, selectionState, blockMap, fragmentBlock, targetKey, targetOffset) {
  var targetBlock = blockMap.get(targetKey);
  var text = targetBlock.getText();
  var chars = targetBlock.getCharacterList();
  var finalKey = targetKey;
  var finalOffset = targetOffset + fragmentBlock.getText().length;

  var newBlock = targetBlock.merge({
    text: text.slice(0, targetOffset) + fragmentBlock.getText() + text.slice(targetOffset),
    characterList: insertIntoList(chars, fragmentBlock.getCharacterList(), targetOffset),
    data: fragmentBlock.getData()
  });

  return contentState.merge({
    blockMap: blockMap.set(targetKey, newBlock),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: finalKey,
      anchorOffset: finalOffset,
      focusKey: finalKey,
      focusOffset: finalOffset,
      isBackward: false
    })
  });
};

/**
 * Appends text/characterList from the fragment first block to
 * target block.
 */
var updateHead = function updateHead(block, targetOffset, fragment) {
  var text = block.getText();
  var chars = block.getCharacterList();

  // Modify head portion of block.
  var headText = text.slice(0, targetOffset);
  var headCharacters = chars.slice(0, targetOffset);
  var appendToHead = fragment.first();

  return block.merge({
    text: headText + appendToHead.getText(),
    characterList: headCharacters.concat(appendToHead.getCharacterList()),
    type: headText ? block.getType() : appendToHead.getType(),
    data: appendToHead.getData()
  });
};

/**
 * Appends offset text/characterList from the target block to the last
 * fragment block.
 */
var updateTail = function updateTail(block, targetOffset, fragment) {
  // Modify tail portion of block.
  var text = block.getText();
  var chars = block.getCharacterList();

  // Modify head portion of block.
  var blockSize = text.length;
  var tailText = text.slice(targetOffset, blockSize);
  var tailCharacters = chars.slice(targetOffset, blockSize);
  var prependToTail = fragment.last();

  return prependToTail.merge({
    text: prependToTail.getText() + tailText,
    characterList: prependToTail.getCharacterList().concat(tailCharacters),
    data: prependToTail.getData()
  });
};

var getRootBlocks = function getRootBlocks(block, blockMap) {
  var headKey = block.getKey();
  var rootBlock = block;
  var rootBlocks = [];

  // sometimes the fragment head block will not be part of the blockMap itself this can happen when
  // the fragment head is used to update the target block, however when this does not happen we need
  // to make sure that we include it on the rootBlocks since the first block of a fragment is always a
  // fragment root block
  if (blockMap.get(headKey)) {
    rootBlocks.push(headKey);
  }

  while (rootBlock && rootBlock.getNextSiblingKey()) {
    var lastSiblingKey = rootBlock.getNextSiblingKey();

    if (!lastSiblingKey) {
      break;
    }

    rootBlocks.push(lastSiblingKey);
    rootBlock = blockMap.get(lastSiblingKey);
  }

  return rootBlocks;
};

var updateBlockMapLinks = function updateBlockMapLinks(blockMap, originalBlockMap, targetBlock, fragmentHeadBlock) {
  return blockMap.withMutations(function (blockMapState) {
    var targetKey = targetBlock.getKey();
    var headKey = fragmentHeadBlock.getKey();
    var targetNextKey = targetBlock.getNextSiblingKey();
    var targetParentKey = targetBlock.getParentKey();
    var fragmentRootBlocks = getRootBlocks(fragmentHeadBlock, blockMap);
    var lastRootFragmentBlockKey = fragmentRootBlocks[fragmentRootBlocks.length - 1];

    if (blockMapState.get(headKey)) {
      // update the fragment head when it is part of the blockMap otherwise
      blockMapState.setIn([targetKey, 'nextSibling'], headKey);
      blockMapState.setIn([headKey, 'prevSibling'], targetKey);
    } else {
      // update the target block that had the fragment head contents merged into it
      blockMapState.setIn([targetKey, 'nextSibling'], fragmentHeadBlock.getNextSiblingKey());
      blockMapState.setIn([fragmentHeadBlock.getNextSiblingKey(), 'prevSibling'], targetKey);
    }

    // update the last root block fragment
    blockMapState.setIn([lastRootFragmentBlockKey, 'nextSibling'], targetNextKey);

    // update the original target next block
    if (targetNextKey) {
      blockMapState.setIn([targetNextKey, 'prevSibling'], lastRootFragmentBlockKey);
    }

    // update fragment parent links
    fragmentRootBlocks.forEach(function (blockKey) {
      return blockMapState.setIn([blockKey, 'parent'], targetParentKey);
    });

    // update targetBlock parent child links
    if (targetParentKey) {
      var targetParent = blockMap.get(targetParentKey);
      var originalTargetParentChildKeys = targetParent.getChildKeys();

      var targetBlockIndex = originalTargetParentChildKeys.indexOf(targetKey);
      var insertionIndex = targetBlockIndex + 1;

      var newChildrenKeysArray = originalTargetParentChildKeys.toArray();

      // insert fragment children
      newChildrenKeysArray.splice.apply(newChildrenKeysArray, [insertionIndex, 0].concat(fragmentRootBlocks));

      blockMapState.setIn([targetParentKey, 'children'], List(newChildrenKeysArray));
    }
  });
};

var insertFragment = function insertFragment(contentState, selectionState, blockMap, fragment, targetKey, targetOffset) {
  var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode;
  var newBlockArr = [];
  var fragmentSize = fragment.size;
  var target = blockMap.get(targetKey);
  var head = fragment.first();
  var tail = fragment.last();
  var finalOffset = tail.getLength();
  var finalKey = tail.getKey();
  var shouldNotUpdateFromFragmentBlock = isTreeBasedBlockMap && (!target.getChildKeys().isEmpty() || !head.getChildKeys().isEmpty());

  blockMap.forEach(function (block, blockKey) {
    if (blockKey !== targetKey) {
      newBlockArr.push(block);
      return;
    }

    if (shouldNotUpdateFromFragmentBlock) {
      newBlockArr.push(block);
    } else {
      newBlockArr.push(updateHead(block, targetOffset, fragment));
    }

    // Insert fragment blocks after the head and before the tail.
    fragment
    // when we are updating the target block with the head fragment block we skip the first fragment
    // head since its contents have already been merged with the target block otherwise we include
    // the whole fragment
    .slice(shouldNotUpdateFromFragmentBlock ? 0 : 1, fragmentSize - 1).forEach(function (fragmentBlock) {
      return newBlockArr.push(fragmentBlock);
    });

    // update tail
    newBlockArr.push(updateTail(block, targetOffset, fragment));
  });

  var updatedBlockMap = BlockMapBuilder.createFromArray(newBlockArr);

  if (isTreeBasedBlockMap) {
    updatedBlockMap = updateBlockMapLinks(updatedBlockMap, blockMap, target, head);
  }

  return contentState.merge({
    blockMap: updatedBlockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: finalKey,
      anchorOffset: finalOffset,
      focusKey: finalKey,
      focusOffset: finalOffset,
      isBackward: false
    })
  });
};

var insertFragmentIntoContentState = function insertFragmentIntoContentState(contentState, selectionState, fragmentBlockMap) {
  !selectionState.isCollapsed() ? 'production' !== 'production' ? invariant(false, '`insertFragment` should only be called with a collapsed selection state.') : invariant(false) : void 0;

  var blockMap = contentState.getBlockMap();
  var fragment = randomizeBlockMapKeys(fragmentBlockMap);
  var targetKey = selectionState.getStartKey();
  var targetOffset = selectionState.getStartOffset();

  var targetBlock = blockMap.get(targetKey);

  if (targetBlock instanceof ContentBlockNode) {
    !targetBlock.getChildKeys().isEmpty() ? 'production' !== 'production' ? invariant(false, '`insertFragment` should not be called when a container node is selected.') : invariant(false) : void 0;
  }

  // When we insert a fragment with a single block we simply update the target block
  // with the contents of the inserted fragment block
  if (fragment.size === 1) {
    return updateExistingBlock(contentState, selectionState, blockMap, fragment.first(), targetKey, targetOffset);
  }

  return insertFragment(contentState, selectionState, blockMap, fragment, targetKey, targetOffset);
};

module.exports = insertFragmentIntoContentState;
},{"./BlockMapBuilder":25,"./ContentBlockNode":87,"immutable":132,"./insertIntoList":143,"fbjs/lib/invariant":79,"./randomizeBlockMapKeys":142}],97:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule insertTextIntoContentState
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');

var insertIntoList = require('./insertIntoList');
var invariant = require('fbjs/lib/invariant');

var Repeat = Immutable.Repeat;

function insertTextIntoContentState(contentState, selectionState, text, characterMetadata) {
  !selectionState.isCollapsed() ? 'production' !== 'production' ? invariant(false, '`insertText` should only be called with a collapsed range.') : invariant(false) : void 0;

  var len = text.length;
  if (!len) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var key = selectionState.getStartKey();
  var offset = selectionState.getStartOffset();
  var block = blockMap.get(key);
  var blockText = block.getText();

  var newBlock = block.merge({
    text: blockText.slice(0, offset) + text + blockText.slice(offset, block.getLength()),
    characterList: insertIntoList(block.getCharacterList(), Repeat(characterMetadata, len).toList(), offset)
  });

  var newOffset = offset + len;

  return contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: newOffset,
      focusOffset: newOffset
    })
  });
}

module.exports = insertTextIntoContentState;
},{"immutable":132,"./insertIntoList":143,"fbjs/lib/invariant":79}],98:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule modifyBlockForContentState
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');

var Map = Immutable.Map;


function modifyBlockForContentState(contentState, selectionState, operation) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(operation);

  return contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = modifyBlockForContentState;
},{"immutable":132}],137:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getNextDelimiterBlockKey
 * @format
 * 
 *
 * This is unstable and not part of the public API and should not be used by
 * production systems. This file may be update/removed without notice.
 */

var ContentBlockNode = require('./ContentBlockNode');

var getNextDelimiterBlockKey = function getNextDelimiterBlockKey(block, blockMap) {
  var isExperimentalTreeBlock = block instanceof ContentBlockNode;

  if (!isExperimentalTreeBlock) {
    return null;
  }

  var nextSiblingKey = block.getNextSiblingKey();

  if (nextSiblingKey) {
    return nextSiblingKey;
  }

  var parent = block.getParentKey();

  if (!parent) {
    return null;
  }

  var nextNonDescendantBlock = blockMap.get(parent);
  while (nextNonDescendantBlock && !nextNonDescendantBlock.getNextSiblingKey()) {
    var parentKey = nextNonDescendantBlock.getParentKey();
    nextNonDescendantBlock = parentKey ? blockMap.get(parentKey) : null;
  }

  if (!nextNonDescendantBlock) {
    return null;
  }

  return nextNonDescendantBlock.getNextSiblingKey();
};

module.exports = getNextDelimiterBlockKey;
},{"./ContentBlockNode":87}],100:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeRangeFromContentState
 * @format
 * 
 */

'use strict';

var ContentBlockNode = require('./ContentBlockNode');
var Immutable = require('immutable');

var getNextDelimiterBlockKey = require('./getNextDelimiterBlockKey');

var List = Immutable.List,
    Map = Immutable.Map;


var transformBlock = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

/**
 * Ancestors needs to be preserved when there are non selected
 * children to make sure we do not leave any orphans behind
 */
var getAncestorsKeys = function getAncestorsKeys(blockKey, blockMap) {
  var parents = [];

  if (!blockKey) {
    return parents;
  }

  var blockNode = blockMap.get(blockKey);
  while (blockNode && blockNode.getParentKey()) {
    var parentKey = blockNode.getParentKey();
    if (parentKey) {
      parents.push(parentKey);
    }
    blockNode = parentKey ? blockMap.get(parentKey) : null;
  }

  return parents;
};

/**
 * Get all next delimiter keys until we hit a root delimiter and return
 * an array of key references
 */
var getNextDelimitersBlockKeys = function getNextDelimitersBlockKeys(block, blockMap) {
  var nextDelimiters = [];

  if (!block) {
    return nextDelimiters;
  }

  var nextDelimiter = getNextDelimiterBlockKey(block, blockMap);
  while (nextDelimiter && blockMap.get(nextDelimiter)) {
    var _block = blockMap.get(nextDelimiter);
    nextDelimiters.push(nextDelimiter);

    // we do not need to keep checking all root node siblings, just the first occurance
    nextDelimiter = _block.getParentKey() ? getNextDelimiterBlockKey(_block, blockMap) : null;
  }

  return nextDelimiters;
};

var getNextValidSibling = function getNextValidSibling(block, blockMap, originalBlockMap) {
  if (!block) {
    return null;
  }

  // note that we need to make sure we refer to the original block since this
  // function is called within a withMutations
  var nextValidSiblingKey = originalBlockMap.get(block.getKey()).getNextSiblingKey();

  while (nextValidSiblingKey && !blockMap.get(nextValidSiblingKey)) {
    nextValidSiblingKey = originalBlockMap.get(nextValidSiblingKey).getNextSiblingKey() || null;
  }

  return nextValidSiblingKey;
};

var getPrevValidSibling = function getPrevValidSibling(block, blockMap, originalBlockMap) {
  if (!block) {
    return null;
  }

  // note that we need to make sure we refer to the original block since this
  // function is called within a withMutations
  var prevValidSiblingKey = originalBlockMap.get(block.getKey()).getPrevSiblingKey();

  while (prevValidSiblingKey && !blockMap.get(prevValidSiblingKey)) {
    prevValidSiblingKey = originalBlockMap.get(prevValidSiblingKey).getPrevSiblingKey() || null;
  }

  return prevValidSiblingKey;
};

var updateBlockMapLinks = function updateBlockMapLinks(blockMap, startBlock, endBlock, originalBlockMap) {
  return blockMap.withMutations(function (blocks) {
    // update start block if its retained
    transformBlock(startBlock.getKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(startBlock, blocks, originalBlockMap),
        prevSibling: getPrevValidSibling(startBlock, blocks, originalBlockMap)
      });
    });

    // update endblock if its retained
    transformBlock(endBlock.getKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(endBlock, blocks, originalBlockMap),
        prevSibling: getPrevValidSibling(endBlock, blocks, originalBlockMap)
      });
    });

    // update start block parent ancestors
    getAncestorsKeys(startBlock.getKey(), originalBlockMap).forEach(function (parentKey) {
      return transformBlock(parentKey, blocks, function (block) {
        return block.merge({
          children: block.getChildKeys().filter(function (key) {
            return blocks.get(key);
          }),
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });

    // update start block next - can only happen if startBlock == endBlock
    transformBlock(startBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: startBlock.getPrevSiblingKey()
      });
    });

    // update start block prev
    transformBlock(startBlock.getPrevSiblingKey(), blocks, function (block) {
      return block.merge({
        nextSibling: getNextValidSibling(startBlock, blocks, originalBlockMap)
      });
    });

    // update end block next
    transformBlock(endBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: getPrevValidSibling(endBlock, blocks, originalBlockMap)
      });
    });

    // update end block prev
    transformBlock(endBlock.getPrevSiblingKey(), blocks, function (block) {
      return block.merge({
        nextSibling: endBlock.getNextSiblingKey()
      });
    });

    // update end block parent ancestors
    getAncestorsKeys(endBlock.getKey(), originalBlockMap).forEach(function (parentKey) {
      transformBlock(parentKey, blocks, function (block) {
        return block.merge({
          children: block.getChildKeys().filter(function (key) {
            return blocks.get(key);
          }),
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });

    // update next delimiters all the way to a root delimiter
    getNextDelimitersBlockKeys(endBlock, originalBlockMap).forEach(function (delimiterKey) {
      return transformBlock(delimiterKey, blocks, function (block) {
        return block.merge({
          nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
          prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
        });
      });
    });
  });
};

var removeRangeFromContentState = function removeRangeFromContentState(contentState, selectionState) {
  if (selectionState.isCollapsed()) {
    return contentState;
  }

  var blockMap = contentState.getBlockMap();
  var startKey = selectionState.getStartKey();
  var startOffset = selectionState.getStartOffset();
  var endKey = selectionState.getEndKey();
  var endOffset = selectionState.getEndOffset();

  var startBlock = blockMap.get(startKey);
  var endBlock = blockMap.get(endKey);

  // we assume that ContentBlockNode and ContentBlocks are not mixed together
  var isExperimentalTreeBlock = startBlock instanceof ContentBlockNode;

  // used to retain blocks that should not be deleted to avoid orphan children
  var parentAncestors = [];

  if (isExperimentalTreeBlock) {
    var endBlockchildrenKeys = endBlock.getChildKeys();
    var endBlockAncestors = getAncestorsKeys(endKey, blockMap);

    // endBlock has unselected sibblings so we can not remove its ancestors parents
    if (endBlock.getNextSiblingKey()) {
      parentAncestors = parentAncestors.concat(endBlockAncestors);
    }

    // endBlock has children so can not remove this block or any of its ancestors
    if (!endBlockchildrenKeys.isEmpty()) {
      parentAncestors = parentAncestors.concat(endBlockAncestors.concat([endKey]));
    }

    // we need to retain all ancestors of the next delimiter block
    parentAncestors = parentAncestors.concat(getAncestorsKeys(getNextDelimiterBlockKey(endBlock, blockMap), blockMap));
  }

  var characterList = void 0;

  if (startBlock === endBlock) {
    characterList = removeFromList(startBlock.getCharacterList(), startOffset, endOffset);
  } else {
    characterList = startBlock.getCharacterList().slice(0, startOffset).concat(endBlock.getCharacterList().slice(endOffset));
  }

  var modifiedStart = startBlock.merge({
    text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
    characterList: characterList
  });

  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).filter(function (_, k) {
    return parentAncestors.indexOf(k) === -1;
  }).concat(Map([[endKey, null]])).map(function (_, k) {
    return k === startKey ? modifiedStart : null;
  });

  var updatedBlockMap = blockMap.merge(newBlocks).filter(function (block) {
    return !!block;
  });

  if (isExperimentalTreeBlock) {
    updatedBlockMap = updateBlockMapLinks(updatedBlockMap, startBlock, endBlock, blockMap);
  }

  return contentState.merge({
    blockMap: updatedBlockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: startKey,
      anchorOffset: startOffset,
      focusKey: startKey,
      focusOffset: startOffset,
      isBackward: false
    })
  });
};

/**
 * Maintain persistence for target list when removing characters on the
 * head and tail of the character list.
 */
var removeFromList = function removeFromList(targetList, startOffset, endOffset) {
  if (startOffset === 0) {
    while (startOffset < endOffset) {
      targetList = targetList.shift();
      startOffset++;
    }
  } else if (endOffset === targetList.count()) {
    while (endOffset > startOffset) {
      targetList = targetList.pop();
      endOffset--;
    }
  } else {
    var head = targetList.slice(0, startOffset);
    var tail = targetList.slice(endOffset);
    targetList = head.concat(tail).toList();
  }
  return targetList;
};

module.exports = removeRangeFromContentState;
},{"./ContentBlockNode":87,"immutable":132,"./getNextDelimiterBlockKey":137}],101:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule splitBlockInContentState
 * @format
 * 
 */

'use strict';

var ContentBlockNode = require('./ContentBlockNode');
var Immutable = require('immutable');

var generateRandomKey = require('./generateRandomKey');
var invariant = require('fbjs/lib/invariant');

var List = Immutable.List,
    Map = Immutable.Map;

var transformBlock = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

var updateBlockMapLinks = function updateBlockMapLinks(blockMap, originalBlock, belowBlock) {
  return blockMap.withMutations(function (blocks) {
    var originalBlockKey = originalBlock.getKey();
    var belowBlockKey = belowBlock.getKey();

    // update block parent
    transformBlock(originalBlock.getParentKey(), blocks, function (block) {
      var parentChildrenList = block.getChildKeys();
      var insertionIndex = parentChildrenList.indexOf(originalBlockKey) + 1;
      var newChildrenArray = parentChildrenList.toArray();

      newChildrenArray.splice(insertionIndex, 0, belowBlockKey);

      return block.merge({
        children: List(newChildrenArray)
      });
    });

    // update original next block
    transformBlock(originalBlock.getNextSiblingKey(), blocks, function (block) {
      return block.merge({
        prevSibling: belowBlockKey
      });
    });

    // update original block
    transformBlock(originalBlockKey, blocks, function (block) {
      return block.merge({
        nextSibling: belowBlockKey
      });
    });

    // update below block
    transformBlock(belowBlockKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalBlockKey
      });
    });
  });
};

var splitBlockInContentState = function splitBlockInContentState(contentState, selectionState) {
  !selectionState.isCollapsed() ? 'production' !== 'production' ? invariant(false, 'Selection range must be collapsed.') : invariant(false) : void 0;

  var key = selectionState.getAnchorKey();
  var offset = selectionState.getAnchorOffset();
  var blockMap = contentState.getBlockMap();
  var blockToSplit = blockMap.get(key);
  var text = blockToSplit.getText();
  var chars = blockToSplit.getCharacterList();
  var keyBelow = generateRandomKey();
  var isExperimentalTreeBlock = blockToSplit instanceof ContentBlockNode;

  var blockAbove = blockToSplit.merge({
    text: text.slice(0, offset),
    characterList: chars.slice(0, offset)
  });
  var blockBelow = blockAbove.merge({
    key: keyBelow,
    text: text.slice(offset),
    characterList: chars.slice(offset),
    data: Map()
  });

  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === blockToSplit;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === blockToSplit;
  }).rest();
  var newBlocks = blocksBefore.concat([[key, blockAbove], [keyBelow, blockBelow]], blocksAfter).toOrderedMap();

  if (isExperimentalTreeBlock) {
    !blockToSplit.getChildKeys().isEmpty() ? 'production' !== 'production' ? invariant(false, 'ContentBlockNode must not have children') : invariant(false) : void 0;

    newBlocks = updateBlockMapLinks(newBlocks, blockAbove, blockBelow);
  }

  return contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: keyBelow,
      anchorOffset: 0,
      focusKey: keyBelow,
      focusOffset: 0,
      isBackward: false
    })
  });
};

module.exports = splitBlockInContentState;
},{"./ContentBlockNode":87,"immutable":132,"./generateRandomKey":44,"fbjs/lib/invariant":79}],35:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftModifier
 * @format
 * 
 */

'use strict';

var CharacterMetadata = require('./CharacterMetadata');
var ContentStateInlineStyle = require('./ContentStateInlineStyle');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var Immutable = require('immutable');

var applyEntityToContentState = require('./applyEntityToContentState');
var getCharacterRemovalRange = require('./getCharacterRemovalRange');
var getContentStateFragment = require('./getContentStateFragment');
var insertFragmentIntoContentState = require('./insertFragmentIntoContentState');
var insertTextIntoContentState = require('./insertTextIntoContentState');
var invariant = require('fbjs/lib/invariant');
var modifyBlockForContentState = require('./modifyBlockForContentState');
var removeEntitiesAtEdges = require('./removeEntitiesAtEdges');
var removeRangeFromContentState = require('./removeRangeFromContentState');
var splitBlockInContentState = require('./splitBlockInContentState');

var OrderedSet = Immutable.OrderedSet;

/**
 * `DraftModifier` provides a set of convenience methods that apply
 * modifications to a `ContentState` object based on a target `SelectionState`.
 *
 * Any change to a `ContentState` should be decomposable into a series of
 * transaction functions that apply the required changes and return output
 * `ContentState` objects.
 *
 * These functions encapsulate some of the most common transaction sequences.
 */

var DraftModifier = {
  replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToReplace);
    var withoutText = removeRangeFromContentState(withoutEntities, rangeToReplace);

    var character = CharacterMetadata.create({
      style: inlineStyle || OrderedSet(),
      entity: entityKey || null
    });

    return insertTextIntoContentState(withoutText, withoutText.getSelectionAfter(), text, character);
  },

  insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
    !targetRange.isCollapsed() ? 'production' !== 'production' ? invariant(false, 'Target range must be collapsed for `insertText`.') : invariant(false) : void 0;
    return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
  },

  moveText: function moveText(contentState, removalRange, targetRange) {
    var movedFragment = getContentStateFragment(contentState, removalRange);

    var afterRemoval = DraftModifier.removeRange(contentState, removalRange, 'backward');

    return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
  },

  replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
    var withoutEntities = removeEntitiesAtEdges(contentState, targetRange);
    var withoutText = removeRangeFromContentState(withoutEntities, targetRange);

    return insertFragmentIntoContentState(withoutText, withoutText.getSelectionAfter(), fragment);
  },

  removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
    var startKey = void 0,
        endKey = void 0,
        startBlock = void 0,
        endBlock = void 0;
    if (rangeToRemove.getIsBackward()) {
      rangeToRemove = rangeToRemove.merge({
        anchorKey: rangeToRemove.getFocusKey(),
        anchorOffset: rangeToRemove.getFocusOffset(),
        focusKey: rangeToRemove.getAnchorKey(),
        focusOffset: rangeToRemove.getAnchorOffset(),
        isBackward: false
      });
    }
    startKey = rangeToRemove.getAnchorKey();
    endKey = rangeToRemove.getFocusKey();
    startBlock = contentState.getBlockForKey(startKey);
    endBlock = contentState.getBlockForKey(endKey);
    var startOffset = rangeToRemove.getStartOffset();
    var endOffset = rangeToRemove.getEndOffset();

    var startEntityKey = startBlock.getEntityAt(startOffset);
    var endEntityKey = endBlock.getEntityAt(endOffset - 1);

    // Check whether the selection state overlaps with a single entity.
    // If so, try to remove the appropriate substring of the entity text.
    if (startKey === endKey) {
      if (startEntityKey && startEntityKey === endEntityKey) {
        var _adjustedRemovalRange = getCharacterRemovalRange(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
        return removeRangeFromContentState(contentState, _adjustedRemovalRange);
      }
    }
    var adjustedRemovalRange = rangeToRemove;
    if (DraftFeatureFlags.draft_segmented_entities_behavior) {
      // Adjust the selection to properly delete segemented and immutable
      // entities
      adjustedRemovalRange = getCharacterRemovalRange(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
    }

    var withoutEntities = removeEntitiesAtEdges(contentState, adjustedRemovalRange);
    return removeRangeFromContentState(withoutEntities, adjustedRemovalRange);
  },

  splitBlock: function splitBlock(contentState, selectionState) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    var withoutText = removeRangeFromContentState(withoutEntities, selectionState);

    return splitBlockInContentState(withoutText, withoutText.getSelectionAfter());
  },

  applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.add(contentState, selectionState, inlineStyle);
  },

  removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.remove(contentState, selectionState, inlineStyle);
  },

  setBlockType: function setBlockType(contentState, selectionState, blockType) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ type: blockType, depth: 0 });
    });
  },

  setBlockData: function setBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ data: blockData });
    });
  },

  mergeBlockData: function mergeBlockData(contentState, selectionState, blockData) {
    return modifyBlockForContentState(contentState, selectionState, function (block) {
      return block.merge({ data: block.getData().merge(blockData) });
    });
  },

  applyEntity: function applyEntity(contentState, selectionState, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    return applyEntityToContentState(withoutEntities, selectionState, entityKey);
  }
};

module.exports = DraftModifier;
},{"./CharacterMetadata":26,"./ContentStateInlineStyle":92,"./DraftFeatureFlags":88,"immutable":132,"./applyEntityToContentState":93,"./getCharacterRemovalRange":94,"./getContentStateFragment":95,"./insertFragmentIntoContentState":96,"./insertTextIntoContentState":97,"fbjs/lib/invariant":79,"./modifyBlockForContentState":98,"./removeEntitiesAtEdges":99,"./removeRangeFromContentState":100,"./splitBlockInContentState":101}],120:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BlockTree
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');

var emptyFunction = require('fbjs/lib/emptyFunction');
var findRangesImmutable = require('./findRangesImmutable');

var List = Immutable.List,
    Repeat = Immutable.Repeat,
    Record = Immutable.Record;


var returnTrue = emptyFunction.thatReturnsTrue;

var FINGERPRINT_DELIMITER = '-';

var defaultLeafRange = {
  start: null,
  end: null
};

var LeafRange = Record(defaultLeafRange);

var defaultDecoratorRange = {
  start: null,
  end: null,
  decoratorKey: null,
  leaves: null
};

var DecoratorRange = Record(defaultDecoratorRange);

var BlockTree = {
  /**
   * Generate a block tree for a given ContentBlock/decorator pair.
   */
  generate: function generate(contentState, block, decorator) {
    var textLength = block.getLength();
    if (!textLength) {
      return List.of(new DecoratorRange({
        start: 0,
        end: 0,
        decoratorKey: null,
        leaves: List.of(new LeafRange({ start: 0, end: 0 }))
      }));
    }

    var leafSets = [];
    var decorations = decorator ? decorator.getDecorations(block, contentState) : List(Repeat(null, textLength));

    var chars = block.getCharacterList();

    findRangesImmutable(decorations, areEqual, returnTrue, function (start, end) {
      leafSets.push(new DecoratorRange({
        start: start,
        end: end,
        decoratorKey: decorations.get(start),
        leaves: generateLeaves(chars.slice(start, end).toList(), start)
      }));
    });

    return List(leafSets);
  },

  /**
   * Create a string representation of the given tree map. This allows us
   * to rapidly determine whether a tree has undergone a significant
   * structural change.
   */
  getFingerprint: function getFingerprint(tree) {
    return tree.map(function (leafSet) {
      var decoratorKey = leafSet.get('decoratorKey');
      var fingerprintString = decoratorKey !== null ? decoratorKey + '.' + (leafSet.get('end') - leafSet.get('start')) : '';
      return '' + fingerprintString + '.' + leafSet.get('leaves').size;
    }).join(FINGERPRINT_DELIMITER);
  }
};

/**
 * Generate LeafRange records for a given character list.
 */
function generateLeaves(characters, offset) {
  var leaves = [];
  var inlineStyles = characters.map(function (c) {
    return c.getStyle();
  }).toList();
  findRangesImmutable(inlineStyles, areEqual, returnTrue, function (start, end) {
    leaves.push(new LeafRange({
      start: start + offset,
      end: end + offset
    }));
  });
  return List(leaves);
}

function areEqual(a, b) {
  return a === b;
}

module.exports = BlockTree;
},{"immutable":132,"fbjs/lib/emptyFunction":80,"./findRangesImmutable":90}],36:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntityInstance
 * @legacyServerCallableInstance
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = require('immutable');

var Record = Immutable.Record;


var DraftEntityInstanceRecord = Record({
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  data: Object
});

/**
 * An instance of a document entity, consisting of a `type` and relevant
 * `data`, metadata about the entity.
 *
 * For instance, a "link" entity might provide a URI, and a "mention"
 * entity might provide the mentioned user's ID. These pieces of data
 * may be used when rendering the entity as part of a ContentBlock DOM
 * representation. For a link, the data would be used as an href for
 * the rendered anchor. For a mention, the ID could be used to retrieve
 * a hovercard.
 */

var DraftEntityInstance = function (_DraftEntityInstanceR) {
  _inherits(DraftEntityInstance, _DraftEntityInstanceR);

  function DraftEntityInstance() {
    _classCallCheck(this, DraftEntityInstance);

    return _possibleConstructorReturn(this, _DraftEntityInstanceR.apply(this, arguments));
  }

  DraftEntityInstance.prototype.getType = function getType() {
    return this.get('type');
  };

  DraftEntityInstance.prototype.getMutability = function getMutability() {
    return this.get('mutability');
  };

  DraftEntityInstance.prototype.getData = function getData() {
    return this.get('data');
  };

  return DraftEntityInstance;
}(DraftEntityInstanceRecord);

module.exports = DraftEntityInstance;
},{"immutable":132}],34:[function(require,module,exports) {
'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEntity
 * @format
 * 
 */

var DraftEntityInstance = require('./DraftEntityInstance');
var Immutable = require('immutable');

var invariant = require('fbjs/lib/invariant');

var Map = Immutable.Map;

var instances = Map();
var instanceKey = 0;

/**
 * Temporary utility for generating the warnings
 */
function logWarning(oldMethodCall, newMethodCall) {
  console.warn('WARNING: ' + oldMethodCall + ' will be deprecated soon!\nPlease use "' + newMethodCall + '" instead.');
}

/**
 * A "document entity" is an object containing metadata associated with a
 * piece of text in a ContentBlock.
 *
 * For example, a `link` entity might include a `uri` property. When a
 * ContentBlock is rendered in the browser, text that refers to that link
 * entity may be rendered as an anchor, with the `uri` as the href value.
 *
 * In a ContentBlock, every position in the text may correspond to zero
 * or one entities. This correspondence is tracked using a key string,
 * generated via DraftEntity.create() and used to obtain entity metadata
 * via DraftEntity.get().
 */
var DraftEntity = {
  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getLastCreatedEntityKey' instead.
   * ---
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  getLastCreatedEntityKey: function getLastCreatedEntityKey() {
    logWarning('DraftEntity.getLastCreatedEntityKey', 'contentState.getLastCreatedEntityKey');
    return DraftEntity.__getLastCreatedEntityKey();
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.createEntity' instead.
   * ---
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  create: function create(type, mutability, data) {
    logWarning('DraftEntity.create', 'contentState.createEntity');
    return DraftEntity.__create(type, mutability, data);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.addEntity' instead.
   * ---
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  add: function add(instance) {
    logWarning('DraftEntity.add', 'contentState.addEntity');
    return DraftEntity.__add(instance);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.getEntity' instead.
   * ---
   * Retrieve the entity corresponding to the supplied key string.
   */
  get: function get(key) {
    logWarning('DraftEntity.get', 'contentState.getEntity');
    return DraftEntity.__get(key);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.mergeEntityData' instead.
   * ---
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  mergeData: function mergeData(key, toMerge) {
    logWarning('DraftEntity.mergeData', 'contentState.mergeEntityData');
    return DraftEntity.__mergeData(key, toMerge);
  },

  /**
   * WARNING: This method will be deprecated soon!
   * Please use 'contentState.replaceEntityData' instead.
   * ---
   * Completely replace the data for a given instance.
   */
  replaceData: function replaceData(key, newData) {
    logWarning('DraftEntity.replaceData', 'contentState.replaceEntityData');
    return DraftEntity.__replaceData(key, newData);
  },

  // ***********************************WARNING******************************
  // --- the above public API will be deprecated in the next version of Draft!
  // The methods below this line are private - don't call them directly.

  /**
   * Get the random key string from whatever entity was last created.
   * We need this to support the new API, as part of transitioning to put Entity
   * storage in contentState.
   */
  __getLastCreatedEntityKey: function __getLastCreatedEntityKey() {
    return '' + instanceKey;
  },

  /**
   * Create a DraftEntityInstance and store it for later retrieval.
   *
   * A random key string will be generated and returned. This key may
   * be used to track the entity's usage in a ContentBlock, and for
   * retrieving data about the entity at render time.
   */
  __create: function __create(type, mutability, data) {
    return DraftEntity.__add(new DraftEntityInstance({ type: type, mutability: mutability, data: data || {} }));
  },

  /**
   * Add an existing DraftEntityInstance to the DraftEntity map. This is
   * useful when restoring instances from the server.
   */
  __add: function __add(instance) {
    var key = '' + ++instanceKey;
    instances = instances.set(key, instance);
    return key;
  },

  /**
   * Retrieve the entity corresponding to the supplied key string.
   */
  __get: function __get(key) {
    var instance = instances.get(key);
    !!!instance ? 'production' !== 'production' ? invariant(false, 'Unknown DraftEntity key: %s.', key) : invariant(false) : void 0;
    return instance;
  },

  /**
   * Entity instances are immutable. If you need to update the data for an
   * instance, this method will merge your data updates and return a new
   * instance.
   */
  __mergeData: function __mergeData(key, toMerge) {
    var instance = DraftEntity.__get(key);
    var newData = _extends({}, instance.getData(), toMerge);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  },

  /**
   * Completely replace the data for a given instance.
   */
  __replaceData: function __replaceData(key, newData) {
    var instance = DraftEntity.__get(key);
    var newInstance = instance.set('data', newData);
    instances = instances.set(key, newInstance);
    return newInstance;
  }
};

module.exports = DraftEntity;
},{"object-assign":82,"./DraftEntityInstance":36,"immutable":132,"fbjs/lib/invariant":79}],40:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SelectionState
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Immutable = require('immutable');

var Record = Immutable.Record;


var defaultRecord = {
  anchorKey: '',
  anchorOffset: 0,
  focusKey: '',
  focusOffset: 0,
  isBackward: false,
  hasFocus: false
};

var SelectionStateRecord = Record(defaultRecord);

var SelectionState = function (_SelectionStateRecord) {
  _inherits(SelectionState, _SelectionStateRecord);

  function SelectionState() {
    _classCallCheck(this, SelectionState);

    return _possibleConstructorReturn(this, _SelectionStateRecord.apply(this, arguments));
  }

  SelectionState.prototype.serialize = function serialize() {
    return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', ' + 'Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', ' + 'Is Backward: ' + String(this.getIsBackward()) + ', ' + 'Has Focus: ' + String(this.getHasFocus());
  };

  SelectionState.prototype.getAnchorKey = function getAnchorKey() {
    return this.get('anchorKey');
  };

  SelectionState.prototype.getAnchorOffset = function getAnchorOffset() {
    return this.get('anchorOffset');
  };

  SelectionState.prototype.getFocusKey = function getFocusKey() {
    return this.get('focusKey');
  };

  SelectionState.prototype.getFocusOffset = function getFocusOffset() {
    return this.get('focusOffset');
  };

  SelectionState.prototype.getIsBackward = function getIsBackward() {
    return this.get('isBackward');
  };

  SelectionState.prototype.getHasFocus = function getHasFocus() {
    return this.get('hasFocus');
  };

  /**
   * Return whether the specified range overlaps with an edge of the
   * SelectionState.
   */


  SelectionState.prototype.hasEdgeWithin = function hasEdgeWithin(blockKey, start, end) {
    var anchorKey = this.getAnchorKey();
    var focusKey = this.getFocusKey();

    if (anchorKey === focusKey && anchorKey === blockKey) {
      var selectionStart = this.getStartOffset();
      var selectionEnd = this.getEndOffset();
      return start <= selectionEnd && selectionStart <= end;
    }

    if (blockKey !== anchorKey && blockKey !== focusKey) {
      return false;
    }

    var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();

    return start <= offsetToCheck && end >= offsetToCheck;
  };

  SelectionState.prototype.isCollapsed = function isCollapsed() {
    return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
  };

  SelectionState.prototype.getStartKey = function getStartKey() {
    return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
  };

  SelectionState.prototype.getStartOffset = function getStartOffset() {
    return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
  };

  SelectionState.prototype.getEndKey = function getEndKey() {
    return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
  };

  SelectionState.prototype.getEndOffset = function getEndOffset() {
    return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
  };

  SelectionState.createEmpty = function createEmpty(key) {
    return new SelectionState({
      anchorKey: key,
      anchorOffset: 0,
      focusKey: key,
      focusOffset: 0,
      isBackward: false,
      hasFocus: false
    });
  };

  return SelectionState;
}(SelectionStateRecord);

module.exports = SelectionState;
},{"immutable":132}],91:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule sanitizeDraftText
 * @format
 * 
 */

'use strict';

var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

function sanitizeDraftText(input) {
  return input.replace(REGEX_BLOCK_DELIMITER, '');
}

module.exports = sanitizeDraftText;
},{}],29:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentState
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockMapBuilder = require('./BlockMapBuilder');
var CharacterMetadata = require('./CharacterMetadata');
var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var DraftEntity = require('./DraftEntity');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var Immutable = require('immutable');
var SelectionState = require('./SelectionState');

var generateRandomKey = require('./generateRandomKey');
var sanitizeDraftText = require('./sanitizeDraftText');

var List = Immutable.List,
    Record = Immutable.Record,
    Repeat = Immutable.Repeat;


var experimentalTreeDataSupport = DraftFeatureFlags.draft_tree_data_support;

var defaultRecord = {
  entityMap: null,
  blockMap: null,
  selectionBefore: null,
  selectionAfter: null
};

var ContentBlockNodeRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;

var ContentStateRecord = Record(defaultRecord);

var ContentState = function (_ContentStateRecord) {
  _inherits(ContentState, _ContentStateRecord);

  function ContentState() {
    _classCallCheck(this, ContentState);

    return _possibleConstructorReturn(this, _ContentStateRecord.apply(this, arguments));
  }

  ContentState.prototype.getEntityMap = function getEntityMap() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity;
  };

  ContentState.prototype.getBlockMap = function getBlockMap() {
    return this.get('blockMap');
  };

  ContentState.prototype.getSelectionBefore = function getSelectionBefore() {
    return this.get('selectionBefore');
  };

  ContentState.prototype.getSelectionAfter = function getSelectionAfter() {
    return this.get('selectionAfter');
  };

  ContentState.prototype.getBlockForKey = function getBlockForKey(key) {
    var block = this.getBlockMap().get(key);
    return block;
  };

  ContentState.prototype.getKeyBefore = function getKeyBefore(key) {
    return this.getBlockMap().reverse().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getKeyAfter = function getKeyAfter(key) {
    return this.getBlockMap().keySeq().skipUntil(function (v) {
      return v === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockAfter = function getBlockAfter(key) {
    return this.getBlockMap().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlockBefore = function getBlockBefore(key) {
    return this.getBlockMap().reverse().skipUntil(function (_, k) {
      return k === key;
    }).skip(1).first();
  };

  ContentState.prototype.getBlocksAsArray = function getBlocksAsArray() {
    return this.getBlockMap().toArray();
  };

  ContentState.prototype.getFirstBlock = function getFirstBlock() {
    return this.getBlockMap().first();
  };

  ContentState.prototype.getLastBlock = function getLastBlock() {
    return this.getBlockMap().last();
  };

  ContentState.prototype.getPlainText = function getPlainText(delimiter) {
    return this.getBlockMap().map(function (block) {
      return block ? block.getText() : '';
    }).join(delimiter || '\n');
  };

  ContentState.prototype.getLastCreatedEntityKey = function getLastCreatedEntityKey() {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity.__getLastCreatedEntityKey();
  };

  ContentState.prototype.hasText = function hasText() {
    var blockMap = this.getBlockMap();
    return blockMap.size > 1 || blockMap.first().getLength() > 0;
  };

  ContentState.prototype.createEntity = function createEntity(type, mutability, data) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__create(type, mutability, data);
    return this;
  };

  ContentState.prototype.mergeEntityData = function mergeEntityData(key, toMerge) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__mergeData(key, toMerge);
    return this;
  };

  ContentState.prototype.replaceEntityData = function replaceEntityData(key, newData) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__replaceData(key, newData);
    return this;
  };

  ContentState.prototype.addEntity = function addEntity(instance) {
    // TODO: update this when we fully remove DraftEntity
    DraftEntity.__add(instance);
    return this;
  };

  ContentState.prototype.getEntity = function getEntity(key) {
    // TODO: update this when we fully remove DraftEntity
    return DraftEntity.__get(key);
  };

  ContentState.createFromBlockArray = function createFromBlockArray(
  // TODO: update flow type when we completely deprecate the old entity API
  blocks, entityMap) {
    // TODO: remove this when we completely deprecate the old entity API
    var theBlocks = Array.isArray(blocks) ? blocks : blocks.contentBlocks;
    var blockMap = BlockMapBuilder.createFromArray(theBlocks);
    var selectionState = blockMap.isEmpty() ? new SelectionState() : SelectionState.createEmpty(blockMap.first().getKey());
    return new ContentState({
      blockMap: blockMap,
      entityMap: entityMap || DraftEntity,
      selectionBefore: selectionState,
      selectionAfter: selectionState
    });
  };

  ContentState.createFromText = function createFromText(text) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\r\n?|\n/g;

    var strings = text.split(delimiter);
    var blocks = strings.map(function (block) {
      block = sanitizeDraftText(block);
      return new ContentBlockNodeRecord({
        key: generateRandomKey(),
        text: block,
        type: 'unstyled',
        characterList: List(Repeat(CharacterMetadata.EMPTY, block.length))
      });
    });
    return ContentState.createFromBlockArray(blocks);
  };

  return ContentState;
}(ContentStateRecord);

module.exports = ContentState;
},{"./BlockMapBuilder":25,"./CharacterMetadata":26,"./ContentBlock":28,"./ContentBlockNode":87,"./DraftEntity":34,"./DraftFeatureFlags":88,"immutable":132,"./SelectionState":40,"./generateRandomKey":44,"./sanitizeDraftText":91}],127:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Constants to represent text directionality
 *
 * Also defines a *global* direciton, to be used in bidi algorithms as a
 * default fallback direciton, when no better direction is found or provided.
 *
 * NOTE: Use `setGlobalDir()`, or update `initGlobalDir()`, to set the initial
 *       global direction value based on the application.
 *
 * Part of the implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */

'use strict';

var invariant = require('./invariant');

var NEUTRAL = 'NEUTRAL'; // No strong direction
var LTR = 'LTR'; // Left-to-Right direction
var RTL = 'RTL'; // Right-to-Left direction

var globalDir = null;

// == Helpers ==

/**
 * Check if a directionality value is a Strong one
 */
function isStrong(dir) {
  return dir === LTR || dir === RTL;
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property.
 */
function getHTMLDir(dir) {
  !isStrong(dir) ? 'production' !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  return dir === LTR ? 'ltr' : 'rtl';
}

/**
 * Get string value to be used for `dir` HTML attribute or `direction` CSS
 * property, but returns null if `dir` has same value as `otherDir`.
 * `null`.
 */
function getHTMLDirIfDifferent(dir, otherDir) {
  !isStrong(dir) ? 'production' !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  !isStrong(otherDir) ? 'production' !== 'production' ? invariant(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant(false) : void 0;
  return dir === otherDir ? null : getHTMLDir(dir);
}

// == Global Direction ==

/**
 * Set the global direction.
 */
function setGlobalDir(dir) {
  globalDir = dir;
}

/**
 * Initialize the global direction
 */
function initGlobalDir() {
  setGlobalDir(LTR);
}

/**
 * Get the global direction
 */
function getGlobalDir() {
  if (!globalDir) {
    this.initGlobalDir();
  }
  !globalDir ? 'production' !== 'production' ? invariant(false, 'Global direction not set.') : invariant(false) : void 0;
  return globalDir;
}

var UnicodeBidiDirection = {
  // Values
  NEUTRAL: NEUTRAL,
  LTR: LTR,
  RTL: RTL,
  // Helpers
  isStrong: isStrong,
  getHTMLDir: getHTMLDir,
  getHTMLDirIfDifferent: getHTMLDirIfDifferent,
  // Global Direction
  setGlobalDir: setGlobalDir,
  initGlobalDir: initGlobalDir,
  getGlobalDir: getGlobalDir
};

module.exports = UnicodeBidiDirection;
},{"./invariant":79}],126:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Basic (stateless) API for text direction detection
 *
 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */

'use strict';

var UnicodeBidiDirection = require('./UnicodeBidiDirection');

var invariant = require('./invariant');

/**
 * RegExp ranges of characters with a *Strong* Bidi_Class value.
 *
 * Data is based on DerivedBidiClass.txt in UCD version 7.0.0.
 *
 * NOTE: For performance reasons, we only support Unicode's
 *       Basic Multilingual Plane (BMP) for now.
 */
var RANGE_BY_BIDI_TYPE = {

  L: 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u01BA\u01BB' + '\u01BC-\u01BF\u01C0-\u01C3\u01C4-\u0293\u0294\u0295-\u02AF\u02B0-\u02B8' + '\u02BB-\u02C1\u02D0-\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376-\u0377' + '\u037A\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1' + '\u03A3-\u03F5\u03F7-\u0481\u0482\u048A-\u052F\u0531-\u0556\u0559' + '\u055A-\u055F\u0561-\u0587\u0589\u0903\u0904-\u0939\u093B\u093D' + '\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0950\u0958-\u0961\u0964-\u0965' + '\u0966-\u096F\u0970\u0971\u0972-\u0980\u0982-\u0983\u0985-\u098C' + '\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD' + '\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09CE\u09D7\u09DC-\u09DD' + '\u09DF-\u09E1\u09E6-\u09EF\u09F0-\u09F1\u09F4-\u09F9\u09FA\u0A03' + '\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33' + '\u0A35-\u0A36\u0A38-\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F' + '\u0A72-\u0A74\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0' + '\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0AD0' + '\u0AE0-\u0AE1\u0AE6-\u0AEF\u0AF0\u0B02-\u0B03\u0B05-\u0B0C\u0B0F-\u0B10' + '\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40' + '\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0B5C-\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F' + '\u0B70\u0B71\u0B72-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95' + '\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9' + '\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7' + '\u0BE6-\u0BEF\u0BF0-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10' + '\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C59\u0C60-\u0C61' + '\u0C66-\u0C6F\u0C7F\u0C82-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8' + '\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CBE\u0CBF\u0CC0-\u0CC4\u0CC6' + '\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0CDE\u0CE0-\u0CE1\u0CE6-\u0CEF' + '\u0CF1-\u0CF2\u0D02-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D' + '\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D57\u0D60-\u0D61' + '\u0D66-\u0D6F\u0D70-\u0D75\u0D79\u0D7A-\u0D7F\u0D82-\u0D83\u0D85-\u0D96' + '\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF' + '\u0DE6-\u0DEF\u0DF2-\u0DF3\u0DF4\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45' + '\u0E46\u0E4F\u0E50-\u0E59\u0E5A-\u0E5B\u0E81-\u0E82\u0E84\u0E87-\u0E88' + '\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7' + '\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6' + '\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F01-\u0F03\u0F04-\u0F12\u0F13\u0F14' + '\u0F15-\u0F17\u0F1A-\u0F1F\u0F20-\u0F29\u0F2A-\u0F33\u0F34\u0F36\u0F38' + '\u0F3E-\u0F3F\u0F40-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C' + '\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FCF\u0FD0-\u0FD4\u0FD5-\u0FD8' + '\u0FD9-\u0FDA\u1000-\u102A\u102B-\u102C\u1031\u1038\u103B-\u103C\u103F' + '\u1040-\u1049\u104A-\u104F\u1050-\u1055\u1056-\u1057\u105A-\u105D\u1061' + '\u1062-\u1064\u1065-\u1066\u1067-\u106D\u106E-\u1070\u1075-\u1081' + '\u1083-\u1084\u1087-\u108C\u108E\u108F\u1090-\u1099\u109A-\u109C' + '\u109E-\u109F\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FB\u10FC' + '\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288' + '\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5' + '\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u1368' + '\u1369-\u137C\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166D-\u166E' + '\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EB-\u16ED\u16EE-\u16F0' + '\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735-\u1736' + '\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5' + '\u17C7-\u17C8\u17D4-\u17D6\u17D7\u17D8-\u17DA\u17DC\u17E0-\u17E9' + '\u1810-\u1819\u1820-\u1842\u1843\u1844-\u1877\u1880-\u18A8\u18AA' + '\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930-\u1931' + '\u1933-\u1938\u1946-\u194F\u1950-\u196D\u1970-\u1974\u1980-\u19AB' + '\u19B0-\u19C0\u19C1-\u19C7\u19C8-\u19C9\u19D0-\u19D9\u19DA\u1A00-\u1A16' + '\u1A19-\u1A1A\u1A1E-\u1A1F\u1A20-\u1A54\u1A55\u1A57\u1A61\u1A63-\u1A64' + '\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AA6\u1AA7\u1AA8-\u1AAD' + '\u1B04\u1B05-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B45-\u1B4B' + '\u1B50-\u1B59\u1B5A-\u1B60\u1B61-\u1B6A\u1B74-\u1B7C\u1B82\u1B83-\u1BA0' + '\u1BA1\u1BA6-\u1BA7\u1BAA\u1BAE-\u1BAF\u1BB0-\u1BB9\u1BBA-\u1BE5\u1BE7' + '\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1BFC-\u1BFF\u1C00-\u1C23\u1C24-\u1C2B' + '\u1C34-\u1C35\u1C3B-\u1C3F\u1C40-\u1C49\u1C4D-\u1C4F\u1C50-\u1C59' + '\u1C5A-\u1C77\u1C78-\u1C7D\u1C7E-\u1C7F\u1CC0-\u1CC7\u1CD3\u1CE1' + '\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF2-\u1CF3\u1CF5-\u1CF6\u1D00-\u1D2B' + '\u1D2C-\u1D6A\u1D6B-\u1D77\u1D78\u1D79-\u1D9A\u1D9B-\u1DBF\u1E00-\u1F15' + '\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D' + '\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC' + '\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E' + '\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D' + '\u2124\u2126\u2128\u212A-\u212D\u212F-\u2134\u2135-\u2138\u2139' + '\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2182\u2183-\u2184' + '\u2185-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF' + '\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C7B\u2C7C-\u2C7D\u2C7E-\u2CE4' + '\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F' + '\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE' + '\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005\u3006\u3007' + '\u3021-\u3029\u302E-\u302F\u3031-\u3035\u3038-\u303A\u303B\u303C' + '\u3041-\u3096\u309D-\u309E\u309F\u30A1-\u30FA\u30FC-\u30FE\u30FF' + '\u3105-\u312D\u3131-\u318E\u3190-\u3191\u3192-\u3195\u3196-\u319F' + '\u31A0-\u31BA\u31F0-\u31FF\u3200-\u321C\u3220-\u3229\u322A-\u3247' + '\u3248-\u324F\u3260-\u327B\u327F\u3280-\u3289\u328A-\u32B0\u32C0-\u32CB' + '\u32D0-\u32FE\u3300-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5' + '\u4E00-\u9FCC\uA000-\uA014\uA015\uA016-\uA48C\uA4D0-\uA4F7\uA4F8-\uA4FD' + '\uA4FE-\uA4FF\uA500-\uA60B\uA60C\uA610-\uA61F\uA620-\uA629\uA62A-\uA62B' + '\uA640-\uA66D\uA66E\uA680-\uA69B\uA69C-\uA69D\uA6A0-\uA6E5\uA6E6-\uA6EF' + '\uA6F2-\uA6F7\uA722-\uA76F\uA770\uA771-\uA787\uA789-\uA78A\uA78B-\uA78E' + '\uA790-\uA7AD\uA7B0-\uA7B1\uA7F7\uA7F8-\uA7F9\uA7FA\uA7FB-\uA801' + '\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA823-\uA824\uA827\uA830-\uA835' + '\uA836-\uA837\uA840-\uA873\uA880-\uA881\uA882-\uA8B3\uA8B4-\uA8C3' + '\uA8CE-\uA8CF\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8F8-\uA8FA\uA8FB\uA900-\uA909' + '\uA90A-\uA925\uA92E-\uA92F\uA930-\uA946\uA952-\uA953\uA95F\uA960-\uA97C' + '\uA983\uA984-\uA9B2\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uA9C1-\uA9CD' + '\uA9CF\uA9D0-\uA9D9\uA9DE-\uA9DF\uA9E0-\uA9E4\uA9E6\uA9E7-\uA9EF' + '\uA9F0-\uA9F9\uA9FA-\uA9FE\uAA00-\uAA28\uAA2F-\uAA30\uAA33-\uAA34' + '\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F\uAA60-\uAA6F' + '\uAA70\uAA71-\uAA76\uAA77-\uAA79\uAA7A\uAA7B\uAA7D\uAA7E-\uAAAF\uAAB1' + '\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAADD\uAADE-\uAADF' + '\uAAE0-\uAAEA\uAAEB\uAAEE-\uAAEF\uAAF0-\uAAF1\uAAF2\uAAF3-\uAAF4\uAAF5' + '\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E' + '\uAB30-\uAB5A\uAB5B\uAB5C-\uAB5F\uAB64-\uAB65\uABC0-\uABE2\uABE3-\uABE4' + '\uABE6-\uABE7\uABE9-\uABEA\uABEB\uABEC\uABF0-\uABF9\uAC00-\uD7A3' + '\uD7B0-\uD7C6\uD7CB-\uD7FB\uE000-\uF8FF\uF900-\uFA6D\uFA70-\uFAD9' + '\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF6F\uFF70' + '\uFF71-\uFF9D\uFF9E-\uFF9F\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF' + '\uFFD2-\uFFD7\uFFDA-\uFFDC',

  R: '\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05D0-\u05EA\u05EB-\u05EF' + '\u05F0-\u05F2\u05F3-\u05F4\u05F5-\u05FF\u07C0-\u07C9\u07CA-\u07EA' + '\u07F4-\u07F5\u07FA\u07FB-\u07FF\u0800-\u0815\u081A\u0824\u0828' + '\u082E-\u082F\u0830-\u083E\u083F\u0840-\u0858\u085C-\u085D\u085E' + '\u085F-\u089F\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB37\uFB38-\uFB3C' + '\uFB3D\uFB3E\uFB3F\uFB40-\uFB41\uFB42\uFB43-\uFB44\uFB45\uFB46-\uFB4F',

  AL: '\u0608\u060B\u060D\u061B\u061C\u061D\u061E-\u061F\u0620-\u063F\u0640' + '\u0641-\u064A\u066D\u066E-\u066F\u0671-\u06D3\u06D4\u06D5\u06E5-\u06E6' + '\u06EE-\u06EF\u06FA-\u06FC\u06FD-\u06FE\u06FF\u0700-\u070D\u070E\u070F' + '\u0710\u0712-\u072F\u074B-\u074C\u074D-\u07A5\u07B1\u07B2-\u07BF' + '\u08A0-\u08B2\u08B3-\u08E3\uFB50-\uFBB1\uFBB2-\uFBC1\uFBC2-\uFBD2' + '\uFBD3-\uFD3D\uFD40-\uFD4F\uFD50-\uFD8F\uFD90-\uFD91\uFD92-\uFDC7' + '\uFDC8-\uFDCF\uFDF0-\uFDFB\uFDFC\uFDFE-\uFDFF\uFE70-\uFE74\uFE75' + '\uFE76-\uFEFC\uFEFD-\uFEFE'

};

var REGEX_STRONG = new RegExp('[' + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

var REGEX_RTL = new RegExp('[' + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

/**
 * Returns the first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     A character with strong bidi direction, or null if not found
 */
function firstStrongChar(str) {
  var match = REGEX_STRONG.exec(str);
  return match == null ? null : match[0];
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL).
 *
 * @param str  A text block; e.g. paragraph, table cell, tag
 * @return     The resolved direction
 */
function firstStrongCharDir(str) {
  var strongChar = firstStrongChar(str);
  if (strongChar == null) {
    return UnicodeBidiDirection.NEUTRAL;
  }
  return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str       A text block; e.g. paragraph, table cell, tag
 * @param fallback  Fallback direction, used if no strong direction detected
 *                  for the block (default = NEUTRAL)
 * @return          The resolved direction
 */
function resolveBlockDir(str, fallback) {
  fallback = fallback || UnicodeBidiDirection.NEUTRAL;
  if (!str.length) {
    return fallback;
  }
  var blockDir = firstStrongCharDir(str);
  return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
}

/**
 * Returns the direction of a block of text, based on the direction of its
 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
 * direction, if no strong character is found.
 *
 * NOTE: This function is similar to resolveBlockDir(), but uses the global
 * direction as the fallback, so it *always* returns a Strong direction,
 * making it useful for integration in places that you need to make the final
 * decision, like setting some CSS class.
 *
 * This function is supposed to be used in respect to Higher-Level Protocol
 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                The resolved Strong direction
 */
function getDirection(str, strongFallback) {
  if (!strongFallback) {
    strongFallback = UnicodeBidiDirection.getGlobalDir();
  }
  !UnicodeBidiDirection.isStrong(strongFallback) ? 'production' !== 'production' ? invariant(false, 'Fallback direction must be a strong direction') : invariant(false) : void 0;
  return resolveBlockDir(str, strongFallback);
}

/**
 * Returns true if getDirection(arguments...) returns LTR.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is LTR
 */
function isDirectionLTR(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
}

/**
 * Returns true if getDirection(arguments...) returns RTL.
 *
 * @param str             A text block; e.g. paragraph, table cell
 * @param strongFallback  Fallback direction, used if no strong direction
 *                        detected for the block (default = global direction)
 * @return                True if the resolved direction is RTL
 */
function isDirectionRTL(str, strongFallback) {
  return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
}

var UnicodeBidi = {
  firstStrongChar: firstStrongChar,
  firstStrongCharDir: firstStrongCharDir,
  resolveBlockDir: resolveBlockDir,
  getDirection: getDirection,
  isDirectionLTR: isDirectionLTR,
  isDirectionRTL: isDirectionRTL
};

module.exports = UnicodeBidi;
},{"./UnicodeBidiDirection":127,"./invariant":79}],173:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/**
 * Stateful API for text direction detection
 *
 * This class can be used in applications where you need to detect the
 * direction of a sequence of text blocks, where each direction shall be used
 * as the fallback direction for the next one.
 *
 * NOTE: A default direction, if not provided, is set based on the global
 *       direction, as defined by `UnicodeBidiDirection`.
 *
 * == Example ==
 * ```
 * var UnicodeBidiService = require('UnicodeBidiService');
 *
 * var bidiService = new UnicodeBidiService();
 *
 * ...
 *
 * bidiService.reset();
 * for (var para in paragraphs) {
 *   var dir = bidiService.getDirection(para);
 *   ...
 * }
 * ```
 *
 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
 * Unicode Standard Annex #9 (UAX9)
 * http://www.unicode.org/reports/tr9/
 */

'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var UnicodeBidi = require('./UnicodeBidi');
var UnicodeBidiDirection = require('./UnicodeBidiDirection');

var invariant = require('./invariant');

var UnicodeBidiService = function () {

  /**
   * Stateful class for paragraph direction detection
   *
   * @param defaultDir  Default direction of the service
   */
  function UnicodeBidiService(defaultDir) {
    _classCallCheck(this, UnicodeBidiService);

    if (!defaultDir) {
      defaultDir = UnicodeBidiDirection.getGlobalDir();
    } else {
      !UnicodeBidiDirection.isStrong(defaultDir) ? 'production' !== 'production' ? invariant(false, 'Default direction must be a strong direction (LTR or RTL)') : invariant(false) : void 0;
    }
    this._defaultDir = defaultDir;
    this.reset();
  }

  /**
   * Reset the internal state
   *
   * Instead of creating a new instance, you can just reset() your instance
   * everytime you start a new loop.
   */

  UnicodeBidiService.prototype.reset = function reset() {
    this._lastDir = this._defaultDir;
  };

  /**
   * Returns the direction of a block of text, and remembers it as the
   * fall-back direction for the next paragraph.
   *
   * @param str  A text block, e.g. paragraph, table cell, tag
   * @return     The resolved direction
   */

  UnicodeBidiService.prototype.getDirection = function getDirection(str) {
    this._lastDir = UnicodeBidi.getDirection(str, this._lastDir);
    return this._lastDir;
  };

  return UnicodeBidiService;
}();

module.exports = UnicodeBidiService;
},{"./UnicodeBidi":126,"./UnicodeBidiDirection":127,"./invariant":79}],131:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var nullthrows = function nullthrows(x) {
  if (x != null) {
    return x;
  }
  throw new Error("Got unexpected null or undefined");
};

module.exports = nullthrows;
},{}],121:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EditorBidiService
 * @format
 * 
 */

'use strict';

var Immutable = require('immutable');
var UnicodeBidiService = require('fbjs/lib/UnicodeBidiService');

var nullthrows = require('fbjs/lib/nullthrows');

var OrderedMap = Immutable.OrderedMap;


var bidiService;

var EditorBidiService = {
  getDirectionMap: function getDirectionMap(content, prevBidiMap) {
    if (!bidiService) {
      bidiService = new UnicodeBidiService();
    } else {
      bidiService.reset();
    }

    var blockMap = content.getBlockMap();
    var nextBidi = blockMap.valueSeq().map(function (block) {
      return nullthrows(bidiService).getDirection(block.getText());
    });
    var bidiMap = OrderedMap(blockMap.keySeq().zip(nextBidi));

    if (prevBidiMap != null && Immutable.is(prevBidiMap, bidiMap)) {
      return prevBidiMap;
    }

    return bidiMap;
  }
};

module.exports = EditorBidiService;
},{"immutable":132,"fbjs/lib/UnicodeBidiService":173,"fbjs/lib/nullthrows":131}],37:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EditorState
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockTree = require('./BlockTree');
var ContentState = require('./ContentState');
var EditorBidiService = require('./EditorBidiService');
var Immutable = require('immutable');
var SelectionState = require('./SelectionState');

var OrderedSet = Immutable.OrderedSet,
    Record = Immutable.Record,
    Stack = Immutable.Stack;


var defaultRecord = {
  allowUndo: true,
  currentContent: null,
  decorator: null,
  directionMap: null,
  forceSelection: false,
  inCompositionMode: false,
  inlineStyleOverride: null,
  lastChangeType: null,
  nativelyRenderedContent: null,
  redoStack: Stack(),
  selection: null,
  treeMap: null,
  undoStack: Stack()
};

var EditorStateRecord = Record(defaultRecord);

var EditorState = function () {
  EditorState.createEmpty = function createEmpty(decorator) {
    return EditorState.createWithContent(ContentState.createFromText(''), decorator);
  };

  EditorState.createWithContent = function createWithContent(contentState, decorator) {
    var firstKey = contentState.getBlockMap().first().getKey();
    return EditorState.create({
      currentContent: contentState,
      undoStack: Stack(),
      redoStack: Stack(),
      decorator: decorator || null,
      selection: SelectionState.createEmpty(firstKey)
    });
  };

  EditorState.create = function create(config) {
    var currentContent = config.currentContent,
        decorator = config.decorator;

    var recordConfig = _extends({}, config, {
      treeMap: generateNewTreeMap(currentContent, decorator),
      directionMap: EditorBidiService.getDirectionMap(currentContent)
    });
    return new EditorState(new EditorStateRecord(recordConfig));
  };

  EditorState.set = function set(editorState, put) {
    var map = editorState.getImmutable().withMutations(function (state) {
      var existingDecorator = state.get('decorator');
      var decorator = existingDecorator;
      if (put.decorator === null) {
        decorator = null;
      } else if (put.decorator) {
        decorator = put.decorator;
      }

      var newContent = put.currentContent || editorState.getCurrentContent();

      if (decorator !== existingDecorator) {
        var treeMap = state.get('treeMap');
        var newTreeMap;
        if (decorator && existingDecorator) {
          newTreeMap = regenerateTreeForNewDecorator(newContent, newContent.getBlockMap(), treeMap, decorator, existingDecorator);
        } else {
          newTreeMap = generateNewTreeMap(newContent, decorator);
        }

        state.merge({
          decorator: decorator,
          treeMap: newTreeMap,
          nativelyRenderedContent: null
        });
        return;
      }

      var existingContent = editorState.getCurrentContent();
      if (newContent !== existingContent) {
        state.set('treeMap', regenerateTreeForNewBlocks(editorState, newContent.getBlockMap(), newContent.getEntityMap(), decorator));
      }

      state.merge(put);
    });

    return new EditorState(map);
  };

  EditorState.prototype.toJS = function toJS() {
    return this.getImmutable().toJS();
  };

  EditorState.prototype.getAllowUndo = function getAllowUndo() {
    return this.getImmutable().get('allowUndo');
  };

  EditorState.prototype.getCurrentContent = function getCurrentContent() {
    return this.getImmutable().get('currentContent');
  };

  EditorState.prototype.getUndoStack = function getUndoStack() {
    return this.getImmutable().get('undoStack');
  };

  EditorState.prototype.getRedoStack = function getRedoStack() {
    return this.getImmutable().get('redoStack');
  };

  EditorState.prototype.getSelection = function getSelection() {
    return this.getImmutable().get('selection');
  };

  EditorState.prototype.getDecorator = function getDecorator() {
    return this.getImmutable().get('decorator');
  };

  EditorState.prototype.isInCompositionMode = function isInCompositionMode() {
    return this.getImmutable().get('inCompositionMode');
  };

  EditorState.prototype.mustForceSelection = function mustForceSelection() {
    return this.getImmutable().get('forceSelection');
  };

  EditorState.prototype.getNativelyRenderedContent = function getNativelyRenderedContent() {
    return this.getImmutable().get('nativelyRenderedContent');
  };

  EditorState.prototype.getLastChangeType = function getLastChangeType() {
    return this.getImmutable().get('lastChangeType');
  };

  /**
   * While editing, the user may apply inline style commands with a collapsed
   * cursor, intending to type text that adopts the specified style. In this
   * case, we track the specified style as an "override" that takes precedence
   * over the inline style of the text adjacent to the cursor.
   *
   * If null, there is no override in place.
   */


  EditorState.prototype.getInlineStyleOverride = function getInlineStyleOverride() {
    return this.getImmutable().get('inlineStyleOverride');
  };

  EditorState.setInlineStyleOverride = function setInlineStyleOverride(editorState, inlineStyleOverride) {
    return EditorState.set(editorState, { inlineStyleOverride: inlineStyleOverride });
  };

  /**
   * Get the appropriate inline style for the editor state. If an
   * override is in place, use it. Otherwise, the current style is
   * based on the location of the selection state.
   */


  EditorState.prototype.getCurrentInlineStyle = function getCurrentInlineStyle() {
    var override = this.getInlineStyleOverride();
    if (override != null) {
      return override;
    }

    var content = this.getCurrentContent();
    var selection = this.getSelection();

    if (selection.isCollapsed()) {
      return getInlineStyleForCollapsedSelection(content, selection);
    }

    return getInlineStyleForNonCollapsedSelection(content, selection);
  };

  EditorState.prototype.getBlockTree = function getBlockTree(blockKey) {
    return this.getImmutable().getIn(['treeMap', blockKey]);
  };

  EditorState.prototype.isSelectionAtStartOfContent = function isSelectionAtStartOfContent() {
    var firstKey = this.getCurrentContent().getBlockMap().first().getKey();
    return this.getSelection().hasEdgeWithin(firstKey, 0, 0);
  };

  EditorState.prototype.isSelectionAtEndOfContent = function isSelectionAtEndOfContent() {
    var content = this.getCurrentContent();
    var blockMap = content.getBlockMap();
    var last = blockMap.last();
    var end = last.getLength();
    return this.getSelection().hasEdgeWithin(last.getKey(), end, end);
  };

  EditorState.prototype.getDirectionMap = function getDirectionMap() {
    return this.getImmutable().get('directionMap');
  };

  /**
   * Incorporate native DOM selection changes into the EditorState. This
   * method can be used when we simply want to accept whatever the DOM
   * has given us to represent selection, and we do not need to re-render
   * the editor.
   *
   * To forcibly move the DOM selection, see `EditorState.forceSelection`.
   */


  EditorState.acceptSelection = function acceptSelection(editorState, selection) {
    return updateSelection(editorState, selection, false);
  };

  /**
   * At times, we need to force the DOM selection to be where we
   * need it to be. This can occur when the anchor or focus nodes
   * are non-text nodes, for instance. In this case, we want to trigger
   * a re-render of the editor, which in turn forces selection into
   * the correct place in the DOM. The `forceSelection` method
   * accomplishes this.
   *
   * This method should be used in cases where you need to explicitly
   * move the DOM selection from one place to another without a change
   * in ContentState.
   */


  EditorState.forceSelection = function forceSelection(editorState, selection) {
    if (!selection.getHasFocus()) {
      selection = selection.set('hasFocus', true);
    }
    return updateSelection(editorState, selection, true);
  };

  /**
   * Move selection to the end of the editor without forcing focus.
   */


  EditorState.moveSelectionToEnd = function moveSelectionToEnd(editorState) {
    var content = editorState.getCurrentContent();
    var lastBlock = content.getLastBlock();
    var lastKey = lastBlock.getKey();
    var length = lastBlock.getLength();

    return EditorState.acceptSelection(editorState, new SelectionState({
      anchorKey: lastKey,
      anchorOffset: length,
      focusKey: lastKey,
      focusOffset: length,
      isBackward: false
    }));
  };

  /**
   * Force focus to the end of the editor. This is useful in scenarios
   * where we want to programmatically focus the input and it makes sense
   * to allow the user to continue working seamlessly.
   */


  EditorState.moveFocusToEnd = function moveFocusToEnd(editorState) {
    var afterSelectionMove = EditorState.moveSelectionToEnd(editorState);
    return EditorState.forceSelection(afterSelectionMove, afterSelectionMove.getSelection());
  };

  /**
   * Push the current ContentState onto the undo stack if it should be
   * considered a boundary state, and set the provided ContentState as the
   * new current content.
   */


  EditorState.push = function push(editorState, contentState, changeType) {
    if (editorState.getCurrentContent() === contentState) {
      return editorState;
    }

    var forceSelection = changeType !== 'insert-characters';
    var directionMap = EditorBidiService.getDirectionMap(contentState, editorState.getDirectionMap());

    if (!editorState.getAllowUndo()) {
      return EditorState.set(editorState, {
        currentContent: contentState,
        directionMap: directionMap,
        lastChangeType: changeType,
        selection: contentState.getSelectionAfter(),
        forceSelection: forceSelection,
        inlineStyleOverride: null
      });
    }

    var selection = editorState.getSelection();
    var currentContent = editorState.getCurrentContent();
    var undoStack = editorState.getUndoStack();
    var newContent = contentState;

    if (selection !== currentContent.getSelectionAfter() || mustBecomeBoundary(editorState, changeType)) {
      undoStack = undoStack.push(currentContent);
      newContent = newContent.set('selectionBefore', selection);
    } else if (changeType === 'insert-characters' || changeType === 'backspace-character' || changeType === 'delete-character') {
      // Preserve the previous selection.
      newContent = newContent.set('selectionBefore', currentContent.getSelectionBefore());
    }

    var inlineStyleOverride = editorState.getInlineStyleOverride();

    // Don't discard inline style overrides for the following change types:
    var overrideChangeTypes = ['adjust-depth', 'change-block-type', 'split-block'];

    if (overrideChangeTypes.indexOf(changeType) === -1) {
      inlineStyleOverride = null;
    }

    var editorStateChanges = {
      currentContent: newContent,
      directionMap: directionMap,
      undoStack: undoStack,
      redoStack: Stack(),
      lastChangeType: changeType,
      selection: contentState.getSelectionAfter(),
      forceSelection: forceSelection,
      inlineStyleOverride: inlineStyleOverride
    };

    return EditorState.set(editorState, editorStateChanges);
  };

  /**
   * Make the top ContentState in the undo stack the new current content and
   * push the current content onto the redo stack.
   */


  EditorState.undo = function undo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var undoStack = editorState.getUndoStack();
    var newCurrentContent = undoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: undoStack.shift(),
      redoStack: editorState.getRedoStack().push(currentContent),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'undo',
      nativelyRenderedContent: null,
      selection: currentContent.getSelectionBefore()
    });
  };

  /**
   * Make the top ContentState in the redo stack the new current content and
   * push the current content onto the undo stack.
   */


  EditorState.redo = function redo(editorState) {
    if (!editorState.getAllowUndo()) {
      return editorState;
    }

    var redoStack = editorState.getRedoStack();
    var newCurrentContent = redoStack.peek();
    if (!newCurrentContent) {
      return editorState;
    }

    var currentContent = editorState.getCurrentContent();
    var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

    return EditorState.set(editorState, {
      currentContent: newCurrentContent,
      directionMap: directionMap,
      undoStack: editorState.getUndoStack().push(currentContent),
      redoStack: redoStack.shift(),
      forceSelection: true,
      inlineStyleOverride: null,
      lastChangeType: 'redo',
      nativelyRenderedContent: null,
      selection: newCurrentContent.getSelectionAfter()
    });
  };

  /**
   * Not for public consumption.
   */


  function EditorState(immutable) {
    _classCallCheck(this, EditorState);

    this._immutable = immutable;
  }

  /**
   * Not for public consumption.
   */


  EditorState.prototype.getImmutable = function getImmutable() {
    return this._immutable;
  };

  return EditorState;
}();

/**
 * Set the supplied SelectionState as the new current selection, and set
 * the `force` flag to trigger manual selection placement by the view.
 */


function updateSelection(editorState, selection, forceSelection) {
  return EditorState.set(editorState, {
    selection: selection,
    forceSelection: forceSelection,
    nativelyRenderedContent: null,
    inlineStyleOverride: null
  });
}

/**
 * Regenerate the entire tree map for a given ContentState and decorator.
 * Returns an OrderedMap that maps all available ContentBlock objects.
 */
function generateNewTreeMap(contentState, decorator) {
  return contentState.getBlockMap().map(function (block) {
    return BlockTree.generate(contentState, block, decorator);
  }).toOrderedMap();
}

/**
 * Regenerate tree map objects for all ContentBlocks that have changed
 * between the current editorState and newContent. Returns an OrderedMap
 * with only changed regenerated tree map objects.
 */
function regenerateTreeForNewBlocks(editorState, newBlockMap, newEntityMap, decorator) {
  var contentState = editorState.getCurrentContent().set('entityMap', newEntityMap);
  var prevBlockMap = contentState.getBlockMap();
  var prevTreeMap = editorState.getImmutable().get('treeMap');
  return prevTreeMap.merge(newBlockMap.toSeq().filter(function (block, key) {
    return block !== prevBlockMap.get(key);
  }).map(function (block) {
    return BlockTree.generate(contentState, block, decorator);
  }));
}

/**
 * Generate tree map objects for a new decorator object, preserving any
 * decorations that are unchanged from the previous decorator.
 *
 * Note that in order for this to perform optimally, decoration Lists for
 * decorators should be preserved when possible to allow for direct immutable
 * List comparison.
 */
function regenerateTreeForNewDecorator(content, blockMap, previousTreeMap, decorator, existingDecorator) {
  return previousTreeMap.merge(blockMap.toSeq().filter(function (block) {
    return decorator.getDecorations(block, content) !== existingDecorator.getDecorations(block, content);
  }).map(function (block) {
    return BlockTree.generate(content, block, decorator);
  }));
}

/**
 * Return whether a change should be considered a boundary state, given
 * the previous change type. Allows us to discard potential boundary states
 * during standard typing or deletion behavior.
 */
function mustBecomeBoundary(editorState, changeType) {
  var lastChangeType = editorState.getLastChangeType();
  return changeType !== lastChangeType || changeType !== 'insert-characters' && changeType !== 'backspace-character' && changeType !== 'delete-character';
}

function getInlineStyleForCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If the cursor is not at the start of the block, look backward to
  // preserve the style of the preceding character.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // The caret is at position zero in this block. If the block has any
  // text at all, use the style of the first character.
  if (startBlock.getLength()) {
    return startBlock.getInlineStyleAt(0);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function getInlineStyleForNonCollapsedSelection(content, selection) {
  var startKey = selection.getStartKey();
  var startOffset = selection.getStartOffset();
  var startBlock = content.getBlockForKey(startKey);

  // If there is a character just inside the selection, use its style.
  if (startOffset < startBlock.getLength()) {
    return startBlock.getInlineStyleAt(startOffset);
  }

  // Check if the selection at the end of a non-empty block. Use the last
  // style in the block.
  if (startOffset > 0) {
    return startBlock.getInlineStyleAt(startOffset - 1);
  }

  // Otherwise, look upward in the document to find the closest character.
  return lookUpwardForInlineStyle(content, startKey);
}

function lookUpwardForInlineStyle(content, fromKey) {
  var lastNonEmpty = content.getBlockMap().reverse().skipUntil(function (_, k) {
    return k === fromKey;
  }).skip(1).skipUntil(function (block, _) {
    return block.getLength();
  }).first();

  if (lastNonEmpty) return lastNonEmpty.getInlineStyleAt(lastNonEmpty.getLength() - 1);
  return OrderedSet();
}

module.exports = EditorState;
},{"object-assign":82,"./BlockTree":120,"./ContentState":29,"./EditorBidiService":121,"immutable":132,"./SelectionState":40}],89:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveBlockInContentState
 * @format
 * 
 */

'use strict';

var ContentBlockNode = require('./ContentBlockNode');
var Immutable = require('immutable');

var getNextDelimiterBlockKey = require('./getNextDelimiterBlockKey');
var invariant = require('fbjs/lib/invariant');

var OrderedMap = Immutable.OrderedMap,
    List = Immutable.List;

var transformBlock = function transformBlock(key, blockMap, func) {
  if (!key) {
    return;
  }

  var block = blockMap.get(key);

  if (!block) {
    return;
  }

  blockMap.set(key, func(block));
};

var updateBlockMapLinks = function updateBlockMapLinks(blockMap, originalBlockToBeMoved, originalTargetBlock, insertionMode, isExperimentalTreeBlock) {
  if (!isExperimentalTreeBlock) {
    return blockMap;
  }
  // possible values of 'insertionMode' are: 'after', 'before'
  var isInsertedAfterTarget = insertionMode === 'after';

  var originalBlockKey = originalBlockToBeMoved.getKey();
  var originalTargetKey = originalTargetBlock.getKey();
  var originalParentKey = originalBlockToBeMoved.getParentKey();
  var originalNextSiblingKey = originalBlockToBeMoved.getNextSiblingKey();
  var originalPrevSiblingKey = originalBlockToBeMoved.getPrevSiblingKey();
  var newParentKey = originalTargetBlock.getParentKey();
  var newNextSiblingKey = isInsertedAfterTarget ? originalTargetBlock.getNextSiblingKey() : originalTargetKey;
  var newPrevSiblingKey = isInsertedAfterTarget ? originalTargetKey : originalTargetBlock.getPrevSiblingKey();

  return blockMap.withMutations(function (blocks) {
    // update old parent
    transformBlock(originalParentKey, blocks, function (block) {
      var parentChildrenList = block.getChildKeys();
      return block.merge({
        children: parentChildrenList['delete'](parentChildrenList.indexOf(originalBlockKey))
      });
    });

    // update old prev
    transformBlock(originalPrevSiblingKey, blocks, function (block) {
      return block.merge({
        nextSibling: originalNextSiblingKey
      });
    });

    // update old next
    transformBlock(originalNextSiblingKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalPrevSiblingKey
      });
    });

    // update new next
    transformBlock(newNextSiblingKey, blocks, function (block) {
      return block.merge({
        prevSibling: originalBlockKey
      });
    });

    // update new prev
    transformBlock(newPrevSiblingKey, blocks, function (block) {
      return block.merge({
        nextSibling: originalBlockKey
      });
    });

    // update new parent
    transformBlock(newParentKey, blocks, function (block) {
      var newParentChildrenList = block.getChildKeys();
      var targetBlockIndex = newParentChildrenList.indexOf(originalTargetKey);

      var insertionIndex = isInsertedAfterTarget ? targetBlockIndex + 1 : targetBlockIndex !== 0 ? targetBlockIndex - 1 : 0;

      var newChildrenArray = newParentChildrenList.toArray();
      newChildrenArray.splice(insertionIndex, 0, originalBlockKey);

      return block.merge({
        children: List(newChildrenArray)
      });
    });

    // update block
    transformBlock(originalBlockKey, blocks, function (block) {
      return block.merge({
        nextSibling: newNextSiblingKey,
        prevSibling: newPrevSiblingKey,
        parent: newParentKey
      });
    });
  });
};

var moveBlockInContentState = function moveBlockInContentState(contentState, blockToBeMoved, targetBlock, insertionMode) {
  !(insertionMode !== 'replace') ? 'production' !== 'production' ? invariant(false, 'Replacing blocks is not supported.') : invariant(false) : void 0;

  var targetKey = targetBlock.getKey();
  var blockKey = blockToBeMoved.getKey();

  !(blockKey !== targetKey) ? 'production' !== 'production' ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

  var blockMap = contentState.getBlockMap();
  var isExperimentalTreeBlock = blockToBeMoved instanceof ContentBlockNode;

  var blocksToBeMoved = [blockToBeMoved];
  var blockMapWithoutBlocksToBeMoved = blockMap['delete'](blockKey);

  if (isExperimentalTreeBlock) {
    blocksToBeMoved = [];
    blockMapWithoutBlocksToBeMoved = blockMap.withMutations(function (blocks) {
      var nextSiblingKey = blockToBeMoved.getNextSiblingKey();
      var nextDelimiterBlockKey = getNextDelimiterBlockKey(blockToBeMoved, blocks);

      blocks.toSeq().skipUntil(function (block) {
        return block.getKey() === blockKey;
      }).takeWhile(function (block) {
        var key = block.getKey();
        var isBlockToBeMoved = key === blockKey;
        var hasNextSiblingAndIsNotNextSibling = nextSiblingKey && key !== nextSiblingKey;
        var doesNotHaveNextSiblingAndIsNotDelimiter = !nextSiblingKey && block.getParentKey() && (!nextDelimiterBlockKey || key !== nextDelimiterBlockKey);

        return !!(isBlockToBeMoved || hasNextSiblingAndIsNotNextSibling || doesNotHaveNextSiblingAndIsNotDelimiter);
      }).forEach(function (block) {
        blocksToBeMoved.push(block);
        blocks['delete'](block.getKey());
      });
    });
  }

  var blocksBefore = blockMapWithoutBlocksToBeMoved.toSeq().takeUntil(function (v) {
    return v === targetBlock;
  });

  var blocksAfter = blockMapWithoutBlocksToBeMoved.toSeq().skipUntil(function (v) {
    return v === targetBlock;
  }).skip(1);

  var slicedBlocks = blocksToBeMoved.map(function (block) {
    return [block.getKey(), block];
  });

  var newBlocks = OrderedMap();

  if (insertionMode === 'before') {
    var blockBefore = contentState.getBlockBefore(targetKey);

    !(!blockBefore || blockBefore.getKey() !== blockToBeMoved.getKey()) ? 'production' !== 'production' ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

    newBlocks = blocksBefore.concat([].concat(slicedBlocks, [[targetKey, targetBlock]]), blocksAfter).toOrderedMap();
  } else if (insertionMode === 'after') {
    var blockAfter = contentState.getBlockAfter(targetKey);

    !(!blockAfter || blockAfter.getKey() !== blockKey) ? 'production' !== 'production' ? invariant(false, 'Block cannot be moved next to itself.') : invariant(false) : void 0;

    newBlocks = blocksBefore.concat([[targetKey, targetBlock]].concat(slicedBlocks), blocksAfter).toOrderedMap();
  }

  return contentState.merge({
    blockMap: updateBlockMapLinks(newBlocks, blockToBeMoved, targetBlock, insertionMode, isExperimentalTreeBlock),
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: contentState.getSelectionAfter().merge({
      anchorKey: blockKey,
      focusKey: blockKey
    })
  });
};

module.exports = moveBlockInContentState;
},{"./ContentBlockNode":87,"immutable":132,"./getNextDelimiterBlockKey":137,"fbjs/lib/invariant":79}],24:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var BlockMapBuilder = require('./BlockMapBuilder');
var CharacterMetadata = require('./CharacterMetadata');
var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var Immutable = require('immutable');
var SelectionState = require('./SelectionState');

var generateRandomKey = require('./generateRandomKey');
var moveBlockInContentState = require('./moveBlockInContentState');

var experimentalTreeDataSupport = DraftFeatureFlags.draft_tree_data_support;
var ContentBlockRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;

var List = Immutable.List,
    Repeat = Immutable.Repeat;


var AtomicBlockUtils = {
  insertAtomicBlock: function insertAtomicBlock(editorState, entityKey, character) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var afterRemoval = DraftModifier.removeRange(contentState, selectionState, 'backward');

    var targetSelection = afterRemoval.getSelectionAfter();
    var afterSplit = DraftModifier.splitBlock(afterRemoval, targetSelection);
    var insertionTarget = afterSplit.getSelectionAfter();

    var asAtomicBlock = DraftModifier.setBlockType(afterSplit, insertionTarget, 'atomic');

    var charData = CharacterMetadata.create({ entity: entityKey });

    var atomicBlockConfig = {
      key: generateRandomKey(),
      type: 'atomic',
      text: character,
      characterList: List(Repeat(charData, character.length))
    };

    var atomicDividerBlockConfig = {
      key: generateRandomKey(),
      type: 'unstyled'
    };

    if (experimentalTreeDataSupport) {
      atomicBlockConfig = _extends({}, atomicBlockConfig, {
        nextSibling: atomicDividerBlockConfig.key
      });
      atomicDividerBlockConfig = _extends({}, atomicDividerBlockConfig, {
        prevSibling: atomicBlockConfig.key
      });
    }

    var fragmentArray = [new ContentBlockRecord(atomicBlockConfig), new ContentBlockRecord(atomicDividerBlockConfig)];

    var fragment = BlockMapBuilder.createFromArray(fragmentArray);

    var withAtomicBlock = DraftModifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);

    var newContent = withAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState.push(editorState, newContent, 'insert-fragment');
  },

  moveAtomicBlock: function moveAtomicBlock(editorState, atomicBlock, targetRange, insertionMode) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var withMovedAtomicBlock = void 0;

    if (insertionMode === 'before' || insertionMode === 'after') {
      var targetBlock = contentState.getBlockForKey(insertionMode === 'before' ? targetRange.getStartKey() : targetRange.getEndKey());

      withMovedAtomicBlock = moveBlockInContentState(contentState, atomicBlock, targetBlock, insertionMode);
    } else {
      var afterRemoval = DraftModifier.removeRange(contentState, targetRange, 'backward');

      var selectionAfterRemoval = afterRemoval.getSelectionAfter();
      var _targetBlock = afterRemoval.getBlockForKey(selectionAfterRemoval.getFocusKey());

      if (selectionAfterRemoval.getStartOffset() === 0) {
        withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, 'before');
      } else if (selectionAfterRemoval.getEndOffset() === _targetBlock.getLength()) {
        withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, 'after');
      } else {
        var afterSplit = DraftModifier.splitBlock(afterRemoval, selectionAfterRemoval);

        var selectionAfterSplit = afterSplit.getSelectionAfter();
        var _targetBlock2 = afterSplit.getBlockForKey(selectionAfterSplit.getFocusKey());

        withMovedAtomicBlock = moveBlockInContentState(afterSplit, atomicBlock, _targetBlock2, 'before');
      }
    }

    var newContent = withMovedAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withMovedAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return EditorState.push(editorState, newContent, 'move-block');
  }
};

module.exports = AtomicBlockUtils;
},{"object-assign":82,"./BlockMapBuilder":25,"./CharacterMetadata":26,"./ContentBlock":28,"./ContentBlockNode":87,"./DraftFeatureFlags":88,"./DraftModifier":35,"./EditorState":37,"immutable":132,"./SelectionState":40,"./generateRandomKey":44,"./moveBlockInContentState":89}],27:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CompositeDraftDecorator
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Immutable = require('immutable');

var List = Immutable.List;


var DELIMITER = '.';

/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */

var CompositeDraftDecorator = function () {
  function CompositeDraftDecorator(decorators) {
    _classCallCheck(this, CompositeDraftDecorator);

    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this._decorators = decorators.slice();
  }

  CompositeDraftDecorator.prototype.getDecorations = function getDecorations(block, contentState) {
    var decorations = Array(block.getText().length).fill(null);

    this._decorators.forEach(function ( /*object*/decorator, /*number*/ii) {
      var counter = 0;
      var strategy = decorator.strategy;
      var callback = function callback( /*number*/start, /*number*/end) {
        // Find out if any of our matching range is already occupied
        // by another decorator. If so, discard the match. Otherwise, store
        // the component key for rendering.
        if (canOccupySlice(decorations, start, end)) {
          occupySlice(decorations, start, end, ii + DELIMITER + counter);
          counter++;
        }
      };
      strategy(block, callback, contentState);
    });

    return List(decorations);
  };

  CompositeDraftDecorator.prototype.getComponentForKey = function getComponentForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].component;
  };

  CompositeDraftDecorator.prototype.getPropsForKey = function getPropsForKey(key) {
    var componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this._decorators[componentKey].props;
  };

  return CompositeDraftDecorator;
}();

/**
 * Determine whether we can occupy the specified slice of the decorations
 * array.
 */


function canOccupySlice(decorations, start, end) {
  for (var ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }
  return true;
}

/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */
function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

module.exports = CompositeDraftDecorator;
},{"immutable":132}],113:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function (className) {
      return classNames[className];
    }).map(replace).join(' ');
  }
  return Array.prototype.map.call(arguments, replace).join(' ');
}

function replace(str) {
  return str.replace(/\//g, '-');
}

module.exports = cx;
},{}],30:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultDraftBlockRenderMap
 * @format
 * 
 */

'use strict';

var _require = require('immutable'),
    Map = _require.Map;

var React = require('react');

var cx = require('fbjs/lib/cx');

var UL_WRAP = React.createElement('ul', { className: cx('public/DraftStyleDefault/ul') });
var OL_WRAP = React.createElement('ol', { className: cx('public/DraftStyleDefault/ol') });
var PRE_WRAP = React.createElement('pre', { className: cx('public/DraftStyleDefault/pre') });

var DefaultDraftBlockRenderMap = Map({
  'header-one': {
    element: 'h1'
  },
  'header-two': {
    element: 'h2'
  },
  'header-three': {
    element: 'h3'
  },
  'header-four': {
    element: 'h4'
  },
  'header-five': {
    element: 'h5'
  },
  'header-six': {
    element: 'h6'
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: UL_WRAP
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: OL_WRAP
  },
  blockquote: {
    element: 'blockquote'
  },
  atomic: {
    element: 'figure'
  },
  'code-block': {
    element: 'pre',
    wrapper: PRE_WRAP
  },
  unstyled: {
    element: 'div',
    aliasedElements: ['p']
  }
});

module.exports = DefaultDraftBlockRenderMap;
},{"immutable":132,"react":8,"fbjs/lib/cx":113}],31:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultDraftInlineStyle
 * @format
 * 
 */

'use strict';

module.exports = {
  BOLD: {
    fontWeight: 'bold'
  },

  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-word'
  },

  ITALIC: {
    fontStyle: 'italic'
  },

  STRIKETHROUGH: {
    textDecoration: 'line-through'
  },

  UNDERLINE: {
    textDecoration: 'underline'
  }
};
},{}],123:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

module.exports = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105
};
},{}],166:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEntityKeyForSelection
 * @format
 * 
 */

'use strict';

/**
 * Return the entity key that should be used when inserting text for the
 * specified target selection, only if the entity is `MUTABLE`. `IMMUTABLE`
 * and `SEGMENTED` entities should not be used for insertion behavior.
 */
function getEntityKeyForSelection(contentState, targetSelection) {
  var entityKey;

  if (targetSelection.isCollapsed()) {
    var key = targetSelection.getAnchorKey();
    var offset = targetSelection.getAnchorOffset();
    if (offset > 0) {
      entityKey = contentState.getBlockForKey(key).getEntityAt(offset - 1);
      if (entityKey !== contentState.getBlockForKey(key).getEntityAt(offset)) {
        return null;
      }
      return filterKey(contentState.getEntityMap(), entityKey);
    }
    return null;
  }

  var startKey = targetSelection.getStartKey();
  var startOffset = targetSelection.getStartOffset();
  var startBlock = contentState.getBlockForKey(startKey);

  entityKey = startOffset === startBlock.getLength() ? null : startBlock.getEntityAt(startOffset);

  return filterKey(contentState.getEntityMap(), entityKey);
}

/**
 * Determine whether an entity key corresponds to a `MUTABLE` entity. If so,
 * return it. If not, return null.
 */
function filterKey(entityMap, entityKey) {
  if (entityKey) {
    var entity = entityMap.__get(entityKey);
    return entity.getMutability() === 'MUTABLE' ? entityKey : null;
  }
  return null;
}

module.exports = getEntityKeyForSelection;
},{}],150:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventHandled
 * @format
 * 
 */

'use strict';

/**
 * Utility method for determining whether or not the value returned
 * from a handler indicates that it was handled.
 */
function isEventHandled(value) {
  return value === 'handled' || value === true;
}

module.exports = isEventHandled;
},{}],167:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isSelectionAtLeafStart
 * @format
 * 
 */

'use strict';

function isSelectionAtLeafStart(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var blockTree = editorState.getBlockTree(anchorKey);
  var offset = selection.getStartOffset();

  var isAtStart = false;

  blockTree.some(function (leafSet) {
    if (offset === leafSet.get('start')) {
      isAtStart = true;
      return true;
    }

    if (offset < leafSet.get('end')) {
      return leafSet.get('leaves').some(function (leaf) {
        var leafStart = leaf.get('start');
        if (offset === leafStart) {
          isAtStart = true;
          return true;
        }

        return false;
      });
    }

    return false;
  });

  return isAtStart;
}

module.exports = isSelectionAtLeafStart;
},{}],114:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorCompositionHandler
 * @format
 * 
 */

'use strict';

var DraftFeatureFlags = require('./DraftFeatureFlags');
var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var Keys = require('fbjs/lib/Keys');

var getEntityKeyForSelection = require('./getEntityKeyForSelection');
var isEventHandled = require('./isEventHandled');
var isSelectionAtLeafStart = require('./isSelectionAtLeafStart');

/**
 * Millisecond delay to allow `compositionstart` to fire again upon
 * `compositionend`.
 *
 * This is used for Korean input to ensure that typing can continue without
 * the editor trying to render too quickly. More specifically, Safari 7.1+
 * triggers `compositionstart` a little slower than Chrome/FF, which
 * leads to composed characters being resolved and re-render occurring
 * sooner than we want.
 */
var RESOLVE_DELAY = 20;

/**
 * A handful of variables used to track the current composition and its
 * resolution status. These exist at the module level because it is not
 * possible to have compositions occurring in multiple editors simultaneously,
 * and it simplifies state management with respect to the DraftEditor component.
 */
var resolved = false;
var stillComposing = false;
var textInputData = '';

var DraftEditorCompositionHandler = {
  onBeforeInput: function onBeforeInput(editor, e) {
    textInputData = (textInputData || '') + e.data;
  },

  /**
   * A `compositionstart` event has fired while we're still in composition
   * mode. Continue the current composition session to prevent a re-render.
   */
  onCompositionStart: function onCompositionStart(editor) {
    stillComposing = true;
  },

  /**
   * Attempt to end the current composition session.
   *
   * Defer handling because browser will still insert the chars into active
   * element after `compositionend`. If a `compositionstart` event fires
   * before `resolveComposition` executes, our composition session will
   * continue.
   *
   * The `resolved` flag is useful because certain IME interfaces fire the
   * `compositionend` event multiple times, thus queueing up multiple attempts
   * at handling the composition. Since handling the same composition event
   * twice could break the DOM, we only use the first event. Example: Arabic
   * Google Input Tools on Windows 8.1 fires `compositionend` three times.
   */
  onCompositionEnd: function onCompositionEnd(editor) {
    resolved = false;
    stillComposing = false;
    setTimeout(function () {
      if (!resolved) {
        DraftEditorCompositionHandler.resolveComposition(editor);
      }
    }, RESOLVE_DELAY);
  },

  /**
   * In Safari, keydown events may fire when committing compositions. If
   * the arrow keys are used to commit, prevent default so that the cursor
   * doesn't move, otherwise it will jump back noticeably on re-render.
   */
  onKeyDown: function onKeyDown(editor, e) {
    if (!stillComposing) {
      // If a keydown event is received after compositionend but before the
      // 20ms timer expires (ex: type option-E then backspace, or type A then
      // backspace in 2-Set Korean), we should immediately resolve the
      // composition and reinterpret the key press in edit mode.
      DraftEditorCompositionHandler.resolveComposition(editor);
      editor._onKeyDown(e);
      return;
    }
    if (e.which === Keys.RIGHT || e.which === Keys.LEFT) {
      e.preventDefault();
    }
  },

  /**
   * Keypress events may fire when committing compositions. In Firefox,
   * pressing RETURN commits the composition and inserts extra newline
   * characters that we do not want. `preventDefault` allows the composition
   * to be committed while preventing the extra characters.
   */
  onKeyPress: function onKeyPress(editor, e) {
    if (e.which === Keys.RETURN) {
      e.preventDefault();
    }
  },

  /**
   * Attempt to insert composed characters into the document.
   *
   * If we are still in a composition session, do nothing. Otherwise, insert
   * the characters into the document and terminate the composition session.
   *
   * If no characters were composed -- for instance, the user
   * deleted all composed characters and committed nothing new --
   * force a re-render. We also re-render when the composition occurs
   * at the beginning of a leaf, to ensure that if the browser has
   * created a new text node for the composition, we will discard it.
   *
   * Resetting innerHTML will move focus to the beginning of the editor,
   * so we update to force it back to the correct place.
   */
  resolveComposition: function resolveComposition(editor) {
    if (stillComposing) {
      return;
    }

    resolved = true;
    var composedChars = textInputData;
    textInputData = '';

    var editorState = EditorState.set(editor._latestEditorState, {
      inCompositionMode: false
    });

    var currentStyle = editorState.getCurrentInlineStyle();
    var entityKey = getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection());

    var mustReset = !composedChars || isSelectionAtLeafStart(editorState) || currentStyle.size > 0 || entityKey !== null;

    if (mustReset) {
      editor.restoreEditorDOM();
    }

    editor.exitCurrentMode();

    if (composedChars) {
      if (DraftFeatureFlags.draft_handlebeforeinput_composed_text && editor.props.handleBeforeInput && isEventHandled(editor.props.handleBeforeInput(composedChars, editorState))) {
        return;
      }
      // If characters have been composed, re-rendering with the update
      // is sufficient to reset the editor.
      var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), composedChars, currentStyle, entityKey);
      editor.update(EditorState.push(editorState, contentState, 'insert-characters'));
      return;
    }

    if (mustReset) {
      editor.update(EditorState.set(editorState, {
        nativelyRenderedContent: null,
        forceSelection: true
      }));
    }
  }
};

module.exports = DraftEditorCompositionHandler;
},{"./DraftFeatureFlags":88,"./DraftModifier":35,"./EditorState":37,"fbjs/lib/Keys":123,"./getEntityKeyForSelection":166,"./isEventHandled":150,"./isSelectionAtLeafStart":167}],195:[function(require,module,exports) {
var define;
/*!
 * UAParser.js v0.7.18
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.18',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var margedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }
            return margedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            //var result = {},
            var i = 0, j, k, p, q, matches, match;//, args = arguments;

            /*// construct object barebones
            for (p = 0; p < args[1].length; p++) {
                q = args[1][p];
                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
            }*/

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            // console.log(this);
            //return this;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i                             // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                                                                                // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(BIDUBrowser)[\/\s]?([\w\.]+)/i                                    // Baidu Browser
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i                                                      // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel xl|pixel)\s/i                                   // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})\s+build/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    /*
    var Browser = function (name, version) {
        this[NAME] = name;
        this[VERSION] = version;
    };
    var CPU = function (arch) {
        this[ARCHITECTURE] = arch;
    };
    var Device = function (vendor, model, type) {
        this[VENDOR] = vendor;
        this[MODEL] = model;
        this[TYPE] = type;
    };
    var Engine = Browser;
    var OS = Browser;
    */
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        //var browser = new Browser();
        //var cpu = new CPU();
        //var device = new Device();
        //var engine = new Engine();
        //var os = new OS();

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            //browser = new Browser();
            //cpu = new CPU();
            //device = new Device();
            //engine = new Engine();
            //os = new OS();
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };
    //UAParser.Utils = util;

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        // TODO: test!!!!!!!!
        /*
        if (require && require.main === module && process) {
            // cli
            var jsonize = function (arr) {
                var res = [];
                for (var i in arr) {
                    res.push(new UAParser(arr[i]).getResult());
                }
                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
            };
            if (process.stdin.isTTY) {
                // via args
                jsonize(process.argv.slice(2));
            } else {
                // via pipe
                var str = '';
                process.stdin.on('readable', function() {
                    var read = process.stdin.read();
                    if (read !== null) {
                        str += read;
                    }
                });
                process.stdin.on('end', function () {
                    jsonize(str.replace(/\n$/, '').split('\n'));
                });
            }
        }
        */
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof(define) === FUNC_TYPE && define.amd) {
            define(function () {
                return UAParser;
            });
        } else if (window) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);

},{}],168:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Usage note:
 * This module makes a best effort to export the same data we would internally.
 * At Facebook we use a server-generated module that does the parsing and
 * exports the data for the client to use. We can't rely on a server-side
 * implementation in open source so instead we make use of an open source
 * library to do the heavy lifting and then make some adjustments as necessary.
 * It's likely there will be some differences. Some we can smooth over.
 * Others are going to be harder.
 */

'use strict';

var UAParser = require('ua-parser-js');

var UNKNOWN = 'Unknown';

var PLATFORM_MAP = {
  'Mac OS': 'Mac OS X'
};

/**
 * Convert from UAParser platform name to what we expect.
 */
function convertPlatformName(name) {
  return PLATFORM_MAP[name] || name;
}

/**
 * Get the version number in parts. This is very naive. We actually get major
 * version as a part of UAParser already, which is generally good enough, but
 * let's get the minor just in case.
 */
function getBrowserVersion(version) {
  if (!version) {
    return {
      major: '',
      minor: ''
    };
  }
  var parts = version.split('.');
  return {
    major: parts[0],
    minor: parts[1]
  };
}

/**
 * Get the UA data fom UAParser and then convert it to the format we're
 * expecting for our APIS.
 */
var parser = new UAParser();
var results = parser.getResult();

// Do some conversion first.
var browserVersionData = getBrowserVersion(results.browser.version);
var uaData = {
  browserArchitecture: results.cpu.architecture || UNKNOWN,
  browserFullVersion: results.browser.version || UNKNOWN,
  browserMinorVersion: browserVersionData.minor || UNKNOWN,
  browserName: results.browser.name || UNKNOWN,
  browserVersion: results.browser.major || UNKNOWN,
  deviceName: results.device.model || UNKNOWN,
  engineName: results.engine.name || UNKNOWN,
  engineVersion: results.engine.version || UNKNOWN,
  platformArchitecture: results.cpu.architecture || UNKNOWN,
  platformName: convertPlatformName(results.os.name) || UNKNOWN,
  platformVersion: results.os.version || UNKNOWN,
  platformFullVersion: results.os.version || UNKNOWN
};

module.exports = uaData;
},{"ua-parser-js":195}],169:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var invariant = require('./invariant');

var componentRegex = /\./;
var orRegex = /\|\|/;
var rangeRegex = /\s+\-\s+/;
var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
var numericRegex = /^(\d*)(.*)/;

/**
 * Splits input `range` on "||" and returns true if any subrange matches
 * `version`.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkOrExpression(range, version) {
  var expressions = range.split(orRegex);

  if (expressions.length > 1) {
    return expressions.some(function (range) {
      return VersionRange.contains(range, version);
    });
  } else {
    range = expressions[0].trim();
    return checkRangeExpression(range, version);
  }
}

/**
 * Splits input `range` on " - " (the surrounding whitespace is required) and
 * returns true if version falls between the two operands.
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkRangeExpression(range, version) {
  var expressions = range.split(rangeRegex);

  !(expressions.length > 0 && expressions.length <= 2) ? 'production' !== 'production' ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : void 0;

  if (expressions.length === 1) {
    return checkSimpleExpression(expressions[0], version);
  } else {
    var startVersion = expressions[0],
        endVersion = expressions[1];

    !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ? 'production' !== 'production' ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : void 0;

    return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
  }
}

/**
 * Checks if `range` matches `version`. `range` should be a "simple" range (ie.
 * not a compound range using the " - " or "||" operators).
 *
 * @param {string} range
 * @param {string} version
 * @returns {boolean}
 */
function checkSimpleExpression(range, version) {
  range = range.trim();
  if (range === '') {
    return true;
  }

  var versionComponents = version.split(componentRegex);

  var _getModifierAndCompon = getModifierAndComponents(range),
      modifier = _getModifierAndCompon.modifier,
      rangeComponents = _getModifierAndCompon.rangeComponents;

  switch (modifier) {
    case '<':
      return checkLessThan(versionComponents, rangeComponents);
    case '<=':
      return checkLessThanOrEqual(versionComponents, rangeComponents);
    case '>=':
      return checkGreaterThanOrEqual(versionComponents, rangeComponents);
    case '>':
      return checkGreaterThan(versionComponents, rangeComponents);
    case '~':
    case '~>':
      return checkApproximateVersion(versionComponents, rangeComponents);
    default:
      return checkEqual(versionComponents, rangeComponents);
  }
}

/**
 * Checks whether `a` is less than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThan(a, b) {
  return compareComponents(a, b) === -1;
}

/**
 * Checks whether `a` is less than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkLessThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === -1 || result === 0;
}

/**
 * Checks whether `a` is equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkEqual(a, b) {
  return compareComponents(a, b) === 0;
}

/**
 * Checks whether `a` is greater than or equal to `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThanOrEqual(a, b) {
  var result = compareComponents(a, b);
  return result === 1 || result === 0;
}

/**
 * Checks whether `a` is greater than `b`.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkGreaterThan(a, b) {
  return compareComponents(a, b) === 1;
}

/**
 * Checks whether `a` is "reasonably close" to `b` (as described in
 * https://www.npmjs.org/doc/misc/semver.html). For example, if `b` is "1.3.1"
 * then "reasonably close" is defined as ">= 1.3.1 and < 1.4".
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {boolean}
 */
function checkApproximateVersion(a, b) {
  var lowerBound = b.slice();
  var upperBound = b.slice();

  if (upperBound.length > 1) {
    upperBound.pop();
  }
  var lastIndex = upperBound.length - 1;
  var numeric = parseInt(upperBound[lastIndex], 10);
  if (isNumber(numeric)) {
    upperBound[lastIndex] = numeric + 1 + '';
  }

  return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
}

/**
 * Extracts the optional modifier (<, <=, =, >=, >, ~, ~>) and version
 * components from `range`.
 *
 * For example, given `range` ">= 1.2.3" returns an object with a `modifier` of
 * `">="` and `components` of `[1, 2, 3]`.
 *
 * @param {string} range
 * @returns {object}
 */
function getModifierAndComponents(range) {
  var rangeComponents = range.split(componentRegex);
  var matches = rangeComponents[0].match(modifierRegex);
  !matches ? 'production' !== 'production' ? invariant(false, 'expected regex to match but it did not') : invariant(false) : void 0;

  return {
    modifier: matches[1],
    rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
  };
}

/**
 * Determines if `number` is a number.
 *
 * @param {mixed} number
 * @returns {boolean}
 */
function isNumber(number) {
  return !isNaN(number) && isFinite(number);
}

/**
 * Tests whether `range` is a "simple" version number without any modifiers
 * (">", "~" etc).
 *
 * @param {string} range
 * @returns {boolean}
 */
function isSimpleVersion(range) {
  return !getModifierAndComponents(range).modifier;
}

/**
 * Zero-pads array `array` until it is at least `length` long.
 *
 * @param {array} array
 * @param {number} length
 */
function zeroPad(array, length) {
  for (var i = array.length; i < length; i++) {
    array[i] = '0';
  }
}

/**
 * Normalizes `a` and `b` in preparation for comparison by doing the following:
 *
 * - zero-pads `a` and `b`
 * - marks any "x", "X" or "*" component in `b` as equivalent by zero-ing it out
 *   in both `a` and `b`
 * - marks any final "*" component in `b` as a greedy wildcard by zero-ing it
 *   and all of its successors in `a`
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {array<array<string>>}
 */
function normalizeVersions(a, b) {
  a = a.slice();
  b = b.slice();

  zeroPad(a, b.length);

  // mark "x" and "*" components as equal
  for (var i = 0; i < b.length; i++) {
    var matches = b[i].match(/^[x*]$/i);
    if (matches) {
      b[i] = a[i] = '0';

      // final "*" greedily zeros all remaining components
      if (matches[0] === '*' && i === b.length - 1) {
        for (var j = i; j < a.length; j++) {
          a[j] = '0';
        }
      }
    }
  }

  zeroPad(b, a.length);

  return [a, b];
}

/**
 * Returns the numerical -- not the lexicographical -- ordering of `a` and `b`.
 *
 * For example, `10-alpha` is greater than `2-beta`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareNumeric(a, b) {
  var aPrefix = a.match(numericRegex)[1];
  var bPrefix = b.match(numericRegex)[1];
  var aNumeric = parseInt(aPrefix, 10);
  var bNumeric = parseInt(bPrefix, 10);

  if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
    return compare(aNumeric, bNumeric);
  } else {
    return compare(a, b);
  }
}

/**
 * Returns the ordering of `a` and `b`.
 *
 * @param {string|number} a
 * @param {string|number} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compare(a, b) {
  !(typeof a === typeof b) ? 'production' !== 'production' ? invariant(false, '"a" and "b" must be of the same type') : invariant(false) : void 0;

  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Compares arrays of version components.
 *
 * @param {array<string>} a
 * @param {array<string>} b
 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
 * or greater than `b`, respectively
 */
function compareComponents(a, b) {
  var _normalizeVersions = normalizeVersions(a, b),
      aNormalized = _normalizeVersions[0],
      bNormalized = _normalizeVersions[1];

  for (var i = 0; i < bNormalized.length; i++) {
    var result = compareNumeric(aNormalized[i], bNormalized[i]);
    if (result) {
      return result;
    }
  }

  return 0;
}

var VersionRange = {
  /**
   * Checks whether `version` satisfies the `range` specification.
   *
   * We support a subset of the expressions defined in
   * https://www.npmjs.org/doc/misc/semver.html:
   *
   *    version   Must match version exactly
   *    =version  Same as just version
   *    >version  Must be greater than version
   *    >=version Must be greater than or equal to version
   *    <version  Must be less than version
   *    <=version Must be less than or equal to version
   *    ~version  Must be at least version, but less than the next significant
   *              revision above version:
   *              "~1.2.3" is equivalent to ">= 1.2.3 and < 1.3"
   *    ~>version Equivalent to ~version
   *    1.2.x     Must match "1.2.x", where "x" is a wildcard that matches
   *              anything
   *    1.2.*     Similar to "1.2.x", but "*" in the trailing position is a
   *              "greedy" wildcard, so will match any number of additional
   *              components:
   *              "1.2.*" will match "1.2.1", "1.2.1.1", "1.2.1.1.1" etc
   *    *         Any version
   *    ""        (Empty string) Same as *
   *    v1 - v2   Equivalent to ">= v1 and <= v2"
   *    r1 || r2  Passes if either r1 or r2 are satisfied
   *
   * @param {string} range
   * @param {string} version
   * @returns {boolean}
   */
  contains: function contains(range, version) {
    return checkOrExpression(range.trim(), version.trim());
  }
};

module.exports = VersionRange;
},{"./invariant":79}],170:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;
},{}],171:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @typechecks static-only
 */

'use strict';

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;
},{}],119:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var UserAgentData = require('./UserAgentData');
var VersionRange = require('./VersionRange');

var mapObject = require('./mapObject');
var memoizeStringOnly = require('./memoizeStringOnly');

/**
 * Checks to see whether `name` and `version` satisfy `query`.
 *
 * @param {string} name Name of the browser, device, engine or platform
 * @param {?string} version Version of the browser, engine or platform
 * @param {string} query Query of form "Name [range expression]"
 * @param {?function} normalizer Optional pre-processor for range expression
 * @return {boolean}
 */
function compare(name, version, query, normalizer) {
  // check for exact match with no version
  if (name === query) {
    return true;
  }

  // check for non-matching names
  if (!query.startsWith(name)) {
    return false;
  }

  // full comparison with version
  var range = query.slice(name.length);
  if (version) {
    range = normalizer ? normalizer(range) : range;
    return VersionRange.contains(range, version);
  }

  return false;
}

/**
 * Normalizes `version` by stripping any "NT" prefix, but only on the Windows
 * platform.
 *
 * Mimics the stripping performed by the `UserAgentWindowsPlatform` PHP class.
 *
 * @param {string} version
 * @return {string}
 */
function normalizePlatformVersion(version) {
  if (UserAgentData.platformName === 'Windows') {
    return version.replace(/^\s*NT/, '');
  }

  return version;
}

/**
 * Provides client-side access to the authoritative PHP-generated User Agent
 * information supplied by the server.
 */
var UserAgent = {
  /**
   * Check if the User Agent browser matches `query`.
   *
   * `query` should be a string like "Chrome" or "Chrome > 33".
   *
   * Valid browser names include:
   *
   * - ACCESS NetFront
   * - AOL
   * - Amazon Silk
   * - Android
   * - BlackBerry
   * - BlackBerry PlayBook
   * - Chrome
   * - Chrome for iOS
   * - Chrome frame
   * - Facebook PHP SDK
   * - Facebook for iOS
   * - Firefox
   * - IE
   * - IE Mobile
   * - Mobile Safari
   * - Motorola Internet Browser
   * - Nokia
   * - Openwave Mobile Browser
   * - Opera
   * - Opera Mini
   * - Opera Mobile
   * - Safari
   * - UIWebView
   * - Unknown
   * - webOS
   * - etc...
   *
   * An authoritative list can be found in the PHP `BrowserDetector` class and
   * related classes in the same file (see calls to `new UserAgentBrowser` here:
   * https://fburl.com/50728104).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isBrowser: function isBrowser(query) {
    return compare(UserAgentData.browserName, UserAgentData.browserFullVersion, query);
  },


  /**
   * Check if the User Agent browser uses a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isBrowserArchitecture: function isBrowserArchitecture(query) {
    return compare(UserAgentData.browserArchitecture, null, query);
  },


  /**
   * Check if the User Agent device matches `query`.
   *
   * `query` should be a string like "iPhone" or "iPad".
   *
   * Valid device names include:
   *
   * - Kindle
   * - Kindle Fire
   * - Unknown
   * - iPad
   * - iPhone
   * - iPod
   * - etc...
   *
   * An authoritative list can be found in the PHP `DeviceDetector` class and
   * related classes in the same file (see calls to `new UserAgentDevice` here:
   * https://fburl.com/50728332).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name"
   * @return {boolean}
   */
  isDevice: function isDevice(query) {
    return compare(UserAgentData.deviceName, null, query);
  },


  /**
   * Check if the User Agent rendering engine matches `query`.
   *
   * `query` should be a string like "WebKit" or "WebKit >= 537".
   *
   * Valid engine names include:
   *
   * - Gecko
   * - Presto
   * - Trident
   * - WebKit
   * - etc...
   *
   * An authoritative list can be found in the PHP `RenderingEngineDetector`
   * class related classes in the same file (see calls to `new
   * UserAgentRenderingEngine` here: https://fburl.com/50728617).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isEngine: function isEngine(query) {
    return compare(UserAgentData.engineName, UserAgentData.engineVersion, query);
  },


  /**
   * Check if the User Agent platform matches `query`.
   *
   * `query` should be a string like "Windows" or "iOS 5 - 6".
   *
   * Valid platform names include:
   *
   * - Android
   * - BlackBerry OS
   * - Java ME
   * - Linux
   * - Mac OS X
   * - Mac OS X Calendar
   * - Mac OS X Internet Account
   * - Symbian
   * - SymbianOS
   * - Windows
   * - Windows Mobile
   * - Windows Phone
   * - iOS
   * - iOS Facebook Integration Account
   * - iOS Facebook Social Sharing UI
   * - webOS
   * - Chrome OS
   * - etc...
   *
   * An authoritative list can be found in the PHP `PlatformDetector` class and
   * related classes in the same file (see calls to `new UserAgentPlatform`
   * here: https://fburl.com/50729226).
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "Name [range expression]"
   * @return {boolean}
   */
  isPlatform: function isPlatform(query) {
    return compare(UserAgentData.platformName, UserAgentData.platformFullVersion, query, normalizePlatformVersion);
  },


  /**
   * Check if the User Agent platform is a 32 or 64 bit architecture.
   *
   * @note Function results are memoized
   *
   * @param {string} query Query of the form "32" or "64".
   * @return {boolean}
   */
  isPlatformArchitecture: function isPlatformArchitecture(query) {
    return compare(UserAgentData.platformArchitecture, null, query);
  }
};

module.exports = mapObject(UserAgent, memoizeStringOnly);
},{"./UserAgentData":168,"./VersionRange":169,"./mapObject":170,"./memoizeStringOnly":171}],164:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorTextNode.react
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var React = require('react');
var ReactDOM = require('react-dom');
var UserAgent = require('fbjs/lib/UserAgent');

var invariant = require('fbjs/lib/invariant');

// In IE, spans with <br> tags render as two newlines. By rendering a span
// with only a newline character, we can be sure to render a single line.
var useNewlineChar = UserAgent.isBrowser('IE <= 11');

/**
 * Check whether the node should be considered a newline.
 */
function isNewline(node) {
  return useNewlineChar ? node.textContent === '\n' : node.tagName === 'BR';
}

/**
 * Placeholder elements for empty text content.
 *
 * What is this `data-text` attribute, anyway? It turns out that we need to
 * put an attribute on the lowest-level text node in order to preserve correct
 * spellcheck handling. If the <span> is naked, Chrome and Safari may do
 * bizarre things to do the DOM -- split text nodes, create extra spans, etc.
 * If the <span> has an attribute, this appears not to happen.
 * See http://jsfiddle.net/9khdavod/ for the failure case, and
 * http://jsfiddle.net/7pg143f7/ for the fixed case.
 */
var NEWLINE_A = useNewlineChar ? React.createElement('span', { key: 'A', 'data-text': 'true' }, '\n') : React.createElement('br', { key: 'A', 'data-text': 'true' });

var NEWLINE_B = useNewlineChar ? React.createElement('span', { key: 'B', 'data-text': 'true' }, '\n') : React.createElement('br', { key: 'B', 'data-text': 'true' });

/**
 * The lowest-level component in a `DraftEditor`, the text node component
 * replaces the default React text node implementation. This allows us to
 * perform custom handling of newline behavior and avoid re-rendering text
 * nodes with DOM state that already matches the expectations of our immutable
 * editor state.
 */
var DraftEditorTextNode = function (_React$Component) {
  _inherits(DraftEditorTextNode, _React$Component);

  function DraftEditorTextNode(props) {
    _classCallCheck(this, DraftEditorTextNode);

    // By flipping this flag, we also keep flipping keys which forces
    // React to remount this node every time it rerenders.
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._forceFlag = false;
    return _this;
  }

  DraftEditorTextNode.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var node = ReactDOM.findDOMNode(this);
    var shouldBeNewline = nextProps.children === '';
    !(node instanceof Element) ? "production" !== 'production' ? invariant(false, 'node is not an Element') : invariant(false) : void 0;
    if (shouldBeNewline) {
      return !isNewline(node);
    }
    return node.textContent !== nextProps.children;
  };

  DraftEditorTextNode.prototype.componentDidMount = function componentDidMount() {
    this._forceFlag = !this._forceFlag;
  };

  DraftEditorTextNode.prototype.componentDidUpdate = function componentDidUpdate() {
    this._forceFlag = !this._forceFlag;
  };

  DraftEditorTextNode.prototype.render = function render() {
    if (this.props.children === '') {
      return this._forceFlag ? NEWLINE_A : NEWLINE_B;
    }
    return React.createElement('span', { key: this._forceFlag ? 'A' : 'B', 'data-text': 'true' }, this.props.children);
  };

  return DraftEditorTextNode;
}(React.Component);

module.exports = DraftEditorTextNode;
},{"react":8,"react-dom":7,"fbjs/lib/UserAgent":119,"fbjs/lib/invariant":79}],194:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftJsDebugLogging
 */

'use strict';

module.exports = {
  logSelectionStateFailure: function logSelectionStateFailure() {
    return null;
  }
};
},{}],165:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule setDraftEditorSelection
 * @format
 * 
 */

'use strict';

var DraftJsDebugLogging = require('./DraftJsDebugLogging');

var containsNode = require('fbjs/lib/containsNode');
var getActiveElement = require('fbjs/lib/getActiveElement');
var invariant = require('fbjs/lib/invariant');

function getAnonymizedDOM(node, getNodeLabels) {
  if (!node) {
    return '[empty]';
  }

  var anonymized = anonymizeTextWithin(node, getNodeLabels);
  if (anonymized.nodeType === Node.TEXT_NODE) {
    return anonymized.textContent;
  }

  !(anonymized instanceof Element) ? 'production' !== 'production' ? invariant(false, 'Node must be an Element if it is not a text node.') : invariant(false) : void 0;
  return anonymized.outerHTML;
}

function anonymizeTextWithin(node, getNodeLabels) {
  var labels = getNodeLabels !== undefined ? getNodeLabels(node) : [];

  if (node.nodeType === Node.TEXT_NODE) {
    var length = node.textContent.length;
    return document.createTextNode('[text ' + length + (labels.length ? ' | ' + labels.join(', ') : '') + ']');
  }

  var clone = node.cloneNode();
  if (clone.nodeType === 1 && labels.length) {
    clone.setAttribute('data-labels', labels.join(', '));
  }
  var childNodes = node.childNodes;
  for (var ii = 0; ii < childNodes.length; ii++) {
    clone.appendChild(anonymizeTextWithin(childNodes[ii], getNodeLabels));
  }

  return clone;
}

function getAnonymizedEditorDOM(node, getNodeLabels) {
  // grabbing the DOM content of the Draft editor
  var currentNode = node;
  while (currentNode) {
    if (currentNode instanceof Element && currentNode.hasAttribute('contenteditable')) {
      // found the Draft editor container
      return getAnonymizedDOM(currentNode, getNodeLabels);
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return 'Could not find contentEditable parent of node';
}

function getNodeLength(node) {
  return node.nodeValue === null ? node.childNodes.length : node.nodeValue.length;
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 */
function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
  // It's possible that the editor has been removed from the DOM but
  // our selection code doesn't know it yet. Forcing selection in
  // this case may lead to errors, so just bail now.
  if (!containsNode(document.documentElement, node)) {
    return;
  }

  var selection = global.getSelection();
  var anchorKey = selectionState.getAnchorKey();
  var anchorOffset = selectionState.getAnchorOffset();
  var focusKey = selectionState.getFocusKey();
  var focusOffset = selectionState.getFocusOffset();
  var isBackward = selectionState.getIsBackward();

  // IE doesn't support backward selection. Swap key/offset pairs.
  if (!selection.extend && isBackward) {
    var tempKey = anchorKey;
    var tempOffset = anchorOffset;
    anchorKey = focusKey;
    anchorOffset = focusOffset;
    focusKey = tempKey;
    focusOffset = tempOffset;
    isBackward = false;
  }

  var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;

  var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;

  // If the selection is entirely bound within this node, set the selection
  // and be done.
  if (hasAnchor && hasFocus) {
    selection.removeAllRanges();
    addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    return;
  }

  if (!isBackward) {
    // If the anchor is within this node, set the range start.
    if (hasAnchor) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
    }

    // If the focus is within this node, we can assume that we have
    // already set the appropriate start range on the selection, and
    // can simply extend the selection.
    if (hasFocus) {
      addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }
  } else {
    // If this node has the focus, set the selection range to be a
    // collapsed range beginning here. Later, when we encounter the anchor,
    // we'll use this information to extend the selection.
    if (hasFocus) {
      selection.removeAllRanges();
      addPointToSelection(selection, node, focusOffset - nodeStart, selectionState);
    }

    // If this node has the anchor, we may assume that the correct
    // focus information is already stored on the selection object.
    // We keep track of it, reset the selection range, and extend it
    // back to the focus point.
    if (hasAnchor) {
      var storedFocusNode = selection.focusNode;
      var storedFocusOffset = selection.focusOffset;

      selection.removeAllRanges();
      addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
      addFocusToSelection(selection, storedFocusNode, storedFocusOffset, selectionState);
    }
  }
}

/**
 * Extend selection towards focus point.
 */
function addFocusToSelection(selection, node, offset, selectionState) {
  var activeElement = getActiveElement();
  if (selection.extend && containsNode(activeElement, node)) {
    // If `extend` is called while another element has focus, an error is
    // thrown. We therefore disable `extend` if the active element is somewhere
    // other than the node we are selecting. This should only occur in Firefox,
    // since it is the only browser to support multiple selections.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444.

    // logging to catch bug that is being reported in t16250795
    if (offset > getNodeLength(node)) {
      // the call to 'selection.extend' is about to throw
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node),
        extraParams: JSON.stringify({ offset: offset }),
        selectionState: JSON.stringify(selectionState.toJS())
      });
    }

    // logging to catch bug that is being reported in t18110632
    var nodeWasFocus = node === selection.focusNode;
    try {
      selection.extend(node, offset);
    } catch (e) {
      DraftJsDebugLogging.logSelectionStateFailure({
        anonymizedDom: getAnonymizedEditorDOM(node, function (n) {
          var labels = [];
          if (n === activeElement) {
            labels.push('active element');
          }
          if (n === selection.anchorNode) {
            labels.push('selection anchor node');
          }
          if (n === selection.focusNode) {
            labels.push('selection focus node');
          }
          return labels;
        }),
        extraParams: JSON.stringify({
          activeElementName: activeElement ? activeElement.nodeName : null,
          nodeIsFocus: node === selection.focusNode,
          nodeWasFocus: nodeWasFocus,
          selectionRangeCount: selection.rangeCount,
          selectionAnchorNodeName: selection.anchorNode ? selection.anchorNode.nodeName : null,
          selectionAnchorOffset: selection.anchorOffset,
          selectionFocusNodeName: selection.focusNode ? selection.focusNode.nodeName : null,
          selectionFocusOffset: selection.focusOffset,
          message: e ? '' + e : null,
          offset: offset
        }, null, 2),
        selectionState: JSON.stringify(selectionState.toJS(), null, 2)
      });
      // allow the error to be thrown -
      // better than continuing in a broken state
      throw e;
    }
  } else {
    // IE doesn't support extend. This will mean no backward selection.
    // Extract the existing selection range and add focus to it.
    // Additionally, clone the selection range. IE11 throws an
    // InvalidStateError when attempting to access selection properties
    // after the range is detached.
    var range = selection.getRangeAt(0);
    range.setEnd(node, offset);
    selection.addRange(range.cloneRange());
  }
}

function addPointToSelection(selection, node, offset, selectionState) {
  var range = document.createRange();
  // logging to catch bug that is being reported in t16250795
  if (offset > getNodeLength(node)) {
    // in this case we know that the call to 'range.setStart' is about to throw
    DraftJsDebugLogging.logSelectionStateFailure({
      anonymizedDom: getAnonymizedEditorDOM(node),
      extraParams: JSON.stringify({ offset: offset }),
      selectionState: JSON.stringify(selectionState.toJS())
    });
  }
  range.setStart(node, offset);
  selection.addRange(range);
}

module.exports = setDraftEditorSelection;
},{"./DraftJsDebugLogging":194,"fbjs/lib/containsNode":86,"fbjs/lib/getActiveElement":84,"fbjs/lib/invariant":79}],106:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorLeaf.react
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DraftEditorTextNode = require('./DraftEditorTextNode.react');
var React = require('react');
var ReactDOM = require('react-dom');

var invariant = require('fbjs/lib/invariant');
var setDraftEditorSelection = require('./setDraftEditorSelection');

/**
 * All leaf nodes in the editor are spans with single text nodes. Leaf
 * elements are styled based on the merging of an optional custom style map
 * and a default style map.
 *
 * `DraftEditorLeaf` also provides a wrapper for calling into the imperative
 * DOM Selection API. In this way, top-level components can declaratively
 * maintain the selection state.
 */
var DraftEditorLeaf = function (_React$Component) {
  _inherits(DraftEditorLeaf, _React$Component);

  function DraftEditorLeaf() {
    _classCallCheck(this, DraftEditorLeaf);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorLeaf.prototype._setSelection = function _setSelection() {
    var selection = this.props.selection;

    // If selection state is irrelevant to the parent block, no-op.

    if (selection == null || !selection.getHasFocus()) {
      return;
    }

    var _props = this.props,
        block = _props.block,
        start = _props.start,
        text = _props.text;

    var blockKey = block.getKey();
    var end = start + text.length;
    if (!selection.hasEdgeWithin(blockKey, start, end)) {
      return;
    }

    // Determine the appropriate target node for selection. If the child
    // is not a text node, it is a <br /> spacer. In this case, use the
    // <span> itself as the selection target.
    var node = ReactDOM.findDOMNode(this);
    !node ? 'production' !== 'production' ? invariant(false, 'Missing node') : invariant(false) : void 0;
    var child = node.firstChild;
    !child ? 'production' !== 'production' ? invariant(false, 'Missing child') : invariant(false) : void 0;
    var targetNode = void 0;

    if (child.nodeType === Node.TEXT_NODE) {
      targetNode = child;
    } else if (child.tagName === 'BR') {
      targetNode = node;
    } else {
      targetNode = child.firstChild;
      !targetNode ? 'production' !== 'production' ? invariant(false, 'Missing targetNode') : invariant(false) : void 0;
    }

    setDraftEditorSelection(selection, targetNode, blockKey, start, end);
  };
  /**
   * By making individual leaf instances aware of their context within
   * the text of the editor, we can set our selection range more
   * easily than we could in the non-React world.
   *
   * Note that this depends on our maintaining tight control over the
   * DOM structure of the DraftEditor component. If leaves had multiple
   * text nodes, this would be harder.
   */

  DraftEditorLeaf.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var leafNode = ReactDOM.findDOMNode(this.leaf);
    !leafNode ? 'production' !== 'production' ? invariant(false, 'Missing leafNode') : invariant(false) : void 0;
    return leafNode.textContent !== nextProps.text || nextProps.styleSet !== this.props.styleSet || nextProps.forceSelection;
  };

  DraftEditorLeaf.prototype.componentDidUpdate = function componentDidUpdate() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.componentDidMount = function componentDidMount() {
    this._setSelection();
  };

  DraftEditorLeaf.prototype.render = function render() {
    var _this2 = this;

    var block = this.props.block;
    var text = this.props.text;

    // If the leaf is at the end of its block and ends in a soft newline, append
    // an extra line feed character. Browsers collapse trailing newline
    // characters, which leaves the cursor in the wrong place after a
    // shift+enter. The extra character repairs this.

    if (text.endsWith('\n') && this.props.isLast) {
      text += '\n';
    }

    var _props2 = this.props,
        customStyleMap = _props2.customStyleMap,
        customStyleFn = _props2.customStyleFn,
        offsetKey = _props2.offsetKey,
        styleSet = _props2.styleSet;

    var styleObj = styleSet.reduce(function (map, styleName) {
      var mergedStyles = {};
      var style = customStyleMap[styleName];

      if (style !== undefined && map.textDecoration !== style.textDecoration) {
        // .trim() is necessary for IE9/10/11 and Edge
        mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ').trim();
      }

      return _assign(map, style, mergedStyles);
    }, {});

    if (customStyleFn) {
      var newStyles = customStyleFn(styleSet, block);
      styleObj = _assign(styleObj, newStyles);
    }

    return React.createElement('span', {
      'data-offset-key': offsetKey,
      ref: function ref(_ref) {
        return _this2.leaf = _ref;
      },
      style: styleObj }, React.createElement(DraftEditorTextNode, null, text));
  };

  return DraftEditorLeaf;
}(React.Component);

module.exports = DraftEditorLeaf;
},{"object-assign":82,"./DraftEditorTextNode.react":164,"react":8,"react-dom":7,"fbjs/lib/invariant":79,"./setDraftEditorSelection":165}],107:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftOffsetKey
 * @format
 * 
 */

'use strict';

var KEY_DELIMITER = '-';

var DraftOffsetKey = {
  encode: function encode(blockKey, decoratorKey, leafKey) {
    return blockKey + KEY_DELIMITER + decoratorKey + KEY_DELIMITER + leafKey;
  },

  decode: function decode(offsetKey) {
    var _offsetKey$split = offsetKey.split(KEY_DELIMITER),
        blockKey = _offsetKey$split[0],
        decoratorKey = _offsetKey$split[1],
        leafKey = _offsetKey$split[2];

    return {
      blockKey: blockKey,
      decoratorKey: parseInt(decoratorKey, 10),
      leafKey: parseInt(leafKey, 10)
    };
  }
};

module.exports = DraftOffsetKey;
},{}],124:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @param {DOMElement} element
 * @param {DOMDocument} doc
 * @return {boolean}
 */
function _isViewportScrollElement(element, doc) {
  return !!doc && (element === doc.documentElement || element === doc.body);
}

/**
 * Scroll Module. This class contains 4 simple static functions
 * to be used to access Element.scrollTop/scrollLeft properties.
 * To solve the inconsistencies between browsers when either
 * document.body or document.documentElement is supplied,
 * below logic will be used to alleviate the issue:
 *
 * 1. If 'element' is either 'document.body' or 'document.documentElement,
 *    get whichever element's 'scroll{Top,Left}' is larger.
 * 2. If 'element' is either 'document.body' or 'document.documentElement',
 *    set the 'scroll{Top,Left}' on both elements.
 */

var Scroll = {
  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getTop: function getTop(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ?
    // In practice, they will either both have the same value,
    // or one will be zero and the other will be the scroll position
    // of the viewport. So we can use `X || Y` instead of `Math.max(X, Y)`
    doc.body.scrollTop || doc.documentElement.scrollTop : element.scrollTop;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newTop
   */
  setTop: function setTop(element, newTop) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollTop = doc.documentElement.scrollTop = newTop;
    } else {
      element.scrollTop = newTop;
    }
  },

  /**
   * @param {DOMElement} element
   * @return {number}
   */
  getLeft: function getLeft(element) {
    var doc = element.ownerDocument;
    return _isViewportScrollElement(element, doc) ? doc.body.scrollLeft || doc.documentElement.scrollLeft : element.scrollLeft;
  },

  /**
   * @param {DOMElement} element
   * @param {number} newLeft
   */
  setLeft: function setLeft(element, newLeft) {
    var doc = element.ownerDocument;
    if (_isViewportScrollElement(element, doc)) {
      doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;
    } else {
      element.scrollLeft = newLeft;
    }
  }
};

module.exports = Scroll;
},{}],196:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;
},{}],197:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;
},{}],172:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var camelize = require('./camelize');
var hyphenate = require('./hyphenate');

function asString(value) /*?string*/{
  return value == null ? value : String(value);
}

function getStyleProperty( /*DOMNode*/node, /*string*/name) /*?string*/{
  var computedStyle = void 0;

  // W3C Standard
  if (window.getComputedStyle) {
    // In certain cases such as within an iframe in FF3, this returns null.
    computedStyle = window.getComputedStyle(node, null);
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate(name)));
    }
  }
  // Safari
  if (document.defaultView && document.defaultView.getComputedStyle) {
    computedStyle = document.defaultView.getComputedStyle(node, null);
    // A Safari bug causes this to return null for `display: none` elements.
    if (computedStyle) {
      return asString(computedStyle.getPropertyValue(hyphenate(name)));
    }
    if (name === 'display') {
      return 'none';
    }
  }
  // Internet Explorer
  if (node.currentStyle) {
    if (name === 'float') {
      return asString(node.currentStyle.cssFloat || node.currentStyle.styleFloat);
    }
    return asString(node.currentStyle[camelize(name)]);
  }
  return asString(node.style && node.style[camelize(name)]);
}

module.exports = getStyleProperty;
},{"./camelize":196,"./hyphenate":197}],125:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var getStyleProperty = require('./getStyleProperty');

/**
 * @param {DOMNode} element [description]
 * @param {string} name Overflow style property name.
 * @return {boolean} True if the supplied ndoe is scrollable.
 */
function _isNodeScrollable(element, name) {
  var overflow = Style.get(element, name);
  return overflow === 'auto' || overflow === 'scroll';
}

/**
 * Utilities for querying and mutating style properties.
 */
var Style = {
  /**
   * Gets the style property for the supplied node. This will return either the
   * computed style, if available, or the declared style.
   *
   * @param {DOMNode} node
   * @param {string} name Style property name.
   * @return {?string} Style property value.
   */
  get: getStyleProperty,

  /**
   * Determines the nearest ancestor of a node that is scrollable.
   *
   * NOTE: This can be expensive if used repeatedly or on a node nested deeply.
   *
   * @param {?DOMNode} node Node from which to start searching.
   * @return {?DOMWindow|DOMElement} Scroll parent of the supplied node.
   */
  getScrollParent: function getScrollParent(node) {
    if (!node) {
      return null;
    }
    var ownerDocument = node.ownerDocument;
    while (node && node !== ownerDocument.body) {
      if (_isNodeScrollable(node, 'overflow') || _isNodeScrollable(node, 'overflowY') || _isNodeScrollable(node, 'overflowX')) {
        return node;
      }
      node = node.parentNode;
    }
    return ownerDocument.defaultView || ownerDocument.parentWindow;
  }

};

module.exports = Style;
},{"./getStyleProperty":172}],174:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var containsNode = require('./containsNode');

/**
 * Gets an element's bounding rect in pixels relative to the viewport.
 *
 * @param {DOMElement} elem
 * @return {object}
 */
function getElementRect(elem) {
  var docElem = elem.ownerDocument.documentElement;

  // FF 2, Safari 3 and Opera 9.5- do not support getBoundingClientRect().
  // IE9- will throw if the element is not in the document.
  if (!('getBoundingClientRect' in elem) || !containsNode(docElem, elem)) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  }

  // Subtracts clientTop/Left because IE8- added a 2px border to the
  // <html> element (see http://fburl.com/1493213). IE 7 in
  // Quicksmode does not report clientLeft/clientTop so there
  // will be an unaccounted offset of 2px when in quirksmode
  var rect = elem.getBoundingClientRect();

  return {
    left: Math.round(rect.left) - docElem.clientLeft,
    right: Math.round(rect.right) - docElem.clientLeft,
    top: Math.round(rect.top) - docElem.clientTop,
    bottom: Math.round(rect.bottom) - docElem.clientTop
  };
}

module.exports = getElementRect;
},{"./containsNode":86}],128:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var getElementRect = require('./getElementRect');

/**
 * Gets an element's position in pixels relative to the viewport. The returned
 * object represents the position of the element's top left corner.
 *
 * @param {DOMElement} element
 * @return {object}
 */
function getElementPosition(element) {
  var rect = getElementRect(element);
  return {
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}

module.exports = getElementPosition;
},{"./getElementRect":174}],207:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var isWebkit = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;

/**
 * Gets the element with the document scroll properties such as `scrollLeft` and
 * `scrollHeight`. This may differ across different browsers.
 *
 * NOTE: The return value can be null if the DOM is not yet ready.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getDocumentScrollElement(doc) {
  doc = doc || document;
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }
  return !isWebkit && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
}

module.exports = getDocumentScrollElement;
},{}],208:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;
},{}],129:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var getDocumentScrollElement = require('./getDocumentScrollElement');
var getUnboundedScrollPosition = require('./getUnboundedScrollPosition');

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are bounded. This means that if the scroll position is
 * negative or exceeds the element boundaries (which is possible using inertial
 * scrolling), you will get zero or the maximum scroll position, respectively.
 *
 * If you need the unbound scroll position, use `getUnboundedScrollPosition`.
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getScrollPosition(scrollable) {
  var documentScrollElement = getDocumentScrollElement(scrollable.ownerDocument || scrollable.document);
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    scrollable = documentScrollElement;
  }
  var scrollPosition = getUnboundedScrollPosition(scrollable);

  var viewport = scrollable === documentScrollElement ? scrollable.ownerDocument.documentElement : scrollable;

  var xMax = scrollable.scrollWidth - viewport.clientWidth;
  var yMax = scrollable.scrollHeight - viewport.clientHeight;

  scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
  scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));

  return scrollPosition;
}

module.exports = getScrollPosition;
},{"./getDocumentScrollElement":207,"./getUnboundedScrollPosition":208}],130:[function(require,module,exports) {
"use strict";

function getViewportWidth() {
  var width = void 0;
  if (document.documentElement) {
    width = document.documentElement.clientWidth;
  }

  if (!width && document.body) {
    width = document.body.clientWidth;
  }

  return width || 0;
} /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   * @typechecks
   */

function getViewportHeight() {
  var height = void 0;
  if (document.documentElement) {
    height = document.documentElement.clientHeight;
  }

  if (!height && document.body) {
    height = document.body.clientHeight;
  }

  return height || 0;
}

/**
 * Gets the viewport dimensions including any scrollbars.
 */
function getViewportDimensions() {
  return {
    width: window.innerWidth || getViewportWidth(),
    height: window.innerHeight || getViewportHeight()
  };
}

/**
 * Gets the viewport dimensions excluding any scrollbars.
 */
getViewportDimensions.withoutScrollbars = function () {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  };
};

module.exports = getViewportDimensions;
},{}],33:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorBlock.react
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DraftEditorLeaf = require('./DraftEditorLeaf.react');
var DraftOffsetKey = require('./DraftOffsetKey');
var React = require('react');
var ReactDOM = require('react-dom');
var Scroll = require('fbjs/lib/Scroll');
var Style = require('fbjs/lib/Style');
var UnicodeBidi = require('fbjs/lib/UnicodeBidi');
var UnicodeBidiDirection = require('fbjs/lib/UnicodeBidiDirection');

var cx = require('fbjs/lib/cx');
var getElementPosition = require('fbjs/lib/getElementPosition');
var getScrollPosition = require('fbjs/lib/getScrollPosition');
var getViewportDimensions = require('fbjs/lib/getViewportDimensions');
var invariant = require('fbjs/lib/invariant');
var nullthrows = require('fbjs/lib/nullthrows');

var SCROLL_BUFFER = 10;

/**
 * Return whether a block overlaps with either edge of the `SelectionState`.
 */
var isBlockOnSelectionEdge = function isBlockOnSelectionEdge(selection, key) {
  return selection.getAnchorKey() === key || selection.getFocusKey() === key;
};

/**
 * The default block renderer for a `DraftEditor` component.
 *
 * A `DraftEditorBlock` is able to render a given `ContentBlock` to its
 * appropriate decorator and inline style components.
 */

var DraftEditorBlock = function (_React$Component) {
  _inherits(DraftEditorBlock, _React$Component);

  function DraftEditorBlock() {
    _classCallCheck(this, DraftEditorBlock);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorBlock.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.block !== nextProps.block || this.props.tree !== nextProps.tree || this.props.direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
  };

  /**
   * When a block is mounted and overlaps the selection state, we need to make
   * sure that the cursor is visible to match native behavior. This may not
   * be the case if the user has pressed `RETURN` or pasted some content, since
   * programatically creating these new blocks and setting the DOM selection
   * will miss out on the browser natively scrolling to that position.
   *
   * To replicate native behavior, if the block overlaps the selection state
   * on mount, force the scroll position. Check the scroll state of the scroll
   * parent, and adjust it to align the entire block to the bottom of the
   * scroll parent.
   */

  DraftEditorBlock.prototype.componentDidMount = function componentDidMount() {
    var selection = this.props.selection;
    var endKey = selection.getEndKey();
    if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
      return;
    }

    var blockNode = ReactDOM.findDOMNode(this);
    var scrollParent = Style.getScrollParent(blockNode);
    var scrollPosition = getScrollPosition(scrollParent);
    var scrollDelta = void 0;

    if (scrollParent === window) {
      var nodePosition = getElementPosition(blockNode);
      var nodeBottom = nodePosition.y + nodePosition.height;
      var viewportHeight = getViewportDimensions().height;
      scrollDelta = nodeBottom - viewportHeight;
      if (scrollDelta > 0) {
        window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
      }
    } else {
      !(blockNode instanceof HTMLElement) ? 'production' !== 'production' ? invariant(false, 'blockNode is not an HTMLElement') : invariant(false) : void 0;
      var blockBottom = blockNode.offsetHeight + blockNode.offsetTop;
      var scrollBottom = scrollParent.offsetHeight + scrollPosition.y;
      scrollDelta = blockBottom - scrollBottom;
      if (scrollDelta > 0) {
        Scroll.setTop(scrollParent, Scroll.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
      }
    }
  };

  DraftEditorBlock.prototype._renderChildren = function _renderChildren() {
    var _this2 = this;

    var block = this.props.block;
    var blockKey = block.getKey();
    var text = block.getText();
    var lastLeafSet = this.props.tree.size - 1;
    var hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey);

    return this.props.tree.map(function (leafSet, ii) {
      var leavesForLeafSet = leafSet.get('leaves');
      var lastLeaf = leavesForLeafSet.size - 1;
      var leaves = leavesForLeafSet.map(function (leaf, jj) {
        var offsetKey = DraftOffsetKey.encode(blockKey, ii, jj);
        var start = leaf.get('start');
        var end = leaf.get('end');
        return React.createElement(DraftEditorLeaf, {
          key: offsetKey,
          offsetKey: offsetKey,
          block: block,
          start: start,
          selection: hasSelection ? _this2.props.selection : null,
          forceSelection: _this2.props.forceSelection,
          text: text.slice(start, end),
          styleSet: block.getInlineStyleAt(start),
          customStyleMap: _this2.props.customStyleMap,
          customStyleFn: _this2.props.customStyleFn,
          isLast: ii === lastLeafSet && jj === lastLeaf
        });
      }).toArray();

      var decoratorKey = leafSet.get('decoratorKey');
      if (decoratorKey == null) {
        return leaves;
      }

      if (!_this2.props.decorator) {
        return leaves;
      }

      var decorator = nullthrows(_this2.props.decorator);

      var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
      if (!DecoratorComponent) {
        return leaves;
      }

      var decoratorProps = decorator.getPropsForKey(decoratorKey);
      var decoratorOffsetKey = DraftOffsetKey.encode(blockKey, ii, 0);
      var decoratedText = text.slice(leavesForLeafSet.first().get('start'), leavesForLeafSet.last().get('end'));

      // Resetting dir to the same value on a child node makes Chrome/Firefox
      // confused on cursor movement. See http://jsfiddle.net/d157kLck/3/
      var dir = UnicodeBidiDirection.getHTMLDirIfDifferent(UnicodeBidi.getDirection(decoratedText), _this2.props.direction);

      return React.createElement(DecoratorComponent, _extends({}, decoratorProps, {
        contentState: _this2.props.contentState,
        decoratedText: decoratedText,
        dir: dir,
        key: decoratorOffsetKey,
        entityKey: block.getEntityAt(leafSet.get('start')),
        offsetKey: decoratorOffsetKey }), leaves);
    }).toArray();
  };

  DraftEditorBlock.prototype.render = function render() {
    var _props = this.props,
        direction = _props.direction,
        offsetKey = _props.offsetKey;

    var className = cx({
      'public/DraftStyleDefault/block': true,
      'public/DraftStyleDefault/ltr': direction === 'LTR',
      'public/DraftStyleDefault/rtl': direction === 'RTL'
    });

    return React.createElement('div', { 'data-offset-key': offsetKey, className: className }, this._renderChildren());
  };

  return DraftEditorBlock;
}(React.Component);

module.exports = DraftEditorBlock;
},{"object-assign":82,"./DraftEditorLeaf.react":106,"./DraftOffsetKey":107,"react":8,"react-dom":7,"fbjs/lib/Scroll":124,"fbjs/lib/Style":125,"fbjs/lib/UnicodeBidi":126,"fbjs/lib/UnicodeBidiDirection":127,"fbjs/lib/cx":113,"fbjs/lib/getElementPosition":128,"fbjs/lib/getScrollPosition":129,"fbjs/lib/getViewportDimensions":130,"fbjs/lib/invariant":79,"fbjs/lib/nullthrows":131}],211:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks static-only
 */

'use strict';

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} className
 * @return {string}
 */

function joinClasses(className /*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass = void 0;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;
},{}],146:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorContents-core.react
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftEditorBlock = require('./DraftEditorBlock.react');
var DraftOffsetKey = require('./DraftOffsetKey');
var EditorState = require('./EditorState');
var React = require('react');

var cx = require('fbjs/lib/cx');
var joinClasses = require('fbjs/lib/joinClasses');
var nullthrows = require('fbjs/lib/nullthrows');

/**
 * Provide default styling for list items. This way, lists will be styled with
 * proper counters and indentation even if the caller does not specify
 * their own styling at all. If more than five levels of nesting are needed,
 * the necessary CSS classes can be provided via `blockStyleFn` configuration.
 */
var getListItemClasses = function getListItemClasses(type, depth, shouldResetCount, direction) {
  return cx({
    'public/DraftStyleDefault/unorderedListItem': type === 'unordered-list-item',
    'public/DraftStyleDefault/orderedListItem': type === 'ordered-list-item',
    'public/DraftStyleDefault/reset': shouldResetCount,
    'public/DraftStyleDefault/depth0': depth === 0,
    'public/DraftStyleDefault/depth1': depth === 1,
    'public/DraftStyleDefault/depth2': depth === 2,
    'public/DraftStyleDefault/depth3': depth === 3,
    'public/DraftStyleDefault/depth4': depth === 4,
    'public/DraftStyleDefault/listLTR': direction === 'LTR',
    'public/DraftStyleDefault/listRTL': direction === 'RTL'
  });
};

/**
 * `DraftEditorContents` is the container component for all block components
 * rendered for a `DraftEditor`. It is optimized to aggressively avoid
 * re-rendering blocks whenever possible.
 *
 * This component is separate from `DraftEditor` because certain props
 * (for instance, ARIA props) must be allowed to update without affecting
 * the contents of the editor.
 */

var DraftEditorContents = function (_React$Component) {
  _inherits(DraftEditorContents, _React$Component);

  function DraftEditorContents() {
    _classCallCheck(this, DraftEditorContents);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var prevEditorState = this.props.editorState;
    var nextEditorState = nextProps.editorState;

    var prevDirectionMap = prevEditorState.getDirectionMap();
    var nextDirectionMap = nextEditorState.getDirectionMap();

    // Text direction has changed for one or more blocks. We must re-render.
    if (prevDirectionMap !== nextDirectionMap) {
      return true;
    }

    var didHaveFocus = prevEditorState.getSelection().getHasFocus();
    var nowHasFocus = nextEditorState.getSelection().getHasFocus();

    if (didHaveFocus !== nowHasFocus) {
      return true;
    }

    var nextNativeContent = nextEditorState.getNativelyRenderedContent();

    var wasComposing = prevEditorState.isInCompositionMode();
    var nowComposing = nextEditorState.isInCompositionMode();

    // If the state is unchanged or we're currently rendering a natively
    // rendered state, there's nothing new to be done.
    if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
      return false;
    }

    var prevContent = prevEditorState.getCurrentContent();
    var nextContent = nextEditorState.getCurrentContent();
    var prevDecorator = prevEditorState.getDecorator();
    var nextDecorator = nextEditorState.getDecorator();
    return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
  };

  DraftEditorContents.prototype.render = function render() {
    var _props = this.props,
        blockRenderMap = _props.blockRenderMap,
        blockRendererFn = _props.blockRendererFn,
        blockStyleFn = _props.blockStyleFn,
        customStyleMap = _props.customStyleMap,
        customStyleFn = _props.customStyleFn,
        editorState = _props.editorState,
        editorKey = _props.editorKey,
        textDirectionality = _props.textDirectionality;


    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var forceSelection = editorState.mustForceSelection();
    var decorator = editorState.getDecorator();
    var directionMap = nullthrows(editorState.getDirectionMap());

    var blocksAsArray = content.getBlocksAsArray();
    var processedBlocks = [];

    var currentDepth = null;
    var lastWrapperTemplate = null;

    for (var ii = 0; ii < blocksAsArray.length; ii++) {
      var _block = blocksAsArray[ii];
      var key = _block.getKey();
      var blockType = _block.getType();

      var customRenderer = blockRendererFn(_block);
      var CustomComponent = void 0,
          customProps = void 0,
          customEditable = void 0;
      if (customRenderer) {
        CustomComponent = customRenderer.component;
        customProps = customRenderer.props;
        customEditable = customRenderer.editable;
      }

      var direction = textDirectionality ? textDirectionality : directionMap.get(key);
      var offsetKey = DraftOffsetKey.encode(key, 0, 0);
      var componentProps = {
        contentState: content,
        block: _block,
        blockProps: customProps,
        blockStyleFn: blockStyleFn,
        customStyleMap: customStyleMap,
        customStyleFn: customStyleFn,
        decorator: decorator,
        direction: direction,
        forceSelection: forceSelection,
        key: key,
        offsetKey: offsetKey,
        selection: selection,
        tree: editorState.getBlockTree(key)
      };

      var configForType = blockRenderMap.get(blockType) || blockRenderMap.get('unstyled');
      var wrapperTemplate = configForType.wrapper;

      var Element = configForType.element || blockRenderMap.get('unstyled').element;

      var depth = _block.getDepth();
      var className = '';
      if (blockStyleFn) {
        className = blockStyleFn(_block);
      }

      // List items are special snowflakes, since we handle nesting and
      // counters manually.
      if (Element === 'li') {
        var shouldResetCount = lastWrapperTemplate !== wrapperTemplate || currentDepth === null || depth > currentDepth;
        className = joinClasses(className, getListItemClasses(blockType, depth, shouldResetCount, direction));
      }

      var Component = CustomComponent || DraftEditorBlock;
      var childProps = {
        className: className,
        'data-block': true,
        'data-editor': editorKey,
        'data-offset-key': offsetKey,
        key: key
      };
      if (customEditable !== undefined) {
        childProps = _extends({}, childProps, {
          contentEditable: customEditable,
          suppressContentEditableWarning: true
        });
      }

      var child = React.createElement(Element, childProps, React.createElement(Component, componentProps));

      processedBlocks.push({
        block: child,
        wrapperTemplate: wrapperTemplate,
        key: key,
        offsetKey: offsetKey
      });

      if (wrapperTemplate) {
        currentDepth = _block.getDepth();
      } else {
        currentDepth = null;
      }
      lastWrapperTemplate = wrapperTemplate;
    }

    // Group contiguous runs of blocks that have the same wrapperTemplate
    var outputBlocks = [];
    for (var _ii = 0; _ii < processedBlocks.length;) {
      var info = processedBlocks[_ii];
      if (info.wrapperTemplate) {
        var blocks = [];
        do {
          blocks.push(processedBlocks[_ii].block);
          _ii++;
        } while (_ii < processedBlocks.length && processedBlocks[_ii].wrapperTemplate === info.wrapperTemplate);
        var wrapperElement = React.cloneElement(info.wrapperTemplate, {
          key: info.key + '-wrap',
          'data-offset-key': info.offsetKey
        }, blocks);
        outputBlocks.push(wrapperElement);
      } else {
        outputBlocks.push(info.block);
        _ii++;
      }
    }

    return React.createElement(
      'div',
      { 'data-contents': 'true' },
      outputBlocks
    );
  };

  return DraftEditorContents;
}(React.Component);

module.exports = DraftEditorContents;
},{"object-assign":82,"./DraftEditorBlock.react":33,"./DraftOffsetKey":107,"./EditorState":37,"react":8,"fbjs/lib/cx":113,"fbjs/lib/joinClasses":211,"fbjs/lib/nullthrows":131}],115:[function(require,module,exports) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorContents.react
 * @format
 * 
 */

'use strict';

var DraftEditorContents = require('./DraftEditorContents-core.react');

module.exports = DraftEditorContents;
},{"./DraftEditorContents-core.react":146}],176:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var PhotosMimeType = {
  isImage: function isImage(mimeString) {
    return getParts(mimeString)[0] === 'image';
  },
  isJpeg: function isJpeg(mimeString) {
    var parts = getParts(mimeString);
    return PhotosMimeType.isImage(mimeString) && (
    // see http://fburl.com/10972194
    parts[1] === 'jpeg' || parts[1] === 'pjpeg');
  }
};

function getParts(mimeString) {
  return mimeString.split('/');
}

module.exports = PhotosMimeType;
},{}],177:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var invariant = require('./invariant');

/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray(obj) {
  var length = obj.length;

  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
  // in old versions of Safari).
  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? 'production' !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : void 0;

  !(typeof length === 'number') ? 'production' !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : void 0;

  !(length === 0 || length - 1 in obj) ? 'production' !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : void 0;

  !(typeof obj.callee !== 'function') ? 'production' !== 'production' ? invariant(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant(false) : void 0;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}

module.exports = createArrayFromMixed;
},{"./invariant":79}],151:[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var PhotosMimeType = require('./PhotosMimeType');

var createArrayFromMixed = require('./createArrayFromMixed');
var emptyFunction = require('./emptyFunction');

var CR_LF_REGEX = new RegExp('\r\n', 'g');
var LF_ONLY = '\n';

var RICH_TEXT_TYPES = {
  'text/rtf': 1,
  'text/html': 1
};

/**
 * If DataTransferItem is a file then return the Blob of data.
 *
 * @param {object} item
 * @return {?blob}
 */
function getFileFromDataTransfer(item) {
  if (item.kind == 'file') {
    return item.getAsFile();
  }
}

var DataTransfer = function () {
  /**
   * @param {object} data
   */
  function DataTransfer(data) {
    _classCallCheck(this, DataTransfer);

    this.data = data;

    // Types could be DOMStringList or array
    this.types = data.types ? createArrayFromMixed(data.types) : [];
  }

  /**
   * Is this likely to be a rich text data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isRichText = function isRichText() {
    // If HTML is available, treat this data as rich text. This way, we avoid
    // using a pasted image if it is packaged with HTML -- this may occur with
    // pastes from MS Word, for example.  However this is only rich text if
    // there's accompanying text.
    if (this.getHTML() && this.getText()) {
      return true;
    }

    // When an image is copied from a preview window, you end up with two
    // DataTransferItems one of which is a file's metadata as text.  Skip those.
    if (this.isImage()) {
      return false;
    }

    return this.types.some(function (type) {
      return RICH_TEXT_TYPES[type];
    });
  };

  /**
   * Get raw text.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getText = function getText() {
    var text;
    if (this.data.getData) {
      if (!this.types.length) {
        text = this.data.getData('Text');
      } else if (this.types.indexOf('text/plain') != -1) {
        text = this.data.getData('text/plain');
      }
    }
    return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
  };

  /**
   * Get HTML paste data
   *
   * @return {?string}
   */


  DataTransfer.prototype.getHTML = function getHTML() {
    if (this.data.getData) {
      if (!this.types.length) {
        return this.data.getData('Text');
      } else if (this.types.indexOf('text/html') != -1) {
        return this.data.getData('text/html');
      }
    }
  };

  /**
   * Is this a link data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isLink = function isLink() {
    return this.types.some(function (type) {
      return type.indexOf('Url') != -1 || type.indexOf('text/uri-list') != -1 || type.indexOf('text/x-moz-url');
    });
  };

  /**
   * Get a link url.
   *
   * @return {?string}
   */


  DataTransfer.prototype.getLink = function getLink() {
    if (this.data.getData) {
      if (this.types.indexOf('text/x-moz-url') != -1) {
        var url = this.data.getData('text/x-moz-url').split('\n');
        return url[0];
      }
      return this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url');
    }

    return null;
  };

  /**
   * Is this an image data transfer?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.isImage = function isImage() {
    var isImage = this.types.some(function (type) {
      // Firefox will have a type of application/x-moz-file for images during
      // dragging
      return type.indexOf('application/x-moz-file') != -1;
    });

    if (isImage) {
      return true;
    }

    var items = this.getFiles();
    for (var i = 0; i < items.length; i++) {
      var type = items[i].type;
      if (!PhotosMimeType.isImage(type)) {
        return false;
      }
    }

    return true;
  };

  DataTransfer.prototype.getCount = function getCount() {
    if (this.data.hasOwnProperty('items')) {
      return this.data.items.length;
    } else if (this.data.hasOwnProperty('mozItemCount')) {
      return this.data.mozItemCount;
    } else if (this.data.files) {
      return this.data.files.length;
    }
    return null;
  };

  /**
   * Get files.
   *
   * @return {array}
   */


  DataTransfer.prototype.getFiles = function getFiles() {
    if (this.data.items) {
      // createArrayFromMixed doesn't properly handle DataTransferItemLists.
      return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction.thatReturnsArgument);
    } else if (this.data.files) {
      return Array.prototype.slice.call(this.data.files);
    } else {
      return [];
    }
  };

  /**
   * Are there any files to fetch?
   *
   * @return {boolean}
   */


  DataTransfer.prototype.hasFiles = function hasFiles() {
    return this.getFiles().length > 0;
  };

  return DataTransfer;
}();

module.exports = DataTransfer;
},{"./PhotosMimeType":176,"./createArrayFromMixed":177,"./emptyFunction":80}],175:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getSelectionOffsetKeyForNode
 * @format
 * 
 */

'use strict';

/**
 * Get offset key from a node or it's child nodes. Return the first offset key
 * found on the DOM tree of given node.
 */

function getSelectionOffsetKeyForNode(node) {
  if (node instanceof Element) {
    var offsetKey = node.getAttribute('data-offset-key');
    if (offsetKey) {
      return offsetKey;
    }
    for (var ii = 0; ii < node.childNodes.length; ii++) {
      var childOffsetKey = getSelectionOffsetKeyForNode(node.childNodes[ii]);
      if (childOffsetKey) {
        return childOffsetKey;
      }
    }
  }
  return null;
}

module.exports = getSelectionOffsetKeyForNode;
},{}],147:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findAncestorOffsetKey
 * @format
 * 
 */

'use strict';

var getSelectionOffsetKeyForNode = require('./getSelectionOffsetKeyForNode');

/**
 * Get the key from the node's nearest offset-aware ancestor.
 */
function findAncestorOffsetKey(node) {
  var searchNode = node;
  while (searchNode && searchNode !== document.documentElement) {
    var key = getSelectionOffsetKeyForNode(searchNode);
    if (key != null) {
      return key;
    }
    searchNode = searchNode.parentNode;
  }
  return null;
}

module.exports = findAncestorOffsetKey;
},{"./getSelectionOffsetKeyForNode":175}],148:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getTextContentFromFiles
 * @format
 * 
 */

'use strict';

var invariant = require('fbjs/lib/invariant');

var TEXT_CLIPPING_REGEX = /\.textClipping$/;

var TEXT_TYPES = {
  'text/plain': true,
  'text/html': true,
  'text/rtf': true
};

// Somewhat arbitrary upper bound on text size. Let's not lock up the browser.
var TEXT_SIZE_UPPER_BOUND = 5000;

/**
 * Extract the text content from a file list.
 */
function getTextContentFromFiles(files, callback) {
  var readCount = 0;
  var results = [];
  files.forEach(function ( /*blob*/file) {
    readFile(file, function ( /*string*/text) {
      readCount++;
      text && results.push(text.slice(0, TEXT_SIZE_UPPER_BOUND));
      if (readCount == files.length) {
        callback(results.join('\r'));
      }
    });
  });
}

/**
 * todo isaac: Do work to turn html/rtf into a content fragment.
 */
function readFile(file, callback) {
  if (!global.FileReader || file.type && !(file.type in TEXT_TYPES)) {
    callback('');
    return;
  }

  if (file.type === '') {
    var contents = '';
    // Special-case text clippings, which have an empty type but include
    // `.textClipping` in the file name. `readAsText` results in an empty
    // string for text clippings, so we force the file name to serve
    // as the text value for the file.
    if (TEXT_CLIPPING_REGEX.test(file.name)) {
      contents = file.name.replace(TEXT_CLIPPING_REGEX, '');
    }
    callback(contents);
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    var result = reader.result;
    !(typeof result === 'string') ? 'production' !== 'production' ? invariant(false, 'We should be calling "FileReader.readAsText" which returns a string') : invariant(false) : void 0;
    callback(result);
  };
  reader.onerror = function () {
    callback('');
  };
  reader.readAsText(file);
}

module.exports = getTextContentFromFiles;
},{"fbjs/lib/invariant":79}],149:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getUpdatedSelectionState
 * @format
 * 
 */

'use strict';

var DraftOffsetKey = require('./DraftOffsetKey');

var nullthrows = require('fbjs/lib/nullthrows');

function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
  var selection = nullthrows(editorState.getSelection());
  if ('production' !== 'production') {
    if (!anchorKey || !focusKey) {
      /*eslint-disable no-console */
      console.warn('Invalid selection state.', arguments, editorState.toJS());
      /*eslint-enable no-console */
      return selection;
    }
  }

  var anchorPath = DraftOffsetKey.decode(anchorKey);
  var anchorBlockKey = anchorPath.blockKey;
  var anchorLeaf = editorState.getBlockTree(anchorBlockKey).getIn([anchorPath.decoratorKey, 'leaves', anchorPath.leafKey]);

  var focusPath = DraftOffsetKey.decode(focusKey);
  var focusBlockKey = focusPath.blockKey;
  var focusLeaf = editorState.getBlockTree(focusBlockKey).getIn([focusPath.decoratorKey, 'leaves', focusPath.leafKey]);

  var anchorLeafStart = anchorLeaf.get('start');
  var focusLeafStart = focusLeaf.get('start');

  var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
  var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;

  var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;

  if (areEqual) {
    return selection;
  }

  var isBackward = false;
  if (anchorBlockKey === focusBlockKey) {
    var anchorLeafEnd = anchorLeaf.get('end');
    var focusLeafEnd = focusLeaf.get('end');
    if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
      isBackward = focusOffset < anchorOffset;
    } else {
      isBackward = focusLeafStart < anchorLeafStart;
    }
  } else {
    var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function (v) {
      return v === anchorBlockKey || v === focusBlockKey;
    }).first();
    isBackward = startKey === focusBlockKey;
  }

  return selection.merge({
    anchorKey: anchorBlockKey,
    anchorOffset: anchorBlockOffset,
    focusKey: focusBlockKey,
    focusOffset: focusBlockOffset,
    isBackward: isBackward
  });
}

module.exports = getUpdatedSelectionState;
},{"./DraftOffsetKey":107,"fbjs/lib/nullthrows":131}],116:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorDragHandler
 * @format
 * 
 */

'use strict';

var DataTransfer = require('fbjs/lib/DataTransfer');
var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');

var findAncestorOffsetKey = require('./findAncestorOffsetKey');
var getTextContentFromFiles = require('./getTextContentFromFiles');
var getUpdatedSelectionState = require('./getUpdatedSelectionState');
var isEventHandled = require('./isEventHandled');
var nullthrows = require('fbjs/lib/nullthrows');

/**
 * Get a SelectionState for the supplied mouse event.
 */
function getSelectionForEvent(event, editorState) {
  var node = null;
  var offset = null;

  if (typeof document.caretRangeFromPoint === 'function') {
    var dropRange = document.caretRangeFromPoint(event.x, event.y);
    node = dropRange.startContainer;
    offset = dropRange.startOffset;
  } else if (event.rangeParent) {
    node = event.rangeParent;
    offset = event.rangeOffset;
  } else {
    return null;
  }

  node = nullthrows(node);
  offset = nullthrows(offset);
  var offsetKey = nullthrows(findAncestorOffsetKey(node));

  return getUpdatedSelectionState(editorState, offsetKey, offset, offsetKey, offset);
}

var DraftEditorDragHandler = {
  /**
   * Drag originating from input terminated.
   */
  onDragEnd: function onDragEnd(editor) {
    editor.exitCurrentMode();
  },

  /**
   * Handle data being dropped.
   */
  onDrop: function onDrop(editor, e) {
    var data = new DataTransfer(e.nativeEvent.dataTransfer);

    var editorState = editor._latestEditorState;
    var dropSelection = getSelectionForEvent(e.nativeEvent, editorState);

    e.preventDefault();
    editor.exitCurrentMode();

    if (dropSelection == null) {
      return;
    }

    var files = data.getFiles();
    if (files.length > 0) {
      if (editor.props.handleDroppedFiles && isEventHandled(editor.props.handleDroppedFiles(dropSelection, files))) {
        return;
      }

      getTextContentFromFiles(files, function (fileText) {
        fileText && editor.update(insertTextAtSelection(editorState, dropSelection, fileText));
      });
      return;
    }

    var dragType = editor._internalDrag ? 'internal' : 'external';
    if (editor.props.handleDrop && isEventHandled(editor.props.handleDrop(dropSelection, data, dragType))) {
      return;
    }

    if (editor._internalDrag) {
      editor.update(moveText(editorState, dropSelection));
      return;
    }

    editor.update(insertTextAtSelection(editorState, dropSelection, data.getText()));
  }
};

function moveText(editorState, targetSelection) {
  var newContentState = DraftModifier.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

/**
 * Insert text at a specified selection.
 */
function insertTextAtSelection(editorState, selection, text) {
  var newContentState = DraftModifier.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

module.exports = DraftEditorDragHandler;
},{"fbjs/lib/DataTransfer":151,"./DraftModifier":35,"./EditorState":37,"./findAncestorOffsetKey":147,"./getTextContentFromFiles":148,"./getUpdatedSelectionState":149,"./isEventHandled":150,"fbjs/lib/nullthrows":131}],205:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],198:[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

},{"process":205}],178:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

// setimmediate adds setImmediate to the global. We want to make sure we export
// the actual function.

require('setimmediate');
module.exports = global.setImmediate;
},{"setimmediate":198}],152:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnBeforeInput
 * @format
 * 
 */

'use strict';

var BlockTree = require('./BlockTree');
var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var UserAgent = require('fbjs/lib/UserAgent');

var getEntityKeyForSelection = require('./getEntityKeyForSelection');
var isEventHandled = require('./isEventHandled');
var isSelectionAtLeafStart = require('./isSelectionAtLeafStart');
var nullthrows = require('fbjs/lib/nullthrows');
var setImmediate = require('fbjs/lib/setImmediate');

// When nothing is focused, Firefox regards two characters, `'` and `/`, as
// commands that should open and focus the "quickfind" search bar. This should
// *never* happen while a contenteditable is focused, but as of v28, it
// sometimes does, even when the keypress event target is the contenteditable.
// This breaks the input. Special case these characters to ensure that when
// they are typed, we prevent default on the event to make sure not to
// trigger quickfind.
var FF_QUICKFIND_CHAR = "'";
var FF_QUICKFIND_LINK_CHAR = '/';
var isFirefox = UserAgent.isBrowser('Firefox');

function mustPreventDefaultForCharacter(character) {
  return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
}

/**
 * Replace the current selection with the specified text string, with the
 * inline style and entity key applied to the newly inserted text.
 */
function replaceText(editorState, text, inlineStyle, entityKey) {
  var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, inlineStyle, entityKey);
  return EditorState.push(editorState, contentState, 'insert-characters');
}

/**
 * When `onBeforeInput` executes, the browser is attempting to insert a
 * character into the editor. Apply this character data to the document,
 * allowing native insertion if possible.
 *
 * Native insertion is encouraged in order to limit re-rendering and to
 * preserve spellcheck highlighting, which disappears or flashes if re-render
 * occurs on the relevant text nodes.
 */
function editOnBeforeInput(editor, e) {
  if (editor._pendingStateFromBeforeInput !== undefined) {
    editor.update(editor._pendingStateFromBeforeInput);
    editor._pendingStateFromBeforeInput = undefined;
  }

  var editorState = editor._latestEditorState;

  var chars = e.data;

  // In some cases (ex: IE ideographic space insertion) no character data
  // is provided. There's nothing to do when this happens.
  if (!chars) {
    return;
  }

  // Allow the top-level component to handle the insertion manually. This is
  // useful when triggering interesting behaviors for a character insertion,
  // Simple examples: replacing a raw text ':)' with a smile emoji or image
  // decorator, or setting a block to be a list item after typing '- ' at the
  // start of the block.
  if (editor.props.handleBeforeInput && isEventHandled(editor.props.handleBeforeInput(chars, editorState))) {
    e.preventDefault();
    return;
  }

  // If selection is collapsed, conditionally allow native behavior. This
  // reduces re-renders and preserves spellcheck highlighting. If the selection
  // is not collapsed, we will re-render.
  var selection = editorState.getSelection();
  var selectionStart = selection.getStartOffset();
  var selectionEnd = selection.getEndOffset();
  var anchorKey = selection.getAnchorKey();

  if (!selection.isCollapsed()) {
    e.preventDefault();

    // If the currently selected text matches what the user is trying to
    // replace it with, let's just update the `SelectionState`. If not, update
    // the `ContentState` with the new text.
    var currentlySelectedChars = editorState.getCurrentContent().getPlainText().slice(selectionStart, selectionEnd);
    if (chars === currentlySelectedChars) {
      editor.update(EditorState.forceSelection(editorState, selection.merge({
        focusOffset: selectionEnd
      })));
    } else {
      editor.update(replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())));
    }
    return;
  }

  var newEditorState = replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection()));

  // Bunch of different cases follow where we need to prevent native insertion.
  var mustPreventNative = false;
  if (!mustPreventNative) {
    // Browsers tend to insert text in weird places in the DOM when typing at
    // the start of a leaf, so we'll handle it ourselves.
    mustPreventNative = isSelectionAtLeafStart(editor._latestCommittedEditorState);
  }
  if (!mustPreventNative) {
    // Chrome will also split up a node into two pieces if it contains a Tab
    // char, for no explicable reason. Seemingly caused by this commit:
    // https://chromium.googlesource.com/chromium/src/+/013ac5eaf3%5E%21/
    var nativeSelection = global.getSelection();
    // Selection is necessarily collapsed at this point due to earlier check.
    if (nativeSelection.anchorNode && nativeSelection.anchorNode.nodeType === Node.TEXT_NODE) {
      // See isTabHTMLSpanElement in chromium EditingUtilities.cpp.
      var parentNode = nativeSelection.anchorNode.parentNode;
      mustPreventNative = parentNode.nodeName === 'SPAN' && parentNode.firstChild.nodeType === Node.TEXT_NODE && parentNode.firstChild.nodeValue.indexOf('\t') !== -1;
    }
  }
  if (!mustPreventNative) {
    // Check the old and new "fingerprints" of the current block to determine
    // whether this insertion requires any addition or removal of text nodes,
    // in which case we would prevent the native character insertion.
    var originalFingerprint = BlockTree.getFingerprint(editorState.getBlockTree(anchorKey));
    var newFingerprint = BlockTree.getFingerprint(newEditorState.getBlockTree(anchorKey));
    mustPreventNative = originalFingerprint !== newFingerprint;
  }
  if (!mustPreventNative) {
    mustPreventNative = mustPreventDefaultForCharacter(chars);
  }
  if (!mustPreventNative) {
    mustPreventNative = nullthrows(newEditorState.getDirectionMap()).get(anchorKey) !== nullthrows(editorState.getDirectionMap()).get(anchorKey);
  }

  if (mustPreventNative) {
    e.preventDefault();
    editor.update(newEditorState);
    return;
  }

  // We made it all the way! Let the browser do its thing and insert the char.
  newEditorState = EditorState.set(newEditorState, {
    nativelyRenderedContent: newEditorState.getCurrentContent()
  });
  // The native event is allowed to occur. To allow user onChange handlers to
  // change the inserted text, we wait until the text is actually inserted
  // before we actually update our state. That way when we rerender, the text
  // we see in the DOM will already have been inserted properly.
  editor._pendingStateFromBeforeInput = newEditorState;
  setImmediate(function () {
    if (editor._pendingStateFromBeforeInput !== undefined) {
      editor.update(editor._pendingStateFromBeforeInput);
      editor._pendingStateFromBeforeInput = undefined;
    }
  });
}

module.exports = editOnBeforeInput;
},{"./BlockTree":120,"./DraftModifier":35,"./EditorState":37,"fbjs/lib/UserAgent":119,"./getEntityKeyForSelection":166,"./isEventHandled":150,"./isSelectionAtLeafStart":167,"fbjs/lib/nullthrows":131,"fbjs/lib/setImmediate":178}],153:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnBlur
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

var containsNode = require('fbjs/lib/containsNode');
var getActiveElement = require('fbjs/lib/getActiveElement');

function editOnBlur(editor, e) {
  // In a contentEditable element, when you select a range and then click
  // another active element, this does trigger a `blur` event but will not
  // remove the DOM selection from the contenteditable.
  // This is consistent across all browsers, but we prefer that the editor
  // behave like a textarea, where a `blur` event clears the DOM selection.
  // We therefore force the issue to be certain, checking whether the active
  // element is `body` to force it when blurring occurs within the window (as
  // opposed to clicking to another tab or window).
  if (getActiveElement() === document.body) {
    var _selection = global.getSelection();
    var editorNode = editor.editor;
    if (_selection.rangeCount === 1 && containsNode(editorNode, _selection.anchorNode) && containsNode(editorNode, _selection.focusNode)) {
      _selection.removeAllRanges();
    }
  }

  var editorState = editor._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (!currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', false);
  editor.props.onBlur && editor.props.onBlur(e);
  editor.update(EditorState.acceptSelection(editorState, selection));
}

module.exports = editOnBlur;
},{"./EditorState":37,"fbjs/lib/containsNode":86,"fbjs/lib/getActiveElement":84}],154:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCompositionStart
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

/**
 * The user has begun using an IME input system. Switching to `composite` mode
 * allows handling composition input and disables other edit behavior.
 */
function editOnCompositionStart(editor, e) {
  editor.setMode('composite');
  editor.update(EditorState.set(editor._latestEditorState, { inCompositionMode: true }));
  // Allow composition handler to interpret the compositionstart event
  editor._onCompositionStart(e);
}

module.exports = editOnCompositionStart;
},{"./EditorState":37}],179:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getFragmentFromSelection
 * @format
 * 
 */

'use strict';

var getContentStateFragment = require('./getContentStateFragment');

function getFragmentFromSelection(editorState) {
  var selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    return null;
  }

  return getContentStateFragment(editorState.getCurrentContent(), selectionState);
}

module.exports = getFragmentFromSelection;
},{"./getContentStateFragment":95}],155:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCopy
 * @format
 * 
 */

'use strict';

var getFragmentFromSelection = require('./getFragmentFromSelection');

/**
 * If we have a selection, create a ContentState fragment and store
 * it in our internal clipboard. Subsequent paste events will use this
 * fragment if no external clipboard data is supplied.
 */
function editOnCopy(editor, e) {
  var editorState = editor._latestEditorState;
  var selection = editorState.getSelection();

  // No selection, so there's nothing to copy.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  editor.setClipboard(getFragmentFromSelection(editor._latestEditorState));
}

module.exports = editOnCopy;
},{"./getFragmentFromSelection":179}],156:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnCut
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var Style = require('fbjs/lib/Style');

var getFragmentFromSelection = require('./getFragmentFromSelection');
var getScrollPosition = require('fbjs/lib/getScrollPosition');

/**
 * On `cut` events, native behavior is allowed to occur so that the system
 * clipboard is set properly. This means that we need to take steps to recover
 * the editor DOM state after the `cut` has occurred in order to maintain
 * control of the component.
 *
 * In addition, we can keep a copy of the removed fragment, including all
 * styles and entities, for use as an internal paste.
 */
function editOnCut(editor, e) {
  var editorState = editor._latestEditorState;
  var selection = editorState.getSelection();
  var element = e.target;
  var scrollPosition = void 0;

  // No selection, so there's nothing to cut.
  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  // Track the current scroll position so that it can be forced back in place
  // after the editor regains control of the DOM.
  if (element instanceof Node) {
    scrollPosition = getScrollPosition(Style.getScrollParent(element));
  }

  var fragment = getFragmentFromSelection(editorState);
  editor.setClipboard(fragment);

  // Set `cut` mode to disable all event handling temporarily.
  editor.setMode('cut');

  // Let native `cut` behavior occur, then recover control.
  setTimeout(function () {
    editor.restoreEditorDOM(scrollPosition);
    editor.exitCurrentMode();
    editor.update(removeFragment(editorState));
  }, 0);
}

function removeFragment(editorState) {
  var newContent = DraftModifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward');
  return EditorState.push(editorState, newContent, 'remove-range');
}

module.exports = editOnCut;
},{"./DraftModifier":35,"./EditorState":37,"fbjs/lib/Style":125,"./getFragmentFromSelection":179,"fbjs/lib/getScrollPosition":129}],157:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragOver
 * @format
 * 
 */

'use strict';

/**
 * Drag behavior has begun from outside the editor element.
 */
function editOnDragOver(editor, e) {
  editor._internalDrag = false;
  editor.setMode('drag');
  e.preventDefault();
}

module.exports = editOnDragOver;
},{}],158:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnDragStart
 * @format
 * 
 */

'use strict';

/**
 * A `dragstart` event has begun within the text editor component.
 */
function editOnDragStart(editor) {
  editor._internalDrag = true;
  editor.setMode('drag');
}

module.exports = editOnDragStart;
},{}],159:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnFocus
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');
var UserAgent = require('fbjs/lib/UserAgent');

function editOnFocus(editor, e) {
  var editorState = editor._latestEditorState;
  var currentSelection = editorState.getSelection();
  if (currentSelection.getHasFocus()) {
    return;
  }

  var selection = currentSelection.set('hasFocus', true);
  editor.props.onFocus && editor.props.onFocus(e);

  // When the tab containing this text editor is hidden and the user does a
  // find-in-page in a _different_ tab, Chrome on Mac likes to forget what the
  // selection was right after sending this focus event and (if you let it)
  // moves the cursor back to the beginning of the editor, so we force the
  // selection here instead of simply accepting it in order to preserve the
  // old cursor position. See https://crbug.com/540004.
  // But it looks like this is fixed in Chrome 60.0.3081.0.
  // Other browsers also don't have this bug, so we prefer to acceptSelection
  // when possible, to ensure that unfocusing and refocusing a Draft editor
  // doesn't preserve the selection, matching how textareas work.
  if (UserAgent.isBrowser('Chrome < 60.0.3081.0')) {
    editor.update(EditorState.forceSelection(editorState, selection));
  } else {
    editor.update(EditorState.acceptSelection(editorState, selection));
  }
}

module.exports = editOnFocus;
},{"./EditorState":37,"fbjs/lib/UserAgent":119}],160:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnInput
 * @format
 * 
 */

'use strict';

var DraftFeatureFlags = require('./DraftFeatureFlags');
var DraftModifier = require('./DraftModifier');
var DraftOffsetKey = require('./DraftOffsetKey');
var EditorState = require('./EditorState');
var UserAgent = require('fbjs/lib/UserAgent');

var findAncestorOffsetKey = require('./findAncestorOffsetKey');
var nullthrows = require('fbjs/lib/nullthrows');

var isGecko = UserAgent.isEngine('Gecko');

var DOUBLE_NEWLINE = '\n\n';

/**
 * This function is intended to handle spellcheck and autocorrect changes,
 * which occur in the DOM natively without any opportunity to observe or
 * interpret the changes before they occur.
 *
 * The `input` event fires in contentEditable elements reliably for non-IE
 * browsers, immediately after changes occur to the editor DOM. Since our other
 * handlers override or otherwise handle cover other varieties of text input,
 * the DOM state should match the model in all controlled input cases. Thus,
 * when an `input` change leads to a DOM/model mismatch, the change should be
 * due to a spellcheck change, and we can incorporate it into our model.
 */
function editOnInput(editor) {
  if (editor._pendingStateFromBeforeInput !== undefined) {
    editor.update(editor._pendingStateFromBeforeInput);
    editor._pendingStateFromBeforeInput = undefined;
  }

  var domSelection = global.getSelection();

  var anchorNode = domSelection.anchorNode,
      isCollapsed = domSelection.isCollapsed;

  var isNotTextNode = anchorNode.nodeType !== Node.TEXT_NODE;
  var isNotTextOrElementNode = anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.ELEMENT_NODE;

  if (DraftFeatureFlags.draft_killswitch_allow_nontextnodes) {
    if (isNotTextNode) {
      return;
    }
  } else {
    if (isNotTextOrElementNode) {
      // TODO: (t16149272) figure out context for this change
      return;
    }
  }

  if (anchorNode.nodeType === Node.TEXT_NODE && (anchorNode.previousSibling !== null || anchorNode.nextSibling !== null)) {
    // When typing at the beginning of a visual line, Chrome splits the text
    // nodes into two. Why? No one knows. This commit is suspicious:
    // https://chromium.googlesource.com/chromium/src/+/a3b600981286b135632371477f902214c55a1724
    // To work around, we'll merge the sibling text nodes back into this one.
    var span = anchorNode.parentNode;
    anchorNode.nodeValue = span.textContent;
    for (var child = span.firstChild; child !== null; child = child.nextSibling) {
      if (child !== anchorNode) {
        span.removeChild(child);
      }
    }
  }

  var domText = anchorNode.textContent;
  var editorState = editor._latestEditorState;
  var offsetKey = nullthrows(findAncestorOffsetKey(anchorNode));

  var _DraftOffsetKey$decod = DraftOffsetKey.decode(offsetKey),
      blockKey = _DraftOffsetKey$decod.blockKey,
      decoratorKey = _DraftOffsetKey$decod.decoratorKey,
      leafKey = _DraftOffsetKey$decod.leafKey;

  var _editorState$getBlock = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]),
      start = _editorState$getBlock.start,
      end = _editorState$getBlock.end;

  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var modelText = block.getText().slice(start, end);

  // Special-case soft newlines here. If the DOM text ends in a soft newline,
  // we will have manually inserted an extra soft newline in DraftEditorLeaf.
  // We want to remove this extra newline for the purpose of our comparison
  // of DOM and model text.
  if (domText.endsWith(DOUBLE_NEWLINE)) {
    domText = domText.slice(0, -1);
  }

  // No change -- the DOM is up to date. Nothing to do here.
  if (domText === modelText) {
    // This can be buggy for some Android keyboards because they don't fire
    // standard onkeydown/pressed events and only fired editOnInput
    // so domText is already changed by the browser and ends up being equal
    // to modelText unexpectedly
    return;
  }

  var selection = editorState.getSelection();

  // We'll replace the entire leaf with the text content of the target.
  var targetRange = selection.merge({
    anchorOffset: start,
    focusOffset: end,
    isBackward: false
  });

  var entityKey = block.getEntityAt(start);
  var entity = entityKey && content.getEntity(entityKey);
  var entityType = entity && entity.getMutability();
  var preserveEntity = entityType === 'MUTABLE';

  // Immutable or segmented entities cannot properly be handled by the
  // default browser undo, so we have to use a different change type to
  // force using our internal undo method instead of falling through to the
  // native browser undo.
  var changeType = preserveEntity ? 'spellcheck-change' : 'apply-entity';

  var newContent = DraftModifier.replaceText(content, targetRange, domText, block.getInlineStyleAt(start), preserveEntity ? block.getEntityAt(start) : null);

  var anchorOffset, focusOffset, startOffset, endOffset;

  if (isGecko) {
    // Firefox selection does not change while the context menu is open, so
    // we preserve the anchor and focus values of the DOM selection.
    anchorOffset = domSelection.anchorOffset;
    focusOffset = domSelection.focusOffset;
    startOffset = start + Math.min(anchorOffset, focusOffset);
    endOffset = startOffset + Math.abs(anchorOffset - focusOffset);
    anchorOffset = startOffset;
    focusOffset = endOffset;
  } else {
    // Browsers other than Firefox may adjust DOM selection while the context
    // menu is open, and Safari autocorrect is prone to providing an inaccurate
    // DOM selection. Don't trust it. Instead, use our existing SelectionState
    // and adjust it based on the number of characters changed during the
    // mutation.
    var charDelta = domText.length - modelText.length;
    startOffset = selection.getStartOffset();
    endOffset = selection.getEndOffset();

    anchorOffset = isCollapsed ? endOffset + charDelta : startOffset;
    focusOffset = endOffset + charDelta;
  }

  // Segmented entities are completely or partially removed when their
  // text content changes. For this case we do not want any text to be selected
  // after the change, so we are not merging the selection.
  var contentWithAdjustedDOMSelection = newContent.merge({
    selectionBefore: content.getSelectionAfter(),
    selectionAfter: selection.merge({ anchorOffset: anchorOffset, focusOffset: focusOffset })
  });

  editor.update(EditorState.push(editorState, contentWithAdjustedDOMSelection, changeType));
}

module.exports = editOnInput;
},{"./DraftFeatureFlags":88,"./DraftModifier":35,"./DraftOffsetKey":107,"./EditorState":37,"fbjs/lib/UserAgent":119,"./findAncestorOffsetKey":147,"fbjs/lib/nullthrows":131}],38:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyBindingUtil
 * @format
 * 
 */

'use strict';

var UserAgent = require('fbjs/lib/UserAgent');

var isOSX = UserAgent.isPlatform('Mac OS X');

var KeyBindingUtil = {
  /**
   * Check whether the ctrlKey modifier is *not* being used in conjunction with
   * the altKey modifier. If they are combined, the result is an `altGraph`
   * key modifier, which should not be handled by this set of key bindings.
   */
  isCtrlKeyCommand: function isCtrlKeyCommand(e) {
    return !!e.ctrlKey && !e.altKey;
  },

  isOptionKeyCommand: function isOptionKeyCommand(e) {
    return isOSX && e.altKey;
  },

  hasCommandModifier: function hasCommandModifier(e) {
    return isOSX ? !!e.metaKey && !e.altKey : KeyBindingUtil.isCtrlKeyCommand(e);
  }
};

module.exports = KeyBindingUtil;
},{"fbjs/lib/UserAgent":119}],180:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SecondaryClipboard
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');

var getContentStateFragment = require('./getContentStateFragment');
var nullthrows = require('fbjs/lib/nullthrows');

var clipboard = null;

/**
 * Some systems offer a "secondary" clipboard to allow quick internal cut
 * and paste behavior. For instance, Ctrl+K (cut) and Ctrl+Y (paste).
 */
var SecondaryClipboard = {
  cut: function cut(editorState) {
    var content = editorState.getCurrentContent();
    var selection = editorState.getSelection();
    var targetRange = null;

    if (selection.isCollapsed()) {
      var anchorKey = selection.getAnchorKey();
      var blockEnd = content.getBlockForKey(anchorKey).getLength();

      if (blockEnd === selection.getAnchorOffset()) {
        return editorState;
      }

      targetRange = selection.set('focusOffset', blockEnd);
    } else {
      targetRange = selection;
    }

    targetRange = nullthrows(targetRange);
    clipboard = getContentStateFragment(content, targetRange);

    var afterRemoval = DraftModifier.removeRange(content, targetRange, 'forward');

    if (afterRemoval === content) {
      return editorState;
    }

    return EditorState.push(editorState, afterRemoval, 'remove-range');
  },

  paste: function paste(editorState) {
    if (!clipboard) {
      return editorState;
    }

    var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), clipboard);

    return EditorState.push(editorState, newContent, 'insert-fragment');
  }
};

module.exports = SecondaryClipboard;
},{"./DraftModifier":35,"./EditorState":37,"./getContentStateFragment":95,"fbjs/lib/nullthrows":131}],144:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * Unicode-enabled replacesments for basic String functions.
 *
 * All the functions in this module assume that the input string is a valid
 * UTF-16 encoding of a Unicode sequence. If it's not the case, the behavior
 * will be undefined.
 *
 * WARNING: Since this module is typechecks-enforced, you may find new bugs
 * when replacing normal String functions with ones provided here.
 */

'use strict';

var invariant = require('./invariant');

// These two ranges are consecutive so anything in [HIGH_START, LOW_END] is a
// surrogate code unit.
var SURROGATE_HIGH_START = 0xD800;
var SURROGATE_HIGH_END = 0xDBFF;
var SURROGATE_LOW_START = 0xDC00;
var SURROGATE_LOW_END = 0xDFFF;
var SURROGATE_UNITS_REGEX = /[\uD800-\uDFFF]/;

/**
 * @param {number} codeUnit   A Unicode code-unit, in range [0, 0x10FFFF]
 * @return {boolean}          Whether code-unit is in a surrogate (hi/low) range
 */
function isCodeUnitInSurrogateRange(codeUnit) {
  return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
}

/**
 * Returns whether the two characters starting at `index` form a surrogate pair.
 * For example, given the string s = "\uD83D\uDE0A", (s, 0) returns true and
 * (s, 1) returns false.
 *
 * @param {string} str
 * @param {number} index
 * @return {boolean}
 */
function isSurrogatePair(str, index) {
  !(0 <= index && index < str.length) ? 'production' !== 'production' ? invariant(false, 'isSurrogatePair: Invalid index %s for string length %s.', index, str.length) : invariant(false) : void 0;
  if (index + 1 === str.length) {
    return false;
  }
  var first = str.charCodeAt(index);
  var second = str.charCodeAt(index + 1);
  return SURROGATE_HIGH_START <= first && first <= SURROGATE_HIGH_END && SURROGATE_LOW_START <= second && second <= SURROGATE_LOW_END;
}

/**
 * @param {string} str  Non-empty string
 * @return {boolean}    True if the input includes any surrogate code units
 */
function hasSurrogateUnit(str) {
  return SURROGATE_UNITS_REGEX.test(str);
}

/**
 * Return the length of the original Unicode character at given position in the
 * String by looking into the UTF-16 code unit; that is equal to 1 for any
 * non-surrogate characters in BMP ([U+0000..U+D7FF] and [U+E000, U+FFFF]); and
 * returns 2 for the hi/low surrogates ([U+D800..U+DFFF]), which are in fact
 * representing non-BMP characters ([U+10000..U+10FFFF]).
 *
 * Examples:
 * - '\u0020' => 1
 * - '\u3020' => 1
 * - '\uD835' => 2
 * - '\uD835\uDDEF' => 2
 * - '\uDDEF' => 2
 *
 * @param {string} str  Non-empty string
 * @param {number} pos  Position in the string to look for one code unit
 * @return {number}      Number 1 or 2
 */
function getUTF16Length(str, pos) {
  return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
}

/**
 * Fully Unicode-enabled replacement for String#length
 *
 * @param {string} str  Valid Unicode string
 * @return {number}     The number of Unicode characters in the string
 */
function strlen(str) {
  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.length;
  }

  var len = 0;
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    len++;
  }
  return len;
}

/**
 * Fully Unicode-enabled replacement for String#substr()
 *
 * @param {string} str      Valid Unicode string
 * @param {number} start    Location in Unicode sequence to begin extracting
 * @param {?number} length  The number of Unicode characters to extract
 *                          (default: to the end of the string)
 * @return {string}         Extracted sub-string
 */
function substr(str, start, length) {
  start = start || 0;
  length = length === undefined ? Infinity : length || 0;

  // Call the native functions if there's no surrogate char
  if (!hasSurrogateUnit(str)) {
    return str.substr(start, length);
  }

  // Obvious cases
  var size = str.length;
  if (size <= 0 || start > size || length <= 0) {
    return '';
  }

  // Find the actual starting position
  var posA = 0;
  if (start > 0) {
    for (; start > 0 && posA < size; start--) {
      posA += getUTF16Length(str, posA);
    }
    if (posA >= size) {
      return '';
    }
  } else if (start < 0) {
    for (posA = size; start < 0 && 0 < posA; start++) {
      posA -= getUTF16Length(str, posA - 1);
    }
    if (posA < 0) {
      posA = 0;
    }
  }

  // Find the actual ending position
  var posB = size;
  if (length < size) {
    for (posB = posA; length > 0 && posB < size; length--) {
      posB += getUTF16Length(str, posB);
    }
  }

  return str.substring(posA, posB);
}

/**
 * Fully Unicode-enabled replacement for String#substring()
 *
 * @param {string} str    Valid Unicode string
 * @param {number} start  Location in Unicode sequence to begin extracting
 * @param {?number} end   Location in Unicode sequence to end extracting
 *                        (default: end of the string)
 * @return {string}       Extracted sub-string
 */
function substring(str, start, end) {
  start = start || 0;
  end = end === undefined ? Infinity : end || 0;

  if (start < 0) {
    start = 0;
  }
  if (end < 0) {
    end = 0;
  }

  var length = Math.abs(end - start);
  start = start < end ? start : end;
  return substr(str, start, length);
}

/**
 * Get a list of Unicode code-points from a String
 *
 * @param {string} str        Valid Unicode string
 * @return {array<number>}    A list of code-points in [0..0x10FFFF]
 */
function getCodePoints(str) {
  var codePoints = [];
  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
    codePoints.push(str.codePointAt(pos));
  }
  return codePoints;
}

var UnicodeUtils = {
  getCodePoints: getCodePoints,
  getUTF16Length: getUTF16Length,
  hasSurrogateUnit: hasSurrogateUnit,
  isCodeUnitInSurrogateRange: isCodeUnitInSurrogateRange,
  isSurrogatePair: isSurrogatePair,
  strlen: strlen,
  substring: substring,
  substr: substr
};

module.exports = UnicodeUtils;
},{"./invariant":79}],145:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangeClientRects
 * @format
 * 
 */

'use strict';

var UserAgent = require('fbjs/lib/UserAgent');

var invariant = require('fbjs/lib/invariant');

var isChrome = UserAgent.isBrowser('Chrome');

// In Chrome, the client rects will include the entire bounds of all nodes that
// begin (have a start tag) within the selection, even if the selection does
// not overlap the entire node. To resolve this, we split the range at each
// start tag and join the client rects together.
// https://code.google.com/p/chromium/issues/detail?id=324437
/* eslint-disable consistent-return */
function getRangeClientRectsChrome(range) {
  var tempRange = range.cloneRange();
  var clientRects = [];

  for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
    // If we've climbed up to the common ancestor, we can now use the
    // original start point and stop climbing the tree.
    var atCommonAncestor = ancestor === range.commonAncestorContainer;
    if (atCommonAncestor) {
      tempRange.setStart(range.startContainer, range.startOffset);
    } else {
      tempRange.setStart(tempRange.endContainer, 0);
    }
    var rects = Array.from(tempRange.getClientRects());
    clientRects.push(rects);
    if (atCommonAncestor) {
      var _ref;

      clientRects.reverse();
      return (_ref = []).concat.apply(_ref, clientRects);
    }
    tempRange.setEndBefore(ancestor);
  }

  !false ? 'production' !== 'production' ? invariant(false, 'Found an unexpected detached subtree when getting range client rects.') : invariant(false) : void 0;
}
/* eslint-enable consistent-return */

/**
 * Like range.getClientRects() but normalizes for browser bugs.
 */
var getRangeClientRects = isChrome ? getRangeClientRectsChrome : function (range) {
  return Array.from(range.getClientRects());
};

module.exports = getRangeClientRects;
},{"fbjs/lib/UserAgent":119,"fbjs/lib/invariant":79}],199:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule expandRangeToStartOfLine
 * @format
 * 
 */

var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var getRangeClientRects = require('./getRangeClientRects');
var invariant = require('fbjs/lib/invariant');

/**
 * Return the computed line height, in pixels, for the provided element.
 */
function getLineHeightPx(element) {
  var computed = getComputedStyle(element);
  var div = document.createElement('div');
  div.style.fontFamily = computed.fontFamily;
  div.style.fontSize = computed.fontSize;
  div.style.fontStyle = computed.fontStyle;
  div.style.fontWeight = computed.fontWeight;
  div.style.lineHeight = computed.lineHeight;
  div.style.position = 'absolute';
  div.textContent = 'M';

  var documentBody = document.body;
  !documentBody ? 'production' !== 'production' ? invariant(false, 'Missing document.body') : invariant(false) : void 0;

  // forced layout here
  documentBody.appendChild(div);
  var rect = div.getBoundingClientRect();
  documentBody.removeChild(div);

  return rect.height;
}

/**
 * Return whether every ClientRect in the provided list lies on the same line.
 *
 * We assume that the rects on the same line all contain the baseline, so the
 * lowest top line needs to be above the highest bottom line (i.e., if you were
 * to project the rects onto the y-axis, their intersection would be nonempty).
 *
 * In addition, we require that no two boxes are lineHeight (or more) apart at
 * either top or bottom, which helps protect against false positives for fonts
 * with extremely large glyph heights (e.g., with a font size of 17px, Zapfino
 * produces rects of height 58px!).
 */
function areRectsOnOneLine(rects, lineHeight) {
  var minTop = Infinity;
  var minBottom = Infinity;
  var maxTop = -Infinity;
  var maxBottom = -Infinity;

  for (var ii = 0; ii < rects.length; ii++) {
    var rect = rects[ii];
    if (rect.width === 0 || rect.width === 1) {
      // When a range starts or ends a soft wrap, many browsers (Chrome, IE,
      // Safari) include an empty rect on the previous or next line. When the
      // text lies in a container whose position is not integral (e.g., from
      // margin: auto), Safari makes these empty rects have width 1 (instead of
      // 0). Having one-pixel-wide characters seems unlikely (and most browsers
      // report widths in subpixel precision anyway) so it's relatively safe to
      // skip over them.
      continue;
    }
    minTop = Math.min(minTop, rect.top);
    minBottom = Math.min(minBottom, rect.bottom);
    maxTop = Math.max(maxTop, rect.top);
    maxBottom = Math.max(maxBottom, rect.bottom);
  }

  return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
}

/**
 * Return the length of a node, as used by Range offsets.
 */
function getNodeLength(node) {
  // http://www.w3.org/TR/dom/#concept-node-length
  switch (node.nodeType) {
    case Node.DOCUMENT_TYPE_NODE:
      return 0;
    case Node.TEXT_NODE:
    case Node.PROCESSING_INSTRUCTION_NODE:
    case Node.COMMENT_NODE:
      return node.length;
    default:
      return node.childNodes.length;
  }
}

/**
 * Given a collapsed range, move the start position backwards as far as
 * possible while the range still spans only a single line.
 */
function expandRangeToStartOfLine(range) {
  !range.collapsed ? 'production' !== 'production' ? invariant(false, 'expandRangeToStartOfLine: Provided range is not collapsed.') : invariant(false) : void 0;
  range = range.cloneRange();

  var containingElement = range.startContainer;
  if (containingElement.nodeType !== 1) {
    containingElement = containingElement.parentNode;
  }
  var lineHeight = getLineHeightPx(containingElement);

  // Imagine our text looks like:
  //   <div><span>once upon a time, there was a <em>boy
  //   who lived</em> </span><q><strong>under^ the
  //   stairs</strong> in a small closet.</q></div>
  // where the caret represents the cursor. First, we crawl up the tree until
  // the range spans multiple lines (setting the start point to before
  // "<strong>", then before "<div>"), then at each level we do a search to
  // find the latest point which is still on a previous line. We'll find that
  // the break point is inside the span, then inside the <em>, then in its text
  // node child, the actual break point before "who".

  var bestContainer = range.endContainer;
  var bestOffset = range.endOffset;
  range.setStart(range.startContainer, 0);

  while (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
    bestContainer = range.startContainer;
    bestOffset = range.startOffset;
    !bestContainer.parentNode ? 'production' !== 'production' ? invariant(false, 'Found unexpected detached subtree when traversing.') : invariant(false) : void 0;
    range.setStartBefore(bestContainer);
    if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== 'inline') {
      // The start of the line is never in a different block-level container.
      break;
    }
  }

  // In the above example, range now spans from "<div>" to "under",
  // bestContainer is <div>, and bestOffset is 1 (index of <q> inside <div>)].
  // Picking out which child to recurse into here is a special case since we
  // don't want to check past <q> -- once we find that the final range starts
  // in <span>, we can look at all of its children (and all of their children)
  // to find the break point.

  // At all times, (bestContainer, bestOffset) is the latest single-line start
  // point that we know of.
  var currentContainer = bestContainer;
  var maxIndexToConsider = bestOffset - 1;

  do {
    var nodeValue = currentContainer.nodeValue;

    for (var ii = maxIndexToConsider; ii >= 0; ii--) {
      if (nodeValue != null && ii > 0 && UnicodeUtils.isSurrogatePair(nodeValue, ii - 1)) {
        // We're in the middle of a surrogate pair -- skip over so we never
        // return a range with an endpoint in the middle of a code point.
        continue;
      }

      range.setStart(currentContainer, ii);
      if (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
        bestContainer = currentContainer;
        bestOffset = ii;
      } else {
        break;
      }
    }

    if (ii === -1 || currentContainer.childNodes.length === 0) {
      // If ii === -1, then (bestContainer, bestOffset), which is equal to
      // (currentContainer, 0), was a single-line start point but a start
      // point before currentContainer wasn't, so the line break seems to
      // have occurred immediately after currentContainer's start tag
      //
      // If currentContainer.childNodes.length === 0, we're already at a
      // terminal node (e.g., text node) and should return our current best.
      break;
    }

    currentContainer = currentContainer.childNodes[ii];
    maxIndexToConsider = getNodeLength(currentContainer);
  } while (true);

  range.setStart(bestContainer, bestOffset);
  return range;
}

module.exports = expandRangeToStartOfLine;
},{"fbjs/lib/UnicodeUtils":144,"./getRangeClientRects":145,"fbjs/lib/invariant":79}],200:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDraftEditorSelectionWithNodes
 * @format
 * 
 */

'use strict';

var findAncestorOffsetKey = require('./findAncestorOffsetKey');
var getSelectionOffsetKeyForNode = require('./getSelectionOffsetKeyForNode');
var getUpdatedSelectionState = require('./getUpdatedSelectionState');
var invariant = require('fbjs/lib/invariant');
var nullthrows = require('fbjs/lib/nullthrows');

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
  var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
  var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;

  // If the selection range lies only on text nodes, the task is simple.
  // Find the nearest offset-aware elements and use the
  // offset values supplied by the selection range.
  if (anchorIsTextNode && focusIsTextNode) {
    return {
      selectionState: getUpdatedSelectionState(editorState, nullthrows(findAncestorOffsetKey(anchorNode)), anchorOffset, nullthrows(findAncestorOffsetKey(focusNode)), focusOffset),
      needsRecovery: false
    };
  }

  var anchorPoint = null;
  var focusPoint = null;
  var needsRecovery = true;

  // An element is selected. Convert this selection range into leaf offset
  // keys and offset values for consumption at the component level. This
  // is common in Firefox, where select-all and triple click behavior leads
  // to entire elements being selected.
  //
  // Note that we use the `needsRecovery` parameter in the callback here. This
  // is because when certain elements are selected, the behavior for subsequent
  // cursor movement (e.g. via arrow keys) is uncertain and may not match
  // expectations at the component level. For example, if an entire <div> is
  // selected and the user presses the right arrow, Firefox keeps the selection
  // on the <div>. If we allow subsequent keypresses to insert characters
  // natively, they will be inserted into a browser-created text node to the
  // right of that <div>. This is obviously undesirable.
  //
  // With the `needsRecovery` flag, we inform the caller that it is responsible
  // for manually setting the selection state on the rendered document to
  // ensure proper selection state maintenance.

  if (anchorIsTextNode) {
    anchorPoint = {
      key: nullthrows(findAncestorOffsetKey(anchorNode)),
      offset: anchorOffset
    };
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
  } else if (focusIsTextNode) {
    focusPoint = {
      key: nullthrows(findAncestorOffsetKey(focusNode)),
      offset: focusOffset
    };
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
  } else {
    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);

    // If the selection is collapsed on an empty block, don't force recovery.
    // This way, on arrow key selection changes, the browser can move the
    // cursor from a non-zero offset on one block, through empty blocks,
    // to a matching non-zero offset on other text blocks.
    if (anchorNode === focusNode && anchorOffset === focusOffset) {
      needsRecovery = !!anchorNode.firstChild && anchorNode.firstChild.nodeName !== 'BR';
    }
  }

  return {
    selectionState: getUpdatedSelectionState(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
    needsRecovery: needsRecovery
  };
}

/**
 * Identify the first leaf descendant for the given node.
 */
function getFirstLeaf(node) {
  while (node.firstChild && (
  // data-blocks has no offset
  node.firstChild instanceof Element && node.firstChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode(node.firstChild))) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Identify the last leaf descendant for the given node.
 */
function getLastLeaf(node) {
  while (node.lastChild && (
  // data-blocks has no offset
  node.lastChild instanceof Element && node.lastChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode(node.lastChild))) {
    node = node.lastChild;
  }
  return node;
}

function getPointForNonTextNode(editorRoot, startNode, childOffset) {
  var node = startNode;
  var offsetKey = findAncestorOffsetKey(node);

  !(offsetKey != null || editorRoot && (editorRoot === node || editorRoot.firstChild === node)) ? 'production' !== 'production' ? invariant(false, 'Unknown node in selection range.') : invariant(false) : void 0;

  // If the editorRoot is the selection, step downward into the content
  // wrapper.
  if (editorRoot === node) {
    node = node.firstChild;
    !(node instanceof Element && node.getAttribute('data-contents') === 'true') ? 'production' !== 'production' ? invariant(false, 'Invalid DraftEditorContents structure.') : invariant(false) : void 0;
    if (childOffset > 0) {
      childOffset = node.childNodes.length;
    }
  }

  // If the child offset is zero and we have an offset key, we're done.
  // If there's no offset key because the entire editor is selected,
  // find the leftmost ("first") leaf in the tree and use that as the offset
  // key.
  if (childOffset === 0) {
    var key = null;
    if (offsetKey != null) {
      key = offsetKey;
    } else {
      var firstLeaf = getFirstLeaf(node);
      key = nullthrows(getSelectionOffsetKeyForNode(firstLeaf));
    }
    return { key: key, offset: 0 };
  }

  var nodeBeforeCursor = node.childNodes[childOffset - 1];
  var leafKey = null;
  var textLength = null;

  if (!getSelectionOffsetKeyForNode(nodeBeforeCursor)) {
    // Our target node may be a leaf or a text node, in which case we're
    // already where we want to be and can just use the child's length as
    // our offset.
    leafKey = nullthrows(offsetKey);
    textLength = getTextContentLength(nodeBeforeCursor);
  } else {
    // Otherwise, we'll look at the child to the left of the cursor and find
    // the last leaf node in its subtree.
    var lastLeaf = getLastLeaf(nodeBeforeCursor);
    leafKey = nullthrows(getSelectionOffsetKeyForNode(lastLeaf));
    textLength = getTextContentLength(lastLeaf);
  }

  return {
    key: leafKey,
    offset: textLength
  };
}

/**
 * Return the length of a node's textContent, regarding single newline
 * characters as zero-length. This allows us to avoid problems with identifying
 * the correct selection offset for empty blocks in IE, in which we
 * render newlines instead of break tags.
 */
function getTextContentLength(node) {
  var textContent = node.textContent;
  return textContent === '\n' ? 0 : textContent.length;
}

module.exports = getDraftEditorSelectionWithNodes;
},{"./findAncestorOffsetKey":147,"./getSelectionOffsetKeyForNode":175,"./getUpdatedSelectionState":149,"fbjs/lib/invariant":79,"fbjs/lib/nullthrows":131}],201:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionBackward
 * @format
 * 
 */

'use strict';

/**
 * Given a collapsed selection, move the focus `maxDistance` backward within
 * the selected block. If the selection will go beyond the start of the block,
 * move focus to the end of the previous block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionBackward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();

  var focusKey = key;
  var focusOffset = 0;

  if (maxDistance > offset) {
    var keyBefore = content.getKeyBefore(key);
    if (keyBefore == null) {
      focusKey = key;
    } else {
      focusKey = keyBefore;
      var blockBefore = content.getBlockForKey(keyBefore);
      focusOffset = blockBefore.getText().length;
    }
  } else {
    focusOffset = offset - maxDistance;
  }

  return selection.merge({
    focusKey: focusKey,
    focusOffset: focusOffset,
    isBackward: true
  });
}

module.exports = moveSelectionBackward;
},{}],202:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule removeTextWithStrategy
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');

/**
 * For a collapsed selection state, remove text based on the specified strategy.
 * If the selection state is not collapsed, remove the entire selected range.
 */
function removeTextWithStrategy(editorState, strategy, direction) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var target = selection;
  if (selection.isCollapsed()) {
    if (direction === 'forward') {
      if (editorState.isSelectionAtEndOfContent()) {
        return content;
      }
    } else if (editorState.isSelectionAtStartOfContent()) {
      return content;
    }

    target = strategy(editorState);
    if (target === selection) {
      return content;
    }
  }
  return DraftModifier.removeRange(content, target, direction);
}

module.exports = removeTextWithStrategy;
},{"./DraftModifier":35}],181:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandBackspaceToStartOfLine
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

var expandRangeToStartOfLine = require('./expandRangeToStartOfLine');
var getDraftEditorSelectionWithNodes = require('./getDraftEditorSelectionWithNodes');
var moveSelectionBackward = require('./moveSelectionBackward');
var removeTextWithStrategy = require('./removeTextWithStrategy');

function keyCommandBackspaceToStartOfLine(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      return moveSelectionBackward(strategyState, 1);
    }

    var domSelection = global.getSelection();
    var range = domSelection.getRangeAt(0);
    range = expandRangeToStartOfLine(range);

    return getDraftEditorSelectionWithNodes(strategyState, null, range.endContainer, range.endOffset, range.startContainer, range.startOffset).selectionState;
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandBackspaceToStartOfLine;
},{"./EditorState":37,"./expandRangeToStartOfLine":199,"./getDraftEditorSelectionWithNodes":200,"./moveSelectionBackward":201,"./removeTextWithStrategy":202}],206:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * @stub
 * 
 */

'use strict';

// \u00a1-\u00b1\u00b4-\u00b8\u00ba\u00bb\u00bf
//             is latin supplement punctuation except fractions and superscript
//             numbers
// \u2010-\u2027\u2030-\u205e
//             is punctuation from the general punctuation block:
//             weird quotes, commas, bullets, dashes, etc.
// \u30fb\u3001\u3002\u3008-\u3011\u3014-\u301f
//             is CJK punctuation
// \uff1a-\uff1f\uff01-\uff0f\uff3b-\uff40\uff5b-\uff65
//             is some full-width/half-width punctuation
// \u2E2E\u061f\u066a-\u066c\u061b\u060c\u060d\uFD3e\uFD3F
//             is some Arabic punctuation marks
// \u1801\u0964\u104a\u104b
//             is misc. other language punctuation marks

var PUNCTUATION = '[.,+*?$|#{}()\'\\^\\-\\[\\]\\\\\\/!@%"~=<>_:;' + '\u30FB\u3001\u3002\u3008-\u3011\u3014-\u301F\uFF1A-\uFF1F\uFF01-\uFF0F' + '\uFF3B-\uFF40\uFF5B-\uFF65\u2E2E\u061F\u066A-\u066C\u061B\u060C\u060D' + '\uFD3E\uFD3F\u1801\u0964\u104A\u104B\u2010-\u2027\u2030-\u205E' + '\xA1-\xB1\xB4-\xB8\xBA\xBB\xBF]';

module.exports = {
  getPunctuation: function getPunctuation() {
    return PUNCTUATION;
  }
};
},{}],203:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftRemovableWord
 * @format
 * 
 */

'use strict';

var TokenizeUtil = require('fbjs/lib/TokenizeUtil');

var punctuation = TokenizeUtil.getPunctuation();

// The apostrophe and curly single quotes behave in a curious way: when
// surrounded on both sides by word characters, they behave as word chars; when
// either neighbor is punctuation or an end of the string, they behave as
// punctuation.
var CHAMELEON_CHARS = '[\'\u2018\u2019]';

// Remove the underscore, which should count as part of the removable word. The
// "chameleon chars" also count as punctuation in this regex.
var WHITESPACE_AND_PUNCTUATION = '\\s|(?![_])' + punctuation;

var DELETE_STRING = '^' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)';
var DELETE_REGEX = new RegExp(DELETE_STRING);

var BACKSPACE_STRING = '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '$';
var BACKSPACE_REGEX = new RegExp(BACKSPACE_STRING);

function getRemovableWord(text, isBackward) {
  var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
  return matches ? matches[0] : text;
}

var DraftRemovableWord = {
  getBackward: function getBackward(text) {
    return getRemovableWord(text, true);
  },

  getForward: function getForward(text) {
    return getRemovableWord(text, false);
  }
};

module.exports = DraftRemovableWord;
},{"fbjs/lib/TokenizeUtil":206}],182:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandBackspaceWord
 * @format
 * 
 */

'use strict';

var DraftRemovableWord = require('./DraftRemovableWord');
var EditorState = require('./EditorState');

var moveSelectionBackward = require('./moveSelectionBackward');
var removeTextWithStrategy = require('./removeTextWithStrategy');

/**
 * Delete the word that is left of the cursor, as well as any spaces or
 * punctuation after the word.
 */
function keyCommandBackspaceWord(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    // If there are no words before the cursor, remove the preceding newline.
    if (offset === 0) {
      return moveSelectionBackward(strategyState, 1);
    }
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(0, offset);
    var toRemove = DraftRemovableWord.getBackward(text);
    return moveSelectionBackward(strategyState, toRemove.length || 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandBackspaceWord;
},{"./DraftRemovableWord":203,"./EditorState":37,"./moveSelectionBackward":201,"./removeTextWithStrategy":202}],204:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule moveSelectionForward
 * @format
 * 
 */

'use strict';

/**
 * Given a collapsed selection, move the focus `maxDistance` forward within
 * the selected block. If the selection will go beyond the end of the block,
 * move focus to the start of the next block, but no further.
 *
 * This function is not Unicode-aware, so surrogate pairs will be treated
 * as having length 2.
 */
function moveSelectionForward(editorState, maxDistance) {
  var selection = editorState.getSelection();
  var key = selection.getStartKey();
  var offset = selection.getStartOffset();
  var content = editorState.getCurrentContent();

  var focusKey = key;
  var focusOffset;

  var block = content.getBlockForKey(key);

  if (maxDistance > block.getText().length - offset) {
    focusKey = content.getKeyAfter(key);
    focusOffset = 0;
  } else {
    focusOffset = offset + maxDistance;
  }

  return selection.merge({ focusKey: focusKey, focusOffset: focusOffset });
}

module.exports = moveSelectionForward;
},{}],183:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandDeleteWord
 * @format
 * 
 */

'use strict';

var DraftRemovableWord = require('./DraftRemovableWord');
var EditorState = require('./EditorState');

var moveSelectionForward = require('./moveSelectionForward');
var removeTextWithStrategy = require('./removeTextWithStrategy');

/**
 * Delete the word that is right of the cursor, as well as any spaces or
 * punctuation before the word.
 */
function keyCommandDeleteWord(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var offset = selection.getStartOffset();
    var key = selection.getStartKey();
    var content = strategyState.getCurrentContent();
    var text = content.getBlockForKey(key).getText().slice(offset);
    var toRemove = DraftRemovableWord.getForward(text);

    // If there are no words in front of the cursor, remove the newline.
    return moveSelectionForward(strategyState, toRemove.length || 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  return EditorState.push(editorState, afterRemoval, 'remove-range');
}

module.exports = keyCommandDeleteWord;
},{"./DraftRemovableWord":203,"./EditorState":37,"./moveSelectionForward":204,"./removeTextWithStrategy":202}],184:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandInsertNewline
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');

function keyCommandInsertNewline(editorState) {
  var contentState = DraftModifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
  return EditorState.push(editorState, contentState, 'split-block');
}

module.exports = keyCommandInsertNewline;
},{"./DraftModifier":35,"./EditorState":37}],185:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandMoveSelectionToEndOfBlock
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

/**
 * See comment for `moveSelectionToStartOfBlock`.
 */
function keyCommandMoveSelectionToEndOfBlock(editorState) {
  var selection = editorState.getSelection();
  var endKey = selection.getEndKey();
  var content = editorState.getCurrentContent();
  var textLength = content.getBlockForKey(endKey).getLength();
  return EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: endKey,
      anchorOffset: textLength,
      focusKey: endKey,
      focusOffset: textLength,
      isBackward: false
    }),
    forceSelection: true
  });
}

module.exports = keyCommandMoveSelectionToEndOfBlock;
},{"./EditorState":37}],186:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandMoveSelectionToStartOfBlock
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

/**
 * Collapse selection at the start of the first selected block. This is used
 * for Firefox versions that attempt to navigate forward/backward instead of
 * moving the cursor. Other browsers are able to move the cursor natively.
 */
function keyCommandMoveSelectionToStartOfBlock(editorState) {
  var selection = editorState.getSelection();
  var startKey = selection.getStartKey();
  return EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: startKey,
      anchorOffset: 0,
      focusKey: startKey,
      focusOffset: 0,
      isBackward: false
    }),
    forceSelection: true
  });
}

module.exports = keyCommandMoveSelectionToStartOfBlock;
},{"./EditorState":37}],187:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandPlainBackspace
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');
var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var moveSelectionBackward = require('./moveSelectionBackward');
var removeTextWithStrategy = require('./removeTextWithStrategy');

/**
 * Remove the selected range. If the cursor is collapsed, remove the preceding
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainBackspace(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charBehind = content.getBlockForKey(key).getText()[offset - 1];
    return moveSelectionBackward(strategyState, charBehind ? UnicodeUtils.getUTF16Length(charBehind, 0) : 1);
  }, 'backward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();
  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'backspace-character' : 'remove-range');
}

module.exports = keyCommandPlainBackspace;
},{"./EditorState":37,"fbjs/lib/UnicodeUtils":144,"./moveSelectionBackward":201,"./removeTextWithStrategy":202}],188:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandPlainDelete
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');
var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var moveSelectionForward = require('./moveSelectionForward');
var removeTextWithStrategy = require('./removeTextWithStrategy');

/**
 * Remove the selected range. If the cursor is collapsed, remove the following
 * character. This operation is Unicode-aware, so removing a single character
 * will remove a surrogate pair properly as well.
 */
function keyCommandPlainDelete(editorState) {
  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
    var selection = strategyState.getSelection();
    var content = strategyState.getCurrentContent();
    var key = selection.getAnchorKey();
    var offset = selection.getAnchorOffset();
    var charAhead = content.getBlockForKey(key).getText()[offset];
    return moveSelectionForward(strategyState, charAhead ? UnicodeUtils.getUTF16Length(charAhead, 0) : 1);
  }, 'forward');

  if (afterRemoval === editorState.getCurrentContent()) {
    return editorState;
  }

  var selection = editorState.getSelection();

  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'delete-character' : 'remove-range');
}

module.exports = keyCommandPlainDelete;
},{"./EditorState":37,"fbjs/lib/UnicodeUtils":144,"./moveSelectionForward":204,"./removeTextWithStrategy":202}],189:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandTransposeCharacters
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');

var getContentStateFragment = require('./getContentStateFragment');

/**
 * Transpose the characters on either side of a collapsed cursor, or
 * if the cursor is at the end of the block, transpose the last two
 * characters.
 */
function keyCommandTransposeCharacters(editorState) {
  var selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return editorState;
  }

  var offset = selection.getAnchorOffset();
  if (offset === 0) {
    return editorState;
  }

  var blockKey = selection.getAnchorKey();
  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var length = block.getLength();

  // Nothing to transpose if there aren't two characters.
  if (length <= 1) {
    return editorState;
  }

  var removalRange;
  var finalSelection;

  if (offset === length) {
    // The cursor is at the end of the block. Swap the last two characters.
    removalRange = selection.set('anchorOffset', offset - 1);
    finalSelection = selection;
  } else {
    removalRange = selection.set('focusOffset', offset + 1);
    finalSelection = removalRange.set('anchorOffset', offset + 1);
  }

  // Extract the character to move as a fragment. This preserves its
  // styling and entity, if any.
  var movedFragment = getContentStateFragment(content, removalRange);
  var afterRemoval = DraftModifier.removeRange(content, removalRange, 'backward');

  // After the removal, the insertion target is one character back.
  var selectionAfter = afterRemoval.getSelectionAfter();
  var targetOffset = selectionAfter.getAnchorOffset() - 1;
  var targetRange = selectionAfter.merge({
    anchorOffset: targetOffset,
    focusOffset: targetOffset
  });

  var afterInsert = DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);

  var newEditorState = EditorState.push(editorState, afterInsert, 'insert-fragment');

  return EditorState.acceptSelection(newEditorState, finalSelection);
}

module.exports = keyCommandTransposeCharacters;
},{"./DraftModifier":35,"./EditorState":37,"./getContentStateFragment":95}],190:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyCommandUndo
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');

function keyCommandUndo(e, editorState, updateFn) {
  var undoneState = EditorState.undo(editorState);

  // If the last change to occur was a spellcheck change, allow the undo
  // event to fall through to the browser. This allows the browser to record
  // the unwanted change, which should soon lead it to learn not to suggest
  // the correction again.
  if (editorState.getLastChangeType() === 'spellcheck-change') {
    var nativelyRenderedContent = undoneState.getCurrentContent();
    updateFn(EditorState.set(undoneState, { nativelyRenderedContent: nativelyRenderedContent }));
    return;
  }

  // Otheriwse, manage the undo behavior manually.
  e.preventDefault();
  if (!editorState.getNativelyRenderedContent()) {
    updateFn(undoneState);
    return;
  }

  // Trigger a re-render with the current content state to ensure that the
  // component tree has up-to-date props for comparison.
  updateFn(EditorState.set(editorState, { nativelyRenderedContent: null }));

  // Wait to ensure that the re-render has occurred before performing
  // the undo action.
  setTimeout(function () {
    updateFn(undoneState);
  }, 0);
}

module.exports = keyCommandUndo;
},{"./EditorState":37}],161:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnKeyDown
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var KeyBindingUtil = require('./KeyBindingUtil');
var Keys = require('fbjs/lib/Keys');
var SecondaryClipboard = require('./SecondaryClipboard');
var UserAgent = require('fbjs/lib/UserAgent');

var isEventHandled = require('./isEventHandled');
var keyCommandBackspaceToStartOfLine = require('./keyCommandBackspaceToStartOfLine');
var keyCommandBackspaceWord = require('./keyCommandBackspaceWord');
var keyCommandDeleteWord = require('./keyCommandDeleteWord');
var keyCommandInsertNewline = require('./keyCommandInsertNewline');
var keyCommandMoveSelectionToEndOfBlock = require('./keyCommandMoveSelectionToEndOfBlock');
var keyCommandMoveSelectionToStartOfBlock = require('./keyCommandMoveSelectionToStartOfBlock');
var keyCommandPlainBackspace = require('./keyCommandPlainBackspace');
var keyCommandPlainDelete = require('./keyCommandPlainDelete');
var keyCommandTransposeCharacters = require('./keyCommandTransposeCharacters');
var keyCommandUndo = require('./keyCommandUndo');

var isOptionKeyCommand = KeyBindingUtil.isOptionKeyCommand;

var isChrome = UserAgent.isBrowser('Chrome');

/**
 * Map a `DraftEditorCommand` command value to a corresponding function.
 */
function onKeyCommand(command, editorState) {
  switch (command) {
    case 'redo':
      return EditorState.redo(editorState);
    case 'delete':
      return keyCommandPlainDelete(editorState);
    case 'delete-word':
      return keyCommandDeleteWord(editorState);
    case 'backspace':
      return keyCommandPlainBackspace(editorState);
    case 'backspace-word':
      return keyCommandBackspaceWord(editorState);
    case 'backspace-to-start-of-line':
      return keyCommandBackspaceToStartOfLine(editorState);
    case 'split-block':
      return keyCommandInsertNewline(editorState);
    case 'transpose-characters':
      return keyCommandTransposeCharacters(editorState);
    case 'move-selection-to-start-of-block':
      return keyCommandMoveSelectionToStartOfBlock(editorState);
    case 'move-selection-to-end-of-block':
      return keyCommandMoveSelectionToEndOfBlock(editorState);
    case 'secondary-cut':
      return SecondaryClipboard.cut(editorState);
    case 'secondary-paste':
      return SecondaryClipboard.paste(editorState);
    default:
      return editorState;
  }
}

/**
 * Intercept keydown behavior to handle keys and commands manually, if desired.
 *
 * Keydown combinations may be mapped to `DraftCommand` values, which may
 * correspond to command functions that modify the editor or its contents.
 *
 * See `getDefaultKeyBinding` for defaults. Alternatively, the top-level
 * component may provide a custom mapping via the `keyBindingFn` prop.
 */
function editOnKeyDown(editor, e) {
  var keyCode = e.which;
  var editorState = editor._latestEditorState;

  switch (keyCode) {
    case Keys.RETURN:
      e.preventDefault();
      // The top-level component may manually handle newline insertion. If
      // no special handling is performed, fall through to command handling.
      if (editor.props.handleReturn && isEventHandled(editor.props.handleReturn(e, editorState))) {
        return;
      }
      break;
    case Keys.ESC:
      e.preventDefault();
      editor.props.onEscape && editor.props.onEscape(e);
      return;
    case Keys.TAB:
      editor.props.onTab && editor.props.onTab(e);
      return;
    case Keys.UP:
      editor.props.onUpArrow && editor.props.onUpArrow(e);
      return;
    case Keys.RIGHT:
      editor.props.onRightArrow && editor.props.onRightArrow(e);
      return;
    case Keys.DOWN:
      editor.props.onDownArrow && editor.props.onDownArrow(e);
      return;
    case Keys.LEFT:
      editor.props.onLeftArrow && editor.props.onLeftArrow(e);
      return;
    case Keys.SPACE:
      // Handling for OSX where option + space scrolls.
      if (isChrome && isOptionKeyCommand(e)) {
        e.preventDefault();
        // Insert a nbsp into the editor.
        var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), '\xA0');
        editor.update(EditorState.push(editorState, contentState, 'insert-characters'));
        return;
      }
  }

  var command = editor.props.keyBindingFn(e);

  // If no command is specified, allow keydown event to continue.
  if (!command) {
    return;
  }

  if (command === 'undo') {
    // Since undo requires some special updating behavior to keep the editor
    // in sync, handle it separately.
    keyCommandUndo(e, editorState, editor.update);
    return;
  }

  // At this point, we know that we're handling a command of some kind, so
  // we don't want to insert a character following the keydown.
  e.preventDefault();

  // Allow components higher up the tree to handle the command first.
  if (editor.props.handleKeyCommand && isEventHandled(editor.props.handleKeyCommand(command, editorState))) {
    return;
  }

  var newState = onKeyCommand(command, editorState);
  if (newState !== editorState) {
    editor.update(newState);
  }
}

module.exports = editOnKeyDown;
},{"./DraftModifier":35,"./EditorState":37,"./KeyBindingUtil":38,"fbjs/lib/Keys":123,"./SecondaryClipboard":180,"fbjs/lib/UserAgent":119,"./isEventHandled":150,"./keyCommandBackspaceToStartOfLine":181,"./keyCommandBackspaceWord":182,"./keyCommandDeleteWord":183,"./keyCommandInsertNewline":184,"./keyCommandMoveSelectionToEndOfBlock":185,"./keyCommandMoveSelectionToStartOfBlock":186,"./keyCommandPlainBackspace":187,"./keyCommandPlainDelete":188,"./keyCommandTransposeCharacters":189,"./keyCommandUndo":190}],133:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URI = function () {
  function URI(uri) {
    _classCallCheck(this, URI);

    this._uri = uri;
  }

  URI.prototype.toString = function toString() {
    return this._uri;
  };

  return URI;
}();

module.exports = URI;
},{}],122:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getSafeBodyFromHTML
 * @format
 * 
 */

'use strict';

var UserAgent = require('fbjs/lib/UserAgent');

var invariant = require('fbjs/lib/invariant');

var isOldIE = UserAgent.isBrowser('IE <= 9');

// Provides a dom node that will not execute scripts
// https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation.createHTMLDocument
// https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM

function getSafeBodyFromHTML(html) {
  var doc;
  var root = null;
  // Provides a safe context
  if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
    doc = document.implementation.createHTMLDocument('foo');
    !doc.documentElement ? 'production' !== 'production' ? invariant(false, 'Missing doc.documentElement') : invariant(false) : void 0;
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
}

module.exports = getSafeBodyFromHTML;
},{"fbjs/lib/UserAgent":119,"fbjs/lib/invariant":79}],42:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromHTMLToContentBlocks
 * @format
 * 
 */

'use strict';

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _knownListItemDepthCl,
    _assign = require('object-assign');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var CharacterMetadata = require('./CharacterMetadata');
var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var DefaultDraftBlockRenderMap = require('./DefaultDraftBlockRenderMap');
var DraftEntity = require('./DraftEntity');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var Immutable = require('immutable');

var _require = require('immutable'),
    Set = _require.Set;

var URI = require('fbjs/lib/URI');

var cx = require('fbjs/lib/cx');
var generateRandomKey = require('./generateRandomKey');
var getSafeBodyFromHTML = require('./getSafeBodyFromHTML');
var invariant = require('fbjs/lib/invariant');
var sanitizeDraftText = require('./sanitizeDraftText');

var experimentalTreeDataSupport = DraftFeatureFlags.draft_tree_data_support;

var List = Immutable.List,
    OrderedSet = Immutable.OrderedSet;

var NBSP = '&nbsp;';
var SPACE = ' ';

// Arbitrary max indent
var MAX_DEPTH = 4;

// used for replacing characters in HTML
var REGEX_CR = new RegExp('\r', 'g');
var REGEX_LF = new RegExp('\n', 'g');
var REGEX_NBSP = new RegExp(NBSP, 'g');
var REGEX_CARRIAGE = new RegExp('&#13;?', 'g');
var REGEX_ZWS = new RegExp('&#8203;?', 'g');

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
var boldValues = ['bold', 'bolder', '500', '600', '700', '800', '900'];
var notBoldValues = ['light', 'lighter', '100', '200', '300', '400'];

// Block tag flow is different because LIs do not have
// a deterministic style ;_;
var inlineTags = {
  b: 'BOLD',
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  i: 'ITALIC',
  s: 'STRIKETHROUGH',
  strike: 'STRIKETHROUGH',
  strong: 'BOLD',
  u: 'UNDERLINE'
};

var knownListItemDepthClasses = (_knownListItemDepthCl = {}, _defineProperty(_knownListItemDepthCl, cx('public/DraftStyleDefault/depth0'), 0), _defineProperty(_knownListItemDepthCl, cx('public/DraftStyleDefault/depth1'), 1), _defineProperty(_knownListItemDepthCl, cx('public/DraftStyleDefault/depth2'), 2), _defineProperty(_knownListItemDepthCl, cx('public/DraftStyleDefault/depth3'), 3), _defineProperty(_knownListItemDepthCl, cx('public/DraftStyleDefault/depth4'), 4), _knownListItemDepthCl);

var anchorAttr = ['className', 'href', 'rel', 'target', 'title'];

var imgAttr = ['alt', 'className', 'height', 'src', 'width'];

var lastBlock = void 0;

var EMPTY_CHUNK = {
  text: '',
  inlines: [],
  entities: [],
  blocks: []
};

var EMPTY_BLOCK = {
  children: List(),
  depth: 0,
  key: '',
  type: ''
};

var getListBlockType = function getListBlockType(tag, lastList) {
  if (tag === 'li') {
    return lastList === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
  }
  return null;
};

var getBlockMapSupportedTags = function getBlockMapSupportedTags(blockRenderMap) {
  var unstyledElement = blockRenderMap.get('unstyled').element;
  var tags = Set([]);

  blockRenderMap.forEach(function (draftBlock) {
    if (draftBlock.aliasedElements) {
      draftBlock.aliasedElements.forEach(function (tag) {
        tags = tags.add(tag);
      });
    }

    tags = tags.add(draftBlock.element);
  });

  return tags.filter(function (tag) {
    return tag && tag !== unstyledElement;
  }).toArray().sort();
};

// custom element conversions
var getMultiMatchedType = function getMultiMatchedType(tag, lastList, multiMatchExtractor) {
  for (var ii = 0; ii < multiMatchExtractor.length; ii++) {
    var matchType = multiMatchExtractor[ii](tag, lastList);
    if (matchType) {
      return matchType;
    }
  }
  return null;
};

var getBlockTypeForTag = function getBlockTypeForTag(tag, lastList, blockRenderMap) {
  var matchedTypes = blockRenderMap.filter(function (draftBlock) {
    return draftBlock.element === tag || draftBlock.wrapper === tag || draftBlock.aliasedElements && draftBlock.aliasedElements.some(function (alias) {
      return alias === tag;
    });
  }).keySeq().toSet().toArray().sort();

  // if we dont have any matched type, return unstyled
  // if we have one matched type return it
  // if we have multi matched types use the multi-match function to gather type
  switch (matchedTypes.length) {
    case 0:
      return 'unstyled';
    case 1:
      return matchedTypes[0];
    default:
      return getMultiMatchedType(tag, lastList, [getListBlockType]) || 'unstyled';
  }
};

var processInlineTag = function processInlineTag(tag, node, currentStyle) {
  var styleToCheck = inlineTags[tag];
  if (styleToCheck) {
    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    var htmlElement = node;
    currentStyle = currentStyle.withMutations(function (style) {
      var fontWeight = htmlElement.style.fontWeight;
      var fontStyle = htmlElement.style.fontStyle;
      var textDecoration = htmlElement.style.textDecoration;

      if (boldValues.indexOf(fontWeight) >= 0) {
        style.add('BOLD');
      } else if (notBoldValues.indexOf(fontWeight) >= 0) {
        style.remove('BOLD');
      }

      if (fontStyle === 'italic') {
        style.add('ITALIC');
      } else if (fontStyle === 'normal') {
        style.remove('ITALIC');
      }

      if (textDecoration === 'underline') {
        style.add('UNDERLINE');
      }
      if (textDecoration === 'line-through') {
        style.add('STRIKETHROUGH');
      }
      if (textDecoration === 'none') {
        style.remove('UNDERLINE');
        style.remove('STRIKETHROUGH');
      }
    }).toOrderedSet();
  }
  return currentStyle;
};

var joinChunks = function joinChunks(A, B, experimentalHasNestedBlocks) {
  // Sometimes two blocks will touch in the DOM and we need to strip the
  // extra delimiter to preserve niceness.
  var lastInA = A.text.slice(-1);
  var firstInB = B.text.slice(0, 1);

  if (lastInA === '\r' && firstInB === '\r' && !experimentalHasNestedBlocks) {
    A.text = A.text.slice(0, -1);
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  // Kill whitespace after blocks
  if (lastInA === '\r') {
    if (B.text === SPACE || B.text === '\n') {
      return A;
    } else if (firstInB === SPACE || firstInB === '\n') {
      B.text = B.text.slice(1);
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
};

/**
 * Check to see if we have anything like <p> <blockquote> <h1>... to create
 * block tags from. If we do, we can use those and ignore <div> tags. If we
 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
 */
var containsSemanticBlockMarkup = function containsSemanticBlockMarkup(html, blockTags) {
  return blockTags.some(function (tag) {
    return html.indexOf('<' + tag) !== -1;
  });
};

var hasValidLinkText = function hasValidLinkText(link) {
  !(link instanceof HTMLAnchorElement) ? 'production' !== 'production' ? invariant(false, 'Link must be an HTMLAnchorElement.') : invariant(false) : void 0;
  var protocol = link.protocol;
  return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
};

var getWhitespaceChunk = function getWhitespaceChunk(inEntity) {
  var entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return _extends({}, EMPTY_CHUNK, {
    text: SPACE,
    inlines: [OrderedSet()],
    entities: entities
  });
};

var getSoftNewlineChunk = function getSoftNewlineChunk() {
  return _extends({}, EMPTY_CHUNK, {
    text: '\n',
    inlines: [OrderedSet()],
    entities: new Array(1)
  });
};

var getChunkedBlock = function getChunkedBlock() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends({}, EMPTY_BLOCK, props);
};

var getBlockDividerChunk = function getBlockDividerChunk(block, depth) {
  var parentKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return {
    text: '\r',
    inlines: [OrderedSet()],
    entities: new Array(1),
    blocks: [getChunkedBlock({
      parent: parentKey,
      key: generateRandomKey(),
      type: block,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
    })]
  };
};

/**
 *  If we're pasting from one DraftEditor to another we can check to see if
 *  existing list item depth classes are being used and preserve this style
 */
var getListItemDepth = function getListItemDepth(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  Object.keys(knownListItemDepthClasses).some(function (depthClass) {
    if (node.classList.contains(depthClass)) {
      depth = knownListItemDepthClasses[depthClass];
    }
  });
  return depth;
};

var genFragment = function genFragment(entityMap, node, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, inEntity, parentKey) {
  var lastLastBlock = lastBlock;
  var nodeName = node.nodeName.toLowerCase();
  var newEntityMap = entityMap;
  var nextBlockType = 'unstyled';
  var newBlock = false;
  var inBlockType = inBlock && getBlockTypeForTag(inBlock, lastList, blockRenderMap);
  var chunk = _extends({}, EMPTY_CHUNK);
  var newChunk = null;
  var blockKey = void 0;

  // Base Case
  if (nodeName === '#text') {
    var _text = node.textContent;
    var nodeTextContent = _text.trim();

    // We should not create blocks for leading spaces that are
    // existing around ol/ul and their children list items
    if (lastList && nodeTextContent === '' && node.parentElement) {
      var parentNodeName = node.parentElement.nodeName.toLowerCase();
      if (parentNodeName === 'ol' || parentNodeName === 'ul') {
        return { chunk: _extends({}, EMPTY_CHUNK), entityMap: entityMap };
      }
    }

    if (nodeTextContent === '' && inBlock !== 'pre') {
      return { chunk: getWhitespaceChunk(inEntity), entityMap: entityMap };
    }
    if (inBlock !== 'pre') {
      // Can't use empty string because MSWord
      _text = _text.replace(REGEX_LF, SPACE);
    }

    // save the last block so we can use it later
    lastBlock = nodeName;

    return {
      chunk: {
        text: _text,
        inlines: Array(_text.length).fill(inlineStyle),
        entities: Array(_text.length).fill(inEntity),
        blocks: []
      },
      entityMap: entityMap
    };
  }

  // save the last block so we can use it later
  lastBlock = nodeName;

  // BR tags
  if (nodeName === 'br') {
    if (lastLastBlock === 'br' && (!inBlock || inBlockType === 'unstyled')) {
      return {
        chunk: getBlockDividerChunk('unstyled', depth, parentKey),
        entityMap: entityMap
      };
    }
    return { chunk: getSoftNewlineChunk(), entityMap: entityMap };
  }

  // IMG tags
  if (nodeName === 'img' && node instanceof HTMLImageElement && node.attributes.getNamedItem('src') && node.attributes.getNamedItem('src').value) {
    var image = node;
    var entityConfig = {};

    imgAttr.forEach(function (attr) {
      var imageAttribute = image.getAttribute(attr);
      if (imageAttribute) {
        entityConfig[attr] = imageAttribute;
      }
    });
    // Forcing this node to have children because otherwise no entity will be
    // created for this node.
    // The child text node cannot just have a space or return as content -
    // we strip those out.
    // See https://github.com/facebook/draft-js/issues/231 for some context.
    node.textContent = '\uD83D\uDCF7';

    // TODO: update this when we remove DraftEntity entirely
    inEntity = DraftEntity.__create('IMAGE', 'MUTABLE', entityConfig || {});
  }

  // Inline tags
  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  // Handle lists
  if (nodeName === 'ul' || nodeName === 'ol') {
    if (lastList) {
      depth += 1;
    }
    lastList = nodeName;
  }

  if (!experimentalTreeDataSupport && nodeName === 'li' && node instanceof HTMLElement) {
    depth = getListItemDepth(node, depth);
  }

  var blockType = getBlockTypeForTag(nodeName, lastList, blockRenderMap);
  var inListBlock = lastList && inBlock === 'li' && nodeName === 'li';
  var inBlockOrHasNestedBlocks = (!inBlock || experimentalTreeDataSupport) && blockTags.indexOf(nodeName) !== -1;

  // Block Tags
  if (inListBlock || inBlockOrHasNestedBlocks) {
    chunk = getBlockDividerChunk(blockType, depth, parentKey);
    blockKey = chunk.blocks[0].key;
    inBlock = nodeName;
    newBlock = !experimentalTreeDataSupport;
  }

  // this is required so that we can handle 'ul' and 'ol'
  if (inListBlock) {
    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
  }

  // Recurse through children
  var child = node.firstChild;
  if (child != null) {
    nodeName = child.nodeName.toLowerCase();
  }

  var entityId = null;

  while (child) {
    if (child instanceof HTMLAnchorElement && child.href && hasValidLinkText(child)) {
      (function () {
        var anchor = child;
        var entityConfig = {};

        anchorAttr.forEach(function (attr) {
          var anchorAttribute = anchor.getAttribute(attr);
          if (anchorAttribute) {
            entityConfig[attr] = anchorAttribute;
          }
        });

        entityConfig.url = new URI(anchor.href).toString();
        // TODO: update this when we remove DraftEntity completely
        entityId = DraftEntity.__create('LINK', 'MUTABLE', entityConfig || {});
      })();
    } else {
      entityId = undefined;
    }

    var _genFragment = genFragment(newEntityMap, child, inlineStyle, lastList, inBlock, blockTags, depth, blockRenderMap, entityId || inEntity, experimentalTreeDataSupport ? blockKey : null),
        generatedChunk = _genFragment.chunk,
        maybeUpdatedEntityMap = _genFragment.entityMap;

    newChunk = generatedChunk;
    newEntityMap = maybeUpdatedEntityMap;

    chunk = joinChunks(chunk, newChunk, experimentalTreeDataSupport);
    var sibling = child.nextSibling;

    // Put in a newline to break up blocks inside blocks
    if (!parentKey && sibling && blockTags.indexOf(nodeName) >= 0 && inBlock) {
      chunk = joinChunks(chunk, getSoftNewlineChunk());
    }
    if (sibling) {
      nodeName = sibling.nodeName.toLowerCase();
    }
    child = sibling;
  }

  if (newBlock) {
    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth, parentKey));
  }

  return { chunk: chunk, entityMap: newEntityMap };
};

var getChunkForHTML = function getChunkForHTML(html, DOMBuilder, blockRenderMap, entityMap) {
  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE).replace(REGEX_CARRIAGE, '').replace(REGEX_ZWS, '');

  var supportedBlockTags = getBlockMapSupportedTags(blockRenderMap);

  var safeBody = DOMBuilder(html);
  if (!safeBody) {
    return null;
  }
  lastBlock = null;

  // Sometimes we aren't dealing with content that contains nice semantic
  // tags. In this case, use divs to separate everything out into paragraphs
  // and hope for the best.
  var workingBlocks = containsSemanticBlockMarkup(html, supportedBlockTags) ? supportedBlockTags : ['div'];

  // Start with -1 block depth to offset the fact that we are passing in a fake
  // UL block to start with.
  var fragment = genFragment(entityMap, safeBody, OrderedSet(), 'ul', null, workingBlocks, -1, blockRenderMap);

  var chunk = fragment.chunk;
  var newEntityMap = fragment.entityMap;

  // join with previous block to prevent weirdness on paste
  if (chunk.text.indexOf('\r') === 0) {
    chunk = {
      text: chunk.text.slice(1),
      inlines: chunk.inlines.slice(1),
      entities: chunk.entities.slice(1),
      blocks: chunk.blocks
    };
  }

  // Kill block delimiter at the end
  if (chunk.text.slice(-1) === '\r') {
    chunk.text = chunk.text.slice(0, -1);
    chunk.inlines = chunk.inlines.slice(0, -1);
    chunk.entities = chunk.entities.slice(0, -1);
    chunk.blocks.pop();
  }

  // If we saw no block tags, put an unstyled one in
  if (chunk.blocks.length === 0) {
    chunk.blocks.push(_extends({}, EMPTY_CHUNK, {
      type: 'unstyled',
      depth: 0
    }));
  }

  // Sometimes we start with text that isn't in a block, which is then
  // followed by blocks. Need to fix up the blocks to add in
  // an unstyled block for this content
  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
    chunk.blocks.unshift({ type: 'unstyled', depth: 0 });
  }

  return { chunk: chunk, entityMap: newEntityMap };
};

var convertChunkToContentBlocks = function convertChunkToContentBlocks(chunk) {
  if (!chunk || !chunk.text || !Array.isArray(chunk.blocks)) {
    return null;
  }

  var initialState = {
    cacheRef: {},
    contentBlocks: []
  };

  var start = 0;

  var rawBlocks = chunk.blocks,
      rawInlines = chunk.inlines,
      rawEntities = chunk.entities;

  var BlockNodeRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;

  return chunk.text.split('\r').reduce(function (acc, textBlock, index) {
    // Make absolutely certain that our text is acceptable.
    textBlock = sanitizeDraftText(textBlock);

    var block = rawBlocks[index];
    var end = start + textBlock.length;
    var inlines = rawInlines.slice(start, end);
    var entities = rawEntities.slice(start, end);
    var characterList = List(inlines.map(function (style, index) {
      var data = { style: style, entity: null };
      if (entities[index]) {
        data.entity = entities[index];
      }
      return CharacterMetadata.create(data);
    }));
    start = end + 1;

    var depth = block.depth,
        type = block.type,
        parent = block.parent;

    var key = block.key || generateRandomKey();
    var parentTextNodeKey = null; // will be used to store container text nodes

    // childrens add themselves to their parents since we are iterating in order
    if (parent) {
      var parentIndex = acc.cacheRef[parent];
      var parentRecord = acc.contentBlocks[parentIndex];

      // if parent has text we need to split it into a separate unstyled element
      if (parentRecord.getChildKeys().isEmpty() && parentRecord.getText()) {
        var parentCharacterList = parentRecord.getCharacterList();
        var parentText = parentRecord.getText();
        parentTextNodeKey = generateRandomKey();

        var textNode = new ContentBlockNode({
          key: parentTextNodeKey,
          text: parentText,
          characterList: parentCharacterList,
          parent: parent,
          nextSibling: key
        });

        acc.contentBlocks.push(textNode);

        parentRecord = parentRecord.withMutations(function (block) {
          block.set('characterList', List()).set('text', '').set('children', parentRecord.children.push(textNode.getKey()));
        });
      }

      acc.contentBlocks[parentIndex] = parentRecord.set('children', parentRecord.children.push(key));
    }

    var blockNode = new BlockNodeRecord({
      key: key,
      parent: parent,
      type: type,
      depth: depth,
      text: textBlock,
      characterList: characterList,
      prevSibling: parentTextNodeKey || (index === 0 || rawBlocks[index - 1].parent !== parent ? null : rawBlocks[index - 1].key),
      nextSibling: index === rawBlocks.length - 1 || rawBlocks[index + 1].parent !== parent ? null : rawBlocks[index + 1].key
    });

    // insert node
    acc.contentBlocks.push(blockNode);

    // cache ref for building links
    acc.cacheRef[blockNode.key] = index;

    return acc;
  }, initialState).contentBlocks;
};

var convertFromHTMLtoContentBlocks = function convertFromHTMLtoContentBlocks(html) {
  var DOMBuilder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getSafeBodyFromHTML;
  var blockRenderMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DefaultDraftBlockRenderMap;

  // Be ABSOLUTELY SURE that the dom builder you pass here won't execute
  // arbitrary code in whatever environment you're running this in. For an
  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

  // TODO: replace DraftEntity with an OrderedMap here
  var chunkData = getChunkForHTML(html, DOMBuilder, blockRenderMap, DraftEntity);

  if (chunkData == null) {
    return null;
  }

  var chunk = chunkData.chunk,
      entityMap = chunkData.entityMap;

  var contentBlocks = convertChunkToContentBlocks(chunk);

  return {
    contentBlocks: contentBlocks,
    entityMap: entityMap
  };
};

module.exports = convertFromHTMLtoContentBlocks;
},{"object-assign":82,"./CharacterMetadata":26,"./ContentBlock":28,"./ContentBlockNode":87,"./DefaultDraftBlockRenderMap":30,"./DraftEntity":34,"./DraftFeatureFlags":88,"immutable":132,"fbjs/lib/URI":133,"fbjs/lib/cx":113,"./generateRandomKey":44,"./getSafeBodyFromHTML":122,"fbjs/lib/invariant":79,"./sanitizeDraftText":91}],191:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftPasteProcessor
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var CharacterMetadata = require('./CharacterMetadata');
var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var Immutable = require('immutable');

var convertFromHTMLtoContentBlocks = require('./convertFromHTMLToContentBlocks');
var generateRandomKey = require('./generateRandomKey');
var getSafeBodyFromHTML = require('./getSafeBodyFromHTML');
var sanitizeDraftText = require('./sanitizeDraftText');

var List = Immutable.List,
    Repeat = Immutable.Repeat;


var experimentalTreeDataSupport = DraftFeatureFlags.draft_tree_data_support;
var ContentBlockRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;

var DraftPasteProcessor = {
  processHTML: function processHTML(html, blockRenderMap) {
    return convertFromHTMLtoContentBlocks(html, getSafeBodyFromHTML, blockRenderMap);
  },
  processText: function processText(textBlocks, character, type) {
    return textBlocks.reduce(function (acc, textLine, index) {
      textLine = sanitizeDraftText(textLine);
      var key = generateRandomKey();

      var blockNodeConfig = {
        key: key,
        type: type,
        text: textLine,
        characterList: List(Repeat(character, textLine.length))
      };

      // next block updates previous block
      if (experimentalTreeDataSupport && index !== 0) {
        var prevSiblingIndex = index - 1;
        // update previous block
        var previousBlock = acc[prevSiblingIndex] = acc[prevSiblingIndex].merge({
          nextSibling: key
        });
        blockNodeConfig = _extends({}, blockNodeConfig, {
          prevSibling: previousBlock.getKey()
        });
      }

      acc.push(new ContentBlockRecord(blockNodeConfig));

      return acc;
    }, []);
  }
};

module.exports = DraftPasteProcessor;
},{"object-assign":82,"./CharacterMetadata":26,"./ContentBlock":28,"./ContentBlockNode":87,"./DraftFeatureFlags":88,"immutable":132,"./convertFromHTMLToContentBlocks":42,"./generateRandomKey":44,"./getSafeBodyFromHTML":122,"./sanitizeDraftText":91}],108:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule adjustBlockDepthForContentState
 * @format
 * 
 */

'use strict';

function adjustBlockDepthForContentState(contentState, selectionState, adjustment, maxDepth) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var blocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat([[endKey, blockMap.get(endKey)]]).map(function (block) {
    var depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  });

  blockMap = blockMap.merge(blocks);

  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}

module.exports = adjustBlockDepthForContentState;
},{}],39:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RichTextEditorUtil
 * @format
 * 
 */

'use strict';

var DraftModifier = require('./DraftModifier');
var EditorState = require('./EditorState');
var SelectionState = require('./SelectionState');

var adjustBlockDepthForContentState = require('./adjustBlockDepthForContentState');
var nullthrows = require('fbjs/lib/nullthrows');

var RichTextEditorUtil = {
  currentBlockContainsLink: function currentBlockContainsLink(editorState) {
    var selection = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var entityMap = contentState.getEntityMap();
    return contentState.getBlockForKey(selection.getAnchorKey()).getCharacterList().slice(selection.getStartOffset(), selection.getEndOffset()).some(function (v) {
      var entity = v.getEntity();
      return !!entity && entityMap.__get(entity).getType() === 'LINK';
    });
  },

  getCurrentBlockType: function getCurrentBlockType(editorState) {
    var selection = editorState.getSelection();
    return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  },

  getDataObjectForLinkURL: function getDataObjectForLinkURL(uri) {
    return { url: uri.toString() };
  },

  handleKeyCommand: function handleKeyCommand(editorState, command) {
    switch (command) {
      case 'bold':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'BOLD');
      case 'italic':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'ITALIC');
      case 'underline':
        return RichTextEditorUtil.toggleInlineStyle(editorState, 'UNDERLINE');
      case 'code':
        return RichTextEditorUtil.toggleCode(editorState);
      case 'backspace':
      case 'backspace-word':
      case 'backspace-to-start-of-line':
        return RichTextEditorUtil.onBackspace(editorState);
      case 'delete':
      case 'delete-word':
      case 'delete-to-end-of-block':
        return RichTextEditorUtil.onDelete(editorState);
      default:
        // they may have custom editor commands; ignore those
        return null;
    }
  },

  insertSoftNewline: function insertSoftNewline(editorState) {
    var contentState = DraftModifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), '\n', editorState.getCurrentInlineStyle(), null);

    var newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    return EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());
  },

  /**
   * For collapsed selections at the start of styled blocks, backspace should
   * just remove the existing style.
   */
  onBackspace: function onBackspace(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
      return null;
    }

    // First, try to remove a preceding atomic block.
    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var blockBefore = content.getBlockBefore(startKey);

    if (blockBefore && blockBefore.getType() === 'atomic') {
      var blockMap = content.getBlockMap()['delete'](blockBefore.getKey());
      var withoutAtomicBlock = content.merge({
        blockMap: blockMap,
        selectionAfter: selection
      });
      if (withoutAtomicBlock !== content) {
        return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
      }
    }

    // If that doesn't succeed, try to remove the current block style.
    var withoutBlockStyle = RichTextEditorUtil.tryToRemoveBlockStyle(editorState);

    if (withoutBlockStyle) {
      return EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
    }

    return null;
  },

  onDelete: function onDelete(editorState) {
    var selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      return null;
    }

    var content = editorState.getCurrentContent();
    var startKey = selection.getStartKey();
    var block = content.getBlockForKey(startKey);
    var length = block.getLength();

    // The cursor is somewhere within the text. Behave normally.
    if (selection.getStartOffset() < length) {
      return null;
    }

    var blockAfter = content.getBlockAfter(startKey);

    if (!blockAfter || blockAfter.getType() !== 'atomic') {
      return null;
    }

    var atomicBlockTarget = selection.merge({
      focusKey: blockAfter.getKey(),
      focusOffset: blockAfter.getLength()
    });

    var withoutAtomicBlock = DraftModifier.removeRange(content, atomicBlockTarget, 'forward');

    if (withoutAtomicBlock !== content) {
      return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
    }

    return null;
  },

  onTab: function onTab(event, editorState, maxDepth) {
    var selection = editorState.getSelection();
    var key = selection.getAnchorKey();
    if (key !== selection.getFocusKey()) {
      return editorState;
    }

    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(key);
    var type = block.getType();
    if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
      return editorState;
    }

    event.preventDefault();

    // Only allow indenting one level beyond the block above, and only if
    // the block above is a list item as well.
    var blockAbove = content.getBlockBefore(key);
    if (!blockAbove) {
      return editorState;
    }

    var typeAbove = blockAbove.getType();
    if (typeAbove !== 'unordered-list-item' && typeAbove !== 'ordered-list-item') {
      return editorState;
    }

    var depth = block.getDepth();
    if (!event.shiftKey && depth === maxDepth) {
      return editorState;
    }

    maxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);

    var withAdjustment = adjustBlockDepthForContentState(content, selection, event.shiftKey ? -1 : 1, maxDepth);

    return EditorState.push(editorState, withAdjustment, 'adjust-depth');
  },

  toggleBlockType: function toggleBlockType(editorState, blockType) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var endKey = selection.getEndKey();
    var content = editorState.getCurrentContent();
    var target = selection;

    // Triple-click can lead to a selection that includes offset 0 of the
    // following block. The `SelectionState` for this case is accurate, but
    // we should avoid toggling block type for the trailing block because it
    // is a confusing interaction.
    if (startKey !== endKey && selection.getEndOffset() === 0) {
      var blockBefore = nullthrows(content.getBlockBefore(endKey));
      endKey = blockBefore.getKey();
      target = target.merge({
        anchorKey: startKey,
        anchorOffset: selection.getStartOffset(),
        focusKey: endKey,
        focusOffset: blockBefore.getLength(),
        isBackward: false
      });
    }

    var hasAtomicBlock = content.getBlockMap().skipWhile(function (_, k) {
      return k !== startKey;
    }).reverse().skipWhile(function (_, k) {
      return k !== endKey;
    }).some(function (v) {
      return v.getType() === 'atomic';
    });

    if (hasAtomicBlock) {
      return editorState;
    }

    var typeToSet = content.getBlockForKey(startKey).getType() === blockType ? 'unstyled' : blockType;

    return EditorState.push(editorState, DraftModifier.setBlockType(content, target, typeToSet), 'change-block-type');
  },

  toggleCode: function toggleCode(editorState) {
    var selection = editorState.getSelection();
    var anchorKey = selection.getAnchorKey();
    var focusKey = selection.getFocusKey();

    if (selection.isCollapsed() || anchorKey !== focusKey) {
      return RichTextEditorUtil.toggleBlockType(editorState, 'code-block');
    }

    return RichTextEditorUtil.toggleInlineStyle(editorState, 'CODE');
  },

  /**
   * Toggle the specified inline style for the selection. If the
   * user's selection is collapsed, apply or remove the style for the
   * internal state. If it is not collapsed, apply the change directly
   * to the document state.
   */
  toggleInlineStyle: function toggleInlineStyle(editorState, inlineStyle) {
    var selection = editorState.getSelection();
    var currentStyle = editorState.getCurrentInlineStyle();

    // If the selection is collapsed, toggle the specified style on or off and
    // set the result as the new inline style override. This will then be
    // used as the inline style for the next character to be inserted.
    if (selection.isCollapsed()) {
      return EditorState.setInlineStyleOverride(editorState, currentStyle.has(inlineStyle) ? currentStyle.remove(inlineStyle) : currentStyle.add(inlineStyle));
    }

    // If characters are selected, immediately apply or remove the
    // inline style on the document state itself.
    var content = editorState.getCurrentContent();
    var newContent;

    // If the style is already present for the selection range, remove it.
    // Otherwise, apply it.
    if (currentStyle.has(inlineStyle)) {
      newContent = DraftModifier.removeInlineStyle(content, selection, inlineStyle);
    } else {
      newContent = DraftModifier.applyInlineStyle(content, selection, inlineStyle);
    }

    return EditorState.push(editorState, newContent, 'change-inline-style');
  },

  toggleLink: function toggleLink(editorState, targetSelection, entityKey) {
    var withoutLink = DraftModifier.applyEntity(editorState.getCurrentContent(), targetSelection, entityKey);

    return EditorState.push(editorState, withoutLink, 'apply-entity');
  },

  /**
   * When a collapsed cursor is at the start of the first styled block, or
   * an empty styled block, changes block to 'unstyled'. Returns null if
   * block or selection does not meet that criteria.
   */
  tryToRemoveBlockStyle: function tryToRemoveBlockStyle(editorState) {
    var selection = editorState.getSelection();
    var offset = selection.getAnchorOffset();
    if (selection.isCollapsed() && offset === 0) {
      var key = selection.getAnchorKey();
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(key);

      var firstBlock = content.getFirstBlock();
      if (block.getLength() > 0 && block !== firstBlock) {
        return null;
      }

      var type = block.getType();
      var blockBefore = content.getBlockBefore(key);
      if (type === 'code-block' && blockBefore && blockBefore.getType() === 'code-block' && blockBefore.getLength() !== 0) {
        return null;
      }

      if (type !== 'unstyled') {
        return DraftModifier.setBlockType(content, selection, 'unstyled');
      }
    }
    return null;
  }
};

module.exports = RichTextEditorUtil;
},{"./DraftModifier":35,"./EditorState":37,"./SelectionState":40,"./adjustBlockDepthForContentState":108,"fbjs/lib/nullthrows":131}],192:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule splitTextIntoTextBlocks
 * @format
 * 
 */

'use strict';

var NEWLINE_REGEX = /\r\n?|\n/g;

function splitTextIntoTextBlocks(text) {
  return text.split(NEWLINE_REGEX);
}

module.exports = splitTextIntoTextBlocks;
},{}],162:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnPaste
 * @format
 * 
 */

'use strict';

var BlockMapBuilder = require('./BlockMapBuilder');
var CharacterMetadata = require('./CharacterMetadata');
var DataTransfer = require('fbjs/lib/DataTransfer');
var DraftModifier = require('./DraftModifier');
var DraftPasteProcessor = require('./DraftPasteProcessor');
var EditorState = require('./EditorState');
var RichTextEditorUtil = require('./RichTextEditorUtil');

var getEntityKeyForSelection = require('./getEntityKeyForSelection');
var getTextContentFromFiles = require('./getTextContentFromFiles');
var isEventHandled = require('./isEventHandled');
var splitTextIntoTextBlocks = require('./splitTextIntoTextBlocks');

/**
 * Paste content.
 */
function editOnPaste(editor, e) {
  e.preventDefault();
  var data = new DataTransfer(e.clipboardData);

  // Get files, unless this is likely to be a string the user wants inline.
  if (!data.isRichText()) {
    var files = data.getFiles();
    var defaultFileText = data.getText();
    if (files.length > 0) {
      // Allow customized paste handling for images, etc. Otherwise, fall
      // through to insert text contents into the editor.
      if (editor.props.handlePastedFiles && isEventHandled(editor.props.handlePastedFiles(files))) {
        return;
      }

      getTextContentFromFiles(files, function ( /*string*/fileText) {
        fileText = fileText || defaultFileText;
        if (!fileText) {
          return;
        }

        var editorState = editor._latestEditorState;
        var blocks = splitTextIntoTextBlocks(fileText);
        var character = CharacterMetadata.create({
          style: editorState.getCurrentInlineStyle(),
          entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
        });
        var currentBlockType = RichTextEditorUtil.getCurrentBlockType(editorState);

        var text = DraftPasteProcessor.processText(blocks, character, currentBlockType);
        var fragment = BlockMapBuilder.createFromArray(text);

        var withInsertedText = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);

        editor.update(EditorState.push(editorState, withInsertedText, 'insert-fragment'));
      });

      return;
    }
  }

  var textBlocks = [];
  var text = data.getText();
  var html = data.getHTML();
  var editorState = editor._latestEditorState;

  if (editor.props.handlePastedText && isEventHandled(editor.props.handlePastedText(text, html, editorState))) {
    return;
  }

  if (text) {
    textBlocks = splitTextIntoTextBlocks(text);
  }

  if (!editor.props.stripPastedStyles) {
    // If the text from the paste event is rich content that matches what we
    // already have on the internal clipboard, assume that we should just use
    // the clipboard fragment for the paste. This will allow us to preserve
    // styling and entities, if any are present. Note that newlines are
    // stripped during comparison -- this is because copy/paste within the
    // editor in Firefox and IE will not include empty lines. The resulting
    // paste will preserve the newlines correctly.
    var internalClipboard = editor.getClipboard();
    if (data.isRichText() && internalClipboard) {
      if (
      // If the editorKey is present in the pasted HTML, it should be safe to
      // assume this is an internal paste.
      html.indexOf(editor.getEditorKey()) !== -1 ||
      // The copy may have been made within a single block, in which case the
      // editor key won't be part of the paste. In this case, just check
      // whether the pasted text matches the internal clipboard.
      textBlocks.length === 1 && internalClipboard.size === 1 && internalClipboard.first().getText() === text) {
        editor.update(insertFragment(editor._latestEditorState, internalClipboard));
        return;
      }
    } else if (internalClipboard && data.types.includes('com.apple.webarchive') && !data.types.includes('text/html') && areTextBlocksAndClipboardEqual(textBlocks, internalClipboard)) {
      // Safari does not properly store text/html in some cases.
      // Use the internalClipboard if present and equal to what is on
      // the clipboard. See https://bugs.webkit.org/show_bug.cgi?id=19893.
      editor.update(insertFragment(editor._latestEditorState, internalClipboard));
      return;
    }

    // If there is html paste data, try to parse that.
    if (html) {
      var htmlFragment = DraftPasteProcessor.processHTML(html, editor.props.blockRenderMap);
      if (htmlFragment) {
        var contentBlocks = htmlFragment.contentBlocks,
            entityMap = htmlFragment.entityMap;

        if (contentBlocks) {
          var htmlMap = BlockMapBuilder.createFromArray(contentBlocks);
          editor.update(insertFragment(editor._latestEditorState, htmlMap, entityMap));
          return;
        }
      }
    }

    // Otherwise, create a new fragment from our pasted text. Also
    // empty the internal clipboard, since it's no longer valid.
    editor.setClipboard(null);
  }

  if (textBlocks.length) {
    var character = CharacterMetadata.create({
      style: editorState.getCurrentInlineStyle(),
      entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
    });

    var currentBlockType = RichTextEditorUtil.getCurrentBlockType(editorState);

    var textFragment = DraftPasteProcessor.processText(textBlocks, character, currentBlockType);

    var textMap = BlockMapBuilder.createFromArray(textFragment);
    editor.update(insertFragment(editor._latestEditorState, textMap));
  }
}

function insertFragment(editorState, fragment, entityMap) {
  var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
  // TODO: merge the entity map once we stop using DraftEntity
  // like this:
  // const mergedEntityMap = newContent.getEntityMap().merge(entityMap);

  return EditorState.push(editorState, newContent.set('entityMap', entityMap), 'insert-fragment');
}

function areTextBlocksAndClipboardEqual(textBlocks, blockMap) {
  return textBlocks.length === blockMap.size && blockMap.valueSeq().every(function (block, ii) {
    return block.getText() === textBlocks[ii];
  });
}

module.exports = editOnPaste;
},{"./BlockMapBuilder":25,"./CharacterMetadata":26,"fbjs/lib/DataTransfer":151,"./DraftModifier":35,"./DraftPasteProcessor":191,"./EditorState":37,"./RichTextEditorUtil":39,"./getEntityKeyForSelection":166,"./getTextContentFromFiles":148,"./isEventHandled":150,"./splitTextIntoTextBlocks":192}],193:[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDraftEditorSelection
 * @format
 * 
 */

'use strict';

var getDraftEditorSelectionWithNodes = require('./getDraftEditorSelectionWithNodes');

/**
 * Convert the current selection range to an anchor/focus pair of offset keys
 * and values that can be interpreted by components.
 */
function getDraftEditorSelection(editorState, root) {
  var selection = global.getSelection();

  // No active selection.
  if (selection.rangeCount === 0) {
    return {
      selectionState: editorState.getSelection().set('hasFocus', false),
      needsRecovery: false
    };
  }

  return getDraftEditorSelectionWithNodes(editorState, root, selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
}

module.exports = getDraftEditorSelection;
},{"./getDraftEditorSelectionWithNodes":200}],163:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule editOnSelect
 * @format
 * 
 */

'use strict';

var EditorState = require('./EditorState');
var ReactDOM = require('react-dom');

var getDraftEditorSelection = require('./getDraftEditorSelection');
var invariant = require('fbjs/lib/invariant');

function editOnSelect(editor) {
  if (editor._blockSelectEvents || editor._latestEditorState !== editor.props.editorState) {
    return;
  }

  var editorState = editor.props.editorState;
  var editorNode = ReactDOM.findDOMNode(editor.editorContainer);
  !editorNode ? 'production' !== 'production' ? invariant(false, 'Missing editorNode') : invariant(false) : void 0;
  !(editorNode.firstChild instanceof HTMLElement) ? 'production' !== 'production' ? invariant(false, 'editorNode.firstChild is not an HTMLElement') : invariant(false) : void 0;
  var documentSelection = getDraftEditorSelection(editorState, editorNode.firstChild);
  var updatedSelectionState = documentSelection.selectionState;

  if (updatedSelectionState !== editorState.getSelection()) {
    if (documentSelection.needsRecovery) {
      editorState = EditorState.forceSelection(editorState, updatedSelectionState);
    } else {
      editorState = EditorState.acceptSelection(editorState, updatedSelectionState);
    }
    editor.update(editorState);
  }
}

module.exports = editOnSelect;
},{"./EditorState":37,"react-dom":7,"./getDraftEditorSelection":193,"fbjs/lib/invariant":79}],117:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorEditHandler
 * @format
 * 
 */

'use strict';

var onBeforeInput = require('./editOnBeforeInput');
var onBlur = require('./editOnBlur');
var onCompositionStart = require('./editOnCompositionStart');
var onCopy = require('./editOnCopy');
var onCut = require('./editOnCut');
var onDragOver = require('./editOnDragOver');
var onDragStart = require('./editOnDragStart');
var onFocus = require('./editOnFocus');
var onInput = require('./editOnInput');
var onKeyDown = require('./editOnKeyDown');
var onPaste = require('./editOnPaste');
var onSelect = require('./editOnSelect');

var DraftEditorEditHandler = {
  onBeforeInput: onBeforeInput,
  onBlur: onBlur,
  onCompositionStart: onCompositionStart,
  onCopy: onCopy,
  onCut: onCut,
  onDragOver: onDragOver,
  onDragStart: onDragStart,
  onFocus: onFocus,
  onInput: onInput,
  onKeyDown: onKeyDown,
  onPaste: onPaste,
  onSelect: onSelect
};

module.exports = DraftEditorEditHandler;
},{"./editOnBeforeInput":152,"./editOnBlur":153,"./editOnCompositionStart":154,"./editOnCopy":155,"./editOnCut":156,"./editOnDragOver":157,"./editOnDragStart":158,"./editOnFocus":159,"./editOnInput":160,"./editOnKeyDown":161,"./editOnPaste":162,"./editOnSelect":163}],118:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorPlaceholder.react
 * @format
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var cx = require('fbjs/lib/cx');

/**
 * This component is responsible for rendering placeholder text for the
 * `DraftEditor` component.
 *
 * Override placeholder style via CSS.
 */
var DraftEditorPlaceholder = function (_React$Component) {
  _inherits(DraftEditorPlaceholder, _React$Component);

  function DraftEditorPlaceholder() {
    _classCallCheck(this, DraftEditorPlaceholder);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraftEditorPlaceholder.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.editorState.getSelection().getHasFocus() !== nextProps.editorState.getSelection().getHasFocus();
  };

  DraftEditorPlaceholder.prototype.render = function render() {
    var hasFocus = this.props.editorState.getSelection().getHasFocus();

    var className = cx({
      'public/DraftEditorPlaceholder/root': true,
      'public/DraftEditorPlaceholder/hasFocus': hasFocus
    });

    var contentStyle = {
      whiteSpace: 'pre-wrap'
    };

    return React.createElement(
      'div',
      { className: className },
      React.createElement(
        'div',
        {
          className: cx('public/DraftEditorPlaceholder/inner'),
          id: this.props.accessibilityID,
          style: contentStyle },
        this.props.text
      )
    );
  };

  return DraftEditorPlaceholder;
}(React.Component);

module.exports = DraftEditorPlaceholder;
},{"react":8,"fbjs/lib/cx":113}],45:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getDefaultKeyBinding
 * @format
 * 
 */

'use strict';

var KeyBindingUtil = require('./KeyBindingUtil');
var Keys = require('fbjs/lib/Keys');
var UserAgent = require('fbjs/lib/UserAgent');

var isOSX = UserAgent.isPlatform('Mac OS X');
var isWindows = UserAgent.isPlatform('Windows');

// Firefox on OSX had a bug resulting in navigation instead of cursor movement.
// This bug was fixed in Firefox 29. Feature detection is virtually impossible
// so we just check the version number. See #342765.
var shouldFixFirefoxMovement = isOSX && UserAgent.isBrowser('Firefox < 29');

var hasCommandModifier = KeyBindingUtil.hasCommandModifier,
    isCtrlKeyCommand = KeyBindingUtil.isCtrlKeyCommand;


function shouldRemoveWord(e) {
  return isOSX && e.altKey || isCtrlKeyCommand(e);
}

/**
 * Get the appropriate undo/redo command for a Z key command.
 */
function getZCommand(e) {
  if (!hasCommandModifier(e)) {
    return null;
  }
  return e.shiftKey ? 'redo' : 'undo';
}

function getDeleteCommand(e) {
  // Allow default "cut" behavior for Windows on Shift + Delete.
  if (isWindows && e.shiftKey) {
    return null;
  }
  return shouldRemoveWord(e) ? 'delete-word' : 'delete';
}

function getBackspaceCommand(e) {
  if (hasCommandModifier(e) && isOSX) {
    return 'backspace-to-start-of-line';
  }
  return shouldRemoveWord(e) ? 'backspace-word' : 'backspace';
}

/**
 * Retrieve a bound key command for the given event.
 */
function getDefaultKeyBinding(e) {
  switch (e.keyCode) {
    case 66:
      // B
      return hasCommandModifier(e) ? 'bold' : null;
    case 68:
      // D
      return isCtrlKeyCommand(e) ? 'delete' : null;
    case 72:
      // H
      return isCtrlKeyCommand(e) ? 'backspace' : null;
    case 73:
      // I
      return hasCommandModifier(e) ? 'italic' : null;
    case 74:
      // J
      return hasCommandModifier(e) ? 'code' : null;
    case 75:
      // K
      return !isWindows && isCtrlKeyCommand(e) ? 'secondary-cut' : null;
    case 77:
      // M
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 79:
      // O
      return isCtrlKeyCommand(e) ? 'split-block' : null;
    case 84:
      // T
      return isOSX && isCtrlKeyCommand(e) ? 'transpose-characters' : null;
    case 85:
      // U
      return hasCommandModifier(e) ? 'underline' : null;
    case 87:
      // W
      return isOSX && isCtrlKeyCommand(e) ? 'backspace-word' : null;
    case 89:
      // Y
      if (isCtrlKeyCommand(e)) {
        return isWindows ? 'redo' : 'secondary-paste';
      }
      return null;
    case 90:
      // Z
      return getZCommand(e) || null;
    case Keys.RETURN:
      return 'split-block';
    case Keys.DELETE:
      return getDeleteCommand(e);
    case Keys.BACKSPACE:
      return getBackspaceCommand(e);
    // LEFT/RIGHT handlers serve as a workaround for a Firefox bug.
    case Keys.LEFT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-start-of-block' : null;
    case Keys.RIGHT:
      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-end-of-block' : null;
    default:
      return null;
  }
}

module.exports = getDefaultKeyBinding;
},{"./KeyBindingUtil":38,"fbjs/lib/Keys":123,"fbjs/lib/UserAgent":119}],32:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditor.react
 * @format
 * 
 * @preventMunge
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DefaultDraftBlockRenderMap = require('./DefaultDraftBlockRenderMap');
var DefaultDraftInlineStyle = require('./DefaultDraftInlineStyle');
var DraftEditorCompositionHandler = require('./DraftEditorCompositionHandler');
var DraftEditorContents = require('./DraftEditorContents.react');
var DraftEditorDragHandler = require('./DraftEditorDragHandler');
var DraftEditorEditHandler = require('./DraftEditorEditHandler');
var DraftEditorPlaceholder = require('./DraftEditorPlaceholder.react');
var EditorState = require('./EditorState');
var React = require('react');
var ReactDOM = require('react-dom');
var Scroll = require('fbjs/lib/Scroll');
var Style = require('fbjs/lib/Style');
var UserAgent = require('fbjs/lib/UserAgent');

var cx = require('fbjs/lib/cx');
var emptyFunction = require('fbjs/lib/emptyFunction');
var generateRandomKey = require('./generateRandomKey');
var getDefaultKeyBinding = require('./getDefaultKeyBinding');
var getScrollPosition = require('fbjs/lib/getScrollPosition');
var invariant = require('fbjs/lib/invariant');
var nullthrows = require('fbjs/lib/nullthrows');

var isIE = UserAgent.isBrowser('IE');

// IE does not support the `input` event on contentEditable, so we can't
// observe spellcheck behavior.
var allowSpellCheck = !isIE;

// Define a set of handler objects to correspond to each possible `mode`
// of editor behavior.
var handlerMap = {
  edit: DraftEditorEditHandler,
  composite: DraftEditorCompositionHandler,
  drag: DraftEditorDragHandler,
  cut: null,
  render: null
};

/**
 * `DraftEditor` is the root editor component. It composes a `contentEditable`
 * div, and provides a wide variety of useful function props for managing the
 * state of the editor. See `DraftEditorProps` for details.
 */
var DraftEditor = function (_React$Component) {
  _inherits(DraftEditor, _React$Component);

  function DraftEditor(props) {
    _classCallCheck(this, DraftEditor);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.focus = function (scrollPosition) {
      var editorState = _this.props.editorState;

      var alreadyHasFocus = editorState.getSelection().getHasFocus();
      var editorNode = ReactDOM.findDOMNode(_this.editor);

      if (!editorNode) {
        // once in a while people call 'focus' in a setTimeout, and the node has
        // been deleted, so it can be null in that case.
        return;
      }

      var scrollParent = Style.getScrollParent(editorNode);

      var _ref = scrollPosition || getScrollPosition(scrollParent),
          x = _ref.x,
          y = _ref.y;

      !(editorNode instanceof HTMLElement) ? 'production' !== 'production' ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
      editorNode.focus();

      // Restore scroll position
      if (scrollParent === window) {
        window.scrollTo(x, y);
      } else {
        Scroll.setTop(scrollParent, y);
      }

      // On Chrome and Safari, calling focus on contenteditable focuses the
      // cursor at the first character. This is something you don't expect when
      // you're clicking on an input element but not directly on a character.
      // Put the cursor back where it was before the blur.
      if (!alreadyHasFocus) {
        _this.update(EditorState.forceSelection(editorState, editorState.getSelection()));
      }
    };

    _this.blur = function () {
      var editorNode = ReactDOM.findDOMNode(_this.editor);
      !(editorNode instanceof HTMLElement) ? 'production' !== 'production' ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
      editorNode.blur();
    };

    _this.setMode = function (mode) {
      _this._handler = handlerMap[mode];
    };

    _this.exitCurrentMode = function () {
      _this.setMode('edit');
    };

    _this.restoreEditorDOM = function (scrollPosition) {
      _this.setState({ contentsKey: _this.state.contentsKey + 1 }, function () {
        _this.focus(scrollPosition);
      });
    };

    _this.setClipboard = function (clipboard) {
      _this._clipboard = clipboard;
    };

    _this.getClipboard = function () {
      return _this._clipboard;
    };

    _this.update = function (editorState) {
      _this._latestEditorState = editorState;
      _this.props.onChange(editorState);
    };

    _this.onDragEnter = function () {
      _this._dragCount++;
    };

    _this.onDragLeave = function () {
      _this._dragCount--;
      if (_this._dragCount === 0) {
        _this.exitCurrentMode();
      }
    };

    _this._blockSelectEvents = false;
    _this._clipboard = null;
    _this._handler = null;
    _this._dragCount = 0;
    _this._editorKey = props.editorKey || generateRandomKey();
    _this._placeholderAccessibilityID = 'placeholder-' + _this._editorKey;
    _this._latestEditorState = props.editorState;
    _this._latestCommittedEditorState = props.editorState;

    _this._onBeforeInput = _this._buildHandler('onBeforeInput');
    _this._onBlur = _this._buildHandler('onBlur');
    _this._onCharacterData = _this._buildHandler('onCharacterData');
    _this._onCompositionEnd = _this._buildHandler('onCompositionEnd');
    _this._onCompositionStart = _this._buildHandler('onCompositionStart');
    _this._onCopy = _this._buildHandler('onCopy');
    _this._onCut = _this._buildHandler('onCut');
    _this._onDragEnd = _this._buildHandler('onDragEnd');
    _this._onDragOver = _this._buildHandler('onDragOver');
    _this._onDragStart = _this._buildHandler('onDragStart');
    _this._onDrop = _this._buildHandler('onDrop');
    _this._onInput = _this._buildHandler('onInput');
    _this._onFocus = _this._buildHandler('onFocus');
    _this._onKeyDown = _this._buildHandler('onKeyDown');
    _this._onKeyPress = _this._buildHandler('onKeyPress');
    _this._onKeyUp = _this._buildHandler('onKeyUp');
    _this._onMouseDown = _this._buildHandler('onMouseDown');
    _this._onMouseUp = _this._buildHandler('onMouseUp');
    _this._onPaste = _this._buildHandler('onPaste');
    _this._onSelect = _this._buildHandler('onSelect');

    _this.getEditorKey = function () {
      return _this._editorKey;
    };

    // See `restoreEditorDOM()`.
    _this.state = { contentsKey: 0 };
    return _this;
  }

  /**
   * Build a method that will pass the event to the specified handler method.
   * This allows us to look up the correct handler function for the current
   * editor mode, if any has been specified.
   */

  /**
   * Define proxies that can route events to the current handler.
   */

  DraftEditor.prototype._buildHandler = function _buildHandler(eventName) {
    var _this2 = this;

    return function (e) {
      if (!_this2.props.readOnly) {
        var method = _this2._handler && _this2._handler[eventName];
        method && method(_this2, e);
      }
    };
  };

  DraftEditor.prototype._showPlaceholder = function _showPlaceholder() {
    return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText();
  };

  DraftEditor.prototype._renderPlaceholder = function _renderPlaceholder() {
    if (this._showPlaceholder()) {
      var placeHolderProps = {
        text: nullthrows(this.props.placeholder),
        editorState: this.props.editorState,
        textAlignment: this.props.textAlignment,
        accessibilityID: this._placeholderAccessibilityID
      };

      return React.createElement(DraftEditorPlaceholder, placeHolderProps);
    }
    return null;
  };

  DraftEditor.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        blockRenderMap = _props.blockRenderMap,
        blockRendererFn = _props.blockRendererFn,
        blockStyleFn = _props.blockStyleFn,
        customStyleFn = _props.customStyleFn,
        customStyleMap = _props.customStyleMap,
        editorState = _props.editorState,
        readOnly = _props.readOnly,
        textAlignment = _props.textAlignment,
        textDirectionality = _props.textDirectionality;

    var rootClass = cx({
      'DraftEditor/root': true,
      'DraftEditor/alignLeft': textAlignment === 'left',
      'DraftEditor/alignRight': textAlignment === 'right',
      'DraftEditor/alignCenter': textAlignment === 'center'
    });

    var contentStyle = {
      outline: 'none',
      // fix parent-draggable Safari bug. #1326
      userSelect: 'text',
      WebkitUserSelect: 'text',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    };

    // The aria-expanded and aria-haspopup properties should only be rendered
    // for a combobox.
    var ariaRole = this.props.role || 'textbox';
    var ariaExpanded = ariaRole === 'combobox' ? !!this.props.ariaExpanded : null;

    var editorContentsProps = {
      blockRenderMap: blockRenderMap,
      blockRendererFn: blockRendererFn,
      blockStyleFn: blockStyleFn,
      customStyleMap: _extends({}, DefaultDraftInlineStyle, customStyleMap),
      customStyleFn: customStyleFn,
      editorKey: this._editorKey,
      editorState: editorState,
      key: 'contents' + this.state.contentsKey,
      textDirectionality: textDirectionality
    };

    return React.createElement('div', { className: rootClass }, this._renderPlaceholder(), React.createElement('div', {
      className: cx('DraftEditor/editorContainer'),
      ref: function ref(_ref3) {
        return _this3.editorContainer = _ref3;
      } }, React.createElement('div', {
      'aria-activedescendant': readOnly ? null : this.props.ariaActiveDescendantID,
      'aria-autocomplete': readOnly ? null : this.props.ariaAutoComplete,
      'aria-controls': readOnly ? null : this.props.ariaControls,
      'aria-describedby': this.props.ariaDescribedBy || this._placeholderAccessibilityID,
      'aria-expanded': readOnly ? null : ariaExpanded,
      'aria-label': this.props.ariaLabel,
      'aria-labelledby': this.props.ariaLabelledBy,
      'aria-multiline': this.props.ariaMultiline,
      autoCapitalize: this.props.autoCapitalize,
      autoComplete: this.props.autoComplete,
      autoCorrect: this.props.autoCorrect,
      className: cx({
        // Chrome's built-in translation feature mutates the DOM in ways
        // that Draft doesn't expect (ex: adding <font> tags inside
        // DraftEditorLeaf spans) and causes problems. We add notranslate
        // here which makes its autotranslation skip over this subtree.
        notranslate: !readOnly,
        'public/DraftEditor/content': true
      }),
      contentEditable: !readOnly,
      'data-testid': this.props.webDriverTestID,
      onBeforeInput: this._onBeforeInput,
      onBlur: this._onBlur,
      onCompositionEnd: this._onCompositionEnd,
      onCompositionStart: this._onCompositionStart,
      onCopy: this._onCopy,
      onCut: this._onCut,
      onDragEnd: this._onDragEnd,
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDragOver: this._onDragOver,
      onDragStart: this._onDragStart,
      onDrop: this._onDrop,
      onFocus: this._onFocus,
      onInput: this._onInput,
      onKeyDown: this._onKeyDown,
      onKeyPress: this._onKeyPress,
      onKeyUp: this._onKeyUp,
      onMouseUp: this._onMouseUp,
      onPaste: this._onPaste,
      onSelect: this._onSelect,
      ref: function ref(_ref2) {
        return _this3.editor = _ref2;
      },
      role: readOnly ? null : ariaRole,
      spellCheck: allowSpellCheck && this.props.spellCheck,
      style: contentStyle,
      suppressContentEditableWarning: true,
      tabIndex: this.props.tabIndex }, React.createElement(DraftEditorContents, editorContentsProps))));
  };

  DraftEditor.prototype.componentDidMount = function componentDidMount() {
    this.setMode('edit');

    /**
     * IE has a hardcoded "feature" that attempts to convert link text into
     * anchors in contentEditable DOM. This breaks the editor's expectations of
     * the DOM, and control is lost. Disable it to make IE behave.
     * See: http://blogs.msdn.com/b/ieinternals/archive/2010/09/15/
     * ie9-beta-minor-change-list.aspx
     */
    if (isIE) {
      document.execCommand('AutoUrlDetect', false, false);
    }
  };

  /**
   * Prevent selection events from affecting the current editor state. This
   * is mostly intended to defend against IE, which fires off `selectionchange`
   * events regardless of whether the selection is set via the browser or
   * programmatically. We only care about selection events that occur because
   * of browser interaction, not re-renders and forced selections.
   */

  DraftEditor.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    this._blockSelectEvents = true;
    this._latestEditorState = nextProps.editorState;
  };

  DraftEditor.prototype.componentDidUpdate = function componentDidUpdate() {
    this._blockSelectEvents = false;
    this._latestCommittedEditorState = this.props.editorState;
  };

  /**
   * Used via `this.focus()`.
   *
   * Force focus back onto the editor node.
   *
   * We attempt to preserve scroll position when focusing. You can also pass
   * a specified scroll position (for cases like `cut` behavior where it should
   * be restored to a known position).
   */

  /**
   * Used via `this.setMode(...)`.
   *
   * Set the behavior mode for the editor component. This switches the current
   * handler module to ensure that DOM events are managed appropriately for
   * the active mode.
   */

  /**
   * Used via `this.restoreEditorDOM()`.
   *
   * Force a complete re-render of the DraftEditorContents based on the current
   * EditorState. This is useful when we know we are going to lose control of
   * the DOM state (cut command, IME) and we want to make sure that
   * reconciliation occurs on a version of the DOM that is synchronized with
   * our EditorState.
   */

  /**
   * Used via `this.setClipboard(...)`.
   *
   * Set the clipboard state for a cut/copy event.
   */

  /**
   * Used via `this.getClipboard()`.
   *
   * Retrieve the clipboard state for a cut/copy event.
   */

  /**
   * Used via `this.update(...)`.
   *
   * Propagate a new `EditorState` object to higher-level components. This is
   * the method by which event handlers inform the `DraftEditor` component of
   * state changes. A component that composes a `DraftEditor` **must** provide
   * an `onChange` prop to receive state updates passed along from this
   * function.
   */

  /**
   * Used in conjunction with `onDragLeave()`, by counting the number of times
   * a dragged element enters and leaves the editor (or any of its children),
   * to determine when the dragged element absolutely leaves the editor.
   */

  /**
   * See `onDragEnter()`.
   */

  return DraftEditor;
}(React.Component);

DraftEditor.defaultProps = {
  blockRenderMap: DefaultDraftBlockRenderMap,
  blockRendererFn: emptyFunction.thatReturnsNull,
  blockStyleFn: emptyFunction.thatReturns(''),
  keyBindingFn: getDefaultKeyBinding,
  readOnly: false,
  spellCheck: false,
  stripPastedStyles: false
};

module.exports = DraftEditor;
},{"object-assign":82,"./DefaultDraftBlockRenderMap":30,"./DefaultDraftInlineStyle":31,"./DraftEditorCompositionHandler":114,"./DraftEditorContents.react":115,"./DraftEditorDragHandler":116,"./DraftEditorEditHandler":117,"./DraftEditorPlaceholder.react":118,"./EditorState":37,"react":8,"react-dom":7,"fbjs/lib/Scroll":124,"fbjs/lib/Style":125,"fbjs/lib/UserAgent":119,"fbjs/lib/cx":113,"fbjs/lib/emptyFunction":80,"./generateRandomKey":44,"./getDefaultKeyBinding":45,"fbjs/lib/getScrollPosition":129,"fbjs/lib/invariant":79,"fbjs/lib/nullthrows":131}],102:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftStringKey
 * @format
 * 
 */

'use strict';

var DraftStringKey = {
  stringify: function stringify(key) {
    return '_' + String(key);
  },

  unstringify: function unstringify(key) {
    return key.slice(1);
  }
};

module.exports = DraftStringKey;
},{}],103:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule encodeEntityRanges
 * @format
 * 
 */

'use strict';

var DraftStringKey = require('./DraftStringKey');
var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var strlen = UnicodeUtils.strlen;

/**
 * Convert to UTF-8 character counts for storage.
 */

function encodeEntityRanges(block, storageMap) {
  var encoded = [];
  block.findEntityRanges(function (character) {
    return !!character.getEntity();
  }, function ( /*number*/start, /*number*/end) {
    var text = block.getText();
    var key = block.getEntityAt(start);
    encoded.push({
      offset: strlen(text.slice(0, start)),
      length: strlen(text.slice(start, end)),
      // Encode the key as a number for range storage.
      key: Number(storageMap[DraftStringKey.stringify(key)])
    });
  });
  return encoded;
}

module.exports = encodeEntityRanges;
},{"./DraftStringKey":102,"fbjs/lib/UnicodeUtils":144}],104:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule encodeInlineStyleRanges
 * @format
 * 
 */

'use strict';

var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var findRangesImmutable = require('./findRangesImmutable');

var areEqual = function areEqual(a, b) {
  return a === b;
};
var isTruthy = function isTruthy(a) {
  return !!a;
};
var EMPTY_ARRAY = [];

/**
 * Helper function for getting encoded styles for each inline style. Convert
 * to UTF-8 character counts for storage.
 */
function getEncodedInlinesForType(block, styleList, styleToEncode) {
  var ranges = [];

  // Obtain an array with ranges for only the specified style.
  var filteredInlines = styleList.map(function (style) {
    return style.has(styleToEncode);
  }).toList();

  findRangesImmutable(filteredInlines, areEqual,
  // We only want to keep ranges with nonzero style values.
  isTruthy, function (start, end) {
    var text = block.getText();
    ranges.push({
      offset: UnicodeUtils.strlen(text.slice(0, start)),
      length: UnicodeUtils.strlen(text.slice(start, end)),
      style: styleToEncode
    });
  });

  return ranges;
}

/*
 * Retrieve the encoded arrays of inline styles, with each individual style
 * treated separately.
 */
function encodeInlineStyleRanges(block) {
  var styleList = block.getCharacterList().map(function (c) {
    return c.getStyle();
  }).toList();
  var ranges = styleList.flatten().toSet().map(function (style) {
    return getEncodedInlinesForType(block, styleList, style);
  });

  return Array.prototype.concat.apply(EMPTY_ARRAY, ranges.toJS());
}

module.exports = encodeInlineStyleRanges;
},{"fbjs/lib/UnicodeUtils":144,"./findRangesImmutable":90}],41:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromDraftStateToRaw
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var DraftStringKey = require('./DraftStringKey');

var encodeEntityRanges = require('./encodeEntityRanges');
var encodeInlineStyleRanges = require('./encodeInlineStyleRanges');
var invariant = require('fbjs/lib/invariant');

var createRawBlock = function createRawBlock(block, entityStorageMap) {
  return {
    key: block.getKey(),
    text: block.getText(),
    type: block.getType(),
    depth: block.getDepth(),
    inlineStyleRanges: encodeInlineStyleRanges(block),
    entityRanges: encodeEntityRanges(block, entityStorageMap),
    data: block.getData().toObject()
  };
};

var insertRawBlock = function insertRawBlock(block, entityMap, rawBlocks, blockCacheRef) {
  if (block instanceof ContentBlock) {
    rawBlocks.push(createRawBlock(block, entityMap));
    return;
  }

  !(block instanceof ContentBlockNode) ? 'production' !== 'production' ? invariant(false, 'block is not a BlockNode') : invariant(false) : void 0;

  var parentKey = block.getParentKey();
  var rawBlock = blockCacheRef[block.getKey()] = _extends({}, createRawBlock(block, entityMap), {
    children: []
  });

  if (parentKey) {
    blockCacheRef[parentKey].children.push(rawBlock);
    return;
  }

  rawBlocks.push(rawBlock);
};

var encodeRawBlocks = function encodeRawBlocks(contentState, rawState) {
  var entityMap = rawState.entityMap;

  var rawBlocks = [];

  var blockCacheRef = {};
  var entityCacheRef = {};
  var entityStorageKey = 0;

  contentState.getBlockMap().forEach(function (block) {
    block.findEntityRanges(function (character) {
      return character.getEntity() !== null;
    }, function (start) {
      var entityKey = block.getEntityAt(start);
      // Stringify to maintain order of otherwise numeric keys.
      var stringifiedEntityKey = DraftStringKey.stringify(entityKey);
      // This makes this function resilient to two entities
      // erroneously having the same key
      if (entityCacheRef[stringifiedEntityKey]) {
        return;
      }
      entityCacheRef[stringifiedEntityKey] = entityKey;
      // we need the `any` casting here since this is a temporary state
      // where we will later on flip the entity map and populate it with
      // real entity, at this stage we just need to map back the entity
      // key used by the BlockNode
      entityMap[stringifiedEntityKey] = '' + entityStorageKey;
      entityStorageKey++;
    });

    insertRawBlock(block, entityMap, rawBlocks, blockCacheRef);
  });

  return {
    blocks: rawBlocks,
    entityMap: entityMap
  };
};

// Flip storage map so that our storage keys map to global
// DraftEntity keys.
var encodeRawEntityMap = function encodeRawEntityMap(contentState, rawState) {
  var blocks = rawState.blocks,
      entityMap = rawState.entityMap;

  var rawEntityMap = {};

  Object.keys(entityMap).forEach(function (key, index) {
    var entity = contentState.getEntity(DraftStringKey.unstringify(key));
    rawEntityMap[index] = {
      type: entity.getType(),
      mutability: entity.getMutability(),
      data: entity.getData()
    };
  });

  return {
    blocks: blocks,
    entityMap: rawEntityMap
  };
};

var convertFromDraftStateToRaw = function convertFromDraftStateToRaw(contentState) {
  var rawDraftContentState = {
    entityMap: {},
    blocks: []
  };

  // add blocks
  rawDraftContentState = encodeRawBlocks(contentState, rawDraftContentState);

  // add entities
  rawDraftContentState = encodeRawEntityMap(contentState, rawDraftContentState);

  return rawDraftContentState;
};

module.exports = convertFromDraftStateToRaw;
},{"object-assign":82,"./ContentBlock":28,"./ContentBlockNode":87,"./DraftStringKey":102,"./encodeEntityRanges":103,"./encodeInlineStyleRanges":104,"fbjs/lib/invariant":79}],109:[function(require,module,exports) {
'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftTreeAdapter
 * @format
 * 
 *
 * This is unstable and not part of the public API and should not be used by
 * production systems. This file may be update/removed without notice.
 */

var invariant = require('fbjs/lib/invariant');

var traverseInDepthOrder = function traverseInDepthOrder(blocks, fn) {
  var stack = [].concat(blocks).reverse();
  while (stack.length) {
    var _block = stack.pop();

    fn(_block);

    var children = _block.children;

    !Array.isArray(children) ? 'production' !== 'production' ? invariant(false, 'Invalid tree raw block') : invariant(false) : void 0;

    stack = stack.concat([].concat(children.reverse()));
  }
};

var isListBlock = function isListBlock(block) {
  if (!(block && block.type)) {
    return false;
  }
  var type = block.type;

  return type === 'unordered-list-item' || type === 'ordered-list-item';
};

var addDepthToChildren = function addDepthToChildren(block) {
  if (Array.isArray(block.children)) {
    block.children = block.children.map(function (child) {
      return child.type === block.type ? _extends({}, child, { depth: (block.depth || 0) + 1 }) : child;
    });
  }
};

/**
 * This adapter is intended to be be used as an adapter to draft tree data
 *
 * draft state <=====> draft tree state
 */
var DraftTreeAdapter = {
  /**
   * Converts from a tree raw state back to  draft raw state
   */
  fromRawTreeStateToRawState: function fromRawTreeStateToRawState(draftTreeState) {
    var blocks = draftTreeState.blocks;

    var transformedBlocks = [];

    !Array.isArray(blocks) ? 'production' !== 'production' ? invariant(false, 'Invalid raw state') : invariant(false) : void 0;

    if (!Array.isArray(blocks) || !blocks.length) {
      return draftTreeState;
    }

    traverseInDepthOrder(blocks, function (block) {
      var newBlock = _extends({}, block);

      if (isListBlock(block)) {
        newBlock.depth = newBlock.depth || 0;
        addDepthToChildren(block);
      }

      delete newBlock.children;

      transformedBlocks.push(newBlock);
    });

    draftTreeState.blocks = transformedBlocks;

    return _extends({}, draftTreeState, {
      blocks: transformedBlocks
    });
  },

  /**
   * Converts from draft raw state to tree draft state
   */
  fromRawStateToRawTreeState: function fromRawStateToRawTreeState(draftState) {
    var lastListDepthCacheRef = {};
    var transformedBlocks = [];

    draftState.blocks.forEach(function (block) {
      var isList = isListBlock(block);
      var depth = block.depth || 0;
      var treeBlock = _extends({}, block, {
        children: []
      });

      if (!isList) {
        // reset the cache path
        lastListDepthCacheRef = {};
        transformedBlocks.push(treeBlock);
        return;
      }

      // update our depth cache reference path
      lastListDepthCacheRef[depth] = treeBlock;

      // if we are greater than zero we must have seen a parent already
      if (depth > 0) {
        var parent = lastListDepthCacheRef[depth - 1];

        !parent ? 'production' !== 'production' ? invariant(false, 'Invalid depth for RawDraftContentBlock') : invariant(false) : void 0;

        // push nested list blocks
        parent.children.push(treeBlock);
        return;
      }

      // push root list blocks
      transformedBlocks.push(treeBlock);
    });

    return _extends({}, draftState, {
      blocks: transformedBlocks
    });
  }
};

module.exports = DraftTreeAdapter;
},{"object-assign":82,"fbjs/lib/invariant":79}],110:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createCharacterList
 * @format
 * 
 */

'use strict';

var CharacterMetadata = require('./CharacterMetadata');
var Immutable = require('immutable');

var List = Immutable.List;


function createCharacterList(inlineStyles, entities) {
  var characterArray = inlineStyles.map(function (style, ii) {
    var entity = entities[ii];
    return CharacterMetadata.create({ style: style, entity: entity });
  });
  return List(characterArray);
}

module.exports = createCharacterList;
},{"./CharacterMetadata":26,"immutable":132}],111:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule decodeEntityRanges
 * @format
 * 
 */

'use strict';

var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var substr = UnicodeUtils.substr;

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */

function decodeEntityRanges(text, ranges) {
  var entities = Array(text.length).fill(null);
  if (ranges) {
    ranges.forEach(function (range) {
      // Using Unicode-enabled substrings converted to JavaScript lengths,
      // fill the output array with entity keys.
      var start = substr(text, 0, range.offset).length;
      var end = start + substr(text, range.offset, range.length).length;
      for (var ii = start; ii < end; ii++) {
        entities[ii] = range.key;
      }
    });
  }
  return entities;
}

module.exports = decodeEntityRanges;
},{"fbjs/lib/UnicodeUtils":144}],112:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule decodeInlineStyleRanges
 * @format
 * 
 */

'use strict';

var _require = require('immutable'),
    OrderedSet = _require.OrderedSet;

var UnicodeUtils = require('fbjs/lib/UnicodeUtils');

var substr = UnicodeUtils.substr;


var EMPTY_SET = OrderedSet();

/**
 * Convert to native JavaScript string lengths to determine ranges.
 */
function decodeInlineStyleRanges(text, ranges) {
  var styles = Array(text.length).fill(EMPTY_SET);
  if (ranges) {
    ranges.forEach(function ( /*object*/range) {
      var cursor = substr(text, 0, range.offset).length;
      var end = cursor + substr(text, range.offset, range.length).length;
      while (cursor < end) {
        styles[cursor] = styles[cursor].add(range.style);
        cursor++;
      }
    });
  }
  return styles;
}

module.exports = decodeInlineStyleRanges;
},{"immutable":132,"fbjs/lib/UnicodeUtils":144}],43:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertFromRawToDraftState
 * @format
 * 
 */

'use strict';

var _assign = require('object-assign');

var _extends = _assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var ContentBlock = require('./ContentBlock');
var ContentBlockNode = require('./ContentBlockNode');
var ContentState = require('./ContentState');
var DraftEntity = require('./DraftEntity');
var DraftFeatureFlags = require('./DraftFeatureFlags');
var DraftTreeAdapter = require('./DraftTreeAdapter');
var Immutable = require('immutable');
var SelectionState = require('./SelectionState');

var createCharacterList = require('./createCharacterList');
var decodeEntityRanges = require('./decodeEntityRanges');
var decodeInlineStyleRanges = require('./decodeInlineStyleRanges');
var generateRandomKey = require('./generateRandomKey');
var invariant = require('fbjs/lib/invariant');

var experimentalTreeDataSupport = DraftFeatureFlags.draft_tree_data_support;

var List = Immutable.List,
    Map = Immutable.Map,
    OrderedMap = Immutable.OrderedMap;

var decodeBlockNodeConfig = function decodeBlockNodeConfig(block, entityMap) {
  var key = block.key,
      type = block.type,
      data = block.data,
      text = block.text,
      depth = block.depth;

  var blockNodeConfig = {
    text: text,
    depth: depth || 0,
    type: type || 'unstyled',
    key: key || generateRandomKey(),
    data: Map(data),
    characterList: decodeCharacterList(block, entityMap)
  };

  return blockNodeConfig;
};

var decodeCharacterList = function decodeCharacterList(block, entityMap) {
  var text = block.text,
      rawEntityRanges = block.entityRanges,
      rawInlineStyleRanges = block.inlineStyleRanges;

  var entityRanges = rawEntityRanges || [];
  var inlineStyleRanges = rawInlineStyleRanges || [];

  // Translate entity range keys to the DraftEntity map.
  return createCharacterList(decodeInlineStyleRanges(text, inlineStyleRanges), decodeEntityRanges(text, entityRanges.filter(function (range) {
    return entityMap.hasOwnProperty(range.key);
  }).map(function (range) {
    return _extends({}, range, { key: entityMap[range.key] });
  })));
};

var addKeyIfMissing = function addKeyIfMissing(block) {
  return _extends({}, block, {
    key: block.key || generateRandomKey()
  });
};

/**
 * Node stack is responsible to ensure we traverse the tree only once
 * in depth order, while also providing parent refs to inner nodes to
 * construct their links.
 */
var updateNodeStack = function updateNodeStack(stack, nodes, parentRef) {
  var nodesWithParentRef = nodes.map(function (block) {
    return _extends({}, block, {
      parentRef: parentRef
    });
  });

  // since we pop nodes from the stack we need to insert them in reverse
  return stack.concat(nodesWithParentRef.reverse());
};

/**
 * This will build a tree draft content state by creating the node
 * reference links into a single tree walk. Each node has a link
 * reference to "parent", "children", "nextSibling" and "prevSibling"
 * blockMap will be created using depth ordering.
 */
var decodeContentBlockNodes = function decodeContentBlockNodes(blocks, entityMap) {
  return blocks
  // ensure children have valid keys to enable sibling links
  .map(addKeyIfMissing).reduce(function (blockMap, block, index) {
    !Array.isArray(block.children) ? 'production' !== 'production' ? invariant(false, 'invalid RawDraftContentBlock can not be converted to ContentBlockNode') : invariant(false) : void 0;

    // ensure children have valid keys to enable sibling links
    var children = block.children.map(addKeyIfMissing);

    // root level nodes
    var contentBlockNode = new ContentBlockNode(_extends({}, decodeBlockNodeConfig(block, entityMap), {
      prevSibling: index === 0 ? null : blocks[index - 1].key,
      nextSibling: index === blocks.length - 1 ? null : blocks[index + 1].key,
      children: List(children.map(function (child) {
        return child.key;
      }))
    }));

    // push root node to blockMap
    blockMap = blockMap.set(contentBlockNode.getKey(), contentBlockNode);

    // this stack is used to ensure we visit all nodes respecting depth ordering
    var stack = updateNodeStack([], children, contentBlockNode);

    // start computing children nodes
    while (stack.length > 0) {
      // we pop from the stack and start processing this node
      var node = stack.pop();

      // parentRef already points to a converted ContentBlockNode
      var parentRef = node.parentRef;
      var siblings = parentRef.getChildKeys();
      var _index = siblings.indexOf(node.key);
      var isValidBlock = Array.isArray(node.children);

      if (!isValidBlock) {
        !isValidBlock ? 'production' !== 'production' ? invariant(false, 'invalid RawDraftContentBlock can not be converted to ContentBlockNode') : invariant(false) : void 0;
        break;
      }

      // ensure children have valid keys to enable sibling links
      var _children = node.children.map(addKeyIfMissing);

      var _contentBlockNode = new ContentBlockNode(_extends({}, decodeBlockNodeConfig(node, entityMap), {
        parent: parentRef.getKey(),
        children: List(_children.map(function (child) {
          return child.key;
        })),
        prevSibling: _index === 0 ? null : siblings.get(_index - 1),
        nextSibling: _index === siblings.size - 1 ? null : siblings.get(_index + 1)
      }));

      // push node to blockMap
      blockMap = blockMap.set(_contentBlockNode.getKey(), _contentBlockNode);

      // this stack is used to ensure we visit all nodes respecting depth ordering
      stack = updateNodeStack(stack, _children, _contentBlockNode);
    }

    return blockMap;
  }, OrderedMap());
};

var decodeContentBlocks = function decodeContentBlocks(blocks, entityMap) {
  return OrderedMap(blocks.map(function (block) {
    var contentBlock = new ContentBlock(decodeBlockNodeConfig(block, entityMap));
    return [contentBlock.getKey(), contentBlock];
  }));
};

var decodeRawBlocks = function decodeRawBlocks(rawState, entityMap) {
  var isTreeRawBlock = Array.isArray(rawState.blocks[0].children);
  var rawBlocks = experimentalTreeDataSupport && !isTreeRawBlock ? DraftTreeAdapter.fromRawStateToRawTreeState(rawState).blocks : rawState.blocks;

  if (!experimentalTreeDataSupport) {
    return decodeContentBlocks(isTreeRawBlock ? DraftTreeAdapter.fromRawTreeStateToRawState(rawState).blocks : rawBlocks, entityMap);
  }

  return decodeContentBlockNodes(rawBlocks, entityMap);
};

var decodeRawEntityMap = function decodeRawEntityMap(rawState) {
  var rawEntityMap = rawState.entityMap;

  var entityMap = {};

  // TODO: Update this once we completely remove DraftEntity
  Object.keys(rawEntityMap).forEach(function (rawEntityKey) {
    var _rawEntityMap$rawEnti = rawEntityMap[rawEntityKey],
        type = _rawEntityMap$rawEnti.type,
        mutability = _rawEntityMap$rawEnti.mutability,
        data = _rawEntityMap$rawEnti.data;

    // get the key reference to created entity

    entityMap[rawEntityKey] = DraftEntity.__create(type, mutability, data || {});
  });

  return entityMap;
};

var convertFromRawToDraftState = function convertFromRawToDraftState(rawState) {
  !Array.isArray(rawState.blocks) ? 'production' !== 'production' ? invariant(false, 'invalid RawDraftContentState') : invariant(false) : void 0;

  // decode entities
  var entityMap = decodeRawEntityMap(rawState);

  // decode blockMap
  var blockMap = decodeRawBlocks(rawState, entityMap);

  // create initial selection
  var selectionState = blockMap.isEmpty() ? new SelectionState() : SelectionState.createEmpty(blockMap.first().getKey());

  return new ContentState({
    blockMap: blockMap,
    entityMap: entityMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
};

module.exports = convertFromRawToDraftState;
},{"object-assign":82,"./ContentBlock":28,"./ContentBlockNode":87,"./ContentState":29,"./DraftEntity":34,"./DraftFeatureFlags":88,"./DraftTreeAdapter":109,"immutable":132,"./SelectionState":40,"./createCharacterList":110,"./decodeEntityRanges":111,"./decodeInlineStyleRanges":112,"./generateRandomKey":44,"fbjs/lib/invariant":79}],105:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getRangeBoundingClientRect
 * @format
 * 
 */

'use strict';

var getRangeClientRects = require('./getRangeClientRects');

/**
 * Like range.getBoundingClientRect() but normalizes for browser bugs.
 */
function getRangeBoundingClientRect(range) {
  // "Return a DOMRect object describing the smallest rectangle that includes
  // the first rectangle in list and all of the remaining rectangles of which
  // the height or width is not zero."
  // http://www.w3.org/TR/cssom-view/#dom-range-getboundingclientrect
  var rects = getRangeClientRects(range);
  var top = 0;
  var right = 0;
  var bottom = 0;
  var left = 0;

  if (rects.length) {
    // If the first rectangle has 0 width, we use the second, this is needed
    // because Chrome renders a 0 width rectangle when the selection contains
    // a line break.
    if (rects.length > 1 && rects[0].width === 0) {
      var _rects$ = rects[1];
      top = _rects$.top;
      right = _rects$.right;
      bottom = _rects$.bottom;
      left = _rects$.left;
    } else {
      var _rects$2 = rects[0];
      top = _rects$2.top;
      right = _rects$2.right;
      bottom = _rects$2.bottom;
      left = _rects$2.left;
    }

    for (var ii = 1; ii < rects.length; ii++) {
      var rect = rects[ii];
      if (rect.height !== 0 && rect.width !== 0) {
        top = Math.min(top, rect.top);
        right = Math.max(right, rect.right);
        bottom = Math.max(bottom, rect.bottom);
        left = Math.min(left, rect.left);
      }
    }
  }

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: right - left,
    height: bottom - top
  };
}

module.exports = getRangeBoundingClientRect;
},{"./getRangeClientRects":145}],46:[function(require,module,exports) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getVisibleSelectionRect
 * @format
 * 
 */

'use strict';

var getRangeBoundingClientRect = require('./getRangeBoundingClientRect');

/**
 * Return the bounding ClientRect for the visible DOM selection, if any.
 * In cases where there are no selected ranges or the bounding rect is
 * temporarily invalid, return null.
 */
function getVisibleSelectionRect(global) {
  var selection = global.getSelection();
  if (!selection.rangeCount) {
    return null;
  }

  var range = selection.getRangeAt(0);
  var boundingRect = getRangeBoundingClientRect(range);
  var top = boundingRect.top,
      right = boundingRect.right,
      bottom = boundingRect.bottom,
      left = boundingRect.left;

  // When a re-render leads to a node being removed, the DOM selection will
  // temporarily be placed on an ancestor node, which leads to an invalid
  // bounding rect. Discard this state.

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return null;
  }

  return boundingRect;
}

module.exports = getVisibleSelectionRect;
},{"./getRangeBoundingClientRect":105}],9:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Draft
 * @format
 * 
 */

'use strict';

var AtomicBlockUtils = require('./AtomicBlockUtils');
var BlockMapBuilder = require('./BlockMapBuilder');
var CharacterMetadata = require('./CharacterMetadata');
var CompositeDraftDecorator = require('./CompositeDraftDecorator');
var ContentBlock = require('./ContentBlock');
var ContentState = require('./ContentState');
var DefaultDraftBlockRenderMap = require('./DefaultDraftBlockRenderMap');
var DefaultDraftInlineStyle = require('./DefaultDraftInlineStyle');
var DraftEditor = require('./DraftEditor.react');
var DraftEditorBlock = require('./DraftEditorBlock.react');
var DraftEntity = require('./DraftEntity');
var DraftModifier = require('./DraftModifier');
var DraftEntityInstance = require('./DraftEntityInstance');
var EditorState = require('./EditorState');
var KeyBindingUtil = require('./KeyBindingUtil');
var RichTextEditorUtil = require('./RichTextEditorUtil');
var SelectionState = require('./SelectionState');

var convertFromDraftStateToRaw = require('./convertFromDraftStateToRaw');
var convertFromHTMLToContentBlocks = require('./convertFromHTMLToContentBlocks');
var convertFromRawToDraftState = require('./convertFromRawToDraftState');
var generateRandomKey = require('./generateRandomKey');
var getDefaultKeyBinding = require('./getDefaultKeyBinding');
var getVisibleSelectionRect = require('./getVisibleSelectionRect');

var DraftPublic = {
  Editor: DraftEditor,
  EditorBlock: DraftEditorBlock,
  EditorState: EditorState,

  CompositeDecorator: CompositeDraftDecorator,
  Entity: DraftEntity,
  EntityInstance: DraftEntityInstance,

  BlockMapBuilder: BlockMapBuilder,
  CharacterMetadata: CharacterMetadata,
  ContentBlock: ContentBlock,
  ContentState: ContentState,
  SelectionState: SelectionState,

  AtomicBlockUtils: AtomicBlockUtils,
  KeyBindingUtil: KeyBindingUtil,
  Modifier: DraftModifier,
  RichUtils: RichTextEditorUtil,

  DefaultDraftBlockRenderMap: DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle: DefaultDraftInlineStyle,

  convertFromHTML: convertFromHTMLToContentBlocks,
  convertFromRaw: convertFromRawToDraftState,
  convertToRaw: convertFromDraftStateToRaw,
  genKey: generateRandomKey,
  getDefaultKeyBinding: getDefaultKeyBinding,
  getVisibleSelectionRect: getVisibleSelectionRect
};

module.exports = DraftPublic;
},{"./AtomicBlockUtils":24,"./BlockMapBuilder":25,"./CharacterMetadata":26,"./CompositeDraftDecorator":27,"./ContentBlock":28,"./ContentState":29,"./DefaultDraftBlockRenderMap":30,"./DefaultDraftInlineStyle":31,"./DraftEditor.react":32,"./DraftEditorBlock.react":33,"./DraftEntity":34,"./DraftModifier":35,"./DraftEntityInstance":36,"./EditorState":37,"./KeyBindingUtil":38,"./RichTextEditorUtil":39,"./SelectionState":40,"./convertFromDraftStateToRaw":41,"./convertFromHTMLToContentBlocks":42,"./convertFromRawToDraftState":43,"./generateRandomKey":44,"./getDefaultKeyBinding":45,"./getVisibleSelectionRect":46}],6:[function(require,module,exports) {

},{}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_React$Component) {
  _inherits(Cursor, _React$Component);

  function Cursor() {
    _classCallCheck(this, Cursor);

    return _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).apply(this, arguments));
  }

  _createClass(Cursor, [{
    key: 'render',
    value: function render() {
      var style = {
        animation: 'blink-empty 1s infinite',
        borderLeft: 'transparent solid 1px'
      };
      return _react2.default.createElement(
        'span',
        { 'data-offset-key': this.props.offsetkey },
        this.props.children,
        _react2.default.createElement('span', { className: 'cursor', contentEditable: false, readOnly: true, style: style })
      );
    }
  }]);

  return Cursor;
}(_react2.default.Component);

function strategy(contentBlock, cb, contentState) {
  if (!contentState) return;
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    if (entityKey === null) {
      return false;
    }
    var entity = contentState.getEntity(entityKey);
    var entityType = entity.getType();
    var entityData = entity.getData();
    return entityType === 'CURSOR';
  }, cb);
}

var decorator = exports.decorator = new _draftJs.CompositeDecorator([{
  strategy: strategy,
  component: Cursor
}]);
},{"react":8,"draft-js":9}],71:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = exports.colors = ['#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9'];
},{}],78:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],20:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"fbjs/lib/emptyFunction":80,"fbjs/lib/invariant":79,"./lib/ReactPropTypesSecret":78}],10:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if ('production' !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}
},{"./factoryWithThrowingShims":20}],135:[function(require,module,exports) {
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

},{}],73:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCursorStyle = undefined;

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var destroyElement = function destroyElement(element) {
  element.parentNode.removeChild(element);
};

var createDummyElement = function createDummyElement(parent, focusOffset, text) {
  var elem = parent.querySelector('[data-text="true"]');
  var clone = elem.cloneNode();
  console.log(clone);
  clone.innerText = text.slice(0, focusOffset);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.top = 0;
  clone.style.left = 0;
  parent.appendChild(clone);

  return clone;
};

var cache = new Map();

var getRect = function getRect(selection, text) {
  console.log(cache);
  var focusKey = selection.focusKey,
      focusOffset = selection.focusOffset;

  var cacheKey = focusKey + '-' + focusOffset;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  var offsetKey = _DraftOffsetKey2.default.encode(focusKey, 0, 0);
  var elem = document.querySelector('[data-offset-key="' + offsetKey + '"] span');
  if (elem) {
    var clone = createDummyElement(elem, focusOffset, text);
    var rect = clone.getBoundingClientRect();
    if (rect) {
      cache.set(cacheKey, rect);
    }
    destroyElement(clone);
  }
  return cache.has(cacheKey) ? cache.get(cacheKey) : undefined;
};

var getCursorStyle = exports.getCursorStyle = function getCursorStyle(editorState, selection) {
  var text = editorState.getCurrentContent().getBlockForKey(selection.focusKey).getText();
  var rect = getRect(selection, text);
  if (rect) {
    return {
      left: rect.left + rect.width,
      top: rect.top,
      height: rect.height
    };
  }
  return undefined;
};
},{"draft-js/lib/DraftOffsetKey":107}],213:[function(require,module,exports) {
'use strict'

/**
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
function diff_match_patch() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
}


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/** @typedef {{0: number, 1: string}} */
diff_match_patch.Diff;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var a = this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastequality && (lastequality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastequality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastequality = null;
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastequality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastequality = null;
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
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
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
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
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] = patch.diffs[y].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      // Create one of several smaller patches.
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push([DIFF_EQUAL, precontext]);
      }
      while (bigpatch.diffs.length !== 0 &&
             patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                   patch.diffs[0][0] == DIFF_EQUAL &&
                   diff_text.length > 2 * patch_size) {
          // This is a large deletion.  Let it pass in one chunk.
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push([diff_type, diff_text]);
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.substring(0,
              patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push([diff_type, diff_text]);
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] =
                bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = this.diff_text2(patch.diffs);
      precontext =
          precontext.substring(precontext.length - this.Patch_Margin);
      // Append the end context for this patch.
      var postcontext = this.diff_text1(bigpatch.diffs)
                            .substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 &&
            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push([DIFF_EQUAL, postcontext]);
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emmulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indicies are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// The following export code was added by @ForbesLindesay
module.exports = diff_match_patch;
module.exports['diff_match_patch'] = diff_match_patch;
module.exports['DIFF_DELETE'] = DIFF_DELETE;
module.exports['DIFF_INSERT'] = DIFF_INSERT;
module.exports['DIFF_EQUAL'] = DIFF_EQUAL;

},{}],216:[function(require,module,exports) {
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};
},{}],221:[function(require,module,exports) {
'use strict'

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

},{}],219:[function(require,module,exports) {
/* MIT license */
var cssKeywords = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max * 1000) / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

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
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

},{"color-name":221}],220:[function(require,module,exports) {
var conversions = require('./conversions');

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};


},{"./conversions":219}],218:[function(require,module,exports) {
var conversions = require('./conversions');
var route = require('./route');

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

},{"./conversions":219,"./route":220}],217:[function(require,module,exports) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

const colorConvert = require('color-convert');

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return '\x1B[' + (code + offset) + 'm';
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return '\x1B[' + (38 + offset) + ';5;' + code + 'm';
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return '\x1B[' + (38 + offset) + ';2;' + rgb[0] + ';' + rgb[1] + ';' + rgb[2] + 'm';
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: '\x1B[' + style[0] + 'm',
				close: '\x1B[' + style[1] + 'm'
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\x1B[39m';
	styles.bgColor.close = '\x1B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (_typeof(colorConvert[key]) !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});
},{"color-convert":218}],215:[function(require,module,exports) {
'use strict';

module.exports = {
	stdout: false,
	stderr: false
};
},{}],214:[function(require,module,exports) {
'use strict';

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([['n', '\n'], ['r', '\r'], ['t', '\t'], ['b', '\b'], ['f', '\f'], ['v', '\v'], ['0', '\0'], ['\\', '\\'], ['e', '\x1B'], ['a', '\x07']]);

function unescape(c) {
	if (c[0] === 'u' && c.length === 5 || c[0] === 'x' && c.length === 3) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if (matches = chunk.match(STRING_REGEX)) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error('Invalid Chalk template style argument: ' + chunk + ' (in style \'' + name + '\')');
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error('Unknown Chalk style: ' + styleName);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({ inverse: inverse, styles: parseStyle(style) });
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = 'Chalk template literal is missing ' + styles.length + ' closing bracket' + (styles.length === 1 ? '' : 's') + ' (`}`)';
		throw new Error(errMsg);
	}

	return chunks.join('');
};
},{}],212:[function(require,module,exports) {
var process = require("process");
'use strict';

const escapeStringRegexp = require('escape-string-regexp');
const ansiStyles = require('ansi-styles');
const stdoutColor = require('supports-color').stdout;

const template = require('./templates.js');

const isSimpleWindowsTerm = process.platform === 'win32' && !('xterm-256color' || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\x1B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get: function () {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get: function () {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get: function () {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open: open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get: function () {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open: open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get: function () {
			return self.level;
		},
		set: function (level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get: function () {
			return self.enabled;
		},
		set: function (enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, code.close + '$&' + code.open);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript
},{"escape-string-regexp":216,"ansi-styles":217,"supports-color":215,"./templates.js":214,"process":205}],209:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = exports.reverse = exports.unpatch = exports.patch = exports.diff = exports.dateReviver = exports.create = exports.console = exports.formatters = exports.DiffPatcher = undefined;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _diffMatchPatch = require('diff-match-patch');

var _diffMatchPatch2 = _interopRequireDefault(_diffMatchPatch);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
};

var Processor = function () {
  function Processor(options) {
    classCallCheck(this, Processor);

    this.selfOptions = options || {};
    this.pipes = {};
  }

  createClass(Processor, [{
    key: 'options',
    value: function options(_options) {
      if (_options) {
        this.selfOptions = _options;
      }
      return this.selfOptions;
    }
  }, {
    key: 'pipe',
    value: function pipe(name, pipeArg) {
      var pipe = pipeArg;
      if (typeof name === 'string') {
        if (typeof pipe === 'undefined') {
          return this.pipes[name];
        } else {
          this.pipes[name] = pipe;
        }
      }
      if (name && name.name) {
        pipe = name;
        if (pipe.processor === this) {
          return pipe;
        }
        this.pipes[pipe.name] = pipe;
      }
      pipe.processor = this;
      return pipe;
    }
  }, {
    key: 'process',
    value: function process(input, pipe) {
      var context = input;
      context.options = this.options();
      var nextPipe = pipe || input.pipe || 'default';
      var lastPipe = void 0;
      var lastContext = void 0;
      while (nextPipe) {
        if (typeof context.nextAfterChildren !== 'undefined') {
          // children processed and coming back to parent
          context.next = context.nextAfterChildren;
          context.nextAfterChildren = null;
        }

        if (typeof nextPipe === 'string') {
          nextPipe = this.pipe(nextPipe);
        }
        nextPipe.process(context);
        lastContext = context;
        lastPipe = nextPipe;
        nextPipe = null;
        if (context) {
          if (context.next) {
            context = context.next;
            nextPipe = lastContext.nextPipe || context.pipe || lastPipe;
          }
        }
      }
      return context.hasResult ? context.result : undefined;
    }
  }]);
  return Processor;
}();

var Pipe = function () {
  function Pipe(name) {
    classCallCheck(this, Pipe);

    this.name = name;
    this.filters = [];
  }

  createClass(Pipe, [{
    key: 'process',
    value: function process(input) {
      if (!this.processor) {
        throw new Error('add this pipe to a processor before using it');
      }
      var debug = this.debug;
      var length = this.filters.length;
      var context = input;
      for (var index = 0; index < length; index++) {
        var filter = this.filters[index];
        if (debug) {
          this.log('filter: ' + filter.filterName);
        }
        filter(context);
        if ((typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' && context.exiting) {
          context.exiting = false;
          break;
        }
      }
      if (!context.next && this.resultCheck) {
        this.resultCheck(context);
      }
    }
  }, {
    key: 'log',
    value: function log(msg) {
      console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
    }
  }, {
    key: 'append',
    value: function append() {
      var _filters;

      (_filters = this.filters).push.apply(_filters, arguments);
      return this;
    }
  }, {
    key: 'prepend',
    value: function prepend() {
      var _filters2;

      (_filters2 = this.filters).unshift.apply(_filters2, arguments);
      return this;
    }
  }, {
    key: 'indexOf',
    value: function indexOf(filterName) {
      if (!filterName) {
        throw new Error('a filter name is required');
      }
      for (var index = 0; index < this.filters.length; index++) {
        var filter = this.filters[index];
        if (filter.filterName === filterName) {
          return index;
        }
      }
      throw new Error('filter not found: ' + filterName);
    }
  }, {
    key: 'list',
    value: function list() {
      return this.filters.map(function (f) {
        return f.filterName;
      });
    }
  }, {
    key: 'after',
    value: function after(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index + 1, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'before',
    value: function before(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 0);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'replace',
    value: function replace(filterName) {
      var index = this.indexOf(filterName);
      var params = Array.prototype.slice.call(arguments, 1);
      if (!params.length) {
        throw new Error('a filter is required');
      }
      params.unshift(index, 1);
      Array.prototype.splice.apply(this.filters, params);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove(filterName) {
      var index = this.indexOf(filterName);
      this.filters.splice(index, 1);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.filters.length = 0;
      return this;
    }
  }, {
    key: 'shouldHaveResult',
    value: function shouldHaveResult(should) {
      if (should === false) {
        this.resultCheck = null;
        return;
      }
      if (this.resultCheck) {
        return;
      }
      var pipe = this;
      this.resultCheck = function (context) {
        if (!context.hasResult) {
          console.log(context);
          var error = new Error(pipe.name + ' failed');
          error.noResult = true;
          throw error;
        }
      };
      return this;
    }
  }]);
  return Pipe;
}();

var Context = function () {
  function Context() {
    classCallCheck(this, Context);
  }

  createClass(Context, [{
    key: 'setResult',
    value: function setResult(result) {
      this.result = result;
      this.hasResult = true;
      return this;
    }
  }, {
    key: 'exit',
    value: function exit() {
      this.exiting = true;
      return this;
    }
  }, {
    key: 'switchTo',
    value: function switchTo(next, pipe) {
      if (typeof next === 'string' || next instanceof Pipe) {
        this.nextPipe = next;
      } else {
        this.next = next;
        if (pipe) {
          this.nextPipe = pipe;
        }
      }
      return this;
    }
  }, {
    key: 'push',
    value: function push(child, name) {
      child.parent = this;
      if (typeof name !== 'undefined') {
        child.childName = name;
      }
      child.root = this.root || this;
      child.options = child.options || this.options;
      if (!this.children) {
        this.children = [child];
        this.nextAfterChildren = this.next || null;
        this.next = child;
      } else {
        this.children[this.children.length - 1].next = child;
        this.children.push(child);
      }
      child.next = this;
      return this;
    }
  }]);
  return Context;
}();

var isArray = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};

function cloneRegExp(re) {
  var regexMatch = /^\/(.*)\/([gimyu]*)$/.exec(re.toString());
  return new RegExp(regexMatch[1], regexMatch[2]);
}

function clone(arg) {
  if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) !== 'object') {
    return arg;
  }
  if (arg === null) {
    return null;
  }
  if (isArray(arg)) {
    return arg.map(clone);
  }
  if (arg instanceof Date) {
    return new Date(arg.getTime());
  }
  if (arg instanceof RegExp) {
    return cloneRegExp(arg);
  }
  var cloned = {};
  for (var name in arg) {
    if (Object.prototype.hasOwnProperty.call(arg, name)) {
      cloned[name] = clone(arg[name]);
    }
  }
  return cloned;
}

var DiffContext = function (_Context) {
  inherits(DiffContext, _Context);

  function DiffContext(left, right) {
    classCallCheck(this, DiffContext);

    var _this = possibleConstructorReturn(this, (DiffContext.__proto__ || Object.getPrototypeOf(DiffContext)).call(this));

    _this.left = left;
    _this.right = right;
    _this.pipe = 'diff';
    return _this;
  }

  createClass(DiffContext, [{
    key: 'setResult',
    value: function setResult(result) {
      if (this.options.cloneDiffValues && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
        var clone$$1 = typeof this.options.cloneDiffValues === 'function' ? this.options.cloneDiffValues : clone;
        if (_typeof(result[0]) === 'object') {
          result[0] = clone$$1(result[0]);
        }
        if (_typeof(result[1]) === 'object') {
          result[1] = clone$$1(result[1]);
        }
      }
      return Context.prototype.setResult.apply(this, arguments);
    }
  }]);
  return DiffContext;
}(Context);

var PatchContext = function (_Context) {
  inherits(PatchContext, _Context);

  function PatchContext(left, delta) {
    classCallCheck(this, PatchContext);

    var _this = possibleConstructorReturn(this, (PatchContext.__proto__ || Object.getPrototypeOf(PatchContext)).call(this));

    _this.left = left;
    _this.delta = delta;
    _this.pipe = 'patch';
    return _this;
  }

  return PatchContext;
}(Context);

var ReverseContext = function (_Context) {
  inherits(ReverseContext, _Context);

  function ReverseContext(delta) {
    classCallCheck(this, ReverseContext);

    var _this = possibleConstructorReturn(this, (ReverseContext.__proto__ || Object.getPrototypeOf(ReverseContext)).call(this));

    _this.delta = delta;
    _this.pipe = 'reverse';
    return _this;
  }

  return ReverseContext;
}(Context);

var isArray$1 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};

var diffFilter = function trivialMatchesDiffFilter(context) {
  if (context.left === context.right) {
    context.setResult(undefined).exit();
    return;
  }
  if (typeof context.left === 'undefined') {
    if (typeof context.right === 'function') {
      throw new Error('functions are not supported');
    }
    context.setResult([context.right]).exit();
    return;
  }
  if (typeof context.right === 'undefined') {
    context.setResult([context.left, 0, 0]).exit();
    return;
  }
  if (typeof context.left === 'function' || typeof context.right === 'function') {
    throw new Error('functions are not supported');
  }
  context.leftType = context.left === null ? 'null' : _typeof(context.left);
  context.rightType = context.right === null ? 'null' : _typeof(context.right);
  if (context.leftType !== context.rightType) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'boolean' || context.leftType === 'number') {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'object') {
    context.leftIsArray = isArray$1(context.left);
  }
  if (context.rightType === 'object') {
    context.rightIsArray = isArray$1(context.right);
  }
  if (context.leftIsArray !== context.rightIsArray) {
    context.setResult([context.left, context.right]).exit();
    return;
  }

  if (context.left instanceof RegExp) {
    if (context.right instanceof RegExp) {
      context.setResult([context.left.toString(), context.right.toString()]).exit();
    } else {
      context.setResult([context.left, context.right]).exit();
    }
  }
};
diffFilter.filterName = 'trivial';

var patchFilter = function trivialMatchesPatchFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.left).exit();
    return;
  }
  context.nested = !isArray$1(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult(context.delta[0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    if (context.left instanceof RegExp) {
      var regexArgs = /^\/(.*)\/([gimyu]+)$/.exec(context.delta[1]);
      if (regexArgs) {
        context.setResult(new RegExp(regexArgs[1], regexArgs[2])).exit();
        return;
      }
    }
    context.setResult(context.delta[1]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult(undefined).exit();
  }
};
patchFilter.filterName = 'trivial';

var reverseFilter = function trivialReferseFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.delta).exit();
    return;
  }
  context.nested = !isArray$1(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult([context.delta[0], 0, 0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult([context.delta[1], context.delta[0]]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult([context.delta[0]]).exit();
  }
};
reverseFilter.filterName = 'trivial';

function collectChildrenDiffFilter(context) {
  if (!context || !context.children) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var result = context.result;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (typeof child.result === 'undefined') {
      continue;
    }
    result = result || {};
    result[child.childName] = child.result;
  }
  if (result && context.leftIsArray) {
    result._t = 'a';
  }
  context.setResult(result).exit();
}
collectChildrenDiffFilter.filterName = 'collectChildren';

function objectsDiffFilter(context) {
  if (context.leftIsArray || context.leftType !== 'object') {
    return;
  }

  var name = void 0;
  var child = void 0;
  var propertyFilter = context.options.propertyFilter;
  for (name in context.left) {
    if (!Object.prototype.hasOwnProperty.call(context.left, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    child = new DiffContext(context.left[name], context.right[name]);
    context.push(child, name);
  }
  for (name in context.right) {
    if (!Object.prototype.hasOwnProperty.call(context.right, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    if (typeof context.left[name] === 'undefined') {
      child = new DiffContext(undefined, context.right[name]);
      context.push(child, name);
    }
  }

  if (!context.children || context.children.length === 0) {
    context.setResult(undefined).exit();
    return;
  }
  context.exit();
}
objectsDiffFilter.filterName = 'objects';

var patchFilter$1 = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    child = new PatchContext(context.left[name], context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
patchFilter$1.filterName = 'objects';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (Object.prototype.hasOwnProperty.call(context.left, child.childName) && child.result === undefined) {
      delete context.left[child.childName];
    } else if (context.left[child.childName] !== child.result) {
      context.left[child.childName] = child.result;
    }
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';

var reverseFilter$1 = function nestedReverseFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter$1.filterName = 'objects';

function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var delta = {};
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (delta[child.childName] !== child.result) {
      delta[child.childName] = child.result;
    }
  }
  context.setResult(delta).exit();
}
collectChildrenReverseFilter.filterName = 'collectChildren';

/*

LCS implementation that supports arrays or strings

reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

*/

var defaultMatch = function defaultMatch(array1, array2, index1, index2) {
  return array1[index1] === array2[index2];
};

var lengthMatrix = function lengthMatrix(array1, array2, match, context) {
  var len1 = array1.length;
  var len2 = array2.length;
  var x = void 0,
      y = void 0;

  // initialize empty matrix of len1+1 x len2+1
  var matrix = [len1 + 1];
  for (x = 0; x < len1 + 1; x++) {
    matrix[x] = [len2 + 1];
    for (y = 0; y < len2 + 1; y++) {
      matrix[x][y] = 0;
    }
  }
  matrix.match = match;
  // save sequence lengths for each coordinate
  for (x = 1; x < len1 + 1; x++) {
    for (y = 1; y < len2 + 1; y++) {
      if (match(array1, array2, x - 1, y - 1, context)) {
        matrix[x][y] = matrix[x - 1][y - 1] + 1;
      } else {
        matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
      }
    }
  }
  return matrix;
};

var backtrack = function backtrack(matrix, array1, array2, index1, index2, context) {
  if (index1 === 0 || index2 === 0) {
    return {
      sequence: [],
      indices1: [],
      indices2: []
    };
  }

  if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
    var subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);
    subsequence.sequence.push(array1[index1 - 1]);
    subsequence.indices1.push(index1 - 1);
    subsequence.indices2.push(index2 - 1);
    return subsequence;
  }

  if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
    return backtrack(matrix, array1, array2, index1, index2 - 1, context);
  } else {
    return backtrack(matrix, array1, array2, index1 - 1, index2, context);
  }
};

var get$1 = function get(array1, array2, match, context) {
  var innerContext = context || {};
  var matrix = lengthMatrix(array1, array2, match || defaultMatch, innerContext);
  var result = backtrack(matrix, array1, array2, array1.length, array2.length, innerContext);
  if (typeof array1 === 'string' && typeof array2 === 'string') {
    result.sequence = result.sequence.join('');
  }
  return result;
};

var lcs = {
  get: get$1
};

var ARRAY_MOVE = 3;

var isArray$2 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};

var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ? function (array, item) {
  return array.indexOf(item);
} : function (array, item) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
};

function arraysHaveMatchByRef(array1, array2, len1, len2) {
  for (var index1 = 0; index1 < len1; index1++) {
    var val1 = array1[index1];
    for (var index2 = 0; index2 < len2; index2++) {
      var val2 = array2[index2];
      if (index1 !== index2 && val1 === val2) {
        return true;
      }
    }
  }
}

function matchItems(array1, array2, index1, index2, context) {
  var value1 = array1[index1];
  var value2 = array2[index2];
  if (value1 === value2) {
    return true;
  }
  if ((typeof value1 === 'undefined' ? 'undefined' : _typeof(value1)) !== 'object' || (typeof value2 === 'undefined' ? 'undefined' : _typeof(value2)) !== 'object') {
    return false;
  }
  var objectHash = context.objectHash;
  if (!objectHash) {
    // no way to match objects was provided, try match by position
    return context.matchByPosition && index1 === index2;
  }
  var hash1 = void 0;
  var hash2 = void 0;
  if (typeof index1 === 'number') {
    context.hashCache1 = context.hashCache1 || [];
    hash1 = context.hashCache1[index1];
    if (typeof hash1 === 'undefined') {
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    }
  } else {
    hash1 = objectHash(value1);
  }
  if (typeof hash1 === 'undefined') {
    return false;
  }
  if (typeof index2 === 'number') {
    context.hashCache2 = context.hashCache2 || [];
    hash2 = context.hashCache2[index2];
    if (typeof hash2 === 'undefined') {
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    }
  } else {
    hash2 = objectHash(value2);
  }
  if (typeof hash2 === 'undefined') {
    return false;
  }
  return hash1 === hash2;
}

var diffFilter$1 = function arraysDiffFilter(context) {
  if (!context.leftIsArray) {
    return;
  }

  var matchContext = {
    objectHash: context.options && context.options.objectHash,
    matchByPosition: context.options && context.options.matchByPosition
  };
  var commonHead = 0;
  var commonTail = 0;
  var index = void 0;
  var index1 = void 0;
  var index2 = void 0;
  var array1 = context.left;
  var array2 = context.right;
  var len1 = array1.length;
  var len2 = array2.length;

  var child = void 0;

  if (len1 > 0 && len2 > 0 && !matchContext.objectHash && typeof matchContext.matchByPosition !== 'boolean') {
    matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
  }

  // separate common head
  while (commonHead < len1 && commonHead < len2 && matchItems(array1, array2, commonHead, commonHead, matchContext)) {
    index = commonHead;
    child = new DiffContext(context.left[index], context.right[index]);
    context.push(child, index);
    commonHead++;
  }
  // separate common tail
  while (commonTail + commonHead < len1 && commonTail + commonHead < len2 && matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
    index1 = len1 - 1 - commonTail;
    index2 = len2 - 1 - commonTail;
    child = new DiffContext(context.left[index1], context.right[index2]);
    context.push(child, index2);
    commonTail++;
  }
  var result = void 0;
  if (commonHead + commonTail === len1) {
    if (len1 === len2) {
      // arrays are identical
      context.setResult(undefined).exit();
      return;
    }
    // trivial case, a block (1 or more consecutive items) was added
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len2 - commonTail; index++) {
      result[index] = [array2[index]];
    }
    context.setResult(result).exit();
    return;
  }
  if (commonHead + commonTail === len2) {
    // trivial case, a block (1 or more consecutive items) was removed
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      result['_' + index] = [array1[index], 0, 0];
    }
    context.setResult(result).exit();
    return;
  }
  // reset hash cache
  delete matchContext.hashCache1;
  delete matchContext.hashCache2;

  // diff is not trivial, find the LCS (Longest Common Subsequence)
  var trimmed1 = array1.slice(commonHead, len1 - commonTail);
  var trimmed2 = array2.slice(commonHead, len2 - commonTail);
  var seq = lcs.get(trimmed1, trimmed2, matchItems, matchContext);
  var removedItems = [];
  result = result || {
    _t: 'a'
  };
  for (index = commonHead; index < len1 - commonTail; index++) {
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      // removed
      result['_' + index] = [array1[index], 0, 0];
      removedItems.push(index);
    }
  }

  var detectMove = true;
  if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
    detectMove = false;
  }
  var includeValueOnMove = false;
  if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
    includeValueOnMove = true;
  }

  var removedItemsLength = removedItems.length;
  for (index = commonHead; index < len2 - commonTail; index++) {
    var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
    if (indexOnArray2 < 0) {
      // added, try to match with a removed item and register as position move
      var isMove = false;
      if (detectMove && removedItemsLength > 0) {
        for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
          index1 = removedItems[removeItemIndex1];
          if (matchItems(trimmed1, trimmed2, index1 - commonHead, index - commonHead, matchContext)) {
            // store position move as: [originalValue, newPosition, ARRAY_MOVE]
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);
            if (!includeValueOnMove) {
              // don't include moved value on diff, to save bytes
              result['_' + index1][0] = '';
            }

            index2 = index;
            child = new DiffContext(context.left[index1], context.right[index2]);
            context.push(child, index2);
            removedItems.splice(removeItemIndex1, 1);
            isMove = true;
            break;
          }
        }
      }
      if (!isMove) {
        // added
        result[index] = [array2[index]];
      }
    } else {
      // match, do inner diff
      index1 = seq.indices1[indexOnArray2] + commonHead;
      index2 = seq.indices2[indexOnArray2] + commonHead;
      child = new DiffContext(context.left[index1], context.right[index2]);
      context.push(child, index2);
    }
  }

  context.setResult(result).exit();
};
diffFilter$1.filterName = 'arrays';

var compare = {
  numerically: function numerically(a, b) {
    return a - b;
  },
  numericallyBy: function numericallyBy(name) {
    return function (a, b) {
      return a[name] - b[name];
    };
  }
};

var patchFilter$2 = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var index = void 0;
  var index1 = void 0;

  var delta = context.delta;
  var array = context.left;

  // first, separate removals, insertions and modifications
  var toRemove = [];
  var toInsert = [];
  var toModify = [];
  for (index in delta) {
    if (index !== '_t') {
      if (index[0] === '_') {
        // removed item from original array
        if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
          toRemove.push(parseInt(index.slice(1), 10));
        } else {
          throw new Error('only removal or move can be applied at original array indices,' + (' invalid diff type: ' + delta[index][2]));
        }
      } else {
        if (delta[index].length === 1) {
          // added item at new array
          toInsert.push({
            index: parseInt(index, 10),
            value: delta[index][0]
          });
        } else {
          // modified item at new array
          toModify.push({
            index: parseInt(index, 10),
            delta: delta[index]
          });
        }
      }
    }
  }

  // remove items, in reverse order to avoid sawing our own floor
  toRemove = toRemove.sort(compare.numerically);
  for (index = toRemove.length - 1; index >= 0; index--) {
    index1 = toRemove[index];
    var indexDiff = delta['_' + index1];
    var removedValue = array.splice(index1, 1)[0];
    if (indexDiff[2] === ARRAY_MOVE) {
      // reinsert later
      toInsert.push({
        index: indexDiff[1],
        value: removedValue
      });
    }
  }

  // insert items, in reverse order to avoid moving our own floor
  toInsert = toInsert.sort(compare.numericallyBy('index'));
  var toInsertLength = toInsert.length;
  for (index = 0; index < toInsertLength; index++) {
    var insertion = toInsert[index];
    array.splice(insertion.index, 0, insertion.value);
  }

  // apply modifications
  var toModifyLength = toModify.length;
  var child = void 0;
  if (toModifyLength > 0) {
    for (index = 0; index < toModifyLength; index++) {
      var modification = toModify[index];
      child = new PatchContext(context.left[modification.index], modification.delta);
      context.push(child, modification.index);
    }
  }

  if (!context.children) {
    context.setResult(context.left).exit();
    return;
  }
  context.exit();
};
patchFilter$2.filterName = 'arrays';

var collectChildrenPatchFilter$1 = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    context.left[child.childName] = child.result;
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter$1.filterName = 'arraysCollectChildren';

var reverseFilter$2 = function arraysReverseFilter(context) {
  if (!context.nested) {
    if (context.delta[2] === ARRAY_MOVE) {
      context.newName = '_' + context.delta[1];
      context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
    }
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var name = void 0;
  var child = void 0;
  for (name in context.delta) {
    if (name === '_t') {
      continue;
    }
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter$2.filterName = 'arrays';

var reverseArrayDeltaIndex = function reverseArrayDeltaIndex(delta, index, itemDelta) {
  if (typeof index === 'string' && index[0] === '_') {
    return parseInt(index.substr(1), 10);
  } else if (isArray$2(itemDelta) && itemDelta[2] === 0) {
    return '_' + index;
  }

  var reverseIndex = +index;
  for (var deltaIndex in delta) {
    var deltaItem = delta[deltaIndex];
    if (isArray$2(deltaItem)) {
      if (deltaItem[2] === ARRAY_MOVE) {
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);
        var moveToIndex = deltaItem[1];
        if (moveToIndex === +index) {
          return moveFromIndex;
        }
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
          reverseIndex++;
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
          reverseIndex--;
        }
      } else if (deltaItem[2] === 0) {
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);
        if (deleteIndex <= reverseIndex) {
          reverseIndex++;
        }
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {
        reverseIndex--;
      }
    }
  }

  return reverseIndex;
};

function collectChildrenReverseFilter$1(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child = void 0;
  var delta = {
    _t: 'a'
  };

  for (var index = 0; index < length; index++) {
    child = context.children[index];
    var name = child.newName;
    if (typeof name === 'undefined') {
      name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
    }
    if (delta[name] !== child.result) {
      delta[name] = child.result;
    }
  }
  context.setResult(delta).exit();
}
collectChildrenReverseFilter$1.filterName = 'arraysCollectChildren';

var diffFilter$2 = function datesDiffFilter(context) {
  if (context.left instanceof Date) {
    if (context.right instanceof Date) {
      if (context.left.getTime() !== context.right.getTime()) {
        context.setResult([context.left, context.right]);
      } else {
        context.setResult(undefined);
      }
    } else {
      context.setResult([context.left, context.right]);
    }
    context.exit();
  } else if (context.right instanceof Date) {
    context.setResult([context.left, context.right]).exit();
  }
};
diffFilter$2.filterName = 'dates';

/* global diff_match_patch */
var TEXT_DIFF = 2;
var DEFAULT_MIN_LENGTH = 60;
var cachedDiffPatch = null;

var getDiffMatchPatch = function getDiffMatchPatch(required) {
  /* jshint camelcase: false */

  if (!cachedDiffPatch) {
    var instance = void 0;
    /* eslint-disable camelcase, new-cap */
    if (typeof diff_match_patch !== 'undefined') {
      // already loaded, probably a browser
      instance = typeof diff_match_patch === 'function' ? new diff_match_patch() : new diff_match_patch.diff_match_patch();
    } else if (_diffMatchPatch2.default) {
      try {
        instance = _diffMatchPatch2.default && new _diffMatchPatch2.default();
      } catch (err) {
        instance = null;
      }
    }
    /* eslint-enable camelcase, new-cap */
    if (!instance) {
      if (!required) {
        return null;
      }
      var error = new Error('text diff_match_patch library not found');
      // eslint-disable-next-line camelcase
      error.diff_match_patch_not_found = true;
      throw error;
    }
    cachedDiffPatch = {
      diff: function diff(txt1, txt2) {
        return instance.patch_toText(instance.patch_make(txt1, txt2));
      },
      patch: function patch(txt1, _patch) {
        var results = instance.patch_apply(instance.patch_fromText(_patch), txt1);
        for (var i = 0; i < results[1].length; i++) {
          if (!results[1][i]) {
            var _error = new Error('text patch failed');
            _error.textPatchFailed = true;
          }
        }
        return results[0];
      }
    };
  }
  return cachedDiffPatch;
};

var diffFilter$3 = function textsDiffFilter(context) {
  if (context.leftType !== 'string') {
    return;
  }
  var minLength = context.options && context.options.textDiff && context.options.textDiff.minLength || DEFAULT_MIN_LENGTH;
  if (context.left.length < minLength || context.right.length < minLength) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  // large text, try to use a text-diff algorithm
  var diffMatchPatch = getDiffMatchPatch();
  if (!diffMatchPatch) {
    // diff-match-patch library not available,
    // fallback to regular string replace
    context.setResult([context.left, context.right]).exit();
    return;
  }
  var diff = diffMatchPatch.diff;
  context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};
diffFilter$3.filterName = 'texts';

var patchFilter$3 = function textsPatchFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-patch algorithm
  var patch = getDiffMatchPatch(true).patch;
  context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter$3.filterName = 'texts';

var textDeltaReverse = function textDeltaReverse(delta) {
  var i = void 0;
  var l = void 0;
  var lines = void 0;
  var line = void 0;
  var lineTmp = void 0;
  var header = null;
  var headerRegex = /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;
  var lineHeader = void 0;
  lines = delta.split('\n');
  for (i = 0, l = lines.length; i < l; i++) {
    line = lines[i];
    var lineStart = line.slice(0, 1);
    if (lineStart === '@') {
      header = headerRegex.exec(line);
      lineHeader = i;

      // fix header
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else if (lineStart === '+') {
      lines[i] = '-' + lines[i].slice(1);
      if (lines[i - 1].slice(0, 1) === '+') {
        // swap lines to keep default order (-+)
        lineTmp = lines[i];
        lines[i] = lines[i - 1];
        lines[i - 1] = lineTmp;
      }
    } else if (lineStart === '-') {
      lines[i] = '+' + lines[i].slice(1);
    }
  }
  return lines.join('\n');
};

var reverseFilter$3 = function textsReverseFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-diff algorithm
  context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};
reverseFilter$3.filterName = 'texts';

var DiffPatcher = function () {
  function DiffPatcher(options) {
    classCallCheck(this, DiffPatcher);

    this.processor = new Processor(options);
    this.processor.pipe(new Pipe('diff').append(collectChildrenDiffFilter, diffFilter, diffFilter$2, diffFilter$3, objectsDiffFilter, diffFilter$1).shouldHaveResult());
    this.processor.pipe(new Pipe('patch').append(collectChildrenPatchFilter, collectChildrenPatchFilter$1, patchFilter, patchFilter$3, patchFilter$1, patchFilter$2).shouldHaveResult());
    this.processor.pipe(new Pipe('reverse').append(collectChildrenReverseFilter, collectChildrenReverseFilter$1, reverseFilter, reverseFilter$3, reverseFilter$1, reverseFilter$2).shouldHaveResult());
  }

  createClass(DiffPatcher, [{
    key: 'options',
    value: function options() {
      var _processor;

      return (_processor = this.processor).options.apply(_processor, arguments);
    }
  }, {
    key: 'diff',
    value: function diff(left, right) {
      return this.processor.process(new DiffContext(left, right));
    }
  }, {
    key: 'patch',
    value: function patch(left, delta) {
      return this.processor.process(new PatchContext(left, delta));
    }
  }, {
    key: 'reverse',
    value: function reverse(delta) {
      return this.processor.process(new ReverseContext(delta));
    }
  }, {
    key: 'unpatch',
    value: function unpatch(right, delta) {
      return this.patch(right, this.reverse(delta));
    }
  }, {
    key: 'clone',
    value: function clone$$1(value) {
      return clone(value);
    }
  }]);
  return DiffPatcher;
}();

var isArray$3 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return a instanceof Array;
};

var getObjectKeys = typeof Object.keys === 'function' ? function (obj) {
  return Object.keys(obj);
} : function (obj) {
  var names = [];
  for (var property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      names.push(property);
    }
  }
  return names;
};

var trimUnderscore = function trimUnderscore(str) {
  if (str.substr(0, 1) === '_') {
    return str.slice(1);
  }
  return str;
};

var arrayKeyToSortNumber = function arrayKeyToSortNumber(key) {
  if (key === '_t') {
    return -1;
  } else {
    if (key.substr(0, 1) === '_') {
      return parseInt(key.slice(1), 10);
    } else {
      return parseInt(key, 10) + 0.1;
    }
  }
};

var arrayKeyComparer = function arrayKeyComparer(key1, key2) {
  return arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
};

var BaseFormatter = function () {
  function BaseFormatter() {
    classCallCheck(this, BaseFormatter);
  }

  createClass(BaseFormatter, [{
    key: 'format',
    value: function format(delta, left) {
      var context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return this.finalize(context);
    }
  }, {
    key: 'prepareContext',
    value: function prepareContext(context) {
      context.buffer = [];
      context.out = function () {
        var _buffer;

        (_buffer = this.buffer).push.apply(_buffer, arguments);
      };
    }
  }, {
    key: 'typeFormattterNotFound',
    value: function typeFormattterNotFound(context, deltaType) {
      throw new Error('cannot format delta type: ' + deltaType);
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      return err.toString();
    }
  }, {
    key: 'finalize',
    value: function finalize(_ref) {
      var buffer = _ref.buffer;

      if (isArray$3(buffer)) {
        return buffer.join('');
      }
    }
  }, {
    key: 'recurse',
    value: function recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
      var useMoveOriginHere = delta && movedFrom;
      var leftValue = useMoveOriginHere ? movedFrom.value : left;

      if (typeof delta === 'undefined' && typeof key === 'undefined') {
        return undefined;
      }

      var type = this.getDeltaType(delta, movedFrom);
      var nodeType = type === 'node' ? delta._t === 'a' ? 'array' : 'object' : '';

      if (typeof key !== 'undefined') {
        this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootBegin(context, type, nodeType);
      }

      var typeFormattter = void 0;
      try {
        typeFormattter = this['format_' + type] || this.typeFormattterNotFound(context, type);
        typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
      } catch (err) {
        this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
        if (typeof console !== 'undefined' && console.error) {
          console.error(err.stack);
        }
      }

      if (typeof key !== 'undefined') {
        this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
      } else {
        this.rootEnd(context, type, nodeType);
      }
    }
  }, {
    key: 'formatDeltaChildren',
    value: function formatDeltaChildren(context, delta, left) {
      var self = this;
      this.forEachDeltaKey(delta, left, function (key, leftKey, movedFrom, isLast) {
        self.recurse(context, delta[key], left ? left[leftKey] : undefined, key, leftKey, movedFrom, isLast);
      });
    }
  }, {
    key: 'forEachDeltaKey',
    value: function forEachDeltaKey(delta, left, fn) {
      var keys = getObjectKeys(delta);
      var arrayKeys = delta._t === 'a';
      var moveDestinations = {};
      var name = void 0;
      if (typeof left !== 'undefined') {
        for (name in left) {
          if (Object.prototype.hasOwnProperty.call(left, name)) {
            if (typeof delta[name] === 'undefined' && (!arrayKeys || typeof delta['_' + name] === 'undefined')) {
              keys.push(name);
            }
          }
        }
      }
      // look for move destinations
      for (name in delta) {
        if (Object.prototype.hasOwnProperty.call(delta, name)) {
          var value = delta[name];
          if (isArray$3(value) && value[2] === 3) {
            moveDestinations[value[1].toString()] = {
              key: name,
              value: left && left[parseInt(name.substr(1))]
            };
            if (this.includeMoveDestinations !== false) {
              if (typeof left === 'undefined' && typeof delta[value[1]] === 'undefined') {
                keys.push(value[1].toString());
              }
            }
          }
        }
      }
      if (arrayKeys) {
        keys.sort(arrayKeyComparer);
      } else {
        keys.sort();
      }
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        if (arrayKeys && key === '_t') {
          continue;
        }
        var leftKey = arrayKeys ? typeof key === 'number' ? key : parseInt(trimUnderscore(key), 10) : key;
        var isLast = index === length - 1;
        fn(key, leftKey, moveDestinations[leftKey], isLast);
      }
    }
  }, {
    key: 'getDeltaType',
    value: function getDeltaType(delta, movedFrom) {
      if (typeof delta === 'undefined') {
        if (typeof movedFrom !== 'undefined') {
          return 'movedestination';
        }
        return 'unchanged';
      }
      if (isArray$3(delta)) {
        if (delta.length === 1) {
          return 'added';
        }
        if (delta.length === 2) {
          return 'modified';
        }
        if (delta.length === 3 && delta[2] === 0) {
          return 'deleted';
        }
        if (delta.length === 3 && delta[2] === 2) {
          return 'textdiff';
        }
        if (delta.length === 3 && delta[2] === 3) {
          return 'moved';
        }
      } else if ((typeof delta === 'undefined' ? 'undefined' : _typeof(delta)) === 'object') {
        return 'node';
      }
      return 'unknown';
    }
  }, {
    key: 'parseTextDiff',
    value: function parseTextDiff(value) {
      var output = [];
      var lines = value.split('\n@@ ');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        var lineOutput = {
          pieces: []
        };
        var location = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
        lineOutput.location = {
          line: location[0],
          chr: location[1]
        };
        var pieces = line.split('\n').slice(1);
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          if (!piece.length) {
            continue;
          }
          var pieceOutput = {
            type: 'context'
          };
          if (piece.substr(0, 1) === '+') {
            pieceOutput.type = 'added';
          } else if (piece.substr(0, 1) === '-') {
            pieceOutput.type = 'deleted';
          }
          pieceOutput.text = piece.slice(1);
          lineOutput.pieces.push(pieceOutput);
        }
        output.push(lineOutput);
      }
      return output;
    }
  }]);
  return BaseFormatter;
}();

var base = Object.freeze({
  default: BaseFormatter
});

var HtmlFormatter = function (_BaseFormatter) {
  inherits(HtmlFormatter, _BaseFormatter);

  function HtmlFormatter() {
    classCallCheck(this, HtmlFormatter);
    return possibleConstructorReturn(this, (HtmlFormatter.__proto__ || Object.getPrototypeOf(HtmlFormatter)).apply(this, arguments));
  }

  createClass(HtmlFormatter, [{
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.out('<pre class="jsondiffpatch-error">' + err + '</pre>');
    }
  }, {
    key: 'formatValue',
    value: function formatValue(context, value) {
      context.out('<pre>' + htmlEscape(JSON.stringify(value, null, 2)) + '</pre>');
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          /* global decodeURI */
          var piece = pieces[pieceIndex];
          context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + htmlEscape(decodeURI(piece.text)) + '</span>');
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      var nodeClass = 'jsondiffpatch-' + type + (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
      context.out('<div class="jsondiffpatch-delta ' + nodeClass + '">');
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context) {
      context.out('</div>' + (context.hasArrows ? '<script type="text/javascript">setTimeout(' + (adjustArrows.toString() + ',10);</script>') : ''));
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      var nodeClass = 'jsondiffpatch-' + type + (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
      context.out('<li class="' + nodeClass + '" data-key="' + leftKey + '">' + ('<div class="jsondiffpatch-property-name">' + leftKey + '</div>'));
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context) {
      context.out('</li>');
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

  }, {
    key: 'format_unchanged',
    value: function format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
  }, {
    key: 'format_movedestination',
    value: function format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, left);
      context.out('</div>');
    }
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      var nodeType = delta._t === 'a' ? 'array' : 'object';
      context.out('<ul class="jsondiffpatch-node jsondiffpatch-node-type-' + nodeType + '">');
      this.formatDeltaChildren(context, delta, left);
      context.out('</ul>');
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>' + '<div class="jsondiffpatch-value jsondiffpatch-right-value">');
      this.formatValue(context, delta[1]);
      context.out('</div>');
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div>');
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatValue(context, delta[0]);
      context.out('</div><div class="jsondiffpatch-moved-destination">' + delta[1] + '</div>');

      // draw an SVG arrow from here to move destination
      context.out(
      /* jshint multistr: true */
      '<div class="jsondiffpatch-arrow" ' + 'style="position: relative; left: -34px;">\n          <svg width="30" height="60" ' + 'style="position: absolute; display: none;">\n          <defs>\n              <marker id="markerArrow" markerWidth="8" markerHeight="8"\n                 refx="2" refy="4"\n                     orient="auto" markerUnits="userSpaceOnUse">\n                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />\n              </marker>\n          </defs>\n          <path d="M30,0 Q-10,25 26,50"\n            style="stroke: #88f; stroke-width: 2px; fill: none; ' + 'stroke-opacity: 0.5; marker-end: url(#markerArrow);"\n          ></path>\n          </svg>\n      </div>');
      context.hasArrows = true;
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff(context, delta) {
      context.out('<div class="jsondiffpatch-value">');
      this.formatTextDiffString(context, delta[0]);
      context.out('</div>');
    }
  }]);
  return HtmlFormatter;
}(BaseFormatter);

function htmlEscape(text) {
  var html = text;
  var replacements = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/'/g, '&apos;'], [/"/g, '&quot;']];
  for (var i = 0; i < replacements.length; i++) {
    html = html.replace(replacements[i][0], replacements[i][1]);
  }
  return html;
}

var adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(nodeArg) {
  var node = nodeArg || document;
  var getElementText = function getElementText(_ref) {
    var textContent = _ref.textContent,
        innerText = _ref.innerText;
    return textContent || innerText;
  };
  var eachByQuery = function eachByQuery(el, query, fn) {
    var elems = el.querySelectorAll(query);
    for (var i = 0, l = elems.length; i < l; i++) {
      fn(elems[i]);
    }
  };
  var eachChildren = function eachChildren(_ref2, fn) {
    var children = _ref2.children;

    for (var i = 0, l = children.length; i < l; i++) {
      fn(children[i], i);
    }
  };
  eachByQuery(node, '.jsondiffpatch-arrow', function (_ref3) {
    var parentNode = _ref3.parentNode,
        children = _ref3.children,
        style = _ref3.style;

    var arrowParent = parentNode;
    var svg = children[0];
    var path = svg.children[1];
    svg.style.display = 'none';
    var destination = getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination'));
    var container = arrowParent.parentNode;
    var destinationElem = void 0;
    eachChildren(container, function (child) {
      if (child.getAttribute('data-key') === destination) {
        destinationElem = child;
      }
    });
    if (!destinationElem) {
      return;
    }
    try {
      var distance = destinationElem.offsetTop - arrowParent.offsetTop;
      svg.setAttribute('height', Math.abs(distance) + 6);
      style.top = -8 + (distance > 0 ? 0 : distance) + 'px';
      var curve = distance > 0 ? 'M30,0 Q-10,' + Math.round(distance / 2) + ' 26,' + (distance - 4) : 'M30,' + -distance + ' Q-10,' + Math.round(-distance / 2) + ' 26,4';
      path.setAttribute('d', curve);
      svg.style.display = '';
    } catch (err) {}
  });
};

/* jshint camelcase: true */
/* eslint-enable camelcase */

var showUnchanged = function showUnchanged(show, node, delay) {
  var el = node || document.body;
  var prefix = 'jsondiffpatch-unchanged-';
  var classes = {
    showing: prefix + 'showing',
    hiding: prefix + 'hiding',
    visible: prefix + 'visible',
    hidden: prefix + 'hidden'
  };
  var list = el.classList;
  if (!list) {
    return;
  }
  if (!delay) {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    list.remove(classes.visible);
    list.remove(classes.hidden);
    if (show === false) {
      list.add(classes.hidden);
    }
    return;
  }
  if (show === false) {
    list.remove(classes.showing);
    list.add(classes.visible);
    setTimeout(function () {
      list.add(classes.hiding);
    }, 10);
  } else {
    list.remove(classes.hiding);
    list.add(classes.showing);
    list.remove(classes.hidden);
  }
  var intervalId = setInterval(function () {
    adjustArrows(el);
  }, 100);
  setTimeout(function () {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    if (show === false) {
      list.add(classes.hidden);
      list.remove(classes.visible);
    } else {
      list.add(classes.visible);
      list.remove(classes.hidden);
    }
    setTimeout(function () {
      list.remove(classes.visible);
      clearInterval(intervalId);
    }, delay + 400);
  }, delay);
};

var hideUnchanged = function hideUnchanged(node, delay) {
  return showUnchanged(false, node, delay);
};

var defaultInstance = void 0;

function format(delta, left) {
  if (!defaultInstance) {
    defaultInstance = new HtmlFormatter();
  }
  return defaultInstance.format(delta, left);
}

var html = Object.freeze({
  showUnchanged: showUnchanged,
  hideUnchanged: hideUnchanged,
  default: HtmlFormatter,
  format: format
});

var AnnotatedFormatter = function (_BaseFormatter) {
  inherits(AnnotatedFormatter, _BaseFormatter);

  function AnnotatedFormatter() {
    classCallCheck(this, AnnotatedFormatter);

    var _this = possibleConstructorReturn(this, (AnnotatedFormatter.__proto__ || Object.getPrototypeOf(AnnotatedFormatter)).call(this));

    _this.includeMoveDestinations = false;
    return _this;
  }

  createClass(AnnotatedFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(AnnotatedFormatter.prototype.__proto__ || Object.getPrototypeOf(AnnotatedFormatter.prototype), 'prepareContext', this).call(this, context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('&nbsp;&nbsp;');
      };
      context.row = function (json, htmlNote) {
        context.out('<tr><td style="white-space: nowrap;">' + '<pre class="jsondiffpatch-annotated-indent"' + ' style="display: inline-block">');
        context.out(context.indentPad);
        context.out('</pre><pre style="display: inline-block">');
        context.out(json);
        context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');
        context.out(htmlNote);
        context.out('</div></td></tr>');
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.row('', '<pre class="jsondiffpatch-error">' + err + '</pre>');
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.out('<ul class="jsondiffpatch-textdiff">');
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + piece.text + '</span>');
        }
        context.out('</div></li>');
      }
      context.out('</ul>');
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      context.out('<table class="jsondiffpatch-annotated-delta">');
      if (type === 'node') {
        context.row('{');
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context, type) {
      if (type === 'node') {
        context.indent(-1);
        context.row('}');
      }
      context.out('</table>');
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      context.row('&quot;' + key + '&quot;: {');
      if (type === 'node') {
        context.indent();
      }
      if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      }
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
      }
      context.row('}' + (isLast ? '' : ','));
    }

    /* jshint camelcase: false */

    /* eslint-disable camelcase */

  }, {
    key: 'format_unchanged',
    value: function format_unchanged() {}
  }, {
    key: 'format_movedestination',
    value: function format_movedestination() {}
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
  }]);
  return AnnotatedFormatter;
}(BaseFormatter);

/* eslint-enable camelcase */

var wrapPropertyName = function wrapPropertyName(name) {
  return '<pre style="display:inline-block">&quot;' + name + '&quot;</pre>';
};

var deltaAnnotations = {
  added: function added(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'new value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'insert at index ' + leftKey + formatLegend;
    }
    return 'add property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  modified: function modified(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'modify value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'modify at index ' + leftKey + formatLegend;
    }
    return 'modify property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  deleted: function deleted(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, 0, 0])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'delete value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'remove index ' + leftKey + formatLegend;
    }
    return 'delete property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  moved: function moved(delta, left, key, leftKey) {
    return 'move from <span title="(position to remove at original state)">' + ('index ' + leftKey + '</span> to <span title="(position to insert at final') + (' state)">index ' + delta[1] + '</span>');
  },
  textdiff: function textdiff(delta, left, key, leftKey) {
    var location = typeof leftKey === 'undefined' ? '' : typeof leftKey === 'number' ? ' at index ' + leftKey : ' at property ' + wrapPropertyName(leftKey);
    return 'text diff' + location + ', format is <a href="https://code.google.com/' + 'p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>';
  }
};

var formatAnyChange = function formatAnyChange(context, delta) {
  var deltaType = this.getDeltaType(delta);
  var annotator = deltaAnnotations[deltaType];
  var htmlNote = annotator && annotator.apply(annotator, Array.prototype.slice.call(arguments, 1));
  var json = JSON.stringify(delta, null, 2);
  if (deltaType === 'textdiff') {
    // split text diffs lines
    json = json.split('\\n').join('\\n"+\n   "');
  }
  context.indent();
  context.row(json, htmlNote);
  context.indent(-1);
};

/* eslint-disable camelcase */
AnnotatedFormatter.prototype.format_added = formatAnyChange;
AnnotatedFormatter.prototype.format_modified = formatAnyChange;
AnnotatedFormatter.prototype.format_deleted = formatAnyChange;
AnnotatedFormatter.prototype.format_moved = formatAnyChange;
AnnotatedFormatter.prototype.format_textdiff = formatAnyChange;
var defaultInstance$1 = void 0;

function format$1(delta, left) {
  if (!defaultInstance$1) {
    defaultInstance$1 = new AnnotatedFormatter();
  }
  return defaultInstance$1.format(delta, left);
}

var annotated = Object.freeze({
  default: AnnotatedFormatter,
  format: format$1
});

var OPERATIONS = {
  add: 'add',
  remove: 'remove',
  replace: 'replace',
  move: 'move'
};

var JSONFormatter = function (_BaseFormatter) {
  inherits(JSONFormatter, _BaseFormatter);

  function JSONFormatter() {
    classCallCheck(this, JSONFormatter);

    var _this = possibleConstructorReturn(this, (JSONFormatter.__proto__ || Object.getPrototypeOf(JSONFormatter)).call(this));

    _this.includeMoveDestinations = true;
    return _this;
  }

  createClass(JSONFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(JSONFormatter.prototype.__proto__ || Object.getPrototypeOf(JSONFormatter.prototype), 'prepareContext', this).call(this, context);
      context.result = [];
      context.path = [];
      context.pushCurrentOp = function (obj) {
        var op = obj.op,
            value = obj.value;

        var val = {
          op: op,
          path: this.currentPath()
        };
        if (typeof value !== 'undefined') {
          val.value = value;
        }
        this.result.push(val);
      };

      context.pushMoveOp = function (to) {
        var finalTo = '/' + to;
        var from = this.currentPath();
        this.result.push({ op: OPERATIONS.move, from: from, path: finalTo });
      };

      context.currentPath = function () {
        return '/' + this.path.join('/');
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.out('[ERROR] ' + err);
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin() {}
  }, {
    key: 'rootEnd',
    value: function rootEnd() {}
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(_ref, key, leftKey) {
      var path = _ref.path;

      path.push(leftKey);
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(_ref2) {
      var path = _ref2.path;

      path.pop();
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

  }, {
    key: 'format_unchanged',
    value: function format_unchanged() {}
  }, {
    key: 'format_movedestination',
    value: function format_movedestination() {}
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      this.formatDeltaChildren(context, delta, left);
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      context.pushCurrentOp({ op: OPERATIONS.add, value: delta[0] });
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.pushCurrentOp({ op: OPERATIONS.replace, value: delta[1] });
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context) {
      context.pushCurrentOp({ op: OPERATIONS.remove });
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      var to = delta[1];
      context.pushMoveOp(to);
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'format',
    value: function format(delta, left) {
      var context = {};
      this.prepareContext(context);
      this.recurse(context, delta, left);
      return context.result;
    }
  }]);
  return JSONFormatter;
}(BaseFormatter);

var last = function last(arr) {
  return arr[arr.length - 1];
};

var sortBy = function sortBy(arr, pred) {
  arr.sort(pred);
  return arr;
};

var compareByIndexDesc = function compareByIndexDesc(indexA, indexB) {
  var lastA = parseInt(indexA, 10);
  var lastB = parseInt(indexB, 10);
  if (!(isNaN(lastA) || isNaN(lastB))) {
    return lastB - lastA;
  } else {
    return 0;
  }
};

var opsByDescendingOrder = function opsByDescendingOrder(removeOps) {
  return sortBy(removeOps, function (a, b) {
    var splitA = a.path.split('/');
    var splitB = b.path.split('/');
    if (splitA.length !== splitB.length) {
      return splitA.length - splitB.length;
    } else {
      return compareByIndexDesc(last(splitA), last(splitB));
    }
  });
};

var partition = function partition(arr, pred) {
  var left = [];
  var right = [];

  arr.forEach(function (el) {
    var coll = pred(el) ? left : right;
    coll.push(el);
  });
  return [left, right];
};

var partitionRemovedOps = function partitionRemovedOps(jsonFormattedDiff) {
  var isRemoveOp = function isRemoveOp(_ref3) {
    var op = _ref3.op;
    return op === 'remove';
  };
  return partition(jsonFormattedDiff, isRemoveOp);
};

var reorderOps = function reorderOps(jsonFormattedDiff) {
  var removeOpsOtherOps = partitionRemovedOps(jsonFormattedDiff);
  var removeOps = removeOpsOtherOps[0];
  var otherOps = removeOpsOtherOps[1];
  var removeOpsReverse = opsByDescendingOrder(removeOps);
  return removeOpsReverse.concat(otherOps);
};

var defaultInstance$2 = void 0;

var format$2 = function format(delta, left) {
  if (!defaultInstance$2) {
    defaultInstance$2 = new JSONFormatter();
  }
  return reorderOps(defaultInstance$2.format(delta, left));
};

var log = function log(delta, left) {
  console.log(format$2(delta, left));
};

var jsonpatch = Object.freeze({
  default: JSONFormatter,
  format: format$2,
  log: log
});

function chalkColor(name) {
  return _chalk2.default && _chalk2.default[name] || function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args;
  };
}

var colors = {
  added: chalkColor('green'),
  deleted: chalkColor('red'),
  movedestination: chalkColor('gray'),
  moved: chalkColor('yellow'),
  unchanged: chalkColor('gray'),
  error: chalkColor('white.bgRed'),
  textDiffLine: chalkColor('gray')
};

var ConsoleFormatter = function (_BaseFormatter) {
  inherits(ConsoleFormatter, _BaseFormatter);

  function ConsoleFormatter() {
    classCallCheck(this, ConsoleFormatter);

    var _this = possibleConstructorReturn(this, (ConsoleFormatter.__proto__ || Object.getPrototypeOf(ConsoleFormatter)).call(this));

    _this.includeMoveDestinations = false;
    return _this;
  }

  createClass(ConsoleFormatter, [{
    key: 'prepareContext',
    value: function prepareContext(context) {
      get(ConsoleFormatter.prototype.__proto__ || Object.getPrototypeOf(ConsoleFormatter.prototype), 'prepareContext', this).call(this, context);
      context.indent = function (levels) {
        this.indentLevel = (this.indentLevel || 0) + (typeof levels === 'undefined' ? 1 : levels);
        this.indentPad = new Array(this.indentLevel + 1).join('  ');
        this.outLine();
      };
      context.outLine = function () {
        this.buffer.push('\n' + (this.indentPad || ''));
      };
      context.out = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        for (var i = 0, l = args.length; i < l; i++) {
          var lines = args[i].split('\n');
          var text = lines.join('\n' + (this.indentPad || ''));
          if (this.color && this.color[0]) {
            text = this.color[0](text);
          }
          this.buffer.push(text);
        }
      };
      context.pushColor = function (color) {
        this.color = this.color || [];
        this.color.unshift(color);
      };
      context.popColor = function () {
        this.color = this.color || [];
        this.color.shift();
      };
    }
  }, {
    key: 'typeFormattterErrorFormatter',
    value: function typeFormattterErrorFormatter(context, err) {
      context.pushColor(colors.error);
      context.out('[ERROR]' + err);
      context.popColor();
    }
  }, {
    key: 'formatValue',
    value: function formatValue(context, value) {
      context.out(JSON.stringify(value, null, 2));
    }
  }, {
    key: 'formatTextDiffString',
    value: function formatTextDiffString(context, value) {
      var lines = this.parseTextDiff(value);
      context.indent();
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        context.pushColor(colors.textDiffLine);
        context.out(line.location.line + ',' + line.location.chr + ' ');
        context.popColor();
        var pieces = line.pieces;
        for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = pieces[pieceIndex];
          context.pushColor(colors[piece.type]);
          context.out(piece.text);
          context.popColor();
        }
        if (i < l - 1) {
          context.outLine();
        }
      }
      context.indent(-1);
    }
  }, {
    key: 'rootBegin',
    value: function rootBegin(context, type, nodeType) {
      context.pushColor(colors[type]);
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
  }, {
    key: 'rootEnd',
    value: function rootEnd(context, type, nodeType) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : '}');
      }
      context.popColor();
    }
  }, {
    key: 'nodeBegin',
    value: function nodeBegin(context, key, leftKey, type, nodeType) {
      context.pushColor(colors[type]);
      context.out(leftKey + ': ');
      if (type === 'node') {
        context.out(nodeType === 'array' ? '[' : '{');
        context.indent();
      }
    }
  }, {
    key: 'nodeEnd',
    value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      if (type === 'node') {
        context.indent(-1);
        context.out(nodeType === 'array' ? ']' : '}' + (isLast ? '' : ','));
      }
      if (!isLast) {
        context.outLine();
      }
      context.popColor();
    }

    /* jshint camelcase: false */
    /* eslint-disable camelcase */

  }, {
    key: 'format_unchanged',
    value: function format_unchanged(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
  }, {
    key: 'format_movedestination',
    value: function format_movedestination(context, delta, left) {
      if (typeof left === 'undefined') {
        return;
      }
      this.formatValue(context, left);
    }
  }, {
    key: 'format_node',
    value: function format_node(context, delta, left) {
      // recurse
      this.formatDeltaChildren(context, delta, left);
    }
  }, {
    key: 'format_added',
    value: function format_added(context, delta) {
      this.formatValue(context, delta[0]);
    }
  }, {
    key: 'format_modified',
    value: function format_modified(context, delta) {
      context.pushColor(colors.deleted);
      this.formatValue(context, delta[0]);
      context.popColor();
      context.out(' => ');
      context.pushColor(colors.added);
      this.formatValue(context, delta[1]);
      context.popColor();
    }
  }, {
    key: 'format_deleted',
    value: function format_deleted(context, delta) {
      this.formatValue(context, delta[0]);
    }
  }, {
    key: 'format_moved',
    value: function format_moved(context, delta) {
      context.out('==> ' + delta[1]);
    }
  }, {
    key: 'format_textdiff',
    value: function format_textdiff(context, delta) {
      this.formatTextDiffString(context, delta[0]);
    }
  }]);
  return ConsoleFormatter;
}(BaseFormatter);

var defaultInstance$3 = void 0;

var format$3 = function format(delta, left) {
  if (!defaultInstance$3) {
    defaultInstance$3 = new ConsoleFormatter();
  }
  return defaultInstance$3.format(delta, left);
};

function log$1(delta, left) {
  console.log(format$3(delta, left));
}

var console$1 = Object.freeze({
  default: ConsoleFormatter,
  format: format$3,
  log: log$1
});

var index = Object.freeze({
  base: base,
  html: html,
  annotated: annotated,
  jsonpatch: jsonpatch,
  console: console$1
});

// use as 2nd parameter for JSON.parse to revive Date instances
function dateReviver(key, value) {
  var parts = void 0;
  if (typeof value === 'string') {
    // eslint-disable-next-line max-len
    parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(value);
    if (parts) {
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
    }
  }
  return value;
}

function create(options) {
  return new DiffPatcher(options);
}

var defaultInstance$4 = void 0;

function diff() {
  if (!defaultInstance$4) {
    defaultInstance$4 = new DiffPatcher();
  }
  return defaultInstance$4.diff.apply(defaultInstance$4, arguments);
}

function patch() {
  if (!defaultInstance$4) {
    defaultInstance$4 = new DiffPatcher();
  }
  return defaultInstance$4.patch.apply(defaultInstance$4, arguments);
}

function unpatch() {
  if (!defaultInstance$4) {
    defaultInstance$4 = new DiffPatcher();
  }
  return defaultInstance$4.unpatch.apply(defaultInstance$4, arguments);
}

function reverse() {
  if (!defaultInstance$4) {
    defaultInstance$4 = new DiffPatcher();
  }
  return defaultInstance$4.reverse.apply(defaultInstance$4, arguments);
}

function clone$1() {
  if (!defaultInstance$4) {
    defaultInstance$4 = new DiffPatcher();
  }
  return defaultInstance$4.clone.apply(defaultInstance$4, arguments);
}

exports.DiffPatcher = DiffPatcher;
exports.formatters = index;
exports.console = console$1;
exports.create = create;
exports.dateReviver = dateReviver;
exports.diff = diff;
exports.patch = patch;
exports.unpatch = unpatch;
exports.reverse = reverse;
exports.clone = clone$1;
//# sourceMappingURL=jsondiffpatch.esm.js.map
},{"diff-match-patch":213,"chalk":212}],134:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDelta = undefined;

var _draftJs = require('draft-js');

var _jsondiffpatch = require('jsondiffpatch');

var j = (0, _jsondiffpatch.create)({
  objectHash: function objectHash(obj, index) {
    console.log(obj);
    return obj.key || '$$index:' + index;
  }
});

var applyDelta = exports.applyDelta = function applyDelta(editorState, delta) {
  if (!delta) return editorState;
  var raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
  var patched = j.patch(raw, delta);
  var currentContent = (0, _draftJs.convertFromRaw)(patched);
  return _draftJs.EditorState.push(editorState, currentContent);
};
},{"draft-js":9,"jsondiffpatch":209}],72:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _decorator = require('./decorator');

var _getCursorStyle = require('./getCursorStyle');

var _applyDelta = require('./applyDelta');

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollaborativeEditor = function (_React$Component) {
  _inherits(CollaborativeEditor, _React$Component);

  function CollaborativeEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CollaborativeEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollaborativeEditor.__proto__ || Object.getPrototypeOf(CollaborativeEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      editorState: _draftJs.EditorState.createEmpty(_decorator.decorator),
      customStyleMap: {},
      cursors: []
    }, _this._isUnmounted = false, _this.handleMessage = function (_ref2) {
      var delta = _ref2.delta,
          customStyleMap = _ref2.customStyleMap,
          users = _ref2.users,
          transactionId = _ref2.transactionId;

      var editorState = _this.state.editorState;
      var nextEditorState = (0, _applyDelta.applyDelta)(editorState, delta);
      _this.setState({
        customStyleMap: _extends({}, customStyleMap, _defineProperty({}, _this.props.userId, {
          backgroundColor: 'transparent'
        })),
        editorState: nextEditorState
      }, function () {
        (0, _reactDom.unstable_deferredUpdates)(function () {
          var cursors = users.filter(function (user) {
            return user.selection && user.id !== _this.props.userId;
          }).map(function (_ref3) {
            var selection = _ref3.selection,
                id = _ref3.id;
            return (0, _getCursorStyle.getCursorStyle)(nextEditorState, selection);
          }).filter(function (style) {
            return style;
          });
          _this.setState({
            cursors: cursors
          });
        });
      });
    }, _this.resize = (0, _debounce2.default)(function (evt) {
      if (_this.state.cursors.length) {
        _this.setState({ cursors: [] });
      }
    }, 200), _this.broadcast = (0, _debounce2.default)(function () {
      var editorState = _this.state.editorState;
      var contentState = editorState.getCurrentContent();
      var raw = (0, _draftJs.convertToRaw)(contentState);
      _this.props.ws.send(JSON.stringify({
        raw: raw,
        selection: editorState.getSelection().toJS(),
        timestamp: Date.now(),
        id: _this.props.userId
      }));
    }, 300), _this.onChange = function (editorState) {
      _this.broadcast();
      var nextEditorState = editorState;
      if (!nextEditorState.getDecorator()) {
        nextEditorState = _draftJs.EditorState.set('decorator', _decorator.decorator);
      }
      var currentInlineStyles = nextEditorState.getCurrentInlineStyle();
      if (!currentInlineStyles.has(_this.props.userId)) {
        nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, _this.props.userId);
      }

      var keys = Object.keys(_this.state.customStyleMap).filter(function (key) {
        return key !== _this.props.userId;
      });

      nextEditorState = keys.reduce(function (acc, key) {
        return currentInlineStyles.has(key) ? _draftJs.RichUtils.toggleInlineStyle(acc, key) : acc;
      }, nextEditorState);
      _this.setState({ editorState: nextEditorState });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CollaborativeEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      console.log(this.props);
      this.props.ws.onmessage = function (event) {
        if (_this2._isUnmounted) return;
        _this2.handleMessage(JSON.parse(event.data));
      };

      window.addEventListener('resize', this.resize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isUnmounted = true;
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: 'render',
    value: function render() {
      var cursors = this.state.cursors;

      var _props = this.props,
          ws = _props.ws,
          userId = _props.userId,
          rest = _objectWithoutProperties(_props, ['ws', 'userId']);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        cursors.map(function (cursor, i) {
          return _react2.default.createElement('span', { className: 'cursor', style: cursor, key: i });
        }),
        _react2.default.createElement(_draftJs.Editor, _extends({
          onChange: this.onChange,
          editorState: this.state.editorState,
          customStyleMap: this.state.customStyleMap
        }, rest))
      );
    }
  }]);

  return CollaborativeEditor;
}(_react2.default.Component);

CollaborativeEditor.propTypes = {
  editorState: _propTypes2.default.object,
  customStyleMap: _propTypes2.default.object,
  update: _propTypes2.default.func
};
exports.default = CollaborativeEditor;
},{"react":8,"prop-types":10,"draft-js":9,"debounce":135,"./decorator":70,"./getCursorStyle":73,"./applyDelta":134,"react-dom":7}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorator = require('./decorator');

Object.defineProperty(exports, 'decorator', {
  enumerable: true,
  get: function () {
    return _decorator.decorator;
  }
});

var _colors = require('./colors');

Object.defineProperty(exports, 'colors', {
  enumerable: true,
  get: function () {
    return _colors.colors;
  }
});

var _Editor = require('./Editor');

Object.defineProperty(exports, 'Editor', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Editor).default;
  }
});

var _getCursorStyle = require('./getCursorStyle');

Object.defineProperty(exports, 'getCursorStyle', {
  enumerable: true,
  get: function () {
    return _getCursorStyle.getCursorStyle;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./decorator":70,"./colors":71,"./Editor":72,"./getCursorStyle":73}],4:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _draftJs = require('draft-js');

require('draft-js/dist/Draft.css');

var _src = require('../src');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_React$Component) {
  _inherits(Users, _React$Component);

  function Users() {
    _classCallCheck(this, Users);

    return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
  }

  _createClass(Users, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          users = _props.users,
          customStyleMap = _props.customStyleMap;

      return _react2.default.createElement(
        'div',
        { className: 'users' },
        Object.keys(customStyleMap).map(function (key) {
          return _react2.default.createElement(
            'div',
            { style: customStyleMap[key] },
            key
          );
        })
      );
    }
  }]);

  return Users;
}(_react2.default.Component);

Users.propTypes = {
  users: _propTypes2.default.object,
  customStyleMap: _propTypes2.default.object
};

var host = 'production' !== 'production' ? 'ws://' + window.document.location.host.replace(/:.*/, '') + ':1234' : window.location.origin.replace(/^http/, 'ws');

var contentState = (0, _draftJs.convertFromRaw)({
  blocks: [{
    key: 'A',
    depth: 0,
    text: '',
    data: {},
    inlineStyleRanges: [],
    entityRanges: []
  }],
  entityMap: {}
});

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      userId: undefined
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ws = new window.WebSocket(host);
      var userId = document.cookie.split('=')[1];
      if (!this.state.userId) {
        this.setState({ userId: userId });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.ws.close();
      delete this.ws;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.userId) return false;
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'column', style: { padding: '1em' } },
            _react2.default.createElement(_src.Editor, {
              autoFocus: true,
              ws: this.ws,
              userId: this.state.userId
            })
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('root'));
},{"react":8,"react-dom":7,"draft-js":9,"draft-js/dist/Draft.css":6,"../src":16,"prop-types":10}]},{},[4], null)
//# sourceMappingURL=app.ef491f84.map