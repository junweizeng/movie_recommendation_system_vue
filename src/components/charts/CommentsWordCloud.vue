<template>
  <el-button @click="handleShow" type="info">
    评论词云图
    <template #icon>
      <el-icon><MostlyCloudy /></el-icon>
    </template>
  </el-button>
  <el-dialog
      v-model="isShow"
      title="评论词云图"
      draggable
      :lock-scroll="false"
      width="100%"
  >
    <div ref="commentsWordCloud" style="width: 100%; height: 30rem;"></div>
  </el-dialog>
</template>

<script>
import 'echarts-wordcloud';
import {inject, nextTick, ref} from "vue";

export default {
  name: "CommentsWordCloud",
  props: {
    mid: {
      type: String,
      default: "",
    },
    wordCloudData: {
      type: Array,
      default: [],
      required: true,
    }
  },
  setup(props) {
    const echarts = inject('echarts');
    const commentsWordCloud = ref(null);

    let myChart = null;
    let option = null;
    const initChart = () => {
      if (myChart === null) {
        myChart = echarts.init(commentsWordCloud.value);
      }

      let maskImage = new Image();
      //词云形状的黑白矢量图
      maskImage.src = require('../../assets/movie_planet_2.webp');
      option = {
        series: [{
          type: 'wordCloud',
          // 要绘制的“云”的形状。可以是表示为回调函数或存在关键字的任何极坐标方程。
          // 可用的礼物有圆形（默认）、心形（苹果或心形曲线，最知名的极坐标方程）、菱形（正方形的别名）、
          // 正三角形、三角形、（正三角形、五边形和星形的别名)
          // circle (default), cardioid (apple or heart shape curve, the most known polar equation), diamond (
          // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.
          shape: 'circle',
          // 保持 maskImage 的纵横比或形状为 1:1 此选项支持 echarts-wordcloud@2.1.0
          keepAspect: false,

          // 词云的形状，根据所选的黑白矢量图来生成形状
          // maskImage: maskImage,

          // 以下 left/top/right/bottom 用于定位词云 默认放置在中心，大小为 75% x 80%。
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          // 数据中的值将被映射到的文本大小范围。默认具有最小 12 像素和最大 60 像素的大小。
          sizeRange: [12, 60],
          // 文本旋转范围和步长。文本将在 [-90, 90] 范围内通过 rotationStep 45 随机旋转
          rotationRange: [-45, 45],
          rotationStep: 45,
          // 用于标记画布可用性的网格大小（以像素为单位） 网格大小越大，单词之间的间隙越大。
          gridSize: 8,
          // 设置为 true 以允许在画布之外部分绘制单词。允许绘制大于画布大小的单词
          drawOutOfBound: false,
          // 如果执行布局动画。注意禁用它会导致当有很多单词时 UI 阻塞。
          layoutAnimation: true,
          // 全局文本样式
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // 颜色可以是回调函数或颜色字符串
            color: function () {
              // 随机颜色
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              textShadowBlur: 10,
              textShadowColor: '#333'
            }
          },

          // 数据是一个数组。每个数组项都必须具有 name 和 value 属性。
          data: props.wordCloudData,
        }]
      };

      // 绘制图表
      maskImage.onload = function () {
        myChart.setOption(option);
      };
      // 自适应，屏幕大小变化时，图像重新渲染
      window.onresize = function () {
        myChart.resize();
      };
    }

    let isFirst = true;
    let isShow = ref(false);
    const handleShow = () => {
      isShow.value = !isShow.value;
      if (isShow.value === true && isFirst) {
        // 只需再第一次的时候初始化词云图
        isFirst = false;
        // 将回调延迟到下次 DOM 更新循环之后执行
        nextTick(() => {
          initChart();
        })
      }
    }

    return {
      commentsWordCloud,
      isShow,
      handleShow,
    }
  }
}
</script>

<style scoped>

</style>