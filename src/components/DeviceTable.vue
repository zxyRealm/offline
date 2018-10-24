<template>
  <div>
    <el-table
      border
      :data="data"
    >
      <el-table-column
        min-width="120"
        label="名称">
        <template slot-scope="scope">
          <span class="ellipsis">{{scope.row.deviceName || '暂无'}}</span>
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
                ref="tableForm"
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
              <i slot="reference" v-if="scope.row.deviceType !== 1" class="el-icon-edit"></i>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        width="80"
        label="状态">
        <template slot-scope="scope">
          <span :class="stateClass(scope.row.deviceStatus)">{{scope.row.deviceStatus | lineState}}</span>
          <i @click="getDeviceState(scope.row)" class="el-icon-refresh success-color"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceKey"
        label="序列号"
        width="180">
      </el-table-column>
      <el-table-column
        label="设备类型"
        width="120">
        <template slot-scope="scope">
          {{scope.row.deviceType | deviceType}}
        </template>
      </el-table-column>
      <el-table-column
        label="用途"
        width="120">
        <template slot-scope="scope">
          {{scope.row.deviceType | deviceType}}
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="绑定社群">
        <template slot-scope="scope">
          <span class="ellipsis-28">{{scope.row.type === 3 ? '-': scope.row.groupName || '暂无'}}</span>
          <a href="javascript:void (0)" v-if="scope.row.type !== 3" @click="showDialogForm(scope.row, scope.$index)">{{scope.row.groupName ? '解绑' : '绑定'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        width="100"
        label="下辖设备">
        <template slot-scope="scope">
          <span class="ellipsis-28">{{scope.row.id}}</span>
          <router-link :to="'/equipment/service/' + scope.row.deviceKey">管理</router-link>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120"
        label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.deviceType !== 1">
             <span
               v-for="(item,$index) in btnList"
               :key="$index"
               :disabled="!btnState(scope.row,item).state"
               @click="handleDevice(item, scope.row)"
               :class="btnState(scope.row,item).going?item +' ongoing':item"
               class="table__btn">
            {{btnState(scope.row,item).text}}
          </span>
          </template>
          <template v-else>
            <a href="javascript:void (0)" class="table_btn g-mr18">导入设备</a>
            <a href="javascript:void (0)" class="table_btn g-mr18" @click="addCamera(scope.row)">手动添加</a>
          </template>
          <span class="error-color delete_btn" @click="deleteEquipment(scope.row)">删除</span>
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
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'
import {simplifyGroups} from '../utils'

export default {
  name: 'device-table',
  props: {
    value: {
      type: [Array],
      default: () => []
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
          this.$http('/merchant/device/alias/exist', {name: value}, false).then(res => {
            console.log(res)
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
      btnList: ['run', 'reboot', 'upgrade', 'reset']
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
    }
  },
  methods: {
    // 显示修改昵称popover
    showPopover (index) {
      if (this.$refs.tableForm) {
        this.$nextTick(() => {
          this.$refs.tableForm.clearValidate()
        })
      }
      this.equipmentForm = JSON.parse(JSON.stringify(this.data[index]))
      console.log(index)
    },
    // 隐藏修改昵称popover
    hidePopover (index) {
      // console.log(this.$refs.tableForm)
      // if (this.$refs.tableForm) {
      //   this.$refs.tableForm.clearValidate()
      // }
    },
    // 修改设备昵称
    changeEquipmentName (index) {
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          this.$http('/merchant/device/alias', this.equipmentForm).then(res => {
            this.$tip('修改成功')
            this.$set(this.data[index], 'popover', false)
            this.data[index].deviceName = this.equipmentForm.deviceName
          })
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
        text: '将设备从社群解绑，您将无法查看该设备数据/无法操作设备。<br>确定要将【<span class="maxw110 ellipsis">' + value.deviceName + '</span>】设备从【<span class="maxw110 ellipsis">' + value.groupName + '</span>】社群解绑？'
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
    // 设备重启/重置/升级
    handleDevice (type, value) {
      let [des, url] = ['', '']
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
    // 手动添加摄像头方法回调
    addCamera (row) {
      this.$emit('handle-add', row)
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
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  .ellipsis{
    width: calc(100% - 20px);
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
    color: rgba(255,255,255,0.5);
    margin-right: 10px;
    cursor: default;
    &.going{
      cursor: pointer;
    }
    &:last-child{
      margin-right: 0;
    }
  }
}
.cell {

}
</style>
