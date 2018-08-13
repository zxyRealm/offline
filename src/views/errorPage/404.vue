<template>
  <div class="wscn-http404-wrap vam">
    <div class="wscn-http404 vam">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img_404" alt="404">
      </div>
      <div class="bullshit">
        <h1>404</h1>
        <p class="fs16">My God……页面居然丢失！</p>
        <p class="fs12">我们正在努力让页面重见天日，请稍后再试！<span>{{delay}}</span> 秒后将回到首页......</p>

        <el-button @click="$router.push('/')" class="el-button affirm">返回首页</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png'
import img_404_cloud from '@/assets/404_images/404_cloud.png'
export default {
  name: 'page404',
  data () {
    return {
      img_404,
      img_404_cloud,
      delay: 5,
      timer: null
    }
  },
  created () {
    this.delay = 5
    this.timer = setInterval(() => {
      this.delay--
      if (this.delay <= 1) {
        clearInterval(this.timer)
        this.timer = null
        this.$router.push('/')
      }
    }, 1000)
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404-wrap {
    background: rgba(0, 0, 0, .9);
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
        width: 376px;
      }
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
