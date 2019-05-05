<template>
  <div class="home-notify-wrapper">
    <div class="title">系统消息</div>
    <ob-list-empty text="暂无消息通知" v-if="state"></ob-list-empty>

    <div class="content" v-if="!state">
      <ul>
        <el-scrollbar style="height:100%;">
          <li
            v-for="(val,index) in notifyData"
            :key="index" class="clearfix"
            :class="val.readState ? '' : 'readed'">
            <span :class="val.readState ? 'active' : ''">
              {{index+1}}.&nbsp;&nbsp;{{val.content}}
              <a
                v-if="val.otherInfo"
                :href="val.otherInfo"
                download class="ml5">点此查看</a>
            </span>
            <span>{{val.createTime}}</span>
          </li>
        </el-scrollbar>
      </ul>
    </div>
  </div>
</template>
<script>
import { SiteNoticeList } from '@/api/developer'

export default {
  data () {
    return {
      state: false,
      notifyData: []
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
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .content .el-scrollbar .el-scrollbar__wrap {
    margin-right: -18px !important;
    margin-bottom: -200px !important;
    overflow: auto;
  }

  /* 滚动条粗细 */
  .content .el-scrollbar__bar.is-vertical {
    // width: 8px;
  }

  /* 滚动条高度 */
  .content .el-scrollbar__thumb {
    //hieght: 30%!important;
  }

  .main-container {
    overflow: hidden;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .home-notify-wrapper {
    height: 100px;
    min-width: 1020px;
    /*background-color: rgba(0, 0, 0, 0.3);*/
    background-color: rgba(64, 58, 73, 0.001);
    .title {
      font-size: 16px;
      padding: 20px 0 0 20px;
      box-sizing: border-box;
    }
    .content {
      height: calc(100% - 42px);
      padding-top: 6%;
      box-sizing: border-box;
      ul {
        cursor: pointer;
        margin: 0 auto;
        width: 72%;
        height: 61%;
        padding: 16px 0;
        overflow-y: auto;
        /*border: 2px dashed hsla(0, 0%, 62%, 0.03);*/
        /*background: rgba(15, 158, 233, 0.003);*/
        /*border-image: linear-gradient(to right,#1896E6,#813FC5) 20 20;*/
        background-image: url(../../../assets/public/notify_background.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        .readed {
          opacity: 0.5;
        }
        li {
          font-size: 14px;
          margin-bottom: 16px;
          padding: 0 30px;
          padding-right: 50px;
          text-align: right;
          span {
            display: inline-block;
            vertical-align: middle;
            &:nth-child(1) {
              float: left;
              width: 60%;
              text-align: left;
              display: inline-block;
              position: relative;
            }
          }
          .active::before {
            content: '';
            border: 3px solid #0F9EE9;
            border-radius: 50%;
            position: absolute;
            top: 7px;
            left: -16px
          }
        }
      }
    }

  }

  .ob-list-empty-wrap {
    height: calc(100% - 42px) !important;
  }
</style>
