<template>
  <div
    class="ob-group-nav"
    :type="type"
  >
    <el-tree
      style="width: 400px;"
      :multiple="multiple"
      :only-checked="onlyChecked"
      :check-strictly="checkStrictly"
      :show-checkbox="showChecked"
      :class="theme"
      class="filter-tree"
      :node-key="nodeKey"
      :data="GroupList"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      :default-expand-all="expandedAll"
      @node-click="nodeClick"
      @check="nodeCheck"
      @current-change="currentChange"
      ref="GroupTree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data[defaultProps.label]}}</span>
       <img class="role-icon-img" v-if="data.memberItem && node.level === 1" src="./image/manager_icon.png" alt="">
       <img src="./image/children_icon.png" alt="" v-else-if="node.level===1">
        <template>
           <el-popover
             placement="right"
             class="popover-wrap"
             @show='()=>getParentList(data)'
             trigger="hover">
              <div v-if="data.parentList&&data.parentList.length" class="clearfix">
                <div class="parent-item clearfix" v-for="(item,$index) in data.parentList" :key="$index">
                  <div style="width: 36px;margin-right: 5px;">
                    <el-tooltip class="fl" effect="dark" content="数据查看权限" placement="top">
                      <uu-icon type="data"></uu-icon>
                    </el-tooltip>
                    <el-tooltip class="fl" v-show="isHandle(item.rule)" effect="dark" content="设备操作权限" placement="top">
                      <uu-icon type="handle"></uu-icon>
                    </el-tooltip>
                  </div>
                  <div class="name">{{item.name}}</div>
                  <uu-icon type="quit" @click.native="()=>leaveCommunity('quit',data,item)"></uu-icon>
                </div>
              </div>
              <div class="tac fs12" v-else>暂未加入社群</div>
          <el-button v-if="node.level===1 && !data.groupPid && type==='community'" type="text" class="popover fr"
                     size="mini" slot="reference">上级</el-button>
        </el-popover>
        </template>
        <i v-if="type==='community'&& node.level===2" class="el-icon-remove-outline danger fr"
           @click="leaveCommunity('kick',data,node.parent.data)"></i>
      </span>
    </el-tree>
  </div>
</template>

<script>
import {customType, uniqueKey} from '@/utils'

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
    nodeKey: { // 节点唯一标识键值
      type: String,
      default: 'uniqueKey'
    },
    dataKey: { // 数组对象自有唯一标识
      type: String,
      default: 'groupGuid'
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
        children: 'memberItem',
        label: 'name'
      })
    },
    select: { // 社群设备默认值
      type: Object,
      default: () => ({})
    }
  },
  name: 'obGroupTree',
  data () {
    return {
      currentGroup: '',
      GroupList: [],
      currentNode: '',
      checkedKeys: [],
      agency: [],
      treeData: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }]
    }
  },
  methods: {
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
      if (val[this.nodeKey] !== this.currentNode) {
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
      }
    },
    // el-select 组件value 值变化时通知父组件
    selectChange (index) {
      // this.TreeList = this.GroupList[index][this.defaultProps.children]
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
    // 获取社群列表
    getGroupList (gid) {
      gid = (gid || '')
      this.$http('/group/list', {searchText: gid}).then(res => {
        this.GroupList = uniqueKey(res.data, 'memberItem')
        if (this.type !== 'device') {
          this.TreeList = this.GroupList
        }
      })
    },
    // 获取父社群列表
    getParentList (value) {
      if (!value[this.dataKey]) {
        this.$tip('社群id不存在')
      } else {
        if (!value.parentList) {
          this.$http('/group/fatherGruop', {guid: value[this.dataKey]}, false).then(res => {
            if (res.data) {
              this.$set(value, 'parentList', res.data)
            }
          })
        }
      }
    },
    customType (type, txt) {
      return customType(type, txt)
    },
    // 离开社群
    leaveCommunity (type, current, parent) {
      // type 可选类型 quit、kick
      let [url, des] = ['/group/exit', '']
      let params = {
        groupPid: parent.guid || parent.groupGuid,
        groupGuid: current.groupGuid,
        groupNickName: current.groupNickName,
        parentGroupNickName: parent.groupNickName || parent.name
      }
      switch (type) {
        case 'quit':
          des = `确定要退出【<span class="maxw200 ellipsis">${params.parentGroupNickName}</span>】社群？`
          url = '/group/exit'
          break
        default:
          des = `移除成员社群将失去对该社群设备的数据查看权限/操作权限。<br>
            确定要移除成员社群【<span class="maxw200 ellipsis">
            ${params.groupNickName}</span>】？`
          url = '/group/remove'
      }
      this.$affirm({text: `${des}`}, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http(url, params).then(res => {
            this.$tip(`${type === 'quit' ? '退出' : '移除'}成功`)
            this.$emit('refresh')
          })
          done()
        } else {
          done()
        }
      })
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
    },
    // 获取已选中对象 键值数组
    getCheckedKeys () {
      return this.$refs.GroupTree.getCheckedKeys()
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
  mounted () {
    this.getGroupList()
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
        this.$emit('input', val)
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
    }
  },
  computed: {
    isCheckAll: function () {
      return this.multiple
    },
    showChecked: function () {
      return this.onlyChecked ? this.onlyChecked : this.showCheckbox
    },
    // TreeList: {
    //   get () {
    //     // 设置默认不可选节点
    //     if (this.isDisabled) {
    //       let [setKeys, disabledKeys] = [new Set(this.disabledKeys), []]
    //       let setDisabled = (arr) => {
    //         for (let i = 0, len = arr.length; i < len; i++) {
    //           if (setKeys.has(arr[i][this.dataKey])) {
    //             disabledKeys.push(arr[i][this.nodeKey])
    //             this.$set(arr[i], 'disabled', true)
    //           } else {
    //             if (arr[i].disabled) {
    //               this.$set(arr[i], 'disabled', false)
    //             }
    //           }
    //           if (arr[i][this.defaultProps.children] && arr[i][this.defaultProps.children].length) {
    //             setDisabled(arr[i][this.defaultProps.children])
    //           }
    //         }
    //       }
    //       setDisabled(this.GroupList)
    //       this.setCheckedKeys(disabledKeys)
    //     }
    //     if (this.type !== 'device') {
    //       this.agency = this.GroupList
    //     } else {
    //       return this.GroupList[this.currentGroup] ? this.GroupList[this.currentGroup][this.defaultProps.children] : []
    //     }
    //     return this.agency
    //   },
    //   set (model) {
    //     this.agency = model
    //   }
    // },
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

  .custom-tree-node {
    position: relative;
    display: inline-block;
    width: 100%;
    > .ellipsis {
      float: left;
      max-width: 94px;
      width: auto;
      vertical-align: middle;
      font-size: 12px;
      &.dialog-tree {
        max-width: calc(100% - 100px);
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
      margin: 6px 0;
    }
    .el-button {
      &.el-popover__reference {
        vertical-align: middle;
        padding: 2px 5px;
        border: 1px solid #0F9EE9;
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
    &[type=custom-community] {
      .el-icon-caret-right {
        width: 8px;
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
