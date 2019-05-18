/*
* @author  张晓元
* @date    2019-05-18
*/
<template>
  <el-dialog
    width="560px"
    :title="title"
    :visible.sync="visibleDialog"
  >
    <el-form
      class="g-form-center"
      ref="joinCommunityForm"
      label-width="80px"
      label-position="left"
      :rules="joinFormRules"
      :model="joinCommunityForm">
      <el-form-item label="名称" prop="portalName">
        <el-input v-model.trim="joinCommunityForm.portalName" placeholder="请输入名称"></el-input>
      </el-form-item>

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
export default {
  name: 'join-dialog',
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'market'
    },
    title: {
      type: String,
      default: '编辑'
    }
  },
  data () {
    return {
      visibleDialog: false,
      joinCommunityForm: {
        name: '',
        nickName: '',
        pca: '',
        address: '',
      },
      joinFormRules: {

      }
    }
  },
  created () {},
  mounted () {},
  computed: {
  },
  methods: {},
  watch: {}
}
</script>

<style scoped>

</style>