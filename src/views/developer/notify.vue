<template>
    <div class="notify-wrap">
      <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    </div>
</template>

<script>
    export default {
        name: "notify",
      data(){
          return {
            menu:[
              { title:'系统通知' }
            ]
          }
      }
    }
</script>

<style scoped>

</style>
