<template>
  <div class="custom__tree--wrap">
    <div class="custom__tree--search">
      <el-input
        clearable
        v-model.trim="searchText"
        @clear="clearSearch"
        @keyup.enter.native="treeSearch"
        :placeholder="placeholder">
      </el-input>
      <p class="search__error"><span v-if="!searchEmpty">{{errorText}}</span></p>
    </div>
    <div class="custom__tree--content">
      <el-tree
        ref="treeNode"
        :data="treeList"
        :props="defaultProps"
        :node-key="nodeKey"
        :highlight-current="highlightCurrent"
        :default-expanded-keys="expandedKeys"
        @current-change="currentChange">
        <span
          class="el-tree-node__label custom-tree-node"
          slot-scope="{ node, data }"
          :has-children="data[defaultProps.children] ? data[defaultProps.children].length || false : false">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '查找社群'
    },
    errorText: {
      type: String,
      default: '未搜索到相关社群'
    },
    nodeKey: {
      type: String,
      default: 'guid'
    },
    groupKey: { // 判别是否是社群的键值
      type: String,
      default: 'guid'
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'label',
        children: 'children'
      })
    }
  },
  data () {
    return {
      expandedKeys: [],
      searchText: '',
      currentKey: '',
      searchEmpty: true
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    treeList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.data))
        let resetArr = (arr) => {
          return arr.map(item => {
            if (!item[this.groupKey]) {
              item.disabled = true
            }
            if (item[this.defaultProps.children] && item[this.defaultProps.children].length) {
              resetArr(item[this.defaultProps.children])
            }
            return item
          })
        }
        resetArr(list)
        return list
      },
      set () {}
    }
  },
  methods: {
    // 当前选中节点变化时回调
    currentChange (data) {
      if (!data.disabled) {
        this.currentKey = data[this.nodeKey]
      }
      this.$refs.treeNode.setCurrentKey(this.currentKey)
      this.$nextTick(() => {
        if (!data.disabled) {
          this.$emit('current-change', this.$refs.treeNode.getCurrentNode())
        }
      })
    },
    // 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
    setCheckedKeys (keys) {
      this.$refs.treeNode.setCheckedKeys(keys)
      this.expandedKeys = keys
      if (!keys || !keys.length) {
        this.searchEmpty = false
      } else {
        this.searchEmpty = true
        this.setCurrentKey(keys[0])
      }
    },
    // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
    // 注：此方法需要在node节点更新后调用，否则展开树形结构使用时会无效
    setCurrentKey (key) {
      this.expandedKeys.push(key)
      this.$nextTick(() => {
        this.currentKey = key
        this.$refs.treeNode.setCurrentKey(key)
      })
    },
    // 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
    getCurrentKey () {
      this.$refs.treeNode.getCurrentKey()
    },
    getCurrentNode () {
      return this.$refs.treeNode.getCurrentNode()
    },
    treeSearch () {
      this.$emit('tree-search', this.searchText)
    },
    // 清空搜索条件
    clearSearch () {
      this.searchEmpty = true
      this.$refs.treeNode.setCheckedKeys([])
      this.expandedKeys = []
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.search__error{
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  color: #f85650;
}
</style>
<style lang="scss">
$backColor: linear-gradient(-90deg, #8041c6, #2090e4)!important;
$color: #0f9ee9;
.custom__tree--content{
  .el-tree{
    background: transparent;
    .el-tree-node{
      .content__after{
        position: absolute;
        content: '';
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        background-image: $backColor;
      }
      &[aria-disabled=true] {
        > .el-tree-node__content{
          color: #979797;
          cursor: default;
          > .el-tree-node__label[has-children]:after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            cursor: pointer;
          }
        }
      }
      &:not([aria-disabled=true]) {
      > .el-tree-node__content{
        color: #fff;
        &:hover{
          color: $color;
          &:after{
            @extend .content__after;
          }
        }
      }
      &.is-current{
       > .el-tree-node__content{
         color: $color;
         &:after{
           @extend .content__after;
         }
       }
      }
      &.is-checked {
        > .el-tree-node__content{
          color: $color;
        }
      }
    }
    }
    .el-tree-node__content{
      position: relative;
      background-color: transparent!important;
      z-index: inherit;
    }
  }
}
</style>
