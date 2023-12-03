// 1.引入fs模块
const fs=require('fs')

// 2.调用方法读取文件
// fs.readFile('../resources/为学.md',(err,data)=>{
// 	if(err) throw err;
// 	console.log(data.toString());
// })

// 3.使用Promise封装
const p=new Promise(function(resolve,reject){
	fs.readFile('../resources/为学.md',(err,data)=>{
		if(err) reject(err)
		/成功时
		resolve(data.toString())
	})
})

p.then(function(value){
	console.log(value);
},function(reason){
	console.log('读取失败')
})

