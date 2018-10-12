<template>
  <div v-if="!loading" class="ob-list-empty-wrap vam" :style="wrapStyle">
    <div class="ob-list-empty vam" :class="size">
      <div class="empty-content">
        <p class="main-text">{{text}}</p>
        <p class="supply" v-if="supply">
          {{supply}}
        </p>
        <slot></slot>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ob-list-empty',
  props: {
    top: {
      type: String,
      default: '0px'
    },
    text: {
      type: String,
      default: '暂无数据'
    },
    supply: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    loading: function () {
      return this.$store.state.loading
    },
    wrapStyle: function () {
      let height = this.top
      return {
        height: `calc(100% - ${height})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .ob-list-empty-wrap {
    height: 100%;
  }

  .ob-list-empty {
    text-align: center;
    border: 1px dashed #1f2d3d;
    background: rgba(0, 0, 0, 0.20);
    height: 110px;
    width: 720px;
    font-size: 12px;
    line-height: 110px;
    color: rgba(255, 255, 255, 0.5);
    .empty-content{
      display: inline-block;
      text-align: center;
      .main-text{
        font-size: 16px;
      }
      .supply{
        margin-top: 8px;
        font-size: 12px;
      }
    }
    &.small {
      height: 50px;
      width: 480px;
      line-height: 50px;
    }
  }
</style>
