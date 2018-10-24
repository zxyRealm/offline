<template>
    <div class="equipment__service--wrap">
      <uu-sub-tab
        search
        back
        @remote-search="search"
        placeholder="快速查找设备"
        :menu-array="menu">
      </uu-sub-tab>
      <div class="filter__list--wrap">
        <el-select v-model="filterValue.type" placeholder="全部类型">
          <el-option :value="2" label="客行分析"></el-option>
          <el-option :value="3" label="人脸抓拍"></el-option>
        </el-select>
        <el-select  v-model="filterValue.guid" placeholder="绑定社群">
          <el-option :value="1" label="未绑定"></el-option>
          <el-option v-for="(item, $index) in bindList" :key="$index" :value="item.groupGuid" :label="item.name"></el-option>
        </el-select>
        <el-menu @select="handleSelect" mode="horizontal" class="device__menu">
          <el-submenu popper-class="device__menu--popper" index="1">
            <template slot="title">批量操作</template>
            <el-menu-item index="bind">绑定</el-menu-item>
            <el-menu-item index="unbind">解绑</el-menu-item>
            <el-menu-item index="delete">删除</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <el-table
        @selection-change="handleSelectionChange"
        border
        :data="serviceList"
      >
        <el-table-column
          label="全部"
          width="55"
          align="center"
          type="selection">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="序列号"
          prop="deviceKey">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type">
          <template slot-scope="scope">
            {{scope.row.type | deviceType}}
          </template>
        </el-table-column>
        <el-table-column
          label="绑定社群"
          props="groupName">
        </el-table-column>
        <el-table-column
          label="操作">
        </el-table-column>
      </el-table>

      <!--绑定社群-->
      <ob-dialog-form
        filter
        @remote-submit="bindCommunity"
        :group="groupList"
        title="绑定社群"
        type="group"
        :visible.sync="dialogFormVisible"
      >
      </ob-dialog-form>
    </div>
</template>

<script>
import {simplifyGroups, restoreArray} from '../../utils'

export default {
  name: 'service',
  data () {
    return {
      dialogFormVisible: false, // 绑定社群弹框
      multipleSelection: [],
      serviceList: [
        {name: '设备一号'}
      ],
      groupList: [],
      pagination: {},
      filterValue: {
        type: '',
        guid: ''
      }
    }
  },
  created () {
    this.getDeviceList()
    this.getGroupList()
  },
  mounted () {
  },
  computed: {
    menu: {
      get () {
        let text = `自有设备&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;`
        return [{title: `${text}`}]
      },
      set () {}
    },
    bindList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.groupList))
        return restoreArray(list, 'memberItem')
      },
      set () {}
    }
  },
  methods: {
    // 查询服务列表设备
    search (val) {
      console.log('service list---', val)
    },
    // 获取摄像头设备列表信息
    getDeviceList () {
      this.$http('/device/useDescribe', {serverKey: this.$route.params.key}).then(res => {
        this.serviceList = res.data.content
        this.pagination = res.data.pagination
      })
    },
    // 获取社群树形结构数据
    getGroupList () {
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
        setTimeout(() => {
          console.log(this.groupList, this.bindList)
        }, 2 * 1000)
      })
    },
    // 多选框发生改变时触发，返回当前选中值
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 绑定社群
    bindCommunity () {
      this.dialogFormVisible = false
      this.$load('设备绑定中...')
      let subData = JSON.parse(JSON.stringify(this.multipleSelection.map(item => {
        return item
      })))
      this.$http('/device/batch/binding', subData).then(res => {
        this.$load().close()
        this.$tip('绑定成功')
      }).catch(() => {
        this.$load().close()
      })
    },
    // 批量操作处理
    handleSelect (type) {
      console.log(type, this.filterValue)
      if (type === 'bind') {
        if (!this.multipleSelection.length) {
          this.$tip('请选取设备', 'error')
          return
        }
        this.dialogFormVisible = true
        // this.bindCommunity()
      }
    }
  },
  watch: {
    dialogFormVisible (val) {
      if (val) {
        this.getGroupList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter__list--wrap{
  margin: 22px 0 12px;
  > .el-select {
    width: 150px;
    margin-right: 12px;
  }
}
</style>
