<template>
  <div>
    <div class="f-secondary-title">
      <i class="iconfont icon-fanhui f-margin-right10 f-link" @click="$router.back(-1)"></i>
      <span class="title">{{isEdit ? '编辑人员' : '新增人员'}}</span>
    </div>
    <div class="form__box">
      <el-form label-position="left" label-width="80px" :model="person.form" ref="personRef" :rules="person.rules">
        <el-form-item label="照片" prop="faceImgUrls">
          <el-upload
            action=""
            v-if="!person.form.faceImgUrls.length"
            :http-request="handlePhotoUpload"
            :before-upload="beforePhotoUpload"
            class="form__photo form__photo--none"
            :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon photo__icon f-blue"></i>
            <p class="f-gray">（400KB以内）</p>
          </el-upload>
          <div v-else class="form__photo form__photo--have">
            <div :class="[{ 'f-margin-right15': index < person.form.faceImgUrls.length - 1 }]"
                 v-for="(item, index) in person.form.faceImgUrls"
                 :key="index"
                 @mouseenter="item.showClose = true"
                 @mouseleave="item.showClose = false">
              <img :src="item.imageUrl" alt="" height="70" width="70">
              <i class="el-icon-close f-link f-red close__icon" v-show="item.showClose" @click="handlePersonPhotoDelete"></i>
            </div>
            <el-upload
              action=""
              class="upload__button"
              :http-request="handlePhotoUpload"
              :before-upload="beforePhotoUpload"
              v-if="person.form.faceImgUrls.length < 3"
              :show-file-list="false">
              <i class="el-icon-plus avatar-uploader-icon photo__icon f-blue"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="personName">
          <el-input v-model.trim="person.form.personName" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="person.form.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="人员类型" prop="personType">
          <el-select v-model="person.form.personType"
                     placeholder="请选择人员类型"
                     size="small"
                     :popper-class="selectPopperClass"
                      @visible-change="handleSelectChange"
                     class="f-margin-right20">
            <el-option
              v-for="item in personTypeList"
              :key="item.id"
              :label="item.typeValue"
              :class="[{'option__edit': item.isUpdate, 'option__error': item.isError}]"
              @mouseenter.native="item.isHover = true"
              @mouseleave.native="item.isHover = false"
              :disabled="item.isUpdate || item.isDelete"
              :value="item.id">
              <div class="fl option__value">
                <el-input v-if="item.isUpdate" v-model="optionName" size="small" ref="personTypeOptionRef"></el-input>
                <span class="fl" v-else>{{ item.typeValue }}</span>
              </div>
              <span class="fr option__icon--edit" v-show="item.isHover && !item.isUpdate && !item.isDelete">
                <i class="iconfont icon-bianji f-margin-right10 f-deep-gray" @click.stop="handleOptionShowUpdate(item)"></i>
                <i class="iconfont icon-guanbi f-red" @click.stop="handleOptionShowDelete(item)"></i>
              </span>
              <span class="option__icon--edit" v-if="item.isUpdate || item.isDelete">
                <span class="f-margin-right10 f-link f-deep-gray" @click.stop="handleOptionCancel(item)">取消</span>
                <span class="f-link f-blue" @click.stop="handleOptionUpdate(item)" v-show="item.isUpdate">确定</span>
                <span class="f-link f-red" @click.stop="handleOptionDelete(item)" v-show="item.isDelete">删除</span>
              </span>
            </el-option>
            <div :class="['option-add__input', {'add__error': optionAdd.isError}]" v-if="optionAdd.isAdd">
              <el-input size="small" v-model="optionNameAdd" ref="optionAddInput"></el-input>
              <span class="f-margin-right10 f-link f-deep-gray" @click.stop="handleOptionCancel()">取消</span>
              <span class="f-link f-blue" @click.stop="handleOptionUpdate()">确定</span>
            </div>
            <div class="f-center option-add__button" @click="handleOptionAdd">
              <i class="iconfont icon-xinzeng f-blue"></i>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="person.form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="person.form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="$router.back(-1)">取消</el-button>
          <el-button size="small" v-if="!isEdit" type="primary" plain @click="handlePersonSubmit('next')">保存并下一个</el-button>
          <el-button size="small" type="primary" @click="handlePersonSubmit()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateRule } from '../../utils/validate'
import {
  judgePhone,
  getPersonById,
  uploadAndDetection,
  createPersonType,
  deletePersonType,
  updatePersonType,
  getPersonTypeList,
  updatePerson,
  createPerson
} from '../../api/member'

export default {
  name: 'person',
  data () {
    // 姓名校验规则
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入姓名'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('仅限汉字/字母/数字/空格'))
        }
      }
    }
    // 手机号校验规则
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (value.length !== 11) {
          callback(new Error('请输入11位手机号'))
        } else if (!/^[\d]{11}$/.test(value)) {
          callback(new Error('仅限数字'))
        } else if (!validateRule(value, 6)) {
          callback(new Error('非运营号段'))
        } else if (this.person.form.originPhone === value) {
          callback()
        } else {
          judgePhone({ phone: value, memberLibraryGuid: this.$route.query.guid }).then(res => {
            !res.data ? callback(new Error('手机号重复')) : callback()
          }).catch(err => {
            callback(err.msg || '验证失败')
          })
        }
      } else {
        callback()
      }
    }
    return {
      /* 1.3版本 */
      person: {
        form: {
          faceImgUrls: [],
          personName: '',
          phone: null,
          personType: null,
          gender: null,
          birthday: ''
        },
        rules: {
          personName: [{ required: true, validator: validateName, trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ]
        }
      },
      personTypeList: [],
      optionName: '',
      optionAdd: {
        isAdd: false,
        isError: false
      },
      optionNameAdd: ''
    }
  },
  methods: {
    getPersonTypeList () {
      getPersonTypeList({ memberLibraryGuid: this.$route.query.guid }).then(res => {
        this.personTypeList = res.data
        this.personTypeList.forEach((item) => {
          this.$set(item, 'isHover', false)
          this.$set(item, 'isUpdate', false)
          this.$set(item, 'isDelete', false)
        })
      })
    },
    // 照片点击删除
    handlePersonPhotoDelete () {

    },
    // 自定义图片上传事件
    handlePhotoUpload (file) {
      let formData = new FormData()
      formData.append('file', file.file)
      uploadAndDetection(formData).then(res => {
        this.person.form.faceImgUrls.push({
          imageUrl: res.data.imageUrl,
          showClose: false
        })
      })
    },
    // 图片上传前
    beforePhotoUpload (file) {
      if (!(/\w+(.png|.jpg|.jpeg)$/).test(file.name)) {
        this.$message.error('格式有误')
        return false
      }
      if (file.size >= 400 * 1024) {
        this.$message.error('图片大小请勿超过400KB！')
        return false
      }
      return true
    },
    // 单个人员信息查询
    getPersonById () {
      if (this.isEdit) {
        const param = {
          personId: this.isEdit,
          personLibraryId: this.guid
        }
        getPersonById(param).then((res) => {
          res.data.originPhone = JSON.parse(JSON.stringify(res.data.phone))
          let { personName, phone, personType, gender, birthday, originPhone } = res.data
          res.data.personImageUrls.forEach((item) => {
            this.$set(item, 'showClose', false)
          })
          this.person.form = { personName, phone, personType, gender, birthday, originPhone }
          this.$set(this.person.form, 'faceImgUrls', res.data.personImageUrls)
        })
      }
    },
    // 新增点击确定
    handlePersonSubmit (next = null) {
      this.$refs.personRef.validate(valid => {
        if (valid) {
          let param, func, msg
          let { faceImgUrls, personName, phone, personType, gender, birthday } = this.person.form
          param = { faceImgUrls, personName, phone, personType, gender, birthday }
          if (this.isEdit) {
            this.$set(param, 'personId', this.isEdit)
            func = updatePerson
            msg = '编辑成功'
          } else {
            func = createPerson
            msg = '新增成功'
          }
          this.$set(param, 'personLibraryId', this.guid)
          param.faceImgUrls = param.faceImgUrls.map(item => item.imageUrl)
          func(param).then(() => {
            this.$message.success(msg)
            if (next) {
              this.$refs.personRef.resetFields()
            } else {
              this.$router.back(-1)
            }
          })
        }
      })
    },
    /**
    * 自定义下拉选项
    * */
    handleOptionShowUpdate (row) {
      // const haveUpdating = this.person.personTypeList.some((item) => {
      //   return item.isUpdate || item.isDelete
      // })
      this.initList()
      this.optionName = row.typeValue
      row.isUpdate = true
      this.optionAdd.isError = false
      this.optionAdd.isAdd = false
      this.$nextTick(() => {
        this.$refs[`personTypeOptionRef`][0].focus()
      })
    },
    handleOptionShowDelete (row) {
      this.initList()
      row.isDelete = true
      this.optionAdd.isError = false
      this.optionAdd.isAdd = false
    },
    handleOptionCancel (row = null) {
      if (row) {
        row.isUpdate = false
        row.isDelete = false
      } else {
        this.optionNameAdd = ''
        this.optionAdd.isAdd = false
        this.optionAdd.isError = false
      }
    },
    handleOptionUpdate (row = null) {
      let fun, field, msg, ref, _thisRow
      if (row) {
        fun = updatePersonType
        field = 'optionName'
        msg = '保存成功'
        ref = 'personTypeOptionRef'
        _thisRow = row
      } else {
        fun = createPersonType
        field = 'optionNameAdd'
        msg = '新增成功'
        ref = 'optionAddInput'
        _thisRow = this.optionAdd
      }
      if (this[field] && this[field].length <= 32) {
        _thisRow.isError = false
        const param = {
          memberLibraryGuid: this.guid,
          typeValue: this[field]
        }
        fun(param).then(() => {
          this.handleOptionCancel(row)
          this.getPersonTypeList()
          this.$message.success(msg)
        })
      } else {
        _thisRow.isError = true
        if (row) {
          this.$refs[ref][0].focus()
        } else {
          this.$refs[ref].focus()
        }
      }
    },
    handleOptionDelete (row) {
      const param = {
        id: row.id
      }
      deletePersonType(param).then(() => {
        this.handleOptionCancel(row)
        this.getPersonTypeList()
        this.$message.success('删除成功')
      })
    },
    // 当下拉框收起的时候就将筛选项初始化
    handleSelectChange (val) {
      if (!val) {
        this.initList()
      }
    },
    handleOptionAdd () {
      if (!this.optionAdd.isAdd) {
        this.initList()
        this.optionAdd.isAdd = true
        this.$nextTick(() => {
          this.$refs.optionAddInput.focus()
        })
      }
    },
    initList () {
      this.personTypeList.forEach((item) => {
        this.$set(item, 'isHover', false)
        this.$set(item, 'isUpdate', false)
        this.$set(item, 'isDelete', false)
        this.$set(item, 'isError', false)
      })
    }
  },
  created () {
    this.getPersonTypeList()
    this.getPersonById()
  },
  watch: {},
  computed: {
    isEdit () {
      return this.$route.query.personId || null
    },
    guid () {
      return this.$route.query.guid || null
    },
    // 由于popper-class写一般class的动态写法会报 expected String错误
    selectPopperClass () {
      if (this.optionAdd.isAdd) {
        return 'multi-function__option multi-function__option--add'
      } else {
        return 'multi-function__option'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .form__photo{
    height: 120px;
    width: 280px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #F0F0F0;
    &.form__photo--none{
      text-align: center;
      padding: 22px 0;
      cursor: pointer;
    }
    &.form__photo--have{
      padding: 24px 19px;
      .upload__button{
        line-height: 70px;
        padding: 0 15px 0 25px;
      }
    }
    .photo__icon{
      font-size: 40px;
      font-weight: bold;
    }
    >div{
      display: inline-block;
      vertical-align: middle;
      height: 70px;
      position: relative;
      .close__icon{
        position: absolute;
        right: 2px;
        top: 2px;
      }
    }
  }
  .form__box{
    width: 365px;
    margin-left: 50px;
    /deep/ .el-input, /deep/ .el-textarea{
      width: 280px;
    }
    /deep/ .el-textarea__inner{
      resize: none;
    }
  }
</style>
