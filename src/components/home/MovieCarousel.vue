<template>
  <div class="main">
    <el-carousel
        class="carousel-first"
        trigger="hover"
        :interval="3000"
        height="35rem"
        type="card"
        arrow="always"
    >
      <el-carousel-item
          :label="movie.label"
          class="item"
          v-for="(movie,index) in movies"
          :key="index">
        <a :href="`/movie/info/${movie.id}`">
          <el-image class="img" :src="movie.pic" alt="123"></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {onMounted, reactive, ref, watch} from "vue";

export default {
  name: "MovieCarousel",
  components: {

  },
  setup() {
    let carousel = ref(null)
    let screenWidth = ref(0)


    let movies = reactive([
      {id: 453, pic: 'https://mrs-zjw.oss-cn-hangzhou.aliyuncs.com/mrs/movie/26825482-3513affa-7c2d-4896-a25d-39409af0fc36.webp', label: '月球陨落'},
      {id: 465, pic: 'https://mrs-zjw.oss-cn-hangzhou.aliyuncs.com/mrs/movie/35505100-5bd371c6-b4e5-4116-86ed-c82312e58cbc.webp', label: '这个杀手不太冷静'},
      {id: 489, pic: 'https://mrs-zjw.oss-cn-hangzhou.aliyuncs.com/mrs/movie/35144311-a00764b0-620a-4834-a4e0-38ba1ee4a2a9.webp', label: '雄狮少年'}
    ]);

    // 监视屏幕宽度
    onMounted(() => {
      screenWidth.value = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          screenWidth.value = document.body.clientWidth
        })()
      }
    })

    return {
      movies,
      screenWidth,
      carousel,
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-carousel__item{
  left: 6%;
}

/deep/ .el-carousel__button {
  background-color: #89a5b7;
  border-radius: 5px;
}

.main {
  width: 100%;
}

.item {
  width: 25rem;
  height: 100%;
  margin: 0 auto;
  .img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}

@media screen and (max-width: 400px) {
  /deep/ .el-carousel__item{
    left: -14%;
  }
}

/* 响应式布局 - 当屏幕小于 600 像素宽时，用默认走马灯样式展示 */
@media screen and (min-width: 400px) and (max-width: 600px) {
  /deep/ .el-carousel__item{
    left: -9%;
  }
}
/* 响应式布局 - 当屏幕大于600像素 小于 3000像素 宽时，用card走马灯样式展示 */
@media screen and (min-width: 600px) and (max-width: 3000px){
  /deep/ .el-carousel__item{
    left: 6%;
  }
}
</style>