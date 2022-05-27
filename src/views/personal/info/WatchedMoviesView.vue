<template>
  <el-skeleton :loading="loading" :rows="5" animated/>

  <template v-for="(movie, index) in reviewedMovies" :key="index">
    <movie-strip :movie="movie" style="margin-bottom: 1rem;">
      <template v-slot:footer>
        <div class="movie-strip-slot">
          <span v-if="movie.time" class="time">
            {{ movie.time }} 看过
          </span>
          <el-divider direction="vertical"/>
          <el-rate
              v-model="movie.userScore"
              disabled
              size="small"
              :texts="['很差', '较差', '还行', '推荐', '力荐']"
              :colors="['#777777', '#777777', '#777777']"
              show-text
              text-color="#777777"
              disabled-void-color="rgb(226, 226, 226)"
          />
        </div>
      </template>
    </movie-strip>
  </template>

  <blank-page v-if="!loading && !reviewedMovies.length" :page-name="'record'"></blank-page>

  <!-- 分页 样式1-->
  <div v-if="total > 10" class="pagination-style-first">
    <el-pagination
        style="justify-content: center"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        v-model:total="total"
        pager-count="7"
        background
        layout="total, prev, pager, next, jumper"
    />
  </div>

  <!-- 分页 样式2 -->
  <div v-if="total > 10" class="pagination-style-second">
    <el-pagination
        style="justify-content: center"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        v-model:total="total"
        pager-count="5"
        small
        background
        layout="prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import MovieStrip from "@/components/basic/MovieStrip";
import {ref, watch} from "vue";
import movieRequest from "@/api/movie";
import BlankPage from "@/components/basic/BlankPage";

export default {
  name: "WatchedMoviesView",
  components: {BlankPage, MovieStrip},
  setup() {
    let loading = ref(true)
    let reviewedMovies = ref([])

    // 分页查询需要用到的一些数据
    let currentPage = ref(1); // 当前页码
    let pageSize = ref(10);   // 每页电影数量
    let total = ref(0);      // 总电影数

    const getMoreReviewedMovies = () => {
      reviewedMovies.value = [];
      loading.value = true;
      movieRequest.getMoreReviewedMovies(currentPage.value, pageSize.value).then(res => {
        if (res.code === 200) {
          reviewedMovies.value = res.data.records
          for (let i = 0; i < reviewedMovies.value.length; ++i) {
            reviewedMovies.value[i].userScore /= 2
          }
          loading.value = false;
          total.value = res.data.total;
        }
      }).catch(err => {
        console.error(err)
      })
    }
    getMoreReviewedMovies();

    /**
     * 监听`当前页码`变化
     * 若页码发生变化，重新请求电影数据，随后页面发生变化。
     */
    watch(currentPage, (newValue, oldValue) => {
      // 页面回到顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // 兼容IE
      window.scrollTo(0, 0);

      getMoreReviewedMovies();
    });

    return {
      currentPage,
      pageSize,
      total,
      loading,
      reviewedMovies
    }
  }
}
</script>

<style lang="less" scoped>
.movie-strip-slot {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgb(245, 245, 254);
  padding: 0.3rem 0;
  border-style: solid;
  border-color: #b0d2e5;
  border-radius: 0.5rem;
  border-width: 1px;

  .time {
    font-size: 0.8rem;
    color: #91949c;
    padding-left: 0.3rem;
  }
}

/* 分页模块样式 */
.pagination-style-first, .pagination-style-second {
  margin: 1rem 0;
}

.pagination-style-first {
  display: block;
}

.pagination-style-second {
  display: none;
}

@media screen and (max-width: 1000px) {
  .pagination-style-first {
    display: none;
  }

  .pagination-style-second {
    display: block;
  }
}
</style>