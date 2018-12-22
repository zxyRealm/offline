 <template>
  <div class="general-map" id="general-map">
    <div class="map-left">
      <div id="floor2">
        <a href="javascript:;" v-for="(item, index) in routerList" :class="{'active': item.id === frame.id}" :key="index" @click="updateFrameArea(item, index)">
          {{item.name}}
        </a>
      </div>
      <div id="iframeWrap">
        <iframe :src="frame.path" :id="frame.id" :name="frame.name" scrolling="no" frameborder="0" ref="iframe" class="iframe"></iframe>
      </div>
      
      <div id="statisticInfo"> 
        <div class="statistic-box" id="incoming">
          <div class="item" :class="{'no-background': !statisticInfo.Incoming_Today && !statisticInfo.Incoming_Yesterday}">
            <div class="title">进客流</div>
            <div class="data">
              <div class="date today">
                <div class="amount">{{statisticInfo.Incoming_Today}}</div>
                <div class="key">今日数据</div>
              </div>
              <div class="date yesterday">
                <div class="amount">{{statisticInfo.Incoming_Yesterday}}</div>
                <div class="key">昨日数据</div>
              </div>
            </div>
          </div>
        </div>
        <div class="statistic-box" id="member">
          <div class="item" :class="{'no-background': !statisticInfo.Member_Today && !statisticInfo.Member_Yesterday}">
            <div class="title">到访会员</div>
            <div class="data">
              <div class="date today">
                <div class="amount">{{statisticInfo.Member_Today}}</div>
                <div class="key">今日数据</div>
              </div>
              <div class="date yesterday">
                <div class="amount">{{statisticInfo.Member_Yesterday}}</div>
                <div class="key">昨日数据</div>
              </div>
            </div>
          </div>
        </div>
        <div class="statistic-box" id="current">
          <div class="item" :class="{'no-background': !statisticInfo.Current}">
            <div class="title">商场当前人数</div>
            <div class="data">
              <div class="amount">{{statisticInfo.Current}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-right">
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
          <div class="time">{{item.appearanceDate}}</div>
        </div>
        <div class="box-right">
          <img :class="{'glow-border': index === 0 && personList.length > 10}" :src="item.imgUrl" alt="">
        </div>
      </div>
    </div>
    </div>
  
    <!-- <div id="option" style="position: absolute;top: 10px; left: 10px">
      <a href="javascript:;" @click="sendColor">传递坐标</a>
    </div> -->
  </div>
</template>

<script>
import {GetSocketIP} from '@/api/common'
import {mapState} from 'vuex'
import {GetMarketList, GetGroupPortalInfo} from '@/api/community'
export default {
  name: 'GeneralMap',
  data () {
    return {
      maskToggle: false,
      routerList: [
        {name: '总', path: '/static/html/home.html', id: 'threeFrame'}
      ],
      personList: [
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'},
        {imgUrl: '/static/avatar2.png'}
      ],
      floorArr: [],
      community: {
        infoArr: [],
        index: null,
        minus: 0
      },
      frame: {
        id: 'threeFrame',
        name: 'threeFrame',
        path: '/static/html/home.html'
      },
      statisticInfo: {
        Incoming_Today: 10,
        Incoming_Yesterday: 0,
        Member_Today: 0,
        Member_Yesterday: 0,
        Current: 0
      },
      iframe: null,
      cloudTimer: null,
      websocket: '' // websocket连接
    }
  },
  computed: {
    ...mapState(['currentManage'])
  },
  beforeDestroy () {
    if (this.websocket) {
      this.websocket.close()
    }
  },
  methods: {
    updateFrameArea (item, index) {
      this.$set(this.frame, 'path', item.path)
      this.$set(this.frame, 'name', item.id)
      this.$set(this.frame, 'id', item.id)
      this.community.index = index + 1
      this.$emit('updateCommunity', this.community.infoArr[this.community.index])
    },
    timestampToTime (timestamp) {
      let date = new Date(timestamp)
      let h = date.getHours() + ':'
      let m = date.getMinutes()
      return h + m
    },
    // 获取socket服务地址并建立websocket链接
    getWebsocket (groupSonGuid, groupParentGuid) {
      GetSocketIP().then(res => {
        let _this = this
        let data = {}
        let wsServer = `ws://192.168.1.153:8010/websocket/${groupSonGuid}_${groupParentGuid}` // 服务器地址
        this.websocket = new WebSocket(wsServer)
        this.websocket.onopen = function (evt) {
          // 已经建立连接
          _this.websocket.send(`${groupSonGuid}_${groupParentGuid}_channel`) // 向服务器发送消息
          console.info('已经连接')
        }
        this.websocket.onmessage = (evt) => {
          console.log('push message', JSON.parse(evt.data))
          data = JSON.parse(evt.data)
          if (data.data.coordinates && data.type === 'SHINING') {
            this.iframe.createPointCloud(data.data.coordinates, data.data.floor)
          }
        }
        this.websocket.onclose = function (evt) {
          console.info('已经关闭连接')
        }
        this.websocket.onerror = function (evt) {
          console.info('产生异常')
        }
      })
    },
    getCommunityInfo (val) {
      GetMarketList({parentId: 88}).then(res => {
        let floorInfo = this.sortRouterList(res.data[0].subGroupSon)
        let allInfo = res.data
        delete allInfo[0].subGroupSon
        this.community.infoArr = allInfo.concat(floorInfo)
        this.caculateMinus(this.community.infoArr)
        for (let i in floorInfo) {
          let obj = {
            name: floorInfo[i].name,
            id: floorInfo[i].floor + this.community.minus + 1
          }
          if (floorInfo[i].floor >= 0) {
            this.floorArr.push(floorInfo[i].floor * 65 - 130)
            obj.path = '/static/html/plane.html?floor=' + (floorInfo[i].floor + this.community.minus)
          } else {
            this.floorArr.push(floorInfo[i].floor * 65 - 65)
            obj.path = '/static/html/plane.html?floor=' + (floorInfo[i].floor + this.community.minus + 1)
          }
          this.routerList.push(obj)
        }
        this.$emit('updateComunity', allInfo[0])
        this.getWebsocket(res.data[0].groupSonGuid, res.data[0].groupParentGuid)
      })
    },
    getSingleCommunityInfo () {
      let params = this.community.infoArr[this.community.index]
      GetGroupPortalInfo({groupSonId: params.groupSonId}).then(res => {
        this.iframe.getCommunityInfo(res.data)
      })
    },
    // 排序
    sortRouterList (arr) {
      if (arr.length <= 1) { return arr }
      let pivotIndex = Math.floor(arr.length / 2)
      let pivot = arr.splice(pivotIndex, 1)[0]
      let left = []
      let right = []
      for (let i=0; i<arr.length; i++) {
        if (arr[i].floor < pivot.floor) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      }
      return this.sortRouterList(left).concat([pivot], this.sortRouterList(right))
    },
    caculateMinus (arr) {
      for (let i=0; i<arr.length; i++) {
        if (arr[i].floor < 0) {
          this.community.minus++
        }
      } 
    },
    /****************************************************
     *********************  发送值  **********************
     ****************************************************/
    // plane：传递色块
    sendColor () {
      let storeInfoArr = [
        {position: 10, logo: 'starbucks.jpg', name: '星克', count: 5},
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
      }, 1000)
    },
    // 悬浮框数据
    sendStoreData () {
      let obj = {
        gateway: 'Gateway',
        camera: [ 'camera-one', 'camera-two', 'camera-three' ]
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
          console.log(data.params.data)
          let currentFloor = ''
          this.floorArr.forEach((val, index) => {
            if (val === data.params.data){
              let path = '/static/html/plane.html?floor=' + parseInt(val/65+5)
              let name = 'threeFrame' + parseInt(val/65+5)
              let item = {
                path: path,
                name: name
              }
              this.updateFrameArea(item, index)
            }
          })
          
          break
        case 'post-coordinate':
          // 通过data.params调用接口
          console.log(data.params)
          // 发送单点信息
          this.sendStoreData()
          break
        case 'home-load_signal':
          this.iframe.setFloorInfo(this.floorArr)
          break
        case 'plane-load_signal':
          this.getSingleCommunityInfo()
          break
      }
    }
  },
  mounted () {
    this.iframe = this.$refs.iframe.contentWindow
    window.addEventListener('message', this.handleMessage)
  },
  watch: {
    'frame.name': {
      handler (val) {
        if (val === 'threeFrame') {
          // this.sendAlex()
        } else {
          clearInterval(this.cloudTimer)
        }
      },
      deep: true
    },
    'currentManage': {
       handler (val) {
        if (val) {
          this.getCommunityInfo(val)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .general-map{
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    .map-left{
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      #floor2{
        top: 10px;
        text-align: center;
        height: 55px;
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
      #iframeWrap {
        flex:1;
        display: flex;
        .iframe{
          width: 100%
        }
      }
      #statisticInfo{
      height: 100px;
      overflow: hidden;
      .statistic-box:last-child{
        width: 28%
      }
      .statistic-box{
        float: left;
        height: 100px;
        width: 36%;
        box-sizing: border-box;
        padding-right: 5px;
        position: relative;
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
          .data{
            .yesterday{
              position: absolute;
              left: 50%;
            }
          }
        }
        .no-background{
          background: rgba(216, 216, 216, 0.05)
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
    }
    .map-right{
      width: 160px;
      flex: 0 0 160px;
      #sideInfo{
    
      color: #FFFFFF;
      background: #232027;
      padding: 15px 20px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      #sideMask{
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 100%;
        background: linear-gradient(to bottom, rgba(35, 32, 39, 0), rgb(35, 32, 39));
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
    }
    
    
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
