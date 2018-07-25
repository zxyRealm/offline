<template>
  <div class="home-notify-wrapper">
    <div class="title">系统消息</div>
    <ob-list-empty text="暂无消息通知" v-if="state"></ob-list-empty>
    <div class="content" v-if="!state">
      <ul>
        <el-scrollbar style="height:100%;">
        <li v-for="(val,index) in notifyData" :key="index" class="clearfix" :class="val.readState ==1?'': 'readed'">
          <span :class="val.readState ==1?'active':''">{{index+1}}.&nbsp;&nbsp;{{val.content}}</span>
          <span>{{val.createTime}}</span>
        </li>
        </el-scrollbar>
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
<style rel="stylesheet/scss" lang="scss">
  .content .el-scrollbar .el-scrollbar__wrap {
        margin-right: -18px!important;
  }
  /* 滚动条粗细 */
  .content .el-scrollbar__bar.is-vertical {
   // width: 8px;
  }
  /* 滚动条高度 */
  .content .el-scrollbar__thumb {
    //hieght: 30%!important;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  /*.content ul::-webkit-scrollbar {*/
    /*width: 12px;*/
    /*height: 12px;*/
    /*background-color: transparent;*/
  /*}*/
  /*!*定义滚动条轨道 内阴影+圆角*!*/
  /*.content ul::-webkit-scrollbar-track {*/
    /*width: 0px;*/
    /*height: 0px;*/
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
    /*border-radius: 0px;*/
    /*background-color: #232027;//#9E9E9E;*/
    /*border-radius: 10px;*/
  /*}*/
  /*!*定义滑块 内阴影+圆角*!*/
  /*.content ul::-webkit-scrollbar-thumb {*/
    /*border-radius: 10px;*/
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
    /*background-color: 	#555;*/
  /*}*/
</style>
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
        cursor: pointer;
        margin: 0 auto;
        width: 72%;
        height: 60%;
        padding: 16px 0;
        overflow-y: auto;
        border: 2px dashed hsla(0, 0%, 62%, 0.03);
        /*background: rgba(15, 158, 233, 0.003);*/
        /*border-image: linear-gradient(to right,#1896E6,#813FC5) 20 20;*/
        background-image: url(/static/img/notify_background.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        .readed {
          opacity: 0.5;
        }
        li {
          font-size: 14px;
          margin-bottom: 16px;
          padding: 0 25px;
          text-align: right;
          //background: url("/static/img/list-icon-green.png") no-repeat left center;
          span{
            display: inline-block;
            vertical-align: middle;
            &:nth-child(1){
              float: left;
              width: 60%;
              text-align: left;
              display: inline-block;
              position: relative;
            }
          }
          .active::before {
            content: '';
            border: 3px solid #0F9EE9;
            border-radius: 50%;
            position: absolute;
            top: 7px;
            left: -20px
          }
        }
      }
    }
  }
</style>
