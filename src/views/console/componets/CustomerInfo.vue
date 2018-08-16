<template>
  <div class="customer-info-wrap vam" :class="detailInfo.status==0?'customer-info-wrap-in':'customer-info-wrap-out'"
       @click="handleDetail">
    <span class="order" :class="detailInfo.status==0?'':'order-in'">{{`第${detailInfo.order}位`}}</span>
    <div class="customer-img" ref="imgFather">
      <img :src="detailInfo.img | imgBase" ref="img" :style="styleObj">
    </div>
    <div class="customer-detail" :class="detailInfo.status==0?'customer-detail-in':''">
      <span v-if="detailInfo.status==0">{{detailInfo.gender==0?'女':(detailInfo.gender==1?'男':'')}}</span>
      <span v-if="detailInfo.status==0">{{detailInfo.age ==-1?'':detailInfo.age}}</span>
      <span>{{this.daytime(detailInfo.time)}}</span>
      <span>{{this.time(detailInfo.time)}}</span>
    </div>
    <ob-dialog-info :visible.sync="showDialog" :data="detailInfo"></ob-dialog-info>
  </div>
</template>
<script>
import ObDialogInfo from './ObDialogInfo'
import {parseTime} from '@/utils/index'

export default {
  components: {
    ObDialogInfo
  },
  props: ['index', 'detailInfo'],
  data () {
    return {
      styleObj: {
        width: '100%',
        height: 'auto'
      },
      showDialog: false,
      data: [] // 数据
    }
  },
  filters: {
    // 日
    daytime (date) {
      date = new Date(date)
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return m + '/' + d
    },
    // 时分
    time (date) {
      date = new Date(date)
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return h + ':' + minute
    },
    imgBase (data) {
      return `data:image/jpg;base64,${data}`
    }
  },
  methods: {
    // 月日
    daytime (date) {
      date = new Date(date)
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return m + '/' + d
    },
    // 时分
    time (date) {
      date = new Date(date)
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return h + ':' + minute
    },
    // 显示详情
    handleDetail () {
      this.showDialog = true
    },
    // base64处理图片
    imgBase (data) {
      return `data:image/jpg;base64,${data}`
    },
    // 图片宽高自适应
    AutoSize (Img, maxWidth, maxHeight) {
      // 当图片比图片框小时不做任何改变
      // console.info(Img.offsetWidth,Img.offsetHeight);
      if (Img.width < maxWidth && Img.height < maxHeight) {
        Img.width / Img.height >= 1 ? (this.$set(this.styleObj, 'height', '100%') && this.$set(this.styleObj, 'width', 'auto')) : (this.$set(this.styleObj, 'width', '100%') && this.$set(this.styleObj, 'height', 'auto'))
      } else { // 原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
        if (maxWidth / maxHeight <= Img.width / Img.height) { // 原图片宽高比例 大于 图片框宽高比例
          ((Img.width < maxWidth) || (Img.width / Img.height < 0.99)) ? (this.$set(this.styleObj, 'width', '100%') && this.$set(this.styleObj, 'height', 'auto')) : (this.$set(this.styleObj, 'height', '100%') && this.$set(this.styleObj, 'width', 'auto'))
        } else { // 原图片宽高比例 小于 图片框宽高比例
          ((Img.height < maxHeight) || (Img.width / Img.height >= 0.99)) ? (this.$set(this.styleObj, 'height', '100%') && this.$set(this.styleObj, 'width', 'auto')) : (this.$set(this.styleObj, 'width', '100%') && this.$set(this.styleObj, 'height', 'auto'))
        }
      }
    },
    // 设置图片自适应容器
    getAutoSize () {
      let img = new Image()
      img.src = this.imgBase(this.detailInfo.img)
      if (img.width && this.$refs.imgFather) {
        this.AutoSize(img, this.$refs.imgFather.offsetWidth, this.$refs.imgFather.offsetHeight)
      }
    }
  },
  mounted () {
    // 图片宽高自适应
    this.getAutoSize()
    window.addEventListener('resize', this.getAutoSize)
  },
  watch: {},
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('resize', this.getAutoSize)
    next()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  /* 遮罩层div */
  #lwh-shadow-detail.shadow-detail-div {
    min-width: 1280px;
    min-height: 720px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    .shadow-detail-content {
      .detail-img-div {
        position: relative;
        background: rgba(16, 156, 231, 0.2);
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: left top, right top, right bottom, left bottom;
        background-image: url(/static/img/console-detail-border-icon-top.png), url(/static/img/console-detail-border-icon-right.png), url(/static/img/console-detail-border-icon-bottom.png), url(/static/img/console-detail-border-icon-left.png);
        background-size: 52px auto;
        padding: 40px;
        .detail-content-img {
          height: 420px;
          border: 2px solid #109CE7;
        }
        .detail-content-img-in {
          height: 420px;
          border: 2px solid #6D2EBB;
        }
        .detail-content-div {
          padding-left: 30px;
          text-align: center;
          span {
            color: #ffffff;
            border-bottom: 1px dashed #ffffff;
            padding: 12px 12px;
            display: block;
            box-sizing: border-box;
          }
        }
      }
      .detail-cancle-div {
        display: flex;
        justify-content: center;
        align-items: center;
        .detail-content-cancel {
          width: 32px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .customer-info-wrap-in {
    background: url(/static/img/background-img-in.png) no-repeat center;
    background-size: 100% 100%;
  }

  .customer-info-wrap-out {
    background: url(/static/img/background-image.png) no-repeat center;
    background-size: 100% 100%;
  }

  .customer-info-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    .customer-img {
      width: calc(100% - 24px);
      height: calc(100% - 40px);
      /*padding: 20px 12px;*/
      margin: auto;
      margin-left: 5px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }
    img {
      //display: block;
      //width: 100%;
      //height: 100%;
      //margin-bottom: 20px;
      // box-sizing: border-box;
      //padding: 20px 12px;
      //margin: auto;
    }
    span.order {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -6px;
      width: calc(58%);
      display: inline-block;
      background: rgba(109, 46, 187, 0.3);
      padding: 0 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
    span.order-in {
      background: rgba(16, 156, 231, 0.3);
    }
    .customer-detail {
      position: absolute;
      bottom: 20px;
      right: 12px;
      font-size: 12px;
      span {
        text-align: center;
        line-height: 16px;
        display: block;
        width: 46px;
        height: 16px;
        margin-bottom: 4px;
        opacity: 0.4;
        background: #000000;
      }
    }
    .customer-detail-in {
      right: 12px;
    }
  }

</style>
