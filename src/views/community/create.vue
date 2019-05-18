<template>
  <div class="community__create--wrap">
    <div class="base-form" v-show="step === 1">
      <h3 class="form-title">
        <span class="el-icon-arrow-left" @click="$backPrev"></span>{{moduleHeader.title}}
      </h3>
      <base-form
        :type="moduleHeader.type"
        :confirm-button-text="confirmText"
        @handle-cancel="handleFormCancel"
        @handle-success="handleBaseForm"></base-form>
    </div>
    <!-- 添加地图form-->
    <div class="map-form" v-show="step === 2">
      <h3 class="form-title">
        <span class="el-icon-arrow-left" @click="step = 1"></span>{{moduleHeader.title}}地图
      </h3>
      <map-form
        cancel-button-text="跳过"
        :type="moduleHeader.type"
        @handle-cancel="handleFormCancel"
        @handle-success="handleMapForm"></map-form>
    </div>
  </div>
</template>

<script>
import MapForm from './components/map'
import BaseForm from './components/base'

export default {
  name: 'CreateCommunity',
  components: {
    MapForm,
    BaseForm
  },
  data () {
    return {
      offsetWidth: '',
      step: 1, // 默认step：1 为基础信息编辑
      showAlert: true
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    moduleType () {
      return this.$route.name
    },
    moduleHeader () {
      let head = {}
      let text = ''
      if (this.$route.name.indexOf('create') > -1) {
        text = '创建'
      } else if (this.$route.name.indexOf('edit') > -1) {
        text = '编辑'
      }
      switch (this.moduleType.replace(/create|edit/, '')) {
        case 'Market':
          head = {
            title: `${text}商场`,
            type: 'market'
          }
          break
        case 'Chain':
          head = {
            title: `${text}连锁总店`,
            type: 'chain'
          }
          break
        case 'Store':
          head = {
            title: `${text}单个门店`,
            type: 'store'
          }
          break
      }
      return head
    },
    confirmText () {
      return this.moduleHeader.type === 'chain' ? '保存' : '下一步'
    }
  },
  methods: {
    handleBaseForm (type) {
      if (type !== 'chain') this.step = 2
    },
    handleMapForm (type) {
    },
    // form cancel按钮事件处理
    handleFormCancel (type) {
      switch (type) {
        case 'baseForm':
          this.$backPrev()
          break
        default:
          this.$router.push('/community')
          break
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>

  .community__create--wrap {
    padding: 0 30px;
    box-sizing: content-box;
  }

  .form-title {
    height: 56px;
    line-height: 56px;
    margin-bottom: 35px;
    font-size: 22px;
    .el-icon-arrow-left {
      margin-right: 10px;
      font-weight: bold;
      vertical-align: 0;
      cursor: pointer;
    }
  }

  .map-form {

  }
</style>

<style lang="scss">

</style>