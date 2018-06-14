<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening">
          <screening :type="1"></screening>
      </div>
       <div class="flow-diagram" ref="pie">
          <echarts-pie ref="echartsPie"></echarts-pie>
      </div>
    </div>
    <div class="table-data" ref="line">
       <echarts-line :line-height="tabelHeight" ref="echartsLine"></echarts-line>
    </div>
  </div>
</template>
<script>
  import screening from '../../components/screening'
  import EchartsLine from '../../components/echarts/line'
  import EchartsPie from '../../components/echarts/pie'
    export default {
       name: "gender-analysis",
       components: {screening,EchartsLine,EchartsPie},
       data() {
         return {

         }
       },
       methods: {

       },
      created() {
       
      },
      computed: {
         //首先给table高度赋值
         tabelHeight()  {
           let tableEle = document.body.clientHeight - 420;
           return tableEle+'px';
         }
      },
      mounted() {
        let me = this;
        window.onresize = () => {  
            let table = document.getElementById("echarts-line");
            //let tableEle = document.body.clientHeight - 420;
            table.style.height = me.$refs.line.offsetHeight +"px";
            //宽度
            table.style.width = me.$refs.line.offsetWidth +"px";
            me.$refs.echartsLine.resizeEcharts();

            let tablePie = document.getElementById("echarts-pie");
            tablePie.style.width = me.$refs.pie.offsetWidth +"px";
            me.$refs.echartsPie.resizeEcharts();
        } 
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data-guest {
     width: 100%;
     height: 100%;
     box-sizing: border-box;
     padding: 12px 0 12px 0;
    .data-guest-content {
      width: 100%;
      min-width: 1020px;
      .screening, .flow-diagram {
        border: 1px solid #0F9EE9;
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
      position: absolute;
      top: 294px;
      bottom: 0px;
      left: 0px;
      box-sizing: border-box;
      border: 1px solid red;
    }
  }
</style>
