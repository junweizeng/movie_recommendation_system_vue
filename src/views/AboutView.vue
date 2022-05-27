<template>
  <!--  <div class="test-div">-->
  <!--    <movie-strip></movie-strip>-->
  <!--  </div>-->

  <!--  <score-pie-chart></score-pie-chart>-->

  <!--  <br/>-->
  <!--  <br/>-->
  <!--  <svg-icon icon-class="recommendation" style="width: 3rem; height: 3rem; color: red;"></svg-icon>-->
  <!--  <movie-relations-graph-chart></movie-relations-graph-chart>-->


  <!--  <el-button @click="loading = !loading">加载</el-button>-->
  <!--  <div style="margin: 0 20%">-->
  <!--    <el-skeleton :loading="loading" :rows="5" animated />-->
  <!--  </div>-->

  <!--  <el-button>暗黑模式</el-button>-->

  <comments-word-cloud mid="100" :wordCloudData="wordCloudData"></comments-word-cloud>

  <score-pie-chart></score-pie-chart>

  <!--  <el-button @click="click">点我显示</el-button>-->
</template>

<script>
import MovieStrip from "@/components/basic/MovieStrip";
import ScorePieChart from "@/components/charts/ScorePieChart";
import MovieRelationsGraphChart from "@/components/charts/MovieRelationsGraphChart";
import SvgIcon from "@/components/basic/SvgIcon";
import {ref} from "vue";
import CommentsWordCloud from "@/components/charts/CommentsWordCloud";
import commentRequest from "@/api/comment";

export default {
  name: 'AboutView',
  components: {CommentsWordCloud, SvgIcon, MovieRelationsGraphChart, ScorePieChart, MovieStrip},
  setup() {
    let wordCloudData = ref([]);

    commentRequest.getCommentsWordCloudData(500).then(res => {
      if (res.code === 200) {
        wordCloudData.value = res.data;
      }
    }).catch(err => {
      console.error(err);
    })

    let loading = ref(true)

    const click = () => {
      console.log(wordCloudData)
    }

    return {
      wordCloudData,
      loading,
      click
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
    margin: 0 0;
  }
}
</style>