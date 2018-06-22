<template>
  <div class="ob-group-nav">
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
    <el-tree
      :class="theme"
      class="filter-tree"
      node-key="groupGuid"
      :data="TreeList"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      :default-checked-keys="checkedKeys"
      :default-expand-all="expandedAll"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
      @current-change="currentChange"
      ref="tree2">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="ellipsis">{{ data.groupNickName }}</span>
        <template v-if="!data.groupPid">
           <uu-icon type="mine" style="margin-left: 12px"></uu-icon>
           <el-popover
             placement="right"
             class="popover-wrap"
             v-model="data.popover"
             @show='()=>getParentList(data)'
             trigger="click">
              <div v-if="data.parentList" class="clearfix">
                <div class="parent-item clearfix" v-for="item in data.parentList">
                  <uu-icon type="data"></uu-icon>
                  <uu-icon type="handle"></uu-icon>
                  <div class="name">{{item.name}}</div>
                  <uu-icon type="quit" @click.native="()=>quitCommunity(data,item)"></uu-icon>
                </div>
              </div>
              <div class="tac fs12" v-else>暂未加入社群</div>
          <el-button type="text" class="popover fr" size="mini" slot="reference">上级</el-button>
        </el-popover>
        </template>
        <i v-if="type==='community'&& node.level===2" class="el-icon-remove-outline danger fr" @click="kickCommunity(data)"></i>
      </span>
    </el-tree>
  </div>

</template>

<script>
  export default {
    props: {
      theme: {
        type: String,
        default: 'default'
      },
      expandedAll: {
        type: Boolean,
        default: true
      },
      expandedKeys: {
        type: Array,
        default: () => []
      },
      checkedKeys: {
        type: Array,
        default: () => []
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
        currentNode: ''
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
          this.GroupList = res.data;
          if (this.type === 'community') {
            this.TreeList = this.GroupList
          }
          console.log(this.GroupList)
        })
      },
      getParentList(value) {
        this.GroupList = this.GroupList.map(item => {
          if (item.popover) {
            item.popover = false;
          }
          return item
        });
        this.$set(value, 'popover', true);
        if (!value.groupGuid) {
          this.$tip("社群id不存在");
          return false
        } else {
          if (!value.parentList) {
            this.$http("/group/fatherGruop", {guid: value.groupGuid}).then(res => {
              if(res.data){
                this.$set(value, 'parentList', res.data)
              }
              // if (Array.isArray(res.data)) {
              //   this.$set(value, 'parentList', res.data)
              // } else {
              //   this.$set(value, 'parentList', new Array().push(res.data))
              // }
            })
          }

        }
      },
      // 退出社群
      quitCommunity(mine, parent) {
        console.log(mine, parent);
        this.$affirm({text: `确认退出【${parent.name}】社群？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/group/exit", {groupPid: parent.guid, groupGuid: mine.groupGuid}).then(res => {
              console.log(res);
              this.$tip("退出社群成功")
            })
          } else {
            done()
          }

        });

      },
      // 踢出社群
      kickCommunity(current){
       console.log(current);
        this.$affirm({text:`确认踢出【${current.groupNickName}】社群？`},(action,instance,done)=>{
          if(action==='confirm'){
            // this.$http("/group/exit",{groupPid:'',groupGuid:''}).then(res=>{
            //   this.$tip("踢出成功")
            // })
            done()
          }else{
            done()
          }
        })

      }
      },
    created() {
      this.getGroupList()
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
    .el-icon-remove-outline{
      font-size: 18px;
      margin: 7px 0;
    }
    .el-button {
      &.el-popover__reference {
        vertical-align: middle;
        padding: 2px 5px;
        border: 1px solid #0F9EE9;
        margin: 6px 0;
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
  .el-button {
    &.el-popover__reference {
      span {
        height: 1em;
        display: block;
        transform: scale(0.666);
        zoom: 0.666;
      }
      /*zoom:0.66;*/
    }
  }
</style>
