<template>
  <div class="general-map" id="general-map">
    <!--<canvas id="canvas"></canvas>-->
    <div class="map-left">
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
          <div class="item today-item">
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
                      :class="{'red-text': statisticEndInfo.Incoming_percent >= 0, 'green-text': statisticEndInfo.Incoming_percent < 0}"
                    >{{Math.abs(statisticEndInfo.Incoming_percent)}}%</span>
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
                      :class="{'red-text': statisticEndInfo.Member_percent >= 0, 'green-text': statisticEndInfo.Member_percent < 0}"
                    >{{Math.abs(statisticEndInfo.Member_percent)}}%</span>
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
          <li
            class="side-box"
            :class="{active: item.personGuid}"
            @click="pushDetail(item)"
            v-for="(item) in personList"
            :key="item.key"
          >
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
                  :class="{'un-member-border': item.name === '---', 'member-border': item.name !== '---'}"
                  alt
                >
                <img src="@/assets/public/avatar2.png" alt v-else>
                <!-- <span class="corner-icon"></span> -->
              </div>
              <div v-if="item.name && item.name === '---'" class="member-mask">
                <span style="color: #FF6660;margin-right: 3px">●</span> 非会员
              </div>
              <div v-if="item.name && item.name !== '---'" class="member-mask">
                <span style="color: #38DF19;margin-right: 3px">●</span> 会员
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSocketIP } from "@/api/common";
import FloorBar from "../../components/FloorBar";
import { mapState } from "vuex";
import {
  GetMarketList,
  GetGroupPortalInfo,
  GetPortalDeviceList,
  GetStoreList
} from "../../api/community";
import { GetLatestFace, GetFlowRank } from "../../api/visual";
import { parseTime } from "../../utils";
import CountTo from "vue-count-to";
const ossPrefix = process.env.BASE_URL;
export default {
  name: "GeneralMap",
  components: {
    CountTo,
    FloorBar
  },
  data() {
    return {
      maskToggle: false,
      page: {
        path: ossPrefix + "static/map-scene/index.html?mode=0&time=" + Number(new Date()),
        // path: "http://localhost:8080?mode=0&time=" + Number(new Date()),
        id: "map",
        floor: 0
      },
      personList: Array(13).fill({ imgUrl: "/static/img/avatar2.png", key: 1 }),
      frame: {
        path: ossPrefix + "static/map-scene/index.html?mode=0&time=" + Number(new Date()),
        // path: "http://localhost:8080?mode=0&time=" + Number(new Date()),
        id: "threeFrame"
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
      iframe: null,
      cloudTimer: null,
      websocket: "" // websocket连接
    };
  },
  computed: {
    ...mapState(["currentManage"]),
    originSrc() {
      return "*";
    }
  },
  methods: {
    getMapData() {
      const MapData = [
        {
          floor: 1,
          url: "./static/10.svg",
          name: "F10"
        },
        {
          floor: 2,
          url: "./static/11.svg",
          name: "F11"
        },
        {
          floor: 3,
          url: "./static/12.svg",
          name: "F12"
        },
        {
          floor: 4,
          url: "./static/yintai2.svg",
          name: "F13",
          gateArr: [
            {
              logo: "/static/camera-inside.png"
            }
          ]
        }
      ];
      this.iframe.postMessage({
        cmd: "map_data",
        data: MapData
      }, '*');
    },
    getColorData (floor) {
      let data = [
        { meshNo: 10, floor: floor, colorType: floor }
      ]
      this.iframe.postMessage({
        cmd: "color_data",
        data: data
      }, '*')
    },
    // 获取socket服务地址并建立websocket链接
    getWebsocket(groupSonGuid, groupParentGuid) {
      // 重新建立连接时，先关闭之前已建立的连接
      if (this.websocket) {
        this.websocket.close();
      }
      GetSocketIP().then(res => {
        let data = {};
        let wsServer = `ws://${
          res.data
        }/websocket/${groupSonGuid}_${groupParentGuid}`; // 服务器地址
        this.websocket = new WebSocket(wsServer);
        this.websocket.onopen = () => {
          // 已经建立连接
          this.websocket.send(`${groupSonGuid}_${groupParentGuid}_channel`); // 向服务器发送消息
          console.info("已经连接");
        };
        this.websocket.onmessage = evt => {
          // 如果登录过期则关闭websocket连接
          if (!this.$cookie().get().uniubi || this.$store.state.expired) {
            this.websocket.close();
            return;
          }
          try {
            data = JSON.parse(evt.data);
          } catch (err) {
            console.error(err);
          }
        };
        this.websocket.onclose = () => {
          console.info("已经关闭连接");
        };
        this.websocket.onerror = () => {
          console.info("产生异常");
        };
      });
    },
    imgCut(data, time, arr, index) {
      var img = new Image();
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var dataURL;
      canvas.width = 60;
      canvas.height = 60;
      img.crossOrigin = "*";
      img.src = data.memberInfo.imgUrl;
      img.onload = () => {
        // 在给定的坐标的基础上扩大一倍范围
        var upperX = data.rect.upperX - 0 > 60 ? data.rect.upperX - 60 : 0;
        var upperY = data.rect.upperY - 0 > 60 ? data.rect.upperY - 60 : 0;
        var lowerX =
          img.width - data.rect.lowerX > 60 ? data.rect.lowerX + 60 : img.width;
        var lowerY =
          img.height - data.rect.lowerY > 60
            ? data.rect.lowerY + 60
            : img.height;
        context.drawImage(
          img,
          upperX,
          upperY,
          lowerX - upperX,
          lowerY - upperY,
          0,
          0,
          60,
          60
        );
        dataURL = canvas.toDataURL("image/png");
        // 整理数据推入数组中
        let obj = {
          name:
            data.memberInfo.type === "MEMBER"
              ? data.memberInfo.memberLabelList[0].name
              : "---",
          age: data.memberInfo.age,
          gender: data.memberInfo.gender === 1 ? "男" : "女",
          appearanceDate: parseTime(time, "{h}:{i}"),
          imgUrl: dataURL,
          key: Math.random(),
          personGuid: data.personGuid
        };
        this.personList.pop();
        this.personList.unshift(obj);
        if (arr && Array.isArray(arr) && arr[index + 1]) {
          let val =
            arr[index + 1] instanceof Object
              ? arr[index + 1]
              : JSON.parse(arr[index + 1]);
          this.imgCut(val.data, val.pushDate, arr, index + 1);
        }
      };
    },
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case "home-load_signal":
          this.getMapData()
          break;
        case "to_single":
          this.getColorData(data.data)
          break;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
    if (this.websocket) {
      this.websocket.close();
    }
  },
  mounted() {
    this.iframe = this.$refs.iframe.contentWindow;
    window.addEventListener("message", this.handleMessage);
  },
  watch: {
    "frame.name": {
      handler(val) {
        if (val === "threeFrame") {
          // this.sendAlex()
        } else {
          clearInterval(this.cloudTimer);
        }
      },
      deep: true
    },
    currentManage: {
      handler(val) {
        if (Object.keys(val).length) {
          if (val.type !== 3) {
            this.singleStoreTrig = false;
            this.frame = {
              path: ossPrefix + "static/map-scene/index.html?mode=0&time=" + Number(new Date()),
              // path: "http://localhost:8080?mode=0&time=" + Number(new Date()),
              id: "threeFrame"
            };
          } else {
          }
          if (this.websocket) {
            this.websocket.close();
          }
        }
      },
      deep: true
    }
  }
};
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
          color: #ffffff;
        }
      }
      .active {
        background: #0068fc;
        color: #ffffff;
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
      height: 180px;
      overflow: hidden;
      padding-bottom: 5px;
      .statistic-box:last-child {
        width: 28%;
      }
      .statistic-box {
        float: left;
        height: 180px;
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
          background: #222336;
        }
        .current-item {
          background: #222336;
        }
        .member-item {
          background: #222336;
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
              // content: '';
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
    color: #ff6660;
  }
  .green-text {
    color: #7ed321;
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
