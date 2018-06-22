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
  $s14:14px;
  $s16:16px;
  $s24:24px;
  .uu-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    cursor: pointer;
    vertical-align: middle;
    &.exit {
      background-image: url("/static/img/exit_icon.png");
      height: $s24;
      width: $s24;
    }
    &.notify {
      background-image: url("/static/img/notify_icon.png");
      height: $s24;
      width: $s24;
    }
    &.arrow{
      background-image: url("/static/img/arrow_icon.png");
      height: $s24;
      width: $s24;
    }
    &.delete{
      background-image: url("/static/img/delete_icon.png");
      height: 14px;
      width: 14px;
    }
    &.success{
      background-image: url("./image/ob-icon-success.png");
    }
    &.relieve{
      background-image: url("./image/relieve_icon.png");
    }
    &.error{
      background-image: url("./image/ob-icon-error.png");
    }
    &.action{
      background-image: url("./image/action_icon@x1.png");
    }
    &.address{
      background-image: url("./image/address_icon@x1.png");
    }
    &.manage{
      background-image: url("./image/manage_icon@x1.png");
    }
    &.more{
      background-image: url("./image/more_icon@x1.png");
    }
    &.back{
      background-image: url("./image/back_higher_icon.png");
    }
    &.data{
      background-image: url("./image/higher_data_icon.png");
      height: $s14;
      width: $s14;
    }
    &.handle{
      background-image: url("./image/higher_handle_icon.png");
      height: $s14;
      width: $s14;
    }
    &.mine{
      background-image: url("./image/mine-community_icon.png");
    }
    &.quit{
      background-image: url('./image/back_higher_icon.png');
      height: $s14;
      width: $s14;
    }
  }
</style>
