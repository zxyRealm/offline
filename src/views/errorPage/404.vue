<template>
  <div class="wscn-http404-wrap vam">
    <div class="wscn-http404 vam">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img_404" alt="404">
        <p class="g-gray">网络异常，请检查您的网络</p>
      </div>
    </div>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png'
export default {
  name: 'page404',
  data () {
    return {
      img_404,
      delay: 5,
      timer: null
    }
  },
  created () {
    this.delay = 5
    // this.timer = setInterval(() => {
    //   this.delay--
    //   if (this.delay <= 1) {
    //     clearInterval(this.timer)
    //     this.timer = null
    //     this.$router.push('/')
    //   }
    // }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.delay = 5
    }
  }
}
</script>

<style lang="scss" scoped>
  .wscn-http404-wrap {
    height: 100%;
  }

  .wscn-http404 {
    position: relative;
    min-width: 1200px;
    margin: 20px auto 60px;
    overflow: hidden;
    text-align: center;
    > div {
      display: inline-block;
      text-align: left;
    }
    .pic-404 {
      position: relative;
      overflow: hidden;
      &__parent {
        width: 685px;
      }
    }
    .g-gray{
      position: absolute;
      bottom: 16%;
      width: 100%;
      text-align: center;
      color: #BEBEBE;
    }
    .bullshit {
      position: relative;
      overflow: hidden;
      color: #fff;
      margin-left: 56px;
      > h1 {
        font-size: 110px;
      }
      > .el-button {
        width: 100px;
        margin-top: 15px;
      }
      .fs12 {
        color: #B6BABF;
      }
    }
  }
</style>
