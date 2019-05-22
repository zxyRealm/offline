<template>
  <div class="map-container">
    <button @click="getGateData()">添加出入口</button>
    <button @click="getColorData()">添加颜色快</button>
    <iframe
    :src="frame.path"
    :id="frame.id"
    scrolling="no"
    frameborder="0"
    ref="iframe"
    class="iframe"
    ></iframe>
  </div>
</template>
<script>
const houseData = [{
  floor: 1,
  url: './static/10.svg',
  name: 'F10'
},{
  floor: 2,
  url: './static/11.svg',
  name: 'F11'
},{
  floor: 3,
  url: './static/12.svg',
  name: 'F12'
},{
  floor: 4,
  url: './static/13.svg',
  name: 'F13',
  gateArr: [{
    logo: '/static/camera-inside.png'
  }]
}]
export default {
  name: 'MapContainer',
  components: {},
  data () {
    return {
      frame: {
        path: ossPrefix + "static/map-scene/index.html?mode=1&time=" + Number(new Date()),
        // path: "http://localhost:8080?mode=1&time=" + Number(new Date()),
        id: "communityFrame"
      },
      iframe: null
    }
  },
  created () {
    
  },
  mounted () {
    this.iframe = this.$refs.iframe.contentWindow;
    window.addEventListener("message", this.handleMessage);
  },
  methods: {
    handleMessage (event) {
      const data = event.data;
      switch (data.cmd) {
        case "associate-load_signal":
          this.getMapData()
          break;
      }
    },
    getMapData () {
      this.iframe.postMessage({
        cmd: "map_data",
        data: houseData
      }, '*')
    },
    getColorData () {
      let floor = parseInt(Math.random() * 4)
      let data = [
        { meshNo: 10, floor: floor, colorType: floor }
      ]
      this.iframe.postMessage({
        cmd: "color_data",
        data: data
      })
    },
    getGateData () {
      let gateType = parseInt(Math.random() * 3)
      let data = [
        { coord: {x: 20, y: 30}, floor: 1, name: '北门出入口', type:gateType }
      ]
      this.iframe.postMessage({
        cmd: "gate_data",
        data: data
      }, '*')
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.map-container{
  margin-top: 15px;
  height: 100%;
  .iframe{
    width: 100%;
    height: 100%;
  }
}
</style>

