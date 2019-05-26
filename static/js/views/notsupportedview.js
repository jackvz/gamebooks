define( [
	'backbone', 
	'lib/text!/js/templates/notsupported.html'
	], function (Backbone, NotSupportedTemplate) {
	
	var NotSupportedView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(NotSupportedTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template);
			return this.el;
		}
	});
	return NotSupportedView;
});