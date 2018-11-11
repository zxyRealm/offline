<template>
  <div class="menber">
    <div class="member__title">
      <div class="el-icon-arrow-left retrun" @click="returnLast"></div>
      <el-breadcrumb separator="/" class="fl">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!this.$route.query.guid">新建库</el-breadcrumb-item>
        <el-breadcrumb-item v-else>编辑库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="member__form">
      <uu-form
        :rules="rules"
        v-model="formData"
        class="form__position"
        ref="userInfoForm"
        form-class="user-info-form"
        @handle-submit="save"
        :subText="'保存'">

        <el-form-item label="库名称：" prop="name">
          <el-input type="text"  placeholder="添加库名称" maxlength="20" v-model.trim="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input type="text" placeholder="添加备注" maxlength="20" v-model.trim="formData.remark"></el-input>
        </el-form-item>

        <el-form-item label="关联社群：">
          <div class="form__button" @click="getGroupList" v-show="!associationData">关联</div>
          <div v-show="associationData" class="edit__name">{{associationData.name}}</div><i class="el-icon-edit edit" @click="getGroupList" v-show="associationData"></i>
        </el-form-item>
      </uu-form>
    </div>

    <!--设备绑定社群-->
    <ob-dialog-form
      filter
      @remote-submit="bindCommunity"
      :group="groupList"
      title="添加社群"
      type="group"
      :visible.sync="dialogFormVisible"
    >
    </ob-dialog-form>
  </div>
</template>

<script>
import {simplifyGroups} from '@/utils'
export default {
  name: 'library',
  data () {
    return {
      groupList: [],
      dialogFormVisible: false,
      rules: {
        name: [{required: true, message: '请输入库名称', trigger: 'blur'}]
      },
      formData: {
        name: '',
        remark: ''
      },
      associationData: ''
    }
  },
  methods: {
    // 保存事件
    save (e) {
      let data = {
        name: e.name,
        remark: e.remark,
        guid: this.$route.query.guid,
        groupGuid: this.associationData.groupGuid
      }
      if (this.$route.query.guid) {
        this.$http('/memberLibrary/update', data).then(res => {
          if (res.result) {
            this.$router.go(-1)
          }
        })
      } else {
        this.$http('/memberLibrary/create', data).then(res => {
          if (res.result) {
            this.$router.go(-1)
          }
        })
      }
    },
    // 返回上一级
    returnLast () {
      this.$router.go(-1)
    },
    // 获取自有社群列表，绑定社群时只能绑定自有社群
    getGroupList () {
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
        this.dialogFormVisible = true
      })
    },
    // 确认关联
    bindCommunity (data) {
      console.log(data)
      this.associationData = data[0]
      this.dialogFormVisible = false
    }
  },
  created () {
    if (this.$route.query.guid) {
      let data = {
        guid: this.$route.query.guid
      }
      this.$http('/memberLibrary/find', data).then(res => {
        if (res.result) {
          this.formData = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .edit{
    float: left;
    color: #0F9EE9;
    font-size: 14px;
    cursor: pointer;
    margin: 10px 0 0 10px;
  }
  .edit__name{
    float: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    display: inline-block;
    max-width: calc(100% - 30px);
  }
  .menber{
    padding: 0 20px;
  }
  .member__title{
    padding-top: 26px;
    margin-bottom: 22px;
    height: 36px;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
  }
  .member__form{
    margin: 0 auto;
    width: 67.6%;
    height: 85%;
    background-color: rgba(1,8,20,0.10);
    border: 1px dashed rgba(151,151,151,0.10);
  }
  .form__button{
    width: 222px;
    height: 30px;
    cursor: pointer;
    color: #1896E6;
    text-align: center;
    background-image:url("/static/img/input_border_bg@2x.png");
    background-size: 100% 100%;
  }
  .form__position{
    position: relative;
    top: 30%;
  }
  .retrun{
    float: left;
    cursor: pointer;
    line-height: 30px;
  }
</style>
