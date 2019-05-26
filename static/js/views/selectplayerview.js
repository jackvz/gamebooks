define([
	'jquery', 
	'backbone', 
	'lib/text!/js/templates/selectplayer.html', 
	'views/playerview' 
	], function ($, Backbone, SelectPlayerTemplate, PlayerView) {

	var SelectPlayerView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(SelectPlayerTemplate),

		initialize: function() {
			var self = this;
			this.collection.fetch().done(function() {
				// If there are no players, redirect to the homepage
				if (self.collection.length == 0) {
					Backbone.history.navigate('#home', true); 
					return;
				}
				self.render();
			});
			this.collection.on('reset', this.render, this);
			this.collection.on('destroy', this.playerDeleted, this);
		},

		playerDeleted: function() {
			// If there are no players, redirect to the homepage
			if (this.collection.length == 0) {
				Backbone.history.navigate('#home', true); 
				return;
			}

			// Scroll to the top
			$(window).scrollTop(0);
		},

		render: function() {
			this.$el.html(this.template());

			this.collection.each(function(player) {
				this.renderPlayer(player);
			}, this);

			return this.el;
		},

		renderPlayer: function(player) {
			var playerView = new PlayerView( {model: player} );
			this.$el.append(playerView.render());
		}
	});
	return SelectPlayerView;
});