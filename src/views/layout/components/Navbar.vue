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
        <div class="navbar-console">
          <hamburger
            class="hamburger-container vam"
            v-show="showBar"
            :toggleClick="toggleSideBar"
            :isActive="sidebar.opened"></hamburger>
        </div>
        <div class="navbar-console-select" v-if="$route.name  === 'console-lwh'" @click="dialogFormVisible = true">
          <span>{{selectName}}</span>
        </div>
        <div class="right-menu-item vam">
          <uu-icon type="help" @click.native="helpDialogVisible = true"></uu-icon>
          <router-link :to="'/index/notify/'+notifState" class="system-notify">
            <uu-icon type="notify" :class="notifState?'notify-have':''"></uu-icon>
          </router-link>
          <router-link to="/person" class="user-info">
            <div class="avatar-wrap">
              <div class="avatar vam">
                <img :src="avatar" alt="">
              </div>
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
    <console-dialog :visible.sync="dialogFormVisible">
      <div class="dialog__item--wrap">
        <div class="dialog__item--title">
          <h3>选择社群</h3>
          <i class="el-icon-close" @click="dialogFormVisible = false"></i>
        </div>
        <div class="dialog__item--content">
          <div class="fl">
            <ob-group-nav
              ref="consoleGroup"
              @current-change="handleChange"
              :show-checkbox="true"
              node-key="uniqueKey"
              is-disabled
              theme="white"
              type="custom"
            ></ob-group-nav>
          </div>
          <div class="fl">
            <el-scrollbar>
            <el-radio-group v-model="deviceInfo">
              <el-radio
                v-for="(val,index) in deviceList"
                :label="val"
                :key="index">{{val['deviceName']}}</el-radio>
            </el-radio-group>
            </el-scrollbar>
          </div>
        </div>
        <div class="dialog__item--footer">
          <el-button class="affirm" :disabled="!deviceList.length" @click="getDeviceDetail">确定</el-button>
        </div>
      </div>
    </console-dialog>
    <el-dialog
      width="660px"
      top="calc(50vh - 170px)"
      :show-close="false"
      title="欢迎使用线下浏览器服务平台"
      :visible.sync="helpDialogVisible"
      custom-class="help__dialog--wrap"
    >
      <div class="dialog__content">
        <p>平台使用指引：</p>
        <div class="step__item">
          <h3>第1步：创建社群</h3>
          <p class="item--supply">（可选：管理员社群创建成员社群/成员社群加入其它管理员社群等）</p>
        </div>
        <div class="step__item">
          <h3>第2步：添加设备并关联社群</h3>
        </div>
        <div class="step__item">
          <h3>第3步（可选）：创建人员库并导入人员</h3>
        </div>
        <div class="step__item">
          <h3>第4步：完成，查看数据</h3>
        </div>
      </div>
      <div class="dialog__footer tac mt24">
        <el-button class="affirm" @click="helpDialogVisible = false">收起</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Hamburger from '@/components/Hamburger'
import Group from '@/components/group-nav'
// import PickDevice from '../../console/componets/PickDevice.vue'
import {eventObject} from '@/utils/event.js'
import ConsoleDialog from '@/components/console'
export default {
  components: {
    Hamburger,
    Group,
    // PickDevice,
    ConsoleDialog
  },
  data () {
    return {
      deviceInfo: '', // 设备信息
      deviceList: [], // 设备列表
      notifState: false, // 是否有站内消息
      groupSelectId: '',
      selectName: '请选择您的社群',
      dialogFormVisible: false, // 选择社群弹框显示状态
      helpDialogVisible: false, // 操作指导提示框 显示状态
      dialogOptions: {
        title: '选择社群',
        type: 'group'
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    ...mapState([
      'userInfo',
      'groupConsoleId'
    ]),
    avatarUrl: {
      get () {
        return this.userInfo.faceImgURL || '/static/img/logo.png'
      },
      set () {
        return this.userInfo.faceImgURL || ''
      }
    },
    showBar () {
      return this.$route.name !== 'console-lwh'
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/console') this.selectName = '请选择您的社群'
      if (to.path.indexOf('index/notify') > -1) this.notifyToggle()
    },
    // 当消失的时候不记录上次选择
    dialogFormVisible (val) {
      if (!val) {
        if (this.$refs.consoleGroup) {
          this.$nextTick(() => {
            this.$refs.consoleGroup.setCurrentKey()
            // 清空已选择状态
            this.$refs.consoleGroup.setCheckedKeys([])
          })
        }
        this.deviceList = []
      }
    }
  },
  methods: {
    // 只要点击了通知消息就为false
    notifyToggle () {
      this.notifState = false
    },
    // 获取当前设备
    remoteSubmit (data) {
      if (!data || data.length === 0) {
        this.$tip('请选择您的社群', 'error')
        return
      }
      this.groupSelectId = data[0].groupGuid
      this.$store.commit('SET_GROUP_SELECT_ID', this.groupSelectId)
      this.dialogFormVisible = false
    },
    toggleSideBar () {
      this.$store.dispatch('DISPATCH_SIDEBAR')
      eventObject().$emit('resize-echarts-console', '') // 触发控制台图表重置
      eventObject().$emit('resize-echarts-data', '') // 触发数据可视化图表重置
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    // 选取社群时回调，获取社群下设备列表并展示
    handleChange (val) {
      console.log('current ---', val)
      this.deviceInfo = ''
      this.$http('/group/device', {
        guid: val.groupGuid,
        tag: 'console'
      }).then(res => {
        this.deviceList = res.data || []
        if (!this.deviceList.length) this.$tip('该社群下暂时没有设备可以添加')
      }).catch(error => {
        console.info(error)
      })
    },
    // 获取设备详细信息 （商户综合信息、设备推送信息）
    getDeviceDetail () {
      if (!this.deviceInfo) {
        this.$tip('请选择您的设备', 'error')
        return
      }
      this.dialogFormVisible = false
      this.selectName = this.deviceInfo.deviceName
      this.$store.commit('SET_GROUP_CONSOLE_ID', this.deviceInfo.deviceKey)
    }
  },
  created () {
    // 是否有新的消息
    this.$http('/siteNotice/unRead').then(res => {
      this.notifState = res.data > 0
    }).catch(error => {
      console.info(error)
    })
  },
  mounted () {
    eventObject().$on('change', msg => { // eventObject接收事件
      this.dialogFormVisible = true
    })
  },
  beforeRouteLeave (to, from, next) {
    // 路由跳转后，不需要保存控制台群的信息
    this.$store.commit('SET_GROUP_SELECT_ID')
    next()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 1010;
    background-color: #232027;
    box-shadow: 3px 3px 5px 0 rgba(1, 7, 17, 0.60);
    border-radius: 0 !important;
    border: none !important;
    color: #fff;
    .logo-wrap {
      float: left;
      width: 220px;
      height: 70px;
      text-align: center;
      box-shadow: 3px 3px 5px 0 rgba(1, 7, 17, 0.60);
      color: #fff;
      z-index: 999;
      background: #232027;
      > img {
        height: 30px;
      }
      .des {
        width: 140px;
        line-height: 1;
        height: 30px;
        text-align: center;
        overflow: hidden;
        > h2 {
          font-size: 15px;
          line-height: 1.4;
        }
        > p {
          width: 132%;
          font-size: 12px;
          transform-origin: left top;
          transform: scale(0.74);
          *font-size: 8px;
        }
      }
    }

    .hamburger-container {
      float: left;
      height: 30px;
      padding: 3px 10px;
    }
    .breadcrumb-container {
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
      font-size: 14px;
      user-select: none;
      background-image: url("/static/img/main_bg_icon.png");
      box-sizing: border-box;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        float: right;
        display: inline-block;
        margin: 0 8px;
        > * {
          display: inline-block;
          margin: 0 8px;
        }
        .notify-have {
          position: relative;
          &::before {
            content: '';
            border: 3px solid #F44336;
            border-radius: 50%;
            position: absolute;
            left: 14px
          }
        }
        .user-info {
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          color: #fff;
          .avatar-wrap {
            display: inline-block;
            height: 34px;
            width: 34px;
            border-radius: 50%;
            overflow: hidden;
            background: url("/static/img/avatar_person_bg@1x.png") no-repeat left top;
            background-size: contain;
            vertical-align: middle;
            margin-right: 10px;
            padding: 3px;
            box-sizing: border-box;
            .avatar {
              height: 100%;
              width: 100%;
              border-radius: 50%;
              overflow: hidden;
              >img{
                max-width: 100%;
                height: 100%;
              }
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
          width: 0;
          height: 0;
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
      .international {
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
  .dialog__item--wrap{
    display: inline-block;
    float: left;
    width: 500px;
    height: 538px;
    background: #fff;
    border-radius: 5px;
    .dialog__item--title{
      position: relative;
      overflow: hidden;
      padding: 30px 0 12px;
      text-align: center;
      > h3{
        font-size: 16px;
      }
      .el-icon-close{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .dialog__item--content{
      width: 400px;
      height: 404px;
      padding: 15px 0;
      margin: 0 auto;
      background:  #F8F8F8;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      .ob-group-nav{
        padding: 0;
        padding-left: 20px;
      }
      >div{
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        &:first-child{
          border-right: 1px dashed #ddd;
        }
        &:last-child{
          text-align: center;
        }
      }
      .el-scrollbar{
        height: 100%;
      }
      .el-radio{
        display: block;
        overflow: hidden;
        height: 16px;
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0;
        }
        +.el-radio{
          margin-left: 0;
        }
      }
    }
    .dialog__item--footer{
      margin-top: 15px;
      text-align: center;
    }
    &:nth-child(2){
      margin-left: 20px
    }
  }
</style>
<style lang="scss">
.dialog__item--content{
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .ob-group-nav[type=custom]{
    .el-tree{
      padding-right: 0;
    }
  }
  >div{
    &:last-child{
      .el-scrollbar__view{
        min-height: 100%;
        &:after{
          display: inline-block;
          content: '';
          min-height: 374px;
          width: 0;
          vertical-align: middle;
        }
        .el-radio-group{
          max-width: 80%;
        }
      }
    }
  }
}
.dialog__item--footer{
  .is-disabled{
    background: #CBCBCB;
    box-shadow: none;
    &:hover{
      background: #CBCBCB;
    }
  }
}
.help__dialog--wrap{
  border-radius: 2px;
  overflow: hidden;
  .el-dialog__header{
    padding: 12px;
    text-align: center;
    font-size: 16px;
    background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
    border-radius: 2px;
    .el-dialog__title{
      color: #fff;
    }
  }
  .dialog__content{
    color: #191919;
    > p {
      font-size: 14px;
      text-align: center;
    }
    .item--supply{
      font-size: 12px;
      color: #B4B4B7;
    }
    .step__item{
      margin: 10px 0;
      padding-left: 120px;
      h3{
        font-size: 16px;
      }
      .item--supply{
        padding-left: 50px;
      }
    }
  }
}
</style>
