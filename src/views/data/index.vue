<template>
  <div class="data-wrap">
      <ul class="data-type">
      <li class="" v-for="(value,index) in dataType" :key="index" @click="selectType(index)" :class="indexType==index? 'active': ''">
        <router-link :to="path[index]">{{value}}</router-link>
        <div :class="indexType==index?'data-type-selected':''"></div>
      </li>
    </ul>
    <div class="data-wrap-content">
      <router-view></router-view>
     <!-- <echarts-line></echarts-line>-->
    <!--  <echarts-pie></echarts-pie>-->
    </div>
  </div>
</template>

<script>
  import EchartsLine from '../../components/echarts/line'
  import EchartsPie from '../../components/echarts/pie'
  export default {
      name: "index",
      components: {EchartsLine,EchartsPie},
      data() {
        return {
          indexType: 0,
          activeName: '客流分析',
          path: ['/data/guest-analysis','/data/gender-analysis','/data/age-analysis','/data/shop-frequency-analysis'],
          dataType: ['客流分析','性别分析','年龄分析','到店频次分析']
        };
      },
      mounted() {

      },
      methods: {
        /* 选择类型 */
        selectType(index) {
            this.indexType = index;
        }
      }
  }
</script>
<style>
   ul,li {
     list-style: none;
   }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .data-wrap {
    height: 100%;
    .data-type {
      font-size: 16px;
      color: #FFFFFF;
      width: 100%;
      min-width: 1020px;
      height: 40px;
      padding: 0 12px;
      box-sizing: border-box;
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
      .active {
        a {
          color: #0F9EE9;
        }
     }
     .data-type-selected {
        background-image: linear-gradient(340deg, #813DC7 5%, #0F9EE9 100%);
        height: 3px;
      }
    }
    .data-wrap-content {
      /*height: calc(100% - 40px);*/
    }
 }
</style>
