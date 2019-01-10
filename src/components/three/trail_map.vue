<template>
  <div class="trail-map" id="trail-map">
    <div id="iframeWrap">
      <iframe
        v-if="trailData.length"
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
import { GetTrace } from "@/api/behavior";
export default {
  name: "TrailMap",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      frame: {
        path: "/static/html/trail_demo.html?timestamp = " + Number(new Date()),
        id: "threeFrame"
      },
      iframe: null,
      trailData: []
    };
  },
  methods: {
    getTrailMapInfo(data) {
      if (data.end) {
        GetTrace(data).then(res => {
          this.trailData = res.data;
          this.$nextTick(() => {
            this.iframe = this.$refs.iframe.contentWindow;
          });
        });
      }
    },
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case "trail-load_signal":
          this.iframe.getTrailData(this.trailData);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);
    this.getTrailMapInfo(this.data);
  },
  watch: {
    data: {
      handler(val) {
        this.getTrailMapInfo(val);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.trail-map {
  height: 100%;
  background: rgba(1, 8, 20, 0.1);
  #iframeWrap {
    height: 100%;
    .iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

 