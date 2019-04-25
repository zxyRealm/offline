<template>
  <!--<div class="area-select">-->
    <el-popover
      placement="bottom-start"
      width="400"
      :disabled="readonly"
      class="address-input"
      popper-class="address-popover"
      v-model="visible">
      <div class="select-wrap">
        <div class="white">
          <el-input
            type="text"
            class="search-input"
            v-model="search"
            placeholder="拼音支持首字母输入">
            <span slot="suffix" class="el-input__icon" @click="address=''">重置</span>
            <span slot="suffix" class="el-input__icon el-icon-close" @click="visible=false"></span>
          </el-input>
        </div>
        <el-input
          type="text" readonly
          class="address-text-input"
          v-model.trim="address"
          placeholder="请选择省份/直辖市/自治区">
        </el-input>
        <el-radio-group class="area-radio-wrap" v-model="currentAddress">
          <el-tooltip
            v-for="(item,$index) in addressOption"
            :key="item.code"
            :disabled="item.name.length<=4" :content="item.name">
            <el-radio-button
              class="ellipsis"
              :class="{selectable:item.active}"
              :label="item[childProps.id]">{{item.name}}
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </div>
      <div
        slot="reference"
        class="address-btn"
        :class="{'popover-icon':visible}"
        :readonly="readonly">
        <el-input
          readonly
          ref="areaInput"
          :placeholder="placeholder"
          @blur="inputBlur"
          v-model.trim="addressText">
        </el-input>
      </div>
    </el-popover>
  <!--</div>-->
</template>

<script>
import {makePy} from '@/utils/initial'
import {GetAreaList} from '../../api/common'
import Emitter from '../../components/utils/emitter'
let OK_CODE = 1

export default {
  name: 'area-select',
  mixins: [Emitter],
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择地址'
    },
    childProps: {
      type: Object,
      default: () => ({
        label: 'name',
        id: 'code',
        pid: 'pid'
      })
    }
  },
  data () {
    return {
      visible: false,
      currentValue: [],
      address: '',
      search: '',
      currentType: 0, // 分为三个类型 0:province、1:city、2:area
      currentAddress: '',
      addressOption: [],
      originAddress: [],
      idStr: ''
    }
  },
  methods: {
    // 获取省市区数据列表，并设置首字母缩写
    getAddressList () {
      GetAreaList().then((res) => {
        if (res.result === OK_CODE) {
          this.$set(this.originAddress, 0, res.data[2].map(item => {
            this.$set(item, 'initial', makePy(item[this.childProps.label]))
            return item
          }))
          this.$set(this.originAddress, 1, res.data[3].map(item => {
            this.$set(item, 'initial', makePy(item[this.childProps.label]))
            return item
          }))
          this.$set(this.originAddress, 2, res.data[4].map(item => {
            this.$set(item, 'initial', makePy(item[this.childProps.label]))
            return item
          }))
          this.showDefaultValue()
          this.addressOption = this.originAddress[0]
        }
      })
    },
    // 过滤出当前需要显示的数据列表（省/市/区）
    filterAddress (type) {
      if (type) {
        return this.originAddress[type].filter(item => this.currentValue[type - 1][this.childProps.id] === item[[this.childProps.pid]]) || ''
      } else {
        return this.originAddress[type] || ''
      }
    },
    // 展示默认数据
    showDefaultValue () {
      let idArr = this.value.split(',')
      if (this.value && idArr[0] && idArr[1] && idArr[2]) {
        let [pMap, cMap, aMap] = [new Map(), new Map(), new Map()]
        this.originAddress[0].map(item => pMap.set(item[this.childProps.id], item))
        this.originAddress[1].map(item => cMap.set(item[this.childProps.id], item))
        this.originAddress[2].map(item => aMap.set(item[this.childProps.id], item))
        let [province, city, area] = [pMap.get(idArr[0]), cMap.get(idArr[1]), aMap.get(idArr[2])]
        if (province && city && area) {
          this.currentValue = [province, city, area]
          this.currentAddress = area[this.childProps.id]
          this.currentType = 2
        } else {
          console.error('地区GB码不存在')
        }
      } else if (!this.value) {
        this.address = ''
      }
    },
    inputBlur () {
      this.dispatch('ElFormItem', 'el.form.blur', [this.idStr])
    }
  },
  mounted () {
    this.getAddressList()
  },
  watch: {
    value: {
      handler () {
        this.showDefaultValue()
      },
      deep: true
    },
    currentType: function (val) {
      this.addressOption = this.filterAddress(val)
    },
    address: function (val) {
      if (!val) {
        this.currentType = 0
        this.currentValue = []
      }
    },
    // 选取地址改变时，改变当前选取类型 0：省 1：市 2 区
    currentAddress: {
      handler (val, old) {
        this.$set(this.currentValue, this.currentType, this.addressOption.filter(item => item[this.childProps.id] === val)[0])
        if (this.currentType < 2) {
          this.currentType++
        } else if (val !== old) {
          this.visible = false
          this.inputBlur()
        }
      },
      deep: true
    },
    // v-model 数据绑定 拼接地址并显示
    currentValue: {
      handler: function (val) {
        let [textStr] = ['']
        this.idStr = ''
        for (let i = 0, len = val.length; i < len; i++) {
          this.idStr += this.idStr ? (',' + val[i][this.childProps.id]) : val[i][this.childProps.id]
          textStr += (textStr ? ('-' + val[i][this.childProps.label]) : val[i][this.childProps.label]) || ''
        }
        this.$emit('input', this.idStr)
        this.address = textStr
      },
      deep: true
    },
    // 查询过滤（支持首字母查询）
    search (val) {
      val = val.trim()
      if (val) {
        this.addressOption.map(item => {
          if (item.name.indexOf(val) > -1 || item.initial[0].indexOf(val.toUpperCase()) > -1) {
            this.$set(item, 'active', 1)
          } else {
            this.$set(item, 'active', 0)
          }
        })
      } else {
        this.addressOption.map(item => {
          this.$set(item, 'active', 0)
        })
      }
    },
    visible (val) {
      if (!val) {
        if (!this.currentValue[2]) {
          this.address = ''
          this.search = ''
          this.$emit('input', '')
        }
      }
    }
  },
  computed: {
    // 格式化地址
    addressText () {
      let text = ''
      Array.from(new Set(this.address.split('-'))).map((item) => {
        text += item
      })
      return text
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables';
  .address-input {
    width: 100%;
    display: inline-block;
    height: 30px;
    .address-btn {
      position: relative;
      width: 100%;
      line-height: 30px;
      color: #fff;
      border: none;
      background: #0B7EF9;
      /*background-image: url(../../assets/public/input_border_bg@2x.png);*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: left;
      border-radius: 4px;
      &[readonly] {
        background: transparent;
        cursor: text;
        &:after {
          display: none;
        }
      }
      &[placeholder] {
        color: $placeholder-color;
      }
      &:after {
        position: absolute;
        content: '';
        right: 4px;
        height: 100%;
        width: 30px;
        background: url(../../assets/public/select_arrow_icon.png) no-repeat center;
        background-size: 10px auto;
        transition: transform 0.5s;
        transform: rotate(0deg);
      }
      &.popover-icon:after {
        transform: rotate(180deg);
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
          color: #333;
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
          color: #333;
          background: transparent;
        }
        &.search-input {
          height: $line24;
          background: none;
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
            .el-input__validateIcon {
              display: none;
            }
          }
        }
        &.address-text-input {
          height: $line28;
          background: #0B7EF9;
          /*background: url(../../assets/public/area_select_bg.png) no-repeat center;*/
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
          &.selectable {
            .el-radio-button__inner {
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
            color: #606266;
            background-color: #fff;
          }
        }
      }
    }
  }
</style>
