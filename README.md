###后台原型用于快速搭建一个项目

使用步骤

1、创建一个新的项目

````
meteor create dashboard
````

2、安装项目依赖的npm包

````
meteor npm install
````

3、添加原型框架

````
meteor add fami:dashboard-framework
````

4、中安装重要的依赖

````
meteor npm install --save bcrypt
````


在注册用户时添加了这些字段.

```
Meteor.users.update({ _id: account._id }, {
            $set: {
                profile: {
                    avatar: profile.avatar,
                    balance: profile.balance,
                    point: profile.point,
                    channel:profile.channel,
                    nickname:profile.nickname,
                },
                type:"dashboard",
               
            }
        });
```

email 注册邮箱

pwd 注册密码



可在Meteor.startup中修改相关参数

framework = {

	logo:" FAMI<b>2</b>U", //logo html或图片

	title:"连接技术与商业，释放开发者生产力。", //副标题

	notFound:"http://image.fami2u.com/ghost/404.png", //404页面图片

	template:{

		site:"dfSite",//首页默认渲染模版

		notFound:"dfNotFound",//404页默认渲染模版
	}
}

