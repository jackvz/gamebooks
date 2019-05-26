require.config({
	baseUrl: 'js', 
	paths: {
		'jquery': 'lib/jquery',
		'jquery.cookie': 'lib/jquery.cookie',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'localstorage': 'lib/backbone.localStorage-min',
		'foundation': 'lib/foundation.min', 
		'jasmine': 'lib/test/jasmine',
		'jasmine-html': 'lib/test/jasmine-html'
	}, 
	urlArgs: 'bust=0.2.27', 
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
		}, 
		'jasmine': {
			exports: 'jasmine'
		},
		'jasmine-html': {
			deps: ['jasmine'], 
			exports: 'jasmine'
		}
	}
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();
	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var specs = [];

	specs.push('specs/models/gamemodelspec');
	specs.push('specs/models/playermodelspec');

	// Begin the tests once the DOM is ready
	$(function() {
		require(specs, function() {
			jasmineEnv.execute();

			window.setTimeout(function() {
				$('.jasmine_reporter').appendTo('#test-results');
			}, 10);
		});
	});

});
