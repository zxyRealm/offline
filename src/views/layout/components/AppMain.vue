<template>
  <section class="app-main">
    <!--v-if="!$route.meta.keepAlive"-->
    <router-view></router-view>
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
