<template>
  <div>
    <p class="panel-title">
      <svg-icon v-if="opt === 1" icon-class="recommendation_5"></svg-icon>
      <svg-icon v-if="opt === 2" icon-class="watched"></svg-icon>
      <svg-icon v-if="opt === 3" icon-class="score_1" style="color: rgb(247,186,42)"></svg-icon>
      {{ tag }}......
    </p>

    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <template v-for="(movie, index) in movies" :key="movie.id">
          <movie-card :movie="movie" class="movie-card-item">
            <!-- 猜你喜欢 -->
            <template v-if="opt === 1" v-slot:header>
              <svg-icon v-if="index === 0" icon-class="recommendation_1" class="recommendation-svg-first"
                        style="color: rgb(255,215,0)"></svg-icon>
              <svg-icon v-if="index === 1" icon-class="recommendation_1" class="recommendation-svg-first"
                        style="color: rgb(241,241,235)"></svg-icon>
              <svg-icon v-if="index === 2" icon-class="recommendation_1" class="recommendation-svg-first"
                        style="color: rgb(186,110,64)"></svg-icon>
              <svg-icon v-if="index > 2" icon-class="recommendation" class="recommendation-svg-second"
                        style="color: rgb(48,208,186)"></svg-icon>
            </template>
            <!-- 最多人看 -->
            <template v-if="opt === 2" v-slot:header>
              <svg-icon v-if="index === 0" icon-class="hot" class="hot-svg" style="color: rgb(238,63,77)"></svg-icon>
              <svg-icon v-if="index === 1" icon-class="hot" class="hot-svg" style="color: rgb(250,126,35)"></svg-icon>
              <svg-icon v-if="index === 2" icon-class="hot" class="hot-svg" style="color: rgb(226,216,73)"></svg-icon>
              <svg-icon v-if="index > 2" icon-class="hot" class="hot-svg" style="color: rgb(49,112,167)"></svg-icon>
            </template>
            <!-- 评分最高 -->
            <template v-if="opt === 3" v-slot:header>
              <svg-icon v-if="index === 0" icon-class="first" class="highest-score-svg-first"></svg-icon>
              <svg-icon v-if="index === 1" icon-class="second" class="highest-score-svg-first"></svg-icon>
              <svg-icon v-if="index === 2" icon-class="third" class="highest-score-svg-first"></svg-icon>
              <svg-icon v-if="index > 2" icon-class="recommendation_3" class="highest-score-svg-first"
                        style="color: rgb(48,208,186)"></svg-icon>
            </template>

            <template v-if="opt === 1" v-slot:footer>
              <div class="recommendation-index-div">
                <svg-icon icon-class="recommendation_5"></svg-icon>
                推荐指数: {{ movie.idx }}%
              </div>
            </template>

            <template v-if="opt === 2" v-slot:footer>
              <div class="watched-num-div">
                <svg-icon icon-class="watched"></svg-icon>
                {{ movie.num }}人评价
              </div>
            </template>
          </movie-card>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {PictureFilled, PictureRounded} from "@element-plus/icons-vue";
import MovieCard from "@/components/basic/MovieCard";
import SvgIcon from "@/components/basic/SvgIcon";

export default {
  name: "MovieList",
  components: {SvgIcon, PictureRounded, PictureFilled, MovieCard},
  props: {
    tag: {
      type: String,
      required: true,
      default: '我的推荐'
    },
    movies: {
      type: Object,
    },
    opt: {
      /**
       * 0：默认
       * 1：猜你喜欢
       * 2：最多人看
       * 3：评分最高
       */
      type: Number,
      required: true,
      default: 0,
    }
  },
  setup(props) {
    props.movies.forEach((movie, idx) => {
      if (movie.idx) {
        movie.idx *= 100
        // 保留两位小数（四舍五入）
        movie.idx = movie.idx.toFixed(2)
      }
    })
  }
}
</script>

<style scoped>
.panel-title {
  font-size: 26px;
  color: #e52a0d;
  font-weight: bold;
  margin-bottom: 1rem;
}

.scrollbar-flex-content {
  display: flex;
  flex-wrap: nowrap;
}

.movie-card-item {
  margin: 1rem;
}

.recommendation-svg-first {
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10;
  width: 2rem;
  height: 2rem;
}

.recommendation-svg-second {
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10;
  width: 3rem;
  height: 3rem;
}

.recommendation-index-div {
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(250, 114, 104);
}

.highest-score-svg-first {
  position: absolute;
  z-index: 10;
  width: 2rem;
  height: 2rem;
}

.watched-num-div {
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(125, 197, 235);
}

.hot-svg {
  position: absolute;
  z-index: 10;
  left: -1px;
  top: -2px;
  width: 2rem;
  height: 2rem;
}
</style>