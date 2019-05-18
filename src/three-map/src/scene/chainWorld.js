const echarts = require('echarts')
import $ from 'jquery'

var map = echarts.init(document.getElementById('map'))

var reset = function () {
  map = echarts.init(document.getElementById('map'))
  map.setOption({
    title: {
      text: 'USA Population Estimates (2012)',
      subtext: 'Data from www.census.gov',
      sublink: 'http://www.census.gov/popest/data/datasets.html',
      left: 'right'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        return params.seriesName + '<br/>' + params.name + ': ' + value;
      }
    },
    visualMap: {
      left: 'right',
      type: 'piecewise',
      min: 500000,
      max: 38000000,
      inRange: {
        color: ['#B8D8FF', '#64C0FF', '#3176FF', '#3333FF', '#1400D3 ']
      },
      text: ['', ''], // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        dataView: {
          readOnly: false
        },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      name: '总客流量',
      type: 'map',
      map: 'mapCity',
      label: {
        emphasis: {
          show: true,
          color: '#fff',
        }
      },
      roam: true, //允许拖动
      itemStyle: {
        normal: {
          areaColor: '#1C1E38',
          borderColor: '#556ED5',
          borderWidth: 1,
          shadowColor: 'rgba(0, 189, 249, 0.5)',
          shadowBlur: 2,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
        },
        emphasis: {
          borderColor: '#E4DA52',
          areaColor: '#1C1E38'
        }
      },
      // 文本位置修正
      textFixed: {
        Alaska: [80, 150]
      },
      data: [
        {name: '广东省', value: 24822023},
        {name: '浙江省', value: 32822023},
        {name: '山东省', value: 4822023},
        // {name: '辽宁省', value: 0},
        // {name: '四川省', value: 0},
        // {name: '黑龙江省', value: 0},
        // {name: '吉林省', value: 0},
        // {name: '内蒙古自治区', value: 0},
        // {name: '西藏自治区', value: 0},
        // {name: '新疆维吾尔自治区', value: 0},
      ]
    }]
  })
}



var level = 1
var country = function () {
  level = 1
  $.ajax({
    url: './static/china.json',
    type: 'get',
    success: function (res) {
      echarts.registerMap("mapCity", res);
      map.dispose()
      reset()

      map.on('click', (params) => {
        const provinceCode = res.features.filter((val) => {
          if (val.properties.name.indexOf(params.name) !== -1) {
            return true
          }
        });
        province(provinceCode[0].properties.id, params.name)

      });
    }
  })
}

var province = function (id, name) {
  level = 2
  $.ajax({
    url: './static/geometryProvince/' + id + '.json',
    type: 'get',
    success: function (res) {
      echarts.registerMap("mapCity", res);
      map.dispose()
      reset()
      map.on('click', (params) => {
        const provinceCode = res.features.filter((val) => {
          if (val.properties.name.indexOf(params.name) !== -1) {
            return true
          }
        });

        city(provinceCode[0].properties.id, params.name)
      });
    }
  })
}
var city = function (id, name) {
  level = 3
  $.ajax({
    url: './static/geometryCouties/' + id + '00.json',
    type: 'get',
    success: function (res) {
      echarts.registerMap("mapCity", res);
      map.dispose()
      reset()
      map.on('click', (params) => {
        alert(params.name)
      });
    }
  })
}
country()