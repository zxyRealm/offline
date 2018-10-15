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

        <el-form-item label="关联社区：">
          <div class="form__button">关联</div>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'library',
  data () {
    return {
      rules: {
        name: [{required: true, message: '请输入库名称', trigger: 'blur'}]
      },
      formData: {
        name: '',
        remark: ''
      }
    }
  },
  methods: {
    // 保存事件
    save (e) {
      let data = {
        name: e.name,
        remark: e.remark,
        guid: this.$route.query.guid
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
