<template>
  <el-dialog
    custom-class="upload__progress--wrap"
    :show-close="false"
    :center="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="show">
    <img width="70" v-show="state === 'loading'" class="tip_img_icon" src="/static/img/waiting_tip_icon.png" alt="">
    <div class="progress-msg">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'upload-progress-dialog',
  props: {
    state: {
      type: String,
      default: 'loading'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {},
  mounted () {
    this.show = this.visible
  },
  computed: {},
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (val) {
      this.show = val
    },
    show (val) {
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style scoped>
.tip_img_icon{
  display: block;
  margin: 0 auto;
}
  .progress-msg{
    margin-top: 10px;
    line-height: 24px;
    text-align: center;
  }
</style>
