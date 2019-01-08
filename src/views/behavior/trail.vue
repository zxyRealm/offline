<template>
  <div class="behavior__trail--wrap g-prl20">
    <div class="trail__info--wrap dashed--border">
      <div class="fl clearfix">
        <div class="ti-item">
          <p>姓名：{{trailDetailInfo.name}}</p>
          <p>到访次数：{{trailDetailInfo.countNum}}</p>
        </div>
        <div class="ti-item">
          <p><span>性别：{{trailDetailInfo.gender ? '男' : '女'}}</span><span>年龄：{{trailDetailInfo.age || '--'}}</span></p>
          <p>最近一次：{{trailList[0] && trailList[0].captureFaceInfo[0] ? trailList[0].captureFaceInfo[0]['createTime'] : '' | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
        </div>
      </div>
      <div class="ti-item ti-right">
        <p>Person ID：{{trailDetailInfo.personId}}</p>
        <p v-if="trailDetailInfo.lableList">
            <span :key="val" v-for="val in trailDetailInfo.lableList">
              {{val}}
            </span>
        </p>
      </div>
    </div>
    <div class="trail__detail--wrap">
      <div class="td--left dashed--border">
        <div class="td__date--wrap">
          <i class="el-icon-arrow-left"></i>
          <span>{{spoorDate}}</span>
          <i class="el-icon-arrow-right"></i>
          <i class="el-icon-date fr"></i>
          <el-date-picker
            :clearable="false"
            popper-class="date__popper--wrap theme__popper--wrap"
            v-model="spoorDate"
            type="date"
            value="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-scrollbar>
          <div v-for="(item, $index) in currentTrailList" class="spoor-item" :key="$index">
            <div class="img-box">
              <image-box width="36px" height="54px" :src="item.imageUrl"></image-box>
              <!--<img width="36" :src="item.imageUrl" alt="">-->
            </div>
            <div class="item--info">
              <p class="name" :class="{start: !$index, end: currentTrailList.length - 1 === $index && $index}">
                <span class="ellipsis">{{item.portalName || item.groupName}}</span>
              </p>
              <p class="date">{{item.createTime | parseTime('{h}:{i}')}}</p>
              <img width="12" src="@/assets/behavior/signpost_icon@2x.png" alt="">
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="td--right dashed--border">
        <trail-map></trail-map>
      </div>
    </div>
  </div>
</template>

<script>
import {parseTime} from '../../utils'
import {GetPersonTrail} from '../../api/behavior'
import TrailMap from '../../components/three/trail_map'

export default {
  name: 'trail',
  components: {
    TrailMap
  },
  data () {
    return {
      spoorDate: '',
      label: [
        '美妆爱好者',
        '运动达人',
        '抓娃娃狂魔',
        '女装大佬',
        '魔音教主',
        '魔音教主2',
        '魔音教主3'
      ],
      trailDetailInfo: {},
      trailList: [],
      dateSet: ''
    }
  },
  created () {
    this.spoorDate = parseTime(new Date(), '{y}/{m}/{d}')
    this.getPersonTrail()
  },
  mounted () {
    // this.getPersonTrail()
  },
  computed: {
    currentTrailList: {
      get () {
        let arr = this.trailList.filter(item => {
          return (item.visitTime.replace(/-/g, '/') === this.spoorDate)
        })[0]
        return arr ? arr.captureFaceInfo : []
      },
      set () {
      }
    },
    pickerOptions: {
      get () {
        let _this = this
        return {
          disabledDate (time) {
            return !_this.dateSet.has(parseTime(time.getTime(), '{y}-{m}-{d}'))
          }
        }
      },
      set () {}
    }
  },
  methods: {
    getPersonTrail () {
      GetPersonTrail({personId: this.$route.params.personId}).then(res => {
        console.log(res.data)
        this.trailDetailInfo = res.data || {}
        this.trailList = this.trailDetailInfo.dailyCapturePersonList || []
        this.spoorDate = parseTime(this.trailList[0].visitTime, '{y}/{m}/{d}')
        this.dateSet = new Set(this.trailList.map(item => item.visitTime))
        // this.dateSet = new Set(['2019-01-11', '2018-11-11', '2018-10-11'])
        console.log(this.dateSet)
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .behavior__trail--wrap{
    height: calc(100% - 82px);
  }
  .dashed--border{
    border: 1px dashed rgba(151,151,151,0.10);
    background: rgba(1,8,20,0.10);
  }
  .trail__info--wrap{
    margin: 10px 0;
    padding: 18px 20px;
    height: 88px;
    box-sizing: border-box;
    .ti-item{
      float: left;
      p{
        line-height: 24px;
        &:first-child{
          margin-bottom: 12px;
          line-height: 1;
        }
      }
      &:first-child{
        width: 160px;
      }
      &:nth-child(2) {
        /*width: 250px;*/
        span{
          display: inline-block;
          width: 120px;
        }
      }
    }
    .ti-right{
      float: inherit;
      overflow: hidden;
      p:nth-child(2)
      {
        height: 24px;
        overflow: hidden;
        span{
          width: auto;
          line-height: 1;
          padding: 5px 12px;
          background: #165F88;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          box-sizing: border-box;
          &+ span{
            margin-left: 10px;
          }
      }
      }
    }
    /*background: rgba(1,8,20,0.10);*/
  }
  .trail__detail--wrap{
    height: calc(100% - 110px);
    .td__date--wrap{
      position: relative;
      margin: 16px 0;
      line-height: 24px;
      cursor: pointer;
      > span{
        display: inline-block;
        width: 80px;
      }
      .el-icon-date{
        color: #0F9EE9;
        margin-top: 4px;
        font-size: 16px;
      }
      .el-date-editor{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: 99;
        cursor: pointer;
        .el-input__inner{
          padding: 0;
        }
      }
    }
    .td--left{
      float: left;
      width: 200px;
      margin-right: 10px;
      padding: 0 12px;
      height: 100%;
      box-sizing: border-box;
      .el-scrollbar{
        height: calc(100% - 66px);
        .spoor-item{
          margin-bottom: 8px;
          height: 54px;
          .img-box{
            float: left;
            width: 36px;
            height: 54px;
            /*margin-right: 22px;*/
            img{
              width: 100%;
              height: 100%;
            }
          }
          .item--info{
            padding-left: 22px;
            overflow: hidden;
          }
          .date{
            font-size: 12px;
            color: rgba(255,255,255,0.50);
          }
          .name{
            &.end,
            &.start{
              position: relative;
              &:after{
                content: '';
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
            &.end{
              &:after{
                background: red;
              }
            }
          }
        }
      }
    }
    .td--right{
      height: 100%;
      overflow: hidden;
    }
  }
</style>
