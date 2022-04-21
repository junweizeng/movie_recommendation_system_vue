<template>
  <div class="test-div">
    <movie-strip></movie-strip>
  </div>

  <test-infinite-scroll></test-infinite-scroll>
</template>

<script>
  import MovieStrip from "@/components/basic/MovieStrip";
  import TestInfiniteScroll from "@/components/personal/TestInfiniteScroll";

  export default {
    name: 'AboutView',
    components: {TestInfiniteScroll, MovieStrip}
  }
</script>

<style lang="less" scoped>
.test-div {
  margin: 0 20%;
}

@media screen and (max-width: 700px) {
  .test-div {
    margin: 0 0 ;
  }
}
</style>