/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uuid() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;return v.toString(16);
    });
}

function app(ns) {

    ns.bus = new _events2.default();
    ns.uuid = uuid;
    ns.notify = function (message) {
        return ns.bus.emit("info-message", message);
    };
}
exports.default = app;

/***/ }),
/* 1 */,
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

__webpack_require__(10);

var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

var _ajaxFormSubmit = __webpack_require__(12);

var _ajaxFormSubmit2 = _interopRequireDefault(_ajaxFormSubmit);

var _stepPage = __webpack_require__(13);

var _stepPage2 = _interopRequireDefault(_stepPage);

var _scriptRunPage = __webpack_require__(17);

var _scriptRunPage2 = _interopRequireDefault(_scriptRunPage);

var _embeddedBrowserWidget = __webpack_require__(14);

var _embeddedBrowserWidget2 = _interopRequireDefault(_embeddedBrowserWidget);

var _pathRunner = __webpack_require__(15);

var _pathRunner2 = _interopRequireDefault(_pathRunner);

var _pathPage = __webpack_require__(18);

var _pathPage2 = _interopRequireDefault(_pathPage);

var _notifications = __webpack_require__(6);

var _notifications2 = _interopRequireDefault(_notifications);

var _metricsSink = __webpack_require__(16);

var _metricsSink2 = _interopRequireDefault(_metricsSink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ns = window.formicido = window.formicido || {};

[_app2.default, // must be first
_notifications2.default, _metricsSink2.default, _ajaxFormSubmit2.default, _embeddedBrowserWidget2.default, _stepPage2.default, _scriptRunPage2.default, _pathPage2.default, _pathRunner2.default].forEach(function (module) {
    return module(ns);
});

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus;

    bus.on("fetch-error", displayErrorNotification);
    bus.on("agent-error", displayErrorNotification);
    bus.on("info-message", displayNotification);
};

function displayNotification(message, isError) {

    var infoBlock = document.createElement("li");
    var timeBlock = document.createElement("time");
    var messageBlock = document.createElement("div");

    messageBlock.innerHTML = message;
    timeBlock.innerHTML = new Date().toLocaleDateString();
    infoBlock.className = isError ? "error" : "";
    infoBlock.appendChild(timeBlock);
    infoBlock.appendChild(messageBlock);
    infoBlock.classList.add("goes");
    document.querySelector(".infos").appendChild(infoBlock);
    setTimeout(function () {

        infoBlock.classList.add("going");
        setTimeout(function () {
            return infoBlock.remove();
        }, 500);
    }, 5000);
}

function displayErrorNotification(message) {

    displayNotification(message.stack || message, true);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (window.Element && !window.Element.prototype.closest) {
    window.Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("click", function clearButton(e) {

    if (!(e.target && e.target.classList.contains("clear-button"))) {
        return;
    }
    var elements = document.querySelectorAll(e.target.getAttribute("data-selectors"));
    elements.forEach(function (ele) {

        if (ele.innerHTML) {
            ele.innerHTML = "";
        }
        if (ele.value) {
            ele.value = "";
        }
    });
});

document.addEventListener("click", function redirectFormSubmission(e) {

    if (e.target.tagName !== "BUTTON") {
        return;
    }
    if (!e.target.classList.contains("redirect-form")) {
        return;
    }
    var form = e.target.closest("form");
    if (!form) {
        return;
    }
    var originalAction = form.action;
    form.action = e.target.value;
    setTimeout(function () {

        form.action = originalAction;
    }, 100);
});

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ajaxFormSubmit;
function ajaxFormSubmit(ns) {
    var bus = ns.bus;


    function ajaxSubmit(form) {

        var doc = {};
        [].slice.call(form.elements, 0).forEach(function (field) {

            var name = field.name;
            if (name) {

                var values = doc[name] = doc[name] || [];
                values.push(field.value);
            }
        });
        var url = form.action || window.location.toString();
        var options = {

            method: "POST",
            body: JSON.stringify(doc),
            headers: { "Accept": "application/json", "Content-Type": "application/json" }

        };
        window.fetch(url, options).then(function (response) {

            if (response.ok) {

                var redirectedToHTML = !!~response.headers.get("content-type").indexOf("text/html");
                if (redirectedToHTML) {

                    window.location.href = response.url;
                } else {

                    return response.json().then(function (json) {
                        return bus.emit("fetch-result", json);
                    });
                }
            } else {

                return response.text().then(function (text) {

                    throw new Error("Fetch failed with " + response.status + ": " + text);
                }, function (e) {

                    throw new Error("Fetch failed with " + response.status + ": " + e.message);
                });
            }
        }).catch(function (e) {
            return bus.emit("fetch-error", e.message);
        });
    }

    document.addEventListener("submit", function (e) {

        console.log(e);

        if (!e.target.classList.contains("via-ajax")) {
            return;
        }
        e.preventDefault();
        ajaxSubmit(e.target);
    });
    document.addEventListener("ajax-submit", function (e) {
        return ajaxSubmit(e.detail);
    });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus;

    window.addEventListener("DOMContentLoaded", function () {

        if (!document.body.classList.contains("step-page")) {
            return;
        }
        bus.on("fetch-result", function (detail) {

            document.querySelector("#code").innerHTML = detail.script;
            document.querySelector("#outcome").innerHTML = "Running...";
            bus.emit("run-step", detail);
        });

        bus.on("step-complete", function (detail) {

            document.querySelector("#outcome").innerHTML = "Complete.";
            if (detail.err) {

                document.querySelector("#outcome").innerHTML += " " + detail.err;
            }
        });
    });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = embeddedBrowser;
function embeddedBrowser(ns) {
    var bus = ns.bus,
        uuid = ns.uuid,
        notify = ns.notify;


    document.addEventListener("submit", function (e) {

        if (e.target.id === "embedded-browser-controls") {

            e.preventDefault();
            e.stopPropagation();
            var url = e.target.location.value;
            document.querySelector("#embedded-browser").src = url;
        }
    });

    window.addEventListener("message", function (e) {

        if (!(e.data && e.data.args && e.data.type === "agent-response")) {
            return;
        }
        var received = { origin: e.origin, data: e.data };
        bus.emit("agent-response", received);
    });

    var isDebug = false;

    function remote(js, timeout) {

        var frame = document.querySelector("#embedded-browser");

        return new Promise(function (resolve, reject) {

            var correlationId = uuid();
            var isActive = true;
            var receiveResponse = function receiveResponse(received) {

                if (!(received && received.data && received.data.cid === correlationId)) {
                    return;
                }
                bus.removeListener("agent-response", receiveResponse);
                if (!isActive) {
                    return;
                }
                isActive = false;
                if (isDebug) {
                    notify("Reply to: " + correlationId);
                }
                var data = received.data;
                var args = [].concat(data.args || []);
                if (data.isSuccess) {

                    resolve.apply(null, args);
                } else {

                    reject.apply(null, args);
                }
            };
            bus.on("agent-response", receiveResponse);
            if (isDebug) {
                notify("Remoting: " + correlationId);
            }
            frame.contentWindow.postMessage({ cid: correlationId, js: js }, "*");
            setTimeout(function () {

                if (!isActive) {
                    return;
                }
                isActive = false;
                if (isDebug) {
                    notify("Timed out: " + correlationId);
                }
                bus.removeListener("agent-response", receiveResponse);
                reject(new Error("Timed out"));
            }, timeout || 5000);
        });
    }

    function poll(interval, timeout, testScript) {

        return new Promise(function (resolve, reject) {

            var isActive = true;
            function task() {

                testScript().catch(function (err) {
                    console.log(err);return false;
                }).then(function (result) {

                    if (!isActive) {
                        return;
                    }
                    if (result) {

                        resolve();
                        isActive = false;
                    } else {

                        if (isDebug) {
                            notify("Scheduling another poll");
                        }
                        setTimeout(task, interval);
                    }
                });
            }
            setTimeout(task, interval);
            setTimeout(function () {

                if (!isActive) {
                    return;
                }
                isActive = false;
                reject("Polling timed out: " + testScript);
            }, timeout);
        });
    }

    bus.on("run-step", function (detail) {

        isDebug = !!detail.debug;
        console.log(detail);
        var frame = document.querySelector("#embedded-browser");
        if (!frame) {

            console.warn("No embedded browser");
        } else {

            var dynamicArgs = Object.keys(detail.args || {});
            var args = ["frame", "remote", "poll"].concat(dynamicArgs).concat(detail.script);
            var script = Function.apply(null, args);
            var dynamicArgValues = dynamicArgs.map(function (x) {
                return detail.args[x];
            });
            var start = Date.now();
            Promise.resolve().then(function () {
                return script.apply(null, [frame, remote, poll].concat(dynamicArgValues));
            }).then(function () {
                return null;
            }, function (err) {
                return err;
            }).then(function (err) {
                return { detail: detail, err: err, start: start, end: Date.now() };
            }).then(function (outcome) {
                return bus.emit("step-complete", outcome);
            });
        }
    });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;


    function runPath(detail) {

        var outcome = document.querySelector("#outcome");
        outcome.innerHTML = "";
        function recordOutcome(html) {
            if (outcome) {
                outcome.innerHTML += "<br />" + html;
            }
        }
        var transcript = document.querySelector("#transcript");
        transcript.innerHTML = "";

        var stepScripts = detail.stepScripts;
        var id = detail.id;

        if (!(stepScripts && stepScripts.length)) {

            recordOutcome("Done. No steps specified.");
            notify("No steps specified");
        } else {
            var nextStep = function nextStep() {

                if (bookmark < steps.length) {

                    steps[bookmark].classList.add("running");
                    bus.once("step-complete", pathStepComplete);
                    bus.emit("run-step", stepScripts[bookmark]);
                    bookmark++;
                } else {

                    pathComplete();
                }
            };

            var pathStepComplete = function pathStepComplete(detail) {

                var step = steps[bookmark - 1];
                step.classList.remove("running");
                if (detail.err) {

                    recordOutcome("Step " + bookmark + " error: " + detail.err);
                    step.classList.add("error");
                } else {

                    step.classList.add("success");
                }
                nextStep();
            };

            var pathComplete = function pathComplete() {

                var end = Date.now();
                var outcome = { path: stepScripts, id: id, start: start, end: end };
                notify("Path run complete");
                bus.emit("path-complete", outcome);
            };

            var steps = stepScripts.map(function (x) {

                var s = document.createElement("li");
                s.innerHTML = x.description;
                transcript.appendChild(s);
                return s;
            });

            var bookmark = 0;


            var start = Date.now();
            nextStep();
        }
    }
    bus.on("run-path", runPath);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus;

    var recordMetric = function recordMetric(metricType) {
        return function (detail) {

            console.log(metricType, detail);
            detail = JSON.parse(JSON.stringify(detail));
            if (detail.err) {
                detail.err = detail.err.stack;
            }
            var metric = { type: metricType, detail: detail };
            window.navigator.sendBeacon("/metrics", JSON.stringify(metric));
        };
    };
    bus.on("step-complete", recordMetric("step"));
    bus.on("path-complete", recordMetric("path"));
    bus.on("script-complete", recordMetric("script"));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus,
        notify = ns.notify;


    bus.on("initiate-script", function (script) {

        console.log("Initiate-script", script);

        var pathScripts = script.pathScripts,
            nextIterationURL = script.nextIterationURL;


        var outcome = document.querySelector("#script-outcome");
        outcome.innerHTML = "";
        function recordOutcome(html) {
            if (outcome) {
                outcome.innerHTML += "<br />" + html;
            }
        }

        var transcript = document.querySelector("#script-transcript");
        var bookmark = 0;
        var paths = pathScripts.map(function (x) {

            var pathElement = document.createElement("li");
            pathElement.innerHTML = x.name;
            transcript.appendChild(pathElement);
            return pathElement;
        });

        function nextPath() {

            if (bookmark < paths.length) {

                paths[bookmark].classList.add("running");
                bus.emit("run-path", pathScripts[bookmark]);
                bookmark++;
            } else {

                scriptComplete();
            }
        }

        function pathComplete(detail) {

            var path = paths[bookmark - 1];
            path.classList.remove("running");
            if (detail.err) {

                recordOutcome("path " + bookmark + " error: " + detail.err);
                path.classList.add("error");
            } else {

                path.classList.add("success");
            }
            setTimeout(nextPath, 1000);
        }

        function scriptComplete() {

            bus.removeListener("path-complete", pathComplete);
            script.end = Date.now();
            bus.emit("script-complete", script);
            notify("Script run complete");
            var stopper = document.querySelector("#stop");
            if (!stopper.checked) {

                window.location.replace(nextIterationURL);
            } else {

                document.body.classList.add("paused");
            }
        }

        if (paths.length < 1) {

            recordOutcome("No paths to run");
        } else {

            script.start = Date.now();
            bus.on("path-complete", pathComplete);
            nextPath();
        }
    });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ns) {
    var bus = ns.bus;

    window.addEventListener("DOMContentLoaded", function () {

        if (!document.body.classList.contains("path-page")) {
            return;
        }
        bus.on("fetch-result", function (detail) {

            bus.emit("run-path", detail);
        });
    });
};

/***/ })
/******/ ]);