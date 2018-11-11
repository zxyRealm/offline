<template>
  <div class="screening-wrap">
    <div>筛选</div>
    <el-form v-model="filterParams" class="demo-ruleForm" label-width="90px" :class="type!=1?'normal-from':'' ">
      <el-form-item label="选择社群：" class="white" prop="groupGuidName">
        <input
          class="group-name-input"
          :clearable="false"
          readonly
          placeholder="请选择社群"
          v-model.trim="filterParams.groupGuidName"
          @click="groupGuidNameClick"
          auto-complete="off"/>
        <span class="icon-select"></span>
      </el-form-item>
      <el-form-item label="维度：" prop="dimension" auto-complete="off">
        <template v-for="(ele,index ) in dimensionData">
          <button
            class="dimension-button" @click.stop.prevent="handleButton(index)"
            :key="index"
            :class="(filterParams.dimension-1) == index?'actived':''">{{ele}}
          </button>
        </template>
      </el-form-item>
      <el-form-item label="时间：" class="white" prop="startTime">
        <el-date-picker
          v-show="filterParams.dimension == 1"
          type="date"
          v-model="filterParams.startTime"
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
          v-show="filterParams.dimension > 1"
          v-model="filterParams.timeArray"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
    <!-- 选择社群 -->
    <ob-dialog-form
      @remote-submit="remoteSubmit"
      :group="groupList"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
import {eventObject} from '@/utils/event.js'
import {parseTime} from '@/utils/index'

export default {
  name: 'screening-index',
  props: ['type'],
  data () {
    return {
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
      dimensionData: ['小时', '日', '周', '月'], // 维度
      filterParams: {
        groupGuid: '', // 选择社群 6867A6C096844AD4982F19323B6C9574
        type: '', // 类型
        dimension: '', // 维度
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        timeArray: [],
        groupGuidName: ''
      },
      groupList: [] // 社群列表信息

    }
  },
  methods: {
    // 选择对象
    groupGuidNameClick () {
      this.$http('/group/list/noCustom').then(res => {
        this.groupList = res.data
        this.dialogFormVisible = true
      })
    },
    // 确定弹框
    remoteSubmit (data) {
      if ((!data || data.length === 0)) {
        this.$tip('请选择社群', 'error')
        return
      }
      this.dialogFormVisible = false
      this.filterParams.groupGuidName = data[0].name
      this.filterParams.groupGuid = data[0].groupGuid
    },
    // 点击维度
    handleButton (value) {
      this.filterParams.dimension = value + 1
      if (value == 0) this.filterParams.endTime = this.filterParams.startTime = parseTime(new Date(), '{y}-{m}-{d}')
    },
    // 处理时间
    dealTime () {
      if (this.filterParams.timeArray.length !== 0 && this.filterParams.dimension != 1) {
        let tempDate = this.filterParams.timeArray
        this.filterParams.startTime = tempDate[0]
        this.filterParams.endTime = tempDate[1]
      } else {
        this.filterParams.endTime = this.filterParams.startTime
      }
    },
    // vuex状态管理数据
    changeParams () {
      this.$store.commit('SET_FILTER_PARAMS', this.filterParams)
      // 这这里触发兄弟组件更新条件
      try {
        this.$parent.$children[1].getData()
        this.$parent.$children[2].getData()
      } catch (e) {
        console.info(e)
      }
    },
    // 查询
    submitForm () {
      if (this.filterParams.groupGuid === '') {
        this.$tip('请选择社群', 'error')
        return
      }
      if (this.filterParams.dimension > 1 && this.filterParams.timeArray.length == 0) {
        this.$tip('请选择时间', 'error')
        return
      }

      eventObject().$emit('screening-params-change', '')
      this.dealTime()
      this.changeParams()
    }
  },
  created () {
    eventObject().$on('resize-echarts-data', msg => { // eventObject接收事件  == 控制数据可视化的图表重置
      let consoleTimer = null
      if (consoleTimer) {
        consoleTimer = null
      }
      consoleTimer = setTimeout(() => {
        this.$parent.resizeFunction()
      }, 300)
    })
  },
  mounted () {
    // 默认值处理
    this.filterParams.startTime = this.$store.state.filterParams.startTime
    this.filterParams.endTime = this.$store.state.filterParams.endTime
    this.filterParams.timeArray = this.$store.state.filterParams.timeArray
    this.filterParams.type = this.type
    this.filterParams.groupGuidName = this.$store.state.filterParams.groupGuidName
    this.filterParams.groupGuid = this.$store.state.filterParams.groupGuid
    this.filterParams.dimension = this.$store.state.filterParams.dimension
    this.$store.commit('SET_FILTER_PARAMS', this.filterParams)
    if ((this.filterParams.groupGuid !== '') && (!!this.filterParams.groupGuid)) {
      this.$parent.$children[1].getData()
      this.$parent.$children[2].getData()
    }
  },
  computed: {}
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .screening-wrap{
    .el-form-item{
      .el-form-item__label{
        line-height: 28px;
      }
      .el-form-item__content{
        height: 28px;
        line-height: 28px;
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
    .el-range-editor--small .el-range-input, .group-name-input {
      padding-left: 2px;
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
        vertical-align: top;
        line-height: 28px;
        height: 28px;
      }
      .picker-data {
        .el-input--small .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
      .group-name-input {
        width: 210px;
        height: 28px !important;
        line-height: 28px;
        font-size: 12px;
        border-radius: 3px;
        text-indent: 12px;
        border: none;
        background-size: 100% 100%;
        cursor: pointer;
        vertical-align: top;
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
          width: 0px;
          height: 0px;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          border-top: 6px solid rgba(0, 0, 0, 0.6);
          top: 14px;
          left: -28px;
          cursor: pointer;
          position: relative;
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
      }
      .actived {
        color: #2187DF;
        border: 1px solid; /*#2187DF*/
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
