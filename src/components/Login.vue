<template>
  <div class="login-module">
    <el-dialog
      :visible="show"
      width="480px"
      center
      :show-close="true"
      :destroy-on-close="true"
      @close="close"
    >
      <div class="login-wrap">
        <el-form
          :model="form"
          ref="loginForm"
          :label-width="`${isZh ? '50px' : '80px'}`"
          class="demo-dynamic"
        >
          <el-form-item
            prop="email"
            :label="`${isZh ? '邮箱' : 'Email'}`"
            :rules="[
              {
                required: true,
                message: isZh
                  ? '请输入邮箱地址'
                  : 'Please enter your email address',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="form.email"
              :placeholder="`${
                isZh ? '请输入邮箱' : 'Please enter your email address'
              }`"
              @keydown.native="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="`${isZh ? '密码' : 'Password'}`"
            prop="password"
            :rules="[
              {
                required: true,
                message: isZh ? '请输入密码' : 'Please enter password',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              type="password"
              v-model="form.password"
              :placeholder="`${isZh ? '请输入密码' : 'Please enter password'}`"
              @keydown.native="inputChange"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="login-footer">
        <div
          class="login-btn"
          :class="`${disabled ? 'disabled' : ''}`"
          @click="login"
        >
          {{ isZh ? "登录" : "Login in" }}
        </div>
        <div class="forget-password">
          <span class="password" @click="forgetPassword"
            >{{ isZh ? "忘记密码" : "Forgot password" }}?</span
          >
          <span class="register" @click="register"
            >{{ isZh ? "去注册" : "Go to Register" }}>></span
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { emailLogin } from "@/api/user.js";
import { closeLogin } from "@/utils/login.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      visible: true,
      loading: false,
    };
  },
  props: ["router", "id"],
  computed: {
    isZh() {
      console.log(1111, this, localStorage.getItem("locale") || "Zh");
      return (localStorage.getItem("locale") || "Zh") === 'Zh';
    },
    lang() {
      return localStorage.getItem("locale");
    },
    show() {
      console.log(11, this.visible);
      return this.visible;
    },
    disabled() {
      return this.loading || !this.form.email || !this.form.password;
    }
  },
  methods: {
    close() {
      closeLogin();
    },
    // 键盘输入
    inputChange(event) {
      const keyCode = event.keyCode || event.which;
      if (keyCode == 13) {
        this.login();
      }
    },
    // 登录
    login() {
      this.loading = true;
      console.log('this.$refs' , this.$refs.loginForm)
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await emailLogin(this.form).finally(
            () => (this.loading = false)
          );
          console.log("去登录>>>>>>", res);
          if (res?.token) {
            closeLogin();
            Cookies.set("token", res?.token, { expires: 10 }); // 10天过期
            this.$message.success(this.isZh ? "登录成功" : "Login successful");
            window.location.reload();
          }
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      console.log("router>>>>>>>", window.instanceVue.$router);
      closeLogin();
      window.instanceVue.$router.push({
        path: "/register",
      });
    },
    forgetPassword() {
      closeLogin();
      window.instanceVue.$router.push({
        path: "/forgetPassword",
      });
    },
  },
  created() {
    console.log("login>>>>>>>>", this);
  },
};
</script>
<style lang="less" scoped>
.login-module {
  /deep/ .el-dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    padding-right: 15px;
    padding-top: 15px;
    transform: translate(-50%, -50%);
    margin-top: 0 !important;
    border-radius: 12px;
    background-color: #f3f3f3;
    z-index: 999;
  }
  /deep/ .el-dialog__body {
    padding-bottom: 0;
  }
  /deep/ .el-form-item {
    margin-bottom: 40px;
  }
  /deep/ .el-form-item__label {
    color: #000;
    &::before {
      content: "";
      display: none;
    }
  }
  /deep/ .el-input__inner:focus {
    border-color: #dcdfe6;
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 60px;
    padding-top: 0;
  }
  .login-footer {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 87%;
    background: #ed6336;
    border-radius: 12px 12px 12px 12px;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  .forget-password {
    margin-top: 30px;
    color: #ed6336;
    font-size: 14px;
    cursor: pointer;
    text-align: right;
    .register {
      margin-left: 15px;
    }
    .password {
      border-bottom: 1px solid transparent;
      &:hover {
        border-color: #ed6336;
      }
    }
  }
}
</style>
