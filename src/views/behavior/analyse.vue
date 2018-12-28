<template>
  <div class="analyse__content--wrap g-prl20">
    <div class="select__container clearfix">
      <el-select
        value-key="guid"
        class="behavior__select"
        popper-class="select__popper--wrap"
        v-model="filter.group">
        <el-input placeholder="快速查找社群" class="select__search" v-model="search.group">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-option :value="-1" label="全部社群"></el-option>
        <el-option
          v-for="(item, $index) in groupList"
          :value="item"
          :key="$index"
          :label="item.name"></el-option>
      </el-select>
      <el-select
        @blur="selectBlur"
        value-key="guid"
        class="behavior__select"
        popper-class="select__popper--wrap"
        v-model="filter.device">
        <div class="behavior__select--inner clearfix">
          <div class="inner-left">
            <el-option :value="-1" :class="{active: filter.device === -1}" label="全部设备"></el-option>
            <div class="el-select-dropdown__item" @click="getDeviceList('aio')" :class="{active: selectType === 1}">一体机</div>
            <div class="el-select-dropdown__item" @click="getDeviceList('camera')" :class="{active: selectType === 2}">摄像机</div>
          </div>
          <div class="inner-right">
            <el-input placeholder="快速查找设备" class="select__search" v-model="search.device">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-option
              v-for="(item, $index) in groupList"
              :value="item"
              :key="$index"
              :label="item.name"></el-option>
          </div>
        </div>
      </el-select>
      <a href="javascript:void (0)" class="fr">刷新</a>
    </div>
  </div>
</template>

<script>
import {MemberNoFloor} from '../../api/community'
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
        group: -1,
        device: -1
      },
      groupList: []
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
        this.groupList = res.data
      })
    },
    // 获取设备
    getDeviceList (type) {
      switch (type) {
        case 'aio':
          this.selectType = 1
          break
        case 'camera':
          this.selectType = 2
          break
        default:
      }
    },
    selectBlur () {
      this.selectType = ''
    }
  },
  watch: {
    currentManage: {
      handler (val) {
        this.getGroupList()
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
