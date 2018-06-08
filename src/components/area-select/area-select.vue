<template>
  <div class="area-select">
    <el-popover
      placement="bottom-start"
      width="400"
      :disabled="readonly"
      class="address-input"
      popper-class="address-popover"
      v-model="visible">
      <div class="select-wrap">
        <el-input
          type="text"
          class="search-input"
          v-model="search"
          placeholder="拼音支持首字母输入">
          <span slot="suffix" class="el-input__icon" @click="address=''">重置</span>
          <span slot="suffix" class="el-input__icon el-icon-close" @click="search=''"></span>
        </el-input>
        <el-input
          type="text" readonly
          class="address-text-input"
          v-model="address"
          placeholder="请选择省份/直辖市/自治区">
        </el-input>
        <el-radio-group class="area-radio-wrap" v-model="currentAddress">
          <el-tooltip
            v-for="(item,$index) in addressOption"
            :key="$index"
            :disabled="item.name.length<=4" :content="item.name">
            <el-radio-button
              class="ellipsis"
              :class="{selectable:item.active}"
              :label="item">{{item.name}}
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </div>
      <el-button
        :readonly="readonly"
        slot="reference"
        :placeholder="!addressText"
        class="address-btn">{{addressText?addressText:'请选取地址'}}</el-button>
    </el-popover>
  </div>
</template>

<script>
  let OK_CODE = 1;
  import { makePy } from '../../utils/initial'
  export default {
    name: "area-select",
    props: {
      readonly:{
        type:Boolean,
        default:false
      },
      value: {
        type: [Array, String],
        default: ''
      }
    },
    data() {
      return {
        visible: false,
        currentValue: [],
        address: '',
        search: '',
        currentType: 0,  //分为三个类型 0:province、1:city、2:area
        currentAddress: '',
        addressOption: [],
        originAddress: [
          [
            {id: 11102, name: '浙江'},
            {id: 11202, name: '北京'},
            {id: 11402, name: '福建'},
            {id: 11602, name: '云南'},
            {id: 11702, name: '内蒙古'},
            {id: 11602, name: '云南'},
            {id: 11702, name: '内蒙古'},
            {id: 11902, name: '香港特别行政区'},
            {id: 11206, name: '澳门特别行政区'},
            {id: 11236, name: '呼和浩特'}
          ],
          [
            {id: 112334, name: '温州'},
            {id: 112334, name: '湖州'},
            {id: 112334, name: '杭州'},
            {id: 112334, name: '绍兴'},
            {id: 112334, name: '金华'},
            {id: 112334, name: '衢州'},
          ],
          [
            {id: 112234, name: '江干区'},
            {id: 112235, name: '余杭区'},
            {id: 112236, name: '萧山区'},
            {id: 112237, name: '西湖区'},
            {id: 112238, name: '滨江区'}
          ]
        ]
      }
    },
    methods: {
      getAddressList() {
        this.$http("/api/area/list", {level: 1}).then((res) => {
          if (res.result === OK_CODE) {
            // res.data = res.data.map(item=>{ this.$set(item,'initial',makePy(item.name));return item });
            this.$set(this.originAddress, 0, res.data[1].map(item=>{ this.$set(item,'initial',makePy(item.name));return item }));
            this.$set(this.originAddress, 1, res.data[2].map(item=>{ this.$set(item,'initial',makePy(item.name));return item }));
            this.$set(this.originAddress, 2, res.data[3].map(item=>{ this.$set(item,'initial',makePy(item.name));return item }));
            if (this.value) {
              let idArr = this.value.split(',').map(Number);
              let [pMap, cMap, aMap] = [new Map(), new Map(), new Map()];
              this.originAddress[0].map(item => pMap.set(item.id, item));
              this.originAddress[1].map(item => cMap.set(item.id, item));
              this.originAddress[2].map(item => aMap.set(item.id, item));
              this.currentValue = [
                pMap.get(idArr[0]), cMap.get(idArr[1]), aMap.get(idArr[2])
              ];
              this.currentAddress = aMap.get(idArr[2]);
              this.currentType = 2;
            }
            this.addressOption = this.originAddress[0]
            // this.$http("/api/area/list", {level: 2}).then((res2) => {
            //   if (res2.result === OK_CODE) {
            //     res2.data = res2.data.map(item=>{ this.$set(item,'initial',makePy(item.name));return item });
            //     this.$set(this.originAddress, 1, res2.data);
            //     this.$http("/api/area/list", {level: 3}).then((res3) => {
            //       if (res3.result === OK_CODE) {
            //         res3.data = res3.data.map(item=>{ this.$set(item,'initial',makePy(item.name));return item });
            //         this.$set(this.originAddress, 2, res3.data);
            //
            //       }
            //     });
            //   }
            // });
          }
        });
      },
      filterAddress(type) {
        if (type) {
          return this.originAddress[type].filter(item => this.currentValue[type - 1].id === item.pid)
        } else {
          return this.originAddress[type]
        }
      }
    },
    mounted() {
      this.getAddressList();
    },
    watch: {
      currentType: function (val) {
        this.addressOption = this.filterAddress(val);
      },
      address: function (val) {
        if (!val) {
          this.currentType = 0;
          this.currentValue = [];
        }
      },
      currentAddress: function (val) {
        this.$set(this.currentValue, this.currentType, val);
        if (this.currentType < 2) {
          this.currentType++
        } else {
          this.visible = false
        }
      },
      currentValue: {
        handler: function (val) {
          let [textStr, idStr] = ['', ''];
          val.map(item => {
            idStr += idStr ? (',' + item.id) : item.id;
            textStr += textStr ? ('-' + item.name) : item.name;
          });
          this.$emit("input",idStr);
          this.address = textStr;
        },
        deep: true
      },
      search(val){
       val = val.replace(/[\s ]+/g,'');
        if(val){
          let isChar = /^[a-z]+$/i.test(val);
          this.addressOption.map(item=>{
            if(item.name.indexOf(val)>-1 || item.initial[0].indexOf(val.toUpperCase())>-1){
              this.$set(item,'active',1)
            }else {
              this.$set(item,'active',0)
            }
          });
        }else {
          this.addressOption.map(item=>{
            this.$set(item,'active',0)
          });
        }
      },
      visible:function(val){
        if(val){

        }else {
          if(!this.currentValue[2]){
            this.address = '';
            this.$emit("input",'')
          }
        }
      }
    },
    computed: {
      addressText() {
        return this.address.replace(/\-/g, '')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .address-input {
    display: inline-block;
    height: 30px;
    .address-btn {
      width: 220px;
      line-height: 30px;
      color: #fff;
      border: none;
      padding: 0 15px;
      background-color: #232027;
      background-image: url("/static/img/input_border_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: left;
      &[readonly]{
        background: transparent;
        cursor: text;
      }
      &[placeholder]{
        color:#d0d0d0;
      }

    }
  }

  .address-popover {
    .select-wrap {
      width: 100%;
      .el-input {
        border: none;
        .el-input__inner {
          border: none;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  $line24: 24px;
  $line28: 28px;
  .address-popover {
    padding: 0;
    height: 230px;
    box-sizing: border-box;
    border: none !important;
    .select-wrap {
      .el-input {
        .el-input__inner {
          border: none;
        }
        &.search-input {
          height: $line24;
          .el-input__inner {
            font-size: 12px;
            height: $line24;
            line-height: $line24;
          }
          .el-input__suffix {
            display: inline-block;
            height: $line24;
            line-height: $line24;
            .el-input__suffix-inner {
              height: $line24;
              display: inline-block;
              line-height: $line24;
            }
            .el-input__icon {
              line-height: $line24;
              height: $line24;
              cursor: pointer;
              color: #0F9EE9;
              font-size: 12px;
              vertical-align: top;
              margin-right: 20px;
              &.el-icon-close {
                font-size: 22px;
                color: #c0c4cc;
                margin-right: 0;
              }
            }
            .el-input__validateIcon{
              display: none;
            }
          }
        }
        &.address-text-input {
          height: $line28;

          background: url("/static/img/area_select_bg.png") no-repeat center;
          .el-input__inner {
            height: $line28;
            line-height: $line28;
            color: #fff;
            background: transparent;
          }
        }
      }
      .area-radio-wrap {
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        .el-radio-button {
          width: 48px;
          margin: 0 6px;
          &.selectable{
            .el-radio-button__inner{
              color: #0F9EE9;
            }
          }
          &.is-active {
            .el-radio-button__inner {
              background-color: transparent;
              color: #0F9EE9;
            }
          }
          .el-radio-button__inner {
            width: 100%;
            padding: 8px 0;
            text-align: left;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
