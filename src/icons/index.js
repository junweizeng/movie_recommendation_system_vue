import SvgIcon from '@/components/basic/SvgIcon' // svg组件

// 引入资源的目录、是否需要遍历子目录、匹配文件的规则(检索svg目录下的所有.svg文件)
const req = require.context('./svg', false, /\.svg$/)
// req.keys()，属性值是一个方法，调用后返回的是一个路径数组，例如 ["./dashboard.svg", "./example.svg"]
// map(requireContext) 意思是每次遍历调用 requireContext 这个函数，并把数组中的第一项传递给 requireContext 函数中
const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req) 得到的是一个解析完毕后的数组
requireAll(req)

export default {
    install: (app) => {
        app.component("SvgIcon", SvgIcon)
    }
}

