const fs=require('fs')

// 原始方法
fs.readFile('./resources/陈元芳候袁公.md',(err,data1)=>{
	fs.readFile('./resources/孟母三迁.md',(err,data2)=>{
		fs.readFile('./resources/为学.md',(err,data3)=>{
			let result=data1+'\r\n'+data2+'\r\n'+data3;
			// console.log(result);
		})
	})
})


// 使用Promise实现
const p=new Promise((resolve,reject)=>{
	fs.readFile('./resources/陈元芳候袁公.md',(err,data)=>{
		resolve(data);
	})
})
p.then(value=>{
	return new Promise((resolve,reject)=>{
		fs.readFile('./resources/孟母三迁.md',(err,data)=>{
			resolve([value,data])
		})
	})
}).then(value=>{
	return new Promise((resolve,reject)=>{
		fs.readFile('./resources/为学.md',(err,data)=>{
			value.push(data)
			console.log(value.toString())
		})
	})
})