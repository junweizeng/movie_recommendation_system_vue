<template>
  <el-skeleton :loading="loading" :rows="5" animated/>

  <template v-for="movie in recommendedMovies" :key="movie.id">
    <movie-strip :movie="movie" style="margin-bottom: 1rem;">
      <template v-slot:header>
        <div class="movie-strip-slot-header">
          <svg-icon icon-class="recommendation_5"></svg-icon>
          <span>推荐指数</span>
          <el-divider direction="vertical"/>
          <span>{{ movie.idx }}%</span>
        </div>
      </template>
    </movie-strip>
  </template>

  <blank-page v-if="!loading && !recommendedMovies.length" :page-name="'recommendation'"></blank-page>
</template>

<script>
import recommendationRequest from "@/api/recommendation";
import {ref} from "vue";
import MovieStrip from "@/components/basic/MovieStrip";
import BlankPage from "@/components/basic/BlankPage";

export default {
  name: "RecommendationView",
  components: {MovieStrip, BlankPage},
  setup() {
    let loading = ref(true)
    let recommendedMovies = ref([])
    recommendationRequest.getRecommendedMoviesByUserId().then(res => {
      if (res.code === 200) {
        recommendedMovies.value = res.data
        recommendedMovies.value.forEach((movie, idx) => {
          movie.idx *= 100
          // 保留两位小数（四舍五入）
          movie.idx = movie.idx.toFixed(2)
          return movie
        })
        loading.value = false
      }
    }).catch(err => {
      console.error(err)
    })

    return {
      loading,
      recommendedMovies
    }
  }
}
</script>

<style lang="less" scoped>
.movie-strip-slot-header {
  color: rgb(250, 114, 104);
  font-size: 1.2rem;
  font-weight: initial;
}
</style>