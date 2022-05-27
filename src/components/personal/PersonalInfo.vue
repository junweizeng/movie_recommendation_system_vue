<template>
  <div class="personal-info-master">
    <div class="name-sex">
      <!-- 昵称和性别 -->
      <span class="nickname">{{ user.nickname }}</span>
      <span v-if="user.sex === '男'"><el-icon><male color="#36A4FF"/></el-icon></span>
      <span v-else-if="user.sex === '女'"><el-icon><female color="pink"/></el-icon></span>
      <span v-else><el-icon><paperclip color="#92ff9d"/></el-icon></span>
    </div>

    <div class="types">
      <span class="like">类型喜好：</span>
      <el-tag
          v-for="(type, index) in types"
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
          v-for="(region, index) in regions"
          :key="index"
          class="each-region"
          type="info"
          effect="dark"
      >
        {{ region }}
      </el-tag>
    </div>

    <div class="btn">
      <el-button @click="handleEditInfo" size="small" icon="Edit">编辑个人资料</el-button>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {Edit} from "@element-plus/icons";
import userRequest from "@/api/user";
import {ErrorMessage} from "@/utils/my-message";
import router from "@/router";
import emitter from "@/utils/event-bus";

export default {
  name: "PersonalInfo",
  components: {Edit},
  setup() {
    let user = reactive({
      id: -1,
      nickname: '',
      sex: '保密',
      avatar: '',
    })
    let types = ref([])
    let regions = ref([])

    /**
     * 每次初始化界面是判断token是否过期，如果没有过期，则显示登录基本信息
     */
    userRequest.getUserInfo().then(res => {
      if (res.code === 200) {
        // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let userInfo = res.data
        user.nickname = userInfo.nickname
        user.id = userInfo.id
        user.avatar = userInfo.avatar
        user.sex = userInfo.sex

        // 全局事件总线——触发：从服务器获取到个人信息后，将头像路径传递给Avatar.vue
        emitter.emit('handleEditAvatarChange', {
          avatar: user.avatar
        })

        userRequest.getTypesAndRegions().then(res => {
          types.value = res.data.types
          regions.value = res.data.regions
        }).catch(err => {
          console.error(err)
        })
      } else {
        ErrorMessage(res.msg)
      }
    }).catch(err => {
      console.error(err)
    })

    let handleEditInfo = () => {
      router.push({
        path: "/personal/edit"
      })
    }

    return {
      user,
      types,
      regions,
      handleEditInfo
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
  margin-top: 0.5rem;
}

.like {
  font-weight: 600;
  color: #73a2e7;
  font-size: 1.1rem;
}
</style>