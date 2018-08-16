<template>
  <div class="uu-icon" :class=" type + ' ' + className + ' ' + size" @click="handleClick">
  </div>
</template>

<script>
export default {
  name: 'uu-icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    className: {
      type: [String, Object],
      default: ''
    },
    size: {
      type: [String],
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('handle')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $s14: 14px;
  $s16: 16px;
  $s24: 24px;
  .uu-icon {
    display: inline-block;
    width: $s16;
    height: $s16;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    cursor: pointer;
    vertical-align: sub;
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
    &.arrow {
      background-image: url("/static/img/arrow_icon.png");
      height: $s24;
      width: $s24;
    }
    &.delete {
      background-image: url("/static/img/delete_icon.png");
      height: 14px;
      width: 14px;
    }
    &.success {
      background-image: url("../../assets/public/icons/ob-icon-success.png");
    }
    &.relieve {
      background-image: url("../../assets/public/icons/relieve_icon.png");
    }
    &.error {
      background-image: url("../../assets/public/icons/ob-icon-error.png");
    }
    &.action {
      background-image: url("../../assets/public/icons/action_icon@x1.png");
    }
    &.address {
      background-image: url("../../assets/public/icons/address_icon@x1.png");
    }
    &.manage {
      background-image: url("../../assets/public/icons/manage_icon@x1.png");
    }
    &.more {
      background-image: url("../../assets/public/icons/more_icon@x1.png");
    }
    &.back {
      background-image: url("../../assets/public/icons/back_higher_icon.png");
    }
    &.data {
      background-image: url("../../assets/public/icons/higher_data_icon.png");
      height: $s14;
      width: $s14;
      cursor: initial;
    }
    &.handle {
      background-image: url("../../assets/public/icons/higher_handle_icon.png");
      height: $s14;
      width: $s14;
      cursor: initial;
    }
    &.mine {
      background-image: url("../../assets/public/icons/mine-community_icon.png");
    }
    &.quit {
      background-image: url('../../assets/public/icons/back_higher_icon.png');
      height: $s14;
      width: $s14;
    }
    &.problem {
      background-image: url('../../assets/public/icons/problem_icon.png');
      &.small{
        height: $s14;
        width: $s14;
      }
    }
  }
</style>
