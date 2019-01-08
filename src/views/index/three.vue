<template>
  <div class="three__floor--wrap">
    <!--楼宇3D/平面分布图展示 start-->
    <!--没有管理层信息是空数据状态 使用class="empty--data"-->
    <template v-if="currentManage.id">
      <div class="floor__data--wrap">
        <el-scrollbar>
          <div class="float-block clearfix">
            <!--会员比例-->
            <div class="member-ratio items">
              <Chart title="会员比例" :data="ratioData.member" type="member" width="100%" height="100%"></Chart>
            </div>
            <!--男女比例-->
            <div class="sex-ratio items" :class="{'empty--data': !ratioData.gender.man || !ratioData.gender.man.total}">
              <div class="floor__sub--title">
                男女比例
              </div>
              <div class="sex__data--wrap vam">
                <div>
                  <span>{{ratioData.gender.woman ? ratioData.gender.woman.percent: '0%'}}</span>
                  <p><img width="15" src="@/assets/three/girl_icon@2x.png" alt="">女</p>
                </div>
                <div class="sex__ratio--icon"></div>
                <!--<img width="48" class="sex__ratio&#45;&#45;icon" src="@/assets/three/sex_ratio_icon.png" alt="">-->
                <div>
                  <p><img width="15" src="@/assets/three/boy_icon@2x.png" alt="">男</p>
                  <span>{{ratioData.gender.man ? ratioData.gender.man.percent: '0%'}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--回头客比例-->
          <div class="return-ratio items" :class="{'empty--data': !ratioData.appearance.many || !ratioData.appearance.many.total}">
            <div class="floor__sub--title">
              回头客比例
            </div>
            <div class="return__ratio--wrap">
              <custom-pie :total="ratioData.appearance.many ? ratioData.appearance.many.total : 0" :percent="ratioData.appearance.many ? ratioData.appearance.many.percent : 0"></custom-pie>
            </div>
            <div class="return__data--wrap">
              <div class="multi__box vam">
                <img width="15" src="@/assets/three/return_multi_icon@2x.png" alt=""><span>多次</span>
                <span>{{ratioData.appearance.many ? ratioData.appearance.many.percent : '0%'}}</span>
              </div>
              <div class="single__box vam">
                <img width="15" src="@/assets/three/return_single_icon@2x.png" alt=""><span>单次</span>
                <span>{{ratioData.appearance.first ? ratioData.appearance.first.percent : '0%'}}</span>
              </div>
            </div>
          </div>
          <!--年龄比例-->
          <div class="age-ratio items">
            <Chart :data="ratioData.age" title="年龄比例" type="age" width="100%" height="100%"></Chart>
          </div>
          <!--业态客流排行榜-->
          <div class="format-flow-rank items" v-if="currentFloor && currentFloor.floor === 0">
            <div class="floor__sub--title">
            业态客流排行榜
            </div>
            <div class="clearfix">
              <div class="industry__rank--wrap">
                <div class="rank-items">
                  <span>{{rankData.industry[1] ? rankData.industry[1].industryName : ''}} <br> {{rankData.industry[1] ? rankData.industry[1].percent: ''}}</span>
                </div>
                <div class="rank-items">
                  <span>{{rankData.industry[0] ? rankData.industry[0].industryName : ''}} <br> {{rankData.industry[0] ? rankData.industry[0].percent: ''}}</span>
                </div>
                <div class="rank-items">
                  <span>{{rankData.industry[2] ? rankData.industry[2].industryName : ''}} <br> {{rankData.industry[2] ? rankData.industry[2].percent : ''}}</span>
                </div>
              </div>
              <ul class="right__sidebar">
                <li
                  v-for="(item, $index) in rankData.industry"
                  :key="$index"
                  v-if="$index > 2 && $index < 10"
                  class="sidebar--item"><span>{{$index + 1}}.{{item.industryName}}</span><span>{{item.percent}}</span> </li>
              </ul>
            </div>
            <!--<chart-bar title="业态客流排行榜" width="100%" height="100%"></chart-bar>-->
          </div>
          <!--门店客流排行榜-->
          <div class="store-flow-rank items">
            <div class="floor__sub--title">
              门店客流排行榜
            </div>
            <div class="process__list--wrap">
              <div class="pl-items vam" v-for="(val, $index) in 6" :key="val" :class="{'empty--data': !rankData.group[$index]}">
                <span class="ellipsis">{{val}}.{{rankData.group[$index] ? rankData.group[$index].groupName : `门店${$index + 1}`}}</span>
                <el-progress :color="rankData.group[$index] ? industryColor[$index] : '#005BC9'" :percentage="rankData.group[$index] ? rankData.group[$index].percent : 0" ></el-progress>
                <el-icon class="el-icon-d-arrow-right" :class="{'c-grey': !rankData.group[$index]}"></el-icon>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="floor__3d--wrap black">
        <general-map @updateCommunity="setFloorInfo"></general-map>
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
import buildFloor from '@/views/three/index'
import CustomPie from '@/components/echarts/custom-pie'
import {GetSocketIP} from '../../api/common'
import {eventObject} from '../../utils/event'
import {GetFlowRank, GetTimeRatio, GetChartLine, GetChartPie} from '../../api'
import {mapState} from 'vuex'
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
      industryColor: [
        '#FB0004',
        '#FD951B',
        '#FFEF03',
        '#0F9EE9',
        '#005BC9',
        '#0F4585'
      ],
      rankData: { // 排行榜 （业态、门店）
        group: [],
        industry: []
      },
      currentFloor: {}, // 当前查看的楼层信息
      timer: null // 数据获取定时器
    }
  },
  components: {
    Chart,
    ChartBar,
    GeneralMap,
    buildFloor,
    CustomPie
  },
  created () {},
  mounted () {
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    setFloorInfo (data) {
      this.currentFloor = data
      this.initBaseData()
    },
    ComunicationPer (data) {
      for (let val in data) {
        if (Array.isArray(data[val])) {
          let total = 0
          data[val].map(item => {
            total += item.count
          })
          data[val] = data[val].map(item => {
            item.total = total
            item.percent = total ? ((item.count / total) * 100).toFixed(1) + '%' : '0%'
            return item
          })
        }
      }
      return data
    },
    // 初始化获取数据
    initBaseData () {
      let info = this.currentFloor
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.initBaseData()
      }, 5000)
      // 获取客流排行(查看总商场时展示门店、业态客流排行；查看单层楼时展示门店客流排行)
      if (!info) return
      GetFlowRank({groupFloor: info.floor, groupGuid: info.groupParentGuid}).then(res => {
        res.data = JSON.parse(res.data)
        let industryTotal = 0
        let groupTotal = 0
        res.data.industry.map(item => {
          industryTotal += item.count
        })
        res.data.group.map(item => {
          groupTotal += item.count
        })
        res.data.industry.map(item => {
          this.$set(item, 'percent', industryTotal ? ((item.count / industryTotal) * 100).toFixed(1) + '%' : '0%')
        })
        res.data.group.map(item => {
          this.$set(item, 'percent', groupTotal ? Number(((item.count / groupTotal) * 100).toFixed(1)) : 0)
        })
        this.rankData = res.data
      }).catch(err => {
        this.$tip(err.msg || '网络异常，请稍后重新尝试', 'error')
      })
      // 获取实时比率
      GetTimeRatio({groupFloor: info.floor, groupGuid: info.groupParentGuid}).then(res => {
        let resData = JSON.parse(res.data)
        resData = this.ComunicationPer(resData)
        resData.gender = {
          man: resData.gender.filter(item => item.code === 'MAN')[0] || '',
          woman: resData.gender.filter(item => item.code === 'WOMAN')[0] || ''
        }
        resData.appearance = {
          many: resData.appearance.filter(item => item.code === 'MANY')[0] || '',
          first: resData.appearance.filter(item => item.code === 'FIRST')[0] || ''
        }
        this.ratioData = resData
        // console.log('ratio ----------', this.ratioData)
      }).catch(err => {
        this.$tip(err.msg || '网络异常，请稍后重新尝试', 'error')
      })
    },
    createCommunity () {
      eventObject().$emit('CREATE_COMMUNITY-INDEX')
    }
  },
  watch: {
    currentManage: {
      handler (val) {
        // this.initBaseData()
      },
      deep: true
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .app-wrapper .app-main-content .three__floor--wrap{
    padding: 10px;
    box-sizing: border-box;
  }
  /*未选择社群，无数据是字体默认颜色*/
  .empty--data{
    color: #79787B ;
    .gc--color{
      color: #79787B ;
    }
    .bc--color{
      color: #79787B ;
    }
    .float-block{
      .sex__ratio--icon{
        background-image: url(../../assets/three/sex_ratio_icon2.png)!important;
      }
    }
    .percent-wrap{
      color: #fff;
    }
  }
  .three__floor--wrap {
    .corner-bg{
      margin-bottom: 8px;
      padding: 20px;
      box-sizing: border-box;
    }
    div.items{
      background-color: #232027;
    }
  }
  /*标题样式*/
  .floor__sub--title{
    font-size: 14px;
    color: #fff;
    &.vertical{
      display: inline-block;
      width: 1em;
      line-height: 1.2;
      margin-right: 15px;
    }
  }
  /*分析数据展示部分*/
  .bc--color{
    color: #005BC9;
  }
  .gc--color{
    color: #8663FF ;
  }
  .floor__data--wrap{
    float:left;
    /*width: 28%;*/
    width: 400px;
    height: 100%;
    margin-right: 5px;
    .el-scrollbar{
      height: 100%;
      overflow: hidden;
    }
    .el-scrollbar__view{
      .items{
        padding: 10px 15px;
        box-sizing: border-box;
        background: #101116;
      }
      > div {
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
    /*会员比例、男女比例*/
    .float-block{
      height: 198px;
      .items{
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        &:first-child{
          margin-right: 10px;
        }
      }
      .sex__data--wrap{
        margin-top: 26px;
        font-size: 12px;
        p {
          img{
            vertical-align: text-bottom;
            margin-right: 3px;
          }
        }
      }
      .sex__ratio--icon{
        width: 48px;
        height: 106px;
        margin: 0  8px;
        background-position: left center;
        background-repeat: no-repeat;
        background-image: url(../../assets/three/sex_ratio_icon.png);
        background-size: contain;
      }
    }
    /*回头客比例*/
    .return-ratio{
      height: 116px;
    }
    .return__data--wrap{
      margin-top: 10px;
      font-size: 12px;
      overflow: hidden;
      >div{
        display: inline-block;
        img {
          margin-right: 4px;
          /*display: inline-block;*/
          /*vertical-align: middle;*/
        }
        &:first-child{
          float: left;
        }
        &:last-child{
          float: right;
        }
      }
    }
    .return__ratio--wrap{
      display: inline-block;
      margin-top: 15px;
      height: 24px;
      line-height: 25px;
      .return__ratio--icon{
        float: left;
        display: block;
        width: 10px;
        height: 24px;
        margin-right: 7px;
        background-image: url(../../assets/three/return_girl_icon@2x.png);
        background-size: 100% auto;
        &.boy{
          background-image: url(../../assets/three/return_boy_icon@2x.png);
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }
    /*年龄比例*/
    .age-ratio{
      height: 160px;
    }
    /*业态客流排行榜*/
    .format-flow-rank{
      height: 200px;
      .industry__rank--wrap{
        float: left;
        width: 230px;
        height: 160px;
        .rank-items{
          float: left;
          width: 66px;
          height: 100%;
          text-align: center;
          background-repeat: no-repeat;
          background-position: left bottom;
          background-image: url(../../assets/three/industry_rank_two.png);
          background-size: contain;
          span{
            display: inline-block;
            margin-top: 94px;
          }
          &:nth-child(2){
            width: 70px;
            margin: 0 6px;
            background-image: url(../../assets/three/industry_rank_one.png);
            span{
              margin-top: 84px;
            }
          }
          &:nth-child(3) {
            width: 62px;
            background-image: url(../../assets/three/industry_rank_three.png);
            span{
              margin-top: 108px;
            }
          }
        }
      }
      .right__sidebar{
        float: right;
        margin-top: -2px;
        font-size: 12px;
        .sidebar--item{
          span + span{
            margin-left: 4px;
          }
           &:not(:last-of-type){
             margin-bottom: 8px;
           }
        }
      }
    }
    /*门店客流排行*/
    .store-flow-rank{
      .pl-items{
        height: 30px;
        line-height: 30px;
        text-align: left;
        .el-progress__text{
          color: #fff;
        }
        > span{
          width: 90px;
          font-size: 12px;
          margin-right: 5px;
        }
        .el-icon-d-arrow-right:not(.c-grey){
          color: #3a8ee6;
        }
        .el-progress{
          /*float: left;*/
          width: calc(100% - 120px);
        }
      }
    }
  }
  /*楼宇地图展示*/
  .floor__3d--wrap{
    overflow: hidden;
    height: 100%;
    .floor__sidebar--wrap{
      position: absolute;
      top: 20px;
      left: 20px;
      width: 40px;
      z-index: 99;
      text-align: center;
      .sidebar__item{
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &:hover{
          background: #0f9ee9;
        }
      }
    }
    &:after{
      /*content: '';*/
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0F0E11;
    }
  }
  /*实时客流样式表*/
  .floor__block--passenger {
    height: 132px;
    .passenger-items{
      width: 30%;
      height: 80px;
      margin-right: 15px;
      border-radius: 8px;
      padding: 16px 20px;
      box-sizing: border-box;
      background: #515055;
      text-align: center;
      color: #8c939d;
      font-size: 12px;
      &:last-child{
        margin-right: 0;
      }
      .items-icon{
        float: left;
        margin-right: 25px;
        text-align: center;
        line-height: 1.2;
        img{
          height: 28px;
        }
      }
      .items-data{
        overflow: hidden;
        text-align: left;
        > div {
          margin-right: 20px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .sub-items{
        display: inline-block;
        strong{
          font-size: 16px;
          color: #3a8ee6;
        }
        span{
          padding-left: 10px;
          color: #C03639;
          margin-left: 2px;
          background-position: 2px center;
          background-repeat: no-repeat;
          background-image: url(../../assets/three/up-icon@2x.png);
          background-size: auto 10px;
          &.lower {
            background-image: url(../../assets/three/up-icon@2x.png);
          }
        }
      }
    }
  }
  .floor__block--child{
    overflow: hidden;
    background: transparent;
    .floor-visitor{
      height: 584px;
      .visitor-info-wrap{
        background: #0F0E11;
        border-radius: 10px;
        padding: 16px;
        margin-top: 10px;
        .visitor-photo{
          width: 144px;
          height: 194px;
          border: 1px solid #d1dbe5;
          border-radius: 5px;
        }
        .detail-info{
          text-align: left;
          margin-left: 44px;
          p{
            height: 1.5em;
            line-height: 1;
            border-bottom: 1px dashed #979797;
            margin-bottom: 18px;
            font-size: 12px;
            padding: 0 10px;
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
      .visitor-history--list{
        overflow: hidden;
        margin-top: 25px;
        width: calc(100% + 8px);
        height: 256px;
        img.visitor-avatar {
          float: left;
          width: 58px;
          height: 80px;
          box-sizing: border-box;
          margin-right: 8px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
