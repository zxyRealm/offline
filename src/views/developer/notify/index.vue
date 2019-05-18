<template>
  <div class="notify-wrap">
    <header-bar :menu-array="menu" active-name="notify" >
      <el-button slot="buttons" size="small" type="primary" @click="addCallbackInfo" v-show="!loading">创建</el-button>
    </header-bar>
    <div v-if="notifyList && notifyList.length">
      <el-scrollbar class="scrollbar-wrap hidden-x">
        <ul class="list-wrap">
          <li
            v-for="(item, $index) in notifyList"
            :key="$index"
            class="list-item m__item--active">
            <div class="item__title">
              <span class="fl title__text" v-text="item.dataNoticeType === 1 ? '到店通知' :  '人脸通知'"></span>
              <span class="fr title__buttons">
                <i class="iconfont icon-bianji f-blue f-link" @click="$router.push(`/developer/notify/add-info?page=${pagination.index}&id=${item.dataNoticeGuid}`)"></i>
                <i class="iconfont icon-shanchu f-gray f-margin-left10 f-link" @click="handleNotifyDelete(item)"></i>
              </span>
            </div>
            <div class="item__p text__overflow" v-for="(p, p_index) in notifyInfoConfig" :key="p_index">
              <span class="p__title" v-text="`${p.title}：`"></span>
              <span class="p__text" v-text="item[p.field]"></span>
            </div>
            <span class="f-link f-blue f-margin-top5 box__block">参数介绍</span>
          </li>
        </ul>
        <div class="page__pagination">
          <custom-pagination
            class="not-mt"
            :total="pagination.total"
          ></custom-pagination>
        </div>
      </el-scrollbar>
    </div>
    <no-callback-info v-if="!notifyList.length && !loading"></no-callback-info>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CustomPagination from '@/components/Pagination'
import { deleteNotice, getNoticeList, judgeHaveDevice } from '../../../api/developer'
import HeaderBar from '../components/HeaderBar.vue'

export default {
  name: 'notify',
  components: {
    'no-callback-info': () => import('./default.vue'),
    HeaderBar,
    CustomPagination
  },
  data () {
    return {
      paste: '',
      update: '升级',
      equipmentEmpty: false,
      btnOption: [{
        text: '创建'
      }],
      menu: [
        { title: '消息通知', name: 'notify' },
        { title: '开放API', name: 'api' }
      ],
      notifyList: [],
      pagination: {
        index: 1,
        length: 15,
        total: 1
      },
      notifyInfoConfig: [
        { title: '通知描述', field: 'description' },
        { title: '回调地址', field: 'url' },
        { title: '创建时间', field: 'createTime' },
        { title: '上次编辑', field: 'lastEditTime' }
      ]
    }
  },
  methods: {
    handleNotifyDelete (item) {
      this.$confirm('确定删除该通知？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'delete__confirm',
        customClass: 'custom__message-box--delete'
      }).then(() => {
        deleteNotice({ dataNoticeGuid: item.dataNoticeGuid }).then(() => {
          this.$message.success('删除成功')
          this.getNotifyList()
        })
      }).catch(() => {})
    },
    getNotifyList () {
      console.log(this.userInfo)
      getNoticeList({ index: this.pagination.index, length: this.pagination.length, merchantGuid: this.userInfo.uuid }).then(res => {
        if (res.result) {
          this.notifyList = res.data.content || []
          this.pagination = res.data.pagination
          console.log(this.notifyList)
        }
      })
    },
    addCallbackInfo () {
      if (this.notifyList.length) {
        if (!this.equipmentEmpty) {
          this.$router.push(`/developer/notify/add-info?page=${this.pagination.index}`)
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
      } else {
        this.createCallback()
      }
    },
    // 当没有通知列表的时候
    // 根据商户设备存在状态显示提示信息或者直接跳转路由
    createCallback () {
      judgeHaveDevice({ merchantGuid: this.userInfo.uuid }).then(res => {
        if (res.data) {
          this.$router.push('/developer/notify/add-info')
        } else {
          this.$affirm({
            confirm: '前往【设备列表】',
            cancel: '返回',
            text: '您还没有绑定设备，无法创建消息通知。'
          }, (action, instance, done) => {
            if (action === 'confirm') {
              done()
              this.$router.push('/equipment/mine')
            } else {
              done()
            }
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getNotifyList()
  },
  computed: {
    ...mapState(['loading', 'aliveState', 'userInfo'])
  },
  filters: {
    type: function (value) {
      switch (value) {
        case 1:
          return '到店通知'
        case 2:
          return '人脸通知'
      }
    }
  },
  beforeDestroy () {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .scrollbar-wrap {
    height: calc(100vh - 201px);
    width: 100%;
    .list-wrap {
      padding: 15px 40px 0;
      overflow: hidden;
    }
    .list-item {
      position: relative;
      float: left;
      width: 302px;
      height: 200px;
      padding: 10px 20px;
      box-sizing: border-box;
      /*box-shadow: 0 0 6px 2px rgba(200, 205, 214, 0.30);*/
      background-repeat: no-repeat;
      background-position: center 42px;
      background-size: 96px;
      margin-bottom: 32px;
      @media screen and (max-width: 1290px) {
        + .list-item {
          margin-left: calc((100% - 3 * 302px) / 2);
        }
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1290px) {
        + .list-item {
          margin-left: calc((100% - 3 * 302px) / 2);
        }
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1560px) {
        + .list-item {
          margin-left: calc((100% - 4 * 302px) / 3);
        }
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
      }
      @media screen and (min-width: 1800px) {
        + .list-item {
          margin-left: calc((100% - 5 * 302px) / 4);
        }
        &:nth-child(5n + 1) {
          margin-left: 0;
        }
      }
      .item__title{
        font-size: 18px;
        overflow: hidden;
        margin-bottom: 15px;
      }
      .item__p{
        margin-bottom: 8px;
      }
      .handle__icon--wrap {
        .iconfont {
          display: inline-block;
          line-height: 22px;
          vertical-align: top;
          color: $theme-blue;
          cursor: pointer;
          margin-left: 4px;
        }
      }
      .el-icon-refresh {
        font-size: 16px;
        color: $theme-blue;
        cursor: pointer;
      }
      .more-info {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 22px;
        .gray {
          color: $gray-color;
        }
        .state {
          color: $global-success-color;
          &:before {
            content: '';
            display: inline-block;
            height: 10px;
            width: 10px;
            margin-right: 6px;
            border-radius: 10px;
            background-color: $global-success-color;
          }
          &.offline {
            color: $global-danger-color;
            &:before {
              background-color: $global-danger-color;
            }
          }
        }
      }
    }
    .page__pagination{
      margin: 0 30px 20px;
    }
  }
</style>
