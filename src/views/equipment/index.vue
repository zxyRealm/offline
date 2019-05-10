/*
* 设备管理
* @author  张晓元
* @date    2019-05-10
*/
<template>
  <div class="device__main--content">
    <!--------------------模块title---------------------------->
    <div class="g-module-title">
      <h1 class="normal title g-inline">设备管理</h1>
      <el-button type="primary" class="g-fr" @click="showDeviceDialog('device')">添加设备</el-button>
    </div>

    <div class="content--wrap">
      <!--侧边栏-->
      <div class="device--sidebar">

      </div>
      <!--列表内容-->
      <div class="device__list--wrap">
        <div class="device-sub-title">
          <h3 class="name normal g-inline">{{communityInfo.name}}</h3>
          <span class="">一体机（{{deviceInfo.aioDeviceNum}}）</span>
          <span class="">服务器（{{deviceInfo.serverDeviceNum}}）</span>
          <el-radio
            label="unbind"
            data-state="unbind"
            v-model="filterParams.state"
            @click.native.prevent="cancelRadioChecked('unbind')"
          >未绑定（{{deviceInfo.unbindingNum}}）
          </el-radio>
        </div>
        <div class="list-header">
          <el-radio-group v-model="filterParams.state">
            <el-radio
              label="online"
              data-state="online"
              @click.native.prevent="cancelRadioChecked('online')"
            >在线（{{deviceInfo.onLineNum}}）
            </el-radio>
            <el-radio
              label="offline"
              data-state="offline"
              @click.native.prevent="cancelRadioChecked('offline')"
            >离线（{{deviceInfo.offLineNum}}）
            </el-radio>
          </el-radio-group>
          <div class="device-filter select-input--wrap">
            <el-select size="small" class="type-select" v-model="filterParams.type">
              <el-option value="deviceName">名称</el-option>
              <el-option value="deviceKey">序列号</el-option>
            </el-select>
            <el-input
              size="small"
              placeholder="请输入名称"
              class="input-item"
              v-model.trim="filterParams.text"></el-input>
          </div>
          <el-select
            size="small"
            placeholder="请选择出入口"
            class="input-item"
            v-model="filterParams.portalGuid">
            <el-option
              v-for="item in doorList"
              :label="item.name"
              :value="item.portalGuid"></el-option>
          </el-select>
          <el-button size="small" icon="el-icon-search"></el-button>
        </div>
        <ul class="list-wrap">
          <li
            v-for="(item, $index) in deviceList"
            :key="$index"
            :class="'type_' + item.type"
            class="list-item m__item--active">
            <h3 class="item-title normal">
              <span class="ellipsis-20">{{item.name}}</span>
              <i class="el-icon-refresh g-fr" @click="refreshState(item.deviceKey)"></i>
            </h3>
            <div class="more-info">
              <p class="gray ellipsis">{{item.serverName}}</p>
              <p class="gray ellipsis">{{item.name}}</p>
              <p>
                <span class="gray">
                  {{item.deviceKey}}
                </span>
                <span :class="{offline: item.onLineState}" class="g-fr state">{{item.onLineState | state}}</span>
              </p>
            </div>
          </li>
        </ul>
        <custom-pagination
          :total="pagination.total"
        ></custom-pagination>
      </div>

      <!---------------------- 添加弹框表单 ------------------------------->
      <el-dialog
        width="560px"
        :title="dialogTitle"
        :visible.sync="dialogFormVisible">

        <!-------------------- 一体机或者服务器添加 ---------------------------->
        <el-form
          v-if="dialogType === 'aio' || dialogType === 'server'"
          ref="deviceForm"
          algin="left"
          class="dialog__form--wrap w-360"
          :rules="deviceFormRules"
          :label-width="formLabelWidth"
          :model="deviceForm">
          <el-form-item label="名称" prop="deviceName">
            <el-input
              placeholder="请输入名称"
              v-model.trim="deviceForm.deviceName"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="序列号" prop="deviceKey">
            <el-input
              placeholder="请输入序列号"
              v-model.trim="deviceForm.deviceKey"
              autocomplete="off"></el-input>
          </el-form-item>

          <!------------ 仅添加一体机时需要类型参数 ---------------->

          <el-form-item v-if="dialogType === 'aio'" label="选择类型" prop="positionType">
            <el-select v-model="deviceForm.positionType" placeholder="请选择类型">
              <el-option label="出入口设备" :value="1"></el-option>
              <el-option label="通道设备" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>


        <div v-if="dialogType !== 'device'" slot="footer" class="dialog-footer g-center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitDeviceForm">确 定</el-button>
        </div>

        <!------------------------------- 添加设备 --------------------------------->
        <!------------ 区分服务器、一体机（一体机可批量添加） ------->

        <div v-if="dialogType === 'device'" class="device__dialog-content">
          <div class="item">
            <img src="../../assets/device/aio-device.png" alt="">
            <h4 class="">一体机</h4>
            <div class="handle">
              <span class="c-blue" @click="dialogType = 'aio'">手动添加</span>
              <span @click="dialogType = 'batch'">批量添加</span>
            </div>
          </div>
          <div class="item">
            <img src="../../assets/device/server-device.png" alt="">
            <h4>服务器</h4>
            <div class="handle">
              <span @click="dialogType = 'server'">手动添加</span>
            </div>
          </div>
        </div>

        <!-------------------- 批量添加一体机 ----------------------->


      </el-dialog>

    </div>
  </div>
</template>

<script>
import CustomPagination from '@/components/Pagination'

export default {
  name: 'index',
  components: {
    CustomPagination
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入名称'))
      } else if (value.length > 32) {
        callback(new Error('请输入1-32位字符'))
      } else {
        callback()
      }
    }

    const validateKey = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入序列号'))
      } else if (value.length > 16) {
        callback(new Error('请输入16位序列号'))
      } else {
        callback()
      }
    }
    return {
      communityInfo: {
        name: '城西银泰'
      },
      deviceInfo: {
        aioDeviceNum: 23,
        serverDeviceNum: 40,
        onLineNum: 50,
        offLineNum: 30,
        unbindingNum: 30
      },
      logoUrl: {
        0: require('@/assets/device/aio-device.png'),
        1: require('@/assets/device/server-device.png'),
        2: require('@/assets/device/camera-device.png')
      },
      doorList: [ // 出入口列表
      ],
      deviceList: [
        {
          'deviceKey': 'string',   // 设备序列号
          'deviceVersion': 'string',  // 设备版本
          'serverName': 'xxxx',      // 当设备为摄像头时的所属服务器名称
          'serverKey': 'xxxxxx',     // 当设备为摄像头时的所属服务器序列号
          'name': '一体机设备',         // 设备名称
          'onLineState': 0,        // 设备在线状态  0 在线 1：离线
          'type': 0,              // 设备类型：1：服务器 2：一体机
          'ip': '192.168.1.13',      // 设备IP地址
          'createTime': '2019/3/8 16:04'   // 添加时间
        }
      ],
      pagination: {
        total: 100
      },
      filterParams: {
        state: '', // 在线: online、离线: offline、未绑定: unbind
        type: '', // deviceName、deviceKey
        text: '',
        portalGuid: ''
      },
      //  添加表单弹框
      formLabelWidth: '80px',
      dialogFormVisible: false,
      deviceForm: {
        deviceKey: '',
        deviceName: '',
        deviceType: '', // 1：服务器  2：一体机
        groupGuid: '',
        positionType: '' // 1：出入口设备   2：通道设备
      },
      deviceFormRules: {
        deviceKey: [
          { required: true, validator: validateKey, trigger: 'blur' }
        ],
        deviceName: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        positionType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      },
      dialogType: 'device' // 弹框表单类型 device -> 设备 | aio -> 一体机 | batch -> 批量 | server -> 服务器
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    dialogTitle () {
      let text = ''
      switch (this.dialogType) {
        case 'aio':
        case 'batch':
          text = '添加一体机'
          break
        case 'server':
          text = '添加服务器'
          break
        default:
          text = '添加设备'
          break
      }
      return text
    }
  },
  methods: {
    // 刷新设备状态
    refreshState (key) {
      console.log(key)
    },
    // 设备列表翻页
    currentChange (page) {
      console.log('change page', page)
    },
    // 取消单选框选中
    cancelRadioChecked (st) {
      if (this.filterParams.state === st) {
        this.filterParams.state = ''
      } else {
        this.filterParams.state = st
      }
    },
    // 提交设备添加表单

    submitDeviceForm () {
      this.$refs.deviceForm.validate((valid) => {
        if (valid) {
          console.log('can submit form')
        }
      })
    },

    // 显示弹框表单
    showDeviceDialog (type) {
      this.dialogType = type || 'device'
      this.dialogFormVisible = true
    }
  },
  watch: {},
  filters: {
    state (st) {
      let text = '在线'
      switch (st) {
        case 1:
          text = '离线'
          break
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
  .device__main--content {
    .content--wrap {
      height: calc(100% - #{$module-title-height});
    }
    .device--sidebar {
      float: left;
      width: 240px;
      height: calc(100%);
      border-right: 1px solid $gray-border-color;
    }
    .device__list--wrap {
      height: 100%;
      overflow: hidden;
      .device-sub-title {
        padding: 26px 40px;
        border-bottom: 1px solid $gray-border-color;
        .name {
          margin-right: 20px;
          font-size: 20px;
        }
        > span {
          margin-right: 20px;
        }
      }
      .list-header {
        padding: 32px 40px;
        .el-radio {
          margin-right: 20px;
          .el-radio__label {
            color: $global-danger-color;
          }
        }
        .device-filter {
          display: inline-block;
          margin-left: 40px;
        }
        .type-select {
          width: 100px;
        }
        .input-item {
          width: 168px;
          margin-right: 20px;
        }
      }
      .list-wrap {
        padding: 0 40px;
      }
      .list-item {
        position: relative;
        width: 250px;
        height: 190px;
        padding: 10px 20px;
        box-sizing: border-box;
        box-shadow: 0 0 6px 2px rgba(200, 205, 214, 0.30);
        background-repeat: no-repeat;
        background-position: center 34px;
        background-size: 96px;
        &.type_0 {
          background-image: url(../../assets/device/aio-device.png);
        }
        &.type_1 {
          background-image: url(../../assets/device/server-device.png);
        }
        &.type_2 {
          background-image: url(../../assets/device/camera-device.png);
        }
        .el-icon-refresh {
          margin-top: 2px;
          font-size: 16px;
          color: $theme-blue;
          cursor: pointer;
        }
        .more-info {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          line-height: 22px;
          .gray {
            color: $gray-color;
          }
          .state {
            color: $global-success-color;
            &:before {
              content: '';
              display: inline-block;
              height: 10px;
              width: 10px;
              margin-right: 6px;
              border-radius: 10px;
              background-color: $global-success-color;
            }
            &.offline {
              color: $global-danger-color;
              &:before {
                background-color: $global-danger-color;
              }
            }
          }
        }
      }
    }

    /*弹框内容样式*/

    .device__dialog-content {
      margin-bottom: 30px;
      text-align: center;
      .item {
        display: inline-block;
        width: 40%;
        img {
          width: 96px;
          height: 96px;
        }
        h4 {
          font-size: 16px;
          line-height: 30px;
        }
        .handle {
          margin-top: 20px;
          line-height: 1;
          span {
            cursor: pointer;
            &:first-child {
              color: $theme-blue;
            }
            &:nth-child(2) {
              position: relative;
              margin-left: 18px;
              &:after{
                position: absolute;
                left: -10px;
                top: 2px;
                content: '';
                display: inline-block;
                height: 12px;
                width: 2px;
                background-color: $white-text-color;
              }

            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .device__list--wrap {
    .el-radio {
      &[data-state=unbind] {
        .el-radio__label {
          color: $white-text-color;
        }
      }
      &[data-state=online] {
        .el-radio__label {
          color: $global-success-color;
        }
      }
      &[data-state=offline] {
        .el-radio__label {
          color: $global-danger-color;
        }
      }
    }
  }
</style>