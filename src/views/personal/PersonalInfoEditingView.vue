<template>
  <div class="bg">
    <div class="info-edit-master">
      <router-link to="/personal" class="back-to-my-home">返回我的主页></router-link>

      <div class="edit-top">
        <avatar-edit :size="12" class="avatar"></avatar-edit>
        <div class="username-div">{{ user.username }}</div>
      </div>

      <div class="edit-bottom">
        <el-divider/>

        <div class="nickname-div">
          <div class="like">昵称</div>
          <!-- 昵称展示 -->
          <div v-show="!isShowNickname" class="content">
            <span class="each">{{ user.nickname }}</span>
            <span @click="isShowNickname = !isShowNickname" class="edit-btn">
            <el-icon><edit/></el-icon>修改
          </span>
          </div>

          <!-- 昵称编辑 -->
          <div v-show="isShowNickname" class="editing">
            <el-input
                maxlength="10"
                placeholder="请输入更新后的昵称"
                show-word-limit
                v-model="newNickname" clearable
                class="editing-input">
            </el-input>
            <el-button @click="handleUpdateNickname" type="primary" class="editing-btn">保存</el-button>
            <el-button @click="isShowNickname = !isShowNickname" class="editing-btn">取消</el-button>
          </div>
        </div>

        <el-divider/>

        <div class="sex">
          <div class="like">性别</div>
          <!-- 性别展示 -->
          <div v-show="!isShowSex" class="content">
            <span class="each">
              <span v-if="user.sex === '男'">男</span>
              <span v-else-if="user.sex === '女'">女</span>
              <span v-else>保密</span>
            </span>
            <span @click="isShowSex = !isShowSex" class="edit-btn">
              <el-icon><edit/></el-icon>修改
            </span>
          </div>
          <!-- 性别编辑 -->
          <div v-show="isShowSex" class="editing">
            <el-radio-group class="editing-input" v-model="newSex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
              <el-radio label="保密">保密</el-radio>
            </el-radio-group>
            <div>
              <el-button @click="handleUpdateSex" type="primary" class="editing-btn">保存</el-button>
              <el-button @click="isShowSex = !isShowSex" class="editing-btn">取消</el-button>
            </div>
          </div>
        </div>

        <el-divider/>

        <div class="types">
          <div class="like">类型喜好</div>
          <el-tag
              v-for="(type, index) in types"
              :key="index"
              class="each"
              type="info"
              effect="dark"
          >
            {{ type }}
          </el-tag>

          <like-editing :opt="1"
                        :likes="types"/>
        </div>

        <el-divider/>

        <div class="regions">
          <div class="like">地区喜好</div>
          <el-tag
              v-for="(region, index) in regions"
              :key="index"
              class="each"
              type="info"
              effect="dark"
          >
            {{ region }}
          </el-tag>

          <like-editing :opt="2"
                        :likes="regions"/>
        </div>

        <el-divider/>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarEdit from "@/components/personal/edit/AvatarEditing";
import {onBeforeUnmount, reactive, ref} from "vue";
import {Edit} from "@element-plus/icons";
import userRequest from "@/api/user";
import {ErrorMessage, SuccessMessage, WarningMessage} from "@/utils/my-message";
import emitter from "@/utils/event-bus";
import LikeEditing from "@/components/personal/edit/LikeEditing";

export default {
  name: "PersonalInfoEditView",
  components: {LikeEditing, Edit, AvatarEdit},
  setup() {
    let user = reactive({
      username: '',
      nickname: '',
      avatar: '',
      sex: '2',
    })

    // 昵称部分
    let isShowNickname = ref(false)
    let newNickname = ref('')
    let handleUpdateNickname = () => {
      if (newNickname.value.length === 0) {
        WarningMessage("昵称不能为空(ˉ﹃ˉ)")
      } else {
        userRequest.updateUserNickname(newNickname.value).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg);
            user.nickname = newNickname.value
            isShowNickname.value = false;

            emitter.emit('handleHeaderNicknameChange', {
              nickname: newNickname.value
            })
          } else {
            ErrorMessage(res.msg);
          }
        }).catch(err => {
          console.error(err)
        })
      }
    }

    // 性别部分
    let isShowSex = ref(false)
    let newSex = ref("")
    let handleUpdateSex = () => {
      userRequest.updateUserSex(newSex.value).then(res => {
        if (res.code === 200) {
          SuccessMessage(res.msg);
          user.sex = newSex.value
          isShowSex.value = false;
        } else {
          ErrorMessage(res.msg);
        }
      }).catch(err => {
        console.error(err)
      })
    }

    // 类型部分
    let types = ref([])
    // 地区部分
    let regions = ref([])

    /**
     * 初始化界面，数据请求
     */
    userRequest.getUserInfo().then(res => {
      if (res.code === 200) {
        let userInfo = res.data
        user.username = userInfo.username
        user.nickname = userInfo.nickname
        user.avatar = userInfo.avatar
        user.sex = userInfo.sex
        newSex.value = userInfo.sex

        // 全局事件总线——触发：从服务器获取到个人信息后，将头像路径传递给Avatar.vue
        emitter.emit('handleEditAvatarChange', {
          avatar: user.avatar
        })
      } else {
        ErrorMessage(res.msg)
      }
    }).catch(err => {
      console.error(err)
    })

    const getTypesAndRegions = () => {
      userRequest.getTypesAndRegions().then(res => {
        if (res.code === 200) {
          types.value = res.data.types
          regions.value = res.data.regions
        }
      }).catch(err => {
        console.error(err)
      })
    }
    // 初始化时，获取用户的电影类型和地区喜好
    getTypesAndRegions()

    emitter.on('handleLikeEditingUpdate', data => {
      // 用户触发喜好更新时，重新获取更新后的电影类型和地区喜好
      setTimeout(() => {
        getTypesAndRegions()
      }, 200)
    })

    onBeforeUnmount(() => {
      emitter.off('handleLikeEditingUpdate')
    })

    return {
      user,
      types,
      regions,
      isShowNickname,
      newNickname,
      handleUpdateNickname,
      isShowSex,
      newSex,
      handleUpdateSex,
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  min-height: 89.6vh;
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

.info-edit-master {
  min-height: 89.5vh;
  border-style: solid;
  border-width: 1px;
  padding: 0 1rem;
  border-color: #dcdbdb;
  background-color: white;

  .back-to-my-home {
    position: absolute;
    right: 23%;
    padding-top: 1rem;
    color: rgb(133, 144, 166);
    text-decoration: none;
  }
}

.edit-top {
  display: flex;
  align-items: flex-end;

  .username-div {
    display: flex;
    color: rgb(18, 18, 18);
    font-size: 2.5rem;
    font-weight: bold;
    padding-left: 1rem;
  }
}

.edit-bottom {
  .content {
    display: flex;
  }

  .sex, .types, .regions, .nickname-div {
    display: flex;
    flex-wrap: wrap;
  }

  .each {
    margin-left: 1rem;
  }

  .like {
    font-weight: 600;
    color: rgb(68, 68, 68);
    font-size: 1.1rem;
    width: 6rem;
  }
}

.edit-btn {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  color: rgb(23, 81, 153);
  white-space: nowrap;
  cursor: pointer; // 鼠标放上去显示手势
}

// 编辑状态样式
.editing {
  padding-left: 0.5rem;
  max-width: 18rem;

  .editing-input {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .editing-btn {
    margin-left: 1rem;
  }
}

@media screen and (max-width: 800px) {
  .bg {
    padding: 0 0;
  }

  .back-to-my-home {
    position: relative;
    left: 77%;
    white-space: nowrap;
    padding-top: 1rem;
    color: rgb(133, 144, 166);
    text-decoration: none;
  }
}

</style>