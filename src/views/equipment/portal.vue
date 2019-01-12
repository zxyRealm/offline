<template>
  <div class="portal__content--wrap">
    <div class="group__select--wrap">
      <el-select value-key="guid" @change="groupChange" v-model="currentGroup">
        <el-option :value="0" label="全部社群"></el-option>
        <el-option
          v-for="(item, $index) in groupList"
          :key="$index"
          :value="item"
          :label="item.name"></el-option>
      </el-select>
    </div>
    <div class="data-list-wrap">
      <el-scrollbar v-scroll-top="pagination.index">
        <el-table
          border
          :data="portalList"
        >
          <el-table-column
            prop="portalName"
            width="120"
            :show-overflow-tooltip="true"
            align="center"
            label="出入口">
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            label="设备">
            <template slot-scope="scope">
              <el-scrollbar class="table__scrollbar--wrap">
                <ul class="table__device--list">
                  <li v-for="(item, index) in scope.row.portalDeviceList" :key="index" class="vam">
                    <span class="ellipsis">{{item.name}}</span>
                    <i class="el-icon-delete" @click="deletePortalDevice(item)"></i>
                  </li>
                  <li class="vam"
                      style="line-height: 80px"
                      v-if="!scope.row.portalDeviceList || !scope.row.portalDeviceList.length">
                    暂无设备
                  </li>
                </ul>
              </el-scrollbar>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <a href="javascript:void(0)" @click="showAddDialog(scope.row)">添加设备</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getPortalEquipment"
          @size-change="sizeChange"
          :page-sizes="[4, 10, 20, 30]"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total,sizes,prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    </div>

    <!--添加设备弹框-->
    <ob-dialog-form
      title="添加设备"
      :visible.sync="AddDeviceVisible"
      :showButton="false"
    >
      <div slot="content" class="device__dialog--list">
        <div v-show="ownDeviceList.length" class="c-grey fs12 g-mb12">设备名称</div>
        <div v-show="!ownDeviceList.length" class="tac">
          暂无设备
        </div>
        <el-scrollbar>
          <el-checkbox-group
            v-model="checkedItems">
            <el-checkbox
              v-for="(item) in ownDeviceList"
              :label="item.deviceKey"
              :disabled="item.disabled"
              :key="item.deviceKey">{{item.deviceName}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer mt16">
        <el-button class="cancel" @click="AddDeviceVisible = false">返 回</el-button>
        <el-button class="affirm" type="primary" @click="portalAddDevice">添加</el-button>
      </div>
    </ob-dialog-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {GetOwnDeviceList, PortalDeviceList, PortalMemberDevice, GetAllDevice } from '../../api/device'
import {MemberNoFloor, PortalBatchBindDevice, PortalUnbindDevice} from '../../api/community'

export default {
  name: 'portal',
  data () {
    return {
      emptyText: '数据加载中...',
      checkedItems: [],
      ownDeviceList: [], // 自有设备列表
      AddDeviceVisible: false,
      currentPortal: '', // 当前出入口信息
      currentGroup: 0, // 当前选中社群
      groupList: [
      ], // 自有社群列表
      portalList: [
      ], // 出入口设备列表
      pagination: {
        length: 4
      } // 设备列表分页信息
    }
  },
  created () {},
  mounted () {
    this.getGroupList()
    this.getPortalEquipment()
  },
  computed: {
    ...mapState(['userInfo', 'currentManage'])
  },
  methods: {
    getGroupList () {
      if (!this.currentManage.id) return
      MemberNoFloor({groupId: this.currentManage.id}).then(res => {
        this.groupList = res.data
      })
    },
    // 获取出入口设备列表
    getPortalEquipment (page, size) {
      if (!this.currentManage.id) return
      if (this.currentGroup && this.currentGroup.guid) {
        PortalMemberDevice({groupSonId: this.currentGroup.guid, index: page || this.pagination.index || 1, length: size || this.pagination.length || 4}).then(res => {
          this.emptyText = '暂无数据'
          this.portalList = res.data.content || []
          this.pagination = res.data.pagination
        })
      } else {
        PortalDeviceList({groupId: this.currentManage.id, index: page || this.pagination.index || 1, length: size || this.pagination.length || 4}).then(res => {
          this.emptyText = '暂无数据'
          this.portalList = res.data.content || []
          this.pagination = res.data.pagination
        })
      }
    },
    // 添加出入口设备
    portalAddDevice () {
      let checkSet = new Set(this.checkedItems)
      let checked = this.ownDeviceList.filter(item => !item.disabled).filter(item => checkSet.has(item.deviceKey))
      if (!this.ownDeviceList.length) {
        this.$tip('请先添加设备', 'error')
        return false
      } else if (!checked.length) {
        this.$tip('请选择要添加的设备', 'error')
        return false
      }
      let arr = checked.map(item => {
        return {
          deviceKey: item.deviceKey,
          name: item.deviceName,
          merchantGuid: this.userInfo.developerId,
          portalGuid: this.currentPortal.portalGuid
        }
      })
      PortalBatchBindDevice({deviceGroupPortalReqs: arr}).then(res => {
        this.$tip('添加成功')
        this.AddDeviceVisible = false
        this.getPortalEquipment()
      })
    },
    // 显示添加设备弹框
    showAddDialog (row) {
      this.checkedItems = row.portalDeviceList.map(item => item.deviceKey)
      GetAllDevice().then(res => {
        this.currentPortal = row
        let deviceKeySet = new Set(this.currentPortal.portalDeviceList.map(item => item.deviceKey))
        res.data = res.data.map(item => {
          if (deviceKeySet.has(item.deviceKey)) {
            item.disabled = true
          }
          return item
        })
        this.ownDeviceList = res.data || []
        this.AddDeviceVisible = true
      })
    },
    deletePortalDevice (data) {
      this.$affirm({
        title: '删除绑定关系',
        confirm: '删除',
        text: '删除关系后，该出入口下将不包含该设备'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          PortalUnbindDevice({deviceKey: data.deviceKey, portalGuid: data.portalGuid}).then(res => {
            this.$tip('删除成功')
            this.getPortalEquipment()
          })
        }
        done()
      })
    },
    sizeChange (size) {
      this.getPortalEquipment(this.pagination.index, size)
    },
    groupChange () {
      this.getPortalEquipment()
    }
  },
  watch: {
    currentManage: {
      handler (val) {
        this.currentGroup = ''
        this.getGroupList()
        this.getPortalEquipment(1, 4)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.portal__content--wrap{
  height: calc(100% - 68px);
  .data-list-wrap{
    height: calc(100% - 50px);
  }
}
.group__select--wrap{
  padding: 16px 20px 0;
  .el-select{
    width: 154px;
  }
}
/*添加设备弹框*/
.device__dialog--list{
  width: 320px;
  height: 240px;
  margin: 0 auto;
  background: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
  .el-scrollbar {
    height: calc(100% - 30px);
    overflow: hidden;
    .el-checkbox{
      display: block;
      margin-bottom: 12px;
      &+.el-checkbox{
        margin-left: 0;
      }
    }
  }
}

.table__scrollbar--wrap{
    height: 80px;
    overflow: hidden;
    .table__device--list{
      width: 210px;
      margin: 0 auto;
      font-size: 12px;
      li:not(:last-of-type) {
        margin-bottom: 12px;
      }
      .ellipsis{
        width: 192px;
      }
      .el-icon-delete{
        color: #f85650;
        cursor: pointer;
      }
    }
  }
</style>
