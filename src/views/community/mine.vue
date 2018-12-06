<template>
    <div class="mine__community--wrap">
      <uu-sub-tab
        class="pd--lr20"
        show-button
        btn-size="small"
        :show-popover="showPopover"
        popover="社群添加点这里"
        :sub-btn="{text: '创建社群'}"
        @handle-btn="() =>  createFormVisible = true"
        @remote-search="remoteSearch"
        placeholder="输入社群名称"
        :btn-array="btnArray"
        :menu-array="[{title: '我的社群'}]">
      </uu-sub-tab>
      <div class="mine__community--main" :class="{'data-empty': !groupList.length || searchEmpty}">
        <ob-list-empty v-if="!groupList.length || searchEmpty" top="70px" :supply="supply" :text="tipMsg"></ob-list-empty>
        <div class="mine__community--content" v-else>
          <div class="community--sidebar">
            <ob-group-nav
              is-edit
              rights
              filter
              :expanded-all="false"
              ref="groupNav"
              only-checked
              node-key="uniqueKey"
              :expanded-keys="expandedKeys"
              v-model="groupList"
              type="community"
              @handle-plus="showAddDialog"
              @refresh="getGroupList"
              @current-change="currentChange"></ob-group-nav>
          </div>
          <div class="community--main">
            <div class="cmm-top" ref="ciContentTop">
              <h2 class="cmm-sub-title">
                  <span>{{communityInfo.name}}{{communityInfo.groupNickName?`（${communityInfo.groupNickName}）`:''}}
                    <a v-if="communityInfo.groupNickName !== undefined || communityInfo.groupPid || (communityInfo.merchantGuid && communityInfo.merchantGuid !== userInfo.developerId)"  class="fs12" @click="showDialog" href="javascript:void (0)">
                      <i class="el-icon-edit"></i>
                      {{(communityInfo.merchantGuid && communityInfo.merchantGuid !== userInfo.developerId) ? dialogTitle : ''}}
                    </a>
                  </span>
                <p class="handle fr fs12">
                  <i @click="showAddForm(communityInfo.role === 0?5:7)">{{communityInfo.role === 0 ? '添加成员' : '加入管理员'}}</i>
                  <i class="el-icon-edit" @click="showAddForm(4)"></i>
                  <i class="el-icon-delete" @click="deleteGroup"></i>
                </p>
              </h2>
              <div class="cm-info-wrap">
                <p class="g-mb18">
                  <span class="info__label">社群名称：</span><span class="ellipsis-64">{{communityInfo.name}}</span></p>
                <p class="g-mb18">
                  <span class="info__label">联系人：</span>
                  {{communityInfo.contact}}</p>
                <p class="g-mb18" v-if="communityInfo.role === 0">
                  <span class="info__label"> 索权范围：</span>
                  {{communityInfo.rule | authority }}</p>
                <p v-if="communityInfo.role === 0">
                  <span class="info__label"> 邀请码：</span>
                  {{communityInfo.code}}
                  <a href="javascript:void (0)" @click="clipboard($event)">复制</a></p>
                <p>
                  <span class="info__label">联系电话：</span>
                  {{communityInfo.phone}}</p>
                <p>
                  <span class="info__label">地区：</span>
                  <span class="ellipsis-64">{{communityInfo.fullAddress}}北京</span></p>
              </div>
            </div>
            <div class="three__map--wrap">

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

      <!--创建社群-->
      <ob-dialog-form
        width="600px"
        custom-class="el-dialog--pd0"
        :show-button="false"
        title="请根据实际情况创建一个社群"
        :visible.sync="createFormVisible"
      >
        <div class="create__community--content" slot="content">
          <div class="cc__item">
            <div class="icon--wrap" @click="showAddForm(1)">
              <img src="@/assets/community/market_icon@2x.png" alt="">
              <p>商场</p>
            </div>
            <p class="c-grey fs12">可包含单店，如：银泰商城</p>
          </div>

          <div class="cc__item">
            <div class="icon--wrap" @click="showAddForm(2)">
              <img src="@/assets/community/chain_icon@2x.png" alt="">
              <p>连锁总店</p>
            </div>
            <p class="c-grey fs12">可包含单店，如：屈臣氏总店</p>
          </div>

          <div class="cc__item">
            <div class="icon--wrap" @click="showAddForm(3)">
              <img src="@/assets/community/single_icon@2x.png" alt="">
              <p>单个门店</p>
            </div>
            <p class="c-grey fs12">如：银泰商城下的屈臣氏</p>
          </div>

        </div>
      </ob-dialog-form>
      <!--加入其他管理员社群-->
      <ob-dialog-form
        :show-button="false"
        :title="communityDialogTitle"
        :visible.sync="joinFormVisible">
        <el-form
            slot="form"
            ref="joinManageForm"
            block-message
            style="width: 330px"
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
            <template v-if="ManageInfo.guid">
              <el-form-item label-width="0">
                <div class="custom__form--item">
                  <div class="custom__form--label">
                    管理员<br/>社群信息：
                  </div>
                  <div class="custom__form--content">
                    <span class="c-grey">名称：</span><span class="ellipsis">屈臣氏总店</span>
                    <span class="c-grey">类型：</span><span>{{ManageInfo.type === 1 ? '连锁' : '商场' }}</span>
                  </div>
                </div>
              </el-form-item>
              <template v-if="ManageInfo.type === 1">
                <el-form-item label="地区：" prop="pca">
                  <area-select placeholder="请选择地区" v-model="joinManageForm.pca"></area-select>
                </el-form-item>
                <el-form-item prop="address">
                  <el-input type="text" placeholder="请输入详细地址"
                            v-model.trim="joinManageForm.address"></el-input>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="业态：" prop="format">
                  <el-select placeholder="请选择门店所属业态类型" v-model="joinManageForm.format">
                    <el-option value="1">餐饮</el-option>
                    <el-option value="2">娱乐</el-option>
                    <el-option value="3">运动</el-option>
                    <el-option value="4">服装</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="楼层：" prop="floor">
                  <el-select placeholder="请选择门店所在楼层" v-model="joinManageForm.floor">
                    <el-option value="1">F1</el-option>
                    <el-option value="2">F2</el-option>
                    <el-option value="3">F3</el-option>
                    <el-option value="4">F4</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                  <div class="three__map--wrap">
                  </div>
                </el-form-item>
              </template>
            </template>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="joinFormVisible = false">返 回</el-button>
          <el-button
            class="affirm"
            :disabled="textState!=='safe'"
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
            <el-form-item label="业态：" prop="format">
              <el-select placeholder="请选择门店所属业态类型" v-model="handleMemberForm.format">
                <el-option value="1">餐饮</el-option>
                <el-option value="2">娱乐</el-option>
                <el-option value="3">运动</el-option>
                <el-option value="4">服装</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼层：" prop="floor">
              <el-select placeholder="请选择门店所在楼层" v-model="handleMemberForm.floor">
                <el-option value="1">F1</el-option>
                <el-option value="2">F2</el-option>
                <el-option value="3">F3</el-option>
                <el-option value="4">F4</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="0">
              <div class="three__map--dialog">
                <three-map></three-map>
              </div>
              <!--<el-input placeholder="导入地图" v-model="handleMemberForm.map"></el-input>-->
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
          <el-button class="affirm" type="primary" @click="addCommunity('addCommunityForm')">加入</el-button>
        </div>
      </ob-dialog-form>

      <!--添加社群（商场、连锁总店、单个门店）-->
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
          <el-form-item v-if="handleCommunityType !== 4" label="楼层：" prop="floor">
            <el-input placeholder="请输入社群名称" v-model="communityForm.floor"></el-input>
          </el-form-item>
          <el-form-item v-if="handleCommunityType !== 4" prop="map">
            <el-input placeholder="导入地图" v-model="communityForm.map"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contact">
            <el-input type="text" placeholder="请输入联系人"
                      v-model.trim="communityForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input type="text" placeholder="11位手机号"
                      v-model.trim="communityForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="索权范围：" prop="rule">
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
          <el-button class="affirm" type="primary" @click="addCommunity('addCommunityForm')">{{communityInfo.GroupNickName?'添加': '确  定'}}</el-button>
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
    </div>
</template>

<script>
import {makeCustomName} from '@/utils'
import {validateRule} from '@/utils/validate'
import {mapState} from 'vuex'
import Clipboard from '@/utils/clipboard'
import area from '@/components/area-select/area-select'
import ThreeMap from '@/views/three/index'
export default {
  name: 'mineCommunity',
  components: {
    ThreeMap,
    'area-select': area
  },
  data () {
    const validateCode = (rule, value, callback) => {
      value = value.trim()
      this.joinCommunityInfo = {}
      if (!value) {
        callback(new Error('请输入社群邀请码'))
      } else {
        if (value.length === 10) {
          if (/^[\da-zA-Z]{10}$/.test(value)) {
            this.$http('/group/info/code', {code: value}, false).then(res => {
              if (res.data && res.data.guid) {
                this.joinCommunityInfo = res.data
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
          if (this.type === 'update' && this.originName === value) {
            callback()
          } else {
            this.$http('/group/name/exist', {name: value}, false).then(res => {
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
        code: ''
      },
      joinManageRules: {
        code: [
          {validator: validateCode, trigger: 'change'}
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
        format: '',
        floor: ''
      },
      handleMemberRules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
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
    this.getGroupList()
  },
  mounted () {
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
    ...mapState(['loading', 'aliveState', 'userInfo']),
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
    // 社群搜索
    // 搜索社群
    remoteSearch (val) {
      this.searchEmpty = false
      this.currentCommunity = {}
      if (val) {
        this.$http('/group/list/search', {searchText: val}).then(res => {
          if (res.data[0]) {
            let restoreArray = this.$restoreArray(this.groupList, 'memberItem')
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
    // 获取社群列表
    getGroupList (data, pid) {
      this.$http('/group/list').then(res => {
        res.data.map(item => {
          if (item.role === 0 && item.memberItem && item.memberItem.length) {
            item.memberItem.unshift({button: 'groups', parentNode: JSON.parse(JSON.stringify(item))})
          }
        })
        this.groupList = res.data || []
        // 当key 返回string时,即恢复默认选中状态
        if (typeof data === 'string') data = res.data[0]
        // 编辑页返回时记住当前页状态
        let currentNode = (this.$route.meta.keepAlive ? this.aliveState.currentCommunity : false) || data || (this.currentCommunity.uniqueKey ? this.currentCommunity : false) || this.groupList[0] || {}
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
                  let item2 = item.memberItem[item.memberItem.length - 1].memberItem
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
            this.groupList.filter(item => item.memberItem && item.memberItem.length).map(item => {
              if (item.memberItem && item.memberItem[item.memberItem.length - 1]) {
                this.expandedKeys.push(item.memberItem[item.memberItem.length - 1].uniqueKey)
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
              if (currentNode.groupGuid) {
                this.getCommunityInfo(node)
              }
            })
          }
          this.$route.meta.keepAlive = false
        })
      })
    },
    // 获取社群详细信息
    getCommunityInfo (val) {
      let guid = val.groupGuid || val.guid
      if (!guid) return
      this.$http('/group/getInfo', {guid: guid}).then(res => {
        if (res.data) res.data.groupPid = val.groupPid
        res.data.groupNickName = val.groupNickName || (this.currentCommunity || this.groupList[0] || {}).groupNickName
        if (res.data.groupPid) this.originName = JSON.parse(JSON.stringify(res.data.groupNickName))
        this.communityInfo = res.data || {}
        if (this.communityInfo.name !== this.currentCommunity.name) {
          this.$set(this.communityInfo, 'groupNickName', this.currentCommunity.name)
        }
      })
    },
    // 切换 / 新建自定义分组
    currentChange (data, node) {
      console.log('change', data)
      if (!data.button) {
        this.currentCommunity = data
        if (data.groupPid === undefined && node.parent.parent) {
          this.$set(this.currentCommunity, 'parents', JSON.parse(JSON.stringify(node.parent.parent.data)))
        } else {
          delete this.currentCommunity.parents
        }
        // 查询社群详细信息
        if (data.groupGuid) {
          this.getCommunityInfo(data)
        } else { // 分组信息直接设置，不再查询
          this.communityInfo = JSON.parse(JSON.stringify(data))
        }
      } else {
        // 点击新建分组是默认选中状态值不改变
        this.$refs.groupNav.setCurrentKey(this.currentCommunity.uniqueKey)
        // 根据自定义分组名规则筛选已存在的文件，排序过滤后重新定义新的文件名
        let cName = makeCustomName(data.parentNode.memberItem, 'name', '分组')
        this.groupsNameForm = {
          name: cName,
          customType: 'create',
          groupPid: data.parentNode.groupGuid
        }
        this.groupsNameFormVisible = true
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
          let subData = {
            groupPid: this.joinCommunityInfo.guid,
            groupGuid: this.communityInfo.guid,
            groupName: this.communityInfo.name
          }
          this.$http('/group/join', subData).then(res => {
            this.$tip('加入成功')
            this.joinFormVisible = false
            this.getGroupList(this.currentCommunity, this.joinCommunityInfo.guid)
          })
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
    // 删除社群
    deleteGroup () {
      this.$affirm({text: `删除社群前，请先删除出入口`, title: '删除社群', confirm: '我知道了'}, (action, instance, done) => {
        if (action === 'confirm') {
        }
        done()
      })
    }
  },
  watch: {
    joinFormVisible (val) {
      // if (!val) {
      //   this.joinForm.code = ''
      //   this.joinCommunityInfo = {}
      // }
    },
    addCommunityVisible (val) {
      if (!val) {
        this.$refs.addCommunityForm.clearValidate()
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
        > p {
          float: left;
          width: 33%;
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
/*创建社群弹框样式*/
.create__community--content{
  overflow: hidden;
  margin-top: 42px;
  margin-bottom: 50px;
  text-align: center;
  .cc__item{
    display: inline-block;
    width: 32%;
    .icon--wrap{
      cursor: pointer;
      img {
        width: 86px;
        height: 86px;
      }
      color: #0F9EE9;
    }
  }
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
