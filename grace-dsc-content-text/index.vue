<template>
  <p class="grace-dsc-content-text__p">{{ text }}</p>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  text: String
})

const { text} = toRefs(props)
</script>

<style>
.grace-dsc-content-text__p{
    box-sizing:border-box;
    width:100%;
    margin:24rpx auto;
    background-color:#ffffff;
    border-radius: 24rpx 24rpx 0 0;
    font-size:12px;
    line-height:2em;
    text-indent:2em;
    text-align:justify;
    padding:0 24rpx;
    color:#000000;
}
</style>
