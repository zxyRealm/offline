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
        v-model="timeArray[0]"
        placeholder="选择日期"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        class="picker-data"
        :picker-options="pickerOptions1"
        :clearable="false"
      ></el-date-picker>
      <el-date-picker
        v-show="currentParams.timeIntervalUnit === 'day' || currentParams.timeIntervalUnit === 'week'"
        v-model="timeArray"
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
        v-model="timeArray"
        type="monthrange"
        align="center"
        unlink-panels
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="yyyy/MM"
        value-format="yyyy/MM"
        :picker-options="pickerOptions1"
        :clearable="false"
      >
      </el-date-picker>
      <el-radio-group v-model="currentParams.timeIntervalUnit">
        <el-radio-button v-for="t in dimensionData" :label="t.type">
          {{t.name}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="echarts-wrap">
      <!--客流量-->
      <div class="flow">
        <div class="item item-4-3">
          <chart-bar></chart-bar>
        </div>
        <div class="item item-4-1">
          <div class="rank-list">
            <div class="rank-title">
              <i class="iconfont icon-biaotitubiao"></i>
              客流统计表
            </div>
            <el-table
              class="rank-table"
              :data="rankData.store"
            >
              <el-table-column
                width="140"
                props="date"
                label="时间">
                <template slot-scope="scope">
                  {{new Date().toLocaleDateString()}}
                </template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="客流量">
              </el-table-column>
            </el-table>
            <el-pagination
              small
              background
              class="rank__pagination--custom"
              layout="pager,jumper"
              :pager-count="3"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--排行榜-->
      <div class="rank">
        <div class="item item-4">
          <div class="rank-list">
            <div class="rank-title">
              <i class="iconfont icon-biaotitubiao"></i>
              门店排行
            </div>
            <el-table
              class="rank-table"
              :data="rankData.store"
            >
              <el-table-column
                width="70"
                label="排名">
                <template slot-scope="scope">
                  No.{{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="门店">
              </el-table-column>
              <el-table-column
                width="60"
                prop="date"
                label="占比">
              </el-table-column>
              <el-table-column
                width="90"
                prop="date"
                label="客流量">
              </el-table-column>
            </el-table>
            <el-pagination
              small
              background
              class="rank__pagination--custom"
              layout="pager,jumper"
              :pager-count="3"
              :total="1000">
            </el-pagination>
          </div>
        </div>
        <div class="item item-4">
          <div class="rank-list">
            <div class="rank-title">
              <i class="iconfont icon-biaotitubiao"></i>
              楼层排行
            </div>
            <el-table
              class="rank-table"
              :data="rankData.store"
            >
              <el-table-column
                width="70"
                label="排名">
                <template slot-scope="scope">
                  No.{{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="楼层">
              </el-table-column>
              <el-table-column
                width="60"
                prop="date"
                label="占比">
              </el-table-column>
              <el-table-column
                width="90"
                prop="date"
                label="客流量">
              </el-table-column>
            </el-table>
            <el-pagination
              small
              background
              class="rank__pagination--custom"
              layout="pager,jumper"
              :pager-count="3"
              :total="1000">
            </el-pagination>
          </div>
        </div>
        <div class="item item-4">
          <div class="rank-list">
            <div class="rank-title">
              <i class="iconfont icon-biaotitubiao"></i>
              业态排行
            </div>
            <el-table
              class="rank-table"
              :data="rankData.store"
            >
              <el-table-column
                width="70"
                label="排名">
                <template slot-scope="scope">
                  No.{{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="业态">
              </el-table-column>
              <el-table-column
                width="60"
                prop="date"
                label="占比">
              </el-table-column>
              <el-table-column
                width="90"
                prop="date"
                label="客流量">
              </el-table-column>
            </el-table>
            <el-pagination
              small
              background
              class="rank__pagination--custom"
              layout="pager,jumper"
              :pager-count="3"
              :total="1000">
            </el-pagination>
          </div>
        </div>
        <div class="item item-4">
          <div class="rank-list">
            <div class="rank-title">
              <i class="iconfont icon-biaotitubiao"></i>
              商场出入口客流量分布
            </div>
            <el-table
              class="rank-table"
              :data="rankData.store"
            >
              <el-table-column
                width="70"
                label="排名">
                <template slot-scope="scope">
                  No.{{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="出入口">
              </el-table-column>
              <el-table-column
                width="60"
                prop="date"
                label="占比">
              </el-table-column>
              <el-table-column
                width="90"
                prop="date"
                label="客流量">
              </el-table-column>
            </el-table>
            <el-pagination
              small
              background
              class="rank__pagination--custom"
              layout="pager,jumper"
              :pager-count="3"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--性别-->
      <div class="gender">
        <div class="item item-4-1">
          <Chart
            title="性别比例"
            :data="ratioData.gender"
            type="gender"></Chart>
        </div>
        <div class="item item-4-3">
          <chart-line
            title="性别流量图"
            type="gender"
          ></chart-line>
        </div>
      </div>
      <!--年龄-->
      <div class="age">
        <div class="item item-4-3">
          <chart-line
            title="年龄流量图"
            type="age"
          ></chart-line>
        </div>
        <div class="item item-4-1">
          <Chart
            :data="ratioData.age"
            mode="horizontal"
            title="年龄比例" type="age">
          </Chart>
        </div>
      </div>
      <!--回头客-->
      <div class="return">
        <div class="item item-4-1">
          <Chart
            :data="ratioData.repeat"
            title="回头客比例"
            type="repeat">
          </Chart>
        </div>
        <div class="item item-4-3">
          <chart-line
            title="回头客流量图"
            type="repeat"
          ></chart-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echarts/three-pie'
import ChartLine from '@/components/echarts/line'
import ChartBar from './components/bar'
import Moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Chart,
    ChartLine,
    ChartBar
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
      timeArray: ['', ''],
      currentParams: { // 查询参数变量
        group: '', // 选择社群 6867A6C096844AD4982F19323B6C9574
        timeIntervalUnit: 'day', // 维度
        startTime: '',
        endTime: ''
      },
      ratioData: { // 比例数据
        age: [],
        gender: [],
        repeat: [
          {}
        ]
      },
      rankData: {
        store: [
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 },
          { name: '阿迪阿迪阿迪阿迪', percent: '10%', num: 50 }
        ],
        floor: [],
        industry: [],
        gate: []
      }
    }
  },
  created () {
  },
  mounted () {
    this.setDefaultDate()
    // this.changeParams()
  },
  computed: {
    ...mapState(['currentManage']),
    // 时间选择器类型
    dateType () {
      let type = 'daterange'
      switch (this.currentParams.timeIntervalUnit) {
        case 'hour':
          type = 'date'
          break
        case 'day':
        case 'week':
          type = 'daterange'
          break
        case 'month':
          type = 'monthrange'
          break
      }
      return type
    }
  },
  methods: {
    // 格式化时间参数
    formatDateParams () {
      let { timeIntervalUnit } = this.currentParams
      // Moment格式化 2018/09/18 形式的日期时会警告日期格式问题
      let timeArray = JSON.parse(JSON.stringify(this.timeArray)).map(item => item.replace(/\//g, '-'))
      // timeIntervalUnit 改变时重新格式化startTime、endTime
      // 为满足传参要求
      this.currentParams.startTime = (Moment(timeArray[0]).format('YYYY-MM-DD')) + ' 00:00:00'
      switch (timeIntervalUnit) {
        case 'month':
          this.currentParams.startTime = (Moment(timeArray[0] || new Date()).format('YYYY-MM-01')) + ' 00:00:00'
          this.currentParams.endTime = Moment(timeArray[1]).endOf('month').format('YYYY-MM-DD 23:59:59')
          break
        case 'hour':
          this.currentParams.endTime = Moment(timeArray[0]).format('YYYY-MM-DD') + ' 23:59:59'
          break
        default:
          this.currentParams.endTime = (Moment(timeArray[1]).format('YYYY-MM-DD')) + ' 23:59:59'
          break
      }
    },
    // 设置默认时间
    setDefaultDate () {
      const current = Moment(new Date()).format('YYYY/MM/DD')
      const firstDayMonth = Moment(new Date()).startOf('month').format('YYYY/MM/DD')
      const firstDayWeek = Moment(new Date()).startOf('week').format('YYYY/MM/DD')
      // this.currentParams.timeArray = [Moment(new Date()).format('YYYY/01/01'), current]
      switch (this.currentParams.timeIntervalUnit) {
        case 'month':
          this.timeArray = [firstDayMonth, current]
          break
        case 'day':
        case 'hour':
          this.timeArray = [current, current]
          break
        default:
          this.timeArray = [firstDayWeek, current]
          break
      }
    },
    // 条件改变时获取数据
    getEchartsData () {
      const _this = this
      const { group, timeIntervalUnit, startTime, endTime } = this.currentParams
      const params = {
        groupGuid: _this.currentManage.id,
        groupSonGuid: group.guid,
        timeIntervalUnit,
        startTime,
        endTime
      }
      console.log('params------------', params)
    }
  },
  watch: {
    'currentParams.timeIntervalUnit' () {
      this.setDefaultDate()
    },
    'timeArray': {
      handler () {
        this.formatDateParams()
      },
      deep: true
    },
    currentParams: {
      handler (val) {
        this.getEchartsData()
      },
      deep: true
    }
  }
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
    .echarts-wrap {
      padding: 20px 20px 0;
      box-sizing: border-box;
      background: #F7F7F7;
      overflow: hidden;
      > div {
        height: 500px;
        margin-bottom: 20px;
      }
      .item-4 {
        width: calc(25% - 15px);
      }
      .item-4-1 {
        width: calc(25% - 10px);
      }
      .item-4-3 {
        width: calc(75% - 10px);
      }
      .item {
        float: left;
        height: 100%;
        padding: 15px;
        background: #fff;
        box-sizing: border-box;
        & + .item {
          margin-left: 20px;
        }
      }
      .flow {
        /*height: 502px;*/
      }

    }
    .rank-list {
      height: 100%;
    }
    .rank-title {
      font-size: 16px;
    }

  }
</style>
<style lang="scss">
  @import "~@/styles/variables.scss";

  $fontColor: #252525;
  .data__content--wrap {
    .filter-wrap {
      .el-date-editor {
        .el-range-input {
          font-size: 13px;
        }
      }
    }
    .rank-table {
      width: 100%;
      height: calc(100% - 60px);
      table {
        tr,
        th,
        td {
          color: #252525;
        }
      }
    }
    .rank__pagination--custom {
      width: 100%;
      padding: 0;
      .el-pager {
        float: left;
        li {
          color: $theme-white-color;
          &:not(.disabled) {
            background: #fff;
            border: 1px solid #f0f0f0;
            box-sizing: border-box;
            &.active {
              background: #fff;
              border-color: $theme-blue;
              color: $theme-white-color;
            }
          }
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .el-pagination__jump {
        min-width: auto;
        margin-left: 0;
        color: $fontColor;
        .el-input {
          width: 40px;
        }
      }
    }
  }
</style>
