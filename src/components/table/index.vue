<template>
  <div class="table-wrap">
    <div class="table-search">
      <span>表格数据</span>
      <div v-if="false">
        <input v-model.trim="fuzzyQuery" type="text" placeholder="输入关键字"/>
        <img src="@/assets/public/table-input-search.png" @click="doSearch">
      </div>
    </div>
    <!-- element自带滚动条 -->
    <el-table
      :data="tableData"
      border
      :highlight-current-row="false"
      class="table-content flow-table">
      <el-table-column
        prop="dateTime"
        width="180"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="inFlowerCount"
        width="150"
        align="center"
        label="客流量">
        <template slot-scope="scope">
          <div style="display: inline-block;text-align: left;">
            <p>进客流 {{scope.row.inFlowerCount | num}}</p>
            <p v-if="filterParams.type !== 'inflow'">出客流 {{scope.row.outFlowerCount | num}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="outFlowerCount"

        label="到访记录">
        <template slot-scope="scope">
          <img class="flow-avatar" src="/static/img/avatar2.png" v-for="(item,$index) in 8" alt="" :key="$index">
          <a href="javascript:void (0)" class="fr" @click="showLog(scope.row)">更多信息</a>
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
    <div class="flow__visited--wrap" v-show="visible" @click.self="close">
      <transition name="fade-visited">
        <div class="visited--wrap" v-show="visible">
          <div class="visited--header">
            到访记录
            <i class="el-icon-close fr" @click="close"></i>
          </div>
          <el-scrollbar class="visited--content" v-scroll-top="pagination.index">
            <ul class="visited__list--wrap">
              <li class="list-item" v-for="(item,$index) in 15" :key="$index">
                <div class="detail">
                  <p class="ellipsis">姓名{{item}}</p>
                  <p>性别</p>
                  <p>18</p>
                  <p>{{new Date()| parseTime('{h}:{i}')}}</p>
                </div>
                <div class="avatar">
                  <img src="/static/img/avatar2.png" alt="">
                  <span class="corner-icon"></span>
                  <p>第{{110 + item}}位</p>
                </div>
              </li>
            </ul>
            <el-pagination
              class="g-mrl30 g-mb18"
              @current-change="visitedPageChange"
              :current-page="pagination.index"
              :page-size="pagination.length"
              layout="total, prev, pager, next"
              small
              :total="100">
            </el-pagination>
          </el-scrollbar>
        </div>
      </transition>
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
      visible: false, // 弹出框是否显示
      fuzzyQuery: '', // 模糊匹配
      pageParams: {
        pageSize: 10, // 每页显示条数
        total: 0, // 总条数
        currentPage: 1 // 当前第几页
      },
      layout: 'total, sizes',
      tableData: [],
      visitedList: [],
      pagination: { // 到访记录分页信息
        index: 1,
        length: 10
      }
    }
  },
  methods: {
    // 显示到访记录详情
    showLog (row) {
      this.visible = true
    },
    // 关闭到访记录弹出框
    close () {
      this.visible = false
    },
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
    // 请求数据
    getData () {
      let params = JSON.parse(JSON.stringify(this.$store.state.filterParams))
      if (!params.startTime) {
        this.tableData = []
        return
      }
      params.length = this.pageParams.pageSize
      params.index = this.pageParams.currentPage
      params.startTime = params.startTime + ' 00:00:00'
      params.endTime = params.endTime + ' 23:59:59'
      params.groupSonGuid = params.group.guid
      params.groupName = params.group.name
      delete params.group
      if (!params.groupSonGuid) {
        this.$tip('请您先选择社群', 'error')
        return
      }
      GetFlowCount(params).then(res => {
        this.tableData = res.data.content || []
        this.$set(this.pageParams, 'total', res.data.pagination.total || 0)
      })
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
    },
    // 到访记录翻页
    visitedPageChange (page) {
      this.pagination.index = page
    }
  },
  created () {
    eventObject().$on('REFRESH_DATA', this.getData)
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
  filters: {
    num (val) {
      let txt = val
      if (val.toString().length >= 5) {
        txt = (val / 10000).toFixed(1) + '万'
      }
      return txt
    }
  },
  beforeDestroy () {
    this.removeResize()
    eventObject().$off('REFRESH_DATA', this.getData)
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
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
      /*text-align: center;*/
    }
    .flow-avatar{
      float: left;
      width: 54px;
      height: 54px;
      margin-right: 12px;
    }
    .table-content {
      width: 100%;
      min-height: calc(100% - 95px);
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
  /*侧边弹出层出入动画*/
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-visited-enter-active, .fade-visited-leave-active {
    transition: all .5s;
  }
  .fade-visited-enter, .fade-visited-leave-active {
    transform: translateX(760px);
  }
  .flow__visited--wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 1111;
  }
  .visited--wrap{
    float: right;
    width: 426px;
    height: 100%;
    .visited--header{
      height: 40px;
      line-height: 40px;
      padding: 0 50px;
      background: #8663FF;
      font-size: 14px;
      >i {
        margin-top: 10px;
        margin-right: -30px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .visited--content{
    height: calc(100% - 40px);
    background: #18141E;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  .visited__list--wrap{
    padding: 0 33px;
    .list-item{
      height: 100px;
      padding: 10px 70px;
      border-bottom:1px dashed rgba(255, 255, 255, 0.14);
      box-sizing: border-box;
      .detail{
        float: left;
        width: 100px;
        font-size: 12px;
        line-height: 20px;
      }
      .avatar{
        float: right;
        position: relative;
        @mixin base-block {
          content: '';
          position: absolute;
          display: block;
          width: 12px;
          height: 10px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          z-index: 99;
        }
        &:after{
          @include base-block;
          top: 0;
          left: 0;
          border-bottom: none;
          border-right: none;
        }
        &:before{
          @include base-block;
          top: 0;
          right: 0;
          border-bottom: none;
          border-left: none;
        }
        .corner-icon{
          &:after{
            @include base-block;
            bottom: 2px;
            left: 0;
            border-top: none;
            border-right: none;
          }
          &:before{
            @include base-block;
            bottom: 2px;
            right: 0;
            left: auto;
            border-top: none;
            border-left: none;
          }
        }
        p{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.2);
          &:before{
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 4px;
            border-radius: 8px;
            /*vertical-align: 3px;*/
            background: #8663FF;
          }
        }
      }
      img{
        float: right;
        width: 84px;
        height: 80px;
        border-radius: 2px;
        box-shadow: 0 0 10px 2px #8663FF;
        /*box-shadow: ;*/
      }
    }
  }
</style>
