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
            <el-button class="affirm medium" @click="$router.push('/community/join')">加入</el-button>
            <el-button class="affirm medium" @click="$router.push('/community/create')">创建</el-button>
          </div>

          <uu-sub-tab
            size="small"
            search
            @remote-search="remoteSearch"
            :menu-array="[{title:'自有社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
          <ob-group-nav
            v-model="groupList"
            type="community"
            :current-key="currentKey"
            @current-change="currentChange"></ob-group-nav>
        </div>
        <div class="community--main">
          <div class="cmm-top dashed-border">
            <h2 class="cmm-sub-title">
              <span>社群信息</span>
              <p class="handle fr fs14" v-if="!isSon">
                <a href="javascript:void (0)" class="danger mr-10" @click="disbandGroup">解散</a>
                <router-link :to="'/community/edit/'+communityInfo.guid">编辑</router-link>
              </p>
            </h2>
            <div class="cm-info-wrap">
              <div class="info-detail">
                <p  v-if="isSon">
                  <span class="fs14">社群昵称：</span>
                  <el-popover
                    placement="top"
                    v-model="nickNamePopover"
                    trigger="click">
                    <el-form
                      @submit.native.prevent
                      ref="nickNameForm"
                      :rules="rules"
                      class="table-form common-form"
                      :model="communityForm"
                    >
                      <el-form-item prop="groupNickName">
                        <el-input type="text" v-model="communityForm.groupNickName"></el-input>
                        <uu-icon type="success" @click.native="changeCommunityName('nickNameForm')"></uu-icon>
                        <uu-icon type="error" @click.native="nickNamePopover = false"></uu-icon>
                      </el-form-item>
                    </el-form>
                    <a href="javascript:void (0)" slot="reference">
                      {{communityInfo.groupNickName?communityInfo.groupNickName:'暂无昵称'}}
                    </a>
                  </el-popover>
                </p>
                <p>
                  <span class="fs14">社群名称：</span>{{communityInfo.name}}
                </p>
                <p>
                  <span class="fs14">地区：</span>
                  {{communityInfo.fullAddress}}</p>
                <p>
                  <span class="fs14">联系人：</span>
                  {{communityInfo.contact}}</p>
                <p>
                  <span class="fs14">联系电话：</span>
                  {{communityInfo.phone}}</p>
                <p>
                  <span class="fs14"> 索权范围：</span>
                  {{currentRule}}</p>
              </div>
              <div class="info-qr-code">
                <div>社群邀请码：</div>
                <div>
                  <div class="qr-code" id="qr-code"></div>
                  <p>{{communityInfo.code}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cmm-table dashed-border">
            <h2 class="cmm-sub-title">设备列表</h2>
            <div class="no-data-community small" v-if="!deviceList.length">
              没有可查看设备
            </div>
            <el-table
              border
              :data="deviceList"
              style="width:100%"
              v-else
            >
              <el-table-column
                prop="deviceName"
                label="设备别名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="deviceKey"
                label="序列号"
              >
              </el-table-column>
              <el-table-column
                prop="deviceType"
                label="设备类型"
              >
                <template slot-scope="scope">
                  {{scope.row.deviceType|deviceType}}
                </template>
              </el-table-column>
              <el-table-column
                label="添加时间"
              >
                <template slot-scope="scope">
                  {{scope.row.createTime|parseTime('{y}/{m}/{d} {h}:{i}')}}
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="绑定时间"
              >
                <template slot-scope="scope">
                  {{scope.row.bindingTime|parseTime('{y}/{m}/{d} {h}:{i}')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        notHave: true,
        groupList: [],
        tableData: [],
        deviceList:[],
        communityInfo: {},
        currentKey:'',
        communityForm:{
          groupPid:'',
          groupGuid:'',
          groupNickName:''
        },
        rules:{
          groupNickName:[
            { required: true, message: '请输入社群昵称', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ]
        },
        nickNamePopover:false
      }
    },
    methods: {
      // 获取社群列表
      getGroupList(keywords,key) {
        keywords = keywords || '';
        this.$http("/group/list", {searchText: keywords}).then(res => {
          this.currentKey = (key || res.data[0]).groupGuid;
          this.getCommunityInfo(key || res.data[0]);
          this.getDeviceList(this.currentKey);
          this.groupList = res.data;
          this.notHave = false;
        })
      },
      // 获取设备列表
      getDeviceList(gid){
        this.$http("/device/guid/list",{guid:gid}).then(res=>{
          this.deviceList = res.data.content || []
        })
      },
      // 搜索社群
      remoteSearch(val){
        console.log(val)
      },
      // 当前社群发生改变
      currentChange(val){
       this.insetForm();
       this.getCommunityInfo(val);
        this.getDeviceList(val.groupGuid)
      },
      // 获取社群详细信息
      getCommunityInfo(val){
        this.$http("/group/getInfo",{guid:val.groupGuid}).then(res=>{
          res.data?res.data.groupPid = val.groupPid:'';
          this.communityInfo = res.data || {};
          if(res.data){
            this.$createQRCode(res.data.code,'qr-code')
          }
        })
      },
      // 解散社群
      disbandGroup(){
        this.$affirm({text:`确认解散【${this.communityInfo.name}】社群？`},(action,instance,done)=>{
          if(action==='confirm'){
            this.$http("/group/disbandGroup",{guid:this.communityInfo.guid}).then(res=>{
              this.$tip("解散成功");
              this.getGroupList()
            });
            done()
          }else {
            done()
          }
        });

      },
      // 修改社群昵称
      changeCommunityName(formName){
        this.$refs[formName].validate(valid=>{
          if(valid){
            let subData = JSON.parse(JSON.stringify(this.communityForm));
            subData.groupGuid = this.communityInfo.guid;
            subData.groupPid = this.communityInfo.groupPid;
            this.$http('/group/nickName/update',subData).then(res=>{
              this.$tip("昵称修改成功");
              this.insetForm();
              this.getGroupList('',{groupGuid:this.communityInfo.guid,groupPid:this.communityInfo.groupPid})
            })
          }else {
            console.log('error submit')
          }
        })
      },
      insetForm(){
        this.nickNamePopover = false;
        if(this.$refs.nickNameForm){
          this.$nextTick(()=>{
            this.$refs.nickNameForm.resetFields()
          })
        }
      }
    },
    created() {
      this.getGroupList()
    },
    computed: {
      currentRule: function () {
        return (this.communityInfo.rule || '').split(",").length === 1 ? '数据查看权限' : '数据查看权限、设备操作权限'
      },
      isSon:function () {
        return Boolean(this.communityInfo.groupPid)
      }
    },
    watch:{
      groupList:function (val) {
        console.log('grouplist',val)
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "@/styles/community.scss";
  .community--inner {
    position: relative;
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    .community--sidebar {
      float: left;
      width: 230px;
      height: 100%;
      .ob-group-nav{
        padding: 0 20px;
        .el-tree-node__content{
          /*padding: 0 20px!important;*/
        }
      }
      .btn-wrap {
        margin: 20px 20px 10px;
      }
    }
    .community--main {
      height: 100%;
      margin-left: 250px;
      .cmm-top, .cmm-table {
        padding: 20px;
        box-sizing: border-box;
      }
      .cmm-top {
        height: 260px;
        margin-bottom: 20px;
        .cm-info-wrap {
          font-size: 12px;
          padding: 0 40px;
          box-sizing: border-box;
          height: 189px;
          .info-detail {
            float: left;
            p {
              line-height: 30px;
            }
          }
          .info-qr-code {
            float: right;
            text-align: center;
            margin-top:20px;
            > div {
              display: inline-block;
              vertical-align: middle;
            }
            .qr-code {
              width: 84px;
              height: 84px;
              padding: 5px;
              box-sizing: border-box;
              margin-bottom: 10px;
              background: #fff;
            }
          }
        }
      }
      .cmm-table {
        height: 300px;
      }
      .cmm-sub-title {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
  }

</style>
