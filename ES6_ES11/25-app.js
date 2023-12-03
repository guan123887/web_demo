// import *  as m1 from './25-hello'
// 获取元素
const btn = document.querySelector('#btn')
btn.onclick = function(){
    import('./25-hello.js').then(module=>{
        // console.log(module);
        module.hello()
    })
}