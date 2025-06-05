<template>
  <div class="h-screen flex flex-col items-center bg-white p-12">
    <h2 class="text-2xl font-bold mb-12">{{ title }}</h2>
    <van-form @submit="handleLogin" label-width="50px">
      <div class="border-1 border-gray-200 border-solid rounded-lg">
        <van-cell-group inset>
          <van-field
            v-model="loginData.loginForm.username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
          />
          <van-field
            v-model="loginData.loginForm.password"
            :type="loginData.isShowPassword ? 'text' : 'password'"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :right-icon="loginData.isShowPassword ? 'eye-o' : 'closed-eye'"
            @click-right-icon="loginData.isShowPassword = !loginData.isShowPassword"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
      </div>

      <div class="mt-12">
        <van-button round block type="primary" native-type="submit" :loading="loginLoading">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { closeToast, showLoadingToast, showToast } from "vant";
import * as LoginApi from "@/api/login";
import * as authUtil from "@/utils/auth";
import type { RouteLocationNormalizedLoaded } from "vue-router";
const { currentRoute, push } = useRouter();
const loginLoading = ref(false);
const redirect = ref<string>("");

const title = import.meta.env.VITE_APP_TITLE;

const loginData = reactive({
  isShowPassword: false,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    tenantName: "飞隆客",
    username: "",
    password: "",
    captchaVerification: "",
    rememberMe: false,
  },
});

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string;
  },
  {
    immediate: true,
  }
);

//获取租户ID
const getTenantId = async () => {
  if (loginData.tenantEnable === "true") {
    const res = await LoginApi.getTenantIdByName(loginData.loginForm.tenantName);
    authUtil.setTenantId(res);
  }
};

// 登录
const handleLogin = async () => {
  loginLoading.value = true;
  try {
    await getTenantId();

    const res = await LoginApi.login(loginData.loginForm);
    if (!res) {
      return;
    }
    showLoadingToast({
      message: "正在加载系统中...",
    });
    if (loginData.loginForm.rememberMe) {
      authUtil.setLoginForm(loginData.loginForm);
    } else {
      authUtil.removeLoginForm();
    }
    authUtil.setToken(res);
    if (!redirect.value) {
      redirect.value = "/";
    }
    push({ path: redirect.value });
  } catch {
    loginLoading.value = false;
  } finally {
    setTimeout(() => {
      closeToast();
    }, 400);
  }
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
