<template>
    <div class="custom__popover--wrap" :class="size">
      {{text}}
        <div v-if="show"
             :style="{width: width}"
             class="custom__popover--content"
             v-html="content"
             :x-placement="placement">
        </div>
    </div>
</template>

<script>
export default {
  name: 'custom-popover',
  props: {
    showPopover: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'middle'
    },
    text: '',
    content: '',
    width: {
      type: String,
      default: 'auto'
    },
    placement: {
      type: String,
      default: 'right'
    }
  },
  data: () => ({}),
  created () {
  },
  mounted () {
  },
  computed: {
    show: {
      get () {
        return this.showPopover
      },
      set (val) {
      }
    }
  },
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.custom__popover--wrap{
  display: inline-block;
  position: relative;
  min-width: 2em;
  padding: 9px 16px;
  line-height: 1;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 #161418;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(../assets/public/affrim_btn_bg.png);
  background-size: 110% 156%;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  &.middle{
    width: 130px;
  }
  &.small{
    width: 80px;
  }
  .custom__popover--content{
    position: absolute;
    top: calc(100% + 6px);
    line-height: 1.5;
    padding: 8px 15px;
    font-size: 12px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
    color: #333;
    cursor: text;
    word-break: keep-all;
    z-index: 99;
    &:after{
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      top: -4px;
      left: calc(50% - 3px);
      border-width: 4px;
      margin-right: 3px;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
    }
    &[x-placement='right']{
      right: 0;
    }
    &[x-placement=left]{
      left: 0;
    }
  }
}
</style>
