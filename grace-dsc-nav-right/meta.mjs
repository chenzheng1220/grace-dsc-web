export default {
  type: "uni-app",
  author: "chenzheng.chen",
  description: "导航组件-右上角导航",
  categories: ["导航"],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/nav_right.42ba7b6d.png',
  props(prop)  {
    const temp = {
      navbtnImg: {
        label: "右上角icon",
        type: "image",
        default: "",
      },
      isLogo: {
        label: "logo是否显示",
        type: "boolean",
        default: false,
      },
      logoImg: {
        label: "logo设置",
        type: "image",
        default: ""
      },
      isZdyRoute: {
        label: '是否使用自定义路由',
        type: 'boolean',
        default: false,
        required: false
      }
    }

    if (prop && prop.isZdyRoute) {
      temp.navList = {
        type: 'memberType[]',
        label: '菜单数据',
        memberType: {
          message: {
            label: '菜单名称',
            type: 'string',
            required: true
          },
          nativeHref: {
            label: '菜单地址',
            type: 'string',
            required: true
          },
          outerHref: {
            label: '外链地址',
            type: 'string',
            required: false
          },
          target: {
            label: '跳转方式',
            type: 'string',
            default: 'inner',
            options: [{
              name: '内部跳转',
              value: 'inner'
            }, {
              name: '外部跳转',
              value: 'outer'
            }]
          },
          defaultIcon: {
            label: '菜单默认图标',
            type: 'image',
            default: ''
          },
          selectedIcon: {
            label: '菜单选中图标',
            type: 'image',
            default: ''
          },
          params: {
            label: '跳转参数',
            type: 'object',
            default: {}
          },
          isActive: {
            type: 'boolean', // 展示成switch组件
            label: '是否选中',
            default: false
          }
        }
      }
    }
    return temp

  }
};
