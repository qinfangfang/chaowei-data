<template>
  <div class="contact-us">
    <div class="contact-us-left">
      <div class="contact-us-form">
        <div class="form-left">
          <div class="contact-us-title">{{ isZh ? '网站支持' : 'Contact Us'}}</div>
          <div class="contact-us-text">
            {{ isZh ? '如果您遇到的问题未能在“常见问题”或我们的教程中未找到答案。我们非常乐意帮您解决问题。' : 'If you have a question that is not answered in the FAQ or in one of our tutorials, please feel free to contact us. We are always happy to help!' }}
          </div>
          <div class="title">{{ isZh ? '商务联系、模型定制' : 'Business contact\nModel customization'}}</div>
          <div class="info-item" :class="`${lang}`"><span>{{ isZh ? '联系人' : 'Contact'}}：</span>{{ isZh ? '张先生' : 'Mr. Zhang'}}</div>
          <div class="info-item" :class="`${lang}`"><span>Email：</span>service@peoplegroundtruth.com</div>
          <div class="info-item" :class="`${lang}`"><span>Tel：</span>+86 18217172515</div>
          <div class="info-item" :class="`${lang}`">
            <span>{{ isZh ? '数据采集场地' : 'Model acquisition site'}}：</span><br />{{ isZh ? '浙江省嘉兴市南湖区亚太路778号2号楼C区4层' : 'Building 2, No. 778, YaTai Road, Nanhu District,\nJiaxing City, Zhejiang Province, China'}}
          </div>
        </div>
        <div class="form-right">
          <div class="title">{{ isZh ?  '填写工单' : 'WORK ORDER'}}</div>
          <div class="input-item">
            <el-input v-model="form.name" :placeholder="`${isZh ? '你的姓名' : 'Name'}`"></el-input>
          </div>
          <div class="input-item">
            <el-input v-model="form.linkWay" placeholder="Email"></el-input>
          </div>
          <div class="input-item textarea">
            <el-input type="textarea" :placeholder="`${isZh ? '请简单描述你的问题' : 'MESSAGE'}`" v-model="form.desc">
            </el-input>
          </div>
          <div class="input-item">
            <el-button @click="submitForm" type="primary">{{ isZh ? '发送' : 'SEED MESSAGE'}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="contact-us-right">
      <img src="http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" alt="" />
    </div> -->
  </div>
</template>

<script>
import {
  customerTicket
} from "@/api/user.js";
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
  computed: {
    isZh() {
      return this.$i18n.locale == "Zh";
    },
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    submitForm() {
      const params = {
        nickname: this.form.name,
        content: this.form.linkWay,
        email: this.form.desc
      }
      customerTicket(params).then(res => {
        this.$message.success('提交成功~请等待我们工作人员和您联系！')
        this.form.name = ''
        this.form.linkWay = ''
        this.form.desc = ''
      })
    }
  }
};
</script>
<style lang="less" scoped>
.contact-us {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 100px);
  padding: 0px 100px;
  background-color: #f3f3f3;
  overflow: auto;

  .contact-us-left {
    flex: 1;
    margin-right: 70px;
    padding: 15px 50px 30px;
    // background-color: #e5e5e5;
    border-radius: 44px;
    // height: inherit;

    .contact-us-title {
      font-family: Inter, Inter;
      font-weight: bold;
      font-size: 40px;
      color: #000;
      line-height: 75px;
    }

    .contact-us-text {
      margin-top: 5px;
      font-family: Inter, Inter;
      font-weight: 400;
      font-size: 16px;
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
        margin-right: 15px;
        .title {
          margin-bottom: 100px;
          white-space: pre-wrap;
        }

        .info-item {
          margin-bottom: 10px;
          font-family: Inter, Inter;
          font-weight: 400;
          font-size: 15px;
          color: #000000;
          line-height: 28px;
          white-space: pre-wrap;
          &.En {
            font-size: 13px;
          }
          &:last-child {
            margin-top: 30px;
          }
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
              text-align: center;
              border-color: #DCDFE6 !important;
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
            border-color: #DCDFE6 !important;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .contact-us-right {
    width: 400px;
    flex-shrink: 0;

    img {
      display: block;
      width: 100%;
    }
  }
}</style>
