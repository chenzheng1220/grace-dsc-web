export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '加载页',
  categories: ['特殊功能'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/loading.d3c0690c.png',
  dependencies: [],
  props: {
    svgaHref: {
      type: 'string',
      label: '动画文件地址',
      default: 'https://special.zhaopin.com/wecan/2023/sh/grac010625/images/loading.svga'
    }
  }
}