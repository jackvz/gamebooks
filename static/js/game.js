define('game', [
	'jquery', 
	'views/gameview', 
	'views/gameoptionsview', 
	'views/copyrightview', 
	'views/statuscheckview', 
	'models/gamemodel', 
	'collections/playerlist' 
	], function($, GameView, GameOptionsView, CopyrightView, StatusCheckView, GameModel, PlayerList) {
	
	// Game module
	var Game = {
		properties: {
			initialized: false, 
			playerId: '', 
			gameView: null, 
			gameOptionsView: null, 
			copyrightView: null, 
			statusCheckView: null, 
			cleanHeaderView: null, 
			gameModel: null, 
			playerList: null 
		},

		init: function(){
			// Create the game model and player collection
			this.properties.gameModel = new GameModel();
			this.properties.playerList = new PlayerList();

			// Load the player collection from local storage
			var self = this;
			this.properties.playerList.fetch().done(function() {
				// Get the player model based on the ID sent by the router
				var player = self.properties.playerList.get(self.properties.playerId);

				// Create a dynamic model containing the game and player models
				var model = new Backbone.Model();
				model.set({ 
					game: self.properties.gameModel, 
					player: player 
				});

				// Show the game view
				self.properties.gameView = new GameView({ model: model });
			});
	
			// Show the game menu
			this.properties.gameOptionsView = new GameOptionsView();
			// Catch nav click events from the game menu and send it to the game view
			this.properties.gameOptionsView.on('navClick', function(target) {
				this.properties.gameView.trigger('navClick', target);
			}, this);

			// Show the copyright notices
			this.properties.copyrightView = new CopyrightView();

			// Show the status check link
			this.properties.statusCheckView = new StatusCheckView();

			// Initialise the Foundation framework plugins
			$(document).foundation();

			// Scroll to the top
			$(window).scrollTop(0);

			this.properties.initialized = true;
		},

		clear: function(){
			if (this.properties.gameView) { this.properties.gameView.remove(); }
			if (this.properties.gameOptionsView) { this.properties.gameOptionsView.remove(); }
			if (this.properties.copyrightView) { this.properties.copyrightView.remove(); }
			if (this.properties.statusCheckView) { this.properties.statusCheckView.remove(); }
			if (this.properties.gameModel) { this.properties.gameModel = null; }
			if (this.properties.playerList) { this.properties.playerList = null; }
			this.properties.initialized = false;
		}
	}

	return Game;
});
