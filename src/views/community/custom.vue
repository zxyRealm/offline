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
            <el-button class="affirm medium" @click="$router.push('/community/create')">创建</el-button>
          </div>
          <uu-sub-tab
            size="small"
            search
            @remote-search="remoteSearch"
            :menu-array="[{title:'自有社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
          <!--<ob-group-nav-->
            <!--v-model="groupList"-->
            <!--type="community"-->
            <!--:current-key="currentKey"-->
            <!--@current-change="currentChange"></ob-group-nav>-->
        </div>
        <div class="community--main">
          <div class="cmm-top dashed-border">
            <h2 class="cmm-sub-title">
              <span>分组详情</span>
              <p class="handle fr fs14">
                <a href="javascript:void (0)" class="danger mr-10" >解散</a>
                <router-link :to="'/community/edit/'">编辑</router-link>
              </p>
            </h2>
            <!--<div class="cm-info-wrap">-->
              <!--<div class="info-detail">-->
                <!--<p  v-if="isSon">-->
                  <!--<span class="fs14">社群昵称：</span>-->
                  <!--<el-popover-->
                    <!--placement="top"-->
                    <!--v-model="nickNamePopover"-->
                    <!--trigger="click">-->
                    <!--<el-form-->
                      <!--@submit.native.prevent-->
                      <!--ref="nickNameForm"-->
                      <!--:rules="rules"-->
                      <!--class="table-form common-form"-->
                      <!--:model="communityForm"-->
                    <!--&gt;-->
                      <!--<el-form-item prop="groupNickName">-->
                        <!--<el-input type="text" v-model="communityForm.groupNickName"></el-input>-->
                        <!--<uu-icon type="success" @click.native="changeCommunityName('nickNameForm')"></uu-icon>-->
                        <!--<uu-icon type="error" @click.native="nickNamePopover = false"></uu-icon>-->
                      <!--</el-form-item>-->
                    <!--</el-form>-->
                    <!--<a href="javascript:void (0)" slot="reference">-->
                      <!--{{communityInfo.groupNickName?communityInfo.groupNickName:'暂无昵称'}}-->
                    <!--</a>-->
                  <!--</el-popover>-->
                <!--</p>-->
                <!--<p>-->
                  <!--<span class="fs14">社群名称：</span>{{communityInfo.name}}-->
                <!--</p>-->
                <!--<p>-->
                  <!--<span class="fs14">地区：</span>-->
                  <!--{{communityInfo.fullAddress}}</p>-->
                <!--<p>-->
                  <!--<span class="fs14">联系人：</span>-->
                  <!--{{communityInfo.contact}}</p>-->
                <!--<p>-->
                  <!--<span class="fs14">联系电话：</span>-->
                  <!--{{communityInfo.phone}}</p>-->
                <!--<p>-->
                  <!--<span class="fs14"> 索权范围：</span>-->
                  <!--{{currentRule}}</p>-->
              <!--</div>-->
              <!--<div class="info-qr-code">-->
                <!--<div>社群邀请码：</div>-->
                <!--<div>-->
                  <!--<div class="qr-code" id="qr-code"></div>-->
                  <!--<p>{{communityInfo.code}}</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="cmm-table dashed-border">
            <h2 class="cmm-sub-title">社群列表</h2>
            <div class="no-data-community small">
              您尚未添加社群
            </div>
            <!--<el-table-->
              <!--border-->
              <!--:data="deviceList"-->
              <!--style="width:100%"-->
              <!--v-else-->
            <!--&gt;-->
              <!--<el-table-column-->
                <!--prop="deviceName"-->
                <!--label="设备别名"-->
                <!--width="180">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="deviceKey"-->
                <!--label="序列号"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="deviceType"-->
                <!--label="设备类型"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.deviceType|deviceType}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--label="添加时间"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.createTime|parseTime('{y}/{m}/{d} {h}:{i}')}}-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="绑定时间"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->
                  <!--{{scope.row.bindingTime|parseTime('{y}/{m}/{d} {h}:{i}')}}-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
    export default {
        name: "custom",
      data(){
          return{
            notHave:false
          }
      },
      methods:{
        remoteSearch(){

        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/styles/community.scss";
</style>
