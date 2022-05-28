<template>
  <div class="space mail">
    <span>绑定邮箱：</span>
    <span style="color: rgb(147, 147, 147)">{{ userMail }}</span>

    <span @click="isShowMailEditing = !isShowMailEditing" class="edit-btn">
      <el-icon><edit/></el-icon>修改
    </span>
  </div>

  <transition
      :duration="300"
      name="animate__animated animate__zoomOut"
      appear
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut ">
    <div v-show="isShowMailEditing">
      <el-input v-model="mail" placeholder="请输入新邮箱" class="space input">
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

      <div class="space">
        <el-button @click="updateMail" type="primary">确 定</el-button>
        <el-button @click="isShowMailEditing = false">取 消</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import {ref} from "vue";
import authRequest from "@/api/authentication";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import userRequest from "@/api/user";
import {debounce} from "@/utils/debounce-throttle";

export default {
  name: "MailEditing",
  setup() {
    // 编辑框中邮箱
    let mail = ref("");
    // 用户邮箱
    let userMail = ref("未设置");
    // 验证码
    let authCode = ref("");
    // 是否可以点击“发送验证码”按钮，false表示可以
    let isDisabled = ref(false);
    // “发送验证码”按钮中的信息
    let sendCodeBtnName = ref('发送验证码');
    // 是否显示邮箱编辑
    let isShowMailEditing = ref(false);
    // 邮箱输入是否有误
    let isInputError = ref(false)
    // \w+表示多个字母数字下划线等，+一个或多个
    const regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    userRequest.getUserMail().then(res => {
      if (res.code === 200) {
        userMail.value = res.data
        if (!regex.test(userMail.value)) {
          userMail.value = "未设置";
        }
      }
    }).catch(err => {
      console.error(err)
    })

    const sendAuthCode = debounce(() => {
      mail.value = mail.value.trim()
      if (!regex.test(mail.value)) {
        // 邮箱格式有误
        isInputError.value = true;
        const showErr = setInterval(() => {
          isInputError.value = false;
          clearInterval(showErr)
        }, 1000);
        return;
      }

      authRequest.getAuthCode(mail.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);
        }
      }).catch(err => {
        console.error(err)
      })

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
    })

    const updateMail = () => {
      authCode.value = authCode.value.trim();
      mail.value = mail.value.trim();
      authRequest.updateMail(authCode.value, mail.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);
          userMail.value = mail.value;
          mail.value = "";
          authCode.value = "";
        } else {
          ErrorMessage(res.msg)
        }
        isShowMailEditing.value = false;
      }).catch(err => {
        console.error(err)
      })
    }

    return {
      mail,
      userMail,
      authCode,
      isDisabled,
      sendCodeBtnName,
      isShowMailEditing,
      isInputError,
      sendAuthCode,
      updateMail,
    }
  }
}
</script>

<style lang="less" scoped>
.mail {
  display: flex;
  align-items: center;
}

.space {
  margin: 0.5rem 0;
}

.input {
  max-width: 400px;
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