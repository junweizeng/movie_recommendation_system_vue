<template>
  <div class="movie-cards-master my-border">
    <div class="movie-cards">
      <template
          v-for="movie in currentMovies"
          :key="movie.id">
        <movie-card class="card" :movie="movie"></movie-card>
      </template>
    </div>

    <div v-show="movies.length > 10" class="pagination-style-first">
      <el-pagination
          style="justify-content: center"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          v-model:total="movies.length"
          pager-count="5"
          background
          layout="total, prev, pager, next, jumper"
      />
    </div>

    <div v-show="movies.length > 10"  class="pagination-style-second">
      <el-pagination
          style="justify-content: center"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          v-model:total="movies.length"
          pager-count="5"
          small
          background
          layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script>
import {PictureRounded} from "@element-plus/icons-vue";
import MovieCard from "@/components/basic/MovieCard";
import {reactive, ref, toRefs, watch} from "vue";

export default {
  // 这里用来纪念一下困扰我多天的低级错误，把MovieCard.vue 和 MovieCards.vue的name都写成了MovieCard，导致递归堆栈溢出问题！！！
  name: "MovieCards",
  components: {PictureRounded, MovieCard},
  setup() {
    let movies = reactive([
      {id:'001',name:'战狼',src:'https://img0.baidu.com/it/u=2535847271,500295178&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',score:3.7},
      {id:'002',name:'中国医生',src:'https://img1.baidu.com/it/u=246487087,4260921059&fm=253&fmt=auto&app=138&f=JPEG?w=357&h=500',score:5},
      {id:'003',name:'我是传奇',src:'https://img1.baidu.com/it/u=556028526,3717333338&fm=253&fmt=auto&app=138&f=JPEG?w=339&h=500',score:4.7},
      {id:'004',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'005',name:'这个名字很长，用来测试页面11111111111111111',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'006',name:'八佰',src:'https://img1.baidu.com/it/u83581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'007',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'008',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'009',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'010',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'011',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'012',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'013',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'014',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'015',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'016',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'017',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'018',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'019',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4},
      {id:'020',name:'八佰',src:'https://img1.baidu.com/it/u=2211775819,2883581277&fm=253&fmt=auto&app=120&f=JPEG?w=540&h=763',score:4}
    ])

    let currentPage = ref(1);
    let pageSize = ref(12);
    let total = ref(movies.length);

    let currentMovies = reactive(movies.slice(0, pageSize.value))

    watch(currentPage, (newValue, oldValue) => {
      let ps = pageSize.value
      let begin = (newValue - 1) * ps
      let end = newValue * ps
      let len = currentMovies.length
      while (len -- ) {
        currentMovies.pop()
      }
      currentMovies.push(...movies.slice(begin, end))
      console.log('currentMovies', currentMovies)
    });

    watch(pageSize, (newValue, oldValue) => {
      console.log('page-size', newValue)
    })

    return {
      pageSize,
      currentPage,
      total,
      movies,
      currentMovies,
    }
  },
}
</script>

<style lang="less" scoped>
.movie-cards-master {
  margin-bottom: 1rem;
  text-align: center;
}

/* 整体样式 */
.movie-cards {
  padding: 1rem;
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 13.8rem);

  .card {
    margin-top: 1rem;
  }
}

/* 分页模块样式 */
.pagination-style-first, .pagination-style-second {
  margin: 1rem 0;
}

.pagination-style-first {
  display: block;
}

.pagination-style-second {
  display: none;
}

@media screen and (max-width: 1000px) {
  .pagination-style-first {
    display: none;
  }
  .pagination-style-second {
    display: block;
  }
}

</style>
