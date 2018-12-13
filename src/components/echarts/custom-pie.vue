<template>
  <div>
    <span
      v-for="item in 18"
      :key="item"
      :class="{boy: item > girlInt}"
      class="return__ratio--icon"></span>
  </div>
</template>

<script>
export default {
  name: 'custom-pie',
  props: {
    percent: {
      type: [Number], // 0 - 100
      default: 50
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {
    girlInt: {
      get () {
        let int = Math.floor((this.percent / 100) * 18)
        return int
      },
      set () {}
    }
  },
  methods: {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .empty--data{
    .return__ratio--icon{
      background-image: url(../../assets/three/return_girl_icon.png);
      &.boy{
        background-image: url(../../assets/three/return_boy_icon.png);
      }
    }
  }
  .return__ratio--icon{
    float: left;
    display: block;
    width: 10px;
    height: 24px;
    margin-right: 7px;
    background-image: url(../../assets/three/return_girl_icon@2x.png);
    background-size: 100% auto;
    &.boy{
      background-image: url(../../assets/three/return_boy_icon@2x.png);
    }
    &:last-child{
      margin-right: 0;
    }
  }
</style>
