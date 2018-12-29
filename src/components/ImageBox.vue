<template>
  <div class="common__image--box" :style="{backgroundImage: `url(${src})`, height: height, width: width}">
  </div>
</template>

<script>
export default {
  name: 'image-box',
  props: {
    src: { // 图片url
      type: String,
      default: ''
    },
    height: { // 图片容器高度
      type: String,
      default: '100px'
    },
    width: { // 图片容器宽度
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.common__image--box{
  display: inline-block;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  vertical-align: top;
}
</style>
