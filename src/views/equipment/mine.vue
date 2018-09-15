<template>
  <div class="equipment-list-wrap">
    <uu-sub-tab
      :back="isSearch"
      :search="!isSearch"
      @remote-search="search"
      :menu-array="[{title: $route.params.key?$route.params.key:'设备列表'}]"></uu-sub-tab>
    <uu-sub-tab
      v-if="!isSearch"
      size="medium"
      :show-button="!equipmentEmpty"
      :sub-btn="{text:'添加'}"
      @handle-btn="showDialog('device')"
      :menu-array="menu2"></uu-sub-tab>
    <ob-list-empty
      top="106px"
      v-if="!equipmentList.length"
      :text="isSearch?'查询不到该设备':'您尚无设备，请点击【添加】'">
    </ob-list-empty>
    <div class="data-list-wrap" v-if="equipmentList.length">
      <el-scrollbar>
        <template v-for="(item,$index) in equipmentList">
          <ob-list :key="$index">
            <ob-list-item width="16%" type="state" :data="item" :isAmend="true">
            </ob-list-item>
            <ob-list-item width="23%">
              <p><span class="table__label">序列号：</span><span>{{item.deviceKey}}</span></p>
              <p><span class="table__label">设备类型：</span><span>{{item.deviceType|deviceType}}</span></p>
              <p>
                <span class="table__label">添加时间：</span><span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span>
              </p>
            </ob-list-item>
            <ob-list-item width="8%">
              <p class="tac">
                <span>用途：</span><br>
                <router-link v-if="item.deviceType===1" :to="'/equipment/more/'+item.deviceKey">详情</router-link>
                <span v-else>{{item.deviceType | deviceType}}</span>
              </p>
            </ob-list-item>
            <ob-list-item ref="deviceItem" width="23%">
              <p v-if="!item.groupGuid">
                <span>绑定社群：</span>
                <a href="javascript:void (0)" @click="showDialog('community',item)">未绑定</a>
              </p>
              <template v-else>
                <p>
                  <span>绑定社群：</span>
                  <span>{{item.groupName}}</span>
                  <el-tooltip content="解绑社群" v-model="item.tipShow" placement="top">
                    <uu-icon type="relieve" class="fr" @click.native="unBindCommunity(item,$index)"></uu-icon>
                  </el-tooltip>
                </p>
                <p><span>绑定时间：</span><span>{{item.bindingTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>
                <p><span>应用场景：</span>
                  <el-tooltip :content="item.deviceScene" placement="top">
                    <span class="ellipsis">{{item.deviceScene}}</span>
                  </el-tooltip>
                </p>
              </template>
            </ob-list-item>
            <ob-list-item
              @refresh="getMineEquipment"
              :style="{minWidth: '220px'}"
              width="20%"
              :data="item"
              type="handle"
              :showDelete="true">
            </ob-list-item>
          </ob-list>
        </template>
        <el-pagination
          v-if="pagination.total && pagination.total>pagination.length"
          @current-change="getMineEquipment"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total,prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    </div>
    <ob-dialog-form
      v-model="dialogForm"
      :group="groupList"
      @remote-submit="submitForm"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      dialogOptions: { // dialog 弹窗配置 类型 标题文本
        type: 'device',
        title: '添加设备'
      },
      equipmentEmpty: false,
      dialogForm: { // dialog 表单
        deviceKey: '',
        deviceName: '',
        type: ''
      },
      menu2: [ // 导航栏配置信息
        {title: '自有设备', index: '/equipment/mine'},
        {title: '子社群设备', index: '/equipment/children'}
      ],
      groupList: [], // 自有社群列表
      equipmentList: [], // 设备列表
      pagination: {}, // 分页信息
      dialogFormVisible: false,
      isSearch: false
    }
  },
  methods: {
    // 自有设备搜索
    search (val) {
      if (val) {
        this.$router.push(`/equipment/search/mine/${val}`)
      }
    },
    // 弹窗表单提交
    submitForm (data) {
      if (this.dialogOptions.type === 'device') {
        // 添加商户设备
        this.$http('/merchant/device/create', data).then(res => {
          this.dialogFormVisible = false
          this.$tip('创建成功')
          this.getMineEquipment()
        }).catch(() => {
          this.dialogFormVisible = false
        })
      } else {
        // 绑定社群
        data.groupNickName = this.groupList[data.groupGuid].groupNickName
        data.groupGuid = this.groupList[data.groupGuid].groupGuid
        this.bindCommunity(data)
      }
    },
    // 获取社群树形结构数据
    getGroupList () {
      this.$http('/group/list').then(res => {
        this.groupList = res.data
      })
    },
    showDialog (type, data) {
      this.dialogFormVisible = false
      this.dialogOptions.type = type || 'device'
      this.dialogOptions.title = type === 'device' ? '添加设备' : '绑定社群'
      if (this.dialogOptions.type === 'device') {
        this.dialogForm = {
          deviceKey: '',
          deviceName: '',
          type: ''
        }
      } else {
        this.dialogForm = {
          deviceKey: data.deviceKey,
          deviceName: data.deviceName,
          groupGuid: '',
          deviceScene: ''
        }
      }
      if (type === 'community' && !this.groupList.length) {
        this.$affirm({
          text: '没有可绑定的社群，前往<a href="/community/create">创建社群</a>。'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }, 'caution')
      } else {
        this.dialogFormVisible = true
      }
    },
    // 获取自有设备
    getMineEquipment (page) {
      page = page || (this.$route.meta.keepAlive ? (this.aliveState.pagination ? this.aliveState.pagination.index : 1) : this.pagination.index ? this.pagination.index : 1)
      this.$http('/device/list', {index: page, searchText: this.$route.params.key || '', length: 8}).then(res => {
        this.equipmentList = res.data.content || []
        this.pagination = res.data.pagination
        if (!this.groupList.length) {
          this.getGroupList()
        }
      })
    },
    // 解绑社群
    unBindCommunity (value, index) {
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '将设备从社群解绑，您将无法查看该设备数据/无法操作设备。<br>确定要将【<span class="maxw110 ellipsis">' + value.deviceName + '</span>】设备从【<span class="maxw110 ellipsis">' + value.groupName + '</span>】社群解绑？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          done()
          this.$http('/device/unbinding', {
            deviceKey: value.deviceKey,
            groupGuid: value.groupGuid
          }).then(res => {
            this.$tip('解绑成功')
            this.$set(value, 'groupGuid', null)
            this.$refs.deviceItem[index].getDeviceState(value, value.deviceStatus === undefined ? null : undefined)
          })
        } else {
          // 隐藏hover 提示信息
          setTimeout(() => { value.tipShow = false }, 5)
          done()
        }
      })
    },
    // 绑定社群
    bindCommunity (data) {
      this.dialogFormVisible = false
      this.$load('设备绑定中...')
      data.name = data.deviceName
      this.$http('/device/binding', data).then(res => {
        this.$load().close()
        this.$tip('绑定成功')
        this.getMineEquipment(this.pagination.index)
      }).catch(() => {
        this.$load().close()
      })
    }
  },
  created () {
    this.isSearch = this.$route.name === 'searchMine'
    this.getMineEquipment()
  },
  filters: {
    type: function (val) {
      switch (val) {
        case 1:
          return '分析终端'
        case 2:
          return '客行分析一体机'
        default:
          return '人脸抓拍一体机'
      }
    }
  },
  computed: {
    ...mapState(['loading', 'aliveState'])
  },
  watch: {
    '$route': {
      handler (val) {
        // if (val.name === 'equipment') {
        //   this.$store.commit('SET_ALIVE_STATE', {
        //     pagination: this.pagination
        //   })
        // }
        this.isSearch = (val.name === 'searchMine')
        this.equipmentList = []
        this.getMineEquipment()
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_ALIVE_STATE', {
      pagination: this.pagination
    })
  }
}
</script>

<style scoped>
  .data-list-wrap {
    padding-top: 24px;
    height: calc(100% - 134px);
  }

  .data-list-wrap > .el-scrollbar {
    height: 100%;
  }
</style>
