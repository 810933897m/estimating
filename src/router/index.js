import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import request from "@/utils/request";

import {getRoute} from '@/utils/route.js'

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
// import home from "@/views/home/index";

import userList from "@/views/administrators/userList";
// import userList from "@/views/administrators/userList";
console.log(Layout)
 var constantRouterMap = [
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
            component : userList,
            // component: () => import('@/views/administrators/userList'),
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
        children: [{//对私询价
            path: 'inquiry',
            name: 'inquiry',
            component: () => import('@/views/inquiryManagement/inquiry'),
            meta: {
                title: '对私询价',
                icon: 'order'
            }
        },
        {//对公询价
            path: 'CorporateInquiry',
            name: 'CorporateInquiry',
            component: () => import('@/views/inquiryManagement/CorporateInquiry'),
            meta: {
                title: '对公询价',
                icon: 'total-yesterday'
            }
        },
        {//报告立项
            path: 'projectInitiation',
            name: 'projectInitiation',
            component: () => import('@/views/inquiryManagement/projectInitiation'),
            meta: {
                title: '报告立项',
                icon: 'product-brand',
                // keepAlive: true
            }
        },
        {//报告立项
            path: 'Transition',
            name: 'Transition',
            component: () => import('@/views/inquiryManagement/Transition'),
            meta: {
                title: '预评转正式',
                icon: 'xianxia',
                // keepAlive: true
            }
        },{//添加询价
            path: '/addInquiry',
            component: () => import('@/views/inquiryManagement/addInquiry'),
            name:'addInquiry',
            meta:{
                title:'添加询价',
            },
            hidden: true
        },{//添加询价
            path: '/publicAddInquiry',
            component: () => import('@/views/inquiryManagement/publicAddInquiry'),
            name:'publicAddInquiry',
            meta:{
                title:'添加对公询价',
            },
            hidden: true
        }
        ,{//添加询价
            path: '/addPublicInquiry',
            component: () => import('@/views/inquiryManagement/addPublicInquiry'),
            name:'addPublicInquiry',
            meta:{
                title:'添加询价',
            },
            hidden: true
        }
        ,{//添加合同
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
        },{//修改询价
            path: '/updataInquiry1',
            component: () => import('@/views/inquiryManagement/updataInquiry1'),
            name:'updataInquiry1',
            meta:{
                title:'修改询价',
            },
            hidden: true
        },{//修改对公询价
            path: '/updataInquiry2',
            component: () => import('@/views/inquiryManagement/updataInquiry2'),
            name:'updataInquiry2',
            meta:{
                title:'修改对公询价',
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
        },{//修改报告
            path: '/updateprojectInitiation',
            component: () => import('@/views/inquiryManagement/updateprojectInitiation'),
            name:'updateprojectInitiation',
            meta:{
                title:'修改报告立项',
            },
            hidden: true
        },{//修改报告
            path: '/updateTransition',
            component: () => import('@/views/inquiryManagement/updateTransition'),
            name:'updateTransition',
            meta:{
                title:'预评转正式',
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
            icon: 'sms'
        },
        children: [{
                path: 'fieldManagement',
                name: 'fieldManagement',
                component: () => import('@/views/fieldManagement/fieldManagement'),
                meta: {
                    title: '外业管理',
                    icon: 'sms-subject',
                    // keepAlive: true
                }
            },{
                path: 'InteriorManagement',
                name: 'InteriorManagement',
                component: () => import('@/views/fieldManagement/InteriorManagement'),
                meta: {
                    title: '内业分配',
                    icon: 'example',
                    // keepAlive: true
                }
            },{
                path: 'AppraisalOperation',
                name: 'AppraisalOperation',
                component: () => import('@/views/fieldManagement/AppraisalOperation'),
                meta: {
                    title: '估价作业',
                    icon: 'marker',
                    // keepAlive: true
                }
            }
            // ,{
            //     path: 'ProjectReview',
            //     name: 'ProjectReview',
            //     component: () => import('@/views/fieldManagement/ProjectReview'),
            //     meta: {
            //         title: '项目审核',
            //         icon: 'product-brand',
            //         // keepAlive: true
            //     }
            // }
            
            // ,{
            //     path: 'seal',
            //     name: 'seal',
            //     component: () => import('@/views/fieldManagement/seal'),
            //     meta: {
            //         title: '合同盖章',
            //         icon: 'sms-new',
            //         // keepAlive: true
            //     }
            // }
            ,{
                path: 'printing',
                name: 'printing',
                component: () => import('@/views/fieldManagement/printing'),
                meta: {
                    title: '打印装订',
                    icon: 'sms-flash',
                    // keepAlive: true
                }
            }
            // ,{
            //     path: 'binding',
            //     name: 'binding',
            //     component: () => import('@/views/fieldManagement/binding'),
            //     meta: {
            //         title: '报告装订',
            //         icon: 'product-comment',
            //         // keepAlive: true
            //     }
            // }
            ,{
                path: 'SendReport',
                name: 'SendReport',
                component: () => import('@/views/fieldManagement/SendReport'),
                meta: {
                    title: '报告发送',
                    icon: 'product-comment',
                    // keepAlive: true
                }
            }
            ,{
                path: 'ProjectArchive',
                name: 'ProjectArchive',
                component: () => import('@/views/fieldManagement/ProjectArchive'),
                meta: {
                    title: '项目归档',
                    icon: 'product-cate',
                    // keepAlive: true
                }
            }
            ,{//合同管理
                path: 'contract',
                name: 'contract',
                component: () => import('@/views/inquiryManagement/contract'),
                meta: {
                    title: '合同管理',
                    icon: 'sms-subject'
                }
            }
            // ,{
            //     path: 'application',
            //     name: 'application',
            //     component: () => import('@/views/fieldManagement/application'),
            //     meta: {
            //         title: '项目终申',
            //         icon: 'product-list',
            //         // keepAlive: true
            //     }
            // }
            ,{
                path: 'Refund',
                name: 'Refund',
                component: () => import('@/views/fieldManagement/Refund'),
                meta: {
                    title: '退单撤单',
                    icon: 'product-list',
                    // keepAlive: true
                }
            }
            ,{
                path: 'FinancialCollection',
                name: 'FinancialCollection',
                component: () => import('@/views/fieldManagement/FinancialCollection'),
                meta: {
                    title: '财务收款',
                    icon: 'total-today',
                    // keepAlive: true
                }
            }
            ,{
                path: 'invoice',
                name: 'invoice',
                component: () => import('@/views/fieldManagement/invoice'),
                meta: {
                    title: '申请发票',
                    icon: 'sms-subject',
                    // keepAlive: true
                }
            },{
                path: 'InvoiceAudit',
                name: 'InvoiceAudit',
                component: () => import('@/views/AuditManagement/InvoiceAudit'),
                meta: {
                    title: '发票开具',
                    icon: 'example',
                    // keepAlive: true
                }
            },{
                path: '/addRefund',
                name: 'addRefund',
                component: () => import('@/views/fieldManagement/addRefund'),
                meta: {
                    title: '退费添加',
                    icon: 'marker'
                },
                hidden: true
            },{
                path: 'projectChange',
                name: 'projectChange',
                component: () => import('@/views/fieldManagement/projectChange'),
                meta: {
                    title: '项目变更',
                    icon: 'order',
                    // keepAlive: true
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
            },{
                path: '/uploadDetail',
                name: 'uploadDetail',
                component: () => import('@/views/fieldManagement/uploadDetail'),
                meta: {
                    title: '上传详情',
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
            icon: 'sms'
        },
        children: [
            {
                path: 'InquiryApproval',
                name: 'InquiryApproval',
                component: () => import('@/views/AuditManagement/InquiryApproval'),
                meta: {
                    title: '询值单价审核',
                    icon: 'sms-new',
                    // keepAlive: true
                }
            },
            
            {
                path: 'SecondProject',
                name: 'SecondProject',
                component: () => import('@/views/AuditManagement/SecondProject'),
                meta: {
                    title: '估价作业审核',
                    icon: 'total-week',
                    // keepAlive: true
                }
            },
            {
                path: 'FinalAudit',
                name: 'FinalAudit',
                component: () => import('@/views/AuditManagement/FinalAudit'),
                meta: {
                    title: '最终审核',
                    icon: 'example',
                    // keepAlive: true
                }
            },
            {
                path: 'FinancialCollection',
                name: 'FinancialCollection',
                component: () => import('@/views/AuditManagement/FinancialCollection'),
                meta: {
                    title: '财务收款审核',
                    icon: 'total-today',
                    // keepAlive: true
                }
            },{
                path: 'changeReview',
                name: 'changeReview',
                component: () => import('@/views/AuditManagement/changeReview'),
                meta: {
                    title: '变更审核',
                    icon: 'xt2',
                    // keepAlive: true
                }
            }
            // ,{
            //     path: 'RefundReview',
            //     name: 'RefundReview',
            //     component: () => import('@/views/AuditManagement/RefundReview'),
            //     meta: {
            //         title: '退费退单审核',
            //         icon: 'order',
            //         // keepAlive: true
            //     }
            // },{
            //     path: 'InvoiceReview',
            //     name: 'InvoiceReview',
            //     component: () => import('@/views/AuditManagement/InvoiceReview'),
            //     meta: {
            //         title: '发票审核',
            //         icon: 'order',
            //         // keepAlive: true
            //     }
            // }
            ,{
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
    {//综合数据
        path: '/comprehensiveList',
        component: () => import('@/views/inquiryManagement/comprehensiveList'),
        name:'comprehensiveList',
        meta:{
            title:'综合数据',
        },
        hidden: true
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    
]
console.log(constantRouterMap)
sessionStorage.setItem('route',JSON.stringify(constantRouterMap))
// console.log()
getRoute()
// constantRouterMap = JSON.parse(sessionStorage.getItem('route'));


console.log('1')
console.log('1')

console.log(JSON.parse(sessionStorage.getItem('route1')))
var routers =  JSON.parse(sessionStorage.getItem('route1'));
console.log(routers)
export default new Router({
    
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})