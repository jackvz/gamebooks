define( [
	'backbone', 
	'lib/text!/js/templates/cleanheader.html'
	], function (Backbone, CleanHeaderTemplate) {
	
	var CleanHeaderView = Backbone.View.extend({
		el: '#gameoptions',
		template: _.template(CleanHeaderTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template);
			return this.el;
		}
	});
	return CleanHeaderView;
});