define([
	'underscore', 
	'backbone' 
	], function(_, Backbone) {

	var CombatRoundModel = Backbone.Model.extend({
		defaults: {
			randomNumber: null, 
			combatRatio : null, 
			loneWolfEP: null, 
			enemyEP: null 
		},

		validate: function(attrs) {
			if(!attrs.randomNumber) {
				return 'Random number is required. ';
			}
		},

		clear: function() {
			this.destroy();
		}
	});
	return CombatRoundModel;
});