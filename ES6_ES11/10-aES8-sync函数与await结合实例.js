// 引入fs模块
const fs = require('fs')


// 读取为学
function readWX() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resources/为学.md', (err,data)=>{
			if (err) reject(err)
			resolve(data)
		})
	})
}
// 读取孟母三迁
function readMMSQ() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resources/孟母三迁.md', (err,data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

// 读取陈元芳候袁公
function readCYFHYG() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resources/陈元芳候袁公.md', (err,data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}


// 声明一个async函数
async function main() {
	try {
		let WX = await readWX();
		let MMSQ = await readMMSQ();
		let CYFHYG = await readCYFHYG();
		console.log(WX.toString())
		console.log(MMSQ.toString())
		console.log(CYFHYG.toString());
	} catch (e) {
		//TODO handle the exception
		console.log(e)
	}
}
main();
