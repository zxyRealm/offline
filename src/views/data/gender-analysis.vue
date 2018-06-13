<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening">
          <screening :type="1"></screening>
      </div>
      <div class="flow-diagram">
          <echarts-pie></echarts-pie>
      </div>
    </div>
    <div class="table-data">
       <echarts-line :line-height="tabelHeight"></echarts-line>
    </div>
  </div>
</template>
<script>
  import screening from '../../components/screening'
  import EchartsLine from '../../components/echarts/line'
  import EchartsPie from '../../components/echarts/pie'
    export default {
       name: "guest-analysis",
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
           //table高度改变
        window.onresize=function(){  
            let table = document.getElementById("echarts-line");
            let tableEle = document.body.clientHeight - 420;
            table.style.height = tableEle+"px";
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
        /*height: 230px;*/
        height: 230px;
      }
      .screening {
        /*width: 37.65%;*/
        width: 36.86%;
        float: left;
      }
      .flow-diagram {
       /* width: 61.37%;*/
        width: 62.17%;
        float: right;
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
