<template>
  <div class="custom__tree--wrap">
    <div class="custom__tree--search">
      <el-input
        :placeholder="placeholder">
      </el-input>
    </div>
    <div class="custom__tree--content">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  props: {
    placeholder: {
      type: String,
      default: '查找社群'
    },
    defaultProps: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      data: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            },
            {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            },
            {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }
          ]
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleNodeClick () {

    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
