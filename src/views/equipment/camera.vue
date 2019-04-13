<template>
  <div class="equipment-camera-wrap">
    <!--设备搜索-->
    <div class="device__search--wrap">
      <el-input
        @keyup.enter.native="search"
        placeholder="设备名称/序列号" v-model.trim="searchValue">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="search">
        </i>
      </el-input>
    </div>
    <div class="data-list-wrap">
      <el-scrollbar v-scroll-top="pagination.index">
        <device-table
          :empty-text="emptyText"
          data-type="camera"
          @refresh="getCameraList"
          v-model="cameraList"
        >
        </device-table>
        <el-pagination
          v-if="pagination.total && pagination.total > pagination.length"
          @current-change="getCameraList"
          @size-change="sizeChange"
          :page-sizes="[10, 20, 30, 50]"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
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
import {DeviceIsExisted, DeviceIsAdded, SearchCamera, CheckCameraName} from '../../api/device'
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
    return {
      emptyText: '数据加载中...',
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
      searchValue: '',
      cameraList: [],
      pagination: {
        index: 1,
        length: 10
      },
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
      }
    }
  },
  methods: {
    search () {
      this.getCameraList(1)
    },
    sizeChange (size) {
      this.pagination.length = size
      this.getCameraList()
    },
    // 获取摄像头 设备列表信息
    getCameraList (page) {
      page = page || this.pagination.index || 1
      this.emptyText = '数据加载中...'
      SearchCamera({
        serverKey: this.$route.query.server_key,
        name: this.searchValue,
        index: page,
        length: this.pagination.length || 10
      }).then(res => {
        this.emptyText = '暂无设备'
        this.cameraList = res.data.content
        this.pagination = res.data.pagination
      }).catch(() => {
        this.emptyText = '数据请求失败'
      })
    },
    showPopover (index) {
      this.ipcListForm = JSON.parse(JSON.stringify(this.deviceList[index]))
    },
    hidePopover () {
      this.$refs.nickNameForm.clearValidate()
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

<style lang="scss" scoped>
.equipment-camera-wrap{
  height: calc(100% - 96px);
}
  .device__sub--nav{
  color: #fff;
}
.device__sub--nav .el-icon-arrow-left{
  cursor: pointer;
}
</style>
