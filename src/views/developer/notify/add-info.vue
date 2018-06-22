<template>
  <div class="notify-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <div class="notify-form-wrap vam">
      <uu-form
        ref="callbackInfoForm"
        subText="保存"
        form-class="callback-info-form"
        :rules="rules"
        width="306px"
        label-width="84px"
        :readonly="!editable"
        @handle-submit="handelCallbackInfo"
        v-model="callbackForm">
        <el-form-item label="类型：" prop="type">
          <el-select v-model="callbackForm.type" placeholder="请选取类型">
            <el-option value="1" label="到店通知">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调地址：" prop="tokenURL">
          <el-input type="text" :readonly="!editable" placeholder="请输入回调地址" v-model="callbackForm.tokenURL"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="intro">
          <el-input type="textarea" :readonly="!editable" v-model="callbackForm.intro"
                    placeholder="旗舰店顾客到店描述"></el-input>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
  import { validateURL } from '@/utils/validate'
  export default {
    name: "notify",
    data() {
      const validateUrl =(rule,value,callback)=>{
        if(!value){
          callback(new Error("请填写回调地址"))
        }else {
          if(validateURL(value)){
            callback()
          }else {
            callback(new Error("回调地址不合法"))
          }
        }
      };
      return {
        menu: [
          {title: '消息通知', index: '/developer/notify'},
          {title: '开放API', index: '/developer/api'}
        ],
        rules: {
          type:[
            {required:true,message:'请选取类型',trigger:'blur'}
          ],
          tokenURL:[
            {required:true,validator:validateUrl,trigger:'blur'}
          ],
          intro:[
            {required:true,message:'请填写描述',trigger:'blur'}
          ]
        },
        callbackForm: {
          type: '1',
          tokenURL: '',
          intro: ''
        },
        editable: true
      }
    },
    methods: {
      handelCallbackInfo(data) {
        const type = this.$route.name==='addNotifyCallback'?'create':'update';
        this.$http("/dataNotice/"+type,data).then(res=>{
          if(res.result){
            if(type==='create'){
              this.$tip("创建成功");
            }else{
              this.$tip("编辑成功")
            }
            this.$router.push("/developer/notify")
          }
          console.log(res)
        })
      },
      getCallbackInfo(){
        this.$http("/dataNotice/getInfo",{noticeGuid:this.$route.params.id}).then(res=>{
         this.callbackForm = res.data
        })
      }
    },
    mounted(){
      if(this.$route.name==='editNotifyCallback'){
        this.getCallbackInfo()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notify-wrap {
    height: 100%;
    .notify-form-wrap {
      height:520px;
      width: 690px;
      margin: 0 auto;
      background: rgba(1,8,20,0.10);
      border: 1px dashed rgba(151,151,151,0.10);
    }
  }

</style>
