<template>
  <div class="community-mine-wrap">
    <div class="community--inner">
        <div class="community--sidebar dashed-border">
          <div class="btn-wrap">
            <el-button disabled class="affirm medium">加入</el-button>
            <el-button class="affirm medium" @click="$router.push('/community/custom/create')">创建</el-button>
          </div>
          <uu-sub-tab
            size="small"
            search
            placeholder="快速查找分组"
            @remote-search="remoteSearch"
            :menu-array="[{title:'我的社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
          <p class="search-empty">{{searchEmpty?'未查询到结果':''}}</p>
          <ob-group-nav
            ref="customGroup"
            theme="default"
            node-key="guid"
            only-checked
            :current-key="currentKey"
            :defaultProps="{label:'name'}"
            type="custom-community"
            @current-change="currentChange"
            v-model="customGroupList">
          </ob-group-nav>
        </div>
        <div class="community--main">
            <div class="cmm-top dashed-border">
              <h2 class="cmm-sub-title">
                <span>分组详情</span>
                <p class="handle fr fs14" v-show="customGroupInfo.guid && !loading">
                  <a href="javascript:void (0)" class="danger mr-10" @click="deleteGroup">删除</a>
                  <router-link :to="'/community/custom/edit/'+customGroupInfo.guid">编辑</router-link>
                </p>
              </h2>
              <div class="cm-info-wrap custom">
                <div class="info-detail" v-if="customGroupInfo.guid">
                  <p>
                    <span class="fs14">分组名称： </span>{{customGroupInfo.name}}
                  </p>
                  <p>
                    <span class="fs14">分组类型： </span>
                    <span
                      class="ellipsis"
                      :custom-type="customType(customGroupInfo.type)"
                    >
                    {{customGroupInfo.type|customType(true)}}
                  </span>
                  </p>
                  <p>
                    <span class="fs14">分组描述： </span>
                    {{customGroupInfo.describe}}</p>
                </div>
                <ob-list-empty text="您尚未创建分组" size="small" v-if="!customGroupInfo.guid&&!loading"></ob-list-empty>
              </div>
            </div>
            <div class="cmm-table dashed-border">
              <h2 class="cmm-sub-title">
                <span>社群列表</span>
                <p class="handle fr fs14" v-if="!loading">
                  <a href="javascript:void (0)"
                     v-show="customMemberList.length"
                     class="danger mr-10"
                     @click="deleteMember">移除</a>
                  <a href="javascript:void(0)"
                     v-show="customGroupInfo.guid"
                     @click="dialogFormVisible=true">添加</a>
                </p>
              </h2>
              <el-table
                border
                ref="customTable"
                height="250px"
                :data="customMemberList"
                style="width:100%"
                @selection-change="handleSelectionChange"
                empty-text="您尚未添加社群。"
                v-if="customGroupInfo.guid"
              >
                <el-table-column
                  align="center"
                  type="selection"
                  width="120">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="name"
                  label="社群名称"
                >
                </el-table-column>
              </el-table>
              <ob-list-empty top="32px" text="您尚未添加社群" size="small" v-if="!customGroupInfo.guid&&!loading"></ob-list-empty>
            </div>
        </div>
      </div>
    <ob-dialog-form
      ref="customForm"
      @remote-submit="remoteSubmit"
      multiple
      :disabled-keys="disabledKeys"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
  import {customType,arrayUnique } from '@/utils'
  import { mapState} from 'vuex'
  export default {
    name: "custom",
    data() {
      return {
        notHave: false,
        dialogFormVisible: false,
        dialogOptions: {
          title: '添加社群',
          type: 'group'
        },
        currentKey: '',
        customGroupInfo: {
          guid: "",
          name: "",
          type: 1,
          description: ''
        },
        customMemberList: [
        ],
        customGroupList: [],
        selectList: [],
        searchEmpty:false
      }
    },
    methods: {
      // 搜索
      remoteSearch(val) {
        this.searchEmpty = false;
        if(val){
          this.$http("/groupCustom/info/search", {searchText: val}).then(res => {
            if(this.customGroupList.length){
              if (res.data[0]) {
                let current = res.data[0];
                this.setData(current);
                this.$nextTick(() => {
                  this.$refs.customGroup.setCurrentKey(current.guid);
                });
                this.$refs.customGroup.setCheckedKeys(res.data.map(item => item.guid))
              }else {
                this.searchEmpty = true;
                this.setDefaultData();
              }
            }
          })
        }else {
          this.setDefaultData();
        }
      },
      setDefaultData(){
        let current = this.customGroupList[0];
        this.setData(current);
        this.$refs.customGroup.setCheckedKeys([]);
        this.$nextTick(() => {
          this.$refs.customGroup.setCurrentKey(current.guid || current.groupGuid);
        });
      },
      remoteSubmit(data) {
        this.addMember(data)
      },
      // 当前选中值变化
      currentChange(data) {
        this.setData(data)
      },
      setData(data) {
        this.customGroupInfo = data;
        this.getMemberList(data.guid)
      },
      customType(type, txt) {
        return customType(type, txt)
      },
      // 设置多选项值
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 添加成员
      addMember(keys) {
        let subData = [];

        keys = arrayUnique(keys,'groupGuid');
        keys.filter(item => !item.disabled).map(item => {
          subData.push({
            groupGuid: item.groupGuid,
            groupName: item.groupNickName,
            groupCustomGuid: this.customGroupInfo.guid
          })
        });
        if (keys.length) {
          this.dialogFormVisible = false;
          this.$http("/groupCustom/member/add", {groupCustomMemberInfo: subData}).then(res => {
            this.$tip("添加成功");
            this.getMemberList()
          })
        } else {
          this.$tip('请选取要添加的社群','error')
        }
      },
      // 删除成员
      deleteMember() {
        if (!this.selectList.length) {
          this.$tip("请选择要移除的社群");
          return
        }
        this.$affirm({text: `确定将所选社群从分组【${this.customGroupInfo.name}】中移除？`}, (action, instance, done) => {
          if (action === 'confirm') {
            let ids = this.selectList.map(item => item.guid).toString();
            this.$http("/groupCustom/member/remove", {
              groupGuids: ids,
              groupCustomGuid: this.customGroupInfo.guid
            }).then(res => {
              this.$tip("移除成功");
              this.getMemberList()
            });

            done()
          } else {
            done()
          }
        })
      },
      // 删除分组
      deleteGroup() {
        this.$affirm({text: `确认删除【${this.customGroupInfo.name}】分组？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/groupCustom/delete", {groupCustomGuid: this.customGroupInfo.guid}).then(res => {
              this.$tip("删除成功");
              this.customGroupInfo = {};
              this.getCustomGroupList()
            });
            done()
          } else {
            done()
          }
        })
      },
      // 获取自定义分组列表
      getCustomGroupList() {
        this.$http("/groupCustom/list").then(res => {
          this.customGroupList = res.data;
          this.$store.state.loading = false;
          if (res.data[0]) {
            this.$nextTick(() => {
              this.$refs.customGroup.setCurrentKey(res.data[0].guid);
            });
            this.setData(res.data[0]);
          }
        })
      },
      // 获取自定义分组成员列表
      getMemberList(id) {
        id = id || this.customGroupInfo.guid;
        if (!id) {
          this.$tip("请选取分组");
          return false
        }
        this.$http("/groupCustom/member/info", {groupCustomGuid: id}).then(res => {
          this.customMemberList = res.data;
          this.$store.state.loading = false;
        })
      }
    },
    created() {
      this.getCustomGroupList()
    },
    computed: {
      disabledKeys: {
        get() {
          return this.customMemberList.map(item => item.guid)
        },
        set(val) {
          this.customMemberList = val
        }
      },
      ...mapState(["loading"])
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/community.scss";
  .search-empty{
    height: 20px;
    line-height: 18px;
    padding: 0 20px 0 40px;
    font-size:12px ;
    margin-top: -6px;
    color: #F87F21;
  }
</style>
