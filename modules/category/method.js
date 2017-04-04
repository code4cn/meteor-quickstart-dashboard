Meteor.methods({
    queryAllCategory: function(sel, pro) {
        return {
            rows: Category.find(sel, pro).fetch(),
            total: Category.find(sel, pro).count()
        };
    }
});