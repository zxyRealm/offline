<template>
  <div class="developer-center clearfix">
    <uu-sub-tab :menu-array="menu" :sub-link="subLink"></uu-sub-tab>
    <div class="user-info-wrap">
      <div class="avatar-wrap">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :http-request="avatarUpload"
          :before-upload="beforeAvatarUpload">
          <div v-if="avatarUrl" :style="{ backgroundImage:'url('+avatarUrl+')'}" class="avatar"></div>
          <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
        <!--<img src="/static/img/logo.png" alt="">-->
      </div>
      <div class="form-filed vam">
        <uu-form ref="userInfoForm"
                 form-class="user-info-form"
                 :rules="editable?rules:{}"
                 :readonly="!editable"
                 v-model="userInfoForm">
          <el-form-item label="手机号：" readonly prop="phone">
            <el-input type="text" readonly placeholder="请输入手机号" v-model="userInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" readonly prop="company">
            <el-input type="text" readonly placeholder="请输入公司名称" v-model="userInfoForm.company"></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="pca">
            <area-select :readonly="!editable" v-model="userInfoForm.pca"></area-select>
          </el-form-item>
          <el-form-item prop="address">
            <el-input type="text" :readonly="!editable" placeholder="请填写详细地址"
                      v-model="userInfoForm.address"></el-input>
          </el-form-item>

          <el-form-item label="联系人：" prop="contacts">
            <el-input type="text" :readonly="!editable" placeholder="请输入联系人姓名"
                      v-model="userInfoForm.contacts"></el-input>
          </el-form-item>
        </uu-form>
      </div>
      <el-button v-show="editable" class="affirm mc" @click="submitForm('userInfoForm')">{{userInfo.merchantGuid?'编辑':'保存'}}</el-button>
    </div>
  </div>
</template>

<script>
import area from '@/components/area-select/area-select'
import { mapState } from 'vuex'
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
          contacts: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ]
        },
        subLink: {title: '编辑', index: '/developer/info/edit'},
        userInfoForm: {
          contacts: '', //联系人
          phone: '',
          pca: '', //省市区id
          address:'', //详细地址
          company:''
        },
        editable: false
      }
    },
    methods: {
      // 编辑修改个人信息
      submitForm(formName) {
        this.$refs[formName].submitForm((data)=>{
          let pcaArr = data.pca.split(',').map(Number);
          let type = this.userInfo?'update':'create';
          type==='update'?data.merchantGuid = this.userInfo.merchantGuid:'';
          data.provinceAreaID = pcaArr[0];
          data.cityAreaID = pcaArr[1];
          data.districtAreaID = pcaArr[2];
          delete  data.pca;
          this.$http("/merchant/usercenter/"+type,data).then(res=>{
            if(res.result){
              if(type==='update'){
                this.$tip("编辑成功")
              }else {
                this.$tip('保存成功')
              }
              this.$dispatch('GET_USER_INFO')
            }
          });
        })
      },
      getBaseInfo(){
        this.$http("/merchant/getInfo").then(res=>{
          for(let item in this.userInfoForm){
            if(res.data[item]){
              this.$set(this.userInfoForm,item,res.data[item])
            }
          }
        })
      },
      initData(){
        this.getBaseInfo();
        if(this.userInfo.merchantGuid){
          for(let item in this.userInfoForm){
            if(this.userInfo[item]&&item!=='pca'){
              this.$set(this.userInfoForm,item,this.userInfo[item])
            }
          }
          this.userInfoForm.pca = this.userInfo.provinceAreaID +','+this.userInfo.cityAreaID +','+this.userInfo.districtAreaID;
        }
      },
      avatarUpload(data){
        this.$http('/auth/oss/image/signature').then(res=>{
          if(res.data){
            let formData = new FormData();
            if(!this.userInfo.merchantGuid){
              this.$tip("请先完善个人信息");
              return
            }
            formData.append('key',`merchant/${this.userInfo.merchantGuid}/${data.file.name}`);
            formData.append('policy', res.data['policy']);
            formData.append('OSSAccessKeyId', res.data['accessid']);
            formData.append('success_action_status', '200');
            formData.append('signature', res.data['signature']);
            formData.append('file', data.file, data.file.name);
            this.$http(res.data.host,formData).then(back=>{
              console.log('=====',back)
            }).catch(err=>{
              let avatarHref = res.data.host+'/merchant/'+this.userInfo.merchantGuid+'/'+data.file.name;
              this.$http("/merchant/usercenter/image",{faceImgURL:avatarHref}).then(res=>{
                this.$tip('头像上传成功');
                this.$store.state.userInfo.faceImgURL = avatarHref;
              });
            })
          }
        });
      },
      handleAvatarSuccess(){
        console.log('upload success')
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$tip('上传头像图片只能是 JPG/PNG 格式!','error');
        }
        if (!isLt2M) {
          this.$tip('上传头像图片大小不能超过 2MB!','error');
        }
        return isJPG && isLt2M;
      }
    },
    created() {
      if (this.$route.name === 'infoEdit') {
        this.subLink.title = '';
        this.editable = true
      } else {
        this.editable = false
      }
      this.initData();

    },
    mounted(){
      this.avatarUrl = '/static/img/logo.png'
    },
    watch: {
      "$route": function (val) {
        if (val.name === 'infoEdit') {
          this.subLink.title = '';
          this.editable = true
        } else {
          this.$refs.userInfoForm.$refs.submitForm.resetFields();
          this.subLink.title = '编辑';
          this.editable = false
        }
      },
      "userInfo":function (val) {
        this.initData()
      },
      "userInfoForm.address": function (val) {
        console.log(val)
      }
    },
    computed:{
      ...mapState([
        "userInfo"
      ]),
      avatarUrl:{
        get(val){
          console.log('get avatar',this.userInfo.faceImgURL);
          return this.userInfo.faceImgURL || '/static/img/logo.png'
        },
        set(val){
          console.log('set avatar',val);
          return this.userInfo.faceImgURL || ''
        }
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
      .avatar-uploader{
        height: 100%;
        width: 100%;
        .el-upload{
          width: 100%;
          height: 100%;
        }
      }
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
<style lang="scss">
  .avatar-wrap{
    .avatar-uploader{
      .el-upload{
        height: 100%;
        width:100%;
        box-sizing: border-box;
        padding: 2px;
        .avatar{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-position: center center;
          background-repeat: no-repeat;
          background-size:contain;
        }
      }
    }
  }

</style>
