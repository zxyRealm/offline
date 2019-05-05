/*
* @author  张晓元
* @date    2019-05-05
*/
<template>
  <div class="data__content--wrap">
    <h3 class="data-title">数据分析</h3>
    <div class="filter-wrap">
      <el-date-picker
        v-show="currentParams.timeIntervalUnit === 'hour'"
        type="date"
        v-model="currentParams.timeArray[0]"
        placeholder="选择日期"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        class="picker-data"
        :picker-options="pickerOptions1"
        :clearable="false"
        prefix-icon="''"
      ></el-date-picker>
      <el-date-picker
        v-show="currentParams.timeIntervalUnit === 'day' || currentParams.timeIntervalUnit === 'week'"
        v-model="currentParams.timeArray"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        :picker-options="pickerOptions1"
        :clearable="false"
      >
      </el-date-picker>
      <el-date-picker
        v-show="currentParams.timeIntervalUnit === 'month'"
        v-model="currentParams.timeArray"
        type="monthrange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        :picker-options="pickerOptions1"
        :clearable="false"
      >
      </el-date-picker>
      <el-radio-group v-model="currentParams.timeIntervalUnit">
        <el-radio-button label="hour">小时</el-radio-button>
        <el-radio-button label="day">日</el-radio-button>
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="echarts-wrap">
      <!--客流量-->
      <div class="flow">
        <div class="item item-4-3">

        </div>
        <div class="item item-4-1"></div>
      </div>
      <!--排行榜-->
      <div class="rank">
        <div class="item item-4"></div>
        <div class="item item-4"></div>
        <div class="item item-4"></div>
        <div class="item item-4"></div>
      </div>
      <!--性别-->
      <div class="sex">
        <div class="item item-4-1"></div>
        <div class="item item-4-3"></div>
      </div>
      <!--年龄-->
      <div class="age">
        <div class="item item-4-3"></div>
        <div class="item item-4-1">
          <Chart
            :data="ratioData.age"
            mode="horizontal"
            title="年龄比例" type="age"
            width="100%" height="100%"></Chart>
        </div>
      </div>
      <!--回头客-->
      <div class="return">
        <div class="item item-4-1"></div>
        <div class="item item-4-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echarts/three-pie'
export default {
  name: 'index',
  components: {
    Chart
  },
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dimensionData: [
        { name: '小时', type: 'hour' },
        { name: '日', type: 'day' },
        { name: '周', type: 'week' },
        { name: '月', type: 'month' }
      ],
      currentParams: {
        timeIntervalUnit: 'day',
        timeArray: []
      },
      ratioData: {
        age: []
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  .data__content--wrap {
    .data-title {
      height: 72px;
      line-height: 72px;
      padding: 0 40px;
      border-bottom: 1px solid #F0F0F0;
      font-size: 22px;
      font-weight: normal;
    }
    .filter-wrap {
      height: 72px;
      padding: 18px 40px;
      border-bottom: 1px solid #F0F0F0;
      box-sizing: border-box;
      .el-date-editor {
        float: left;
        width: 218px;
        margin-right: 20px;
        .el-range-input {
          font-size: 13px;
        }
      }
    }
    .echarts-wrap{
      padding: 20px 20px 0;
      box-sizing: border-box;
      background: #F7F7F7;
      overflow: hidden;
      > div{
        height: 500px;
        margin-bottom: 20px;
        border-bottom: 1px solid #0f9ee9;
      }
      .item-4{
        width: calc(25% - 15px);
      }
      .item-4-1{
        width: calc(25% - 10px);
      }
      .item-4-3{
        width: calc(75% - 10px);
      }
      .item{
        float: left;
        height: 100%;
        background: #fff;
        &+ .item{
          margin-left: 20px;
        }
      }
      .flow{
        /*height: 502px;*/
      }

    }
  }
</style>
<style lang="scss">
  .data__content--wrap {
    .filter-wrap {
      .el-date-editor {
        .el-range-input {
          font-size: 13px;
        }
      }
    }
  }
</style>
