/*
* @author  张晓元
* @date    2019-05-05
*/
<template>
  <div class="data__content--wrap">
    <h3 class="data-title">数据分析</h3>
    <div class="filter-wrap">
      <el-select v-model="currentParams.group">
        <el-option
          v-for="item in groupList"
          :label="item.name"
          :value="item.guid"
        >{{item.name}}
        </el-option>
      </el-select>
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
        <el-radio-button v-for="t in dimensionData" :label="t.type" :key="t.name">
          {{t.name}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="echarts-wrap">
      <!--客流量-->
      <div class="flow">
        <div class="item item-4-3">
          <chart-bar :data="lineData.flow"></chart-bar>
        </div>
        <div class="item item-4-1">
          <data-list
            type="flow"
            @handle-change="getRankListData"
            :data="rankData.flow">
          </data-list>
        </div>
      </div>
      <!--排行榜-->
      <div class="rank" v-if="currentManage.type !== 2">
        <div class="item item-4">
          <data-list
            type="store"
            @handle-change="getRankListData"
            :data="rankData.store">
          </data-list>
        </div>
        <template v-if="!isChain">
          <div class="item item-4">
            <data-list
              type="floor"
              @handle-change="getRankListData"
              :data="rankData.floor">
            </data-list>
          </div>
          <div class="item item-4">
            <data-list
              type="industry"
              @handle-change="getRankListData"
              :data="rankData.industry">
            </data-list>
          </div>
        </template>
        <div v-else class="item item-map">

        </div>
        <div class="item item-4">
          <data-list
            :type="isChain ? 'area' : 'gate'"
            @handle-change="getRankListData"
            :data="rankData[isChain ? 'area' : 'gate']">
          </data-list>
        </div>
      </div>
      <!--性别-->
      <div class="gender">
        <div class="item item-4-1">
          <Chart
            title="性别比例"
            :data="pieData.gender"
            type="gender"></Chart>
        </div>
        <div class="item item-4-3">
          <chart-line
            title="性别流量图"
            type="gender"
            :data="lineData.gender"
          ></chart-line>
        </div>
      </div>
      <!--年龄-->
      <div class="age">
        <div class="item item-4-3">
          <chart-line
            title="年龄流量图"
            type="age"
            :data="lineData.age"
          ></chart-line>
        </div>
        <div class="item item-4-1">
          <Chart
            mode="horizontal"
            title="年龄比例"
            type="age"
            :props="{name: 'name'}"
            :data="pieData.age">
          </Chart>
        </div>
      </div>
      <!--回头客-->
      <div class="return">
        <div class="item item-4-1">
          <Chart
            title="回头客比例"
            type="repeat"
            :data="pieData.repeat">
          </Chart>
        </div>
        <div class="item item-4-3">
          <chart-line
            title="回头客流量图"
            type="repeat"
            :data="lineData.repeat"
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
import DataList from './components/list'
import Moment from 'moment'
import { mapState } from 'vuex'
import {
  getInOutFlowList,
  getDeduplicatedList,
  getChainAreaList,
  getChainStoreList,
  getMarketStoreList,
  getMarketFloorList,
  getMarketIndustryList,
  getMarketGateList,
  getInOutFlowLine,
  getDeduplicatedFlowLine,
  getGenderLine,
  getAgeLine,
  getRepeatLine,
  getGenderPie,
  getAgePie,
  getRepeatPie
} from '@/api/visual'
import { getManageMember } from '@/api/community'

export default {
  name: 'index',
  components: {
    Chart,
    ChartLine,
    ChartBar,
    DataList
  },
  data () {
    return {
      count: 0,
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
      deduplicated: false, // 是否展示去重客流
      lineData: { // 折线图/柱状图数据
        flow: {},
        age: {},
        gender: {},
        repeat: {}
      },
      pieData: { // 饼图数据
        age: [],
        gender: [],
        repeat: []
      },
      rankData: {
        flow: { // 进出、去重 客流统计表
          content: [],
          pagination: {}
        },
        store: {
          content: [
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 },
            { groupName: '阿迪阿迪阿迪阿迪', percent: '10%', count: 50 }
          ],
          pagination: {}
        },
        floor: {},
        industry: {},
        gate: {},
        area: {}
      },
      groupList: [
        {
          guid: ''
        }
      ] // 社群列表
    }
  },
  created() {
    this.setDefaultDate()
    this.getManageMemberList()
  },
  mounted () {
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
    },
    // 格式请求参数
    fetchParams () {
      const _this = this
      const { group, timeIntervalUnit } = this.currentParams
      let timeArray = JSON.parse(JSON.stringify(this.timeArray)).map(item => item.replace(/\//g, '-'))
      let [startTime, endTime] = []
      startTime = (Moment(timeArray[0]).format('YYYY-MM-DD')) + ' 00:00:00'
      switch (timeIntervalUnit) {
        case 'month':
          startTime = (Moment(timeArray[0] || new Date()).format('YYYY-MM-01')) + ' 00:00:00'
          endTime = Moment(timeArray[1]).endOf('month').format('YYYY-MM-DD 23:59:59')
          break
        case 'hour':
          endTime = Moment(timeArray[0]).format('YYYY-MM-DD') + ' 23:59:59'
          break
        default:
          endTime = (Moment(timeArray[1]).format('YYYY-MM-DD')) + ' 23:59:59'
          break
      }
      return {
        groupGuid: _this.currentManage.groupGuid,
        groupSonGuid: group.guid,
        timeIntervalUnit,
        startTime,
        endTime,
        size: 8
      }
    },
    // 是否为连锁
    isChain () {
    // && this.groupList[0].guid === this.currentParams.group
      return this.currentManage.type === 3
    }
  },
  methods: {
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
    getEchartsData (type) {
      const _this = this
      let params = { chartModel: _this.fetchParams }
      if (type === 'inout') params.orientation = 2
      let apiMap = {
        flow: _this.deduplicated ? getDeduplicatedFlowLine : getInOutFlowLine, // 进出、去重 客流柱状图
        repeat: getRepeatLine, //
        age: getAgeLine, // 年龄
        gender: getGenderLine, // 性别
        repeatPie: getRepeatPie,
        agePie: getAgePie,
        genderPie: getGenderPie
      }
      try {
        apiMap[type](params).then((res) => {
          if (type.includes('Pie')) {
            this.pieData[type.replace(/Pie/, '')] = res.data
          } else {
            this.lineData[type] = res.data
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    /*
     * 获取排行列表分页数据
     * @param {Object} option - 参数
     * @param {String} option.type - 需调用的接口类型
     * @param {Number} option.page - 请求数据页码
     */
    getRankListData ({ type, page }) {
      let _this = this
      let params = { chartModel: _this.pfetchParams, page: page, size: 8 }
      let apiMap = {
        flow: _this.deduplicated ? getDeduplicatedList : getInOutFlowList, // 进出/去重 客流统计表
        gate: getMarketGateList, // 商场出入口
        floor: getMarketFloorList, // 商场楼层排行
        industry: getMarketIndustryList, // 商场业态排行
        store: _this.currentManage.type === 1 ? getMarketStoreList : getChainStoreList, // 连锁门店排行
        area: getChainAreaList // 连锁区域排行
      }

      try {
        apiMap[type](params).then((res) => {
          if (type === 'area') {
            console.log('area', res.data)
            let startIndex = (page - 1) * 8
            this.rankData.area = {
              content: res.data.slice(startIndex, startIndex + 8),
              pagination: {
                total: res.data.length,
                index: page || 1
              }
            }
          } else {
            this.rankData[type] = res.data
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    // 页面加载获取商场所有列表
    getMarketAllList () {
      // this.getRankListData({ type: 'flow' })
      this.getRankListData({ type: 'floor' })
      this.getRankListData({ type: 'industry' })
      this.getRankListData({ type: 'gate' })
      this.getRankListData({ type: 'store' })
    },

    // 页面加载获取连锁所有列表
    getChainAllList () {
      // this.getRankListData({ type: 'flow' })
      this.getRankListData({ type: 'store' })
      this.getRankListData({ type: 'area' })
    },

    getAllList () {
      switch (this.currentManage.type) {
        case 1:
          this.getMarketAllList()
          break
        case 2:
          this.getChainAllList()
          break
      }
      this.getRankListData({ type: 'flow' })
    },
    // 获取所有echarts图表数据
    getAllEchartsData () {
      this.getEchartsData('flow')
      this.getEchartsData('gender')
      this.getEchartsData('genderPie')
      this.getEchartsData('age')
      this.getEchartsData('agePie')
      this.getEchartsData('repeat')
      this.getEchartsData('repeatPie')
    },

    // 获取社群成员列表
    getManageMemberList () {
      let pid = this.currentManage.groupGuid
      if (!pid) return
      getManageMember({groupGuid: pid}).then((res) => {
        this.groupList = res.data
        this.currentParams.group = res.data[0].guid
      })
    }
  },
  watch: {
    'currentParams.timeIntervalUnit' () {
      this.setDefaultDate()
    },
    currentParams: {
      handler () {
        if (!this.currentManage.groupGuid) return
        this.getAllEchartsData()
        this.getAllList()
        this.count++
        console.log(this.count)
      },
      deep: true
    },
    currentManage: {
      handler (val) {
        this.getManageMemberList()
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
      .el-select {
        float: left;
        width: 168px;
        margin-right: 20px;
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
      .item-map{
        width: calc(50% - 10px);
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
      .el-radio-button {

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
