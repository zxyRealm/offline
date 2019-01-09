<template>
  <div class="common__image--box" @click="showImage" :style="{backgroundImage: `url(${src})`, height: height, width: width}">
    <!--<image-preview :src="src" :visible.sync="visible"></image-preview>-->
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
    },
    clickEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    showImage () {
      if (this.clickEvent) {
        this.visible = true
      }
    }
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
  cursor: pointer;
}
</style>
