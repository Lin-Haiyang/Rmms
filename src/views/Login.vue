<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login_from"
    >
      
      <el-form-item label="账号" prop="username" class="">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login.js";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "账号长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.username, this.password).then((res) => {
            const resMsg = res.data;
            console.log(resMsg);
            if (resMsg.flag) {
              getUserInfo(resMsg.data.token).then((res) => {
                const resUser = res.data;
                if (resUser.flag) {
                  localStorage.setItem(
                    "rmms-user",
                    JSON.stringify(resUser.data)
                  );
                  localStorage.setItem(
                    "rmms-user-token",
                    resMsg.data.token
                  );
                  this.$message({
                    showClose: true,
                    message: resMsg.message,
                    type: "success",
                  });
                  this.$router.push("/");
                } else {
                  this.$message({
                    showClose: true,
                    message: resUser.message,
                    type: "error",
                  });
                }
              });
            } else {
              this.$message({
                showClose: true,
                message: resMsg.message,
                type: "error",
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "登录失败",
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/b2.jpg");
  background-size: cover;
}
.login_from {
  text-align: center;
  padding: 30px 40px 0 10px;
  width: 350px;
  height: 250px;
  margin: 200px auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}
.el-input {
  width: 200px;
}
.el-button {
  margin-top: 30px;
  margin-right: 60px;
}
</style>