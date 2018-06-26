<template>
  <div class="ob-list-empty vam" :class="size">
    <span>
      {{text}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "ob-list-empty",
    props: {
      text: {
        type: String,
        default: '暂无数据'
      },
      size:{
        type:String,
        default:''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ob-list-empty {
    text-align: center;
    border: 1px dashed #1f2d3d;
    background: rgba(0, 0, 0, 0.20);
    height: 110px;
    width: 720px;
    font-size: 12px;
    margin: 120px auto;
    line-height: 110px;
    color: rgba(255, 255, 255, 0.5);
    &.small {
      height: 50px;
      width: 480px;
      line-height: 50px;
    }
  }
</style>
