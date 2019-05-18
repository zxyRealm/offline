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
    value: function init() {
      this.stateA = new _state_Floor__WEBPACK_IMPORTED_MODULE_1__["default"](_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup);
      this.stateA.init();
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
            cy: group.position.y
          });
          var target = Object.assign(_this.options.cameraOrigin, {
            cy: group.userData.positionY
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
        r: 0.59,
        g: 0.59,
        b: 0.59 // two way to single : click button, click board

      };

      if (_typeof(intersect) === 'object') {
        key = 'name';
        value = intersect.object.parent.name;
      } else {
        key = 'floor';
        value = intersect;
      }

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
            _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.set(0, 800, 0);
            group.position.y = 200;
          } else {
            var position = Object.assign(_this2.options.cameraCurrent, {
              cy: group.position.y
            });
            var target = Object.assign(_this2.options.cameraSport, {
              cy: 200
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

      var color = {
        r: 0.59,
        g: 0.59,
        b: 0.59
      };
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].controls.target.copy(_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.position);
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].status = 'single';
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children.forEach(function (group, val) {
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
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.visible = val;
          group.visible = true;
          group.position.y = 200;
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
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x - 500,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y + 400,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z - 850
        },
        cameraSportX: {
          x: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.x - 500,
          y: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y + 400,
          z: _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.z - 1000
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

/***/ "./src/data/House.js":
/*!***************************!*\
  !*** ./src/data/House.js ***!
  \***************************/
/*! exports provided: houseData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "houseData", function() { return houseData; });
var houseData = [{
  floor: 1,
  url: './static/ceng.svg',
  name: 'B1'
}, {
  floor: 2,
  url: './static/ceng.svg',
  name: 'B2'
}, {
  floor: 3,
  url: './static/ceng.svg',
  name: 'B3'
}, {
  floor: 4,
  url: './static/ceng.svg',
  name: 'F1',
  gateArr: [{
    logo: '/static/camera-inside.png'
  }]
}, {
  floor: 5,
  url: './static/ceng.svg',
  name: 'F2'
}];

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
      var geometry = new THREE.SphereGeometry(3, 32, 32);
      var material = new THREE.MeshBasicMaterial({
        color: '#EFEE00',
        side: THREE.DoubleSide
      });
      var sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.rotation.x = -0.5 * Math.PI;
      _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].scene.add(sphere);
      sphere.name = 'shine';
      sphere.layers.enable(1);
      var scaleKF = new THREE.VectorKeyframeTrack('.scale', [0, 0.5, 1, 1.5, 2], [0.5, 0.5, 0.5, 1.2, 1.2, 1.2, 0.8, 0.8, 0.8, 1.2, 1.2, 1.2, 0.5, 0.5, 0.5]);
      var clip = new THREE.AnimationClip('Action', 3, [scaleKF]);
      Bloom.mixer = new THREE.AnimationMixer(sphere);
      var clipAction = Bloom.mixer.clipAction(clip); // clipAction.setLoop( THREE.LoopOnce )

      clipAction.play(); // Bloom.mixer.addEventListener( 'finished', ( e ) => { 
      //   sphere.visible = false
      // });
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
      var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.1, 0.05); // bloomPass.threshold = 0;
      // bloomPass.strength = 0.65;
      // bloomPass.radius = 2.5;

      bloomPass.threshold = 0;
      bloomPass.strength = 25;
      bloomPass.radius = 1.6;
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

          var sprite = new _object_Sprite__WEBPACK_IMPORTED_MODULE_2__["default"]();
          var scale = new THREE.Vector3(12, 7, 8);
          var mesh = sprite.createPic(box.src, scale);
          mesh.position.x = newScreen.x;
          mesh.position.y = 10;
          mesh.position.z = -newScreen.y;
          _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.children[_scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].mainGroup.userData.visible].add(mesh);
          spriteList.push(mesh); // todo: text
        };
      }
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
  function Map() {
    _classCallCheck(this, Map);

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
        bevelEnabled: false
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
      this.initTemplate('./static/bottom.svg', function (path, shape) {
        var options = {
          color: '#1a425e',
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
/* harmony import */ var _data_House__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/House */ "./src/data/House.js");
/* harmony import */ var _object_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../object/Map */ "./src/object/Map.js");
/* harmony import */ var _object_Gate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object/Gate */ "./src/object/Gate.js");
/* harmony import */ var _object_Raycaster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../object/Raycaster */ "./src/object/Raycaster.js");
/* harmony import */ var _object_Bloom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../object/Bloom */ "./src/object/Bloom.js");
/* harmony import */ var _animation_TrackFloor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation/TrackFloor */ "./src/animation/TrackFloor.js");
/* harmony import */ var _animation_TweenFloor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation/TweenFloor */ "./src/animation/TweenFloor.js");
/* harmony import */ var _state_Floor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../state/Floor */ "./src/state/Floor.js");
/* harmony import */ var _util_Compile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/Compile */ "./src/util/Compile.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/event */ "./src/util/event.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // map data
// 3D Object

 // 3D map

 // gate

 // raycaster

 // bloom shining
// animate

 // up & down animate

 // change floor

 // up & down state
// util

 // dom compile



var async = __webpack_require__(/*! async */ "./node_modules/_async@1.5.2@async/lib/async.js"); // asynchronous

/**
 * Member
 * private: _hello
 * public: hello
 * static: get hello(){}
 */

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

      this.domCompile(); // compile dom in html
      // create scene

      World.scene = new THREE.Scene(); // World.scene.background = new THREE.Color('#AAAAAA')
      // create camera

      var CAM_POS = new THREE.Vector3(500, 400, 1000);
      World.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
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
      // gamma矫正，表现出来的效果是光晕的大小，人眼真实感增强
      // World.renderer.gammaInput = true;
      // World.renderer.gammaOutput = true;

      this.container.appendChild(World.renderer.domElement);
      World.mainGroup = new THREE.Group(); // 商场总分组

      World.layers = new THREE.Layers();
      World.layers.set(0);
      World.status = 'multi'; // 初始化场景状态
      // 构建环境

      this.createControls();
      this.createLight(); // this.createShine({x: 0, y: 0, z: 0 })

      this.eventCollection(); // 初始化TweenFloor类 - 切换楼层动画

      this.tweenFloor = new _animation_TweenFloor__WEBPACK_IMPORTED_MODULE_6__["default"](); // 出入口类

      this.gate = new _object_Gate__WEBPACK_IMPORTED_MODULE_2__["default"](); // 初始化map类 - 每一层中的所有元素

      this.map = new _object_Map__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.buildingRise(); // 闪点通道

      this.bloom = new _object_Bloom__WEBPACK_IMPORTED_MODULE_4__["default"]();
      this.bloomComposer = this.bloom.setBloomPass();
      this.finalComposer = this.bloom.setFinalPass(); // setInterval(() => {

      this.bloom.shining({
        x: Math.random() * 400 - 200,
        y: 180,
        z: Math.random() * 200 - 100
      }); // }, 2000)
      // TrackFloor类 - 上下楼动画

      this.animateFloor = new _animation_TrackFloor__WEBPACK_IMPORTED_MODULE_5__["default"]();
      this.animateFloor.init();
      this.animate();
    } // 创建时间流

  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      TWEEN.update();
      var delta = this.clock.getDelta();

      if (_object_Bloom__WEBPACK_IMPORTED_MODULE_4__["default"].mixer) {
        _object_Bloom__WEBPACK_IMPORTED_MODULE_4__["default"].mixer.update(delta);
      }

      if (_state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].up) this.upFloor();
      if (_state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].down) this.downFloor();
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
      async.each(_data_House__WEBPACK_IMPORTED_MODULE_0__["houseData"], function (item, cb) {
        var group = new THREE.Group(); // create group

        group.name = item.name;
        group.userData.floor = item.floor; // Store the original floor in userdata

        group.userData.dynamicFloor = item.floor; // Store the dynamic floor：change with up&down animation

        group.userData.name = item.name; // Store the object-group name

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
      var high = _state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count + 3;
      var low = _state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count - 1;
      this.animateFloor.up(high, low, World.mainGroup);
    } // go down - single frame

  }, {
    key: "downFloor",
    value: function downFloor() {
      var high = _state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count + 4;
      var low = _state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count;
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

      var raycaster = new _object_Raycaster__WEBPACK_IMPORTED_MODULE_3__["default"](event);
      var rayList = []; // raycaster field

      if (World.status === 'multi') {
        rayList = this.planeList.slice(_state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count, _state_Floor__WEBPACK_IMPORTED_MODULE_7__["default"].count + 4);
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
    key: "eventCollection",
    value: function eventCollection() {
      var _this4 = this;

      var upfloorEl = document.getElementById('upfloor');
      var downfloorEl = document.getElementById('downfloor');
      var floor = document.getElementById('floor');
      var allEl = document.getElementById('all');
      var gateEl = document.getElementById('gate-group');
      window.addEventListener('mousedown', function () {
        _this4.onDocumentMouseClick(event);
      }, false);
      upfloorEl.addEventListener('click', function () {
        _this4.animateFloor.beforeUp();
      }, false);
      downfloorEl.addEventListener('click', function () {
        _this4.animateFloor.beforeDown();
      }, false);
      allEl.addEventListener('click', function () {
        _this4.singleToMulti();
      }, false);
      floor.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName.toUpperCase() === 'A') {
          _this4.changeFloor(parseInt(e.target.innerHTML));
        }
      }, false);
      gateEl.addEventListener('click', function (e) {
        _this4.gate.createGate(gateEl, e, _this4.spriteList);
      }, false);
    } // compile dom 

  }, {
    key: "domCompile",
    value: function domCompile() {
      var root = document.querySelector('#app');
      var data = {
        mode: this.mode,
        floorList: [{
          name: 1
        }, {
          name: 2
        }, {
          name: 3
        }, {
          name: 4
        }, {
          name: 5
        }]
      };
      new _util_Compile__WEBPACK_IMPORTED_MODULE_8__["default"](root, data);
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


var world = new World(0);
world.init();

/***/ }),

/***/ "./src/state/Floor.js":
/*!****************************!*\
  !*** ./src/state/Floor.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_House__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/House */ "./src/data/House.js");
/* harmony import */ var _util_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/event */ "./src/util/event.js");
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
    value: function init() {
      StateA.up = false;
      StateA.down = false;
      this.floorCount = this._getUpDownFloorCount(this.group);
      StateA.count = this.standardCount = this.floorCount.position;
      this.floorCount.down = this.standardCount - (this.floorCount.down - 1);
      this.floorCount.up = this.standardCount + (this.floorCount.up - 1);
      this.minFloor = this._caculateMinusIndex(_data_House__WEBPACK_IMPORTED_MODULE_0__["houseData"]);
    }
  }, {
    key: "upBegin",
    value: function upBegin() {
      if (StateA.count > 0 && !StateA.up && !StateA.down) {
        StateA.up = true;
        _util_event__WEBPACK_IMPORTED_MODULE_1__["default"].emit('upTrigger');
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

/***/ "./src/util/Compile.js":
/*!*****************************!*\
  !*** ./src/util/Compile.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var templateReg = /\${([^{}])+}/g;

var Compile =
/*#__PURE__*/
function () {
  function Compile(node, data) {
    _classCallCheck(this, Compile);

    this.compileNode(node);
    this.data = data;
    node.hasChildNodes() ? this.compileNodeList(node.childNodes) : null;
  } // 解析节点list


  _createClass(Compile, [{
    key: "compileNodeList",
    value: function compileNodeList(nodeList) {
      var childListFn, node;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          node = _step.value;

          if (node.nodeType == 1 && node.hasAttribute("m-repeat")) {
            this.compileElement(node);
          } else {
            this.compileNode(node);
            node.hasChildNodes ? this.compileNodeList(node.childNodes) : null;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } // 解析节点 

  }, {
    key: "compileNode",
    value: function compileNode(node) {
      if (node.nodeType == 1) {
        this.compileElement(node);
      } else if (node.nodeType == 3) {
        this.compileText(node, this.data);
      }
    } // 解析节点元素

  }, {
    key: "compileElement",
    value: function compileElement(node) {
      //解析指令
      var dirs = node.attributes;

      if (node.hasAttribute("m-repeat")) {
        this.dealDir("m-repeat", node, dirs);
      }

      if (node.getAttribute("m-show")) {
        this.dealDir("m-show", node, dirs);
      }

      if (node.getAttribute("m-hide")) {
        this.dealDir("m-hide", node, dirs);
      }
    } // 解析节点元素内容

  }, {
    key: "compileText",
    value: function compileText(node, data) {
      //解析模板
      if (!node.data) {
        return;
      }

      node.data = this.compileTemplate(node.data)(data);
    } // 解析模板

  }, {
    key: "compileTemplate",
    value: function compileTemplate(textFragment) {
      var res = null;
      var keyArray = [];

      while (res = templateReg.exec(textFragment)) {
        var key = res[0].slice(2, res[0].length - 1);
        keyArray.push(key);
      }

      for (var _i = 0, _keyArray = keyArray; _i < _keyArray.length; _i++) {
        var item = _keyArray[_i];
        var nReg = new RegExp("\\${" + item + "}", "g");
        var dataStr = this.dealText(item);
        dataStr = dataStr.replace(/\\/g, "");
        textFragment = textFragment.replace(/\\/g, "");
        textFragment = textFragment.replace(nReg, dataStr);
      }

      return new Function("data", "return `" + textFragment + "`");
    } // 处理模板内容

  }, {
    key: "dealText",
    value: function dealText(text) {
      if (!text) {
        return;
      }

      var dataStrStart = "${data.";
      var dataStrEnd = "}";
      return dataStrStart + text + dataStrEnd;
    }
  }, {
    key: "createDocFragment",
    value: function createDocFragment() {
      var docFragment = null;
      return docFragment = document.createDocumentFragment();
    } // 处理指令

  }, {
    key: "dealDir",
    value: function dealDir(type, node, dirs) {
      var _this = this;

      switch (type) {
        case "m-repeat":
          (function (node, dirs) {
            var dirArr = node.getAttribute("m-repeat").split(" ");
            node.removeAttribute("m-repeat");
            var parentNode = node.parentNode;

            var docFragment = _this.createDocFragment();

            var len = _this.data[dirArr[2]].length;
            var i = 0;

            while (len) {
              var cloneNode = node.cloneNode(true);
              cloneNode.setAttribute("index", i);
              var nodeText = cloneNode.childNodes[0].data;
              var res = null;
              var keyArray = [];

              while (res = templateReg.exec(nodeText)) {
                var key = res[0].slice(3 + dirArr[0].length, res[0].length - 1);
                keyArray.push(key);
              }

              for (var _i2 = 0, _keyArray2 = keyArray; _i2 < _keyArray2.length; _i2++) {
                var item = _keyArray2[_i2];
                var nReg = new RegExp("\\${" + dirArr[0] + "." + item + "}", "g");
                cloneNode.innerHTML = cloneNode.innerHTML.replace(nReg, "${" + dirArr[2] + "\\[" + i + "\\]\\." + item + "}");
              }

              docFragment.appendChild(cloneNode);
              len--;
              i++;
            }

            parentNode.appendChild(docFragment);
            parentNode.removeChild(node);
          })(node, dirs);

          break;

        case "m-show":
          (function (node, dirs) {
            var flag = node.getAttribute("m-show");
            var isShow = _this.data[flag];

            if (isShow) {
              node.style.display = "none";
            }
          })(node, dirs);

          break;

        case "m-hide":
          (function (node, dirs) {
            var flag = node.getAttribute("m-hide");
            var isShow = _this.data[flag];

            if (!isShow) {
              node.style.display = "none";
            }
          })(node, dirs);

          break;
      }
    }
  }]);

  return Compile;
}();

/* harmony default export */ __webpack_exports__["default"] = (Compile);

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

  var zd = _scene_mapWorld__WEBPACK_IMPORTED_MODULE_0__["default"].camera.position.y - 200; // get camera angle (180-45)/2

  var za = 67.5 * Math.PI / 180; // 获取世界坐标中的x轴边界

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19hc3luY0AxLjUuMkBhc3luYy9saWIvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19wcm9jZXNzQDAuMTEuMTBAcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc2V0aW1tZWRpYXRlQDEuMC41QHNldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL190aW1lcnMtYnJvd3NlcmlmeUAyLjAuMTBAdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb24vVHJhY2tGbG9vci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5pbWF0aW9uL1R3ZWVuRmxvb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGEvSG91c2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9CbG9vbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0L0dhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9SYXljYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lL21hcFdvcmxkLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9GbG9vci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9Db21waWxlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL1RyYW5zZm9ybUFsZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZXZlbnQuanMiXSwibmFtZXMiOlsiVHJhY2tGbG9vciIsInN0YXRlQSIsIlN0YXRlQSIsIldvcmxkIiwibWFpbkdyb3VwIiwiaW5pdCIsImZsb29ySGVpZ2h0IiwidXBIZWlnaHQiLCJkb3duSGVpZ2h0IiwicG9zaXRpb25TcGVlZCIsIm9wYWNpdHlTcGVlZCIsIm9wYWNpdHlTcGVlZDIiLCJoaWdoIiwibG93IiwiZ3JvdXAiLCJwb3NpdGlvbiIsInkiLCJjaGlsZHJlbiIsInVzZXJEYXRhIiwiaXNTaG93IiwidmlzaWJsZSIsImZvckVhY2giLCJpdGVtIiwibmFtZSIsIm1hdGVyaWFsIiwib3BhY2l0eSIsImRvd25FbmQiLCJ1cEJlZ2luIiwiZG93bkJlZ2luIiwidXBFbmQiLCJUd2VlbkZsb29yIiwib3B0aW9ucyIsIl9nZXRUd2VlblZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIiwiY2FtZXJhQ3VycmVudCIsImN5IiwidGFyZ2V0IiwiY2FtZXJhT3JpZ2luIiwicG9zaXRpb25ZIiwibWVzaCIsInNldENvbG9yIiwiY29sb3IiLCJzZXRPcGFjaXR5IiwiX3Nwb3J0IiwiY29udHJvbHMiLCJjb3B5Iiwic2NlbmUiLCJhY3RpdmUiLCJzdGF0dXMiLCJpbnRlcnNlY3QiLCJtb2RlIiwia2V5IiwidmFsdWUiLCJyIiwiZyIsImIiLCJvYmplY3QiLCJwYXJlbnQiLCJyZXNldCIsInVwZGF0ZSIsImNhbWVyYSIsInNldCIsImNhbWVyYVNwb3J0IiwiZmxvb3IiLCJ2YWwiLCJ4IiwieiIsImNhbWVyYVNwb3J0WCIsImNvbXBsZXRlIiwidHdlZW4iLCJUV0VFTiIsIlR3ZWVuIiwidG8iLCJvblVwZGF0ZSIsImxvb2tBdCIsIlRIUkVFIiwiVmVjdG9yMyIsIm9uQ29tcGxldGUiLCJlYXNpbmciLCJFYXNpbmciLCJMaW5lYXIiLCJOb25lIiwic3RhcnQiLCJob3VzZURhdGEiLCJ1cmwiLCJnYXRlQXJyIiwibG9nbyIsIkJsb29tIiwicmVuZGVyU2NlbmUiLCJSZW5kZXJQYXNzIiwicG9zIiwiZ2VvbWV0cnkiLCJTcGhlcmVHZW9tZXRyeSIsIk1lc2hCYXNpY01hdGVyaWFsIiwic2lkZSIsIkRvdWJsZVNpZGUiLCJzcGhlcmUiLCJNZXNoIiwicm90YXRpb24iLCJNYXRoIiwiUEkiLCJhZGQiLCJsYXllcnMiLCJlbmFibGUiLCJzY2FsZUtGIiwiVmVjdG9yS2V5ZnJhbWVUcmFjayIsImNsaXAiLCJBbmltYXRpb25DbGlwIiwibWl4ZXIiLCJBbmltYXRpb25NaXhlciIsImNsaXBBY3Rpb24iLCJwbGF5Iiwic2VsZWN0ZWRPYmplY3QiLCJnZXRPYmplY3RCeU5hbWUiLCJyZW1vdmUiLCJibG9vbVBhc3MiLCJVbnJlYWxCbG9vbVBhc3MiLCJWZWN0b3IyIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwidGhyZXNob2xkIiwic3RyZW5ndGgiLCJyYWRpdXMiLCJibG9vbUNvbXBvc2VyIiwiRWZmZWN0Q29tcG9zZXIiLCJyZW5kZXJlciIsInJlbmRlclRhcmdldDEiLCJ0ZXh0dXJlIiwiZm9ybWF0IiwiUkdCQUZvcm1hdCIsInJlbmRlclRhcmdldDIiLCJyZW5kZXJUb1NjcmVlbiIsInNldFNpemUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiYWRkUGFzcyIsImZpbmFsUGFzcyIsIlNoYWRlclBhc3MiLCJTaGFkZXJNYXRlcmlhbCIsInVuaWZvcm1zIiwiYmFzZVRleHR1cmUiLCJibG9vbVRleHR1cmUiLCJ2ZXJ0ZXhTaGFkZXIiLCJmcmFnbWVudFNoYWRlciIsImRlZmluZXMiLCJmaW5hbENvbXBvc2VyIiwibmVlZHNTd2FwIiwiR2F0ZSIsImVsIiwiZSIsInNwcml0ZUxpc3QiLCJub2RlTmFtZSIsInRvVXBwZXJDYXNlIiwic3JjIiwic3BsaXQiLCJwb3AiLCJpbWciLCJib3giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXZYIiwiZXZlbnQiLCJjbGllbnRYIiwib2Zmc2V0V2lkdGgiLCJkaXZZIiwiY2xpZW50WSIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwid2lkdGgiLCJsZWZ0IiwidG9wIiwiYm9keSIsImFwcGVuZENoaWxkIiwib25tb3VzZW1vdmUiLCJvbm1vdXNlZG93biIsInJlbW92ZUNoaWxkIiwibmV3U2NyZWVuIiwiU2NyZWVuVG9Xb3JsZCIsInNwcml0ZSIsIlNwcml0ZSIsInNjYWxlIiwiY3JlYXRlUGljIiwicHVzaCIsInNjcmVlbkFsZXgiLCJsZXZpdGF0ZW4iLCJnZXRFbGVtZW50QnlJZCIsImhsIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxpbmUiLCJzZXRBdHRyaWJ1dGUiLCJ3eSIsInd4IiwicmlnaHQiLCJkaXNwbGF5IiwiTWFwIiwibG9hZGVyIiwiU1ZHTG9hZGVyIiwiR2VvbWV0cnkiLCJzaGFwZSIsIkV4dHJ1ZGVCdWZmZXJHZW9tZXRyeSIsImRlcHRoIiwiYmV2ZWxFbmFibGVkIiwiTWVzaFBob25nTWF0ZXJpYWwiLCJnZW8iLCJjcmVhdGVHZW9tZXRyeSIsImV4dHJ1ZGVHZW8iLCJjcmVhdGVFeHRydWRlR2VvbWV0cnkiLCJmcm9tQnVmZmVyR2VvbWV0cnkiLCJ0cmFuc2xhdGUiLCJtYXQiLCJjcmVhdGVNYXRlcmlhbCIsImNhbGxiYWNrIiwiYXN5bmNDYiIsImxvYWQiLCJkYXRhIiwicGF0aHMiLCJwYXRoIiwic2hhcGVzIiwidG9TaGFwZXMiLCJvcmlnaW5Qb3NpdGlvbiIsImluaXRUZW1wbGF0ZSIsInRyYW5zcGFyZW50IiwiY3JlYXRlTWVzaCIsInBsYW5lTGlzdCIsImdyb3VwSW5mbyIsIm9wdGlvbiIsImZvbnRTaXplIiwiY3JlYXRlVGV4dCIsIlJheWNhc3RlciIsInJheWNhc3RlciIsInJheUxpc3QiLCJlbXB0eUNhbGxiYWNrIiwibW91c2UiLCJjb250YWluZXIiLCJkb21FbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJzZXRGcm9tQ2FtZXJhIiwiaW50ZXJzZWN0cyIsImludGVyc2VjdE9iamVjdHMiLCJsZW5ndGgiLCJ0ZXh0IiwiZXh0cmFPcHRpb24iLCJjYW52YXMiLCJoZWlnaHQiLCJjdHgiLCJnZXRDb250ZXh0IiwiZmlsbFN0eWxlIiwiZm9udCIsImZpbGxUZXh0IiwiVGV4dHVyZSIsIm5lZWRzVXBkYXRlIiwibWFwIiwiZGVwdGhUZXN0IiwiX2NyZWF0ZVNwcml0ZSIsInBpY1VybCIsIlRleHR1cmVMb2FkZXIiLCJvYmoiLCJTcHJpdGVNYXRlcmlhbCIsImFzeW5jIiwicmVxdWlyZSIsImNsb2NrIiwiQ2xvY2siLCJkb21Db21waWxlIiwiU2NlbmUiLCJDQU1fUE9TIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwiYWxwaGEiLCJzZXRQaXhlbFJhdGlvIiwiR3JvdXAiLCJMYXllcnMiLCJjcmVhdGVDb250cm9scyIsImNyZWF0ZUxpZ2h0IiwiZXZlbnRDb2xsZWN0aW9uIiwidHdlZW5GbG9vciIsImdhdGUiLCJidWlsZGluZ1Jpc2UiLCJibG9vbSIsInNldEJsb29tUGFzcyIsInNldEZpbmFsUGFzcyIsInNoaW5pbmciLCJyYW5kb20iLCJhbmltYXRlRmxvb3IiLCJhbmltYXRlIiwiZGVsdGEiLCJnZXREZWx0YSIsInVwIiwidXBGbG9vciIsImRvd24iLCJkb3duRmxvb3IiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZW5kZXIiLCJlYWNoIiwiY2IiLCJkeW5hbWljRmxvb3IiLCJsb2FkTWFwIiwibG9hZFBsYW5lIiwiY3JlYXRlRmxvb3JOYW1lIiwiY3JlYXRlR2F0ZUxvZ28iLCJfbW9kZURpZmZIYW5kbGUiLCJjaGFuZ2VGbG9vciIsImNvdW50Iiwic2luZ2xlVG9NdWx0aSIsInNpbmdsZVRvU2luZ2xlIiwibXVsdGlUb1NpbmdsZSIsInNsaWNlIiwiaGFuZGxlRXZlbnQiLCJjcmVhdGVMZXZpdGF0ZUJveCIsImJveExlZnQiLCJvZmZzZXRMZWZ0IiwiYm94UmlnaHQiLCJib3hUb3AiLCJvZmZzZXRUb3AiLCJib3hCb3R0b20iLCJPcmJpdENvbnRyb2xzIiwiZW5hYmxlWm9vbSIsImVuYWJsZVJvdGF0ZSIsInNjcmVlblNwYWNlUGFubmluZyIsInNhdmVTdGF0ZSIsIkFtYmllbnRMaWdodCIsImxpZ2h0IiwiSGVtaXNwaGVyZUxpZ2h0IiwiYXhlc0hlbHBlciIsIkF4ZXNIZWxwZXIiLCJ1cGZsb29yRWwiLCJkb3duZmxvb3JFbCIsImFsbEVsIiwiZ2F0ZUVsIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRNb3VzZUNsaWNrIiwiYmVmb3JlVXAiLCJiZWZvcmVEb3duIiwicGFyc2VJbnQiLCJpbm5lckhUTUwiLCJjcmVhdGVHYXRlIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJmbG9vckxpc3QiLCJDb21waWxlIiwidGltZSIsIndvcmxkIiwiZmxvb3JDb3VudCIsIl9nZXRVcERvd25GbG9vckNvdW50Iiwic3RhbmRhcmRDb3VudCIsIm1pbkZsb29yIiwiX2NhY3VsYXRlTWludXNJbmRleCIsIkV2ZW50RW1pdHRlciIsImVtaXQiLCJkb3duRmxvb3JDb3VudCIsInVwRmxvb3JDb3VudCIsImFyciIsImkiLCJ0ZW1wbGF0ZVJlZyIsIm5vZGUiLCJjb21waWxlTm9kZSIsImhhc0NoaWxkTm9kZXMiLCJjb21waWxlTm9kZUxpc3QiLCJjaGlsZE5vZGVzIiwibm9kZUxpc3QiLCJjaGlsZExpc3RGbiIsIm5vZGVUeXBlIiwiaGFzQXR0cmlidXRlIiwiY29tcGlsZUVsZW1lbnQiLCJjb21waWxlVGV4dCIsImRpcnMiLCJhdHRyaWJ1dGVzIiwiZGVhbERpciIsImdldEF0dHJpYnV0ZSIsImNvbXBpbGVUZW1wbGF0ZSIsInRleHRGcmFnbWVudCIsInJlcyIsImtleUFycmF5IiwiZXhlYyIsIm5SZWciLCJSZWdFeHAiLCJkYXRhU3RyIiwiZGVhbFRleHQiLCJyZXBsYWNlIiwiRnVuY3Rpb24iLCJkYXRhU3RyU3RhcnQiLCJkYXRhU3RyRW5kIiwiZG9jRnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwidHlwZSIsImRpckFyciIsInJlbW92ZUF0dHJpYnV0ZSIsInBhcmVudE5vZGUiLCJjcmVhdGVEb2NGcmFnbWVudCIsImxlbiIsImNsb25lTm9kZSIsIm5vZGVUZXh0IiwiZmxhZyIsInNjcmVlblBvaW50IiwicFgiLCJwWSIsInpkIiwiemEiLCJieCIsInRhbiIsImJ5Iiwic3giLCJzeSIsIl9ldmVudHMiLCJjYWxsYmFja3MiLCJmaWx0ZXIiLCJmbiIsImFyZ3MiLCJwYXJhbXMiLCJjYWxsIiwiYXBwbHkiLCJ3cmFwRnVuYyIsIm9mZiIsIm9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELFVBQVUsRUFBRTtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSx1QkFBdUIsZ0JBQWdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsb0JBQW9CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1QkFBdUI7QUFDekQ7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw2QkFBNkI7QUFDakU7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQseUJBQXlCO0FBQ3ZGLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7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QUNodkNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQkFBTyxDQUFDLHFGQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTs7SUFDTUEsVTs7O0FBRUosd0JBQWU7QUFBQTtBQUFFOzs7OzJCQUVUO0FBQ04sV0FBS0MsTUFBTCxHQUFjLElBQUlDLG9EQUFKLENBQVdDLHVEQUFLLENBQUNDLFNBQWpCLENBQWQ7QUFDQSxXQUFLSCxNQUFMLENBQVlJLElBQVo7QUFFQSxXQUFLQyxXQUFMLEdBQW1CLEdBQW5CO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsS0FBS0YsV0FBdkIsQ0FOTSxDQU9OOztBQUNBLFdBQUtHLGFBQUwsR0FBcUIsQ0FBckIsQ0FSTSxDQVNOOztBQUNBLFdBQUtDLFlBQUwsR0FBb0IsTUFBTSxLQUFLRCxhQUFYLEdBQTJCLEtBQUtILFdBQXBELENBVk0sQ0FXTjs7QUFDQSxXQUFLSyxhQUFMLEdBQXFCLElBQUksS0FBS0YsYUFBVCxHQUF5QixLQUFLSCxXQUFuRDtBQUNEOzs7eUJBRUtNLEksRUFBTUMsRyxFQUFLQyxLLEVBQU87QUFBQTs7QUFFdEIsV0FBS04sVUFBTCxJQUFtQixLQUFLQyxhQUF4QjtBQUNBSyxXQUFLLENBQUNDLFFBQU4sQ0FBZUMsQ0FBZixJQUFvQixLQUFLUCxhQUF6QjtBQUNBSyxXQUFLLENBQUNHLFFBQU4sQ0FBZUosR0FBZixFQUFvQkssUUFBcEIsQ0FBNkJDLE1BQTdCLEdBQXNDLEtBQXRDO0FBQ0FMLFdBQUssQ0FBQ0csUUFBTixDQUFlTCxJQUFmLEVBQXFCTSxRQUFyQixDQUE4QkMsTUFBOUIsR0FBdUMsSUFBdkM7QUFDQUwsV0FBSyxDQUFDRyxRQUFOLENBQWVMLElBQWYsRUFBcUJRLE9BQXJCLEdBQStCLElBQS9CO0FBRUFOLFdBQUssQ0FBQ0csUUFBTixDQUFlSixHQUFmLEVBQW9CSSxRQUFwQixDQUE2QkksT0FBN0IsQ0FBcUMsVUFBQUMsSUFBSSxFQUFJO0FBQzNDLFlBQUlBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3pCRCxjQUFJLENBQUNFLFFBQUwsQ0FBY0MsT0FBZCxJQUF5QixLQUFJLENBQUNmLFlBQTlCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xZLGNBQUksQ0FBQ0UsUUFBTCxDQUFjQyxPQUFkLElBQXlCLEtBQUksQ0FBQ2QsYUFBOUI7QUFDRDtBQUNGLE9BTkQ7QUFRQUcsV0FBSyxDQUFDRyxRQUFOLENBQWVMLElBQWYsRUFBcUJLLFFBQXJCLENBQThCSSxPQUE5QixDQUFzQyxVQUFBQyxJQUFJLEVBQUk7QUFDNUMsWUFBSUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekJELGNBQUksQ0FBQ0UsUUFBTCxDQUFjQyxPQUFkLElBQXlCLEtBQUksQ0FBQ2YsWUFBOUI7QUFDRCxTQUZELE1BRU87QUFDTFksY0FBSSxDQUFDRSxRQUFMLENBQWNDLE9BQWQsSUFBeUIsS0FBSSxDQUFDZCxhQUE5QjtBQUNEO0FBQ0YsT0FORCxFQWhCc0IsQ0F3QnRCOztBQUNBLFVBQUksS0FBS0gsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QixhQUFLQSxVQUFMLEdBQWtCLEtBQUtGLFdBQXZCLENBRHdCLENBQ1c7O0FBQ25DLGFBQUtMLE1BQUwsQ0FBWXlCLE9BQVo7QUFDRDtBQUNGOzs7K0JBRVc7QUFDVixXQUFLekIsTUFBTCxDQUFZMEIsT0FBWjtBQUNEOzs7aUNBRWE7QUFDWixXQUFLMUIsTUFBTCxDQUFZMkIsU0FBWjtBQUNEOzs7dUJBRUdoQixJLEVBQU1DLEcsRUFBS0MsSyxFQUFPO0FBQUE7O0FBQ3BCLFdBQUtQLFFBQUwsSUFBaUIsS0FBS0UsYUFBdEI7QUFDQUssV0FBSyxDQUFDQyxRQUFOLENBQWVDLENBQWYsSUFBb0IsS0FBS1AsYUFBekI7QUFDQUssV0FBSyxDQUFDRyxRQUFOLENBQWVMLElBQWYsRUFBcUJNLFFBQXJCLENBQThCQyxNQUE5QixHQUF1QyxLQUF2QztBQUNBTCxXQUFLLENBQUNHLFFBQU4sQ0FBZUosR0FBZixFQUFvQkssUUFBcEIsQ0FBNkJDLE1BQTdCLEdBQXNDLElBQXRDO0FBQ0FMLFdBQUssQ0FBQ0csUUFBTixDQUFlSixHQUFmLEVBQW9CTyxPQUFwQixHQUE4QixJQUE5QjtBQUVBTixXQUFLLENBQUNHLFFBQU4sQ0FBZUosR0FBZixFQUFvQkksUUFBcEIsQ0FBNkJJLE9BQTdCLENBQXFDLFVBQUFDLElBQUksRUFBSTtBQUMzQyxZQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN6QkQsY0FBSSxDQUFDRSxRQUFMLENBQWNDLE9BQWQsSUFBeUIsTUFBSSxDQUFDZixZQUE5QjtBQUNELFNBRkQsTUFFTztBQUNMWSxjQUFJLENBQUNFLFFBQUwsQ0FBY0MsT0FBZCxJQUF5QixNQUFJLENBQUNkLGFBQTlCO0FBQ0Q7QUFDRixPQU5EO0FBUUFHLFdBQUssQ0FBQ0csUUFBTixDQUFlTCxJQUFmLEVBQXFCSyxRQUFyQixDQUE4QkksT0FBOUIsQ0FBc0MsVUFBQUMsSUFBSSxFQUFJO0FBQzVDLFlBQUlBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3pCRCxjQUFJLENBQUNFLFFBQUwsQ0FBY0MsT0FBZCxJQUF5QixNQUFJLENBQUNmLFlBQTlCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xZLGNBQUksQ0FBQ0UsUUFBTCxDQUFjQyxPQUFkLElBQXlCLE1BQUksQ0FBQ2QsYUFBOUI7QUFDRDtBQUNGLE9BTkQ7O0FBT0EsVUFBSSxLQUFLSixRQUFMLElBQWlCLEtBQUtELFdBQTFCLEVBQXVDO0FBQ3JDLGFBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxhQUFLTixNQUFMLENBQVk0QixLQUFaO0FBQ0Q7QUFDRjs7Ozs7O0FBRVk3Qix5RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZBO0FBRUE7Ozs7Ozs7O0lBT004QixVOzs7QUFDSix3QkFBZTtBQUFBOztBQUNiLFNBQUtDLE9BQUwsR0FBZSxLQUFLQyxjQUFMLEVBQWY7QUFDRCxHLENBRUQ7Ozs7O29DQUNpQjtBQUFBOztBQUNmN0IsNkRBQUssQ0FBQ0MsU0FBTixDQUFnQmEsUUFBaEIsQ0FBeUJJLE9BQXpCLENBQWlDLFVBQUFQLEtBQUssRUFBSTtBQUN4QyxZQUFJQSxLQUFLLENBQUNNLE9BQVYsRUFBbUI7QUFFakIsY0FBSUwsUUFBUSxHQUFHa0IsTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBSSxDQUFDSCxPQUFMLENBQWFJLGFBQTNCLEVBQTBDO0FBQUVDLGNBQUUsRUFBRXRCLEtBQUssQ0FBQ0MsUUFBTixDQUFlQztBQUFyQixXQUExQyxDQUFmO0FBQ0EsY0FBSXFCLE1BQU0sR0FBR0osTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBSSxDQUFDSCxPQUFMLENBQWFPLFlBQTNCLEVBQXlDO0FBQUVGLGNBQUUsRUFBRXRCLEtBQUssQ0FBQ0ksUUFBTixDQUFlcUI7QUFBckIsV0FBekMsQ0FBYjtBQUVBekIsZUFBSyxDQUFDRyxRQUFOLENBQWVJLE9BQWYsQ0FBdUIsVUFBQ21CLElBQUQsRUFBVTtBQUMvQixnQkFBSUEsSUFBSSxDQUFDakIsSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3pCLG1CQUFJLENBQUNRLE9BQUwsQ0FBYVUsUUFBYixDQUFzQkQsSUFBdEIsRUFBNEJBLElBQUksQ0FBQ3RCLFFBQUwsQ0FBY3dCLEtBQTFDO0FBQ0QsYUFGRCxNQUVPLElBQUdGLElBQUksQ0FBQ2pCLElBQUwsS0FBYyxNQUFqQixFQUF5QjtBQUM5QixtQkFBSSxDQUFDUSxPQUFMLENBQWFZLFVBQWIsQ0FBd0JILElBQXhCLEVBQThCLENBQTlCO0FBQ0Q7QUFDRixXQU5EOztBQVFBLGVBQUksQ0FBQ0ksTUFBTCxDQUFZN0IsUUFBWixFQUFzQnNCLE1BQXRCLEVBQThCdkIsS0FBOUIsRUFBcUMsWUFBSTtBQUN2Q1gsbUVBQUssQ0FBQzBDLFFBQU4sQ0FBZVIsTUFBZixDQUFzQlMsSUFBdEIsQ0FBMkIzQyx1REFBSyxDQUFDNEMsS0FBTixDQUFZaEMsUUFBdkM7QUFDQVosbUVBQUssQ0FBQ0MsU0FBTixDQUFnQmMsUUFBaEIsQ0FBeUI4QixNQUF6QixHQUFrQyxDQUFsQztBQUNBN0MsbUVBQUssQ0FBQzhDLE1BQU4sR0FBZSxPQUFmO0FBQ0QsV0FKRDtBQUtEOztBQUVELFlBQUluQyxLQUFLLENBQUNJLFFBQU4sQ0FBZUMsTUFBbkIsRUFBMEI7QUFDeEJMLGVBQUssQ0FBQ00sT0FBTixHQUFnQixJQUFoQjtBQUNEO0FBQ0YsT0F4QkQ7QUF5QkQ7OztrQ0FFYzhCLFMsRUFBV0MsSSxFQUFNO0FBQUE7O0FBRTlCLFVBQUlDLEdBQUosRUFBU0MsS0FBVDtBQUNBLFVBQUlYLEtBQUssR0FBRztBQUFFWSxTQUFDLEVBQUUsSUFBTDtBQUFXQyxTQUFDLEVBQUUsSUFBZDtBQUFvQkMsU0FBQyxFQUFFLElBQXZCLENBRVo7O0FBRlksT0FBWjs7QUFHQSxVQUFJLFFBQU9OLFNBQVAsTUFBcUIsUUFBekIsRUFBbUM7QUFDakNFLFdBQUcsR0FBRyxNQUFOO0FBQ0FDLGFBQUssR0FBR0gsU0FBUyxDQUFDTyxNQUFWLENBQWlCQyxNQUFqQixDQUF3Qm5DLElBQWhDO0FBQ0QsT0FIRCxNQUdPO0FBQ0w2QixXQUFHLEdBQUcsT0FBTjtBQUNBQyxhQUFLLEdBQUdILFNBQVI7QUFDRDs7QUFFRC9DLDZEQUFLLENBQUNDLFNBQU4sQ0FBZ0JhLFFBQWhCLENBQXlCSSxPQUF6QixDQUFpQyxVQUFBUCxLQUFLLEVBQUk7QUFDeEMsWUFBSUEsS0FBSyxDQUFDSSxRQUFOLENBQWVrQyxHQUFmLE1BQXdCQyxLQUE1QixFQUFtQztBQUNqQ3ZDLGVBQUssQ0FBQ00sT0FBTixHQUFnQixLQUFoQjtBQUNELFNBRkQsTUFFTztBQUNMO0FBQ0FqQixpRUFBSyxDQUFDQyxTQUFOLENBQWdCYyxRQUFoQixDQUF5QkUsT0FBekIsR0FBbUNpQyxLQUFLLEdBQUcsQ0FBM0MsQ0FGSyxDQUdMO0FBQ0E7O0FBQ0FsRCxpRUFBSyxDQUFDMEMsUUFBTixDQUFlYyxLQUFmO0FBQ0F4RCxpRUFBSyxDQUFDMEMsUUFBTixDQUFlZSxNQUFmO0FBQ0F6RCxpRUFBSyxDQUFDMEMsUUFBTixDQUFlUixNQUFmLENBQXNCUyxJQUF0QixDQUEyQjNDLHVEQUFLLENBQUM0QyxLQUFOLENBQVloQyxRQUF2QztBQUNBWixpRUFBSyxDQUFDOEMsTUFBTixHQUFlLFFBQWY7QUFFQW5DLGVBQUssQ0FBQ0csUUFBTixDQUFlSSxPQUFmLENBQXVCLFVBQUFtQixJQUFJLEVBQUk7QUFDN0IsZ0JBQUlBLElBQUksQ0FBQ2pCLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN6QixvQkFBSSxDQUFDUSxPQUFMLENBQWFVLFFBQWIsQ0FBc0JELElBQXRCLEVBQTRCRSxLQUE1QjtBQUNEOztBQUNELGdCQUFJRixJQUFJLENBQUNqQixJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekIsb0JBQUksQ0FBQ1EsT0FBTCxDQUFhWSxVQUFiLENBQXdCSCxJQUF4QixFQUE4QixHQUE5QjtBQUNELGFBRkQsTUFFTztBQUNMLG9CQUFJLENBQUNULE9BQUwsQ0FBYVksVUFBYixDQUF3QkgsSUFBeEIsRUFBOEIsQ0FBOUI7QUFDRDtBQUNGLFdBVEQsRUFWSyxDQXFCTDtBQUNBOztBQUNBLGNBQUlXLElBQUosRUFBVTtBQUNSaEQsbUVBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0IrQyxHQUF0QixDQUEwQixDQUExQixFQUE2QixHQUE3QixFQUFrQyxDQUFsQztBQUNBaEQsaUJBQUssQ0FBQ0MsUUFBTixDQUFlQyxDQUFmLEdBQW1CLEdBQW5CO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsZ0JBQUlELFFBQVEsR0FBR2tCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLE1BQUksQ0FBQ0gsT0FBTCxDQUFhSSxhQUEzQixFQUEwQztBQUFFQyxnQkFBRSxFQUFFdEIsS0FBSyxDQUFDQyxRQUFOLENBQWVDO0FBQXJCLGFBQTFDLENBQWY7QUFDQSxnQkFBSXFCLE1BQU0sR0FBR0osTUFBTSxDQUFDQyxNQUFQLENBQWMsTUFBSSxDQUFDSCxPQUFMLENBQWFnQyxXQUEzQixFQUF3QztBQUFFM0IsZ0JBQUUsRUFBRTtBQUFOLGFBQXhDLENBQWI7O0FBQ0Esa0JBQUksQ0FBQ1EsTUFBTCxDQUFZN0IsUUFBWixFQUFzQnNCLE1BQXRCLEVBQThCdkIsS0FBOUI7QUFDRDtBQUVGO0FBQ0YsT0FwQ0Q7QUFxQ0Q7OzttQ0FFZWtELEssRUFBTztBQUFBOztBQUVyQixVQUFJdEIsS0FBSyxHQUFHO0FBQUVZLFNBQUMsRUFBRSxJQUFMO0FBQVdDLFNBQUMsRUFBRSxJQUFkO0FBQW9CQyxTQUFDLEVBQUU7QUFBdkIsT0FBWjtBQUVBckQsNkRBQUssQ0FBQzBDLFFBQU4sQ0FBZVIsTUFBZixDQUFzQlMsSUFBdEIsQ0FBMkIzQyx1REFBSyxDQUFDNEMsS0FBTixDQUFZaEMsUUFBdkM7QUFDQVosNkRBQUssQ0FBQzhDLE1BQU4sR0FBZSxRQUFmO0FBRUE5Qyw2REFBSyxDQUFDQyxTQUFOLENBQWdCYSxRQUFoQixDQUF5QkksT0FBekIsQ0FBaUMsVUFBQ1AsS0FBRCxFQUFRbUQsR0FBUixFQUFnQjtBQUUvQyxZQUFJbkQsS0FBSyxDQUFDTSxPQUFWLEVBQW1CO0FBQ2pCTixlQUFLLENBQUNNLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQU4sZUFBSyxDQUFDQyxRQUFOLENBQWVDLENBQWYsR0FBbUJGLEtBQUssQ0FBQ0ksUUFBTixDQUFlcUIsU0FBbEM7QUFDQXpCLGVBQUssQ0FBQ0csUUFBTixDQUFlSSxPQUFmLENBQXVCLFVBQUFtQixJQUFJLEVBQUk7QUFDN0IsZ0JBQUlBLElBQUksQ0FBQ2pCLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN6QixvQkFBSSxDQUFDUSxPQUFMLENBQWFVLFFBQWIsQ0FBc0JELElBQXRCLEVBQTRCQSxJQUFJLENBQUN0QixRQUFMLENBQWN3QixLQUExQztBQUNELGFBRkQsTUFFTyxJQUFHRixJQUFJLENBQUNqQixJQUFMLEtBQWMsTUFBakIsRUFBeUI7QUFDOUIsb0JBQUksQ0FBQ1EsT0FBTCxDQUFhWSxVQUFiLENBQXdCSCxJQUF4QixFQUE4QixDQUE5QjtBQUNEO0FBQ0YsV0FORDtBQU9EOztBQUVELFlBQUkxQixLQUFLLENBQUNJLFFBQU4sQ0FBZThDLEtBQWYsS0FBeUJBLEtBQTdCLEVBQW9DO0FBQ2xDN0QsaUVBQUssQ0FBQ0MsU0FBTixDQUFnQmMsUUFBaEIsQ0FBeUJFLE9BQXpCLEdBQW1DNkMsR0FBbkM7QUFDQW5ELGVBQUssQ0FBQ00sT0FBTixHQUFnQixJQUFoQjtBQUNBTixlQUFLLENBQUNDLFFBQU4sQ0FBZUMsQ0FBZixHQUFtQixHQUFuQjtBQUNBRixlQUFLLENBQUNHLFFBQU4sQ0FBZUksT0FBZixDQUF1QixVQUFBbUIsSUFBSSxFQUFJO0FBQzdCLGdCQUFJQSxJQUFJLENBQUNqQixJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekIsb0JBQUksQ0FBQ1EsT0FBTCxDQUFhVSxRQUFiLENBQXNCRCxJQUF0QixFQUE0QkUsS0FBNUI7QUFDRDs7QUFDRCxnQkFBSUYsSUFBSSxDQUFDakIsSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3pCLG9CQUFJLENBQUNRLE9BQUwsQ0FBYVksVUFBYixDQUF3QkgsSUFBeEIsRUFBOEIsR0FBOUI7QUFDRCxhQUZELE1BRU87QUFDTCxvQkFBSSxDQUFDVCxPQUFMLENBQWFZLFVBQWIsQ0FBd0JILElBQXhCLEVBQThCLENBQTlCO0FBQ0Q7QUFDRixXQVREO0FBVUQ7QUFFRixPQTlCRDtBQWdDRCxLLENBRUQ7Ozs7cUNBQ2tCO0FBQ2hCLGFBQU87QUFDTEwscUJBQWEsRUFBRTtBQUNiK0IsV0FBQyxFQUFFL0QsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0JtRCxDQURaO0FBRWJsRCxXQUFDLEVBQUViLHVEQUFLLENBQUMwRCxNQUFOLENBQWE5QyxRQUFiLENBQXNCQyxDQUZaO0FBR2JtRCxXQUFDLEVBQUVoRSx1REFBSyxDQUFDMEQsTUFBTixDQUFhOUMsUUFBYixDQUFzQm9EO0FBSFosU0FEVjtBQU1MN0Isb0JBQVksRUFBRTtBQUNaNEIsV0FBQyxFQUFFL0QsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTNDLFFBQWIsQ0FBc0JILFFBQXRCLENBQStCbUQsQ0FEdEI7QUFFWmxELFdBQUMsRUFBRWIsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTNDLFFBQWIsQ0FBc0JILFFBQXRCLENBQStCQyxDQUZ0QjtBQUdabUQsV0FBQyxFQUFFaEUsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTNDLFFBQWIsQ0FBc0JILFFBQXRCLENBQStCb0Q7QUFIdEIsU0FOVDtBQVdMSixtQkFBVyxFQUFFO0FBQ1hHLFdBQUMsRUFBRS9ELHVEQUFLLENBQUMwRCxNQUFOLENBQWE5QyxRQUFiLENBQXNCbUQsQ0FBdEIsR0FBMEIsR0FEbEI7QUFFWGxELFdBQUMsRUFBRWIsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0JDLENBQXRCLEdBQTBCLEdBRmxCO0FBR1htRCxXQUFDLEVBQUVoRSx1REFBSyxDQUFDMEQsTUFBTixDQUFhOUMsUUFBYixDQUFzQm9ELENBQXRCLEdBQTBCO0FBSGxCLFNBWFI7QUFnQkxDLG9CQUFZLEVBQUU7QUFDWkYsV0FBQyxFQUFFL0QsdURBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0JtRCxDQUF0QixHQUEwQixHQURqQjtBQUVabEQsV0FBQyxFQUFFYix1REFBSyxDQUFDMEQsTUFBTixDQUFhOUMsUUFBYixDQUFzQkMsQ0FBdEIsR0FBMEIsR0FGakI7QUFHWm1ELFdBQUMsRUFBRWhFLHVEQUFLLENBQUMwRCxNQUFOLENBQWE5QyxRQUFiLENBQXNCb0QsQ0FBdEIsR0FBMEI7QUFIakIsU0FoQlQ7QUFxQkwxQixnQkFBUSxFQUFFLGtCQUFDRCxJQUFELEVBQU9FLEtBQVAsRUFBaUI7QUFDekJGLGNBQUksQ0FBQ2hCLFFBQUwsQ0FBY2tCLEtBQWQsQ0FBb0JZLENBQXBCLEdBQXdCWixLQUFLLENBQUNZLENBQTlCO0FBQ0FkLGNBQUksQ0FBQ2hCLFFBQUwsQ0FBY2tCLEtBQWQsQ0FBb0JhLENBQXBCLEdBQXdCYixLQUFLLENBQUNhLENBQTlCO0FBQ0FmLGNBQUksQ0FBQ2hCLFFBQUwsQ0FBY2tCLEtBQWQsQ0FBb0JjLENBQXBCLEdBQXdCZCxLQUFLLENBQUNjLENBQTlCO0FBQ0QsU0F6Qkk7QUEwQkxiLGtCQUFVLEVBQUUsb0JBQUNILElBQUQsRUFBT2YsT0FBUCxFQUFtQjtBQUM3QmUsY0FBSSxDQUFDaEIsUUFBTCxDQUFjQyxPQUFkLEdBQXdCQSxPQUF4QjtBQUNEO0FBNUJJLE9BQVA7QUE4QkQ7OzsyQkFFT1YsUSxFQUFVc0IsTSxFQUFRdkIsSyxFQUEwQjtBQUFBLFVBQW5CdUQsUUFBbUIsdUVBQVIsWUFBSSxDQUFFLENBQUU7QUFDbEQsVUFBSUMsS0FBSyxHQUFHLElBQUlDLEtBQUssQ0FBQ0MsS0FBVixDQUFnQnpELFFBQWhCLEVBQTBCMEQsRUFBMUIsQ0FBNkJwQyxNQUE3QixFQUFxQyxJQUFyQyxDQUFaO0FBQ0FpQyxXQUFLLENBQUNJLFFBQU4sQ0FBZSxZQUFNO0FBQ25CdkUsK0RBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0JtRCxDQUF0QixHQUEwQm5ELFFBQVEsQ0FBQ21ELENBQW5DO0FBQ0EvRCwrREFBSyxDQUFDMEQsTUFBTixDQUFhOUMsUUFBYixDQUFzQkMsQ0FBdEIsR0FBMEJELFFBQVEsQ0FBQ0MsQ0FBbkM7QUFDQWIsK0RBQUssQ0FBQzBELE1BQU4sQ0FBYTlDLFFBQWIsQ0FBc0JvRCxDQUF0QixHQUEwQnBELFFBQVEsQ0FBQ29ELENBQW5DO0FBQ0FyRCxhQUFLLENBQUNDLFFBQU4sQ0FBZUMsQ0FBZixHQUFtQkQsUUFBUSxDQUFDcUIsRUFBNUI7QUFDQWpDLCtEQUFLLENBQUMwRCxNQUFOLENBQWFjLE1BQWIsQ0FBb0IsSUFBSUMsS0FBSyxDQUFDQyxPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQXBCO0FBQ0QsT0FORCxFQU9DQyxVQVBELENBT1ksWUFBTTtBQUNoQlQsZ0JBQVE7QUFDVCxPQVRELEVBVUNVLE1BVkQsQ0FVUVIsS0FBSyxDQUFDUyxNQUFOLENBQWFDLE1BQWIsQ0FBb0JDLElBVjVCLEVBV0NDLEtBWEQ7QUFZRDs7Ozs7O0FBR1lyRCx5RUFBZixFOzs7Ozs7Ozs7Ozs7QUM1TEE7QUFBQTtBQUFPLElBQU1zRCxTQUFTLEdBQUcsQ0FDdkI7QUFDRXBCLE9BQUssRUFBRSxDQURUO0FBRUVxQixLQUFHLEVBQUUsbUJBRlA7QUFHRTlELE1BQUksRUFBRTtBQUhSLENBRHVCLEVBTXZCO0FBQ0V5QyxPQUFLLEVBQUUsQ0FEVDtBQUVFcUIsS0FBRyxFQUFFLG1CQUZQO0FBR0U5RCxNQUFJLEVBQUU7QUFIUixDQU51QixFQVd2QjtBQUNFeUMsT0FBSyxFQUFFLENBRFQ7QUFFRXFCLEtBQUcsRUFBRSxtQkFGUDtBQUdFOUQsTUFBSSxFQUFFO0FBSFIsQ0FYdUIsRUFnQnZCO0FBQ0V5QyxPQUFLLEVBQUUsQ0FEVDtBQUVFcUIsS0FBRyxFQUFFLG1CQUZQO0FBR0U5RCxNQUFJLEVBQUUsSUFIUjtBQUlFK0QsU0FBTyxFQUFFLENBQUM7QUFDUkMsUUFBSSxFQUFFO0FBREUsR0FBRDtBQUpYLENBaEJ1QixFQXdCdkI7QUFDRXZCLE9BQUssRUFBRSxDQURUO0FBRUVxQixLQUFHLEVBQUUsbUJBRlA7QUFHRTlELE1BQUksRUFBRTtBQUhSLENBeEJ1QixDQUFsQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOztJQUVNaUUsSzs7O0FBQ0osbUJBQWM7QUFBQTs7QUFDWixTQUFLQyxXQUFMLEdBQW1CLElBQUliLEtBQUssQ0FBQ2MsVUFBVixDQUFxQnZGLHVEQUFLLENBQUM0QyxLQUEzQixFQUFrQzVDLHVEQUFLLENBQUMwRCxNQUF4QyxDQUFuQjtBQUNEOzs7O21DQUtjO0FBQ2I7QUFNRDs7O3FDQUVnQjtBQUNmO0FBOEJEOzs7NEJBRVE4QixHLEVBQUs7QUFDWixVQUFJQyxRQUFRLEdBQUcsSUFBSWhCLEtBQUssQ0FBQ2lCLGNBQVYsQ0FBMEIsQ0FBMUIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsQ0FBZjtBQUNBLFVBQUlyRSxRQUFRLEdBQUcsSUFBSW9ELEtBQUssQ0FBQ2tCLGlCQUFWLENBQTZCO0FBQUVwRCxhQUFLLEVBQUUsU0FBVDtBQUFvQnFELFlBQUksRUFBRW5CLEtBQUssQ0FBQ29CO0FBQWhDLE9BQTdCLENBQWY7QUFDQSxVQUFJQyxNQUFNLEdBQUcsSUFBSXJCLEtBQUssQ0FBQ3NCLElBQVYsQ0FBZU4sUUFBZixFQUF5QnBFLFFBQXpCLENBQWI7QUFDQXlFLFlBQU0sQ0FBQ2xGLFFBQVAsQ0FBZ0IrQyxHQUFoQixDQUFvQjZCLEdBQUcsQ0FBQ3pCLENBQXhCLEVBQTJCeUIsR0FBRyxDQUFDM0UsQ0FBL0IsRUFBa0MyRSxHQUFHLENBQUN4QixDQUF0QztBQUNBOEIsWUFBTSxDQUFDRSxRQUFQLENBQWdCakMsQ0FBaEIsR0FBb0IsQ0FBQyxHQUFELEdBQU9rQyxJQUFJLENBQUNDLEVBQWhDO0FBQ0FsRyw2REFBSyxDQUFDNEMsS0FBTixDQUFZdUQsR0FBWixDQUFpQkwsTUFBakI7QUFDQUEsWUFBTSxDQUFDMUUsSUFBUCxHQUFjLE9BQWQ7QUFDQTBFLFlBQU0sQ0FBQ00sTUFBUCxDQUFjQyxNQUFkLENBQXFCLENBQXJCO0FBRUEsVUFBSUMsT0FBTyxHQUFHLElBQUk3QixLQUFLLENBQUM4QixtQkFBVixDQUErQixRQUEvQixFQUF5QyxDQUFFLENBQUYsRUFBSyxHQUFMLEVBQVUsQ0FBVixFQUFhLEdBQWIsRUFBa0IsQ0FBbEIsQ0FBekMsRUFBZ0UsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsR0FBckMsRUFBMEMsR0FBMUMsRUFBK0MsR0FBL0MsRUFBb0QsR0FBcEQsRUFBeUQsR0FBekQsRUFBOEQsR0FBOUQsRUFBbUUsR0FBbkUsRUFBd0UsR0FBeEUsQ0FBaEUsQ0FBZDtBQUNBLFVBQUlDLElBQUksR0FBRyxJQUFJL0IsS0FBSyxDQUFDZ0MsYUFBVixDQUF5QixRQUF6QixFQUFtQyxDQUFuQyxFQUFzQyxDQUFFSCxPQUFGLENBQXRDLENBQVg7QUFDQWpCLFdBQUssQ0FBQ3FCLEtBQU4sR0FBYyxJQUFJakMsS0FBSyxDQUFDa0MsY0FBVixDQUEwQmIsTUFBMUIsQ0FBZDtBQUNBLFVBQUljLFVBQVUsR0FBR3ZCLEtBQUssQ0FBQ3FCLEtBQU4sQ0FBWUUsVUFBWixDQUF3QkosSUFBeEIsQ0FBakIsQ0FiWSxDQWNaOztBQUNBSSxnQkFBVSxDQUFDQyxJQUFYLEdBZlksQ0FpQlo7QUFDQTtBQUNBO0FBQ0Q7OztpQ0FFWXZELE0sRUFBUTtBQUNuQixVQUFJd0QsY0FBYyxHQUFHOUcsdURBQUssQ0FBQzRDLEtBQU4sQ0FBWW1FLGVBQVosQ0FBNEJ6RCxNQUFNLENBQUNsQyxJQUFuQyxDQUFyQjtBQUNBcEIsNkRBQUssQ0FBQzRDLEtBQU4sQ0FBWW9FLE1BQVosQ0FBb0JGLGNBQXBCLEVBRm1CLENBR25CO0FBQ0g7OzttQ0FFaUI7QUFDZCxVQUFJRyxTQUFTLEdBQUcsSUFBSXhDLEtBQUssQ0FBQ3lDLGVBQVYsQ0FBMEIsSUFBSXpDLEtBQUssQ0FBQzBDLE9BQVYsQ0FBa0JDLE1BQU0sQ0FBQ0MsVUFBekIsRUFBcUNELE1BQU0sQ0FBQ0UsV0FBNUMsQ0FBMUIsRUFBb0YsR0FBcEYsRUFBeUYsR0FBekYsRUFBOEYsSUFBOUYsQ0FBaEIsQ0FEYyxDQUdkO0FBQ0E7QUFDQTs7QUFFQUwsZUFBUyxDQUFDTSxTQUFWLEdBQXNCLENBQXRCO0FBQ0FOLGVBQVMsQ0FBQ08sUUFBVixHQUFxQixFQUFyQjtBQUNBUCxlQUFTLENBQUNRLE1BQVYsR0FBbUIsR0FBbkI7QUFFQSxXQUFLQyxhQUFMLEdBQXFCLElBQUlqRCxLQUFLLENBQUNrRCxjQUFWLENBQXlCM0gsdURBQUssQ0FBQzRILFFBQS9CLENBQXJCO0FBQ0EsV0FBS0YsYUFBTCxDQUFtQkcsYUFBbkIsQ0FBaUNDLE9BQWpDLENBQXlDQyxNQUF6QyxHQUFrRHRELEtBQUssQ0FBQ3VELFVBQXhEO0FBQ0EsV0FBS04sYUFBTCxDQUFtQk8sYUFBbkIsQ0FBaUNILE9BQWpDLENBQXlDQyxNQUF6QyxHQUFrRHRELEtBQUssQ0FBQ3VELFVBQXhEO0FBQ0EsV0FBS04sYUFBTCxDQUFtQlEsY0FBbkIsR0FBb0MsS0FBcEM7QUFDQSxXQUFLUixhQUFMLENBQW1CUyxPQUFuQixDQUEyQmYsTUFBTSxDQUFDQyxVQUFQLEdBQW9CRCxNQUFNLENBQUNnQixnQkFBdEQsRUFBd0VoQixNQUFNLENBQUNFLFdBQVAsR0FBcUJGLE1BQU0sQ0FBQ2dCLGdCQUFwRztBQUNBLFdBQUtWLGFBQUwsQ0FBbUJXLE9BQW5CLENBQTRCLEtBQUsvQyxXQUFqQztBQUNBLFdBQUtvQyxhQUFMLENBQW1CVyxPQUFuQixDQUE0QnBCLFNBQTVCO0FBRUEsYUFBTyxLQUFLUyxhQUFaO0FBQ0Q7OzttQ0FFZTtBQUNkLFVBQUlZLFNBQVMsR0FBRyxJQUFJN0QsS0FBSyxDQUFDOEQsVUFBVixDQUNkLElBQUk5RCxLQUFLLENBQUMrRCxjQUFWLENBQXlCO0FBQ3ZCQyxnQkFBUSxFQUFFO0FBQ1I7QUFDQUMscUJBQVcsRUFBRTtBQUFDeEYsaUJBQUssRUFBRTtBQUFSLFdBRkw7QUFHUnlGLHNCQUFZLEVBQUU7QUFBQ3pGLGlCQUFLLEVBQUUsS0FBS3dFLGFBQUwsQ0FBbUJPLGFBQW5CLENBQWlDSDtBQUF6QztBQUhOLFNBRGE7QUFNdkJjLG9CQUFZLEVBQUUsS0FBS0EsWUFBTCxFQU5TO0FBT3ZCQyxzQkFBYyxFQUFFLEtBQUtBLGNBQUwsRUFQTztBQVF2QkMsZUFBTyxFQUFFO0FBUmMsT0FBekIsQ0FEYyxFQVVWLGFBVlUsQ0FBaEI7QUFhQSxVQUFJQyxhQUFhLEdBQUcsSUFBSXRFLEtBQUssQ0FBQ2tELGNBQVYsQ0FBMEIzSCx1REFBSyxDQUFDNEgsUUFBaEMsQ0FBcEI7QUFDQW1CLG1CQUFhLENBQUNsQixhQUFkLENBQTRCRSxNQUE1QixHQUFxQ3RELEtBQUssQ0FBQ3VELFVBQTNDO0FBQ0FlLG1CQUFhLENBQUNkLGFBQWQsQ0FBNEJGLE1BQTVCLEdBQXFDdEQsS0FBSyxDQUFDdUQsVUFBM0M7QUFDQWUsbUJBQWEsQ0FBQ1osT0FBZCxDQUF1QmYsTUFBTSxDQUFDQyxVQUFQLEdBQW9CRCxNQUFNLENBQUNnQixnQkFBbEQsRUFBb0VoQixNQUFNLENBQUNFLFdBQVAsR0FBcUJGLE1BQU0sQ0FBQ2dCLGdCQUFoRztBQUNBVyxtQkFBYSxDQUFDVixPQUFkLENBQXVCLEtBQUsvQyxXQUE1QjtBQUNBeUQsbUJBQWEsQ0FBQ1YsT0FBZCxDQUF1QkMsU0FBdkI7QUFDQVMsbUJBQWEsQ0FBQ0MsU0FBZCxHQUEwQixJQUExQjtBQUVBLGFBQU9ELGFBQVA7QUFDRDs7O3dCQXRIVztBQUFFLGFBQU8sS0FBS3JDLEtBQVo7QUFBbUIsSztzQkFDdkI1QyxHLEVBQUs7QUFBRSxXQUFLNEMsS0FBTCxHQUFhNUMsR0FBYjtBQUFrQjs7Ozs7O0FBeUh0QnVCLG9FQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSUE7QUFDQTtDQUMwRDs7SUFDcEQ0RCxJOzs7QUFDSixrQkFBYztBQUFBO0FBQUU7QUFFaEI7Ozs7Ozs7Ozs7K0JBTVlDLEUsRUFBSUMsQyxFQUFHQyxVLEVBQVk7QUFDN0IsVUFBSUQsQ0FBQyxDQUFDakgsTUFBRixJQUFhaUgsQ0FBQyxDQUFDakgsTUFBRixDQUFTbUgsUUFBVCxDQUFrQkMsV0FBbEIsT0FBb0MsS0FBckQsRUFBNkQ7QUFDM0Q7QUFDQSxZQUFJQyxHQUFHLEdBQUdKLENBQUMsQ0FBQ2pILE1BQUYsQ0FBU3FILEdBQVQsQ0FBYUMsS0FBYixDQUFtQixHQUFuQixFQUF3QkMsR0FBeEIsRUFBVixDQUYyRCxDQUczRDs7QUFDQSxZQUFJQyxHQUFHLEdBQUdSLEVBQUUsQ0FBQ3BJLFFBQUgsQ0FBWSxDQUFaLEVBQWVBLFFBQWYsQ0FBd0IsQ0FBeEIsQ0FBVjtBQUNBLFlBQUk2SSxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFWLENBTDJELENBTTNEOztBQUNBLFlBQUlDLElBQUksR0FBR0MsS0FBSyxDQUFDQyxPQUFOLEdBQWdCTixHQUFHLENBQUNPLFdBQUosR0FBa0IsQ0FBN0M7QUFDQSxZQUFJQyxJQUFJLEdBQUdILEtBQUssQ0FBQ0ksT0FBTixHQUFnQlQsR0FBRyxDQUFDVSxZQUFKLEdBQW1CLENBQTlDO0FBRUFULFdBQUcsQ0FBQ0osR0FBSixzQkFBc0JBLEdBQXRCO0FBQ0FJLFdBQUcsQ0FBQ1UsS0FBSixDQUFVQyxLQUFWLEdBQWtCLE1BQWxCO0FBQ0FYLFdBQUcsQ0FBQ1UsS0FBSixDQUFVekosUUFBVixHQUFxQixVQUFyQjtBQUNBK0ksV0FBRyxDQUFDVSxLQUFKLENBQVVFLElBQVYsR0FBaUJULElBQUksR0FBRyxJQUF4QjtBQUNBSCxXQUFHLENBQUNVLEtBQUosQ0FBVUcsR0FBVixHQUFnQk4sSUFBSSxHQUFHLElBQXZCO0FBQ0FOLGdCQUFRLENBQUNhLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmYsR0FBMUIsRUFmMkQsQ0FpQjNEOztBQUNBQyxnQkFBUSxDQUFDZSxXQUFULEdBQXVCLFVBQVVaLEtBQVYsRUFBaUI7QUFDdENBLGVBQUssR0FBR0EsS0FBSyxJQUFJM0MsTUFBTSxDQUFDMkMsS0FBeEI7QUFDQSxjQUFJRCxJQUFJLEdBQUdDLEtBQUssQ0FBQ0MsT0FBTixHQUFnQk4sR0FBRyxDQUFDTyxXQUFKLEdBQWtCLENBQTdDO0FBQ0EsY0FBSUMsSUFBSSxHQUFHSCxLQUFLLENBQUNJLE9BQU4sR0FBZ0JULEdBQUcsQ0FBQ1UsWUFBSixHQUFtQixDQUE5QztBQUNBVCxhQUFHLENBQUNVLEtBQUosQ0FBVUUsSUFBVixHQUFpQlQsSUFBSSxHQUFHLElBQXhCO0FBQ0FILGFBQUcsQ0FBQ1UsS0FBSixDQUFVRyxHQUFWLEdBQWdCTixJQUFJLEdBQUcsSUFBdkI7QUFDRCxTQU5ELENBbEIyRCxDQTBCM0Q7OztBQUNBUCxXQUFHLENBQUNpQixXQUFKLEdBQWtCLFVBQVViLEtBQVYsRUFBaUI7QUFDakNBLGVBQUssR0FBR0EsS0FBSyxJQUFJM0MsTUFBTSxDQUFDMkMsS0FBeEI7QUFDQUgsa0JBQVEsQ0FBQ2UsV0FBVCxHQUF1QixJQUF2QjtBQUNBZixrQkFBUSxDQUFDYSxJQUFULENBQWNJLFdBQWQsQ0FBMEJsQixHQUExQjtBQUNBLGNBQUltQixTQUFTLEdBQUdDLHlFQUFhLENBQUM7QUFBQ2hILGFBQUMsRUFBRWdHLEtBQUssQ0FBQ0MsT0FBVjtBQUFtQm5KLGFBQUMsRUFBRWtKLEtBQUssQ0FBQ0k7QUFBNUIsV0FBRCxDQUE3QixDQUppQyxDQU1qQzs7QUFDQSxjQUFJYSxNQUFNLEdBQUcsSUFBSUMsc0RBQUosRUFBYjtBQUNBLGNBQUlDLEtBQUssR0FBRyxJQUFJekcsS0FBSyxDQUFDQyxPQUFWLENBQWtCLEVBQWxCLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLENBQVo7QUFDQSxjQUFJckMsSUFBSSxHQUFHMkksTUFBTSxDQUFDRyxTQUFQLENBQWlCeEIsR0FBRyxDQUFDSixHQUFyQixFQUEwQjJCLEtBQTFCLENBQVg7QUFDQTdJLGNBQUksQ0FBQ3pCLFFBQUwsQ0FBY21ELENBQWQsR0FBa0IrRyxTQUFTLENBQUMvRyxDQUE1QjtBQUNBMUIsY0FBSSxDQUFDekIsUUFBTCxDQUFjQyxDQUFkLEdBQWtCLEVBQWxCO0FBQ0F3QixjQUFJLENBQUN6QixRQUFMLENBQWNvRCxDQUFkLEdBQWtCLENBQUM4RyxTQUFTLENBQUNqSyxDQUE3QjtBQUVBYixpRUFBSyxDQUFDQyxTQUFOLENBQWdCYSxRQUFoQixDQUF5QmQsdURBQUssQ0FBQ0MsU0FBTixDQUFnQmMsUUFBaEIsQ0FBeUJFLE9BQWxELEVBQTJEa0YsR0FBM0QsQ0FBK0Q5RCxJQUEvRDtBQUNBK0csb0JBQVUsQ0FBQ2dDLElBQVgsQ0FBZ0IvSSxJQUFoQixFQWZpQyxDQWdCakM7QUFFRCxTQWxCRDtBQW1CRDtBQUNGOzs7c0NBRWtCZ0osVSxFQUFZO0FBQzdCLFVBQUlDLFNBQVMsR0FBRzFCLFFBQVEsQ0FBQzJCLGNBQVQsQ0FBd0Isc0JBQXhCLENBQWhCOztBQUNBLFVBQUlGLFVBQUosRUFBZ0I7QUFDZCxZQUFJRyxFQUFFLEdBQUc1QixRQUFRLENBQUM2QixzQkFBVCxDQUFnQyxpQkFBaEMsRUFBbUQsQ0FBbkQsQ0FBVDtBQUNBLFlBQUlDLElBQUksR0FBRzlCLFFBQVEsQ0FBQzZCLHNCQUFULENBQWdDLFlBQWhDLEVBQThDLENBQTlDLENBQVg7QUFDQUMsWUFBSSxDQUFDQyxZQUFMLENBQWtCLGNBQWxCLEVBQWtDLEtBQWxDO0FBQ0FILFVBQUUsQ0FBQ25CLEtBQUgsQ0FBU0MsS0FBVCxHQUFpQixLQUFqQixDQUpjLENBS2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxZQUFJc0IsRUFBRSxHQUFHUCxVQUFVLENBQUN4SyxDQUFYLEdBQWUsR0FBeEI7QUFDQSxZQUFJZ0wsRUFBRSxHQUFHUixVQUFVLENBQUN0SCxDQUFYLEdBQWUsR0FBeEI7O0FBQ0EsWUFBSThILEVBQUUsR0FBRyxDQUFULEVBQWE7QUFDWEEsWUFBRSxHQUFHLENBQUw7QUFDRDs7QUFDRCxZQUFJRCxFQUFFLEdBQUcsQ0FBVCxFQUFZO0FBQ1YsY0FBS0MsRUFBRSxHQUFHLEdBQUwsR0FBVVIsVUFBVSxDQUFDdEgsQ0FBdEIsSUFBNEIsTUFBTXNILFVBQVUsQ0FBQ3hLLENBQWpELEVBQW9EO0FBQ2xEMkssY0FBRSxDQUFDbkIsS0FBSCxDQUFTRyxHQUFULEdBQWVhLFVBQVUsQ0FBQ3hLLENBQVgsR0FBZSxJQUE5QjtBQUNBMkssY0FBRSxDQUFDbkIsS0FBSCxDQUFTeUIsS0FBVCxHQUFpQixDQUFDLEVBQUQsR0FBTSxJQUF2QjtBQUNBTixjQUFFLENBQUNuQixLQUFILENBQVNDLEtBQVQsR0FBaUIsS0FBSyxJQUF0QjtBQUNBb0IsZ0JBQUksQ0FBQ0MsWUFBTCxDQUFrQixjQUFsQixFQUFrQyxJQUFsQztBQUNBRSxjQUFFLElBQUksRUFBTjtBQUNEOztBQUNERCxZQUFFLEdBQUcsQ0FBTDtBQUNEOztBQUNETixpQkFBUyxDQUFDakIsS0FBVixDQUFnQkcsR0FBaEIsR0FBc0JvQixFQUFFLEdBQUcsSUFBM0I7QUFDQU4saUJBQVMsQ0FBQ2pCLEtBQVYsQ0FBZ0JFLElBQWhCLEdBQXVCc0IsRUFBRSxHQUFHLElBQTVCO0FBQ0FQLGlCQUFTLENBQUNqQixLQUFWLENBQWdCMEIsT0FBaEIsR0FBMEIsT0FBMUI7QUFDRCxPQTVCRCxNQTRCTztBQUNMVCxpQkFBUyxDQUFDakIsS0FBVixDQUFnQjBCLE9BQWhCLEdBQTBCLE1BQTFCO0FBQ0Q7QUFDRjs7Ozs7O0FBRVk5QyxtRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBOzs7Ozs7SUFLTStDLEc7OztBQUNKLGlCQUFjO0FBQUE7O0FBQ1osU0FBS0MsTUFBTCxHQUFjLElBQUl4SCxLQUFLLENBQUN5SCxTQUFWLEVBQWQ7QUFDRCxHLENBRUQ7Ozs7O3FDQUNpQjtBQUNmLGFBQU8sSUFBSXpILEtBQUssQ0FBQzBILFFBQVYsRUFBUDtBQUNELEssQ0FFRDs7OzswQ0FDc0JDLEssRUFBTztBQUMzQixhQUFPLElBQUkzSCxLQUFLLENBQUM0SCxxQkFBVixDQUFnQ0QsS0FBaEMsRUFBdUM7QUFDNUNFLGFBQUssRUFBRSxDQURxQztBQUU1Q0Msb0JBQVksRUFBRTtBQUY4QixPQUF2QyxDQUFQO0FBSUQsSyxDQUVEOzs7O21DQUNlM0ssTyxFQUFTO0FBQ3RCLGFBQU8sSUFBSTZDLEtBQUssQ0FBQytILGlCQUFWLENBQTRCNUssT0FBNUIsQ0FBUDtBQUNELEssQ0FFRDs7OzsrQkFDV3dLLEssRUFBT3hLLE8sRUFBU1IsSSxFQUFNO0FBQy9CLFVBQUlxTCxHQUFHLEdBQUcsS0FBS0MsY0FBTCxFQUFWO0FBQ0EsVUFBSUMsVUFBVSxHQUFHLEtBQUtDLHFCQUFMLENBQTJCUixLQUEzQixDQUFqQjtBQUNBSyxTQUFHLENBQUNJLGtCQUFKLENBQXVCRixVQUF2QjtBQUNBRixTQUFHLENBQUNLLFNBQUosQ0FBYyxDQUFDLEdBQWYsRUFBb0IsQ0FBQyxHQUFyQixFQUEwQixDQUExQjtBQUNBLFVBQUlDLEdBQUcsR0FBRyxLQUFLQyxjQUFMLENBQW9CcEwsT0FBcEIsRUFBNkJSLElBQTdCLENBQVY7QUFDQSxVQUFJaUIsSUFBSSxHQUFHLElBQUlvQyxLQUFLLENBQUNzQixJQUFWLENBQWUwRyxHQUFmLEVBQW9CTSxHQUFwQixDQUFYO0FBQ0ExSyxVQUFJLENBQUNqQixJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFPaUIsSUFBUDtBQUNEOzs7aUNBRVk2QyxHLEVBQUsrSCxRLEVBQThCO0FBQUEsVUFBcEJDLE9BQW9CLHVFQUFWLFlBQU0sQ0FBRSxDQUFFO0FBQzlDLFdBQUtqQixNQUFMLENBQVlrQixJQUFaLENBQWlCakksR0FBakIsRUFBc0IsVUFBQWtJLElBQUksRUFBSTtBQUM1QixZQUFJQyxLQUFLLEdBQUdELElBQUksQ0FBQ0MsS0FBakI7QUFDQUEsYUFBSyxDQUFDbk0sT0FBTixDQUFjLFVBQUFvTSxJQUFJLEVBQUk7QUFDcEIsY0FBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLFFBQUwsQ0FBYyxJQUFkLENBQWI7QUFDQUQsZ0JBQU0sQ0FBQ3JNLE9BQVAsQ0FBZSxVQUFBa0wsS0FBSyxFQUFJO0FBQ3RCYSxvQkFBUSxDQUFDSyxJQUFELEVBQU9sQixLQUFQLENBQVI7QUFDRCxXQUZEO0FBR0QsU0FMRDtBQU1BYyxlQUFPLENBQUMsSUFBRCxDQUFQO0FBQ0QsT0FURDtBQVVEOzs7NEJBRU8vTCxJLEVBQU1SLEssRUFBT3NNLFEsRUFBVTtBQUFBOztBQUU3QixVQUFNUSxjQUFjLEdBQUcsQ0FBQ3RNLElBQUksQ0FBQzBDLEtBQUwsR0FBYSxDQUFkLElBQW1CLEdBQW5CLEdBQXlCLEVBQWhEO0FBRUEsV0FBSzZKLFlBQUwsQ0FBa0J2TSxJQUFJLENBQUMrRCxHQUF2QixFQUE0QixVQUFDb0ksSUFBRCxFQUFPbEIsS0FBUCxFQUFpQjtBQUMzQyxZQUFNeEssT0FBTyxHQUFHO0FBQ2RXLGVBQUssRUFBRStLLElBQUksQ0FBQy9LLEtBREU7QUFFZG9MLHFCQUFXLEVBQUUsSUFGQztBQUdkck0saUJBQU8sRUFBRVgsS0FBSyxDQUFDQyxRQUFOLENBQWVDLENBQWYsR0FBbUIsR0FBbkIsSUFBMEJGLEtBQUssQ0FBQ0MsUUFBTixDQUFlQyxDQUFmLEdBQW1CLENBQUMsR0FBOUMsR0FBb0QsQ0FBcEQsR0FBd0QsQ0FIbkQ7QUFJZCtFLGNBQUksRUFBRW5CLEtBQUssQ0FBQ29CO0FBSkUsU0FBaEI7O0FBT0EsWUFBSXhELElBQUksR0FBRyxLQUFJLENBQUN1TCxVQUFMLENBQWdCeEIsS0FBaEIsRUFBdUJ4SyxPQUF2QixFQUFnQyxPQUFoQyxDQUFYOztBQUNBUyxZQUFJLENBQUMyRCxRQUFMLENBQWNyQyxHQUFkLENBQWtCLE1BQU1zQyxJQUFJLENBQUNDLEVBQTdCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0E3RCxZQUFJLENBQUN0QixRQUFMLENBQWMwTSxjQUFkLEdBQStCQSxjQUEvQjtBQUNBcEwsWUFBSSxDQUFDdEIsUUFBTCxDQUFjd0IsS0FBZCxHQUFzQjtBQUNwQlksV0FBQyxFQUFFZCxJQUFJLENBQUNoQixRQUFMLENBQWNrQixLQUFkLENBQW9CWSxDQURIO0FBRXBCQyxXQUFDLEVBQUVmLElBQUksQ0FBQ2hCLFFBQUwsQ0FBY2tCLEtBQWQsQ0FBb0JhLENBRkg7QUFHcEJDLFdBQUMsRUFBRWhCLElBQUksQ0FBQ2hCLFFBQUwsQ0FBY2tCLEtBQWQsQ0FBb0JjO0FBSEgsU0FBdEI7QUFNQTFDLGFBQUssQ0FBQ3dGLEdBQU4sQ0FBVTlELElBQVY7QUFFRCxPQW5CRCxFQW1CRzRLLFFBbkJIO0FBb0JBdE0sV0FBSyxDQUFDQyxRQUFOLENBQWVDLENBQWYsR0FBbUI0TSxjQUFuQjtBQUNELEssQ0FFRDs7Ozs4QkFDVXRNLEksRUFBTVIsSyxFQUFPa04sUyxFQUFXO0FBQUE7O0FBQ2hDLFVBQU1KLGNBQWMsR0FBRyxDQUFDdE0sSUFBSSxDQUFDMEMsS0FBTCxHQUFhLENBQWQsSUFBbUIsR0FBbkIsR0FBeUIsRUFBaEQ7QUFDQWxELFdBQUssQ0FBQ0ksUUFBTixDQUFlcUIsU0FBZixHQUEyQnFMLGNBQTNCO0FBQ0EsV0FBS0MsWUFBTCxDQUFrQixxQkFBbEIsRUFBeUMsVUFBQ0osSUFBRCxFQUFPbEIsS0FBUCxFQUFpQjtBQUN4RCxZQUFNeEssT0FBTyxHQUFHO0FBQ2RXLGVBQUssRUFBRSxTQURPO0FBRWRvTCxxQkFBVyxFQUFFLElBRkM7QUFHZDtBQUNBck0saUJBQU8sRUFBRVgsS0FBSyxDQUFDQyxRQUFOLENBQWVDLENBQWYsR0FBbUIsR0FBbkIsSUFBMEJGLEtBQUssQ0FBQ0MsUUFBTixDQUFlQyxDQUFmLEdBQW1CLENBQUMsR0FBOUMsR0FBb0QsQ0FBcEQsR0FBd0Q7QUFKbkQsU0FBaEI7O0FBT0EsWUFBSXdCLElBQUksR0FBRyxNQUFJLENBQUN1TCxVQUFMLENBQWdCeEIsS0FBaEIsRUFBdUJ4SyxPQUF2QixFQUFnQyxPQUFoQyxDQUFYOztBQUNBUyxZQUFJLENBQUMyRCxRQUFMLENBQWNyQyxHQUFkLENBQWtCLE1BQU1zQyxJQUFJLENBQUNDLEVBQTdCLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDO0FBQ0E3RCxZQUFJLENBQUN6QixRQUFMLENBQWNDLENBQWQsR0FBa0IsQ0FBQyxDQUFuQjtBQUNBd0IsWUFBSSxDQUFDdEIsUUFBTCxHQUFnQjtBQUNkME0sd0JBQWMsRUFBRUEsY0FERjtBQUVkSyxtQkFBUyxFQUFFM007QUFGRyxTQUFoQjtBQUlBME0saUJBQVMsQ0FBQ3pDLElBQVYsQ0FBZS9JLElBQWY7QUFDQTFCLGFBQUssQ0FBQ3dGLEdBQU4sQ0FBVTlELElBQVY7QUFDQVQsZUFBTyxDQUFDTixPQUFSLEdBQWtCWCxLQUFLLENBQUNJLFFBQU4sQ0FBZUMsTUFBZixHQUF3QixJQUExQyxHQUFpREwsS0FBSyxDQUFDSSxRQUFOLENBQWVDLE1BQWYsR0FBd0IsS0FBekU7QUFDRCxPQWxCRDtBQW1CRCxLLENBR0Q7Ozs7bUNBQ2VvRSxJLEVBQU16RSxLLEVBQU87QUFDMUIsVUFBTXFLLE1BQU0sR0FBRyxJQUFJQyxzREFBSixFQUFmO0FBQ0EsVUFBTThDLE1BQU0sR0FBRztBQUNiek0sZUFBTyxFQUFFO0FBREksT0FBZjtBQUdBLFVBQU00SixLQUFLLEdBQUcsSUFBSXpHLEtBQUssQ0FBQ0MsT0FBVixDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUEwQixFQUExQixDQUFkO0FBQ0EsVUFBSXJDLElBQUksR0FBRzJJLE1BQU0sQ0FBQ0csU0FBUCxDQUFpQi9GLElBQWpCLEVBQXVCOEYsS0FBdkIsRUFBOEI2QyxNQUE5QixDQUFYO0FBQ0FwTixXQUFLLENBQUN3RixHQUFOLENBQVU5RCxJQUFWO0FBQ0QsSyxDQUVEOzs7O29DQUNnQmpCLEksRUFBTVQsSyxFQUFPO0FBQzNCLFVBQU1xTixRQUFRLEdBQUcsRUFBakI7QUFDQSxVQUFJaEQsTUFBTSxHQUFHLElBQUlDLHNEQUFKLEVBQWI7QUFDQSxVQUFJOEMsTUFBTSxHQUFHO0FBQ1h6TSxlQUFPLEVBQUVYLEtBQUssQ0FBQ0MsUUFBTixDQUFlQyxDQUFmLEdBQW1CLEdBQW5CLElBQTBCRixLQUFLLENBQUNDLFFBQU4sQ0FBZUMsQ0FBZixHQUFtQixDQUFDLEdBQTlDLEdBQW9ELENBQXBELEdBQXdEO0FBRHRELE9BQWI7QUFHQSxVQUFJd0IsSUFBSSxHQUFHMkksTUFBTSxDQUFDaUQsVUFBUCxDQUFrQjdNLElBQWxCLEVBQXdCNE0sUUFBeEIsRUFBa0NELE1BQWxDLENBQVg7QUFDQXBOLFdBQUssQ0FBQ3dGLEdBQU4sQ0FBVTlELElBQVY7QUFDRDs7Ozs7O0FBR1kySixrRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xJQTs7SUFFTWtDLFM7OztBQUVKLHFCQUFhbkUsS0FBYixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLb0UsU0FBTCxHQUFpQixJQUFJMUosS0FBSyxDQUFDeUosU0FBVixFQUFqQjtBQUNEOzs7O2dDQUVZRSxPLEVBQVNuQixRLEVBQW9DO0FBQUEsVUFBMUJvQixhQUEwQix1RUFBVixZQUFNLENBQUUsQ0FBRTtBQUN4RCxVQUFNQyxLQUFLLEdBQUcsSUFBSTdKLEtBQUssQ0FBQzBDLE9BQVYsRUFBZDtBQUNBLFVBQU1vSCxTQUFTLEdBQUd2Tyx1REFBSyxDQUFDNEgsUUFBTixDQUFlNEcsVUFBakM7QUFFQUYsV0FBSyxDQUFDdkssQ0FBTixHQUFXLEtBQUtnRyxLQUFMLENBQVdDLE9BQVgsR0FBcUJ1RSxTQUFTLENBQUNFLFdBQWhDLEdBQStDLENBQS9DLEdBQW1ELENBQTdEO0FBQ0FILFdBQUssQ0FBQ3pOLENBQU4sR0FBVSxFQUFHLEtBQUtrSixLQUFMLENBQVdJLE9BQVgsR0FBcUJvRSxTQUFTLENBQUNHLFlBQWxDLElBQWtELENBQWxELEdBQXNELENBQWhFO0FBQ0EsV0FBS1AsU0FBTCxDQUFlUSxhQUFmLENBQTZCTCxLQUE3QixFQUFvQ3RPLHVEQUFLLENBQUMwRCxNQUExQztBQUVBLFVBQUlrTCxVQUFVLEdBQUcsS0FBS1QsU0FBTCxDQUFlVSxnQkFBZixDQUFnQ1QsT0FBaEMsQ0FBakI7O0FBQ0EsVUFBSVEsVUFBVSxDQUFDRSxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCN0IsZ0JBQVEsQ0FBQzJCLFVBQUQsQ0FBUjtBQUNELE9BRkQsTUFFTztBQUNMUCxxQkFBYTtBQUNkO0FBQ0Y7Ozs7OztBQUdZSCx3RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBOzs7Ozs7SUFNTWpELE07OztBQUVKLG9CQUFlO0FBQUE7QUFBRTtBQUVqQjs7Ozs7Ozs7Ozs7OytCQVFZOEQsSSxFQUFNZixRLEVBQVVnQixXLEVBQWE7QUFDdkMsVUFBTTFDLEtBQUssR0FBRyxJQUFkLENBRHVDLENBQ1c7O0FBQ2xELFVBQU1wQixLQUFLLEdBQUdvQixLQUFLLElBQUssSUFBSSxFQUFMLEdBQVcwQixRQUFmLENBQW5CLENBRnVDLENBRVc7QUFDbEQ7O0FBQ0EsVUFBSWlCLE1BQU0sR0FBR3JGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0FvRixZQUFNLENBQUNDLE1BQVAsR0FBZ0JELE1BQU0sQ0FBQzNFLEtBQVAsR0FBZTBELFFBQVEsR0FBRyxFQUExQztBQUVBLFVBQUltQixHQUFHLEdBQUdGLE1BQU0sQ0FBQ0csVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0FELFNBQUcsQ0FBQ0UsU0FBSixHQUFnQixTQUFoQjtBQUNBRixTQUFHLENBQUNHLElBQUosR0FBV3RCLFFBQVEsR0FBRyxXQUF0QjtBQUNBbUIsU0FBRyxDQUFDSSxRQUFKLENBQWFSLElBQWIsRUFBbUJFLE1BQU0sQ0FBQzNFLEtBQVAsR0FBZSxDQUFsQyxFQUFxQzJFLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixDQUFyRCxFQVZ1QyxDQVl2Qzs7QUFDQSxVQUFJcEgsT0FBTyxHQUFHLElBQUlyRCxLQUFLLENBQUMrSyxPQUFWLENBQWtCUCxNQUFsQixDQUFkO0FBQ0FuSCxhQUFPLENBQUMySCxXQUFSLEdBQXNCLElBQXRCLENBZHVDLENBY1g7QUFFNUI7O0FBQ0EsVUFBSTFCLE1BQU0sR0FBR2pNLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ3pCMk4sV0FBRyxFQUFFNUgsT0FEb0I7QUFFekI2RixtQkFBVyxFQUFFLElBRlk7QUFHekJnQyxpQkFBUyxFQUFFO0FBSGMsT0FBZCxFQUlWWCxXQUpVLENBQWI7O0FBS0EsVUFBSWhFLE1BQU0sR0FBRyxLQUFLNEUsYUFBTCxDQUFtQjdCLE1BQW5CLENBQWI7O0FBRUEvQyxZQUFNLENBQUM1SixJQUFQLEdBQWMsTUFBZDtBQUNBNEosWUFBTSxDQUFDRSxLQUFQLENBQWF2SCxHQUFiLENBQWlCdUgsS0FBakIsRUFBd0JBLEtBQXhCLEVBQStCQSxLQUEvQjtBQUNBRixZQUFNLENBQUNwSyxRQUFQLENBQWdCK0MsR0FBaEIsQ0FBb0IsQ0FBQyxHQUFyQixFQUEwQixFQUExQixFQUE4QixDQUE5QjtBQUNBLGFBQU9xSCxNQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs4QkFPVzZFLE0sRUFBUTNFLEssRUFBTzhELFcsRUFBYTtBQUNyQyxVQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDaEJBLG1CQUFXLEdBQUc7QUFBQzFOLGlCQUFPLEVBQUU7QUFBVixTQUFkO0FBQ0Q7O0FBQ0QsVUFBSXlNLE1BQU0sR0FBR2pNLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ3pCMk4sV0FBRyxFQUFFLElBQUlqTCxLQUFLLENBQUNxTCxhQUFWLEdBQTBCM0MsSUFBMUIsQ0FBK0IwQyxNQUEvQixDQURvQjtBQUV6QmxDLG1CQUFXLEVBQUUsSUFGWTtBQUd6QmdDLGlCQUFTLEVBQUU7QUFIYyxPQUFkLEVBSVZYLFdBSlUsQ0FBYjs7QUFLQSxVQUFJaEUsTUFBTSxHQUFHLEtBQUs0RSxhQUFMLENBQW1CN0IsTUFBbkIsQ0FBYjs7QUFFQS9DLFlBQU0sQ0FBQzVKLElBQVAsR0FBYyxNQUFkO0FBQ0E0SixZQUFNLENBQUNFLEtBQVAsQ0FBYXZILEdBQWIsQ0FBaUJ1SCxLQUFLLENBQUNuSCxDQUF2QixFQUEwQm1ILEtBQUssQ0FBQ3JLLENBQWhDLEVBQW1DcUssS0FBSyxDQUFDbEgsQ0FBekM7QUFDQWdILFlBQU0sQ0FBQ3BLLFFBQVAsQ0FBZ0IrQyxHQUFoQixDQUFvQixDQUFwQixFQUF1QixFQUF2QixFQUEyQixDQUEzQjtBQUVBLGFBQU9xSCxNQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7O2tDQU1lK0UsRyxFQUFLO0FBQ2xCLFVBQUkxTyxRQUFRLEdBQUcsSUFBSW9ELEtBQUssQ0FBQ3VMLGNBQVYsQ0FBeUJELEdBQXpCLENBQWY7QUFDQSxVQUFJL0UsTUFBTSxHQUFHLElBQUl2RyxLQUFLLENBQUN3RyxNQUFWLENBQWlCNUosUUFBakIsQ0FBYjtBQUNBLGFBQU8ySixNQUFQO0FBQ0Q7Ozs7OztBQUdZQyxxRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0N0RjBEO0FBQzFEOztDQUMwRDs7Q0FDQTs7Q0FDQTs7Q0FDQTtBQUMxRDs7Q0FDMEQ7O0NBQ0E7O0NBQ0E7QUFDMUQ7O0NBQzBEOztBQUMxRDs7QUFDQSxJQUFNZ0YsS0FBSyxHQUFHQyxtQkFBTyxDQUFDLDZEQUFELENBQXJCLEMsQ0FBMEQ7O0FBRTFEOzs7Ozs7O0FBT0E7Ozs7Ozs7OztJQU9xQmxRLEs7OztBQUNuQixpQkFBWWdELElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS21OLEtBQUwsR0FBYSxJQUFJMUwsS0FBSyxDQUFDMkwsS0FBVixFQUFiO0FBQ0QsRyxDQUVEOzs7OztBQXlCQTsyQkFDTztBQUVMLFdBQUs5RixLQUFMLEdBQWFsRCxNQUFNLENBQUNDLFVBQXBCLENBRkssQ0FFaUQ7O0FBQ3RELFdBQUs2SCxNQUFMLEdBQWM5SCxNQUFNLENBQUNFLFdBQXJCLENBSEssQ0FHaUQ7O0FBQ3RELFdBQUtpSCxTQUFMLEdBQWlCM0UsUUFBUSxDQUFDYSxJQUExQixDQUpLLENBSWlEOztBQUN0RCxXQUFLb0QsU0FBTCxHQUFpQixFQUFqQixDQUxLLENBS2lEOztBQUN0RCxXQUFLekUsVUFBTCxHQUFrQixFQUFsQixDQU5LLENBTWlEOztBQUV0RCxXQUFLaUgsVUFBTCxHQVJLLENBUWlEO0FBRXREOztBQUNBclEsV0FBSyxDQUFDNEMsS0FBTixHQUFjLElBQUk2QixLQUFLLENBQUM2TCxLQUFWLEVBQWQsQ0FYSyxDQVlMO0FBRUE7O0FBQ0EsVUFBTUMsT0FBTyxHQUFHLElBQUk5TCxLQUFLLENBQUNDLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsSUFBNUIsQ0FBaEI7QUFDQTFFLFdBQUssQ0FBQzBELE1BQU4sR0FBZSxJQUFJZSxLQUFLLENBQUMrTCxpQkFBVixDQUE0QixFQUE1QixFQUFnQyxLQUFLbEcsS0FBTCxHQUFhLEtBQUs0RSxNQUFsRCxFQUEwRCxDQUExRCxFQUE2RCxLQUE3RCxDQUFmO0FBQ0FsUCxXQUFLLENBQUMwRCxNQUFOLENBQWE5QyxRQUFiLENBQXNCK0MsR0FBdEIsQ0FBMEI0TSxPQUFPLENBQUN4TSxDQUFsQyxFQUFxQ3dNLE9BQU8sQ0FBQzFQLENBQTdDLEVBQWdEMFAsT0FBTyxDQUFDdk0sQ0FBeEQ7QUFDQWhFLFdBQUssQ0FBQzBELE1BQU4sQ0FBYTNDLFFBQWIsQ0FBc0JILFFBQXRCLEdBQWlDMlAsT0FBakMsQ0FsQkssQ0FrQmlEO0FBRXREOztBQUNBdlEsV0FBSyxDQUFDNEgsUUFBTixHQUFpQixJQUFJbkQsS0FBSyxDQUFDZ00sYUFBVixDQUF3QjtBQUN2Q0MsaUJBQVMsRUFBRSxJQUQ0QjtBQUV2Q0MsYUFBSyxFQUFFO0FBRmdDLE9BQXhCLENBQWpCO0FBSUEzUSxXQUFLLENBQUM0SCxRQUFOLENBQWVnSixhQUFmLENBQTZCeEosTUFBTSxDQUFDZ0IsZ0JBQXBDO0FBQ0FwSSxXQUFLLENBQUM0SCxRQUFOLENBQWVPLE9BQWYsQ0FBdUJmLE1BQU0sQ0FBQ0MsVUFBOUIsRUFBMENELE1BQU0sQ0FBQ0UsV0FBakQsRUExQkssQ0EyQkw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxXQUFLaUgsU0FBTCxDQUFlN0QsV0FBZixDQUEyQjFLLEtBQUssQ0FBQzRILFFBQU4sQ0FBZTRHLFVBQTFDO0FBRUF4TyxXQUFLLENBQUNDLFNBQU4sR0FBa0IsSUFBSXdFLEtBQUssQ0FBQ29NLEtBQVYsRUFBbEIsQ0FsQ0ssQ0FrQ2lEOztBQUN0RDdRLFdBQUssQ0FBQ29HLE1BQU4sR0FBZSxJQUFJM0IsS0FBSyxDQUFDcU0sTUFBVixFQUFmO0FBQ0E5USxXQUFLLENBQUNvRyxNQUFOLENBQWF6QyxHQUFiLENBQWlCLENBQWpCO0FBQ0EzRCxXQUFLLENBQUM4QyxNQUFOLEdBQWUsT0FBZixDQXJDSyxDQXFDaUQ7QUFFdEQ7O0FBQ0EsV0FBS2lPLGNBQUw7QUFDQSxXQUFLQyxXQUFMLEdBekNLLENBMENMOztBQUNBLFdBQUtDLGVBQUwsR0EzQ0ssQ0E2Q0w7O0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixJQUFJdlAsNkRBQUosRUFBbEIsQ0E5Q0ssQ0ErQ0w7O0FBQ0EsV0FBS3dQLElBQUwsR0FBWSxJQUFJbEksb0RBQUosRUFBWixDQWhESyxDQWtETDs7QUFDQSxXQUFLeUcsR0FBTCxHQUFXLElBQUkxRCxtREFBSixFQUFYO0FBQ0EsV0FBS29GLFlBQUwsR0FwREssQ0FzREw7O0FBQ0EsV0FBS0MsS0FBTCxHQUFhLElBQUloTSxxREFBSixFQUFiO0FBQ0EsV0FBS3FDLGFBQUwsR0FBcUIsS0FBSzJKLEtBQUwsQ0FBV0MsWUFBWCxFQUFyQjtBQUNBLFdBQUt2SSxhQUFMLEdBQXFCLEtBQUtzSSxLQUFMLENBQVdFLFlBQVgsRUFBckIsQ0F6REssQ0EwREw7O0FBQ0UsV0FBS0YsS0FBTCxDQUFXRyxPQUFYLENBQW1CO0FBQ2pCek4sU0FBQyxFQUFFa0MsSUFBSSxDQUFDd0wsTUFBTCxLQUFnQixHQUFoQixHQUFzQixHQURSO0FBRWpCNVEsU0FBQyxFQUFFLEdBRmM7QUFHakJtRCxTQUFDLEVBQUVpQyxJQUFJLENBQUN3TCxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCO0FBSFIsT0FBbkIsRUEzREcsQ0FnRUw7QUFFQTs7QUFDQSxXQUFLQyxZQUFMLEdBQW9CLElBQUk3Uiw2REFBSixFQUFwQjtBQUNBLFdBQUs2UixZQUFMLENBQWtCeFIsSUFBbEI7QUFFQSxXQUFLeVIsT0FBTDtBQUNELEssQ0FFRDs7Ozs4QkFDVTtBQUFBOztBQUNSdk4sV0FBSyxDQUFDWCxNQUFOO0FBRUEsVUFBSW1PLEtBQUssR0FBRyxLQUFLekIsS0FBTCxDQUFXMEIsUUFBWCxFQUFaOztBQUVBLFVBQUl4TSxxREFBSyxDQUFDcUIsS0FBVixFQUFpQjtBQUNmckIsNkRBQUssQ0FBQ3FCLEtBQU4sQ0FBWWpELE1BQVosQ0FBb0JtTyxLQUFwQjtBQUNEOztBQUVELFVBQUk3UixvREFBTSxDQUFDK1IsRUFBWCxFQUFlLEtBQUtDLE9BQUw7QUFDZixVQUFJaFMsb0RBQU0sQ0FBQ2lTLElBQVgsRUFBaUIsS0FBS0MsU0FBTDtBQUVqQkMsMkJBQXFCLENBQUMsWUFBTTtBQUMxQixhQUFJLENBQUNQLE9BQUw7QUFDRCxPQUZvQixDQUFyQjtBQUdBM1IsV0FBSyxDQUFDNEgsUUFBTixDQUFldUssTUFBZixDQUFzQm5TLEtBQUssQ0FBQzRDLEtBQTVCLEVBQW1DNUMsS0FBSyxDQUFDMEQsTUFBekMsRUFmUSxDQWdCUjs7QUFDQTFELFdBQUssQ0FBQzBELE1BQU4sQ0FBYTBDLE1BQWIsQ0FBb0J6QyxHQUFwQixDQUF5QixDQUF6QjtBQUNBLFdBQUsrRCxhQUFMLENBQW1CeUssTUFBbkI7QUFDQW5TLFdBQUssQ0FBQzBELE1BQU4sQ0FBYTBDLE1BQWIsQ0FBb0J6QyxHQUFwQixDQUF5QixDQUF6QixFQW5CUSxDQW9CUjs7QUFDQSxXQUFLb0YsYUFBTCxDQUFtQm9KLE1BQW5CO0FBRUFuUyxXQUFLLENBQUMwQyxRQUFOLENBQWVlLE1BQWY7QUFDRCxLLENBRUQ7Ozs7bUNBQ2U7QUFBQTs7QUFDYjtBQUNBd00sV0FBSyxDQUFDbUMsSUFBTixDQUFXbk4scURBQVgsRUFBc0IsVUFBQzlELElBQUQsRUFBT2tSLEVBQVAsRUFBYztBQUNsQyxZQUFJMVIsS0FBSyxHQUFHLElBQUk4RCxLQUFLLENBQUNvTSxLQUFWLEVBQVosQ0FEa0MsQ0FDdUI7O0FBQ3pEbFEsYUFBSyxDQUFDUyxJQUFOLEdBQWFELElBQUksQ0FBQ0MsSUFBbEI7QUFDQVQsYUFBSyxDQUFDSSxRQUFOLENBQWU4QyxLQUFmLEdBQXVCMUMsSUFBSSxDQUFDMEMsS0FBNUIsQ0FIa0MsQ0FHdUI7O0FBQ3pEbEQsYUFBSyxDQUFDSSxRQUFOLENBQWV1UixZQUFmLEdBQThCblIsSUFBSSxDQUFDMEMsS0FBbkMsQ0FKa0MsQ0FJdUI7O0FBQ3pEbEQsYUFBSyxDQUFDSSxRQUFOLENBQWVLLElBQWYsR0FBc0JELElBQUksQ0FBQ0MsSUFBM0IsQ0FMa0MsQ0FLdUI7O0FBRXpELGNBQUksQ0FBQ3NPLEdBQUwsQ0FBUzZDLE9BQVQsQ0FBaUJwUixJQUFqQixFQUF1QlIsS0FBdkIsRUFBOEIwUixFQUE5Qjs7QUFDQSxjQUFJLENBQUMzQyxHQUFMLENBQVM4QyxTQUFULENBQW1CclIsSUFBbkIsRUFBeUJSLEtBQXpCLEVBQWdDLE1BQUksQ0FBQ2tOLFNBQXJDOztBQUNBLGNBQUksQ0FBQzZCLEdBQUwsQ0FBUytDLGVBQVQsQ0FBeUJ0UixJQUFJLENBQUNDLElBQTlCLEVBQW9DVCxLQUFwQzs7QUFDQSxZQUFJUSxJQUFJLENBQUNnRSxPQUFULEVBQWtCO0FBQXVDO0FBQ3ZEaEUsY0FBSSxDQUFDZ0UsT0FBTCxDQUFhakUsT0FBYixDQUFxQixVQUFBaVEsSUFBSSxFQUFJO0FBQzNCLGtCQUFJLENBQUN6QixHQUFMLENBQVNnRCxjQUFULENBQXdCdkIsSUFBSSxDQUFDL0wsSUFBN0IsRUFBbUN6RSxLQUFuQztBQUNELFdBRkQ7QUFHRDs7QUFFRFgsYUFBSyxDQUFDQyxTQUFOLENBQWdCa0csR0FBaEIsQ0FBb0J4RixLQUFwQjtBQUNELE9BakJELEVBaUJHLFlBQU07QUFDUCxjQUFJLENBQUNnUyxlQUFMOztBQUNBM1MsYUFBSyxDQUFDNEMsS0FBTixDQUFZdUQsR0FBWixDQUFnQm5HLEtBQUssQ0FBQ0MsU0FBdEI7QUFDRCxPQXBCRDtBQXFCRCxLLENBRUQ7Ozs7c0NBQ21CO0FBQ2pCO0FBQ0EsVUFBSSxLQUFLK0MsSUFBVCxFQUFlO0FBQ2IsYUFBSzRQLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRDtBQUNGLEssQ0FFRDs7Ozs4QkFDVTtBQUNSLFVBQU1uUyxJQUFJLEdBQUdWLG9EQUFNLENBQUM4UyxLQUFQLEdBQWUsQ0FBNUI7QUFDQSxVQUFNblMsR0FBRyxHQUFHWCxvREFBTSxDQUFDOFMsS0FBUCxHQUFlLENBQTNCO0FBQ0EsV0FBS25CLFlBQUwsQ0FBa0JJLEVBQWxCLENBQXFCclIsSUFBckIsRUFBMkJDLEdBQTNCLEVBQWdDVixLQUFLLENBQUNDLFNBQXRDO0FBQ0QsSyxDQUVEOzs7O2dDQUNZO0FBQ1YsVUFBTVEsSUFBSSxHQUFHVixvREFBTSxDQUFDOFMsS0FBUCxHQUFlLENBQTVCO0FBQ0EsVUFBTW5TLEdBQUcsR0FBR1gsb0RBQU0sQ0FBQzhTLEtBQW5CO0FBQ0EsV0FBS25CLFlBQUwsQ0FBa0JNLElBQWxCLENBQXVCdlIsSUFBdkIsRUFBNkJDLEdBQTdCLEVBQWtDVixLQUFLLENBQUNDLFNBQXhDO0FBQ0QsSyxDQUVEOzs7O29DQUNnQjtBQUNkLFdBQUtpUixVQUFMLENBQWdCNEIsYUFBaEI7QUFDRCxLLENBRUQ7Ozs7bUNBQ2VqUCxLLEVBQU87QUFDcEIsV0FBS3FOLFVBQUwsQ0FBZ0I2QixjQUFoQixDQUErQmxQLEtBQS9CLEVBQXNDLEtBQUtiLElBQTNDO0FBQ0QsSyxDQUVEOzs7O2tDQUNjRCxTLEVBQVc7QUFDdkIsV0FBS21PLFVBQUwsQ0FBZ0I4QixhQUFoQixDQUE4QmpRLFNBQTlCLEVBQXlDLEtBQUtDLElBQTlDO0FBQ0QsSyxDQUVEOzs7O2dDQUNZYSxLLEVBQU87QUFDakIsVUFBSTdELEtBQUssQ0FBQzhDLE1BQU4sS0FBaUIsT0FBckIsRUFBOEI7QUFDNUIsYUFBS2tRLGFBQUwsQ0FBbUJuUCxLQUFuQjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtrUCxjQUFMLENBQW9CbFAsS0FBcEI7QUFDRDtBQUNGLEssQ0FFRDs7Ozt5Q0FDcUJrRyxLLEVBQU87QUFBQTs7QUFFMUIsVUFBSW9FLFNBQVMsR0FBRyxJQUFJRCx5REFBSixDQUFjbkUsS0FBZCxDQUFoQjtBQUNBLFVBQUlxRSxPQUFPLEdBQUcsRUFBZCxDQUgwQixDQUdUOztBQUVqQixVQUFJcE8sS0FBSyxDQUFDOEMsTUFBTixLQUFpQixPQUFyQixFQUE4QjtBQUU1QnNMLGVBQU8sR0FBRyxLQUFLUCxTQUFMLENBQWVvRixLQUFmLENBQXFCbFQsb0RBQU0sQ0FBQzhTLEtBQTVCLEVBQW1DOVMsb0RBQU0sQ0FBQzhTLEtBQVAsR0FBZSxDQUFsRCxDQUFWO0FBQ0ExRSxpQkFBUyxDQUFDK0UsV0FBVixDQUFzQjlFLE9BQXRCLEVBQStCLFVBQUNRLFVBQUQsRUFBZ0I7QUFDN0MsZ0JBQUksQ0FBQ29FLGFBQUwsQ0FBbUJwRSxVQUFVLENBQUMsQ0FBRCxDQUE3QjtBQUNELFNBRkQ7QUFJRCxPQVBELE1BT087QUFFTCxZQUFJdkQsVUFBVSxHQUFHO0FBQUV0SCxXQUFDLEVBQUVnRyxLQUFLLENBQUNDLE9BQVg7QUFBb0JuSixXQUFDLEVBQUVrSixLQUFLLENBQUNJO0FBQTdCLFNBQWpCO0FBQ0FpRSxlQUFPLEdBQUcsS0FBS2hGLFVBQWY7QUFDQStFLGlCQUFTLENBQUMrRSxXQUFWLENBQXNCOUUsT0FBdEIsRUFBK0IsVUFBQ1EsVUFBRCxFQUFnQjtBQUU3QyxnQkFBSSxDQUFDdUMsSUFBTCxDQUFVZ0MsaUJBQVYsQ0FBNEI5SCxVQUE1QjtBQUVELFNBSkQsRUFJRyxZQUFNO0FBRVAsY0FBSTFCLEdBQUcsR0FBR0MsUUFBUSxDQUFDMkIsY0FBVCxDQUF3QixzQkFBeEIsQ0FBVjtBQUNBLGNBQUk2SCxPQUFPLEdBQUd6SixHQUFHLENBQUMwSixVQUFsQjtBQUNBLGNBQUlDLFFBQVEsR0FBRzNKLEdBQUcsQ0FBQ00sV0FBSixHQUFrQk4sR0FBRyxDQUFDMEosVUFBckM7QUFDQSxjQUFJRSxNQUFNLEdBQUc1SixHQUFHLENBQUM2SixTQUFqQjtBQUNBLGNBQUlDLFNBQVMsR0FBRzlKLEdBQUcsQ0FBQ1MsWUFBSixHQUFtQlQsR0FBRyxDQUFDNkosU0FBdkM7O0FBRUEsY0FBSXpKLEtBQUssQ0FBQ0MsT0FBTixHQUFnQm9KLE9BQWhCLElBQ0ZySixLQUFLLENBQUNDLE9BQU4sR0FBZ0JzSixRQURkLElBRUZ2SixLQUFLLENBQUNJLE9BQU4sR0FBZ0JvSixNQUZkLElBR0Z4SixLQUFLLENBQUNJLE9BQU4sR0FBZ0JzSixTQUhsQixFQUc2QjtBQUN6QixrQkFBSSxDQUFDdEMsSUFBTCxDQUFVZ0MsaUJBQVY7QUFDSDtBQUVGLFNBbkJEO0FBcUJEO0FBQ0YsSyxDQUVEOzs7O3FDQUNpQjtBQUNmblQsV0FBSyxDQUFDMEMsUUFBTixHQUFpQixJQUFJK0IsS0FBSyxDQUFDaVAsYUFBVixDQUF3QjFULEtBQUssQ0FBQzBELE1BQTlCLEVBQXNDMUQsS0FBSyxDQUFDNEgsUUFBTixDQUFlNEcsVUFBckQsQ0FBakI7QUFDQXhPLFdBQUssQ0FBQzBDLFFBQU4sQ0FBZWlSLFVBQWYsR0FBNEIsSUFBNUI7QUFDQTNULFdBQUssQ0FBQzBDLFFBQU4sQ0FBZWtSLFlBQWYsR0FBOEIsSUFBOUI7QUFDQTVULFdBQUssQ0FBQzBDLFFBQU4sQ0FBZW1SLGtCQUFmLEdBQW9DLElBQXBDLENBSmUsQ0FLZjs7QUFDQTdULFdBQUssQ0FBQzBDLFFBQU4sQ0FBZW9SLFNBQWY7QUFDRCxLLENBRUQ7Ozs7a0NBQ2M7QUFDWjtBQUNBLFVBQUlDLFlBQVksR0FBRyxJQUFJdFAsS0FBSyxDQUFDc1AsWUFBVixDQUF1QixRQUF2QixFQUFpQyxHQUFqQyxDQUFuQjtBQUNBL1QsV0FBSyxDQUFDNEMsS0FBTixDQUFZdUQsR0FBWixDQUFnQjROLFlBQWhCLEVBSFksQ0FJWjs7QUFDQSxVQUFJQyxLQUFLLEdBQUcsSUFBSXZQLEtBQUssQ0FBQ3dQLGVBQVYsQ0FBMEIsUUFBMUIsRUFBb0MsUUFBcEMsRUFBOEMsR0FBOUMsQ0FBWjtBQUNBalUsV0FBSyxDQUFDNEMsS0FBTixDQUFZdUQsR0FBWixDQUFnQjZOLEtBQWhCO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUlFLFVBQVUsR0FBRyxJQUFJelAsS0FBSyxDQUFDMFAsVUFBVixDQUFxQixHQUFyQixDQUFqQjtBQUNBblUsV0FBSyxDQUFDNEMsS0FBTixDQUFZdUQsR0FBWixDQUFnQitOLFVBQWhCO0FBQ0Q7OztzQ0FFaUI7QUFBQTs7QUFDaEIsVUFBTUUsU0FBUyxHQUFHeEssUUFBUSxDQUFDMkIsY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUNBLFVBQU04SSxXQUFXLEdBQUd6SyxRQUFRLENBQUMyQixjQUFULENBQXdCLFdBQXhCLENBQXBCO0FBQ0EsVUFBTTFILEtBQUssR0FBRytGLFFBQVEsQ0FBQzJCLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBLFVBQU0rSSxLQUFLLEdBQUcxSyxRQUFRLENBQUMyQixjQUFULENBQXdCLEtBQXhCLENBQWQ7QUFDQSxVQUFNZ0osTUFBTSxHQUFHM0ssUUFBUSxDQUFDMkIsY0FBVCxDQUF3QixZQUF4QixDQUFmO0FBRUFuRSxZQUFNLENBQUNvTixnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxZQUFNO0FBQ3pDLGNBQUksQ0FBQ0Msb0JBQUwsQ0FBMEIxSyxLQUExQjtBQUNELE9BRkQsRUFFRyxLQUZIO0FBR0FxSyxlQUFTLENBQUNJLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQU07QUFDeEMsY0FBSSxDQUFDOUMsWUFBTCxDQUFrQmdELFFBQWxCO0FBQ0QsT0FGRCxFQUVHLEtBRkg7QUFHQUwsaUJBQVcsQ0FBQ0csZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQyxjQUFJLENBQUM5QyxZQUFMLENBQWtCaUQsVUFBbEI7QUFDRCxPQUZELEVBRUcsS0FGSDtBQUdBTCxXQUFLLENBQUNFLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFlBQU07QUFDcEMsY0FBSSxDQUFDMUIsYUFBTDtBQUNELE9BRkQsRUFFRyxLQUZIO0FBR0FqUCxXQUFLLENBQUMyUSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDckwsQ0FBRCxFQUFPO0FBQ3JDLFlBQUlBLENBQUMsQ0FBQ2pILE1BQUYsSUFBWWlILENBQUMsQ0FBQ2pILE1BQUYsQ0FBU21ILFFBQVQsQ0FBa0JDLFdBQWxCLE9BQW9DLEdBQXBELEVBQXlEO0FBQ3ZELGdCQUFJLENBQUNzSixXQUFMLENBQWlCZ0MsUUFBUSxDQUFDekwsQ0FBQyxDQUFDakgsTUFBRixDQUFTMlMsU0FBVixDQUF6QjtBQUNEO0FBQ0YsT0FKRCxFQUlHLEtBSkg7QUFLQU4sWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDckwsQ0FBRCxFQUFPO0FBQ3RDLGNBQUksQ0FBQ2dJLElBQUwsQ0FBVTJELFVBQVYsQ0FBcUJQLE1BQXJCLEVBQTZCcEwsQ0FBN0IsRUFBZ0MsTUFBSSxDQUFDQyxVQUFyQztBQUNELE9BRkQsRUFFRyxLQUZIO0FBR0QsSyxDQUVEOzs7O2lDQUNhO0FBQ1gsVUFBTTJMLElBQUksR0FBR25MLFFBQVEsQ0FBQ29MLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBLFVBQU01SCxJQUFJLEdBQUc7QUFDWHBLLFlBQUksRUFBRSxLQUFLQSxJQURBO0FBRVhpUyxpQkFBUyxFQUFFLENBQUU7QUFBRTdULGNBQUksRUFBRTtBQUFSLFNBQUYsRUFBZTtBQUFFQSxjQUFJLEVBQUU7QUFBUixTQUFmLEVBQTRCO0FBQUVBLGNBQUksRUFBRTtBQUFSLFNBQTVCLEVBQXlDO0FBQUVBLGNBQUksRUFBRTtBQUFSLFNBQXpDLEVBQXNEO0FBQUVBLGNBQUksRUFBRTtBQUFSLFNBQXREO0FBRkEsT0FBYjtBQUlBLFVBQUk4VCxxREFBSixDQUFZSCxJQUFaLEVBQWtCM0gsSUFBbEI7QUFDRDs7O3dCQTVTVztBQUFFLGFBQU8sS0FBS3hLLEtBQVo7QUFBbUIsSztzQkFDdkJrQixHLEVBQUs7QUFBRSxXQUFLbEIsS0FBTCxHQUFha0IsR0FBYjtBQUFrQjs7O3dCQUV0QjtBQUFFLGFBQU8sS0FBS0osTUFBWjtBQUFvQixLO3NCQUN4QkksRyxFQUFLO0FBQUUsV0FBS0osTUFBTCxHQUFjSSxHQUFkO0FBQW1COzs7d0JBRXRCO0FBQUUsYUFBTyxLQUFLOEQsUUFBWjtBQUFzQixLO3NCQUMxQjlELEcsRUFBSztBQUFFLFdBQUs4RCxRQUFMLEdBQWdCOUQsR0FBaEI7QUFBcUI7Ozt3QkFFekI7QUFBRSxhQUFPLEtBQUs3RCxTQUFaO0FBQXNCLEs7c0JBQzFCNkQsRyxFQUFLO0FBQUUsV0FBSzdELFNBQUwsR0FBaUI2RCxHQUFqQjtBQUFzQjs7O3dCQUU5QjtBQUFFLGFBQU8sS0FBS2hCLE1BQVo7QUFBb0IsSztzQkFDeEJnQixHLEVBQUs7QUFBRSxXQUFLaEIsTUFBTCxHQUFjZ0IsR0FBZDtBQUFtQjs7O3dCQUV0QjtBQUFFLGFBQU8sS0FBS3BCLFFBQVo7QUFBc0IsSztzQkFDMUJvQixHLEVBQUs7QUFBRSxXQUFLcEIsUUFBTCxHQUFnQm9CLEdBQWhCO0FBQXFCOzs7d0JBRTVCO0FBQUUsYUFBTyxLQUFLc0MsTUFBWjtBQUFvQixLO3NCQUN4QnRDLEcsRUFBSztBQUFFLFdBQUtzQyxNQUFMLEdBQWN0QyxHQUFkO0FBQW1COzs7d0JBRTFCO0FBQUUsYUFBTyxLQUFLcVIsSUFBWjtBQUFrQixLO3NCQUN0QnJSLEcsRUFBSztBQUFFLFdBQUtxUixJQUFMLEdBQVlyUixHQUFaO0FBQWlCOzs7Ozs7O0FBeVJuQyxJQUFJc1IsS0FBSyxHQUFHLElBQUlwVixLQUFKLENBQVUsQ0FBVixDQUFaO0FBQ0FvVixLQUFLLENBQUNsVixJQUFOLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BWQTtBQUNBO0FBRUE7Ozs7Ozs7SUFNTUgsTTs7O0FBQ0osa0JBQWFZLEtBQWIsRUFBb0I7QUFBQTs7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0QsRyxDQUVEOzs7OzsyQkFnQlE7QUFDTlosWUFBTSxDQUFDK1IsRUFBUCxHQUFZLEtBQVo7QUFDQS9SLFlBQU0sQ0FBQ2lTLElBQVAsR0FBYyxLQUFkO0FBQ0EsV0FBS3FELFVBQUwsR0FBa0IsS0FBS0Msb0JBQUwsQ0FBMEIsS0FBSzNVLEtBQS9CLENBQWxCO0FBQ0FaLFlBQU0sQ0FBQzhTLEtBQVAsR0FBZSxLQUFLMEMsYUFBTCxHQUFxQixLQUFLRixVQUFMLENBQWdCelUsUUFBcEQ7QUFDQSxXQUFLeVUsVUFBTCxDQUFnQnJELElBQWhCLEdBQXVCLEtBQUt1RCxhQUFMLElBQXNCLEtBQUtGLFVBQUwsQ0FBZ0JyRCxJQUFoQixHQUF1QixDQUE3QyxDQUF2QjtBQUNBLFdBQUtxRCxVQUFMLENBQWdCdkQsRUFBaEIsR0FBcUIsS0FBS3lELGFBQUwsSUFBc0IsS0FBS0YsVUFBTCxDQUFnQnZELEVBQWhCLEdBQXFCLENBQTNDLENBQXJCO0FBQ0EsV0FBSzBELFFBQUwsR0FBZ0IsS0FBS0MsbUJBQUwsQ0FBeUJ4USxxREFBekIsQ0FBaEI7QUFDRDs7OzhCQUVVO0FBQ1QsVUFBS2xGLE1BQU0sQ0FBQzhTLEtBQVAsR0FBZSxDQUFmLElBQW9CLENBQUM5UyxNQUFNLENBQUMrUixFQUE1QixJQUFrQyxDQUFDL1IsTUFBTSxDQUFDaVMsSUFBL0MsRUFBc0Q7QUFDcERqUyxjQUFNLENBQUMrUixFQUFQLEdBQVksSUFBWjtBQUNBNEQsMkRBQVksQ0FBQ0MsSUFBYixDQUFrQixXQUFsQjtBQUNEO0FBQ0Y7OztnQ0FFWTtBQUNYLFVBQUs1VixNQUFNLENBQUM4UyxLQUFQLEdBQWUsQ0FBZixJQUFvQixLQUFLd0MsVUFBTCxDQUFnQnZELEVBQXBDLElBQTBDLENBQUMvUixNQUFNLENBQUNpUyxJQUFsRCxJQUEwRCxDQUFDalMsTUFBTSxDQUFDK1IsRUFBdkUsRUFBNEU7QUFDMUUvUixjQUFNLENBQUNpUyxJQUFQLEdBQWMsSUFBZDtBQUNEO0FBQ0Y7Ozs0QkFFUTtBQUNQalMsWUFBTSxDQUFDK1IsRUFBUCxHQUFZLEtBQVo7QUFDQS9SLFlBQU0sQ0FBQzhTLEtBQVA7QUFDRDs7OzhCQUVVO0FBQ1Q5UyxZQUFNLENBQUNpUyxJQUFQLEdBQWMsS0FBZDtBQUNBalMsWUFBTSxDQUFDOFMsS0FBUDtBQUNEOzs7eUNBRW9CbFMsSyxFQUFPO0FBQzFCLFVBQUlpVixjQUFjLEdBQUcsQ0FBckI7QUFDQSxVQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxVQUFJalYsUUFBUSxHQUFHLENBQWY7QUFDQUQsV0FBSyxDQUFDRyxRQUFOLENBQWVJLE9BQWYsQ0FBdUIsVUFBVUMsSUFBVixFQUFnQjtBQUNyQyxZQUFJQSxJQUFJLENBQUMwQyxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDbEIrUix3QkFBYyxJQUFJLENBQWxCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xDLHNCQUFZLElBQUksQ0FBaEI7QUFDRDtBQUNGLE9BTkQ7QUFPQSxhQUFPO0FBQ0xqVixnQkFBUSxFQUFFQSxRQURMO0FBRUxvUixZQUFJLEVBQUU0RCxjQUZEO0FBR0w5RCxVQUFFLEVBQUUrRDtBQUhDLE9BQVA7QUFLRDs7O3dDQUVtQkMsRyxFQUFLO0FBQ3ZCLFVBQUlOLFFBQVEsR0FBRyxJQUFmOztBQUNBLFdBQUssSUFBSU8sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsR0FBRyxDQUFDaEgsTUFBeEIsRUFBZ0NpSCxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DLFlBQUlELEdBQUcsQ0FBQ0MsQ0FBRCxDQUFILENBQU9sUyxLQUFQLEdBQWUyUixRQUFmLElBQTJCTSxHQUFHLENBQUNDLENBQUQsQ0FBSCxDQUFPbFMsS0FBUCxHQUFlLENBQTlDLEVBQWlEO0FBQy9DMlIsa0JBQVEsR0FBR00sR0FBRyxDQUFDQyxDQUFELENBQUgsQ0FBT2xTLEtBQWxCO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPMlIsUUFBUDtBQUNEOzs7d0JBMUVTO0FBQUUsYUFBTyxLQUFLMUQsRUFBWjtBQUFnQixLO3NCQUNwQmhPLEcsRUFBSztBQUFFLFdBQUtnTyxFQUFMLEdBQVVoTyxHQUFWO0FBQWUsSyxDQUU5Qjs7Ozt3QkFDWTtBQUFFLGFBQU8sS0FBS2tPLElBQVo7QUFBa0IsSztzQkFDdEJsTyxHLEVBQUs7QUFBRSxXQUFLa08sSUFBTCxHQUFZbE8sR0FBWjtBQUFnQixLLENBRWpDO0FBQ0E7QUFDQTtBQUVBOzs7O3dCQUNhO0FBQUUsYUFBTyxLQUFLK08sS0FBWjtBQUFtQixLO3NCQUN2Qi9PLEcsRUFBSztBQUFFLFdBQUsrTyxLQUFMLEdBQWEvTyxHQUFiO0FBQWtCOzs7Ozs7QUFnRXZCL0QscUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVGQSxJQUFNaVcsV0FBVyxHQUFHLGVBQXBCOztJQUNNZCxPOzs7QUFDSixtQkFBWWUsSUFBWixFQUFrQjdJLElBQWxCLEVBQXdCO0FBQUE7O0FBQ3RCLFNBQUs4SSxXQUFMLENBQWlCRCxJQUFqQjtBQUNBLFNBQUs3SSxJQUFMLEdBQVlBLElBQVo7QUFDQTZJLFFBQUksQ0FBQ0UsYUFBTCxLQUF1QixLQUFLQyxlQUFMLENBQXFCSCxJQUFJLENBQUNJLFVBQTFCLENBQXZCLEdBQStELElBQS9EO0FBQ0QsRyxDQUVEOzs7OztvQ0FDZ0JDLFEsRUFBVTtBQUN4QixVQUFJQyxXQUFKLEVBQWlCTixJQUFqQjtBQUR3QjtBQUFBO0FBQUE7O0FBQUE7QUFFeEIsNkJBQWFLLFFBQWIsOEhBQXVCO0FBQWxCTCxjQUFrQjs7QUFDckIsY0FBSUEsSUFBSSxDQUFDTyxRQUFMLElBQWlCLENBQWpCLElBQXNCUCxJQUFJLENBQUNRLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBMUIsRUFBeUQ7QUFDdkQsaUJBQUtDLGNBQUwsQ0FBb0JULElBQXBCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUtDLFdBQUwsQ0FBaUJELElBQWpCO0FBQ0FBLGdCQUFJLENBQUNFLGFBQUwsR0FBcUIsS0FBS0MsZUFBTCxDQUFxQkgsSUFBSSxDQUFDSSxVQUExQixDQUFyQixHQUE2RCxJQUE3RDtBQUNEO0FBQ0Y7QUFUdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVV6QixLLENBRUQ7Ozs7Z0NBQ1lKLEksRUFBTTtBQUNoQixVQUFJQSxJQUFJLENBQUNPLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDdEIsYUFBS0UsY0FBTCxDQUFvQlQsSUFBcEI7QUFDRCxPQUZELE1BRU8sSUFBSUEsSUFBSSxDQUFDTyxRQUFMLElBQWlCLENBQXJCLEVBQXdCO0FBQzdCLGFBQUtHLFdBQUwsQ0FBaUJWLElBQWpCLEVBQXVCLEtBQUs3SSxJQUE1QjtBQUNEO0FBQ0YsSyxDQUVEOzs7O21DQUNlNkksSSxFQUFNO0FBQ25CO0FBQ0EsVUFBSVcsSUFBSSxHQUFHWCxJQUFJLENBQUNZLFVBQWhCOztBQUNBLFVBQUlaLElBQUksQ0FBQ1EsWUFBTCxDQUFrQixVQUFsQixDQUFKLEVBQW1DO0FBQ2pDLGFBQUtLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCYixJQUF6QixFQUErQlcsSUFBL0I7QUFDRDs7QUFFRCxVQUFJWCxJQUFJLENBQUNjLFlBQUwsQ0FBa0IsUUFBbEIsQ0FBSixFQUFpQztBQUMvQixhQUFLRCxPQUFMLENBQWEsUUFBYixFQUF1QmIsSUFBdkIsRUFBNkJXLElBQTdCO0FBQ0Q7O0FBRUQsVUFBSVgsSUFBSSxDQUFDYyxZQUFMLENBQWtCLFFBQWxCLENBQUosRUFBaUM7QUFDL0IsYUFBS0QsT0FBTCxDQUFhLFFBQWIsRUFBdUJiLElBQXZCLEVBQTZCVyxJQUE3QjtBQUNEO0FBQ0YsSyxDQUVEOzs7O2dDQUNZWCxJLEVBQU03SSxJLEVBQU07QUFDdEI7QUFDQSxVQUFJLENBQUM2SSxJQUFJLENBQUM3SSxJQUFWLEVBQWdCO0FBQ2Q7QUFDRDs7QUFDRDZJLFVBQUksQ0FBQzdJLElBQUwsR0FBWSxLQUFLNEosZUFBTCxDQUFxQmYsSUFBSSxDQUFDN0ksSUFBMUIsRUFBZ0NBLElBQWhDLENBQVo7QUFDRCxLLENBRUQ7Ozs7b0NBQ2dCNkosWSxFQUFjO0FBQzVCLFVBQUlDLEdBQUcsR0FBRyxJQUFWO0FBQ0EsVUFBSUMsUUFBUSxHQUFHLEVBQWY7O0FBQ0EsYUFBT0QsR0FBRyxHQUFHbEIsV0FBVyxDQUFDb0IsSUFBWixDQUFpQkgsWUFBakIsQ0FBYixFQUE2QztBQUMzQyxZQUFJaFUsR0FBRyxHQUFHaVUsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPakUsS0FBUCxDQUFhLENBQWIsRUFBZ0JpRSxHQUFHLENBQUMsQ0FBRCxDQUFILENBQU9wSSxNQUFQLEdBQWdCLENBQWhDLENBQVY7QUFDQXFJLGdCQUFRLENBQUMvTCxJQUFULENBQWNuSSxHQUFkO0FBQ0Q7O0FBQ0QsbUNBQWlCa1UsUUFBakIsK0JBQTJCO0FBQXRCLFlBQUloVyxJQUFJLGdCQUFSO0FBQ0gsWUFBSWtXLElBQUksR0FBRyxJQUFJQyxNQUFKLENBQVcsU0FBU25XLElBQVQsR0FBZ0IsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FBWDtBQUNBLFlBQUlvVyxPQUFPLEdBQUcsS0FBS0MsUUFBTCxDQUFjclcsSUFBZCxDQUFkO0FBQ0FvVyxlQUFPLEdBQUdBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQixLQUFoQixFQUF1QixFQUF2QixDQUFWO0FBQ0FSLG9CQUFZLEdBQUdBLFlBQVksQ0FBQ1EsT0FBYixDQUFxQixLQUFyQixFQUE0QixFQUE1QixDQUFmO0FBQ0FSLG9CQUFZLEdBQUdBLFlBQVksQ0FBQ1EsT0FBYixDQUFxQkosSUFBckIsRUFBMkJFLE9BQTNCLENBQWY7QUFDRDs7QUFDRCxhQUFPLElBQUlHLFFBQUosQ0FBYSxNQUFiLEVBQXFCLGFBQWFULFlBQWIsR0FBNEIsR0FBakQsQ0FBUDtBQUNELEssQ0FFRDs7Ozs2QkFDU2xJLEksRUFBTTtBQUNiLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1Q7QUFDRDs7QUFDRCxVQUFJNEksWUFBWSxHQUFHLFNBQW5CO0FBQ0EsVUFBSUMsVUFBVSxHQUFHLEdBQWpCO0FBQ0EsYUFBT0QsWUFBWSxHQUFHNUksSUFBZixHQUFzQjZJLFVBQTdCO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsVUFBSUMsV0FBVyxHQUFHLElBQWxCO0FBQ0EsYUFBT0EsV0FBVyxHQUFHak8sUUFBUSxDQUFDa08sc0JBQVQsRUFBckI7QUFDRCxLLENBRUQ7Ozs7NEJBQ1FDLEksRUFBTTlCLEksRUFBTVcsSSxFQUFNO0FBQUE7O0FBQ3hCLGNBQVFtQixJQUFSO0FBQ0UsYUFBSyxVQUFMO0FBQ0UsV0FBQyxVQUFDOUIsSUFBRCxFQUFPVyxJQUFQLEVBQWdCO0FBQ2YsZ0JBQUlvQixNQUFNLEdBQUcvQixJQUFJLENBQUNjLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEJ2TixLQUE5QixDQUFvQyxHQUFwQyxDQUFiO0FBQ0F5TSxnQkFBSSxDQUFDZ0MsZUFBTCxDQUFxQixVQUFyQjtBQUNBLGdCQUFJQyxVQUFVLEdBQUdqQyxJQUFJLENBQUNpQyxVQUF0Qjs7QUFDQSxnQkFBSUwsV0FBVyxHQUFHLEtBQUksQ0FBQ00saUJBQUwsRUFBbEI7O0FBQ0EsZ0JBQUlDLEdBQUcsR0FBRyxLQUFJLENBQUNoTCxJQUFMLENBQVU0SyxNQUFNLENBQUMsQ0FBRCxDQUFoQixFQUFxQmxKLE1BQS9CO0FBQ0EsZ0JBQUlpSCxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxtQkFBT3FDLEdBQVAsRUFBWTtBQUNWLGtCQUFJQyxTQUFTLEdBQUdwQyxJQUFJLENBQUNvQyxTQUFMLENBQWUsSUFBZixDQUFoQjtBQUNBQSx1QkFBUyxDQUFDMU0sWUFBVixDQUF1QixPQUF2QixFQUFnQ29LLENBQWhDO0FBQ0Esa0JBQUl1QyxRQUFRLEdBQUdELFNBQVMsQ0FBQ2hDLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0JqSixJQUF2QztBQUNBLGtCQUFJOEosR0FBRyxHQUFHLElBQVY7QUFDQSxrQkFBSUMsUUFBUSxHQUFHLEVBQWY7O0FBQ0EscUJBQU9ELEdBQUcsR0FBR2xCLFdBQVcsQ0FBQ29CLElBQVosQ0FBaUJrQixRQUFqQixDQUFiLEVBQXlDO0FBQ3ZDLG9CQUFJclYsR0FBRyxHQUFHaVUsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPakUsS0FBUCxDQUFhLElBQUkrRSxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVsSixNQUEzQixFQUFtQ29JLEdBQUcsQ0FBQyxDQUFELENBQUgsQ0FBT3BJLE1BQVAsR0FBZ0IsQ0FBbkQsQ0FBVjtBQUNBcUksd0JBQVEsQ0FBQy9MLElBQVQsQ0FBY25JLEdBQWQ7QUFDRDs7QUFDRCw2Q0FBaUJrVSxRQUFqQixrQ0FBMkI7QUFBdEIsb0JBQUloVyxJQUFJLGtCQUFSO0FBQ0gsb0JBQUlrVyxJQUFJLEdBQUcsSUFBSUMsTUFBSixDQUFXLFNBQVNVLE1BQU0sQ0FBQyxDQUFELENBQWYsR0FBcUIsR0FBckIsR0FBMkI3VyxJQUEzQixHQUFrQyxHQUE3QyxFQUFrRCxHQUFsRCxDQUFYO0FBQ0FrWCx5QkFBUyxDQUFDeEQsU0FBVixHQUFzQndELFNBQVMsQ0FBQ3hELFNBQVYsQ0FBb0I0QyxPQUFwQixDQUE0QkosSUFBNUIsRUFBa0MsT0FBT1csTUFBTSxDQUFDLENBQUQsQ0FBYixHQUFtQixLQUFuQixHQUEyQmpDLENBQTNCLEdBQStCLFFBQS9CLEdBQTBDNVUsSUFBMUMsR0FBaUQsR0FBbkYsQ0FBdEI7QUFDRDs7QUFDRDBXLHlCQUFXLENBQUNuTixXQUFaLENBQXdCMk4sU0FBeEI7QUFDQUQsaUJBQUc7QUFDSHJDLGVBQUM7QUFDRjs7QUFDRG1DLHNCQUFVLENBQUN4TixXQUFYLENBQXVCbU4sV0FBdkI7QUFDQUssc0JBQVUsQ0FBQ3JOLFdBQVgsQ0FBdUJvTCxJQUF2QjtBQUNELFdBM0JELEVBMkJHQSxJQTNCSCxFQTJCU1csSUEzQlQ7O0FBNEJBOztBQUNGLGFBQUssUUFBTDtBQUNFLFdBQUMsVUFBQ1gsSUFBRCxFQUFPVyxJQUFQLEVBQWdCO0FBQ2YsZ0JBQUkyQixJQUFJLEdBQUd0QyxJQUFJLENBQUNjLFlBQUwsQ0FBa0IsUUFBbEIsQ0FBWDtBQUNBLGdCQUFJL1YsTUFBTSxHQUFHLEtBQUksQ0FBQ29NLElBQUwsQ0FBVW1MLElBQVYsQ0FBYjs7QUFDQSxnQkFBSXZYLE1BQUosRUFBWTtBQUNWaVYsa0JBQUksQ0FBQzVMLEtBQUwsQ0FBVzBCLE9BQVgsR0FBcUIsTUFBckI7QUFDRDtBQUNGLFdBTkQsRUFNR2tLLElBTkgsRUFNU1csSUFOVDs7QUFPQTs7QUFDRixhQUFLLFFBQUw7QUFDRSxXQUFDLFVBQUNYLElBQUQsRUFBT1csSUFBUCxFQUFnQjtBQUNmLGdCQUFJMkIsSUFBSSxHQUFHdEMsSUFBSSxDQUFDYyxZQUFMLENBQWtCLFFBQWxCLENBQVg7QUFDQSxnQkFBSS9WLE1BQU0sR0FBRyxLQUFJLENBQUNvTSxJQUFMLENBQVVtTCxJQUFWLENBQWI7O0FBQ0EsZ0JBQUksQ0FBQ3ZYLE1BQUwsRUFBYTtBQUNYaVYsa0JBQUksQ0FBQzVMLEtBQUwsQ0FBVzBCLE9BQVgsR0FBcUIsTUFBckI7QUFDRDtBQUNGLFdBTkQsRUFNR2tLLElBTkgsRUFNU1csSUFOVDs7QUFPQTtBQWhESjtBQWtERDs7Ozs7O0FBRVkxQixzRUFBZixFOzs7Ozs7Ozs7Ozs7QUMvSUE7QUFBQTtBQUFBO0NBQ0E7O0FBQ0EsU0FBU25LLGFBQVQsQ0FBd0J5TixXQUF4QixFQUFxQztBQUVqQztBQUNBLE1BQUlDLEVBQUUsR0FBSUQsV0FBVyxDQUFDelUsQ0FBWixHQUFnQnFELE1BQU0sQ0FBQ0MsVUFBeEIsR0FBc0MsQ0FBdEMsR0FBMEMsQ0FBbkQ7QUFDQSxNQUFJcVIsRUFBRSxHQUFHLEVBQUVGLFdBQVcsQ0FBQzNYLENBQVosR0FBZ0J1RyxNQUFNLENBQUNFLFdBQXpCLElBQXdDLENBQXhDLEdBQTRDLENBQXJELENBSmlDLENBS2pDO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQUlxUixFQUFFLEdBQUczWSx1REFBSyxDQUFDMEQsTUFBTixDQUFhOUMsUUFBYixDQUFzQkMsQ0FBdEIsR0FBMEIsR0FBbkMsQ0FUaUMsQ0FVakM7O0FBQ0EsTUFBSStYLEVBQUUsR0FBRyxPQUFPM1MsSUFBSSxDQUFDQyxFQUFaLEdBQWlCLEdBQTFCLENBWGlDLENBWWpDOztBQUNBLE1BQUkyUyxFQUFFLEdBQUlGLEVBQUUsR0FBRzFTLElBQUksQ0FBQzZTLEdBQUwsQ0FBU0YsRUFBVCxDQUFOLElBQXVCeFIsTUFBTSxDQUFDQyxVQUFQLEdBQW9CRCxNQUFNLENBQUNFLFdBQWxELENBQVQsQ0FiaUMsQ0FjakM7O0FBQ0EsTUFBSXlSLEVBQUUsR0FBR0osRUFBRSxHQUFHMVMsSUFBSSxDQUFDNlMsR0FBTCxDQUFTRixFQUFULENBQWQsQ0FmaUMsQ0FnQmpDOztBQUNBLE1BQUlJLEVBQUUsR0FBR1AsRUFBRSxHQUFHSSxFQUFkLENBakJpQyxDQWtCakM7O0FBQ0EsTUFBSUksRUFBRSxHQUFHUCxFQUFFLEdBQUdLLEVBQWQ7QUFFQSxTQUFPO0FBQ0xoVixLQUFDLEVBQUVpVixFQURFO0FBRUxuWSxLQUFDLEVBQUVvWTtBQUZFLEdBQVA7QUFJSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDM0JLdkQsWTs7O0FBQ0osMEJBQWU7QUFBQTs7QUFDYixTQUFLd0QsT0FBTCxHQUFlLEVBQWY7QUFDRDs7Ozt1QkFFR25QLEssRUFBT2tELFEsRUFBVTtBQUNuQixVQUFJa00sU0FBUyxHQUFHLEtBQUtELE9BQUwsQ0FBYW5QLEtBQWIsS0FBdUIsRUFBdkM7QUFDQW9QLGVBQVMsQ0FBQy9OLElBQVYsQ0FBZTZCLFFBQWY7QUFDQSxXQUFLaU0sT0FBTCxDQUFhblAsS0FBYixJQUFzQm9QLFNBQXRCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt3QkFFSXBQLEssRUFBTWtELFEsRUFBUztBQUNsQixVQUFJa00sU0FBUyxHQUFHLEtBQUtELE9BQUwsQ0FBYW5QLEtBQWIsQ0FBaEI7QUFDQSxXQUFLbVAsT0FBTCxDQUFhblAsS0FBYixJQUFzQm9QLFNBQVMsSUFBSUEsU0FBUyxDQUFDQyxNQUFWLENBQWlCLFVBQUFDLEVBQUU7QUFBQSxlQUFJQSxFQUFFLEtBQUtwTSxRQUFYO0FBQUEsT0FBbkIsQ0FBbkM7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzJCQUVhO0FBQUE7O0FBQUEsd0NBQUxxTSxJQUFLO0FBQUxBLFlBQUs7QUFBQTs7QUFDWixVQUFNdlAsS0FBSyxHQUFHdVAsSUFBSSxDQUFDLENBQUQsQ0FBbEI7QUFDQSxVQUFNQyxNQUFNLEdBQUcsR0FBR3RHLEtBQUgsQ0FBU3VHLElBQVQsQ0FBY0YsSUFBZCxFQUFvQixDQUFwQixDQUFmO0FBQ0EsVUFBTUgsU0FBUyxHQUFHLEtBQUtELE9BQUwsQ0FBYW5QLEtBQWIsQ0FBbEI7QUFDQW9QLGVBQVMsQ0FBQ2pZLE9BQVYsQ0FBa0IsVUFBQW1ZLEVBQUU7QUFBQSxlQUFJQSxFQUFFLENBQUNJLEtBQUgsQ0FBUyxLQUFULEVBQWVGLE1BQWYsQ0FBSjtBQUFBLE9BQXBCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozt5QkFFS3hQLEssRUFBTWtELFEsRUFBUztBQUFBOztBQUNuQixVQUFJeU0sUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBYTtBQUFBLDJDQUFUSixJQUFTO0FBQVRBLGNBQVM7QUFBQTs7QUFDeEJyTSxnQkFBUSxDQUFDd00sS0FBVCxDQUFlLE1BQWYsRUFBb0JILElBQXBCOztBQUNBLGNBQUksQ0FBQ0ssR0FBTCxDQUFTNVAsS0FBVCxFQUFlMlAsUUFBZjtBQUNILE9BSEQ7O0FBSUEsV0FBS0UsRUFBTCxDQUFRN1AsS0FBUixFQUFjMlAsUUFBZDtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7Ozs7QUFHWWhFLDJFQUFmLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2NlbmUvbWFwV29ybGQuanNcIik7XG4iLCIvKiFcbiAqIGFzeW5jXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gKlxuICogQ29weXJpZ2h0IDIwMTAtMjAxNCBDYW9sYW4gTWNNYWhvblxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgYXN5bmMgPSB7fTtcbiAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICBmdW5jdGlvbiBpZGVudGl0eSh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b0Jvb2wodikge1xuICAgICAgICByZXR1cm4gISF2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBub3RJZCh2KSB7XG4gICAgICAgIHJldHVybiAhdjtcbiAgICB9XG5cbiAgICAvLyBnbG9iYWwgb24gdGhlIHNlcnZlciwgd2luZG93IGluIHRoZSBicm93c2VyXG4gICAgdmFyIHByZXZpb3VzX2FzeW5jO1xuXG4gICAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgKGBzZWxmYCkgaW4gdGhlIGJyb3dzZXIsIGBnbG9iYWxgXG4gICAgLy8gb24gdGhlIHNlcnZlciwgb3IgYHRoaXNgIGluIHNvbWUgdmlydHVhbCBtYWNoaW5lcy4gV2UgdXNlIGBzZWxmYFxuICAgIC8vIGluc3RlYWQgb2YgYHdpbmRvd2AgZm9yIGBXZWJXb3JrZXJgIHN1cHBvcnQuXG4gICAgdmFyIHJvb3QgPSB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgJiYgc2VsZi5zZWxmID09PSBzZWxmICYmIHNlbGYgfHxcbiAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbC5nbG9iYWwgPT09IGdsb2JhbCAmJiBnbG9iYWwgfHxcbiAgICAgICAgICAgIHRoaXM7XG5cbiAgICBpZiAocm9vdCAhPSBudWxsKSB7XG4gICAgICAgIHByZXZpb3VzX2FzeW5jID0gcm9vdC5hc3luYztcbiAgICB9XG5cbiAgICBhc3luYy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByb290LmFzeW5jID0gcHJldmlvdXNfYXN5bmM7XG4gICAgICAgIHJldHVybiBhc3luYztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25seV9vbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgd2FzIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBmbiA9IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX29uY2UoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGZuID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgZm4gPSBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vLy8gY3Jvc3MtYnJvd3NlciBjb21wYXRpYmxpdHkgZnVuY3Rpb25zIC8vLy9cblxuICAgIHZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgdmFyIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH07XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSB1bmRlcnNjb3JlLmpzIGlzT2JqZWN0XG4gICAgdmFyIF9pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfaXNBcnJheUxpa2UoYXJyKSB7XG4gICAgICAgIHJldHVybiBfaXNBcnJheShhcnIpIHx8IChcbiAgICAgICAgICAgIC8vIGhhcyBhIHBvc2l0aXZlIGludGVnZXIgbGVuZ3RoIHByb3BlcnR5XG4gICAgICAgICAgICB0eXBlb2YgYXJyLmxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgYXJyLmxlbmd0aCA+PSAwICYmXG4gICAgICAgICAgICBhcnIubGVuZ3RoICUgMSA9PT0gMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hcnJheUVhY2goYXJyLCBpdGVyYXRvcikge1xuICAgICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKGFycltpbmRleF0sIGluZGV4LCBhcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX21hcChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyLmxlbmd0aCxcbiAgICAgICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRvcihhcnJbaW5kZXhdLCBpbmRleCwgYXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9yYW5nZShjb3VudCkge1xuICAgICAgICByZXR1cm4gX21hcChBcnJheShjb3VudCksIGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBpOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVkdWNlKGFyciwgaXRlcmF0b3IsIG1lbW8pIHtcbiAgICAgICAgX2FycmF5RWFjaChhcnIsIGZ1bmN0aW9uICh4LCBpLCBhKSB7XG4gICAgICAgICAgICBtZW1vID0gaXRlcmF0b3IobWVtbywgeCwgaSwgYSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZm9yRWFjaE9mKG9iamVjdCwgaXRlcmF0b3IpIHtcbiAgICAgICAgX2FycmF5RWFjaChfa2V5cyhvYmplY3QpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba2V5XSwga2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2luZGV4T2YoYXJyLCBpdGVtKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgdmFyIF9rZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2tleUl0ZXJhdG9yKGNvbGwpIHtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIGlmIChfaXNBcnJheUxpa2UoY29sbCkpIHtcbiAgICAgICAgICAgIGxlbiA9IGNvbGwubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBpIDwgbGVuID8gaSA6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5cyA9IF9rZXlzKGNvbGwpO1xuICAgICAgICAgICAgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPCBsZW4gPyBrZXlzW2ldIDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTaW1pbGFyIHRvIEVTNidzIHJlc3QgcGFyYW0gKGh0dHA6Ly9hcml5YS5vZmlsYWJzLmNvbS8yMDEzLzAzL2VzNi1hbmQtcmVzdC1wYXJhbWV0ZXIuaHRtbClcbiAgICAvLyBUaGlzIGFjY3VtdWxhdGVzIHRoZSBhcmd1bWVudHMgcGFzc2VkIGludG8gYW4gYXJyYXksIGFmdGVyIGEgZ2l2ZW4gaW5kZXguXG4gICAgLy8gRnJvbSB1bmRlcnNjb3JlLmpzIChodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8yMTQwKS5cbiAgICBmdW5jdGlvbiBfcmVzdFBhcmFtKGZ1bmMsIHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgc3RhcnRJbmRleCA9IHN0YXJ0SW5kZXggPT0gbnVsbCA/IGZ1bmMubGVuZ3RoIC0gMSA6ICtzdGFydEluZGV4O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aCAtIHN0YXJ0SW5kZXgsIDApO1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBBcnJheShsZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHJlc3RbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4ICsgc3RhcnRJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgcmVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDdXJyZW50bHkgdW51c2VkIGJ1dCBoYW5kbGUgY2FzZXMgb3V0c2lkZSBvZiB0aGUgc3dpdGNoIHN0YXRlbWVudDpcbiAgICAgICAgICAgIC8vIHZhciBhcmdzID0gQXJyYXkoc3RhcnRJbmRleCArIDEpO1xuICAgICAgICAgICAgLy8gZm9yIChpbmRleCA9IDA7IGluZGV4IDwgc3RhcnRJbmRleDsgaW5kZXgrKykge1xuICAgICAgICAgICAgLy8gICAgIGFyZ3NbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGFyZ3Nbc3RhcnRJbmRleF0gPSByZXN0O1xuICAgICAgICAgICAgLy8gcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3dpdGhvdXRJbmRleChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcih2YWx1ZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vLy8gZXhwb3J0ZWQgYXN5bmMgbW9kdWxlIGZ1bmN0aW9ucyAvLy8vXG5cbiAgICAvLy8vIG5leHRUaWNrIGltcGxlbWVudGF0aW9uIHdpdGggYnJvd3Nlci1jb21wYXRpYmxlIGZhbGxiYWNrIC8vLy9cblxuICAgIC8vIGNhcHR1cmUgdGhlIGdsb2JhbCByZWZlcmVuY2UgdG8gZ3VhcmQgYWdhaW5zdCBmYWtlVGltZXIgbW9ja3NcbiAgICB2YXIgX3NldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicgJiYgc2V0SW1tZWRpYXRlO1xuXG4gICAgdmFyIF9kZWxheSA9IF9zZXRJbW1lZGlhdGUgPyBmdW5jdGlvbihmbikge1xuICAgICAgICAvLyBub3QgYSBkaXJlY3QgYWxpYXMgZm9yIElFMTAgY29tcGF0aWJpbGl0eVxuICAgICAgICBfc2V0SW1tZWRpYXRlKGZuKTtcbiAgICB9IDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYXN5bmMubmV4dFRpY2sgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFzeW5jLm5leHRUaWNrID0gX2RlbGF5O1xuICAgIH1cbiAgICBhc3luYy5zZXRJbW1lZGlhdGUgPSBfc2V0SW1tZWRpYXRlID8gX2RlbGF5IDogYXN5bmMubmV4dFRpY2s7XG5cblxuICAgIGFzeW5jLmZvckVhY2ggPVxuICAgIGFzeW5jLmVhY2ggPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmVhY2hPZihhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLmZvckVhY2hTZXJpZXMgPVxuICAgIGFzeW5jLmVhY2hTZXJpZXMgPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLmVhY2hPZlNlcmllcyhhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0b3IpLCBjYWxsYmFjayk7XG4gICAgfTtcblxuXG4gICAgYXN5bmMuZm9yRWFjaExpbWl0ID1cbiAgICBhc3luYy5lYWNoTGltaXQgPSBmdW5jdGlvbiAoYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfZWFjaE9mTGltaXQobGltaXQpKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRvciksIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZm9yRWFjaE9mID1cbiAgICBhc3luYy5lYWNoT2YgPSBmdW5jdGlvbiAob2JqZWN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgb2JqZWN0ID0gb2JqZWN0IHx8IFtdO1xuXG4gICAgICAgIHZhciBpdGVyID0gX2tleUl0ZXJhdG9yKG9iamVjdCk7XG4gICAgICAgIHZhciBrZXksIGNvbXBsZXRlZCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKChrZXkgPSBpdGVyKCkpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCArPSAxO1xuICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tleV0sIGtleSwgb25seV9vbmNlKGRvbmUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wbGV0ZWQgPT09IDApIGNhbGxiYWNrKG51bGwpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRvbmUoZXJyKSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQtLTtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sga2V5IGlzIG51bGwgaW4gY2FzZSBpdGVyYXRvciBpc24ndCBleGhhdXN0ZWRcbiAgICAgICAgICAgIC8vIGFuZCBkb25lIHJlc29sdmVkIHN5bmNocm9ub3VzbHkuXG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09IG51bGwgJiYgY29tcGxldGVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYy5mb3JFYWNoT2ZTZXJpZXMgPVxuICAgIGFzeW5jLmVhY2hPZlNlcmllcyA9IGZ1bmN0aW9uIChvYmosIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IF9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBvYmogPSBvYmogfHwgW107XG4gICAgICAgIHZhciBuZXh0S2V5ID0gX2tleUl0ZXJhdG9yKG9iaik7XG4gICAgICAgIHZhciBrZXkgPSBuZXh0S2V5KCk7XG4gICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgICAgICAgICB2YXIgc3luYyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlcmF0b3Iob2JqW2tleV0sIGtleSwgb25seV9vbmNlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBuZXh0S2V5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKGl0ZXJhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzeW5jID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaXRlcmF0ZSgpO1xuICAgIH07XG5cblxuXG4gICAgYXN5bmMuZm9yRWFjaE9mTGltaXQgPVxuICAgIGFzeW5jLmVhY2hPZkxpbWl0ID0gZnVuY3Rpb24gKG9iaiwgbGltaXQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBfZWFjaE9mTGltaXQobGltaXQpKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2VhY2hPZkxpbWl0KGxpbWl0KSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgICAgIG9iaiA9IG9iaiB8fCBbXTtcbiAgICAgICAgICAgIHZhciBuZXh0S2V5ID0gX2tleUl0ZXJhdG9yKG9iaik7XG4gICAgICAgICAgICBpZiAobGltaXQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcnVubmluZyA9IDA7XG4gICAgICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gcmVwbGVuaXNoICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSAmJiBydW5uaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChydW5uaW5nIDwgbGltaXQgJiYgIWVycm9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IG5leHRLZXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcnVubmluZyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihvYmpba2V5XSwga2V5LCBvbmx5X29uY2UoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBsZW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBkb1BhcmFsbGVsKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihhc3luYy5lYWNoT2YsIG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9QYXJhbGxlbExpbWl0KGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oX2VhY2hPZkxpbWl0KGxpbWl0KSwgb2JqLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1Nlcmllcyhmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oYXN5bmMuZWFjaE9mU2VyaWVzLCBvYmosIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2FzeW5jTWFwKGVhY2hmbiwgYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgYXJyID0gYXJyIHx8IFtdO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IF9pc0FycmF5TGlrZShhcnIpID8gW10gOiB7fTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHZhbHVlLCBmdW5jdGlvbiAoZXJyLCB2KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMubWFwID0gZG9QYXJhbGxlbChfYXN5bmNNYXApO1xuICAgIGFzeW5jLm1hcFNlcmllcyA9IGRvU2VyaWVzKF9hc3luY01hcCk7XG4gICAgYXN5bmMubWFwTGltaXQgPSBkb1BhcmFsbGVsTGltaXQoX2FzeW5jTWFwKTtcblxuICAgIC8vIHJlZHVjZSBvbmx5IGhhcyBhIHNlcmllcyB2ZXJzaW9uLCBhcyBkb2luZyByZWR1Y2UgaW4gcGFyYWxsZWwgd29uJ3RcbiAgICAvLyB3b3JrIGluIG1hbnkgc2l0dWF0aW9ucy5cbiAgICBhc3luYy5pbmplY3QgPVxuICAgIGFzeW5jLmZvbGRsID1cbiAgICBhc3luYy5yZWR1Y2UgPSBmdW5jdGlvbiAoYXJyLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuZWFjaE9mU2VyaWVzKGFyciwgZnVuY3Rpb24gKHgsIGksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihtZW1vLCB4LCBmdW5jdGlvbiAoZXJyLCB2KSB7XG4gICAgICAgICAgICAgICAgbWVtbyA9IHY7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG1lbW8pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZm9sZHIgPVxuICAgIGFzeW5jLnJlZHVjZVJpZ2h0ID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IF9tYXAoYXJyLCBpZGVudGl0eSkucmV2ZXJzZSgpO1xuICAgICAgICBhc3luYy5yZWR1Y2UocmV2ZXJzZWQsIG1lbW8sIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnRyYW5zZm9ybSA9IGZ1bmN0aW9uIChhcnIsIG1lbW8sIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBpdGVyYXRvcjtcbiAgICAgICAgICAgIGl0ZXJhdG9yID0gbWVtbztcbiAgICAgICAgICAgIG1lbW8gPSBfaXNBcnJheShhcnIpID8gW10gOiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzeW5jLmVhY2hPZihhcnIsIGZ1bmN0aW9uKHYsIGssIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihtZW1vLCB2LCBrLCBjYik7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBtZW1vKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9maWx0ZXIoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7aW5kZXg6IGluZGV4LCB2YWx1ZTogeH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKF9tYXAocmVzdWx0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICAgICAgICAgICAgfSksIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgudmFsdWU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLnNlbGVjdCA9XG4gICAgYXN5bmMuZmlsdGVyID0gZG9QYXJhbGxlbChfZmlsdGVyKTtcblxuICAgIGFzeW5jLnNlbGVjdExpbWl0ID1cbiAgICBhc3luYy5maWx0ZXJMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfZmlsdGVyKTtcblxuICAgIGFzeW5jLnNlbGVjdFNlcmllcyA9XG4gICAgYXN5bmMuZmlsdGVyU2VyaWVzID0gZG9TZXJpZXMoX2ZpbHRlcik7XG5cbiAgICBmdW5jdGlvbiBfcmVqZWN0KGVhY2hmbiwgYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgX2ZpbHRlcihlYWNoZm4sIGFyciwgZnVuY3Rpb24odmFsdWUsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih2YWx1ZSwgZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGNiKCF2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGFzeW5jLnJlamVjdCA9IGRvUGFyYWxsZWwoX3JlamVjdCk7XG4gICAgYXN5bmMucmVqZWN0TGltaXQgPSBkb1BhcmFsbGVsTGltaXQoX3JlamVjdCk7XG4gICAgYXN5bmMucmVqZWN0U2VyaWVzID0gZG9TZXJpZXMoX3JlamVjdCk7XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlVGVzdGVyKGVhY2hmbiwgY2hlY2ssIGdldFJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNiKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgICAgIGlmIChjYikgY2IoZ2V0UmVzdWx0KGZhbHNlLCB2b2lkIDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGVlKHgsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiICYmIGNoZWNrKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihnZXRSZXN1bHQodHJ1ZSwgeCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IgPSBpdGVyYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICBlYWNoZm4oYXJyLCBsaW1pdCwgaXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdG9yO1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yID0gbGltaXQ7XG4gICAgICAgICAgICAgICAgZWFjaGZuKGFyciwgaXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jLmFueSA9XG4gICAgYXN5bmMuc29tZSA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mLCB0b0Jvb2wsIGlkZW50aXR5KTtcblxuICAgIGFzeW5jLnNvbWVMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIHRvQm9vbCwgaWRlbnRpdHkpO1xuXG4gICAgYXN5bmMuYWxsID1cbiAgICBhc3luYy5ldmVyeSA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mLCBub3RJZCwgbm90SWQpO1xuXG4gICAgYXN5bmMuZXZlcnlMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIG5vdElkLCBub3RJZCk7XG5cbiAgICBmdW5jdGlvbiBfZmluZEdldFJlc3VsdCh2LCB4KSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBhc3luYy5kZXRlY3QgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZiwgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcbiAgICBhc3luYy5kZXRlY3RTZXJpZXMgPSBfY3JlYXRlVGVzdGVyKGFzeW5jLmVhY2hPZlNlcmllcywgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcbiAgICBhc3luYy5kZXRlY3RMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoYXN5bmMuZWFjaE9mTGltaXQsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICBhc3luYy5zb3J0QnkgPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMubWFwKGFyciwgZnVuY3Rpb24gKHgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih4LCBmdW5jdGlvbiAoZXJyLCBjcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHt2YWx1ZTogeCwgY3JpdGVyaWE6IGNyaXRlcmlhfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIF9tYXAocmVzdWx0cy5zb3J0KGNvbXBhcmF0b3IpLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY29tcGFyYXRvcihsZWZ0LCByaWdodCkge1xuICAgICAgICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhLCBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuYXV0byA9IGZ1bmN0aW9uICh0YXNrcywgY29uY3VycmVuY3ksIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25jdXJyZW5jeSBpcyBvcHRpb25hbCwgc2hpZnQgdGhlIGFyZ3MuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNvbmN1cnJlbmN5O1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrID0gX29uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIHZhciBrZXlzID0gX2tleXModGFza3MpO1xuICAgICAgICB2YXIgcmVtYWluaW5nVGFza3MgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgaWYgKCFyZW1haW5pbmdUYXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gcmVtYWluaW5nVGFza3M7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgICAgICB2YXIgcnVubmluZ1Rhc2tzID0gMDtcblxuICAgICAgICB2YXIgaGFzRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gW107XG4gICAgICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKGZuKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMudW5zaGlmdChmbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZm4pIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBfaW5kZXhPZihsaXN0ZW5lcnMsIGZuKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRhc2tDb21wbGV0ZSgpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1Rhc2tzLS07XG4gICAgICAgICAgICBfYXJyYXlFYWNoKGxpc3RlbmVycy5zbGljZSgwKSwgZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFyZW1haW5pbmdUYXNrcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfYXJyYXlFYWNoKGtleXMsIGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBpZiAoaGFzRXJyb3IpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0YXNrID0gX2lzQXJyYXkodGFza3Nba10pID8gdGFza3Nba106IFt0YXNrc1trXV07XG4gICAgICAgICAgICB2YXIgdGFza0NhbGxiYWNrID0gX3Jlc3RQYXJhbShmdW5jdGlvbihlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MtLTtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZVJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgX2ZvckVhY2hPZihyZXN1bHRzLCBmdW5jdGlvbih2YWwsIHJrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW3JrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNba10gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBzYWZlUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzW2tdID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHRhc2tDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgcmVxdWlyZXMgPSB0YXNrLnNsaWNlKDAsIHRhc2subGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRlYWQtbG9ja3NcbiAgICAgICAgICAgIHZhciBsZW4gPSByZXF1aXJlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZGVwO1xuICAgICAgICAgICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZGVwID0gdGFza3NbcmVxdWlyZXNbbGVuXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSGFzIG5vbmV4aXN0ZW50IGRlcGVuZGVuY3kgaW4gJyArIHJlcXVpcmVzLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkoZGVwKSAmJiBfaW5kZXhPZihkZXAsIGspID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXMgY3ljbGljIGRlcGVuZGVuY2llcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nVGFza3MgPCBjb25jdXJyZW5jeSAmJiBfcmVkdWNlKHJlcXVpcmVzLCBmdW5jdGlvbiAoYSwgeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGEgJiYgcmVzdWx0cy5oYXNPd25Qcm9wZXJ0eSh4KSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSkgJiYgIXJlc3VsdHMuaGFzT3duUHJvcGVydHkoayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhZHkoKSkge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUYXNrcysrO1xuICAgICAgICAgICAgICAgIHRhc2tbdGFzay5sZW5ndGggLSAxXSh0YXNrQ2FsbGJhY2ssIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ1Rhc2tzKys7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGFza1t0YXNrLmxlbmd0aCAtIDFdKHRhc2tDYWxsYmFjaywgcmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cblxuICAgIGFzeW5jLnJldHJ5ID0gZnVuY3Rpb24odGltZXMsIHRhc2ssIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBERUZBVUxUX1RJTUVTID0gNTtcbiAgICAgICAgdmFyIERFRkFVTFRfSU5URVJWQUwgPSAwO1xuXG4gICAgICAgIHZhciBhdHRlbXB0cyA9IFtdO1xuXG4gICAgICAgIHZhciBvcHRzID0ge1xuICAgICAgICAgICAgdGltZXM6IERFRkFVTFRfVElNRVMsXG4gICAgICAgICAgICBpbnRlcnZhbDogREVGQVVMVF9JTlRFUlZBTFxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlVGltZXMoYWNjLCB0KXtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0ID09PSAnbnVtYmVyJyl7XG4gICAgICAgICAgICAgICAgYWNjLnRpbWVzID0gcGFyc2VJbnQodCwgMTApIHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mIHQgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBhY2MudGltZXMgPSBwYXJzZUludCh0LnRpbWVzLCAxMCkgfHwgREVGQVVMVF9USU1FUztcbiAgICAgICAgICAgICAgICBhY2MuaW50ZXJ2YWwgPSBwYXJzZUludCh0LmludGVydmFsLCAxMCkgfHwgREVGQVVMVF9JTlRFUlZBTDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBhcmd1bWVudCB0eXBlIGZvciBcXCd0aW1lc1xcJzogJyArIHR5cGVvZiB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoIDwgMSB8fCBsZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIC0gbXVzdCBiZSBlaXRoZXIgKHRhc2spLCAodGFzaywgY2FsbGJhY2spLCAodGltZXMsIHRhc2spIG9yICh0aW1lcywgdGFzaywgY2FsbGJhY2spJyk7XG4gICAgICAgIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDIgJiYgdHlwZW9mIHRpbWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHRhc2s7XG4gICAgICAgICAgICB0YXNrID0gdGltZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcGFyc2VUaW1lcyhvcHRzLCB0aW1lcyk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBvcHRzLnRhc2sgPSB0YXNrO1xuXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBwZWRUYXNrKHdyYXBwZWRDYWxsYmFjaywgd3JhcHBlZFJlc3VsdHMpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJldHJ5QXR0ZW1wdCh0YXNrLCBmaW5hbEF0dGVtcHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2VyaWVzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGFzayhmdW5jdGlvbihlcnIsIHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNDYWxsYmFjayghZXJyIHx8IGZpbmFsQXR0ZW1wdCwge2VycjogZXJyLCByZXN1bHQ6IHJlc3VsdH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCB3cmFwcGVkUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmV0cnlJbnRlcnZhbChpbnRlcnZhbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNlcmllc0NhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzQ2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAob3B0cy50aW1lcykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbmFsQXR0ZW1wdCA9ICEob3B0cy50aW1lcy09MSk7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMucHVzaChyZXRyeUF0dGVtcHQob3B0cy50YXNrLCBmaW5hbEF0dGVtcHQpKTtcbiAgICAgICAgICAgICAgICBpZighZmluYWxBdHRlbXB0ICYmIG9wdHMuaW50ZXJ2YWwgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMucHVzaChyZXRyeUludGVydmFsKG9wdHMuaW50ZXJ2YWwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzeW5jLnNlcmllcyhhdHRlbXB0cywgZnVuY3Rpb24oZG9uZSwgZGF0YSl7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFbZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAod3JhcHBlZENhbGxiYWNrIHx8IG9wdHMuY2FsbGJhY2spKGRhdGEuZXJyLCBkYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGEgY2FsbGJhY2sgaXMgcGFzc2VkLCBydW4gdGhpcyBhcyBhIGNvbnRyb2xsIGZsb3dcbiAgICAgICAgcmV0dXJuIG9wdHMuY2FsbGJhY2sgPyB3cmFwcGVkVGFzaygpIDogd3JhcHBlZFRhc2s7XG4gICAgfTtcblxuICAgIGFzeW5jLndhdGVyZmFsbCA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBfb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgaWYgKCFfaXNBcnJheSh0YXNrcykpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIHdhdGVyZmFsbCBtdXN0IGJlIGFuIGFycmF5IG9mIGZ1bmN0aW9ucycpO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyYXBJdGVyYXRvcihpdGVyYXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgW2Vycl0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHdyYXBJdGVyYXRvcihuZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZUFzeW5jKGl0ZXJhdG9yKS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwSXRlcmF0b3IoYXN5bmMuaXRlcmF0b3IodGFza3MpKSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfcGFyYWxsZWwoZWFjaGZuLCB0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IF9pc0FycmF5TGlrZSh0YXNrcykgPyBbXSA6IHt9O1xuXG4gICAgICAgIGVhY2hmbih0YXNrcywgZnVuY3Rpb24gKHRhc2ssIGtleSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRhc2soX3Jlc3RQYXJhbShmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNba2V5XSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMucGFyYWxsZWwgPSBmdW5jdGlvbiAodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wYXJhbGxlbChhc3luYy5lYWNoT2YsIHRhc2tzLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnBhcmFsbGVsTGltaXQgPSBmdW5jdGlvbih0YXNrcywgbGltaXQsIGNhbGxiYWNrKSB7XG4gICAgICAgIF9wYXJhbGxlbChfZWFjaE9mTGltaXQobGltaXQpLCB0YXNrcywgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5zZXJpZXMgPSBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgX3BhcmFsbGVsKGFzeW5jLmVhY2hPZlNlcmllcywgdGFza3MsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuaXRlcmF0b3IgPSBmdW5jdGlvbiAodGFza3MpIHtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUNhbGxiYWNrKGluZGV4KSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBmbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tzW2luZGV4XS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZm4ubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm4ubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGluZGV4IDwgdGFza3MubGVuZ3RoIC0gMSkgPyBtYWtlQ2FsbGJhY2soaW5kZXggKyAxKTogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ha2VDYWxsYmFjaygwKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuYXBwbHkgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoY2FsbEFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShcbiAgICAgICAgICAgICAgICBudWxsLCBhcmdzLmNvbmNhdChjYWxsQXJncylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gX2NvbmNhdChlYWNoZm4sIGFyciwgZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGluZGV4LCBjYikge1xuICAgICAgICAgICAgZm4oeCwgZnVuY3Rpb24gKGVyciwgeSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoeSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYy5jb25jYXQgPSBkb1BhcmFsbGVsKF9jb25jYXQpO1xuICAgIGFzeW5jLmNvbmNhdFNlcmllcyA9IGRvU2VyaWVzKF9jb25jYXQpO1xuXG4gICAgYXN5bmMud2hpbHN0ID0gZnVuY3Rpb24gKHRlc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gX3Jlc3RQYXJhbShmdW5jdGlvbihlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0LmFwcGx5KHRoaXMsIGFyZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG5leHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXRlcmF0b3IobmV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYy5kb1doaWxzdCA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxzID0gMDtcbiAgICAgICAgcmV0dXJuIGFzeW5jLndoaWxzdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiArK2NhbGxzIDw9IDEgfHwgdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy51bnRpbCA9IGZ1bmN0aW9uICh0ZXN0LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLndoaWxzdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5kb1VudGlsID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCB0ZXN0LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gYXN5bmMuZG9XaGlsc3QoaXRlcmF0b3IsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuZHVyaW5nID0gZnVuY3Rpb24gKHRlc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG5cbiAgICAgICAgdmFyIG5leHQgPSBfcmVzdFBhcmFtKGZ1bmN0aW9uKGVyciwgYXJncykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChjaGVjayk7XG4gICAgICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNoZWNrID0gZnVuY3Rpb24oZXJyLCB0cnV0aCkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRydXRoKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IobmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRlc3QoY2hlY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5kb0R1cmluZyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxzID0gMDtcbiAgICAgICAgYXN5bmMuZHVyaW5nKGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgICAgICAgIGlmIChjYWxscysrIDwgMSkge1xuICAgICAgICAgICAgICAgIG5leHQobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX3F1ZXVlKHdvcmtlciwgY29uY3VycmVuY3ksIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKGNvbmN1cnJlbmN5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGNvbmN1cnJlbmN5ID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmN1cnJlbmN5IG11c3Qgbm90IGJlIHplcm8nKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHBvcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGFzayBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFfaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkYXRhLmxlbmd0aCA9PT0gMCAmJiBxLmlkbGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhaW4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIHRhc2tzXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2FycmF5RWFjaChkYXRhLCBmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayB8fCBub29wXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcS50YXNrcy51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHEudGFza3MucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IHEuY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5zYXR1cmF0ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9uZXh0KHEsIHRhc2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB3b3JrZXJzIC09IDE7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIF9hcnJheUVhY2godGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9hcnJheUVhY2god29ya2Vyc0xpc3QsIGZ1bmN0aW9uICh3b3JrZXIsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2VyID09PSB0YXNrICYmICFyZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Vyc0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFzay5jYWxsYmFjay5hcHBseSh0YXNrLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggKyB3b3JrZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcS5wcm9jZXNzKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdvcmtlcnMgPSAwO1xuICAgICAgICB2YXIgd29ya2Vyc0xpc3QgPSBbXTtcbiAgICAgICAgdmFyIHEgPSB7XG4gICAgICAgICAgICB0YXNrczogW10sXG4gICAgICAgICAgICBjb25jdXJyZW5jeTogY29uY3VycmVuY3ksXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgc2F0dXJhdGVkOiBub29wLFxuICAgICAgICAgICAgZW1wdHk6IG5vb3AsXG4gICAgICAgICAgICBkcmFpbjogbm9vcCxcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgZmFsc2UsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBraWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcS5kcmFpbiA9IG5vb3A7XG4gICAgICAgICAgICAgICAgcS50YXNrcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2hpZnQ6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgdHJ1ZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSghcS5wYXVzZWQgJiYgd29ya2VycyA8IHEuY29uY3VycmVuY3kgJiYgcS50YXNrcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXNrcyA9IHEucGF5bG9hZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZSgwLCBxLnBheWxvYWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHEudGFza3Muc3BsaWNlKDAsIHEudGFza3MubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IF9tYXAodGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHEuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnB1c2godGFza3NbMF0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2IgPSBvbmx5X29uY2UoX25leHQocSwgdGFza3MpKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyKGRhdGEsIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VycztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3b3JrZXJzTGlzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXJzTGlzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZGxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcS50YXNrcy5sZW5ndGggKyB3b3JrZXJzID09PSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChxLnBhdXNlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdW1lQ291bnQgPSBNYXRoLm1pbihxLmNvbmN1cnJlbmN5LCBxLnRhc2tzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjYWxsIHEucHJvY2VzcyBvbmNlIHBlciBjb25jdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gd29ya2VyIHRvIHByZXNlcnZlIGZ1bGwgY29uY3VycmVuY3kgYWZ0ZXIgcGF1c2VcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3ID0gMTsgdyA8PSByZXN1bWVDb3VudDsgdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfVxuXG4gICAgYXN5bmMucXVldWUgPSBmdW5jdGlvbiAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuICAgICAgICB2YXIgcSA9IF9xdWV1ZShmdW5jdGlvbiAoaXRlbXMsIGNiKSB7XG4gICAgICAgICAgICB3b3JrZXIoaXRlbXNbMF0sIGNiKTtcbiAgICAgICAgfSwgY29uY3VycmVuY3ksIDEpO1xuXG4gICAgICAgIHJldHVybiBxO1xuICAgIH07XG5cbiAgICBhc3luYy5wcmlvcml0eVF1ZXVlID0gZnVuY3Rpb24gKHdvcmtlciwgY29uY3VycmVuY3kpIHtcblxuICAgICAgICBmdW5jdGlvbiBfY29tcGFyZVRhc2tzKGEsIGIpe1xuICAgICAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2JpbmFyeVNlYXJjaChzZXF1ZW5jZSwgaXRlbSwgY29tcGFyZSkge1xuICAgICAgICAgICAgdmFyIGJlZyA9IC0xLFxuICAgICAgICAgICAgICAgIGVuZCA9IHNlcXVlbmNlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoYmVnIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pZCA9IGJlZyArICgoZW5kIC0gYmVnICsgMSkgPj4+IDEpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIHNlcXVlbmNlW21pZF0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnID0gbWlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1pZCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9pbnNlcnQocSwgZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcS5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghX2lzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9hcnJheUVhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgPyBjYWxsYmFjayA6IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoX2JpbmFyeVNlYXJjaChxLnRhc2tzLCBpdGVtLCBfY29tcGFyZVRhc2tzKSArIDEsIDAsIGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgIHEuc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCB3aXRoIGEgbm9ybWFsIHF1ZXVlXG4gICAgICAgIHZhciBxID0gYXN5bmMucXVldWUod29ya2VyLCBjb25jdXJyZW5jeSk7XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgcHVzaCB0byBhY2NlcHQgc2Vjb25kIHBhcmFtZXRlciByZXByZXNlbnRpbmcgcHJpb3JpdHlcbiAgICAgICAgcS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFJlbW92ZSB1bnNoaWZ0IGZ1bmN0aW9uXG4gICAgICAgIGRlbGV0ZSBxLnVuc2hpZnQ7XG5cbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfTtcblxuICAgIGFzeW5jLmNhcmdvID0gZnVuY3Rpb24gKHdvcmtlciwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gX3F1ZXVlKHdvcmtlciwgMSwgcGF5bG9hZCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9jb25zb2xlX2ZuKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9yZXN0UGFyYW0oZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbX3Jlc3RQYXJhbShmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zb2xlW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYXJyYXlFYWNoKGFyZ3MsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZVtuYW1lXSh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSldKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYy5sb2cgPSBfY29uc29sZV9mbignbG9nJyk7XG4gICAgYXN5bmMuZGlyID0gX2NvbnNvbGVfZm4oJ2RpcicpO1xuICAgIC8qYXN5bmMuaW5mbyA9IF9jb25zb2xlX2ZuKCdpbmZvJyk7XG4gICAgYXN5bmMud2FybiA9IF9jb25zb2xlX2ZuKCd3YXJuJyk7XG4gICAgYXN5bmMuZXJyb3IgPSBfY29uc29sZV9mbignZXJyb3InKTsqL1xuXG4gICAgYXN5bmMubWVtb2l6ZSA9IGZ1bmN0aW9uIChmbiwgaGFzaGVyKSB7XG4gICAgICAgIHZhciBtZW1vID0ge307XG4gICAgICAgIHZhciBxdWV1ZXMgPSB7fTtcbiAgICAgICAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gICAgICAgIGhhc2hlciA9IGhhc2hlciB8fCBpZGVudGl0eTtcbiAgICAgICAgdmFyIG1lbW9pemVkID0gX3Jlc3RQYXJhbShmdW5jdGlvbiBtZW1vaXplZChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdmFyIGtleSA9IGhhc2hlci5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbChtZW1vLCBrZXkpKSB7ICAgXG4gICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgbWVtb1trZXldKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhcy5jYWxsKHF1ZXVlcywga2V5KSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVldWVzW2tleV0gPSBbY2FsbGJhY2tdO1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KFtfcmVzdFBhcmFtKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbW9ba2V5XSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxID0gcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBxdWV1ZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcVtpXS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbWVtb2l6ZWQubWVtbyA9IG1lbW87XG4gICAgICAgIG1lbW9pemVkLnVubWVtb2l6ZWQgPSBmbjtcbiAgICAgICAgcmV0dXJuIG1lbW9pemVkO1xuICAgIH07XG5cbiAgICBhc3luYy51bm1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoZm4udW5tZW1vaXplZCB8fCBmbikuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX3RpbWVzKG1hcHBlcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvdW50LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG1hcHBlcihfcmFuZ2UoY291bnQpLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jLnRpbWVzID0gX3RpbWVzKGFzeW5jLm1hcCk7XG4gICAgYXN5bmMudGltZXNTZXJpZXMgPSBfdGltZXMoYXN5bmMubWFwU2VyaWVzKTtcbiAgICBhc3luYy50aW1lc0xpbWl0ID0gZnVuY3Rpb24gKGNvdW50LCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhc3luYy5tYXBMaW1pdChfcmFuZ2UoY291bnQpLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgYXN5bmMuc2VxID0gZnVuY3Rpb24gKC8qIGZ1bmN0aW9ucy4uLiAqLykge1xuICAgICAgICB2YXIgZm5zID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4gX3Jlc3RQYXJhbShmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzeW5jLnJlZHVjZShmbnMsIGFyZ3MsIGZ1bmN0aW9uIChuZXdhcmdzLCBmbiwgY2IpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBuZXdhcmdzLmNvbmNhdChbX3Jlc3RQYXJhbShmdW5jdGlvbiAoZXJyLCBuZXh0YXJncykge1xuICAgICAgICAgICAgICAgICAgICBjYihlcnIsIG5leHRhcmdzKTtcbiAgICAgICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhhdCwgW2Vycl0uY29uY2F0KHJlc3VsdHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgYXN5bmMuY29tcG9zZSA9IGZ1bmN0aW9uICgvKiBmdW5jdGlvbnMuLi4gKi8pIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLnNlcS5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUucmV2ZXJzZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIF9hcHBseUVhY2goZWFjaGZuKSB7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uKGZucywgYXJncykge1xuICAgICAgICAgICAgdmFyIGdvID0gX3Jlc3RQYXJhbShmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVhY2hmbihmbnMsIGZ1bmN0aW9uIChmbiwgXywgY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncy5jb25jYXQoW2NiXSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ28uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ287XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLmFwcGx5RWFjaCA9IF9hcHBseUVhY2goYXN5bmMuZWFjaE9mKTtcbiAgICBhc3luYy5hcHBseUVhY2hTZXJpZXMgPSBfYXBwbHlFYWNoKGFzeW5jLmVhY2hPZlNlcmllcyk7XG5cblxuICAgIGFzeW5jLmZvcmV2ZXIgPSBmdW5jdGlvbiAoZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBkb25lID0gb25seV9vbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICB2YXIgdGFzayA9IGVuc3VyZUFzeW5jKGZuKTtcbiAgICAgICAgZnVuY3Rpb24gbmV4dChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFzayhuZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVuc3VyZUFzeW5jKGZuKSB7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5uZXJBcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICBzeW5jID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jLmVuc3VyZUFzeW5jID0gZW5zdXJlQXN5bmM7XG5cbiAgICBhc3luYy5jb25zdGFudCA9IF9yZXN0UGFyYW0oZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgIHZhciBhcmdzID0gW251bGxdLmNvbmNhdCh2YWx1ZXMpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhc3luYy53cmFwU3luYyA9XG4gICAgYXN5bmMuYXN5bmNpZnkgPSBmdW5jdGlvbiBhc3luY2lmeShmdW5jKSB7XG4gICAgICAgIHJldHVybiBfcmVzdFBhcmFtKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiByZXN1bHQgaXMgUHJvbWlzZSBvYmplY3RcbiAgICAgICAgICAgIGlmIChfaXNPYmplY3QocmVzdWx0KSAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIubWVzc2FnZSA/IGVyciA6IG5ldyBFcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIE5vZGUuanNcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgICB9XG4gICAgLy8gQU1EIC8gUmVxdWlyZUpTXG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gaW5jbHVkZWQgZGlyZWN0bHkgdmlhIDxzY3JpcHQ+IHRhZ1xuICAgIGVsc2Uge1xuICAgICAgICByb290LmFzeW5jID0gYXN5bmM7XG4gICAgfVxuXG59KCkpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuaW1wb3J0IFN0YXRlQSBmcm9tICcuLi9zdGF0ZS9GbG9vcidcbmNsYXNzIFRyYWNrRmxvb3Ige1xuXG4gIGNvbnN0cnVjdG9yICgpIHt9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5zdGF0ZUEgPSBuZXcgU3RhdGVBKFdvcmxkLm1haW5Hcm91cClcbiAgICB0aGlzLnN0YXRlQS5pbml0KClcblxuICAgIHRoaXMuZmxvb3JIZWlnaHQgPSAxMjBcbiAgICB0aGlzLnVwSGVpZ2h0ID0gMFxuICAgIHRoaXMuZG93bkhlaWdodCA9IHRoaXMuZmxvb3JIZWlnaHRcbiAgICAvLyBwb3NpdGlvbiBmcmFtZSBzcGVlZFxuICAgIHRoaXMucG9zaXRpb25TcGVlZCA9IDJcbiAgICAvLyBvcGFjaXR5IGZyYW1lIHNwZWVkXG4gICAgdGhpcy5vcGFjaXR5U3BlZWQgPSAwLjMgKiB0aGlzLnBvc2l0aW9uU3BlZWQgLyB0aGlzLmZsb29ySGVpZ2h0XG4gICAgLy8gc2hvcCBvcGFjaXR5IGZyYW1lIHNwZWVkXG4gICAgdGhpcy5vcGFjaXR5U3BlZWQyID0gMSAqIHRoaXMucG9zaXRpb25TcGVlZCAvIHRoaXMuZmxvb3JIZWlnaHRcbiAgfVxuXG4gIGRvd24gKGhpZ2gsIGxvdywgZ3JvdXApIHtcblxuICAgIHRoaXMuZG93bkhlaWdodCAtPSB0aGlzLnBvc2l0aW9uU3BlZWRcbiAgICBncm91cC5wb3NpdGlvbi55IC09IHRoaXMucG9zaXRpb25TcGVlZFxuICAgIGdyb3VwLmNoaWxkcmVuW2xvd10udXNlckRhdGEuaXNTaG93ID0gZmFsc2VcbiAgICBncm91cC5jaGlsZHJlbltoaWdoXS51c2VyRGF0YS5pc1Nob3cgPSB0cnVlXG4gICAgZ3JvdXAuY2hpbGRyZW5baGlnaF0udmlzaWJsZSA9IHRydWVcbiAgICBcbiAgICBncm91cC5jaGlsZHJlbltsb3ddLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSAtPSB0aGlzLm9wYWNpdHlTcGVlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5IC09IHRoaXMub3BhY2l0eVNwZWVkMlxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgZ3JvdXAuY2hpbGRyZW5baGlnaF0uY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdwbGFuZScpIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5ICs9IHRoaXMub3BhY2l0eVNwZWVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgKz0gdGhpcy5vcGFjaXR5U3BlZWQyXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgICAvLyBDb21wbGV0ZVxuICAgIGlmICh0aGlzLmRvd25IZWlnaHQgPD0gMCkge1xuICAgICAgdGhpcy5kb3duSGVpZ2h0ID0gdGhpcy5mbG9vckhlaWdodCAvLyByZXNldCBoZWlnaHRcbiAgICAgIHRoaXMuc3RhdGVBLmRvd25FbmQoKVxuICAgIH1cbiAgfVxuXG4gIGJlZm9yZVVwICgpIHtcbiAgICB0aGlzLnN0YXRlQS51cEJlZ2luKClcbiAgfVxuXG4gIGJlZm9yZURvd24gKCkge1xuICAgIHRoaXMuc3RhdGVBLmRvd25CZWdpbigpXG4gIH1cblxuICB1cCAoaGlnaCwgbG93LCBncm91cCkge1xuICAgIHRoaXMudXBIZWlnaHQgKz0gdGhpcy5wb3NpdGlvblNwZWVkXG4gICAgZ3JvdXAucG9zaXRpb24ueSArPSB0aGlzLnBvc2l0aW9uU3BlZWRcbiAgICBncm91cC5jaGlsZHJlbltoaWdoXS51c2VyRGF0YS5pc1Nob3cgPSBmYWxzZVxuICAgIGdyb3VwLmNoaWxkcmVuW2xvd10udXNlckRhdGEuaXNTaG93ID0gdHJ1ZVxuICAgIGdyb3VwLmNoaWxkcmVuW2xvd10udmlzaWJsZSA9IHRydWVcbiAgICBcbiAgICBncm91cC5jaGlsZHJlbltsb3ddLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSAncGxhbmUnKSB7XG4gICAgICAgIGl0ZW0ubWF0ZXJpYWwub3BhY2l0eSArPSB0aGlzLm9wYWNpdHlTcGVlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5ICs9IHRoaXMub3BhY2l0eVNwZWVkMlxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgZ3JvdXAuY2hpbGRyZW5baGlnaF0uY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdwbGFuZScpIHtcbiAgICAgICAgaXRlbS5tYXRlcmlhbC5vcGFjaXR5IC09IHRoaXMub3BhY2l0eVNwZWVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm1hdGVyaWFsLm9wYWNpdHkgLT0gdGhpcy5vcGFjaXR5U3BlZWQyXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodGhpcy51cEhlaWdodCA+PSB0aGlzLmZsb29ySGVpZ2h0KSB7XG4gICAgICB0aGlzLnVwSGVpZ2h0ID0gMFxuICAgICAgdGhpcy5zdGF0ZUEudXBFbmQoKVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVHJhY2tGbG9vclxuIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuXG4vKipcbiAqIGNoYW5nZSBzaW5nbGUgYW5kIG11bHRpIGJ5IHNvbWUgdHdlZW4sIGFuZCBiaW5kIHNvbWUgc3RhdHVzIGF0IGdyb3VwJ3MgdXNlckRhdGFcbiAqIFxuICogQGNsYXNzXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBtb2RlICAgc2NlbmUgbW9kZVxuICogQHBhcmFtRGVzYyBtb2RlICAgICAgICAgIDA6IGhvbWUsIDE6IGFzc29jaWF0aW9uXG4gKi9cbmNsYXNzIFR3ZWVuRmxvb3Ige1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5fZ2V0VHdlZW5WYWx1ZSgpXG4gIH1cblxuICAvLyBvbmx5IGhvbWVcbiAgc2luZ2xlVG9NdWx0aSAoKSB7XG4gICAgV29ybGQubWFpbkdyb3VwLmNoaWxkcmVuLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgaWYgKGdyb3VwLnZpc2libGUpIHtcblxuICAgICAgICBsZXQgcG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFDdXJyZW50LCB7IGN5OiBncm91cC5wb3NpdGlvbi55IH0pXG4gICAgICAgIGxldCB0YXJnZXQgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFPcmlnaW4sIHsgY3k6IGdyb3VwLnVzZXJEYXRhLnBvc2l0aW9uWSB9KVxuICAgICAgICBcbiAgICAgICAgZ3JvdXAuY2hpbGRyZW4uZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBtZXNoLnVzZXJEYXRhLmNvbG9yKVxuICAgICAgICAgIH0gZWxzZSBpZihtZXNoLm5hbWUgPT09ICdmbGFnJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5fc3BvcnQocG9zaXRpb24sIHRhcmdldCwgZ3JvdXAsICgpPT57XG4gICAgICAgICAgV29ybGQuY29udHJvbHMudGFyZ2V0LmNvcHkoV29ybGQuc2NlbmUucG9zaXRpb24pXG4gICAgICAgICAgV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLmFjdGl2ZSA9IDBcbiAgICAgICAgICBXb3JsZC5zdGF0dXMgPSAnbXVsdGknXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGlmIChncm91cC51c2VyRGF0YS5pc1Nob3cpe1xuICAgICAgICBncm91cC52aXNpYmxlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBtdWx0aVRvU2luZ2xlIChpbnRlcnNlY3QsIG1vZGUpIHtcbiAgICBcbiAgICBsZXQga2V5LCB2YWx1ZVxuICAgIGxldCBjb2xvciA9IHsgcjogMC41OSwgZzogMC41OSwgYjogMC41OSB9XG4gICAgXG4gICAgLy8gdHdvIHdheSB0byBzaW5nbGUgOiBjbGljayBidXR0b24sIGNsaWNrIGJvYXJkXG4gICAgaWYgKHR5cGVvZiBpbnRlcnNlY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBrZXkgPSAnbmFtZSdcbiAgICAgIHZhbHVlID0gaW50ZXJzZWN0Lm9iamVjdC5wYXJlbnQubmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSAnZmxvb3InXG4gICAgICB2YWx1ZSA9IGludGVyc2VjdFxuICAgIH1cbiAgICBcbiAgICBXb3JsZC5tYWluR3JvdXAuY2hpbGRyZW4uZm9yRWFjaChncm91cCA9PiB7XG4gICAgICBpZiAoZ3JvdXAudXNlckRhdGFba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZ3JvdXAudmlzaWJsZSA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoYXQgd2hlbiAnc2luZ2xlIHN0YXR1cycsIG1haW5Hcm91cCBuZWVkcyB0byByZWNvcmQgd2hpY2ggZmxvb3IgaXMgdmlzaWJsZS5cbiAgICAgICAgV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLnZpc2libGUgPSB2YWx1ZSAtIDFcbiAgICAgICAgLy8gY29ycmVjdCBjb250cm9sczogZHJhZyB0aGUgc2NlbmUgd2lsbCBtYWtlIGNhbWVyYSdzIHBlcnNwZWN0aXZlIHVuc3RhYmxlXG4gICAgICAgIC8vIHNvIHdlIG11c3QgcmVzZXQgYW5kIHVwZGF0ZSBieSBvdXJzZWx2ZXNcbiAgICAgICAgV29ybGQuY29udHJvbHMucmVzZXQoKVxuICAgICAgICBXb3JsZC5jb250cm9scy51cGRhdGUoKVxuICAgICAgICBXb3JsZC5jb250cm9scy50YXJnZXQuY29weShXb3JsZC5zY2VuZS5wb3NpdGlvbilcbiAgICAgICAgV29ybGQuc3RhdHVzID0gJ3NpbmdsZSdcblxuICAgICAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKG1lc2ggPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBjb2xvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMC4zKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAxKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIC8vIGp1ZGdlIG1vZGU6IGlmIGFzc29jaWF0aW9uLCBubyBhbmltYXRpb247IGlmIGhvbWUsIHR3ZWVuIGFuaW1hdGlvblxuICAgICAgICAvLyBhc3NvY2lhdGlvbiwgdGhlcmUgaXMgbm8gYW5nbGUsIHUgY2FuIHNlZSB0aGUgc2NlbmUgYXMgYSBwbGFuZSwgc28geSBpcyA4MDBcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDgwMCwgMClcbiAgICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMuY2FtZXJhQ3VycmVudCwgeyBjeTogZ3JvdXAucG9zaXRpb24ueSB9KVxuICAgICAgICAgIGxldCB0YXJnZXQgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5jYW1lcmFTcG9ydCwgeyBjeTogMjAwIH0pXG4gICAgICAgICAgdGhpcy5fc3BvcnQocG9zaXRpb24sIHRhcmdldCwgZ3JvdXApXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzaW5nbGVUb1NpbmdsZSAoZmxvb3IpIHtcbiAgICBcbiAgICBsZXQgY29sb3IgPSB7IHI6IDAuNTksIGc6IDAuNTksIGI6IDAuNTkgfVxuXG4gICAgV29ybGQuY29udHJvbHMudGFyZ2V0LmNvcHkoV29ybGQuc2NlbmUucG9zaXRpb24pXG4gICAgV29ybGQuc3RhdHVzID0gJ3NpbmdsZSdcblxuICAgIFdvcmxkLm1haW5Hcm91cC5jaGlsZHJlbi5mb3JFYWNoKChncm91cCwgdmFsKSA9PiB7XG4gICAgICBcbiAgICAgIGlmIChncm91cC52aXNpYmxlKSB7XG4gICAgICAgIGdyb3VwLnZpc2libGUgPSBmYWxzZVxuICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gZ3JvdXAudXNlckRhdGEucG9zaXRpb25ZXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2gobWVzaCA9PiB7XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldENvbG9yKG1lc2gsIG1lc2gudXNlckRhdGEuY29sb3IpXG4gICAgICAgICAgfSBlbHNlIGlmKG1lc2gubmFtZSA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwLnVzZXJEYXRhLmZsb29yID09PSBmbG9vcikge1xuICAgICAgICBXb3JsZC5tYWluR3JvdXAudXNlckRhdGEudmlzaWJsZSA9IHZhbFxuICAgICAgICBncm91cC52aXNpYmxlID0gdHJ1ZVxuICAgICAgICBncm91cC5wb3NpdGlvbi55ID0gMjAwO1xuICAgICAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKG1lc2ggPT4ge1xuICAgICAgICAgIGlmIChtZXNoLm5hbWUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXRDb2xvcihtZXNoLCBjb2xvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lc2gubmFtZSA9PT0gJ3BsYW5lJykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNldE9wYWNpdHkobWVzaCwgMC4zKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2V0T3BhY2l0eShtZXNoLCAxKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgIH0pXG5cbiAgfVxuICBcbiAgLy8gc2V0IG9yaWdpbiBwb3NpdGlvbiB2YWx1ZVxuICBfZ2V0VHdlZW5WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbWVyYUN1cnJlbnQ6IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnBvc2l0aW9uLngsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55LFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEucG9zaXRpb24uelxuICAgICAgfSxcbiAgICAgIGNhbWVyYU9yaWdpbjoge1xuICAgICAgICB4OiBXb3JsZC5jYW1lcmEudXNlckRhdGEucG9zaXRpb24ueCxcbiAgICAgICAgeTogV29ybGQuY2FtZXJhLnVzZXJEYXRhLnBvc2l0aW9uLnksXG4gICAgICAgIHo6IFdvcmxkLmNhbWVyYS51c2VyRGF0YS5wb3NpdGlvbi56XG4gICAgICB9LFxuICAgICAgY2FtZXJhU3BvcnQ6IHtcbiAgICAgICAgeDogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnggLSA1MDAsXG4gICAgICAgIHk6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi55ICsgNDAwLFxuICAgICAgICB6OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueiAtIDg1MFxuICAgICAgfSxcbiAgICAgIGNhbWVyYVNwb3J0WDoge1xuICAgICAgICB4OiBXb3JsZC5jYW1lcmEucG9zaXRpb24ueCAtIDUwMCxcbiAgICAgICAgeTogV29ybGQuY2FtZXJhLnBvc2l0aW9uLnkgKyA0MDAsXG4gICAgICAgIHo6IFdvcmxkLmNhbWVyYS5wb3NpdGlvbi56IC0gMTAwMFxuICAgICAgfSxcbiAgICAgIHNldENvbG9yOiAobWVzaCwgY29sb3IpID0+IHtcbiAgICAgICAgbWVzaC5tYXRlcmlhbC5jb2xvci5yID0gY29sb3IuclxuICAgICAgICBtZXNoLm1hdGVyaWFsLmNvbG9yLmcgPSBjb2xvci5nXG4gICAgICAgIG1lc2gubWF0ZXJpYWwuY29sb3IuYiA9IGNvbG9yLmJcbiAgICAgIH0sXG4gICAgICBzZXRPcGFjaXR5OiAobWVzaCwgb3BhY2l0eSkgPT4ge1xuICAgICAgICBtZXNoLm1hdGVyaWFsLm9wYWNpdHkgPSBvcGFjaXR5XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3Nwb3J0IChwb3NpdGlvbiwgdGFyZ2V0LCBncm91cCwgY29tcGxldGUgPSAoKT0+e30pIHtcbiAgICBsZXQgdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4ocG9zaXRpb24pLnRvKHRhcmdldCwgMjAwMClcbiAgICB0d2Vlbi5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24ueCA9IHBvc2l0aW9uLng7XG4gICAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24ueSA9IHBvc2l0aW9uLnk7XG4gICAgICBXb3JsZC5jYW1lcmEucG9zaXRpb24ueiA9IHBvc2l0aW9uLno7XG4gICAgICBncm91cC5wb3NpdGlvbi55ID0gcG9zaXRpb24uY3k7XG4gICAgICBXb3JsZC5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcbiAgICB9KVxuICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgIGNvbXBsZXRlKClcbiAgICB9KVxuICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxuICAgIC5zdGFydCgpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHdlZW5GbG9vciIsImV4cG9ydCBjb25zdCBob3VzZURhdGEgPSBbXG4gIHtcbiAgICBmbG9vcjogMSxcbiAgICB1cmw6ICcuL3N0YXRpYy9jZW5nLnN2ZycsXG4gICAgbmFtZTogJ0IxJ1xuICB9LFxuICB7XG4gICAgZmxvb3I6IDIsXG4gICAgdXJsOiAnLi9zdGF0aWMvY2VuZy5zdmcnLFxuICAgIG5hbWU6ICdCMidcbiAgfSxcbiAge1xuICAgIGZsb29yOiAzLFxuICAgIHVybDogJy4vc3RhdGljL2Nlbmcuc3ZnJyxcbiAgICBuYW1lOiAnQjMnXG4gIH0sXG4gIHtcbiAgICBmbG9vcjogNCxcbiAgICB1cmw6ICcuL3N0YXRpYy9jZW5nLnN2ZycsXG4gICAgbmFtZTogJ0YxJyxcbiAgICBnYXRlQXJyOiBbe1xuICAgICAgbG9nbzogJy9zdGF0aWMvY2FtZXJhLWluc2lkZS5wbmcnXG4gICAgfV1cbiAgfSxcbiAge1xuICAgIGZsb29yOiA1LFxuICAgIHVybDogJy4vc3RhdGljL2Nlbmcuc3ZnJyxcbiAgICBuYW1lOiAnRjInXG4gIH1cbl07IiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuXG5jbGFzcyBCbG9vbSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVuZGVyU2NlbmUgPSBuZXcgVEhSRUUuUmVuZGVyUGFzcyhXb3JsZC5zY2VuZSwgV29ybGQuY2FtZXJhKVxuICB9XG5cbiAgZ2V0IG1peGVyKCkgeyByZXR1cm4gdGhpcy5taXhlciB9XG4gIHNldCBtaXhlcih2YWwpIHsgdGhpcy5taXhlciA9IHZhbCB9XG5cbiAgdmVydGV4U2hhZGVyKCkge1xuICAgIHJldHVybiBgXG4gICAgdmFyeWluZyB2ZWMyIHZVdjtcbiAgICB2b2lkIG1haW4oKSB7XG4gICAgICB2VXYgPSB1djtcbiAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcbiAgICB9YFxuICB9XG5cbiAgZnJhZ21lbnRTaGFkZXIoKSB7XG4gICAgcmV0dXJuIGBcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCBiYXNlVGV4dHVyZTtcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCBibG9vbVRleHR1cmU7XG4gICAgdW5pZm9ybSBmbG9hdCBpVGltZTtcbiAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuICAgIHZlYzQgZ2V0VGV4dHVyZSggc2FtcGxlcjJEIHRleHR1cmUgKSB7XG4gICAgICByZXR1cm4gbWFwVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCB0ZXh0dXJlICwgdlV2ICkgKTtcbiAgICB9XG4gICAgdmVjMyB2MyggZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgeiApe1xuICAgICAgcmV0dXJuIHZlYzMoIHgsIHksIHogKTtcbiAgICB9XG4gICAgdmVjMyBoMnJnYiggZmxvYXQgaHVlICl7XG4gICAgICBmbG9hdCBoID0gYWJzKGh1ZSAtIGZsb29yKGh1ZSkpICogNi47XG4gICAgICB2ZWMzIGMgPSB2ZWMzKCAwLiwgMC4sIDAuICk7XG4gICAgICAgXG4gICAgICBpbnQgZiA9IGludChmbG9vciggaCApKTtcbiAgICAgICAgXG4gICAgICBpZihmID09IDApYyA9IHYzKDEuLCBoLCAwLik7XG4gICAgICBlbHNlIGlmKGYgPT0gMSljID0gdjMoMi4taCwgMS4sIDAuKTtcbiAgICAgIGVsc2UgaWYoZiA9PSAyKWMgPSB2MygwLiwgMS4sIGgtMi4pO1xuICAgICAgZWxzZSBpZihmID09IDMpYyA9IHYzKDAuLCA0Li1oLCAxLik7XG4gICAgICBlbHNlIGlmKGYgPT0gNCljID0gdjMoaC00LiwgMC4sIDEuKTtcbiAgICAgIGVsc2UgYyA9IHYzKDEuLCAwLiwgNi4gLSBoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIHZlYzMgb3JpZ2luQ29sb3IgPSBoMnJnYiggaVRpbWUgLyAxMC4gKTtcbiAgICAgIGdsX0ZyYWdDb2xvciA9ICggZ2V0VGV4dHVyZSggYmFzZVRleHR1cmUgKSArIHZlYzQoIDEuMCApICogZ2V0VGV4dHVyZSggYmxvb21UZXh0dXJlICkgKTtcbiAgICB9YFxuICB9XG5cbiAgc2hpbmluZyAocG9zKSB7XG4gICAgbGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KCAzLCAzMiwgMzIgKVxuICAgIGxldCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCggeyBjb2xvcjogJyNFRkVFMDAnLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0gKVxuICAgIGxldCBzcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgc3BoZXJlLnBvc2l0aW9uLnNldChwb3MueCwgcG9zLnksIHBvcy56KVxuICAgIHNwaGVyZS5yb3RhdGlvbi54ID0gLTAuNSAqIE1hdGguUElcbiAgICBXb3JsZC5zY2VuZS5hZGQoIHNwaGVyZSApXG4gICAgc3BoZXJlLm5hbWUgPSAnc2hpbmUnXG4gICAgc3BoZXJlLmxheWVycy5lbmFibGUoMSlcblxuICAgIHZhciBzY2FsZUtGID0gbmV3IFRIUkVFLlZlY3RvcktleWZyYW1lVHJhY2soICcuc2NhbGUnLCBbIDAsIDAuNSwgMSwgMS41LCAyIF0sIFsgMC41LCAwLjUsIDAuNSwgMS4yLCAxLjIsIDEuMiwgMC44LCAwLjgsIDAuOCwgMS4yLCAxLjIsIDEuMiwgMC41LCAwLjUsIDAuNSBdICk7XG4gICAgdmFyIGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcCggJ0FjdGlvbicsIDMsIFsgc2NhbGVLRiBdIClcbiAgICBCbG9vbS5taXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlciggc3BoZXJlICk7XG4gICAgdmFyIGNsaXBBY3Rpb24gPSBCbG9vbS5taXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAgLy8gY2xpcEFjdGlvbi5zZXRMb29wKCBUSFJFRS5Mb29wT25jZSApXG4gICAgY2xpcEFjdGlvbi5wbGF5KCk7XG5cbiAgICAvLyBCbG9vbS5taXhlci5hZGRFdmVudExpc3RlbmVyKCAnZmluaXNoZWQnLCAoIGUgKSA9PiB7IFxuICAgIC8vICAgc3BoZXJlLnZpc2libGUgPSBmYWxzZVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcmVtb3ZlRW50aXR5KG9iamVjdCkge1xuICAgIHZhciBzZWxlY3RlZE9iamVjdCA9IFdvcmxkLnNjZW5lLmdldE9iamVjdEJ5TmFtZShvYmplY3QubmFtZSk7XG4gICAgV29ybGQuc2NlbmUucmVtb3ZlKCBzZWxlY3RlZE9iamVjdCApO1xuICAgIC8vIGFuaW1hdGUoKTtcbn1cblxuICBzZXRCbG9vbVBhc3MgKCkge1xuICAgIGxldCBibG9vbVBhc3MgPSBuZXcgVEhSRUUuVW5yZWFsQmxvb21QYXNzKG5ldyBUSFJFRS5WZWN0b3IyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpLCAwLjUsIDAuMSwgMC4wNSlcblxuICAgIC8vIGJsb29tUGFzcy50aHJlc2hvbGQgPSAwO1xuICAgIC8vIGJsb29tUGFzcy5zdHJlbmd0aCA9IDAuNjU7XG4gICAgLy8gYmxvb21QYXNzLnJhZGl1cyA9IDIuNTtcblxuICAgIGJsb29tUGFzcy50aHJlc2hvbGQgPSAwO1xuICAgIGJsb29tUGFzcy5zdHJlbmd0aCA9IDI1O1xuICAgIGJsb29tUGFzcy5yYWRpdXMgPSAxLjY7XG5cbiAgICB0aGlzLmJsb29tQ29tcG9zZXIgPSBuZXcgVEhSRUUuRWZmZWN0Q29tcG9zZXIoV29ybGQucmVuZGVyZXIpO1xuICAgIHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXJUYXJnZXQxLnRleHR1cmUuZm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIucmVuZGVyVGFyZ2V0Mi50ZXh0dXJlLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlclRvU2NyZWVuID0gZmFsc2U7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnNldFNpemUod2luZG93LmlubmVyV2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgd2luZG93LmlubmVySGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW8pXG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLmFkZFBhc3MoIHRoaXMucmVuZGVyU2NlbmUgKTtcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIuYWRkUGFzcyggYmxvb21QYXNzICk7XG5cbiAgICByZXR1cm4gdGhpcy5ibG9vbUNvbXBvc2VyXG4gIH1cblxuICBzZXRGaW5hbFBhc3MgKCkge1xuICAgIGxldCBmaW5hbFBhc3MgPSBuZXcgVEhSRUUuU2hhZGVyUGFzcyhcbiAgICAgIG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XG4gICAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgICAgLy8gaVRpbWU6IFdvcmxkLnRpbWUsXG4gICAgICAgICAgYmFzZVRleHR1cmU6IHt2YWx1ZTogbnVsbH0sXG4gICAgICAgICAgYmxvb21UZXh0dXJlOiB7dmFsdWU6IHRoaXMuYmxvb21Db21wb3Nlci5yZW5kZXJUYXJnZXQyLnRleHR1cmV9XG4gICAgICAgIH0sXG4gICAgICAgIHZlcnRleFNoYWRlcjogdGhpcy52ZXJ0ZXhTaGFkZXIoKSxcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI6IHRoaXMuZnJhZ21lbnRTaGFkZXIoKSxcbiAgICAgICAgZGVmaW5lczoge31cbiAgICAgIH0pLCAnYmFzZVRleHR1cmUnXG4gICAgKTtcblxuICAgIGxldCBmaW5hbENvbXBvc2VyID0gbmV3IFRIUkVFLkVmZmVjdENvbXBvc2VyKCBXb3JsZC5yZW5kZXJlcik7XG4gICAgZmluYWxDb21wb3Nlci5yZW5kZXJUYXJnZXQxLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgZmluYWxDb21wb3Nlci5yZW5kZXJUYXJnZXQyLmZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7XG4gICAgZmluYWxDb21wb3Nlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCB3aW5kb3cuaW5uZXJIZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuICAgIGZpbmFsQ29tcG9zZXIuYWRkUGFzcyggdGhpcy5yZW5kZXJTY2VuZSApO1xuICAgIGZpbmFsQ29tcG9zZXIuYWRkUGFzcyggZmluYWxQYXNzICk7XG4gICAgZmluYWxDb21wb3Nlci5uZWVkc1N3YXAgPSB0cnVlXG5cbiAgICByZXR1cm4gZmluYWxDb21wb3NlclxuICB9XG5cblxufVxuZXhwb3J0IGRlZmF1bHQgQmxvb20iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5pbXBvcnQgeyBTY3JlZW5Ub1dvcmxkIH0gZnJvbSAnLi4vdXRpbC9UcmFuc2Zvcm1BbGV4J1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuLi9vYmplY3QvU3ByaXRlJzsgICAgICAgICAgICAgICAgICAgIC8vIHNwcml0ZVxuY2xhc3MgR2F0ZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgXG4gIC8qKlxuICAgKiBoYW5kbGUgZHJhZyBhbmQgY2xpY2sgZG93biBldmVudCwgYW5kIHBpY3R1cmUgd2lsbCB0cmFuc2Zvcm0gdG8gc3ByaXRlXG4gICAqIFxuICAgKiBAcGFyYW0geyBkb21FbGVtZW50IH0gZWwgICAgIHBhcmVudCBlbGVtZW50XG4gICAqIEBwYXJhbSB7IGV2ZW50IH0gZSAgICAgICAgICAgd2luZG93IGV2ZW50XG4gICAqL1xuICBjcmVhdGVHYXRlIChlbCwgZSwgc3ByaXRlTGlzdCkge1xuICAgIGlmIChlLnRhcmdldCAmJiAoZS50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0lNRycpKSB7XG4gICAgICAvLyBnZXQgaW1nIHNyY1xuICAgICAgbGV0IHNyYyA9IGUudGFyZ2V0LnNyYy5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAvLyBnYXRlRWwgLT4gZGl2IC0+IGltZ1xuICAgICAgbGV0IGltZyA9IGVsLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdXG4gICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgIC8vIHBpY3R1cmUgd2lsbCBwb3NpdGlvbiBhdCB0aGUgbW91c2UgY2VudGVyXG4gICAgICBsZXQgZGl2WCA9IGV2ZW50LmNsaWVudFggLSBpbWcub2Zmc2V0V2lkdGggLyAyXG4gICAgICBsZXQgZGl2WSA9IGV2ZW50LmNsaWVudFkgLSBpbWcub2Zmc2V0SGVpZ2h0IC8gMlxuICAgICAgXG4gICAgICBib3guc3JjID0gYC4vc3RhdGljLyR7c3JjfWBcbiAgICAgIGJveC5zdHlsZS53aWR0aCA9ICcyMHB4J1xuICAgICAgYm94LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgYm94LnN0eWxlLmxlZnQgPSBkaXZYICsgJ3B4J1xuICAgICAgYm94LnN0eWxlLnRvcCA9IGRpdlkgKyAncHgnXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJveClcbiAgICAgIFxuICAgICAgLy8gd2hlbiBtb3VzZSBtb3ZlLCBnYXRlIHBpY3R1cmUgcGxlYXNlIGZvbGxvdyBteSBoYW5kXG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudFxuICAgICAgICBsZXQgZGl2WCA9IGV2ZW50LmNsaWVudFggLSBpbWcub2Zmc2V0V2lkdGggLyAyXG4gICAgICAgIGxldCBkaXZZID0gZXZlbnQuY2xpZW50WSAtIGltZy5vZmZzZXRIZWlnaHQgLyAyXG4gICAgICAgIGJveC5zdHlsZS5sZWZ0ID0gZGl2WCArICdweCdcbiAgICAgICAgYm94LnN0eWxlLnRvcCA9IGRpdlkgKyAncHgnXG4gICAgICB9XG5cbiAgICAgIC8vIHdoZW4gbW91c2UgY2xpY2ssIGdhdGUgcGljdHVyZSBwbGVhc2UgYnJlYWtpbmcgdGhlIGRpbWVuc2lvblxuICAgICAgYm94Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbFxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJveClcbiAgICAgICAgbGV0IG5ld1NjcmVlbiA9IFNjcmVlblRvV29ybGQoe3g6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFl9KVxuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIGdhdGUgc3ByaXRlXG4gICAgICAgIGxldCBzcHJpdGUgPSBuZXcgU3ByaXRlKClcbiAgICAgICAgbGV0IHNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoMTIsIDcsIDgpXG4gICAgICAgIGxldCBtZXNoID0gc3ByaXRlLmNyZWF0ZVBpYyhib3guc3JjLCBzY2FsZSlcbiAgICAgICAgbWVzaC5wb3NpdGlvbi54ID0gbmV3U2NyZWVuLnhcbiAgICAgICAgbWVzaC5wb3NpdGlvbi55ID0gMTBcbiAgICAgICAgbWVzaC5wb3NpdGlvbi56ID0gLW5ld1NjcmVlbi55XG4gICAgICAgIFxuICAgICAgICBXb3JsZC5tYWluR3JvdXAuY2hpbGRyZW5bV29ybGQubWFpbkdyb3VwLnVzZXJEYXRhLnZpc2libGVdLmFkZChtZXNoKVxuICAgICAgICBzcHJpdGVMaXN0LnB1c2gobWVzaClcbiAgICAgICAgLy8gdG9kbzogdGV4dFxuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTGV2aXRhdGVCb3ggKHNjcmVlbkFsZXgpIHtcbiAgICB2YXIgbGV2aXRhdGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldmljZV9fcG9wcGVyLS13cmFwJylcbiAgICBpZiAoc2NyZWVuQWxleCkge1xuICAgICAgdmFyIGhsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaG9yaXpvbnRhbC1saW5lJylbMF1cbiAgICAgIHZhciBsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWJ1dHRvbicpWzBdXG4gICAgICBsaW5lLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgZmFsc2UpXG4gICAgICBobC5zdHlsZS53aWR0aCA9ICcwcHgnXG4gICAgICAvLyBpZiAoIWNvbW11bml0eURhdGEuc2VsZikge1xuICAgICAgLy8gICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwdWxsLXJpZ2h0JylbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgLy8gICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwdWxsLWxlZnQnKVswXS5zdHlsZS5tYXJnaW5SaWdodCA9ICcwcHgnXG4gICAgICAvLyAgIGxpbmUuaW5uZXJIVE1MID0gJydcbiAgICAgIC8vIH1cbiAgICAgIHZhciB3eSA9IHNjcmVlbkFsZXgueSAtIDE3MlxuICAgICAgdmFyIHd4ID0gc2NyZWVuQWxleC54IC0gMTAwXG4gICAgICBpZiAod3ggPCAwICkge1xuICAgICAgICB3eCA9IDBcbiAgICAgIH1cbiAgICAgIGlmICh3eSA8IDApIHtcbiAgICAgICAgaWYgKCh3eCArIDExND4gc2NyZWVuQWxleC54KSAmJiAxNTAgPiBzY3JlZW5BbGV4LnkpIHtcbiAgICAgICAgICBobC5zdHlsZS50b3AgPSBzY3JlZW5BbGV4LnkgKyAncHgnXG4gICAgICAgICAgaGwuc3R5bGUucmlnaHQgPSAtMjQgKyAncHgnXG4gICAgICAgICAgaGwuc3R5bGUud2lkdGggPSAyMiArICdweCdcbiAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgdHJ1ZSlcbiAgICAgICAgICB3eCAtPSA0NFxuICAgICAgICB9XG4gICAgICAgIHd5ID0gMFxuICAgICAgfVxuICAgICAgbGV2aXRhdGVuLnN0eWxlLnRvcCA9IHd5ICsgJ3B4J1xuICAgICAgbGV2aXRhdGVuLnN0eWxlLmxlZnQgPSB3eCArICdweCdcbiAgICAgIGxldml0YXRlbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXZpdGF0ZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2F0ZSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi4vb2JqZWN0L1Nwcml0ZSdcbi8qKlxuICogQGRlc2Mg5Zyw5Zu+57G7XG4gKiBAcGFyYW1zIHNoYXBlIOW9oueKtlxuICogQHBhcmFtcyBvcHRpb25zIOadkOi0qOWvueixoVxuICovXG5jbGFzcyBNYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBUSFJFRS5TVkdMb2FkZXIoKVxuICB9XG5cbiAgLy8g5Yib5bu65Yeg5L2V5L2TXG4gIGNyZWF0ZUdlb21ldHJ5KCkge1xuICAgIHJldHVybiBuZXcgVEhSRUUuR2VvbWV0cnkoKVxuICB9XG5cbiAgLy8g5Yib5bu65ouJ5Ly45Yeg5L2V5L2TXG4gIGNyZWF0ZUV4dHJ1ZGVHZW9tZXRyeShzaGFwZSkge1xuICAgIHJldHVybiBuZXcgVEhSRUUuRXh0cnVkZUJ1ZmZlckdlb21ldHJ5KHNoYXBlLCB7XG4gICAgICBkZXB0aDogNSxcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgLy8g5Yib5bu65p2Q6LSoXG4gIGNyZWF0ZU1hdGVyaWFsKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKG9wdGlvbnMpXG4gIH1cblxuICAvLyDliJvlu7rnvZHmoLxcbiAgY3JlYXRlTWVzaChzaGFwZSwgb3B0aW9ucywgbmFtZSkge1xuICAgIGxldCBnZW8gPSB0aGlzLmNyZWF0ZUdlb21ldHJ5KClcbiAgICBsZXQgZXh0cnVkZUdlbyA9IHRoaXMuY3JlYXRlRXh0cnVkZUdlb21ldHJ5KHNoYXBlKVxuICAgIGdlby5mcm9tQnVmZmVyR2VvbWV0cnkoZXh0cnVkZUdlbylcbiAgICBnZW8udHJhbnNsYXRlKC0yOTAsIC0yMTQsIDApXG4gICAgbGV0IG1hdCA9IHRoaXMuY3JlYXRlTWF0ZXJpYWwob3B0aW9ucywgbmFtZSlcbiAgICBsZXQgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICAgIG1lc2gubmFtZSA9IG5hbWVcbiAgICByZXR1cm4gbWVzaFxuICB9XG5cbiAgaW5pdFRlbXBsYXRlKHVybCwgY2FsbGJhY2ssIGFzeW5jQ2IgPSAoKSA9PiB7fSkge1xuICAgIHRoaXMubG9hZGVyLmxvYWQodXJsLCBkYXRhID0+IHtcbiAgICAgIGxldCBwYXRocyA9IGRhdGEucGF0aHNcbiAgICAgIHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgIGxldCBzaGFwZXMgPSBwYXRoLnRvU2hhcGVzKHRydWUpXG4gICAgICAgIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhwYXRoLCBzaGFwZSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICBhc3luY0NiKG51bGwpXG4gICAgfSlcbiAgfVxuXG4gIGxvYWRNYXAoaXRlbSwgZ3JvdXAsIGNhbGxiYWNrKSB7XG4gICAgXG4gICAgY29uc3Qgb3JpZ2luUG9zaXRpb24gPSAoaXRlbS5mbG9vciAtIDIpICogMTIwIC0gNjBcblxuICAgIHRoaXMuaW5pdFRlbXBsYXRlKGl0ZW0udXJsLCAocGF0aCwgc2hhcGUpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiBwYXRoLmNvbG9yLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogZ3JvdXAucG9zaXRpb24ueSA+IDE4MCB8fCBncm91cC5wb3NpdGlvbi55IDwgLTE4MCA/IDAgOiAxLFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gICAgICB9XG5cbiAgICAgIGxldCBtZXNoID0gdGhpcy5jcmVhdGVNZXNoKHNoYXBlLCBvcHRpb25zLCAnc3RvcmUnKVxuICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoMC41ICogTWF0aC5QSSwgMCwgMClcbiAgICAgIG1lc2gudXNlckRhdGEub3JpZ2luUG9zaXRpb24gPSBvcmlnaW5Qb3NpdGlvblxuICAgICAgbWVzaC51c2VyRGF0YS5jb2xvciA9IHtcbiAgICAgICAgcjogbWVzaC5tYXRlcmlhbC5jb2xvci5yLFxuICAgICAgICBnOiBtZXNoLm1hdGVyaWFsLmNvbG9yLmcsXG4gICAgICAgIGI6IG1lc2gubWF0ZXJpYWwuY29sb3IuYlxuICAgICAgfVxuXG4gICAgICBncm91cC5hZGQobWVzaClcblxuICAgIH0sIGNhbGxiYWNrKVxuICAgIGdyb3VwLnBvc2l0aW9uLnkgPSBvcmlnaW5Qb3NpdGlvblxuICB9XG5cbiAgLy8gYm9hcmRcbiAgbG9hZFBsYW5lKGl0ZW0sIGdyb3VwLCBwbGFuZUxpc3QpIHtcbiAgICBjb25zdCBvcmlnaW5Qb3NpdGlvbiA9IChpdGVtLmZsb29yIC0gMikgKiAxMjAgLSA2NVxuICAgIGdyb3VwLnVzZXJEYXRhLnBvc2l0aW9uWSA9IG9yaWdpblBvc2l0aW9uXG4gICAgdGhpcy5pbml0VGVtcGxhdGUoJy4vc3RhdGljL2JvdHRvbS5zdmcnLCAocGF0aCwgc2hhcGUpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAnIzFhNDI1ZScsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAvLyBvcGFjaXR5OiAwLjNcbiAgICAgICAgb3BhY2l0eTogZ3JvdXAucG9zaXRpb24ueSA+IDE4MCB8fCBncm91cC5wb3NpdGlvbi55IDwgLTE4MCA/IDAgOiAwLjNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IG1lc2ggPSB0aGlzLmNyZWF0ZU1lc2goc2hhcGUsIG9wdGlvbnMsICdwbGFuZScpXG4gICAgICBtZXNoLnJvdGF0aW9uLnNldCgwLjUgKiBNYXRoLlBJLCAwLCAwKVxuICAgICAgbWVzaC5wb3NpdGlvbi55ID0gLTVcbiAgICAgIG1lc2gudXNlckRhdGEgPSB7XG4gICAgICAgIG9yaWdpblBvc2l0aW9uOiBvcmlnaW5Qb3NpdGlvbixcbiAgICAgICAgZ3JvdXBJbmZvOiBpdGVtXG4gICAgICB9XG4gICAgICBwbGFuZUxpc3QucHVzaChtZXNoKVxuICAgICAgZ3JvdXAuYWRkKG1lc2gpXG4gICAgICBvcHRpb25zLm9wYWNpdHkgPyBncm91cC51c2VyRGF0YS5pc1Nob3cgPSB0cnVlIDogZ3JvdXAudXNlckRhdGEuaXNTaG93ID0gZmFsc2VcbiAgICB9KVxuICB9XG4gIFxuXG4gIC8vIGdhdGUgc3ByaXRlXG4gIGNyZWF0ZUdhdGVMb2dvKGxvZ28sIGdyb3VwKSB7XG4gICAgY29uc3Qgc3ByaXRlID0gbmV3IFNwcml0ZSgpXG4gICAgY29uc3Qgb3B0aW9uID0ge1xuICAgICAgb3BhY2l0eTogMFxuICAgIH1cbiAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKDIwLCAxMiwgMTUpXG4gICAgbGV0IG1lc2ggPSBzcHJpdGUuY3JlYXRlUGljKGxvZ28sIHNjYWxlLCBvcHRpb24pXG4gICAgZ3JvdXAuYWRkKG1lc2gpXG4gIH1cblxuICAvLyB0ZXh0IHNwcml0ZVxuICBjcmVhdGVGbG9vck5hbWUobmFtZSwgZ3JvdXApIHtcbiAgICBjb25zdCBmb250U2l6ZSA9IDMwXG4gICAgbGV0IHNwcml0ZSA9IG5ldyBTcHJpdGUoKVxuICAgIGxldCBvcHRpb24gPSB7XG4gICAgICBvcGFjaXR5OiBncm91cC5wb3NpdGlvbi55ID4gMTgwIHx8IGdyb3VwLnBvc2l0aW9uLnkgPCAtMTgwID8gMCA6IDFcbiAgICB9XG4gICAgbGV0IG1lc2ggPSBzcHJpdGUuY3JlYXRlVGV4dChuYW1lLCBmb250U2l6ZSwgb3B0aW9uKVxuICAgIGdyb3VwLmFkZChtZXNoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcDsiLCJpbXBvcnQgV29ybGQgZnJvbSAnLi4vc2NlbmUvbWFwV29ybGQnXG5cbmNsYXNzIFJheWNhc3RlcntcblxuICBjb25zdHJ1Y3RvciAoZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnRcbiAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICB9XG5cbiAgaGFuZGxlRXZlbnQgKHJheUxpc3QsIGNhbGxiYWNrLCBlbXB0eUNhbGxiYWNrID0gKCkgPT4ge30pIHtcbiAgICBjb25zdCBtb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKClcbiAgICBjb25zdCBjb250YWluZXIgPSBXb3JsZC5yZW5kZXJlci5kb21FbGVtZW50XG4gIFxuICAgIG1vdXNlLnggPSAodGhpcy5ldmVudC5jbGllbnRYIC8gY29udGFpbmVyLmNsaWVudFdpZHRoKSAqIDIgLSAxXG4gICAgbW91c2UueSA9IC0gKHRoaXMuZXZlbnQuY2xpZW50WSAvIGNvbnRhaW5lci5jbGllbnRIZWlnaHQpICogMiArIDFcbiAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKG1vdXNlLCBXb3JsZC5jYW1lcmEpXG4gICAgXG4gICAgbGV0IGludGVyc2VjdHMgPSB0aGlzLnJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKHJheUxpc3QpXG4gICAgaWYgKGludGVyc2VjdHMubGVuZ3RoID4gMCkge1xuICAgICAgY2FsbGJhY2soaW50ZXJzZWN0cylcbiAgICB9IGVsc2Uge1xuICAgICAgZW1wdHlDYWxsYmFjaygpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJheWNhc3RlciIsIi8qKlxuICogQ3JlYXRlIGFsbCBraW5kcyBvZiBTcHJpdGVcbiAqIFxuICogQGNsYXNzICAgICAgICAgICAgICAgICAgICAgU3ByaXRlXG4gKiBAY29uc3RydWN0b3IgICAgICAgICAgICAgICBpbml0IHZhcmlhYmxlXG4gKi9cbmNsYXNzIFNwcml0ZSB7XG4gIFxuICBjb25zdHJ1Y3RvciAoKSB7fVxuXG4gIC8qKlxuICAgICogY3JlYXRlIHRleHQgc3ByaXRlXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7IFN0cmluZyB9IHRleHQgICAgICAgICAgICAgdGV4dCB3aWxsIGJlIGZpbGxlZFxuICAgICogQHBhcmFtIHsgTnVtYmVyIH0gZm9udFNpemUgICAgICAgICBmb250IHNpemVcbiAgICAqIEBwYXJhbSB7IE9iamVjdCB9IGV4dHJhT3B0aW9uICAgICAgc29tZSBleHRyYSBtYXRlcmlhbCBvcHRpb25cbiAgICAqIEByZXR1cm4geyBPYmplY3QgfSAgICAgICAgICAgICAgICAgc3ByaXRlIG1lc2hcbiAgICAqL1xuICBjcmVhdGVUZXh0ICh0ZXh0LCBmb250U2l6ZSwgZXh0cmFPcHRpb24pIHtcbiAgICBjb25zdCBkZXB0aCA9IDEwMDAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbWVyYSBkZXB0aFxuICAgIGNvbnN0IHNjYWxlID0gZGVwdGggKiAoKDEgLyA1MCkgKiBmb250U2l6ZSkgICAgICAgLy8gY2FudmFzIHNjYWxlIHJhdGlvXG4gICAgLy8gY3JlYXRlIGEgY2FudmFzXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy53aWR0aCA9IGZvbnRTaXplICogMzJcblxuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZidcbiAgICBjdHguZm9udCA9IGZvbnRTaXplICsgXCJweCAn5b6u6L2v6ZuF6buRJ1wiXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKVxuXG4gICAgLy8gY3JlYXRlIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcylcbiAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZSAgLy8gdGV4dHVyZSBtYXRyaXggY2FuIGJlIG1hbnVhbCB1cGRhdGVcblxuICAgIC8vIGNyZWF0ZSB0ZXh0IHNwcml0ZSBvYmplY3RcbiAgICBsZXQgb3B0aW9uID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXA6IHRleHR1cmUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSwgXG4gICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgIH0sIGV4dHJhT3B0aW9uKVxuICAgIGxldCBzcHJpdGUgPSB0aGlzLl9jcmVhdGVTcHJpdGUob3B0aW9uKVxuICAgIFxuICAgIHNwcml0ZS5uYW1lID0gJ3RleHQnXG4gICAgc3ByaXRlLnNjYWxlLnNldChzY2FsZSwgc2NhbGUsIHNjYWxlKVxuICAgIHNwcml0ZS5wb3NpdGlvbi5zZXQoLTI5MSwgMTAsIDApXG4gICAgcmV0dXJuIHNwcml0ZVxuICB9XG5cbiAgLyoqXG4gICAgKiBjcmVhdGUgdGV4dCBzcHJpdGVcbiAgICAqIFxuICAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGljVXJsICAgICAgICAgICAgIHBpY3RydWUgd2lsbCBiZSBsb2FkXG4gICAgKiBAcGFyYW0geyBPYmplY3QgfSBleHRyYU9wdGlvbiAgICAgICAgc29tZSBleHRyYSBtYXRlcmlhbCBvcHRpb25cbiAgICAqIEByZXR1cm4geyBPYmplY3QgfSAgICAgICAgICAgICAgICAgICBzcHJpdGUgbWVzaFxuICAgICovXG4gIGNyZWF0ZVBpYyAocGljVXJsLCBzY2FsZSwgZXh0cmFPcHRpb24pIHtcbiAgICBpZiAoIWV4dHJhT3B0aW9uKSB7XG4gICAgICBleHRyYU9wdGlvbiA9IHtvcGFjaXR5OiAxfVxuICAgIH1cbiAgICBsZXQgb3B0aW9uID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXA6IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZChwaWNVcmwpLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsIFxuICAgICAgZGVwdGhUZXN0OiBmYWxzZVxuICAgIH0sIGV4dHJhT3B0aW9uKVxuICAgIGxldCBzcHJpdGUgPSB0aGlzLl9jcmVhdGVTcHJpdGUob3B0aW9uKVxuICAgIFxuICAgIHNwcml0ZS5uYW1lID0gJ2ZsYWcnXG4gICAgc3ByaXRlLnNjYWxlLnNldChzY2FsZS54LCBzY2FsZS55LCBzY2FsZS56KVxuICAgIHNwcml0ZS5wb3NpdGlvbi5zZXQoMCwgMTAsIDApXG4gICAgXG4gICAgcmV0dXJuIHNwcml0ZVxuICB9XG5cbiAgLyoqXG4gICAgKiBjcmVhdGUgZ2VuZXJhbCBzcHJpdGVcbiAgICAqIFxuICAgICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqICAgICAgICAgICAgICBtYXRlcmlhbCBPcHRpb25cbiAgICAqIEByZXR1cm4geyAzZE9iamVjdCB9ICAgICAgICAgICAgICAgbWF0ZXJpYWwgT2JqZWN0XG4gICAgKi9cbiAgX2NyZWF0ZVNwcml0ZSAob2JqKSB7XG4gICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlNwcml0ZU1hdGVyaWFsKG9iailcbiAgICBsZXQgc3ByaXRlID0gbmV3IFRIUkVFLlNwcml0ZShtYXRlcmlhbClcbiAgICByZXR1cm4gc3ByaXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlIiwiaW1wb3J0IHsgaG91c2VEYXRhIH0gZnJvbSAnLi4vZGF0YS9Ib3VzZScgICAgICAgICAgICAgICAgIC8vIG1hcCBkYXRhXG4vLyAzRCBPYmplY3RcbmltcG9ydCBNYXAgZnJvbSAnLi4vb2JqZWN0L01hcCcgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzRCBtYXBcbmltcG9ydCBHYXRlIGZyb20gJy4uL29iamVjdC9HYXRlJyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnYXRlXG5pbXBvcnQgUmF5Y2FzdGVyIGZyb20gJy4uL29iamVjdC9SYXljYXN0ZXInICAgICAgICAgICAgICAgLy8gcmF5Y2FzdGVyXG5pbXBvcnQgQmxvb20gZnJvbSAnLi4vb2JqZWN0L0Jsb29tJyAgICAgICAgICAgICAgICAgICAgICAgLy8gYmxvb20gc2hpbmluZ1xuLy8gYW5pbWF0ZVxuaW1wb3J0IFRyYWNrRmxvb3IgZnJvbSAnLi4vYW5pbWF0aW9uL1RyYWNrRmxvb3InICAgICAgICAgIC8vIHVwICYgZG93biBhbmltYXRlXG5pbXBvcnQgVHdlZW5GbG9vciBmcm9tICcuLi9hbmltYXRpb24vVHdlZW5GbG9vcicgICAgICAgICAgLy8gY2hhbmdlIGZsb29yXG5pbXBvcnQgU3RhdGVBIGZyb20gJy4uL3N0YXRlL0Zsb29yJyAgICAgICAgICAgICAgICAgICAgICAgLy8gdXAgJiBkb3duIHN0YXRlXG4vLyB1dGlsXG5pbXBvcnQgQ29tcGlsZSBmcm9tICcuLi91dGlsL0NvbXBpbGUnICAgICAgICAgICAgICAgICAgICAgLy8gZG9tIGNvbXBpbGVcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vdXRpbC9ldmVudCdcbmNvbnN0IGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3luY2hyb25vdXNcblxuLyoqXG4gKiBNZW1iZXJcbiAqIHByaXZhdGU6IF9oZWxsb1xuICogcHVibGljOiBoZWxsb1xuICogc3RhdGljOiBnZXQgaGVsbG8oKXt9XG4gKi9cblxuLyoqXG4gKiDkuIrluJ3nsbvvvIzlrprkuYnnpL7nvqTlkozpppbpobXkuK3nmoTlhajpg6jmlrnms5VcbiAqIFxuICogQGNsYXNzIFdvcmxkXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBtb2RlICAg5Zy65pmv5qih5byPXG4gKiBAcGFyYW1EZXNjIG1vZGUgICAgICAgICAgMDog6aaW6aG1LCAxOiDnpL7nvqRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICBjb25zdHJ1Y3Rvcihtb2RlKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZVxuICAgIHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKVxuICB9XG5cbiAgLy8g6Ieq54S2546v5aKD5YaF55qE5omA5pyJ5oiQ5ZGY77yM5YWB6K645Zyo5Lu75L2V57G75Lit6KKr5L+u5pS5XG4gIGdldCBzY2VuZSgpIHsgcmV0dXJuIHRoaXMuc2NlbmUgfVxuICBzZXQgc2NlbmUodmFsKSB7IHRoaXMuc2NlbmUgPSB2YWwgfVxuXG4gIGdldCBjYW1lcmEoKSB7IHJldHVybiB0aGlzLmNhbWVyYSB9XG4gIHNldCBjYW1lcmEodmFsKSB7IHRoaXMuY2FtZXJhID0gdmFsIH1cblxuICBnZXQgcmVuZGVyZXIoKSB7IHJldHVybiB0aGlzLnJlbmRlcmVyIH1cbiAgc2V0IHJlbmRlcmVyKHZhbCkgeyB0aGlzLnJlbmRlcmVyID0gdmFsIH1cblxuICBnZXQgbWFpbkdyb3VwKCkgeyByZXR1cm4gdGhpcy5tYWluR3JvdXB9XG4gIHNldCBtYWluR3JvdXAodmFsKSB7IHRoaXMubWFpbkdyb3VwID0gdmFsIH1cblxuICBnZXQgc3RhdHVzKCkgeyByZXR1cm4gdGhpcy5zdGF0dXMgfVxuICBzZXQgc3RhdHVzKHZhbCkgeyB0aGlzLnN0YXR1cyA9IHZhbCB9XG5cbiAgZ2V0IGNvbnRyb2xzKCkgeyByZXR1cm4gdGhpcy5jb250cm9scyB9XG4gIHNldCBjb250cm9scyh2YWwpIHsgdGhpcy5jb250cm9scyA9IHZhbCB9XG5cbiAgZ2V0IGxheWVycygpIHsgcmV0dXJuIHRoaXMubGF5ZXJzIH1cbiAgc2V0IGxheWVycyh2YWwpIHsgdGhpcy5sYXllcnMgPSB2YWwgfVxuXG4gIGdldCB0aW1lKCkgeyByZXR1cm4gdGhpcy50aW1lIH1cbiAgc2V0IHRpbWUodmFsKSB7IHRoaXMudGltZSA9IHZhbCB9XG5cbiAgLy8gaW5pdCBzY2VuZVxuICBpbml0KCkge1xuXG4gICAgdGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICAgICAgICAgICAgICAgICAgICAgICAgLy8g55S75biD5a69XG4gICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgICAgICAgICAgICAgICAgICAgICAgLy8g55S75biD6auYXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5ICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FudmFz55S75biD5a655ZmoXG4gICAgdGhpcy5wbGFuZUxpc3QgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9hcmQgbGlzdCBmb3IgcmF5Y2FzdGVyXG4gICAgdGhpcy5zcHJpdGVMaXN0ID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ByaXRlIGxpc3QgZm9yIHJheWNhc3RlclxuXG4gICAgdGhpcy5kb21Db21waWxlKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tcGlsZSBkb20gaW4gaHRtbFxuXG4gICAgLy8gY3JlYXRlIHNjZW5lXG4gICAgV29ybGQuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIC8vIFdvcmxkLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoJyNBQUFBQUEnKVxuXG4gICAgLy8gY3JlYXRlIGNhbWVyYVxuICAgIGNvbnN0IENBTV9QT1MgPSBuZXcgVEhSRUUuVmVjdG9yMyg1MDAsIDQwMCwgMTAwMClcbiAgICBXb3JsZC5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIHRoaXMud2lkdGggLyB0aGlzLmhlaWdodCwgMSwgMTAwMDApXG4gICAgV29ybGQuY2FtZXJhLnBvc2l0aW9uLnNldChDQU1fUE9TLngsIENBTV9QT1MueSwgQ0FNX1BPUy56KVxuICAgIFdvcmxkLmNhbWVyYS51c2VyRGF0YS5wb3NpdGlvbiA9IENBTV9QT1MgICAgICAgICAgICAgIC8vIOWkh+S7veebuOacuuWIneWni+S9jee9ruWAvFxuXG4gICAgLy8gY3JlYXRlIHJlbmRlcmVyXG4gICAgV29ybGQucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZVxuICAgIH0pXG4gICAgV29ybGQucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbylcbiAgICBXb3JsZC5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLy8gV29ybGQucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgLy8gV29ybGQucmVuZGVyZXIudG9uZU1hcHBpbmcgPSBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nO1xuICAgIC8vIGdhbW1h55+r5q2j77yM6KGo546w5Ye65p2l55qE5pWI5p6c5piv5YWJ5pmV55qE5aSn5bCP77yM5Lq655y855yf5a6e5oSf5aKe5by6XG4gICAgLy8gV29ybGQucmVuZGVyZXIuZ2FtbWFJbnB1dCA9IHRydWU7XG4gICAgLy8gV29ybGQucmVuZGVyZXIuZ2FtbWFPdXRwdXQgPSB0cnVlO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKFdvcmxkLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICBXb3JsZC5tYWluR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKSAgICAgICAgICAgICAgICAgICAvLyDllYblnLrmgLvliIbnu4RcbiAgICBXb3JsZC5sYXllcnMgPSBuZXcgVEhSRUUuTGF5ZXJzKClcbiAgICBXb3JsZC5sYXllcnMuc2V0KDApXG4gICAgV29ybGQuc3RhdHVzID0gJ211bHRpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Yid5aeL5YyW5Zy65pmv54q25oCBXG5cbiAgICAvLyDmnoTlu7rnjq/looNcbiAgICB0aGlzLmNyZWF0ZUNvbnRyb2xzKClcbiAgICB0aGlzLmNyZWF0ZUxpZ2h0KClcbiAgICAvLyB0aGlzLmNyZWF0ZVNoaW5lKHt4OiAwLCB5OiAwLCB6OiAwIH0pXG4gICAgdGhpcy5ldmVudENvbGxlY3Rpb24oKVxuXG4gICAgLy8g5Yid5aeL5YyWVHdlZW5GbG9vcuexuyAtIOWIh+aNoualvOWxguWKqOeUu1xuICAgIHRoaXMudHdlZW5GbG9vciA9IG5ldyBUd2VlbkZsb29yKClcbiAgICAvLyDlh7rlhaXlj6PnsbtcbiAgICB0aGlzLmdhdGUgPSBuZXcgR2F0ZSgpXG4gICAgXG4gICAgLy8g5Yid5aeL5YyWbWFw57G7IC0g5q+P5LiA5bGC5Lit55qE5omA5pyJ5YWD57SgXG4gICAgdGhpcy5tYXAgPSBuZXcgTWFwKClcbiAgICB0aGlzLmJ1aWxkaW5nUmlzZSgpXG5cbiAgICAvLyDpl6rngrnpgJrpgZNcbiAgICB0aGlzLmJsb29tID0gbmV3IEJsb29tKClcbiAgICB0aGlzLmJsb29tQ29tcG9zZXIgPSB0aGlzLmJsb29tLnNldEJsb29tUGFzcygpXG4gICAgdGhpcy5maW5hbENvbXBvc2VyID0gdGhpcy5ibG9vbS5zZXRGaW5hbFBhc3MoKVxuICAgIC8vIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuYmxvb20uc2hpbmluZyh7XG4gICAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiA0MDAgLSAyMDAsXG4gICAgICAgIHk6IDE4MCxcbiAgICAgICAgejogTWF0aC5yYW5kb20oKSAqIDIwMCAtIDEwMFxuICAgICAgfSlcbiAgICAvLyB9LCAyMDAwKVxuXG4gICAgLy8gVHJhY2tGbG9vcuexuyAtIOS4iuS4i+alvOWKqOeUu1xuICAgIHRoaXMuYW5pbWF0ZUZsb29yID0gbmV3IFRyYWNrRmxvb3IoKVxuICAgIHRoaXMuYW5pbWF0ZUZsb29yLmluaXQoKVxuXG4gICAgdGhpcy5hbmltYXRlKClcbiAgfVxuXG4gIC8vIOWIm+W7uuaXtumXtOa1gVxuICBhbmltYXRlKCkge1xuICAgIFRXRUVOLnVwZGF0ZSgpXG5cbiAgICB2YXIgZGVsdGEgPSB0aGlzLmNsb2NrLmdldERlbHRhKCk7XG5cbiAgICBpZiAoQmxvb20ubWl4ZXIpIHtcbiAgICAgIEJsb29tLm1peGVyLnVwZGF0ZSggZGVsdGEgKTtcbiAgICB9XG5cbiAgICBpZiAoU3RhdGVBLnVwKSB0aGlzLnVwRmxvb3IoKVxuICAgIGlmIChTdGF0ZUEuZG93bikgdGhpcy5kb3duRmxvb3IoKVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfSlcbiAgICBXb3JsZC5yZW5kZXJlci5yZW5kZXIoV29ybGQuc2NlbmUsIFdvcmxkLmNhbWVyYSlcbiAgICAvLyDmuLLmn5Ppl6rngrlcbiAgICBXb3JsZC5jYW1lcmEubGF5ZXJzLnNldCggMSk7XG4gICAgdGhpcy5ibG9vbUNvbXBvc2VyLnJlbmRlcigpO1xuICAgIFdvcmxkLmNhbWVyYS5sYXllcnMuc2V0KCAwICk7XG4gICAgLy8g5riy5p+T5pW05Liq5Zy65pmv77yM5bCG6KaG55uW5ZyoYmxvb23pgJrpgZPkuIpcbiAgICB0aGlzLmZpbmFsQ29tcG9zZXIucmVuZGVyKClcblxuICAgIFdvcmxkLmNvbnRyb2xzLnVwZGF0ZSgpXG4gIH1cblxuICAvLyBjcmVhdGUgbWFsbFxuICBidWlsZGluZ1Jpc2UoKSB7XG4gICAgLy8gYXN5bmPvvJpBZnRlciBhbGwgdGhlIHBpY3R1cmVzIGFyZSBsb2FkZWQsIHRoZSBjb25maWd1cmF0aW9uIG1vZGUgbWV0aG9kIGlzIGV4ZWN1dGVkLlxuICAgIGFzeW5jLmVhY2goaG91c2VEYXRhLCAoaXRlbSwgY2IpID0+IHtcbiAgICAgIGxldCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBncm91cFxuICAgICAgZ3JvdXAubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgZ3JvdXAudXNlckRhdGEuZmxvb3IgPSBpdGVtLmZsb29yICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIG9yaWdpbmFsIGZsb29yIGluIHVzZXJkYXRhXG4gICAgICBncm91cC51c2VyRGF0YS5keW5hbWljRmxvb3IgPSBpdGVtLmZsb29yICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgZHluYW1pYyBmbG9vcu+8mmNoYW5nZSB3aXRoIHVwJmRvd24gYW5pbWF0aW9uXG4gICAgICBncm91cC51c2VyRGF0YS5uYW1lID0gaXRlbS5uYW1lICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgb2JqZWN0LWdyb3VwIG5hbWVcblxuICAgICAgdGhpcy5tYXAubG9hZE1hcChpdGVtLCBncm91cCwgY2IpXG4gICAgICB0aGlzLm1hcC5sb2FkUGxhbmUoaXRlbSwgZ3JvdXAsIHRoaXMucGxhbmVMaXN0KVxuICAgICAgdGhpcy5tYXAuY3JlYXRlRmxvb3JOYW1lKGl0ZW0ubmFtZSwgZ3JvdXApXG4gICAgICBpZiAoaXRlbS5nYXRlQXJyKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpbiBkYXRhIGdhdGVBcnJcbiAgICAgICAgaXRlbS5nYXRlQXJyLmZvckVhY2goZ2F0ZSA9PiB7XG4gICAgICAgICAgdGhpcy5tYXAuY3JlYXRlR2F0ZUxvZ28oZ2F0ZS5sb2dvLCBncm91cClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgV29ybGQubWFpbkdyb3VwLmFkZChncm91cClcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLl9tb2RlRGlmZkhhbmRsZSgpXG4gICAgICBXb3JsZC5zY2VuZS5hZGQoV29ybGQubWFpbkdyb3VwKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gdXNlIGFzIGJ1aWxkUmlzZSgpXG4gIF9tb2RlRGlmZkhhbmRsZSAoKSB7XG4gICAgLy8gaWYgbW9kZSBpcyBhc3NvY2lhdGlvbiwgdGhlbiBmaXJzdCBzY2VuZSBzdGF0dXMgaXMgc2luZ2xlXG4gICAgaWYgKHRoaXMubW9kZSkge1xuICAgICAgdGhpcy5jaGFuZ2VGbG9vcigxKVxuICAgIH0gXG4gIH1cblxuICAvLyBnbyB1cCAtIHNpbmdsZSBmcmFtZVxuICB1cEZsb29yKCkge1xuICAgIGNvbnN0IGhpZ2ggPSBTdGF0ZUEuY291bnQgKyAzXG4gICAgY29uc3QgbG93ID0gU3RhdGVBLmNvdW50IC0gMVxuICAgIHRoaXMuYW5pbWF0ZUZsb29yLnVwKGhpZ2gsIGxvdywgV29ybGQubWFpbkdyb3VwKVxuICB9XG5cbiAgLy8gZ28gZG93biAtIHNpbmdsZSBmcmFtZVxuICBkb3duRmxvb3IoKSB7XG4gICAgY29uc3QgaGlnaCA9IFN0YXRlQS5jb3VudCArIDRcbiAgICBjb25zdCBsb3cgPSBTdGF0ZUEuY291bnRcbiAgICB0aGlzLmFuaW1hdGVGbG9vci5kb3duKGhpZ2gsIGxvdywgV29ybGQubWFpbkdyb3VwKVxuICB9XG5cbiAgLy8gc3dpdGNo77yacyAtIG1cbiAgc2luZ2xlVG9NdWx0aSgpIHtcbiAgICB0aGlzLnR3ZWVuRmxvb3Iuc2luZ2xlVG9NdWx0aSgpXG4gIH1cblxuICAvLyBzd2l0Y2g6IHMgLSBzXG4gIHNpbmdsZVRvU2luZ2xlKGZsb29yKSB7XG4gICAgdGhpcy50d2VlbkZsb29yLnNpbmdsZVRvU2luZ2xlKGZsb29yLCB0aGlzLm1vZGUpXG4gIH1cblxuICAvLyBzd2l0Y2g6IG0gLSBzXG4gIG11bHRpVG9TaW5nbGUoaW50ZXJzZWN0KSB7XG4gICAgdGhpcy50d2VlbkZsb29yLm11bHRpVG9TaW5nbGUoaW50ZXJzZWN0LCB0aGlzLm1vZGUpXG4gIH1cblxuICAvLyBzd2l0Y2g6IHRvIHNpbmdsZSwgMiBwb3NpdGlvbiwgZnJvbSBtdWx0aSwgZnJvbSBzaW5nbGVcbiAgY2hhbmdlRmxvb3IoZmxvb3IpIHtcbiAgICBpZiAoV29ybGQuc3RhdHVzID09PSAnbXVsdGknKSB7XG4gICAgICB0aGlzLm11bHRpVG9TaW5nbGUoZmxvb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2luZ2xlVG9TaW5nbGUoZmxvb3IpXG4gICAgfVxuICB9XG5cbiAgLy8gc3dpdGNoOiB0byBzaW5nbGUsIGZyb20gbXVsdGkgYW5kIHJheWNhc3RlclxuICBvbkRvY3VtZW50TW91c2VDbGljayhldmVudCkge1xuXG4gICAgbGV0IHJheWNhc3RlciA9IG5ldyBSYXljYXN0ZXIoZXZlbnQpXG4gICAgbGV0IHJheUxpc3QgPSBbXSAvLyByYXljYXN0ZXIgZmllbGRcbiAgICBcbiAgICBpZiAoV29ybGQuc3RhdHVzID09PSAnbXVsdGknKSB7XG5cbiAgICAgIHJheUxpc3QgPSB0aGlzLnBsYW5lTGlzdC5zbGljZShTdGF0ZUEuY291bnQsIFN0YXRlQS5jb3VudCArIDQpXG4gICAgICByYXljYXN0ZXIuaGFuZGxlRXZlbnQocmF5TGlzdCwgKGludGVyc2VjdHMpID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aVRvU2luZ2xlKGludGVyc2VjdHNbMF0pXG4gICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIFxuICAgICAgbGV0IHNjcmVlbkFsZXggPSB7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfVxuICAgICAgcmF5TGlzdCA9IHRoaXMuc3ByaXRlTGlzdFxuICAgICAgcmF5Y2FzdGVyLmhhbmRsZUV2ZW50KHJheUxpc3QsIChpbnRlcnNlY3RzKSA9PiB7XG5cbiAgICAgICAgdGhpcy5nYXRlLmNyZWF0ZUxldml0YXRlQm94KHNjcmVlbkFsZXgpXG5cbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHZhciBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV2aWNlX19wb3BwZXItLXdyYXAnKVxuICAgICAgICB2YXIgYm94TGVmdCA9IGJveC5vZmZzZXRMZWZ0XG4gICAgICAgIHZhciBib3hSaWdodCA9IGJveC5vZmZzZXRXaWR0aCArIGJveC5vZmZzZXRMZWZ0XG4gICAgICAgIHZhciBib3hUb3AgPSBib3gub2Zmc2V0VG9wXG4gICAgICAgIHZhciBib3hCb3R0b20gPSBib3gub2Zmc2V0SGVpZ2h0ICsgYm94Lm9mZnNldFRvcFxuICBcbiAgICAgICAgaWYgKGV2ZW50LmNsaWVudFggPCBib3hMZWZ0IHx8XG4gICAgICAgICAgZXZlbnQuY2xpZW50WCA+IGJveFJpZ2h0IHx8XG4gICAgICAgICAgZXZlbnQuY2xpZW50WSA8IGJveFRvcCB8fFxuICAgICAgICAgIGV2ZW50LmNsaWVudFkgPiBib3hCb3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMuZ2F0ZS5jcmVhdGVMZXZpdGF0ZUJveCgpXG4gICAgICAgIH1cblxuICAgICAgfSlcblxuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBvcmJpdCBjb250cm9sc1xuICBjcmVhdGVDb250cm9scygpIHtcbiAgICBXb3JsZC5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFdvcmxkLmNhbWVyYSwgV29ybGQucmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICBXb3JsZC5jb250cm9scy5lbmFibGVab29tID0gdHJ1ZVxuICAgIFdvcmxkLmNvbnRyb2xzLmVuYWJsZVJvdGF0ZSA9IHRydWVcbiAgICBXb3JsZC5jb250cm9scy5zY3JlZW5TcGFjZVBhbm5pbmcgPSB0cnVlXG4gICAgLy8gc2F2ZSB0aGUgc3RhcnQgc3RhdHVzIG9mIG9iamVjdCwgdGhlbiBjYW1lcmEgYW5pbWF0aW9uIHdpbGwga25vdyBhIHJlZmVyZW5jZSB2YWx1ZSBcbiAgICBXb3JsZC5jb250cm9scy5zYXZlU3RhdGUoKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBsaWdodFxuICBjcmVhdGVMaWdodCgpIHtcbiAgICAvLyB3YXJtIGxpZ2h0XG4gICAgbGV0IEFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDAuMik7XG4gICAgV29ybGQuc2NlbmUuYWRkKEFtYmllbnRMaWdodCk7XG4gICAgLy8gc2t5IGxpZ2h0XG4gICAgbGV0IGxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodCgweGZmZmZmZiwgMHgwMDAwMDAsIDAuOSk7XG4gICAgV29ybGQuc2NlbmUuYWRkKGxpZ2h0KTtcbiAgfVxuXG4gIGNyZWF0ZUFsZXgoKSB7XG4gICAgbGV0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxMDApO1xuICAgIFdvcmxkLnNjZW5lLmFkZChheGVzSGVscGVyKTtcbiAgfVxuXG4gIGV2ZW50Q29sbGVjdGlvbigpIHtcbiAgICBjb25zdCB1cGZsb29yRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBmbG9vcicpXG4gICAgY29uc3QgZG93bmZsb29yRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmZsb29yJylcbiAgICBjb25zdCBmbG9vciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9vcicpXG4gICAgY29uc3QgYWxsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsJylcbiAgICBjb25zdCBnYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2F0ZS1ncm91cCcpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VDbGljayhldmVudClcbiAgICB9LCBmYWxzZSk7XG4gICAgdXBmbG9vckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRlRmxvb3IuYmVmb3JlVXAoKVxuICAgIH0sIGZhbHNlKVxuICAgIGRvd25mbG9vckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRlRmxvb3IuYmVmb3JlRG93bigpXG4gICAgfSwgZmFsc2UpXG4gICAgYWxsRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnNpbmdsZVRvTXVsdGkoKVxuICAgIH0sIGZhbHNlKVxuICAgIGZsb29yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnQScpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGbG9vcihwYXJzZUludChlLnRhcmdldC5pbm5lckhUTUwpKVxuICAgICAgfVxuICAgIH0sIGZhbHNlKVxuICAgIGdhdGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0aGlzLmdhdGUuY3JlYXRlR2F0ZShnYXRlRWwsIGUsIHRoaXMuc3ByaXRlTGlzdClcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIC8vIGNvbXBpbGUgZG9tIFxuICBkb21Db21waWxlKCkge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJyk7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgIGZsb29yTGlzdDogWyB7IG5hbWU6IDEgfSwgeyBuYW1lOiAyIH0sIHsgbmFtZTogMyB9LCB7IG5hbWU6IDQgfSwgeyBuYW1lOiA1IH0gXVxuICAgIH1cbiAgICBuZXcgQ29tcGlsZShyb290LCBkYXRhKTtcbiAgfVxufVxuXG52YXIgd29ybGQgPSBuZXcgV29ybGQoMClcbndvcmxkLmluaXQoKSIsImltcG9ydCB7aG91c2VEYXRhfSBmcm9tICcuLi9kYXRhL0hvdXNlJ1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi91dGlsL2V2ZW50J1xuXG4vKipcbiAqIEEgRlNNXG4gKiBcbiAqIEBjbGFzcyBXb3JsZFxuICogQHBhcmFtIHsgM0QgT2JqZWN0IH0gZ3JvdXAgICAgIFxuICovXG5jbGFzcyBTdGF0ZUEge1xuICBjb25zdHJ1Y3RvciAoZ3JvdXApIHtcbiAgICB0aGlzLmdyb3VwID0gZ3JvdXBcbiAgfVxuXG4gIC8vIHN0YXRlOiB1cCBmbG9vciBpbmcuLi5cbiAgZ2V0IHVwICgpIHsgcmV0dXJuIHRoaXMudXAgfVxuICBzZXQgdXAgKHZhbCkgeyB0aGlzLnVwID0gdmFsIH1cblxuICAvLyBzdGF0ZTogZG93biBmbG9vciBpbmcuLi5cbiAgZ2V0IGRvd24gKCkgeyByZXR1cm4gdGhpcy5kb3duIH1cbiAgc2V0IGRvd24gKHZhbCkgeyB0aGlzLmRvd24gPSB2YWx9XG5cbiAgLy8gc3RhbmRhcmQgZmxvb3IgY291bnRcbiAgLy8gZ2V0IGZsb29yQ291bnQgKCkgeyByZXR1cm4gdGhpcy5mbG9vckNvdW50IH1cbiAgLy8gc2V0IGZsb29yQ291bnQgKG9iaikgeyB0aGlzLmZsb29yQ291bnQgPSBvYmogfVxuXG4gIC8vIGR5bmFtaWMgZmxvb3IgY291bnRcbiAgZ2V0IGNvdW50ICgpIHsgcmV0dXJuIHRoaXMuY291bnQgfVxuICBzZXQgY291bnQgKHZhbCkgeyB0aGlzLmNvdW50ID0gdmFsIH1cblxuICBpbml0ICgpIHtcbiAgICBTdGF0ZUEudXAgPSBmYWxzZVxuICAgIFN0YXRlQS5kb3duID0gZmFsc2VcbiAgICB0aGlzLmZsb29yQ291bnQgPSB0aGlzLl9nZXRVcERvd25GbG9vckNvdW50KHRoaXMuZ3JvdXApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIFN0YXRlQS5jb3VudCA9IHRoaXMuc3RhbmRhcmRDb3VudCA9IHRoaXMuZmxvb3JDb3VudC5wb3NpdGlvblxuICAgIHRoaXMuZmxvb3JDb3VudC5kb3duID0gdGhpcy5zdGFuZGFyZENvdW50IC0gKHRoaXMuZmxvb3JDb3VudC5kb3duIC0gMSlcbiAgICB0aGlzLmZsb29yQ291bnQudXAgPSB0aGlzLnN0YW5kYXJkQ291bnQgKyAodGhpcy5mbG9vckNvdW50LnVwIC0gMSlcbiAgICB0aGlzLm1pbkZsb29yID0gdGhpcy5fY2FjdWxhdGVNaW51c0luZGV4KGhvdXNlRGF0YSlcbiAgfVxuXG4gIHVwQmVnaW4gKCkge1xuICAgIGlmICggU3RhdGVBLmNvdW50ID4gMCAmJiAhU3RhdGVBLnVwICYmICFTdGF0ZUEuZG93biApIHtcbiAgICAgIFN0YXRlQS51cCA9IHRydWVcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KCd1cFRyaWdnZXInKVxuICAgIH1cbiAgfVxuXG4gIGRvd25CZWdpbiAoKSB7XG4gICAgaWYgKCBTdGF0ZUEuY291bnQgKyA0IDw9IHRoaXMuZmxvb3JDb3VudC51cCAmJiAhU3RhdGVBLmRvd24gJiYgIVN0YXRlQS51cCApIHtcbiAgICAgIFN0YXRlQS5kb3duID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHVwRW5kICgpIHtcbiAgICBTdGF0ZUEudXAgPSBmYWxzZVxuICAgIFN0YXRlQS5jb3VudC0tXG4gIH1cblxuICBkb3duRW5kICgpIHtcbiAgICBTdGF0ZUEuZG93biA9IGZhbHNlXG4gICAgU3RhdGVBLmNvdW50ICsrXG4gIH1cblxuICBfZ2V0VXBEb3duRmxvb3JDb3VudChncm91cCkge1xuICAgIHZhciBkb3duRmxvb3JDb3VudCA9IDA7XG4gICAgdmFyIHVwRmxvb3JDb3VudCA9IDA7XG4gICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICBncm91cC5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5mbG9vciA8IDApIHtcbiAgICAgICAgZG93bkZsb29yQ291bnQgKz0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBGbG9vckNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgZG93bjogZG93bkZsb29yQ291bnQsXG4gICAgICB1cDogdXBGbG9vckNvdW50XG4gICAgfVxuICB9XG5cbiAgX2NhY3VsYXRlTWludXNJbmRleChhcnIpIHtcbiAgICB2YXIgbWluRmxvb3IgPSAxMDAwXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0uZmxvb3IgPCBtaW5GbG9vciAmJiBhcnJbaV0uZmxvb3IgPiAwKSB7XG4gICAgICAgIG1pbkZsb29yID0gYXJyW2ldLmZsb29yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWluRmxvb3JcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZUEiLCJjb25zdCB0ZW1wbGF0ZVJlZyA9IC9cXCR7KFtee31dKSt9L2c7XG5jbGFzcyBDb21waWxlIHtcbiAgY29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xuICAgIHRoaXMuY29tcGlsZU5vZGUobm9kZSk7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICBub2RlLmhhc0NoaWxkTm9kZXMoKSA/IHRoaXMuY29tcGlsZU5vZGVMaXN0KG5vZGUuY2hpbGROb2RlcykgOiBudWxsO1xuICB9XG5cbiAgLy8g6Kej5p6Q6IqC54K5bGlzdFxuICBjb21waWxlTm9kZUxpc3Qobm9kZUxpc3QpIHtcbiAgICBsZXQgY2hpbGRMaXN0Rm4sIG5vZGU7XG4gICAgZm9yIChub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSAxICYmIG5vZGUuaGFzQXR0cmlidXRlKFwibS1yZXBlYXRcIikpIHtcbiAgICAgICAgdGhpcy5jb21waWxlRWxlbWVudChub2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGlsZU5vZGUobm9kZSk7XG4gICAgICAgIG5vZGUuaGFzQ2hpbGROb2RlcyA/IHRoaXMuY29tcGlsZU5vZGVMaXN0KG5vZGUuY2hpbGROb2RlcykgOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOino+aekOiKgueCuSBcbiAgY29tcGlsZU5vZGUobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDEpIHtcbiAgICAgIHRoaXMuY29tcGlsZUVsZW1lbnQobm9kZSk7XG4gICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09IDMpIHtcbiAgICAgIHRoaXMuY29tcGlsZVRleHQobm9kZSwgdGhpcy5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyDop6PmnpDoioLngrnlhYPntKBcbiAgY29tcGlsZUVsZW1lbnQobm9kZSkge1xuICAgIC8v6Kej5p6Q5oyH5LukXG4gICAgdmFyIGRpcnMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKFwibS1yZXBlYXRcIikpIHtcbiAgICAgIHRoaXMuZGVhbERpcihcIm0tcmVwZWF0XCIsIG5vZGUsIGRpcnMpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZShcIm0tc2hvd1wiKSkge1xuICAgICAgdGhpcy5kZWFsRGlyKFwibS1zaG93XCIsIG5vZGUsIGRpcnMpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZShcIm0taGlkZVwiKSkge1xuICAgICAgdGhpcy5kZWFsRGlyKFwibS1oaWRlXCIsIG5vZGUsIGRpcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIOino+aekOiKgueCueWFg+e0oOWGheWuuVxuICBjb21waWxlVGV4dChub2RlLCBkYXRhKSB7XG4gICAgLy/op6PmnpDmqKHmnb9cbiAgICBpZiAoIW5vZGUuZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBub2RlLmRhdGEgPSB0aGlzLmNvbXBpbGVUZW1wbGF0ZShub2RlLmRhdGEpKGRhdGEpO1xuICB9XG5cbiAgLy8g6Kej5p6Q5qih5p2/XG4gIGNvbXBpbGVUZW1wbGF0ZSh0ZXh0RnJhZ21lbnQpIHtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICBsZXQga2V5QXJyYXkgPSBbXTtcbiAgICB3aGlsZSAocmVzID0gdGVtcGxhdGVSZWcuZXhlYyh0ZXh0RnJhZ21lbnQpKSB7XG4gICAgICBsZXQga2V5ID0gcmVzWzBdLnNsaWNlKDIsIHJlc1swXS5sZW5ndGggLSAxKTtcbiAgICAgIGtleUFycmF5LnB1c2goa2V5KTtcbiAgICB9XG4gICAgZm9yIChsZXQgaXRlbSBvZiBrZXlBcnJheSkge1xuICAgICAgbGV0IG5SZWcgPSBuZXcgUmVnRXhwKFwiXFxcXCR7XCIgKyBpdGVtICsgXCJ9XCIsIFwiZ1wiKTtcbiAgICAgIGxldCBkYXRhU3RyID0gdGhpcy5kZWFsVGV4dChpdGVtKTtcbiAgICAgIGRhdGFTdHIgPSBkYXRhU3RyLnJlcGxhY2UoL1xcXFwvZywgXCJcIik7XG4gICAgICB0ZXh0RnJhZ21lbnQgPSB0ZXh0RnJhZ21lbnQucmVwbGFjZSgvXFxcXC9nLCBcIlwiKTtcbiAgICAgIHRleHRGcmFnbWVudCA9IHRleHRGcmFnbWVudC5yZXBsYWNlKG5SZWcsIGRhdGFTdHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZGF0YVwiLCBcInJldHVybiBgXCIgKyB0ZXh0RnJhZ21lbnQgKyBcImBcIik7XG4gIH1cblxuICAvLyDlpITnkIbmqKHmnb/lhoXlrrlcbiAgZGVhbFRleHQodGV4dCkge1xuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZGF0YVN0clN0YXJ0ID0gXCIke2RhdGEuXCI7XG4gICAgbGV0IGRhdGFTdHJFbmQgPSBcIn1cIjtcbiAgICByZXR1cm4gZGF0YVN0clN0YXJ0ICsgdGV4dCArIGRhdGFTdHJFbmQ7XG4gIH1cblxuICBjcmVhdGVEb2NGcmFnbWVudCgpIHtcbiAgICBsZXQgZG9jRnJhZ21lbnQgPSBudWxsO1xuICAgIHJldHVybiBkb2NGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgfVxuXG4gIC8vIOWkhOeQhuaMh+S7pFxuICBkZWFsRGlyKHR5cGUsIG5vZGUsIGRpcnMpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJtLXJlcGVhdFwiOlxuICAgICAgICAoKG5vZGUsIGRpcnMpID0+IHtcbiAgICAgICAgICBsZXQgZGlyQXJyID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJtLXJlcGVhdFwiKS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJtLXJlcGVhdFwiKVxuICAgICAgICAgIGxldCBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIGxldCBkb2NGcmFnbWVudCA9IHRoaXMuY3JlYXRlRG9jRnJhZ21lbnQoKTtcbiAgICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhW2RpckFyclsyXV0ubGVuZ3RoO1xuICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICB3aGlsZSAobGVuKSB7XG4gICAgICAgICAgICBsZXQgY2xvbmVOb2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjbG9uZU5vZGUuc2V0QXR0cmlidXRlKFwiaW5kZXhcIiwgaSk7XG4gICAgICAgICAgICBsZXQgbm9kZVRleHQgPSBjbG9uZU5vZGUuY2hpbGROb2Rlc1swXS5kYXRhO1xuICAgICAgICAgICAgbGV0IHJlcyA9IG51bGw7XG4gICAgICAgICAgICBsZXQga2V5QXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChyZXMgPSB0ZW1wbGF0ZVJlZy5leGVjKG5vZGVUZXh0KSkge1xuICAgICAgICAgICAgICBsZXQga2V5ID0gcmVzWzBdLnNsaWNlKDMgKyBkaXJBcnJbMF0ubGVuZ3RoLCByZXNbMF0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgIGtleUFycmF5LnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2Yga2V5QXJyYXkpIHtcbiAgICAgICAgICAgICAgbGV0IG5SZWcgPSBuZXcgUmVnRXhwKFwiXFxcXCR7XCIgKyBkaXJBcnJbMF0gKyBcIi5cIiArIGl0ZW0gKyBcIn1cIiwgXCJnXCIpO1xuICAgICAgICAgICAgICBjbG9uZU5vZGUuaW5uZXJIVE1MID0gY2xvbmVOb2RlLmlubmVySFRNTC5yZXBsYWNlKG5SZWcsIFwiJHtcIiArIGRpckFyclsyXSArIFwiXFxcXFtcIiArIGkgKyBcIlxcXFxdXFxcXC5cIiArIGl0ZW0gKyBcIn1cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2NGcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICAgICAgbGVuLS07XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG9jRnJhZ21lbnQpO1xuICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIH0pKG5vZGUsIGRpcnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJtLXNob3dcIjpcbiAgICAgICAgKChub2RlLCBkaXJzKSA9PiB7XG4gICAgICAgICAgbGV0IGZsYWcgPSBub2RlLmdldEF0dHJpYnV0ZShcIm0tc2hvd1wiKTtcbiAgICAgICAgICBsZXQgaXNTaG93ID0gdGhpcy5kYXRhW2ZsYWddXG4gICAgICAgICAgaWYgKGlzU2hvdykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KShub2RlLCBkaXJzKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJtLWhpZGVcIjpcbiAgICAgICAgKChub2RlLCBkaXJzKSA9PiB7XG4gICAgICAgICAgbGV0IGZsYWcgPSBub2RlLmdldEF0dHJpYnV0ZShcIm0taGlkZVwiKTtcbiAgICAgICAgICBsZXQgaXNTaG93ID0gdGhpcy5kYXRhW2ZsYWddXG4gICAgICAgICAgaWYgKCFpc1Nob3cpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkobm9kZSwgZGlycylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb21waWxlIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4uL3NjZW5lL21hcFdvcmxkJ1xuLy8gdG9kbzogbGVnYWN5IHZlcnNpb24gbm8gY29uc2lkZXJhdGlvbiBvZiBkZXB0aCBjaGFuZ2UsIEkgbmVlZCBhIG5ldyBmdW5jdGlvblxuZnVuY3Rpb24gU2NyZWVuVG9Xb3JsZCAoc2NyZWVuUG9pbnQpIHtcblxuICAgIC8vIOiOt+WPluWxj+W5leWdkOagh+aKleW9seWcqOebuOacuuS4iueahHjlkox56L2055qE5YC8XG4gICAgbGV0IHBYID0gKHNjcmVlblBvaW50LnggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiAyIC0gMVxuICAgIGxldCBwWSA9IC0oc2NyZWVuUG9pbnQueSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiAyICsgMVxuICAgIC8vIGxldCBwID0gbmV3IFRIUkVFLlZlY3RvcjMocFgsIHBZLCAtMSkudW5wcm9qZWN0KGNhbWVyYSk7XG4gICAgLy8gc2V0IHZlY3RvcjJcbiAgICAvLyBsZXQgcDIgPSBuZXcgVEhSRUUuVmVjdG9yMihwWCwgcFkpO1xuICAgIC8vIGdldCB6LWRlcHRoXG4gICAgbGV0IHpkID0gV29ybGQuY2FtZXJhLnBvc2l0aW9uLnkgLSAyMDBcbiAgICAvLyBnZXQgY2FtZXJhIGFuZ2xlICgxODAtNDUpLzJcbiAgICBsZXQgemEgPSA2Ny41ICogTWF0aC5QSSAvIDE4MFxuICAgIC8vIOiOt+WPluS4lueVjOWdkOagh+S4reeahHjovbTovrnnlYxcbiAgICBsZXQgYnggPSAoemQgLyBNYXRoLnRhbih6YSkpICogKHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0KVxuICAgIC8vIOiOt+WPluS4lueVjOWdkOagh+S4reeahHnovbTovrnnlYxcbiAgICBsZXQgYnkgPSB6ZCAvIE1hdGgudGFuKHphKVxuICAgIC8vIOiOt+WPluS4lueVjOWdkOagh+S4rXjovbTnmoTlrp7pmYXlnZDmoIfngrlcbiAgICBsZXQgc3ggPSBwWCAqIGJ4XG4gICAgLy8g6I635Y+W5LiW55WM5Z2Q5qCH5Liteei9tOeahOWunumZheWdkOagh+eCuVxuICAgIGxldCBzeSA9IHBZICogYnlcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBzeCxcbiAgICAgIHk6IHN5XG4gICAgfVxufVxuXG5cbmV4cG9ydCB7IFNjcmVlblRvV29ybGQgfSIsImNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fVxuICB9XG4gIFxuICBvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2V2ZW50c1tldmVudF0gfHwgW11cbiAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjaylcbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gY2FsbGJhY2tzXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG9mZiAoZXZlbnQsY2FsbGJhY2spe1xuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGNhbGxiYWNrcyAmJiBjYWxsYmFja3MuZmlsdGVyKGZuID0+IGZuICE9PSBjYWxsYmFjaylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZW1pdCAoLi4uYXJncyl7XG4gICAgY29uc3QgZXZlbnQgPSBhcmdzWzBdXG4gICAgY29uc3QgcGFyYW1zID0gW10uc2xpY2UuY2FsbChhcmdzLCAxKVxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICBjYWxsYmFja3MuZm9yRWFjaChmbiA9PiBmbi5hcHBseSh0aGlzLCBwYXJhbXMpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgXG4gIG9uY2UgKGV2ZW50LGNhbGxiYWNrKXtcbiAgICBsZXQgd3JhcEZ1bmMgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLGFyZ3MpXG4gICAgICAgIHRoaXMub2ZmKGV2ZW50LHdyYXBGdW5jKVxuICAgIH1cbiAgICB0aGlzLm9uKGV2ZW50LHdyYXBGdW5jKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyIl0sInNvdXJjZVJvb3QiOiIifQ==