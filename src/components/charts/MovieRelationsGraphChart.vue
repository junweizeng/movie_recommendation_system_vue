<template>
  <div ref="MovieRelationsGraphChart" style="width: 100%; height: 1000px;"></div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "MovieRelationsGraphChart",
  setup() {
    const echarts = inject('echarts')

    const ROOT_PATH =
        'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

    let MovieRelationsGraphChart = ref('MovieRelationsGraphChart')
    let option;

    onMounted(() => {
      const router = useRouter()
      let myChart = echarts.init(MovieRelationsGraphChart.value);

      // 如果数据还没加载出来，会展示loading的动画
      myChart.showLoading();
      axios.get('http://localhost:8888/movie/relations').then(res => {
        console.log(res)
        console.log(res.data.data.nodes)
        console.log(res.data.data.links)
        console.log(res.data.data.categories)
        myChart.hideLoading();
        option = {
          legend: {
            data: ['test', 'test2']
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              animation: false,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              draggable: true,
              data: res.data.data.nodes.slice(0, 100),
              categories: res.data.data.categories,
              force: {
                edgeLength: 5,
                repulsion: 20,
                gravity: 0.05
              },
              edges: res.data.data.links.slice(0, 10000),
            }
          ]
        };

        myChart.setOption(option);
      })

      myChart.on('click', param => {
        console.log('param---->', param);  // 打印出param, 可以看到里边有很多参数可以使用
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

</style>