<template>
  <div class="setting-main">
    <el-row>
      <el-col :span="3" class="setting-border">
        <div class="setting-font">设置</div>
        <el-divider/>
        <el-menu
            @select="handleIndexChange"
            :default-active="activeIndex"
            class="setting-menu-first"
        >
          <el-menu-item index="settingPersonalInfo">
            <el-icon>
              <user/>
            </el-icon>
            <span>个人资料</span>
          </el-menu-item>

          <el-menu-item index="settingAccount">
            <el-icon>
              <setting/>
            </el-icon>
            <span>账号设置</span>
          </el-menu-item>
        </el-menu>

        <el-menu
            @select="handleIndexChange"
            :default-active="activeIndex"
            class="setting-menu-second"
        >
          <el-menu-item index="settingPersonalInfo">
            <el-icon>
              <user/>
            </el-icon>
          </el-menu-item>

          <el-menu-item index="settingAccount">
            <el-icon>
              <setting/>
            </el-icon>
          </el-menu-item>
        </el-menu>

      </el-col>

      <el-col :span="21" class="setting-border">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "PersonalSettingView",
  setup() {
    const router = useRouter()
    let activeIndex = ref('settingPersonalInfo')
    const handleIndexChange = (index) => {
      if (index === 'settingPersonalInfo') {
        activeIndex.value = 'settingPersonalInfo'
        router.push({name: 'settingPersonalInfo'})
      } else {
        activeIndex.value = 'settingAccount'
        router.push({name: 'settingAccount'})
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
      handleIndexChange
    }
  }
}
</script>

<style lang="less" scoped>
.setting-main {
  .setting-font {
    margin-top: 1.5rem;
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
  }
}

.setting-menu-first {
  display: block;
}

.setting-menu-second {
  display: none;
}

@media screen and (max-width: 1145px) {
  .setting-menu-first {
    display: none;
  }

  .setting-menu-second {
    display: block;
  }
}
</style>