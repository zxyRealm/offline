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
          <ob-list-empty v-if="!initState||!equipmentList.length" :text="tipMsg"></ob-list-empty>
          <template v-for="(item,$index) in equipmentList" v-else>
            <ob-list>
              <ob-list-item :data="item" type="state">
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
              <ob-list-item @refresh="getEquipmentList" :data="item" type="handle">
              </ob-list-item>

            </ob-list>
          </template>
          <el-pagination
            v-if="pagination.total && pagination.total>pagination.length"
            @current-change="getEquipmentList"
            :current-page="pagination.index"
            :page-size="pagination.length"
            layout="total,prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
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
        page = page || this.pagination.page || 1;
        !this.initState ? this.initState = true : '';
        if(this.isSearch){
          this.$http("/device/guid/list", {guid: this.currentGroup, index: page}).then(res => {
            this.equipmentList = res.data.content;
            this.pagination = res.data.pagination;
          })
        }else {
          this.$http("/device/search", {searchText:this.$route.params.key||'', index: page}).then(res => {
            this.equipmentList = res.data.content;
            this.pagination = res.data.pagination;
          })
        }
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
