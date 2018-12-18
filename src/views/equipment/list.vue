<template>
  <div class="equipment-list-wrap g-prl20">
    <div class="device__sub--title">
      <router-link to="/equipment/list">
        设备列表
      </router-link>
      <router-link to="/equipment/portal">
        出入口设备
      </router-link>
    </div>
    <div v-if="$route.name !== 'equipmentPortal'" class="device__sub--title title-pd0">
      <el-select
        @change="changeRoute"
        @focus="changeRoute"
        :class="{'router-link-active': currentRoute === $route.path}"
        popper-class="device__sub--popper" v-model="currentRoute" placeholder="请选择">
        <el-option label="自有设备" value="/equipment/list/own"></el-option>
        <el-option label="非自有设备" value="/equipment/list/other"></el-option>
      </el-select>
      <router-link to="/equipment/list/server">
        服务器
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      currentRoute: '/equipment/list/own'
    }
  },
  methods: {
    // 切换路由
    changeRoute (path) {
      this.$router.push(this.currentRoute)
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  .device__sub--title{
    position: relative;
    height: 56px;
    line-height: 40px;
    padding-top: 14px;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
    box-sizing: border-box;
    &.title-pd0{
      height: 40px;
      padding-top: 0;
    }
    .router-link-active{
      border-bottom: 2px solid #f8f8f8;
      color: #fff;
    }
    > a{
      display: inline-block;
      padding: 0 5px;
      color: rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      & + a {
        margin-left: 44px;
      }
    }
    .el-select{
      .el-input{
        background: transparent;
      }
    }
    .drop__select--wrap{
      position: absolute;
      top: 42px;
      left: 0;
      line-height: 24px;
      background: #fff;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      z-index: 99;
      overflow: hidden;
      p{
        padding: 0 15px;
        &.active{
          background: #EBEBEB;
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
<style lang="scss">
  /*搜索框*/
  .device__search--wrap{
    height: 47px;
    padding-top: 16px;
    line-height: 28px;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
