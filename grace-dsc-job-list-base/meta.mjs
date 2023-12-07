export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '职位列表',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/joblist.c62796ef.png',
  dependencies: [],
  slotData: [],
  slots: [{
    name: 'filter',
    maxCount: 1
  }, {
    name: 'item',
    data: 'jobItem',
    maxCount: 1
  }],
  props: {
    isCompanyDetail: {
      label: '是否显示公司详情',
      type: 'boolean',
      default: false,
      required: true
    },
    isDeptDetail: {
      label: '是否显示部门详情',
      type: 'boolean',
      default: false,
      required: true
    },
    isBack: {
      label: '是否显示返回按钮',
      type: 'boolean',
      default: false
    },
    backUrl: {
      label: '返回列表页面路由',
      type: 'string',
      default: ''
    },
    positionType: {
      label: '职位展示类型',
      type: 'string',
      default: 'ordinary',
      options: [
        {
          name: '普通',
          value: 'ordinary'
        },
        {
          name: '标题聚合',
          value: 'aggregation'
        }
      ]
    },
    isCam: {
      label: 'id类型',
      type: 'string',
      default: '',
      options: [
        {
          name: '校招id',
          value: 'cam'
        },
        {
          name: '社招id',
          value: 'scoial'
        }
      ]
    },
    isGroup: {
      label: '是否是集团账号',
      type: 'boolean',
      default: false,
      required: false
    },
    companyIds: {
      label: '公司id',
      type: 'memberType[]',
      memberType: {
        id: {
          label: 'id',
          type: 'string',
          required: true,
        }
      }
    },
    tagsId: {
      type: 'memberType[]',
      label: '自定义标签设置（校招或社招都可）',
      memberType: {
        id: {
          label: '标签名称',
          type: 'string',
          required: true
        }
      }
    },
    companyOutId: {
      type: 'memberType[]',
      label: '公司登陆点设置（校招）',
      memberType: {
        id: {
          label: '公司id',
          type: 'string',
          required: true
        }
      }
    },
    deptId: {
      type: 'memberType[]',
      label: '部门设置（校招）',
      memberType: {
        id: {
          label: '部门id',
          type: 'string',
          required: true
        }
      }
    }
  }
}
