<template>
  <div class="developer-api-wrap">
    <header-bar :menuArray="menu" activeName="api">
      <el-button slot="buttons" size="small" type="primary" @click="dialogFormVisible = true" v-if="!loading && (!devInfo || ! devInfo.accessKey)">开发者申请</el-button>
    </header-bar>
    <div class="developer-api-inner">
      <div class="developer-api-header" v-if="(devInfo && devInfo.accessKey)">
        <h3 :class="{fl:!devInfo || !devInfo.accessKey}">开发者信息</h3>
        <div class="developer-detail fs12 clearfix">
          <p>AccessKey：{{devInfo.accessKey}}</p>
          <p>AccessSecret：{{devInfo.accessSecret}}</p>
        </div>
      </div>
      <div :class="['developer-api-container clearfix', {'none': (!devInfo || ! devInfo.accessKey)}]">
        <div class="developer-api-nav">
          <div class="da-nav-item">
            <el-menu
              :default-active="$route.path"
              class="custom__menu--api"
              background-color="rgba(0,0,0,0)"
              text-color="#8A898B"
              :router="true"
              @open="handleMenuOpen"
              @close="handleMenuClose"
              active-text-color="#0F9EE9">
              <el-submenu index="1">
                <template slot="title">
                  <i :class="openMenu.includes('1') ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
                  <span>API入门</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/rule">API通用规则</el-menu-item>
                  <el-menu-item index="/developer/api/common">通用返回值</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i :class="openMenu.includes('2') ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
                  <span>API说明</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/auth">鉴权接口</el-menu-item>
                  <el-menu-item index="/developer/api/community">社群数据</el-menu-item>
                  <el-menu-item index="/developer/api/flow">客流数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/developer/api/code" class="no-children">
                <span slot="title">状态码</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="developer-api-content">
          <el-scrollbar ref="scrollContent" v-scroll-top="$route.path">
            <div class="scroll-inner">
              <div class="total-content">
                <router-view></router-view>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialogOptions.title"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="560px"
    >
      <div class="apply-dialog__body">
        <el-form label-position="left" label-width="100px" :model="applyForm" ref="applyForm" :rules="applyRules">
          <el-form-item label="申请理由: " prop="intro">
            <el-input type="textarea" v-model="applyForm.intro" placeholder="请输入申请理由" auto-complete="off" rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false; $refs.applyForm.resetFields()">取 消</el-button>
        <el-button type="primary" @click="applyDeveloper">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getDevelopeInfo, applyDevelope} from '../../../api/developer'
import HeaderBar from '../components/HeaderBar.vue'

export default {
  name: 'api',
  components: {
    HeaderBar
  },
  data () {
    return {
      menu: [
        { title: '消息通知', name: 'notify' },
        { title: '开放API', name: 'api' }
      ],
      isShow: false,
      devInfo: {},
      applyForm: { // 申请开发者
        intro: '' // 申请原因
      },
      applyRules: {
        intro: [
          { required: true, message: '请输入申请理由', trigger: 'blur' },
          { max: 255, message: '请输入1-255位字符', trigger: 'blur' }
        ]
      },
      dialogOptions: { // 弹窗组件配置信息
        type: 'apply', // 弹窗类型
        title: '开发者申请' // 弹窗标题
      },
      dialogFormVisible: false, // 表单弹窗是否显示
      currentData: [],
      openMenu: ''
    }
  },
  methods: {
    handleMenuOpen (key) {
      this.openMenu = this.openMenu + key
    },
    handleMenuClose (key) {
      this.openMenu = this.openMenu.replace(key)
    },
    // 根据路由显示不同api 文档信息，路由变化时滚动区回到顶部
    routeChange (route) {
      if (route.name === 'apiFaceImg') {
        this.currentData = this.faceImgData
      } else {
        this.currentData = this.tokenData
      }
    },
    // 获取开发者信息 accessKey、accessSecret
    getDeveloperInfo () {
      getDevelopeInfo({ merchantGuid: this.userInfo.uuid }).then(res => {
        this.devInfo = res.data
      })
    },
    // 申请开发者
    applyDeveloper () {
      applyDevelope({
        intro: this.applyForm.intro,
        merchantGuid: this.userInfo.uuid
      }).then(() => {
        this.$message.success('申请成功')
        this.dialogFormVisible = false
        this.getDeveloperInfo()
      }).catch(() => {
        this.dialogFormVisible = false
      })
    }
  },
  mounted () {
    let path = this.$router.history.current.path
    if ((/\w+(\/rule|\/common)$/).test(path)) {
      this.openMenu = '1'
    } else if ((/\w+(\/auth|\/community|\/flow)$/).test(path)) {
      this.openMenu = '2'
    }
    this.getDeveloperInfo()
    this.routeChange(this.$route)
  },
  watch: {
    '$route': function (val) {
      this.getDeveloperInfo()
      this.routeChange(val)
    }
  },
  computed: {
    ...mapState(['loading', 'userInfo'])
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .no-children{
    padding-left: 37px !important;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  .page__title{
    height: 72px;
    line-height: 71px;
    box-sizing: border-box;
    border-bottom: 1px solid #F0F0F0;
    padding-left: 40px;
    font-size: 22px;
  }
  .developer-api-wrap{
    padding: 0!important;
  }
  .apply-dialog__body{
    margin: 20px;
  }
  .developer-api-inner {
    height: calc(100% - 136px);
    /*padding: 0 20px;*/
    .developer-api-header {
      padding: 10px 20px;
      border-top: 1px solid rgba(151, 151, 151, 0.10);
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
          &:last-child {
            margin-right: 0;
          }

        }

      }
    }
    .developer-api-container {
      height: calc(100% - 51px);
      border-top: 1px solid rgba(151, 151, 151, 0.10);
      &.none {
        height: 100%;
      }
      /deep/ .el-menu{
        border: none;
      }
      .developer-api-nav {
        float: left;
        width: 240px;
        height: 100%;
        border-right: 1px dashed rgba(151, 151, 151, 0.10);
        box-sizing: border-box;
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
        margin-left: 240px;
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
            font-size: 16px;
            color: #252525;
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
