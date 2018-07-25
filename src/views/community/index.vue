<template>
  <div class="community-mine-wrap">
    <template v-if="!groupList.length && !loading">
      <uu-sub-tab
        show-button
        :sub-btn="{text:'创建'}"
        @handle-btn="$router.push('/community/create')"
      ></uu-sub-tab>
      <ob-list-empty text="您还没有创建社群"></ob-list-empty>
    </template>
    <template v-if="groupList.length">
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
            :menu-array="[{title:'我的社群',index:'/community/mine'},{title:'自定义分组',index:'/community/custom'}]"></uu-sub-tab>
          <ob-group-nav
            ref="groupNav"
            only-checked
            :expanded-keys="expandedKeys"
            v-model="groupList"
            type="community"
            @refresh="getGroupList"
            :current-key="currentKey"
            @current-change="currentChange"></ob-group-nav>
        </div>
        <div class="community--main">
          <!--<el-scrollbar>-->
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
            <ob-list-empty top="32px" text="请选取社群" size="small" v-if="!communityInfo.guid"></ob-list-empty>
          </div>
          <div class="cmm-table dashed-border">
            <h2 class="cmm-sub-title">设备列表</h2>
            <ob-list-empty top="32px" v-if="!deviceList.length" size="small" text="没有可以查看的设备">
            </ob-list-empty>
            <el-table
              height="250px"
              border
              :data="deviceList"
              style="width:100%"
              v-else
            >
              <el-table-column
                prop="deviceName"
                label="设备别名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="deviceKey"
                label="序列号"
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
          </div>
          <!--</el-scrollbar>-->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "index",
    data() {
      const validateName = (rule, value, callback) => {
        value = value.trim();
        if (!value) {
          callback(new Error('请填写子社群昵称'))
        } else {
          if (value.length >= 2 && value.length <= 18) {
            if (this.originName === value) {
              callback(new Error("子社群昵称已存在"))
            } else {
              this.$http("/group/nickNameExist", {groupNickName: value},
                false).then(res => {
                !res.data ? callback() : callback("子社群昵称已存在")
              }).catch(err => {
                callback(err.msg || '验证失败')
              })
            }
          } else {
            callback(new Error("长度为2-18个字符"))
          }
        }
      };
      return {
        originName: '',
        groupList: [], //社群列表
        tableData: [],
        deviceList: [], //社群设备列表
        communityInfo: {}, //社群信息
        currentKey: '',  //当前选中社群id
        currentCommunity: {}, //当前社群信息
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
        expandedKeys: []
      }
    },
    methods: {
      // 获取社群列表
      getGroupList(keywords, key) {
        keywords = (keywords || '').trim();
        this.$http("/group/list").then(res => {
          this.groupList = res.data;
          if (!key && !res.data[0]) {
            return
          }
          this.$nextTick(() => {
            this.$refs.groupNav.setCurrentKey((key || res.data[0]).groupGuid);
          });
          this.getCommunityInfo(key || res.data[0]);
          this.getDeviceList(key || res.data[0]);
        })
      },
      // 获取设备列表
      getDeviceList(val) {
        let url = !val.groupPid ? '/group/device ' : '/device/guid/list';
        this.$http(url, {guid: val.groupGuid}).then(res => {
          this.deviceList = res.data.content || res.data || [];
          this.$store.state.loading = false;
        })
      },
      // 搜索社群
      remoteSearch(val) {
        if (val) {
          this.$http("/group/list/search", {searchText: val}).then(res => {
            if (res.data[0]) {
              let getCurrent = () => {
                let restoreArray = this.$restoreArray(this.groupList, 'childGroupList');
                // 多层for循环嵌套只能用return跳出整个循环，break 只能跳出当前循环
                for (let i = 0, len = restoreArray.length; i < len; i++) {
                  for (let k = 0, len2 = res.data.length; k < len2; k++) {
                    if (res.data[k] === restoreArray[i].groupGuid) {
                      return restoreArray[i];
                    }
                  }
                }
              };
              let current = getCurrent();
              this.expandedKeys = res.data;
              this.$refs.groupNav.setCheckedKeys(res.data);
              this.$nextTick(() => {
                this.$refs.groupNav.setCurrentKey(current.groupGuid);
              });
              this.getCommunityInfo(current);
              this.getDeviceList(current);
            } else {
              this.setDefaultData()
            }
          })
        } else {
          this.setDefaultData()
        }
      },

      // 设置默认选中值
      setDefaultData() {
        let current = this.groupList[0];
        this.expandedKeys = [];
        this.$nextTick(() => {
          this.$refs.groupNav.setCurrentKey(current.guid || current.groupGuid);
        });
        // this.$refs.groupNav.setCheckedKeys([]);
        this.getCommunityInfo(current);
        this.getDeviceList(current);
      },
      // 当前社群发生改变
      currentChange(val) {
        this.currentKey = val.guid || val.groupGuid;
        this.currentCommunity = val;
        this.insetForm();
        this.getCommunityInfo(val);
        this.getDeviceList(val)
      },
      // 获取社群详细信息
      getCommunityInfo(val) {
        this.$http("/group/getInfo", {guid: val.groupGuid}).then(res => {
          res.data ? res.data.groupPid = val.groupPid : '';
          res.data.groupNickName = val.groupNickName || this.currentCommunity.groupNickName;
          res.data.groupPid ? this.originName = JSON.parse(JSON.stringify(res.data.groupNickName)) : '';
          this.communityInfo = res.data || {};
          if (res.data) {
            this.$createQRCode(res.data.code, 'qr-code')
          }
        })
      },
      // 解散社群
      disbandGroup() {
        this.$affirm({text: `确认解散【${this.communityInfo.name}】社群？`}, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/group/disbandGroup", {guid: this.communityInfo.guid}).then(res => {
              this.$tip("解散成功");
              this.getGroupList()
            });
            done()
          } else {
            done()
          }
        });

      },
      // 修改社群昵称
      changeCommunityName(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let subData = JSON.parse(JSON.stringify(this.communityForm));
            subData.groupGuid = this.communityInfo.guid;
            subData.groupPid = this.communityInfo.groupPid;
            this.$http('/group/nickName/update', subData).then(res => {
              this.$tip("昵称修改成功");
              this.currentCommunity.groupNickName = subData.groupNickName;
              this.insetForm();
              this.getGroupList('', {groupGuid: this.communityInfo.guid, groupPid: this.communityInfo.groupPid})
            })
          } else {
            console.log('error submit')
          }
        })
      },
      insetForm() {
        this.nickNamePopover = false;
        if (this.$refs.nickNameForm) {
          this.$nextTick(() => {
            this.$refs.nickNameForm.resetFields()
          })
        }
      }
    },
    created() {
      this.getGroupList()
    },
    computed: {
      isSon: function () {
        return Boolean(this.communityInfo.groupPid)
      },
      ...mapState(['loading'])
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/community.scss";
</style>
