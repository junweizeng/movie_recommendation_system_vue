<template>
  <div class="main">
    <el-carousel
        ref="carousel"
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
        <a :href="`/movie/info/${movie.id}`" target="_blank">
          <el-image class="img" :src="movie.pic" alt="电影海报"></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {nextTick, reactive, ref} from "vue";
import movieRequest from "@/api/movie";

export default {
  name: "MovieCarousel",
  components: {},
  setup() {
    let carousel = ref(null);
    let screenWidth = ref(0);
    let movies = reactive([]);

    movieRequest.getHighestRatedMovies().then(res => {
      if (res.code === 200) {
        const responseMovies = res.data;
        for (let i = 0; i < 3; i++) {
          movies.push({
            id: responseMovies[i].id,
            pic: responseMovies[i].pic,
            label: responseMovies[i].name
          })
        }
        // 将回调延迟到下次 DOM 更新循环之后执行
        nextTick(() => {
          // 切换幻灯片至第2张，从0开始
          carousel.value.setActiveItem(1);
        })
      }
    });

    return {
      movies,
      screenWidth,
      carousel,
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-carousel__item {
  left: 6%;
}

/deep/ .el-carousel__button {
  background-color: #545c64;
  border-radius: 5px;
  color: #ffffff;
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
  /deep/ .el-carousel__item {
    left: -14%;
  }
}

/* 响应式布局 - 当屏幕小于 600 像素宽时，用默认走马灯样式展示 */
@media screen and (min-width: 400px) and (max-width: 600px) {
  /deep/ .el-carousel__item {
    left: -9%;
  }
}

/* 响应式布局 - 当屏幕大于600像素 小于 3000像素 宽时，用card走马灯样式展示 */
@media screen and (min-width: 600px) and (max-width: 3000px) {
  /deep/ .el-carousel__item {
    left: 6%;
  }
}
</style>