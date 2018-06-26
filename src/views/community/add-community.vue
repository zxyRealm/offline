<template>
  <div class="edit-community-wrap">
    <uu-sub-tab
      back
      :menu-array="[{title:menuTitle}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border">
      <uu-form
        label-width="106px"
        :sub-text="subText"
        @handle-submit="submitForm"
        :readonly="!editable"
        v-model="communityForm"
        :rules="editable?rules:{}"
      >
        <el-form-item label="社群名称：" prop="name">
          <el-input type="text" :readonly="!editable" placeholder="请输入社群名称"
                    v-model="communityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="社群码：" prop="code">
          <input type="hidden" v-model="communityForm.code"></input>
          <div class="qr-code-wrap">
            <template v-if="communityForm.code">
              <div id="community-qrcode"></div>
              <div>{{communityForm.code}}</div>
            </template>
            <a href="javascript:void (0)" @click="getQrCode" v-else>获取社群二维码</a>
          </div>
        </el-form-item>
        <el-form-item label="地区：" prop="pca">
          <area-select :readonly="!editable" v-model="communityForm.pca"></area-select>
        </el-form-item>
        <el-form-item prop="address">
          <el-input type="text" :readonly="!editable" placeholder="请输入详细地址" v-model="communityForm.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input type="text" :readonly="!editable" placeholder="请输入联系人" v-model="communityForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input type="text" :readonly="!editable" placeholder="请输入联系电话" v-model="communityForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="搜索范围：" prop="rule">
          <p class="fcg">（要求子社群授予的设备权限
            <el-popover
              placement="top"
              width="268"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <div class="fs12">
                1.数据查看权限：查看社群设备的数据分析图表。<br>
                2.设备操作权限：对子社群设备进行关闭、开启
                、升级等操作。
              </div>
              <i slot="reference" class="el-icon-question"></i>
            </el-popover>
            ,可多选）</p>
          <el-checkbox-group v-model="communityForm.rule">
            <el-checkbox disabled :label="1">数据查看权限</el-checkbox>
            <el-checkbox :label="2">数据查看权限</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
  import area from '@/components/area-select/area-select'
  import QRCode from 'qrcodejs2'

  export default {
    components: {
      'area-select': area
    },
    name: "add-community",
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请填写社群名称'))
        } else {
          if (value.length >= 2 && value.length <= 18) {
            callback()
            // this.$http("").then(res=>{
            //
            // })
          } else {
            callback(new Error("长度为2-18个字符"))
          }
        }
      };
      return {
        editable: true,
        communityForm: {
          name:'',
          code: '',
          contact: '',
          phone: '',
          pca: '',
          address: '',
          rule: [1]
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请获取社群码', trigger: 'blur'}
          ],
          pca: [
            {required: true, message: '请选取省市区', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ],
          rule: [
            {required: true, message: '请选取权限范围', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getQrCode(){
        this.$http("/group/code").then(res => {
          if (res.data) {
            this.communityForm.code = res.data;
            // this.$nextTick(()=>{
              this.createQrCode(res.data,'community-qrcode')
            // })
          }
        });
      },
      submitForm(data) {
        let address = data.pca.split(',').map(Number);
        data.provinceAreaID = address[0];
        data.cityAreaID = address[1];
        data.districtAreaID = address[2];
        data.rule = data.rule.toString();
        console.log(data);
        this.$http(`/group/${this.type}`,data).then(res=>{
          if(this.$route.name==='createCommunity'){
            this.$tip("创建成功");
            this.$router.push("/community/mine")
          }else {
            this.$tip("信息修改成功")
          }
        })
      },
      createQrCode(url,id){
        this.$nextTick(()=>{
          const qrCode = new QRCode(id, {
            width: 74,
            height: 74,
            colorDark: "#000000",
            correctLevel: QRCode.CorrectLevel.H
          });
          qrCode.makeCode(url)
        })
      },
      getCommunityInfo(){
        this.$http("/group/getInfo",{guid:this.$route.params.gid}).then(res=>{
          res.data.pca = `${res.data.provinceAreaID},${res.data.cityAreaID},${res.data.districtAreaID}`;
          res.data.rule = (res.data.rule || '1').split(",").map(Number);
          this.communityForm = res.data;
          console.log(this.communityForm);
          this.$createQRCode(res.data.code,'community-qrcode')
        })
      }
    },
    created(){
      if(this.$route.name==='editCommunity'){
        this.getCommunityInfo()
      }
    },
    computed:{
      menuTitle:function(){
        return this.$route.name==='editCommunity'?"编辑社群信息":"创建社群"
      },
      subText:function () {
        return this.$route.name==='editCommunity'?"保存":"创建"
      },
      type:function(){
        return this.$route.name==='editCommunity'?"update":"create"
      }
    }
  }
</script>

<style lang="scss">
  .community-common-form-wrap{
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
