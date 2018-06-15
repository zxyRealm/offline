<template>
  <div class="param-explain-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
  </div>
</template>

<script>
  export default {
    name: "explain",
    data() {
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
