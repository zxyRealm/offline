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
      :sub-btn="{text:'创建'}"
      @handle-btn="showDialog('device')"
      :menu-array="menu2"></uu-sub-tab>
    <ob-list-empty
      v-if="!equipmentList.length"
      :text="isSearch?'查询不到该设备。':'您还没有设备，点击【创建】进行添加设备。'">
    </ob-list-empty>
    <div class="data-list-wrap" v-else>
      <el-scrollbar>
      <template v-for="(item,$index) in equipmentList">
        <ob-list>
          <ob-list-item width="16%" type="state" :data="item" :isAmend="true">
          </ob-list-item>
          <ob-list-item width="23%">
            <p><span>序列号：</span><span>{{item.deviceKey}}</span></p>
            <p><span>设备类型：</span>{{item.deviceType|deviceType}}</p>
            <p><span>添加时间：</span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
          </ob-list-item>
          <ob-list-item width="8%">
            <p class="tac"><span>用途：</span><br>
              <router-link v-if="item.deviceType===1" :to="'/equipment/more/'+item.deviceKey">详情</router-link>
              <template v-else>
                {{item.deviceType | deviceType}}
              </template>
            </p>
          </ob-list-item>
          <ob-list-item width="23%">
            <p v-if="!item.groupGuid">
              <span>绑定社群：</span>
              <a href="javascript:void (0)" @click="showDialog('community',item)">未绑定</a>
              <span style="display: inline-block;width: 14px;height: 14px;" class="fr"></span>
            </p>
            <template v-else>
              <p>
                <span>绑定社群：</span>
                <span>{{item.groupName}}</span>
                <uu-icon type="relieve" class="fr" @click.native="unBindCommunity(item)"></uu-icon>
              </p>
              <p><span>绑定时间：</span><span>{{item.bindingTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>
              <p><span>应用场景：</span>{{item.deviceScene}}</p>
            </template>
          </ob-list-item>
          <ob-list-item @refresh="getMineEquipment" width="20%" :data="item" type="handle" :showDelete="true">
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
  import {parseTime} from '@/utils'

  export default {
    name: "index",
    data() {
      const validateName = (rule, value, callback) => {
        value = value.trim();
        if (!value) {
          callback(new Error('设备别名不能为空'))
        } else {
          if (value.length >= 2 && value.length <= 18) {
            this.$http("/merchant/device/alias/exist", {deviceName: value},false).then(res => {
              callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            });
          } else {
            callback(new Error("别名长度为2-18个字符"))
          }
        }
      };
      return {
        dialogOptions: {
          type: 'device',
          title: '添加设备'
        },
        equipmentEmpty: false,
        dialogForm:{
          deviceKey:'',
          deviceName:'',
          type:''
        },
        btnOption: {
          text: '创建'
        },
        menu: [
          {title: '设备列表'}
        ],
        menu2: [
          {title: '自有设备', index: '/equipment/mine'},
          {title: '子社群设备', index: '/equipment/children'}
        ],
        groupList: [],
        equipmentList: [
          {deviceKey:'K_EP_OSFN234ISl'}
        ],
        pagination: {},
        equipmentForm: {
          deviceName: '',
          deviceKey: ''
        },
        rules: [
          {required: true, validator: validateName, trigger: "blur"}
        ],
        dialogFormVisible: false,
        isSearch: false
      }
    },
    methods: {
      search(val) {
        this.$router.push(`/equipment/search/mine/${val}`);
      },
      submitForm(data) {
        if (this.dialogOptions.type === 'device') {
          // 添加商户设备
          this.$http("/merchant/device/create", data).then(res => {
            this.dialogFormVisible = false;
            this.$tip("创建成功");
            this.getMineEquipment()
          }).catch(err => {
            this.dialogFormVisible = false;
          });
        } else {
          // 绑定社群
          data.groupNickName = this.groupList[data.groupGuid].groupNickName;
          data.groupGuid = this.groupList[data.groupGuid].groupGuid;
          this.bindCommunity(data)
        }
      },
      getGroupList(){
        this.$http("/group/list").then(res => {
          this.groupList = res.data;
        })
      },
      showDialog(type,data) {
        this.dialogFormVisible = false;
        this.dialogOptions.type = type || 'device';
        this.dialogOptions.title = type === 'device' ? '添加设备' : '绑定社群';
        if(this.dialogOptions.type==='device'){
          this.dialogForm = {
            deviceKey:'',
            deviceName:'',
            type:''
          }
        }else {
          this.dialogForm = {
            deviceKey:data.deviceKey,
            deviceName:data.deviceName,
            groupGuid:'',
            deviceScene:''
          }
        }
        if (type === 'community' && !this.groupList.length) {
          this.$affirm({
            text: '没有可绑定的社群，前往<a href="#/community/create">创建社群</a>。'
          }, (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done()
            }
          }, 'create')
        } else {
          this.dialogFormVisible = true
        }
      },
      // 获取自有设备
      getMineEquipment(page) {
        page = page || this.pagination.index || 1;
        this.$http('/device/list', {index: page, searchText: this.$route.params.key || ''}).then(res => {
          this.equipmentList = res.data.content;
          this.pagination = res.data.pagination;
          if(!this.groupList.length){
            this.getGroupList()
          }
        })
      },
      deleteEquipment(item) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【' + item.deviceName + '】删除？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done();
          } else {
            done()
          }
        }, 'waiting')
      },
      //解 绑社群
      unBindCommunity(value) {
        this.$affirm({
          confirm: '确定',
          cancel: '返回',
          text: '将设备从社群解绑，您将无法查看该设备数据/无法操作设备。确定要将【' + value.deviceName + '】设备从【' + value.groupName + '】社群解绑？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done();
            this.$http("/device/unbinding", {
              deviceKey: value.deviceKey,
              groupGuid: value.groupGuid
            }).then(res => {
              this.$tip("解绑成功");
              this.$set(value,'groupGuid',null)
            });
          } else {
            done()
          }
        })
      },
      // 绑定社群
      bindCommunity(value) {
        this.dialogFormVisible = false;
        this.$load("设备绑定中...");
        this.$http('/device/binding', {deviceKey: value.deviceKey,groupGuid:value.groupGuid}).then(res => {
          this.$load().close();
          this.$tip("绑定成功");
          this.getMineEquipment(this.pagination.index);

        }).catch(()=>{
          this.$load().close()
        });
      }
    },
    created() {
      this.isSearch = this.$route.name === 'searchMine';
      this.getMineEquipment()
    },
    filters: {
      type: function (val) {
        switch (val) {
          case 1:
            return '分析终端';
          case 2:
            return '客行分析一体机';
          default:
            return '身份识别一体机'
        }
      }
    },
    computed: {
      // isSearch: function () {
      //   return this.$route.name === 'equipment'
      // }
    },
    watch: {
      $route: function (val) {
        this.isSearch = (val.name === 'searchMine');
        this.equipmentList = [];
        this.getMineEquipment()
      }
    }
  }
</script>

<style scoped>
  .data-list-wrap {
    margin-top: 24px;
    height: calc(100% - 134px);
    box-sizing: border-box;
  }
  .data-list-wrap  >.el-scrollbar{
    height: 100%;
  }
</style>
