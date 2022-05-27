<template>
  <div class="card">
    <slot name="header"></slot>

    <a :href="`/movie/info/${movie.id}`" target="_blank">
      <div class="image-div">
        <el-image :src="pic" class="image">
          <template #error>
            <div class="image-error">
              <film class="center-image-error"></film>
              <img class="background-image-error" src="../../assets/default-movie.png" alt="default"/>
            </div>
          </template>
        </el-image>
      </div>

      <div style="padding: 1rem">
        <el-tooltip
            class="box-item"
            effect="light"
            :content="`${ movie.name }`"
            placement="top"
        >
          <div class="line-limit-length">{{ movie.name }}</div>
        </el-tooltip>

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
      </div>
    </a>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import {PictureFilled, PictureRounded} from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";

export default {
  name: "MovieCard",
  components: {PictureRounded, PictureFilled},
  props: {
    movie: {
      type: Object,
    }
  },
  setup(props) {
    let score = computed(() => {
      return props.movie.score / 2;
    })
    let pic = ref(props.movie.pic)

    return {
      props,
      score,
      pic
    }
  }
}
</script>

<style lang="less" scoped>

.card {
  position: relative;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: #eaeaf6;
  /*box-shadow: 10px 10px 20px #888888;*/
  //max-height: 25rem;
  //min-height: 25rem;

  width: 13.8rem;
  margin-bottom: 1rem;
}

.card:hover {
  border-style: solid;
  border-color: #f2f2f6;
  border-radius: 0.5rem;
  border-width: 1px;
  box-shadow: 0 10px 20px #dcdbdb;
  transition: all 0.2s;
}

.image-div {
  margin: 0 auto;
  width: 13.8rem;
  max-height: 19.8rem;
  min-height: 19.8rem;
  background-color: #f5f7fa;
}

.image {
  border-radius: 0.5rem;
  width: 100%;
  height: 19.8rem;
}

.line-limit-length {
  width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /*文本不换行，这样超出一行的部分被截取，显示...*/
  text-align: center;
}

.rate {
  text-align: center;
}

.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 100%;

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

</style>