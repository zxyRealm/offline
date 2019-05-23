/*
* 社群列表模式
* @author  张晓元
* @date    2019-05-17
*/
<template>
  <div class="portal__list--wrap">
    <div class="search--wrap">
      <el-input v-model="searchParams.name" size="small" placeholder="请输入出入口"></el-input>
      <el-select
        v-model="searchParams.portalType"
        size="small"
        @change="searchParams.tag = ''">
        <el-option :value="1" label="内部出入口"></el-option>
        <el-option :value="2" label="外部出入口"></el-option>
        <el-option :value="3" label="通道"></el-option>
      </el-select>
      <el-select v-model="searchParams.tag" size="small">
        <el-option
          v-for="tag in tagList(searchParams.portalType)"
          :value="tag.value"
          :label="tag.label"></el-option>
      </el-select>
      <!------------ 搜索按钮 --------------->
      <el-button size="small" icon="el-icon-search" @click=""></el-button>
      <span class="add-btn g-fr" @click="portalDialogVisible = true">添加出入口 / 通道</span>
    </div>
    <ul class="portal--list">
      <li
        v-for="(item, $index) in portalList"
        class="list-item m__item--active"
        @click.self="showSideDialog(item)">
        <h3 class="item-title normal">
          <el-form
            v-if="item.isEdit"
            inline
            :ref="'editNameForm'"
            class="oneline__form--wrap"
            :model="editNameForm"
            :rules="editNameRules">
            <el-form-item prop="portalName">
              <el-input v-model.trim="editNameForm.portalName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="handleEditNameForm(item, $index)">取消</el-button>
              <el-button type="text" @click="submitEditNameForm('editNameForm', $index)">保存</el-button>
            </el-form-item>
          </el-form>
          <template v-else>
            <div class="ellipsis-64">
              {{item.portalName}}
            </div>
            <div class="handle__icon--wrap g-fr">
              <i class="iconfont icon-bianji" @click="handleEditNameForm(item, $index, true)"></i>
              <i class="iconfont icon-shanchu g-danger" @click="deletePortal(item)"></i>
            </div>
          </template>
        </h3>
        <ul class="device__list" @click="showSideDialog(item)">
          <template v-for="(device, $index2) in item.portalDeviceList">
            <li
              v-if="$index2 < 5"
              class="list-sub-item ellipsis"
              :key="$index2">
              {{device.deviceName}}
            </li>
          </template>
          <li
            v-if="item.portalDeviceList && item.portalDeviceList.length > 5"
            class="list-sub-item">更多设备
          </li>
          <!--<el-popover-->
            <!--class="list-sub-item"-->
            <!--style="overflow: hidden"-->
            <!--:width="100"-->
            <!--popper-class="portal__list&#45;&#45;popover"-->
            <!--placement="right-start"-->
            <!--v-model="item.visible">-->
            <!--<ul class="popover-device-list">-->
              <!--<li-->
                <!--v-for="(device, $index2) in item.portalDeviceList"-->
                <!--class="device-item ellipsis"-->
                <!--:key="$index2">-->
                <!--{{device.deviceName}}-->
              <!--</li>-->
            <!--</ul>-->
          <!--</el-popover>-->
        </ul>
        <div class="portal-tag" @click="showSideDialog(item)">
          <i class="iconfont" :class="setTagObj(item.tag).icon"></i>
          {{setTagObj(item.tag).text}}
        </div>
      </li>
    </ul>
    <custom-pagination
      class="not-mt"
      :total="pagination.total"
      @current-change="getPortalList"
    ></custom-pagination>

    <!------------------ 添加出入口/通道 ---------------------->
    <portal-dialog
      :visible.sync="portalDialogVisible"
      @handle-success="handlePortalSuccess">
    </portal-dialog>

    <!--侧边弹出框-->

    <side-dialog
      value-key="portalName"
      :visible.sync="visibleSideDialog"
      :data="currentPortalInfo"
    >
      <div slot="content">
        <h4 class="dialog-sub-title mt50">
          <span>基本信息</span>
          <div v-if="isOwn" class="handle g-fr">
            <template v-if="!sideDialogFormIsEdit">
              <span class="text-btn" @click.stop="sideDialogFormIsEdit = true">编辑</span>
              <span class="text-btn g-danger" @click.stop="deletePortal">删除</span>
            </template>
            <template v-else>
              <span class="text-btn" @click="clearFormValidate">取消</span>
              <span class="text-btn g-danger" @click="submitPortalForm">保存</span>
            </template>
          </div>
        </h4>
        <el-form
          ref="portalForm"
          label-width="80px"
          label-position="left"
          class="g-form-center side-dialog-form"
          :model="portalForm"
          :rules="portalRules"
        >
          <el-form-item label="名称：" prop="portalName">
            <el-input
              v-if="sideDialogFormIsEdit"
              size="small"
              v-model.trim="portalForm.portalName"
              placeholder="请输入名称"></el-input>
            <template v-else>
              {{portalForm.portalName}}
            </template>
          </el-form-item>
          <el-form-item label="类型：">
            {{portalForm.portalType | portalType}}
          </el-form-item>

          <el-form-item
            v-if="portalForm.portalType && portalForm.portalType !== 3"
            label="标签："
            prop="tag">
            <el-radio-group
              v-model="portalForm.tag"
              :disabled="!sideDialogFormIsEdit">
              <el-radio
                v-for="tag in tagList(portalForm.portalType)"
                :label="tag.value">{{tag.label}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="split-line"></div>
        <h4 class="dialog-sub-title">
          <span>已绑设备列表</span>
          <span
            v-if="isOwn"
            class="text-btn g-fr"
            @click="showBindDeviceDialog">绑定设备</span>
        </h4>
        <el-table
          class="portal-table"
          :data="currentPortalInfo.portalDeviceList"
        >
          <el-table-column width="30"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            :width="isOwn ? 140 : 200"
            prop="deviceName"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="deviceKey"
            label="序列号">
          </el-table-column>
          <el-table-column
            v-if="isOwn"
            width="60"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span class="text-btn g-danger" @click="unbindDeviceInPortal(scope.row)">解绑</span>
            </template>
          </el-table-column>
          <el-table-column width="30"></el-table-column>
        </el-table>
      </div>
    </side-dialog>

    <!-- 绑定设备弹框
      -------------------------------------------------->
    <el-dialog
      width="560px"
      title="绑定设备"
      class="bind-dialog"
      :visible.sync="bindDeviceDialogVisible"
    >
      <div class="dialog-search-wrap">

        <div class="device-filter select-input--wrap">
          <el-select
            v-model="searchDeviceParam.type"
            size="small"
            class="type-select">
            <el-option value="deviceName" label="名称"></el-option>
            <el-option value="deviceKey" label="序列号"></el-option>
          </el-select>
          <el-input
            v-model.trim="searchDeviceParam.text"
            size="small"
            class="input-item"
            :placeholder="placeholder"></el-input>
        </div>
        <el-button
          size="small"
          icon="el-icon-search"
          class="g-ml20"
          @click="getUnbindDeviceList"></el-button>
      </div>
      <el-table
        height="240px"
        size="small"
        class="unbind-table dialog-table"
        :data="unbindDeviceListObj.content"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="deviceName"
          label="名称"
        ></el-table-column>
        <el-table-column
          label="序列号"
          prop="deviceKey"
        ></el-table-column>
        <el-table-column
          width="30"
        ></el-table-column>
      </el-table>
      <custom-pagination
        :total="unbindDeviceListObj.pagination.total">
      </custom-pagination>
      <div class="g-center mt24">
        <el-button @click="bindDeviceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="bindDeviceInPortal">绑定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomPagination from '@/components/Pagination'
import PortalDialog from './portal-dialog'
import SideDialog from '@/components/SideDialog'
import { mapState } from 'vuex'
import { tagListByType } from '@/config/portal'
import { validateRule } from '@/utils/validate'
import {
  searchPortalList,
  deletePortal,
  getPortalInfo,
  getPortalNameIsExist,
  addDevcieInPortal,
  deleteDevcieInPortal,
  updatePortal
} from '@/api/community'

import { getGroupDeviceList } from '@/api/device'

export default {
  name: 'PortalList',
  components: {
    CustomPagination,
    PortalDialog,
    SideDialog
  },
  props: {
    currentCommunity: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const validPortalName = (rule, value, callback) => {
      let _this = this
      if (!value) {
        callback(new Error('请输入名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
           if (this.originName === value) {
               callback()
           } else {
               let param = {
                   portal: value,
                   groupGuid: _this.currentManage.groupGuid
               }
               getPortalNameIsExist(param).then((res) => {
                   !res.data ? callback() : callback(new Error('出入口名称已存在'))
               }).catch((err) => {
                   callback(new Error(err.msg || '验证失败'))
               })
           }
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    return {
      searchParams: { // 搜索条件
        name: '',
        portalType: '',
        tag: ''
      },
      portalList: [
        {
          'coordinates': 'string',   // 坐标信息
          'guid': 'string',  // 绑定成员收到社群GUID
          'portalDeviceList': [
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设备1', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            },
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设3333333333备2', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            },
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设备2', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            },
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设备2', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            },
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设备2', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            },
            {
              'deviceKey': 'string',  // 设备序列号
              'deviceName': '我是设备2', // 设备名称
              'deviceType': 0         // 设备类型。 2为一体机。3 为IPC
            }
          ],
          'portalGuid': 'string',     // 出入口的GUID
          'portalName': '出入口',     // 出入口名称
          'portalType': 1,            // 出入口类型： 1：内部出入口，2：外部出入口 3：通道
          'tag': 2
        }
      ],
      pagination: {
        index: 1,
        length: 10,
        total: 10
      },

      editNameForm: {},
      editNameRules: {},
      portalDialogVisible: false,
      visibleSideDialog: false,
      currentPortalInfo: {
        portalDeviceList: []
      }, // 当前选中出入口信息

      sideDialogFormIsEdit: false, // 侧边弹框form是否可编辑
      originName: '', // 出入口编辑前名称
      portalForm: {
        portalType: null,
        portalName: '',
        tag: ''
      },
      portalRules: {
        portalName: [
          { validator: validPortalName, trigger: 'blur' }
        ]
      },
      bindDeviceDialogVisible: false,
      searchDeviceParam: {
        type: 'deviceName',
        name: ''
      },
      unbindDeviceListObj: { // 未绑定社群设备列表
        content: [],
        pagination: {
          total: 0,
          index: 1,
          length: 5
        }
      },
      multipleSelection: [{deviceKey: ''}] // 选中列表
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentManage']),
    placeholder () {
      let text = '请输入名称'
      switch (this.searchDeviceParam.type) {
        case 'deviceKey':
          text = '请输入序列号'
          break
      }
      return text
    },
    isOwn () { // 是否是自有社群
      console.log('current---------', this.currentCommunity)
      return this.currentCommunity.type !== 'joined'.toUpperCase()
    }
  },
  methods: {
    // 获取出入口列表
    getPortalList (page) {
      let _this = this
      let { name, portalType, tag } = this.searchParams
      let params = {
        groupGuid: _this.currentManage.groupGuid,
        guid: '',
        name, portalType, tag,
        index: page || this.pagination.index || 1,
        length: 10
      }
      searchPortalList(params).then((res) => {
        this.portalList = res.data.content
        this.pagination = res.data.pagination
      })
    },
    // 处理编辑表单
    handleEditNameForm (data, index, isShow) {
      this.portalList.map(item => {
        this.$set(item, 'isEdit', false)
      })
      if (isShow) {
        this.$set(this.portalList[index], 'isEdit', true)
        this.editNameForm.portalName = data.portalName
      } else {

      }
    },
    // 提交名称编辑表单
    submitEditNameForm (formName, index) {
    },
    // 获取出入口信息
    getPortalInfo ({ portalGuid }) {
        getPortalInfo({ portalGuid }).then(res => {
            this.currentPortalInfo = res.data
        })
    },
    // 删除出入口
    deletePortal (data) {
      this.$affirm({
        title: '删除',
        text: '是否确认删除？',
        confirm: '删 除',
        confirmType: 'danger'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          deletePortal({ portalGuid: data.portalGuid }).then(() => {
            this.$tip('删除成功')
            this.visibleSideDialog = false
            this.getPortalList()
          })
        }
        done()
      })
    },
    // 根据tag类型展示icon 和 tag 信息
    setTagObj (tag) {
      let obj = {}
      switch (tag) {
        case 1:
          obj = {
            icon: 'icon-dixiacheku',
            text: '地下车库'
          }
          break
        case 2:
          obj = {
            icon: '',
            text: '临街入口'
          }
          break
        case 3:
          obj = {
            icon: 'icon-zhiti',
            text: '直梯'
          }
          break
        case 4:
          obj = {
            icon: 'icon-futi',
            text: '扶梯'
          }
          break
        default:
          obj = {
            icon: 'icon-dixiacheku',
            text: '商场内部'
          }
          break
      }
      return obj
    },
    // 出入口标签列表
    tagList (type) {
      return tagListByType(type)
    },
    // 处理出入口dialog 成功回调
    handlePortalSuccess () {
    },
    showSideDialog (data) {
      // console.log(e.target.parentNode,data)
      this.visibleSideDialog = true
      this.currentPortalInfo = JSON.parse(JSON.stringify(data))
      this.portalForm = JSON.parse(JSON.stringify(data))
      this.originName = JSON.parse(JSON.stringify(data.portalName))
    },
    // 清除表单校验，取消编辑状态
    clearFormValidate () {
      this.sideDialogFormIsEdit = false
      this.$refs.portalForm.clearValidate()
      this.portalForm = JSON.parse(JSON.stringify(this.currentPortalInfo))
    },
    // 提交编辑出入口表单
    submitPortalForm () {
      this.$refs.portalForm.validate((valid) => {
        if (valid) {
          let param = this.portalForm
          updatePortal(param).then(() => {
              this.sideDialogFormIsEdit = false
              this.getPortalInfo(param)
              this.getPortalList()
          })
        }
      })
    },
    // 显示绑定设备弹框
    showBindDeviceDialog () {
      this.bindDeviceDialogVisible = true
      this.getUnbindDeviceList()
    },
    // 获取未绑定设备列表
    getUnbindDeviceList (page) {
      let param = {
        groupGuid: this.currentManage.groupGuid,
        index: page || this.unbindDeviceListObj.pagination.index || 1,
        length: 5,
        bindingState: 0 // 未绑定设备
      }
      param[this.searchDeviceParam.type] = this.searchDeviceParam.text
      getGroupDeviceList(param).then((res) => {
        this.unbindDeviceListObj = res.data
      })
    },
    // 选项改变时更新选中列表
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 出入口上绑定设备
    bindDeviceInPortal () {
      let param = {
        portalGuid: this.currentPortalInfo.portalGuid,
        deviceList: this.multipleSelection
      }
      addDevcieInPortal(param).then(() => {
        this.$tip('绑定成功')
        this.bindDeviceDialogVisible = false
        this.getPortalInfo(param)
        this.getPortalList()
      })
    },
    // 解绑设备
    unbindDeviceInPortal (data) {
      this.$affirm({
        title: '解绑设备',
        text: '是否确认解绑设备',
        confirm: '解绑',
        confirmType: 'danger'
      },(action, instance, done) => {
        if (action === 'confirm') {
          let params = {
            portalGuid: this.currentPortalInfo.portalGuid,
            deviceList: [data.deviceKey]
          }
          deleteDevcieInPortal(params).then(() => {
            this.$tip('解绑成功')
            this.getPortalInfo(params)
            this.getPortalList()
          })
        }
        done()
      })


    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .portal__list--wrap {
    padding-bottom: 30px;
    .search--wrap {
      padding: 20px 40px 0;
      .el-select,
      .el-input {
        width: 168px;
        margin-right: 20px;
        box-sizing: border-box;
      }
      .add-btn {
        display: inline-block;
        height: 32px;
        padding: 0 18px;
        line-height: 32px;
        background: $theme-blue;
        color: $color-white;
        cursor: pointer;
      }
    }
    .portal--list {
      padding: 15px 40px 0;
      overflow: hidden;
      .device__list {
        margin: 10px 0;
        overflow: hidden;
      }
      .portal-tag {
        color: $white-sub-text-color;
        .iconfont {
          margin-right: 5px;
          line-height: 20px;
          vertical-align: middle;
          font-size: 20px;
          color: $theme-blue;
          &.icon-dixiacheku {
            height: 20px;
            font-size: 30px;
          }
        }
      }
    }
    .list-sub-item {
      float: left;
      width: 86px;
      line-height: 30px;
      &:nth-child(2n + 1) {
        margin-right: 36px;
      }
      .more {
        color: $theme-blue;
        cursor: pointer;
      }
    }
  }

  .dialog-sub-title {
    height: 22px;
    line-height: 22px;
    padding: 0 32px;
    font-size: 16px;
    font-weight: normal;
    box-sizing: border-box;
    &:before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 16px;
      margin-right: 20px;
      border-radius: 2px;
      vertical-align: middle;
      background: $theme-blue;
    }
    .text-btn {
      font-size: 14px;
      margin-left: 20px;
    }
  }

  .side-dialog-form {
    margin: 30px 60px;
    .el-input {
      width: 250px;
    }
  }

  .split-line {
    margin: 20px 0 30px;
    border-bottom: 1px solid $gray-border-color;
  }

  .portal-table {
    margin-top: 20px;
  }

  .dialog-search-wrap {
    padding: 0 20px;
    overflow: hidden;

    > div {
      float: left;
    }
  }

  .unbind-table {
    height: 240px;
    min-height: 240px;
    margin-top: 15px;
  }
</style>
<style lang="scss">
  .bind-dialog {
    .el-dialog__body {
      padding-top: 15px;
    }
  }
</style>