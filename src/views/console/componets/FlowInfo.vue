<template>
    <div class="flow-info-wrap">
         <img src="/static/img/enter-people.png" v-if="type=='left'">
         <img src="/static/img/out-people.png" v-if="type=='right'">
         <span class="number">{{number}}</span>
         <img  class="number-img" src="/static/img/add-people.png">
         <span>+1</span>
    </div>
</template>
<script>
export default {
    props: ['type','number'],
    data() {
        return {
            data: []   //数据
        }
    },
    methods: {

    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .flow-info-wrap {
       display: inline-block;
       position: relative;
       img:nth-child(1) {
           height: 70px;
       }
       img.number-img {
           height: 18px;
       }
       span.number {
            top: 26px;
            position: absolute;
            left: 20px;
            font-size: 18px;
       }
    }
</style>
