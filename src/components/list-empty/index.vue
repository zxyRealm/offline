<template>
  <div v-if="!loading" class="ob-list-empty-wrap vam" :style="wrapStyle">
    <div class="ob-list-empty vam" :class="size">
      <img src="@/assets/empty-default@2x.png" width="530px" alt="">
      <!--<div class="empty-content">-->
        <!--<p class="main-text">{{text}}</p>-->
        <!--<p class="supply" v-if="supply">-->
          <!--{{supply}}-->
        <!--</p>-->
        <!--<slot></slot>-->
      <!--</div>-->
      <div class="empty-text" :style="{top: subTextTop, bottom: subTextBottom}">
        <h2 class="text-title">{{text}}</h2>
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
      default: '暂无信息'
    },
    supply: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    subTextTop: {
      type: String,
      default: ''
    },
    subTextBottom: {
      type: String,
      default: '18%'
    }
  },
  computed: {
    loading: function () {
      return this.$store.state.needLoadingRequestCount
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
    position: relative;
    font-size: 12px;
    text-align: center;
    .empty-text{
      position: absolute;
      width: 100%;
      left: 0;
      text-align: center;
    }
    .text-title{
      font-size: 24px;
      font-weight: normal;
      color: #495174;
    }
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
  .theme-white{
    .ob-list-empty{
      .text-title{

      }
    }
  }
</style>
