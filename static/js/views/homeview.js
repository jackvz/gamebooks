define([
	'jquery', 
	'backbone', 
	'lib/text!/js/templates/home.html' 
	], function ($, Backbone, HomeTemplate) {
	
	var HomeView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(HomeTemplate),

		initialize: function() {
			var self = this;
			this.collection.fetch().done(function() {
				// Go to the new game view if there are no existing players
				if (self.collection.length == 0) {
					Backbone.history.navigate('#newplayer', true); 
					return;
				}

				self.render();
			});
			this.collection.on('reset', this.render, this);
			this.collection.on('add', this.render, this);
		},

		render: function() {
			this.$el.html(this.template({ count: this.collection.length }));
			return this.el;
		}
	});
	return HomeView;
});