<template>
  <div class="developer-center clearfix">
    <uu-sub-tab :menu-array="menu" :sub-link="subLink"></uu-sub-tab>
    <div class="user-info-wrap">
      <div class="avatar-wrap">
        <img src="/static/img/logo.png" alt="">
      </div>
      <div class="form-filed vam">
        <uu-form ref="userInfoForm"
                 form-class="user-info-form"
                 :rules="rules"
                 :readonly="!editable"
                 v-model="userInfoForm">
          <el-form-item label="手机号：" readonly prop="phone">
            <el-input type="text" readonly placeholder="请输入手机号" v-model="userInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" readonly prop="company">
            <el-input type="text" readonly placeholder="请输入公司名称" v-model="userInfoForm.company"></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="address">
            <area-select :readonly="!editable" v-model="userInfoForm.address"></area-select>
          </el-form-item>
          <el-form-item prop="detail">
            <el-input type="text" :readonly="!editable" placeholder="请填写详细地址"
                      v-model="userInfoForm.detail"></el-input>
          </el-form-item>

          <el-form-item label="联系人：" prop="username">
            <el-input type="text" :readonly="!editable" placeholder="请输入联系人姓名"
                      v-model="userInfoForm.username"></el-input>
          </el-form-item>
        </uu-form>
      </div>
      <el-button v-show="editable" class="affirm mc" @click="submitForm('userInfoForm')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import area from '@/components/area-select/area-select'

  export default {
    components: {
      'area-select': area
    },
    name: "index",
    data() {
      return {
        menu: [
          {title: '个人中心'}
        ],
        rules: {
          company: [
            {required: true, message: '请输入公司名称', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入选取地址', trigger: 'blur'}
          ],
          detail: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ]
        },
        subLink: {title: '编辑', index: '/developer/info/edit'},
        userInfoForm: {
          username: '',
          phone: '13186958888',
          address: '14,151,1434',
          detail:'',
          company:'杭州宇泛智能科技有限公司'
        },
        editable: false
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].submitForm((data)=>{
          console.log(data)
        })
      },
      getDepInfo(){
        this.$http("/api/merchant/usercenter").then(res=>{
          if(res.result){
            console.log(res.data)
          }
        })
      }
    },
    created() {
      this.getDepInfo();
      if (this.$route.name === 'infoEdit') {
        this.subLink.title = '';
        this.editable = true
      } else {
        this.editable = false
      }
    },
    watch: {
      "$route": function (val) {
        this.$refs.userInfoForm.$refs.submitForm.resetFields();
        if (val.name === 'infoEdit') {
          this.subLink.title = '';
          this.editable = true
        } else {
          this.subLink.title = '编辑';
          this.editable = false
        }
      },
      "userInfoForm.address": function (val) {
        console.log(val)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-info-wrap {
    .avatar-wrap {
      width: 114px;
      height: 114px;
      border-radius: 50%;
      background: url("/static/img/avatar_person_bg@2x.png") no-repeat center center;
      background-size: contain;
      margin: 0 auto;
      overflow: hidden;
      padding: 3px;
      box-sizing: border-box;
      margin-bottom: 18px;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .form-filed {
      width: 720px;
      height: 300px;
      margin: 15px auto;
      /*border: 1px solid chocolate;*/
      background: url("/static/img/textarea_border2_bg.png") no-repeat;
      background-size: 100% 100%;
      .user-info-form {

      }
    }
  }
</style>

