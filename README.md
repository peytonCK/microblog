# Microblog

## prototypes 是设计原型，就是简单的截个图

## Requirements.md 是需求，会不时更新  

### 2017.7.28

### 2017.8.3
1、搞定mongodb接入；
2、前后端连接跑通；
待办：
1、确立接口返回数据格式；
2、session与cookie的使用；
3、页面接口的调用；


### 2017.8.6
node.js session & cookie需要研究！

### 2017.8.7
session搞定，用的filestore来存储session对话。有个确点，当大量用户来访问时，文件量会暴增！注意一点是，session的regenerate不能随便用，有时例子也不能全部参考；

准备增加功能点：
1、记住我；利用cookie记住session；
2、密码加密；加密机制；

### 2017.8.8
完成两个功能点。之后要加的功能点，还需要再思考！

### 2017.8.9
代码检查及优化;
1、session的存储，目前优化成redis；可以有多种：cookie(不安全)、redis(首选)、mongodb、file；都是使用中间件，注意配置项；





