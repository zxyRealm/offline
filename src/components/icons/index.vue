<template>
  <div class="uu-icon" :class="type" @click="handleClick">
  </div>
</template>

<script>
  export default {
    name: "uu-icon",
    props: {
      type: [String],
      default: ''
    },
    methods:{
      handleClick(){
        this.$emit("handle")
      }
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
    vertical-align: middle;
    &.exit {
      background-image: url("/static/img/exit_icon.png");
    }
    &.notify {
      background-image: url("/static/img/notify_icon.png");
    }
    &.arrow{
      background-image: url("/static/img/arrow_icon.png");
    }
    &.delete{
      background-image: url("/static/img/delete_icon.png");
      height: 14px;
      width: 14px;
    }
    &.success{
      background-image: url("./image/ob-icon-success.png");
      width: 16px;
      height: 16px;
    }
    &.relieve{
      background-image: url("./image/relieve_icon.png");
      width: 16px;
      height: 16px;
    }
    &.error{
      background-image: url("./image/ob-icon-error.png");
      width: 16px;
      height: 16px;
    }
  }
</style>
