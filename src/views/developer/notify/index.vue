<template>
  <div class="notify-wrap">
    <uu-sub-tab :menu-array="menu" :show-button="!equipmentEmpty" :sub-btn="btnOption" @handle-btn="addCallbackInfo"></uu-sub-tab>
    <no-callback-info v-if="equipmentEmpty"></no-callback-info>
    <div class="data-list-wrap" v-else>
      <template v-if="notifyList && notifyList.length">
        <ob-list v-for="(item,$index) in notifyList" :key="$index">
          <ob-list-item type="type" :data="item" prop="type" label="通知类型"></ob-list-item>
          <ob-list-item :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item type="time" :data="item" prop="createTime,lastEditTime" label="创建时间,上次编辑">
          </ob-list-item>
          <ob-list-item>
            <router-link to="/developer/param/explain">
              参数介绍
            </router-link>
            <router-link style="margin: 0 36px" :to="'/developer/notify/'+item.noticeGuid">详情</router-link>
            <el-button icon="el-icon-delete"  @click="delNotifyInfo(item.noticeGuid)" circle></el-button>
          </ob-list-item>
        </ob-list>
      </template>
      <ob-list-empty v-else text="暂无通知信息。" ></ob-list-empty>

    </div>
  </div>

</template>
<script>
  export default {
    name: "notify",
    components: {
      'no-callback-info': () => import('./default.vue')
    },
    data() {
      return {
        paste:'',
        update:'升级',
        equipmentEmpty: false,
        btnOption: {
          text: '创建'
        },
        menu: [
          {title: '消息通知', index: '/developer/notify'},
          {title: '开放API', index: '/developer/api'}
        ],
        notifyList: [],
        pagination: {}
      }
    },
    methods: {
      equipmentExit(){
        this.$http("/device/merchant/exist",false).then(res=>{
          this.equipmentEmpty = !res.data;
          if(res.data){
            this.getNotifyList()
          }
        }).catch(error=>{
          this.equipmentEmpty = true
        })
      },
      delNotifyInfo(id) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确认删除本条通知？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http("/dataNotice/discard", {noticeGuid: id}).then(res => {
              if (res.result) {
                this.$tip("删除成功");
                this.getNotifyList(this.pagination.index)
              }
            });
            done();
          } else {
            done()
          }
        })

      },
      getNotifyList(page) {
        page = page || 1;
        this.$http("/dataNotice/page/list", {index: page, length: 10}).then(res => {
          if (res.result) {
            this.notifyList = res.data.content || [];
            this.pagination = res.data.pagination;
          }
        })
      },
      addCallbackInfo(){
        if(!this.equipmentEmpty){
          this.$router.push('/developer/notify/add-info')
        }else {
          this.$affirm({
            confirm:'前往【添加设备】',
            cancel:'返回',
            text:'您还没有设备，无法创建数据回调。'
          },(action,instance,done)=>{
            if(action==='confirm'){
              done();
              this.$router.push("/equipment/mine");
            }else {
              done()
            }
          })
        }

      }
    },
    created() {
      this.equipmentExit();
    },
    filters: {
      type: function (value) {
        switch (value) {
          case '1':
            return '到店通知'
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-wrap {
    margin: 20px;
  }

  .notify-list-items {
    margin: 20px;
    height: 120px;
    padding: 30px 0;
    background: rgba(1, 8, 20, 0.10);
    border: 1px dashed rgba(151, 151, 151, 0.10);
    box-sizing: border-box;
    > div {
      position: relative;
      float: left;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      font-size: 12px;
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 9px;
        height: calc(100% - 18px);
        width: 1px;
        background: #E7E7E7;
        opacity: 0.25;
      }
    }

    > div:last-child {
      border: none;
      &:before {
        display: none;
      }
    }
    .item-type {
      width: 24%;
      line-height: 58px;
      .ellipsis {
        /*width: 100px;*/
      }
    }
    .item-time span {
      display: inline-block;
      min-width: 112px;
    }
    .item-detail, .item-time {
      width: 24%;
      line-height: 28px;
      .ellipsis {
        float: left;
        padding: 0 20px;
        text-align: left;
      }
    }

    .item-handel {
      width: 28%;
      .edit-link {
        margin: 0 58px 0 36px;
      }
      .delete {
        margin-top: 2px;
      }
    }
  }
</style>
