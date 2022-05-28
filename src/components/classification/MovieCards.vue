<template>
  <div class="movie-cards-master my-border">
    <!-- 电影 卡片 or 长条 开关 -->
    <div class="card-or-strip-switch">
      <el-icon>
        <icon-list :color="listColor"/>
      </el-icon>

      <el-switch
          v-model="isCard"
          active-color="#13ce66"
          inactive-color="#36a4ff"
          :active-value="true"
          :inactive-value="false"
          @change="handleSwitch"
      />

      <el-icon>
        <icon-grid :color="gridColor"/>
      </el-icon>
    </div>

    <el-skeleton :loading="loading && isCard" style="width: 25rem; margin-left: 1rem" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 13.8rem; height: 19.8rem" />
        <div style="padding-top: 1rem; padding-bottom: 1rem;">
          <el-skeleton-item variant="p" style="width: 8rem; text-align: center" />
          <br/>
          <el-skeleton-item variant="p" style="width: 13.8rem" />
        </div>
      </template>
    </el-skeleton>

    <el-skeleton
        style="width: 94%; padding-left: 3%"
        :loading="loading && !isCard"
        :rows="5"
        animated/>

    <blank-page v-if="!movies.length && !loading" page-name="movie"></blank-page>

    <!-- 电影卡片显示 -->
    <div v-show="isCard" class="movie-cards">
      <template
          v-for="movie in movies"
          :key="movie.id">
        <movie-card class="card" :movie="movie"></movie-card>
      </template>
    </div>

    <!-- 电影长条显示 -->
    <div v-show="!isCard" class="movie-strips">
      <template
          v-for="movie in movies"
          :key="movie.id">
        <movie-strip class="strip" :movie="movie"></movie-strip>

      </template>
    </div>

    <!-- 分页 样式1-->
    <div v-show="total > 12" class="pagination-style-first">
      <el-pagination
          style="justify-content: center"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          v-model:total="total"
          :pager-count="7"
          background
          layout="total, prev, pager, next, jumper"
      />
    </div>

    <!-- 分页 样式2 -->
    <div v-show="total > 12" class="pagination-style-second">
      <el-pagination
          style="justify-content: center"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          v-model:total="total"
          :pager-count="5"
          small
          background
          layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script>
import {PictureRounded, Menu as IconMenu, Grid as IconGrid, List as IconList} from "@element-plus/icons-vue";
import MovieCard from "@/components/basic/MovieCard";
import {onBeforeUnmount, onMounted, reactive, ref, toRaw, watch} from "vue";
import MovieStrip from "@/components/basic/MovieStrip";
import emitter from "@/utils/event-bus";
import movieRequest from "@/api/movie";
import {ErrorMessage} from "@/utils/my-message";
import {useRouter} from "vue-router";
import BlankPage from "@/components/basic/BlankPage";

export default {
  // 这里用来纪念一下困扰我多天的低级错误，把MovieCard.vue 和 MovieCards.vue的name都写成了MovieCard，导致递归堆栈溢出问题！！！
  name: "MovieCards",
  components: {
    BlankPage,
    IconMenu,
    IconGrid,
    IconList,
    PictureRounded,
    MovieCard,
    MovieStrip
  },
  setup() {
    const router = useRouter()

    let loading = ref(false);

    // 分页结果，电影列表
    let movies = ref([]);

    // 分页查询需要用到的一些数据
    let currentPage = ref(1); // 当前页码
    let pageSize = ref(12);   // 每页电影数量
    let total = ref(movies.value.length); // 总电影数
    let type = ref('全部');    // 电影类型
    let region = ref('全部');  // 电影地区
    let searchWord = ref('');  // 搜索关键字

    /**
     * 向服务器请求电影数据
     */
    let getMovies = () => {
      loading.value = true;
      movies.value = []
      movieRequest.getMovies(
          currentPage.value,
          pageSize.value,
          type.value,
          region.value,
          searchWord.value
      ).then(res => {
        if (res.code === 200) {
          movies.value = res.data.records;
          total.value = res.data.total;
        }
        loading.value = false;
      }).catch(err => {
        ErrorMessage(err)
      })
    }

    // 初始化页面时，获取电影信息列表
    let keywords = ref(router.currentRoute.value.query.keywords)
    onMounted(() => {
      if (keywords.value === undefined) {
        getMovies()
      } else {
        searchWord.value = keywords.value
        getMovies()
      }
    })


    /**
     * 监听`当前页码`变化
     * 若页码发生变化，重新请求电影数据，随后页面发生变化。
     */
    watch(currentPage, (newValue, oldValue) => {
      // 页面回到顶部（兼容不同浏览器）
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);

      getMovies()
    });

    /**
     * 监听`每页电影数量`变化（可扩展）
     * 若发生变化，重新请求电影数据，随后页面发生变化。
     */
    watch(pageSize, (newValue, oldValue) => {

    })

    /**
     * 全局事件总线
     * 监听MovieTags.vue中的type和region的变化
     */
    emitter.on('handleTypeOrRegionChange', data => {
      type.value = data.type;
      region.value = data.region;
      currentPage.value = 1;
      getMovies();
    })

    /**
     * 全局事件总线
     * 监听MovieHeader.vue中的keywords变化
     */
    emitter.on('handleSearch', data => {
      searchWord.value = data.searchKeywords
      getMovies()
    })

    // 电影 卡片 or 长条 开关值，true为卡片，false为长条
    let isCard = ref(true);
    let listColor = ref('');
    let gridColor = ref('#13ce66');
    let handleSwitch = val => {
      if (!val) {
        listColor.value = '#36a4ff';
        gridColor.value = '';
      } else {
        listColor.value = '';
        gridColor.value = '#13ce66';
      }
    }

    onBeforeUnmount(() => {
      emitter.off('handleTypeOrRegionChange');
      emitter.off('handleSearch')
    })

    return {
      loading,
      pageSize,
      currentPage,
      total,
      movies,
      isCard,
      listColor,
      gridColor,
      getMovies,
      handleSwitch,
    }
  },
}
</script>

<style lang="less" scoped>
.movie-cards-master {
  margin-bottom: 1rem;
}

/* 卡片or长条开关样式 */
.card-or-strip-switch {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 2rem;
  margin-top: 0.3rem;
}

/* 电影卡片样式 */
.movie-cards {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 13.8rem);

  .card {
    margin-top: 0.3rem;
  }
}

/* 电影长条样式 */
.movie-strips {
  margin-left: 3rem;
  margin-right: 3rem;

  .strip {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
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

  .movie-strips {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

</style>
