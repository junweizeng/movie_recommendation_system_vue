<template>
  <div class="movie-strip-master">
    <slot name="header"></slot>

    <div class="image-div-and-info">
      <!-- 电影海报 -->
      <div class="image-div">
        <a :href="`/movie/info/${movie.id}`">
          <el-image :src="movie.pic" class="image">
            <template #error>
              <div class="image-error">
                <film class="center-image-error"></film>
                <img class="background-image-error" src="../../assets/default-movie.png" alt="default"/>
              </div>
            </template>
          </el-image>
        </a>
      </div>

      <!-- 电影基本信息 -->
      <div class="info">
        <a :href="`/movie/info/${movie.id}`" target="_blank">
          <div class="movie-name line-limit-length">{{ movie.name }}</div>
        </a>

        <el-rate
            v-model="score"
            disabled
            show-score
            disabled-void-color="rgb(226, 226, 226)"
            :score-template="`${ movie.score }`"
        />

        <el-row>
          <el-col :span="1">
            <el-divider style="height: 100%" direction="vertical"/>
          </el-col>

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
      </div>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "MovieStrip",
  props: {
    movie: {
      type: Object,
      default: {
        id: -1,
        name: 'Default Movie',
        pic: '',
        score: 0,
        directors: 'directors',
        actors: 'actors',
        regions: 'regions',
        types: 'types',
      }
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
  border-width: 0;
  border-radius: 0.5rem;
  border-color: #f2f2f6;

  .image-div-and-info {
    display: flex;
  }
}

.movie-strip-master:hover {
  border-style: solid;
  border-color: #b0d2e5;
  border-radius: 0.5rem;
  border-width: 1px;
  box-shadow: 0.5rem 1rem 1rem #b0d2e5;
  transition: all 0.5s;
  background-image: linear-gradient(to right, #b0d2e5, #da9797);
  //background-image: linear-gradient(to right, #b2fefa, #0ed2f7);
}

.image {
  border-radius: 0.5rem;
  height: 14rem;
  width: 9.47rem;
  background-color: #f5f7fa;
}

.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  .center-image-error {
    position: absolute;
    justify-content: center;
    width: 2rem;
  }

  .background-image-error {
    width: 100%;
    height: 100%;
  }

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
  white-space: nowrap; /*文本不换行，这样超出一行的部分被截取，显示...*/
}

/*未访问：蓝色、无下划线*/
a:link {
  color: black;
  text-decoration: none;
}

/*激活：红色*/
a:active {
  color: black;
}

/*已访问：紫色、无下划线*/
a:visited {
  color: black;
  text-decoration: none;
}

/*鼠标移近：红色、下划线*/
a:hover {
  color: red;
  text-decoration: none;
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