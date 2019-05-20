<template>
  <div class="analyse__content--wrap g-prl20">
    <div class="tab__container">
      <a href="javascript:;" @click="checkStatus(0)" :class="{'active': !status}">库内人员</a>
      <a href="javascript:;" @click="checkStatus(1)"  :class="{'active': status}">陌生人</a>
    </div>
    <div v-if="!status">
      <div class="select__container clearfix">
        <div style="float: left; width: 90%">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
            style="width: 268px; margin-right: 20px;margin-bottom:16px"
          >
            <el-select v-model="select2" slot="prepend" placeholder="请选择" style="width:100px">
              <el-option label="姓名" value="1"></el-option>
            </el-select>
          </el-input>

          <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择性别"
            style="width:168px;margin-right: 20px;margin-bottom:16px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择人员库"
            style="width:168px;margin-right: 20px;margin-bottom:16px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-select
            value-key="guid"
            @visible-change="visibleChange"
            style="margin-right: 20px;"
            popper-class="select__popper--wrap theme__popper--wrap"
            v-model="filter.group"
          >
            <el-input
              :clearable="true"
              @clear="showAllList"
              @keyup.enter.native="filterName('group')"
              placeholder="快速查找社群"
              class="select__search"
              v-model.trim="search.group"
            >
              <i slot="prefix" @click="filterName('group')" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-option :value="0" label="全部社群"></el-option>
            <el-option
              v-for="(item, $index) in groupList"
              :value="item.guid"
              :key="$index"
              :label="item.name"
            ></el-option>
          </el-select>

          <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择出入口"
            style="width:168px;margin-right: 20px;margin-bottom:16px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择通道"
            style="width:168px;margin-right: 20px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-date-picker
            style="width: 280px"
            v-model="filter.date"
            :clearable="true"
            type="daterange"
            range-separator="-"
            popper-class="date__popper--wrap theme__popper--wrap"
            value-format="yyyy-MM-dd"
            format="yyyy/MM/dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div style="float: left; width: 10%">
          <a
            href="javascript:void (0)"
            @click="getBehaviorList()"
            class="g-fr"
            style="margin-top: 7px"
          >刷新</a>
        </div>
      </div>
      <el-scrollbar v-scroll-top="pagination.index" class="table__scrollbar">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="age" label="手机号"></el-table-column>
          <el-table-column prop="age" label="近一周到访"></el-table-column>
          <el-table-column prop="age" label="近一月到访"></el-table-column>
          <el-table-column prop="age" label="会员库"></el-table-column>
          <el-table-column prop="age" label="最近到访时间"></el-table-column>
          <el-table-column prop="age" label="操作"></el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div v-if="status">
      <div class="select__container clearfix">
        <div style="float: left; width: 90%">
           <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择出入口"
            style="width:168px;margin-right: 20px;margin-bottom:16px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-select
            v-model="select2"
            slot="prepend"
            placeholder="请选择性别"
            style="width:168px;margin-right: 20px;margin-bottom:16px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

          <el-date-picker
            style="width: 280px"
            v-model="filter.date"
            :clearable="true"
            type="daterange"
            range-separator="-"
            popper-class="date__popper--wrap theme__popper--wrap"
            value-format="yyyy-MM-dd"
            format="yyyy/MM/dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div style="float: left; width: 10%">
          <a
            href="javascript:void (0)"
            @click="getBehaviorList()"
            class="g-fr"
            style="margin-top: 7px"
          >刷新</a>
        </div>
      </div>
      <el-scrollbar v-scroll-top="pagination.index" class="table__scrollbar">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="photo" label="抓拍照片"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="age" label="近一周到访"></el-table-column>
          <el-table-column prop="age" label="近一月到访"></el-table-column>
          <el-table-column prop="age" label="最近到访时间"></el-table-column>
          <el-table-column prop="age" label="操作"></el-table-column>
        </el-table>
      </el-scrollbar>
    </div>

    <el-pagination
      v-if="pagination.total && pagination.total > pagination.length"
      @current-change="getBehaviorList"
      @size-change="sizeChange"
      :page-sizes="[10, 20, 30]"
      :current-page="pagination.index"
      :page-size="pagination.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
    <image-preview :src="preview.src" :visible.sync="preview.visible"></image-preview>
  </div>
</template>

<script>
import { MemberNoFloor } from "../../api/community";
import { GetGroupAioList, GetGroupCameraList } from "../../api/device";
import { GetBehaviorList } from "../../api/behavior";

import { mapState } from "vuex";

export default {
  name: "analyse",
  data() {
    return {
      status: 0,
      emptyText: "数据加载中...", // table 数据未加载是提示信息
      preview: {
        visible: false,
        src: ""
      },
      selectType: "",
      input3: "",
      select2: "",
      search: {
        group: "",
        device: ""
      },
      filter: {
        date: "",
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
    };
  },
  created() {
    this.getGroupList();
    this.getBehaviorList();
  },
  mounted() {},
  computed: {
    ...mapState(["currentManage", "aliveState"])
  },
  methods: {
    // 获取当前管理社群下所有子社群
    getGroupList() {
      if (!this.currentManage.groupGuid) return;
      MemberNoFloor({ groupId: this.currentManage.groupGuid }).then(res => {
        let list = res.data.filter(item => item.coordinates);
        this.groupList = list;
        this.groupOriginList = list;
      });
    },
    // 获取设备 (一体机、摄像头)
    getDeviceList(type) {
      switch (type) {
        case "aio":
          if (this.selectType === 1) return;
          this.selectType = 1;
          this.search.device = "";
          GetGroupAioList({ groupGuid: this.currentManage.groupGuid }).then(
            res => {
              this.deviceOriginList = res.data;
              this.deviceList = res.data;
            }
          );
          break;
        case "camera":
          if (this.selectType === 2) return;
          this.selectType = 2;
          this.search.device = "";
          GetGroupCameraList({ groupGuid: this.currentManage.groupGuid }).then(
            res => {
              this.deviceOriginList = res.data;
              this.deviceList = res.data;
            }
          );
          break;
        default:
      }
    },
    checkStatus (val) {
      this.status = val
    },
    visibleChange() {
      this.selectType = "";
      this.search = {
        group: "",
        device: ""
      };
      setTimeout(() => {
        this.groupList = this.groupOriginList;
        this.deviceList = this.deviceOriginList;
      }, 100);
    },
    sizeChange(val) {
      this.pagination.length = val;
      this.getBehaviorList();
    },
    // 获取行为分析信息列表
    getBehaviorList(page, size) {
      if (!this.currentManage.groupGuid) return;
      let [startT, endT] = ["", ""];
      if (this.filter.date) {
        // clearable方法 会使date为null
        startT = this.filter.date[0] + " 00:00:00";
        endT = this.filter.date[1] + " 23:59:59";
      }
      page = this.$route.meta.keepAlive
        ? this.aliveState.index
        : page || this.pagination.index || 1;
      this.emptyText = "数据加载中...";
      GetBehaviorList({
        startTime: startT,
        endTime: endT,
        groupSonGuid: this.filter.group || "",
        deviceKey: this.filter.device || "",
        groupGuid: this.currentManage.groupGuid,
        length: size || this.pagination.length || 10,
        index: page
      })
        .then(res => {
          this.$route.meta.keepAlive = false;
          this.emptyText = "暂无数据";
          this.pagination = res.data.pagination;
          this.behaviorList = res.data.content;
        })
        .catch(() => {
          this.emptyText = "数据请求失败";
          this.$route.meta.keepAlive = false;
        });
    },
    // 通过名称搜索社群或者设备
    filterName(type) {
      switch (type) {
        case "group":
          this.groupList = this.groupOriginList.filter(
            item =>
              item.name.indexOf(this.search.group) > -1 ||
              item.nickName.indexOf(this.search.group) > -1
          );
          break;
        case "device":
          this.deviceList = this.deviceOriginList.filter(
            item => item.deviceName.indexOf(this.search.device) > -1
          );
          break;
      }
    },
    // 清除搜索内容
    showAllList() {
      this.groupList = this.groupOriginList;
      this.deviceList = this.deviceOriginList;
    },
    // 查看抓拍大图
    showImage(row) {
      this.preview.src = row.imageUrl;
      this.preview.visible = true;
    }
  },
  watch: {
    currentManage: {
      handler() {
        this.getGroupList();
        this.getBehaviorList();
      },
      deep: true
    },
    filter: {
      handler() {
        this.getBehaviorList(1);
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.$store.commit("SET_ALIVE_STATE", this.pagination);
  }
};
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

.tab__container {
  padding-top: 20px;
  a {
    font-size: 16px;
    color: #555555;
    line-height: 16px;
    height: 25px;
    text-align: center;
    display: inline-block;
    width: 85px;
  }
  a.active {
    border-bottom: 2px solid #0b7ef9;
    color: #0b7ef9;
  }
}

.select__container {
  padding: 16px 0 12px;
  // /deep/.el-select .el-input {
  //   width: 100px;
  // }
  /deep/.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .behavior__select {
    width: 154px;
    margin-right: 20px;
  }
  .date--picker {
    width: 220px;
  }
}
</style>
