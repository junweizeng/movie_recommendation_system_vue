<template>
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
            <el-icon class="el-input__icon"><icon-user/></el-icon>
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
            <el-icon class="el-input__icon"><icon-lock/></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <div style="padding-top: 10px">
        <el-checkbox v-model="remember">记住密码</el-checkbox>
        <div style="float: right">
          <el-link href="/forget" style="font-weight: bolder;font-size: 14px;color: #91949c;"
                   :underline="false">
            忘记密码?
          </el-link>
        </div>
      </div>

      <el-form-item>
        <el-button @click="postLogin" class="login-form-button" type="primary">登 录</el-button>
      </el-form-item>
    </el-form>

    <div class="login-form-footer">
      <el-link href="/register" style="font-weight: bolder;font-size: 16px;color: #91949c;"
               :underline="false">
        还没有账号？去注册
        <i style="font-weight: bolder; font-size: 15px" class="el-icon-right"></i>
      </el-link>
    </div>
  </div>


</template>

<script>
import {Lock as IconLock, User as IconUser} from "@element-plus/icons";
import {reactive, ref, unref} from "vue";
import request from "@/utils/request";
import {useRouter} from "vue-router";
import { ElMessage } from 'element-plus'
import {FormInstance} from "element-plus";

export default {
  name: 'login',
  components: {
    IconUser,
    IconLock,
  },
  setup() {
    let router = useRouter()
    let remember = ref(false)
    const loginFormRef = ref('')

    const loginForm = reactive({
      username: '',
      password: '',
    })


    const rules = reactive({
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur'}
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur'}
      ],
    })

    let postLogin = async () => {
      const form = unref(loginFormRef)
      if (!form) {
        return
      }
      try {
        await form.validate()
        request.post("/user/login", loginForm).then(res => {
          if (res.code === 200) {
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            ElMessage({
              type: "success",
              message: res.msg,
              showClose: true,
            })
            // 登录成功之后，进行页面跳转
            router.replace("/")
          } else {
            ElMessage({
              type: "error",
              message: res.msg,
              showClose: true,
            })
          }
        }).catch(err => {
          ElMessage({
            type: "error",
            message: err,
            showClose: true,
          })
        })
      } catch (err) {
        console.log(err)
      }
    }

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

<style scoped>

.login-form {
  width: 28rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
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
  height: 60px;
  background: #5a84fd;
  /*box-shadow: 0 5px 30px rgb(0 66 8);*/
  margin-top: 35px;
}

.login-form-footer {
  font-weight: bolder;
  color: #91949c;
  padding-top: 1.5rem;
  text-align: center;
}

>>> .el-input__inner {
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

</style>
