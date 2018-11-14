<template>
  <div class="cmm-table__face dashed-border">
    <h2 class="cmm-sub-title">识别人脸库</h2>
    <div class="people__number">
      <div class="people__cont">
        <div class="cont__middle">
          <div class="cont__title">识别总人数：</div>
          <div class="cont__number">{{contData.personCount}}</div>
          <div class="cont__title">人</div>
        </div>
      </div>
      <div class="people__cont">
        <div class="cont__middle">
          <div class="cont__title">会员人数：</div>
          <div class="cont__number">{{contData.memberCount}}</div>
          <div class="cont__title">人</div>
        </div>
      </div>
    </div>
    <face-recognition @search-params="getFaceData"></face-recognition>
    <el-table
      :data="faceData"
      border
      style="width: 100%">
      <el-table-column
        label="抓拍图"
        width="120"
        class="table--td"
      >
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl || ''" class="table--td__img" @click="getBigImage(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="到访社群/时间"
      >
        <template slot-scope="scope">

          <div>{{scope.row.groupName}}</div>
          <div>{{scope.row.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</div>
        </template>
      </el-table-column>

      <el-table-column label="人员信息">
        <template slot-scope="scope">
          <span class="table__gender">{{scope.row.gender ? '男' : '女'}}</span>
          <span class="table__age">{{scope.row.age ? scope.row.age : '-'}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="personName" width="50" label="性别">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="table__gender" v-if="scope.row.gender === 1">男</span>-->
          <!--<span class="table__gender" v-else>女</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="age" width="60" label="年龄"></el-table-column>-->
      <el-table-column
        prop="cameraName"
        label="所属人员库"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span class="library" v-for="(item , index) in scope.row.memberLibaryName"
                :key="index">
            {{item}}
          </span>
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
    <visited-detail-info
      :state.sync="visitedState"
      :detailInfo="detailInfo"
      :deviceList="deviceList">
    </visited-detail-info>
  </div>
</template>
<script>
import FaceRecognition from '@/components/screening/FaceRecognition'
import VisitedDetailInfo from './VisitedDetailInfo'
import {eventObject} from '@/utils/event'

export default {
  name: 'FaceRecognitionStore',
  components: {
    FaceRecognition,
    VisitedDetailInfo
  },
  props: {
    guid: {
      type: String,
      default: ''
    },
    deviceList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      groupGuid: '', // 新增设备groupGuid
      paramsInSear: { // 查询条件
      },
      detailInfo: {}, // 详情页
      faceData: [],
      pageParams: {
        pageSize: 10, // 每页显示条数 = 默认
        total: 0, // 总条数
        currentPage: 1 // 当前第几页
      },
      layout: 'total, sizes',
      visitedState: false, // 到访信息状态personName
      contData: {
        personCount: 0,
        memberCount: 0
      }
    }
  },
  methods: {
    // 每页显示条数
    handleSizeChange (val) {
      this.pageParams.pageSize = val
      this.pageParams.currentPage = 1
      this.getDataInParams(this.paramsInSear)
    },
    // 当前显示第几页
    handleCurrentChange (val) {
      this.pageParams.currentPage = val
      this.getDataInParams(this.paramsInSear)
    },
    // 触发查询条件
    getFaceData (params) {
      this.groupGuid = params.groupGuid // 新曾需求
      this.paramsInSear = {...params}
      this.pageParams.currentPage = 1
      this.getDataInParams(this.paramsInSear)
    },
    // 根据查询条件查询数据
    getDataInParams (params) {
      let paramsSearch = {
        groupGuid: this.groupGuid || this.guid,
        deviceKey: (params && params.deviceKey) || '',
        cameraName: '',
        startTime: (params && params.startTime) || '',
        endTime: (params && params.endTime) || '',
        index: this.pageParams.currentPage,
        length: this.pageParams.pageSize
      }
      if (paramsSearch.groupGuid) {
        this.$http('/group/faceSet/search', paramsSearch).then(res => {
          this.faceData = (res.data && res.data.content) || []
          this.pageParams.total = res.data.pagination.total
        }).catch(error => {
          console.info(error)
        })
      }
    },
    // 查看用户大图
    getBigImage (info) {

    },
    // 查看识别记录详情
    getDetailInfo (info) {
      this.detailInfo = info
      this.visitedState = true
      // 触发传递设备列表到人脸识别库搜索组件上
      eventObject().$emit('FaceRecognition', this.deviceList)
    },
    // 获取识别人数
    getContNumber () {
      let data = {
        groupGuid: this.guid
      }
      this.$http('/group/faces/count', data).then(res => {
        this.contData = res.data
      })
    }
  },
  watch: {
    // 监听guid改变
    guid: {
      handler (val) {
        this.groupGuid = val
        this.pageParams.currentPage = 1
        this.getDataInParams()
        this.getContNumber()
      },
      deep: true
    },
    // 监听图片数据
    faceData: {
      handler: function (val, oldVal) {
        this.layout = !val.length ? 'total, sizes' : 'total, sizes, prev, pager, next'
      },
      deep: true
    }
  },
  mounted () {
    this.getDataInParams()
    this.getContNumber()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .community--main  {
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
      width: 80px;
      height: 80px;
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
<style scoped>
  .people__number{
    margin: 22px 0 12px 0;
    height: 60px;
    background: url(/static/img/peopleNum.png);
    background-size: cover;
  }
  .people__cont{
    margin-top: 15px;
    box-sizing: border-box;
    float: left;
    width: 50%;
    height: 30px;
    line-height: 30px;
  }
  .people__cont:nth-child(1){
    border-right: 1px dashed rgba(255, 255, 255, 0.2);
  }
  .cont__middle{
    margin-left: 15%;
  }
  .cont__title{
    float: left;
    font-size: 14px;
  }
  .cont__number{
    margin: 0 10px;
    float: left;
    font-size: 26px;
  }
  .table__name{
    float: left;
    width: 55px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .table__gender{
    margin-left: 15px;
  }
  .table__age{
    margin-left: 15px;
  }
  .library{
    margin-left: 10px;
  }
</style>
