define([
	'jquery', 
	'views/notsupportedview'
	], function($, NotSupportedView) {
	
	// Not Supported module
	var NotSupported = {
		properties: {
			initialized: false,
			notSupportedView: null
		},

		init: function(){
			// Just in case someone tries to go to this link directly, 
			// check to see if the required features are available
			if (Modernizr.localstorage && Modernizr.applicationcache) {
				Backbone.history.navigate('#', true); 
				return;
			}

			// Show the not supported view
			this.properties.notSupportedView = new NotSupportedView();

			// Initialise the Foundation framework plugins
			$(document).foundation();

			// Scroll to the top
			$(window).scrollTop(0);

			this.properties.initialized = true;
		},

		clear: function(){
			if (this.properties.notSupportedView) { this.properties.notSupportedView.remove(); }

			this.properties.initialized = false;
		}
	}

	return NotSupported;
});

