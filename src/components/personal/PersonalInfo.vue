<template>
  <div class="personal-info-master">
    <div class="name-sex">
      <!-- 昵称和性别 -->
      <span class="nickname">{{ user.nickname }}</span>
      <span v-if="user.sex === '男'"><el-icon><male color="#36A4FF" /></el-icon></span>
      <span v-else-if="user.sex === '女'"><el-icon><female color="pink" /></el-icon></span>
      <span v-else><el-icon><paperclip color="#92ff9d" /></el-icon></span>
    </div>

    <div class="types">
      <span class="like">类型喜好：</span>
      <el-tag
          v-for="(type, index) in user.types"
          :key="index"
          class="each-type"
          type="info"
          effect="dark"
      >
        {{ type }}
      </el-tag>
    </div>

    <div class="regions">
      <span class="like">地区喜好：</span>
      <el-tag
          v-for="(region, index) in user.regions"
          :key="index"
          class="each-region"
          type="info"
          effect="dark"
      >
        {{ region }}
      </el-tag>
    </div>

    <div class="btn">
      <el-button size="small" icon="Edit">编辑个人资料</el-button>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import {Edit} from "@element-plus/icons";

export default {
  name: "PersonalInfo",
  components: {Edit},
  setup() {
    let user = reactive({
      nickname: 'Vanish丶',
      sex: '男',
      types: ['科幻','剧情','动作'],
      regions: ['中国大陆','美国'],
    })

    return {
      user,
    }
  }
}
</script>

<style scoped>
.personal-info-master {
  margin-top: 5px;
  margin-bottom: 5px;
}

.nickname {
  font-size: 2rem;
  font-weight: 600;
  color: #b2c8ec;
  margin-right: 0.6rem;
}

.types, .regions, .btn {
  margin-top: 1rem;
}

.each-type, .each-region {
  margin-left: 1rem;
}

.like {
  font-weight: 600;
  color: #73a2e7;
  font-size: 1.1rem;
}
</style>