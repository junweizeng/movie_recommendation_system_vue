<template>
  <div class="flex-container">
    <movie-carousel/>
  </div>

  <div class="movie-list my-border"  v-for="(tag,index) in tags" :key="index">
    <movie-list :tag="tag" />
  </div>
</template>

<script>
  import MovieCarousel from "@/components/home/MovieCarousel";
  import MovieList from "@/components/home/MovieList";

  export default {
    name: 'HomeView',
    components: {
      MovieCarousel,
      MovieList,
    },
    data() {
      return {
        tags:['猜你喜欢','今日热门','电影Top100',]
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