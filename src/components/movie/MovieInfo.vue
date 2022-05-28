<template>
  <div class="blur-bg" :style="`background-image: url(${movie.pic})`"></div>
  <div class="movie-info-top">
    <div class="background">
      <el-row>
        <el-col :span="8">
          <div class="movie-info-top-left">
            <img class="image" :src="movie.pic"/>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="movie-info-top-right">
            <!-- 电影名 -->
            <div class="movie-name">
              {{ movie.name }}
            </div>

            <!-- 基本信息 + 评分 -->
            <el-row>
              <el-col :span="8">
                <div class="each">
                  <span>导演：</span>
                  <span>{{ movie.directors }}</span>
                </div>
                <div class="each">
                  <span>类型：</span>
                  <span>{{ movie.types }}</span>
                </div>
                <div class="each">
                  <span>制片国家/地区：</span>
                  <span>{{ movie.regions }}</span>
                </div>
                <div class="each">
                  <span>语言：</span>
                  <span>{{ movie.languages }}</span>
                </div>
              </el-col>

              <el-col :span="16">
                <div class="rate">
                  <el-rate
                      v-model="score"
                      disabled
                      show-score
                      size="small"
                      text-color="#ff9900"
                      :score-template="`${ movie.score }`"
                  />
                </div>
                <el-row class="rate" v-for="(p,index) in percentages" :key="index">
                  <el-col :span="5" :style="`color: ${p.color}; text-align: center;`">{{ p.text }}</el-col>
                  <el-col :span="19">
                    <el-progress :percentage="p.percentage" :color="p.color"/>
                  </el-col>

                </el-row>
              </el-col>
            </el-row>
            <!-- 主演 + 电影简介 展现形式1 -->
            <div class="show-first">
              <el-row class="actors-and-introduction">
                <el-col :span="8">
                  <span>主演：</span>
                  <span class="actors">{{ movie.actors }}</span>
                </el-col>
                <el-col :span="16">
                  <div class="introduction">
                    <el-collapse>
                      <el-collapse-item title="&nbsp;&nbsp;&nbsp;&nbsp;电影简介" name="introduction">
                        <div style="margin: 0 1rem">
                          {{ movie.introduction }}
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 主演 + 电影简介 展现形式2 -->
            <div class="show-second">
              <el-row class="actors-and-introduction">
                <el-col :span="8">
                  <el-button class="actors-second" type="text" @click="actorsDialogVisible = true">主演...</el-button>
                  <el-dialog
                      v-model="actorsDialogVisible"
                      title="主演"
                      width="25rem"
                      :lock-scroll="false">
                    <span>{{ movie.actors }}</span>
                    <template #footer>
                    <span class="dialog-footer">
                      <el-button type="primary" @click="actorsDialogVisible = false">确认</el-button>
                    </span>
                    </template>
                  </el-dialog>
                </el-col>

                <el-col :span="16">
                  <el-button class="introduction-second" type="text" @click="introductionDialogVisible = true">电影简介...
                  </el-button>
                  <el-dialog
                      v-model="introductionDialogVisible"
                      title="电影简介"
                      width="25rem"
                      :lock-scroll="false">
                    <span>{{ movie.introduction }}</span>
                    <template #footer>
                    <span class="dialog-footer">
                      <el-button type="primary" @click="introductionDialogVisible = false">确认</el-button>
                    </span>
                    </template>
                  </el-dialog>
                </el-col>
              </el-row>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import movieRequest from "@/api/movie";
import {ErrorMessage} from "@/utils/my-message";

export default {
  name: 'MovieInfo',
  setup() {
    const router = useRouter();
    let actorsDialogVisible = ref(false);
    let introductionDialogVisible = ref(false);
    let movie = ref({
      actors: '',
      alias: '',
      did: '',
      directors: '',
      five: '',
      four: '',
      id: '',
      imdb: '',
      introduction: '',
      languages: '',
      name: '',
      num: '',
      one: '',
      pic: '',
      regions: '',
      releaseDate: '',
      runtime: '',
      score: '',
      three: '',
      two: '',
      types: '',
      writers: '',
      year: '',
    });
    let score = ref(0);
    let percentages = ref([]);

    // 初始化界面前，请求电影信息
    movieRequest.getMovieInfo(
        router.currentRoute.value.params.id
    ).then(res => {
      if (res.code === 200) {
        movie.value = res.data;
        score.value = movie.value.score / 2.0;
        percentages.value = [
          {color: '#f56c6c', percentage: movie.value.five, text: '5星'},
          {color: '#e6a23c', percentage: movie.value.four, text: '4星'},
          {color: '#5cb87a', percentage: movie.value.three, text: '3星'},
          {color: '#1989fa', percentage: movie.value.two, text: '2星'},
          {color: '#6f7ad3', percentage: movie.value.one, text: '1星'},
        ]
      } else {
        ErrorMessage(res.msg)
      }
    }).catch(err => {
      ErrorMessage(err)
    })

    return {
      actorsDialogVisible,
      introductionDialogVisible,
      movie,
      score,
      percentages,
    }
  },
}
</script>

<style scoped>
.blur-bg {
  height: 36rem;
  width: 100%;
  filter: blur(1rem) brightness(85%);
  position: absolute;
  background-size: cover;
}

.movie-info-top {
  height: 38rem;
  width: 100%;
  background-size: cover;
}

.movie-info-top .background {
  height: 36rem;
}

.movie-info-top-left, .movie-info-top-right {
  width: 100%;
  height: 100%;
}

/************** top left **************/
.movie-info-top-left .image {
  margin-top: 5%;
  margin-left: 20%;
  text-align: center;
  width: 60%;
}

/************** top right **************/
.movie-info-top-right .movie-name {
  padding-top: 2rem;
  color: white;
  width: 80%;
  font-size: 2rem;
  font-weight: bold;
}

.movie-info-top-right .each {
  color: white;
  margin-top: 1rem;
  max-width: 100%;
}

.movie-info-top-right .rate {
  font-size: 0.7rem;
  margin-left: 2rem;
  margin-top: 5px;
  width: 30%;
}

.movie-info-top-right .actors-and-introduction {
  color: white;
  margin-top: 1rem;
}

.movie-info-top-right .introduction {
  margin-left: 2rem;
  width: 50%;
}

/deep/ .el-rate__text {
  color: #ff9900;
}

/************** 主演 和 简介 样式2 **************/
.actors-second, .introduction-second {
  font-size: 1.3rem;
}

.introduction-second {
  margin-left: 2rem;
}

@media screen and (max-width: 1200px) {
  .show-first {
    display: none;
  }

  .show-second {
    display: block;
  }

  .movie-info-top {
    height: 100%;
  }

  .movie-info-top .background {
    height: 100%;
  }

  .movie-info-top-left .image {
    margin-top: 20%;
  }

  .movie-info-top-right .rate {
    width: 60%;
  }
}

@media screen and (min-width: 1200px) and (max-width: 4000px) {
  .show-first {
    display: block;
  }

  .show-second {
    display: none;
  }
}

@media screen and (max-width: 450px) {
  .blur-bg {
    height: 26rem;
  }
}

@media screen and (min-width: 450px) and (max-width: 501px) {
  .blur-bg {
    height: 25rem;
  }
}

@media screen and (min-width: 501px) and (max-width: 700px) {
  .blur-bg {
    height: 23rem;
  }
}

@media screen and (min-width: 700px) and (max-width: 800px) {
  .blur-bg {
    height: 24rem;
  }
}

@media screen and (min-width: 800px) and (max-width: 1200px) {
  .blur-bg {
    height: 22rem;
  }
}
</style>
