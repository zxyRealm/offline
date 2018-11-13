<template>
  <div class="equipment-children-wrap g-prl20">
    <uu-sub-tab
      :back="$route.name === 'searchChildren'"
      search
      @remote-search="search"
      placeholder="快速查找设备"
      :menu-array="$route.name !== 'searchChildren' ? menu2 : [{title: '返回'}]">
    </uu-sub-tab>
    <div class="equipment-children-container" :style="{top:'50px'}">
      <div class="ec-side-nav dashed-border" v-if="isSearch">
        <ob-group-nav
          rights
          :expandedAll="false"
          :expanded-keys="expandedKeys"
          ref="childGroup"
          only-checked
          type="community"
          node-key="uniqueKey"
          v-model="groupList"
          @current-change="currentChange"></ob-group-nav>
      </div>
      <div class="ec-container" :class="{'dashed-border':isSearch}">
        <div v-show="isSearch" class="filter__list--wrap">
          <el-select clearable v-model="filterValue.type" placeholder="全部类型">
            <el-option :value="2" label="客行分析一体机"></el-option>
            <el-option :value="3" label="人脸抓拍一体机"></el-option>
            <el-option :value="4" label="客行分析"></el-option>
            <el-option :value="5" label="人脸抓拍"></el-option>
          </el-select>
        </div>
        <el-scrollbar class="ob-scrollbar" v-if="equipmentList.length">
          <device-table
            @refresh="getEquipmentList"
            v-model="tableList"
          ></device-table>
        </el-scrollbar>
        <ob-list-empty v-if="!equipmentList.length" :size="small" :text="tipMsg"></ob-list-empty>
      </div>
    </div>
  </div>
</template>

<script type="application/javascript">
import {mapState} from 'vuex'
import DeviceTable from '@/components/DeviceTable'
import {simplifyGroups} from '../../utils'

export default {
  name: 'index',
  components: {
    DeviceTable
  },
  data () {
    return {
      filterValue: {
        type: ''
      },
      menu2: [
        {title: '自有设备', index: '/equipment/mine'},
        {title: '非自有设备', index: '/equipment/children'}
      ],
      groupList: [],
      currentGroup: {}, // 选中社群
      equipmentList: [], // 设备列表
      pagination: {}, // 分页参数
      selectValue: {},
      expandedKeys: []
    }
  },
  methods: {
    // 获取非自有社群
    getGroupList (key) {
      this.$http('/group/list/childGroup').then(res => {
        // 过滤掉最外层单店、成员社群、无外来社群的管理员社群
        // res.data = simplifyGroups(res.data)
        this.groupList = res.data.filter(item => {
          return item.role === 0
        })
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentGroup : false) || key || (this.currentGroup.uniqueKey ? this.currentGroup : false) || this.groupList[0]
        this.$nextTick(() => {
          if (this.$refs.childGroup) {
            this.groupList.filter(item => (item.memberItem && item.memberItem.length)).map(item => {
              if (item.memberItem && item.memberItem[item.memberItem.length - 1]) {
                this.expandedKeys.push(item.memberItem[item.memberItem.length - 1].uniqueKey)
              }
              this.expandedKeys.push(item.uniqueKey)
            })
            if (!this.currentGroup.groupGuid) this.currentGroup = currentNode
            this.$refs.childGroup.setCurrentKey(currentNode.uniqueKey)
            this.getEquipmentList()
          }
          this.$route.meta.keepAlive = false
        })
      })
    },
    // 获取设备列表
    getEquipmentList (page) {
      page = page || 1
      this.equipmentList = []
      if (this.isSearch) {
        if ((this.currentGroup.groupGuid && !this.currentGroup.self) || this.currentGroup.guid || this.currentGroup.parent) {
          let url = '/group/device' // 社群下设备列表
          let dataForm = {
            guid: this.currentGroup.groupGuid
          }
          if (this.currentGroup.parent) {
            url = '/group/other/device' // 管理员社群下非自有设备列表
            dataForm = {
              groupGuid: this.currentGroup.parent
            }
          }
          if (this.currentGroup.groupPid) {
            url = '/group/otherMerchant/customGroup' // 自定义分组下非自有设备列表
            dataForm = {
              groupCustomGuid: this.currentGroup.guid,
              groupPid: this.currentGroup.groupPid
            }
          }
          this.$http(url, dataForm).then(res => {
            this.equipmentList = res.data
            if (this.$route.meta.keepAlive) this.$refs.childGroup.setCurrentKey(this.currentGroup)
            this.$route.meta.keepAlive = false
          })
        }
      } else {
        this.$http('/device/search', {
          name: this.$route.params.key || '',
          index: page,
          length: 8
        }).then(res => {
          this.equipmentList = res.data || []
        })
      }
    },
    // 搜索社群设备
    search (value) {
      if (value) {
        this.$router.push(`/equipment/children/search/${value}`)
      } else {
        this.$router.push(`/equipment/children`)
        this.getGroupList()
      }
    },
    currentChange (val, node) {
      this.filterValue.type = ''
      this.selectValue = val
      this.currentGroup = val
      if (!this.currentGroup.guid && !this.currentGroup.groupPid) {
        this.$set(this.currentGroup, 'parent', node.parent.data.groupGuid)
      }
    },
    // 保存当前页面
    saveState () {
      if (this.$route.name === 'equipmentChildren') {
      } else {
        this.$store.commit('SET_ALIVE_STATE', {
          selectValue: this.selectValue
        })
      }
    },
    clearFilters () {
      this.filterValue.type = ''
    }
  },
  created () {
    if (this.$route.meta.keepAlive) {
      this.selectValue = this.aliveState.selectValue
      this.currentGroup = this.aliveState.selectValue ? this.aliveState.selectValue.currentNode.groupGuid : ''
    }
    this.getGroupList()
  },
  computed: {
    ...mapState(['aliveState']),
    isSearch: function (val) {
      return this.$route.name === 'equipmentChildren'
    },
    tipMsg: function () {
      let txt = ''
      if (!this.isSearch) {
        txt = '查询不到该设备'
      } else if ((this.currentGroup.groupPid || this.currentGroup.self) && (!this.currentGroup.memberItem || !this.currentGroup.memberItem.length)) {
        txt = '暂无非自有设备'
      } else if (this.currentGroup.self && this.currentGroup.memberItem && this.currentGroup.memberItem.length) {
        txt = '请选择分组/成员社群，查看非自有设备'
      } else if (!this.equipmentList.length) {
        txt = '暂无非自有设备'
      }
      return txt
    },
    small () {
      return this.currentGroup && !this.equipmentList.length ? 'small' : ''
    },
    tableList: {
      get () {
        let newList = JSON.parse(JSON.stringify(this.equipmentList))
        newList = newList.filter(item => {
          if (this.filterValue.type) {
            return item.deviceType === this.filterValue.type
          }
          return true
        })
        return newList
      },
      set (val) {
        this.equipmentList = val
      }
    }
  },
  watch: {
    currentGroup: function (val, old) {
      this.equipmentList = []
      if (Object.keys(old).length) this.getEquipmentList()
    },
    $route: {
      handler (val) {
        this.saveState()
        this.equipmentList = []
        if (val.name === 'equipmentChildren') {
          this.getGroupList()
        }
        this.getEquipmentList()
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.saveState()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .equipment-children-wrap {
    position: relative;
    .equipment-children-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
      .ec-side-nav {
        float: left;
        width: 230px;
        height: 100%;
        padding: 15px 0;
        .ob-group-nav {
          margin: 0 8px;
        }
        > h2 {
          padding: 20px 20px 10px;
          font-size: 14px;
        }
        > .el-select {
          margin: 0 8px;
        }
      }
      .ec-container {
        height: 100%;
        box-sizing: border-box;
        .ob-scrollbar{
          height: calc(100% - 56px);
        }
        &.dashed-border {
          margin-left: 242px;
          border: none;
          padding: 10px;
        }
      }
    }
    .filter__list--wrap{
      padding: 0 0 15px;
      .el-select{
        width: 154px;
      }
      > .fr {
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }

</style>
