<template>
    <div class="all-time-wrap">
         <div class="identify">身份识别设备</div>
         <div class="change-time">
             <span>1</span>
             <span>1</span>
             <div>:</div>
             <span>1</span>
             <span>1</span>
         </div>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data() {
        return {
            data: []   //数据
        }
    },
    methods: {
        time() {
            let now = new Date();
            let hh = now.getHours();            //时
            let mm = now.getMinutes();          //分
            let clock = '';
            if(hh < 10) clock += "0";
                clock += hh + ":";
            if (mm < 10) clock += '0'; 
               clock += mm; 
               return(clock); 
        }
    },
    created() {
        console.info("this.time();",this.time());
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .all-time-wrap {
        width: 100%;
        div.identify {
            height: 20px;
            width: 160px;
            font-size: 14px;
            color: #FFFFFF;
            background-image:url(/static/img/identify.png); 
        }
        .change-time {
            span {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #103E77;
                    border-radius: 1px;
                    text-align: center;
                    line-height: 30px;
            }
            div {
                display: inline;
            }
        }
    }
</style>
