<template>
  <el-dialog
    width="560px"
    :visible.sync="showDialog"
    :title="dialogTitle">
    <el-form
      ref="communityForm"
      class="g-form-center"
      style="width: 380px"
      label-position="left"
      label-width="82px"
      :model="communityForm"
      :rules="communityRules">
      <el-form-item label="名称" prop="name">
        <el-input
          placeholder="请输入社群名称"
          v-model.trim="communityForm.name"
          :disabled="actionType === 'audit'"></el-input>
      </el-form-item>

      <!------------------------  备注名 --------------------->
      <el-form-item
        v-if="actionType === 'audit'"
        label="备注名"
        prop="nickName">
        <el-input
          placeholder="请输入备注名"
          v-model.trim="communityForm.nickName"></el-input>
      </el-form-item>

      <!-------------------  商场管理员下成员选取业态   -------------------->
      <el-form-item
        v-if="hasIndustry"
        label="业态"
        prop="industryIndex">
        <el-select v-model="communityForm.industryIndex">
          <el-option
            v-for="(i,$index) in industryList"
            :key="$index"
            :value="$index"
            :label="i.industryName"></el-option>
        </el-select>
      </el-form-item>

      <!-------------------  地区地址 仅管理社群包含此信息 ------------------------------->
      <template v-if="hasAddress">
        <el-form-item
          label="地区"
          prop="pca">
          <area-select
            placeholder="请选择地区"
            v-model="communityForm.pca">
          </area-select>
        </el-form-item>
        <el-form-item
          prop="address">
          <el-input
            type="text"
            placeholder="请输入详细地址"
            v-model.trim="communityForm.address"></el-input>
        </el-form-item>
      </template>
      <!------------------------  楼层及位置选取  ---------------------------->

      <template v-if="hasFloor">
        <el-form-item
          label="楼层"
          prop="floorIndex">
          <el-select v-model="communityForm.floorIndex">
            <el-option
              v-for="(f, index) in floorList"
              :key="index"
              :value="f.floorIndex"
              :label="f.floorName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="communityForm.floorIndex || communityForm.floorIndex === 0">
          <div class="map--wrap">

            <!--  成员位置绑定  -->

          </div>
        </el-form-item>
      </template>


      <!--编辑修改外来加入成员时无以下信息-->
      <template v-if="type !== 'join' && actionType !== 'audit'">
        <el-form-item label="联系人" prop="contacts">
          <el-input
            type="text" placeholder="请输入联系人"
            v-model.trim="communityForm.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            type="text" placeholder="请输入联系电话"
            v-model.trim="communityForm.phone"></el-input>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submitForm">{{confirmButtonText}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { validateRule, validPhone, validateContact } from '@/utils/validate'
import {
  getManageMember,
  getIndustryList,
  addMember,
  updateMemberInfo,
  getAcceptAuditing,
  getMemberNameIsExist
} from '@/api/community'

export default {
  name: 'member-dialog',
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      default: 'add'
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    const validateCommunityName = (rule, value, callback) => {
      const params = {
        name: value,
        groupGuid: this.currentManage.groupGuid
      }
      if (!value) {
        callback(new Error('请输入名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          if (this.actionType === 'edit' && this.originName === value) {
            callback()
          } else {
            getMemberNameIsExist(params).then((res) => {
              !res.data ? callback() : callback(new Error('社群名称已存在'))
            }).catch((err) => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('仅限汉字/字母/数字/下划线/空格'))
        }
      }
    }
    return {
      showDialog: false,
      originName: '',
      communityForm: {
        industryIndex: null,
        nickName: '',
        name: '',
        pca: '',
        address: '',
        contacts: '',
        phone: '',
        floorIndex: null,
        coordinates: []
      },
      communityRules: {
        name: [
          { required: true, validator: validateCommunityName, trigger: 'blur' }
        ],
        nickName: [
          { validator: validateCommunityName, trigger: 'blur' }
        ],
        pca: [
          { required: true, message: '请选取地区', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { max: 128, message: '请输入1-128位字符', trigger: 'blur' }
        ],
        contacts: [
          { validator: validateContact, trigger: 'blur' }
        ],
        phone: [
          { validator: validPhone, trigger: 'blur' }
        ],
        industryIndex: [
          { required: true, message: '请选择业态', trigger: 'blur' }
        ],
        floorIndex: [
          { required: true, message: '请选择楼层', trigger: 'blur' }
        ]
      },
      floorList: [ // 楼层列表
        { floorName: 'F1', floorIndex: 1 }
      ],
      industryList: [] // 业态列表
    }
  },
  computed: {
    ...mapState(['currentManage']),
    dialogTitle () {
      let title = ''
      switch (this.actionType) {
        case 'add':
          title = '添加成员'
          break
        case 'edit':
          title = '编辑社群'
          break
        case 'audit':
          title = '通过审核'
          break
      }
      return title
    },
    confirmButtonText () {
      let btnText = '确定'
      switch (this.actionType) {
        case 'add':
          btnText = '添加'
          break
        case 'edit':
          btnText = '保存'
          break
        case 'audit':
          btnText = '通过'
          break
      }
      return btnText
    },
    hasAddress () {
      return this.currentManage.type === 3 || this.type === 'store'
    },
    hasFloor () {
      return this.currentManage.type === 1
    },
    hasIndustry () {
      return this.currentManage.type === 1
    }
  },
  created () {
    this.showDialog = this.visible
    this.initData()
  },
  methods: {
    submitForm () {
      let apiMap = {
        add: addMember,
        edit: updateMemberInfo,
        audit: getAcceptAuditing
      }
      console.log('data----------', this.communityForm)
      this.$refs.communityForm.validate((valid) => {
        if (valid) {
          let {
            name, guid,
            floorIndex, industryIndex,
            pca, address, contacts, phone,
            coordinates
          } = { ...this.communityForm }
          let param = {
            name,
            groupGuid: this.currentManage.groupGuid,
            guid,
            contacts,
            phone,
            merchantGuid: this.$cookie().get('uuid')
          }
          if (this.hasAddress) {
            let pcaArray = pca.split(',')
            param = {
              ...param,
              provinceCode: pcaArray[0],
              cityCode: pcaArray[1],
              districtCode: pcaArray[2],
              address
            }
          }
          if (this.hasIndustry) {
            let list = this.industryList
            param = {
              ...param,
              industryId: list[industryIndex].industryId,
              industryName: list[industryIndex].industryName
            }
          }
          if (this.hasFloor) {
            param = {
              ...param,
              floorIndex,
              coordinates
            }
          }
          console.log('formdata', this.param)
          apiMap[this.actionType](param).then(() => {
            this.$emit('handle-success', { type: this.type, actionType: this.actionType })
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    handleCancel () {
      this.$emit('handle-cancel', this.type)
    },
    getIndustryList () {
      getIndustryList({ groupGuid: 'default' }).then(res => {
        this.industryList = res.data
        if (this.actionType === 'edit') this.industryList.forEach((item, index) => {
          if (item.industryId === this.communityForm.industryId) {
            this.$set(this.communityForm, 'industryIndex', index)
          }
        })
      })
    },
    getFloorList () {
      let param = {
        groupGuid: this.currentManage.groupGuid,
        type: 1
      }
      getManageMember(param).then(res => {
        this.floorList = res.data.map(item => {
          item.floorName = item.name
          return item
        })
      })
    },
    initData () {
      if (this.actionType === 'edit') {
        let modelData = JSON.parse(JSON.stringify(this.model))
        modelData.pca = modelData.provinceCode ? `${modelData.provinceCode},${modelData.cityCode},${modelData.districtCode}` : ''
        this.communityForm = modelData
        this.originName = JSON.parse(JSON.stringify(this.model.name || ''))
        console.log(this.communityForm)
      } else if (this.actionType === 'audit') {

      } else if (this.actionType === 'add') {
        this.communityForm = {
          industryIndex: null,
          nickName: '',
          name: '',
          pca: '',
          address: '',
          contacts: '',
          phone: '',
          floorIndex: null,
          coordinates: []
        }
      }
      if (this.hasFloor) {
        this.getFloorList()
      }
      if (this.hasIndustry) {
        this.getIndustryList()
      }
    }
  },
  watch: {
    visible (val) {
      this.showDialog = val
    },
    showDialog (val) {
      this.$emit('update:visible', val)
      if (!val) {
        this.$refs.communityForm.clearValidate()
      } else {
        this.initData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .map--wrap {
    height: 158px;
    /*width: ;*/
    border: 1px solid $gray-border-color;
  }
</style>