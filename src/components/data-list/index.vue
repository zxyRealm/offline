<template>
  <table class="ob-list-item" width="100%" v-if="visible">
    <tr class="ob-list-item-tr">
      <slot></slot>
    </tr>
  </table>
</template>

<script>

export default {
  name: 'ob-list',
  props: {
    data: {
      type: [Array, Object],
      default: () => ({})
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    remove () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .ob-list-item {
    height: 120px;
    background: rgba(1, 8, 20, 0.10);
    border: 1px dashed rgba(151, 151, 151, 0.10);
    box-sizing: border-box;
    margin-bottom: 10px;
    .ob-list-sub-item {
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      p {
        line-height: 1.5;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .ob-list-items {
    .item-type {
      width: 24%;
      line-height: 58px;
      .ellipsis {
        /*width: 100px;*/
      }
    }
    .item-time span {
      display: inline-block;
      min-width: 112px;
    }
    .item-detail, .item-time {
      width: 24%;
      line-height: 28px;
      .ellipsis {
        float: left;
        padding: 0 20px;
        text-align: left;
      }
    }

    .item-handel {
      width: 28%;
      .edit-link {
        margin: 0 58px 0 36px;
      }
      .delete {
        margin-top: 2px;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">

</style>
