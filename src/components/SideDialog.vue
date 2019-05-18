/*
* 侧边弹出框
* @author  张晓元
* @date    2019-05-13
*/
<template>
  <div
    v-show="visible"
    class="side__dialog--wrap"
    @click.self="close">
    <div class="side__dialog--content">
      <div class="side__dialog--header">
        <el-form
          v-if="isEdit && showForm"
          inline
          :ref="editNameForm"
          class="oneline__form--wrap"
          :model="editNameForm"
          :rules="deviceFormRules">
          <el-form-item prop="deviceName">
            <el-input v-model.trim="editNameForm.deviceName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="isEdit = false">取消</el-button>
            <el-button type="text" @click="submitEditNameForm('editNameForm')">保存</el-button>
          </el-form-item>
        </el-form>
        <div v-else class="">
          <span class="fs18">{{data[valueKey]}}</span>
          <i v-if="showForm" class="iconfont icon-bianji" @click="showEditForm"></i>
        </div>
      </div>
      <i class="iconfont icon-guanbi" @click="close"></i>
      <el-scrollbar
        :class="{'has-footer': showFooter}"
        class="side_dialog-scrollbar hidden-x">
        <slot name="content"></slot>
      </el-scrollbar>
      <template v-if="showFooter">
        <slot name="footer"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import { validateRule } from '@/utils/validate'

export default {
  name: 'side-dialog',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    showForm: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'name'
    }
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          // 一体机、服务器名称验重
          let subData = { name: value }
          if (this.$route.name === 'equipmentCamera') {
            // CheckCameraName(subData).then(res => {
            //   res.data ? callback(new Error('该名称已存在')) : callback()
            // }).catch(err => {
            //   callback(new Error(err.msg || '验证失败'))
            // })
          } else {
            // DeviceAliasExist(subData).then(res => {
            //   res.data ? callback(new Error('该名称已存在')) : callback()
            // }).catch(err => {
            //   callback(new Error(err.msg || '验证失败'))
            // })
          }
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback(new Error('请输入设备名称'))
      }
    }
    return {
      isEdit: false,
      editNameForm: {
        deviceName: ''
      },
      deviceFormRules: {
        deviceName: [
          { required: true, validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    showEditForm () {
      this.isEdit = true
      this.editNameForm.deviceName = this.data[this.valueKey]
    },
    submitEditNameForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('handle-edit', this.editNameForm)
        }
      })
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.isEdit = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .side__dialog--wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 1010;
    @media screen and (max-width: 1280px){
      height: calc(100vh - 17px);
    }
    .iconfont {
      cursor: pointer;
    }
    .side__dialog--header {
      height: 56px;
      padding: 10px 20px;
      box-sizing: border-box;
      .icon-bianji{
        margin-left: 12px;
        color: $theme-blue;
      }
    }
    .oneline__form--wrap{
      width: 300px;
    }
    .side__dialog--content {
      float: right;
      width: 560px;
      height: 100%;
      background: #fff;
      .icon-guanbi {
        position: absolute;
        top: 12px;
        right: 15px;
      }
      .side_dialog-scrollbar {
        height: calc(100% - 50px);
        &.has-footer {
          height: calc(100% - 100px);
        }
      }
    }
  }
</style>