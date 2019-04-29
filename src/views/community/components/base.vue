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
      :model="communityForm"
      :rules="communityRules"
    >
      <el-form-item label="名称：" prop="name">
        <el-input placeholder="请输入社群名称" v-model.trim="communityForm.name"></el-input>
      </el-form-item>
      <el-form-item
        v-if="type === 'market'"
        label="业态"
        prop="industry"
        class="industry-form-item">
        <el-radio-group v-model="communityForm.industry">
          <el-radio :label="0">默认业态</el-radio>
          <el-radio :label="1">自定义业态</el-radio>
        </el-radio-group>
        <div class="industry-label--wrap" v-show="communityForm.industry !== ''">
          {{typeText}}：
          <span v-for="(item, $index) in industryList" :key="$index">
            {{$index ? '、' : ''}}{{item.label}}
          </span>
          <i
            v-show="communityForm.industry === 1"
            class="iconfont icon-bianji"
            @click="() => { customWrapVisible = true }">
          </i>
        </div>
        <!--自定义业态popper框-->

        <div class="custom-industry--wrap" v-show="customWrapVisible">
          <!--<el-alert-->
            <!--v-if="customErrorText"-->
            <!--type="error"-->
            <!--:title="customErrorText"-->
            <!--:closable="false"-->
          <!--&gt;-->
          <!--</el-alert>-->
          <el-form
            ref="customIndustry"
            :show-message="false"
            :model="customIndustry"
          >
            <el-form-item
              v-for="(item, index) in customIndustry.industry"
              :key="index"
              :prop="'industry.' + index + '.label'"
              :rules="validCustomIndustry()"
            >
              <el-input v-model.trim="item.label">
                <i slot="suffix" class="iconfont icon-guanbi" @click="removeCustomIndustry(index)"></i>
              </el-input>
            </el-form-item>
          </el-form>

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
        label="地区："
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
      <el-form-item label="联系人：" prop="contacts">
        <el-input
          type="text" placeholder="请输入联系人"
          v-model.trim="communityForm.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input
          type="text" placeholder="请输入联系电话"
          v-model.trim="communityForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$backPrev()">取消</el-button>
        <el-button type="primary" @click="submitForm">{{type === 'chain' ? '保存' : '下一步'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AreaSelect from '@/components/area-select/area-select'
import { validateRule, validPhone } from '@/utils/validate'
import { CheckGroupNameExist } from '../../../api/community'

export default {
  name: 'CommunityBase',
  components: {
    AreaSelect
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          CheckGroupNameExist({ name: value }).then((res) => {
            !res.data ? callback() : callback(new Error('社群名称已存在'))
          }).catch((err) => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    const validateContact = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback()
      }
    }
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
      customIndustry: {
        industry: []
      },
      customErrorText: '', // 自定义业态form 错误提示信息
      // industryList: [
      //   { label: '百货', type: 1 },
      //   { label: '餐饮', type: 2 },
      //   { label: '娱乐', type: 3 },
      //   { label: '零售', type: 4 },
      //   { label: '儿童', type: 5 },
      //   { label: '生活配套', type: 6 },
      //   { label: '快时尚', type: 7 }
      // ],
      industryList: [],
      communityForm: {
        name: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        pca: '',
        address: '',
        contacts: '',
        phone: '',
        industry: ''
      },
      communityRules: {
        name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        provinceId: '',
        cityId: '',
        areaId: '',
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
        industry: [
          { required: true, validator: validIndustry }
        ]
      }
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    typeText () {
      switch (this.communityForm.industry) {
        case 0:
          return '默认'
        case 1:
          return '自定义'
      }
    }
  },
  methods: {
    submitForm () {
      this.submitCustomForm()
      this.$refs.communityForm.validate((valid) => {
        if (valid) {
          this.$emit('handle-success', this.type)
        }
      })
    },
    // 添加自定义业态
    addCustomIndustry () {
      this.$refs.customIndustry.validate((valid) => {
        if (valid) this.customIndustry.industry.push({ label: '' })
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
    submitCustomForm () {
      let len = this.customIndustry.industry.length
      // if (!len) {
      //   this.customErrorText = '请添加自定义业态'
      //   return false
      // }
      this.$refs.customIndustry.validate((valid) => {
        if (valid) {
          this.customWrapVisible = false
          this.industryList = this.customIndustry.industry.filter(item => item.label)
        }
      })
    }
  },
  watch: {
    'communityForm.industry': {
      handler (val) {
        switch (val) {
          case 0:
            this.customWrapVisible = false
            this.industryList = [
              { label: '百货', type: 1 },
              { label: '餐饮', type: 2 },
              { label: '娱乐', type: 3 },
              { label: '零售', type: 4 },
              { label: '儿童', type: 5 },
              { label: '生活配套', type: 6 },
              { label: '快时尚', type: 7 }
            ]
            break
          case 1:
            this.customWrapVisible = !this.customIndustry.industry.length
            this.industryList = this.customIndustry.industry.filter(item => item.label)
            break
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

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
  @import '../../../styles/variables';

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
