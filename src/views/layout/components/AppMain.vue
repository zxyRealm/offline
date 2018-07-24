<template>
  <section class="app-main">
    <router-view></router-view>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
