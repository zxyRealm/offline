<template>
    <div class="face--recognition__wrap">
        <div class="label_div">
          <span>抓拍设备：</span>
          <el-select v-model="params.deviceKey" placeholder="请选择" class="el--select__default">
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
            v-model="params.startTime"
            type="datetime"
            placeholder="开始时间"
            :clearable = "true"
            prefix-icon = "''"
            value-format="yyyy-MM-dd hh:mm:ss"
            class="picker-data">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            v-model="params.endTime"
            type="datetime"
            placeholder="结束时间"
            :clearable = "true"
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
  import {eventObject} from '@/utils/event'
    export default {
        name: 'FaceRecognition',
        props: {
        },
        components: {},
        data() {
          let that = this;
            return {
              pickerOptions1: {   //不能选择开始时间之前的日期
                disabledDate(time) {
                  return time.getTime() < new Date(that.params.startTime);that.params.startTime
                }
              },
              params: {           //开发条件
                deviceKey: '',
                startTime: '',
                endTime: ''
              },
              options: []       //设备数据
            }
        },
        methods: {
          //对外开放的条件
          search() {
            this.$emit("search-params", this.params);
          },
          resolveData(data) {
            this.options = [...data];
            this.options.unshift({
              deviceName: '全部',
              deviceKey: ''
            });
            this.params = {           //重置开发条件
              deviceKey: '',
              startTime: '',
              endTime: ''
            };
          }
        },
      watch: {
      },
      created() {
//        eventObject().$on('FaceRecognition',(data) => {
//          console.info(data,"eee")
//          this.resolveData(data);
//        })
      },
      mounted() {
        eventObject().$on('FaceRecognition',(data) => {
          this.resolveData(data);
        })
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
      input {
        cursor: pointer;
      }
      div.picker-data {
        width: 154px;
        position: relative;
        /*&::after {*/
          /*content: '';*/
          /*position: absolute;*/
          /*top: 8px;*/
          /*right: 8px;*/
          /*width: 14px;*/
          /*height: 16px;*/
          /*background: url(/static/img/face_recognition_date_icon.png) no-repeat center;*/
          /*background-size: 14px;*/
        /*}*/
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
      .el-input__suffix {
        right: 0;
      }
    }
    .el-date-picker__editor-wrap .el-input .el-input__inner {
      color: #606266;
    }
</style>
