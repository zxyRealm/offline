<template>
  <div class="map-container">
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
export default {
  name: 'MapContainer',
  components: {},
  data () {
    return {
      frame: {
        // path: ossPrefix + 'static/map-scene/index.html',
        path: "http://localhost:8080?mode=1&time=" + Number(new Date()),
        id: "communityFrame"
      },
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

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

