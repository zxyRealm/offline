<template>
  <div class="custom__tree--wrap">
    <div class="custom__tree--search">
      <el-autocomplete
        clearable
        size="small"
        v-model.trim="searchText"
        :value-key="valueKey"
        :fetch-suggestions="querySearchAsync"
        :placeholder="placeholder"
        @select="handleSelect"
      >
        <i slot="prefix" class="iconfont icon-sousuo"></i>
      </el-autocomplete>
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
          <span class="ellipsis max-width-28">{{ node.label }}</span>
          <!-- currentManage.type  1：商场 、2：单店 、3：连锁-->
          <uu-icon
            v-if="node.level === 1"
            class="role__icon--img"
            :type="'role0' + currentManage.type"></uu-icon>
          <!------------- 非自有社群标识显示 -------------->
          <el-tooltip content="非自有社群" placement="right">
            <uu-icon v-if="data.type === 'JOINED'" class="role__icon--img" type="foreign"></uu-icon>
          </el-tooltip>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getManageMemberTree, getSearchMember } from '@/api/community'
export default {
  name: 'GroupTree',
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
      default: 'groupGuid'
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'name',
        children: 'trieNodeList'
      })
    },
    formatList: {
      type: Function,
      default(list) {
        return list
      }
    },
    // fetchSuggestions: Function,
    valueKey: { // el-autocomplete 输入建议对象中用于显示的键名
      type: String,
      default: 'name'
    }
  },
  data () {
    return {
      expandedKeys: [],
      searchText: '',
      currentKey: '',
      searchEmpty: true,
      communityTreeList: []
    }
  },
  created () {
    this.getMemberTree()
  },
  computed: {
    ...mapState(['currentManage']),
    treeList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.communityTreeList))
        let resetArr = (arr) => {
          return arr.map(item => {
            // if (!item[this.groupKey]) {
            //   item.disabled = true
            // }
            if (item[this.defaultProps.children] && item[this.defaultProps.children].length) {
              resetArr(item[this.defaultProps.children])
            }
            return item
          })
        }
        resetArr(list)
        return list
      },
      set () {
      }
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
          this.$emit('current-change', this.getCurrentNode())
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
      key = key || (this.communityTreeList[0] ? this.communityTreeList[0][this.nodeKey]: '')
      this.expandedKeys.push(key)
      this.$nextTick(() => {
        this.currentKey = key
        this.$refs.treeNode.setCurrentKey(key)
        let currentNode = this.getCurrentNode()
        if (currentNode) {
          this.$emit('current-change', currentNode)
        }
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

    handleSelect (item) {
      this.$emit('handle-select', item)
      this.setCurrentKey(item[this.nodeKey])
    },
    // 返回输入建议的方法
    querySearchAsync (queryString, cb) {
      return getSearchMember({ name: queryString }).then((res) => {
        cb(res.data || [])
      }).catch(() => {
        cb([])
      })
    },
    // 获取成员社群组织架构
    getMemberTree () {
      let groupGuid = this.currentManage.groupGuid
      if (!groupGuid) return
      getManageMemberTree({ groupGuid: groupGuid }).then((res) => {
        if (res.data[0]) {
          res.data[0].guid = res.data[0].groupGuid
          this.communityTreeList = this.formatList(res.data)
          this.setCurrentKey()
        }
        if (!res.data[0][this.defaultProps.children].length) {
          this.$emit('handle-empty')
        }
      })
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.getMemberTree()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .search__error {
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    color: #f85650;
  }

  .custom__tree--search {
    padding: 25px 15px 0;
    box-sizing: border-box;
  }
</style>
<style lang="scss">
  $backColor: #F8F8F8 !important;
  $color: #0f9ee9;

  .custom__tree--search {
    .el-input__prefix {
      line-height: 32px;
    }
  }

  .custom__tree--content {
    .el-tree {
      .el-tree-node {
        .content__after {
          position: absolute;
          content: '';
          display: block;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.2;
          background-color: $backColor;
        }
        &[aria-disabled=true] {
          > .el-tree-node__content {
            color: $white-text-color;
            background-color: #fff;
            cursor: default;
            > .el-tree-node__label[has-children]:after {
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
        > .el-tree-node__content {
          color: $white-text-color;
          &:hover {
            color: $color;
            background-color: $backColor;
          }
        }
        &.is-current {
          > .el-tree-node__content {
            color: $color;
            background-color: $backColor;
          }
        }
        &.is-checked {
          > .el-tree-node__content {
            color: $color;
          }
        }
      }
      .el-tree-node__content {
        position: relative;
        height: 42px;
        line-height: 42px;
        z-index: inherit;
        .el-tree-node__label {
          width: calc(100% - 46px);
          font-size: 15px;
        }
        .el-tree-node__expand-icon {
          font-size: 20px;
        }
      }
    }
  }
</style>
