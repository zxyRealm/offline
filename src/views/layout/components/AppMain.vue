<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
