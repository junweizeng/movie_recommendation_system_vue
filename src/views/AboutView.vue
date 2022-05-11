<template>
<!--  <div class="test-div">-->
<!--    <movie-strip></movie-strip>-->
<!--  </div>-->

<!--  <score-pie-chart></score-pie-chart>-->

<!--  <br/>-->
<!--  <br/>-->
<!--  <svg-icon icon-class="recommendation" style="width: 3rem; height: 3rem; color: red;"></svg-icon>-->
<!--  <movie-relations-graph-chart></movie-relations-graph-chart>-->
  <el-button @click="loading = !loading">123123</el-button>

  <div style="margin: 0 20%">
    <el-skeleton :loading="loading" :rows="5" animated />
  </div>
</template>

<script>
  import MovieStrip from "@/components/basic/MovieStrip";
  import ScorePieChart from "@/components/charts/ScorePieChart";
  import MovieRelationsGraphChart from "@/components/charts/MovieRelationsGraphChart";
  import SvgIcon from "@/components/basic/SvgIcon";
  import {ref} from "vue";

  export default {
    name: 'AboutView',
    components: {SvgIcon, MovieRelationsGraphChart, ScorePieChart, MovieStrip},
    setup() {
      let loading = ref(true)
      return {
        loading
      }
    }
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