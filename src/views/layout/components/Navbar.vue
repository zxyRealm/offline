<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo-wrap vam">
      <img src="/static/img/logo.png" alt="">
      <div class="des">
        <h2>线下浏览器服务平台</h2>
        <p>Offline Browser service platform </p>
      </div>
    </div>
    <!--<breadcrumb class="breadcrumb-container"></breadcrumb>-->
    <div class="right-menu vam tal">
      <div class="navbar-console" >
        <hamburger class="hamburger-container vam" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <router-link to="/console">控制台</router-link>
      </div>
      <div class="navbar-console-select" v-if="$route.name  == 'console-lwh'" @click="getGropId">
        <span>{{seelctName}}</span>
      </div>
      <div class="right-menu-item vam">
        <router-link :to="'/index/notify/'+notifState" class="system-notify" >
          <uu-icon type="notify" :class="notifState?'notify-have':''"></uu-icon>
        </router-link>
        <router-link to="/developer/info" class="user-info">
          <div class="avatar-wrap" >
            <div class="avatar" :style="{backgroundImage:'url('+avatarUrl+')'}"></div>
          </div>
          <span>{{userInfo.phone}}</span>
        </router-link>
        <a href="javascript:void (0);" class="exit" @click="$exit()">
          <uu-icon type="exit"></uu-icon>
        </a>
      </div>
    </div>
    <!-- 选择社群 -->
     <ob-dialog-form
      @remote-submit="remoteSubmit"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
    <pick-device
     @pick-device="pickDeviceHandler"
      :type="'group'"
      :title="'选择设备'"
      :groupId="groupSelectId"
      :visible.sync="dialogDeviceVisible">
    </pick-device>
  </el-menu>
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
      seelctName: '请选择您的社群',
      dialogFormVisible: false,
      dialogDeviceVisible: false,
      dialogOptions: {
        title: '添加社群',
        type: 'group'
      },
      avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
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
    }
  },
  watch: {
      groupConsoleId(val,oldVal) {

      }
  },
  methods: {
    pickDeviceHandler(val) {
      if(val == "上一步") {
          this.dialogFormVisible = true;
      }else {
        console.info(val,'选中设备信息');
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
      this.seelctName = data[0].groupNickName;
      this.groupSelectId = data[0].groupGuid;
      this.dialogFormVisible = false;
      this.dialogDeviceVisible = true;
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
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
      console.info(eventObject());
      eventObject().$on('change', msg => { //eventObject接收事件
        console.info(msg,"msg");
        this.dialogFormVisible = true;
      });
  },
  beforeRouteLeave (to, from, next) {

    next();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  /*line-height: 70px;*/
  background-color: #232027;
  box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
  border-radius: 0 !important;
  border: none!important;
  color: #fff;
  .logo-wrap{
    float:left;
    width: 220px;
    height: 100%;
    text-align: center;
    box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
    color:#fff;
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
        a {
          color: #ffffff;
          color: #ffffff;
          position: relative;
          top: 18px;
        }
        .router-link-active {
            color: #ffffff;
            position: relative;
            top: 18px;
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
