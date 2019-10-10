<template>
      <div class="container">
        <h1>
          <img src="~assets/img/logo.png" alt="我的博客logo">
        </h1>
        <p>
          我叫肖航，职业是一名前端工程师，这个博客属于我的个人博客网站，同时也在 Github 开源了此项目代码，这算是我的第一个自己上线的个人博客网站，
          后续我会继续完善该网站，力求让其变得更好更丰富多彩。
        </p>
        <p>
          博客的内容：关于我，关于技术方面的文章，还有更多自己的心得
        </p>
        <p>
          博客的愿景：和更多的朋友一起学习进步。
        </p>

        <p>博客的风格：简单明了，清晰可见。</p>
        <p>最后，祝大家工作顺心，技术越来越强！</p>
      </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style lang="scss" scoped>
  .container {
    width: 70%;
    min-height: 700px;
    margin: 0.32rem auto;
    overflow: hidden;
    background: #fff;
    padding: 2rem;
    h1{
      text-align: center;
      padding: 4rem 0;
    }
    p{
      padding: 6px 6px;
      line-height: 30px;
      font-size: 16px;
      color: #666;
      text-indent: 2em;
    }
  }
</style>
