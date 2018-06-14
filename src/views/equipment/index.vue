<template>
  <div class="equipment-list-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <div class="list-wrap">
      <template v-for="(item,$index) in equipmentList">
        <ob-list>
          <ob-list-item :data="item" prop="type" label="通知类型"></ob-list-item>
          <ob-list-item :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item router="/developer/notify" text="详情" label="用途："></ob-list-item>
          <ob-list-item type="time" :data="item" prop="createTime,createTime" label="创建时间,上次编辑"></ob-list-item>
          <ob-list-item>
            <div class="handle">
              操作：<br>
              <el-popover
                placement="top"
                trigger="hover">
                <div>
                  <p>1.获取设备状态后，可进行操作。</p>
                  <p>2.已绑定至社群，无法删除该设备。</p>
                </div>
                <i slot="reference" style="margin-top: 10px" class="el-icon-question"></i>
              </el-popover>
            </div>
            <div class="btn-wrap">
              <el-button class="medium close">关机</el-button>
              <el-button class="medium reboot">重启</el-button>
              <el-button class="medium upgrading">升级</el-button>
              <el-button class="medium reset">重置</el-button>
            </div>
            <el-button icon="el-icon-delete" @click="delNotifyInfo(item.noticeGuid)" circle></el-button>
          </ob-list-item>
        </ob-list>
      </template>
    </div>

  </div>

</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        menu: [
          {title: '设备列表'}
        ],
        equipmentList: [
          {
            time: new Date().getTime(),
            intro: "通知",
            lastEditTime: null,
            merchantGuid: "12345678901",
            noticeGuid: "DF2503C1CC8945A9A6D90A78BA16DCD0",
            scene: null,
            state: 1,
            tokenURL: "http://baidu.com",
            type: "1"
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
