<template>
  <div class="member" v-if="canShowPage">
    <div class="member__title">
      <span class="fl">人员管理</span>
      <el-button class="affirm medium fr add__button" @click="handleLibraryCreate" size="small">添加库</el-button>
    </div>
    <div v-if="libraryList.length" class="container__box">
      <div class="search__list">
        <div class="search__box">
          <el-input prefix-icon="el-icon-search" size="small" clearable v-model="searchLibraryValue"
                    placeholder="输入关键字"></el-input>
        </div>
        <div
          v-for="item in searchLibraryList" :key="item.personLibraryId"
          :class="['search__item', {'item__name--active': chooseLibraryId === item.personLibraryId}]"
          @click="handleLibraryClick(item.personLibraryId)">
          <span class="text__overflow item__name">{{item.personLibraryName}}</span>
          <span class="text__overflow item__type">{{item.personLibraryType | libraryType}}</span>
        </div>
      </div>
      <div class="content__box">
        <div class="content__title">
          <div class="content__title--top">
            <span>{{libraryInfo.personLibraryName}}</span>
            <div class="title__button">
              <span class="f-margin-right20 f-blue f-link" @click="$router.push({ path: '/member/person', query: { guid: $route.query.libraryId } })">添加人员</span>
              <span class="f-margin-right20 f-blue f-link" @click="handleBatchAddPersonDialogShow">批量添加</span>
              <i class="f-margin-right20 f-blue f-link iconfont icon-bianji" @click="handleLibraryUpdate"></i>
              <i class="f-red f-link iconfont icon-shanchu" @click="handleLibraryDelete"></i>
            </div>
          </div>
          <span class="text__overflow f-margin-right50">类型：{{libraryInfo.personLibraryType | libraryType}}</span>
          <span v-text="`人数：${libraryInfo.personTotal}`" class="text__overflow f-margin-right50"></span>
          <span v-text="`备注：${libraryInfo.personLibraryNote}`" class="text__overflow"></span>
        </div>
        <div class="search__bar">
          <el-input placeholder="请输入内容" v-model="searchConfig.person.value" class="input-with-select f-margin-right20" size="small">
            <el-select v-model="searchConfig.person.select" slot="prepend" placeholder="请选择">
              <el-option :label="item.label" :value="item.value" v-for="item in searchConfig.personInfoList" :key="item.value"></el-option>
            </el-select>
          </el-input>
          <el-select v-model="searchConfig.personType" placeholder="请选择人员类型" size="small" class="f-margin-right20">
            <el-option :label="item.typeValue" :value="item.id" v-for="item in searchConfig.personTypeList" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="searchConfig.gender" placeholder="请选择性别" size="small" class="f-margin-right20">
            <el-option :label="item.label" :value="item.value" v-for="item in searchConfig.genderList" :key="item.value"></el-option>
          </el-select>
          <el-button icon="el-icon-search" size="small" @click="handleListSearch"></el-button>
        </div>
        <div class="content__table">
          <el-table :data="personList" style="width: 100%">
            <el-table-column label="照片">
              <template slot-scope="scope">
                <img :src="item" alt="" v-for="(item, index) in scope.faceImgUrls" :key="index">
              </template>
            </el-table-column>
            <el-table-column prop="personName" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="personType" label="人员类型"></el-table-column>
            <el-table-column prop="gender" label="性别">
              <template slot-scope="scope">
                <span v-text="scope.gender === 0 ? '女' : '男'"></span>
              </template>
            </el-table-column>
            <el-table-column prop="birthday" label="生日"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="handlePersonUpdate(scope.row)" class="box__block f-blue f-link f-margin-right30">编辑</span>
                <span @click="handlePersonDelete(scope.row)" class="box__block f-red f-link">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="content__pagination">
          <el-pagination
            :current-page.sync="searchConfig.pagination.index"
            layout="prev, pager, next, jumper"
            @current-change="getPersonList"
            :total="searchConfig.pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else class="empty__box">
      <img src="../../assets/empty-info@2x.png" width="325" alt="" class="">
    </div>
    <!-- 弹框 -->
    <!-- 库(新增、编辑)弹框 -->
    <el-dialog
      :title="libraryDialog.type === 1 ? '添加库' : '编辑库' "
      :close-on-click-modal="false"
      :visible.sync="libraryDialog.visible"
      @close="handleLibraryDialogClose"
      width="560px">
      <div class="library-dialog__body">
        <el-form label-position="left" label-width="80px" :model="libraryDialog.form" ref="libraryDialogRef" :rules="libraryDialog.rules">
          <el-form-item label="名称" prop="personLibraryName">
            <el-input v-model="libraryDialog.form.personLibraryName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="personLibraryType">
            <el-select v-model="libraryDialog.form.personLibraryType" placeholder="请选择类型">
              <el-option :label="item.label" :value="item.value" v-for="item in libraryDialog.libraryTypeList" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="personLibraryNote">
            <el-input v-model="libraryDialog.form.personLibraryNote" :rows="3" type="textarea" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleLibraryDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleLibraryDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量添加人员 -->
    <el-dialog
      title="批量操作"
      :close-on-click-modal="false"
      :visible.sync="batchAddPersonDialog.visible"
      @close="handleBatchAddPersonDialogClose"
      width="650px">
      <div>
        <el-upload
          ref="batchUpload"
          class="batch-upload__box"
          drag
          :file-list="batchAddPersonDialog.fileList"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="false"
          :on-success="uploadSuccess"
          :data="{merchantGuid: userInfo.developerId, memberLibraryGuid: $route.query.libraryId}"
          :on-change="beforeBatchAddPersonUpload"
          :on-error="uploadError"
          :on-progress="uploading"
          :action="ip">
          <div v-if="batchAddPersonDialog.file" class="zip__have">
            <img src="../../assets/logo.png" alt="" width="25" height="25">
            <span class="batch-upload__file-name text__overflow">{{batchAddPersonDialog.file.name}}</span>
            <span class="f-blue f-margin-left30">文件上传</span>
          </div>
          <div v-else>
            <i class="el-icon-upload f-blue"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
        </el-upload>
        <span class="f-gray--batch-upload">
          操作须知：<br>
            1.仅支持zip压缩包形式上传且最大不超过1G，照片需满足照片规范。<br>
            <span class="batch-upload__span">2.照片命名：</span>姓名-性别-手机号-出生年月日-编号，其中出生年月日可为空。<br>
              <span class="batch-upload__span">示例：</span>张木木-女-13101234567-19920414<br>
              <span class="batch-upload__span"></span>张木木-女-13101234567
        </span>
        <img src="../../assets/batch-upload.png" alt="" width="590" height="180">
        <span class="f-gray--batch-upload">
          1.文件小于2Mb格式JPG/PNG/JPEG/TIFF<br>
          2.人脸大小不低于 80*80像素点
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleBatchAddPersonDialogClose">取消</el-button>
        <el-button type="primary" @click="handleBatchAddPersonDialogSubmit">确定</el-button>
      </span>
    </el-dialog>
    <!-- 上传进度dialog -->
    <el-dialog
      title="正在上传"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="percent.visible"
      width="560px">
      <div>
        <el-progress :percentage="percent.data"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { validateRule } from '@/utils/validate'
import prefix from '@/api/prefix'
import {
  getPersonList,
  getPersonLibraryById,
  getPersonLibraryList,
  judgeLibraryName,
  getPersonTypeList,
  createPersonLibrary,
  deletePersonLibrary,
  updatePersonLibrary,
  deletePerson
} from '../../api/member'
import { mapState } from 'vuex'

export default {
  name: 'index',
  data () {
    const libraryNameRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入库名称'))
      } else if (value.length > 32) {
        callback(new Error('请输入1-32位字符'))
      } else if (!validateRule(value, 2)) {
        callback(new Error('仅限汉字/字母/数字/下划线/空格'))
      } else if (this.libraryInfo.personLibraryName === value) {
        callback()
      } else {
        let data = {
          name: value
        }
        judgeLibraryName(data).then(res => {
          if (!res.data) {
            callback(new Error('应用库名称重复'))
          } else {
            callback()
          }
        }).catch(() => {
          callback(new Error('校验失败,请重试'))
        })
      }
    }
    return {
      /* 1.3版本 */
      libraryList: [],
      canShowPage: false,
      searchLibraryValue: '',
      libraryInfo: {},
      searchConfig: {
        person: {
          select: 'personName',
          value: ''
        },
        personType: null,
        gender: null,
        genderList: [
          { value: 0, label: '女' },
          { value: 1, label: '男' }
        ],
        personTypeList: [],
        personInfoList: [
          { value: 'personName', label: '姓名' },
          { value: 'phone', label: '手机号' }
        ],
        pagination: {
          index: 1,
          length: 10,
          total: 1
        }
      },
      personList: [],
      libraryDialog: {
        visible: false,
        type: 1, // 1.新增，2.编辑
        form: {
          personLibraryName: '',
          personLibraryType: '',
          personLibraryNote: ''
        },
        rules: {
          personLibraryName: [{ required: true, validator: libraryNameRule, trigger: 'blur' }],
          personLibraryType: [{ required: true, message: '请选择类型', trigger: 'change' }],
          personLibraryNote: [
            { required: true, message: '请输入备注', trigger: 'blur' },
            { min: 1, max: 255, message: '请输入1-255位字符', trigger: 'blur' }
          ]
        },
        libraryTypeList: [
          { value: 0, label: '员工' },
          { value: 1, label: '会员' },
          { value: 2, label: '黑名单' }
        ]
      },
      batchAddPersonDialog: {
        visible: false,
        file: null,
        fileList: []
      },
      percent: {
        visible: false,
        data: 0
      }
    }
  },
  created () {
    this.getLibraryList()
  },
  mounted () {},
  computed: {
    ...mapState(['currentManage', 'userInfo', 'serverIp']),
    ip () {
      return `//${process.env.VUE_APP_API_HOSTNAME}${prefix[3]}/person/import`
    },
    // 人员库搜索
    searchLibraryList () {
      return this.libraryList.filter((item) => {
        return item.personLibraryName.includes(this.searchLibraryValue)
      })
    },
    // 选择某个人员库
    chooseLibraryId () {
      return this.$route.query.libraryId || null
    }
  },
  methods: {
    // 表格内点击编辑
    handlePersonUpdate (row) {
      this.$router.push({ path: '/member/person', query: { guid: this.chooseLibraryId, personId: row.personId } })
    },
    // 表格内点击删除
    handlePersonDelete (row) {
      this.$confirm('是否确认删除？', '删除人员', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'delete__confirm',
        customClass: 'custom__message-box--delete'
      }).then(() => {
        deletePerson({ personId: row.personId }).then(() => {
          this.$message.success('删除成功!')
        })
      }).catch(() => {})
    },
    // 获取人员库列表
    getLibraryList () {
      if (!this.currentManage.groupGuid) return
      let data = {
        groupGuid: this.currentManage.groupGuid
      }
      getPersonLibraryList(data).then(res => {
        this.canShowPage = true
        this.libraryList = res.data
        if (this.libraryList.length && !this.$route.query.libraryId) {
          this.$router.push({ path: '/member', query: { libraryId: this.libraryList[0].personLibraryId } })
        }
        this.getLibraryById()
        this.getPersonList()
        this.getPersonTypeList()
      }).catch(() => {})
    },
    getPersonTypeList () {
      getPersonTypeList({ memberLibraryGuid: this.libraryInfo.personLibraryId }).then(res => {
        this.searchConfig.personTypeList = res.data
      })
    },
    // 单个人员库信息查询
    getLibraryById () {
      getPersonLibraryById({ personLibraryId: this.chooseLibraryId }).then(res => {
        this.libraryInfo = res.data
      })
    },
    handleListSearch () {
      this.searchConfig.pagination.index = 1
      this.getPersonList()
    },
    // 获取人员库下的人员列表
    getPersonList () {
      let { gender, personType } = this.searchConfig
      let params = {
        personLibraryId: this.personLibraryId,
        ...{ gender, personType },
        index: this.searchConfig.pagination.index,
        length: this.searchConfig.pagination.length,
        [this.searchConfig.person.select]: this.searchConfig.person.value
      }
      getPersonList(params).then(res => {
        this.personList = res.data.content
        let { index, length, total } = res.data.pagination
        this.searchConfig.pagination = { index, length, total }
      })
    },
    // 打开编辑人员库
    handleLibraryUpdate () {
      this.libraryDialog.type = 2
      this.libraryDialog.visible = true
      this.$nextTick(() => {
        let { personLibraryId, personLibraryName, personLibraryType, personLibraryNote } = this.libraryInfo
        this.libraryDialog.form = { personLibraryId, personLibraryName, personLibraryType, personLibraryNote }
      })
    },
    // 打开添加人员库
    handleLibraryCreate () {
      this.libraryDialog.type = 1
      this.libraryDialog.visible = true
    },
    // 人员库弹窗关闭
    handleLibraryDialogClose () {
      this.libraryDialog.visible = false
      this.$refs.libraryDialogRef.resetFields()
    },
    // 人员库弹窗确定
    handleLibraryDialogSubmit () {
      this.$refs.libraryDialogRef.validate(valid => {
        if (valid) {
          let params
          if (this.libraryDialog.type === 1) {
            let { personLibraryName, personLibraryType, personLibraryNote } = this.libraryDialog.form
            params = { personLibraryName, personLibraryType, personLibraryNote }
            createPersonLibrary(params).then(() => {
              this.getPersonList()
              this.handleLibraryDialogClose()
            })
          } else {
            params = this.libraryDialog.form
            updatePersonLibrary(params).then(() => {
              this.getPersonList()
              this.handleLibraryDialogClose()
            })
          }
        }
      })
    },
    // 删除人员库
    handleLibraryDelete () {
      this.$confirm('删除后，该人员库下所有人员都将被删除', '删除库', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'delete__confirm',
        customClass: 'custom__message-box--delete'
      }).then(() => {
        deletePersonLibrary({ personLibraryId: this.chooseLibraryId }).then(() => {
          this.$message.success('删除成功!')
        })
      }).catch(() => {})
    },
    // 批量操作弹窗关闭
    handleBatchAddPersonDialogClose () {
      this.batchAddPersonDialog.file = null
      this.batchAddPersonDialog.visible = false
    },
    // 点击左侧人员库
    handleLibraryClick (id) {
      this.$router.push({ path: '/member', query: { libraryId: id } })
      this.getLibraryList()
    },
    // 打开的时候删除batchAddPersonDialog.file
    handleBatchAddPersonDialogShow () {
      this.batchAddPersonDialog.file = null
      this.batchAddPersonDialog.visible = true
    },
    // 批量上传前
    beforeBatchAddPersonUpload (file, fileList) {
      if (!file.response) {
        if (!(/\w+(.zip)$/).test(file.name)) {
          this.$message.error('文件仅限zip格式')
          this.$refs.batchUpload.clearFiles()
          return
        } else if (file.size > 1000 * 1024 * 1024) {
          this.$message.error('文件不可超过1G')
          this.$refs.batchUpload.clearFiles()
          return
        }
        if (fileList.length > 1) {
          this.$refs.batchUpload.clearFiles()
          this.batchAddPersonDialog.fileList = [file]
        }
        this.batchAddPersonDialog.file = file
      }
    },
    // 当上传失败的时候
    uploadError () {
      this.percent.visible = false
      this.$tip('上传失败，请检查网络是否异常', 'error', 3000)
    },
    // 文件上传中
    uploading (event) {
      this.percent.visible = true
      this.batchAddPersonDialog.visible = false
      this.percent.data = Math.floor(event.percent)
    },
    // 文件上传成功
    uploadSuccess (response) {
      this.percent.visible = false
    },
    handleBatchAddPersonDialogSubmit () {
      this.batchAddPersonDialog.visible = false
      this.$refs.batchUpload.submit()
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.getLibraryList()
      },
      deep: true
    }
  },
  filters: {
    libraryType (type) {
      let typeName = ''
      switch (type) {
        case 0:
          typeName = '会员'
          break
        case 1:
          typeName = '员工'
          break
        case 2:
          typeName = '黑名单'
          break
      }
      return typeName
    }
  }
}
</script>

<style lang="scss" scoped>
  .member {
    overflow: hidden;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/ .el-input--small {
      font-size: 14px;
    }
    /deep/ .el-dialog__footer{
      text-align: center;
    }
    .member__title {
      height: 72px;
      line-height: 72px;
      border-bottom: 1px solid #F0F0F0;
      padding: 0 40px;
      span {
        display: inline-block;
        font-size: 22px;
        color: #252525;
      }
      .add__button {
        margin-top: 20px;
      }
    }
    .empty__box {
      text-align: center;
      height: calc(100vh - 142px);
      position: relative;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
      }
    }
    .container__box {
      font-size: 0;
      .search__list {
        box-sizing: border-box;
        width: 240px;
        display: inline-block;
        font-size: 16px;
        height: 12px;
        padding: 30px 0;
        vertical-align: top;
        .search__box {
          padding: 0 30px 16px;
          width: auto;
        }
        .search__item {
          height: 42px;
          line-height: 42px;
          color: #555555;
          padding: 0 30px;
          cursor: pointer;
          .item__name {
            display: inline-block;
            width: 90px;
          }
          .item__type {
            display: inline-block;
            width: 70px;
            margin-left: 20px;
          }
          &.item__name--active {
            background: #F8F8F8;
            color: #0B7EF9;
          }
        }
      }
      .content__box {
        box-sizing: border-box;
        min-height: calc(100vh - 142px);
        width: calc(100% - 240px);
        display: inline-block;
        font-size: 14px;
        border-left: 1px solid #E6EAEE;
        .content__title {
          height: 116px;
          padding: 30px 40px 26px;
          box-sizing: border-box;
          font-size: 16px;
          color: #555555;
          line-height: 22px;
          .content__title--top {
            font-size: 20px;
            color: #252525;
            line-height: 28px;
            margin-bottom: 10px;
            & > span {
              display: inline-block;
              max-width: 150px;
            }
            .title__button {
              display: inline-block;
              float: right;
              span, i {
                display: inline-block;
                font-size: 16px;
              }
            }
          }
        }
        .search__bar {
          padding: 20px 40px 14px;
          box-sizing: border-box;
          border-top: 1px solid #F0F0F0;
          overflow: hidden;
          height: 67px;
          /deep/ .el-select{
            width: 168px;
          }
          .input-with-select{
            width: 267px;
            /deep/ .el-select{
              width: 100px;
              /deep/ .el-input{
                width: 100px;
              }
            }
          }
          /deep/ .el-button--small{
            padding: 7px 15px;
            font-size: 14px;
          }
        }
        .content__table{
          /deep/ th:first-child{
            padding-left: 40px;
          }
          /deep/ .el-table__body-wrapper{
            height: calc(100vh - 422px);
            overflow-x: auto;
          }
        }
        .content__pagination{
          padding: 0 40px;
          /deep/ .el-pagination{
            padding: 12px 0;
          }
        }
      }
    }
    .library-dialog__body{
      width: 365px;
      margin: auto;
      /deep/ .el-input, /deep/ .el-textarea{
        width: 280px;
      }
      /deep/ .el-textarea__inner{
        resize: none;
      }
    }
    /deep/ .el-dialog__body{
      padding: 30px;
    }
    .batch-upload__box{
      width: 100%;
      /deep/ .el-upload-dragger{
        width: 590px;
        height: 150px;
        /deep/ .el-icon-upload{
          margin: 30px 0 16px;
          color: #0B7EF9;
        }
      }
    }
    .batch-upload__span{
      display: inline-block;
      width: 82px;
      text-align: right;
    }
    .f-gray--batch-upload{
      color: #999999;
      display: inline-block;
      margin: 15px 0;
    }
    .zip__have{
      text-align: left;
      padding: 58px 30px;
      .batch-upload__file-name{
        display: inline-block;
        margin-left: 15px;
        font-size: 14px;
        color: #252525;
        width: 400px;
      }
      img, span{
        vertical-align: middle;
      }
    }
  }
</style>
