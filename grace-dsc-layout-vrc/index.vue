<template>
  <div class="grace-dsc-layout-vrc" >
    <div class="grace-dsc-layout-vrc__banner">
      <!-- banner盒子插槽 -->
      <slot name="banner"></slot>
    </div>
    <!-- 导航插槽 -->
    <slot name="nav"></slot>
    <div class="grace-dsc-layout-vrc__content" >
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
.grace-dsc-layout-vrc {
  width:750rpx;
  background-color: $bgcolor;
}
.grace-dsc-layout-vrc__banner{
   width:750rpx;
}
.grace-dsc-layout-vrc__content{
  width:750rpx;
  padding-bottom: 160rpx;
}
div {
  box-sizing: border-box;
}
</style>
