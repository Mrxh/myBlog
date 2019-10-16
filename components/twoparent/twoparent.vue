<template>
  <div class="container">
     <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "twoparent"
  }
</script>

<style lang="scss" scoped>
  .container{
    width: 70%;
    min-height: 700px;
    display: flex;
    margin: 0.32rem auto;
    overflow: hidden;
  }
  @media screen and (max-width: 1023px){
    .container{
      width: 100%;
      display: block;
    }
  }
</style>
