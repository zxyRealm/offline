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
            :isActive="!sidebar.opened"></hamburger>
        </div>
        <uu-icon type="screen" @click.native="changeScreen" :class="{exit: isFullScreen}"></uu-icon>
        <!--<el-select-->
          <!--ref="manageSelect"-->
          <!--value-key="id"-->
          <!--placeholder="添加社群"-->
          <!--popper-class="select__dropdown&#45;&#45;manage"-->
          <!--class="nav__select&#45;&#45;manage" v-model="manageGroup">-->
          <!--<el-option-->
            <!--v-for="(item) in manageList"-->
            <!--:key="item.id"-->
            <!--:label="item.name"-->
            <!--:value="item">-->
            <!--<span class="ellipsis" style="float: left">{{ item.name }}</span>-->
            <!--<uu-icon v-if="item.type === 1" type="role01"></uu-icon>-->
            <!--<uu-icon v-if="item.type === 2" type="role02"></uu-icon>-->
            <!--<uu-icon v-if="item.type === 3" type="role03"></uu-icon>-->
          <!--</el-option>-->
          <!--<el-option v-if="!manageList.length" value="" style="height: 30px;">-->
            <!--<el-button class="affirm" @click="addNewGroup">添加新社群</el-button>-->
          <!--</el-option>-->
          <!--<el-button v-else class="affirm" @click="addNewGroup">添加新社群</el-button>-->
        <!--</el-select>-->
        <button-select
          ref="buttonSelect"
          value-key="id"
          v-model="manageGroup">
          <button-select-item
            v-for="(item,$index) in manageList"
            :value="item"
            :key="$index"
            :label="item.name"
          >
            <span class="ellipsis-28" style="float: left">{{ item.name }}</span>
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
          <router-link to="/person" class="user-info">
            <div class="avatar-wrap">
              <div class="avatar vam">
                <img :src="avatar" alt="">
              </div>
            </div>
            <span>{{userInfo.phone?userInfo.phone:userInfo.email}}</span>
          </router-link>
          <router-link :to="'/index/notify/'+notifState" class="system-notify">
            <uu-icon type="notify" :class="notifState?'notify-have':''"></uu-icon>
          </router-link>
          <a href="javascript:void (0);" class="exit" @click="$exit()">
            <uu-icon type="exit"></uu-icon>
          </a>
        </div>
      </div>
    </el-menu>

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

    <!--添加社群（商场、连锁总店、单个门店）-->
    <ob-dialog-form
      :title="communityDialogTitle"
      :visible.sync="addCommunityVisible"
    >
      <el-form
        slot="form"
        ref="addCommunityForm"
        block-message
        style="width: 330px"
        label-position="left"
        class="common-form white"
        label-width="82px"
        :model="communityForm"
        :rules="communityRules"
      >
        <el-form-item label="名称：" prop="name">
          <el-input placeholder="请输入社群名称" v-model.trim="communityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区：" prop="pca">
          <area-select placeholder="请选择地区" v-model="communityForm.pca"></area-select>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
          ]"
          prop="address">
          <el-input
            type="text"
            placeholder="请输入详细地址"
            v-model.trim="communityForm.address"></el-input>
        </el-form-item>
        <el-form-item label="楼层：" prop="floorList">
          <floor-select v-model.trim="communityForm.floorList"></floor-select>
        </el-form-item>
        <el-form-item prop="map">
          <div class="label__list--wrap" v-if="communityForm.floorList.length">
            <el-scrollbar class="scroll-auto">
              <div class="label__item-wrap" v-for="(item, $index) in labelList" :key="$index">
                <i class="el-icon-close" @click.stop="deleteLabel($index)"></i>
                <label :for="'map__input--file' + $index" @input="onChange($event, $index)" class="label--item" >
                  <input type="file" hidden class="input__file" :id="'map__input--file' + $index">
                  <i v-if="!item.file" class="el-icon-plus"></i>
                  <span v-else class="ellipsis">{{item.file ? item.file.name : ''}}</span>
                </label>
                <p>{{item.floor | IntToFloor}}</p>
              </div>
            </el-scrollbar>
            <!--<input type="file" hidden class="input__file" id="map__input&#45;&#45;file">-->
          </div>
          <!--<div v-if="fileList.length" class="import__map&#45;&#45;wrap">-->
            <!--<el-scrollbar>-->
              <!--<div class="file__items vam" v-for="(item,$index) in fileList" :key="$index">-->
                <!--<img src="@/assets/public/file_icon.png" width="12" alt="">-->
                <!--{{item.name}}-->
              <!--</div>-->
            <!--</el-scrollbar>-->
            <!--<label for="map__input&#45;&#45;file" @change="onChange" class="g__input&#45;&#45;btn">-->
              <!--<a>重新导入</a>-->
              <!--<input type="file" id="map__input&#45;&#45;file" multiple="multiple">-->
            <!--</label>-->
          <!--</div>-->
          <!--<label for="map__input&#45;&#45;file" @change="onChange" class="g__input&#45;&#45;btn" v-else>-->
            <!--<a>导入地图</a>-->
            <!--<input type="file" id="map__input&#45;&#45;file" multiple="multiple">-->
          <!--</label>-->
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input type="text" placeholder="请输入联系人"
                    v-model.trim="communityForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input type="text" placeholder="请输入联系电话"
                    v-model.trim="communityForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer mt50">
        <el-button class="cancel" @click="addCommunityVisible = false">返 回</el-button>
        <el-button class="affirm" type="primary" @click="addNewCommunity('addCommunityForm')">添加</el-button>
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
import {mapGetters, mapState} from 'vuex'
import Hamburger from '@/components/Hamburger'
import Group from '@/components/group-nav'
import {eventObject} from '@/utils/event.js'
import ConsoleDialog from '@/components/console'
import {GetManageList, OssSignature} from '../../../api/common'
import {CheckNameExist, AddNewCommunity} from '../../../api/community'
import {validateRule, validPhone} from '../../../utils/validate'
import {parseTime, fileTypeAllow, IntToFloor} from '../../../utils'
import axios from 'axios'
import {load} from '../../../utils/new-request'
import AreaSelect from '@/components/area-select/area-select'
import FloorSelect from '@/components/FloorSelect'
import ButtonSelect from '@/components/button-select'
import ButtonSelectItem from '@/components/button-select/button-select-item'
export default {
  components: {
    Hamburger,
    Group,
    ConsoleDialog,
    AreaSelect,
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
          CheckNameExist({name: value}).then(res => {
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
      communityForm: { // 添加社群表单对象
        name: '',
        pca: '',
        address: '',
        floorList: [],
        imgUrlList: [],
        contact: '',
        rule: [0],
        phone: ''
      },
      communityRules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请获取社群邀请码', trigger: 'blur'}
        ],
        pca: [
          {required: true, message: '请选择地区', trigger: ['blur']}
        ],
        floorList: [
          {required: true, type: 'array', message: '请选取楼层', trigger: 'blur'}
        ],
        contact: [
          {validator: validateContact, trigger: 'blur'}
        ],
        rule: [
          {required: true, type: 'array', message: '请选择索权范围', trigger: 'blur'}
        ],
        phone: [
          {validator: validPhone, trigger: 'blur'}
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
      labelList: [] // 选取楼层后对应的要上传的文件列表
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
    },
    communityDialogTitle () {
      let title
      switch (this.handleCommunityType) {
        case 1:
          title = '添加商场'
          break
        case 2:
          title = '添加连锁总店'
          break
        case 3:
          title = '添加门店'
          break
      }
      return title
    },
    isFullScreen () { // 当前是否全屏状态 (17 为浏览器默认滚动条宽度)
      return Math.abs(window.screen.height - this.clientHeight) <= 17
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
    $route (to, from) {
      if (to.path === '/console') this.selectName = '请选择您的社群'
      if (to.path.indexOf('index/notify') > -1) this.notifyToggle()
      if (!this.manageList.length) {
        this.addFormVisible = true
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
    }
  },
  methods: {
    // 获取商户所有管管理层社群
    getManageList () {
      GetManageList().then(res => {
        this.manageList = res.data
        if (res.data.length) {
          this.manageGroup = this.manageList[0]
        } else {
          this.addFormVisible = true
          this.showClose = false
        }
      })
    },
    addNewGroup () {
      this.addFormVisible = true
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
          // let nameList = []
          // for (let k = 0, len = this.fileList.length; k < len; k++) {
          //   nameList.push(this.fileList[k].name.substring(0, this.fileList[k].name.lastIndexOf('.')))
          // }
          // let nameSet = new Set(nameList.map(Number))
          // for (let k = 0, len = this.communityForm.floorList.length; k < len; k++) {
          //   if (!nameSet.has(k + 1)) {
          //     this.$tip(`缺少${this.communityForm.floorList[k]}楼层地图`, 'error', 5000)
          //     return
          //   }
          // }
          this.httpRequest()
        } else {
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
    getGroupList () {
      this.$http('/group/list/noCustom').then(res => {
        this.groupList = res.data
      })
    },
    toggleSideBar () {
      this.$store.dispatch('DISPATCH_SIDEBAR')
      eventObject().$emit('resize-echarts-console', '') // 触发控制台图表重置
      eventObject().$emit('resize-echarts-data', '') // 触发数据可视化图表重置
    },
    // 选取社群时回调，获取社群下设备列表并展示
    handleChange (val) {
      this.deviceInfo = ''
      this.groupSelectId = val.groupGuid
      this.$store.commit('SET_GROUP_SELECT_ID', this.groupSelectId)
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
    // 自定义文件上传
    httpRequest () {
      OssSignature({superKey: 'floor_map'}).then(res => {
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
      let files = e.target.files
      if (files[0] && !fileTypeAllow(files[0].name, 'svg')) {
        this.$tip('文件格式只支持svg', 'error')
        return
      }
      this.$set(this.labelList[index], 'file', files[0])
    },
    // 文件上传成功回调
    handleSuccess () {
    },
    // 切换全屏状态
    changeScreen () {
      if (!this.isFullScreen) {
        this.fullScreen()
      } else {
        this.exitScreen()
      }
    },
    // 打开浏览器全屏模式
    fullScreen () {
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
    exitScreen () {
      let el = document
      let cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
        el.mozCancelFullScreen || el.ExitFullscreen || el.msExitFullscreen
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
    windowResize () {
      this.clientHeight = window.document.documentElement.clientHeight
    },
    deleteLabel (index) {
      this.$set(this.labelList[index], 'file', '')
      document.getElementById(`map__input--file${index}`).value = ''
    }
  },
  created () {
    // 是否有新的消息
    // console.log(parseTime(new Date()).replace(/[ :-]/g, ''))
    this.$http('/siteNotice/unRead').then(res => {
      this.notifState = res.data > 0
    }).catch(error => {
      console.info(error)
    })
    this.getManageList()
    this.$http('/firstCheck', {name: 'insight_index_first'}).then(res => {
      if (res.data) this.helpDialogVisible = true
    })
  },
  mounted () {
    this.clientHeight = window.document.documentElement.clientHeight
    window.addEventListener('resize', this.windowResize)
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";

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
    background: url(/static/img/textarea_border_bg.png) no-repeat center;
    background-size: 100% 101.7%;
  }

  /*操作引导弹框 图标闪烁效果*/
  .flicker-animation {
    animation: flicker 1.5s infinite ease-in-out;
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
    height: 70px;
    z-index: 1010;
    background-color: $theme-bg;
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
      /*background: #232027;*/
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
        a {
          color: rgba(255, 255, 255, 0.50);
          font-size: 12px;
        }
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
      &.disabled{
        .icon--wrap{
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
  .label__list--wrap{
    position: relative;
    height: 142px;
    padding: 10px;
    box-sizing: border-box;
    background: url(/static/img/textarea_border_bg.png) no-repeat center;
    background-size: 100% 101.7%;
    overflow: hidden;
    .input__file{
      position: absolute;
      left: 99999px;
      z-index: -1;
    }
    .label__item-wrap{
      position: relative;
      float: left;
      width: 40px;
      margin: 0 8px;
      text-align: center;
      > p{
        line-height: 1.5;
        margin-bottom: 5px;
      }
      .el-icon-close{
        position: absolute;
        top: 0;
        right: 0;
        background: #f85650;
        color: #fff;
        z-index: 9;
        cursor: pointer;
      }
    }
    .label--item{
      position: relative;
      display: block;
      height: 40px;
      line-height: 40px;
      background:  rgba(216, 216, 216, 0.5);
      cursor: pointer;
      font-weight: normal;
      overflow: hidden;
      input[type=file]{
        margin-left: -999999px;
      }
      .el-icon-plus{
        font-size: 18px;
        color: #CBCBCB;
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
