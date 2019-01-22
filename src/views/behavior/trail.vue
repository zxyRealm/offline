<template>
  <div class="behavior__trail--wrap g-prl20">
    <div class="trail__info--wrap dashed--border">
      <div class="fl clearfix">
        <div class="ti-item">
          <p>姓名：{{trailDetailInfo.name}}</p>
          <p>到访次数：{{trailDetailInfo.countNum}}</p>
        </div>
        <div class="ti-item">
          <p>
            <span>性别：{{trailDetailInfo.gender ? '男' : '女'}}</span>
            <span>年龄：{{trailDetailInfo.age || '--'}}</span>
          </p>
          <p>最近一次：{{trailList[0] && trailList[0].captureFaceInfo[0] ? trailList[0].captureFaceInfo[0]['createTime'] : ''
            | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
        </div>
      </div>
      <div class="ti-item ti-right">
        <p>Person ID：{{trailDetailInfo.personId}}</p>
        <p v-if="trailDetailInfo.lableList">
          <span :key="$index" v-if="val" v-for="(val, $index) in trailDetailInfo.lableList">{{val}}</span>
        </p>
      </div>
    </div>
    <div class="trail__detail--wrap">
      <div class="td--left dashed--border">
        <div class="td__date--wrap">
          <!--<i class="el-icon-arrow-left"></i>-->
          <span>{{spoorDate}}</span>
          <!--<i class="el-icon-arrow-right"></i>-->
          <i class="el-icon-date fr"></i>
          <el-date-picker
            :clearable="false"
            popper-class="date__popper--wrap theme__popper--wrap"
            v-model="spoorDate"
            type="date"
            value="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            :picker-options="pickerOptions"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <el-scrollbar>
          <div v-for="(item, $index) in currentTrailList" class="spoor-item" :key="$index">
            <div class="img-box">
              <!--<img width="36" @click="showImage(item)" :src="item.cropImg" alt="">-->
              <image-box width="36px" @click.native="showImage(item)" height="54px" :src="item.cropImg || item.imageUrl"></image-box>
              <!--<img width="36" :src="item.imageUrl" alt="">-->
            </div>
            <div class="item--info">
              <p
                class="name"
                :class="{start: !$index, end: currentTrailList.length - 1 === $index && $index}"
              >
                <span class="ellipsis">{{item.portalName || item.groupName}}</span>
              </p>
              <p class="date">{{item.createTime | parseTime('{h}:{i}')}}</p>
              <img width="12" v-show="currentTrailList.length - 1 !== $index"
                   src="@/assets/behavior/signpost_icon@2x.png" alt>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="td--right dashed--border">
        <trail-map ref="trailMap" :data="trailMapInfo"></trail-map>
      </div>
    </div>
    <image-preview :src="preview.src" :visible.sync="preview.visible"></image-preview>
  </div>
</template>

<script>
import {parseTime} from '../../utils'
import {GetPersonTrail} from '../../api/behavior'
import TrailMap from '../../components/three/trail_map'
import {eventObject} from '../../utils/event'
import {mapState} from 'vuex'
export default {
  name: 'trail',
  components: {
    TrailMap
  },
  data () {
    return {
      preview: {
        visible: false,
        src: ''
      },
      spoorDate: '',
      trailDetailInfo: {},
      trailList: [],
      trailMapInfo: {},
      dateSet: '',
      currentTrailList: []
    }
  },
  created () {
    this.spoorDate = parseTime(new Date(), '{y}/{m}/{d}')
    this.getPersonTrail()
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentManage']),
    pickerOptions: {
      get () {
        let _this = this
        return {
          disabledDate (time) {
            return !_this.dateSet.has(parseTime(time.getTime(), '{y}-{m}-{d}'))
          }
        }
      },
      set () {
      }
    }
  },
  methods: {
    // 查看抓拍大图
    showImage (row) {
      this.preview.src = row.imageUrl
      this.preview.visible = true
    },
    getPersonTrail () {
      GetPersonTrail({personId: this.$route.params.personId}).then(res => {
        this.trailDetailInfo = res.data || {}
        this.trailList = this.trailDetailInfo.dailyCapturePersonList || []
        this.spoorDate = parseTime(this.trailList[0].visitTime, '{y}/{m}/{d}')
        this.dateSet = new Set(this.trailList.map(item => item.visitTime))
        this.backTrailList()
        // this.dateSet = new Set(['2019-01-11', '2018-11-11', '2018-10-11'])
      })
    },
    backAsyncData (arr) {
      let list = []
      let iterator = arr[Symbol.iterator]()
      return newArr(iterator.next())
      function newArr (item) {
        if (item.done) {
          return Promise.resolve(list)
        }
        return new Promise((resolve) => {
          let img = new Image()
          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          let data = item.value
          img.crossOrigin = '*'
          img.src = data.imageUrl
          img.onload = () => {
            // 在给定的坐标的基础上扩大一倍范围
            let rectW = data.rect.lowerX - data.rect.upperX
            let rectH = data.rect.lowerY - data.rect.upperY
            let baseY = rectH > rectW ? 30 : 50
            let upperX = data.rect.upperX - 0 > 60 ? data.rect.upperX - 60 : 0
            let upperY = data.rect.upperY - 0 > baseY + 30 ? data.rect.upperY - baseY - 30 : 0
            let lowerX = img.width - data.rect.lowerX > 60 ? data.rect.lowerX + 60 : img.width
            let lowerY = img.height - data.rect.lowerY > baseY ? data.rect.lowerY + baseY : img.height
            canvas.width = lowerX - upperX
            canvas.height = lowerY - upperY
            context.drawImage(img, upperX, upperY, lowerX - upperX, lowerY - upperY, 0, 0, lowerX - upperX, lowerY - upperY)
            data.cropImg = canvas.toDataURL('image/png')
            resolve(data)
          }
        }).then(value => {
          return list.push(value)
        }).then(() => {
          return newArr(iterator.next())
        }).catch(Promise.reject)
      }
    },
    backTrailList () {
      if (!this.spoorDate) return
      let arr = this.trailList.filter(item => {
        return (item.visitTime.replace(/-/g, '/') === this.spoorDate)
      })[0]
      let iterator = arr ? arr.captureFaceInfo.reverse() : []
      this.currentTrailList = iterator
      // if (iterator[0] && iterator[0].rect) {
      //   this.backAsyncData(iterator).then(list => {
      //     this.currentTrailList = list
      //   })
      // } else {
      //   this.currentTrailList = iterator
      // }
    }
  },
  watch: {
    currentManage: {
      handler (val) {
        this.$router.push('/behavior/analyse')
      },
      deep: true
    },
    currentTrailList: {
      handler (val) {
        if (val[0]) {
          this.trailMapInfo = {
            groupGuid: val[0].groupGuid,
            personGuid: this.trailDetailInfo.personId,
            start: val[0].createTime.split(' ')[0] + ' 00:00:00',
            end: val[0].createTime.split(' ')[0] + ' 23:59:59',
            reduceFactor: 4
          }
          this.$nextTick(() => {
            if (this.$refs.trailMap) {
              this.$refs.trailMap.changeDate()
            }
          })
        }
      },
      deep: true
    },
    spoorDate: {
      handler (val) {
        this.backTrailList()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .behavior__trail--wrap {
    height: calc(100% - 82px);
  }

  .dashed--border {
    border: 1px dashed rgba(151, 151, 151, 0.1);
    background: rgba(1, 8, 20, 0.1);
  }

  .trail__info--wrap {
    margin: 10px 0;
    padding: 18px 20px;
    height: 88px;
    box-sizing: border-box;
    .ti-item {
      float: left;
      p {
        line-height: 24px;
        &:first-child {
          margin-bottom: 12px;
          line-height: 1;
        }
      }
      &:first-child {
        width: 160px;
      }
      &:nth-child(2) {
        /*width: 250px;*/
        span {
          display: inline-block;
          width: 120px;
        }
      }
    }
    .ti-right {
      float: inherit;
      overflow: hidden;
      p:nth-child(2) {
        height: 24px;
        overflow: hidden;
        span {
          width: auto;
          line-height: 1;
          padding: 5px 12px;
          background: #165f88;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          box-sizing: border-box;
          & + span {
            margin-left: 10px;
          }
        }
      }
    }
    /*background: rgba(1,8,20,0.10);*/
  }

  .trail__detail--wrap {
    height: calc(100% - 110px);
    .td__date--wrap {
      position: relative;
      margin: 16px 0;
      line-height: 24px;
      cursor: pointer;
      /*border-bottom: 1px solid #ddd;*/
      > span {
        display: inline-block;
        width: 80px;
        padding: 0 6px;
      }
      .el-icon-date {
        color: #0f9ee9;
        margin-top: 4px;
        font-size: 16px;
      }
      .el-date-editor {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: 99;
        cursor: pointer;
        .el-input__inner {
          padding: 0;
        }
      }
    }
    .td--left {
      float: left;
      width: 200px;
      margin-right: 10px;
      padding: 0 12px;
      height: 100%;
      box-sizing: border-box;
      .el-scrollbar {
        height: calc(100% - 66px);
        .spoor-item {
          margin-bottom: 8px;
          height: 54px;
          .img-box {
            float: left;
            width: 36px;
            height: 54px;
            /*margin-right: 22px;*/
            /*img {*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*}*/
          }
          .item--info {
            padding-left: 22px;
            overflow: hidden;
          }
          .date {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
          }
          .name {
            &.end,
            &.start {
              position: relative;
              &:after {
                content: "";
                position: absolute;
                display: block;
                width: 6px;
                height: 6px;
                top: 7px;
                left: -10px;
                border-radius: 6px;
                background: green;
              }
            }
            &.end {
              &:after {
                background: red;
              }
            }
          }
        }
      }
    }
    .td--right {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
