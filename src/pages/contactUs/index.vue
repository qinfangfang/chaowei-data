<template>
  <div class="contact-us">
    <div class="contact-us-left">
      <div class="contact-us-title">网站支持</div>
      <div class="contact-us-text">
        如果您遇到的问题未能在“常见问题”或我们的教程中未找到答案。我们非常乐意帮您解决问题。
      </div>
      <div class="contact-us-form">
        <div class="form-left">
          <div class="title">商务联系、模型定制</div>
          <div class="info-item"><span>联系人：</span>刘先生</div>
          <div class="info-item"><span>Email：</span>564645453@163.com</div>
          <div class="info-item"><span>Tel：</span>15048758989</div>
          <div class="info-item">
            <span>数据采集场地：</span
            ><br />浙江省嘉兴市南湖区亚太路778号2号楼C区4层
          </div>
        </div>
        <div class="form-right">
          <div class="title">填写工单</div>
          <div class="input-item">
            <el-input v-model="form.name" placeholder="你的姓名"></el-input>
          </div>
          <div class="input-item">
            <el-input
              v-model="form.linkWay"
              placeholder="联系方式 Email or 电话"
            ></el-input>
          </div>
          <div class="input-item textarea">
            <el-input
              type="textarea"
              placeholder="请简单描述你的问题"
              v-model="form.desc"
            >
            </el-input>
          </div>
          <div class="input-item">
            <el-button type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-us-right">
      <img
        src="http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "contactUs",
  data() {
    return {
      form: {
        name: "",
        linkWay: "",
        desc: "",
      },
    };
  },
};
</script>
<style lang="less" scoped>
.contact-us {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 100px);
  padding: 60px 135px;
  background-color: #f3f3f3;
  .contact-us-left {
    margin-right: 70px;
    padding: 15px 50px 30px;
    background-color: #e5e5e5;
    border-radius: 44px;
    .contact-us-title {
      font-family: Inter, Inter;
      font-weight: bold;
      font-size: 50px;
      color: #000;
      line-height: 75px;
    }
    .contact-us-text {
      margin-top: 5px;
      font-family: Inter, Inter;
      font-weight: 400;
      font-size: 20px;
      color: #000;
      line-height: 28px;
    }
    .contact-us-form {
      display: flex;
      justify-content: space-between;
      .form-left,
      .form-right {
        padding-top: 40px;
        .title {
          font-family: Inter, Inter;
          font-weight: bold;
          font-size: 24px;
          color: #000;
          line-height: 28px;
        }
      }
      .form-left {
        .title {
          margin-bottom: 100px;
        }
        .info-item {
          margin-bottom: 10px;
          font-family: Inter, Inter;
          font-weight: 400;
          font-size: 20px;
          color: #000000;
          line-height: 28px;
        }
      }
      .form-right {
        width: 320px;
        .title {
          margin-bottom: 40px;
        }
        .input-item {
          margin-bottom: 20px;
          &.textarea {
            /deep/ .el-textarea__inner {
              height: 280px;
              border-radius: 8px;
              resize: none;
              text-align: justify;
            }
          }
          /deep/ .el-button {
            width: 100%;
            border-radius: 12px;
            &.el-button--primary {
              background-color: #ED6336;
              border-color: #ED6336;
            }
          }
          /deep/ .el-input__inner {
            height: 45px;
            padding: 0 20px;
            color: #000;
            text-align: center;
            border-radius: 8px;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .contact-us-right {
    width: 450px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
