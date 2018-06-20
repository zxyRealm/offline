<template>
  <el-select class="ob-group-nav" v-model="currentGroup">
    <el-option
      v-for="item in GroupList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
    export default {
      props:{
        type:{

        }
      },
        name: "ob-group-nav",
        data(){
          return{

          }
        },
      methods:{

      },
      created(){

      }
    }
</script>

<style scoped>

</style>
