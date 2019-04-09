<template>
  <div class="wrapper">
    <h2>tree 组件测试页面</h2>
    <div class="slider-bar">
      <custom-tree
        ref="testTree"
        node-key="groupSonGuid"
        group-key="industryType"
        :data="treeList"
        :defaultProps="{label: 'name', children: 'subGroupSon'}"
        @tree-search="treeSearch"
        @current-change="currentChange">
      </custom-tree>
    </div>
  </div>
</template>

<script>
import CustomTree from '../../components/group-nav/tree'
import {GetMarketList, SonCommunitySearch} from '../../api/community'
import {mapState} from 'vuex'
export default {
  name: 'test-tree',
  components: {
    CustomTree
  },
  data () {
    return {
      treeList: [
      ]
    }
  },
  created () {
  },
  mounted () {
    this.setTreeData()
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    setTreeData () {
      if (!this.currentManage.id) return
      GetMarketList({parentId: this.currentManage.id}).then(res => {
        console.log('market list', res.data)
        this.treeList = res.data
        if (res.data[0]) {
          res.data[0].industryType = -1
          this.$refs.testTree.setCurrentKey(res.data[0].groupSonGuid)
        }
      })
      // setTimeout(() => {
      //   this.treeList = [
      //     {
      //       label: '一级 2',
      //       guid: '222222',
      //       children: [
      //         {
      //           label: '二级 2-1',
      //           children: []
      //         },
      //         {
      //           label: '二级 2-2',
      //           children: [{
      //             label: '三级 2-2-1',
      //             guid: '012'
      //           }]
      //         },
      //         {
      //           label: '一级 3',
      //           children: [
      //             {
      //               label: '二级 3-1',
      //               children: [{
      //                 label: '三级 3-1-1',
      //                 guid: '123'
      //               }]
      //             },
      //             {
      //               label: '二级 3-2',
      //               children: [{
      //                 label: '三级 3-2-1',
      //                 guid: '456'
      //               }, {
      //                 label: '三级 3-2-2',
      //                 guid: '789'
      //               }]
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      //   this.$refs.testTree.setCurrentKey('012')
      // }, 200)
    },
    currentChange (data) {
      console.log('change', data)
    },
    treeSearch (val) {
      // console.log('search text', val)
      SonCommunitySearch({parentId: this.currentManage.id, searchText: val}).then(res => {
        console.log('search list', res.data)
        this.$refs.testTree.setCheckedKeys(res.data)
      })
    }
  },
  watch: {
    currentManage: {
      handler (val) {
        this.setTreeData()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider-bar{
    width: 320px;
  }
</style>
