<template>
    <div class="home-notify-wrapper">
        <div class="tip"><div>暂无数据，请选择您的社群和设备</div></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
    .home-notify-wrapper {
        height: 100px;
        min-width: 1240px;
        .tip {
           width: 100%;
           height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            div {
                width: 720px;
                height: 110px;
                text-align: center;
                line-height: 110px;
                background: rgba(1,8,20,0.10);
                border: 2px dashed rgba(151,151,151,0.30);
                opacity: 0.5;
                font-size: 12px;
                color: #FFFFFF;
          }
       }
    }
</style>
