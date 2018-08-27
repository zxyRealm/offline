<template>
  <div class="equipment-more-wrap">
    <uu-sub-tab back :menu-array="[{title:'用途详情'}]"></uu-sub-tab>
    <div class="ob-table-wrap">
      <el-table
        :data="deviceList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          label="编号"
          width="130px">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="别名"
          width="130px">
          <template slot-scope="scope">
            <el-popover
              popper-class="nick_name--popover"
              placement="top"
              @show="showPopover(scope.$index)"
              @hide="hidePopover(scope.$index)"
              v-model="scope.row.nickNamePopover"
              trigger="click">
              <el-form
                @submit.native.prevent
                ref="nickNameForm"
                :rules="rules"
                class="table-form"
                :model="ipcListForm"
              >
                <el-form-item prop="name">
                  <el-input type="text" v-model="ipcListForm.name"></el-input>
                  <uu-icon type="success" @click.native="changeIpcName(scope.$index)"></uu-icon>
                  <uu-icon type="error" @click.native="scope.row.nickNamePopover = false"></uu-icon>
                </el-form-item>
              </el-form>
              <a href="javascript:void (0)" class="ellipsis" slot="reference">
                {{scope.row.name}}
              </a>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          width="130px"
          label="用途">
          <template slot-scope="scope">
            <!--1 客行分析  2 人脸抓拍-->
            {{scope.row.type == 1 ? '客行分析' : '人脸抓拍'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceKey"
          label="序列号"
          width="150px">
        </el-table-column>
        <el-table-column
          align="center"
          prop="useDescribe"
          label="用途描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'

export default {
  name: 'index',
  data () {
    const validateName = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          callback()
        } else {
          callback(new Error('请输入正确的别名'))
        }
      } else {
        callback(new Error('请输入别名'))
      }
    }
    return {
      deviceList: [],
      ipcListForm: {
        name: '',
        deviceKey: '',
        cameraKey: ''
      },
      rules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取IPC 设备列表信息
    getDeviceList () {
      this.$http('/device/useDescribe', {deviceKey: this.$route.params.key}).then(res => {
        this.deviceList = res.data
      })
    },
    // 修改IPC设备别名
    changeIpcName (index) {
      this.$refs.nickNameForm.validate(valid => {
        if (valid) {
          this.$http('/device/deviceCamera/name/update', this.ipcListForm).then(res => {
            this.getDeviceList()
            this.$tip('修改成功')
          })
          this.deviceList[index].nickNamePopover = false
        } else {
          console.log('validate fail')
        }
      })
    },
    showPopover (index) {
      this.ipcListForm = JSON.parse(JSON.stringify(this.deviceList[index]))
    },
    hidePopover (index) {
      this.$refs.nickNameForm.clearValidate()
    }
  },
  created () {
    this.getDeviceList()
  }
}
</script>

<style scoped>

</style>
