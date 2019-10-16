<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "singleparent"
  }
</script>

<style lang="scss" scoped>
  .container{
    width: 70%;
    background: #fff;
    min-height: 700px;
    border-radius: 5px;
    margin: 0 auto;
    padding: 20px;
  }

  @media screen and (max-width: 1023px){
    .container{
      width: -moz-calc(100% - 40px);
      width: -webkit-calc(100% - 40px);
      width: calc(100% - 40px);
      display: block;
    }
  }
</style>
