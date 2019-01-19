<template>
  <div class="equipment__data--list">
    <!--<div class="data-list-wrap">-->
      <el-scrollbar v-scroll-top="pagination.index">
        <device-table
          :empty-text="emptyText"
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
          layout="total, prev, pager, next, jumper"
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
      serverList: [], // 服务器列表
      equipmentList: [], // 设备列表
      pagination: {} // 分页信息
    }
  },
  methods: {
    // 获取服务器列表
    getServerEquipment (page) {
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      this.emptyText = '数据加载中...'
      GetServerDeviceList({index: page, searchText: this.$route.params.name || '', length: 8}).then(res => {
        this.emptyText = '暂无设备'
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination || {}
      }).catch(() => {
        this.emptyText = '数据请求失败'
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
    this.getServerEquipment()
    eventObject().$on('REFRESH_DEVICE_LIST', this.getServerEquipment)
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
