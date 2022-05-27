<template>
  <el-skeleton :loading="loading" :rows="5" animated/>

  <template v-for="(moment, index) in moments" :key="index">
    <comment-strip :comment="moment.commentStripVo">
      <template v-slot:movieInfo>
        <movie-strip :movie="moment.movieStripVo"></movie-strip>
      </template>
    </comment-strip>
    <el-divider/>
  </template>

  <blank-page v-if="!loading && !moments.length" :page-name="'moment'"></blank-page>

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
import CommentStrip from "@/components/basic/CommentStrip";
import commentRequest from "@/api/comment";
import {ref, watch} from "vue";
import MovieStrip from "@/components/basic/MovieStrip";
import SvgIcon from "@/components/basic/SvgIcon";
import BlankPage from "@/components/basic/BlankPage";

export default {
  name: "MomentsView",
  components: {BlankPage, MovieStrip, CommentStrip, SvgIcon},
  setup() {
    let loading = ref(true)
    let moments = ref([])

    // 分页查询需要用到的一些数据
    let currentPage = ref(1); // 当前页码
    let pageSize = ref(10);   // 每页电影数量
    let total = ref(0);      // 总电影数

    const getMoreMoments = () => {
      moments.value = []
      loading.value = true;
      commentRequest.getCommentMovieMoments(currentPage.value, pageSize.value).then(res => {
        if (res.code === 200) {
          moments.value = res.data.records;
          total.value = res.data.total;
          loading.value = false;
        }
      }).catch(err => {
        console.error(err)
      })
    }
    getMoreMoments();

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

      getMoreMoments();
    });

    return {
      currentPage,
      pageSize,
      total,
      loading,
      moments
    }
  }
}
</script>

<style lang="less" scoped>
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