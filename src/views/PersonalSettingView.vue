<template>
  <div class="setting-main">
    <el-row>
      <el-col :span="3" class="setting-border">
        <div class="setting-font">设置</div>
        <el-divider/>
        <el-menu
            :default-active="activeIndex"
            class="setting-menu-first"
        >
          <el-menu-item index="info">
            <el-icon><user /></el-icon>
            <span>个人资料</span>
          </el-menu-item>

          <el-menu-item index="account">
            <el-icon><setting /></el-icon>
            <span>账号设置</span>
          </el-menu-item>
        </el-menu>

        <el-menu
            :default-active="activeIndex"
            class="setting-menu-second"
        >
          <el-menu-item index="info">
            <el-icon><user /></el-icon>
          </el-menu-item>

          <el-menu-item index="account">
            <el-icon><setting /></el-icon>
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
import {ref} from "vue";

export default {
  name: "PersonalSettingView",
  setup() {
    let activeIndex = ref('info')
    const changeIndex = () => {
      if (activeIndex.value === 'info') activeIndex.value = 'account'
      else activeIndex.value = 'info'
    }

    return {
      activeIndex,
      changeIndex
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

.setting-border {
  //border-style:solid;
  //border-color: #d7d0d0;
  //border-width: 1px;
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