<template>
  <div class="test-div">
    <movie-strip></movie-strip>
  </div>

  <score-pie-chart></score-pie-chart>

  <br/>
  <br/>

  <movie-relations-graph-chart></movie-relations-graph-chart>
</template>

<script>
  import MovieStrip from "@/components/basic/MovieStrip";
  import ScorePieChart from "@/components/charts/ScorePieChart";
  import MovieRelationsGraphChart from "@/components/charts/MovieRelationsGraphChart";

  export default {
    name: 'AboutView',
    components: {MovieRelationsGraphChart, ScorePieChart, MovieStrip}
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