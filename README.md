# footprint-node

`footprint`服务端项目，运行步骤



1.配置好`Nodejs`和`MongoDB`环境

2.在`controllers/user.js`文件中有一个`test`方法，里面注释的内容是生成基础数据的，删除注释

3.在`routers/api.js`中删除对`/invitation-code`以及`/test`路由的注释

4.修改`controllers/category.js`中的`new ObjectId('5fb8ad9d919ed171d7a2166c')`中的默认id，此id为你生成的基础数据中的`user`的`ObjectId`；修改`controllers/category_detail.js`中的`EmptyUserId`以及`EmptyCategoryId`，``EmptyUserId`与上面说的`user`中的`ObjectId`一个意思，`EmptyCategoryId`为你生成的基础数据中的`category`表的`categoryName`名为`生活`的`ObjectId`

4.运行`app.js`，项目运行，修改`footprint`项目中的请求地址，两个项目就可以完美运行了

