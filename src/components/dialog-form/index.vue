<template>
  <el-dialog
    :type="type"
    center
    top="auto"
    @close="closeDialog"
    class="dialog-form-wrapper vam"
    width="500px" :title="title" :visible.sync="dialogFormVisible">
    <el-scrollbar
      class="mc"
      v-if="type==='group'"
      :style="customStyle"
    >
      <ob-group-nav
        ref="customGroup"
        :show-checkbox="true"
        node-key="uniqueKey"
        is-disabled
        :multiple="multiple"
        :disabled-keys="disabledKeys"
        theme="white"
        type="custom"
      ></ob-group-nav>
    </el-scrollbar>
    <el-form
      block-message
      style="width: 330px"
      label-position="left"
      class="common-form white"
      ref="dialogForm"
      :rules="rules"
      :model="dialogForm"
      v-else
    >
      <template v-if="type==='device'">
        <el-form-item label="设备序列号：" prop="deviceKey" :label-width="formLabelWidth">
          <el-input type="text" v-model="dialogForm.deviceKey" placeholder="请输入设备序列号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备别名：" prop="deviceName" :label-width="formLabelWidth">
          <el-input type="text" v-model="dialogForm.deviceName" placeholder="请输入设备别名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="dialogForm.type" disabled size="small">
            <el-radio-button :label="1">分析终端</el-radio-button>
            <el-radio-button :label="2">客行分析一体机</el-radio-button>
            <el-radio-button :label="3">身份识别一体机</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="tac">
          <img v-if="dialogForm.type===1" src="./image/analysis_terminal_icon.png" alt="分析终端">
          <img v-if="dialogForm.type===(2||3)" src="./image/all_in_one_icon.png" alt="一体机">
        </el-form-item>
      </template>
      <template v-if="type==='community'">
        <el-form-item label="选择社群：" prop="groupGuid" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.groupGuid" placeholder="请选择社群">
            <el-option v-for="(item,$index) in optionsGroup" :label="item.groupNickName" :value="$index" :key="$index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用场景：" :label-width="formLabelWidth" prop="deviceScene">
          <el-input type="textarea" v-model="dialogForm.deviceScene" placeholder="请填写描述" auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel"  @click="dialogFormVisible = false">返 回</el-button>
      <el-button class="affirm" type="primary" @click="submitDialogForm('dialogForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Group from '@/components/group-nav'
  import { uniqueKey } from '@/utils'
  export default {
    components:{
      'ob-group-nav':Group
    },
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
      },
      multiple:{  //当type为group是设置有效 是否可多选
        type:Boolean,
        default:false
      },
      keys:{    //当type为group是设置有效 默认获取节点，true获取key数组
        type:Boolean,
        default:false
      },
      disabledKeys:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      const validateKey = (rule,value,callback)=>{
        value = value.trim();
        if(!value){
          this.dialogForm.type = '';
          callback(new Error('请填写设备序列号'))
        }else {
          if(value.length===16){
            // 校验设备是否被绑定过
            this.$http("/merchant/device/exist",{deviceKey:value},false).then(res=>{
              if(!res.data){
                // 获取设备状态
                this.$http("/device/type",{deviceKey:value},false).then(res2=>{
                  this.dialogForm.type = res2.data.deviceType;
                  callback()
                }).catch(err=>{
                  this.dialogForm.type = '';
                  callback(new Error(err?err.msg:'服务器异常'))
                })
              }else {
                this.dialogForm.type = '';
                callback(new Error('设备已经绑定，请更换其他设备'))
              }
            }).catch(err=>{
              this.dialogForm.type = '';
              callback(new Error(err.msg||'服务器异常'))
            });
          }else{
            this.dialogForm.type = '';
            callback(new Error('请填写合法的设备序列号'))
          }
        }
      };
      const validateName = (rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入别名'))
        }else {
          if(value.length>=2&& value.length<=18){
            this.$http("/merchant/device/alias/exist",{deviceName:value},false).then(res=>{
              if(res.data){
                callback(new Error('别名已存在，请重新输入'))
              }else {
                callback()
              }
            }).catch(err=>{
              callback(new Error(err.msg||'验证失败'))
            });
          }else {
            callback(new Error("别名长度为2-18个字符"))
          }
        }

      };
      return {
        dialogForm:{
          deviceKey:'',
          deviceName:'',
          type:''
        },
        rules:{
          deviceKey:[
            { validator:validateKey,trigger:'blur'}
          ],
          deviceName:[
            { validator:validateName,trigger:'blur'}
          ],
          groupGuid:[
            {required:true,message:'请选取自有社群',trigger:'blur'}
          ]
        },
        optionsGroup:[],
        dialogFormVisible:false
      }
    },
    watch: {
      group:{
        handler:function(val){
          this.optionsGroup = val || [];
        },
        deep:true
      },
      visible: function (val) {
        this.dialogFormVisible = val
      },
      dialogFormVisible: function (val) {
        this.$emit('update:visible', val);
        if(val&&this.$refs.customGroup){
          this.$refs.customGroup.getGroupList()
        }
      },
      value:{
        handler:function(val){
          this.dialogForm = val;
        },
        deep:true
      },
      dialogForm:{
        handler:function (val) {
          this.$emit('input',val)
        },
        deep:true
      },
      disabledKeys:{
        handler:function(val){

        },
        deep:true
      }
    },
    methods:{
      submitDialogForm(formName){
        if(this.type==='group'){
          let backArray = this.$refs.customGroup.getCheckedNodes();
          if(this.keys){
            backArray = this.$refs.customGroup.getCheckedKeys();
          }
          this.$emit("remote-submit",backArray);
        }else {
          this.$refs[formName].validate(valid=>{
            if(valid){
              this.$emit("remote-submit",JSON.parse(JSON.stringify(this.dialogForm)));
            }else {
              console.log('validate is not pass')
            }
          })
        }

      },
      closeDialog(){
        if(this.$refs.dialogForm){
          this.$refs.dialogForm.resetFields()
        }
      },
      setCheckedNodes(key){
        this.$nextTick(()=>{
          this.$refs.customGroup.setCheckedNodes(key||[])
        })
      }
    },
    created(){
      // this.getDisabledKeys = this.disabledKeys
    },
    beforeDestroy(){
    },
    computed:{
      customStyle:function(){
        switch (this.type){
          case 'group':
            return {width:'400px',background:'#f8f8f8',height:'400px'};
          default:
            return {width:this.width}
        }
      },
      getDisabledKeys:{
        get(){
          console.log('child',this.disabledKeys);
          return this.disabledKeys
        },
        set(){
          return this.disabledKeys
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import "@/styles/form.scss";
.dialog-form-wrapper{
  &[type=group]{
    .el-dialog__body{
      padding:0 20px 0;
    }
    .el-tree.white{
      background: transparent;
    }
  }
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
    .el-scrollbar{
      margin: 0 auto;
    }
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .dialog-footer{
    text-align: center;
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
      &.is-active{
        .el-radio-button__inner{
          color:#333;
        }
      }
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
