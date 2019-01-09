<template>
    <div v-show="visible" @click.self="close" class="image__preview--wrap vam">
      <img :src="src" :alt="alt">
    </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    visible: Boolean,
    src: String,
    alt: String
  },
  data: () => ({
    show: false
  }),
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.image__preview--wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  z-index: 9999;
  background: rgba(0,0,0,0.6);
  > img{
    max-width: 80%;
    max-height: 80%;
  }
}
</style>
