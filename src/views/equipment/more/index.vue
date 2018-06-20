<template>
  <div class="equipment-more-wrap">
    <uu-sub-tab :menu-array="[{title:'分析终端用途'}]"></uu-sub-tab>
    <div class="ob-table-wrap">
      <el-table
      :data="deviceList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        label="编号"
        width="130px">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="别名"
        width="130px">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        width="130px"
        label="用途">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceKey"
        label="序列号"
        width="150px">
      </el-table-column>
      <el-table-column
        align="center"
        prop="useDescribe"
        label="用途描述">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        deviceList: []
      }
    },
    methods: {
      getDeviceList() {
        this.$http("/device/useDescribe", {deviceKey: this.$route.params.key}).then(res => {
          this.deviceList = res.data
        })
      }
    },
    created() {
      this.getDeviceList()
    }
  }
</script>

<style scoped>

</style>
