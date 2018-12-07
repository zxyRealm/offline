<template>
  <el-popover
    placement="bottom"
    v-model="visible"
    trigger="click"
    width="240"
    class="floor__select--wrap">
    <ul >
      <li v-for="(item,$index) in floorList" class="fs__dropdown--item" :key="$index">{{item}}</li>
    </ul>
    <el-input slot="reference" ref="floorInput" style="z-index: 2007;"  readonly v-model="showText"></el-input>
  </el-popover>
</template>

<script>
import ElPopover from 'element-ui/packages/popover/src/main'

export default {
  components: {ElPopover},
  name: 'floor-select',
  props: {
    value: {
      type: [String, Array],
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      dropShow: false,
      showText: '',
      floorList: [
        'B2',
        'B1',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7'
      ]
    }
  },
  created () {
  },
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {
    value: {
      handler (val) {
        console.log(val)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.floor__select--wrap{
  position: relative;
}
.fs__dropdown--wrap{
  width: 200px;
  height: 100px;
  padding: 4px 6px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 99;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.30);
  .fs__dropdown--item{
    float: left;
    width: 36px;
    margin-right: 4px;
    margin-bottom: 2px;
    line-height: 18px;
    text-align: center;
    background: #F7F7F7;
    &.active{
      background: rgba(15,158,233,0.20);
    }
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
