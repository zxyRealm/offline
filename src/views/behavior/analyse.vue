<template>
  <div class="analyse__content--wrap g-prl20">
    <div class="select__container clearfix">
      <el-select
        value-key="guid"
        @visible-change="visibleChange"
        class="behavior__select"
        popper-class="select__popper--wrap theme__popper--wrap"
        v-model="filter.group">
        <el-input
          :clearable="true"
          @clear="showAllList"
          @keyup.enter.native="filterName('group')"
          placeholder="快速查找社群"
          class="select__search" v-model.trim="search.group">
          <i slot="prefix" @click="filterName('group')" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-option :value="0" label="全部社群"></el-option>
        <el-option
          v-for="(item, $index) in groupList"
          :value="item.guid"
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
            <el-option :value="0" :class="{active: !filter.device && !selectType}" label="全部设备"></el-option>
            <div class="el-select-dropdown__item" @click="getDeviceList('aio')" :class="{active: selectType === 1}">
              一体机
            </div>
            <div class="el-select-dropdown__item" @click="getDeviceList('camera')" :class="{active: selectType === 2}">
              摄像机
            </div>
          </div>
          <div class="inner-right" v-show="selectType">
            <el-input
              @clear="showAllList"
              :clearable="true"
              placeholder="快速查找设备"
              @keyup.enter.native="filterName('device')"
              class="select__search" v-model.trim="search.device">
              <i slot="prefix" @click="filterName('device')" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-option
              v-for="(item, $index) in deviceList"
              :value="item.deviceKey"
              :key="$index"
              :label="item.deviceName"></el-option>
            <div v-if="!deviceList.length" class="text-center fs12">暂无设备</div>
          </div>
        </div>
      </el-select>
      <el-date-picker
        class="date--picker"
        v-model="filter.date"
        :clearable="true"
        type="daterange"
        range-separator="-"
        popper-class="date__popper--wrap theme__popper--wrap"
        value-format="yyyy-MM-dd"
        format="yyyy/MM/dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <a href="javascript:void (0)" @click="getBehaviorList()" class="fr">刷新</a>
    </div>
    <el-scrollbar v-scroll-top="pagination.index" class="table__scrollbar">
      <el-table
        border
        :empty-text="emptyText"
        :data="behaviorList"
      >
        <el-table-column
          prop="name"
          width="120"
          align="center"
          label="姓名">
          <template slot-scope="scope">{{scope.row.name || '---'}}</template>
        </el-table-column>
        <el-table-column
          prop="gender"
          width="80"
          align="center"
          label="性别">
          <template slot-scope="scope">
            {{scope.row.gender ? '男': '女'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          width="80"
          align="center"
          label="年龄">
        </el-table-column>
        <el-table-column
          align="center"
          label="所属会员库">
          <template slot-scope="scope">
            {{scope.row.memberLibaryName && scope.row.memberLibaryName.length ? scope.row.memberLibaryName[0] : '---'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="到访时间">
          <template slot-scope="scope">
            {{scope.row.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="imageUrl"
          width="100"
          align="center"
          label="照片">
          <template slot-scope="scope">
            <image-box width="54px" height="54px" @click.native="showImage(scope.row)"
                       :src="scope.row.imageUrl"></image-box>
          </template>
        </el-table-column>
        <el-table-column
          width="240"
          align="center"
          label="比对照片/识别分数">
          <template slot-scope="scope">
            <div class="img-wrap" v-for="(item, $index) in scope.row.top3InfoList" :key="$index">
              <image-box width="54px" height="54px" @click.native="showImage(item)" :src="item.imageUrl"></image-box>
              <p>{{item.score}}</p>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="'/behavior/trail/' + scope.row.personId">查看移动轨迹</router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-pagination
      v-if="pagination.total && pagination.total > pagination.length"
      @current-change="getBehaviorList"
      @size-change="sizeChange"
      :page-sizes="[10, 20, 30]"
      :current-page="pagination.index"
      :page-size="pagination.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
    <image-preview :src="preview.src" :visible.sync="preview.visible"></image-preview>
  </div>
</template>

<script>
import { MemberNoFloor } from '../../api/community'
import { GetGroupAioList, GetGroupCameraList } from '../../api/device'
import { GetBehaviorList } from '../../api/behavior'

import { mapState } from 'vuex'

export default {
  name: 'analyse',
  data () {
    return {
      emptyText: '数据加载中...', // table 数据未加载是提示信息
      preview: {
        visible: false,
        src: ''
      },
      selectType: '',
      search: {
        group: '',
        device: ''
      },
      filter: {
        date: '',
        group: 0,
        device: 0
      },
      groupList: [], // 社群列表
      groupOriginList: [], // 原始社群列表数据
      deviceOriginList: [], // 原始设备列表数据
      deviceList: [], // 设备列表
      behaviorList: [], // 行为信息列表
      pagination: {
        index: 1,
        length: 10,
        total: 0
      }
    }
  },
  created () {
    this.getGroupList()
    this.getBehaviorList()
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentManage', 'aliveState'])
  },
  methods: {
    // 获取当前管理社群下所有子社群
    getGroupList () {
      if (!this.currentManage.id) return
      MemberNoFloor({groupId: this.currentManage.id}).then(res => {
        let list = res.data.filter(item => item.coordinates)
        this.groupList = list
        this.groupOriginList = list
      })
    },
    // 获取设备 (一体机、摄像头)
    getDeviceList (type) {
      switch (type) {
        case 'aio':
          if (this.selectType === 1) return
          this.selectType = 1
          this.search.device = ''
          GetGroupAioList({groupGuid: this.currentManage.id}).then(res => {
            this.deviceOriginList = res.data
            this.deviceList = res.data
          })
          break
        case 'camera':
          if (this.selectType === 2) return
          this.selectType = 2
          this.search.device = ''
          GetGroupCameraList({groupGuid: this.currentManage.id}).then(res => {
            this.deviceOriginList = res.data
            this.deviceList = res.data
          })
          break
        default:
      }
    },
    visibleChange () {
      this.selectType = ''
      this.search = {
        group: '',
        device: ''
      }
      setTimeout(() => {
        this.groupList = this.groupOriginList
        this.deviceList = this.deviceOriginList
      }, 100)
    },
    sizeChange (val) {
      this.pagination.length = val
      this.getBehaviorList()
    },
    // 获取行为分析信息列表
    getBehaviorList (page, size) {
      if (!this.currentManage.id) return
      let [startT, endT] = ['', '']
      if (this.filter.date) { // clearable方法 会使date为null
        startT = this.filter.date[0] + ' 00:00:00'
        endT = this.filter.date[1] + ' 23:59:59'
      }
      page = this.$route.meta.keepAlive ? this.aliveState.index : page || this.pagination.index || 1
      this.emptyText = '数据加载中...'
      GetBehaviorList({
        startTime: startT,
        endTime: endT,
        groupSonGuid: this.filter.group || '',
        deviceKey: this.filter.device || '',
        groupGuid: this.currentManage.id,
        length: size || this.pagination.length || 10,
        index: page
      }).then(res => {
        this.$route.meta.keepAlive = false
        this.emptyText = '暂无数据'
        this.pagination = res.data.pagination
        this.behaviorList = res.data.content
      }).catch(() => {
        this.emptyText = '数据请求失败'
        this.$route.meta.keepAlive = false
      })
    },
    // 通过名称搜索社群或者设备
    filterName (type) {
      switch (type) {
        case 'group':
          this.groupList = this.groupOriginList.filter(item => item.name.indexOf(this.search.group) > -1 || item.nickName.indexOf(this.search.group) > -1)
          break
        case 'device':
          this.deviceList = this.deviceOriginList.filter(item => item.deviceName.indexOf(this.search.device) > -1)
          break
      }
    },
    // 清除搜索内容
    showAllList () {
      this.groupList = this.groupOriginList
      this.deviceList = this.deviceOriginList
    },
    // 查看抓拍大图
    showImage (row) {
      this.preview.src = row.imageUrl
      this.preview.visible = true
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.getGroupList()
        this.getBehaviorList()
      },
      deep: true
    },
    filter: {
      handler () {
        this.getBehaviorList(1)
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_ALIVE_STATE', this.pagination)
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .table__scrollbar {
    height: calc(100% - 100px);
  }

  .common__image--box {
    cursor: pointer;
  }

  .img-wrap {
    display: inline-block;
    margin: 0 5px;
  }

  .select__container {
    padding: 16px 0 12px;
    .behavior__select {
      width: 154px;
      margin-right: 20px;
    }
    .date--picker {
      width: 220px;
    }
  }
</style>
