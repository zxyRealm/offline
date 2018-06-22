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
      <div class="community-mine--inner">
        <div class="community-mine-sidebar dashed-border">
          <div class="btn-wrap">
            <el-button class="affirm medium">加入</el-button>
            <el-button class="affirm medium">创建</el-button>
          </div>
          <uu-sub-tab
            size="small"
            search
            @remote-search="remoteSearch"
            :menu-array="[{title:'自有社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
          <ob-group-nav
            type="community"
            @current-change="currentChange"></ob-group-nav>
        </div>
        <div class="community-mine-main">
          <div class="cmm-top dashed-border">
            <h2 class="cmm-sub-title">
              <span>社群信息</span>
              <p class="handle fr fs14">
                <a href="javascript:void (0)" class="danger mr-10">解散</a>
                <a href="javascript:void (0)">编辑</a>
              </p>
            </h2>
            <div class="cm-info-wrap">
              <div class="info-detail">
                <p>
                  <span class="fs14">社群名称：</span>
                  {{communityInfo.name}}

                </p>
                <p>
                  <span class="fs14">地区：</span>
                  {{communityInfo.address}}</p>
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
            <el-table
              border
              :data="tableData"
              style="width:100%"
            >
              <el-table-column
                prop="date"
                label="设备别名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="序列号"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="设备类型"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="添加时间"
              >
                <template slot-scope="scope">
                  {{scope.row.time|parseTime('{y}/{m}/{d} {h}:{i}')}}
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="绑定时间"
              >
                <template slot-scope="scope">
                  {{scope.row.time|parseTime('{y}/{m}/{d} {h}:{i}')}}
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
        communityInfo: {}
      }
    },
    methods: {
      getGroupList(keywords) {
        keywords = keywords || '';
        this.$http("/group/list", {searchText: keywords}).then(res => {
          this.groupList = res.data;
          this.notHave = false;
        })
      },
      remoteSearch(val){
        console.log(val)
      },
      currentChange(val){
        this.getCommunityInfo(val.groupGuid)
      },
      getCommunityInfo(guid){
        this.$http("/group/getInfo",{guid:guid}).then(res=>{
          this.communityInfo = res.data;
          if(res.data.code){
            this.$createQRCode(res.data.code,'qr-code')
          }
        })
      }
    },
    created() {
      this.getGroupList()
    },
    computed: {
      currentRule: function () {
        return (this.communityInfo.rule || '').split(",").length === 1 ? '数据查看权限' : '数据查看权限、设备操作权限'
      }
    }

  }
</script>

<style lang="scss" scoped>
  .community-mine--inner {
    position: relative;
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    .community-mine-sidebar {
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
    .community-mine-main {
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
          padding: 20px 40px;
          box-sizing: border-box;
          .info-detail {
            float: left;
            p {
              line-height: 30px;
            }
          }
          .info-qr-code {
            float: right;
            text-align: center;
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
