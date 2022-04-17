<template>
  <el-button @click="handleEditDialogVisible" circle>
    <template #icon>
      <el-icon><edit/></el-icon>
    </template>
  </el-button>

  <el-dialog v-model="isEditDialogVisible" title="编辑短评" draggable>
    <div>
      <el-rate
          v-model="ownCommentEditInfo.score"
          :texts="['2', '4', '6', '8', '10']"
          text-color="#008000"
          show-text
      />
      <el-input v-model="ownCommentEditInfo.comment" type="textarea" />
    </div>
    <template #footer>
      <el-button @click="handleEditDialogVisible">取 消</el-button>
      <el-button type="primary" @click="handleSubmitComment">提 交</el-button>
    </template>
  </el-dialog>

  <div class="comment-strip" v-show="ownComment.score !== 0">
    <p class="each-comment-tag">我的短评</p>
    <comment-strip :comment="ownComment"></comment-strip>
  </div>

  <div class="comment-strip">
    <p class="each-comment-tag">所有短评</p>
    <template v-for="(c, index) in comments" :key="index">
      <comment-strip :comment="c"></comment-strip>
      <el-divider />
    </template>
  </div>
</template>

<script>
import MovieInfo from "@/components/movie/MovieInfo";
import MovieComments from "@/components/movie/MovieComments";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {ErrorMessage, SuccessMessage, WarningMessage} from "@/utils/myMessage";
import {Edit} from "@element-plus/icons";
import commentRequest from "@/api/comment";
import CommentStrip from "@/components/basic/CommentStrip";

export default {
  name: 'MovieComments',
  components: { CommentStrip, Edit, MovieInfo, MovieComments },
  props: {
    mid: {
      type: String
    }
  },
  setup(props) {
    let movieId = ref(props.mid)
    let comments = reactive([])

    let ownComment = reactive({
      mid: movieId.value,
      score: 0,
      comment: '',
      time: '',
      agree: 0,
      nickname: '',
    })
    let ownCommentEditInfo = reactive({
      score: 0,
      comment: '',
    })

    let isEditDialogVisible = ref(false)
    let handleEditDialogVisible = () => {
      isEditDialogVisible.value = !isEditDialogVisible.value
    }
    let handleSubmitComment = () => {
      if (ownCommentEditInfo.score === 0) {
        WarningMessage('不可以给电影打0分 (┬┬﹏┬┬)')
      } else {
        // 向服务器发送提交请求
        ownComment.score = ownCommentEditInfo.score * 2
        ownComment.comment = ownCommentEditInfo.comment
        commentRequest.addComment(ownComment).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          console.error(err)
        })
        isEditDialogVisible.value = false
      }
    }

    commentRequest.getOwnComment(ownComment.mid).then(res => {
      if (res.code === 200) {
        let data = res.data
        ownComment.agree = data.agree
        ownComment.comment = data.comment
        ownComment.score = data.score
        ownComment.nickname = data.nickname
        ownComment.time = data.time
        ownCommentEditInfo.score = ownComment.score / 2
        ownCommentEditInfo.comment = ownComment.comment
      }
    }).catch(err => {
      console.error(err )
    })

    commentRequest.getCommentsByMovieId(ownComment.mid).then(res => {
      if (res.code === 200) {
        let newComments = res.data.comments
        for (let i = 0; i < newComments.length; ++ i) {
          comments.push(newComments[i])
        }
      }
    })

    return {
      comments,
      ownComment,
      ownCommentEditInfo,
      isEditDialogVisible,
      handleEditDialogVisible,
      handleSubmitComment,
    }
  },
}
</script>

<style scoped>
.comment-strip {
  margin-left: 2rem;
  margin-right: 2rem;
}

.each-comment-tag {
  margin-top: 1rem;
  font-size: 2rem;
  color: black;
  background-color: #73a2e7;
  border-radius: 0.6rem;
}

/deep/ .el-dialog {
  width: 40%
}

/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  /deep/ .el-dialog {
    width: 60%
  }
}
/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px){
  /deep/ .el-dialog {
    width: 80%
  }
}
</style>