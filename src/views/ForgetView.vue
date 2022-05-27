<template>
  <div class="bg"></div>
  <div
      class="login-form my-border">

    <div class="login-form-header">
      <router-link to="/home">
        <img style="width: 75px; height: 75px; float: left; padding-right: 40px;" src="../assets/logo.png" alt="logo"/>
      </router-link>

      <div class="login-form-text">电影推荐系统 - 忘记密码</div>
    </div>

    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="账 号"/>
        <el-step title="邮箱验证"/>
        <el-step title="完成"/>
      </el-steps>
    </div>

    <div v-if="active === 0">
      <el-input v-model="username" placeholder="要找回的账号" class="space"></el-input>
      <div class="space btn">
        <el-button @click="checkUsernameExists" type="primary">确 定</el-button>
      </div>
    </div>
    <div v-else-if="active === 1">
      <el-input v-model="mail" placeholder="请输入该账号对应的邮箱" class="space">
        <template #append>
          <el-popover :visible="isInputError" placement="top" hide-after="1000">
            <p style="width: 100%; text-align: center; color: red;">邮箱格式有误！</p>
            <template #reference>
              <el-button :disabled="isDisabled" @click="sendAuthCode">{{ sendCodeBtnName }}</el-button>
            </template>
          </el-popover>
        </template>
      </el-input>
      <br/>
      <el-input v-model="authCode" placeholder="验证码" class="space input"></el-input>
      <div class="space btn">
        <el-button @click="active --">上一步</el-button>
        <el-button @click="checkAuthCode" type="primary">确 定</el-button>
      </div>
    </div>
    <div v-else-if="active === 2">
      <h3>找回的密码：</h3>
      <p style="width: 100%; text-align: center;">{{ newPassword }}</p>
      <p style="color: red">注意：请记住找回的密码，并在登录后尽快修改！</p>
      <p style="text-align: center;">
        <el-link type="info" href="/login">已记住密码，现在去登录</el-link>
      </p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import authRequest from "@/api/authentication";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import {debounce} from "@/utils/debounce-throttle";

export default {
  name: 'ForgetView',
  components: {},
  setup() {
    let active = ref(0);
    let username = ref('');
    let newPassword = ref('');

    // 邮箱
    let mail = ref("");
    // 验证码
    let authCode = ref("");
    // 是否可以点击“发送验证码”按钮，false表示可以
    let isDisabled = ref(false);
    // “发送验证码”按钮中的信息
    let sendCodeBtnName = ref('发送验证码');
    // 邮箱输入是否有误
    let isInputError = ref(false)
    const sendAuthCode = debounce(() => {
      mail.value = mail.value.trim()
      const regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (!regex.test(mail.value)) {
        console.log("邮箱格式有误");
        isInputError.value = true;
        const showErr = setInterval(() => {
          isInputError.value = false;
          clearInterval(showErr)
        }, 1000);
        return;
      }

      authRequest.getAuthCodeUnderLogout(username.value, mail.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);
          // 60秒内不能再次发送验证码
          sendCodeBtnName.value = "60秒后可重发";
          let time = 60;
          isDisabled.value = true;
          const interval = setInterval(() => {
            time--;
            sendCodeBtnName.value = time + "秒后可重发";
            // 60秒时间到后，将定时器清除，用户可以重新发送验证码
            if (time === 0) {
              clearInterval(interval)
              sendCodeBtnName.value = '发送验证码';
              isDisabled.value = false;
            }
          }, 1000);
        } else {
          ErrorMessage(res.msg)
        }
      }).catch(err => {
        console.error(err)
      })
    })

    const checkUsernameExists = debounce(() => {
      username.value = username.value.trim();
      authRequest.checkUsernameExists(username.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg)
          active.value++;
        } else {
          ErrorMessage(res.msg)
        }
      })
    })

    const checkAuthCode = debounce(() => {
      username.value = username.value.trim()
      authCode.value = authCode.value.trim();
      authRequest.checkAuthCode(username.value, authCode.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);

          authRequest.judgeAndFindPassword(username.value, authCode.value).then(res => {
            if (res.code === 200) {
              newPassword.value = res.data.password
              active.value++;
            }
          })
        } else {
          ErrorMessage(res.msg)
        }
      }).catch(err => {
        console.error(err)
      })
    })

    return {
      active,
      username,
      newPassword,
      mail,
      authCode,
      isDisabled,
      sendCodeBtnName,
      isInputError,
      sendAuthCode,
      checkUsernameExists,
      checkAuthCode,
    }
  }
}
</script>

<style lang="less" scoped>
.space {
  margin: 0.5rem 0;
}

.btn {
  display: flex;
  justify-content: right;
}

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
  font-size: 1.4rem;
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
