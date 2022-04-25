<template>
  <div class="bg">
    <div class="account-master">
      <p>修改密码：</p>
      <el-divider />
      <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="rules"
          class="form-css"
      >
        <el-form-item label="原 密 码" prop="prePassword">
          <el-input
              class="login-form-input"
              placeholder="原 密 码"

              autofocus
              autocomplete="off"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="新 密 码" prop="newPassword">
          <el-input
              class="login-form-input"
              placeholder="新 密 码"

              show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="再 确 认" prop="checkPass">
          <el-input
              class="login-form-input"
              placeholder="密 码 确 认"

              show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><icon-lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="postRegister" style="width: 400px" type="primary">更 新 密 码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Lock as IconLock} from "@element-plus/icons";

export default {
  name: "AccountSettingView",
  components: {
    IconLock
  }
}
</script>

<style lang="less" scoped>
.bg {
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

.account-master {
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