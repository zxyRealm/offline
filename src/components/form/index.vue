<template>
  <el-form :model="ruleForm" :readonly="readonly" :style="{width:width}" :rules="rules"
           ref="submitForm" :label-width="labelWidth"
           label-position="left" :class="formClass" class="common-form">
    <slot></slot>
    <el-form-item class="form-item-button" v-if="subText">
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
                this.$emit('handle-submit',subData)
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
  @import "@/styles/form.scss";
</style>
