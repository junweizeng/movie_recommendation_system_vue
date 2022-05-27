<template>
  <div class="space" style="display: flex">
    <span>修改密码：</span>
    <span style="color: rgb(147, 147, 147)">已设置</span>

    <span @click="isShowPasswordEditing = !isShowPasswordEditing" class="edit-btn">
      <el-icon><edit/></el-icon>修改
    </span>
  </div>

  <transition
      :duration="300"
      name="animate__animated animate__zoomOut"
      appear
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut ">
    <div v-show="isShowPasswordEditing">
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
              <el-icon class="el-input__icon">
                <icon-lock/>
              </el-icon>
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
              <el-icon class="el-input__icon">
                <icon-lock/>
              </el-icon>
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
              <el-icon class="el-input__icon">
                <icon-lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="postUpdatePassword" type="primary">确 定</el-button>
          <el-button @click="isShowPasswordEditing = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import {Lock as IconLock} from "@element-plus/icons";
import {reactive, ref, unref} from "vue";
import userRequest from "@/api/user";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import router from "@/router";
import {useRouter} from "vue-router";

export default {
  name: "PasswordEditing",
  components: {
    IconLock
  },
  setup() {
    const router = useRouter()
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
        userRequest.updatePassword(updatePasswordForm).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
            router.replace({
              name: 'login'
            })
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
        {required: true, validator: validatePassBlur, trigger: 'blur'},
        {validator: validateUserChange, trigger: 'change'}
      ],
      newPassword: [
        {required: true, validator: validatePassBlur, trigger: 'blur'},
        {validator: validatePassChange, trigger: 'change'}
      ],
      checkPassword: [
        {required: true, validator: validatePassAgainBlur, trigger: 'blur'},
        {validator: validatePassChange, trigger: 'change'}
      ],
    })

    let isShowPasswordEditing = ref(false);
    return {
      rules,
      updatePasswordForm,
      updatePasswordFormRef,
      postUpdatePassword,
      isShowPasswordEditing,
    }
  }
}
</script>

<style lang="less" scoped>
.form-css {
  max-width: 400px;
}

.space {
  margin: 0.5rem 0;
}

.edit-btn {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  color: rgb(23, 81, 153);
  white-space: nowrap;
  cursor: pointer; // 鼠标放上去显示手势
}
</style>