<template>
  <div class="echart__funnel--wrap">
    <div v-for="item in 6" :key="item" class="funnel__item"></div>
  </div>
</template>

<script>
export default {
  name: 'custom-funnel',
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
.funnel__item{
  height: 15px;
  margin-bottom: 4px;
  background: #8ED4FD;
}
</style>
