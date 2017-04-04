(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("zombie"));
	else if(typeof define === 'function' && define.amd)
		define(["zombie"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("zombie")) : factory(root["zombie"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var _events = __webpack_require__(11);

var _events2 = _interopRequireDefault(_events);

var _stepRunner = __webpack_require__(8);

var _stepRunner2 = _interopRequireDefault(_stepRunner);

var _pathRunner = __webpack_require__(6);

var _pathRunner2 = _interopRequireDefault(_pathRunner);

var _scriptRunner = __webpack_require__(7);

var _scriptRunner2 = _interopRequireDefault(_scriptRunner);

var _metricsGenerator = __webpack_require__(5);

var _metricsGenerator2 = _interopRequireDefault(_metricsGenerator);

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
                console.log("Emit", args);
            }
            return _get(DebuggableEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DebuggableEventEmitter.prototype), "emit", this).apply(this, args);
        }
    }, {
        key: "on",
        value: function on() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (this.options.debug) {
                console.log("On", args);
            }
            return _get(DebuggableEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DebuggableEventEmitter.prototype), "on", this).apply(this, args);
        }
    }]);

    return DebuggableEventEmitter;
}(_events2.default);

function app(ns) {

    var options = ns.options = { debug: false };
    var bus = ns.bus = new DebuggableEventEmitter(ns.options);

    ns.uuid = uuid;
    ns.notify = function (message) {
        return bus.emit("info-message", message);
    };
    ns.debug = function (message) {
        return options.debug ? bus.emit("debug-message", message) : false;
    };
    ns.error = function (message) {
        return bus.emit("error-message", message);
    };

    (0, _stepRunner2.default)(ns);
    (0, _pathRunner2.default)(ns);
    (0, _scriptRunner2.default)(ns);
    (0, _metricsGenerator2.default)(ns);
}
exports.default = app;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (ns) {
    var bus = ns.bus,
        browser = ns.browser;

    bus.on("navigate-to", function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            url = _ref2[0];

        return browser.visit(url).then(function () {
            return new Promise(function (resolve) {

                var poll = function poll() {

                    if (browser.document.readyState === "complete") {
                        resolve();
                    } else {
                        setTimeout(poll, 100);
                    }
                };
                setTimeout(poll, 100);
            });
        }).then(function () {
            return bus.emit("navigate-to-complete", {});
        }, function (err) {
            return bus.emit("navigate-to-complete", { err: err });
        });
    });

    bus.on("agent-request", function (x) {

        browser.window.reply = function (err) {
            var _arguments = arguments;


            process.nextTick(function () {

                bus.emit("agent-response", { data: {

                        type: "agent-response",
                        cid: x.cid,
                        isSuccess: !err,
                        args: err ? err.stack : [].slice.call(_arguments, 1)

                    } });
            });
        };
        browser.evaluate(x.js);
        browser.wait();
    });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus,
        browser = ns.browser;


    bus.on("step-complete", function (detail) {
        var script = detail.script,
            path = detail.path,
            step = detail.step;

        if (step && step.err) {

            var window = browser.tabs.current;
            var location = window.location.toString();
            var content = window.document.documentElement.outerHTML;
            var disposition = "step-error";
            var pathId = path && path.pathId;
            var scriptId = script && script.scriptId;
            var now = Date.now();
            var report = {

                content: content,
                detail: detail,
                disposition: disposition,
                location: location,
                now: now,
                path: script && script.path,
                pathId: pathId,
                step: path && path.step,
                scriptId: scriptId

            };
            bus.emit("diagnostic-report", report);
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

exports.default = function (ns) {
    var bus = ns.bus;

    bus.on("error-message", function (message) {
        return console.error(message);
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus;

    // thanks: http://stackoverflow.com/a/18391400/275501

    function replaceErrors(key, value) {

        if (value instanceof Error) {
            var error = {};

            Object.getOwnPropertyNames(value).forEach(function (key) {
                error[key] = value[key];
            });
            return error;
        }
        return value;
    }

    var recordMetric = function recordMetric(type) {
        return function (detail) {

            detail = JSON.parse(JSON.stringify(detail, replaceErrors));
            bus.emit("metrics", JSON.stringify({ type: type, detail: detail }));
        };
    };

    bus.on("step-complete", recordMetric("step"));
    bus.on("path-complete", recordMetric("path"));
    bus.on("script-complete", recordMetric("script"));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;

    var aborted = {};
    var instance = Math.random();

    bus.on("abort-run", function (detail) {

        notify("path-runner " + instance + " received abort-run " + detail);
        aborted[detail.id] = Date.now();
        setTimeout(function () {
            return delete aborted[detail.id];
        }, 60000);
    });

    bus.on("run-path", function (detail) {
        var stepScripts = detail.stepScripts,
            id = detail.id,
            name = detail.name;

        var pathId = id;
        var context = detail.context || {};

        var _ref = context.script || {},
            runId = _ref.runId;

        context.path = { pathId: pathId, name: name };

        var bookmark = 0;

        function nextStep(detail) {

            var isAborted = runId in aborted;
            if (isAborted) {
                bus.emit("run-path-aborted", context);
            }
            var err = detail ? detail.step.err : null;
            if (err) {

                context.path.errorSteps = context.path.errorSteps || [];
                detail.step.errStack = err.stack;
                context.path.errorSteps.push(detail.step);
            }
            if (!err && bookmark < stepScripts.length && !isAborted) {

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;

    var aborted = {};
    var instance = Math.random();

    bus.on("abort-run", function (detail) {

        notify("script-runner " + instance + " received abort-run " + detail);
        aborted[detail.id] = Date.now();
        setTimeout(function () {
            return delete aborted[detail.id];
        }, 60000);
    });

    bus.on("run-script", function (script) {

        var bookmark = 0;
        var pathScripts = script.pathScripts,
            nextIterationURL = script.nextIterationURL,
            runId = script.runId,
            name = script.name;

        var scriptId = script.id;
        var context = { script: { scriptId: scriptId, name: name, nextIterationURL: nextIterationURL, runId: runId } };

        function nextPath() {

            var isAborted = runId in aborted;
            if (isAborted) {
                bus.emit("run-script-aborted", context);
            }
            if (bookmark < pathScripts.length && !isAborted) {

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
                errorSteps = _detail$path.errorSteps;

            if (errorSteps) {

                context.script.errorPaths = context.script.errorPaths || [];
                context.script.errorPaths.push({ pathId: pathId, start: start, errorSteps: errorSteps });
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runner;

var _promiseTimeout = __webpack_require__(10);

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
            var output = args.length === 1 ? args[0] : args;
            if (data.isSuccess) {

                resolve(output);
            } else {

                reject(output);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

var _zombie = __webpack_require__(4);

var _zombie2 = _interopRequireDefault(_zombie);

var _agent = __webpack_require__(1);

var _agent2 = _interopRequireDefault(_agent);

var _diagnosticsSink = __webpack_require__(2);

var _diagnosticsSink2 = _interopRequireDefault(_diagnosticsSink);

var _notifications = __webpack_require__(3);

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ns = { browser: new _zombie2.default() };

[_app2.default, // must be first

_notifications2.default, // user-display notifications

_diagnosticsSink2.default, // create diagnostic reports for failures
_agent2.default // navigation and execution of script against the browser

].forEach(function (module) {
    return module(ns);
});

exports.default = ns;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = promiseTimeout;
function promiseTimeout(timeout, promise, callback) {

    var constructionStack = new Error().stack;
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

            var timedOut = new Error("Timed out. " + constructionStack);
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

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
function defaultClearTimeout () {
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
} ())
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
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
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
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});