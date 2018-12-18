<template>
  <div class="general-map" id="general-map">
    <div id="floor">
      <a href="javascript:;" v-for="(item, index) in routerList" :class="{'active': item.id === frame.id}" :key="index" @click="updateFrameArea(item.path, item.id)">
        {{item.name}}
      </a>
    </div>
    <iframe :src="frame.path" :id="frame.id" :name="frame.name" scrolling="no" frameborder="0" width="100%" ref="iframe"></iframe>
    <div id="sideInfo" @mouseenter="maskToggle=true" @mouseleave="maskToggle=false">
      <transition name="fade">
        <div id="sideMask" v-if="!maskToggle"></div>
      </transition>
      <div class="side-box" v-for="(item, index) in personList" :key="index">
        <div class="box-left">
          <div class="name">{{item.name}}</div>
          <div class="info">
            <span class="gender">{{item.gender}}</span>
            <span class="age">{{item.age}}</span>
          </div>
          <div class="time">{{item.time}}</div>
        </div>
        <div class="box-right">
          <img :class="{'glow-border': index === 0}" :src="item.image" alt="">
        </div>
      </div>
    </div>
    <div id="statisticInfo">
      <div class="statistic-box" id="incoming">
        <div class="item">
          <div class="title">进客流</div>
          <div class="data">
            <div class="date today">
              <div class="amount">105000</div>
              <div class="key">今日数据</div>
            </div>
            <div class="date yesterday">
              <div class="amount">100000</div>
              <div class="key">昨日数据</div>
            </div>
          </div>
        </div>
      </div>
      <div class="statistic-box" id="member">
        <div class="item">
          <div class="title">到访会员</div>
          <div class="data">
            <div class="date today">
              <div class="amount">5000</div>
              <div class="key">今日数据</div>
            </div>
            <div class="date yesterday">
              <div class="amount">4000</div>
              <div class="key">昨日数据</div>
            </div>
          </div>
        </div>
      </div>
      <div class="statistic-box" id="current">
        <div class="item">
          <div class="title">商场当前人数</div>
          <div class="data">
            <div class="amount">100000</div>
          </div>
        </div>
      </div>
    </div>
    <div id="option" style="position: absolute;top: 10px; left: 10px">
      <a href="javascript:;" @click="sendColor">传递坐标</a>
    </div>
  </div>
</template>

<script>
import {GetSocketIP} from '@/api/common'
import {mapState} from 'vuex'
export default {
  name: 'GeneralMap',
  data () {
    return {
      maskToggle: false,
      routerList: [
        {name: '总', path: '/static/html/home.html', id: 'threeFrame'},
        {name: 'F7', path: '/static/html/plane.html?floor=' + '10', id: 'threeFrame10'},
        {name: 'F6', path: '/static/html/plane.html?floor=' + '9', id: 'threeFrame9'},
        {name: 'F5', path: '/static/html/plane.html?floor=' + '8', id: 'threeFrame8'},
        {name: 'F4', path: '/static/html/plane.html?floor=' + '7', id: 'threeFrame7'},
        {name: 'F3', path: '/static/html/plane.html?floor=' + '6', id: 'threeFrame6'},
        {name: 'F2', path: '/static/html/plane.html?floor=' + '5', id: 'threeFrame5'},
        {name: 'F1', path: '/static/html/plane.html?floor=' + '4', id: 'threeFrame4'},
        {name: 'B3', path: '/static/html/plane.html?floor=' + '3', id: 'threeFrame3'},
        {name: 'B2', path: '/static/html/plane.html?floor=' + '2', id: 'threeFrame2'},
        {name: 'B1', path: '/static/html/plane.html?floor=' + '1', id: 'threeFrame1'}
      ],
      personList: [
        {name: '张木木', gender: '女', age: '18', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '19', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '20', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '21', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '22', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '23', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'},
        {name: '张木木', gender: '女', age: '12', time: '14:00', image: '/static/UV_Grid_Sm.jpg'}
      ],
      frame: {
        id: 'threeFrame',
        name: 'threeFrame',
        path: '/static/html/home.html'
      },
      iframe: null,
      cloudTimer: null
    }
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    updateFrameArea (path, name) {
      this.$set(this.frame, 'path', path)
      this.$set(this.frame, 'name', name)
      this.$set(this.frame, 'id', name)
    },
    setFrameSize () {
      let frame = document.getElementById(this.frame.name)
      let general = document.getElementById('general-map')
      let sideInfo = document.getElementById('sideInfo')
      let statisticInfo = document.getElementById('statisticInfo')
      let incoming = document.getElementById('incoming')
      let member = document.getElementById('member')
      let current = document.getElementById('current')
      let floor = document.getElementById('floor')
      frame.style.width = general.offsetWidth + 'px'
      frame.style.height = general.parentElement.offsetHeight + 'px'
      sideInfo.style.height = general.parentElement.offsetHeight + 'px'
      statisticInfo.style.width = (general.offsetWidth - 185) + 'px'
      incoming.style.width = (general.offsetWidth - 185) * 4 / 11 + 'px'
      member.style.width = (general.offsetWidth - 185) * 4 / 11 + 'px'
      current.style.width = (general.offsetWidth - 185) * 3 / 11 + 'px'
      floor.style.left = ((general.offsetWidth - 185) - floor.offsetWidth) / 2 + 'px'
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
    },
    /****************************************************
     *********************  发送值  **********************
     ****************************************************/
    // plane：传递色块
    sendColor () {
      let storeInfoArr = [
        {position: 10, logo: 'starbucks.jpg', name: '星一克', count: 5},
        {position: 15, logo: 'starbucks.jpg', name: '星二克', count: 12},
        {position: 20, logo: 'starbucks.jpg', name: '星三克', count: 14},
        {position: 25, logo: 'starbucks.jpg', name: '星四克', count: 20},
        {position: 30, logo: 'starbucks.jpg', name: '星五克', count: 23},
        {position: 35, logo: 'starbucks.jpg', name: '星六克', count: 32},
        {position: 40, logo: 'starbucks.jpg', name: '星七克', count: 34},
        {position: 45, logo: 'starbucks.jpg', name: '星八克', count: 24},
        {position: 50, logo: 'starbucks.jpg', name: '星九克', count: 45},
        {position: 55, logo: 'starbucks.jpg', name: '星十克', count: 50},
        {position: 60, logo: 'starbucks.jpg', name: '星十一克', count: 15},
        {position: 65, logo: 'starbucks.jpg', name: '星十二克', count: 30},
        {position: 70, logo: 'starbucks.jpg', name: '星十三克', count: 6}
      ]
      this.iframe.addColor(storeInfoArr)
    },
    // home：粒子闪烁
    sendAlex () {
      let count = 0
      this.cloudTimer = setInterval(() => {
        this.iframe.createPointCloud(count)
        count++
      }, 100)
    },
    // 悬浮框数据
    sendStoreData () {
      let obj = {
        gateway: 'Gateway',
        camera: [
          'camera-one',
          'camera-two',
          'camera-three'
        ]
      }
      if (this.iframe.receiveStoreInfo) {
        this.iframe.receiveStoreInfo(obj)
      }
    },
    /*************************************************************
     *********************  监听所有message  **********************
     *************************************************************/
    handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case 'change-floor':
          let path = '/static/html/plane.html?floor=' + (parseInt(data.params.data) + 3)
          let name = 'threeFrame' + (parseInt(data.params.data) + 3)
          this.updateFrameArea(path, name)
          break
        case 'post-coordinate':
          // 通过data.params调用接口
          console.log(data.params)
          // 发送单点信息
          this.sendStoreData()
          break
      }
    }
  },
  mounted () {
    this.sendAlex()
    this.setFrameSize()
    this.iframe = this.$refs.iframe.contentWindow
    window.addEventListener('message', this.handleMessage)
    window.addEventListener('resize', this.setFrameSize, false)
  },
  watch: {
    'frame.name': {
      handler (val) {
        if (val === 'threeFrame') {
          this.sendAlex()
        } else {
          clearInterval(this.cloudTimer)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .general-map{
    position: relative;
    #floor{
      position: absolute;
      top: 10px;
      font-size:0;
      a{
        display: inline-block;
        width: 40px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        background: #0F0E11;
        font-size: 14px;
        margin-right: 1px;
        color: #FFFFFF;
        &:hover {
          background: linear-gradient(135deg, rgba(68, 23, 173, 0.6), rgba(17, 105, 211, 0.4));
        }
      }
      .active{
        background: linear-gradient(135deg, rgba(68, 23, 173, 0.6), rgba(17, 105, 211, 0.4));
      }
    }
    #sideInfo{
      position: absolute;
      top: 0;
      right: 0;
      width: 160px;
      height: 100%;
      color: #FFFFFF;
      background: #17151A;
      padding: 15px 20px;
      box-sizing: border-box;
      overflow: hidden;
      #sideMask{
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 100%;
        background: linear-gradient(to bottom, rgba(23,21,26,0), rgba(23,21,26,1));
      }
      .side-box{
        font-size: 12px;
        overflow: hidden;
        margin-bottom: 20px;
        .box-left{
          float: left;
          padding: 8px;
          .name{
            letter-spacing: 1.5px;
          }
          .info{
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 2px;
          }
          .time{
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 2px;
          }
        }
        .box-right{
          float: right;
          border-radius: 25px;
          padding: 10px 5px;
          img{
            width: 46px;
            height: 46px;
            border-radius: 23px;
          }
        }
        .glow-border{
          box-shadow: 0 0 8px 3px #32afcb;
        }
      }
    }
    #statisticInfo{
      position: absolute;
      right: 170px;
      bottom: 10px;
      height: 100px;
      overflow: hidden;
      .statistic-box{
        float: left;
        height: 100px;
        box-sizing: border-box;
        padding-right: 5px;
        &:first-child{
          padding-left: 5px;
        }
        .item{
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(135deg, rgba(68, 23, 173, 0.6), rgba(17, 105, 211, 0.4));
          padding: 10px 20px;
          box-sizing: border-box;
          color: #FFFFFF;
          font-size: 12px;
          overflow: hidden;
          .title{
            margin-bottom: 13px;
          }
          .date{
            float: left;
            .amount{
              font-size: 20px;
              margin-bottom: 3px;
            }
            .key{
              color: rgba(255, 255, 255, 0.5)
            }
          }
          .today{
            margin-right: 59px;
          }
        }
      }
      #current{
        .amount{
          width: 100%;
          text-align: center;
          font-size: 20px;
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
