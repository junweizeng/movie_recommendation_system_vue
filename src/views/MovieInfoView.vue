<template>
  <div class="master">
    <movie-info/>

    <div class="list-and-comments my-border">
      <movie-list v-if="movies.length" class="list" :tag="tag" :movies="movies" :opt="0"/>

      <movie-comments :mid="mid" style="margin-top: 1.5rem;"></movie-comments>
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/movie/MovieInfo";
import MovieComments from "@/components/movie/MovieComments";
import MovieList from "@/components/home/MovieList";
import {reactive, ref} from "vue";
import movieRequest from "@/api/movie";
import {useRouter} from "vue-router";
import {ErrorMessage} from "@/utils/my-message";
import {Edit} from "@element-plus/icons";
import CommentStrip from "@/components/basic/CommentStrip";

export default {
  name: 'MovieInfoView',
  components: {CommentStrip, Edit, MovieInfo, MovieComments, MovieList},
  setup() {
    const router = useRouter()

    let tag = ref('喜欢这部电影的人也喜欢')
    let movies = reactive([])
    let mid = ref(router.currentRoute.value.params.id)

    movieRequest.getRecommendedMovieByMovieId(
        mid.value
    ).then(res => {
      if (res.code === 200) {
        let moviesRes = res.data.movies
        for (let i = 0; i < moviesRes.length; ++i) {
          movies.push(moviesRes[i])
        }
      } else {
        ErrorMessage(res.msg)
      }
    }).catch(err => {
      console.error(err)
    })

    return {
      tag,
      movies,
      mid,
    }
  },
}
</script>

<style lang="less" scoped>
.list-and-comments {
  margin: 2rem 20%;

  .list {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

/deep/ .el-dialog {
  width: 40%
}

/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  .list-and-comments {
    margin-left: 5%;
    margin-right: 5%;
  }

  /deep/ .el-dialog {
    width: 60%
  }
}

/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px) {
  .list-and-comments {
    margin-left: 0;
    margin-right: 0;
  }

  /deep/ .el-dialog {
    width: 80%
  }
}
</style>
