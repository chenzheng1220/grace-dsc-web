<template>
  <div class="grace-dsc-function-music">
    <div class="musicBtn" :class="isPlaying ? 'music' : ''" @click="playOrPause">
      <img :src="imageSrc" />
    </div>
  </div>
</template>
<script setup>
import { toRefs, onMounted, ref } from "vue";
const props = defineProps({
  audioSrc: {
    type: String, // mp3文件
    default: "https://special.zhaopin.com/h5/2023/cd/gzzy041258/media/22753891.mp3"
  },
  imageSrc: {
    type: String, // 音乐图片
    default: "https://webapp.zhaopin.com/common/static-resource/music.4a679842.png"
  }
});

const { audioSrc } = toRefs(props);

const isPlaying = ref(true);

//创建音乐对象
const contextClass = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
var context = new contextClass();
var source = null;
var audioBuffer = null;
function stopSound() {
  if (source) {
    source.stop(); //立即停止
  }
}
function playSound() {
  source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true;
  source.connect(context.destination);
  source.start(0); //立即播放 
}
function initSound(arrayBuffer) {
  context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
    audioBuffer = buffer;
    playSound();
  }, function (e) { //解码出错时的回调函数
    console.log('404', e);
  });
}
function loadAudioFile(url) {
  var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function (e) { //下载完成
    initSound(this.response);
  };
  xhr.send();
}

function playOrPause() {
  if (isPlaying.value) {
    stopSound()
  } else {
    playSound()
  }
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  //这里用来存储背景音乐的路径
  loadAudioFile(audioSrc.value);
})
</script>
<style lang="scss">
@keyframes music {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.music {
  animation: music 1.5s linear infinite;
}

.musicBtn {
  position: fixed;
  right: 40rpx;
  top: 40rpx;
  z-index: 80;
  height: 80rpx;

  img {
    width: 80rpx;
  }
}
</style>