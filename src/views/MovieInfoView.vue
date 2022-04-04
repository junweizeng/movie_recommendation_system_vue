<template>
  <div class="master">
    <movie-info/>

    <div class="list-and-comments my-border">
      <movie-list class="list" :tag="tag"/>
      <movie-list class="list" :tag="tag"/>
      <movie-list class="list" :tag="tag"/>
      <movie-list class="list" :tag="tag"/>
      <movie-list class="list" :tag="tag"/>
    </div>

  </div>
</template>

<script>
import MovieInfo from "@/components/movie/MovieInfo";
import MovieComments from "@/components/movie/MovieComments";
import MovieList from "@/components/home/MovieList";

export default {
  name: 'MovieInfoView',
  data() {
    return {
      tag: '喜欢这部电影的人也喜欢',
    }
  },
  components: { MovieInfo, MovieComments, MovieList }
}
</script>

<style scoped>
.list-and-comments {
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 2rem;
}

.list-and-comments .list {
  margin-left: 5%;
  margin-right: 5%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  .list-and-comments {
    margin-left: 5%;
    margin-right: 5%;
  }
}
/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px){
  .list-and-comments {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
