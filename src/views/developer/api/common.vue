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
          subTitle: 'API返回的为一个JSON字符串。通用的返回值如下：',
          type: 'table',
          info: [
            {
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'infoS', label: '说明'}
              ]
            },
            {
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
      ],
      faceImgData: [
        {title: '描述', info: '根据摄像头ID、设备序列号、发起请求时间获取当前摄像头捕捉到一分钟以内的人脸照片。'},
        {title: '备注：', info: '照片数据以base64格式返回。'},
        {title: '调用URL：', info: 'http://offline-browser.uni-ubi.com/external/member/faceImg'},
        {title: '请求方式：', info: 'POST'},
        {
          title: '请求参数：',
          info: [
            {
              tableTitle: [
                {prop: 'bool', label: '是否必选', width: '100'},
                {prop: 'names', label: '参数名', width: '100'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'infoS', label: '参数说明'}
              ]
            },
            {
              tableData: [
                {bool: '必选', names: 'token', typeS: 'String', infoS: '调用接口凭证'},
                {bool: '必选', names: 'date', typeS: 'Date', infoS: '会员注册时间'},
                {bool: '必选', names: 'cameraId', typeS: 'String', infoS: '摄像头id'},
                {bool: '必选', names: 'deviceKey', typeS: 'String', infoS: '设备序列号'}
              ]
            }
          ]
        },
        {
          title: '返回值说明：',
          info: [
            {
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'infoS', label: '参数说明'}]
            },
            {
              tableData: [
                {
                  names: 'code',
                  typeS: 'String',
                  infoS: '返回码,接口统一定义的成功/错误类型码'
                },
                {
                  names: 'msg',
                  typeS: 'String',
                  infoS: '返回信息,接口返回的信息，通常是错误类型码的原因信息'
                },
                {
                  names: 'result',
                  typeS: 'Byte',
                  infoS: '处理结果,(1:成功,0:失败)'
                },
                {
                  names: 'data',
                  typeS: 'List<Object>',
                  infoS: 'Object包含人脸唯一标识ufaceId，进店次数entries，照片base64 faceImg'
                }]
            }
          ]
        },
        {
          title: '返回示例',
          info: [
            {
              des: '成功请求返回值示例',
              code: '{\n' +
              '    "code": "OBS_SUS618",\n' +
              '    "data": [\n' +
              '    {\n' +
              '      "ufaceId": "77504C866A414CE78EA861E006CB68DC",\n' +
              '      "entries": 0,\n' +
              '      "faceImg": null\n' +
              '    },\n' +
              '    {\n' +
              '      "ufaceId": "D67F1363C0AA43D3AC97683518BB97FD",\n' +
              '      "entries": 0,\n' +
              '      "faceImg": null\n' +
              '    }\n' +
              '  ],\n' +
              '    "msg": "success",\n' +
              '    "result": 1\n' +
              '}'
            },
            {
              des: '失败请求返回值示例',
              code: '{\n' +
              '    "code": "OBDS_EXP-2001",\n' +
              '    "data": null,\n' +
              '    "msg": "can not access without apiKey or token",\n' +
              '    "result": 0\n' +
              '}'
            }
          ]
        },
        {
          title: '错误码说明：',
          info: [
            {
              tableTitle: [{prop: 'names', label: '错误码', width: '120'},
                {prop: 'infoS', label: '说明'}
              ]
            },
            {
              tableData: [
                {
                  names: 'OBDS_EXP-611',
                  infoS: '会员date无效'
                },
                {
                  names: 'OBDS_EXP-612',
                  infoS: '会员cameraId为空\n'
                },
                {
                  names: 'OBDS_EXP-613',
                  infoS: '会员deviceKey为空\n'
                },
                {
                  names: 'OBDS_EXP-2000',
                  infoS: '验证token失败\n'
                },
                {
                  names: 'OBDS_EXP-2001',
                  infoS: 'token为空'
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
