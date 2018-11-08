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
        <el-upload
          class="avatar-uploader"
          action="http://192.168.1.153:81/manage/member/import"
          :show-file-list="false"
          :data="{memberLibraryGuid: $route.query.guid}"
          :before-upload="beforeAvatarUpload"
          :on-success="uploadSuccess"
          :on-progress="uploading"
          slot="file">
          <el-button class="affirm">导入</el-button>
        </el-upload>
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
      <!-- 导入弹框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="500px">
        <img class="tip_img_icon" src="/static/img/waiting_tip_icon.png" alt="">
        <div class="icon__hint">正在导入，请耐心等待…</div>
        <div class="icon__hint--no">{{percent}}/100</div>
      </el-dialog>
      <!-- 下载弹框 -->
      <el-dialog
        :visible.sync="downloadVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="500px">
        <div class="word__center">导入完成！</div>
        <div class="word__two">部分信息未成功导入，请在反馈中查看原因</div>
        <el-button class="affirm widthAuto"><a :href="downloadURL">下载<导入结果反馈></a></el-button>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    // 按钮信息
    btnArray: [
      {text: '手动添加'},
      {text: '下载模板'},
      {type: 'file'}
    ],
    // 菜单名称
    menu2: [
      {title: ''}
    ],
    // 列表内容
    tableData: [],
    // 分页数据
    pageData: {
      index: 1,
      length: 10,
      total: 10,
      name: '',
      phone: ''
    },
    // 百分比弹框
    dialogVisible: false,
    // 下载内容弹框
    downloadVisible: false,
    // 下载url
    downloadURL: '',
    // 导入百分比
    percent: ''
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
        let data = {
          key: 'member'
        }
        this.$http('/member/template', data).then(res => {
          if (res.result) {
            var a = document.createElement('a')
            a.href = res.data
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        })
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
    },
    // 上传前格式检测
    beforeAvatarUpload (file) {

    },
    // 文件上传中
    uploading (event) {
      this.percent = event.percent
    },
    // 文件上传成功回调
    uploadSuccess (response) {
      if (response.data) {
        this.downloadURL = response.data
        if (response.data !== true) {
          this.downloadVisible = true
        }
        this.getList()
      }
    }
  },
  watch: {
    // 监听导入百分比
    percent (e) {
      if (!e) {
        this.dialogVisible = false
      } else if (e === 100) {
        this.dialogVisible = false
        this.percent = ''
      } else {
        this.dialogVisible = true
      }
    }
  }
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
  .avatar-uploader{
    margin-left: 10px;
    float: right;
    width: 80px;
  }
  .affirm{
    width: 80px;
  }
  .widthAuto{
    margin: 26px 0 0 130px;
    width: 200px;
  }
  .widthAuto a{
    color: #FFF;
  }
  .tip_img_icon{
    margin-left: 195px;
    width: 67px;
    height: 65px;
  }
  .icon__hint{
    margin-top: 20px;
    text-align: center;
  }
  .icon__hint--no{
    text-align: center;
  }
  .word__center{
    text-align: center;
    font-size: 14px;
    color: #333333;
  }
  .word__two{
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
    color: #B4B4B7;
  }
</style>

<style>
  .menber .el-scrollbar__wrap{
    overflow-x:hidden;
  }
</style>
