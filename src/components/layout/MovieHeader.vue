<template>
  <!-- 导航栏 -->
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/logo.png" alt="logo"/>
      <span class="title">电影推荐系统</span>
    </div>

    <div @click="handleMainMenu" class="menu-icon">
      <div ref="moreRef">
        <menu-icon :color="`${iconColor}`"></menu-icon>
      </div>
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
        <el-link @click="show('classification')" :underline="false">分类</el-link>

        <span class="search-div">
          <el-autocomplete
              v-model="searchKeywords"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入电影名"
              @select="handleSelect"
              @keydown.enter="handleSearch"
          >
            <template #suffix>
              <search @click="handleSearch" width="20px"/>
            </template>
          </el-autocomplete>
        </span>
      </div>
    </transition>

    <!-- 大屏时显示这个菜单 -->
    <div class="big-menu">
      <el-link @click="show('home')" :underline="false">首页</el-link>
      <el-link @click="show('classification')" :underline="false">分类</el-link>

      <span class="search-div">
        <el-autocomplete
            v-model="searchKeywords"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入电影名"
            @select="handleSelect"
            @keydown.enter="handleSearch"
        >
          <template #suffix>
            <search @click="handleSearch" width="20px"/>
          </template>
        </el-autocomplete>
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
        <div class="login-name">
          {{ user.nickname }}
        </div>
        <el-avatar :src="user.avatar" @error="errorHandler">
          <!-- 当图片加载错误时，将加载这里面的图片 -->
          <img src="../../assets/default_avatar.png" alt="default avatar"/>
        </el-avatar>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link :underline="false" @click="show('personal')" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>我的主页
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" @click="show('personalPlanet')" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>电影星球
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" @click="show('setting')" style="padding-right: 7px">
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
import {onBeforeMount, onBeforeUnmount, reactive, ref, watch} from "vue";
import {useRouter} from 'vue-router'
import {More, MoreFilled, Menu as MenuIcon} from "@element-plus/icons";
import userRequest from "@/api/user";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import emitter from "@/utils/event-bus";
import movieRequest from "@/api/movie";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "MovieHeader",
  components: {Search, MoreFilled, More, MenuIcon},
  setup() {
    const router = useRouter()
    let isLogin = ref(false)
    let isShowMenu = ref(false);
    let mainMenuRef = ref(null);
    let moreRef = ref(null);
    let moreFilledRef = ref(null);
    let iconColor = ref('white')
    let user = reactive({
      id: 0,
      nickname: '',
      avatar: '',
      sex: '',
    })

    // 展示名为name的页面
    let show = (name) => {
      router.push({
        name: name
      })
      isShowMenu.value = false;
    }

    // 控制主菜单显示
    let handleMainMenu = () => {
      isShowMenu.value = !isShowMenu.value;
    }
    // 监测主菜单显示变量，根据展示与否改变图标颜色
    watch(isShowMenu, (newValue, oldValue) => {
      if (newValue === true) {
        iconColor.value = '#a99f9f';
      } else {
        iconColor.value = 'white'
      }
    })

    // 跳转到登录界面
    let handleLogin = () => {
      router.push('/login');
    }

    // 登出
    let handleLogout = () => {
      userRequest.logout().then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg)
          // 用户注销时将缓存中的token和userInfo删除
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          isLogin.value = false
          router.replace({
            name: 'home'
          })
        } else {
          ErrorMessage(res.msg)
        }
      }).catch(err => {
        ErrorMessage(err)
      })
    }

    /**
     * 每次初始化界面是判断token是否过期，如果没有过期，则显示登录基本信息
     */
    userRequest.getUserInfo().then(res => {
      if (res.code === 200) {
        isLogin.value = true
        let userInfo = res.data
        user.nickname = userInfo.nickname
        user.id = userInfo.id
        user.avatar = userInfo.avatar
        user.sex = userInfo.sex
      } else {
        isLogin.value = false
      }
    }).catch(err => {
      console.log(err)
      console.error(err)
    })

    /**
     * 图片错误句柄
     * @returns {boolean}
     */
    const errorHandler = () => true

    /**
     * 监听nickname和avatar的改变
     */
    emitter.on('handleHeaderNicknameChange', data => {
      user.nickname = data.nickname
    })
    emitter.on('handleHeaderAvatarChange', data => {
      user.avatar = data.avatar
    })

    /**
     * 将搜索记录存储到localStorage中
     * @param keyword 搜索关键词
     */
    function storeHistorySearchRecords(keyword) {
      let records = JSON.parse(localStorage.getItem("historySearchRecords"));
      if (records === null || records.length === 0) {
        records = []
      }
      keyword = keyword.trim()
      // 将搜索记录中和keyword相同的关键词过滤掉
      records = records.filter((record) => {
        return record !== keyword;
      })
      // 不将空白搜索关键词插入
      if (keyword.trim().length !== 0) {
        // 将keyword插入到搜索记录的开头
        records.unshift(keyword);
      }
      // 最多保留10条搜索记录
      const len = Math.min(10, records.length);
      // 将搜索记录保存到localStorage中
      localStorage.setItem("historySearchRecords", JSON.stringify(records.slice(0, len)));
    }

    // 搜索
    let searchKeywords = ref('')
    const querySearchAsync = (queryString, cb) => {
      movieRequest.getMatchMovieName(searchKeywords.value).then(res => {
        if (res.code === 200) {
          const result = []
          res.data.forEach((name, index) => {
            result.push({'value': name})
          })
          if (!result.length) {
            const historySearchRecords = JSON.parse(localStorage.getItem("historySearchRecords"));
            historySearchRecords.forEach((name, index) => {
              result.push({'value': name})
            })
          }
          // 调用 callback 返回建议列表的数据
          cb(result)
        }
      }).catch(err => {
        console.error(err)
      })
    }
    const handleSearch = () => {
      isShowMenu.value = false
      router.push({
        name: 'classification',
        query: {
          keywords: searchKeywords.value
        }
      })
      /**
       * 全局事件总线
       * 触发MovieCards里面的事件，搜索电影
       */
      emitter.emit('handleSearch', {
        searchKeywords: searchKeywords.value
      })
      // 将搜索关键词保存到localStorage中
      storeHistorySearchRecords(searchKeywords.value)
    }
    const handleSelect = (item) => {
      searchKeywords.value = item.value
      handleSearch()
    }

    onBeforeUnmount(() => {
      emitter.off('handleHeaderNicknameChange')
      emitter.off('handleEditAvatarChange')
    })

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
      errorHandler,
      searchKeywords,
      querySearchAsync,
      handleSearch,
      handleSelect
    }
  }
}
</script>

<style lang="less" scoped>
/* 设置顶部导航栏样式 */
.navbar {
  z-index: 500;
  height: 50px;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  background-color: rgb(84, 92, 100);
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
  color: white;
  animation: heartBeat;
  animation-duration: .7s;
}

/*搜索框样式*/
.search-div {
  width: 300px;
  padding-top: 10px;
  text-align: center;
}

/*登录样式*/
.login-link {
  margin-left: auto; /*右对齐*/
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

/* 响应式布局 - 当屏幕小于 740 像素宽 */
@media screen and (max-width: 740px) {
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

/* 响应式布局 - 当屏幕为（740px < 屏幕像素 < 1200px)宽 时，系统名消失，并且左右内边距变为0 */
@media screen and (min-width: 740px) and  (max-width: 1200px) {
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