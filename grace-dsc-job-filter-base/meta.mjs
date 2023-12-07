export default {
  type: 'uni-app',
  author: 'chenzheng.chen',
  description: '职位搜索',
  categories: ['职位'], 
  screenshot: 'https://webapp.zhaopin.com/common/static-resource/search.925ebd27.png',
  dependencies: [],
  parent: ['grace-dsc-job-list-base:filter'],
  slotData: ['companyIds', 'isCam', 'companyOutId', 'isGroup'],
  props: {
    isSticky: {
      label: '是否吸顶',
      type: 'boolean',
      default: true,
    },
    filterConfig: {
      type: 'string[]', // 类型为 array 时，并且可枚举时展示多选选择器
      label: '搜索条件',
      default:['company','city', 'jobtype', 'keyword'],
      options: [{
        name: '分公司（登陆点）',
        value: 'company'
      }, {
        name: '工作地点',
        value: 'city'
      }, {
        name: '关键字',
        value: 'keyword'
      }, {
        name: '职位类别',
        value: 'jobtype'
      }, {
        name: '优选专业',
        value: 'majors'
      }, {
        name: '部门',
        value: 'depts'
      }, {
        name: '自定义标签',
        value: 'tags'
      }, {
        name: '薪资要求',
        value: 'new_salary'
      }, {
        name: '学历要求',
        value: 'education'
      }, {
        name: '工作经验',
        value: 'working_time'
      }, {
        name: '职位类型',
        value: 'employment_type'
      }, {
        name: '公司性质',
        value: 'company_type'
      }, {
        name: '公司规模',
        value: 'company_size'
      }]
    },
    maxSelectedCount: {
      type: 'number',
      label: '单项最大选择数量',
      default: 1
    },
    isSelectShow: {
      type: 'boolean',
      label: '是否显示聚合下拉框',
      default: false
    }
  }
}
