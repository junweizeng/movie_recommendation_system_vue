<template>
  <div class="main">
    <div class="personal-div-top">
      <avatar-edit :size="12" class="avatar"/>
      <personal-info class="info"/>
    </div>

    <el-menu
        mode="horizontal"
        @select="handleIndexChange"
        :default-active="activeIndex"
        class="setting-menu-first"
    >
      <el-menu-item index="personalRecommendation">
        <el-icon>
          <document-checked/>
        </el-icon>
        <span>推荐</span>
      </el-menu-item>
      <el-menu-item index="personalMoments">
        <el-icon>
          <chat-round/>
        </el-icon>
        <span>动态</span>
      </el-menu-item>
      <el-menu-item index="personalWatched">
        <el-icon>
          <film/>
        </el-icon>
        <span>看过</span>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AvatarEdit from "@/components/personal/edit/AvatarEditing";
import {Avatar} from "@element-plus/icons-vue";
import PersonalInfo from "@/components/personal/PersonalInfo";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "PersonalView",
  components: {
    Avatar,
    AvatarEdit,
    PersonalInfo,
  },
  setup() {
    const router = useRouter()
    let activeIndex = ref('recommendation')

    const handleIndexChange = (index) => {
      activeIndex.value = index
      if (index === 'personalRecommendation') {
        router.push({name: 'personalRecommendation'})
      } else if (index === 'personalMoments') {
        router.push({name: 'personalMoments'})
      } else {
        router.push({name: 'personalWatched'})
      }
    }

    /**
     * 监听路由名称的变化，页面刷新时立即生效，用于更新菜单激活单元
     * 解决页面刷新或则回退，菜单激活单元不变的问题
     */
    watch(() => router.currentRoute.value.name, (newValue, oldValue) => {
      activeIndex.value = newValue
    }, {immediate: true})

    return {
      activeIndex,
      handleIndexChange,
    }
  }
}
</script>

<style lang="less" scoped>
//整体布局
.main {
  min-height: 89.6vh;
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

//头像和基本信息
.personal-div-top {
  margin-bottom: .1rem;
  flex: 60%;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding-left: 1rem;
  vertical-align: bottom;

  .info {
    padding-left: 1rem;
  }
}

.content {
  padding: 1rem;
  background-color: white;
}

@media screen and (min-width: 700px) and (max-width: 1200px) {
  .main {
    padding-left: 0;
    padding-right: 0;
  }
}

@media screen and (max-width: 700px) {
  .main {
    padding-left: 0;
    padding-right: 0;
  }

  .personal-div-top {
    flex-direction: row;
  }
}
</style>