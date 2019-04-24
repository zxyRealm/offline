<template>
  <div class="login">
    <div class="banner">
      <div class="logo"></div>
    </div>
    <div class="content">
      <div class="left-part"></div>
      <div class="right-part">
        <div class="wrap" style="position: relative">
          <el-alert
            v-if="isSuccess"
            class="success-tip"
            title="成功文案message"
            :closable="false"
            type="success"
            show-icon
          ></el-alert>
          <div class="loginBox" v-if="mode === 'login'">
            <div class="title">欢迎登录</div>
            <div class="form">
              <el-form ref="login" :rules="rules" :model="login.form">
                <el-form-item prop="phoneNumber">
                  <el-input v-model="login.form.phoneNumber" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="login.form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <div class="code">
                    <el-input v-model="login.form.code" placeholder="请输入验证码"></el-input>
                    <div class="num-pic"></div>
                  </div>
                </el-form-item>
                <el-button type="primary" class="submit-button" @click="submit(login.form)">登 录</el-button>
                <div class="option">
                  <span>
                    您还没有账号？点击
                    <a href="javascript:;" @click="skipTo('reg')">注册</a>
                  </span>
                  <span style="cursor:pointer" @click="skipTo('forgot')">忘记密码？</span>
                </div>
              </el-form>
            </div>
          </div>
          <div class="regBox" v-if="mode === 'reg'">
            <div class="title clearfix">
              <span>手机号注册</span>
              <span>
                已有账号，返回
                <a href="javascript:;" @click="skipTo('login')">登录</a>
              </span>
            </div>
            <div class="form">
              <el-form ref="reg" :rules="rules" :model="reg.form">
                <el-form-item prop="phoneNumber">
                  <el-input v-model="reg.form.phoneNumber" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode">
                  <el-input v-model="reg.form.verifyCode" placeholder="请输入验证码">
                    <a
                      slot="suffix"
                      :class="{'send-code': code.mode, 'anti-send-code': !code.mode}"
                      @click="getCode"
                    >{{code.content}}</a>
                  </el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="reg.form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="reg.form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="verifyPassword">
                  <el-input type="password" v-model="reg.form.verifyPassword" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  class="submit-button"
                  @click="registAccount(reg.form)"
                >注册并登录</el-button>
                <el-form-item prop="readCheck">
                  <div class="option">
                    <el-checkbox v-model="reg.form.readCheck">
                      我已阅读
                      <a href="javascript:;">《宇泛智能网站服务条款》</a>
                    </el-checkbox>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="forgotBox" v-if="mode === 'forgot'">
            <div class="title">
              <span>密码找回</span>
            </div>
            <div class="form">
              <el-form ref="forgot" :rules="rules" :model="forgot.form">
                <el-form-item prop="contactInfo">
                  <el-input v-model="forgot.form.contactInfo" placeholder="请输入手机号/邮箱账号"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode">
                  <el-input v-model="forgot.form.verifyCode" placeholder="请输入验证码">
                    <a
                      slot="suffix"
                      :class="{'send-code': code.mode, 'anti-send-code': !code.mode}"
                      @click="getForgotCode"
                    >{{code.content}}</a>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="forgot.form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="verifyPassword">
                  <el-input
                    type="password"
                    v-model="forgot.form.verifyPassword"
                    placeholder="请再次输入密码"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  class="submit-button"
                  @click="findAccount(forgot.form)"
                >确 定</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>@2017Universal Ubiquitous Technology Co., Ltd. All rights reserved. 备案号：浙ICP备15002402号-1 浙公网安备33011002013282</span>
    </div>
  </div>
</template>

<script>
import {
  GetCode,
  Login,
  Register,
  UpdateForgotPassword,
  GetForgotCode
} from "../../api/account";
import { clearInterval } from "timers";
import {
  validPhone,
  validateRule,
  validPhoneEmail
} from "../../utils/validate";

export default {
  name: "login",
  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请再次输入密码"));
      } else if (
        value !== this.reg.form.password &&
        value !== this.forgot.form.password
      ) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请输入邮箱"));
      } else if (!validateRule(value, 8)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      login: {
        form: {
          phoneNumber: "",
          password: "",
          code: ""
        }
      },
      reg: {
        form: {
          phoneNumber: "",
          verifyCode: "",
          email: "",
          password: "",
          verifyPassword: "",
          readCheck: ""
        }
      },
      forgot: {
        form: {
          contactInfo: "",
          verifyCode: "",
          password: "",
          verifyPassword: ""
        }
      },
      code: {
        content: "发送验证码",
        time: 60,
        mode: 1,
        clock: null
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符之间",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        verifyPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" }
        ],
        readCheck: [{ required: true, message: "请确认阅读条款", trigger: "" }],
        contactInfo: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: ""
          },
          {
            validator: validPhoneEmail,
            trigger: "blur"
          }
        ]
      },
      clock: "",
      isSuccess: false,
      mode: "login"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 跳转并初始化
    skipTo(mode) {
      this._resetForm();
      this.mode = mode;
      window.clearInterval(this.code.clock);
      window.clearTimeout(this.clock);
      this.isSuccess = false;
      this.code = {
        content: "发送验证码",
        time: 60,
        mode: 1,
        clock: null
      };
      this.clock = null;
    },
    // 点击登录提交按钮
    submit(loginObj) {
      this._verifyForm(() => {
        const data = {
          phoneNumber: loginObj.phoneNumber,
          password: loginObj.password
        };
        Login(data).then(res => {
          if (res.data) {
            this._setSuccess(() => {
              this.$router.push("/index");
            });
          }
        });
      });
    },
    // 点击注册提交按钮
    registAccount(regObj) {
      const data = {
        phoneNumber: regObj
      };
      this._verifyForm(() => {
        Register(regObj).then(res => {
          if (res.data) {
            this._setSuccess(() => {
              this.$router.push("/index");
            });
          }
        });
      });
    },
    // 点击密码找回确定按钮
    findAccount(forgotObj) {
      const data = {
        contactInfo: forgotObj.contactInfo,
        verifyCode: forgotObj.verifyCode,
        password: forgotObj.password
      };
      this._verifyForm(() => {
        UpdateForgotPassword(data).then(res => {
          if (res.data) {
            this._setSuccess(() => {
              this.skipTo("login");
            });
          }
        });
      });
    },
    // 获取验证码
    getCode() {
      if (this.code.mode === 1) {
        const data = {
          phoneNumber: this.reg.form.phoneNumber
        };
        GetCode(data).then(res => {
          this._codeClock();
        });
      }
    },
    getForgotCode() {
      if (this.code.mode === 1) {
        const data = {
          contactInfo: this.forgot.form.contactInfo
        };
        GetForgotCode(data).then(res => {
          this._codeClock();
        });
      }
    },
    _codeClock() {
      this.code.clock = window.setInterval(() => {
        this.code.time--;
        this.code.content = this.code.time + "s后重新发送";
        this.code.mode = 0;
        if (this.code.time <= 0) {
          window.clearInterval(this.code.clock);
          this.code.time = 60;
          this.code.content = "重新发送验证码";
          this.code.mode = 1;
        }
      }, 1000);
    },
    _setSuccess(cb) {
      this.isSuccess = true;
      this.clock = window.setTimeout(res => {
        this.isSuccess = false;
        cb();
      }, 3000);
    },
    // 重置表单
    _resetForm() {
      this.$refs[this.mode].resetFields();
    },
    // 验证表单
    _verifyForm(cb) {
      this.$refs[this.mode].validate(valid => {
        if (valid) {
          cb();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 1280px;
  min-height: 728px;
  .banner,
  .footer {
    width: 100%;
    flex: 0 0 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    color: #909399;
    font-size: 12px;
  }
  .banner {
    padding-left: 60px;
    box-sizing: border-box;
    .logo {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/account/Logo@2x.png");
      background-repeat: no-repeat;
      background-size: 360px 40px;
      background-position: left center;
    }
  }
  .content {
    flex: 1;
    background-image: url("../../assets/account/background.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    .left-part {
      width: 50%;
    }
    .right-part {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .wrap {
        width: 560px;
        min-width: 560px;
        min-height: 460px;
        padding: 0 80px;
        box-sizing: border-box;
        text-align: center;
        background: rgba(255, 255, 255, 0.08);
        .error-tip {
          position: absolute;
          top: -45px;
          left: 0;
          background: rgba(249, 83, 89, 0.06);
          border: 1px solid rgba(249, 83, 89, 0.3);
          color: #f95359;
        }
        .success-tip {
          position: absolute;
          top: -45px;
          left: 0;
          background: rgba(43, 187, 89, 0.06);
          border: 1px solid rgba(43, 187, 89, 0.3);
          border-radius: 4px;
          color: #2bbb59;
        }
        .send-code {
          color: #0b7ef9;
          margin-right: 14px;
          cursor: pointer;
        }
        .anti-send-code {
          color: #bdbbcd;
          margin-right: 14px;
          cursor: default;
        }
        .title {
          margin-bottom: 32px;
          color: #ffffff;
          font-size: 24px;
        }
        .el-form-item {
          margin-bottom: 26px;
          .el-input {
            height: 50px;
            line-height: 50px;
            background: none;
            background-color: #e6efff;
            font-size: 14px;
          }
        }
        .submit-button {
          width: 400px;
          height: 50px;
          margin-bottom: 10px;
          background: #0b7ef9;
          font-size: 16px;
        }
      }
      .forgotBox {
        padding-top: 40px;
        padding-bottom: 40px;
        .title {
          float: left;
        }
      }
      .regBox {
        padding-top: 25px;
        padding-bottom: 0px;
        .title {
          margin-bottom: 18px;
          span:first-child {
            font-size: 24px;
            float: left;
          }
          span:last-child {
            line-height: 44px;
            font-size: 14px;
            float: right;
          }
        }
        .submit-button {
          margin-bottom: 24px;
        }
      }
      .loginBox {
        padding-top: 40px;
        padding-bottom: 40px;
        .code {
          .el-input {
            float: left;
            width: 230px;
            margin-right: 20px;
          }
          .num-pic {
            float: right;
            background: #ffffff;
            width: 150px;
            height: 50px;
          }
        }
        .option {
          color: white;
          span:first-child {
            float: left;
          }
          span:last-child {
            float: right;
          }
        }
      }
    }
  }
}
</style>
