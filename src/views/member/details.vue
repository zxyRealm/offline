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
          <el-table-column label="照片">
            <template slot-scope="scope">
              <img :src="scope.row.faceImgUrl" class="tableImg">
            </template>
          </el-table-column>

          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{scope.row.name || '—'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{scope.row.phone || '—'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.gender === 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>

          <el-table-column label="生日">
            <template slot-scope="scope">
              <span>{{scope.row.birthday || '—'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="人员类型">
            <template slot-scope="scope">
              <span>{{scope.row.memberTypeName || '—'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="fl edit" @click="editPerson(scope.row.guid)">编辑</div>
              <div class="fl del" @click="delPerson(scope.row.guid)">删除</div>
            </template>
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
  data: () => ({
    tableData: [],
    pageData: {
      index: 1,
      length: 10,
      total: 10,
      name: '',
      phone: ''
    }
  }),
  created () {
    this.getList()
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
    },
    // 获取人员列表
    getList () {
      let data = {
        memberLibraryGuid: this.$route.query.guid,
        index: this.pageData.index,
        length: this.pageData.length
      }
      this.$http('/member/search', data).then(res => {
        if (res.result) {
          this.tableData = res.data.content
        }
      })
    },
    // 编辑人员
    editPerson (e) {
      this.$router.push({path: '/member/person', query: {guid: this.$route.query.guid, personId: e}})
    },
    // 删除人员
    delPerson (e) {
      let data = {
        guid: e
      }
      this.$http('/member/del', data).then(res => {
        if (res.result) {
          this.getList()
        }
      })
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
  .tableImg{
    width: 48px;
    height: 48px;
  }
  .edit{
    margin-left: 20px;
    color: #0F9EE9;
    cursor: pointer;
  }
  .del{
    margin-left:40px;
    color: #FF6660;
    cursor: pointer;
  }
</style>
