<template>
  <div class="flow-info-wrap">
    <img src="@/assets/public/enter-people.png" v-if="type=='left'">
    <img src="@/assets/public/out-people.png" v-if="type=='right'">
    <span class="number">{{number}}</span>
    <div class="add-people" v-show="isShow" :class="isShow==true?'animation-lwh-add':''">
      <img class="number-img" src="@/assets/public/add-people.png">
      <span>+1</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type', 'number'],
  data () {
    return {
      isShow: false,
      data: [] // 数据
    }
  },
  methods: {},
  watch: {
    number (val) {
      if (val == 0) return
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .flow-info-wrap {
    display: inline-block;
    position: relative;
    img:nth-child(1) {
      height: 70px;
    }
    img.number-img {
      height: 18px;
      width: 10px;
    }
    .add-people {
      display: inline-block;
      width: 32px;
      position: absolute;
      right: -32px;
      bottom: 0;
      opacity: 0;
    }
    .animation-lwh-add {
      animation-name: fadeInOut;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-duration: 2s;
      animation-direction: normal;
    }
    @keyframes fadeInOut {
      0% {
        opacity: 0;
        bottom: 0;
      }
      50% {
        opacity: 1;
        bottom: 34px;
      }
      100% {
        opacity: 0;
        bottom: 54px;
      }
    }
    span.number {
      top: 20px;
      position: absolute;
      left: 20px;
      font-size: 18px;
    }
  }
</style>
