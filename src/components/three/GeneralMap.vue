 <template>
  <div class="general-map" id="general-map">
    <div class="map-left">
      <div id="floor2">
        <a
          href="javascript:;"
          v-for="(item, index) in routerList"
          :class="{'active': item.id === frame.id}"
          :key="index"
          @click="updateFrameArea(item, index)"
        >{{item.name}}</a>
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
            class="item"
            :class="{'no-background': !statisticEndInfo.Incoming_Today && !statisticEndInfo.Incoming_Yesterday}"
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
                      src="/static/img/grow_up@2x.png"
                      alt
                      width="5"
                    >
                    <img
                      v-if="statisticEndInfo.Incoming_percent < 0"
                      src="/static/img/grow_down.png"
                      alt
                      width="5"
                    >
                    <span>{{Math.abs(statisticEndInfo.Incoming_percent)}}%</span>
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
          <div
            class="item"
            :class="{'no-background': !statisticEndInfo.Member_Today && !statisticEndInfo.Member_Yesterday}"
          >
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
                      src="/static/img/grow_up@2x.png"
                      alt
                      width="5"
                    >
                    <img
                      v-if="statisticEndInfo.Member_percent < 0"
                      src="/static/img/grow_down.png"
                      alt
                      width="5"
                    >
                    <span>{{Math.abs(statisticEndInfo.Member_percent)}}%</span>
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
          <div class="item" :class="{'no-background': !statisticEndInfo.Current}">
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
        <transition name="fade">
          <div id="sideMask" v-if="!maskToggle"></div>
        </transition>
        <transition-group name="list-customer" class="transition-wrap right" tag="ul">
          <li class="side-box" v-for="(item, index) in personList" v-bind:key="item.key">
            <div class="box-left">
              <div class="name">{{item.name}}</div>
              <div class="info">
                <span class="gender">{{item.gender}}</span>
                <span class="age">{{item.age}}</span>
              </div>
              <div class="time">{{item.appearanceDate}}</div>
            </div>
            <div class="box-right">
              <img
                :class="{'glow-border': index === 0 && personList.length > 10}"
                :src="item.imgUrl"
                alt
              >
            </div>
          </li>
        </transition-group>
      </div>
    </div>

    <!-- <div id="option" style="position: absolute;top: 10px; left: 10px">
      <a href="javascript:;" @click="sendColor">传递坐标</a>
    </div>-->
  </div>
</template>

<script>
import { GetSocketIP } from "@/api/common";
import { mapState } from "vuex";
import { GetMarketList, GetGroupPortalInfo } from "@/api/community";
import { GetFlowRank } from "@/api/index";
import CountTo from "vue-count-to";
export default {
  name: "GeneralMap",
  components: {
    CountTo
  },
  data() {
    return {
      maskToggle: false,
      routerList: [
        {
          name: "总",
          path: "/static/html/new_home.html?timestamp = " + Number(new Date()),
          id: "threeFrame",
          floor: 0
        }
      ],
      personList: [
        { imgUrl: "/static/avatar2.png", key: "1" },
        { imgUrl: "/static/avatar2.png", key: "2" },
        { imgUrl: "/static/avatar2.png", key: "4" },
        { imgUrl: "/static/avatar2.png", key: "5" },
        { imgUrl: "/static/avatar2.png", key: "6" },
        { imgUrl: "/static/avatar2.png", key: "7" },
        { imgUrl: "/static/avatar2.png", key: "8" },
        { imgUrl: "/static/avatar2.png", key: "9" },
        { imgUrl: "/static/avatar2.png", key: "10" },
        { imgUrl: "/static/avatar2.png", key: "11" },
        { imgUrl: "/static/avatar2.png", key: "12" },
        { imgUrl: "/static/avatar2.png", key: "13" }
      ],
      personCount: 0,
      floorArr: [],
      community: {
        infoArr: [],
        index: null,
        minus: 0
      },
      frame: {
        path: "/static/html/new_home.html?timestamp = " + Number(new Date()),
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
    ...mapState(["currentManage"])
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
  },
  methods: {
    updateFrameArea(item, index) {
      this.$set(this.frame, "path", item.path);
      this.$set(this.frame, "id", item.id);
      this.community.infoArr.forEach((value, i) => {
        if (value.floor === item.floor) {
          this.community.index = i;
          this.$emit("updateCommunity", this.community.infoArr[i]);
          this.websocket.close();
          this.getWebsocket(item.groupSonGuid, item.groupParentGuid);
        }
      });
    },
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let h = date.getHours() + ":";
      let m = date.getMinutes();
      return h + m;
    },
    // 获取socket服务地址并建立websocket链接
    getWebsocket(groupSonGuid, groupParentGuid) {
      GetSocketIP().then(res => {
        let _this = this;
        let data = {};
        let wsServer = `ws://192.168.1.153:8010/websocket/${groupSonGuid}_${groupParentGuid}`; // 服务器地址
        this.websocket = new WebSocket(wsServer);
        this.websocket.onopen = function(evt) {
          // 已经建立连接
          _this.websocket.send(`${groupSonGuid}_${groupParentGuid}_channel`); // 向服务器发送消息
          console.info("已经连接");
        };
        this.websocket.onmessage = evt => {
          try {
            // console.log("push message", JSON.parse(evt.data));
            data = JSON.parse(evt.data);
            if (data.data.coordinates && data.type === "SHINING") {
              this.iframe.createShine(data.data.coordinates, data.data.floor);
            } else if (data.data && data.type === "REAL_TIME_COUNTER") {
              this.statisticInfo = this.statisticEndInfo;
              this.statisticEndInfo = {
                Incoming_Today: data.data.newIn,
                Incoming_Yesterday: data.data.oldIn,
                Member_Today: data.data.newMember,
                Member_Yesterday: data.data.oldMember,
                Current: data.data.newIn - data.data.newOut,
                Incoming_percent: parseInt(
                  ((data.data.newIn - data.data.oldIn) / data.data.oldIn) * 100
                ),
                Member_percent: parseInt(
                  ((data.data.newMember - data.data.oldMember) /
                    data.data.oldMember) *
                    100
                )
              };
              this.changeStatisticInfo("Incoming_Today");
              this.changeStatisticInfo("Incoming_Yesterday");
              this.changeStatisticInfo("Member_Today");
              this.changeStatisticInfo("Member_Yesterday");
              this.changeStatisticInfo("Current");
            } else if (data.data.memberInfo && data.type === "FACE") {
              this.imgCut(data.data);
            }
          } catch (err) {}
        };
        this.websocket.onclose = function(evt) {
          console.info("已经关闭连接");
        };
        this.websocket.onerror = function(evt) {
          console.info("产生异常");
        };
      });
    },
    changeStatisticInfo(ref) {
      if (
        parseInt(this.statisticInfo[ref]) !==
        parseInt(this.statisticEndInfo[ref])
      ) {
        this.$refs[ref].start();
      } else {
        this.$refs[ref].pause();
      }
    },
    formatDate(now) {
      if (now) {
        now = new Date(now);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour =
          now.getHours().toString().length === 1
            ? "0" + now.getHours().toString()
            : now.getHours();
        var minute =
          now.getMinutes().toString().length === 1
            ? "0" + now.getMinutes().toString()
            : now.getMinutes();
        var second = now.getSeconds();
        return hour + ":" + minute;
      } else {
        return "00:00";
      }
    },
    imgCut(data) {
      var img = new Image();
      let key = data.memberInfo.imgUrl;
      var canvas = document.createElement("canvas");
      canvas.width = 60;
      canvas.height = 60;
      var context = canvas.getContext("2d");
      var dataURL;
      
      img.crossOrigin = "*";
      img.src = data.memberInfo.imgUrl;
      img.onload = () => {
        var upperX = data.rect.upperX - 0 > 60 ? data.rect.upperX-60 : 0
        var upperY = data.rect.upperY - 0 > 60 ? data.rect.upperY-60 : 0;
        var lowerX = img.width - data.rect.lowerX > 60 ? data.rect.lowerX+60 : img.width;
        var lowerY = img.height - data.rect.lowerY > 60 ? data.rect.lowerY+60 : img.height;
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
        let obj = {
          name:
            data.memberInfo.type === "MEMBER"
              ? data.memberInfo.memberLabelList[0].name
              : "非会员",
          age: data.memberInfo.age,
          gender: data.memberInfo.gender === 1 ? "男" : "女",
          appearanceDate: this.formatDate(data.memberInfo.appearanceDate),
          imgUrl: dataURL,
          key: key
        };
        this.personList.pop();
        this.personList.unshift(obj);
      };
    },
    getCommunityInfo() {
      if (!this.currentManage.id) {
        return;
      }
      GetMarketList({ parentId: this.currentManage.id }).then(res => {
        let floorInfo = this.sortRouterList(res.data[0].subGroupSon);
        let allInfo = res.data;
        let floorHeight = 140;
        delete allInfo[0].subGroupSon;
        this.community.infoArr = allInfo.concat(floorInfo);
        this.routerList[0].groupParentGuid = allInfo[0].groupParentGuid;
        this.routerList[0].groupSonGuid = allInfo[0].groupSonGuid;
        this.caculateMinus(this.community.infoArr);
        let minIndex = this.caculateMinusIndex(floorInfo);
        for (let i in floorInfo) {
          let coordinate_y =
            floorInfo[i].floor >= 0
              ? (floorInfo[i].floor - 2) * floorHeight -
                (floorInfo[minIndex].floor - 1) * floorHeight
              : (floorInfo[i].floor - 1) * floorHeight;
          let img_url = floorInfo[i].mapUrl;
          let floor = floorInfo[i].floor;
          this.floorArr.push({
            coordinate_y: coordinate_y,
            img_url: img_url,
            floor: floor,
            groupSonGuid: floorInfo[i].groupSonGuid,
            groupParentGuid: floorInfo[i].groupParentGuid
          });
          let obj = {
            name: floorInfo[i].name,
            id: img_url,
            floor: floor,
            groupSonGuid: floorInfo[i].groupSonGuid,
            groupParentGuid: floorInfo[i].groupParentGuid
          };
          obj.path = "/static/html/plane.html?floor=" + img_url;
          this.routerList.push(obj);
        }
        this.$emit("updateCommunity", allInfo[0]);
        this.getWebsocket(
          res.data[0].groupSonGuid,
          res.data[0].groupParentGuid
        );
      });
    },
    getSingleCommunityInfo() {
      let params = this.community.infoArr[this.community.index];
      GetGroupPortalInfo({ groupSonId: params.groupSonGuid }).then(res => {
        this.iframe.getCommunityInfo(res.data);
      });
    },
    // 排序
    sortRouterList(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      let pivotIndex = Math.floor(arr.length / 2);
      let pivot = arr.splice(pivotIndex, 1)[0];
      let left = [];
      let right = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < pivot.floor) {
          right.push(arr[i]);
        } else {
          left.push(arr[i]);
        }
      }
      return this.sortRouterList(left).concat(
        [pivot],
        this.sortRouterList(right)
      );
    },
    caculateMinus(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < 0) {
          this.community.minus++;
        }
      }
    },
    caculateMinusIndex(arr) {
      let minFloor = 1000;
      let index = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].floor < minFloor && arr[i].floor > 0) {
          minFloor = arr[i].floor;
          index = i;
        }
      }
      return index;
    },
    /****************************************************
     *********************  发送值  **********************
     ****************************************************/
    // plane：传递色块
    sendColor() {
      let storeInfoArr = [];
      let params = this.community.infoArr[this.community.index];
      GetFlowRank({
        groupFloor: params.floor,
        groupGuid: params.groupParentGuid
      }).then(res => {
        let groupList = JSON.parse(res.data).group;
        groupList.forEach(item => {
          let position = item.coordinates.replace("[", "").replace("]", "");
          // this.transFloat(position)
          storeInfoArr.push({
            position: position,
            count: item.count,
            name: item.groupName
          });
        });
        this.iframe.addColor(storeInfoArr);
      });
    },
    transFloat(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i]);
      }
      return arr;
    },
    // home：粒子闪烁
    sendAlex() {
      let count = 0;
      this.cloudTimer = setInterval(() => {
        this.iframe.createPointCloud(count);
      }, 1000);
    },
    // 悬浮框数据
    sendStoreData() {
      let obj = {
        gateway: "Gateway",
        camera: ["camera-one", "camera-two", "camera-three"]
      };
      if (this.iframe.receiveStoreInfo) {
        this.iframe.receiveStoreInfo(obj);
      }
    },
    /*************************************************************
     *********************  监听所有message  **********************
     *************************************************************/
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case "change-floor":
          let currentFloor = "";
          this.floorArr.forEach((val, index) => {
            if (val.coordinate_y === data.params.data) {
              let path = "/static/html/plane.html?floor=" + val.img_url;
              let id = val.img_url;
              let item = {
                path: path,
                id: id,
                floor: val.floor,
                groupSonGuid: val.groupSonGuid,
                groupParentGuid: val.groupParentGuid
              };
              this.updateFrameArea(item, index);
            }
          });
          break;
        case "post-coordinate":
          // 通过data.params调用接口
          console.log(data.params);
          // 发送单点信息
          this.sendStoreData();
          break;
        case "home-load_signal":
          this.iframe.setFloorInfo(this.floorArr);
          break;
        case "plane-load_signal":
          this.getSingleCommunityInfo();
          this.sendColor();
          break;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
    this.websocket.close();
  },
  mounted() {
    this.iframe = this.$refs.iframe.contentWindow;
    this.getCommunityInfo();
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
        if (val) {
          console.log(val);
          if (this.websocket) {
            this.websocket.close();
            this.statisticInfo = {
              Incoming_Today: 0,
              Incoming_Yesterday: 0,
              Member_Today: 0,
              Member_Yesterday: 0,
              Current: 0
            };
            this.statisticEndInfo = {
              Incoming_Today: 0,
              Incoming_Yesterday: 0,
              Member_Today: 0,
              Member_Yesterday: 0,
              Current: 0
            };
          }
          this.routerList = [
            { name: "总", path: "/static/html/new_home.html", id: "threeFrame" }
          ];
          this.floorArr = [];
          this.frame = {
            path:
              "/static/html/new_home.html?timestamp = " + Number(new Date()),
            id: "threeFrame"
          };
          this.getCommunityInfo(val);
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
      // background: #17151a;
      padding: 10px;
      box-sizing: border-box;
      a {
        display: inline-block;
        width: 40px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        background: #0f0e11;
        font-size: 14px;
        margin-right: 1px;
        color: #ffffff;
        &:hover {
          background: linear-gradient(
            135deg,
            rgba(68, 23, 173, 0.6),
            rgba(17, 105, 211, 0.4)
          );
        }
      }
      .active {
        background: linear-gradient(
          135deg,
          rgba(68, 23, 173, 0.6),
          rgba(17, 105, 211, 0.4)
        );
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
      // background: #17151a;
      padding-bottom: 5px;
      // box-sizing: border-box;
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
    width: 160px;
    height: 100%;
    flex: 0 0 160px;
    #sideInfo {
      color: #ffffff;
      background: #101116;
      padding: 15px;
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
        font-size: 12px;
        overflow: hidden;
        margin-bottom: 20px;
        transition: all 1s;
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
            margin-bottom: 3px;
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
          padding: 10px 5px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 5px;
          }
        }
        .glow-border {
          box-shadow: 0 0 8px 3px #32afcb;
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
