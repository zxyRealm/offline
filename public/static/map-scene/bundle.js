/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scene/mapWorld.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_async@1.5.2@async/lib/async.js":
/*!******************************************************!*\
  !*** ./node_modules/_async@1.5.2@async/lib/async.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate, process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
(function () {

    var async = {};
    function noop() {}
    function identity(v) {
        return v;
    }
    function toBool(v) {
        return !!v;
    }
    function notId(v) {
        return !v;
    }

    // global on the server, window in the browser
    var previous_async;

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this;

    if (root != null) {
        previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            fn.apply(this, arguments);
            fn = null;
        };
    }

    function _once(fn) {
        return function() {
            if (fn === null) return;
            fn.apply(this, arguments);
            fn = null;
        };
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    // Ported from underscore.js isObject
    var _isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    function _isArrayLike(arr) {
        return _isArray(arr) || (
            // has a positive integer length property
            typeof arr.length === "number" &&
            arr.length >= 0 &&
            arr.length % 1 === 0
        );
    }

    function _arrayEach(arr, iterator) {
        var index = -1,
            length = arr.length;

        while (++index < length) {
            iterator(arr[index], index, arr);
        }
    }

    function _map(arr, iterator) {
        var index = -1,
            length = arr.length,
            result = Array(length);

        while (++index < length) {
            result[index] = iterator(arr[index], index, arr);
        }
        return result;
    }

    function _range(count) {
        return _map(Array(count), function (v, i) { return i; });
    }

    function _reduce(arr, iterator, memo) {
        _arrayEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    }

    function _forEachOf(object, iterator) {
        _arrayEach(_keys(object), function (key) {
            iterator(object[key], key);
        });
    }

    function _indexOf(arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) return i;
        }
        return -1;
    }

    var _keys = Object.keys || function (obj) {
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    function _keyIterator(coll) {
        var i = -1;
        var len;
        var keys;
        if (_isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? i : null;
            };
        } else {
            keys = _keys(coll);
            len = keys.length;
            return function next() {
                i++;
                return i < len ? keys[i] : null;
            };
        }
    }

    // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
    // This accumulates the arguments passed into an array, after a given index.
    // From underscore.js (https://github.com/jashkenas/underscore/pull/2140).
    function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
            }
            // Currently unused but handle cases outside of the switch statement:
            // var args = Array(startIndex + 1);
            // for (index = 0; index < startIndex; index++) {
            //     args[index] = arguments[index];
            // }
            // args[startIndex] = rest;
            // return func.apply(this, args);
        };
    }

    function _withoutIndex(iterator) {
        return function (value, index, callback) {
            return iterator(value, callback);
        };
    }

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////

    // capture the global reference to guard against fakeTimer mocks
    var _setImmediate = typeof setImmediate === 'function' && setImmediate;

    var _delay = _setImmediate ? function(fn) {
        // not a direct alias for IE10 compatibility
        _setImmediate(fn);
    } : function(fn) {
        setTimeout(fn, 0);
    };

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
        async.nextTick = process.nextTick;
    } else {
        async.nextTick = _delay;
    }
    async.setImmediate = _setImmediate ? _delay : async.nextTick;


    async.forEach =
    async.each = function (arr, iterator, callback) {
        return async.eachOf(arr, _withoutIndex(iterator), callback);
    };

    async.forEachSeries =
    async.eachSeries = function (arr, iterator, callback) {
        return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
    };


    async.forEachLimit =
    async.eachLimit = function (arr, limit, iterator, callback) {
        return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
    };

    async.forEachOf =
    async.eachOf = function (object, iterator, callback) {
        callback = _once(callback || noop);
        object = object || [];

        var iter = _keyIterator(object);
        var key, completed = 0;

        while ((key = iter()) != null) {
            completed += 1;
            iterator(object[key], key, only_once(done));
        }

        if (completed === 0) callback(null);

        function done(err) {
            completed--;
            if (err) {
                callback(err);
            }
            // Check key is null in case iterator isn't exhausted
            // and done resolved synchronously.
            else if (key === null && completed <= 0) {
                callback(null);
            }
        }
    };

    async.forEachOfSeries =
    async.eachOfSeries = function (obj, iterator, callback) {
        callback = _once(callback || noop);
        obj = obj || [];
        var nextKey = _keyIterator(obj);
        var key = nextKey();
        function iterate() {
            var sync = true;
            if (key === null) {
                return callback(null);
            }
            iterator(obj[key], key, only_once(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    key = nextKey();
                    if (key === null) {
                        return callback(null);
                    } else {
                        if (sync) {
                            async.setImmediate(iterate);
                        } else {
                            iterate();
                        }
                    }
                }
            }));
            sync = false;
        }
        iterate();
    };



    async.forEachOfLimit =
    async.eachOfLimit = function (obj, limit, iterator, callback) {
        _eachOfLimit(limit)(obj, iterator, callback);
    };

    function _eachOfLimit(limit) {

        return function (obj, iterator, callback) {
            callback = _once(callback || noop);
            obj = obj || [];
            var nextKey = _keyIterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish () {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var key = nextKey();
                    if (key === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iterator(obj[key], key, only_once(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        }
                        else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }


    function doParallel(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOf, obj, iterator, callback);
        };
    }
    function doParallelLimit(fn) {
        return function (obj, limit, iterator, callback) {
            return fn(_eachOfLimit(limit), obj, iterator, callback);
        };
    }
    function doSeries(fn) {
        return function (obj, iterator, callback) {
            return fn(async.eachOfSeries, obj, iterator, callback);
        };
    }

    function _asyncMap(eachfn, arr, iterator, callback) {
        callback = _once(callback || noop);
        arr = arr || [];
        var results = _isArrayLike(arr) ? [] : {};
        eachfn(arr, function (value, index, callback) {
            iterator(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = doParallelLimit(_asyncMap);

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.inject =
    async.foldl =
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachOfSeries(arr, function (x, i, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };

    async.foldr =
    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, identity).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };

    async.transform = function (arr, memo, iterator, callback) {
        if (arguments.length === 3) {
            callback = iterator;
            iterator = memo;
            memo = _isArray(arr) ? [] : {};
        }

        async.eachOf(arr, function(v, k, cb) {
            iterator(memo, v, k, cb);
        }, function(err) {
            callback(err, memo);
        });
    };

    function _filter(eachfn, arr, iterator, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iterator(x, function (v) {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            });
        }, function () {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    }

    async.select =
    async.filter = doParallel(_filter);

    async.selectLimit =
    async.filterLimit = doParallelLimit(_filter);

    async.selectSeries =
    async.filterSeries = doSeries(_filter);

    function _reject(eachfn, arr, iterator, callback) {
        _filter(eachfn, arr, function(value, cb) {
            iterator(value, function(v) {
                cb(!v);
            });
        }, callback);
    }
    async.reject = doParallel(_reject);
    async.rejectLimit = doParallelLimit(_reject);
    async.rejectSeries = doSeries(_reject);

    function _createTester(eachfn, check, getResult) {
        return function(arr, limit, iterator, cb) {
            function done() {
                if (cb) cb(getResult(false, void 0));
            }
            function iteratee(x, _, callback) {
                if (!cb) return callback();
                iterator(x, function (v) {
                    if (cb && check(v)) {
                        cb(getResult(true, x));
                        cb = iterator = false;
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                eachfn(arr, limit, iteratee, done);
            } else {
                cb = iterator;
                iterator = limit;
                eachfn(arr, iteratee, done);
            }
        };
    }

    async.any =
    async.some = _createTester(async.eachOf, toBool, identity);

    async.someLimit = _createTester(async.eachOfLimit, toBool, identity);

    async.all =
    async.every = _createTester(async.eachOf, notId, notId);

    async.everyLimit = _createTester(async.eachOfLimit, notId, notId);

    function _findGetResult(v, x) {
        return x;
    }
    async.detect = _createTester(async.eachOf, identity, _findGetResult);
    async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
    async.detectLimit = _createTester(async.eachOfLimit, identity, _findGetResult);

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                callback(null, _map(results.sort(comparator), function (x) {
                    return x.value;
                }));
            }

        });

        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    };

    async.auto = function (tasks, concurrency, callback) {
        if (typeof arguments[1] === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = _once(callback || noop);
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = remainingTasks;
        }

        var results = {};
        var runningTasks = 0;

        var hasError = false;

        var listeners = [];
        function addListener(fn) {
            listeners.unshift(fn);
        }
        function removeListener(fn) {
            var idx = _indexOf(listeners, fn);
            if (idx >= 0) listeners.splice(idx, 1);
        }
        function taskComplete() {
            remainingTasks--;
            _arrayEach(listeners.slice(0), function (fn) {
                fn();
            });
        }

        addListener(function () {
            if (!remainingTasks) {
                callback(null, results);
            }
        });

        _arrayEach(keys, function (k) {
            if (hasError) return;
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = _restParam(function(err, args) {
                runningTasks--;
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _forEachOf(results, function(val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[k] = args;
                    hasError = true;

                    callback(err, safeResults);
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            });
            var requires = task.slice(0, task.length - 1);
            // prevent dead-locks
            var len = requires.length;
            var dep;
            while (len--) {
                if (!(dep = tasks[requires[len]])) {
                    throw new Error('Has nonexistent dependency in ' + requires.join(', '));
                }
                if (_isArray(dep) && _indexOf(dep, k) >= 0) {
                    throw new Error('Has cyclic dependencies');
                }
            }
            function ready() {
                return runningTasks < concurrency && _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            }
            if (ready()) {
                runningTasks++;
                task[task.length - 1](taskCallback, results);
            }
            else {
                addListener(listener);
            }
            function listener() {
                if (ready()) {
                    runningTasks++;
                    removeListener(listener);
                    task[task.length - 1](taskCallback, results);
                }
            }
        });
    };



    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var attempts = [];

        var opts = {
            times: DEFAULT_TIMES,
            interval: DEFAULT_INTERVAL
        };

        function parseTimes(acc, t){
            if(typeof t === 'number'){
                acc.times = parseInt(t, 10) || DEFAULT_TIMES;
            } else if(typeof t === 'object'){
                acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
                acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
            } else {
                throw new Error('Unsupported argument type for \'times\': ' + typeof t);
            }
        }

        var length = arguments.length;
        if (length < 1 || length > 3) {
            throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
        } else if (length <= 2 && typeof times === 'function') {
            callback = task;
            task = times;
        }
        if (typeof times !== 'function') {
            parseTimes(opts, times);
        }
        opts.callback = callback;
        opts.task = task;

        function wrappedTask(wrappedCallback, wrappedResults) {
            function retryAttempt(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            }

            function retryInterval(interval){
                return function(seriesCallback){
                    setTimeout(function(){
                        seriesCallback(null);
                    }, interval);
                };
            }

            while (opts.times) {

                var finalAttempt = !(opts.times-=1);
                attempts.push(retryAttempt(opts.task, finalAttempt));
                if(!finalAttempt && opts.interval > 0){
                    attempts.push(retryInterval(opts.interval));
                }
            }

            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || opts.callback)(data.err, data.result);
            });
        }

        // If a callback is passed, run this as a controll flow
        return opts.callback ? wrappedTask() : wrappedTask;
    };

    async.waterfall = function (tasks, callback) {
        callback = _once(callback || noop);
        if (!_isArray(tasks)) {
            var err = new Error('First argument to waterfall must be an array of functions');
            return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        function wrapIterator(iterator) {
            return _restParam(function (err, args) {
                if (err) {
                    callback.apply(null, [err].concat(args));
                }
                else {
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    ensureAsync(iterator).apply(null, args);
                }
            });
        }
        wrapIterator(async.iterator(tasks))();
    };

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = _isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(_restParam(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    async.parallel = function (tasks, callback) {
        _parallel(async.eachOf, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
    };

    async.series = function(tasks, callback) {
        _parallel(async.eachOfSeries, tasks, callback);
    };

    async.iterator = function (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        }
        return makeCallback(0);
    };

    async.apply = _restParam(function (fn, args) {
        return _restParam(function (callArgs) {
            return fn.apply(
                null, args.concat(callArgs)
            );
        });
    });

    function _concat(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        callback = callback || noop;
        if (test()) {
            var next = _restParam(function(err, args) {
                if (err) {
                    callback(err);
                } else if (test.apply(this, args)) {
                    iterator(next);
                } else {
                    callback.apply(null, [null].concat(args));
                }
            });
            iterator(next);
        } else {
            callback(null);
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        var calls = 0;
        return async.whilst(function() {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iterator, callback);
    };

    async.until = function (test, iterator, callback) {
        return async.whilst(function() {
            return !test.apply(this, arguments);
        }, iterator, callback);
    };

    async.doUntil = function (iterator, test, callback) {
        return async.doWhilst(iterator, function() {
            return !test.apply(this, arguments);
        }, callback);
    };

    async.during = function (test, iterator, callback) {
        callback = callback || noop;

        var next = _restParam(function(err, args) {
            if (err) {
                callback(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function(err, truth) {
            if (err) {
                callback(err);
            } else if (truth) {
                iterator(next);
            } else {
                callback(null);
            }
        };

        test(check);
    };

    async.doDuring = function (iterator, test, callback) {
        var calls = 0;
        async.during(function(next) {
            if (calls++ < 1) {
                next(null, true);
            } else {
                test.apply(this, arguments);
            }
        }, iterator, callback);
    };

    function _queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        }
        else if(concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
            });
            async.setImmediate(q.process);
        }
        function _next(q, tasks) {
            return function(){
                workers -= 1;

                var removed = false;
                var args = arguments;
                _arrayEach(tasks, function (task) {
                    _arrayEach(workersList, function (worker, index) {
                        if (worker === task && !removed) {
                            workersList.splice(index, 1);
                            removed = true;
                        }
                    });

                    task.callback.apply(task, args);
                });
                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var workersList = [];
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            empty: noop,
            drain: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                while(!q.paused && workers < q.concurrency && q.tasks.length){

                    var tasks = q.payload ?
                        q.tasks.splice(0, q.payload) :
                        q.tasks.splice(0, q.tasks.length);

                    var data = _map(tasks, function (task) {
                        return task.data;
                    });

                    if (q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    workersList.push(tasks[0]);
                    var cb = only_once(_next(q, tasks));
                    worker(data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            workersList: function () {
                return workersList;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    async.setImmediate(q.process);
                }
            }
        };
        return q;
    }

    async.queue = function (worker, concurrency) {
        var q = _queue(function (items, cb) {
            worker(items[0], cb);
        }, concurrency, 1);

        return q;
    };

    async.priorityQueue = function (worker, concurrency) {

        function _compareTasks(a, b){
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + ((end - beg + 1) >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== "function") {
                throw new Error("task callback must be a function");
            }
            q.started = true;
            if (!_isArray(data)) {
                data = [data];
            }
            if(data.length === 0) {
                // call drain immediately if there are no tasks
                return async.setImmediate(function() {
                    q.drain();
                });
            }
            _arrayEach(data, function(task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                if (q.tasks.length === q.concurrency) {
                    q.saturated();
                }
                async.setImmediate(q.process);
            });
        }

        // Start with a normal queue
        var q = async.queue(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        return _queue(worker, 1, payload);
    };

    function _console_fn(name) {
        return _restParam(function (fn, args) {
            fn.apply(null, args.concat([_restParam(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        var has = Object.prototype.hasOwnProperty;
        hasher = hasher || identity;
        var memoized = _restParam(function memoized(args) {
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (has.call(memo, key)) {   
                async.setImmediate(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (has.call(queues, key)) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([_restParam(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    };

    function _times(mapper) {
        return function (count, iterator, callback) {
            mapper(_range(count), iterator, callback);
        };
    }

    async.times = _times(async.map);
    async.timesSeries = _times(async.mapSeries);
    async.timesLimit = function (count, limit, iterator, callback) {
        return async.mapLimit(_range(count), limit, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return _restParam(function (args) {
            var that = this;

            var callback = args[args.length - 1];
            if (typeof callback == 'function') {
                args.pop();
            } else {
                callback = noop;
            }

            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([_restParam(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        });
    };

    async.compose = function (/* functions... */) {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };


    function _applyEach(eachfn) {
        return _restParam(function(fns, args) {
            var go = _restParam(function(args) {
                var that = this;
                var callback = args.pop();
                return eachfn(fns, function (fn, _, cb) {
                    fn.apply(that, args.concat([cb]));
                },
                callback);
            });
            if (args.length) {
                return go.apply(this, args);
            }
            else {
                return go;
            }
        });
    }

    async.applyEach = _applyEach(async.eachOf);
    async.applyEachSeries = _applyEach(async.eachOfSeries);


    async.forever = function (fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureAsync(fn);
        function next(err) {
            if (err) {
                return done(err);
            }
            task(next);
        }
        next();
    };

    function ensureAsync(fn) {
        return _restParam(function (args) {
            var callback = args.pop();
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    async.setImmediate(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
        });
    }

    async.ensureAsync = ensureAsync;

    async.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function (callback) {
            return callback.apply(this, args);
        };
    });

    async.wrapSync =
    async.asyncify = function asyncify(func) {
        return _restParam(function (args) {
            var callback = args.pop();
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (_isObject(result) && typeof result.then === "function") {
                result.then(function(value) {
                    callback(null, value);
                })["catch"](function(err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    };

    // Node.js
    if ( true && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return async;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    // included directly via <script> tag
    else {}

}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../_webpack@4.31.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.31.0@webpack/buildin/global.js"), __webpack_require__(/*! ./../../_timers-browserify@2.0.10@timers-browserify/main.js */ "./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../_process@0.11.10@process/browser.js */ "./node_modules/_process@0.11.10@process/browser.js")))

/***/ }),

/***/ "./node_modules/_process@0.11.10@process/browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/_process@0.11.10@process/browser.js ***!
  \**********************************************************/
/*! no static exports found */
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.31.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.31.0@webpack/buildin/global.js"), __webpack_require__(/*! ./../_process@0.11.10@process/browser.js */ "./node_modules/_process@0.11.10@process/browser.js")))

/***/ }),

/***/ "./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js":
/*!**************************************************************************!*\
  !*** ./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.31.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.31.0@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_webpack@4.31.0@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/animation/TrackFloor.js":
/*!*************************************!*\
  !*** ./src/animation/TrackFloor.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
/* harmony import */ var _state_Floor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/Floor */ "./src/state/Floor.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TrackFloor =
/*#__PURE__*/
function () {
  function TrackFloor() {
    _classCallCheck(this, TrackFloor);
  }

  _createClass(TrackFloor, [{
    key: "init",
    value: function init(houseData) {
      this.stateA = new _state_Floor__WEBPACK_IMPORTED_MODULE_1__["default"](_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup);
      this.stateA.init(houseData);
      this.floorHeight = 120;
      this.upHeight = 0;
      this.downHeight = this.floorHeight; // position frame speed

      this.positionSpeed = 2; // opacity frame speed

      this.opacitySpeed = 0.3 * this.positionSpeed / this.floorHeight; // shop opacity frame speed

      this.opacitySpeed2 = 1 * this.positionSpeed / this.floorHeight;
    }
  }, {
    key: "down",
    value: function down(high, low, group) {
      var _this = this;

      this.downHeight -= this.positionSpeed;
      group.position.y -= this.positionSpeed;
      group.children[low].userData.isShow = false;
      group.children[high].userData.isShow = true;
      group.children[high].visible = true;
      group.children[low].children.forEach(function (item) {
        if (item.name === 'plane') {
          item.material.opacity -= _this.opacitySpeed;
        } else {
          item.material.opacity -= _this.opacitySpeed2;
        }
      });
      group.children[high].children.forEach(function (item) {
        if (item.name === 'plane') {
          item.material.opacity += _this.opacitySpeed;
        } else {
          item.material.opacity += _this.opacitySpeed2;
        }
      }); // Complete

      if (this.downHeight <= 0) {
        this.downHeight = this.floorHeight; // reset height

        this.stateA.downEnd();
      }
    }
  }, {
    key: "beforeUp",
    value: function beforeUp() {
      this.stateA.upBegin();
    }
  }, {
    key: "beforeDown",
    value: function beforeDown() {
      this.stateA.downBegin();
    }
  }, {
    key: "up",
    value: function up(high, low, group) {
      var _this2 = this;

      this.upHeight += this.positionSpeed;
      group.position.y += this.positionSpeed;
      group.children[high].userData.isShow = false;
      group.children[low].userData.isShow = true;
      group.children[low].visible = true;
      group.children[low].children.forEach(function (item) {
        if (item.name === 'plane') {
          item.material.opacity += _this2.opacitySpeed;
        } else {
          item.material.opacity += _this2.opacitySpeed2;
        }
      });
      group.children[high].children.forEach(function (item) {
        if (item.name === 'plane') {
          item.material.opacity -= _this2.opacitySpeed;
        } else {
          item.material.opacity -= _this2.opacitySpeed2;
        }
      });

      if (this.upHeight >= this.floorHeight) {
        this.upHeight = 0;
        this.stateA.upEnd();
      }
    }
  }]);

  return TrackFloor;
}();

/* harmony default export */ __webpack_exports__["default"] = (TrackFloor);

/***/ }),

/***/ "./src/animation/TweenFloor.js":
/*!*************************************!*\
  !*** ./src/animation/TweenFloor.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * change single and multi by some tween, and bind some status at group's userData
 * 
 * @class
 * @param { Number } mode   scene mode
 * @paramDesc mode          0: home, 1: association
 */

var TweenFloor =
/*#__PURE__*/
function () {
  function TweenFloor() {
    _classCallCheck(this, TweenFloor);

    this.options = this._getTweenValue();
  } // only home


  _createClass(TweenFloor, [{
    key: "singleToMulti",
    value: function singleToMulti() {
      var _this = this;

      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children.forEach(function (group) {
        if (group.visible) {
          var position = Object.assign(_this.options.cameraCurrent, {
            cy: group.position.y,
            cz: group.position.z
          });
          var target = Object.assign(_this.options.cameraOrigin, {
            cy: group.userData.positionY,
            cz: group.userData.positionZ
          });
          group.children.forEach(function (mesh) {
            if (mesh.name === 'store') {
              _this.options.setColor(mesh, mesh.userData.color);
            } else if (mesh.name === 'flag') {
              _this.options.setOpacity(mesh, 0);
            }
          });

          _this._sport(position, target, group, function () {
            _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.target.copy(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.position);
            _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.active = 0;
            _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].status = 'multi';
          });
        }

        if (group.userData.isShow) {
          group.visible = true;
        }
      });
    }
  }, {
    key: "multiToSingle",
    value: function multiToSingle(intersect, mode) {
      var _this2 = this;

      var key, value;
      var color = {
        r: 98 / 255,
        g: 108 / 255,
        b: 154 / 255 // two way to single : click button, click board

      };

      if (_typeof(intersect) === 'object') {
        key = 'name';
        value = intersect.object.parent.name;
      } else {
        key = 'floor';
        value = intersect;
      } // 发送 m-s 信号


      window.parent.postMessage({
        cmd: 'to_single',
        data: value
      }, '*');
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children.forEach(function (group) {
        if (group.userData[key] !== value) {
          group.visible = false;
        } else {
          // this means that when 'single status', mainGroup needs to record which floor is visible.
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.visible = value - 1; // correct controls: drag the scene will make camera's perspective unstable
          // so we must reset and update by ourselves

          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.reset();
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.update();
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.target.copy(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.position);
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].status = 'single';
          group.children.forEach(function (mesh) {
            if (mesh.name === 'store') {
              _this2.options.setColor(mesh, color);
            }

            if (mesh.name === 'plane') {
              _this2.options.setOpacity(mesh, 0.3);
            } else {
              _this2.options.setOpacity(mesh, 1);
            }
          }); // judge mode: if association, no animation; if home, tween animation
          // association, there is no angle, u can see the scene as a plane, so y is 800

          if (mode) {
            _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.set(0, 1100, 0);
            group.position.y = 0;
          } else {
            var position = Object.assign(_this2.options.cameraCurrent, {
              cy: group.position.y,
              cz: group.position.z
            });
            var target = Object.assign(_this2.options.cameraSport, {
              cy: 200,
              cz: group.position.z + 50
            });

            _this2._sport(position, target, group);
          }
        }
      });
    }
  }, {
    key: "singleToSingle",
    value: function singleToSingle(floor) {
      var _this3 = this;

      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var color = {
        r: 98 / 255,
        g: 108 / 255,
        b: 154 / 255
      };
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.target.copy(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.position);
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].status = 'single';
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children.forEach(function (group, val) {
        group.position.z = group.userData.positionZ;

        if (group.visible) {
          group.visible = false;
          group.position.y = group.userData.positionY;
          group.children.forEach(function (mesh) {
            if (mesh.name === 'store') {
              _this3.options.setColor(mesh, mesh.userData.color);
            } else if (mesh.name === 'flag') {
              _this3.options.setOpacity(mesh, 0);
            }
          });
        }

        if (group.userData.floor === floor) {
          if (mode) {
            group.position.y = 0;
          } else {
            group.position.y = 200;
            group.position.z = group.position.z + 50;
          }

          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.visible = val;
          group.visible = true; // 发送 m-s 信号

          window.parent.postMessage({
            cmd: 'to_single',
            data: val + 1
          }, '*');
          group.children.forEach(function (mesh) {
            if (mesh.name === 'store') {
              _this3.options.setColor(mesh, color);
            }

            if (mesh.name === 'plane') {
              _this3.options.setOpacity(mesh, 0.3);
            } else {
              _this3.options.setOpacity(mesh, 1);
            }
          });
        }
      });
    } // set origin position value

  }, {
    key: "_getTweenValue",
    value: function _getTweenValue() {
      return {
        cameraCurrent: {
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z
        },
        cameraOrigin: {
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.userData.position.x,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.userData.position.y,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.userData.position.z
        },
        cameraSport: {
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x - 700,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y + 800,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z - 1000
        },
        cameraSportX: {
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x - 700,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y + 800,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z - 1100
        },
        setColor: function setColor(mesh, color) {
          mesh.material.color.r = color.r;
          mesh.material.color.g = color.g;
          mesh.material.color.b = color.b;
        },
        setOpacity: function setOpacity(mesh, opacity) {
          mesh.material.opacity = opacity;
        }
      };
    }
  }, {
    key: "_sport",
    value: function _sport(position, target, group) {
      var complete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var tween = new TWEEN.Tween(position).to(target, 2000);
      tween.onUpdate(function () {
        _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x = position.x;
        _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y = position.y;
        _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z = position.z;
        group.position.y = position.cy;
        group.position.z = position.cz;
        _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.lookAt(new THREE.Vector3(0, 0, 0));
      }).onComplete(function () {
        complete();
      }).easing(TWEEN.Easing.Linear.None).start();
    }
  }]);

  return TweenFloor;
}();

/* harmony default export */ __webpack_exports__["default"] = (TweenFloor);

/***/ }),

/***/ "./src/html/MapDom.js":
/*!****************************!*\
  !*** ./src/html/MapDom.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MapDom =
/*#__PURE__*/
function () {
  function MapDom(mode, data) {
    _classCallCheck(this, MapDom);

    this.mode = mode;
    this.data = data;
    this.createPage();
  }

  _createClass(MapDom, [{
    key: "createPage",
    value: function createPage() {
      this.app = document.getElementById('map');
      this.app.appendChild(this.createButtonUlDom(this.mode, this.data));
      this.app.appendChild(this.createGateDom(this.mode));
      this.app.appendChild(this.createLevitatenDom(this.mode));
    }
  }, {
    key: "createButtonUlDom",
    value: function createButtonUlDom(mode, list) {
      var buttonUl = document.createElement('div');
      buttonUl.setAttribute('id', 'button-ul');
      var floor = "\n    <% if (mode === 0) { %>\n    <a href='javascript:;' id='all'>\u603B</a>\n    <% } %>\n    <span id=\"floor\">\n    <% for(let i = 0; i < list.length; i++) { %>\n      <a><%= list[i].name %></a>\n    <% } %>\n    </span>\n    <% if (mode === 0 && list.length > 4) { %>\n    <a href='javascript:;' id='upfloor'>\u4E0A\u5347</a>\n    <a href='javascript:;' id='downfloor'>\u4E0B\u964D</a>\n    <% } %>\n    ";
      var parse = eval(this.compile(floor));
      buttonUl.innerHTML = parse();
      return buttonUl;
    }
  }, {
    key: "createGateDom",
    value: function createGateDom(mode) {
      var gateGroup = document.createElement('div');
      gateGroup.setAttribute('id', 'gate-group');
      var item = "\n    <% if (mode === 1) { %>\n    <div class=\"gate-item gate-red\">\n      <img src=\"./static/camera-inside.png\" alt=\"\">\n      <span>\u5185\u90E8\u51FA\u5165\u53E3</span>\n    </div>\n    <div class=\"gate-item gate-orange\">\n      <img src=\"./static/camera-outside.png\" alt=\"\">\n      <span>\u5185\u90E8\u51FA\u5165\u53E3</span>\n    </div>\n    <div class=\"gate-item gate-green\">\n      <img src=\"./static/camera-post.png\" alt=\"\">\n      <span>\u901A\u9053</span>\n    </div>\n    <% } %>\n    ";
      var parse = eval(this.compile(item));
      gateGroup.innerHTML = parse();
      return gateGroup;
    }
  }, {
    key: "createLevitatenDom",
    value: function createLevitatenDom() {
      var levitaten = document.createElement('div');
      levitaten.setAttribute('id', 'device__popper--wrap');
      levitaten.setAttribute('class', 'levitaten');
      var context = "\n    <div class=\"title\">\n      <div class=\"pull-right\">\n        <img src=\"./static/edit_icon2x.png\" data-type=\"editPortal\" alt=\"\">\n        <img src=\"./static/delete_icon.png\" data-type=\"deletePortal\" alt=\"\">\n      </div>\n      <div class=\"pull-left\">\n        <p id=\"device--title\" class=\"ellipsis\"></p>\n      </div>\n    </div>\n    <div class=\"device-list-wrap\">\n      <ul class=\"device-list\" id=\"device--list\">\n      </ul>\n    </div>\n    <div class=\"add-button\">\n      <a href=\"javascript:void (0);\" data-type=\"add\">\u6DFB\u52A0\u8BBE\u5907</a>\n    </div>\n    <div class=\"horizontal-line\"></div>\n    ";
      levitaten.innerHTML = context;
      return levitaten;
    }
  }, {
    key: "compile",
    value: function compile(template) {
      var evalExpr = /<%=(.+?)%>/g;
      var expr = /<%([\s\S]+?)%>/g;
      template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`');
      template = 'echo(`' + template + '`);';
      var script = "(function parse(data){\n      let output = \"\";\n  \n      function echo(html){\n        output += html;\n      }\n  \n      ".concat(template, "\n  \n      return output;\n    })");
      return script;
    }
  }]);

  return MapDom;
}();

/* harmony default export */ __webpack_exports__["default"] = (MapDom);

/***/ }),

/***/ "./src/html/MapStyle.js":
/*!******************************!*\
  !*** ./src/html/MapStyle.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MapStyle =
/*#__PURE__*/
function () {
  function MapStyle(mode) {
    _classCallCheck(this, MapStyle);

    this.mode = mode;
    this.setButtonUl();
  }

  _createClass(MapStyle, [{
    key: "setButtonUl",
    value: function setButtonUl() {
      var buttonUl = document.getElementById('button-ul');
      var span = buttonUl.getElementsByTagName('span')[0];
      var a = buttonUl.getElementsByTagName('a');

      if (this.mode) {
        // 社群
        buttonUl.style.position = 'absolute';
        buttonUl.style.left = '40px';
        buttonUl.style.top = '27%';
        buttonUl.setAttribute('class', 'associate');
      } else {
        // 首页
        buttonUl.style.position = 'absolute';
        buttonUl.style.width = '100%';
        buttonUl.style.marginTop = '30px';
        buttonUl.style.textAlign = 'center';
        buttonUl.setAttribute('class', 'home');
      }
    }
  }]);

  return MapStyle;
}();

/* harmony default export */ __webpack_exports__["default"] = (MapStyle);

/***/ }),

/***/ "./src/object/Bloom.js":
/*!*****************************!*\
  !*** ./src/object/Bloom.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Bloom =
/*#__PURE__*/
function () {
  function Bloom() {
    _classCallCheck(this, Bloom);

    this.renderScene = new THREE.RenderPass(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene, _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera);
  }

  _createClass(Bloom, [{
    key: "vertexShader",
    value: function vertexShader() {
      return "\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n    }";
    }
  }, {
    key: "fragmentShader",
    value: function fragmentShader() {
      return "\n    uniform sampler2D baseTexture;\n    uniform sampler2D bloomTexture;\n    uniform float iTime;\n    varying vec2 vUv;\n    vec4 getTexture( sampler2D texture ) {\n      return mapTexelToLinear( texture2D( texture , vUv ) );\n    }\n    vec3 v3( float x, float y, float z ){\n      return vec3( x, y, z );\n    }\n    vec3 h2rgb( float hue ){\n      float h = abs(hue - floor(hue)) * 6.;\n      vec3 c = vec3( 0., 0., 0. );\n       \n      int f = int(floor( h ));\n        \n      if(f == 0)c = v3(1., h, 0.);\n      else if(f == 1)c = v3(2.-h, 1., 0.);\n      else if(f == 2)c = v3(0., 1., h-2.);\n      else if(f == 3)c = v3(0., 4.-h, 1.);\n      else if(f == 4)c = v3(h-4., 0., 1.);\n      else c = v3(1., 0., 6. - h);\n      \n      return c;\n    }\n    void main() {\n      vec3 originColor = h2rgb( iTime / 10. );\n      gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) );\n    }";
    }
  }, {
    key: "shining",
    value: function shining(pos) {
      var geometry = new THREE.SphereGeometry(4, 64, 64);
      var material = new THREE.MeshBasicMaterial({
        color: '#EFEE00',
        side: THREE.DoubleSide
      });
      var sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y + 10, pos.z);
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.add(sphere);
      sphere.name = 'shine';
      sphere.layers.enable(1);
      var scaleKF = new THREE.VectorKeyframeTrack('.scale', [0, 0.5, 1, 1.5, 2], [0.7, 0.7, 0.7, 1.2, 1.2, 1.2, 0.8, 0.8, 0.8, 1.2, 1.2, 1.2, 0, 0, 0]);
      var clip = new THREE.AnimationClip('Action', 3, [scaleKF]);
      Bloom.mixer = new THREE.AnimationMixer(sphere);
      var clipAction = Bloom.mixer.clipAction(clip); // clipAction.setLoop( THREE.LoopOnce )
      // clipAction.play();
      // Bloom.mixer.addEventListener( 'finished', ( e ) => { 
      //   sphere.visible = false
      // });

      return sphere;
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(object) {
      var selectedObject = _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.getObjectByName(object.name);
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.remove(selectedObject); // animate();
    }
  }, {
    key: "setBloomPass",
    value: function setBloomPass() {
      var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.1, 0.05);
      bloomPass.threshold = 0;
      bloomPass.strength = 10;
      bloomPass.radius = 1;
      this.bloomComposer = new THREE.EffectComposer(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].renderer);
      this.bloomComposer.renderTarget1.texture.format = THREE.RGBAFormat;
      this.bloomComposer.renderTarget2.texture.format = THREE.RGBAFormat;
      this.bloomComposer.renderToScreen = false;
      this.bloomComposer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
      this.bloomComposer.addPass(this.renderScene);
      this.bloomComposer.addPass(bloomPass);
      return this.bloomComposer;
    }
  }, {
    key: "setFinalPass",
    value: function setFinalPass() {
      var finalPass = new THREE.ShaderPass(new THREE.ShaderMaterial({
        uniforms: {
          // iTime: World.time,
          baseTexture: {
            value: null
          },
          bloomTexture: {
            value: this.bloomComposer.renderTarget2.texture
          }
        },
        vertexShader: this.vertexShader(),
        fragmentShader: this.fragmentShader(),
        defines: {}
      }), 'baseTexture');
      var finalComposer = new THREE.EffectComposer(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].renderer);
      finalComposer.renderTarget1.format = THREE.RGBAFormat;
      finalComposer.renderTarget2.format = THREE.RGBAFormat;
      finalComposer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
      finalComposer.addPass(this.renderScene);
      finalComposer.addPass(finalPass);
      finalComposer.needsSwap = true;
      return finalComposer;
    }
  }, {
    key: "mixer",
    get: function get() {
      return this.mixer;
    },
    set: function set(val) {
      this.mixer = val;
    }
  }]);

  return Bloom;
}();

/* harmony default export */ __webpack_exports__["default"] = (Bloom);

/***/ }),

/***/ "./src/object/Gate.js":
/*!****************************!*\
  !*** ./src/object/Gate.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
/* harmony import */ var _util_TransformAlex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/TransformAlex */ "./src/util/TransformAlex.js");
/* harmony import */ var _object_Sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object/Sprite */ "./src/object/Sprite.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



 // sprite

var Gate =
/*#__PURE__*/
function () {
  function Gate() {
    _classCallCheck(this, Gate);
  }
  /**
   * handle drag and click down event, and picture will transform to sprite
   * 
   * @param { domElement } el     parent element
   * @param { event } e           window event
   */


  _createClass(Gate, [{
    key: "createGate",
    value: function createGate(el, e, spriteList) {
      var _this = this;

      if (e.target && e.target.nodeName.toUpperCase() === 'IMG') {
        // get img src
        var src = e.target.src.split('/').pop(); // gateEl -> div -> img

        var img = el.children[0].children[0];
        var box = document.createElement('img'); // picture will position at the mouse center

        var divX = event.clientX - img.offsetWidth / 2;
        var divY = event.clientY - img.offsetHeight / 2;
        box.src = "./static/".concat(src);
        box.style.width = '20px';
        box.style.position = 'absolute';
        box.style.left = divX + 'px';
        box.style.top = divY + 'px';
        document.body.appendChild(box); // when mouse move, gate picture please follow my hand

        document.onmousemove = function (event) {
          event = event || window.event;
          var divX = event.clientX - img.offsetWidth / 2;
          var divY = event.clientY - img.offsetHeight / 2;
          box.style.left = divX + 'px';
          box.style.top = divY + 'px';
        }; // when mouse click, gate picture please breaking the dimension


        box.onmousedown = function (event) {
          event = event || window.event;
          document.onmousemove = null;
          document.body.removeChild(box);
          var newScreen = Object(_util_TransformAlex__WEBPACK_IMPORTED_MODULE_1__["ScreenToWorld"])({
            x: event.clientX,
            y: event.clientY
          }); // create gate sprite

          _this.createRealGate(newScreen, box.src);

          spriteList.push(mesh); // todo: text
        };
      }
    }
  }, {
    key: "createRealGate",
    value: function createRealGate(coord, src) {
      // create gate sprite
      var sprite = new _object_Sprite__WEBPACK_IMPORTED_MODULE_2__["default"]();
      var scale = new THREE.Vector3(12, 7, 8);
      var mesh = sprite.createPic(src, scale);
      mesh.position.x = coord.x;
      mesh.position.y = 10;
      mesh.position.z = -coord.y;
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children[_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.visible].add(mesh);
    }
  }, {
    key: "createLevitateBox",
    value: function createLevitateBox(screenAlex) {
      var levitaten = document.getElementById('device__popper--wrap');

      if (screenAlex) {
        var hl = document.getElementsByClassName('horizontal-line')[0];
        var line = document.getElementsByClassName('add-button')[0];
        line.setAttribute('data-visible', false);
        hl.style.width = '0px'; // if (!communityData.self) {
        //   document.getElementsByClassName('pull-right')[0].style.display = 'none'
        //   document.getElementsByClassName('pull-left')[0].style.marginRight = '0px'
        //   line.innerHTML = ''
        // }

        var wy = screenAlex.y - 172;
        var wx = screenAlex.x - 100;

        if (wx < 0) {
          wx = 0;
        }

        if (wy < 0) {
          if (wx + 114 > screenAlex.x && 150 > screenAlex.y) {
            hl.style.top = screenAlex.y + 'px';
            hl.style.right = -24 + 'px';
            hl.style.width = 22 + 'px';
            line.setAttribute('data-visible', true);
            wx -= 44;
          }

          wy = 0;
        }

        levitaten.style.top = wy + 'px';
        levitaten.style.left = wx + 'px';
        levitaten.style.display = 'block';
      } else {
        levitaten.style.display = 'none';
      }
    }
  }]);

  return Gate;
}();

/* harmony default export */ __webpack_exports__["default"] = (Gate);

/***/ }),

/***/ "./src/object/Map.js":
/*!***************************!*\
  !*** ./src/object/Map.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/Sprite */ "./src/object/Sprite.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * @desc 地图类
 * @params shape 形状
 * @params options 材质对象
 */

var Map =
/*#__PURE__*/
function () {
  function Map(mode) {
    _classCallCheck(this, Map);

    this.mode = mode;
    this.loader = new THREE.SVGLoader();
  } // 创建几何体


  _createClass(Map, [{
    key: "createGeometry",
    value: function createGeometry() {
      return new THREE.Geometry();
    } // 创建拉伸几何体

  }, {
    key: "createExtrudeGeometry",
    value: function createExtrudeGeometry(shape) {
      return new THREE.ExtrudeBufferGeometry(shape, {
        depth: 5,
        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 1,
        bevelSegments: 5
      });
    } // 创建材质

  }, {
    key: "createMaterial",
    value: function createMaterial(options) {
      return new THREE.MeshPhongMaterial(options);
    } // 创建网格

  }, {
    key: "createMesh",
    value: function createMesh(shape, options, name) {
      var geo = this.createGeometry();
      var extrudeGeo = this.createExtrudeGeometry(shape);
      geo.fromBufferGeometry(extrudeGeo);
      geo.translate(-290, -214, 0);
      var mat = this.createMaterial(options, name);
      var mesh = new THREE.Mesh(geo, mat);
      mesh.name = name;
      return mesh;
    }
  }, {
    key: "initTemplate",
    value: function initTemplate(url, callback) {
      var asyncCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      this.loader.load(url, function (data) {
        var paths = data.paths;
        paths.forEach(function (path) {
          var shapes = path.toShapes(true);
          shapes.forEach(function (shape) {
            callback(path, shape);
          });
        });
        asyncCb(null);
      });
    }
  }, {
    key: "loadMap",
    value: function loadMap(item, group, callback) {
      var _this = this;

      var originPosition = (item.floor - 2) * 120 - 60;
      this.initTemplate(item.url, function (path, shape) {
        var options = {
          color: path.color,
          transparent: true,
          opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 1,
          side: THREE.DoubleSide
        };

        var mesh = _this.createMesh(shape, options, 'store');

        mesh.rotation.set(0.5 * Math.PI, 0, 0);
        mesh.userData.originPosition = originPosition;
        mesh.userData.color = {
          r: mesh.material.color.r,
          g: mesh.material.color.g,
          b: mesh.material.color.b
        };
        group.add(mesh);
      }, callback);
      group.position.y = originPosition;
    } // board

  }, {
    key: "loadPlane",
    value: function loadPlane(item, group, planeList) {
      var _this2 = this;

      var originPosition = (item.floor - 2) * 120 - 65;
      group.userData.positionY = originPosition;
      group.userData.positionZ = group.position.z;
      this.initTemplate('./static/14.svg', function (path, shape) {
        var options = {
          color: _this2.mode ? '#AAACB2' : '#1a425e',
          transparent: true,
          // opacity: 0.3
          opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 0.3
        };

        var mesh = _this2.createMesh(shape, options, 'plane');

        mesh.rotation.set(0.5 * Math.PI, 0, 0);
        mesh.position.y = -5;
        mesh.userData = {
          originPosition: originPosition,
          groupInfo: item
        };
        planeList.push(mesh);
        group.add(mesh);
        options.opacity ? group.userData.isShow = true : group.userData.isShow = false;
      });
    } // gate sprite

  }, {
    key: "createGateLogo",
    value: function createGateLogo(logo, group) {
      var sprite = new _object_Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]();
      var option = {
        opacity: 0
      };
      var scale = new THREE.Vector3(20, 12, 15);
      var mesh = sprite.createPic(logo, scale, option);
      group.add(mesh);
    } // text sprite

  }, {
    key: "createFloorName",
    value: function createFloorName(name, group) {
      var fontSize = 30;
      var sprite = new _object_Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]();
      var option = {
        opacity: group.position.y > 180 || group.position.y < -180 ? 0 : 1
      };
      var mesh = sprite.createText(name, fontSize, option);
      group.add(mesh);
    }
  }]);

  return Map;
}();

/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ }),

/***/ "./src/object/Raycaster.js":
/*!*********************************!*\
  !*** ./src/object/Raycaster.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Raycaster =
/*#__PURE__*/
function () {
  function Raycaster(event) {
    _classCallCheck(this, Raycaster);

    this.event = event;
    this.raycaster = new THREE.Raycaster();
  }

  _createClass(Raycaster, [{
    key: "handleEvent",
    value: function handleEvent(rayList, callback) {
      var emptyCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      var mouse = new THREE.Vector2();
      var container = _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].renderer.domElement;
      mouse.x = this.event.clientX / container.clientWidth * 2 - 1;
      mouse.y = -(this.event.clientY / container.clientHeight) * 2 + 1;
      this.raycaster.setFromCamera(mouse, _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera);
      var intersects = this.raycaster.intersectObjects(rayList);

      if (intersects.length > 0) {
        callback(intersects);
      } else {
        emptyCallback();
      }
    }
  }]);

  return Raycaster;
}();

/* harmony default export */ __webpack_exports__["default"] = (Raycaster);

/***/ }),

/***/ "./src/object/Sprite.js":
/*!******************************!*\
  !*** ./src/object/Sprite.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Create all kinds of Sprite
 * 
 * @class                     Sprite
 * @constructor               init variable
 */
var Sprite =
/*#__PURE__*/
function () {
  function Sprite() {
    _classCallCheck(this, Sprite);
  }
  /**
    * create text sprite
    * 
    * @param { String } text             text will be filled
    * @param { Number } fontSize         font size
    * @param { Object } extraOption      some extra material option
    * @return { Object }                 sprite mesh
    */


  _createClass(Sprite, [{
    key: "createText",
    value: function createText(text, fontSize, extraOption) {
      var depth = 1000; // camera depth

      var scale = depth * (1 / 50 * fontSize); // canvas scale ratio
      // create a canvas

      var canvas = document.createElement('canvas');
      canvas.height = canvas.width = fontSize * 32;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.font = fontSize + "px '微软雅黑'";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2); // create texture

      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true; // texture matrix can be manual update
      // create text sprite object

      var option = Object.assign({
        map: texture,
        transparent: true,
        depthTest: false
      }, extraOption);

      var sprite = this._createSprite(option);

      sprite.name = 'text';
      sprite.scale.set(scale, scale, scale);
      sprite.position.set(-291, 10, 0);
      return sprite;
    }
    /**
      * create text sprite
      * 
      * @param { String } picUrl             pictrue will be load
      * @param { Object } extraOption        some extra material option
      * @return { Object }                   sprite mesh
      */

  }, {
    key: "createPic",
    value: function createPic(picUrl, scale, extraOption) {
      if (!extraOption) {
        extraOption = {
          opacity: 1
        };
      }

      var option = Object.assign({
        map: new THREE.TextureLoader().load(picUrl),
        transparent: true,
        depthTest: false
      }, extraOption);

      var sprite = this._createSprite(option);

      sprite.name = 'flag';
      sprite.scale.set(scale.x, scale.y, scale.z);
      sprite.position.set(0, 10, 0);
      return sprite;
    }
    /**
      * create general sprite
      * 
      * @param { Object } obj              material Option
      * @return { 3dObject }               material Object
      */

  }, {
    key: "_createSprite",
    value: function _createSprite(obj) {
      var material = new THREE.SpriteMaterial(obj);
      var sprite = new THREE.Sprite(material);
      return sprite;
    }
  }]);

  return Sprite;
}();

/* harmony default export */ __webpack_exports__["default"] = (Sprite);

/***/ }),

/***/ "./src/scene/mapWorld.js":
/*!*******************************!*\
  !*** ./src/scene/mapWorld.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return World; });
/* harmony import */ var _html_MapDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/MapDom */ "./src/html/MapDom.js");
/* harmony import */ var _html_MapStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/MapStyle */ "./src/html/MapStyle.js");
/* harmony import */ var _object_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object/Map */ "./src/object/Map.js");
/* harmony import */ var _object_Gate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../object/Gate */ "./src/object/Gate.js");
/* harmony import */ var _object_Raycaster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../object/Raycaster */ "./src/object/Raycaster.js");
/* harmony import */ var _object_Bloom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../object/Bloom */ "./src/object/Bloom.js");
/* harmony import */ var _animation_TrackFloor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation/TrackFloor */ "./src/animation/TrackFloor.js");
/* harmony import */ var _animation_TweenFloor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../animation/TweenFloor */ "./src/animation/TweenFloor.js");
/* harmony import */ var _state_Floor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../state/Floor */ "./src/state/Floor.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import { houseData } from '../data/House'                 // map data

 // 3D Object

 // 3D map

 // gate

 // raycaster

 // bloom shining
// animate

 // up & down animate

 // change floor

 // up & down state

var async = __webpack_require__(/*! async */ "./node_modules/_async@1.5.2@async/lib/async.js"); // asynchronous

/**
 * Member
 * private: _hello
 * public: hello
 * static: get hello(){}
 */


var mode = parseInt(getQueryVariable('mode'));
var floorList = [{
  name: 1
}, {
  name: 2
}, {
  name: 3
}, {
  name: 4
}];
var houseData = []; // const houseData = [{
//   floor: 1,
//   url: './static/10.svg',
//   name: 'F10'
// },{
//   floor: 2,
//   url: './static/11.svg',
//   name: 'F11'
// },{
//   floor: 3,
//   url: './static/12.svg',
//   name: 'F12'
// },{
//   floor: 4,
//   url: './static/13.svg',
//   name: 'F13',
//   gateArr: [{
//     logo: '/static/camera-inside.png'
//   }]
// }]

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] == variable) {
      return pair[1];
    }
  }

  return false;
}
/**
 * 上帝类，定义社群和首页中的全部方法
 * 
 * @class World
 * @param { Number } mode   场景模式
 * @paramDesc mode          0: 首页, 1: 社群
 */


var World =
/*#__PURE__*/
function () {
  function World(mode) {
    _classCallCheck(this, World);

    this.mode = mode;
    this.clock = new THREE.Clock();
    this.gateData = [];
    this.colorData = [];
  } // 自然环境内的所有成员，允许在任何类中被修改


  _createClass(World, [{
    key: "init",
    // init scene
    value: function init() {
      this.width = window.innerWidth; // 画布宽

      this.height = window.innerHeight; // 画布高

      this.container = document.body; // canvas画布容器

      this.planeList = []; // board list for raycaster

      this.spriteList = []; // sprite list for raycaster

      this.shiningList = []; // shining list
      // create scene

      World.scene = new THREE.Scene(); // World.scene.background = new THREE.Color('#AAAAAA')
      // create camera

      var CAM_POS = new THREE.Vector3(700, 450, 1200);
      World.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 1, 10000);
      World.camera.position.set(CAM_POS.x, CAM_POS.y, CAM_POS.z);
      World.camera.userData.position = CAM_POS; // 备份相机初始位置值
      // create renderer

      World.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      World.renderer.setPixelRatio(window.devicePixelRatio);
      World.renderer.setSize(window.innerWidth, window.innerHeight); // World.renderer.autoClear = false;
      // World.renderer.toneMapping = THREE.ReinhardToneMapping;

      this.container.appendChild(World.renderer.domElement);
      World.mainGroup = new THREE.Group(); // 商场总分组

      World.mainGroup.position.y = -30;
      World.layers = new THREE.Layers();
      World.layers.set(0);
      World.status = 'multi'; // 初始化场景状态
      // 构建环境

      this.createControls();
      this.createLight(); // this.createAlex()

      this.eventCollection(); // 初始化TweenFloor类 - 切换楼层动画

      this.tweenFloor = new _animation_TweenFloor__WEBPACK_IMPORTED_MODULE_7__["default"](); // 出入口类

      this.gate = new _object_Gate__WEBPACK_IMPORTED_MODULE_3__["default"](); // 初始化map类 - 每一层中的所有元素

      this.map = new _object_Map__WEBPACK_IMPORTED_MODULE_2__["default"](this.mode);
      this.buildingRise(); // 闪点通道

      this.bloom = new _object_Bloom__WEBPACK_IMPORTED_MODULE_5__["default"]();
      this.bloomComposer = this.bloom.setBloomPass();
      this.finalComposer = this.bloom.setFinalPass();

      if (!this.mode) {
        var shine = this.bloom.shining({
          x: Math.random() * 400 - 200,
          y: 180,
          z: Math.random() * 200 - 100
        });
        this.shiningList.push(shine);
      } // setInterval(() => {
      // }, 2000)
      // TrackFloor类 - 上下楼动画


      this.animateFloor = new _animation_TrackFloor__WEBPACK_IMPORTED_MODULE_6__["default"]();
      this.animateFloor.init(houseData);
      this.animate();
    } // 创建时间流

  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      TWEEN.update();
      var delta = this.clock.getDelta();

      if (_object_Bloom__WEBPACK_IMPORTED_MODULE_5__["default"].mixer) {
        _object_Bloom__WEBPACK_IMPORTED_MODULE_5__["default"].mixer.update(delta);
      }

      if (_state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].up) this.upFloor();
      if (_state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].down) this.downFloor();
      requestAnimationFrame(function () {
        _this.animate();
      });
      World.renderer.render(World.scene, World.camera); // 渲染闪点

      World.camera.layers.set(1);
      this.bloomComposer.render();
      World.camera.layers.set(0); // 渲染整个场景，将覆盖在bloom通道上

      this.finalComposer.render();
      World.controls.update();
    } // create mall

  }, {
    key: "buildingRise",
    value: function buildingRise() {
      var _this2 = this;

      // async：After all the pictures are loaded, the configuration mode method is executed.
      async.each(houseData, function (item, cb) {
        var group = new THREE.Group(); // create group

        group.name = item.floor;
        group.userData.floor = item.floor; // Store the original floor in userdata

        group.userData.dynamicFloor = item.floor; // Store the dynamic floor：change with up&down animation

        group.userData.name = item.floor; // Store the object-group name

        _this2.map.loadMap(item, group, cb);

        _this2.map.loadPlane(item, group, _this2.planeList);

        _this2.map.createFloorName(item.name, group);

        if (item.gateArr) {
          // check in data gateArr
          item.gateArr.forEach(function (gate) {
            _this2.map.createGateLogo(gate.logo, group);
          });
        }

        World.mainGroup.add(group);
      }, function () {
        _this2._modeDiffHandle();

        World.scene.add(World.mainGroup);
      });
    } // use as buildRise()

  }, {
    key: "_modeDiffHandle",
    value: function _modeDiffHandle() {
      // if mode is association, then first scene status is single
      if (this.mode) {
        this.changeFloor(1);
      }
    } // go up - single frame

  }, {
    key: "upFloor",
    value: function upFloor() {
      var high = _state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count + 3;
      var low = _state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count - 1;
      this.animateFloor.up(high, low, World.mainGroup);
    } // go down - single frame

  }, {
    key: "downFloor",
    value: function downFloor() {
      var high = _state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count + 4;
      var low = _state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count;
      this.animateFloor.down(high, low, World.mainGroup);
    } // switch：s - m

  }, {
    key: "singleToMulti",
    value: function singleToMulti() {
      this.tweenFloor.singleToMulti();
    } // switch: s - s

  }, {
    key: "singleToSingle",
    value: function singleToSingle(floor) {
      this.tweenFloor.singleToSingle(floor, this.mode);
    } // switch: m - s

  }, {
    key: "multiToSingle",
    value: function multiToSingle(intersect) {
      // 清除闪点
      this.shiningList.forEach(function () {
        var shine = World.scene.getObjectByName('shine');
        World.scene.remove(shine);
      });
      this.tweenFloor.multiToSingle(intersect, this.mode);
    } // switch: to single, 2 position, from multi, from single

  }, {
    key: "changeFloor",
    value: function changeFloor(floor) {
      if (World.status === 'multi') {
        this.multiToSingle(floor);
      } else {
        this.singleToSingle(floor);
      }
    } // switch: to single, from multi and raycaster

  }, {
    key: "onDocumentMouseClick",
    value: function onDocumentMouseClick(event) {
      var _this3 = this;

      var raycaster = new _object_Raycaster__WEBPACK_IMPORTED_MODULE_4__["default"](event);
      var rayList = []; // raycaster field

      if (World.status === 'multi') {
        rayList = this.planeList.slice(_state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count, _state_Floor__WEBPACK_IMPORTED_MODULE_8__["default"].count + 4);
        raycaster.handleEvent(rayList, function (intersects) {
          _this3.multiToSingle(intersects[0]);
        });
      } else {
        var screenAlex = {
          x: event.clientX,
          y: event.clientY
        };
        rayList = this.spriteList;
        raycaster.handleEvent(rayList, function (intersects) {
          _this3.gate.createLevitateBox(screenAlex);
        }, function () {
          var box = document.getElementById('device__popper--wrap');
          var boxLeft = box.offsetLeft;
          var boxRight = box.offsetWidth + box.offsetLeft;
          var boxTop = box.offsetTop;
          var boxBottom = box.offsetHeight + box.offsetTop;

          if (event.clientX < boxLeft || event.clientX > boxRight || event.clientY < boxTop || event.clientY > boxBottom) {
            _this3.gate.createLevitateBox();
          }
        });
      }
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      World.camera.aspect = width / height;
      World.camera.updateProjectionMatrix();
      World.renderer.setSize(width, height);
      this.bloomComposer.setSize(width, height);
      this.finalComposer.setSize(width, height);
    } // create orbit controls

  }, {
    key: "createControls",
    value: function createControls() {
      World.controls = new THREE.OrbitControls(World.camera, World.renderer.domElement);
      World.controls.enableZoom = true;
      World.controls.enableRotate = true;
      World.controls.screenSpacePanning = true; // save the start status of object, then camera animation will know a reference value 

      World.controls.saveState();
    } // create light

  }, {
    key: "createLight",
    value: function createLight() {
      // warm light
      var AmbientLight = new THREE.AmbientLight(0xffffff, 0.2);
      World.scene.add(AmbientLight); // sky light

      var light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
      World.scene.add(light);
    }
  }, {
    key: "createAlex",
    value: function createAlex() {
      var axesHelper = new THREE.AxesHelper(100);
      World.scene.add(axesHelper);
    }
  }, {
    key: "receiveGateInfo",
    value: function receiveGateInfo(data) {
      var _this4 = this;

      this.gateData = data;
      this.gateData.forEach(function (item) {
        if (item.type === 0) {
          item.src = './static/camera-inside.png';
        } else if (item.type === 1) {
          item.src = './static/camera-outside.png';
        } else {
          item.src = './static/camera-post.png';
        }

        _this4.gate.createRealGate(item.coord, item.src);
      });
    }
  }, {
    key: "receiveColorInfo",
    value: function receiveColorInfo(data) {
      this.colorData = data;
      this.colorData.forEach(function (item) {
        World.mainGroup.children[item.floor - 1].children.forEach(function (mesh, val) {
          if (parseInt(val) === parseInt(item.meshNo)) {
            mesh.material.color = new THREE.Color('#ff0000');
          }
        });
      });
    }
  }, {
    key: "eventCollection",
    value: function eventCollection() {
      var _this5 = this;

      var upfloorEl2 = document.getElementById('button-ul');

      if (this.mode === 0) {
        if (houseData.length > 4) {
          var upfloorEl = upfloorEl2.childNodes[5];
          upfloorEl.addEventListener('click', function () {
            if (World.status === 'multi') _this5.animateFloor.beforeUp();
          }, false);
          var downfloorEl = upfloorEl2.childNodes[7];
          downfloorEl.addEventListener('click', function () {
            if (World.status === 'multi') _this5.animateFloor.beforeDown();
          }, false);
        }

        var allEl = document.getElementById('all');
        allEl.addEventListener('click', function () {
          if (World.status === 'single') _this5.singleToMulti();
        }, false);
      } else {
        var gateEl = document.getElementById('gate-group');
        gateEl.addEventListener('click', function (e) {
          _this5.gate.createGate(gateEl, e, _this5.spriteList);
        }, false);
      }

      window.addEventListener('mousedown', function () {
        _this5.onDocumentMouseClick(event);
      }, false);
      window.addEventListener('resize', function () {
        _this5.onWindowResize(event);
      }, false);
      var floor = document.getElementById('floor');
      floor.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName.toUpperCase() === 'A') {
          _this5.changeFloor(parseInt(e.target.innerHTML));
        }
      }, false);
    }
  }, {
    key: "scene",
    get: function get() {
      return this.scene;
    },
    set: function set(val) {
      this.scene = val;
    }
  }, {
    key: "camera",
    get: function get() {
      return this.camera;
    },
    set: function set(val) {
      this.camera = val;
    }
  }, {
    key: "renderer",
    get: function get() {
      return this.renderer;
    },
    set: function set(val) {
      this.renderer = val;
    }
  }, {
    key: "mainGroup",
    get: function get() {
      return this.mainGroup;
    },
    set: function set(val) {
      this.mainGroup = val;
    }
  }, {
    key: "status",
    get: function get() {
      return this.status;
    },
    set: function set(val) {
      this.status = val;
    }
  }, {
    key: "controls",
    get: function get() {
      return this.controls;
    },
    set: function set(val) {
      this.controls = val;
    }
  }, {
    key: "layers",
    get: function get() {
      return this.layers;
    },
    set: function set(val) {
      this.layers = val;
    }
  }, {
    key: "time",
    get: function get() {
      return this.time;
    },
    set: function set(val) {
      this.time = val;
    }
  }]);

  return World;
}();



if (mode === 1) {
  document.body.style.background = '#ffffff';
  window.parent.postMessage({
    cmd: "associate-load_signal"
  }, '*');
} else {
  document.body.style.background = 'rgb(28, 29, 45)';
  window.parent.postMessage({
    cmd: "home-load_signal"
  }, '*');
}

var world;
window.addEventListener("message", function () {
  handleMessage(event);
});

function handleMessage(event) {
  var data = event.data;

  switch (data.cmd) {
    case "map_data":
      houseData = data.data;
      new _html_MapDom__WEBPACK_IMPORTED_MODULE_0__["default"](mode, floorList);
      new _html_MapStyle__WEBPACK_IMPORTED_MODULE_1__["default"](mode);
      world = new World(mode);
      world.init();
      break;

    case "gate_data":
      world.receiveGateInfo(data.data);
      break;

    case "color_data":
      world.receiveColorInfo(data.data);
      break;
  }
}

/***/ }),

/***/ "./src/state/Floor.js":
/*!****************************!*\
  !*** ./src/state/Floor.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/event */ "./src/util/event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * A FSM
 * 
 * @class World
 * @param { 3D Object } group     
 */

var StateA =
/*#__PURE__*/
function () {
  function StateA(group) {
    _classCallCheck(this, StateA);

    this.group = group;
  } // state: up floor ing...


  _createClass(StateA, [{
    key: "init",
    value: function init(houseData) {
      StateA.up = false;
      StateA.down = false;
      this.floorCount = this._getUpDownFloorCount(this.group);
      StateA.count = this.standardCount = this.floorCount.position;
      this.floorCount.down = this.standardCount - (this.floorCount.down - 1);
      this.floorCount.up = this.standardCount + (this.floorCount.up - 1);
      this.minFloor = this._caculateMinusIndex(houseData);
    }
  }, {
    key: "upBegin",
    value: function upBegin() {
      if (StateA.count > 0 && !StateA.up && !StateA.down) {
        StateA.up = true;
        _util_event__WEBPACK_IMPORTED_MODULE_0__["default"].emit('upTrigger');
      }
    }
  }, {
    key: "downBegin",
    value: function downBegin() {
      if (StateA.count + 4 <= this.floorCount.up && !StateA.down && !StateA.up) {
        StateA.down = true;
      }
    }
  }, {
    key: "upEnd",
    value: function upEnd() {
      StateA.up = false;
      StateA.count--;
    }
  }, {
    key: "downEnd",
    value: function downEnd() {
      StateA.down = false;
      StateA.count++;
    }
  }, {
    key: "_getUpDownFloorCount",
    value: function _getUpDownFloorCount(group) {
      var downFloorCount = 0;
      var upFloorCount = 0;
      var position = 0;
      group.children.forEach(function (item) {
        if (item.floor < 0) {
          downFloorCount += 1;
        } else {
          upFloorCount += 1;
        }
      });
      return {
        position: position,
        down: downFloorCount,
        up: upFloorCount
      };
    }
  }, {
    key: "_caculateMinusIndex",
    value: function _caculateMinusIndex(arr) {
      var minFloor = 1000;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].floor < minFloor && arr[i].floor > 0) {
          minFloor = arr[i].floor;
        }
      }

      return minFloor;
    }
  }, {
    key: "up",
    get: function get() {
      return this.up;
    },
    set: function set(val) {
      this.up = val;
    } // state: down floor ing...

  }, {
    key: "down",
    get: function get() {
      return this.down;
    },
    set: function set(val) {
      this.down = val;
    } // standard floor count
    // get floorCount () { return this.floorCount }
    // set floorCount (obj) { this.floorCount = obj }
    // dynamic floor count

  }, {
    key: "count",
    get: function get() {
      return this.count;
    },
    set: function set(val) {
      this.count = val;
    }
  }]);

  return StateA;
}();

/* harmony default export */ __webpack_exports__["default"] = (StateA);

/***/ }),

/***/ "./src/util/TransformAlex.js":
/*!***********************************!*\
  !*** ./src/util/TransformAlex.js ***!
  \***********************************/
/*! exports provided: ScreenToWorld */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenToWorld", function() { return ScreenToWorld; });
/* harmony import */ var _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/mapWorld */ "./src/scene/mapWorld.js");
 // todo: legacy version no consideration of depth change, I need a new function

function ScreenToWorld(screenPoint) {
  // 获取屏幕坐标投影在相机上的x和y轴的值
  var pX = screenPoint.x / window.innerWidth * 2 - 1;
  var pY = -(screenPoint.y / window.innerHeight) * 2 + 1; // let p = new THREE.Vector3(pX, pY, -1).unproject(camera);
  // set vector2
  // let p2 = new THREE.Vector2(pX, pY);
  // get z-depth

  var zd = _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y + 60 - 10; // get camera angle (180-30)/2

  var za = 75 * Math.PI / 180; // 获取世界坐标中的x轴边界

  var bx = zd / Math.tan(za) * (window.innerWidth / window.innerHeight); // 获取世界坐标中的y轴边界

  var by = zd / Math.tan(za); // 获取世界坐标中x轴的实际坐标点

  var sx = pX * bx; // 获取世界坐标中y轴的实际坐标点

  var sy = pY * by;
  return {
    x: sx,
    y: sy
  };
}



/***/ }),

/***/ "./src/util/event.js":
/*!***************************!*\
  !*** ./src/util/event.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, callback) {
      var callbacks = this._events[event] || [];
      callbacks.push(callback);
      this._events[event] = callbacks;
      return this;
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var callbacks = this._events[event];
      this._events[event] = callbacks && callbacks.filter(function (fn) {
        return fn !== callback;
      });
      return this;
    }
  }, {
    key: "emit",
    value: function emit() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var event = args[0];
      var params = [].slice.call(args, 1);
      var callbacks = this._events[event];
      callbacks.forEach(function (fn) {
        return fn.apply(_this, params);
      });
      return this;
    }
  }, {
    key: "once",
    value: function once(event, callback) {
      var _this2 = this;

      var wrapFunc = function wrapFunc() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        callback.apply(_this2, args);

        _this2.off(event, wrapFunc);
      };

      this.on(event, wrapFunc);
      return this;
    }
  }]);

  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventEmitter);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19hc3luY0AxLjUuMkBhc3luYy9saWIvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19wcm9jZXNzQDAuMTEuMTBAcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc2V0aW1tZWRpYXRlQDEuMC41QHNldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL190aW1lcnMtYnJvd3NlcmlmeUAyLjAuMTBAdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb24vVHJhY2tGbG9vci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5pbWF0aW9uL1R3ZWVuRmxvb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h0bWwvTWFwRG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9odG1sL01hcFN0eWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvQmxvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9HYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvTWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvUmF5Y2FzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvU3ByaXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS9tYXBXb3JsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvRmxvb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvVHJhbnNmb3JtQWxleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9ldmVudC5qcyJdLCJuYW1lcyI6WyJUcmFja0Zsb29yIiwiaG91c2VEYXRhIiwic3RhdGVBIiwiU3RhdGVBIiwiV29ybGQiLCJtYWluR3JvdXAiLCJpbml0IiwiZmxvb3JIZWlnaHQiLCJ1cEhlaWdodCIsImRvd25IZWlnaHQiLCJwb3NpdGlvblNwZWVkIiwib3BhY2l0eVNwZWVkIiwib3BhY2l0eVNwZWVkMiIsImhpZ2giLCJsb3ciLCJncm91cCIsInBvc2l0aW9uIiwieSIsImNoaWxkcmVuIiwidXNlckRhdGEiLCJpc1Nob3ciLCJ2aXNpYmxlIiwiZm9yRWFjaCIsIml0ZW0iLCJuYW1lIiwibWF0ZXJpYWwiLCJvcGFjaXR5IiwiZG93bkVuZCIsInVwQmVnaW4iLCJkb3duQmVnaW4iLCJ1cEVuZCIsIlR3ZWVuRmxvb3IiLCJvcHRpb25zIiwiX2dldFR3ZWVuVmFsdWUiLCJPYmplY3QiLCJhc3NpZ24iLCJjYW1lcmFDdXJyZW50IiwiY3kiLCJjeiIsInoiLCJ0YXJnZXQiLCJjYW1lcmFPcmlnaW4iLCJwb3NpdGlvblkiLCJwb3NpdGlvbloiLCJtZXNoIiwic2V0Q29sb3IiLCJjb2xvciIsInNldE9wYWNpdHkiLCJfc3BvcnQiLCJjb250cm9scyIsImNvcHkiLCJzY2VuZSIsImFjdGl2ZSIsInN0YXR1cyIsImludGVyc2VjdCIsIm1vZGUiLCJrZXkiLCJ2YWx1ZSIsInIiLCJnIiwiYiIsIm9iamVjdCIsInBhcmVudCIsIndpbmRvdyIsInBvc3RNZXNzYWdlIiwiY21kIiwiZGF0YSIsInJlc2V0IiwidXBkYXRlIiwiY2FtZXJhIiwic2V0IiwiY2FtZXJhU3BvcnQiLCJmbG9vciIsInZhbCIsIngiLCJjYW1lcmFTcG9ydFgiLCJjb21wbGV0ZSIsInR3ZWVuIiwiVFdFRU4iLCJUd2VlbiIsInRvIiwib25VcGRhdGUiLCJsb29rQXQiLCJUSFJFRSIsIlZlY3RvcjMiLCJvbkNvbXBsZXRlIiwiZWFzaW5nIiwiRWFzaW5nIiwiTGluZWFyIiwiTm9uZSIsInN0YXJ0IiwiTWFwRG9tIiwiY3JlYXRlUGFnZSIsImFwcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUJ1dHRvblVsRG9tIiwiY3JlYXRlR2F0ZURvbSIsImNyZWF0ZUxldml0YXRlbkRvbSIsImxpc3QiLCJidXR0b25VbCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJwYXJzZSIsImV2YWwiLCJjb21waWxlIiwiaW5uZXJIVE1MIiwiZ2F0ZUdyb3VwIiwibGV2aXRhdGVuIiwiY29udGV4dCIsInRlbXBsYXRlIiwiZXZhbEV4cHIiLCJleHByIiwicmVwbGFjZSIsInNjcmlwdCIsIk1hcFN0eWxlIiwic2V0QnV0dG9uVWwiLCJzcGFuIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJtYXJnaW5Ub3AiLCJ0ZXh0QWxpZ24iLCJCbG9vbSIsInJlbmRlclNjZW5lIiwiUmVuZGVyUGFzcyIsInBvcyIsImdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJNZXNoQmFzaWNNYXRlcmlhbCIsInNpZGUiLCJEb3VibGVTaWRlIiwic3BoZXJlIiwiTWVzaCIsImFkZCIsImxheWVycyIsImVuYWJsZSIsInNjYWxlS0YiLCJWZWN0b3JLZXlmcmFtZVRyYWNrIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJtaXhlciIsIkFuaW1hdGlvbk1peGVyIiwiY2xpcEFjdGlvbiIsInNlbGVjdGVkT2JqZWN0IiwiZ2V0T2JqZWN0QnlOYW1lIiwicmVtb3ZlIiwiYmxvb21QYXNzIiwiVW5yZWFsQmxvb21QYXNzIiwiVmVjdG9yMiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRocmVzaG9sZCIsInN0cmVuZ3RoIiwicmFkaXVzIiwiYmxvb21Db21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwicmVuZGVyZXIiLCJyZW5kZXJUYXJnZXQxIiwidGV4dHVyZSIsImZvcm1hdCIsIlJHQkFGb3JtYXQiLCJyZW5kZXJUYXJnZXQyIiwicmVuZGVyVG9TY3JlZW4iLCJzZXRTaXplIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImFkZFBhc3MiLCJmaW5hbFBhc3MiLCJTaGFkZXJQYXNzIiwiU2hhZGVyTWF0ZXJpYWwiLCJ1bmlmb3JtcyIsImJhc2VUZXh0dXJlIiwiYmxvb21UZXh0dXJlIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJkZWZpbmVzIiwiZmluYWxDb21wb3NlciIsIm5lZWRzU3dhcCIsIkdhdGUiLCJlbCIsImUiLCJzcHJpdGVMaXN0Iiwibm9kZU5hbWUiLCJ0b1VwcGVyQ2FzZSIsInNyYyIsInNwbGl0IiwicG9wIiwiaW1nIiwiYm94IiwiZGl2WCIsImV2ZW50IiwiY2xpZW50WCIsIm9mZnNldFdpZHRoIiwiZGl2WSIsImNsaWVudFkiLCJvZmZzZXRIZWlnaHQiLCJib2R5Iiwib25tb3VzZW1vdmUiLCJvbm1vdXNlZG93biIsInJlbW92ZUNoaWxkIiwibmV3U2NyZWVuIiwiU2NyZWVuVG9Xb3JsZCIsImNyZWF0ZVJlYWxHYXRlIiwicHVzaCIsImNvb3JkIiwic3ByaXRlIiwiU3ByaXRlIiwic2NhbGUiLCJjcmVhdGVQaWMiLCJzY3JlZW5BbGV4IiwiaGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibGluZSIsInd5Iiwid3giLCJyaWdodCIsImRpc3BsYXkiLCJNYXAiLCJsb2FkZXIiLCJTVkdMb2FkZXIiLCJHZW9tZXRyeSIsInNoYXBlIiwiRXh0cnVkZUJ1ZmZlckdlb21ldHJ5IiwiZGVwdGgiLCJiZXZlbEVuYWJsZWQiLCJiZXZlbFRoaWNrbmVzcyIsImJldmVsU2l6ZSIsImJldmVsU2VnbWVudHMiLCJNZXNoUGhvbmdNYXRlcmlhbCIsImdlbyIsImNyZWF0ZUdlb21ldHJ5IiwiZXh0cnVkZUdlbyIsImNyZWF0ZUV4dHJ1ZGVHZW9tZXRyeSIsImZyb21CdWZmZXJHZW9tZXRyeSIsInRyYW5zbGF0ZSIsIm1hdCIsImNyZWF0ZU1hdGVyaWFsIiwidXJsIiwiY2FsbGJhY2siLCJhc3luY0NiIiwibG9hZCIsInBhdGhzIiwicGF0aCIsInNoYXBlcyIsInRvU2hhcGVzIiwib3JpZ2luUG9zaXRpb24iLCJpbml0VGVtcGxhdGUiLCJ0cmFuc3BhcmVudCIsImNyZWF0ZU1lc2giLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsInBsYW5lTGlzdCIsImdyb3VwSW5mbyIsImxvZ28iLCJvcHRpb24iLCJmb250U2l6ZSIsImNyZWF0ZVRleHQiLCJSYXljYXN0ZXIiLCJyYXljYXN0ZXIiLCJyYXlMaXN0IiwiZW1wdHlDYWxsYmFjayIsIm1vdXNlIiwiY29udGFpbmVyIiwiZG9tRWxlbWVudCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0Iiwic2V0RnJvbUNhbWVyYSIsImludGVyc2VjdHMiLCJpbnRlcnNlY3RPYmplY3RzIiwibGVuZ3RoIiwidGV4dCIsImV4dHJhT3B0aW9uIiwiY2FudmFzIiwiaGVpZ2h0IiwiY3R4IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsIlRleHR1cmUiLCJuZWVkc1VwZGF0ZSIsIm1hcCIsImRlcHRoVGVzdCIsIl9jcmVhdGVTcHJpdGUiLCJwaWNVcmwiLCJUZXh0dXJlTG9hZGVyIiwib2JqIiwiU3ByaXRlTWF0ZXJpYWwiLCJhc3luYyIsInJlcXVpcmUiLCJwYXJzZUludCIsImdldFF1ZXJ5VmFyaWFibGUiLCJmbG9vckxpc3QiLCJ2YXJpYWJsZSIsInF1ZXJ5IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHJpbmciLCJ2YXJzIiwiaSIsInBhaXIiLCJjbG9jayIsIkNsb2NrIiwiZ2F0ZURhdGEiLCJjb2xvckRhdGEiLCJzaGluaW5nTGlzdCIsIlNjZW5lIiwiQ0FNX1BPUyIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsImFscGhhIiwic2V0UGl4ZWxSYXRpbyIsIkdyb3VwIiwiTGF5ZXJzIiwiY3JlYXRlQ29udHJvbHMiLCJjcmVhdGVMaWdodCIsImV2ZW50Q29sbGVjdGlvbiIsInR3ZWVuRmxvb3IiLCJnYXRlIiwiYnVpbGRpbmdSaXNlIiwiYmxvb20iLCJzZXRCbG9vbVBhc3MiLCJzZXRGaW5hbFBhc3MiLCJzaGluZSIsInNoaW5pbmciLCJyYW5kb20iLCJhbmltYXRlRmxvb3IiLCJhbmltYXRlIiwiZGVsdGEiLCJnZXREZWx0YSIsInVwIiwidXBGbG9vciIsImRvd24iLCJkb3duRmxvb3IiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZW5kZXIiLCJlYWNoIiwiY2IiLCJkeW5hbWljRmxvb3IiLCJsb2FkTWFwIiwibG9hZFBsYW5lIiwiY3JlYXRlRmxvb3JOYW1lIiwiZ2F0ZUFyciIsImNyZWF0ZUdhdGVMb2dvIiwiX21vZGVEaWZmSGFuZGxlIiwiY2hhbmdlRmxvb3IiLCJjb3VudCIsInNpbmdsZVRvTXVsdGkiLCJzaW5nbGVUb1NpbmdsZSIsIm11bHRpVG9TaW5nbGUiLCJzbGljZSIsImhhbmRsZUV2ZW50IiwiY3JlYXRlTGV2aXRhdGVCb3giLCJib3hMZWZ0Iiwib2Zmc2V0TGVmdCIsImJveFJpZ2h0IiwiYm94VG9wIiwib2Zmc2V0VG9wIiwiYm94Qm90dG9tIiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIk9yYml0Q29udHJvbHMiLCJlbmFibGVab29tIiwiZW5hYmxlUm90YXRlIiwic2NyZWVuU3BhY2VQYW5uaW5nIiwic2F2ZVN0YXRlIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJIZW1pc3BoZXJlTGlnaHQiLCJheGVzSGVscGVyIiwiQXhlc0hlbHBlciIsInR5cGUiLCJtZXNoTm8iLCJDb2xvciIsInVwZmxvb3JFbDIiLCJ1cGZsb29yRWwiLCJjaGlsZE5vZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlZm9yZVVwIiwiZG93bmZsb29yRWwiLCJiZWZvcmVEb3duIiwiYWxsRWwiLCJnYXRlRWwiLCJjcmVhdGVHYXRlIiwib25Eb2N1bWVudE1vdXNlQ2xpY2siLCJvbldpbmRvd1Jlc2l6ZSIsInRpbWUiLCJiYWNrZ3JvdW5kIiwid29ybGQiLCJoYW5kbGVNZXNzYWdlIiwicmVjZWl2ZUdhdGVJbmZvIiwicmVjZWl2ZUNvbG9ySW5mbyIsImZsb29yQ291bnQiLCJfZ2V0VXBEb3duRmxvb3JDb3VudCIsInN0YW5kYXJkQ291bnQiLCJtaW5GbG9vciIsIl9jYWN1bGF0ZU1pbnVzSW5kZXgiLCJFdmVudEVtaXR0ZXIiLCJlbWl0IiwiZG93bkZsb29yQ291bnQiLCJ1cEZsb29yQ291bnQiLCJhcnIiLCJzY3JlZW5Qb2ludCIsInBYIiwicFkiLCJ6ZCIsInphIiwiYngiLCJ0YW4iLCJieSIsInN4Iiwic3kiLCJfZXZlbnRzIiwiY2FsbGJhY2tzIiwiZmlsdGVyIiwiZm4iLCJhcmdzIiwicGFyYW1zIiwiY2FsbCIsImFwcGx5Iiwid3JhcEZ1bmMiLCJvZmYiLCJvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxVQUFVLEVBQUU7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9CQUFvQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkJBQTZCO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELHlCQUF5QjtBQUN2RixxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QWN3TyxRQUFkO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztBQUdZdkIsMkVBQWYsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY2VuZS9tYXBXb3JsZC5qc1wiKTtcbiIsIi8qIVxuICogYXN5bmNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMC0yMDE0IENhb2xhbiBNY01haG9uXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBhc3luYyA9IHt9O1xuICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgIGZ1bmN0aW9uIGlkZW50aXR5KHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvQm9vbCh2KSB7XG4gICAgICAgIHJldHVybiAhIXY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5vdElkKHYpIHtcbiAgICAgICAgcmV0dXJuICF2O1xuICAgIH1cblxuICAgIC8vIGdsb2JhbCBvbiB0aGUgc2VydmVyLCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgICB2YXIgcHJldmlvdXNfYXN5bmM7XG5cbiAgICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCAoYHNlbGZgKSBpbiB0aGUgYnJvd3NlciwgYGdsb2JhbGBcbiAgICAvLyBvbiB0aGUgc2VydmVyLCBvciBgdGhpc2AgaW4gc29tZSB2aXJ0dWFsIG1hY2hpbmVzLiBXZSB1c2UgYHNlbGZgXG4gICAgLy8gaW5zdGVhZCBvZiBgd2luZG93YCBmb3IgYFdlYldvcmtlcmAgc3VwcG9ydC5cbiAgICB2YXIgcm9vdCA9IHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZiB8fFxuICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsICYmIGdsb2JhbCB8fFxuICAgICAgICAgICAgdGhpcztcblxuICAgIGlmIChyb290ICE9IG51bGwpIHtcbiAgICAgICAgcHJldmlvdXNfYXN5bmMgPSByb290LmFzeW5jO1xuICAgIH1cblxuICAgIGFzeW5jLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvb3QuYXN5bmMgPSBwcmV2aW91c19hc3luYztcbiAgICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBvbmx5X29uY2UoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGZuID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayB3YXMgYWxyZWFkeSBjYWxsZWQuXCIpO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfb25jZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBmbiA9IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8vLyBjcm9zcy1icm93c2VyIGNvbXBhdGlibGl0eSBmdW5jdGlvbnMgLy8vL1xuXG4gICAgdmFyIF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbiAgICB2YXIgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfTtcblxuICAgIC8vIFBvcnRlZCBmcm9tIHVuZGVyc2NvcmUuanMgaXNPYmplY3RcbiAgICB2YXIgX2lzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICAgICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9pc0FycmF5TGlrZShhcnIpIHtcbiAgICAgICAgcmV0dXJuIF9pc0FycmF5KGFycikgfHwgKFxuICAgICAgICAgICAgLy8gaGFzIGEgcG9zaXRpdmUgaW50ZWdlciBsZW5ndGggcHJvcGVydHlcbiAgICAgICAgICAgIHR5cGVvZiBhcnIubGVuZ3RoID09PSBcIm51bWJlclwiICYmXG4gICAgICAgICAgICBhcnIubGVuZ3RoID49IDAgJiZcbiAgICAgICAgICAgIGFyci5sZW5ndGggJSAxID09PSAwXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2FycmF5RWFjaChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IoYXJyW2luZGV4XSwgaW5kZXgsIGFycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbWFwKGFyciwgaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgICBsZW5ndGggPSBhcnIubGVuZ3RoLFxuICAgICAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdG9yKGFycltpbmRleF0sIGluZGV4LCBhcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3JhbmdlKGNvdW50KSB7XG4gICAgICAgIHJldHVybiBfbWFwKEFycmF5KGNvdW50KSwgZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGk7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9yZWR1Y2UoYXJyLCBpdGVyYXRvciwgbWVtbykge1xuICAgICAgICBfYXJyYXlFYWNoKGFyciwgZnVuY3Rpb24gKHgsIGksIGEpIHtcbiAgICAgICAgICAgIG1lbW8gPSBpdGVyYXRvcihtZW1vLCB4LCBpLCBhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9mb3JFYWNoT2Yob2JqZWN0LCBpdGVyYXRvcikge1xuICAgICAgICBfYXJyYXlFYWNoKF9rZXlzKG9iamVjdCksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrZXldLCBrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaW5kZXhPZihhcnIsIGl0ZW0pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICB2YXIgX2tleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfa2V5SXRlcmF0b3IoY29sbCkge1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB2YXIgbGVuO1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAgaWYgKF9pc0FycmF5TGlrZShjb2xsKSkge1xuICAgICAgICAgICAgbGVuID0gY29sbC5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPCBsZW4gPyBpIDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXlzID0gX2tleXMoY29sbCk7XG4gICAgICAgICAgICBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IGtleXNbaV0gOiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNpbWlsYXIgdG8gRVM2J3MgcmVzdCBwYXJhbSAoaHR0cDovL2FyaXlhLm9maWxhYnMuY29tLzIwMTMvMDMvZXM2LWFuZC1yZXN0LXBhcmFtZXRlci5odG1sKVxuICAgIC8vIFRoaXMgYWNjdW11bGF0ZXMgdGhlIGFyZ3VtZW50cyBwYXNzZWQgaW50byBhbiBhcnJheSwgYWZ0ZXIgYSBnaXZlbiBpbmRleC5cbiAgICAvLyBGcm9tIHVuZGVyc2NvcmUuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9wdWxsLzIxNDApLlxuICAgIGZ1bmN0aW9uIF9yZXN0UGFyYW0oZnVuYywgc3RhcnRJbmRleCkge1xuICAgICAgICBzdGFydEluZGV4ID0gc3RhcnRJbmRleCA9PSBudWxsID8gZnVuYy5sZW5ndGggLSAxIDogK3N0YXJ0SW5kZXg7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChhcmd1bWVudHMubGVuZ3RoIC0gc3RhcnRJbmRleCwgMCk7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IEFycmF5KGxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXggKyBzdGFydEluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJndW1lbnRzWzBdLCByZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEN1cnJlbnRseSB1bnVzZWQgYnV0IGhhbmRsZSBjYXNlcyBvdXRzaWRlIG9mIHRoZSBzd2l0Y2ggc3RhdGVtZW50OlxuICAgICAgICAgICAgLy8gdmFyIGFyZ3MgPSBBcnJheShzdGFydEluZGV4ICsgMSk7XG4gICAgICAgICAgICAvLyBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBzdGFydEluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAvLyAgICAgYXJnc1tpbmRleF0gPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gYXJnc1tzdGFydEluZGV4XSA9IHJlc3Q7XG4gICAgICAgICAgICAvLyByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfd2l0aG91dEluZGV4KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yKHZhbHVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8vLyBleHBvcnRlZCBhc3luYyBtb2R1bGUgZnVuY3Rpb25zIC8vLy9cblxuICAgIC8vLy8gbmV4dFRpY2sgaW1wbGVtZW50YXRpb24gd2l0aCBicm93c2VyLWNvbXBhdGlibGUgZmFsbGJhY2sgLy8vL1xuXG4gICAgLy8gY2FwdHVyZSB0aGUgZ2xvYmFsIHJlZmVyZW5jZSB0byBndWFyZCBhZ2FpbnN0IGZha2VUaW1lciBtb2Nrc1xuICAgIHZhciBfc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXRJbW1lZGlhdGU7XG5cbiAgICB2YXIgX2RlbGF5ID0gX3NldEltbWVkaWF0ZSA/IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIC8vIG5vdCBhIGRpcmVjdCBhbGlhcyBmb3IgSUUxMCBjb21wYXRpYmlsaXR5XG4gICAgICAgIF9zZXRJbW1lZGlhdGUoZm4pO1xuICAgIH0gOiBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhc3luYy5uZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXN5bmMubmV4dFRpY2sgPSBfZGVsYXk7XG4gICAgfVxuICAgIGFzeW5jLnNldEltbWVkaWF0ZSA9IF9zZXRJbW1lZGlhdGUgPyBfZGVsYXkgOiBhc3luYy5uZXh0VGljaztcblxuXG4gICAgYXN5bmMuZm9yRWFjaCA9XG4gICAgYXN5bmMuZWFjaCA9IGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMuZWFjaE9mKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRvciksIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZm9yRWFjaFNlcmllcyA9XG4gICAgYXN5bmMuZWFjaFNlcmllcyA9IGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMuZWFjaE9mU2VyaWVzKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRvciksIGNhbGxiYWNrKTtcbiAgICB9O1xuXG5cbiAgICBhc3luYy5mb3JFYWNoTGltaXQgPVxuICAgIGFzeW5jLmVhY2hMaW1pdCA9IGZ1bmN0aW9uIChhcnIsIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIF9lYWNoT2ZMaW1pdChsaW1pdCkoYXJyLCBfd2l0aG91dEluZGV4KGl0ZXJhdG9yKSwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5mb3JFYWNoT2YgPVxuICAgIGFzeW5jLmVhY2hPZiA9IGZ1bmN0aW9uIChvYmplY3QsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBvYmplY3QgPSBvYmplY3QgfHwgW107XG5cbiAgICAgICAgdmFyIGl0ZXIgPSBfa2V5SXRlcmF0b3Iob2JqZWN0KTtcbiAgICAgICAgdmFyIGtleSwgY29tcGxldGVkID0gMDtcblxuICAgICAgICB3aGlsZSAoKGtleSA9IGl0ZXIoKSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcGxldGVkICs9IDE7XG4gICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba2V5XSwga2V5LCBvbmx5X29uY2UoZG9uZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBsZXRlZCA9PT0gMCkgY2FsbGJhY2sobnVsbCk7XG5cbiAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZC0tO1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBrZXkgaXMgbnVsbCBpbiBjYXNlIGl0ZXJhdG9yIGlzbid0IGV4aGF1c3RlZFxuICAgICAgICAgICAgLy8gYW5kIGRvbmUgcmVzb2x2ZWQgc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gbnVsbCAmJiBjb21wbGV0ZWQgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jLmZvckVhY2hPZlNlcmllcyA9XG4gICAgYXN5bmMuZWFjaE9mU2VyaWVzID0gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIG9iaiA9IG9iaiB8fCBbXTtcbiAgICAgICAgdmFyIG5leHRLZXkgPSBfa2V5SXRlcmF0b3Iob2JqKTtcbiAgICAgICAgdmFyIGtleSA9IG5leHRLZXkoKTtcbiAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVyYXRvcihvYmpba2V5XSwga2V5LCBvbmx5X29uY2UoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IG5leHRLZXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoaXRlcmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN5bmMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpdGVyYXRlKCk7XG4gICAgfTtcblxuXG5cbiAgICBhc3luYy5mb3JFYWNoT2ZMaW1pdCA9XG4gICAgYXN5bmMuZWFjaE9mTGltaXQgPSBmdW5jdGlvbiAob2JqLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9lYWNoT2ZMaW1pdChsaW1pdCkob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfZWFjaE9mTGltaXQobGltaXQpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICAgICAgb2JqID0gb2JqIHx8IFtdO1xuICAgICAgICAgICAgdmFyIG5leHRLZXkgPSBfa2V5SXRlcmF0b3Iob2JqKTtcbiAgICAgICAgICAgIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBydW5uaW5nID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvcmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiByZXBsZW5pc2ggKCkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lICYmIHJ1bm5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHJ1bm5pbmcgPCBsaW1pdCAmJiAhZXJyb3JlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gbmV4dEtleSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG9ialtrZXldLCBrZXksIG9ubHlfb25jZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxlbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGRvUGFyYWxsZWwoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGFzeW5jLmVhY2hPZiwgb2JqLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1BhcmFsbGVsTGltaXQoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihfZWFjaE9mTGltaXQobGltaXQpLCBvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvU2VyaWVzKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihhc3luYy5lYWNoT2ZTZXJpZXMsIG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYXN5bmNNYXAoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBhcnIgPSBhcnIgfHwgW107XG4gICAgICAgIHZhciByZXN1bHRzID0gX2lzQXJyYXlMaWtlKGFycikgPyBbXSA6IHt9O1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IodmFsdWUsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHY7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5tYXAgPSBkb1BhcmFsbGVsKF9hc3luY01hcCk7XG4gICAgYXN5bmMubWFwU2VyaWVzID0gZG9TZXJpZXMoX2FzeW5jTWFwKTtcbiAgICBhc3luYy5tYXBMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfYXN5bmNNYXApO1xuXG4gICAgLy8gcmVkdWNlIG9ubHkgaGFzIGEgc2VyaWVzIHZlcnNpb24sIGFzIGRvaW5nIHJlZHVjZSBpbiBwYXJhbGxlbCB3b24ndFxuICAgIC8vIHdvcmsgaW4gbWFueSBzaXR1YXRpb25zLlxuICAgIGFzeW5jLmluamVjdCA9XG4gICAgYXN5bmMuZm9sZGwgPVxuICAgIGFzeW5jLnJlZHVjZSA9IGZ1bmN0aW9uIChhcnIsIG1lbW8sIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5lYWNoT2ZTZXJpZXMoYXJyLCBmdW5jdGlvbiAoeCwgaSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG1lbW8sIHgsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICBtZW1vID0gdjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbWVtbyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBhc3luYy5mb2xkciA9XG4gICAgYXN5bmMucmVkdWNlUmlnaHQgPSBmdW5jdGlvbiAoYXJyLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJldmVyc2VkID0gX21hcChhcnIsIGlkZW50aXR5KS5yZXZlcnNlKCk7XG4gICAgICAgIGFzeW5jLnJlZHVjZShyZXZlcnNlZCwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMudHJhbnNmb3JtID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGl0ZXJhdG9yO1xuICAgICAgICAgICAgaXRlcmF0b3IgPSBtZW1vO1xuICAgICAgICAgICAgbWVtbyA9IF9pc0FycmF5KGFycikgPyBbXSA6IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMuZWFjaE9mKGFyciwgZnVuY3Rpb24odiwgaywgY2IpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG1lbW8sIHYsIGssIGNiKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG1lbW8pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2ZpbHRlcihlYWNoZm4sIGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHgsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtpbmRleDogaW5kZXgsIHZhbHVlOiB4fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soX21hcChyZXN1bHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gICAgICAgICAgICB9KSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMuc2VsZWN0ID1cbiAgICBhc3luYy5maWx0ZXIgPSBkb1BhcmFsbGVsKF9maWx0ZXIpO1xuXG4gICAgYXN5bmMuc2VsZWN0TGltaXQgPVxuICAgIGFzeW5jLmZpbHRlckxpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9maWx0ZXIpO1xuXG4gICAgYXN5bmMuc2VsZWN0U2VyaWVzID1cbiAgICBhc3luYy5maWx0ZXJTZXJpZXMgPSBkb1NlcmllcyhfZmlsdGVyKTtcblxuICAgIGZ1bmN0aW9uIF9yZWplY3QoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBfZmlsdGVyKGVhY2hmbiwgYXJyLCBmdW5jdGlvbih2YWx1ZSwgY2IpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHZhbHVlLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgY2IoIXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgYXN5bmMucmVqZWN0ID0gZG9QYXJhbGxlbChfcmVqZWN0KTtcbiAgICBhc3luYy5yZWplY3RMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfcmVqZWN0KTtcbiAgICBhc3luYy5yZWplY3RTZXJpZXMgPSBkb1NlcmllcyhfcmVqZWN0KTtcblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVUZXN0ZXIoZWFjaGZuLCBjaGVjaywgZ2V0UmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhcnIsIGxpbWl0LCBpdGVyYXRvciwgY2IpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSBjYihnZXRSZXN1bHQoZmFsc2UsIHZvaWQgMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZWUoeCwgXywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IgJiYgY2hlY2sodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGdldFJlc3VsdCh0cnVlLCB4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdG9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIGxpbWl0LCBpdGVyYXRlZSwgZG9uZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0b3I7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBsaW1pdDtcbiAgICAgICAgICAgICAgICBlYWNoZm4oYXJyLCBpdGVyYXRlZSwgZG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMuYW55ID1cbiAgICBhc3luYy5zb21lID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2YsIHRvQm9vbCwgaWRlbnRpdHkpO1xuXG4gICAgYXN5bmMuc29tZUxpbWl0ID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2ZMaW1pdCwgdG9Cb29sLCBpZGVudGl0eSk7XG5cbiAgICBhc3luYy5hbGwgPVxuICAgIGFzeW5jLmV2ZXJ5ID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2YsIG5vdElkLCBub3RJZCk7XG5cbiAgICBhc3luYy5ldmVyeUxpbWl0ID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2ZMaW1pdCwgbm90SWQsIG5vdElkKTtcblxuICAgIGZ1bmN0aW9uIF9maW5kR2V0UmVzdWx0KHYsIHgpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGFzeW5jLmRldGVjdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mLCBpZGVudGl0eSwgX2ZpbmRHZXRSZXN1bHQpO1xuICAgIGFzeW5jLmRldGVjdFNlcmllcyA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mU2VyaWVzLCBpZGVudGl0eSwgX2ZpbmRHZXRSZXN1bHQpO1xuICAgIGFzeW5jLmRldGVjdExpbWl0ID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2ZMaW1pdCwgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcblxuICAgIGFzeW5jLnNvcnRCeSA9IGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5tYXAoYXJyLCBmdW5jdGlvbiAoeCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHgsIGZ1bmN0aW9uIChlcnIsIGNyaXRlcmlhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwge3ZhbHVlOiB4LCBjcml0ZXJpYTogY3JpdGVyaWF9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgX21hcChyZXN1bHRzLnNvcnQoY29tcGFyYXRvciksIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4LnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjb21wYXJhdG9yKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWEsIGIgPSByaWdodC5jcml0ZXJpYTtcbiAgICAgICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYy5hdXRvID0gZnVuY3Rpb24gKHRhc2tzLCBjb25jdXJyZW5jeSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNvbmN1cnJlbmN5IGlzIG9wdGlvbmFsLCBzaGlmdCB0aGUgYXJncy5cbiAgICAgICAgICAgIGNhbGxiYWNrID0gY29uY3VycmVuY3k7XG4gICAgICAgICAgICBjb25jdXJyZW5jeSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIGtleXMgPSBfa2V5cyh0YXNrcyk7XG4gICAgICAgIHZhciByZW1haW5pbmdUYXNrcyA9IGtleXMubGVuZ3RoO1xuICAgICAgICBpZiAoIXJlbWFpbmluZ1Rhc2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSByZW1haW5pbmdUYXNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHRzID0ge307XG4gICAgICAgIHZhciBydW5uaW5nVGFza3MgPSAwO1xuXG4gICAgICAgIHZhciBoYXNFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoZm4pIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy51bnNoaWZ0KGZuKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihmbikge1xuICAgICAgICAgICAgdmFyIGlkeCA9IF9pbmRleE9mKGxpc3RlbmVycywgZm4pO1xuICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKCkge1xuICAgICAgICAgICAgcmVtYWluaW5nVGFza3MtLTtcbiAgICAgICAgICAgIF9hcnJheUVhY2gobGlzdGVuZXJzLnNsaWNlKDApLCBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXJlbWFpbmluZ1Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9hcnJheUVhY2goa2V5cywgZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIGlmIChoYXNFcnJvcikgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRhc2sgPSBfaXNBcnJheSh0YXNrc1trXSkgPyB0YXNrc1trXTogW3Rhc2tzW2tdXTtcbiAgICAgICAgICAgIHZhciB0YXNrQ2FsbGJhY2sgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUYXNrcy0tO1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzYWZlUmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBfZm9yRWFjaE9mKHJlc3VsdHMsIGZ1bmN0aW9uKHZhbCwgcmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNbcmtleV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzYWZlUmVzdWx0c1trXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIsIHNhZmVSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNba10gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUodGFza0NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciByZXF1aXJlcyA9IHRhc2suc2xpY2UoMCwgdGFzay5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZGVhZC1sb2Nrc1xuICAgICAgICAgICAgdmFyIGxlbiA9IHJlcXVpcmVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkZXA7XG4gICAgICAgICAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShkZXAgPSB0YXNrc1tyZXF1aXJlc1tsZW5dXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXMgbm9uZXhpc3RlbnQgZGVwZW5kZW5jeSBpbiAnICsgcmVxdWlyZXMuam9pbignLCAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheShkZXApICYmIF9pbmRleE9mKGRlcCwgaykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hhcyBjeWNsaWMgZGVwZW5kZW5jaWVzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmdUYXNrcyA8IGNvbmN1cnJlbmN5ICYmIF9yZWR1Y2UocmVxdWlyZXMsIGZ1bmN0aW9uIChhLCB4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYSAmJiByZXN1bHRzLmhhc093blByb3BlcnR5KHgpKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlKSAmJiAhcmVzdWx0cy5oYXNPd25Qcm9wZXJ0eShrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1Rhc2tzKys7XG4gICAgICAgICAgICAgICAgdGFza1t0YXNrLmxlbmd0aCAtIDFdKHRhc2tDYWxsYmFjaywgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkoKSkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MrKztcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrW3Rhc2subGVuZ3RoIC0gMV0odGFza0NhbGxiYWNrLCByZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuXG4gICAgYXN5bmMucmV0cnkgPSBmdW5jdGlvbih0aW1lcywgdGFzaywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIERFRkFVTFRfVElNRVMgPSA1O1xuICAgICAgICB2YXIgREVGQVVMVF9JTlRFUlZBTCA9IDA7XG5cbiAgICAgICAgdmFyIGF0dGVtcHRzID0gW107XG5cbiAgICAgICAgdmFyIG9wdHMgPSB7XG4gICAgICAgICAgICB0aW1lczogREVGQVVMVF9USU1FUyxcbiAgICAgICAgICAgIGludGVydmFsOiBERUZBVUxUX0lOVEVSVkFMXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VUaW1lcyhhY2MsIHQpe1xuICAgICAgICAgICAgaWYodHlwZW9mIHQgPT09ICdudW1iZXInKXtcbiAgICAgICAgICAgICAgICBhY2MudGltZXMgPSBwYXJzZUludCh0LCAxMCkgfHwgREVGQVVMVF9USU1FUztcbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YgdCA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9IHBhcnNlSW50KHQudGltZXMsIDEwKSB8fCBERUZBVUxUX1RJTUVTO1xuICAgICAgICAgICAgICAgIGFjYy5pbnRlcnZhbCA9IHBhcnNlSW50KHQuaW50ZXJ2YWwsIDEwKSB8fCBERUZBVUxUX0lOVEVSVkFMO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFyZ3VtZW50IHR5cGUgZm9yIFxcJ3RpbWVzXFwnOiAnICsgdHlwZW9mIHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPCAxIHx8IGxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMgLSBtdXN0IGJlIGVpdGhlciAodGFzayksICh0YXNrLCBjYWxsYmFjayksICh0aW1lcywgdGFzaykgb3IgKHRpbWVzLCB0YXNrLCBjYWxsYmFjayknKTtcbiAgICAgICAgfSBlbHNlIGlmIChsZW5ndGggPD0gMiAmJiB0eXBlb2YgdGltZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdGFzaztcbiAgICAgICAgICAgIHRhc2sgPSB0aW1lcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRpbWVzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBwYXJzZVRpbWVzKG9wdHMsIHRpbWVzKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIG9wdHMudGFzayA9IHRhc2s7XG5cbiAgICAgICAgZnVuY3Rpb24gd3JhcHBlZFRhc2sod3JhcHBlZENhbGxiYWNrLCB3cmFwcGVkUmVzdWx0cykge1xuICAgICAgICAgICAgZnVuY3Rpb24gcmV0cnlBdHRlbXB0KHRhc2ssIGZpbmFsQXR0ZW1wdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzZXJpZXNDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB0YXNrKGZ1bmN0aW9uKGVyciwgcmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKCFlcnIgfHwgZmluYWxBdHRlbXB0LCB7ZXJyOiBlcnIsIHJlc3VsdDogcmVzdWx0fSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHdyYXBwZWRSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZXRyeUludGVydmFsKGludGVydmFsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2VyaWVzQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNDYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChvcHRzLnRpbWVzKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmluYWxBdHRlbXB0ID0gIShvcHRzLnRpbWVzLT0xKTtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cy5wdXNoKHJldHJ5QXR0ZW1wdChvcHRzLnRhc2ssIGZpbmFsQXR0ZW1wdCkpO1xuICAgICAgICAgICAgICAgIGlmKCFmaW5hbEF0dGVtcHQgJiYgb3B0cy5pbnRlcnZhbCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cy5wdXNoKHJldHJ5SW50ZXJ2YWwob3B0cy5pbnRlcnZhbCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXN5bmMuc2VyaWVzKGF0dGVtcHRzLCBmdW5jdGlvbihkb25lLCBkYXRhKXtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICh3cmFwcGVkQ2FsbGJhY2sgfHwgb3B0cy5jYWxsYmFjaykoZGF0YS5lcnIsIGRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYSBjYWxsYmFjayBpcyBwYXNzZWQsIHJ1biB0aGlzIGFzIGEgY29udHJvbGwgZmxvd1xuICAgICAgICByZXR1cm4gb3B0cy5jYWxsYmFjayA/IHdyYXBwZWRUYXNrKCkgOiB3cmFwcGVkVGFzaztcbiAgICB9O1xuXG4gICAgYXN5bmMud2F0ZXJmYWxsID0gZnVuY3Rpb24gKHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBpZiAoIV9pc0FycmF5KHRhc2tzKSkge1xuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gd2F0ZXJmYWxsIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJyk7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JhcEl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBbZXJyXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2god3JhcEl0ZXJhdG9yKG5leHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW5zdXJlQXN5bmMoaXRlcmF0b3IpLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHdyYXBJdGVyYXRvcihhc3luYy5pdGVyYXRvcih0YXNrcykpKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9wYXJhbGxlbChlYWNoZm4sIHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIHZhciByZXN1bHRzID0gX2lzQXJyYXlMaWtlKHRhc2tzKSA/IFtdIDoge307XG5cbiAgICAgICAgZWFjaGZuKHRhc2tzLCBmdW5jdGlvbiAodGFzaywga2V5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGFzayhfcmVzdFBhcmFtKGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5wYXJhbGxlbCA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgX3BhcmFsbGVsKGFzeW5jLmVhY2hPZiwgdGFza3MsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMucGFyYWxsZWxMaW1pdCA9IGZ1bmN0aW9uKHRhc2tzLCBsaW1pdCwgY2FsbGJhY2spIHtcbiAgICAgICAgX3BhcmFsbGVsKF9lYWNoT2ZMaW1pdChsaW1pdCksIHRhc2tzLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnNlcmllcyA9IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoYXN5bmMuZWFjaE9mU2VyaWVzLCB0YXNrcywgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5pdGVyYXRvciA9IGZ1bmN0aW9uICh0YXNrcykge1xuICAgICAgICBmdW5jdGlvbiBtYWtlQ2FsbGJhY2soaW5kZXgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZuKCkge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza3NbaW5kZXhdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmbi5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoaW5kZXggPCB0YXNrcy5sZW5ndGggLSAxKSA/IG1ha2VDYWxsYmFjayhpbmRleCArIDEpOiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFrZUNhbGxiYWNrKDApO1xuICAgIH07XG5cbiAgICBhc3luYy5hcHBseSA9IF9yZXN0UGFyYW0oZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChjYWxsQXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KFxuICAgICAgICAgICAgICAgIG51bGwsIGFyZ3MuY29uY2F0KGNhbGxBcmdzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBfY29uY2F0KGVhY2hmbiwgYXJyLCBmbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgaW5kZXgsIGNiKSB7XG4gICAgICAgICAgICBmbih4LCBmdW5jdGlvbiAoZXJyLCB5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh5IHx8IFtdKTtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jLmNvbmNhdCA9IGRvUGFyYWxsZWwoX2NvbmNhdCk7XG4gICAgYXN5bmMuY29uY2F0U2VyaWVzID0gZG9TZXJpZXMoX2NvbmNhdCk7XG5cbiAgICBhc3luYy53aGlsc3QgPSBmdW5jdGlvbiAodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcDtcbiAgICAgICAgaWYgKHRlc3QoKSkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3QuYXBwbHkodGhpcywgYXJncykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IobmV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdGVyYXRvcihuZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jLmRvV2hpbHN0ID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCB0ZXN0LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbHMgPSAwO1xuICAgICAgICByZXR1cm4gYXN5bmMud2hpbHN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICsrY2FsbHMgPD0gMSB8fCB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnVudGlsID0gZnVuY3Rpb24gKHRlc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMud2hpbHN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmRvVW50aWwgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIHRlc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5kb1doaWxzdChpdGVyYXRvciwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5kdXJpbmcgPSBmdW5jdGlvbiAodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcDtcblxuICAgICAgICB2YXIgbmV4dCA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGNoZWNrKTtcbiAgICAgICAgICAgICAgICB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbihlcnIsIHRydXRoKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJ1dGgpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihuZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGVzdChjaGVjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmRvRHVyaW5nID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCB0ZXN0LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbHMgPSAwO1xuICAgICAgICBhc3luYy5kdXJpbmcoZnVuY3Rpb24obmV4dCkge1xuICAgICAgICAgICAgaWYgKGNhbGxzKysgPCAxKSB7XG4gICAgICAgICAgICAgICAgbmV4dChudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfcXVldWUod29ya2VyLCBjb25jdXJyZW5jeSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoY29uY3VycmVuY3kgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoY29uY3VycmVuY3kgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uY3VycmVuY3kgbXVzdCBub3QgYmUgemVybycpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9pbnNlcnQocSwgZGF0YSwgcG9zLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0YXNrIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIV9pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoID09PSAwICYmIHEuaWRsZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFpbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBhcmUgbm8gdGFza3NcbiAgICAgICAgICAgICAgICByZXR1cm4gYXN5bmMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYXJyYXlFYWNoKGRhdGEsIGZ1bmN0aW9uKHRhc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGFzayxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrIHx8IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCA9PT0gcS5jb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICBxLnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHEucHJvY2Vzcyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX25leHQocSwgdGFza3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHdvcmtlcnMgLT0gMTtcblxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgX2FycmF5RWFjaCh0YXNrcywgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgX2FycmF5RWFjaCh3b3JrZXJzTGlzdCwgZnVuY3Rpb24gKHdvcmtlciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZXIgPT09IHRhc2sgJiYgIXJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrLmNhbGxiYWNrLmFwcGx5KHRhc2ssIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd29ya2VycyA9IDA7XG4gICAgICAgIHZhciB3b3JrZXJzTGlzdCA9IFtdO1xuICAgICAgICB2YXIgcSA9IHtcbiAgICAgICAgICAgIHRhc2tzOiBbXSxcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5OiBjb25jdXJyZW5jeSxcbiAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IG5vb3AsXG4gICAgICAgICAgICBlbXB0eTogbm9vcCxcbiAgICAgICAgICAgIGRyYWluOiBub29wLFxuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBmYWxzZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBxLmRyYWluID0gbm9vcDtcbiAgICAgICAgICAgICAgICBxLnRhc2tzID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zaGlmdDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCB0cnVlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlKCFxLnBhdXNlZCAmJiB3b3JrZXJzIDwgcS5jb25jdXJyZW5jeSAmJiBxLnRhc2tzLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tzID0gcS5wYXlsb2FkID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHEudGFza3Muc3BsaWNlKDAsIHEucGF5bG9hZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoMCwgcS50YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gX21hcCh0YXNrcywgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcnMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2Vyc0xpc3QucHVzaCh0YXNrc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IG9ubHlfb25jZShfbmV4dChxLCB0YXNrcykpO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXIoZGF0YSwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZW5ndGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcS50YXNrcy5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVubmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXJzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdvcmtlcnNMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlcnNMaXN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBxLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHEucGF1c2VkID09PSBmYWxzZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICBxLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bWVDb3VudCA9IE1hdGgubWluKHEuY29uY3VycmVuY3ksIHEudGFza3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIGNhbGwgcS5wcm9jZXNzIG9uY2UgcGVyIGNvbmN1cnJlbnRcbiAgICAgICAgICAgICAgICAvLyB3b3JrZXIgdG8gcHJlc2VydmUgZnVsbCBjb25jdXJyZW5jeSBhZnRlciBwYXVzZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIHcgPSAxOyB3IDw9IHJlc3VtZUNvdW50OyB3KyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHEucHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcTtcbiAgICB9XG5cbiAgICBhc3luYy5xdWV1ZSA9IGZ1bmN0aW9uICh3b3JrZXIsIGNvbmN1cnJlbmN5KSB7XG4gICAgICAgIHZhciBxID0gX3F1ZXVlKGZ1bmN0aW9uIChpdGVtcywgY2IpIHtcbiAgICAgICAgICAgIHdvcmtlcihpdGVtc1swXSwgY2IpO1xuICAgICAgICB9LCBjb25jdXJyZW5jeSwgMSk7XG5cbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfTtcblxuICAgIGFzeW5jLnByaW9yaXR5UXVldWUgPSBmdW5jdGlvbiAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9jb21wYXJlVGFza3MoYSwgYil7XG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfYmluYXJ5U2VhcmNoKHNlcXVlbmNlLCBpdGVtLCBjb21wYXJlKSB7XG4gICAgICAgICAgICB2YXIgYmVnID0gLTEsXG4gICAgICAgICAgICAgICAgZW5kID0gc2VxdWVuY2UubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChiZWcgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWlkID0gYmVnICsgKChlbmQgLSBiZWcgKyAxKSA+Pj4gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoaXRlbSwgc2VxdWVuY2VbbWlkXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBiZWcgPSBtaWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmVnO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGFzayBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFfaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhaW4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIHRhc2tzXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2FycmF5RWFjaChkYXRhLCBmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IGNhbGxiYWNrIDogbm9vcFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZShfYmluYXJ5U2VhcmNoKHEudGFza3MsIGl0ZW0sIF9jb21wYXJlVGFza3MpICsgMSwgMCwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IHEuY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5zYXR1cmF0ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHEucHJvY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYSBub3JtYWwgcXVldWVcbiAgICAgICAgdmFyIHEgPSBhc3luYy5xdWV1ZSh3b3JrZXIsIGNvbmN1cnJlbmN5KTtcblxuICAgICAgICAvLyBPdmVycmlkZSBwdXNoIHRvIGFjY2VwdCBzZWNvbmQgcGFyYW1ldGVyIHJlcHJlc2VudGluZyBwcmlvcml0eVxuICAgICAgICBxLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHVuc2hpZnQgZnVuY3Rpb25cbiAgICAgICAgZGVsZXRlIHEudW5zaGlmdDtcblxuICAgICAgICByZXR1cm4gcTtcbiAgICB9O1xuXG4gICAgYXN5bmMuY2FyZ28gPSBmdW5jdGlvbiAod29ya2VyLCBwYXlsb2FkKSB7XG4gICAgICAgIHJldHVybiBfcXVldWUod29ya2VyLCAxLCBwYXlsb2FkKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2NvbnNvbGVfZm4obmFtZSkge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KFtfcmVzdFBhcmFtKGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnNvbGVbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hcnJheUVhY2goYXJncywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlW25hbWVdKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jLmxvZyA9IF9jb25zb2xlX2ZuKCdsb2cnKTtcbiAgICBhc3luYy5kaXIgPSBfY29uc29sZV9mbignZGlyJyk7XG4gICAgLyphc3luYy5pbmZvID0gX2NvbnNvbGVfZm4oJ2luZm8nKTtcbiAgICBhc3luYy53YXJuID0gX2NvbnNvbGVfZm4oJ3dhcm4nKTtcbiAgICBhc3luYy5lcnJvciA9IF9jb25zb2xlX2ZuKCdlcnJvcicpOyovXG5cbiAgICBhc3luYy5tZW1vaXplID0gZnVuY3Rpb24gKGZuLCBoYXNoZXIpIHtcbiAgICAgICAgdmFyIG1lbW8gPSB7fTtcbiAgICAgICAgdmFyIHF1ZXVlcyA9IHt9O1xuICAgICAgICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgICAgICAgaGFzaGVyID0gaGFzaGVyIHx8IGlkZW50aXR5O1xuICAgICAgICB2YXIgbWVtb2l6ZWQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uIG1lbW9pemVkKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB2YXIga2V5ID0gaGFzaGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKG1lbW8sIGtleSkpIHsgICBcbiAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBtZW1vW2tleV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzLmNhbGwocXVldWVzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcXVldWVzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWV1ZXNba2V5XSA9IFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW19yZXN0UGFyYW0oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVtb1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHEgPSBxdWV1ZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxW2ldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtZW1vaXplZC5tZW1vID0gbWVtbztcbiAgICAgICAgbWVtb2l6ZWQudW5tZW1vaXplZCA9IGZuO1xuICAgICAgICByZXR1cm4gbWVtb2l6ZWQ7XG4gICAgfTtcblxuICAgIGFzeW5jLnVubWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChmbi51bm1lbW9pemVkIHx8IGZuKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfdGltZXMobWFwcGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY291bnQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgbWFwcGVyKF9yYW5nZShjb3VudCksIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMudGltZXMgPSBfdGltZXMoYXN5bmMubWFwKTtcbiAgICBhc3luYy50aW1lc1NlcmllcyA9IF90aW1lcyhhc3luYy5tYXBTZXJpZXMpO1xuICAgIGFzeW5jLnRpbWVzTGltaXQgPSBmdW5jdGlvbiAoY291bnQsIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLm1hcExpbWl0KF9yYW5nZShjb3VudCksIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5zZXEgPSBmdW5jdGlvbiAoLyogZnVuY3Rpb25zLi4uICovKSB7XG4gICAgICAgIHZhciBmbnMgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXN5bmMucmVkdWNlKGZucywgYXJncywgZnVuY3Rpb24gKG5ld2FyZ3MsIGZuLCBjYikge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIG5ld2FyZ3MuY29uY2F0KFtfcmVzdFBhcmFtKGZ1bmN0aW9uIChlcnIsIG5leHRhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVyciwgbmV4dGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pXSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGF0LCBbZXJyXS5jb25jYXQocmVzdWx0cykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBhc3luYy5jb21wb3NlID0gZnVuY3Rpb24gKC8qIGZ1bmN0aW9ucy4uLiAqLykge1xuICAgICAgICByZXR1cm4gYXN5bmMuc2VxLmFwcGx5KG51bGwsIEFycmF5LnByb3RvdHlwZS5yZXZlcnNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gX2FwcGx5RWFjaChlYWNoZm4pIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24oZm5zLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgZ28gPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWFjaGZuKGZucywgZnVuY3Rpb24gKGZuLCBfLCBjYikge1xuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzLmNvbmNhdChbY2JdKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnby5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMuYXBwbHlFYWNoID0gX2FwcGx5RWFjaChhc3luYy5lYWNoT2YpO1xuICAgIGFzeW5jLmFwcGx5RWFjaFNlcmllcyA9IF9hcHBseUVhY2goYXN5bmMuZWFjaE9mU2VyaWVzKTtcblxuXG4gICAgYXN5bmMuZm9yZXZlciA9IGZ1bmN0aW9uIChmbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRvbmUgPSBvbmx5X29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIHZhciB0YXNrID0gZW5zdXJlQXN5bmMoZm4pO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXNrKG5leHQpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZW5zdXJlQXN5bmMoZm4pIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICBhcmdzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbm5lckFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGlubmVyQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGlubmVyQXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc3luYyA9IHRydWU7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIHN5bmMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMuZW5zdXJlQXN5bmMgPSBlbnN1cmVBc3luYztcblxuICAgIGFzeW5jLmNvbnN0YW50ID0gX3Jlc3RQYXJhbShmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbbnVsbF0uY29uY2F0KHZhbHVlcyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFzeW5jLndyYXBTeW5jID1cbiAgICBhc3luYy5hc3luY2lmeSA9IGZ1bmN0aW9uIGFzeW5jaWZ5KGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHJlc3VsdCBpcyBQcm9taXNlIG9iamVjdFxuICAgICAgICAgICAgaWYgKF9pc09iamVjdChyZXN1bHQpICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyci5tZXNzYWdlID8gZXJyIDogbmV3IEVycm9yKGVycikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm9kZS5qc1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuICAgIH1cbiAgICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXN5bmM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBpbmNsdWRlZCBkaXJlY3RseSB2aWEgPHNjcmlwdD4gdGFnXG4gICAgZWxzZSB7XG4gICAgICAgIHJvb3QuYXN5bmMgPSBhc3luYztcbiAgICB9XG5cbn0oKSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5pbXBvcnQgU3RhdGVBIGZyb20gJy4uL3N0YXRlL0Zsb29yJ1xuY2xhc3MgVHJhY2tGbG9vciB7XG5cbiAgY29uc3RydWN0b3IgKCkge31cblxuICBpbml0IChob3VzZURhdGEpIHtcbiAgICB0aGlzLnN0YXRlQSA9IG5ldyBTdGF0ZUEoV29ybGQubWFpbkdyb3VwKVxuICAgIHRoaXMuc3RhdGVBLmluaXQoaG91c2VEYXRhKVxuXG4gICAgdGhpcy5mbG9vckhlaWdodCA9IDEyMFxuICAgIHRoaXMudXBIZWlnaHQgPSAwXG4gICAgdGhpcy5kb3duSGVpZ2h0ID0gdGhpcy5mbG9vckhlaWdodFxuICAgIC8vIHBvc2l0aW9uIGZyYW1lIHNwZWVkXG4gICAgdGhpcy5wb3NpdGlvblNwZWVkID0gMlxuICAgIC8vIG9wYWNpdHkgZnJhbWUgc3BlZWRcbiAgICB0aGlzLm9wYWNpdHlTcGVlZCA9IDAuMyAqIHRoaXMucG9zaXRpb25TcGVlZCAvIHRoaXMuZmxvb3JIZWlnaHRcbiAgICAvLyBzaG9wIG9wYWNpdHkgZnJhbWUgc3BlZWRcbiAgICB0aGlzLm9wYWNpdHlTcGVlZDIgPSAxICogdGhpcy5wb3NpdGlvblNwZWVkIC8gdGhpcy5mbG9vckhlaWdodFxuICB9XG5cbiAgZG93biAoaGlnaCwgbG93LCBncm91cCkge1xuXG4gICAgdGhpcy5kb3duSGVpZ2h0IC09IHRoaXMucG9zaXRpb25TcGVlZFxuICAgIGdyb3VwLnBvc2l0aW9uLnkgLT0gdGhpcy5wb3NpdGlvblNwZWVkXG4gICAgZ3JvdXAuY2hpbGRyZW5bbG93XS51c2VyRGF0YS5pc1Nob3cgPSBmYWxzZVxuICAgIGdyb3VwLmNoaWxkcmVuW2hpZ2hdLnVzZXJEYXRhLmlzU2hvdyA9IHRydWVcbiAgICBncm91cC5jaGlsZHJlbltoaWdoXS52aXNpYmxlID0gdHJ1ZVxuICAgIFxuICAgIGdyb3VwLmNoaWxkcmVuW2xvd10uY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdwbGFuZScpIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5IC09IHRoaXMub3BhY2l0eVNwZWVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgLT0gdGhpcy5vcGFjaXR5U3BlZWQyXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBncm91cC5jaGlsZHJlbltoaWdoXS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgKz0gdGhpcy5vcGFjaXR5U3BlZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSArPSB0aGlzLm9wYWNpdHlTcGVlZDJcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIC8vIENvbXBsZXRlXG4gICAgaWYgKHRoaXMuZG93bkhlaWdodCA8PSAwKSB7XG4gICAgICB0aGlzLmRvd25IZWlnaHQgPSB0aGlzLmZsb29ySGVpZ2h0IC8vIHJlc2V0IGhlaWdodFxuICAgICAgdGhpcy5zdGF0ZUEuZG93bkVuZCgpXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlVXAgKCkge1xuICAgIHRoaXMuc3RhdGVBLnVwQmVnaW4oKVxuICB9XG5cbiAgYmVmb3JlRG93biAoKSB7XG4gICAgdGhpcy5zdGF0ZUEuZG93bkJlZ2luKClcbiAgfVxuXG4gIHVwIChoaWdoLCBsb3csIGdyb3VwKSB7XG4gICAgdGhpcy51cEhlaWdodCArPSB0aGlzLnBvc2l0aW9uU3BlZWRcbiAgICBncm91cC5wb3NpdGlvbi55ICs9IHRoaXMucG9zaXRpb25TcGVlZFxuICAgIGdyb3VwLmNoaWxkcmVuW2hpZ2hdLnVzZXJEYXRhLmlzU2hvdyA9IGZhbHNlXG4gICAgZ3JvdXAuY2hpbGRyZW5bbG93XS51c2VyRGF0YS5pc1Nob3cgPSB0cnVlXG4gICAgZ3JvdXAuY2hpbGRyZW5bbG93XS52aXNpYmxlID0gdHJ1ZVxuICAgIFxuICAgIGdyb3VwLmNoaWxkcmVuW2xvd10uY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdwbGFuZScpIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5ICs9IHRoaXMub3BhY2l0eVNwZWVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgKz0gdGhpcy5vcGFjaXR5U3BlZWQyXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBncm91cC5jaGlsZHJlbltoaWdoXS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgLT0gdGhpcy5vcGFjaXR5U3BlZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSAtPSB0aGlzLm9wYWNpdHlTcGVlZDJcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICh0aGlzLnVwSGVpZ2h0ID49IHRoaXMuZmxvb3JIZWlnaHQpIHtcbiAgICAgIHRoaXMudXBIZWlnaHQgPSAwXG4gICAgICB0aGlzLnN0YXRlQS51cEVuZCgpXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBUcmFja0Zsb29yXG4iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5cbi8qKlxuICogY2hhbmdlIHNpbmdsZSBhbmQgbXVsdGkgYnkgc29tZSB0d2VlbiwgYW5kIGJpbmQgc29tZSBzdGF0dXMgYXQgZ3JvdXAncyB1c2VyRGF0YVxuICogXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7IE51bWJlciB9IG1vZGUgICBzY2VuZSBtb2RlXG4gKiBAcGFyYW1EZXNjIG1vZGUgICAgICAgICAgMDogaG9tZSwgMTogYXNzb2NpYXRpb25cbiAqL1xuY2xhc3MgVHdlZW5GbG9vciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLl9nZXRUd2VlblZhbHVlKClcbiAgfVxuXG4gIC8vIG9ubHkgaG9tZVxuICBzaW5nbGVUb011bHRpICgpIHtcbiAgICBXb3JsZC5tYWluR3JvdXAuY2hpbGRyZW4uZm9yRWFjaChncm91cCA9PiB7XG4gICAgICBpZiAoZ3JvdXAudmlzaWJsZSkge1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLmNhbWVyYUN1cnJlbnQsIHsgY3k6IGdyb3VwLnBvc2l0aW9uLnksIGN6OiBncm91cC5wb3NpdGlvbi56IH0pXG4gICAgICAgIGxldCB0YXJnZXQgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFPcmlnaW4sIHsgY3k6IGdyb3VwLnVzZXJEYXRhLnBvc2l0aW9uWSwgY3o6IGdyb3VwLnVzZXJEYXRhLnBvc2l0aW9uWiB9KVxuICAgICAgICBcbiAgICAgICAgZ3JvdXAuY2hpbGRyZW4uZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBtZXNoLnVzZXJEYXRhLmNvbG9yKVxuICAgICAgICAgIH0gZWxzZSBpZihtZXNoLm5hbWUgPT09ICdmbGFnJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5fc3BvcnQocG9zaXRpb24sIHRhcmdldCwgZ3JvdXAsICgpPT57XG4gICAgICAgICAgV29ybGQuY29udHJvbHMudGFyZ2V0LmNvcHkoV29ybGQuc2NlbmUucG9zaXRpb24pXG4gICAgICAgICAgV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLmFjdGl2ZSA9IDBcbiAgICAgICAgICBXb3JsZC5zdGF0dXMgPSAnbXVsdGknXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGlmIChncm91cC51c2VyRGF0YS5pc1Nob3cpe1xuICAgICAgICBncm91cC52aXNpYmxlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBtdWx0aVRvU2luZ2xlIChpbnRlcnNlY3QsIG1vZGUpIHtcbiAgICBcbiAgICBsZXQga2V5LCB2YWx1ZVxuICAgIGxldCBjb2xvciA9IHsgcjogOTgvMjU1LCBnOiAxMDgvMjU1LCBiOiAxNTQvMjU1IH1cbiAgICBcbiAgICAvLyB0d28gd2F5IHRvIHNpbmdsZSA6IGNsaWNrIGJ1dHRvbiwgY2xpY2sgYm9hcmRcbiAgICBpZiAodHlwZW9mIGludGVyc2VjdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGtleSA9ICduYW1lJ1xuICAgICAgdmFsdWUgPSBpbnRlcnNlY3Qub2JqZWN0LnBhcmVudC5uYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9ICdmbG9vcidcbiAgICAgIHZhbHVlID0gaW50ZXJzZWN0XG4gICAgfVxuXG4gICAgLy8g5Y+R6YCBIG0tcyDkv6Hlj7dcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgIGNtZDogJ3RvX3NpbmdsZScsXG4gICAgICBkYXRhOiB2YWx1ZVxuICAgIH0sICcqJylcbiAgICBcbiAgICBXb3JsZC5tYWluR3JvdXAuY2hpbGRyZW4uZm9yRWFjaChncm91cCA9PiB7XG4gICAgICBpZiAoZ3JvdXAudXNlckRhdGFba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZ3JvdXAudmlzaWJsZSA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoYXQgd2hlbiAnc2luZ2xlIHN0YXR1cycsIG1haW5Hcm91cCBuZWVkcyB0byByZWNvcmQgd2hpY2ggZmxvb3IgaXMgdmlzaWJsZS5cbiAgICAgICAgV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLnZpc2libGUgPSB2YWx1ZSAtIDFcbiAgICAgICAgLy8gY29ycmVjdCBjb250cm9sczogZHJhZyB0aGUgc2NlbmUgd2lsbCBtYWtlIGNhbWVyYSdzIHBlcnNwZWN0aXZlIHVuc3RhYmxlXG4gICAgICAgIC8vIHNvIHdlIG11c3QgcmVzZXQgYW5kIHVwZGF0ZSBieSBvdXJzZWx2ZXNcbiAgICAgICAgV29ybGQuY29udHJvbHMucmVzZXQoKVxuICAgICAgICBXb3JsZC5jb250cm9scy51cGRhdGUoKVxuICAgICAgICBXb3JsZC5jb250cm9scy50YXJnZXQuY29weShXb3JsZC5zY2VuZS5wb3NpdGlvbilcbiAgICAgICAgV29ybGQuc3RhdHVzID0gJ3NpbmdsZSdcblxuICAgICAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKG1lc2ggPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBjb2xvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMC4zKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAxKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIC8vIGp1ZGdlIG1vZGU6IGlmIGFzc29jaWF0aW9uLCBubyBhbmltYXRpb247IGlmIGhvbWUsIHR3ZWVuIGFuaW1hdGlvblxuICAgICAgICAvLyBhc3NvY2lhdGlvbiwgdGhlcmUgaXMgbm8gYW5nbGUsIHUgY2FuIHNlZSB0aGUgc2NlbmUgYXMgYSBwbGFuZSwgc28geSBpcyA4MDBcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDExMDAsIDApXG4gICAgICAgICAgZ3JvdXAucG9zaXRpb24ueSA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFDdXJyZW50LCB7IGN5OiBncm91cC5wb3NpdGlvbi55LCBjejogZ3JvdXAucG9zaXRpb24ueiB9KVxuICAgICAgICAgIGxldCB0YXJnZXQgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFTcG9ydCwgeyBjeTogMjAwLCBjejogZ3JvdXAucG9zaXRpb24ueiArIDUwIH0pXG4gICAgICAgICAgdGhpcy5fc3BvcnQocG9zaXRpb24sIHRhcmdldCwgZ3JvdXApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2luZ2xlVG9TaW5nbGUgKGZsb29yLCBtb2RlID0gMCkge1xuICAgIFxuICAgIGxldCBjb2xvciA9IHsgcjogOTgvMjU1LCBnOiAxMDgvMjU1LCBiOiAxNTQvMjU1IH1cblxuICAgIFdvcmxkLmNvbnRyb2xzLnRhcmdldC5jb3B5KFdvcmxkLnNjZW5lLnBvc2l0aW9uKVxuICAgIFdvcmxkLnN0YXR1cyA9ICdzaW5nbGUnXG5cbiAgICBXb3JsZC5tYWluR3JvdXAuY2hpbGRyZW4uZm9yRWFjaCgoZ3JvdXAsIHZhbCkgPT4ge1xuICAgICAgXG4gICAgICBncm91cC5wb3NpdGlvbi56ID0gZ3JvdXAudXNlckRhdGEucG9zaXRpb25aXG5cbiAgICAgIGlmIChncm91cC52aXNpYmxlKSB7XG4gICAgICAgIGdyb3VwLnZpc2libGUgPSBmYWxzZVxuICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gZ3JvdXAudXNlckRhdGEucG9zaXRpb25ZXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2gobWVzaCA9PiB7XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldENvbG9yKG1lc2gsIG1lc2gudXNlckRhdGEuY29sb3IpXG4gICAgICAgICAgfSBlbHNlIGlmKG1lc2gubmFtZSA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwLnVzZXJEYXRhLmZsb29yID09PSBmbG9vcikge1xuICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSAwXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gMjAwXG4gICAgICAgICAgZ3JvdXAucG9zaXRpb24ueiA9IGdyb3VwLnBvc2l0aW9uLnogKyA1MFxuICAgICAgICB9XG4gICAgICAgIFdvcmxkLm1haW5Hcm91cC51c2VyRGF0YS52aXNpYmxlID0gdmFsXG4gICAgICAgIGdyb3VwLnZpc2libGUgPSB0cnVlXG5cbiAgICAgICAgLy8g5Y+R6YCBIG0tcyDkv6Hlj7dcbiAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgY21kOiAndG9fc2luZ2xlJyxcbiAgICAgICAgICBkYXRhOiB2YWwgKyAxXG4gICAgICAgIH0sICcqJylcblxuICAgICAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKG1lc2ggPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBjb2xvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMC4zKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAxKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gIH1cbiAgXG4gIC8vIHNldCBvcmlnaW4gcG9zaXRpb24gdmFsdWVcbiAgX2dldFR3ZWVuVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYW1lcmFDdXJyZW50OiB7XG4gICAgICAgIHg6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi54LFxuICAgICAgICB5OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueSxcbiAgICAgICAgejogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnpcbiAgICAgIH0sXG4gICAgICBjYW1lcmFPcmlnaW46IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnVzZXJEYXRhLnBvc2l0aW9uLngsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS51c2VyRGF0YS5wb3NpdGlvbi55LFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEudXNlckRhdGEucG9zaXRpb24uelxuICAgICAgfSxcbiAgICAgIGNhbWVyYVNwb3J0OiB7XG4gICAgICAgIHg6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi54IC0gNzAwLFxuICAgICAgICB5OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueSArIDgwMCxcbiAgICAgICAgejogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnogLSAxMDAwXG4gICAgICB9LFxuICAgICAgY2FtZXJhU3BvcnRYOiB7XG4gICAgICAgIHg6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi54IC0gNzAwLFxuICAgICAgICB5OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueSArIDgwMCxcbiAgICAgICAgejogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnogLSAxMTAwXG4gICAgICB9LFxuICAgICAgc2V0Q29sb3I6IChtZXNoLCBjb2xvcikgPT4ge1xuICAgICAgICBtZXNoLm1hdGVyaWFsLmNvbG9yLnIgPSBjb2xvci5yXG4gICAgICAgIG1lc2gubWF0ZXJpYWwuY29sb3IuZyA9IGNvbG9yLmdcbiAgICAgICAgbWVzaC5tYXRlcmlhbC5jb2xvci5iID0gY29sb3IuYlxuICAgICAgfSxcbiAgICAgIHNldE9wYWNpdHk6IChtZXNoLCBvcGFjaXR5KSA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IG9wYWNpdHlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfc3BvcnQgKHBvc2l0aW9uLCB0YXJnZXQsIGdyb3VwLCBjb21wbGV0ZSA9ICgpPT57fSkge1xuICAgIGxldCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihwb3NpdGlvbikudG8odGFyZ2V0LCAyMDAwKVxuICAgIHR3ZWVuLm9uVXBkYXRlKCgpID0+IHtcbiAgICAgIFdvcmxkLmNhbWVyYS5wb3NpdGlvbi54ID0gcG9zaXRpb24ueDtcbiAgICAgIFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55ID0gcG9zaXRpb24ueTtcbiAgICAgIFdvcmxkLmNhbWVyYS5wb3NpdGlvbi56ID0gcG9zaXRpb24uejtcbiAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSBwb3NpdGlvbi5jeTtcbiAgICAgIGdyb3VwLnBvc2l0aW9uLnogPSBwb3NpdGlvbi5jejtcbiAgICAgIFdvcmxkLmNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuICAgIH0pXG4gICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgY29tcGxldGUoKVxuICAgIH0pXG4gICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmUpXG4gICAgLnN0YXJ0KClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUd2VlbkZsb29yIiwiY2xhc3MgTWFwRG9tIHtcbiAgY29uc3RydWN0b3IobW9kZSwgZGF0YSkge1xuICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgdGhpcy5jcmVhdGVQYWdlKClcbiAgfVxuXG4gIGNyZWF0ZVBhZ2UoKSB7XG4gICAgdGhpcy5hcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJylcbiAgICB0aGlzLmFwcC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUJ1dHRvblVsRG9tKHRoaXMubW9kZSwgdGhpcy5kYXRhKSlcbiAgICB0aGlzLmFwcC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUdhdGVEb20odGhpcy5tb2RlKSlcbiAgICB0aGlzLmFwcC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUxldml0YXRlbkRvbSh0aGlzLm1vZGUpKVxuICB9XG5cbiAgY3JlYXRlQnV0dG9uVWxEb20obW9kZSwgbGlzdCkge1xuICAgIGxldCBidXR0b25VbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYnV0dG9uVWwuc2V0QXR0cmlidXRlKCdpZCcsICdidXR0b24tdWwnKVxuICAgIGxldCBmbG9vciA9IGBcbiAgICA8JSBpZiAobW9kZSA9PT0gMCkgeyAlPlxuICAgIDxhIGhyZWY9J2phdmFzY3JpcHQ6OycgaWQ9J2FsbCc+5oC7PC9hPlxuICAgIDwlIH0gJT5cbiAgICA8c3BhbiBpZD1cImZsb29yXCI+XG4gICAgPCUgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHsgJT5cbiAgICAgIDxhPjwlPSBsaXN0W2ldLm5hbWUgJT48L2E+XG4gICAgPCUgfSAlPlxuICAgIDwvc3Bhbj5cbiAgICA8JSBpZiAobW9kZSA9PT0gMCAmJiBsaXN0Lmxlbmd0aCA+IDQpIHsgJT5cbiAgICA8YSBocmVmPSdqYXZhc2NyaXB0OjsnIGlkPSd1cGZsb29yJz7kuIrljYc8L2E+XG4gICAgPGEgaHJlZj0namF2YXNjcmlwdDo7JyBpZD0nZG93bmZsb29yJz7kuIvpmY08L2E+XG4gICAgPCUgfSAlPlxuICAgIGBcbiAgICBsZXQgcGFyc2UgPSBldmFsKHRoaXMuY29tcGlsZShmbG9vcikpXG4gICAgYnV0dG9uVWwuaW5uZXJIVE1MID0gcGFyc2UoKVxuICAgIHJldHVybiBidXR0b25VbFxuICB9XG5cbiAgY3JlYXRlR2F0ZURvbSAobW9kZSkge1xuICAgIGxldCBnYXRlR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGdhdGVHcm91cC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2dhdGUtZ3JvdXAnKVxuXG4gICAgbGV0IGl0ZW0gPSBgXG4gICAgPCUgaWYgKG1vZGUgPT09IDEpIHsgJT5cbiAgICA8ZGl2IGNsYXNzPVwiZ2F0ZS1pdGVtIGdhdGUtcmVkXCI+XG4gICAgICA8aW1nIHNyYz1cIi4vc3RhdGljL2NhbWVyYS1pbnNpZGUucG5nXCIgYWx0PVwiXCI+XG4gICAgICA8c3Bhbj7lhoXpg6jlh7rlhaXlj6M8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdhdGUtaXRlbSBnYXRlLW9yYW5nZVwiPlxuICAgICAgPGltZyBzcmM9XCIuL3N0YXRpYy9jYW1lcmEtb3V0c2lkZS5wbmdcIiBhbHQ9XCJcIj5cbiAgICAgIDxzcGFuPuWGhemDqOWHuuWFpeWPozwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2F0ZS1pdGVtIGdhdGUtZ3JlZW5cIj5cbiAgICAgIDxpbWcgc3JjPVwiLi9zdGF0aWMvY2FtZXJhLXBvc3QucG5nXCIgYWx0PVwiXCI+XG4gICAgICA8c3Bhbj7pgJrpgZM8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPCUgfSAlPlxuICAgIGBcbiAgICBsZXQgcGFyc2UgPSBldmFsKHRoaXMuY29tcGlsZShpdGVtKSlcbiAgICBnYXRlR3JvdXAuaW5uZXJIVE1MID0gcGFyc2UoKVxuICAgIHJldHVybiBnYXRlR3JvdXBcbiAgfVxuXG4gIGNyZWF0ZUxldml0YXRlbkRvbSAoKSB7XG4gICAgbGV0IGxldml0YXRlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbGV2aXRhdGVuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGV2aWNlX19wb3BwZXItLXdyYXAnKVxuICAgIGxldml0YXRlbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xldml0YXRlbicpXG5cbiAgICBsZXQgY29udGV4dCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICAgIDxpbWcgc3JjPVwiLi9zdGF0aWMvZWRpdF9pY29uMngucG5nXCIgZGF0YS10eXBlPVwiZWRpdFBvcnRhbFwiIGFsdD1cIlwiPlxuICAgICAgICA8aW1nIHNyYz1cIi4vc3RhdGljL2RlbGV0ZV9pY29uLnBuZ1wiIGRhdGEtdHlwZT1cImRlbGV0ZVBvcnRhbFwiIGFsdD1cIlwiPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicHVsbC1sZWZ0XCI+XG4gICAgICAgIDxwIGlkPVwiZGV2aWNlLS10aXRsZVwiIGNsYXNzPVwiZWxsaXBzaXNcIj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGV2aWNlLWxpc3Qtd3JhcFwiPlxuICAgICAgPHVsIGNsYXNzPVwiZGV2aWNlLWxpc3RcIiBpZD1cImRldmljZS0tbGlzdFwiPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWRkLWJ1dHRvblwiPlxuICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCAoMCk7XCIgZGF0YS10eXBlPVwiYWRkXCI+5re75Yqg6K6+5aSHPC9hPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJob3Jpem9udGFsLWxpbmVcIj48L2Rpdj5cbiAgICBgXG4gICAgbGV2aXRhdGVuLmlubmVySFRNTCA9IGNvbnRleHRcbiAgICByZXR1cm4gbGV2aXRhdGVuXG4gIH1cblxuICBjb21waWxlICh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGV2YWxFeHByID0gLzwlPSguKz8pJT4vZ1xuICAgIGNvbnN0IGV4cHIgPSAvPCUoW1xcc1xcU10rPyklPi9nXG5cbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoZXZhbEV4cHIsICdgKTsgXFxuICBlY2hvKCAkMSApOyBcXG4gIGVjaG8oYCcpLnJlcGxhY2UoZXhwciwgJ2ApOyBcXG4gJDEgXFxuICBlY2hvKGAnKVxuXG4gICAgdGVtcGxhdGUgPSAnZWNobyhgJyArIHRlbXBsYXRlICsgJ2ApOydcblxuICAgIGxldCBzY3JpcHQgPSBgKGZ1bmN0aW9uIHBhcnNlKGRhdGEpe1xuICAgICAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIFxuICAgICAgZnVuY3Rpb24gZWNobyhodG1sKXtcbiAgICAgICAgb3V0cHV0ICs9IGh0bWw7XG4gICAgICB9XG4gIFxuICAgICAgJHt0ZW1wbGF0ZX1cbiAgXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH0pYFxuXG4gICAgcmV0dXJuIHNjcmlwdFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcERvbTtcbiIsImNsYXNzIE1hcFN0eWxlIHtcbiAgY29uc3RydWN0b3IobW9kZSkge1xuICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICB0aGlzLnNldEJ1dHRvblVsKClcbiAgfVxuICBcbiAgc2V0QnV0dG9uVWwoKXtcbiAgICBsZXQgYnV0dG9uVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLXVsJylcbiAgICBsZXQgc3BhbiA9IGJ1dHRvblVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF1cbiAgICBsZXQgYSA9IGJ1dHRvblVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylcbiAgICBpZiAodGhpcy5tb2RlKSB7XG4gICAgICAvLyDnpL7nvqRcbiAgICAgIGJ1dHRvblVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgYnV0dG9uVWwuc3R5bGUubGVmdCA9ICc0MHB4J1xuICAgICAgYnV0dG9uVWwuc3R5bGUudG9wID0gJzI3JSdcbiAgICAgIGJ1dHRvblVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXNzb2NpYXRlJylcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6aaW6aG1XG4gICAgICBidXR0b25VbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgIGJ1dHRvblVsLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgICBidXR0b25VbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMzBweCdcbiAgICAgIGJ1dHRvblVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICBidXR0b25VbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hvbWUnKVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTWFwU3R5bGUiLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5cbmNsYXNzIEJsb29tIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZW5kZXJTY2VuZSA9IG5ldyBUSFJFRS5SZW5kZXJQYXNzKFdvcmxkLnNjZW5lLCBXb3JsZC5jYW1lcmEpXG4gIH1cblxuICBnZXQgbWl4ZXIoKSB7IHJldHVybiB0aGlzLm1peGVyIH1cbiAgc2V0IG1peGVyKHZhbCkgeyB0aGlzLm1peGVyID0gdmFsIH1cblxuICB2ZXJ0ZXhTaGFkZXIoKSB7XG4gICAgcmV0dXJuIGBcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIHZVdiA9IHV2O1xuICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xuICAgIH1gXG4gIH1cblxuICBmcmFnbWVudFNoYWRlcigpIHtcbiAgICByZXR1cm4gYFxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIGJhc2VUZXh0dXJlO1xuICAgIHVuaWZvcm0gc2FtcGxlcjJEIGJsb29tVGV4dHVyZTtcbiAgICB1bmlmb3JtIGZsb2F0IGlUaW1lO1xuICAgIHZhcnlpbmcgdmVjMiB2VXY7XG4gICAgdmVjNCBnZXRUZXh0dXJlKCBzYW1wbGVyMkQgdGV4dHVyZSApIHtcbiAgICAgIHJldHVybiBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHRleHR1cmUgLCB2VXYgKSApO1xuICAgIH1cbiAgICB2ZWMzIHYzKCBmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB6ICl7XG4gICAgICByZXR1cm4gdmVjMyggeCwgeSwgeiApO1xuICAgIH1cbiAgICB2ZWMzIGgycmdiKCBmbG9hdCBodWUgKXtcbiAgICAgIGZsb2F0IGggPSBhYnMoaHVlIC0gZmxvb3IoaHVlKSkgKiA2LjtcbiAgICAgIHZlYzMgYyA9IHZlYzMoIDAuLCAwLiwgMC4gKTtcbiAgICAgICBcbiAgICAgIGludCBmID0gaW50KGZsb29yKCBoICkpO1xuICAgICAgICBcbiAgICAgIGlmKGYgPT0gMCljID0gdjMoMS4sIGgsIDAuKTtcbiAgICAgIGVsc2UgaWYoZiA9PSAxKWMgPSB2MygyLi1oLCAxLiwgMC4pO1xuICAgICAgZWxzZSBpZihmID09IDIpYyA9IHYzKDAuLCAxLiwgaC0yLik7XG4gICAgICBlbHNlIGlmKGYgPT0gMyljID0gdjMoMC4sIDQuLWgsIDEuKTtcbiAgICAgIGVsc2UgaWYoZiA9PSA0KWMgPSB2MyhoLTQuLCAwLiwgMS4pO1xuICAgICAgZWxzZSBjID0gdjMoMS4sIDAuLCA2LiAtIGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgdmVjMyBvcmlnaW5Db2xvciA9IGgycmdiKCBpVGltZSAvIDEwLiApO1xuICAgICAgZ2xfRnJhZ0NvbG9yID0gKCBnZXRUZXh0dXJlKCBiYXNlVGV4dHVyZSApICsgdmVjNCggMS4wICkgKiBnZXRUZXh0dXJlKCBibG9vbVRleHR1cmUgKSApO1xuICAgIH1gXG4gIH1cblxuICBzaGluaW5nIChwb3MpIHtcbiAgICBsZXQgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoIDQsIDY0LCA2NCApXG4gICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAnI0VGRUUwMCcsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSApXG4gICAgbGV0IHNwaGVyZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBzcGhlcmUucG9zaXRpb24uc2V0KHBvcy54LCBwb3MueSArIDEwLCBwb3MueilcbiAgICBXb3JsZC5zY2VuZS5hZGQoIHNwaGVyZSApXG4gICAgc3BoZXJlLm5hbWUgPSAnc2hpbmUnXG4gICAgc3BoZXJlLmxheWVycy5lbmFibGUoMSlcblxuICAgIHZhciBzY2FsZUtGID0gbmV3IFRIUkVFLlZlY3RvcktleWZyYW1lVHJhY2soICcuc2NhbGUnLCBbIDAsIDAuNSwgMSwgMS41LCAyXSwgWyAwLjcsIDAuNywgMC43LCAxLjIsIDEuMiwgMS4yLCAwLjgsIDAuOCwgMC44LCAxLjIsIDEuMiwgMS4yLCAwLCAwLCAwXSApO1xuICAgIHZhciBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoICdBY3Rpb24nLCAzLCBbIHNjYWxlS0YgXSApXG4gICAgQmxvb20ubWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHNwaGVyZSApO1xuICAgIHZhciBjbGlwQWN0aW9uID0gQmxvb20ubWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgIC8vIGNsaXBBY3Rpb24uc2V0TG9vcCggVEhSRUUuTG9vcE9uY2UgKVxuICAgIC8vIGNsaXBBY3Rpb24ucGxheSgpO1xuXG4gICAgLy8gQmxvb20ubWl4ZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2ZpbmlzaGVkJywgKCBlICkgPT4geyBcbiAgICAvLyAgIHNwaGVyZS52aXNpYmxlID0gZmFsc2VcbiAgICAvLyB9KTtcblxuICAgIHJldHVybiBzcGhlcmU7XG4gIH1cblxuICByZW1vdmVFbnRpdHkob2JqZWN0KSB7XG4gICAgdmFyIHNlbGVjdGVkT2JqZWN0ID0gV29ybGQuc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKG9iamVjdC5uYW1lKTtcbiAgICBXb3JsZC5zY2VuZS5yZW1vdmUoIHNlbGVjdGVkT2JqZWN0ICk7XG4gICAgLy8gYW5pbWF0ZSgpO1xufVxuXG4gIHNldEJsb29tUGFzcyAoKSB7XG4gICAgbGV0IGJsb29tUGFzcyA9IG5ldyBUSFJFRS5VbnJlYWxCbG9vbVBhc3MobmV3IFRIUkVFLlZlY3RvcjIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCksIDAuNSwgMC4xLCAwLjA1KVxuXG4gICAgYmxvb21QYXNzLnRocmVzaG9sZCA9IDA7XG4gICAgYmxvb21QYXNzLnN0cmVuZ3RoID0gMTA7XG4gICAgYmxvb21QYXNzLnJhZGl1cyA9IDE7XG5cbiAgICB0aGlzLmJsb29tQ29tcG9zZXIgPSBuZXcgVEhSRUUuRWZmZWN0Q29tcG9zZXIoV29ybGQucmVuZGVyZXIpO1xuICAgIHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXJUYXJnZXQxLnRleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIucmVuZGVyVGFyZ2V0Mi50ZXh0dXJlLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlclRvU2NyZWVuID0gZmFsc2U7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnNldFNpemUod2luZG93LmlubmVyV2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgd2luZG93LmlubmVySGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW8pXG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLmFkZFBhc3MoIHRoaXMucmVuZGVyU2NlbmUgKTtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIuYWRkUGFzcyggYmxvb21QYXNzICk7XG5cbiAgICByZXR1cm4gdGhpcy5ibG9vbUNvbXBvc2VyXG4gIH1cblxuICBzZXRGaW5hbFBhc3MgKCkge1xuICAgIGxldCBmaW5hbFBhc3MgPSBuZXcgVEhSRUUuU2hhZGVyUGFzcyhcbiAgICAgIG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XG4gICAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgICAgLy8gaVRpbWU6IFdvcmxkLnRpbWUsXG4gICAgICAgICAgYmFzZVRleHR1cmU6IHt2YWx1ZTogbnVsbH0sXG4gICAgICAgICAgYmxvb21UZXh0dXJlOiB7dmFsdWU6IHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXJUYXJnZXQyLnRleHR1cmV9XG4gICAgICAgIH0sXG4gICAgICAgIHZlcnRleFNoYWRlcjogdGhpcy52ZXJ0ZXhTaGFkZXIoKSxcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI6IHRoaXMuZnJhZ21lbnRTaGFkZXIoKSxcbiAgICAgICAgZGVmaW5lczoge31cbiAgICAgIH0pLCAnYmFzZVRleHR1cmUnXG4gICAgKTtcblxuICAgIGxldCBmaW5hbENvbXBvc2VyID0gbmV3IFRIUkVFLkVmZmVjdENvbXBvc2VyKCBXb3JsZC5yZW5kZXJlcik7XG4gICAgZmluYWxDb21wb3Nlci5yZW5kZXJUYXJnZXQxLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgZmluYWxDb21wb3Nlci5yZW5kZXJUYXJnZXQyLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgZmluYWxDb21wb3Nlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCB3aW5kb3cuaW5uZXJIZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuICAgIGZpbmFsQ29tcG9zZXIuYWRkUGFzcyggdGhpcy5yZW5kZXJTY2VuZSApO1xuICAgIGZpbmFsQ29tcG9zZXIuYWRkUGFzcyggZmluYWxQYXNzICk7XG4gICAgZmluYWxDb21wb3Nlci5uZWVkc1N3YXAgPSB0cnVlXG5cbiAgICByZXR1cm4gZmluYWxDb21wb3NlclxuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJsb29tIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuaW1wb3J0IHsgU2NyZWVuVG9Xb3JsZCB9IGZyb20gJy4uL3V0aWwvVHJhbnNmb3JtQWxleCdcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi4vb2JqZWN0L1Nwcml0ZSc7ICAgICAgICAgICAgICAgICAgICAvLyBzcHJpdGVcbmNsYXNzIEdhdGUge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIFxuICAvKipcbiAgICogaGFuZGxlIGRyYWcgYW5kIGNsaWNrIGRvd24gZXZlbnQsIGFuZCBwaWN0dXJlIHdpbGwgdHJhbnNmb3JtIHRvIHNwcml0ZVxuICAgKiBcbiAgICogQHBhcmFtIHsgZG9tRWxlbWVudCB9IGVsICAgICBwYXJlbnQgZWxlbWVudFxuICAgKiBAcGFyYW0geyBldmVudCB9IGUgICAgICAgICAgIHdpbmRvdyBldmVudFxuICAgKi9cbiAgY3JlYXRlR2F0ZSAoZWwsIGUsIHNwcml0ZUxpc3QpIHtcbiAgICBpZiAoZS50YXJnZXQgJiYgKGUudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdJTUcnKSkge1xuICAgICAgLy8gZ2V0IGltZyBzcmNcbiAgICAgIGxldCBzcmMgPSBlLnRhcmdldC5zcmMuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgLy8gZ2F0ZUVsIC0+IGRpdiAtPiBpbWdcbiAgICAgIGxldCBpbWcgPSBlbC5jaGlsZHJlblswXS5jaGlsZHJlblswXVxuICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAvLyBwaWN0dXJlIHdpbGwgcG9zaXRpb24gYXQgdGhlIG1vdXNlIGNlbnRlclxuICAgICAgbGV0IGRpdlggPSBldmVudC5jbGllbnRYIC0gaW1nLm9mZnNldFdpZHRoIC8gMlxuICAgICAgbGV0IGRpdlkgPSBldmVudC5jbGllbnRZIC0gaW1nLm9mZnNldEhlaWdodCAvIDJcbiAgICAgIFxuICAgICAgYm94LnNyYyA9IGAuL3N0YXRpYy8ke3NyY31gXG4gICAgICBib3guc3R5bGUud2lkdGggPSAnMjBweCdcbiAgICAgIGJveC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgIGJveC5zdHlsZS5sZWZ0ID0gZGl2WCArICdweCdcbiAgICAgIGJveC5zdHlsZS50b3AgPSBkaXZZICsgJ3B4J1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChib3gpXG4gICAgICBcbiAgICAgIC8vIHdoZW4gbW91c2UgbW92ZSwgZ2F0ZSBwaWN0dXJlIHBsZWFzZSBmb2xsb3cgbXkgaGFuZFxuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnRcbiAgICAgICAgbGV0IGRpdlggPSBldmVudC5jbGllbnRYIC0gaW1nLm9mZnNldFdpZHRoIC8gMlxuICAgICAgICBsZXQgZGl2WSA9IGV2ZW50LmNsaWVudFkgLSBpbWcub2Zmc2V0SGVpZ2h0IC8gMlxuICAgICAgICBib3guc3R5bGUubGVmdCA9IGRpdlggKyAncHgnXG4gICAgICAgIGJveC5zdHlsZS50b3AgPSBkaXZZICsgJ3B4J1xuICAgICAgfVxuXG4gICAgICAvLyB3aGVuIG1vdXNlIGNsaWNrLCBnYXRlIHBpY3R1cmUgcGxlYXNlIGJyZWFraW5nIHRoZSBkaW1lbnNpb25cbiAgICAgIGJveC5vbm1vdXNlZG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudFxuICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGxcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChib3gpXG4gICAgICAgIGxldCBuZXdTY3JlZW4gPSBTY3JlZW5Ub1dvcmxkKHt4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZfSlcblxuICAgICAgICAvLyBjcmVhdGUgZ2F0ZSBzcHJpdGVcbiAgICAgICAgdGhpcy5jcmVhdGVSZWFsR2F0ZShuZXdTY3JlZW4sIGJveC5zcmMpXG4gICAgICAgIHNwcml0ZUxpc3QucHVzaChtZXNoKVxuICAgICAgICAvLyB0b2RvOiB0ZXh0XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVSZWFsR2F0ZSAoY29vcmQsIHNyYykge1xuICAgIC8vIGNyZWF0ZSBnYXRlIHNwcml0ZVxuICAgIGxldCBzcHJpdGUgPSBuZXcgU3ByaXRlKClcbiAgICBsZXQgc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygxMiwgNywgOClcbiAgICBsZXQgbWVzaCA9IHNwcml0ZS5jcmVhdGVQaWMoc3JjLCBzY2FsZSlcbiAgICBtZXNoLnBvc2l0aW9uLnggPSBjb29yZC54XG4gICAgbWVzaC5wb3NpdGlvbi55ID0gMTBcbiAgICBtZXNoLnBvc2l0aW9uLnogPSAtY29vcmQueVxuICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbltXb3JsZC5tYWluR3JvdXAudXNlckRhdGEudmlzaWJsZV0uYWRkKG1lc2gpXG4gIH1cblxuICBjcmVhdGVMZXZpdGF0ZUJveCAoc2NyZWVuQWxleCkge1xuICAgIHZhciBsZXZpdGF0ZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV2aWNlX19wb3BwZXItLXdyYXAnKVxuICAgIGlmIChzY3JlZW5BbGV4KSB7XG4gICAgICB2YXIgaGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdob3Jpem9udGFsLWxpbmUnKVswXVxuICAgICAgdmFyIGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtYnV0dG9uJylbMF1cbiAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZpc2libGUnLCBmYWxzZSlcbiAgICAgIGhsLnN0eWxlLndpZHRoID0gJzBweCdcbiAgICAgIC8vIGlmICghY29tbXVuaXR5RGF0YS5zZWxmKSB7XG4gICAgICAvLyAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B1bGwtcmlnaHQnKVswXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAvLyAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B1bGwtbGVmdCcpWzBdLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzBweCdcbiAgICAgIC8vICAgbGluZS5pbm5lckhUTUwgPSAnJ1xuICAgICAgLy8gfVxuICAgICAgdmFyIHd5ID0gc2NyZWVuQWxleC55IC0gMTcyXG4gICAgICB2YXIgd3ggPSBzY3JlZW5BbGV4LnggLSAxMDBcbiAgICAgIGlmICh3eCA8IDAgKSB7XG4gICAgICAgIHd4ID0gMFxuICAgICAgfVxuICAgICAgaWYgKHd5IDwgMCkge1xuICAgICAgICBpZiAoKHd4ICsgMTE0PiBzY3JlZW5BbGV4LngpICYmIDE1MCA+IHNjcmVlbkFsZXgueSkge1xuICAgICAgICAgIGhsLnN0eWxlLnRvcCA9IHNjcmVlbkFsZXgueSArICdweCdcbiAgICAgICAgICBobC5zdHlsZS5yaWdodCA9IC0yNCArICdweCdcbiAgICAgICAgICBobC5zdHlsZS53aWR0aCA9IDIyICsgJ3B4J1xuICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdkYXRhLXZpc2libGUnLCB0cnVlKVxuICAgICAgICAgIHd4IC09IDQ0XG4gICAgICAgIH1cbiAgICAgICAgd3kgPSAwXG4gICAgICB9XG4gICAgICBsZXZpdGF0ZW4uc3R5bGUudG9wID0gd3kgKyAncHgnXG4gICAgICBsZXZpdGF0ZW4uc3R5bGUubGVmdCA9IHd4ICsgJ3B4J1xuICAgICAgbGV2aXRhdGVuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldml0YXRlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYXRlIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuLi9vYmplY3QvU3ByaXRlJ1xuLyoqXG4gKiBAZGVzYyDlnLDlm77nsbtcbiAqIEBwYXJhbXMgc2hhcGUg5b2i54q2XG4gKiBAcGFyYW1zIG9wdGlvbnMg5p2Q6LSo5a+56LGhXG4gKi9cbmNsYXNzIE1hcCB7XG4gIGNvbnN0cnVjdG9yKG1vZGUpIHtcbiAgICB0aGlzLm1vZGUgPSBtb2RlXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgVEhSRUUuU1ZHTG9hZGVyKClcbiAgfVxuXG4gIC8vIOWIm+W7uuWHoOS9leS9k1xuICBjcmVhdGVHZW9tZXRyeSgpIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkdlb21ldHJ5KClcbiAgfVxuXG4gIC8vIOWIm+W7uuaLieS8uOWHoOS9leS9k1xuICBjcmVhdGVFeHRydWRlR2VvbWV0cnkoc2hhcGUpIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLkV4dHJ1ZGVCdWZmZXJHZW9tZXRyeShzaGFwZSwge1xuICAgICAgZGVwdGg6IDUsXG4gICAgICBiZXZlbEVuYWJsZWQ6IHRydWUsXG4gICAgICBiZXZlbFRoaWNrbmVzczogMS41LFxuXHQgICAgYmV2ZWxTaXplOiAxLFxuXHQgICAgYmV2ZWxTZWdtZW50czogNVxuICAgIH0pXG4gIH1cblxuICAvLyDliJvlu7rmnZDotKhcbiAgY3JlYXRlTWF0ZXJpYWwob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwob3B0aW9ucylcbiAgfVxuXG4gIC8vIOWIm+W7uue9keagvFxuICBjcmVhdGVNZXNoKHNoYXBlLCBvcHRpb25zLCBuYW1lKSB7XG4gICAgbGV0IGdlbyA9IHRoaXMuY3JlYXRlR2VvbWV0cnkoKVxuICAgIGxldCBleHRydWRlR2VvID0gdGhpcy5jcmVhdGVFeHRydWRlR2VvbWV0cnkoc2hhcGUpXG4gICAgZ2VvLmZyb21CdWZmZXJHZW9tZXRyeShleHRydWRlR2VvKVxuICAgIGdlby50cmFuc2xhdGUoLTI5MCwgLTIxNCwgMClcbiAgICBsZXQgbWF0ID0gdGhpcy5jcmVhdGVNYXRlcmlhbChvcHRpb25zLCBuYW1lKVxuICAgIGxldCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gICAgbWVzaC5uYW1lID0gbmFtZVxuICAgIHJldHVybiBtZXNoXG4gIH1cblxuICBpbml0VGVtcGxhdGUodXJsLCBjYWxsYmFjaywgYXN5bmNDYiA9ICgpID0+IHt9KSB7XG4gICAgdGhpcy5sb2FkZXIubG9hZCh1cmwsIGRhdGEgPT4ge1xuICAgICAgbGV0IHBhdGhzID0gZGF0YS5wYXRoc1xuICAgICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgbGV0IHNoYXBlcyA9IHBhdGgudG9TaGFwZXModHJ1ZSlcbiAgICAgICAgc2hhcGVzLmZvckVhY2goc2hhcGUgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKHBhdGgsIHNoYXBlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIGFzeW5jQ2IobnVsbClcbiAgICB9KVxuICB9XG5cbiAgbG9hZE1hcChpdGVtLCBncm91cCwgY2FsbGJhY2spIHtcbiAgICBcbiAgICBjb25zdCBvcmlnaW5Qb3NpdGlvbiA9IChpdGVtLmZsb29yIC0gMikgKiAxMjAgLSA2MFxuXG4gICAgdGhpcy5pbml0VGVtcGxhdGUoaXRlbS51cmwsIChwYXRoLCBzaGFwZSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6IHBhdGguY29sb3IsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiBncm91cC5wb3NpdGlvbi55ID4gMTgwIHx8IGdyb3VwLnBvc2l0aW9uLnkgPCAtMTgwID8gMCA6IDEsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGVcbiAgICAgIH1cblxuICAgICAgbGV0IG1lc2ggPSB0aGlzLmNyZWF0ZU1lc2goc2hhcGUsIG9wdGlvbnMsICdzdG9yZScpXG4gICAgICBtZXNoLnJvdGF0aW9uLnNldCgwLjUgKiBNYXRoLlBJLCAwLCAwKVxuICAgICAgbWVzaC51c2VyRGF0YS5vcmlnaW5Qb3NpdGlvbiA9IG9yaWdpblBvc2l0aW9uXG4gICAgICBtZXNoLnVzZXJEYXRhLmNvbG9yID0ge1xuICAgICAgICByOiBtZXNoLm1hdGVyaWFsLmNvbG9yLnIsXG4gICAgICAgIGc6IG1lc2gubWF0ZXJpYWwuY29sb3IuZyxcbiAgICAgICAgYjogbWVzaC5tYXRlcmlhbC5jb2xvci5iXG4gICAgICB9XG5cbiAgICAgIGdyb3VwLmFkZChtZXNoKVxuXG4gICAgfSwgY2FsbGJhY2spXG4gICAgZ3JvdXAucG9zaXRpb24ueSA9IG9yaWdpblBvc2l0aW9uXG4gIH1cblxuICAvLyBib2FyZFxuICBsb2FkUGxhbmUoaXRlbSwgZ3JvdXAsIHBsYW5lTGlzdCkge1xuICAgIGNvbnN0IG9yaWdpblBvc2l0aW9uID0gKGl0ZW0uZmxvb3IgLSAyKSAqIDEyMCAtIDY1XG4gICAgZ3JvdXAudXNlckRhdGEucG9zaXRpb25ZID0gb3JpZ2luUG9zaXRpb25cbiAgICBncm91cC51c2VyRGF0YS5wb3NpdGlvblogPSBncm91cC5wb3NpdGlvbi56XG4gICAgdGhpcy5pbml0VGVtcGxhdGUoJy4vc3RhdGljLzE0LnN2ZycsIChwYXRoLCBzaGFwZSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6IHRoaXMubW9kZSA/ICcjQUFBQ0IyJyA6ICcjMWE0MjVlJyxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIC8vIG9wYWNpdHk6IDAuM1xuICAgICAgICBvcGFjaXR5OiBncm91cC5wb3NpdGlvbi55ID4gMTgwIHx8IGdyb3VwLnBvc2l0aW9uLnkgPCAtMTgwID8gMCA6IDAuM1xuICAgICAgfVxuICAgICAgXG4gICAgICBsZXQgbWVzaCA9IHRoaXMuY3JlYXRlTWVzaChzaGFwZSwgb3B0aW9ucywgJ3BsYW5lJylcbiAgICAgIG1lc2gucm90YXRpb24uc2V0KDAuNSAqIE1hdGguUEksIDAsIDApXG4gICAgICBtZXNoLnBvc2l0aW9uLnkgPSAtNVxuICAgICAgbWVzaC51c2VyRGF0YSA9IHtcbiAgICAgICAgb3JpZ2luUG9zaXRpb246IG9yaWdpblBvc2l0aW9uLFxuICAgICAgICBncm91cEluZm86IGl0ZW1cbiAgICAgIH1cbiAgICAgIHBsYW5lTGlzdC5wdXNoKG1lc2gpXG4gICAgICBncm91cC5hZGQobWVzaClcbiAgICAgIG9wdGlvbnMub3BhY2l0eSA/IGdyb3VwLnVzZXJEYXRhLmlzU2hvdyA9IHRydWUgOiBncm91cC51c2VyRGF0YS5pc1Nob3cgPSBmYWxzZVxuICAgIH0pXG4gIH1cbiAgXG5cbiAgLy8gZ2F0ZSBzcHJpdGVcbiAgY3JlYXRlR2F0ZUxvZ28obG9nbywgZ3JvdXApIHtcbiAgICBjb25zdCBzcHJpdGUgPSBuZXcgU3ByaXRlKClcbiAgICBjb25zdCBvcHRpb24gPSB7XG4gICAgICBvcGFjaXR5OiAwXG4gICAgfVxuICAgIGNvbnN0IHNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoMjAsIDEyLCAxNSlcbiAgICBsZXQgbWVzaCA9IHNwcml0ZS5jcmVhdGVQaWMobG9nbywgc2NhbGUsIG9wdGlvbilcbiAgICBncm91cC5hZGQobWVzaClcbiAgfVxuXG4gIC8vIHRleHQgc3ByaXRlXG4gIGNyZWF0ZUZsb29yTmFtZShuYW1lLCBncm91cCkge1xuICAgIGNvbnN0IGZvbnRTaXplID0gMzBcbiAgICBsZXQgc3ByaXRlID0gbmV3IFNwcml0ZSgpXG4gICAgbGV0IG9wdGlvbiA9IHtcbiAgICAgIG9wYWNpdHk6IGdyb3VwLnBvc2l0aW9uLnkgPiAxODAgfHwgZ3JvdXAucG9zaXRpb24ueSA8IC0xODAgPyAwIDogMVxuICAgIH1cbiAgICBsZXQgbWVzaCA9IHNwcml0ZS5jcmVhdGVUZXh0KG5hbWUsIGZvbnRTaXplLCBvcHRpb24pXG4gICAgZ3JvdXAuYWRkKG1lc2gpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwOyIsImltcG9ydCBXb3JsZCBmcm9tICcuLi9zY2VuZS9tYXBXb3JsZCdcblxuY2xhc3MgUmF5Y2FzdGVye1xuXG4gIGNvbnN0cnVjdG9yIChldmVudCkge1xuICAgIHRoaXMuZXZlbnQgPSBldmVudFxuICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG4gIH1cblxuICBoYW5kbGVFdmVudCAocmF5TGlzdCwgY2FsbGJhY2ssIGVtcHR5Q2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuICAgIGNvbnN0IG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IFdvcmxkLnJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgXG4gICAgbW91c2UueCA9ICh0aGlzLmV2ZW50LmNsaWVudFggLyBjb250YWluZXIuY2xpZW50V2lkdGgpICogMiAtIDFcbiAgICBtb3VzZS55ID0gLSAodGhpcy5ldmVudC5jbGllbnRZIC8gY29udGFpbmVyLmNsaWVudEhlaWdodCkgKiAyICsgMVxuICAgIHRoaXMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEobW91c2UsIFdvcmxkLmNhbWVyYSlcbiAgICBcbiAgICBsZXQgaW50ZXJzZWN0cyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMocmF5TGlzdClcbiAgICBpZiAoaW50ZXJzZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjYWxsYmFjayhpbnRlcnNlY3RzKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbXB0eUNhbGxiYWNrKClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmF5Y2FzdGVyIiwiLyoqXG4gKiBDcmVhdGUgYWxsIGtpbmRzIG9mIFNwcml0ZVxuICogXG4gKiBAY2xhc3MgICAgICAgICAgICAgICAgICAgICBTcHJpdGVcbiAqIEBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgIGluaXQgdmFyaWFibGVcbiAqL1xuY2xhc3MgU3ByaXRlIHtcbiAgXG4gIGNvbnN0cnVjdG9yICgpIHt9XG5cbiAgLyoqXG4gICAgKiBjcmVhdGUgdGV4dCBzcHJpdGVcbiAgICAqIFxuICAgICogQHBhcmFtIHsgU3RyaW5nIH0gdGV4dCAgICAgICAgICAgICB0ZXh0IHdpbGwgYmUgZmlsbGVkXG4gICAgKiBAcGFyYW0geyBOdW1iZXIgfSBmb250U2l6ZSAgICAgICAgIGZvbnQgc2l6ZVxuICAgICogQHBhcmFtIHsgT2JqZWN0IH0gZXh0cmFPcHRpb24gICAgICBzb21lIGV4dHJhIG1hdGVyaWFsIG9wdGlvblxuICAgICogQHJldHVybiB7IE9iamVjdCB9ICAgICAgICAgICAgICAgICBzcHJpdGUgbWVzaFxuICAgICovXG4gIGNyZWF0ZVRleHQgKHRleHQsIGZvbnRTaXplLCBleHRyYU9wdGlvbikge1xuICAgIGNvbnN0IGRlcHRoID0gMTAwMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FtZXJhIGRlcHRoXG4gICAgY29uc3Qgc2NhbGUgPSBkZXB0aCAqICgoMSAvIDUwKSAqIGZvbnRTaXplKSAgICAgICAvLyBjYW52YXMgc2NhbGUgcmF0aW9cbiAgICAvLyBjcmVhdGUgYSBjYW52YXNcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLndpZHRoID0gZm9udFNpemUgKiAzMlxuXG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJ1xuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyBcInB4ICflvq7ova/pm4Xpu5EnXCJcbiAgICBjdHguZmlsbFRleHQodGV4dCwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpXG5cbiAgICAvLyBjcmVhdGUgdGV4dHVyZVxuICAgIGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKVxuICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlICAvLyB0ZXh0dXJlIG1hdHJpeCBjYW4gYmUgbWFudWFsIHVwZGF0ZVxuXG4gICAgLy8gY3JlYXRlIHRleHQgc3ByaXRlIG9iamVjdFxuICAgIGxldCBvcHRpb24gPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hcDogdGV4dHVyZSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLCBcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgfSwgZXh0cmFPcHRpb24pXG4gICAgbGV0IHNwcml0ZSA9IHRoaXMuX2NyZWF0ZVNwcml0ZShvcHRpb24pXG4gICAgXG4gICAgc3ByaXRlLm5hbWUgPSAndGV4dCdcbiAgICBzcHJpdGUuc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpXG4gICAgc3ByaXRlLnBvc2l0aW9uLnNldCgtMjkxLCAxMCwgMClcbiAgICByZXR1cm4gc3ByaXRlXG4gIH1cblxuICAvKipcbiAgICAqIGNyZWF0ZSB0ZXh0IHNwcml0ZVxuICAgICogXG4gICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwaWNVcmwgICAgICAgICAgICAgcGljdHJ1ZSB3aWxsIGJlIGxvYWRcbiAgICAqIEBwYXJhbSB7IE9iamVjdCB9IGV4dHJhT3B0aW9uICAgICAgICBzb21lIGV4dHJhIG1hdGVyaWFsIG9wdGlvblxuICAgICogQHJldHVybiB7IE9iamVjdCB9ICAgICAgICAgICAgICAgICAgIHNwcml0ZSBtZXNoXG4gICAgKi9cbiAgY3JlYXRlUGljIChwaWNVcmwsIHNjYWxlLCBleHRyYU9wdGlvbikge1xuICAgIGlmICghZXh0cmFPcHRpb24pIHtcbiAgICAgIGV4dHJhT3B0aW9uID0ge29wYWNpdHk6IDF9XG4gICAgfVxuICAgIGxldCBvcHRpb24gPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hcDogbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKHBpY1VybCksXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSwgXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlXG4gICAgfSwgZXh0cmFPcHRpb24pXG4gICAgbGV0IHNwcml0ZSA9IHRoaXMuX2NyZWF0ZVNwcml0ZShvcHRpb24pXG4gICAgXG4gICAgc3ByaXRlLm5hbWUgPSAnZmxhZydcbiAgICBzcHJpdGUuc2NhbGUuc2V0KHNjYWxlLngsIHNjYWxlLnksIHNjYWxlLnopXG4gICAgc3ByaXRlLnBvc2l0aW9uLnNldCgwLCAxMCwgMClcbiAgICBcbiAgICByZXR1cm4gc3ByaXRlXG4gIH1cblxuICAvKipcbiAgICAqIGNyZWF0ZSBnZW5lcmFsIHNwcml0ZVxuICAgICogXG4gICAgKiBAcGFyYW0geyBPYmplY3QgfSBvYmogICAgICAgICAgICAgIG1hdGVyaWFsIE9wdGlvblxuICAgICogQHJldHVybiB7IDNkT2JqZWN0IH0gICAgICAgICAgICAgICBtYXRlcmlhbCBPYmplY3RcbiAgICAqL1xuICBfY3JlYXRlU3ByaXRlIChvYmopIHtcbiAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwob2JqKVxuICAgIGxldCBzcHJpdGUgPSBuZXcgVEhSRUUuU3ByaXRlKG1hdGVyaWFsKVxuICAgIHJldHVybiBzcHJpdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGUiLCIvLyBpbXBvcnQgeyBob3VzZURhdGEgfSBmcm9tICcuLi9kYXRhL0hvdXNlJyAgICAgICAgICAgICAgICAgLy8gbWFwIGRhdGFcbmltcG9ydCBNYXBEb20gZnJvbSAnLi4vaHRtbC9NYXBEb20nXG5pbXBvcnQgTWFwU3R5bGUgZnJvbSAnLi4vaHRtbC9NYXBTdHlsZSdcbi8vIDNEIE9iamVjdFxuaW1wb3J0IE1hcCBmcm9tICcuLi9vYmplY3QvTWFwJyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDNEIG1hcFxuaW1wb3J0IEdhdGUgZnJvbSAnLi4vb2JqZWN0L0dhdGUnICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdhdGVcbmltcG9ydCBSYXljYXN0ZXIgZnJvbSAnLi4vb2JqZWN0L1JheWNhc3RlcicgICAgICAgICAgICAgICAvLyByYXljYXN0ZXJcbmltcG9ydCBCbG9vbSBmcm9tICcuLi9vYmplY3QvQmxvb20nICAgICAgICAgICAgICAgICAgICAgICAvLyBibG9vbSBzaGluaW5nXG4vLyBhbmltYXRlXG5pbXBvcnQgVHJhY2tGbG9vciBmcm9tICcuLi9hbmltYXRpb24vVHJhY2tGbG9vcicgICAgICAgICAgLy8gdXAgJiBkb3duIGFuaW1hdGVcbmltcG9ydCBUd2VlbkZsb29yIGZyb20gJy4uL2FuaW1hdGlvbi9Ud2VlbkZsb29yJyAgICAgICAgICAvLyBjaGFuZ2UgZmxvb3JcbmltcG9ydCBTdGF0ZUEgZnJvbSAnLi4vc3RhdGUvRmxvb3InICAgICAgICAgICAgICAgICAgICAgICAvLyB1cCAmIGRvd24gc3RhdGVcblxuY29uc3QgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFzeW5jaHJvbm91c1xuLyoqXG4gKiBNZW1iZXJcbiAqIHByaXZhdGU6IF9oZWxsb1xuICogcHVibGljOiBoZWxsb1xuICogc3RhdGljOiBnZXQgaGVsbG8oKXt9XG4gKi9cblxuY29uc3QgbW9kZSA9IHBhcnNlSW50KGdldFF1ZXJ5VmFyaWFibGUoJ21vZGUnKSlcbmNvbnN0IGZsb29yTGlzdCA9IFsgXG4gIHsgbmFtZTogMSB9LFxuICB7IG5hbWU6IDIgfSxcbiAgeyBuYW1lOiAzIH0sXG4gIHsgbmFtZTogNCB9XG5dXG5sZXQgaG91c2VEYXRhID0gW107XG4vLyBjb25zdCBob3VzZURhdGEgPSBbe1xuLy8gICBmbG9vcjogMSxcbi8vICAgdXJsOiAnLi9zdGF0aWMvMTAuc3ZnJyxcbi8vICAgbmFtZTogJ0YxMCdcbi8vIH0se1xuLy8gICBmbG9vcjogMixcbi8vICAgdXJsOiAnLi9zdGF0aWMvMTEuc3ZnJyxcbi8vICAgbmFtZTogJ0YxMSdcbi8vIH0se1xuLy8gICBmbG9vcjogMyxcbi8vICAgdXJsOiAnLi9zdGF0aWMvMTIuc3ZnJyxcbi8vICAgbmFtZTogJ0YxMidcbi8vIH0se1xuLy8gICBmbG9vcjogNCxcbi8vICAgdXJsOiAnLi9zdGF0aWMvMTMuc3ZnJyxcbi8vICAgbmFtZTogJ0YxMycsXG4vLyAgIGdhdGVBcnI6IFt7XG4vLyAgICAgbG9nbzogJy9zdGF0aWMvY2FtZXJhLWluc2lkZS5wbmcnXG4vLyAgIH1dXG4vLyB9XVxuXG5mdW5jdGlvbiBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlKSB7XG4gIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgZm9yICh2YXIgaT0wO2k8dmFycy5sZW5ndGg7aSsrKSB7XG4gICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcbiAgICBpZihwYWlyWzBdID09IHZhcmlhYmxlKXtyZXR1cm4gcGFpclsxXTt9XG4gIH1cbiAgcmV0dXJuKGZhbHNlKTtcbn1cblxuLyoqXG4gKiDkuIrluJ3nsbvvvIzlrprkuYnnpL7nvqTlkozpppbpobXkuK3nmoTlhajpg6jmlrnms5VcbiAqIFxuICogQGNsYXNzIFdvcmxkXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBtb2RlICAg5Zy65pmv5qih5byPXG4gKiBAcGFyYW1EZXNjIG1vZGUgICAgICAgICAgMDog6aaW6aG1LCAxOiDnpL7nvqRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICBjb25zdHJ1Y3RvciAobW9kZSkge1xuICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICB0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKClcbiAgICB0aGlzLmdhdGVEYXRhID0gW11cbiAgICB0aGlzLmNvbG9yRGF0YSA9IFtdXG4gIH1cblxuICAvLyDoh6rnhLbnjq/looPlhoXnmoTmiYDmnInmiJDlkZjvvIzlhYHorrjlnKjku7vkvZXnsbvkuK3ooqvkv67mlLlcbiAgZ2V0IHNjZW5lKCkgeyByZXR1cm4gdGhpcy5zY2VuZSB9XG4gIHNldCBzY2VuZSh2YWwpIHsgdGhpcy5zY2VuZSA9IHZhbCB9XG5cbiAgZ2V0IGNhbWVyYSgpIHsgcmV0dXJuIHRoaXMuY2FtZXJhIH1cbiAgc2V0IGNhbWVyYSh2YWwpIHsgdGhpcy5jYW1lcmEgPSB2YWwgfVxuXG4gIGdldCByZW5kZXJlcigpIHsgcmV0dXJuIHRoaXMucmVuZGVyZXIgfVxuICBzZXQgcmVuZGVyZXIodmFsKSB7IHRoaXMucmVuZGVyZXIgPSB2YWwgfVxuXG4gIGdldCBtYWluR3JvdXAoKSB7IHJldHVybiB0aGlzLm1haW5Hcm91cH1cbiAgc2V0IG1haW5Hcm91cCh2YWwpIHsgdGhpcy5tYWluR3JvdXAgPSB2YWwgfVxuXG4gIGdldCBzdGF0dXMoKSB7IHJldHVybiB0aGlzLnN0YXR1cyB9XG4gIHNldCBzdGF0dXModmFsKSB7IHRoaXMuc3RhdHVzID0gdmFsIH1cblxuICBnZXQgY29udHJvbHMoKSB7IHJldHVybiB0aGlzLmNvbnRyb2xzIH1cbiAgc2V0IGNvbnRyb2xzKHZhbCkgeyB0aGlzLmNvbnRyb2xzID0gdmFsIH1cblxuICBnZXQgbGF5ZXJzKCkgeyByZXR1cm4gdGhpcy5sYXllcnMgfVxuICBzZXQgbGF5ZXJzKHZhbCkgeyB0aGlzLmxheWVycyA9IHZhbCB9XG5cbiAgZ2V0IHRpbWUoKSB7IHJldHVybiB0aGlzLnRpbWUgfVxuICBzZXQgdGltZSh2YWwpIHsgdGhpcy50aW1lID0gdmFsIH1cblxuICAvLyBpbml0IHNjZW5lXG4gIGluaXQoKSB7XG5cbiAgICB0aGlzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggICAgICAgICAgICAgICAgICAgICAgICAvLyDnlLvluIPlrr1cbiAgICB0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAgICAgICAgICAgICAgICAgICAgICAvLyDnlLvluIPpq5hcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW52YXPnlLvluIPlrrnlmahcbiAgICB0aGlzLnBsYW5lTGlzdCA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBib2FyZCBsaXN0IGZvciByYXljYXN0ZXJcbiAgICB0aGlzLnNwcml0ZUxpc3QgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHJpdGUgbGlzdCBmb3IgcmF5Y2FzdGVyXG4gICAgdGhpcy5zaGluaW5nTGlzdCA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNoaW5pbmcgbGlzdFxuXG4gICAgLy8gY3JlYXRlIHNjZW5lXG4gICAgV29ybGQuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIC8vIFdvcmxkLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoJyNBQUFBQUEnKVxuXG4gICAgLy8gY3JlYXRlIGNhbWVyYVxuICAgIGNvbnN0IENBTV9QT1MgPSBuZXcgVEhSRUUuVmVjdG9yMyg3MDAsIDQ1MCwgMTIwMClcbiAgICBXb3JsZC5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoMzAsIHRoaXMud2lkdGggLyB0aGlzLmhlaWdodCwgMSwgMTAwMDApXG4gICAgV29ybGQuY2FtZXJhLnBvc2l0aW9uLnNldChDQU1fUE9TLngsIENBTV9QT1MueSwgQ0FNX1BPUy56KVxuICAgIFdvcmxkLmNhbWVyYS51c2VyRGF0YS5wb3NpdGlvbiA9IENBTV9QT1MgICAgICAgICAgICAgIC8vIOWkh+S7veebuOacuuWIneWni+S9jee9ruWAvFxuXG4gICAgLy8gY3JlYXRlIHJlbmRlcmVyXG4gICAgV29ybGQucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZVxuICAgIH0pXG4gICAgV29ybGQucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbylcbiAgICBXb3JsZC5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLy8gV29ybGQucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgLy8gV29ybGQucmVuZGVyZXIudG9uZU1hcHBpbmcgPSBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKFdvcmxkLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICBXb3JsZC5tYWluR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKSAgICAgICAgICAgICAgICAgICAvLyDllYblnLrmgLvliIbnu4RcbiAgICBXb3JsZC5tYWluR3JvdXAucG9zaXRpb24ueSA9IC0zMFxuICAgIFdvcmxkLmxheWVycyA9IG5ldyBUSFJFRS5MYXllcnMoKVxuICAgIFdvcmxkLmxheWVycy5zZXQoMClcbiAgICBXb3JsZC5zdGF0dXMgPSAnbXVsdGknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliJ3lp4vljJblnLrmma/nirbmgIFcblxuICAgIC8vIOaehOW7uueOr+Wig1xuICAgIHRoaXMuY3JlYXRlQ29udHJvbHMoKVxuICAgIHRoaXMuY3JlYXRlTGlnaHQoKVxuICAgIC8vIHRoaXMuY3JlYXRlQWxleCgpXG4gICAgdGhpcy5ldmVudENvbGxlY3Rpb24oKVxuXG4gICAgLy8g5Yid5aeL5YyWVHdlZW5GbG9vcuexuyAtIOWIh+aNoualvOWxguWKqOeUu1xuICAgIHRoaXMudHdlZW5GbG9vciA9IG5ldyBUd2VlbkZsb29yKClcbiAgICAvLyDlh7rlhaXlj6PnsbtcbiAgICB0aGlzLmdhdGUgPSBuZXcgR2F0ZSgpXG4gICAgXG4gICAgLy8g5Yid5aeL5YyWbWFw57G7IC0g5q+P5LiA5bGC5Lit55qE5omA5pyJ5YWD57SgXG4gICAgdGhpcy5tYXAgPSBuZXcgTWFwKHRoaXMubW9kZSlcbiAgICB0aGlzLmJ1aWxkaW5nUmlzZSgpXG5cbiAgICAvLyDpl6rngrnpgJrpgZNcbiAgICB0aGlzLmJsb29tID0gbmV3IEJsb29tKClcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIgPSB0aGlzLmJsb29tLnNldEJsb29tUGFzcygpXG4gICAgdGhpcy5maW5hbENvbXBvc2VyID0gdGhpcy5ibG9vbS5zZXRGaW5hbFBhc3MoKVxuICAgIGlmICghdGhpcy5tb2RlKSB7XG4gICAgICBsZXQgc2hpbmUgPSB0aGlzLmJsb29tLnNoaW5pbmcoe1xuICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogNDAwIC0gMjAwLFxuICAgICAgICB5OiAxODAsXG4gICAgICAgIHo6IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDBcbiAgICAgIH0pXG4gICAgICB0aGlzLnNoaW5pbmdMaXN0LnB1c2goc2hpbmUpXG4gICAgfVxuICAgIC8vIHNldEludGVydmFsKCgpID0+IHtcblxuICAgIC8vIH0sIDIwMDApXG5cbiAgICAvLyBUcmFja0Zsb29y57G7IC0g5LiK5LiL5qW85Yqo55S7XG4gICAgdGhpcy5hbmltYXRlRmxvb3IgPSBuZXcgVHJhY2tGbG9vcigpXG4gICAgdGhpcy5hbmltYXRlRmxvb3IuaW5pdChob3VzZURhdGEpXG5cbiAgICB0aGlzLmFuaW1hdGUoKVxuICB9XG5cbiAgLy8g5Yib5bu65pe26Ze05rWBXG4gIGFuaW1hdGUoKSB7XG4gICAgVFdFRU4udXBkYXRlKClcblxuICAgIHZhciBkZWx0YSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcblxuICAgIGlmIChCbG9vbS5taXhlcikge1xuICAgICAgQmxvb20ubWl4ZXIudXBkYXRlKCBkZWx0YSApO1xuICAgIH1cblxuICAgIGlmIChTdGF0ZUEudXApIHRoaXMudXBGbG9vcigpXG4gICAgaWYgKFN0YXRlQS5kb3duKSB0aGlzLmRvd25GbG9vcigpXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRlKClcbiAgICB9KVxuICAgIFdvcmxkLnJlbmRlcmVyLnJlbmRlcihXb3JsZC5zY2VuZSwgV29ybGQuY2FtZXJhKVxuICAgIC8vIOa4suafk+mXqueCuVxuICAgIFdvcmxkLmNhbWVyYS5sYXllcnMuc2V0KDEpO1xuICAgIHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXIoKTtcbiAgICBXb3JsZC5jYW1lcmEubGF5ZXJzLnNldCgwKTtcbiAgICAvLyDmuLLmn5PmlbTkuKrlnLrmma/vvIzlsIbopobnm5blnKhibG9vbemAmumBk+S4ilxuICAgIHRoaXMuZmluYWxDb21wb3Nlci5yZW5kZXIoKVxuXG4gICAgV29ybGQuY29udHJvbHMudXBkYXRlKClcbiAgfVxuXG4gIC8vIGNyZWF0ZSBtYWxsXG4gIGJ1aWxkaW5nUmlzZSgpIHtcbiAgICAvLyBhc3luY++8mkFmdGVyIGFsbCB0aGUgcGljdHVyZXMgYXJlIGxvYWRlZCwgdGhlIGNvbmZpZ3VyYXRpb24gbW9kZSBtZXRob2QgaXMgZXhlY3V0ZWQuXG4gICAgYXN5bmMuZWFjaChob3VzZURhdGEsIChpdGVtLCBjYikgPT4ge1xuICAgICAgbGV0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGdyb3VwXG4gICAgICBncm91cC5uYW1lID0gaXRlbS5mbG9vclxuICAgICAgZ3JvdXAudXNlckRhdGEuZmxvb3IgPSBpdGVtLmZsb29yICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIG9yaWdpbmFsIGZsb29yIGluIHVzZXJkYXRhXG4gICAgICBncm91cC51c2VyRGF0YS5keW5hbWljRmxvb3IgPSBpdGVtLmZsb29yICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgZHluYW1pYyBmbG9vcu+8mmNoYW5nZSB3aXRoIHVwJmRvd24gYW5pbWF0aW9uXG4gICAgICBncm91cC51c2VyRGF0YS5uYW1lID0gaXRlbS5mbG9vciAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIG9iamVjdC1ncm91cCBuYW1lXG5cbiAgICAgIHRoaXMubWFwLmxvYWRNYXAoaXRlbSwgZ3JvdXAsIGNiKVxuICAgICAgdGhpcy5tYXAubG9hZFBsYW5lKGl0ZW0sIGdyb3VwLCB0aGlzLnBsYW5lTGlzdClcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZsb29yTmFtZShpdGVtLm5hbWUsIGdyb3VwKVxuICAgICAgaWYgKGl0ZW0uZ2F0ZUFycikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaW4gZGF0YSBnYXRlQXJyXG4gICAgICAgIGl0ZW0uZ2F0ZUFyci5mb3JFYWNoKGdhdGUgPT4ge1xuICAgICAgICAgIHRoaXMubWFwLmNyZWF0ZUdhdGVMb2dvKGdhdGUubG9nbywgZ3JvdXApXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIFdvcmxkLm1haW5Hcm91cC5hZGQoZ3JvdXApXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5fbW9kZURpZmZIYW5kbGUoKVxuICAgICAgV29ybGQuc2NlbmUuYWRkKFdvcmxkLm1haW5Hcm91cClcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHVzZSBhcyBidWlsZFJpc2UoKVxuICBfbW9kZURpZmZIYW5kbGUgKCkge1xuICAgIC8vIGlmIG1vZGUgaXMgYXNzb2NpYXRpb24sIHRoZW4gZmlyc3Qgc2NlbmUgc3RhdHVzIGlzIHNpbmdsZVxuICAgIGlmICh0aGlzLm1vZGUpIHtcbiAgICAgIHRoaXMuY2hhbmdlRmxvb3IoMSlcbiAgICB9IFxuICB9XG5cbiAgLy8gZ28gdXAgLSBzaW5nbGUgZnJhbWVcbiAgdXBGbG9vcigpIHtcbiAgICBjb25zdCBoaWdoID0gU3RhdGVBLmNvdW50ICsgM1xuICAgIGNvbnN0IGxvdyA9IFN0YXRlQS5jb3VudCAtIDFcbiAgICB0aGlzLmFuaW1hdGVGbG9vci51cChoaWdoLCBsb3csIFdvcmxkLm1haW5Hcm91cClcbiAgfVxuXG4gIC8vIGdvIGRvd24gLSBzaW5nbGUgZnJhbWVcbiAgZG93bkZsb29yKCkge1xuICAgIGNvbnN0IGhpZ2ggPSBTdGF0ZUEuY291bnQgKyA0XG4gICAgY29uc3QgbG93ID0gU3RhdGVBLmNvdW50XG4gICAgdGhpcy5hbmltYXRlRmxvb3IuZG93bihoaWdoLCBsb3csIFdvcmxkLm1haW5Hcm91cClcbiAgfVxuXG4gIC8vIHN3aXRjaO+8mnMgLSBtXG4gIHNpbmdsZVRvTXVsdGkoKSB7XG4gICAgdGhpcy50d2VlbkZsb29yLnNpbmdsZVRvTXVsdGkoKVxuICB9XG5cbiAgLy8gc3dpdGNoOiBzIC0gc1xuICBzaW5nbGVUb1NpbmdsZShmbG9vcikge1xuICAgIHRoaXMudHdlZW5GbG9vci5zaW5nbGVUb1NpbmdsZShmbG9vciwgdGhpcy5tb2RlKVxuICB9XG5cbiAgLy8gc3dpdGNoOiBtIC0gc1xuICBtdWx0aVRvU2luZ2xlKGludGVyc2VjdCkge1xuICAgIFxuICAgIC8vIOa4hemZpOmXqueCuVxuICAgIHRoaXMuc2hpbmluZ0xpc3QuZm9yRWFjaCgoKSA9PiB7XG4gICAgICBsZXQgc2hpbmUgPSBXb3JsZC5zY2VuZS5nZXRPYmplY3RCeU5hbWUoJ3NoaW5lJyk7XG4gICAgICBXb3JsZC5zY2VuZS5yZW1vdmUoIHNoaW5lICk7XG4gICAgfSlcbiAgICB0aGlzLnR3ZWVuRmxvb3IubXVsdGlUb1NpbmdsZShpbnRlcnNlY3QsIHRoaXMubW9kZSlcbiAgfVxuXG4gIC8vIHN3aXRjaDogdG8gc2luZ2xlLCAyIHBvc2l0aW9uLCBmcm9tIG11bHRpLCBmcm9tIHNpbmdsZVxuICBjaGFuZ2VGbG9vcihmbG9vcikge1xuICAgIGlmIChXb3JsZC5zdGF0dXMgPT09ICdtdWx0aScpIHtcbiAgICAgIHRoaXMubXVsdGlUb1NpbmdsZShmbG9vcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaW5nbGVUb1NpbmdsZShmbG9vcilcbiAgICB9XG4gIH1cblxuICAvLyBzd2l0Y2g6IHRvIHNpbmdsZSwgZnJvbSBtdWx0aSBhbmQgcmF5Y2FzdGVyXG4gIG9uRG9jdW1lbnRNb3VzZUNsaWNrKGV2ZW50KSB7XG5cbiAgICBsZXQgcmF5Y2FzdGVyID0gbmV3IFJheWNhc3RlcihldmVudClcbiAgICBsZXQgcmF5TGlzdCA9IFtdIC8vIHJheWNhc3RlciBmaWVsZFxuICAgIFxuICAgIGlmIChXb3JsZC5zdGF0dXMgPT09ICdtdWx0aScpIHtcblxuICAgICAgcmF5TGlzdCA9IHRoaXMucGxhbmVMaXN0LnNsaWNlKFN0YXRlQS5jb3VudCwgU3RhdGVBLmNvdW50ICsgNClcbiAgICAgIHJheWNhc3Rlci5oYW5kbGVFdmVudChyYXlMaXN0LCAoaW50ZXJzZWN0cykgPT4ge1xuICAgICAgICB0aGlzLm11bHRpVG9TaW5nbGUoaW50ZXJzZWN0c1swXSlcbiAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICBsZXQgc2NyZWVuQWxleCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9XG4gICAgICByYXlMaXN0ID0gdGhpcy5zcHJpdGVMaXN0XG4gICAgICByYXljYXN0ZXIuaGFuZGxlRXZlbnQocmF5TGlzdCwgKGludGVyc2VjdHMpID0+IHtcblxuICAgICAgICB0aGlzLmdhdGUuY3JlYXRlTGV2aXRhdGVCb3goc2NyZWVuQWxleClcblxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgdmFyIGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZpY2VfX3BvcHBlci0td3JhcCcpXG4gICAgICAgIHZhciBib3hMZWZ0ID0gYm94Lm9mZnNldExlZnRcbiAgICAgICAgdmFyIGJveFJpZ2h0ID0gYm94Lm9mZnNldFdpZHRoICsgYm94Lm9mZnNldExlZnRcbiAgICAgICAgdmFyIGJveFRvcCA9IGJveC5vZmZzZXRUb3BcbiAgICAgICAgdmFyIGJveEJvdHRvbSA9IGJveC5vZmZzZXRIZWlnaHQgKyBib3gub2Zmc2V0VG9wXG4gIFxuICAgICAgICBpZiAoZXZlbnQuY2xpZW50WCA8IGJveExlZnQgfHxcbiAgICAgICAgICBldmVudC5jbGllbnRYID4gYm94UmlnaHQgfHxcbiAgICAgICAgICBldmVudC5jbGllbnRZIDwgYm94VG9wIHx8XG4gICAgICAgICAgZXZlbnQuY2xpZW50WSA+IGJveEJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5nYXRlLmNyZWF0ZUxldml0YXRlQm94KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvbldpbmRvd1Jlc2l6ZSAoKSB7XG4gICAgdmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBXb3JsZC5jYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgV29ybGQuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICBXb3JsZC5yZW5kZXJlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcbiAgICB0aGlzLmZpbmFsQ29tcG9zZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xuICB9XG5cbiAgLy8gY3JlYXRlIG9yYml0IGNvbnRyb2xzXG4gIGNyZWF0ZUNvbnRyb2xzKCkge1xuICAgIFdvcmxkLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoV29ybGQuY2FtZXJhLCBXb3JsZC5yZW5kZXJlci5kb21FbGVtZW50KVxuICAgIFdvcmxkLmNvbnRyb2xzLmVuYWJsZVpvb20gPSB0cnVlXG4gICAgV29ybGQuY29udHJvbHMuZW5hYmxlUm90YXRlID0gdHJ1ZVxuICAgIFdvcmxkLmNvbnRyb2xzLnNjcmVlblNwYWNlUGFubmluZyA9IHRydWVcbiAgICAvLyBzYXZlIHRoZSBzdGFydCBzdGF0dXMgb2Ygb2JqZWN0LCB0aGVuIGNhbWVyYSBhbmltYXRpb24gd2lsbCBrbm93IGEgcmVmZXJlbmNlIHZhbHVlIFxuICAgIFdvcmxkLmNvbnRyb2xzLnNhdmVTdGF0ZSgpO1xuICB9XG5cbiAgLy8gY3JlYXRlIGxpZ2h0XG4gIGNyZWF0ZUxpZ2h0KCkge1xuICAgIC8vIHdhcm0gbGlnaHRcbiAgICBsZXQgQW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMC4yKTtcbiAgICBXb3JsZC5zY2VuZS5hZGQoQW1iaWVudExpZ2h0KTtcbiAgICAvLyBza3kgbGlnaHRcbiAgICBsZXQgbGlnaHQgPSBuZXcgVEhSRUUuSGVtaXNwaGVyZUxpZ2h0KDB4ZmZmZmZmLCAweDAwMDAwMCwgMC45KTtcbiAgICBXb3JsZC5zY2VuZS5hZGQobGlnaHQpO1xuICB9XG5cbiAgY3JlYXRlQWxleCgpIHtcbiAgICBsZXQgYXhlc0hlbHBlciA9IG5ldyBUSFJFRS5BeGVzSGVscGVyKDEwMCk7XG4gICAgV29ybGQuc2NlbmUuYWRkKGF4ZXNIZWxwZXIpO1xuICB9XG5cbiAgcmVjZWl2ZUdhdGVJbmZvIChkYXRhKSB7XG4gICAgdGhpcy5nYXRlRGF0YSA9IGRhdGFcbiAgICB0aGlzLmdhdGVEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS50eXBlID09PSAwKSB7XG4gICAgICAgIGl0ZW0uc3JjID0gJy4vc3RhdGljL2NhbWVyYS1pbnNpZGUucG5nJ1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgaXRlbS5zcmMgPSAnLi9zdGF0aWMvY2FtZXJhLW91dHNpZGUucG5nJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5zcmMgPSAnLi9zdGF0aWMvY2FtZXJhLXBvc3QucG5nJ1xuICAgICAgfVxuICAgICAgdGhpcy5nYXRlLmNyZWF0ZVJlYWxHYXRlKGl0ZW0uY29vcmQsIGl0ZW0uc3JjKVxuICAgIH0pXG4gIH1cblxuICByZWNlaXZlQ29sb3JJbmZvIChkYXRhKSB7XG4gICAgdGhpcy5jb2xvckRhdGEgPSBkYXRhXG4gICAgdGhpcy5jb2xvckRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbltpdGVtLmZsb29yLTFdLmNoaWxkcmVuLmZvckVhY2goKG1lc2gsIHZhbCkgPT4ge1xuICAgICAgICBpZiAocGFyc2VJbnQodmFsKSA9PT0gcGFyc2VJbnQoaXRlbS5tZXNoTm8pKSB7XG4gICAgICAgICAgbWVzaC5tYXRlcmlhbC5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcignI2ZmMDAwMCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50Q29sbGVjdGlvbigpIHtcbiAgICBjb25zdCB1cGZsb29yRWwyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi11bCcpXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gMCkge1xuXG4gICAgICBpZiAoaG91c2VEYXRhLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgY29uc3QgdXBmbG9vckVsID0gdXBmbG9vckVsMi5jaGlsZE5vZGVzWzVdXG4gICAgICAgIHVwZmxvb3JFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoV29ybGQuc3RhdHVzID09PSAnbXVsdGknKSBcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUZsb29yLmJlZm9yZVVwKClcbiAgICAgICAgfSwgZmFsc2UpXG5cbiAgICAgICAgY29uc3QgZG93bmZsb29yRWwgPSB1cGZsb29yRWwyLmNoaWxkTm9kZXNbN11cbiAgICAgICAgZG93bmZsb29yRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKFdvcmxkLnN0YXR1cyA9PT0gJ211bHRpJylcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUZsb29yLmJlZm9yZURvd24oKVxuICAgICAgICB9LCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgYWxsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsJylcbiAgICAgIGFsbEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoV29ybGQuc3RhdHVzID09PSAnc2luZ2xlJykgXG4gICAgICAgICAgdGhpcy5zaW5nbGVUb011bHRpKClcbiAgICAgIH0sIGZhbHNlKVxuICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYXRlLWdyb3VwJylcbiAgICAgIGdhdGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuZ2F0ZS5jcmVhdGVHYXRlKGdhdGVFbCwgZSwgdGhpcy5zcHJpdGVMaXN0KVxuICAgICAgfSwgZmFsc2UpXG4gICAgfVxuICAgIFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZUNsaWNrKGV2ZW50KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIHRoaXMub25XaW5kb3dSZXNpemUoZXZlbnQpXG4gICAgfSwgZmFsc2UpXG4gICAgXG4gICAgY29uc3QgZmxvb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvb3InKVxuICAgIGZsb29yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnQScpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGbG9vcihwYXJzZUludChlLnRhcmdldC5pbm5lckhUTUwpKVxuICAgICAgfVxuICAgIH0sIGZhbHNlKVxuICB9XG59XG5cbmlmIChtb2RlID09PSAxKSB7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJ1xuICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICBjbWQ6IFwiYXNzb2NpYXRlLWxvYWRfc2lnbmFsXCJcbiAgfSwgJyonKTtcbn1lbHNlIHtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYigyOCwgMjksIDQ1KSdcbiAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgY21kOiBcImhvbWUtbG9hZF9zaWduYWxcIlxuICB9LCAnKicpO1xufVxuXG52YXIgd29ybGQ7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoKSA9PiB7aGFuZGxlTWVzc2FnZShldmVudCl9KTtcblxuZnVuY3Rpb24gaGFuZGxlTWVzc2FnZSAoZXZlbnQpIHtcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGE7XG4gIHN3aXRjaCAoZGF0YS5jbWQpIHtcbiAgICBjYXNlIFwibWFwX2RhdGFcIjpcbiAgICAgIGhvdXNlRGF0YSA9IGRhdGEuZGF0YVxuICAgICAgbmV3IE1hcERvbShtb2RlLCBmbG9vckxpc3QpXG4gICAgICBuZXcgTWFwU3R5bGUobW9kZSlcbiAgICAgIHdvcmxkID0gbmV3IFdvcmxkKG1vZGUpXG4gICAgICB3b3JsZC5pbml0KClcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJnYXRlX2RhdGFcIjpcbiAgICAgIHdvcmxkLnJlY2VpdmVHYXRlSW5mbyhkYXRhLmRhdGEpXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY29sb3JfZGF0YVwiOlxuICAgICAgd29ybGQucmVjZWl2ZUNvbG9ySW5mbyhkYXRhLmRhdGEpXG4gICAgICBicmVhaztcbiAgfVxufSIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vdXRpbC9ldmVudCdcblxuLyoqXG4gKiBBIEZTTVxuICogXG4gKiBAY2xhc3MgV29ybGRcbiAqIEBwYXJhbSB7IDNEIE9iamVjdCB9IGdyb3VwICAgICBcbiAqL1xuY2xhc3MgU3RhdGVBIHtcbiAgY29uc3RydWN0b3IgKGdyb3VwKSB7XG4gICAgdGhpcy5ncm91cCA9IGdyb3VwXG4gIH1cblxuICAvLyBzdGF0ZTogdXAgZmxvb3IgaW5nLi4uXG4gIGdldCB1cCAoKSB7IHJldHVybiB0aGlzLnVwIH1cbiAgc2V0IHVwICh2YWwpIHsgdGhpcy51cCA9IHZhbCB9XG5cbiAgLy8gc3RhdGU6IGRvd24gZmxvb3IgaW5nLi4uXG4gIGdldCBkb3duICgpIHsgcmV0dXJuIHRoaXMuZG93biB9XG4gIHNldCBkb3duICh2YWwpIHsgdGhpcy5kb3duID0gdmFsfVxuXG4gIC8vIHN0YW5kYXJkIGZsb29yIGNvdW50XG4gIC8vIGdldCBmbG9vckNvdW50ICgpIHsgcmV0dXJuIHRoaXMuZmxvb3JDb3VudCB9XG4gIC8vIHNldCBmbG9vckNvdW50IChvYmopIHsgdGhpcy5mbG9vckNvdW50ID0gb2JqIH1cblxuICAvLyBkeW5hbWljIGZsb29yIGNvdW50XG4gIGdldCBjb3VudCAoKSB7IHJldHVybiB0aGlzLmNvdW50IH1cbiAgc2V0IGNvdW50ICh2YWwpIHsgdGhpcy5jb3VudCA9IHZhbCB9XG5cbiAgaW5pdCAoaG91c2VEYXRhKSB7XG4gICAgU3RhdGVBLnVwID0gZmFsc2VcbiAgICBTdGF0ZUEuZG93biA9IGZhbHNlXG4gICAgdGhpcy5mbG9vckNvdW50ID0gdGhpcy5fZ2V0VXBEb3duRmxvb3JDb3VudCh0aGlzLmdyb3VwKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBTdGF0ZUEuY291bnQgPSB0aGlzLnN0YW5kYXJkQ291bnQgPSB0aGlzLmZsb29yQ291bnQucG9zaXRpb25cbiAgICB0aGlzLmZsb29yQ291bnQuZG93biA9IHRoaXMuc3RhbmRhcmRDb3VudCAtICh0aGlzLmZsb29yQ291bnQuZG93biAtIDEpXG4gICAgdGhpcy5mbG9vckNvdW50LnVwID0gdGhpcy5zdGFuZGFyZENvdW50ICsgKHRoaXMuZmxvb3JDb3VudC51cCAtIDEpXG4gICAgdGhpcy5taW5GbG9vciA9IHRoaXMuX2NhY3VsYXRlTWludXNJbmRleChob3VzZURhdGEpXG4gIH1cblxuICB1cEJlZ2luICgpIHtcbiAgICBpZiAoIFN0YXRlQS5jb3VudCA+IDAgJiYgIVN0YXRlQS51cCAmJiAhU3RhdGVBLmRvd24gKSB7XG4gICAgICBTdGF0ZUEudXAgPSB0cnVlXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdCgndXBUcmlnZ2VyJylcbiAgICB9XG4gIH1cblxuICBkb3duQmVnaW4gKCkge1xuICAgIGlmICggU3RhdGVBLmNvdW50ICsgNCA8PSB0aGlzLmZsb29yQ291bnQudXAgJiYgIVN0YXRlQS5kb3duICYmICFTdGF0ZUEudXAgKSB7XG4gICAgICBTdGF0ZUEuZG93biA9IHRydWVcbiAgICB9XG4gIH1cblxuICB1cEVuZCAoKSB7XG4gICAgU3RhdGVBLnVwID0gZmFsc2VcbiAgICBTdGF0ZUEuY291bnQtLVxuICB9XG5cbiAgZG93bkVuZCAoKSB7XG4gICAgU3RhdGVBLmRvd24gPSBmYWxzZVxuICAgIFN0YXRlQS5jb3VudCArK1xuICB9XG5cbiAgX2dldFVwRG93bkZsb29yQ291bnQoZ3JvdXApIHtcbiAgICB2YXIgZG93bkZsb29yQ291bnQgPSAwO1xuICAgIHZhciB1cEZsb29yQ291bnQgPSAwO1xuICAgIHZhciBwb3NpdGlvbiA9IDA7XG4gICAgZ3JvdXAuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0uZmxvb3IgPCAwKSB7XG4gICAgICAgIGRvd25GbG9vckNvdW50ICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwRmxvb3JDb3VudCArPSAxXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgIGRvd246IGRvd25GbG9vckNvdW50LFxuICAgICAgdXA6IHVwRmxvb3JDb3VudFxuICAgIH1cbiAgfVxuXG4gIF9jYWN1bGF0ZU1pbnVzSW5kZXgoYXJyKSB7XG4gICAgdmFyIG1pbkZsb29yID0gMTAwMFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldLmZsb29yIDwgbWluRmxvb3IgJiYgYXJyW2ldLmZsb29yID4gMCkge1xuICAgICAgICBtaW5GbG9vciA9IGFycltpXS5mbG9vcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pbkZsb29yXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGVBIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuLy8gdG9kbzogbGVnYWN5IHZlcnNpb24gbm8gY29uc2lkZXJhdGlvbiBvZiBkZXB0aCBjaGFuZ2UsIEkgbmVlZCBhIG5ldyBmdW5jdGlvblxuZnVuY3Rpb24gU2NyZWVuVG9Xb3JsZCAoc2NyZWVuUG9pbnQpIHtcblxuICAgIC8vIOiOt+WPluWxj+W5leWdkOagh+aKleW9seWcqOebuOacuuS4iueahHjlkox56L2055qE5YC8XG4gICAgbGV0IHBYID0gKHNjcmVlblBvaW50LnggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiAyIC0gMVxuICAgIGxldCBwWSA9IC0oc2NyZWVuUG9pbnQueSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMVxuICAgIC8vIGxldCBwID0gbmV3IFRIUkVFLlZlY3RvcjMocFgsIHBZLCAtMSkudW5wcm9qZWN0KGNhbWVyYSk7XG4gICAgLy8gc2V0IHZlY3RvcjJcbiAgICAvLyBsZXQgcDIgPSBuZXcgVEhSRUUuVmVjdG9yMihwWCwgcFkpO1xuICAgIC8vIGdldCB6LWRlcHRoXG4gICAgbGV0IHpkID0gV29ybGQuY2FtZXJhLnBvc2l0aW9uLnkgKyA2MCAtIDEwXG4gICAgLy8gZ2V0IGNhbWVyYSBhbmdsZSAoMTgwLTMwKS8yXG4gICAgbGV0IHphID0gNzUgKiBNYXRoLlBJIC8gMTgwXG4gICAgLy8g6I635Y+W5LiW55WM5Z2Q5qCH5Lit55qEeOi9tOi+ueeVjFxuICAgIGxldCBieCA9ICh6ZCAvIE1hdGgudGFuKHphKSkgKiAod2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLy8g6I635Y+W5LiW55WM5Z2Q5qCH5Lit55qEeei9tOi+ueeVjFxuICAgIGxldCBieSA9IHpkIC8gTWF0aC50YW4oemEpXG4gICAgLy8g6I635Y+W5LiW55WM5Z2Q5qCH5LiteOi9tOeahOWunumZheWdkOagh+eCuVxuICAgIGxldCBzeCA9IHBYICogYnhcbiAgICAvLyDojrflj5bkuJbnlYzlnZDmoIfkuK156L2055qE5a6e6ZmF5Z2Q5qCH54K5XG4gICAgbGV0IHN5ID0gcFkgKiBieVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHN4LFxuICAgICAgeTogc3lcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgU2NyZWVuVG9Xb3JsZCB9IiwiY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gIH1cbiAgXG4gIG9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fZXZlbnRzW2V2ZW50XSB8fCBbXVxuICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBjYWxsYmFja3NcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgb2ZmIChldmVudCxjYWxsYmFjayl7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gY2FsbGJhY2tzICYmIGNhbGxiYWNrcy5maWx0ZXIoZm4gPT4gZm4gIT09IGNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBlbWl0ICguLi5hcmdzKXtcbiAgICBjb25zdCBldmVudCA9IGFyZ3NbMF1cbiAgICBjb25zdCBwYXJhbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3MsIDEpXG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgIGNhbGxiYWNrcy5mb3JFYWNoKGZuID0+IGZuLmFwcGx5KHRoaXMsIHBhcmFtcykpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICBcbiAgb25jZSAoZXZlbnQsY2FsbGJhY2spe1xuICAgIGxldCB3cmFwRnVuYyA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsYXJncylcbiAgICAgICAgdGhpcy5vZmYoZXZlbnQsd3JhcEZ1bmMpXG4gICAgfVxuICAgIHRoaXMub24oZXZlbnQsd3JhcEZ1bmMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXIiXSwic291cmNlUm9vdCI6IiJ9