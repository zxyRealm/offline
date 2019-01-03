<template>
  <div class="table-wrap">
    <div class="table-search">
      <span>表格数据</span>
      <div v-if="false">
        <input v-model.trim="fuzzyQuery" type="text" placeholder="输入关键字"/>
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
        :layout="layout"
        :total="pageParams.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {eventObject} from '@/utils/event.js'
import {GetFlowCount} from '../../api/visual'

export default {
  name: 'table-index',
  data () {
    return {
      fuzzyQuery: '', // 模糊匹配
      pageParams: {
        pageSize: 10, // 每页显示条数
        total: 0, // 总条数
        currentPage: 1 // 当前第几页
      },
      layout: 'total, sizes',
      tableData: []
    }
  },
  methods: {
    // 每页显示条数
    handleSizeChange (val) {
      this.pageParams.pageSize = val
      this.getData()
    },
    // 当前显示第几页
    handleCurrentChange (val) {
      this.pageParams.currentPage = val
      this.getData()
    },
    // 条件请求数据
    doSearch () {
      // this.gettableData();
    },
    // 请求数据
    getData () {
      let params = JSON.parse(JSON.stringify(this.$store.state.filterParams))
      params.size = this.pageParams.pageSize
      params.page = this.pageParams.currentPage
      params.startTime = params.startTime + ' 00:00:00'
      params.endTime = params.endTime + ' 23:59:59'
      if (!params.groupSonGuid) {
        this.$tip('请您先选择社群', 'error')
        return
      }
      GetFlowCount(params).then(res => {
        this.tableData = res.data.content || []
        this.$set(this.pageParams, 'total', res.data.pagination.total || 0)
      })
      // this.$http('/chart/flowCount', params).then(res => {
      //   this.tableData = res.data.content || []
      //   this.$set(this.pageParams, 'total', res.data.pagination.total || 0)
      // }).catch(error => {
      //   console.info(error)
      // })
    },
    initSize () {
      // table高度改变
      this.$nextTick(() => {
        let tableHead = document.getElementsByClassName('table-content')[0]
        let table = document.getElementsByTagName('table')[0]
        if (!table || !tableHead) return
        let tableEle = 0
        if (document.body.clientHeight < 720) {
          // tableEle = 206;
          tableEle = 80
        } else {
          tableEle = document.body.clientHeight - 631
        }
        // tableHead.style.minHeight = tableEle + "px";
        if (this.tableData.length === 0) {
          tableEle = 0
        }
        table.style.height = tableEle + 'px'
      })
    },
    removeResize () {
      window.removeEventListener('resize', this.initSize)
    }
  },
  mounted () {
    // 查询条件改变并且确定后，当前页码重置为1
    eventObject().$on('screening-params-change', msg => {
      this.pageParams.currentPage = 1
    })
    window.addEventListener('resize', this.initSize)
    this.initSize()
  },
  computed: {
    ...mapState([
      'filterParams'
    ])
  },
  watch: {
    filterParams: {
      handler: function (val, oldVal) {
        // console.info(val,11111111);
        // this.pageParams.currentPage = 1;
      },
      deep: true
    },
    tableData: {
      handler: function (val, oldVal) {
        this.layout = val.length === 0 ? 'total, sizes' : 'total, sizes, prev, pager, next'
      },
      deep: true
    }
  },
  beforeRouteLeave (to, from, next) {
    this.removeResize()
    next()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .table-wrap {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    //min-height: 300px;
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
      width: 100%; /*min-height: 200px;*/
      min-height: calc(100% - 95px);
      table {
        border-collapse: inherit;
        th {
          /*height: 40px!important;*/
        }
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
          /*background: transparent !important;*/
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
