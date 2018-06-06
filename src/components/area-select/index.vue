<template>
  <div class="area-warp">
    <el-select style="width:32%" class="select-item" v-model="address.province" placeholder="省">
      <el-option
        v-for="item in options.province"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>

    <el-select style="width:32%" class="select-item" v-model="address.city" placeholder="市">
      <el-option
        v-for="item in options.city"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>

    <el-select style="width:32%" class="select-item" v-model="address.area" placeholder="区">
      <el-option
        v-for="item in options.area"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  const OK_CODE = 1;
  export default {
    name: "area-select",
    props: {
      value: {
        type: [Object, Array, String],
        default: ''
      }
    },
    data() {
      return {
        address: {
          province: '',
          city: '',
          area: ''
        },
        options: {
          province: [],
          city: [],
          area: []
        },
        initData: {},
        defaults:{},
        initState:[] //是否完成默认值的初始化
      }
    },
    methods: {
      init() {
        this.$http("/api/area/list", { level: 1 }).then((res) => {
          if (res.result === OK_CODE) {
            this.initData.province = res.data;
            this.options.province = res.data;
            this.$http("/api/area/list", {level: 2}).then((res2) => {
              if (res2.result === OK_CODE) {
                this.initData.city = res2.data;
                this.$http("/api/area/list", {level: 3}).then((res3) => {
                  if (res3.result === OK_CODE) {
                    this.initData.area = res3.data;
                    // 此时设置默认数据可以保证所需的地址数据已经获取完毕
                    this.defaults = this.value;
                    this.address.province = this.value.province||'';
                  }
                });
              }
            });
          }
        });
      }
    },
    created() {
      this.init()
    },
    watch: {
      "address.province": {
        handler: function (val) {
          this.options.city = this.initData.city.filter((item) => {
            return item.pid === val
          });
          // 先判断是否有默认值
          // console.log('省',this.defaults.city,this.initState);
          if(this.initState[0]||!this.defaults.city){
            this.address.city = '';
            this.address.area = '';
            this.$emit("input", this.address)
          }else if(this.defaults.city && !this.initState[0]){
            this.$set(this.address,'city',this.defaults.city);
            this.initState[0] = true
          }
        },
        deep: true
      },
      "address.city": {
        handler: function (val) {
          this.options.area = this.initData.area.filter((item) => {
            return item.pid === val
          });
          // console.log('市',this.defaults.area,this.initState[1]);
          if(this.initState[1] || !this.defaults.area){
            this.address.area = '';
            this.$emit("input", this.address);
          }else if(this.defaults.area && !this.initState[1]){
            this.$set(this.address,'area',this.defaults.area);
            this.initState[1] = true
          }
        },
        deep: true
      },
      "address.area": {
        handler: function () {
          // console.log('区',this.defaults.area,this.initState[2]);
          if(this.initState[2] || !this.defaults.area){
            this.$emit("input", this.address)
          }else if(!this.initState[2]){
            this.initState[2] = true
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .area-wrap
    width 100%
    .select-item
      width 32%
      margin-right 2%
      :last-child
        margin-right 0
</style>
