<template>
  <div class="three__floor--wrap">
    <div class="floor__3d--wrap corner-bg">
      <input type="file" @change="changeSvg">
    </div>
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
    this.svgObj.innerHTML = ''
    this.svgObj.appendChild(this.newSvgChild)
    document.getElementById('svg').appendChild(this.svgObj)
    console.log(this.svgObj)
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
    traverseNodes (dom) {
      let nodeList = dom.childNodes
      let items
      for (let i = 0, len = nodeList.length; i < len; i++) {
        switch (nodeList[i].nodeName) {
          case 'defs':
            items = nodeList[i]
            break
          case 'g':
            this.styleList.push(nodeList[i].childNodes[0].style.fill)
            break
          case 'clipPath':
            let dom = document.createElement('g')
            let child = nodeList[i].childNodes[0]
            child.style.fill = this.styleList[i]
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
    }
  },
  watch: {}
}
</script>

<style lang="scss" type="text/scss" scoped>
  .three__floor--wrap {
    background: #0F0E11;
  }
  .floor__3d--wrap{
    position: relative;
    height: 470px;
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
