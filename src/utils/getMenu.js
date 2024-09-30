
// import Layout from '@/layout'
const _import = function (file) {
    return (resolve) => require([`../views${file}`], resolve)
}
// import Previous from '@/views/previous'
export function getRoutes(routes) {
    routes.forEach((item) => {
        if (item.type === 2) {
            if(item.path=='/coupon'){
                item.title='备货'
            }
            item.flag=true
            item.meta = { title: item.title }
            item.component = _import(item.path)
        }
        // 有子路由递归的进行配置
        // if (item.children && item.children.length > 0) {
        //     createRoute(item.children);
        // }
    });
    return routes;
};
// 核心处理方法
function createRoute(route) {

    route.forEach((item) => {
        if (item.type === 2) {
            item.meta = { title: item.title }
            item.component = _import(item.path)
        }
        // 有子路由递归的进行配置
        // if (item.children && item.children.length > 0) {
        //     createRoute(item.children);
        // }
    });
}
