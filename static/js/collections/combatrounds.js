define([
	'underscore', 
	'backbone', 
	'models/combatroundmodel', 

	'localstorage' 
	], function(_, Backbone, CombatRoundModel) {

	var CombatRounds = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('CombatRounds'), 
		model: CombatRoundModel,

		initialize: function() {
			this.on('add', this.updateSet, this);
		},
		
		updateSet: function() {
			items = this.models;
		}
	});
	return CombatRounds;
});
