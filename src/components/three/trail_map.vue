<template>
   <div class="trail-map" id="trail-map">
     <div id="iframeWrap">
        <iframe
          :src="frame.path"
          :id="frame.id"
          scrolling="no"
          frameborder="0"
          ref="iframe"
          class="iframe"
        ></iframe>
      </div>
   </div>
</template>
<script>
export default {
  name: "TrailMap",
  data(){
    return{
      frame: {
        path: "/static/html/trail_demo.html?timestamp = " + Number(new Date()),
        id: "threeFrame"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.trail-map{
  height: 100%;
  #iframeWrap{
    height: 100%;
    .iframe{
      width: 100%;
      height: 100%
    }
  }
}
</style>

 