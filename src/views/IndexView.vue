<template>
  <el-container>
    <movie-header class="header"/>

    <el-main class="content" style="padding: 0">
      <router-view/>
    </el-main>

    <el-footer class="footer" style="padding: 0">
      <movie-footer/>
    </el-footer>

  </el-container>
</template>

<script>
import MovieHeader from "@/components/layout/MovieHeader";
import MovieFooter from "@/components/layout/MovieFooter"

export default {
  name: "IndexView",
  components: {MovieHeader, MovieFooter},
}
</script>

<style scoped>
/* 让header吸顶 */
.header {
  position: sticky;
  /* 兼容 -webkit 内核的浏览器 */
  position: -webkit-sticky;
  /* 必须设一个值，否则不生效 */
  top: 0;
}

/* 让footer保持在最下方 */
.content {
  min-height: calc(100vh - 105px);
}

.footer {
  height: 54px;
}

@media screen and (max-width: 450px) {
  .footer {
    height: 73px;
  }
}
</style>