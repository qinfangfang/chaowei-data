<template>
  <div class="register-module">
    <div class="title">{{ isZh ? "修改密码" : "Change Password" }}</div>
    <div class="register-wrap">
      <el-form
        :model="form"
        ref="registerForm"
        label-width="80px"
        class="demo-dynamic"
      >
        <el-form-item
          :label="`${isZh ? '原密码' : 'Old Password'}`"
          prop="originalPassword"
          :rules="[
            {
              required: true,
              message: isZh ? '请输入原密码' : 'Please enter the old password',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            type="password"
            v-model="form.originalPassword"
            :placeholder="`${
              isZh ? '请输入原密码' : 'Please enter the old password'
            }`"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="`${isZh ? '新密码' : 'New Password'}`"
          prop="newPassword"
          :rules="[
            {
              required: true,
              message: isZh ? '请输入新密码' : 'Please enter your new password',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            type="password"
            v-model="form.newPassword"
            :placeholder="`${
              isZh ? '请输入新密码' : 'Please enter your new password'
            }`"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="submit">
            {{ isZh ? "确认修改" : "Confirm Modification" }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { changePwd } from "@/api/user.js";

export default {
  name: "changePassword",
  data() {
    return {
      loading: false,
      form: {
        originalPassword: "",
        newPassword: "",
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
      // const { originalPassword, newPassword } = this.form;
      const res = await changePwd(this.form);
      if (res?.code) {
        res?.msg && this.$message.error(res?.msg);
      } else {
        this.$message.success(this.isZh ? "修改成功" : "Modified successfully");
        this.$router.push("/home");
      }
    },
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
