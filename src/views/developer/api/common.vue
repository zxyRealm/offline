<template>
  <api-data :data="commonBack"></api-data>
</template>

<script>
import ApiData from '@/components/developer/ApiData'
export default {
  name: 'common',
  components: {
    ApiData
  },
  data () {
    return {
      commonBack: [
        {
          title: '通用返回值',
          subTitle: '',
          type: 'table',
          info: [
            {
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'infoS', label: '说明'}
              ],
              tableData: [
                {
                  names: 'data',
                  typeS: 'String',
                  infoS: '返回结果数据'
                },
                {
                  names: 'result',
                  typeS: 'Int',
                  infoS: '请求状态，成功为1'
                },
                {
                  names: 'code',
                  typeS: 'String',
                  infoS: '当请求异常时，会返回错误码信息'
                },
                {
                  names: 'msg',
                  typeS: 'String',
                  infoS: '当请求异常时，会返回错误说明信息'
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
