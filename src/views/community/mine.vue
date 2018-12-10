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
            <ob-group-nav
              is-edit
              rights
              isSearch
              :asyn-data="true"
              :expanded-all="false"
              ref="groupNav"
              only-checked
              node-key="uniqueKey"
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
                  <span>{{communityInfo.name}}{{communityInfo.groupNickName?`（${communityInfo.groupNickName}）`:''}}
                    <!--<a v-if="communityInfo.groupNickName !== undefined || communityInfo.groupPid || (communityInfo.merchantGuid && communityInfo.merchantGuid !== userInfo.developerId)"  class="fs12" @click="showDialog" href="javascript:void (0)">-->
                      <!--<i class="el-icon-edit"></i>-->
                      <!--{{(communityInfo.merchantGuid && communityInfo.merchantGuid !== userInfo.developerId) ? dialogTitle : ''}}-->
                    <!--</a>-->
                  </span>
                <p class="handle fr fs12">
                  <!--communityInfo.level === 1?5:7-->
                  <i
                    v-if="userInfo.developerId === communityInfo.merchantGuid"
                    @click="showAddForm(7)">
                    {{communityInfo.level === 1 ? '添加成员' : '加入管理员'}}
                  </i>
                  <i class="el-icon-edit" @click="showAddForm(4)"></i>
                  <i class="el-icon-delete" @click="deleteGroup"></i>
                </p>
              </h2>
              <div class="cm-info-wrap">
                <div >
                  <span class="info__label">社群名称：</span><span class="ellipsis-64">{{communityInfo.name}}</span></div>
                <div >
                  <span class="info__label">联系人：</span>
                  {{communityInfo.contact}}</div>
                <template v-if="communityInfo.level === 1">
                  <div>
                    <span class="info__label"> 索权范围：</span>
                    <el-popover
                      placement="top"
                      trigger="hover">
                      <div class="fs12">
                        <p>数据查看：查看成员社群的客流数据</p>
                        <p>设备操作：对成员社群的设备进行升级、重启等操作</p>
                      </div>
                      <i class="el-icon-question" slot="reference"></i>
                    </el-popover>
                    {{communityInfo.rule | authority }}</div>
                  <div>
                    <span class="info__label"> 邀请码：</span>
                    <span>{{communityInfo.code}}</span>
                    <a href="javascript:void (0)" @click="clipboard($event)">复制</a></div>
                </template>
                <div>
                  <span class="info__label">联系电话：</span>
                  {{communityInfo.phone}}</div>
                <div>
                  <span class="info__label">地区：</span>
                  <span class="ellipsis-64">{{communityInfo.fullAddress}}</span></div>
                <!--如果成员社群加入了管理员社群即展示其管理员社群列表-->
                <div class="parent__list" v-if="communityInfo.parentGroups && communityInfo.parentGroups.length && communityInfo.role === 1 && communityInfo.type!==3">
                  <span class="fl info__label">已加入：</span>
                  <div
                    v-for="(item,$index) in communityInfo.parentGroups"
                    :key="$index"
                    class="parents-item">
                    <span>{{item.name}}</span>
                    <uu-icon size="small" type="data"></uu-icon>
                    <uu-icon v-if="item.rule.length > 2" size="small" type="handle"></uu-icon>
                    <uu-icon
                      size="small" type="quit"
                      v-show="communityInfo.merchantGuid === userInfo.developerId"
                      @click.native="leaveCommunity('quit',communityInfo, item)"></uu-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="three__map--wrap">
              <three-association-map ref="associationMap"
                                     @addDevice="addDevice"
                                     @deleteDevice="deleteDevice"
                                     @addGateway="addGateway"
                                     @editGateway="editGateway"
                                     @deleteGateway="deleteGateway">
              </three-association-map>
            </div>
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
          @submit.native.prevent
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="nameForm"
          :rules="rules"
        >
          <el-form-item label="昵称：" prop="groupName">
            <el-input placeholder="请输入社群昵称" v-model="nameForm.groupName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="dialogFormVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="setNickName('nameForm')">{{communityInfo.GroupNickName?'添加': '确  定'}}</el-button>
        </div>
      </ob-dialog-form>
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
            <el-input placeholder="请输入社群名称" v-model="handleMemberForm.name"></el-input>
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
              <el-select placeholder="请选择门店所在楼层" v-model="handleMemberForm.floor">
                <el-option v-for="(item, $index) in floorList" :key="$index" :label="IntToFloor(item)" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="0">
              <div class="three__map--dialog">
                <three-map @handle-block-click="handleBlockClick"></three-map>
              </div>
            </el-form-item>
          </template>
          <el-form-item label="联系人：" prop="contact">
            <el-input type="text" placeholder="请输入联系人"
                      v-model.trim="communityForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input type="text" placeholder="11位手机号"
                      v-model.trim="communityForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="handleMemberVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="handleMember('handleMemberForm')">加入</el-button>
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
          <el-form-item v-if="handleCommunityType !== 4 && handleCommunityType !== 3" label="索权范围：" prop="rule">
            <el-checkbox-group class="g-pt10" v-model="communityForm.rule">
              <el-checkbox class="block" :label="1">设备操作权限
                <p class="form__item--des">查看成员社群的客流数据（必选项）</p>
              </el-checkbox>
              <el-checkbox style="margin:0;" :label="0">数据查看权限
                <p class="form__item--des">对成员社群的设备进行添加、升级等所有操作</p>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="addCommunityVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="handleCommunity('addCommunityForm')">{{communityInfo.GroupNickName?'添加': '确  定'}}</el-button>
        </div>
      </ob-dialog-form>

      <!--添加商场社群成功确认弹框-->
      <ob-dialog-form
        title="已添加成功，下方是自动生成的邀请码"
        :visible.sync="addCommunitySuccess"
        :showButton="false"
      >
        <div slot="content" class="affirm__content--warp">
          <span>1234568</span>
          <p class="c-grey tc">
            通过邀请码，可以邀请下属门店加入到您创建的社群，您可在社群详情中查看该邀请码
          </p>
        </div>
      </ob-dialog-form>
      <!--添加出入口-->
      <ob-dialog-form
        :title="communityDialogTitle"
        :visible.sync="handlePortalVisible"
        :showButton="false"
      >
        <el-form
          slot="form"
          ref="handlePortalForm"
          block-message
          style="width: 330px"
          label-position="left"
          class="common-form white"
          label-width="82px"
          :model="handlePortalForm"
          :rules="handlePortalRules"
        >
          <el-form-item label="名称：" prop="name">
            <el-input placeholder="请输入出入口名称" v-model="handlePortalForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt50">
          <el-button class="cancel" @click="handlePortalVisible = false">返 回</el-button>
          <el-button class="affirm" type="primary" @click="handlePortal('handlePortalForm')">{{handleCommunityType === 8?'添加': '保 存'}}</el-button>
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
import ThreeMap from '@/components/three/bindCommunity'
import {GetMarketList, GetCommunityInfo, GetCommunityInfoByCode, GetCommunityUpdate, CheckNameExist, CheckMemberNameExist, GetIndustry, GetGroupPortalInfo, DeleteCommunity, GetMarketFloorList, GetMemberDetail, AddMember, CreatePortal, EditPortal, DeletePortal, CheckPortalNameExist, JoinOtherManage, SonCommunitySearch} from '../../api/community'
import ThreeAssociationMap from '@/components/three/AssociationMap'
export default {
  name: 'mineCommunity',
  mixins: [Mixins],
  components: {
    ThreeMap,
    ThreeAssociationMap,
    'area-select': area
  },
  data () {
    const validateCode = (rule, value, callback) => {
      value = value.trim()
      // this.ManageInfo = {}
      if (!value) {
        callback(new Error('请输入社群邀请码'))
      } else {
        if (value.length === 10) {
          if (/^[\da-zA-Z]{10}$/.test(value)) {
            GetCommunityInfoByCode({code: value}).then(res => {
              if (res && res.id) {
                this.ManageInfo = res
                GetMarketFloorList({id: this.ManageInfo.id}).then(res => {
                  this.floorList = res
                })
                callback()
              } else {
                callback(new Error('邀请码不存在'))
              }
            }).catch(err => {
              callback(new Error(err.msg || '邀请码不存在'))
            })
          } else {
            callback(new Error('请输入正确的社群邀请码'))
          }
        } else {
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
          if (this.handleCommunityType === 4 && this.communityForm.originName === value) {
            callback()
          } else {
            CheckNameExist({name: value}).then(res => {
              !res ? callback() : callback(new Error('社群名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的社群名称'))
        }
      }
    }
    const validatePortalName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 20) {
          callback(new Error('请输入1-20位字符'))
        } else if (validateRule(value, 2)) {
          if (this.handleCommunityType === 9 && this.handlePortalForm.originName === value) {
            callback()
          } else {
            CheckPortalNameExist({name: value}).then(res => {
              !res ? callback() : callback(new Error('社群名称已存在'))
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
          if (this.type === 'update' && this.originName === value) {
            callback()
          } else {
            CheckMemberNameExist({name: value}).then(res => {
              !res ? callback() : callback(new Error('社群名称已存在'))
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
      communityInfo: {
        guid: ''
      },
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
      addCommunitySuccess: false, // 添加商场社群成功弹窗
      addCommunityVisible: false, // 添加社群
      handleMemberVisible: false,
      handlePortalVisible: false, // 操作出入口
      handleCommunityType: 1, // 添加社群的类型 1 商场 2 连锁总店 3 单个门店 4 编辑 商场、连锁总店、单个门店 5 添加成员 6 编辑成员 7 加入管理员社群
      communityForm: { // 添加社群表单对象
        name: '',
        code: '',
        pca: '',
        address: '',
        floor: '',
        contact: '',
        rule: [0],
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
        rule: [
          {required: true, type: 'array', message: '请选择索权范围', trigger: 'blur'}
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
        coordinates: []
      },
      handleMemberRules: {
        name: [
          {required: true, validator: validateMemberName, trigger: 'blur'}
        ],
        pca: [
          {required: true, message: '请选择省市区', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
        ],
        industryType: [
          {required: true, message: '请选取楼层', trigger: 'change'}
        ],
        floor: [
          {required: true, message: '请选取楼层', trigger: 'change'}
        ],
        contact: [
          {validator: validateContact, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ]
      },
      handlePortalForm: {
        coordinates: [],
        floor: '',
        name: '',
        type: ''
      },
      handlePortalRules: {
        name: [
          {
            validator: validatePortalName, trigger: 'blur'
          }
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
    if (this.currentManage.id) {
      this.getGroupList(this.currentManage.id)
    }
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
          title = '添加成员'
          break
        case 7:
          title = '加入管理员社群'
          break
        case 8:
          title = '添加出入口'
          break
        case 9:
          title = '编辑出入口'
          break
      }
      return title
    },
    dialogTitle: {
      get () {
        let txt = '添加昵称'
        if (this.communityInfo.groupNickName) {
          txt = '编辑昵称'
        } else if (this.communityInfo.groupPid) {
          txt = '编辑分组名'
        }
        return txt
      },
      set () {}
    },
    ...mapState(['loading', 'aliveState', 'userInfo', 'currentManage']),
    activeUrl: {
      get () {
        let type = 'edit'
        if (this.communityInfo.type === 3) {
          type = 'single'
        } else if (this.communityInfo.role === 1) {
          type = 'apply'
        }
        return `/community/${type}/${this.communityInfo.guid}`
      },
      set () {}
    },
    textState: {
      get () {
        let className = ''
        if (this.communityInfo.parentGroups && this.joinCommunityInfo.guid) {
          let cName = ''
          for (let item of this.communityInfo.parentGroups) {
            if (item.rule.length > 2) {
              cName = item.name
              break
            }
          }
          if (this.joinCommunityInfo.rule.length > 2 && cName) {
            this.$set(this.joinCommunityInfo, 'name', cName)
            className = 'danger'
          } else {
            className = 'safe'
          }
        }
        return className
      },
      set () {}
    },
    tableHeight: {
      get () {
        let baseHeight = 203
        if ((this.communityInfo.parentGroups && this.communityInfo.parentGroups.length) || this.communityInfo.role === 0) baseHeight = 173
        return this.deviceList.length ? (this.deviceList.length >= 5 ? 246 : (this.deviceList.length + 1) * 41) : baseHeight
      },
      set () {}
    },
    emptyMsg: {
      get () {
        // 自有社群/默认分组/自定义分组，无设备信息时显示信息
        let msg = {
          supply: '设备请到左侧［设备管理］中添加',
          text: '您尚未添加设备'
        }
        // 分组下无成员社群时提示信息显示
        if (this.currentCommunity.groupPid && this.currentCommunity.memberItem && !this.currentCommunity.memberItem.length) {
          msg.supply = ''
          msg.text = '尚无成员社群'
        }
        return msg
      },
      set () {}
    }
  },
  methods: {
    // 文件上传成功回调
    handleSuccess (res, file) {
      console.log(res)
    },
    onChange (file, fileList) {
      console.log(file, fileList)
      if (file.row.type === 'image/svg+xml') {}
    },
    // 上传前校验文件类型 只允许svg 文件上传
    beforeUpload (file) {
      console.log(file)
      if (file) {
      }
    },
    // 自定义文件上传
    httpRequest () {},
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
          if (res[0]) {
            let restoreArray = this.$restoreArray(this.groupList, 'subGroupSon')
            let getCurrent = () => {
              // 多层for循环嵌套只能用return跳出整个循环，break 只能跳出当前循环
              for (let i = 0, len = restoreArray.length; i < len; i++) {
                for (let k = 0, len2 = res.length; k < len2; k++) {
                  if (res[k] === restoreArray[i].groupGuid) {
                    return restoreArray[i]
                  }
                }
              }
            }
            // 数组去重
            let setKey = new Set(res)
            let setArr = []
            // 获取匹配值列表
            restoreArray.map(item => {
              if (setKey.has(item.groupGuid)) {
                setArr.push(item.uniqueKey)
              }
            })
            let current = getCurrent()
            this.expandedKeys = setArr
            this.$nextTick(() => {
              if (this.$refs.groupNav) {
                this.$refs.groupNav.setCheckedKeys(setArr)
                this.$refs.groupNav.setCurrentKey(current.uniqueKey)
                this.getCommunityInfo(current)
              }
            })
          } else {
            this.searchEmpty = true
            this.tipMsg = `搜不到包含“${val}”的内容`
            // this.supply = '设备请到左侧［设备管理］中添加'
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
          this.$refs.groupNav.setCurrentKey(current.uniqueKey)
          this.$refs.groupNav.setCheckedKeys([])
          this.getCommunityInfo(current)
        }
      })
    },
    // 获取商场社群列表
    getGroupList () {
      if (!this.currentManage) return
      let pid = this.currentManage.id
      GetMarketList({parentId: pid}).then(res => {
        console.log(res)
        this.groupList = res || []
        // 当key 返回string时,即恢复默认选中状态
        // if (typeof data === 'string') data = res.data[0]
        // 编辑页返回时记住当前页状态
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentCommunity : false) || (this.currentCommunity.uniqueKey ? this.currentCommunity : false) || this.groupList[0] || {}
        let uniqueKey
        this.$nextTick(() => {
          if (this.$refs.groupNav) {
            // 默认只展开默认分组列表
            // 创建成员社群后返回我的社群列表时默认显示管理员社群
            // 根据当前选中的社群的guid重新确定当前社群在树形结构的uniqueKey
            if (this.$route.params.groupGuid || pid || currentNode.groupGuid) {
              for (let i = 0, len = this.groupList.length; i < len; i++) {
                let item = this.groupList[i]
                if (pid && pid === item.groupGuid) {
                  let item2 = item.subGroupSon[item.subGroupSon.length - 1].subGroupSon
                  for (let k = 0, len2 = item2.length; k < len2; k++) {
                    if (item2[k].groupGuid === currentNode.groupGuid) {
                      uniqueKey = item2[k].uniqueKey
                      break
                    }
                  }
                } else if (item.groupGuid === this.$route.params.groupGuid || item.groupGuid === currentNode.groupGuid) {
                  uniqueKey = item.uniqueKey
                  break
                }
              }
              this.$route.params.groupGuid = ''
            }
            this.groupList.filter(item => item.subGroupSon && item.subGroupSon.length).map(item => {
              if (item.memberItem && item.subGroupSon[item.subGroupSon.length - 1]) {
                this.expandedKeys.push(item.subGroupSon[item.subGroupSon.length - 1].uniqueKey)
              }
              this.expandedKeys.push(item.uniqueKey)
            })
            this.expandedKeys.push(uniqueKey || currentNode.uniqueKey)
            if (!Object.keys(this.communityInfo).length) this.communityInfo = currentNode
            if (!Object.keys(this.currentCommunity).length) this.currentCommunity = currentNode
            // 通过自定义唯一标识uniqueKey 设置默认选中项
            this.$refs.groupNav.setCurrentKey(uniqueKey || currentNode.uniqueKey)
            this.$nextTick(() => {
              // 在树形组件中重新获取当前选中项，并保存当前值
              let node = this.$refs.groupNav.$refs.GroupTree.getCurrentNode()
              this.currentCommunity = node
              if (this.currentCommunity.groupPid) {
                this.communityInfo = node
              }
              if (currentNode.parentId) {
                this.getCommunityInfo(node)
              }
            })
          }
          this.$route.meta.keepAlive = false
        })
      })
    },
    // 获取社群详细信息
    getCommunityInfo (val, node) {
      let guid = val.parentId || val.guid
      if (!guid) return
      if (node && node.level === 3) {
        GetMemberDetail({groupSonId: val.id, parentId: this.currentManage.id}).then(res => {
          res.level = node.level
          this.communityInfo = res || {}
        })
      } else {
        GetCommunityInfo({id: guid}).then(res => {
          if (res) res.groupPid = val.groupPid
          res.level = 1
          this.communityInfo = res || {}
        })
      }
    },
    // 切换 / 新建自定义分组
    currentChange (data, node) {
      console.log('change', data, node)
      if (node.level !== 2) {
        this.getCommunityInfo(data, node)
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
    // 显示修改昵称dialog
    showDialog () {
      // 编辑分组名
      if (this.communityInfo.groupPid) {
        this.groupsNameForm = JSON.parse(JSON.stringify(this.communityInfo))
        this.groupsNameFormVisible = true
      } else {
        // 修改、添加昵称
        this.nameForm = {
          groupGuid: this.communityInfo.guid,
          groupName: this.communityInfo.groupNickName,
          groupPid: this.currentCommunity.parents.groupGuid
        }
        this.dialogFormVisible = true
      }
    },
    // 设置昵称
    setNickName (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http('/group/nickName/update', this.nameForm).then(res => {
            this.$tip('操作成功')
            this.currentCommunity.name = this.nameForm.groupName
            this.getGroupList()
            this.dialogFormVisible = false
          })
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
      let [url, des] = ['/group/exit', '']
      let params = {
        groupPid: parent.guid || parent.groupGuid,
        groupGuid: current.groupGuid || current.guid,
        groupNickName: current.groupNickName || current.name,
        parentGroupNickName: parent.groupNickName || parent.name
      }
      switch (type) {
        case 'quit':
          des = `确定退出该管理员社群？`
          url = '/group/exit'
          break
        default:
          des = `确定删除该社群？`
          url = '/group/remove'
      }
      this.$affirm({text: `${des}`}, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http(url, params).then(res => {
            this.$tip(`${type === 'quit' ? '退出' : '移除'}成功`)
            this.getGroupList()
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
          subData.groupId = this.communityInfo.id
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
          subData.rule = subData.rule.toString()
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
      console.log(this.handleMemberForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.handleMemberForm))
          let address = subData.pca.split(',').map(Number)
          subData.provinceAreaId = address[0] || 0
          subData.cityAreaId = address[1] || 0
          subData.districtAreaId = address[2] || 0
          subData.parentId = this.currentManage.id
          if (!subData.coordinates || !subData.coordinates.length) {
            this.$tip('请选取绑定区域', 'error')
            return
          }
          AddMember(subData).then(res => {
            this.$tip('添加成功')
            this.handleMemberVisible = false
            this.getGroupList()
          })
        } else {
        }
      })
    },
    handlePortal (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let subData = JSON.parse(JSON.stringify(this.handlePortalForm))
          if (this.handleCommunityType === 8) { // 添加出入口
            CreatePortal(subData).then(res => {
              this.$tip('添加成功')
              this.handlePortalVisible = false
            })
          } else { // 编辑出入口
            EditPortal(subData).then(res => {
              this.$tip('保存成功')
              this.handlePortalVisible = false
            })
          }
        }
      })
    },
    // 显示添加社群dialog, 并设置数据
    showAddDialog (node, data) {
      this.disabledKeys = data.memberItem.map(item => item.groupGuid)
      this.addCommunityList = node.parent.childNodes[node.parent.childNodes.length - 1].data.memberItem.filter(item => !new Set(this.disabledKeys).has(item.groupGuid))
      this.$nextTick(() => {
        this.addCommunityVisible = true
      })
    },
    // 向分组添加社群
    addCommunity (formName) {
      console.log(this.communityForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addCommunityVisible = false
          this.addCommunitySuccess = true
          console.log('success', this.communityForm)
        } else {
        }
      })
    },
    // 复制邀请码
    clipboard (event) {
      Clipboard(this.communityInfo.code, event)
    },
    // 显示添加社群弹窗（商场、连锁店、单个门店）
    showAddForm (type) {
      this.handleCommunityType = type
      if (type === 5 || type === 7) {
        GetIndustry().then(res => {
          this.industryList = res
        })
        if (type === 5) {
          GetMarketFloorList({id: this.communityInfo.id}).then(res => {
            this.floorList = res
          })
        }
      } else if (type === 5) {
        let copyData = JSON.parse(JSON.stringify(this.communityInfo))
        copyData.pca = `${copyData.provinceAreaId},${copyData.cityAreaId},${copyData.districtAreaId}`
        copyData.rule = (copyData.rule || '1').split(',').map(Number)
        copyData.originName = JSON.parse(JSON.stringify(copyData.name))
        this.communityForm = copyData
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
          this.handleMemberVisible = true
          break
        case 7:
          this.joinFormVisible = true
      }
    },
    // 解散社群
    deleteGroup () {
      GetGroupPortalInfo({groupId: this.communityInfo.id}).then(res => {
        if (res.length) {
          this.$affirm({text: `删除社群前，请先删除出入口`, title: '删除社群', confirm: '我知道了'}, (action, instance, done) => {
            done()
          })
        } else {
          this.$affirm({text: `删除社群后，社群下的所有信息都将被删除`, title: '删除社群', confirm: '删除'}, (action, instance, done) => {
            if (action === 'confirm') {
              DeleteCommunity({id: this.communityInfo.id}).then(res => {
                console.log('删除', res)
                this.$tip('删除成功')
              })
            }
            done()
          })
        }
      })
    },
    // 地图区块点击事件
    handleBlockClick (data) {
      console.log('block position', data)
      this.handleMemberForm.coordinates = data.geometry.attributes.position.array.toString().split(',').map(Number)
    },
    /************
     *** three ***
     ************/
    // 添加设备
    // deviceInfo: list: 出入口绑定设备 title: 出入口名称
    addDevice (deviceInfo) {
      let myConfirm = confirm('添加一个设备')
      if (myConfirm === true) {
        deviceInfo.list.push({device: '北门4', id: 4})
        this.$refs.associationMap.getDevice(deviceInfo)
      } else if (myConfirm === false) {
        console.log('cancel')
      }
    },
    // 删除设备
    // deviceItem：单条设备数据
    deleteDevice (deviceItem) {
      confirm(`删除一个设备 - 设备id: ${deviceItem.id} - 设备名: ${deviceItem.device}`)
    },
    // 添加出入口
    // position: 坐标，flat: 图片名字（qizi1，qizi2）
    addGateway (position, flat) {
      this.handlePortalForm.coordinates = [position.x, position.y, 0]
      this.handleCommunityType = 8
      this.handlePortalVisible = true
      if (flat === 'qizi2') {
        // 主出入口
        this.handlePortalForm.type = 0
      } else {
        // 其他出入口
        this.handlePortalForm.type = 1
      }
      console.log(flat)
      // let myConfirm = confirm(`出入口当前坐标点: ${position.x}, ${position.y}, 0`)
      // if (myConfirm === true) {
      //   let obj = {
      //     text: '123',
      //     position: position,
      //     flat: flat
      //   }
      //   this.$refs.associationMap.createSprite(obj)
      // } else if (myConfirm === false) {
      //   console.log('cancel')
      // }
    },
    // 编辑出入口
    // name: 出入口名称
    editGateway (data) {
      this.handleCommunityType = 9
      this.handlePortalVisible = true
      let copy = JSON.parse(JSON.stringify(data))
      copy.originName = JSON.parse(JSON.stringify(copy.name || ''))
      this.handlePortalForm = copy
      // confirm(`编辑出入口名字: ${name}`)
    },
    // 删除出入口
    deleteGateway (data) {
      this.$affirm({text: `删除出入口后，出入口与设备之间的绑定关系也会被删除`, title: '删除出入口', confirm: '删除'}, (action, instance, done) => {
        if (action === 'confirm') {
          DeletePortal({portalGuid: data.id, groupId: data.groupId}).then(res => {
            this.$tip('删除成功')
          })
        }
        done()
      })
      // confirm(`删除出入口: ${name}`)
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.getGroupList()
      },
      deep: true
    },
    handleMemberVisible (val) {
      if (!val) {
        this.$refs.handleMemberForm.resetFields()
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
        padding: 20px;
        background: rgba(1,8,20,0.10);
        border-bottom: 1px dashed rgba(151,151,151, 0.1);
        font-size: 12px;
        box-sizing: border-box;
        overflow: hidden;
        > div {
          float: left;
          width: 33%;
          height: 16px;
          &:nth-child(1),&:nth-child(2),&:nth-child(3){
            margin-bottom: 18px;
          }
          > * {
            float: left;
          }
        }
        .parent__list{
          width: auto;
          .parents-item{
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

.affirm__content--warp{
  > span{
    font-size: 50px;
  }
  width: 288px;
  margin: 16px auto 50px;
  font-size: 12px;
  text-align: center;
}
</style>
