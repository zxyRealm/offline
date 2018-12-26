<template>
    <div class="mine__community--wrap">
      <uu-sub-tab
        class="pd--lr20"
        show-button
        btn-size="small"
        @handle-btn="() =>  createFormVisible = true"
        @remote-search="remoteSearch"
        :menu-array="[{title: '社群管理'}]">
      </uu-sub-tab>
      <div class="mine__community--main" :class="{'data-empty': !groupList.length || searchEmpty}">
        <ob-list-empty v-if="!groupList.length || searchEmpty" top="70px" :supply="supply" :text="tipMsg"></ob-list-empty>
        <div class="mine__community--content" v-else>
          <div class="community--sidebar">
            <!---->
            <ob-group-nav
              is-edit
              rights
              isSearch
              node-key="groupSonGuid"
              :asyn-data="true"
              :expanded-all="false"
              ref="groupNav"
              only-checked
              :expanded-keys="expandedKeys"
              v-model="groupList"
              type="community"
              @remote-search="remoteSearch"
              @handle-plus="showAddDialog"
              @refresh="getGroupList"
              @current-change="currentChange"></ob-group-nav>
          </div>
          <div class="community--main">
            <div class="cmm-top" ref="ciContentTop">
              <h2 class="cmm-sub-title">
                  <span>{{communityInfo.name}}{{showNickName?`（${communityInfo.nickName}）`:''}}
                    <uu-icon v-if="showNickName"  class="role__icon--img" type="foreign"></uu-icon>
                  </span>
                <p class="handle fr fs12">
                  <i
                    v-if="communityInfo.self"
                    @click="showAddForm(backDialogType('add'))">
                    {{communityInfo.level === 2 ? '添加成员' : '加入管理员'}}
                  </i>
                  <i class="el-icon-edit" @click="showAddForm(backDialogType())"></i>
                  <i class="el-icon-delete" @click="deleteGroup"></i>
                </p>
              </h2>
              <div class="cm-info-wrap">
                <div >
                  <span class="info__label">社群名称：</span><span class="ellipsis-64">{{communityInfo.name}}</span></div>
                <div >
                  <span class="info__label">联系人：</span>
                  {{communityInfo.contact}}</div>
                <div>
                  <span class="info__label">联系电话：</span>
                  {{communityInfo.phone}}</div>
                <div v-if="communityInfo.level === 2">
                  <span class="info__label"> 邀请码：</span>
                  <span>{{communityInfo.code}}</span>
                  <a href="javascript:void (0)" @click="clipboard($event)">复制</a></div>
                <div>
                  <span class="info__label">地区：</span>
                  <span class="ellipsis-64">{{communityInfo.fullAddress}}</span></div>
                <div v-if="communityInfo.industryType">
                  <span class="info__label">业态：</span>
                  <span class="ellipsis-64">{{communityInfo.industryTypeName}}</span></div>
                <!--如果成员社群加入了管理员社群即展示其管理员社群列表-->
                <!--v-if="userInfo.developerId === communityInfo.merchantGuid && communityInfo.parentGroups && communityInfo.parentGroups.length && communityInfo.level === 1"-->
                <div
                  v-if="communityInfo.self && communityInfo.parentGroups && communityInfo.parentGroups.length && communityInfo.level === 2"
                  class="parent__list"
                  >
                  <span class="fl info__label">已加入：</span>
                  <div
                    v-for="(item,$index) in communityInfo.parentGroups"
                    :key="$index"
                    class="parents-item">
                    <span class="ellipsis">{{item.name}}</span>
                    <uu-icon
                      size="small" type="quit"
                      v-show="communityInfo.self"
                      @click.native="leaveCommunity('quit',communityInfo, item)"></uu-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="three__map--wrap">
              <ob-list-empty v-if="communityInfo.level === 1 && !communityInfo.shapePathParam" top="0px" :supply="supply" text="暂无地图，敬请期待！"></ob-list-empty>
              <three-association-map
                v-else
                :data="communityInfo"
                ref="associationMap"
                :floor-list="floor">
              </three-association-map>
            </div>
          </div>
        </div>
      </div>
      <!--自定义分组名-->
      <ob-dialog-form
        :title="groupsNameForm.customType ? '新建分组' : '编辑分组名'"
        :visible.sync="groupsNameFormVisible"
      >
        <el-form
          slot="form"
          ref="groupsNameForm"
          block-message
          style="width: 330px"
          @submit.native.prevent
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="groupsNameForm"
          :rules="groupsRules"
        >
          <el-form-item label="分组名：" prop="name">
            <el-input placeholder="请输入分组名" v-model="groupsNameForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="groupsNameFormVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="setGroupsName('groupsNameForm')">确定</el-button>
        </div>
      </ob-dialog-form>
      <!--加入其他管理员社群-->
      <ob-dialog-form
        :show-button="false"
        :title="communityDialogTitle"
        :visible.sync="joinFormVisible">
        <div slot="form" class="vam" style="min-height: 80px;">
          <el-form
            ref="joinManageForm"
            block-message
            style="width: 330px;"
            @submit.native.prevent
            label-position="left"
            class="common-form white"
            label-width="82px"
            :model="joinManageForm"
            :rules="joinManageRules"
          >
            <el-form-item label="邀请码：" prop="code">
              <el-input placeholder="请输入10位数字、字母" v-model="joinManageForm.code"></el-input>
            </el-form-item>
            <template v-if="ManageInfo.id">
              <el-form-item label-width="0">
                <div class="custom__form--item">
                  <div class="custom__form--label">
                    管理员<br/>社群信息：
                  </div>
                  <div class="custom__form--content">
                    <span class="c-grey">名称：</span><span class="ellipsis">{{ManageInfo.name}}</span>
                    <span class="c-grey">类型：</span><span>{{ManageInfo.type !== 1 ? '连锁' : '商场' }}</span>
                  </div>
                </div>
              </el-form-item>
              <template v-if="ManageInfo.type !== 1">
                <el-form-item label="地区：" prop="pca">
                  <area-select placeholder="请选择地区" v-model="joinManageForm.pca"></area-select>
                </el-form-item>
                <el-form-item prop="address">
                  <el-input type="text" placeholder="请输入详细地址"
                            v-model.trim="joinManageForm.address"></el-input>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="业态：" prop="industryType">
                  <el-select placeholder="请选择门店所属业态类型" v-model="joinManageForm.industryType">
                    <el-option
                      v-for="(item,$index) in industryList"
                      :label="item.value"
                      :key="$index"
                      :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="楼层：" prop="floor">
                  <el-select placeholder="请选择门店所在楼层" v-model="joinManageForm.floor">
                    <el-option
                      v-for="(item, $index) in floorList"
                      :key="$index"
                      :label="IntToFloor(item)"
                      :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                  <div class="three__map--wrap">
                  </div>
                </el-form-item>
              </template>
            </template>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="joinFormVisible = false">返 回</el-button>
          <el-button
            class="affirm"
            type="primary"
            @click="joinManageCommunity('joinManageForm')">加入</el-button>
        </div>
      </ob-dialog-form>
      <!--向商场或连锁总店添加成员社群、 编辑商场或连锁总店的成员社群-->
      <ob-dialog-form
        :title="communityDialogTitle"
        :visible.sync="handleMemberVisible"
      >
        <el-form
          slot="form"
          ref="handleMemberForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="handleMemberForm"
          :rules="handleMemberRules"
        >
          <el-form-item label="名称：" prop="name">
            <el-input placeholder="请填写社群名称" v-model="handleMemberForm.name"></el-input>
          </el-form-item>
          <template v-if="communityInfo.type === 2">
            <el-form-item label="地区：" prop="pca">
              <area-select placeholder="请选择地区" v-model="handleMemberForm.pca"></area-select>
            </el-form-item>
            <el-form-item prop="address">
              <el-input type="text" placeholder="请输入详细地址"
                        v-model.trim="handleMemberForm.address"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="业态：" prop="industryType">
              <el-select placeholder="请选择门店所属业态类型" v-model="handleMemberForm.industryType">
                <el-option
                  v-for="(item,$index) in industryList"
                  :label="item.value"
                  :key="$index"
                  :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼层：" prop="floor">
              <el-select @change="FloorChange" placeholder="请选择门店所在楼层" v-model="handleMemberForm.floor">
                <el-option v-for="item in floorList" :key="item" :label="IntToFloor(item)" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="handleMemberForm.floor" label-width="0">
              <div class="three__map--dialog">
                <bind-community
                  ref="bindGroupMap"
                  :default-data="handleMemberForm"
                  @handle-block-click="handleBlockClick"
                  :floor-list="floor"></bind-community>
              </div>
            </el-form-item>
          </template>
          <el-form-item label="联系人：" prop="contact">
            <el-input type="text" placeholder="请输入联系人"
                      v-model.trim="handleMemberForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input type="text" placeholder="请输入联系电话"
                      v-model.trim="handleMemberForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="handleMemberVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="handleMember('handleMemberForm')">
            {{handleCommunityType === 5 ? '加入' : '保存'}}</el-button>
        </div>
      </ob-dialog-form>

      <!--编辑社群（商场、连锁总店、单个门店）-->
      <ob-dialog-form
        :title="communityDialogTitle"
        :visible.sync="addCommunityVisible"
      >
        <el-form
          slot="form"
          ref="addCommunityForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="communityForm"
          :rules="addCommunityRules"
        >
          <el-form-item label="名称：" prop="name">
            <el-input placeholder="请输入社群名称" v-model="communityForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地区：" prop="pca">
            <area-select placeholder="请选择地区" v-model="communityForm.pca"></area-select>
          </el-form-item>
          <el-form-item prop="address">
            <el-input type="text" placeholder="请输入详细地址"
                      v-model.trim="communityForm.address"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contact">
            <el-input type="text" placeholder="请输入联系人"
                      v-model.trim="communityForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input type="text" placeholder="11位手机号"
                      v-model.trim="communityForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="addCommunityVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="handleCommunity('addCommunityForm')">{{communityInfo.GroupNickName?'添加': '确  定'}}</el-button>
        </div>
      </ob-dialog-form>
      <!--编辑其他社群备注名-->
      <ob-dialog-form
        :title="communityDialogTitle"
        :visible.sync="editNicknameVisible"
        :showButton="false"
      >
        <el-form
          slot="form"
          ref="editNicknameForm"
          block-message
          @submit.native.prevent
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="editNicknameForm"
          :rules="editNicknameRules"
        >
          <el-form-item label="备注名：" prop="name">
            <el-input placeholder="请输入备注名" v-model="editNicknameForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="editNicknameVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="editNickname('editNicknameForm')">保 存</el-button>
        </div>
      </ob-dialog-form>
    </div>
</template>

<script>
import {makeCustomName} from '@/utils'
import Mixins from '@/utils/mixins'
import {validateRule} from '@/utils/validate'
import {mapState} from 'vuex'
import Clipboard from '@/utils/clipboard'
import area from '@/components/area-select/area-select'
import BindCommunity from '@/components/three/bind_community'
import {eventObject} from '../../utils/event'
import {GetMarketList, GetCommunityInfoByCode, GetCommunityUpdate, CheckNameExist, CheckMemberNameExist, GetIndustry, DeleteCommunity, GetMarketFloorList, GetMemberDetail, AddMember, UpdateMemberInfo, CheckMemberNickNameExist, UpdateMemberNickName, GetGroupPortalCount, JoinOtherManage, SonCommunitySearch, DeleteMember, ExitManage} from '../../api/community'
import ThreeAssociationMap from '@/components/three/association_map'
export default {
  name: 'mineCommunity',
  mixins: [Mixins],
  components: {
    BindCommunity,
    ThreeAssociationMap,
    'area-select': area
  },
  data () {
    const validateCode = (rule, value, callback) => {
      value = value.trim()
      // this.ManageInfo = {}
      if (!value) {
        this.ManageInfo = {}
        callback(new Error('请输入社群邀请码'))
      } else {
        if (value.length === 10) {
          if (/^[\da-zA-Z]{10}$/.test(value)) {
            GetCommunityInfoByCode({code: value}).then(res => {
              if (res.data && res.data.id) {
                this.ManageInfo = res.data
                callback()
              } else {
                this.ManageInfo = {}
                callback(new Error('邀请码不存在'))
              }
            }).catch(err => {
              this.ManageInfo = {}
              callback(new Error(err.msg || '邀请码不存在'))
            })
          } else {
            this.ManageInfo = {}
            callback(new Error('请输入正确的社群邀请码'))
          }
        } else {
          this.ManageInfo = {}
          callback(new Error('请输入10位社群邀请码'))
        }
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          if ((this.handleCommunityType === 4 && this.communityForm.originName === value) || (this.handleCommunityType === 8 && this.editNicknameForm.originName === value)) {
            callback()
          } else if (this.handleCommunityType === 4) {
            CheckNameExist({name: value}).then(res => {
              !res.data ? callback() : callback(new Error('社群名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          } else {
            // 校验其他成员社群昵称是否存在
            CheckMemberNickNameExist({name: value, parentGuid: this.currentManage.id}).then(res => {
              !res.data ? callback() : callback(new Error('社群名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的社群名称'))
        }
      }
    }
    const validateMemberName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          if (this.handleCommunityType === 6 && this.handleMemberForm.originName === value) {
            callback()
          } else {
            CheckMemberNameExist({name: value}).then(res => {
              !res.data ? callback() : callback(new Error('社群名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的社群名称'))
        }
      }
    }
    const validateContact = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('请输入正确的联系人'))
        }
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (validateRule(value, 6)) {
          callback()
        } else if (value.length !== 11) {
          callback(new Error('请输入11位手机号'))
        } else {
          callback(new Error('手机号格式错误'))
        }
      } else {
        callback()
      }
    }
    return {
      parentGroups: [
        {name: '西溪'},
        {name: '西湖'},
        {name: '城西'}
      ],
      portalGuid: '', // 要绑定的出入口id
      ownDeviceList: [
        {name: '设备001', deviceKey: 'SLD61SFG4484'},
        {name: '设备002', deviceKey: 'SLD61SFG4485'},
        {name: '设备003', deviceKey: 'SLD61SFG4486'},
        {name: '设备004', deviceKey: 'SLD61SFG4487', disabled: true},
        {name: '设备005', deviceKey: 'SLD61SFG4488'},
        {name: '设备001', deviceKey: 'SLD61SFG4484'},
        {name: '设备002', deviceKey: 'SLD61SFG4485'},
        {name: '设备003', deviceKey: 'SLD61SFG4486'},
        {name: '设备004', deviceKey: 'SLD61SFG4487'},
        {name: '设备005', deviceKey: 'SLD61SFG4488'}
      ], // 自有设备列表
      checkedItems: [], // 已选中设备
      industryList: [], // 业态列表
      floorList: [], // 楼层列表
      fileList: [], // 文件列表
      isSon: false, // 是否是成员社群
      tipMsg: '暂无社群', // 空数据是页面提示信息
      supply: '',
      searchEmpty: false, // 是否是search状态
      showPopover: false, // 创建社群引导提示显示状态
      createSelfVisible: false, // 是否显示创建自有成员社群提示
      joinManageVisible: false, // 是否显示加入管理员社群提示
      btnArray: [{text: '创建社群', content: '社群添加点这里', showPopover: false}],
      groupList: [], // 社群列表
      searchList: [], // 社群搜索结果
      addCommunityList: [], // 添加社群弹框社群列表
      disabledKeys: [],
      currentCommunity: {}, // 当前社群信息
      communityInfo: {},
      groupsNameForm: {
      },
      ManageInfo: { // 通过邀请码获取的管理员社群信息
      },
      joinCommunityInfo: {},
      joinManageForm: { // 创建分组form数据对象
        code: '',
        industryType: '',
        floor: '',
        address: ''
      },
      joinManageRules: {
        code: [
          {validator: validateCode, trigger: 'change'}
        ],
        pca: [
          {required: true, message: '请选择地址', trigger: 'blur'}
        ],
        industryType: [
          {required: true, message: '请选择门店所属业态类型', trigger: 'change'}
        ],
        floor: [
          {required: true, message: '请选择门店所在楼层', trigger: 'change'}
        ]
      },
      deviceList: [],
      expandedKeys: [], // 展开项
      rules: {
        groupName: [
          {required: true, message: '请输入社群昵称', trigger: 'blur'}
        ]
      },
      groupsRules: {
        name: [
          {required: true, message: '请输入分组名称', trigger: 'blur'}
        ]
      },
      createFormVisible: false, // 创建社群dialog显示状态
      dialogFormVisible: false, // 修改社群昵称dialog 显示状态
      groupsNameFormVisible: false, // 修改自定义分组名dialog 显示状态
      joinFormVisible: false, // 加入其他管理员社群 dialog显示状态
      editCommunityVisible: false, // 编辑社群dialog显示状态
      addCommunityVisible: false, // 添加社群
      handleMemberVisible: false,
      editNicknameVisible: false, // 编辑其他社群备注名
      AddDeviceVisible: false, // 添加设备
      handleCommunityType: 1, // 添加社群的类型 1 商场 2 连锁总店 3 单个门店 4 编辑 商场、连锁总店、单个门店 5 添加成员 6 编辑成员 7 加入管理员社群
      communityForm: { // 添加社群表单对象
        name: '',
        code: '',
        pca: '',
        address: '',
        floor: '',
        contact: '',
        phone: ''
      },
      addCommunityRules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请获取社群邀请码', trigger: 'blur'}
        ],
        pca: [
          {required: true, message: '请选择省市区', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
        ],
        floor: [
          {required: true, message: '请选取楼层', trigger: 'blur'}
        ],
        contact: [
          {validator: validateContact, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ]
      },
      handleMemberForm: { // 添加/编辑成员社群
        name: '',
        pca: '',
        address: '',
        industryType: '',
        floor: '',
        shapePathParam: '',
        coordinates: [],
        contact: '',
        phone: ''
      },
      handleMemberRules: {
        name: [
          {required: true, validator: validateMemberName, trigger: 'blur'}
        ],
        pca: [
          {required: true, message: '请选择地区', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
        ],
        industryType: [
          {required: true, message: '请选择业态类型', trigger: 'change'}
        ],
        floor: [
          {required: true, message: '请选择所在楼层', trigger: 'change'}
        ],
        contact: [
          {validator: validateContact, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ]
      },
      editNicknameForm: {
        name: ''
      },
      editNicknameRules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ]
      },
      nameForm: {
        name: ''
      }
    }
  },
  created () {
    this.$http('/firstCheck', {name: 'insight_group_list_first'}).then(res => {
      if (res.data) {
        this.btnArray.map(item => {
          item.showPopover = true
          return item
        })
        window.addEventListener('click', this.firstCreate)
      }
    })
  },
  mounted () {
    this.getGroupList()
  },
  computed: {
    communityDialogTitle () {
      let title
      switch (this.handleCommunityType) {
        case 1:
          title = '添加商场'
          break
        case 2:
          title = '添加连锁总店'
          break
        case 3:
          title = '添加门店'
          break
        case 4:
        case 6:
          title = '编辑社群'
          break
        case 5:
          let gText = ''
          switch (this.currentManage.type) {
            case 1:
              gText = '商场'
              break
            case 2:
              gText = '连锁'
              break
            default:
              gText = ''
          }
          title = `添加${gText}成员`
          break
        case 7:
          title = '加入管理员社群'
          break
        case 8:
          title = '编辑非自有成员'
          break
      }
      return title
    },
    // 商场下楼层列表信息
    floor: {
      get () {
        return this.groupList[0] ? this.groupList[0].subGroupSon : []
      },
      set () {}
    },
    ...mapState(['loading', 'aliveState', 'userInfo', 'currentManage']),
    showNickName () {
      return this.userInfo.developerId !== this.communityInfo.merchantGuid && this.communityInfo.nickName
    }
  },
  methods: {
    // 第一次进入设备列表，给出操作提示，点击页面后提示消失
    firstCreate () {
      this.btnArray.map(item => {
        item.showPopover = false
        return item
      })
      this.createSelfVisible = false
      this.joinManageVisible = false
      window.removeEventListener('click', this.firstCreate)
    },
    // 搜索社群
    remoteSearch (val) {
      this.searchEmpty = false
      this.currentCommunity = {}
      if (val) {
        SonCommunitySearch({parentId: this.currentManage.id, searchText: val}).then(res => {
          if (res.data[0]) {
            let restoreArray = this.$restoreArray(this.groupList, 'subGroupSon')
            let getCurrent = () => {
              // 多层for循环嵌套只能用return跳出整个循环，break 只能跳出当前循环
              for (let i = 0, len = restoreArray.length; i < len; i++) {
                for (let k = 0, len2 = res.data.length; k < len2; k++) {
                  if (res.data[k] === restoreArray[i].groupSonGuid) {
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
              if (setKey.has(item.groupSonGuid)) {
                setArr.push(item.groupSonGuid)
              }
            })
            let current = getCurrent()
            this.expandedKeys = setArr
            this.$nextTick(() => {
              if (this.$refs.groupNav) {
                this.$refs.groupNav.setCheckedKeys(setArr)
                this.$refs.groupNav.setCurrentKey(current.groupSonGuid)
                this.getCommunityInfo(current)
              }
            })
          } else {
            this.$tip(`搜不到包含“${val}”的内容`, 'error')
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
        if (this.$refs.groupNav) {
          this.$refs.groupNav.setCurrentKey(current.groupSonGuid)
          this.$refs.groupNav.setCheckedKeys([])
          this.getCommunityInfo(current)
        }
      })
    },
    // 获取商场社群列表
    getGroupList () {
      let pid = this.currentManage.id
      if (!pid) return
      GetMarketList({parentId: pid}).then(res => {
        this.groupList = res.data || []
        let currentNode = Object.keys(this.currentCommunity).length ? this.currentCommunity : this.groupList[0]
        this.$nextTick(() => {
          if (this.$refs.groupNav) {
            // 默认只展开默认分组列表
            // 创建成员社群后返回我的社群列表时默认显示管理员社群
            this.expandedKeys.push(currentNode.groupSonGuid)
            if (!Object.keys(this.currentCommunity).length) this.currentCommunity = currentNode
            // 通过自定义唯一标识uniqueKey 设置默认选中项
            this.$refs.groupNav.setCurrentKey(this.currentCommunity.groupSonGuid)
            this.$nextTick(() => {
              // 在树形组件中重新获取当前选中项，并保存当前值
              let node = this.$refs.groupNav.$refs.GroupTree.getCurrentNode()
              this.currentCommunity = node
              if (currentNode.groupParentGuid) {
                this.getCommunityInfo(this.currentCommunity)
              }
            })
          }
          this.$route.meta.keepAlive = false
        })
      })
    },
    // 获取社群详细信息
    getCommunityInfo (val, node) {
      if (!this.currentManage.id) return
      GetMemberDetail({groupSonId: val.groupSonGuid || val.guid, parentId: this.currentManage.id}).then(res => {
        res.data.level = val.type // type对应关系 1 成员 2 管理层（商场、连锁总店） 3 楼层
        res.data.self = res.data.merchantGuid === this.userInfo.developerId
        this.communityInfo = res.data || {}
      })
    },
    // 切换 / 新建自定义分组
    currentChange (data, node) {
      // console.log('change', data, data.groupSonGuid)
      if (node.level !== 2) {
        this.currentCommunity = data
        this.getCommunityInfo(data)
      } else {
        this.$refs.groupNav.setCurrentKey(this.currentCommunity.groupSonGuid)
      }
    },
    // 解散社群
    disbandGroup () {
      let msg = `确认删除【<span class="maxw200 ellipsis">${this.communityInfo.name}</span>】社群？`
      let url = `/group/disbandGroup` // 删除社群
      let subData = {guid: this.communityInfo.guid}
      if (this.communityInfo.role === 0) {
        msg += `<br/><span class="fs12" style="color: #FF6660">该管理员社群下创建的成员社群也将被删除。</span>`
      }
      // 删除分组
      if (this.communityInfo.groupPid && this.communityInfo.guid) {
        url = `/groupCustom/delete` // 解散分组
        subData = {
          groupCustomGuid: this.communityInfo.guid
        }
      }
      this.$affirm({text: msg}, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http(url, subData).then(res => {
            this.$tip(this.communityInfo.groupPid ? '解散成功' : '删除成功')
            this.currentCommunity = {}
            this.getGroupList()
          })
          done()
        } else {
          done()
        }
      })
    },
    // 创建自定分组、编辑自定义分组名称
    setGroupsName (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = '/groupCustom/update'
          delete this.groupsNameForm.memberItem
          if (this.groupsNameForm.customType) {
            url = `/groupCustom/create`
          }
          this.$http(url, this.groupsNameForm).then(res => {
            this.$tip(`${this.groupsNameForm.customType ? '创建' : '修改'}成功`)
            this.groupsNameFormVisible = false
            this.getGroupList()
          })
        }
      })
    },
    // 离开社群
    leaveCommunity (type, current, parent) {
      // type 可选类型 quit、kick
      let [des, title] = ['', '']
      let params = {
        groupPid: parent.guid || parent.guid,
        groupId: current.guid,
        groupNickName: current.groupNickName || current.name,
        parentGroupNickName: parent.groupNickName || parent.name
      }
      switch (type) {
        case 'quit':
          title = '退出管理员社群'
          des = `退出管理员社群后，当前社群的数据与设备将不会被<br/>管理员社群显示与操作`
          url = '/group/exit'
          break
        default:
          des = `确定删除该社群？`
          url = '/group/remove'
      }
      this.$affirm({title: title, text: `${des}`, confirm: '退出'}, (action, instance, done) => {
        if (action === 'confirm') {
          ExitManage(params).then(res => {
            this.$tip(`${type === 'quit' ? '退出' : '移除'}成功`)
            this.getCommunityInfo(this.communityInfo)
          })
        }
        done()
      })
    },
    // 加入其他管理员社群
    joinManageCommunity (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.joinManageForm))
          subData.pid = this.ManageInfo.id
          subData.groupId = this.communityInfo.guid
          JoinOtherManage(subData).then(res => {
            this.$tip('加入成功')
            this.joinFormVisible = false
            this.getGroupList()
          })
        }
      })
    },
    // 处理管理层社群信息（商场、连锁、单店）
    handleCommunity (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.communityForm))
          let address = subData.pca.split(',').map(Number)
          subData.provinceAreaId = address[0] || 0
          subData.cityAreaId = address[1] || 0
          subData.districtAreaId = address[2] || 0
          GetCommunityUpdate(subData).then(res => {
            this.$tip('保存成功')
            this.addCommunityVisible = false
            this.getGroupList()
          })
        } else {
        }
      })
    },
    // 处理成员信息
    handleMember (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.handleMemberForm))
          let address = subData.pca.split(',').map(Number)
          subData.provinceAreaId = address[0] || 0
          subData.cityAreaId = address[1] || 0
          subData.districtAreaId = address[2] || 0
          subData.industryTypeName = this.industryList.filter(item => item.code === subData.industryType)[0].value
          if (!subData.parentGuid) subData.parentGuid = this.currentManage.id
          if (!subData.coordinates || !subData.coordinates.length) {
            this.$tip('请选取绑定区域', 'error')
            return
          }
          if (this.handleCommunityType === 5) {
            AddMember(subData).then(res => {
              this.$tip('添加成功')
              this.handleMemberVisible = false
              this.getGroupList()
            })
          } else {
            if (subData.originCoordinates.toString() !== subData.coordinates.toString()) {
              GetGroupPortalCount({groupSonId: this.communityInfo.guid}).then(res => {
                if (res.data.portalNumber) {
                  this.$tip('更换绑定区域时请先解绑出入口', 'error')
                } else {
                  UpdateMemberInfo(subData).then(res => {
                    this.$tip('保存成功')
                    this.handleMemberVisible = false
                    this.getGroupList()
                  })
                }
              })
            } else {
              UpdateMemberInfo(subData).then(res => {
                this.$tip('保存成功')
                this.handleMemberVisible = false
                this.getGroupList()
              })
            }
          }
        } else {
        }
      })
    },
    // 编辑其他社群备注名
    editNickname (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          UpdateMemberNickName(this.editNicknameForm).then(res => {
            this.$tip('保存成功')
            this.editNicknameVisible = false
            this.getGroupList()
          })
        }
      })
    },
    // 楼层选中值改变时触发
    FloorChange (val) {
      this.handleMemberForm.coordinates = []
      this.$refs.bindGroupMap.initFloor(val)
    },
    // 显示添加社群dialog, 并设置数据
    showAddDialog (node, data) {
      this.disabledKeys = data.memberItem.map(item => item.groupGuid)
      this.addCommunityList = node.parent.childNodes[node.parent.childNodes.length - 1].data.memberItem.filter(item => !new Set(this.disabledKeys).has(item.groupGuid))
      this.$nextTick(() => {
        this.addCommunityVisible = true
      })
    },
    // 复制邀请码
    clipboard (event) {
      Clipboard(this.communityInfo.code, event)
    },
    // 显示添加社群弹窗（商场、连锁店、单个门店）
    showAddForm (type) {
      this.handleCommunityType = type
      if (type === 5 || type === 7 || type === 6) {
        GetIndustry().then(res => {
          this.industryList = res.data
        })
        GetMarketFloorList({id: this.currentManage.id}).then(res => {
          this.floorList = res.data
        })
        if (type === 6) {
          let copyData = JSON.parse(JSON.stringify(this.communityInfo))
          copyData.pca = `${copyData.provinceAreaId},${copyData.cityAreaId},${copyData.districtAreaId}`
          copyData.originName = JSON.parse(JSON.stringify(copyData.name))
          copyData.originCoordinates = JSON.parse(JSON.stringify(copyData.coordinates))
          this.handleMemberForm = copyData
          // this.$refs.bindGroupMap.initFloor(this.handleMemberForm.floor)
        } else if (type === 5) {
          this.handleMemberForm = { // 添加成员社群
            name: '',
            pca: '',
            address: '',
            industryType: '',
            floor: '',
            coordinates: [],
            contact: '',
            phone: ''
          }
        }
      } else if (type === 4 || type === 8) {
        let copyData = JSON.parse(JSON.stringify(this.communityInfo))
        copyData.pca = `${copyData.provinceAreaId},${copyData.cityAreaId},${copyData.districtAreaId}`
        copyData.originName = JSON.parse(JSON.stringify(copyData.name))
        // console.log('dialog data', copyData)
        switch (type) {
          case 4:
            this.communityForm = copyData
            break
          case 8:
            this.editNicknameForm = {
              name: copyData.nickName,
              originName: JSON.parse(JSON.stringify(copyData.nickName)),
              groupSonGuid: copyData.guid,
              parentGuid: copyData.parentId
            }
            break
        }
      }
      switch (type) {
        case 1:
        case 2:
        case 3:
        case 4:
          this.createFormVisible = false
          this.addCommunityVisible = true
          break
        case 5:
        case 6:
          this.handleMemberVisible = true
          break
        case 7:
          this.joinFormVisible = true
          break
        case 8: // 编辑非自有成员
          this.editNicknameVisible = true
          break
      }
      // console.log(this.handleCommunityType, this.handleMemberForm)
    },
    // 定义弹框类型
    backDialogType (type) {
      let int
      switch (type) {
        case 'add':
          int = this.communityInfo.level === 2 ? 5 : 7
          break
        default:
          int = this.communityInfo.self ? this.communityInfo.level === 2 ? 4 : 6 : 8
          break
      }
      return int
    },
    // 删除社群
    deleteGroup () {
      GetGroupPortalCount({groupSonId: this.currentCommunity.groupSonGuid}).then(res => {
        if (res.data.portalNumber) {
          this.$affirm({text: `删除社群前，请先删除出入口`, title: '删除社群', confirm: '我知道了'}, (action, instance, done) => {
            done()
          })
        } else {
          this.$affirm({text: `删除社群后，社群下的所有信息都将被删除`, title: '删除社群', confirm: '删除'}, (action, instance, done) => {
            if (action === 'confirm') {
              if (this.communityInfo.level === 1) {
                DeleteMember({groupSonId: this.communityInfo.guid}).then(res => {
                  this.$tip('删除成功')
                  this.currentCommunity = {}
                  this.getGroupList()
                })
              } else {
                DeleteCommunity({id: this.communityInfo.guid}).then(res => {
                  this.$tip('删除成功')
                  this.currentCommunity = {}
                  eventObject().$emit('ManageListRefresh')
                })
              }
            }
            done()
          })
        }
      })
    },
    // 地图区块点击事件
    handleBlockClick (data) {
      // console.log('block position', data.path, JSON.parse(JSON.stringify(data.path)))
      this.handleMemberForm.coordinates = data.position
      this.handleMemberForm.shapePathParam = JSON.stringify(data.path)
      // this.$set(this.handleMemberForm, 'coordinates', data.position)
      // this.$set(this.handleMemberForm, 'shapePathParam', JSON.stringify(data.path))
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.currentCommunity = {}
        this.getGroupList()
      },
      deep: true
    },
    handleMemberVisible (val) {
      // 弹框消失时清除表单默认数据（地图选中状态）
      if (!val && this.$refs.handleMemberForm) {
        this.handleMemberForm.coordinates = []
        this.$refs.handleMemberForm.resetFields()
        if (this.$refs.bindGroupMap) this.$refs.bindGroupMap.initFloor()
      }
    },
    joinFormVisible (val) {
      if (!val) {
        this.$refs.joinManageForm.resetFields()
        this.ManageInfo = {}
      }
    },
    addCommunityVisible (val) {
      if (!val) {
        this.$refs.addCommunityForm.resetFields()
      }
    }
  },
  beforeDestroy () {
    // 实例销毁前保存当前页面的数据选中状态，存入vuex
    this.$store.commit('SET_ALIVE_STATE', {currentCommunity: this.currentCommunity || this.groupList[0]})
  }
}
</script>

<style lang="scss" scoped>
.mine__community--wrap{
  /*padding: 0 20px;*/
  .three__map--dialog{
    height: 190px;
  }
  /*加入管理员社群 显示社群信息自定义样式*/
  .custom__form--item {
    height: 50px;
    font-size: 12px;
    .custom__form--label{
      float: left;
      width: 82px;
      line-height: 1.3;
      padding: 10px 0;
      color: rgba(85,85,85,0.50);
    }
    .custom__form--content{
      overflow: hidden;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      background: #F8F8F8;
      border-radius: 2px;
      .ellipsis{
        width: 8em;
        vertical-align: top;
      }
    }
  }
  .three__map--wrap{
    height: calc(100% - 150px);
  }
}
.mine__community--main{
  &.data-empty{
    height: calc(100% - 70px);
  }
  .mine__community--content{
    height: calc(100vh - 172px);
    @media screen and(max-width: 1280px) {
      height: calc(100vh - 189px);
    }
  }
  .community--sidebar {
    float: left;
    width: 230px;
    height: 100%;
    background: rgba(1,8,20,0.10);
    border-right: 1px dashed rgba(151, 151, 151, 0.1);
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
    margin-left: 232px;
    .el-scrollbar{
      height: 100%;
      .el-scrollbar__wrap{
      }
    }
    .table--scrollbar__warp{
      height: calc(100% - 32px);
    }
    .mine--table__wrap{
      height: calc(100vh - 278px);
      @media screen and(max-width: 1280px){
        height: calc(100vh - 295px);
      }
      .table--scrollbar__warp{
      }
    }

    //  自有社群设备列表样式
    .cmm-top, .cmm-table {
      /*padding: 20px 20px 5px;*/
      box-sizing: border-box;
    }
    .cmm-top {
      .cm-info-wrap {
        padding: 20px 20px 2px;
        background: rgba(1,8,20,0.10);
        border-bottom: 1px dashed rgba(151,151,151, 0.1);
        font-size: 12px;
        box-sizing: border-box;
        overflow: hidden;
        > div {
          float: left;
          width: 33%;
          height: 16px;
          margin-bottom: 18px;
          /*&:nth-child(1),&:nth-child(2),&:nth-child(3){*/
            /**/
          /*}*/
          > * {
            float: left;
          }
        }
        .parent__list{
          width: auto;
          .parents-item{
            .ellipsis{
              width: auto;
              max-width: 120px;
            }
            &:nth-child(2){
              padding-right: 20px;
            }
            &+.parents-item{
              padding: 0 20px;
              border-left: 1px solid #979797;
            }
            .uu-icon{
              margin-top: 1px;
              margin-left: 6px;
            }
            > * {
              float: left;
            }
          }
        }
        .el-icon-question{
          margin-right: 3px;
          color: #515055;
          font-size: 14px;
        }
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
          /*width: calc(100% - 180px);*/
          line-height: 14px;
          overflow: hidden;
          >p{
            float: left;
            width: 50%;
            box-sizing: border-box;
            margin-bottom: 14px;
            &:nth-child(2n + 1) {
              padding-right: 20px;
            }
          }
          .parents-item{
            display: inline-block;
            vertical-align: bottom;
            margin-right: 25px;
            margin-bottom: 15px;
            font-size: 12px;
            line-height: 10px;
            .uu-icon{
              margin-left: 10px;
            }
            >*{
              display: inline-block;
              vertical-align: middle;
            }
          }
          .info__label{
            float: left;
            width: 64px;
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
      padding:  20px;
      font-size: 16px;
      padding-bottom: 10px;
      background: rgba(1,8,20,0.10);
      border-bottom: 1px dashed rgba(151,151,151, 0.1);
      overflow: hidden;
      .handle {
        >i{
          margin-left: 10px;
          font-size: 12px;
          color: #3a8ee6;
          cursor: pointer;
          font-style: normal;
        }
        .el-icon-delete {
          color: #C03639;
        }
      }
    }
    /*识别人脸库*/
    .cmm-table__face{
      margin-top: 10px;
    }
  }
  .cmm-table {
    height: calc(100% - 270px);
    /*max-height: 300px;*/
    .el-table{
      /*width: calc(100% - 17px);*/
    }
  }
}
/*添加设备弹框*/
.device__dialog--list{
  width: 320px;
  height: 240px;
  margin: 0 auto;
  background: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
  .el-scrollbar {
    height: calc(100% - 30px);
    overflow: hidden;
    .el-checkbox{
      display: block;
      margin-bottom: 12px;
      &+.el-checkbox{
        margin-left: 0;
      }
    }
  }
}
/*无地图时提示信息*/
.no__map--box{
  width: 160px;
  margin: 0 auto;
}
</style>
