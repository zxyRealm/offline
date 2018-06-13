<template>
  <div class="data-guest">
    <div class="data-guest-content">
      <div class="screening">
          <screening :type="0"></screening>
      </div>
      <div class="flow-diagram">
          <echarts-line :line-height="'320px'"></echarts-line>
      </div>
    </div>
    <div class="table-data">
       <table-data ></table-data>
    </div>
  </div>
</template>
<script>
  import screening from '../../components/screening'
  import EchartsLine from '../../components/echarts/line'
  import TableData from '../../components/table/index'
    export default {
        name: "guest-analysis",
        components: {screening,EchartsLine,TableData},
        data() {
            return {

            }
        },
        methods: {

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
        height: 320px;
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
      border: 1px solid red;
    }
  }
</style>
