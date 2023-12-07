<template>
  <div class="grace-dsc-content-contact">
    <!-- 地图 -->
    <div class="grace-dsc-content-contact__map">
      <slot name="地图"></slot>
    </div>
    <!-- 信息列表 -->
    <ul class="grace-dsc-content-contact__list">
      <li class="grace-dsc-content-contact__item" v-for="(item, index) of contacts" :key="index">
        <div class="grace-dsc-content-contact__item-img" v-if="item.contactImage && item.contactImage !== ''">
          <img :src="item.contactImage" alt="" />
        </div>
        <div class="grace-dsc-content-contact__item-cont">
          <p>{{ item.contactCont }}</p>
        </div>
      </li>
    </ul>
    <!-- 二维码 -->
    <ul class="grace-dsc-content-contact__reweima">
      <li class="grace-dsc-content-contact__reweima-img" v-for="(item_img, index) of erweimas" :key="index">
        <img :src="item_img.erweimasImage" alt="" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, toRefs } from "vue";

const props = defineProps({
  contacts: {
    type: Array,
    default: () => [], // 信息列表
  },
  erweimas: {
    type: Array,
    default: () => [], // 二维码
  },
});

const {
  contacts,
  erweimas,
} = toRefs(props);
</script>

<style lang="scss">
$bgcolor: #fff; // 背景颜色
$itemRadius: 10rpx; // 联系方式列表圆角
$mapRadius: 10rpx; //地图|图片圆角

.grace-dsc-content-contact {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background-color: $bgcolor;
  border-radius: 20rpx;
  overflow: hidden;
  padding: 35rpx 30rpx;
  box-sizing: border-box;
}


// 地图
.grace-dsc-content-contact__map {
  overflow: hidden;
  width: 100%;
  border-radius: $mapRadius;
}

// 信息列表
.grace-dsc-content-contact__list {
  margin-top: 20rpx;
  list-style: none;
  width: 100%;
  padding: 0;

  >.grace-dsc-content-contact__item {
    border: 1px solid #e8e7ec;
    box-sizing: border-box;
    padding: 20rpx 15rpx 20rpx 0;
    display: flex;
    margin-bottom: 10rpx;
    border-radius: $itemRadius;

    >.grace-dsc-content-contact__item-img {
      position: relative;
      width: 13%;

      >img {
        display: block;
        width: 38rpx;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
      }
    }

    >.grace-dsc-content-contact__item-cont {
      width: 87%;
      text-align: left;
      color: #333333;
      font-size: 13px;
      position: relative;
      line-height: 1.5em;

      >p {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

// 二维码
.grace-dsc-content-contact__reweima {
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  margin-top: 20rpx;

  .grace-dsc-content-contact__reweima-img {
    width: 230rpx;

    >img {
      display: block;
      width: 100%;
    }
  }
}
</style>
