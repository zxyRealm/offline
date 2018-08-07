<template>
    <div class="face--recognition__wrap">
        <div class="label_div">
          <span>抓拍设备：</span>
          <el-select v-model="params.device" placeholder="请选择" class="el--select__default">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="label_div">
          <span>时间段：</span>
          <el-date-picker
            v-model="params.startTime"
            type="datetime"
            placeholder="开始时间"
            :clearable = "false"
            prefix-icon = "''"
            value-format="yyyy-MM-dd hh:mm:ss"
            class="picker-data">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model="params.endTime"
            type="datetime"
            placeholder="结束时间"
            :clearable = "false"
            prefix-icon = "''"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="pickerOptions1"
            class="picker-data">
          </el-date-picker>
        </div>
      <div class="label_div margin--default">
        <el-button class="affirm medium" @click="search">搜索</el-button>
      </div>
    </div>
</template>
<script>
  import { parseTime } from '@/utils/index'
    export default {
        name: 'FaceRecognition',
        components: {},
        data() {
          let that = this;
            return {
              pickerOptions1: {   //不能选择开始时间之前的日期
                disabledDate(time) {
                  return time.getTime() < Date.now(that.params.startTime);
                }
              },
              params: {           //开发条件
                device: '',
                startTime: '',
                endTime: ''
              },
              options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }, {
                value: '选项6',
                label: '北京烤鸭'
              }, {
                value: '选项7',
                label: '北京烤鸭'
              }]
            }
        },
        methods: {
          search() {
            this.$emit("search-params", this.params);
          }
        }
    }
</script>
<style  rel="stylesheet/scss" lang="scss">
    .face--recognition__wrap {
      width: 100%;
      height: 50px;
      padding: 10px 0;
      box-sizing: border-box;
      white-space: nowrap;
      div.label_div {
          display: inline-block!important;
          margin-right: 13px;
      }
      span {
        font-size: 12px;
      }
      div.picker-data {
        width: 154px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 14px;
          height: 16px;
          background: url(/static/img/face_recognition_date_icon.png) no-repeat center;
          background-size: 14px;
        }
        .el-input__inner {
          padding-left: 8px;
        }
        .el-input__inner {
          padding-right: 0px;
        }
      }
      div.margin--default {
        margin-right: 0px;
      }
      .el--select__default .el-input--small input.el-input__inner {
        width: 154px;
        height: 32px;
        line-height: 32px;
      }
      .el-button.medium {
        width: 60px;
        height: 30px;
      }
      .el-input .el-input__inner {
        color: #ffffff;
      }
    }
    .el-input .el-input__inner {
      color: #606266;
    }
</style>
