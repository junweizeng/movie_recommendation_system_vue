<template>
  <div class="main">
    <div class="personal-div-top">
      <avatar-edit :size="12" class="avatar" />
      <personal-info class="info" />
    </div>

    <el-tabs type="border-card" class="demo-tabs">
      <!-- 系统推荐 -->
      <el-tab-pane>
        <template #label>
          <span class="tab-labels">
            <el-icon><document-checked /></el-icon>
            <span>系统推荐</span>
          </span>
        </template>

        <recommended-movies></recommended-movies>
      </el-tab-pane>

      <!-- 动态 -->
      <el-tab-pane>
        <template #label>
          <span class="tab-labels">
            <el-icon><chat-round /></el-icon>
            <span>动态</span>
          </span>
        </template>

        <comment-movie-moments></comment-movie-moments>
      </el-tab-pane>

      <!-- 我看过的 -->
      <el-tab-pane>
        <template #label>
          <span class="tab-labels">
            <el-icon><film /></el-icon>
            <span>我看过的</span>
          </span>
        </template>

        <reviewed-movies></reviewed-movies>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AvatarEdit from "@/components/personal/edit/AvatarEditing";
import {Avatar} from "@element-plus/icons-vue";
import PersonalInfo from "@/components/personal/PersonalInfo";
import MovieCard from "@/components/classification/MovieCards";
import MovieStrip from "@/components/basic/MovieStrip";
import CommentStrip from "@/components/basic/CommentStrip";
import CommentMovieMoments from "@/components/personal/CommentMovieMoments";
import ReviewedMovies from "@/components/personal/ReviewedMovies";
import RecommendedMovies from "@/components/personal/RecommendedMovies";

export default {
  name: "PersonalView",
  components: {
    RecommendedMovies,
    ReviewedMovies,
    CommentMovieMoments,
    MovieCard,
    Avatar,
    AvatarEdit,
    PersonalInfo,
    MovieStrip,
    CommentStrip,
  },
}
</script>

<style lang="less" scoped>
//整体布局
.main {
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

//头像和基本信息
.personal-div-top {
  margin-bottom: .1rem;
  flex: 60%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding-left: 1rem;
  vertical-align: bottom;

  .info {
    padding-left: 1rem;
  }
}

// 标签页
.demo-tabs /deep/ .el-tabs__content {
  padding: 32px;
  //color: #b2c8ec;
  //font-size: 32px;
  font-weight: 600;
}

.el-icon /deep/ .el-icon {
  vertical-align: middle;
}

 /deep/ .el-tabs {
   padding: 0;
   border-width: 0;
}



// 媒体查询
@media screen and (min-width: 700px) and (max-width: 1200px) {
  .main {
    padding-left: 0;
    padding-right: 0;
  }
}

@media screen and (max-width: 700px) {
  .main {
    padding-left: 0;
    padding-right: 0;
  }

  .personal-div-top {
    padding-left: 0;
    flex-direction: column;

    .avatar {
      margin: 0 auto;
    }
  }


}
</style>