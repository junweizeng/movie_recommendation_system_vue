<template>
  <div class="header">
    <div style="height: 70px;width: 100%">
      <div class="header-logo">
        <img style="width: 50px; height: 50px; float: left" src="../../assets/logo.png" alt="logo"/>
        <div class="header-logo-text">电影推荐系统</div>
      </div>

      <div class="header-links">
        <el-link @click="show('home')" class="header-link" :underline="false">首页</el-link>
        <el-link @click="show('classification')" class="header-link" :underline="false">电影</el-link>
        <el-link @click="show('about')" class="header-link" :underline="false">关于</el-link>
      </div>

      <div class="header-search">
        <el-autocomplete
            style="width: 250px"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入电影名"
            @select="handleSelect"
        />
      </div>

      <el-link v-if="!isLogin"
               @click="handleLogin"
               class="header-link"
               :underline="false"
               style="float: right;padding-top: 23px;padding-right: 50px">
        登录
      </el-link>

      <el-dropdown v-if="isLogin" style="float: right;padding-right: 10px; padding-top: 23px">
        <el-button type="text">
          <div class="header-name">{{ this.user.nickname }}
            <i class="el-icon-caret-bottom"></i>
          </div>
<!--          <img alt="" style="width: 45px;height: 45px;border-radius: 50%" src="../../assets/logo.png">-->
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
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-shopping-cart-2"></i>我的主页
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link :underline="false" href="/me/order" style="padding-right: 7px">
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-s-order"></i>我的喜欢
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link :underline="false" href="/me/setting" style="padding-right: 7px">
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-user-solid"></i>个人设置
              </el-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-button type="text" @click="handleLogout" :underline="false">
                <i style="font-size: 15px; padding-right: 3px" class="el-icon-switch-button"></i>退出登录
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  const errorHandler = () => true

  export default {
    name: "MovieHeader",
    data() {
      return {
        isLogin: false,
        user: {
          nickname: 'Vanish丶'
        }
      }
    },
    methods: {
      show(name) {
        this.$router.push({
          name: name
        })
      },
      handleLogin() {
        // this.$router.push({
        //   name: 'login',
        // })
        this.isLogin = true
      },
      handleLogout() {
        this.isLogin = false
      }
    }
  }
</script>

<style scoped>
.header {
  height: 70px;
  background: #FFFFFF;
  box-shadow: 0 3px 12px 0 rgb(0 0 0/10%);
  border: 1px solid #EBEEF5;
}

.header-logo {
  padding-top: 10px;
  padding-left: 10%;
  float: left;
  letter-spacing: 2px;
}

.header-logo-text {
  font-size: 30px;
  padding-top: 3px;
  font-weight: bolder;
  padding-left: 15px;
  float: left;
}

.header-search {
  float: left;
  width: 300px;
  border-radius: 20px;
  padding-top: 16px;
}

.header-links {
  float: left;
  padding-left: 50px;
  padding-top: 23px;
}

.header-link {
  letter-spacing: 2px;
  font-size: 17px;
  padding-right: 40px;
}

.header-name {
  color: #000000;
  float: right;
  padding-top: 15px;
  padding-left: 15px;
  font-weight: bolder;
  font-size: 15px;
  letter-spacing: 2px;
}

>>> .el-input__inner {
  border-radius: 20px;
  height: 40px;
}
</style>