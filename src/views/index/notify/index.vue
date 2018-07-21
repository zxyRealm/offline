<template>
  <div class="home-notify-wrapper">
    <div class="title">系统消息</div>
    <ob-list-empty text="暂无消息通知" v-if="state"></ob-list-empty>
    <div class="content" v-if="!state">
      <ul>
        <li v-for="(val,index) in notifyData" :key="index" class="clearfix" :class="val.readState ==1?'': 'readed'">
          <span :class="val.readState ==1?'active':''">{{index+1}}.&nbsp;&nbsp;{{val.content}}</span>
          <span>{{val.createTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        state: false,
        notifyData: []
      }
    },
    methods: {
      getData() {
        this.$http('/siteNotice/list', {}).then(res => {
          if (res.result == 1) {
            if (res.data.length > 0) {
              this.notifyData = res.data
            } else {
              this.state = true;
            }
          }
        });
      }
    },
    created() {
      let notifyState = this.$route.params.notifyState;
      this.getData();
//             if(notifyState == "true") {
//                this.getData();
//             }else{
//                this.state = true;
//             }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .home-notify-wrapper {
    height: 100px;
    min-width: 1020px;
    background-color: rgba(0, 0, 0, 0.3);
    .title {
      font-size: 16px;
      padding: 20px 0 0 20px;
      box-sizing: border-box;
    }
    .content {
      height: calc(100% - 42px);
      padding-top: 6%;
      box-sizing: border-box;
      ul {
        margin: 0 auto;
        width: 72%;
        height: 60%;
        padding: 16px;
        overflow-y: auto;
        border: 2px dashed hsla(0, 0%, 62%, 0.03);
        background: rgba(15, 158, 233, 0.003);
        .readed {
          opacity: 0.5;
        }
        li {
          font-size: 14px;
          margin-bottom: 16px;
          padding-left: 25px;
          text-align: right;
          background: url("/static/img/list-icon-green.png") no-repeat left center;
          span{
            display: inline-block;
            vertical-align: middle;
            &:nth-child(1){
              float: left;
              width: 60%;
              text-align: left;
              display: inline-block;
            }
          }
          .active::before {
            content: '';
            border: 4px solid #0F9EE9;
            border-radius: 50%;
            position: absolute;
            top: 6px;
            left: -20px
          }
        }
      }
    }
  }
</style>
