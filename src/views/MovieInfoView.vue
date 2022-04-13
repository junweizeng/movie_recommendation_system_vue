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

          <el-button @click="handleEditDialogVisible" circle>
            <template #icon>
              <el-icon><edit/></el-icon>
            </template>
          </el-button>

          <el-dialog v-model="isEditDialogVisible" title="编辑短评" draggable>
            <div>
              <el-rate
                  v-model="editInfo.score"
                  :texts="['2', '4', '6', '8', '10']"
                  text-color="#008000"
                  show-text
              />
              <el-input v-model="editInfo.comment" type="textarea" />
            </div>

            <template #footer>

                <el-button @click="handleEditDialogVisible">取 消</el-button>
                <el-button type="primary" @click="handleSubmitComment">提 交</el-button>

            </template>
          </el-dialog>

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
import {ErrorMessage, SuccessMessage, WarningMessage} from "@/utils/myMessage";
import {Edit} from "@element-plus/icons";

export default {
  name: 'MovieInfoView',
  components: {Edit, MovieInfo, MovieComments, MovieList },
  setup() {
    const router = useRouter()
    let tag = ref('喜欢这部电影的人也喜欢')
    let movies = reactive([])
    let editInfo = reactive({
      score: 0,
      comment: '',
    })

    let isEditDialogVisible = ref(false)
    let handleEditDialogVisible = () => {
      isEditDialogVisible.value = !isEditDialogVisible.value
      console.log(isEditDialogVisible.value)
    }
    let handleSubmitComment = () => {
      if (editInfo.score === 0) {
        WarningMessage('不可以给电影打0分 (┬┬﹏┬┬)')
      } else {
        // TODO 向服务器发送提交请求

        isEditDialogVisible.value = false
      }
    }

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
      movies,
      editInfo,
      isEditDialogVisible,
      handleEditDialogVisible,
      handleSubmitComment,
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
@media screen and (max-width: 800px){
  .list-and-comments {
    margin-left: 0;
    margin-right: 0;
  }

  /deep/ .el-dialog {
    width: 80%
  }
}
</style>
