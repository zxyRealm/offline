<template>
  <div class="three__floor--wrap">
    <!--楼宇3D/平面分布图展示 start-->
    <div class="floor__data--wrap">
      <el-scrollbar>
        <div class="float-block clearfix">
          <!--会员比例-->
          <div class="member-ratio items">
            <Chart title="会员比例" type="member" width="100%" height="100%"></Chart>
          </div>
          <!--男女比例-->
          <div class="sex-ratio items">
            <div class="floor__sub--title">
              男女比例
            </div>
            <div class="sex__data--wrap vam empty--data">
              <div>
                <span class="gc--color">38%</span>
                <p><img width="15" src="@/assets/three/girl_icon@2x.png" alt="">女</p>
              </div>
              <img width="48" class="sex__ratio--icon" src="@/assets/three/sex_ratio_icon.png" alt="">
              <div>
                <p><img width="15" src="@/assets/three/boy_icon@2x.png" alt="">男</p>
                <span class="bc--color">62%</span>
              </div>
            </div>
          </div>
        </div>
        <!--回头客比例-->
        <div class="return-ratio items">
          <div class="floor__sub--title">
            回头客比例
          </div>
          <div class="return__ratio--wrap">
            <custom-pie :percent="50"></custom-pie>
          </div>
          <div class="return__data--wrap">
            <div class="multi__box vam">
              <img width="15" src="@/assets/three/return_multi_icon@2x.png" alt=""><span>多次</span>
              <span class="gc--color">59%</span>
            </div>
            <div class="single__box vam">
              <img width="15" src="@/assets/three/return_single_icon@2x.png" alt=""><span>单次</span>
              <span class="bc--color">41%</span>
            </div>
          </div>
        </div>
        <!--年龄比例-->
        <div class="age-ratio items">
          <Chart title="年龄比例" type="age" width="100%" height="100%"></Chart>
        </div>
        <!--业态客流排行榜-->
        <div class="format-flow-rank items">
          <div class="floor__sub--title">
          业态客流排行榜
          </div>
          <div>
            <ul class="right__sidebar">
              <li
                v-for="(item, $index) in industryList"
                :key="$index"
                v-if="$index > 2"
                class="sidebar--item"><span>{{$index + 1}}.{{item.name}}</span><span>{{item.value}}</span> </li>
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
            <div class="pl-items vam" v-for="(item, $index) in list" :key="$index" v-if="$index < 6">
              <span class="ellipsis">{{$index + 1}}.{{item.name}}</span>
              <el-progress :percentage="item.percent" color="##0F9EE9"></el-progress>
              <el-icon class="el-icon-d-arrow-right"></el-icon>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="floor__3d--wrap black">
      <ul class="floor__sidebar--wrap">
        <li class="sidebar__item" v-for="(item,$Index) in floorList" :key="$Index" @click="selectFloor(item)">{{item}}</li>
      </ul>
    </div>
    <!--楼宇3D/平面分布图展示 end-->
    <!--实时客流 start-->
    <!--<div class="floor__block&#45;&#45;passenger corner-bg items vam">-->
      <!--<div class="floor__sub&#45;&#45;title vertical">-->
        <!--实时客流-->
      <!--</div>-->
      <!--<div class="passenger-items">-->
        <!--<div class="items-icon">-->
          <!--<img src="../../assets/three/enter-flow-icon@2x.png" alt="">-->
          <!--<p>进客流</p>-->
        <!--</div>-->
        <!--<div class="items-data">-->
          <!--<div class="sub-items">-->
            <!--<strong>210</strong><span>5%</span>-->
            <!--<p>今日数据</p>-->
          <!--</div>-->
          <!--<div class="sub-items">-->
            <!--<strong>2000</strong>-->
            <!--<p>昨日数据</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="passenger-items">-->
        <!--<div class="items-icon">-->
          <!--<img src="../../assets/three/visitor-icon@2x.png" alt="">-->
          <!--<p>到访会员</p>-->
        <!--</div>-->
        <!--<div class="items-data vam">-->
          <!--<div class="sub-items">-->
            <!--<strong>2100</strong><span>5%</span>-->
            <!--<p>今日数据</p>-->
          <!--</div>-->
          <!--<div class="sub-items">-->
            <!--<strong>20000</strong>-->
            <!--<p>昨日数据</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="passenger-items vam">-->
        <!--<div class="items-icon">-->
          <!--<img src="../../assets/three/current-number-icon@2x.png" alt="">-->
          <!--<p>当前人数</p>-->
        <!--</div>-->
        <!--<div class="items-data">-->
          <!--<div class="sub-items">-->
            <!--<strong>21000</strong>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--实时客流 end-->
    <!--详细数据展示-->
    <!--<div class="floor__block&#45;&#45;child">-->
      <!--<div class="fc-left">-->
        <!--&lt;!&ndash;到访会员&ndash;&gt;-->
        <!--<div class="floor-visitor corner-bg items">-->
          <!--<div class="floor__sub&#45;&#45;title">-->
            <!--到访会员-->
          <!--</div>-->
          <!--<div class="visitor-info-wrap vam">-->
            <!--<img class="visitor-photo" src="/static/img/logo@2x.png" alt="">-->
            <!--<div class="detail-info">-->
              <!--<p>姓名</p>-->
              <!--<p>会员库名</p>-->
              <!--<p>女</p>-->
              <!--<p>18岁</p>-->
              <!--<p>2018-11-29 17:50</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<el-scrollbar class="visitor-history&#45;&#45;list">-->
            <!--<img class="visitor-avatar" src="/static/img/logo@2x.png" v-for="(item, $index) in 30" :key="$index" alt="">-->
          <!--</el-scrollbar>-->
        <!--</div>-->
        <!--&lt;!&ndash;业态客流排行榜&ndash;&gt;-->
        <!--<div class="format-flow-rank corner-bg items">-->
          <!--&lt;!&ndash;<div class="floor__sub&#45;&#45;title">&ndash;&gt;-->
            <!--&lt;!&ndash;业态客流排行榜&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<chart-funnel title="业态客流排行榜" width="100%" height="100%"></chart-funnel>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="fc-right">-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import Chart from '@/components/echarts/three-pie'
import ChartBar from '@/components/echarts/three-bar'
import buildFloor from '@/views/three/index'
import CustomPie from '@/components/echarts/custom-pie'
import {GetSocketIP} from '../../api/common'
import {mapState} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      svgObj: '',
      newSvgChild: '',
      styleList: [],
      imgList: [
        {
          href: '/static/img/logo@2x.png'
        }
      ],
      list: [
        { name: '无印良品', percent: 50 },
        { name: '优衣库', percent: 30 },
        { name: '传奇奢华影城', percent: 18 },
        { name: '外婆家', percent: 8 },
        { name: '外婆家', percent: 8 },
        { name: '外婆家', percent: 8 },
        { name: '外婆家', percent: 8 }
      ],
      industryList: [
        {name: '文体', value: '30%'},
        {name: '文体', value: '22%'},
        {name: '文体', value: '18%'},
        {name: '文体', value: '9%'},
        {name: '文体', value: '7%'},
        {name: '文体', value: '5%'},
        {name: '文体', value: '3%'},
        {name: '文体', value: '2%'},
        {name: '文体', value: '1.6%'}
      ],
      floorList: [
        'F4',
        'F3',
        'F2',
        'F1',
        'B1',
        'B2',
        'B3'
      ],
      iframeSrc: '/three'
    }
  },
  components: {
    Chart,
    ChartBar,
    buildFloor,
    CustomPie
  },
  created () {},
  mounted () {
    this.getWebsocket()
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    selectFloor (name) {
      console.log(name)
      document.getElementById('iframe__three').src = `/three?floor=${name}`
      // this.iframeSrc =
      // this.$refs.floorMap.initScene(name)
      console.log(this.$refs.floorMap)
    },
    // 绑定社群
    bindGroupMap (data) {
      console.log(data.name, data.geometry.attributes.position.array.toString().split(','))
      this.$prompt('请输入社群名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        customClass: 'white',
        inputErrorMessage: '社群名称不能为空'
      }).then(({ value }) => {
        localStorage.setItem('group_local', JSON.stringify({name: value, position: data.geometry.attributes.position.array.toString().split(',')}))
        console.log(value, '-----------' + data.name)
      })
    },
    // 获取socket服务地址并建立websocket链接
    getWebsocket () {
      GetSocketIP().then(res => {
        let _this = this
        let wsServer = `ws://192.168.1.153:8010/websocket/${this.currentManage.id}` // 服务器地址
        this.websocket = new WebSocket(wsServer)
        this.websocket.onopen = function (evt) {
          // 已经建立连接
          _this.websocket.send(_this.currentManage.id + '_channel') // 向服务器发送消息
          console.info('已经连接')
        }
        this.websocket.onmessage = function (evt) {
          // 收到服务器消息，使用evt.data提取
          console.log('push message', evt)
          // _this.resolveDatad(evt.data)
        }
        this.websocket.onclose = function (evt) {
          console.info('已经关闭连接')
        }
        this.websocket.onerror = function (evt) {
          console.info('产生异常')
        }
      })
    }
  },
  watch: {}
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
  }
  .three__floor--wrap {
    > div {
      &:last-child{
        margin-bottom: 20px;
      }
    }
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
    &.vertical{
      display: inline-block;
      width: 1em;
      line-height: 1.2;
      margin-right: 15px;
    }
  }
  /*分析数据展示部分*/
  .floor__data--wrap{
    float:left;
    width: 332px;
    height: 100%;
    margin-right: 5px;
    .bc--color{
      color: #005BC9;
    }
    .gc--color{
      color: #8663FF ;
    }
    .el-scrollbar{
      height: 100%;
      overflow: hidden;
    }
    .el-scrollbar__view{
      .items{
        padding: 10px 15px;
        box-sizing: border-box;
        background: rgba(216, 216, 216, 0.05);
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
        width: calc(50% - 2px);
        &:first-child{
          margin-right: 4px;
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
        .sex__ratio--icon{
          width: 48px;
          margin: 0  8px;
        }
      }
    }
    /*回头客比例*/
    .return-ratio{
      height: 116px;
    }
    .return__data--wrap{
      margin-top: 10px;
      color: #79787B ;
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
      .right__sidebar{
        float: right;
        width: 70px;
        margin-top: 15px;
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
        > span{
          width: 90px;
          font-size: 12px;
          margin-right: 5px;
        }
        .el-icon-d-arrow-right{
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
    border: 1px solid #ddd;
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
