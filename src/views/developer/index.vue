<template>
  <div class="developer-center clearfix">
    <uu-sub-tab :menu-array="[{title: '个人中心'}]" :sub-link="subLink"></uu-sub-tab>
    <div class="user-info-wrap">
      <div class="avatar-wrap">
        <el-upload
          class="avatar-uploader"
          action=""
          accept="jpg/png"
          :show-file-list="false"
          :http-request="avatarUpload"
          :before-upload="beforeAvatarUpload">
          <div v-if="avatar" class="avatar vam">
            <img :src="avatar" alt="">
          </div>
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
      </div>
      <div class="form-filed vam">
        <uu-form
          ref="userInfoForm"
          form-class="user-info-form"
          :rules="rules"
          :readonly="!editable"
          :subText="editable?'保存':''"
          @handle-submit="submitForm"
          v-model="userInfoForm">
          <el-form-item label="手机号：" prop="phone">
            <p class="readonly__text" v-if="!!userInfo.phone">{{userInfoForm.phone}}</p>
            <el-input type="text" v-show="!userInfo.phone" placeholder="添加手机号"
                      v-model.trim="userInfoForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="company">
            <p class="readonly__text" v-if="!editable">{{userInfoForm.company}}</p>
            <el-input type="text" v-show="editable" placeholder="添加公司名称"
                      v-model.trim="userInfoForm.company"></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="pca">
            <area-select placeholder="选择商铺所在区域" :readonly="!editable" v-model="userInfoForm.pca"></area-select>
          </el-form-item>
          <el-form-item prop="address">
            <p class="readonly__text" v-if="!editable">{{userInfoForm.address}}</p>
            <el-input type="text" v-show="editable" placeholder="添加商户详细地址"
                      v-model.trim="userInfoForm.address"></el-input>
          </el-form-item>

          <el-form-item label="联系人：" prop="contacts">
            <p class="readonly__text" v-if="!editable">{{userInfoForm.contacts}}</p>
            <el-input type="text" v-show="editable" placeholder="添加联系人"
                      v-model.trim="userInfoForm.contacts"></el-input>
          </el-form-item>
        </uu-form>
      </div>
    </div>
  </div>
</template>
<script>
import area from '@/components/area-select/area-select'
import {mapState, mapGetters} from 'vuex'
import {validPhone, validateRule} from '@/utils/validate'

export default {
  components: {
    'area-select': area
  },
  name: 'index',
  data () {
    // 验证公司名称
    const validCompany = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('请输入正确的公司名称'))
        }
      } else {
        callback()
      }
    }
    // 验证地址选取
    const validDetail = (rule, value, callback) => {
      if (value) {
        if (value.length > 128) {
          callback(new Error('请输入1-128位字符'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证联系人
    const validContacts = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('请输入正确的联系人'))
        }
      } else {
        callback()
      }
    }
    return {
      error: '',
      rules: {
        company: [
          {validator: validCompany, trigger: 'blur'}
        ],
        phone: [
          {validator: validPhone, trigger: 'blur'}
        ],
        pca: [
          {message: '选择商铺所在区域', trigger: 'blur'}
        ],
        address: [
          {validator: validDetail, trigger: 'blur'}
        ],
        contacts: [
          {validator: validContacts, trigger: 'blur'}
        ]
      },
      subLink: {title: '编辑', index: '/person/edit'},
      userInfoForm: {
        contacts: '', // 联系人
        phone: '',
        pca: '', // 省市区id
        address: '', // 详细地址
        company: ''
      },
      editable: false
    }
  },
  methods: {
    // 编辑修改个人信息
    submitForm (data) {
      let pcaArr = data.pca.split(',').map(Number)
      let type = this.userInfo.merchantGuid ? 'update' : 'create'
      if (type === 'update') data.merchantGuid = this.userInfo.merchantGuid
      data.provinceAreaID = pcaArr[0] || 0
      data.cityAreaID = pcaArr[1] || 0
      data.districtAreaID = pcaArr[2] || 0
      delete data.pca
      this.$http('/merchant/usercenter/update', data).then(res => {
        if (res.result) {
          this.$tip('保存成功')
          this.$store.dispatch('GET_USER_INFO').then(() => {
            this.$router.push('/person/center')
          })
        }
      })
    },
    // 初始化个人信息格式，使其满足自定义组件参数要求
    initData () {
      for (let item in this.userInfoForm) {
        if ((this.userInfo[item] || item === 'contacts') && item !== 'pca') {
          this.$set(this.userInfoForm, item, this.userInfo[item])
        }
      }
      this.userInfoForm.pca = this.userInfo.provinceAreaID ? this.userInfo.provinceAreaID + ',' + this.userInfo.cityAreaID + ',' + this.userInfo.districtAreaID : ''
      if (this.$route.name === 'personEdit') {
        this.$nextTick(() => {
          if (this.$refs.userInfoForm.$refs.submitForm) {
            this.$refs.userInfoForm.$refs.submitForm.clearValidate()
          }
        })
      }
    },
    // 上传头像 (未完善信息也可以上传头像)
    avatarUpload (data) {
      let uid = this.userInfo.developerId
      // 获取阿里云oss signature
      this.$http('/auth/oss/image/signature').then(res => {
        if (res.data) {
          let formData = new FormData()
          let customName = 'avatar_' + new Date().getTime()
          formData.append('key', `merchant/${uid}/${customName}`)
          formData.append('policy', res.data['policy'])
          formData.append('OSSAccessKeyId', res.data['accessid'])
          formData.append('success_action_status', '200')
          formData.append('signature', res.data['signature'])
          formData.append('file', data.file, customName)
          // 构建formData 对象，将图片上传至阿里云oss服务
          this.$http(res.data.host, formData).then(back => {
            if (!back.data) {
              let avatarHref = res.data.host + '/merchant/' + uid + '/' + customName
              // 图片地址提交后台更新个人头像信息
              this.$http('/merchant/usercenter/image', {faceImgURL: avatarHref}).then(res => {
                this.$tip('头像上传成功')
                this.$store.commit('SET_USER_INFO', {faceImgURL: avatarHref})
              })
            } else {
              this.$tip('上传失败，请稍后重试', 'error')
            }
          }).catch(error => {
            this.error = error
          })
        }
      }).catch(() => {
        this.$tip('服务器错误，请重新尝试')
      })
    },
    // 上传前图片格式校验
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$tip('上传头像图片只能是 JPG/PNG 格式!', 'error')
        return false
      }
      if (!isLt2M) {
        this.$tip('上传头像图片大小不能超过 2MB!', 'error')
        return false
      }
    }
  },
  created () {
    if (this.$route.name === 'personEdit') {
      this.subLink.title = ''
      this.editable = true
    } else {
      if (!this.userInfo.company || !this.userInfo.phone) {
        this.$router.push('/person/edit')
      }
      this.editable = false
    }
    this.initData()
  },
  watch: {
    '$route': function (val) {
      if (val.name === 'personEdit') {
        this.subLink.title = ''
        this.editable = true
      } else {
        // 路由变化时清除校验表单校验结果
        this.subLink.title = '编辑'
        this.editable = false
      }
      this.initData()
      this.$nextTick(() => {
        this.$refs.userInfoForm.$refs.submitForm.clearValidate()
      })
    },
    'userInfo': {
      handler (val) {
        this.initData()
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'loading'
    ]),
    ...mapGetters(['avatar'])
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
      .avatar-uploader {
        height: 100%;
        width: 100%;
        .el-upload {
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
      background: url("/static/img/form_border2_bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
<style lang="scss">
  .avatar-wrap {
    .avatar-uploader {
      .el-upload {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 2px;
        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          > img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }

  .form-filed {
    .user-info-form {
      .el-input__inner {
        &[readonly] {
          background: transparent !important;
        }
      }
    }
  }
</style>
