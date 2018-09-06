<template>
  <div class="community-mine-wrap">
    <template v-if="!groupList.length && !loading">
      <uu-sub-tab
        show-button
        :sub-btn="{text:'创建'}"
        @handle-btn="$router.push('/community/create')"
      ></uu-sub-tab>
      <ob-list-empty top="70px" text="您还没有创建社群"></ob-list-empty>
    </template>
    <template v-show="groupList.length">
      <div class="community--inner">
        <div class="community--sidebar dashed-border">
          <div class="btn-wrap">
            <el-button class="affirm medium" @click="$router.push('/community/join')">加入</el-button>
            <el-button class="affirm medium" @click="$router.push('/community/create')">创建</el-button>
          </div>
          <uu-sub-tab
            size="small"
            search
            placeholder="快速查找社群"
            @remote-search="remoteSearch"
            :menu-array="subMenu"></uu-sub-tab>
          <p class="search-empty">{{searchEmpty?'未查询到结果':''}}</p>
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
                <span>社群信息</span>
                <p class="handle fr fs14" v-if="!isSon && communityInfo.guid">
                  <a href="javascript:void (0)" class="danger mr-10" @click="disbandGroup">解散</a>
                  <router-link :to="'/community/edit/'+communityInfo.guid">编辑</router-link>
                </p>
              </h2>
              <div class="cm-info-wrap" v-show="communityInfo.guid">
                <div class="info-detail">
                  <p v-if="isSon">
                    <span class="fs14">备注名：</span>
                    <el-popover
                      popper-class="nick_name--popover"
                      placement="top"
                      @show="showPopover"
                      @hide="hidePopover"
                      v-model="nickNamePopover"
                      trigger="click">
                      <el-form
                        @submit.native.prevent
                        ref="nickNameForm"
                        :rules="rules"
                        class="table-form"
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
                    {{communityInfo.rule | authority }}</p>
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
            <div
              class="dashed-border cmm-table"
              :class="{'mine--table__wrap':!communityInfo.groupPid}"
              :style="{height: !communityInfo.groupPid?tableHeight+68+'px':''}">
              <h2 class="cmm-sub-title">设备列表</h2>
              <ob-list-empty top="32px" v-if="!deviceList.length" size="small" text="没有可以查看的设备">
              </ob-list-empty>
              <el-scrollbar :style="{height: tableHeight+'px'}" class="table--scrollbar__warp" ref="faceScrollItemTable" :class="deviceList.length <= 5 ? 'lwh-scroll': ''" v-else>
                <el-table
                  border
                  :data="deviceList"
                >
                  <el-table-column
                    prop="deviceName"
                    label="设备别名"
                    show-overflow-tooltip
                    width="180">
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
            <!-- lwh-识别人脸库 -->
            <face-recognition-store :guid="communityInfo.guid" :deviceList="deviceList"
                                    v-if="!(communityInfo.groupPid)"></face-recognition-store>
          </el-scrollbar>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {uniqueKey} from '@/utils/index'
import FaceRecognition from '@/components/screening/FaceRecognition'
import VisitedDetailInfo from './VisitedDetailInfo.vue'
import FaceRecognitionStore from './FaceRecognitionStore'
import {eventObject} from '@/utils/event'
import {validateRule} from '@/utils/validate'

export default {
  components: {
    FaceRecognitionStore,
    VisitedDetailInfo,
    FaceRecognition
  },
  name: 'index',
  data () {
    const validateName = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error('请输入备注名'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          if (this.originName === value) {
            callback(new Error('备注名已存在'))
          } else {
            this.$http('/group/nickNameExist', {groupNickName: value},
              false).then(res => {
              !res.data ? callback() : callback(new Error('备注名已存在'))
            }).catch(err => {
              callback(err.msg || '验证失败')
            })
          }
        } else {
          callback(new Error('请输入正确的备注名'))
        }
      }
    }
    return {
      subMenu: [
        {title: '我的社群', index: '/community/mine'},
        {title: '自定义分组', index: '/community/custom'}
      ],
      originName: '',
      groupList: [], // 社群列表
      tableData: [],
      deviceList: [], // 社群设备列表
      communityInfo: {}, // 社群信息
      currentKey: '', // 当前选中社群id
      currentCommunity: '', // 当前社群信息
      communityForm: {
        groupPid: '',
        groupGuid: '',
        groupNickName: ''
      },
      rules: {
        groupNickName: [
          {required: true, validator: validateName, trigger: 'blur'}
        ]
      },
      nickNamePopover: false,
      expandedKeys: [],
      searchEmpty: false,
      keepAlive: false
    }
  },
  methods: {
    // 获取社群列表 （添加自定义唯一key）
    getGroupList (keywords, key) {
      keywords = (keywords || '').trim()
      this.$http('/group/list').then(res => {
        this.groupList = uniqueKey(res.data)
        if (!key && !res.data[0]) {
          return
        }
        // 编辑页返回时记住当前页状态
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentCommunity : false) || key || res.data[0]
        this.$nextTick(() => {
          this.$refs.groupNav.setCurrentKey(currentNode.uniqueKey)
        })
        this.getCommunityInfo(currentNode)
        this.getDeviceList(currentNode)
        this.$route.meta.keepAlive = false
      })
    },
    // 获取设备列表
    getDeviceList (val) {
      let url = !val.groupPid ? '/group/device ' : '/device/guid/list'
      if (val.groupGuid) {
        this.$http(url, {guid: val.groupGuid}).then(res => {
          this.deviceList = res.data.content || res.data || []
          this.$store.state.loading = false
          // 触发传递设备列表到人脸识别库搜索组件上
          eventObject().$emit('FaceRecognition', this.deviceList)
        })
      }
    },
    // 搜索社群
    remoteSearch (val) {
      this.searchEmpty = false
      if (val) {
        this.$http('/group/list/search', {searchText: val}).then(res => {
          if (res.data[0]) {
            let restoreArray = this.$restoreArray(this.groupList, 'childGroupList')
            let getCurrent = () => {
              // 多层for循环嵌套只能用return跳出整个循环，break 只能跳出当前循环
              for (let i = 0, len = restoreArray.length; i < len; i++) {
                for (let k = 0, len2 = res.data.length; k < len2; k++) {
                  if (res.data[k] === restoreArray[i].groupGuid) {
                    return restoreArray[i]
                  }
                }
              }
            }
            // 数组去重
            let setKey = new Set(res.data)
            let setArr = []
            // 获取匹配值列表
            restoreArray.map(item => {
              if (setKey.has(item.groupGuid)) {
                setArr.push(item.uniqueKey)
              }
            })
            let current = getCurrent()
            this.expandedKeys = setArr
            this.$refs.groupNav.setCheckedKeys(setArr)
            this.$nextTick(() => {
              this.$refs.groupNav.setCurrentKey(current.uniqueKey)
            })
            this.getCommunityInfo(current)
            this.getDeviceList(current)
          } else {
            this.searchEmpty = true
            this.setDefaultData()
          }
        })
      } else {
        this.setDefaultData()
      }
    },

    // 初始化默认选中值
    setDefaultData () {
      let current = this.groupList[0]
      this.expandedKeys = []
      this.$nextTick(() => {
        this.$refs.groupNav.setCurrentKey(current.uniqueKey)
      })
      this.$refs.groupNav.setCheckedKeys([])
      this.getCommunityInfo(current)
      this.getDeviceList(current)
    },
    // 当前社群发生改变
    currentChange (val) {
      this.currentCommunity = val
      this.hidePopover()
      this.getCommunityInfo(val)
      this.getDeviceList(val)
    },
    // 获取社群详细信息
    getCommunityInfo (val) {
      this.$http('/group/getInfo', {guid: val.groupGuid}).then(res => {
        if (res.data) res.data.groupPid = val.groupPid
        res.data.groupNickName = val.groupNickName || (this.currentCommunity || this.groupList[0]).groupNickName
        if (res.data.groupPid) this.originName = JSON.parse(JSON.stringify(res.data.groupNickName))
        this.communityInfo = res.data || {}
        if (res.data) {
          this.$createQRCode(res.data.code, 'qr-code')
        }
      })
    },
    // 解散社群
    disbandGroup () {
      this.$affirm({text: `确认解散【<span class="maxw200 ellipsis">${this.communityInfo.name}</span>】社群？`}, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http('/group/disbandGroup', {guid: this.communityInfo.guid}).then(res => {
            this.$tip('解散成功')
            this.getGroupList()
          })
          done()
        } else {
          done()
        }
      })
    },
    // 修改子社群备注名
    changeCommunityName (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.communityForm))
          subData.groupGuid = this.communityInfo.guid
          subData.groupPid = this.communityInfo.groupPid
          this.$http('/group/nickName/update', subData).then(res => {
            this.$tip('修改成功')
            this.currentCommunity.groupNickName = subData.groupNickName
            this.hidePopover()
            this.getGroupList('', {
              groupGuid: this.communityInfo.guid,
              groupPid: this.communityInfo.groupPid,
              uniqueKey: this.currentCommunity.uniqueKey
            })
          })
        } else {
          console.log('error submit')
        }
      })
    },
    // 显示修改昵称表单时回显昵称
    showPopover () {
      this.communityForm.groupNickName = this.communityInfo.groupNickName
    },
    // 隐藏修改备注名表单  清空表单数据
    hidePopover () {
      if (this.$refs.nickNameForm) {
        this.$refs.nickNameForm.resetFields()
      }
      if (this.nickNamePopover) this.nickNamePopover = false
    }
  },
  created () {
    this.getGroupList()
  },
  computed: {
    isSon: function () {
      return Boolean(this.communityInfo.groupPid)
    },
    ...mapState(['loading', 'aliveState']),
    tableHeight () {
      return this.deviceList.length ? (this.deviceList.length >= 5 ? 246 : (this.deviceList.length + 1) * 41) : 60
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_ALIVE_STATE', {currentCommunity: this.currentCommunity || this.groupList[0]})
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .community--main {
    height: 100%;
    > .el-scrollbar {
      height: 100%;
      > .el-scrollbar__wrap {
        background-color: #232027;
      }
    }
    > .is-horizontal {
      display: none;
    }
    .mine--table__wrap{
      margin-bottom: 20px;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .el-scrollbar__wrap {
    overflow: auto;
  }
</style>
<style lang="scss" scoped>
  @import "@/styles/community.scss";
  .search-empty {
    height: 20px;
    line-height: 18px;
    padding: 0 20px 0 40px;
    font-size: 12px;
    margin-top: -6px;
    color: #F87F21;
  }
  .mine--table__wrap{
    padding: 20px;
    margin-bottom: 10px;
  }
  .community--inner {
    .community--main {
      overflow-y: auto;
      .cmm-table {
        /*height: 0;*/
      }
    }
  }
</style>
