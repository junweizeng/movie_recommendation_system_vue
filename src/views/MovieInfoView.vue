<template>
  <div class="master">
    <movie-info/>

    <div class="list-and-comments my-border">


      <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane>
          <template #label>
          <span class="tab-labels">
            <el-icon><chat-round /></el-icon>
            <span>推荐</span>
          </span>
          </template>
          <movie-list v-if="movies.length" class="list" :tag="tag" :movies="movies" />
        </el-tab-pane>

        <el-tab-pane>
          <template #label>
          <span class="tab-labels">
            <el-icon><film /></el-icon>
            <span>评论</span>
          </span>

          </template>
          <personal-info/>
        </el-tab-pane>
      </el-tabs>
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
import {ErrorMessage, SuccessMessage} from "@/utils/myMessage";

export default {
  name: 'MovieInfoView',
  components: { MovieInfo, MovieComments, MovieList },
  setup() {
    const router = useRouter()
    let tag = ref('喜欢这部电影的人也喜欢')
    let movies = reactive([])

    movieRequest.getRecommendedMovieByMovieId(
        router.currentRoute.value.params.id
    ).then(res => {
      if (res.code === 200) {
        let moviesRes = res.data.movies
        for (let i = 0; i < moviesRes.length; ++ i) {
          movies.push(moviesRes[i])
        }
      } else {
        ErrorMessage(res.msg)
      }
    }).catch(err => {
      console.log('MovieInfo err', err)
    })

    return {
      tag,
      movies
    }
  },
}
</script>

<style scoped>
.list-and-comments {
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 2rem;
}

.list-and-comments .list {
  margin-left: 5%;
  margin-right: 5%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  .list-and-comments {
    margin-left: 5%;
    margin-right: 5%;
  }
}
/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px){
  .list-and-comments {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
