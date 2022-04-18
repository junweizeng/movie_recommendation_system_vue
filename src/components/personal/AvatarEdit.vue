<template>
  <div @click="toggleShow" class="avatar-edit-master">
    <el-avatar class="avatar" shape="square" :style="`width: ${size}rem; height: ${size}rem;`" :src="imgDataUrl" alt="头像">
      <UserFilled class="inner"></UserFilled>
    </el-avatar>
  </div>

    <my-upload field="img"
               @crop-success="cropSuccess"
               v-model="show"
               :width="200"
               :height="200"
               :no-rotate="false"
               img-format="png">
    </my-upload>

<!--  <my-upload field="img"-->
<!--             @crop-success="cropSuccess"-->
<!--             @crop-upload-success="cropUploadSuccess"-->
<!--             @crop-upload-fail="cropUploadFail"-->
<!--             v-model="show"-->
<!--             :width="200"-->
<!--             :height="200"-->
<!--             url="/mrs/user/update/avatar"-->
<!--             :field="field.avatar"-->
<!--             :params="params"-->
<!--             :headers="headers"-->
<!--             :no-rotate="false"-->
<!--             img-format="png">-->
<!--  </my-upload>-->
</template>

<script>
// import 'babel-polyfill'; // es6 shim
import MyUpload from 'vue-image-crop-upload';
import { UserFilled } from '@element-plus/icons-vue'
import {reactive, ref, toRefs} from "vue";
import request from "@/utils/request";
import emitter from "@/utils/eventBus";
import {ErrorMessage, SuccessMessage} from "@/utils/myMessage";

export default {
  name: 'AvatarEdit',
  components: {MyUpload,UserFilled},
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
    // 创建图像的 datebase64 url
    // let imgDataUrl =  ref('https://ts1.cn.mm.bing.net/th?id=OIP-C.ZeQ5h5qmFJdYmGKtrR-I9gAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2')
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
    let cropSuccess = function cropSuccess(imgDataUrl, field){
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

    return {
      ...toRefs(data),
      toggleShow,
      cropSuccess,
    }
  }
}
</script>

<style scoped>
.avatar-edit-master {
  text-align: center;
}

.avatar {
  margin-top: 5px;
  margin-bottom: 5px;
}

.avatar .inner {
  width:100px;
  height: 100px
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