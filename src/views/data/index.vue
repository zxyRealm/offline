<template>
  <div class="data-wrap" v-if="$route.name!=='guest-analysis'">
    <ul class="data-type">
      <li v-for="(value,index) in dataType" :key="index">
        <router-link :to="value.path">{{value.title}}</router-link>
      </li>
    </ul>
    <div class="data-wrap-content">
      <router-view></router-view>
    </div>
  </div>
  <div class="guest-analysis" v-else>
    <el-scrollbar ref="scrollItem">
      <div class="data-wrap">
        <ul class="data-type">
          <li v-for="(value,index) in dataType" :key="index">
            <router-link :to="value.path">{{value.title}}</router-link>
          </li>
        </ul>
        <router-view></router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {eventObject} from '@/utils/event.js'

export default {
  name: 'data-index',
  components: {},
  data () {
    return {
      activeName: '客流统计',
      dataType: [
        {title: '客流统计', path: '/data/guest-analysis'},
        {title: '性别分析', path: '/data/gender-analysis'},
        {title: '年龄分析', path: '/data/age-analysis'},
        {title: '到店频次分析', path: '/data/shop-frequency-analysis'}
      ]
    }
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    eventObject().$off('resize-echarts-data')
    next()
  }
}
</script>
<style lang="scss" scoped>

</style>
<style rel="stylesheet/scss" lang="scss">
  @import "@/styles/variables.scss";
  .guest-analysis {
    height: 100%;
    > .el-scrollbar {
      height: 100%;
      > .el-scrollbar__wrap {
        /*background-color: rgba(0, 0, 0, 0.5);*/

      }
    }
    > .is-horizontal {
      display: none;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
    }
    .el-scrollbar__view {
      height: 100%;
      .data-guest {
        height: calc(100% - 40px);
        padding: 12px 0 0;
        .table-data {
          min-height: calc(100% - 330px);
          background-color: $content-bg;
        }
      }
    }
  }

  .main-container {
    overflow: hidden;
  }

  /* 防止動效影響路由 */
  .flow-diagram {
    overflow: hidden;
  }

  .data-wrap {
    height: 100%;
    background: #040404;
    .corner-bg{
      > div:not(.table-wrap) {
        background-color: $content-bg;
      }
    }
    .data-type {
      font-size: 16px;
      color: #FFFFFF;
      width: 100%;
      min-width: 1020px;
      height: 40px;
      padding: 0 12px;
      box-sizing: border-box;
      background-color: $content-bg;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
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

  .data-guest {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 12px 0 12px 0;
    .data-guest-content {
      width: 100%;
      .screening, .flow-diagram {
        height: 230px;
      }
      .screening {
        width: 36.86%;
        float: left;
      }
      .flow-diagram {
        width: 62.17%;
        float: right;
      }
      &::after {
        content: '';
        width: 0;
        height: 0;
        clear: both;
        display: block;
        overflow: hidden;
      }
    }
    .table-data {
      width: 100%;
      margin-top: 10px;
      box-sizing: border-box;
    }
  }

</style>
