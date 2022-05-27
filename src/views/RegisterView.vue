<template>
  <!--  <div class="bg" style="background-image: url('https://api.xygeng.cn/Bing/')"></div>-->
  <div class="login-form my-border" @keyup.enter="postRegister">

    <div class="login-form-header">
      <router-link to="/home">
        <img style="width: 75px; height: 75px; float: left; padding-right: 40px;" src="../assets/logo.png" alt="logo"/>
      </router-link>

      <div class="login-form-text">电影推荐系统 - 登录</div>
    </div>

    <el-form ref="registerFormRef" :model="registerForm" :rules="rules">
      <el-form-item label="账 号" prop="username">
        <el-input
            class="login-form-input"
            placeholder="账 号"
            v-model="registerForm.username"
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
            v-model="registerForm.password"
            show-password
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-lock/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="确 认" prop="checkPass">
        <el-input
            class="login-form-input"
            placeholder="密 码 确 认"
            v-model="registerForm.checkPass"
            show-password
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-lock/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="agree">
        <el-checkbox v-model="agree">我已同意"电影推荐系统"用户注册协议!</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button @click="postRegister" class="login-form-button" type="primary">注 册</el-button>
      </el-form-item>
    </el-form>

    <div class="login-form-footer">
      <el-link href="/login" style="font-weight: bolder;font-size: 16px;color: #91949c;" :underline="false">
        我有账号 去登录
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
  name: 'RegisterView',
  components: {
    IconUser,
    IconLock,
  },
  setup() {
    let router = useRouter()
    let agree = ref(false)
    const registerFormRef = ref('')

    const registerForm = reactive({
      username: '',
      password: '',
      checkPass: '',
    })

    const validateUser = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (value.length < 4 || value.length > 20) {
        callback(new Error('长度在4到20个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('只允许填写数字、字母'))
      } else {
        callback()
      }
    }
    const validateUserChange = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('只允许填写数字、字母'))
      } else {
        callback()
      }
    }
    const validatePassBlur = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_!.@]+$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 4 || value.length > 20) {
        callback(new Error('长度在4到20个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('只允许填写数字、字母、符号(_、!、.、@)'))
      } else {
        callback()
      }
    }
    const validatePassChange = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_!.@]+$/
      if (!reg.test(value)) {
        callback(new Error('只允许填写数字、字母、符号(_、!、.、@)'))
      } else {
        callback()
      }
    }
    const validatePassAgainBlur = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_!.@]+$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value.length < 4 || value.length > 20) {
        callback(new Error('长度在4到20个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('只允许填写数字、字母、符号(_、!、.、@)'))
      } else if (value !== registerForm.password) {
        callback(new Error("两次密码输入不一致"))
      } else {
        callback()
      }
    }
    const validateAgreeBlur = (rule, value, callback) => {
      if (!agree.value) {
        callback(new Error('您需要同意《注册协议》才能注册'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      username: [
        {required: true, validator: validateUser, trigger: 'blur'},
        {validator: validateUserChange, trigger: 'change'}
      ],
      password: [
        {required: true, validator: validatePassBlur, trigger: 'blur'},
        {validator: validatePassChange, trigger: 'change'}
      ],
      checkPass: [
        {required: true, validator: validatePassAgainBlur, trigger: 'blur'},
        {validator: validatePassChange, trigger: 'change'}
      ],
      agree: [
        {required: true, validator: validateAgreeBlur, trigger: 'blur'}
      ]
    })

    const postRegister = debounce(async () => {
      const form = unref(registerFormRef)
      if (!form) {
        return
      }
      try {
        await form.validate()
        userRequest.register(registerForm).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
            // 注册成功之后，进行页面跳转
            router.replace("/login")
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          ErrorMessage(err)
        })
      } catch (err) {
        console.error(err)
      }
    })

    return {
      agree,
      registerFormRef,
      registerForm,
      rules,
      postRegister,
    }
  }
}
</script>

<style scoped>
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
