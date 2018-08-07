<template>

  <div class="visited--detail__info" v-show="state">
    <transition name="fade-visited">
    <div class="detail--right__default clearfix" v-if="state">
      <div class="detail--header">
        <span class="header--title">到访记录详情</span>
        <img class="detail--close clearfix" src="/static/img/face_recoginiton_close_icon.png" @click="close"></img>
      </div>
      <div class="tip--info">
        <p>Face ID：1234567890123456789012345678909125</p>
        <p>共计到访101次</p>
      </div>
      <face-recognition @search-params="getFaceData"></face-recognition>
      <div  class="detail--info">
        <el-table
          :data="deviceList"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              <p class="operate--p" @click="getDetailInfo(scope.row)">111</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="抓拍图">
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
      }
    },
    data() {
      return {
        show: true,        //是否显示组件
        pageParams: {
          pageSize: '10',
          total: 1,         //总条数
          currentPage: 1    //当前第几页
        },
        deviceList: [
          {
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        },{
          bindingTime: "2018-08-03 16:04:40.0",
          createTime: "2018-08-03 16:04:28",
          deviceCsys: null,
          deviceKey: "1234567890654321",
          deviceName: "MINIPC",
          deviceScene: null,
          deviceType: 1,
          groupGuid: "F1EA2796C86C44B5AB89D5425FEF08D3",
          groupName: "顺溜刀削面",
          id: 0,
          logicDelete: 0,
          merchantGuid: "DB8C85BC04854398876985181E5F8CA4",
          useDescribe: null
        }]   //数据
      }
    },
    methods: {
      //当前显示第几页
      handleCurrentChange (val) {
        this.pageParams.currentPage = val;
        this.getData();
      },
      //关闭详情页
      close() {
        //this.$emit("changeState",false)
        this.$emit('update:state',false)  //第一种方式优化
      },
      getFaceData(params) {
        console.info(params,"detail");
      },
      //获取数据
      getData() {

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
      margin-right: 20px;
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
