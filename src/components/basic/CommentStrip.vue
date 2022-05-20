<template>
  <div class="comment-strip-master">
    <div class="comment-header">
      <el-avatar :src="comment.avatar" @error="errorHandler">
        <!-- 当图片加载错误时，将加载这里面的图片 -->
        <img src="../../assets/default_avatar.png" alt="default_avatar"/>
      </el-avatar>

      <div class="right">
        <div class="name">{{ comment.nickname }}</div>
        <div class="score-and-time">
          <span>
            <el-rate v-model="score" disabled/>
          </span>
          <span>{{ comment.time }}</span>
        </div>
      </div>
    </div>

    <div class="comment-middle">
      <p v-if="comment.comment" class="comment-content">{{ comment.comment }}</p>
      <p v-else style="color: #a89e9e">该用户很懒，啥也没写。</p>
      <slot name="movieInfo"></slot>
    </div>

    <div class="comment-bottom">
      <!-- out-in 当前元素先进行过渡，完成之后新元素过渡进入。 -->
      <transition
          name="fade" mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          :duration="150">
        <svg-icon v-if="!isLike" @click="isLike = !isLike" icon-class="no_like_1" style="width: 1rem; height: 1rem;"></svg-icon>
        <svg-icon v-else @click="isLike = !isLike" icon-class="liked_1" style="width: 1rem; height: 1rem;"></svg-icon>
      </transition>
      <span class="agree">{{ comment.agree }}</span>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  name: "CommentStrip",
  props: {
    comment: {
      type: Object,
      default: {
        avatar: '',
        nickname: '',
        score: 0,
        time: '',
        comment: '',
        agree: 0,
      }
    }
  },
  setup(props) {
    let isLike = ref(false)

    let score = computed(() => {
      return props.comment.score / 2;
    })

    const errorHandler = () => true;

    return {
      isLike,
      score,
      errorHandler,
    }
  }
}
</script>

<style lang="less" scoped>
.comment-header {
  display: flex;
  align-items: center;

  .right {
    margin-left: 1rem;

    .name {
      font-size: 1.2rem;
    }

    .score-and-time {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      color: #91949c;
    }
  }
}

.comment-middle {
  margin-left: 2rem;

  .comment-content {
    // 参考链接：https://blog.csdn.net/iceking66/article/details/78253186
    // 保留空白符序列，但是正常地进行换行。
    white-space: pre-wrap;
  }
}

.comment-bottom {
  display: flex;
  align-items: center;
  .agree {
    margin-left: 0.3rem;
    font-size: 0.8rem;
    color: #91949c;
  }
}
</style>