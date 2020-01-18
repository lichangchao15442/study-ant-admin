# study-ant-admin
This is a project to learn ant-admin.

# 相关知识点
* PureComponent：以浅层对比props和state的方法实现shouldComponentUpdate()函数。
* Fragment：在不额外创建DOM元素的情况下，让render()方法中返回多个元素;
* Helmet：动态修改网页的title。
* display: inline-flex,将对象作为内联块级弹性伸缩盒显示。与flex的区别：flex在没有设置宽度的时候默认100%，inline-flex在没有设置宽度的时候，会根据子元素的宽高自适应。
* text-indent：规定文本块中首行文本的缩进，如果使用负值，那么首行会被缩进到左边。
* @keyframes：可以创建动画，用百分比来规定改变发生的时间，或者通过关键词"from"和"to"，等价于0%和100%。0%是动画开始时间，100%动画的结束时间。
* withRouter：将一个组件包裹进Route里面，然后react-router的三个对象history、location、match就会被放进这个组件的props属性中。
* import {curry} from "loadsh"：curry(func, [arity=func.length])，创建一个函数，该函数接收 func 的参数，要么调用func返回的结果，如果 func 所需参数已经提供，则直接返回 func 所执行的结果。或返回一个函数，接受余下的func 参数的函数，可以使用 func.length 强制需要累积的参数个数。
* import {cloneDeep} from "loadsh"：深拷贝，（独立不影响）。
* startsWith()：用于检测字符串是否以指定的子字符串开始。
* pathToRegexp()：utl字符串的正则表达式，可类比于JavaScript中的new RegExp('xxx')。
* exec()：匹配url地址与规则是否相符
* @import 导入样式;～作为模块导入。
* umi 默认是开启 css modules 的,使用方法：http://www.ruanyifeng.com/blog/2016/06/css_modules.html。
* store.js 提供了一套跨浏览器的本地存储解决方案。
