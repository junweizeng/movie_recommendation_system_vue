<template>
  <div class="bg">
    <div class="account-master">
      <h3>个人账号：</h3>

      <password-editing></password-editing>

      <el-divider/>

      <mail-editing></mail-editing>

      <el-divider/>
    </div>
  </div>
</template>

<script>
import MailEditing from "@/components/personal/edit/MailEditing";
import PasswordEditing from "@/components/personal/edit/PasswordEditing";

export default {
  name: "AccountSettingView",
  components: {
    PasswordEditing,
    MailEditing,
  },
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