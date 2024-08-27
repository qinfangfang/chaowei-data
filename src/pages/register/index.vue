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
          v-if="!form.emailCode"
          label="昵称"
          prop="nickname"
          :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
        >
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.emailCode"
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.emailCode"
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
          v-if="false && form.emailCode"
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
          <div class="submit-btn" @click="registerClick">注册</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { sendEmailRegister, emailRegister, emailLogin } from "@/api/user.js";
import Cookies from "js-cookie";
export default {
  name: "register",
  data() {
    return {
      form: {
        email: "",
        nickname: "",
        password: "",
        emailCode: "",
      },
    };
  },
  methods: {
    async registerClick() {
      const { email, nickname, emailCode, password } = this.form;
      if (!this.form.emailCode) {
        // 发送邮件注册
        const res = await sendEmailRegister({
          email,
          nickname,
        });
        console.log("发送邮件注册>>>>>>", res);
        // localStorage.setItem("email", email);
      } else if (this.form.emailCode) {
        const res = await emailRegister({
          password,
          emailCode,
          gender: 0,
        });
        console.log("注册>>>>>>", res);
        if (res?.code != "0") {
          this.$message.error(res?.msg);
          return;
        }
        if (_data?.token) {
          this.$router.push("/home");
        }
        // if (localStorage.getItem("email")) {
        //   const _data = await emailLogin({
        //     email: localStorage.getItem("email"),
        //     password,
        //   });
        //   _data?.token && Cookies.set("token", _data?.token, { expires: 1 });
        //   console.log("登录>>>>>>>>>",  _data?.token);
        //   if(_data?.token) {
        //     this.$router.push('/home');
        //   }
        // }
      }
    },
  },
  created() {
    this.form.emailCode = this.$route.query?.code;
  },
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
