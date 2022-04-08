<template>
  <el-container>
    <Header />

    <el-main style="padding: 0">
      <router-view/>
    </el-main>

    <el-footer style="padding: 0">
      <Footer/>
    </el-footer>

  </el-container>
</template>

<script>
import Header from "@/components/layout/MovieHeader";
import Footer from "../components/layout/MovieFooter"

export default {
  name: "IndexView",
  components: { Header, Footer },
}
</script>