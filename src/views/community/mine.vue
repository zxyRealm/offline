<template>
    <div class="mine__community--wrap">
      <uu-sub-tab
        search
        show-button
        btn-size="small"
        :show-popover="showPopover"
        popover="社群添加点这里"
        :sub-btn="{text: '创建社群'}"
        @handle-btn="() =>  createFormVisible = true"
        @remote-search="search"
        placeholder="输入社群名称"
        :btn-array="[{text: '创建社群'}]"
        :menu-array="[{title: '我的社群'}]">
      </uu-sub-tab>
      <div class="mine__community--main" :class="{'data-empty': !groupList.length || searchEmpty}">
        <ob-list-empty v-if="!groupList.length || searchEmpty" top="70px" :supply="supply" :text="tipMsg"></ob-list-empty>
        <div class="mine__community--content" v-else>
          <div class="community--sidebar dashed-border">
            <ob-group-nav
              ref="groupNav"
              only-checked
              node-key="uniqueKey"
              :expanded-keys="expandedKeys"
              v-model="groupList"
              type="community"
              @refresh="getGroupList"
              @current-change="currentChange"></ob-group-nav>
          </div>
          <div class="community--main">
            <el-scrollbar ref="faceScrollItem">
              <div class="cmm-top dashed-border">
                <h2 class="cmm-sub-title">
                  <span>{{communityInfo.name}}{{communityInfo.nickName?`(${communityInfo.nickName})`:''}}
                    <a slot="reference" class="fs12" @click="showDialog" href="javascript:void (0)">
                      <i class="el-icon-edit"></i>{{dialogTitle}}
                    </a>
                  </span>
                  <p class="handle fr fs14" v-if="!isSon && communityInfo.guid">
                    <router-link :to="'/community/edit/'+communityInfo.guid">编辑</router-link>
                    <a href="javascript:void (0)" class="danger ml20" @click="disbandGroup">删除</a>
                  </p>
                </h2>
                <div class="cm-info-wrap" v-show="communityInfo.createTime">
                  <div class="info-detail">
                    <!--<p v-if="isSon">-->
                      <!--<span class="fs14">备注名：</span>-->
                      <!--<el-popover-->
                        <!--popper-class="nick_name&#45;&#45;popover"-->
                        <!--placement="top"-->
                        <!--@show="showPopover"-->
                        <!--@hide="hidePopover"-->
                        <!--v-model="nickNamePopover"-->
                        <!--trigger="click">-->
                        <!--<el-form-->
                          <!--@submit.native.prevent-->
                          <!--ref="nickNameForm"-->
                          <!--:rules="rules"-->
                          <!--class="table-form"-->
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
                    <p>
                      <span class="">社群名称：</span>{{communityInfo.name}}
                    </p>
                    <p>
                      <span class="">联系电话：</span>
                      {{communityInfo.phone}}</p>
                    <p>
                      <span class="">地区：</span>
                      {{communityInfo.fullAddress}}</p>
                    <p>
                      <span class="">联系人：</span>
                      {{communityInfo.contact}}</p>
                    <p v-if="communityInfo.role === 0">
                      <span class=""> 索权范围：</span>
                      {{communityInfo.rule | authority }}</p>
                    <p v-if="communityInfo.role === 0">
                      <span class=""> 邀请码：</span>
                      {{communityInfo.code}}
                      <a href="javascript:void (0)">复制</a>
                    </p>
                    <div v-if="communityInfo.role === 1">
                      已加入：
                      <div
                        v-if="communityInfo.parentGroups"
                        v-for="(item,$index) in communityInfo.parentGroups"
                        :key="$index"
                        class="parents-item">
                        <span>{{'hhhh'}}</span>
                        <!--<img height="12" src="/static/img/data_icon@2x.png" alt="">-->
                        <!--<img height="12" src="/static/img/manage_icon@2x.png" alt="">-->
                        <uu-icon type="handle"></uu-icon>
                        <uu-icon type="data"></uu-icon>
                        <uu-icon size="mini" type="quit" @click="leaveCommunity('exit',communityInfo, item)"></uu-icon>
                        <!--<img height="12" src="@/assets/public/icons/back_higher_icon.png/" alt="">-->
                      </div>
                    </div>
                  </div>
                  <div class="fr">
                    <el-button
                      v-if="communityInfo.role === 0"
                      class="affirm"
                      @click="$router.push({path: '/community/apply',query: {pid: communityInfo.guid}})">创建自有子社群</el-button>
                    <el-button
                    v-if="communityInfo.role === 1"
                    class="affirm"
                    @click="$router.push({path: '/community/apply',query: {pid: communityInfo.guid}})">加入其他管理员社群</el-button>
                  </div>
                </div>
              </div>
              <div
                class="dashed-border cmm-table"
                :class="{'mine--table__wrap':!communityInfo.groupPid}">
                <h2 class="cmm-sub-title">设备列表</h2>
                <!--<ob-list-empty top="32px" v-if="!deviceList.length" size="small" text="没有可以查看的设备">-->
                <!--</ob-list-empty>-->
                <el-scrollbar class="table--scrollbar__warp" ref="faceScrollItemTable">
                  <el-table
                    border
                    :data="deviceList"
                  >
                    <el-table-column
                      prop="deviceName"
                      label="设备别名"
                      show-overflow-tooltip
                      width="140">
                    </el-table-column>
                    <el-table-column
                      prop="deviceKey"
                      label="序列号"
                      width="140px"
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
                      show-overflow-tooltip
                      prop="groupName"
                      label="绑定社群"
                    >
                      <!--<template slot-scope="scope">-->
                        <!--{{scope.row.deviceType|deviceType}}-->
                      <!--</template>-->
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
                </el-scrollbar>
              </div>
              <!-- lwh-识别人脸库   v-if="!(communityInfo.groupPid)"-->
              <face-recognition-store
                :guid="communityInfo.guid"
                :deviceList="deviceList"
                v-if="!communityInfo.groupPid">
              </face-recognition-store>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <!--修改社群昵称-->
      <ob-dialog-form
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          slot="form"
          ref="nameForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="nameForm"
          :rules="rules"
        >
          <el-form-item label="昵称：" prop="name">
            <el-input placeholder="请输入社群昵称" v-model="nameForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="dialogFormVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="setNickName('nameForm')">{{communityInfo.nickName?'加 入':'添 加'}}</el-button>
        </div>
      </ob-dialog-form>
      <!--创建社群-->
      <ob-dialog-form
        width="660px"
        :show-button="false"
        title="请根据实际情况创建一个社群"
        :visible.sync="createFormVisible"
      >
        <div slot="content">
          <div class="create__community--content">
            <div class="cc__content fl">
              <div class="cc-sub-title">
                商场/连锁店
              </div>
              <div class="content__text--wrap">
                <div class="content--text">
                  <p class="g-custom__button" @click="$router.push({path: '/community/create'})">管理员社群</p>
                  1、可生成邀请码，以邀请子社群加入，并查看其客流数据，操作其设备（可选）；<br>
                  2、创建自有子社群；<br>
                  3、添加设备、人员库。
                </div>
                <div class="content--text">
                  <p class="g-custom__button" @click="$router.push({path: '/community/apply'})">子社群</p>
                  1、可通过邀请码加入管理社群，对其开放数据查看权限，设备操作权限（可选）；<br>
                  2、添加设备、人员库。
                </div>
              </div>
            </div>
            <div class="cc__content">
              <div class="cc-sub-title">单店</div>
              <div class="content__text--wrap">
                <div class="content--text">
                <p class="g-custom__button" @click="$router.push({path: '/community/single'})">单店社群</p>
                1、可在社群下查看店内设备、识别人脸库；<br>
                2、添加设备、人员库。
              </div>
              </div>
            </div>
          </div>
        </div>
      </ob-dialog-form>
    </div>
</template>

<script>
import CustomPopover from '@/components/CustomPopover'
import FaceRecognition from '@/components/screening/FaceRecognition'
import VisitedDetailInfo from './VisitedDetailInfo.vue'
import FaceRecognitionStore from './FaceRecognitionStore'
import {eventObject} from '@/utils/event'
import {uniqueKey} from '@/utils/index'
export default {
  name: 'mineCommunity',
  components: {
    CustomPopover,
    FaceRecognitionStore,
    VisitedDetailInfo,
    FaceRecognition
  },
  data: () => ({
    isSon: false, // 是否是子社群
    tipMsg: '暂无社群', // 空数据是页面提示信息
    supply: '',
    searchEmpty: false, // 是否是search状态
    showPopover: false, // 创建社群引导提示显示状态
    groupList: [], // 社群列表
    searchList: [], // 社群搜索结果
    currentCommunity: {}, // 当前社群信息
    communityInfo: {
      guid: '05E71B8A375946528615F8362D750231'
    },
    deviceList: [],
    expandedKeys: [], // 展开项
    rules: {},
    createFormVisible: false, // 创建社群dialog显示状态
    dialogFormVisible: false, // 修改社群昵称dialog 显示状态
    nameForm: {
      name: ''
    }
  }),
  created () {
    this.getGroupList()
  },
  mounted () {
  },
  computed: {
    dialogTitle: {
      get () {
        let txt = '添加昵称'
        if (this.communityInfo.nickName) {
          txt = '编辑昵称'
        }
        return txt
      },
      set () {}
    }
  },
  methods: {
    // 社群搜索
    search (val) {
      console.log(val)
      this.searchEmpty = false
      setTimeout(() => {
        this.searchEmpty = true
        this.tipMsg = `搜不到包含“${val}”的内容啊`
        this.supply = '设备请到左侧［设备管理］中添加'
      }, 1000)
    },
    // 获取社群列表
    getGroupList () {
      this.$http('/group/list').then(res => {
        console.log(res.data)
        this.groupList = res.data || []
      })
    },
    // 获取设备列表
    getDeviceList (val) {
      let url = !val.groupPid ? '/group/device ' : '/device/guid/list'
      let id = val.groupGuid || val.guid
      if (id) {
        this.$http(url, {guid: id}).then(res => {
          this.deviceList = res.data.content || res.data || []
          this.$store.state.loading = false
          // 触发传递设备列表到人脸识别库搜索组件上
          eventObject().$emit('FaceRecognition', this.deviceList)
        })
      }
    },
    // 获取社群详细信息
    getCommunityInfo (val) {
      this.$http('/group/getInfo', {guid: val.groupGuid || val.guid}).then(res => {
        console.log('communityInfo', res.data)
        if (res.data) res.data.groupPid = val.groupPid
        res.data.groupNickName = val.groupNickName || (this.currentCommunity || this.groupList[0]).groupNickName
        if (res.data.groupPid) this.originName = JSON.parse(JSON.stringify(res.data.groupNickName))
        this.communityInfo = res.data || {}
      })
    },
    // 切换
    currentChange (node) {
      console.log(node)
      this.currentCommunity = node
      // this.hidePopover()
      // 查询社群详细信息
      if (node.groupGuid) this.getCommunityInfo(node)
      // 分组信息直接设置，不再查询
      if (node.guid) this.communityInfo = node
      this.getDeviceList(node)
    },
    // 删除社群
    disbandGroup () {
    },
    // 显示修改昵称dialog
    showDialog () {
      this.dialogTitle = '添加昵称'
      if (this.communityInfo.nickName) {
        this.dialogTitle = '编辑昵称'
      }
      this.dialogFormVisible = true
    },
    // 设置昵称
    setNickName (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.nameForm)
        }
      })
    },
    // 离开社群
    leaveCommunity (type, current, parent) {
      // type 可选类型 quit、kick
      let [url, des] = ['/group/exit', '']
      let params = {
        groupPid: parent.guid || parent.groupGuid,
        groupGuid: current.groupGuid,
        groupNickName: current.groupNickName,
        parentGroupNickName: parent.groupNickName || parent.name
      }
      switch (type) {
        case 'quit':
          des = `确定要退出【<span class="maxw200 ellipsis">${params.parentGroupNickName}</span>】社群？`
          url = '/group/exit'
          break
        default:
          des = `移除子社群将失去对该社群设备的数据查看权限/操作权限。<br>
              确定要移除子社群【<span class="maxw200 ellipsis">
              ${params.groupNickName}</span>】？`
          url = '/group/remove'
      }
      this.$affirm({text: `${des}`}, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http(url, params).then(res => {
            this.$tip(`${type === 'quit' ? '退出' : '移除'}成功`)
            this.$emit('refresh')
          })
          done()
        } else {
          done()
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.mine__community--wrap{
  padding: 0 20px;
}
.mine__community--main{
  margin-top: 10px;
  &.data-empty{
    height: calc(100% - 70px);
  }
  .community--sidebar {
    float: left;
    width: 230px;
    height: calc(100vh - 220px);
    .ob-group-nav{
      padding: 20px 16px;
      .el-tree-node__content{
      }
    }
    .btn-wrap {
      margin: 20px 20px 10px;
    }
  }
  .community--main {
    height: 100%;
    margin-left: 242px;
    .el-scrollbar{
      height: 100%;
    }
    .table--scrollbar__warp{
      height: calc(100% - 32px);
    }
    .mine--table__wrap{
      .table--scrollbar__warp{
        height: calc(100% - 297px);
      }
    }

    //自有社群设备列表样式
    //overflow-y: auto;
    .cmm-top, .cmm-table {
      padding: 20px;
      box-sizing: border-box;
    }
    .cmm-top {
      margin-bottom: 10px;
      .cm-info-wrap {
        padding: 28px 0 10px;
        font-size: 12px;
        box-sizing: border-box;
        overflow: hidden;
        &.custom{
          padding: 20px 40px;
          .ellipsis{
            width: auto;
            vertical-align: text-bottom;
            //max-width: 100%;
          }
        }
        .info-detail {
          float: left;
          width: calc(100% - 180px);
          line-height: 1;
          >p{
            float: left;
            width: 50%;
            box-sizing: border-box;
            margin-bottom: 10px;
            &:nth-child(2n + 1) {
              padding-right: 20px;
            }
          }
          .parents-item{
            display: inline-block;
            >*{
              display: inline-block;
              vertical-align: middle;
            }
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
    .cmm-sub-title {
      font-size: 16px;
      padding-bottom: 10px;
      margin-bottom: 8px;
      border-bottom: 1px dashed rgba(151,151,151, 0.1);
    }
    /*识别人脸库*/
    .cmm-table__face{
      margin-top: 10px;
    }
  }
  .cmm-table {
    height: calc(100% - 270px);
    .el-table{
      /*width: calc(100% - 17px);*/
    }
  }
}
.create__community--content{
  overflow: hidden;
  margin-top: -16px;
  margin-bottom: 30px;
  .cc-sub-title{
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
  }
  .cc__content{
    width: 220px;
    height: 184px;
    padding: 2px;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    border-radius: 2px;
    background-image: linear-gradient(-90deg, #8041C6 0%, #2090E4 100%);
    box-sizing: border-box;
    &.fl{
      width: 390px;
      margin-right: 10px;
    }
    .content__text--wrap{
      position: relative;
      height: calc(100% - 30px);
      background: #fff;
      z-index: 9;
    }
    .g-custom__button{
      width: 160px;
      height: 24px;
      line-height: 24px;
      margin-bottom: 8px;
      text-align: center;
      color: #0F9EE9;
      cursor: pointer;
    }
    .content--text{
      display: inline-block;
      width: 160px;
      margin: 20px 10px 0;
      text-align: left;
      font-size: 12px;
      vertical-align: top;
      color: rgba(0,0,0,0.30);
    }
  }
}
</style>
