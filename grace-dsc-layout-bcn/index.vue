<template>
  <div class="grace-dsc-layout-bcn">
    <div class="grace-dsc-layout-bcn__banner">
      <!-- banner盒子插槽 -->
      <slot name="banner"></slot>
    </div>
    <div class="grace-dsc-layout-bcn__content">
      <!-- 内容盒子插槽 -->
      <slot name="content"></slot>
      <grace-dsc-content-copyright />
    </div>
    <!-- 导航插槽 -->
    <slot name="nav"></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
$bgcolor: #f6f6f6;
.grace-dsc-layout-bcn {
  width:750rpx;
  background-color: $bgcolor;
}
.grace-dsc-layout-bcn__banner{
   width:750rpx;
}
.grace-dsc-layout-bcn__content{
  width:750rpx;
  padding-bottom: 160rpx;
}
div {
  box-sizing: border-box;
}
</style>
