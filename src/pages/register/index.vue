<template>
  <div class="register-module">
    <div v-if="inputContentVis" class="title">{{isZh ? '注册' : 'Register'}}</div>
    <div v-if="inputContentVis" class="register-wrap">
      <el-form
        :model="form"
        ref="registerForm"
        :label-width="`${isZh ? '80px' : '180px'}`"
        class="demo-dynamic"
      >
        <el-form-item
          v-if="!form.emailCode"
          :label="`${isZh ? '昵称' : 'Nickname'}`"
          prop="nickname"
          :rules="[{ required: true, message: isZh ? '请输入昵称' : 'Please enter a nickname', trigger: 'blur' }]"
        >
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            :placeholder="`${isZh ? '请输入昵称' : 'Please enter a nickname'}`"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.emailCode"
          prop="email"
          :label="`${isZh ? '邮箱' : 'Email'}`"
          :rules="[
            { required: true, message: isZh ? '请输入邮箱地址' : 'Please enter your email address', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.email" :placeholder="`${isZh ? '请输入邮箱' : 'Please enter your email address'}`"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.emailCode"
          :label="`${isZh ? '密码' : 'Password'}`"
          prop="password"
          :rules="[{ required: true, message: isZh ? '请输入密码' : 'Please enter password', trigger: 'blur' }]"
        >
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            :placeholder="`${ isZh ? '请输入密码' : 'Please enter password'}`"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="false && form.emailCode"
          prop="emailCode"
          :label="`${isZh ? '验证码' : 'Verification code'}`"
          :rules="[
            { required: true, message: isZh ? '请输入验证码' : 'Please enter the verification code', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="form.emailCode"
            :placeholder="`${isZh ? '请输入验证码' : 'Please enter the verification code'}`"
            :autocomplete="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="registerClick">{{isZh ? '注册' : 'Register' }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="success-tip-wrap">{{isZh ? '已发送邮件！请前往邮箱注册账号' : 'Email sent!  Please go to email to register an account'}}</div>
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
      inputContentVis: true,
    };
  },
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
    lang() {
      return this.$i18n.locale;
    },
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
        this.inputContentVis = false;
        // localStorage.setItem("email", email);
      } else if (this.form.emailCode) {
        const res = await emailRegister({
          password,
          emailCode,
          gender: 0,
        });
        console.log("注册>>>>>>", res);
        res?.token && Cookies.set("token", res?.token, { expires: 10 });
        this.$router.push("/home");

        // if (res?.code != "0") {
        //   this.$message.error(res?.msg);
        //   return;
        // }
        // if (_data?.token) {
        //   this.$router.push("/home");
        // }
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
    width: 600px;
    margin: 0 auto;
    color: #000;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  .register-wrap {
    width: 600px;
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
  .success-tip-wrap {
    margin-top: 50px;
    text-align: center;
    font-size: 26px;
  }
}
</style>
