<template>
  <div class="console-wrap" :style="{backgroundColor:!state?'':'#0F0E11' }">
    <ob-list-empty v-if="!state">
      <a href="javascript:void (0)" @click="selectGroupId">请选择您的社群和设备</a>
    </ob-list-empty>
    <div class="content-top" v-if="state" :class="isShow ? '': 'content-top__active'">
      <div class="content-top-left">
        <ul class="left-ul">
          <li class="corner-bg">
            <p>客流汇总信息 </p>
            <flow-info :type="'left'" :number="inNumber" class="flow-left"></flow-info>
            <flow-info :type="'right'" :number="outNumber" class="flow-right"></flow-info>
          </li>
          <li class="corner-bg vam">
            <all-time class="li-all-time"></all-time>
          </li>
        </ul>
        <div class="left-div" ref="lineConsole">
          <div class="passenger-flow--wrap corner-bg">
            <line-console ref="echartsLine" :line-params='lineParams'></line-console>
          </div>
          <!--会员信息-->
          <div class="corner-bg associator--wrap vam">
            <div class="associator--inner" v-if="memberInfo.imgUrl">
              <h3>***欢迎您</h3>
              <div class="detail-info--wrap">
                <div class="base-info">
                  <p><span class="ellipsis">{{memberInfo.memberLabelList[0].memberLibraryName}}</span></p>
                  <p>{{memberInfo.gender?'女':'男'}}</p>
                  <p>{{memberInfo.age}}</p>
                  <p>{{ memberInfo.appearanceDate | parseTime('{m}/{d}')}}</p>
                  <p>{{ memberInfo.appearanceDate | parseTime('{h}:{i}')}}</p>
                </div>
                <div class="associator__avatar--wrap">
                  <img class="associator__avatar" :src="memberInfo.cropUrl" alt="">
                </div>
              </div>
            </div>
            <img v-else style="max-width: 100%;" src="/static/img/logo@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="content-top-right">
        <ul class="bottom-ul">
          <li ref='pie' class="corner-bg pie-background " :class="isShow ? '': 'pie-background__active'">
            <pie ref="echartsPie" :pieParams="pieParams" class="pie-wrap-circle"></pie>
          </li>
          <li ref='bar' id="barFather" class="corner-bg" :class="isShow ? '': 'li--second__child'">
            <bar ref="echartsBar" :ageBar="ageBar"></bar>
          </li>
        </ul>
      </div>
    </div>
    <div :style="style" class="content-bottom corner-bg" v-show="state && isShow" :class="isShow ? 'animation--console__isShow' : 'animation--console__isHidden'">
      <div class="customer-wrap">
        <transition-group name="list-customer" class="transition-wrap left" tag="ul">
          <li
            v-for="(item,$index) in pedestrianInData"
            :key="$index"
            class="list-customer-item"
          >
            <customer-info :index="pedestrianInData.length -$index" :detailInfo="item" @handleDetailData="showDetailInfo"></customer-info>
          </li>
        </transition-group>
      </div>
      <ul class="customer-middle">
        <li class="customer-middle-top animation-lwh-show">
        </li>
        <li class="customer-middle-center vam">
          <p class="custom--button__isShow" @click="hideInformation">收起</p>
        </li>
        <li class="customer-middle-bottom animation-lwh-show">
        </li>
      </ul>
      <div class="customer-wrap">
        <transition-group name="list-customer" class="transition-wrap right" tag="ul">
          <li
            v-for="(item,$index) in pedestrianOutData"
            :key="$index"
            class="list-customer-item out-li"
          >
            <customer-info :index="pedestrianOutData.length -$index" :detailInfo="item" @handleDetailData="showDetailInfo"></customer-info>
          </li>
        </transition-group>
      </div>
    </div>
    <ob-dialog-info :visible.sync="showDialog" :data="showDialogData"></ob-dialog-info>
    <ul class="content--bottom__leader" v-show="!isShow">
        <li class="bottom--isShow__top animation-lwh-show">
        </li>
        <li class="bottom--isShow__middle" @click="hideInformation"></li>
        <li class="bottom--isShow__bottom animation-lwh-show">
        </li>
    </ul>
  </div>
</template>
<script>
import FlowInfo from './componets/FlowInfo.vue'
import AllTime from './componets/AllTime.vue'
import bar from '@/components/echarts/bar.vue'
import pie from '@/components/echarts/pie.vue'
import lineConsole from '@/components/echarts/line.vue'
import CustomerInfo from './componets/CustomerInfo.vue'
import {mapState} from 'vuex'
import {eventObject} from '@/utils/event.js'
import ObDialogInfo from './componets/ObDialogInfo'
export default {
  name: 'console',
  components: {FlowInfo, AllTime, bar, pie, lineConsole, CustomerInfo, ObDialogInfo},
  data () {
    return {
      memberInfo: {}, // 会员信息
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538981069997&di=50d38992576e0148cf82d71cbef50da9&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5fdf8db1cb134954068359695b4e9258d1094a19.jpg',
      showDialogData: {},
      showDialog: false, // 显示图片详细信息
      style: {
        visibility: 'visible'
      },
      isShow: true, // 推送消息是否展示
      state: false, // 是否有数据
      deviceKey: '', // 设备序列号
      pedestrianInData: [], // 进客流
      pedestrianOutData: [], // 出客流
      pieParams: { // 饼图
        type: 3,
        title: {text: '男女流量占比'},
        seriesData: [{value: 0, name: '女'}, {value: 0, name: '男'}]
        // legendData: ['女', '男']
      },
      lineParams: { // 线图
        title: {text: '客流量统计'}
      },
      outNumber: 0, // 出入数
      inNumber: 0, // 进入数
      ageBar: [0, 0, 0, 0, 0, 0], // 柱图
      websocket: null
    }
  },
  methods: {
    // 展示图片详细信息
    showDetailInfo (val) {
      this.showDialog = true
      this.showDialogData = JSON.parse(JSON.stringify(val)) // this.templateData是父组件传递的对象
    },
    // 隐藏推送消息
    hideInformation () {
      this.isShow = !this.isShow
      this.resizeFunction()
    },
    selectGroupId () {
      eventObject().$emit('change', '快点操作啊！')
    },
    // 启动websocket
    getwebsocket (data) {
      let me = this
      let wsServer = 'ws://' + data // 服务器地址
      this.websocket = new WebSocket(wsServer)
      this.websocket.onopen = function (evt) {
        // 已经建立连接
        me.websocket.send(me.deviceKey + '_channel') // 向服务器发送消息
        console.info('已经连接')
      }
      this.websocket.onmessage = function (evt) {
        // 收到服务器消息，使用evt.data提取
        me.resolveDatad(evt.data)
      }
      this.websocket.onclose = function (evt) {
        console.info('已经关闭连接')
      }
      this.websocket.onerror = function (evt) {
        console.info('产生异常')
      }
    },
    // echarts重新布局
    resizeFunction (time) {
      let me = this
      if (!me.$refs.bar) return
      let consoleTimer = null // 定时器
      if (consoleTimer) {
        consoleTimer = null
      }
      consoleTimer = setTimeout(() => {
        let tablePie = document.getElementById('echarts-pie')
        let barFather = document.getElementById('barFather')
        tablePie.style.width = me.$refs.pie.offsetWidth + 'px'
        // tablePie.style.height = me.$refs.pie.offsetHeight + "px";
        me.$refs.echartsPie.resizeEcharts()
        let table = document.getElementById('echarts-bar')
        table.style.width = me.$refs.bar.offsetWidth + 'px'
        if (me.$refs.pie.offsetHeight === 230) {
          barFather.style.height = 'calc(100% - 240px)'
          table.style.height = me.$refs.bar.offsetHeight + 'px'
        } else {
          barFather.style.height = 'calc(69% - 10px)'
          table.style.height = me.$refs.bar.offsetHeight + 'px'
        }
        me.$refs.echartsBar.resizeEcharts()
        // let tableLine = document.getElementById('echarts-line')
        // tableLine.style.width = me.$refs.lineConsole.offsetWidth + 'px'
        // tableLine.style.height = me.$refs.lineConsole.offsetHeight + 'px'
        me.$refs.echartsLine.resizeEcharts()
      }, time || 50)
    },
    // 解析数据
    resolveDatad (data) {
      let obj = JSON.parse(data)
      this.setMemberInfo(obj.memberInfoList)
      // 判断是否是同一台数据推送的数据
      if (obj.deviceKey !== this.deviceKey) return
      // 饼图 = 推送实时更新数据
      this.$set(this.pieParams.seriesData[0], 'value', obj.female)
      this.$set(this.pieParams.seriesData[1], 'value', obj.male)
      // 饼图 = 数据更新
      if (this.$refs.echartsPie) {
        this.$refs.echartsPie.consoleEmit()
      }
      // 进出人数
      this.outNumber = obj.outNumber
      this.inNumber = obj.inNumber
      // 柱状图
      if (Array.isArray(JSON.parse(obj.age))) {
        this.ageBar = JSON.parse(obj.age)
      }
      // 图片展示
      this.typePedestrian(obj.pedestrian[0])
    },
    // 判断数据类型，并且限定大小4
    typePedestrian (pedestrian) {
      if (!pedestrian) return
      let currentList = [] // 进出客数据列表
      // status 0 进客 1 出客
      pedestrian.status ? currentList = this.pedestrianOutData : currentList = this.pedestrianInData
      // 过滤重复数据
      let last = currentList[currentList.length - 1]
      if (last && (pedestrian.order === last.order)) {
        return
      }
      if (currentList.length >= 4) {
        currentList.splice(currentList.length - 1, 1)
      }
      currentList.unshift(pedestrian)
    },
    // 获取长连接ip（端口号：8083）
    getwebsocketIp () {
      this.$http('/getServiceIp').then(res => {
        this.getwebsocket(res.data)
      }).catch(error => {
        console.info(error)
      })
    },
    // 请求数据
    getData () {
      this.$http('/personData', {
        deviceKey: this.deviceKey
      }).then(res => {
        if (res.data && res.data.length) {
          this.resolveDatad(res.data) // 假如没走这一步，当你更换设备时记录的是上一个设备的数据
        } else {
          this.defaultData()
        }
        this.getwebsocketIp()
        this.resizeFunction()
      }).catch(error => {
        this.resizeFunction() // 请求失败渲染默认数据
        console.info(error)
      })
    },
    // 当请求数据为空时
    defaultData () {
      let params = { // 饼图
        type: 3,
        title: {text: '男女流量占比'},
        seriesData: [{value: 0, name: '女'}, {value: 0, name: '男'}]
      }
      this.pieParams = {...params}
      this.lineParams = { // 线图
        title: {text: '客流量统计'}
      }
      this.outNumber = 0 // 出入数
      this.inNumber = 0 // 进入数
      this.ageBar = [0, 0, 0, 0, 0, 0] // 柱图
    },
    // 获取会员信息，并对图像进行剪裁显示
    setMemberInfo (data) {
      console.log('data---', data)
      if (!data || !data[0]) return
      data = data[0]
      let coordinate = data.extendedFaceBox
      let [url, startX, startY, width, height] = [data.imgUrl, coordinate.upperX, coordinate.upperY, coordinate.lowerX - coordinate.upperX, coordinate.lowerY - coordinate.upperY]
      // 返回剪裁图片路径属于一个异步过程，因此使用回调方式返回url
      this.customDrawImage(url, startX, startY, width, height, url => {
        data.cropUrl = url
        this.memberInfo = data
      })
      // console.log(newUrl)
    },
    // 绘制图像（根据坐标）
    customDrawImage (url, startX, startY, width, height, callback) {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      let xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      if ('withCredentials' in xhr) {
        console.log('current support cros')
        // 此时即支持CORS的情况
        // 检查XMLHttpRequest对象是否有“withCredentials”属性
        // “withCredentials”仅存在于XMLHTTPRequest level 2对象里
      } else {
        // 否则检查是否支持XDomainRequest
        // XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式
        console.log('this is ie')
        xhr = new XDomainRequest()
      }
      xhr.onload = function () {
        let url = URL.createObjectURL(this.response)
        let img = new Image()
        img.crossOrigin = ''
        img.onload = function () {
          // 此时你就可以使用canvas对img为所欲为了(画图尺寸不可超出原图尺寸范围，IE上会报错 IndexSizeError)
          ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height)
          URL.revokeObjectURL(url)
          if (typeof callback === 'function') {
            callback(canvas.toDataURL('image/png', 1))
          } else {
            console.error('callback is not a function')
          }
          // console.log(customUrl)
          // 图片用完后记得释放内存
        }
        img.src = url
      }
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.send()
    }
  },
  created () {
    eventObject().$on('resize-echarts-console', msg => { // eventObject接收事件  == 控制控制台的图表重置
      this.resizeFunction()
    })
  },
  mounted () {
    let me = this
    window.addEventListener('resize', me.resizeFunction)
    if (this.groupConsoleId !== '') {
      this.deviceKey = this.$store.state.groupConsoleId
      this.state = true
      this.getData()
      // this.getwebsocketIp();
    }
  },
  computed: {
    ...mapState([
      'groupConsoleId'
    ])
  },
  watch: {
    showDialog (val, oldVal) {
      // console.info(val)
    },
    // 监听vuex groupConsoleId是否改变
    groupConsoleId (val) {
      if (!val || val === '') {
        this.state = false
        return
      }
      this.pedestrianInData = []
      this.pedestrianOutData = []
      if (this.websocket) {
        this.websocket.close()
      }
      this.deviceKey = val
      this.state = true
      this.getData()
    }
  },
  beforeRouteLeave (to, from, next) {
    let me = this
    // 路由跳转后，不需要保存控制台的信息
    this.$store.commit('SET_GROUP_CONSOLE_ID')
    this.$store.commit('SET_GROUP_SELECT_ID')
    // 解除绑定事件
    window.removeEventListener('resize', me.resizeFunction)
    eventObject().$off('resize-echarts-console')
    // 关闭websocket链接
    if (this.websocket) {
      this.websocket.close()
    }
    next()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .console-wrap {
    overflow: hidden;
    .content-top {
      height: 72%;
      .content-top-left, .content-top-right {
        float: left;
      }
      /*客流汇总信息/客流量统计/会员信息*/
      .content-top-left {
        height: 100%;
        width: 60%;
        box-sizing: border-box;
        .left-ul {
          height: 31%;
          li {
            float: left;
            background-color: rgba(64, 58, 73, 0.30);
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
          }
          li:nth-child(1) {
            width: 60%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            position: relative;
            .flow-info-wrap {
              top: calc(50% - 17px);
              position: absolute;
            }
            .flow-left {
              margin-left: calc(50% - 180px);
            }
            .flow-right {
              right: calc(50% - 180px);
            }
          }
          li:nth-child(2) {
            position: relative;
            margin-left: 10px;
            width: calc(40% - 10px);
            height: 100%;
            box-sizing: border-box;
            .li-all-time {
            }
          }
        }
        .left-div {
          margin-top: 10px;
          height: calc(69% - 10px);
          box-sizing: border-box;
          .passenger-flow--wrap{
            float: left;
            position: relative;
            width: 60%;
            height: 100%;
            margin-right: 10px;
          }
          /*会员信息*/
          .associator--wrap{
            float: left;
            width: calc(40% - 10px);
            height: 100%;
            padding: 24px 14px 40px;
            box-sizing: border-box;
            h3{
              font-size: 20px;
              text-align: center;
            }
            .detail-info--wrap{
              margin-top: 14px;
              overflow: hidden;
            }
            .associator__avatar--wrap{
              margin-right: 100px;
              height: 186px;
              .associator__avatar{
                max-width: 100%;
              }
            }
            .base-info{
              float: right;
              width: 100px;
              height: 100%;
              text-align: center;
              p{
                line-height: 2;
                font-size: 12px;
                border-bottom: 1px dashed #ddd;
                margin:0 0 15px 14px;
                &:last-child{
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
      .content-top-right {
        height: 100%;
        margin-left: 10px;
        width: calc(40% - 10px);
        box-sizing: border-box;
        .pie-wrap {
          background-color: transparent;
          box-shadow: none;
        }
        .pie-background {
          background-color: rgba(64, 58, 73, 0.3);
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
        }
        .pie-background__active {
          height: 31%!important;
          min-height: 230px!important;
        }
        .pie-wrap-circle::before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          right: 0px;
          background: url('/static/img/pie-background3.png') no-repeat center center;
          background-size: 168px;
          animation-name: piepie;
          animation-duration: 10000ms;
          animation-iteration-count: infinite; /*无限循环*/
          animation-timing-function: linear;
          @keyframes piepie {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        }
        .bottom-ul {
          height: 100%;
          li:nth-child(1) {
            //height: 44%;
          }
          li:nth-child(2) {
            margin-top: 10px;
            height: calc(100% - 240px);
            box-sizing: border-box;
          }
          li.li--second__child {
            height: calc(69% - 10px);
          }
        }
      }
    }
    .content-top__active {
      height: calc(100% - 30px)!important;
    }
    .content-bottom {
      display: block;
      width: 100%;
      margin-top: 10px;
      height: calc(28% - 10px);
      min-height: 168px;
      box-sizing: border-box;
      padding: 10px 20px;
      background-color: rgba(64, 58, 73, 0.30);
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
      .custom--button__isShow {
        width: 30px;
        height: 20px;
        font-size: 12px;
        color: #0F9EE9;
        cursor: pointer;
        left: calc(50% - 12px);
        top: calc(50% + 64px);
        display: inline-block;
        position: absolute;
      }
    }
    .customer-wrap {
      display: inline-block;
      width: calc(50% - 170px);
      height: 100%;
      overflow: hidden;
      .transition-wrap {
        float: right;
        width: 125%;
        height: 100%;
        overflow: hidden;
        padding: 10px 0;
        box-sizing: border-box;
        .list-customer-item {
          transition: all 1s;
          display: inline-block;
          float: right;
          width: 20%;
          height: 100%;
          padding-right: 10px;
          box-sizing: border-box;
          position: relative;
        }
        /* 保持左右间距对齐 */
        .out-li {
          padding-left: 10px;
          padding-right: 0px;
        }
        .list-customer-enter {
          opacity: 0;
          transform: translateX(100%);
        }
        &.right {
          float: left;
          li {
            float: left;
          }
          .list-customer-enter {
            opacity: 0;
            transform: translateX(-100%);
          }
        }
      }
    }

    .customer-middle {
      width: 320px;
      height: 100%;
      display: inline-block;
      position: relative;
      left: 8px;
      margin-right: 10px; //保持两边的距离优雅
      li {
        display: inline-block;
        height: 100%;
      }

      .customer-middle-top, .customer-middle-bottom {
        width: 40px;
        overflow: hidden;
        background-repeat: no-repeat, no-repeat, no-repeat;
        background-position: 0 center, 10px center, 20px center;
        background-size: 14px auto, 16px auto, 18px auto;

      }
      .customer-middle-top {
        right: 6px;
        background-image: url("/static/img/in-img-3.png"), url("/static/img/in-img-2.png"), url("/static/img/in-img-1.png");
      }
      .customer-middle-center {
        position: absolute;
        width: 230px;
        background: url('/static/img/people-info.png') no-repeat center center;
        background-size: 100% auto;
        > img {
          width: 100%;
        }
      }
      .customer-middle-bottom {
        position: absolute;
        left: 276px;
        background-image: url("/static/img/out-img-1.png"), url("/static/img/out-img-2.png"), url("/static/img/out-img-3.png");
        background-position: 0 center, 12px center, 24px center;
        background-size: 18px auto, 16px auto, 14px auto;
      }

    }
    //动画效果
    .animation-lwh-show {
      position: relative;
      animation-name: skyset;
      animation-duration: 3000ms;
      animation-iteration-count: infinite; /*无限循环*/
      animation-timing-function: linear;
      @keyframes skyset {
        0% {
          opacity: 0.5;
        }
        25% {
          opacity: 0.25;
        }
        75% {
          opacity: 0.75;
        }
        100% {
          opacity: 1;
        }
      }
    }
    .content--bottom__leader {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 38px;
      background: #17151A;
      li {
        position: absolute;
        display: inline-block;
        height: 100%;
        cursor: pointer;
        &:nth-child(1) {

        }
      }
      .bottom--isShow__top, .bottom--isShow__bottom {
        width: 40px;
        overflow: hidden;
        background-repeat: no-repeat, no-repeat, no-repeat;
        background-position: 2px center, 10px center, 17px center;
        background-size: 11px auto, 12px auto, 13px auto;

      }
      .bottom--isShow__top {
        left: 30px;
        background-image: url("/static/img/in-img-3.png"), url("/static/img/in-img-2.png"), url("/static/img/in-img-1.png");
      }
      .bottom--isShow__bottom {
        right: 18px;
        background-image: url(/static/img/out-img-1.png), url(/static/img/out-img-2.png), url(/static/img/out-img-3.png);
        background-position: 0 center, 9px center, 17px center;
        background-size: 13px auto, 12px auto, 11px auto;
      }
      .bottom--isShow__middle {
        left: calc(50% - 7px);
        width: 14px;
        background-repeat: no-repeat;
        background-position: 0 center;
        background-image: url(/static/img/console_icon_is_show.png);
        background-size: 14px;
      }
    }
    //动画效果 - 控制台收
    .animation--console__isShow {
      position: relative;
      animation-name: show;
      animation-duration: 300ms;
      animation-iteration-count: 1; /*无限循环*/
      animation-timing-function: linear;
      @keyframes show {
        0% {
          transform: translateY(100%);
        }
        50% {
          transform: translateY(50%);
        }
        100% {
          transform: translateY(0%);
        }
      }
    }
    //动画效果 - 控制台缩
    .animation--console__isHidden {
      position: relative;
      animation-duration: 3000ms;
      animation-iteration-count: 1; /*无限循环*/
      animation-timing-function: linear;
      @keyframes hidden {
        100%  {
          transform: translateY(-100%);
        }
        50% {
          transform: translateY(-50%);
        }
        0% {
          transform: translateY(0%);
        }
      }
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .fade-visited-enter-active, .fade-visited-leave-active {
      transition: all .3s;
    }
    .fade-visited-enter, .fade-visited-leave-active {
      transform: translateY(100%);
    }
  }
</style>
