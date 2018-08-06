<template>
  <div class="cmm-table__face dashed-border">
    <h2 class="cmm-sub-title">识别人脸库</h2>
    <face-recognition @search-params="getFaceData"></face-recognition>
    <el-table
      :data="deviceKye"
      border
      style="width: 100%">
      <el-table-column
        label="抓拍图"
        width="80"
        class="table--td"
      >
        <template slot-scope="scope">
          <img src="/static/img/error_tip_icon.png" class="table--td__img"/>  <!--//{{scope.row.deviceName}}-->
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceKey"
        label="到访时间"
      >
      </el-table-column>
      <el-table-column
        prop="deviceType"
        label="到访社群"
      >
        <template slot-scope="scope">
          {{scope.row.deviceType|deviceType}}
        </template>
      </el-table-column>
      <el-table-column
        label="抓拍设备"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.createTime|parseTime('{y}/{m}/{d}')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <p class="operate--p" @click="getDetailInfo(scope.row)">查看识别记录详情</p>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageParams.pageSize"
        :layout="layout"
        :total="pageParams.total">
      </el-pagination>
    </div>
    <!-- lwh-到访记录详情 -->
    <visited-detail-info :state.sync="visitedState" @changeState="changeState"></visited-detail-info>
  </div>
</template>
<script>
    import FaceRecognition from '@/components/screening/FaceRecognition'
    import VisitedDetailInfo from './VisitedDetailInfo'
    export default {
        name: 'FaceRecognitionStore',
        components: {
          FaceRecognition,
          VisitedDetailInfo
        },
        props: {
          deviceKye: {
            type: Array,
            default: []
          }
        },
        data() {
            return {
              deviceList: [],
              pageParams: {
                pageSize: 10,      //每页显示条数
                total: 2,         //总条数
                currentPage: 1    //当前第几页
              },
              layout: 'total, sizes',
              visitedState: false   //到访信息状态
            }
        },
        methods: {
          //每页显示条数
          handleSizeChange (val) {
            this.pageParams.pageSize = val;
            this.getData();
          },
          //当前显示第几页
          handleCurrentChange (val) {
            this.pageParams.currentPage = val;
            this.getData();
          },
          //触发查询条件
          getFaceData(params) {
            console.info(params,111);
          },
          //改变到访详情显示状态
          changeState(val) {
            console.info(11111111111,val)
            this.visitedState = val;
          },
          //查看识别记录详情
          getDetailInfo(info) {
            console.info(info,this.visitedState = true);
          },
          // 获取数据
          getData() {

          }
        },
      watch: {
        deviceKye: {
          handler: function (val, oldVal) {
            this.layout = val.length == 0 ? 'total, sizes' : 'total, sizes, prev, pager, next';
          },
          deep: true
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  .community--main {
    .cmm-table__face {
      .el-table .cell {
        //line-height: 12px;
      }
      .el-table--border td:first-child .cell {
        text-align: center;
        line-height: 12px;
      }
      .el-table--small td {
        padding: 5px 0;
      }
      thead tr th:nth-child(1) {
        text-align: center;
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .cmm-table__face {
    padding: 20px;
    height: auto;
    box-sizing: border-box;
    .cmm-sub-title {
      font-size: 16px;
      color: #FFFFFF;
    }
    .operate--p {
      font-size: 12px;
      color: #0F9EE9;
      cursor: pointer;
    }
    .table--td__img {
      width: 40px;
    }
    .table-page {
      margin-top: 15px;
      .el-pagination {
        text-align: right;
        box-sizing: border-box;
        padding-right: 40px;
        .el-pagination__total, .el-pagination__sizes {
          float: left;
        }
        .el-input__inner, .el-input {
          background: transparent !important;
        }
        .btn-prev, .btn-next {
          background: transparent;
        }
        .el-pager li {
          background: transparent;
        }
      }
    }
  }
</style>
