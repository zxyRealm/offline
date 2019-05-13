<template>
  <div class="member" v-if="canShowPage">
    <div class="member__title">
      <span class="fl">人员管理</span>
      <el-button class="affirm medium fr add__button" @click="handleLibraryCreate">添加库</el-button>
    </div>
    <div v-if="libraryList.length" class="container__box">
      <div class="search__list">
        <div class="search__box">
          <el-input prefix-icon="el-icon-search" size="small" clearable v-model="searchLibraryValue"
                    placeholder="输入关键字"></el-input>
        </div>
        <div
          v-for="item in searchLibraryList" :key="item.personLibraryId"
          :class="['search__item', {'item__name--active': chooseLibraryId === item.personLibraryId}]">
          <span class="text__overflow item__name">{{item.personLibraryName}}</span>
          <span class="text__overflow item__type">{{item.personLibraryType | libraryType}}</span>
        </div>
      </div>
      <div class="content__box">
        <div class="content__title">
          <div class="content__title--top">
            <span>{{libraryInfo.personLibraryName}}</span>
            <div class="title__button">
              <span class="f-margin-right20 f-blue f-link">添加人员</span>
              <span class="f-margin-right20 f-blue f-link">批量添加</span>
              <i class="f-margin-right20 f-blue f-link iconfont icon-bianji" @click="handleLibraryUpdate"></i>
              <i class="f-red f-link iconfont icon-shanchu" @click="handleLibraryDelete"></i>
            </div>
          </div>
          <span class="text__overflow f-margin-right50">类型：{{libraryInfo.personLibraryType | libraryType}}</span>
          <span v-text="`人数：${libraryInfo.personTotal}`" class="text__overflow f-margin-right50"></span>
          <span v-text="`备注：${libraryInfo.remark}`" class="text__overflow"></span>
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
          <el-button icon="el-icon-search" size="small"></el-button>
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
                <span @click="handlePersonDelete(scope.row)" class="box__block f-red f-link"></span>
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
            <el-select v-model="libraryDialog.form.personLibraryType" placeholder="请选择类型" class="f-margin-right20">
              <el-option :label="item.label" :value="item.value" v-for="item in libraryDialog.libraryTypeList" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="libraryDialog.form.remark" :rows="3" type="textarea" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleLibraryDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleLibraryDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validateRule } from '@/utils/validate'
import { IsManageGroup } from '../../api/common'
import {
  getPersonList,
  getPersonLibraryById,
  getPersonLibraryList,
  judgeLibraryName,
  getPersonTypeList,
  createPersonLibrary,
  deletePersonLibrary,
  updatePersonLibrary
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
      emptyText: '数据加载中...',
      rules: {
        name: [{ required: true, validator: name, trigger: 'change' }]
      },
      // 列表内容
      pagination: {
        length: 10
      },
      // 要改变的库名称
      changeName: {
        name: ''
      },
      showPopver: false,
      dialogFormVisible: false,
      sendData: '',
      groupList: [],
      checkName: '',
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
          remark: ''
        },
        rules: {
          personLibraryName: [{ required: true, validator: libraryNameRule, trigger: 'blur' }],
          personLibraryType: [{ required: true, message: '请选择类型', trigger: 'change' }],
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
            { min: 1, max: 255, message: '请输入1-255位字符', trigger: 'blur' }
          ]
        },
        libraryTypeList: [
          { value: 0, label: '员工' },
          { value: 1, label: '会员' },
          { value: 2, label: '黑名单' }
        ]
      }
    }
  },
  created () {
    this.getLibraryList()
    console.log(this.currentManage)
  },
  mounted () {},
  computed: {
    ...mapState(['currentManage']),
    searchLibraryList () {
      return this.libraryList.filter((item) => {
        return item.personLibraryName.includes(this.searchLibraryValue)
      })
    },
    chooseLibraryId () {
      return this.$route.query.libraryId || null
    }
  },
  methods: {
    // 表格内点击编辑
    handlePersonUpdate (row) {},
    // 表格内点击删除
    handlePersonDelete (row) {},
    // 获取人员库列表
    getLibraryList () {
      if (!this.currentManage.id) return
      let data = {
        groupGuid: this.currentManage.id
      }
      this.emptyText = '数据加载中...'
      getPersonLibraryList(data).then(res => {
        this.canShowPage = true
        this.libraryList = res.data
        if (this.libraryList.length) {
          this.$router.push({ path: '/member', query: { libraryId: this.$route.query.libraryId || this.libraryList[0].personLibraryId } })
        }
        this.getLibraryById()
        this.getPersonList()
        this.getPersonTypeList()
      }).catch(() => {
        this.emptyText = '数据获取失败'
      })
    },
    getPersonTypeList () {
      getPersonTypeList({ memberLibraryGuid: this.libraryInfo.personLibraryId }).then(res => {
        this.searchConfig.personTypeList = res.data
      })
    },
    // 添加库
    addNew () {
      IsManageGroup().then(res => {
        if (!res.data) {
          this.$affirm({
            confirm: '前往【社群管理】',
            cancel: '知道了',
            text: '需满足条件：<br/>该账号下有管理员社群/单店社群/成员社群（已加入管理员社群）'
          }, (action, instance, done) => {
            if (action === 'confirm') {
              this.$router.push({ path: '/community/mine' })
              done()
            } else {
              done()
            }
          })
        } else {
          this.$router.push({ path: '/member/library' })
        }
      })
    },
    // 单个人员库信息查询
    getLibraryById () {
      getPersonLibraryById({ personLibraryId: this.chooseLibraryId }).then(res => {
        this.libraryInfo = res.data
      })
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
        let { personLibraryId, personLibraryName, personLibraryType, remark } = this.libraryInfo
        this.libraryDialog.form = { personLibraryId, personLibraryName, personLibraryType, remark }
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
            let { personLibraryName, personLibraryType, remark } = this.libraryDialog.form
            params = { personLibraryName, personLibraryType, remark }
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

      }).catch(() => {})
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
  }
</style>
