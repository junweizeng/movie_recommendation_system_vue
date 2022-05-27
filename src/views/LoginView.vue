<template>
  <!--  <div class="bg" style="background-image: url('https://api.xygeng.cn/Bing/')"></div>-->
  <div class="bg"></div>
  <div
      name="animate__bounce"
      class="login-form my-border"
      @keyup.enter="postLogin"
  >

    <div class="login-form-header">
      <router-link to="/home">
        <img style="width: 75px; height: 75px; float: left; padding-right: 40px;" src="../assets/logo.png" alt="logo"/>
      </router-link>

      <div class="login-form-text">电影推荐系统 - 登录</div>
    </div>

    <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
      <el-form-item label="账 号" prop="username">
        <el-input
            class="login-form-input"
            placeholder="账 号"
            v-model="loginForm.username"
            autofocus
            autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-user/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="密 码" prop="password">
        <el-input
            class="login-form-input"
            placeholder="密 码"
            v-model="loginForm.password"
            show-password
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-lock/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <div class="scan-and-forget-div">
        <!--        <el-link href="/scanLogin" class="my-font" :underline="false">-->
        <!--          扫码登录-->
        <!--        </el-link>-->
        <el-link href="/forget" class="my-font" :underline="false">
          忘记密码?
        </el-link>
      </div>

      <el-form-item>
        <el-button @click="postLogin" class="login-form-button" type="primary">登 录</el-button>
      </el-form-item>
    </el-form>

    <div class="login-form-footer">
      <el-link href="/register" class="my-font" style="font-size: 16px" :underline="false">
        还没有账号？去注册
        <i style="font-weight: bolder; font-size: 15px" class="el-icon-right"></i>
      </el-link>
    </div>
  </div>
</template>

<script>
import {Lock as IconLock, User as IconUser} from "@element-plus/icons";
import {reactive, ref, unref} from "vue";
import {useRouter} from "vue-router";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import userRequest from "@/api/user";
import {debounce} from "@/utils/debounce-throttle";

export default {
  name: 'LoginView',
  components: {
    IconUser,
    IconLock,
  },
  setup() {
    const router = useRouter()
    let remember = ref(false)
    const loginFormRef = ref('')

    const loginForm = reactive({
      username: '',
      password: '',
    })

    const rules = reactive({
      username: [
        {required: true, message: '请输入账号', trigger: 'blur'},
        {min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur'}
      ],
    })

    const postLogin = debounce(async () => {
      const form = unref(loginFormRef)
      if (!form) {
        return
      }
      try {
        await form.validate()
        userRequest.login(loginForm).then(res => {
          if (res.code === 200) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
            SuccessMessage(res.msg)
            // 登录成功之后，进行页面跳转
            router.replace("/")
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          ErrorMessage(err)
        })
      } catch (err) {
        console.log(err)
      }
    })

    return {
      remember,
      loginFormRef,
      loginForm,
      rules,
      postLogin,
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
}

.login-form {
  width: 28rem;
  position: absolute;
  left: 50%;
  top: 10rem;
  transform: translate(-50%, 0);
  padding: 2rem;
  margin-top: 1rem;
  letter-spacing: 2px;
}

.login-form-header {
  height: 20px;
  padding-left: 45px;
  padding-bottom: 100px;
}

.login-form-text {
  color: #000000;
  font-weight: bold;
  font-size: 1.8rem;
  padding-top: 15px;
}

.login-form-input {
  margin-bottom: 10px;
}

.login-form-button {
  border-radius: 3px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 2px;
  height: 3.5rem;
  background: #5a84fd;
  margin-top: 35px;
}

.login-form-button:hover {
  box-shadow: 0 10px 30px #2156f6;
  transition: 3s;
}

.scan-and-forget-div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.my-font {
  font-weight: bolder;
  font-size: 14px;
  color: #91949c;
}

.my-font:hover {
  color: #5a84fd;
}

.login-form-footer {
  font-weight: bolder;
  color: #91949c;
  padding-top: 1.5rem;
  text-align: center;
}

/deep/ .el-input__inner {
  height: 3rem;
}

.el-checkbox {
  color: #91949c;
  font-weight: bolder;
  font-size: 15px;
}

/deep/ .el-form-item__label {
  color: #91949c;
  font-weight: bold;
}

/deep/ .el-form-item {
  align-items: baseline;
}

.bg-change {
  background-color: #e74c3c;
  animation: bg-color 20s infinite;
  -webkit-animation: bg-color 20s infinite;
}

@-webkit-keyframes bg-color {
  0% {
    background-color: #f18f87;
  }
  20% {
    background-color: #ead18c;
  }
  40% {
    background-color: #8be1d1;
  }
  60% {
    background-color: #8cbee1;
  }
  80% {
    background-color: #cba2e1;
  }
  100% {
    background-color: #f18f87;
  }
}

@keyframes bg-color {
  0% {
    background-color: #f18f87;
  }
  20% {
    background-color: #ead18c;
  }
  40% {
    background-color: #8be1d1;
  }
  60% {
    background-color: #8cbee1;
  }
  80% {
    background-color: #cba2e1;
  }
  100% {
    background-color: #f18f87;
  }
}
</style>
