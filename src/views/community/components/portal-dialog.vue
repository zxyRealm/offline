/*
* 出入口添加编辑弹框表单
* @author  张晓元
* @date    2019-05-17
*/
<template>
  <el-dialog
    width="560px"
    :title="title"
    :visible.sync="visibleDialog"
  >
    <el-form
      class="g-form-center"
      ref="portalForm"
      label-width="80px"
      label-position="left"
      :rules="portalRules"
      :model="portalForm">
      <el-form-item label="类型" prop="portalType">
        <el-select
          v-model="portalForm.portalType"
          placeholder="请选择类型"
          :disabled="!!defaultPortalType"
          @change="handleTypeChange">
          <el-option :value="1" label="外部出入口"></el-option>
          <el-option :value="2" label="内部出入口"></el-option>
          <el-option :value="3" label="通道"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="portalName">
        <el-input v-model.trim="portalForm.portalName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item
        v-if="portalForm.portalType && portalForm.portalType !== 3"
        label="标签"
        prop="tag">
        <el-radio-group v-model="portalForm.tag">
          <el-radio
            v-for="tag in tagList(portalForm.portalType)"
            :label="tag.value">{{tag.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="visibleDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitPortalForm">{{confirmButtonText}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { tagListByType } from '@/config/portal'
import { validateRule } from '@/utils/validate'
import {
  addPortal,
  updatePortal,
  getPortalNameIsExist
} from '@/api/community'
export default {
  name: 'portal-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    defaultPortalType: {
      type: Number,
      default: null
    }
  },
  data () {
    const validName = (rule, value, callback) => {
      let _this = this
      if (!value) {
        callback(new Error('请输入名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          let param = {
            portal: value,
            groupGuid: _this.currentManage.groupGuid
          }
          getPortalNameIsExist(param).then((res) => {
            !res.data ? callback() : callback(new Error('出入口名称已存在'))
          }).catch((err) => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    return {
      visibleDialog: false,
      portalForm: {
        portalType: '',
        tag: null,
        portalName: ''
      },
      portalRules: {
        portalName: [
          { required: true, validator: validName, trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '请选择标签', trigger: 'blur' }
        ],
        portalType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.visibleDialog = this.visible
    this.copyFormData()
  },
  computed: {
    ...mapState(['currentManage']),
    actionType () {
      return this.data.tag && this.data.portalName ? 'edit' : 'add'
    },
    confirmButtonText () {
      return this.actionType === 'edit' ? '保 存' : '添 加'
    },
    title () {
      let text = ''
      switch (this.actionType) {
        case 'edit':
          text = '编辑'
          break
        default:
          text = '添加'
          break
      }
      switch (this.defaultPortalType){
        case 1:
          text += '外部出入口'
          break
        case 2:
          text += '内部出入口'
          break
        case 3:
          text += '通道'
          break
        default:
          text = '添加出入口通道'
      }

      return text
    }
  },
  methods: {
    // 拷贝data参数给form
    copyFormData () {
      this.portalForm = Object.assign(this.portalForm, this.data)
    },
    // 标签列表
    tagList (type) {
      return tagListByType(type)
    },
    // portalType 变化时处理
    handleTypeChange (val) {
      if (val === 3) {
        this.portalForm.tag = null
      }
    },
    // 提交出入口 表单
    submitPortalForm () {
      console.log('form data -------------', this.portalForm)
      this.$refs.portalForm.validate((valid) => {
        if (valid) {
          let { portalType, tag, portalName, guid, groupGuid } = this.portalForm
          let params = {
            groupGuid,
            guid,
            portalType,
            tag,
            portalName
          }
          let apiObj = {
            add: addPortal,
            edit: updatePortal
          }
          apiObj[this.actionType](params).then(() => {
            // this.$tip()
            this.$emit('handle-success')
          })
        }
      })
    }
  },
  watch: {
    data: {
      handler () {
        this.copyFormData()
      },
      deep: true
    },
    visible (val){
      this.visibleDialog = val
    },
    visibleDialog (val) {
      this.$emit('update:visible', val)
      if (!val) {
        this.$nextTick(() => {
          this.$refs.portalForm.resetFields()
        })
      }
    },
    defaultPortalType: {
      handler (val) {
        if (val) {}
        this.portalForm.portalType = val
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>