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
          <el-option :value="1">客行分析</el-option>
          <el-option :value="2">人脸抓拍</el-option>
          <el-option :value="3">服务器</el-option>
        </el-select>
        <el-select v-model="filterValue.type" placeholder="绑定社群">
          <el-option :value="1">未绑定</el-option>
          <el-option v-for="(item, $index) in groupList" :key="$index" :value="item.groupGuid">{{item.name}}</el-option>
        </el-select>
      </div>
      <el-table
        border
        data="serviceList"
      ></el-table>
    </div>
</template>

<script>
export default {
  name: 'service',
  data () {
    return {
      serviceList: [],
      groupList: [],
      filterValue: {
        type: ''
      }
      // menu: [
      //   {title: '自有设备&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'}
      // ]
    }
  },
  created () {
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
    }
  },
  methods: {
    // 查询服务列表设备
    search (val) {
      console.log('service list---', val)
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
