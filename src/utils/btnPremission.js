import Vue from 'vue'


let newArr
function findItem(oldArr) {

    oldArr.forEach(v => {

        if (v.children && v.children.length > 0) {

            findItem(v.children)
        } else {
            const currentRoute = localStorage.getItem('toCurrentRoute')

            if (v.path === currentRoute) {

                newArr = v
            }
        }
    })
    return newArr
}
Vue.directive('permission', {
    inserted(el, binding) {
        const currentRight = JSON.parse(localStorage.getItem('menuList'))
        let item = findItem(currentRight)
        let obj = {
            ...item,
            function: [
                { name: "isDelete", props: item.isDelete },
                { name: "isExport", props: item.isExport },
                { name: "isQuery", props: item.isQuery },
                { name: "isUpdate", props: item.isUpdate }
            ]
        }
        let hasPemission = ''
        obj.function.forEach(val => {
            if (val.name === binding.value.name) {
                hasPemission = val.props
                if (!hasPemission) {
                    el.parentNode.removeChild(el)
                }
            }
        })


    }
})