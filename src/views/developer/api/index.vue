<template>
  <uu-sub-tab :menu-array="menu"></uu-sub-tab>

</template>

<script>

  export default {
    name: "api",

    data() {
      return {
        menu: [
          {title: '消息通知', index: '/developer/notify'},
          {title: '开放API', index: '/developer/api'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
