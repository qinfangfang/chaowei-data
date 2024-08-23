<template>
  <div class="register-module">
    <div class="title">忘记密码</div>
    <div class="register-wrap">
      <el-form
        :model="form"
        ref="registerForm"
        label-width="80px"
        class="demo-dynamic"
      >
        <el-form-item
          label="原密码"
          prop="originalPassword"
          :rules="[
            { required: true, message: '请输入原密码', trigger: 'blur' },
          ]"
        >
          <el-input
            type="password"
            v-model="form.originalPassword"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
          :rules="[
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ]"
        >
          <el-input
            type="password"
            v-model="form.newPassword"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn" @click="submit">确认修改</div>
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
  methods: {
    async submit() {
      // const { originalPassword, newPassword } = this.form;
      const res = await changePwd(this.form);
      if(res?.code) {
        res?.msg && this.$message.error(res?.msg);
      } else {
        this.$message.success('修改成功');
        this.$router.push('/home');
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
