<template>
  <div class="behavior__content--wrap">
    <uu-sub-tab
      back
      :menu-array="menu"
    ></uu-sub-tab>
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
  created () {},
  mounted () {},
  computed: {},
  methods: {
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
</style>
