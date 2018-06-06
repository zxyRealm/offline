<template>
  <el-form :model="ruleForm" :readonly="readonly" :style="{width:width}" status-icon :rules="rules" :ref="refName" :label-width="labelWidth"
           label-position="left" :class="formClass" class="common-form">
    <slot></slot>
    <el-form-item v-if="subText">
      <el-button class="affirm" @click="submitForm(refName)">{{subText}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "uu-form",
    props: {
      readonly:{
        type:Boolean,
        default:false
      },
      width: {
        type: [String, Number],
        default: '324px'
      },
      labelPosition: {
        type: [String],
        default: 'left'
      },
      value: {
        type: [Object],
        default: () => ({})
      },
      labelWidth: {
        type: String,
        default: '110px'
      },
      rules: {
        type: [Object],
        default: () => ({})
      },
      refName: {
        type: String,
        default: ''
      },
      formClass: {
        type: [String, Object],
        default: ''
      },
      subText:{
        type:[String],
        default:''
      }
    },
    data() {
      return {
        ruleForm: {}
      }
    },
    created(){
      this.ruleForm = this.value
    },
    methods:{
      submitForm(formName){
        if(formName){
          this.$refs[formName].validate((valid)=>{
            if(valid){
              let subData = JSON.parse(JSON.stringify(this.ruleForm));
              this.$emit("submit-form",subData)
            }else {
              console.warn("validate is not pass,con't submit")
            }
          })
        }else {
          console.error("the form name is not exist")
        }

      }
    },
    mounted() {
      // this.ruleForm = this.value || {};
    },
    watch: {
      value: {
        handler: function (val) {
          this.ruleForm = val;
        },
        deep: true
      },
      ruleForm: {
        handler: function (val) {
          this.$emit('input', val)
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .common-form {
    margin: 0 auto;
    &[readonly]{
      .el-form-item{
        .el-form-item__content{
          .el-input{
            background: transparent;
            .el-input__inner{
              background: transparent;
            }
          }
        }
      }
    }
    .el-form-item {
      margin-bottom:16px;
      &[readonly]{
          .el-input{
            background: transparent!important;
            .el-input__inner{
              &[readonly]{
                background: transparent;
              }
            }
          }
      }
      .el-form-item__label {
        line-height: 30px;
        font-size: 14px;
        color: #fff;
      }
      .el-form-item__content {
        line-height: 32px;
        .el-input {
          height: 32px;
          border-radius: 5px;
          background-image: linear-gradient(to left, #813FC5, #1896E6);
          .el-input__inner {
            border: none;
            margin: 1px;
            color: #fff;
            width: calc(100% - 2px);
            background: #232027;
            line-height: 30px;
            height: 30px;
          }
        }

      }

    }
  }
</style>
