<template>
  <div class="trail-map" id="trail-map">
    <div id="iframeWrap">
      <!--v-if="trailData.length"-->
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
import { GetTrace, GetElevatorListByGroupGuid } from '@/api/behavior'
import { GetMarketList } from '@/api/community'
import { mapState } from 'vuex'
import { eventObject } from '../../utils/event'
const ossPrefix = process.env.OSS_PREFIX
export default {
  name: 'TrailMap',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      frame: {
        path: ossPrefix + '/static/html/trail_demo.html?playcount=0&status=0',
        id: 'threeFrame'
      },
      iframe: null,
      trailData: [],
      communityInfo: [],
      elevatorList: [],
      playCount: '',
      isDateChange: false,
      iframeLoaded: false
    }
  },
  methods: {
    // 获取所有可用数据
    async init (data, parentId) {
      await this.getCommunityInfo(parentId)
      await this.getElevatorList(parentId)
      await this.getTrailMapInfo(data)
    },
    getTrailMapInfo (data) {
      if (data.end) {
        GetTrace(data).then(res => {
          this.trailData = res.data
          if (this.trailData.length) {
            this.$nextTick(() => {
              this.iframe = this.$refs.iframe.contentWindow
              if (this.isDateChange === true && this.iframeLoaded) {
                this.iframe.postMessage({
                  type: 'CHANGE_DATE'
                }, this.originSrc)
                this.isDateChange = false
              }
            })
          }
        })
      }
    },
    changeDate () {
      this.isDateChange = true
    },
    getCommunityInfo (parentId) {
      if (!parentId) { return }
      if (this.currentManage.type !== 3) {
        GetMarketList({parentId: parentId}).then(res => {
          let floorInfo = this.sortFloorArr(res.data[0].subGroupSon)
          floorInfo = floorInfo.reverse()
          this.communityInfo = floorInfo
        })
      } else {
        this.frame = {
          path: ossPrefix + '/static/html/single_store_trail.html',
          id: 'threeFrame'
        }
      }
    },
    getElevatorList (parentId) {
      if (!parentId) { return }
      if (this.currentManage.type !== 3) {
        GetElevatorListByGroupGuid({groupGuid: parentId}).then(res => {
          this.elevatorList = res.data
        })
      }
    },
    handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case 'trail-load_signal':
          eventObject().$emit('IFRAME_FRESH_COUNT', data.params.play_count)
          this.playCount = data.params.play_count
          this.changeDate()
          this.iframeLoaded = true
          this.iframe.postMessage({
            type: 'GET_TRAIL_DATA',
            trailData: this.trailData
          }, this.originSrc)
          this.iframe.postMessage({
            type: 'GET_ELEVATOR_POSITION',
            elevatorList: this.elevatorList
          }, this.originSrc)
          this.iframe.postMessage({
            type: 'RECEIVE_COMMUNITY_INFO',
            communityInfo: this.communityInfo
          }, this.originSrc)
          break
        case 'single-trail-load_signal':
          this.iframe.postMessage({
            type: 'GET_TRAIL_DATA2',
            trailData: this.trailData
          }, this.originSrc)
          break
      }
    },
    sortFloorArr (arr) {
      if (arr.length <= 1) { return arr }
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
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleMessage)
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
    this.init(this.data, this.currentManage.id)
  },
  computed: {
    ...mapState(['currentManage']),
    originSrc () {
      return ossPrefix || '*'
    }
  },
  watch: {
    data: {
      handler (val) {
        if (val) this.getTrailMapInfo(val)
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
}
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
