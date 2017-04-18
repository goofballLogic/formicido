(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("zombie"), require("events"));
	else if(typeof define === 'function' && define.amd)
		define(["zombie", "events"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("zombie"), require("events")) : factory(root["zombie"], root["events"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_12__) {
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

var _events = __webpack_require__(12);

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

exports.default = function (ns) {
    var bus = ns.bus,
        browser = ns.browser;

    bus.on("navigate-to", function (url) {

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

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

    /*
        runId: the id of the current run (e.g. a script run)
        stepScripts: the steps to run for this path
        compensations: the ids of paths to attempt to compensate for a failure (such as session timed out)
        pathDetail: id of the path to run, and a dictionary of path definitions
    */
    function runPath(_ref) {
        var runId = _ref.runId,
            stepScripts = _ref.stepScripts,
            compensations = _ref.compensations,
            pathDetail = _ref.pathDetail;
        var context = pathDetail.context,
            continuation = pathDetail.continuation;
        var path = context.path;


        var compensationAttempts = pathDetail.compensations = pathDetail.compensations || {};

        var bookmark = 0;

        // run a single step within the current path
        function nextStep(detail) {

            var isAborted = runId in aborted;
            if (isAborted) {
                bus.emit("run-path-aborted", context);
            }
            var err = detail ? detail.step.err : null;
            if (err) {

                // an error occurred - record diagnostics
                path.errorSteps = path.errorSteps || [];
                detail.step.errStack = err.stack;
                path.errorSteps.push(detail.step);
            }
            if (!err && bookmark < stepScripts.length && !isAborted) {

                // no error and step completed, so we can move on to the next one
                bus.once("step-complete", nextStep);
                path.step = bookmark + 1;
                var message = _extends({ context: context }, stepScripts[bookmark]);
                bookmark++;
                bus.emit("run-step", message);
            } else {

                path.end = Date.now();
                var compensation = null;
                if (err && compensations) {

                    // can we compensate for this error?
                    var unattempted = compensations.filter(function (x) {
                        return !(x in compensationAttempts);
                    });
                    compensation = unattempted[0];
                }
                if (compensation) {

                    notify("Attempting compensation: " + compensation);
                    var _continuation = function _continuation(compensationContext) {

                        compensationAttempts[compensation] = JSON.parse(JSON.stringify(compensationContext));
                        bus.emit("run-path", pathDetail);
                    };
                    var compensationPathDetail = Object.assign({}, pathDetail, { continuation: _continuation, pathId: compensation });
                    bus.emit("run-path", compensationPathDetail);
                } else {

                    if (continuation) {

                        // this path was instructed to invoke a continuation upon completion (e.g. because it was a compensation path)
                        notify("Path with continuation run complete");
                        continuation(context);
                    } else {

                        notify("Path run complete");
                        delete context.step;
                        context.path.compensations = pathDetail.compensations;
                        bus.emit("path-complete", context);
                    }
                }
            }
        }
        path.start = Date.now();
        nextStep();
    }

    bus.on("abort-run", function (detail) {

        notify("path-runner " + instance + " received abort-run " + detail);
        aborted[detail.id] = Date.now();
        setTimeout(function () {
            return delete aborted[detail.id];
        }, 60000);
    });

    bus.on("run-path", function (pathDetail) {
        var pathId = pathDetail.pathId,
            paths = pathDetail.paths;

        var _ref2 = paths[pathId] || {},
            stepScripts = _ref2.stepScripts,
            name = _ref2.name,
            compensations = _ref2.compensations;

        if (!(stepScripts && stepScripts.length)) {

            notify("No steps specified");
        }

        var context = pathDetail.context = pathDetail.context || {};

        var _ref3 = context.script || {},
            runId = _ref3.runId;

        context.path = { name: name, pathId: pathId };
        runPath({

            compensations: compensations,
            pathDetail: pathDetail,
            runId: runId,
            stepScripts: stepScripts

        });
    });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        var pathIds = pathScripts.pathIds,
            paths = pathScripts.paths;

        var scriptId = script.id;
        var context = { script: { scriptId: scriptId, name: name, nextIterationURL: nextIterationURL, runId: runId } };

        function nextPath() {

            var isAborted = runId in aborted;
            if (isAborted) {
                bus.emit("run-script-aborted", context);
            }
            if (bookmark < pathIds.length && !isAborted) {

                context.script.path = bookmark + 1;
                bus.emit("run-path", { context: context, pathId: pathIds[bookmark], paths: paths });
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

        if (pathIds.length < 1) {

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

    var functionScraper = /[^{]*{([\s\S]*)}$/;

    function scrapeJS(maybeFunction) {

        return typeof maybeFunction === "function" ? functionScraper.exec(maybeFunction.toString())[1] : maybeFunction;
    }

    function remote(js, timeout) {

        js = scrapeJS(js);
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
            args = detail.args,
            constants = detail.constants;

        var context = detail.context || {};
        var stepId = id;
        var parameterHash = Object.assign({ navigateTo: navigateTo, poll: poll, remote: remote }, constants, args);
        var functionParameterNames = Object.keys(parameterHash);
        var functionParameterValues = functionParameterNames.map(function (x) {
            return parameterHash[x];
        });
        var func = Function.apply(null, functionParameterNames.concat(script));

        context.step = {

            args: args,
            description: description,
            stepId: stepId

        };
        (0, _promiseTimeout2.default)(10000, function (resolve, reject) {

            context.step.start = Date.now();
            func.apply(null, functionParameterValues).then(resolve, reject);
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


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ })
/******/ ]);
});