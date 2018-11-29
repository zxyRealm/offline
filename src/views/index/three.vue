<template>
  <div class="three__floor--wrap">
    <!--楼宇3D/平面分布图展示 start-->
    <div class="floor__3d--wrap corner-bg black"></div>
    <!--楼宇3D/平面分布图展示 end-->
    <!--实时客流 start-->
    <div class="floor__block--passenger corner-bg items vam">
      <div class="floor__sub--title vertical">
        实时客流
      </div>
      <div class="passenger-items">
        <div class="items-icon">
          <img src="../../assets/three/enter-flow-icon@2x.png" alt="">
          <p>进客流</p>
        </div>
        <div class="items-data">
          <div class="sub-items">
            <strong>210</strong><span>5%</span>
            <p>今日数据</p>
          </div>
          <div class="sub-items">
            <strong>2000</strong>
            <p>昨日数据</p>
          </div>
        </div>
      </div>
      <div class="passenger-items">
        <div class="items-icon">
          <img src="../../assets/three/visitor-icon@2x.png" alt="">
          <p>到访会员</p>
        </div>
        <div class="items-data vam">
          <div class="sub-items">
            <strong>2100</strong><span>5%</span>
            <p>今日数据</p>
          </div>
          <div class="sub-items">
            <strong>20000</strong>
            <p>昨日数据</p>
          </div>
        </div>
      </div>
      <div class="passenger-items vam">
        <div class="items-icon">
          <img src="../../assets/three/current-number-icon@2x.png" alt="">
          <p>当前人数</p>
        </div>
        <div class="items-data">
          <div class="sub-items">
            <strong>21000</strong>
          </div>
        </div>
      </div>
    </div>
    <!--实时客流 end-->
    <!--详细数据展示-->
    <div class="floor__block--child">
      <div class="fc-left">
        <!--到访会员-->
        <div class="floor-visitor corner-bg items">
          <div class="floor__sub--title">
            到访会员
          </div>
          <div class="visitor-info-wrap vam">
            <img class="visitor-photo" src="/static/img/logo@2x.png" alt="">
            <div class="detail-info">
              <p>姓名</p>
              <p>会员库名</p>
              <p>女</p>
              <p>18岁</p>
              <p>2018-11-29 17:50</p>
            </div>
          </div>
          <el-scrollbar class="visitor-history--list">
            <img class="visitor-avatar" src="/static/img/logo@2x.png" v-for="(item, $index) in 30" :key="$index" alt="">
          </el-scrollbar>
        </div>
        <!--业态客流排行榜-->
        <div class="format-flow-rank corner-bg items">
          <div class="floor__sub--title">
            业态客流排行榜
          </div>
        </div>
      </div>
      <div class="fc-right">
        <div class="float-block clearfix">
          <!--会员比例-->
          <div class="member-ratio corner-bg items">
            <div class="floor__sub--title">
              会员比例
            </div>
          </div>
          <!--回头客比例-->
          <div class="return-ratio corner-bg items">
            <div class="floor__sub--title">
              回头客比例
            </div>
          </div>
        </div>
        <!--男女比例-->
        <div class="sex-ratio corner-bg items">
          <div class="floor__sub--title">
            男女比例
          </div>
        </div>
        <!--年龄比例-->
        <div class="age-ratio corner-bg items">
          <div class="floor__sub--title">
            年龄比例
          </div>
        </div>
        <!--门店客流排行榜-->
        <div class="store-flow-rank corner-bg items">
          <div class="floor__sub--title">
            门店客流排行榜
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      svgObj: '',
      newSvgChild: '',
      styleList: [],
      imgList: [
        {
          href: '/static/img/logo@2x.png'
        }
      ]
    }
  },
  created () {},
  mounted () {
  },
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style lang="scss" type="text/scss" scoped>
  .three__floor--wrap {
    > div {
      &:last-child{
        margin-bottom: 20px;
      }
    }
    .corner-bg{
      margin-bottom: 8px;
      padding: 20px;
      box-sizing: border-box;
    }
    div.items{
      background-color: #232027;
    }
  }
  /*标题样式*/
  .floor__sub--title{
    font-size: 14px;
    &.vertical{
      display: inline-block;
      width: 1em;
      line-height: 1.2;
      margin-right: 15px;
    }
  }
  .floor__3d--wrap{
    position: relative;
    height: 470px;
    /*background: #0F0E11;*/
    &:after{
      /*content: '';*/
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0F0E11;
    }
  }
  /*实时客流样式表*/
  .floor__block--passenger {
    height: 132px;
    .passenger-items{
      width: 30%;
      height: 80px;
      margin-right: 15px;
      border-radius: 8px;
      padding: 16px 20px;
      box-sizing: border-box;
      background: #515055;
      text-align: center;
      color: #8c939d;
      font-size: 12px;
      &:last-child{
        margin-right: 0;
      }
      .items-icon{
        float: left;
        margin-right: 25px;
        text-align: center;
        line-height: 1.2;
        img{
          height: 28px;
        }
      }
      .items-data{
        overflow: hidden;
        text-align: left;
        > div {
          margin-right: 20px;
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .sub-items{
        display: inline-block;
        strong{
          font-size: 16px;
          color: #3a8ee6;
        }
        span{
          padding-left: 10px;
          color: #C03639;
          margin-left: 2px;
          background-position: 2px center;
          background-repeat: no-repeat;
          background-image: url(../../assets/three/up-icon@2x.png);
          background-size: auto 10px;
          &.lower {
            background-image: url(../../assets/three/up-icon@2x.png);
          }
        }
      }
    }
  }
  .floor__block--child{
    overflow: hidden;
    background: transparent;
    .fc-left, .fc-right{
      float: left;
      width: calc(50% - 4px);
    }
    .fc-left{
      margin-right: 8px;
    }
    .floor-visitor{
      height: 584px;
      .visitor-info-wrap{
        background: #0F0E11;
        border-radius: 10px;
        padding: 16px;
        margin-top: 10px;
        .visitor-photo{
          width: 144px;
          height: 194px;
          border: 1px solid #d1dbe5;
          border-radius: 5px;
        }
        .detail-info{
          text-align: left;
          margin-left: 44px;
          p{
            height: 1.5em;
            line-height: 1;
            border-bottom: 1px dashed #979797;
            margin-bottom: 18px;
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
      .visitor-history--list{
        overflow: hidden;
        margin-top: 25px;
        width: calc(100% + 8px);
        height: 256px;
        img.visitor-avatar {
          float: left;
          width: 58px;
          height: 80px;
          box-sizing: border-box;
          margin-right: 8px;
          margin-bottom: 8px;
          border-radius: 5px;
        }
      }
    }
    .format-flow-rank{
      height: 316px;
    }
    .fc-right{
      .member-ratio, .return-ratio{
        float: left;
        width: calc(50% - 4px);
        height: 250px;
      }
      .member-ratio{
        margin-right: 8px;
      }
      .sex-ratio{
        height: 162px
      }
      .age-ratio{
        height: 196px;
      }
      .store-flow-rank {
        height: 276px;
      }
    }
  }
</style>
