<template>
  <div @click="toggleShow" class="avatar-edit-master">
    <el-avatar class="avatar" shape="square" style="width: 15rem; height: 15rem;" :src="imgDataUrl" alt="头像">
      <UserFilled class="inner"></UserFilled>
    </el-avatar>
  </div>

  <my-upload field="img"
             @crop-success="cropSuccess"
             @crop-upload-success="cropUploadSuccess"
             @crop-upload-fail="cropUploadFail"
             v-model="show"
             :width="200"
             :height="200"
             url="/upload"
             :params="params"
             :headers="headers"
             :no-rotate="false"
             img-format="png">
  </my-upload>
</template>

<script>
// import 'babel-polyfill'; // es6 shim
import MyUpload from 'vue-image-crop-upload';
import { UserFilled } from '@element-plus/icons-vue'
import {reactive, toRefs} from "vue";

export default {
  name: 'AvatarEdit',
  components: {MyUpload,UserFilled},
  setup() {
    let data = reactive({
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      // 创建图像的 datebase64 url
      imgDataUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.ZeQ5h5qmFJdYmGKtrR-I9gAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2'
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
      data.imgDataUrl = imgDataUrl;
    }

    /**
     * 上传成功
     *
     * [param] jsonData
     * [param] field
     */
    let cropUploadSuccess = function cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    }

    /**
     * 上传失败
     *
     * [param] status  api返回错误状态，如 500
     * [param] field
     */
    let cropUploadFail = function cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }

    return {
      ...toRefs(data),
      toggleShow,
      cropSuccess,
      cropUploadSuccess,
      cropUploadFail,
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

</style>