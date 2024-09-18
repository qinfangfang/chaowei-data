<template>
  <el-dialog
    width="520px"
    center
    :visible="visible"
    :show-close="true"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    class="invoice-dialog"
    @close="close"
  >
    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
        class="invoice-form"
      >
        <el-form-item label="公司抬头" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入公司抬头"
          ></el-input>
        </el-form-item>
        <el-form-item label="发票接收邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入发票接收邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公司税号"
          prop="taxNo"
          placeholder="请输入公司税号"
        >
          <el-input v-model="form.taxNo"></el-input>
        </el-form-item>
        <el-form-item
          label="发票内容"
          prop="content"
          placeholder="请输入发票内容"
        >
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitForm('form')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        email: "",
        taxNo: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入公司抬头", trigger: "blur" }],
        email: [
          { required: true, message: "请输入发票接收邮箱", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.form);
        } else {
          return false;
        }
      });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.invoice-dialog {
  /dedp/ .el-dialog {
    border-radius: 10px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close:hover {
    color: #ed6336;
  }
  .submit-btn {
    width: 60%;
    margin: 0 auto;
    border-color: #ed6336;
    background-color: #ed6336;
  }
}
</style>
