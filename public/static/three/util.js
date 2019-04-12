/* 将一维数组截取固定长度转换成二维数组
* @params len 分隔长度
* */
function changeArrayLevel (array) {
  var buffer = [];
  var maxLeft = null;
  for (var i = 0; i < array.length; i++) {
    var lot = ((i + 1) % 3);
    if (i && !lot) {
      var items = array.slice(i - 2, i);
      if (maxLeft < items[0]) {
        maxLeft = items[0];
      }
      buffer.push({x: items[0], y: items[1]})
    }
  }
  return {'buffer': buffer, 'maxLeft': maxLeft}
}

function Point (x, y) {
  this.x = x;
  this.y = y;
}
// Contour object
// 根据多边形坐标点计算其几何中心点坐标
function Contour (points) {
  this.pts = points || []; // an array of Point objects defining the contour
}

Contour.prototype.area = function () {
  var area = 0;
  var pts = this.pts;
  var nPts = pts.length;
  var j = nPts - 1;
  var p1;
  var p2;

  for (var i = 0; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }
  area /= 2;

  return area
}
// 获取多变行边界坐标点（最上、最下、最左、最右）
Contour.prototype.boundary = function () {
  var pts = this.pts;
  var nPts = pts.length;
  var t = {};
  var b = {};
  var l = {};
  var r = {};

  for (var i = 0; i < nPts; i++) {
    if (i === 0) {
      t.val = pts[i].y;
      t.index = 0;
      b.val = pts[i].y;
      b.index = 0;
      l.val = pts[i].x;
      l.index = 0;
      r.val = pts[i].x;
      r.index = 0;
    } else {
      if (pts[i].y > t.val) {
        t.val = pts[i].y;
        t.index = i;
      }
      if (pts[i].y < b.val) {
        b.val = pts[i].y;
        b.index = i;
      }
      if (pts[i].x > r.val) {
        r.val = pts[i].x;
        r.index = i;
      }
      if (pts[i].x < l.val) {
        l.val = pts[i].x;
        l.index = i;
      }
    }
  }
  return {
    top: [pts[t.index].x, pts[t.index].y],
    right: [pts[r.index].x, pts[r.index].y],
    bottom: [pts[b.index].x, pts[b.index].y],
    left: [pts[l.index].x, pts[l.index].y]
  }
}

Contour.prototype.centroid = function () {
  var pts = this.pts;
  var nPts = pts.length;
  var x = 0;
  var y = 0;
  var f;
  var j = nPts - 1;
  var p1;
  var p2;

  for (var i = 0; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f = p1.x * p2.y - p2.x * p1.y;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
  }

  f = this.area() * 6;

  return new Point(x / f, y / f)
}
