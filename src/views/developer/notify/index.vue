<template>
  <div class="notify-wrap">
    <uu-sub-tab
      :menu-array="menu"
      :show-button="!!notifyList.length && !loading"
      :sub-btn="btnOption"
      @handle-btn="addCallbackInfo"></uu-sub-tab>
    <div class="data-list-wrap" v-if="notifyList && notifyList.length">
      <el-scrollbar>
        <ob-list v-for="(item,$index) in notifyList" :key="$index">
          <ob-list-item type="type" :data="item" prop="type" label="通知类型"></ob-list-item>
          <ob-list-item tooltip :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item type="time" :data="item" prop="createTime,lastEditTime" label="创建时间,上次编辑">
          </ob-list-item>
          <ob-list-item>
            <router-link to="/developer/param/explain">
              参数介绍
            </router-link>
            <router-link style="margin: 0px 36px" :to="'/developer/notify/'+item.noticeGuid">编辑</router-link>
            <el-button icon="el-icon-delete" @click="delNotifyInfo(item.noticeGuid)" circle></el-button>
          </ob-list-item>
        </ob-list>
        <el-pagination
          v-if="pagination.total && pagination.total>pagination.length"
          @current-change="getNotifyList"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total,prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    </div>
    <no-callback-info v-if="!notifyList.length && !loading"></no-callback-info>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'notify',
  components: {
    'no-callback-info': () => import('./default.vue')
  },
  data () {
    return {
      paste: '',
      update: '升级',
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
    delNotifyInfo (id) {
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '确定废弃该通知？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http('/dataNotice/discard', {noticeGuid: id}).then(res => {
            if (res.result) {
              this.$tip('操作成功')
              this.getNotifyList(this.notifyList.length === 1 ? this.pagination.index - 1 : this.pagination.index)
            }
          })
          done()
        } else {
          done()
        }
      })
    },
    getNotifyList (page) {
      page = (this.$route.meta.keepAlive && this.aliveState.pagination ? this.aliveState.pagination.index : false) || page || 1
      this.$http('/dataNotice/page/list', {index: page, length: 8}).then(res => {
        if (res.result) {
          this.notifyList = res.data.content || []
          this.pagination = res.data.pagination
        }
        this.$route.meta.keepAlive = false
      })
    },
    addCallbackInfo () {
      if (!this.equipmentEmpty) {
        this.$router.push('/developer/notify/add-info')
      } else {
        this.$affirm({
          confirm: '前往【添加设备】',
          cancel: '返回',
          text: '您还没有设备，无法创建消息通知。'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done()
            this.$router.push('/equipment/mine')
          } else {
            done()
          }
        })
      }
    }
  },
  created () {
    this.getNotifyList()
  },
  computed: {
    ...mapState(['loading', 'aliveState'])
  },
  filters: {
    type: function (value) {
      switch (value) {
        case '1':
          return '到店通知'
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_ALIVE_STATE', {pagination: this.pagination})
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
