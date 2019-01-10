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
        <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--:action="ip"-->
          <!--:show-file-list="false"-->
          <!--:data="{memberLibraryGuid: $route.query.guid}"-->
          <!--:before-upload="beforeAvatarUpload"-->
          <!--:on-success="uploadSuccess"-->
          <!--:on-progress="uploading"-->
          <!--slot="file">-->
          <!--<el-button class="affirm">批量导入</el-button>-->
        <!--</el-upload>-->
      </uu-sub-tab>
      <el-scrollbar class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">

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

          <el-table-column width="90" label="性别">
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

          <el-table-column width="100" label="照片">
            <template slot-scope="scope">
              <image-box v-if="scope.row.faceImgUrl" width="54px" height="54px" @click.native="showImage(scope.row)" :src="scope.row.faceImgUrl"></image-box>
              <!--<img v-show="scope.row.faceImgUrl" :src="scope.row.faceImgUrl" class="tableImg">-->
              <div v-else class="tableImg">—</div>
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
        <el-button class="affirm widthAuto"><a :href="downloadURL">下载&lt;导入结果反馈&gt;</a></el-button>
      </el-dialog>
      <ob-dialog-form
        title="批量导入"
        :showButton="false"
        :visible.sync="uploadDialogVisible"
      >
        <div slot="content" class="upload__dialog--inner">
          <el-upload
            class="library__upload"
            :action="ip"
            drag
            :show-file-list="false"
            :data="{memberLibraryGuid: $route.query.guid}"
            :before-upload="beforeAvatarUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-progress="uploading"
            :multiple="false"
            slot="file">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
              <p class="c-grey fs12">压缩包上传后，导入需要一定时间，请耐心等待您可前往操作记录中查看具有的进度</p>
            </div>
          </el-upload>
          <p class="fs12 c-grey">
            操作须知：<br>
            批量导入仅支持zip压缩包的形式上传人脸照片，压缩包限制大小为1G。<br>
            每张照片格式仅限jpg/png/jpeg/tiff，大小不超过2Mb。<br>
            <span class="danger">请直接压缩照片,不要压缩照片文件夹</span>
          </p>
          <p class="fs12 c-grey">
            请以"姓名-性别-手机号-出生年月日"来命名图片，其中"出生年月日"可为空。<br>
            <span class="danger">示例：张木木-女-13101234567-19920414</span><br>
            <span class="danger">张木木-女-13101234567</span>
          </p>
        </div>
      </ob-dialog-form>
      <image-preview :src="preview.src" :visible.sync="preview.visible"></image-preview>
    </div>
</template>

<script>
import {MemberLibraryFind, MemberSearch, MemberDelete, MemberTemplate} from '../../api/member'
const importIp = process.env.UPLOAD_API
export default {
  name: 'index',
  data () {
    return {
      uploadDialogVisible: false,
      preview: {
        src: '',
        visible: false
      },
      ip: `${importIp}/manage/member/import`,
      // 按钮信息
      btnArray: [
        {text: '手动添加'},
        {text: '批量导入'}
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
    }
  },
  created () {
    let data = {
      guid: this.$route.query.guid
    }
    this.getList()
    MemberLibraryFind(data).then(res => {
      this.menu2[0].title = `人员管理&nbsp;&nbsp;&nbsp/&nbsp;&nbsp;&nbsp;${res.data.name}`
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
      MemberSearch(data).then(res => {
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
          MemberDelete(data).then(res => {
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
        this.uploadDialogVisible = true
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
      if (file.type !== 'application/zip') {
        this.$tip('文件仅限zip格式', 'error', 5000)
        return false
      } else if (file.size > 1000 * 1024 * 1024) {
        this.$tip('文件不可超过1G', 'error', 5000)
        return false
      }
    },
    // 文件上传中
    uploading (event) {
      this.uploadDialogVisible = false
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
      } else {
        this.$tip(response.msg || '上传失败', 'error')
      }
    },
    uploadError () {
      this.$tip('上传失败，请检查网络是否异常', 'error')
    },
    // 显示大图
    showImage (row) {
      this.preview.src = row.faceImgUrl
      this.preview.visible = true
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

<style lang="scss" scoped>
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
  .common__image--box{
    cursor: pointer;
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
    height: calc(100% - 59px - 78px);
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
    width: 80px !important;
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
  /*上传弹框样式*/
  .upload__dialog--inner{
    padding-bottom: 34px;
    > p.c-grey{
      line-height: 1.4;
      padding: 0 15px;
      &:last-child{
        margin-top: 15px;
      }
    }
    .library__upload{
      margin-bottom: 10px;
    }
  }
</style>

<style>
  .menber .el-scrollbar__wrap{
    overflow-x:hidden;
  }
</style>
