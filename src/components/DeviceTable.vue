<template>
  <div>
    <el-table
      border
      empty-text="暂无设备"
      :data="data"
    >
      <el-table-column
        label="名称">
        <template slot-scope="scope">
          <span :class="'ellipsis-20'">{{scope.row.name || '暂无'}}</span>
          <el-popover
              placement="top"
              popper-class="nick_name--popover"
              @show="showPopover(scope.$index)"
              @hide="hidePopover(scope.$index)"
              v-model="scope.row.popover"
              trigger="click">
              <el-form
                :key="scope.$index"
                @submit.native.prevent
                :ref="'tableForm' + scope.$index"
                :rules="rules"
                class="table-form"
                :model="equipmentForm"
              >
                <el-form-item :key="'form-item' + scope.$index" prop="deviceName">
                  <el-input type="text" v-model.trim="equipmentForm.deviceName"></el-input>
                  <uu-icon type="success" @click.native="changeEquipmentName(scope.$index)"></uu-icon>
                  <uu-icon type="error" @click.native="scope.row.popover = false"></uu-icon>
                </el-form-item>
              </el-form>
              <i slot="reference" class="el-icon-edit"></i>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceKey"
        label="序列号"
        :width="dataType !== 'camera' ? 168 : ''">
      </el-table-column>
      <el-table-column
        v-if="dataType !== 'camera'"
        prop="deviceVersion"
        label="版本号"
        width="100">
      </el-table-column>
      <el-table-column
        v-if="dataType !== 'camera'"
        width="90"
        label="状态">
        <template slot-scope="scope">
          <span :class="stateClass(scope.row.deviceStatus)">{{scope.row.deviceStatus | lineState}}</span>
          <i @click="getDeviceState(scope.row)" class="el-icon-refresh success-color"></i>
        </template>
      </el-table-column>
      <el-table-column
        v-if="dataType === 'server'"
        width="106"
        align="center"
        prop="deviceNum"
        label="下辖设备数量">
        <template slot-scope="scope">
          <router-link :to="{name: 'equipmentCamera',query: {server_key: scope.row.deviceKey, name: scope.row.name}}">{{scope.row.deviceNum}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        :align="dataType === 'camera'? 'center': ''"
        :width="dataType === 'camera'? 160: ''"
        label="操作">
        <template slot-scope="scope">
            <template v-if="dataType !== 'camera'">
              <el-popover
                popper-class="table__popper--help"
                placement="top"
                trigger="hover">
                <ul class="order-list">
                  <li v-show="scope.row.deviceStatus===undefined">尚未【获取】设备状态，无法操作</li>
                  <li v-if="scope.row.isHandle===false">{{!showDelete ? '尚无该设备的操作权限，无法操作' : '设备操作权限已上送，无法操作'}}</li>
                  <li v-else-if="scope.row.deviceStatus">{{scope.row.deviceStatus | handleMsg}}</li>
                </ul>
                <uu-icon
                  :style="{visibility: scope.row.deviceStatus === 0 ? 'hidden' : 'visible'}"
                  class="g-mr10"
                  slot="reference"
                  type="problem"></uu-icon>
              </el-popover>
              <span
                v-for="(item,$index) in filterBtn(scope.row)"
                :key="$index"
                :disabled="!btnState(scope.row,item).state"
                @click="handleDevice(item, scope.row)"
                :class="btnState(scope.row,item).going?item +' ongoing':item"
                class="table__btn">
                {{btnState(scope.row,item).text}}
              </span>
            </template>
            <span class="error-color delete_btn" :class="{fr: dataType !== 'camera'}" @click="deleteEquipment(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!--设备绑定社群-->
    <ob-dialog-form
      filter
      @remote-submit="bindCommunity"
      :group="groupList"
      title="绑定社群"
      type="group"
      :visible.sync="dialogFormVisible"
    >
    </ob-dialog-form>
    <!--设备升级-->
    <ob-dialog-form
      class="dialog__content--vm"
      :show-button="false"
      :title="dataType === 'server' ? '服务器升级' : '设备升级'"
      :visible.sync="deviceUpdateVisible">
      <div slot="form" class="vam">
        <div class="version__list--wrap text-center">
          <div class="c-grey fs12 g-pl20 mt16">{{dataType ==='server'? '服务器': '设备'}}当前版本：{{currentVersion}}</div>
          <p class="radio-box last-version fs12" >
            最新版本 {{lastVersion}}
          </p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="deviceUpdateVisible = false">取消</el-button>
        <el-button class="affirm" type="primary" @click="deviceUpdate()">升级</el-button>
      </div>
    </ob-dialog-form>
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'
import {simplifyGroups} from '../utils'
import {ChangeDeviceAlias, DeviceAliasExist, UpdateCameraName, CheckCameraName, DeleteCameraBatch, DeleteDevice, GetDeviceState, DeviceHandleUrl, DeviceUpgrade, GetDeviceVersion} from '../api/device'

const UPLOAD_API = process.env.UPLOAD_API
export default {
  name: 'device-table',
  props: {
    value: {
      type: [Array],
      default: () => []
    },
    isMine: { // 是否为自有设备
      type: Boolean,
      default: false
    },
    isHandle: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    dataType: { // 数据类型 mine 自有设备 other 非自有设备列表 server 服务器列表
      type: String,
      default: 'mine'
    }
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入设备别名'))
      } else {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          if (this.$route.name === 'equipmentCamera') {
            CheckCameraName({serverKey: this.$route.query.server_key, name: value}).then(res => {
              res.data ? callback(new Error('设备别名已存在')) : callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          } else {
            DeviceAliasExist({name: value}).then(res => {
              res.data ? callback(new Error('设备别名已存在')) : callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的设备别名'))
        }
      }
    }
    return {
      fileList: [], // 上传文件列表
      groupList: [], // 自有社群列表
      dialogFormVisible: false, // 绑定社群dialog 显示状态
      currentDevice: {}, // 当前行设备信息
      equipmentForm: { // 修改设备昵称 表单对象
      },
      rules: {
        deviceName: [
          {required: true, validator: validateName, trigger: 'blur'}
        ]
      },
      btnList: ['run', 'reboot', 'upgrade', 'reset'],
      showHistory: false, // 显示历史版本列表
      selectVersion: '', // 选中的版本
      currentVersion: '', // 当前的版本
      lastVersion: '', // 设备最新版本信息
      deviceUpdateVisible: false, // 设备升级弹框显示与否
      versionList: [] // 历史版本信息列表
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    data: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    'baseApi' () {
      return UPLOAD_API
    }
  },
  methods: {
    // 显示修改昵称popover
    showPopover (index) {
      let data = JSON.parse(JSON.stringify(this.data[index]))
      data.deviceName = data.name
      this.equipmentForm = data
    },
    // 隐藏修改昵称popover, 隐藏时清除校验结果，避免展示时显示隐藏前的校验结果
    hidePopover (index) {
      if (this.$refs['tableForm' + index]) {
        this.$refs['tableForm' + index].clearValidate()
      }
    },
    // 修改设备昵称
    changeEquipmentName (index) {
      this.$refs['tableForm' + index].validate((valid) => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.data[index]))
          // ChangeDeviceAlias(this.equipmentForm).then()
          if (subData.type === 4 || subData.type === 5) {
            subData.name = this.equipmentForm.deviceName
            UpdateCameraName(subData).then(res => {
              this.$tip('修改成功')
              this.$set(this.data[index], 'popover', false)
              this.data[index].name = this.equipmentForm.deviceName
            })
          } else {
            ChangeDeviceAlias(this.equipmentForm).then(res => {
              this.$tip('修改成功')
              this.$set(this.data[index], 'popover', false)
              this.data[index].name = this.equipmentForm.deviceName
            })
          }
        } else {
          console.log('error submit')
        }
      })
    },
    /* 获取设备当前运行状态
    * 添加自定义属性 deviceStatus 未获取状态是为undefined
    * deviceStatus状态码 0 在线 默认显示禁用 1 离线 显示启用   2重启中 3重置中 4升级中  5禁用 6启用中 7 禁用中
    * */
    // 获取设备在线状态
    getDeviceState (value, show = true) {
      if (show === null) {
        return
      }
      // GetDeviceState({deviceKey: value.deviceKey})
      GetDeviceState({deviceKey: value.deviceKey}).then(res => {
        if (value.deviceStatus !== undefined && show) {
          this.$tip('刷新成功')
        }
        // res.data = Math.floor(Math.random() * 7)
        console.log('state', res.data)
        if (res.data !== 1) {
          if (value.groupGuid) {
            // 获取设备操作权限，已授权其他社群后自己不可操作
            let url = '/merchant/device/operationPermission'
            if (this.isChild) url = '/merchant/device/permission/search'
            this.$http(url, {guid: value.groupGuid}).then(res2 => {
              this.$set(this.data, 'isHandle', res2.data)
            })
          } else {
            this.$set(value, 'isHandle', true)
          }
        } else {
          this.$set(value, 'isHandle', true)
        }
        this.$set(value, 'deviceStatus', res.data)
      }).catch(error => {
        console.log(error)
        if (error.code) {
        }
      })
    },
    // 设备状态class
    stateClass (val) {
      let cname = ''
      switch (val) {
        case 1:
          cname = 'error-color'
          break
        case undefined:
          cname = 'state__label'
          break
        default:
          cname = 'success-color'
      }
      return cname
    },
    // 获取自有社群列表，绑定社群时只能绑定自有社群
    getGroupList () {
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
      })
    },
    // 显示绑定社群弹框
    showDialogForm (data, index) {
      if (!data.groupName) {
        this.dialogFormVisible = true
        this.currentDevice = data
      } else {
        this.unBindCommunity(data, index)
      }
    },
    // 解绑社群
    unBindCommunity (value, index) {
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '确定将设备从社群解绑？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          done()
          this.$http('/device/unbinding', {
            deviceKey: value.deviceKey,
            groupGuid: value.groupGuid
          }).then(res => {
            this.$tip('解绑成功')
            this.getDeviceState(value)
            this.$set(value, 'groupName', null)
          })
        } else {
          // 隐藏hover 提示信息
          setTimeout(() => { value.tipShow = false }, 5)
          done()
        }
      })
    },
    // 绑定社群
    bindCommunity (data) {
      this.dialogFormVisible = false
      let subData
      if (!data[0]) {
        this.$tip('请选取社群', 'error')
        return
      }
      subData = {
        deviceKey: this.currentDevice.deviceKey,
        groupGuid: data[0].groupGuid,
        name: data[0].name
      }
      this.$load('设备绑定中...')
      this.$http('/device/binding', subData).then(res => {
        this.$load().close()
        this.$tip('绑定成功')
        this.$emit('refresh')
        // this.getMineEquipment(this.pagination.index)
      }).catch(() => {
        this.$load().close()
      })
    },
    // 操作按钮状态控制
    btnState (val, type) {
      // state状态码 0 在线 默认显示禁用 1 离线 显示启用   2重启中 3重置中 4升级中  5禁用 6启用中 7 禁用中
      // type 状态值 run 开关机  reboot 重启 upgrade 升级 reset 重置
      let label = (type) => {
        switch (type) {
          case 'reboot':
            return '重启'
          case 'upgrade':
            return '升级'
          case 'reset':
            return '重置'
          default:
            return '启用'
        }
      }
      let backObj = {
        text: label(type), // 按钮显示内容
        state: false, // 按钮状态
        going: false // 是否进行中
      }
      if (val.isHandle === false) {
        return backObj
      }
      switch (val.deviceStatus) {
        case 0:
          if (type === 'run') {
            backObj.text = '禁用'
            backObj.state = true
          } else {
            backObj.text = label(type)
            backObj.state = true
          }
          break
        case 1:
          backObj.text = label(type)
          break
        case 2:
          if (type === 'reboot') {
            backObj.text = label(type) + '中...'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 3:
          if (type === 'reset') {
            backObj.text = label(type) + '中...'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 4:
          if (type === 'upgrade') {
            backObj.text = label(type) + '中...'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 5:
          if (type === 'run') {
            backObj.text = '启用'
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 6:
          if (type === 'run') {
            backObj.text = '启用中...'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 7:
          if (type === 'run') {
            backObj.text = '禁用中...'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        default:
          backObj.text = label(type)
          break
      }
      return backObj
    },
    // 过滤展示操作按钮
    filterBtn (data) {
      let showBtn = []
      let btnList = ['run', 'reboot', 'upgrade', 'reset']
      if (this.dataType === 'server') { // 展示服务器列表时只有升级功能
        btnList = ['upgrade']
      }
      showBtn = btnList.map(item => {
        if (this.btnState(data, item).going) {
          return item
        }
      }).filter(item => item)
      return showBtn.length ? showBtn : btnList
    },
    // 设备重启/重置/升级
    handleDevice (type, value) {
      let state = this.btnState(value, type).state
      if (!state) return
      let [des, url, tip] = ['', '', '']
      switch (type) {
        case 'upgrade':
          des = '升级'
          url = '/device/upgrade'
          break
        case 'reboot':
          des = '重启'
          tip = '设备将被重启'
          url = '/device/restart'
          break
        case 'reset':
          des = '重置'
          tip = '重置设备后，设备上的信息将被清空'
          url = '/device/reset'
          break
        case 'run':
          if (value.deviceStatus === 0) {
            des = '禁用'
            tip = '禁用设备后，设备将不再产生数据'
          } else {
            des = '启用'
            tip = '启用设备后，设备将产生数据'
          }
          url = '/device/startOrShutdown'
          break
        default:
          des = '启用'
          url = '/device/startOrShutdown'
      }
      // 不可操作时不发送请求
      // console.log('btn state', !this.btnState(type, value).state)
      // if (!this.btnState(type, value).state) return
      if (value.deviceStatus !== 0 && value.deviceStatus !== 1 && value.deviceStatus !== 5) {
        this.$tip(`设备正在${des}中，请稍后重新获取设备状态`, 'waiting')
        return false
      }
      if (type === 'upgrade') {
        this.currentDevice = value
        this.deviceUpdateVisible = true
        this.currentVersion = value.deviceVersion
        GetDeviceVersion({deviceType: value.type}).then(res => {
          this.lastVersion = res.data.deviceVersion
        })
        // 获取设备历史版本信息
      } else {
        this.$affirm({title: `${des}设备`, text: tip, confirm: des},
          (action, instance, done) => {
            if (action === 'confirm') {
              done()
              let subData = {deviceKey: value.deviceKey}
              if (type === 'run') subData.operationCode = value.deviceStatus === 5 ? 0 : 1
              // 升级时单独处理
              this.$load(`正在${des}中...`)
              DeviceHandleUrl(url, subData).then(res => {
                this.$load().close()
                switch (type) {
                  case 'reboot':
                    this.$set(value, 'deviceStatus', 2)
                    break
                  case 'reset':
                    this.$set(value, 'deviceStatus', 3)
                    break
                  case 'upgrade':
                    this.$set(value, 'deviceStatus', 4)
                    break
                  case 'run':
                    if (value.deviceStatus === 0) {
                      this.$set(value, 'deviceStatus', 7)
                    } else {
                      this.$set(value, 'deviceStatus', 6)
                    }
                    break
                }
                this.$tip(`设备正在${des}中，请稍后重新获取设备状态`, 'waiting')
              }).catch(error => {
                this.$load().close()
                if (error.code && error.msg) {
                  this.$set(value, 'deviceStatus', error.data === null ? 1 : error.data)
                }
              })
            } else {
              done()
            }
          })
      }
    },
    // 删除设备
    deleteEquipment (item) {
      let content = {
        title: this.dataType === 'server' ? '删除服务器' : '删除设备',
        text: this.dataType === 'server' ? '删除服务器后，服务器上的设备也将被删除' : '删除设备后，设备上的信息将被清空'
      }
      this.$affirm(
        {
          title: content.title,
          confirm: '删除',
          text: content.text
        }, (action, instance, done) => {
          if (action === 'confirm') {
            if (item.type === 4 || item.type === 5) {
              DeleteCameraBatch([item.deviceKey]).then(res => {
                this.$tip('删除成功')
                this.$emit('refresh')
              })
            } else {
              DeleteDevice({deviceKey: item.deviceKey}).then(res => {
                this.$tip('删除成功')
                this.$emit('refresh')
              })
            }
            done()
          } else {
            done()
          }
        }
      )
    },
    // 手动添加摄像头方法回调
    addCamera (row) {
      this.$emit('handle-add', row)
    },
    handleProgress (event) {
      let progress = this.$tip(`正在导入，请耐心等待…<br>${Math.floor(event.percent)}/100`, 'waiting', () => {})
      if (event.percent === 100) {
        progress.close()
      }
    },
    // 文件上传前拦截处理
    beforeUpload (file) {
      if (file && file.type) {
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$tip('只允许上传Excel文件', 'error')
          return false
        }
      } else {
        this.$tip('请选取需要上传的文件', 'error')
        return false
      }
    },
    // 上传成功时回调
    handleSuccess (res) {
      if (res.result) {
        this.$emit('refresh')
      } else {
        this.$tip(res.msg, 'error', 3000)
      }
    },
    // 上传失败时回调
    handleError (res) {
      this.$tip(res.msg || '上传失败', 'error', 3000)
    },
    deviceUpdate () {
      DeviceUpgrade({deviceKey: this.currentDevice.deviceKey}).then(res => {
        this.$set(this.currentDevice, 'deviceStatus', 4)
        this.deviceUpdateVisible = false
      })
    }
  },
  watch: {
    // 绑定弹框出现时，重新获取社群列表数据
    dialogFormVisible (val) {
      if (val) {
        this.getGroupList()
      }
    }
  },
  filters: {
    handleMsg (val) {
      let msg = ''
      switch (val) {
        case 1:
          msg = '设备状态异常，无法操作'
          break
        case 2:
          msg = '设备重启中，无法进行其他操作'
          break
        case 3:
          msg = '设备重置中，无法进行其他操作'
          break
        case 4:
          msg = '设备升级中，无法进行其他操作'
          break
        case 5:
          msg = '设备未启用，无法操作'
          break
        case 6:
          msg = '设备启用中，无法进行其他操作'
          break
        case 7:
          msg = '设备禁用中，无法进行其他操作'
          break
        default:
          msg = ''
      }
      return msg
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  .ellipsis{
    /*width: calc(100% - 20px);*/
  }
  .cell{
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .el-icon-edit {
    color: #3a8ee6;
    cursor: pointer;
    font-size: 16px;
  }
  .el-icon-refresh{
    margin-left: 15px;
    font-size: 16px;
    color: #3a8ee6;
    cursor: pointer;
  }
  .state__label{
    color: rgba(255,255,255,0.5);
  }
  .delete_btn {
    cursor: pointer;
  }
  .table__btn{
    margin-right: 10px;
    cursor: pointer;
    color: #3a8ee6;
    &[disabled] {
      color: rgba(255,255,255,0.5);
      cursor: default;
    }
    &.ongoing{
      color: rgba(255,255,255,0.5);
      cursor: default;
    }
    &:last-child{
      margin-right: 0;
    }
  }
}
/*设备升级弹框 版本列表*/
.version__list--wrap {
  .radio-box{
    display: block;
    padding-left: 20px;
  }
  .last-version{
    margin: 16px 0 28px;
    > a{
      margin-left: 15px;
      .el-icon-d-arrow-right{
        transform: rotate(90deg);
        &.arrow-up{
          transform: rotate(-90deg);
        }
      }
    }
  }
  .el-scrollbar {
    width: 310px;
    height: 140px;
    padding: 16px 0;
    margin-bottom: 20px;
    overflow: hidden;
    background: #F8F8F8;
    box-sizing: border-box;
    .radio-box{
      &:not(:last-of-type){
        margin-bottom: 14px;
      }
      .el-radio{
        display: block;
      }
      &+.el-radio{
        margin-left: 0;
      }
    }
  }
}
</style>
