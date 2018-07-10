<template>
  <div class="ob-dialog-info-wrap vam" v-show="isShow">
    <div class="ob-dialog-info-main">
      <div class="ob-dialog-info-content vam" :class="type">
        <img :src="'data:image/jpg;base64,'+data.img" alt="访客图像">
        <div class="detail-info">
          <p v-for="(item,$index) in info" :key="$index" v-if="$index!=='img'">
           {{item}}
          </p>
        </div>
      </div>
      <div class="tac">
        <span class="ob-dialog-info-close" @click="isShow=false">
        </span>
      </div>
    </div>
  </div>

</template>
<script>
  import { parseTime } from '@/utils/index'
  export default {
    name:'ob-dialog-info',
    props:{
      visible:{
        type:Boolean,
        default:false
      },
      data:{
        type:[Object,Array],
        default:()=>({})
      }
    },
    data() {
      return {
        isShow:false
      }
    },
    created(){
      console.log('data',this.data)
    },
    watch: {
      visible(val){
        this.isShow = val
      },
      isShow(val){
        this.$emit("update:visible",val)
      },
      data:{
        handler(val){
          console.log('new data',val)
        },
        deep:true
      }
    },
    computed:{
      info(){
        let obj = {};
        if(this.data.status){
          obj.order = `第${this.data.order}位出客`
        }else {
          obj.order = `第${this.data.order}位进客`;
          obj.gender = this.data.gender===-1?'未知':this.data.gender?'男':'女';
          obj.age = this.data.age === -1 ? "未知" : this.data.age;
        }
        obj.day = parseTime(this.data.time,'{m}/{d}');
        obj.time = parseTime(this.data.time,'{h}:{s}');
       return obj;
      },
      type(){
        return this.data.status?'out':'in';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  /* 遮罩层div */
  .ob-dialog-info-wrap{
    min-width: 1280px;
    min-height: 720px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    text-align: center!important;
    .ob-dialog-info-main {
      .ob-dialog-info-content{
        position: relative;
        background: rgba(16, 156, 231, 0.2);
        background-repeat:no-repeat,no-repeat,no-repeat,no-repeat;
        background-position: left top,right top,right bottom,left bottom;
        background-image: url(/static/img/console-detail-border-icon-top.png),url(/static/img/console-detail-border-icon-right.png),url(/static/img/console-detail-border-icon-bottom.png),url(/static/img/console-detail-border-icon-left.png);
        background-size: 52px auto;
        padding: 40px;
        &.in{
          background-image: url(/static/img/console-detail-border-in-icon-top.png),url(/static/img/console-detail-border-in-icon-right.png),url(/static/img/console-detail-border-in-icon-bottom.png),url(/static/img/console-detail-border-in-left.png);
          >img{
            border: 2px solid #6D2EBB;
          }
        }
        >img{
          display: inline-block;
          height: 420px;
          min-width: 150px;
          border: 2px solid #109CE7;
        }
        .detail-info{
          padding-left:30px;
          text-align: center;
          >p{
            height: 1.5em;
            color: #ffffff;
            border-bottom: 1px dashed #ffffff;
            padding: 12px 12px;
            display: block;
          }
        }
      }
      .ob-dialog-info-close {
        display: inline-block;
        width: 32px;
        height: 32px;
        cursor: pointer;
        background: url("/static/img/cancel-img.png") no-repeat center center;
        background-size: cover;
        border-radius: 50%;
        margin-top: 12px;
      }
    }
  }
</style>
