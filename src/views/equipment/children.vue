<template>
  <div class="equipment-children-wrap g-prl20">
    <uu-sub-tab
      search
      @remote-search="search"
      placeholder="快速查找设备"
      :menu-array="menu2">
    </uu-sub-tab>
    <div class="equipment-children-container" :style="{top:'50px'}">
      <div class="ec-side-nav dashed-border" v-if="isSearch">
        <ob-group-nav
          rights
          ref="childGroup"
          only-checked
          type="community"
          node-key="uniqueKey"
          v-model="groupList"
          @current-change="currentChange"></ob-group-nav>
      </div>
      <div class="ec-container" :class="{'dashed-border':isSearch}">
        <div class="filter__list--wrap">
          <el-select v-model="filterValue.type" placeholder="全部类型">
            <el-option :value="2" label="客行分析"></el-option>
            <el-option :value="3" label="人脸抓拍"></el-option>
            <el-option :value="1" label="服务器"></el-option>
          </el-select>
          <!--<el-select  v-model="filterValue.groupGuid" placeholder="绑定社群">-->
          <!--<el-option :value="-1" label="未绑定"></el-option>-->
          <!--<el-option v-for="(item, $index) in bindList" :key="$index" :value="item.groupGuid" :label="item.name"></el-option>-->
          <!--</el-select>-->
          <!--<el-menu @select="handleSelect" mode="horizontal" class="device__menu">-->
          <!--<el-submenu popper-class="device__menu&#45;&#45;popper" index="1">-->
          <!--<template slot="title">批量操作</template>-->
          <!--<el-menu-item index="bind">绑定</el-menu-item>-->
          <!--<el-menu-item index="unbind">解绑</el-menu-item>-->
          <!--<el-menu-item index="delete">删除</el-menu-item>-->
          <!--</el-submenu>-->
          <!--</el-menu>-->
          <a href="javascript:void (0)" @click="clearFilters" class="fr">显示全部</a>
        </div>
        <el-scrollbar class="ob-scrollbar" v-if="equipmentList.length">
          <device-table
            @refresh="getEquipmentList"
            v-model="equipmentList"
          ></device-table>
          <el-pagination
            v-if="pagination.total && pagination.total>pagination.length"
            @current-change="getEquipmentList"
            :current-page="pagination.index"
            :page-size="pagination.length"
            layout="total,prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </el-scrollbar>
        <ob-list-empty v-if="!equipmentList.length" :size="small" :text="tipMsg"></ob-list-empty>
      </div>
    </div>
  </div>
</template>

<script type="application/javascript">
import {mapState} from 'vuex'
import DeviceTable from '@/components/DeviceTable'
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
      selectValue: {}
    }
  },
  methods: {
    // 获取非自有社群
    getGroupList (key) {
      this.$http('/group/list/childGroup').then(res => {
        // 过滤掉最外层单店、成员社群、无外来社群的管理员社群
        this.groupList = res.data.filter(item => {
          return item.role === 0 && item.memberItem.length
        })
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentGroup : false) || key || (this.currentGroup.uniqueKey ? this.currentGroup : false) || res.data[0]
        this.$nextTick(() => {
          if (this.$refs.childGroup) {
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
      page = page || this.pagination.index || 1
      this.equipmentList = []
      if (this.isSearch) {
        if (this.currentGroup.groupGuid) {
          this.$http('/device/guid/list', {guid: this.currentGroup.groupGuid, index: page, length: 8}).then(res => {
            this.equipmentList = res.data.content
            this.pagination = res.data.pagination
            if (this.$route.meta.keepAlive) this.$refs.childGroup.setCurrentKey(this.currentGroup)
            this.$route.meta.keepAlive = false
          })
        }
      } else {
        this.$http('/device/search', {
          searchText: this.$route.params.key || '',
          index: page,
          length: 8
        }).then(res => {
          this.equipmentList = res.data.content
          this.pagination = res.data.pagination
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
    currentChange (val) {
      this.selectValue = val
      this.currentGroup = val
      // this.currentGroup = val.currentNode.groupGuid
    },
    // 保存当前页面
    saveState () {
      if (this.$route.name === 'equipmentChildren') {
        this.$store.commit('SET_ALIVE_STATE', {
          pagination: this.pagination
        })
      } else {
        this.$store.commit('SET_ALIVE_STATE', {
          selectValue: this.selectValue,
          pagination: this.pagination
        })
      }
    },
    clearFilters () {}
  },
  created () {
    if (this.$route.meta.keepAlive) {
      this.selectValue = this.aliveState.selectValue
      this.currentGroup = this.aliveState.selectValue ? this.aliveState.selectValue.currentNode.groupGuid : ''
      this.pagination = this.aliveState.pagination ? this.aliveState.pagination : {}
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
      } else if (this.selectValue.node && !this.selectValue.node.length) {
        txt = '您还没有成员社群'
      } else if (!this.currentGroup) {
        txt = '请先在左侧选择自有社群，以查看其下的成员社群设备'
      } else if (!this.equipmentList.length) {
        txt = '暂无设备'
      }
      return txt
    },
    small () {
      return this.currentGroup && !this.equipmentList.length ? 'small' : ''
    }
  },
  watch: {
    currentGroup: function () {
      this.equipmentList = []
      this.pagination = {}
      this.getEquipmentList()
    },
    $route: function (val) {
      this.saveState()
      this.equipmentList = []
      this.getEquipmentList()
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
