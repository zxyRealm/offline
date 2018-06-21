<template>
    <div class="all-time-wrap">
         <div class="identify"><span>身份识别设备</span></div>
         <div class="change-time">
             <span>{{this.data[0]}}</span>
             <span>{{this.data[1]}}</span>
             <div>:</div>
             <span>{{this.data[2]}}</span>
             <span>{{this.data[3]}}</span>
         </div>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data() {
        return {
            showTime: {},
            data: [0,0,0,0]   //数据
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
            //   return(clock); 
            this.$set(this.data, 0,  Math.floor(hh/10));
            this.$set(this.data, 1,  hh%10);
            this.$set(this.data, 2,  Math.floor(mm/10));
            this.$set(this.data, 3,  mm%10);
        },
        setTime() {
            let me = this;
            this.showTime = setInterval(() => {
                me.time();
            },60000);
        }
    },
    created() {
       this.time();
    },
    mounted() {
        this.setTime();
    },
    computed: {

    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .all-time-wrap {
        width: 100%;
        text-align: center;
        height: 82px;
        div.identify {
            line-height: 34px;
            height: 34px;
            width: 164px;
            margin-left: calc(50% - 82px);
            background:url(/static/img/identify.png) no-repeat center; 
            background-size: 100% 100%;
            span {
                 padding: 5px 20px;
                 background: #0C50CF;
                 opacity: 0.5;
            }
        }
        .change-time {
            margin-top: 12px;
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
