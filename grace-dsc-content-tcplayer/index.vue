<template>
  <div class="grace-dsc-content-tcplayer" id="videoContain">
  </div>
</template>
<script setup>
import './tcplayer.min.css'
import { toRefs, onMounted, ref, getCurrentInstance } from "vue";
const app = getCurrentInstance()
const { useSystem } = app.appContext.config.globalProperties.grace
const props = defineProps({
  videoSrc: {
    type: String,
    default: ""
  }, // 视频链接
  image: {
    type: String,
    default: ""
  }, // 封面图
});
const {
  videoSrc,
  image
} = toRefs(props);
const player = ref(null);

const script = document.createElement('script')
script.src = 'https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.v4.8.0.min.js'
document.head.appendChild(script)
onMounted(()=>{
  script.onload = () => {
    const video = document.createElement("video")    
    video.setAttribute("id", "player-container-id")
    video.setAttribute('playsinline',true)
    video.setAttribute('webkit-playsinline',true)
    video.setAttribute('autoplay',true)
    video.setAttribute('style', 'width: 100%; height: 100%;')
    document.getElementById("videoContain").appendChild(video)

    player.value = TCPlayer('player-container-id', {
      poster: image.value
    }); // player-container-id 为播放器容器 ID，必须与 html 中一致
    player.value.src(videoSrc.value); // url 播放地址
  }
})
</script>
<style lang="scss">
$videoWidth: 760rpx; // 视频宽度
$videoHeight: 360rpx; // 视频高度
.grace-dsc-content-tcplayer{
    width: $videoWidth;
    height: $videoHeight;
    display: block;
    margin: 0px auto;
    background-color: #000000;
    #player-container-id{
      width: 100%;
      height: 100%;
    }
}
.grace-dsc-content-tcplayer-mobile{
    width: 100%;
    height: auto;
}
</style>