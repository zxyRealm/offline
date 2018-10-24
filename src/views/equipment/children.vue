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
        <el-scrollbar class="ob-scrollbar" v-if="equipmentList.length">
          <!--<template v-for="(item,$index) in equipmentList">-->
            <!--<ob-list :key="$index">-->
              <!--<ob-list-item is-child :data="item" type="state">-->
              <!--</ob-list-item>-->
              <!--<ob-list-item>-->
                <!--<p><span class="table__label">序列号：</span><span>{{item.deviceKey}}</span></p>-->
                <!--<p><span class="table__label">设备类型：</span><span>{{item.deviceType|deviceType}}</span></p>-->
                <!--<p><span class="table__label">添加时间：</span><span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>-->
              <!--</ob-list-item>-->
              <!--<ob-list-item>-->
                <!--<p>-->
                  <!--<span>用途：</span><br>-->
                  <!--<router-link v-if="item.deviceType===1" :to="'/equipment/more/'+item.deviceKey">详情</router-link>-->
                 <!--<span v-else>{{item.deviceType | deviceType}}</span>-->
                <!--</p>-->
              <!--</ob-list-item>-->
              <!--<ob-list-item>-->
                <!--<p>-->
                  <!--<span>绑定社群：</span>-->
                  <!--<span>{{item.groupName}}</span>-->
                <!--</p>-->
                <!--<p><span>绑定时间：</span><span>{{item.bindingTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>-->
                <!--<p>-->
                  <!--<span>应用场景：</span>-->
                  <!--<el-tooltip :content="item.deviceScene" placement="top">-->
                    <!--<span class="ellipsis">{{item.deviceScene}}</span>-->
                  <!--</el-tooltip>-->
                <!--</p>-->
              <!--</ob-list-item>-->
              <!--<ob-list-item-->
                <!--:style="{minWidth:'180px'}"-->
                <!--@refresh="getEquipmentList"-->
                <!--:data="item" type="handle">-->
              <!--</ob-list-item>-->
            <!--</ob-list>-->
          <!--</template>-->
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
export default {
  name: 'index',
  data () {
    return {
      menu2: [
        {title: '自有设备', index: '/equipment/mine'},
        {title: '非自有设备', index: '/equipment/children'}
      ],
      groupList: [],
      currentGroup: '', // 选中社群
      equipmentList: [], // 设备列表
      pagination: {}, // 分页参数
      selectValue: {}
    }
  },
  methods: {
    // 获取非自有社群
    getGroupList (key) {
      this.$http('/group/list/noCustom').then(res => {
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentGroup : false) || key || (this.currentGroup.uniqueKey ? this.currentGroup : false) || res.data[0]
        this.$nextTick(() => {
          if (this.$refs.childGroup) {
            this.$refs.childGroup.setCurrentKey(currentNode.uniqueKey)
          }
        })
        this.groupList = res.data
      })
    },
    // 获取设备列表
    getEquipmentList (page) {
      page = page || this.pagination.index || 1
      if (this.isSearch) {
        if (this.currentGroup) {
          this.$http('/device/guid/list', {guid: this.currentGroup, index: page, length: 8}).then(res => {
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
        this.$router.push(`/equipment/search/children/${value}`)
      }
    },
    currentChange (val) {
      this.selectValue = val
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
    }
  },
  created () {
    if (this.$route.meta.keepAlive) {
      this.selectValue = this.aliveState.selectValue
      this.currentGroup = this.aliveState.selectValue ? this.aliveState.selectValue.currentNode.groupGuid : ''
      this.pagination = this.aliveState.pagination ? this.aliveState.pagination : {}
    }
    this.getGroupList()
    this.getEquipmentList()
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
        txt = '该社群尚未绑定设备'
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
        &.dashed-border {
          margin-left: 242px;
          border: none;
        }
      }
    }
  }

</style>
