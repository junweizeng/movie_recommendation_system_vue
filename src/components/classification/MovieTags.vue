<template>
  <div class="tags my-border">
    <el-button class="btn" @click="refreshSelect" size="small" round>
      <el-icon style="vertical-align: middle;" >
        <refresh-right />
      </el-icon>
      <span style="vertical-align: middle;"> 重新加载 </span>
    </el-button>
    <div>
      <span class="each-tag">类型：</span>
      <el-radio-group v-for="(t,index) in types" :key="index"  v-model="type" size="small">
        <el-radio-button class="each" :label="t" />
      </el-radio-group>
    </div>
    <div>
      <span class="each-tag">地区：</span>
      <el-radio-group v-for="(r,index) in regions" :key="index"  v-model="region" size="small">
        <el-radio-button class="each" :label="r" />
      </el-radio-group>
    </div>
  </div>
</template>

<script>

import { RefreshRight } from "@element-plus/icons-vue";
import {reactive, ref, watch} from "vue";

export default {
  name: "MovieTags",
  components: { RefreshRight },
  setup() {
    let type = ref('全部')
    let region = ref('全部')
    const types = reactive([
      '全部','剧情','喜剧','动作','爱情',
      '科幻', '动画','悬疑','惊悚','恐怖',
      '犯罪', '同性','音乐','歌舞','传记',
      '历史', '战争','西部','奇幻','冒险',
      '灾难', '武侠','其他'
    ])
    const regions = reactive([
      '全部','中国大陆','欧美','美国','中国香港','中国台湾',
      '日本','韩国','英国','法国','德国','意大利',
      '西班牙','印度','泰国','俄罗斯','伊朗', '加拿大',
      '澳大利亚','爱尔兰','瑞典','巴西','丹麦'
    ])

    // 方法
    function refreshSelect() {
      type.value = types[0]
      region.value = regions[0]
    }

    // 监视type和region的变化
    watch([type,region],(newValue,oldValue)=>{
      console.log('type或region变化了',newValue,oldValue)
    })

    return {
      type,
      region,
      types,
      regions,
      refreshSelect,
    }
  }
}
</script>

<style scoped>
.tags{
  padding: 1rem;
}

.btn {
  margin-left: 1rem;
}

.each{
  margin-left: 1rem;
  margin-top: 1rem;
}

.each-tag {
  color: #7e7e7e;
  vertical-align: middle;
  margin-left: 1rem;
  margin-top: 1rem;
}
</style>