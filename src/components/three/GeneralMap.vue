<template>
  <div class="general-map" id="general-map">
    <!--<canvas id="canvas"></canvas>-->
    <div class="map-left">
      <div id="floor2" style="text-align: center">
        <!--<a v-if="currentManage.type !== 3"-->
        <!--href="javascript:;"-->
        <!--:class="{'active': routerList[0].id === frame.id}"-->
        <!--@click="updateFrameArea(routerList[0], 0)"-->
        <!--&gt;总</a>-->
        <switch-bar v-if="!singleStoreTrig" :data="routerList"
                    label="floor"
                    :initial-index="initialIndex"
                    :show-total="currentManage.type !== 3"
                    :max-num="8"
                    style="display: inline-block"
                    @change="updateFrameArea">
        </switch-bar>
        <div v-if="singleStoreTrig" class="single-store-title">
          <span @click="backToFloor">{{singleStoreInfo.floorOrigin}}</span>
          <span>/</span>
          <span>{{singleStoreName}}</span>
        </div>
      </div>
      <div id="iframeWrap">
        <iframe
          :src="frame.path"
          :id="frame.id"
          scrolling="no"
          frameborder="0"
          ref="iframe"
          class="iframe"
        ></iframe>
      </div>
      <div id="statisticInfo">
        <div class="statistic-box" id="incoming">
          <div
            class="item today-item"
          >
            <div class="title">进客流</div>
            <div class="data">
              <div class="date today">
                <div class="amount">
                  <count-to
                    ref="Incoming_Today"
                    :autoplay="false"
                    :startVal="statisticInfo.Incoming_Today"
                    :endVal="statisticEndInfo.Incoming_Today"
                    :duration="1000"
                  ></count-to>
                  <span
                    v-if="statisticInfo.Incoming_Yesterday !== 0"
                    style="position:relative;right:-10px;top:25%; font-size:12px; color: #ff6660"
                  >
                    <img
                      v-if="statisticEndInfo.Incoming_percent >= 0"
                      src="@/assets/public/grow_up@2x.png"
                      alt
                      width="5"
                    >
                    <img
                      v-if="statisticEndInfo.Incoming_percent < 0"
                      src="@/assets/public/grow-down.png"
                      alt
                      width="5"
                    >
                    <span
                      :class="{'red-text': statisticEndInfo.Incoming_percent >= 0, 'green-text': statisticEndInfo.Incoming_percent < 0}">
                      {{Math.abs(statisticEndInfo.Incoming_percent)}}%
                    </span>
                  </span>
                </div>
                <div class="key">今日数据</div>
              </div>
              <div class="date yesterday">
                <div class="amount">
                  <count-to
                    ref="Incoming_Yesterday"
                    :autoplay="false"
                    :startVal="statisticInfo.Incoming_Yesterday"
                    :endVal="statisticEndInfo.Incoming_Yesterday"
                    :duration="1000"
                  ></count-to>
                </div>
                <div class="key">昨日数据</div>
              </div>
            </div>
          </div>
        </div>
        <div class="statistic-box" id="member">
          <div class="item member-item">
            <!-- :class="{'no-background': !statisticEndInfo.Member_Today && !statisticEndInfo.Member_Yesterday}" -->
            <div class="title">到访会员</div>
            <div class="data">
              <div class="date today">
                <div class="amount">
                  <count-to
                    ref="Member_Today"
                    :autoplay="false"
                    :startVal="statisticInfo.Member_Today"
                    :endVal="statisticEndInfo.Member_Today"
                    :duration="1000"
                  ></count-to>
                  <span
                    v-if="statisticInfo.Member_Yesterday !== 0"
                    style="position:relative;right:-10px;top:25%; font-size:12px; color: #ff6660"
                  >
                    <img
                      v-if="statisticEndInfo.Member_percent >= 0"
                      src="@/assets/public/grow_up@2x.png"
                      alt
                      width="5"
                    >
                    <img
                      v-if="statisticEndInfo.Member_percent < 0"
                      src="@/assets/public/grow-down.png"
                      alt
                      width="5"
                    >
                    <span
                      :class="{'red-text': statisticEndInfo.Member_percent >= 0, 'green-text': statisticEndInfo.Member_percent < 0}">
                      {{Math.abs(statisticEndInfo.Member_percent)}}%
                    </span>
                  </span>
                </div>
                <div class="key">今日数据</div>
              </div>
              <div class="date yesterday">
                <div class="amount">
                  <count-to
                    ref="Member_Yesterday"
                    :autoplay="false"
                    :startVal="statisticInfo.Member_Yesterday"
                    :endVal="statisticEndInfo.Member_Yesterday"
                    :duration="1000"
                  ></count-to>
                </div>
                <div class="key">昨日数据</div>
              </div>
            </div>
          </div>
        </div>
        <div class="statistic-box" id="current">
          <div class="item current-item">
            <div class="title">商场当前人数</div>
            <div class="data">
              <div class="amount">
                <count-to
                  ref="Current"
                  :autoplay="false"
                  :startVal="statisticInfo.Current"
                  :endVal="statisticEndInfo.Current"
                  :duration="1000"
                ></count-to>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-right">
      <div id="sideInfo" @mouseenter="maskToggle=true" @mouseleave="maskToggle=false">
        <transition-group name="list-customer" class="transition-wrap right" tag="ul">
          <li class="side-box" :class="{active: item.personGuid}" @click="pushDetail(item)" v-for="(item) in personList"
              :key="item.key">
            <div class="box-left">
              <div class="name">{{item.name}}</div>
              <div class="info">
                <span class="gender">{{item.gender}}</span>
              </div>
              <div class="info">
                <span class="age">{{item.age}}</span>
              </div>
              <div class="time">{{item.appearanceDate}}</div>
            </div>
            <div class="box-right" style="position: relative">
              <div class="img-wrap">
                <img
                  v-if="item.appearanceDate"
                  :src="item.imgUrl"
                  class="glow-border"
                  :class="{'un-member-border': item.name === '---', 'member-border': item.name !== '---'}" alt="">
                <img src="@/assets/public/avatar2.png" alt="" v-else>
                <span class="corner-icon"></span>
              </div>
              <div v-if="item.name && item.name === '---'" class="member-mask"><span
                style="color: #FF6660;margin-right: 3px">●</span> 非会员
              </div>
              <div v-if="item.name && item.name !== '---'" class="member-mask"><span
                style="color: #38DF19;margin-right: 3px">●</span> 会员
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </div>

  </div>
</template>

<script>
import {GetSocketIP} from '@/api/common'
import SwitchBar from '../../components/SwitchBar'
import {mapState} from 'vuex'
import {
  GetMarketList,
  GetGroupPortalInfo,
  GetMemberDetail,
  GetPortalDeviceList,
  GetStoreList
} from '../../api/community'
import {
  GetLatestFace,
  GetFlowRank
} from '../../api/visual'
import {parseTime} from '../../utils'
import CountTo from 'vue-count-to'
const ossPrefix = process.env.OSS_PREFIX
export default {
  name: 'GeneralMap',
  components: {
    CountTo,
    SwitchBar
  },
  data() {
    return {
      maskToggle: false,
      routerList: [
        {
          name: '总',
          path: ossPrefix + '/static/html/new_home.html?timestamp = ' + Number(new Date()),
          id: 'threeFrame',
          floor: 0
        }
      ],
      personList: [
        {imgUrl: '/static/img/avatar2.png', key: '1'},
        {imgUrl: '/static/img/avatar2.png', key: '2'},
        {imgUrl: '/static/img/avatar2.png', key: '4'},
        {imgUrl: '/static/img/avatar2.png', key: '5'},
        {imgUrl: '/static/img/avatar2.png', key: '6'},
        {imgUrl: '/static/img/avatar2.png', key: '7'},
        {imgUrl: '/static/img/avatar2.png', key: '8'},
        {imgUrl: '/static/img/avatar2.png', key: '9'},
        {imgUrl: '/static/img/avatar2.png', key: '10'},
        {imgUrl: '/static/img/avatar2.png', key: '11'},
        {imgUrl: '/static/img/avatar2.png', key: '12'},
        {imgUrl: '/static/img/avatar2.png', key: '13'}
      ],
      personCount: 0,
      floorArr: [],
      community: {
        infoArr: [],
        index: null,
        minus: 0
      },
      frame: {
        path: ossPrefix + '/static/html/new_home.html?timestamp = ' + Number(new Date()),
        id: 'threeFrame'
      },
      statisticInfo: {
        Incoming_Today: 0,
        Incoming_Yesterday: 0,
        Member_Today: 0,
        Member_Yesterday: 0,
        Current: 0
      },
      statisticEndInfo: {
        Incoming_Today: 0,
        Incoming_Yesterday: 0,
        Member_Today: 0,
        Member_Yesterday: 0,
        Current: 0
      },
      singleStoreInfo: {},
      singleStoreTrig: false,
      singleStoreName: '',
      iframe: null,
      cloudTimer: null,
      initialIndex: 0,
      websocket: '' // websocket连接
    }
  },
  computed: {
    ...mapState(['currentManage']),
    originSrc() {
      return ossPrefix || '*'
    }
  },
  methods: {
    // 切换iframe
    updateFrameArea(item, index) {
      this.$set(this.frame, 'path', item.path)
      this.$set(this.frame, 'id', item.id)
      this.community.infoArr.forEach((value, i) => {
        if (value.floor === item.floor) {
          this.community.index = i
          this.$emit('updateCommunity', this.community.infoArr[i])
          this.getLatestFace(item.groupParentGuid, item.groupSonGuid)
          if (this.currentManage.type === 3) {
            this.community.infoArr.forEach((val, inx) => {
              if (val.floor === item.floor) {
                this.iframe.postMessage({
                  type: 'SET_SINGLE_STORE_INFO',
                  floorInfo: [val]
                }, this.originSrc)
              }
            })
          }
        }
      })
    },
    // 获取socket服务地址并建立websocket链接
    getWebsocket(groupSonGuid, groupParentGuid) {
      // 重新建立连接时，先关闭之前已建立的连接
      if (this.websocket) {
        this.websocket.close()
      }
      GetSocketIP().then(res => {
        let _this = this
        let data = {}
        let wsServer = `ws://${res.data}/websocket/${groupSonGuid}_${groupParentGuid}` // 服务器地址
        this.websocket = new WebSocket(wsServer)
        this.websocket.onopen = function (evt) {
          // 已经建立连接
          _this.websocket.send(`${groupSonGuid}_${groupParentGuid}_channel`) // 向服务器发送消息
          console.info('已经连接')
        }
        this.websocket.onmessage = evt => {
          // 如果登录过期则关闭websocket连接
          if (!this.$cookie().get().uniubi || this.$store.state.expired) {
            this.websocket.close()
            return
          }
          try {
            data = JSON.parse(evt.data)
            switch (data.type) {
              case 'SHINING':
                this.handleSocketShining(data.data)
                break
              case 'REAL_TIME_COUNTER':
                this.handleSocketRealCount(data.data)
                break
              case 'FACE':
                this.handleSocketFace(data.data, data.pushDate)
                break
            }
          } catch (err) {
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
    // 处理推送闪点
    handleSocketShining(data) {
      if (data.coordinates) {
        // this.iframe.createShine(data.coordinates, data.floor, data.status)
        this.iframe.postMessage({
          type: 'CREATE_SHINE',
          coordinates: data.coordinates,
          floor: data.floor,
          status: data.status
        }, this.originSrc)
      }
    },
    // 处理推送实时数据
    handleSocketRealCount(data) {
      this.statisticInfo = this.statisticEndInfo
      this.statisticEndInfo = {
        Incoming_Today: data.newIn,
        Incoming_Yesterday: data.oldIn,
        Member_Today: data.newMember,
        Member_Yesterday: data.oldMember,
        Current: data.newIn - data.newOut < 0 ? 0 : Math.abs(data.newIn - data.newOut),
        Incoming_percent: parseInt(((data.newIn - data.oldIn) / data.oldIn) * 100),
        Member_percent: parseInt(((data.newMember - data.oldMember) / data.oldMember) * 100)
      }
      this.changeStatisticInfo('Incoming_Today')
      this.changeStatisticInfo('Incoming_Yesterday')
      this.changeStatisticInfo('Member_Today')
      this.changeStatisticInfo('Member_Yesterday')
      this.changeStatisticInfo('Current')
    },
    // 处理推送人脸
    handleSocketFace(data, time) {
      if (data.memberInfo) {
        this.imgCut(data, time)
        this.handleSocketShining(data)
      }
    },
    imgCut(data, time, arr, index) {
      var img = new Image()
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var dataURL
      canvas.width = 60
      canvas.height = 60
      img.crossOrigin = '*'
      img.src = data.memberInfo.imgUrl
      img.onload = () => {
        // 在给定的坐标的基础上扩大一倍范围
        var upperX = data.rect.upperX - 0 > 60 ? data.rect.upperX - 60 : 0
        var upperY = data.rect.upperY - 0 > 60 ? data.rect.upperY - 60 : 0
        var lowerX = img.width - data.rect.lowerX > 60 ? data.rect.lowerX + 60 : img.width
        var lowerY = img.height - data.rect.lowerY > 60 ? data.rect.lowerY + 60 : img.height
        context.drawImage(img, upperX, upperY, lowerX - upperX, lowerY - upperY, 0, 0, 60, 60)
        dataURL = canvas.toDataURL('image/png')
        // 整理数据推入数组中
        let obj = {
          name: data.memberInfo.type === 'MEMBER' ? data.memberInfo.memberLabelList[0].name : '---',
          age: data.memberInfo.age,
          gender: data.memberInfo.gender === 1 ? '男' : '女',
          appearanceDate: parseTime(time, '{h}:{i}'),
          imgUrl: dataURL,
          key: Math.random(),
          personGuid: data.personGuid
        }
        this.personList.pop()
        this.personList.unshift(obj)
        if (arr && Array.isArray(arr) && arr[index + 1]) {
          let val = arr[index + 1] instanceof Object ? arr[index + 1] : JSON.parse(arr[index + 1])
          this.imgCut(val.data, val.pushDate, arr, index + 1)
        }
      }
    },
    getLatestFace(groupParentGuid, groupSonGuid) {
      GetLatestFace({
        groupGuid: groupParentGuid,
        groupSonGuid: groupSonGuid
      }).then(res => {
        res.data = res.data.filter(item => {
          return new Date(JSON.parse(item).pushDate).toDateString() === new Date().toDateString()
        }).reverse()
        if (res.data.length) {
          let item0 = JSON.parse(res.data[0])
          this.imgCut(item0.data, item0.pushDate, res.data, 0)
        } else {
          this.personList = [
            {imgUrl: '/static/img/avatar2.png', key: '1'},
            {imgUrl: '/static/img/avatar2.png', key: '2'},
            {imgUrl: '/static/img/avatar2.png', key: '4'},
            {imgUrl: '/static/img/avatar2.png', key: '5'},
            {imgUrl: '/static/img/avatar2.png', key: '6'},
            {imgUrl: '/static/img/avatar2.png', key: '7'},
            {imgUrl: '/static/img/avatar2.png', key: '8'},
            {imgUrl: '/static/img/avatar2.png', key: '9'},
            {imgUrl: '/static/img/avatar2.png', key: '10'},
            {imgUrl: '/static/img/avatar2.png', key: '11'},
            {imgUrl: '/static/img/avatar2.png', key: '12'},
            {imgUrl: '/static/img/avatar2.png', key: '13'}
          ]
        }
        this.getWebsocket(groupSonGuid, groupParentGuid)
      })
    },
    getCommunityInfo() {
      if (!this.currentManage.id) {
        return
      }
      GetMarketList({parentId: this.currentManage.id}).then(res => {
        // 整理数据结构, 所有楼层数组
        if (res.data.length) {
          let floorInfo = this.sortRouterList(res.data[0].subGroupSon)
          floorInfo = floorInfo.reverse()
          let allInfo = res.data
          let floorHeight = 140
          delete allInfo[0].subGroupSon
          this.community.infoArr = allInfo.concat(floorInfo)

          // 总楼层添加id信息
          this.routerList[0].groupParentGuid = allInfo[0].groupParentGuid
          this.routerList[0].groupSonGuid = allInfo[0].groupSonGuid
          this.routerList[0].floor = 0

          // 计算地下楼层数量
          this.caculateMinus(this.community.infoArr)
          // 当最低楼层大于1层时, 需计算最低楼层和0层之间的差值
          let minIndex = this.caculateMinusIndex(floorInfo)
          let lowFloor = floorInfo[0].floor < 0 ? Math.abs(floorInfo[0].floor) * floorHeight : 0
          for (let i in floorInfo) {
            // 计算地上楼层和地下楼层的Y坐标
            let upFloorCoordinateY = (floorInfo[i].floor - floorInfo[minIndex].floor - 1) * floorHeight
            let downFloorCoordinateY = (floorInfo[i].floor - 1) * floorHeight

            let coordinateY = floorInfo[i].floor >= 0 ? upFloorCoordinateY + lowFloor : downFloorCoordinateY + lowFloor
            let imgUrl = floorInfo[i].mapUrl
            let floor = floorInfo[i].floor
            // 分别设置routerList和传入iframe的数组
            this.floorArr.push({
              coordinate_y: coordinateY,
              img_url: imgUrl,
              floor: floor,
              groupSonGuid: floorInfo[i].groupSonGuid,
              groupParentGuid: floorInfo[i].groupParentGuid
            })

            this.routerList.push({
              name: floorInfo[i].name,
              id: imgUrl,
              floor: floor,
              path: ossPrefix + '/static/html/plane.html?floor=' + imgUrl,
              groupSonGuid: floorInfo[i].groupSonGuid,
              groupParentGuid: floorInfo[i].groupParentGuid
            })
          }
          this.$emit('updateCommunity', allInfo[0])
          this.getLatestFace(this.routerList[0].groupParentGuid, this.routerList[0].groupSonGuid)
        }
      })
    },
    getSingleCommunityInfo() {
      let params = this.community.infoArr[this.community.index]
      GetGroupPortalInfo({groupSonId: params.groupSonGuid}).then(res => {
        // this.iframe.getCommunityInfo(res.data)
        this.iframe.postMessage({
          type: 'GET_COMMUNITY_INFO',
          data: res.data
        }, this.originSrc)
      })
    },
    // plane：传递色块
    sendColor() {
      let storeInfoArr = []
      let params = this.community.infoArr[this.community.index]
      GetFlowRank({
        type: params.type,
        groupFloor: params.floor,
        groupGuid: params.groupParentGuid
      }).then(res => {
        let groupList = JSON.parse(res.data).group

        groupList.forEach(item => {
          let position = item.coordinates.replace('[', '').replace(']', '')
          // this.transFloat(position)
          storeInfoArr.push({
            floor: item.floor,
            position: position,
            count: item.count,
            name: item.groupName,
            groupSonGuid: item.groupSonGuid
          })
        })

        this.iframe.postMessage({
          type: 'ADD_COLOR',
          data: storeInfoArr
        }, this.originSrc)
      })
    },
    // home：粒子闪烁
    // 悬浮框数据
    sendStoreData() {
    },
    handleMessage(event) {
      const data = event.data
      switch (data.cmd) {
        case 'change-floor':
          this.floorArr.forEach((val, index) => {
            if (val.floor === data.params.floor) {
              let path = ossPrefix + '/static/html/plane.html?floor=' + val.img_url
              let id = val.img_url
              let item = {
                path: path,
                id: id,
                floor: val.floor,
                groupSonGuid: val.groupSonGuid,
                groupParentGuid: val.groupParentGuid
              }
              this.initialIndex = index+1
              this.updateFrameArea(item, index)
            }
          })
          break
        case 'post-coordinate':
          // 通过data.params调用接口
          // 发送单点信息
          this.sendStoreData()
          break
        case 'home-load_signal':
          console.log('receive: home-load_signal')
          this.iframe.postMessage({
            type: 'SET_FLOOR_INFO',
            floorArr: this.floorArr
          }, this.originSrc)
          break
        case 'plane-load_signal':
          this.getSingleCommunityInfo()
          if (this.currentManage.type === 1) {
            this.sendColor()
          }
          break
        case 'single-load_signal_single':
          this.iframe.postMessage({
            type: 'SET_SINGLE_STORE_INFO_SINGLE',
            floorInfo: this.singleStoreInfo
          }, this.originSrc)
          break
        case 'single-load_signal':
          this.iframe.postMessage({
            type: 'SET_SINGLE_STORE_INFO',
            floorInfo: this.community.infoArr
          }, this.originSrc)
          break
        case 'click-single_store':
          // GetMemberDetail({groupSonId: data.params.groupSonGuid}).then(res => {
          // this.singleStoreInfo = res.data
          if (data.params.floor) {
            this.community.infoArr.forEach(val => {
              if (val.floor === data.params.floor) {
                this.singleStoreInfo.imgUrl = val.mapUrl
              }
            })
          } else {
            this.singleStoreInfo.imgUrl = data.params.imgUrl
          }
          if (data.params.coordinates) {
            this.singleStoreInfo.coordinates = data.params.coordinates
          }
          this.singleStoreInfo.personCount = data.params.personCount
          this.singleStoreName = data.params.name
          this.singleStoreInfo.floor = data.params.floor
          this.singleStoreInfo.floorOrigin = data.params.floor > 0 ? 'F' + data.params.floor : 'B' + data.params.floor.toString().charAt(1)
          GetGroupPortalInfo({groupSonId: data.params.groupSonGuid}).then(res => {
            this.singleStoreInfo.deviceInfoArr = res.data
            this.$emit('updateCommunity', this.singleStoreInfo)
            this.frame = {
              path: ossPrefix + '/static/html/single_store.html?timestamp = ' + Number(new Date()),
              id: 'threeFrame'
            }
            this.singleStoreTrig = true
          })
          // })
          break
        case 'get-camera_list':
          GetPortalDeviceList({portalGuid: data.userData.guid}).then(res => {
            this.iframe.postMessage({
              type: 'set-camera_list',
              deviceList: res.data,
              intersect: data.intersect,
              userData: data.userData
            }, this.originSrc)
          })
      }
    },
    backToFloor() {
      for (let i = 0; i < this.routerList.length; i++) {
        if (this.singleStoreInfo.floor === this.routerList[i].floor) {
          this.initialIndex = i
          console.log(i, this.routerList[i])
          this.updateFrameArea(this.routerList[i])
          this.singleStoreTrig = false
        }
      }
    },
    // 计算地下楼层数量
    caculateMinus(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < 0) {
          this.community.minus++
        }
      }
    },
    // 计算最低楼层大于一时的偏差值
    caculateMinusIndex(arr) {
      let minFloor = 1000
      let index = 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < minFloor && arr[i].floor > 0) {
          minFloor = arr[i].floor
          index = i
        }
      }
      return index
    },
    getSingleStoreCommunityInfo (val) {
      this.routerList = []
      if (!val) {
        return
      }
      GetStoreList({parentGuid: val.id}).then(res => {
        for (let i = 0; i < res.data[0].subGroupSon.length; i++) {
          this.routerList.push({
            id: res.data[0].subGroupSon[i].mapUrl,
            name: res.data[0].subGroupSon[i].name,
            path: ossPrefix + '/static/html/single_plane_map.html',
            floor: res.data[0].subGroupSon[i].floor,
            groupSonGuid: res.data[0].subGroupSon[i].groupSonGuid,
            groupParentGuid: res.data[0].subGroupSon[i].groupParentGuid
          })
          this.floorArr.push({
            // img_url: res.data[0].subGroupSon[i].mapUrl,
            img_url: '/static/html/chamahuajie_wudi.png',
            floor: res.data[0].subGroupSon[i].floor,
            groupSonGuid: res.data[0].subGroupSon[i].groupSonGuid,
            groupParentGuid: res.data[0].subGroupSon[i].groupParentGuid
          })
        }
        this.community.infoArr = this.sortRouterList(res.data[0].subGroupSon)
        var allInfo = res.data[0]
        this.community.index = 0
        this.frame = {
          path: ossPrefix + '/static/html/single_plane_map.html',
          id: res.data[0].subGroupSon[0].mapUrl
        }
        this.getLatestFace(this.routerList[0].groupParentGuid, this.routerList[0].groupSonGuid)
        this.$emit('updateCommunity', allInfo)
      })
    },
    // 数组排序
    sortRouterList (arr) {
      if (arr.length <= 1) {
        return arr
      }
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
      return this.sortRouterList(left).concat(
        [pivot],
        this.sortRouterList(right)
      )
    },
    transFloat (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i])
      }
      return arr
    },
    // 设置countTo插件的开始和暂停
    changeStatisticInfo (ref) {
      let oldCount = parseInt(this.statisticInfo[ref])
      let newCount = parseInt(this.statisticEndInfo[ref])
      if (oldCount !== newCount) {
        this.$refs[ref].start()
      } else {
        this.$refs[ref].pause()
      }
    },
    // 进入行为轨迹详情页
    pushDetail (data) {
      if (data.personGuid) {
        this.$router.push(`/behavior/trail/${data.personGuid}`)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleMessage)
    if (this.websocket) {
      this.websocket.close()
    }
  },
  mounted () {
    this.iframe = this.$refs.iframe.contentWindow
    if (this.currentManage.type !== 3) {
      this.getCommunityInfo(this.currentManage)
    } else {
      this.getSingleStoreCommunityInfo(this.currentManage)
      this.initialIndex = 0
    }
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
    currentManage: {
      handler (val) {
        if (Object.keys(val).length) {
          if (val.type !== 3) {
            this.routerList = [
              {name: '总', path: ossPrefix + '/static/html/new_home.html', id: 'threeFrame'}
            ]
            this.floorArr = []
            this.singleStoreTrig = false
            this.frame = {
              path:
              ossPrefix + '/static/html/new_home.html?timestamp = ' + Number(new Date()),
              id: 'threeFrame'
            }
            this.getCommunityInfo(val)
          } else {
            this.getSingleStoreCommunityInfo(val)
          }
          if (this.websocket) {
            this.websocket.close()
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .general-map {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    .map-left {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      background-image: url('../../assets/public/background_im.png');
      background-size: 100% 100%;
      #floor2 {
        top: 10px;
        text-align: center;
        height: 55px;
        padding: 10px;
        box-sizing: border-box;
        a {
          top: -15px;
          position: relative;
          display: inline-block;
          width: 40px;
          height: 40px;
          cursor: pointer;
          line-height: 40px;
          text-align: center;
          background: rgba(255, 255, 255, 0.08);
          font-size: 14px;
          margin-right: 1px;
          color: rgba(255, 255, 255, 0.5);
          &:hover {
            background: rgba(255, 255, 255, 0.16);
            color: #ffffff
          }
        }
        .active {
          background: #0068FC;
          color: #ffffff
        }
      }
      #iframeWrap {
        flex: 1;
        display: flex;
        .iframe {
          width: 100%;
          height: 100%;
        }
      }
      #statisticInfo {
        height: 100px;
        overflow: hidden;
        padding-bottom: 5px;
        .statistic-box:last-child {
          width: 28%;
        }
        .statistic-box {
          float: left;
          height: 100px;
          width: 36%;
          box-sizing: border-box;
          padding-right: 5px;
          position: relative;
          &:first-child {
            padding-left: 5px;
          }
          .item {
            height: 100%;
            border-radius: 4px;
            background: linear-gradient(
                135deg,
                rgba(68, 23, 173, 0.6),
                rgba(17, 105, 211, 0.4)
            );
            padding: 10px 20px;
            box-sizing: border-box;
            color: #ffffff;
            font-size: 12px;
            overflow: hidden;
            .title {
              margin-bottom: 13px;
            }
            .date {
              float: left;
              .amount {
                font-size: 20px;
                margin-bottom: 3px;
              }
              .key {
                color: rgba(255, 255, 255, 0.5);
              }
            }
            .today {
              margin-right: 59px;
            }
            .data {
              .yesterday {
                position: absolute;
                left: 50%;
              }
            }
          }
          .today-item {
            background: #005BC9
          }
          .current-item {
            background: #8563FF
          }
          .member-item {
            background: #109EE9
          }
          .no-background {
            background: rgba(216, 216, 216, 0.05);
          }
        }
        #current {
          .amount {
            width: 100%;
            text-align: center;
            font-size: 20px;
          }
        }
      }
    }
    .map-right {
      width: 166px;
      height: 100%;
      flex: 0 0 166px;
      #sideInfo {
        color: #ffffff;
        background: #101116;
        padding: 5px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        #sideMask {
          z-index: 19;
          position: absolute;
          top: 0;
          left: 0;
          width: 166px;
          height: 100%;
          background: linear-gradient(
              to bottom,
              rgba(22, 20, 25, 0),
              rgb(22, 20, 25) 100%
          );
        }
        .list-customer-enter {
          opacity: 0;
          transform: translateY(-100%);
        }
        .side-box {
          float: left;
          font-size: 12px;
          /*clear: both;*/
          margin-bottom: 20px;
          transition: all 1s;
          &.active {
            cursor: pointer;
          }
          .box-left {
            float: left;
            padding: 12px 8px;
            width: 57px;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .name {
              letter-spacing: 1.5px;
              margin-bottom: 3px;
            }
            .info {
              color: rgba(255, 255, 255, 0.5);
              margin-bottom: 5px;
              letter-spacing: 2px;
            }
            .time {
              color: rgba(255, 255, 255, 0.5);
              margin-bottom: 3px;
              letter-spacing: 2px;
            }
          }
          .box-right {
            float: right;
            border-radius: 25px;
            margin: 10px 5px;
            img {
              width: 86px;
              height: 86px;
              border-radius: 3px;
              border: none;
            }
            .img-wrap {
              position: relative;
              @mixin base-block {
                content: '';
                position: absolute;
                display: block;
                width: 12px;
                height: 12px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                z-index: 99;
              }
              &:after {
                @include base-block;
                top: 0;
                left: 0;
                border-bottom: none;
                border-right: none;
              }
              &:before {
                @include base-block;
                top: 0;
                right: 0;
                border-bottom: none;
                border-left: none;
              }
              .corner-icon {
                &:after {
                  @include base-block;
                  bottom: 2px;
                  left: 0;
                  border-top: none;
                  border-right: none;
                }
                &:before {
                  @include base-block;
                  bottom: 2px;
                  right: 0;
                  left: auto;
                  border-top: none;
                  border-left: none;
                }
              }
            }
            .member-border {
              box-shadow: 0 0 10px 3px #429321;
            }
            .un-member-border {
              box-shadow: 0 0 10px 3px rgba(157, 189, 206, 1);
            }
            .member-mask {
              width: 100%;
              height: 20px;
              position: absolute;
              bottom: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(23, 21, 26, 0.5);
            }
          }
          .glow-border {
            /*box-shadow: 0 0 10px 3px #719CF5;*/
          }
        }
      }
    }

    .single-store-title {
      height: 55px;
      line-height: 55px;
      font-size: 16px;
      span {
        &:first-child {
          color: #777674;
          margin-right: 5px;
          cursor: pointer;
        }
        &:last-child {
          margin-left: 5px;
        }
      }

    }

    .red-text {
      color: #ff6660
    }
    .green-text {
      color: #7ED321
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }
  }
</style>
