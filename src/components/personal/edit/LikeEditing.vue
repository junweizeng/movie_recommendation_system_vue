<template>
  <span @click="handleLikeEditShow" class="edit-btn">
    <el-icon><edit/></el-icon>修改
  </span>

  <el-dialog
      v-model="isShow"
      :title="editDialogTitle"
      width="602px"
      draggable
  >
    <el-transfer
        :titles="['待选项', '已选项']"
        filterable
        filter-placeholder="请输入名称"
        v-model="value"
        :data="data"
        target-order="push"
    >
    </el-transfer>

    <div style="color: red; margin-top: 1rem;">说明：最多选择5项。若多选，则只保留“已选项”中的前5项！</div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateLike">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ref, watch} from "vue";
import emitter from "@/utils/event-bus";
import userRequest from "@/api/user";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";

export default {
  name: "LikeEditing",
  props: {
    opt: {
      type: Number,
      default: 1,
    },
    likes: {
      type: Array,
      default: [],
    }
  },
  setup(props) {
    let editDialogTitle = ref('')
    if (props.opt === 1) {
      editDialogTitle.value = '类型喜好编辑'
    } else {
      editDialogTitle.value = '地区喜好编辑'
    }

    const types = [
      '剧情', '喜剧', '动作', '爱情', '科幻',
      '动画', '悬疑', '惊悚', '恐怖', '犯罪',
      '音乐', '歌舞', '传记', '历史', '战争',
      '西部', '奇幻', '冒险', '灾难', '武侠',
      '其他'
    ]
    const regions = [
      '中国大陆', '美国', '中国香港', '中国台湾',
      '日本', '韩国', '英国', '法国', '德国', '意大利',
      '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大',
      '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'
    ]
    // 生成电影类型map，键值对（类型名称 => 类型编号）
    const generateTypeEnum = () => {
      let typeEnum = {}
      types.forEach((type, index) => {
        typeEnum[type] = index
      })
      return typeEnum
    }
    const typeEnum = generateTypeEnum()
    // 生成电影地区map，键值对（地区名称 => 地区编号）
    const generateRegionEnum = () => {
      let regionEnum = {}
      regions.forEach((region, index) => {
        regionEnum[region] = index
      })
      return regionEnum
    }
    const regionEnum = generateRegionEnum()

    // 初始化Transfer 的数据源
    const generateData = _ => {
      const data = [];
      let likes = []
      if (props.opt === 1) {
        likes = types
      } else {
        likes = regions
      }
      likes.forEach((like, index) => {
        data.push({
          label: like,
          key: index,
        });
      });
      return data;
    };
    // Transfer 的数据源
    const data = ref(generateData())
    // Transfer 的已选项
    const value = ref([])

    let isShow = ref(false)
    const handleLikeEditShow = () => {
      isShow.value = true
    }

    watch(isShow, (newValue, oldValue) => {
      // 显示编辑窗口时，将用户已选标签加入“以选项”
      if (newValue) {
        value.value = []
        if (props.opt === 1) {
          for (let type of props.likes) {
            value.value.push(typeEnum[type])
          }
        } else {
          for (let region of props.likes) {
            value.value.push(regionEnum[region])
          }
        }
      }
    })

    // 提交更新用户喜好
    let handleUpdateLike = () => {
      if (props.opt === 1) {
        userRequest.updateUserTypeLike(value.value).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
            // 更新成功，编辑页面关闭
            isShow.value = false
            emitter.emit("handleLikeEditingUpdate")
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        userRequest.updateUserRegionLike(value.value).then(res => {
          if (res.code === 200) {
            SuccessMessage(res.msg)
            // 更新成功，编辑页面关闭
            isShow.value = false
            emitter.emit("handleLikeEditingUpdate")
          } else {
            ErrorMessage(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }

    return {
      props,
      editDialogTitle,
      isShow,
      data,
      value,
      handleLikeEditShow,
      handleUpdateLike
    }
  }
}
</script>

<style lang="less" scoped>
.edit-btn {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  color: rgb(23, 81, 153);
  white-space: nowrap;
  cursor: pointer; // 鼠标放上去显示手势
}

///deep/ .el-transfer-panel {
//  max-width: 130px;
//}
///deep/ .el-transfer__buttons {
//  padding: 0;
//  max-width: 60px;
//}
</style>