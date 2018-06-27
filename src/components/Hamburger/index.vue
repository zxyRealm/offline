<template>
  <div>
    <img src="./control_sidebar_icon.png" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" alt="">
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
  vertical-align: middle;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
