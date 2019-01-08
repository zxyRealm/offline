<template>
  <div class="equipment-more-wrap">
    <!--设备搜索-->
    <div class="device__search--wrap">
      <el-input
        @keyup.enter.native="search"
        @blur="search"
        placeholder="设备名称/序列号" v-model.trim="searchValue">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="search">
        </i>
      </el-input>
    </div>
    <div class="data-list-wrap">
      <device-table
        data-type="camera"
        @refresh="getCameraList"
        v-model="cameraList"
      >
      </device-table>
      <el-pagination
        v-if="pagination.total && pagination.total > pagination.length"
        @current-change="getCameraList"
        :current-page="pagination.index"
        :page-size="pagination.length"
        layout="total,prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <!--添加设备弹框-->
    <el-dialog
      title="添加设备"
      :visible.sync="addDeviceVisible"
      class="device__dialog--wrap"
      top="25%"
      width="410px"
    >
      <div class="ad--item">
        <img width="80" src="@/assets/device/camera_device_icon@2x.png" alt="">
        <p>摄像头</p>
        <p class="handle">
          <a href="javascript:void(0)" @click="() => {addDeviceVisible = false;addCameraVisible = true}">手动添加</a>
          <span>|</span>
          <a href="javascript:void(0)" @click="() => {addDeviceVisible = false;ExcelAddVisible = true;}">批量导入</a>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'
import {mapState} from 'vuex'
import DeviceTable from '@/components/DeviceTable'
import {eventObject} from '../../utils/event'
import {DeviceIsExisted, DeviceIsAdded, SearchCamera, GetCameraList, CheckCameraName} from '../../api/device'
import {byKeyDeviceType} from '../../utils'
export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          // 一体机、服务器名称验重
          let subData = {
            name: value,
            serverKey: this.$route.query.server_key
          }
          CheckCameraName(subData).then(res => {
            res.data ? callback(new Error('该名称已存在')) : callback()
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback(new Error('请输入设备名称'))
      }
    }
    // 校验设备序列号
    const validateKey = (rule, value, callback) => {
      if (!value) {
        this.deviceInfo.type = ''
        this.deviceInfo.exist = ''
        callback(new Error('请输入序列号'))
      } else {
        if (value.length === 16) {
          // 设备序列号是否存在
          let dType = byKeyDeviceType(value)
          if (dType.type) {
            if (this.addCameraVisible && new Set([4, 5]).has(dType.type)) {
              DeviceIsExisted({deviceKey: value}).then(res => {
                if (res.data) {
                  // 校验设备是否被绑定过
                  DeviceIsAdded({deviceKey: value}).then(res2 => {
                    if (res2.data) {
                      callback(new Error('该摄像头已添加'))
                    } else {
                      callback()
                    }
                    this.deviceInfo.type = dType.type
                    // 添加一体机时输入了服务器的序列号时提示 序列号不存在 反之也如此
                    callback()
                  }).catch(err => {
                    this.deviceInfo.type = ''
                    this.deviceInfo.exist = ''
                    callback(new Error(err.msg || '服务器异常'))
                  })
                } else {
                  this.deviceInfo.exist = ''
                  this.deviceInfo.type = ''
                  callback(new Error('序列号不存在'))
                }
              }).catch(err => {
                callback(new Error(err.msg || '服务器异常'))
              })
            } else {
              callback(new Error('非摄像头序列号'))
            }
          } else {
            callback(new Error('序列号不存在'))
          }
        } else {
          this.deviceInfo.type = ''
          this.deviceInfo.exist = ''
          callback(new Error('请输入16位序列号'))
        }
      }
    }
    // 校验文件格式
    const validateFile = (rule, value, callback) => {
      let file = this.fileList[0]
      if (!value || !file) {
        callback(new Error('请选取文件'))
      } else {
        let name = file.name.substring(0, file.name.lastIndexOf('.'))
        if (file.raw.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          callback(new Error('只允许上传Excel文件'))
        } else if (name !== '7A45/8A45') {
          callback(new Error('导入文件名与模版不同'))
        } else {
          callback()
        }
      }
    }
    return {
      addCameraVisible: false,
      addDeviceVisible: false,
      ExcelAddVisible: false,
      addCameraForm: { // 添加服务器表单对象
        serverKey: '',
        deviceKey: '',
        type: '',
        name: ''
      },
      addCameraRules: {
        deviceKey: [
          {required: true, validator: validateKey, trigger: ['change', 'blur']}
        ],
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        serverKey: [
          {required: true, message: '请选择服务器', trigger: 'blur'}
        ]
      },
      excelImportForm: {
        filename: '',
        serverKey: ''
      }, // 批量导入一体机、摄像头 表单对象
      excelImportRules: {
        filename: [
          { required: true, validator: validateFile, trigger: 'blur' }
        ]
      },
      fileList: [],
      searchValue: '',
      cameraList: [],
      pagination: {},
      serverInfo: '',
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
      },
      progress: null // 上传进度弹框提示
    }
  },
  methods: {
    search () {
      if (this.searchValue) {
        SearchCamera({serverKey: this.$route.query.server_key, name: this.searchValue}).then(res => {
          this.cameraList = res.data.content
          this.pagination = res.data.pagination
        })
      }
    },
    // 获取IPC 设备列表信息
    getCameraList () {
      GetCameraList({serverKey: this.$route.query.server_key}).then(res => {
        this.cameraList = res.data.content
        this.pagination = res.data.pagination
      })
    },
    showPopover (index) {
      this.ipcListForm = JSON.parse(JSON.stringify(this.deviceList[index]))
    },
    hidePopover (index) {
      this.$refs.nickNameForm.clearValidate()
    },
    // 返回上一页 back为字符串时返回指定路径
    backPrev () {
      if (window.history.length) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.getCameraList()
    eventObject().$on('REFRESH_DEVICE_LIST', this.getCameraList)
  },
  computed: {
    ...mapState(['userInfo'])
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DEVICE_LIST', this.getCameraList)
  }
}
</script>

<style scoped>
.device__sub--nav{
  color: #fff;
}
.device__sub--nav .el-icon-arrow-left{
  cursor: pointer;
}
</style>
