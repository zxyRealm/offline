<template>
  <div class="community-mine-wrap">
    <template v-if="notHave">
      <uu-sub-tab
        show-button
        :sub-btn="{text:'创建'}"
        @handle-btn="$router.push('/community/create')"
      ></uu-sub-tab>
      <div class="no-data-community">
        您还没有创建社群。
      </div>
    </template>
    <template v-else>
      <div class="community--inner">
        <div class="community--sidebar dashed-border">
          <div class="btn-wrap">
            <el-button disabled class="affirm medium">加入</el-button>
            <el-button class="affirm medium" @click="$router.push('/community/custom/create')">创建</el-button>
          </div>
          <uu-sub-tab
            size="small"
            search
            @remote-search="remoteSearch"
            :menu-array="[{title:'自有社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
        </div>
        <div class="community--main">
          <div class="cmm-top dashed-border">
            <h2 class="cmm-sub-title">
              <span>分组详情</span>
              <p class="handle fr fs14">
                <a href="javascript:void (0)" class="danger mr-10" @click="deleteGroup">删除</a>
                <router-link :to="'/community/custom/edit/26241D572B924A3E9008A95904C27551'">编辑</router-link>
              </p>
            </h2>
            <div class="cm-info-wrap custom">
              <div class="info-detail">
                <p>
                  <span class="fs14">分组名称：</span>{{customCommunityInfo.name}}
                </p>
                <p>
                  <span class="fs14">分组类型：</span>
                  <el-radio disabled :custom-type="customType(customCommunityInfo.type)"
                            label=""
                  >
                    {{customCommunityInfo.type|customType(true)}}
                  </el-radio>
                </p>
                <p>
                  <span class="fs14">分组描述：</span>
                  {{customCommunityInfo.description}}</p>
              </div>
            </div>
          </div>
          <div class="cmm-table dashed-border">
            <h2 class="cmm-sub-title">
              <span>社群列表</span>
              <p class="handle fr fs14">
                <a href="javascript:void (0)" class="danger mr-10" @click="deleteMember">移除</a>
                <a href="javascript:void(0)" @click="dialogFormVisible=true">添加</a>
              </p>
            </h2>
            <!--<div v-if="!customCommunityList.length"  class="no-data-community small">-->
            <!--您尚未添加社群-->
            <!--</div>-->

            <el-table
              border
              ref="customTable"
              height="230px"
              :data="customCommunityList"
              style="width:100%"
              @selection-change="handleSelectionChange"
              empty-text="您尚未添加社群。"
            >
              <el-table-column
                align="center"
                type="selection"
                width="120">
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="name"
                label="社群名称"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </template>
    <ob-dialog-form
      @remote-submit="remoteSubmit"
      multiple
      keys
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
  import {customType} from '@/utils'

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
        customCommunityInfo: {
          name:'余杭分店',
          type:1,
          description:'餐饮人流统计'
        },
        customCommunityList: [
          {name: '余杭分店'},
          {name: '余杭分店'},
          {name: '余杭分店'},
          {name: '余杭分店'},
          {name: '余杭分店'},
          {name: '余杭分店'}
        ],
        selectList: []
      }
    },
    methods: {
      remoteSearch() {

      },
      remoteSubmit(data) {
        console.log('array', data)
      },
      customType(type, txt) {
        return customType(type, txt)
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      deleteMember() {
        if (this.selectList.length) {
          this.$tip("请选择要移除的社群");
          return
        }
        this.$affirm({text: `确认将选中社群移除【${this.customCommunityInfo.name}】分组？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$tip("移除分组");
            done()
          } else {
            done()
          }
        })
      },
      // 删除分组
      deleteGroup() {
        this.$affirm({text: `确认删除【${this.customCommunityInfo.name}】分组？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$tip("删除分组");
            done()
          }else {
            done()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/community.scss";
</style>
