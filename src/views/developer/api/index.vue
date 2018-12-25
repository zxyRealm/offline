<template>
  <div class="developer-api-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <div class="developer-api-inner">
      <div class="developer-api-header">
        <h3 :class="{fl:!devInfo || !devInfo.accessKey}">{{(devInfo && devInfo.accessKey) ? '开发者信息': '开发者申请'}}</h3>
        <div class="developer-detail fs12 clearfix">
          <template v-if="devInfo && devInfo.accessKey">
            <p>AccessKey：{{devInfo.accessKey}}</p>
            <p>AccessSecret：{{devInfo.accessSecret}}</p>
          </template>
          <el-button class="affirm medium fr" @click="dialogFormVisible = true" v-if="!loading && (!devInfo || ! devInfo.accessKey)">申请</el-button>
        </div>
      </div>
      <div class="developer-api-container clearfix">
        <div class="developer-api-nav">
          <div class="da-nav-item">
            <el-menu
              :default-active="$route.path"
              class="custom__menu--api"
              background-color="#232027"
              text-color="#8A898B"
              :router="true"
              active-text-color="#0F9EE9">
              <el-submenu index="1">
                <template slot="title">
                  <span>API入门</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/rule">API通用规则</el-menu-item>
                  <el-menu-item index="/developer/api/common">通用返回值</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>API说明</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/developer/api/auth">鉴权接口</el-menu-item>
                  <el-menu-item index="/developer/api/community">社群数据</el-menu-item>
                  <el-menu-item index="/developer/api/flow">客流数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/developer/api/code">
                <span slot="title">状态码</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="developer-api-content">
          <el-scrollbar ref="scrollContent">
            <div class="scroll-inner">
              <div class="total-content">
                <router-view></router-view>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>

    <ob-dialog-form
      v-model="applyForm"
      @remote-submit="applyDeveloper"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'api',
  data () {
    return {
      menu: [
        {title: '消息通知', index: '/developer/notify'},
        {title: '开放API', index: '/developer/api'}
      ],
      isShow: false,
      devInfo: {},
      applyForm: { // 申请开发者
        intro: '' // 申请原因
      },
      dialogOptions: { // 弹窗组件配置信息
        type: 'apply', // 弹窗类型
        title: '开发者申请' // 弹窗标题
      },
      dialogFormVisible: false, // 表单弹窗是否显示
      currentData: [],
      tokenData: [
        {title: '描述', info: '线下浏览器云端服务器需要鉴定用户是否有权调用业务接口，token为接口调用凭证，是线下浏览器接口请求的基本参数之一。'},
        {title: '备注：', info: 'token有效期为一天，过期后需再次获取；建议定时更新token，比如每10小时更新一次。'},
        {title: '调用URL：', info: 'http://offline-browser.uni-ubi.com/external/developer/token', hrefSwitch: true},
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
                {bool: '必选', names: 'appId', typeS: 'String', infoS: '创建应用时生成，可在应用详情中查看'},
                {bool: '必选', names: 'token', typeS: 'String', infoS: '创建应用时生成，可在应用详情中查看'},
                {bool: '必选', names: 'timestamp', typeS: 'String', infoS: '应用创建时的时间戳'},
                {bool: '必选', names: 'sign', typeS: 'String', infoS: 'MD5-32(appKey+timestamp+appSecret)，MD5加密，32位小写'}
              ]
            }
          ]
        },
        {
          title: '返回示例',
          info: [
            {
              des: '成功请求返回值示例',
              code: '{\n' +
              '    "code": "OBS_SUS501",\n' +
              '    "data": "3f8e76640b59e5b47bd05d23c816fbdbfacde7fecf03417a9f99735bd7c8813c",\n' +
              '    "msg": "success",\n' +
              '    "result": 1\n' +
              '}'
            },
            {
              des: '失败请求返回值示例',
              code: '{\n' +
              '    "code": "OBS_EXP-504",\n' +
              '    "msg": "sign incorrect",\n' +
              '    "result": 0\n' +
              '}'
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
                  typeS: 'JsonObject',
                  infoS: 'token,调用其他接口都需此参数'
                }]
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
                  names: 'OBDS_EXP-505',
                  infoS: 'appId为空'
                },
                {
                  names: 'OBDS_EXP-506',
                  infoS: 'appKey为空'
                },
                {
                  names: 'OBDS_EXP-507',
                  infoS: 'timestamp为空'
                },
                {
                  names: 'OBDS_EXP-508',
                  infoS: 'sign为空'
                },
                {
                  names: 'OBDS_EXP-502',
                  infoS: '开发者信息不存在'
                },
                {
                  names: 'OBDS_EXP-503',
                  infoS: '开发者信息appKey错误'
                },
                {
                  names: 'OBDS_EXP-504',
                  infoS: '开发者信息sign错误'
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
  methods: {
    // 根据路由显示不同api 文档信息，路由变化时滚动区回到顶部
    routeChange (route) {
      this.$refs.scrollContent.wrap.scrollTop = 0
      if (route.name === 'apiFaceImg') {
        this.currentData = this.faceImgData
      } else {
        this.currentData = this.tokenData
      }
    },
    // 获取开发者信息 accessKey、accessSecret
    getDeveloperInfo () {
      this.$http('/developer/find').then(res => {
        this.devInfo = res.data
      })
    },
    // 申请开发者
    applyDeveloper (data) {
      this.$http('/developer/apply', data).then(res => {
        this.$tip('申请成功')
        this.dialogFormVisible = false
        this.getDeveloperInfo()
      }).catch(() => {
        this.dialogFormVisible = false
      })
    }
  },
  mounted () {
    this.getDeveloperInfo()
    this.routeChange(this.$route)
  },
  watch: {
    '$route': function (val) {
      this.routeChange(val)
    }
  },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .developer-api-wrap{
    padding: 0!important;
  }
  .developer-api-inner {
    height: calc(100% - 64px);
    /*padding: 0 20px;*/
    .developer-api-header {
      padding: 10px 20px;
      border-bottom: 1px dashed rgba(151, 151, 151, 0.10);
      background: rgba(255, 255, 255, 0.03);
      > h3 {
        float: left;
        width: 180px;
        font-size: 14px;
        line-height: 30px;
      }
      .developer-detail {
        > p {
          float: left;
          display: inline-block;
          margin-right: 100px;
          min-width: 190px;
          line-height: 30px;
          color: rgba(255,255,255, 0.7);
          &:last-child {
            margin-right: 0;
          }

        }

      }
    }
    .developer-api-container {
      margin-top: 5px;
      height: calc(100% - 72px);
      .developer-api-nav {
        float: left;
        width: 148px;
        height: 100%;
        border-right: 1px dashed rgba(151, 151, 151, 0.10);
        .da-nav-title {
          line-height: 54px;
        }
        .da-nav-items {
          height: 36px;
          line-height: 36px;
          > a {
            color: #fff;
            &.router-link-active {
              color: #0F9EE9;
            }
          }
        }
      }
      .developer-api-content {
        height: calc(100% - 30px);
        margin-left: 148px;
        padding-right: 20px;
        box-sizing: border-box;
        overflow: hidden;
        .el-scrollbar {
          height: 100%;
        }
        .el-scrollbar__wrap {
          width: calc(100% + 17px);
          height: calc(100% + 17px);
          overflow-x: hidden;
        }
        .scroll-inner {
          margin-left: 20px;
        }
        .api-list-item {
          margin-bottom: 28px;
          .des {
            margin-bottom: 10px;
            font-size: 12px;
          }
          .api-list-title {
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .developer-api-container {
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
      /*padding: 10px 30px;*/
    }
  }
</style>
