<template>
  <el-form :model="ruleForm" :readonly="readonly" :style="{width:width}" :rules="rules"
           ref="submitForm" :label-width="labelWidth"
           label-position="left" :class="formClass" class="common-form">
    <slot></slot>
    <el-form-item v-if="subText">
      <el-button class="affirm" @click="submitForm('submitForm')">{{subText}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "uu-form",
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: '332px'
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
      subText: {
        type: [String],
        default: ''
      }
    },
    data() {
      return {
        ruleForm: {}
      }
    },
    created() {
      this.ruleForm = this.value
    },
    methods: {
      submitForm(callback) {
          this.$refs['submitForm'].validate((valid) => {
            if (valid) {
              let subData = JSON.parse(JSON.stringify(this.ruleForm));
              if(typeof callback ==='function'){
                callback(subData);
              }else {
                this.$emit('handel-submit',subData)
              }
            } else {
              console.warn("validate is not pass,con't submit")
            }
          })
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
    .el-select{
      width: 100%;
    }
    &[readonly] {
      .el-form-item {
        .el-form-item__content {
          .el-input {
            background: transparent;
            .el-input__inner {
              background: transparent;
            }
          }

          .el-textarea__inner{
            background: transparent;
          }
        }
      }
    }
    .el-form-item {
      margin-bottom: 16px;
      line-height: 30px;
      &[readonly] {
        .el-input {
          background: transparent !important;
          .el-input__inner {
            &[readonly] {
              background: transparent;
            }
          }
        }
        .el-textarea__inner{
          background: transparent!important;
          &[readonly]{
            background: transparent;
          }
        }
      }
      .el-form-item__label {
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        &:before {
          display: none;
        }
      }
      .el-form-item__content {
        line-height: 30px;
        .el-input {
          height: 30px;
          border-radius: 5px;
          .el-input__inner {
            background-color: #232027;
            background-image: url("/static/img/input_border_bg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border: none;
            margin: 1px;
            color: #fff;
            width: calc(100% - 2px);
            line-height: 30px;
            height: 30px;
          }
        }
        .el-textarea{
          height: 70px;
          .el-textarea__inner{
            height: 100%;
            width: 100%;
            background-color: #232027;
            background-image: url("/static/img/textarea_border_bg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border: none;
            resize: none;
            color: #fff;
          }
          &.el-input--medium{
            height: 300px;
            .el-textarea__inner{
              background-image:url("/static/img/textarea_border2_bg.png");
            }
          }
        }
        .el-form-item__error{
          color:#F87F21;
          line-height: 1.2;
        }
      }
    }
  }
  .el-select-dropdown{
    .el-select-dropdown__list{
      .el-select-dropdown__item{
        line-height: 24px;
        height: 24px;
        &:hover{
          background-color: #EBEBEB;
        }
        >span{
          line-height: 24px!important;
        }
      }
    }
  }
</style>
