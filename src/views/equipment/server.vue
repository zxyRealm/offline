<template>
  <div class="equipment__data--list">
    <!--<div class="data-list-wrap">-->
      <el-scrollbar id="server__scrollbar">
        <device-table
          data-type="server"
          @refresh="getServerEquipment"
          v-model="equipmentList"
        >
        </device-table>
        <el-pagination
          v-if="pagination.total && pagination.total > pagination.length"
          @current-change="getServerEquipment"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total,prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    <!--</div>-->
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {simplifyGroups} from '@/utils'
import DeviceTable from '@/components/DeviceTable'
import {eventObject} from '../../utils/event'
import {GetServerDeviceList} from '../../api/device'
export default {
  name: 'server',
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
      pagination: {}, // 分页信息
      dialogFormVisible: false,
      isSearch: false
    }
  },
  methods: {
    // 自有设备搜索
    search (val) {
      if (val) {
        this.$router.push(`/equipment/mine/search/${val}`)
      } else {
        this.$router.push('/equipment/mine')
      }
    },
    // 弹窗表单提交
    submitForm (data) {
      if (this.dialogOptions.type === 'device') {
        // 添加商户设备
        this.$http('/merchant/device/create', data).then(res => {
          this.dialogFormVisible = false
          this.$tip('创建成功')
          this.getServerEquipment()
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
    // 获取服务器列表
    getServerEquipment (page) {
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      GetServerDeviceList({index: page, searchText: this.$route.params.name || '', length: 8}).then(res => {
        this.emptyText = '暂无设备'
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination || {}
        if (document.getElementById('server__scrollbar')) document.getElementById('server__scrollbar').children[0].scrollTop = 0
      })
    },
    // 重置添加服务器表单
    resetForm () {
      this.$refs.addServerForm.resetFields()
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
    this.isSearch = this.$route.name === 'searchMine'
    this.getServerEquipment()
    eventObject().$on('REFRESH_DEVICE_LIST', this.getServerEquipment)
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
    ...mapState(['loading', 'aliveState'])
  },
  watch: {
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DEVICE_LIST', this.getServerEquipment)
    this.$store.commit('SET_ALIVE_STATE', {
    })
  }
}
</script>

<style lang="scss" scoped>
  .equipment__data--list{
    height: calc(100% - 120px);
    padding: 20px 20px;
    box-sizing: border-box;
    > .el-scrollbar{
      height: 100%;
    }
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
  /*一体机、摄像头批量导入*/
  .excel__import--wrap{
    padding: 15px 50px;
    box-sizing: border-box;
    margin-bottom: 25px;
    .input--wrap{
      margin-top: 18px;
    }
    .el-input{
      width: 240px;
    }
    .import--excel{
      display: inline-block;
      margin-left: 18px;
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
