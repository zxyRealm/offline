/*
* 回头客流
* @author  张晓元
* @date    2019-05-05
*/
<template>
  <div class="return__flow--wrap">
    <div class="floor__sub--title" :style="{'font-size': fontSize + 2 + 'px'}">
      {{title}}
    </div>
    <custom-pie
      :size="size"
      :total="data ? data.total : 0"
      :percent="data ? data.percent : 0"></custom-pie>
    <div class="return__data--wrap">
      <div class="multi__box vam">
        <img src="@/assets/three/return_multi_icon@2x.png" alt=""><span>多次</span>
        <span>{{data.percent || '0%'}}</span>
      </div>
      <div class="single__box vam">
        <img src="@/assets/three/return_single_icon@2x.png" alt=""><span>单次</span>
        <span>{{data.percent || '0%'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import resize from './resize'
import CustomPie from '@/components/echarts/custom-pie'
export default {
  name: 'ReturnFlow',
  mixins: [resize],
  components: {
    CustomPie
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: '回头客比例'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  /*回头客比例*/
  .return__flow--wrap {
    height: 100%;
    .floor__sub--title{
      color: #fff;
    }
    &.single {
      height: 146px;
      .person__pie--wrap {
        margin-top: 28px;
        margin-bottom: 15px;
        height: 38px;
      }
    }
    .person__pie--wrap {
      height: calc(100% - 30px - 10px);
    }
  }
  .return__data--wrap {
    font-size: 12px;
    overflow: hidden;
    > div {
      img {
        margin-right: 4px;
        width: 15px;
      }
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
</style>