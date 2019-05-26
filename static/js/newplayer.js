define([
	'jquery', 
	'views/newplayerview', 
	'views/cleanheaderview', 
	'views/copyrightview', 
	'views/statuscheckview', 
	'collections/playerlist' 
	], function($, NewPlayerView, CleanHeaderView, CopyrightView, StatusCheckView, PlayerList) {
	
	// New player module
	var NewPlayer = {
		properties: {
			initialized: false, 
			newPlayerView: null, 
			cleanHeaderView: null, 
			copyrightView: null, 
			statusCheckView: null, 
			playerList: null 
		},

		init: function(){
			// Show the header without the game nav
			this.properties.cleanHeaderView = new CleanHeaderView();

			// Get the list of players
			this.properties.playerList = new PlayerList();

			// Show the new player view
			this.properties.newPlayerView = new NewPlayerView({ collection: this.properties.playerList });

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
			if (this.properties.newPlayerView) { this.properties.newPlayerView.remove(); }
			if (this.properties.cleanHeaderView) { this.properties.cleanHeaderView.remove(); }
			if (this.properties.copyrightView) { this.properties.copyrightView.remove(); }
			if (this.properties.statusCheckView) { this.properties.statusCheckView.remove(); }
			if (this.properties.playerList) { this.properties.playerList = null; }

			this.properties.initialized = false;
		}
	}

	return NewPlayer;
});

