<template>
  <div ref="scorePieChart" style="width: 100%; height: 300px;"></div>
</template>

<script>
import {inject, onMounted, ref} from "vue";

export default {
  name: 'ScorePieChart',
  setup() {
    const echarts = inject('echarts')
    const scorePieChart = ref(null)

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 26.7, name: '1星\n25.7%'},
            {value: 33.3, name: '2星\n33.3%'},
            {value: 10, name: '3星\n10%'},
            {value: 10, name: '4星\n10%'},
            {value: 20, name: '5星\n20%'}
          ]
        }
      ]
    };

    onMounted(() => {
      const myChart = echarts.init(scorePieChart.value)
      // 绘制图表
      myChart.setOption(option)
      window.onresize = () => {
        myChart.resize()
      }
    })

    return {
      scorePieChart
    }
  }
}
</script>

<style scoped>

</style>