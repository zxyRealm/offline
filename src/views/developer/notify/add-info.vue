<template>
  <div class="notify-wrap">
    <uu-sub-tab back :menu-array="[{title:notifyTitle}]"></uu-sub-tab>
    <div class="notify-form-wrap vam">
      <uu-form
        ref="callbackInfoForm"
        subText="保存"
        form-class="callback-info-form"
        :rules="rules"
        width="306px"
        label-width="84px"
        @handle-submit="handelCallbackInfo"
        v-model="callbackForm">
        <el-form-item label="类型：" prop="type">
          <el-select v-model="callbackForm.type" placeholder="请选择类型">
            <el-option :value="1" label="到店通知">
              到店通知
            </el-option>
            <el-option :value="2" label="人脸通知">
              人脸通知
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调地址：" prop="tokenURL">
          <el-input
            type="text"
            placeholder="请输入回调地址"
            v-model.trim="callbackForm.tokenURL"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="intro">
          <el-input
            type="textarea"
            v-model.trim="callbackForm.intro"
            placeholder="请输入描述"></el-input>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
import {validateURL} from '@/utils/validate'
import {HandleNotice, GetNoticeInfo} from '../../../api/developer'

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
          callback()
        } else {
          callback(new Error('非法回调地址'))
        }
      }
    }
    return {
      menu: [
        {title: '消息通知', index: '/developer/notify'},
        {title: '开放API', index: '/developer/api'}
      ],
      rules: {
        type: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ],
        tokenURL: [
          {required: true, validator: validateUrl, trigger: 'blur'}
        ],
        intro: [
          {required: true, message: '请输入描述', trigger: 'blur'},
          {max: 255, message: '请输入1-255位字符', trigger: 'blur'}
        ]
      },
      callbackForm: {
        type: 1,
        tokenURL: '',
        intro: ''
      }
    }
  },
  methods: {
    // 处理回调信息 根据路由名称确定当前是更新信息或创建信息
    handelCallbackInfo (data) {
      const type = this.$route.name === 'addNotifyCallback' ? 'create' : 'update'
      HandleNotice(data, type).then(res => {
        this.$tip('操作成功')
        this.$router.push('/developer/notify')
      })
    },
    // 获取回调信息
    getCallbackInfo () {
      GetNoticeInfo({noticeGuid: this.$route.params.id}).then(res => {
        this.callbackForm = res.data
      })
    }
  },
  computed: {
    // 根据路由显示页面标题
    notifyTitle: function () {
      return this.$route.name === 'addNotifyCallback' ? '创建消息通知' : '编辑消息通知'
    }
  },
  mounted () {
    // 编辑信息路由下先获取信息
    if (this.$route.name === 'editNotifyCallback') {
      this.getCallbackInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
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
