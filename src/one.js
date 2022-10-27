import { two } from "./two";
let one="one中的数据"
console.log("one.js:",one)
console.log("two.js",two)
@isTestable("装饰器添加的属性")
class MyClass { }

function isTestable(value) {
return function decorator(target) {
target.isTestable = value;
}
}
 console.dir(MyClass)
console.log(MyClass.isTestable)
function* gen() {
    let data = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("第一次执行"),
                resolve("返回来的数据data")
        }, 1000)
    })
    console.log(data)
    let data1 = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("第2次执行"),
                resolve("返回来的数据data1")
        }, 3000)
    })
    console.log(data1)
    let data2 = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("第3次执行"),
                resolve("返回来的数据data2")
        }, 5000)
    })
    console.log(data2)
    let data3 = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("第4次执行"),
                reject("请求数据失败")
        }, 2000)
    })
    console.log("错误对象", data3)
}
//地狱回调可读性差,不好维户,层层嵌套,用递归回调改写generator地狱回调问题
// let g = gen()
// g.next().value.then((data) => {
//     g.next(data)
//     .value.then((data1) => g.next(data1).value.then((data2) => {
//         g.next(data2).value.catch(err => console.log(err))
//     }))
// })
function run(gen) {
    //创建遍历器对象,gen为一个generator函数
    let myGen = gen()
    function handle(yielded) {
        if (!yielded.done) {
            //其中value为返回的一个promise对象
            yielded.value.then((res) => handle(myGen.next(res)))
        }
    }
    return handle(myGen.next())
    //return 递归调用 handle方法 myGen.next()返回一个{value:"",done:false}
}
run(gen)
