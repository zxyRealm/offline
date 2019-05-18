/*
* 社群管理主页面
* @author  张晓元
* @date    2019-05-14
*/
<template>
  <div class="community__container--wrap">

    <div class="g-module-title">
      <h1 class="normal title g-inline">社群管理</h1>
    </div>
    <div
      class="content--wrap"
      :class="{'no-sidebar': currentManage.type === 2 }">
      <div class="content--sidebar">
        <group-tree
          :format-list="formatTreeList"
          @current-change="handleCurrentChange"
        ></group-tree>

        <!---------------- 审核社群 ------------->
        <el-popover
          placement="top"
          width="200"
          trigger="click">
          <ul class="audit-list">
            <li
              v-for="(aud, $index) in auditList"
              class="items"
              :key="$index">
              <span class="ellipsis">{{aud.name}}</span>
              <i class="g-success">通过</i>
              <i class="g-danger">拒绝</i>
            </li>
          </ul>
          <div
            slot="reference"
            class="community-auditing"
            :class="{active: unAuditingCount}">
            待审核的社群（{{unAuditingCount}}）
          </div>
        </el-popover>
      </div>

      <div class="content__list--wrap">
        <!---
        当前选中社群类型
        商场、单店 、成员社群 ------------------->
        <template v-if="currentCommunityType === 'chain'">

        </template>
        <template v-else>
          <div class="base-info--wrap">
            <div class="base-title">
              <h3 class="name normal g-inline">{{communityInfo.name}}</h3>
              <i class="iconfont icon-bianji g-ml5" @click="showOneInputForm('name')"></i>
              <div class="g-fr handles">
                <span class="iconfont" @click="showDialogForm('add')">添加成员</span>
                <span class="iconfont icon-bianji" @click="showDialogForm('edit')"></span>
                <span
                  v-if="currentCommunityType !== 'chain' && currentCommunityType !== 'join'"
                  class="iconfont icon-tianjiaditu"
                  @click="showDialogForm('map')"></span>
                <span class="iconfont icon-shanchu" @click="deleteCommunity"></span>
              </div>
            </div>
            <div class="details">
            <span class="items">
              <label>社群名称：</label>
              {{communityInfo.name}}
            </span>
              <span class="items">
              <label>联系人：</label>
              {{communityInfo.contacts}}
            </span>
              <span class="items">
              <label>联系电话：</label>
              {{communityInfo.phone}}
            </span>
              <span class="items">
              <label>邀请码：</label>
              {{communityInfo.invitationCode}}
              <a href="javascript:void (0)" class="ml5" @click="clipboard($event)">复制</a>
            </span>
              <span class="items">
              <label>地区：</label>
              {{communityInfo.address}}
            </span>
            </div>
          </div>
          <div class="sub-header-container">
            <div class="sub-title">
              <h3 class="name normal g-inline">出入口<strong>/</strong>通道</h3>
              <span>出入口（）</span>
              <span>通道（）</span>
            </div>
            <div class="tab--wrap">
              <a
                href="javascript:void(0)"
                class="tab-item"
                :class="{active: contentMode === 'map'}"
                @click="contentMode = 'map'">地图模式</a>
              <a
                href="javascript:void(0)"
                class="tab-item"
                :class="{active: contentMode === 'list'}"
                @click="contentMode = 'list'">列表模式</a>
            </div>

            <!------------ 商场地图模式 添加出入口 ---------------------->
            <div v-if="contentMode === 'map'" class="add-handle-wrap">
              <p
                v-for="btn in portalTypeList"
                :key="btn.type"
                @click="showAddPortalDialog(btn.type)">
                <i class="iconfont icon-shexiangtou" :class="btn.icon"></i>
                {{btn.name}}
              </p>
            </div>
          </div>


          <div class="community__map--wrap">
          </div>
          <portal-list :current-community="currentCommunityInfo"></portal-list>
        </template>
      </div>
    </div>

    <!-----------------  弹窗表单  --------------->
    <el-dialog
      width="560px"
      :title="dialogFormTitle"
      :visible.sync="dialogFormVisible"
    >
      <!---------------- 商场添加成员 -------------->
      <el-form
        v-if="dialogFormType === 'add'"
        ref="addForm"
        label-width="80px"
        label-position="left"
        class="g-form-center"
        :model="addMemberForm"
        :rules="addMemberRules"
      >
        <el-form-item prop="name" data-type="member" label="名称">
          <el-input placeholder="请输入名称" v-model.trim="addMemberForm.name"></el-input>
        </el-form-item>
        <el-form-item label="业态" prop="industryId">
          <el-select v-model="addMemberForm.industryId" placeholder="请选择业态">
            <el-option
              v-for="item in industryList"
              :key="item.industryId"
              :label="item.industryName"
              :value="item.industryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="楼层"
          prop="floorIndex">
          <el-select v-model="addMemberForm.floorIndex" placeholder="请选择楼层">
            <el-option
              v-for="item in floorList"
              :key="item.floorIndex"
              :label="item.floorName"
              :value="item.floorIndex">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input
            type="text" placeholder="请输入联系人"
            v-model.trim="addMemberForm.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            type="text" placeholder="请输入联系电话"
            v-model.trim="addMemberForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submitAddMemberForm('addForm')">添 加</el-button>
        </el-form-item>
      </el-form>

      <!---------------- 编辑社群 -------------->
      <base-form
        v-if="dialogFormType === 'edit'"
        ref="editForm"
        center
        action-type="edit"
        :visible="dialogFormVisible"
        :data="communityInfo"
        :type="currentCommunityType"
        @handle-cancel="dialogFormVisible = false"
        @handle-success="handleFormSuccessEmit">
      </base-form>
      <!---------------- 编辑楼层/地图 -------------->
      <map-form
        v-if="dialogFormType === 'map'"
        ref="mapForm"
        center
        :visible="dialogFormVisible"
        @handle-cancel="dialogFormVisible = false"
        @handle-success="handleFormSuccessEmit">
      </map-form>
    </el-dialog>

    <!-- 编辑业态、备注名 -->
    <el-dialog
      width="560px"
      :title="oneInputFormTitle"
      :visible.sync="dialogOneInputFormVisible"
    >
      <el-form
        ref="oneInputForm"
        class="g-form-center"
        label-width="70px"
        label-position="left"
        :rules="oneInputFormRules"
        :model="oneInputForm">
        <el-form-item
          v-if="oneInputFormType === 'name'"
          label="备注名"
          prop="nickName">
          <el-input placeholder="请输入名称" v-model="oneInputForm.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogOneInputFormVisible = false">取 消</el-button>
          <el-button type="primary">保 存</el-button>
        </el-form-item>
        <!--<el-form-item prop="industry">-->
          <!--<el-select v-model="oneInputForm.industry"></el-select>-->
          <!--<el-input v-for="item in industryList"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
    </el-dialog>

    <!--添加出入口、通道-->
    <portal-dialog
      :visible.sync="portalDialogVisible"
      :default-portal-type="defaultPortalType"
      @handle-success="handlePortalSuccess">
    </portal-dialog>


    <!-- 加入成员信息管理
      审核、编辑
      ----------------------------------------------->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { eventObject } from '@/utils/event'
import GroupTree from '@/components/group-nav/tree'
import BaseForm from './components/base'
import MapForm from './components/map'
import PortalList from './components/list'
import PortalDialog from './components/portal-dialog'
import Clipboard from '@/utils/clipboard'
import { validateContact, validPhone } from '@/utils/validate'
import { validateCommunityName } from './utils'
import {
  getManageMemberTree,
  getSearchMember,
  getMemberInfo,
  getManageInfo,
  getIndustryList,
  deleteManageCommunity,
  deleteMemberInfo
} from '@/api/community'

export default {
  name: 'index',
  components: {
    GroupTree,
    BaseForm,
    MapForm,
    PortalList,
    PortalDialog
  },
  data () {
    return {
      unAuditingCount: 1, // 未审核社群数量
      auditList: [
        { name: '我是外来的我是外来的' },
        { name: '我是外来的222222222' }
      ],
      contentMode: 'map', // 地图模式： map , 列表模式： list
      communityInfo: { // 管理社群、成员社群 详细信息
        'guid': 'B4888F30810F4382A36B292BF46C5310',  // 成员社群的GUID
        'address': '浙江省杭州市西湖区XXX路xxx号',
        'contacts': 'xxx',   // 联系人
        'name': '城西银泰',    //  社群名称
        'industryId': '0',   // 成员社群 -> 业态类型
        'industryName': 'string',  // 成员社群 -> 业态类型名称
        'coordinates': 'xxxx',   // 成员社群 -> 相对楼层的坐标信息
        'invitationCode': '884E54TLUC',  // 管理社群 -> 邀请码
        'groupGuid': 'string', // 管理员社群GUID
        'phone': 'string',      // 联系人联系电话
        'cityCode': 'xxx',       // 注意：这里的三个ID 全部使用地区返回字段中的code。
        'provinceCode': 'xxx',
        'districtCode': 'xxxx',
        'type': 1 // 成员社群 -> 1: 楼层  2：门店   管理社群 ->  1：商场 2：单店 3：连锁
      },
      dialogFormVisible: false, // 表单弹框
      dialogOneInputFormVisible: false, // 单个表单元素弹框
      dialogFormType: '', // add: 添加成员 edit: 编辑社群信息  map: 编辑楼层、地图
      currentCommunityInfo: {},
      addMemberForm: {
        address: '',
        contacts: '',   // 联系人
        coordinates: '',   // 相对楼层的坐标信息
        industryId: '',   // 业态类型
        industryName: '',  // 业态类型名称
        name: '',    //  成员社群名称
        groupGuid: '', // 管理员社群GUID
        phone: '',      // 联系人联系电话
        floorIndex: ''
      },
      addMemberRules: {
        name: [
          { required: true, validator: validateCommunityName, trigger: 'blur', valueType: 'member' }
        ],
        industryId: [
          { required: true, message: '请选择业态', trigger: 'blur' }
        ],
        floorIndex: [
          { required: true, message: '请选择楼层', trigger: 'blur' }
        ],
        contacts: [
          { validator: validateContact, trigger: 'blur' }
        ],
        phone: [
          { validator: validPhone, trigger: 'blur' }
        ]
      },
      industryList: [], // 业态列表
      floorList: [], // 楼层列表
      oneInputForm: {
        nickName: ''
      },
      oneInputFormRules: {
        nickName: [
          { required: true, validator: validateCommunityName, trigger: 'blur', valueType: 'member'}
        ],
        industry: [
          { required: true, message: '请选择业态', trigger: 'blur' }
        ]
      },
      oneInputFormType: 'industry', // industry、name
      portalDialogVisible: false,
      portalTypeList: [
        { type: 1, icon: 'outside', name: '外部出入口'},
        { type: 2, icon: 'inner', name: '内部出入口'},
        { type: 3, icon: 'pass', name: '通道'},
      ],
      defaultPortalType: null
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentManage']),
    dialogFormTitle () {
      let title = ''
      switch (this.dialogFormType) {
        case 'add':
          title = '添加成员'
          break
        case 'edit':
          title = '编辑社群'
          break
        case 'map':
          title = '编辑楼层/地图'
          break
      }
      return title
    },
    /*
    * 当前显示社群类型
    * market: 商场 | store: 单店 | chain: 连锁 | member: 成员 | join: 加入的成员
    */
    currentCommunityType () {
      let [type, manage, current] = ['', this.currentManage, this.currentCommunityInfo]
      switch (manage.type) {
        case 1:
          if (current.groupGuid === current.guid) {
            type = 'market'
          } else if (current.type === 'MEMBER') {
            type = 'member'
          } else {
            type = 'join'
          }
          break
        case 2:
          type = 'store' // 管理社群单店
          break
        case 3:
          if (current.groupGuid === current.guid) {
            type = 'chain'
          } else if (current.type === 'MEMBER') {
            type = 'member'
          } else {
            type = 'join'
          }
          break
      }
      return type
    },
    oneInputFormTitle () {
      let title = ''
      switch (this.oneInputFormType) {
        case 'industry':
          title = '编辑业态'
          break
        default:
          title = '编辑备注名'
          break
      }
      return title
    },
    isManage () {
      return new Set(['market', 'store', 'chain']).has(this.currentCommunityType)
    }
  },
  methods: {
    // 显示社群编辑弹框
    showEditCommunityDialog () {

    },
    // 格式化组织架构数据
    // 非社群结构无子元素时不可点击
    formatTreeList (arr) {
      let list = arr
      // 组织架构数据列表中社群类型
      let allowSet = new Set(['MEMBER', 'JOINED', 'MARKET', 'STORE', 'CHAIN'])
      if (Array.isArray(arr)) {
        list = arr.map(item => {
          if (item['trieNodeList'] && item['trieNodeList'].length) {
            this.formatTreeList(item['trieNodeList'])
          }
          if (!allowSet.has(item.type)) {
            item.disabled = true
          }
          return item
        })
      }
      return list
    },
    // 复制邀请码
    clipboard (event) {
      Clipboard(this.communityInfo.invitationCode, event)
    },
    // 当前选中社群改变事件处理
    handleCurrentChange (data) {
      this.currentCommunityInfo = data
    },
    /*
    * 显示表单弹框
    * @param {String} type 弹框类型
    */
    showDialogForm (type) {
      if (type !== 'map') {
        getIndustryList({ groupGuid: 'default' }).then((res) => {
          this.industryList = res.data
        })
      }
      this.dialogFormType = type
      this.dialogFormVisible = true
    },
    // 删除当前社群
    deleteCommunity () {
      console.log('this is a delete handle')
      // this.$affirm(
      //   {
      //     title: '删除社群',
      //     text: '删除社群前，请先删除出入口、通道',
      //     confirm: '我知道了',
      //     showCancelButton: false,
      //     type: 'error'
      //   },
      //   (action, instance, done) => {
      //     done()
      //   }
      // )

      this.$affirm(
        {
          title: '删除社群',
          text: '删除社群后，社群下的所有信息都将被清空',
          confirm: '删除',
          confirmType: 'danger'
        },
        (action2, instance2, done2) => {
          let data = { groupGuid: this.currentManage.groupGuid }
          if (this.isManage) {
            deleteManageCommunity(data).then(() => {
              // 刷新管理社群列表
              eventObject().$emit('ManageListRefresh')
              this.$tip('删除成功')
            })
          } else {
            deleteMemberInfo(data).then((res) => {
              // 刷新成员社群列表
              this.$tip('删除成功')
            })
          }
          done2()
        }
      )

    },
    // dialog form cancel按钮事件处理
    handleFormCancel (type) {
      let refsForm = this.$refs[type]
      this.dialogFormVisible = false
      if (refsForm) {
        refsForm.resetFields()
      }
    },

     // 编辑社群信息、楼层信息 弹框成功回调
    handleFormSuccessEmit (type) {
      this.dialogFormVisible = false
    },
    // 获取当前社群详情
    getCurrentCommunityInfo () {
      // 是否是成员
      let isMember = new Set(['member', 'join']).has(this.currentCommunityType)
      let { guid } = this.currentCommunityInfo
      let data = { groupGuid: guid }
      if (isMember) {
        getMemberInfo(data).then((res) => {
          this.communityInfo = res.data
        })
      } else {
        getManageInfo(data).then((res) => {
          this.communityInfo = res.data
        })
      }
    },
    // 显示单表单元素form
    showOneInputForm (type) {
      let _this = this
      this.oneInputFormType = type
      this.dialogOneInputFormVisible = true
      if (type === 'name') {
        this.oneInputForm = {
          nickName: _this.communityInfo.name
        }
      } else {
        this.oneInputForm = {
          industry: _this.communityInfo.industryId
        }
      }
    },
    // 显示添加出入口弹框
    showAddPortalDialog (type) {
      this.defaultPortalType = type
      this.portalDialogVisible = true
    },
    // 出入口弹框表单成功回调
    handlePortalSuccess () {

    }
  },
  watch: {
    currentCommunityInfo: {
      handler () {
        this.getCurrentCommunityInfo()
      },
      deep: true
    },
    // 表单弹框消失时重置整个表单
    dialogFormVisible (val) {
      let refsForm = this.$refs[this.dialogFormType + 'Form']
      if (!val && refsForm) {
        this.$nextTick(() => {
          refsForm.resetFields()
          // this.dialogFormType = ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content--sidebar {
    position: relative;
    .community-auditing {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50px;
      line-height: 50px;
      width: 100%;
      text-align: center;
      border-top: 1px solid $gray-border-color;
      box-sizing: border-box;
      cursor: pointer;
      &.active {
        &:before {
          display: inline-block;
          content: '';
          width: 6px;
          height: 6px;
          margin-right: 3px;
          border-radius: 6px;
          background-color: $global-danger-color;
        }
      }
    }
  }

  .audit-list {
    .items {
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid $gray-border-color;
      &:last-child {
        border-bottom: 0;
      }
      .ellipsis {
        width: calc(100% - 86px);
      }
      i {
        margin-left: 12px;
        font-style: normal;
        cursor: pointer;
      }
    }
  }

  .base-info--wrap {
    padding: 26px 40px;
    border-bottom: 1px solid $gray-border-color;

    .base-title {
      .handles {
        .iconfont {
          color: $theme-blue;
          cursor: pointer;
          + .iconfont {
            margin-left: 15px;
          }
        }
        .icon-shanchu {
          color: $global-danger-color;
        }
      }
    }
    .details {
      margin-top: 24px;
      .items {
        margin-right: 60px;
        /*line-height: 30px;*/
        + .items {

        }
      }
      label {
        font-weight: normal;
      }
    }
  }

  .content__list--wrap {

    h3.name {
      font-size: 20px;
    }

    .sub-header-container{
      position: relative;
      padding: 0 40px;
    }
    .sub-title {
      padding: 20px 0 14px;
      span {
        margin-left: 20px;
      }
    }
    .tab--wrap {
      .tab-item {
        display: inline-block;
        line-height: 36px;
        border-bottom: 1px solid;
        border-color: #fff;
        color: $white-text-color;
        & + .tab-item {
          margin-left: 30px;
        }
        &.active {
          color: $theme-blue;
          border-color: $theme-blue;
        }
      }
    }

    .add-handle-wrap{
      position: absolute;
      top: 30px;
      right: 40px;
      line-height: 22px;
      color: $white-text-color;
      > p {
        cursor: pointer;
      }
    }
  }



</style>