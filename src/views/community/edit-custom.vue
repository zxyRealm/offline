<template>
  <div class="edit-custom-wrap">
    <uu-sub-tab
      back
      :menu-array="[{title:tabTitle}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border vam">
      <uu-form
        formClass="error266"
        label-width="84px"
        :sub-text="subText"
        @handle-submit="submitForm"
        :readonly="!editable"
        v-model="customForm"
        :rules="editable?rules:{}"
      >
        <el-form-item label="分组名称：" prop="name">
          <el-input
            type="text"
            :readonly="!editable"
            placeholder="请输入分组名称"
            v-model="customForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分组类型：" prop="type">
          <el-radio-group class="custom-checkbox-group" v-model="customForm.type">
            <el-radio custom-type="address" :label="1">地理位置</el-radio>
            <el-radio custom-type="action" :label="2">功能区</el-radio>
            <el-radio custom-type="manage" :label="3">管理组</el-radio>
            <el-radio custom-type="more" :label="4">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分组描述：" prop="des">
          <el-input type="textarea" :readonly="!editable" placeholder="请输入社群描述" v-model="customForm.des"></el-input>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit-custom",
    data(){
      const  validateName = (rule,value,callback)=>{
        if(!value){
          callback(new Error("请填写分组名称"))
        }else {
          if(value.length>=2&&value.length<=18){
            callback()
          }else {
            callback(new Error('长度为2-18个字符'))
          }
        }
      };
      return {
        editable:true,
        customForm:{
          name:'',
          type:'',
          des:''
        },
        rules:{
          name:[
            {required:true,validator:validateName,trigger:'blur'}
          ],
          type:[
            {required:true,message:'请选取类型',trigger:'blur'}
          ],
          des:[
            {required:true,message:'请填写描述',trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      submitForm(data){
        console.log(data)
        // this.$http("",data).then(res=>{
        //   if(this.type==='create'){
        //     this.$tip('创建成功')
        //   }else {
        //     this.$tip("更新成功")
        //   }
        // })
      }
    },
    computed: {
      tabTitle: function () {
        return this.$route.name === 'editCustom' ? '编辑社群分组' : '新建分组'
      },
      subText:function(){
        return this.$route.name ==='editCustom'?'保存':'新建'
      },
      type:function () {
        return this.$route.name ==='editCustom'?'update':'create'
      }
    }
  }
</script>

<style lang="scss" scoped>
.edit-custom-from-wrap{
  margin: 0 auto;
  height: 520px;
  width: 690px;
  padding: 40px 0;
  box-sizing: border-box;
  .el-radio+.el-radio{
    &[custom-type]{
      margin-left:10px;
    }
  }
}
</style>
