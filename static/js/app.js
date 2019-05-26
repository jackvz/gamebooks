require.config({
	baseUrl: 'js', 
	paths: {
		'jquery': 'lib/jquery',
		'jquery.cookie': 'lib/jquery.cookie',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'localstorage': 'lib/backbone.localStorage-min',
		'foundation': 'lib/foundation.min'
	}, 
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'foundation': {
			deps: ['jquery']
		},
		'jquery.cookie': {
			deps: ['jquery']
		},
		'backbone.custom': {
			deps: ['backbone']
		}
	}
});

require([
	'jquery', 
	'underscore', 
	'backbone', 
	'router', 

	'foundation', 
	'jquery.cookie', 
	'backbone.custom' 
	], function($, _, Backbone, Router) {

	var appModule = {
		getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		checkTitle: function() {
			var title = this.getParameterByName('title');

			// Set a session cookie to start with the requested title in the new player view.
			if (/^[1-5]$/.test(title)) {
				$.cookie('lw_title', title);
				// Redirect to the new player view to get rid of the query string.
				window.location.replace('/#newplayer');				
			}
		}
	};

	// Begin the app once the DOM is ready
	$(function() {
		appModule.checkTitle();

		// Start the app router
		var router = new Router();

		// Monitor hashchange events
		Backbone.history.start();

	});

});
