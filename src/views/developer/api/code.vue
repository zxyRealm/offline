<template>
  <div>
    <api-data :data="codeData"></api-data>
  </div>
</template>

<script>
import ApiData from '@/components/developer/ApiData'
export default {
  name: 'api-code',
  components: {
    ApiData
  },
  data () {
    return {
      codeData: [
        {
          title: '状态码',
          type: 'table',
          info: [
            {
              tableTitle: [
                {prop: 'names', label: '返回码', width: '200'},
                {prop: 'infoS', label: '描述'}
              ],
              tableData: [
                {
                  names: 'OB_SUS-200',
                  infoS: '操作成功'
                },
                {
                  names: 'OB_EXP-500',
                  infoS: '系统异常'
                },
                {
                  names: 'OB_EXP-1000',
                  infoS: '请求数据'
                },
                {
                  names: 'OB_EXP-1100',
                  infoS: 'AccessKey错误'
                },
                {
                  names: 'OB_EXP-1200',
                  infoS: '签名信息错误'
                },
                {
                  names: 'OB_EXP-1102',
                  infoS: '开发者不存在'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style scoped>

</style>
