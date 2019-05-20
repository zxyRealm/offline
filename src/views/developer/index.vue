<template>
    <div class="developer-center clearfix">
        <div class="g-module-title">
            <h1 class="normal title g-inline">个人中心</h1>
        </div>
        <div class="user-info-wrap">
            <el-form
                    class="w-360"
                    ref="userInfoForm"
                    label-width="90px"
                    label-position="left"
                    :rules="rules"
                    :model="userInfoForm">
                <el-form-item label="头像">
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            accept="jpg/png"
                            :show-file-list="false"
                            :http-request="avatarUpload"
                            :before-upload="beforeAvatarUpload">
                        <div v-if="avatar" class="avatar vam">
                            <img :src="avatar" alt="">
                        </div>
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <p class="readonly__text" v-if="!!userInfo.phone">{{userInfoForm.phone}}</p>
                    <el-input
                            type="text"
                            v-show="!userInfo.phone"
                            placeholder="添加手机号"
                            v-model.trim="userInfoForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="phone">
                    <p class="readonly__text" v-if="!!userInfo.email">{{userInfoForm.email}}</p>
                    <el-input
                            type="text"
                            v-show="!userInfo.email"
                            placeholder="添加手机号"
                            v-model.trim="userInfoForm.email"></el-input>
                </el-form-item>
                <el-form-item label="公司名称：" prop="company">
                    <p class="readonly__text" v-if="!editable">{{userInfoForm.company}}</p>
                    <el-input type="text" v-show="editable" placeholder="添加公司名称"
                              v-model.trim="userInfoForm.company"></el-input>
                </el-form-item>
                <el-form-item label="地区：" prop="pca">
                    <area-select placeholder="选择商铺所在区域" :readonly="!editable"
                                 v-model.trim="userInfoForm.pca"></area-select>
                </el-form-item>
                {{userInfoForm.pca}}
                <el-form-item prop="address">
                    <p class="readonly__text" v-if="!editable">{{userInfoForm.address}}</p>
                    <el-input type="text" v-show="editable" placeholder="添加商户详细地址"
                              v-model.trim="userInfoForm.address"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contacts">
                    <p class="readonly__text" v-if="!editable">{{userInfoForm.contacts}}</p>
                    <el-input type="text" v-show="editable" placeholder="添加联系人"
                              v-model.trim="userInfoForm.contacts"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import area from '@/components/area-select/area-select'
    import { mapState, mapGetters } from 'vuex'
    import { validPhone, validateRule } from '@/utils/validate'
    import { OssSignature } from '../../api/common'
    import { UserCenterUpdate, SetUserImage } from '../../api/developer'
    import { fileTypeAllow } from '../../utils'
    import axios from 'axios'

    export default {
        components: {
            'area-select': area
        },
        name: 'index',
        data() {
            // 验证公司名称
            const validCompany = (rule, value, callback) => {
                if (value) {
                    if (value.length > 32) {
                        callback(new Error('请输入1-32位字符'))
                    } else if (validateRule(value, 1)) {
                        callback()
                    } else {
                        callback(new Error('仅限汉字/字母/数字/空格'))
                    }
                } else {
                    callback()
                }
            }
            // 验证地址选取
            const validDetail = (rule, value, callback) => {
                if (value) {
                    if (value.length > 128) {
                        callback(new Error('请输入1-128位字符'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            // 验证联系人
            const validContacts = (rule, value, callback) => {
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
                error: '',
                rules: {
                    company: [
                        { validator: validCompany, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请添加手机号', trigger: 'blur' },
                        { validator: validPhone, trigger: 'blur' }
                    ],
                    pca: [
                        { message: '选择商铺所在区域', trigger: 'blur' }
                    ],
                    address: [
                        { validator: validDetail, trigger: 'blur' }
                    ],
                    contacts: [
                        { validator: validContacts, trigger: 'blur' }
                    ]
                },
                userInfoForm: {
                    contacts: '', // 联系人
                    phone: '',
                    pca: '', // 省市区id
                    address: '', // 详细地址
                    company: ''
                },
                editable: true
            }
        },
        methods: {
            // 编辑修改个人信息
            submitForm(data) {
                let pcaArr = data.pca.split(',').map(Number)
                let type = this.userInfo.merchantGuid ? 'update' : 'create'
                if (type === 'update') data.merchantGuid = this.userInfo.merchantGuid
                data.provinceAreaID = pcaArr[0] || 0
                data.cityAreaID = pcaArr[1] || 0
                data.districtAreaID = pcaArr[2] || 0
                delete data.pca
                UserCenterUpdate(data).then(res => {
                    if (res.result) {
                        this.$tip('保存成功')
                        this.$store.dispatch('GET_USER_INFO').then(() => {
                            this.$router.push('/person/center')
                        })
                    }
                })
            },
            // 初始化个人信息格式，使其满足自定义组件参数要求
            initData() {
                for (let item in this.userInfoForm) {
                    if ((this.userInfo[item] || item === 'contacts') && item !== 'pca') {
                        this.$set(this.userInfoForm, item, this.userInfo[item])
                    }
                }
                this.userInfoForm.pca = this.userInfo.provinceAreaID ? this.userInfo.provinceAreaID + ',' + this.userInfo.cityAreaID + ',' + this.userInfo.districtAreaID : ''
                if (this.$route.name === 'personEdit') {
                    this.$nextTick(() => {
                        if (this.$refs.userInfoForm.$refs.submitForm) {
                            this.$refs.userInfoForm.$refs.submitForm.clearValidate()
                        }
                    })
                }
            },
            // 上传头像 (未完善信息也可以上传头像)
            avatarUpload(data) {
                let uid = this.userInfo.developerId
                // 获取阿里云oss signature
                OssSignature({ superKey: 'merchant' }).then(res => {
                    if (res.data) {
                        let formData = new FormData()
                        let customName = 'avatar_' + uid + '.' + (fileTypeAllow(data.file.name, 'png') ? 'png' : 'jpg')
                        formData.append('key', `merchant/${uid}/${customName}`)
                        formData.append('policy', res.data['policy'])
                        formData.append('OSSAccessKeyId', res.data['accessid'])
                        formData.append('success_action_status', '200')
                        formData.append('signature', res.data['signature'])
                        formData.append('file', data.file, customName)
                        // 构建formData 对象，将图片上传至阿里云oss服务
                        axios.post(res.data.host, formData).then(back => {
                            if (!back.data) {
                                let avatarHref = res.data.host + '/merchant/' + uid + '/' + customName
                                // 图片地址提交后台更新个人头像信息
                                SetUserImage({ faceImgURL: avatarHref }).then(() => {
                                    this.$tip('头像上传成功')
                                    this.$store.commit('SET_USER_INFO', { faceImgURL: avatarHref + '?time_stamp=' + new Date().getTime() })
                                })
                            } else {
                                this.$tip('上传失败，请稍后重试', 'error')
                            }
                        }).catch(() => {
                            this.$tip('网络异常，请稍后重新尝试', 'error')
                        })
                    }
                }).catch(() => {
                    this.$tip('服务器错误，请重新尝试')
                })
            },
            // 上传前图片格式校验
            beforeAvatarUpload(file) {
                if (!fileTypeAllow(file.name, 'jpeg,jpg,png')) {
                    this.$tip('上传头像图片只能是 JPG/PNG 格式!', 'error')
                    return false
                }
                if (file.size / 1024 / 1024 > 2) {
                    this.$tip('上传头像图片大小不能超过 2MB!', 'error')
                    return false
                }
            }
        },
        created() {
            if (this.$route.name !== 'personEdit') {
                if (!this.userInfo.company || !this.userInfo.phone) {
                    this.$router.push('/person/edit')
                }
                this.editable = false
            }
            this.initData()
        },
        watch: {
            '$route': function (val) {
                if (!this.userInfo.company || !this.userInfo.phone) {
                    this.$router.push('/person/edit')
                    this.editable = false
                }
                if (val.name === 'personEdit') {
                    this.editable = true
                } else {
                    // 路由变化时清除校验表单校验结果
                    this.editable = false
                }
                this.initData()
                this.$nextTick(() => {
                    this.$refs.userInfoForm.$refs.submitForm.clearValidate()
                })
            },
            'userInfo': {
                handler() {
                    this.initData()
                },
                deep: true
            }
        },
        computed: {
            ...mapState([
                'userInfo',
                'loading'
            ]),
            ...mapGetters(['avatar'])
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .user-info-wrap {
        padding: 40px 50px;
        .w-360{
            width: 360px;
        }
        .avatar-uploader {
            /deep/.el-upload.el-upload--text {
                width: 280px;
                height: 128px;
                border: 1px solid $gray-border-color;
                .avatar{
                    height: 100%;
                    width: 100%;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }
    }
</style>

