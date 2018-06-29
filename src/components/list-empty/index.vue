<template>
  <div v-if="!loading" class="ob-list-empty vam" :class="size" :style="{marginTop:top}">
    <span>
      {{text}}
    </span>
  </div>
</template>

<script>

  export default {
    name: "ob-list-empty",
    props: {
      top:{
        type:String,
        default:'20%'
      },
      text: {
        type: String,
        default: '暂无数据'
      },
      size:{
        type:String,
        default:''
      }
    },
    computed:{
      loading:function(){
        return this.$store.state.loading
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ob-list-empty {
    display: block;
    text-align: center;
    border: 1px dashed #1f2d3d;
    background: rgba(0, 0, 0, 0.20);
    height: 110px;
    width: 720px;
    font-size: 12px;
    line-height: 110px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 auto;
    &.small {
      height: 50px;
      width: 480px;
      line-height: 50px;
    }
  }
</style>
