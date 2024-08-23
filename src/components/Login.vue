<template>
  <div class="login-module">
    <el-dialog :visible="show" width="480px" center :show-close="true" :destroy-on-close="true" @close="close">
      <div class="login-wrap">
        <el-form
          :model="form"
          ref="loginForm"
          label-width="50px"
          class="demo-dynamic"
        >
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]"
          >
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="login-footer">
        <div
          class="login-btn"
          :class="`${loading ? 'disabled' : ''}`"
          @click="login"
        >
          登录
        </div>
        <div class="forget-password">
          <span class="password" @click="forgetPassword">忘记密码?</span>
          <span class="register" @click="register">去注册>></span>
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
    show() {
      console.log(11, this.visible);
      return this.visible;
    },
  },
  methods: {
    close() {
      closeLogin();
    },
    async login() {
      this.loading = true;
      const res = await emailLogin(this.form).finally(() => (this.loading = false));
      console.log("去登录>>>>>>", res);
      if (res?.token) {
        closeLogin();
        Cookies.set("token", res?.token, { expires: 10 });  // 10天过期
        this.$message.success("登录成功");
        window.location.reload();
      }
    },
    register() {
      console.log("router>>>>>>>", this.router);
      closeLogin();
      this.router.push({
        path: "/register",
      });
    },
    forgetPassword() {
      closeLogin();
      this.router.push({
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