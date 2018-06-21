<template>
  <div class="ob-group-nav">
    <el-select
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
    </el-tree>
  </div>

</template>

<script>
  export default {
    props: {
      theme:{
        type:String,
        default:'default'
      },
      expandedAll:{
        type:Boolean,
        default:true
      },
      expandedKeys:{
        type:Array,
        default:()=>[]
      },
      checkedKeys:{
        type:Array,
        default:()=>[]
      },
      type: {
        type:[String],
        default:'device'   //device 设备导航 community 社群导航 custom 自定义社群导航
      }
    },
    name: "ob-group-nav",
    data() {
      return {
        currentGroup: '',
        GroupList: [],
        TreeList:[],
        data2: [
          {
            id: 1,
            groupNickName: '一级 1',
            childGroupList: [{
              id: 4,
              groupNickName: '二级 1-1',
              childGroupList: [{
                id: 9,
                groupNickName: '三级 1-1-1'
              }, {
                id: 10,
                groupNickName: '三级 1-1-2'
              }]
            }]
          },
          {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
          {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ],
        defaultProps:{
          children: 'childGroupList',
          label: 'groupNickName'
        },
        currentNode:''
      }
    },
    methods: {
      nodeClick(val,node){
        this.$emit('node-click',val,node)
      },
      currentChange(val,node){
        if(val.groupGuid!==this.currentNode){
          this.$emit('current-change',val,node);
          this.currentNode = val.groupGuid;
        }
      },
      selectChange(index){
        this.TreeList = this.GroupList[index].childGroupList
      },
      filterNode() {

      },
      getGroupList(gid){
        gid = (gid || '');
        this.$http("/group/list",{searchText:gid}).then(res=>{
          this.GroupList = res.data;
          if(this.type==='community'){
            this.TreeList = this.GroupList
          }
          console.log(this.GroupList)
        })
      }
    },
    created() {
      this.getGroupList()
    }
  }
</script>

<style scoped>

</style>
