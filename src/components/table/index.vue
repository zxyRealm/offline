<template>
    <div class="table-wrap">
      <div class="table-search">
        <span>表格数据</span>
        <input type="text" placeholder="输入关键字"/>
        <img src="/static/img/table-input-search.png">
      </div>
      <el-table :height=tabelHeight
        :data="tableData"
        border
        class="table-content">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <div class="table-page"> 
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageParams.currentPage"
          :page-sizes="[1,10, 20, 30, 40]"
          :page-size="pageParams.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "table-index",
      data() {
        return {
          pageParams: {
            pageSize: 1,      //每页显示条数
            total: 4,         //总条数
            currentPage: 1    //当前第几页
          },
          tableData: [ {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
          
        }
      },
      methods: {
        //每页显示条数
        handleSizeChange(val) {
          this.pageParams.pageSize = val;
          console.log(`每页 ${val} 条`);
        },
        //当前显示第几页
        handleCurrentChange(val) {
          this.pageParams.currentPage = val;
          console.log(`当前页: ${val}`);
        },
        //请求数据
        gettableData() {
           let params = {

           };
           this.$http({

           }).then(res => {
              if(res.result == 1){

              }
           });
        }
      },
      created() {
        //table高度改变
        window.onresize=function(){  
            let table = document.getElementsByClassName("table-content")[0];
            let tableEle = document.body.clientHeight - 640;
            table.style.height = tableEle+"px";
        } 
      },
      computed: {
         //首先给table高度赋值
         tabelHeight()  {
           let tableEle = document.body.clientHeight - 640;
           return tableEle+'px';
         }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .table-wrap {
    width: 100%;
    .table-search {
     height: 48px;
      line-height: 48px;
      font-size: 14px;
      input {
        float: right;
        margin-top: 8px;
        width: 282px;
        height: 28px;
        text-indent: 1em;
        border-radius: 3px;
        background: transparent;
        border: 1px solid #0F9CE7;
        color: #ffffff;
      }
      img {
      float: right;
      width: 17.5px;
      margin-top: 16px;
      margin-right: -278px;
      }
    }
    .cell {
      text-align: center;
    }
    .table-content {
      width: 100%;
      // height: 200px;
      overflow: auto;
      // .el-table th ,.el-table tr,.el-table__row {
      //   background-color: #303133!important;
      // }
    }
    .table-page {
      position: absolute;
      bottom: 20px;
      width: 100%;
      .el-pagination {
        text-align: right;
        box-sizing: border-box;
        padding-right: 40px;
        .el-pagination__total,.el-pagination__sizes {
          float: left;
        }
        .el-input__inner,.el-input {
          background: transparent !important;
        }
        .btn-prev,.btn-next {
          background: transparent;
        }
        .el-pager li {
          background: transparent;
        }
      }
    }
  }
</style>
