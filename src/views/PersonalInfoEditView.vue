<template>
  <div class="bg">
    <div class="info-edit-master">
      <span class="back-to-my-home" >返回我的主页></span>

      <div class="edit-top">
        <avatar-edit :size="12" class="avatar"></avatar-edit>
        <!-- 昵称展示 -->
        <div v-show="!isShowNickname"  class="nickname-div">
          <span class="nickname">Vanish</span>
          <span @click="isShowNickname = !isShowNickname" class="edit-btn">
            <el-icon><edit/></el-icon>修改
          </span>
        </div>
        <!-- 昵称编辑 -->
        <div  v-show="isShowNickname" class="editing">
          <el-input v-model="newNickname" clearable  class="editing-input"></el-input>
          <el-button type="primary" class="editing-btn">保存</el-button>
          <el-button @click="isShowNickname = !isShowNickname" class="editing-btn">取消</el-button>
        </div>
      </div>

      <div class="edit-bottom">
        <el-divider/>

        <div class="sex">
          <div class="like">性别</div>
          <!-- 性别展示 -->
          <div v-show="!isShowSex" class="sex-content">
            <span class="each-sex">男</span>
            <span @click="isShowSex = !isShowSex" class="edit-btn">
              <el-icon><edit/></el-icon>修改
            </span>
          </div>
          <!-- 性别编辑 -->
          <div v-show="isShowSex" class="editing">
            <el-radio-group class="editing-input" v-model="sexRadio">
              <el-radio label="man">男</el-radio>
              <el-radio label="woman">女</el-radio>
              <el-radio label="secret">保密</el-radio>
            </el-radio-group>
            <el-button type="primary" class="editing-btn">保存</el-button>
            <el-button @click="isShowSex = !isShowSex" class="editing-btn">取消</el-button>
          </div>
        </div>

        <el-divider/>

        <div class="types">
          <div class="like">类型喜好</div>
          <el-tag
              v-for="(type, index) in types"
              :key="index"
              class="each-type"
              type="info"
              effect="dark"
          >
            {{ type }}
          </el-tag>

          <span @click="editTypes" class="edit-btn">
            <el-icon><edit/></el-icon>修改
          </span>
        </div>

        <el-divider/>

        <div class="regions">
          <div class="like">地区喜好</div>
          <el-tag
              v-for="(region, index) in regions"
              :key="index"
              class="each-region"
              type="info"
              effect="dark"
          >
            {{ region }}
          </el-tag>

          <span @click="editRegions" class="edit-btn">
            <el-icon><edit/></el-icon>修改
          </span>
        </div>

        <el-divider/>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarEdit from "@/components/personal/AvatarEdit";
import {reactive, ref} from "vue";
import {Edit} from "@element-plus/icons";
export default {
  name: "PersonalInfoEditView",
  components: {Edit, AvatarEdit},
  setup() {
    // 昵称部分
    let isShowNickname = ref(false)
    let newNickname = ref('')

    // 性别部分
    let isShowSex = ref(false)
    let sexRadio = ref('man')

    // 类型部分
    let types = reactive(['test1', 'test2'])
    let isShowTypes = ref(false)
    let editTypes = () => {}

    // 地区部分
    let regions = reactive(['test1', 'test2'])
    let isShowRegions = ref(false)
    let editRegions = () => {}

    return {
      types,
      regions,
      isShowNickname,
      newNickname,
      isShowSex,
      sexRadio,
      isShowTypes,
      isShowRegions,
      editTypes,
      editRegions,
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  padding-left: 20%;
  padding-right: 20%;
  background-color: #d6dbe7;
}

.info-edit-master {
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
  }
}

.edit-top {
  display: flex;
  align-items: flex-end;

  .nickname-div {
    display: flex;
    .nickname {
      color: rgb(18, 18, 18);
      font-size: 2.5rem;
      font-weight: bold;
      padding-left: 1rem;
    }
  }
}

.edit-bottom {
  .sex-content {
    display: flex;
  }

  .sex, .types, .regions {
    display: flex;
    flex-wrap: wrap;
  }

  .each-sex, .each-type, .each-region {
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
}

// 编辑状态样式
.editing {
  padding-left: 0.5rem;
  max-width: 15rem;

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
    position: absolute;
    right: 2%;
    padding-top: 1rem;
    color: rgb(133, 144, 166);
  }
}

</style>