import { debounce } from '@/utils'
export default {
  mounted () {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  methods: {
    // 是否是一个纯粹的对象
    isPlainObject (obj) {
      let key
      let coreHasOwn = {}.hasOwnProperty
      // Must be an Object.
      // Because of IE, we also have to check the presence of the constructor property.
      // Make sure that DOM nodes and window objects don't pass through, as well
      if (!obj || typeof obj !== 'object' || obj.nodeType || (obj !== null && obj === obj.window)) {
        return false
      }

      try {
        // Not own constructor property must be Object
        if (obj.constructor &&
          !coreHasOwn.call(obj, 'constructor') &&
          !coreHasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false
        }
      } catch (e) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false
      }

      // Own properties are enumerated firstly, so to speed up,
      // if last one is own, then all properties are own.
      for (key in obj) {
      }

      return key === undefined || coreHasOwn.call(obj, key)
    },
    // 递归合并对象
    extend () {
      let [
        src,
        copyIsArray,
        copy,
        name,
        options,
        clone,
        target,
        i,
        length,
        deep
      ] = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        arguments[0] || {},
        1,
        arguments.length,
        false
      ]

      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target
        target = arguments[1] || {}
        // skip the boolean and the target
        i = 2
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && typeof target !== 'function') {
        target = {}
      }

      // extend jQuery itself if only one argument is passed
      if (length === i) {
        target = this
        --i
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name]
            copy = options[name]

            // Prevent never-ending loop
            if (target === copy) {
              continue
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false
                clone = src && Array.isArray(src) ? src : []
              } else {
                clone = src && this.isPlainObject(src) ? src : {}
              }

              // Never move original objects, clone them
              target[name] = this.extend(deep, clone, copy)

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
      // Return the modified object
      return target
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHanlder)
  }
}
