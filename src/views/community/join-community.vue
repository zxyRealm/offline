<template>
  <div class="edit-custom-wrap">
    <uu-sub-tab
      back
      :menu-array="[{title:'加入社群'}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border vam">
      <uu-form
        width="310px"
        label-width="96px"
        :sub-text="step===2?'确定':''"
        @handle-submit="submitForm"
        v-model="joinForm"
        :rules="rules"
      >
        <el-form-item label-width="86px">
          <div class="item-title">
            1.通过社群邀请码搜索社群
          </div>
        </el-form-item>
        <el-form-item label="社群邀请码：" prop="code">
          <el-input
            type="text"
            :readonly="step===2"
            placeholder="请输入社群邀请码"
            v-model="joinForm.code"></el-input>
        </el-form-item>
        <el-form-item v-if="communityInfo.guid && step!==2" label-width="100px">
          <div class="txt">
            您
            <a href="javascript:void (0)" @click="ensure">确定</a>
            加入【星巴克】社群？
          </div>
          <div class="fs12" >
            <p>社群名称：星巴克-滨江区</p>
            <p>地区：星巴克-滨江区</p>
            <p>联系人：星巴克-滨江区</p>
            <p>联系电话：星巴克-滨江区</p>
            <p>索权范围：星巴克-滨江区</p>
          </div>
        </el-form-item>
        <el-form-item label-width="86px" v-if="step===2" >
          <div class="item-title">
            2.选择自有社群加入
          </div>
        </el-form-item>

        <el-form-item v-if="step===2" label="选择社群：" prop="groupGuid">
          <el-select v-model="joinForm.groupGuid" placeholder="请选择自有社群">
            <el-option
              v-for="item in groupList"
              :key="item.groupGuid"
              :label="item.groupNickName"
              :value="item.groupGuid"></el-option>
          </el-select>
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
      const  validateCode = (rule,value,callback)=>{
        value = value.trim();
        this.communityInfo = {};
        if(!value){
          this.step = 1;
          callback(new Error("请填写社群邀请码"))
        }else {
          console.log(value.length);
          if(value.length===10){
            this.$http("/group/code/info",{code:value}).then(res=>{
              if(res.data){
                this.communityInfo = res.data;
                if(!this.groupList.length){
                  this.getGroups()
                }
                callback()
              }else {
                callback(new Error('邀请码不存在，请重新输入'));
              }
            }).catch(err=>{
              this.step = 1;
              callback(new Error(err.msg||'邀请码不存在'))
            })
          }else {
            this.step = 1;
            callback(new Error('请输入正确格式的邀请码'))
          }
        }
      };
      return {
        step:1,
        editable:true,
        groupList:[],
        communityInfo:{},
        joinForm:{
          groupPid:'',
          groupGuid:'',
          code:''
        },
        rules:{
          groupPid:[
            {required:true,validator:validateName,trigger:'blur'}
          ],
          groupGuid:[
            {required:true,message:'请选择自有社群',trigger:'blur'}
          ],
          code:[
            {required:true,validator:validateCode,trigger:'change'}
          ]
        }
      }
    },
    methods:{
      submitForm(data){
        console.log('submit',data);
        this.$http('/group/join',data).then(res=>{
          this.$tip('加入成功');
          this.$router.push("/community/mine")
        })
      },
      // 获取自有社群
      getGroups(){
        this.$http("/group/list").then(res=>{
          this.groupList = res.data
        })
      },
      ensure(){
        this.joinForm.groupPid = this.communityInfo.guid;
        this.step = 2;
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

<style lang="scss">
  .community-common-from-wrap{
    .el-form-item{
      .item-title{
        font-size: 14px;
        margin: 30px 0 15px;
      }
    }
  }
</style>
