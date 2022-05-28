<template>
  <div>
    <el-button @click="handleEditDialogVisible" type="warning" style="margin-left: 2rem">
      编辑短评
      <template #icon>
        <el-icon><edit/></el-icon>
      </template>
    </el-button>

    <comments-word-cloud :word-cloud-data="wordCloudData"></comments-word-cloud>

    <el-dialog v-model="isEditDialogVisible" title="编辑短评" :lock-scroll="false" draggable>
      <div>
        <el-rate
            v-model="ownCommentEditInfo.score"
            :texts="['2', '4', '6', '8', '10']"
            text-color="#008000"
            show-text
        />
        <el-input
            type="textarea"
            rows="5"
            maxlength="200"
            show-word-limit
            v-model="ownCommentEditInfo.comment"
        >
        </el-input>

        <span @click="isShowEmoji = !isShowEmoji">
        <svg-icon v-if="!isShowEmoji" icon-class="smile-beam"
                  style="color: rgb(255, 173, 24); width: 20px; height: 20px; margin-top: 0.5rem;"></svg-icon>
        <svg-icon v-if="isShowEmoji" icon-class="smile-wink"
                  style="color: rgb(255, 173, 24); width: 20px; height: 20px; margin-top: 0.5rem;"></svg-icon>
      </span>
        <EmojiPicker class="dialog-div"
                     v-show="isShowEmoji"
                     :native="true"
                     :disable-skin-tones="true"
                     @select="onSelectEmoji"
                     :static-texts="{ placeholder: '搜索表情'}"/>

      </div>
      <template #footer>
        <el-button v-if="isHaveOwnComment" type="danger" @click="handleRemoveComment">删除</el-button>
        <el-button @click="handleEditDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSubmitComment">提 交</el-button>
      </template>
    </el-dialog>

    <div class="comment-strip" v-show="ownComment.nickname !== ''">
      <div class="each-comment-tag">我的短评</div>
      <comment-strip :comment="ownComment" :is-own="true"></comment-strip>
    </div>

    <div class="comment-strip">
      <div class="each-comment-tag">所有短评</div>
      <template v-for="(c, index) in comments" :key="index">
        <comment-strip :comment="c"></comment-strip>
        <el-divider/>
      </template>
    </div>

    <div style="margin: 1rem 0;">
      <div v-if="!isReadyForLoad" v-loading="!isReadyForLoad" style="width: 100%; height: 2rem"></div>
      <div v-if="isAllComments" style="width: 100%; text-align: center; color: #91949c">评论到底啦(❁´◡`❁)~</div>
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/movie/MovieInfo";
import MovieComments from "@/components/movie/MovieComments";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {ErrorMessage, SuccessMessage, WarningMessage} from "@/utils/my-message";
import {Edit, Search} from "@element-plus/icons";
import commentRequest from "@/api/comment";
import CommentStrip from "@/components/basic/CommentStrip";

import EmojiPicker from 'vue3-emoji-picker'
import '@/../node_modules/vue3-emoji-picker/dist/style.css'
import SvgIcon from "@/components/basic/SvgIcon";
import CommentsWordCloud from "@/components/charts/CommentsWordCloud";

export default {
  name: 'MovieComments',
  components: {
    CommentsWordCloud,
    SvgIcon,
    CommentStrip,
    Edit,
    Search,
    MovieInfo,
    MovieComments,
    EmojiPicker,
  },
  props: {
    mid: {
      default: ''
    }
  },
  setup(props) {
    let movieId = ref(props.mid)
    // 是否有自己的评论（如果有则显示删除按钮，否则不显示）
    let isHaveOwnComment = ref(false)
    let comments = ref([])

    let ownComment = reactive({
      mid: movieId.value,
      id: '',
      score: 0,
      comment: '',
      time: '',
      agree: 0,
      nickname: '',
      avatar: '',
    })
    let ownCommentEditInfo = reactive({
      score: 0,
      comment: '',
    })

    let isEditDialogVisible = ref(false)
    watch(isEditDialogVisible, (newValue, oldValue) => {
      // 当编辑框关闭的时候，表情选择框也不显示
      if (!newValue) {
        isShowEmoji.value = false
      }
    })
    const handleEditDialogVisible = () => {
      isEditDialogVisible.value = !isEditDialogVisible.value
    }
    const onSelectEmoji = (emoji) => {
      ownCommentEditInfo.comment += emoji.i
    }
    let isShowEmoji = ref(false)
    const handleSubmitComment = () => {
      if (ownCommentEditInfo.score === 0) {
        WarningMessage('不可以给电影打0分 (┬┬﹏┬┬)')
      } else {
        // 向服务器发送提交请求
        ownComment.score = ownCommentEditInfo.score * 2
        ownComment.comment = ownCommentEditInfo.comment
        commentRequest.addComment(ownComment).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)

            // 如果用户评价成功，且之前没有评价过，那么此时发送请求获取当前评价信息，来更新界面
            if (ownComment.nickname === '') {
              handleGetOwnComment()
            }
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          console.error(err)
        })
        isEditDialogVisible.value = false
      }
    }

    const handleRemoveComment = () => {
      commentRequest.removeOwnComment(ownComment.mid).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);
          // 将其标记为false，表示有自己的评论已被删除，后面不会显示删除按钮
          isHaveOwnComment.value = false;
          ownComment.nickname = '';
          ownComment.comment = '';
          ownComment.score = 0;

          ownCommentEditInfo.score = 0;
          ownCommentEditInfo.comment = '';
        } else {
          ErrorMessage(res.msg);
        }
        isEditDialogVisible.value = false;
      }).catch(err => {
        console.error(err);
      })
    }

    let handleGetOwnComment = () => {
      commentRequest.getOwnComment(ownComment.mid).then(res => {
        if (res.code === 200) {
          // 将其标记为true，表示有自己的评论存在，后面会显示删除按钮
          isHaveOwnComment.value = true;
          let data = res.data;
          ownComment.id = data.id;
          ownComment.agree = data.agree;
          ownComment.comment = data.comment;
          ownComment.score = data.score;
          ownComment.nickname = data.nickname;
          ownComment.time = data.time;
          ownComment.avatar = data.avatar;

          ownCommentEditInfo.score = ownComment.score / 2;
          ownCommentEditInfo.comment = ownComment.comment;
        }
      }).catch(err => {
        console.error(err)
      })
    }
    handleGetOwnComment()

    let isAllComments = ref(false)
    let currentPage = 0;
    const pageSize = 10;
    let isReadyForLoad = ref(true); // 加载锁，首次允许
    function loadMoreComments() {
      // 如果加载锁为解锁状态，且未加载所有评论，则继续加载评论
      if (isReadyForLoad.value && !isAllComments.value) {
        // 需要加载时锁上，防止重复加载
        isReadyForLoad.value = false;
        commentRequest.getMoreCommentsByMovieId(ownComment.mid, currentPage, pageSize).then(res => {
          if (res.code === 200) {
            if (res.data.length !== 0) {
              comments.value = [...comments.value, ...res.data];
            } else {
              isAllComments.value = true;
            }
            currentPage++;
          }
          // 加载完成后，解锁
          isReadyForLoad.value = true;
        }).catch(err => {
          console.error(err)
        })
      }
    }
    // 初始化时加载一次评论
    loadMoreComments()

    /**
     * 滚动至底部加载更多
     * @param e
     */
    const handleInfiniteScroll = (e) => {
      // 浏览器整个框架的高度 = 滚动条卷去部分 + 可视部分 + 底部隐藏部分的高度。
      // 浏览器所有内容高度
      const scrollHeight = document.body.scrollHeight;
      // 浏览器滚动部分高度; || 两边获取的值是一样的，为了兼容个不同浏览器
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      // 浏览器可视部分高度
      const clientHeight = document.documentElement.clientHeight;

      // 计算 底部隐藏部分的高度
      const distance = scrollHeight - scrollTop - clientHeight;
      if (distance <= 50) {
        loadMoreComments()
      }
    }

    let wordCloudData = ref([])
    onMounted(() => {
      window.addEventListener('scroll', handleInfiniteScroll, true);
      /**
       * 请求获取评论词云图数据
       */
      commentRequest.getCommentsWordCloudData(props.mid).then(res => {
        if (res.code === 200) {
          wordCloudData.value = res.data;
        }
      }).catch(err => {
        console.error(err);
      })
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    })

    return {
      comments,
      ownComment,
      isShowEmoji,
      isAllComments,
      isReadyForLoad,
      isHaveOwnComment,
      ownCommentEditInfo,
      isEditDialogVisible,
      wordCloudData,
      handleEditDialogVisible,
      handleSubmitComment,
      handleRemoveComment,
      onSelectEmoji,
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
  margin-bottom: 1rem;
  font-size: 2rem;
  color: black;
  width: 100%;
  text-align: center;
  background-color: rgb(84, 92, 100);
  border-radius: 0.6rem;
}

.dialog-div {
  overflow: hidden;
  z-index: 9999;
  position: fixed;
  text-align: center;
  width: 300px;
  height: 300px;
  border-radius: 1rem;
}

/deep/ .el-dialog {
  width: 40%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  /deep/ .el-dialog {
    width: 70%;
  }
}

/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px) {
  /deep/ .el-dialog {
    width: 90%;
  }
}
</style>