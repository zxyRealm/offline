<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening corner-bg">
        <screening :type="1"></screening>
      </div>
      <div class="flow-diagram corner-bg" ref="line">
        <echarts-line :line-height="'320px'" :line-params='lineParams' ref="echartsLine" :class="'data-children-background'"></echarts-line>
      </div>
    </div>
    <div class="table-data corner-bg">
      <table-data></table-data>
    </div>
  </div>
</template>
<script>
  import screening from '../../components/screening'
  import EchartsLine from '../../components/echarts/line'
  import TableData from '../../components/table/index'
  export default {
    name: "guest-analysis",
    components: {screening, EchartsLine, TableData},
    data() {
      return {
        //传递给线型图字段
        lineParams: {
          title: {text: '进/出客流量图'}
        }
      }
    },
    methods: {
      resizeFunction() {
        let me = this;
        let table = document.getElementById("echarts-line");
        //let tableEle = document.body.clientHeight - 420;
        table.style.height = me.$refs.line.offsetHeight + "px";
        //宽度
        table.style.width = me.$refs.line.offsetWidth + "px";
        me.$refs.echartsLine.resizeEcharts();
      }
    },
    mounted() {
      //
      let me = this;
      window.addEventListener("resize", me.resizeFunction);
    },
    beforeRouteLeave(to, from, next) {
      let me = this;
      window.removeEventListener("resize", me.resizeFunction);
      next();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .data-children-background {
      background: rgba(35,32,39,0.30);
      box-shadow: 0 0 4px 0 rgba(0,0,0,1);
   }
  .data-guest {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 12px 0 12px 0;
    .data-guest-content {
      width: 100%;
      min-width: 1020px;
      .screening, .flow-diagram {
        // border: 1px solid #0F9EE9;
        height: 320px;
      }
      .screening {
        width: 36.86%;
        float: left;
        position: relative;
        >div{
        &[class$='-bg']{
          position: absolute;
          height: 17px;
          width: 17px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        &.br-bg{
          bottom:-2px;
          right:-2px;
          background-image: url("/static/img/border_bottom_right_icon.png");
        }
        &.bl-bg{
          bottom:-2px;
          left:-3px;
          background-image: url("/static/img/border_bottom_left_icon.png");
        }
        &.tl-bg{
          top:-2px;
          left:-3px;
          background-image: url("/static/img/border_top_left_icon.png");
        }
        &.tr-bg{
          top:-2px;
          right:-2px;
          background-image: url("/static/img/border_top_right_icon.png");
        }
      }
      }
      .flow-diagram {
        width:62.17%;
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
      position: absolute;
      top: 386px;
      bottom: 0px;
      left: 0px;
      box-sizing: border-box;
      padding: 20px;
      // border: 1px solid red;
    }
  }
</style>
