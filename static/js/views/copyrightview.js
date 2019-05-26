define( [
	'jquery', 
	'backbone', 
	'lib/text!/js/templates/copyright.html'
	], function ($, Backbone, CopyrightTemplate) {
	
	var CopyrightView = Backbone.View.extend({
		el: '#copyright',
		template: _.template(CopyrightTemplate),

		initialize: function() {
			this.render();
			// The game view's nav may have hidden the footer, so make sure it's shown on init
			$('footer').show();
		},

		render: function() {
			this.$el.html(this.template);
			$('footer').slideDown();
			return this.el;
		}
	});
	return CopyrightView;
});