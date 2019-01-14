<template>
  <div class="equipment__data--list">
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
      <el-scrollbar v-scroll-top="pagination.index">
        <device-table
          data-type="aio"
          @refresh="getMineEquipment"
          v-model="equipmentList"
        >
        </device-table>
        <el-pagination
          v-if="pagination.total && pagination.total > pagination.length"
          @current-change="getMineEquipment"
          @size-change="sizeChange"
          :page-sizes="[10, 20, 30]"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import DeviceTable from '@/components/DeviceTable'
import {eventObject} from '../../utils/event'
import {GetOwnDeviceList} from '../../api/device'
export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    return {
      emptyText: '数据加载中...',
      searchValue: '',
      currentRouter: '/equipment/mine',
      dialogOptions: { // dialog 弹窗配置 类型 标题文本
        type: 'device',
        title: '添加设备'
      },
      importType: 1, // 批量导入类型 1 一体机批量导入 2 摄像头批量导入
      equipmentEmpty: false,
      dialogType: 1, // 1 ：服务器 2：一体机 3：摄像头
      deviceInfo: { // 一体机设备信息
        type: '',
        exist: ''
      },
      dialogForm: { // dialog 表单
        deviceKey: '',
        deviceName: '',
        type: ''
      },
      fileList: [], // 上传的文件列表
      serverList: [], // 服务器列表
      groupList: [], // 自有社群列表
      equipmentList: [], // 设备列表
      pagination: {
        length: 10
      }, // 分页信息
      dialogFormVisible: false,
      isSearch: false,
      progress: null
    }
  },
  methods: {
    // 自有设备搜索
    search (val) {
      this.getMineEquipment()
    },
    sizeChange (size) {
      this.pagination.length = size
      this.getMineEquipment()
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
      GetOwnDeviceList({index: page, searchText: this.searchValue || '', length: this.pagination.length || 10}).then(res => {
        this.emptyText = '暂无设备'
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination || {}
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
    eventObject().$on('REFRESH_DEVICE_LIST', this.getMineEquipment)
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
    ...mapState(['loading', 'aliveState', 'userInfo', 'serverIp']),
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
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DEVICE_LIST', this.getMineEquipment)
    this.$store.commit('SET_ALIVE_STATE', {
      // pagination: this.pagination
    })
  }
}
</script>

<style lang="scss" scoped>
  .equipment__data--list{
    height: calc(100% - 106px);
  }
  .device__dialog--wrap{
    .ad--item{
      display: inline-block;
      margin:0 26px;
      text-align: center;
      box-sizing: border-box;
      > img{
        margin-bottom: 6px;
      }
      .handle{
        margin-top: 10px;
        font-size: 12px;
        span{
          margin: 0 12px;
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
