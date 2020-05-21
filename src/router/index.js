import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    {//登录页
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {//404找不到
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {//首页
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/home/index'),
            meta: {
                title: '首页',
                icon: 'home'
            }
        }]
    },
    {//用户管理
        path: '/administrators',
        component: Layout,
        name: 'administrators',
        meta: {
            title: '用户管理',
            icon: 'sms'
        },
        children: [{//用户列表
            path: 'userList',
            name: 'userList',
            component: () => import('@/views/administrators/userList'),
            meta: {
                title: '用户列表',
                icon: 'order'
            }
        },{//角色列表
            path: 'roleList',
            name: 'roleList',
            component: () => import('@/views/administrators/roleList'),
            meta: {
                title: '角色列表',
                icon: 'sms-subject'
            }
        },{//添加用户
            path: '/addUser',
            component: () => import('@/views/administrators/addUser'),
            name:'addUser',
            meta:{
                title:'添加用户',
            },
            hidden: true
        },{//用户详情
            path: '/detailUser',
            component: () => import('@/views/administrators/detailUser'),
            name:'detailUser',
            meta:{
                title:'用户详情',
            },
            hidden: true
        },
    ],
    },
    {//询价立项管理
        path: '/inquiryManagement',
        component: Layout,
        name: 'inquiryManagement',
        meta: {
            title: '询价立项管理',
            icon: 'sms'
        },
        children: [{//询价
            path: 'inquiry',
            name: 'inquiry',
            component: () => import('@/views/inquiryManagement/inquiry'),
            meta: {
                title: '询价',
                icon: 'order'
            }
        },{//报告立项
            path: 'projectInitiation',
            name: 'projectInitiation',
            component: () => import('@/views/inquiryManagement/projectInitiation'),
            meta: {
                title: '报告立项',
                icon: 'product-brand'
            }
        },{//合同管理
            path: 'contract',
            name: 'contract',
            component: () => import('@/views/inquiryManagement/contract'),
            meta: {
                title: '合同管理',
                icon: 'sms-subject'
            }
        },{//添加询价
            path: '/addInquiry',
            component: () => import('@/views/inquiryManagement/addInquiry'),
            name:'addInquiry',
            meta:{
                title:'添加询价',
            },
            hidden: true
        },{//添加合同
            path: '/addContract',
            component: () => import('@/views/inquiryManagement/addContract'),
            name:'addContract',
            meta:{
                title:'添加合同',
            },
            hidden: true
        },{//合同详情
            path: '/detailContract',
            component: () => import('@/views/inquiryManagement/detailContract'),
            name:'detailContract',
            meta:{
                title:'合同详情',
            },
            hidden: true
        },{//修改询价
            path: '/updataInquiry',
            component: () => import('@/views/inquiryManagement/updataInquiry'),
            name:'updataInquiry',
            meta:{
                title:'修改询价',
            },
            hidden: true
        },{//询价详情
            path: '/detailInquiry',
            component: () => import('@/views/inquiryManagement/detailInquiry'),
            name:'detailInquiry',
            meta:{
                title:'询价详情',
            },
            hidden: true
        },{//修改询价
            path: '/addProjectInitiation',
            component: () => import('@/views/inquiryManagement/addProjectInitiation'),
            name:'addProjectInitiation',
            meta:{
                title:'新增报告',
            },
            hidden: true
        },{//报告详情
            path: '/detaiPprojectInitiation',
            component: () => import('@/views/inquiryManagement/detaiPprojectInitiation'),
            name:'detaiPprojectInitiation',
            meta:{
                title:'报告详情',
            },
            hidden: true
        },{//修改询价
            path: '/updateprojectInitiation',
            component: () => import('@/views/inquiryManagement/updateprojectInitiation'),
            name:'updateprojectInitiation',
            meta:{
                title:'修改报告立项',
            },
            hidden: true
        },
    ],
    },{//我的项目
        path: '/fieldManagement',
        component: Layout,
        name: 'fieldManagement',
        meta: {
            title: '我的项目',
            icon: 'order-return-reason'
        },
        children: [{
                path: 'fieldManagement',
                name: 'fieldManagement',
                component: () => import('@/views/fieldManagement/fieldManagement'),
                meta: {
                    title: '外业管理',
                    icon: 'sms-subject'
                }
            },{
                path: 'InteriorManagement',
                name: 'InteriorManagement',
                component: () => import('@/views/fieldManagement/InteriorManagement'),
                meta: {
                    title: '内业分配',
                    icon: 'example'
                }
            },{
                path: 'AppraisalOperation',
                name: 'AppraisalOperation',
                component: () => import('@/views/fieldManagement/AppraisalOperation'),
                meta: {
                    title: '估价作业',
                    icon: 'marker'
                }
            },{
                path: 'ProjectReview',
                name: 'ProjectReview',
                component: () => import('@/views/fieldManagement/ProjectReview'),
                meta: {
                    title: '项目审核',
                    icon: 'product-brand'
                }
            },{
                path: 'seal',
                name: 'seal',
                component: () => import('@/views/fieldManagement/seal'),
                meta: {
                    title: '合同盖章',
                    icon: 'sms-new'
                }
            },{
                path: 'printing',
                name: 'printing',
                component: () => import('@/views/fieldManagement/printing'),
                meta: {
                    title: '报告打印',
                    icon: 'sms'
                }
            },{
                path: 'binding',
                name: 'binding',
                component: () => import('@/views/fieldManagement/binding'),
                meta: {
                    title: '报告装订',
                    icon: 'product-comment'
                }
            },{
                path: 'SendReport',
                name: 'SendReport',
                component: () => import('@/views/fieldManagement/SendReport'),
                meta: {
                    title: '报告发送',
                    icon: 'product-comment'
                }
            },{
                path: 'application',
                name: 'application',
                component: () => import('@/views/fieldManagement/application'),
                meta: {
                    title: '项目终申',
                    icon: 'product-list'
                }
            },{
                path: 'projectChange',
                name: 'projectChange',
                component: () => import('@/views/fieldManagement/projectChange'),
                meta: {
                    title: '项目变更',
                    icon: 'order'
                }
            },{
                path: 'changeReview',
                name: 'changeReview',
                component: () => import('@/views/fieldManagement/changeReview'),
                meta: {
                    title: '变更审核',
                    icon: 'order'
                }
            },{
                path: 'jietu',
                name: 'jietu',
                component: () => import('@/views/fieldManagement/jietu'),
                meta: {
                    title: '截图',
                    icon: 'product-brand'
                }
            },{
                path: '/AuditRecord',
                name: 'AuditRecord',
                component: () => import('@/views/fieldManagement/AuditRecord'),
                meta: {
                    title: '审核记录',
                    icon: 'marker'
                },
                hidden: true
            },{
                path: '/imageWork',
                name: 'imageWork',
                component: () => import('@/views/fieldManagement/imageWork'),
                meta: {
                    title: '图片',
                    icon: 'marker'
                },
                hidden: true
            }],
    },{//审核管理
        path: '/AuditManagement',
        component: Layout,
        name: 'AuditManagement',
        meta: {
            title: '审核管理',
            icon: 'marker'
        },
        children: [
            {
                path: 'InquiryApproval',
                name: 'InquiryApproval',
                component: () => import('@/views/AuditManagement/InquiryApproval'),
                meta: {
                    title: '询值单价审核',
                    icon: 'sms-subject'
                }
            },{
                path: 'SecondProject',
                name: 'SecondProject',
                component: () => import('@/views/AuditManagement/SecondProject'),
                meta: {
                    title: '项目二审审核',
                    icon: 'example'
                }
            },{
                path: 'FinancialCollection',
                name: 'FinancialCollection',
                component: () => import('@/views/AuditManagement/FinancialCollection'),
                meta: {
                    title: '财务收款审核',
                    icon: 'order'
                }
            },{
                path: '/FinancialCollectionDetail',
                name: 'FinancialCollectionDetail',
                component: () => import('@/views/AuditManagement/FinancialCollectionDetail'),
                meta: {
                    title: '记录列表',
                    icon: 'marker'
                },
                hidden: true
            },
        ],
    },
    // {//激励与认证
    //     path: '/incentiveplan',
    //     component: Layout,
    //     name: 'incentiveplan',
    //     meta: {
    //         title: '激励与认证',
    //         icon: 'example'
    //     },
    //     children: [{
    //         path: 'IncentivePlanList',
    //         name: 'IncentivePlanList',
    //         component: () => import('@/views/incentiveplan/IncentivePlanList'),
    //         meta: {
    //             title: '激励列表',
    //             icon: 'order'
    //         }
    //     },{
    //         path: 'addIncentivePlan',
    //         name: 'addIncentivePlan',
    //         component: () => import('@/views/incentiveplan/addIncentivePlan'),
    //         meta: {
    //             title: '添加激励计划',
    //             icon: 'product-add'
    //         }
    //     },{
    //         path: 'LevelCertificationList',
    //         name: 'LevelCertificationList',
    //         component: () => import('@/views/incentiveplan/LevelCertificationList'),
    //         meta: {
    //             title: '级别列表',
    //             icon: 'order'
    //         }
    //     },{
    //         path: 'addLevelCertification',
    //         name: 'addLevelCertification',
    //         component: () => import('@/views/incentiveplan/addLevelCertification'),
    //         meta: {
    //             title: '添加级别认证',
    //             icon: 'product-add'
    //         }
    //     },{
    //         path: 'incentivePlanAndlevelUpload',
    //         name: 'incentivePlanAndlevelUpload',
    //         component: () => import('@/views/incentiveplan/incentivePlanAndlevelUpload'),
    //         meta: {
    //             title: '激励与认证导入',
    //             icon: 'order-return'
    //         }
    //     }],
    // },
    // {//渠道政策管理
    //     path: '/channelPolicy',
    //     component: Layout,
    //     name: 'channelPolicy',
    //     meta: {
    //         title: '政策管理',
    //         icon: 'font'
    //     },
    //     children: [{
    //         path: 'list',
    //         name: 'list',
    //         component: () => import('@/views/channelPolicy/channelPolicyList'),
    //         meta: {
    //             title: '渠道政策列表',
    //             icon: 'form'
    //         }
    //     },{
    //         path: 'add',
    //         name: 'add',
    //         component: () => import('@/views/channelPolicy/addChannelPolicy'),
    //         meta: {
    //             title: '渠道政策添加',
    //             icon: 'product-add'
    //         }
    //     },{
    //         path: 'list1',
    //         name: 'list1',
    //         component: () => import('@/views/productPolicy/productPolicyList'),
    //         meta: {
    //             title: '产品政策列表',
    //             icon: 'marker'
    //         }
    //     },{
    //         path: 'add1',
    //         name: 'add1',
    //         component: () => import('@/views/productPolicy/addProductPolicy'),
    //         meta: {
    //             title: '添加产品政策',
    //             icon: 'product-cate'
    //         } 
    //     }],
    // },
    // {//分类管理
    //     path: '/classification',
    //     component: Layout,
    //     name: 'classification',
    //     meta: {
    //         title: '分类管理',
    //         icon: 'sms-new'
    //     },
    //     children: [{
    //         path: 'list',
    //         name: 'list',
    //         component: () => import('@/views/classification/classificationList'),
    //         meta: {
    //             title: '分类管理',
    //             icon: 'product-list'
    //         }
    //     }],
    // },
    // {//分销管理
    //     path: '/distribution',
    //     component: Layout,
    //     name: 'distribution',
    //     meta: {
    //         title: '分销管理',
    //         icon: 'sms-ad'
    //     },
    //     children: [{
    //         path: 'list',
    //         name: 'list',
    //         component: () => import('@/views/distribution/distributionList'),
    //         meta: {
    //             title: '分销列表',
    //             icon: 'product-list'
    //         }
    //     },{
    //         path: 'add',
    //         name: 'add',
    //         component: () => import('@/views/distribution/addDistribution'),
    //         meta: {
    //             title: '添加分销',
    //             icon: 'product-comment'
    //         } 
    //     },{//分销详情
    //         path: '/distributionDetail',
    //         component: () => import('@/views/distribution/distributionDetail'),
    //         name:'distributionDetail',
    //         meta:{
    //             title:'详情',
    //         },
    //         hidden: true
    //     }],
    // },
    // {//学习视频管理
    //     path: '/learningVideo',
    //     component: Layout,
    //     name: 'learningVideo',
    //     meta: {
    //         title: '学习视频',
    //         icon: 'product-brand'
    //     },
    //     children: [{
    //         path: 'list',
    //         name: 'list',
    //         component: () => import('@/views/learningVideo/videoList'),
    //         meta: {
    //             title: '学习视频列表',
    //             icon: 'sms-ad'
    //         }
    //     },{
    //         path: 'add',
    //         name: 'add',
    //         component: () => import('@/views/learningVideo/addVideo'),
    //         meta: {
    //             title: '添加视频与答题',
    //             icon: 'product-comment'
    //         }
    //     },{//学习视频详情
    //         path: '/videoDetail',
    //         component: () => import('@/views/learningVideo/videoDetail'),
    //         name:'videoDetail',
    //         meta:{
    //             title:'详情',
    //         },
    //         hidden: true
    //     },],
    // },{//分类管理.vue
    //     path: '/userAgreement',
    //     component: Layout,
    //     name: 'userAgreement',
    //     meta: {
    //         title: '用户协议',
    //         icon: 'sms-new'
    //     },
    //     children: [{
    //         path: 'userAgreement',
    //         name: 'userAgreement',
    //         component: () => import('@/views/userAgreement/userAgreementList'),
    //         meta: {
    //             title: '用户协议',
    //             icon: 'product-list'
    //         }
    //     }],
    // },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    
    
    
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
