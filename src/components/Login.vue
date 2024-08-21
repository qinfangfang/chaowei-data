<template>
  <div class="login-module">
    <el-dialog :visible="show" width="480px" center :show-close="false">
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
        <div class="login-btn" @click="login">登录</div>
        <div class="forget-password">
          <span class="password" @click="forgetPassword">忘记密码?</span>
          <span class="register" @click="register">去注册>></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    show() {
      console.log(11, this);
      return this.visible;
    },
  },
  methods: {
    login() {
      console.log("去登录");
    },
    register() {
      this.$router.push({
        path: '/register'
      });
    },
    forgetPassword() {
      this.$router.push({
        path: '/forgetPassword'
      })
    }
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
