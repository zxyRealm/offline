/*
* @author  张晓元
* @date    2019-04-27
*/
<template>
  <div>
    <el-form
      ref="communityForm"
      style="width: 380px"
      label-position="left"
      label-width="82px"
      :class="{center: center}"
      :model="communityForm"
      :rules="communityRules"
    >
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入社群名称" v-model.trim="communityForm.name"></el-input>
      </el-form-item>
      <el-form-item
        v-if="type === 'market'"
        label="业态"
        prop="defaultIndustry"
        class="industry-form-item">
        <el-radio-group v-model="communityForm.defaultIndustry">
          <el-radio :label="true">默认业态</el-radio>
          <el-radio :label="false">自定义业态</el-radio>
        </el-radio-group>
        <div
          class="industry-label--wrap"
          v-show="communityForm.defaultIndustry">
          {{typeText}}：
          <span v-for="(item, $index) in industryList" :key="$index">
            {{$index ? '、' : ''}}{{item.industryName}}
          </span>
          <i
            v-show="communityForm.defaultIndustry === false"
            class="iconfont icon-bianji"
            @click="() => { customWrapVisible = true }">
          </i>
        </div>
        <!--自定义业态popper框-->

        <div
          class="custom-industry--wrap"
          v-show="customWrapVisible">
          <!--<el-alert-->
          <!--v-if="customErrorText"-->
          <!--type="error"-->
          <!--:title="customErrorText"-->
          <!--:closable="false"-->
          <!--&gt;-->
          <!--</el-alert>-->
          <el-scrollbar :class="scrollClass">
            <el-form
              ref="customIndustry"
              :show-message="false"
              :model="customIndustry"
            >
              <el-form-item
                v-for="(item, index) in customIndustry.industry"
                :key="index"
                :prop="'industry.' + index + '.industryName'"
                :rules="validCustomIndustry()"
              >
                <el-input v-model.trim="item.industryName">
                  <i slot="suffix" class="iconfont icon-guanbi" @click="removeCustomIndustry(index)"></i>
                </el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>

          <div class="add-btn">
            <i class="iconfont icon-xinzeng" @click="addCustomIndustry"></i>
          </div>
          <div class="handler-wrap">
            <span class="handle-btn" @click="customWrapVisible = false">取消</span>
            <span class="handle-btn primary" @click="submitCustomForm('customIndustry')">保存</span>
          </div>
        </div>

      </el-form-item>
      <el-form-item
        label="地区"
        prop="pca"
      >
        <area-select
          placeholder="请选择地区"
          v-model="communityForm.pca"
        >
        </area-select>
      </el-form-item>
      <el-form-item
        prop="address">
        <el-input
          type="text"
          placeholder="请输入详细地址"
          v-model.trim="communityForm.address"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input
          type="text" placeholder="请输入联系人"
          v-model.trim="communityForm.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          type="text" placeholder="请输入联系电话"
          v-model.trim="communityForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submitForm">{{confirmButtonText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateRule, validPhone, validateContact } from '@/utils/validate'
import { validateCommunityName } from '../utils'
import {
  getManageNameIsExist,
  updateManageCommunity,
  addManageCommunity,
  getIndustryList,
  getMemberInfo,
  getManageInfo
} from '@/api/community'

export default {
  name: 'CommunityBase',
  data () {
    const validIndustry = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择业态'))
      } else if (value === 1 && !this.industryList.length) {
        callback(new Error('请添加自定义业态'))
      } else {
        callback()
      }
    }
    return {
      customWrapVisible: false,
      customIndustry: { // 动态表单绑定值业态列表
        industry: []
      },
      customErrorText: '', // 自定义业态form 错误提示信息
      industryList: [],
      communityForm: {
        name: '',
        pca: '',
        address: '',
        contacts: '',
        phone: '',
        defaultIndustry: ''
      },
      communityRules: {
        name: [
          { required: true, validator: validateCommunityName, trigger: 'blur', valueType: 'manage' }
        ],
        pca: [
          { required: true, message: '请选取地区', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { max: 128, message: '请输入1-128位字符', trigger: 'blur' }
        ],
        contacts: [
          { validator: validateContact, trigger: 'blur' }
        ],
        phone: [
          { validator: validPhone, trigger: 'blur' }
        ],
        defaultIndustry: [
          { required: true, validator: validIndustry, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    type: { // 社群类型
      type: String,
      default: ''
    },
    actionType: { // 行为类型 add / edit
      type: String,
      default: 'add'
    },
    center: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '保存'
    },
    visible: { // form 表单的可见状态
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeText () {
      switch (this.communityForm.industry) {
        case 1:
          return '自定义'
        default:
          return '默认'
      }
    },
    scrollClass () {
      return this.customIndustry.industry.length > 6 ? 'scroll-height' : 'hidden'
    },
    communityType () {
      let type = 1
      switch (this.type) {
        case 'chain':
          type = 3
          break
        case 'store':
          type = 2
          break
        default:
          type = 1
          break
      }
      return type
    }
  },
  mounted () {
    if (this.actionType === 'edit') {
      this.communityForm = { ...this.data }
    }
  },
  methods: {

    // 提交表单
    submitForm () {
      if (this.type === 'market')this.submitCustomForm('customIndustry')
      this.$refs.communityForm.validate((valid) => {
        if (valid) {
          let { name, pca, address, contacts, phone, defaultIndustry } = { ...this.communityForm }
          let pcaList = pca.split(',')
          let params = {
              name,
              type: this.communityType,
              phone,
              address,
              contacts,
              provinceCode: pcaList[0],
              cityCode: pcaList[1],
              districtCode: pcaList[2],
              merchantGuid: this.$cookie().get('user_uuid')
            }
          if (this.type === 'market') {
            params = {
              ...params,
              defaultIndustry,
              industryInfo: !defaultIndustry ? { ...this.industryList } : []
            }
          }
          addManageCommunity(params).then(() => {
            this.$emit('handle-success', this.type)
          })
        }
      })
    },
    // 处理取消按钮事件
    handleCancel () {
      this.$emit('handle-cancel', 'baseForm')
    },
    // 清除form表单校验，重置表单
    resetFields () {
      this.$refs.communityForm.resetFields()
    },
    // 添加自定义业态
    addCustomIndustry () {
      this.$refs.customIndustry.validate((valid) => {
        if (valid) this.customIndustry.industry.push({ industryName: '', industryId: null })
      })
    },
    // 移除自定义业态
    removeCustomIndustry (index) {
      let len = this.customIndustry.industry.length
      if (len) {
        if (len === 1) this.customErrorText = '请添加自定义业态'
        this.customIndustry.industry.splice(index, 1)
      }
    },
    // 校验自定义业态
    validCustomIndustry () {
      let valid = (rule, value, callback) => {
        if (value) {
          this.customErrorText = ''
          if (value.length > 32) {
            callback(new Error('请输入1-32位字符'))
          } else if (validateRule(value, 1)) {
            callback()
          } else {
            callback(new Error('仅限汉字/字母/数字/空格'))
          }
        } else {
          this.customErrorText = '请输入业态名'
          callback(new Error(''))
        }
      }
      return [
        { required: true, validator: valid, trigger: ['blur', 'focus'] }
      ]
    },

    // 保存自定义业态列表
    submitCustomForm (formName) {
      let len = this.customIndustry.industry.length
      // if (!len) {
      //   this.customErrorText = '请添加自定义业态'
      //   return false
      // }
      console.log('formName', formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.customWrapVisible = false
          this.industryList = this.customIndustry.industry.filter(item => item.industryName)
        }
      })
    }
  },
  watch: {
    'communityForm.defaultIndustry': {
      handler (val) {
        switch (val) {
          case true:
            this.customWrapVisible = false
            getIndustryList({ groupGuid: 'default' }).then((res) => {
              this.industryList = res.data
            })
            break
          case false:
            if (this.actionType === 'edit') {
              getIndustryList({ groupGuid: this.data.groupGuid }).then((res) => {
                this.customIndustry.industry = res.data
                this.customWrapVisible = !this.customIndustry.industry.length
                this.industryList = this.customIndustry.industry.filter(item => item.industryName)
              })
            } else {
              this.customWrapVisible = !this.customIndustry.industry.length
              this.industryList = this.customIndustry.industry.filter(item => item.industryName)
            }
            break
        }
      },
      immediate: true
    },
    visible (val) {
      if (val && this.actionType === 'edit') {
        this.communityForm = JSON.parse(JSON.stringify(this.data))
      }
      if (!val) this.customWrapVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-form.center {
    margin: auto;
  }

  .scroll-height {
    height: 219px;
  }

  .industry-label--wrap {
    padding: 8px 26px;
    line-height: 22px;
    background: #F7F7F7;
    border-radius: 2px;
    color: #999;
    .icon-bianji {
      display: inline-block;
      vertical-align: top;
      color: $theme-blue;
      cursor: pointer;
    }
  }

  /*编辑自定义业态popper框样式  */

  .industry-form-item {
    .el-form-item__content {
      position: relative;
    }
  }

  .custom-industry--wrap {
    position: absolute;
    top: 36px;
    left: 0;
    z-index: 99;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.10);
    border-radius: 2px;
    .el-alert {
      line-height: 1;
    }
    .iconfont {
      cursor: pointer;
    }
    .add-btn {
      padding: 0 10px;
      border-bottom: 1px solid #f0f0f0;
      color: $theme-blue;
      box-sizing: border-box;
    }
    .handler-wrap {
      text-align: center;
      .handle-btn {
        padding: 5px 22px;
      }
    }
    .handle-btn {
      cursor: pointer;
      color: #C0C4CC;
      &.primary {
        color: $theme-blue;
      }
    }
  }

</style>

<style lang="scss">
  .custom-industry--wrap {
    .el-alert__content {
      padding: 0;
    }
    .el-form-item {
      .el-input__inner {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid #f0f0f0;
      }
      .el-input {
        .el-input__suffix {
          display: none;
        }
        &:hover {
          .el-input__suffix {
            display: inline-block;
          }
          .el-input__inner {
            border-bottom: 1px solid $theme-blue;
          }
        }
      }
      &.is-error {
        .el-input__inner {
          border-bottom: 1px solid #f85650;
        }
      }
    }
  }
</style>
