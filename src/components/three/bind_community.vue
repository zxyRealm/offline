<template>
  <div style="height: 100%;width: 100%">
    <iframe scrolling="no" ref="bindGroupIframe" :src="iframeSrc" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'bind_community',
  props: {
    defaultSelect: {
      type: [Array, String],
      default: () => []
    },
    floorList: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    return {
      iframeObj: '',
      currentFloor: '',
      iframeSrc: ''
    }
  },
  created () {},
  mounted () {
    window.addEventListener('message', this.handleEvent)
    this.initFloor()
    this.iframeObj = this.$refs.bindGroupIframe.contentWindow
  },
  computed: {
  },
  methods: {
    // 初始化楼层信息 （设置当前楼层信息）
    initFloor (int) {
      this.currentFloor = this.floorList.filter(item => item.floor === (int || 1))[0] || this.this.floorList[0]
      this.iframeSrc = `/static/html/bind_community.html?map_url=${this.currentFloor.mapUrl}&time_stamp=${new Date().getTime()}`
    },
    // 处理iframe传递出来的事件
    handleEvent (event) {
      let data = event.data instanceof Object ? event.data : JSON.parse(event.data || '{}')
      if (data.type === 'BIND_GROUP_CLICK') {
        this.$emit('handle-block-click', data.data)
      } else if (data.type === 'SET_DEFAULT_DATA') {
        this.setDefaultSelect()
      }
    },
    // 设置默认选中区域
    setDefaultSelect () {
      // 位置信息数组
      let ps = this.defaultSelect instanceof Object ? this.defaultSelect : JSON.parse(this.defaultSelect)
      this.$nextTick(() => {
        this.iframeObj.setDefaultSelect(ps)
      })
    }
  },
  watch: {
    floorList: {
      handler (val) {
        this.initFloor()
      },
      deep: true
    },
    defaultSelect: {
      handler (val) {
        this.setDefaultSelect()
      },
      deep: true
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleEvent)
  }
}
</script>

<style scoped>

</style>
