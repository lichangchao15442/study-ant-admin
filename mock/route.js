import { Constant } from './_utils'

const { ApiPrefix } = Constant

const database = [
    {
        id: '1',
        icon: 'dashboard',
        name: 'Dashboard',
        zh: {
            name: '仪表盘'
        },
        'pt-br': {
            name: "Dashboard"
        },
        route: '/dashboard'
    },
    {
        id: '2',
        breadcrumbParentId: '1',
        icon: 'user',
        name: 'Users',
        zh: {
            name: '用户管理'
        },
        'pt-br': {
            name: "Usuário"
        },
        route: '/user'
    },
    {
        id: '7',
        breadcrumbParentId: '1',
        icon: 'shopping-cart',
        name: 'Posts',
        zh: {
            name: '邮件管理'
        },
        'pt-br': {
            name: "Posts"
        },
        route: '/post'
    },
    {
        id: '21',
        menuParentId: '-1',
        breadcrumbParentId: '2',
        name: 'User Detail',
        zh: {
            name: '用户详情'
        },
        'pt-br': {
            name: "Detalhes do usuário"
        },
        route: '/user/:id'
    },
    {
        id: '3',
        breadcrumbParentId: '1',
        icon: 'api',
        name: 'Request',
        zh: {
            name: '后台接口'
        },
        'pt-br': {
            name: "Requisição"
        },
        route: '/request'
    },
    {
        id: '4',
        breadcrumbParentId: '1',
        icon: 'camera-o',
        name: 'UI Element',
        zh: {
            name: 'UI组件'
        },
        'pt-br': {
            name: "Elementos UI"
        }
    },
    {
        id: '45',
        breadcrumbParentId: '4',
        menuParentId: '4',
        icon: 'edit',
        name: 'Editor',
        zh: {
            name: '编辑'
        },
        'pt-br': {
            name: "Editor"
        },
        route: '/UIElement/editor',
    },
    {
        id: '5',
        breadcrumbParentId: '1',
        icon: 'code-o',
        name: 'Charts',
        zh: {
            name: '图表'
        },
        'pt-br': {
            name: "Graficos"
        }
    },
    {
        id: '51',
        breadcrumbParentId: '5',
        menuParentId: '5',
        icon: 'line-chart',
        name: 'ECharts',
        zh: {
            name: 'ECharts'
        },
        'pt-br': {
            name: "ECharts"
        },
        route: '/chart/ECharts',
    },
    {
        id: '52',
        breadcrumbParentId: '5',
        menuParentId: '5',
        icon: 'bar-chart',
        name: 'HighCharts',
        zh: {
            name: 'HighCharts'
        },
        'pt-br': {
            name: "HighCharts"
        },
        route: '/chart/highCharts',
    },
    {
        id: '53',
        breadcrumbParentId: '5',
        menuParentId: '5',
        icon: 'area-chart',
        name: 'Recharts',
        zh: {
            name: 'Recharts'
        },
        'pt-br': {
            name: "Recharts"
        },
        route: '/chart/Recharts',
    },
]
module.exports = {
    [`GET ${ApiPrefix}/routes`](req, res) {
        res.status(200).json(database)
    }
}