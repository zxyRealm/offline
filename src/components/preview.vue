<template>
    <div v-show="visible" @click.self="close" class="image__preview--wrap vam">
      <img :src="src" alt="">
    </div>
</template>

<script>
export default {
  name: 'imagePreview',
  props: {
    visible: Boolean,
    src: String
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
  background: rgba(0,0,0,0.6);
  > img{
    max-width: 80%;
    max-height: 80%;
  }
}
</style>
