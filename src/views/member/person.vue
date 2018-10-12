<template>
  <div class="menber">
    <div class="member__title">
        <div class="el-icon-arrow-left retrun"></div>
      <el-breadcrumb separator="/" class="fl">
        <el-breadcrumb-item :to="{ path: '/member' }">人员管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/member/person' }">添加人员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="member__form">
      <uu-form
        class="form__position"
        ref="userInfoForm"
        form-class="user-info-form"
        @handle-submit="addPerson"
        :subText="'保存'">

        <el-form-item label="照片：" prop="phone">
          <el-upload
            v-show="!personMessge.faceImgUrl"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="avatarUpload"
            :before-upload="beforeAvatarUpload">
            <div class="form__button">添加<span class="f-grey">（400Kb以内）</span></div>
          </el-upload>
          <div v-if="personMessge.faceImgUrl" class="avatar__border">
            <img :src="personMessge.faceImgUrl" class="avatar">
          </div>
          <div class="station" v-if="personMessge.faceImgUrl"></div>
        </el-form-item>

        <el-form-item label="姓名：" prop="company">
          <el-input type="text" placeholder="32位字符以内" v-model="personMessge.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="company">
          <el-input type="text" placeholder="11位手机号码" v-model="personMessge.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别：" prop="company">
          <el-radio-group v-model="personMessge.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日：" prop="company">
          <el-date-picker
            v-model="personMessge.birthday"
            type="date"
            value-format="timestamp"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="人员类型：" prop="company">
          <div class="pcb__cont">
            <el-select class="popupCont__choose" ref="select" v-model="personMessge.level" filterable clearable placeholder="请选择操作类型">
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
        <div class="editProblem__title">编辑问题类型</div>
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

        <div class="input__border">
          <el-input class="add__question f-font-size12" v-model="input" @keyup.enter.native="addList" @blur="emptyInput" placeholder="输入文字，按回车生成问题类型" maxlength="12" v-show="show === ''"></el-input>
        </div>
        <div class="error__message">{{errorMessage}}</div>
        <div class="editProblem__button">
          <div class="button__close button form__button" @click="closePopup">返回</div>
          <div class="button__sure button" @click="surePopup">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'person',
  data () {
    return {
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
        birthday: '',
        // 人员等级
        level: ''
      }

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
      this.$confirm('删除该问题后，历史记录都会被清空', {
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
              this.personMessge.faceImgUrl = res.data.host + '/member/' + uid + '/' + customName
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
        birthday: this.personMessge.birthday,
        level: this.personMessge.level
      }
      if (this.$route.query.personId) {
        this.$http('/member/update', data).then(res => {
          if (res.result) {
            this.recoverState()
          }
        })
      } else {
        this.$http('/member/create', data).then(res => {
          if (res.result) {
            this.recoverState()
          }
        })
      }
    }
  },
  created () {
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
    background: #0F9EE9;
  }
  .button__close{
    margin-left: 8px;
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
    margin: 10px  auto 0 auto;
    width: 100px;
    height: 100px;
  }
  .avatar__border{
    position: absolute;
    bottom: 0px;
    width: 222px;
    height: 120px;
    background: #333333;
    border-radius: 2px;
  }
  .station{
    height: 70px;
  }
</style>
