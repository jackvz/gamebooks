define([
	'jquery', 
	'views/termsview', 
	'views/cleanheaderview' 
	], function($, TermsView, CleanHeaderView) {
	
	// Terms module
	var Terms = {
		properties: {
			initialized: false,
			termsView: null, 
			cleanHeaderView: null 
		},

		init: function(){
			// The entry point module, so check to see if the required features are available
			if (!Modernizr.localstorage || !Modernizr.applicationcache) {
				Backbone.history.navigate('#notsupported', true); 
				return;
			}

			// Show the header without the game nav
			this.properties.cleanHeaderView = new CleanHeaderView();

			// Show the terms view
			this.properties.termsView = new TermsView();

			// Initialise the Foundation framework plugins
			$(document).foundation();

			// Scroll to the top
			$(window).scrollTop(0);

			this.properties.initialized = true;
		},

		clear: function(){
			if (this.properties.termsView) { this.properties.termsView.remove(); }
			if (this.properties.cleanHeaderView) { this.properties.cleanHeaderView.remove(); }

			this.properties.initialized = false;
		}
	}

	return Terms;
});

