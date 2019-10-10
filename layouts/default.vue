<template>
  <div class="dcontainer">
    <el-container>
      <el-header>
        <xheader/>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer>
        <xfooter/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import xheader from "@/components/header/header";
  import xfooter from "@/components/footer/footer";
  export default {
      components: {
        xheader,
        xfooter
      }
  }
</script>
<style>
  .el-header,.el-footer{
    padding: 0;
  }
  .el-main{
    width: 100%;
    background: #f8f8f8;
  }
  @media screen and (max-width: 1023px){
    .el-main {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
