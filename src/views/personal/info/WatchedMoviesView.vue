<template>
  <template v-for="(movie, index) in reviewedMovies" :key="index">
    <movie-strip :movie="movie" style="margin-bottom: 1rem;">
      <template v-slot:footer>
        <div  class="movie-strip-slot">
          <span v-if="movie.time" class="time">
            {{ movie.time }} 看过
          </span>
          <el-divider direction="vertical" />
          <el-rate
              v-model="movie.userScore"
              disabled
              size="small"
              :texts="['很差', '较差', '还行', '推荐', '力荐']"
              :colors="['#777777', '#777777', '#777777']"
              show-text
              text-color="#777777"
              disabled-void-color="rgb(226, 226, 226)"
          />
        </div>

      </template>
    </movie-strip>
  </template>
</template>

<script>
import MovieStrip from "@/components/basic/MovieStrip";
import {ref} from "vue";
import movieRequest from "@/api/movie";

export default {
  name: "WatchedMoviesView",
  components: {MovieStrip},
  setup() {
    let reviewedMovies = ref([])

    movieRequest.getAllReviewedMovies().then(res => {
      if (res.code === 200) {
        reviewedMovies.value = res.data
        for (let i = 0; i < reviewedMovies.value.length; ++ i) {
          reviewedMovies.value[i].userScore /= 2
        }
      }
    }).catch(err => {
      console.error(err)
    })

    return {
      reviewedMovies
    }
  }
}
</script>

<style lang="less" scoped>
.movie-strip-slot {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgb(245, 245, 254);
  padding: 0.3rem 0;
  border-style:solid;
  border-color: #b0d2e5;
  border-radius: 0.5rem;
  border-width: 1px;

  .time {
    font-size: 0.8rem;
    color: #91949c;
    padding-left: 0.3rem;
  }
}
</style>