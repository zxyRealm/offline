<template>
    <div class="menber">
      <div class="member__title">
        <el-breadcrumb separator="/" class="fl">
          <el-breadcrumb-item :to="{ path: '/member' }">人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="affirm medium fr" @click="addNew">添加库</el-button>
      </div>
      <el-scrollbar class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="库名">
            <template slot-scope="scope">
              <span>{{scope.row.name || '—'}}</span>

              <el-popover
                placement="top"
                width="160">
                <input type="text" class="changeText">
                <span class="el-icon-success sure" @click="sureChange"></span>
                <span class="el-icon-error close"></span>
                <span class="el-icon-edit name__edit" slot="reference"></span>
              </el-popover>

            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark || '—'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberCount"
            label="人员数">
          </el-table-column>
          <el-table-column
            label="关联社群">
            <template slot-scope="scope">
              <div class="fl hand edit">关联</div>
            </template>
          </el-table-column>
          <el-table-column
            width="350"
            label="操作">
            <template slot-scope="scope">
              <div class="fl hand edit" @click="editNew(scope.row.guid)">编辑</div>
              <div class="fl hand manage" @click="goDetails(scope.row.guid)">人员管理</div>
              <div class="fl hand del" @click="del(scope.row.guid)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>

    </div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    // 列表内容
    tableData: [],
    visible2: false
  }),
  created () {
    // this.emptyHint()
    this.getList()
  },
  mounted () {
  },
  computed: {

  },
  methods: {
    emptyHint () {
      this.$affirm({
        confirm: '前往【社群管理】',
        cancel: '知道了',
        text: '需满足条件：</br>该账号下有管理员社群/单店社群/子社群（已加入管理员社群）'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          done()
        } else {
          done()
        }
      })
    },
    // 获取人员库列表
    getList () {
      let data = {
        index: 1,
        length: -1
      }
      this.$http('/memberLibrary/search', data).then(res => {
        if (res.result) {
          this.tableData = res.data.content
        }
      })
    },
    // 添加库
    addNew () {
      this.$router.push({path: '/member/library'})
    },
    // 编辑库
    editNew (e) {
      this.$router.push({path: '/member/library', query: {guid: e}})
    },
    // 删除库
    del (e) {
      let data = {
        guid: e
      }
      this.$http('/memberLibrary/delete', data).then(res => {
        if (res.result) {
          this.getList()
        }
      })
    },
    // 人员管理
    goDetails (e) {
      this.$router.push({path: '/member/details', query: {guid: e}})
    },
    // 确定改变库名称
    sureChange () {

    }
  },
  watch: {}
}
</script>

<style scoped>
  .menber{
    padding: 0 20px;
  }
  .member__title{
    padding-top: 26px;
    margin-bottom: 22px;
    height: 36px;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
  }
  .hand{
    cursor: pointer;
  }
  .edit{
    margin-left: 30px;
    color: #0F9EE9;
  }
  .manage{
    margin-left: 40px;
    color: #0F9EE9;
  }
  .del{
    margin-left: 40px;
    color: #FF6660;
  }
  .table{
    height: calc(100% - 63px - 40px);
    overflow: hidden;
  }
  .name__edit{
    color: #0F9EE9;
    font-size: 16px;
    cursor: pointer;
  }
  .changeText{
    width: 115px;
    height: 16px;
  }
  .sure{
    cursor: pointer;
    color: #0F9EE9;
    font-size: 16px;
  }
  .close{
    cursor: pointer;
    color: #EE6C4B;
    font-size: 16px;
  }
</style>

<style>
  .menber .el-scrollbar__wrap{
    overflow-x:hidden;
  }
</style>
