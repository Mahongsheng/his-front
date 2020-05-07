<template>
  <div class="login-container">
    <el-form
      :model="user"
      status-icon
      ref="user"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h2 class="title">HIS系统登录</h2>
      <el-form-item prop="username">
        <el-input
          autofocus
          type="text"
          v-model="user.username"
          placeholder="用户名"
          @keyup.enter.native="submit()"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="user.password"
          placeholder="密码"
          @keyup.enter.native="submit()"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      permisson: ""
    };
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'margin = 0;')
  },
  methods: {
    submit() {
      sessionStorage.setItem("user", this.user.username);

      const loading = this.$loading({
        lock: true,
        target: document.querySelector(".div1")
      });

      //设置登陆延迟
      setTimeout(() => {
        loading.close();
        this.$router.push({ path: "/home-admin" });
        this.$message({
          message: "登陆成功！",
          type: "success"
        });
      }, 2000);
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 20px #cac6c6;
}

.title {
  text-align: center;
}
</style>