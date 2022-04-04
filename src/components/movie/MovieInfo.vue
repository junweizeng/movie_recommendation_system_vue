<template>
  <div class="movie-info-top">
    <div class="background">
      <el-row>
        <el-col :span="8">
          <div class="movie-info-top-left">
            <img class="image" src="https://th.bing.com/th/id/OIP.XVvUPh0iUBQkkgzg7UhdEwHaKX?w=195&h=273&c=7&r=0&o=5&dpr=1.25&pid=1.7"/>
          </div>
        </el-col>

        <el-col :span="16">
          <!--        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">-->
          <div class="movie-info-top-right">
            <!-- 电影名 -->
            <div class="movie-name">
              {{movie.name}}
            </div>
            <!-- 基本信息 + 评分 -->
            <el-row>
              <el-col :span="8">
                <div class="each">
                  <span>导演：</span>
                  <span>{{ movie.director }}</span>
                </div>
                <div class="each">
                  <span>类型：</span>
                  <span>{{ movie.type }}</span>
                </div>
                <div class="each">
                  <span>制片国家/地区：</span>
                  <span>{{ movie.region }}</span>
                </div>
                <div class="each">
                  <span>语言：</span>
                  <span>{{ movie.language }}</span>
                </div>
              </el-col>

              <el-col :span="16">
                <div class="rate">
                  <el-rate
                      v-model="movie.score"
                      :max="5"
                      size="large"
                      disabled
                      show-score
                      colors="['#5cb87a', '#e6a23c', '#f56c6c']"
                  />
                </div>
                <div class="rate" v-for="(p,index) in percentages" :key="index">
                  <el-progress :percentage="p.percentage" :color="p.color" />
                </div>
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
                    <el-collapse v-model="hello" @change="helloo">
                      <el-collapse-item title="&nbsp;&nbsp;&nbsp;&nbsp;电影简介" name="introduction">
                        <div>
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
                      width="25rem">
                    <span>{{ movie.actors }}</span>
                    <template #footer>
                    <span class="dialog-footer">
                      <el-button type="primary" @click="actorsDialogVisible = false">确认</el-button>
                    </span>
                    </template>
                  </el-dialog>
                </el-col>

                <el-col :span="16">
                  <el-button class="introduction-second" type="text" @click="introductionDialogVisible = true">电影简介...</el-button>
                  <el-dialog
                      v-model="introductionDialogVisible"
                      title="电影简介"
                      width="25rem">
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
import {reactive, ref} from "vue";

export default {
  name: 'MovieInfo',
  setup() {
    let actorsDialogVisible = ref(false)
    let introductionDialogVisible = ref(false)

    let movie = reactive({
      name: '肖申克的救赎 The Shawshank Redemption (1994)',
      director: '弗兰克·德拉邦特',
      type: '剧情 / 犯罪',
      region: '美国',
      language: '英语',
      actors: '蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿 / 威廉姆·赛德勒' +
          ' / 克兰西·布朗 / 吉尔·贝罗斯 / 马克·罗斯顿 / 詹姆斯·惠特摩 /' +
          ' 杰弗里·德曼 / 拉里·布兰登伯格 / 尼尔·吉恩托利 / 布赖恩·利比 /' +
          ' 大卫·普罗瓦尔 / 约瑟夫·劳格诺 / 祖德·塞克利拉 / 保罗·麦克兰尼 /' +
          ' 芮妮·布莱恩 / 阿方索·弗里曼 / V·J·福斯特 / 弗兰克·梅德拉诺 / ' +
          '马克·迈尔斯 / 尼尔·萨默斯 / 耐德·巴拉米 / 布赖恩·戴拉特 / 唐·麦克马纳斯',
      introduction: '布鲁斯·韦恩（罗伯特·帕丁森 饰）化身蝙蝠侠于哥谭市行侠仗义两年后，' +
          '罪犯皆闻风丧胆，他也因此深入接触到哥谭市的阴暗面。他潜行于哥谭市腐败的政要名流关系网中' +
          '，身边仅有的几个值得信赖的盟友——管家阿尔弗雷德·潘尼沃斯（安迪·瑟金斯 饰）与詹姆斯·' +
          '戈登警长（杰弗里·怀特 饰）。这位独行的“义警侠探”在哥谭市民心中已成为“复仇”二字最当仁不让的代名词。',
      score: 4,
    })

    let percentages = reactive([
      { color: '#f56c6c', percentage: 40 },
      { color: '#e6a23c', percentage: 20 },
      { color: '#5cb87a', percentage: 50 },
      { color: '#1989fa', percentage: 70 },
      { color: '#6f7ad3', percentage: 10 },
    ])

    return {
      actorsDialogVisible,
      introductionDialogVisible,
      movie,
      percentages,
    }
  }
}
</script>

<style scoped>
.movie-info-top {
  height: 38rem;
  width: 100%;
}

.movie-info-top .background {
  height: 33rem;
  background: #123456;
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
.movie-info-top-right {
  padding-top: 2.5%;
}

.movie-info-top-right .movie-name {
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
  margin-left: 2rem;
  margin-top: 5px;
  width: 60%;
}

.movie-info-top-right .actors-and-introduction {
  color: white;
  margin-top: 1rem;
}

.movie-info-top-right .introduction {
  margin-left: 2rem;
  width: 50%;
}

/************** 主演 和 简介 样式2 **************/
.actors-second, .introduction-second {
  font-size: 1.3rem;
}

.introduction-second {
  margin-left: 2rem;
}

@media screen and (max-width: 800px) {
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
}

@media screen and (min-width: 800px) and (max-width: 1200px) {
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
}

@media screen and (min-width: 1200px) and (max-width: 4000px) {
  .show-first {
    display: block;
  }
  .show-second {
    display: none;
  }
}
</style>
