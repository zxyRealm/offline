<template>
  <div class="notify-default-wrap">
    <div class="tac">
      <p class="title">创建消息通知</p>
      <p class="fs12">若您已拥有设备，并配置了回调信息，则在消费者到店时便可接收到相关数据信息。</p>
    </div>
    <div class="step-wrap vam">
      <div class="step-items">
        <img src="@/assets/public/developer/developer-notify-create.jpg" alt="">
        <p class="des">创建</p>
      </div>
      <span class="separate"></span>
      <div class="step-items">
        <img src="@/assets/public/developer/developer-notify-write.jpg" alt="">
        <p class="des">填写回调信息</p>
      </div>
      <span class="separate"></span>
      <div class="step-items">
        <img src="@/assets/public/developer/developer-notify-accept.jpg" alt="">
        <p class="des">接收回调数据</p>
      </div>
    </div>
    <!--<el-button class="affirm" @click.stop="createCallback">创建</el-button>-->
  </div>
</template>

<script>

export default {
  name: 'notify',
  data () {
    return {
      menu: [
        {title: '消息通知', index: '/developer/notify'},
        {title: '开放API', index: '/developer/api'}
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .notify-default-wrap {
    > div.tac {
      margin: 65px 0;
      .title{
        font-weight: 600;
        font-size: 30px;
        color: #252525;
        margin-bottom: 20px;
      }
    }
    .step-wrap {
      text-align: center;
      .step-items {
        text-align: center;
        > img {
          width: 222px;
          height: 222px;
        }
        > p {
          font-size: 20px;
          color: #252525;
        }
        /*display: inline-block;*/
        .des {
          line-height: 48px;
        }
      }
      .separate {
        width: 78px;
        height: 1px;
        margin: 0 26px 48px;
        background: #979797;
      }
    }
    .affirm {
      display: block;
      margin: 46px auto 0;
    }
  }
</style>
