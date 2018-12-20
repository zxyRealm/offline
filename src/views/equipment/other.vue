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
      <device-table
        @refresh="getOtherEquipment"
        v-model="equipmentList"
      >
      </device-table>
      <el-pagination
        v-if="pagination.total && pagination.total > pagination.length"
        @current-change="getMineEquipment"
        :current-page="pagination.index"
        :page-size="pagination.length"
        layout="total,prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
// import {simplifyGroups, byKeyDeviceType} from '@/utils'
import DeviceTable from '@/components/DeviceTable'
import {GetOtherDeviceList} from '../../api/device'
// import {validateRule} from '../../utils/validate'
export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    return {
      searchValue: '',
      currentRouter: '/equipment/mine',
      equipmentEmpty: false,
      deviceInfo: { // 一体机设备信息
        type: '',
        exist: ''
      },
      serverList: [], // 服务器列表
      groupList: [], // 自有社群列表
      equipmentList: [], // 设备列表
      pagination: {}, // 分页信息
      isSearch: false
    }
  },
  methods: {
    // 自有设备搜索
    search (val) {
      this.getOtherEquipment(1)
    },
    // 获取非自有设备
    getOtherEquipment (page) {
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      if (!this.currentManage.id) return
      GetOtherDeviceList({parentId: this.currentManage.id, index: page, searchText: this.searchValue || '', length: 8}).then(res => {
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination
      })
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
  },
  mounted () {
    this.getOtherEquipment()
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
    ...mapState(['loading', 'aliveState', 'currentManage']),
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
    currentManage: {
      handler (val) {
        this.getOtherEquipment()
      },
      deep: true
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
  .equipment__data--list{
    height: calc(100% - 116px);
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
