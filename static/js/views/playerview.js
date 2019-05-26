define([
	'backbone', 
	'lib/text!/js/templates/player.html' 
	], function (Backbone, PlayerTemplate) {
	var PlayerView = Backbone.View.extend({
		tagName: 'div', 
		className: 'player-wrap', 
		template: _.template(PlayerTemplate), 

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this); // Removing the view from the DOM.
		},

		events: {
			'click .delete-player.button': 'deletePlayer', 
			'click .cancel.button': 'cancelPopup' 
		},

		deletePlayer: function(event) {
			// Do not follow the empty link and close the popup
			event.preventDefault();
			var playerId = event.target.attributes['data-player-id'].value;
			this.$('#delete-player-' + playerId + '-modal').foundation('reveal', 'close');

			this.model.destroy();
		},

		cancelPopup: function(event) {
			// Do not follow the empty link and close the popup
			event.preventDefault();
			var playerId = event.target.attributes['data-player-id'].value;
			this.$('#delete-player-' + playerId + '-modal').foundation('reveal', 'close');
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this.el;
		}
	});
	return PlayerView;
});