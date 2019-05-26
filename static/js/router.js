define( [
	'jquery', 
	'underscore', 
	'backbone', 
	'terms', 
	'download', 
	'home', 
	'notsupported', 
	'newplayer', 
	'selectplayer', 
	'game', 

	'ga' 
	], function ($, _, Backbone, Terms, Download, Home, NotSupported, NewPlayer, SelectPlayer, Game) {
	
	var Router = Backbone.Router.extend({
		// Define the route and function maps for this router
		routes: {
			'': 'showHome', 
			'terms': 'showTerms', 
			'download': 'showDownload', 
			'retry': 'retryDownload', 
			'refresh': 'refreshDownload', 
			'notsupported': 'showNotSupported', 
			'home': 'showHome', 
			'newplayer': 'showNewPlayer', 
			'selectplayer': 'showSelectPlayer', 
			'game/:playerId': 'showGame', 
			'*other': 'showHome' // Default catch-all 
		},

		showTerms: function() {
			// Clear any views and show this view
			this.clearViews();
			Terms.init();

			// Track a page view
			ga('send', 'pageview', '/#terms');
		},

		showDownload: function() {
			// Only show this view if the user has agreed to the terms
			if ($.cookie('agreed') != '1') {
				Backbone.history.navigate('#terms', true); 
				return;
			}

			// Clear any views and show this view
			this.clearViews();
			Download.init();

			// Track a page view
			ga('send', 'pageview', '/#download');
		},

		retryDownload: function() {
			// Track a page view
			ga('send', 'pageview', '/#retry');

			// Clear the download view before trying again
			this.clearViews();
			Backbone.history.navigate('#download', true); 
		},

		refreshDownload: function() {
			// Clear the download view before trying again
			this.clearViews();
			Backbone.history.navigate('#download', true); 
		},

		showHome: function() {
			// Only show this view if the user has agreed to the terms
			if ($.cookie('agreed') != '1') {
				Backbone.history.navigate('#terms', true); 
				return;
			}
			// Clear any views and show this view
			this.clearViews();
			Home.init();

			// Track a page view
			ga('send', 'pageview', '/#');
		},

		showNotSupported: function() {
			// Clear any views and show this view
			this.clearViews();
			NotSupported.init();

			// Track a page view
			ga('send', 'pageview', '/#notsupported');
		},

		showNewPlayer: function() {
			// Only show this view if the user has agreed to the terms
			if ($.cookie('agreed') != '1') {
				Backbone.history.navigate('#terms', true); 
				return;
			}
			// Clear any views and show this view
			this.clearViews();
			NewPlayer.init();

			// Track a page view
			ga('send', 'pageview', '/#newplayer');
		},

		showSelectPlayer: function() {
			// Only show this view if the user has agreed to the terms
			if ($.cookie('agreed') != '1') {
				Backbone.history.navigate('#terms', true); 
				return;
			}
			// Clear any views and show this view
			this.clearViews();
			SelectPlayer.init();

			// Track a page view
			ga('send', 'pageview', '/#selectplayer');
		},

		showGame: function(playerId) {
			// Only show this view if the user has agreed to the terms
			if ($.cookie('agreed') != '1') {
				Backbone.history.navigate('#terms', true); 
				return;
			}
			// Clear any views and show this view
			this.clearViews();
			Game.properties.playerId = playerId;
			Game.init();

			// Track a page view
			ga('send', 'pageview', '/#game');
		},

		clearViews: function() {
			if (Terms.properties.initialized) { Terms.clear(); }
			if (Download.properties.initialized) { Download.clear(); }
			if (Home.properties.initialized) { Home.clear(); }
			if (NotSupported.properties.initialized) {NotSupported.clear(); }
			if (NewPlayer.properties.initialized) { NewPlayer.clear(); }
			if (SelectPlayer.properties.initialized) { SelectPlayer.clear(); }
			if (Game.properties.initialized) { Game.clear(); }
		}
	});
	return Router;
});