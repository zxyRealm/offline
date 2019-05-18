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
      <div class="device--sidebar content--sidebar">
        <group-tree
          ref="groupTree"
          :format-list="formatTreeList"
          @current-change="currentNodeChange"
        ></group-tree>
      </div>
      <!--列表内容-->
      <div class="device__list--wrap content__list-wrap">
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
          <a class="g-fr">刷新</a>
        </div>
        <el-scrollbar class="scrollbar-wrap hidden-x">
          <ul class="list-wrap">
            <li
              v-for="(item, $index) in deviceList"
              :key="$index"
              :class="'type_' + item.type"
              class="list-item m__item--active"
              @click.self="showSideDialog(item)">
              <h3 class="item-title normal">
                <el-form
                  v-if="item.isEdit"
                  inline
                  :ref="'editNameForm'"
                  class="oneline__form--wrap"
                  :model="editNameForm"
                  :rules="deviceFormRules">
                  <el-form-item prop="deviceName">
                    <el-input v-model.trim="editNameForm.deviceName"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="text" @click="handleEditNameForm(item, $index)">取消</el-button>
                    <el-button type="text" @click="submitEditNameForm('editNameForm', $index)">保存</el-button>
                  </el-form-item>
                </el-form>
                <template v-else>
                  <div class="ellipsis-64">
                    {{item.name}}
                  </div>
                  <div class="handle__icon--wrap g-fr">
                    <i class="iconfont icon-bianji" @click="handleEditNameForm(item, $index, true)"></i>
                    <i class="iconfont icon-shuaxin" @click="refreshState(item.deviceKey)"></i>
                    <el-popover
                      popper-class="device__handle--popover"
                      placement="right-start"
                      v-model="item.visible">
                      <ul class="popover-handle-list">
                        <li
                          v-for="(btn, $index) in handleList(item.type)"
                          class="handle-item"
                          :key="$index"
                          @click="handleDeviceState(btn)">
                          {{btn.label}}
                        </li>
                      </ul>
                      <i slot="reference" class="iconfont icon-gengduoxinxi"></i>
                    </el-popover>
                  </div>
                </template>
              </h3>
              <div class="more-info">
                <p class="gray ellipsis">{{item.serverName}}</p>
                <p class="gray ellipsis">{{item.name}}</p>
                <p>
                  <span class="gray">
                    {{item.deviceKey}}
                  </span>
                  <span
                    :class="{offline: item.onLineState}"
                    class="g-fr state">
                    {{item.onLineState | filterType('onLineState')}}</span>
                </p>
              </div>
            </li>
          </ul>
          <custom-pagination
            class="not-mt"
            :total="pagination.total"
          ></custom-pagination>
        </el-scrollbar>
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
          class="dialog__form--wrap w-360"
          label-position="left"
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
        <el-form
          v-if="dialogType === 'batch'"
          ref="excelImportForm"
          class="dialog__form--wrap w-280"
          :model="excelImportForm"
          :rules="excelImportRules"
        >
          <p class="form--text">批量导入模版<a :href="downloadSrc">下载模板</a></p>
          <el-form-item prop="filename">
            <el-input
              class="input__suffix--pr42"
              placeholder="请选取文件"
              readonly v-model.trim="excelImportForm.filename">
              <span slot="suffix">
                <el-upload
                  ref="excelUpload"
                  :data="{
                    groupGuid: currentManage.groupGuid,
                    serverKey: $route.query.server_key,
                    merchantGuid: userInfo.developerId
                  }"
                  name="excelFile"
                  class="import--excel white"
                  :action="excelUrl"
                  :on-change="handleChange"
                  :on-progress="handleProgress"
                  :multiple="false"
                  :auto-upload="false"
                  :show-file-list="false"
                  :file-list="fileList">
                  <a href="javascript:void(0)">导入&nbsp;&nbsp;</a>
                </el-upload>
              </span>
            </el-input>

          </el-form-item>
        </el-form>

        <div v-if="dialogType !== 'device'" slot="footer" class="dialog-footer g-center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitDeviceForm(dialogType === 'batch' ? 'excelImportForm' : 'deviceForm')">确 定
          </el-button>
        </div>
      </el-dialog>


      <upload-progress :visible.sync="progressVisible">
        正在导入，请耐心等待…<br>{{percent}}
      </upload-progress>

      <!-------------------------侧边弹出框------------------------->
      <side-dialog
        show-form
        :visible.sync="visibleSideDialog"
        :data="currentDeviceInfo"
        :show-footer="currentDeviceInfo.type !== 3"
      >
        <div slot="content">
          <ul class="info-list">
            <li
              v-for="(info,index) in baseInfoList"
              :key="index"
              class="info-item">
              <span class="label">{{info.label}}：</span>
              <span>
              <template v-if="info.key === 'onLineState'">
                <span :class="currentDeviceInfo[info.key] ? 'g-danger': 'g-success'">
                  {{currentDeviceInfo[info.key] | filterType(info.key)}}
                </span>
                <i class="iconfont icon-shuaxin g-ml15"></i>
              </template>
              <template v-else>
                {{currentDeviceInfo[info.key] | filterType(info.key)}}
              </template>
            </span>
            </li>
          </ul>
          <template v-if="currentDeviceInfo.type === 1">
            <div class="split-line"></div>
            <el-table
              :data="cameraListInfo.content"
            >
              <el-table-column width="30"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                width="160"
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="deviceKey"
                label="序列号">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                width="100"
                prop="portalName"
                label="出入口/通道">
              </el-table-column>
              <el-table-column width="30"></el-table-column>
            </el-table>
            <custom-pagination
              :total="cameraListInfo.pagination.total"
            ></custom-pagination>
          </template>
        </div>
        <ul slot="footer" class="side-dialog-footer">
          <li
            v-for="btn in dialogHandleList"
            class="items"
            :key="btn.type"
            @click="handleDeviceState(btn)"
          >
            {{btn.label}}
          </li>
        </ul>
      </side-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CustomPagination from '@/components/Pagination'
import UploadProgress from '@/components/UploadProgressDialog'
import SideDialog from '@/components/SideDialog'
import { validateRule } from '@/utils/validate'
import GroupTree from '@/components/group-nav/tree'

export default {
  name: 'index',
  components: {
    CustomPagination,
    UploadProgress,
    SideDialog,
    GroupTree
  },
  data () {
    // 校验设备序列号
    const validateKey = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入序列号'))
      } else {
        if (value.length === 16) {
          if (!/^[\dA-Za-z]+$/.test(value)) {
            callback(new Error('仅限数字/字母'))
            return
          }
          // 设备序列号是否存在
          let dType = byKeyDeviceType(value)
          if (dType.type) {
            let currentType = ''
            if (this.$route.name !== 'equipmentCamera' && this.addDialogType === 1 && !new Set([2, 3]).has(dType.type)) {
              callback(new Error('非一体机序列号'))
              currentType = 'aio'
            } else if (this.$route.name !== 'equipmentCamera' && this.addDialogType === 2 && !new Set([1]).has(dType.type)) {
              callback(new Error('非服务器序列号'))
              currentType = 'server'
            } else if (this.$route.name === 'equipmentCamera' && !new Set([4, 5]).has(dType.type)) {
              callback(new Error('非摄像头序列号'))
              currentType = 'camera'
            } else {
              // DeviceIsExisted({deviceKey: value}).then(res => {
              //   if (res.data) {
              //     // 校验设备是否被绑定过
              //     DeviceIsAdded({deviceKey: value}).then(res2 => {
              //       if (res2.data) {
              //         callback(new Error(`该${currentType === 'server' ? '服务器' : '设备'}已添加`))
              //       } else {
              //         callback()
              //       }
              //       if (this.$route.name === 'equipmentCamera') {
              //         this.$set(this.addCameraForm, 'type', dType.type)
              //       } else {
              //         this.$set(this.addServerForm, 'type', dType.type)
              //       }
              //       // 添加一体机时输入了服务器的序列号时提示 序列号不存在 反之也如此
              //       callback()
              //     }).catch(err => {
              //       callback(new Error(err.msg || '服务器异常'))
              //     })
              //   } else {
              //     callback(new Error('序列号不存在'))
              //   }
              // }).catch(err => {
              //   callback(new Error(err.msg || '服务器异常'))
              // })
            }
          } else {
            callback(new Error('序列号不存在'))
          }
        } else {
          callback(new Error('请输入16位序列号'))
        }
      }
    }
    const validateName = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          // 一体机、服务器名称验重
          let subData = { name: value }
          if (this.$route.name === 'equipmentCamera') {
            subData = {
              name: value,
              serverKey: this.$route.query.server_key
            }
            // CheckCameraName(subData).then(res => {
            //   res.data ? callback(new Error('该名称已存在')) : callback()
            // }).catch(err => {
            //   callback(new Error(err.msg || '验证失败'))
            // })
          } else {
            // DeviceAliasExist(subData).then(res => {
            //   res.data ? callback(new Error('该名称已存在')) : callback()
            // }).catch(err => {
            //   callback(new Error(err.msg || '验证失败'))
            // })
          }
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback(new Error('请输入设备名称'))
      }
    }
    const validateFile = (rule, value, callback) => {
      let file = this.fileList[0]
      if (!value || !file) {
        callback(new Error('请选取文件'))
      } else {
        let name = file.name.substring(0, file.name.lastIndexOf('.'))
        if (!fileTypeAllow(file.name, 'xlsx,xls')) {
          callback(new Error('只允许上传xlsx、xls文件'))
        } else if (this.$route.name !== 'equipmentCamera' && name !== '8045') {
          callback(new Error('excel文件名需为“8045”'))
        } else {
          callback()
        }
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
          'type': 2,              // 设备类型：1：服务器 2：一体机
          'ip': '192.168.1.13',      // 设备IP地址
          'createTime': '2019/3/8 16:04'   // 添加时间
        },
        {
          'deviceKey': 'string',   // 设备序列号
          'deviceVersion': 'string',  // 设备版本
          'serverName': 'xxxx',      // 当设备为摄像头时的所属服务器名称
          'serverKey': 'xxxxxx',     // 当设备为摄像头时的所属服务器序列号
          'name': '服务器设备',         // 设备名称
          'onLineState': 0,        // 设备在线状态  0 在线 1：离线
          'type': 1,              // 设备类型：1：服务器 2：一体机
          'ip': '192.168.1.13',      // 设备IP地址
          'createTime': '2019/3/8 16:04'   // 添加时间
        },
        {
          'deviceKey': 'string',   // 设备序列号
          'deviceVersion': 'string',  // 设备版本
          'serverName': 'xxxx',      // 当设备为摄像头时的所属服务器名称
          'serverKey': 'xxxxxx',     // 当设备为摄像头时的所属服务器序列号
          'name': '摄像头设备',         // 设备名称
          'onLineState': 1,        // 设备在线状态  0 在线 1：离线
          'type': 3,              // 设备类型：1：服务器 2：一体机
          'ip': '192.168.1.13',      // 设备IP地址
          'createTime': '2019/3/8 16:04'   // 添加时间
        },
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
        },
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
        total: 30
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
      dialogType: 'device', // 弹框表单类型 device -> 设备 | aio -> 一体机 | batch -> 批量 | server -> 服务器
      downloadSrc: '', // 模板下载地址
      progressVisible: false, // 上传进度弹框
      percent: '', // 上传进度比例
      fileList: [],
      excelImportForm: { // 一体机批量导入form
        filename: ''
      },
      excelImportRules: {
        filename: [
          { required: true, validator: validateFile, trigger: ['change', 'blur'] }
        ]
      },
      editNameForm: {
        name: ''
      },
      visibleSideDialog: false, // 侧边弹出框
      currentDeviceInfo: {}, // 弹框显示的当前设备信息
      dialogHandleList: [
        { label: '重启', type: 'restart'},
        { label: '重置', type: 'reset'},
        { label: '禁用', type: 'disabled'},
        { label: '升级', type: 'upgrade'},
        { label: '删除', type: 'delete'},
      ],
      cameraListInfo: { // 摄像头列表信息
        content: [
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'},
          {name: '拉的说法是解放路上', deviceKey: 'ASFODF20SODF0QWER', portalName: 'afa sdfasd'}
        ],
        pagination: {
          total: 100
        }
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentManage', 'userInfo']),
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
    },
    excelUrl () {
      // let UPLOAD_API = `//${this.serverIp.substring(0, this.serverIp.indexOf(':'))}`
      return `/manage/merchant/device/import` // excel批量导入一体机
    },
    baseInfoList () {
      let arr = [
        { label: '状态', key: 'onLineState' },
        { label: '序列号', key: 'deviceKey' },
        { label: '设备形态', key: 'type' }
      ]
      switch (this.currentDeviceInfo.type) {
        case 1:
          arr = arr.concat([
            { label: '版本', key: 'deviceVersion' },
            { label: 'IP地址', key: 'ip' },
            { label: '设备添加时间', key: 'createTime' }
          ])
          break
        case 2:
          arr = arr.concat([
            { label: '版本', key: 'deviceVersion' },
            { label: '设备类型', key: 'positionType' },
            { label: '出入口', key: 'portalName' },
            { label: '设备添加时间', key: 'createTime' }
          ])
          break
        default:
          arr = arr.concat([
            { label: '所属服务器', key: 'serverName' },
            { label: '设备类型', key: 'positionType' },
            { label: '出入口', key: 'portalName' },
            { label: '版本', key: 'deviceVersion' },
            { label: 'IP地址', key: 'ip' },
            { label: '设备添加时间', key: 'createTime' }
          ])
          break
      }

      return arr
    }
  },
  methods: {
    currentNodeChange (data) {
      console.log('current-change', data)
    },
    // 格式化组织架构数据
    // 非社群结构无子元素时不可点击
    formatTreeList (arr) {
      let list = arr
      if (Array.isArray(arr)) {
        list = arr.map(item => {
          if (item['trieNodeList'] && item['trieNodeList'].length) {
            this.formatTreeList(item['trieNodeList'])
          } else if (item.type !== 'MEMBER' && item.type !== 'JOINED') {
            item.disabled = true
          }
          return item
        })
      }
      return list
    },

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

    submitDeviceForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          switch (this.dialogType) {
            case 'batch': // 批量导入一体机设备
              this.$refs.excelUpload.submit()
              break
            case 'device':
            case 'aio':

              break
          }
          console.log('can submit form')
        }
      })
    },

    // 显示弹框表单
    showDeviceDialog (type) {
      this.dialogType = type || 'device'
      this.dialogFormVisible = true
    },

    // 获取模板下载地址
    getDownloadSrc () {
      // DownloadSrc({name: '8045.xlsx'}).then(res => {
      //   this.downloadSrc = res.data
      // })
    },

    // 显示上传进度
    handleProgress (event) {
      this.percent = Math.floor(event.percent) + '%'
      if (this.percent === '100%') {
        this.progressVisible = false
      }
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file) {
      // 上传完成后会清空文件列表，触发此方法（若包含response说明文件上传已经结束）
      if (!file.response) {
        this.fileList = [file]
        this.excelImportForm.filename = this.fileList[0].name
      } else { // 上传成功或者失败时清空文件列表
        this.progressVisible = false
        this.fileList = []
        this.excelImportForm.filename = ''
        if (file.response.result) {
          this.$tip('导入成功')
        } else {
          if (file.response.msg.indexOf('序列号:') > -1) {
            this.$confirm(file.response.msg.replace('。', '<br>'), '', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              center: true,
              showClose: false,
              dangerouslyUseHTMLString: true
            }).then(() => {
            }).catch(() => {
            })
          } else {
            this.$tip(file.response.msg.replace('。', '<br>') || '上传失败', 'error', 5000)
          }
        }
      }
    },
    /*
    * 设备操作列表
    * @params {String} type 设备类型
    * @return {Array} 设备拥有的操作列表
    */
    handleList (type) {
      let arr = []
      switch (type) {
        case '':
          arr = [
            { label: '同步数据', type: 'sync' },
            { label: '升级', type: 'upgrade' },
            { label: '删除', type: 'delete' }
          ]
          break
        default:
          arr = [
            { label: '禁用', type: 'disabled' },
            { label: '重启', type: 'restart' },
            { label: '重置', type: 'reset' },
            { label: '升级', type: 'upgrade' },
            { label: '删除', type: 'delete' }
          ]
          break
      }
      return arr
    },
    // 显示/隐藏 编辑设备名称form
    handleEditNameForm (data, index, isShow) {
      this.deviceList.map(item => {
        this.$set(item, 'isEdit', false)
      })
      if (isShow) {
        this.$set(this.deviceList[index], 'isEdit', true)
        this.editNameForm.deviceName = data.name
      } else {

      }
    },
    // 编辑设备名称
    submitEditNameForm (formName, index) {
      console.log(this.$refs)
      this.$refs[formName][index].validate((valid) => {
      })
    },
    // 显示侧边弹出框
    showSideDialog (data) {
      this.visibleSideDialog = true
      this.currentDeviceInfo = data
    },
    // 操作设备 重启、重置、禁用、升级、删除
    handleDeviceState (btn) {
      let [msg, confirmType] = ['', '']
      switch (btn.type) {
        case 'restart':
          msg = '设备将被重启'
          break
        case 'reset':
          msg = '重置设备后，设备上的信息将被清空'
          break
        case 'disabled':
          msg = '禁用设备后，设备将不再产生数据'
          confirmType = 'danger'
          break
        case 'upgrade':
          msg = `当前版本：1.2.4<br/><br/><span class="g-title-gray">最新版本：1.2.7</span>`
          break
        default:
          msg = '删除设备后，设备上的信息将被清空'
          confirmType = 'danger'
          break
      }
      console.log(btn.type)
      this.$affirm({ confirmType: confirmType, title: `${btn.label}设备`,text: msg }, (action, instance, done) => {
        done()
      })
    }
  },
  watch: {}
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
              &:after {
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
    .form--text {
      margin-bottom: 14px;
    }
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
      padding: 32px 40px 17px;
      .el-radio {
        margin-right: 20px;
        @media screen and (max-width: 1300px) {
          margin-right: 10px;
        }
        .el-radio__label {
          color: $global-danger-color;
        }
      }
      .device-filter {
        display: inline-block;
        /*margin-left: 40px;*/
      }
      .type-select {
        width: 100px;
      }
      .input-item {
        width: 168px;
        margin-right: 20px;
        @media screen and (max-width: 1300px) {
          margin-right: 15px;
        }
      }
      > a {
        line-height: 32px;
      }
    }
    .scrollbar-wrap {
      height: calc(100% - 160px);
    }
    .list-wrap {
      padding: 15px 40px 0;
      overflow: hidden;
    }
    .list-item {
      position: relative;
      float: left;
      width: 250px;
      height: 190px;
      padding: 10px 20px;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-position: center 42px;
      background-size: 96px;
      margin-bottom: 32px;
      @media screen and (max-width: 1290px) {
        + .list-item {
          margin-left: calc((100% - 2 * 250px));
        }
        &:nth-child(2n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1290px) {
        + .list-item {
          margin-left: calc((100% - 3 * 250px) / 2);
        }
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1440px) {
        + .list-item {
          margin-left: calc((100% - 4 * 252px) / 3);
        }
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1670px) {
        + .list-item {
          margin-left: calc((100% - 5 * 250px) / 4);
        }
        &:nth-child(5n + 1) {
          margin-left: 0;
        }
      }

      &.type_0 {
        background-image: url(../../assets/device/aio-device.png);
      }
      &.type_1 {
        background-image: url(../../assets/device/server-device.png);
      }
      &.type_2 {
        background-image: url(../../assets/device/camera-device.png);
      }
      .handle__icon--wrap {
        .iconfont {
          display: inline-block;
          line-height: 22px;
          vertical-align: top;
          color: $theme-blue;
          cursor: pointer;
          margin-left: 4px;
        }
      }
      .el-icon-refresh {
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

  /*操作按钮列表样式*/
  .popover-handle-list {
    .handle-item {
      padding: 0 15px;
      line-height: 24px;
      cursor: pointer;
      &:hover {
        background-color: nth($white-dark-bg, 2);
      }
      &:last-child {
        color: $global-danger-color;
      }
    }
  }

  .info-list {
    width: 300px;
    margin: 0 auto;
    .info-item {
      height: 32px;
      line-height: 32px;
      span {
        display: inline-block;
      }
    }
    .label {
      width: 150px;
    }
  }
  .split-line{
    margin: 20px 0;
    border-bottom: 1px solid $gray-border-color;
  }
  .side-dialog-footer{
    height: 50px;
    border-top: 1px solid $gray-border-color;
    .items{
      float: left;
      width: 20%;
      line-height: 50px;
      text-align: center;
      color: $theme-blue;
      cursor: pointer;
      &:last-child{
        color: $global-danger-color;
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