<template>
  <div class="portal__container--wrap" style="height: 100%;width: 100%;">
    <iframe scrolling="no" ref="bindGroupIframe" :src="iframeSrc" width="100%" height="100%" frameborder="0"></iframe>
    <div class="title--wrap">出入口管理</div>
    <!--出入口数量-->
    <div class="amount">
      <div class="gateway">
        <div class="title">出入口数量</div>
        <div class="count">{{totalCounts.portalNumber}}</div>
      </div>
      <div class="camera">
        <div class="title">摄像头数量</div>
        <div class="count">{{totalCounts.portalDeviceNumber}}</div>
      </div>
    </div>
    <!--楼层列表-->
    <ul class="floor__list--wrap">
      <li
        class="floor__list--item"
        v-for="(item, $index) in floorList"
        :class="{active: item.floor === currentFloor.floor}"
        @click="initFloor(item.floor)"
        :key="$index">{{IntToFloor(item.floor)}}</li>
    </ul>
    <!--添加出入口-->
    <ob-dialog-form
      :title="portalDialogTitle"
      :visible.sync="handlePortalVisible"
      :showButton="false"
    >
      <el-form
        slot="form"
        ref="handlePortalForm"
        block-message
        @submit.native.prevent
        style="width: 330px"
        label-position="left"
        class="common-form white"
        label-width="82px"
        :model="handlePortalForm"
        :rules="handlePortalRules"
      >
        <el-form-item label="名称：" prop="name">
          <el-input placeholder="请输入出入口名称" v-model.trim="handlePortalForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer mt50">
        <el-button class="cancel" @click="handlePortalVisible = false">返 回</el-button>
        <el-button class="affirm" type="primary" @click="handlePortal('handlePortalForm')">{{handleDialogType === 1?'添加': '保 存'}}</el-button>
      </div>
    </ob-dialog-form>

    <!--添加设备弹框-->
    <ob-dialog-form
      :title="portalDialogTitle"
      :visible.sync="AddDeviceVisible"
      :showButton="false"
    >
      <div slot="content" class="device__dialog--list">
        <div class="c-grey fs12 g-mb12">设备名称</div>
        <el-scrollbar>
          <el-checkbox-group
            v-model="checkedItems">
            <el-checkbox
              v-for="(item,$index) in ownDeviceList"
              :label="item.deviceKey"
              :disabled="item.disabled"
              :key="$index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer mt16">
        <el-button class="cancel" @click="AddDeviceVisible = false">返 回</el-button>
        <el-button class="affirm" type="primary" @click="portalAddDevice()">添加</el-button>
      </div>
    </ob-dialog-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Mixins from '../../utils/mixins'
import {GetGroupPortalInfo, GetPortalDeviceList, PortalUnbindDevice, PortalBatchBindDevice, CheckPortalNameExist, CreatePortal, EditPortal, DeletePortal, GetGroupPortalCount} from '../../api/community'
import {GetOwnDeviceList} from '../../api/device'
import {validateRule} from '../../utils/validate'

export default {
  name: 'association_map',
  mixins: [Mixins],
  props: {
    data: { // 当前社群信息
      type: Object,
      default: () => ({})
    },
    floorList: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    const validatePortalName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入出入口名称'))
      } else {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          if (this.handleDialogType === 2 && this.handlePortalForm.originName === value) {
            callback(new Error('该名称已存在'))
          } else {
            CheckPortalNameExist({name: value, groupSonId: this.currentFloor.groupSonGuid}).then(res => {
              !res.data ? callback() : callback(new Error('该名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的出入口名称'))
        }
      }
    }
    return {
      handleDialogType: 1, // 弹窗类型
      AddDeviceVisible: false, // 出入口添加设备
      handlePortalVisible: false, // 新增出入口
      handlePortalForm: {
        coordinates: [],
        floor: '',
        name: '',
        type: ''
      },
      handlePortalRules: {
        name: [
          {
            validator: validatePortalName, trigger: 'blur'
          }
        ]
      },
      checkedItems: [], // 要添加的设备
      ownDeviceList: [], // 自有设备列表
      currentFloor: '',
      iframeObj: '',
      iframeSrc: '',
      totalCounts: '',
      currentPortal: '', // 当前出入口信息
      deviceInfo: {
        title: '',
        list: []
      } // 设备信息
    }
  },
  created () {},
  mounted () {
    window.addEventListener('message', this.handleEvent)
    this.iframeObj = this.$refs.bindGroupIframe.contentWindow
    this.initFloor()
  },
  computed: {
    ...mapState(['currentManage', 'userInfo']),
    portalDialogTitle () {
      let title
      switch (this.handleDialogType) {
        case 1:
          title = '添加出入口'
          break
        case 2:
          title = '编辑出入口'
          break
        case 3:
          title = '添加设备'
          break
      }
      return title
    }
  },
  methods: {
    // 初始化楼层信息 （设置当前楼层信息）
    initFloor (int) {
      if (this.data.guid === this.currentManage.id) {
        this.currentFloor = this.floorList.filter(item => item.floor === (int || this.currentFloor.floor || 1))[0] || this.this.floorList[0]
      } else {
        this.currentFloor = this.data
      }
      this.iframeSrc = `/static/html/association_map.html?map_url=${this.currentFloor.mapUrl}&time_stamp=${new Date().getTime()}`
      if (this.currentFloor.groupSonGuid) {
        GetGroupPortalCount({groupSonId: this.currentFloor.groupSonGuid || this.currentFloor.guid}).then(res => {
          this.totalCounts = res.data
        })
      }
    },
    // 处理iframe传递出来的事件
    handleEvent (event) {
      console.log('event data---------', event.data)
      let data = event.data instanceof Object ? event.data : JSON.parse(event.data || '{}')
      switch (data.type) {
        case 'CREATE_PORTAL_CLICK': // 创建出入口
          this.createGateway(data.data)
          break
        case 'GET_PORTAL_LIST': // 设置出入口信息
          this.setPortalList()
          break
        case 'GET_CAMERA_LIST': // 展示出入口设备列表
          this.getDeviceList(data.data)
          break
        case 'DELETE_PORTAL_CLICK': // 删除出入口
          this.deletePortal(data.data)
          break
        case 'EDIT_PORTAL_CLICK': // 编辑出入口信息
          this.handleDialogType = 2
          this.handlePortalVisible = true
          let copy = JSON.parse(JSON.stringify(data.data))
          copy.originName = JSON.parse(JSON.stringify(copy.name || ''))
          this.handlePortalForm = copy
          break
        case 'PORTAL_ADD_DEVICE': // 出入口新增设备
          this.showAddDialog(data.data)
          break
        case 'DELETE_PORTAL_DEVICE': // 删除出入口设备
          this.deletePortalDevice(data.data)
          break
      }
    },
    // 获取出入口信息，并在地图上展示标注
    setPortalList () {
      GetGroupPortalInfo({groupSonId: this.currentFloor.groupSonGuid}).then(res => {
        res.data.map(item => {
          this.iframeObj.createSprite(item)
        })
      })
    },
    // 获取出入口设备列表
    getDeviceList (data) {
      this.$set(this.deviceInfo, 'title', data.name)
      this.$set(this.deviceInfo, 'list', [])
      GetPortalDeviceList({portalGuid: data.guid}).then(res => {
        this.$set(this.deviceInfo, 'list', res.data || [])
        this.iframeObj.createDeviceList(this.deviceInfo)
      })
    },
    // 添加出入口设备
    portalAddDevice () {
      let checkSet = new Set(this.checkedItems)
      let checked = this.ownDeviceList.filter(item => !item.disabled).filter(item => checkSet.has(item.deviceKey))
      if (!checked.length) {
        this.$tip('请选择要添加的设备', 'error')
        return false
      }
      let arr = checked.map(item => {
        return {
          deviceKey: item.deviceKey,
          name: item.name,
          merchantGuid: this.userInfo.developerId,
          portalGuid: this.currentPortal.guid
        }
      })
      PortalBatchBindDevice({deviceGroupPortalReqs: arr}).then(res => {
        this.$tip('添加成功')
        this.AddDeviceVisible = false
        this.getDeviceList(this.currentPortal)
      })
    },
    deletePortalDevice (data) {
      this.$affirm({
        title: '删除绑定关系',
        confirm: '删除',
        text: '删除关系后，该出入口下将不包含该设备'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          PortalUnbindDevice({deviceKey: this.deviceInfo.list[data.index].deviceKey}).then(res => {
            this.$tip('删除成功')
            this.getDeviceList(data.detail)
          })
        }
        done()
      })
    },
    // 添加出入口弹框
    showAddDialog (data) {
      this.handleDialogType = 3
      this.AddDeviceVisible = true
      this.currentPortal = data
      this.checkedItems = this.deviceInfo.list.map(item => item.deviceKey)
      GetOwnDeviceList().then(res => {
        // this.currentPortal = row
        let deviceKeySet = new Set(this.deviceInfo.list.map(item => item.deviceKey))
        res.data.content = res.data.content.map(item => {
          if (deviceKeySet.has(item.deviceKey)) {
            item.disabled = true
          }
          return item
        })
        this.ownDeviceList = res.data.content || []
        this.AddDeviceVisible = true
      })
    },
    // 删除出入口
    deletePortal (data) {
      this.$affirm({text: `删除出入口后，出入口与设备之间的绑定关系也会被删除`, title: '删除出入口', confirm: '删除'}, (action, instance, done) => {
        if (action === 'confirm') {
          DeletePortal({portalGuid: data.guid}).then(res => {
            this.$tip('删除成功')
            this.initFloor()
          })
        }
        done()
      })
    },
    // 添加出入口
    createGateway (data) {
      this.handleDialogType = 1
      this.handlePortalVisible = true
      this.handlePortalForm.coordinates = [data.position.x, data.position.y, 0]
      this.handlePortalForm.type = data.type
    },
    // 添加、编辑出入口
    handlePortal (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.handlePortalForm))
          subData.groupSonId = this.currentFloor.groupSonGuid
          subData.floor = this.currentFloor.floor
          console.log('add portal -----------', subData, this.handleDialogType)
          if (this.handleDialogType === 1) { // 添加出入口
            CreatePortal(subData).then(res => {
              this.$tip('添加成功')
              this.handlePortalVisible = false
              this.initFloor()
            })
          } else { // 编辑出入口
            EditPortal(subData).then(res => {
              this.$tip('保存成功')
              this.handlePortalVisible = false
              this.initFloor()
            })
          }
        }
      })
    }
  },
  watch: {
    floorList: {
      handler (val) {
        this.initFloor()
      },
      deep: true
    },
    data: {
      handler (val) {
        this.initFloor()
      },
      deep: true
    },
    handlePortalVisible (val) {
      if (!val && this.$refs.handlePortalForm) {
        this.$refs.handlePortalForm.resetFields()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('message', this.handleEvent)
  }
}
</script>

<style lang="scss" scoped>
  .portal__container--wrap{
    position: relative;
  }
  .title--wrap{
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 14px;
    user-select: none;
  }
  /*楼层信息侧边栏*/
  .floor__list--wrap{
    position: absolute;
    top: 48%;
    left: 20px;
    width: 40px;
    text-align: center;
    z-index: 999;
    transform: translateY(-50%);
    .floor__list--item{
      height: 40px;
      line-height: 40px;
      background: rgba(15,14,17,0.7);
      margin-bottom: 2px;
      font-size: 14px;
      cursor: pointer;
      &.active,&:hover{
        background-image: linear-gradient(-135deg, #4417AD 4%, #1169D3 100%);
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  /*出入口设备列表*/
  .levitaten{
    width: 114px;
    height: 140px;
    /*color: #235cc2;*/
    background-color: rgba(35, 92, 194, 0.3);
    position: absolute;
    top: 30px;
    left: 30px;
    padding: 5px;
    font-size: 12px;
    box-sizing: border-box;
    display: none;
    /*transition: all linear 500ms;*/
    .title{
      padding: 3px 5px;
      color: #ffffff;
      overflow: hidden;
      border-bottom: 1px dashed #979797;
    }
    .device-list{
      height: 85px;
      overflow: hidden;
      ul{
        margin: 0;
        padding: 4px 2px 0;
        text-decoration: none;
        color: #ffffff;
      }
      li{
        height: 27px;
        line-height: 27px;
        list-style: none;
        position: relative;
        span{
          width: 70px;
          top: -3px;
          margin-left: 5px;
          position: absolute;
        }
        i{
          position: absolute;
          cursor: pointer;
          right: 0;
          top: 7px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    .add-button{
      text-align: center;
      > a{
        /*margin-left: 14px;*/
        color: #0f9ee9;
        text-decoration: none;
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 140px;
      left: 50%;
      background: rgba(255, 255, 255, 0.5);
      width: 1px;
      height: 30px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 170px;
      left: 50%;
      background: #ffffff;
      background: rgba(255, 255, 255, 0.5);
      width: 30px;
      height: 1px;
    }
  }
  /*出入口、摄像头*/
  .amount{
    position: absolute;
    top: 144px;
    right: 50px;
    user-select: none;
    .gateway, .count{
      margin-bottom: 40px;
      text-align: center;
    }
    .title{
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
    }
    .count{
      font-size: 24px;
      color: #ffffff;
    }
  }
  /*添加设备弹框*/
  .device__dialog--list{
    width: 320px;
    height: 240px;
    margin: 0 auto;
    background: #f8f8f8;
    padding: 20px;
    box-sizing: border-box;
    .el-scrollbar {
      height: calc(100% - 30px);
      overflow: hidden;
      .el-checkbox{
        display: block;
        margin-bottom: 12px;
        &+.el-checkbox{
          margin-left: 0;
        }
      }
    }
  }
</style>
