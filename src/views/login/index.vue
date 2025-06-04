<template>
  <div class="login-container">
    <div class="login-header">
      <h2>欢迎登录</h2>
      <p class="sub-title">请输入您的账号和密码</p>
    </div>

    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
          />
          <van-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
            @click-right-icon="showPassword = !showPassword"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 登录 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "vant";

const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    tenantName: "",
    username: "",
    password: "",
    captchaVerification: "",
    rememberMe: false,
  },
});

const onSubmit = (values: any) => {
  console.log("submit", values);
  showToast("登录成功");
};
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  padding: 20px;
  background-color: #f7f8fa;

  .login-header {
    padding: 48px 0 24px;
    text-align: center;

    h2 {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: bold;
      color: #323233;
    }

    .sub-title {
      margin: 0;
      font-size: 22px;
      color: #969799;
    }
  }

  .login-form {
    margin-top: 24px;
  }
}
</style>
