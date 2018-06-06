<template>
  <div class="developer-center clearfix">
    <uu-sub-tab :menu-array="menu" :sub-link="subLink"></uu-sub-tab>
    <div class="user-info-wrap">
      <div class="avatar-wrap">
        <img src="/static/img/logo.png" alt="">
      </div>
      <div class="form-filed vam">
        <uu-form form-class="user-info-form" :readonly="!editable" v-model="userInfoForm" refName="userInfoForm">
          <el-form-item label="手机号：" readonly>
            <el-input type="text" readonly placeholder="请输入手机号" v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" readonly>
            <el-input type="text" readonly placeholder="请输入公司名称" v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="地区：">
            <el-input type="text" :readonly="!editable" placeholder="请选取地址" v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" :readonly="!editable" placeholder="请填写详细地址" v-model="userInfoForm.username"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input type="text" :readonly="!editable" placeholder="请输入联系人姓名" v-model="userInfoForm.username"></el-input>
          </el-form-item>
        </uu-form>
      </div>
      <el-button class="affirm mc" @click="submitForm('userInfoForm')">保存</el-button>
    </div>

  </div>
</template>

<script>
    export default {
      name: "index",
      data(){
        return {
          menu:[
            { title:'个人中心'}
          ],
          subLink:{title:'编辑',index:'/developer/info/edit'},
          userInfoForm:{
            username:'',
            phone:''
          },
          editable:false
        }
      },
      methods:{
        submitForm(value){
          this.$tip("保存成功",'info');
          console.log(value,this.userInfoForm)
        }
      },
      created(){
        if(this.$route.name==='infoEdit'){
          this.subLink.title = '';
          this.editable = true
        }else {
          this.editable = false
        }
      },
      watch:{
        "$route":function (val) {
          if(val.name==='infoEdit'){
            this.subLink.title = '';
            this.editable = true
          }else {
            this.editable = false
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-info-wrap{
  .avatar-wrap{
    width: 114px;
    height: 114px;
    border-radius: 50%;
    background: url("/static/img/avatar_person_bg@2x.png") no-repeat center center;
    background-size:contain ;
    margin: 0 auto;
    overflow: hidden;
    padding: 3px;
    box-sizing: border-box;
    margin-bottom:18px;
    >img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .form-filed{
    width: 720px;
    height: 300px;
    margin: 15px auto;
    border:1px solid chocolate;
    .user-info-form{

    }
  }
}
</style>

