<template>
  <div class="edit-community-wrap g-prl20">
    <uu-sub-tab
      back
      :menu-array="[{title:menuTitle}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border mt18">
      <uu-form
        label-width="106px"
        sub-text="保存"
        @handle-submit="submitForm"
        v-model="communityForm"
        :rules="rules"
      >
        <el-form-item label="社群名称：" prop="name">
          <el-input type="text" placeholder="请输入社群名称"
                    v-model.trim="communityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区：" prop="pca">
          <area-select placeholder="请选择地区" v-model="communityForm.pca"></area-select>
        </el-form-item>
        <el-form-item prop="address">
          <el-input type="text" placeholder="请输入详细地址"
                    v-model.trim="communityForm.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input type="text" placeholder="请输入联系人"
                    v-model.trim="communityForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input type="text" placeholder="11位手机号"
                    v-model.trim="communityForm.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="communityMore.role === 0" label="索权范围：" prop="rule">
          <el-checkbox-group class="g-pt10" v-model="communityForm.rule">
            <div>
              <el-checkbox :disabled="type==='update'" :label="1">设备操作权限
                <p class="form__item--des">查看应用层社群的客流数据（必选项）</p>
              </el-checkbox>
            </div>
            <div>
              <el-checkbox disabled :label="0">数据查看权限
                <p class="form__item--des">对应用层社群的设备进行添加、升级等所有操作</p>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <p class="form__item--des g-pl106">备注：带有" * "标记的标签为必填内容。</p>
      </uu-form>
    </div>
  </div>
</template>

<script>
import area from '@/components/area-select/area-select'
import QRCode from 'qrcodejs2'
import {validateRule} from '@/utils/validate'

export default {
  components: {
    'area-select': area
  },
  name: 'add-community',
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入社群名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          if (this.type === 'update' && this.originName === value) {
            callback()
          } else {
            this.$http('/group/name/exist', {name: value}, false).then(res => {
              !res.data ? callback() : callback(new Error('社群名称已存在'))
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            })
          }
        } else {
          callback(new Error('请输入正确的社群名称'))
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
          callback(new Error('请输入正确的联系人'))
        }
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (validateRule(value, 6)) {
          callback()
        } else {
          callback(new Error('请输入正确的联系电话'))
        }
      } else {
        callback()
      }
    }
    return {
      originName: '',
      communityForm: {
        name: '',
        code: '',
        contact: '',
        phone: '',
        pca: '',
        address: '',
        rule: [0]
      },
      rules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请获取社群邀请码', trigger: 'blur'}
        ],
        pca: [
          {message: '请选择省市区', trigger: 'blur'}
        ],
        address: [
          {message: '请输入详细地址', trigger: 'blur'},
          {max: 128, message: '请输入1-128位字符', trigger: 'blur'}
        ],
        contact: [
          {validator: validateContact, trigger: 'blur'}
        ],
        rule: [
          {type: 'array', message: '请选择索权范围', trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取社群邀请码
    getQrCode () {
      this.$http('/group/code').then(res => {
        if (res.data) {
          this.communityForm.code = res.data
        }
      })
    },
    // 创建社群或编辑社群信息
    submitForm (data) {
      console.log(data)
      let address = data.pca.split(',').map(Number)
      let url = `/group/${this.type}`
      if (this.$route.query.pid) {
        url = `/group/create/subGroup`
        data.groupPid = this.$route.query.pid
      }
      data.provinceAreaID = address[0] || 0
      data.cityAreaID = address[1] || 0
      data.districtAreaID = address[2] || 0
      data.rule = data.rule.toString()
      data.type = data.type || this.communityMore.type
      data.role = data.role || this.communityMore.role
      this.$http(url, data).then(res => {
        this.$tip('操作成功')
        this.$router.push('/community/mine')
      })
      // if (data.role === 0) {
      //   this.$http('/group/code').then(res => {
      //     if (res.data) {
      //       data.code = res.data
      //       this.$http(url, data).then(res => {
      //         this.$tip('操作成功')
      //         this.$router.push('/community/mine')
      //       })
      //     }
      //   })
      // } else {
      // }
    },
    /*
    * 生成社群码的二维码
    * @params url 生成二维码的链接
    * @params id 显示二维码元素id名
    * @author 张晓元 2018.08.14
    * */
    createQrCode (url, id) {
      this.$nextTick(() => {
        const qrCode = new QRCode(id, {
          width: 74,
          height: 74,
          colorDark: '#000000',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrCode.makeCode(url)
      })
    },
    // 获取社群信息
    getCommunityInfo () {
      this.$http('/group/getInfo', {guid: this.$route.params.gid}).then(res => {
        res.data.pca = `${res.data.provinceAreaID},${res.data.cityAreaID},${res.data.districtAreaID}`
        res.data.rule = (res.data.rule || '1').split(',').map(Number)
        this.originName = JSON.parse(JSON.stringify(res.data.name))
        this.communityForm = res.data
      })
    }
  },
  created () {
    console.log(this.$route.name)
    if (this.$route.name === 'editCommunity') {
      this.getCommunityInfo()
    }
  },
  computed: {
    // 页面面包屑标题
    menuTitle: function () {
      let txt = '社群管理&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'
      switch (this.$route.name) {
        case 'editCommunity':
          txt += '编辑管理层社群'
          break
        case 'createCommunity':
          txt += '新建管理层社群'
          break
        case 'editApplyCommunity':
          txt += '编辑子社群'
          break
        case 'editSingleCommunity':
          txt += '编辑单店社群'
          break
        case 'singleCommunity':
          txt += '编辑单店社群'
          break
        default:
          txt += '新建子社群'
      }
      return txt
    },
    // 编辑/创建
    type: function () {
      return (this.$route.name === 'editCommunity' || this.$route.name === 'editApplyCommunity' || this.$route.name === 'editSingleCommunity') ? 'update' : 'create'
    },
    // 社区类型 管理/应用
    communityMore () {
      let type, role
      switch (this.$route.name) {
        case 'editApplyCommunity':
          type = 1
          role = 1
          break
        case 'applyCommunity':
          type = 1
          role = 1
          break
        case 'editCommunity':
          type = 1
          role = 0
          break
        case 'createCommunity':
          type = 1
          role = 0
          break
        case 'editSingleCommunity':
          type = 3
          role = 1
          break
        case 'singleCommunity':
          type = 3
          role = 1
          break
      }
      return {type: type, role: role}
    }
  }
}
</script>

<style lang="scss">
  .community-common-form-wrap {
    .qr-code-wrap {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      > div {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
      }
      #community-qrcode {
        width: 84px;
        height: 84px;
        background: #fff;
        padding: 5px;
        margin-right: 6px;
      }
    }
    .qr-code-wrap {
      height: 120px;
      text-align: center;
      line-height: 120px;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
</style>
