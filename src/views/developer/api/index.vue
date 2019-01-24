<template>
  <div class="developer-api-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <div class="developer-api-inner">
      <div class="developer-api-header">
        <h3 :class="{fl:!devInfo || !devInfo.accessKey}">{{(devInfo && devInfo.accessKey) ? '开发者信息': '开发者申请'}}</h3>
        <div class="developer-detail fs12 clearfix">
          <template v-if="devInfo && devInfo.accessKey">
            <p>AccessKey：{{devInfo.accessKey}}</p>
            <p>AccessSecret：{{devInfo.accessSecret}}</p>
          </template>
          <el-button class="affirm medium fr" @click="dialogFormVisible = true" v-if="!loading && (!devInfo || ! devInfo.accessKey)">申请</el-button>
        </div>
      </div>
      <div class="developer-api-container clearfix">
        <div class="developer-api-nav">
          <div class="da-nav-item">
            <el-menu
              :default-active="$route.path"
              class="custom__menu--api"
              background-color="rgba(0,0,0,0)"
              text-color="#8A898B"
              :router="true"
              active-text-color="#0F9EE9">
              <el-submenu index="1">
                <template slot="title">
                  <span>API入门</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/rule">API通用规则</el-menu-item>
                  <el-menu-item index="/developer/api/common">通用返回值</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>API说明</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/auth">鉴权接口</el-menu-item>
                  <el-menu-item index="/developer/api/community">社群数据</el-menu-item>
                  <el-menu-item index="/developer/api/flow">客流数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/developer/api/code">
                <span slot="title">状态码</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="developer-api-content">
          <el-scrollbar ref="scrollContent">
            <div class="scroll-inner">
              <div class="total-content">
                <router-view></router-view>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <ob-dialog-form
      v-model="applyForm"
      @remote-submit="applyDeveloper"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {DeveloperFind} from '../../../api/developer'

export default {
  name: 'api',
  data () {
    return {
      menu: [
        {title: '消息通知', index: '/developer/notify'},
        {title: '开放API', index: '/developer/api'}
      ],
      isShow: false,
      devInfo: {},
      applyForm: { // 申请开发者
        intro: '' // 申请原因
      },
      dialogOptions: { // 弹窗组件配置信息
        type: 'apply', // 弹窗类型
        title: '开发者申请' // 弹窗标题
      },
      dialogFormVisible: false, // 表单弹窗是否显示
      currentData: []
    }
  },
  methods: {
    // 根据路由显示不同api 文档信息，路由变化时滚动区回到顶部
    routeChange (route) {
      this.$refs.scrollContent.wrap.scrollTop = 0
      if (route.name === 'apiFaceImg') {
        this.currentData = this.faceImgData
      } else {
        this.currentData = this.tokenData
      }
    },
    // 获取开发者信息 accessKey、accessSecret
    getDeveloperInfo () {
      DeveloperFind().then(res => {
        this.devInfo = res.data
      })
    },
    // 申请开发者
    applyDeveloper (data) {
      this.$http('/developer/apply', data).then(res => {
        this.$tip('申请成功')
        this.dialogFormVisible = false
        this.getDeveloperInfo()
      }).catch(() => {
        this.dialogFormVisible = false
      })
    }
  },
  mounted () {
    this.getDeveloperInfo()
    this.routeChange(this.$route)
  },
  watch: {
    '$route': function (val) {
      this.routeChange(val)
    }
  },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .developer-api-wrap{
    padding: 0!important;
  }
  .developer-api-inner {
    height: calc(100% - 64px);
    /*padding: 0 20px;*/
    .developer-api-header {
      padding: 10px 20px;
      border-bottom: 1px dashed rgba(151, 151, 151, 0.10);
      background: rgba(255, 255, 255, 0.03);
      > h3 {
        float: left;
        width: 180px;
        font-size: 14px;
        line-height: 30px;
      }
      .developer-detail {
        > p {
          float: left;
          display: inline-block;
          margin-right: 100px;
          min-width: 190px;
          line-height: 30px;
          color: rgba(255,255,255, 0.7);
          &:last-child {
            margin-right: 0;
          }

        }

      }
    }
    .developer-api-container {
      margin-top: 5px;
      height: calc(100% - 72px);
      .developer-api-nav {
        float: left;
        width: 148px;
        height: 100%;
        border-right: 1px dashed rgba(151, 151, 151, 0.10);
        .da-nav-title {
          line-height: 54px;
        }
        .da-nav-items {
          height: 36px;
          line-height: 36px;
          > a {
            color: #fff;
            &.router-link-active {
              color: #0F9EE9;
            }
          }
        }
      }
      .developer-api-content {
        height: calc(100% - 30px);
        margin-left: 148px;
        padding-right: 20px;
        box-sizing: border-box;
        overflow: hidden;
        .el-scrollbar {
          height: 100%;
        }
        .el-scrollbar__wrap {
          width: calc(100% + 17px);
          height: calc(100% + 17px);
          overflow-x: hidden;
        }
        .scroll-inner {
          margin-left: 20px;
        }
        .api-list-item {
          margin-bottom: 28px;
          .des {
            margin-bottom: 10px;
            font-size: 12px;
          }
          .api-list-title {
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .developer-api-container {
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
      /*padding: 10px 30px;*/
    }
  }
</style>
