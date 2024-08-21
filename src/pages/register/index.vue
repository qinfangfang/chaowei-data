<template>
  <div class="register-module">
    <div class="title">注册</div>
    <div class="register-wrap">
      <el-form
        :model="form"
        ref="registerForm"
        label-width="80px"
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
            :autocomplete="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.emailCode"
          prop="emailCode"
          label="验证码"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="form.emailCode"
            placeholder="请输入验证码"
            :autocomplete="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn">注册</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      form: {
        email: "",
        password: "",
        emailCode: "",
      },
    };
  },
  created() {
    this.form.emailCode = this.$route.query?.emailCode;
  }
};
</script>
<style lang="less" scoped>
.register-module {
  height: 100vh;
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 150px;
  .title {
    width: 480px;
    margin: 0 auto;
    color: #000;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  .register-wrap {
    width: 480px;
    margin: 60px auto 0;
    /deep/ .el-form-item {
      margin-bottom: 50px;
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
  }
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
    margin-top: 50px;
    background: #ed6336;
    border-radius: 12px 12px 12px 12px;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
</style>
