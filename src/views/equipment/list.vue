<template>
  <div class="equipment-list-wrap g-prl20">
    <div class="device__sub--title">
      <router-link to="/equipment/list">
        设备列表
      </router-link>
      <router-link to="/equipment/children">
        出入口设备
      </router-link>
    </div>
    <div class="device__sub--title title-pd0">
      <el-select
        @change="changeRoute"
        :class="{'router-link-active': currentRouter === $route.path}"
        popper-class="device__sub--popper" v-model="currentRouter" placeholder="请选择">
        <el-option label="自有设备" value="/equipment/list/own"></el-option>
        <el-option label="非自有设备" value="/equipment/list/other"></el-option>
      </el-select>
      <!--<router-link class="drop__link" @click="() => dropHide ? dropHide = false : dropHide = true" to="/equipment/list/own">-->
        <!--<span>自有设备</span>-->
        <!--<div class="drop__select&#45;&#45;wrap" v-show="dropHide">-->
          <!--<p :class="{active: $route.path === '/equipment/list/own'}">自有设备</p>-->
          <!--<p :class="{active: $route.path === '/equipment/list/other'}" >非自有设备</p>-->
        <!--</div>-->
      <!--</router-link>-->
      <router-link to="/equipment/list/server">
        服务器
      </router-link>
    </div>
    <!--<ob-list-empty-->
      <!--top="106px"-->
      <!--v-if="!equipmentList.length"-->
      <!--:supply="!isSearch ? '少量添加点击【添加一体机】按钮，大批量添加点击【添加服务器】按钮。' : ''"-->
      <!--:text="isSearch?'查询不到该设备':'暂无设备'">-->
    <!--</ob-list-empty>-->
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {simplifyGroups, makeCustomName, byKeyDeviceType} from '@/utils'
import DeviceTable from '@/components/DeviceTable'
import {validateRule} from '../../utils/validate'

export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    // 校验设备序列号
    const validateKey = (rule, value, callback) => {
      if (!value) {
        this.deviceInfo.type = ''
        this.deviceInfo.exist = ''
        callback(new Error('请输入16位序列号'))
      } else {
        if (value.length === 16) {
          // 设备序列号是否存在
          this.$http('/device/deviceKey', {deviceKey: value}).then(res => {
            if (res.data) {
              // 校验设备是否被绑定过
              this.$http('/merchant/device/exist', {deviceKey: value}, false).then(res2 => {
                let dType = byKeyDeviceType(value)
                if (!res2.data) {
                  this.deviceInfo.exist = false
                } else {
                  this.deviceInfo.exist = true
                }
                // 添加一体机时输入了服务器的序列号时提示 序列号不存在 反之也如此
                if ((this.dialogType === 1 && dType.type === 1) || (this.dialogType === 2 && (dType.type === 2 || dType.type === 3)) || (this.dialogType === 3 && (dType.type === 4 || dType.type === 5))) {
                  this.deviceInfo.type = dType.type
                  callback()
                } else {
                  this.deviceInfo.exist = ''
                  callback(new Error('设备序列号不存在'))
                }
              }).catch(err => {
                this.deviceInfo.type = ''
                this.deviceInfo.exist = ''
                callback(new Error(err.msg || '服务器异常'))
              })
            } else {
              this.deviceInfo.exist = ''
              this.deviceInfo.type = ''
              callback(new Error('设备序列号不存在'))
            }
          })
        } else {
          this.deviceInfo.type = ''
          this.deviceInfo.exist = ''
          callback(new Error('请输入16位序列号'))
        }
      }
    }
    const validateName = (rule, value, callback) => {
      if (value) {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          // 一体机、服务器名称验重
          let url = '/merchant/device/alias/exist'
          let subData = {name: value}
          switch (this.dialogType) {
            case 3:
              // 摄像头名称验重
              url = '/device/existName'
              subData = {
                name: value,
                serverKey: this.addCameraForm.serverKey
              }
              break
          }
          this.$http(url, subData, false).then(res => {
            res.data ? callback(new Error('设备别名已存在')) : callback()
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('请输入正确的设备别名'))
        }
      } else {
        callback(new Error('请输入设备名称'))
      }
    }
    return {
      dropHide: true,
      currentRouter: '/equipment/list/own',
      options3: [{
        label: '单设备',
        options: [{
          value: '/equipment/mine',
          label: '自有设备'
        }, {
          value: '/equipment/other',
          label: '非自有设备'
        }]
      }, {
        options: [{
          value: '/equipment/server',
          label: '服务器'
        }]
      }],
      dialogOptions: { // dialog 弹窗配置 类型 标题文本
        type: 'device',
        title: '添加设备'
      },
      equipmentEmpty: false,
      addCameraVisible: false, // 添加服务器dialog 是否显示
      addAioVisible: false, // 添加一体机dialog 是否显示
      dialogType: 1, // 1 ：服务器 2：一体机 3：摄像头
      deviceInfo: { // 一体机设备信息
        type: '',
        exist: ''
      },
      addAioForm: { // 添加一体机表单对象
        deviceKey: '',
        deviceName: ''
      },
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
        ]
      },
      addAioRules: {
        deviceKey: [
          {validator: validateKey, trigger: ['change', 'blur']}
        ],
        deviceName: [
          {validator: validateName, trigger: 'blur'}
        ]
      },
      dialogForm: { // dialog 表单
        deviceKey: '',
        deviceName: '',
        type: ''
      },
      btnArray: [
        {text: '添加一体机', content: '少量添加点这里', showPopover: false},
        {text: '添加服务器', content: '大批量添加点这里', showPopover: false}
      ],
      menu2: [ // 导航栏配置信息
        {title: '自有设备', index: '/equipment/mine'},
        {title: '非自有设备', index: '/equipment/children'}
      ],
      groupList: [], // 自有社群列表
      equipmentList: [], // 设备列表
      pagination: {}, // 分页信息
      dialogFormVisible: false,
      isSearch: false
    }
  },
  methods: {
    // 切换路由
    changeRoute (path) {
      this.$router.push(path)
    },
    // 自有设备搜索
    search (val) {
      if (val) {
        this.$router.push(`/equipment/mine/search/${val}`)
      } else {
        this.$router.push('/equipment/mine')
        this.getGroupList()
      }
    },
    // 弹窗表单提交
    submitForm (data) {
      if (this.dialogOptions.type === 'device') {
        // 添加商户设备
        this.$http('/merchant/device/create', data).then(res => {
          this.dialogFormVisible = false
          this.$tip('创建成功')
          this.getMineEquipment()
        }).catch(() => {
          this.dialogFormVisible = false
        })
      } else {
        // 绑定社群
        data.groupNickName = this.groupList[data.groupGuid].groupNickName
        data.groupGuid = this.groupList[data.groupGuid].groupGuid
        this.bindCommunity(data)
      }
    },
    // 获取社群树形结构数据
    getGroupList () {
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
      })
    },
    showDialog (type, data) {
      this.dialogFormVisible = false
      this.dialogOptions.type = type || 'device'
      this.dialogOptions.title = type === 'device' ? '添加设备' : '绑定社群'
      if (this.dialogOptions.type === 'device') {
        this.dialogForm = {
          deviceKey: '',
          deviceName: '',
          type: ''
        }
      } else {
        this.dialogForm = {
          deviceKey: data.deviceKey,
          deviceName: data.deviceName,
          groupGuid: '',
          deviceScene: ''
        }
      }
      if (type === 'community' && !this.groupList.length) {
        this.$affirm({
          text: '没有可绑定的社群，前往<a href="/community/create">创建社群</a>。'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }, 'caution')
      } else {
        this.dialogFormVisible = true
      }
    },
    // 获取自有设备
    getMineEquipment (page) {
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      this.$http('/device/list', {index: page, searchText: this.$route.params.name || '', length: 8}).then(res => {
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination
        if (!this.groupList.length) {
          this.getGroupList()
        }
      })
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
            this.$set(value, 'groupGuid', null)
            this.$refs.deviceItem[index].getDeviceState(value, value.deviceStatus === undefined ? null : undefined)
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
      this.$load('设备绑定中...')
      data.name = data.deviceName
      this.$http('/device/binding', data).then(res => {
        this.$load().close()
        this.$tip('绑定成功')
        this.getMineEquipment(this.pagination.index)
      }).catch(() => {
        this.$load().close()
      })
    },
    // 添加服务器
    handleBtn (index) {
      this.deviceInfo = {
        type: '',
        exist: ''
      }
      if (index === 1) {
        this.dialogType = 1
      } else {
        this.dialogType = 2
      }
      this.addAioVisible = true
    },
    // 添加一体机设备、添加服务器
    addAioDevice (formName) {
      // 添加商户设备
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = {
            deviceName: this.addAioForm.deviceName,
            deviceKey: this.addAioForm.deviceKey,
            type: this.deviceInfo.type
          }
          this.$http('/merchant/device/create', subData).then(res => {
            this.addAioVisible = false
            this.$tip('创建成功')
            this.getMineEquipment()
          }).catch(() => {
            this.addAioVisible = false
          })
        }
      })
    },
    // 显示添加摄像头弹框
    showAddCameraForm (row) {
      this.dialogType = 3
      this.deviceInfo = {
        type: '',
        exist: ''
      }
      this.addCameraForm = {
        serverKey: row.deviceKey,
        deviceKey: '',
        name: '',
        type: ''
      }
      this.addCameraVisible = true
      this.$nextTick(() => {
        this.$refs.addCameraForm.clearValidate()
      })
    },
    addCameraDevice (formName) {
      // console.log(this.addCameraForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addCameraForm.type = this.deviceInfo.type
          this.$http('/device/deviceCamera/info/add', this.addCameraForm).then(res => {
            this.$tip('添加成功')
            this.addCameraVisible = false
            this.getGroupList()
          })
        }
      })
    },
    // 第一次进入设备列表，给出操作提示，点击页面后提示消失
    firstCreate () {
      this.btnArray.map(item => {
        item.showPopover = false
        return item
      })
      window.removeEventListener('click', this.firstCreate)
    }
  },
  created () {
    this.$http('/firstCheck', {name: 'insight_device_list_first'}).then(res => {
      if (res.data) {
        this.btnArray.map(item => {
          item.showPopover = true
          return item
        })
        window.addEventListener('click', this.firstCreate)
      }
    })
    this.isSearch = this.$route.name === 'searchMine'
    this.getMineEquipment()
  },
  filters: {
    type: function (val) {
      switch (val) {
        case 1:
          return '分析终端'
        case 2:
          return '客行分析一体机'
        default:
          return '人脸抓拍一体机'
      }
    }
  },
  computed: {
    ...mapState(['loading', 'aliveState']),
    textState: {
      get () {
        let [cName, text] = ['', '']
        switch (this.deviceInfo.type) {
          case 1:
            text = '服务器'
            break
          case 2:
            text = `客行分析一体机`
            break
          case 3:
            text = `人脸抓拍一体机`
            break
          case 4:
            text = `客行分析摄像头`
            break
          case 5:
            text = `人脸抓拍摄像头`
            break
        }
        switch (this.deviceInfo.exist) {
          case '':
            cName = ''
            text = ''
            break
          case false:
            cName = 'safe'
            text = `可添加的${text}`
            break
          case true:
            cName = 'danger'
            text = `已添加的${text}`
            break
        }
        return {text: text, name: cName}
      },
      set (val) {
        this.textValue = val
      }
    }
  },
  watch: {
    '$route': {
      handler (val) {
        this.isSearch = (val.name === 'searchMine')
        this.equipmentList = []
        this.getMineEquipment()
      },
      deep: true
    },
    addAioVisible (val) {
      if (val) {
        this.addAioForm = {
          deviceName: '',
          deviceKey: ''
        }
        this.$nextTick(() => {
          if (this.$refs.addAioForm) {
            this.$refs.addAioForm.clearValidate()
          }
        })
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_ALIVE_STATE', {
      // pagination: this.pagination
    })
  }
}
</script>

<style lang="scss" scoped>
  .device__sub--title{
    position: relative;
    height: 56px;
    line-height: 40px;
    padding-top: 14px;
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
