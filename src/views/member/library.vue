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
          <el-input type="text"  placeholder="添加库名称" v-model.trim="formData.name" clearable></el-input>
        </el-form-item>

        <el-form-item
          label="备注："
          :rules="[
            {max: 255, message: '请输入1-255位字符', trigger: 'blur'}
          ]"
          prop="remark">
          <el-input type="text" placeholder="添加备注" v-model.trim="formData.remark" clearable></el-input>
        </el-form-item>

        <el-form-item label="类型：" prop="type">
          <el-select v-model="formData.type" placeholder="请选择">
            <el-option label="会员" :value="1"></el-option>
            <el-option label="员工" :value="2"></el-option>
            <el-option label="黑名单" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'
import {mapState} from 'vuex'
import {MemberNoFloor} from '../../api/community'
import {MemberLibraryUpdate, MemberLibraryCreate, MemberLibraryFind, MemberLibraryNameExist} from '../../api/member'

export default {
  name: 'library',
  data () {
    const name = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入库名称'))
      } else if (value.length > 32) {
        callback(new Error('请输入1-32位字符'))
      } else if (!validateRule(value, 2)) {
        callback(new Error('仅限汉字/字母/数字/下划线/空格'))
      } else if (this.checkName === value) {
        callback()
      } else {
        let data = {
          name: value
        }
        MemberLibraryNameExist(data).then(res => {
          if (res.data) {
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
      groupList: [],
      dialogFormVisible: false,
      rules: {
        name: [{required: true, validator: name, trigger: 'blur'}],
        type: [{required: true, message: '请选择库类型', trigger: 'blur'}]
      },
      formData: {
        name: '',
        remark: ''
      },
      // 要检验的名字
      checkName: ''
    }
  },
  methods: {
    // 保存事件
    save (e) {
      let data = {
        name: e.name,
        remark: e.remark,
        type: e.type,
        guid: this.$route.query.guid,
        groupGuid: this.currentManage.id
      }
      if (this.$route.query.guid) {
        MemberLibraryUpdate(data).then(res => {
          this.$router.go(-1)
        })
      } else {
        MemberLibraryCreate(data).then(res => {
          this.$router.go(-1)
        })
      }
    },
    // 返回上一级
    returnLast () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$route.query.guid) {
      let data = {
        guid: this.$route.query.guid
      }
      MemberLibraryFind(data).then(res => {
        this.formData = res.data
        this.checkName = res.data.name
      })
    }
  },
  computed: {
    ...mapState(['currentManage'])
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
    /*padding: 0 20px;*/
  }
  .member__title{
    padding: 26px 20px 0;
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
