<template>
  <div class="home-page-wrapper">
      <div class="head">
        <div>欢迎您使用</div>
        <p>线下浏览器服务平台</p>
      </div>
      <div class="content">
            <div class="dotted">

            </div>
            <div class="constructor">
                <h1>Hello,Uni-Ubi</h1>
                <p>Save time,Enjoy life</p>
                <h3>用有思想的技术，创造无处不在的美好</h3>
            </div>
            <div>
              
            </div>
      </div>
      <div class="bottom">
            <ul>
              <li>
                <div>控制台</div>
                <p>实时数据分析</p>
              </li>
              <li>
                <div>社群管理</div>
                <p>创建社群,绑定只能设备</p>
              </li>
              <li>
                <div>数据可视化</div>
                <p>人脸精准识别</p>
              </li>
              <li>
                <div>设备管理</div>
                <p>轻松管理您的智能设备</p>
              </li>
            <ul>
      </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  created(){
    
  },
  mounted(){
    
  },
  computed: {
   
  },
  methods: {
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .home-page-wrapper {
      height: 100%;
      width: 100%;
      .head {
        height: 80px;
        border: 1px solid red;
      }
      .content {
        .dotted {
          width: 540px;
          height: 135px;
          border: 1px dotted #1896E6;
        }
        .constructor {
          opacity: 0.15;
          background: #000000;
        }

      }
      .bottom {
        height: 100px;
        li {
          width: 180px;
          height: 100%;
          display: inline-block;
          margin-right: 10px;
          div {
            font-size: 16px;    
            color: #FFFFFF;   //激活颜色color: #0F9EE9;
          }
          p {
            font-size: 12px;
            color: #A1A1A1;
          }
        }
      }
    }
</style>
