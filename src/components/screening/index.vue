<template>
  <div class="screening-wrap">
    <div>筛选</div>
    <el-form v-model="filterParams" class="demo-ruleForm" label-width="90px" :class="type!=1?'normal-from':'' ">
      <el-form-item label="选择社群：" class="white" prop="groupGuidName">
        <el-select
          class="group-name-input"
          @change="groupChange"
          value-key="guid"
          placeholder="请选择社群"
          v-model="filterParams.group">
          <el-option
            v-for="(item, $index) in groupList"
            :key="$index"
            :value="item"
            :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维度：" prop="timeIntervalUnit" auto-complete="off">
        <template v-for="(ele,index ) in dimensionData">
          <button
            class="dimension-button" @click.stop.prevent="handleButton(ele)"
            :key="index"
            :class="{actived: filterParams.timeIntervalUnit === ele.type}">{{ele.name}}
          </button>
        </template>
      </el-form-item>
      <el-form-item label="时间：" class="white" prop="startTime">
        <el-date-picker
          v-show="filterParams.timeIntervalUnit === 'hour'"
          type="date"
          v-model="filterParams.timeArray[0]"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          class="picker-data"
          :picker-options="pickerOptions1"
          :clearable="false"
          :clear-icon="''"
          :prefix-icon="''"
        >
        </el-date-picker>
        <el-date-picker
          v-show="filterParams.timeIntervalUnit === 'day' || filterParams.timeIntervalUnit === 'week'"
          v-model="filterParams.timeArray"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions1"
          :clearable="false"
          prefix-icon="''"
        >
        </el-date-picker>
        <el-date-picker
          v-show="filterParams.timeIntervalUnit === 'month'"
          v-model="filterParams.timeArray"
          type="monthrange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions1"
          :clearable="false"
          prefix-icon="''"
        >
        </el-date-picker>
        <span class="time--position"></span>
      </el-form-item>
      <el-form-item>
        <el-button class="affirm" @click.stop.prevent="submitForm()">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {eventObject} from '@/utils/event.js'
import {parseTime} from '@/utils/index'
import {MemberNoFloor, GetStoreList} from '../../api/community'
import {mapState} from 'vuex'
import Moment from 'moment'
export default {
  name: 'screening-index',
  props: ['type'],
  data () {
    return {
      currentGroup: '',
      pickerOptions1: { // 不能选择当前时间之后的日期
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dialogFormVisible: false, // 选择群组
      dialogOptions: {
        title: '选择社群',
        type: 'group'
      },
      dimensionData: [
        {name: '小时', type: 'hour'},
        {name: '日', type: 'day'},
        {name: '周', type: 'week'},
        {name: '月', type: 'month'}
      ], // 维度
      filterParams: {
        group: '', // 选择社群 6867A6C096844AD4982F19323B6C9574
        type: 'flow', // 类型
        timeIntervalUnit: 'hour', // 维度
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        timeArray: ['', '']
      },
      groupList: [] // 社群列表信息
    }
  },
  methods: {
    // 获取社群列表
    getGroupList () {
      if (!this.currentManage.id) return
      let pid = this.currentManage.id
      if (this.currentManage.type === 3) {
        GetStoreList({parentGuid: pid}).then(res => {
          this.groupList = res.data
          if (res.data[0]) {
            res.data[0].guid = res.data[0].groupSonGuid
          }
          this.filterParams.group = res.data[0]
        })
      } else {
        MemberNoFloor({groupId: pid}).then(res => {
          this.groupList = res.data
          this.filterParams.group = res.data[0]
        })
      }
    },
    // 更换选取社群
    groupChange () {
      // this.filterParams.groupName = this.groupList.filter(item => item.guid === this.filterParams.groupSonGuid)[0].name
    },
    // 点击维度
    handleButton (value) {
      this.filterParams.timeIntervalUnit = value.type
      this.filterParams.endTime = ''
      this.filterParams.startTime = ''
      // this.filterParams.timeArray = []
      const current = Moment(new Date()).format('YYYY-MM-DD')
      const firstDayMonth = Moment(new Date()).startOf('month').format('YYYY-MM-DD')
      if (value.type === 'hour') {
        this.filterParams.timeArray = [current, current]
      } else if (!this.filterParams.timeArray[0] || this.filterParams.timeArray[0] === current) {
        this.filterParams.timeArray = [firstDayMonth, current]
      }
      this.dealTime()
      this.$store.commit('SET_FILTER_PARAMS', this.filterParams)
    },
    // 处理时间
    dealTime () {
      let tempDate = this.filterParams.timeArray
      if (!tempDate[0]) {
        this.filterParams.startTime = ''
        this.filterParams.endTime = ''
        return
      }
      this.filterParams.startTime = (tempDate[0] || Moment().format('YYYY-MM-DD')) + ' 00:00:00'
      if (this.filterParams.timeIntervalUnit === 'month') {
        this.filterParams.startTime = (Moment(tempDate[0] || new Date()).format('YYYY-MM-01')) + ' 00:00:00'
        this.filterParams.endTime = Moment(tempDate[1]).endOf('month').format('YYYY-MM-DD 23:59:59')
      } else if (this.filterParams.timeIntervalUnit === 'hour') {
        this.filterParams.endTime = tempDate[0] + ' 23:59:59'
      } else {
        this.filterParams.endTime = tempDate[1] + ' 23:59:59'
      }
    },
    // vuex状态管理数据
    changeParams () {
      this.$store.commit('SET_FILTER_PARAMS', this.filterParams)
      // 通过eventBus通知兄弟组件更新数据
      try {
        eventObject().$emit('REFRESH_DATA', '')
      } catch (e) {
        console.info(e)
      }
    },
    // 查询
    submitForm () {
      if (!this.filterParams.group || !this.filterParams.group.guid) {
        this.$tip('请选择社群', 'error')
        return
      }
      if (this.filterParams.timeIntervalUnit !== 'hour' && !this.filterParams.timeArray.length) {
        this.$tip('请选择时间', 'error')
        return
      }
      eventObject().$emit('screening-params-change', '')
      this.dealTime()
      this.changeParams()
    },
    // 数据类型改变
    changeType (type) {
      this.filterParams.type = type
    }
  },
  created () {
    eventObject().$on('CHANGE_TYPE', this.changeType)
    this.getGroupList()
  },
  mounted () {
    // 默认值处理
    this.filterParams = this.$store.state.filterParams
    this.filterParams.type = this.type
    if (this.filterParams.timeIntervalUnit === 'hour') {
      this.filterParams.timeArray = [parseTime(new Date(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')]
    } else {
      this.filterParams.timeArray = []
    }
    this.dealTime()
    this.$store.commit('SET_FILTER_PARAMS', this.filterParams)
    if (this.filterParams.group && this.filterParams.group.guid) {
      eventObject().$emit('REFRESH_DATA', '')
    }
  },
  computed: {
    ...mapState(['currentManage'])
  },
  watch: {
    currentManage: {
      handler (val) {
        this.getGroupList()
      },
      deep: true
    }
  },
  beforeDestroy () {
    eventObject().$off('CHANGE_TYPE', this.changeType)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .screening-wrap{
    .el-form-item{
      .el-form-item__label{
        line-height: 30px;
      }
      .el-form-item__content{
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .demo-ruleForm {
    input {
      cursor: pointer;
    }
    .el-form-item__label {
      color: #ffffff;
    }
    .el-range__icon, .el-input__icon {
      display: none;
    }
    .el-range-separator {
      line-height: 18px;
      font-size: 12px;
    }
    .el-range-editor--small.el-input__inner {
      height: 28px;
      /*line-height: 28px;*/
      line-height: 1;
      padding-left: 4px;
    }
    .picker-data {
      input.el-input__inner {
        height: 28px;
        line-height: 28px;
      }
      input {
        border: none;
        background-image: none;
        background-color: #ffffff;
        color: #000000;
      }
    }
    label {
      font-weight: normal;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 12px;
      color: #000000;
    }
    .group-name-input {
      width: 210px;
      .el-input{
        height: 30px;
        background: #fff;
        border-radius: 3px;
        vertical-align: top;
        .el-input__suffix-inner{
          .el-input__icon{
            display: block;
            position: relative;
            background: transparent;
            &:before{
              content: "";
              position: absolute;
              width: 0px;
              height: 0px;
              top: 12px;
              right: 5px;
              border-right: 6px solid transparent;
              border-left: 6px solid transparent;
              border-top: 6px solid rgba(0, 0, 0, 0.6);
              cursor: pointer;
            }
          }
        }
      }
    }
    .el-range-editor--small .el-range-input, .group-name-input {
      /*padding-left: 2px;*/
      color: rgba(0, 0, 0, 0.72);
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .screening-wrap {
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: rgba(64, 58, 73, 0.30);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    .demo-ruleForm {
      box-sizing: border-box;
      padding: 40px 14px;
      .el-form-item--small.el-form-item {
        margin-bottom: 12px;
      }
      .el-input-editor{
        line-height: 28px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 210px;
        /*vertical-align: top;*/
        line-height: 28px;
        height: 28px;
      }
      .picker-data {
        .el-input--small .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
      .time--position {
        display: inline-block;
        position: relative;
        &::after {
          content: "";
          width: 0px;
          height: 0px;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          border-top: 6px solid rgba(0, 0, 0, 0.6);
          top: -6px;
          left: -30px;
          cursor: pointer;
          position: absolute;
        }
      }
      .icon-select {
        display: inline-block;
        position: absolute;
        &::after {
          content: "";
          position: relative;
          width: 0px;
          height: 0px;
          top: 12px;
          right: 12px;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          border-top: 6px solid rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
      }
      .dimension-button {
        width: 48px;
        height: 28px;
        line-height: 16px;
        background: transparent;
        border: 1px solid #ffffff;
        color: #ffffff;
        border-radius: 3px;
        font-size: 12px;
        margin-right: 6px;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        &:last-child{
          margin-right: 0;
        }
      }
      .actived {
        color: #2187DF;
        border: 1px solid transparent; /*#2187DF*/
        border-radius: 3px;
        border-image: linear-gradient(to right, #0F9DE8, #8440CA) 6;
        /*box-shadow: 0 2px 4px 0 rgba(22,20,24,0.50);*/
      }
    }
    .normal-from {
      padding: 14px !important;
    }
    .el-range-editor--small .el-range-input {
      font-size: 12px;
    }
  }
</style>
