<template>
  <div class="notify-default-wrap">
    <div class="tac">
      <p class="title">创建消息通知</p>
      <p class="fs12">若您已拥有设备，并配置了回调信息，则在消费者到店时便可接收到相关数据信息。</p>
    </div>
    <div class="step-wrap vam">
      <div v-for="(item, index) in stepList" :key="index" class="vam">
        <div class="step-items">
          <img :src="item.img" alt="">
          <p class="des">{{item.title}}</p>
        </div>
        <span class="separate" v-if="index < stepList.length-1"></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'notify',
  data () {
    return {
      stepList: [
        { title: '创建', img: require('@/assets/public/developer/developer-notify-create.jpg') },
        { title: '填写回调信息', img: require('@/assets/public/developer/developer-notify-write.jpg') },
        { title: '接收回调数据', img: require('@/assets/public/developer/developer-notify-accept.jpg') }
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
