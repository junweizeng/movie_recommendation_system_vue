<template>
  <div class="main">
    <el-carousel class="carousel-first"  trigger="click" :interval="4000" height="44.5rem" type="card">
      <el-carousel-item
          style="width: 33.5rem; height: 44.5rem; text-align: center"
          v-for="(movie,index) in movies" :key="index">
        <img style="width: 100%; height: 100%;" :src="movie" alt="123">
      </el-carousel-item>
    </el-carousel>

    <el-carousel class="carousel-second"  trigger="click" :interval="4000" height="44.5rem">
      <el-carousel-item
          style="width: 33.5rem; height: 44.5rem; text-align: center"
          v-for="(movie,index) in movies" :key="index">
        <img style="width: 100%; height: 100%;" :src="movie" alt="123">
      </el-carousel-item>
    </el-carousel>
  </div>

<!--  <h1>{{screenWidth}}</h1>-->

</template>

<script>
import {onMounted, reactive, ref, watch} from "vue";

  export default {
    name: "MovieCarousel",
    mounted() {

    },
    setup() {
      let carousel = ref(null)
      let screenWidth = ref(0)


      let movies = reactive([
        'https://img0.baidu.com/it/u=2535847271,500295178&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',
        'https://img1.baidu.com/it/u=246487087,4260921059&fm=253&fmt=auto&app=138&f=JPEG?w=357&h=500',
        'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',
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

<style scoped>
.main {
  width: 100%;
}

/* 响应式布局 - 当屏幕小于 600 像素宽时，用默认走马灯样式展示 */
@media screen and (max-width: 600px) {
  .carousel-first {
    display: none;
  }
  .carousel-second {
    display: block;
  }
}
/* 响应式布局 - 当屏幕大于600像素 小于 3000像素 宽时，用card走马灯样式展示 */
@media screen and (min-width: 600px) and (max-width: 3000px){
  .carousel-first {
    display: block;
  }
  .carousel-second {
    display: none;
  }
}
</style>