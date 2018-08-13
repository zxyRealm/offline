<template>

  <div class="visited--detail__info" v-show="state" @click="closeShade">
    <transition name="fade-visited">
    <div class="detail--right__default clearfix" v-show="state">
      <div class="detail--header">
        <span class="header--title">到访记录详情</span>
        <img class="detail--close clearfix" src="/static/img/face_recoginiton_close_icon.png" @click="close"></img>
      </div>
      <div class="tip--info">
        <p>Face ID：{{detailInfo.ufaceId}}</p>
        <p>共计到访{{pageParams.total}}次</p>
      </div>
      <face-recognition @search-params="getFaceDataDetail"></face-recognition>
      <div  class="detail--info">
        <el-table
          :data="faceData"
          border
          style="width: 100%">
          <el-table-column
            prop="order"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            label="抓拍图"
            width="120">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl || ''" class="table--td__img"/>  <!--//{{scope.row.deviceName}}-->
            </template>
          </el-table-column>
          <el-table-column
            prop="systemTime"
            label="到访时间"
          >
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="到访社群"
          >
          </el-table-column>
          <el-table-column
            prop="cameraName"
            label="抓拍设备"
          >
          </el-table-column>

        </el-table>
        <div class="table-page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageParams.currentPage"
            :page-size="10"
            layout="prev, pager, next"
            :total="pageParams.total">
          </el-pagination>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  import FaceRecognition from "../../components/screening/FaceRecognition.vue";
  export default {
    components: {FaceRecognition},
    props: {
      state: {
        type: Boolean,
        default: false  //组件是否显示
      },
      detailInfo: {

      },
      deviceList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        show: true,        //是否显示组件
        pageParams: {
          pageSize: '10',    //默认每页显示10条
          total: 0,         //总条数
          currentPage: 1    //当前第几页
        },
        paramsInSear: {  //查询条件

        },
        faceData: []   //数据
      }
    },
    methods: {
      //当前显示第几页
      handleCurrentChange (val) {
        this.pageParams.currentPage = val;
        this.getDataInParams(this.paramsInSear)
      },
      //关闭详情页
      close(event) {
        //this.$emit("changeState",false)
        this.$emit('update:state',false)  //第一种方式优化
      },
      closeShade(event) {
        if(event.target.className.indexOf("visited--detail__info") >-1){
          this.$emit('update:state',false)  //第一种方式优化
        }
      },
      getFaceDataDetail(params) {
        this.pageParams.currentPage = 1;
        this.paramsInSear = {...params};
        this.getDataInParams(this.paramsInSear)
      },
      //根据查询条件查询数据
      getDataInParams(params) {
        let paramsSearch = {
          groupGuid: this.detailInfo.groupGuid,
          ufaceId: this.detailInfo.ufaceId,
          deviceKey: (params && params.deviceKey )|| '',
          cameraName:  this.detailInfo.cameraName,
          startTime: (params && params.startTime) || '',
          endTime: (params && params.endTime) || '',
          index: this.pageParams.currentPage,
          length: this.pageParams.pageSize
        };
        this.$http('/group/faces/search',paramsSearch).then(res => {
          if(res.result == 1){
            //console.info(res,"detail");
            this.faceData = (res.data && res.data.content) || [];
            this.pageParams.total = res.data.pagination.total;
          }
        }).catch(error => {
          console.info(error);
        });
      },
      //获取数据
      getData() {
        //默认进来为1
        this.pageParams.currentPage = 1;
        let params = {
          groupGuid: this.detailInfo.groupGuid,
          ufaceId: this.detailInfo.ufaceId,
          index: this.pageParams.currentPage,
          length: this.pageParams.pageSize
        };
        this.$http('/group/faces', params).then(res => {
          if (res.result == 1) {
            this.faceData = (res.data && res.data.content) || [];
            //console.info(this.deviceList,"this.deviceList");
            this.pageParams.total = res.data.pagination.total;
          }
        }).catch(error => {
          console.info(error);
        })
      }
    },
    watch: {
      detailInfo: {
        handler: function (val,oldVal){
          //this.getData();
        },
        deep: true
      },
      //监听状态改变刷新数据
      state(val,oldVal) {
        if(val) {
          this.getDataInParams();
        }
      },
      deviceList(val,oldVal) {
//        console.info(val,'详情页')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .visited--detail__info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.70);
    z-index: 1111;
    border-radius: 1px;
    .detail--right__default {
      //position: absolute;
      height: 100%;
      //right: 0;
      float: right;
      width: 760px;
      background: #141319;
      border-radius: 1px;
      .detail--header {
        width: 100%;
        height: 40px;
        background-image: linear-gradient(90deg, #8041C6 0%, #2090E4 100%);
        border-radius: 1px;
        .header--title {
          font-size: 16px;
          color: #FFFFFF;
          line-height: 40px;
          margin-left: 22px;
        }
        .detail--close {
           width: 12px;
           float: right;
           margin-top: 14px;
           margin-right: 22px;
          cursor: pointer;
        }
      }
      .tip--info {
        font-size: 12px;
        color: #FFFFFF;
        margin-left: 30px;
        margin-top: 16px;
        p {
          padding: 1px 0;
        }
      }
      .face--recognition__wrap {
        padding-left: 30px;
      }
      .detail--info {
        box-sizing: border-box;
        padding: 0 30px;
        table {
          .table--td__img {
            width: 40px;
            height: 40px;
          }
          .el-table__row td:nth-child(2) .cell {
            text-align: center;
            line-height: 12px;
          }
          .el-table__row td {
            padding: 4px 0;
          }
          thead tr th:nth-child(2) {
            text-align: center;
          }
        }
      }
    }
    .face--recognition__wrap div.label_div {
      margin-right: 6px;
    }

  }
  /* 清楚浮动 */
  .clearfix:after{
    display: block;
    content:'';
    clear: both;
    height:0;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-visited-enter-active, .fade-visited-leave-active {
    transition: all .5s;
  }
  .fade-visited-enter, .fade-visited-leave-active {
    transform: translateX(760px);
  }
</style>
