<template>
  <div>
  <el-menu class="navbar" mode="horizontal">
    <router-link to="/index" class="logo-wrap vam">
      <img src="/static/img/logo.png" alt="">
      <div class="des">
        <h2>线下浏览器服务平台</h2>
        <p>Offline Browser service platform </p>
      </div>
    </router-link>
    <div class="right-menu vam tal">
      <div class="navbar-console" >
        <hamburger class="hamburger-container vam" v-show="showBar" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <router-link to="/console">控制台</router-link>
      </div>
      <div class="navbar-console-select" v-if="$route.name  === 'console-lwh'" @click="getGropId">
        <span>{{selectName}}</span>
      </div>
      <div class="right-menu-item vam">
        <router-link :to="'/index/notify/'+notifState" class="system-notify">
          <uu-icon type="notify" :class="notifState?'notify-have':''" ></uu-icon>
        </router-link>
        <router-link to="/person/center" class="user-info">
          <div class="avatar-wrap" >
            <div class="avatar" :style="{backgroundImage:'url('+avatar+')'}"></div>
          </div>
          <span>{{userInfo.phone?userInfo.phone:userInfo.email}}</span>
        </router-link>
        <a href="javascript:void (0);" class="exit" @click="$exit()">
          <uu-icon type="exit"></uu-icon>
        </a>
      </div>
    </div>
  </el-menu>
    <!-- 选择社群 -->
    <ob-dialog-form ref="dialog"
        @remote-submit="remoteSubmit"
        :type="dialogOptions.type"
        :title="dialogOptions.title"
        :visible.sync="dialogFormVisible">
    </ob-dialog-form>
    <pick-device ref="device"
       @pick-device="pickDeviceHandler"
       :type="'group'"
       :title="'选择设备'"
       :groupId="groupSelectId"
       :visible.sync="dialogDeviceVisible">
    </pick-device>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import PickDevice from '../../console/componets/PickDevice.vue'
import {eventObject} from '@/utils/event.js'
export default {
  components: {
    Hamburger,
    PickDevice
  },
  data(){
    return {
      notifState: false,  //是否有站内消息
      groupSelectId: '',
      selectName: '请选择您的社群',
      dialogFormVisible: false,
      dialogDeviceVisible: false,
      dialogOptions: {
        title: '选择社群',
        type: 'group'
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      "avatar"
    ]),
    ...mapState([
      "userInfo",
      'groupConsoleId'
    ]),
    avatarUrl:{
      get(){
        return this.userInfo.faceImgURL || '/static/img/logo.png';
      },
      set(){
        return this.userInfo.faceImgURL || ''
      }
    },
    showBar(){
      return this.$route.name  !== 'console-lwh'
    }
  },
  watch: {
      $route(to,from){
        if(to.path == "/console") this.selectName = "请选择您的社群";
        if(to.path.indexOf("index/notify") > -1) this.notifyToggle();
      },
      groupConsoleId(val,oldVal) {

      },
    //当消失的时候不记录上次选择
     dialogFormVisible(val,oldVal) {
        if(!val) this.$refs.dialog.setCheckedNodes();
     },
    dialogDeviceVisible(val,oldVal) {
      if(!val) this.$refs.device.resetRadio();
    }
  },
  methods: {
    //只要点击了通知消息就为false
    notifyToggle() {
      this.notifState = false;
    },
    //设备返回数据
    pickDeviceHandler(val) {
      if(val == "上一步") {

        this.dialogFormVisible = true;
      }else {
        this.selectName = val.deviceName;
      }
    },
    //点击选择社群
    getGropId(){
      this.dialogFormVisible = true;
    },
    //获取当前设备
    remoteSubmit(data) {
      if(!data || data.length ==0){
          this.$alert('请选择需要添加社群名称', '提示：', {
          confirmButtonText: '确定'
        });
        return;
      }
      this.groupSelectId = data[0].groupGuid;
      this.$store.commit("SET_GROUP_SELECT_ID",this.groupSelectId);
      this.dialogFormVisible = false;
      window.setTimeout(() => {  //解决闪现
        this.dialogDeviceVisible = true;
      }, 300);
    },
    toggleSideBar() {
      this.$store.dispatch("DISPATCH_SIDEBAR");
      eventObject().$emit('resize-echarts-console', '');  //触发控制台图表重置
      eventObject().$emit('resize-echarts-data', '');  //触发数据可视化图表重置
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  },
  created() {
      //是否有新的消息
      this.$http('/siteNotice/unRead').then(res => {
        if(res.result == 1){
            this.notifState = res.data > 0 ? true : false;
        }
      }).catch(error => {
         console.info(error);
      });
  },
  mounted() {
      eventObject().$on('change', msg => { //eventObject接收事件
        this.dialogFormVisible = true;
      });
  },
  beforeRouteLeave (to, from, next) {
    //路由跳转后，不需要保存控制台群的信息
    this.$store.commit('SET_GROUP_SELECT_ID');
    next();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 70px;
  background-color: #232027;
  box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
  border-radius: 0 !important;
  border: none!important;
  color: #fff;
  .logo-wrap{
    float: left;
    width: 220px;
    height: 70px;
    text-align: center;
    box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
    color:#fff;
    z-index:999;
    background: #232027;
    >img{
      height: 30px;
    }
    .des{
      width: 140px;
      line-height: 1;
      height: 30px;
      text-align: center;
      overflow: hidden;
      >h2{
        font-size:15px;
        line-height: 1.4;
      }
      >p{
        width: 125%;
        font-size: 12px;
        transform-origin: left top;
        transform: scale(0.8);
        *font-size:8px;
      }
    }
  }

  .hamburger-container {
    float: left;
    height: 30px;
    padding: 3px 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    padding: 18px;
    margin-left: 220px;
    height: 100%;
    font-size:14px;
    user-select: none;
    background-image: url("/static/img/main_bg_icon.png");
    box-sizing: border-box;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      float: right;
      display: inline-block;
      margin: 0 8px;
      >a{
        display: inline-block;
        margin: 0 5px;
      }
      .notify-have  {
         position: relative;
         &::before{
            content: '';
            border: 3px solid #F44336;
            border-radius: 50%;
            position: absolute;
            left: 14px
         }
      }
      .user-info{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        .avatar-wrap{
          display: inline-block;
          height: 34px;
          width: 34px;
          border-radius: 50%;
          overflow: hidden;
          background: url("/static/img/avatar_person_bg@1x.png") no-repeat left top;
          background-size: contain;
          vertical-align: middle;
          margin-right: 10px;
          padding: 2px;
          box-sizing: border-box;
          .avatar{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
          }
        }
      }
    }
    .navbar-console {
      line-height: 36px;
        a {
          color: #ffffff;
          position: relative;
        }
        .router-link-active {
            color: #ffffff;
            padding: 0 12px;
        }
        .router-link-active::after {
            content: '';
            background-image: linear-gradient(135deg, #813DC7 5%, #0F9EE9 100%);
            height: 4px;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: -26px;
        }
      }
      .navbar-console-select {
          display: inline-block;
          margin-left: 12px;
          cursor: pointer;
          &::after {
            content: "";
            width:0px;
            height:0px;
            border-right: 8px solid transparent;
            border-left: 8px solid transparent;
            border-top: 8px solid #ffffff;
            top: 14px;
            left: 10px;
            position: relative;
          }
       }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
