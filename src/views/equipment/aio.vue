<template>
  <div class="equipment__data--list">
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
          data-type="aio"
          @refresh="getAioEquipment"
          v-model="equipmentList"
        >
        </device-table>
        <el-pagination
          v-if="pagination.total && pagination.total > pagination.length"
          @current-change="getAioEquipment"
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
import {GetOwnDeviceList, GetGroupDeviceList} from '../../api/device'
export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    return {
      emptyText: '数据加载中...',
      searchValue: '',
      serverList: [], // 服务器列表
      groupList: [], // 自有社群列表
      equipmentList: [], // 设备列表
      pagination: {
        length: 10
      } // 分页信息
    }
  },
  methods: {
    // 自有设备搜索
    search (val) {
      this.getAioEquipment()
    },
    sizeChange (size) {
      this.pagination.length = size
      this.getAioEquipment()
    },
    // 获取自有设备
    getAioEquipment (page) {
      if (!this.currentManage.id) return
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      this.emptyText = '数据加载中...'
      GetGroupDeviceList({groupGuid: this.currentManage.id, index: page, searchText: this.searchValue || '', length: this.pagination.length || 10}).then(res => {
        this.emptyText = '暂无设备'
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination || {}
      }).catch(() => {
        this.emptyText = '数据请求失败'
      })
    }
  },
  created () {
    this.getAioEquipment()
    eventObject().$on('REFRESH_DEVICE_LIST', this.getAioEquipment)
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
    ...mapState(['loading', 'aliveState', 'currentManage', 'userInfo', 'serverIp'])
  },
  watch: {
    currentManage: {
      handler (val) {
        this.getAioEquipment()
      },
      deep: true
    }
  },
  beforeDestroy () {
    eventObject().$off('REFRESH_DEVICE_LIST', this.getAioEquipment)
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
