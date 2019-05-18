<template>
  <div>
    <api-data :data="authData"></api-data>
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
      authData: [
        {title: '鉴权接口'},
        {title: '描述', info: '线下浏览器云端服务器需要鉴定用户是否有权调用业务接口，token为接口调用凭证，是线下浏览器接口请求的基本参数之一。'},
        {title: '备注：', info: 'token有效期为一天，过期后需再次获取；建议定时更新token，比如每10小时更新一次。'},
        {title: '调用URL：', info: 'http://insight.uni-ubi.com/obs/auth', hrefSwitch: true},
        {title: '请求方式：', info: 'GET'},
        {
          title: '请求数据：',
          type: 'table',
          info: [
            {
              tableTitle: [
                {prop: 'bool', label: '是否必选', width: '100'},
                {prop: 'names', label: '参数名', width: '100'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'infoS', label: '参数说明'}
              ],
              tableData: [
                {bool: '必选', names: 'accessKey', typeS: 'String', infoS: '开发者密钥ID'},
                {bool: '必选', names: 'sign', typeS: 'String', infoS: '签名，MD5-32(accessKey+timestamp+accessSecret)，MD5加密，32位小写'},
                {bool: '必选', names: 'timestamp', typeS: 'String', infoS: '当前时间戳当前时间戳'}
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
              '   "code": "OB_SUS-200", // 返回码\n' +
              '   "data": "c5a8dbc47fee837e35e44e2b752fa8de4a16107a226763e09d4ddbf841996c1e",  // token,调用其他接口都需此参数.此为示例\n' +
              '   "msg": "SUCCESS",   // 返回信息,接口返回的信息，通常是错误类型码的原因信息\n' +
              '   "result": 1,        // 处理结果,(1:成功,0:失败)\n' +
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
