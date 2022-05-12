<template>
  <div class="bg">
    <div class="account-master">
      <p>修改密码：</p>
      <el-divider />
      <el-form
          ref="updatePasswordFormRef"
          :model="updatePasswordForm"
          :rules="rules"
          class="form-css"
      >
        <el-form-item label="原 密 码" prop="prePassword">
          <el-input
              class="login-form-input"
              placeholder="原 密 码"
              v-model="updatePasswordForm.prePassword"
              autofocus
              autocomplete="off"
              show-password
          >
            <template v-slot:prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="新 密 码" prop="newPassword">
          <el-input
              class="login-form-input"
              placeholder="新 密 码"
              v-model="updatePasswordForm.newPassword"
              show-password
          >
            <template v-slot:prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="再 确 认" prop="checkPassword">
          <el-input
              class="login-form-input"
              placeholder="密 码 确 认"
              v-model="updatePasswordForm.checkPassword"
              show-password
          >
            <template v-slot:prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="postUpdatePassword" style="width: 400px" type="primary">更 新 密 码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Lock as IconLock} from "@element-plus/icons";
import {reactive, ref, unref} from "vue";
import userRequest from "@/api/user";
import {ErrorMessage, SuccessMessage} from "@/utils/myMessage";

export default {
  name: "AccountSettingView",
  components: {
    IconLock
  },
  setup() {
    const updatePasswordFormRef = ref('')
    let updatePasswordForm = reactive({
      prePassword: '',
      newPassword: '',
      checkPassword: '',
    })

    /**
     * 提交更新密码的表单
     */
    const postUpdatePassword = async () => {
      const form = unref(updatePasswordFormRef)
      if (!form) {
        return
      }
      try {
        await form.validate()
        console.log(123123)
        userRequest.updatePassword(updatePasswordForm).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          ErrorMessage(err)
        })
      } catch (err) {
        console.error(err)
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
      } else if (value !== updatePasswordForm.newPassword) {
        callback(new Error("新设置的密码两次输入不一致"))
      } else if (value === updatePasswordForm.prePassword) {
        callback(new Error("新密码不可以与旧密码相同"))
      } else {
        callback()
      }
    }
    const rules = reactive({
      prePassword: [
        { required: true, validator: validatePassBlur, trigger: 'blur' },
        { validator: validateUserChange, trigger: 'change' }
      ],
      newPassword: [
        { required: true, validator: validatePassBlur, trigger: 'blur' },
        { validator: validatePassChange, trigger: 'change' }
      ],
      checkPassword: [
        { required: true, validator: validatePassAgainBlur, trigger: 'blur' },
        { validator: validatePassChange, trigger: 'change' }
      ],
    })

    return {
      rules,
      updatePasswordForm,
      updatePasswordFormRef,
      postUpdatePassword,
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  min-height: 89.6vh;
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

.account-master {
  min-height: 89.5vh;
  border-style: solid;
  border-width: 1px;
  padding: 0 1rem;
  border-color: #dcdbdb;
  background-color: white;

  .form-css {
    max-width: 400px;
  }
}

@media screen and (max-width: 800px) {
  .bg {
    padding: 0 0;
  }
}
</style>