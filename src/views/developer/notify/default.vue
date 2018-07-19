<template>
  <div class="notify-default-wrap">
    <p class="tac fs12">若您已拥有设备，并配置了回调信息，则在消费者到店时便可接收到相关数据信息。</p>
    <div class="step-wrap vam">
      <div class="step-items">
        <img src="/static/img/step_create_icon.png" alt="">
        <p class="des">创建</p>
      </div>
      <span class="separate"></span>
      <div class="step-items">
        <img src="/static/img/step_edit_icon.png" alt="">
        <p class="des">填写回调信息</p>
      </div>
      <span class="separate"></span>
      <div class="step-items">
        <img src="/static/img/step_receive_icon.png" alt="">
        <p class="des">接收回调数据</p>
      </div>
    </div>
    <el-button class="affirm" @click.stop="createCallback">创建</el-button>
  </div>
</template>

<script>
  export default {
    name: "notify",
    data(){
      return {
        menu:[
          { title:'消息通知',index:'/developer/notify' },
          {title:'开放API',index:'/developer/api'}
        ]
      }
    },
    methods:{
      createCallback(){
        this.$http("/device/merchant/exist", false).then(res => {
          console.log(res);
          if (res.data) {
            this.$router.push("/developer/notify/add-info");
          }else {
            this.$affirm({
              confirm:'前往【设备列表】',
              cancel:'返回',
              text:'您还没有绑定设备，无法创建数据回调。'
            },(action,instance,done)=>{
              if(action==='confirm'){
                done();
                this.$router.push("/equipment/mine");
              }else {
                done()
              }
            })
          }
        }).catch(error => {

        })

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.notify-default-wrap{
  >p.tac{
    margin: 65px 0;
  }
  .step-wrap{
    text-align: center;
    .step-items{
      text-align: center;
      >img{
        width: 122px;
        height: 122px;
      }
      /*display: inline-block;*/
      .des{
        line-height: 48px;
      }
    }
    .separate{
      width: 78px;
      height: 1px;
      margin: 0 26px 48px;
      background: #979797;
    }
  }
  .affirm{
    display: block;
    margin: 46px auto 0;
  }
}
</style>
