/*
* 通用分页器组件 二次封装
* @author  张晓元
* @date    2019-05-10
*/
<template>
  <el-pagination
    class="g-custom-pagination"
    @current-change="currentChange"
    :background="true"
    :current-page="currentPage"
    :pager-count="pagerCount"
    :page-size="pageSize"
    :total="total"
    :small="small"
    :layout="layout"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'CustomPagination',
  props: {
    pagerCount: {
      type: Number,
      default: 5
    },
    total: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    small: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper'
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    currentChange (...args) {
      this.$emit('current-change', args)
    }
  }
}
</script>

<style lang="scss">
.g-custom-pagination{
  margin-top: 20px;
  overflow: hidden;
  box-sizing: border-box;
  > * {
    float: left;
  }
  .el-pagination__jump,
  .btn-text{
    color: $white-sub-title-color;
  }
  &.is-background{
    .el-pager{
      li{
        min-width: 32px;
        border: 1px solid $gray-border-color;
        background-color: #fff;
        color: $white-sub-title-color;
        &:not(.disabled) {
          &.active{
            background-color: #fff;
            border: 1px solid $theme-blue;
            color: $theme-blue;
          }
        }
      }
    }
  }
}
</style>