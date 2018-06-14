<template>
  <div class="notify-wrap">
    <uu-sub-tab :menu-array="menu" :sub-btn="!noNotifyUrl?btnOption:{}"></uu-sub-tab>
    <no-callback-info v-if="noNotifyUrl"></no-callback-info>
    <div class="list-wrap">
      <template v-for="(item,$index) in notifyList">
        <ob-list>
          <ob-list-item type="type" :data="item" prop="type" label="通知类型"></ob-list-item>
          <ob-list-item :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item router="/developer/notify" text="详情" label="用途：">
          </ob-list-item>
          <ob-list-item type="time" :data="item" prop="createTime,createTime" label="创建时间,上次编辑"></ob-list-item>
          <ob-list-item>
            <router-link to="/developer/param/explain">
              参数介绍
            </router-link>
            <router-link style="margin: 0 36px" :to="'/developer/notify/'+item.noticeGuid">详情</router-link>
            <!--<div class="handle">-->
              <!--操作：<br>-->
              <!--<el-popover-->
                <!--placement="top"-->
                <!--trigger="hover">-->
                <!--<div>-->
                  <!--<p>1.获取设备状态后，可进行操作。</p>-->
                  <!--<p>2.已绑定至社群，无法删除该设备。</p>-->
                <!--</div>-->
                <!--<i slot="reference" style="margin-top: 10px" class="el-icon-question"></i>-->
              <!--</el-popover>-->
              <!--&lt;!&ndash;<i class="el-icon-question"></i>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="btn-wrap">-->
              <!--<el-button class="medium close">关机</el-button>-->
              <!--<el-button class="medium reboot">重启</el-button>-->
              <!--<el-button class="medium upgrading" @click="update='升级中...'">{{update}}</el-button>-->
              <!--<el-button class="medium reset">重置</el-button>-->
            <!--</div>-->
            <el-button icon="el-icon-delete"  @click="delNotifyInfo(item.noticeGuid)" circle></el-button>
          </ob-list-item>
        </ob-list>
      </template>
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
        update:'升级',
        noNotifyUrl: false,
        btnOption: {
          text: '创建',
          index: '/developer/notify/add-info'
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
      }
    },
    created() {
      this.getNotifyList()
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
