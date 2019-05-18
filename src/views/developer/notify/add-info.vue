<template>
  <div class="notify-wrap">
    <div class="f-secondary-title">
      <i class="iconfont icon-fanhui f-margin-right10 f-link" @click="$router.back(-1)"></i>
      <span class="title">{{isEdit ? '编辑消息通知' : '创建消息通知'}}</span>
    </div>
    <el-form :model="callbackForm" :rules="rules" ref="callbackInfoForm" size="medium" label-width="84px" class="callback-info-form">
      <el-form-item label="类型" prop="dataNoticeType">
        <el-select v-model="callbackForm.dataNoticeType" placeholder="请选择类型">
          <el-option label="到店通知" :value="1"></el-option>
          <el-option label="人脸通知" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回调地址" prop="url">
        <el-input type="text" placeholder="请输入回调地址" v-model.trim="callbackForm.url"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input type="textarea" v-model.trim="callbackForm.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="$router.back(-1)">取消</el-button>
        <el-button size="small" type="primary" @click="handelCallbackInfo">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { validateURL } from '@/utils/validate'
import { createNotice, updateNotice, getNoticeInfoById, judgeUrl } from '../../../api/developer'

export default {
  name: 'notify',
  data () {
    // 回调地址校验
    const validateUrl = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入回调地址'))
      } else {
        if (value.length > 1024) {
          callback(new Error('请输入1-1024位字符'))
        } else if (validateURL(value)) {
          judgeUrl({ url: value }).then(res => {
            if (!res.data) {
              callback(new Error('URL重复'))
            } else {
              callback()
            }
          }).catch(() => {
            callback(new Error('校验失败,请重试'))
          })
        } else {
          callback(new Error('非法回调地址'))
        }
      }
    }
    return {
      rules: {
        dataNoticeType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        url: [
          { required: true, validator: validateUrl, trigger: 'blur' }
        ],
        description: [
          { max: 255, message: '请输入1-255位字符', trigger: 'blur' }
        ]
      },
      callbackForm: {
        dataNoticeType: null,
        url: '',
        description: ''
      }
    }
  },
  methods: {
    // 处理回调信息 根据路由名称确定当前是更新信息或创建信息
    handelCallbackInfo () {
      this.$refs.callbackInfoForm.validate(valid => {
        if (valid) {
          let fun, msg, params
          params = { ...this.callbackForm }
          params.merchantGuid = this.userInfo.uuid
          if (this.isEdit) {
            fun = updateNotice
            msg = '编辑成功'
            params.dataNoticeGuid = this.isEdit
          } else {
            fun = createNotice
            msg = '创建成功'
          }
          fun(params).then(() => {
            this.$message.success(msg)
            this.$router.push(`/developer/notify?page=${this.page}`)
          })
        }
      })
    },
    // 获取回调信息
    getCallbackInfo () {
      getNoticeInfoById({ dataNoticeGuid: this.$route.query.id }).then(res => {
        let { dataNoticeType, description, url, dataNoticeGuid } = res.data
        this.callbackForm = { dataNoticeType, description, url, dataNoticeGuid }
      })
    }
  },
  computed: {
    ...mapState(['userInfo']),
    isEdit () {
      return this.$route.query.id || null
    },
    page () {
      return this.$route.query.page || null
    }
  },
  mounted () {
    // 编辑信息路由下先获取信息
    if (this.$route.query.id) {
      this.getCallbackInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
  .callback-info-form{
    margin: 20px 40px;
    width: 364px;
    /deep/ .el-select{
      width: 100%;
    }
    /deep/ .el-form-item__error{
      left: 288px;
      width: 100%;
      line-height: 36px;
      top: 0;
      padding-top: 0;
    }
  }
  .notify-wrap {
    height: 100%;
    .notify-form-wrap {
      height: 520px;
      width: 690px;
      margin: 0 auto;
      margin-top: 50px;
      background: rgba(1, 8, 20, 0.10);
      border: 1px dashed rgba(151, 151, 151, 0.10);
    }
  }

</style>
