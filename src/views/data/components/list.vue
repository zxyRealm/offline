/*
* @author  张晓元
* @date    2019-05-08
*/
<template>
  <div class="rank-list" data-module="data">
    <div class="rank-title">
      <i class="iconfont icon-biaotitubiao"></i>
      {{typeMap.title}}
    </div>
    <el-table
      class="rank-table"
      :data="data.content"
    >
      <el-table-column
        show-overflow-tooltip
        v-for="(col,$index) in typeMap.tableColList"
        :key="$index"
        :width="col.width"
        :prop="col.prop"
        :label="col.label">
        <template slot-scope="scope">
          {{scope | formatData(data.pagination ? data.pagination.index : 1)}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      class="rank__pagination--custom"
      layout="pager,jumper"
      :page-size="8"
      :pager-count="3"
      :total="data.pagination ? data.pagination.total : 0"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  name: 'list',
  props: {
    data: {
      type: Object,
      default: () => ({
        content: [],
        pagination: {
          total: 0,
          index: 1
        }
      })
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    // 根据类型定义基本信息
    typeMap () {
      let obj = {
        title: '',
        tableColList: []
      }
      let isFlow = new Set(['store','floor', 'industry', 'gate', 'area']).has(this.type)
      if (isFlow) {
        obj.tableColList = [
          { label: '排名', width: 60 },
          { prop: '', label: '' },
          { prop: 'percent', label: '占比', width: 60 },
          { prop: 'count', label: '客流量', width: 70 }
        ]
      } else {
        obj.tableColList = [
          { prop: 'dateTime', label: '时间', width: 140 },
          { prop: 'inFlowerCount', label: '客流量' }
        ]
      }
      switch (this.type) {
        case 'flow':
          obj.title = '客流统计表'
          break
        case 'store':
          obj.title = '门店排行'
          obj.tableColList[1] = { prop: 'groupName', label: '门店' }
          break
        case 'floor':
          obj.title = '楼层排行'
          obj.tableColList[1] = { prop: 'floor', label: '楼层' }
          break
        case 'industry':
          obj.title = '业态排行'
          obj.tableColList[1] = { prop: 'industryName', label: '业态' }
          break
        case 'gate':
          obj.title = '商场出入口客流排行'
          obj.tableColList[1] = { prop: 'InOutWardName', label: '出入口' }
          break
        case 'area':
          obj.title = '区域客流量排行'
          obj.tableColList[1] = { prop: 'regional', label: '省份' }
          break
      }
      return obj
    }
  },
  methods: {
    handlePageChange (page) {
      this.$emit('handle-change', {type: this.type, page})
    }
  },
  watch: {},
  filters: {
    // column 未设置prop时默认显示排名序列号
    formatData (val, page) {
      let text = ''
      if (val.column.property) {
        let v = val.row[val.column.property]
        text = val.column.property !== 'dateTime' ? v : Moment(v).format('MM/DD')
      } else {
        text = `No.${(page - 1) * 8 + val.$index  + 1}`
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
  .rank-list {
    height: 100%;
  }

  .rank-title {
    font-size: 16px;
  }

</style>

<style lang="scss">
  @import "~@/styles/variables.scss";

  $fontColor: #252525;
  [data-module=data] {
    .rank-table {
      width: 100%;
      height: calc(100% - 60px);
      table {
        tr,
        th,
        td {
          color: #252525;
        }
      }
    }

    .rank__pagination--custom {
      width: 100%;
      padding: 0;
      .el-pager {
        float: left;
        li {
          color: $theme-white-color;
          &:not(.disabled) {
            background: #fff;
            border: 1px solid #f0f0f0;
            box-sizing: border-box;
            &.active {
              background: #fff;
              border-color: $theme-blue;
              color: $theme-white-color;
            }
          }
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .el-pagination__jump {
        min-width: auto;
        margin-left: 0;
        color: $fontColor;
        .el-input {
          width: 40px;
        }
      }
    }
  }
</style>