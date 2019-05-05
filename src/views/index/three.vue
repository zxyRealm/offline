<template>
  <div class="three__floor--wrap">
    <!--楼宇3D/平面分布图展示 start-->
    <!--没有管理层信息是空数据状态 使用class="empty--data"-->
    <template v-if="currentManage.id">
      <!--<el-button @click="changeType">切换</el-button>-->
      <div class="floor__data--wrap" v-if="!emptyMap">
        <el-scrollbar>
          <h2 class="title">{{currentManage.name || '屈臣氏'}}</h2>
          <!--进客流柱状图-->
          <!--门店状态（商场、连锁）或者单店状态下显示-->
          <div class="in-flow items" v-if="isStore">
            <chart-bar
              title="去重客流量"
              :data="flowData"
              type="inflow"
              width="100%"
              height="100%"></chart-bar>
          </div>
          <!--门店客流排行榜-->
          <!--商场管理、商场楼层、连锁全国、省、市、区 状态下显示-->
          <div class="store-flow-rank items" v-else>
            <store-rank label="industryName" :data="rankData.group"></store-rank>
          </div>
          <div class="float-block clearfix" :class="{single: currentManage.type === 3}">
            <!--会员比例-->
            <div class="member-ratio items">
              <Chart
                title="会员比例" :data="ratioData.member" type="member" width="100%"
                height="100%"></Chart>
            </div>
            <!--男女比例-->
            <div
              class="sex-ratio items"
              :class="{'empty--data': !ratioData.gender.man || !ratioData.gender.man.total}">
              <Chart
                title="性别比例"
                :data="ratioData.gender"
                type="gender" width="100%"
                height="100%"></Chart>
            </div>
          </div>
          <!--回头客比例-->
          <div
            class="return-ratio items"
            :class="{'empty--data': !ratioData.appearance.many || !ratioData.appearance.many.total, single: currentManage.type === 3}">
            <return-flow :data="ratioData.appearance.many"></return-flow>

          </div>

          <div class="content--wrap" :class="{'double-item': showIndustry}">
            <!--业态客流排行榜-->
            <div class="format-flow-rank items" v-if="showIndustry">
              <industry-rank :data="rankData.industry"></industry-rank>
            </div>

            <!--年龄比例-->
            <div class="age-ratio items" :class="{single: currentManage.type === 3, vertical: showIndustry}">
              <Chart
                :data="ratioData.age"
                :mode="!showIndustry ? 'vertical': 'horizontal'"
                title="年龄比例" type="age"
                width="100%" height="100%"></Chart>
            </div>
          </div>

        </el-scrollbar>
      </div>
      <div class="floor__3d--wrap black">
        <general-map @updateCommunity="setFloorInfo" v-if="!emptyMap"></general-map>
        <!--单店无地图时-->
        <div class="store__map--empty" v-if="emptyMap">
          <div class="bar-box">

          </div>
          <div class="main-content">
            <div class="item--top">
              <div class="double items">
                <div class="time-echart--wrap">
                  <time-echarts type="flow"></time-echarts>
                </div>
              </div>
              <div class="double items">
                <div class="time-echart--wrap">
                  <time-echarts type="member"></time-echarts>
                </div>

              </div>
            </div>
            <div class="item--middle">
              <div class="double-ratio">
                <div class="ratio-item items">
                  <Chart
                    title="会员比例"
                    :data="ratioData.member"
                    type="member" width="100%"
                    height="100%"></Chart>
                </div>
                <div class="ratio-item items">
                  <Chart
                    title="性别比例"
                    :data="ratioData.gender"
                    type="gender" width="100%"
                    height="100%"></Chart>
                </div>
              </div>
              <div class="flow-wrap">
                <div class="items">
                  <chart-bar
                    title="去重客流量"
                    :data="flowData"
                    type="inflow"
                    width="100%"
                    height="100%"></chart-bar>
                </div>
              </div>
            </div>
            <div class="item--bottom">
              <div class="double items">
                <Chart
                  :data="ratioData.age"
                  :mode="!showIndustry ? 'vertical': 'horizontal'"
                  title="年龄比例" type="age"
                  width="100%" height="100%"></Chart>
              </div>
              <div class="double items">
                <return-flow size="large" :data="ratioData.appearance.many"></return-flow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <ob-list-empty v-else :text="'您尚未创建社群'">
      <a href="javascript:void (0)" @click="createCommunity">点此【添加社群】</a>
    </ob-list-empty>
  </div>
</template>

<script>
import Chart from '@/components/echarts/three-pie'
import ChartBar from '@/components/echarts/three-bar'
import GeneralMap from '@/components/three/GeneralMap'
import StoreRank from './components/store'
import IndustryRank from './components/industry'
import ReturnFlow from './components/return'
import TimeEcharts from '@/components/echarts/time'
import { eventObject } from '../../utils/event'
import { GetChartLine } from '@/api/visual'
import { getFlowAnalysisTime, getFlowRankTime, getRatioTime } from '@/api'
import { mapState } from 'vuex'
import Moment from 'moment'

export default {
  name: 'index',
  data () {
    return {
      ratioData: { // 比例（会员、男女、回头客、年龄）
        age: [],
        member: [],
        appearance: [],
        gender: []
      },
      rankData: { // 排行榜 （业态、门店）
        group: [],
        industry: []
      },
      flowData: [],
      currentFloor: {}, // 当前查看的楼层信息
      num: 0, // 左侧数据轮询时接口连续出错的次数 （连续3次都异常，则停止数据轮询）
      timer: null // 数据获取定时器
    }
  },
  components: {
    Chart,
    ChartBar,
    GeneralMap,
    StoreRank,
    IndustryRank,
    ReturnFlow,
    TimeEcharts
  },
  created () {
  },
  mounted () {
    // 地图首页默认收起侧边栏
    this.$store.dispatch('DISPATCH_SIDEBAR', false)
    this.initBaseData()
  },
  computed: {
    ...mapState(['currentManage']),
    // 是否显示业态排行
    // 仅商场下总楼层状态和楼层地图时展示业态排行
    showIndustry () {
      return this.currentManage.type === 1 && this.currentFloor && this.currentFloor.type !== 4
    },
    // 是否是单店/商场门店/连锁门店
    isStore () {
      return this.currentManage.type === 3 || new Set([3, 4]).has(this.currentFloor.type)
    },
    emptyMap () {
      return this.currentManage.type === 3
    }
  },
  methods: {
    changeType () {
      this.$set(this.currentFloor, 'type', 3)
      this.$store.state.currentManage = { type: 1 }
    },
    setFloorInfo (data) {
      this.currentFloor = data || {}
      this.initBaseData()
      this.getFlowData()
    },
    /*
    * @params data {Object, Array} 需要处理的数组或者对象，对象中的属性值为数组时对即对数组进行处理
    * @params type {String} percent返回数字还是百分比字符串
    * @return {Array} 返回包含percent 和 total 值的新数组
    * */
    CommunicationPer (data, type) {
      // 计算数组中和值与百分比值
      let count = (list) => {
        let total = 0
        list.map(item => {
          total += item.count
        })
        return list.map(item => {
          let num = total ? Number(((item.count / total) * 100).toFixed(1)) : 0
          item.total = total
          item.percent = type === 'number' ? num : num + '%'
          return item
        })
      }
      if (Array.isArray(data)) {
        count(data)
      } else {
        for (let k in data) {
          if (data.hasOwnProperty(k) && Array.isArray(data[k])) {
            count(data[k])
          }
        }
      }
      return data || []
    },
    // 初始化获取数据
    initBaseData () {
      clearTimeout(this.timer)
      // if (info.type === 4 || info.industryType) return
      if (this.num < 4) {
        this.timer = setTimeout(() => {
          this.initBaseData()
        }, 60 * 1000)
      }
      // 获取客流排行(查看总商场时展示门店、业态客流排行；查看单层楼时展示门店客流排行)
      // if (!info) return
      this.getRankData(2)
      this.getRankData(1)
      // 获取实时比率
      this.getRatioData('member')
    },
    //
    /*
    * 获取排行数据
    * @params type {int} 1：门店 2：业态
    */
    getRankData (type) {
      // if (this.currentManage.type === 1 && type === 2) return //
      let keyMap = { 1: 'group', 2: 'industry' }
      getFlowRankTime({
        groupFloor: this.currentFloor.floor,
        groupGuid: this.currentManage.id,
        topType: type
      }).then((res) => {
        this.num = 0
        this.$set(this.rankData, keyMap[type], this.CommunicationPer(res.data[keyMap[type]], type === 1 ? 'number' : ''))
        console.log(this.rankData)
      }).catch(err => {
        if (err.code === 'ERR-110') {
          this.num = 4
        } else {
          this.num++
        }
        console.error(err.msg || '网络异常，请稍后重新尝试')
      })
    },
    // 获取去重客流数据
    getFlowData () {
      if (this.currentFloor.industryType || this.currentFloor.type === 4) {
        let date = Moment().format('YYYY-MM-DD')
        getFlowAnalysisTime({
          groupGuid: this.currentManage.id,
          groupName: this.currentFloor.name,
          groupSonGuid: this.currentFloor.groupSonGuid || this.currentFloor.guid,
          timeIntervalUnit: 'hour',
          startTime: date + ' 00:00:00',
          endTime: date + ' 23:59:59',
          type: 'flow'
        }).then(res2 => {
          this.flowData = res2.data.seriesGroup.filter(item => item.name === '客流入')[0]
        })
      }
    },
    /*
    * @params {type} appearance(回头客)、member(会员)、age(年龄)、gender(性别)
    */
    getRatioData (type) {
      getRatioTime({
        groupFloor: this.currentFloor.floor,
        groupGuid: this.currentManage.id,
        type: type
      }).then((res) => {
        this.num = 0
        let resData = res.data
        resData = this.CommunicationPer(resData)
        this.$set(this.ratioData, type, resData)

      })
    },
    createCommunity () {
      eventObject().$emit('CREATE_COMMUNITY-INDEX')
    },
    // 进入成员社群
    enterStore (data) {
      if (data) {
        window.postMessage({
          cmd: 'click-single_store',
          params: {
            name: data.groupName,
            groupSonGuid: data.groupSonGuid,
            personCount: data.count,
            floor: data.floor,
            coordinates: data.coordinates.replace(/\[\]/g, '')
          }
        }, '*')
      }
    }
  },
  watch: {},
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@/styles/variables.scss";

  .app-wrapper .app-main-content .three__floor--wrap {
    padding: 20px;
    box-sizing: border-box;
  }

  /*未选择社群，无数据是字体默认颜色*/
  .empty--data {
    color: #79787B;
    .gc--color {
      color: #79787B;
    }
    .bc--color {
      color: #79787B;
    }
    .float-block {
      .sex__ratio--icon {
        background-image: url(../../assets/three/sex_ratio_icon2.png) !important;
      }
    }
    .percent-wrap {
      color: #fff;
    }
  }

  .three__floor--wrap {
    .corner-bg {
      margin-bottom: 8px;
      padding: 20px;
      box-sizing: border-box;
    }
    div.items {
      background-color: $theme-bg1;
    }
  }

  /*标题样式*/
  .floor__sub--title {
    font-size: 14px;
    color: #fff;
    &.vertical {
      display: inline-block;
      width: 1em;
      line-height: 1.2;
      margin-right: 15px;
    }
  }

  /*分析数据展示部分*/
  .bc--color {
    color: #005BC9;
  }

  .gc--color {
    color: #8663FF;
  }

  .floor__data--wrap {
    float: right;
    overflow: hidden;
    width: 31.76%;
    /*max-width: 400px;*/
    min-width: 340px;
    height: 100%;
    padding: 0 10px;
    /*margin-left: 10px;*/
    background: $theme-bg1;
    .title {
      height: 56px;
      line-height: 56px;
      margin-bottom: 12px;
      border-bottom: 1px dashed #3B3F46;
      font-size: 20px;
      color: $gray-title;
      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 20px;
        margin-right: 15px;
        vertical-align: middle;
        background: $theme-blue;
      }
    }
    .el-scrollbar {
      height: 100%;
      overflow: hidden;
    }
    .el-scrollbar__view {
      .items {
        padding: 10px 15px;
        box-sizing: border-box;
        background: #26273D;
      }
      > div {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    /*会员比例、男女比例*/
    .float-block {
      height: 198px;
      &.single {
        height: 220px;
      }
      .items {
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        &:first-child {
          margin-right: 10px;
        }
      }
      .sex__data--wrap {
        height: calc(100% - 20px);
        font-size: 12px;
        p {
          img {
            vertical-align: text-bottom;
            margin-right: 3px;
          }
        }
      }
      .sex__ratio--icon {
        width: 41px;
        height: 100%;
        margin: 0 8px;
        background-position: left center;
        background-repeat: no-repeat;
        background-image: url(../../assets/three/sex_ratio_icon.png);
        background-size: 100% auto;
      }
    }
    .return-ratio{
      height: 120px;
    }

    /*.return__ratio--wrap {*/
      /*display: inline-block;*/
      /*margin-top: 15px;*/
      /*height: 24px;*/
      /*line-height: 25px;*/
      /*.return__ratio--icon {*/
        /*float: left;*/
        /*display: block;*/
        /*width: 10px;*/
        /*height: 24px;*/
        /*margin-right: 7px;*/
        /*background-image: url(../../assets/three/return_girl_icon@2x.png);*/
        /*background-size: 100% auto;*/
        /*&.boy {*/
          /*background-image: url(../../assets/three/return_boy_icon@2x.png);*/
        /*}*/
        /*&:last-child {*/
          /*margin-right: 0;*/
        /*}*/
      /*}*/
    /*}*/
    .content--wrap {
      height: 250px;
      &.double-item {
        height: 300px;
        @media screen and(max-width: 1400px) {
          height: 260px;
        }
      }
    }

    /*年龄比例*/
    .age-ratio {
      float: left;
      width: 100%;
      height: 100%;
      &.vertical {
        width: calc(50% - 5px);
      }
    }
    .in-flow {
      height: 230px;
    }
    /*业态客流排行榜*/
    .format-flow-rank {
      float: left;
      width: calc(50% - 5px);
      height: 100%;
      margin-right: 10px;
      /*@media screen and(max-width: 1280px) {*/
      /*height: 200px;*/
      /*}*/
      /*@media screen and(min-width: 1920px) {*/
      /*height: 300px;*/
      /*}*/
      > .clearfix {
        position: relative;
        height: calc(100% - 20px);
      }
      .industry__rank--wrap {
        height: 66%;
        .rank-items {
          position: relative;
          float: left;
          width: 25%;
          height: 100%;
          text-align: center;
          background-repeat: no-repeat;
          background-position: left bottom;
          background-image: url(../../assets/three/industry_rank_two.png);
          background-size: 100% auto;
          p {
            position: absolute;
            width: 100%;
            bottom: 12%;
            font-size: 13px;
          }
          &:nth-child(2) {
            margin: 0 12%;
            background-image: url(../../assets/three/industry_rank_one.png);
            p {
              bottom: 15%;
            }
          }
          &:nth-child(3) {
            background-image: url(../../assets/three/industry_rank_three.png);
            p {
              bottom: 9%;
            }
          }
        }
      }
      .right__sidebar {
        position: absolute;
        height: 28%;
        width: 100%;
        bottom: 0;
        font-size: 12px;
        .sidebar--item {
          float: left;
          width: 50%;
          .ellipsis {
            width: 64%;
          }
          span + span {
            margin-left: 4px;
          }
          &:not(:last-of-type) {
            margin-bottom: 8px;
          }
        }
      }
    }
    /*门店客流排行*/
    .store-flow-rank {
      .pl-items {
        height: 30px;
        line-height: 30px;
        text-align: left;
        .el-progress__text {
          color: #fff;
        }
        > span {
          width: 90px;
          font-size: 12px;
          margin-right: 5px;
        }
        .el-icon-d-arrow-right:not(.c-grey) {
          color: #3a8ee6;
          cursor: pointer;
        }
        .el-progress {
          width: calc(100% - 120px);
        }
      }
    }
  }

  /*楼宇地图展示*/
  .floor__3d--wrap {
    overflow: hidden;
    height: 100%;
    .floor__sidebar--wrap {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 40px;
      z-index: 99;
      text-align: center;
      .sidebar__item {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          background: #0f9ee9;
        }
      }
    }
    &:after {
      /*content: '';*/
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0F0E11;
    }
  }

  /*单店无地图样式*/

  .store__map--empty{
    height: 100%;
    .main-content{
      height: 100%;
      overflow: hidden;
    }
    .items {
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      background: #26273D;
    }
    .item--top{
      height: 26%;
    }
    .item--middle{
      height: calc(40% - 10px);
      margin: 10px 0;
      .flow-wrap{
        height: 100%;
        overflow: hidden;
      }
      .double-ratio{
        float: right;
        width: calc(50% - 5px);
        height: 100%;
        margin-left: 10px;
        .ratio-item{
          float: left;
          width: calc(50% - 5px);
          height: 100%;
          box-sizing: border-box;
          & + .ratio-item{
            margin-left: 10px;
          }
        }
      }
      @media screen and(max-width: 1600px){
        .double-ratio{
          width: calc(30%);
          .ratio-item{
            width: 100%;
            height: calc(50% - 5px);
            box-sizing: border-box;
            & + .ratio-item{
              margin: 10px 0 0;
            }
          }
        }
      }
    }
    .item--bottom{
      height: calc(34% - 15px);
    }
    .double{
      float: left;
      width: calc(50% - 5px);
      height: 100%;
      box-sizing: border-box;
      & + .double{
        margin-left: 10px;
      }
    }
    .time-echart--wrap{
      display: inline-block;
      width: 150px;
      height: 38px;
    }
    /*侧边栏样式*/
    .bar-box{
      float: right;
      width: 164px;
      height: 100%;
      padding: 5px;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
</style>
