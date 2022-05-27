<template>
  <router-view/>
  <el-backtop/>
</template>

<script>
import * as echarts from 'echarts'
import {provide} from 'vue'

export default {
  name: 'App',
  setup() {
    provide('echarts', echarts) //provide
  },
}
</script>

<style>
body {
  width: 100%;
  /*min-width: 1400px;*/
  height: 100%;
  margin: 0;
}

.my-border {
  border-style: solid;
  border-color: #f2f2f6;
  border-radius: 1rem;
  border-width: 1px;
  box-shadow: 8px 8px 12px #dcdbdb;
}

@media (min-width: 1000px) and (max-width: 1200px) {
  html {
    font-size: 16px;
  }
}

@media (min-width: 960px) and (max-width: 1000px) {
  html {
    font-size: 15px;
  }
}

@media (min-width: 920px) and (max-width: 960px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 880px) and (max-width: 920px) {
  html {
    font-size: 13px;
  }
}

@media (min-width: 840px) and (max-width: 880px) {
  html {
    font-size: 13px;
  }
}

@media (min-width: 768px) and (max-width: 840px) {
  html {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 11px;
  }
}
</style>