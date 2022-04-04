<template>
  <div class="classification-master">
    <movie-tags class="tags"></movie-tags>
    <movie-cards class="my-border"></movie-cards>
  </div>
</template>

<script>
import MovieTags from "@/components/classification/MovieTags";
import MovieCards from "@/components/classification/MovieCards";

export default {
  name: "ClassificationView",
  components: { MovieTags, MovieCards }
}
</script>

<style scoped>
.classification-master {
  padding-left: 20%;
  padding-right: 20%;
}

.tags {
  margin: 1rem 0;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 1200px) {
  .classification-master {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>