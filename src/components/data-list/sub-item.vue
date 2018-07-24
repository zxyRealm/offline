<template>
  <td :width="width" :style="styles" class="ob-list-sub-item">
    <template v-if="type==='handle'">
      <div class="handle btn-item">
        操作：<br>
        <el-popover
          placement="top"
          trigger="hover">
          <ul class="order-list">
            <li v-show="data.deviceStatus===undefined">获取设备状态后，可进行操作</li>
            <li v-show="data.groupGuid">已绑定至社群，无法删除该设备</li>
            <li v-show="data.deviceStatus===1">设备状态异常（离线），无法操作</li>
          </ul>
          <i slot="reference"
             v-show="!(data.deviceStatus === 0 && !data.groupGuid)"
             style="margin-top: 10px"
             class="el-icon-question"></i>
        </el-popover>
      </div>
      <div class="btn-wrap btn-item">
        <el-button
          :disabled="!btnState(data.deviceStatus,'run').state"
          @click="handleDevice('run')"
          class="medium close">
          {{btnState(data.deviceStatus,'run').text}}
        </el-button>
        <el-button
          :disabled="!btnState(data.deviceStatus,'reboot').state"
          @click="handleDevice('reboot')"
          :class="{ongoing:btnState(data.deviceStatus,'reboot').going}"
          class="medium reboot">
          {{btnState(data.deviceStatus,'reboot').text}}
        </el-button>
        <el-button
          :disabled="!btnState(data.deviceStatus,'upgrade').state"
          @click="handleDevice('upgrade')"
          class="medium upgrade"
          :class="{ongoing:btnState(data.deviceStatus,'upgrade').going}">
          {{btnState(data.deviceStatus,'upgrade').text}}
        </el-button>
        <el-button
          :disabled="!btnState(data.deviceStatus,'reset').state"
          @click="handleDevice('reset')"
          :class="{ongoing:btnState(data.deviceStatus,'reset').going}"
          class="medium reset">
          {{btnState(data.deviceStatus,'reset').text}}
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
        <span>设备别名：</span>
        <el-tooltip v-if="!isAmend" :content="data.deviceName" placement="top">
           <span class="ellipsis">
         {{data.deviceName}}
        </span>
        </el-tooltip>
        <el-popover
          v-else
          placement="top"
          popper-class="nick_name--popover"
          @show="showPopover"
          v-model="data.popover"
          trigger="click">
          <el-form
            @submit.native.prevent
            ref="tableForm"
            class="table-form"
            :model="equipmentForm"
          >
            <el-form-item :rules="rules" prop="deviceName">
              <el-input type="text" v-model="equipmentForm.deviceName"></el-input>
              <uu-icon type="success" @click.native="changeEquipmentName"></uu-icon>
              <uu-icon type="error" @click.native="data.popover=false"></uu-icon>
            </el-form-item>
          </el-form>
          <a href="javascript:void (0)" slot="reference">{{data.deviceName?data.deviceName:'暂无昵称'}}</a>
        </el-popover>
      </p>
      <p>
        <span>运行状态：</span>
        <span class="error-color">{{data.deviceStatus | lineState}}</span>
        <a href="javascript:void (0)" @click="getDeviceState(data)">
          <i v-if="data.deviceStatus!==undefined" class="el-icon-refresh success-color"></i>
          <template v-else>获取</template>
        </a>
      </p>
    </template>
    <template v-else>
      <p v-if="!router" v-for="(item,$index) in propList" :key="$index">
        <span>{{labelList[$index]?labelList[$index]+'：':''}}</span><span class="ellipsis">{{format(data[item])}}</span>
      </p>
      <p v-else>
        {{label}}<br>
        <router-link :to="router">{{text}}</router-link>
      </p>
    </template>
    <slot></slot>
  </td>
</template>

<script>
  import {parseTime} from '@/utils'

  export default {
    name: "ob-list-item",
    props: {
      styles: {
        type: [String, Object]
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
      filter: {
        type: [Function]
      },
      showDelete: {
        type: Boolean,
        default: false
      },
      isAmend: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('设备别名不能为空'))
        } else {
          if (value.length >= 2 && value.length <= 18) {
            this.$http("/merchant/device/alias/exist", {deviceName: value}, false).then(res => {
              !res.data ? callback() : callback('设备别名已存在')
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            });
          } else {
            callback(new Error("别名长度为2-18个字符"))
          }
        }
      };
      return {
        equipmentForm: {
          deviceName: '',
          deviceKey: ''
        },
        rules: [
          {required: true, validator: validateName, trigger: "blur"}
        ],
      }
    },
    methods: {
      // 格式化内容
      format(val) {
        switch (this.type) {
          case 'type':
            return this.notifyType(val);
          case 'time':
            return parseTime(val, '{y}/{m}/{d} {h}:{i}');
          default:
            return val
        }
      },
      notifyType(type) {
        switch (type) {
          default:
            return '到店通知'
        }
      },
      getDeviceState(value) {
        // 0为在线，1为离线
        this.$http("/device/state/use", {deviceKey: value.deviceKey}).then(res => {
          if (this.data.deviceStatus !== undefined) {
            this.$tip("刷新成功")
          }
          this.$set(this.data, 'deviceStatus', res.data);
        })
      },
      handleDevice(type) {
        let [des, url, value] = ['', '', this.data];
        switch (type) {
          case 'upgrade':
            des = '升级';
            url = '/device/upgrade';
            break;
          case 'reboot':
            des = '重启';
            url = '/device/restart';
            break;
          case 'reset':
            des = '重置';
            url = '/device/reset';
            break;
          case 'run':
            if (value.deviceStatus === 1) {
              des = '开启';
            } else {
              des = '关闭'
            }
            // operationCode  开机为0 ，关机为1
            url = '/device/startOrShutdown';
            break;
          default:
            des = '开启';
            url = '/device/startOrShutdown'
        }
        if (value.deviceStatus !== 0&&value.deviceStatus!==1) {
          this.$tip(`设备【BOX】${des}中，请耐心等待...<br>${des}完成后您将收到站内通知。`, 'waiting');
          return false;
        }
        this.$affirm({text: '确定' + des + '设备【' + value.deviceName + '】?'}, (action, instance, done) => {
          if (action === 'confirm') {
            done();
            let subData = {deviceKey: this.data.deviceKey};
            type === 'run' ? subData.operationCode = value.deviceState ? 0 : 1 : '';
            this.$load(`正在${des}中...`);
            switch (type){
              case 'reboot':
                this.$set(value,'deviceStatus',2);
                break;
              case 'upgrade':
                this.$set(value,'deviceStatus',3);
                break;
              case 'reset':
                this.$set(value,'deviceStatus',4);
                break;
            }
            this.$http(url, subData).then(res => {
              this.$load().close();
              switch (type) {
                case 'reboot':
                  // this.$tip("重启成功");
                  break;
                case 'upgrade':
                  this.$tip("设备【BOX】升级中，请耐心等待...<br>" +
                    "升级完成后您将收到站内通知。", 'waiting');
                  break;
                case 'reset':
                  // this.$tip("重置成功");
                  break;
                case 'run':
                  if (value.deviceStatus === 1) {
                    this.$tip("设备开启成功")
                  } else {
                    this.$tip('设备已关闭')
                  }
                  this.$set(value,'deviceStatus',0);
                  break;
                default:
              }
            }).catch(err => {
              this.$load().close()
            });
          } else {
            done()
          }
        })
      },

      // 操作按钮状态控制
      btnState(state, type) {
        //state状态码 0 在线 显示关机 1 离线 显示开机   2重启中 3升级中 4重置中
        // type 状态值 run 开关机  reboot 重启 upgrade 升级 reset 重置
        let label = (type) => {
          switch (type) {
            case 'reboot':
              return '重启';
            case 'upgrade':
              return '升级';
            case 'reset':
              return '重置';
            default:
              return '开机';
          }
        };
        let backObj = {
          text: label(type), //按钮显示内容
          state: false, //按钮状态
          going: false   //是否进行中
        };

        switch (state) {
          case 0:
            if (type === 'run') {
              backObj.text = '关机';
              backObj.state = true
            } else {
              backObj.text = label(type);
              backObj.state = true
            }
            break;
          case 1:
            backObj.text = label(type);
            if (type === 'run') {
              backObj.state = true
            } else {
              backObj.state = false
            }
            break;
          case 2:
            if (type === 'reboot') {
              backObj.text = label(type) + '中';
              backObj.going = true;
              backObj.state = true
            } else {
              backObj.state = false
            }
            break;
          case 3:
            if (type === 'upgrade') {
              backObj.text = label(type) + '中';
              backObj.going = true;
              backObj.state = true
            } else {
              backObj.state = false
            }
            break;
          case 4:
            if (type === 'reset') {
              backObj.text = label(type) + '中';
              backObj.going = true;
              backObj.state = true
            } else {
              backObj.state = false
            }
            break;
          default:
            backObj.text = label(type);
            break;
        }
        return backObj
      },
      // 删除设备
      deleteEquipment(item) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【' + item.deviceName + '】删除？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/merchant/device/delete", {deviceKey: item.deviceKey}).then(res => {
              this.$tip("删除成功");
              this.$emit("refresh");
            });
            done();
          } else {
            done()
          }
        })
      },
      // 修改设备昵称
      changeEquipmentName() {
        this.$refs['tableForm'].validate((valid) => {
          if (valid) {
            this.equipmentForm.deviceKey = this.data.deviceKey;
            this.$http("/merchant/device/alias", this.equipmentForm).then(res => {
              this.$tip("修改成功");
              this.$set(this.data, 'popover', false);
              this.data.deviceName = this.equipmentForm.deviceName;
            })
          } else {
            console.log('error submit')
          }
        });

      },
      // 获取设备操作权限
      devicePermission(val) {
        this.$http("/merchant/device/operationPermission", {guid: val.groupGuid}).then(res => {
          res.data ? this.$set(val, 'deviceState', -1) : ''
        })
      },
      showPopover() {
        this.$set(this.data, 'popover', true);
      }
    },
    computed: {
      propList: function () {
        const arr = this.prop.split(",");
        return arr[0] ? arr : []
      },
      labelList: function () {
        const arr = this.label.split(",");
        return arr[0] ? arr : []
      }
    },
    watch: {
      filter: function (val) {
        this.format = val
      },
      "data.popover"(val) {
        if (!val && this.$refs.tableForm) {
          this.$refs.tableForm.resetFields();
        }
      }
    },
    filters: {
      time: function (val) {
        return parseTime(val, '{y}/{m}/{d} {h}:{i}')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "@/styles/variables.scss";

  $close: url("./image/close_btn_bg.png");
  $reset: url("./image/reset_btn_bg.png");
  $reboot: url("./image/reboot_btn_bg.png");
  $upgrade: url("./image/upgrade_btn-bg.png");
  $ongoing: url("./image/upgrading_btn_bg.png");
  $disable: url('./image/disable_btn_bg.png');
  .order-list {
    li {
      box-sizing: border-box;
      list-style: disc inside;
    }
  }

  .ob-list-sub-item {
    &:first-child {
      .ellipsis {
        width: 48px;
      }
    }
    [class^=el-icon] {
      font-size: 16px;
    }
    .el-icon-question {
      color: #515055;
    }
    &:last-child {
      > .btn-item + .btn-item {
        margin-left: 30px;
      }
      > div {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .btn-wrap {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
      .el-button {
        height: 28px;
        margin-left: 0 !important;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
        &[disabled] {
          background: #515055;
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
      line-height: 1.5;
      margin-bottom: 12px;
      span {
        vertical-align: middle;
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
    }
  }

  .el-button {
    &.medium {
      &.close, &.disable, &.reset, &.reboot, &.upgrade, &.ongoing {
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
      &.close {
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
    }
  }
</style>
