<template>
  <div class="portal__content--wrap">
    <div class="group__select--wrap">
      <el-select v-model="currentGroup">
        <el-option v-for="(item, $index) in groupList" :key="$index" :value="item.name"></el-option>
      </el-select>
    </div>
    <el-table
      border
      :data="portalList"
    >
      <el-table-column
        prop="name"
        width="120"
        align="center"
        label="出入口">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备">
        <template slot-scope="scope">
          <el-scrollbar class="table__scrollbar--wrap">
            <ul class="table__device--list">
              <li v-for="item in 5" :key="item" class="vam">
                <span class="ellipsis">{{'设备'+ item}}</span>
                <i class="el-icon-delete" @click="deletePortalDevice(item)"></i>
              </li>
            </ul>
          </el-scrollbar>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:void(0)">添加</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getPortalEquipment"
      :page-sizes="[4, 10, 20, 30]"
      :current-page="pagination.index"
      :page-size="pagination.length"
      layout="total,sizes,prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'portal',
  data () {
    return {
      currentGroup: '', // 当前选中社群
      groupList: [
        {name: '城西'}
      ], // 自有社群列表
      portalList: [
        {name: '出入口A'}
      ], // 出入口设备列表
      pagination: {
        total: 30,
        length: 5
      } // 设备列表分页信息
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    // 获取出入口设备列表
    getPortalEquipment () {
    },
    deletePortalDevice () {
      this.$affirm({
        title: '删除绑定关系',
        confirm: '删除',
        text: '删除关系后，该出入口下将不包含该设备'
      }, (action, instance, done) => {
        if (action === 'confirm') {
        }
        done()
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.group__select--wrap{
  margin-top: 16px;
  margin-bottom: 12px;
  .el-select{
    width: 154px;
  }
}
  .table__scrollbar--wrap{
    height: 80px;
    overflow: hidden;
    .table__device--list{
      width: 210px;
      margin: 0 auto;
      font-size: 12px;
      li:not(:last-of-type) {
        margin-bottom: 12px;
      }
      .ellipsis{
        width: 192px;
      }
      .el-icon-delete{
        color: #f85650;
        cursor: pointer;
      }
    }
  }
</style>
