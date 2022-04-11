<template>
  <div class="movie-strip-master">
    <div class="image-div">
      <el-image :src="movie.src" class="image">
        <template #error>
          <picture-rounded class="image-error"></picture-rounded>
        </template>
      </el-image>
    </div>

    <div class="info">
      <div class="movie-name line-limit-length">{{ movie.name }}</div>

      <el-rate
          v-model="score"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${ movie.score }`"
      />

      <el-row>
        <el-col :span="1"><el-divider style="height: 100%" direction="vertical" /></el-col>

        <el-col :span="23" style="padding-left: 0.2rem">
          <div class="line-limit-length">
            导演：{{ movie.directors }}
          </div>

          <div class="line-limit-length">
            主演：{{ movie.actors }}
          </div>

          <div class="line-limit-length">
            地区：{{ movie.regions }}
          </div>

          <div class="line-limit-length">
            类型：{{ movie.types }}
          </div>
        </el-col>

      </el-row>

      <div style="margin-top: 1rem">

      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "MovieStrip",
  props: {
    movie: {
      type: Object,
    }
  },
  setup(props) {
    let score = ref(props.movie.score / 2.0);
    return {
      props,
      score
    }
  }
}
</script>

<style lang="less" scoped>
.movie-strip-master {
  //background-color: #d6dbe7;
  display: flex;
  border-width: 0;
  border-radius: 0.5rem;
  border-color: #f2f2f6;
}

.movie-strip-master:hover {
  border-style:solid;
  border-color: #b0d2e5;
  border-radius: 0.5rem;
  border-width: 1px;
  box-shadow: 0.5rem 1rem 1rem #b0d2e5;
  transition: all 0.5s;
  //background-image: linear-gradient(to right, #b0d2e5, #da9797);
  background-image: linear-gradient(to right, #b2fefa, #0ed2f7);
}

.image {
  border-radius: 0.5rem;
  height: 14rem;
  width: 9.47rem;
}

.info {
  color: #91949c;
  padding-left: 1rem;
}

.movie-name {
  color: black;
  font-size: 2rem;
}

.line-limit-length {
  width: 35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;    /*文本不换行，这样超出一行的部分被截取，显示...*/
}

@media screen and (max-width: 400px) {
  .line-limit-length {
    width: 18rem;
  }
}

@media screen and (min-width: 400px) and (max-width: 600px) {
  .line-limit-length {
    width: 20rem;
  }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
  .line-limit-length {
    width: 30rem;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .line-limit-length {
    width: 27rem;
  }
}

@media screen and (min-width: 1400px) {
  .line-limit-length {
    width: 38rem;
  }
}
</style>