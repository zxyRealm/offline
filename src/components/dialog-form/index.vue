<template>
  <el-dialog
    center
    top="30%"
    class="dialog-form-wrapper"
    width="500px" :title="title" :visible.sync="dialogFormVisible">
    <el-form
      :style="{width:width}"
      label-position="left"
      class="common-form white"
      ref="dialogForm"
      :rules="rules"
      :model="dialogForm">
      <template v-if="type==='device'">
        <el-form-item label="设备序列号：" prop="deviceKey" :label-width="formLabelWidth">
          <el-input type="text" v-model="dialogForm.deviceKey" placeholder="请输入设备序列号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备别名：" prop="deviceAlias" :label-width="formLabelWidth">
          <el-input type="text" v-model="dialogForm.deviceAlias" placeholder="请输入设备别名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="dialogForm.type" disabled size="small">
            <el-radio-button label="分析终端"></el-radio-button>
            <el-radio-button label="客行分析一体机"></el-radio-button>
            <el-radio-button label="身份识别一体机"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <template v-if="type==='community'">
        <el-form-item label="选择社群：" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.region" placeholder="请选择社群">
            <el-option v-for="(item,$index) in group" :label="item.groupName" :value="item.groupGuid" :key="$index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用场景：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="dialogForm.name" placeholder="请填写描述" auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel"  @click="dialogFormVisible = false">取 消</el-button>
      <el-button class="affirm" type="primary" @click="submitDialogForm('dialogForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "ob-dialog-form",
    props: {
      // 社群列表数据
      group:{
        type:[Array,Object],
        default:()=>[]
      },
      value:{
        type:[Object],
        default:()=>({})
      },
      type:{
        type:[String],
        default:'device'
      },
      options:{
        type:[Object],
        default:()=>({

        })
      },
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      },
      formLabelWidth:{
        type:[Number,String],
        default:'90px'
      },
      width:{
        type:[Number,String],
        default:'330px'
      }
    },
    data() {
      const validateKey = (rule,value,callback)=>{
        if(!value){
          callback(new Error('请填写设备序列号'))
        }else {
          // if(value.length!==16){
          //   callback(new Error('请填写合法的序列号'))
          // }else {
            this.getDeviceType(value)
          // }
        }
      };
      const validateName = (rule,value,callback)=>{
        if(value){
          this.checkDeviceName(value)
        }

      };
      return {
        dialogForm:{
          deviceKey:'',
          deviceAlias:''
        },
        rules:{
          deviceKey:[
            { validator:validateKey,trigger:'blur'}
          ]
        },
        dialogFormVisible:false
      }
    },
    watch: {
      visible: function (val) {
        this.dialogFormVisible = val
      },
      dialogFormVisible: function (val) {
        this.$emit('update:visible', val)
      },
      value:{
        handler:function(val){
          this.dialogForm = val;
          console.log(val)
        },
        deep:true
      },
      dialogForm:{
        handler:function (val) {
          this.$emit('input',val)
        },
        deep:true
      }
    },
    methods:{
      submitDialogForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log('validate is success')
          }else {
            console.log('validate is not pass')
          }
        })
      },
      getDeviceType(key){
        if(key && key.length){
          this.$http("/device/type",{deviceKey:key}).then(res=>{
            console.log(res)
          })
        }else {
          console.log('请填写合法的设备序列号')
        }

      },
      checkDeviceName(name){
        this.$http("",{name:name}).then(res=>{
          console.log(res)
        })
      }
    },
    beforeDestroy(){
      if(this.$refs.dialogForm){
        this.$refs.dialogForm.resetFields();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import "@/styles/form.scss";
.dialog-form-wrapper{
  .el-dialog__header{
    padding: 25px 20px 10px;
    text-align: center;
    .el-dialog__title{
      font-size: 16px;
    }
    .el-dialog__headerbtn{
      top:10px;
      right: 10px;
      font-size: 20px;
    }
  }
  .el-dialog__body{
    padding:20px 20px 0;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .dialog-footer{
    .el-button{
      margin-right: 50px;
      &:last-child{
        margin-right: 0;
      }
    }
  }

  .el-radio-group{
    .el-radio-button{
      float: left;
      .el-radio-button__inner{
        border:none;
        padding: 0 4px;
        border-right: 1px solid #ddd;
        font-size:12px;
        color:  #CBCBCB;
      }
      &:focus{
        box-shadow: none;
      }
      &:last-child{
        .el-radio-button__inner{
          border: none;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
