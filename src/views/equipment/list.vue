<template>
  <div class="equipment-list-wrap g-prl20">
    <div class="device__sub--title">
      <router-link to="/equipment/list">
        设备列表
      </router-link>
      <router-link to="/equipment/portal">
        出入口设备
      </router-link>
    </div>
    <div v-if="$route.name !== 'equipmentPortal'" class="device__sub--nav title-pd0" :class="{'camera-nav': $route.name === 'equipmentCamera'}">
      <template v-if="$route.name === 'equipmentCamera'">
        <i class="el-icon-arrow-left" @click="backPrev"></i>
        <span>{{$route.query.name}} / 摄像头管理</span>
      </template>
      <template v-else>
        <router-link to="/equipment/list/aio">
          一体机
        </router-link>|
        <router-link to="/equipment/list/server">
          服务器
        </router-link>
      </template>
      <el-button class="affirm fr medium" @click="addDeviceDialog">添加设备</el-button>
    </div>
    <router-view></router-view>

    <!--添加设备弹框-->
    <el-dialog
      title="添加设备"
      :visible.sync="addDeviceVisible"
      class="device__dialog--wrap"
      width="410px"
    >
      <div v-if="$route.name === 'equipmentCamera'" class="ad--item">
        <img width="80" src="@/assets/device/camera_device_icon@2x.png" alt="">
        <p>摄像头</p>
        <p class="handle">
          <a href="javascript:void(0)" @click="() => {addDeviceVisible = false;addCameraVisible = true}">手动添加</a>
          <span>|</span>
          <a href="javascript:void(0)" @click="() => {addDeviceVisible = false;ExcelAddVisible = true;}">批量导入</a>
        </p>
      </div>
      <template v-else>
        <div class="ad--item">
          <img width="80" src="@/assets/device/aio_device_icon@2x.png" alt="">
          <p>一体机</p>
          <p class="handle">
            <a href="javascript:void(0)" @click="() => {addDialogType = 1;addDeviceVisible = false;addServerVisible = true}">手动添加</a>
            <span>|</span>
            <a href="javascript:void(0)" @click="() => {addDeviceVisible = false;ExcelAddVisible = true;}">批量导入</a>
          </p>
        </div>
        <div class="ad--item">
          <img width="80" src="@/assets/device/server_device_icon@2x.png" alt="">
          <p>服务器</p>
          <p class="handle">
            <a href="javascript:void(0)" @click="() => {addDialogType = 2;addServerVisible = true;addDeviceVisible = false}">手动添加</a>
          </p>
        </div>
      </template>
    </el-dialog>
    <!--添加摄像头-->
    <ob-dialog-form
      class="dialog__content--vm"
      @close="resetForm('addCameraForm')"
      :show-button="false"
      :title="'添加摄像头'"
      :visible.sync="addCameraVisible">
      <div slot="form" class="vam" :style="{height: '160px'}">
        <el-form
          ref="addCameraForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="addCameraForm"
          :rules="addCameraRules"
        >
          <el-form-item label="名称：" prop="name">
            <el-input placeholder="请输入设备名称" v-model.trim="addCameraForm.name"></el-input>
          </el-form-item>
          <el-form-item label="序列号：" prop="deviceKey">
            <el-input placeholder="请输入16位序列号" v-model.trim="addCameraForm.deviceKey"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          @click="() => {addCameraVisible = false;addDeviceVisible = true}">返 回</el-button>
        <el-button
          class="affirm" type="primary"
          @click="addCameraDevice('addCameraForm')">
          {{'添加'}}
        </el-button>
      </div>
    </ob-dialog-form>
    <!--添加一体机、服务器-->
    <ob-dialog-form
      class="dialog__content--vm"
      @close="resetForm('addServerForm')"
      :show-button="false"
      :title="addDialogType === 1 ? '添加一体机': '添加服务器'"
      :visible.sync="addServerVisible">
      <div slot="form" class="vam" style="height: 160px">
        <el-form
          slot="form"
          ref="addServerForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="addServerForm"
          :rules="addServerRules"
        >
          <el-form-item label="名称：" prop="deviceName">
            <el-input placeholder="请输入设备名称" v-model.trim="addServerForm.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="序列号：" prop="deviceKey">
            <el-input placeholder="请输入16位序列号" v-model.trim="addServerForm.deviceKey"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="() => {addServerVisible = false; addDeviceVisible = true}">返 回</el-button>
        <el-button class="affirm" type="primary" @click="addServerDevice('addServerForm')">添加</el-button>
      </div>
    </ob-dialog-form>

    <!--批量添加一体机、摄像头 （Excel导入）-->
    <ob-dialog-form
      class="dialog__content--vm"
      @close="resetForm('excelImportForm')"
      @open="getDownloadSrc"
      :show-button="false"
      :title="$route.name !== 'equipmentCamera' ? '添加一体机': '添加摄像头'"
      :visible.sync="ExcelAddVisible">
      <div slot="content" class="excel__import--wrap">
        <p>批量导入（请按模版格式导入）  <a :href="downloadSrc">下载模板</a></p>
        <el-form
          slot="form"
          ref="excelImportForm"
          block-message
          style="width: 360px"
          label-position="left"
          label-width="72px"
          class="white mt16"
          :model="excelImportForm"
          :rules="excelImportRules"
        >
          <el-form-item label="导入文件:" prop="filename">
            <el-input placeholder="请选取文件" readonly v-model="excelImportForm.filename"></el-input>
            <el-upload
              ref="excelUpload"
              :data="{groupGuid: currentManage.id, serverKey: $route.query.server_key, merchantGuid: userInfo.developerId}"
              name="excelFile"
              class="import--excel white"
              :action="excelUrl"
              :on-change="handleChange"
              :on-progress="handleProgress"
              :multiple="false"
              :auto-upload="false"
              :show-file-list="false"
              :file-list="fileList">
              <a href="javascript:void(0)">导入</a>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="() => {ExcelAddVisible = false;addDeviceVisible = true}">返 回</el-button>
        <el-button class="affirm" type="primary" @click="ExcelImportDevice('excelImportForm')">添加</el-button>
      </div>
    </ob-dialog-form>
    <upload-progress :visible.sync="progressVisible">
     正在导入，请耐心等待…<br>{{percent}}
    </upload-progress>
  </div>
</template>
<script>
import {AddCamera, DeviceIsExisted, DeviceIsAdded, CheckCameraName, DeviceAliasExist, AddDevice, DownloadSrc} from '../../api/device'
import {byKeyDeviceType, fileTypeAllow} from '../../utils'
import {validateRule} from '../../utils/validate'
import {mapState} from 'vuex'
import {eventObject} from '../../utils/event'
import UploadProgress from '../../components/UploadProgressDialog'
export default {
  name: 'index',
  components: {
    UploadProgress
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
              DeviceIsExisted({deviceKey: value}).then(res => {
                if (res.data) {
                  // 校验设备是否被绑定过
                  DeviceIsAdded({deviceKey: value}).then(res2 => {
                    if (res2.data) {
                      callback(new Error(`该${currentType === 'server' ? '服务器' : '设备'}已添加`))
                    } else {
                      callback()
                    }
                    if (this.$route.name === 'equipmentCamera') {
                      this.$set(this.addCameraForm, 'type', dType.type)
                    } else {
                      this.$set(this.addServerForm, 'type', dType.type)
                    }
                    // 添加一体机时输入了服务器的序列号时提示 序列号不存在 反之也如此
                    callback()
                  }).catch(err => {
                    callback(new Error(err.msg || '服务器异常'))
                  })
                } else {
                  callback(new Error('序列号不存在'))
                }
              }).catch(err => {
                callback(new Error(err.msg || '服务器异常'))
              })
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
          let subData = {name: value}
          if (this.$route.name === 'equipmentCamera') {
            subData = {
              name: value,
              serverKey: this.$route.query.server_key
            }
            CheckCameraName(subData).then(res => {
              res.data ? callback(new Error('该名称已存在')) : callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          } else {
            DeviceAliasExist(subData).then(res => {
              res.data ? callback(new Error('该名称已存在')) : callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
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
        } else if ((this.$route.name !== 'equipmentCamera' && name !== '7045-8045') || (this.$route.name === 'equipmentCamera' && name !== '7A45-8A45')) {
          callback(new Error('导入文件名与模版不同'))
        } else {
          callback()
        }
      }
    }
    return {
      percent: 0,
      progressVisible: false,
      addDeviceVisible: false,
      addCameraVisible: false,
      ExcelAddVisible: false,
      addServerVisible: false,
      fileList: [],
      downloadSrc: '', // 模板下载地址
      addDialogType: 1, // 添加设备类型 1 一体机 2 服务器
      progress: null, // 文件上传进度提示框
      currentRoute: '/equipment/list/own',
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
          { required: true, validator: validateFile, trigger: ['change', 'blur'] }
        ]
      },
      addServerForm: { // 添加服务器表单对象
        groupGuid: '',
        deviceKey: '',
        deviceName: '',
        type: ''
      },
      addServerRules: {
        deviceKey: [
          {required: true, validator: validateKey, trigger: ['change', 'blur']}
        ],
        deviceName: [
          {required: true, validator: validateName, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 返回上一页 back为字符串时返回指定路径
    backPrev () {
      if (window.history.length) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    // 显示添加设备弹框
    addDeviceDialog () {
      if (!this.currentManage.id) {
        this.$tip('管理社群不存在, 请先添加社群！', 'error', 3000)
      } else {
        this.addDeviceVisible = true
      }
    },
    // 添加摄像头设备
    addCameraDevice (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.addCameraForm))
          subData.serverKey = this.$route.query.server_key
          subData.groupGuid = this.currentManage.id
          AddCamera(subData).then(res => {
            this.$tip('添加成功')
            this.addCameraVisible = false
            eventObject().$emit('REFRESH_DEVICE_LIST')
          })
        }
      })
    },
    // 添加服务器、一体机
    addServerDevice (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.addServerForm))
          subData.groupGuid = this.currentManage.id
          AddDevice(subData).then(res => {
            this.$tip('添加成功')
            this.addServerVisible = false
            eventObject().$emit('REFRESH_DEVICE_LIST')
          })
        }
      })
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
          eventObject().$emit('REFRESH_DEVICE_LIST')
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
    // 导入设备
    ExcelImportDevice (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ExcelAddVisible = false
          this.progressVisible = true
          this.$refs.excelUpload.submit()
        }
      })
    },
    resetForm (formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    // 获取模板下载地址
    getDownloadSrc () {
      DownloadSrc({name: this.$route.name === 'equipmentCamera' ? '7A45-8A45.xlsx' : '7045-8045.xlsx'}).then(res => {
        this.downloadSrc = res.data
      })
    }
  },
  created () {
  },
  computed: {
    ...mapState(['userInfo', 'serverIp', 'currentManage']),
    excelUrl () {
      let UPLOAD_API = `//${this.serverIp.substring(0, this.serverIp.indexOf(':'))}`
      let url = `${UPLOAD_API}/manage/device/deviceCamera/info/addBatch` // excel批量导入摄像头信息
      if (this.$route.name !== 'equipmentCamera') url = `${UPLOAD_API}/manage/merchant/device/import` // excel批量导入一体机
      return url
    }
  },
  watch: {
    ExcelAddVisible (val) {
      if (val) {
        this.getDownloadSrc()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .equipment-list-wrap{
    padding: 0!important;
  }
  .device__sub--nav{
    .el-icon-arrow-left{
      cursor: pointer;
    }
    &.camera-nav{
      color: #fff;
    }
  }
  .device__sub--title{
    position: relative;
    height: 56px;
    line-height: 40px;
    padding: 14px 20px 0;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
    box-sizing: border-box;
    &.title-pd0{
      height: 40px;
      padding-top: 0;
    }
    .router-link-active{
      border-bottom: 2px solid #f8f8f8;
      color: #fff;
    }
    > a{
      display: inline-block;
      padding: 0 5px;
      color: rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      & + a {
        margin-left: 44px;
      }
    }
    .el-select{
      .el-input{
        background: transparent;
      }
    }
    .drop__select--wrap{
      position: absolute;
      top: 42px;
      left: 0;
      line-height: 24px;
      background: #fff;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      z-index: 99;
      overflow: hidden;
      p{
        padding: 0 15px;
        &.active{
          background: #EBEBEB;
        }
      }
    }
  }
  ul.wrap{
    li{
      height: 20px;
      border-bottom: 1px solid #ddd;
      &.item:last-of-type{
        border-color: #f00;
      }
    }
  }
  .data-list-wrap {
    height: calc(100% - 80px);
  }

  .data-list-wrap > .el-scrollbar {
    height: 100%;
  }
</style>
<style lang="scss">
  /*搜索框*/
  .device__search--wrap{
    height: 47px;
    padding-top: 16px;
    line-height: 28px;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
