
Template.side.onCreated(function() {
	
});

Template.side.helpers({
	menus:function(){
		// console.log(Menus.find({parent:"root"}).fetch());
		return Menus.find({parent:"root"});
	},
	target:function(){
		var map = FlowRouter._routesMap;
		// console.log(map);
		return (map && (map[this.router])) ? map[this.router].path : "/";
	},
	children:function(){
		return Menus.find({parent:this.router}).count() > 0 ? Menus.find({parent:this.router}) : [];
	},
	count:function(arr){
		return arr.length == 0
	},
	checkRole:function(){
		if($.inArray("default",this.roles) > -1){
			return true;
		}
		if(Roles.userIsInRole(Meteor.userId(),["admin"],"dashboard")){
			return true;
		}

		if(Roles.userIsInRole(Meteor.userId(),this.roles,"dashboard")){
			return true;
		}
		
		return false;
	},
});
Template.side.events({
	"click .side-navi-item":function(event){
		var o = $(event.currentTarget);
		if(!o.hasClass("side-navi-open")){
			$(".side-navi-children").slideUp();
			$(".side-navi-item").removeClass("side-navi-open");
			if(o.find(".side-navi-children")[0]){
				o.find(".side-navi-children").slideDown(300);
				o.addClass("side-navi-open");
			}
		}
		
	},
 
});
Template.side.onRendered(function(){
});

