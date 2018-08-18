<template>
  <section class="app-main">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
