<template>
  <div>
    <api-data :data="communityData"></api-data>
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
      communityData: [
        {title: '社群数据'},
        {title: '描述', info: '通过accessKey获取当前开发者下社群ID。'},
        {title: '备注：', info: 'token有效期为一天，过期后需再次获取；建议定时更新token，比如每10小时更新一次。'},
        {title: '调用URL：', info: 'http://insight.uni-ubi.com/api/manage/group/info/accessKey/{accessKey}', hrefSwitch: true},
        {title: '请求方式：', info: 'GET'},
        {
          title: '请求数据：',
          type: 'table',
          info: [
            {
              title: 'Header域名：',
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'msg', label: '描述', width: '200'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'required', label: '可空', width: '100'},
                {prop: 'infoS', label: '说明'}
              ],
              tableData: [
                {msg: '校验token', names: 'token', required: 'N', typeS: 'String', infoS: ''}
              ]
            },
            {
              title: 'Path域名：',
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'msg', label: '描述', width: '200'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'required', label: '可空', width: '100'},
                {prop: 'infoS', label: '说明'}
              ],
              tableData: [
                {names: 'accessKey', msg: '开发者密钥ID', typeS: 'String', required: 'N', infoS: ''}
              ]
            }
          ]
        },
        {
          title: '成功请求返回值示例',
          type: 'code',
          info: [
            {
              code: '{\n' +
              '   "code": "OB_SUS-200",         // 返回码\n' +
              '   "data":{\n' +
              '   "groupGuid":"",                  // 社群ID\n' +
              '   "name":"新华书店-庆门店",       // 名称\n' +
              '   "contact":"联系人",             // 联系人\n' +
              '   "phone":"联系电话",             // 联系电话\n' +
              '   "address":"地址",               // 地址\n' +
              '   "storeItem":[            // 成员社群集合\n' +
              '       {\n' +
              '           "storeGuid":"",                  // 成员社群ID\n' +
              '           "name":"新华书店-庆门店",       // 名称\n' +
              '           "contact":"联系人",             // 联系人\n' +
              '           "phone":"联系电话",             // 联系电话\n' +
              '           "address":"地址",               // 地址\n' +
              '       }\n' +
              '    ]\n' +
              '   "msg": "SUCCESS",// 返回信息,接口返回的信息，通常是错误类型码的原因信息\n' +
              '   "result": 1,// 处理结果,(1:成功,0:失败)\n' +
              '   "success": true\n' +
              '}'
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
