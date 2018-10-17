<template>
    <div class="menber">
      <uu-sub-tab
        search
        back
        show-button
        btn-size="small"
        :sub-btn="{text: '创建社群'}"
        placeholder="输入人员姓名、手机号"
        @remote-search="search"
        @handle-btn="button"
        :btn-array="btnArray"
        :menu-array="menu2">
      </uu-sub-tab>
      <el-scrollbar class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="照片">
            <template slot-scope="scope">
              <img v-show="scope.row.faceImgUrl" :src="scope.row.faceImgUrl" class="tableImg">
              <div v-show="!scope.row.faceImgUrl" class="tableImg">—</div>
            </template>
          </el-table-column>

          <el-table-column label="姓名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="libraryName">{{scope.row.name || '—'}}</span>
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
              <span>{{scope.row.birthdayStamp | parseTime('{y}-{m}-{d}') || '—'}}</span>
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
      </el-scrollbar>
      <div>
        <el-pagination
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.index"
          :page-sizes="[10, 20, 30]"
          :page-size="pageData.length"
          :total="pageData.total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    btnArray: [
      {text: '手动添加'},
      {text: '下载模板'}
    ],
    menu2: [
      {title: ''}
    ],
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
    let data = {
      guid: this.$route.query.guid
    }
    this.getList()
    this.$http('/memberLibrary/find', data).then(res => {
      if (res.result) {
        this.menu2[0].title = `人员管理&nbsp;&nbsp;&nbsp/&nbsp;&nbsp;&nbsp;${res.data.name}`
      }
    })
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    // 添加人员
    addPerson () {
      this.$router.push({path: '/member/person', query: {guid: this.$route.query.guid}})
    },
    // 获取人员列表
    getList () {
      let data = {
        memberLibraryGuid: this.$route.query.guid,
        index: this.pageData.index,
        length: this.pageData.length,
        name: this.pageData.name,
        phone: this.pageData.phone
      }
      this.$http('/member/search', data).then(res => {
        if (res.result) {
          this.tableData = res.data.content
          this.pageData.index = res.data.pagination.index
          this.pageData.length = res.data.pagination.length
          this.pageData.total = res.data.pagination.total
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
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '确定删除该人员信息？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http('/member/del', data).then(res => {
            if (res.result) {
              this.getList()
              done()
            }
          })
        } else {
          done()
        }
      })
    },
    // 按钮点击
    button (e) {
      if (!e) {
        this.addPerson()
      } else {
        var a = document.createElement('a')
        a.href = 'https://offline-browser-data-test.oss-cn-hangzhou.aliyuncs.com/member-info/member-template/%E4%BA%BA%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx?OSSAccessKeyId=LTAIGTWnewQMxSd5&Expires=1539745432&Signature=np87kk9SqbjAY8KK5VxSMt2X3ok%3D'
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
    },
    // 搜索事件
    search (e) {
      this.pageData.phone = ''
      this.pageData.name = ''
      if (e.length === 11) {
        this.pageData.phone = e
      } else {
        this.pageData.name = e
      }
      this.getList()
    },
    // 页码改变
    handleCurrentChange (e) {
      this.pageData.index = e
      this.getList()
    },
    // 长度改变
    handleSizeChange (e) {
      this.pageData.length = e
      this.getList()
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
    line-height: 48px;
  }
  .edit{
    color: #0F9EE9;
    cursor: pointer;
  }
  .del{
    margin-left:30px;
    color: #FF6660;
    cursor: pointer;
  }
  .table{
    margin: 13px 0 10px 0;
    height: calc(100% - 59px - 60px);
  }
  .libraryName{
    float: left;
    width: calc(100% - 50px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>

<style>
  .menber .el-scrollbar__wrap{
    overflow-x:hidden;
  }
</style>
