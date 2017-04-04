Meteor.startup(function() {
   

    if (!Meteor.users.findOne()) {
        console.log("系统初始化");



        var initAdmin = {
            email: "admin@fami2u.com",
            password: "123"
        }

        console.log("新建管理员账号:" + initAdmin.email);
        console.log("账号初始密码:" + initAdmin.password);

        Accounts.createUser({
            email: initAdmin.email,
            password: initAdmin.password,
        });

        var account = Accounts.findUserByEmail(initAdmin.email);

        console.log("设置用户权限：GLOBAL_GROUP／admin");


        Roles.addUsersToRoles(account._id, ["admin"], Roles.GLOBAL_GROUP);

        console.log("设置用户基本信息：");

        var profile = {
            avatar: "http://image.fami2u.com/ghost/avatar.jpg",
            nickname:"系统管理员",
            balance: 0,
            point: 0,
            chennel:"SYSTEM",
            tel:"",
        };
        
        console.log("默认名称：[profile.nickname]" + profile.nickname);
        console.log("默认头像：[profile.avatar]" + profile.avatar);
        console.log("账户余额：[profile.balance]" + profile.balance);
        console.log("账户积分：[profile.point]" + profile.point);
        console.log("渠道来源：[profile.channel]" + profile.chennel);

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

    }

    
});
