// 配置express-session(未实现)
//引入express
const express = require("express");
const app = express();
const cors=require("cors")
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cors())
//引入并配置mongoose
const mongoose = require("mongoose");
require("./models/connect");
const User = require("./models/users");
//配置body-parser中间件
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//配置模板引擎
app.engine("html", require("express-art-template"));
//配置静态目录
app.use(express.static("public"));
app.all("*", function (req, res, next) {
  // 解决跨域问题
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  next();
});
//配置路由
// app.post("categories",async (req, res) => {
//   const result=await User.create(req.body)
//    res.send(result)
// })

app.get("/", function (req, res) {
  res.send("欢迎来到南师大水文模型系统");
});
//首先设置好路由，当用户输入响应的地址，既可以访问到当前页面
app.post("/login", async (req, res) => {
  //此时应牢记msg返回的是一个数组
  let msg = await User.find({
    name: req.body.name,
  });
  if (msg.length === 0) {
    return res.send({
      meet: 250,
      token: null,
      msg: "User does not exist!"
    });
  }
  if (msg.length !== 0 && msg[0].psw === req.body.psw) {
    return res.send({
      meet: 200,
      token: 200,
      msg: "Login successful!"
    });
  } else {
    return res.send({
      meet: 500,
      token: null,
      msg: "Password error!"
    });
  }
});
app.post("/categories",function(req,res){
  console.log(req.body);
  // let haveUser=require("../api/server/user.js");
  // haveUser(req.body.name,req.body.password,res);
  User.create({"name":req.body.name,"psw":req.body.password})
});
//绑定端口
app.listen(3000, function () {
  console.log("服务器连接成功！！！");
});