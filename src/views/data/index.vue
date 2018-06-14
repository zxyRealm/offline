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
  export default {
      name: "data-index",
      components: {},
      data() {
        return {
          indexType: 0,
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
 }
</style>
