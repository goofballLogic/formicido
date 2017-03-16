(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = __webpack_require__(6);

var _events2 = _interopRequireDefault(_events);

var _stepRunner = __webpack_require__(4);

var _stepRunner2 = _interopRequireDefault(_stepRunner);

var _pathRunner = __webpack_require__(2);

var _pathRunner2 = _interopRequireDefault(_pathRunner);

var _scriptRunner = __webpack_require__(3);

var _scriptRunner2 = _interopRequireDefault(_scriptRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function uuid() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;return v.toString(16);
    });
}

var DebuggableEventEmitter = function (_EventEmitter) {
    _inherits(DebuggableEventEmitter, _EventEmitter);

    function DebuggableEventEmitter(options) {
        _classCallCheck(this, DebuggableEventEmitter);

        var _this = _possibleConstructorReturn(this, (DebuggableEventEmitter.__proto__ || Object.getPrototypeOf(DebuggableEventEmitter)).call(this));

        _this.options = options;

        return _this;
    }

    _createClass(DebuggableEventEmitter, [{
        key: "emit",
        value: function emit() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (this.options.debug) {
                console.log(args);
            }
            return _get(DebuggableEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DebuggableEventEmitter.prototype), "emit", this).apply(this, args);
        }
    }]);

    return DebuggableEventEmitter;
}(_events2.default);

function app(ns) {

    ns.options = { debug: false };
    ns.bus = new DebuggableEventEmitter(ns.options);

    ns.uuid = uuid;
    ns.notify = function (message) {
        return ns.bus.emit("info-message", message);
    };
    ns.debug = function (message) {
        return ns.options.debug ? ns.bus.emit("debug-message", message) : false;
    };
    ns.error = function (message) {
        return ns.bus.emit("error-message", message);
    };

    (0, _stepRunner2.default)(ns);
    (0, _pathRunner2.default)(ns);
    (0, _scriptRunner2.default)(ns);
}
exports.default = app;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;


    bus.on("run-path", function (detail) {
        var stepScripts = detail.stepScripts,
            id = detail.id,
            name = detail.name;

        var pathId = id;
        var context = detail.context || {};
        context.path = { pathId: pathId, name: name };

        var bookmark = 0;

        function nextStep(detail) {

            var err = detail ? detail.step.err : null;
            if (err) {

                context.path.err = new Error("Step error");
            }
            if (!err && bookmark < stepScripts.length) {

                bus.once("step-complete", nextStep);
                context.path.step = bookmark + 1;
                var message = _extends({ context: context }, stepScripts[bookmark]);
                bookmark++;
                bus.emit("run-step", message);
            } else {

                context.path.end = Date.now();
                notify("Path run complete");
                delete context.step;
                bus.emit("path-complete", context);
            }
        }

        if (!(stepScripts && stepScripts.length)) {

            notify("No steps specified");
        } else {

            context.path.start = Date.now();
            nextStep();
        }
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;


    bus.on("run-script", function (script) {

        var bookmark = 0;
        var pathScripts = script.pathScripts,
            nextIterationURL = script.nextIterationURL,
            runId = script.runId;

        var scriptId = script.id;
        var context = { script: { scriptId: scriptId, nextIterationURL: nextIterationURL, runId: runId } };

        function nextPath() {

            if (bookmark < pathScripts.length) {

                context.script.path = bookmark + 1;
                bus.emit("run-path", _extends({ context: context }, pathScripts[bookmark]));
                bookmark++;
            } else {

                bus.removeListener("path-complete", pathComplete);
                context.script.end = Date.now();
                delete context.path;
                bus.emit("script-complete", context);
                notify("Script run complete");
            }
        }

        function pathComplete(detail) {
            var _detail$path = detail.path,
                pathId = _detail$path.pathId,
                start = _detail$path.start,
                err = _detail$path.err;

            if (err) {

                context.script.err = new Error("Path error");
                context.script.errorPaths = context.script.errorPaths || [];
                context.script.errorPaths.push({ pathId: pathId, start: start });
            }
            setTimeout(nextPath, 1000);
        }

        if (pathScripts.length < 1) {

            notify("No paths to run");
        } else {

            context.script.start = Date.now();
            bus.on("path-complete", pathComplete);
            nextPath();
        }
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runner;

var _promiseTimeout = __webpack_require__(5);

var _promiseTimeout2 = _interopRequireDefault(_promiseTimeout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runner(ns) {
    var bus = ns.bus,
        uuid = ns.uuid,
        debug = ns.debug;


    function buildRemoteListener(cid, resolve, reject) {

        return function (received) {

            if (!(received && received.data && received.data.cid === cid)) {
                return;
            }
            debug("Reply to: " + cid);
            var data = received.data;
            var args = [].concat(data.args || []);
            if (data.isSuccess) {

                resolve.apply(null, args);
            } else {

                reject.apply(null, args);
            }
        };
    }

    function remote(js, timeout) {

        var cid = uuid();
        var listener = void 0;
        return (0, _promiseTimeout2.default)(timeout || 5000, function (resolve, reject) {

            listener = buildRemoteListener(cid, resolve, reject);

            bus.on("agent-response", listener);
            debug("Remoting: " + cid);
            bus.emit("agent-request", { cid: cid, js: js });
        }, function () {

            bus.removeListener("agent-response", listener);
        });
    }

    function buildPollTask(testScript, interval, resolve, timeoutTest) {

        var pollTask = function pollTask() {
            return testScript().catch(function (err) {
                console.log(err);return false;
            }).then(function (result) {

                if (result) {

                    resolve();
                } else {

                    if (!timeoutTest()) {

                        debug("Scheduling another poll");
                        setTimeout(pollTask, interval);
                    }
                }
            });
        };
        return pollTask;
    }

    function poll(interval, timeout, testScript) {

        var isTimedOut = false;
        return (0, _promiseTimeout2.default)(timeout, function (resolve, reject) {

            var pollTask = buildPollTask(testScript, interval, resolve, function () {
                return isTimedOut;
            });
            pollTask();
        }, function () {

            isTimedOut = true;
        });
    }

    function navigateTo(url) {

        return new Promise(function (resolve, reject) {

            bus.once("navigate-to-complete", function (detail) {
                return detail.err ? reject(detail.err) : resolve();
            });
            bus.emit("navigate-to", url);
        });
    }

    bus.on("run-step", function executeStep(detail) {
        var id = detail.id,
            description = detail.description,
            script = detail.script,
            args = detail.args;

        var context = detail.context || {};
        var stepId = id;

        var dynamicArgs = Object.keys(args || {});
        var func = Function.apply(null, ["navigateTo", "remote", "poll"].concat(dynamicArgs).concat(script));
        var dynamicArgValues = dynamicArgs.map(function (x) {
            return args[x];
        });
        context.step = { stepId: stepId, description: description, args: args, start: Date.now() };
        (0, _promiseTimeout2.default)(10000, function (resolve, reject) {

            func.apply(null, [navigateTo, remote, poll].concat(dynamicArgValues)).then(resolve, reject);
        }, function (maybeErr) {

            context.step.end = Date.now();
            context.step.err = maybeErr;
            bus.emit("step-complete", context);
        });
    });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = promiseTimeout;
function promiseTimeout(timeout, promise, callback) {

    return new Promise(function (resolve, reject) {

        var isActive = true;
        function deactivate(err) {

            if (!isActive) {
                return false;
            }
            isActive = false;
            callback(err);
            return true;
        }

        setTimeout(function () {

            var timedOut = new Error("Timed out");
            if (deactivate(timedOut)) {

                reject(timedOut);
            }
        }, timeout);
        promise(function () {

            if (deactivate()) {

                resolve.apply(null, arguments);
            }
        }, function (err) {

            if (deactivate(err)) {

                reject.apply(null, arguments);
            }
        });
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ns = {};
(0, _app2.default)(ns);

exports.default = ns;

/***/ })
/******/ ]);
});