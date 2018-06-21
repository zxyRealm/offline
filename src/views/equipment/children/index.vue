<template>
  <div class="equipment-children-wrap">
    <uu-sub-tab
      :back="!isSearch"
      :search="isSearch"
      @remote-search="search"
      :menu-array="[{title:$route.params.key? $route.params.key:'设备列表'}]">
    </uu-sub-tab>
    <uu-sub-tab
      v-if="isSearch"
      size="medium"
      :menu-array="menu2"></uu-sub-tab>
    <div class="equipment-children-container" :style="{top:isSearch?'92px':'64px'}">
      <div class="ec-side-nav dashed-border" v-if="isSearch">
        <h2>选择子社群</h2>
        <ob-group-nav @current-change="currentChange"></ob-group-nav>
      </div>
      <div class="ec-container" :class="{'dashed-border':isSearch}">
        <el-scrollbar class="ob-scrollbar">
          <div v-if="!initState||!equipmentList.length" class="no-data-children">
            {{tipMsg}}
          </div>
          <template v-for="(item,$index) in equipmentList" v-else>
            <ob-list>
              <ob-list-item>
                <p>
                  <span>设备别名：</span>
                  {{item.deviceName}}
                </p>
                <p>
                  <span>运行状态：</span>
                  <span class="error-color">{{item.deviceState | deviceState}}</span>
                  <a href="javascript:void (0)" @click="getEquipmentState(item)">
                    <i v-if="item.deviceState" class="el-icon-refresh success-color"></i>
                    <template v-else>获取</template>
                  </a>
                </p>
              </ob-list-item>
              <ob-list-item>
                <p><span>序列号：</span><span>{{item.deviceKey}}</span></p>
                <p><span>设备类型：</span>{{item.deviceType|deviceType}}</p>
                <p><span>添加时间：</span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
              </ob-list-item>
              <ob-list-item>
                <p><span>用途：</span><br>
                  <router-link v-if="item.deviceType!==1" :to="'/equipment/more/'+item.deviceKey">详情</router-link>
                  <template v-else>
                    {{item.deviceType | deviceType}}
                  </template>
                </p>
              </ob-list-item>
              <ob-list-item>
                <p>
                  <span>绑定社群：</span>
                  <span>{{item.groupName}}</span>
                </p>
                <p><span>绑定时间：</span><span>{{item.bindingTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>
                <p><span>应用场景：</span>{{item.deviceScene}}</p>
              </ob-list-item>
              <ob-list-item>
                <div class="handle btn-item">
                  操作：<br>
                  <el-popover
                    placement="top"
                    trigger="hover">
                    <div>
                      <p>1.获取设备状态后，可进行操作。</p>
                      <p>2.已绑定至社群，无法删除该设备。</p>
                    </div>
                    <i slot="reference" style="margin-top: 10px" class="el-icon-question"></i>
                  </el-popover>
                </div>
                <div class="btn-wrap btn-item">
                  <el-button
                    :disabled="btnState(item.deviceState,'close')"
                    @click="handleBtn(item,'close')"
                    class="medium close">{{item.deviceState===1?'关机':'开机'}}
                  </el-button>
                  <el-button
                    :disabled="btnState(item.deviceState,'reboot')"
                    @click="handleBtn(item,'reboot')"
                    class="medium reboot">重启
                  </el-button>
                  <el-button
                    :disabled="btnState(item.deviceState,'upgrade')"
                    @click="handleBtn(item,'upgrade')"
                    class="medium upgrade">升级
                  </el-button>
                  <el-button
                    :disabled="btnState(item.deviceState,'reset')"
                    @click="handleBtn(item,'reset')"
                    class="medium reset">重置
                  </el-button>
                </div>
              </ob-list-item>
            </ob-list>
          </template>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        menu2: [
          {title: '自有设备', index: '/equipment/mine'},
          {title: '子社群设备', index: '/equipment/children'}
        ],
        currentGroup: '',
        equipmentList: [],
        pagination: {},
        initState: false
      }
    },
    methods: {
      getEquipmentList(page) {
        page = page || 1;
        !this.initState ? this.initState = true : '';
        if(this.isSearch){
          this.$http("/device/guid/list", {guid: this.currentGroup, index: page}).then(res => {
            this.equipmentList = res.data.content;
            this.pagination = res.data.pagination;
          })
        }else {
          this.$http("/device/search", {searchText:this.$route.params.key, index: page}).then(res => {
            this.equipmentList = res.data.content;
            this.pagination = res.data.pagination;
          })
        }
      },
      btnState(state, type) {
        //1开机 -1 关机 2升级 3重启 4重置
        switch (state) {
          case 1:
            return false;
          case -1:
            if (type === 'upgrade') {
              return true;
            } else {
              return false;
            }
          case 2:
            if (type === 'upgrade') {
              return false
            } else {
              return true;
            }
          case 3:
            return true;
          case 4:
            return true;
          default:
            return true;
        }
      },
      handleBtn(value, type) {
        let des = '';
        switch (type) {
          case 'upgrade':
            des = '升级';
            break;
          case 'reboot':
            des = '重启';
            break;
          case 'reset':
            des = '重置';
            break;
          case 'close':
            if (value.deviceState !== -1) {
              des = '开启';
            } else {
              des = '关闭'
            }
            break;
          default:
            des = '开启'
        }
        this.$affirm({text: '确定' + des + '设备【' + value.deviceName + '】?'}, (action, instance, done) => {
          if (action === 'confirm') {
            switch (type) {
              case 'reboot':
                this.$tip("重启成功");
                break;
              case 'upgrade':
                this.$tip("正在升级中...");
                break;
              case 'reset':
                this.$tip("重置成功");
                break;
              case 'close':
                if (value.deviceState === -1) {
                  this.$tip("设备开启中...")
                } else {
                  this.$tip('设备关闭中...')
                }
                break;
              default:
            }
            done()
          } else {
            done()
          }
        })
      },
      // 获取设备状态
      getEquipmentState(value) {
        this.$set(value, 'deviceState', 1);
        // this.$http('');
        console.log("equipment state")
      },
      search(value) {
        this.$router.push(`/equipment/search/children/${value}`);
      },
      currentChange(val) {
        this.currentGroup = val.groupGuid;
      }
    },
    created() {
      if(this.$route.name==='searchChildren'){
        this.getEquipmentList()
      }
    },
    computed: {
      isSearch: function (val) {
        return this.$route.name === 'equipmentChildren'
      },
      tipMsg:function () {
        return !this.isSearch?'查询不到该设备。':!this.initState?'请先在左侧选择自有社群，以查看其下的子社群设备。':(!this.equipmentList.length?"该社群尚未绑定设备。":'')
      }
    },
    watch: {
      currentGroup:function () {
        this.getEquipmentList()
      },
      $route: function (val) {
        this.equipmentList = [];
        this.getEquipmentList()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .equipment-children-wrap {
    position: relative;
    .equipment-children-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
      .ec-side-nav {
        float: left;
        width: 140px;
        height: 100%;
        .ob-group-nav {
          margin: 0 8px;
        }
        > h2 {
          padding: 20px 20px 10px;
          font-size: 14px;
        }
        > .el-select {
          margin: 0 8px;
        }
      }
      .ec-container {
        height: 100%;
        &.dashed-border{
          margin-left: 160px;
        }
      }
    }
  }

</style>
