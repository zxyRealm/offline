<template>
  <div
    class="ob-group-nav"
    :type="type"
  >
    <el-select
      v-if="type==='device'"
      @change="selectChange"
      v-model="currentGroup">
      <el-option
        v-for="(item,$index) in GroupList"
        :key="item.groupGuid"
        :label="item.groupNickName"
        :value="$index">
      </el-option>
    </el-select>
    <el-checkbox v-if="type==='custom' && isCheckAll" @change="checkedAll">全选</el-checkbox>
    <el-tree
      :only-checked="onlyChecked"
      :check-strictly="checkStrictly"
      :show-checkbox="showChecked"
      :class="theme"
      class="filter-tree"
      :node-key="nodeKey"
      :data="TreeList"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      :default-expand-all="expandedAll"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
      @check="nodeCheck"
      @current-change="currentChange"
      ref="GroupTree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span
          v-if="type==='custom-community'"
          class="ellipsis"
          :custom-type="customType(data.type)"
        >
          {{data[defaultProps.label]}}
        </span>

        <span v-if="type!=='custom-community'" class="ellipsis">{{ data[defaultProps.label] }}</span>
        <template v-if="!data.groupPid && type==='community'">
           <uu-icon type="mine" v-if="type==='custom'" style="margin-left: 12px"></uu-icon>
           <el-popover
             placement="right"
             class="popover-wrap"
             @show='()=>getParentList(data)'
             trigger="hover">
              <div v-if="data.parentList" class="clearfix">
                <div class="parent-item clearfix" v-for="item in data.parentList">
                  <uu-icon type="data"></uu-icon>
                  <uu-icon type="handle"></uu-icon>
                  <div class="name">{{item.name}}</div>
                  <uu-icon type="quit" @click.native="()=>leaveCommunity('quit',data,item)"></uu-icon>
                </div>
              </div>
              <div class="tac fs12" v-else>暂未加入社群</div>
          <el-button v-if="node.level===1" type="text" class="popover fr" size="mini" slot="reference">上级</el-button>
        </el-popover>
        </template>
        <i v-if="type==='community'&& node.level===2" class="el-icon-remove-outline danger fr"
           @click="leaveCommunity('kick',data,node.parent.data)"></i>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import {customType} from '@/utils'

  export default {
    props: {
      value: {
        type: [Array, Object],
        default: () => []
      },
      theme: {
        type: String,
        default: 'default'
      },
      nodeKey: {
        type: String,
        default: 'groupGuid'
      },
      onlyChecked: {
        type: Boolean,
        default: false
      },
      expandedAll: {
        type: Boolean,
        default: true
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      checkStrictly: {
        type: Boolean,
        default: true
      },
      expandedKeys: {
        type: Array,
        default: () => []
      },
      currentKey: {
        type: [String, Number],
        default: ''
      },
      disabledKeys: {
        type: Array,
        default: () => []
      },
      type: {
        type: [String],
        default: 'device'   //device 设备导航 community 社群导航 custom-community 自定义社群导航
      },
      multiple: {  //是否可多选 当type为custom时有效
        type: Boolean,
        default: false
      },
      defaultProps: {
        type: Object,
        default: () => ({
          children: 'childGroupList',
          label: 'groupNickName'
        })
      },
    },
    name: "ob-group-nav",
    data() {
      return {
        currentGroup: '',
        GroupList: [],
        currentNode: '',
        testList: {
          "data": [
            {
              "childGroupList": [
                {
                  "childGroupList": [
                    {
                      "childGroupList": [
                        {
                          "childGroupList": [],
                          "createTime": "2018-06-11 11:24:17",
                          "groupGuid": "16B9EADCC5854772B9B96D130BE5C0BB",
                          "groupNickName": "创新科技园11",
                          "groupPid": "26241D572B924A3E9008A95904C27561",
                          "id": 18
                        }
                      ],
                      "createTime": "2018-06-11 11:24:17",
                      "groupGuid": "16B9EADCC5854772B9B96D130BE5C8BB",
                      "groupNickName": "创新科技园22",
                      "groupPid": "26241D572B924A3E9008A95904C27651",
                      "id": 15
                    }
                  ],
                  "createTime": "2018-06-11 11:24:17",
                  "groupGuid": "16B9EADCC5854772B9B96D130BE5C9BB",
                  "groupNickName": "创新科技园",
                  "groupPid": "26241D572B924A3E9008A95904C27551",
                  "id": 11
                }
              ],
              "createTime": null,
              "groupGuid": "26241D572B924A3E9008A95904C27551",
              "groupNickName": "星巴克2",
              "groupPid": null,
              "id": 0
            },
            {
              "childGroupList": [
                {
                  "childGroupList": [],
                  "createTime": "2018-06-23 18:15:47",
                  "groupGuid": "FB933CD184404F9682A2B996BCD833EB",
                  "groupNickName": "星巴克3",
                  "groupPid": "6DE174522B9942C783739ABEF5E81E28",
                  "id": 14
                }
              ],
              "createTime": null,
              "groupGuid": "6DE174522B9942C783739ABEF5E81E28",
              "groupNickName": "星巴克1",
              "groupPid": null,
              "id": 0
            }
          ],
        },
        checkedKeys: [],
        agency: []
      }
    },
    methods: {
      nodeClick(val, node) {
        this.$emit('node-click', val, node);
        if (this.showCheckbox && !node.data.disabled) {
          if (!this.multiple) {
            this.$refs.GroupTree.setCheckedNodes([node.data]);
          } else {
            let nodes = this.$refs.GroupTree.getCheckedNodes();
            let isChecked = nodes.filter(item => {
              return item.$treeNodeId === node.data.$treeNodeId
            })[0];
            if (isChecked) {
              this.$refs.GroupTree.setCheckedNodes(nodes.filter(item => {
                return item.$treeNodeId !== node.data.$treeNodeId
              }))
            } else {
              nodes.push(node.data);
              this.$refs.GroupTree.setCheckedNodes(nodes)
            }
          }
        }
      },
      currentChange(val, node) {
        if (val[this.nodeKey] !== this.currentNode) {
          this.$emit('current-change', val, node);
          this.currentNode = val[this.nodeKey];
        }
      },
      selectChange(index) {
        this.TreeList = this.GroupList[index][this.defaultProps.children]
      },
      filterNode() {

      },
      getGroupList(gid) {
        gid = (gid || '');
        this.$http("/group/list", {searchText: gid}).then(res => {
          this.GroupList = res.data;
          if (this.type !== 'device') {
            this.TreeList = this.GroupList
          }
        })
      },
      getParentList(value) {
        if (!value[this.nodeKey]) {
          this.$tip("社群id不存在");
        } else {
          if (!value.parentList) {
            this.$http("/group/fatherGruop", {guid: value[this.nodeKey]},false).then(res => {
              if (res.data) {
                this.$set(value, 'parentList', res.data)
              }
            })
          }
        }
      },
      customType(type, txt) {
        return customType(type, txt)
      },
      // 离开社群
      leaveCommunity(type, current, parent) {
        // type 可选类型 quit、kick
        let [url, des] = ['/group/exit', ''];
        let params = {
          groupPid: parent.guid || parent.groupGuid,
          groupGuid: current.groupGuid,
          groupNickName: current.groupNickName,
          parentGroupNickName: parent.groupNickName
        };
        switch (type) {
          case 'quit':
            des = '退出';
            url = '/group/exit';
            break;
          default:
            des = '踢出';
            url = '/group/remove';
        }
        this.$affirm({text: `确认${des}【${params.parentGroupNickName}】社群？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http(url, params).then(res => {
              this.$tip(`${des}社群成功`);
              this.getGroupList()
            });
            done()
          } else {
            done()
          }
        })
      },
      // 设置当前节点
      setCurrentKey(key) {
        this.$nextTick(() => {
          this.$refs.GroupTree.setCurrentKey(key)
        });
      },
      // 设置选中节点
      setCheckedKeys(keys) {
        this.$nextTick(() => {
          this.$refs.GroupTree.setCheckedKeys(keys)
        })
      },
      // 设置不可选节点
      getCheckedNodes() {
        return this.$refs.GroupTree.getCheckedNodes()
      },
      nodeCheck(nodes) {
        if (!this.multiple) {
          this.$refs.GroupTree.setCheckedNodes([nodes])
        }
      },
      getCheckedKeys() {
        return this.$refs.GroupTree.getCheckedKeys()
      },
      checkedAll(val) {
        if (val) {
          this.$refs.GroupTree.setCheckedNodes(this.originList)
        } else {
          this.$refs.GroupTree.setCheckedNodes(this.originList.filter(item => item.disabled))
        }
      }
    },
    mounted() {
      this.GroupList = this.value || [];
      if (this.type !== 'community' && this.type !== 'custom-community') {
        this.getGroupList()
      }
      this.setCurrentKey(this.currentKey);
    },
    watch: {
      value: function (val) {
        this.GroupList = val || [];
      },
      GroupList: {
        handler: function (val) {
          if (this.type === 'community' || this.type === 'custom-community') {
            this.TreeList = val
          }
          this.$emit("input", val)
        },
        deep: true
      },
      currentKey: function (key) {
        this.setCurrentKey(key)
      }
    },
    computed: {
      keysList: function () {
        let keys = [];
        let getKeys = (arr) => {
          arr.map(item => {
            keys.push(item[this.nodeKey]);
            if (item[this.defaultProps.children]) {
              getKeys(item[this.defaultProps.children])
            }
          })
        };
        getKeys(this.GroupList);
        return keys;
      },
      isCheckAll: function () {
        return this.multiple
      },
      showChecked: function () {
        return this.onlyChecked ? this.onlyChecked : this.showCheckbox;
      },
      TreeList: {
        get() {
          // 设置默认不可选节点
          let setKeys = new Set(this.disabledKeys);
          this.setCheckedKeys(this.disabledKeys);
          let setDisabled = (arr) => {
            for (let i = 0, len = arr.length; i < len; i++) {
              if (setKeys.has(arr[i][this.nodeKey])) {
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
          };
          setDisabled(this.GroupList);
          if (this.type !== 'device') {
            this.agency = this.GroupList;
          }
          return this.agency
        },
        set(model) {
          this.agency = model
        }
      },
      originList: function () {
        return this.$restoreArray(this.TreeList,this.defaultProps.children)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    width: 100%;
    .ellipsis {
      max-width: 84px;
      width: auto;
      vertical-align: middle;
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
        margin: 7px 0;
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

    }
  }

  .el-tree {
    &[only-checked] {
      .el-checkbox {
        display: none;
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
          zoom: 0.666;
        }
      }
    }
  }
</style>
