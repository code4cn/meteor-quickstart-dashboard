Meteor.startup(function(){
	if(!Menus.findOne({router:"wechat"})){
		Menus.insert({parent:"root",router:"wechat",name:"微信管理",roles:["admin"]})
	}
	Menus.insert({parent:"wechat",router:"wxMenu",name:"菜单管理",roles:["admin"]})
});