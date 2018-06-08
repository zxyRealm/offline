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
        @handel-submit="handelCallbackInfo"
        v-model="callbackForm">
        <el-form-item label="类型：" prop="type">
          <el-input type="text" :readonly="!editable" placeholder="请选取类型" v-model="callbackForm.type"></el-input>
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
  export default {
    name: "notify",
    data() {
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
            {required:true,message:'请填写回调地址',trigger:'blur'}
          ],
          intro:[
            {required:true,message:'请填写描述',trigger:'blur'}
          ]
        },
        callbackForm: {
          type: '',
          tokenURL: '',
          intro: ''
        },
        editable: true
      }
    },
    methods: {
      handelCallbackInfo(data) {
        console.log(data)
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
