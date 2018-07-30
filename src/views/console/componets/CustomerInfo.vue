<template>
  <div class="customer-info-wrap vam" :class="detailInfo.status==0?'customer-info-wrap-in':'customer-info-wrap-out'"
       @click="handleDetail">
    <span class="order" :class="detailInfo.status==0?'':'order-in'">{{`第${detailInfo.order}位`}}</span>
    <div class="customer-img" ref="imgFather">
      <img :src="detailInfo.img | imgBase"  ref="img" :style="styleObj" >
    </div>
    <div class="customer-detail" :class="detailInfo.status==0?'customer-detail-in':''">
      <span v-if="detailInfo.status==0">{{detailInfo.gender==0?'女':(detailInfo.gender==1?'男':'')}}</span>
      <span v-if="detailInfo.status==0">{{detailInfo.age ==-1?"":detailInfo.age}}</span>
      <span>{{this.daytime(detailInfo.time)}}</span>
      <span>{{this.time(detailInfo.time)}}</span>
    </div>
    <ob-dialog-info :visible.sync="showDialog" :data="detailInfo"></ob-dialog-info>
  </div>
</template>
<script>
  import ObDialogInfo from './ObDialogInfo'
  import { parseTime } from '@/utils/index'
  export default {
    components:{
      ObDialogInfo
    },
    props: ['index', 'detailInfo'],
    data() {
      return {
        styleObj: {

        },
        showDialog:false,
        data: []   //数据
      }
    },
    filters: {
      //日
      daytime(date) {
        date = new Date(date);
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return m + '/' + d;
      },
      //时分
      time(date) {
        date = new Date(date);
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return h + ':' + minute;
      },
      imgBase(data) {
        return `data:image/jpg;base64,${data}`
      }
    },
    methods: {
      daytime(date) {
        date = new Date(date);
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return m + '/' + d;
      },
      //时分
      time(date) {
        date = new Date(date);
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return h + ':' + minute;
      },
      handleDetail() {
        this.showDialog = true;
      }
    },
    mounted() {
      //图片宽高自适应
      //console.info((this.$refs.imgFather.offsetWidth/this.$refs.imgFather.offsetHeight));
      if((this.$refs.img.offsetWidth/this.$refs.img.offsetHeight) >= (this.$refs.imgFather.offsetWidth/this.$refs.imgFather.offsetHeight)) {
        this.$set(this.styleObj,'height','100%');
      }else {
        this.$set(this.styleObj,'width','100%');
        this.timer = window.setTimeout(() => {
            if(this.$refs.img.offsetHeight < this.$refs.imgFather.offsetHeight ) {
              this.$set(this.styleObj,'height','100%');
            }
            window.clearTimeout(this.timer);
          },
        300)

      }
    },
    watch: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  /* 遮罩层div */
  #lwh-shadow-detail.shadow-detail-div {
    min-width: 1280px;
    min-height: 720px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    .shadow-detail-content {
      .detail-img-div {
        position: relative;
        background: rgba(16, 156, 231, 0.2);
        background-repeat:no-repeat,no-repeat,no-repeat,no-repeat;
        background-position: left top,right top,right bottom,left bottom;
       background-image: url(/static/img/console-detail-border-icon-top.png),url(/static/img/console-detail-border-icon-right.png),url(/static/img/console-detail-border-icon-bottom.png),url(/static/img/console-detail-border-icon-left.png);
        background-size: 52px auto;
        padding: 40px;
        .detail-content-img {
          height: 420px;
          border: 2px solid #109CE7;
        }
        .detail-content-img-in {
          height: 420px;
          border: 2px solid #6D2EBB;
        }
        .detail-content-div {
          padding-left:30px;
          text-align: center;
          span {
            color: #ffffff;
            border-bottom: 1px dashed #ffffff;
            padding: 12px 12px;
            display: block;
            box-sizing: border-box;
          }
        }
      }
      .detail-cancle-div {
        display: flex;
        justify-content: center;
        align-items: center;
        .detail-content-cancel {
          width: 32px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .customer-info-wrap-in {
    background: url(/static/img/background-img-in.png) no-repeat center;
    background-size: 100% 100%;
  }
  .customer-info-wrap-out {
    background: url(/static/img/background-image.png) no-repeat center;
    background-size: 100% 100%;
  }
  .customer-info-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    .customer-img {
      width: calc(100% - 24px);
      height: calc(100% - 40px);
      /*padding: 20px 12px;*/
      margin: auto;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }
    img {
      //display: block;
      //width: 100%;
      //height: 100%;
      //margin-bottom: 20px;
     // box-sizing: border-box;
      //padding: 20px 12px;
      //margin: auto;
    }
    span.order {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -6px;
      width: calc(58%);
      display: inline-block;
      background: rgba(109, 46, 187, 0.3);
      padding: 0 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
    span.order-in {
      background: rgba(16, 156, 231, 0.3);
    }
    .customer-detail {
      position: absolute;
      bottom: 20px;
      right: 14px;
      font-size: 12px;
      span {
        text-align: center;
        line-height: 16px;
        display: block;
        width: 46px;
        height: 16px;
        margin-bottom: 4px;
        opacity: 0.4;
        background: #000000;
      }
    }
    .customer-detail-in {
      right: 14px;
    }
  }

</style>
