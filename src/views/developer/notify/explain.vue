<template>
  <div class="param-explain-wrap">
    <uu-sub-tab back :menu-array="menu"></uu-sub-tab>
    <div class="params-detail-wrap">

    </div>
  </div>
</template>

<script>
export default {
  name: 'explain',
  data () {
    return {
      menu: [
        {title: '参数介绍'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
