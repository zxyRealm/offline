 /* 将一维数组截取固定长度转换成二维数组
* @params len 分隔长度
* */
function changeArrayLevel (array, len = 3) {
  let buffer = []
  let maxLeft = null
  for (let i = 0, len = array.length; i < len; i++) {
    let lot = ((i + 1) % 3)
    if (i && !lot) {
      let items = array.slice(i - 2, i)
      if (maxLeft < items[0]) {
        maxLeft = items[0]
      }
      buffer.push({x: items[0], y: items[1]})
    }
  }
  return {'buffer': buffer, 'maxLeft': maxLeft}
}

function Point (x, y) {
  this.x = x
  this.y = y
}
// Contour object
// 根据多边形坐标点计算其几何中心点坐标
function Contour (points) {
  this.pts = points || [] // an array of Point objects defining the contour
}

Contour.prototype.area = function () {
  var area = 0
  var pts = this.pts
  var nPts = pts.length
  var j = nPts - 1
  var p1
  var p2

  for (var i = 0; i < nPts; j = i++) {
    p1 = pts[i]
    p2 = pts[j]
    area += p1.x * p2.y
    area -= p1.y * p2.x
  }
  area /= 2

  return area
}

Contour.prototype.centroid = function () {
  var pts = this.pts
  var nPts = pts.length
  var x = 0
  var y = 0
  var f
  var j = nPts - 1
  var p1
  var p2

  for (var i = 0; i < nPts; j = i++) {
    p1 = pts[i]
    p2 = pts[j]
    f = p1.x * p2.y - p2.x * p1.y
    x += (p1.x + p2.x) * f
    y += (p1.y + p2.y) * f
  }

  f = this.area() * 6

  return new Point(x / f, y / f)
}
