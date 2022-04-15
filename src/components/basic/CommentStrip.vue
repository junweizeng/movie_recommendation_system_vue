<template>
  <div class="comment-strip-master">
    <div class="comment-header">
      <el-avatar src="https://ts1.cn.mm.bing.net/th?id=OIP-C.ZeQ5h5qmFJdYmGKtrR-I9gAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" @error="errorHandler">
        <!-- 当图片加载错误时，将加载这里面的图片 -->
        <img src="../../assets/default_avatar.png"/>
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
      <p class="comment-content">{{ comment.comment }}</p>

      <slot name="movieInfo"></slot>
    </div>

    <div class="comment-bottom">
      <span>
        <el-icon size="25px" color="red"><caret-top /></el-icon>
      </span>
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
    let score = computed(() => {
      return props.comment.score / 2;
    })

    const errorHandler = () => true;

    return {
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
  margin: 1rem;

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
    font-size: 0.8rem;
    color: #91949c;
  }
}
</style>