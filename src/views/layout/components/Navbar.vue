<template>
  <div class="common__nav--wrap">
    <span
      v-show="isFullScreen"
      class="iconfont icon-suoxiao"
      @click="changeScreen"></span>
    <div
      v-show="!isFullScreen"
      class="navbar"
      :class="{'console__nav': $route.name === 'console-lwh'}">
      <router-link to="/index" class="logo-wrap vam" :class="{'hide-sidebar': hideSidebar}">
        <img src="@/assets/public/logo.png" alt="">
        <div class="des" v-show="!hideSidebar">
          <h2>线下浏览器服务平台</h2>
          <p>Offline Browser service platform </p>
        </div>
      </router-link>
      <div class="right-menu vam tal" :class="{'hide-sidebar': hideSidebar}">
        <span
          class="iconfont icon-kongzhitai"
          :class="{'hide': !sidebar.opened}"
          @click="toggleSideBar"></span>
        <span
          v-show="$route.name === 'index-lwh'"
          class="iconfont"
          :class="isFullScreen ? 'icon-suoxiao' : 'icon-fangda'"
          @click="changeScreen"></span>
        <button-select
          ref="buttonSelect"
          value-key="groupGuid"
          placeholder="添加社群"
          v-model="manageGroup">
          <button-select-item
            v-for="(item,$index) in manageList"
            :value="item"
            :key="$index"
            :label="item.name"
          >
            <span class="ellipsis max-width" style="float: left">{{ item.name }}</span>
            <uu-icon v-if="item.type === 1" type="role01"></uu-icon>
            <uu-icon v-if="item.type === 2" type="role02"></uu-icon>
            <uu-icon v-if="item.type === 3" type="role03"></uu-icon>
          </button-select-item>
          <el-button slot="footer" @click="addNewGroup" class="affirm _full">添加社群</el-button>
        </button-select>
        <div class="right-menu-item vam">
          <a href="javascript:void(0);"
             :class="{'flicker-animation': showAnimation}"
             @click="helpDialogVisible = true">帮助</a>
          <router-link to="/developer">开发者中心</router-link>
          <router-link :to="'/index/notify/' + notifState" class="system-notify">
            <span class="iconfont icon-xiaoxi" :class="{'notify-have': notifState}"></span>
          </router-link>
          <el-dropdown @command="handleCommand">
            <img class="avatar pointer" width="26" :src="avatar" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user">
                <i class="iconfont icon-zhanghuguanli"></i>
                {{userInfo.phoneNumber || '13145697895'}}
              </el-dropdown-item>
              <el-dropdown-item command="change">
                <i class="iconfont icon-xiugaimima"></i>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="exit">
                <i class="iconfont icon-tongyong-tuichudenglutubiao"></i>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!--操作指导弹框-->
    <el-dialog
      width="660px"
      top="calc(50vh - 170px)"
      :show-close="false"
      :close-on-click-modal="false"
      title="欢迎使用线下浏览器服务平台"
      :visible.sync="helpDialogVisible"
      custom-class="help__dialog--wrap"
    >
      <div class="dialog__content">
        <p class="g-mb22">平台使用指引：</p>
        <div class="step__item">
          <h3>第1步：创建社群及相关出入口</h3>
          <p class="item--supply">（可选：管理员社群创建成员社群/成员社群加入其它管理员社群等）</p>
        </div>
        <div class="step__item">
          <h3>第2步：添加设备并关联至出入口</h3>
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


    <!--修改密码-->

    <el-dialog
      title="修改密码"
      width="560px"
      :visible.sync="passwordFormVisible">
      <el-form
        ref="passwordForm"
        label-width="80px"
        class="dialog__form--wrap w-360"
        :rules="passwordRules"
        :model="passwordForm">
        <el-form-item prop="password" label="旧密码">
          <el-input
            v-model.trim="passwordForm.password"
            placeholder="请输入原密码"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            v-model.trim="passwordForm.newPassword"
            placeholder="请输入新密码"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="重复密码">
          <el-input
            v-model.trim="passwordForm.confirmPassword"
            placeholder="请再次输入新密码"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer g-center">
        <el-button @click="passwordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPasswordForm('passwordForm')">修 改</el-button>
      </div>
    </el-dialog>


    <!--添加新社群-->
    <ob-dialog-form
      width="600px"
      :show-close="showClose"
      :close-on-click-modal="false"
      custom-class="el-dialog--pd0"
      :show-button="false"
      title="请根据实际情况创建一个社群"
      :visible.sync="addFormVisible"
    >
      <div class="create__community--content" slot="content">
        <div class="cc__item">
          <div class="icon--wrap" @click="showAddForm(1)">
            <img src="@/assets/community/market_icon@2x.png" alt="">
            <p>商场</p>
          </div>
          <p class="c-grey fs12">可包含单店，如：银泰商城</p>
        </div>

        <div class="cc__item disabled">
          <div class="icon--wrap" @click="showAddForm(2)">
            <img src="@/assets/community/chain_icon@2x.png" alt="">
            <p>连锁总店</p>
          </div>
          <p class="c-grey fs12">可包含单店，如：屈臣氏总店</p>
        </div>

        <div class="cc__item">
          <div class="icon--wrap" @click="showAddForm(3)">
            <img src="@/assets/community/single_icon@2x.png" alt="">
            <p>单个门店</p>
          </div>
          <p class="c-grey fs12">如：银泰商城下的屈臣氏</p>
        </div>

      </div>
    </ob-dialog-form>

    <!--添加商场社群成功确认弹框-->
    <ob-dialog-form
      title="已添加成功，下方是自动生成的邀请码"
      :visible.sync="addCommunitySuccess"
      :showButton="false"
    >
      <div slot="content" class="affirm__content--warp">
        <span>{{communityCode}}</span>
        <p class="c-grey tc">
          通过邀请码，可以邀请下属门店加入到您创建的社群，您可在社群详情中查看该邀请码
        </p>
      </div>
    </ob-dialog-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { eventObject } from '@/utils/event'
import { OssSignature, FirstLogin, NoticeReadState } from '@/api/common'
import { CheckGroupNameExist, AddNewCommunity, getManageList } from '@/api/community'
import { validateRule, validPhone } from '@/utils/validate'
import { parseTime, fileTypeAllow, IntToFloor } from '@/utils'
import { exitLogin } from '@/api/account'
import axios from 'axios'
import { load } from '@/utils/request'
import FloorSelect from '@/components/FloorSelect'
import ButtonSelect from '@/components/button-select'
import ButtonSelectItem from '@/components/button-select/button-select-item'

const ossPrefix = process.env.BASE_URL
export default {
  components: {
    FloorSelect,
    ButtonSelect,
    ButtonSelectItem
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          CheckNameExist({ name: value }).then(res => {
            !res.data ? callback() : callback(new Error('社群名称已存在'))
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    const validateContact = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback()
      }
    }
    return {
      clientHeight: '',
      addCommunitySuccess: false,
      communityCode: '',
      handleCommunityType: 1,
      addCommunityVisible: false, // 添加社群表单弹框
      addFormVisible: false, // 添加弹框
      communityRules: {
        name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请获取社群邀请码', trigger: 'blur' }
        ],
        pca: [
          { required: true, message: '请选择地区', trigger: ['blur'] }
        ],
        floorList: [
          { required: true, type: 'array', message: '请选取楼层', trigger: 'blur' }
        ],
        contact: [
          { validator: validateContact, trigger: 'blur' }
        ],
        rule: [
          { required: true, type: 'array', message: '请选择索权范围', trigger: 'blur' }
        ],
        phone: [
          { validator: validPhone, trigger: 'blur' }
        ]
      },
      fileList: [], // 上传的文件列表
      groupList: [], // 社群列表信息
      deviceInfo: '', // 设备信息
      deviceList: [], // 设备列表
      notifState: false, // 是否有站内消息
      groupSelectId: '',
      showAnimation: false, // 是否展示闪烁动画
      timer: null, // 闪烁动画展示时间定时器
      selectName: '请选择您的社群',
      helpDialogVisible: false, // 操作指导提示框 显示状态
      dialogOptions: {
        title: '选择社群',
        type: 'group'
      },
      manageGroup: { // 当前管理层社群
      },
      manageList: [],
      showClose: true, // 是否显示关闭按钮
      loadModule: null, // 加载中遮罩层
      labelList: [], // 选取楼层后对应的要上传的文件列表
      passwordFormVisible: false,
      passwordForm: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        password: [
          { required: true }
        ],
        newPassword: [
          { required: true }
        ],
        confirmPassword: [
          { required: true }
        ]
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
        return this.userInfo.faceImgURL || ossPrefix + 'static/img/logo.png'
      },
      set () {
        return this.userInfo.faceImgURL || ''
      }
    },
    hideSidebar () {
      return !this.$store.state.app.sidebar.opened
    },
    showBar () {
      return this.$route.name !== 'console-lwh'
    },
    communityDialogTitle () {
      let title
      switch (this.handleCommunityType) {
        case 1:
          title = '添加商场'
          break
        case 2:
          title = '添加门店'
          break
        case 3:
          title = '添加连锁总店'
          break
      }
      return title
    },
    isFullScreen () { // 当前是否全屏状态 (17 为浏览器默认滚动条宽度)
      let status = Math.abs(window.screen.height - this.clientHeight) <= 23
      eventObject().$emit('CHANGE_FULL_STATUS', status)
      return status
    }
  },
  watch: {
    manageGroup: {
      handler (val) {
        if (val) {
          this.$store.commit('SET_CURRENT_MANAGE', val)
        }
      },
      deep: true
    },
    $route (to) {
      if (to.path.indexOf('index/notify') > -1) this.notifyToggle()
      if (!this.manageList.length) {
        // this.addFormVisible = true
        this.showClose = false
      }
    },
    // 操作引导弹框隐藏后图标闪烁提示
    helpDialogVisible (val) {
      if (!val) {
        let delay = 4.5
        clearInterval(this.timer)
        this.showAnimation = true
        this.timer = setInterval(() => {
          delay -= 0.5
          if (delay <= 0) {
            this.showAnimation = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 500)
      }
    },
    addCommunityVisible (val) {
      if (!val) {
        this.fileList = []
        this.$refs.addCommunityForm.resetFields()
      }
    },
    'communityForm.floorList': {
      handler (val) {
        this.labelList = val.map((item, index) => {
          this.$nextTick(() => {
            document.getElementById(`map__input--file${index}`).value = ''
          })
          return {
            file: '',
            floor: item
          }
        })
      },
      deep: true
    },
    passwordFormVisible (val) {
      if (!val && this.$refs['passwordForm']) {
        this.$refs['passwordForm'].resetFields()
      }
    }
  },
  methods: {
    // 下拉菜单事件处理
    handleCommand (e) {
      if (e === 'exit') {
        this.$affirm({ title: '退出登录', confirmType: 'danger', text: '是否确认退出登录', confirm: '退出' },
          (action, instance, done) => {
            if (action === 'confirm') {
              exitLogin({ phoneNumber: '', token: '' }).then(() => {
                this.$cookie().remove('user_phone')
                this.$cookie().remove('user_token')
                this.$cookie().remove('user_uuid')
                this.$router.push('/login')
              })
            }
            done()
          })
      } else if (e === 'change') {
        this.passwordFormVisible = true
      }
    },
    // 获取商户所有管管理层社群
    getManageList () {
      getManageList({ merchantGuid: this.$cookie().get('user_uuid') }).then(res => {
        this.manageList = res.data
        if (this.manageList.length) {
          this.manageGroup = this.manageList[0]
        } else {
          // this.addFormVisible = true
          this.showClose = false
        }
      })
    },
    addNewGroup () {
      // this.addFormVisible = true
      this.$router.push('/community/create')
      this.$refs.buttonSelect.blur()
    },
    showAddForm (type) {
      if (type === 2) {
        this.$tip('此服务暂未开通', 'error')
        return
      }
      this.handleCommunityType = type
      this.addFormVisible = false
      this.addCommunityVisible = true
    },
    // 只要点击了通知消息就为false
    notifyToggle () {
      this.notifState = false
    },
    // 新建社群 （商场、连锁总店、单个门店）
    addNewCommunity (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fileList = this.labelList.map(item => item.file)
          let len = this.fileList.filter(item => item).length
          if (!len) {
            this.$tip('请上传地图文件', 'error')
            return
          }
          if (this.communityForm.floorList.length !== len) {
            this.$tip('文件和所选楼层数不符,请重新选择', 'error')
            return
          }
          // 校验选取文件与所选楼层数据是否能够一一对应
          for (let k = 0, len = this.fileList.length; k < len; k++) {
            if (!this.fileList[k]) {
              this.$tip(`缺少${IntToFloor(this.communityForm.floorList[k])}楼层地图`, 'error', 5000)
              return
            }
          }
          this.httpRequest()
        }
      })
    },
    byTypeAddCommunity (imgUrl) {
      let subData = JSON.parse(JSON.stringify(this.communityForm))
      let address = subData.pca.split(',').map(Number)
      subData.provinceAreaId = address[0] || 0
      subData.cityAreaId = address[1] || 0
      subData.districtAreaId = address[2] || 0
      subData.rule = subData.rule.toString()
      subData.imgUrlList = []
      for (let k = 0; k < this.fileList.length; k++) {
        subData.imgUrlList.push(`${imgUrl}${IntToFloor(this.communityForm.floorList[k])}.svg`)
      }
      let url
      switch (this.handleCommunityType) {
        case 1:
          url = '/group/market'
          break
        case 2:
          url = '/group/chain'
          break
        case 3:
          url = '/group/store'
          break
      }
      AddNewCommunity(url, subData).then(res => {
        this.$tip('添加成功')
        this.addCommunityVisible = false
        if (this.handleCommunityType !== 3) {
          this.addCommunitySuccess = true
          this.communityCode = res.data
        }
        this.getManageList()
        this.fileList = []
        document.getElementById('map__input--file').value = ''
        this.$router.push('/community/mine')
      }).catch(error => {
        if (error.code) {
          this.$tip(error.msg, 'error')
        }
      })
    },
    toggleSideBar () {
      this.$store.dispatch('DISPATCH_SIDEBAR')
      eventObject().$emit('resize-echarts-console', '') // 触发控制台图表重置
      eventObject().$emit('resize-echarts-data', '') // 触发数据可视化图表重置
    },
    // 自定义文件上传
    httpRequest () {
      OssSignature({ superKey: 'floor_map' }).then(res => {
        if (res.data) {
          let time = parseTime(new Date()).replace(/[ :-]/g, '')
          this.loadModule = load('数据加载中...')
          this.uploadOss(res.data, 0, time)
        }
      }).catch(() => {
        this.$tip('服务器错误，请重新尝试')
      })
    },
    // 图片上传阿里云
    uploadOss (signature, index, time) {
      let file = this.fileList[index]
      if (!file) return
      let formData = new FormData()
      let fileName = `${IntToFloor(this.communityForm.floorList[index])}.svg`
      let uid = this.userInfo.developerId
      formData.append('key', `floor_map/${uid}/${time}/${fileName}`)
      formData.append('policy', signature['policy'])
      formData.append('OSSAccessKeyId', signature['accessid'])
      formData.append('success_action_status', '200')
      formData.append('signature', signature['signature'])
      formData.append('file', file, fileName)
      // 构建formData 对象，将图片上传至阿里云oss服务
      axios.post(signature.host, formData).then(back => {
        if (!back.data) {
          if (index < this.fileList.length - 1) {
            this.uploadOss(signature, index + 1, time)
          }
          // 所图片成功上完成后 进行表单提交
          if (index === (this.fileList.length - 1)) {
            this.loadModule.close()
            this.byTypeAddCommunity(`${signature.host}/floor_map/${uid}/${time}/`)
          }
        } else {
          this.loadModule.close()
          this.$tip('上传失败，请稍后重试', 'error')
        }
      }).catch(() => {
        this.loadModule.close()
        this.$tip('网络异常，请稍后重新尝试', 'error')
      })
    },
    // 文件改变事件监听
    onChange (e, index) {
      let files = (e || window.event).target.files
      if (files[0] && !fileTypeAllow(files[0].name, 'svg')) {
        this.$tip('文件格式只支持svg', 'error')
        return
      }
      this.$set(this.labelList[index], 'file', files[0])
    },
    // 切换全屏状态
    changeScreen () {
      if (!this.isFullScreen) {
        this.enterFullScreen()
      } else {
        this.exitFullScreen()
      }
    },
    // 打开浏览器全屏模式
    enterFullScreen () {
      let el = document.documentElement
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      if (rfs) { // typeof rfs != "undefined" && rfs
        rfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 退出全屏
    exitFullScreen () {
      let el = document
      let cfs = el.cancelFullScreen || el.mozCancelFullScreen || el.msExitFullscreen || el.webkitExitFullscreen || el.exitFullscreen
      // console.log('exit full', cfs)
      if (cfs) { // typeof cfs != "undefined" && cfs
        cfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    windowKeyDown (e) {
      e = e || window.event
      if (e.keyCode === 122 && !this.isFullScreen) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false
        this.enterFullScreen()
      }
    },
    windowResize () {
      // console.log('resize', window.screen.height, window.document.documentElement.clientHeight)
      this.clientHeight = window.document.documentElement.clientHeight
    },
    deleteLabel (index) {
      this.$set(this.labelList[index], 'file', '')
      document.getElementById(`map__input--file${index}`).value = ''
    },
    // 修改密码
    submitPasswordForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        }
      })
    }
  },
  created () {
    // 是否有新的消息
    NoticeReadState().then(res => {
      this.notifState = res.data > 0
    }).catch(error => {
      console.info(error)
    })
    this.getManageList()
  },
  mounted () {
    this.clientHeight = window.document.documentElement.clientHeight
    window.addEventListener('resize', this.windowResize)
    window.addEventListener('keydown', this.windowKeyDown)
    eventObject().$on('ManageListRefresh', this.getManageList)
    eventObject().$on('CREATE_COMMUNITY-INDEX', () => {
      this.addFormVisible = true
      this.showClose = false
    })
  },
  beforeDestroy () {
    this.$store.commit('SET_GROUP_SELECT_ID')
    if (this.windowResize) {
      window.removeEventListener('resize', this.windowResize)
    }
    if (this.windowKeyDown) {
      window.removeEventListener('keydown', this.windowKeyDown)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .common__nav--wrap {
    position: relative;
    .iconfont {
      cursor: pointer;
    }
    > .icon-suoxiao {
      position: absolute;
      top: 15px;
      left: 15px;
      color: #fff;
      font-size: 20px;
      z-index: 999;
    }
  }

  .text--wrap {
    .el-icon-check {
      font-size: 14px;
      color: #0F9EE9;
      font-weight: bold;
    }
    .text--content {
      float: right;
      width: calc(100% - 22px);
      white-space: nowrap;
    }
    font-size: 12px;
    line-height: 1;
    color: #333;
  }

  /*创建商场成功确认弹框*/
  .affirm__content--warp {
    > span {
      font-size: 50px;
    }
    width: 288px;
    margin: 16px auto 50px;
    font-size: 12px;
    text-align: center;
  }

  /*选取地图文件框样式*/
  .import__map--wrap {
    > .el-scrollbar {
      height: 72px;
      margin-bottom: 5px !important;
      .file__items {
        float: left;
        width: 33%;
        line-height: 24px;
        text-align: left;
        text-transform: uppercase;
      }
    }
    height: 130px;
    padding: 10px;
    box-sizing: border-box;
    background: url(../../../assets/public/textarea_border_bg.png) no-repeat center;
    background-size: 100% 101.7%;
  }

  /*操作引导弹框 图标闪烁效果*/
  .flicker-animation {
    animation: flicker 1.5s infinite ease-in-out;
  }

  .max-width {
    width: auto;
    max-width: calc(100% - 24px);
    padding-right: 6px;
  }

  @keyframes flicker {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: .3;
      filter: alpha(opacity=30);
      transform: scale(0.98);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1280px;
    height: 70px;
    z-index: 1010;
    background-color: $theme-bg1;
    box-shadow: 3px 3px 5px 0 rgba(1, 7, 17, 0.60);
    border-radius: 0 !important;
    border: none;
    color: #fff;
    .logo-wrap {
      float: left;
      width: $barWidth;
      height: 70px;
      text-align: center;
      overflow: hidden;
      color: #fff;
      z-index: 999;
      &.hide-sidebar {
        width: 65px;
      }
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
      margin-left: $barWidth;
      height: 100%;
      font-size: 14px;
      user-select: none;
      background: $theme-bg1;
      box-sizing: border-box;
      .iconfont {
        font-size: 22px;
        transition: all 0.3s;
        cursor: pointer;
        margin-right: 8px;
        &.hide {
          transform: rotateZ(-90deg);
        }
      }
      &.hide-sidebar {
        margin-left: 65px;
      }
      &:focus {
        outline: none;
      }
      .right-menu-item {
        float: right;
        display: inline-block;
        margin: 4px 8px;
        a {
          color: rgba(255, 255, 255, 0.50);
          font-size: 12px;
        }
        > * {
          display: inline-block;
          height: 26px;
          margin: 0 8px;
          line-height: 26px;
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
            background: url(../../../assets/public/avatar_person_bg@1x.png) no-repeat left top;
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
              > img {
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

  .dialog__item--wrap {
    display: inline-block;
    float: left;
    width: 500px;
    height: 538px;
    background: #fff;
    border-radius: 5px;
    .dialog__item--title {
      position: relative;
      overflow: hidden;
      padding: 30px 0 12px;
      text-align: center;
      > h3 {
        font-size: 16px;
      }
      .el-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .dialog__item--content {
      width: 400px;
      height: 404px;
      padding: 15px 0;
      margin: 0 auto;
      background: #F8F8F8;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      .ob-group-nav {
        padding: 0;
        padding-left: 20px;
      }
      > div {
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        &:first-child {
          border-right: 1px dashed #ddd;
        }
        &:last-child {
          text-align: center;
        }
      }
      .el-scrollbar {
        height: 100%;
      }
      .el-radio {
        display: block;
        overflow: hidden;
        height: 16px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        + .el-radio {
          margin-left: 0;
        }
      }
    }
    .dialog__item--footer {
      margin-top: 15px;
      text-align: center;
    }
    &:nth-child(2) {
      margin-left: 20px
    }
  }

  .dialog__item--footer {
    .is-disabled {
      background: #CBCBCB;
      box-shadow: none;
      &:hover {
        background: #CBCBCB;
      }
    }
  }

  /*操作提示框消失动画*/
  .slide-fade-enter-active {
    transition: all 1s ease;
  }

  .slide-fade-leave-active {
    transition: all 5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(100px);
    opacity: 0;
  }

  /*创建社群弹框样式*/
  .create__community--content {
    overflow: hidden;
    margin-top: 42px;
    margin-bottom: 50px;
    text-align: center;
    .cc__item {
      display: inline-block;
      width: 32%;
      .icon--wrap {
        cursor: pointer;
        img {
          width: 86px;
          height: 86px;
        }
        color: #0F9EE9;
      }
      &.disabled {
        .icon--wrap {
          cursor: default;
        }

      }
    }
    .cc-sub-title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
    }
    .cc__content {
      width: 220px;
      height: 184px;
      padding: 2px;
      padding-top: 0;
      overflow: hidden;
      text-align: center;
      border-radius: 2px;
      background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
      box-sizing: border-box;
      &.fl {
        width: 390px;
        margin-right: 10px;
      }
      .content__text--wrap {
        position: relative;
        height: calc(100% - 30px);
        background: #fff;
        z-index: 9;
      }
      .g-custom__button {
        width: 160px;
        height: 24px;
        line-height: 24px;
        margin-bottom: 8px;
        text-align: center;
        color: #0F9EE9;
        cursor: pointer;
      }
      .content--text {
        display: inline-block;
        width: 160px;
        margin: 20px 10px 0;
        text-align: left;
        font-size: 12px;
        vertical-align: top;
        color: rgba(0, 0, 0, 0.30);
      }
    }
  }

  /*地图上传*/
  .label__list--wrap {
    position: relative;
    height: 142px;
    padding: 10px;
    box-sizing: border-box;
    background: url(../../../assets/public/textarea_border_bg.png) no-repeat center;
    background-size: 100% 101.7%;
    > .el-scrollbar {
      height: 126px;
    }
    .input__file {
      position: absolute;
      z-index: -1;
    }
    .label__item-wrap {
      position: relative;
      float: left;
      width: 40px;
      margin: 0 8px;
      text-align: center;
      > p {
        line-height: 1.5;
        margin-bottom: 5px;
      }
      .el-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        background: #f85650;
        color: #fff;
        z-index: 9;
        cursor: pointer;
      }
    }
    .label--item {
      position: relative;
      display: block;
      height: 40px;
      line-height: 40px;
      background: rgba(216, 216, 216, 0.5);
      cursor: pointer;
      font-weight: normal;
      overflow: hidden;
      input[type=file] {
        opacity: 0;
        margin-left: -999999px;
      }
      .el-icon-plus {
        font-size: 18px;
        color: #CBCBCB;
      }
    }
  }

  /***************

  白色主题 样式

  ****************/

  .theme-white {
    .navbar {
      box-shadow: none;
      /*border-bottom:1px solid #E6EAEE;*/
      .right-menu {
        background: $theme-white;
        color: #333;
        border-bottom: 1px solid #E6EAEE;
        .right-menu-item {
          a {
            color: $theme-white-color;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .dialog__item--content {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .ob-group-nav[type=custom] {
      .el-tree {
        padding-right: 0;
      }
    }
    > div {
      &:last-child {
        .el-scrollbar__view {
          min-height: 100%;
          &:after {
            display: inline-block;
            content: '';
            min-height: 374px;
            width: 0;
            vertical-align: middle;
          }
          .el-radio-group {
            max-width: 80%;
            text-align: left;
          }
        }
      }
    }
  }

  .help__dialog--wrap {
    border-radius: 2px;
    overflow: hidden;

    .el-dialog__header {
      padding: 12px;
      text-align: center;
      font-size: 16px;
      background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
      border-radius: 2px;

      .el-dialog__title {
        color: #fff;
      }

    }
    .el-dialog__body {
      padding-top: 14px;
    }

    .dialog__content {
      color: #191919;

      > p {
        font-size: 14px;
        text-align: center;
      }

      .item--supply {
        font-size: 12px;
        color: #B4B4B7;
      }

      .step__item {
        margin: 18px 0;
        padding-left: 156px;

        h3 {
          font-size: 16px;
        }

        .item--supply {
          padding-left: 50px;
        }
      }
    }
  }
</style>
