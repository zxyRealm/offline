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
import { GetTrace, GetElevatorListByGroupGuid } from "@/api/behavior";
import { GetMarketList } from '@/api/community'
import { mapState } from 'vuex'
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
        path: "/static/html/trail_demo.html?playcount=0&status=0",
        id: "threeFrame"
      },
      iframe: null,
      trailData: [],
      communityInfo: [],
      elevatorList: []
    };
  },
  methods: {
    // 获取所有可用数据
    async init (data, parentId) {
      await this.getCommunityInfo(parentId)
      await this.getElevatorList(parentId)
      await this.getTrailMapInfo(data)
    },
    getTrailMapInfo(data) {
      if (data.end) {
        GetTrace(data).then(res => {
          this.trailData = res.data;
          this.$nextTick(() => {
            this.iframe = this.$refs.iframe.contentWindow
          });
        });
      }
    },
    getCommunityInfo(parentId) {
      if (!parentId) { return }
      GetMarketList({parentId: parentId}).then(res => {
        let floorInfo = this.sortFloorArr(res.data[0].subGroupSon)
        floorInfo = floorInfo.reverse()
        this.communityInfo = floorInfo
      })
    },
    getElevatorList(parentId) {
      GetElevatorListByGroupGuid({groupGuid: parentId}).then(res => {
        this.elevatorList = res.data
      })
    },
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case "trail-load_signal":
          this.iframe.getTrailData(this.trailData);
          this.iframe.getElevatorPosition(this.elevatorList)
          this.iframe.receiveCommunityInfo(this.communityInfo)
      }
    },
    // 数组排序
    sortFloorArr (arr) {
      if (arr.length <= 1) {
        return arr
      }
      let pivotIndex = Math.floor(arr.length / 2)
      let pivot = arr.splice(pivotIndex, 1)[0]
      let left = []
      let right = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < pivot.floor) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      }
      return this.sortFloorArr(left).concat([pivot], this.sortFloorArr(right))
    },
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);
    this.init(this.data, this.currentManage.id)
  },
  computed: {
    ...mapState(['currentManage'])
  },
  watch: {
    data: {
      handler(val) {
        if (val) this.getTrailMapInfo(val);
      },
      deep: true
    },
    currentManage: {
      handler (val) {
        if (val) {
          this.getCommunityInfo(val.id)
          this.getElevatorList(val.id)
        }
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

 