<template>
  <div class="home-page-wrapper">
    <div class="head">
      <div>欢迎您使用</div>
      <p>线下浏览器服务平台</p>
    </div>
    <div class="content vam">
      <div class="content-item">
        <h1>Hello, Uni-Ubi</h1>
        <p>Save time, Enjoy life</p>
        <h2>用有思想的技术,&nbsp;&nbsp;创造无处不在的美好</h2>
      </div>
    </div>
    <div class="bottom">
      <ul class="clearfix">
        <li class="vam">
          <router-link to="/console">
            <div>控制台</div>
            <p>实时数据分析</p>
          </router-link>
        </li>
        <li class="vam">
          <router-link to="/community">
            <div>社群管理</div>
            <p>创建社群，绑定智能设备</p>
          </router-link>
        </li>
        <li class="vam">
          <router-link to="/data">
            <div>数据可视化</div>
            <p>人脸精准识别</p>
          </router-link>
        </li>
        <li class="vam">
          <router-link to="/equipment">
            <div>设备管理</div>
            <p>轻松管理您的智能设备</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created () {

  },
  mounted () {

  },
  computed: {},
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .home-page-wrapper {
    height: 100%;
    width: 100%;
    min-width: 1020px;
    background: url(../../assets/public/home-page-three.png) no-repeat center;
    background-size: 100%;
    position: relative;
    .head {
      height: 80px;
      box-sizing: border-box;
      padding: 18px 0;
      padding-left: 3.3%;
      div {
        font-size: 20px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
      }
    }
    p {
      color: #A1A1A1;
      font-size: 12px;
    }
    div {
      color: #ffffff; //激活颜色color: #0F9EE9;
      font-size: 16px;
    }
    .content {
      width: 39.1%;
      height: 31.6%;
      position: absolute;
      text-align: center;
      top: 26.9%;
      left: 29.2%;
      //background: rgba(0, 0, 0, 0.15);
      .content-item {
        line-height: 1.5;
        text-align: center;
      }
      h1 {
        font-size: 40px;
      }
      p {
        font-size: 16px;
        padding: 4px 0 20px 0;
        color: #ffffff;
      }
      h2 {
        font-size: 18px;
      }
    }
    .bottom {
      width: 100%;
      min-width: 1020px;
      height: 100px;
      position: absolute;
      bottom: 7.2%;
      text-align: center;
      ul {
        display: inline-block;
      }
      li {
        float: left;
        width: 15%;
        min-width: 180px;
        height: 100px;
        margin-right: 10px;
        background-color: rgba(216, 216, 216, 0.05);
        &:last-child {
          margin-right: 0;
        }
        a:hover {
          color: #0F9EE9 !important;
          p, div {
            color: #0F9EE9;
          }
        }
      }
    }
  }
</style>
