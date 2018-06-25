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
    <el-checkbox v-if="type==='custom'" @change="checkedAll">全选</el-checkbox>
    <el-tree
      :check-strictly="checkStrictly"
      :show-checkbox="showCheckbox"
      :class="theme"
      class="filter-tree"
      node-key="groupGuid"
      :data="TreeList"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      :default-expand-all="expandedAll"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
      @current-change="currentChange"
      ref="GroupTree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="ellipsis">{{ data.groupNickName }}</span>
        <template v-if="!data.groupPid">
           <uu-icon type="mine" style="margin-left: 12px"></uu-icon>
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
           @click="leaveCommunity('kick',data)"></i>
      </span>
    </el-tree>
  </div>
</template>

<script>
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
        default: false
      },
      expandedKeys: {
        type: Array,
        default: () => []
      },
      currentKey: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: [String],
        default: 'device'   //device 设备导航 community 社群导航 custom 自定义社群导航
      }
    },
    name: "ob-group-nav",
    data() {
      return {
        currentGroup: '',
        GroupList: [],
        TreeList: [],
        defaultProps: {
          children: 'childGroupList',
          label: 'groupNickName'
        },
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
                          "childGroupList": [

                          ],
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
        checkedKeys:[]
      }
    },
    methods: {
      nodeClick(val, node) {
        this.$emit('node-click', val, node)
      },
      currentChange(val, node) {
        if (val.groupGuid !== this.currentNode) {
          this.$emit('current-change', val, node);
          this.currentNode = val.groupGuid;
        }
      },
      selectChange(index) {
        this.TreeList = this.GroupList[index].childGroupList
      },
      filterNode() {

      },
      getGroupList(gid) {
        gid = (gid || '');
        this.$http("/group/list", {searchText: gid}).then(res => {
          if (gid === '') {
            this.GroupList = res.data;
            if (this.type !== 'device') {
              this.TreeList = this.GroupList
            }
          } else {

          }
        })
      },
      getParentList(value) {
        if (!value.groupGuid) {
          this.$tip("社群id不存在");
        } else {
          if (!value.parentList) {
            this.$http("/group/fatherGruop", {guid: value.groupGuid}).then(res => {
              if (res.data) {
                this.$set(value, 'parentList', res.data)
              }
            })
          }
        }
      },
      // 退出社群
      quitCommunity(mine, parent) {
        this.$affirm({text: `确认退出【${parent.name}】社群？`}, (action, instance, done) => {

        });

      },
      // 离开社群
      leaveCommunity(type, current, parent) {
        // type 可选类型 quit、kick
        let [des, pid, id, name] = ['', '', '', '',];
        switch (type) {
          case 'quit':
            des = '退出';
            id = current.groupGuid;
            pid = parent.guid;
            name = parent.name;
            break;
          default:
            des = '踢出';
            id = current.groupGuid;
            pid = current.groupPid;
            name = current.groupNickName;
        }
        console.log(des, pid, id, name);
        this.$affirm({text: `确认${des}【${name}】社群？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/group/exit", {groupPid: pid, groupGuid: id}).then(res => {
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
      getCheckedKeys(){
        return this.$refs.GroupTree.getCheckedKeys()
      },
      checkedAll(val) {
        if(val){
          this.$refs.GroupTree.setCheckedKeys(this.keysList)
        }else {
          this.$refs.GroupTree.setCheckedKeys([])
        }
      }
    },
    created() {
      // this.TreeList = this.testList.data;
      this.GroupList = this.value || [];
      if (this.type !== 'community') {
        this.getGroupList()
      }
    },
    mounted() {
      this.setCurrentKey(this.currentKey)
    },
    watch: {
      value: function (val) {
        this.GroupList = val || [];
        if (this.type === 'community') {
          this.TreeList = this.GroupList
        }
      },
      GroupList: {
        handler: function (val) {
          if (this.type === 'community') {
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
            keys.push(item.groupGuid);
            if (item.childGroupList) {
              getKeys(item.childGroupList)
            }
          })
        };
        getKeys(this.GroupList);
        return keys;
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
  .el-tree-node__expand-icon{
    color: #fff;
    font-size:14px;
  }
  .ob-group-nav{
    &[type=custom]{
      padding: 15px 0 20px 30px ;
      >.el-checkbox{
        display: block;
        height: 32px;
        line-height: 32px;
      }
      .el-tree {
        padding-left: 20px;
        .el-tree-node__expand-icon{
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
