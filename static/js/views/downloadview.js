define( [
	'backbone', 
	'lib/text!/js/templates/download.html' 
	], function (Backbone, DownloadTemplate) {
	
	var DownloadView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(DownloadTemplate),

		initialize: function() {
			// Render the view on first load
			this.render();

			// Render the view when the model changes
			this.listenTo(this.model, 'change', this.render);

			// Set up the application cache events
			var cache = window.applicationCache;

			$(cache).bind('cached', _.bind(this.cacheCached, this));
			$(cache).bind('checking', _.bind(this.cacheChecking, this));
			$(cache).bind('downloading', _.bind(this.cacheDownloading, this));
			$(cache).bind('error', _.bind(this.cacheError, this));
			$(cache).bind('noupdate', _.bind(this.cacheNoUpdate, this));
			$(cache).bind('progress', _.bind(this.cacheProgress, this));
			$(cache).bind('updateready', _.bind(this.cacheUpdateReady, this));
			$(cache).bind('obsolete', _.bind(this.cacheObsolete, this));

			// Reset the total file count and download count
			this.model.set('filesDownloaded', 0);

			// Manually force an update to the app cache
			try {
				cache.update();
			}
			catch (e) {
				// Manually forcing an update causes an error in some cases when retrying the download
			}
		},

		events: {
			'click #retry' : 'retryDownload'
		},

		retryDownload: function(){
			Backbone.history.navigate('#retry', true); 
		},

		// Get the total number of files in the cache manifest by manually parsing the manifest file
		getTotalFiles: function() {
			var self = this;
			$.ajax({
				url: '/totalfiles' 
			}).done(function (data) {
				self.model.set('totalFiles', data);
			});
		},

		cacheCached: function() {
			var modelStatus = this.model.get('status');
			modelStatus.push('All resources for this app have now been downloaded.');
			this.model.set('status', modelStatus);

			this.model.set('completed', true);
		},

		cacheChecking: function() {
			if (this.model.get('verbose')) {
				var modelStatus = this.model.get('status');
				modelStatus.push('Checking app resource manifest.');
				this.model.set('status', modelStatus);
			}
		},
		
		cacheDownloading: function() {
			var modelStatus = this.model.get('status');
			modelStatus.push('Starting download of app resources.');
			this.model.set('status', modelStatus);

			// There are resources to be downloaded so set the total files to be downloaded
			this.getTotalFiles();
		},
		
		cacheError: function(e) {
			if (this.model.get('verbose')) {
				var modelStatus = this.model.get('status');
				modelStatus.push('There was an error: ' + JSON.stringify(e));
				this.model.set('status', modelStatus);
			}
			else {
				var modelStatus = this.model.get('status');
				modelStatus.push('The download attempt failed. Continue online.');
				this.model.set('status', modelStatus);

				// Try refreshing the view once.
				if ($.cookie('refreshed-download-view') != '1') {
					$.cookie('refreshed-download-view', '1');
					window.location.reload();
				}
			}
		},
		
		cacheNoUpdate: function() {
			var modelStatus = this.model.get('status');
			modelStatus.push('All resources are up to date.');
			this.model.set('status', modelStatus);

			// There are no resources to be downloaded so set the total files to 0, 
			// except if resources were already downloaded, then keep the total.
			if (this.model.get('filesDownloaded') == 0) {
				this.model.set('totalFiles', 0);
			}
			else {
				this.getTotalFiles();
			}

			this.model.set('completed', true);
		},
		
		cacheProgress: function(e) {
			// There are resources to be downloaded so set the total files to be downloaded
			this.getTotalFiles();

			var modelStatus = this.model.get('status');
			if (this.model.get('verbose')) {
				modelStatus.push('App resource downloaded: ' + JSON.stringify(e));
			}
			this.model.set('status', modelStatus);

			var filesDownloaded = this.model.get('filesDownloaded');
			var totalFiles = this.model.get('totalFiles');
			filesDownloaded++;
			if (filesDownloaded > totalFiles) {
				filesDownloaded = totalFiles;
			}
			this.model.set('filesDownloaded', filesDownloaded);
		},
		
		cacheUpdateReady: function() {
			if (this.model.get('verbose')) {
				var modelStatus = this.model.get('status');
				modelStatus.push('An update to the app\'s resouces is ready for download.');
				this.model.set('status', modelStatus);
			}

			try {
				var cache = window.applicationCache;
				cache.swapCache();
			}
			catch (e) {
				// Do nothing
			}

			Backbone.history.navigate('#refresh', true); 
		},
		
		cacheObsolete: function() {
			if (this.model.get('verbose')) {
				var modelStatus = this.model.get('status');
				modelStatus.push('The app resource manifest cannot be found.');
				this.model.set('status', modelStatus);
			}
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this.el;
		}
	});
	return DownloadView;
});