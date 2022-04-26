<template>
  <template v-for="(moment, index) in moments" :key="index">
    <comment-strip :comment="moment.commentStripVo">
      <template v-slot:movieInfo>
        <movie-strip :movie="moment.movieStripVo"></movie-strip>
      </template>
    </comment-strip>
    <el-divider/>
  </template>
</template>

<script>
import CommentStrip from "@/components/basic/CommentStrip";
import commentRequest from "@/api/comment";
import {ref} from "vue";
import MovieStrip from "@/components/basic/MovieStrip";

export default {
  name: "MomentsView",
  components: {MovieStrip, CommentStrip},
  setup() {
    let moments = ref([])

    commentRequest.getCommentMovieMoments().then(res => {
      if (res.code === 200) {
        moments.value = res.data
      }
    }).catch(err => {
      console.error(err)
    })
    return {
      moments
    }
  }
}
</script>

<style scoped>

</style>