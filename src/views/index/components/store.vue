/*
* 门店排行
* @author  张晓元
* @date    2019-04-30
*/
<template>
  <div class="store-rank--wrap">
    <div class="floor__sub--title" :style="{'font-size': fontSize + 2 + 'px'}">
      {{title}}
    </div>
    <div class="process__list--wrap">
      <div
        class="pl-items vam"
        v-for="(val, $index) in itemNum" :key="val"
        :class="{'empty--data': !data[$index]}">
        <span class="ellipsis">{{val}}.{{data[$index] ? data[$index][label] : `门店${$index + 1}`}}</span>
        <el-progress
          :color="data[$index] ? industryColor[$index > 3 ? 3 : $index] : '#005BC9'"
          :percentage="data[$index] ? data[$index].percent : 0"></el-progress>
        <i
          class="iconfont icon-gengduo"
          @click="handleLink(data[$index])"
          :class="{'c-grey': !data[$index]}"></i>
      </div>
    </div>
  </div>
</template>

<script>
import resize from './resize'
export default {
  name: 'StoreRank',
  mixins: [resize],
  data () {
    return {
      industryColor: [ // 比例条颜色值
        '#EA9D49',
        '#E4DA52',
        '#28C0B1',
        'rgba(43, 81, 237, 0.7)'
      ]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    itemNum: { // 列表展示数据条数
      type: Number,
      default: 6
    },
    title: { // 标题
      type: String,
      default: '门店客流排行榜'
    },
    label: { // 名称显示key值
      type: String,
      default: 'groupName'
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    handleLink (val) {
      this.$emit('handle-link', val)
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  /*门店客流排行*/
  .store-rank--wrap {
    .pl-items {
      height: 30px;
      line-height: 30px;
      text-align: left;
      .el-progress__text {
        color: #fff;
      }
      > span {
        width: 90px;
        font-size: 12px;
        margin-right: 5px;
      }
      .el-icon-d-arrow-right:not(.c-grey) {
        color: #3a8ee6;
        cursor: pointer;
      }
      .el-progress {
        width: calc(100% - 120px);
      }
    }
    .iconfont:not(.c-grey){
      cursor: pointer;
    }
  }
</style>