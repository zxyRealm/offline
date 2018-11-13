<template>
  <div class="menber menber__person">
    <div class="member__title">
      <div class="el-icon-arrow-left retrun" @click="returnLast"></div>
      <el-breadcrumb separator="/" class="fl">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{titleName}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!this.$route.query.personId">添加人员</el-breadcrumb-item>
        <el-breadcrumb-item v-else>编辑人员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="member__form">
      <uu-form
        :rules="rules"
        v-model="personMessge"
        class="form__position"
        ref="userInfoForm"
        form-class="user-info-form"
        @handle-submit="addPerson"
        :subText="'保存'">

        <el-form-item label="照片：">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="avatarUpload"
            :before-upload="beforeAvatarUpload">
            <div class="form__button" v-if="!personMessge.faceImgUrl">添加<span class="f-grey">（400Kb以内）</span></div>
            <div v-if="personMessge.faceImgUrl" class="avatar__border">
              <div class="img__border" @mouseover="Imghover = true" @mouseout="Imghover = false">
                <img :src="personMessge.faceImgUrl" :class="{'avatar':true , 'hundredWidth':hundredWidth}" @click.stop="bubbling">
                <div class="el-icon-error img__close" @click.stop="colseImg" v-show="Imghover"></div>
                <div class="changePhoto" v-show="Imghover">更换照片</div>
              </div>
            </div>
          </el-upload>
          <div class="station" v-if="personMessge.faceImgUrl"></div>
        </el-form-item>

        <el-form-item label="姓名：" prop="name">
          <el-input type="text" placeholder="32位字符以内" maxlength="32" v-model.trim="personMessge.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone">
          <el-input type="text" placeholder="11位手机号码" maxlength="11" v-model.trim="personMessge.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别：">
          <el-radio-group v-model="personMessge.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日：">
          <el-date-picker
            v-model="personMessge.birthdayStamp"
            type="date"
            value-format="timestamp"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="人员类型：">
          <div class="pcb__cont">
            <el-select class="popupCont__choose" ref="select" v-model="personMessge.level" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item,index) in issuesList"
                :key="index"
                :label="item.typeValue"
                :value="item.typeNo">
              </el-option>
              <el-option :disabled="true" :value="''"></el-option>
              <div class="popupCont__edit" @click="showPopup">编辑</div>
            </el-select>
          </div>
        </el-form-item>
      </uu-form>
    </div>
    <div class="popup" v-show="popupShow">
      <div class="editProblem">
        <div class="editProblem__title">编辑人员类型</div>
        <div class="editProblem__cont--border f-scrollbar" ref="questionList">
          <div
            class="editProblem__cont"
            v-for="(item,index) in issuesList"
            :key="index">

            <div v-show="show !== index" @mouseover="operationShow(index)" @mouseout="operationHide(index)">
              <span class="cont__title">{{item.typeValue}}</span>
              <span class="fr del" v-show="hover === index" @click="delList(index)">删除</span>
              <span class="fr edit" v-show="hover === index" @click="edit(index,item)">编辑</span>
            </div>

            <div class="edit__border" v-show="show === index">
              <el-input class="f-font-size12" v-model="changeCont" placeholder="请输入问题类型名称" maxlength="12"></el-input>
              <span class="save" @click="save(index)">保存</span>
              <span class="cancel" @click="cancel">取消</span>
            </div>
          </div>
        </div>

        <div class="input__border white">
          <el-input class="add__question f-font-size12" v-model="input" @keyup.enter.native="addList" @blur="emptyInput" placeholder="输入文字，按回车生成人员类型" maxlength="12" v-show="show === ''"></el-input>
        </div>
        <div class="error__message">{{errorMessage}}</div>
        <div class="editProblem__button">
          <div class="button__close button form__button" @click="closePopup">返回</div>
          <div class="button__sure button affirm" @click="surePopup">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {validateRule} from '@/utils/validate'
export default {
  name: 'person',
  data () {
    // 姓名校验规则
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入姓名'))
      } else {
        if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('姓名格式不正确'))
        }
      }
    }
    // 姓名校验规则
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else {
        if (validateRule(value, 6)) {
          callback()
        } else {
          callback(new Error('手机号格式不正确'))
        }
      }
    }
    return {
      rules: {
        name: [{required: true, validator: validateName, trigger: 'blur'}],
        phone: [{required: true, validator: validatePhone, trigger: 'blur'}]
      },
      // 面包屑名称
      titleName: '',
      // 展示问题列表
      popupShow: false,
      // 问题列表
      issuesList: [

      ],
      // 新增问题名称
      input: '',
      // 是否进入编辑状态
      show: '',
      // 按钮显示状态
      hover: '',
      // 修改的内容
      changeCont: '',
      // 错误提示信息
      errorMessage: '',
      // 人员数据
      personMessge: {
        // 展示的图片
        faceImgUrl: '',
        // 姓名
        name: '',
        // 手机号
        phone: '',
        // 性别
        gender: 1,
        // 生日
        birthdayStamp: '',
        // 人员等级
        level: ''
      },
      // hover状态
      Imghover: false,
      // 图片比较宽
      hundredWidth: false

    }
  },
  methods: {
    // 获取问题列表
    getList () {
      let data = {
        memberLibraryGuid: this.$route.query.guid
      }
      this.$http('/memberType/list', data).then(res => {
        if (res.result) {
          this.issuesList = res.data
        }
      })
    },
    // 打开问题列表
    showPopup () {
      this.popupShow = true
      this.$refs.select.blur()
    },
    // 输入问题验证
    checkName (e) {
      if (e === '') {
        this.errorMessage = '问题类型不能为空'
        return false
      }
      for (let i = 0; i < this.issuesList.length; i++) {
        if (e === this.issuesList[i].typeValue) {
          if (i === this.show) {
            return true
          } else {
            this.errorMessage = '问题类型重复'
            return false
          }
        }
      }
      return true
    },
    // 清空输入框
    emptyInput () {
      this.input = ''
      this.errorMessage = ''
    },
    // 添加项
    addList () {
      this.input = this.input.replace(/\s+/g, '')
      if (!this.checkName(this.input)) {
        return false
      }
      this.errorMessage = ''
      let data = {}
      data.typeValue = this.input
      data.memberLibraryGuid = this.$route.query.guid
      this.issuesList.push(data)
      this.input = ''
      this.$nextTick(() => {
        this.$refs.questionList.scrollTop = this.$refs.questionList.scrollHeight
      })
    },
    // 编辑按钮
    edit (e, item) {
      this.errorMessage = ''
      this.show = e
      this.changeCont = item.typeValue
    },
    // 删除按钮
    delList (e) {
      this.$confirm('删除该类型后，相关人员将会解除关联', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.issuesList.splice(e, 1)
      })
    },
    // 退出编辑按钮
    cancel () {
      this.show = ''
      this.errorMessage = ''
    },
    // 保存按钮
    save (e) {
      this.changeCont = this.changeCont.replace(/\s+/g, '')
      if (!this.checkName(this.changeCont)) {
        return false
      }
      this.errorMessage = ''
      let obj = {...this.issuesList[e]}
      obj.typeValue = this.changeCont
      this.issuesList[e] = {
        ...this.issuesList[e],
        ...obj
      }
      this.show = ''
    },
    // hover事件
    operationShow (e) {
      this.hover = e
    },
    // hover事件复位
    operationHide (e) {
      this.hover = ''
    },
    // 列表恢复状态
    recoverState () {
      this.show = ''
      this.input = ''
      this.errorMessage = ''
      this.$refs.questionList.scrollTop = 0
      this.popupShow = false
      this.getList()
    },
    // 确定二级弹出框
    surePopup () {
      let data = {
        memberLibraryGuid: this.$route.query.guid,
        memberTypeList: this.issuesList
      }
      this.$http('/memberType/operate', data).then(res => {
        if (res.result) {
          this.recoverState()
        }
      })
    },
    // 取消二级弹出框
    closePopup () {
      this.recoverState()
    },
    // 图片上传事件
    // 调接口
    avatarUpload (file) {
      let uid = this.$store.state.userInfo.developerId
      let catalog = `member/${uid}`
      let name = (new Date()).valueOf()
      let data = {
        superKey: catalog
      }
      // 获取阿里云oss signature
      this.$http('/auth/oss/image/signature', data).then(res => {
        if (res.data) {
          let formData = new FormData()
          let customName = 'photo_' + name + '.' + (file.file.type.split('/')[1] === 'png' ? 'png' : 'jpg')
          console.log('file name', customName)
          formData.append('key', `${catalog}/${customName}`)
          formData.append('policy', res.data['policy'])
          formData.append('OSSAccessKeyId', res.data['accessid'])
          formData.append('success_action_status', '200')
          formData.append('signature', res.data['signature'])
          formData.append('file', file.file, customName)
          // 构建formData 对象，将图片上传至阿里云oss服务
          axios.post(res.data.host, formData).then(back => {
            if (!back.data) {
              let data = {
                imgUrl: res.data.host + '/member/' + uid + '/' + customName
              }
              this.$http('/member/img/detect', data).then(res => {
                if (res.result) {
                  if (res.data) {
                    this.personMessge.faceImgUrl = data.imgUrl
                  } else {
                    this.$tip('照片中没有检测到人脸')
                  }
                }
              })
            } else {
              this.$tip('上传失败，请稍后重试', 'error')
            }
          }).catch(() => {
            this.$tip('网络异常，请稍后重新尝试', 'error')
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
    },
    // 添加人员
    addPerson () {
      let data = {
        guid: this.$route.query.personId,
        memberLibraryGuid: this.$route.query.guid,
        faceImgUrl: this.personMessge.faceImgUrl,
        name: this.personMessge.name,
        phone: this.personMessge.phone,
        gender: this.personMessge.gender,
        birthday: this.personMessge.birthdayStamp,
        level: this.personMessge.level
      }
      if (this.$route.query.personId) {
        this.$http('/member/update', data).then(res => {
          if (res.result) {
            this.$router.go(-1)
          }
        })
      } else {
        this.$http('/member/create', data).then(res => {
          if (res.result) {
            this.$router.go(-1)
          }
        })
      }
    },
    // 返回上一级
    returnLast () {
      this.$router.go(-1)
    },
    // 删除照片
    colseImg () {
      this.personMessge.faceImgUrl = ''
    },
    // 阻止事件冒泡
    bubbling () {
      console.log(123)
    }
  },
  created () {
    let data = {
      guid: this.$route.query.guid
    }
    this.$http('/memberLibrary/find', data).then(res => {
      if (res.result) {
        this.titleName = res.data.name
      }
    })
    this.getList()
    if (this.$route.query.personId) {
      let data = {
        guid: this.$route.query.personId
      }
      this.$http('/member/details', data).then(res => {
        if (res.result) {
          this.personMessge = res.data
        }
      })
    }
  },
  watch: {
    'personMessge.faceImgUrl' (e) {
      let img = new Image()
      img.src = e
      if (img.width > img.height) {
        this.hundredWidth = true
      } else {
        this.hundredWidth = false
      }
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
    color: #1896E6;
    text-align: center;
    background-image:url("/static/img/input_border_bg@2x.png");
    background-size: 100% 100%;
  }
  .form__position{
    position: relative;
    top: 30%;
  }
  .f-grey{
    color: rgba(255,255,255,0.40);
  }
  .retrun{
    float: left;
    cursor: pointer;
    line-height: 30px;
  }
  .pcb__cont{
    color: #252525;
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;
  }
  .popupCont__choose{
    position: relative;
  }
  .popupCont__edit{
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    border-top: 1px solid  #E1E7EC;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    color: #0F9EE9;
    height: 25px;
    line-height: 25px;
  }
  /* popup */
  .popup{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2000;
  }
  .editProblem{
    padding: 0 30px 0 30px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 360px;
    overflow: hidden;
    background-color: #fff;
  }
  .editProblem__title{
    color: #000;
    margin: 30px 0 20px 0;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .editProblem__cont{
    line-height: 40px;
    height: 40px;
  }
  .editProblem__cont:hover{
    background: #F7F9FA;
  }
  .cont__title{
    color: #333333;
    margin-left: 12px;
  }
  .edit{
    margin-right: 10px;
    cursor: pointer;
    color: #409EFF;
  }
  .del{
    margin-right: 12px;
    cursor: pointer;
    color: #F85650;
  }
  .editProblem__button{
    margin: 20px 0 20px 0;
    text-align: center;
  }
  .button{
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    width: 130px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
  .button__sure{
    color: #FFF;
    background: url(/static/img/affrim_btn_bg.png) no-repeat center;
    background-size: 110% 156%;
    margin-left: 10px;
  }
  .button__close{
    margin-right: 40px;
    border: 1px solid #E1E7EC;
  }
  .edit__border{
    position: relative;
  }
  .save{
    position: absolute;
    top: 0;
    right: 46px;
    cursor: pointer;
    color: #409EFF;
  }
  .cancel{
    position: absolute;
    top: 0;
    right: 12px;
    cursor: pointer;
    color: #F85650;
  }
  .add__question{
    margin-top: 5px;
  }
  .error__message{
    text-align: center;
    height: 16px;
    color: red;
  }
  .input__border{
    height: 45px;
  }
  .editProblem__cont--border{
    max-height: 200px;
    overflow-y: auto;
  }
  .f-balck{
    color: #000 !important;
  }
  .avatar{
    margin: 0 auto;
    height: 100px;
  }
  .avatar__border{
    position: absolute;
    bottom: 0;
    width: 222px;
    height: 120px;
    background: #333333;
    border-radius: 2px;
  }
  .station{
    height: 70px;
  }
  .img__border{
    border: 1px dashed #FFF;
    position: relative;
    margin: 10px  auto 0 auto;
    width: 100px;
    height: 100px;
  }
  .img__close{
    cursor: pointer;
    color: #FF6660;
    font-size: 20px;
    position: absolute;
    right: 2px;
    top: 2px;
  }
  .changePhoto{
    z-index: 5;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    height: 28px;
    line-height: 28px;
    opacity: 0.8;
    background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
  }
  .hundredWidth{
    width: 100px;
    height: auto;
  }
</style>

<style>
  .menber .avatar-uploader{
    overflow: visible;
  }
</style>
