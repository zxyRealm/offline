<template>
  <transition name="dialog-fade">
    <div class="console__dialog--wrap vam" v-show="dialogVisible" @click.self="close">
      <div class="dialog--inner">
        <div class="dialog__title">{{title}}</div>
        <div class="dialog__body">
          <slot></slot>
        </div>
        <div class="dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'consoleDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  created () {
  },
  mounted () {
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible && !this.$store.state.expired
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    // 关闭 dialog 弹框
    close () {
      this.$emit('update:visible', false)
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.console__dialog--wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  .dialog__body{
    overflow: hidden;
  }
}
</style>
