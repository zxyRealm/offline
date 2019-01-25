<template>
  <div
    class="ob-group-nav"
    :type="type"
  >
    <el-scrollbar>
      <div class="input--wrap">
        <el-input
          clearable
          v-if="filter || isSearch"
          class="filter__input"
          placeholder="快速查找社群"
          @keyup.enter.native="search"
          v-model.trim="filterText">
          <i
            @click="search"
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
        <p class="error-msg">{{inputError}}</p>
      </div>
      <el-tree
        :filter-node-method="filterNode"
        :multiple="multiple"
        :only-checked="onlyChecked"
        :check-strictly="checkStrictly"
        :show-checkbox="showChecked"
        :class="theme + (isFloor ? ' group__tree': '')"
        class="filter-tree"
        :node-key="nodeKey"
        :data="TreeList"
        :props="defaultProps"
        :default-expanded-keys="expandedKeys"
        :default-expand-all="expandedAll"
        @node-click="nodeClick"
        @check="nodeCheck"
        @current-change="currentChange"
        ref="GroupTree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <!--data.type 1 成员社群 2 管理层(商场/连锁)社群 3楼层社群-->
          <span
             v-if="type==='custom-community'"
             :class="{ellipsis:true,'dialog-tree':type === 'custom'}"
             :custom-type="customType(data.type)"
             :style="{maxWidth:''}"
           >
            {{data[defaultProps.label]}}
          </span>
          <span
            v-if="type!=='custom-community'"
            :class="{ellipsis:true,'dialog-tree':type === 'custom'}">
            {{ data[defaultProps.label] }}
          </span>
          <!--role01 商场 role02 连锁总店 role03 单个门店-->
          <uu-icon class="role__icon--img" v-if="node.level === 1 && isFloor" :type="'role0' + currentManage.type"></uu-icon>
          <!---->
          <el-tooltip content="非自有社群" placement="right">
            <uu-icon v-if="(node.level === 3 && !data.self) || data.type === 4"  class="role__icon--img" type="foreign"></uu-icon>
          </el-tooltip>
        </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
import {customType, uniqueKey} from '@/utils'
import {mapState} from 'vuex'
export default {
  props: {
    value: { // 社群列表数组对象
      type: [Array, Object],
      default: () => []
    },
    theme: { // 主题样式
      type: String,
      default: 'default'
    },
    nodeKey: { // (uniqueKey)节点唯一标识键值
      type: String,
      default: 'uniqueKey'
    },
    dataKey: { // 数组对象自有唯一标识
      type: String,
      default: 'groupSonGuid'
    },
    onlyChecked: { //
      type: Boolean,
      default: false
    },
    expandedAll: { // 节点是否全部展开
      type: Boolean,
      default: true
    },
    showCheckbox: { // 是否显示多选按钮
      type: Boolean,
      default: false
    },
    checkStrictly: { // 父子节点是否关联
      type: Boolean,
      default: true
    },
    expandedKeys: { // 默认展开的节点的 key 的数组
      type: Array,
      default: () => []
    },
    currentKey: { // 当前选中节点 key
      type: [String, Number],
      default: ''
    },
    disabledKeys: { // 默认不可选中的节点的 key 的数组
      type: Array,
      default: () => []
    },
    isDisabled: { // 是否开启节点不可选中
      type: [Boolean],
      default: false
    },
    type: { // 树型控件类型
      type: [String],
      default: 'device' // device 设备导航 community 社群导航 custom-community 自定义社群导航
    },
    multiple: { // 是否可多选 当type为custom时有效
      type: Boolean,
      default: false
    },
    defaultProps: { // 默认子类键名、显示文本键名
      type: Object,
      default: () => ({
        children: 'subGroupSon',
        label: 'nickName'
      })
    },
    select: { // 社群设备默认值
      type: Object,
      default: () => ({})
    },
    isSearch: { // 搜索功能（搜索和过滤功能不共存，只能使用一种功能）
      type: Boolean,
      default: false
    },
    filter: { // 是否启用关键词过滤
      type: Boolean,
      default: false
    },
    rights: { // 是否展示管理员社群索权状态
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    inputError: {
      type: String,
      default: ''
    },
    isFloor: {
      type: Boolean,
      default: false
    }
  },
  name: 'ob-group-nav',
  data () {
    return {
      currentGroup: '',
      GroupList: [],
      currentNode: '',
      checkedKeys: [],
      agency: [],
      filterText: '' // 关键词
    }
  },
  methods: {
    search () {
      this.$emit('remote-search', this.filterText)
    },
    loadNodeList (node, resolve) {
      if (node.level > 1) {
      } else {
        resolve([])
      }
    },
    /*
    * 节点被点击时的回调
    * multiple 是否多选
    * 已选中节点在点击事件中状态不会被清除
    * */
    nodeClick (val, node) {
      if (this.showCheckbox && !node.data.disabled) {
        if (!this.multiple) {
          this.$refs.GroupTree.setCheckedNodes([node.data])
        } else {
          let nodes = this.$refs.GroupTree.getCheckedNodes()
          let isChecked = nodes.filter(item => {
            return item.$treeNodeId === node.data.$treeNodeId
          })[0]
          if (isChecked) {
            this.$refs.GroupTree.setCheckedNodes(nodes.filter(item => {
              return item.$treeNodeId !== node.data.$treeNodeId
            }))
          } else {
            nodes.push(node.data)
            this.$refs.GroupTree.setCheckedNodes(nodes)
          }
        }
      }
    },
    // 当前选中节点变化时触发的事件
    currentChange (val, node) {
      // if (val[this.nodeKey] !== this.currentNode || !this.currentNode) {
      if (this.type === 'device') {
        this.$emit('current-change', {
          selectNode: this.currentGroup,
          currentNode: val,
          node: this.GroupList[this.currentGroup][this.defaultProps.children]
        })
      } else {
        this.$emit('current-change', val, node)
      }
      this.currentNode = val[this.nodeKey]
      // }
    },
    // el-select 组件value 值变化时通知父组件
    selectChange (index) {
      this.TreeList = this.GroupList[index][this.defaultProps.children]
      this.currentNode = ''
      this.$emit('current-change', {
        selectNode: index,
        currentNode: '',
        node: this.GroupList[index][this.defaultProps.children]
      })
    },
    isHandle (val) {
      return (val || '').split(',').length === 2
    },
    customType (type, txt) {
      return customType(type, txt)
    },
    // 设置当前节点
    setCurrentKey (key) {
      this.$nextTick(() => {
        this.currentNode = ''
        this.$refs.GroupTree.setCurrentKey(key || '')
      })
    },
    // 设置选中节点（node-key值）
    setCheckedKeys (keys) {
      this.$nextTick(() => {
        this.$refs.GroupTree.setCheckedKeys(keys)
      })
    },
    // 设置选中节点 （node节点对象）
    setCheckedNodes (nodes) {
      this.$nextTick(() => {
        this.$refs.GroupTree.setCheckedNodes(nodes)
      })
    },
    // 获取已选中节点
    getCheckedNodes () {
      return this.$refs.GroupTree.getCheckedNodes()
    },
    nodeCheck (nodes) {
      if (!this.multiple) {
        this.$refs.GroupTree.setCheckedNodes([nodes])
      }
      // this.$emit('current-change', nodes)
    },
    // 获取已选中对象 键值数组
    getCheckedKeys () {
      return this.$refs.GroupTree.getCheckedKeys()
    },
    // 社群列表树型结构关键字过滤
    filterNode (value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    // 一键全选
    checkedAll (val) {
      if (val) {
        this.$refs.GroupTree.setCheckedNodes(this.originList)
      } else {
        this.$refs.GroupTree.setCheckedNodes(this.originList.filter(item => item.disabled))
      }
    }
  },
  created () {
    this.$emit('input', uniqueKey(this.value, this.defaultProps.children))
  },
  mounted () {
    this.GroupList = this.value || []
    if (this.type === 'device') {
      this.currentGroup = this.select.selectNode
    }
    this.setCurrentKey(this.currentKey)
  },
  watch: {
    value: function (val) {
      this.GroupList = val || []
    },
    GroupList: {
      handler: function (val) {
        if (this.type === 'community' || this.type === 'custom-community') {
          this.TreeList = val
        }
        this.$emit('input', uniqueKey(val, this.defaultProps.children))
      },
      deep: true
    },
    currentKey: function (key) {
      this.setCurrentKey(key)
    },
    TreeList (val) {
      if (this.type === 'device') {
        this.setCurrentKey(this.select.currentNode ? this.select.currentNode.uniqueKey : '')
      }
    },
    filterText (val) {
      this.$nextTick(() => {
        if (!this.isSearch) {
          this.$refs.GroupTree.filter(val)
        }
      })
    }
  },
  computed: {
    ...mapState(['currentManage']),
    isCheckAll: function () {
      return this.multiple
    },
    showChecked: function () {
      return this.onlyChecked ? this.onlyChecked : this.showCheckbox
    },
    TreeList: {
      get () {
        // 设置默认不可选节点
        let [setKeys, disabledKeys] = [new Set(this.disabledKeys), []]
        let setDisabled = (arr) => {
          arr = JSON.parse(JSON.stringify(arr))
          for (let i = 0, len = arr.length; i < len; i++) {
            if (setKeys.has(arr[i][this.dataKey])) {
              disabledKeys.push(arr[i][this.nodeKey])
              this.$set(arr[i], 'disabled', true)
            } else {
              if (arr[i].disabled) {
                this.$set(arr[i], 'disabled', false)
              }
            }
            if (arr[i][this.defaultProps.children] && arr[i][this.defaultProps.children].length) {
              setDisabled(arr[i][this.defaultProps.children])
            }
          }
          return arr
        }
        // 添加默认不可选节点后新数组
        let newList = setDisabled(this.GroupList)
        this.setCheckedKeys(disabledKeys)
        if (this.type === 'device') {
          return newList[this.currentGroup] ? newList[this.currentGroup][this.defaultProps.children] : []
        }
        return newList
      },
      set (model) {
        this.GroupList = model
      }
    },
    originList: function () {
      return this.$restoreArray(this.TreeList, this.defaultProps.children)
    }
  }
}
</script>

<style lang="scss" scoped>
  [type=custom-community] {
    .custom-tree-node {
      > .ellipsis {
        max-width: 154px;
        margin: 7px 0;
      }
    }
  }
  .input--wrap{
    position: relative;
    .error-msg{
      position: absolute;
      bottom: 2px;
      left: 15px;
      font-size: 12px;
      color: #F87F21;
    }
  }
  .custom-tree-node {
    position: relative;
    display: inline-block;
    width: 100%;
    &:hover{
      > .el-icon-plus{
        display: inline-block;
      }
    }
    > .el-icon-plus{
      display: none;
      margin: 9px;
      color: #3a8ee6;
    }
    > .ellipsis {
      max-width: 90px;
      width: auto;
      vertical-align: middle;
      font-size: 14px;
      &.dialog-tree {
        /*max-width: calc(100% - 100px);*/
      }
    }
    .mine {
      float: left;
      margin: 8px 0 8px 12px;
    }
    .popover-wrap {
      float: right;
      height: 18px;
      margin: 7px 0;
    }
    .el-icon-remove-outline {
      font-size: 18px;
      margin: 7px 0;
    }
    .el-button {
      &.el-popover__reference {
        vertical-align: middle;
        padding: 2px 5px;
        border: 1px solid #0F9EE9;
      }
    }
    /*新建分组/添加社群 按钮*/
    .group__custom--btn{
      display: inline-block;
      width: 138px;
      color: #fff;
      font-size: 12px;
      &.groups-btn{
        width: 80px;
        height: 20px;
        line-height: 20px;
        background: url(./image/create_groups_icon@2x.png) no-repeat center;
        background-size: 100% 100%;
        text-align: center;
      }
      .el-icon-plus {
        margin-right: 5px;
        color: #3a8ee6;
        font-weight: bold;
      }
    }
  }

  .parent-item {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    > div {
      float: left;
      font-size: 12px;
    }
    .uu-icon {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
        float: right;
      }
    }
    .name {
      width: 84px;
    }
  }
</style>
<style lang="scss">
  @import "@/styles/variables.scss";
  .ob-group-nav {
    height: 100%;
    >.el-scrollbar{
      height: 100%;
      .el-scrollbar__wrap{
        overflow-x: hidden;
      }
      .el-scrollbar__bar.is-horizontal{
        display: none;
      }
    }
    &[type=custom-community] {
      .el-icon-caret-right {
        width: 8px;
      }
    }
  }
  .el-dialog{
    .filter__input{
      width: 190px;
      color: #333;
      border-bottom: 1px solid #BFBFBF;
      &.white{
        background: rgba(0,0,0,0);
      }
      .el-input__inner{
        color: #333;
      }
      .el-icon-search{
        color: #4BC5EB;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .el-tree {
    &.white{
      background: transparent;
    }
    &[only-checked] {
      .el-checkbox {
        display: none;
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
      transform: translate(-50%, -50%) scale(1);
    }
    .el-checkbox__inner {
      border-radius: 50%;
      &:after {
        content: "";
        position: absolute;
        width: 4px;
        height: 4px;
        left: 50%;
        top: 50%;
        border-radius: 100%;
        box-sizing: content-box;
        transition: transform .15s cubic-bezier(.71, -.46, .88, .6);
        background-color: #fff;
      }
    }
    &[multiple] {
      .el-tree-node{
        .el-checkbox__input.is-checked .el-checkbox__inner::after {
          transform: rotate(45deg) scaleY(1);
        }
        .el-checkbox__inner {
          border-radius: 0;
          &:after {
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 7px;
            border-radius: 0;
            width: 3px;
            left: 4px;
            top: 1px;
            background-color: transparent;
            transform: rotate(45deg) scaleY(0);
            transition: transform .15s cubic-bezier(.71, -.46, .88, .6) 50ms;
            transform-origin: center;
          }
        }
      }
    }
  }

  .el-tree-node__expand-icon {
    color: #fff;
    font-size: 14px;
  }

  .ob-group-nav {
    box-sizing: border-box;
    &[type=custom] {
      padding: 15px 20px;
      > .el-checkbox {
        display: block;
        height: 32px;
        line-height: 32px;
      }
      .el-tree {
        padding: 0 20px;
        .el-tree-node__expand-icon {
          color: #333;
          &.el-icon-caret-right {
            float: left;
            margin: 5px 0;
          }
        }
        .el-tree-node {
          > .el-tree-node__content {
            position: relative;
            display: block;
            /*padding-left: 20px !important;*/
            label.el-checkbox {
              position: absolute;
              left: -20px;
              top: 0;
            }
          }
        }
        .el-tree-node__children {
          overflow: initial;
          .el-tree-node {
            > .el-tree-node__content {
              /*padding-left: 35px !important;*/
            }
          }
        }
      }
    }
  }

  label.el-checkbox.is-checked + .custom-tree-node {
    color: $blue;
  }

  .custom-tree-node {
    > * {
      display: inline-block;
      vertical-align: middle;
    }
    .role__icon--label{
      display: inline-block;
      width: 2.5em;
      height: 1.2em;
      line-height: 1.2em;
      font-size: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .role__icon--img{
      height: 14px;
      margin-left: 5px;
    }
    .el-button {
      &.el-popover__reference {
        span {
          height: 1em;
          display: block;
          transform: scale(0.666);
        }
      }
    }
  }
</style>
