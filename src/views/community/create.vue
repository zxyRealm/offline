<template>
  <div class="community__create--wrap">
    <h3 class="community-title">
      <span class="el-icon-arrow-left"></span>{{moduleHeader.title}}
    </h3>
    <el-form
      slot="form"
      ref="addCommunityForm"
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
        <el-input type="text" placeholder="请输入联系人"
                  v-model.trim="communityForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input type="text" placeholder="请输入联系电话"
                  v-model.trim="communityForm.phone"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AreaSelect from '@/components/area-select/area-select'
import { validateRule } from '../../utils/validate'

export default {
  name: 'CreateCommunity',
  components: {
    AreaSelect
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          CheckNameExist({name: value}).then(res => {
            !res.data ? callback() : callback(new Error('社群名称已存在'))
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    const validateContact = (rule, value, callback) => {
      if (value) {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 1)) {
          callback()
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      } else {
        callback()
      }
    }
    return {
      communityForm: {},
      communityRules: {}
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    moduleType () {
      return this.$route.name
    },
    moduleHeader () {
      let head = {}
      let text = ''
      if (this.$route.name.indexOf('create') > -1) {
        text = '创建'
      } else if (this.$route.name.indexOf('edit') > -1) {
        text = '编辑'
      }
      switch (this.moduleType.replace(/create|edit/, '')) {
        case 'Market':
          head = {
            title: `${text}商场`
          }
          break
        case 'Chain':
          head = {
            title: `${text}连锁总店`
          }
          break
        case 'Store':
          head = {
            title: `${text}单个门店`
          }
          break
      }
      return head
    }
  },
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  .community__create--wrap {
    padding: 0 30px;
    box-sizing: content-box;
  }

  .community-title {
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