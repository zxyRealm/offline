<template>
  <td :width="width" :style="styles" class="ob-list-sub-item">
    <div class="sub-item__inner">
      <template v-if="type==='handle'">
        <div class="handle btn-item">
          操作:<br>
          <el-popover
            placement="top"
            trigger="hover">
            <ul class="order-list">
              <li v-show="data.deviceStatus===undefined">尚未【获取】设备状态，无法操作</li>
              <li v-show="data.groupGuid && showDelete">已绑定至社群，无法删除</li>
              <li v-if="data.isHandle===false">{{!showDelete ? '尚无该设备的操作权限，无法操作' : '设备操作权限已上送，无法操作'}}</li>
              <li v-else-if="data.deviceStatus">{{data.deviceStatus | handleMsg}}</li>
            </ul>
            <uu-icon
              slot="reference"
              v-show="!(data.deviceStatus === 0 && !data.groupGuid) || (data.groupGuid && showDelete)"
              type="problem"></uu-icon>
          </el-popover>
        </div>
        <div class="btn-wrap btn-item">
          <el-button
            v-for="(item,$index) in btnList"
            :key="$index"
            :disabled="!btnState(data,item).state"
            @click="handleDevice(item)"
            :class="btnState(data,item).going?item +' ongoing':item"
            class="medium">
            {{btnState(data,item).text}}
          </el-button>
        </div>
        <el-button
          v-if="showDelete"
          class="btn-item"
          :disabled="!!data.groupGuid"
          icon="el-icon-delete"
          @click="deleteEquipment(data)" circle>
        </el-button>
      </template>
      <template v-else-if="type==='state'">
        <p>
          <span class="label__title">设备别名：</span>
          <el-tooltip v-if="!isAmend" :content="data.deviceName" placement="top">
             <span class="ellipsis">{{data.deviceName}}</span>
          </el-tooltip>
          <el-popover
            v-else
            placement="top"
            popper-class="nick_name--popover"
            @show="showPopover"
            @hide="hidePopover"
            v-model="data.popover"
            trigger="click">
            <el-form
              @submit.native.prevent
              ref="tableForm"
              class="table-form"
              :model="equipmentForm"
            >
              <el-form-item :rules="rules" prop="deviceName">
                <el-input type="text" v-model.trim="equipmentForm.deviceName"></el-input>
                <uu-icon type="success" @click.native="changeEquipmentName"></uu-icon>
                <uu-icon type="error" @click.native="data.popover=false"></uu-icon>
              </el-form-item>
            </el-form>
            <el-tooltip slot="reference" :content="data.deviceName" placement="top">
              <a class="ellipsis" href="javascript:void (0)">{{data.deviceName?data.deviceName:'暂无昵称'}}</a>
            </el-tooltip>
          </el-popover>
        </p>
        <p>
          <span class="label__title">运行状态：</span>
          <span>
            <span :class="data.deviceStatus===1?'error-color':'success-color'">{{data.deviceStatus | lineState}}</span>
            <a href="javascript:void (0)" @click="getDeviceState(data)">
              <i v-if="data.deviceStatus!==undefined" class="el-icon-refresh success-color"></i>
              <span v-else>获取</span>
            </a>
          </span>

        </p>
      </template>
      <template v-else>
        <p v-if="!router" v-for="(item,$index) in propList" :key="$index">
          <span class="label__title">{{labelList[$index]?labelList[$index]+'：':''}}</span>
          <el-tooltip v-if="tooltip" :content="format(data[item])" placement="top">
            <span class="ellipsis">{{format(data[item])}}</span>
          </el-tooltip>
          <span v-else class="ellipsis">{{format(data[item])}}</span>
        </p>
        <p v-else>
          <span class="label__title">{{label}}</span><br>
          <router-link :to="router">
            {{text}}
          </router-link>
        </p>
      </template>
      <slot></slot>
    </div>
  </td>
</template>

<script>
import {parseTime} from '@/utils'
import {validateRule} from '@/utils/validate'

export default {
  name: 'ob-list-item',
  props: {
    styles: {
      type: [String, Object],
      default: () => ({
        'minWidth': '74px'
      })
    },
    width: {
      type: String,
      default: 'auto'
    },
    router: {
      type: [String],
      default: ''
    },
    text: {
      type: [String],
      default: ''
    },
    wrap: {
      type: [Boolean],
      default: true
    },
    type: {
      type: [String],
      default: ''
    },
    prop: {
      type: [String],
      default: ''
    },
    label: {
      type: [String],
      default: ''
    },
    data: {
      type: [Object],
      default: () => ({})
    },
    filter: { // 自定义过滤方法
      type: [Function]
    },
    showDelete: { // 列表是否显示删除图标
      type: Boolean,
      default: false
    },
    isAmend: { // 设备别名是否可修改
      type: Boolean,
      default: false
    },
    tooltip: { // 文本内容超出隐藏
      type: Boolean,
      default: false
    },
    isChild: { // 是否是成员社群设备列表
      type: [Boolean],
      default: false
    }
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入设备别名'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          this.$http('/merchant/device/alias/exist', {deviceName: value}, false).then(res => {
            res.data ? callback(new Error('设备别名已存在')) : callback()
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('请输入正确的设备别名'))
        }
      }
    }
    return {
      equipmentForm: {
        deviceName: '',
        deviceKey: ''
      },
      rules: [
        {required: true, validator: validateName, trigger: 'blur'}
      ],
      btnList: ['run', 'reboot', 'upgrade', 'reset']
    }
  },
  methods: {
    // 格式化内容
    format (val) {
      switch (this.type) {
        case 'type':
          return this.notifyType(val)
        case 'time':
          return parseTime(val, '{y}/{m}/{d} {h}:{i}')
        default:
          return val
      }
    },
    notifyType (type) {
      switch (type) {
        default:
          return '到店通知'
      }
    },
    getDeviceState (value, show = true) {
      // 0为在线，1为离线
      if (show === null) {
        return
      }
      this.$http('/device/state/use', {deviceKey: value.deviceKey}).then(res => {
        if (this.data.deviceStatus !== undefined && show) {
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
        if (error.code) {
        }
      })
    },
    handleDevice (type) {
      let [des, url, value] = ['', '', this.data]
      switch (type) {
        case 'upgrade':
          des = '升级'
          url = '/device/upgrade'
          break
        case 'reboot':
          des = '重启'
          url = '/device/restart'
          break
        case 'reset':
          des = '重置'
          url = '/device/reset'
          break
        case 'run':
          if (value.deviceStatus === 0) {
            des = '禁用'
          } else {
            des = '启用'
          }
          url = '/device/startOrShutdown'
          break
        default:
          des = '启用'
          url = '/device/startOrShutdown'
      }
      if (value.deviceStatus !== 0 && value.deviceStatus !== 1 && value.deviceStatus !== 5) {
        this.$tip(`设备【<span class="maxw110 ellipsis">
              ${value.deviceName}
            </span>】正在${des}中，请稍后重新获取设备状态`, 'waiting')
        return false
      }
      this.$affirm({text: `确定${des}设备【<span class="maxw200 ellipsis">${value.deviceName}</span>】?`},
        (action, instance, done) => {
          if (action === 'confirm') {
            done()
            let subData = {deviceKey: this.data.deviceKey}
            if (type === 'run') subData.operationCode = value.deviceStatus === 5 ? 0 : 1
            this.$load(`正在${des}中...`)
            this.$http(url, subData).then(res => {
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
              this.$tip(`设备【<span class="maxw110 ellipsis">${value.deviceName}</span>】正在${des}中，请稍后重新获取设备状态`, 'waiting')
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
            backObj.text = label(type) + '中'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 3:
          if (type === 'reset') {
            backObj.text = label(type) + '中'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 4:
          if (type === 'upgrade') {
            backObj.text = label(type) + '中'
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
            backObj.text = '启用中'
            backObj.going = true
            backObj.state = true
          } else {
            backObj.state = false
          }
          break
        case 7:
          if (type === 'run') {
            backObj.text = '禁用中'
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
    // 删除设备
    deleteEquipment (item) {
      this.$affirm(
        {
          confirm: '确定',
          cancel: '返回',
          text: `确定删除设备【<span class="maxw200 ellipsis">${item.deviceName}</span>】？`
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http('/merchant/device/delete', {deviceKey: item.deviceKey}).then(res => {
              this.$tip('删除成功')
              this.$emit('refresh')
            })
            done()
          } else {
            done()
          }
        }
      )
    },
    // 修改设备昵称
    changeEquipmentName () {
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          this.equipmentForm.deviceKey = this.data.deviceKey
          this.$http('/merchant/device/alias', this.equipmentForm).then(res => {
            this.$tip('修改成功')
            this.$set(this.data, 'popover', false)
            this.data.deviceName = this.equipmentForm.deviceName
          })
        } else {
          console.log('error submit')
        }
      })
    },
    showPopover () {
      this.equipmentForm.deviceName = this.data.deviceName
      this.$set(this.data, 'popover', true)
    },
    hidePopover () {
      if (this.$refs.tableForm) {
        this.$refs.tableForm.clearValidate()
      }
    }
  },
  computed: {
    propList: function () {
      const arr = this.prop.split(',')
      return arr[0] ? arr : []
    },
    labelList: function () {
      const arr = this.label.split(',')
      return arr[0] ? arr : []
    }
  },
  watch: {
    filter: function (val) {
      this.format = val
    }
  },
  filters: {
    time: function (val) {
      return parseTime(val, '{y}/{m}/{d} {h}:{i}')
    },
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
<style lang="scss" rel="stylesheet/scss">
  @import "@/styles/variables.scss";

  $close: url("../../assets/public/data-list/close_btn_bg.png");
  $reset: url("../../assets/public/data-list/reset_btn_bg.png");
  $reboot: url("../../assets/public/data-list/reboot_btn_bg.png");
  $upgrade: url("../../assets/public/data-list/upgrade_btn-bg.png");
  $ongoing: url("../../assets/public/data-list/upgrading_btn_bg.png");
  .order-list {
    li {
      box-sizing: border-box;
      list-style: disc inside;
    }
  }

  .ob-list-sub-item {
    .sub-item__inner{
      position: relative;
      width: 100%;
      padding: 14px 20px;
      box-sizing: border-box;
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
        height: 40px;
        width: 1px;
        background: #E7E7E7;
        opacity: 0.25;
      }
    }
    /*设备操作列样式控制*/
    &:last-child{
      .sub-item__inner{
        > .btn-item + .btn-item {
          margin-left: 18px;
        }
        > *{
          display: inline-block;
          vertical-align: middle;
        }
        &:before {
          display: none;
        }
      }
    }
    .table__label {
      display: inline-block;
      width: 62px;
    }
    &:first-child {
      .ellipsis {
        width: 48px;
      }
    }
    [class^=el-icon] {
      font-size: 16px;
      vertical-align: text-bottom;
    }
    .el-icon-question {
      margin-left: -1px;
      border-radius: 50%;
      color: #515055;
      background: #fff;
    }
    .btn-wrap {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
      .el-button {
        height: 28px;
        margin-left: 0 !important;
        margin-bottom: 4px;
        &.medium {
          &.run, &.disable, &.reset, &.reboot, &.upgrade, &.ongoing {
            height: 30px;
            padding: 8px 15px;
            background-size: cover;
            border: none;
            background-color: transparent;
          }
          &.upgrade {
            background-image: $upgrade;
          }
          &.reset {
            background-image: $reset;
          }
          &.run {
            background-image: $close;
          }
          &.reboot {
            background-image: $reboot;
          }
          &.ongoing {
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: $ongoing repeat-x top left;
              animation: mymove 3.5s linear infinite;
              background-size: auto 100%;
            }
            @keyframes mymove {
              from {
                background-position-x: 0;
              }
              to {
                background-position-x: 100%;
              }
            }
          }
          &[disabled] {
            background: $disable;
            box-shadow: 0 2px 4px 0 #161418;
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .el-button {
      &.is-circle {
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        background: transparent !important;
        color: $orange;
        vertical-align: middle;
        font-size: 16px;
        &[disabled] {
          color: $disable;
          > i {
            color: #515055;
          }
        }
      }
    }
    p {
      text-align: left;
      line-height: 0;
      margin-bottom: 12px;
      > *{
        display: inline-block;
        vertical-align: middle;
        line-height: 18px;
      }
      span {
        &.ellipsis {
          width: 106px;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    > a {
      display: inline-block;
      vertical-align: middle;
    }
    .uu-icon {
      vertical-align: middle;
      margin: 1px 0;
      &.problem {
        margin-top: 8px;
      }
    }
  }

</style>
