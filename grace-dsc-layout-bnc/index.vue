<template>
  <div class="grace-dsc-layout-bnc" >
    <div class="grace-dsc-layout-bnc__banner">
      <!-- banner盒子插槽 -->
      <slot name="banner"></slot>
    </div>
    <div class="grace-dsc-layout-bnc__nav">
      <!-- 导航插槽 -->
      <slot name="nav"></slot>
    </div>
    <div class="grace-dsc-layout-bnc__content" >
      <!-- 内容盒子插槽 -->
      <slot name="content"></slot>
      <grace-dsc-content-copyright />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
$bgcolor: #f6f6f6;
.grace-dsc-layout-bnc {
  width:750rpx;
  background-color: $bgcolor;
}
.grace-dsc-layout-bnc__banner{
  width:750rpx;
}
.grace-dsc-layout-bnc__nav {
  width:750rpx;
}
.grace-dsc-layout-bnc__content{
  width:750rpx;
}
div {
  box-sizing: border-box;
}
</style>
