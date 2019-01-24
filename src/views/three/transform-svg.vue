<template>
  <div class="three__floor--wrap">
    <!--<el-button @click="downloadSvg('http://localhost/copy.svg')">下载</el-button>-->
    <div id="svg" style="width: 580px;"></div>
  </div>
</template>

<script>
import Svg from './svg'
export default {
  name: 'index',
  data () {
    return {
      svgObj: '',
      newSvgChild: '',
      styleList: []
    }
  },
  created () {},
  mounted () {
    this.svgObj = this.parseDom(Svg)[0]
    this.newSvgChild = document.createElement('g')
    this.traverseNodes(this.svgObj)
    this.showSvgToHtml(this.newSvgChild)
    // this.downloadSvg(this.svgObj)
  },
  computed: {},
  methods: {
    changeSvg (e) {
      e = window.event || e
      console.log(e.target.files)
    },
    parseDom (arg) {
      var objE = document.createElement('div')
      objE.innerHTML = arg
      return objE.childNodes
    },
    /* 遍历svg dom对象节点，重新设置svg内容排版，格式化成three.js可使用的svg模板
    * 注意事项：使用的svg必须有AI以内联css样式导出的文件，否侧无法获取区域块的颜色值(其他制图软件转换的svg文件未做过验证)
    * @params dom svg dom对象
    * three.js 不识别defs、clipPath标签里的内容，并且无法读取非内联的css样式
    * 保存g标签内子元素上style的fill值，再取clipPath下子元素并修改其style的fill值
    * @author 张晓元 2018.11.29
    * */
    traverseNodes (dom) {
      let nodeList = dom.childNodes
      let items
      for (let i = 0, len = nodeList.length; i < len; i++) {
        switch (nodeList[i].nodeName) {
          case 'defs':
            items = nodeList[i]
            break
          case 'g':
            // this.styleList.push(nodeList[i].childNodes[0].style.fill)
            break
          case 'clipPath':
            let dom = document.createElement('g')
            let child = nodeList[i].childNodes[0]
            // child.style.fill = this.styleList[i]
            child.style.fill = '#f0f'
            dom.appendChild(child)
            this.newSvgChild.appendChild(dom)
            break
        }
      }
      if (items && items.childNodes.length) {
        this.traverseNodes(items)
      }
    },
    parseStyle (node, style) {
      style = Object.assign({}, style) // clone style
      if (node.hasAttribute('fill')) style.fill = node.getAttribute('fill')
      if (node.style.fill !== '') style.fill = node.style.fill
      return style
    },
    getStyle (el, styleName) {
      if (el.currentStyle) {
        // for IE
        return el.currentStyle[styleName]
      } else {
        // for peace
        return getComputedStyle(el, false)[styleName]
      }
    },
    downloadSvg (href) {
      let aLink = document.createElement('a')
      let link = document.getElementById('file-download__link')
      if (link) {
        link.parentNode.removeChild(link)
      }
      aLink.id = 'file-download__link'
      aLink.download = true
      aLink.target = '_blank'
      aLink.href = href
      document.body.appendChild(aLink)
      aLink.click()
    },
    // 将转换后的svg文件显示在页面
    showSvgToHtml (obj) {
      this.svgObj.innerHTML = ''
      this.svgObj.appendChild(obj)
      let frag = document.createElement('div')
      frag.appendChild(this.svgObj)
      // svg元素使用dom对象appendChild方式添加到页面是回无法显示，因此使用innerHTML转换成字符串的方式添加
      // 大概原因是svg 是xml格式，以dom节点方式异步添加到页面时无法渲染
      document.getElementById('svg').innerHTML = frag.innerHTML
    }
  },
  watch: {}
}
</script>

<style lang="scss" type="text/scss" scoped>
  .three__floor--wrap {
    background: #0F0E11;
    height: 100vh;
  }
  .floor__3d--wrap{
    position: relative;
    /*height: 470px;*/
    /*background: #0F0E11;*/
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0F0E11;
    }
  }
</style>
