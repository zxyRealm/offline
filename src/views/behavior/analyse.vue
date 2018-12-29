<template>
  <div class="analyse__content--wrap g-prl20">
    <div class="select__container clearfix">
      <el-select
        value-key="guid"
        class="behavior__select"
        popper-class="select__popper--wrap theme__popper--wrap"
        v-model="filter.group">
        <el-input placeholder="快速查找社群" class="select__search" v-model="search.group">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-option :value="0" label="全部社群"></el-option>
        <el-option
          v-for="(item, $index) in groupList"
          :value="item"
          :key="$index"
          :label="item.name"></el-option>
      </el-select>
      <el-select
        @visible-change="visibleChange"
        value-key="deviceKey"
        class="behavior__select"
        popper-class="select__popper--wrap theme__popper--wrap"
        v-model="filter.device">
        <div class="behavior__select--inner clearfix">
          <div class="inner-left">
            <!--<div class="el-select-dropdown__item" @click="() => {selectType = -1;filter.device = -1}" :class="{active: selectType === -1}">一体机</div>-->
            <el-option :value="0" :class="{active: !filter.device && !selectType}" label="全部设备"></el-option>
            <div class="el-select-dropdown__item" @click="getDeviceList('aio')" :class="{active: selectType === 1}">一体机</div>
            <div class="el-select-dropdown__item" @click="getDeviceList('camera')" :class="{active: selectType === 2}">摄像机</div>
          </div>
          <div class="inner-right" v-show="selectType">
            <el-input placeholder="快速查找设备" class="select__search" v-model="search.device">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-option
              v-for="(item, $index) in deviceList"
              :value="item"
              :key="$index"
              :label="item.deviceName"></el-option>
            <div v-if="!deviceList.length" class="text-center">暂无设备</div>
          </div>
        </div>
      </el-select>
      <a href="javascript:void (0)" class="fr">刷新</a>
    </div>
    <div>
      <el-table
      border
      :data="behaviorList"
      >
        <el-table-column
          prop="portalName"
          width="120"
          align="center"
          label="抓拍图">
          <template slot-scope="scope">
            <img width="24" :src="scope.row.url" alt="">
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          width="120"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="set"
          width="120"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="age"
          width="120"
          align="center"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="所属会员库">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <router-link to="/behavior/trail">查看移动轨迹</router-link>
            <!--<a href="javascript:void (0)">查看移动轨迹</a>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getBehaviorList"
        @size-change="sizeChange"
        :page-sizes="[10, 20, 30]"
        :current-page="pagination.index"
        :page-size="pagination.length"
        layout="total,sizes,prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {MemberNoFloor} from '../../api/community'
import {GetAllAioList, GetAllCameraList} from '../../api/device'
import {mapState} from 'vuex'
export default {
  name: 'analyse',
  data () {
    return {
      selectType: '',
      search: {
        group: '',
        device: ''
      },
      filter: {
        group: 0,
        device: 0
      },
      groupList: [], // 社群列表
      deviceOriginList: [], // 原始设备列表数据
      deviceList: [], // 设备列表
      behaviorList: [
        {name: '鱼鱼鱼'}
      ], // 行为信息列表
      pagination: {
        index: 2,
        length: 4,
        total: 100
      }
    }
  },
  created () {
    this.getGroupList()
  },
  mounted () {},
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    getGroupList () {
      if (!this.currentManage.id) return
      MemberNoFloor({groupId: this.currentManage.id}).then(res => {
        this.groupList = res.data.filter(item => item.coordinates)
      })
    },
    // 获取设备
    getDeviceList (type) {
      switch (type) {
        case 'aio':
          this.selectType = 1
          GetAllAioList().then(res => {
            console.log('device list aio-------', res.data)
            this.deviceOriginList = res.data
            this.deviceList = res.data
          })
          break
        case 'camera':
          this.selectType = 2
          GetAllCameraList().then(res => {
            console.log('device list Camera-------', res.data)
            this.deviceOriginList = res.data
            this.deviceList = res.data
          })
          break
        default:
      }
    },
    visibleChange () {
      this.selectType = ''
    },
    sizeChange () {},
    // 获取行为分析信息列表
    getBehaviorList () {}
  },
  watch: {
    currentManage: {
      handler (val) {
        this.getGroupList()
      },
      deep: true
    },
    filter: {
      handler (val) {
        console.log('filter', val)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.select__container{
  padding: 16px 0 12px;
  .behavior__select{
    width: 154px;
    &+ .behavior__select{
      margin-left: 20px;
    }
  }
}
</style>
