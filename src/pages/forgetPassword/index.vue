<template>
  <div class="register-module">
    <div class="title">{{ isZh ? "忘记密码" : "Forgot Password" }}</div>
    <div class="register-wrap">
      <el-form
        :model="form"
        ref="registerForm"
        label-width="80px"
        class="demo-dynamic"
      >
        <el-form-item
          v-if="!form.emailCode"
          prop="email"
          :label="`${isZh ? '邮箱' : 'Mailbox'}`"
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
              isZh ? '请输入邮箱地址' : 'Please enter your email address'
            }`"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.emailCode"
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
            autocomplete="off"
            :placeholder="`${isZh ? '请输入密码' : 'Please enter password'}`"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
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
        </el-form-item> -->
        <el-form-item>
          <div class="submit-btn" @click="submit">
            {{ isZh ? "提交" : "Submit" }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { emailForgotPwd, emailResetPwd } from "@/api/user.js";

export default {
  name: "forgetPassword",
  data() {
    return {
      form: {
        email: "",
        password: "",
        emailCode: "",
      },
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
    async submit() {
      const { email, password, emailCode } = this.form;
      if (emailCode) {
        const res = await emailResetPwd({ emailCode, password });
        if (res?.code) {
          res?.msg && this.$message.error(res?.msg);
        } else {
          this.$message.success(this.isZh ? "设置成功" : "Successful setting");
          this.$router.push("/home");
        }
        console.log("通过邮件重置密码>>>>>>>>>", res);
      } else {
        const res = await emailForgotPwd({ email });
        if (res?.code) {
          res?.msg && this.$message.error(res?.msg);
        } else {
          this.$message.success(this.isZh ? "发送成功" : "Send successfully");
        }
        console.log("忘记密码邮件>>>>>>>>>发送邮件", res);
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
  height: calc(100vh - 100px);
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
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
