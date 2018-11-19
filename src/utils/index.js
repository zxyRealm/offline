/**
 * Created by jiachenpan on 16/11/18.
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  // 兼容火狐 1992-12-12 12:23:56.0 时间格式 处理出现的bug
  if (time.toString().lastIndexOf('.') > -1) {
    time = time.toString().substr(0, time.lastIndexOf('.'))
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string') {
    time = time.replace(/-/g, '/') // ie无法处理2018-10-13 15:30:45 格式的时间 必需使用/为分隔符
    if (time && !isNaN(Date.parse(time))) {
      date = new Date(time.replace(/-/g, '/'))
    } else {
      return time
    }
  } else if (typeof time === 'number') {
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

// 格式化时间
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 序列化对象
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 自定义分组类型
export function customType (type, txt) {
  switch (type) {
    case 1:
      return txt ? '地理位置' : 'address'
    case 2:
      return txt ? '功能区' : 'action'
    case 3:
      return txt ? '管理者' : 'manage'
    default:
      return txt ? '其他' : 'more'
  }
}

// 多维数组还原一维数组
export function restoreArray (arr, children) {
  let newArray = []
  let restore = (arr, children) => {
    arr.map(item => {
      newArray.push(item)
      if (item[children] && item[children].length) {
        restore(item[children], children)
      }
    })
  }
  restore(arr, children)
  return newArray
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/^[\x00-\xff]/ig) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param (json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}
// 合并对象
export function objectMerge (target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}
// 滚动到具体位置
export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 深复制
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/* 社群结构树数组对象添加唯一标识  uniqueKey 为el-tree 对应的 node-key的值
* uniqueKey 修改时请慎重，会影响到group-nav和dialog-form 组件功能
*/
export function uniqueKey (arr, key = 'childGroupList') {
  let initKey = 1
  let setKey = (val) => {
    for (let i = 0; i < val.length; i++) {
      val[i].uniqueKey = initKey++
      if (val[i][key] && val[i][key].length) {
        setKey(val[i][key])
      }
    }
  }
  if (arr[0] && Array.isArray(arr) && arr[0].uniqueKey === undefined) {
    setKey(arr)
    return arr
  } else {
    return arr
  }
}

// 数组根据对象属性去重
export function arrayUnique (arr, name) {
  const hash = {}
  return arr.reduce(function (item, next) {
    if (!hash[next[name]]) {
      hash[next[name]] = 1
      item.push(next)
    }
    return item
  }, [])
}

// 社群列表数组过滤分组结构
export function simplifyGroups (data, key = 'memberItem') {
  let customList = JSON.parse(JSON.stringify(data))
  return customList.map(item => {
    if (item[key] && item[key][item[key].length - 1]) {
      item[key] = JSON.parse(JSON.stringify(item[key][item[key].length - 1][key]))
    }
    return item
  })
}

/* 生成自定义名称
* @params {Array} data 包含自定义名称的数组对象
* @params {String} key 自定义名称key值
* @params {String} txt 自定义名称文本
* @return 不重复的新的自定义名称
* */
export function makeCustomName (data, key = 'name', txt = '新建名称') {
  // 根据自定义分组名规则筛选已存在的文件，排序过滤后重新定义新的文件名
  if (!Array.isArray(data)) return
  let [customName, orderArr, nextIndex] = [[], '', '']
  let reg = new RegExp(`${txt}[1-9]\\d*`)
  data.map(item => {
    let num = Number((item[key] || '').replace(txt, ''))
    if (reg.test(item[key])) {
      customName.unshift(num)
    }
  })
  // 数组排序（正序）
  orderArr = customName.sort((a, b) => a - b)
  // 根据文件名最后编号大小，获取中间缺省值，如果有获取其值，没有则在最大编号值基础累加
  for (let i = 0, len = orderArr.length; i < len; i++) {
    if (orderArr[i] !== i + 1) {
      nextIndex = i + 1
      break
    }
  }
  nextIndex = nextIndex || orderArr.length + 1
  return `${txt}${nextIndex}`
}

export function byKeyDeviceType (keys) {
  let backObj = {}
  if (keys && keys.length === 16) {
    switch (keys.substring(12)) {
      case '6045':
        backObj = {
          type: 1,
          msg: '服务器'
        }
        break
      case '8045':
        backObj = {
          type: 2,
          msg: '客行分析一体机'
        }
        break
      case '7045':
        backObj = {
          type: 3,
          msg: '人脸抓拍一体机'
        }
        break
      case '8A45':
        backObj = {
          type: 4,
          msg: '客行分析摄像头'
        }
        break
      case '7A45':
        backObj = {
          type: 5,
          msg: '人脸抓拍摄像头'
        }
        break
      default:
        backObj = {
          error: '序列号不存在'
        }
    }
  } else {
    backObj = {
      error: '请输入16位序列号'
    }
  }
  return backObj
}
