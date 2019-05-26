define([
	'underscore', 
	'backbone' 
	], function(_, Backbone) {

	var PlayerModel = Backbone.Model.extend({
		defaults: {
			name: '', 
			rank: 'Initiate', 

			combatSkill: null, 
			endurancePoints: null, 
			initialEndurancePoints: null, 

			bookNumber : 1, 
			bookSection: 0, 

			bookTitle: '', 
			bookBlurb: '', 

			weapons: new Array(2), 
			disciplines: new Array(10), 
			goldCrowns: 0, 
			backpackItems: new Array(8), 
			specialItems: '', 
			notes: '' 
		},

		validate: function(attrs) {
			var errors = [];

			if(!attrs.name || attrs.name === '') {
				errors.push({name: 'name', message: 'Player name is required.'});
			}

			return errors.length > 0 ? errors : false;
		},

		clear: function() {
			this.weapons = null;
			this.kaiDisciplines = null;
			this.backpackItems = null;
			this.destroy();
		}
	});
	return PlayerModel;
});