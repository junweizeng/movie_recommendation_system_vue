<template>
  <div>
    <div ref="MovieRelationsGraphChart" class="movie-relations-chart-div"></div>
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import recommendationRequest from "@/api/recommendation";

export default {
  name: "MovieRelationsGraphChart",
  setup() {
    const echarts = inject('echarts')

    let MovieRelationsGraphChart = ref('MovieRelationsGraphChart')
    let option;

    onMounted(() => {
      const router = useRouter();
      let myChart = echarts.init(MovieRelationsGraphChart.value);

      // 如果数据还没加载出来，会展示loading的动画
      myChart.showLoading();
      recommendationRequest.getLinksBetweenWatchedMoviesAndRecommendedMovies().then(res => {
        myChart.hideLoading();
        option = {
          color: ['#fa7e23', '#5dbe8a'],
          // 图表标题
          title: {
            text: '电影星球',
            x: 'center',
            y: 'top',
            textStyle: {
              fontSize: 30,
              fontFamily: '宋体',
              fontWeight: 'bolder',
              color: '#36a4ff'
            },
          },
          // 图例
          legend: {
            orient: 'vertical',
            data: ['看过的电影', '推荐的电影'],
            x: 'left',                 // 水平安放位置
            backgroundColor: 'rgb(40, 61, 72)',
            borderColor: '#000000',    // 图例边框颜色
            borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
            padding: 20,               // 图例内边距，单位px，默认各方向内边距为5，
            itemGap: 15,               // 各个item之间的间隔，单位px，默认为10
            textStyle: {
              color: ['#fa7e23', '#5dbe8a'],    // 图例文字颜色
            }
          },
          tooltip: {
            trigger: 'item',
            showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 200,           // 隐藏延迟，单位ms
            formatter: (param) => {
              //为了保证和原来的效果一样，这里自己实现了一个点的效果
              let htmlStr = ''
              const color = param.color
              const data = param.data
              if (color) {
                htmlStr += '<span style="display:inline-block; width:10px; height:10px; border-radius:5px; background-color:' + color + ';"></span>'
                htmlStr += ' ' + data.name + ' : ' + data.value + ' 分<br/>'
                htmlStr += '类型: ' + data.types + '<br/>'
                htmlStr += '地区: ' + data.regions
              } else {
                htmlStr += '相似指数: ' + data.idx.toFixed(2) + '%'
              }
              return htmlStr
            }
          },
          series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                  color: '#B0CEFC'
                },
                position: 'top',
                formatter: '{b}'
              },
            },
            draggable: true,
            data: res.data.nodes,
            categories: res.data.categories,
            force: {
              //边的两个节点之间的距离.
              edgeLength: 50,
              // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              repulsion: 300,
              // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              gravity: 0.2,
              // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
              layoutAnimation: true,
            },
            edges: res.data.links,
          }
          ]
        };

        myChart.setOption(option);
        // 自适应，屏幕大小变化时，图像重新渲染
        window.onresize = function () {
          myChart.resize();
        };
      })

      myChart.on('click', param => {
        router.push({
          name: 'movieInfo',
          params: {
            id: param.data.mid
          }
        })
      })
    })

    return {
      MovieRelationsGraphChart
    }
  }
}
</script>

<style scoped>
.movie-relations-chart-div {
  background: url("../../assets/movie_planet_3.webp");
  background-size: cover;
  width: 100%;
  height: 1000px;
}
</style>