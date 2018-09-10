<template>
  <div class="face--recognition__wrap">
    <div class="label_div">
      <span>抓拍设备：</span>
      <el-select v-model="params.deviceKey" clearable placeholder="请选择" class="el--select__default">
        <el-option
          v-for="item in options"
          :key="item.deviceKey"
          :label="item.deviceName"
          :value="item.deviceKey">
        </el-option>
      </el-select>
    </div>
    <div class="label_div">
      <span>时间段：</span>
      <el-date-picker
        v-model="arrayTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        popper-class="picker--data__face"
        class="picker-data">
      </el-date-picker>
    </div>
    <div class="label_div margin--default">
      <el-button class="affirm medium" @click.stop.prevent="search">搜索</el-button>
    </div>
  </div>
</template>
<script>
import {eventObject} from '@/utils/event'

export default {
  name: 'FaceRecognition',
  props: {},
  components: {},
  data () {
    let that = this
    return {
      arrayTime: [],
      pickerOptions1: { // 不能选择开始时间之前的日期
        disabledDate (time) {
          return time.getTime() < new Date(that.params.startTime)
          that.params.startTime
        }
      },
      params: { // 开发条件
        groupGuid: '', // 新曾设备匹配groupGuid
        deviceKey: '',
        startTime: '',
        endTime: ''
      },
      options: [] // 设备数据
    }
  },
  methods: {
    // 对外开放的条件
    search () {
      if (this.arrayTime && this.arrayTime.length) {
        this.params.startTime = this.arrayTime[0]
        this.params.endTime = this.arrayTime[1]
      } else {
        this.params.startTime = ''
        this.params.endTime = ''
      }
      this.addGroupGuid()
      this.$emit('search-params', this.params)
    },
    // 新增上传设备guid
    addGroupGuid () {
      this.options.forEach((val, index) => {
        if (val.deviceKey === this.params.deviceKey) {
          this.params.groupGuid = val.groupGuid
        }
      })
    },
    // 转化参数
    resolveData (data) {
      this.options = [...data]
      this.params = { // 重置开发条件
        groupGuid: '',
        deviceKey: '',
        startTime: '',
        endTime: ''
      }
      this.arrayTime = []
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    eventObject().$on('FaceRecognition', (data) => {
      this.resolveData(data)
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .face--recognition__wrap {
    width: 100%;
    height: 50px;
    padding: 10px 0;
    box-sizing: border-box;
    white-space: nowrap;
    div.label_div {
      display: inline-block !important;
      margin-right: 8px;
      .el-date-editor .el-range-input {
        width: 140px;
      }
    }
    span {
      font-size: 12px;
    }
    input {
      cursor: pointer;
    }
    div.picker-data {
      width: 350px;
      position: relative;
      border: none;
      background: url(/static/img/input_border_bg@2x.png) no-repeat center;
      background-size: 100% 100%;
      background-color: transparent;
      color: #fff;
      .el-range-input {
        background: transparent;
      }

      .el-input__inner {
        padding-left: 8px;
      }
      .el-input__inner {
        padding-right: 0;
      }
    }
    div.margin--default {
      margin-right: 0;
    }
    .el--select__default .el-input--small input.el-input__inner {
      width: 154px;
      height: 32px;
      line-height: 32px;
    }
    .el-select .el-input .el-select__caret.is-show-close {
      &:hover {
        color: #ffffff;
      }
      &::before {
        content: '\E607' !important;
      }
    }
    .el-button.medium {
      width: 60px;
      height: 30px;
    }
    .el-date-editor .el-range-input {
      color: #ffffff;
    }
    .el-input__suffix {
      //right: 0;
    }
  }
  .el-picker-panel__body-wrapper .el-input .el-input__inner {
    color: #606266;
  }
  .picker-data.el-date-editor .el-range-separator {
    color: #ffffff !important;
  }
  /** 时间控件 **/
  div.picker--data__face{
    margin-left: -1px;
    .el-time-panel {
      margin: 5px -20px;
    }
  }
  /** 下拉控件 **/
  div.el-select-dropdown  {
    margin-left: 0px;
  }
</style>
