<template>
  <div>
    <p class="panel-title">{{tag}}......</p>

    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <template v-for="movie in movies" :key="movie.id">
          <movie-card :movie="movie" class="movie-card-item"></movie-card>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {PictureFilled, PictureRounded} from "@element-plus/icons-vue";
import MovieCard from "@/components/basic/MovieCard";

export default {
  name: "MovieList",
  components: {PictureRounded, PictureFilled, MovieCard},
  props: {
    tag: {
      type: String,
      required: true,
      default: '我的推荐'
    },
    movies: {
      type: Object,
    }
  },
  setup(props) {
    // let movies = reactive([
    //   {id:'001',name:'战狼',src:'https://img0.baidu.com/it/u=2535847271,500295178&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',score:3.7},
    //   {id:'002',name:'中国医生',src:'https://img1.baidu.com/it/u=246487087,4260921059&fm=253&fmt=auto&app=138&f=JPEG?w=357&h=500',score:5},
    //   {id:'003',name:'我是传奇',src:'https://img1.baidu.com/it/u=556028526,3717333338&fm=253&fmt=auto&app=138&f=JPEG?w=339&h=500',score:4.7},
    //   {id:'004',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'005',name:'这个名字很长，用来测试页面11111111111111111',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'006',name:'八佰',src:'https://img1.baidu.com/it/u83581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'007',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'008',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'009',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    //   {id:'010',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
    // ])

    return {
      props,
      // movies
    }
  },
}
</script>

<style scoped>
.panel-title {
  font-size: 26px;
  color: #e52a0d;
  font-weight: bold;
  margin-bottom: 1rem;
}

.scrollbar-flex-content {
  display: flex;
  flex-wrap: nowrap;
}

.movie-card-item {
  margin: 1rem;
}

</style>