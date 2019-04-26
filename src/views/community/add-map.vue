<template>
  <div class="add-map--wrap">
    <h3 class="form-title">
      <span class="el-icon-arrow-left" @click="$backPrev"></span>添加楼层地图
    </h3>
    <el-form
      ref="mapForm"
      block-message
      style="width: 380px"
      label-position="left"
      class="common-form white"
      label-width="82px"
      :model="communityForm"
      :rules="communityRules"
    >
      <el-form-item label="名称：" prop="name">
        <el-input placeholder="请输入社群名称" v-model.trim="communityForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地区：" prop="pca">
        <area-select placeholder="请选择地区" v-model="communityForm.pca"></area-select>
      </el-form-item>
      <el-form-item
        :rules="[
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
          ]"
        prop="address">
        <el-input
          type="text"
          placeholder="请输入详细地址"
          v-model.trim="communityForm.address"></el-input>
      </el-form-item>
      <!--<el-form-item label="楼层：" prop="floorList">-->
      <!--<floor-select v-model.trim="communityForm.floorList"></floor-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="map">-->
      <!--<div class="label__list&#45;&#45;wrap" v-if="communityForm.floorList.length">-->
      <!--<el-scrollbar>-->
      <!--<div class="clearfix">-->
      <!--<div class="label__item-wrap" v-for="(item, $index) in labelList" :key="$index">-->
      <!--<i class="el-icon-close" @click.stop="deleteLabel($index)"></i>-->
      <!--<label :for="'map__input&#45;&#45;file' + $index" class="label&#45;&#45;item">-->
      <!--<input-->
      <!--type="file" class="input__file" @change.stop="onChange($event, $index)"-->
      <!--:id="'map__input&#45;&#45;file' + $index">-->
      <!--<i v-if="!item.file" class="el-icon-plus"></i>-->
      <!--<span v-else class="ellipsis">{{item.file ? item.file.name : ''}}</span>-->
      <!--</label>-->
      <!--<p>{{item.floor | IntToFloor}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-scrollbar>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item label="联系人：" prop="contact">
        <el-input
          type="text" placeholder="请输入联系人"
          v-model.trim="communityForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input
          type="text" placeholder="请输入联系电话"
          v-model.trim="communityForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm">{{head.type === 'chain' ? '保存' : '下一步'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddMap',
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  .form-title {
    height: 56px;
    line-height: 56px;
    margin-bottom: 35px;
    font-size: 22px;
    .el-icon-arrow-left {
      font-weight: bold;
      vertical-align: 0;
    }
  }
</style>