<template>
  <div class="table-wrap">
    <div class="table-search">
      <span>表格数据</span>
      <div v-if="false">
        <input v-model="fuzzyQuery" type="text" placeholder="输入关键字"/>
        <img src="/static/img/table-input-search.png" @click="doSearch">
      </div>
    </div>
    <!-- element自带滚动条 -->
    <el-table
      :data="tableData"
      border
      :highlight-current-row="false"
      class="table-content">
      <el-table-column
        prop="groupName"
        label="社群名称">
      </el-table-column>
      <el-table-column
        prop="dateTime"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="inFlowerCount"
        label="进客量">
      </el-table-column>
      <el-table-column
        prop="outFlowerCount"
        label="出客量">
      </el-table-column>
    </el-table>
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageParams.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pageParams.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table-index",
    data() {
      return {
        fuzzyQuery: '',     //模糊匹配
        pageParams: {
          pageSize: 10,      //每页显示条数
          total: 0,         //总条数
          currentPage: 1    //当前第几页
        },
        tableData: []

      }
    },
    methods: {
      //每页显示条数
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getData();
      },
      //当前显示第几页
      handleCurrentChange(val) {
        this.pageParams.currentPage = val;
        this.getData();
      },
      //条件请求数据
      doSearch() {
        //this.gettableData();
      },
      //请求数据
      getData() {
        let params = this.$store.state.filterParams;
        let filterParams = {
          groupGuid: params.groupGuid,
          groupName: params.groupGuidName,
          type: params.type,              //类型
          dimension: params.dimension,    //维度
          startTime: params.startTime,    //开始时间
          endTime: params.endTime,        //结束时间
          length: this.pageParams.pageSize,
          index: this.pageParams.currentPage
        };
        this.$http('/chart/flowCount', filterParams).then(res => {
          if (res.result == 1) {
            this.tableData = res.data.content;
            this.pageParams.total = res.data.pagination.total;
            this.$set(this.pageParams, "total", res.data.pagination.total)
          }
        }).catch(error => {
          console.info(error);
        });
      },
      initSize() {
        //table高度改变
        this.$nextTick(() => {
          let table = document.getElementsByClassName("table-content")[0];
          if (!table) return;
          let tableEle = 0;
          if (document.body.clientHeight < 720) {
            tableEle = 206;
          } else {
            tableEle = document.body.clientHeight - 640;
          }
          table.style.height = tableEle + "px";
        })
      }
    },
    mounted() {
      window.addEventListener('resize', this.initSize);
      this.initSize();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .table-wrap {
    width: 100%;
    min-height: 300px;
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
      min-height: 200px;
      table {
        border-collapse: inherit;
      }
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
