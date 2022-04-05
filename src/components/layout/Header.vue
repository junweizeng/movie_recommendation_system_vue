<template>
  <!-- 导航栏 -->
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/logo.png" alt="logo"/>
      <span class="title">电影推荐系统</span>
    </div>

    <div @click="handleMainMenu" class="menu-icon">
      <div ref="moreRef"><menu-icon :color="`${iconColor}`"></menu-icon></div>
    </div>

    <!-- 小屏时显示这个菜单 -->
    <transition
        name="animate__animated animate__bounce"
        appear
        enter-active-class="animate__fadeInLeft"
        leave-active-class="animate__fadeOut">
      <div
          v-if="isShowMenu"
          ref="mainMenuRef"
          class="menu">
        <el-link @click="show('home')" :underline="false">首页</el-link>
        <el-link @click="show('classification')" :underline="false">电影</el-link>
        <el-link @click="show('about')" :underline="false">关于</el-link>

        <span class="search-div">
          <el-autocomplete
              style="border-radius: 30px;"
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入电影名"
              @select="handleSelect"
          />
        </span>
      </div>
    </transition>

    <!-- 大屏时显示这个菜单 -->
    <div class="big-menu">
      <el-link @click="show('home')" :underline="false">首页</el-link>
      <el-link @click="show('classification')" :underline="false">电影</el-link>
      <el-link @click="show('about')" :underline="false">关于</el-link>

      <span class="search-div">
        <el-autocomplete
            style="border-radius: 30px;"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入电影名"
            @select="handleSelect"
        />
      </span>
    </div>


    <el-link
        class="login-link"
        v-if="!isLogin"
        @click="handleLogin"
        :underline="false">
      登录
    </el-link>

    <el-dropdown class="login-dropdown" v-if="isLogin">
      <el-button type="text">
        <div class="login-name">{{ user.nickname }}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-avatar @error="errorHandler">
          <img
              src="../../assets/logo.png"
          />
        </el-avatar>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link :underline="false" @click="show('personalInfo')" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>我的主页
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" href="/me/order" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>我的喜欢
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" href="/me/setting" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>个人设置
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="text" @click="handleLogout" :underline="false">
              <i style="padding-right: 3px"></i>退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {reactive, ref, watch} from "vue";
import {useRouter} from 'vue-router'
import {More, MoreFilled, Menu as MenuIcon} from "@element-plus/icons";

export default {
  name: "Header",
  components: {MoreFilled, More, MenuIcon},
  setup() {
    const router = useRouter()
    let isLogin = ref(false);
    let isShowMenu = ref(false);
    let mainMenuRef = ref(null);
    let moreRef = ref(null);
    let moreFilledRef = ref(null);
    let iconColor = ref('white')
    let user = reactive({
      nickname: 'Vanish丶'
    })

    // 展示名为name的页面
    let show = (name) => {
      router.push({
        name: name
      })
      isShowMenu.value = false;
    }

    let handleMainMenu = () => {
      isShowMenu.value = !isShowMenu.value;
    }

    watch(isShowMenu, (newValue, oldValue) => {
      if (newValue === true) {
        iconColor.value = '#a99f9f';
      } else {
        iconColor.value = 'white'
      }
    })

    // 登录
    let handleLogin = () => {
      isLogin.value = true
    }

    // 登出
    let handleLogout = () => {
      isLogin.value = false
    }

    const errorHandler = () => true

    return {
      isLogin,
      isShowMenu,
      mainMenuRef,
      moreFilledRef,
      iconColor,
      moreRef,
      user,
      show,
      handleMainMenu,
      handleLogin,
      handleLogout,
      errorHandler
    }
  }
}
</script>

<style lang="less" scoped>
/* 设置顶部导航栏样式 */
.navbar {
  height: 50px;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  background-color: #333;
}

/*系统logo图片和字体样式*/
.logo {
  display: flex;
  align-items: center;
  height: 50px;

  img {
    padding-top: 5px;
    width: 40px;
    height: 40px;
  }
  .title {
    color: #dddddd;
    font-size: 30px;
  }
}

.menu-icon {
  display: none;
}

.big-menu {
  display: flex;
}

.menu {
  display: none;
}

/* 设置导航条链接演示 */
.navbar a {
  font-size: 20px;
  color: white;

  padding: 12px 20px;
  text-decoration: none;
  text-align: center;
}

/* 更改鼠标悬停时的颜色 */
.navbar a:hover {
  background-color: #ddd;
  color: black;
}

/*搜索框样式*/
.search-div {
  width: 300px;
  padding-top: 10px;
  text-align: center;
}

/*登录样式*/
.login-link {
  margin-left: auto;  /*右对齐*/
}

/*登录成功抽屉样式*/
.login-dropdown {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;

  /*登录用户名样式*/
  .login-name {
    font-weight: bolder;
    font-size: 15px;
    letter-spacing: 2px;
  }
}

/* 响应式布局 - 当屏幕小于 700 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 720px) {
  .navbar {
    z-index: 999;
    padding: 0 1rem;
  }

  .menu-icon {
    order: 1;
    display: block;
    width: 2rem;
    height: 2rem;
    position: relative;
    margin: auto 0;
  }

  .big-menu {
    display: none;
  }

  .menu {
    order: 5;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    z-index: 500;
    background-color: #333;
    flex-direction: column;
    display: flex;

    .search-div {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
    }
  }

  .logo {
    position: absolute;
    left: 45%;

    .title {
      display: none;
    }
  }

  .login-link, .login-dropdown {
    order: 3;
  }

  .menu-enter-active {
    animation: show-menu 0.5s linear;
  }

  .menu-leave-active {
    animation: show-menu 0.5s reverse;
  }

  @keyframes show-menu {
    from {
      z-index: -100;
      transform: translateY(-100%);
    }

    to {
      z-index: 500;
      transform: translateY(0%);
    }
  }
}

/* 响应式布局 - 当屏幕为（700px < 屏幕像素 < 1200px)宽 时，系统名消失，并且左右内边距变为0 */
@media screen and (min-width: 720px) and  (max-width: 1200px) {
  /* 左右内边距变为0 */
  .navbar {
    padding-left: 0;
    padding-right: 0;
  }

  /* logo名消失 */
  .logo .title {
    display: none;
  }

  .big-menu {
    display: flex;
  }

  .menu {
    display: none;
  }
}
</style>