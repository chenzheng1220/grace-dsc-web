export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '布局-KCN',
  categories: ['布局'], 
  screenshot:'https://webapp.zhaopin.com/2022/shh/jsjct1130ZL21287/KCN.png',
  dependencies: ['grace-dsc-content-copyright'],
  slots (props) {
    const count = props.navList.length

    const newArr = Array.from({ length: count }, (_, i) => ({
      name: props.navList[i].id
    }))
    const kvslot = {
      name: 'kvbox',
      maxCount: 1
    }
    newArr.push(kvslot)
    return newArr
  },
  props: {
    navList: {
      label: '菜单选项',
      type: 'memberType[]',
      memberType: {
        id: {
          label: '菜单id',
          type: 'string',
          required: true
        },
        name: {
          label: '菜单名称',
          type: 'string',
          required: true
        },
        iconUrl: {
          label: '菜单默认图标',
          type: 'image',
          required: false
        },
        iconUrlActive: {
          label: '菜单选中图标',
          type: 'image',
          required: false
        },
        target: {
          label: '是否跳外链',
          type: 'string',
          default: 'inner',
          options: [{
            name: '否',
            value: 'inner'
          }, {
            name: '是',
            value: 'outer'
          }]
        },
        outHref: {
          label: '外链地址',
          type: 'string',
          required: false
        }
      },
      default: []
    },
    defaultTabId: {
      label: '默认菜单id',
      type: 'string',
      required: false,
      default: ''
    },
    kvImg: {
      label: '背景KV',
      type: 'image',
      required: false,
      default: ''
    }
  }
}