<template>
  <div class="home-notify-wrapper">
    <div class="g-module-title">
      <h1 class="normal title g-inline">系统消息</h1>
    </div>
    <ob-list-empty text="暂无消息通知" v-if="state"></ob-list-empty>

    <div class="content" v-if="!state">
      <ul class="notice--list">
        <li
          v-for="(item, $index) in noticeList"
          class="notice-item"
          :key="$index">
          <span class="index">{{calculateIndex($index)}}.</span>
          <span class="content ellipsis">{{item.content}}</span>
          <span>{{item.createTime || new Date().toLocaleString()}}</span>
          <i class="iconfont icon-guanbi g-fr" @click="del(item)"></i>
        </li>
      </ul>
      <custom-pagination
        :size="pagination.length"
        :total="pagination.total"></custom-pagination>
    </div>
  </div>
</template>
<script>
import { SiteNoticeList } from '@/api/developer'

export default {
  data () {
    return {
      state: false,
        noticeList: [
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法SHFA爱上了对方就撒浪费法律是放假啊律是放假啊SHFA爱上了对方就撒浪费法律是放假啊SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'},
            { content: 'SHFA爱上了对方就撒浪费法律是放假啊'}
        ],
        pagination: {
          index: 2,
           length:10,
          total: 24
        }
    }
  },
  methods: {
      getData () {
      SiteNoticeList().then(res => {
        if (res.data.length > 0) {
          this.notifyData = res.data
        } else {
          this.state = true
        }
      })
    },
    del (data) {

    },
    calculateIndex (index) {
        let page = this.pagination
        return page.total - page.length * (page.index - 1) - index
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.notice--list {
  margin: 24px 0;
}
  .notice-item {
    height: 62px;
    padding: 20px 40px;
    box-sizing: border-box;
    border-bottom: 1px solid $gray-border-color;
    text-align: left;
    line-height: 1.2;
    &:nth-child(2n + 1) {
      background: $background-color-gray-1;
    }
    > * {
      display: inline-block;
      vertical-align: middle;
    }
    &:before{
      content: '';
      display: inline-block;
      height: 10px;
      width: 10px;
      border-radius: 5px;
      margin-right: 12px;
      background: $theme-blue;
      vertical-align: middle;
    }
    .index{
      margin-right: 14px;
    }
    .content{
      width: auto;
      max-width: calc(100% - 280px);
      margin-right: 30px;
    }
  }

  .ob-list-empty-wrap {
    height: calc(100% - 42px) !important;
  }
</style>
