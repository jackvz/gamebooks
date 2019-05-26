define( [
	'backbone', 
	'lib/text!/js/templates/statuscheck.html'
	], function (Backbone, StatusCheckTemplate) {
	
	var StatusCheckView = Backbone.View.extend({
		el: '#status-check',
		template: _.template(StatusCheckTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template);
			return this.el;
		}
	});
	return StatusCheckView;
});