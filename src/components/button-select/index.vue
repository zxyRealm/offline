<template>
  <div class="button__select--wrap">
    <el-input
      ref="input"
      readonly
      @focus="dropVisible = true"
      @blur="blur"
      :placeholder="placeholder"
      v-model="currentLabel">
      <i
        :class="{'up': dropVisible !== false}"
        class="el-icon-caret-bottom el-input__icon"
        slot="suffix">
      </i>
    </el-input>
    <transition
      name="el-zoom-in-top"
    >
      <div class="button__dropdown--wrap" @mousedown="cancelBlur" v-show="dropVisible">
      <el-scrollbar
        tag="ul"
      >
        <slot></slot>
      </el-scrollbar>
      <slot name="footer"></slot>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ButtonSelect',
  componentName: 'ButtonSelect',
  provide () {
    return {
      'select': this
    }
  },
  props: {
    value: {
      type: [Object, String],
      default: ''
    },
    placeholder: String,
    valueKey: String,
    itemData: Array // 下拉列表数据对象
  },
  data () {
    return {
      options: [],
      query: '',
      currentValue: '',
      dropVisible: false
    }
  },
  created () {
  },
  mounted () {
    this.$on('handleOptionClick', this.onHandleOptionClick)
  },
  computed: {
    isObject () {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
    },
    currentLabel () {
      let select = this.options.filter(item => item.itemSelected)[0]
      return select ? select.label : ''
    }
  },
  methods: {
    onHandleOptionClick (item) {
      this.$emit('input', item.value)
      this.blur()
    },
    blur () {
      this.$refs.input.blur()
      this.dropVisible = false
    },
    cancelBlur (e) {
      if (e && e.preventDefault()) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.currentValue = val
      },
      deep: true
    },
    currentValue: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.$off('handleOptionClick')
  }
}
</script>

<style lang="scss" scoped>
  .button__select--wrap{
    position: relative;
    .el-input{
      width: 120px;
      background: none;
    }
  }
.button__dropdown--wrap{
  min-width: 100%;
  width: 200px;
  position: absolute;
  top: 36px;
  left: 0;
  background: #26232B;
  box-shadow: 1px 3px 8px 0 rgba(0,0,0,0.60);
  padding: 15px;
  box-sizing: border-box;
  .el-scrollbar{
    .el-scrollbar__wrap{
      overflow: scroll;
    }
  }
  .el-button{
    width: 100%;
    margin-top: 5px;
  }
  .button__dropdown--item{
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    &:hover{
     color: #3a8ee6;
    }
  }
}
</style>
<style lang="scss">
  .button__select--wrap
  {
    .el-input{
      .el-input__inner{
        cursor: pointer;
      }
      .el-input__suffix-inner{
        height: 100%;
        .el-input__icon{
          vertical-align: top;
          font-size: 18px;
          line-height: 30px;
          /*transition: 0.4s all;*/
          &.up{
            transform: rotateZ(180deg);
          }
        }
      }
    }
  }
 .button__dropdown--wrap{
   .el-scrollbar{
     .el-scrollbar__wrap{
       overflow: scroll;
       max-height: 137px;
       height: auto;
     }
   }
   > .el-button{
     margin-top: 5px;
   }
 }
</style>
