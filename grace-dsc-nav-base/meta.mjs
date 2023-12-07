export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '导航组件-固定导航',
  categories: ['导航'], 
  dependencies: [],
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/nav_top.0e2f7235.png',
  props(prop)  {
    const temp = {
      navType:  {
        label: "导航类型",
        type: "string",
        default: "bottom",
        options: [
          {
            name: "居底导航",
            value: "bottom",
          },
          {
            name: "居中导航",
            value: "center",
          },
          {
            name: "居中吸顶导航",
            value: "centerTop",
          }
        ]
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
}
