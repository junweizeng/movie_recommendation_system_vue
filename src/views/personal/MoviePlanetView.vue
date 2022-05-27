<template>
  <div class="planet-main">
    <movie-relations-graph-chart></movie-relations-graph-chart>
  </div>
</template>

<script>
import MovieRelationsGraphChart from "@/components/charts/MovieRelationsGraphChart";

export default {
  name: "MoviePlanetView",
  components: {MovieRelationsGraphChart}
}
</script>

<style scoped>
.planet-main {

}
</style>