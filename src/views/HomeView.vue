<template>
  <div class="flex-container">
    <movie-carousel/>
  </div>

  <movie-list
      :opt="1"
      v-if="recommendedMovies.length !== 0"
      :tag="tags[0]"
      :movies="recommendedMovies"
      class="movie-list my-border"
  />

  <movie-list
      :opt="2"
      :tag="tags[1]"
      :movies="mostWatchedMovies"
      class="movie-list my-border"
  />

  <movie-list
      :opt="3"
      :tag="tags[2]"
      :movies="highestRatedMovies"
      class="movie-list my-border"
  />
</template>

<script>
import MovieCarousel from "@/components/home/MovieCarousel";
import MovieList from "@/components/home/MovieList";
import {ref} from "vue";
import recommendationRequest from "@/api/recommendation";
import movieRequest from "@/api/movie";

export default {
  name: 'HomeView',
  components: {
    MovieCarousel,
    MovieList,
  },
  setup() {
    const tags = ref(['猜你喜欢', '最多人看', '评分最高', '今日热门', '电影Top100',])
    let recommendedMovies = ref([])
    recommendationRequest.getRecommendedMoviesByUserId().then(res => {
      if (res.code === 200) {
        recommendedMovies.value = res.data
      }
    }).catch(err => {
      console.error(err)
    })

    let mostWatchedMovies = ref([])
    movieRequest.getMostWatchedMovies().then(res => {
      if (res.code === 200) {
        mostWatchedMovies.value = res.data
      }
    }).catch(err => {
      console.error(err)
    })

    let highestRatedMovies = ref([])
    movieRequest.getHighestRatedMovies().then(res => {
      if (res.code === 200) {
        highestRatedMovies.value = res.data
      }
    }).catch(err => {
      console.error(err)
    })

    return {
      tags,
      recommendedMovies,
      mostWatchedMovies,
      highestRatedMovies,
    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;

  margin-top: 0.5rem;
  margin-left: 25%;
  margin-right: 25%;
}

.movie-list {
  padding: 1rem;
  margin: 1rem 20% 1rem 20%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 1200px) {
  .flex-container {
    margin-left: 5%;
    margin-right: 5%;
  }

  .movie-list {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>