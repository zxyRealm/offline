<template>
  <li
    @click="selectOptionClick"
    class="button__dropdown--item"
    v-show="visible"
    :class="{
      'selected': itemSelected
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script>
import Emitter from '../utils/emitter'
import {getValueByPath} from '../utils'

export default {
  name: 'ButtonSelectItem',
  mixins: [Emitter],
  inject: ['select'],
  props: {
    value: {
      required: true
    },
    label: [String, Number]
  },
  data () {
    return {
      index: -1,
      visible: true
    }
  },
  created () {
    this.select.options.push(this)
    this.$on('queryChange', this.queryChange)
  },
  mounted () {
  },
  computed: {
    isObject () {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
    },
    currentLabel () {
      return this.label || (this.isObject ? '' : this.value)
    },
    currentValue () {
      return this.value || this.label || ''
    },
    itemSelected () {
      return this.isEqual(this.value, this.select.value)
    }
  },
  methods: {
    isEqual (a, b) {
      if (!this.isObject) {
        return a === b
      } else {
        const valueKey = this.select.valueKey
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
      }
    },
    selectOptionClick (e) {
      e.preventDefault()
      this.dispatch('ButtonSelect', 'handleOptionClick', [this, true])
    },
    queryChange (query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
      this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created
    }
  },
  watch: {},
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.button__dropdown--item{
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  .uu-icon{
    float: left;
    margin-top: 5px;
  }
  &:hover, &.selected{
    color: #3a8ee6;
  }
}
</style>
