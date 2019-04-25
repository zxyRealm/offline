<template>
  <div class="community__guide--wrap">
    <h2 class="guide-title">创建社群</h2>
    <div class="guide-content">
      <router-link to="/community/create/market" class="guide-items">
        <img width="220" src="@/assets/community/chain_icon@2x.png" alt="商场">
        <div class="content">
          <h3 class="sub-title">商场</h3>
          <p>例如：银泰商场，商场可包含单店</p>
        </div>
      </router-link>
      <router-link to="/community/create/chain" class="guide-items">
        <img width="220" src="@/assets/community/chain_icon@2x.png" alt="商场">
        <div class="content">
          <h3 class="sub-title">连锁总店</h3>
          <p>例如：屈臣氏总店，连锁总店可包含单店</p>
        </div>
      </router-link>
      <router-link to="/community/create/store" class="guide-items">
        <img width="220" src="@/assets/community/chain_icon@2x.png" alt="商场">
        <div class="content">
          <h3 class="sub-title">单个门店</h3>
          <p>例如：屈臣氏分店</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide',
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.guide-title{
  margin: 70px 0;
  text-align: center;
  font-size: 30px;
}
.guide-content{
  text-align: center;
  .guide-items{
    display: inline-block;
    margin: 0 82px;
    .sub-title{
      margin-top: 36px;
      margin-bottom: 10px;
      font-size: 20px;
    }
    p{
      font-size: 12px;
      color: rgba(85,85,85,0.50);
    }
  }
}
</style>