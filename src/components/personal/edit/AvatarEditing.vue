<template>
  <div @click="toggleShow" class="avatar-edit-master">
    <el-avatar class="avatar" shape="square" :style="`width: ${size}rem; height: ${size}rem;`" :src="imgDataUrl"
               alt="头像">
      <UserFilled class="inner"></UserFilled>
    </el-avatar>

    <div class="edit-img">
      <svg-icon icon-class="avatar_edit" style="width: 5rem; height: 5rem;"></svg-icon>
    </div>
  </div>

  <my-upload field="img"
             @crop-success="cropSuccess"
             v-model="show"
             :width="200"
             :height="200"
             :no-rotate="false"
             img-format="png">
  </my-upload>
</template>

<script>
import MyUpload from 'vue-image-crop-upload';
import {UserFilled} from '@element-plus/icons-vue'
import {onBeforeUnmount, reactive, toRefs} from "vue";
import request from "@/utils/request";
import emitter from "@/utils/event-bus";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import {Edit} from "@element-plus/icons";
import SvgIcon from "@/components/basic/SvgIcon";

export default {
  name: 'AvatarEdit',
  components: {SvgIcon, Edit, MyUpload, UserFilled},
  props: {
    size: {
      type: Number,
      default: 15,
    },
    avatar: {
      type: String,
      default: '',
    }
  },
  setup() {
    let data = reactive({
      show: false,
      field: {
        avatar: ''
      },
      params: {},
      headers: {
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json; charset=utf-8'
      },
      imgDataUrl: ''
    })

    let toggleShow = function toggleShow() {
      data.show = !data.show;
    }

    /**
     * 图片截取完成事件
     *
     * [param] imgDataUrl
     * [param] field
     */
    let cropSuccess = function cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------');
      data.imgDataUrl = imgDataUrl
      data.field.avatar = imgDataUrl

      // 图片截取完成后，将图片信息上传到服务器
      request({
        url: '/user/update/avatar',
        method: 'post',
        headers: {
          isNeedToken: true,
        },
        data: imgDataUrl
      }).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg)

          emitter.emit('handleHeaderAvatarChange', {
            avatar: data.imgDataUrl
          })
        } else {
          ErrorMessage(res.msg)
        }
      }).catch(err => {
        console.error(err)
      })
    }

    /**
     * 全局事件总线——监听
     * 事件触发时，替换头像路径
     */
    emitter.on('handleEditAvatarChange', res => {
      data.imgDataUrl = res.avatar
    })

    onBeforeUnmount(() => {
      emitter.off('handleEditAvatarChange')
    })

    return {
      ...toRefs(data),
      toggleShow,
      cropSuccess,
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-edit-master {
  position: relative;
  text-align: center;

  .avatar {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .edit-img {
    display: none;
    z-index: 100;
    position: absolute;
    left: 3.55rem;
    top: 3.55rem;

    img {
      width: 5rem;
    }
  }
}

.avatar-edit-master:hover {
  filter: brightness(70%);

  .edit-img {
    display: block;
  }
}

.avatar .inner {
  width: 100px;
  height: 100px;
}

@media screen and (max-width: 657px) {
  /deep/ .vicp-wrap {
    width: 290px;
  }

  /deep/ .vicp-operate {
    position: absolute;
    left: 25px;
    bottom: 20px;
  }

  /deep/ .vicp-preview-item {
    display: none;
  }
}

</style>