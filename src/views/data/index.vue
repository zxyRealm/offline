<template>
  <div class="data-wrap">
      <ul class="data-type">
      <li v-for="(value,index) in dataType" :key="index">
        <router-link :to="value.path">{{value.title}}</router-link>
      </li>
    </ul>
    <div class="data-wrap-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {eventObject} from '@/utils/event.js'
  export default {
      name: "data-index",
      components: {},
      data() {
        return {
          activeName: '客流分析',
          dataType: [
            {title:'客流分析',path: '/data/guest-analysis'},
            {title:'性别分析',path: '/data/gender-analysis'},
            {title:'年龄分析',path: '/data/age-analysis'},
            {title:'到店频次分析',path:'/data/shop-frequency-analysis'}
            ]
        };
      },
      mounted() {
            let my = "child";
      },
      beforeRouteLeave(to, from, next) {
        eventObject().$off('resize-echarts-data');
        next();
      }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .main-container {
    overflow: hidden;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .main-container::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .main-container::-webkit-scrollbar-track {
    width: 0px;
    height: 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 0px;
    background-color: #232027;//#9E9E9E;
    border-radius: 10px;
  }
  /*定义滑块 内阴影+圆角*/
  .main-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: 	#555;
  }
  /* 防止動效影響路由 */
  .flow-diagram  {
    overflow: hidden;
  }
  .data-wrap {
    height: 100%;
    background: #0F0E11;
    .data-type {
      font-size: 16px;
      color: #FFFFFF;
      width: 100%;
      min-width: 1020px;
      height: 40px;
      padding: 0 12px;
      box-sizing: border-box;
      background: rgba(64,58,73,0.30);
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
      .router-link-active {
         color: #0F9EE9;
         position: relative;
      }
     .router-link-active::after {
        content: '';
        background-image: linear-gradient(340deg, #813DC7 5%, #0F9EE9 100%);
        height: 3px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
      }
      > li {
        width: 17.6%;
        height: 40px;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        a {
          color: #FFFFFF;
          display: block;
        }
      }
    }
    //下面路由使用的公共样式

 }
</style>
