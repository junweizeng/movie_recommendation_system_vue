<template>
  <div class="master">
    <template v-if="pageName === 'moment'">
      <svg-icon icon-class="pic_no_moment" class="icon"></svg-icon>
      <h1>暂无动态</h1>
    </template>

    <template v-else-if="pageName === 'recommendation'">
      <svg-icon icon-class="pic_no_recommendation" class="icon"></svg-icon>
      <h1>暂无推荐</h1>
    </template>

    <template v-else-if="pageName === 'record'">
      <svg-icon icon-class="pic_no_record" class="icon"></svg-icon>
      <h1>暂无记录</h1>
    </template>

    <template v-else-if="pageName === 'movie'">
      <svg-icon icon-class="pic_no_movie" class="icon"></svg-icon>
      <h1>暂无电影</h1>
    </template>
  </div>
</template>

<script>
import SvgIcon from "@/components/basic/SvgIcon";

export default {
  name: "BlankPage",
  props: {
    pageName: {
      type: String,
      required: true,
      default: 'blank'
    }
  },
  components: {
    SvgIcon
  }
}
</script>

<style lang="less" scoped>
.master {
  text-align: center;
  margin: 5rem 0;
  justify-content: center;

  .icon {
    width: 100%;
    height: 15rem;
  }

  h1 {
    color: rgb(133, 144, 166);
  }
}
</style>