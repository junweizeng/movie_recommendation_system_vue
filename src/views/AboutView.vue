<template>
    <div class="test-div">
      <movie-strip></movie-strip>
    </div>
</template>

<script>
  import MovieStrip from "@/components/basic/MovieStrip";

  export default {
    name: 'AboutView',
    components: {MovieStrip}
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