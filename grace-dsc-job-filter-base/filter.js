export const filterOptions = [{
    name: '分公司',
    value: 'company',
}, {
    name: '工作地点',
    value: 'city',
}, {
    name: '职位类别',
    value: 'jobtype',
}, {
    name: '优选专业',
    value: 'majors',
}, {
    name: '自定义标签',
    value: 'tags',
}, {
    name: '部门',
    value: 'depts',
}, {
    name: '关键字',
    value: 'keyword',
}, {
    name: '薪资要求',
    value: 'new_salary',
}, {
    name: '学历要求',
    value: 'education',
}, {
    name: '工作经验',
    value: 'working_time',
}, {
    name: '职位类型',
    value: 'employment_type',
}, {
    name: '公司性质',
    value: 'company_type',
}, {
    name: '公司规模',
    value: 'company_size',
}]

export function getFilterOptionName(option) {
    const list = filterOptions.filter((item) => item.value === option)
    if (list.length === 1) return list[0].name
    else return null
}


export function convertFilterPost(post) {
    const res = {}
    Object.keys(post).forEach((key) => {
        // debugger
        switch (key) {
            case 'keyword': {
                if (post[key] != '') res.keyword =  post[key]
                break;
            }
            case 'company': {
                if (post[key].length > 0) res.orgDepartmentIds = post[key]
                break;
            }
            case 'city': {
                if (post[key].length > 0) res.workRegionIds = post[key]
                break;
            }
            case 'jobtype': {
                if (post[key].length > 0) res.jobtype = post[key]
                break;
            }
            case 'majors': {
                if (post[key].length > 0) res.majors = post[key]
                break;
            }
            case 'depts': {
                if (post[key].length > 0) res.depts = post[key]
                break;
            }
            case 'tags': {
                if (post[key].length > 0) res.tags = post[key]
                break;
            }
            case 'new_salary': {
                if (post[key].length > 0) res.new_salary = post[key]
                break;
            }
            case 'education': {
                if (post[key].length > 0) res.education = post[key]
                break;
            }
            case 'working_time': {
                if (post[key].length > 0) res.working_time = post[key]
                break;
            }
            case 'employment_type': {
                if (post[key].length > 0) res.employment_type = post[key]
                break;
            }
            case 'company_type': {
                if (post[key].length > 0) res.company_type = post[key]
                break;
            }
            case 'company_size': {
                if (post[key].length > 0) res.company_size = post[key]
                break;
            }
        }
    });
    return res
}