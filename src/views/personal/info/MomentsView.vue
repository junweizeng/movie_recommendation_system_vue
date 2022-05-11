<template>
  <el-skeleton :loading="loading" :rows="5" animated />

  <template v-for="(moment, index) in moments" :key="index">
    <comment-strip :comment="moment.commentStripVo">
      <template v-slot:movieInfo>
        <movie-strip :movie="moment.movieStripVo"></movie-strip>
      </template>
    </comment-strip>
    <el-divider/>
  </template>

  <blank-page v-if="!loading && !moments.length" :page-name="'moment'"></blank-page>
</template>

<script>
import CommentStrip from "@/components/basic/CommentStrip";
import commentRequest from "@/api/comment";
import {ref} from "vue";
import MovieStrip from "@/components/basic/MovieStrip";
import SvgIcon from "@/components/basic/SvgIcon";
import BlankPage from "@/components/basic/BlankPage";

export default {
  name: "MomentsView",
  components: {BlankPage, MovieStrip, CommentStrip, SvgIcon},
  setup() {
    let loading = ref(true)
    let moments = ref([])

    commentRequest.getCommentMovieMoments().then(res => {
      if (res.code === 200) {
        moments.value = res.data
        loading.value = false
      }
    }).catch(err => {
      console.error(err)
    })
    return {
      loading,
      moments
    }
  }
}
</script>