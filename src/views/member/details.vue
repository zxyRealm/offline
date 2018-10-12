<template>
    <div class="menber">
      <div class="member__title">
        <div class="el-icon-arrow-left retrun"></div>
        <el-breadcrumb separator="/" class="fl">
          <el-breadcrumb-item :to="{ path: '/member' }">人员管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/member/person'}">西溪银泰会员库</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="affirm medium fr">导入</el-button>
        <el-button class="affirm medium fr hand" @click="addPerson">手动添加</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="照片"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="address"
            label="生日">
          </el-table-column>
          <el-table-column
            prop="address"
            label="人员类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next"
          :total="400">
        </el-pagination>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({}),
  created () {
    // this.emptyHint()
  },
  mounted () {
  },
  computed: {},
  methods: {
    // 空内容提醒
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
    // 添加人员
    addPerson () {
      this.$router.push({path: '/member/person', query: {guid: this.$route.query.guid}})
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
    margin-right: 10px;
  }
  .retrun{
    float: left;
    line-height: 30px;
  }
</style>
