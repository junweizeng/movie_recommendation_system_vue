<template>
  <div class="comment-strip-master">
    <div class="comment-header">
      <el-avatar src="https://ts1.cn.mm.bing.net/th?id=OIP-C.ZeQ5h5qmFJdYmGKtrR-I9gAAAA&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2" @error="errorHandler">
        <!-- 当图片加载错误时，将加载这里面的图片 -->
        <img src="../../assets/default_avatar.png"/>
      </el-avatar>

      <div class="right">
        <div class="name">Vanish丶</div>
        <div class="score-and-time">
          <span>
            <el-rate v-model="score" disabled/>
          </span>
          <span>2020/10/10 12:30:30</span>
        </div>
      </div>
    </div>

    <div class="comment-middle">
      <p>这是用来测试的评论</p>

      <slot name="movieInfo"></slot>
    </div>

    <div class="comment-bottom">
      <span>
        <el-icon size="25px" color="red"><caret-top /></el-icon>
      </span>
      <span class="agree">520</span>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CommentStrip",
  setup() {
    let score = ref(4)

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