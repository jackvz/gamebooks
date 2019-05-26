define([
	'jquery', 
	'views/selectplayerview', 
	'views/cleanheaderview', 
	'views/copyrightview', 
	'views/statuscheckview', 
	'collections/playerlist' 
	], function($, SelectPlayerView, CleanHeaderView, CopyrightView, StatusCheckView, PlayerList) {
	
	// Select player module
	var SelectPlayer = {
		properties: {
			initialized: false, 
			selectPlayerView: null, 
			cleanHeaderView: null, 
			copyrightView: null, 
			statusCheckView: null, 
			playerList: null 
		},

		init: function(){
			// Show the header without the game nav
			this.properties.cleanHeaderView = new CleanHeaderView();

			// Load any saved players
			this.properties.playerList = new PlayerList();

			// Show the select player view
			this.properties.selectPlayerView = new SelectPlayerView({ collection: this.properties.playerList });

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
			if (this.properties.selectPlayerView) { this.properties.selectPlayerView.remove(); }
			if (this.properties.cleanHeaderView) { this.properties.cleanHeaderView.remove(); }
			if (this.properties.copyrightView) { this.properties.copyrightView.remove(); }
			if (this.properties.statusCheckView) { this.properties.statusCheckView.remove(); }
			if (this.properties.playerList) { this.properties.playerList = null; }

			this.properties.initialized = false;
		}
	}

	return SelectPlayer;
});

