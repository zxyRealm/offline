<template>
  <div class="uu-icon" :class="type">
    <!--<img :src="'/static/img/'+type+'_icon.png'" alt="">-->
  </div>
</template>

<script>
  export default {
    name: "uu-icon",
    props: {
      type: [String],
      default: ''
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .uu-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    cursor: pointer;
    &.exit {
      background-image: url("/static/img/exit_icon.png");
    }
    &.notify {
      background-image: url("/static/img/notify_icon.png");
    }
  }
</style>
