
const _import = function (file) {
    return (resolve) => require([`@/views${file}`], resolve)
}
import Layout from '@/layout'
import Previous from '@/views/previous'
export function getRoutes(routes) {
    createRoute(routes)
    return routes;
};
//核心处理方法
function createRoute(route) {
    route.forEach((item) => {
    //  0是文件夹 1是菜单
        if (item.type === 0 && item.component === 'Layout') {
            item.component = Layout
            item.path =item.path
            item.meta = { title: item.title }
            // item.component = _import(item.path)
        }
        else if (item.type === 0 && item.component !== 'Layout') {
            item.component = Previous
            item.path = '/' + item.name
            item.meta = { title: item.title }
            // item.component = _import(item.path)
        }
        if (item.type == 1 ) {
            item.meta = { title: item.title }
            item.component = _import(item.path)
        }
        //有子路由递归的进行配置
        if (item.children && item.children.length > 0) {
            createRoute(item.children);
        }
    });

}


