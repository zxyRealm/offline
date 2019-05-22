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

          this.createRealGate(newScreen, box.src);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19hc3luY0AxLjUuMkBhc3luYy9saWIvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19wcm9jZXNzQDAuMTEuMTBAcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc2V0aW1tZWRpYXRlQDEuMC41QHNldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL190aW1lcnMtYnJvd3NlcmlmeUAyLjAuMTBAdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb24vVHJhY2tGbG9vci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5pbWF0aW9uL1R3ZWVuRmxvb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h0bWwvTWFwRG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9odG1sL01hcFN0eWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvQmxvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9HYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvTWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvUmF5Y2FzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvU3ByaXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS9tYXBXb3JsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvRmxvb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvVHJhbnNmb3JtQWxleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9ldmVudC5qcyJdLCJuYW1lcyI6WyJUcmFja0Zsb29yIiwiaG91c2VEYXRhIiwic3RhdGVBIiwiU3RhdGVBIiwiV29ybGQiLCJtYWluR3JvdXAiLCJpbml0IiwiZmxvb3JIZWlnaHQiLCJ1cEhlaWdodCIsImRvd25IZWlnaHQiLCJwb3NpdGlvblNwZWVkIiwib3BhY2l0eVNwZWVkIiwib3BhY2l0eVNwZWVkMiIsImhpZ2giLCJsb3ciLCJncm91cCIsInBvc2l0aW9uIiwieSIsImNoaWxkcmVuIiwidXNlckRhdGEiLCJpc1Nob3ciLCJ2aXNpYmxlIiwiZm9yRWFjaCIsIml0ZW0iLCJuYW1lIiwibWF0ZXJpYWwiLCJvcGFjaXR5IiwiZG93bkVuZCIsInVwQmVnaW4iLCJkb3duQmVnaW4iLCJ1cEVuZCIsIlR3ZWVuRmxvb3IiLCJvcHRpb25zIiwiX2dldFR3ZWVuVmFsdWUiLCJPYmplY3QiLCJhc3NpZ24iLCJjYW1lcmFDdXJyZW50IiwiY3kiLCJjeiIsInoiLCJ0YXJnZXQiLCJjYW1lcmFPcmlnaW4iLCJwb3NpdGlvblkiLCJwb3NpdGlvbloiLCJtZXNoIiwic2V0Q29sb3IiLCJjb2xvciIsInNldE9wYWNpdHkiLCJfc3BvcnQiLCJjb250cm9scyIsImNvcHkiLCJzY2VuZSIsImFjdGl2ZSIsInN0YXR1cyIsImludGVyc2VjdCIsIm1vZGUiLCJrZXkiLCJ2YWx1ZSIsInIiLCJnIiwiYiIsIm9iamVjdCIsInBhcmVudCIsIndpbmRvdyIsInBvc3RNZXNzYWdlIiwiY21kIiwiZGF0YSIsInJlc2V0IiwidXBkYXRlIiwiY2FtZXJhIiwic2V0IiwiY2FtZXJhU3BvcnQiLCJmbG9vciIsInZhbCIsIngiLCJjYW1lcmFTcG9ydFgiLCJjb21wbGV0ZSIsInR3ZWVuIiwiVFdFRU4iLCJUd2VlbiIsInRvIiwib25VcGRhdGUiLCJsb29rQXQiLCJUSFJFRSIsIlZlY3RvcjMiLCJvbkNvbXBsZXRlIiwiZWFzaW5nIiwiRWFzaW5nIiwiTGluZWFyIiwiTm9uZSIsInN0YXJ0IiwiTWFwRG9tIiwiY3JlYXRlUGFnZSIsImFwcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUJ1dHRvblVsRG9tIiwiY3JlYXRlR2F0ZURvbSIsImNyZWF0ZUxldml0YXRlbkRvbSIsImxpc3QiLCJidXR0b25VbCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJwYXJzZSIsImV2YWwiLCJjb21waWxlIiwiaW5uZXJIVE1MIiwiZ2F0ZUdyb3VwIiwibGV2aXRhdGVuIiwiY29udGV4dCIsInRlbXBsYXRlIiwiZXZhbEV4cHIiLCJleHByIiwicmVwbGFjZSIsInNjcmlwdCIsIk1hcFN0eWxlIiwic2V0QnV0dG9uVWwiLCJzcGFuIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJtYXJnaW5Ub3AiLCJ0ZXh0QWxpZ24iLCJCbG9vbSIsInJlbmRlclNjZW5lIiwiUmVuZGVyUGFzcyIsInBvcyIsImdlb21ldHJ5IiwiU3BoZXJlR2VvbWV0cnkiLCJNZXNoQmFzaWNNYXRlcmlhbCIsInNpZGUiLCJEb3VibGVTaWRlIiwic3BoZXJlIiwiTWVzaCIsImFkZCIsImxheWVycyIsImVuYWJsZSIsInNjYWxlS0YiLCJWZWN0b3JLZXlmcmFtZVRyYWNrIiwiY2xpcCIsIkFuaW1hdGlvbkNsaXAiLCJtaXhlciIsIkFuaW1hdGlvbk1peGVyIiwiY2xpcEFjdGlvbiIsInNlbGVjdGVkT2JqZWN0IiwiZ2V0T2JqZWN0QnlOYW1lIiwicmVtb3ZlIiwiYmxvb21QYXNzIiwiVW5yZWFsQmxvb21QYXNzIiwiVmVjdG9yMiIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRocmVzaG9sZCIsInN0cmVuZ3RoIiwicmFkaXVzIiwiYmxvb21Db21wb3NlciIsIkVmZmVjdENvbXBvc2VyIiwicmVuZGVyZXIiLCJyZW5kZXJUYXJnZXQxIiwidGV4dHVyZSIsImZvcm1hdCIsIlJHQkFGb3JtYXQiLCJyZW5kZXJUYXJnZXQyIiwicmVuZGVyVG9TY3JlZW4iLCJzZXRTaXplIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImFkZFBhc3MiLCJmaW5hbFBhc3MiLCJTaGFkZXJQYXNzIiwiU2hhZGVyTWF0ZXJpYWwiLCJ1bmlmb3JtcyIsImJhc2VUZXh0dXJlIiwiYmxvb21UZXh0dXJlIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJkZWZpbmVzIiwiZmluYWxDb21wb3NlciIsIm5lZWRzU3dhcCIsIkdhdGUiLCJlbCIsImUiLCJzcHJpdGVMaXN0Iiwibm9kZU5hbWUiLCJ0b1VwcGVyQ2FzZSIsInNyYyIsInNwbGl0IiwicG9wIiwiaW1nIiwiYm94IiwiZGl2WCIsImV2ZW50IiwiY2xpZW50WCIsIm9mZnNldFdpZHRoIiwiZGl2WSIsImNsaWVudFkiLCJvZmZzZXRIZWlnaHQiLCJib2R5Iiwib25tb3VzZW1vdmUiLCJvbm1vdXNlZG93biIsInJlbW92ZUNoaWxkIiwibmV3U2NyZWVuIiwiU2NyZWVuVG9Xb3JsZCIsImNyZWF0ZVJlYWxHYXRlIiwicHVzaCIsImNvb3JkIiwic3ByaXRlIiwiU3ByaXRlIiwic2NhbGUiLCJjcmVhdGVQaWMiLCJzY3JlZW5BbGV4IiwiaGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibGluZSIsInd5Iiwid3giLCJyaWdodCIsImRpc3BsYXkiLCJNYXAiLCJsb2FkZXIiLCJTVkdMb2FkZXIiLCJHZW9tZXRyeSIsInNoYXBlIiwiRXh0cnVkZUJ1ZmZlckdlb21ldHJ5IiwiZGVwdGgiLCJiZXZlbEVuYWJsZWQiLCJiZXZlbFRoaWNrbmVzcyIsImJldmVsU2l6ZSIsImJldmVsU2VnbWVudHMiLCJNZXNoUGhvbmdNYXRlcmlhbCIsImdlbyIsImNyZWF0ZUdlb21ldHJ5IiwiZXh0cnVkZUdlbyIsImNyZWF0ZUV4dHJ1ZGVHZW9tZXRyeSIsImZyb21CdWZmZXJHZW9tZXRyeSIsInRyYW5zbGF0ZSIsIm1hdCIsImNyZWF0ZU1hdGVyaWFsIiwidXJsIiwiY2FsbGJhY2siLCJhc3luY0NiIiwibG9hZCIsInBhdGhzIiwicGF0aCIsInNoYXBlcyIsInRvU2hhcGVzIiwib3JpZ2luUG9zaXRpb24iLCJpbml0VGVtcGxhdGUiLCJ0cmFuc3BhcmVudCIsImNyZWF0ZU1lc2giLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsInBsYW5lTGlzdCIsImdyb3VwSW5mbyIsImxvZ28iLCJvcHRpb24iLCJmb250U2l6ZSIsImNyZWF0ZVRleHQiLCJSYXljYXN0ZXIiLCJyYXljYXN0ZXIiLCJyYXlMaXN0IiwiZW1wdHlDYWxsYmFjayIsIm1vdXNlIiwiY29udGFpbmVyIiwiZG9tRWxlbWVudCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0Iiwic2V0RnJvbUNhbWVyYSIsImludGVyc2VjdHMiLCJpbnRlcnNlY3RPYmplY3RzIiwibGVuZ3RoIiwidGV4dCIsImV4dHJhT3B0aW9uIiwiY2FudmFzIiwiaGVpZ2h0IiwiY3R4IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsIlRleHR1cmUiLCJuZWVkc1VwZGF0ZSIsIm1hcCIsImRlcHRoVGVzdCIsIl9jcmVhdGVTcHJpdGUiLCJwaWNVcmwiLCJUZXh0dXJlTG9hZGVyIiwib2JqIiwiU3ByaXRlTWF0ZXJpYWwiLCJhc3luYyIsInJlcXVpcmUiLCJwYXJzZUludCIsImdldFF1ZXJ5VmFyaWFibGUiLCJmbG9vckxpc3QiLCJ2YXJpYWJsZSIsInF1ZXJ5IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHJpbmciLCJ2YXJzIiwiaSIsInBhaXIiLCJjbG9jayIsIkNsb2NrIiwiZ2F0ZURhdGEiLCJjb2xvckRhdGEiLCJzaGluaW5nTGlzdCIsIlNjZW5lIiwiQ0FNX1BPUyIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsImFscGhhIiwic2V0UGl4ZWxSYXRpbyIsIkdyb3VwIiwiTGF5ZXJzIiwiY3JlYXRlQ29udHJvbHMiLCJjcmVhdGVMaWdodCIsImV2ZW50Q29sbGVjdGlvbiIsInR3ZWVuRmxvb3IiLCJnYXRlIiwiYnVpbGRpbmdSaXNlIiwiYmxvb20iLCJzZXRCbG9vbVBhc3MiLCJzZXRGaW5hbFBhc3MiLCJzaGluZSIsInNoaW5pbmciLCJyYW5kb20iLCJhbmltYXRlRmxvb3IiLCJhbmltYXRlIiwiZGVsdGEiLCJnZXREZWx0YSIsInVwIiwidXBGbG9vciIsImRvd24iLCJkb3duRmxvb3IiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZW5kZXIiLCJlYWNoIiwiY2IiLCJkeW5hbWljRmxvb3IiLCJsb2FkTWFwIiwibG9hZFBsYW5lIiwiY3JlYXRlRmxvb3JOYW1lIiwiZ2F0ZUFyciIsImNyZWF0ZUdhdGVMb2dvIiwiX21vZGVEaWZmSGFuZGxlIiwiY2hhbmdlRmxvb3IiLCJjb3VudCIsInNpbmdsZVRvTXVsdGkiLCJzaW5nbGVUb1NpbmdsZSIsIm11bHRpVG9TaW5nbGUiLCJzbGljZSIsImhhbmRsZUV2ZW50IiwiY3JlYXRlTGV2aXRhdGVCb3giLCJib3hMZWZ0Iiwib2Zmc2V0TGVmdCIsImJveFJpZ2h0IiwiYm94VG9wIiwib2Zmc2V0VG9wIiwiYm94Qm90dG9tIiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIk9yYml0Q29udHJvbHMiLCJlbmFibGVab29tIiwiZW5hYmxlUm90YXRlIiwic2NyZWVuU3BhY2VQYW5uaW5nIiwic2F2ZVN0YXRlIiwiQW1iaWVudExpZ2h0IiwibGlnaHQiLCJIZW1pc3BoZXJlTGlnaHQiLCJheGVzSGVscGVyIiwiQXhlc0hlbHBlciIsInR5cGUiLCJtZXNoTm8iLCJDb2xvciIsInVwZmxvb3JFbDIiLCJ1cGZsb29yRWwiLCJjaGlsZE5vZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlZm9yZVVwIiwiZG93bmZsb29yRWwiLCJiZWZvcmVEb3duIiwiYWxsRWwiLCJnYXRlRWwiLCJjcmVhdGVHYXRlIiwib25Eb2N1bWVudE1vdXNlQ2xpY2siLCJvbldpbmRvd1Jlc2l6ZSIsInRpbWUiLCJiYWNrZ3JvdW5kIiwid29ybGQiLCJoYW5kbGVNZXNzYWdlIiwicmVjZWl2ZUdhdGVJbmZvIiwicmVjZWl2ZUNvbG9ySW5mbyIsImZsb29yQ291bnQiLCJfZ2V0VXBEb3duRmxvb3JDb3VudCIsInN0YW5kYXJkQ291bnQiLCJtaW5GbG9vciIsIl9jYWN1bGF0ZU1pbnVzSW5kZXgiLCJFdmVudEVtaXR0ZXIiLCJlbWl0IiwiZG93bkZsb29yQ291bnQiLCJ1cEZsb29yQ291bnQiLCJhcnIiLCJzY3JlZW5Qb2ludCIsInBYIiwicFkiLCJ6ZCIsInphIiwiYngiLCJ0YW4iLCJieSIsInN4Iiwic3kiLCJfZXZlbnRzIiwiY2FsbGJhY2tzIiwiZmlsdGVyIiwiZm4iLCJhcmdzIiwicGFyYW1zIiwiY2FsbCIsImFwcGx5Iiwid3JhcEZ1bmMiLCJvZmYiLCJvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxVQUFVLEVBQUU7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9CQUFvQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkJBQTZCO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELHlCQUF5QjtBQUN2RixxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQSxhQUFPLElBQVA7QUFDRDs7Ozs7O0FBR1l2QiwyRUFBZixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NjZW5lL21hcFdvcmxkLmpzXCIpO1xuIiwiLyohXG4gKiBhc3luY1xuICogaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICpcbiAqIENvcHlyaWdodCAyMDEwLTIwMTQgQ2FvbGFuIE1jTWFob25cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGFzeW5jID0ge307XG4gICAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gICAgZnVuY3Rpb24gaWRlbnRpdHkodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9Cb29sKHYpIHtcbiAgICAgICAgcmV0dXJuICEhdjtcbiAgICB9XG4gICAgZnVuY3Rpb24gbm90SWQodikge1xuICAgICAgICByZXR1cm4gIXY7XG4gICAgfVxuXG4gICAgLy8gZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICAgIHZhciBwcmV2aW91c19hc3luYztcblxuICAgIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIChgc2VsZmApIGluIHRoZSBicm93c2VyLCBgZ2xvYmFsYFxuICAgIC8vIG9uIHRoZSBzZXJ2ZXIsIG9yIGB0aGlzYCBpbiBzb21lIHZpcnR1YWwgbWFjaGluZXMuIFdlIHVzZSBgc2VsZmBcbiAgICAvLyBpbnN0ZWFkIG9mIGB3aW5kb3dgIGZvciBgV2ViV29ya2VyYCBzdXBwb3J0LlxuICAgIHZhciByb290ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8XG4gICAgICAgICAgICB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsIHx8XG4gICAgICAgICAgICB0aGlzO1xuXG4gICAgaWYgKHJvb3QgIT0gbnVsbCkge1xuICAgICAgICBwcmV2aW91c19hc3luYyA9IHJvb3QuYXN5bmM7XG4gICAgfVxuXG4gICAgYXN5bmMubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IHByZXZpb3VzX2FzeW5jO1xuICAgICAgICByZXR1cm4gYXN5bmM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9ubHlfb25jZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHdhcyBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgZm4gPSBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9vbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLy8vIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJsaXR5IGZ1bmN0aW9ucyAvLy8vXG5cbiAgICB2YXIgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuICAgIHZhciBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9O1xuXG4gICAgLy8gUG9ydGVkIGZyb20gdW5kZXJzY29yZS5qcyBpc09iamVjdFxuICAgIHZhciBfaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2lzQXJyYXlMaWtlKGFycikge1xuICAgICAgICByZXR1cm4gX2lzQXJyYXkoYXJyKSB8fCAoXG4gICAgICAgICAgICAvLyBoYXMgYSBwb3NpdGl2ZSBpbnRlZ2VyIGxlbmd0aCBwcm9wZXJ0eVxuICAgICAgICAgICAgdHlwZW9mIGFyci5sZW5ndGggPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGFyci5sZW5ndGggPj0gMCAmJlxuICAgICAgICAgICAgYXJyLmxlbmd0aCAlIDEgPT09IDBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYXJyYXlFYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgICBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihhcnJbaW5kZXhdLCBpbmRleCwgYXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9tYXAoYXJyLCBpdGVyYXRvcikge1xuICAgICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyci5sZW5ndGgsXG4gICAgICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0b3IoYXJyW2luZGV4XSwgaW5kZXgsIGFycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmFuZ2UoY291bnQpIHtcbiAgICAgICAgcmV0dXJuIF9tYXAoQXJyYXkoY291bnQpLCBmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gaTsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3JlZHVjZShhcnIsIGl0ZXJhdG9yLCBtZW1vKSB7XG4gICAgICAgIF9hcnJheUVhY2goYXJyLCBmdW5jdGlvbiAoeCwgaSwgYSkge1xuICAgICAgICAgICAgbWVtbyA9IGl0ZXJhdG9yKG1lbW8sIHgsIGksIGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2ZvckVhY2hPZihvYmplY3QsIGl0ZXJhdG9yKSB7XG4gICAgICAgIF9hcnJheUVhY2goX2tleXMob2JqZWN0KSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tleV0sIGtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pbmRleE9mKGFyciwgaXRlbSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gaXRlbSkgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHZhciBfa2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9rZXlJdGVyYXRvcihjb2xsKSB7XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHZhciBsZW47XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICBpZiAoX2lzQXJyYXlMaWtlKGNvbGwpKSB7XG4gICAgICAgICAgICBsZW4gPSBjb2xsLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IGkgOiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtleXMgPSBfa2V5cyhjb2xsKTtcbiAgICAgICAgICAgIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBpIDwgbGVuID8ga2V5c1tpXSA6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2ltaWxhciB0byBFUzYncyByZXN0IHBhcmFtIChodHRwOi8vYXJpeWEub2ZpbGFicy5jb20vMjAxMy8wMy9lczYtYW5kLXJlc3QtcGFyYW1ldGVyLmh0bWwpXG4gICAgLy8gVGhpcyBhY2N1bXVsYXRlcyB0aGUgYXJndW1lbnRzIHBhc3NlZCBpbnRvIGFuIGFycmF5LCBhZnRlciBhIGdpdmVuIGluZGV4LlxuICAgIC8vIEZyb20gdW5kZXJzY29yZS5qcyAoaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL3B1bGwvMjE0MCkuXG4gICAgZnVuY3Rpb24gX3Jlc3RQYXJhbShmdW5jLCBzdGFydEluZGV4KSB7XG4gICAgICAgIHN0YXJ0SW5kZXggPSBzdGFydEluZGV4ID09IG51bGwgPyBmdW5jLmxlbmd0aCAtIDEgOiArc3RhcnRJbmRleDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGggLSBzdGFydEluZGV4LCAwKTtcbiAgICAgICAgICAgIHZhciByZXN0ID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICByZXN0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCArIHN0YXJ0SW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChzdGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIHJlc3QpO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0sIHJlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3VycmVudGx5IHVudXNlZCBidXQgaGFuZGxlIGNhc2VzIG91dHNpZGUgb2YgdGhlIHN3aXRjaCBzdGF0ZW1lbnQ6XG4gICAgICAgICAgICAvLyB2YXIgYXJncyA9IEFycmF5KHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgICAgICAgIC8vIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHN0YXJ0SW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8vICAgICBhcmdzW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBhcmdzW3N0YXJ0SW5kZXhdID0gcmVzdDtcbiAgICAgICAgICAgIC8vIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IodmFsdWUsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLy8vIGV4cG9ydGVkIGFzeW5jIG1vZHVsZSBmdW5jdGlvbnMgLy8vL1xuXG4gICAgLy8vLyBuZXh0VGljayBpbXBsZW1lbnRhdGlvbiB3aXRoIGJyb3dzZXItY29tcGF0aWJsZSBmYWxsYmFjayAvLy8vXG5cbiAgICAvLyBjYXB0dXJlIHRoZSBnbG9iYWwgcmVmZXJlbmNlIHRvIGd1YXJkIGFnYWluc3QgZmFrZVRpbWVyIG1vY2tzXG4gICAgdmFyIF9zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nICYmIHNldEltbWVkaWF0ZTtcblxuICAgIHZhciBfZGVsYXkgPSBfc2V0SW1tZWRpYXRlID8gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgLy8gbm90IGEgZGlyZWN0IGFsaWFzIGZvciBJRTEwIGNvbXBhdGliaWxpdHlcbiAgICAgICAgX3NldEltbWVkaWF0ZShmbik7XG4gICAgfSA6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFzeW5jLm5leHRUaWNrID0gcHJvY2Vzcy5uZXh0VGljaztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhc3luYy5uZXh0VGljayA9IF9kZWxheTtcbiAgICB9XG4gICAgYXN5bmMuc2V0SW1tZWRpYXRlID0gX3NldEltbWVkaWF0ZSA/IF9kZWxheSA6IGFzeW5jLm5leHRUaWNrO1xuXG5cbiAgICBhc3luYy5mb3JFYWNoID1cbiAgICBhc3luYy5lYWNoID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5lYWNoT2YoYXJyLCBfd2l0aG91dEluZGV4KGl0ZXJhdG9yKSwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5mb3JFYWNoU2VyaWVzID1cbiAgICBhc3luYy5lYWNoU2VyaWVzID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5lYWNoT2ZTZXJpZXMoYXJyLCBfd2l0aG91dEluZGV4KGl0ZXJhdG9yKSwgY2FsbGJhY2spO1xuICAgIH07XG5cblxuICAgIGFzeW5jLmZvckVhY2hMaW1pdCA9XG4gICAgYXN5bmMuZWFjaExpbWl0ID0gZnVuY3Rpb24gKGFyciwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gX2VhY2hPZkxpbWl0KGxpbWl0KShhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmZvckVhY2hPZiA9XG4gICAgYXN5bmMuZWFjaE9mID0gZnVuY3Rpb24gKG9iamVjdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIG9iamVjdCA9IG9iamVjdCB8fCBbXTtcblxuICAgICAgICB2YXIgaXRlciA9IF9rZXlJdGVyYXRvcihvYmplY3QpO1xuICAgICAgICB2YXIga2V5LCBjb21wbGV0ZWQgPSAwO1xuXG4gICAgICAgIHdoaWxlICgoa2V5ID0gaXRlcigpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQgKz0gMTtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrZXldLCBrZXksIG9ubHlfb25jZShkb25lKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcGxldGVkID09PSAwKSBjYWxsYmFjayhudWxsKTtcblxuICAgICAgICBmdW5jdGlvbiBkb25lKGVycikge1xuICAgICAgICAgICAgY29tcGxldGVkLS07XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGtleSBpcyBudWxsIGluIGNhc2UgaXRlcmF0b3IgaXNuJ3QgZXhoYXVzdGVkXG4gICAgICAgICAgICAvLyBhbmQgZG9uZSByZXNvbHZlZCBzeW5jaHJvbm91c2x5LlxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSBudWxsICYmIGNvbXBsZXRlZCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuZm9yRWFjaE9mU2VyaWVzID1cbiAgICBhc3luYy5lYWNoT2ZTZXJpZXMgPSBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgb2JqID0gb2JqIHx8IFtdO1xuICAgICAgICB2YXIgbmV4dEtleSA9IF9rZXlJdGVyYXRvcihvYmopO1xuICAgICAgICB2YXIga2V5ID0gbmV4dEtleSgpO1xuICAgICAgICBmdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgICAgICAgICAgdmFyIHN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZXJhdG9yKG9ialtrZXldLCBrZXksIG9ubHlfb25jZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gbmV4dEtleSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShpdGVyYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGl0ZXJhdGUoKTtcbiAgICB9O1xuXG5cblxuICAgIGFzeW5jLmZvckVhY2hPZkxpbWl0ID1cbiAgICBhc3luYy5lYWNoT2ZMaW1pdCA9IGZ1bmN0aW9uIChvYmosIGxpbWl0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgX2VhY2hPZkxpbWl0KGxpbWl0KShvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9lYWNoT2ZMaW1pdChsaW1pdCkge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgICAgICBvYmogPSBvYmogfHwgW107XG4gICAgICAgICAgICB2YXIgbmV4dEtleSA9IF9rZXlJdGVyYXRvcihvYmopO1xuICAgICAgICAgICAgaWYgKGxpbWl0IDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJ1bm5pbmcgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIHJlcGxlbmlzaCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUgJiYgcnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAocnVubmluZyA8IGxpbWl0ICYmICFlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBuZXh0S2V5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqW2tleV0sIGtleSwgb25seV9vbmNlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGVuaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZG9QYXJhbGxlbChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oYXN5bmMuZWFjaE9mLCBvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvUGFyYWxsZWxMaW1pdChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKF9lYWNoT2ZMaW1pdChsaW1pdCksIG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9TZXJpZXMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGFzeW5jLmVhY2hPZlNlcmllcywgb2JqLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hc3luY01hcChlYWNoZm4sIGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIGFyciA9IGFyciB8fCBbXTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBfaXNBcnJheUxpa2UoYXJyKSA/IFtdIDoge307XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLm1hcCA9IGRvUGFyYWxsZWwoX2FzeW5jTWFwKTtcbiAgICBhc3luYy5tYXBTZXJpZXMgPSBkb1NlcmllcyhfYXN5bmNNYXApO1xuICAgIGFzeW5jLm1hcExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9hc3luY01hcCk7XG5cbiAgICAvLyByZWR1Y2Ugb25seSBoYXMgYSBzZXJpZXMgdmVyc2lvbiwgYXMgZG9pbmcgcmVkdWNlIGluIHBhcmFsbGVsIHdvbid0XG4gICAgLy8gd29yayBpbiBtYW55IHNpdHVhdGlvbnMuXG4gICAgYXN5bmMuaW5qZWN0ID1cbiAgICBhc3luYy5mb2xkbCA9XG4gICAgYXN5bmMucmVkdWNlID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLmVhY2hPZlNlcmllcyhhcnIsIGZ1bmN0aW9uICh4LCBpLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IobWVtbywgeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIG1lbW8gPSB2O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBtZW1vKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLmZvbGRyID1cbiAgICBhc3luYy5yZWR1Y2VSaWdodCA9IGZ1bmN0aW9uIChhcnIsIG1lbW8sIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBfbWFwKGFyciwgaWRlbnRpdHkpLnJldmVyc2UoKTtcbiAgICAgICAgYXN5bmMucmVkdWNlKHJldmVyc2VkLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy50cmFuc2Zvcm0gPSBmdW5jdGlvbiAoYXJyLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gaXRlcmF0b3I7XG4gICAgICAgICAgICBpdGVyYXRvciA9IG1lbW87XG4gICAgICAgICAgICBtZW1vID0gX2lzQXJyYXkoYXJyKSA/IFtdIDoge307XG4gICAgICAgIH1cblxuICAgICAgICBhc3luYy5lYWNoT2YoYXJyLCBmdW5jdGlvbih2LCBrLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0b3IobWVtbywgdiwgaywgY2IpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbWVtbyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfZmlsdGVyKGVhY2hmbiwgYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe2luZGV4OiBpbmRleCwgdmFsdWU6IHh9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhfbWFwKHJlc3VsdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4LnZhbHVlO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5zZWxlY3QgPVxuICAgIGFzeW5jLmZpbHRlciA9IGRvUGFyYWxsZWwoX2ZpbHRlcik7XG5cbiAgICBhc3luYy5zZWxlY3RMaW1pdCA9XG4gICAgYXN5bmMuZmlsdGVyTGltaXQgPSBkb1BhcmFsbGVsTGltaXQoX2ZpbHRlcik7XG5cbiAgICBhc3luYy5zZWxlY3RTZXJpZXMgPVxuICAgIGFzeW5jLmZpbHRlclNlcmllcyA9IGRvU2VyaWVzKF9maWx0ZXIpO1xuXG4gICAgZnVuY3Rpb24gX3JlamVjdChlYWNoZm4sIGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9maWx0ZXIoZWFjaGZuLCBhcnIsIGZ1bmN0aW9uKHZhbHVlLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0b3IodmFsdWUsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICBjYighdik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBhc3luYy5yZWplY3QgPSBkb1BhcmFsbGVsKF9yZWplY3QpO1xuICAgIGFzeW5jLnJlamVjdExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9yZWplY3QpO1xuICAgIGFzeW5jLnJlamVjdFNlcmllcyA9IGRvU2VyaWVzKF9yZWplY3QpO1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZVRlc3RlcihlYWNoZm4sIGNoZWNrLCBnZXRSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFyciwgbGltaXQsIGl0ZXJhdG9yLCBjYikge1xuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKGdldFJlc3VsdChmYWxzZSwgdm9pZCAwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpdGVyYXRlZSh4LCBfLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKHgsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYiAmJiBjaGVjayh2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZ2V0UmVzdWx0KHRydWUsIHgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgZWFjaGZuKGFyciwgbGltaXQsIGl0ZXJhdGVlLCBkb25lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2IgPSBpdGVyYXRvcjtcbiAgICAgICAgICAgICAgICBpdGVyYXRvciA9IGxpbWl0O1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIGl0ZXJhdGVlLCBkb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYy5hbnkgPVxuICAgIGFzeW5jLnNvbWUgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZiwgdG9Cb29sLCBpZGVudGl0eSk7XG5cbiAgICBhc3luYy5zb21lTGltaXQgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZkxpbWl0LCB0b0Jvb2wsIGlkZW50aXR5KTtcblxuICAgIGFzeW5jLmFsbCA9XG4gICAgYXN5bmMuZXZlcnkgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZiwgbm90SWQsIG5vdElkKTtcblxuICAgIGFzeW5jLmV2ZXJ5TGltaXQgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZkxpbWl0LCBub3RJZCwgbm90SWQpO1xuXG4gICAgZnVuY3Rpb24gX2ZpbmRHZXRSZXN1bHQodiwgeCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgYXN5bmMuZGV0ZWN0ID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2YsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG4gICAgYXN5bmMuZGV0ZWN0U2VyaWVzID0gX2NyZWF0ZVRlc3Rlcihhc3luYy5lYWNoT2ZTZXJpZXMsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG4gICAgYXN5bmMuZGV0ZWN0TGltaXQgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZkxpbWl0LCBpZGVudGl0eSwgX2ZpbmRHZXRSZXN1bHQpO1xuXG4gICAgYXN5bmMuc29ydEJ5ID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLm1hcChhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKGVyciwgY3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB7dmFsdWU6IHgsIGNyaXRlcmlhOiBjcml0ZXJpYX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBfbWFwKHJlc3VsdHMuc29ydChjb21wYXJhdG9yKSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudmFsdWU7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmF0b3IobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYSwgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jLmF1dG8gPSBmdW5jdGlvbiAodGFza3MsIGNvbmN1cnJlbmN5LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uY3VycmVuY3kgaXMgb3B0aW9uYWwsIHNoaWZ0IHRoZSBhcmdzLlxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25jdXJyZW5jeTtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICB2YXIga2V5cyA9IF9rZXlzKHRhc2tzKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZ1Rhc2tzID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGlmICghcmVtYWluaW5nVGFza3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICBjb25jdXJyZW5jeSA9IHJlbWFpbmluZ1Rhc2tzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdHMgPSB7fTtcbiAgICAgICAgdmFyIHJ1bm5pbmdUYXNrcyA9IDA7XG5cbiAgICAgICAgdmFyIGhhc0Vycm9yID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiBhZGRMaXN0ZW5lcihmbikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnVuc2hpZnQoZm4pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGZuKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gX2luZGV4T2YobGlzdGVuZXJzLCBmbik7XG4gICAgICAgICAgICBpZiAoaWR4ID49IDApIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0YXNrQ29tcGxldGUoKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUYXNrcy0tO1xuICAgICAgICAgICAgX2FycmF5RWFjaChsaXN0ZW5lcnMuc2xpY2UoMCksIGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghcmVtYWluaW5nVGFza3MpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgX2FycmF5RWFjaChrZXlzLCBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgdGFzayA9IF9pc0FycmF5KHRhc2tzW2tdKSA/IHRhc2tzW2tdOiBbdGFza3Nba11dO1xuICAgICAgICAgICAgdmFyIHRhc2tDYWxsYmFjayA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1Rhc2tzLS07XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVSZXN1bHRzID0ge307XG4gICAgICAgICAgICAgICAgICAgIF9mb3JFYWNoT2YocmVzdWx0cywgZnVuY3Rpb24odmFsLCBya2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlUmVzdWx0c1tya2V5XSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW2tdID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgc2FmZVJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1trXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZSh0YXNrQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHJlcXVpcmVzID0gdGFzay5zbGljZSgwLCB0YXNrLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgLy8gcHJldmVudCBkZWFkLWxvY2tzXG4gICAgICAgICAgICB2YXIgbGVuID0gcmVxdWlyZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGRlcDtcbiAgICAgICAgICAgIHdoaWxlIChsZW4tLSkge1xuICAgICAgICAgICAgICAgIGlmICghKGRlcCA9IHRhc2tzW3JlcXVpcmVzW2xlbl1dKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hhcyBub25leGlzdGVudCBkZXBlbmRlbmN5IGluICcgKyByZXF1aXJlcy5qb2luKCcsICcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KGRlcCkgJiYgX2luZGV4T2YoZGVwLCBrKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSGFzIGN5Y2xpYyBkZXBlbmRlbmNpZXMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZ1Rhc2tzIDwgY29uY3VycmVuY3kgJiYgX3JlZHVjZShyZXF1aXJlcywgZnVuY3Rpb24gKGEsIHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhICYmIHJlc3VsdHMuaGFzT3duUHJvcGVydHkoeCkpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUpICYmICFyZXN1bHRzLmhhc093blByb3BlcnR5KGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlYWR5KCkpIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MrKztcbiAgICAgICAgICAgICAgICB0YXNrW3Rhc2subGVuZ3RoIC0gMV0odGFza0NhbGxiYWNrLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdUYXNrcysrO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tbdGFzay5sZW5ndGggLSAxXSh0YXNrQ2FsbGJhY2ssIHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG5cbiAgICBhc3luYy5yZXRyeSA9IGZ1bmN0aW9uKHRpbWVzLCB0YXNrLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgREVGQVVMVF9USU1FUyA9IDU7XG4gICAgICAgIHZhciBERUZBVUxUX0lOVEVSVkFMID0gMDtcblxuICAgICAgICB2YXIgYXR0ZW1wdHMgPSBbXTtcblxuICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgIHRpbWVzOiBERUZBVUxUX1RJTUVTLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IERFRkFVTFRfSU5URVJWQUxcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBwYXJzZVRpbWVzKGFjYywgdCl7XG4gICAgICAgICAgICBpZih0eXBlb2YgdCA9PT0gJ251bWJlcicpe1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9IHBhcnNlSW50KHQsIDEwKSB8fCBERUZBVUxUX1RJTUVTO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiB0ID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgYWNjLnRpbWVzID0gcGFyc2VJbnQodC50aW1lcywgMTApIHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgICAgICAgICAgYWNjLmludGVydmFsID0gcGFyc2VJbnQodC5pbnRlcnZhbCwgMTApIHx8IERFRkFVTFRfSU5URVJWQUw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYXJndW1lbnQgdHlwZSBmb3IgXFwndGltZXNcXCc6ICcgKyB0eXBlb2YgdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA8IDEgfHwgbGVuZ3RoID4gMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyAtIG11c3QgYmUgZWl0aGVyICh0YXNrKSwgKHRhc2ssIGNhbGxiYWNrKSwgKHRpbWVzLCB0YXNrKSBvciAodGltZXMsIHRhc2ssIGNhbGxiYWNrKScpO1xuICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAyICYmIHR5cGVvZiB0aW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSB0YXNrO1xuICAgICAgICAgICAgdGFzayA9IHRpbWVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHBhcnNlVGltZXMob3B0cywgdGltZXMpO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgb3B0cy50YXNrID0gdGFzaztcblxuICAgICAgICBmdW5jdGlvbiB3cmFwcGVkVGFzayh3cmFwcGVkQ2FsbGJhY2ssIHdyYXBwZWRSZXN1bHRzKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiByZXRyeUF0dGVtcHQodGFzaywgZmluYWxBdHRlbXB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2soZnVuY3Rpb24oZXJyLCByZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzQ2FsbGJhY2soIWVyciB8fCBmaW5hbEF0dGVtcHQsIHtlcnI6IGVyciwgcmVzdWx0OiByZXN1bHR9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgd3JhcHBlZFJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJldHJ5SW50ZXJ2YWwoaW50ZXJ2YWwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzZXJpZXNDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKG9wdHMudGltZXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBmaW5hbEF0dGVtcHQgPSAhKG9wdHMudGltZXMtPTEpO1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlBdHRlbXB0KG9wdHMudGFzaywgZmluYWxBdHRlbXB0KSk7XG4gICAgICAgICAgICAgICAgaWYoIWZpbmFsQXR0ZW1wdCAmJiBvcHRzLmludGVydmFsID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlJbnRlcnZhbChvcHRzLmludGVydmFsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3luYy5zZXJpZXMoYXR0ZW1wdHMsIGZ1bmN0aW9uKGRvbmUsIGRhdGEpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgKHdyYXBwZWRDYWxsYmFjayB8fCBvcHRzLmNhbGxiYWNrKShkYXRhLmVyciwgZGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIGNhbGxiYWNrIGlzIHBhc3NlZCwgcnVuIHRoaXMgYXMgYSBjb250cm9sbCBmbG93XG4gICAgICAgIHJldHVybiBvcHRzLmNhbGxiYWNrID8gd3JhcHBlZFRhc2soKSA6IHdyYXBwZWRUYXNrO1xuICAgIH07XG5cbiAgICBhc3luYy53YXRlcmZhbGwgPSBmdW5jdGlvbiAodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIGlmICghX2lzQXJyYXkodGFza3MpKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byB3YXRlcmZhbGwgbXVzdCBiZSBhbiBhcnJheSBvZiBmdW5jdGlvbnMnKTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3cmFwSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIFtlcnJdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh3cmFwSXRlcmF0b3IobmV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbnN1cmVBc3luYyhpdGVyYXRvcikuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd3JhcEl0ZXJhdG9yKGFzeW5jLml0ZXJhdG9yKHRhc2tzKSkoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX3BhcmFsbGVsKGVhY2hmbiwgdGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcDtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBfaXNBcnJheUxpa2UodGFza3MpID8gW10gOiB7fTtcblxuICAgICAgICBlYWNoZm4odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0YXNrKF9yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLnBhcmFsbGVsID0gZnVuY3Rpb24gKHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoYXN5bmMuZWFjaE9mLCB0YXNrcywgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5wYXJhbGxlbExpbWl0ID0gZnVuY3Rpb24odGFza3MsIGxpbWl0LCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoX2VhY2hPZkxpbWl0KGxpbWl0KSwgdGFza3MsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuc2VyaWVzID0gZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wYXJhbGxlbChhc3luYy5lYWNoT2ZTZXJpZXMsIHRhc2tzLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLml0ZXJhdG9yID0gZnVuY3Rpb24gKHRhc2tzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VDYWxsYmFjayhpbmRleCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZm4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXNrc1tpbmRleF0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpbmRleCA8IHRhc2tzLmxlbmd0aCAtIDEpID8gbWFrZUNhbGxiYWNrKGluZGV4ICsgMSk6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYWtlQ2FsbGJhY2soMCk7XG4gICAgfTtcblxuICAgIGFzeW5jLmFwcGx5ID0gX3Jlc3RQYXJhbShmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGNhbGxBcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoXG4gICAgICAgICAgICAgICAgbnVsbCwgYXJncy5jb25jYXQoY2FsbEFyZ3MpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIF9jb25jYXQoZWFjaGZuLCBhcnIsIGZuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBpbmRleCwgY2IpIHtcbiAgICAgICAgICAgIGZuKHgsIGZ1bmN0aW9uIChlcnIsIHkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHkgfHwgW10pO1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMuY29uY2F0ID0gZG9QYXJhbGxlbChfY29uY2F0KTtcbiAgICBhc3luYy5jb25jYXRTZXJpZXMgPSBkb1NlcmllcyhfY29uY2F0KTtcblxuICAgIGFzeW5jLndoaWxzdCA9IGZ1bmN0aW9uICh0ZXN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuICAgICAgICBpZiAodGVzdCgpKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVzdC5hcHBseSh0aGlzLCBhcmdzKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihuZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0ZXJhdG9yKG5leHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuZG9XaGlsc3QgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIHRlc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIHJldHVybiBhc3luYy53aGlsc3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKytjYWxscyA8PSAxIHx8IHRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMudW50aWwgPSBmdW5jdGlvbiAodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy53aGlsc3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZG9VbnRpbCA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmRvV2hpbHN0KGl0ZXJhdG9yLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmR1cmluZyA9IGZ1bmN0aW9uICh0ZXN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuXG4gICAgICAgIHZhciBuZXh0ID0gX3Jlc3RQYXJhbShmdW5jdGlvbihlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goY2hlY2spO1xuICAgICAgICAgICAgICAgIHRlc3QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uKGVyciwgdHJ1dGgpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0cnV0aCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG5leHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0ZXN0KGNoZWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZG9EdXJpbmcgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIHRlc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIGFzeW5jLmR1cmluZyhmdW5jdGlvbihuZXh0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbHMrKyA8IDEpIHtcbiAgICAgICAgICAgICAgICBuZXh0KG51bGwsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9xdWV1ZSh3b3JrZXIsIGNvbmN1cnJlbmN5LCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChjb25jdXJyZW5jeSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25jdXJyZW5jeSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjb25jdXJyZW5jeSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25jdXJyZW5jeSBtdXN0IG5vdCBiZSB6ZXJvJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2luc2VydChxLCBkYXRhLCBwb3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcS5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghX2lzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT09IDAgJiYgcS5pZGxlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9hcnJheUVhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2sgfHwgbm9vcFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHEudGFza3MudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHEuc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUocS5wcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfbmV4dChxLCB0YXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgd29ya2VycyAtPSAxO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBfYXJyYXlFYWNoKHRhc2tzLCBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgICAgICAgICBfYXJyYXlFYWNoKHdvcmtlcnNMaXN0LCBmdW5jdGlvbiAod29ya2VyLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtlciA9PT0gdGFzayAmJiAhcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhc2suY2FsbGJhY2suYXBwbHkodGFzaywgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHEucHJvY2VzcygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3b3JrZXJzID0gMDtcbiAgICAgICAgdmFyIHdvcmtlcnNMaXN0ID0gW107XG4gICAgICAgIHZhciBxID0ge1xuICAgICAgICAgICAgdGFza3M6IFtdLFxuICAgICAgICAgICAgY29uY3VycmVuY3k6IGNvbmN1cnJlbmN5LFxuICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIHNhdHVyYXRlZDogbm9vcCxcbiAgICAgICAgICAgIGVtcHR5OiBub29wLFxuICAgICAgICAgICAgZHJhaW46IG5vb3AsXG4gICAgICAgICAgICBzdGFydGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhdXNlZDogZmFsc2UsXG4gICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIGZhbHNlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2lsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHEuZHJhaW4gPSBub29wO1xuICAgICAgICAgICAgICAgIHEudGFza3MgPSBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNoaWZ0OiBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIHRydWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9jZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUoIXEucGF1c2VkICYmIHdvcmtlcnMgPCBxLmNvbmN1cnJlbmN5ICYmIHEudGFza3MubGVuZ3RoKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFza3MgPSBxLnBheWxvYWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoMCwgcS5wYXlsb2FkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZSgwLCBxLnRhc2tzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBfbWFwKHRhc2tzLCBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd29ya2VycyArPSAxO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzTGlzdC5wdXNoKHRhc2tzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gb25seV9vbmNlKF9uZXh0KHEsIHRhc2tzKSk7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcihkYXRhLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlbmd0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLnRhc2tzLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlcnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd29ya2Vyc0xpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2Vyc0xpc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWRsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHEucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocS5wYXVzZWQgPT09IGZhbHNlKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICAgIHEucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VtZUNvdW50ID0gTWF0aC5taW4ocS5jb25jdXJyZW5jeSwgcS50YXNrcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY2FsbCBxLnByb2Nlc3Mgb25jZSBwZXIgY29uY3VycmVudFxuICAgICAgICAgICAgICAgIC8vIHdvcmtlciB0byBwcmVzZXJ2ZSBmdWxsIGNvbmN1cnJlbmN5IGFmdGVyIHBhdXNlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdyA9IDE7IHcgPD0gcmVzdW1lQ291bnQ7IHcrKykge1xuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUocS5wcm9jZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cblxuICAgIGFzeW5jLnF1ZXVlID0gZnVuY3Rpb24gKHdvcmtlciwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgdmFyIHEgPSBfcXVldWUoZnVuY3Rpb24gKGl0ZW1zLCBjYikge1xuICAgICAgICAgICAgd29ya2VyKGl0ZW1zWzBdLCBjYik7XG4gICAgICAgIH0sIGNvbmN1cnJlbmN5LCAxKTtcblxuICAgICAgICByZXR1cm4gcTtcbiAgICB9O1xuXG4gICAgYXN5bmMucHJpb3JpdHlRdWV1ZSA9IGZ1bmN0aW9uICh3b3JrZXIsIGNvbmN1cnJlbmN5KSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2NvbXBhcmVUYXNrcyhhLCBiKXtcbiAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9iaW5hcnlTZWFyY2goc2VxdWVuY2UsIGl0ZW0sIGNvbXBhcmUpIHtcbiAgICAgICAgICAgIHZhciBiZWcgPSAtMSxcbiAgICAgICAgICAgICAgICBlbmQgPSBzZXF1ZW5jZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGJlZyA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHZhciBtaWQgPSBiZWcgKyAoKGVuZCAtIGJlZyArIDEpID4+PiAxKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShpdGVtLCBzZXF1ZW5jZVttaWRdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZyA9IG1pZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiZWc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0YXNrIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIV9pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFpbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBhcmUgbm8gdGFza3NcbiAgICAgICAgICAgICAgICByZXR1cm4gYXN5bmMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYXJyYXlFYWNoKGRhdGEsIGZ1bmN0aW9uKHRhc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGFzayxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gY2FsbGJhY2sgOiBub29wXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHEudGFza3Muc3BsaWNlKF9iaW5hcnlTZWFyY2gocS50YXNrcywgaXRlbSwgX2NvbXBhcmVUYXNrcykgKyAxLCAwLCBpdGVtKTtcblxuICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCA9PT0gcS5jb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICBxLnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUocS5wcm9jZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG5vcm1hbCBxdWV1ZVxuICAgICAgICB2YXIgcSA9IGFzeW5jLnF1ZXVlKHdvcmtlciwgY29uY3VycmVuY3kpO1xuXG4gICAgICAgIC8vIE92ZXJyaWRlIHB1c2ggdG8gYWNjZXB0IHNlY29uZCBwYXJhbWV0ZXIgcmVwcmVzZW50aW5nIHByaW9yaXR5XG4gICAgICAgIHEucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZW1vdmUgdW5zaGlmdCBmdW5jdGlvblxuICAgICAgICBkZWxldGUgcS51bnNoaWZ0O1xuXG4gICAgICAgIHJldHVybiBxO1xuICAgIH07XG5cbiAgICBhc3luYy5jYXJnbyA9IGZ1bmN0aW9uICh3b3JrZXIsIHBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuIF9xdWV1ZSh3b3JrZXIsIDEsIHBheWxvYWQpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfY29uc29sZV9mbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW19yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uc29sZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2FycmF5RWFjaChhcmdzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGVbbmFtZV0oeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMubG9nID0gX2NvbnNvbGVfZm4oJ2xvZycpO1xuICAgIGFzeW5jLmRpciA9IF9jb25zb2xlX2ZuKCdkaXInKTtcbiAgICAvKmFzeW5jLmluZm8gPSBfY29uc29sZV9mbignaW5mbycpO1xuICAgIGFzeW5jLndhcm4gPSBfY29uc29sZV9mbignd2FybicpO1xuICAgIGFzeW5jLmVycm9yID0gX2NvbnNvbGVfZm4oJ2Vycm9yJyk7Ki9cblxuICAgIGFzeW5jLm1lbW9pemUgPSBmdW5jdGlvbiAoZm4sIGhhc2hlcikge1xuICAgICAgICB2YXIgbWVtbyA9IHt9O1xuICAgICAgICB2YXIgcXVldWVzID0ge307XG4gICAgICAgIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgICAgICBoYXNoZXIgPSBoYXNoZXIgfHwgaWRlbnRpdHk7XG4gICAgICAgIHZhciBtZW1vaXplZCA9IF9yZXN0UGFyYW0oZnVuY3Rpb24gbWVtb2l6ZWQoYXJncykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBoYXNoZXIuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwobWVtbywga2V5KSkgeyAgIFxuICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIG1lbW9ba2V5XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXMuY2FsbChxdWV1ZXMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZXNba2V5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldID0gW2NhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgICAgICAgICBtZW1vW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcSA9IHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHFbaV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1lbW9pemVkLm1lbW8gPSBtZW1vO1xuICAgICAgICBtZW1vaXplZC51bm1lbW9pemVkID0gZm47XG4gICAgICAgIHJldHVybiBtZW1vaXplZDtcbiAgICB9O1xuXG4gICAgYXN5bmMudW5tZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKGZuLnVubWVtb2l6ZWQgfHwgZm4pLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF90aW1lcyhtYXBwZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb3VudCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBtYXBwZXIoX3JhbmdlKGNvdW50KSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYy50aW1lcyA9IF90aW1lcyhhc3luYy5tYXApO1xuICAgIGFzeW5jLnRpbWVzU2VyaWVzID0gX3RpbWVzKGFzeW5jLm1hcFNlcmllcyk7XG4gICAgYXN5bmMudGltZXNMaW1pdCA9IGZ1bmN0aW9uIChjb3VudCwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMubWFwTGltaXQoX3JhbmdlKGNvdW50KSwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnNlcSA9IGZ1bmN0aW9uICgvKiBmdW5jdGlvbnMuLi4gKi8pIHtcbiAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3luYy5yZWR1Y2UoZm5zLCBhcmdzLCBmdW5jdGlvbiAobmV3YXJncywgZm4sIGNiKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgbmV3YXJncy5jb25jYXQoW19yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgbmV4dGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyLCBuZXh0YXJncyk7XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoYXQsIFtlcnJdLmNvbmNhdChyZXN1bHRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLmNvbXBvc2UgPSBmdW5jdGlvbiAoLyogZnVuY3Rpb25zLi4uICovKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5zZXEuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnJldmVyc2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG5cbiAgICBmdW5jdGlvbiBfYXBwbHlFYWNoKGVhY2hmbikge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbihmbnMsIGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBnbyA9IF9yZXN0UGFyYW0oZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlYWNoZm4oZm5zLCBmdW5jdGlvbiAoZm4sIF8sIGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MuY29uY2F0KFtjYl0pKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5hcHBseUVhY2ggPSBfYXBwbHlFYWNoKGFzeW5jLmVhY2hPZik7XG4gICAgYXN5bmMuYXBwbHlFYWNoU2VyaWVzID0gX2FwcGx5RWFjaChhc3luYy5lYWNoT2ZTZXJpZXMpO1xuXG5cbiAgICBhc3luYy5mb3JldmVyID0gZnVuY3Rpb24gKGZuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZG9uZSA9IG9ubHlfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIHRhc2sgPSBlbnN1cmVBc3luYyhmbik7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhc2sobmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlbnN1cmVBc3luYyhmbikge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBpZiAoc3luYykge1xuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYy5lbnN1cmVBc3luYyA9IGVuc3VyZUFzeW5jO1xuXG4gICAgYXN5bmMuY29uc3RhbnQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICB2YXIgYXJncyA9IFtudWxsXS5jb25jYXQodmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXN5bmMud3JhcFN5bmMgPVxuICAgIGFzeW5jLmFzeW5jaWZ5ID0gZnVuY3Rpb24gYXN5bmNpZnkoZnVuYykge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgcmVzdWx0IGlzIFByb21pc2Ugb2JqZWN0XG4gICAgICAgICAgICBpZiAoX2lzT2JqZWN0KHJlc3VsdCkgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLm1lc3NhZ2UgPyBlcnIgOiBuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBOb2RlLmpzXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYXN5bmM7XG4gICAgfVxuICAgIC8vIEFNRCAvIFJlcXVpcmVKU1xuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luYztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgICBlbHNlIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICAgIH1cblxufSgpKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCBXb3JsZCBmcm9tICcuLi9zY2VuZS9tYXBXb3JsZCdcbmltcG9ydCBTdGF0ZUEgZnJvbSAnLi4vc3RhdGUvRmxvb3InXG5jbGFzcyBUcmFja0Zsb29yIHtcblxuICBjb25zdHJ1Y3RvciAoKSB7fVxuXG4gIGluaXQgKGhvdXNlRGF0YSkge1xuICAgIHRoaXMuc3RhdGVBID0gbmV3IFN0YXRlQShXb3JsZC5tYWluR3JvdXApXG4gICAgdGhpcy5zdGF0ZUEuaW5pdChob3VzZURhdGEpXG5cbiAgICB0aGlzLmZsb29ySGVpZ2h0ID0gMTIwXG4gICAgdGhpcy51cEhlaWdodCA9IDBcbiAgICB0aGlzLmRvd25IZWlnaHQgPSB0aGlzLmZsb29ySGVpZ2h0XG4gICAgLy8gcG9zaXRpb24gZnJhbWUgc3BlZWRcbiAgICB0aGlzLnBvc2l0aW9uU3BlZWQgPSAyXG4gICAgLy8gb3BhY2l0eSBmcmFtZSBzcGVlZFxuICAgIHRoaXMub3BhY2l0eVNwZWVkID0gMC4zICogdGhpcy5wb3NpdGlvblNwZWVkIC8gdGhpcy5mbG9vckhlaWdodFxuICAgIC8vIHNob3Agb3BhY2l0eSBmcmFtZSBzcGVlZFxuICAgIHRoaXMub3BhY2l0eVNwZWVkMiA9IDEgKiB0aGlzLnBvc2l0aW9uU3BlZWQgLyB0aGlzLmZsb29ySGVpZ2h0XG4gIH1cblxuICBkb3duIChoaWdoLCBsb3csIGdyb3VwKSB7XG5cbiAgICB0aGlzLmRvd25IZWlnaHQgLT0gdGhpcy5wb3NpdGlvblNwZWVkXG4gICAgZ3JvdXAucG9zaXRpb24ueSAtPSB0aGlzLnBvc2l0aW9uU3BlZWRcbiAgICBncm91cC5jaGlsZHJlbltsb3ddLnVzZXJEYXRhLmlzU2hvdyA9IGZhbHNlXG4gICAgZ3JvdXAuY2hpbGRyZW5baGlnaF0udXNlckRhdGEuaXNTaG93ID0gdHJ1ZVxuICAgIGdyb3VwLmNoaWxkcmVuW2hpZ2hdLnZpc2libGUgPSB0cnVlXG4gICAgXG4gICAgZ3JvdXAuY2hpbGRyZW5bbG93XS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgLT0gdGhpcy5vcGFjaXR5U3BlZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSAtPSB0aGlzLm9wYWNpdHlTcGVlZDJcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGdyb3VwLmNoaWxkcmVuW2hpZ2hdLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSArPSB0aGlzLm9wYWNpdHlTcGVlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5ICs9IHRoaXMub3BhY2l0eVNwZWVkMlxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgLy8gQ29tcGxldGVcbiAgICBpZiAodGhpcy5kb3duSGVpZ2h0IDw9IDApIHtcbiAgICAgIHRoaXMuZG93bkhlaWdodCA9IHRoaXMuZmxvb3JIZWlnaHQgLy8gcmVzZXQgaGVpZ2h0XG4gICAgICB0aGlzLnN0YXRlQS5kb3duRW5kKClcbiAgICB9XG4gIH1cblxuICBiZWZvcmVVcCAoKSB7XG4gICAgdGhpcy5zdGF0ZUEudXBCZWdpbigpXG4gIH1cblxuICBiZWZvcmVEb3duICgpIHtcbiAgICB0aGlzLnN0YXRlQS5kb3duQmVnaW4oKVxuICB9XG5cbiAgdXAgKGhpZ2gsIGxvdywgZ3JvdXApIHtcbiAgICB0aGlzLnVwSGVpZ2h0ICs9IHRoaXMucG9zaXRpb25TcGVlZFxuICAgIGdyb3VwLnBvc2l0aW9uLnkgKz0gdGhpcy5wb3NpdGlvblNwZWVkXG4gICAgZ3JvdXAuY2hpbGRyZW5baGlnaF0udXNlckRhdGEuaXNTaG93ID0gZmFsc2VcbiAgICBncm91cC5jaGlsZHJlbltsb3ddLnVzZXJEYXRhLmlzU2hvdyA9IHRydWVcbiAgICBncm91cC5jaGlsZHJlbltsb3ddLnZpc2libGUgPSB0cnVlXG4gICAgXG4gICAgZ3JvdXAuY2hpbGRyZW5bbG93XS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgKz0gdGhpcy5vcGFjaXR5U3BlZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSArPSB0aGlzLm9wYWNpdHlTcGVlZDJcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGdyb3VwLmNoaWxkcmVuW2hpZ2hdLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSAtPSB0aGlzLm9wYWNpdHlTcGVlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5IC09IHRoaXMub3BhY2l0eVNwZWVkMlxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHRoaXMudXBIZWlnaHQgPj0gdGhpcy5mbG9vckhlaWdodCkge1xuICAgICAgdGhpcy51cEhlaWdodCA9IDBcbiAgICAgIHRoaXMuc3RhdGVBLnVwRW5kKClcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRyYWNrRmxvb3JcbiIsImltcG9ydCBXb3JsZCBmcm9tICcuLi9zY2VuZS9tYXBXb3JsZCdcblxuLyoqXG4gKiBjaGFuZ2Ugc2luZ2xlIGFuZCBtdWx0aSBieSBzb21lIHR3ZWVuLCBhbmQgYmluZCBzb21lIHN0YXR1cyBhdCBncm91cCdzIHVzZXJEYXRhXG4gKiBcbiAqIEBjbGFzc1xuICogQHBhcmFtIHsgTnVtYmVyIH0gbW9kZSAgIHNjZW5lIG1vZGVcbiAqIEBwYXJhbURlc2MgbW9kZSAgICAgICAgICAwOiBob21lLCAxOiBhc3NvY2lhdGlvblxuICovXG5jbGFzcyBUd2VlbkZsb29yIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuX2dldFR3ZWVuVmFsdWUoKVxuICB9XG5cbiAgLy8gb25seSBob21lXG4gIHNpbmdsZVRvTXVsdGkgKCkge1xuICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbi5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgIGlmIChncm91cC52aXNpYmxlKSB7XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMuY2FtZXJhQ3VycmVudCwgeyBjeTogZ3JvdXAucG9zaXRpb24ueSwgY3o6IGdyb3VwLnBvc2l0aW9uLnogfSlcbiAgICAgICAgbGV0IHRhcmdldCA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLmNhbWVyYU9yaWdpbiwgeyBjeTogZ3JvdXAudXNlckRhdGEucG9zaXRpb25ZLCBjejogZ3JvdXAudXNlckRhdGEucG9zaXRpb25aIH0pXG4gICAgICAgIFxuICAgICAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldENvbG9yKG1lc2gsIG1lc2gudXNlckRhdGEuY29sb3IpXG4gICAgICAgICAgfSBlbHNlIGlmKG1lc2gubmFtZSA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLl9zcG9ydChwb3NpdGlvbiwgdGFyZ2V0LCBncm91cCwgKCk9PntcbiAgICAgICAgICBXb3JsZC5jb250cm9scy50YXJnZXQuY29weShXb3JsZC5zY2VuZS5wb3NpdGlvbilcbiAgICAgICAgICBXb3JsZC5tYWluR3JvdXAudXNlckRhdGEuYWN0aXZlID0gMFxuICAgICAgICAgIFdvcmxkLnN0YXR1cyA9ICdtdWx0aSdcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwLnVzZXJEYXRhLmlzU2hvdyl7XG4gICAgICAgIGdyb3VwLnZpc2libGUgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG11bHRpVG9TaW5nbGUgKGludGVyc2VjdCwgbW9kZSkge1xuICAgIFxuICAgIGxldCBrZXksIHZhbHVlXG4gICAgbGV0IGNvbG9yID0geyByOiA5OC8yNTUsIGc6IDEwOC8yNTUsIGI6IDE1NC8yNTUgfVxuICAgIFxuICAgIC8vIHR3byB3YXkgdG8gc2luZ2xlIDogY2xpY2sgYnV0dG9uLCBjbGljayBib2FyZFxuICAgIGlmICh0eXBlb2YgaW50ZXJzZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAga2V5ID0gJ25hbWUnXG4gICAgICB2YWx1ZSA9IGludGVyc2VjdC5vYmplY3QucGFyZW50Lm5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gJ2Zsb29yJ1xuICAgICAgdmFsdWUgPSBpbnRlcnNlY3RcbiAgICB9XG5cbiAgICAvLyDlj5HpgIEgbS1zIOS/oeWPt1xuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgY21kOiAndG9fc2luZ2xlJyxcbiAgICAgIGRhdGE6IHZhbHVlXG4gICAgfSwgJyonKVxuICAgIFxuICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbi5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgIGlmIChncm91cC51c2VyRGF0YVtrZXldICE9PSB2YWx1ZSkge1xuICAgICAgICBncm91cC52aXNpYmxlID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMgbWVhbnMgdGhhdCB3aGVuICdzaW5nbGUgc3RhdHVzJywgbWFpbkdyb3VwIG5lZWRzIHRvIHJlY29yZCB3aGljaCBmbG9vciBpcyB2aXNpYmxlLlxuICAgICAgICBXb3JsZC5tYWluR3JvdXAudXNlckRhdGEudmlzaWJsZSA9IHZhbHVlIC0gMVxuICAgICAgICAvLyBjb3JyZWN0IGNvbnRyb2xzOiBkcmFnIHRoZSBzY2VuZSB3aWxsIG1ha2UgY2FtZXJhJ3MgcGVyc3BlY3RpdmUgdW5zdGFibGVcbiAgICAgICAgLy8gc28gd2UgbXVzdCByZXNldCBhbmQgdXBkYXRlIGJ5IG91cnNlbHZlc1xuICAgICAgICBXb3JsZC5jb250cm9scy5yZXNldCgpXG4gICAgICAgIFdvcmxkLmNvbnRyb2xzLnVwZGF0ZSgpXG4gICAgICAgIFdvcmxkLmNvbnRyb2xzLnRhcmdldC5jb3B5KFdvcmxkLnNjZW5lLnBvc2l0aW9uKVxuICAgICAgICBXb3JsZC5zdGF0dXMgPSAnc2luZ2xlJ1xuXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2gobWVzaCA9PiB7XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldENvbG9yKG1lc2gsIGNvbG9yKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWVzaC5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAwLjMpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRPcGFjaXR5KG1lc2gsIDEpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgLy8ganVkZ2UgbW9kZTogaWYgYXNzb2NpYXRpb24sIG5vIGFuaW1hdGlvbjsgaWYgaG9tZSwgdHdlZW4gYW5pbWF0aW9uXG4gICAgICAgIC8vIGFzc29jaWF0aW9uLCB0aGVyZSBpcyBubyBhbmdsZSwgdSBjYW4gc2VlIHRoZSBzY2VuZSBhcyBhIHBsYW5lLCBzbyB5IGlzIDgwMFxuICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgIFdvcmxkLmNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMTEwMCwgMClcbiAgICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBwb3NpdGlvbiA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLmNhbWVyYUN1cnJlbnQsIHsgY3k6IGdyb3VwLnBvc2l0aW9uLnksIGN6OiBncm91cC5wb3NpdGlvbi56IH0pXG4gICAgICAgICAgbGV0IHRhcmdldCA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLmNhbWVyYVNwb3J0LCB7IGN5OiAyMDAsIGN6OiBncm91cC5wb3NpdGlvbi56ICsgNTAgfSlcbiAgICAgICAgICB0aGlzLl9zcG9ydChwb3NpdGlvbiwgdGFyZ2V0LCBncm91cClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzaW5nbGVUb1NpbmdsZSAoZmxvb3IsIG1vZGUgPSAwKSB7XG4gICAgXG4gICAgbGV0IGNvbG9yID0geyByOiA5OC8yNTUsIGc6IDEwOC8yNTUsIGI6IDE1NC8yNTUgfVxuXG4gICAgV29ybGQuY29udHJvbHMudGFyZ2V0LmNvcHkoV29ybGQuc2NlbmUucG9zaXRpb24pXG4gICAgV29ybGQuc3RhdHVzID0gJ3NpbmdsZSdcblxuICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbi5mb3JFYWNoKChncm91cCwgdmFsKSA9PiB7XG4gICAgICBcbiAgICAgIGdyb3VwLnBvc2l0aW9uLnogPSBncm91cC51c2VyRGF0YS5wb3NpdGlvblpcblxuICAgICAgaWYgKGdyb3VwLnZpc2libGUpIHtcbiAgICAgICAgZ3JvdXAudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSBncm91cC51c2VyRGF0YS5wb3NpdGlvbllcbiAgICAgICAgZ3JvdXAuY2hpbGRyZW4uZm9yRWFjaChtZXNoID0+IHtcbiAgICAgICAgICBpZiAobWVzaC5uYW1lID09PSAnc3RvcmUnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0Q29sb3IobWVzaCwgbWVzaC51c2VyRGF0YS5jb2xvcilcbiAgICAgICAgICB9IGVsc2UgaWYobWVzaC5uYW1lID09PSAnZmxhZycpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRPcGFjaXR5KG1lc2gsIDApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXAudXNlckRhdGEuZmxvb3IgPT09IGZsb29yKSB7XG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgZ3JvdXAucG9zaXRpb24ueSA9IDBcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgIGdyb3VwLnBvc2l0aW9uLnkgPSAyMDBcbiAgICAgICAgICBncm91cC5wb3NpdGlvbi56ID0gZ3JvdXAucG9zaXRpb24ueiArIDUwXG4gICAgICAgIH1cbiAgICAgICAgV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLnZpc2libGUgPSB2YWxcbiAgICAgICAgZ3JvdXAudmlzaWJsZSA9IHRydWVcblxuICAgICAgICAvLyDlj5HpgIEgbS1zIOS/oeWPt1xuICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBjbWQ6ICd0b19zaW5nbGUnLFxuICAgICAgICAgIGRhdGE6IHZhbCArIDFcbiAgICAgICAgfSwgJyonKVxuXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2gobWVzaCA9PiB7XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldENvbG9yKG1lc2gsIGNvbG9yKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWVzaC5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAwLjMpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRPcGFjaXR5KG1lc2gsIDEpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgfVxuICBcbiAgLy8gc2V0IG9yaWdpbiBwb3NpdGlvbiB2YWx1ZVxuICBfZ2V0VHdlZW5WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbWVyYUN1cnJlbnQ6IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnBvc2l0aW9uLngsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55LFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEucG9zaXRpb24uelxuICAgICAgfSxcbiAgICAgIGNhbWVyYU9yaWdpbjoge1xuICAgICAgICB4OiBXb3JsZC5jYW1lcmEudXNlckRhdGEucG9zaXRpb24ueCxcbiAgICAgICAgeTogV29ybGQuY2FtZXJhLnVzZXJEYXRhLnBvc2l0aW9uLnksXG4gICAgICAgIHo6IFdvcmxkLmNhbWVyYS51c2VyRGF0YS5wb3NpdGlvbi56XG4gICAgICB9LFxuICAgICAgY2FtZXJhU3BvcnQ6IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnggLSA3MDAsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55ICsgODAwLFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueiAtIDEwMDBcbiAgICAgIH0sXG4gICAgICBjYW1lcmFTcG9ydFg6IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnggLSA3MDAsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55ICsgODAwLFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueiAtIDExMDBcbiAgICAgIH0sXG4gICAgICBzZXRDb2xvcjogKG1lc2gsIGNvbG9yKSA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwuY29sb3IuciA9IGNvbG9yLnJcbiAgICAgICAgbWVzaC5tYXRlcmlhbC5jb2xvci5nID0gY29sb3IuZ1xuICAgICAgICBtZXNoLm1hdGVyaWFsLmNvbG9yLmIgPSBjb2xvci5iXG4gICAgICB9LFxuICAgICAgc2V0T3BhY2l0eTogKG1lc2gsIG9wYWNpdHkpID0+IHtcbiAgICAgICAgbWVzaC5tYXRlcmlhbC5vcGFjaXR5ID0gb3BhY2l0eVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9zcG9ydCAocG9zaXRpb24sIHRhcmdldCwgZ3JvdXAsIGNvbXBsZXRlID0gKCk9Pnt9KSB7XG4gICAgbGV0IHR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKHBvc2l0aW9uKS50byh0YXJnZXQsIDIwMDApXG4gICAgdHdlZW4ub25VcGRhdGUoKCkgPT4ge1xuICAgICAgV29ybGQuY2FtZXJhLnBvc2l0aW9uLnggPSBwb3NpdGlvbi54O1xuICAgICAgV29ybGQuY2FtZXJhLnBvc2l0aW9uLnkgPSBwb3NpdGlvbi55O1xuICAgICAgV29ybGQuY2FtZXJhLnBvc2l0aW9uLnogPSBwb3NpdGlvbi56O1xuICAgICAgZ3JvdXAucG9zaXRpb24ueSA9IHBvc2l0aW9uLmN5O1xuICAgICAgZ3JvdXAucG9zaXRpb24ueiA9IHBvc2l0aW9uLmN6O1xuICAgICAgV29ybGQuY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG4gICAgfSlcbiAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfSlcbiAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcbiAgICAuc3RhcnQoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFR3ZWVuRmxvb3IiLCJjbGFzcyBNYXBEb20ge1xuICBjb25zdHJ1Y3Rvcihtb2RlLCBkYXRhKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZVxuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICB0aGlzLmNyZWF0ZVBhZ2UoKVxuICB9XG5cbiAgY3JlYXRlUGFnZSgpIHtcbiAgICB0aGlzLmFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKVxuICAgIHRoaXMuYXBwLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlQnV0dG9uVWxEb20odGhpcy5tb2RlLCB0aGlzLmRhdGEpKVxuICAgIHRoaXMuYXBwLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlR2F0ZURvbSh0aGlzLm1vZGUpKVxuICAgIHRoaXMuYXBwLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlTGV2aXRhdGVuRG9tKHRoaXMubW9kZSkpXG4gIH1cblxuICBjcmVhdGVCdXR0b25VbERvbShtb2RlLCBsaXN0KSB7XG4gICAgbGV0IGJ1dHRvblVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBidXR0b25VbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2J1dHRvbi11bCcpXG4gICAgbGV0IGZsb29yID0gYFxuICAgIDwlIGlmIChtb2RlID09PSAwKSB7ICU+XG4gICAgPGEgaHJlZj0namF2YXNjcmlwdDo7JyBpZD0nYWxsJz7mgLs8L2E+XG4gICAgPCUgfSAlPlxuICAgIDxzcGFuIGlkPVwiZmxvb3JcIj5cbiAgICA8JSBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykgeyAlPlxuICAgICAgPGE+PCU9IGxpc3RbaV0ubmFtZSAlPjwvYT5cbiAgICA8JSB9ICU+XG4gICAgPC9zcGFuPlxuICAgIDwlIGlmIChtb2RlID09PSAwICYmIGxpc3QubGVuZ3RoID4gNCkgeyAlPlxuICAgIDxhIGhyZWY9J2phdmFzY3JpcHQ6OycgaWQ9J3VwZmxvb3InPuS4iuWNhzwvYT5cbiAgICA8YSBocmVmPSdqYXZhc2NyaXB0OjsnIGlkPSdkb3duZmxvb3InPuS4i+mZjTwvYT5cbiAgICA8JSB9ICU+XG4gICAgYFxuICAgIGxldCBwYXJzZSA9IGV2YWwodGhpcy5jb21waWxlKGZsb29yKSlcbiAgICBidXR0b25VbC5pbm5lckhUTUwgPSBwYXJzZSgpXG4gICAgcmV0dXJuIGJ1dHRvblVsXG4gIH1cblxuICBjcmVhdGVHYXRlRG9tIChtb2RlKSB7XG4gICAgbGV0IGdhdGVHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZ2F0ZUdyb3VwLnNldEF0dHJpYnV0ZSgnaWQnLCAnZ2F0ZS1ncm91cCcpXG5cbiAgICBsZXQgaXRlbSA9IGBcbiAgICA8JSBpZiAobW9kZSA9PT0gMSkgeyAlPlxuICAgIDxkaXYgY2xhc3M9XCJnYXRlLWl0ZW0gZ2F0ZS1yZWRcIj5cbiAgICAgIDxpbWcgc3JjPVwiLi9zdGF0aWMvY2FtZXJhLWluc2lkZS5wbmdcIiBhbHQ9XCJcIj5cbiAgICAgIDxzcGFuPuWGhemDqOWHuuWFpeWPozwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2F0ZS1pdGVtIGdhdGUtb3JhbmdlXCI+XG4gICAgICA8aW1nIHNyYz1cIi4vc3RhdGljL2NhbWVyYS1vdXRzaWRlLnBuZ1wiIGFsdD1cIlwiPlxuICAgICAgPHNwYW4+5YaF6YOo5Ye65YWl5Y+jPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnYXRlLWl0ZW0gZ2F0ZS1ncmVlblwiPlxuICAgICAgPGltZyBzcmM9XCIuL3N0YXRpYy9jYW1lcmEtcG9zdC5wbmdcIiBhbHQ9XCJcIj5cbiAgICAgIDxzcGFuPumAmumBkzwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8JSB9ICU+XG4gICAgYFxuICAgIGxldCBwYXJzZSA9IGV2YWwodGhpcy5jb21waWxlKGl0ZW0pKVxuICAgIGdhdGVHcm91cC5pbm5lckhUTUwgPSBwYXJzZSgpXG4gICAgcmV0dXJuIGdhdGVHcm91cFxuICB9XG5cbiAgY3JlYXRlTGV2aXRhdGVuRG9tICgpIHtcbiAgICBsZXQgbGV2aXRhdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBsZXZpdGF0ZW4uc2V0QXR0cmlidXRlKCdpZCcsICdkZXZpY2VfX3BvcHBlci0td3JhcCcpXG4gICAgbGV2aXRhdGVuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGV2aXRhdGVuJylcblxuICAgIGxldCBjb250ZXh0ID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHRcIj5cbiAgICAgICAgPGltZyBzcmM9XCIuL3N0YXRpYy9lZGl0X2ljb24yeC5wbmdcIiBkYXRhLXR5cGU9XCJlZGl0UG9ydGFsXCIgYWx0PVwiXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiLi9zdGF0aWMvZGVsZXRlX2ljb24ucG5nXCIgZGF0YS10eXBlPVwiZGVsZXRlUG9ydGFsXCIgYWx0PVwiXCI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnRcIj5cbiAgICAgICAgPHAgaWQ9XCJkZXZpY2UtLXRpdGxlXCIgY2xhc3M9XCJlbGxpcHNpc1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkZXZpY2UtbGlzdC13cmFwXCI+XG4gICAgICA8dWwgY2xhc3M9XCJkZXZpY2UtbGlzdFwiIGlkPVwiZGV2aWNlLS1saXN0XCI+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhZGQtYnV0dG9uXCI+XG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkICgwKTtcIiBkYXRhLXR5cGU9XCJhZGRcIj7mt7vliqDorr7lpIc8L2E+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImhvcml6b250YWwtbGluZVwiPjwvZGl2PlxuICAgIGBcbiAgICBsZXZpdGF0ZW4uaW5uZXJIVE1MID0gY29udGV4dFxuICAgIHJldHVybiBsZXZpdGF0ZW5cbiAgfVxuXG4gIGNvbXBpbGUgKHRlbXBsYXRlKSB7XG4gICAgY29uc3QgZXZhbEV4cHIgPSAvPCU9KC4rPyklPi9nXG4gICAgY29uc3QgZXhwciA9IC88JShbXFxzXFxTXSs/KSU+L2dcblxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShldmFsRXhwciwgJ2ApOyBcXG4gIGVjaG8oICQxICk7IFxcbiAgZWNobyhgJykucmVwbGFjZShleHByLCAnYCk7IFxcbiAkMSBcXG4gIGVjaG8oYCcpXG5cbiAgICB0ZW1wbGF0ZSA9ICdlY2hvKGAnICsgdGVtcGxhdGUgKyAnYCk7J1xuXG4gICAgbGV0IHNjcmlwdCA9IGAoZnVuY3Rpb24gcGFyc2UoZGF0YSl7XG4gICAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgXG4gICAgICBmdW5jdGlvbiBlY2hvKGh0bWwpe1xuICAgICAgICBvdXRwdXQgKz0gaHRtbDtcbiAgICAgIH1cbiAgXG4gICAgICAke3RlbXBsYXRlfVxuICBcbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfSlgXG5cbiAgICByZXR1cm4gc2NyaXB0XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwRG9tO1xuIiwiY2xhc3MgTWFwU3R5bGUge1xuICBjb25zdHJ1Y3Rvcihtb2RlKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZVxuICAgIHRoaXMuc2V0QnV0dG9uVWwoKVxuICB9XG4gIFxuICBzZXRCdXR0b25VbCgpe1xuICAgIGxldCBidXR0b25VbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tdWwnKVxuICAgIGxldCBzcGFuID0gYnV0dG9uVWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKVswXVxuICAgIGxldCBhID0gYnV0dG9uVWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVxuICAgIGlmICh0aGlzLm1vZGUpIHtcbiAgICAgIC8vIOekvue+pFxuICAgICAgYnV0dG9uVWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICBidXR0b25VbC5zdHlsZS5sZWZ0ID0gJzQwcHgnXG4gICAgICBidXR0b25VbC5zdHlsZS50b3AgPSAnMjclJ1xuICAgICAgYnV0dG9uVWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhc3NvY2lhdGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDpppbpobVcbiAgICAgIGJ1dHRvblVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgYnV0dG9uVWwuc3R5bGUud2lkdGggPSAnMTAwJSdcbiAgICAgIGJ1dHRvblVsLnN0eWxlLm1hcmdpblRvcCA9ICczMHB4J1xuICAgICAgYnV0dG9uVWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgIGJ1dHRvblVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaG9tZScpXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNYXBTdHlsZSIsImltcG9ydCBXb3JsZCBmcm9tICcuLi9zY2VuZS9tYXBXb3JsZCdcblxuY2xhc3MgQmxvb20ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlbmRlclNjZW5lID0gbmV3IFRIUkVFLlJlbmRlclBhc3MoV29ybGQuc2NlbmUsIFdvcmxkLmNhbWVyYSlcbiAgfVxuXG4gIGdldCBtaXhlcigpIHsgcmV0dXJuIHRoaXMubWl4ZXIgfVxuICBzZXQgbWl4ZXIodmFsKSB7IHRoaXMubWl4ZXIgPSB2YWwgfVxuXG4gIHZlcnRleFNoYWRlcigpIHtcbiAgICByZXR1cm4gYFxuICAgIHZhcnlpbmcgdmVjMiB2VXY7XG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgdlV2ID0gdXY7XG4gICAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG4gICAgfWBcbiAgfVxuXG4gIGZyYWdtZW50U2hhZGVyKCkge1xuICAgIHJldHVybiBgXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgYmFzZVRleHR1cmU7XG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgYmxvb21UZXh0dXJlO1xuICAgIHVuaWZvcm0gZmxvYXQgaVRpbWU7XG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcbiAgICB2ZWM0IGdldFRleHR1cmUoIHNhbXBsZXIyRCB0ZXh0dXJlICkge1xuICAgICAgcmV0dXJuIG1hcFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggdGV4dHVyZSAsIHZVdiApICk7XG4gICAgfVxuICAgIHZlYzMgdjMoIGZsb2F0IHgsIGZsb2F0IHksIGZsb2F0IHogKXtcbiAgICAgIHJldHVybiB2ZWMzKCB4LCB5LCB6ICk7XG4gICAgfVxuICAgIHZlYzMgaDJyZ2IoIGZsb2F0IGh1ZSApe1xuICAgICAgZmxvYXQgaCA9IGFicyhodWUgLSBmbG9vcihodWUpKSAqIDYuO1xuICAgICAgdmVjMyBjID0gdmVjMyggMC4sIDAuLCAwLiApO1xuICAgICAgIFxuICAgICAgaW50IGYgPSBpbnQoZmxvb3IoIGggKSk7XG4gICAgICAgIFxuICAgICAgaWYoZiA9PSAwKWMgPSB2MygxLiwgaCwgMC4pO1xuICAgICAgZWxzZSBpZihmID09IDEpYyA9IHYzKDIuLWgsIDEuLCAwLik7XG4gICAgICBlbHNlIGlmKGYgPT0gMiljID0gdjMoMC4sIDEuLCBoLTIuKTtcbiAgICAgIGVsc2UgaWYoZiA9PSAzKWMgPSB2MygwLiwgNC4taCwgMS4pO1xuICAgICAgZWxzZSBpZihmID09IDQpYyA9IHYzKGgtNC4sIDAuLCAxLik7XG4gICAgICBlbHNlIGMgPSB2MygxLiwgMC4sIDYuIC0gaCk7XG4gICAgICBcbiAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICB2b2lkIG1haW4oKSB7XG4gICAgICB2ZWMzIG9yaWdpbkNvbG9yID0gaDJyZ2IoIGlUaW1lIC8gMTAuICk7XG4gICAgICBnbF9GcmFnQ29sb3IgPSAoIGdldFRleHR1cmUoIGJhc2VUZXh0dXJlICkgKyB2ZWM0KCAxLjAgKSAqIGdldFRleHR1cmUoIGJsb29tVGV4dHVyZSApICk7XG4gICAgfWBcbiAgfVxuXG4gIHNoaW5pbmcgKHBvcykge1xuICAgIGxldCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSggNCwgNjQsIDY0IClcbiAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgY29sb3I6ICcjRUZFRTAwJywgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9IClcbiAgICBsZXQgc3BoZXJlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgIHNwaGVyZS5wb3NpdGlvbi5zZXQocG9zLngsIHBvcy55ICsgMTAsIHBvcy56KVxuICAgIFdvcmxkLnNjZW5lLmFkZCggc3BoZXJlIClcbiAgICBzcGhlcmUubmFtZSA9ICdzaGluZSdcbiAgICBzcGhlcmUubGF5ZXJzLmVuYWJsZSgxKVxuXG4gICAgdmFyIHNjYWxlS0YgPSBuZXcgVEhSRUUuVmVjdG9yS2V5ZnJhbWVUcmFjayggJy5zY2FsZScsIFsgMCwgMC41LCAxLCAxLjUsIDJdLCBbIDAuNywgMC43LCAwLjcsIDEuMiwgMS4yLCAxLjIsIDAuOCwgMC44LCAwLjgsIDEuMiwgMS4yLCAxLjIsIDAsIDAsIDBdICk7XG4gICAgdmFyIGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcCggJ0FjdGlvbicsIDMsIFsgc2NhbGVLRiBdIClcbiAgICBCbG9vbS5taXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlciggc3BoZXJlICk7XG4gICAgdmFyIGNsaXBBY3Rpb24gPSBCbG9vbS5taXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAgLy8gY2xpcEFjdGlvbi5zZXRMb29wKCBUSFJFRS5Mb29wT25jZSApXG4gICAgLy8gY2xpcEFjdGlvbi5wbGF5KCk7XG5cbiAgICAvLyBCbG9vbS5taXhlci5hZGRFdmVudExpc3RlbmVyKCAnZmluaXNoZWQnLCAoIGUgKSA9PiB7IFxuICAgIC8vICAgc3BoZXJlLnZpc2libGUgPSBmYWxzZVxuICAgIC8vIH0pO1xuXG4gICAgcmV0dXJuIHNwaGVyZTtcbiAgfVxuXG4gIHJlbW92ZUVudGl0eShvYmplY3QpIHtcbiAgICB2YXIgc2VsZWN0ZWRPYmplY3QgPSBXb3JsZC5zY2VuZS5nZXRPYmplY3RCeU5hbWUob2JqZWN0Lm5hbWUpO1xuICAgIFdvcmxkLnNjZW5lLnJlbW92ZSggc2VsZWN0ZWRPYmplY3QgKTtcbiAgICAvLyBhbmltYXRlKCk7XG59XG5cbiAgc2V0Qmxvb21QYXNzICgpIHtcbiAgICBsZXQgYmxvb21QYXNzID0gbmV3IFRIUkVFLlVucmVhbEJsb29tUGFzcyhuZXcgVEhSRUUuVmVjdG9yMih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KSwgMC41LCAwLjEsIDAuMDUpXG5cbiAgICBibG9vbVBhc3MudGhyZXNob2xkID0gMDtcbiAgICBibG9vbVBhc3Muc3RyZW5ndGggPSAxMDtcbiAgICBibG9vbVBhc3MucmFkaXVzID0gMTtcblxuICAgIHRoaXMuYmxvb21Db21wb3NlciA9IG5ldyBUSFJFRS5FZmZlY3RDb21wb3NlcihXb3JsZC5yZW5kZXJlcik7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlclRhcmdldDEudGV4dHVyZS5mb3JtYXQgPSBUSFJFRS5SR0JBRm9ybWF0O1xuICAgIHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXJUYXJnZXQyLnRleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIucmVuZGVyVG9TY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCB3aW5kb3cuaW5uZXJIZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbylcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIuYWRkUGFzcyggdGhpcy5yZW5kZXJTY2VuZSApO1xuICAgIHRoaXMuYmxvb21Db21wb3Nlci5hZGRQYXNzKCBibG9vbVBhc3MgKTtcblxuICAgIHJldHVybiB0aGlzLmJsb29tQ29tcG9zZXJcbiAgfVxuXG4gIHNldEZpbmFsUGFzcyAoKSB7XG4gICAgbGV0IGZpbmFsUGFzcyA9IG5ldyBUSFJFRS5TaGFkZXJQYXNzKFxuICAgICAgbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcbiAgICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgICAvLyBpVGltZTogV29ybGQudGltZSxcbiAgICAgICAgICBiYXNlVGV4dHVyZToge3ZhbHVlOiBudWxsfSxcbiAgICAgICAgICBibG9vbVRleHR1cmU6IHt2YWx1ZTogdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlclRhcmdldDIudGV4dHVyZX1cbiAgICAgICAgfSxcbiAgICAgICAgdmVydGV4U2hhZGVyOiB0aGlzLnZlcnRleFNoYWRlcigpLFxuICAgICAgICBmcmFnbWVudFNoYWRlcjogdGhpcy5mcmFnbWVudFNoYWRlcigpLFxuICAgICAgICBkZWZpbmVzOiB7fVxuICAgICAgfSksICdiYXNlVGV4dHVyZSdcbiAgICApO1xuXG4gICAgbGV0IGZpbmFsQ29tcG9zZXIgPSBuZXcgVEhSRUUuRWZmZWN0Q29tcG9zZXIoIFdvcmxkLnJlbmRlcmVyKTtcbiAgICBmaW5hbENvbXBvc2VyLnJlbmRlclRhcmdldDEuZm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDtcbiAgICBmaW5hbENvbXBvc2VyLnJlbmRlclRhcmdldDIuZm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDtcbiAgICBmaW5hbENvbXBvc2VyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoICogd2luZG93LmRldmljZVBpeGVsUmF0aW8sIHdpbmRvdy5pbm5lckhlaWdodCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgZmluYWxDb21wb3Nlci5hZGRQYXNzKCB0aGlzLnJlbmRlclNjZW5lICk7XG4gICAgZmluYWxDb21wb3Nlci5hZGRQYXNzKCBmaW5hbFBhc3MgKTtcbiAgICBmaW5hbENvbXBvc2VyLm5lZWRzU3dhcCA9IHRydWVcblxuICAgIHJldHVybiBmaW5hbENvbXBvc2VyXG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgQmxvb20iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5pbXBvcnQgeyBTY3JlZW5Ub1dvcmxkIH0gZnJvbSAnLi4vdXRpbC9UcmFuc2Zvcm1BbGV4J1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuLi9vYmplY3QvU3ByaXRlJzsgICAgICAgICAgICAgICAgICAgIC8vIHNwcml0ZVxuY2xhc3MgR2F0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgXG4gIC8qKlxuICAgKiBoYW5kbGUgZHJhZyBhbmQgY2xpY2sgZG93biBldmVudCwgYW5kIHBpY3R1cmUgd2lsbCB0cmFuc2Zvcm0gdG8gc3ByaXRlXG4gICAqIFxuICAgKiBAcGFyYW0geyBkb21FbGVtZW50IH0gZWwgICAgIHBhcmVudCBlbGVtZW50XG4gICAqIEBwYXJhbSB7IGV2ZW50IH0gZSAgICAgICAgICAgd2luZG93IGV2ZW50XG4gICAqL1xuICBjcmVhdGVHYXRlIChlbCwgZSwgc3ByaXRlTGlzdCkge1xuICAgIGlmIChlLnRhcmdldCAmJiAoZS50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0lNRycpKSB7XG4gICAgICAvLyBnZXQgaW1nIHNyY1xuICAgICAgbGV0IHNyYyA9IGUudGFyZ2V0LnNyYy5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAvLyBnYXRlRWwgLT4gZGl2IC0+IGltZ1xuICAgICAgbGV0IGltZyA9IGVsLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdXG4gICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgIC8vIHBpY3R1cmUgd2lsbCBwb3NpdGlvbiBhdCB0aGUgbW91c2UgY2VudGVyXG4gICAgICBsZXQgZGl2WCA9IGV2ZW50LmNsaWVudFggLSBpbWcub2Zmc2V0V2lkdGggLyAyXG4gICAgICBsZXQgZGl2WSA9IGV2ZW50LmNsaWVudFkgLSBpbWcub2Zmc2V0SGVpZ2h0IC8gMlxuICAgICAgXG4gICAgICBib3guc3JjID0gYC4vc3RhdGljLyR7c3JjfWBcbiAgICAgIGJveC5zdHlsZS53aWR0aCA9ICcyMHB4J1xuICAgICAgYm94LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgYm94LnN0eWxlLmxlZnQgPSBkaXZYICsgJ3B4J1xuICAgICAgYm94LnN0eWxlLnRvcCA9IGRpdlkgKyAncHgnXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJveClcbiAgICAgIFxuICAgICAgLy8gd2hlbiBtb3VzZSBtb3ZlLCBnYXRlIHBpY3R1cmUgcGxlYXNlIGZvbGxvdyBteSBoYW5kXG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudFxuICAgICAgICBsZXQgZGl2WCA9IGV2ZW50LmNsaWVudFggLSBpbWcub2Zmc2V0V2lkdGggLyAyXG4gICAgICAgIGxldCBkaXZZID0gZXZlbnQuY2xpZW50WSAtIGltZy5vZmZzZXRIZWlnaHQgLyAyXG4gICAgICAgIGJveC5zdHlsZS5sZWZ0ID0gZGl2WCArICdweCdcbiAgICAgICAgYm94LnN0eWxlLnRvcCA9IGRpdlkgKyAncHgnXG4gICAgICB9XG5cbiAgICAgIC8vIHdoZW4gbW91c2UgY2xpY2ssIGdhdGUgcGljdHVyZSBwbGVhc2UgYnJlYWtpbmcgdGhlIGRpbWVuc2lvblxuICAgICAgYm94Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbFxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJveClcbiAgICAgICAgbGV0IG5ld1NjcmVlbiA9IFNjcmVlblRvV29ybGQoe3g6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFl9KVxuXG4gICAgICAgIC8vIGNyZWF0ZSBnYXRlIHNwcml0ZVxuICAgICAgICB0aGlzLmNyZWF0ZVJlYWxHYXRlKG5ld1NjcmVlbiwgYm94LnNyYylcbiAgICAgICAgc3ByaXRlTGlzdC5wdXNoKG1lc2gpXG4gICAgICAgIC8vIHRvZG86IHRleHRcblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVJlYWxHYXRlIChjb29yZCwgc3JjKSB7XG4gICAgLy8gY3JlYXRlIGdhdGUgc3ByaXRlXG4gICAgbGV0IHNwcml0ZSA9IG5ldyBTcHJpdGUoKVxuICAgIGxldCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKDEyLCA3LCA4KVxuICAgIGxldCBtZXNoID0gc3ByaXRlLmNyZWF0ZVBpYyhzcmMsIHNjYWxlKVxuICAgIG1lc2gucG9zaXRpb24ueCA9IGNvb3JkLnhcbiAgICBtZXNoLnBvc2l0aW9uLnkgPSAxMFxuICAgIG1lc2gucG9zaXRpb24ueiA9IC1jb29yZC55XG4gICAgV29ybGQubWFpbkdyb3VwLmNoaWxkcmVuW1dvcmxkLm1haW5Hcm91cC51c2VyRGF0YS52aXNpYmxlXS5hZGQobWVzaClcbiAgfVxuXG4gIGNyZWF0ZUxldml0YXRlQm94IChzY3JlZW5BbGV4KSB7XG4gICAgdmFyIGxldml0YXRlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZpY2VfX3BvcHBlci0td3JhcCcpXG4gICAgaWYgKHNjcmVlbkFsZXgpIHtcbiAgICAgIHZhciBobCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hvcml6b250YWwtbGluZScpWzBdXG4gICAgICB2YXIgbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1idXR0b24nKVswXVxuICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsIGZhbHNlKVxuICAgICAgaGwuc3R5bGUud2lkdGggPSAnMHB4J1xuICAgICAgLy8gaWYgKCFjb21tdW5pdHlEYXRhLnNlbGYpIHtcbiAgICAgIC8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHVsbC1yaWdodCcpWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIC8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHVsbC1sZWZ0JylbMF0uc3R5bGUubWFyZ2luUmlnaHQgPSAnMHB4J1xuICAgICAgLy8gICBsaW5lLmlubmVySFRNTCA9ICcnXG4gICAgICAvLyB9XG4gICAgICB2YXIgd3kgPSBzY3JlZW5BbGV4LnkgLSAxNzJcbiAgICAgIHZhciB3eCA9IHNjcmVlbkFsZXgueCAtIDEwMFxuICAgICAgaWYgKHd4IDwgMCApIHtcbiAgICAgICAgd3ggPSAwXG4gICAgICB9XG4gICAgICBpZiAod3kgPCAwKSB7XG4gICAgICAgIGlmICgod3ggKyAxMTQ+IHNjcmVlbkFsZXgueCkgJiYgMTUwID4gc2NyZWVuQWxleC55KSB7XG4gICAgICAgICAgaGwuc3R5bGUudG9wID0gc2NyZWVuQWxleC55ICsgJ3B4J1xuICAgICAgICAgIGhsLnN0eWxlLnJpZ2h0ID0gLTI0ICsgJ3B4J1xuICAgICAgICAgIGhsLnN0eWxlLndpZHRoID0gMjIgKyAncHgnXG4gICAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScsIHRydWUpXG4gICAgICAgICAgd3ggLT0gNDRcbiAgICAgICAgfVxuICAgICAgICB3eSA9IDBcbiAgICAgIH1cbiAgICAgIGxldml0YXRlbi5zdHlsZS50b3AgPSB3eSArICdweCdcbiAgICAgIGxldml0YXRlbi5zdHlsZS5sZWZ0ID0gd3ggKyAncHgnXG4gICAgICBsZXZpdGF0ZW4uc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICB9IGVsc2Uge1xuICAgICAgbGV2aXRhdGVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhdGUiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4uL29iamVjdC9TcHJpdGUnXG4vKipcbiAqIEBkZXNjIOWcsOWbvuexu1xuICogQHBhcmFtcyBzaGFwZSDlvaLnirZcbiAqIEBwYXJhbXMgb3B0aW9ucyDmnZDotKjlr7nosaFcbiAqL1xuY2xhc3MgTWFwIHtcbiAgY29uc3RydWN0b3IobW9kZSkge1xuICAgIHRoaXMubW9kZSA9IG1vZGVcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBUSFJFRS5TVkdMb2FkZXIoKVxuICB9XG5cbiAgLy8g5Yib5bu65Yeg5L2V5L2TXG4gIGNyZWF0ZUdlb21ldHJ5KCkge1xuICAgIHJldHVybiBuZXcgVEhSRUUuR2VvbWV0cnkoKVxuICB9XG5cbiAgLy8g5Yib5bu65ouJ5Ly45Yeg5L2V5L2TXG4gIGNyZWF0ZUV4dHJ1ZGVHZW9tZXRyeShzaGFwZSkge1xuICAgIHJldHVybiBuZXcgVEhSRUUuRXh0cnVkZUJ1ZmZlckdlb21ldHJ5KHNoYXBlLCB7XG4gICAgICBkZXB0aDogNSxcbiAgICAgIGJldmVsRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGJldmVsVGhpY2tuZXNzOiAxLjUsXG5cdCAgICBiZXZlbFNpemU6IDEsXG5cdCAgICBiZXZlbFNlZ21lbnRzOiA1XG4gICAgfSlcbiAgfVxuXG4gIC8vIOWIm+W7uuadkOi0qFxuICBjcmVhdGVNYXRlcmlhbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbChvcHRpb25zKVxuICB9XG5cbiAgLy8g5Yib5bu6572R5qC8XG4gIGNyZWF0ZU1lc2goc2hhcGUsIG9wdGlvbnMsIG5hbWUpIHtcbiAgICBsZXQgZ2VvID0gdGhpcy5jcmVhdGVHZW9tZXRyeSgpXG4gICAgbGV0IGV4dHJ1ZGVHZW8gPSB0aGlzLmNyZWF0ZUV4dHJ1ZGVHZW9tZXRyeShzaGFwZSlcbiAgICBnZW8uZnJvbUJ1ZmZlckdlb21ldHJ5KGV4dHJ1ZGVHZW8pXG4gICAgZ2VvLnRyYW5zbGF0ZSgtMjkwLCAtMjE0LCAwKVxuICAgIGxldCBtYXQgPSB0aGlzLmNyZWF0ZU1hdGVyaWFsKG9wdGlvbnMsIG5hbWUpXG4gICAgbGV0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgICBtZXNoLm5hbWUgPSBuYW1lXG4gICAgcmV0dXJuIG1lc2hcbiAgfVxuXG4gIGluaXRUZW1wbGF0ZSh1cmwsIGNhbGxiYWNrLCBhc3luY0NiID0gKCkgPT4ge30pIHtcbiAgICB0aGlzLmxvYWRlci5sb2FkKHVybCwgZGF0YSA9PiB7XG4gICAgICBsZXQgcGF0aHMgPSBkYXRhLnBhdGhzXG4gICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICBsZXQgc2hhcGVzID0gcGF0aC50b1NoYXBlcyh0cnVlKVxuICAgICAgICBzaGFwZXMuZm9yRWFjaChzaGFwZSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2socGF0aCwgc2hhcGUpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgYXN5bmNDYihudWxsKVxuICAgIH0pXG4gIH1cblxuICBsb2FkTWFwKGl0ZW0sIGdyb3VwLCBjYWxsYmFjaykge1xuICAgIFxuICAgIGNvbnN0IG9yaWdpblBvc2l0aW9uID0gKGl0ZW0uZmxvb3IgLSAyKSAqIDEyMCAtIDYwXG5cbiAgICB0aGlzLmluaXRUZW1wbGF0ZShpdGVtLnVybCwgKHBhdGgsIHNoYXBlKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogcGF0aC5jb2xvcixcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IGdyb3VwLnBvc2l0aW9uLnkgPiAxODAgfHwgZ3JvdXAucG9zaXRpb24ueSA8IC0xODAgPyAwIDogMSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZVxuICAgICAgfVxuXG4gICAgICBsZXQgbWVzaCA9IHRoaXMuY3JlYXRlTWVzaChzaGFwZSwgb3B0aW9ucywgJ3N0b3JlJylcbiAgICAgIG1lc2gucm90YXRpb24uc2V0KDAuNSAqIE1hdGguUEksIDAsIDApXG4gICAgICBtZXNoLnVzZXJEYXRhLm9yaWdpblBvc2l0aW9uID0gb3JpZ2luUG9zaXRpb25cbiAgICAgIG1lc2gudXNlckRhdGEuY29sb3IgPSB7XG4gICAgICAgIHI6IG1lc2gubWF0ZXJpYWwuY29sb3IucixcbiAgICAgICAgZzogbWVzaC5tYXRlcmlhbC5jb2xvci5nLFxuICAgICAgICBiOiBtZXNoLm1hdGVyaWFsLmNvbG9yLmJcbiAgICAgIH1cblxuICAgICAgZ3JvdXAuYWRkKG1lc2gpXG5cbiAgICB9LCBjYWxsYmFjaylcbiAgICBncm91cC5wb3NpdGlvbi55ID0gb3JpZ2luUG9zaXRpb25cbiAgfVxuXG4gIC8vIGJvYXJkXG4gIGxvYWRQbGFuZShpdGVtLCBncm91cCwgcGxhbmVMaXN0KSB7XG4gICAgY29uc3Qgb3JpZ2luUG9zaXRpb24gPSAoaXRlbS5mbG9vciAtIDIpICogMTIwIC0gNjVcbiAgICBncm91cC51c2VyRGF0YS5wb3NpdGlvblkgPSBvcmlnaW5Qb3NpdGlvblxuICAgIGdyb3VwLnVzZXJEYXRhLnBvc2l0aW9uWiA9IGdyb3VwLnBvc2l0aW9uLnpcbiAgICB0aGlzLmluaXRUZW1wbGF0ZSgnLi9zdGF0aWMvMTQuc3ZnJywgKHBhdGgsIHNoYXBlKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogdGhpcy5tb2RlID8gJyNBQUFDQjInIDogJyMxYTQyNWUnLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgLy8gb3BhY2l0eTogMC4zXG4gICAgICAgIG9wYWNpdHk6IGdyb3VwLnBvc2l0aW9uLnkgPiAxODAgfHwgZ3JvdXAucG9zaXRpb24ueSA8IC0xODAgPyAwIDogMC4zXG4gICAgICB9XG4gICAgICBcbiAgICAgIGxldCBtZXNoID0gdGhpcy5jcmVhdGVNZXNoKHNoYXBlLCBvcHRpb25zLCAncGxhbmUnKVxuICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoMC41ICogTWF0aC5QSSwgMCwgMClcbiAgICAgIG1lc2gucG9zaXRpb24ueSA9IC01XG4gICAgICBtZXNoLnVzZXJEYXRhID0ge1xuICAgICAgICBvcmlnaW5Qb3NpdGlvbjogb3JpZ2luUG9zaXRpb24sXG4gICAgICAgIGdyb3VwSW5mbzogaXRlbVxuICAgICAgfVxuICAgICAgcGxhbmVMaXN0LnB1c2gobWVzaClcbiAgICAgIGdyb3VwLmFkZChtZXNoKVxuICAgICAgb3B0aW9ucy5vcGFjaXR5ID8gZ3JvdXAudXNlckRhdGEuaXNTaG93ID0gdHJ1ZSA6IGdyb3VwLnVzZXJEYXRhLmlzU2hvdyA9IGZhbHNlXG4gICAgfSlcbiAgfVxuICBcblxuICAvLyBnYXRlIHNwcml0ZVxuICBjcmVhdGVHYXRlTG9nbyhsb2dvLCBncm91cCkge1xuICAgIGNvbnN0IHNwcml0ZSA9IG5ldyBTcHJpdGUoKVxuICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgIG9wYWNpdHk6IDBcbiAgICB9XG4gICAgY29uc3Qgc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygyMCwgMTIsIDE1KVxuICAgIGxldCBtZXNoID0gc3ByaXRlLmNyZWF0ZVBpYyhsb2dvLCBzY2FsZSwgb3B0aW9uKVxuICAgIGdyb3VwLmFkZChtZXNoKVxuICB9XG5cbiAgLy8gdGV4dCBzcHJpdGVcbiAgY3JlYXRlRmxvb3JOYW1lKG5hbWUsIGdyb3VwKSB7XG4gICAgY29uc3QgZm9udFNpemUgPSAzMFxuICAgIGxldCBzcHJpdGUgPSBuZXcgU3ByaXRlKClcbiAgICBsZXQgb3B0aW9uID0ge1xuICAgICAgb3BhY2l0eTogZ3JvdXAucG9zaXRpb24ueSA+IDE4MCB8fCBncm91cC5wb3NpdGlvbi55IDwgLTE4MCA/IDAgOiAxXG4gICAgfVxuICAgIGxldCBtZXNoID0gc3ByaXRlLmNyZWF0ZVRleHQobmFtZSwgZm9udFNpemUsIG9wdGlvbilcbiAgICBncm91cC5hZGQobWVzaClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXA7IiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuXG5jbGFzcyBSYXljYXN0ZXJ7XG5cbiAgY29uc3RydWN0b3IgKGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgfVxuXG4gIGhhbmRsZUV2ZW50IChyYXlMaXN0LCBjYWxsYmFjaywgZW1wdHlDYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgY29uc3QgbW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpXG4gICAgY29uc3QgY29udGFpbmVyID0gV29ybGQucmVuZGVyZXIuZG9tRWxlbWVudFxuICBcbiAgICBtb3VzZS54ID0gKHRoaXMuZXZlbnQuY2xpZW50WCAvIGNvbnRhaW5lci5jbGllbnRXaWR0aCkgKiAyIC0gMVxuICAgIG1vdXNlLnkgPSAtICh0aGlzLmV2ZW50LmNsaWVudFkgLyBjb250YWluZXIuY2xpZW50SGVpZ2h0KSAqIDIgKyAxXG4gICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShtb3VzZSwgV29ybGQuY2FtZXJhKVxuICAgIFxuICAgIGxldCBpbnRlcnNlY3RzID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhyYXlMaXN0KVxuICAgIGlmIChpbnRlcnNlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrKGludGVyc2VjdHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVtcHR5Q2FsbGJhY2soKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYXljYXN0ZXIiLCIvKipcbiAqIENyZWF0ZSBhbGwga2luZHMgb2YgU3ByaXRlXG4gKiBcbiAqIEBjbGFzcyAgICAgICAgICAgICAgICAgICAgIFNwcml0ZVxuICogQGNvbnN0cnVjdG9yICAgICAgICAgICAgICAgaW5pdCB2YXJpYWJsZVxuICovXG5jbGFzcyBTcHJpdGUge1xuICBcbiAgY29uc3RydWN0b3IgKCkge31cblxuICAvKipcbiAgICAqIGNyZWF0ZSB0ZXh0IHNwcml0ZVxuICAgICogXG4gICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0ZXh0ICAgICAgICAgICAgIHRleHQgd2lsbCBiZSBmaWxsZWRcbiAgICAqIEBwYXJhbSB7IE51bWJlciB9IGZvbnRTaXplICAgICAgICAgZm9udCBzaXplXG4gICAgKiBAcGFyYW0geyBPYmplY3QgfSBleHRyYU9wdGlvbiAgICAgIHNvbWUgZXh0cmEgbWF0ZXJpYWwgb3B0aW9uXG4gICAgKiBAcmV0dXJuIHsgT2JqZWN0IH0gICAgICAgICAgICAgICAgIHNwcml0ZSBtZXNoXG4gICAgKi9cbiAgY3JlYXRlVGV4dCAodGV4dCwgZm9udFNpemUsIGV4dHJhT3B0aW9uKSB7XG4gICAgY29uc3QgZGVwdGggPSAxMDAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW1lcmEgZGVwdGhcbiAgICBjb25zdCBzY2FsZSA9IGRlcHRoICogKCgxIC8gNTApICogZm9udFNpemUpICAgICAgIC8vIGNhbnZhcyBzY2FsZSByYXRpb1xuICAgIC8vIGNyZWF0ZSBhIGNhbnZhc1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMud2lkdGggPSBmb250U2l6ZSAqIDMyXG5cbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnXG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArIFwicHggJ+W+rui9r+mbhem7kSdcIlxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMilcblxuICAgIC8vIGNyZWF0ZSB0ZXh0dXJlXG4gICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpXG4gICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWUgIC8vIHRleHR1cmUgbWF0cml4IGNhbiBiZSBtYW51YWwgdXBkYXRlXG5cbiAgICAvLyBjcmVhdGUgdGV4dCBzcHJpdGUgb2JqZWN0XG4gICAgbGV0IG9wdGlvbiA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFwOiB0ZXh0dXJlLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsIFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICB9LCBleHRyYU9wdGlvbilcbiAgICBsZXQgc3ByaXRlID0gdGhpcy5fY3JlYXRlU3ByaXRlKG9wdGlvbilcbiAgICBcbiAgICBzcHJpdGUubmFtZSA9ICd0ZXh0J1xuICAgIHNwcml0ZS5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSlcbiAgICBzcHJpdGUucG9zaXRpb24uc2V0KC0yOTEsIDEwLCAwKVxuICAgIHJldHVybiBzcHJpdGVcbiAgfVxuXG4gIC8qKlxuICAgICogY3JlYXRlIHRleHQgc3ByaXRlXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7IFN0cmluZyB9IHBpY1VybCAgICAgICAgICAgICBwaWN0cnVlIHdpbGwgYmUgbG9hZFxuICAgICogQHBhcmFtIHsgT2JqZWN0IH0gZXh0cmFPcHRpb24gICAgICAgIHNvbWUgZXh0cmEgbWF0ZXJpYWwgb3B0aW9uXG4gICAgKiBAcmV0dXJuIHsgT2JqZWN0IH0gICAgICAgICAgICAgICAgICAgc3ByaXRlIG1lc2hcbiAgICAqL1xuICBjcmVhdGVQaWMgKHBpY1VybCwgc2NhbGUsIGV4dHJhT3B0aW9uKSB7XG4gICAgaWYgKCFleHRyYU9wdGlvbikge1xuICAgICAgZXh0cmFPcHRpb24gPSB7b3BhY2l0eTogMX1cbiAgICB9XG4gICAgbGV0IG9wdGlvbiA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFwOiBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQocGljVXJsKSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLCBcbiAgICAgIGRlcHRoVGVzdDogZmFsc2VcbiAgICB9LCBleHRyYU9wdGlvbilcbiAgICBsZXQgc3ByaXRlID0gdGhpcy5fY3JlYXRlU3ByaXRlKG9wdGlvbilcbiAgICBcbiAgICBzcHJpdGUubmFtZSA9ICdmbGFnJ1xuICAgIHNwcml0ZS5zY2FsZS5zZXQoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueilcbiAgICBzcHJpdGUucG9zaXRpb24uc2V0KDAsIDEwLCAwKVxuICAgIFxuICAgIHJldHVybiBzcHJpdGVcbiAgfVxuXG4gIC8qKlxuICAgICogY3JlYXRlIGdlbmVyYWwgc3ByaXRlXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAgICAgICAgICAgICAgbWF0ZXJpYWwgT3B0aW9uXG4gICAgKiBAcmV0dXJuIHsgM2RPYmplY3QgfSAgICAgICAgICAgICAgIG1hdGVyaWFsIE9iamVjdFxuICAgICovXG4gIF9jcmVhdGVTcHJpdGUgKG9iaikge1xuICAgIGxldCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbChvYmopXG4gICAgbGV0IHNwcml0ZSA9IG5ldyBUSFJFRS5TcHJpdGUobWF0ZXJpYWwpXG4gICAgcmV0dXJuIHNwcml0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZSIsIi8vIGltcG9ydCB7IGhvdXNlRGF0YSB9IGZyb20gJy4uL2RhdGEvSG91c2UnICAgICAgICAgICAgICAgICAvLyBtYXAgZGF0YVxuaW1wb3J0IE1hcERvbSBmcm9tICcuLi9odG1sL01hcERvbSdcbmltcG9ydCBNYXBTdHlsZSBmcm9tICcuLi9odG1sL01hcFN0eWxlJ1xuLy8gM0QgT2JqZWN0XG5pbXBvcnQgTWFwIGZyb20gJy4uL29iamVjdC9NYXAnICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gM0QgbWFwXG5pbXBvcnQgR2F0ZSBmcm9tICcuLi9vYmplY3QvR2F0ZScgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2F0ZVxuaW1wb3J0IFJheWNhc3RlciBmcm9tICcuLi9vYmplY3QvUmF5Y2FzdGVyJyAgICAgICAgICAgICAgIC8vIHJheWNhc3RlclxuaW1wb3J0IEJsb29tIGZyb20gJy4uL29iamVjdC9CbG9vbScgICAgICAgICAgICAgICAgICAgICAgIC8vIGJsb29tIHNoaW5pbmdcbi8vIGFuaW1hdGVcbmltcG9ydCBUcmFja0Zsb29yIGZyb20gJy4uL2FuaW1hdGlvbi9UcmFja0Zsb29yJyAgICAgICAgICAvLyB1cCAmIGRvd24gYW5pbWF0ZVxuaW1wb3J0IFR3ZWVuRmxvb3IgZnJvbSAnLi4vYW5pbWF0aW9uL1R3ZWVuRmxvb3InICAgICAgICAgIC8vIGNoYW5nZSBmbG9vclxuaW1wb3J0IFN0YXRlQSBmcm9tICcuLi9zdGF0ZS9GbG9vcicgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwICYgZG93biBzdGF0ZVxuXG5jb25zdCBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXN5bmNocm9ub3VzXG4vKipcbiAqIE1lbWJlclxuICogcHJpdmF0ZTogX2hlbGxvXG4gKiBwdWJsaWM6IGhlbGxvXG4gKiBzdGF0aWM6IGdldCBoZWxsbygpe31cbiAqL1xuXG5jb25zdCBtb2RlID0gcGFyc2VJbnQoZ2V0UXVlcnlWYXJpYWJsZSgnbW9kZScpKVxuY29uc3QgZmxvb3JMaXN0ID0gWyBcbiAgeyBuYW1lOiAxIH0sXG4gIHsgbmFtZTogMiB9LFxuICB7IG5hbWU6IDMgfSxcbiAgeyBuYW1lOiA0IH1cbl1cbmxldCBob3VzZURhdGEgPSBbXTtcbi8vIGNvbnN0IGhvdXNlRGF0YSA9IFt7XG4vLyAgIGZsb29yOiAxLFxuLy8gICB1cmw6ICcuL3N0YXRpYy8xMC5zdmcnLFxuLy8gICBuYW1lOiAnRjEwJ1xuLy8gfSx7XG4vLyAgIGZsb29yOiAyLFxuLy8gICB1cmw6ICcuL3N0YXRpYy8xMS5zdmcnLFxuLy8gICBuYW1lOiAnRjExJ1xuLy8gfSx7XG4vLyAgIGZsb29yOiAzLFxuLy8gICB1cmw6ICcuL3N0YXRpYy8xMi5zdmcnLFxuLy8gICBuYW1lOiAnRjEyJ1xuLy8gfSx7XG4vLyAgIGZsb29yOiA0LFxuLy8gICB1cmw6ICcuL3N0YXRpYy8xMy5zdmcnLFxuLy8gICBuYW1lOiAnRjEzJyxcbi8vICAgZ2F0ZUFycjogW3tcbi8vICAgICBsb2dvOiAnL3N0YXRpYy9jYW1lcmEtaW5zaWRlLnBuZydcbi8vICAgfV1cbi8vIH1dXG5cbmZ1bmN0aW9uIGdldFF1ZXJ5VmFyaWFibGUodmFyaWFibGUpIHtcbiAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG4gIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICBmb3IgKHZhciBpPTA7aTx2YXJzLmxlbmd0aDtpKyspIHtcbiAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgIGlmKHBhaXJbMF0gPT0gdmFyaWFibGUpe3JldHVybiBwYWlyWzFdO31cbiAgfVxuICByZXR1cm4oZmFsc2UpO1xufVxuXG4vKipcbiAqIOS4iuW4neexu++8jOWumuS5ieekvue+pOWSjOmmlumhteS4reeahOWFqOmDqOaWueazlVxuICogXG4gKiBAY2xhc3MgV29ybGRcbiAqIEBwYXJhbSB7IE51bWJlciB9IG1vZGUgICDlnLrmma/mqKHlvI9cbiAqIEBwYXJhbURlc2MgbW9kZSAgICAgICAgICAwOiDpppbpobUsIDE6IOekvue+pFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZCB7XG4gIGNvbnN0cnVjdG9yIChtb2RlKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZVxuICAgIHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKVxuICAgIHRoaXMuZ2F0ZURhdGEgPSBbXVxuICAgIHRoaXMuY29sb3JEYXRhID0gW11cbiAgfVxuXG4gIC8vIOiHqueEtueOr+Wig+WGheeahOaJgOacieaIkOWRmO+8jOWFgeiuuOWcqOS7u+S9leexu+S4reiiq+S/ruaUuVxuICBnZXQgc2NlbmUoKSB7IHJldHVybiB0aGlzLnNjZW5lIH1cbiAgc2V0IHNjZW5lKHZhbCkgeyB0aGlzLnNjZW5lID0gdmFsIH1cblxuICBnZXQgY2FtZXJhKCkgeyByZXR1cm4gdGhpcy5jYW1lcmEgfVxuICBzZXQgY2FtZXJhKHZhbCkgeyB0aGlzLmNhbWVyYSA9IHZhbCB9XG5cbiAgZ2V0IHJlbmRlcmVyKCkgeyByZXR1cm4gdGhpcy5yZW5kZXJlciB9XG4gIHNldCByZW5kZXJlcih2YWwpIHsgdGhpcy5yZW5kZXJlciA9IHZhbCB9XG5cbiAgZ2V0IG1haW5Hcm91cCgpIHsgcmV0dXJuIHRoaXMubWFpbkdyb3VwfVxuICBzZXQgbWFpbkdyb3VwKHZhbCkgeyB0aGlzLm1haW5Hcm91cCA9IHZhbCB9XG5cbiAgZ2V0IHN0YXR1cygpIHsgcmV0dXJuIHRoaXMuc3RhdHVzIH1cbiAgc2V0IHN0YXR1cyh2YWwpIHsgdGhpcy5zdGF0dXMgPSB2YWwgfVxuXG4gIGdldCBjb250cm9scygpIHsgcmV0dXJuIHRoaXMuY29udHJvbHMgfVxuICBzZXQgY29udHJvbHModmFsKSB7IHRoaXMuY29udHJvbHMgPSB2YWwgfVxuXG4gIGdldCBsYXllcnMoKSB7IHJldHVybiB0aGlzLmxheWVycyB9XG4gIHNldCBsYXllcnModmFsKSB7IHRoaXMubGF5ZXJzID0gdmFsIH1cblxuICBnZXQgdGltZSgpIHsgcmV0dXJuIHRoaXMudGltZSB9XG4gIHNldCB0aW1lKHZhbCkgeyB0aGlzLnRpbWUgPSB2YWwgfVxuXG4gIC8vIGluaXQgc2NlbmVcbiAgaW5pdCgpIHtcblxuICAgIHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAgICAgICAgICAgICAgICAgICAgICAgIC8vIOeUu+W4g+WuvVxuICAgIHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICAgICAgICAgICAgICAgICAgICAgIC8vIOeUu+W4g+mrmFxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbnZhc+eUu+W4g+WuueWZqFxuICAgIHRoaXMucGxhbmVMaXN0ID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvYXJkIGxpc3QgZm9yIHJheWNhc3RlclxuICAgIHRoaXMuc3ByaXRlTGlzdCA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNwcml0ZSBsaXN0IGZvciByYXljYXN0ZXJcbiAgICB0aGlzLnNoaW5pbmdMaXN0ID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hpbmluZyBsaXN0XG5cbiAgICAvLyBjcmVhdGUgc2NlbmVcbiAgICBXb3JsZC5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgLy8gV29ybGQuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcignI0FBQUFBQScpXG5cbiAgICAvLyBjcmVhdGUgY2FtZXJhXG4gICAgY29uc3QgQ0FNX1BPUyA9IG5ldyBUSFJFRS5WZWN0b3IzKDcwMCwgNDUwLCAxMjAwKVxuICAgIFdvcmxkLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgzMCwgdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0LCAxLCAxMDAwMClcbiAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24uc2V0KENBTV9QT1MueCwgQ0FNX1BPUy55LCBDQU1fUE9TLnopXG4gICAgV29ybGQuY2FtZXJhLnVzZXJEYXRhLnBvc2l0aW9uID0gQ0FNX1BPUyAgICAgICAgICAgICAgLy8g5aSH5Lu955u45py65Yid5aeL5L2N572u5YC8XG5cbiAgICAvLyBjcmVhdGUgcmVuZGVyZXJcbiAgICBXb3JsZC5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIGFscGhhOiB0cnVlXG4gICAgfSlcbiAgICBXb3JsZC5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxuICAgIFdvcmxkLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAvLyBXb3JsZC5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAvLyBXb3JsZC5yZW5kZXJlci50b25lTWFwcGluZyA9IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmc7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoV29ybGQucmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIFdvcmxkLm1haW5Hcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpICAgICAgICAgICAgICAgICAgIC8vIOWVhuWcuuaAu+WIhue7hFxuICAgIFdvcmxkLm1haW5Hcm91cC5wb3NpdGlvbi55ID0gLTMwXG4gICAgV29ybGQubGF5ZXJzID0gbmV3IFRIUkVFLkxheWVycygpXG4gICAgV29ybGQubGF5ZXJzLnNldCgwKVxuICAgIFdvcmxkLnN0YXR1cyA9ICdtdWx0aScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWIneWni+WMluWcuuaZr+eKtuaAgVxuXG4gICAgLy8g5p6E5bu6546v5aKDXG4gICAgdGhpcy5jcmVhdGVDb250cm9scygpXG4gICAgdGhpcy5jcmVhdGVMaWdodCgpXG4gICAgLy8gdGhpcy5jcmVhdGVBbGV4KClcbiAgICB0aGlzLmV2ZW50Q29sbGVjdGlvbigpXG5cbiAgICAvLyDliJ3lp4vljJZUd2VlbkZsb29y57G7IC0g5YiH5o2i5qW85bGC5Yqo55S7XG4gICAgdGhpcy50d2VlbkZsb29yID0gbmV3IFR3ZWVuRmxvb3IoKVxuICAgIC8vIOWHuuWFpeWPo+exu1xuICAgIHRoaXMuZ2F0ZSA9IG5ldyBHYXRlKClcbiAgICBcbiAgICAvLyDliJ3lp4vljJZtYXDnsbsgLSDmr4/kuIDlsYLkuK3nmoTmiYDmnInlhYPntKBcbiAgICB0aGlzLm1hcCA9IG5ldyBNYXAodGhpcy5tb2RlKVxuICAgIHRoaXMuYnVpbGRpbmdSaXNlKClcblxuICAgIC8vIOmXqueCuemAmumBk1xuICAgIHRoaXMuYmxvb20gPSBuZXcgQmxvb20oKVxuICAgIHRoaXMuYmxvb21Db21wb3NlciA9IHRoaXMuYmxvb20uc2V0Qmxvb21QYXNzKClcbiAgICB0aGlzLmZpbmFsQ29tcG9zZXIgPSB0aGlzLmJsb29tLnNldEZpbmFsUGFzcygpXG4gICAgaWYgKCF0aGlzLm1vZGUpIHtcbiAgICAgIGxldCBzaGluZSA9IHRoaXMuYmxvb20uc2hpbmluZyh7XG4gICAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiA0MDAgLSAyMDAsXG4gICAgICAgIHk6IDE4MCxcbiAgICAgICAgejogTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMFxuICAgICAgfSlcbiAgICAgIHRoaXMuc2hpbmluZ0xpc3QucHVzaChzaGluZSlcbiAgICB9XG4gICAgLy8gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgLy8gfSwgMjAwMClcblxuICAgIC8vIFRyYWNrRmxvb3LnsbsgLSDkuIrkuIvmpbzliqjnlLtcbiAgICB0aGlzLmFuaW1hdGVGbG9vciA9IG5ldyBUcmFja0Zsb29yKClcbiAgICB0aGlzLmFuaW1hdGVGbG9vci5pbml0KGhvdXNlRGF0YSlcblxuICAgIHRoaXMuYW5pbWF0ZSgpXG4gIH1cblxuICAvLyDliJvlu7rml7bpl7TmtYFcbiAgYW5pbWF0ZSgpIHtcbiAgICBUV0VFTi51cGRhdGUoKVxuXG4gICAgdmFyIGRlbHRhID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuXG4gICAgaWYgKEJsb29tLm1peGVyKSB7XG4gICAgICBCbG9vbS5taXhlci51cGRhdGUoIGRlbHRhICk7XG4gICAgfVxuXG4gICAgaWYgKFN0YXRlQS51cCkgdGhpcy51cEZsb29yKClcbiAgICBpZiAoU3RhdGVBLmRvd24pIHRoaXMuZG93bkZsb29yKClcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGUoKVxuICAgIH0pXG4gICAgV29ybGQucmVuZGVyZXIucmVuZGVyKFdvcmxkLnNjZW5lLCBXb3JsZC5jYW1lcmEpXG4gICAgLy8g5riy5p+T6Zeq54K5XG4gICAgV29ybGQuY2FtZXJhLmxheWVycy5zZXQoMSk7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlcigpO1xuICAgIFdvcmxkLmNhbWVyYS5sYXllcnMuc2V0KDApO1xuICAgIC8vIOa4suafk+aVtOS4quWcuuaZr++8jOWwhuimhuebluWcqGJsb29t6YCa6YGT5LiKXG4gICAgdGhpcy5maW5hbENvbXBvc2VyLnJlbmRlcigpXG5cbiAgICBXb3JsZC5jb250cm9scy51cGRhdGUoKVxuICB9XG5cbiAgLy8gY3JlYXRlIG1hbGxcbiAgYnVpbGRpbmdSaXNlKCkge1xuICAgIC8vIGFzeW5j77yaQWZ0ZXIgYWxsIHRoZSBwaWN0dXJlcyBhcmUgbG9hZGVkLCB0aGUgY29uZmlndXJhdGlvbiBtb2RlIG1ldGhvZCBpcyBleGVjdXRlZC5cbiAgICBhc3luYy5lYWNoKGhvdXNlRGF0YSwgKGl0ZW0sIGNiKSA9PiB7XG4gICAgICBsZXQgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgZ3JvdXBcbiAgICAgIGdyb3VwLm5hbWUgPSBpdGVtLmZsb29yXG4gICAgICBncm91cC51c2VyRGF0YS5mbG9vciA9IGl0ZW0uZmxvb3IgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgb3JpZ2luYWwgZmxvb3IgaW4gdXNlcmRhdGFcbiAgICAgIGdyb3VwLnVzZXJEYXRhLmR5bmFtaWNGbG9vciA9IGl0ZW0uZmxvb3IgICAgICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBkeW5hbWljIGZsb29y77yaY2hhbmdlIHdpdGggdXAmZG93biBhbmltYXRpb25cbiAgICAgIGdyb3VwLnVzZXJEYXRhLm5hbWUgPSBpdGVtLmZsb29yICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgb2JqZWN0LWdyb3VwIG5hbWVcblxuICAgICAgdGhpcy5tYXAubG9hZE1hcChpdGVtLCBncm91cCwgY2IpXG4gICAgICB0aGlzLm1hcC5sb2FkUGxhbmUoaXRlbSwgZ3JvdXAsIHRoaXMucGxhbmVMaXN0KVxuICAgICAgdGhpcy5tYXAuY3JlYXRlRmxvb3JOYW1lKGl0ZW0ubmFtZSwgZ3JvdXApXG4gICAgICBpZiAoaXRlbS5nYXRlQXJyKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpbiBkYXRhIGdhdGVBcnJcbiAgICAgICAgaXRlbS5nYXRlQXJyLmZvckVhY2goZ2F0ZSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXAuY3JlYXRlR2F0ZUxvZ28oZ2F0ZS5sb2dvLCBncm91cClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgV29ybGQubWFpbkdyb3VwLmFkZChncm91cClcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLl9tb2RlRGlmZkhhbmRsZSgpXG4gICAgICBXb3JsZC5zY2VuZS5hZGQoV29ybGQubWFpbkdyb3VwKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gdXNlIGFzIGJ1aWxkUmlzZSgpXG4gIF9tb2RlRGlmZkhhbmRsZSAoKSB7XG4gICAgLy8gaWYgbW9kZSBpcyBhc3NvY2lhdGlvbiwgdGhlbiBmaXJzdCBzY2VuZSBzdGF0dXMgaXMgc2luZ2xlXG4gICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgdGhpcy5jaGFuZ2VGbG9vcigxKVxuICAgIH0gXG4gIH1cblxuICAvLyBnbyB1cCAtIHNpbmdsZSBmcmFtZVxuICB1cEZsb29yKCkge1xuICAgIGNvbnN0IGhpZ2ggPSBTdGF0ZUEuY291bnQgKyAzXG4gICAgY29uc3QgbG93ID0gU3RhdGVBLmNvdW50IC0gMVxuICAgIHRoaXMuYW5pbWF0ZUZsb29yLnVwKGhpZ2gsIGxvdywgV29ybGQubWFpbkdyb3VwKVxuICB9XG5cbiAgLy8gZ28gZG93biAtIHNpbmdsZSBmcmFtZVxuICBkb3duRmxvb3IoKSB7XG4gICAgY29uc3QgaGlnaCA9IFN0YXRlQS5jb3VudCArIDRcbiAgICBjb25zdCBsb3cgPSBTdGF0ZUEuY291bnRcbiAgICB0aGlzLmFuaW1hdGVGbG9vci5kb3duKGhpZ2gsIGxvdywgV29ybGQubWFpbkdyb3VwKVxuICB9XG5cbiAgLy8gc3dpdGNo77yacyAtIG1cbiAgc2luZ2xlVG9NdWx0aSgpIHtcbiAgICB0aGlzLnR3ZWVuRmxvb3Iuc2luZ2xlVG9NdWx0aSgpXG4gIH1cblxuICAvLyBzd2l0Y2g6IHMgLSBzXG4gIHNpbmdsZVRvU2luZ2xlKGZsb29yKSB7XG4gICAgdGhpcy50d2VlbkZsb29yLnNpbmdsZVRvU2luZ2xlKGZsb29yLCB0aGlzLm1vZGUpXG4gIH1cblxuICAvLyBzd2l0Y2g6IG0gLSBzXG4gIG11bHRpVG9TaW5nbGUoaW50ZXJzZWN0KSB7XG4gICAgXG4gICAgLy8g5riF6Zmk6Zeq54K5XG4gICAgdGhpcy5zaGluaW5nTGlzdC5mb3JFYWNoKCgpID0+IHtcbiAgICAgIGxldCBzaGluZSA9IFdvcmxkLnNjZW5lLmdldE9iamVjdEJ5TmFtZSgnc2hpbmUnKTtcbiAgICAgIFdvcmxkLnNjZW5lLnJlbW92ZSggc2hpbmUgKTtcbiAgICB9KVxuICAgIHRoaXMudHdlZW5GbG9vci5tdWx0aVRvU2luZ2xlKGludGVyc2VjdCwgdGhpcy5tb2RlKVxuICB9XG5cbiAgLy8gc3dpdGNoOiB0byBzaW5nbGUsIDIgcG9zaXRpb24sIGZyb20gbXVsdGksIGZyb20gc2luZ2xlXG4gIGNoYW5nZUZsb29yKGZsb29yKSB7XG4gICAgaWYgKFdvcmxkLnN0YXR1cyA9PT0gJ211bHRpJykge1xuICAgICAgdGhpcy5tdWx0aVRvU2luZ2xlKGZsb29yKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpbmdsZVRvU2luZ2xlKGZsb29yKVxuICAgIH1cbiAgfVxuXG4gIC8vIHN3aXRjaDogdG8gc2luZ2xlLCBmcm9tIG11bHRpIGFuZCByYXljYXN0ZXJcbiAgb25Eb2N1bWVudE1vdXNlQ2xpY2soZXZlbnQpIHtcblxuICAgIGxldCByYXljYXN0ZXIgPSBuZXcgUmF5Y2FzdGVyKGV2ZW50KVxuICAgIGxldCByYXlMaXN0ID0gW10gLy8gcmF5Y2FzdGVyIGZpZWxkXG4gICAgXG4gICAgaWYgKFdvcmxkLnN0YXR1cyA9PT0gJ211bHRpJykge1xuXG4gICAgICByYXlMaXN0ID0gdGhpcy5wbGFuZUxpc3Quc2xpY2UoU3RhdGVBLmNvdW50LCBTdGF0ZUEuY291bnQgKyA0KVxuICAgICAgcmF5Y2FzdGVyLmhhbmRsZUV2ZW50KHJheUxpc3QsIChpbnRlcnNlY3RzKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlUb1NpbmdsZShpbnRlcnNlY3RzWzBdKVxuICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIGxldCBzY3JlZW5BbGV4ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH1cbiAgICAgIHJheUxpc3QgPSB0aGlzLnNwcml0ZUxpc3RcbiAgICAgIHJheWNhc3Rlci5oYW5kbGVFdmVudChyYXlMaXN0LCAoaW50ZXJzZWN0cykgPT4ge1xuXG4gICAgICAgIHRoaXMuZ2F0ZS5jcmVhdGVMZXZpdGF0ZUJveChzY3JlZW5BbGV4KVxuXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldmljZV9fcG9wcGVyLS13cmFwJylcbiAgICAgICAgdmFyIGJveExlZnQgPSBib3gub2Zmc2V0TGVmdFxuICAgICAgICB2YXIgYm94UmlnaHQgPSBib3gub2Zmc2V0V2lkdGggKyBib3gub2Zmc2V0TGVmdFxuICAgICAgICB2YXIgYm94VG9wID0gYm94Lm9mZnNldFRvcFxuICAgICAgICB2YXIgYm94Qm90dG9tID0gYm94Lm9mZnNldEhlaWdodCArIGJveC5vZmZzZXRUb3BcbiAgXG4gICAgICAgIGlmIChldmVudC5jbGllbnRYIDwgYm94TGVmdCB8fFxuICAgICAgICAgIGV2ZW50LmNsaWVudFggPiBib3hSaWdodCB8fFxuICAgICAgICAgIGV2ZW50LmNsaWVudFkgPCBib3hUb3AgfHxcbiAgICAgICAgICBldmVudC5jbGllbnRZID4gYm94Qm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLmdhdGUuY3JlYXRlTGV2aXRhdGVCb3goKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG9uV2luZG93UmVzaXplICgpIHtcbiAgICB2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIFdvcmxkLmNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICBXb3JsZC5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIFdvcmxkLnJlbmRlcmVyLnNldFNpemUoIHdpZHRoLCBoZWlnaHQgKTtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIuc2V0U2l6ZSggd2lkdGgsIGhlaWdodCApO1xuICAgIHRoaXMuZmluYWxDb21wb3Nlci5zZXRTaXplKCB3aWR0aCwgaGVpZ2h0ICk7XG4gIH1cblxuICAvLyBjcmVhdGUgb3JiaXQgY29udHJvbHNcbiAgY3JlYXRlQ29udHJvbHMoKSB7XG4gICAgV29ybGQuY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhXb3JsZC5jYW1lcmEsIFdvcmxkLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gICAgV29ybGQuY29udHJvbHMuZW5hYmxlWm9vbSA9IHRydWVcbiAgICBXb3JsZC5jb250cm9scy5lbmFibGVSb3RhdGUgPSB0cnVlXG4gICAgV29ybGQuY29udHJvbHMuc2NyZWVuU3BhY2VQYW5uaW5nID0gdHJ1ZVxuICAgIC8vIHNhdmUgdGhlIHN0YXJ0IHN0YXR1cyBvZiBvYmplY3QsIHRoZW4gY2FtZXJhIGFuaW1hdGlvbiB3aWxsIGtub3cgYSByZWZlcmVuY2UgdmFsdWUgXG4gICAgV29ybGQuY29udHJvbHMuc2F2ZVN0YXRlKCk7XG4gIH1cblxuICAvLyBjcmVhdGUgbGlnaHRcbiAgY3JlYXRlTGlnaHQoKSB7XG4gICAgLy8gd2FybSBsaWdodFxuICAgIGxldCBBbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjIpO1xuICAgIFdvcmxkLnNjZW5lLmFkZChBbWJpZW50TGlnaHQpO1xuICAgIC8vIHNreSBsaWdodFxuICAgIGxldCBsaWdodCA9IG5ldyBUSFJFRS5IZW1pc3BoZXJlTGlnaHQoMHhmZmZmZmYsIDB4MDAwMDAwLCAwLjkpO1xuICAgIFdvcmxkLnNjZW5lLmFkZChsaWdodCk7XG4gIH1cblxuICBjcmVhdGVBbGV4KCkge1xuICAgIGxldCBheGVzSGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoMTAwKTtcbiAgICBXb3JsZC5zY2VuZS5hZGQoYXhlc0hlbHBlcik7XG4gIH1cblxuICByZWNlaXZlR2F0ZUluZm8gKGRhdGEpIHtcbiAgICB0aGlzLmdhdGVEYXRhID0gZGF0YVxuICAgIHRoaXMuZ2F0ZURhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09IDApIHtcbiAgICAgICAgaXRlbS5zcmMgPSAnLi9zdGF0aWMvY2FtZXJhLWluc2lkZS5wbmcnXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gMSkge1xuICAgICAgICBpdGVtLnNyYyA9ICcuL3N0YXRpYy9jYW1lcmEtb3V0c2lkZS5wbmcnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnNyYyA9ICcuL3N0YXRpYy9jYW1lcmEtcG9zdC5wbmcnXG4gICAgICB9XG4gICAgICB0aGlzLmdhdGUuY3JlYXRlUmVhbEdhdGUoaXRlbS5jb29yZCwgaXRlbS5zcmMpXG4gICAgfSlcbiAgfVxuXG4gIHJlY2VpdmVDb2xvckluZm8gKGRhdGEpIHtcbiAgICB0aGlzLmNvbG9yRGF0YSA9IGRhdGFcbiAgICB0aGlzLmNvbG9yRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgV29ybGQubWFpbkdyb3VwLmNoaWxkcmVuW2l0ZW0uZmxvb3ItMV0uY2hpbGRyZW4uZm9yRWFjaCgobWVzaCwgdmFsKSA9PiB7XG4gICAgICAgIGlmIChwYXJzZUludCh2YWwpID09PSBwYXJzZUludChpdGVtLm1lc2hObykpIHtcbiAgICAgICAgICBtZXNoLm1hdGVyaWFsLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCcjZmYwMDAwJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZXZlbnRDb2xsZWN0aW9uKCkge1xuICAgIGNvbnN0IHVwZmxvb3JFbDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLXVsJylcbiAgICBpZiAodGhpcy5tb2RlID09PSAwKSB7XG5cbiAgICAgIGlmIChob3VzZURhdGEubGVuZ3RoID4gNCkge1xuICAgICAgICBjb25zdCB1cGZsb29yRWwgPSB1cGZsb29yRWwyLmNoaWxkTm9kZXNbNV1cbiAgICAgICAgdXBmbG9vckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGlmIChXb3JsZC5zdGF0dXMgPT09ICdtdWx0aScpIFxuICAgICAgICAgICAgdGhpcy5hbmltYXRlRmxvb3IuYmVmb3JlVXAoKVxuICAgICAgICB9LCBmYWxzZSlcblxuICAgICAgICBjb25zdCBkb3duZmxvb3JFbCA9IHVwZmxvb3JFbDIuY2hpbGROb2Rlc1s3XVxuICAgICAgICBkb3duZmxvb3JFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoV29ybGQuc3RhdHVzID09PSAnbXVsdGknKVxuICAgICAgICAgICAgdGhpcy5hbmltYXRlRmxvb3IuYmVmb3JlRG93bigpXG4gICAgICAgIH0sIGZhbHNlKVxuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBhbGxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKVxuICAgICAgYWxsRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChXb3JsZC5zdGF0dXMgPT09ICdzaW5nbGUnKSBcbiAgICAgICAgICB0aGlzLnNpbmdsZVRvTXVsdGkoKVxuICAgICAgfSwgZmFsc2UpXG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2F0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhdGUtZ3JvdXAnKVxuICAgICAgZ2F0ZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5nYXRlLmNyZWF0ZUdhdGUoZ2F0ZUVsLCBlLCB0aGlzLnNwcml0ZUxpc3QpXG4gICAgICB9LCBmYWxzZSlcbiAgICB9XG4gICAgXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlQ2xpY2soZXZlbnQpXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZShldmVudClcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBjb25zdCBmbG9vciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9vcicpXG4gICAgZmxvb3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBJykge1xuICAgICAgICB0aGlzLmNoYW5nZUZsb29yKHBhcnNlSW50KGUudGFyZ2V0LmlubmVySFRNTCkpXG4gICAgICB9XG4gICAgfSwgZmFsc2UpXG4gIH1cbn1cblxuaWYgKG1vZGUgPT09IDEpIHtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnXG4gIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgIGNtZDogXCJhc3NvY2lhdGUtbG9hZF9zaWduYWxcIlxuICB9LCAnKicpO1xufWVsc2Uge1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmQgPSAncmdiKDI4LCAyOSwgNDUpJ1xuICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICBjbWQ6IFwiaG9tZS1sb2FkX3NpZ25hbFwiXG4gIH0sICcqJyk7XG59XG5cbnZhciB3b3JsZDtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICgpID0+IHtoYW5kbGVNZXNzYWdlKGV2ZW50KX0pO1xuXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlIChldmVudCkge1xuICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgc3dpdGNoIChkYXRhLmNtZCkge1xuICAgIGNhc2UgXCJtYXBfZGF0YVwiOlxuICAgICAgaG91c2VEYXRhID0gZGF0YS5kYXRhXG4gICAgICBuZXcgTWFwRG9tKG1vZGUsIGZsb29yTGlzdClcbiAgICAgIG5ldyBNYXBTdHlsZShtb2RlKVxuICAgICAgd29ybGQgPSBuZXcgV29ybGQobW9kZSlcbiAgICAgIHdvcmxkLmluaXQoKVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImdhdGVfZGF0YVwiOlxuICAgICAgd29ybGQucmVjZWl2ZUdhdGVJbmZvKGRhdGEuZGF0YSlcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb2xvcl9kYXRhXCI6XG4gICAgICB3b3JsZC5yZWNlaXZlQ29sb3JJbmZvKGRhdGEuZGF0YSlcbiAgICAgIGJyZWFrO1xuICB9XG59IiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi91dGlsL2V2ZW50J1xuXG4vKipcbiAqIEEgRlNNXG4gKiBcbiAqIEBjbGFzcyBXb3JsZFxuICogQHBhcmFtIHsgM0QgT2JqZWN0IH0gZ3JvdXAgICAgIFxuICovXG5jbGFzcyBTdGF0ZUEge1xuICBjb25zdHJ1Y3RvciAoZ3JvdXApIHtcbiAgICB0aGlzLmdyb3VwID0gZ3JvdXBcbiAgfVxuXG4gIC8vIHN0YXRlOiB1cCBmbG9vciBpbmcuLi5cbiAgZ2V0IHVwICgpIHsgcmV0dXJuIHRoaXMudXAgfVxuICBzZXQgdXAgKHZhbCkgeyB0aGlzLnVwID0gdmFsIH1cblxuICAvLyBzdGF0ZTogZG93biBmbG9vciBpbmcuLi5cbiAgZ2V0IGRvd24gKCkgeyByZXR1cm4gdGhpcy5kb3duIH1cbiAgc2V0IGRvd24gKHZhbCkgeyB0aGlzLmRvd24gPSB2YWx9XG5cbiAgLy8gc3RhbmRhcmQgZmxvb3IgY291bnRcbiAgLy8gZ2V0IGZsb29yQ291bnQgKCkgeyByZXR1cm4gdGhpcy5mbG9vckNvdW50IH1cbiAgLy8gc2V0IGZsb29yQ291bnQgKG9iaikgeyB0aGlzLmZsb29yQ291bnQgPSBvYmogfVxuXG4gIC8vIGR5bmFtaWMgZmxvb3IgY291bnRcbiAgZ2V0IGNvdW50ICgpIHsgcmV0dXJuIHRoaXMuY291bnQgfVxuICBzZXQgY291bnQgKHZhbCkgeyB0aGlzLmNvdW50ID0gdmFsIH1cblxuICBpbml0IChob3VzZURhdGEpIHtcbiAgICBTdGF0ZUEudXAgPSBmYWxzZVxuICAgIFN0YXRlQS5kb3duID0gZmFsc2VcbiAgICB0aGlzLmZsb29yQ291bnQgPSB0aGlzLl9nZXRVcERvd25GbG9vckNvdW50KHRoaXMuZ3JvdXApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIFN0YXRlQS5jb3VudCA9IHRoaXMuc3RhbmRhcmRDb3VudCA9IHRoaXMuZmxvb3JDb3VudC5wb3NpdGlvblxuICAgIHRoaXMuZmxvb3JDb3VudC5kb3duID0gdGhpcy5zdGFuZGFyZENvdW50IC0gKHRoaXMuZmxvb3JDb3VudC5kb3duIC0gMSlcbiAgICB0aGlzLmZsb29yQ291bnQudXAgPSB0aGlzLnN0YW5kYXJkQ291bnQgKyAodGhpcy5mbG9vckNvdW50LnVwIC0gMSlcbiAgICB0aGlzLm1pbkZsb29yID0gdGhpcy5fY2FjdWxhdGVNaW51c0luZGV4KGhvdXNlRGF0YSlcbiAgfVxuXG4gIHVwQmVnaW4gKCkge1xuICAgIGlmICggU3RhdGVBLmNvdW50ID4gMCAmJiAhU3RhdGVBLnVwICYmICFTdGF0ZUEuZG93biApIHtcbiAgICAgIFN0YXRlQS51cCA9IHRydWVcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KCd1cFRyaWdnZXInKVxuICAgIH1cbiAgfVxuXG4gIGRvd25CZWdpbiAoKSB7XG4gICAgaWYgKCBTdGF0ZUEuY291bnQgKyA0IDw9IHRoaXMuZmxvb3JDb3VudC51cCAmJiAhU3RhdGVBLmRvd24gJiYgIVN0YXRlQS51cCApIHtcbiAgICAgIFN0YXRlQS5kb3duID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHVwRW5kICgpIHtcbiAgICBTdGF0ZUEudXAgPSBmYWxzZVxuICAgIFN0YXRlQS5jb3VudC0tXG4gIH1cblxuICBkb3duRW5kICgpIHtcbiAgICBTdGF0ZUEuZG93biA9IGZhbHNlXG4gICAgU3RhdGVBLmNvdW50ICsrXG4gIH1cblxuICBfZ2V0VXBEb3duRmxvb3JDb3VudChncm91cCkge1xuICAgIHZhciBkb3duRmxvb3JDb3VudCA9IDA7XG4gICAgdmFyIHVwRmxvb3JDb3VudCA9IDA7XG4gICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5mbG9vciA8IDApIHtcbiAgICAgICAgZG93bkZsb29yQ291bnQgKz0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBGbG9vckNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgZG93bjogZG93bkZsb29yQ291bnQsXG4gICAgICB1cDogdXBGbG9vckNvdW50XG4gICAgfVxuICB9XG5cbiAgX2NhY3VsYXRlTWludXNJbmRleChhcnIpIHtcbiAgICB2YXIgbWluRmxvb3IgPSAxMDAwXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0uZmxvb3IgPCBtaW5GbG9vciAmJiBhcnJbaV0uZmxvb3IgPiAwKSB7XG4gICAgICAgIG1pbkZsb29yID0gYXJyW2ldLmZsb29yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWluRmxvb3JcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZUEiLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG4vLyB0b2RvOiBsZWdhY3kgdmVyc2lvbiBubyBjb25zaWRlcmF0aW9uIG9mIGRlcHRoIGNoYW5nZSwgSSBuZWVkIGEgbmV3IGZ1bmN0aW9uXG5mdW5jdGlvbiBTY3JlZW5Ub1dvcmxkIChzY3JlZW5Qb2ludCkge1xuXG4gICAgLy8g6I635Y+W5bGP5bmV5Z2Q5qCH5oqV5b2x5Zyo55u45py65LiK55qEeOWSjHnovbTnmoTlgLxcbiAgICBsZXQgcFggPSAoc2NyZWVuUG9pbnQueCAvIHdpbmRvdy5pbm5lcldpZHRoKSAqIDIgLSAxXG4gICAgbGV0IHBZID0gLShzY3JlZW5Qb2ludC55IC8gd2luZG93LmlubmVySGVpZ2h0KSAqIDIgKyAxXG4gICAgLy8gbGV0IHAgPSBuZXcgVEhSRUUuVmVjdG9yMyhwWCwgcFksIC0xKS51bnByb2plY3QoY2FtZXJhKTtcbiAgICAvLyBzZXQgdmVjdG9yMlxuICAgIC8vIGxldCBwMiA9IG5ldyBUSFJFRS5WZWN0b3IyKHBYLCBwWSk7XG4gICAgLy8gZ2V0IHotZGVwdGhcbiAgICBsZXQgemQgPSBXb3JsZC5jYW1lcmEucG9zaXRpb24ueSArIDYwIC0gMTBcbiAgICAvLyBnZXQgY2FtZXJhIGFuZ2xlICgxODAtMzApLzJcbiAgICBsZXQgemEgPSA3NSAqIE1hdGguUEkgLyAxODBcbiAgICAvLyDojrflj5bkuJbnlYzlnZDmoIfkuK3nmoR46L206L6555WMXG4gICAgbGV0IGJ4ID0gKHpkIC8gTWF0aC50YW4oemEpKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAvLyDojrflj5bkuJbnlYzlnZDmoIfkuK3nmoR56L206L6555WMXG4gICAgbGV0IGJ5ID0gemQgLyBNYXRoLnRhbih6YSlcbiAgICAvLyDojrflj5bkuJbnlYzlnZDmoIfkuK146L2055qE5a6e6ZmF5Z2Q5qCH54K5XG4gICAgbGV0IHN4ID0gcFggKiBieFxuICAgIC8vIOiOt+WPluS4lueVjOWdkOagh+S4rXnovbTnmoTlrp7pmYXlnZDmoIfngrlcbiAgICBsZXQgc3kgPSBwWSAqIGJ5XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogc3gsXG4gICAgICB5OiBzeVxuICAgIH1cbn1cblxuXG5leHBvcnQgeyBTY3JlZW5Ub1dvcmxkIH0iLCJjbGFzcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge31cbiAgfVxuICBcbiAgb24gKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9ldmVudHNbZXZlbnRdIHx8IFtdXG4gICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG4gICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGNhbGxiYWNrc1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvZmYgKGV2ZW50LGNhbGxiYWNrKXtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBjYWxsYmFja3MgJiYgY2FsbGJhY2tzLmZpbHRlcihmbiA9PiBmbiAhPT0gY2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGVtaXQgKC4uLmFyZ3Mpe1xuICAgIGNvbnN0IGV2ZW50ID0gYXJnc1swXVxuICAgIGNvbnN0IHBhcmFtcyA9IFtdLnNsaWNlLmNhbGwoYXJncywgMSlcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgY2FsbGJhY2tzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkodGhpcywgcGFyYW1zKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gIFxuICBvbmNlIChldmVudCxjYWxsYmFjayl7XG4gICAgbGV0IHdyYXBGdW5jID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcyxhcmdzKVxuICAgICAgICB0aGlzLm9mZihldmVudCx3cmFwRnVuYylcbiAgICB9XG4gICAgdGhpcy5vbihldmVudCx3cmFwRnVuYylcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlciJdLCJzb3VyY2VSb290IjoiIn0=