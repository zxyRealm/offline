<template>
  <el-dialog
    :type="type"
    center
    :lock-scroll="false"
    top="auto"
    @close="closeDialog"
    class="dialog-form-wrapper vam"
    :width="width"
    :title="title"
    :visible.sync="dialogFormVisible">
    <div
      class="mc"
      v-if="type==='group'"
      :style="customStyle"
    >
      <ob-group-nav
        :filter="filter"
        v-model="optionsGroup"
        ref="customGroup"
        :show-checkbox="true"
        node-key="uniqueKey"
        is-disabled
        :multiple="multiple"
        :disabled-keys="disabledKeys"
        theme="white"
        type="custom"
      ></ob-group-nav>
    </div>
    <template v-if="$slots.form">
      <slot name="form"></slot>
    </template>
    <template v-else-if="$slots.content">
      <slot name="content"></slot>
    </template>
    <el-form
    block-message
    style="width: 330px"
    label-position="left"
    class="common-form white"
    ref="dialogForm"
    :rules="rules"
    :model="dialogForm"
    v-else>
      <template v-if="type==='apply'">
        <el-form-item label="申请理由：" :label-width="formLabelWidth" prop="intro">
          <el-input type="textarea" v-model.trim="dialogForm.intro" placeholder="请输入申请理由"
        auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" v-if="showButton && !$slots.footer" class="dialog-footer">
      <el-button class="cancel" @click="dialogFormVisible = false">返 回</el-button>
      <el-button class="affirm" type="primary" @click="submitDialogForm('dialogForm')">确 定</el-button>
    </div>
    <div slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>
<script>
import Group from '@/components/group-nav'
import {uniqueKey} from '@/utils'
import {validateRule} from '@/utils/validate'

export default {
  components: {
    'ob-group-nav': Group
  },
  name: 'ob-dialog-form',
  props: {
    // 社群列表数据
    group: {
      type: [Array, Object],
      default: () => []
    },
    value: {
      type: [Object],
      default: () => ({})
    },
    type: { // group 自定义分组添加社群/控制台选择社群 community 绑定社群 device 添加设备 apply 申请开发者
      type: [String],
      default: 'device'
    },
    options: {
      type: [Object],
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formLabelWidth: {
      type: [Number, String],
      default: '90px'
    },
    width: {
      type: [Number, String],
      default: '500px'
    },
    multiple: { // 当type为group是设置有效 是否可多选
      type: Boolean,
      default: false
    },
    keys: { // 当type为group是设置有效 默认获取节点，true获取key数组
      type: Boolean,
      default: false
    },
    disabledKeys: {
      type: Array,
      default: () => []
    },
    showButton: { // 是否显示操作按钮（返回/取消）
      type: Boolean,
      default: true
    },
    filter: { // 是否添加过滤功能(只在社群列表是设置有效)
      type: Boolean,
      default: false
    },
    isRules: { // 弹窗是否存在校验
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogForm: {
        intro: ''
      },
      rules: {
        intro: [
          {required: true, message: '请输入申请理由', trigger: 'blur'},
          {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.dialogForm = val
      },
      deep: true
    },
    dialogForm: {
      handler: function (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    submitDialogForm (formName) {
      if (this.type === 'group') {
        let backArray = this.$refs.customGroup.getCheckedNodes()
        if (this.keys) {
          backArray = this.$refs.customGroup.getCheckedKeys()
        }
        this.$emit('remote-submit', backArray)
      } else {
        console.log(this.dialogForm)
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$emit('remote-submit', JSON.parse(JSON.stringify(this.dialogForm)))
          } else {
            console.log('validate is not pass')
          }
        })
      }
    },
    closeDialog () {
      this.$emit('update:visible', false)
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.clearValidate()
      }
    },
    setCheckedNodes (key) {
      this.$nextTick(() => {
        this.$refs.customGroup.setCheckedNodes(key || [])
      })
    }
  },
  created () {
    if (this.type === 'apply') this.dialogForm = this.value
  },
  beforeDestroy () {
  },
  computed: {
    customStyle: function () {
      switch (this.type) {
        case 'group':
          return {width: '400px', background: '#f8f8f8', height: '400px'}
        default:
          return {width: this.width}
      }
    },
    dialogFormVisible: {
      get () {
        return this.visible && (this.isRules ? this.isRules : !this.$store.state.expired)
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    optionsGroup: {
      get () {
        return this.group
      },
      set () {}
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "@/styles/form.scss";

  .dialog-form-wrapper {
    &[type=group] {
      .el-dialog__body {
        padding: 0 20px 25px;
      }
      .el-tree.white {
        background: transparent;
      }
    }
    .el-dialog__header {
      padding: 25px 20px 10px;
      text-align: center;
      .el-dialog__title {
        font-size: 16px;
      }
      .el-dialog__headerbtn {
        top: 10px;
        right: 10px;
        font-size: 20px;
      }
    }
    .el-dialog__body {
      padding: 20px 20px 0;
      .el-scrollbar {
        margin: 0 auto;
      }
    }
    .el-dialog__footer{
      padding-top: 0;
      padding-bottom: 30px;
      .el-button[disabled]{
        background: #B4B4B7;
        box-shadow: none;
      }
    }
    .el-button + .el-button {
      margin-left: 0;
    }
    .dialog-footer {
      text-align: center;
      .el-button {
        margin-right: 50px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .el-radio-group {
      .el-radio-button {
        float: left;
        &.is-active {
          .el-radio-button__inner {
            color: #333;
          }
        }
        .el-radio-button__inner {
          border: none;
          padding: 0 4px;
          border-right: 1px solid #ddd;
          font-size: 12px;
          color: #CBCBCB;
        }
        &:focus {
          box-shadow: none;
        }
        &:last-child {
          .el-radio-button__inner {
            border: none;
            padding-right: 0;
          }
        }
      }
    }
  }
</style>
