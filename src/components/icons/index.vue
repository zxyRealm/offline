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
  $s12: 12px;
  $s14: 14px;
  $s16: 16px;
  $s20: 20px;
  $s24: 24px;
  .uu-icon {
    display: inline-block;
    width: $s16;
    height: $s16;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    cursor: pointer;
    vertical-align: middle;
    &.exit {
      background-image: url(../../assets/public/exit_icon.png);
      height: $s24;
      width: $s24;
    }
    &.notify {
      background-image: url(../../assets/public/notify_icon.png);
      height: $s24;
      width: $s24;
      &.middle{
        height: $s20;
        width: $s20;
      }
    }
    &.arrow {
      background-image: url(../../assets/public/arrow_icon.png);
      height: $s24;
      width: $s24;
    }
    &.delete {
      background-image: url(../../assets/public/delete_icon.png);
      height: 14px;
      width: 14px;
    }
    &.success {
      background-image: url(../../assets/public/icons/ob-icon-success.png);
    }
    &.relieve {
      background-image: url(../../assets/public/icons/relieve_icon.png);
    }
    &.error {
      background-image: url(../../assets/public/icons/ob-icon-error.png);
    }
    &.action {
      background-image: url(../../assets/public/icons/action_icon@x1.png);
    }
    &.address {
      background-image: url(../../assets/public/icons/address_icon@x1.png);
    }
    &.manage {
      background-image: url(../../assets/public/icons/manage_icon@x1.png);
    }
    &.more {
      background-image: url(../../assets/public/icons/more_icon@x1.png);
    }
    &.back {
      background-image: url(../../assets/public/icons/back_higher_icon.png);
    }
    &.data {
      background-image: url(../../assets/public/icons/higher_data_icon.png);
      cursor: initial;
    }
    &.handle {
      background-image: url(../../assets/public/icons/higher_handle_icon.png);
      cursor: initial;
    }
    &.mine {
      background-image: url(../../assets/public/icons/mine-community_icon.png);
    }
    &.quit {
      background-image: url(../../assets/public/icons/back_higher_icon.png);
      height: $s14;
      width: $s14;
    }
    &.groups {
      background-image: url(../../assets/public/icons/groups_icon@2x.png);
      height: $s12;
      width: $s12;
    }
    &.help {
      background-image: url(../../assets/public/icons/help_icon.png);
      height: 24px;
      width: 24px;
    }
    &.problem {
      background-image: url(../../assets/public/icons/problem_icon.png);
      &.small{
        height: $s14;
        width: $s14;
      }
    }
    /*树形组件社群角色图标（商场、连锁、门店）*/
    &.role01{
      background-image: url(../../assets/community/market_role_icon.png);
      width: 24px;
      height: 14px;
    }
    &.role02{
      background-image: url(../../assets/community/single_role_icon.png);
      width: 24px;
      height: 14px;
    }
    &.role03{
      background-image: url(../../assets/community/chain_role_icon.png);
      width: 24px;
      height: 14px;
    }
    /*外来的社群标识*/
    &.foreign{
      background-image: url(../../assets/community/foreign_role_icon.png);
      width: 12px;
      height: 10px;
    }
    /*全屏、退出全屏*/
    &.screen{
      background-image: url(../../assets/public/icons/screen_icon_full@2x.png);
      width: 20px;
      height: 20px;
      &.exit {
        background-image: url(../../assets/public/icons/screen_icon_exit@2x.png);
      }
    }
    /*社群绑定*/
    &.binding {
      background-image: url(../../assets/public/binding.png);
    }
    /*社群解绑*/
    &.unbinding {
      background-image: url(../../assets/public/unbinding@2x.png);
    }
    &.small{
      height: $s14;
      width: $s14;
    }
    &.mini{
      height: $s12;
      width: $s12;
    }
  }
</style>
