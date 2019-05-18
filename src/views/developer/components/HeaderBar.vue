<!--  created by 钟小燕  at 2019/5/16
 页面组件--------------------------页面组件
 -->
<template>
  <div>
    <div class="page__title">开发者中心</div>
    <div>
      <el-tabs v-model="active" @tab-click="handleClick" class="tabs__box">
        <el-tab-pane :label="item.title" :name="item.name" v-for="(item, index) in menuArray" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="button__box">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    menuArray: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    handleClick (item) {
      this.$router.push(`/developer/${item.name}`)
    }
  },
  computed: {
    active: {
      get () {
        return this.activeName
      },
      set () {}
    }
  },
  watch: {}
}
</script>

<style scoped lang="scss">
  .page__title{
    height: 72px;
    line-height: 71px;
    box-sizing: border-box;
    border-bottom: 1px solid #F0F0F0;
    padding-left: 40px;
    font-size: 22px;
  }
  .tabs__box{
    margin: 10px 40px;
    vertical-align: middle;
    width: calc(100% - 400px);
    display: inline-block;
    /deep/ .el-tabs__item{
      font-size: 16px;
    }
    /deep/ .el-tabs__header{
      margin: 0;
    }
    /deep/ .el-tabs__nav-wrap{
      &:after{
        height: 0;
      }
    }
    /deep/ .el-tabs__active-bar{
      transition: none;
    }
  }
  .button__box{
    display: inline-block;
    width: 280px;
    text-align: right;
    vertical-align: middle;
  }
</style>
