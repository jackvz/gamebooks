define([
	'jquery', 
	'views/downloadview', 
	'views/cleanheaderview', 
	'views/copyrightview', 
	'models/downloadmodel' 
	], function($, DownloadView, CleanHeaderView, CopyrightView, DownloadModel) {
	
	// Download module
	var Home = {
		properties: {
			initialized: false, 
			downloadView: null, 
			cleanHeaderView: null, 
			copyrightView: null, 
			downloadModel: null 
		},

		init: function(){
			// Show the header without the game nav
			this.properties.cleanHeaderView = new CleanHeaderView();

			// Show the download view
			this.properties.downloadModel = new DownloadModel();
			this.properties.downloadView = new DownloadView({model: this.properties.downloadModel});

			// Show the copyright notices
			this.properties.copyrightView = new CopyrightView();

			// Initialise the Foundation framework plugins
			$(document).foundation();

			// Scroll to the top
			$(window).scrollTop(0);

			this.properties.initialized = true;
		},

		clear: function(){
			if (this.properties.downloadView) { this.properties.downloadView.remove(); }
			if (this.properties.cleanHeaderView) { this.properties.cleanHeaderView.remove(); }
			if (this.properties.copyrightView) { this.properties.copyrightView.remove(); }
			if (this.properties.downloadModel) { this.properties.downloadModel.clear(); }

			this.properties.initialized = false;
		}
	}

	return Home;
});

