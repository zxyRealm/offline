<template>
    <div class="three__floor--wrap">
        <!--楼宇3D/平面分布图展示 start-->
        <!--没有管理层信息是空数据状态 使用class="empty--data"-->
        <template v-if="!currentManage.id">

            <div class="floor__data--wrap">
                <el-scrollbar>
                    <!--门店客流排行榜-->
                    <!--商场管理、商场楼层、连锁全国、省、市、区 状态下显示-->
                    <!--v-if="currentManage.type === 1 && !currentFloor.industryType && currentFloor.type !== 4"-->
                    <div class="store-flow-rank items">
                        <div class="floor__sub--title">
                            门店客流排行榜
                        </div>
                        <div class="process__list--wrap">
                            <div class="pl-items vam" v-for="(val, $index) in 6" :key="val"
                                 :class="{'empty--data': !rankData.group[$index]}">
                                <span class="ellipsis">{{val}}.{{rankData.group[$index] ? rankData.group[$index].groupName : `门店${$index + 1}`}}</span>
                                <el-progress :color="rankData.group[$index] ? industryColor[$index] : '#005BC9'"
                                             :percentage="rankData.group[$index] ? rankData.group[$index].percent : 0"></el-progress>
                                <el-icon
                                    class="el-icon-d-arrow-right"
                                    @click.native="enterStore(rankData.group[$index])"
                                    :class="{'c-grey': !rankData.group[$index]}"></el-icon>
                            </div>
                        </div>
                    </div>

                    <!--进客流柱状图-->
                    <!--门店状态（商场、连锁）或者单店状态下显示-->
                    <div class="in-flow items"
                         v-if="currentManage.type === 3 || currentFloor.industryType || currentFloor.type === 4">
                        <chart-bar title="进客流量" :data="flowData" type="inflow" width="100%" height="100%"></chart-bar>
                    </div>

                    <div class="float-block clearfix" :class="{single: currentManage.type === 3}">
                        <!--会员比例-->
                        <div class="member-ratio items">
                            <Chart
                                title="会员比例" :data="ratioData.member" type="member" width="100%"
                                height="100%"></Chart>
                        </div>
                        <!--男女比例-->
                        <div class="sex-ratio items"
                             :class="{'empty--data': !ratioData.gender.man || !ratioData.gender.man.total}">
                            <Chart
                                title="性别比例" :data="ratioData.gender" type="gender" width="100%"
                                height="100%"></Chart>
                            <!--<div class="floor__sub&#45;&#45;title">-->
                                <!--男女比例-->
                            <!--</div>-->
                            <!--<div class="sex__data&#45;&#45;wrap vam">-->
                                <!--<div>-->
                                    <!--<span>{{ratioData.gender.woman ? ratioData.gender.woman.percent: '0%'}}</span>-->
                                    <!--<p><img width="15" src="@/assets/three/girl_icon@2x.png" alt="">女</p>-->
                                <!--</div>-->
                                <!--<div class="sex__ratio&#45;&#45;icon"></div>-->
                                <!--<div>-->
                                    <!--<p><img width="15" src="@/assets/three/boy_icon@2x.png" alt="">男</p>-->
                                    <!--<span>{{ratioData.gender.man ? ratioData.gender.man.percent: '0%'}}</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <!--回头客比例-->
                    <div class="return-ratio items"
                         :class="{'empty--data': !ratioData.appearance.many || !ratioData.appearance.many.total, single: currentManage.type === 3}">
                        <div class="floor__sub--title">
                            回头客比例
                        </div>
                        <custom-pie :total="ratioData.appearance.many ? ratioData.appearance.many.total : 0"
                                    :percent="ratioData.appearance.many ? ratioData.appearance.many.percent : 0"></custom-pie>
                        <div class="return__data--wrap">
                            <div class="multi__box vam">
                                <img src="@/assets/three/return_multi_icon@2x.png" alt=""><span>多次</span>
                                <span>{{ratioData.appearance.many ? ratioData.appearance.many.percent : '0%'}}</span>
                            </div>
                            <div class="single__box vam">
                                <img src="@/assets/three/return_single_icon@2x.png" alt=""><span>单次</span>
                                <span>{{ratioData.appearance.first ? ratioData.appearance.first.percent : '0%'}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="content--wrap">
                        <!--年龄比例-->
                        <div class="age-ratio items" :class="{single: currentManage.type === 3}">
                            <Chart :data="ratioData.age" title="年龄比例" type="age" width="100%" height="100%"></Chart>
                        </div>

                        <!--业态客流排行榜-->
                        <!--v-if="currentManage.type === 1 && currentFloor && currentFloor.floor === 0"-->
                        <div class="format-flow-rank items">
                            <div class="floor__sub--title">
                                业态客流排行榜
                            </div>
                            <div class="clearfix">
                                <div class="industry__rank--wrap">
                                    <div class="rank-items">
                                        <p>{{rankData.industry[1] ? rankData.industry[1].industryName : ''}}<br>{{rankData.industry[1]
                                            ? rankData.industry[1].percent: ''}}</p>
                                    </div>
                                    <div class="rank-items">
                                        <p>{{rankData.industry[0] ? rankData.industry[0].industryName : ''}}<br>{{rankData.industry[0]
                                            ? rankData.industry[0].percent: ''}}</p>
                                    </div>
                                    <div class="rank-items">
                                        <p>{{rankData.industry[2] ? rankData.industry[2].industryName : ''}}<br>{{rankData.industry[2]
                                            ? rankData.industry[2].percent : ''}}</p>
                                    </div>
                                </div>
                                <ul class="right__sidebar">
                                    <template v-for="(item, $index) in rankData.industry">
                                        <li
                                            :key="$index"
                                            v-if="$index > 2 && $index < 10"
                                            class="sidebar--item">
                                            <span>{{$index + 1}}.{{item.industryName}}</span>
                                            <span>{{item.percent}}</span>
                                        </li>
                                    </template>

                                </ul>
                            </div>
                            <!--<chart-bar title="业态客流排行榜" width="100%" height="100%"></chart-bar>-->
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
import CustomPie from '@/components/echarts/custom-pie'
import { eventObject } from '../../utils/event'
import { GetFlowRank, GetTimeRatio, GetChartLine, getTimeRatio } from '../../api/visual'
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
      industryColor: [
        '#FF6660',
        '#FD951B',
        '#FFEF03',
        '#7ED321',
        '#005BC9',
        '#4A21B8'
      ],
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
    CustomPie
  },
  created () {
  },
  mounted () {
    // 地图首页默认收起侧边栏
    this.$store.dispatch('DISPATCH_SIDEBAR', false)
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    setFloorInfo (data) {
      this.currentFloor = data
      this.initBaseData()
      this.getFlowData()
    },
    CommunicationPer (data) {
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
      // if (info.type === 4 || info.industryType) return
      if (this.num < 4) {
        this.timer = setTimeout(() => {
          this.initBaseData()
        }, 60 * 1000)
      }
      // 获取客流排行(查看总商场时展示门店、业态客流排行；查看单层楼时展示门店客流排行)
      if (!info) return
      if (info.type !== 4 && !info.industryType) {
        GetFlowRank({ groupFloor: info.floor, groupGuid: this.currentManage.id, type: info.type }).then(res => {
          this.num = 0
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
          if (err.code === 'ERR-110') {
            this.num = 4
          } else {
            this.num++
          }
          console.error(err.msg || '网络异常，请稍后重新尝试')
        })
      }
      // 获取实时比率
      getTimeRatio({ groupFloor: info.floor, groupGuid: this.currentManage.id, type: info.type }).then(res => {
        this.num = 0
        let resData = JSON.parse(res.data)
        resData = this.CommunicationPer(resData)
        // resData.gender = {
        //   man: resData.gender.filter(item => item.code === 'MAN')[0] || '',
        //   woman: resData.gender.filter(item => item.code === 'WOMAN')[0] || ''
        // }
        resData.appearance = {
          many: resData.appearance.filter(item => item.code === 'MANY')[0] || '',
          first: resData.appearance.filter(item => item.code === 'FIRST')[0] || ''
        }
        this.ratioData = resData
        // console.log('ratio ----------', this.ratioData)
      }).catch(err => {
        if (err.code === 'ERR-110') {
          this.num = 4
        } else {
          this.num++
        }
      })
    },

    // 获取客流数据
    getFlowData () {
      if (this.currentFloor.industryType || this.currentFloor.type === 4) {
        let date = Moment().format('YYYY-MM-DD')
        GetChartLine({
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
    * */
    getRatioData (type) {

      getTimeRatio({ groupFloor: info.floor, groupGuid: this.currentManage.id, type: type }).then((res) => {
        this.num = 0
        let resData = JSON.parse(res.data)
        resData = this.CommunicationPer(resData)
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
    @import "@/styles/variables.scss";

    .app-wrapper .app-main-content .three__floor--wrap {
        padding: 10px;
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
            background-color: #232027;
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
        max-width: 400px;
        min-width: 340px;
        height: 100%;
        margin-left: 10px;
        .el-scrollbar {
            height: 100%;
            overflow: hidden;
        }
        .el-scrollbar__view {
            .items {
                padding: 10px 15px;
                box-sizing: border-box;
                background: #101116;
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
        /*回头客比例*/
        .return-ratio {
            height: 116px;
            &.single {
                height: 146px;
                .person__pie--wrap {
                    margin-top: 28px;
                    margin-bottom: 15px;
                    height: 38px;
                }
            }
            .person__pie--wrap {
                margin-top: 15px;
                height: 28px;
            }
        }
        .return__data--wrap {
            margin-top: 10px;
            font-size: 12px;
            overflow: hidden;
            > div {
                img {
                    margin-right: 4px;
                    width: 15px;
                }
                &:first-child {
                    float: left;
                }
                &:last-child {
                    float: right;
                }
            }
        }
        .return__ratio--wrap {
            display: inline-block;
            margin-top: 15px;
            height: 24px;
            line-height: 25px;
            .return__ratio--icon {
                float: left;
                display: block;
                width: 10px;
                height: 24px;
                margin-right: 7px;
                background-image: url(../../assets/three/return_girl_icon@2x.png);
                background-size: 100% auto;
                &.boy {
                    background-image: url(../../assets/three/return_boy_icon@2x.png);
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        /*年龄比例*/
        .age-ratio {
            height: 170px;
            &.single {
                height: 200px;
            }
        }
        .in-flow {
            height: 230px;
        }
        /*业态客流排行榜*/
        .format-flow-rank {
            height: 200px;
            > .clearfix {
                position: relative;
                height: calc(100% - 20px);
            }
            .industry__rank--wrap {
                float: left;
                width: calc(100% - 82px);
                height: 100%;
                .rank-items {
                    position: relative;
                    float: left;
                    width: 64px;
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
                        margin: 0 15px;
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
                right: 0;
                bottom: 0;
                margin-top: -2px;
                font-size: 12px;
                .sidebar--item {
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
        /*float: left;*/
        overflow: hidden;
        /*margin-right: 10px;*/
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
</style>
