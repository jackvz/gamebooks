define([
	'underscore', 
	'backbone', 
	'models/playermodel', 

	'localstorage' 
	], function(_, Backbone, PlayerModel) {

	var PlayerList = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('PlayerList'), 
		model: PlayerModel,

		initialize: function() {
			this.on('add', this.updateSet, this);
		},
		
		updateSet: function() {
			items = this.models;
		}
	});
	return PlayerList;
});
