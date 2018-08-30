<template>
  <div class="edit-custom-wrap">
    <uu-sub-tab
      back
      :menu-array="[{title:tabTitle}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border vam">
      <uu-form
        formClass="error278"
        label-width="84px"
        sub-text="确定"
        width="364px"
        @handle-submit="submitForm"
        v-model="customForm"
        :rules="rules"
      >
        <el-form-item label="分组名称：" prop="name">
          <el-input
            type="text"
            placeholder="请输入分组名称"
            v-model.trim="customForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分组类型：" prop="type">
          <el-radio-group class="custom-checkbox-group" v-model="customForm.type">
            <el-radio custom-type="address" :label="1">地理位置</el-radio>
            <el-radio custom-type="action" :label="2">功能区</el-radio>
            <el-radio custom-type="manage" :label="3">管理组</el-radio>
            <el-radio custom-type="more" :label="4">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分组描述：" prop="describe">
          <el-input type="textarea" placeholder="请输入分组描述"
                    v-model.trim="customForm.describe"></el-input>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
import {validateRule} from '@/utils/validate'
export default {
  name: 'edit-custom',
  data () {
    const validateName = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入分组名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          if (this.type === 'update' && this.originName === value) {
            callback()
          } else {
            this.$http('/groupCustom/nameExist', {name: value}, false).then(res => {
              !res.data ? callback() : callback(new Error('该名称已存在，请重新输入'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的分组名称'))
        }
      }
    }
    return {
      originName: '',
      customForm: {
        name: '',
        type: '',
        describe: ''
      },
      rules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择分组类型', trigger: 'blur'}
        ],
        describe: [
          {required: true, message: '请输入分组描述', trigger: 'blur'},
          {max: 255, message: '请输入1-255位字符', trigger: 'blur'}
        ]
      },
      customGroupList: [],
      customGroupInfo: {}
    }
  },
  methods: {
    submitForm (data) {
      this.$http(`/groupCustom/${this.type}`, data).then(res => {
        this.$tip('操作成功')
        this.$router.push({path: '/community/custom', params: {cid: this.$route.params.id}})
      })
    },
    getCustomGroupInfo () {
      this.$http('/groupCustom/info', {groupCustomGuid: this.$route.params.id}).then(res => {
        this.originName = JSON.parse(JSON.stringify(res.data.name))
        this.customForm = res.data
      })
    }
  },
  created () {
    if (this.type === 'update') {
      this.getCustomGroupInfo()
    }
  },
  computed: {
    tabTitle: function () {
      return this.$route.name === 'editCustom' ? '编辑社群分组' : '创建社群分组'
    },
    type: function () {
      return this.$route.name === 'editCustom' ? 'update' : 'create'
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-custom-from-wrap {
    margin: 0 auto;
    height: 520px;
    width: 690px;
    padding: 40px 0;
    box-sizing: border-box;
    .el-radio + .el-radio {
      &[custom-type] {
        margin-left: 10px;
      }
    }
  }
</style>
