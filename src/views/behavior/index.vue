<template>
  <div class="behavior__content--wrap">
    <div class="g-module-title">
      <h1 class="normal title g-inline">
        <a v-if="$route.name !== 'BehaviorAnalyse'" href="javascript:;" style="color: #252525;margin-top:-2px" @click="historyBack()"> < </a>
        {{$route.name === 'BehaviorAnalyse' ? '行为分析' : '移动轨迹'}}
      </h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      menu: [
        {title: '行为分析'}
      ]
    }
  },
  created () {
    
  },
  mounted () {},
  computed: {},
  methods: {
    historyBack() {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.content__nav{
  height: 57px;
  line-height: 57px;
  font-size: 16px;
  border-bottom:1px dashed rgba(151,151,151,0.10);
}
  .behavior__content--wrap{
    > div{
      &:nth-child(2){
        height: calc(100% - 80px);
      }
    }
  }
</style>
